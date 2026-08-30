#!/usr/bin/env node
// Finds the visual faults a screenshot shows and a unit test doesn't.
//
//   node tools/visual-check.mjs <url|url...> [--widths 390,1280] [--shots <dir>]
//                                 [--scheme light|dark|both]
//
// Written after a round of "проработай, чтобы я не находил за тобой багов":
// every check here is a bug that was actually shipped, not a rule invented
// in the abstract.
//
//   1. white text over a photograph that the photograph is too bright for —
//      the hero eyebrow landed on a lit sign and the two sets of white
//      letters read as one word;
//   2. a key/value table that scrolls sideways on a phone, carrying its
//      label column out of view and orphaning every value;
//   3. a heading squeezed into a narrow column by whatever sits beside it,
//      breaking onto five lines;
//   4. text clipped by a box it doesn't fit (line-clamp excepted — that one
//      is deliberate);
//   5. tap targets under 44px;
//   6. the page itself scrolling sideways.
//
// Exit status 1 if anything is found, so it can gate a deploy.
import { chromium } from "playwright";
import sharp from "sharp";
import path from "node:path";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const urls = args.filter((a) => !a.startsWith("--") && !/^\d/.test(a) && a.includes("//"));
const widths = flag("widths", "390,1280").split(",").map(Number);
const shotDir = flag("shots", mkdtempSync(path.join(tmpdir(), "visual-")));
// The network renders in the reader's colour scheme, and since the theme
// toggle it renders in whichever one they picked. Contrast is the check most
// likely to pass in one and fail in the other, so dark is checkable here
// rather than only by eye. Default stays light so existing invocations mean
// what they meant before.
const schemes = flag("scheme", "light") === "both" ? ["light", "dark"] : [flag("scheme", "light")];
if (!urls.length) {
  console.error("usage: node tools/visual-check.mjs <url> [more urls] [--widths 390,1280] [--scheme light|dark|both]");
  process.exit(2);
}

