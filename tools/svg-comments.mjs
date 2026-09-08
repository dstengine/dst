// Strips comments out of the SVGs a site ships, at the end of its own build.
//
// The diagrams in apps/*/public/news/ are written by hand, and the comments
// in them explain the drawing to whoever edits it next: why a bar runs the
// full width, why one series has no bar at all, where a caption had to sit.
// That is worth keeping — in the source. What it is not worth doing is
// serving it. A file under public/ is copied to dist verbatim, so unlike a
// comment in a .ts file, a comment in an .svg is published text: anyone can
// open the URL and read it, and nothing in the writing of it assumed a
// reader.
//
// So the note stays where it helps and stops where it does not. The source
// file is never touched; only the copy in dist is rewritten.
//
// This is an Astro integration rather than a step after `npm run build`
// because each app is its own Vercel project and builds on its own. A pass
// over dist from the repo root would run here and never in production —
// which is the one place it has to run.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Every .svg under a directory, recursively. */
function svgsIn(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) out.push(...svgsIn(p));
    else if (name.endsWith(".svg")) out.push(p);
  }
  return out;
}

export function stripSvgComments() {
  return {
    name: "dst:strip-svg-comments",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        let files = [];
        try {
          files = svgsIn(outDir);
        } catch {
          return; // nothing built
        }
        let touched = 0;
        let removed = 0;
        for (const file of files) {
          const svg = readFileSync(file, "utf8");
          // Non-greedy, and only inside .svg — never across dist as a whole.
          // `<!--` also opens a legacy script guard and a conditional comment
          // in HTML, and a rule that swept every built file would one day
          // take a bite out of one of those.
          const out = svg.replace(/<!--[\s\S]*?-->\s*/g, "");
          if (out === svg) continue;
          removed += (svg.match(/<!--[\s\S]*?-->/g) || []).length;
          writeFileSync(file, out);
          touched++;
        }
        if (touched) logger.info(`${removed} comment(s) removed from ${touched} shipped SVG(s)`);
      },
    },
  };
}
