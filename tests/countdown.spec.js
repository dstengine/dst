// What an event card's chip and an event page's "ended" badge say at a
// given moment, in a given time zone: CountdownScript.astro run on fixtures
// written the way FeedCards and EventArticle write them.
//
// It exists because the chip was right only on the day the site was built.
// Between two builds a run that had opened sat under "upcoming" with an
// empty chip, one that had closed still sat under "on now", and the day was
// counted from UTC midnight: on nyc42 the parade's page said "Ended" at
// 20:30 on the night of the parade. The dates are fixed, so nothing here
// goes stale as the events pass, and no site has to be built.
//
//   npx playwright test -c tests/countdown.config.js
//
// COUNTDOWN_SRC runs the same cases against another copy of the script —
// the one at HEAD, say, to see which of them it fails.
import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import path from "node:path";

// __dirname: Playwright compiles specs to CommonJS here (the repo is not "type": "module").
const SRC = process.env.COUNTDOWN_SRC || path.join(__dirname, "..", "packages", "ui", "src", "components", "CountdownScript.astro");
const SCRIPT = readFileSync(SRC, "utf8").match(/<script is:inline>([\s\S]*?)<\/script>/)[1];

// The site's words, as labels.ts has them.
const WORDS = {
  en: { now: "Under way", ended: "Ended" },
  es: { now: "En curso", ended: "Finalizado" },
  de: { now: "Läuft gerade", ended: "Vorbei" },
  hy: { now: "Ընթացքում է", ended: "Ավարտված է" },
};

const attrs = (o) =>
  Object.entries(o)
    .filter(([, v]) => v !== undefined && v !== false)
    .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${v}"`))
    .join("");

// The three chips FeedCards draws, and the two things on an event page.
// `w` is a WORDS set; `gaps` is an entry that lists its days (`dates`).
const plain = (id, date, w, { end, offset, gaps } = {}) =>
  `<p class="feed-meta"><time datetime="${date}">${date}</time><span id="${id}" class="feed-countdown"${attrs({
    "data-countdown": true, datetime: date, "data-end": end, "data-offset": offset,
    "data-now": end && !gaps ? w.now : undefined, "data-ended": end && w.ended,
  })}></span></p>`;
const until = (id, end, w, { offset } = {}) =>
  `<p class="feed-meta"><time datetime="${end.slice(0, 10)}">until ${end.slice(0, 10)}</time><span id="${id}" class="feed-countdown"${attrs({
    "data-countdown": true, "data-end": end, "data-offset": offset, "data-ended": w.ended, hidden: true,
  })}></span></p>`;
const live = (id, start, end, w, { offset, header } = {}) =>
  `<p class="feed-meta"><time datetime="${start.slice(0, 10)}">${start.slice(0, 10)}</time><span id="${id}" class="${header ? "event-article-countdown" : "feed-countdown"}"${attrs({
    "data-countdown-live": true, "data-start": start, "data-end": end, "data-offset": offset,
    "data-now": w.now, "data-ended": header ? undefined : w.ended, hidden: true,
  })}></span></p>`;
const badge = (id, date, w, { end, offset } = {}) =>
  `<span id="${id}" class="event-article-ended"${attrs({ "data-event-ended": true, datetime: date, "data-end": end, "data-offset": offset, hidden: true })}>${w.ended}</span>`;
// musical's run chip and fwf's forum figure: a date, no end, no words.
const bare = (id, date) => `<span id="${id}" class="run-countdown" data-countdown datetime="${date}"></span>`;

/** Load `body` under `lang` with the clock at `at` in `zone`; then each id's text and hidden. */
async function read(browser, { lang, zone, at, body }) {
  const context = await browser.newContext({ timezoneId: zone });
  const page = await context.newPage();
  await page.clock.setFixedTime(new Date(at));
  await page.setContent(`<!doctype html><html lang="${lang}"><body>${body}<script>${SCRIPT}</script></body></html>`);
  const out = await page.evaluate(() => ({
    known: Intl.RelativeTimeFormat.supportedLocalesOf([document.documentElement.lang]).length > 0,
    els: Object.fromEntries([...document.querySelectorAll("[id]")].map((el) => [el.id, { text: el.textContent, hidden: el.hidden }])),
  }));
  await context.close();
  return out;
}

