// Draws a site's logo and favicons from its accent and its name.
//
// Every site in the network needs /logo-mini.png, /favicon-32x32.png,
// /favicon-16x16.png and /apple-touch-icon.png — BaseLayout links all four,
// and a missing one is a 404 on every page of the site. The established
// sites have hand-made marks; a site that does not have one yet should
// still not ship four broken links, so this draws a plain typographic mark
// from what the site already declares: the accent in its theme.css and the
// name it calls itself.
//
//   node tools/site-marks.mjs            every site listed below
//   node tools/site-marks.mjs cmx mxo    just those
import { readFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Only the sites without a hand-made mark. Adding an established site here
// would overwrite a designed logo with a generated one.
const SITES = {
  nyc42: { label: "42" },
  ldn: { label: "ldn" },
  lnd: { label: "lnd" },
  cmx: { label: "cmx" },
  mxo: { label: "mxo" },
};

/** The accent a site declares for light mode, read from its own theme.css
    so the mark and the site can never drift apart. */
function accentOf(app) {
  const css = readFileSync(path.join(REPO, "apps", app, "src/styles/theme.css"), "utf8");
  const m = css.match(/:root\s*\{[^}]*--accent:\s*(#[0-9a-fA-F]{3,8})/);
  if (!m) throw new Error(`${app}: no --accent in theme.css`);
  return m[1];
}

const SIZES = [
  ["logo-mini.png", 512],
  ["apple-touch-icon.png", 180],
  ["favicon-32x32.png", 32],
  ["favicon-16x16.png", 16],
];

function svg(label, accent, size) {
  // One line of type, sized to the longest label so two- and three-character
  // marks come out optically similar rather than mathematically equal.
  const fontSize = label.length >= 3 ? size * 0.34 : size * 0.44;
  const radius = size * 0.22;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="${accent}"/>
  <text x="50%" y="50%" dy="0.35em" text-anchor="middle" fill="#ffffff"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="${fontSize}" font-weight="700" letter-spacing="${-fontSize * 0.03}">${label}</text>
</svg>`);
}

const wanted = process.argv.slice(2);
const apps = wanted.length ? wanted : Object.keys(SITES);

for (const app of apps) {
  const site = SITES[app];
  if (!site) throw new Error(`${app}: not a site this tool draws for`);
  const accent = accentOf(app);
  const dir = path.join(REPO, "apps", app, "public");
  mkdirSync(dir, { recursive: true });
  for (const [file, size] of SIZES) {
    await sharp(svg(site.label, accent, size)).png().toFile(path.join(dir, file));
  }
  console.log(`${app}: ${accent} -> ${SIZES.map(([f]) => f).join(", ")}`);
}
