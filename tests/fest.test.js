// fest.one's own rules: the ones a guide can break in its data and no other
// suite reads. Every guide is written from a scout's fact sheet, every
// figure on it carries the key of the sheet entry it came from, and each
// entry was read on a day; the cases below hold the copy to those readings,
// to the day its prices stop being true, and to where its links may lead.
// The rest read the built pages: what a reader and a crawler get.
//
//   npm run build:fest && npm run test:fest
//
// No case reaches the network unless FEST_ONLINE=1 is set: a suite that
// needs fest.one to be up would fail for reasons that are not the code's.
// FEST_TODAY=YYYY-MM-DD runs the clock-driven case as of another day.
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

// The app's TypeScript imports its neighbours without an extension, as Vite
// allows and Node does not: retry a relative specifier that fails as
// written with ".ts", the same hook tools/lastmod.mjs registers.
registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (err) {
      if (!specifier.startsWith(".") || path.extname(specifier)) throw err;
      return nextResolve(`${specifier}.ts`, context);
    }
  },
});

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const APP = path.join(REPO, "apps/fest");
const DIST = path.join(APP, "dist");

const { events, guides } = await import("../apps/fest/src/data/events/index.ts");
const copy = await import("../apps/fest/src/copy.ts");
const rules = await import("../apps/fest/src/rules.ts");
const routes = await import("../apps/fest/src/routes.ts");
const { keywords } = await import("../apps/fest/src/site.config.ts");
const { hub } = await import("../apps/fest/src/hub.ts");
const { wordsOf } = await import("../tools/text-dupes.mjs");

const DAY = 86_400_000;
const isoDay = (iso) => iso.slice(0, 10);
const daysBetween = (from, to) => Math.round((Date.parse(to) - Date.parse(from)) / DAY);
const newest = (...dates) => dates.sort((a, b) => Date.parse(b) - Date.parse(a))[0];

/** The day every span has expired by: what a page holds once its prices
    have all come off. */
const END_OF_TIME = "9999-12-31";

/** Every string of a guide that reaches a reader, with the page it is on
    (none for the guide's own blurb, which the hub prints) and the date that
    page claims for itself. */
function strings(guide) {
  const main = rules.mainPage(guide);
  const out = [{ where: `${guide.event}/${guide.slug} hubBlurb`, text: guide.hubBlurb, dated: guide.updatedAt }];
  for (const page of guide.pages) {
    const dated = page === main ? newest(page.updatedAt, guide.updatedAt) : page.updatedAt;
    const at = (field) => `${page.slug} ${field}`;
    const add = (field, text) => text !== undefined && out.push({ where: at(field), text, dated, page });
    add("title", page.title);
    add("description", page.description);
    add("h1", page.h1);
    add("lede", page.lede);
    // The facts at a glance and the page's own jump labels print too
    // (Creamfields Chile's main page), so their tags and words are held to
    // the same rules.
    add("glanceHeading", page.glanceHeading);
    page.glance?.forEach((g, i) => {
      add(`glance.${i}.label`, g.label);
      add(`glance.${i}.value`, g.value);
    });
    // The line under them, and the one under the Sources heading
    // (Primavera Sound São Paulo's): copy like the rest.
    add("glanceNote", page.glanceNote);
    page.jumps?.forEach((j, i) => add(`jumps.${i}`, j.label));
    page.sections.forEach((s) => {
      add(`sections.${s.id}.heading`, s.heading);
      add(`sections.${s.id}`, s.body);
    });
    page.faq.forEach((row, i) => {
      add(`faq.${i}.q`, row.q);
      add(`faq.${i}.a`, row.a);
    });
    add("sourcesNote", page.sourcesNote);
    add("sources", page.sources);
    add("links", page.links);
    add("foot", page.foot);
  }
  return out;
}

const all = guides.flatMap((guide) => {
  const event = rules.eventOf(events, guide);
  return strings(guide).map((s) => ({ ...s, guide, event }));
});

// ------------------------------------------------------------- the data

