import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { buildMonths, inMonth, monthBounds, monthOf, monthHref, nextMonth } from "../src/months.ts";
import { ENOUGH_TAG } from "../src/sections.ts";

const event = (over) => ({ slug: "s", site: "x", title: "t", summary: "s", start: "2026-11-01", ...over });
const today = "2026-11-10";

describe("monthBounds and inMonth", () => {
  test("bounds know February and December", () => {
    assert.deepEqual(monthBounds("2028-02"), { first: "2028-02-01", last: "2028-02-29" });
    assert.deepEqual(monthBounds("2026-12"), { first: "2026-12-01", last: "2026-12-31" });
    assert.equal(monthOf("2026-11-14"), "2026-11");
  });

  test("a run is in every month it touches, a one-day event only in its own", () => {
    const run = { start: "2026-09-20", end: "2026-12-03" };
    assert.equal(inMonth(run, "2026-08"), false);
    assert.equal(inMonth(run, "2026-09"), true);
    assert.equal(inMonth(run, "2026-11"), true);
    assert.equal(inMonth(run, "2026-12"), true);
    assert.equal(inMonth(run, "2027-01"), false);
    assert.equal(inMonth({ start: "2026-11-30" }, "2026-12"), false);
  });

  test("a run that lists its nights is in the months it has a night in, and no other", () => {
    // Carmen at the Opera: four nights from October to February, none in December.
    const carmen = { start: "2026-10-10", end: "2027-02-06", dates: ["2026-10-10", "2026-11-14", "2027-01-10", "2027-02-06"] };
    assert.equal(inMonth(carmen, "2026-11"), true);
    assert.equal(inMonth(carmen, "2026-12"), false);
    assert.equal(inMonth(carmen, "2027-01"), true);
    assert.equal(inMonth(carmen, "2027-03"), false);
    // The same span without the list is every month it touches, as before.
    assert.equal(inMonth({ start: carmen.start, end: carmen.end }, "2026-12"), true);
  });

  test("nextMonth crosses the year end", () => {
    assert.equal(nextMonth("2026-11"), "2026-12");
    assert.equal(nextMonth("2026-12"), "2027-01");
  });
});

describe("buildMonths", () => {
  test("a month needs ENOUGH_TAG events on for a day of it, counting runs that cross into it", () => {
    const items = [
      event({ slug: "a", start: "2026-11-05" }),
      event({ slug: "b", start: "2026-11-20" }),
      event({ slug: "run", start: "2026-10-28", end: "2026-11-02" }),
      event({ slug: "lone", start: "2026-12-01" }),
    ];
    const out = buildMonths({ items, today });
    console.log(`ENOUGH_TAG=${ENOUGH_TAG}; november holds 3 with the run, october 1, december 1 ->`, out.map((m) => m.key));
    assert.deepEqual(out.map((m) => m.key), ["2026-11"]);
    assert.deepEqual(out[0].items.map((i) => i.slug), ["run", "a", "b"]);
    assert.equal(out[0].year, 2026);
    assert.equal(out[0].month, 11);
  });

  test("months come in calendar order across a year end, and a past month is kept but not ahead", () => {
    const three = (ym) => [1, 2, 3].map((n) => event({ slug: `${ym}-${n}`, start: `${ym}-0${n}` }));
    const out = buildMonths({ items: [...three("2027-01"), ...three("2026-09"), ...three("2026-12")], today });
    assert.deepEqual(out.map((m) => [m.key, m.ahead]), [["2026-09", false], ["2026-12", true], ["2027-01", true]]);
  });

  test("the month today falls in is still ahead until its last day", () => {
    const out = buildMonths({ items: [1, 2, 3].map((n) => event({ slug: `n${n}`, start: `2026-11-0${n}` })), today: "2026-11-30" });
    assert.equal(out[0].ahead, true);
    assert.equal(buildMonths({ items: out[0].items, today: "2026-12-01" })[0].ahead, false);
  });

  test("a listed run gives a page only to the months of its nights, and is counted only there", () => {
    // Turandot: 22 October and 21 February, nothing in between. Read as a
    // span it would make November, December and January pages of their own
    // and sit on each of them.
    const turandot = event({ slug: "turandot", start: "2026-10-22", end: "2027-02-21", startTime: "19:00", dates: ["2026-10-22", "2027-02-21"], times: { "2027-02-21": "18:00" } });
    const out = buildMonths({ items: [turandot], today, min: 1 });
    assert.deepEqual(out.map((m) => m.key), ["2026-10", "2027-02"]);
    const december = [1, 2, 3].map((n) => event({ slug: `dec-${n}`, start: `2026-12-0${n}` }));
    const withDec = buildMonths({ items: [turandot, ...december], today });
    const dec = withDec.find((m) => m.key === "2026-12");
    assert.deepEqual(dec.items.map((i) => i.slug), ["dec-1", "dec-2", "dec-3"]);
  });

  test("monthHref joins base and key", () => {
    assert.equal(monthHref("2026-11", "/am/calendar/"), "/am/calendar/2026-11/");
  });
});