const { en, es, de, hy } = WORDS;
// Each case: a fixture, a clock, and what each element must say. `hidden`
// is checked where it is given. A text of null means "a count, not either
// of the site's words".
const CASES = [
  // 1. A one-day card in New York, the evening before and on the night.
  ...[
    ["1a", "2026-10-30T21:00:00-04:00", "tomorrow", false],
    ["1b", "2026-10-31T20:30:00-04:00", "today", false],
    ["1c", "2026-11-01T00:30:00-04:00", "Ended", false],
  ].map(([id, at, text, hidden]) => ({ id, what: "one-day card, New York", lang: "en-US", zone: "America/New_York", at,
    body: plain("c", "2026-10-31", en, { end: "2026-10-31", offset: "-04:00" }), expect: { c: { text, hidden } } })),

  // 2. A run in Vienna, before, during and after.
  ...[
    ["2a", "2026-10-24T12:00:00+02:00", "morgen"],
    ["2b", "2026-10-28T12:00:00+01:00", "Läuft gerade"],
    ["2c", "2026-11-02T23:30:00+01:00", "Läuft gerade"],
    ["2d", "2026-11-03T00:30:00+01:00", "Vorbei"],
  ].map(([id, at, text]) => ({ id, what: "run, Vienna", lang: "de-AT", zone: "Europe/Vienna", at,
    body: plain("c", "2026-10-25", de, { end: "2026-11-02", offset: "+01:00" }), expect: { c: { text, hidden: false } } })),
  // 2e–f. Kürbisfest's shape: its offset is summer time's, kept after the
  // clocks went back, so its last day ends at 23:00 — an hour early, pinned.
  ...[
    ["2e", "2026-10-26T22:30:00+01:00", "Läuft gerade"],
    ["2f", "2026-10-26T23:30:00+01:00", "Vorbei"],
  ].map(([id, at, text]) => ({ id, what: "run kept at +02:00, Vienna, after the clock change", lang: "de-AT", zone: "Europe/Vienna", at,
    body: plain("c", "2026-10-24", de, { end: "2026-10-26", offset: "+02:00" }), expect: { c: { text, hidden: false } } })),

  // 3. An `until` card never counts, and says "Ended" after its last day.
  ...[
    ["3a", "2026-10-20T12:00:00+01:00", "", true],
    ["3b", "2026-11-01T12:00:00Z", "", true],
    ["3c", "2026-11-02T09:00:00Z", "Ended", false],
  ].map(([id, at, text, hidden]) => ({ id, what: "until card, London", lang: "en-GB", zone: "Europe/London", at,
    body: until("c", "2026-11-01", en, { offset: "+00:00" }), expect: { c: { text, hidden } } })),
  // 3d–e. Eight lnd runs keep BST's +01:00: "Ended" at 23:00 GMT, pinned.
  ...[
    ["3d", "2026-11-01T22:30:00Z", "", true],
    ["3e", "2026-11-01T23:30:00Z", "Ended", false],
  ].map(([id, at, text, hidden]) => ({ id, what: "until card kept at +01:00, London", lang: "en-GB", zone: "Europe/London", at,
    body: until("c", "2026-11-01", en, { offset: "+01:00" }), expect: { c: { text, hidden } } })),

  // 4. A card with hours in Mexico City: the count, then the words.
  ...[
    ["4a", "2026-10-31T18:00:00-06:00", null, false],
    ["4b", "2026-10-31T20:00:00-06:00", "En curso", false],
    ["4c", "2026-10-31T23:30:00-06:00", "Finalizado", false],
  ].map(([id, at, text, hidden]) => ({ id, what: "card with hours, Mexico City", lang: "es-MX", zone: "America/Mexico_City", at,
    body: live("c", "2026-10-31T19:00:00-06:00", "2026-10-31T23:00:00-06:00", es, { offset: "-06:00" }), expect: { c: { text, hidden } } })),
  // 4d–g. Noche de Muertos' shape: a two-day run, on its second night.
  ...[
    ["4d", "2026-10-31T12:00:00-06:00", "mañana"],
    ["4e", "2026-11-01T12:00:00-06:00", "hoy"],
    ["4f", "2026-11-02T19:00:00-06:00", "En curso"],
    ["4g", "2026-11-03T00:30:00-06:00", "Finalizado"],
  ].map(([id, at, text]) => ({ id, what: "two-day run, Mexico City", lang: "es-MX", zone: "America/Mexico_City", at,
    body: plain("c", "2026-11-01", es, { end: "2026-11-02", offset: "-06:00" }), expect: { c: { text, hidden: false } } })),

  // 5. tick's Halloween cards: a start with hours, a bare end, and no
  // data-offset, so the start stamp's offset is the day. A Los Angeles
  // reader gets Yerevan's day too.
  ...[
    ["5a", "Asia/Yerevan", "2026-10-31T23:30:00+04:00", hy.now],
    ["5b", "Asia/Yerevan", "2026-11-01T00:30:00+04:00", hy.ended],
    ["5c", "America/Los_Angeles", "2026-10-31T13:30:00-07:00", hy.ended],
  ].map(([id, zone, at, text]) => ({ id, what: `card with hours and a bare end, Yerevan, read in ${zone}`, lang: "hy-AM", zone, at,
    body: live("c", "2026-10-31T20:00:00+04:00", "2026-10-31", hy), expect: { c: { text, hidden: false } } })),

  // 6. Armenian words stand where Chromium has no Armenian count.
  { id: "6", what: "Armenian run and a card further off, Yerevan", lang: "hy-AM", zone: "Asia/Yerevan", at: "2026-10-31T12:00:00+04:00",
    body: plain("run", "2026-10-30", hy, { end: "2026-11-02", offset: "+04:00" }) + plain("later", "2026-11-05", hy, { end: "2026-11-05", offset: "+04:00" }),
    expect: { run: { text: hy.now, hidden: false }, later: { text: "count-if-known" } } },

  // 7. A chip with no end, as musical and fwf have them: unchanged.
  ...[
    ["7a", "2026-10-25T12:00:00+01:00", ""],
    ["7b", "2026-10-18T12:00:00+01:00", "in 2 days"],
  ].map(([id, at, text]) => ({ id, what: "chip with no end, London", lang: "en-GB", zone: "Europe/London", at,
    body: bare("c", "2026-10-20"), expect: { c: { text, hidden: false } } })),

  // 8. The badge: the event's day when it carries the offset, the
  // reader's without. Never during the parade, never in Madrid's small
  // hours while Michoacán is still on its last night, never in Tokyo
  // before Yerevan's day is out.
  ...[
    ["8a", "America/New_York", "2026-10-31T20:30:00-04:00", "2026-10-31", undefined, true],
    ["8b", "America/New_York", "2026-11-01T00:30:00-04:00", "2026-10-31", undefined, false],
    ["8c", "America/Los_Angeles", "2026-10-31T20:30:00-07:00", "2026-10-31", "-04:00", true],
    ["8d", "Asia/Tokyo", "2026-11-01T04:30:00+09:00", "2026-10-31", "+04:00", true],
    ["8e", "Asia/Tokyo", "2026-11-01T05:30:00+09:00", "2026-10-31", "+04:00", false],
    ["8f", "America/Mexico_City", "2026-11-03T00:30:00-06:00", "2026-11-02", "-06:00", false],
  ].map(([id, zone, at, date, offset, hidden]) => ({ id, what: `badge, read in ${zone}`, lang: "en-US", zone, at,
    body: badge("b", date, en, { offset }), expect: { b: { hidden } } })),
  { id: "8g", what: "badge and a card of the same night, read in Madrid", lang: "es-MX", zone: "Europe/Madrid", at: "2026-11-03T02:00:00+01:00",
    body: badge("b", "2026-11-02", es, { offset: "-06:00" }) + plain("c", "2026-11-01", es, { end: "2026-11-02", offset: "-06:00" }),
    expect: { b: { hidden: true }, c: { text: "En curso", hidden: false } } },

  // 9. No offset at all: the reader's own day, not UTC's.
  { id: "9a", what: "card with no offset, read in Tokyo", lang: "en-US", zone: "Asia/Tokyo", at: "2026-11-01T01:00:00+09:00",
    body: plain("c", "2026-10-31", en, { end: "2026-10-31" }), expect: { c: { text: "Ended", hidden: false } } },
  { id: "9b", what: "card with no offset, read in Los Angeles", lang: "en-US", zone: "America/Los_Angeles", at: "2026-10-31T20:00:00-07:00",
    body: plain("c", "2026-10-31", en, { end: "2026-10-31" }), expect: { c: { text: "today", hidden: false } } },

  // 10. A night past midnight (Crypto After Dark, 19:00–02:00 in Dubai):
  // not "Ended" at midnight on its card or its page.
  ...[
    ["10a", "2026-10-29T23:30:00+04:00", "today", true],
    ["10b", "2026-10-30T00:30:00+04:00", "Under way", true],
    ["10c", "2026-10-30T02:30:00+04:00", "Ended", false],
  ].map(([id, at, text, badgeHidden]) => ({ id, what: "night past midnight, Dubai", lang: "en-US", zone: "Asia/Dubai", at,
    body: plain("c", "2026-10-29", en, { end: "2026-10-30T02:00:00+04:00", offset: "+04:00" })
      + badge("b", "2026-10-29", en, { end: "2026-10-30T02:00:00+04:00", offset: "+04:00" }),
    expect: { c: { text, hidden: false }, b: { hidden: badgeHidden } } })),

  // 11. The page header's chip with a date and no hours (sol2go, Buenos
  // Aires, 30–31 Oct): the event's day, not UTC midnight at 21:00.
  ...[
    ["11a", "2026-10-29T21:30:00-03:00", "tomorrow"],
    ["11b", "2026-10-30T08:00:00-03:00", "Under way"],
    ["11c", "2026-10-31T22:00:00-03:00", "Under way"],
    ["11d", "2026-11-01T00:30:00-03:00", ""],
  ].map(([id, at, text]) => ({ id, what: "page header with a bare start, Buenos Aires", lang: "en-US", zone: "America/Argentina/Buenos_Aires", at,
    body: live("h", "2026-10-30", "2026-10-31", en, { offset: "-03:00", header: true }), expect: { h: { text, hidden: text === "" } } })),

  // 12. nyc42 across the US clock change: four 31 Oct cards, Boo at the
  // Zoo (until 1 Nov) and the Blaze (until 8 Nov), all kept at -04:00.
  ...[
    ["12a", "America/New_York", "2026-11-01T12:00:00-05:00", { c: "Ended", boo: "", blaze: "" }],
    ["12b", "America/New_York", "2026-11-01T22:30:00-05:00", { boo: "" }],
    ["12c", "America/New_York", "2026-11-01T23:30:00-05:00", { boo: "Ended" }],
    ["12d", "America/New_York", "2026-11-02T12:00:00-05:00", { boo: "Ended", blaze: "" }],
    ["12e", "America/New_York", "2026-11-09T12:00:00-05:00", { blaze: "Ended" }],
    ["12f", "America/Los_Angeles", "2026-10-31T20:30:00-07:00", { c: "today", boo: "", blaze: "" }],
  ].map(([id, zone, at, want]) => ({ id, what: `nyc42 Halloween, read in ${zone}`, lang: "en-US", zone, at,
    body: plain("c", "2026-10-31", en, { end: "2026-10-31", offset: "-04:00" }) + until("boo", "2026-11-01", en, { offset: "-04:00" })
      + until("blaze", "2026-11-08", en, { offset: "-04:00" }) + badge("b", "2026-10-31", en, { offset: "-04:00" }),
    expect: { ...Object.fromEntries(Object.entries(want).map(([k, text]) => [k, { text, hidden: text === "" }])), ...(id === "12f" ? { b: { hidden: true } } : {}) } })),

  // 13. An entry that lists its nights (Merton, 5 and 7 Nov): no "under
  // way" on the night between.
  ...[
    ["13a", "2026-11-05T12:00:00Z", "today", false],
    ["13b", "2026-11-06T12:00:00Z", "", true],
    ["13c", "2026-11-08T00:30:00Z", "Ended", false],
  ].map(([id, at, text, hidden]) => ({ id, what: "listed nights, London", lang: "en-GB", zone: "Europe/London", at,
    body: plain("c", "2026-11-05", en, { end: "2026-11-07", offset: "+00:00", gaps: true }), expect: { c: { text, hidden } } })),
];

