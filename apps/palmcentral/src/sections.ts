// This site's sections. The rules live in @dst/content/sections; what is
// left here is the vocabulary and the wording.
//
// A single development has a small feed, so nothing earns a page today. The
// row appears on the day a third construction item goes out, and nobody has
// to edit this file for it.
import { buildSections, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";

const RESERVED = [
  "events", "news", "prices", "payment-plan", "location",
  "golden-visa", "faq", "privacy", "go", "li",
];

// "Development" is absent: it names this site's only subject. Everything
// else here is a shape of news a buyer would want separated out.
const TAGS: Record<string, Vocabulary> = {
  Construction: { slug: "construction", plural: "construction", label: "Construction" },
  Infrastructure: { slug: "infrastructure", plural: "infrastructure", label: "Infrastructure" },
  Handovers: { slug: "handovers", plural: "handovers" },
  Market: { slug: "market", plural: "the market", label: "Market" },
  Exhibition: { slug: "exhibitions", plural: "exhibitions" },
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
        title: `${Title} at Palm Central`,
        description: `${Title} at Palm Central on Palm Jebel Ali — what changed, when, and the source behind every entry.`,
        h1: `${Title} at Palm Central`,
        lede: `Everything on this site filed under ${what} — with the date it was announced and the source we read it from.`,
      };
    },
  });
}
