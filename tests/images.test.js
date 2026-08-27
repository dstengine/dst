// Assertions over the picture pipeline: tools/images.mjs generates the
// variants, packages/content/src/images.json records them, and Photo.astro
// serves them. A failure here usually means `npm run images` wasn't run
// after a picture was added or replaced.
//
//   npm run build && node --test tests/images.test.js
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { imagesByHost } from "../packages/content/src/images.ts";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SITES = [
  { app: "dst", host: "dst.llc" },
  { app: "llc", host: "llc.dst.llc" },
  { app: "visas", host: "visas.dst.llc" },
  { app: "riviera", host: "riviera.dst.llc" },
  { app: "mbr", host: "mbr.dst.llc" },
  { app: "palmcentral", host: "palmcentral.dst.llc" },
  { app: "eco", host: "eco.dst.llc" },
];

/** Same rule as the generator: chrome is not content. */
const SKIP = /favicon|apple-touch-icon|logo-mini|share\.png/;
const isPhoto = (file) => /\.(jpe?g|png)$/i.test(file) && !SKIP.test(file);

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function htmlPages(app) {
  return walk(path.join(REPO, "apps", app, "dist")).filter((f) => f.endsWith(".html"));
}

describe("every photograph has variants", () => {
  test("the manifest covers every picture in every public/ folder", () => {
    for (const { app, host } of SITES) {
      const publicDir = path.join(REPO, "apps", app, "public");
      const photos = walk(publicDir)
        .filter((f) => isPhoto(path.basename(f)))
        .map((f) => `/${path.relative(publicDir, f)}`);
      for (const src of photos) {
        assert.ok(
          imagesByHost[host]?.[src],
          `${app}: ${src} has no entry in images.json — run \`npm run images\``,
        );
      }
      console.log(`${host}: ${photos.length} pictures, all in the manifest`);
    }
  });

  test("every variant the manifest names is on disk", () => {
    for (const { app, host } of SITES) {
      const publicDir = path.join(REPO, "apps", app, "public");
      for (const [src, entry] of Object.entries(imagesByHost[host] ?? {})) {
        for (const [width, url] of [...entry.avif, ...entry.webp]) {
          const file = path.join(publicDir, url.slice(1));
          assert.ok(existsSync(file), `${app}: ${src} names ${url}, which does not exist`);
          assert.ok(statSync(file).size > 0, `${app}: ${url} is empty`);
          assert.ok(width > 0, `${app}: ${url} is listed at width ${width}`);
        }
      }
    }
  });

  test("the widest variant is smaller than the original it replaces", () => {
    for (const { app, host } of SITES) {
      const publicDir = path.join(REPO, "apps", app, "public");
      for (const [src, entry] of Object.entries(imagesByHost[host] ?? {})) {
        const [, widest] = entry.avif[entry.avif.length - 1];
        const before = statSync(path.join(publicDir, src.slice(1))).size;
        const after = statSync(path.join(publicDir, widest.slice(1))).size;
        assert.ok(after < before, `${app}: ${widest} (${after}B) is no smaller than ${src} (${before}B)`);
        console.log(`${host}${src}: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB as avif`);
      }
    }
  });
});

describe("built pages serve them", () => {
  test("a photograph is served through <picture>, with both formats", () => {
    for (const { app } of SITES) {
      for (const file of htmlPages(app)) {
        const html = readFileSync(file, "utf8");
        for (const block of html.match(/<picture[\s\S]*?<\/picture>/g) ?? []) {
          const src = block.match(/<img[^>]*src="([^"]+)"/)?.[1] ?? "";
          // An SVG figure is served through <picture> too, for its
          // narrow-screen variant, and has no raster variants to offer.
          if (!/\.(jpe?g|png)/i.test(src)) continue;
          // A narrow-screen source is allowed alongside, but avif and webp
          // must both be there or a browser silently takes the jpeg.
          const where = `${app} ${path.relative(REPO, file)}`;
          assert.match(block, /type="image\/avif"/, `${where}: <picture> with no avif source`);
          assert.match(block, /type="image\/webp"/, `${where}: <picture> with no webp source`);
        }
      }
    }
  });

  test("every raster <img> carries its intrinsic size", () => {
    let checked = 0;
    for (const { app } of SITES) {
      for (const file of htmlPages(app)) {
        const html = readFileSync(file, "utf8");
        for (const tag of html.match(/<img[^>]*>/g) ?? []) {
          const src = tag.match(/src="([^"]+)"/)?.[1] ?? "";
          // SVG has its own viewBox and needs no attributes to hold space.
          if (!/\.(jpe?g|png)/i.test(src)) continue;
          assert.match(tag, /width="\d+"/, `${app} ${path.relative(REPO, file)}: no width on ${src}`);
          assert.match(tag, /height="\d+"/, `${app} ${path.relative(REPO, file)}: no height on ${src}`);
          checked += 1;
        }
      }
    }
    console.log(`${checked} raster <img> tags, every one with width and height`);
  });
});
