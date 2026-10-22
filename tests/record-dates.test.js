// Every entry page in the network is dated by its entry's `updatedAt`, and
// every musical.today page by the records it is made of (see ItemBase in
// packages/content/src/types.ts and Dated in apps/musical/src/data/types.ts).
// Either date is a field somebody has to move. One that is forgotten does
// not fail anything else: the page keeps its old lastmod, the sitemap tells
// crawlers nothing changed, and the edit waits to be noticed for as long as
// nobody looks.
//
// So every record in the working tree is held against the same record at
// HEAD. Text that moved under an `updatedAt` that did not is the failure.
// It is caught before the commit, which is when the bump is cheap: after
// it, HEAD is the edit, there is nothing to compare, and git history is
// the only witness left — `node tools/item-dates.mjs` reads it for records
// with no dates at all, and never second-guesses one that has them.
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { entries, records } from "../tools/record-blocks.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIRS = ["packages/content/src/events", "packages/content/src/news", "apps/musical/src/data", "apps/fest/src/data/events"];

/** The file as the last commit has it; empty for a file it never saw. */
function atHead(rel) {
  try {
    return execFileSync("git", ["show", `HEAD:${rel}`], { cwd: REPO, maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] }).toString();
  } catch {
    return "";
  }
}

const files = DIRS.flatMap((dir) =>
  readdirSync(path.join(REPO, dir))
    .filter((name) => name.endsWith(".ts") && name !== "index.ts" && name !== "types.ts")
    .map((name) => `${dir}/${name}`),
);

describe("a record's updatedAt moves when its text does", () => {
  for (const rel of files) {
    test(rel, () => {
      const text = readFileSync(path.join(REPO, rel), "utf8");
      const now = records(text);
      const before = new Map(records(atHead(rel)).map((r) => [r.key, r]));

      // An entry the parser cannot see is an entry nobody checks. Every
      // top-level slug in the file has to come back as a record.
      const declared = text.split("\n").filter((l) => /^ {4}slug: ["']/.test(l)).length;
      assert.equal(entries(text).length, declared, `${rel}: the file declares ${declared} entries and the parser read a different number`);

      // A key that names two records would compare one of them with the
      // other's past, and pass or fail for the wrong reason.
      const keys = now.map((r) => r.key);
      assert.deepEqual(keys.filter((k, i) => keys.indexOf(k) !== i), [], `${rel}: two records share a key`);

      const undated = now.filter((r) => !r.createdAt || !r.updatedAt).map((r) => r.key);
      assert.deepEqual(undated, [], `${rel}: records without createdAt and updatedAt — write both, full ISO with offset`);

      const stale = [];
      const backwards = [];
      for (const r of now) {
        const was = before.get(r.key);
        if (!was || was.text === r.text) continue;
        if (r.updatedAt === was.updatedAt) stale.push(r.key);
        else if (Date.parse(r.updatedAt) < Date.parse(was.updatedAt)) backwards.push(`${r.key} (${was.updatedAt} -> ${r.updatedAt})`);
      }
      assert.deepEqual(stale, [], `${rel}: edited since the last commit with updatedAt left where it was — move it to now`);
      assert.deepEqual(backwards, [], `${rel}: edited, and updatedAt moved backwards`);
    });
  }
});
