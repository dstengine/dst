// This site's sections. The rules live in @dst/content/sections; what is
// left here is the vocabulary and the wording.
//
// "Residency" is not in the table on purpose: it names the whole site, so a
// page called that would be the front page under a second address. "Golden
// visa" is out for the other reason — /golden/ is a written page on exactly
// that, and a section would compete with it.
import { buildSections, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";

const RESERVED = ["events", "news", "golden", "properties", "family", "consultation", "go", "li"];

const TAGS: Record<string, Vocabulary> = {
  "Visit visas": { slug: "visit-visas", plural: "visit visas" },
  "Medical visas": { slug: "medical-visas", plural: "medical visas" },
  Travel: { slug: "travel", plural: "travel", label: "Travel" },
  Conclave: { slug: "conferences", plural: "conferences", label: "Conferences" },
};

export const NAV = { label: "By subject" };

export function sections(items: FeedItem[]): Section[] {
  return buildSections({
    items,
    reserved: RESERVED,
    tags: TAGS,
    home: ["UAE", "United Arab Emirates"],
    copy: (g) => {
      const what = g.voc.plural ?? g.key.toLowerCase();
      const Title = `${what[0].toUpperCase()}${what.slice(1)}`;
      return {
        title: `${Title} and UAE residency`,
        description: `${Title} as they bear on UAE residency — what changed, when it takes effect, and the authority behind it.`,
        h1: `${Title} and UAE residency`,
        lede: `Everything on this site filed under ${what} — what changed, when it starts, and where we read it.`,
      };
    },
  });
}
