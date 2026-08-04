// Layout and interaction assertions against a real browser. Each case is a
// bug that shipped — these are the ones static HTML checks can't see,
// because they only show up once CSS has been applied and boxes measured.
//
//   npm run build && npx playwright test
import { test, expect } from "@playwright/test";
import { baseUrl } from "./servers.js";

const NAV_BREAKPOINT = 1024;
const WIDTHS = [390, 768, 900, 1280, 1920];

/** Pages worth measuring on every width: one of each template. */
const PAGES = [
  { site: "riviera", path: "/" },
  { site: "riviera", path: "/coffee/" },
  { site: "riviera", path: "/coffee/homebrew/" },
  { site: "riviera", path: "/rent/" },
  { site: "mbr", path: "/" },
  { site: "llc", path: "/" },
  { site: "dst", path: "/" },
];

const url = (site, path) => `${baseUrl(site)}${path}`;

// Analytics is inert until a measurement ID is configured, but once one is
// these tests would reach for Google on every navigation. Keep the suite off
// the network and independent of it being up.
test.beforeEach(async ({ context }) => {
  await context.route("**://*.googletagmanager.com/**", (route) => route.abort());
});

test.describe("no horizontal overflow", () => {
  // A wide element pushing the document sideways is the failure mode behind
  // every "the padding is broken" report.
  for (const { site, path } of PAGES) {
    for (const width of WIDTHS) {
      test(`${site}${path} @ ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(url(site, path));
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, "document scrolls sideways").toBe(0);
      });
    }
  }
});

test.describe("header", () => {
  // The site name wrapped onto a second line as the viewport narrowed,
  // because it was a shrinkable flex item with no wrap rule.
  for (const width of [700, 820, 1024, 1100, 1280]) {
    test(`site name stays on one line @ ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(url("riviera", "/"));
      const name = page.locator(".site-name");
      const box = await name.boundingBox();
      const lineHeight = await name.evaluate((el) => parseFloat(getComputedStyle(el).fontSize) * 1.6);
      expect(box.height, "site name wrapped to a second line").toBeLessThan(lineHeight * 1.6);
    });
  }

  // The inline nav wrapped to a second row through the whole tablet range
  // before the breakpoint was raised from 640px to 1024px.
  test(`nav collapses to the toggle at ${NAV_BREAKPOINT}px and below`, async ({ page }) => {
    for (const width of [390, 700, 820, NAV_BREAKPOINT]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(url("riviera", "/"));
      await expect(page.locator(".nav-toggle"), `toggle hidden @ ${width}`).toBeVisible();
      await expect(page.locator(".nav-desktop"), `desktop nav shown @ ${width}`).toBeHidden();
    }
  });

  test(`nav is a single inline row above ${NAV_BREAKPOINT}px`, async ({ page }) => {
    await page.setViewportSize({ width: NAV_BREAKPOINT + 56, height: 800 });
    await page.goto(url("riviera", "/"));
    await expect(page.locator(".nav-desktop")).toBeVisible();
    await expect(page.locator(".nav-toggle")).toBeHidden();

    // One row: every item shares a top edge.
    const tops = await page.locator(".nav-desktop li").evaluateAll((els) =>
      els.map((el) => Math.round(el.getBoundingClientRect().top)),
    );
    expect(new Set(tops).size, `nav wrapped onto ${new Set(tops).size} rows`).toBe(1);
  });
});

test.describe("mobile menu", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 820, height: 800 });
    await page.goto(url("riviera", "/"));
  });

  test("opens, and every item is actually laid out", async ({ page }) => {
    const toggle = page.locator(".nav-toggle");
    await toggle.locator("summary").click();
    await expect(toggle).toHaveJSProperty("open", true);

    const items = toggle.locator("ul a");
    await expect(items).toHaveCount(9);

    // <li> defaults to display:list-item, which collapsed to zero size as a
    // flex item and left the menu present in the DOM but invisible.
    const widths = await items.evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width));
    expect(Math.min(...widths), "a menu item has zero width").toBeGreaterThan(0);
  });

  test("closes on an outside click", async ({ page }) => {
    const toggle = page.locator(".nav-toggle");
    await toggle.locator("summary").click();
    await expect(toggle).toHaveJSProperty("open", true);

    // Click below the open dropdown. A locator click would be intercepted by
    // the dropdown itself, which covers the top of the page while open.
    const bottom = await toggle.locator("ul").evaluate((el) => el.getBoundingClientRect().bottom);
    await page.mouse.click(400, bottom + 80);

    await expect(toggle).toHaveJSProperty("open", false);
  });

  // The header was position:relative with z-index:auto, so it created no
  // stacking context and page content positioned later in the document — the
  // photo hero's caption, the sticky venue panel — painted straight through
  // the open dropdown. Five of nine items were unclickable on the home page.
  for (const path of ["/", "/coffee/", "/coffee/homebrew/"]) {
    test(`every item is on top of the page content on ${path}`, async ({ page }) => {
      await page.setViewportSize({ width: 820, height: 800 });
      await page.goto(url("riviera", path));
      await page.locator(".nav-toggle summary").click();

      const covered = await page.locator(".nav-toggle ul a").evaluateAll((links) =>
        links
          .filter((a) => {
            const r = a.getBoundingClientRect();
            const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
            return !(top && (top === a || a.contains(top)));
          })
          .map((a) => a.textContent.trim()),
      );

      expect(covered, "menu items painted over by page content").toEqual([]);
    });
  }

  test("closes on Escape", async ({ page }) => {
    const toggle = page.locator(".nav-toggle");
    await toggle.locator("summary").click();
    await expect(toggle).toHaveJSProperty("open", true);
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveJSProperty("open", false);
  });
});

