import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { allNews, newsBySite } from "../src/news/index.ts";
import { allEvents, eventsBySite } from "../src/events/index.ts";
import { runDays, addDays } from "../src/when.ts";
import { CLOCK_ZONES, crossesClockChange } from "../src/ics.ts";

const SITES = ["dst", "llc", "visas", "riviera", "mbr", "palmcentral", "eco"];

const kinds = [
  { label: "news", all: allNews, bySite: newsBySite, dateKey: "date" },
  { label: "events", all: allEvents, bySite: eventsBySite, dateKey: "start" },
];

describe("slug uniqueness and per-site counts", () => {
  for (const { label, bySite } of kinds) {
    test(`${label}: slug is non-empty and unique within each site`, () => {
      const table = {};
      for (const site of SITES) {
        const items = bySite(site);
        table[site] = items.length;
        const seen = new Set();
        for (const item of items) {
          assert.ok(item.slug && item.slug.trim() !== "", `${label}/${site}: item with empty slug — ${JSON.stringify(item.title)}`);
          assert.ok(!seen.has(item.slug), `${label}/${site}: duplicate slug "${item.slug}"`);
          seen.add(item.slug);
        }
      }
      console.log(`${label} site -> count:`, table);
    });
  }
});

describe("dates parse as valid ISO", () => {
  for (const { label, all, dateKey } of kinds) {
    test(`${label}: ${dateKey} parses as a valid date on every item`, () => {
      for (const item of all) {
        const raw = item[dateKey];
        const parsed = new Date(raw);
        assert.ok(!Number.isNaN(parsed.getTime()), `${label}/${item.site}/${item.slug}: "${dateKey}"="${raw}" did not parse — got ${parsed}`);
        console.log(`${label}/${item.site}/${item.slug}: ${dateKey}="${raw}" -> ${parsed.toISOString().slice(0, 10)}`);
        if (item.end) {
          const parsedEnd = new Date(item.end);
          assert.ok(!Number.isNaN(parsedEnd.getTime()), `${label}/${item.site}/${item.slug}: "end"="${item.end}" did not parse`);
        }
        // Compared as a string against today's ISO date, so a timestamp or a
        // loose format would quietly promote for the wrong span.
        if (item.promotedUntil !== undefined) {
          assert.match(item.promotedUntil, /^\d{4}-\d{2}-\d{2}$/, `${label}/${item.site}/${item.slug}: "promotedUntil"="${item.promotedUntil}" is not YYYY-MM-DD`);
          assert.ok(!Number.isNaN(new Date(item.promotedUntil).getTime()), `${label}/${item.site}/${item.slug}: "promotedUntil"="${item.promotedUntil}" did not parse`);
        }
        // The same string comparison, and a story cannot stop being news
        // before it was news: an `until` earlier than `date` is a typo that
        // would keep the item out of every block from the day it went up.
        if (item.until !== undefined) {
          assert.match(item.until, /^\d{4}-\d{2}-\d{2}$/, `${label}/${item.site}/${item.slug}: "until"="${item.until}" is not YYYY-MM-DD`);
          assert.ok(!Number.isNaN(new Date(item.until).getTime()), `${label}/${item.site}/${item.slug}: "until"="${item.until}" did not parse`);
          assert.ok(item.until >= item[dateKey].slice(0, 10), `${label}/${item.site}/${item.slug}: "until"="${item.until}" is before ${dateKey}="${item[dateKey]}"`);
        }
      }
    });
  }
});