describe("the copy and its sheet", () => {
  test("every [key] names an entry of the sheet", () => {
    const missing = [];
    for (const { where, text, event } of all)
      for (const key of copy.tags(text)) if (copy.resolve(event.sheet, key) === undefined) missing.push(`${where}: [${key}]`);
    assert.deepEqual(missing, [], "a tag that resolves to nothing cites nothing");
  });

  test("every cited fact has a read date", () => {
    const undated = [];
    for (const { where, text, event } of all)
      for (const key of copy.tags(text))
        if (!copy.isUndated(key) && !copy.readOn(event, key)) undated.push(`${where}: [${key}]`);
    assert.deepEqual(undated, [], "write the reading on the sheet entry, or a readOverrides line with its reason");
  });

  // Measured against the date the page claims, never the clock: a page
  // committed with a fortnight-old reading fails on the day it is
  // committed, and nothing later turns it red. This is what makes "ship by
  // the fourteenth day after the scout read it" a test and not a note.
  test("a reading is at most 14 days older than its page, 42 for prices and fees", () => {
    const stale = [];
    for (const { where, text, dated, event, guide } of all) {
      const outside = new Set(copy.tags(copy.applySpans(text, guide, END_OF_TIME, where)));
      for (const key of copy.tags(text)) {
        if (copy.isUndated(key)) continue;
        const read = copy.readOn(event, key);
        if (!read) continue;
        // A figure that expires in the build has a longer life: its span
        // takes it off the page on the day the guide's `expires` names.
        const limit = key.startsWith("prices") || !outside.has(key) ? 42 : 14;
        const age = daysBetween(read, isoDay(dated));
        if (age > limit) stale.push(`${where}: [${key}] read ${read}, ${age} days before ${isoDay(dated)} (limit ${limit})`);
      }
    }
    assert.deepEqual(stale, [], "re-read these at the source, or do not move the page's updatedAt past them");
  });

  test("a span expires no later than 42 days after the oldest reading inside it", () => {
    const late = [];
    for (const guide of guides) {
      const event = rules.eventOf(events, guide);
      for (const [key, from] of Object.entries(guide.expires)) {
        const reads = strings(guide)
          .flatMap(({ text }) => [...text.matchAll(/\{\{until ([A-Za-z]+)\}\}([\s\S]*?)\{\{\/until\}\}/g)])
          .filter((m) => m[1] === key)
          .flatMap((m) => copy.tags(m[2]))
          .filter((k) => !copy.isUndated(k))
          .map((k) => copy.readOn(event, k))
          .filter(Boolean)
          .sort();
        if (!reads.length) continue;
        const limit = new Date(Date.parse(reads[0]) + 42 * DAY).toISOString().slice(0, 10);
        if (from > limit) late.push(`${guide.event}/${guide.slug}: expires.${key} is ${from}, the oldest reading in its spans is ${reads[0]} (latest allowed ${limit})`);
      }
    }
    assert.deepEqual(late, []);
  });

  // A figure in dollars, reais or baht outside a span would outlive its
  // reading: the build could never take it down. So would one written
  // with its currency code after it, as Mexico writes dollars ("90 USD",
  // Zamna Tulum), which the sign's pattern does not see, or with its sign
  // after it, as Quebec does (« 49,00 $ », « 39 $ », Igloofest).
  test("every price sits in an expiry span", () => {
    const loose = [];
    for (const { where, text, guide } of all) {
      const left = copy.applySpans(text, guide, END_OF_TIME, where);
      const hit = left.match(/[^\s]*\$\s?\d[\d,.]*|\d[\d,]*\s?\$(?!\s?\d)|\d[\d,]*\s?บาท|\d[\d,.]*\s?(?:USD|MXN|BRL|CLP|THB|CAD|EUR)\b/g);
      if (hit) loose.push(`${where}: ${hit.join(", ")}`);
    }
    assert.deepEqual(loose, [], "wrap the sentence in {{until prices}}…{{/until}} (or the key its expiry has)");
  });

  // Clock-driven by design: from the day `expires` names, the build drops
  // the spans, and the page is left with the sentences around them. The
  // take-down commit replaces them; until it is made this stays red, so the
  // routine that runs the suites cannot miss the day.
  test("no span names a key that has expired", () => {
    const day = rules.today();
    const due = [];
    for (const guide of guides) {
      for (const [key, from] of Object.entries(guide.expires)) {
        if (day < from) continue;
        const pages = [...new Set(strings(guide)
          .filter(({ text }) => copy.spanKeys(text).includes(key))
          .map(({ page }) => (page ? `/${page.slug}/` : "the hub blurb")))];
        if (pages.length)
          due.push(
            `${guide.event}/${guide.slug}: {{until ${key}}} expired on ${from}, and its spans are still on ${pages.join(", ")}. ` +
              `Make the take-down commit: the writer's replacement sentences in place of each span, the key out of "expires", ` +
              `updatedAt moved to now on each page it touched (the event's task card, "Read-date limits"). ` +
              `To run the suites as of an earlier day meanwhile: FEST_TODAY=YYYY-MM-DD.`,
          );
      }
    }
    assert.deepEqual(due, []);
  });

  test("routes: no two pages at one address, none on a reserved one", () => {
    assert.doesNotThrow(() => routes.assertRoutesAreUnique());
  });

  test("hub order: the next edition first, ended ones last, most recent first", () => {
    const ev = (slug, start, end) => ({ slug, name: slug, edition: { start, end } });
    const g = (event) => ({ slug: "en", event });
    const evs = [ev("a", "2027-03-01"), ev("b", "2026-12-28", "2027-01-01"), ev("c", "2026-06-01", "2026-06-03"), ev("d", "2026-08-01")];
    const order = rules.hubOrder(evs.map((e) => g(e.slug)), evs, "2026-10-22").map((x) => x.event);
    assert.deepEqual(order, ["b", "a", "d", "c"]);
    // On the edition's last day it is still on, and still first.
    assert.equal(rules.hubOrder([g("b"), g("a")], evs, "2027-01-01")[0].event, "b");
  });

  test("the event's markup drops its prices with the span, and its offers with the edition", () => {
    for (const guide of guides) {
      const event = rules.eventOf(events, guide);
      const main = rules.mainPage(guide);
      if (!guide.expires.prices) continue;
      // The day before the figures come off, or before the first sale an
      // offer names the end of (Wonderfruit's 9 November), whichever comes
      // first: the last day every offer prints.
      const ends = (Array.isArray(event.markup.offers) ? event.markup.offers : []).map((o) => o.priceValidUntil).filter(Boolean);
      const eve = [new Date(Date.parse(guide.expires.prices) - DAY).toISOString().slice(0, 10), ...ends].sort()[0];
      const before = rules.musicEvent(event, guide, main, eve);
      const after = rules.musicEvent(event, guide, main, guide.expires.prices);
      // A list of channels (Primavera Sound São Paulo's) prices only an
      // offer that names a sheet figure, and its stock status perishes with
      // the prices: printed the day before, gone on the day.
      const channels = Array.isArray(event.markup.offers) ? event.markup.offers : undefined;
      before.offers.forEach((o, i) =>
        assert.equal(typeof o.price === "number", channels ? !!channels[i].price : true, "offers carry a price while the reading holds"),
      );
      assert.ok(after.offers?.every((o) => !("price" in o) && !("priceCurrency" in o)) ?? true, "no price once expired");
      if (channels) {
        before.offers.forEach((o, i) =>
          assert.equal(o.availability, channels[i].availability && `https://schema.org/${channels[i].availability}`, "a channel's stock status while the prices hold"),
        );
        assert.ok(after.offers?.every((o) => !("availability" in o)) ?? true, "no stock status once the prices have expired");
      }
      const end = new Date(Date.parse(event.edition.end ?? event.edition.start) + DAY).toISOString().slice(0, 10);
      assert.equal(rules.musicEvent(event, guide, main, end).offers, undefined, "no offers once the edition has ended");
    }
  });

  // An offer whose source names the last day of its sale (Wonderfruit's
  // November Sale, 9 November) prints that day as priceValidUntil, beside
  // the day the sale opened, and is gone the day after; once every offer's
  // sale has ended the event has none (the SEO lead's gate-3 conditions 3
  // and 4 on Wonderfruit: no offer on the 10 November build).
  test("an offer's own end of sale prints, and the offer goes the day after", () => {
    let seen = 0;
    for (const guide of guides) {
      const event = rules.eventOf(events, guide);
      const offers = Array.isArray(event.markup.offers) ? event.markup.offers : [];
      const ends = [...new Set(offers.map((o) => o.priceValidUntil).filter(Boolean))].sort();
      if (!ends.length) continue;
      seen++;
      const main = rules.mainPage(guide);
      const next = (d) => new Date(Date.parse(d) + DAY).toISOString().slice(0, 10);
      for (const until of ends) {
        const on = rules.musicEvent(event, guide, main, until).offers ?? [];
        const ending = on.filter((o) => o.priceValidUntil === until);
        assert.equal(ending.length, offers.filter((o) => o.priceValidUntil === until).length, `${event.slug}: the offers that end on ${until} print that day`);
        for (const o of ending) assert.ok(o.validFrom && typeof o.price === "number", `${event.slug}: an offer with its end of sale has its start and its price`);
        const after = rules.musicEvent(event, guide, main, next(until)).offers ?? [];
        assert.ok(after.every((o) => o.priceValidUntil !== until), `${event.slug}: an offer that ends on ${until} is gone on ${next(until)}`);
      }
      if (offers.every((o) => o.priceValidUntil))
        assert.equal(rules.musicEvent(event, guide, main, next(ends.at(-1))).offers, undefined, `${event.slug}: no offer once every sale has ended`);
    }
    assert.ok(seen > 0, "no guide's offers name an end of sale");
  });

  // Thai lines that state a price, the state of a sale, the gates' hours,
  // a transport or a hotel fact print the day those facts were read: in
  // their own words ("อ่านวันที่ 22 ตุลาคม"), or through {{read}} (the
  // session after Wonderfruit's gate 2, item 4). Every insertion is printed
  // here for the native reader, and each has a day, a month in full and a
  // Gregorian year: a bare th-TH locale prints 2569.
  const READ_CLASS = /^(prices\.|editions\.\d+\.(salesPhases|hours)|transport\.|sellers\.0(\.|$))/;
  const READ_DATED = /อ่านเมื่อ|อ่านวันที่|ณ วันที่|เมื่อ(วันที่)? ?\d{1,2}(–\d{1,2})? (ตุลาคม|กันยายน|พฤศจิกายน)/;
  const THAI_MONTH = /(มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)/;
  test("a Thai line with a price, a sale state, hours or a fare says when it was read", (t) => {
    const bare = [];
    const printed = [];
    for (const { where, text, guide, event, page } of all) {
      if (!guide.lang.startsWith("th")) continue;
      const unspanned = text.replace(/\{\{until \w+\}\}|\{\{\/until\}\}/g, "");
      for (const line of unspanned.split("\n"))
        if (copy.tags(line).some((k) => READ_CLASS.test(k)) && !READ_DATED.test(line) && !line.includes("{{read}}"))
          bare.push(`${where}: ${line.slice(0, 80)}`);
      if (!text.includes("{{read}}")) continue;
      for (const [field, words] of [["title", page?.title], ["description", page?.description], ["h1", page?.h1]])
        assert.ok(!words?.includes("{{read}}"), `${where}: {{read}} in the ${field}`);
      const ctx = { event, guide, page, today: isoDay(guide.createdAt), where };
      const html = copy.inline(text, ctx).replace(/<span class="nowrap">([^<]*)<\/span>/g, "$1").replace(/\u00a0/g, " ");
      for (const m of html.matchAll(/<span class="read">([^<]*)<\/span>/g)) {
        printed.push(`${where}: ${m[1]}`);
        assert.match(m[1], /^อ่านเมื่อ \d{1,2}(–\d{1,2})? /, `${where}: "${m[1]}" opens with its day`);
        assert.match(m[1], THAI_MONTH, `${where}: "${m[1]}" has no month in full`);
        assert.match(m[1], /\b20\d\d$/, `${where}: "${m[1]}" has no Gregorian year`);
      }
    }
    for (const line of printed) t.diagnostic(line);
    assert.deepEqual(bare, [], "date the line in its words, or put {{read}} before its tags");
    for (const guide of guides.filter((g) => g.lang.startsWith("th"))) {
      assert.ok(printed.length > 0, `${guide.event}/${guide.slug}: no {{read}} printed`);
      assert.ok(!guide.hubBlurb.includes("{{read}}"), `${guide.event}/${guide.slug}: {{read}} in the hub's blurb`);
      for (const page of guide.pages) for (const g of page.glance ?? []) assert.ok(!g.value.includes("{{read}}"), `${page.slug}: {{read}} in the glance`);
      const main = rules.mainPage(guide);
      assert.doesNotMatch(JSON.stringify(rules.musicEvent(rules.eventOf(events, guide), guide, main, isoDay(guide.createdAt))), /อ่านเมื่อ/, "no read date in the markup");
    }
  });

  // The glance's "checked on" is the span of the readings behind the main
  // page's own words, not a date written once and left.
  test("a Thai glance's reading date is the span of its page's readings", () => {
    for (const guide of guides.filter((g) => g.lang.startsWith("th"))) {
      const event = rules.eventOf(events, guide);
      const main = rules.mainPage(guide);
      const row = main.glance?.find((g) => g.label === "ตรวจสอบเมื่อ");
      if (!row) continue;
      const days = all
        .filter((s) => s.guide === guide && s.page === main)
        .flatMap((s) => copy.tags(s.text))
        .filter((k) => !copy.isUndated(k))
        .map((k) => copy.readOn(event, k))
        .filter(Boolean)
        .sort();
      const [y1, m1, d1] = days[0].split("-").map(Number);
      const [y2, m2, d2] = days.at(-1).split("-").map(Number);
      const month = (n) => THAI_MONTH.source.slice(1, -1).split("|")[n - 1];
      const want = days[0] === days.at(-1) ? `${d1} ${month(m1)} ${y1}` : y1 === y2 && m1 === m2 ? `${d1}–${d2} ${month(m1)} ${y1}` : `${d1} ${month(m1)} – ${d2} ${month(m2)} ${y2}`;
      assert.equal(row.value.replace(/\u00a0/g, " ").replace(/\u2060/g, ""), want, `${main.slug}: the glance's reading date`);
    }
  });

  // "Sold out" is a fact of one camping tier on the stay page, never of the
  // event: not in a title, a summary, an h1 or a lede, and no offer says it.
  test("a Thai guide says sold out only where the copy does", () => {
    for (const guide of guides.filter((g) => g.lang.startsWith("th"))) {
      for (const page of guide.pages)
        for (const field of ["title", "description", "h1", "lede"])
          assert.doesNotMatch(page[field], /sold out|SoldOut|ขายหมด/i, `${page.slug}: ${field}`);
      const main = rules.mainPage(guide);
      const markup = JSON.stringify(rules.musicEvent(rules.eventOf(events, guide), guide, main, isoDay(guide.createdAt)));
      assert.doesNotMatch(markup, /SoldOut/, `${guide.event}/${guide.slug}: an offer marked sold out`);
    }
  });
});

