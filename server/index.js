import http from "node:http";
import nodemailer from "nodemailer";

const port = Number(process.env.MAIL_SERVER_PORT || 3001);
const maxBodySize = 100_000;

const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];
const contactEmail = process.env.CONTACT_EMAIL || "tanujsulke7321@gmail.com";
const companyName = "Buildcore Construction";
const companyPhone = "+91 72680 91313";

function missingConfiguration() {
  return requiredEnv.filter((name) => !process.env[name]);
}

function escapeHtml(value) {
  return value
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
        reject(new Error("Request body is too large."));
        request.destroy();
      }
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Request body must be valid JSON."));
      }
    });
    request.on("error", reject);
  });
}

async function handleContact(request, response) {
  const configuration = missingConfiguration();
  if (configuration.length > 0) {
    sendJson(response, 500, { message: "Mail service is not configured." });
    return;
  }

  let payload;
  try {
    payload = await readJson(request);
  } catch (error) {
    sendJson(response, 400, { message: error.message });
    return;
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const enquiryType = payload.enquiryType === "general" ? "General enquiry" : "Project enquiry";

  if (!name || !email || !phone || !/^\S+@\S+\.\S+$/.test(email)) {
    sendJson(response, 400, { message: "Name, email, and mobile number are required." });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const sender = process.env.SMTP_FROM || process.env.SMTP_USER;
    await Promise.all([
      transporter.sendMail({
        from: sender,
        to: contactEmail,
        replyTo: email,
        subject: `New ${enquiryType.toLowerCase()} from ${name}`,
        text: [
          `${enquiryType}`,
          `Name: ${name}`,
          `Email: ${email}`,
          `Mobile: ${phone}`,
          message && `Message: ${message}`,
        ]
          .filter(Boolean)
          .join("\n"),
        html: `<h2>New ${escapeHtml(enquiryType)}</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Mobile:</strong> ${escapeHtml(phone)}</p>${message ? `<p><strong>Message:</strong> ${escapeHtml(message)}</p>` : ""}`,
      }),
      transporter.sendMail({
        from: sender,
        to: email,
        subject: `We received your message | ${companyName}`,
        text: `Dear ${name},\n\nThank you for contacting ${companyName}.\n\nWe have received your email and will get back to you shortly.\n\nThank you for choosing ${companyName}.\n\nBest Regards,\n${companyName}\n${companyPhone}\n${contactEmail}`,
        html: `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#1a1a1a;max-width:640px;margin:0 auto"><div style="border-bottom:3px solid #b96f16;padding-bottom:16px;margin-bottom:28px"><h2 style="color:#b96f16;margin:0">${companyName}</h2></div><p>Dear ${escapeHtml(name)},</p><p>Thank you for contacting <strong>${companyName}</strong>.</p><p>We have received your email and will get back to you shortly.</p><p>Thank you for choosing ${companyName}.</p><p style="margin-top:28px">Best Regards,<br /><strong>${companyName}</strong><br />${companyPhone}<br /><a href="mailto:${contactEmail}" style="color:#b96f16">${contactEmail}</a></p></div>`,
      }),
    ]);
  } catch (error) {
    console.error("Unable to send contact email:", error);
    sendJson(response, 502, { message: "Unable to send your request right now." });
    return;
  }

  sendJson(response, 200, { message: "Contact request sent." });
}

const server = http.createServer((request, response) => {
  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method === "POST" && request.url === "/api/contact") {
    handleContact(request, response);
    return;
  }

  sendJson(response, 404, { message: "Not found." });
});

server.listen(port, () => {
  console.log(`Mail server listening on http://localhost:${port}`);
});
