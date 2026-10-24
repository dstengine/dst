// What the Montreal Igloofest shop shows now, against what the fest.one guide
// prints from it.
//
//   node tools/igloofest-shop-diff.mjs                 the live shop vs prices_nights
//   node tools/igloofest-shop-diff.mjs --from DIR      saved responses instead of the shop
//   node tools/igloofest-shop-diff.mjs --sheet FILE    a prices_nights object as JSON
//
// Exit 0: nothing differs. 1: something does. 2: the shop could not be read.
//
// The guide's price table (`prices_nights` in
// apps/fest/src/data/events/igloofest.ts) is read by hand from the organiser's
// shop and dated; the shop moves while the page stands still — on 24 Oct 2026
// four of twelve nights changed between the morning and the evening. Which
// nights, areas and ranges moved is a comparison, so it is done here and not
// by an agent round before every re-read.
//
// The shop is Eventshopper (Multicolore). Its page is an app shell; the
// prices come from three JSON calls the app makes itself, on the same host,
// and a plain fetch reads them:
//
//   showshop.getSingleSeriesInfo  the nights: date, event code, layout code
//   showshop.priceTableWExtended  per layout: price levels and their prices
//   showshop.availWSS             per night and level: tickets left
//
// A level is one tier of one area ("VIP - Sapporo - Regular"). It is on sale
// when availWSS lists it with tickets left; listed with none, it has sold
// out; not listed, it is not on sale yet (Day of show, the Videotron area).
// An area shows the prices of its on-sale levels, as the shop does — two
// levels on sale at once make a range — and SOLD OUT when it had levels on
// sale and none is left. The displayed price is ticket plus service fee, tax
// extra, which is how the guide states it. The Igloopass is not a night and
// is left out.
//
// Three requests, one a second: the shop sits behind Cloudflare, and a burst
// earns a challenge. If it answers with anything but JSON the tool says so
// and stops; there is no headless browser behind it.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SHOP = "https://billets.igloofest.ca";
const SERIES = "6070144b-f1a0-457e-a50c-af5a0d1ce2a4";
const LOCALE = "en-CA";
const MAX_NIGHTS = 12;
const PAUSE_MS = 1000;

export const CALLS = {
  series: "showshop.getSingleSeriesInfo",
  prices: "showshop.priceTableWExtended",
  avail: "showshop.availWSS",
};

// The shop's area names, in the sheet's keys.
export const AREAS = {
  "General Admission": "ga",
  "VIP - Sapporo": "sapporo",
  "VIP - Multicolore": "multicolore",
  "VIP - Intelcom": "intelcom",
  "VIP - Poppers": "poppers",
  "VIP - Casino de Montréal": "casino",
  "NYX Cosmetics Baddie Zone - Side Stage East": "nyx_east",
  "NYX Cosmetics Baddie Zone - Side Stage West": "nyx_west",
};
const GROUPS = {
  ga: ["ga"],
  vip: ["sapporo", "multicolore", "intelcom", "poppers", "casino"],
  baddie: ["nyx_east", "nyx_west"],
};
const TIER = /\s-\s(?:Early Bird|Regular|Last Chance|Day of show)$/i;
const SOLD_OUT = "SOLD OUT";

const money = (cents) => (cents / 100).toFixed(2);
// The sheet writes ranges with an en dash and, in places, a hyphen.
const canon = (s) => String(s).replace(/\s*[–—-]\s*/g, "-").trim().toUpperCase();
const figures = (s) => (/^\d/.test(s) ? s.split(/\s*[–—-]\s*/).map(Number) : []);

