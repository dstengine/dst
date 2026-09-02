// How much of each page's prose also appears on other pages of the same site.
//
//   node tools/text-dupes.mjs apps/musical/dist [/some/page/]
//
// Why: a site generated from data reaches a point where the template weighs
// more than the facts. Thirty-three tour stops each carried a hundred and
// seventy words of the same three venue summaries before this script was
// written, and every test on the repo was green while it happened.
//
// It counts 6-word runs. A run found on two pages is a cross-link; one found
// on five or more is a template, and that is the number to watch. Pass a
// page path as a second argument to print that page's text.
//
// `analyse(dist)` is exported so the test suite scores a site with exactly
// this code rather than a second copy of it that drifts.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

/** A 6-word run on this many pages is a template, not a coincidence. */
export const MANY = 5;

export function analyse(root) {
const files = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (e === "index.html" && !p.includes("/go/")) files.push(p);
  }
})(root);

const textOf = (html) => {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? html;
  return main
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const head = (html, re) => html.match(re)?.[1]?.replace(/\s+/g, " ").trim() ?? "";

const pages = files.map((f) => {
  const html = readFileSync(f, "utf8");
  const text = textOf(html);
  const words = text.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter(Boolean);
  const shingles = new Set();
  for (let i = 0; i + 6 <= words.length; i++) shingles.add(words.slice(i, i + 6).join(" "));
  return {
    url: "/" + relative(root, f).replace(/index\.html$/, ""),
    title: head(html, /<title>([\s\S]*?)<\/title>/),
    desc: head(html, /<meta name="description" content="([^"]*)"/),
    words: words.length,
    text,
    shingles,
  };
});

// How many of a page's 6-word runs appear on at least one other page.
const seen = new Map();
for (const p of pages) for (const s of p.shingles) seen.set(s, (seen.get(s) ?? 0) + 1);

// Boilerplate is text that appears on MANY pages. Two pages sharing a
// sentence is a cross-link; twenty pages sharing one is a template.
const scored = pages.map((p) => {
  let shared = 0;
  let boiler = 0;
  for (const s of p.shingles) {
    if (seen.get(s) > 1) shared++;
    if (seen.get(s) >= MANY) boiler++;
  }
  return { ...p, size: p.shingles.size, shared, boiler,
    pct: p.shingles.size ? shared / p.shingles.size : 0,
    bpct: p.shingles.size ? boiler / p.shingles.size : 0 };
});

const avg = (get) => scored.reduce((s, p) => s + get(p), 0) / (scored.length || 1);
return { pages: scored, phrases: seen, sharedAvg: avg((p) => p.pct), boilerAvg: avg((p) => p.bpct) };
}

// Everything below is the command line. Nothing above it prints.
if (import.meta.url === `file://${process.argv[1]}`) {
const root = process.argv[2];
const { pages, phrases: seen, sharedAvg: avg, boilerAvg: bavg } = analyse(root);
const scored = pages;

console.log(`pages ${pages.length}\n`);
console.log("— duplicate <title>");
const byTitle = new Map();
for (const p of pages) byTitle.set(p.title, [...(byTitle.get(p.title) ?? []), p.url]);
[...byTitle].filter(([, u]) => u.length > 1).forEach(([t, u]) => console.log(`  ${u.length}× ${JSON.stringify(t)} ${u.slice(0, 3).join(" ")}`));

console.log("\n— duplicate meta description");
const byDesc = new Map();
for (const p of pages) byDesc.set(p.desc, [...(byDesc.get(p.desc) ?? []), p.url]);
[...byDesc].filter(([, u]) => u.length > 1).forEach(([d, u]) => console.log(`  ${u.length}× ${JSON.stringify(d.slice(0, 90))} ${u.slice(0, 3).join(" ")}`));

console.log("\n— most templated pages (boilerplate = 6-word runs found on 5+ pages)");
scored.sort((a, b) => b.bpct - a.bpct).slice(0, process.argv.includes("--all") ? 999 : 20)
  .forEach((p) => console.log(`  boiler ${(p.bpct * 100).toFixed(0).padStart(3)}%  any ${(p.pct * 100).toFixed(0).padStart(3)}%  ${String(p.words).padStart(5)}w  ${p.url}`));

console.log("\n— most repeated phrases");
[...seen].filter(([, n]) => n >= MANY).sort((a, b) => b[1] - a[1]).slice(0, 25)
  .forEach(([sh, n]) => console.log(`  ${String(n).padStart(3)}×  ${sh}`));

console.log("\n— thinnest pages");
scored.slice().sort((a, b) => a.words - b.words).slice(0, 10)
  .forEach((p) => console.log(`  ${String(p.words).padStart(5)}w  ${(p.pct * 100).toFixed(0)}% shared  ${p.url}`));

console.log(`\nsite average: ${(avg * 100).toFixed(1)}% shared with any page, ${(bavg * 100).toFixed(1)}% boilerplate`);

const focus = process.argv.slice(3).find((a) => !a.startsWith("--"));
if (focus) {
  const p = scored.find((x) => x.url === focus);
  console.log(`\n=== ${focus} (${p.words}w, ${(p.pct*100).toFixed(0)}% shared)\n`);
  console.log(p.text);
}
}
