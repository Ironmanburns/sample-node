import { test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { spawn } from "node:child_process";

// Boot the real server so we exercise actual request handling, not a stub.
// The app logs the PORT value it was given rather than the bound socket, so
// we pick an explicit high port instead of relying on an ephemeral one.
const TEST_PORT = 31847;

function startServer() {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["server.js"], {
      cwd: new URL("..", import.meta.url).pathname,
      env: { ...process.env, PORT: String(TEST_PORT), APP_VERSION: "9.9.9-test" },
    });
    let settled = false;
    const finish = () => {
      if (!settled) {
        settled = true;
        resolve({ child, port: TEST_PORT });
      }
    };
    child.stdout.on("data", (buf) => {
      if (/listening on port/.test(buf.toString())) finish();
    });
    child.on("error", reject);
    setTimeout(() => {
      if (!settled) reject(new Error("server did not start in time"));
    }, 3000);
  });
}

function get(port, path) {
  return new Promise((resolve, reject) => {
    http
      .get({ host: "127.0.0.1", port, path }, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () =>
          resolve({ status: res.statusCode, body: data }),
        );
      })
      .on("error", reject);
  });
}

test("/healthz returns 200 with ok status", async () => {
  const { child, port } = await startServer();
  try {
    const res = await get(port, "/healthz");
    assert.equal(res.status, 200);
    assert.deepEqual(JSON.parse(res.body), { status: "ok" });
  } finally {
    child.kill();
  }
});

test("/version reports version, service and channel", async () => {
  const { child, port } = await startServer();
  try {
    const res = await get(port, "/version");
    assert.equal(res.status, 200);
    const body = JSON.parse(res.body);
    assert.equal(body.service, "sample-node");
    assert.equal(body.version, "9.9.9-test");
    assert.equal(body.channel, "harness");
  } finally {
    child.kill();
  }
});

test("unknown route returns 404 not_found", async () => {
  const { child, port } = await startServer();
  try {
    const res = await get(port, "/nope");
    assert.equal(res.status, 404);
    assert.deepEqual(JSON.parse(res.body), { error: "not_found" });
  } finally {
    child.kill();
  }
});
