// This site's sections. The rules live in @dst/content/sections; what is
// left here is the vocabulary and the wording.
//
// Two labels are deliberately absent. "Tax" is the site's most frequent one
// and /taxation/ is a written page on the same subject — a section would be
// a thinner second version of it, competing with the page we actually want
// read. "Free zones" is the same story against /zones/, and "Business"
// names the whole site. What is not in the table gets no page.
import { buildSections, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";

const RESERVED = [
  "events", "news", "zones", "mainland", "registration",
  "taxation", "banking", "financing", "payments", "go", "li",
];

const TAGS: Record<string, Vocabulary> = {
  Regulation: { slug: "regulation", plural: "regulation", label: "Regulation" },
  Conference: { slug: "conferences", plural: "conferences" },
  Banking: { slug: "banking-news", plural: "banking", label: "Banking" },
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
        title: `${Title} for a Dubai company`,
        description: `${Title} as it affects a Dubai company — what changed, when it takes effect, and the authority that said so.`,
        h1: `${Title} for a Dubai company`,
        lede: `Everything on this site filed under ${what} — what changed, when it starts, and the authority we read it from.`,
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
