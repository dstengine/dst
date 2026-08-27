// The hub's front page, held to the standard the rest of the network is
// measured against. This is the one page every other site links back to, so a
// defect here is seen by everyone who follows a cross-link.
//
// These are deliberately harsh: each case is something a visitor or a crawler
// would actually hit, not a style preference.
//
//   npm run build && npx playwright test tests/dst-home.spec.js
import { test, expect } from "@playwright/test";
import { baseUrl } from "./servers.js";

const HOME = `${baseUrl("dst")}/`;

// 320 is the narrowest phone still in use; 1920 is the widest common desktop.
const WIDTHS = [320, 360, 390, 414, 768, 1024, 1280, 1920];

test.beforeEach(async ({ context }) => {
  await context.route("**://*.googletagmanager.com/**", (route) => route.abort());
});

/** sRGB relative luminance, per WCAG. */
function luminance([r, g, b]) {
  const f = (v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrast(fg, bg) {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

const parseRgb = (s) => (s.match(/\d+(\.\d+)?/g) ?? []).slice(0, 3).map(Number);

// Injected into the page. A closed <details> keeps its contents in the box
// tree — they report real coordinates — but the browser neither paints them
// nor exposes them to assistive tech. Measuring them reports the shut menu as
// a layout fault on every page in the network.
const VISIBLE = `(el) => el.checkVisibility({
  checkVisibilityCSS: true,
  contentVisibilityAuto: true,
  opacityProperty: true,
  visibilityProperty: true,
})`;

test.describe("dst home · layout", () => {
  for (const width of WIDTHS) {
    test(`nothing escapes the viewport @ ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(HOME);
      const result = await page.evaluate((visibleSrc) => {
        const visible = eval(visibleSrc);
        const vw = document.documentElement.clientWidth;
        const leaks = [];
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          if (r.right <= vw + 0.5 && r.left >= -0.5) continue;
          if (!visible(el)) continue;
          // An element may hang out of the viewport legitimately as long as a
          // scroll container between it and the document clips it.
          let e = el.parentElement;
          let clipped = false;
          while (e) {
            if (getComputedStyle(e).overflowX !== "visible") { clipped = true; break; }
            e = e.parentElement;
          }
          if (!clipped) {
            leaks.push(`<${el.tagName.toLowerCase()} class="${el.className}"> ${Math.round(r.left)}..${Math.round(r.right)}`);
          }
        }
        return { overflow: document.documentElement.scrollWidth - vw, leaks: leaks.slice(0, 5) };
      }, VISIBLE);
      expect(result.leaks, `elements hanging outside the page: ${result.leaks.join(" | ")}`).toEqual([]);
      expect(result.overflow, "the document scrolls sideways").toBe(0);
    });
  }

  test("reading a paragraph never needs a sideways glance", async ({ page }) => {
    // Lines much past ~90 characters cost the reader the start of the next one.
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(HOME);
    const worst = await page.evaluate(() => {
      let worst = { chars: 0, text: "" };
      for (const p of document.querySelectorAll("main p, main li")) {
        const text = p.textContent.trim();
        if (text.length < 80) continue;
        const style = getComputedStyle(p);
        const lines = Math.round(p.getBoundingClientRect().height / parseFloat(style.lineHeight));
        const chars = Math.round(text.length / Math.max(lines, 1));
        if (chars > worst.chars) worst = { chars, text: text.slice(0, 60) };
      }
      return worst;
    });
    expect(worst.chars, `a line runs to ~${worst.chars} characters: "${worst.text}…"`).toBeLessThanOrEqual(90);
  });
});

test.describe("dst home · images", () => {
  test("no text moves when the images arrive", async ({ page }) => {
    // Measured rather than inferred: an earlier version of this test looked for
    // width/height on the <img> and called the page broken, when the space is
    // actually reserved by an aspect-ratio on the wrapper. Load the page with
    // the images blocked, note where the headings sit, then load it for real.
    const positions = async (blockImages) => {
      if (blockImages) await page.route("**/*.{png,jpg,jpeg,webp,avif,gif,svg}", (r) => r.abort());
      else await page.unroute("**/*.{png,jpg,jpeg,webp,avif,gif,svg}");
      await page.goto(HOME, { waitUntil: "networkidle" });
      return page.evaluate(() =>
        Object.fromEntries(
          [...document.querySelectorAll("main h2, main h3")].map((h) => [
            h.textContent.trim(),
            Math.round(h.getBoundingClientRect().top + window.scrollY),
          ]),
        ),
      );
    };
    const without = await positions(true);
    const with_ = await positions(false);
    const moved = Object.entries(with_)
      .filter(([k, v]) => without[k] !== undefined && Math.abs(v - without[k]) > 1)
      .map(([k, v]) => `"${k}" ${without[k]} → ${v}`);
    expect(moved, `headings shift once images load: ${moved.join(", ")}`).toEqual([]);
  });

  test("alt text describes the picture instead of disclaiming it", async ({ page }) => {
    await page.goto(HOME);
    const bad = await page.evaluate(() =>
      [...document.querySelectorAll("main img")]
        .map((i) => ({ src: i.getAttribute("src"), alt: i.getAttribute("alt") ?? "" }))
        // "image of"/"photo of" is redundant to a screen reader, which already
        // announces the element as an image; "not a…" describes what isn't there.
        .filter((i) => !i.alt.trim() || /^(image|photo|picture) of\b/i.test(i.alt) || /\bnot a\b/i.test(i.alt)),
    );
    expect(bad, `alt text that doesn't describe: ${JSON.stringify(bad)}`).toEqual([]);
  });

  test("only the image above the fold loads eagerly", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(HOME);
    const eager = await page.evaluate(() =>
      [...document.querySelectorAll("main img")]
        .filter((i) => i.getAttribute("loading") !== "lazy")
        .map((i) => ({ src: i.getAttribute("src"), top: Math.round(i.getBoundingClientRect().top) }))
        .filter((i) => i.top > window.innerHeight),
    );
    expect(eager, `offscreen images loading eagerly: ${JSON.stringify(eager)}`).toEqual([]);
  });
});

test.describe("dst home · text", () => {
  test("no placeholder copy shipped", async ({ page }) => {
    await page.goto(HOME);
    const text = await page.locator("body").innerText();
    for (const marker of [/lorem ipsum/i, /\bTODO\b/, /\bTBD\b/, /\bXXX\b/, /coming soon/i, /placeholder/i]) {
      expect(text, `page contains ${marker}`).not.toMatch(marker);
    }
  });

  test("nothing is written in the wrong alphabet", async ({ page }) => {
    // A stray CJK or Cyrillic character in English copy is invisible when you
    // wrote it and unmissable to a reader. One has slipped in before.
    await page.goto(HOME);
    const text = await page.locator("main").innerText();
    const strays = [...text].filter((c) => /[Ѐ-ӿ一-鿿぀-ヿ]/.test(c));
    expect(strays, `characters outside the Latin script: ${strays.join(" ")}`).toEqual([]);
  });

  test("every heading says something", async ({ page }) => {
    await page.goto(HOME);
    const headings = await page.evaluate(() =>
      [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((h) => ({
        level: Number(h.tagName[1]),
        text: h.textContent.trim(),
      })),
    );
    expect(headings.filter((h) => h.level === 1).length, "there must be exactly one h1").toBe(1);
    expect(headings.filter((h) => !h.text), "an empty heading").toEqual([]);
    let previous = headings[0].level;
    for (const h of headings) {
      expect(h.level - previous, `heading jumps from h${previous} to h${h.level} at "${h.text}"`).toBeLessThanOrEqual(1);
      previous = h.level;
    }
  });
});

test.describe("dst home · links", () => {
  test("no link is a dead end", async ({ page }) => {
    await page.goto(HOME);
    const bad = await page.evaluate(() =>
      [...document.querySelectorAll("a")]
        .map((a) => ({ href: a.getAttribute("href"), text: a.textContent.trim().slice(0, 40) }))
        .filter((a) => !a.href || a.href === "#" || a.href.startsWith("javascript:")),
    );
    expect(bad, `links going nowhere: ${JSON.stringify(bad)}`).toEqual([]);
  });

  test("every link has an accessible name", async ({ page }) => {
    await page.goto(HOME);
    const nameless = await page.evaluate(() =>
      [...document.querySelectorAll("a")]
        .filter((a) => {
          const name = (a.getAttribute("aria-label") || a.textContent || "").trim()
            || [...a.querySelectorAll("img")].map((i) => i.alt).join("").trim();
          return !name;
        })
        .map((a) => a.getAttribute("href")),
    );
    expect(nameless, `links a screen reader can only read as a URL: ${nameless.join(", ")}`).toEqual([]);
  });

  test("links that leave the tab can't reach back into it", async ({ page }) => {
    await page.goto(HOME);
    const unsafe = await page.evaluate(() =>
      [...document.querySelectorAll('a[target="_blank"]')]
        .filter((a) => !(a.getAttribute("rel") ?? "").includes("noopener"))
        .map((a) => a.getAttribute("href")),
    );
    expect(unsafe, `target=_blank without rel=noopener: ${unsafe.join(", ")}`).toEqual([]);
  });

  test("internal links resolve", async ({ page, request }) => {
    await page.goto(HOME);
    const hrefs = await page.evaluate(() =>
      [...new Set([...document.querySelectorAll("a")].map((a) => a.href))].filter((h) => h.startsWith(location.origin)),
    );
    const broken = [];
    for (const href of hrefs) {
      const res = await request.get(href, { maxRedirects: 5 });
      if (!res.ok()) broken.push(`${href} → ${res.status()}`);
    }
    expect(broken, `internal links that don't resolve: ${broken.join(", ")}`).toEqual([]);
  });
});

test.describe("dst home · touch and keyboard", () => {
  test("every control is big enough to hit with a thumb", async ({ page }) => {
    // 44px is the size below which taps start landing on the neighbour.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(HOME);
    const small = await page.evaluate((visibleSrc) => {
      const visible = eval(visibleSrc);
      const out = [];
      for (const el of document.querySelectorAll("a, button, summary, [role='button']")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0 || !visible(el)) continue;
        // Links inside a paragraph are part of the text and are exempt: the
        // rule is about standalone controls.
        const inProse = el.closest("p, li") && getComputedStyle(el).display === "inline";
        if (inProse) continue;
        const style = getComputedStyle(el, "::before");
        const overlay = style.content !== "none" && style.position === "absolute";
        const grow = overlay ? -2 * parseFloat(style.inset || "0") : 0;
        if (r.height + grow < 44 - 0.5) {
          out.push(`${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 30)}" ${Math.round(r.width)}×${Math.round(r.height + grow)}`);
        }
      }
      return out;
    }, VISIBLE);
    expect(small, `controls under 44px tall: ${small.join(" | ")}`).toEqual([]);
  });

  test("keyboard focus is visible on every control", async ({ page }) => {
    await page.goto(HOME);
    const invisible = [];
    // Tabbed, not focused programmatically: :focus-visible — which is what
    // draws the ring — does not apply to a scripted focus() call, so calling it
    // would report every control on the page as having no ring.
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press("Tab");
      const seen = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const s = getComputedStyle(el);
        const ring =
          (s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0) ||
          s.boxShadow !== "none" ||
          s.textDecorationLine.includes("underline") ||
          s.backgroundColor !== getComputedStyle(el.parentElement).backgroundColor;
        return { ring, what: el.textContent.trim().slice(0, 30) || el.tagName };
      });
      if (seen && !seen.ring) invisible.push(seen.what);
    }
    expect([...new Set(invisible)], `no visible focus ring on: ${invisible.join(", ")}`).toEqual([]);
  });

  test("tab order follows the page, top to bottom", async ({ page }) => {
    await page.goto(HOME);
    const tops = [];
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const top = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        // Absolute document position: focusing a control scrolls it into view,
        // so a viewport-relative top says where the page scrolled to, not where
        // the control sits on the page.
        return Math.round(el.getBoundingClientRect().top + window.scrollY);
      });
      if (top !== null) tops.push(top);
    }
    const backwards = tops.filter((t, i) => i > 0 && t < tops[i - 1] - 5);
    expect(backwards, `focus jumps back up the page: ${tops.join(", ")}`).toEqual([]);
  });
});