// ------------------------------------------------------------ the links

/** Hosts no page of the network names: Russian outlets, shops and
    platforms (~/dst rules: no Russian source or link anywhere). */
const RUSSIAN = /(^|\.)(ru|su|xn--p1ai|xn--d1acj3b)$|(^|\.)(vk\.com|ok\.ru|yandex\.[a-z]+|ya\.ru|dzen\.ru|rutube\.ru|mail\.ru)$/;
const hostOf = (url) => new URL(url).hostname.toLowerCase();

/** A hop traces to the sheet entry it was read from, on that entry's own
    host, whole hostname: a source in `sources`; for a maps search, the
    sheet key of the organiser's instruction it follows; for an organiser's
    form the sheet holds as an official seller with its own URL and reading
    (Field Day's MobTix form), that seller's key, "sellers.N" (the fest
    director's gate-3 condition 6). Nothing else is accepted. */
function assertTraced(event, key, go) {
  // A seller's document (Primavera Sound São Paulo's two Drive files): the
  // link the seller's page gives to it, on the sheet, is the hop's URL less
  // its query, and the file is on Drive.
  if (go.kind === "seller-document") {
    const link = copy.resolve(event.sheet, go.source);
    assert.ok(typeof link?.url === "string", `go.${key}: ${go.source} names no link with a url on the sheet`);
    assert.equal(link.url.split("?")[0], go.url, `go.${key}: not the url of ${go.source}, less its query`);
    assert.equal(hostOf(go.url), "drive.google.com", `go.${key}: a seller's document is a Drive file`);
    return;
  }
  if (go.kind === "maps") {
    assert.ok(copy.resolve(event.sheet, go.source) !== undefined, `go.${key}: source "${go.source}" names nothing on the sheet`);
    assert.match(go.url, /^https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=/, `go.${key}: a maps hop is a plain maps search`);
    return;
  }
  if (/^sellers\.\d+$/.test(go.source)) {
    const seller = copy.resolve(event.sheet, go.source);
    assert.ok(seller?.official === true && seller.url && seller.readOn, `go.${key}: ${go.source} is not an official seller with its own url and readOn`);
    assert.equal(hostOf(go.url), hostOf(seller.url), `go.${key}: leads to another host than its seller ${go.source}`);
    return;
  }
  const source = (event.sheet.sources ?? {})[go.source];
  assert.ok(source, `go.${key}: source "${go.source}" is not in the sheet's sources`);
  assert.equal(hostOf(go.url), hostOf(source.url), `go.${key}: leads to another host than its source ${go.source}`);
}

describe("where a guide's links lead", () => {
  const KINDS = ["organiser", "seller", "resale", "venue", "public-body", "press", "seller-document", "maps"];

  for (const event of events) {
    const sources = event.sheet.sources ?? {};
    test(`${event.slug}: every hop is of a known kind and traces to its source`, () => {
      for (const [key, go] of Object.entries(event.go)) {
        assert.ok(KINDS.includes(go.kind), `go.${key}: kind "${go.kind}"`);
        assert.ok(go.title && go.title.trim(), `go.${key}: a hop's anchor needs a title`);
        assertTraced(event, key, go);
      }
    });

    test(`${event.slug}: no Russian host, in the hops or the sources`, () => {
      const urls = [...Object.values(event.go).map((g) => g.url), ...Object.values(sources).map((s) => s.url).filter(Boolean)];
      assert.deepEqual(urls.filter((u) => RUSSIAN.test(hostOf(u))), []);
    });

    // A resale market is linked only when the organiser names it as the
    // official one, in its own pages: rule 5 of the event-page pipeline.
    test(`${event.slug}: a resale hop is the one the organiser names`, () => {
      for (const [key, go] of Object.entries(event.go).filter(([, g]) => g.kind === "resale")) {
        assert.ok(go.namedBy?.length, `go.${key}: a resale hop says which of the organiser's sources name it`);
        for (const s of go.namedBy) assert.equal(sources[s]?.kind, "organiser", `go.${key}: namedBy ${s} is not the organiser's`);
        const seller = (event.sheet.sellers ?? []).find((x) => x.url === go.url);
        assert.ok(seller?.official, `go.${key}: the sheet's sellers do not list ${go.url} as official`);
      }
      if (event.slug === "beyond-the-valley") {
        const resale = Object.values(event.go).filter((g) => g.kind === "resale");
        assert.deepEqual(resale.map((g) => [g.source, g.namedBy]), [["s11", ["s2", "s6"]]], "Tixel, s11, named by s2 and s6, and nothing else");
      }
    });

    test(`${event.slug}: a seller's document is a plain Drive file view`, () => {
      for (const [key, go] of Object.entries(event.go).filter(([, g]) => g.kind === "seller-document"))
        assert.match(go.url, /^https:\/\/drive\.google\.com\/file\/d\/[\w-]+\/view$/, `go.${key}`);
    });
  }

  // The seller branch is the one loosening of the rule, so it is shown to
  // hold on a sheet of its own: the seller's host and no other, and only a
  // seller that is official, with its own URL and reading.
  test("a seller's key traces a hop only to that seller's own host", () => {
    const form = "https://docs.google.com/forms/d/e/fixture/viewform";
    const event = {
      sheet: {
        sources: {},
        sellers: [
          { official: true, url: form, readOn: "2026-10-21" },
          { official: false, url: "https://example.org/", readOn: "2026-10-21" },
          { official: true, url: "https://example.net/" },
        ],
      },
    };
    const hop = (source, url) => ({ kind: "organiser", source, url, title: "fixture" });
    assert.doesNotThrow(() => assertTraced(event, "form", hop("sellers.0", form)));
    assert.throws(() => assertTraced(event, "form", hop("sellers.0", "https://forms.example.com/viewform")), /another host/);
    assert.throws(() => assertTraced(event, "form", hop("sellers.0", "https://www.docs.google.com/forms/")), /another host/);
    assert.throws(() => assertTraced(event, "form", hop("sellers.1", "https://example.org/")), /not an official seller/);
    assert.throws(() => assertTraced(event, "form", hop("sellers.2", "https://example.net/")), /not an official seller/);
    assert.throws(() => assertTraced(event, "form", hop("sellers.9", form)), /not an official seller/);
  });
});

