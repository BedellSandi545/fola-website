/**
 * Browser interaction checks: theme persistence, mobile menu keyboard behaviour,
 * skip link, contact form states and reduced motion.
 *
 * Usage: BASE_URL=http://localhost:3100 node scripts/interaction-check.mjs
 * Expects the contact provider to be NOT configured (checks the honest fallback).
 */
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3100";
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "msedge" });
const results = [];
const check = (name, ok, detail = "") => results.push({ name, ok: Boolean(ok), detail });
const consoleErrors = [];

function track(page) {
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
  page.on("pageerror", (e) => consoleErrors.push(e.message));
}

// 1. Theme: explicit choice persists across reloads; system follows the OS.
{
  const context = await browser.newContext({ colorScheme: "light", viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  track(page);
  await page.goto(`${BASE_URL}/`, { waitUntil: "load" });
  await page.waitForFunction(() => document.querySelector('[aria-label="Dark theme"]')?.hasAttribute("aria-pressed"));
  check("theme: defaults to system (light OS)", (await page.getAttribute("html", "data-theme")) === "light");
  await page.getByRole("button", { name: "Dark theme" }).click();
  check("theme: dark applied on click", (await page.getAttribute("html", "data-theme")) === "dark");
  check("theme: aria-pressed reflects choice", (await page.getByRole("button", { name: "Dark theme" }).getAttribute("aria-pressed")) === "true");
  check("theme: stored", (await page.evaluate(() => localStorage.getItem("fca-theme"))) === "dark");

  // The inline script must set the theme before any client JS runs (no flash).
  await page.route("**/_next/static/chunks/**", (route) => route.abort());
  await page.reload({ waitUntil: "domcontentloaded" });
  check("theme: persisted before hydration (JS bundles blocked)", (await page.getAttribute("html", "data-theme")) === "dark");
  await page.unroute("**/_next/static/chunks/**");

  await page.reload({ waitUntil: "load" });
  // Wait for hydration: the toggle exposes aria-pressed only once it knows the stored mode.
  await page.waitForFunction(() => document.querySelector('[aria-label="Dark theme"]')?.hasAttribute("aria-pressed"));
  await page.getByRole("button", { name: "Match system theme" }).click();
  await page.emulateMedia({ colorScheme: "dark" });
  await page.waitForTimeout(200);
  check("theme: system mode follows OS change live", (await page.getAttribute("html", "data-theme")) === "dark");
  await context.close();
}

// 2. Skip link and mobile menu keyboard behaviour.
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  track(page);
  await page.goto(`${BASE_URL}/`, { waitUntil: "load" });
  await page.keyboard.press("Tab");
  check("skip link: first tab stop", (await page.evaluate(() => document.activeElement?.textContent?.trim())) === "Skip to content");

  const menuButton = page.getByRole("button", { name: "Open menu" });
  await menuButton.click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  check("menu: opens as dialog", await dialog.isVisible());
  check("menu: aria-expanded true", (await page.getByRole("button", { name: "Close menu" }).getAttribute("aria-expanded")) === "true");
  check("menu: focus moves into menu", (await page.evaluate(() => document.activeElement?.textContent?.trim()))?.endsWith("Home"));
  check("menu: body scroll locked", (await page.evaluate(() => document.body.style.overflow)) === "hidden");

  // Tab past the last item should wrap to the menu button.
  const count = await dialog.locator("a[href], button").count();
  for (let i = 0; i < count; i++) await page.keyboard.press("Tab");
  check(
    "menu: focus trapped (wraps to toggle)",
    (await page.evaluate(() => document.activeElement?.getAttribute("aria-label"))) === "Close menu",
  );

  await page.keyboard.press("Escape");
  check("menu: Escape closes", !(await dialog.isVisible()));
  check("menu: focus returns to toggle", (await page.evaluate(() => document.activeElement?.getAttribute("aria-label"))) === "Open menu");

  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("dialog").getByRole("link", { name: "Services" }).click();
  await page.waitForURL("**/services");
  check("menu: navigating closes menu", !(await page.getByRole("dialog", { name: "Menu" }).isVisible()));
  await context.close();
}

// 3. Contact form: validation, focus management and honest fallback.
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  track(page);
  await page.goto(`${BASE_URL}/contact`, { waitUntil: "load" });
  await page.getByRole("button", { name: "Send message" }).click();
  const summary = page.getByRole("alert").filter({ hasText: "before sending" });
  check("form: error summary shown on empty submit", await summary.isVisible());
  check("form: summary receives focus", await summary.evaluate((el) => el === document.activeElement));
  check("form: three required-field errors", (await summary.locator("li").count()) === 3);
  check("form: invalid fields flagged", (await page.locator('[aria-invalid="true"]').count()) === 3);

  await page.getByLabel("Your name *").fill("Test Visitor");
  await page.getByLabel("Email address *").fill("visitor@example.com");
  await page.getByLabel("Tell us about your project *").fill("We are planning a product launch and need a campaign.");
  check("form: errors clear as fields become valid", (await page.locator('[aria-invalid="true"]').count()) === 0);
  await page.waitForTimeout(2800); // exceed the minimum fill time
  await page.getByRole("button", { name: "Send message" }).click();
  const fallback = page.getByText("Online sending isn't available yet");
  await fallback.waitFor({ timeout: 15000 }).catch(() => {});
  check("form: honest fallback when provider not configured", await fallback.isVisible());
  check("form: no false success", !(await page.getByText("Message sent").isVisible()));
  const mailto = await page.getByRole("link", { name: "Email your message" }).getAttribute("href");
  check("form: mailto fallback carries the message", Boolean(mailto?.startsWith("mailto:") && mailto.includes("product%20launch")));
  await context.close();
}

