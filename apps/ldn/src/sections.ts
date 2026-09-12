// This site's sections: /music/, /festivals/, /art/. The rules — how many
// entries a slice needs before it earns a page, which slugs are already
// spoken for — live in @dst/content/sections. What is left here is the
// vocabulary and the wording.
//
// No place sections. Every entry on this site is tagged "London", so the
// place rule would hand us a /london/ page holding precisely what /events/
// holds; `home` below is what stops it. That is not a limitation of the
// data, it is what a single-city site is.
import { buildSections, type Section, type Vocabulary } from "@dst/content/sections";
import { isFree } from "@dst/content/admission";
import type { FeedItem } from "@dst/content/sections";

const RESERVED = ["about", "events", "news", "go", "li"];

// The one section on this site cut by a fact rather than a field. "Free
// things to do in London" is the qualifier the head query actually arrives
// with, and it is the one page here a reader can be let down by in a way
// they will remember — so what lands on it is `tickets.priceFrom: 0`,
// written down where the organiser said admission costs nothing, and
// nothing else. Seven entries clear it; four more say "free" somewhere in
// their copy and mean a members' discount, an included programme or a
// spectacle that used to be free and is ticketed now.
const INTENTS = [
  { slug: "free", label: "Free", match: isFree },
];

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
          title: "Halloween in central London 2026: what is on",
          description:
            "Kew after dark, the Tower over half term and a free afternoon in Hyde Park, from 16 October to 1 November — each date as the organiser published it.",
          h1: "Halloween in central London",
          lede: "An illuminated trail through Kew, nine days of it at the Tower and three free afternoons in Hyde Park — with the dates the organisers themselves published, not the ones the listings sites repeat.",
          headings: {
            events: "Where to go for Halloween",
            upcoming: "2026 dates",
            past: "Previous years",
            news: "Halloween news",
          },
        };
      }
      const what = g.voc.plural ?? g.key.toLowerCase();
      return {
        title: `${what[0].toUpperCase()}${what.slice(1)} in central London`,
        description: `${what[0].toUpperCase()}${what.slice(1)} in central London — dates confirmed with the organiser, and the source on every entry.`,
        h1: `${what[0].toUpperCase()}${what.slice(1)} in central London`,
        lede: `Everything on this site filed under ${what} — what is on, when it is on, and where we read it.`,
      };
    },
  });
}
