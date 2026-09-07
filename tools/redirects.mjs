// Writes each app's vercel.json from packages/content/src/redirects.ts.
//
// Vercel serves the 301s, because a 301 is a thing only the host can send:
// Astro's static redirects emit a meta refresh, which moves the reader and
// not the page. The rest of the file — the schema line and the ignoreCommand
// that decides whether a commit rebuilds this app — is the same on every app
// and is written here too, so the two halves cannot drift apart.
//
//   node tools/redirects.mjs
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { redirectsFor } from "../packages/content/src/redirects.ts";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IGNORE =
  "git rev-parse HEAD^ >/dev/null 2>&1 || exit 1; git diff --quiet HEAD^ HEAD -- . ../../packages";

let written = 0;
for (const app of readdirSync(path.join(REPO, "apps"))) {
  const file = path.join(REPO, "apps", app, "vercel.json");
  if (!existsSync(file)) continue;
  const moves = redirectsFor(app);
  const config = {
    $schema: "https://openapi.vercel.sh/vercel.json",
    ignoreCommand: IGNORE,
    ...(moves.length
      ? {
          // Both spellings of the old address. Every URL on these sites ends
          // in a slash, and a link written by hand — or by whoever copied it
          // into a post two years ago — may not.
          redirects: moves.flatMap(({ from, to }) =>
            [from.replace(/\/$/, ""), from].map((source) => ({
              source,
              destination: to,
              permanent: true,
            })),
          ),
        }
      : {}),
  };
  const text = JSON.stringify(config, null, 2) + "\n";
  if (readFileSync(file, "utf8") === text) continue;
  writeFileSync(file, text);
  console.log(`${app}: ${moves.length} redirect${moves.length === 1 ? "" : "s"}`);
  written++;
}
console.log(written ? `${written} vercel.json rewritten` : "every vercel.json already matches the register");
