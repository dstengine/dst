// The two facts the network decides in one place each: whether an event is
// over, and whether it is free. Both used to be inlined at the point of
// use, and both were wrong somewhere as a result — a nine-day Broadway
// promotion filed under "Past" while it ran, and the word "free" taken off
// prose that meant a members' discount.
//
// These are unit tests over the predicates rather than over the pages: the
// pages are date-dependent and would pass or fail with the calendar, which
// is the one thing a regression test must not do.
import { test, describe } from "node:test";
import assert from "node:assert/strict";

const { lastDay, hasEnded, isOn } = await import("../packages/content/src/when.ts");
const { isFree } = await import("../packages/content/src/admission.ts");

const TODAY = "2026-09-12";

describe("when an event is over", () => {
  test("a run that started before today and ends after it is on", () => {
    const running = { start: "2026-09-08", end: "2026-09-20" };
    assert.equal(isOn(running, TODAY), true);
    assert.equal(hasEnded(running, TODAY), false);
  });

  test("a one-day event is on for the whole of its day", () => {
    assert.equal(isOn({ start: TODAY }, TODAY), true);
    assert.equal(hasEnded({ start: "2026-09-11" }, TODAY), true);
  });

  test("a run is over the day after its last one", () => {
    assert.equal(hasEnded({ start: "2026-09-01", end: "2026-09-11" }, TODAY), true);
    assert.equal(hasEnded({ start: "2026-09-01", end: TODAY }, TODAY), false);
  });

  test("no end date means the last day is the first", () => {
    assert.equal(lastDay({ start: "2026-10-24" }), "2026-10-24");
    assert.equal(lastDay({ start: "2026-10-24", end: "2026-11-01" }), "2026-11-01");
  });

  test("hasEnded and isOn are complements", () => {
    for (const e of [
      { start: "2026-01-01" },
      { start: "2027-01-01" },
      { start: "2026-09-01", end: "2026-09-30" },
      { start: TODAY, end: TODAY },
    ]) {
      assert.notEqual(isOn(e, TODAY), hasEnded(e, TODAY));
    }
  });
});

describe("what counts as free", () => {
  test("no price recorded is not free, it is unpriced", () => {
    assert.equal(isFree({}), false);
    assert.equal(isFree({ tickets: { currency: "GBP" } }), false);
  });

  test("free is a recorded zero", () => {
    assert.equal(isFree({ tickets: { priceFrom: 0, currency: "GBP" } }), true);
    assert.equal(isFree({ tickets: { priceFrom: 0, priceTo: 0, currency: "GBP" } }), true);
  });

  test("a free tier on a paid event is not a free event", () => {
    assert.equal(isFree({ tickets: { priceFrom: 0, priceTo: 90, currency: "GBP" } }), false);
  });

  test("any charge at all is not free", () => {
    assert.equal(isFree({ tickets: { priceFrom: 5.5, priceTo: 17.6, currency: "GBP" } }), false);
  });
});

// There is deliberately no test here that an entry marked free says the
// word somewhere in its copy. It was written, and it failed on fourteen
// entries that are all correctly marked: a Solana community call is free
// without a sentence saying so, and the Spanish sites write "entrada
// libre" while the Austrian ones write "Eintritt frei". A test that reads
// prose to check a field is the same mistake `isFree` exists to prevent,
// pointed the other way.
