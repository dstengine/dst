// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
import { publisher, feed } from "./content";

export const site = {
  siteName: "aivideo.zone",
  // The tooltip on the wordmark: the link's own text is the name, so a
  // title repeating it would say nothing twice.
  homeTitle: "AI video news: generative models, tools and AI editing",
  // The domain says "AI video" already, but nobody reads a domain in a
  // search result as the subject of the page; the suffix is where the
  // words go that a reader actually typed.
  titleSuffix: "AI video",
  // What this site is for, in two words, for tools/seo-check.mjs: the thing
  // that has to appear in the title, the h1 and the description of every
  // page a reader could arrive on from a search.
  keyword: "AI video",
  lang: "en",
  publisher,
  // Independent of the DST group: no footer link to the network, and the
  // group's partner disclosure is not this site's to make.
  networkFooter: false,
  partnerDisclosure: false,
  // Neon reads as neon only on a dark ground, so the site opens dark and a
  // reader can still switch.
  defaultTheme: "dark" as const,
  footerLinks: [
    { href: "/guides/", label: "Guides" },
    { href: "/about/", label: "About" },
  ],
  /** Turns on the RSS autodiscovery link in the head. */
  feedTitle: feed.title,
};
