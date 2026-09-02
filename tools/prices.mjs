// Reads what sellers advertise, off their own pages, and reports it for a
// human to write into the data by hand.
//
// It does not write to src/. A price is the one thing on this site a reader
// can act on and be wrong about at the till, so nothing lands in the data
// without somebody having looked at where it came from. The output is a
// table: seller, what was found, and how it was found.
//
// Two sources, in order of how much they can be trusted:
//   1. schema.org Offer / AggregateOffer in the page's own JSON-LD — the
//      seller stating a price in machine-readable form. Believe this.
//   2. a "from £25" phrase in the visible text. Believe this less: it can be
//      a different show on a listings page, or last season's revival.
//
// Sites behind a bot check are reported as blocked, not as priceless. We do
// not try to get past one.
import { readFileSync } from "node:fs";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

// A symbol is not a currency. "$" is four countries and "¥" is two, and the
// dirham has no symbol at all — a Dubai price would have been invisible to a
// symbol-driven reader. So the caller passes the currency the stop is sold
// in (rules.ts derives it from the city's country) and the symbol only has
// to be consistent with it.
const SYMBOL_OF = { GBP: "£", EUR: "€", USD: "$", JPY: "¥", AED: "(?:AED|د\\.إ)" };

/** Offers, however the page nests them, kept only when the event they hang
    off is the show we asked about. A venue's page can carry markup for the
    next six things it is putting on, and the cheapest of those is not our
    price. Sellers publish one Offer per performance, so the answer is the
    range across them, not whichever came first in the file — Wimbledon reads
    18 to 25, and quoting the 25 would have been wrong in the reader's favour
    in the one direction that annoys them at the till. */
function fromJsonLd(html, wanted) {
  const out = [];
  for (const m of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    let data;
    try {
      data = JSON.parse(m[1].trim());
    } catch {
      continue;
    }
    const walk = (node, eventName) => {
      if (Array.isArray(node)) return node.forEach((n) => walk(n, eventName));
      if (!node || typeof node !== "object") return;
      const name = typeof node.name === "string" ? node.name : eventName;
      const t = node["@type"];
      if (t === "Offer" || t === "AggregateOffer") {
        const price = Number(node.lowPrice ?? node.price);
        const matches = !wanted || !name || name.toLowerCase().includes(wanted.toLowerCase());
        if (Number.isFinite(price) && price > 0 && matches) {
          out.push({ price, currency: node.priceCurrency ?? "?", how: t, name });
        }
      }
      Object.values(node).forEach((v) => walk(v, name));
    };
    walk(data, undefined);
  }
  return out;
}

/** "from £25", "tickets from €30.50", "£25.00 - £75.00". */
function fromText(html, currency) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/\s+/g, " ");
  const out = [];
  const sym = SYMBOL_OF[currency] ?? "[£€$¥]";
  const re = new RegExp(`from\\s*(${sym})\\s?(\\d{1,6}(?:[.,]\\d{2})?)`, "gi");
  for (const m of text.matchAll(re)) {
    // Three of the nine text matches on the first run were not ticket prices
    // at all: "£5 off" for groups in Cardiff, "Join now from £35" for Truro
    // membership, "Schools Tickets from £14" in Canterbury. The words around
    // the number decide, and when they are one of these the match is dropped.
    const around = text.slice(Math.max(0, m.index - 120), m.index + 40);
    if (/\boff\b|join now|become a member|schools?|group|discount|members?\b/i.test(around)) continue;
    out.push({
      price: Number(m[2].replace(",", ".")),
      currency,
      how: "text",
      quote: m[0],
      around: around.trim().slice(-90),
    });
  }
  return out;
}

const BOT_CHECK = /just a moment|verifying you are human|cf-browser-verification|attention required/i;

async function probe(url, wanted, currency) {
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, accept: "text/html,application/xhtml+xml" },
      redirect: "follow",
      signal: AbortSignal.timeout(30000),
    });
    const html = await res.text();
    if (!res.ok) return { status: res.status, note: res.status === 403 ? "blocked or bot check" : "error" };
    if (BOT_CHECK.test(html.slice(0, 4000))) return { status: res.status, note: "bot check" };
    const ld = fromJsonLd(html, wanted).filter((o) => !currency || o.currency === currency);
    const txt = fromText(html, currency);
    return { status: res.status, ld, txt };
  } catch (err) {
    return { status: 0, note: err.name === "TimeoutError" ? "timeout" : err.message };
  }
}

// Rows are "show/slug<TAB>url<TAB>currency". The currency is not optional in
// practice: without it a "$" or a "¥" is a guess, and an offer in the wrong
// money is silently accepted.
const rows = readFileSync(process.argv[2] ?? "/dev/stdin", "utf8")
  .trim()
  .split("\n")
  .map((l) => l.split("\t"));

const SHOW_NAME = { chicago: "Chicago", cats: "Cats" };

let solid = 0;
let needsEyes = 0;
for (const [key, url, currency] of rows) {
  const r = await probe(url, SHOW_NAME[key.split("/")[0]], currency);
  let what;
  if (r.note) {
    what = `— ${r.note}`;
  } else if (r.ld?.length) {
    const prices = r.ld.map((o) => o.price);
    const cur = r.ld[0].currency;
    const lo = Math.min(...prices);
    const hi = Math.max(...prices);
    solid++;
    what = `${cur} ${lo}${hi > lo ? `–${hi}` : ""}   from ${r.ld.length} offer(s) — WRITE THIS`;
  } else if (r.txt?.length) {
    needsEyes++;
    what = `${r.txt[0].currency} ${r.txt[0].price}?  text only, CHECK BY HAND — "...${r.txt[0].around}"`;
  } else {
    what = "— no price in the page";
  }
  console.log(`${key.padEnd(24)} ${String(r.status).padEnd(4)} ${what}`);
  await new Promise((r) => setTimeout(r, 400));
}
console.log(
  `\n${solid} of ${rows.length} publish a machine-readable price for the right show.` +
    `\n${needsEyes} more have a "from" figure in the text only — read the quote before believing it.`,
);