// ------------------------------------------------------- the built site

const built = existsSync(DIST);

/** Every HTML page in dist, by its path: "/beyond-the-valley/tickets/". */
function pages() {
  const out = new Map();
  (function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === "index.html") {
        const rel = path.relative(DIST, path.dirname(full)).split(path.sep).join("/");
        out.set(rel ? `/${rel}/` : "/", readFileSync(full, "utf8"));
      }
    }
  })(DIST);
  return out;
}

// The words a reader sees: tags out, entities back, and the word joiner a
// Thai range carries after its dash (copy.ts, GLUE.th) taken out, as it has
// no width and no sound.
const decode = (s) =>
  s.replace(/<[^>]+>/g, "").replace(/\u2060/g, "").replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

/** The anchors of a page: href, title and the text a reader sees. */
const anchors = (html) =>
  [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((m) => ({
    href: m[1].match(/\shref="([^"]*)"/)?.[1],
    title: m[1].match(/\stitle="([^"]*)"/)?.[1],
    rel: m[1].match(/\srel="([^"]*)"/)?.[1] ?? "",
    // Text a screen reader hears too, the visually hidden part included.
    text: decode(m[2]),
  }));

describe("the built pages", { skip: built ? false : "apps/fest/dist is missing: npm run build:fest first" }, () => {
  const html = built ? pages() : new Map();
  const content = [...html].filter(([p]) => !p.startsWith("/go/"));

  test("the hub and every guide page, and no other content page", () => {
    const expected = ["/festivals/", ...guides.flatMap((g) => g.pages.map((p) => `/${p.slug}/`))].sort();
    assert.deepEqual(content.map(([p]) => p).sort(), expected);
  });

  // fest.one's root is the old festival site's archive, a different site:
  // nothing of ours points at it, so a reader never leaves the guides by
  // tapping the wordmark.
  test('nothing links to the root: no href="/", "https://fest.one/" or "/#"', () => {
    const found = [];
    for (const [p, h] of html)
      for (const bad of ['href="/"', 'href="https://fest.one/"', 'href="/#'])
        if (h.includes(bad)) found.push(`${p}: ${bad}`);
    assert.deepEqual(found, []);
  });

  // A tooltip that reads the label back spends the attribute on nothing
  // (LOCAL.md); it is the rule the shared chrome had to learn for this
  // site: the intermediate crumb, the jump list, the footer link.
  test("no anchor's title is its own text", () => {
    const same = [];
    for (const [p, h] of html)
      for (const a of anchors(h))
        if (a.title !== undefined && decode(a.title).toLowerCase() === a.text.toLowerCase()) same.push(`${p}: "${a.text}" -> ${a.href}`);
    assert.deepEqual(same, []);
  });

  test("every hop out is nofollow and goes through /go/", () => {
    const loose = [];
    for (const [p, h] of content)
      for (const a of anchors(h)) {
        if (!a.href) continue;
        if (a.href.startsWith("/go/") && !/\bnofollow\b/.test(a.rel)) loose.push(`${p}: ${a.href} without rel="nofollow"`);
        if (/^https?:/.test(a.href) && !a.href.startsWith("https://fest.one/")) loose.push(`${p}: ${a.href} links out directly`);
      }
    assert.deepEqual(loose, []);
  });

  test("every page has at least three other pages linking to it", () => {
    const inbound = new Map(content.map(([p]) => [p, new Set()]));
    for (const [from, h] of content)
      for (const a of anchors(h)) {
        const to = a.href?.replace(/^https:\/\/fest\.one/, "").replace(/#.*$/, "");
        if (to && to !== from && inbound.has(to)) inbound.get(to).add(from);
      }
    const thin = [...inbound].filter(([, s]) => s.size < 3).map(([p, s]) => `${p}: ${s.size}`);
    assert.deepEqual(thin, []);
  });

  test("titles: at most 60 code points, with the keyword; a guide's with the event and its year", () => {
    // The SEO lead's ruling on Beyond The Valley's location page (gate 2,
    // note 6): its title is the entity and the venue, and the year that
    // says the venue is current is in its description.
    const YEARLESS = { "/beyond-the-valley/location/": "the place outlives the edition; the year is in the description" };
    const bad = [];
    const routesByPath = new Map(routes.guideRoutes().map((r) => [r.path, r]));
    for (const [p, h] of content) {
      const title = decode(h.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
      const lang = (h.match(/<html\b[^>]*\slang="([^"]*)"/)?.[1] ?? "en").slice(0, 2);
      const keyword = keywords[lang] ?? keywords.en;
      if ([...title].length > 60) bad.push(`${p}: ${[...title].length} code points`);
      if (!title.toLowerCase().includes(keyword.toLowerCase())) bad.push(`${p}: no "${keyword}"`);
      const r = routesByPath.get(p);
      if (!r) continue;
      if (!title.includes(r.event.name)) bad.push(`${p}: no "${r.event.name}"`);
      // The edition's year as its name carries it: the year it starts, or
      // the year it ends where it runs across New Year and the organiser
      // names it by that (Zamna Tulum 2027, from 31 December 2026; the CTO's
      // Z6). No other year.
      const years = [...new Set([r.event.edition.start, r.event.edition.end ?? r.event.edition.start].map((d) => d.slice(0, 4)))];
      const description = decode(h.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
      if (!years.some((y) => title.includes(y) || (YEARLESS[p] && description.includes(y)))) bad.push(`${p}: no ${years.join(" or ")}`);
    }
    assert.deepEqual(bad, []);
    assert.equal(decode(html.get("/festivals/").match(/<title>([\s\S]*?)<\/title>/)[1]), hub.title);
  });

  // The trail a reader sees and the one the BreadcrumbList gives a search
  // engine say the same names in the same order (the CTO's gate-3 item 3
  // on Primavera Sound São Paulo, whose crumbs are the guide's own words).
  test("the visible trail equals the BreadcrumbList names on every guide page", () => {
    const bad = [];
    const graph = (node, into = []) => {
      if (Array.isArray(node)) node.forEach((n) => graph(n, into));
      else if (node && typeof node === "object") {
        if (node["@type"] === "BreadcrumbList") into.push(node);
        Object.values(node).forEach((v) => graph(v, into));
      }
      return into;
    };
    for (const route of routes.guideRoutes()) {
      const h = html.get(route.path) ?? "";
      const nav = h.match(/<nav class="crumbs"[^>]*>([\s\S]*?)<\/nav>/)?.[1] ?? "";
      const seen = [...nav.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map((m) => decode(m[1]));
      const lists = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => graph(JSON.parse(m[1])));
      if (lists.length !== 1) { bad.push(`${route.path}: ${lists.length} BreadcrumbLists`); continue; }
      const named = lists[0].itemListElement.map((i) => i.name);
      if (!seen.length || JSON.stringify(seen) !== JSON.stringify(named)) bad.push(`${route.path}: "${seen.join(" › ")}" against "${named.join(" › ")}"`);
    }
    assert.deepEqual(bad, []);
  });

  test("an id appears once on a page, and a section's is not one the page keeps", () => {
    const twice = [];
    for (const [p, h] of content) {
      const ids = [...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
      ids.filter((id, i) => ids.indexOf(id) !== i).forEach((id) => twice.push(`${p}: #${id}`));
    }
    assert.deepEqual(twice, []);
    for (const g of guides)
      for (const page of g.pages)
        for (const s of page.sections)
          assert.ok(!["questions", "sources", "content", "main"].includes(s.id), `${page.slug}: section id "${s.id}" is the template's`);
  });

  test("the go hops: every one built, none indexable, none in the sitemap", () => {
    const hops = [...html.keys()].filter((p) => p.startsWith("/go/")).sort();
    const expected = events.flatMap((e) => Object.keys(e.go).map((k) => `/go/${e.slug}-${k}/`)).sort();
    assert.deepEqual(hops, expected);
    for (const p of hops) assert.match(html.get(p), /<meta name="robots" content="noindex, ?nofollow"/, p);
    assert.doesNotMatch(readFileSync(path.join(DIST, "sitemap-0.xml"), "utf8"), /\/go\//);
  });

  // The FAQPage markup is read off the page, where a link relative to it
  // points nowhere and a span is not a tag an answer may carry; the answers
  // there are words alone. The accordion on the page keeps both, and says
  // the same words: each answer in the markup equals its accordion answer
  // with the tags taken out.
  test("an FAQPage answer is plain text, and the accordion's words", () => {
    const fold = (s) => s.replace(/\s+/g, " ").trim();
    const bad = [];
    let answers = 0;
    for (const [p, h] of content) {
      const printed = new Map(
        [...h.matchAll(/<details class="faq-item"[^>]*>\s*<summary\b[^>]*>([\s\S]*?)<\/summary>\s*<p\b[^>]*>([\s\S]*?)<\/p>/g)].map((m) => [decode(m[1]), decode(m[2])]),
      );
      for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        const block = JSON.parse(m[1]);
        if (block["@type"] !== "FAQPage") continue;
        for (const q of block.mainEntity) {
          answers++;
          const text = q.acceptedAnswer.text;
          // No "<" at all, and no "[" that opens one of the copy's marks: a
          // [key] tag after a space or a [label](href) link. A bracket inside
          // a word is a quotation's own ("strongly discourage[s]", on Beyond
          // The Valley's tickets page) and stays.
          if (text.includes("<") || /(^|\s)\[[A-Za-z_][\w.]*\]|\[[^\]\n]*\]\(/.test(text))
            bad.push(`${p}: a tag or a mark in the answer to "${q.name}"`);
          // The comparison is of words: decode() folds every space, the no-
          // break ones French typography puts before « : » and inside « 19 h »
          // included, so the markup's text is folded the same way here. The
          // markup keeps its no-break spaces; the typography walk of the
          // French guide reads them there.
          else if (printed.get(fold(q.name)) !== fold(text)) bad.push(`${p}: the answer to "${q.name}" is not the accordion's`);
        }
      }
    }
    assert.ok(answers > 0, "no FAQPage answer was read");
    assert.deepEqual(bad, []);
  });

  // Faq.astro writes the rows not marked generic into FAQPage, and no block
  // at all when every row is: so a page's markup holds exactly its live
  // questions of its own, and a page whose rows are all generic (Field
  // Day's main page, whose six are the FAQ page's in short) holds none.
  test("each page's FAQPage holds its own live questions, and only those", () => {
    const day = rules.today();
    const bad = [];
    for (const guide of guides) {
      const event = rules.eventOf(events, guide);
      for (const page of guide.pages) {
        const p = `/${page.slug}/`;
        const ctx = { event, guide, page, today: day, where: p };
        const own = page.faq.filter((row) => !row.generic && copy.inline(row.a, ctx)).length;
        const blocks = [...(html.get(p) ?? "").matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
          .map((m) => JSON.parse(m[1]))
          .filter((b) => b["@type"] === "FAQPage");
        const got = JSON.stringify(blocks.map((b) => b.mainEntity.length));
        const want = JSON.stringify(own ? [own] : []);
        if (got !== want) bad.push(`${p}: FAQPage question counts ${got}, its own live rows ${want}`);
      }
    }
    assert.deepEqual(bad, []);
  });
});

// ----------------------------------------------------- a Thai guide's pages

describe("a Thai guide's built pages", { skip: built ? false : "apps/fest/dist is missing: npm run build:fest first" }, () => {
  const html = built ? pages() : new Map();
  const content = [...html].filter(([p]) => !p.startsWith("/go/"));
  const thai = ([, h]) => /<html[^>]*\slang="th/.test(h);

  // Its face is preloaded where its letters are, and nowhere else: every
  // other page would fetch 27 kB it never paints.
  test("Noto Sans Thai is preloaded on the Thai pages, and only there", () => {
    const wrong = content
      .filter((e) => /noto-sans-thai-v29-thai\.woff2" as="font"/.test(e[1]) !== thai(e))
      .map(([p]) => p);
    assert.deepEqual(wrong, []);
    assert.ok(content.some(thai), "no Thai page was built");
  });

  // A page of a guide is a page to read: the main text of each Thai page
  // holds at least 400 Thai words, counted as Thai splits them.
  test("each Thai page holds at least 400 words", () => {
    const seg = new Intl.Segmenter("th", { granularity: "word" });
    const short = [];
    for (const [p, h] of content.filter(thai)) {
      const main = /<main\b[^>]*>([\s\S]*?)<\/main>/.exec(h)?.[1] ?? "";
      const text = decode(main.replace(/<script\b[\s\S]*?<\/script>/g, ""));
      const n = [...seg.segment(text)].filter((s) => s.isWordLike).length;
      if (n < 400) short.push(`${p}: ${n} words`);
    }
    assert.deepEqual(short, []);
  });

  // A sum, a time or a date is one token in Thai, where a line breaks at
  // any space: "12,900 | บาท" leaves a figure without its unit. Each one in
  // the main text is in a no-break span or joined by no-break spaces
  // (copy.ts, KEEP_TH and its glue; a heading's keep-date span), never by a
  // plain space, and a range's dash is joined to the figure after it.
  test("a Thai sum, time or date never breaks at its space", () => {
    const split = [];
    const TOKEN = /\d–(?!\u2060)\d|\d[\d,]*(?:–\d[\d,]*)? บาท|\d{1,2}[:.]\d{2} น\.|\d{1,2}(?:–\d{1,2})? (?:มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)/g;
    for (const [p, h] of content.filter(thai)) {
      const main = (/<main\b[^>]*>([\s\S]*?)<\/main>/.exec(h)?.[1] ?? "")
        .replace(/<script\b[\s\S]*?<\/script>/g, "")
        .replace(/<span class="(nowrap|keep-date)">[^<]*<\/span>/g, "");
      for (const run of main.split(/<[^>]*>/))
        for (const m of run.matchAll(TOKEN)) split.push(`${p}: "${m[0]}"`);
    }
    assert.deepEqual(split, []);
  });

  // The button says what the copy says, once, where the copy puts it.
  test("the ticket button is the copy's, once a page", () => {
    const bad = [];
    for (const guide of guides.filter((g) => g.lang.startsWith("th")))
      for (const page of guide.pages) {
        const h = html.get(`/${page.slug}/`) ?? "";
        const buttons = [...h.matchAll(/<a class="button"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => decode(m[1]));
        const want = page.cta ? [page.cta.label] : [];
        if (JSON.stringify(buttons) !== JSON.stringify(want)) bad.push(`/${page.slug}/: ${JSON.stringify(buttons)}, the copy's ${JSON.stringify(want)}`);
      }
    assert.deepEqual(bad, []);
  });

  // Every name a landmark points at is on the page: a FAQ block labelled
  // by its h1 (Wonderfruit's), each section by its heading.
  test("every aria-labelledby names an id on its page", () => {
    const loose = [];
    for (const [p, h] of content) {
      const ids = new Set([...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
      for (const m of h.matchAll(/\saria-labelledby="([^"]+)"/g))
        for (const id of m[1].split(/\s+/)) if (!ids.has(id)) loose.push(`${p}: #${id}`);
    }
    assert.deepEqual(loose, []);
  });
});

// ----------------------------------------------------- scripts and words

/** Text files of the app: its sources and what it builds. */
// ------------------------------------------------------- a French guide

// Igloofest's guide in Quebec French: the OQLF's spaces set by copy.ts
// (oqlf) as the guide is loaded, its night cards, its arrows and the words
// its reviewers held it to (the card's plan 5.5 and 5.9.5; gate 3).
const NB = " ";
const frenchGuides = guides.filter((g) => copy.isFrench(g.lang));

describe("a French guide's copy", () => {
  test("oqlf sets each of the OQLF's spaces, one rule at a time", () => {
    const cases = [
      ["Vraiment ? Oui ! Non ; peut-être.", "Vraiment? Oui! Non; peut-être."],
      ["Billets : prix", `Billets${NB}: prix`],
      ["« Complet »", `«${NB}Complet${NB}»`],
      ["49,00 $ et 12 %", `49,00${NB}$ et 12${NB}%`],
      ["19 h 30, 11 h et 0 h 51", `19${NB}h${NB}30, 11${NB}h et 0${NB}h${NB}51`],
      ["18 000 festivaliers", `18${NB}000 festivaliers`],
      // A whole grouped figure only, never across a date (gate 3, note 6).
      ["au 2 000 2026", `au 2${NB}000 2026`],
      ["35 cm × 15,25 cm", `35${NB}cm × 15,25${NB}cm`],
      ["la 18e édition, le 1er mars", `la 18e${NB}édition, le 1er${NB}mars`],
      ["BUNT. et Steve Aoki", `BUNT.${NB}et Steve Aoki`],
    ];
    for (const [was, now] of cases) assert.equal(copy.oqlf(was), now, was);
  });

  test("oqlf leaves marks, paths, URLs and addresses as they are", () => {
    for (const s of ["[prices[AG]] [editions[Gatineau 2027].note]", "→ /igloofest/billets/", "{{until prices}}", "https://igloofest.ca/fr?a=1", "info@igloofest.ca", "billets.igloofest.ca"])
      assert.equal(copy.oqlf(s), s, s);
    assert.equal(copy.oqlf("[« Passes et billets »](/go/igloofest-billets/)"), `[«${NB}Passes et billets${NB}»](/go/igloofest-billets/)`);
  });

  // The CTO's gate-3 bound (a): a value that is a path, a date or a
  // machine string of the markup never takes a no-break space.
  test("a French guide's machine values are as the data file wrote them", () => {
    for (const guide of frenchGuides) {
      assert.equal(guide.path, "/igloofest/");
      for (const page of guide.pages) {
        assert.doesNotMatch(page.slug, / /);
        for (const a of page.anchors ?? []) assert.doesNotMatch(a.target, / /);
        if (page.markup) assert.doesNotMatch(JSON.stringify({ s: page.markup.startDate, e: page.markup.endDate }), / /);
      }
      const event = rules.eventOf(events, guide);
      assert.doesNotMatch(JSON.stringify(event.markup), / /);
      for (const go of Object.values(event.go)) assert.doesNotMatch(go.url, / /);
    }
  });

  test("a selector names its item by key, and an index by its place", () => {
    const sheet = events.find((e) => e.slug === "igloofest").sheet;
    assert.equal(copy.resolve(sheet, "editions[Gatineau 2027]").start, "2027-02-11");
    assert.equal(copy.resolve(sheet, "editions[Québec 2027].start"), "2027-03-04");
    assert.equal(copy.resolve(sheet, "venues[v1].lat"), 45.5073);
    assert.equal(copy.resolve(sheet, "sellers[0]"), sheet.sellers[0]);
    assert.equal(copy.resolve(sheet, "prices[AG]").amount, 49);
  });

  // Each of the twelve nights reads back as the copy wrote it, and its
  // card holds the line's words and no others, set time first.
  test("a night line parses and reads back, twelve of twelve, and its card says the same", () => {
    let n = 0;
    for (const guide of frenchGuides) {
      const event = rules.eventOf(events, guide);
      for (const page of guide.pages)
        for (const s of page.sections.filter((x) => x.kind === "nights")) {
          const ctx = { event, guide, page, today: rules.today(), where: s.id };
          const cards = copy.blocks(s.body, ctx, s.kind).split("<li><h3>").slice(1).map((c) => c.split("</ul></li></ul>")[0]);
          const lines = s.body.split("\n").filter((l) => l.startsWith("- ")).map((l) => l.slice(2).replace(/(\s+\[[^\]]*(?:\[[^\]]*\][^\]]*)?\])+$/, ""));
          const words = (t) => t.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").match(/[\p{L}\p{N}]+/gu).sort();
          lines.forEach((line, i) => {
            const night = copy.parseNight(line);
            assert.ok(night, `${s.id}: "${line}" is not a night`);
            assert.equal(copy.formatNight(night), line);
            assert.deepEqual(words(cards[i] ?? ""), words(line), `${s.id}: the card of "${night.day}"`);
            n++;
          });
          assert.equal(cards.length, 3, `${s.id}: three cards`);
        }
    }
    assert.equal(n, 12);
  });

  // The arrows: Montréal's row links its own head word (nth 1), and the
  // one group whose sentence names none of its targets prints them after
  // it, the arrows hidden from a screen reader, the Markdown keeping them
  // (the fest director's gate-3 condition 4).
  test("arrows link their phrase, the nth where asked, and the one group shown", () => {
    const guide = frenchGuides[0];
    const event = rules.eventOf(events, guide);
    const day = rules.today();
    const ctxOf = (page) => ({ event, guide, page, today: day, where: page.slug });
    const main = guide.pages.find((p) => p.slug === "igloofest");
    const saison = copy.blocks(main.sections.find((s) => s.id === "saison-2027").body, ctxOf(main));
    assert.match(saison, /^<ul><li><a href="\/igloofest\/montreal\/" title="[^"]+">Montréal<\/a> :/);
    const billets = guide.pages.find((p) => p.slug === "igloofest/billets");
    const s = billets.sections.find((x) => x.id === "gatineau-quebec");
    assert.match(
      copy.blocks(s.body, ctxOf(billets)),
      /sur sa page\. <span class="arrow-links"><span aria-hidden="true">→ <\/span><a href="\/igloofest\/gatineau\/" title="Igloofest Gatineau 2027[^"]*">Gatineau<\/a><span aria-hidden="true"> · <\/span><span aria-hidden="true">→ <\/span><a href="\/igloofest\/quebec\/" title="Igloofest Québec 2027[^"]*">Québec<\/a><\/span>/,
    );
    assert.match(copy.blocksMd(s.body, ctxOf(billets)), /sur sa page\. → \[Gatineau\]\(https:\/\/fest\.one\/igloofest\/gatineau\/\) · → \[Québec\]\(https:\/\/fest\.one\/igloofest\/quebec\/\)/);
    // Any other arrow without a phrase stops the build.
    assert.throws(() => copy.inline("Voir ailleurs. → /igloofest/billets/", ctxOf({ ...billets, anchors: [] })), /has no anchor/);
  });

  // « Complet » is the word the organiser printed on 21 October for a pass
  // that was on sale the next day: the guide never says it of a ticket.
  test("a French guide's strings never say « Complet », and say « complet » once, of that day", () => {
    const found = [];
    for (const { where, text, guide } of all.filter((s) => copy.isFrench(s.guide.lang))) {
      if (/\bComplet\b|SoldOut/.test(text)) found.push(`${where}: Complet`);
      for (const m of text.matchAll(/\bcomplet\b/g))
        if (!text.slice(m.index - 40, m.index + 30).includes("n'était affiché complet ce jour-là")) found.push(`${where}: complet`);
    }
    assert.deepEqual(found, []);
  });
});

// ------------------------------------------------- a French guide's pages

describe("a French guide's built pages", { skip: built ? false : "apps/fest/dist is missing: npm run build:fest first" }, () => {
  const html = built ? pages() : new Map();
  const french = [...html].filter(([, h]) => /<html[^>]*\slang="fr/.test(h));
  const content = french.filter(([p]) => !p.startsWith("/go/"));
  const day = rules.today();
  // The words as a reader gets them, the no-break spaces kept.
  const words = (s) => s.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, NB).replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/[ \t\n\r]+/g, " ");
  const jsonLd = (h) => [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));

  test("seven French pages and twenty French hops", () => {
    assert.equal(content.length, 7);
    assert.equal(french.filter(([p]) => p.startsWith("/go/")).length, 20);
  });

  // What test:fest fails on, after the transform (plan 5.5.2): a plain
  // space before « ; ? ! : » » or after « « », between a figure and « $ »
  // or « % », on either side of the « h » of an hour, inside a grouped
  // figure, after « BUNT. ». Read in the text, in the words a reader or a
  // search engine meets in attributes, in the JSON-LD's words and in the
  // Markdown twin; never in an href, a datetime or a machine string (the
  // CTO's gate-3 bound (c)).
  const FAULTS = [/ [;?!:»]/, /« /, /\d [$%]/, /\d h(?![\p{L}\d])/u, /\d\u00a0h \d/, /(?<!\d)\d{1,3} \d{3}(?!\d)/, /BUNT\. /];
  const MACHINE_LD = new Set(["@context", "@type", "@id", "url", "item", "sameAs", "startDate", "endDate", "validFrom", "price", "priceCurrency", "latitude", "longitude", "image", "inLanguage"]);
  function ldWords(v, key = "", out = []) {
    if (MACHINE_LD.has(key)) return out;
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.forEach((x) => ldWords(x, "", out));
    else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) ldWords(x, k, out);
    return out;
  }
  test("a French page sets the OQLF's spaces everywhere a reader or a search engine reads it", () => {
    const bad = [];
    for (const [p, h] of french) {
      const body = /<body\b[^>]*>([\s\S]*)<\/body>/.exec(h)?.[1] ?? "";
      const texts = [
        ["title", words(/<title>([\s\S]*?)<\/title>/.exec(h)?.[1] ?? "")],
        ["text", words(body.replace(/<script\b[\s\S]*?<\/script>/g, " ").replace(/<style\b[\s\S]*?<\/style>/g, " "))],
        ...[...h.matchAll(/\s(?:title|aria-label|alt)="([^"]*)"/g)].map((m) => ["attribute", words(m[1])]),
        ...[...h.matchAll(/<meta (?:name|property)="(?:description|og:title|og:description|twitter:title|twitter:description)" content="([^"]*)"/g)].map((m) => ["meta", words(m[1])]),
        ...jsonLd(h).flatMap((b) => ldWords(b)).map((s) => ["JSON-LD", s]),
      ];
      const md = path.join(DIST, `${p.replace(/\/$/, "")}.md`);
      if (!p.startsWith("/go/") && existsSync(md))
        texts.push(["md", readFileSync(md, "utf8").replace(/\]\([^)\s]+\)/g, "]").replace(/https?:\/\/\S+/g, "")]);
      for (const [where, t] of texts)
        for (const re of FAULTS) {
          const m = re.exec(t);
          if (m) bad.push(`${p} ${where}: "${t.slice(Math.max(0, m.index - 25), m.index + 15)}"`);
        }
    }
    assert.deepEqual(bad, []);
  });

  // The suffix is the one the site row gives, its dash between plain
  // spaces, so withoutSuffix still cuts it (SEO gate 3, condition 3); the
  // length test above holds the 60 code points.
  test("a French title ends on « — guide du festival », and its crumb is the title less it", () => {
    for (const [p, h] of content) {
      const title = words(/<title>([\s\S]*?)<\/title>/.exec(h)[1]);
      assert.match(title, / — guide du festival$/, p);
      assert.ok([...title].length <= 60, `${p}: ${[...title].length}`);
      assert.equal(copy.withoutSuffix(title) + " — guide du festival", title, p);
    }
  });

  // Director's gate-3 condition 1: the capitalised word and the schema's
  // sold-out term nowhere in the app's output, its Markdown, llms.txt and
  // hop pages included; the lower-case one only in the approved sentence.
  // Another guide's own pages are its own: Beyond The Valley and Field Day
  // mark tiers that did sell out with SoldOut, which is true there.
  test("« Complet » and SoldOut appear nowhere in dist", () => {
    const others = events.map((e) => e.slug).filter((s) => s !== "igloofest");
    const theirs = (rel) => others.some((s) => rel.startsWith(`${s}/`) || rel === `${s}.md` || rel.startsWith(`go/${s}-`));
    const hits = textFiles(DIST)
      .filter((f) => !theirs(path.relative(DIST, f)))
      .filter((f) => /\bComplet\b|SoldOut/.test(readFileSync(f, "utf8")));
    assert.deepEqual(hits.map((f) => path.relative(DIST, f)), []);
    for (const [p, h] of content)
      for (const m of words(h).matchAll(/\bcomplet\b/g)) {
        const around = words(h).slice(m.index - 30, m.index + 20);
        assert.ok(around.includes("n'était affiché complet ce jour-là"), `${p}: "${around}"`);
      }
  });

  // The five addresses and the shop's host are text a reader copies, never
  // a link (the gate-2 carry, b).
  test("the e-mail addresses and billets.igloofest.ca print as text, never as links", () => {
    const text = content.map(([, h]) => words(h)).join(" ");
    for (const s of ["groupe@igloofest.ca", "groupe@multicolore.ca", "info@igloofest.ca", "info@gestev.com", "info@Igloofestgatineau.net", "billets.igloofest.ca"])
      assert.ok(text.includes(s), `${s} is not on any page`);
    for (const [p, h] of html)
      for (const a of anchors(h)) assert.ok(!/@|billets\.igloofest\.ca|^mailto:/.test(a.href ?? ""), `${p}: a link to ${a.href}`);
  });

  // Three MusicEvents, each its own edition at its own place, the offset
  // from the zone; Montréal's three Offers while their span lasts.
  test("the three MusicEvents: names, offsets, places and Montréal's three offers", () => {
    const ev = (p) => jsonLd(html.get(p) ?? "").find((b) => b["@type"] === "MusicEvent");
    const h1 = (p) => words(/<h1\b[^>]*>([\s\S]*?)<\/h1>/.exec(html.get(p))[1]).trim();
    const description = (p) => words(/<meta name="description" content="([^"]*)"/.exec(html.get(p))[1]);
    const main = ev("/igloofest/");
    assert.equal(main.name, "Igloofest Montréal 2027");
    assert.equal(main.startDate, "2027-01-14T19:30:00-05:00");
    assert.equal(main.endDate, "2027-02-06");
    const quebec = ev("/igloofest/quebec/");
    assert.equal(quebec.name, h1("/igloofest/quebec/"));
    assert.equal(quebec.description, description("/igloofest/quebec/"));
    assert.equal(quebec.startDate, "2027-03-04T19:00:00-05:00");
    const gatineau = ev("/igloofest/gatineau/");
    assert.equal(gatineau.name, h1("/igloofest/gatineau/"));
    assert.equal(gatineau.description, description("/igloofest/gatineau/"));
    assert.equal(gatineau.startDate, "2027-02-11T19:00:00-05:00");
    assert.equal(gatineau.endDate, "2027-02-13T23:00:00-05:00");
    assert.equal(gatineau.organizer, undefined);
    assert.equal(gatineau.location.address.postalCode, undefined);
    assert.equal(quebec.offers, undefined);
    assert.equal(gatineau.offers, undefined);
    const guide = frenchGuides[0];
    if (day < guide.expires.prices) {
      assert.deepEqual(main.offers.map((o) => [o["@type"], o.price, o.priceCurrency, o.validFrom, o.url]), [
        ["Offer", 49, "CAD", "2026-10-23T11:00:00-04:00", "https://fest.one/go/igloofest-billets/"],
        ["Offer", 99, "CAD", "2026-10-23T11:00:00-04:00", "https://fest.one/go/igloofest-billets/"],
        ["Offer", 234, "CAD", "2026-10-23T11:00:00-04:00", "https://fest.one/go/igloofest-billets/"],
      ]);
      for (const o of main.offers) assert.ok(!("priceValidUntil" in o) && !("availability" in o), "an offer with an end or a state");
    } else assert.equal(main.offers, undefined);
    for (const p of ["/igloofest/billets/", "/igloofest/programmation/", "/igloofest/montreal/", "/igloofest/habillement/"]) assert.equal(ev(p), undefined, p);
  });

  test("FAQPage: six, six, none, two, two, one and two questions, the prices' row leaving with its span", () => {
    const want = { "/igloofest/": 6, "/igloofest/billets/": day < frenchGuides[0].expires.prices ? 6 : 5, "/igloofest/programmation/": 0, "/igloofest/montreal/": 2, "/igloofest/habillement/": 2, "/igloofest/quebec/": 1, "/igloofest/gatineau/": 2 };
    for (const [p, n] of Object.entries(want)) {
      const blocks = jsonLd(html.get(p)).filter((b) => b["@type"] === "FAQPage");
      assert.deepEqual(blocks.map((b) => b.mainEntity.length), n ? [n] : [], p);
    }
    assert.doesNotMatch(html.get("/igloofest/programmation/"), /Questions fréquentes/);
  });

  // « Mis à jour le » says the day the sitemap gives the page.
  test("each page's « Mis à jour le » is its sitemap lastmod", () => {
    const maps = readdirSync(DIST).filter((f) => /^sitemap.*\.xml$/.test(f)).map((f) => readFileSync(path.join(DIST, f), "utf8")).join("");
    for (const [p, h] of content) {
      const shown = /<p class="guide-updated">Mis à jour le <time datetime="(\d{4}-\d{2}-\d{2})">([^<]+)<\/time><\/p>/.exec(h);
      assert.ok(shown, `${p}: no « Mis à jour le »`);
      const entry = new RegExp(`<loc>https://fest\\.one${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</loc>[\\s\\S]*?<lastmod>([^<]+)</lastmod>`).exec(maps);
      assert.ok(entry, `${p}: not in the sitemap`);
      assert.equal(entry[1].slice(0, 10), shown[1], p);
      assert.equal(shown[2], copy.longDate(shown[1], "fr"), p);
    }
  });

  test("each French page holds at least 400 French words", () => {
    const short = [];
    for (const [p, h] of content) {
      const main = /<main\b[^>]*>([\s\S]*?)<\/main>/.exec(h)?.[1] ?? "";
      const n = wordsOf(decode(main.replace(/<script\b[\s\S]*?<\/script>/g, "")), "fr-ca").length;
      if (n < 400) short.push(`${p}: ${n} words`);
    }
    assert.deepEqual(short, []);
  });

  // The hop speaks French where the redirect does not fire, through
  // Redirect's lang, title and slot (the CTO's gate-3 item 4): « Continuer »
  // to the target and « Retour au guide » to the guide, each titled with
  // where it goes, never its own words (SEO gate 3, condition 5).
  test("a French hop: its language, its title and its two links", () => {
    for (const [p, h] of french.filter(([q]) => q.startsWith("/go/"))) {
      assert.match(h, /<html[^>]*\slang="fr-CA"/, p);
      assert.match(words(/<title>([\s\S]*?)<\/title>/.exec(h)[1]), /^Vous quittez fest\.one — guide du festival Igloofest$/, p);
      assert.match(h, /<meta name="robots" content="noindex, ?nofollow"/, p);
      // « … pour igloofest.ca. », « … pour Google Maps. »: one space, never
      // glued (the first build printed « pourigloofest.ca »).
      const target = p.startsWith("/go/igloofest-maps-") ? "Google Maps" : "[a-z0-9.-]+\\.[a-z]+";
      assert.match(words(/<body\b[^>]*>([\s\S]*?)<\/p>/.exec(h)[1]).trim(), new RegExp(`^Vous quittez fest\\.one pour ${target}\\.$`), p);
      const links = anchors(h);
      const go = links.find((a) => a.text === "Continuer");
      const back = links.find((a) => a.text === "Retour au guide");
      assert.ok(go && back, `${p}: the two links`);
      assert.equal(back.href, "/igloofest/");
      assert.match(go.rel, /nofollow/);
      assert.ok(go.title && go.title !== go.text && back.title && back.title !== back.text, `${p}: titles`);
    }
  });
});