// 3b. Contact form: reply by WhatsApp instead of email; social links are real links.
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  track(page);
  await page.goto(`${BASE_URL}/contact`, { waitUntil: "load" });
  await page.getByText("We'll message you on WhatsApp").click();
  check("form: choosing WhatsApp swaps the email field", (await page.getByLabel("Email address *").count()) === 0);
  await page.getByLabel("Your name *").fill("Test Visitor");
  await page.getByLabel("WhatsApp number *").fill("12");
  await page.getByLabel("Tell us about your project *").fill("We are planning a product launch and need a campaign.");
  await page.getByRole("button", { name: "Send message" }).click();
  check("form: invalid WhatsApp number rejected", await page.getByRole("alert").filter({ hasText: "country code" }).isVisible());
  await page.getByLabel("WhatsApp number *").fill("+231 880 007 811");
  await page.waitForTimeout(2800);
  await page.getByRole("button", { name: "Send message" }).click();
  const wa = page.getByRole("link", { name: /Send on WhatsApp/ });
  await wa.waitFor({ timeout: 15000 }).catch(() => {});
  const waHref = await wa.getAttribute("href").catch(() => null);
  check("form: WhatsApp fallback opens a chat with FCA", Boolean(waHref?.startsWith("https://wa.me/231880007811?text=")));

  const socials = await page.locator("aside a[target=_blank]").evaluateAll((els) => els.map((a) => a.getAttribute("href")));
  check(
    "social: WhatsApp, TikTok, Instagram and Facebook are links",
    ["wa.me/231880007811", "tiktok.com/@folacreativeagency", "instagram.com", "facebook.com"].every((u) => socials.some((h) => h?.includes(u))),
    socials.join(" "),
  );
  await context.close();
}

// 3c. Home: client brand names are no longer listed; signature in header and footer.
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${BASE_URL}/`, { waitUntil: "load" });
  const text = await page.locator("body").innerText();
  check("home: no brand names section", !/Sinkor|Afridodge|TM Mall|Brands we/i.test(text));
  check("signature: in header", (await page.locator("header img[src*=signature]").count()) > 0);
  check("signature: in footer", (await page.locator("footer img[src*=signature]").count()) > 0);
  const nav = await page.locator('header nav[aria-label="Primary"]').first().locator("a").allInnerTexts();
  check("nav: Home, About Us, Services, Work, Contact", nav.join(",") === "Home,About Us,Services,Work,Contact", nav.join(","));
  await context.close();
}

// 4. Reduced motion: hero content is visible immediately.
{
  const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  track(page);
  await page.goto(`${BASE_URL}/`, { waitUntil: "load" });
  const opacities = await page.$$eval("[data-hero-line], [data-hero-fade], [data-hero-media]", (els) =>
    els.map((el) => getComputedStyle(el).opacity),
  );
  check("reduced motion: hero fully visible at load", opacities.every((o) => o === "1"), opacities.join(","));
  await context.close();
}

// 5. Without JavaScript all content is readable.
{
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${BASE_URL}/`, { waitUntil: "load" });
  const opacities = await page.$$eval("[data-hero-line]", (els) => els.map((el) => getComputedStyle(el).opacity));
  check("no JS: hero headline visible", opacities.every((o) => o === "1"), opacities.join(","));
  await context.close();
}

await browser.close();

const relevantErrors = consoleErrors.filter((e) => !e.includes("net::ERR_FAILED") && !e.includes("503"));
check("no console errors during checks", relevantErrors.length === 0, relevantErrors.slice(0, 3).join(" | "));

for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.detail && !r.ok ? `  (${r.detail})` : ""}`);
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} checks passed`);
if (failed) process.exitCode = 1;
