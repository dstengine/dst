// One-off geocoder. Venue coordinates are data, not something a build should
// go to the network for — so this writes them down once and the site reads
// them out of its own content file afterwards.
//
//   node tools/geocode.mjs queries.tsv        # slug<TAB>query per line
//   printf 'a\tKings Theatre, Glasgow\n' | node tools/geocode.mjs
//
// Prints slug, lat, lon, a postal address built from the structured fields,
// and the name Nominatim matched — so a wrong match is visible before it is
// pasted into the data.
import { readFileSync } from "node:fs";

// Nominatim asks for one request a second and a User-Agent that identifies
// the caller. Both are conditions of use, not politeness.
const UA = "dst-network-geocoder/1.0 (https://musical.today)";
const PAUSE = 1100;

const input = process.argv[2] ? readFileSync(process.argv[2], "utf8") : readFileSync(0, "utf8");
const rows = input.split("\n").map((l) => l.trim()).filter(Boolean)
  .map((l) => { const [slug, ...rest] = l.split("\t"); return { slug, query: rest.join("\t") }; });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Street, town and postcode out of Nominatim's structured address. The
    display_name it returns alongside is the whole administrative hierarchy,
    which is not what anyone prints on a venue page. */
function address(a = {}) {
  const street = [a.house_number, a.road].filter(Boolean).join(" ");
  const town = a.city || a.town || a.village || a.suburb || a.municipality || a.county;
  return [street, town, a.postcode].filter(Boolean).join(", ");
}

for (const { slug, query } of rows) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=${encodeURIComponent(query)}`;
  let out = `${slug}\t\t\tNOT FOUND\t${query}`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
    const [hit] = await res.json();
    if (hit) out = [slug, Number(hit.lat).toFixed(6), Number(hit.lon).toFixed(6), address(hit.address), hit.display_name].join("\t");
  } catch (err) {
    out = `${slug}\t\t\tERROR ${err.message}\t${query}`;
  }
  console.log(out);
  await sleep(PAUSE);
}
