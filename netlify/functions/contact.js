import { Readable } from "node:stream";
import { handleApiRequest } from "../../server/index.js";

function createRequest(event) {
  const body = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64").toString("utf8")
    : event.body || "";
  const headers = Object.fromEntries(
    Object.entries(event.headers || {}).map(([name, value]) => [name.toLowerCase(), value])
  );
  const request = Readable.from([body]);
  request.method = event.httpMethod;
  request.url = "/api/contact";
  request.headers = headers;
  request.socket = { remoteAddress: headers["x-nf-client-connection-ip"] || "127.0.0.1" };
  return request;
}

function createResponse() {
  let statusCode = 200;
  const headers = {};
  const chunks = [];

  return {
    setHeader(name, value) {
      headers[name] = value;
    },
    writeHead(code, responseHeaders) {
      statusCode = code;
      Object.assign(headers, responseHeaders);
    },
    end(body = "") {
      chunks.push(body);
    },
    result() {
      return {
        statusCode,
        headers,
        body: chunks.join(""),
      };
    },
  };
}

export async function handler(event) {
  try {
    const request = createRequest(event);
    const response = createResponse();
    await handleApiRequest(request, response);
    const result = response.result();

    return {
      statusCode: result.statusCode,
      headers: result.headers,
      body: result.body,
    };
  } catch (error) {
    console.error("[Netlify Contact Function]", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ message: "Unable to process the contact request." }),
    };
  }
}

export default handler;