const relLuminance = ([r, g, b]) => {
  const f = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (a, b) => {
  const [hi, lo] = [relLuminance(a), relLuminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const parseColor = (css) => (css.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);

/** What the DOM alone can answer. */
async function domFindings(page, width) {
  return page.evaluate((width) => {
    const found = [];
    const say = (kind, node, detail) =>
      found.push({ kind, where: `${node.tagName.toLowerCase()}${node.className && typeof node.className === "string" ? "." + node.className.trim().split(/\s+/)[0] : ""}`, text: (node.textContent ?? "").trim().slice(0, 60), detail });

    if (document.documentElement.scrollWidth > window.innerWidth + 1)
      found.push({ kind: "page scrolls sideways", where: "html", text: "", detail: `${document.documentElement.scrollWidth}px in a ${window.innerWidth}px viewport` });

    for (const el of document.querySelectorAll("*")) {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      const scrolls = el.scrollWidth > el.clientWidth + 2 && /auto|scroll/.test(cs.overflowX);

      // A label column scrolled out of view takes the meaning with it.
      if (scrolls && el.querySelector('th[scope="row"]'))
        say("key/value table scrolls sideways", el, `${el.scrollWidth}px of content in ${el.clientWidth}px — the label column scrolls away`);

      // Clipped text. A line clamp is a decision; this is an accident.
      const clipped = /hidden|clip/.test(cs.overflowX + cs.overflowY) && cs.webkitLineClamp === "none";
      if (clipped && el.children.length === 0 && (el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > el.clientHeight + 2))
        say("text clipped by its box", el, `${el.scrollWidth}×${el.scrollHeight} in ${el.clientWidth}×${el.clientHeight}`);
    }

    // A heading broken over many lines is usually a heading being squeezed
    // by something beside it, not a long heading.
    for (const h of document.querySelectorAll("h1, h2, h3")) {
      const range = document.createRange();
      range.selectNodeContents(h);
      const lines = range.getClientRects().length;
      const parent = h.parentElement;
      const parentWidth = parent?.getBoundingClientRect().width ?? 0;
      const share = parentWidth ? h.getBoundingClientRect().width / parentWidth : 1;
      // Only when something is actually beside it. A card title in a narrow
      // column wraps because the column is narrow, which is the design; a
      // heading sharing a flex row with a link is being squeezed by it.
      const hr = h.getBoundingClientRect();
      // …and only when that something is a small thing, a link or a badge.
      // A two-column hero puts a display heading beside a full lede column
      // on purpose; that is a layout, not a squeeze.
      const beside = [...(parent?.children ?? [])].some((sib) => {
        if (sib === h) return false;
        const sr = sib.getBoundingClientRect();
        const overlapsRow = sr.width > 0 && sr.top < hr.bottom && sr.bottom > hr.top;
        return overlapsRow && sr.width < parentWidth * 0.35;
      });
      // Three lines is already the fault: at 480px the heading beside the
      // link broke into three and the four-line threshold said nothing.
      if (lines >= 3 && share < 0.72 && beside)
        say("heading squeezed into a narrow column", h, `${lines} lines across ${Math.round(share * 100)}% of the row`);
    }

    // Text the page background swallows. The pixel check below catches
    // letters over a photograph; this catches the plainer version of the
    // same bug — a colour that was chosen for one background and rendered
    // on another. A venue hero with no picture printed its eyebrow in the
    // white meant for the photo, on a white page.
    {
      const rgba = (css) => {
        const n = (css.match(/[\d.]+/g) ?? []).map(Number);
        return n.length >= 4 ? n : [...n.slice(0, 3), 1];
      };
      // Is a picture painted behind this text? A photo hero puts an <img>
      // under the words rather than a background-image, and the flat check
      // would then measure the white letters against the card colour the
      // photo hides and call a legible hero unreadable. Only something that
      // covers the whole line counts — a thumbnail beside a caption is not
      // behind it.
      const pictureBehind = (node, rect, el) =>
        [...node.querySelectorAll("img, picture, video, canvas, svg")].some((media) => {
          if (media.contains(el)) return false;
          const m = media.getBoundingClientRect();
          return m.left <= rect.left && m.right >= rect.right && m.top <= rect.top && m.bottom >= rect.bottom;
        });
      // What is actually behind an element: the first ancestor that paints.
      const backdrop = (el) => {
        const rect = el.getBoundingClientRect();
        for (let node = el; node && node !== document.documentElement; node = node.parentElement) {
          const cs = getComputedStyle(node);
          if (cs.backgroundImage !== "none") return null; // a picture: the pixel check owns it
          if (getComputedStyle(node, "::before").backgroundImage !== "none") return null;
          if (getComputedStyle(node, "::after").backgroundImage !== "none") return null;
          if (pictureBehind(node, rect, el)) return null;
          const [r, g, b, a] = rgba(cs.backgroundColor);
          if (a >= 0.9) return [r, g, b];
        }
        const [r, g, b, a] = rgba(getComputedStyle(document.documentElement).backgroundColor);
        return a >= 0.9 ? [r, g, b] : [255, 255, 255];
      };
      const lum = ([r, g, b]) => {
        const f = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      const ratio = (a, b) => {
        const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
        return (hi + 0.05) / (lo + 0.05);
      };
      for (const el of document.querySelectorAll("h1, h2, h3, h4, p, li, a, span, dt, dd, td, th, figcaption, button")) {
        const text = (el.textContent ?? "").trim();
        if (!text || el.querySelector("h1,h2,h3,h4,p,li,dt,dd,td,th")) continue;
        // A separator dot the page hides from assistive tech is decoration,
        // not text; holding it to reading contrast only invites a fix that
        // makes the punctuation louder than the words around it.
        if (el.closest('[aria-hidden="true"]')) continue;
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden" || Number(cs.opacity) < 0.5) continue;
        const r = el.getBoundingClientRect();
        if (r.width < 2 || r.height < 2) continue;
        const behind = backdrop(el);
        if (!behind) continue;
        const [tr, tg, tb, ta] = rgba(cs.color);
        if (ta < 0.5) continue;
        const size = parseFloat(cs.fontSize);
        const large = size >= 24 || (size >= 18.66 && Number(cs.fontWeight) >= 700);
        const need = large ? 3 : 4.5;
        const got = ratio([tr, tg, tb], behind);
        if (got < need)
          say("text too faint for its background", el, `contrast ${got.toFixed(2)}:1, needs ${need}:1`);
      }
    }

    // A page of nothing but prose, laid out in a container built for cards.
    // The network container is wide because most pages fill it with a grid;
    // a paragraph stops at its reading measure. That is fine wherever
    // something else fills the width — a hero lede sitting short above a row
    // of cards is deliberate typography. It stops being fine when the whole
    // page is text: the headings run full-bleed, every line under them stops
    // halfway, and the right half of the screen is empty, which reads as a
    // broken alignment rather than a measure. So this is a page-level test,
    // not a section-level one. Caught by hand twice before it was taught:
    // on visas/golden and on the .lol about pages.
    if (width >= 900) {
      const main = document.querySelector("main");
      const wide = main && main.getBoundingClientRect().width >= 600;
      // Anything that legitimately earns a wide container.
      const fills = wide && [...main.querySelectorAll(
        "img, picture, table, iframe, canvas, video, .card, .grid, [class*=grid], [class*=cards], [class*=columns]"
      )].some((n) => n.getBoundingClientRect().width > main.getBoundingClientRect().width * 0.7);

      if (wide && !fills) {
        for (const sec of main.querySelectorAll("section, article, .container")) {
          const cs = getComputedStyle(sec);
          if (cs.display === "none" || cs.visibility === "hidden") continue;
          const box = sec.getBoundingClientRect();
          if (box.width < 600) continue;

          const heading = sec.querySelector(":scope > h1, :scope > h2, :scope > h3");
          if (!heading) continue;
          const hw = heading.getBoundingClientRect().width;
          if (hw < box.width * 0.8) continue;

          const paras = [...sec.querySelectorAll(":scope > p")]
            .filter((n) => (n.textContent ?? "").trim().length > 60);
          if (!paras.length) continue;
          const widest = Math.max(...paras.map((n) => n.getBoundingClientRect().width));
          if (hw - widest > 240)
            say("prose page in a card-width container", sec,
                `heading runs ${Math.round(hw)}px, text stops at ${Math.round(widest)}px — ${Math.round(hw - widest)}px of overhang`);
        }
      }
    }

    // Anything you tap needs somewhere to be tapped.
    if (width <= 640) {
      for (const el of document.querySelectorAll("a, button, [role=button]")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        // A drawer parked off-canvas is not a small tap target — it is a
        // closed menu. checkVisibility misses transforms, so test the box.
        if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
        if (r.right < 0 || r.left > window.innerWidth || r.bottom < 0) continue;
        const inFlow = getComputedStyle(el).display !== "inline";
        if (inFlow && r.height < 44) say("tap target under 44px", el, `${Math.round(r.width)}×${Math.round(r.height)}`);
      }
    }
    return found;
  }, width);
}

/** Text over a picture: what the picture actually puts behind the letters. */
async function contrastFindings(page, shot) {
  const candidates = await page.evaluate(() => {
    const over = [];
    for (const el of document.querySelectorAll("h1, h2, h3, p, span, a, li")) {
      if (!el.textContent?.trim() || el.querySelector("h1,h2,h3,p,li")) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 8 || r.height < 8) continue;
      // Is a picture *behind* it? A logo beside the text is not: the image
      // has to be taken out of flow and cover the letters. Walking up for
      // any ancestor containing an <img> reported every site wordmark.
      let n = el.parentElement, backed = false;
      while (n && n !== document.body && !backed) {
        for (const img of n.querySelectorAll(":scope > img, :scope > picture > img")) {
          const p = getComputedStyle(img).position;
          if (p !== "absolute" && p !== "fixed") continue;
          const ir = img.getBoundingClientRect();
          const covered = ir.left <= r.left && ir.right >= r.right && ir.top <= r.top && ir.bottom >= r.bottom;
          if (covered) { backed = true; break; }
        }
        n = n.parentElement;
      }
      if (!backed) continue;
      // ...but not if something opaque is painted between the letters and the
      // picture. A button over a hero photo is the case: it has a solid fill,
      // and the reader never sees the photo behind its label. The measurement
      // below hides the element to photograph what is under it, and hiding it
      // takes its own background with it — so the photo showed through and a
      // button running 11:1 against its own fill was reported at 1.06:1
      // against the picture. Every run of this tool raised it; it was never
      // real.
      let opaque = false;
      for (let n2 = el; n2 && n2 !== document.body; n2 = n2.parentElement) {
        const cs2 = getComputedStyle(n2);
        const m = cs2.backgroundColor.match(/[\d.]+/g);
        if (m && (m.length < 4 || Number(m[3]) >= 0.9)) {
          const r2 = n2.getBoundingClientRect();
          if (r2.left <= r.left && r2.right >= r.right && r2.top <= r.top && r2.bottom >= r.bottom) { opaque = true; break; }
        }
        if (cs2.backgroundImage !== "none") break; // the picture itself
      }
      if (opaque) continue;
      // Tag it, so the backdrop shot can hide exactly these. Measuring a
      // region with its own letters still in it measures the letters: the
      // darkest tenth of the pixels came out white and every label over a
      // picture was reported at ~2:1 whatever was behind it.
      el.setAttribute("data-visual-check-hide", "");
      over.push({
        color: getComputedStyle(el).color,
        text: el.textContent.trim().slice(0, 50),
        tag: el.tagName.toLowerCase(),
        rect: { x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height },
      });
    }
    return over;
  });
  if (!candidates.length) return [];

  // Hide the text and photograph what was under it — sampling the shot with
  // the letters still in it measures the letters, not their background.
  await page.evaluate(() => {
    document.querySelectorAll("[data-visual-check-hide]").forEach((e) => (e.style.visibility = "hidden"));
  });
  await page.screenshot({ path: shot, fullPage: true });
  await page.evaluate(() => {
    document.querySelectorAll("[data-visual-check-hide]").forEach((e) => {
      e.style.visibility = "";
      e.removeAttribute("data-visual-check-hide");
    });
  });

  const image = sharp(shot);
  const meta = await image.metadata();
  const findings = [];
  for (const c of candidates) {
    const left = Math.max(0, Math.round(c.rect.x));
    const top = Math.max(0, Math.round(c.rect.y));
    const width = Math.min(Math.round(c.rect.w), meta.width - left);
    const height = Math.min(Math.round(c.rect.h), meta.height - top);
    if (width < 4 || height < 4) continue;
    const { data, info } = await sharp(shot)
      .extract({ left, top, width, height })
      .raw()
      .toBuffer({ resolveWithObject: true });

    // The worst pixel that matters, not the average: a bright sign behind
    // two words is invisible in a mean over the whole line.
    const ink = parseColor(c.color);
    let worst = Infinity;
    const step = info.channels;
    const ratios = [];
    for (let i = 0; i < data.length; i += step) {
      ratios.push(contrast(ink, [data[i], data[i + 1], data[i + 2]]));
    }
    ratios.sort((a, b) => a - b);
    // 10th percentile: ignores a few stray pixels, catches a lit sign.
    worst = ratios[Math.floor(ratios.length * 0.1)];
    const floor = c.tag === "h1" || c.tag === "h2" ? 3 : 4.5;
    if (worst < floor)
      findings.push({
        kind: "text over a picture it can't be read on",
        where: c.tag,
        text: c.text,
        detail: `contrast ${worst.toFixed(2)}:1 against the picture behind it, needs ${floor}:1`,
      });
  }
  return findings;
}

const browser = await chromium.launch();
let problems = 0;
for (const url of urls) {
  for (const width of widths) {
   for (const colorScheme of schemes) {
    const ctx = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      isMobile: width <= 640,
      hasTouch: width <= 640,
      colorScheme,
    });
    const page = await ctx.newPage();
    // networkidle is the right wait for a static page, but a page that embeds
    // something external — a YouTube iframe, a /go/ redirect — never reaches
    // it, and the throw used to abort the whole run and truncate the results
    // silently. That is how a sweep once came back clean on a page that was
    // never actually visited. Fall back to `load`, and say so.
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 20_000 });
    } catch {
      await page.goto(url, { waitUntil: "load", timeout: 25_000 });
      console.log(`${url} @${width} — network never went idle, checked after load`);
    }
    await page.waitForTimeout(400);
    const suffix = schemes.length > 1 ? ` ${colorScheme}` : "";
    const label = `${url} @${width}${suffix}`;
    const name = `${url.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}${schemes.length > 1 ? `-${colorScheme}` : ""}`;
    const findings = [
      ...(await domFindings(page, width)),
      ...(await contrastFindings(page, path.join(shotDir, `${name}-${width}.png`))),
    ];
    if (findings.length) {
      problems += findings.length;
      console.log(`\n${label}`);
      for (const f of findings) console.log(`  ${f.kind}: ${f.where} "${f.text}" — ${f.detail}`);
    } else {
      console.log(`${label} — clean`);
    }
    await ctx.close();
   }
  }
}
await browser.close();
console.log(`\nshots in ${shotDir}`);
process.exit(problems ? 1 : 0);
