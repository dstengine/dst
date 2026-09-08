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
      // A place section here is by definition somewhere the site is not, so
      // it cannot borrow the "in New York" heading the subject pages use —
      // that would be the false sentence the keyword rule exists to stop.
      // It says what it is instead, and the description carries New York
      // honestly, because who the page is written for is the true part.
      if (g.kind === "place") {
        return {
          title: `Events across the ${g.label}`,
          description: `Festivals, conventions and shows across the ${g.label} — the ones worth leaving New York for, with the source behind every entry.`,
          h1: `Across the ${g.label}`,
          lede: `Everything on this site that happens outside the city — the date as the organiser published it, and a link to where we read it.`,
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
