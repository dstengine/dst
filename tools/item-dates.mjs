// Fills in `createdAt` and `updatedAt` on feed entries that have neither,
// reading both out of git history — and on the records musical.today keeps
// in its own data files, which are dated the same way (see Dated in
// apps/musical/src/data/types.ts).
//
//   node tools/item-dates.mjs          # fill what is missing
//   node tools/item-dates.mjs --check  # report, change nothing
//
// Written as a tool rather than a one-shot migration because the job comes
// back: an entry added without dates fails `npm run test:content`, and this
// is how it gets them. It only ever writes fields that are absent — an
// entry whose dates are already there is left exactly as it is, because a
// hand-set `updatedAt` is a statement and history has no standing to
// overrule it.
//
// One `git log -L` per entry answers both questions at once: the command
// prints the range's history newest first, so the first date is when the
// text last moved and the last is when it arrived. An entry whose lines are
// not in history yet — added and not committed — has no dates to read, and
// is reported rather than guessed at.
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FEEDS = ["packages/content/src/events", "packages/content/src/news"];
// musical.today's runs, theatres, cities and shows are not feed entries,
// but each has a page of its own and is dated like one. Its files keep the
// feed's layout, with two additions: a show holds its sections and clips
// one level down, and the history and songs sections are each a file of
// their own (see NESTED and wholeFile below).
const RECORDS = ["apps/musical/src/data"];
const check = process.argv.includes("--check");

/** Every entry at one level of a file: its slug and the lines it occupies.
 *
 *  Read off the indentation rather than by matching braces. Brace matching
 *  has to step over strings to survive a `{` inside a sentence, and once it
 *  is doing that it also has to step over comments — an apostrophe in
 *  `// don't` opens a string that swallows the next several entries, which
 *  is exactly how the first version of this lost 25 of 327. These files are
 *  formatted, every entry opens on a line that is `  {` and closes on `  }`
 *  or `  },`, and that is checked here rather than assumed.
 *
 *  `indent` is where the braces sit: 2 for the top level. Below it, only the
 *  arrays named in `within` hold entries — a run's sellers carry a slug too,
 *  and are part of their run rather than records of their own. */
function entries(text, indent = 2, within = null) {
  const pad = " ".repeat(indent);
  const lines = text.split("\n");
  const out = [];
  let array = null;
  let open = -1;
  let slug = null;
  let slugLine = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (within && open < 0) {
      const a = new RegExp(`^${pad.slice(2)}([A-Za-z]+): \\[$`).exec(line);
      if (a) { array = a[1]; continue; }
    }
    if (within && !within.includes(array)) continue;
    if (line === `${pad}{`) { open = i; slug = null; slugLine = -1; continue; }
    if (open < 0) continue;
    if (slug === null) {
      const m = new RegExp(`^${pad}  slug: ["']([^"']+)["']`).exec(line);
      if (m) { slug = m[1]; slugLine = i; continue; }
    }
    if (line === `${pad}}` || line === `${pad}},`) {
      if (slug !== null) out.push({ slug, from: open + 1, to: i + 1, after: slugLine + 1, indent });
      open = -1;
      slug = null;
    }
  }
  return out;
}

/** The arrays inside a top-level record whose entries are records of their
    own: a show's sections and clips each have a page. */
const NESTED = ["sections", "clips"];

/** A section exported on its own — `export const historySection: Section =
    {` — whose page is the whole file: the history section renders every
    milestone in history.ts, the songs section every song in songs.ts. So it
    is dated by the file, the one case here where the file is the record. */
function wholeFile(text) {
  const lines = text.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (!/^export const [A-Za-z]+: Section = \{$/.test(lines[i])) continue;
    for (let j = i + 1; j < lines.length && lines[j] !== "};"; j++) {
      const m = /^ {2}slug: ["']([^"']+)["']/.exec(lines[j]);
      if (m) { out.push({ slug: m[1], from: i + 1, to: lines.length, after: j + 1, indent: 0, whole: true }); break; }
    }
  }
  return out;
}

/** Whether the committed file already holds this entry.
 *
 *  `git log -L` measures a range against the file on disk and answers with
 *  the history of whatever used to occupy those lines. For an entry that was
 *  only just written that answer is not empty, it is somebody else's: the
 *  first of two events appended here was dated 30 August, which is when the
 *  lines it now sits on last moved and nowhere near when it was written.
 *  Wrong dates are worse than missing ones, so an entry the last commit has
 *  never seen is left alone and reported. */
