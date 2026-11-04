// This site's sections: /music/, /festivals/, /art/. The rules — how many
// entries a slice needs before it earns a page, which slugs are already
// spoken for — live in @dst/content/sections. What is left here is the
// vocabulary and the wording.
//
// No place sections. Every entry on this site is tagged "London", so the
// place rule would hand us a /london/ page holding precisely what /events/
// holds; `home` below is what stops it. That is not a limitation of the
// data, it is what a single-city site is.
import { buildSections, promotedFirst, type Copy, type Intent, type Section, type Vocabulary } from "@dst/content/sections";
import { isFree } from "@dst/content/admission";
import type { FeedItem } from "@dst/content/sections";
import { eventsBySite } from "@dst/content/events";
import { newsBySite } from "@dst/content/news";
import { siteId } from "./content";
import { site } from "./site.config";

const RESERVED = ["about", "events", "news", "go", "li"];

// The one section on this site cut by a fact rather than a field. "Free
// things to do in London" is the qualifier the head query actually arrives
// with, and it is the one page here a reader can be let down by in a way
// they will remember — so what lands on it is `tickets.priceFrom: 0`,
// written down where the organiser said admission costs nothing, and
// nothing else. Seven entries clear it; four more say "free" somewhere in
// their copy and mean a members' discount, an included programme or a
// spectacle that used to be free and is ticketed now.
//
// The other three are the shapes Christmas takes in central London, each
// searched on its own: the switch-ons, the markets, the rinks. They stay
// filed under Christmas, because that is what they are, and the tag on the
// entry says which of the three — never read off a title. Winter
// Wonderland carries two, a market and a rink, because it is both.
const tagged = (tag: string) => (item: FeedItem) => item.tags?.includes(tag) ?? false;

const INTENTS: Intent<FeedItem>[] = [
  { slug: "free", label: "Free", match: (item) => "tickets" in item && isFree(item) },
  { slug: "christmas-lights", label: "Christmas lights", match: tagged("christmas-lights") },
  { slug: "christmas-markets", label: "Christmas markets", match: tagged("christmas-markets") },
  { slug: "ice-skating", label: "Ice skating", match: tagged("ice-skating") },
];

const SEASON: Record<string, Copy> = {
  "christmas-lights": {
    title: "London Christmas lights switch-on 2026: dates by street",
    description:
      "London Christmas lights switch-on 2026, by street: Regent Street 5 Nov, Oxford Street 9 Nov, Bond Street and Covent Garden 12 Nov, Ludgate Circus 18, Leadenhall 19.",
    h1: "Christmas lights in central London",
    lede: "Christmas lights switch-ons in central London for 2026, street by street, among them the angels on Regent Street, Harry Potter on Oxford Street, Bond Street and Covent Garden on the same Thursday, and two evenings in the City, at Ludgate Circus and Leadenhall Market. Every date comes from the organiser's own page, and a time is given only where the organiser has published one.",
    headings: {
      events: "Christmas lights switch-ons, street by street",
      upcoming: "2026 dates",
      // Not "Already gone": a street that has switched on keeps its lights
      // up for the season.
      past: "Already switched on",
      news: "Christmas lights news",
    },
  },
  "christmas-markets": {
    title: "Christmas markets in central London 2026: opening dates",
    description:
      "Christmas markets in London 2026 by opening date: Leicester Square 31 Oct, Southbank Centre 2 Nov, London Bridge City 10 Nov, Hyde Park 19 Nov, King's Cross 20 Nov.",
    h1: "Christmas markets in central London",
    lede: "The 2026 Christmas markets in central London, in the order they open: the stalls at the Leicester Square ice rink, the chalets on Queen's Walk by the Southbank Centre, Winter by the River between London Bridge and Tower Bridge, the Christmas Market at Hyde Park Winter Wonderland, with more than 60 traders, and seven markets at King's Cross, among them a new one on Granary Square. All five run to 3 January. Winter Wonderland is the only one that needs an entry ticket. The dates and hours here are the ones each organiser publishes.",
    headings: {
      events: "Christmas markets in central London, by opening date",
      upcoming: "2026 dates",
      past: "Already gone",
      news: "Christmas market news",
    },
  },
  "ice-skating": {
    title: "Ice skating in London 2026: the rinks and their dates",
    description:
      "Ice skating in London 2026: Leicester Square from 31 October, Glide at Battersea from 6 November, Somerset House from 11 November, Winter Wonderland from 19 November.",
    h1: "Ice skating in central London",
    lede: "Four rinks in central London for winter 2026: Skate Leicester Square, open since 31 October, Glide by the Thames at Battersea Power Station from 6 November, the courtyard rink at Somerset House from 11 November and the rink inside Hyde Park Winter Wonderland from 19 November. Three of them close on 3 January and Somerset House on 10 January, all four are shut on Christmas Day, and for skating outside the season there is Queens, the indoor rink on Queensway in Bayswater that is open all year round. Each date here is the one the organiser published.",
    headings: {
      events: "Where to skate in central London",
      upcoming: "2026 dates",
      past: "Already gone",
      news: "Ice skating news",
    },
  },
};

