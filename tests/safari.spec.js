// The one suite that runs in WebKit rather than Chromium.
//
// It exists because of a bug nothing else could have caught: a feed cover with
// both an aspect-ratio and a max-height had two ways to size its cross axis,
// and the two engines chose differently. Safari sized the box from the ratio —
// 220px tall became 391px wide inside a 552px card — so every event card on
// every site carried a third of a card of empty background beside its picture.
// Chromium stretched the box and showed nothing wrong. Every check in this
// repo ran in Chromium, so it shipped and stayed shipped until it was seen.
//
// Keep this file small and geometric. It is not a second copy of the suite —
// it is the handful of places where the two engines can legitimately disagree.
//
//   npx playwright test tests/safari.spec.js
import { test, expect } from "@playwright/test";
import { PORTS, baseUrl } from "./servers.js";

const WIDTHS = [390, 768, 1024, 1280, 1920];

test.beforeEach(async ({ context }) => {
  await context.route("**://*.googletagmanager.com/**", (route) => route.abort());
});

/* A cover fills the column it was given, whatever layout the card is in.
   In the ordinary card the column is the card; in the side-by-side card it
   is the card minus the body beside it. Anything narrower is the box sizing
   itself from its own ratio instead of from the space it was handed. */
for (const app of Object.keys(PORTS)) {
  test(`${app}: feed covers fill their column in WebKit`, async ({ page }) => {
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${baseUrl(app)}/`, { waitUntil: "domcontentloaded" });

      const narrow = await page.evaluate(() =>
        [...document.querySelectorAll(".feed-card")].flatMap((card) => {
          const cover = card.querySelector(":scope > .feed-cover");
          if (!cover) return [];
          const body = card.querySelector(":scope > .feed-body");
          const c = cover.getBoundingClientRect();
          const b = body?.getBoundingClientRect();
          const stacked = !b || Math.abs(b.left - c.left) < 1;
          const allotted = stacked
            ? card.getBoundingClientRect().width
            : b.left - c.left;
          return c.width < allotted - 2
            ? [{ got: Math.round(c.width), allotted: Math.round(allotted) }]
            : [];
        }),
      );

      expect(narrow, `${app} at ${width}px`).toEqual([]);
    }
  });
}

/* The phone wordmark gives way in WebKit too. A shrinkable flex item and
   `text-wrap: balance` are places where the two engines can part, and mxo's
   is the longest name in the network: at 320 it once made the page 356px
   wide and put the menu button off the screen. */
test("mxo: the wordmark wraps and the menu stays on screen in WebKit @ 320", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto(`${baseUrl("mxo")}/`, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => document.fonts.ready);
  const now = await page.evaluate(() => {
    const name = document.querySelector(".site-header .site-name");
    const text = [...name.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()).pop();
    const range = document.createRange();
    range.selectNodeContents(text);
    return {
      scrollWidth: document.documentElement.scrollWidth,
      burgerRight: document.querySelector(".nav-toggle summary").getBoundingClientRect().right,
      lines: new Set([...range.getClientRects()].filter((r) => r.width > 1).map((r) => Math.round(r.top))).size,
    };
  });
  expect(now.scrollWidth, "the page scrolls sideways").toBe(320);
  expect(now.burgerRight, "the menu button is not 14px inside the edge").toBeLessThanOrEqual(306);
  expect(now.lines, "the wordmark took more than two lines").toBeLessThanOrEqual(2);
});
