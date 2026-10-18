import { Readable } from "node:stream";
import { handleApiRequest } from "../../server/index.js";

function createRequest(event) {
  const request = Readable.from([event.body || ""]);
  request.method = event.httpMethod;
  request.url = event.path || "/api/contact";
  request.headers = event.headers || {};
  request.socket = { remoteAddress: event.headers?.["x-nf-client-connection-ip"] || "127.0.0.1" };
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

export default async function handler(event) {
  const request = createRequest(event);
  const response = createResponse();
  await handleApiRequest(request, response);
  const result = response.result();

  return {
    statusCode: result.statusCode,
    headers: result.headers,
    body: result.body,
  };
}
