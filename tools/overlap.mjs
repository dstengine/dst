#!/usr/bin/env node
// Does a hub section repeat its vertical's own site?
//
// The six sections under dst.llc cover the same subjects as six subdomains
// that are not indexed. They are allowed to — what they are not allowed to
// do is say the same thing in the same words, because two hosts carrying
// one text compete, and the search engine picks the winner instead of us.
// That is the failure being diagnosed on ldn.lol and lnd.lol right now,
// and this exists so the hub does not repeat it deliberately.
//
//   node tools/overlap.mjs          every section that has pages built
//   node tools/overlap.mjs llc      just one
//
// Exit 1 on any shared sentence longer than MIN_WORDS. A shared sentence is
// the honest test: paraphrase is fine and expected, a copied line is not.
import fs from "node:fs";
import path from "node:path";

const MIN_WORDS = 8;

// Which hub path mirrors which host directory. Kept here rather than
// imported from apps/dst/src/verticals.ts because that file is TypeScript
// and this runs as plain node with no build step.
const PAIRS = [
  ["llc", "llc"],
  ["visas", "visas"],
  ["palm-central", "palmcentral"],
  ["riviera", "riviera"],
  ["mbr", "mbr"],
  ["eco", "eco"],
];

const only = process.argv[2];

/** Visible prose of a built page: <main> with script, style, nav and forms
    gone. A form's labels and hints come out of one shared component, so two
    sites carrying the same enquiry form necessarily carry the same words in
    it — which is a fact about the component, not about the writing. Counting
    it would make the check fail on correct work and teach us to ignore it. */
function textOf(file) {
  if (!fs.existsSync(file)) return null;
  const html = fs.readFileSync(file, "utf8");
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  return main
    .replace(/<(script|style|nav|form)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;|&#\d+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const sentences = (text) =>
  text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.replace(/[^a-z0-9%’'\- ]/gi, " ").replace(/\s+/g, " ").trim().toLowerCase())
    .filter((s) => s.split(" ").length >= MIN_WORDS);

/** Every built page under a dist directory, as "/path/" => file. */
function pages(dist) {
  const out = new Map();
  if (!fs.existsSync(dist)) return out;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === "index.html") {
        out.set("/" + path.relative(dist, dir).split(path.sep).filter(Boolean).join("/") + "/", full);
      }
    }
  };
  walk(dist);
  return out;
}

let failures = 0;
let compared = 0;

for (const [slug, host] of PAIRS) {
  if (only && only !== slug) continue;

  // Both sides are walked from their own root, so both come back with the
  // section root keyed as "//". Normalise once, here, for the same reason.
  const asHubPath = (p) => (p === "//" ? `/${slug}/` : `/${slug}${p}`);

  const hubPages = new Map([...pages(path.join("apps/dst/dist", slug))].map(([p, f]) => [asHubPath(p), f]));
  if (hubPages.size === 0) continue;

  // The vertical's own pages, keyed by the path they would have on the hub.
  const hostPages = pages(path.join("apps", host, "dist"));
  const hostByHubPath = new Map([...hostPages].map(([p, file]) => [asHubPath(p), file]));

  for (const [hubPath, hubFile] of hubPages) {
    const hostFile = hostByHubPath.get(hubPath);
    if (!hostFile) continue; // a section page with no counterpart is fine
    compared += 1;

    const mine = new Set(sentences(textOf(hubFile) ?? ""));
    const theirs = sentences(textOf(hostFile) ?? "");
    const shared = [...new Set(theirs.filter((s) => mine.has(s)))];

    if (shared.length > 0) {
      failures += shared.length;
      console.log(`\n✖ ${hubPath} repeats ${host}.dst.llc — ${shared.length} sentence(s):`);
      for (const s of shared.slice(0, 3)) console.log(`    “${s.slice(0, 120)}…”`);
    }
  }
}

if (compared === 0) {
  console.log("No section page has a counterpart built yet — nothing to compare.");
  process.exit(0);
}

if (failures === 0) {
  console.log(`${compared} section page(s) checked against their own site — no shared sentence.`);
  process.exit(0);
}

console.log(`\n${failures} shared sentence(s). A section may cover the subject again; it may not say it again.`);
process.exit(1);
