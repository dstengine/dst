// Fills in `createdAt` and `updatedAt` on feed entries that have neither,
// reading both out of git history.
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
const check = process.argv.includes("--check");

/** Every top-level entry in a feed file: its slug and the lines it occupies.
 *
 *  Read off the indentation rather than by matching braces. Brace matching
 *  has to step over strings to survive a `{` inside a sentence, and once it
 *  is doing that it also has to step over comments — an apostrophe in
 *  `// don't` opens a string that swallows the next several entries, which
 *  is exactly how the first version of this lost 25 of 327. These files are
 *  formatted, every entry opens on a line that is `  {` and closes on `  }`
 *  or `  },`, and that is checked here rather than assumed. */
function entries(text) {
  const lines = text.split("\n");
  const out = [];
  let open = -1;
  let slug = null;
  let slugLine = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^ {2}\{$/.test(line)) { open = i; slug = null; slugLine = -1; continue; }
    if (open < 0) continue;
    if (slug === null) {
      const m = /^ {4}slug: ["']([^"']+)["']/.exec(line);
      if (m) { slug = m[1]; slugLine = i; continue; }
    }
    if (/^ {2}\},?$/.test(line)) {
      if (slug !== null) out.push({ slug, from: open + 1, to: i + 1, after: slugLine + 1 });
      open = -1;
      slug = null;
    }
  }
  return out;
}

/** [first, last] commit dates for a range of lines, newest first in git's output. */
function historyOf(rel, from, to) {
  let out = "";
  try {
    out = execFileSync("git", ["log", "--format=%cI", `-L${from},${to}:${rel}`], {
      cwd: REPO,
      maxBuffer: 64 * 1024 * 1024,
    }).toString();
  } catch {
    return null;
  }
  const dates = out.split("\n").map((l) => l.trim()).filter((l) => /^\d{4}-\d{2}-\d{2}T/.test(l));
  return dates.length ? { updatedAt: dates[0], createdAt: dates.at(-1) } : null;
}

let filled = 0;
let already = 0;
const unknown = [];

for (const dir of FEEDS) {
  for (const name of readdirSync(path.join(REPO, dir))) {
    if (name === "index.ts" || !name.endsWith(".ts")) continue;
    const rel = `${dir}/${name}`;
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

    // Ranges are measured against the file as it is now, so insertions are
    // applied from the last entry backwards and no earlier edit moves a
    // later one.
    const edits = [];
    for (const e of found) {
      const body = lines.slice(e.from - 1, e.to).join("\n");
      if (/^ {4}createdAt:/m.test(body)) { already++; continue; }
      const dates = historyOf(rel, e.from, e.to);
      if (!dates) { unknown.push(`${rel}: ${e.slug}`); continue; }
      edits.push({
        line: e.after,
        text: [`    createdAt: "${dates.createdAt}",`, `    updatedAt: "${dates.updatedAt}",`],
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
}

console.log(`${filled} dated${check ? " (would be)" : ""}, ${already} already carried dates`);
if (unknown.length) {
  console.log(`no history for ${unknown.length} — commit them first, then run this again:`);
  for (const u of unknown) console.log(`  ${u}`);
}
