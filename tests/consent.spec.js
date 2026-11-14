// The consent bar on the sites that ask before they measure — Vienna and
// the three London sites (packages/ui/src/consent.ts). What the bar promises
// is about what a browser does, so it is checked in one: no request to
// Google's tag, no cookie and nothing stored until the reader says yes; a no
// that is as easy as a yes; and an answer that can be changed from any page
// and holds in every tab.
//
// Google's hosts are answered with a stub, so the suite stays off the
// network. What the real tag does is therefore not tested here; what the
// page hands it, and when, is.
//
//   npm run build && npx playwright test consent
import { test, expect } from "@playwright/test";
import { baseUrl } from "./servers.js";

const EN = { about: "/about/", anchor: "statistics", yes: "Allow", no: "Decline", settings: "Cookie settings", saidNo: "Your answer so far: declined.", back: "You can change your answer at any time under “Cookie settings” at the foot of every page." };
const SITES = [
  { site: "vien", host: "vien.lol", about: "/ueber-uns/", anchor: "statistik", yes: "Zustimmen", no: "Ablehnen", settings: "Cookie-Einstellungen", saidNo: "Ihre Antwort bisher: abgelehnt.", back: "Eine Einwilligung können Sie jederzeit unter „Cookie-Einstellungen“ am Seitenende widerrufen." },
  { site: "ldn", host: "ldn.lol", ...EN },
  { site: "lnd", host: "lnd.lol", ...EN },
  { site: "l0n", host: "l0n.uk", ...EN },
];

const KEY = "consent:analytics";
const DAY = 24 * 60 * 60 * 1000;
// Every host the tag fetches from or reports to.
const GOOGLE = /googletagmanager\.com|google-analytics\.com|analytics\.google\.com|doubleclick\.net/;
// What stands in for Google's tag. As the page is left it notes whether the
// property had been switched off by then: a tag still live at that moment is
// one that can send a parting hit.
const TAG = `addEventListener("pagehide", function () {
  var off = Object.keys(window).some(function (k) { return k.indexOf("ga-disable-G-") === 0 && window[k] === true; });
  try { sessionStorage.setItem("probe:off", String(off)); } catch (e) {}
});`;

/** Every request the page makes to Google's measurement hosts. */
async function watch(context) {
  const seen = [];
  await context.route(GOOGLE, (route) => {
    seen.push(route.request().url());
    return route.fulfill({ status: 200, contentType: "application/javascript", body: TAG });
  });
  return seen;
}

/** The site under its real name, served from the local build: a cookie's
    Domain only means something on the host it was set for, and .uk is a
    public suffix where .lol is not. */
async function asHost(context, s) {
  const origin = `http://${s.host}`;
  await context.route(`${origin}/**`, async (route) => {
    try {
      await route.fulfill({ response: await route.fetch({ url: route.request().url().replace(origin, baseUrl(s.site)) }) });
    } catch {
      // The page moved on, or the test ended, while this file was in flight.
      await route.abort().catch(() => {});
    }
  });
  return (path = "/") => origin + path;
}

const stored = (page) => page.evaluate((k) => localStorage.getItem(k), KEY);
const store = (page, value) => page.evaluate(([k, v]) => localStorage.setItem(k, v), [KEY, value]);
const bar = (page) => page.locator("[data-consent]");
const footerControl = (page, s) => page.locator(".site-footer").getByRole("button", { name: s.settings, exact: true });
/** The page's own state, as far as measurement goes. */
const tagState = (page) =>
  page.evaluate(() => ({
    gtag: typeof window.gtag,
    dataLayer: Array.isArray(window.dataLayer) ? window.dataLayer.map((a) => Array.from(a)) : null,
    loader: document.querySelectorAll('script[src*="googletagmanager.com"]').length,
    cookies: document.cookie,
  }));
/** The same, on a page that may be reloading under the question. */
const settled = (page, read) => page.evaluate(read).catch(() => "reloading");