// A tag earns a page only if it is written down here, because the slug and
// the heading are both guesses otherwise — "Exhibitions" would be fine and
// "Architecture" would come out as /architecture/ meaning the buildings
// rather than the walks. Listed generously: an entry costs nothing until
// three items sit under it, and then the page appears on its own.
//
// "Days out" is deliberately absent. It is a useful label on a card and a
// terrible page: it describes how we filed something, not what a reader
// came looking for.
const TAGS: Record<string, Vocabulary> = {
  Music: { slug: "music", plural: "music", label: "Music" },
  Festival: { slug: "festivals", plural: "festivals" },
  // "Art" was a second name for this and had its own page. The two said the
  // same thing about the same five entries — a plinth, a sculpture park, the
  // Bayeux Tapestry — and "exhibitions in London" is what people type.
  // /art/ redirects here; see packages/content/src/redirects.ts.
  Exhibitions: { slug: "exhibitions", plural: "exhibitions" },
  Museums: { slug: "museums", plural: "museums" },
  Theatre: { slug: "theatre", plural: "theatre", label: "Theatre" },
  Film: { slug: "film", plural: "film", label: "Film" },
  Carnival: { slug: "carnival", plural: "carnival", label: "Carnival" },
  Architecture: { slug: "architecture", plural: "architecture", label: "Architecture" },
  Transport: { slug: "transport", plural: "transport", label: "Transport" },
  Science: { slug: "science", plural: "science", label: "Science" },
  Procession: { slug: "processions", plural: "processions" },
  // The one tag in this table that is a date rather than a kind. "Halloween"
  // does not describe the format of an event — a parade, a zoo, a botanic
  // garden after dark have nothing in common as formats — it says which
  // week of the year they belong to, and it is exactly what gets typed.
  Halloween: { slug: "halloween", plural: "Halloween", label: "Halloween" },
  // Two more dates, searched apart: Christmas is six weeks of lights, rinks
  // and fairs; New Year's Eve is one night and where to watch it.
  Christmas: { slug: "christmas", plural: "Christmas", label: "Christmas" },
  "New Year's Eve": { slug: "new-years-eve", plural: "New Year's Eve", label: "New Year's Eve" },
};

export const NAV = {
  allLabel: "All",
  allTitle: "Everything on in central London",
  label: "By subject",
};

export function sections(items: FeedItem[]): Section[] {
  return buildSections({
    items,
    reserved: RESERVED,
    tags: TAGS,
    intents: INTENTS,
    // Both names for the same place. `placeOf` defaults to country before
    // city, so the entries that record "United Kingdom" — and only those —
    // would be filed a second time under a /uk/ page holding an arbitrary
    // slice of the site. One entry carried a country and stayed under the
    // threshold; four of them cross it.
    home: ["London", "United Kingdom"],
    copy: (g) => {
      if (g.kind === "intent" && SEASON[g.key]) return SEASON[g.key];
      if (g.kind === "intent") {
        return {
          title: "Free things to do in central London",
          description:
            "Free things to do in central London: carnival, the Lord Mayor's Show, Open House and a free sculpture park — no ticket, no admission charge, each one as the organiser publishes it.",
          h1: "Free things to do in central London",
          lede: "Everything on this site that costs nothing to walk into. Not a members' discount and not a programme included in a paid ticket — no admission charge at all, which is a narrower list than the word usually gets used for.",
          headings: {
            events: "No ticket, no charge",
            upcoming: "Still to come",
            past: "Already gone",
            news: "Worth knowing first",
          },
        };
      }
      // A date, not a format: "Halloween in central London" is the query,
      // and the generic template would file it as though it were a genre.
      if (g.key === "Halloween") {
        return {
          title: "Halloween in central London 2026: Kew, the Tower, Leadenhall",
          description:
            "Halloween in central London 2026, date by date: Kew after dark to 1 November, ghosts at the Tower, the beetle at Leadenhall, free afternoons in Hyde Park.",
          h1: "Halloween in central London",
          lede: "The 2026 season, date by date: an illuminated trail through Kew to 1 November, nine days of ghosts at the Tower, a giant beetle under the roof of Leadenhall Market to the same Sunday, three free afternoons in Hyde Park over half term and Day of the Dead at Camden Market on the 1st — with the dates the organisers themselves published, not the ones the listings sites repeat.",
          headings: {
            events: "Halloween 2026 in central London, date by date",
            upcoming: "2026 dates",
            past: "Already gone",
            news: "Halloween news",
          },
        };
      }
      if (g.key === "Christmas") {
        return {
          title: "Christmas in central London 2026: what is on",
          description:
            "Christmas in central London: the Regent Street lights, lit on 5 November, Winter Wonderland in Hyde Park from 19 November and the rink at Somerset House — each date as the organiser published it.",
          h1: "Christmas in central London",
          lede: "Regent Street closes to traffic for the switch-on, Hyde Park fills with a fair for six weeks, and the courtyard at Somerset House turns to ice — with the dates the organisers themselves published, not the ones the listings sites repeat.",
          headings: {
            events: "Where to go for Christmas",
            upcoming: "2026 dates",
            past: "Already gone",
            news: "Christmas news",
          },
        };
      }
      if (g.key === "New Year's Eve") {
        return {
          title: "New Year's Eve in central London 2026: where to go",
          description:
            "New Year's Eve in central London: where to see the year out, with the time, the price and how to get a place — as the organiser published it.",
          h1: "New Year's Eve in central London",
          lede: "Where to be at midnight on 31 December, and what it takes to get there — the time, the price and the way in, as the organiser gave it rather than as the listings sites repeat it.",
          headings: {
            events: "Where to see the New Year in",
            upcoming: "This year's dates",
            past: "Already gone",
            news: "New Year's Eve news",
          },
        };
      }
      const what = g.voc.plural ?? g.key.toLowerCase();
      return {
        title: `${what[0].toUpperCase()}${what.slice(1)} in central London: dates from the organiser`,
        description: `${what[0].toUpperCase()}${what.slice(1)} in central London — dates confirmed with the organiser, and the source on every entry.`,
        h1: `${what[0].toUpperCase()}${what.slice(1)} in central London`,
        lede: `Everything on this site filed under ${what} — what is on, when it is on, and where we read it.`,
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
// running — Winter Wonderland stays open until 3 January.
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
