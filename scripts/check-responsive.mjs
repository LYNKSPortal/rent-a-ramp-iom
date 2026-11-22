import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

const baseURL = process.env.TEST_BASE_URL || "http://localhost:3000";
const browser = await chromium.launch();
const failures = [];
const pages = ["/", "/booking", "/booking/thank-you", "/terms", "/safety", "/privacy"];
const widths = [320, 360, 375, 390, 414, 640, 768, 1024, 1280];

async function checkOverflow(page, label) {
  const result = await page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const overflowing = [...document.querySelectorAll("body *")].filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && style.visibility !== "hidden" && (rect.right > width + 1 || rect.left < -1);
    }).slice(0, 8).map((element) => ({
      tag: element.tagName, text: element.textContent?.trim().slice(0, 70), className: element.getAttribute("class"),
      right: Math.round(element.getBoundingClientRect().right),
    }));
    return { width, scrollWidth: document.documentElement.scrollWidth, overflowing };
  });
  if (result.scrollWidth > result.width + 1 || result.overflowing.length) failures.push({ label, ...result });
}

try {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  await page.route("https://maps.google.com/**", (route) => route.abort());
  for (const width of widths) {
    await page.setViewportSize({ width, height: 844 });
    for (const path of pages) {
      const response = await page.goto(`${baseURL}${path}`, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200, path);
      await page.evaluate(() => document.fonts.ready);
      await checkOverflow(page, `${width}px ${path}`);
      if (width < 1024) {
        const menuButton = page.getByRole("button", { name: "Open menu" });
        const bounds = await menuButton.boundingBox();
        assert.ok(bounds.width >= 44 && bounds.height >= 44, "Mobile menu must retain a 44px touch target");
        await menuButton.click();
        await page.waitForTimeout(300);
        await checkOverflow(page, `${width}px ${path} mobile menu`);
        await page.keyboard.press("Escape");
        assert.equal(await page.getByRole("button", { name: "Open menu" }).getAttribute("aria-expanded"), "false");
      }
      if (path === "/") {
        await page.locator("#pricing").scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        await checkOverflow(page, `${width}px pricing`);
      }
    }
    await page.goto(`${baseURL}/booking`);
    await page.getByRole("button", { name: /2-Post Lift A/ }).click();
    await page.getByRole("button", { name: /^1 Hour/ }).click();
    await page.locator("#booking-date").fill("2099-01-05");
    await page.getByRole("button", { name: "09:00", exact: true }).click();
    await page.locator("#name").fill("A customer with a longer full name for mobile testing");
    await page.locator("#email").fill("long.customer.address.for.testing@example.com");
    await page.locator("#phone").fill("+447624332271");
    await page.locator("#notes").fill("Long booking notes ".repeat(30));
    await checkOverflow(page, `${width}px populated booking form`);
    let submissions = 0;
    await page.route("**/api/bookings", (route) => {
      submissions++;
      const payload = route.request().postDataJSON();
      assert.equal(payload.acceptedPolicies, true);
      assert.equal(typeof payload.policyVersion, "string");
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) });
    });
    const submit = page.getByRole("button", { name: "Request This Booking" });
    await submit.click();
    assert.equal(submissions, 0, "Missing policy acceptance must prevent submission");
    await page.locator("#accepted-policies").check();
    await submit.evaluate((button) => { button.form.requestSubmit(); button.form.requestSubmit(); });
    await page.waitForURL("**/booking/thank-you");
    assert.equal(submissions, 1, "Rapid duplicate submissions must only send once");
    await checkOverflow(page, `${width}px submitted thank-you`);
    await page.unroute("**/api/bookings");
    console.log(`Checked all pages, mobile menu and mocked booking submission at ${width}px`);
  }
  assert.equal(failures.length, 0, JSON.stringify(failures, null, 2));
  console.log("No horizontal overflow detected.");
} finally {
  await browser.close();
}
