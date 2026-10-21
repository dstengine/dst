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
import { entries, NESTED, ownRanges, wholeFile } from "./record-blocks.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FEEDS = ["packages/content/src/events", "packages/content/src/news"];
// musical.today's runs, theatres, cities and shows are not feed entries,
// but each has a page of its own and is dated like one. Its files keep the
// feed's layout, with two additions: a show holds its sections and clips
// one level down, and the history and songs sections are each a file of
// their own (see NESTED and wholeFile in ./record-blocks.mjs).
const RECORDS = ["apps/musical/src/data"];
const check = process.argv.includes("--check");

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
