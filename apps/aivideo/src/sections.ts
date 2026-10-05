// This site's sections: one page per tool or model — /comfyui/, /kling/ —
// and one for the guides. The rules — how many entries a section needs,
// which slugs are already spoken for — live in @dst/content/sections. What
// is left here is the vocabulary and the wording.
import { buildSections, type Intent, type Section, type Vocabulary } from "@dst/content/sections";
import type { NewsItem } from "@dst/content/types";

export type { Section };

// Slugs the site already spends on pages of its own.
const RESERVED = ["about", "news", "go", "li"];

// What kind of piece an entry is. "News" gets no page: it would be /news/
// at a second address. A guide is a different promise — it is still true in
// a month — and "AI video guides" is a thing people search for.
const KINDS: Record<string, Vocabulary> = {
  Guide: { plural: "guides" },
};

/** A tool or a model the site follows, and how its page talks about it. */
interface Subject {
  /** As it stands in `tags` on the entries. */
  tag: string;
  slug: string;
  /** The chip. */
  label: string;
  /** Who makes it, for the sentence that introduces the page. */
  maker: string;
  /** What it is, in a phrase: "the node-based workflow app". */
  what: string;
}

/** A tag for who a piece is for rather than what it is about. It has no
    maker and no product to describe, so its page says what it collects. */
interface Audience {
  tag: string;
  slug: string;
  label: string;
  title: string;
  description: string;
  h1: string;
  lede: string;
}

// Five, because a tag page with one entry under it is a slice of our own
// filing, and these five are the names this feed keeps coming back to.
// Each is the word a reader types: "kling", not "kuaishou video".
const SUBJECTS: Subject[] = [
  { tag: "ComfyUI", slug: "comfyui", label: "ComfyUI", maker: "Comfy Org", what: "the node-based workflow app for running image and AI video models" },
  { tag: "Kling", slug: "kling", label: "Kling", maker: "Kling AI", what: "Kuaishou's AI video generator" },
  { tag: "Grok Imagine", slug: "grok-imagine", label: "Grok Imagine", maker: "xAI", what: "the image and AI video generator in Grok and the xAI API" },
  { tag: "LTX", slug: "ltx", label: "LTX", maker: "Lightricks", what: "the open-weights AI video and audio model family" },
  { tag: "MiniMax", slug: "minimax", label: "MiniMax Hailuo", maker: "MiniMax", what: "the AI video models behind Hailuo AI, H3 among them" },
];

// The pieces on how to write for a video model. What a screenwriter
// searches for is the prompt, so that is the word the page leads with.
const AUDIENCES: Audience[] = [
  {
    tag: "Screenwriters",
    slug: "screenwriters",
    label: "For screenwriters",
    title: "AI video prompts for screenwriters",
    description: "AI video prompts for screenwriters: how Kling, LTX and MiniMax H3 want a scene written — shot lists, keyframes, dialogue and cuts, from each maker's own guide.",
    h1: "AI video prompts for screenwriters",
    lede: `How to write a scene so a video model can shoot it: the shot list, the keyframes, the dialogue and the cuts, in the form each model's own guide asks for.`,
  },
];

// A tool's name is the reader's word, not ours — the same footing as a place
// in rule 1 of @dst/content/sections, so the same threshold: two entries is
// already a page someone searching for that name would want.
const INTENTS: Intent<NewsItem>[] = [...SUBJECTS, ...AUDIENCES].map((s) => ({
  slug: s.slug,
  label: s.label,
  match: (item) => item.tags?.includes(s.tag) ?? false,
  min: 2,
}));

const bySlug = new Map(SUBJECTS.map((s) => [s.slug, s]));
const audienceBySlug = new Map(AUDIENCES.map((a) => [a.slug, a]));

// What the row of chips says, kept beside the vocabulary it describes.
export const NAV = {
  allLabel: "All",
  allTitle: "Every AI video story on this site",
  label: "AI video news by topic",
};

export function sections(items: NewsItem[]): Section<NewsItem>[] {
  return buildSections<NewsItem>({
    items,
    reserved: RESERVED,
    tags: KINDS,
    intents: INTENTS,
    // No place sections: the subject is software, and where its maker is
    // based is not what anyone reading about it asked.
    placeOf: () => undefined,
    copy: (g) => {
      const audience = g.kind === "intent" ? audienceBySlug.get(g.slug) : undefined;
      if (audience) {
        const { title, description, h1, lede } = audience;
        return { title, description, h1, lede };
      }
      if (g.kind === "intent") {
        const s = bySlug.get(g.slug)!;
        return {
          title: `${s.label} news and guides`,
          description: `${s.label} on aivideo.zone: releases, features and how-tos for ${s.what}, from ${s.maker}. AI video news with a source on every entry.`,
          h1: `${s.label}: AI video news and guides`,
          lede: `Everything this site has written about ${s.label}, ${s.what}. Newest first, each with the source it came from.`,
        };
      }
      return {
        title: "AI video guides: comparisons and how-tos",
        description: "AI video guides: what a new model changes, which video APIs are still open, how to run and edit generated video. Written from the makers' own documents.",
        h1: "AI video guides",
        lede: `The longer pieces: what a release changes in practice, how two models compare on their published specifications, and which tools do which job. Written from the makers' own documentation, with the source named.`,
      };
    },
  });
}

/** The page for a tag, when it has earned one — for the chips under an
    article. Read off the built sections, so a chip never points at a 404. */
export function tagLinks(item: NewsItem, all: Section<NewsItem>[]) {
  return (item.tags ?? []).flatMap((tag) => {
    const subject = [...SUBJECTS, ...AUDIENCES].find((s) => s.tag === tag);
    const built = subject && all.find((s) => s.kind === "intent" && s.slug === subject.slug);
    return built ? [{ href: `/${built.slug}/`, label: built.label, title: built.h1 }] : [];
  });
}