function textFiles(dir, into = []) {
  if (!existsSync(dir)) return into;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".astro") textFiles(full, into);
    } else if (/\.(ts|astro|css|mjs|js|json|md|txt|html|xml)$/.test(entry.name)) into.push(full);
  }
  return into;
}

/** Languages written in Cyrillic. None of the guides is, yet. */
const CYRILLIC_LANGS = ["uk", "be", "bg", "sr", "mk", "kk", "ky", "mn", "tg"];

describe("scripts", () => {
  // Three letters Russian writes and Ukrainian and Bulgarian do not (yery,
  // e, yo: U+044B, U+044D, U+0451): the cheapest sign that Russian got into
  // a page. Belarusian has them too, so a Belarusian guide retires this test.
  // Escaped, so this file carries no Cyrillic of its own.
  test("no yery, e or yo (U+044B, U+044D, U+0451) anywhere in apps/fest", () => {
    if (guides.some((g) => g.lang.slice(0, 2) === "be")) return;
    const hits = textFiles(APP).filter((f) => /[\u044B\u044D\u0451]/.test(readFileSync(f, "utf8")));
    assert.deepEqual(hits.map((f) => path.relative(REPO, f)), []);
  });

  test("no Cyrillic at all while no guide is in a Cyrillic script", () => {
    if (guides.some((g) => CYRILLIC_LANGS.includes(g.lang.slice(0, 2)))) return;
    const hits = textFiles(APP).filter((f) => /[\u0400-\u04FF]/.test(readFileSync(f, "utf8")));
    assert.deepEqual(hits.map((f) => path.relative(REPO, f)), []);
  });

  // tools/text-dupes.mjs counts a page's words to score its boilerplate.
  // Thai has no spaces between words: the platform's word breaker finds
  // them, and every other language keeps the tokeniser it always had.
  test("text-dupes counts Thai words, and English as before", () => {
    const thai = wordsOf("ที่พักและการเดินทาง", "th");
    assert.ok(thai.length >= 3, `a Thai label of several words reads as ${thai.length}`);
    assert.ok(thai.includes("และ"), "the conjunction is a word of its own");
    assert.deepEqual(wordsOf("Camping and tents, from $385!", "en-au"), ["camping", "and", "tents", "from", "385"]);
    assert.deepEqual(wordsOf("Camping and tents", ""), ["camping", "and", "tents"]);
  });

  // Spanish and Armenian are spaced as English is, with letters outside
  // a–z: an accent or an ñ keeps its word whole, an accent typed as a
  // separate mark stays with its letter, and an Armenian page has words.
  test("text-dupes keeps Spanish words whole and counts Armenian", () => {
    assert.deepEqual(wordsOf("Dos días: ñandú, ¡12,5%!", "es-cl"), ["dos", "días", "ñandú", "12", "5"]);
    assert.deepEqual(wordsOf("Dos días", "es"), ["dos", "días"]);
    assert.deepEqual(wordsOf("Երևանի համերգներ", "hy"), ["երևանի", "համերգներ"]);
  });

  // French is in the same set, and the no-break spaces oqlf sets
  // (copy.ts) split words as a space does (the CTO's gate-3 bound (c)).
  test("text-dupes reads a French no-break space as a space", () => {
    assert.deepEqual(wordsOf(`Mis à jour le 22${NB}octobre, 19${NB}h${NB}30${NB}: «${NB}S'habiller${NB}», 18${NB}000`, "fr-ca"), ["mis", "à", "jour", "le", "22", "octobre", "19", "h", "30", "s", "habiller", "18", "000"]);
  });
});