// The sitemap is built from these two fields, so an entry without them is
// an entry that cannot be dated — and `lastmod` is the field a crawler
// reads to decide whether to come back. They used to be inferred from git
// history, which meant nothing could be missing and nothing could be
// checked; now they are written down, so both are possible and this is
// where it is caught. `node tools/item-dates.mjs` fills in what history
// knows for an entry that has already been committed.
describe("every entry carries both of its own dates", () => {
  for (const { label, all } of kinds) {
    test(`${label}: createdAt and updatedAt are present, parse, and run the right way round`, () => {
      const now = Date.now();
      let edited = 0;
      for (const item of all) {
        const where = `${label}/${item.site}/${item.slug}`;
        for (const key of ["createdAt", "updatedAt"]) {
          const raw = item[key];
          assert.ok(raw, `${where}: no ${key} — run "node tools/item-dates.mjs"`);
          const parsed = new Date(raw);
          assert.ok(!Number.isNaN(parsed.getTime()), `${where}: ${key}="${raw}" did not parse`);
          // A date in the future is a claim a crawler has no way to act on,
          // and the likeliest cause is a typo in the year.
          assert.ok(parsed.getTime() <= now + 60_000, `${where}: ${key}="${raw}" is in the future`);
        }
        const created = new Date(item.createdAt).getTime();
        const updated = new Date(item.updatedAt).getTime();
        assert.ok(updated >= created, `${where}: updatedAt ${item.updatedAt} precedes createdAt ${item.createdAt}`);
        if (updated > created) edited++;
      }
      console.log(`${label}: ${all.length} entries dated, ${edited} edited since first published`);
    });
  }
});

describe("body presence determines detail pages", () => {
  for (const { label, all } of kinds) {
    test(`${label}: items with/without body are correctly split`, () => {
      const withPage = all.filter((i) => Array.isArray(i.body) && i.body.length > 0).map((i) => `${i.site}/${i.slug}`);
      const withoutPage = all.filter((i) => !(Array.isArray(i.body) && i.body.length > 0)).map((i) => `${i.site}/${i.slug}`);
      console.log(`${label}: gets a detail page ->`, withPage);
      console.log(`${label}: stays list-only (no body) ->`, withoutPage);
      assert.equal(withPage.length + withoutPage.length, all.length, `${label}: split does not account for every item`);
    });
  }
});

describe("source, when present, is well-formed", () => {
  for (const { label, all } of kinds) {
    test(`${label}: source has a non-empty name and a syntactically valid url`, () => {
      const withSource = all.filter((i) => i.source);
      if (withSource.length === 0) {
        console.log(`${label}: no items carry a source field — nothing to check (own-action items don't need one)`);
      }
      for (const item of withSource) {
        assert.ok(item.source.name && item.source.name.trim() !== "", `${label}/${item.site}/${item.slug}: source.name is empty`);
        // `url` is optional by design: some things worth publishing have no
        // address to point at, and `name` alone carries the rule the URL
        // stood in for. Only a url that is there has to parse.
        if (item.source.url !== undefined) {
          assert.doesNotThrow(() => new URL(item.source.url), `${label}/${item.site}/${item.slug}: source.url "${item.source.url}" is not a valid URL`);
        }
        console.log(`${label}/${item.site}/${item.slug}: source="${item.source.name}" url="${item.source.url}"`);
      }
    });
  }
});

describe("geo, when present, is in range", () => {
  for (const { label, all } of kinds) {
    test(`${label}: geo.lat is in [-90,90] and geo.lng is in [-180,180]`, () => {
      const withGeo = all.filter((i) => i.geo);
      for (const item of withGeo) {
        assert.ok(item.geo.lat >= -90 && item.geo.lat <= 90, `${label}/${item.site}/${item.slug}: geo.lat=${item.geo.lat} out of range`);
        assert.ok(item.geo.lng >= -180 && item.geo.lng <= 180, `${label}/${item.site}/${item.slug}: geo.lng=${item.geo.lng} out of range`);
        console.log(`${label}/${item.site}/${item.slug}: geo=(${item.geo.lat}, ${item.geo.lng})`);
      }
      if (withGeo.length === 0) console.log(`${label}: no items carry geo`);
    });
  }
});

describe("image, when present, has a non-empty imageAlt", () => {
  for (const { label, all } of kinds) {
    test(`${label}: every image has alt text`, () => {
      const withImage = all.filter((i) => i.image);
      for (const item of withImage) {
        assert.ok(item.imageAlt && item.imageAlt.trim() !== "", `${label}/${item.site}/${item.slug}: image="${item.image}" has no imageAlt`);
        console.log(`${label}/${item.site}/${item.slug}: image="${item.image}" imageAlt="${item.imageAlt}"`);
      }
      if (withImage.length === 0) console.log(`${label}: no items carry an image`);
    });
  }
});

