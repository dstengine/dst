// Layout and interaction assertions against a real browser. Each case is a
// bug that shipped — these are the ones static HTML checks can't see,
// because they only show up once CSS has been applied and boxes measured.
//
//   npm run build && npx playwright test
import { test, expect } from "@playwright/test";
import { baseUrl } from "./servers.js";

const NAV_BREAKPOINT = 1024;
// Above this, a dense nav — one whose own labels want more than the row has —
// finally shows its inline row. See `site-nav-dense` in BaseLayout.astro.
const DENSE_NAV_BREAKPOINT = 1200;
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
  // musical carries two dynamic routes at the root — a city and a show —
  // and a promoted block that repeats across all three templates.
  { site: "musical", path: "/" },
  { site: "musical", path: "/dubai/" },
  { site: "musical", path: "/chicago/" },
  { site: "musical", path: "/chicago/history/" },
  { site: "musical", path: "/chicago/manchester/" },
  { site: "musical", path: "/chicago/uk/" },
  { site: "musical", path: "/chicago/online/all-that-jazz/" },
  { site: "musical", path: "/broadway/" },
  { site: "musical", path: "/venue/opera-house-manchester/" },
  { site: "musical", path: "/venues/" },
  // tick is in two languages, and Armenian runs longer than English in
  // every label: both halves of the same templates are measured.
  { site: "tick", path: "/" },
  { site: "tick", path: "/am/" },
  { site: "tick", path: "/events/equinox-fest-autumn-chapter-2026/" },
  { site: "tick", path: "/am/events/equinox-fest-autumn-chapter-2026/" },
  { site: "tick", path: "/am/about/" },
  // The portal pages: a venue's facts panel beside its map, a month's chip
  // row, the venue grid — each in the longer language where it has one.
  { site: "tick", path: "/venues/" },
  { site: "tick", path: "/am/venues/aram-khachaturian-concert-hall/" },
  { site: "tick", path: "/am/calendar/" },
  // aivideo prints model prompts in <code> inside running text — long
  // unbroken strings, the classic way to push a phone page sideways.
  { site: "aivideo", path: "/" },
  { site: "aivideo", path: "/news/ai-video-prompt-formats-ltx-minimax-h3-kling/" },
  { site: "aivideo", path: "/comfyui/" },
  { site: "aivideo", path: "/screenwriters/" },
  { site: "aivideo", path: "/guides/" },
  // tea fills its countdowns from the reader's clock after load: the cards
  // must hold their size while the text arrives, at every width.
  { site: "tea", path: "/" },
  { site: "tea", path: "/schedule/" },
  { site: "tea", path: "/guides/how-to-make-a-proper-cup-of-tea/" },
  { site: "tea", path: "/green-tea/" },
  // random.directory sets algorithm names and command lines in <code>
  // inside running text, the same risk as aivideo's prompts.
  { site: "random", path: "/" },
  { site: "random", path: "/guides/randomx-variants/" },
  { site: "random", path: "/guides/p2pool/" },
  { site: "random", path: "/algorithm/" },
  // fest.one has no menu and a row of a guide's pages under every h1; the
  // tickets page carries the longest lists and the most links in a line.
  { site: "fest", path: "/" },
  { site: "fest", path: "/beyond-the-valley/tickets/" },
];

const url = (site, path) => `${baseUrl(site)}${path}`;

/** The header as a reader at this width gets it: how wide the document is,
    where the menu button ends, how many lines the wordmark's own text takes
    (distinct line tops of its text node — the logo beside it is not a line),
    the header's height, and the characters either side of a "·" in the name. */
