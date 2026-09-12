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
  vien: { host: "vien.lol", news: "nachrichten", events: "veranstaltungen", newsLabel: "Nachrichten", eventsLabel: "Termine" },
  ldn: { host: "ldn.lol", news: "news", events: "events", newsLabel: "News", eventsLabel: "Events" },
  lnd: { host: "lnd.lol", news: "news", events: "events", newsLabel: "News", eventsLabel: "Events" },
  cmx: { host: "cmx.lol", news: "noticias", events: "eventos", newsLabel: "Noticias", eventsLabel: "Eventos" },
  mxo: { host: "mxo.lol", news: "noticias", events: "eventos", newsLabel: "Noticias", eventsLabel: "Eventos" },
};

// The entries come from the content modules themselves, imported: Node
// strips the types, so there is no compiler to pull in and no second
// definition of what an entry is. It was a regex over the source text once,
// which worked until a summary was written with a `\u00f3` escape in it —
// the regex handed the escape to the file verbatim, and llms.txt went out
// saying "edici\u00f3n". A reader of the source is not a reader of the data.
const { eventsBySite } = await import("../packages/content/src/events/index.ts");
const { newsBySite } = await import("../packages/content/src/news/index.ts");

// No body, no detail page — the same rule the routes use.
const entries = (list) =>
  list
    .filter((i) => Array.isArray(i.body) && i.body.length > 0)
    .map((i) => ({ slug: i.slug, title: i.title, summary: i.summary, date: i.date ?? i.start }));

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
    .map((i) => `- [${plain(i.title)}](https://${host}/${base}/${i.slug}/): ${plain(i.summary)}`);
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
  const news = entries(newsBySite(app));
  const events = entries(eventsBySite(app));
  const text =
    readFileSync(head, "utf8").trimEnd() +
    "\n" +
    section(site.eventsLabel, site.events, site.host, events) +
    section(site.newsLabel, site.news, site.host, news);
  const out = path.join(REPO, "apps", app, "public", "llms.txt");
  writeFileSync(out, text);
  console.log(`${app}: ${events.length} events, ${news.length} articles -> apps/${app}/public/llms.txt`);
}
