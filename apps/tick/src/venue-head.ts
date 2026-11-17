// A venue page's title and summary: the two lines a search result is made of.
//
// A room is searched for by its name as people say it, first name included,
// and, for a few, by its street. In the 28 days to 16 November 2026, 33 of
// the 44 impressions the English Ghaplanyan page has queries for (63 in
// all) came from queries that begin "hrachya", which its title left out
// ("Ghaplanyan Theatre"); others were "aram khachaturian concert hall" and
// "karen demirchyan complex"; and on Eventhub's page the address, "avetis
// aharonyan 3/8" and "aharonyan 3/8", 35 and 12 times, at position 10, with
// no click, under the title "Eventhub Yerevan, Yerevan". Nineteen of the 26
// pages sat at positions 8 to 12, the rest at 12 to 17, and seventeen of
// their summaries ran past two hundred characters, so the result was cut
// before the map and directions it promised.
//
// So the title takes the longest name that fits sixty characters, dropping
// "and tickets" before it drops a word of the name; the city is not said
// twice; and a row that is searched for by its street (`street`) carries
// the street after the name, where it fits. The summary keeps the name and
// the street first, then the count, then the map where the page draws one,
// and gives up that tail before it passes a hundred and sixty. It names no
// next date and no order: a summary says what stays true until the page is
// rebuilt, and the next date is in the page's glance panel, where it is
// read on the day.
//
// This file stands apart from the view so that tests can import it, as
// ./opera.ts does: it imports nothing that does not resolve under Node.
import type { Lang } from "./content";
import { saidAlready } from "@dst/ui/title";

export const TITLE_MAX = 60;
export const SUMMARY_MAX = 160;

export interface VenueWords {
  name: string;
  /** The name as a title runs it, when the whole name leaves no room. */
  short?: string;
  address?: string;
  /** Searched for by its street: see the file's head. */
  street?: boolean;
}

export interface VenueFacts {
  /** "11 events", in the page's language (labels.eventCount). */
  count: string;
  /** The page draws the map and the directions link: the row has `geo`. */
  map: boolean;
}

const length = (s: string) => [...s].length;
/** The first option that fits, else the last: a title is never empty. */
const first = (max: number, options: string[]) => options.find((o) => length(o) <= max) ?? options.at(-1)!;
/** Does the name say the city already, as a word: "Eventhub Yerevan" does,
    a "Yerevantsi Jazz Club" would not. The layout's own suffix rule
    (@dst/ui/title) decides the same question, so the two cannot disagree
    and append the city to a title this module thought was finished. On an
    Armenian page a Latin name does not say Երևան, and the page still owes
    its keyword: "Eventhub Yerevan՝ Երևանում" reads in Armenian as a brand
    and then the city, not as the city twice. */
const says = (name: string, city: string, lang: Lang) => saidAlready(name, city, lang);

const WORDS = {
  en: { long: ": what's on and tickets", short: ": what's on" },
  hy: { long: "․ ինչ կա և տոմսեր", short: "․ ինչ կա" },
} as const;

/** What follows the name: the city, unless the name says it already; and
    before the city, for a row searched by its street, the street. With the
    street first and without it after, for the title to fall back on. */
function places(name: string, v: VenueWords, lang: Lang, city: string): string[] {
  const town = says(name, city, lang) ? "" : `, ${city}`;
  return v.street && v.address ? [`, ${v.address}${town}`, town] : [town];
}

export function venueTitle(v: VenueWords, lang: Lang, city: string): string {
  const w = WORDS[lang];
  const names = v.short && v.short !== v.name ? [v.name, v.short] : [v.name];
  const options = names.flatMap((n) => places(n, v, lang, city).flatMap((p) => [`${n}${p}${w.long}`, `${n}${p}${w.short}`]));
  return first(TITLE_MAX, options);
}

// What the page holds, longest first, and the map only where it draws one.
// Until 17 Nov 2026 every summary promised "every event with its price and
// source", which a venue page does not show (its cards carry the date, the
// name and the room; the price is one click on), and "map, directions" on
// the three rooms that have no map. Nor does it say "the next first": the
// list opens with what is upcoming and puts what is on now below it, so on
// a room with a run under way the glance's next date is not the first card.
// A room without a map ends at its count, which says the rest.
const TAILS = {
  en: [". Map, directions and every date.", ". Map and directions.", "."],
  hy: ["։ Քարտեզ, երթուղի և բոլոր ամսաթվերը։", "։ Քարտեզ և երթուղի։", "։"],
} as const;

const tails = (lang: Lang, facts: VenueFacts): readonly string[] => (facts.map ? TAILS[lang] : TAILS[lang].slice(-1));

/** The summary's first words: the room, the city once, the street.
    "Hrachya Ghaplanyan Drama Theatre in Yerevan, 28 Isahakyan Street";
    "Eventhub Yerevan, 3/8 Avetis Aharonyan Street", without "in Yerevan". */
function head(v: VenueWords, lang: Lang, city: string): string {
  const street = v.address ? `, ${v.address}` : "";
  if (says(v.name, city, lang)) return `${v.name}${street}`;
  return lang === "hy" ? `${v.name}՝ ${city}ում${street}` : `${v.name} in ${city}${street}`;
}

// The count after the street. In Armenian the street ends in its house
// number, so "Աբովյան 2․ 11 միջոցառում" read as a date; the count goes after
// a word instead, the glance panel's own "Այս օրացույցում".
const counted = (lang: Lang, count: string) => (lang === "hy" ? `։ Այս օրացույցում՝ ${count}` : `: ${count} on this calendar`);

export function venueSummary(v: VenueWords, facts: VenueFacts, lang: Lang, city: string): string {
  const start = `${head(v, lang, city)}${counted(lang, facts.count)}`;
  return first(SUMMARY_MAX, tails(lang, facts).map((tail) => `${start}${tail}`));
}
