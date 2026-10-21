// Every page on musical.today is dated by the records it is made of (see
// Dated in apps/musical/src/data/types.ts), and a record's date is a field
// somebody has to move. One that is forgotten does not fail anything else:
// the page keeps its old lastmod, the sitemap tells crawlers nothing
// changed, and the edit waits to be noticed for as long as nobody looks.
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
import { records } from "../tools/record-blocks.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA = "apps/musical/src/data";

/** The file as the last commit has it; empty for a file it never saw. */
function atHead(rel) {
  try {
    return execFileSync("git", ["show", `HEAD:${rel}`], { cwd: REPO, maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] }).toString();
  } catch {
    return "";
  }
}

const files = readdirSync(path.join(REPO, DATA))
  .filter((name) => name.endsWith(".ts") && name !== "types.ts")
  .map((name) => `${DATA}/${name}`);

describe("musical records move their updatedAt when their text moves", () => {
  for (const rel of files) {
    test(rel, () => {
      const now = records(readFileSync(path.join(REPO, rel), "utf8"));
      const before = new Map(records(atHead(rel)).map((r) => [r.key, r]));

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