describe("related card images carry alt text", () => {
  for (const { label, all } of kinds) {
    test(`${label}: every related card image has a non-empty imageAlt`, () => {
      for (const item of all) {
        for (const card of item.related ?? []) {
          if (!card.image) continue;
          assert.ok(card.imageAlt && card.imageAlt.trim() !== "", `${label}/${item.site}/${item.slug}: related "${card.title}" has image="${card.image}" but no imageAlt`);
        }
      }
    });
  }
});

describe("related cards never point outside the site (eco: only eco or dst.llc)", () => {
  for (const { label, all } of kinds) {
    test(`${label}: related[].href stays in-network per site's linking rule`, () => {
      for (const item of all) {
        for (const card of item.related ?? []) {
          const where = `${label}/${item.site}/${item.slug} -> related "${card.title}" (${card.href})`;
          if (item.site === "eco") {
            const isEcoInternal = card.href.startsWith("/");
            const isDstLlc = /^https:\/\/(www\.)?dst\.llc(\/|$)/.test(card.href);
            assert.ok(isEcoInternal || isDstLlc, `${where}: eco related cards may only link into eco itself or to dst.llc`);
          } else {
            assert.ok(card.href.startsWith("/"), `${where}: related card must stay site-internal (relative href)`);
          }
        }
      }
    });
  }
});

describe("ticketing facts", () => {
  test("a price range runs low to high, in a real currency", () => {
    for (const item of allEvents) {
      const t = item.tickets;
      if (!t) continue;
      const where = `events/${item.site}/${item.slug}`;
      if (t.priceFrom !== undefined) {
        assert.ok(Number.isFinite(t.priceFrom) && t.priceFrom >= 0, `${where}: priceFrom=${t.priceFrom}`);
      }
      if (t.priceFrom !== undefined && t.priceTo !== undefined) {
        assert.ok(t.priceTo >= t.priceFrom, `${where}: priceTo ${t.priceTo} is below priceFrom ${t.priceFrom}`);
      }
      if (t.currency !== undefined) {
        assert.match(t.currency, /^[A-Z]{3}$/, `${where}: currency "${t.currency}" is not an ISO 4217 code`);
      }
      console.log(`${where}: ${t.priceFrom ?? "?"}–${t.priceTo ?? "?"} ${t.currency ?? "AED"}`);
    }
  });

  test("sales close on or before the event starts", () => {
    for (const item of allEvents) {
      const salesEnd = item.tickets?.salesEnd;
      if (!salesEnd) continue;
      const where = `events/${item.site}/${item.slug}`;
      assert.ok(!Number.isNaN(new Date(salesEnd).getTime()), `${where}: salesEnd "${salesEnd}" did not parse`);
      assert.ok(salesEnd <= item.start, `${where}: sales close ${salesEnd}, after the event starts ${item.start}`);
      console.log(`${where}: sales close ${salesEnd}, event starts ${item.start}`);
    }
  });

  test("a priced event has somewhere to buy from", () => {
    for (const item of allEvents) {
      const { priceFrom, priceTo } = item.tickets ?? {};
      if (priceFrom === undefined) continue;
      // priceFrom: 0 is how a free event states its price, and a free event
      // has nothing to buy — demanding a seller for one asks for a link that
      // should not exist. A range starting at zero is a different thing: some
      // tier is paid, so there is something to sell.
      if (priceFrom === 0 && priceTo === undefined) continue;
      // A finished event has nothing left to sell. Its page keeps the price as
      // a record of what the evening cost; a live sales link there would go
      // nowhere, so the archive is not asked for one.
      const today = new Date().toISOString().slice(0, 10);
      if ((item.end ?? item.start) < today) continue;
      assert.ok(item.ticket?.url, `events/${item.site}/${item.slug}: has a price but no ticket link`);
    }
  });
});

