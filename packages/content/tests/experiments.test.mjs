import { test, describe } from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { EXPERIMENTS, liveExperiments, bucket, variantOf, fnv1a, BUCKET_JS } from "../src/experiments.ts";
import { HOSTS as APP_HOSTS } from "../../../tools/hosts.mjs";
import { hookTitle, hookDescription, eventMeta } from "../../ui/src/meta.ts";

const exp = (over) => ({
  id: "t",
  unit: "visitor",
  hosts: ["a.test"],
  variants: ["a", "b", "c"],
  start: "2026-01-01",
  hypothesis: "h",
  metric: "m",
  ...over,
});

describe("the registry", () => {
  // An id and a variant are an HTML attribute name, a CSS selector and a
  // GA4 parameter value; anything outside this set breaks one of the three.
  const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  // Every host an app of ours serves — the one list tools/lastmod.mjs and
  // tools/pipeline.mjs read, so a site launched there is ours here too.
  const HOSTS = new Set(Object.values(APP_HOSTS));

  for (const e of EXPERIMENTS) {
    test(`${e.id} is well-formed`, () => {
      assert.match(e.id, NAME, "id");
      assert.ok(e.id.length <= 32, "id is short enough for a GA4 value with its variant");
      assert.ok(e.variants.length >= 2, "at least a control and one variant");
      for (const v of e.variants) assert.match(v, NAME, `variant ${v}`);
      assert.equal(new Set(e.variants).size, e.variants.length, "variants are unique");
      if (e.weights) {
        assert.equal(e.weights.length, e.variants.length, "one weight per variant");
        assert.ok(e.weights.every((w) => w > 0), "weights are positive");
      }
      assert.match(e.start, /^\d{4}-\d{2}-\d{2}$/, "start is a date");
      if (e.end) assert.ok(e.end > e.start, "end is after start");
      if (e.winner) assert.ok(e.variants.includes(e.winner), "the winner is one of the variants");
      assert.ok(e.hosts.length > 0 && e.hosts.every((h) => HOSTS.has(h)), `hosts are ours: ${e.hosts}`);
      if (e.paths) assert.doesNotThrow(() => new RegExp(e.paths), "paths is a valid RegExp");
      assert.ok(e.hypothesis.length > 40, "the hypothesis is written down before the numbers arrive");
      assert.ok(e.metric.trim(), "the metric is named");
      if (e.unit === "visitor") {
        assert.match(e.goal?.event ?? "", /^[a-z_]+$/, "a visitor test names its GA4 goal event");
        if (e.goal.match) assert.doesNotThrow(() => new RegExp(e.goal.match), "goal.match is a valid RegExp");
        assert.equal(Boolean(e.goal.param), Boolean(e.goal.match), "goal.param and goal.match come together");
      }
      if (e.lift !== undefined) assert.ok(e.lift > 0, "lift is a positive fraction");
      if (e.sample !== undefined) assert.ok(Number.isInteger(e.sample) && e.sample > 0, "sample is a count per arm");
      if (e.decideBy) assert.ok(e.decideBy > e.start, "decideBy is after start");
      // Every test launched since /ab exists carries its whole rule.
      if (e.start > "2026-10-25") {
        assert.ok(e.lift && e.sample && e.decideBy, "lift, sample and decideBy are fixed before launch");
      }
    });
  }

  test("ids are unique", () => {
    const ids = EXPERIMENTS.map((e) => e.id);
    assert.equal(new Set(ids).size, ids.length);
  });
});

describe("liveExperiments", () => {
  const all = [
    exp({ id: "running" }),
    exp({ id: "future", start: "2026-06-01" }),
    exp({ id: "ended", end: "2026-03-01" }),
    exp({ id: "decided", winner: "b" }),
    exp({ id: "elsewhere", hosts: ["b.test"] }),
    exp({ id: "events-only", paths: "^/(?:am/)?events/[^/]+/$" }),
  ];
  const live = (path, today) => liveExperiments("a.test", path, today, all).map((e) => e.id);

  test("runs from start, stops on end, and not once decided or on another host", () => {
    assert.deepEqual(live("/", "2026-02-01"), ["running", "ended"]);
    assert.deepEqual(live("/", "2026-03-01"), ["running"], "end is the first day it no longer runs");
    assert.deepEqual(live("/", "2026-06-01"), ["running", "future"]);
  });

  test("keeps to its paths, in every language", () => {
    assert.deepEqual(live("/events/x/", "2026-02-01"), ["running", "ended", "events-only"]);
    assert.deepEqual(live("/am/events/x/", "2026-02-01"), ["running", "ended", "events-only"]);
    assert.ok(!live("/events/", "2026-02-01").includes("events-only"), "not the index");
  });
});

