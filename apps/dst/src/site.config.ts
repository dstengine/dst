// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
import { NETWORK } from "@dst/content/network";
import { feed } from "./content";

export const site = {
  siteName: "DST",
  // The tooltip on the wordmark, and the one slot on every page of the site
  // that is free to say what the site is: the link's own text is the name,
  // so a title repeating it would say nothing twice.
  homeTitle: "What DST builds in Dubai property, tech and AI",
  titleSuffix: "DST",
  // What this site is for, in one phrase, for tools/seo-check.mjs and for
  // BaseLayout: the words that have to appear in the title, the h1 and the
  // description of every page a reader could arrive on from a search — and
  // the words the title suffix exists to supply when they are missing.
  keyword: "Dubai",
  complianceNote:
    "DST builds and operates the systems; regulated work — real estate, financial services — is carried out by licensed local partners.",
  logoSrc: "/logo-mini.png",
  favicon: true,
  // The hub lists the whole network in its footer, so every page of it
  // reaches the inner pages no other site links to.
  footerSites: NETWORK,
  /** Turns on the RSS autodiscovery link in the head. */
  feedTitle: feed.title,
};
