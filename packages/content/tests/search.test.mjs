import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { searchRecords } from "../src/search.ts";

const page = ["a paragraph"];
const event = (over) => ({ slug: "s", site: "x", title: "t", summary: "s", start: "2026-11-01", body: page, ...over });
const news = (over) => ({ slug: "s", site: "x", title: "t", summary: "s", date: "2026-11-01", body: page, ...over });
const bases = { eventsBase: "/events/", newsBase: "/news/", today: "2026-11-10" };

describe("searchRecords", () => {
  test("upcoming events soonest first, then gone ones most recent first, then news newest first", () => {
    const out = searchRecords(
      [event({ slug: "dec", start: "2026-12-01" }), event({ slug: "sep", start: "2026-09-01" }), event({ slug: "nov", start: "2026-11-15" }), event({ slug: "oct", start: "2026-10-01" })],
      [news({ slug: "old", date: "2026-10-01" }), news({ slug: "new", date: "2026-11-05" })],
      bases,
    );
    console.log("order:", out.map((r) => r.h));
    assert.deepEqual(out.map((r) => r.h), ["/events/nov/", "/events/dec/", "/events/oct/", "/events/sep/", "/news/new/", "/news/old/"]);
  });

  test("only entries with a page of their own go in", () => {
    const out = searchRecords([event({ slug: "card", body: [] }), event({ slug: "page" })], [news({ slug: "note", body: undefined })], bases);
    assert.deepEqual(out.map((r) => r.h), ["/events/page/"]);
  });

  test("an event record carries where, kind, both dates and the past marker; a news record none of those", () => {
    const [gone, item] = searchRecords(
      [event({ slug: "fest", start: "2026-10-01", end: "2026-10-03", venue: "Tonelab", city: "Yerevan", category: "music" })],
      [news({ slug: "n", category: "city" })],
      bases,
    );
    assert.deepEqual(gone, { h: "/events/fest/", t: "t", s: "s", w: "Tonelab · Yerevan", c: "music", d: "2026-10-01", x: "2026-10-03", e: 1, p: 1 });
    assert.deepEqual(item, { h: "/news/n/", t: "t", s: "s", c: "city", d: "2026-11-01" });
  });

  test("with a formatter, each record carries its dates as the site prints them; without one, none", () => {
    const format = (iso) => `[${iso}]`;
    const [run, one, item] = searchRecords(
      [event({ slug: "run", start: "2026-11-20", end: "2026-12-06" }), event({ slug: "one", start: "2026-11-21", end: "2026-11-21" })],
      [news({ slug: "n", date: "2026-11-02" })],
      { ...bases, format },
    );
    assert.equal(run.dl, "[2026-11-20]");
    assert.equal(run.xl, "[2026-12-06]");
    assert.equal(one.dl, "[2026-11-21]");
    assert.equal(one.xl, undefined);
    assert.equal(item.dl, "[2026-11-02]");
    const [plain] = searchRecords([event({ slug: "run", start: "2026-11-20", end: "2026-12-06" })], [], bases);
    assert.equal("dl" in plain || "xl" in plain, false);
  });

  test("a one-day event has no end, a venue-less one no where, and a long summary is cut to a line", () => {
    const [r] = searchRecords([event({ slug: "one", start: "2026-11-20", end: "2026-11-20", summary: "x".repeat(200) })], [], bases);
    assert.equal(r.x, undefined);
    assert.equal(r.w, undefined);
    assert.equal(r.p, undefined);
    assert.equal(r.s.length, 160);
    assert.ok(r.s.endsWith("…"));
  });
});
