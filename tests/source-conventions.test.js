// Conventions the apps hold to in their source, not in their output. Every
// case here is a way one site can quietly stop being like the other sixteen
// — which matters because the whole network is edited as one thing: a block
// written once is expected to land everywhere, and it only does when the
// apps agree on where their own facts live.
//
//   node --test tests/source-conventions.test.js
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const APPS = readdirSync(path.join(REPO, "apps")).filter((a) =>
  existsSync(path.join(REPO, "apps", a, "src")),
);

/** Every .ts and .astro file under an app's src/. */
function sources(app) {
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const p = path.join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(ts|astro)$/.test(name)) out.push(p);
    }
  };
  walk(path.join(REPO, "apps", app, "src"));
  return out;
}

describe("app conventions", () => {
  // The id an app passes to eventsBySite/newsBySite used to be a string
  // literal in every file that needed it — sixty-two of them, and the count
  // grew with every page added. Nothing catches a typo there: a wrong id is
  // a valid call that returns an empty list, and the page builds, and it is
  // empty. One export, one place to be wrong, one place to fix.
  test("no file names its own site id inline", () => {
    const inline = [];
    for (const app of APPS) {
      for (const file of sources(app)) {
        if (path.basename(file) === "content.ts") continue; // where it is declared
        const s = readFileSync(file, "utf8");
        for (const m of s.matchAll(/(?:events|news)BySite\("([^"]+)"\)/g)) {
          inline.push(`${path.relative(REPO, file)}: "${m[1]}"`);
        }
      }
    }
    assert.deepEqual(
      inline,
      [],
      `a site id written into a file instead of imported from ../content:\n  ${inline.join("\n  ")}`,
    );
  });

  // `site` means the site's identity — its name, suffix, keyword, publisher —
  // and it is spread into BaseLayout under that name. The feed key is a
  // different thing, and while both were called `site` a page could import
  // one and get the other: musical did, and the build resolved the clash by
  // dropping two news pages, silently, with no error anywhere.
  test("the feed key and the identity keep different names", () => {
    const clashes = [];
    for (const app of APPS) {
      for (const file of sources(app)) {
        const s = readFileSync(file, "utf8");
        const fromContent = s.match(/import \{([^}]*)\} from "(?:\.\.\/)*\.?\/?content";/);
        const fromConfig = /from "(?:\.\.\/)*site\.config";/.test(s);
        if (!fromContent || !fromConfig) continue;
        if (/(^|,)\s*site\s*(,|$)/.test(fromContent[1])) {
          clashes.push(path.relative(REPO, file));
        }
      }
    }
    assert.deepEqual(clashes, [], `two different things called \`site\` in one file:\n  ${clashes.join("\n  ")}`);
  });
});
