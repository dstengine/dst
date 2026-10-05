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
// A site that has since been given a mark of its own keeps it as an SVG in
// tools/marks, and is drawn from that instead: the PNGs stay reproducible
// from a committed source, whoever drew it.
//
//   node tools/site-marks.mjs            every site listed below
//   node tools/site-marks.mjs cmx mxo    just those
import { readFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Only the sites without a hand-made mark, or with one committed as SVG in
// tools/marks. Adding an established site here would overwrite a designed
// logo with a generated one.
const SITES = {
  nyc42: { label: "42" },
  sol2go: { label: "sol" },
  vien: { label: "vien" },
  // `close` is the crop for the rounded icons: they are shown at 16 to 28px
  // and never cut to a circle, so the margin the full mark keeps for one
  // only makes the ticket smaller.
  tick: { mark: "tools/marks/tick.svg", close: "172 172 680 680" },
  ldn: { label: "ldn" },
  lnd: { label: "lnd" },
  cmx: { label: "cmx" },
  mxo: { label: "mxo" },
};

/** The accent a site declares for light mode, read from its own theme.css
    so the mark and the site can never drift apart. */
function accentOf(app) {
  const css = readFileSync(path.join(REPO, "apps", app, "src/styles/theme.css"), "utf8");
  // Sites declare --accent-light and --accent-dark; older ones declared a
  // single --accent. Take the light one, which is what the mark is drawn on.
  const m = css.match(/:root\s*\{[^}]*--accent(?:-light)?:\s*(#[0-9a-fA-F]{3,8})/);
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

/** A drawn mark at `size`. Rendered large and scaled down, which keeps
    thin strokes crisper than rasterising at 16px does. Detail marked
    `data-detail` is left out below 48px, where it is only a smudge. The
    apple touch icon is the whole mark, square: iOS rounds its corners
    itself, and transparent corners come out black under its mask. */
async function fromMark(site, file, size) {
  let src = readFileSync(path.join(REPO, site.mark), "utf8").replace(/<!--[\s\S]*?-->/g, "");
  if (size < 48) src = src.replace(/<[^>]*\sdata-detail[^>]*\/>\s*/g, "");
  if (file === "apple-touch-icon.png") return sharp(Buffer.from(src)).resize(size, size).png();
  if (site.close) src = src.replace(/viewBox="[^"]*"/, `viewBox="${site.close}"`);
  const image = sharp(Buffer.from(src)).resize(size, size);
  const corners = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${size * 0.22}" fill="#fff"/></svg>`,
  );
  return sharp(await image.png().toBuffer()).composite([{ input: corners, blend: "dest-in" }]).png();
}

const wanted = process.argv.slice(2);
const apps = wanted.length ? wanted : Object.keys(SITES);

for (const app of apps) {
  const site = SITES[app];
  if (!site) throw new Error(`${app}: not a site this tool draws for`);
  const dir = path.join(REPO, "apps", app, "public");
  mkdirSync(dir, { recursive: true });
  if (site.mark) {
    for (const [file, size] of SIZES) await (await fromMark(site, file, size)).toFile(path.join(dir, file));
    console.log(`${app}: ${site.mark} -> ${SIZES.map(([f]) => f).join(", ")}`);
    continue;
  }
  const accent = accentOf(app);
  for (const [file, size] of SIZES) {
    await sharp(svg(site.label, accent, size)).png().toFile(path.join(dir, file));
  }
  console.log(`${app}: ${accent} -> ${SIZES.map(([f]) => f).join(", ")}`);
}