describe("bucket", () => {
  const e = exp({ id: "spread" });
  const keys = Array.from({ length: 30000 }, (_, i) => `visitor-${i}-${(i * 2654435761) >>> 0}`);

  test("is deterministic", () => {
    for (const k of keys.slice(0, 100)) assert.equal(bucket(e, k), bucket(e, k));
  });

  test("splits evenly when unweighted", () => {
    const counts = Object.fromEntries(e.variants.map((v) => [v, 0]));
    for (const k of keys) counts[bucket(e, k)]++;
    for (const v of e.variants) {
      const share = counts[v] / keys.length;
      assert.ok(Math.abs(share - 1 / 3) < 0.02, `${v}: ${(share * 100).toFixed(1)}% of visitors`);
    }
  });

  test("follows the weights", () => {
    const w = exp({ id: "weighted", variants: ["a", "b"], weights: [9, 1] });
    const b = keys.filter((k) => bucket(w, k) === "b").length / keys.length;
    assert.ok(Math.abs(b - 0.1) < 0.015, `b: ${(b * 100).toFixed(1)}%`);
  });

  test("puts one key in different groups for different tests", () => {
    // Otherwise the control of one test is the control of every test, and
    // two tests running at once measure each other.
    const other = exp({ id: "another" });
    const same = keys.slice(0, 3000).filter((k) => bucket(e, k) === bucket(other, k)).length / 3000;
    assert.ok(same < 0.4, `${(same * 100).toFixed(1)}% agree; independent would be about 33%`);
  });

  test("the browser's copy gives the same answers", () => {
    const ctx = {};
    vm.runInNewContext(`${BUCKET_JS}; this.bucket = bucket;`, ctx);
    for (const t of [e, exp({ id: "weighted", variants: ["a", "b"], weights: [9, 1] })]) {
      for (const k of keys.slice(0, 2000)) {
        assert.equal(ctx.bucket(t.id, t.variants, t.weights ?? null, k), bucket(t, k), `${t.id}/${k}`);
      }
    }
  });

  test("fnv1a matches the published 32-bit test vectors", () => {
    assert.equal(fnv1a(""), 0x811c9dc5);
    assert.equal(fnv1a("a"), 0xe40c292c);
    assert.equal(fnv1a("foobar"), 0xbf9cf968);
  });
});

describe("variantOf", () => {
  test("the winner once decided, the control outside the dates, the bucket in between", () => {
    const e = exp({ id: "page", unit: "page", end: "2026-06-01" });
    assert.equal(variantOf({ ...e, winner: "c" }, "k", "2026-02-01"), "c");
    assert.equal(variantOf(e, "k", "2025-12-31"), "a");
    assert.equal(variantOf(e, "k", "2026-06-01"), "a");
    assert.equal(variantOf(e, "k", "2026-02-01"), bucket(e, "k"));
  });
});

describe("meta-hook titles", () => {
  // The hook is built in @dst/ui/meta; what it may never do is give two
  // pages of one site the same title.
  const tick = { lang: "en-GB", titleSuffix: "Yerevan", keyword: "Yerevan" };
  // The City Day stages are free, and free is a price: the words keep it.
  const stage = (slug, titleSeo, start = "2026-10-10") => ({ slug, title: titleSeo, titleSeo, summary: "s", start, tickets: { priceFrom: 0 } });
  const rock = stage("rock", "Yerevan City Day: rock concert at Diana Abgar Park");
  const rap = stage("rap", "Yerevan City Day: rap concert at English Park");

  test("cuts a title to its name when the name is the page's own", () => {
    assert.equal(hookTitle(rock.titleSeo, rock, tick), "Yerevan City Day 2026: dates, prices & tips");
  });

  test("keeps the control when another page goes by the same name", () => {
    assert.equal(hookTitle(rock.titleSeo, rock, tick, [rap]), undefined);
  });

  test("another year's edition is another name", () => {
    assert.equal(hookTitle(rock.titleSeo, rock, tick, [stage("rap-2025", rap.titleSeo, "2025-10-11")]), "Yerevan City Day 2026: dates, prices & tips");
  });

  test("eventMeta checks the page against its siblings, not against itself", () => {
    // /events/rock/ on tick.am falls in the hook arm.
    const page = { host: "tick.am", path: "/events/rock/", today: "2026-10-25" };
    assert.equal(eventMeta(rock, tick, page).variant, "hook");
    assert.equal(eventMeta(rock, tick, { ...page, siblings: [rock] }).title, "Yerevan City Day 2026: dates, prices & tips");
    assert.equal(eventMeta(rock, tick, { ...page, siblings: [rock, rap] }).title, rock.titleSeo);
  });
});

