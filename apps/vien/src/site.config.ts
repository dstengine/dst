// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
import { publisher } from "./content";

export const site = {
  siteName: "vien.lol",
  // The tooltip on the wordmark, and the one slot on every page of the site
  // that is free to say what the site is: the link's own text is the name,
  // so a title repeating it would say nothing twice.
  homeTitle: "Was in Wien los ist, mit Quelle bei jedem Eintrag",
  titleSuffix: "vien.lol",
  // What this site is for, in one phrase, for tools/seo-check.mjs and for
  // BaseLayout: the words that have to appear in the title, the h1 and the
  // description of every page a reader could arrive on from a search — and
  // the words the title suffix exists to supply when they are missing.
  keyword: "Wien",
  // The site publishes in German: this is what <html lang> and the
  // structured data say, and what the shared chrome picks its own two
  // strings from.
  lang: "de-AT",
  publisher,
  networkFooter: false,
  partnerDisclosure: false,
  footerLinks: [{ href: "/ueber-uns/", label: "Über uns" }],
};
