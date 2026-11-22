import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = new URL("../../../", import.meta.url);

function loadModule(send, env = { RESEND_API_KEY: "test-only", RESEND_FROM_EMAIL: "Rent a Ramp <bookings@rentaramp.im>" }, entry = "app/api/bookings/route.ts") {
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
  return load(new URL(entry, root));
}

function loadRoute(send, env) {
  return loadModule(send, env).POST;
}

const input = {
  rampId: "2post-a", durationId: "1h", date: "2099-01-05", hour: 9,
  name: "Test Customer", email: "customer@example.test", phone: "+447624332271",
  notes: "TEST ONLY", acceptedPolicies: true, policyVersion: "2026-11-22", requestId: "12345678-1234-1234-1234-123456789abc",
};
const request = (body, origin = "https://www.rentaramp.im") => new Request("https://www.rentaramp.im/api/bookings", {
  method: "POST", headers: { "Content-Type": "application/json", origin }, body: JSON.stringify(body),
});

test("every fitting slot is selectable for every ramp, with no simulated bookings", () => {
  const { getTimeSlotsForDate } = loadModule(undefined, {}, "lib/availability.ts");
  const { RAMPS, BOOKING_DURATIONS } = loadModule(undefined, {}, "lib/site-config.ts");
  for (const ramp of RAMPS) {
    for (const duration of BOOKING_DURATIONS) {
      for (let day = 5; day <= 9; day++) {
        const slots = getTimeSlotsForDate(`2099-01-0${day}`, ramp.id, duration.hours);
        assert.equal(slots.length, 9 - duration.hours);
        assert.equal(slots[0].hour, 9);
        assert.equal(slots.at(-1).hour + duration.hours, 17);
        assert.ok(slots.every((slot) => slot.available));
      }
      const saturday = getTimeSlotsForDate("2099-01-10", ramp.id, duration.hours);
      assert.equal(saturday.length, Math.max(0, 7 - duration.hours));
      assert.ok(saturday.every((slot) => slot.available && slot.hour >= 10 && slot.hour + duration.hours <= 16));
      assert.equal(getTimeSlotsForDate("2099-01-11", ramp.id, duration.hours).length, 0);
    }
  }
});

test("API accepts opening and closing boundaries and repeat requests without checking clashes", async () => {
  const post = loadRoute(async () => Response.json({ data: [{ id: "owner" }, { id: "customer" }] }));
  for (const selection of [
    { hour: 9, durationId: "full" },
    { hour: 16, durationId: "1h" },
    { hour: 16, durationId: "1h" },
    { date: "2099-01-10", hour: 10, durationId: "half" },
    { date: "2099-01-10", hour: 15, durationId: "1h" },
  ]) assert.equal((await post(request({ ...input, ...selection }))).status, 200);
});

test("rejects missing, false and non-boolean policy acceptance before sending email", async () => {
  const post = loadRoute(() => assert.fail("Must not send without policy acceptance"));
  for (const acceptedPolicies of [undefined, false, "true", 1]) {
    const response = await post(request({ ...input, acceptedPolicies }));
    assert.equal(response.status, 400);
    assert.equal((await response.json()).code, "POLICY_ACCEPTANCE_REQUIRED");
  }
});

test("rejects outdated policy versions and invalid required fields without sending", async () => {
  const post = loadRoute(() => assert.fail("Must not send invalid data"));
  for (const change of [{ name: " " }, { email: "" }, { phone: "------" }, { phone: "" }, { notes: "x".repeat(2001) }, { requestId: "-".repeat(36) }, { date: "2099-02-30" }]) {
    const validate = loadRoute(() => assert.fail("Must not send invalid data"));
    assert.equal((await validate(request({ ...input, ...change }))).status, 400);
  }
  const response = await post(request({ ...input, policyVersion: "old" }));
  assert.equal(response.status, 400);
  assert.equal((await response.json()).code, "POLICY_VERSION_CHANGED");
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
  assert.deepEqual(payload[0].to, ["bookings@rentaramp.im"]);
  assert.equal(payload[0].reply_to, input.email);
  assert.match(payload[0].text, /£25/);
  assert.deepEqual(payload[1].to, [input.email]);
  assert.equal(payload[1].reply_to, "bookings@rentaramp.im");
  assert.match(payload[1].text, /NOT reserved/);
  assert.match(payload[1].text, /within 24 hours/);
  assert.match(payload[1].text, /does not confirm your booking/);
  for (const message of payload) {
    assert.equal(message.from, "Rent a Ramp <bookings@rentaramp.im>");
    assert.match(message.html, /bgcolor="#f7f7f7"/);
    assert.match(message.html, /https:\/\/www\.rentaramp\.im\/logo-dark\.png/);
    assert.match(message.html, /width="300"/);
    assert.match(message.html, /#e10205/);
    assert.match(message.html, /£25/);
    assert.ok(message.text);
    assert.match(message.text, /Terms & Conditions and Safety Guidance accepted: yes/);
    assert.match(message.html, /Terms &amp; Conditions and Safety Guidance accepted/);
  }
  assert.match(payload[1].html, /Your booking is not yet confirmed/);
  assert.match(payload[1].html, /24 hours/);
  assert.match(payload[0].html, /Reply to customer/);
});

test("escapes customer content in both HTML email templates", async () => {
  let messages;
  const post = loadRoute(async (_url, options) => {
    messages = JSON.parse(options.body);
    return Response.json({ data: [{ id: "owner-email" }, { id: "customer-email" }] });
  });
  assert.equal((await post(request({ ...input, name: '<img src=x onerror="alert(1)">', notes: "<script>test</script>\nSecond line & more" }))).status, 200);
  for (const message of messages) {
    assert.doesNotMatch(message.html, /<script>|<img src=x/);
    assert.match(message.html, /&lt;script&gt;/);
    assert.match(message.html, /&lt;img/);
    assert.match(message.html, /<br>Second line &amp; more/);
  }
});

test("rejects bad input, closed days, out-of-hours slots, spam and foreign origins without emailing", async () => {
  const post = loadRoute(() => assert.fail("Must not send an email"));
  for (const body of [{ ...input, email: "invalid" }, { ...input, date: "2099-01-04" }, { ...input, hour: 18 }, { ...input, website: "spam" }]) {
    assert.equal((await post(request(body))).status, 400);
  }
  assert.equal((await post(request(input, "https://other.example"))).status, 403);
});

test("provider failures and missing credentials return diagnostic references without exposing secrets", async () => {
  const rejected = await loadRoute(async () => Response.json({ name: "validation_error", message: "private provider detail" }, { status: 403 }))(request(input));
  assert.equal(rejected.status, 502);
  const rejection = await rejected.json();
  assert.equal(rejection.code, "EMAIL_PROVIDER_403");
  assert.doesNotMatch(JSON.stringify(rejection), /private provider detail|test-only/);
  const missing = await loadRoute(() => assert.fail("Must not call provider"), {})(request(input));
  assert.equal(missing.status, 503);
  assert.equal((await missing.json()).code, "EMAIL_CONFIG");
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
