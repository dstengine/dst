// Where the site's own subject is missing from the places a search result
// is made of.
//
//   node tools/seo-check.mjs            every site that has declared a keyword
//   node tools/seo-check.mjs sol2go ldn one or more sites
//
// Search is the network's main source of traffic, and the rule it enforces
// is in ~/dst/AGENTS.md: the subject of the site belongs in the <title>,
// the h1 and the summary — the summary being the meta description, so those
// two lines are the whole of what a reader sees before deciding whether to
// come. sol2go had two thirds of its pages without the word "Solana" in a
// title, which is how this tool came to exist.
//
// A site opts in by declaring `keyword` in its own src/site.config.ts. A
// site that has not declared one is listed as undeclared rather than
// silently passed: choosing the head keyword is a judgement about the site,
// not something to infer from its filename.
//
// The h1 is only required on the pages we name ourselves — the front page,
// the section indexes, about. An article's h1 is the real name of a real
// thing: "Scale or Die" is what the conference is called, and a rule that
// made every event h1 say Solana would be a rule for renaming events.
//
// tools/seo-ignore.json holds the deliberate exceptions, each with a reason.
// Some pages are legitimately not about the site's subject — an Ethereum
// hackathon listed because people who build across chains keep both dates
// in one diary — and the answer there is never to write the word in anyway.
//
// Reads dist/, so it needs a build first. noindex pages and the /go/ hops
// are skipped — nothing that is not in the index can rank.
import fs from "node:fs";
import path from "node:path";

const REPO = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const APPS = path.join(REPO, "apps");
const only = new Set(process.argv.slice(2).filter((a) => !a.startsWith("--")));
const IGNORE_FILE = path.join(REPO, "tools/seo-ignore.json");
const IGNORE = fs.existsSync(IGNORE_FILE) ? JSON.parse(fs.readFileSync(IGNORE_FILE, "utf8")) : {};

const strip = (html) =>
  html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;|&#\d+;/gi, " ");

const field = (html, re) => {
  const m = html.match(re);
  return m ? strip(m[1]).replace(/\s+/g, " ").trim() : "";
};

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.name === "index.html") out.push(full);
  }
  return out;
}

let findings = 0;
const undeclared = [];

for (const app of fs.readdirSync(APPS).sort()) {
  if (only.size && !only.has(app)) continue;
  const configPath = path.join(APPS, app, "src/site.config.ts");
  if (!fs.existsSync(configPath)) continue;
  const keyword = fs.readFileSync(configPath, "utf8").match(/keyword:\s*["'`]([^"'`]+)["'`]/)?.[1];
  if (!keyword) {
    undeclared.push(app);
    continue;
  }
  const dist = path.join(APPS, app, "dist");
  if (!fs.existsSync(dist)) {
    console.log(`${app}: no dist — build first`);
    continue;
  }
  const has = (s) => s.toLowerCase().includes(keyword.toLowerCase());
  const ignore = IGNORE[app] ?? {};
  const rows = [];
  for (const file of walk(dist)) {
    const url = file.slice(dist.length).replace(/index\.html$/, "");
    if (url.startsWith("/go/")) continue;
    const html = fs.readFileSync(file, "utf8");
    if (/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html)) continue;
    if (ignore[url]) continue;
    // A page we named ourselves, as against an article named after the thing
    // it is about: sections are the short paths, one level deep.
    const isSection = url.split("/").filter(Boolean).length < 2;
    const miss = [];
    if (!has(field(html, /<title>([\s\S]*?)<\/title>/i))) miss.push("title");
    if (isSection && !has(field(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i))) miss.push("h1");
    if (!has(field(html, /<meta name="description" content="([^"]*)"/i))) miss.push("description");
    if (miss.length) rows.push({ url, miss });
  }
  findings += rows.length;
  console.log(`\n${app} — "${keyword}" — ${rows.length} of ${walk(dist).length} pages missing it somewhere`);
  for (const r of rows) console.log(`   ${r.miss.join(", ").padEnd(28)} ${r.url}`);
}

const ignored = Object.values(IGNORE).reduce((n, m) => n + Object.keys(m).length, 0);
if (ignored) console.log(`\n${ignored} page(s) excluded on purpose — see tools/seo-ignore.json`);

if (undeclared.length) {
  console.log(`\nNo keyword declared, so not checked: ${undeclared.join(", ")}`);
  console.log(`Add one to apps/<site>/src/site.config.ts to bring a site in.`);
}
process.exit(findings ? 1 : 0);
