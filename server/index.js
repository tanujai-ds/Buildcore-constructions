import http from "node:http";
import fs from "node:fs";
import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import nodemailer from "nodemailer";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env") });

const port = Number(process.env.MAIL_SERVER_PORT || 3001);
const maxBodySize = 100_000;
const contactEmail = process.env.CONTACT_EMAIL || "buildcoreconstructions@gmail.com";
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:8443";
const companyName = "BuildCore Construction & Consultant";
const companyPhone = "+91 91726 80913";

const dataDir = join(__dirname, "data");
const enquiriesFile = join(dataDir, "enquiries.json");

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(enquiriesFile)) {
  fs.writeFileSync(enquiriesFile, "[]", "utf8");
}

// Data persistence helpers
function getStoredEnquiries() {
  try {
    const raw = fs.readFileSync(enquiriesFile, "utf8");
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
}

function persistEnquiry(record) {
  try {
    const items = getStoredEnquiries();
    items.unshift(record);
    // Keep up to 200 recent records
    const trimmed = items.slice(0, 200);
    fs.writeFileSync(enquiriesFile, JSON.stringify(trimmed, null, 2), "utf8");
  } catch (err) {
    console.error("[Storage] Failed to save enquiry to disk:", err.message);
  }
}

function updateEnquiryStatus(id, status, errorInfo = null) {
  try {
    const items = getStoredEnquiries();
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      items[index].status = status;
      if (errorInfo) items[index].deliveryError = errorInfo;
      fs.writeFileSync(enquiriesFile, JSON.stringify(items, null, 2), "utf8");
    }
  } catch (err) {
    console.error("[Storage] Failed to update enquiry:", err.message);
  }
}

// Rate Limiting
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMax = 10;
const requestsByIp = new Map();

// SMTP Transporter setup
let smtpState = {
  configured: Boolean(smtpUser && smtpPass),
  verified: false,
  detail: smtpUser && smtpPass ? "Verifying credentials..." : "No SMTP credentials set",
};

const transporter = smtpUser && smtpPass
  ? nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: smtpUser, pass: smtpPass },
    })
  : null;

// Async startup verification
if (transporter) {
  transporter
    .verify()
    .then(() => {
      smtpState.verified = true;
      smtpState.detail = "Gmail SMTP connection verified and operational";
      console.log(`[SMTP] ✓ Connected to Gmail successfully (${smtpUser})`);
    })
    .catch((err) => {
      smtpState.verified = false;
      const isAuth = err?.responseCode === 535 || err?.message?.includes("BadCredentials");
      smtpState.detail = isAuth
        ? "Invalid Gmail credentials. Enquiries are safely captured and saved locally."
        : `SMTP error: ${err.message}`;
      console.warn(
        `[SMTP NOTICE] Gmail verification failed: ${err.message}\n` +
          `[SMTP NOTICE] All contact enquiries will be saved locally to server/data/enquiries.json until a valid Google App Password is provided.`
      );
    });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body) > maxBodySize) {
        reject(new Error("Request body too large."));
        request.destroy();
      }
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject(new Error("Invalid JSON body."));
      }
    });
    request.on("error", reject);
  });
}

function getClientIp(request) {
  return (
    request.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    request.socket.remoteAddress ||
    "127.0.0.1"
  );
}

