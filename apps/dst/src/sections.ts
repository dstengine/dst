// The hub's own sections: /market/, /tech/. The rules live in
// @dst/content/sections; what is left here is the vocabulary and the
// wording.
//
// These slice the group's own feed, not the network's. The roundups further
// down /news/ and /events/ carry items from six other hosts, and a section
// page that mixed them would be linking away from itself on every card
// while claiming to be a page about the subject.
//
// No place sections: everything the hub files is Dubai.
import { buildSections, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";

const RESERVED = ["contact", "events", "news", "go", "li"];

// Only subjects the group actually works in get a page. "Trade" and
// "Energy" are real labels on a card and would be pages about someone
// else's beat.
const TAGS: Record<string, Vocabulary> = {
  Market: { slug: "market", plural: "the Dubai property market", label: "Market" },
  Tech: { slug: "tech", plural: "technology", label: "Tech" },
  AI: { slug: "ai", plural: "AI", label: "AI" },
  Crypto: { slug: "crypto", plural: "crypto", label: "Crypto" },
  "Real estate": { slug: "real-estate", plural: "real estate", label: "Real estate" },
};

// No "all" chip: the group's feed is two feeds at two addresses, and a
// single chip cannot honestly point at both. The header carries News and
// Events, which is where "all of it" already lives.
export const NAV = { label: "By subject" };

export function sections(items: FeedItem[]): Section[] {
  return buildSections({
    items,
    reserved: RESERVED,
    tags: TAGS,
    home: "Dubai",
    copy: (g) => {
      const what = g.voc.plural ?? g.key.toLowerCase();
      // "the Dubai property market" reads as a heading and not as a title
      // case noun, so the two are kept apart rather than upper-casing the
      // first letter of whatever comes out of the table.
      const heading = g.key === "Market" ? "The Dubai property market" : g.label;
      return {
        title: heading,
        description: `What DST reads and publishes on ${what}, with the source and the date on every entry.`,
        h1: heading,
        lede: `What the group publishes on ${what} — each entry with the figure it turns on, the source it came from, and the date we read it.`,
      };
    },
  });
}