function headerReading() {
  const name = document.querySelector(".site-header .site-name");
  const text = [...name.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()).pop();
  const range = document.createRange();
  range.selectNodeContents(text);
  const tops = new Set([...range.getClientRects()].filter((r) => r.width > 1).map((r) => Math.round(r.top)));
  const dot = text.textContent.indexOf("·");
  return {
    scrollWidth: document.documentElement.scrollWidth,
    burgerRight: document.querySelector(".nav-toggle summary").getBoundingClientRect().right,
    lines: tops.size,
    header: document.querySelector(".site-header").getBoundingClientRect().height,
    aroundDot: dot < 0 ? null : [text.textContent.charCodeAt(dot - 1), text.textContent.charCodeAt(dot + 1)],
  };
}

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

// sol2go's tip jar prints its wallet addresses in full. The grid track had a
// 24rem minimum, and on a phone that track was wider than the list: every
// page of the site slid sideways under a finger. Wrapped, an address must
// still keep its last four characters together, because those are what a
// reader checks against a hardware wallet's screen.
test.describe("tip jar", () => {
  for (const path of ["/", "/events/"]) {
    for (const width of [305, 320, 360, 390]) {
      test(`sol2go${path} @ ${width}: the addresses wrap inside the page`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(url("sol2go", path));
        const m = await page.evaluate(() => {
          const codes = [...document.querySelectorAll(".donate-address code")];
          return {
            // clientWidth, not the viewport: a classic scrollbar takes its
            // width out of the page without scrolling it sideways.
            clientWidth: document.documentElement.clientWidth,
            scrollWidth: document.documentElement.scrollWidth,
            rights: codes.map((c) => c.getBoundingClientRect().right),
            tails: codes.map((c) => {
              const text = c.lastChild;
              const range = document.createRange();
              range.setStart(text, text.length - 4);
              range.setEnd(text, text.length);
              return range.getClientRects().length;
            }),
          };
        });
        expect(m.rights.length, "the tip jar is on the page").toBeGreaterThan(0);
        expect(m.scrollWidth, "the page scrolls sideways").toBe(m.clientWidth);
        for (const right of m.rights) expect(right, "an address runs off the screen").toBeLessThanOrEqual(m.clientWidth);
        for (const rects of m.tails) expect(rects, "an address's last four characters are split across lines").toBe(1);
      });
    }
  }
});