// responses: the three parsed JSON bodies. Returns { nights, unpriced } where
// nights maps "2027-01-14" to { ga: "89.00", sapporo: "SOLD OUT", ... } and
// unpriced lists the nights the shop gives no price for at all.
export function parseShop({ series, prices, avail }) {
  const events = (series.result ?? []).filter((e) => e && /\d{8}$/.test(e.eventCode ?? ""));
  const table = Object.values(prices.result ?? {}).find(Array.isArray);
  const stock = Object.values(avail.result ?? {})[0]?.avail ?? {};
  const layouts = table?.[2] ?? {};
  const names = new Map((table?.[1] ?? []).map((r) => [Number(r[0]), r[1]]));
  const nights = {};
  const unpriced = [];
  for (const ev of events) {
    const date = ev.date.slice(0, 10);
    const layout = layouts[ev.eventTypeCode] ?? {};
    // A layout names its own levels; the table's list is only the fallback.
    const own = new Map((layout.priceLevels ?? []).map((r) => [Number(r[0]), r[1]]));
    const left = new Map((stock[ev.eventCode] ?? []).map(([level, n]) => [Number(level), n]));
    const areas = {};
    for (const el of layout.priceElements ?? []) {
      const level = Number(el[0]);
      if (!left.has(level)) continue;
      const name = own.get(level) ?? names.get(level);
      if (name === undefined) continue;
      const area = name.replace(TIER, "");
      const parts = Object.fromEntries(el[8] ?? []);
      const price = parts._Ticket !== undefined ? parts._Ticket + (parts["Service Fee"] ?? 0) : el[6];
      const slot = (areas[area] ??= { on: [], sold: 0 });
      if (left.get(level) > 0) slot.on.push(price);
      else slot.sold += 1;
    }
    const row = {};
    for (const [area, { on, sold }] of Object.entries(areas)) {
      const key = AREAS[area] ?? `?${area}`;
      if (on.length) {
        const lo = Math.min(...on);
        const hi = Math.max(...on);
        row[key] = lo === hi ? money(lo) : `${money(lo)}–${money(hi)}`;
      } else if (sold) row[key] = SOLD_OUT;
    }
    if (Object.keys(row).length) nights[date] = row;
    else unpriced.push(date);
  }
  return { nights, unpriced };
}

const lows = (row, keys) =>
  keys.flatMap((k) => (row?.[k] ? figures(row[k]).slice(0, 1) : []));

// The lowest figure the row shows in a group, as the sheet writes `lowest`.
const lowest = (row, group) => {
  const all = lows(row, GROUPS[group]);
  return all.length ? Math.min(...all).toFixed(2) : undefined;
};

const span = (rows, group) => {
  const all = rows.flatMap((row) => GROUPS[group].flatMap((k) => (row?.[k] ? figures(row[k]) : [])));
  if (!all.length) return "none";
  return `${Math.min(...all).toFixed(2)}–${Math.max(...all).toFixed(2)}`;
};

// sheet: the prices_nights object. Returns { lines, ranges, differs }.
export function diffSheet(shop, sheet) {
  const lines = [];
  const rows = Object.fromEntries(sheet.nights.map((n) => [n.key, n]));
  const dates = [...new Set([...sheet.nights.map((n) => n.key), ...Object.keys(shop.nights), ...shop.unpriced])].sort();
  const sheetUnpriced = new Set(sheet.unpriced?.dates ?? []);
  for (const date of dates) {
    const mine = rows[date];
    const theirs = shop.nights[date];
    if (!mine && sheetUnpriced.has(date)) {
      if (theirs) lines.push(`${date}  was unpriced in the sheet, the shop now shows ${summary(theirs)}`);
      continue;
    }
    if (!mine) {
      lines.push(
        theirs
          ? `${date}  a night the sheet does not have: ${summary(theirs)}`
          : `${date}  a night the sheet does not have, and the shop shows no price for it`,
      );
      continue;
    }
    if (!theirs) {
      lines.push(`${date}  the shop shows no price; the sheet has ${summary(mine)}`);
      continue;
    }
    const parts = [];
    const keys = [...new Set([...Object.keys(AREAS).map((a) => AREAS[a]), ...Object.keys(theirs)])];
    for (const key of keys) {
      const a = mine[key];
      const b = theirs[key];
      if ((a === undefined ? "" : canon(a)) !== (b === undefined ? "" : canon(b))) {
        parts.push(`${key} ${a ?? "-"} → ${b ?? "no price"}`);
      }
    }
    for (const group of Object.keys(GROUPS)) {
      const a = mine.lowest?.[group];
      const b = lowest(theirs, group);
      if (a !== undefined && b !== undefined && Number(a) !== Number(b)) parts.push(`lowest.${group} ${a} → ${b}`);
    }
    if (parts.length) lines.push(`${date}  ${parts.join("; ")}`);
  }
  const shopRows = Object.values(shop.nights);
  const ranges = Object.keys(GROUPS).map((group) => {
    const had = String(sheet.ranges?.[group] ?? "none");
    const now = span(shopRows, group);
    return { group, had, now, same: canon(had) === canon(now) };
  });
  return { lines, ranges, differs: lines.length > 0 || ranges.some((r) => !r.same) };
}

