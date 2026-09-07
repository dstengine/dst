// This site's sections: /theatre/, /museums/. The rules live in
// @dst/content/sections; what is left here is the vocabulary and the
// wording.
//
// No place sections: every entry is tagged "New York City", so the place
// rule would produce a /new-york-city/ page holding the whole site. `home`
// below is what stops it. The interesting geography here is the borough,
// which the data does not carry yet — when it does, this is where it goes.
import { buildSections, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";

const RESERVED = ["about", "events", "news", "go", "li"];

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
    home: "New York City",
    copy: (g) => {
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
