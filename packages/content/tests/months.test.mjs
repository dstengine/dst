import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { buildMonths, inMonth, monthBounds, monthOf, monthHref } from "../src/months.ts";
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

  test("monthHref joins base and key", () => {
    assert.equal(monthHref("2026-11", "/am/calendar/"), "/am/calendar/2026-11/");
  });
});