test.describe("dst home · colour", () => {
  for (const scheme of ["light", "dark"]) {
    test(`body text meets WCAG AA in ${scheme} mode`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto(HOME);
      const samples = await page.evaluate(() => {
        const opaque = (el) => {
          let e = el;
          while (e) {
            const bg = getComputedStyle(e).backgroundColor;
            if (bg && !/rgba\(0, 0, 0, 0\)|transparent/.test(bg)) return bg;
            e = e.parentElement;
          }
          return "rgb(255, 255, 255)";
        };
        const out = [];
        for (const el of document.querySelectorAll("main p, main li, main a, main h1, main h2, main h3, footer p, footer a, .site-nav a")) {
          if (!el.textContent.trim()) continue;
          const s = getComputedStyle(el);
          out.push({
            text: el.textContent.trim().slice(0, 30),
            color: s.color,
            bg: opaque(el),
            size: parseFloat(s.fontSize),
            weight: Number(s.fontWeight),
          });
        }
        return out;
      });
      const failures = [];
      for (const s of samples) {
        // WCAG's large-text allowance: 24px, or 18.66px when bold.
        const large = s.size >= 24 || (s.size >= 18.66 && s.weight >= 700);
        const need = large ? 3 : 4.5;
        const ratio = contrast(parseRgb(s.color), parseRgb(s.bg));
        if (ratio < need) failures.push(`"${s.text}" ${ratio.toFixed(2)}:1 (needs ${need}) ${s.color} on ${s.bg}`);
      }
      expect([...new Set(failures)], `low-contrast text in ${scheme} mode`).toEqual([]);
    });
  }
});

