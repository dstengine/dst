// What this site calls itself, once per language. Everything here is
// identity: the same on every page of a language, and the part a new site
// has to get right before anything else. It lives outside Layout.astro
// because that file is a template, and a template gets copied — these
// strings are exactly the part of a copy that must not survive it.
import { publisher, feed, type Lang } from "./content";

const shared = {
  publisher,
  networkFooter: false,
  partnerDisclosure: false,
};

export const site: Record<Lang, {
  siteName: string; homeTitle: string; titleSuffix: string; keyword: string;
  lang: string; footerLinks: { href: string; label: string }[]; feedTitle: string;
  publisher: typeof publisher; networkFooter: boolean; partnerDisclosure: boolean;
}> = {
  hy: {
    ...shared,
    siteName: "Tick · Երևան",
    // The tooltip on the wordmark: the link's own text is the name, so a
    // title repeating it would say nothing twice.
    homeTitle: "Ինչ կա Երևանում՝ աղբյուրով ամեն գրառման մոտ",
    titleSuffix: "Երևան",
    // The head keyword, for BaseLayout and tools/seo-check.mjs. Armenian
    // inflects it — Երևանում, Երևանի — and both count as saying it.
    keyword: "Երևան",
    lang: "hy-AM",
    footerLinks: [{ href: "/am/about/", label: "Մեր մասին" }],
    feedTitle: feed.hy.title,
  },
  en: {
    ...shared,
    siteName: "Tick · Yerevan",
    homeTitle: "What's on in Yerevan, with a source on every entry",
    titleSuffix: "Yerevan",
    keyword: "Yerevan",
    lang: "en-GB",
    footerLinks: [{ href: "/about/", label: "About" }],
    feedTitle: feed.en.title,
  },
};

// Both keywords in one place for tools/seo-check.mjs, which reads this file
// as text and picks the one matching each page's <html lang>.
export const keywords = { hy: "Երևան", en: "Yerevan" };
