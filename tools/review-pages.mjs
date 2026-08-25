#!/usr/bin/env node
// Screenshots pages and asks a vision model what a agency shipping a
// multi-million-dollar site would have caught before release.
//
// The point is a second pair of eyes that isn't mine: I keep missing
// alignment and layout faults that are obvious the moment someone looks at
// the whole page. Run it before saying a page is done.
//
//   node tools/review-pages.mjs <url|path> [more...] [--mobile] [--keep]
//
// Paths are resolved against a running dev server, so:
//   node tools/review-pages.mjs http://localhost:4322/news/some-slug/
//
// Needs OPENROUTER_API_KEY in ~/dst/.env (not in this repo — the file sits
// outside it on purpose).

import { chromium } from "playwright";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

const PROMPT =
  "Перечисли косяки и недоработки, если они присутствуют, которые не допустила бы IT компания при разработке многомиллионного сайта";

// stealth/ox-alpha first, then other free vision models. The free tier runs
// on a shared upstream pool that hands out 429s for minutes at a time, so a
// single model means the tool is unavailable exactly when you want it.
const MODELS = process.env.REVIEW_MODEL
  ? [process.env.REVIEW_MODEL]
  : [
      "stealth/ox-alpha",
      "google/gemma-4-31b-it:free",
      "minimax/minimax-m3:free",
      "thinkingmachines/inkling:free",
    ];
const OUT_DIR = "/tmp/dst-review";

