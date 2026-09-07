// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
import { publisher } from "./content";

export const site = {
  siteName: "nyc42.lol",
  titleSuffix: "New York 42",
  // What this site is for, in one phrase, for tools/seo-check.mjs and for
  // BaseLayout: the words that have to appear in the title, the h1 and the
  // description of every page a reader could arrive on from a search — and
  // the words the title suffix exists to supply when they are missing.
  keyword: "New York",
  lang: "en-US",
  publisher,
  // Independent of the DST group and of the other four city sites: no
  // footer link to the network, and the group's partner disclosure is not
  // this site's to make.
  networkFooter: false,
  partnerDisclosure: false,
  footerLinks: [{ href: "/about/", label: "About" }],
};
