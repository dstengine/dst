// This site's sections. The rules — how many entries a slice needs before
// it earns a page, which slugs are already spoken for — live in
// @dst/content/sections; what is left here is the vocabulary.
//
// No place sections: every entry is London, so the place rule would hand
// us a /london/ page holding precisely what /events/ holds. `home` below
// is what stops it.
import { buildSections, promotedFirst, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";
import { eventsBySite } from "@dst/content/events";
import { newsBySite } from "@dst/content/news";
import { siteId } from "./content";
import { site } from "./site.config";

const RESERVED = ["about", "events", "news", "go", "li"];

// A tag earns a page only once three entries sit under it, so these cost
// nothing until then. The calendar's kinds: the sporting fixtures that fix
// their dates a year out, the shows, and the nights of the year.
const TAGS: Record<string, Vocabulary> = {
  Sport: { slug: "sport", plural: "sport", label: "Sport" },
  Gardens: { slug: "gardens", plural: "garden shows", label: "Gardens" },
  Music: { slug: "music", plural: "music", label: "Music" },
  Festival: { slug: "festivals", plural: "festivals" },
  // A date, not a format, and exactly what gets typed.
  "New Year's Eve": { slug: "new-years-eve", plural: "New Year's Eve", label: "New Year's Eve" },
};

export const NAV = {
  allLabel: "All",
  allTitle: "Every big London date on this calendar",
  label: "By subject",
};

export function sections(items: FeedItem[]): Section[] {
  return buildSections({
    items,
    reserved: RESERVED,
    tags: TAGS,
    home: ["London", "United Kingdom"],
    copy: (g) => {
      if (g.key === "New Year's Eve") {
        return {
          title: "New Year's Eve in London 2026: fireworks and tickets",
          description:
            "New Year's Eve in London: the Thames fireworks on 31 December 2026, the ticket release and the viewing areas, as the Mayor of London published them.",
          h1: "New Year's Eve in London",
          lede: "Where to be at midnight on 31 December and what it takes to get there — the time, the price and the way in, as the organiser gave them.",
          headings: {
            events: "Where to see the New Year in",
            upcoming: "This year's dates",
            past: "Previous years",
            news: "New Year's Eve news",
          },
        };
      }
      const what = g.voc.plural ?? g.key.toLowerCase();
      const What = `${what[0].toUpperCase()}${what.slice(1)}`;
      return {
        title: `${What} in London: the year's dates from the organiser`,
        description: `${What} in London for the year ahead — every date confirmed with the organiser, and the source on every entry.`,
        h1: `${What} in London`,
        lede: `Everything on this calendar filed under ${what} — when it is, where, and where we read it.`,
      };
    },
  });
}

// Every section this site builds, computed once for the pages that ask.
export const allSections = sections([...eventsBySite(siteId), ...newsBySite(siteId)]);

// The tag pushed in the header while its date is still to come; it switches
// itself off when the last date under it has gone. See `promotedFirst`.
const today = new Date().toISOString().slice(0, 10);
const PROMOTED = ["New Year's Eve"];

export const promoted = promotedFirst(allSections, PROMOTED, today, site.keyword);

// The word a heading uses for a kind, in this site's language.
export const pluralOf = (key: string): string | undefined => TAGS[key]?.plural;