for (const c of CASES) {
  test(`${c.id} ${c.what}, ${c.at}`, async ({ browser }) => {
    const { known, els } = await read(browser, c);
    for (const [id, want] of Object.entries(c.expect)) {
      const got = els[id];
      if (want.text === "count-if-known") {
        // Chromium's headless shell may carry Armenian relative-time data
        // that full Chromium leaves out: the count shows where the browser
        // has it, and is left out where it does not.
        console.log(`  ${c.id}: Armenian relative time ${known ? "present" : "absent"} in this browser`);
        if (known) expect(got.text, `${id}: a count`).not.toBe("");
        else expect(got.text, `${id}: no count without the language`).toBe("");
        continue;
      }
      if (want.text === null) {
        expect(got.text, `${id}: a count`).not.toBe("");
        expect([en.now, en.ended, es.now, es.ended, de.now, de.ended, hy.now, hy.ended], `${id}: a count, not a word`).not.toContain(got.text);
      } else if (want.text !== undefined) {
        expect(got.text, `${id}: text`).toBe(want.text);
      }
      if (want.hidden !== undefined) expect(got.hidden, `${id}: hidden`).toBe(want.hidden);
    }
  });
}

// The glow's relay (FeedCards `data-late`, `data-last`): in the small hours
// an open editor's pick glows; once the last pick has closed, the cards still
// open take it. Halloween night in Yerevan: Forty44 (to 03:00), UFO (to
// 04:00), Mut at Hayfilm (to 09:00, not a pick).
const card = (id, pick, chip) => `<article class="feed-card" id="${id}">${pick ? '<span class="feed-pick">Editors\u2019 choice</span>' : ""}${chip}</article>`;
const NIGHT = (w) =>
  card("forty44", true, live("c1", "2026-10-31T21:00:00+04:00", "2026-11-01T03:00:00+04:00", w, { offset: "+04:00" }))
  + card("ufo", true, live("c2", "2026-10-31T21:30:00+04:00", "2026-11-01T04:00:00+04:00", w, { offset: "+04:00" }))
  + card("mut", false, live("c3", "2026-10-31T23:00:00+04:00", "2026-11-01T09:00:00+04:00", w, { offset: "+04:00" }));
