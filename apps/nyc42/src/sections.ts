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
import { buildSections, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";

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
};

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
    placeOf: (i) => (NEW_YORK.has(i.city ?? "") ? undefined : i.country ?? i.city),
    copy: (g) => {
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
          description: `Festivals, conventions and races in the ${g.key} — the dates as the organisers published them, with the source behind every entry.`,
          h1: `Events in the ${g.key}`,
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
            "The parade, the zoo and the pumpkin blaze up the Hudson, from late September to the 1st of November — each date as the organiser published it.",
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
      const what = g.voc.plural ?? g.key.toLowerCase();
      const Title = `${what[0].toUpperCase()}${what.slice(1)}`;
      return {
        title: `${Title} in New York`,
        description: `${Title} in New York — what is on, what changed, and the source behind every entry.`,
        h1: `${Title} in New York`,
        lede: `Everything on this site filed under ${what} — the date as the box office or the gallery published it, and a link to where we read it.`,
      };
    },
  });
}
