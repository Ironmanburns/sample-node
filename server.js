import http from "node:http";

const port = Number(process.env.PORT || 8080);
const service = process.env.SERVICE_NAME || "sample-node";
const version = process.env.APP_VERSION || process.env.npm_package_version || "0.1.0";

const server = http.createServer((req, res) => {
  if (req.url === "/healthz") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }
  if (req.url === "/version") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ version, service }));
    return;
  }
  res.writeHead(404, { "content-type": "application/json" });
  res.end(JSON.stringify({ error: "not_found" }));
});

server.listen(port, () => {
  console.log(`${service} listening on ${port}`);
});
