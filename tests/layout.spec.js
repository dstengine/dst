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
  { site: "palmcentral", path: "/" },
  { site: "palmcentral", path: "/prices/" },
  // fwf runs the same BaseLayout on its own domain, with the longest site
  // name in the network beside an eight-item nav.
  { site: "fwf", path: "/" },
  { site: "fwf", path: "/events/" },
  { site: "fwf", path: "/tickets/" },
  { site: "fwf", path: "/news/" },
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

  // llc has the longest nav in the network — ten items beside a site name
  // 335px wide — and in production it broke onto a second line at every
  // desktop width. Whichever nav is on screen, the header stays one row.
  test("a long nav never wraps, at any desktop width", async ({ page }) => {
    for (const width of [1100, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(url("llc", "/"));

      const shown = page.locator(".nav-desktop:visible, .nav-toggle:visible");
      await expect(shown, `no nav shown @ ${width}`).toHaveCount(1);

      const header = page.locator(".site-header");
      const height = await header.evaluate((el) => el.getBoundingClientRect().height);
      expect(height, `header grew to ${height}px @ ${width}, so something wrapped`).toBeLessThan(90);

      if (await page.locator(".nav-desktop").isVisible()) {
        const tops = await page.locator(".nav-desktop li").evaluateAll((els) =>
          els.map((el) => Math.round(el.getBoundingClientRect().top)),
        );
        expect(new Set(tops).size, `nav wrapped onto ${new Set(tops).size} rows @ ${width}`).toBe(1);
      }
    }
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

  // Page views alone can't tell a visit that produced a lead from one that
  // bounced, which is the only number this network exists to move. These
  // stub gtag rather than reach Google, and stub fetch rather than create a
  // real lead.
  const captureEvents = async (page) => {
    await page.evaluate(() => {
      window.__events = [];
      window.gtag = (...args) => window.__events.push(args);
    });
  };

  test("a lead form reports starting and completing", async ({ page }) => {
    await page.goto(url("dst", "/contact/"));
    await captureEvents(page);

    await page.locator('form[data-lead-form] input[name="contacts.email"]').focus();
    await expect
      .poll(() => page.evaluate(() => window.__events.map((e) => e[1])))
      .toContain("form_start");

    const events = await page.evaluate(async () => {
      window.fetch = async () => ({ ok: true, status: 200 });
      const form = document.querySelector("form[data-lead-form]");
      form.querySelector('input[name="contacts.email"]').value = "probe@example.com";
      form.requestSubmit();
      await new Promise((r) => setTimeout(r, 300));
      return window.__events;
    });

    const lead = events.find((e) => e[1] === "generate_lead");
    expect(lead, `no generate_lead among ${JSON.stringify(events)}`).toBeTruthy();
    // The form has to be identifiable, or the event says a lead happened
    // somewhere in the network and nothing more.
    expect(lead[2].form_name, "generate_lead carries no form name").toBeTruthy();
    expect(lead[2].site, "generate_lead carries no site").toBeTruthy();
  });

  test("a ticket link and a calendar file are both counted", async ({ page }) => {
    await page.goto(url("dst", "/events/future-world-forum-dubai-2026/"));
    await captureEvents(page);

    const events = await page.evaluate(() => {
      document.addEventListener("click", (e) => e.preventDefault(), true);
      document.querySelector('a[href^="/go/"]').click();
      document.querySelector('a[href$=".ics"]').click();
      return window.__events;
    });

    const names = events.map((e) => e[1]);
    expect(names).toContain("outbound_click");
    expect(names).toContain("add_to_calendar");
    // The hop's slug, not the third party's URL — the destination stays out
    // of the reports the same way it stays out of the markup.
    const hop = events.find((e) => e[1] === "outbound_click")[2].hop;
    expect(hop).toBe("future-world-forum-dubai-2026-ticket");
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

test.describe("skip link", () => {
  // The header carries a nav of eight or more links plus the network menu.
  // Without a skip link a keyboard user tabs through all of it on every
  // page before reaching the content — and a skip link that stays hidden
  // when focused, or that only scrolls without moving focus, is no better
  // than none. Both halves are checked here because both have to hold.
  for (const site of ["dst", "riviera", "fwf"]) {
    test(`${site}: the first tab stop jumps to the content`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(url(site, "/"));

      const link = page.locator(".skip-link");
      await page.keyboard.press("Tab");
      await expect(link).toBeFocused();

      // Visible once focused: off-screen until then, on-screen after.
      const box = await link.boundingBox();
      expect(box.y, "the focused skip link is still off the top of the page").toBeGreaterThanOrEqual(0);

      await page.keyboard.press("Enter");
      // Focus, not just the scroll position: the next Tab has to continue
      // from the content rather than from the second link in the header.
      const focused = await page.evaluate(() => document.activeElement?.id);
      expect(focused, "activating the skip link did not move focus to <main>").toBe("content");
    });
  }
});

test.describe("reduced motion", () => {
  test("a reader who asks for less motion gets none", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(url("dst", "/"));

    // The feed card is the liveliest thing on the page: it lifts on hover
    // and eases its cover. Both come from transitions, which the global
    // rule collapses to a tick.
    const durations = await page.evaluate(() =>
      [...document.querySelectorAll(".feed-card, .venture-card, .cta-banner-arrow")].map(
        (el) => getComputedStyle(el).transitionDuration,
      ),
    );
    expect(durations.length, "no animated element on the page to check").toBeGreaterThan(0);
    for (const duration of durations) {
      for (const part of duration.split(",")) {
        expect(Number.parseFloat(part), `transition still runs for ${duration}`).toBeLessThan(0.002);
      }
    }
  });
});
