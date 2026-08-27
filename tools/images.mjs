// Generates avif/webp variants of every photograph in apps/*/public and
// records their intrinsic sizes in packages/content/src/images.json.
//
//   npm run images
//
// Why a manifest rather than Astro's own <Image>: our pictures arrive as
// runtime strings — item.image out of @dst/content, story.photo out of an
// app's data — and are rendered by components shared across seven apps.
// astro:assets needs an ImageMetadata import resolved at build time, which
// a string path into public/ can never be. Pre-generating the variants and
// looking them up by path keeps the data files as they are.
//
// Keyed by host, not by path alone: apps/dst/public/riviera.jpg is an
// 800x400 crop while apps/riviera/public/riviera.jpg is 1440x720, and the
// two would collide under one key. Host rather than app directory so the
// lookup matches lastmod.json and needs nothing but Astro.site.
//
// Committed, like lastmod.json — Vercel builds each app from its own Root
// Directory and never runs this.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const REPO = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const MANIFEST = path.join(REPO, "packages/content/src/images.json");

/** Widths worth serving. Anything wider than the source is skipped — an
    upscale costs bytes and adds nothing. */
const WIDTHS = [480, 768, 1024, 1440, 1920];

/** Site chrome, not content: these are already small, and a favicon in avif
    helps nobody. share.png is the OG card, where the crawlers want png. */
const SKIP = /favicon|apple-touch-icon|logo-mini|share\.png/;

/** The host an app is published under, out of its own Astro config — the
    same string the components have in Astro.site.hostname. */
function hostFor(app) {
  const config = fs.readFileSync(path.join(REPO, "apps", app, "astro.config.mjs"), "utf8");
  const match = config.match(/site:\s*["'`]([^"'`]+)["'`]/);
  if (!match) throw new Error(`apps/${app}/astro.config.mjs: no site to key the manifest by`);
  return new URL(match[1]).hostname;
}

const isPhoto = (file) => /\.(jpe?g|png)$/i.test(file) && !SKIP.test(file);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (isPhoto(entry.name)) out.push(full);
  }
  return out;
}

async function variantsFor(file, publicDir) {
  const image = sharp(file);
  const { width, height } = await image.metadata();
  if (!width || !height) throw new Error(`${file}: no dimensions`);

  const widths = WIDTHS.filter((w) => w < width).concat(width);
  const dir = path.dirname(file);
  const base = path.basename(file).replace(/\.[^.]+$/, "");
  const out = { width, height, avif: [], webp: [] };

  for (const w of widths) {
    for (const format of ["avif", "webp"]) {
      const name = `${base}-${w}.${format}`;
      const target = path.join(dir, name);
      // Regenerate only when the source is newer, so a run over an
      // unchanged tree costs nothing.
      const stale =
        !fs.existsSync(target) || fs.statSync(target).mtimeMs < fs.statSync(file).mtimeMs;
      if (stale) {
        const pipeline = sharp(file).resize(w);
        await (format === "avif"
          ? pipeline.avif({ quality: 55 })
          : pipeline.webp({ quality: 78 })
        ).toFile(target);
      }
      out[format].push([w, `/${path.relative(publicDir, target)}`]);
    }
  }
  return out;
}

const manifest = {};
let generated = 0;
let bytesBefore = 0;
let bytesAfter = 0;

for (const app of fs.readdirSync(path.join(REPO, "apps"))) {
  const publicDir = path.join(REPO, "apps", app, "public");
  if (!fs.existsSync(publicDir)) continue;

  const host = hostFor(app);
  for (const file of walk(publicDir)) {
    const src = `/${path.relative(publicDir, file)}`;
    const entry = await variantsFor(file, publicDir);
    (manifest[host] ??= {})[src] = entry;
    generated += entry.avif.length + entry.webp.length;

    bytesBefore += fs.statSync(file).size;
    // What a wide viewport would actually pull: the largest avif.
    const widest = entry.avif[entry.avif.length - 1][1];
    bytesAfter += fs.statSync(path.join(publicDir, widest.slice(1))).size;

    console.log(
      `${app.padEnd(12)} ${src} — ${entry.width}×${entry.height}, ` +
        `${entry.avif.length} widths`,
    );
  }
}

fs.writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

const kb = (n) => `${Math.round(n / 1024)} KB`;
console.log(
  `\n${generated} files for ${Object.values(manifest).reduce((n, a) => n + Object.keys(a).length, 0)} pictures.`,
);
console.log(`Widest variant vs original: ${kb(bytesAfter)} against ${kb(bytesBefore)}.`);