for (const s of SITES) {
  const url = (path = "/") => baseUrl(s.site) + path;
  const yes = (page) => bar(page).getByRole("button", { name: s.yes, exact: true });
  const no = (page) => bar(page).getByRole("button", { name: s.no, exact: true });

  test.describe(`consent on ${s.site}`, () => {
    test("asks, and reaches for nothing until answered", async ({ page, context }) => {
      const seen = await watch(context);
      await page.goto(url());
      await page.waitForLoadState("networkidle");

      await expect(bar(page)).toBeVisible();
      await expect(yes(page)).toBeVisible();
      await expect(no(page)).toBeVisible();
      // The question says where the answer can be taken back, by the name
      // the footer control carries.
      await expect(bar(page)).toContainText(s.back);
      await expect(footerControl(page, s)).toBeVisible();

      const state = await tagState(page);
      expect(seen, "a request went to Google before any answer").toEqual([]);
      expect(state.loader, "the loader is in the page before any answer").toBe(0);
      expect(state.dataLayer, "a dataLayer exists before any answer").toBeNull();
      expect(state.cookies, "a cookie was set before any answer").toBe("");
      expect(await stored(page), "something was stored before any answer").toBeNull();
      expect(await context.cookies(), "the browser holds a cookie before any answer").toEqual([]);
    });

    test("a yes loads the tag, sends what the page held, and is remembered", async ({ page, context }) => {
      const seen = await watch(context);
      await page.goto(url());
      // What the page would have reported while the question stood open.
      await page.evaluate(() => window.gtag("event", "probe", { held: true }));
      await yes(page).click();

      await expect(bar(page)).toBeHidden();
      await expect.poll(() => seen.filter((u) => u.includes("/gtag/js?id=G-")).length).toBe(1);
      const answer = await stored(page);
      expect(answer).toMatch(/^yes:\d+$/);

      const { dataLayer, gtag } = await tagState(page);
      expect(gtag).toBe("function");
      expect(dataLayer[0].slice(0, 2)).toEqual(["consent", "default"]);
      // Measurement was agreed to; advertising was never asked about.
      expect(dataLayer[0][2]).toEqual({
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      expect(dataLayer[1][0]).toBe("js");
      expect(dataLayer[2][0]).toBe("config");
      expect(dataLayer[2][1]).toMatch(/^G-[A-Z0-9]+$/);
      expect(dataLayer[2][2]).toEqual({
        cookie_domain: "auto",
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      expect(dataLayer.slice(3), "the held event did not follow the config call").toContainEqual(["event", "probe", { held: true }]);

      // The next page does not ask again, measures from the start, and
      // leaves the answer's date alone: a yes that renewed itself on every
      // visit would never come up for asking again.
      await page.waitForTimeout(5);
      await page.reload();
      await expect(bar(page)).toBeHidden();
      await expect.poll(() => seen.filter((u) => u.includes("/gtag/js?id=G-")).length).toBe(2);
      expect(await stored(page), "a page load rewrote the answer").toBe(answer);
    });

    test("a no loads nothing, drops what the page held, and is remembered", async ({ page, context }) => {
      const seen = await watch(context);
      await page.goto(url());
      await page.evaluate(() => window.gtag("event", "probe", { held: true }));
      await no(page).click();

      await expect(bar(page)).toBeHidden();
      expect(await stored(page)).toMatch(/^no:\d+$/);
      let state = await tagState(page);
      expect(state.gtag, "gtag outlived a no").toBe("undefined");
      expect(state.dataLayer).toBeNull();

      await page.reload();
      await page.waitForLoadState("networkidle");
      await expect(bar(page)).toBeHidden();
      state = await tagState(page);
      expect(state.gtag).toBe("undefined");
      expect(state.loader).toBe(0);
      expect(seen, "a request went to Google after a no").toEqual([]);
      expect(await context.cookies()).toEqual([]);

      // A yes given later starts clean: what was clicked before the no was
      // declined with it.
      await footerControl(page, s).click();
      await yes(page).click();
      await expect.poll(() => seen.length).toBe(1);
      state = await tagState(page);
      expect(state.dataLayer.map((entry) => entry[0]), "something from before the no was sent after the yes").toEqual(["consent", "js", "config"]);
    });

    test("the footer brings the question back, and a no after a yes clears the cookies", async ({ page, context }) => {
      const seen = await watch(context);
      const at = await asHost(context, s);
      await page.goto(at());
      await yes(page).click();
      const id = (await tagState(page)).dataLayer[2][1];
      // The cookies the real tag would have set by now, on the domain it
      // sets them for; one from an id these sites reported to earlier; and
      // one that only looks like them, which is not ours to delete.
      const cookie = (name) => ({ name, value: "1.1.1.1", domain: `.${s.host}`, path: "/" });
      await context.addCookies([cookie("_ga"), cookie(`_ga_${id.slice(2)}`), cookie("_ga_JBB43WWXW9"), cookie("_gab")]);
      await page.reload();
      await expect(bar(page)).toBeHidden();
      expect((await context.cookies()).map((c) => c.name).sort()).toEqual(["_ga", "_ga_JBB43WWXW9", `_ga_${id.slice(2)}`, "_gab"].sort());

      await footerControl(page, s).click();
      await expect(bar(page)).toBeVisible();
      await expect(no(page)).toBeFocused();

      seen.length = 0;
      const reloaded = page.waitForEvent("load");
      await no(page).click();
      await reloaded;
      await page.waitForLoadState("networkidle");

      await expect(bar(page)).toBeHidden();
      expect(await stored(page)).toMatch(/^no:\d+$/);
      expect((await context.cookies()).map((c) => c.name), "the analytics cookies survived a no").toEqual(["_gab"]);
      const state = await tagState(page);
      expect(state.gtag).toBe("undefined");
      expect(state.loader).toBe(0);
      expect(seen, "a request went to Google after the answer was changed to no").toEqual([]);
      expect(await page.evaluate(() => sessionStorage.getItem("probe:off")), "the tag was still switched on as the page was left").toBe("true");
    });

    test("an answer older than 180 days is asked again, and one from the future is no answer", async ({ page, context }) => {
      const seen = await watch(context);
      const at = await asHost(context, s);
      await page.goto(at());
      for (const [answer, age, asks] of [["yes", 181, true], ["no", 181, true], ["no", 179, false], ["yes", -3650, true]]) {
        await store(page, `${answer}:${Date.now() - age * DAY}`);
        await page.reload();
        await page.waitForLoadState("networkidle");
        await expect(bar(page), `${answer} of ${age} days ago`).toBeVisible({ visible: asks });
        expect(seen, `${answer} of ${age} days ago loaded the tag`).toEqual([]);
      }

      // A lapsed yes takes its cookies with it: nobody has agreed to them.
      await context.addCookies([{ name: "_ga", value: "1.1.1.1", domain: `.${s.host}`, path: "/" }]);
      await store(page, `yes:${Date.now() - 181 * DAY}`);
      await page.reload();
      await expect(bar(page)).toBeVisible();
      expect(await context.cookies(), "a lapsed yes kept its cookie").toEqual([]);

      await store(page, `yes:${Date.now() - 179 * DAY}`);
      await page.reload();
      await expect(bar(page)).toBeHidden();
      await expect.poll(() => seen.length).toBeGreaterThan(0);
    });

    test("an answer given in another tab is this tab's answer too", async ({ context }) => {
      await watch(context);
      const here = await context.newPage();
      const there = await context.newPage();
      await here.goto(url());
      await there.goto(url());
      await expect(bar(here)).toBeVisible();

      await yes(there).click();
      await expect(bar(here)).toBeHidden();
      await expect.poll(() => settled(here, () => document.querySelectorAll('script[src*="googletagmanager.com"]').length)).toBe(1);

      // A page that was loaded under the yes stops measuring on the no.
      await footerControl(there, s).click();
      await no(there).click();
      await expect.poll(() => settled(here, () => typeof window.gtag + ":" + document.querySelectorAll('script[src*="googletagmanager.com"]').length)).toBe("undefined:0");
      await expect(bar(here)).toBeHidden();
    });

    test("a page restored by Back honours an answer given since", async ({ page, context }) => {
      await watch(context);
      await page.goto(url());
      await yes(page).click();
      // The answer changes on a later page; Back then restores this one
      // from the browser's cache, which a headless browser will not do, so
      // the event it would get is sent by hand.
      await store(page, `no:${Date.now()}`);
      const reloaded = page.waitForEvent("load");
      await page.evaluate(() => dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true })));
      await reloaded;
      const state = await tagState(page);
      expect(state.gtag).toBe("undefined");
      expect(state.loader).toBe(0);
      await expect(bar(page)).toBeHidden();
    });

    test("a reopened bar says the standing answer, and Escape leaves it standing", async ({ page, context }) => {
      await watch(context);
      await page.goto(url());
      await expect(bar(page)).not.toContainText(s.saidNo);
      await no(page).click();
      const answer = await stored(page);

      await footerControl(page, s).click();
      await expect(bar(page)).toContainText(s.saidNo);
      await expect(no(page)).toHaveAccessibleDescription(s.saidNo);
      await page.keyboard.press("Escape");
      await expect(bar(page)).toBeHidden();
      await expect(footerControl(page, s)).toBeFocused();
      expect(await stored(page)).toBe(answer);
    });

    // Declining has to be exactly as easy as allowing: the same button,
    // the same size, side by side.
    for (const [width, height] of [[320, 640], [390, 844], [768, 1024], [1280, 800]]) {
      test(`the bar fits and weighs both answers the same at ${width}px`, async ({ page, context }) => {
        await watch(context);
        await page.setViewportSize({ width, height });
        await page.goto(url());
        await expect(bar(page)).toBeVisible();

        const m = await page.evaluate(() => {
          const box = (el) => { const r = el.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, w: r.width, h: r.height }; };
          const look = (el) => { const c = getComputedStyle(el); return [c.backgroundColor, c.color, c.borderTopColor, c.borderTopWidth, c.fontWeight, c.fontSize].join("|"); };
          const bar = document.querySelector("[data-consent]");
          const no = bar.querySelector("[data-consent-no]"), yes = bar.querySelector("[data-consent-yes]");
          return {
            bar: box(bar), no: box(no), yes: box(yes), noLook: look(no), yesLook: look(yes),
            viewport: { w: innerWidth, h: innerHeight },
            scrollWidth: document.documentElement.scrollWidth,
            pad: parseFloat(getComputedStyle(document.body).paddingBottom),
          };
        });
        expect(m.scrollWidth, "the bar pushes the page sideways").toBeLessThanOrEqual(m.viewport.w);
        expect(m.bar.left).toBe(0);
        expect(Math.round(m.bar.right)).toBe(m.viewport.w);
        expect(Math.round(m.bar.bottom)).toBe(m.viewport.h);
        expect(m.bar.h, "the bar takes more than 45% of the window").toBeLessThanOrEqual(m.viewport.h * 0.45);
        expect(m.no.h).toBeGreaterThanOrEqual(44);
        expect(Math.abs(m.no.h - m.yes.h)).toBeLessThanOrEqual(0.5);
        expect(Math.abs(m.no.w - m.yes.w), "one answer is wider than the other").toBeLessThanOrEqual(1);
        expect(Math.abs(m.no.top - m.yes.top), "the answers are not on one line").toBeLessThanOrEqual(0.5);
        expect(m.noLook, "the answers are styled differently").toBe(m.yesLook);
        // The page grows by the bar, so its last line scrolls clear of it.
        expect(Math.abs(m.pad - m.bar.h)).toBeLessThanOrEqual(1);
        await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
        const clear = await page.evaluate(() => {
          const last = document.querySelector(".site-footer [data-consent-open]").getBoundingClientRect();
          return document.querySelector("[data-consent]").getBoundingClientRect().top - last.bottom;
        });
        expect(clear, "the bar covers the footer's last control").toBeGreaterThanOrEqual(0);
      });
    }

    // A phone held sideways, and a desktop page zoomed to 400%: a bar fixed
    // to the foot of such a window is most of it, under a sticky header.
    for (const [width, height] of [[667, 375], [320, 256]]) {
      test(`in a ${width}x${height} window the bar is a block above the header, not a cover`, async ({ page, context }) => {
        await watch(context);
        await page.setViewportSize({ width, height });
        await page.goto(url());
        await expect(bar(page)).toBeVisible();
        const m = await page.evaluate(() => {
          const bar = document.querySelector("[data-consent]");
          return {
            position: getComputedStyle(bar).position,
            barBottom: bar.getBoundingClientRect().bottom,
            headerTop: document.querySelector(".site-header").getBoundingClientRect().top,
            pad: parseFloat(getComputedStyle(document.body).paddingBottom),
            scrollWidth: document.documentElement.scrollWidth,
          };
        });
        expect(m.position).toBe("static");
        expect(m.barBottom, "the header is drawn over the bar").toBeLessThanOrEqual(m.headerTop + 0.5);
        expect(m.pad).toBe(0);
        expect(m.scrollWidth).toBeLessThanOrEqual(width);
        // It scrolls away with the top of the page rather than following.
        await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
        await expect(bar(page)).not.toBeInViewport();
      });
    }

    test("the keyboard meets the question right after the skip link", async ({ page, context }) => {
      await watch(context);
      await page.goto(url());
      const focused = () => page.evaluate(() => {
        const el = document.activeElement;
        return el.className || el.getAttribute("data-consent-no") !== null && "no" || el.tagName;
      });
      await page.keyboard.press("Tab");
      expect(await focused()).toContain("skip-link");
      await page.keyboard.press("Tab");
      await expect(bar(page).getByRole("link")).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(no(page)).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(yes(page)).toBeFocused();
      // The first ask is not dismissed by Escape: it is answered or left.
      await page.keyboard.press("Escape");
      await expect(bar(page)).toBeVisible();
      // Answered from the keyboard, focus goes to the content rather than
      // being dropped with the bar.
      await page.keyboard.press("Shift+Tab");
      await page.keyboard.press("Enter");
      await expect(bar(page)).toBeHidden();
      await expect(page.locator("#content")).toBeFocused();
    });

    test("the bar's link lands on the site's own account of it", async ({ page, context }) => {
      await watch(context);
      await page.goto(url());
      await bar(page).getByRole("link").click();
      await expect(page).toHaveURL(url(`${s.about}#${s.anchor}`));
      const section = page.locator(`#${s.anchor}`);
      await expect(section).toBeVisible();
      // The second way back to the question, beside the footer's.
      await no(page).click();
      await expect(bar(page)).toBeHidden();
      await section.getByRole("button", { name: s.settings, exact: true }).click();
      await expect(bar(page)).toBeVisible();
    });

    test("a standing no clears analytics cookies, at once and at every load; a reader never asked keeps theirs", async ({ page, context }) => {
      await watch(context);
      const at = await asHost(context, s);
      await page.goto(at());
      const plant = () =>
        context.addCookies([
          { name: "_ga", value: "1", domain: `.${s.host}`, path: "/" },
          { name: "_ga_JBB43WWXW9", value: "1", domain: `.${s.host}`, path: "/" },
          { name: "_ga", value: "1", url: at() },
          { name: "_gab", value: "1", domain: `.${s.host}`, path: "/" },
        ]);
      const names = async () => (await context.cookies()).map((c) => `${c.name}@${c.domain}`).sort();

      await plant();
      await page.reload();
      await expect(bar(page)).toBeVisible();
      expect(await names(), "a reader never asked lost cookies").toHaveLength(4);

      // Declining the first ask takes them without a reload: no tag was on
      // the page to switch off.
      await page.evaluate(() => { window.__same = true; });
      await no(page).click();
      expect(await names(), "a no left analytics cookies").toEqual([`_gab@.${s.host}`]);
      expect(await page.evaluate(() => window.__same)).toBe(true);

      // And whatever puts them back, the next page takes them again.
      await plant();
      await page.reload();
      await expect(bar(page)).toBeHidden();
      expect(await names(), "a standing no kept analytics cookies").toEqual([`_gab@.${s.host}`]);
    });

    test("what a page held before a no is not sent by a later yes, here or from another tab", async ({ context }) => {
      await watch(context);
      const here = await context.newPage();
      const there = await context.newPage();
      await here.goto(url());
      await there.goto(url());
      await here.evaluate(() => window.gtag("event", "probe", { held: true }));
      await there.evaluate(() => window.gtag("event", "probe", { held: true }));

      // The bar here has the keyboard when the answer arrives from there:
      // focus goes where an answer given here would have sent it.
      await no(here).focus();
      await no(there).click();
      await expect(bar(here)).toBeHidden();
      await expect.poll(() => here.evaluate(() => document.activeElement?.id)).toBe("content");

      await footerControl(there, s).click();
      await yes(there).click();
      for (const p of [here, there]) {
        await expect.poll(() => p.evaluate(() => (window.dataLayer || []).map((a) => a[0]).join())).toBe("consent,js,config");
      }
    });

    test("a second yes elsewhere leaves a measuring page alone; a cleared answer stops it", async ({ context }) => {
      await watch(context);
      const here = await context.newPage();
      const there = await context.newPage();
      await here.goto(url());
      await yes(here).click();
      await there.goto(url());
      await here.evaluate(() => { window.__same = true; });

      await footerControl(there, s).click();
      await yes(there).click();
      await there.evaluate(() => localStorage.setItem("other", "1"));
      await here.waitForTimeout(500);
      expect(await here.evaluate(() => window.__same === true && typeof window.gtag), "a page under a yes was reloaded by a yes").toBe("function");

      await there.evaluate(() => localStorage.clear());
      await expect(bar(here)).toBeVisible();
      await expect.poll(() => settled(here, () => document.querySelectorAll('script[src*="googletagmanager.com"]').length)).toBe(0);
    });

    test("a no keeps its date, and an answer two days ahead is no answer, yes or no", async ({ page, context }) => {
      const seen = await watch(context);
      await page.goto(url());
      const answer = `no:${Date.now() - 5 * DAY}`;
      await store(page, answer);
      await page.reload();
      await page.reload();
      await expect(bar(page)).toBeHidden();
      expect(await stored(page), "a page load rewrote the no").toBe(answer);

      for (const a of ["yes", "no"]) {
        await store(page, `${a}:${Date.now() + 2 * DAY}`);
        await page.reload();
        await expect(bar(page), `${a} dated two days ahead`).toBeVisible();
      }
      expect(seen).toEqual([]);
    });

    test("the bar of a page restored by Back follows the answer too", async ({ page, context }) => {
      await watch(context);
      await page.goto(url());
      await expect(bar(page)).toBeVisible();
      await store(page, `no:${Date.now()}`);
      await page.evaluate(() => dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true })));
      await expect(bar(page)).toBeHidden();
      expect(await page.evaluate(() => typeof window.gtag)).toBe("undefined");
    });

    test("a browser that refuses cookie writes still gets the switch and the reload", async ({ page, context }) => {
      await watch(context);
      await context.addInitScript(() =>
        Object.defineProperty(Document.prototype, "cookie", {
          configurable: true,
          get() { return "_ga=1"; },
          set() { throw new DOMException("no", "SecurityError"); },
        }),
      );
      await page.goto(url());
      await yes(page).click();
      await footerControl(page, s).click();
      const reloaded = page.waitForEvent("load");
      await no(page).click();
      await reloaded;
      expect(await page.evaluate(() => typeof window.gtag)).toBe("undefined");
      expect(await page.evaluate(() => sessionStorage.getItem("probe:off"))).toBe("true");
    });

    test("with scripts off nothing asks, nothing measures and no dead control is shown", async ({ browser }) => {
      const context = await browser.newContext({ javaScriptEnabled: false });
      const seen = await watch(context);
      const page = await context.newPage();
      await page.goto(url(s.about));
      await page.waitForLoadState("networkidle");
      await expect(bar(page)).toBeHidden();
      await expect(page.locator("[data-consent-open]")).toHaveCount(2);
      for (const control of await page.locator("[data-consent-open]").all()) await expect(control).toBeHidden();
      expect(seen).toEqual([]);
      expect(await context.cookies()).toEqual([]);
      await context.close();
    });
  });
}

test.describe("consent elsewhere", () => {
  // The other sites were not asked to change, and do not: no bar, no gate,
  // the tag in the page as it always was.
  for (const site of ["tick", "riviera", "musical"]) {
    test(`${site} neither asks nor waits`, async ({ page, context }) => {
      await watch(context);
      await page.goto(baseUrl(site) + "/");
      await expect(bar(page)).toHaveCount(0);
      await expect(page.locator("[data-consent-open]")).toHaveCount(0);
      const state = await page.evaluate(() => ({
        api: typeof window.analyticsConsent,
        loader: document.querySelectorAll('head script[src*="googletagmanager.com/gtag/js"]').length,
      }));
      expect(state.api).toBe("undefined");
      expect(state.loader).toBe(1);
    });
  }
});
