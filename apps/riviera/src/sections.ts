// This district's sections. The rules live in @dst/content/sections; what is
// left here is the vocabulary and the wording.
//
// The written guide pages — coffee, food, pools, water, money, rent — are
// reserved, so a label that shares a name with one of them can never take
// its address. Sections file the news and events feed; they do not compete
// with the guide.
//
// No place sections: everything here is Azizi Riviera, so the place rule would
// produce a page holding the whole site. `home` below is what stops it.
import { buildSections, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";

const RESERVED = ["coffee", "food", "pools", "water", "money", "rent", "news", "events", "go", "li"];

const TAGS: Record<string, Vocabulary> = {
  Infrastructure: { slug: "infrastructure", plural: "infrastructure", label: "Infrastructure" },
  Development: { slug: "development", plural: "development", label: "Development" },
  Transport: { slug: "transport", plural: "transport", label: "Transport" },
  Sport: { slug: "sport", plural: "sport", label: "Sport" },
  Design: { slug: "design", plural: "design", label: "Design" },
  Market: { slug: "market", plural: "the market", label: "Market" },
};

export const NAV = { label: "By subject" };

export function sections(items: FeedItem[]): Section[] {
  return buildSections({
    items,
    reserved: RESERVED,
    tags: TAGS,
    home: "Dubai",
    copy: (g) => {
      const what = g.voc.plural ?? g.key.toLowerCase();
      const Title = `${what[0].toUpperCase()}${what.slice(1)}`;
      return {
        title: `${Title} in Azizi Riviera`,
        description: `${Title} in Azizi Riviera — what changed, when, and the source behind every entry.`,
        h1: `${Title} in Azizi Riviera`,
        lede: `Everything on this site filed under ${what} — with the date it was announced and where we read it.`,
      };
    },
  });
}
