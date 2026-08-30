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
  ldn: { host: "ldn.lol", news: "news", events: "events", newsLabel: "News", eventsLabel: "Events" },
  lnd: { host: "lnd.lol", news: "news", events: "events", newsLabel: "News", eventsLabel: "Events" },
  cmx: { host: "cmx.lol", news: "noticias", events: "eventos", newsLabel: "Noticias", eventsLabel: "Eventos" },
  mxo: { host: "mxo.lol", news: "noticias", events: "eventos", newsLabel: "Noticias", eventsLabel: "Eventos" },
};

// The content files are TypeScript, and this runs outside the build. Rather
// than pull in a compiler for two fields, read the literals: `slug`, `title`
// and `summary` are written the same way in every entry, one per line, and a
// mismatch here shows up immediately as a missing page in the test.
const entries = (file) => {
  const src = readFileSync(file, "utf8");
  const out = [];
  for (const block of src.split(/\n  \{\n/).slice(1)) {
    const field = (name) => {
      const m = block.match(new RegExp(`\\n?\\s*${name}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`));
      return m ? m[1].replace(/\\"/g, '"') : undefined;
    };
    const slug = field("slug");
    if (!slug) continue;
    // No body, no detail page — same rule the routes use.
    if (!/\n\s*body:\s*\[/.test(block)) continue;
    out.push({ slug, title: field("title"), summary: field("summary"), date: field("date") ?? field("start") });
  }
  return out;
};

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
  const news = entries(path.join(REPO, "packages/content/src/news", `${app}.ts`));
  const events = entries(path.join(REPO, "packages/content/src/events", `${app}.ts`));
  const text =
    readFileSync(head, "utf8").trimEnd() +
    "\n" +
    section(site.eventsLabel, site.events, site.host, events) +
    section(site.newsLabel, site.news, site.host, news);
  const out = path.join(REPO, "apps", app, "public", "llms.txt");
  writeFileSync(out, text);
  console.log(`${app}: ${events.length} events, ${news.length} articles -> apps/${app}/public/llms.txt`);
}
