// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
import { publisher } from "./content";

export const site = {
  siteName: "lnd.lol",
  // The tooltip on the wordmark, and the one slot on every page of the site
  // that is free to say what the site is: the link's own text is the name,
  // so a title repeating it would say nothing twice.
  homeTitle: "London events and news, checked before they are listed",
  titleSuffix: "Greater London",
  // What this site is for, in one phrase, for tools/seo-check.mjs and for
  // BaseLayout: the words that have to appear in the title, the h1 and the
  // description of every page a reader could arrive on from a search — and
  // the words the title suffix exists to supply when they are missing.
  keyword: "London",
  lang: "en-GB",
  publisher,
  networkFooter: false,
  partnerDisclosure: false,
  footerLinks: [{ href: "/about/", label: "About" }],
};
