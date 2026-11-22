import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = new URL("../../../", import.meta.url);

function loadRoute(send, env = { RESEND_API_KEY: "test-only", RESEND_FROM_EMAIL: "Rent a Ramp <noreply@rentaramp.im>" }) {
  const cache = new Map();
  function load(file) {
    if (cache.has(file.href)) return cache.get(file.href);
    const loaded = { exports: {} };
    cache.set(file.href, loaded.exports);
    const source = ts.transpileModule(readFileSync(file, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    vm.runInNewContext(source, {
      module: loaded, exports: loaded.exports,
      require: (name) => name.startsWith("@/") ? load(new URL(`${name.slice(2)}.ts`, root)) : require(name),
      process: { env }, Request, Response, URL, AbortSignal, fetch: send,
    }, { filename: file.pathname });
    return loaded.exports;
  }
  return load(new URL("app/api/bookings/route.ts", root)).POST;
}

const input = {
  rampId: "2post-a", durationId: "1h", date: "2099-01-05", hour: 9.25,
  name: "Test Customer", email: "customer@example.test", phone: "+447624332271",
  notes: "TEST ONLY", requestId: "12345678-1234-1234-1234-123456789abc",
};
const request = (body, origin = "https://www.rentaramp.im") => new Request("https://www.rentaramp.im/api/bookings", {
  method: "POST", headers: { "Content-Type": "application/json", origin }, body: JSON.stringify(body),
});

test("sends separate owner and customer emails with correct sender, reply-to and server-calculated pricing", async () => {
  let payload;
  const post = loadRoute(async (url, options) => {
    assert.equal(url, "https://api.resend.com/emails/batch");
    payload = JSON.parse(options.body);
    assert.equal(options.headers["Idempotency-Key"], `booking-${input.requestId}`);
    return Response.json({ data: [{ id: "owner-email" }, { id: "customer-email" }] });
  });
  assert.equal((await post(request({ ...input, price: 0, to: "attacker@example.test" }))).status, 200);
  assert.equal(payload.length, 2);
  assert.deepEqual(payload[0].to, ["tomasz@tdcar.im"]);
  assert.equal(payload[0].reply_to, input.email);
  assert.match(payload[0].text, /£25/);
  assert.deepEqual(payload[1].to, [input.email]);
  assert.equal(payload[1].reply_to, "tomasz@tdcar.im");
  assert.match(payload[1].text, /NOT reserved/);
  for (const message of payload) assert.equal(message.from, "Rent a Ramp <noreply@rentaramp.im>");
});

test("rejects bad input, closed days, out-of-hours slots, spam and foreign origins without emailing", async () => {
  const post = loadRoute(() => assert.fail("Must not send an email"));
  for (const body of [{ ...input, email: "invalid" }, { ...input, date: "2099-01-04" }, { ...input, hour: 18 }, { ...input, website: "spam" }]) {
    assert.equal((await post(request(body))).status, 400);
  }
  assert.equal((await post(request(input, "https://other.example"))).status, 403);
});

test("provider failures and missing credentials never report success", async () => {
  assert.equal((await loadRoute(async () => Response.json({ error: "failure" }, { status: 403 }))(request(input))).status, 502);
  assert.equal((await loadRoute(() => assert.fail("Must not call provider"), {})(request(input))).status, 503);
});

test("incomplete batch responses never report success", async () => {
  const post = loadRoute(async () => Response.json({ data: [{ id: "owner-email" }] }));
  assert.equal((await post(request(input))).status, 502);
});

test("limits repeated submissions within a server instance", async () => {
  const post = loadRoute(async () => Response.json({ data: [{ id: "owner-email" }, { id: "customer-email" }] }));
  for (let i = 0; i < 5; i++) assert.equal((await post(request(input))).status, 200);
  assert.equal((await post(request(input))).status, 429);
});