describe("meta-hook words and the price", () => {
  // A hook title may only promise what the page shows. The page shows a
  // price when the entry has tickets.priceFrom, so without one the title
  // says dates and tips and nothing about prices — in every language.
  const PRICE_WORDS = /prices|Preise|precios|գներ/u;
  const fwf = { titleSuffix: "Future World Forum Dubai", keyword: "Dubai" };
  const week = { slug: "dubai-future-week-2026", title: "Dubai Future Week 2026", summary: "Dubai Future Week runs 18–21 November 2026 in Dubai.", start: "2026-11-18", end: "2026-11-21", city: "Dubai" };
  const sites = [
    { lang: "en-GB", titleSuffix: "London", keyword: "London" },
    { lang: "en-US", titleSuffix: "New York 42", keyword: "New York" },
    { lang: "de-AT", titleSuffix: "Wien", keyword: "Wien" },
    { lang: "es-MX", titleSuffix: "México", keyword: "México" },
    { lang: "hy-AM", titleSuffix: "Երևան", keyword: "Երևան" },
  ];

  test("an entry with a registration link and no price is not promised prices", () => {
    assert.equal(hookTitle(week.title, week, fwf), "Dubai Future Week 2026: dates & what to know");
  });

  test("no language promises a price the entry does not carry", () => {
    for (const site of sites) {
      const unpriced = hookTitle("Expo", { start: "2026-11-18" }, site);
      const priced = hookTitle("Expo", { start: "2026-11-18", tickets: { priceFrom: 20, currency: "EUR" } }, site);
      assert.ok(unpriced && !PRICE_WORDS.test(unpriced), `${site.lang}: ${unpriced}`);
      assert.ok(priced && PRICE_WORDS.test(priced), `${site.lang}: ${priced}`);
    }
  });

  test("each language's words, long and short", () => {
    const at = (lang, name) => hookTitle(name, { start: "2026-11-18" }, { lang });
    assert.equal(at("de-AT", "Wiener Eistraum"), "Wiener Eistraum 2026: Termine & Wissenswertes");
    assert.equal(at("es-MX", "Carnaval de Mazatlán"), "Carnaval de Mazatlán 2026: fechas y lo que debes saber");
    assert.equal(at("hy-AM", "Համերգ"), "Համերգ 2026: ամսաթվեր, մանրամասներ, խորհուրդներ");
    // 36 characters of name leave room in 60 for "dates & tips" and not
    // for "dates & what to know"; in German, the same for its two.
    const name = "Winter Fair at Greenwich Market Hall";
    assert.equal(at("en-GB", name), `${name} 2026: dates & tips`);
    assert.equal(at("de-AT", name), `${name} 2026: Termine & Tipps`);
  });

  test("a free entry and a priced one keep the prices, and the description says which", () => {
    const free = { ...week, tickets: { priceFrom: 0 } };
    const paid = { ...week, tickets: { priceFrom: 350, currency: "AED" } };
    assert.equal(hookTitle(free.title, free, fwf), "Dubai Future Week 2026: dates, prices & tips");
    assert.equal(hookTitle(paid.title, paid, fwf), "Dubai Future Week 2026: dates, prices & tips");
    assert.match(hookDescription(free, fwf), /\. Free entry\. /);
    assert.match(hookDescription(paid, fwf), /\. Tickets from AED\s?350\. /);
    assert.doesNotMatch(hookDescription(week, fwf), /Free entry|Tickets from/);
  });

  test("eventMeta on a hook-arm page leaves the price out when the entry has none", () => {
    // /events/rock/ on tick.am falls in the hook arm.
    const page = { host: "tick.am", path: "/events/rock/", today: "2026-10-25" };
    const site = { lang: "en-GB", titleSuffix: "Yerevan", keyword: "Yerevan" };
    const meta = eventMeta({ ...week, slug: "rock", title: "Rock concert in Yerevan" }, site, page);
    assert.equal(meta.variant, "hook");
    assert.equal(meta.title, "Rock concert in Yerevan 2026: dates & what to know");
  });
});
