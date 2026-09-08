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

/** Every .ts, .astro and .md file we author, across the apps and the shared
    packages. Wider than sources() on purpose: a stray character is a
    property of the prose, and the prose is not only in apps/. */
function authored() {
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      if (name === "node_modules" || name === "dist") continue;
      const p = path.join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(ts|astro|md)$/.test(name)) out.push(p);
    }
  };
  for (const app of APPS) walk(path.join(REPO, "apps", app, "src"));
  for (const pkg of ["content", "ui"]) {
    const dir = path.join(REPO, "packages", pkg, "src");
    if (existsSync(dir)) walk(dir);
  }
  return out;
}

// Characters that take up no space on the page and so cannot be seen in the
// editor, the diff or the built site. They arrive by copy-paste from a web
// page or from a model's output, they survive every review, and they are
// what a reader who wants to argue that a page was not written by a person
// goes looking for. None of them has a job in our prose: a word joiner or a
// soft hyphen would be a typographic decision we have never taken, and the
// bidirectional controls are for text we do not publish.
//
// The visible spaces are a separate matter and stay legal — U+00A0 keeps a
// number with its unit and a dash with its clause, which is real Spanish and
// German typography and is used deliberately. The narrow and thin ones are
// listed here anyway: they look like an ordinary space at every size we set
// type at, so nobody chooses one on purpose, and one of them is the single
// most-cited tell of machine-written text.
const INVISIBLE = {
  "​": "zero width space",
  "‌": "zero width non-joiner",
  "‍": "zero width joiner",
  "⁠": "word joiner",
  "﻿": "zero width no-break space (BOM)",
  "­": "soft hyphen",
  "؜": "arabic letter mark",
  "‎": "left-to-right mark",
  "‏": "right-to-left mark",
  " ": "line separator",
  " ": "paragraph separator",
  "᠎": "mongolian vowel separator",
  "‪": "left-to-right embedding",
  "‫": "right-to-left embedding",
  "‬": "pop directional formatting",
  "‭": "left-to-right override",
  "‮": "right-to-left override",
  "⁦": "left-to-right isolate",
  "⁧": "right-to-left isolate",
  "⁨": "first strong isolate",
  "⁩": "pop directional isolate",
  " ": "narrow no-break space",
  " ": "thin space",
  " ": "figure space",
  " ": "en space",
  " ": "em space",
};

describe("invisible characters", () => {
  test("nothing we author carries a character that cannot be seen", () => {
    const found = [];
    for (const file of authored()) {
      const text = readFileSync(file, "utf8");
      let line = 1;
      for (const ch of text) {
        if (ch === "\n") { line += 1; continue; }
        const name = INVISIBLE[ch];
        if (!name) continue;
        found.push(
          `${path.relative(REPO, file)}:${line}: ${name} (U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")})`,
        );
      }
    }
    assert.deepEqual(
      found,
      [],
      `invisible characters in authored text — delete them, or write the visible character that was meant:\n  ${found.join("\n  ")}`,
    );
  });
});

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
