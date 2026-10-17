// This site's sections: /transport/, /heritage/. The rules live in
// @dst/content/sections; what is left here is the vocabulary and the
// wording.
//
// No place sections: everything on this site is tagged "London", so the
// place rule would produce a /london/ page holding the whole site. `home`
// below is what stops it.
import { buildSections, promotedFirst, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";
import { eventsBySite } from "@dst/content/events";
import { newsBySite } from "@dst/content/news";
import { siteId } from "./content";
import { site } from "./site.config";

const RESERVED = ["about", "events", "news", "go", "li"];

// Listed generously — an entry costs nothing until three items sit under
// it, and then the page appears on its own. What is not listed here is what
// we would not want a page of: "Community" is a fine label on a card and a
// vague heading on a page.
const TAGS: Record<string, Vocabulary> = {
  Transport: { slug: "transport", plural: "transport", label: "Transport" },
  Heritage: { slug: "heritage", plural: "heritage", label: "Heritage" },
  Outdoors: { slug: "outdoors", plural: "the outdoors", label: "Outdoors" },
  Architecture: { slug: "architecture", plural: "architecture", label: "Architecture" },
  Culture: { slug: "culture", plural: "culture", label: "Culture" },
  Science: { slug: "science", plural: "science", label: "Science" },
  Sport: { slug: "sport", plural: "sport", label: "Sport" },
  Film: { slug: "film", plural: "film", label: "Film" },
  Food: { slug: "food", plural: "food and drink", label: "Food" },
  Markets: { slug: "markets", plural: "markets" },
  Festivals: { slug: "festivals", plural: "festivals" },
  // The one tag in this table that is a date rather than a kind. "Halloween"
  // does not describe the format of an event — a parade, a zoo, a film studio
  // in Hertfordshire have nothing in common as formats — it says which
  // week of the year they belong to, and it is exactly what gets typed.
  Halloween: { slug: "halloween", plural: "Halloween", label: "Halloween" },
  Fireworks: { slug: "fireworks", plural: "fireworks", label: "Fireworks" },
  // The winter's two dates. "New Year" rather than "New Year's Eve": out in
  // the boroughs the night is mostly at home, and the event is the parade
  // on the first.
  Christmas: { slug: "christmas", plural: "Christmas", label: "Christmas" },
  "New Year": { slug: "new-year", plural: "New Year", label: "New Year" },
};

export const NAV = {
  allLabel: "All",
  allTitle: "Everything on across London and its boroughs",
  label: "By subject",
};

export function sections(items: FeedItem[]): Section[] {
  return buildSections({
    items,
    reserved: RESERVED,
    tags: TAGS,
    // Both names for the same place. `placeOf` defaults to country before
    // city, so the entries that record "United Kingdom" — and only those —
    // would be filed a second time under a /uk/ page holding an arbitrary
    // slice of the site. One entry carried a country and stayed under the
    // threshold; four of them cross it.
    home: ["London", "United Kingdom"],
    copy: (g) => {
      // A date rather than a subject, so the generic template is wrong
      // twice over: it would file the week of the year as a genre, and it
      // would bury the only word anybody types.
      if (g.key === "Halloween") {
        return {
          title: "Halloween in London 2026: what is on",
          description:
            "Halloween 2026 across the London boroughs — two palaces over half term, ghost tours at the Royal Observatory before it closes, a scare-free week in Barnes. Each date as the organiser published it.",
          h1: "Halloween in London",
          lede: "Two palaces over half term, ghost tours at the Royal Observatory in its last week before a long closure, a scare-free week of wetland folklore in Barnes, a month of selected dates at the theme park inside the London boundary — and, out past the boroughs in Watford, a hundred pumpkins over the Great Hall for seven weeks. Each date as the organiser gave it, and where we read it.",
          headings: {
            events: "Where to go for Halloween",
            upcoming: "2026 dates",
            past: "Previous years",
            news: "Halloween news",
          },
        };
      }
      // Searched as Bonfire Night as often as fireworks, and for the year:
      // the generic "Fireworks in London" heading carries neither.
      if (g.key === "Fireworks") {
        return {
          title: "Bonfire Night fireworks in London 2026: where to go",
          description:
            "Bonfire Night 2026 in the London boroughs: a free display at Coram's Fields and Merton's at Wimbledon Park on the 5th, then Blackheath, Alexandra Palace and Battersea Park on Saturday 7 November.",
          h1: "Bonfire Night fireworks in London",
          lede: "Bonfire Night falls on a Thursday this year, so London has two of them: the fifth itself, with a free display in a Bloomsbury children's park and Merton's two shows at Wimbledon Park, and the Saturday after, when Blackheath, Alexandra Palace, Battersea Park and Morden Park all go up on the same evening. Each date, time and price as the organiser published it.",
          headings: {
            events: "Where to watch the fireworks",
            upcoming: "2026 displays",
            past: "Previous years",
            news: "Fireworks news",
          },
        };
      }
      if (g.key === "Christmas") {
        return {
          title: "Christmas in London 2026: what is on across the boroughs",
          description:
            "Christmas 2026 across the London boroughs: the light trail at Kew from 13 November and the rest of the season out past the centre — each date as the organiser published it.",
          h1: "Christmas in London",
          lede: "Kew lit up after dark from the middle of November, and the rest of the season out past the West End — markets, rinks and carols in the boroughs. Each date, time and price as the organiser gave it, and where we read it.",
          headings: {
            events: "Where to go for Christmas",
            upcoming: "2026 dates",
            past: "Previous years",
            news: "Christmas news",
          },
        };
      }
      if (g.key === "New Year") {
        return {
          title: "New Year in London: 31 December and 1 January",
          description:
            "New Year in London: the free London Parade from Piccadilly to Parliament Square on 1 January, and where to see the year out the night before — each time as the organiser published it.",
          h1: "New Year in London",
          lede: "The night of the 31st and the morning after: the free parade through Westminster on New Year's Day, and the places to see the year out in the boroughs. Each date and time as the organiser gave it, and where we read it.",
          headings: {
            events: "Where to see the New Year in",
            upcoming: "This year's dates",
            past: "Previous years",
            news: "New Year news",
          },
        };
      }
      const what = g.voc.plural ?? g.key.toLowerCase();
      const Title = `${what[0].toUpperCase()}${what.slice(1)}`;
      return {
        title: `${Title} in London: what is on across the boroughs`,
        description: `${Title} across London and its boroughs — what is on, what has changed, and the source behind every entry.`,
        h1: `${Title} in London`,
        lede: `Everything on this site filed under ${what}, from the outer boroughs in — with a date and a source on each one.`,
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
// Halloween until the night itself, then Bonfire Night, then Christmas, then
// the New Year. Each switches off on its own once its last date passes, and
// `promotedFirst` takes the first still standing. The date only settles who
// leads where two overlap: the week after Halloween, when a palace or a
// studio tour is still running its season and the fireworks are what people
// are looking for; and the week after Christmas, when Kew is still lit and
// the parade is what is coming.
const today = new Date().toISOString().slice(0, 10);
const PROMOTED = today.slice(5) <= "10-31"
  ? ["Halloween", "Fireworks", "Christmas", "New Year"]
  : today.slice(5) >= "12-26"
    ? ["New Year", "Christmas"]
    : ["Fireworks", "Christmas", "New Year"];

export const promoted = promotedFirst(allSections, PROMOTED, today, site.keyword);

// The word a heading uses for a kind, in this site's language. The article
// components know which kind a block came out as; only this file knows what
// that kind is called here, so it answers one question rather than handing
// over the table. A kind with no entry has no word, and the block keeps the
// generic heading — the same rule as rule 3 in @dst/content/sections, one
// level down.
export const pluralOf = (key: string): string | undefined => TAGS[key]?.plural;
