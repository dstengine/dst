// This site's sections: /transport/, /heritage/. The rules live in
// @dst/content/sections; what is left here is the vocabulary and the
// wording.
//
// No place sections: everything on this site is tagged "London", so the
// place rule would produce a /london/ page holding the whole site. `home`
// below is what stops it.
import { buildSections, promotedSection, type Section, type Vocabulary } from "@dst/content/sections";
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
            "Halloween 2026 across the London boroughs — two palaces over half term, a scare-free week in Barnes, a month of theme-park dates in Kingston upon Thames. Each date as the organiser published it.",
          h1: "Halloween in London",
          lede: "Two palaces over half term, a scare-free week of wetland folklore in Barnes, a month of selected dates at the theme park inside the London boundary — and, out past the boroughs in Watford, a hundred pumpkins over the Great Hall for seven weeks. Each date as the organiser gave it, and where we read it.",
          headings: {
            events: "Where to go for Halloween",
            upcoming: "2026 dates",
            past: "Previous years",
            news: "Halloween news",
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
const PROMOTED = 'Halloween';

export const promoted = promotedSection(allSections, PROMOTED, new Date().toISOString().slice(0, 10), site.keyword);
