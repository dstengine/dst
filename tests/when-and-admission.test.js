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

const { lastDay, hasEnded, isOn, monthOn, cardDay, isRunning, lastNightBy, lastNightIn } = await import("../packages/content/src/when.ts");
const { isFree, ticketAvailability } = await import("../packages/content/src/admission.ts");
const { cardUntil, cardHours, cardCountdown } = await import("../packages/ui/src/date.ts");

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

  // The date on a running event's card: the events index, the front page's
  // block and an event page's "More events" tail all read this one rule.
  test("a running event's card is dated by its last day, and no other card is", () => {
    assert.equal(cardUntil({ start: "2026-09-08", end: "2026-09-20" }, TODAY), "2026-09-20");
    assert.equal(cardUntil({ start: "2026-09-08", end: TODAY }, TODAY), TODAY);
    // One that starts today is still to come: its card counts the hours.
    assert.equal(cardUntil({ start: TODAY, end: "2026-09-20" }, TODAY), undefined);
    assert.equal(cardUntil({ start: "2026-09-20" }, TODAY), undefined);
    assert.equal(cardUntil({ start: "2026-09-01", end: "2026-09-11" }, TODAY), undefined);
    assert.equal(cardUntil({ start: "2026-09-11" }, TODAY), undefined);
  });
});

