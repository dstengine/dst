// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
import { publisher, feed } from "./content";

export const site = {
  siteName: "xmr0.uk",
  // The tooltip on the wordmark: the link's own text is the name, so a
  // title repeating it would say nothing twice.
  homeTitle: "Monero privacy on the chain, the network and in the wallet",
  // Nobody searches for "xmr0.uk", so the suffix slot carries the
  // subject. BaseLayout drops a suffix the title has already said.
  titleSuffix: "Monero privacy guides",
  // What this site is about, for tools/seo-check.mjs: the phrase that has
  // to appear in the title, the h1 and the description of every page a
  // reader could arrive on from a search.
  keyword: "Monero privacy",
  lang: "en-GB",
  publisher,
  // Independent of the DST group: no footer link to the network, and the
  // group's partner disclosure is not this site's to make.
  networkFooter: false,
  partnerDisclosure: false,
  footerLinks: [
    { href: "/guides/", label: "Guides" },
    { href: "/about/", label: "About" },
  ],
  /** Turns on the RSS autodiscovery link in the head. */
  feedTitle: feed.title,
};