describe("programme and audience", () => {
  test("every programme track has a heading and a description", () => {
    for (const item of allEvents) {
      for (const [i, track] of (item.programme ?? []).entries()) {
        const where = `events/${item.site}/${item.slug}: programme[${i}]`;
        assert.ok(track.heading?.trim(), `${where}: empty heading`);
        assert.ok(track.text?.trim(), `${where} "${track.heading}": empty text`);
      }
      if (item.programme) console.log(`events/${item.site}/${item.slug}: ${item.programme.length} tracks`);
    }
  });

  test("audience entries are tags, not sentences", () => {
    for (const item of allEvents) {
      for (const who of item.audience ?? []) {
        const where = `events/${item.site}/${item.slug}`;
        assert.ok(who.trim(), `${where}: empty audience entry`);
        // These render inside a pill. Anything sentence-length wraps to two
        // lines and the row stops reading as a row of tags.
        assert.ok(who.length <= 40, `${where}: audience entry too long for a tag — "${who}"`);
        assert.ok(!who.endsWith("."), `${where}: audience entry reads as a sentence — "${who}"`);
      }
      if (item.audience) console.log(`events/${item.site}/${item.slug}: audience ${item.audience.join(", ")}`);
    }
  });
});

describe("translations", () => {
  // A translation carries words and nothing else — see TRANSLATABLE in
  // ../src/types.ts. A price or a date written into it is a second copy of
  // a fact, and the day the entry's own copy is corrected the English page
  // goes on saying the old one.
  test("a translation carries only translatable fields, and a body where the entry has one", async () => {
    const { TRANSLATABLE } = await import("../src/types.ts");
    const allowed = new Set(TRANSLATABLE);
    for (const { label, all } of kinds) {
      for (const item of all) {
        for (const [lang, words] of Object.entries(item.i18n ?? {})) {
          const where = `${label}/${item.site}/${item.slug} [${lang}]`;
          for (const key of Object.keys(words)) {
            assert.ok(allowed.has(key), `${where}: "${key}" is a fact, not a word — keep it on the entry`);
          }
          // Every word the entry has, the translation has too. A field left
          // out is not left blank: localize() falls back to the entry's own,
          // and the English page prints an Armenian headline in its <title>.
          // A name that reads the same in both languages is written twice.
          const untranslated = TRANSLATABLE.filter((key) => item[key] !== undefined && words[key] === undefined);
          assert.deepEqual(untranslated, [], `${where}: no translation for ${untranslated.join(", ")}`);
          assert.ok(words.title?.trim() && words.summary?.trim(), `${where}: a translation needs its own title and summary`);
        }
      }
    }
  });
});

