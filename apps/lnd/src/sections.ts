// This site's sections: /transport/, /heritage/. The rules live in
// @dst/content/sections; what is left here is the vocabulary and the
// wording.
//
// No place sections: everything on this site is tagged "London", so the
// place rule would produce a /london/ page holding the whole site. `home`
// below is what stops it.
import { buildSections, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";

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
};

export const NAV = {
  allLabel: "All",
  allTitle: "Everything on across Greater London",
  label: "By subject",
};

export function sections(items: FeedItem[]): Section[] {
  return buildSections({
    items,
    reserved: RESERVED,
    tags: TAGS,
    home: "London",
    copy: (g) => {
      const what = g.voc.plural ?? g.key.toLowerCase();
      const Title = `${what[0].toUpperCase()}${what.slice(1)}`;
      return {
        title: `${Title} in Greater London`,
        description: `${Title} across Greater London — what is on, what has changed, and the source behind every entry.`,
        h1: `${Title} in Greater London`,
        lede: `Everything on this site filed under ${what}, from the outer boroughs in — with a date and a source on each one.`,
      };
    },
  });
}
