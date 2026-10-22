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
    page.sections.forEach((s) => {
      add(`sections.${s.id}.heading`, s.heading);
      add(`sections.${s.id}`, s.body);
    });
    page.faq.forEach((row, i) => {
      add(`faq.${i}.q`, row.q);
      add(`faq.${i}.a`, row.a);
    });
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

  // A dollar figure outside a span would outlive its reading: the build
  // could never take it down.
  test("every price sits in an expiry span", () => {
    const loose = [];
    for (const { where, text, guide } of all) {
      const left = copy.applySpans(text, guide, END_OF_TIME, where);
      const hit = left.match(/[^\s]*\$\s?\d[\d,.]*/g);
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
      const eve = new Date(Date.parse(guide.expires.prices) - DAY).toISOString().slice(0, 10);
      const before = rules.musicEvent(event, guide, main, eve);
      const after = rules.musicEvent(event, guide, main, guide.expires.prices);
      assert.ok(before.offers.every((o) => typeof o.price === "number"), "offers carry a price while the reading holds");
      assert.ok(after.offers?.every((o) => !("price" in o) && !("priceCurrency" in o)) ?? true, "no price once expired");
      const end = new Date(Date.parse(event.edition.end ?? event.edition.start) + DAY).toISOString().slice(0, 10);
      assert.equal(rules.musicEvent(event, guide, main, end).offers, undefined, "no offers once the edition has ended");
    }
  });
});

// ------------------------------------------------------------ the links

/** Hosts no page of the network names: Russian outlets, shops and
    platforms (~/dst rules: no Russian source or link anywhere). */
const RUSSIAN = /(^|\.)(ru|su|xn--p1ai|xn--d1acj3b)$|(^|\.)(vk\.com|ok\.ru|yandex\.[a-z]+|ya\.ru|dzen\.ru|rutube\.ru|mail\.ru)$/;
const hostOf = (url) => new URL(url).hostname.toLowerCase();

describe("where a guide's links lead", () => {
  const KINDS = ["organiser", "seller", "resale", "venue", "public-body", "press", "seller-document", "maps"];

  for (const event of events) {
    const sources = event.sheet.sources ?? {};
    test(`${event.slug}: every hop is of a known kind and traces to its source`, () => {
      for (const [key, go] of Object.entries(event.go)) {
        assert.ok(KINDS.includes(go.kind), `go.${key}: kind "${go.kind}"`);
        assert.ok(go.title && go.title.trim(), `go.${key}: a hop's anchor needs a title`);
        if (go.kind === "maps") {
          assert.ok(copy.resolve(event.sheet, go.source) !== undefined, `go.${key}: source "${go.source}" names nothing on the sheet`);
          assert.match(go.url, /^https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=/, `go.${key}: a maps hop is a plain maps search`);
          continue;
        }
        const source = sources[go.source];
        assert.ok(source, `go.${key}: source "${go.source}" is not in the sheet's sources`);
        assert.equal(hostOf(go.url), hostOf(source.url), `go.${key}: leads to another host than its source ${go.source}`);
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

const decode = (s) =>
  s.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'")
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

  test("seven pages: the hub and six guide pages", () => {
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
      const year = r.event.edition.start.slice(0, 4);
      const description = decode(h.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
      if (!title.includes(year) && !(YEARLESS[p] && description.includes(year))) bad.push(`${p}: no ${year}`);
    }
    assert.deepEqual(bad, []);
    assert.equal(decode(html.get("/festivals/").match(/<title>([\s\S]*?)<\/title>/)[1]), hub.title);
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
          if (/<[A-Za-z!/?]/.test(text)) bad.push(`${p}: a tag in the answer to "${q.name}"`);
          else if (printed.get(q.name) !== text) bad.push(`${p}: the answer to "${q.name}" is not the accordion's`);
        }
      }
    }
    assert.ok(answers > 0, "no FAQPage answer was read");
    assert.deepEqual(bad, []);
  });
});

// ----------------------------------------------------- scripts and words

/** Text files of the app: its sources and what it builds. */
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