const committed = new Map();
function inHistory(rel, slug) {
  if (!committed.has(rel)) {
    let text = "";
    try {
      text = execFileSync("git", ["show", `HEAD:${rel}`], {
        cwd: REPO,
        maxBuffer: 64 * 1024 * 1024,
      }).toString();
    } catch {
      text = ""; // a file not in HEAD at all: every entry in it is new
    }
    committed.set(rel, text);
  }
  return committed.get(rel).includes(`slug: "${slug}"`) || committed.get(rel).includes(`slug: '${slug}'`);
}

/** [first, last] commit dates for a set of line ranges, newest first in
    git's output. Several ranges when a record's own lines are interrupted
    by records of their own: a show without its sections. */
function historyOf(rel, ranges) {
  let out = "";
  try {
    out = execFileSync("git", ["log", "--format=%cI", ...ranges.map(([from, to]) => `-L${from},${to}:${rel}`)], {
      cwd: REPO,
      maxBuffer: 64 * 1024 * 1024,
    }).toString();
  } catch {
    return null;
  }
  const dates = out.split("\n").map((l) => l.trim()).filter((l) => /^\d{4}-\d{2}-\d{2}T/.test(l));
  return dates.length ? { updatedAt: dates[0], createdAt: dates.at(-1) } : null;
}

/** [first, last] commit dates for a whole file. */
function fileHistory(rel) {
  const out = execFileSync("git", ["log", "--format=%cI", "--", rel], { cwd: REPO }).toString().trim();
  const dates = out ? out.split("\n") : [];
  return dates.length ? { updatedAt: dates[0], createdAt: dates.at(-1) } : null;
}

/** The lines of [from, to] that no nested entry claims. */
function ownRanges(e, kids) {
  const ranges = [];
  let start = e.from;
  for (const kid of kids.filter((k) => k.from > e.from && k.to < e.to).sort((a, b) => a.from - b.from)) {
    if (kid.from > start) ranges.push([start, kid.from - 1]);
    start = kid.to + 1;
  }
  if (start <= e.to) ranges.push([start, e.to]);
  return ranges;
}

let filled = 0;
let already = 0;
const unknown = [];

const files = [...FEEDS, ...RECORDS].flatMap((dir) =>
  readdirSync(path.join(REPO, dir))
    .filter((name) => name.endsWith(".ts") && name !== "index.ts" && name !== "types.ts")
    .map((name) => ({ rel: `${dir}/${name}`, records: RECORDS.includes(dir) })),
);

for (const { rel, records } of files) {
  const file = path.join(REPO, rel);
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");
  const found = entries(text);
  // Every entry is expected to be found. A file where the count drifts is
  // a file this parser has misread, and dating the ones it did see would
  // quietly leave the rest behind.
  const declared = lines.filter((l) => /^ {4}slug: ["']/.test(l)).length;
  if (found.length !== declared) {
    console.error(`${rel}: parsed ${found.length} entries but the file declares ${declared} — not touching it`);
    process.exitCode = 1;
    continue;
  }
  const kids = records ? entries(text, 6, NESTED) : [];
  const all = [...found, ...kids, ...(records ? wholeFile(text) : [])];

  // Ranges are measured against the file as it is now, so insertions are
  // applied from the last entry backwards and no earlier edit moves a
  // later one.
  const edits = [];
  for (const e of all) {
    const pad = " ".repeat(e.indent + 2);
    const body = lines.slice(e.from - 1, e.to).join("\n");
    if (new RegExp(`^${pad}createdAt:`, "m").test(body)) { already++; continue; }
    if (!inHistory(rel, e.slug)) { unknown.push(`${rel}: ${e.slug}`); continue; }
    const dates = e.whole ? fileHistory(rel) : historyOf(rel, ownRanges(e, kids));
    if (!dates) { unknown.push(`${rel}: ${e.slug}`); continue; }
    edits.push({
      line: e.after,
      text: [`${pad}createdAt: "${dates.createdAt}",`, `${pad}updatedAt: "${dates.updatedAt}",`],
    });
  }
  if (!edits.length) continue;
  filled += edits.length;
  if (check) continue;
  const next = [...lines];
  for (const edit of edits.sort((a, b) => b.line - a.line)) next.splice(edit.line, 0, ...edit.text);
  writeFileSync(file, next.join("\n"));
  console.log(`${rel}: ${edits.length} entr${edits.length === 1 ? "y" : "ies"} dated`);
}

console.log(`${filled} dated${check ? " (would be)" : ""}, ${already} already carried dates`);
if (unknown.length) {
  console.log(`no history for ${unknown.length} — commit them first, then run this again:`);
  for (const u of unknown) console.log(`  ${u}`);
}