function summary(row) {
  return Object.entries(row)
    .filter(([k]) => !["key", "lowest", "note"].includes(k))
    .map(([k, v]) => `${k} ${v}`)
    .join(", ");
}

class ShopUnreadable extends Error {}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function readShop(from) {
  const out = {};
  let first = true;
  for (const [name, call] of Object.entries(CALLS)) {
    if (from) {
      try {
        out[name] = JSON.parse(fs.readFileSync(path.join(from, `${call}.json`), "utf8"));
      } catch (err) {
        throw new ShopUnreadable(`${call}: ${err.code ?? err.message}`);
      }
      continue;
    }
    if (!first) await sleep(PAUSE_MS);
    first = false;
    const tail =
      name === "prices"
        ? `/${encodeURIComponent(JSON.stringify({ include_deprecated_parts_with_price_elements: true, include_restriction_groups: true, language: LOCALE }))}`
        : name === "series"
          ? `/${LOCALE}`
          : "";
    const url = `${SHOP}/info/${call}/${SERIES}${tail}?resp=json`;
    let res;
    try {
      res = await fetch(url, { signal: AbortSignal.timeout(30000), redirect: "manual" });
    } catch (err) {
      throw new ShopUnreadable(`${call}: ${err.cause?.code ?? err.message}`);
    }
    const type = res.headers.get("content-type") ?? "";
    if (res.status !== 200 || !type.includes("json")) {
      throw new ShopUnreadable(`${call}: HTTP ${res.status}, ${type || "no content type"}${res.headers.get("cf-mitigated") ? " (Cloudflare challenge)" : ""}`);
    }
    try {
      out[name] = await res.json();
    } catch {
      throw new ShopUnreadable(`${call}: the body is not JSON`);
    }
    if (out[name].error) throw new ShopUnreadable(`${call}: the shop answered with an error`);
  }
  return out;
}

async function main() {
  const args = process.argv.slice(2);
  const opt = (flag) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined);
  let sheet;
  if (opt("--sheet")) sheet = JSON.parse(fs.readFileSync(opt("--sheet"), "utf8"));
  else {
    const { events } = await import(pathToFileURL(path.join(REPO, "apps/fest/src/data/events/igloofest.ts")).href);
    sheet = events.find((e) => e.slug === "igloofest").sheet.prices_nights;
  }
  let shop;
  try {
    shop = parseShop(await readShop(opt("--from")));
  } catch (err) {
    if (!(err instanceof ShopUnreadable) && !(err instanceof SyntaxError)) throw err;
    console.log(`the shop could not be read: ${err.message}`);
    process.exit(2);
  }
  const dated = Object.keys(shop.nights).length + shop.unpriced.length;
  if (dated === 0 || dated > MAX_NIGHTS) {
    console.log(`the shop could not be read: ${dated} nights found, expected 1 to ${MAX_NIGHTS}`);
    process.exit(2);
  }
  const { lines, ranges, differs } = diffSheet(shop, sheet);
  console.log(`sheet read ${sheet.readOn}, expires ${sheet.expires}; shop: ${Object.keys(shop.nights).length} priced nights, ${shop.unpriced.length} unpriced`);
  for (const line of lines) console.log(line);
  for (const r of ranges) {
    console.log(`ranges.${r.group}  ${r.same ? `same ${r.now}` : `sheet ${r.had} → shop ${r.now}`}`);
  }
  console.log(differs ? "differs" : "nothing differs");
  process.exit(differs ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
