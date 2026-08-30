// Draws the share picture each site shows when its link is pasted into
// WhatsApp, Telegram, LinkedIn or Slack.
//
// Only two pages in the network had an og:image, so every other link came
// out as a bare grey rectangle. Most of these sites have no photography of
// their own and inventing some would be worse than none, so the card is
// typographic: the site's own accent, its name, and the line it already
// uses as its meta description.
//
// Run once after the copy changes; the PNGs are committed.
//   npm run build && node tools/share-cards.mjs
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const APPS = ["dst", "llc", "visas", "riviera", "mbr", "palmcentral", "eco", "fwf", "musical",
  "nyc42", "ldn", "lnd", "cmx", "mxo"];

const W = 1200;
const H = 630;
const GROUND = "#101418";
const INK = "#F2F5F7";
const MUTED = "#9AA5AF";

const attr = (html, re) => (html.match(re) || [])[1];
const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
   .replace(/&amp;(#?\w+);/g, "&$1;");

/** Greedy wrap at a character budget — the card's type is fixed size, so a
    character count is close enough and keeps this dependency-free. */
function wrap(text, perLine, maxLines) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > perLine) {
      lines.push(line.trim());
      line = word;
      if (lines.length === maxLines) break;
    } else line = `${line} ${word}`;
  }
  if (lines.length < maxLines && line.trim()) lines.push(line.trim());
  const out = lines.slice(0, maxLines);
  if (out.length === maxLines && words.join(" ").length > out.join(" ").length) {
    out[maxLines - 1] = out[maxLines - 1].replace(/[,.;:—-]?$/, "…");
  }
  return out;
}

for (const app of APPS) {
  const html = readFileSync(path.join(REPO, "apps", app, "dist", "index.html"), "utf8");
  const siteName = attr(html, /<meta property="og:site_name" content="([^"]*)"/) ?? app;
  const description = attr(html, /<meta name="description" content="([^"]*)"/) ?? "";
  const host = new URL(attr(html, /<link rel="canonical" href="([^"]*)"/)).hostname;
  const theme = readFileSync(path.join(REPO, "apps", app, "src", "styles", "theme.css"), "utf8");
  const accent = (theme.match(/--accent:\s*([^;]+);/) || [])[1].trim();

  // 40 characters is what fits the 1008px text column at 46px Helvetica.
  const lines = wrap(description.replace(/&#39;/g, "’"), 40, 3);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${GROUND}"/>
  <rect width="${W}" height="10" fill="${accent}"/>
  <circle cx="96" cy="150" r="26" fill="${accent}"/>
  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif">
    <text x="140" y="161" font-size="30" font-weight="600" fill="${INK}">${escape(siteName)}</text>
    ${lines
      .map(
        (line, i) =>
          `<text x="96" y="${296 + i * 66}" font-size="46" font-weight="600" fill="${INK}">${escape(line)}</text>`,
      )
      .join("\n    ")}
    <text x="96" y="${H - 64}" font-size="26" fill="${MUTED}" letter-spacing="1.5">${host}</text>
  </g>
</svg>`;

  const out = path.join(REPO, "apps", app, "public", "share.png");
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
  console.log(`${app.padEnd(12)} ${accent}  ${lines[0].slice(0, 48)}…`);
}
