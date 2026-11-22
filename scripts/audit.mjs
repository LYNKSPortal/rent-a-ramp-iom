import assert from "node:assert/strict";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";

const baseURL = process.env.TEST_BASE_URL || "http://localhost:3100";
const browser = await chromium.launch();
const chrome = await launch({ chromePath: chromium.executablePath(), chromeFlags: ["--headless", "--no-sandbox"] });
try {
  await mkdir(".next/audits", { recursive: true });
  for (const path of ["/", "/booking"]) {
    const result = await lighthouse(`${baseURL}${path}`, { port: chrome.port, output: "json", onlyCategories: ["performance", "accessibility", "best-practices", "seo"] });
    const report = result.lhr;
    await writeFile(`.next/audits/${path === "/" ? "home" : "booking"}.json`, JSON.stringify(report, null, 2));
    console.log(path, JSON.stringify({ scores: Object.fromEntries(Object.entries(report.categories).map(([key, value]) => [key, Math.round(value.score * 100)])), metrics: Object.fromEntries(["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift"].map((key) => [key, report.audits[key].displayValue])), issues: Object.entries(report.audits).filter(([, audit]) => audit.score !== null && audit.score < 0.9 && audit.scoreDisplayMode !== "informative").map(([key, audit]) => ({ key, title: audit.title, value: audit.displayValue })) }, null, 2));
  }
  const context = await browser.newContext({ viewport: { width: 375, height: 844 } });
  const page = await context.newPage();
  for (const path of ["/", "/booking", "/booking/thank-you", "/terms", "/safety", "/privacy"]) {
    await page.goto(`${baseURL}${path}`, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    console.log("AXE", path, JSON.stringify(results.violations.map(({ id, impact, nodes }) => ({ id, impact, elements: nodes.map(({ target }) => target) }))));
    assert.equal(results.violations.length, 0, `Accessibility violations on ${path}`);
  }
} finally {
  await browser.close();
  await chrome.kill();
}