// The group a card goes in and the day it is dated by, as every listing
// reads them (EventsList, EventsBlock, the tails of an event page and a
// story, tick's section blocks and spotlight): `isRunning` and `cardDay` in
// ../packages/content/src/when.ts. On 6 November 2026 Pagliacci, which
// plays three nights four months apart, read "8 Oct · until 17 Feb" among
// the things on now.
describe("a run that lists its nights", () => {
  // The listing's three groups, from the two predicates the readers use.
  const group = (e, asOf) => (hasEnded(e, asOf) ? "past" : isRunning(e, asOf) ? "running" : "upcoming");
  const pagliacci = {
    start: "2026-10-08",
    end: "2027-02-17",
    dates: ["2026-10-08", "2026-11-17", "2027-02-17"],
    startTime: "19:00",
    times: { "2027-02-17": "18:00" },
    utcOffset: "+04:00",
    displayHours: true,
  };

  test("is upcoming between its nights, dated by the next one at that night's hour", () => {
    const asOf = "2026-11-06";
    assert.equal(group(pagliacci, asOf), "upcoming");
    assert.equal(cardUntil(pagliacci, asOf), undefined);
    const day = cardDay(pagliacci, asOf);
    assert.equal(day, "2026-11-17");
    assert.equal(cardHours(pagliacci, day), "19:00");
    assert.equal(cardCountdown(pagliacci, day).start, "2026-11-17T19:00:00+04:00");
    // The night after that one starts at its own hour (`times`).
    const later = cardDay(pagliacci, "2026-11-18");
    assert.equal(later, "2027-02-17");
    assert.equal(cardHours(pagliacci, later), "18:00");
    assert.equal(cardCountdown(pagliacci, later).start, "2027-02-17T18:00:00+04:00");
  });

  test("on a month page, is dated by its night in that month", () => {
    const carmen = { start: "2026-10-10", end: "2027-02-06", dates: ["2026-10-10", "2026-11-14", "2027-01-10", "2027-02-06"], startTime: "18:00" };
    assert.equal(group(carmen, "2027-01-01"), "upcoming");
    assert.equal(cardDay(carmen, "2027-01-01"), "2027-01-10");
    assert.equal(cardUntil(carmen, "2027-01-01"), undefined);
  });

  test("two nights with a gap between them: the second is next on the gap day, and on itself", () => {
    const fireworks = { start: "2026-11-05", end: "2026-11-07", dates: ["2026-11-05", "2026-11-07"], startTime: "17:15", endTime: "22:00", utcOffset: "+00:00", displayHours: true };
    assert.equal(group(fireworks, "2026-11-06"), "upcoming");
    assert.equal(cardDay(fireworks, "2026-11-06"), "2026-11-07");
    // One night is one day long, so its card shows the whole window.
    assert.equal(cardHours(fireworks, "2026-11-07"), "17:15–22:00");
    assert.equal(cardCountdown(fireworks, "2026-11-07").start, "2026-11-07T17:15:00+00:00");
    assert.equal(group(fireworks, "2026-11-07"), "upcoming");
    assert.equal(cardDay(fireworks, "2026-11-07"), "2026-11-07");
    // Over, it is dated by its first night, as every past card is.
    assert.equal(group(fireworks, "2026-11-08"), "past");
    assert.equal(cardDay(fireworks, "2026-11-08"), "2026-11-05");
  });

  test("a span without dates is unchanged: running, until its last day", () => {
    const swanLake = { start: "2026-10-09", end: "2027-01-30", startTime: "19:00", displayHours: true };
    const asOf = "2026-11-06";
    assert.equal(group(swanLake, asOf), "running");
    assert.equal(cardDay(swanLake, asOf), "2026-10-09");
    assert.equal(cardUntil(swanLake, asOf), "2027-01-30");
    assert.equal(cardHours(swanLake, cardDay(swanLake, asOf)), cardHours(swanLake));
    assert.deepEqual(cardCountdown(swanLake, cardDay(swanLake, asOf)), cardCountdown(swanLake));
    // Before it opens it is to come, dated by its first day.
    assert.equal(group(swanLake, "2026-10-01"), "upcoming");
    assert.equal(cardDay(swanLake, "2026-10-01"), "2026-10-09");
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

// A third fact decided in one place: what the ticket link still sells, in
// schema.org's word for it. Until 25 Oct 2026 every event's offer said
// InStock, a full run and a free cemetery evening among them.
describe("what the ticket link sells", () => {
  const url = "https://example.com/";

  test("no ticket link, no word on stock", () => {
    assert.equal(ticketAvailability({}), undefined);
  });

  test("a seller is in stock", () => {
    assert.equal(ticketAvailability({ ticket: { url } }), "InStock");
  });

  test("an announcement claims nothing", () => {
    assert.equal(ticketAvailability({ ticket: { url, sells: false } }), undefined);
  });

  test("a full list or a sold-out sale is sold out", () => {
    assert.equal(ticketAvailability({ ticket: { url, soldOut: true } }), "SoldOut");
  });

  test("a full run whose link is a waitlist page is sold out, not silent", () => {
    assert.equal(ticketAvailability({ ticket: { url, sells: false, soldOut: true } }), "SoldOut");
  });
});

describe("a list about the days up to a date", () => {
  // Tamar at the Yerevan Opera, read on 6 November: 17 and 18 October, 21 November.
  const tamar = { start: "2026-10-17", end: "2026-11-21", dates: ["2026-10-17", "2026-10-18", "2026-11-21"] };

  test("a run with no night left by the end of the month is done there, dated by its last night in it", () => {
    assert.equal(lastNightBy(tamar, "2026-11-06", "2026-10-31"), "2026-10-18");
  });

  test("a run with a night still ahead in the month is not", () => {
    assert.equal(lastNightBy(tamar, "2026-11-06", "2026-11-30"), undefined);
    assert.equal(lastNightBy(tamar, "2026-10-18", "2026-10-31"), undefined);
  });

  test("once the run is over, its past card on a month's page is dated by its last night in that month", () => {
    assert.equal(lastNightIn(tamar, "2026-11-30"), "2026-11-21");
    assert.equal(lastNightIn(tamar, "2026-10-31"), "2026-10-18");
    assert.equal(lastNightIn(tamar, "2026-10-16"), undefined);
    assert.equal(lastNightIn({ start: "2026-10-01", end: "2027-01-31" }, "2026-10-31"), undefined);
  });

  test("an entry over, or one without listed nights, is left to the other rules", () => {
    assert.equal(lastNightBy(tamar, "2026-11-22", "2026-10-31"), undefined);
    assert.equal(lastNightBy({ start: "2026-10-01", end: "2027-01-31" }, "2026-11-06", "2026-10-31"), undefined);
  });
});

// A section page that says "the November programme" names only what is
// certainly on in November (monthOn in ../packages/content/src/when.ts):
// a run from October to January may have no night this month, and the
// summary must not claim one for it.
describe("the month a list is read in", () => {
  const on = (slug, start, end, dates) => ({ slug, start, ...(end ? { end } : {}), ...(dates ? { dates } : {}) });
  const NOV = "2026-11-06";

  test("names the runs that close this month and the ones that open in it, by date", () => {
    const got = monthOn(
      [
        on("swan-lake", "2026-10-09", "2027-01-30"),
        on("carmen", "2026-10-10", "2026-11-14"),
        on("butterfly", "2026-11-25"),
        on("sasuntsi", "2026-11-07", "2027-01-28"),
        on("turandot", "2026-10-22"),
      ],
      NOV,
    );
    assert.equal(got.month, "2026-11");
    assert.deepEqual(got.certain.map((e) => e.slug), ["sasuntsi", "carmen", "butterfly"]);
  });

  test("a run that lists its nights is in the month it has a night in", () => {
    const got = monthOn([on("gayane", "2026-10-11", "2026-12-16", ["2026-10-11", "2026-11-20", "2026-12-16"])], NOV);
    assert.deepEqual(got.certain.map((e) => e.slug), ["gayane"]);
  });

  test("with nothing running, the month is the next opening's", () => {
    const got = monthOn([on("swan-lake", "2027-01-30"), on("nutcracker", "2026-12-05", "2026-12-31")], NOV);
    assert.equal(got.month, "2026-12");
    assert.deepEqual(got.certain.map((e) => e.slug), ["nutcracker"]);
  });

  test("nothing on, no month", () => {
    assert.equal(monthOn([on("turandot", "2026-10-22")], NOV), undefined);
  });
});

// The /opera-ballet/ section's title, summary and lede on tick.am are read
// off its entries at build time (apps/tick/src/opera.ts), so they have to be
// true on whatever day the site happens to build: a month named with
// nothing left in it, a work named for a month it has no night in, or a
// price floor no named work has would each be a false sentence in a search
// result.
describe("the opera section's own words", async () => {
  const { operaCopy, namesIn, workName, MONTHS, SUMMARY_MAX } = await import("../apps/tick/src/opera.ts");
  const HOUSE = { en: "Spendiaryan Opera and Ballet Theatre, 54 Tumanyan Street", hy: "Սպենդիարյանի անվան օպերայի և բալետի թատրոն" };
  const work = (slug, en, hy, dates, priceFrom) => ({
    slug, start: dates[0], end: dates.at(-1), dates, startTime: "19:00",
    title: en, cardTitle: en, hyTitle: hy, venue: HOUSE.en,
    tickets: { priceFrom, currency: "AMD" },
  });
  const season = [
    work("swan-lake", "Tchaikovsky: Swan Lake", "Չայկովսկի. «Կարապի լիճ»", ["2026-10-09", "2026-11-15", "2026-11-26", "2026-12-10", "2027-02-20"], 5000),
    work("carmen", "Bizet: Carmen", "Բիզե. «Կարմեն»", ["2026-10-10", "2026-11-14", "2027-01-10", "2027-02-06"], 4000),
    work("turandot", "Puccini: Turandot", "Պուչչինի. «Տուրանդոտ»", ["2026-10-22", "2027-02-21"], 3000),
    work("sasuntsi", "Sasuntsi Davit, ballet-oratorio", "«Սասունցի Դավիթ»", ["2026-11-07", "2026-11-28", "2026-12-12"], 5000),
  ];
  const inLang = (lang) => season.map((e) => (lang === "hy" ? { ...e, title: e.hyTitle, cardTitle: e.hyTitle, venue: HOUSE.hy } : e));

  test("names the month of the next night and only the works with a night in it", () => {
    const c = operaCopy(inLang("en"), "en", "2026-11-06");
    assert.equal(c.title, "Opera and ballet in Yerevan: November dates and tickets");
    assert.match(c.description, /^November at the Yerevan Opera: Sasuntsi Davit, Carmen, Swan Lake and more — /);
    assert.doesNotMatch(c.description, /Turandot/);
  });

  test("the price floor is the named works', not the season's", () => {
    // Turandot (3,000) has no November night, so November starts at 4,000.
    assert.match(operaCopy(inLang("en"), "en", "2026-11-06").description, /tickets from 4,000 drams\.$/);
  });

  test("a month with no night left is not named", () => {
    // 30 November: nothing left in November, so the copy is December's.
    const c = operaCopy(inLang("en"), "en", "2026-11-30");
    assert.equal(c.title, "Opera and ballet in Yerevan: December dates and tickets");
    assert.match(c.description, /^December at the Yerevan Opera: Swan Lake, Sasuntsi Davit and more — /);
    // The last week of the year rolls into January.
    assert.match(operaCopy(inLang("en"), "en", "2026-12-26").title, /January dates/);
  });

  test("nothing left, no copy of its own", () => {
    assert.equal(operaCopy(inLang("en"), "en", "2027-02-22"), undefined);
  });

  test("the Armenian copy is in the locative and fits a search result", () => {
    const c = operaCopy(inLang("hy"), "hy", "2026-11-06");
    assert.equal(c.title, "Օպերա և բալետ Երևանում նոյեմբերին․ ամսաթվեր և տոմսեր");
    assert.match(c.description, /^Նոյեմբերին Երևանի օպերային թատրոնում՝ «Սասունցի Դավիթ», «Կարմեն», «Կարապի լիճ» և այլ ներկայացումներ։ Ամսաթվեր և տոմսեր՝ 4000 դրամից։$/);
    assert.match(c.lede, /խաղացանկից՝ նոյեմբերից սկսած/);
  });

  test("every month's copy stays inside the summary and carries the city", () => {
    for (const lang of ["en", "hy"]) {
      for (const day of ["2026-11-06", "2026-11-27", "2026-12-11", "2027-01-05", "2027-02-01", "2027-02-20"]) {
        const c = operaCopy(inLang(lang), lang, day);
        assert.ok([...c.description].length <= SUMMARY_MAX, `${lang} ${day}: ${c.description.length}`);
        assert.ok([...c.title].length <= 60, `${lang} ${day}: ${c.title}`);
        assert.match(`${c.title} ${c.description}`, lang === "hy" ? /Երևան/ : /Yerevan/);
      }
    }
  });

  test("each Armenian month makes its locative and its ablative", () => {
    for (const m of MONTHS.hy) {
      assert.match(m, /ի$/);
      assert.match(`${m}ն`, /ին$/);
      assert.doesNotMatch(`${m.slice(0, -1)}ից`, /իից$/);
    }
  });

  test("a list that runs out of room says it stopped", () => {
    assert.equal(namesIn(["Carmen", "Tosca", "Aida"], false, 100, "en"), "Carmen, Tosca and Aida");
    assert.equal(namesIn(["Carmen", "Tosca", "Aida"], false, 20, "en"), "Carmen and more");
    assert.equal(namesIn(["The Dog and the Cat", "Pagliacci"], false, 100, "en"), "The Dog and the Cat and Pagliacci".replace(" and Pagliacci", ", and Pagliacci"));
    assert.equal(namesIn(["A very long name of a work indeed"], true, 10, "en"), "");
    assert.equal(namesIn(["«Կարմեն»"], true, 100, "hy"), "«Կարմեն» և այլ ներկայացումներ");
  });

  test("a work is named by its own name", () => {
    assert.equal(workName({ title: "Bizet: Carmen" }, "en"), "Carmen");
    assert.equal(workName({ title: "x", cardTitle: "Sasuntsi Davit, ballet-oratorio" }, "en"), "Sasuntsi Davit");
    assert.equal(workName({ title: "Բիզե. «Կարմեն»" }, "hy"), "«Կարմեն»");
    assert.equal(workName({ title: "«Պայացներ» և «Ջանի Սկիկի»" }, "hy"), "«Պայացներ» և «Ջանի Սկիկի»");
  });
});