function isRateLimited(ip) {
  const now = Date.now();
  const recentRequests = (requestsByIp.get(ip) || []).filter(
    (timestamp) => now - timestamp < rateLimitWindowMs
  );

  if (recentRequests.length >= rateLimitMax) {
    requestsByIp.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestsByIp.set(ip, recentRequests);
  return false;
}

function validateContact(payload) {
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const enquiryType =
    payload.enquiryType === "general" ? "General Enquiry" : "Project Enquiry";

  if (payload.website) {
    return { spam: true };
  }

  if (!name || !email || !message) {
    throw new Error("Name, email and message are required.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please provide a valid email address.");
  }
  if (name.length > 100 || email.length > 254 || phone.length > 30 || message.length > 5_000) {
    throw new Error("One or more fields exceed maximum allowed length.");
  }

  return { name, email, phone, message, enquiryType, spam: false };
}

function buildAdminEmail({ name, email, phone, message, enquiryType }) {
  return {
    from: `"BuildCore Website" <${smtpUser}>`,
    to: contactEmail,
    replyTo: email,
    subject: `🔔 New ${enquiryType} from ${name}`,
    text: [
      `NEW ${enquiryType.toUpperCase()} RECEIVED`,
      "----------------------------------------",
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Phone:   ${phone || "Not provided"}`,
      `Type:    ${enquiryType}`,
      `Time:    ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
      "",
      "Requirements / Message:",
      message,
      "----------------------------------------",
      `BuildCore direct line: ${companyPhone}`,
      "Hit 'Reply' directly to respond to the client.",
    ].join("\n"),
    html: `<div style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:620px;margin:0 auto;color:#1a1a1a;border:1px solid #e5e5e5;border-radius:4px;overflow:hidden">
      <div style="background:#D4913A;padding:20px 24px">
        <h2 style="color:#ffffff;margin:0;font-size:18px">New ${escapeHtml(enquiryType)} Received</h2>
        <p style="color:#fff3e6;margin:4px 0 0 0;font-size:12px">Via BuildCore Website Contact Form</p>
      </div>
      <div style="padding:24px;background:#ffffff">
        <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
          <tr><td style="padding:8px 0;color:#737373;width:130px;font-size:13px">Client Name:</td><td style="padding:8px 0;font-weight:700;font-size:14px;color:#111111">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0;color:#737373;font-size:13px">Email Address:</td><td style="padding:8px 0;font-size:14px"><a href="mailto:${escapeHtml(email)}" style="color:#D4913A;font-weight:600">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:8px 0;color:#737373;font-size:13px">Phone Number:</td><td style="padding:8px 0;font-size:14px;font-weight:600;color:#111111">${phone ? `<a href="tel:${escapeHtml(phone)}" style="color:#111111;text-decoration:none">${escapeHtml(phone)}</a>` : "Not provided"}</td></tr>
          <tr><td style="padding:8px 0;color:#737373;font-size:13px">Category:</td><td style="padding:8px 0;font-size:14px;font-weight:600;color:#D4913A">${escapeHtml(enquiryType)}</td></tr>
          <tr><td style="padding:8px 0;color:#737373;font-size:13px">Received At:</td><td style="padding:8px 0;font-size:12px;color:#555555">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</td></tr>
        </table>
        <div style="background:#f9f9f8;border-left:4px solid #D4913A;padding:14px 18px;margin-top:12px;border-radius:2px">
          <p style="margin:0 0 6px 0;font-size:12px;color:#737373;text-transform:uppercase;font-weight:600">Client Requirements / Brief:</p>
          <p style="margin:0;font-size:14px;color:#111111;white-space:pre-wrap;line-height:1.5">${escapeHtml(message)}</p>
        </div>
        <p style="font-size:12px;color:#888888;margin-top:20px">
          💡 <strong>Tip:</strong> Simply click <em>Reply</em> in your email client to write directly to ${escapeHtml(name)} at ${escapeHtml(email)}.
        </p>
      </div>
    </div>`,
  };
}

function buildConfirmationEmail({ name, email, message, enquiryType }) {
  return {
    from: `"BuildCore Construction" <${smtpUser}>`,
    to: email,
    subject: `Enquiry Received: We will contact you soon | ${companyName}`,
    text: `Hello ${name},\n\nThank you for reaching out to BuildCore Construction & Consultant.\n\nWe have received your ${enquiryType} and our executive team will review your specifications and contact you soon within one business day.\n\nYour message:\n"${message}"\n\nContact Details:\nPhone: ${companyPhone}\nEmail: ${smtpUser}\nSatara, Maharashtra\n\nRegards,\nBuildCore Construction & Consultant`,
    html: `<div style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:620px;margin:0 auto;color:#1a1a1a;border:1px solid #e5e5e5;border-radius:4px;overflow:hidden">
      <div style="background:#D4913A;padding:24px 28px">
        <h1 style="color:#ffffff;margin:0;font-size:20px;letter-spacing:1px;font-weight:700">BUILDCORE</h1>
        <p style="color:#fff3e6;margin:4px 0 0 0;font-size:12px;letter-spacing:0.5px">CONSTRUCTION &amp; CONSULTANT</p>
      </div>
      <div style="padding:28px;background:#ffffff">
        <h2 style="color:#111111;margin-top:0;font-size:18px">We have received your enquiry</h2>
        <p style="color:#333333;font-size:14px;line-height:1.6">Dear <strong>${escapeHtml(name)}</strong>,</p>
        <p style="color:#555555;font-size:14px;line-height:1.6">
          Thank you for reaching out to us. We have received your message regarding <strong>${escapeHtml(enquiryType)}</strong>. Our team will review your requirements and contact you soon within one business day.
        </p>
        <div style="background:#f9f9f8;border-left:4px solid #D4913A;padding:14px 18px;margin:20px 0;border-radius:2px">
          <p style="margin:0 0 6px 0;font-size:12px;color:#737373;text-transform:uppercase;font-weight:600">Your Enquiry Summary</p>
          <p style="margin:0;font-size:13px;color:#222222;white-space:pre-wrap;line-height:1.5">${escapeHtml(message)}</p>
        </div>
        <p style="color:#555555;font-size:13px;line-height:1.6">
          If you have urgent site requirements or immediate drawing consultations, feel free to contact us:
        </p>
        <p style="margin:16px 0;font-size:14px">
          <strong>Direct Line:</strong> <a href="tel:+919172680913" style="color:#D4913A;text-decoration:none">${companyPhone}</a><br/>
          <strong>WhatsApp:</strong> <a href="https://wa.me/919172680913" style="color:#D4913A;text-decoration:none">${companyPhone}</a><br/>
          <strong>Email:</strong> <a href="mailto:${smtpUser}" style="color:#D4913A;text-decoration:none">${smtpUser}</a>
        </p>
        <hr style="border:none;border-top:1px solid #eeeeee;margin:24px 0" />
        <p style="color:#888888;font-size:12px;margin:0">
          Satara, Maharashtra, India | Monday &ndash; Saturday: 09:00 &ndash; 18:00 IST<br/>
          &copy; ${new Date().getFullYear()} BuildCore Construction &amp; Consultant. All rights reserved.
        </p>
      </div>
    </div>`,
  };
}

async function handleContact(request, response) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    sendJson(response, 429, { message: "Too many requests. Please try again shortly." });
    return;
  }

  let contact;
  try {
    contact = validateContact(await readJson(request));
  } catch (error) {
    sendJson(response, 400, {
      message: error instanceof Error ? error.message : "Invalid request payload.",
    });
    return;
  }

  // Honeypot trap: bots silently get success
  if (contact.spam) {
    sendJson(response, 200, { message: "Enquiry sent successfully." });
    return;
  }

  // Generate unique enquiry ID
  const enquiryId = `ENQ-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  const record = {
    id: enquiryId,
    createdAt: new Date().toISOString(),
    name: contact.name,
    email: contact.email,
    phone: contact.phone || null,
    message: contact.message,
    enquiryType: contact.enquiryType,
    ip,
    status: "saved_locally",
  };

  // Always persist enquiry to storage first so NO lead is ever lost
  persistEnquiry(record);

  // Attempt live email transmission if transporter is available
  if (transporter) {
    try {
      await Promise.all([
        transporter.sendMail(buildAdminEmail(contact)),
        transporter.sendMail(buildConfirmationEmail(contact)),
      ]);
      updateEnquiryStatus(enquiryId, "delivered");
      console.log(`[SMTP] ✓ Enquiry emails dispatched for ${contact.name} <${contact.email}> (ID: ${enquiryId})`);

      sendJson(response, 200, {
        ok: true,
        message: "Enquiry sent successfully. Confirmation email dispatched.",
        id: enquiryId,
      });
      return;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      updateEnquiryStatus(enquiryId, "saved_offline", errorMsg);

      console.warn(
        `\n=======================================================\n` +
        `[ENQUIRY CAPTURED & SAVED LOCALLY - ID: ${enquiryId}]\n` +
        `Client:  ${contact.name} <${contact.email}>\n` +
        `Phone:   ${contact.phone || "Not provided"}\n` +
        `Type:    ${contact.enquiryType}\n` +
        `Message: ${contact.message}\n` +
        `-------------------------------------------------------\n` +
        `Notice: Gmail SMTP delivery failed (${errorMsg}).\n` +
        `Saved securely to server/data/enquiries.json\n` +
        `=======================================================\n`
      );

      // Return HTTP 200 with saved confirmation so user experience is smooth
      sendJson(response, 200, {
        ok: true,
        message: "Enquiry received successfully! Our team will contact you soon.",
        id: enquiryId,
        offline: true,
      });
      return;
    }
  }

  // No SMTP configured: captured and saved
  console.log(`[ENQUIRY SAVED] ${contact.name} <${contact.email}> (ID: ${enquiryId})`);
  sendJson(response, 200, {
    ok: true,
    message: "Enquiry received successfully! Our team will contact you soon.",
    id: enquiryId,
    offline: true,
  });
}

function handleHealth(response) {
  const enquiries = getStoredEnquiries();
  sendJson(response, 200, {
    status: "ok",
    service: "BuildCore Backend API",
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    smtp: {
      configured: smtpState.configured,
      user: smtpUser || null,
      status: smtpState.verified ? "active" : smtpState.configured ? "needs_valid_app_password" : "unconfigured",
      detail: smtpState.detail,
    },
    enquiries: {
      total: enquiries.length,
      delivered: enquiries.filter((e) => e.status === "delivered").length,
      savedLocally: enquiries.filter((e) => e.status !== "delivered").length,
    },
  });
}

function handleGetEnquiries(response) {
  const enquiries = getStoredEnquiries();
  sendJson(response, 200, {
    total: enquiries.length,
    enquiries,
  });
}

export async function handleApiRequest(request, response) {
  const origin = request.headers.origin || "";
  const isAllowed =
    !origin ||
    origin === allowedOrigin ||
    origin.startsWith("http://localhost:") ||
    origin.startsWith("http://127.0.0.1:");

  response.setHeader("Access-Control-Allow-Origin", isAllowed ? origin || "*" : allowedOrigin);
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Vary", "Origin");

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  const url = new URL(request.url || "/", "http://localhost");

  // Health check endpoint
  if (request.method === "GET" && url.pathname === "/api/health") {
    handleHealth(response);
    return;
  }

  // Enquiries inspection endpoint
  if (request.method === "GET" && url.pathname === "/api/enquiries") {
    handleGetEnquiries(response);
    return;
  }

  // Contact form submission endpoint
  if (request.method === "POST" && url.pathname === "/api/contact") {
    await handleContact(request, response);
    return;
  }

  sendJson(response, 404, { message: "Endpoint not found." });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = http.createServer((request, response) => {
    handleApiRequest(request, response).catch((error) => {
      console.error("[API] Unhandled request error:", error);
      if (!response.headersSent) {
        sendJson(response, 500, { message: "Unable to process the request." });
      } else {
        response.destroy();
      }
    });
  });

  server.listen(port, () => {
    console.log(`\n=================================================`);
    console.log(`  BuildCore API Server running on port ${port}`);
    console.log(`  Health Check: http://localhost:${port}/api/health`);
    console.log(`  Enquiries:    http://localhost:${port}/api/enquiries`);
    console.log(`  Contact POST: http://localhost:${port}/api/contact`);
    console.log(`  Target Email: ${contactEmail}`);
    console.log(`  SMTP Status:  ${smtpUser ? "Configured" : "Unconfigured"}`);
    console.log(`=================================================\n`);
  });
}

// Graceful termination
process.on("SIGINT", () => {
  server.close(() => process.exit(0));
});
process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
});