// `dates` and `closedDates` say which days a run actually happens on (see
// EventItem in ../src/types.ts). The calendar file is built from them, so an
// entry that gets them wrong sends a phone the wrong nights — or, worse,
// falls back to one block without anyone noticing.
describe("run days", () => {
  const ISO = /^\d{4}-\d{2}-\d{2}$/;
  const listed = allEvents.filter((e) => e.dates !== undefined || e.closedDates !== undefined);

  test("every listed day is a real date, in order, on a timed span", () => {
    for (const e of listed) {
      const where = `events/${e.site}/${e.slug}`;
      assert.ok(!(e.dates && e.closedDates), `${where}: carries both dates and closedDates — use the shorter list`);
      assert.ok(e.startTime, `${where}: run days need a startTime`);
      assert.ok(e.end && e.end !== e.start, `${where}: run days need an end after the start`);
      const days = e.dates ?? e.closedDates;
      assert.ok(Array.isArray(days) && days.length > 0, `${where}: an empty list`);
      for (const [i, day] of days.entries()) {
        assert.match(day, ISO, `${where}: "${day}" is not YYYY-MM-DD`);
        assert.equal(new Date(`${day}T00:00:00Z`).toISOString().slice(0, 10), day, `${where}: "${day}" is not a calendar day`);
        if (i > 0) assert.ok(day > days[i - 1], `${where}: "${day}" does not come after "${days[i - 1]}"`);
      }
      console.log(`${where}: ${e.dates ? `${days.length} dates` : `${days.length} closed`}`);
    }
  });

  test("`dates` runs from start to end, and not overnight", () => {
    for (const e of listed.filter((x) => x.dates)) {
      const where = `events/${e.site}/${e.slug}`;
      assert.equal(e.dates[0], e.start, `${where}: the first date is not start`);
      assert.equal(e.dates.at(-1), e.end, `${where}: the last date is not end`);
      // An overnight window's `end` is its last morning; with `dates` it
      // would be its last night, and the JSON-LD endDate would close the
      // run before that night began.
      assert.ok(!(e.endTime && e.endTime < e.startTime), `${where}: dates with an overnight window`);
    }
  });

  test("`closedDates` fall strictly inside the run", () => {
    for (const e of listed.filter((x) => x.closedDates)) {
      const where = `events/${e.site}/${e.slug}`;
      const lastNight = e.endTime && e.endTime < e.startTime ? addDays(e.end, -1) : e.end;
      for (const day of e.closedDates) {
        assert.ok(day > e.start && day < lastNight, `${where}: closed "${day}" is not between ${e.start} and ${lastNight}`);
      }
    }
  });

  test("a listed run never falls back to one block across a clock change", () => {
    for (const e of listed) {
      if (!CLOCK_ZONES[e.site]) continue;
      assert.equal(crossesClockChange(e, runDays(e)), false, `events/${e.site}/${e.slug}: crosses a clock change in ${CLOCK_ZONES[e.site]}, so the file would ignore its list`);
    }
  });

  // A site outside CLOCK_ZONES is trusted to have no clock change. sol2go's
  // cities vary, so a run there in Europe or North America across the last
  // Sunday of March or October, or the second Sunday of March or the first
  // of November, would repeat at the wrong hour after the change. Flagged,
  // not failed: the answer is a zone for the site, not a different entry.
  const QUIET = new Set(["+04:00", "+03:00", "-06:00"]);
  const changeDays = (year) => {
    const sunday = (month, nth) => {
      if (nth < 0) {
        const d = new Date(Date.UTC(year, month + 1, 0));
        d.setUTCDate(d.getUTCDate() - d.getUTCDay());
        return d.toISOString().slice(0, 10);
      }
      const d = new Date(Date.UTC(year, month, 1));
      d.setUTCDate(1 + ((7 - d.getUTCDay()) % 7) + 7 * (nth - 1));
      return d.toISOString().slice(0, 10);
    };
    return [sunday(2, -1), sunday(9, -1), sunday(2, 2), sunday(10, 1)];
  };
  const unzonedRisk = (e) => {
    const days = runDays(e);
    if (!days || CLOCK_ZONES[e.site] || QUIET.has(e.utcOffset ?? "+04:00")) return false;
    const [first, last] = [days[0], days.at(-1)];
    const years = new Set([first.slice(0, 4), last.slice(0, 4)].map(Number));
    return [...years].flatMap(changeDays).some((d) => d > first && d <= last);
  };

  test("the clock-change flag knows the change days and fires on them", () => {
    assert.deepEqual(changeDays(2026), ["2026-03-29", "2026-10-25", "2026-03-08", "2026-11-01"]);
    assert.equal(unzonedRisk({ site: "sol2go", start: "2026-10-20", end: "2026-10-30", startTime: "10:00", endTime: "18:00", utcOffset: "+01:00" }), true);
    assert.equal(unzonedRisk({ site: "sol2go", start: "2026-11-01", end: "2026-11-12", startTime: "10:00", endTime: "20:00", utcOffset: "+00:00" }), false);
  });

  test("runs on sites outside CLOCK_ZONES that cross a European or US change are flagged", (t) => {
    const flagged = allEvents.filter(unzonedRisk);
    for (const e of flagged) t.diagnostic(`clock change inside ${e.site}/${e.slug} (${e.start}–${e.end}, ${e.utcOffset}): repeats in UTC; give the site a zone in CLOCK_ZONES`);
    console.log(`${flagged.length} unzoned runs across a clock change`);
  });
});