const RELAY = [
  ["23:30", "2026-10-31T23:30:00+04:00", { forty44: [false, false], ufo: [false, false], mut: [false, false] }],
  ["01:00", "2026-11-01T01:00:00+04:00", { forty44: [true, false], ufo: [true, false], mut: [true, false] }],
  ["03:30", "2026-11-01T03:30:00+04:00", { forty44: [false, false], ufo: [true, false], mut: [true, false] }],
  ["04:30", "2026-11-01T04:30:00+04:00", { forty44: [false, false], ufo: [false, false], mut: [true, true] }],
  ["06:30", "2026-11-01T06:30:00+04:00", { forty44: [false, false], ufo: [false, false], mut: [false, false] }],
];
for (const [label, at, want] of RELAY) {
  test(`relay ${label}: late and last marks on Halloween night, Yerevan`, async ({ browser }) => {
    const context = await browser.newContext({ timezoneId: "Asia/Yerevan" });
    const page = await context.newPage();
    await page.clock.setFixedTime(new Date(at));
    await page.setContent(`<!doctype html><html lang="en"><body>${NIGHT(en)}<script>${SCRIPT}</script></body></html>`);
    const got = await page.evaluate(() =>
      Object.fromEntries([...document.querySelectorAll(".feed-card")].map((c) => [c.id, [c.hasAttribute("data-late"), c.hasAttribute("data-last")]])));
    await context.close();
    expect(got).toEqual(want);
  });
}
