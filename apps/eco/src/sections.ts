// This site's sections. The rules live in @dst/content/sections; what is
// left here is the vocabulary and the wording.
//
// "Environment" is not in the table, and it is the most common label on the
// site. It is a good word on a card and a useless page: it names the whole
// portfolio, so a page called that would be the front page at a second
// address. The same job `home` does for the place.
//
// No section earns a page today — nothing but the excluded label has three
// entries. That is the rule working, not a fault: the row appears on the day
// the third energy item goes out, and nobody has to touch this file.
import { buildSections, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";

const RESERVED = ["events", "news", "go", "li"];

const TAGS: Record<string, Vocabulary> = {
  Energy: { slug: "energy", plural: "energy", label: "Energy" },
  Shipping: { slug: "shipping", plural: "shipping", label: "Shipping" },
  Exhibition: { slug: "exhibitions", plural: "exhibitions" },
  Forestry: { slug: "forestry", plural: "forestry", label: "Forestry" },
  Planting: { slug: "planting", plural: "planting", label: "Planting" },
};

export const NAV = { label: "By subject" };

export function sections(items: FeedItem[]): Section[] {
  return buildSections({
    items,
    reserved: RESERVED,
    tags: TAGS,
    home: ["Dubai", "United Arab Emirates"],
    copy: (g) => {
      const what = g.voc.plural ?? g.key.toLowerCase();
      const Title = `${what[0].toUpperCase()}${what.slice(1)}`;
      return {
        title: `${Title} in the DST eco portfolio`,
        description: `What the eco portfolio reads and publishes on ${what}, with the source and the date on every entry.`,
        h1: Title,
        lede: `Everything in the portfolio filed under ${what} — each entry with the figure it turns on, the source it came from, and the date we read it.`,
      };
    },
  });
}
