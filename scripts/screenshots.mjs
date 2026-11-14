/**
 * Visual QA: screenshots every route at four widths in light and dark themes,
 * and reports horizontal overflow, console errors and failed requests.
 *
 * Usage:
 *   pnpm build && pnpm start -p 3100
 *   BASE_URL=http://localhost:3100 OUT_DIR=./qa-screenshots pnpm screenshots
 *
 * Uses the locally installed Microsoft Edge (channel "msedge") so no browser
 * download is needed. Set PW_CHANNEL=chrome to use Chrome instead.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3100";
const OUT_DIR = process.env.OUT_DIR ?? "qa-screenshots";
const ROUTES = (process.env.ROUTES ?? "/,/work,/services,/about,/contact,/privacy,/does-not-exist").split(",");
const WIDTHS = (process.env.WIDTHS ?? "390,768,1280,1440").split(",").map(Number);
const THEMES = (process.env.THEMES ?? "light,dark").split(",");
const FULL_PAGE = process.env.FULL_PAGE !== "0";

await mkdir(OUT_DIR, { recursive: true });
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "msedge" });
const problems = [];

for (const theme of THEMES) {
  for (const width of WIDTHS) {
    const context = await browser.newContext({
      viewport: { width, height: width < 768 ? 844 : 900 },
      deviceScaleFactor: 1,
      reducedMotion: process.env.REDUCED_MOTION === "1" ? "reduce" : "no-preference",
    });
    await context.addInitScript((t) => localStorage.setItem("fca-theme", t), theme);

    for (const route of ROUTES) {
      const page = await context.newPage();
      const errors = [];
      page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
      page.on("pageerror", (err) => errors.push(err.message));
      page.on("requestfailed", (req) => errors.push(`request failed: ${req.url()}`));

      await page.goto(`${BASE_URL}${route}`, { waitUntil: "load", timeout: 120000 });
      // Scroll through so lazy images load, then return to top and let the hero settle.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 400) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 150));
        }
        // Dwell at the very bottom so footer images start loading too.
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise((r) => setTimeout(r, 500));
        window.scrollTo(0, 0);
      });
      await page
        .waitForFunction(() => [...document.images].filter((img) => img.checkVisibility()).every((img) => img.complete && img.naturalWidth > 0), null, {
          timeout: 20000,
        })
        .catch(() => problems.push(`${theme} ${width} ${route}: some images did not finish loading`));
      await page.waitForTimeout(2600);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 0) problems.push(`${theme} ${width} ${route}: horizontal overflow ${overflow}px`);
      // 404 route intentionally logs a 404 resource error.
      const relevant = errors.filter((e) => !(route === "/does-not-exist" && e.includes("404")));
      for (const e of relevant) problems.push(`${theme} ${width} ${route}: ${e}`);

      const name = `${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}-${width}-${theme}.png`;
      await page.screenshot({ path: path.join(OUT_DIR, name), fullPage: FULL_PAGE });
      await page.close();
    }
    await context.close();
  }
}

await browser.close();
if (problems.length) {
  console.log(`Found ${problems.length} problem(s):\n${problems.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log("No overflow, console errors or failed requests found.");
}
