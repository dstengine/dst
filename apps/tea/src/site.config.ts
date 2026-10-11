// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
import { publisher, feed } from "./content";

export const site = {
  siteName: "tea.ceo",
  // The tooltip on the wordmark: the link's own text is the name, so a
  // title repeating it would say nothing twice.
  homeTitle: "Tea guides, brewing times and the tea calendar",
  // Nobody searches for "tea.ceo", so the suffix slot carries the subject.
  // In practice it is seldom printed: every title on the site says "tea"
  // already, and BaseLayout drops a suffix the title has said.
  titleSuffix: "Tea guides",
  // What this site is for, in one word, for tools/seo-check.mjs: the thing
  // that has to appear in the title, the h1 and the description of every
  // page a reader could arrive on from a search.
  keyword: "tea",
  lang: "en-GB",
  publisher,
  // Independent of the DST group: no footer link to the network, and the
  // group's partner disclosure is not this site's to make.
  networkFooter: false,
  partnerDisclosure: false,
  footerLinks: [
    { href: "/schedule/", label: "Tea times" },
    { href: "/guides/", label: "Guides" },
    { href: "/about/", label: "About" },
  ],
  /** Turns on the RSS autodiscovery link in the head. */
  feedTitle: feed.title,
};