function loadKey() {
  const envPath = path.join(homedir(), "dst", ".env");
  let raw;
  try {
    raw = readFileSync(envPath, "utf8");
  } catch {
    throw new Error(`no ${envPath} — OPENROUTER_API_KEY has to live there`);
  }
  // Tolerates `export KEY=…`, quotes, and trailing comments.
  const line = raw.split(/\r?\n/).find((l) => /^\s*(export\s+)?OPENROUTER_API_KEY\s*=/.test(l));
  if (!line) throw new Error(`OPENROUTER_API_KEY not found in ${envPath}`);
  return line
    .replace(/^\s*(export\s+)?OPENROUTER_API_KEY\s*=\s*/, "")
    .replace(/\s+#.*$/, "")
    .trim()
    .replace(/^['"]|['"]$/g, "");
}

async function shoot(browser, url, { mobile }) {
  const context = await browser.newContext(
    mobile
      ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
      : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  );
  const page = await context.newPage();
  // The dev toolbar floats over the page and the reviewer reports it as a
  // layout defect every time. It doesn't exist in production; hide it so
  // the answer is about the page.
  await page.addStyleTag({ content: "astro-dev-toolbar, #dev-overlay { display: none !important; }" }).catch(() => {});
  await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
  await page.addStyleTag({ content: "astro-dev-toolbar, #dev-overlay { display: none !important; }" }).catch(() => {});
  // Let webfonts settle so the model doesn't report a flash-of-fallback as a defect.
  await page.waitForTimeout(600);
  const buf = await page.screenshot({ fullPage: true });
  // Head data is invisible in a screenshot, so the reviewer used to report
  // canonical/OG/JSON-LD as missing on every run whether they were there or
  // not. Hand it the facts and it can spend its attention on the page.
  const facts = await page.evaluate(() => {
    const meta = (sel) => document.querySelector(sel)?.getAttribute("content") ?? null;
    const imgs = [...document.querySelectorAll("article img, main img")];
    return {
      lang: document.documentElement.lang || null,
      title: document.title || null,
      description: meta('meta[name="description"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
      og: {
        title: meta('meta[property="og:title"]'),
        description: meta('meta[property="og:description"]'),
        image: meta('meta[property="og:image"]'),
        url: meta('meta[property="og:url"]'),
      },
      twitterCard: meta('meta[name="twitter:card"]'),
      jsonLdTypes: [...document.querySelectorAll('script[type="application/ld+json"]')]
        .flatMap((s) => { try { return [JSON.parse(s.textContent)].flat().map((b) => b["@type"]); } catch { return ["unparseable"]; } }),
      headings: [...document.querySelectorAll("h1,h2,h3")].map((h) => `${h.tagName}: ${h.textContent.trim().slice(0, 60)}`),
      images: imgs.map((i) => ({ alt: i.alt || null, hasDimensions: Boolean(i.getAttribute("width") && i.getAttribute("height")), loading: i.getAttribute("loading") })),
      hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    };
  });
  await context.close();
  return { buf, facts };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// The free tier shares an upstream pool and hands out 429s regularly, so a
// single attempt says nothing about whether the page is fine.
async function reviewWithRetries(key, images, url, facts) {
  let last;
  for (const model of MODELS) {
    for (let i = 1; i <= 3; i++) {
      try {
        const answer = await review(key, images, url, model, facts);
        return { answer, model };
      } catch (err) {
        last = err;
        const retriable = /\b(429|502|503|504)\b|rate-limit|temporarily/i.test(err.message);
        if (!retriable) break; // a real error — trying it twice more won't help
        if (i < 3) {
          const wait = 4_000 * i;
          console.log(`  ${model}: занято, жду ${wait / 1000}s`);
          await sleep(wait);
        }
      }
    }
    console.log(`  ${model} недоступна — пробую следующую`);
  }
  throw last ?? new Error("no model produced an answer");
}

async function review(key, images, url, model, facts) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://dst.llc",
      "X-Title": "DST page review",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                `${PROMPT}\n\nСтраница: ${url}\n\n` +
                `Данные из HTML (их не видно на скриншоте — не сообщай как отсутствующее то, что здесь есть):\n` +
                "```json\n" + JSON.stringify(facts, null, 1) + "\n```",
            },
            ...images.map((b64) => ({
              type: "image_url",
              image_url: { url: `data:image/png;base64,${b64}` },
            })),
          ],
        },
      ],
    }),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${text.slice(0, 400)}`);
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`unparseable response: ${text.slice(0, 400)}`);
  }
  if (data.error) throw new Error(`OpenRouter: ${data.error.message || JSON.stringify(data.error)}`);
  return data.choices?.[0]?.message?.content ?? "(пустой ответ)";
}

const args = process.argv.slice(2);
const wantMobile = args.includes("--mobile");
const keep = args.includes("--keep");
const urls = args.filter((a) => !a.startsWith("--"));

if (urls.length === 0) {
  console.error("usage: node tools/review-pages.mjs <url> [more urls] [--mobile] [--keep]");
  process.exit(1);
}

const key = loadKey();
mkdirSync(OUT_DIR, { recursive: true });
const browser = await chromium.launch();
let failures = 0;

for (const url of urls) {
  console.log(`\n${"=".repeat(72)}\n${url}\n${"=".repeat(72)}`);
  try {
    const desktop = await shoot(browser, url, { mobile: false });
    const shots = [desktop.buf];
    const facts = desktop.facts;
    if (wantMobile) shots.push((await shoot(browser, url, { mobile: true })).buf);

    if (keep) {
      const stem = url.replace(/https?:\/\//, "").replace(/[^a-z0-9]+/gi, "-").replace(/-+$/, "");
      shots.forEach((buf, i) => {
        const f = path.join(OUT_DIR, `${stem}${i ? "-mobile" : ""}.png`);
        writeFileSync(f, buf);
        console.log(`  скриншот: ${f}`);
      });
    }

    const { answer, model } = await reviewWithRetries(key, shots.map((b) => b.toString("base64")), url, facts);
    console.log(`  модель: ${model}\n`);
    console.log(answer.trim());
  } catch (err) {
    failures++;
    console.error(`  ОШИБКА: ${err.message}`);
  }
}

await browser.close();
process.exit(failures ? 1 : 0);
