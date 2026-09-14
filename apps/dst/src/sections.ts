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

// The vertical sections own their addresses at the root too, so a tag
// that happened to be called "Eco" could not take one out from under
// them and win the route silently.
import { VERTICALS } from "./verticals";

const RESERVED = ["contact", "events", "news", "go", "li", "sections", ...VERTICALS.map((v) => v.slug)];

// Only subjects the group actually works in get a page. "Trade" and
// "Energy" are real labels on a card and would be pages about someone
// else's beat.
const TAGS: Record<string, Vocabulary> = {
  Market: { slug: "market", plural: "the property market", label: "Market" },
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
      // The chip says "Tech" because a row of chips is read at a glance; a
      // page heading that says "Tech" says nothing at all.
      const HEADINGS: Record<string, { h1: string; title: string }> = {
        Market: { h1: "The Dubai property market", title: "Dubai property market news" },
        Tech: { h1: "Technology in Dubai", title: "Dubai technology news, with a source and a date" },
        AI: { h1: "AI in Dubai", title: "Dubai AI news, with a source and a date on each" },
        Crypto: { h1: "Crypto", title: "The crypto news DST follows from Dubai" },
        "Real estate": { h1: "Real estate", title: "Dubai real estate, as DST reads it" },
      };
      const named = HEADINGS[g.key] ?? { h1: g.label, title: g.label };
      return {
        title: named.title,
        description: `What DST reads and publishes on ${what} from Dubai, with the source and the date on every entry.`,
        h1: named.h1,
        lede: `What the group publishes on ${what} — each entry with the figure it turns on, the source it came from, and the date we read it.`,
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
