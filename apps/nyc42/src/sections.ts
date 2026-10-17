// This site's sections: /theatre/, /museums/. The rules live in
// @dst/content/sections; what is left here is the vocabulary and the
// wording.
//
// One place section: /usa/. On a New York site the place question is not
// "where is this" — the answer is always New York — it is "where else", so
// `placeOf` below returns nothing at all for anything in the city and the
// country for everything outside it. That is what stops a /new-york-city/
// page holding the whole site, and it is stricter than `home` alone was:
// `home` filters a group after the fact, and the default reads `country`
// before `city`, so a New York entry that happened to record a country was
// being filed under the United States a second time. It published, headed
// "United states in New York", until 8 September 2026.
//
// The borough is the other interesting geography here and the data does not
// carry it yet — when it does, this is where it goes.
import { buildSections, promotedFirst, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";
import { isFree } from "@dst/content/admission";
import { eventsBySite } from "@dst/content/events";
import { newsBySite } from "@dst/content/news";
import { siteId } from "./content";
import { site } from "./site.config";

const RESERVED = ["about", "events", "news", "go", "li"];

// Every name the city goes by in the data. Three of them are already in
// use — "New York City", "New York" and "Brooklyn" — and a borough written
// into an entry tomorrow must not read as another country.
const NEW_YORK = new Set([
  "New York City", "New York", "Brooklyn", "Manhattan", "Queens", "The Bronx", "Staten Island",
]);

// "Theatre" keeps the British spelling on an American site on purpose: it
// is how the Broadway houses spell their own names — the Walter Kerr
// Theatre, the Lyceum Theatre — and the art form is spelled that way in
// their own listings. The building on the corner is a movie theater; this
// is not that.
const TAGS: Record<string, Vocabulary> = {
  Theatre: { slug: "theatre", plural: "theatre", label: "Theatre" },
  Museums: { slug: "museums", plural: "museums" },
  Exhibitions: { slug: "exhibitions", plural: "exhibitions" },
  Festival: { slug: "festivals", plural: "festivals" },
  Parade: { slug: "parades", plural: "parades" },
  Architecture: { slug: "architecture", plural: "architecture", label: "Architecture" },
  Film: { slug: "film", plural: "film", label: "Film" },
  Science: { slug: "science", plural: "science", label: "Science" },
  Outdoors: { slug: "outdoors", plural: "the outdoors", label: "Outdoors" },
  Convention: { slug: "conventions", plural: "conventions" },
  // The one tag in this table that is a date rather than a kind. "Halloween"
  // does not describe the format of an event — a parade, a zoo, a hillside
  // of carved pumpkins have nothing in common as formats — it says which
  // week of the year they belong to, and it is exactly what gets typed.
  Halloween: { slug: "halloween", plural: "Halloween", label: "Halloween" },
  // Two more dates, and two because they are searched apart: "Christmas in
  // New York" is a season of rinks, trees and shows, "New Year's Eve in New
  // York" is one night and where to stand for it.
  Christmas: { slug: "christmas", plural: "Christmas", label: "Christmas" },
  "New Year's Eve": { slug: "new-years-eve", plural: "New Year's Eve", label: "New Year's Eve" },
};

// The one section cut by a fact rather than a field. "Free things to do in
// New York" is the qualifier the head query arrives with, and it is the one
// page here a reader can be let down by in a way they remember — so what
// lands on it is `tickets.priceFrom: 0`, recorded where the organizer says
// admission costs nothing, and nothing else. Four entries clear it; the zoo
// at Halloween says "free with zoo admission", which is a paid ticket.
const INTENTS = [
  { slug: "free", label: "Free", match: isFree },
];

export const NAV = {
  allLabel: "All",
  allTitle: "Everything on in New York",
  label: "By subject",
};

export function sections(items: FeedItem[]): Section[] {
  return buildSections({
    items,
    reserved: RESERVED,
    tags: TAGS,
    intents: INTENTS,
    placeOf: (i) => (NEW_YORK.has(i.city ?? "") ? undefined : i.country ?? i.city),
    copy: (g) => {
      if (g.kind === "intent") {
        return {
          title: "Free things to do in New York",
          description:
            "Free things to do in New York City: the Village Halloween Parade, the Feast of San Gennaro, the Brooklyn Book Festival and a free Peanuts exhibition — no ticket, no admission.",
          h1: "Free things to do in New York",
          lede: "Everything on this site that costs nothing to walk into — a parade you can watch or join, eleven days of Little Italy, eight stages of Brooklyn writers. Not a discount and not a program bundled into a paid ticket: no admission at all.",
          headings: {
            events: "No ticket, no admission",
            upcoming: "Still to come",
            past: "Already gone",
            news: "Worth knowing first",
          },
        };
      }
      // A place section here is somewhere the site is not, and the wording
      // follows the reader rather than the writer: whoever searches for
      // this page is planning a trip to the United States, not leaving
      // New York. So it says "in the USA" in the words of the query, and
      // the last line of the lede — not the first — is where the site's
      // own city gets mentioned. Opening with what a page is not argues
      // against the query it could win.
      //
      // The full name, not the label: /usa/ is the address because that is
      // what people type, but a heading reads "the United States". The
      // chip in the section row keeps the short label, where a heading's
      // worth of words would not fit.
      if (g.kind === "place") {
        return {
          title: `Events in the ${g.key}`,
          description: `Festivals, conventions and races in the ${g.key} worth the trip from New York — the dates as the organisers published them, with the source behind every entry.`,
          h1: `Events in the ${g.key}, a trip from New York`,
          lede: `Big American events with published dates, from the Rose Parade in January to the desert in August — each date as the organiser gave it, and a link to where we read it. New York's own listings are on the rest of the site.`,
        };
      }
      // The "X in New York" template works for a format and not for a
      // date: nobody searching this wants to know how we filed it, they
      // want to know where to stand and on which evening.
      if (g.key === "Halloween") {
        return {
          title: "Halloween in New York 2026: what is on",
          description:
            "Halloween in New York: the Village parade up Sixth Avenue, six weekends at the Bronx Zoo and the pumpkin blaze up the Hudson, from late September to 8 November — each date as the organiser published it.",
          h1: "Halloween in New York",
          lede: "Sixth Avenue on the 31st, the Bronx Zoo for six weekends, and seven thousand carved pumpkins an hour up the river — each date as the organiser gave it, and a link to where we read it.",
          headings: {
            events: "Where to go for Halloween",
            upcoming: "2026 dates",
            past: "Previous years",
            news: "Halloween news",
          },
        };
      }
      if (g.key === "Christmas") {
        return {
          title: "Christmas in New York 2026: what is on",
          description:
            "Christmas in New York: free skating at the Bryant Park Winter Village, the Rockettes at Radio City from November 4 and the Rockefeller Center tree lit on December 2 — each date as the organiser published it.",
          h1: "Christmas in New York",
          lede: "A free rink behind the library from the end of October, the Rockettes twice a day at Radio City, and the tree at Rockefeller Center lit on the first Wednesday in December — each date as the organiser gave it, and a link to where we read it.",
          headings: {
            events: "Where to go for Christmas",
            upcoming: "2026 dates",
            past: "Previous years",
            news: "Christmas news",
          },
        };
      }
      if (g.key === "New Year's Eve") {
        return {
          title: "New Year's Eve in New York 2026: where to go",
          description:
            "New Year's Eve in New York: where to see the year out, with the time, the price and the way in for each — as the organiser published it.",
          h1: "New Year's Eve in New York",
          lede: "Where to be at midnight on December 31, and what it takes to get there: the time, the price and the way in for each, as the organiser gave it, with a link to where we read it.",
          headings: {
            events: "Where to see the New Year in",
            upcoming: "This year's dates",
            past: "Previous years",
            news: "New Year's Eve news",
          },
        };
      }
      const what = g.voc.plural ?? g.key.toLowerCase();
      const Title = `${what[0].toUpperCase()}${what.slice(1)}`;
      return {
        title: `${Title} in New York: what is on and what changed`,
        description: `${Title} in New York — what is on, what changed, and the source behind every entry.`,
        h1: `${Title} in New York`,
        lede: `Everything on this site filed under ${what} — the date as the box office or the gallery published it, and a link to where we read it.`,
      };
    },
  });
}

// Every section this site builds, from its whole feed, computed once. The
// pages that need the list — the section route, and every detail page
// asking whether its own category earned an address — used to rebuild it
// per page from the same two feeds.
export const allSections = sections([...eventsBySite(siteId), ...newsBySite(siteId)]);

// The tag this site is pushing right now. It buys a link in the header of
// every page, the lead position in the tail of every event page, and that
// tail's heading in its own words — and it all switches itself off the day
// the last date under it passes, which is the only reason a seasonal
// promotion is safe to wire into a layout. See `promotedSection`.
//
// The seasons in the order they come round; see `promotedFirst`. From
// Boxing Day the one night outranks the season it ends, which is still
// running — the rink stays open until February.
const today = new Date().toISOString().slice(0, 10);
const PROMOTED = today.slice(5) >= "12-26"
  ? ["New Year's Eve", "Christmas"]
  : ["Halloween", "Christmas", "New Year's Eve"];

export const promoted = promotedFirst(allSections, PROMOTED, today, site.keyword);

// The word a heading uses for a kind, in this site's language. The article
// components know which kind a block came out as; only this file knows what
// that kind is called here, so it answers one question rather than handing
// over the table. A kind with no entry has no word, and the block keeps the
// generic heading — the same rule as rule 3 in @dst/content/sections, one
// level down.
export const pluralOf = (key: string): string | undefined => TAGS[key]?.plural;
