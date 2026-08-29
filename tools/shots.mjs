#!/usr/bin/env node
// Screenshots, for looking at with your own eyes.
//
//   node tools/shots.mjs <url> [more urls] [--widths 390,1280] [--schemes light,dark]
//                        [--out DIR] [--full] [--scroll 900]
//
// The detector (tools/visual-check.mjs) only knows the faults it was taught.
// It was clean on a front page whose top block was a panel of site statistics
// nobody wants and whose listing was a table where the network uses cards —
// both obvious the moment anyone looked. So: look. This exists so that takes
// one command rather than a throwaway script each time.
//
// Files land as <path>-<width>-<scheme>.png, viewport-height by default so a
// screenshot is one screen a reader actually sees; --full for the whole page.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { tmpdir } from "node:os";
import { mkdtempSync } from "node:fs";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const urls = args.filter((a) => a.includes("//") && !a.startsWith("--"));
if (!urls.length) {
  console.error("usage: node tools/shots.mjs <url> [more urls] [--widths 390,1280] [--schemes light,dark] [--out DIR] [--full]");
  process.exit(2);
}
const widths = flag("widths", "390,1280").split(",").map(Number);
const schemes = flag("schemes", "light,dark").split(",");
const out = flag("out", mkdtempSync(path.join(tmpdir(), "shots-")));
const fullPage = args.includes("--full");
// A block below the fold is still one screen a reader sees: scroll to it and
// shoot that, rather than reading a page-tall image.
const scroll = Number(flag("scroll", 0));

mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
for (const scheme of schemes) {
  for (const width of widths) {
    const ctx = await browser.newContext({
      viewport: { width, height: 900 },
      colorScheme: scheme,
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    for (const url of urls) {
      await page.goto(url, { waitUntil: "networkidle" }).catch(() => {});
      if (scroll) await page.evaluate((y) => window.scrollTo(0, y), scroll);
      const { port, pathname } = new URL(url);
      const name = `${port || "site"}${pathname}`.replace(/[\/]+/g, "_").replace(/_$/, "") || "_root";
      const file = path.join(out, `${name}-${width}-${scheme}.png`);
      await page.screenshot({ path: file, fullPage });
      console.log(file);
    }
    await ctx.close();
  }
}
await browser.close();
