// This district's sections. The rules live in @dst/content/sections; what is
// left here is the vocabulary and the wording.
//
// The written guide pages — coffee, food, pools, water, money, rent — are
// reserved, so a label that shares a name with one of them can never take
// its address. Sections file the news and events feed; they do not compete
// with the guide.
//
// No place sections: everything here is Azizi Riviera, so the place rule would
// produce a page holding the whole site. `home` below is what stops it, and it
// names both the city and the country because entries carry either field \u2014
// listing only "Dubai" left the ones with a country asking for a page of
// their own.
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
    home: ["Dubai", "United Arab Emirates"],
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

// The word a heading uses for a kind, in this site's language. The article
// components know which kind a block came out as; only this file knows what
// that kind is called here, so it answers one question rather than handing
// over the table. A kind with no entry has no word, and the block keeps the
// generic heading — the same rule as rule 3 in @dst/content/sections, one
// level down.
export const pluralOf = (key: string): string | undefined => TAGS[key]?.plural;