test.describe("dst home · the mobile menu", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(HOME);
  });

  test("is shut on arrival and takes no space", async ({ page }) => {
    const state = await page.evaluate(() => {
      const details = document.querySelector("details.nav-toggle");
      const ul = details.querySelector("ul");
      return { open: details.open, ulRight: Math.round(ul.getBoundingClientRect().right), vw: window.innerWidth };
    });
    expect(state.open, "the menu starts open").toBe(false);
    expect(state.ulRight, "the shut menu still occupies layout past the viewport").toBeLessThanOrEqual(state.vw);
  });

  test("opens, covers the page, and every item is reachable", async ({ page }) => {
    await page.locator("details.nav-toggle > summary").click();
    const items = page.locator("details.nav-toggle a");
    const n = await items.count();
    expect(n, "the menu is empty").toBeGreaterThan(0);
    for (let i = 0; i < n; i++) {
      await expect(items.nth(i)).toBeVisible();
      const box = await items.nth(i).boundingBox();
      expect(box.height, `menu item ${i} is only ${Math.round(box.height)}px tall`).toBeGreaterThanOrEqual(40);
    }
  });

  test("closes again", async ({ page }) => {
    await page.locator("details.nav-toggle > summary").click();
    await page.locator("details.nav-toggle > summary").click();
    expect(await page.locator("details.nav-toggle").evaluate((d) => d.open)).toBe(false);
  });
});

test.describe("dst home · what the page promises", () => {
  test("the first screen offers somewhere to go", async ({ page }) => {
    // A hub whose first screen is only prose leaves the visitor to scroll and
    // guess. There has to be at least one call to action in view.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(HOME);
    const inView = await page.evaluate(() =>
      [...document.querySelectorAll("a")]
        .filter((a) => {
          const r = a.getBoundingClientRect();
          return r.top >= 0 && r.top < window.innerHeight && r.height >= 36 && !a.closest("header");
        })
        .map((a) => a.textContent.trim()),
    );
    expect(inView.length, "no call to action on the first screen").toBeGreaterThan(0);
  });

  test("the news and events blocks each lead somewhere", async ({ page }) => {
    await page.goto(HOME);
    for (const block of [".news-block", ".events-block"]) {
      const el = page.locator(block);
      if (!(await el.count())) continue;
      const links = await el.locator("a").count();
      expect(links, `${block} renders with nothing to click`).toBeGreaterThan(0);
    }
  });
});
