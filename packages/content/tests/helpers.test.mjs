import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { newsBySite, latestNews } from "../src/news/index.ts";
import { eventsBySite, upcomingEvents, pastEvents } from "../src/events/index.ts";

const news = (over) => ({ slug: "s", site: "x", title: "t", summary: "s", date: "2026-01-01", ...over });
const event = (over) => ({ slug: "s", site: "x", title: "t", summary: "s", start: "2026-01-01", ...over });

describe("latestNews", () => {
  test("sorts descending by date and slices to n", () => {
    const input = [news({ slug: "a", date: "2026-01-01" }), news({ slug: "b", date: "2026-06-01" }), news({ slug: "c", date: "2026-03-01" })];
    const out = latestNews(input, 2);
    console.log("input dates:", input.map((i) => i.date), "-> output slugs:", out.map((i) => i.slug));
    assert.deepEqual(out.map((i) => i.slug), ["b", "c"], "expected newest-first, capped at 2");
  });

  test("n larger than the array just returns everything, still sorted", () => {
    const input = [news({ slug: "a", date: "2026-02-01" }), news({ slug: "b", date: "2026-05-01" })];
    const out = latestNews(input, 10);
    console.log("input:", input.map((i) => i.slug), "n=10 -> output:", out.map((i) => i.slug));
    assert.deepEqual(out.map((i) => i.slug), ["b", "a"]);
  });
});

describe("newsBySite / eventsBySite", () => {
  test("newsBySite does not leak items across sites", () => {
    const eco = newsBySite("eco");
    const dst = newsBySite("dst");
    console.log("eco slugs:", eco.map((i) => i.slug), "dst slugs:", dst.map((i) => i.slug));
    for (const item of eco) assert.equal(item.site, "eco", `newsBySite("eco") returned an item from site="${item.site}"`);
    for (const item of dst) assert.equal(item.site, "dst", `newsBySite("dst") returned an item from site="${item.site}"`);
  });

  test("an unknown site returns an empty array, not undefined", () => {
    const out = newsBySite("not-a-real-site");
    console.log("newsBySite('not-a-real-site') ->", out);
    assert.deepEqual(out, []);
  });

  test("eventsBySite does not leak items across sites", () => {
    const riviera = eventsBySite("riviera");
    const eco = eventsBySite("eco");
    console.log("riviera slugs:", riviera.map((i) => i.slug), "eco slugs:", eco.map((i) => i.slug));
    for (const item of riviera) assert.equal(item.site, "riviera", `eventsBySite("riviera") returned an item from site="${item.site}"`);
    for (const item of eco) assert.equal(item.site, "eco", `eventsBySite("eco") returned an item from site="${item.site}"`);
  });
});

describe("upcomingEvents / pastEvents", () => {
  const input = [
    event({ slug: "past", start: "2025-01-01" }),
    event({ slug: "soon", start: "2026-06-10" }),
    event({ slug: "today", start: "2026-06-15" }),
    event({ slug: "later", start: "2026-06-20" }),
  ];
  const now = new Date("2026-06-15T00:00:00Z");

  test("upcomingEvents excludes past relative to the injected now, ascending, and includes today", () => {
    const out = upcomingEvents(input, 10, now);
    console.log("now:", now.toISOString(), "input:", input.map((i) => i.start), "-> upcoming:", out.map((i) => i.slug));
    assert.deepEqual(out.map((i) => i.slug), ["today", "later"], "\"today\" (>=now) and \"later\" (2026-06-20) are both >= now (2026-06-15)");
  });

  test("upcomingEvents respects the n cap", () => {
    const bigInput = [
      event({ slug: "a", start: "2026-07-01" }),
      event({ slug: "b", start: "2026-08-01" }),
      event({ slug: "c", start: "2026-09-01" }),
    ];
    const out = upcomingEvents(bigInput, 2, now);
    console.log("n=2 ->", out.map((i) => i.slug));
    assert.equal(out.length, 2, `expected 2 items, got ${out.length}`);
  });

  test("pastEvents excludes upcoming (and today), descending (most recent past first)", () => {
    const out = pastEvents(input, now);
    console.log("now:", now.toISOString(), "-> past:", out.map((i) => i.slug));
    assert.deepEqual(out.map((i) => i.slug), ["soon", "past"]);
  });
});