// ------------------------------------------------------------ online

// Where the archive meets the app. fest.one serves the old festival site at
// every path it has and hands the rest to this app, so a guide path, a hop
// or a file name the archive already uses would be the archive's, not ours.
const ONLINE = process.env.FEST_ONLINE === "1";
describe("against fest.one", { skip: ONLINE ? false : "FEST_ONLINE=1 to fetch the archive's sitemap and ask for each path" }, () => {
  const paths = [
    "/festivals/",
    ...routes.guideRoutes().map((r) => r.path),
    ...events.flatMap((e) => Object.keys(e.go).map((k) => `/go/${e.slug}-${k}/`)),
    "/sitemap-index.xml",
    "/sitemap-0.xml",
    "/llms.txt",
    "/festivals.md",
    ...routes.guideRoutes().map((r) => `/${r.page.slug}.md`),
  ];

  test("the archive's sitemap names none of our paths", async () => {
    const xml = await (await fetch("https://fest.one/sitemap.xml")).text();
    const locs = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname));
    assert.ok(locs.size > 0, "the archive's sitemap has no <loc>");
    assert.deepEqual(paths.filter((p) => locs.has(p)), []);
  });

  // Before the archive hands these paths to the app (BOOTSTRAP step 4)
  // each answers 404; after, each is the app's own page.
  test("each path is free, or ours", async () => {
    const wrong = [];
    for (const p of paths) {
      const res = await fetch(`https://fest.one${p}`, { redirect: "manual" });
      if (res.status === 404) continue;
      const body = await res.text();
      const ours = p.startsWith("/go/")
        ? /<meta name="robots" content="noindex, ?nofollow"/.test(body)
        : res.status === 200 && (!p.endsWith("/") || body.includes(`<link rel="canonical" href="https://fest.one${p}"`));
      if (!ours) wrong.push(`${p}: ${res.status}`);
    }
    assert.deepEqual(wrong, []);
  });
});