// The one site in two languages. The switch in the header has to land on
// the same page in the other language — not that language's front page —
// and the page it lands on has to say which language it is in.
test.describe("language switch", () => {
  const CASES = [
    ["/events/equinox-fest-autumn-chapter-2026/", "/am/events/equinox-fest-autumn-chapter-2026/", "hy-AM"],
    ["/am/about/", "/about/", "en-GB"],
    ["/concerts/", "/am/concerts/", "hy-AM"],
  ];
  for (const [from, to, lang] of CASES) {
    test(`tick${from} switches to ${to}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 800 });
      await page.goto(url("tick", from));
      await page.locator(".lang-switch").click();
      await expect(page).toHaveURL(url("tick", to));
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
    });
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

  // On a phone it was the other way round: the name was nowrap and could not
  // shrink, so a long one pushed the menu off the screen. mxo's "Ferias y
  // Festivales de México" made the page 356px wide at 320 and put the burger
  // past the right edge; llc, vien and tick overflowed too. Up to 560px the
  // name now wraps between its words, two lines at most inside the same
  // header, and tick's "Tick · Yerevan" is held as one run by no-break
  // spaces. Measured in the desktop project on purpose: a mobile device
  // context widens the viewport to fit the page, which hides exactly this.
  const LONG_NAMES = [
    ["llc", "/", [305, 320, 340, 360, 384, 390]],
    ["mxo", "/", [305, 320, 340, 360, 390, 393]],
    ["vien", "/", [305, 320, 340, 360, 390]],
    ["tick", "/", [305, 320, 340, 360, 390]],
    ["tick", "/am/", [305, 320, 340, 360, 390]],
  ];
  for (const [site, path, widths] of LONG_NAMES) {
    for (const width of widths) {
      test(`${site}${path}: a long name gives way to the menu @ ${width}`, async ({ page }) => {
        await page.setViewportSize({ width: 414, height: 800 });
        await page.goto(url(site, path));
        const { header: at414 } = await page.evaluate(headerReading);
        await page.setViewportSize({ width, height: 800 });
        const now = await page.evaluate(headerReading);
        expect(now.scrollWidth, "the page scrolls sideways").toBe(width);
        expect(now.burgerRight, "the menu button is not 14px inside the edge").toBeLessThanOrEqual(width - 14);
        expect(now.lines, "the wordmark took more lines than it may").toBeLessThanOrEqual(site === "tick" ? 1 : 2);
        expect(now.header, "the header changed height").toBe(at414);
        if (site === "tick") expect(now.aroundDot, "the dot is not held by U+00A0 on both sides").toEqual([0xa0, 0xa0]);
      });
    }
  }

  // The reference names, which fit at every width: whatever is done for the
  // long ones, these stay on one line, in a header as tall as the same page's
  // at 414 (73px here; a machine with other fonts may differ).
  for (const site of ["visas", "dst"]) {
    for (const width of [305, 320, 360, 390]) {
      test(`${site}/: a name that fits stays on one line @ ${width}`, async ({ page }) => {
        await page.setViewportSize({ width: 414, height: 800 });
        await page.goto(url(site, "/"));
        const { header: at414 } = await page.evaluate(headerReading);
        await page.setViewportSize({ width, height: 800 });
        const now = await page.evaluate(headerReading);
        expect(now.lines, "the wordmark wrapped").toBe(1);
        expect(now.header, "the header changed height").toBe(at414);
      });
    }
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

  // 1240 rather than 1080, because 1024 is not the only breakpoint the row
  // has. A site whose labels add up to more than 1040px of footprint is
  // marked `site-nav-dense` and keeps the dropdown all the way to 1200px —
  // riviera is one, which is why asking for its inline row at 1080 asked for
  // something the stylesheet deliberately refuses. The suite did not say so
  // for as long as it did because its browsers were never installed on this
  // machine: every run ended in "Executable doesn't exist" rather than in a
  // result.
  test(`nav is a single inline row above ${DENSE_NAV_BREAKPOINT}px`, async ({ page }) => {
    await page.setViewportSize({ width: DENSE_NAV_BREAKPOINT + 40, height: 800 });
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

// tick's Armenian labels add up to more than the capped column holds even
// tightened, so that header gives the row a line of its own under the
// wordmark (`navBar` in BaseLayout). The line is one line, at every width.
test("a nav too long for the column takes a line of its own, unwrapped", async ({ page }) => {
  for (const width of [DENSE_NAV_BREAKPOINT + 40, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(url("tick", "/am/"));
    await expect(page.locator(".nav-desktop"), `inline row hidden @ ${width}`).toBeVisible();
    await expect(page.locator(".nav-toggle"), `toggle shown @ ${width}`).toBeHidden();
    const tops = await page.locator(".nav-desktop li").evaluateAll((els) =>
      els.map((el) => Math.round(el.getBoundingClientRect().top)),
    );
    expect(new Set(tops).size, `nav wrapped onto ${new Set(tops).size} rows @ ${width}`).toBe(1);
    const nameBottom = await page.locator(".site-name").evaluate((el) => el.getBoundingClientRect().bottom);
    expect(tops[0], `the row sits beside the wordmark @ ${width}, not under it`).toBeGreaterThanOrEqual(Math.round(nameBottom));
  }
});

// The search box builds its result rows at runtime, after Astro has scoped
// the page's CSS, so a scoped selector never reaches them: shipped once as
// bare running text (scan 2026-10-24, tick-09). The rows are cards.
test("search results are styled rows, not running text", async ({ page }) => {
  await page.goto(url("tick", "/?q=opera"));
  const row = page.locator(".site-search-results a").first();
  await expect(row).toBeVisible();
  const got = await row.evaluate((el) => {
    const cs = getComputedStyle(el);
    return { display: cs.display, border: cs.borderTopWidth, meta: getComputedStyle(el.querySelector(".site-search-meta")).display };
  });
  expect(got.display, "a result is a block, not inline text").toBe("grid");
  expect(got.border, "a result has its card border").toBe("1px");
  expect(got.meta, "the date line is a flex row").toBe("flex");
});

// The placeholder is the box's only instruction; cut at a phone's width it
// read "Search events, venues," and in Armenian ended in a lone "·" (scan
// 2026-10-24, tick-11). Measured in the input's own font.
test("the search placeholder is whole in the field at 320", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const path of ["/", "/am/", "/events/", "/am/events/"]) {
    await page.goto(url("tick", path));
    const { text, input } = await page.locator(".site-search input").evaluate((el) => {
      const span = document.createElement("span");
      const cs = getComputedStyle(el);
      span.style.cssText = `position:absolute;visibility:hidden;white-space:pre;font:${cs.font};letter-spacing:${cs.letterSpacing}`;
      span.textContent = el.placeholder;
      document.body.append(span);
      return { text: span.getBoundingClientRect().width, input: el.clientWidth };
    });
    expect(text, `${path}: placeholder ${text}px in a ${input}px input`).toBeLessThanOrEqual(input);
  }
});

// On a phone the header sticks, so whatever scrolls itself to the top has
// to stop below it. The header is 73px on every site and the offset was
// 64, which hid the top of each anchored heading; on tick a shared ?q= link
// now scrolls the search box up, which made it the first to show (tick-14).
test("on a phone, an anchor and a ?q= link land clear of the sticky header", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  const clear = () => page.evaluate(() => {
    const box = document.querySelector(location.hash || ".site-search");
    return { top: Math.round(box.getBoundingClientRect().top), header: Math.round(document.querySelector(".site-header").getBoundingClientRect().bottom), y: scrollY };
  });
  await page.goto(url("fest", "/creamfields-chile/#entradas"));
  const a = await clear();
  expect(a.y, "the anchor scrolled").toBeGreaterThan(0);
  expect(a.top, "#entradas under the header").toBeGreaterThanOrEqual(a.header);
  for (const path of ["/?q=opera", `/am/?q=${encodeURIComponent("Օպերա")}`]) {
    await page.goto(url("tick", path));
    await expect(page.locator(".site-search-results a").first()).toBeVisible();
    await expect.poll(() => page.evaluate(() => scrollY), { message: `${path}: scrolled to the box` }).toBeGreaterThan(0);
    const q = await clear();
    expect(q.top, `${path}: the search box under the header`).toBeGreaterThanOrEqual(q.header);
  }
});

// A subject page's list comes before the way to the other subjects: the
// eleven chips first took four rows at 320, six in Armenian, and put
// Halloween's first card 746px down, 882 on /am/ (hw-tick-04). Every
// section page the front page's chips lead to, in both languages.
test("a tick section page shows its first card before the subject chips", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  for (const home of ["/", "/am/"]) {
    await page.goto(url("tick", home));
    const hrefs = await page.locator(".chip-nav a").evaluateAll((els) => els.map((a) => a.getAttribute("href")));
    const sections = [...new Set(hrefs)].filter((h) => h !== home && !h.includes("/calendar/"));
    expect(sections.length, `${home}: section chips`).toBeGreaterThan(3);
    for (const href of sections) {
      await page.goto(url("tick", href));
      const { card, chips } = await page.evaluate(() => ({
        card: document.querySelector("main a.feed-card")?.getBoundingClientRect().top ?? null,
        chips: document.querySelector("main .chip-nav")?.getBoundingClientRect().top ?? null,
      }));
      if (card === null || chips === null) continue;
      expect(card, `${href}: the first card above the chips`).toBeLessThan(chips);
    }
  }
});

// CSS capitals spell the Armenian "և" the classical way, "ԵՒ" ("ԵՐԵՒԱՆ",
// "ՕՊԵՐԱ ԵՒ ԲԱԼԵՏ"); in Armenia it is "ԵՎ". caps() hands such text over in
// capitals already, so no uppercased element on an Armenian page may still
// hold the lowercase ligature. One page for each place it was found: the
// calendar's eyebrows and "until", an event's facts and category, a news
// article's category.
test("tick's Armenian capitals spell և as ԵՎ", async ({ page }) => {
  for (const path of [
    "/am/calendar/2026-11/",
    "/am/events/carmen-yerevan-opera-2026/",
    "/am/events/akhtamar-quartet-babajanyan-hall-yerevan-2026/",
    "/am/news/yerevan-fashion-week-2026/",
  ]) {
    await page.goto(url("tick", path));
    const left = await page.evaluate(() =>
      [...document.querySelectorAll("body *")]
        .filter((el) => getComputedStyle(el).textTransform === "uppercase")
        .map((el) => [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").trim())
        .filter((text) => text.includes("և")),
    );
    expect(left, `${path}: uppercased text still holding "և"`).toEqual([]);
  }
});

// The facts panel's label column is the panel's: a fixed 9rem broke "On this
// calendar" and «Այս օրացույցում» over two lines beside one-line values
// (scan 2026-10-24, net-25). Every label one line, every value at one x.
test("a facts panel keeps each label on one line and its values on one x", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const path of ["/venues/aram-khachaturian-concert-hall/", "/am/venues/aram-khachaturian-concert-hall/"]) {
    await page.goto(url("tick", path));
    const rows = await page.locator(".event-glance-row").evaluateAll((els) => els.map((r) => {
      const span = r.querySelector("dt span");
      return { lines: Math.round(span.getBoundingClientRect().height / parseFloat(getComputedStyle(span).lineHeight)), x: Math.round(r.querySelector("dd").getBoundingClientRect().left) };
    }));
    expect(rows.length, `${path}: the panel has rows`).toBeGreaterThan(1);
    expect(rows.filter((r) => r.lines > 1), `${path}: a two-line label`).toEqual([]);
    expect(new Set(rows.map((r) => r.x)).size, `${path}: values start at one x`).toBe(1);
  }
});

// A month still to come opens with its own days. Runs that began before it
// sit under their own heading, dated by the day they close; on 24 October
// the November page opened with three cards dated in October (tick-12).
test("a month still to come lists no 'upcoming' card dated before its first day", async ({ page }) => {
  const d = new Date();
  const next = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1)).toISOString().slice(0, 10);
  for (const prefix of ["", "/am"]) {
    const res = await page.goto(url("tick", `${prefix}/calendar/${next.slice(0, 7)}/`));
    test.skip(!res || res.status() === 404, "next month has no page yet");
    const first = await page.locator(".events-group").first().locator(".feed-meta time").evaluateAll((els) => els.map((el) => el.getAttribute("datetime")));
    expect(first.length, "the first group has cards").toBeGreaterThan(0);
    expect(first.filter((iso) => iso < next), `${prefix || "/"}: upcoming dated before ${next}`).toEqual([]);
  }
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
    // The page's first hop is its Tickets button, which reports as a
    // ticket_click — not as one more outbound_click among the source links.
    expect(names).toContain("ticket_click");
    expect(names).not.toContain("outbound_click");
    expect(names).toContain("add_to_calendar");
    // The hop's slug, not the third party's URL — the destination stays out
    // of the reports the same way it stays out of the markup.
    const hop = events.find((e) => e[1] === "ticket_click")[2].hop;
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

test.describe("feed cards", () => {
  // The cover is the coloured band at the top of every card in a row, and it
  // was the flex item that gave way when one card's headline ran two lines:
  // at 1280 a row of three came out 161/193/193 and the band stepped down on
  // the first card alone. tick's spotlight is the same fault from the other
  // side: the date cover over DevFest's art was capped at 220px, the Snoop
  // Dogg cover beside it ran 262px.
  for (const [site, path] of [["fwf", "/"], ["dst", "/"], ["tick", "/"], ["tick", "/am/"]]) {
    test(`${site}${path}: covers in a row are the same height`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(url(site, path));

      const rows = await page.evaluate(() => {
        const groups = [];
        for (const grid of document.querySelectorAll(".feed-cards")) {
          const cards = [...grid.querySelectorAll(":scope > .feed-card")];
          // Only cards that share a row: a wrapped grid legitimately differs.
          const byTop = new Map();
          for (const card of cards) {
            const top = Math.round(card.getBoundingClientRect().top);
            const h = Math.round(card.querySelector(".feed-cover").getBoundingClientRect().height);
            byTop.set(top, [...(byTop.get(top) ?? []), h]);
          }
          for (const heights of byTop.values()) if (heights.length > 1) groups.push(heights);
        }
        return groups;
      });

      expect(rows.length, "no multi-card row to measure").toBeGreaterThan(0);
      for (const heights of rows) {
        expect(new Set(heights).size, `covers in one row measured ${heights.join("/")}`).toBe(1);
      }
    });
  }

  // fest.one's hub cards (apps/fest, HubEntry.astro) are the same shape in
  // a grid of their own: a row's covers are one height however long a
  // card's blurb runs (December's row puts Beyond The Valley's, the
  // longest, beside Wonderfruit's), since the rows align at the top and
  // the cover is a 2:1 band of the card's width.
  test("fest/: hub covers in a row are the same height", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(url("fest", "/"));

    const rows = await page.evaluate(() => {
      const groups = [];
      for (const grid of document.querySelectorAll(".hub-grid")) {
        const byTop = new Map();
        for (const card of grid.querySelectorAll(":scope > .hub-card")) {
          const top = Math.round(card.getBoundingClientRect().top);
          const h = Math.round(card.querySelector(".hub-card-cover").getBoundingClientRect().height);
          byTop.set(top, [...(byTop.get(top) ?? []), h]);
        }
        for (const heights of byTop.values()) if (heights.length > 1) groups.push(heights);
      }
      return groups;
    });

    expect(rows.length, "no multi-card row to measure").toBeGreaterThan(0);
    for (const heights of rows) {
      expect(new Set(heights).size, `covers in one row measured ${heights.join("/")}`).toBe(1);
    }
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


// An underline under every link in a paragraph turns running text into a
// ruled page: the reader's eye is dragged to the rules rather than to the
// sentence. Colour and weight carry a link in body text; the underline comes
// back on hover and on keyboard focus, and stays permanently in the footer,
// where the type is small and muted and colour alone is not enough.
//
// This has to be measured rather than read out of the markup: the underline
// is a browser default, so it is in nobody's stylesheet and no static check
// can see it.
test.describe("links in running text carry no underline", () => {
  for (const { site, path } of PAGES) {
    test(`${site}${path}`, async ({ page }) => {
      await page.goto(url(site, path));
      const underlined = await page.evaluate(() => {
        // Buttons, cards and banners are surfaces, not links in a sentence,
        // and the footer keeps its underlines on purpose.
        const exempt = ".button, .link-card, .cta-banner, .site-footer, nav";
        return [...document.querySelectorAll("main a, article a")]
          .filter((a) => !a.closest(exempt))
          .filter((a) => getComputedStyle(a).textDecorationLine.split(" ").includes("underline"))
          .map((a) => `${a.getAttribute("href")} — ${(a.textContent || "").trim().slice(0, 40)}`);
      });
      expect([...new Set(underlined)], "links underlined in body text").toEqual([]);
    });
  }
});

test.describe("A/B/n", () => {
  // tick's ticket-price test (@dst/content/experiments): three labels in one
  // button, one shown, picked before the first paint.
  const EVENT = "/events/elgar-enigma-variations-yerevan-2026/";
  const LABELS = { label: "Tickets", buy: "Buy tickets", price: "Tickets from AMD 3,000" };
  const button = (page) => page.locator("a.button[data-ticket]");
  // data-experiments, and the `exp` on every GA4 event, list every test
  // the page view is in — an event page on tick is in meta-hook too — so
  // the ticket-price tag is looked for among them, not as the whole value.
  const tags = (value) => (value ?? "").split(" ").filter(Boolean);
  const ours = (list) => list.filter((t) => t.startsWith("ticket-price:"));
  const state = (page) =>
    page.evaluate(() => ({
      chosen: document.documentElement.getAttribute("data-exp-ticket-price"),
      tags: document.documentElement.getAttribute("data-experiments"),
      impressions: (window.dataLayer ?? [])
        .filter((a) => a && a[0] === "event" && a[1] === "experience_impression")
        .map((a) => a[2].exp_variant_string),
    }));

  test("a visitor sees one label, keeps it, and is counted once", async ({ page }) => {
    await page.goto(url("tick", EVENT));
    const first = await state(page);
    expect(Object.keys(LABELS)).toContain(first.chosen);
    expect(ours(tags(first.tags))).toEqual([`ticket-price:${first.chosen}`]);
    expect(ours(first.impressions)).toEqual([`ticket-price:${first.chosen}`]);
    // One impression per test, each carrying its own tag only.
    expect(first.impressions).toEqual(tags(first.tags));
    await expect(button(page)).toHaveText(LABELS[first.chosen], { useInnerText: true });

    // The same visitor in the other language is the same visitor.
    await page.goto(url("tick", `/am${EVENT}`));
    expect((await state(page)).chosen).toBe(first.chosen);
  });

  test("a ticket click carries the variant", async ({ page }) => {
    await page.goto(url("tick", EVENT));
    const events = await page.evaluate(() => {
      const sent = [];
      window.gtag = (...args) => sent.push(args);
      document.addEventListener("click", (e) => e.preventDefault(), true);
      document.querySelector("a.button[data-ticket]").click();
      return sent;
    });
    const click = events.find((e) => e[1] === "ticket_click");
    expect(click, `no ticket_click among ${JSON.stringify(events)}`).toBeTruthy();
    const { chosen, tags: onPage } = await state(page);
    expect(tags(click[2].exp)).toContain(`ticket-price:${chosen}`);
    expect(click[2].exp, "every test the page view is in").toBe(onPage);
    // The words on screen, not all three labels run together.
    expect(click[2].text).toBe(LABELS[chosen]);
  });

  test("?exp= shows the variant asked for and counts nothing", async ({ page }) => {
    for (const [variant, text] of Object.entries(LABELS)) {
      await page.goto(url("tick", `${EVENT}?exp=ticket-price:${variant}`));
      await expect(button(page)).toHaveText(text, { useInnerText: true });
      const s = await state(page);
      expect(ours(tags(s.tags)), "a forced variant is tagged as a visit").toEqual([]);
      expect(ours(s.impressions)).toEqual([]);
    }
  });

  test("without JavaScript the control shows", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(url("tick", EVENT));
    await expect(button(page)).toHaveText(LABELS.label, { useInnerText: true });
    await context.close();
  });
});

test.describe("A/B/n: aivideo's action-label", () => {
  // The button under an aivideo.zone headline: its short label against the
  // sentence that says where it goes.
  const ENTRY = "/news/kling-4-0-announced-flash-early-access/";
  const LABELS = { label: "Kling's announcement", title: "Kling AI's announcement of Kling 4.0" };
  const button = (page) => page.locator(".news-article-actions a.button");
  const chosen = (page) =>
    page.evaluate(() => document.documentElement.getAttribute("data-exp-action-label"));

  test("a visitor sees one label, and a click carries it", async ({ page }) => {
    await page.goto(url("aivideo", ENTRY));
    const variant = await chosen(page);
    expect(Object.keys(LABELS)).toContain(variant);
    await expect(button(page)).toHaveText(LABELS[variant], { useInnerText: true });
    const events = await page.evaluate(() => {
      const sent = [];
      window.gtag = (...args) => sent.push(args);
      document.addEventListener("click", (e) => e.preventDefault(), true);
      document.querySelector(".news-article-actions a.button").click();
      return sent;
    });
    const click = events.find((e) => e[1] === "outbound_click");
    expect(click, `no outbound_click among ${JSON.stringify(events)}`).toBeTruthy();
    expect(click[2].exp).toBe(`action-label:${variant}`);
    expect(click[2].text).toBe(LABELS[variant]);
  });

  test("?exp= shows the variant asked for", async ({ page }) => {
    for (const [variant, text] of Object.entries(LABELS)) {
      await page.goto(url("aivideo", `${ENTRY}?exp=action-label:${variant}`));
      await expect(button(page)).toHaveText(text, { useInnerText: true });
    }
  });
});

// share-label: the share button on tick's event pages says "Share" or
// "Invite friends" per visitor; the floating mark on a phone has no words
// and is outside the test. See @dst/content/experiments.
test.describe("share-label", () => {
  const EVENT = "/events/elgar-enigma-variations-yerevan-2026/";
  const LABELS = { share: "Share", invite: "Invite friends" };
  const button = (page) => page.locator("button.share-button");
  const tags = (value) => (value ?? "").split(" ").filter(Boolean);
  const ours = (list) => list.filter((t) => t.startsWith("share-label:"));
  const state = (page) =>
    page.evaluate(() => ({
      chosen: document.documentElement.getAttribute("data-exp-share-label"),
      tags: document.documentElement.getAttribute("data-experiments"),
    }));

  test("a visitor sees one label and keeps it in the other language", async ({ page }) => {
    await page.goto(url("tick", EVENT));
    const first = await state(page);
    expect(Object.keys(LABELS)).toContain(first.chosen);
    expect(ours(tags(first.tags))).toEqual([`share-label:${first.chosen}`]);
    await expect(button(page)).toHaveText(LABELS[first.chosen], { useInnerText: true });
    await page.goto(url("tick", `/am${EVENT}`));
    expect((await state(page)).chosen).toBe(first.chosen);
  });

  test("?exp= shows the variant asked for and counts nothing", async ({ page }) => {
    for (const [variant, text] of Object.entries(LABELS)) {
      await page.goto(url("tick", `${EVENT}?exp=share-label:${variant}`));
      await expect(button(page)).toHaveText(text, { useInnerText: true });
      expect(ours(tags((await state(page)).tags))).toEqual([]);
    }
  });

  test("a press is a share_click that names the button and its words", async ({ page }) => {
    await page.goto(url("tick", EVENT));
    const { chosen } = await state(page);
    const events = await page.evaluate(async () => {
      const sent = [];
      window.gtag = (...args) => sent.push(args);
      document.querySelector("button.share-button").click();
      await new Promise((r) => setTimeout(r, 200));
      return sent;
    });
    const click = events.find((e) => e[1] === "share_click");
    expect(click, `no share_click among ${JSON.stringify(events)}`).toBeTruthy();
    expect(click[2].cta_kind).toBe("button");
    expect(click[2].cta_text).toBe(LABELS[chosen]);
    expect(tags(click[2].exp)).toContain(`share-label:${chosen}`);
  });

  test("the floating mark shows on a phone only, and is not the button", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(url("tick", EVENT));
    const fab = page.locator("button.share-fab");
    await expect(fab).toBeVisible();
    const box = await fab.boundingBox();
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
    const kinds = await page.evaluate(async () => {
      const sent = [];
      window.gtag = (...args) => sent.push(args);
      document.querySelector("button.share-fab").click();
      await new Promise((r) => setTimeout(r, 200));
      return sent.filter((e) => e[1] === "share_click").map((e) => e[2].cta_kind);
    });
    expect(kinds).toEqual(["fab"]);
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(fab).toBeHidden();
  });
});