test.describe("content blocks stay inside the page grid", () => {
  // Callout had no max-width and was used straight in <main>, so it rendered
  // edge to edge while everything around it respected the container.
  test("a callout lines up with the container", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(url("riviera", "/coffee/"));
    const callout = page.locator(".callout").first();
    await expect(callout).toBeVisible();
    const [calloutBox, containerBox] = await Promise.all([
      callout.boundingBox(),
      page.locator("main .container").first().boundingBox(),
    ]);
    expect(calloutBox.width, "callout is wider than the page container").toBeLessThanOrEqual(containerBox.width + 1);
  });

  // The CTA banner had no heading to carry h2's margin, so it sat flush
  // against the card grid above it.
  test("the CTA banner is not flush against the grid above it", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(url("riviera", "/"));
    const gridBottom = await page.locator(".link-grid").evaluate((el) => el.getBoundingClientRect().bottom);
    const bannerTop = await page.locator(".cta-banner").evaluate((el) => el.getBoundingClientRect().top);
    expect(bannerTop - gridBottom, "no gap between the grid and the CTA banner").toBeGreaterThan(8);
  });
});

test.describe("analytics", () => {
  // Astro's define:vars wraps an inline script in an IIFE, so declaring
  // `function gtag()` left it trapped in that closure: the initial config
  // fired, but nothing on the page could call gtag("event", …) afterwards —
  // which is how a lead-gen network records its conversions.
  test("gtag is callable from the page", async ({ page }) => {
    await page.goto(url("riviera", "/"));
    const tagged = await page.locator('script[src*="googletagmanager.com/gtag/js"]').count();
    test.skip(tagged === 0, "no measurement ID configured in this build");

    const state = await page.evaluate(() => ({
      gtag: typeof window.gtag,
      dataLayer: Array.isArray(window.dataLayer),
    }));
    expect(state.gtag, "gtag is not reachable from page scope").toBe("function");
    expect(state.dataLayer, "dataLayer missing").toBe(true);
  });
});

test.describe("reading measure", () => {
  // `--content-width: 72ch` measured out at ~115 characters per line, and
  // because ch scales with font-size the lede — set larger — ended up on a
  // longer line than the body text under it. Larger type wants a shorter
  // measure, not a longer one.
  const CHARS_PER_LINE_LIMIT = 100;

  // Average advance over the element's own text, which overestimates a
  // little against a rendered line; the limit is set with that in mind.
  const measure = (el) => {
    const style = getComputedStyle(el);
    const text = el.textContent.trim();
    const probe = document.createElement("span");
    probe.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font:${style.font}`;
    probe.textContent = text;
    document.body.appendChild(probe);
    const advance = probe.getBoundingClientRect().width / text.length;
    probe.remove();
    const width = el.getBoundingClientRect().width;
    return { width, chars: Math.round(width / advance) };
  };

  test("the lede is never on a longer line than the body text", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    for (const path of ["/", "/coffee/", "/rent/"]) {
      await page.goto(url("riviera", path));
      const { lede, body } = await page.evaluate((fn) => {
        const measure = eval(`(${fn})`);
        // A direct child of a page section: prose set on the page's own
        // measure, not a paragraph nested inside a form or a card.
        const prose = document.querySelector("main > section.container > p:not(.lede)");
        return {
          lede: measure(document.querySelector(".lede")),
          body: prose ? measure(prose) : null,
        };
      }, measure.toString());

      expect(lede.chars, `${path}: lede line too long`).toBeLessThanOrEqual(CHARS_PER_LINE_LIMIT);
      if (!body) continue; // page has no body prose to compare against
      expect(lede.width, `${path}: the lede is wider than the body text`).toBeLessThanOrEqual(body.width);
      expect(body.chars, `${path}: body line too long`).toBeLessThanOrEqual(CHARS_PER_LINE_LIMIT);
    }
  });
});

test.describe("wide tables", () => {
  // The three-column table crushed itself into one-word-per-line columns
  // inside the scroll box, with nothing signalling a third column existed.
  test("scroll inside their own box, never the page", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(url("llc", "/"));
    const wrap = page.locator(".table-wrap").first();
    await expect(wrap).toBeVisible();

    const { scrollable, tableWidth, pageOverflow } = await page.evaluate(() => {
      const el = document.querySelector(".table-wrap");
      return {
        scrollable: el.scrollWidth > el.clientWidth,
        tableWidth: el.querySelector("table").getBoundingClientRect().width,
        pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });

    expect(pageOverflow, "the table pushed the page sideways").toBe(0);
    expect(scrollable, "the table box does not scroll").toBe(true);
    expect(tableWidth, "columns are being crushed instead of scrolling").toBeGreaterThan(500);
  });
});

test.describe("venue page", () => {
  test("hero, info panel and CTA all render", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(url("riviera", "/coffee/homebrew/"));
    await expect(page.locator(".photo-hero img")).toBeVisible();
    await expect(page.locator(".venue-panel-inner")).toBeVisible();
    await expect(page.locator(".venue-panel-actions .button").first()).toBeVisible();
  });

  test("the whole card is one link, with no URL shown as text", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(url("riviera", "/coffee/"));
    const card = page.locator(".venue-card").first();
    await expect(card).toHaveJSProperty("tagName", "A");
    await expect(card).not.toContainText("http");
    await expect(card).not.toContainText(/visit/i);
  });
});
