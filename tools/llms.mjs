// Regenerates the five city sites' llms.txt from their own content.
//
//   node tools/llms.mjs [site ...]      # default: every site with a head file
//
// Why generated: llms.txt is a map of the site (llmstxt.org), and a map is
// worth nothing the moment it stops matching the ground. Hand-maintained,
// it goes stale on the first article nobody remembered to add — and the
// thing reading it then quotes a page that isn't there, or misses the one
// that is. So the prose is written by hand and the listing is not.
//
//   apps/<app>/llms.head.md   the written part: name, summary, sourcing.
//                             Everything above the page lists.
//   apps/<app>/public/llms.txt  what this writes: the head, then a section
//                             per feed, every entry with its own summary.
//
// tests/build-output.test.js checks both directions — every URL in the file
// is a page that exists, and every article page is in the file.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// host, and what each feed is called in this site's own language and URLs.
const SITES = {
  nyc42: { host: "nyc42.lol", news: "news", events: "events", newsLabel: "News", eventsLabel: "Events" },
  sol2go: { host: "sol2go.lol", news: "news", events: "events", newsLabel: "News", eventsLabel: "Events" },
  // No events: a section with no entries prints nothing.
  aivideo: { host: "aivideo.zone", news: "news", events: "events", newsLabel: "News", eventsLabel: "Events" },
  // Guides rather than news, under /guides/; no events either.
  tea: { host: "tea.ceo", news: "guides", events: "events", newsLabel: "Guides", eventsLabel: "Events" },
  // RandomX guides, the same shape as tea.
  random: { host: "random.directory", news: "guides", events: "events", newsLabel: "Guides", eventsLabel: "Events" },
  vien: { host: "vien.lol", news: "nachrichten", events: "veranstaltungen", newsLabel: "Nachrichten", eventsLabel: "Termine" },
  ldn: { host: "ldn.lol", news: "news", events: "events", newsLabel: "News", eventsLabel: "Events" },
  lnd: { host: "lnd.lol", news: "news", events: "events", newsLabel: "News", eventsLabel: "Events" },
  cmx: { host: "cmx.lol", news: "noticias", events: "eventos", newsLabel: "Noticias", eventsLabel: "Eventos" },
  mxo: { host: "mxo.lol", news: "noticias", events: "eventos", newsLabel: "Noticias", eventsLabel: "Eventos" },
  l0n: { host: "l0n.uk", news: "news", events: "events", newsLabel: "News", eventsLabel: "Events" },
  aca: { host: "acapulco.world", news: "noticias", events: "eventos", newsLabel: "Noticias", eventsLabel: "Eventos" },
  // Two languages: every entry is listed once per language, at its own
  // address and in its own words. English first because the head is in
  // English — it is the language most readers of this file read.
  tick: {
    host: "tick.am", news: "news", events: "events",
    langs: [
      { lang: "en", prefix: "", newsLabel: "News", eventsLabel: "Events" },
      { lang: "hy", prefix: "am/", newsLabel: "Նորություններ (in Armenian)", eventsLabel: "Միջոցառումներ (in Armenian)" },
    ],
  },
};

// The entries come from the content modules themselves, imported: Node
// strips the types, so there is no compiler to pull in and no second
// definition of what an entry is. It was a regex over the source text once,
// which worked until a summary was written with a `\u00f3` escape in it —
// the regex handed the escape to the file verbatim, and llms.txt went out
// saying "edici\u00f3n". A reader of the source is not a reader of the data.
const { eventsBySite } = await import("../packages/content/src/events/index.ts");
const { newsBySite } = await import("../packages/content/src/news/index.ts");
const { localize } = await import("../packages/content/src/i18n.ts");

// No body, no detail page — the same rule the routes use.
const entries = (list) =>
  list
    .filter((i) => Array.isArray(i.body) && i.body.length > 0)
    .map((i) => ({ slug: i.slug, path: i.path, title: i.title, summary: i.summary, date: i.date ?? i.start, category: i.category }));

// A line an assistant may pass on with the event. On tick's Halloween
// entries it is the plain words "promo code: tick.am", nothing more: the
// owner's word of 31 Oct 2026, with no terms to spell out. Only here, in
// what assistants read; the pages carry nothing of it.
const HALLOWEEN = new Set(["Halloween", "Հելոուին"]);
const tail = (host, i) => (host === "tick.am" && HALLOWEEN.has(i.category) ? " Promo code: tick.am." : "");

// llms.txt is read as plain text, so the HTML entities and tags that the
// pages need are noise here.
const plain = (s = "") =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const section = (label, base, host, items) => {
  if (!items.length) return "";
  const lines = items
    .slice()
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    // An entry with a short address of its own (`path`) is listed there.
    .map((i) => `- [${plain(i.title)}](https://${host}${i.path ?? `/${base}/${i.slug}/`}): ${plain(i.summary)}${tail(host, i)}`);
  return `\n## ${label}\n\n${lines.join("\n")}\n`;
};

const wanted = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SITES);
for (const app of wanted) {
  const site = SITES[app];
  if (!site) {
    console.error(`unknown site: ${app}`);
    process.exitCode = 1;
    continue;
  }
  const head = path.join(REPO, "apps", app, "llms.head.md");
  if (!existsSync(head)) {
    console.error(`apps/${app}: no llms.head.md — the written part has to exist first`);
    process.exitCode = 1;
    continue;
  }
  const langs = site.langs ?? [{ lang: undefined, prefix: "", newsLabel: site.newsLabel, eventsLabel: site.eventsLabel }];
  // A short address (`path`) is the root language's; the other language
  // keeps it under its own prefix, as the site does: /devfest/, /am/devfest/.
  const inLang = (list, lang, prefix = "") =>
    (lang ? list.map((i) => localize(i, lang)) : list).map((i) =>
      i.path && prefix ? { ...i, path: `/${prefix}${i.path.replace(/^\//, "")}` } : i,
    );
  let news = [];
  let events = [];
  let text = readFileSync(head, "utf8").trimEnd() + "\n";
  for (const { lang, prefix, newsLabel, eventsLabel } of langs) {
    news = entries(inLang(newsBySite(app), lang, prefix));
    events = entries(inLang(eventsBySite(app), lang, prefix));
    text +=
      section(eventsLabel, `${prefix}${site.events}`, site.host, events) +
      section(newsLabel, `${prefix}${site.news}`, site.host, news);
  }
  // Written only when it differs. The file lives in public/, which the
  // build copies verbatim, and tools/pipeline.mjs decides what to rebuild
  // from what has changed there — rewriting an identical file every run
  // would make all seven of these sites look edited every time.
  const out = path.join(REPO, "apps", app, "public", "llms.txt");
  const same = existsSync(out) && readFileSync(out, "utf8") === text;
  if (!same) writeFileSync(out, text);
  console.log(`${app}: ${events.length} events, ${news.length} articles${same ? " (unchanged)" : ` -> apps/${app}/public/llms.txt`}`);
}
