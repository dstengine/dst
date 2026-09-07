// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
import { feed } from "./content";

export const site = {
  siteName: "Dubai Company Formation",
  // The tooltip on the wordmark, and the one slot on every page of the site
  // that is free to say what the site is: the link's own text is the name,
  // so a title repeating it would say nothing twice.
  homeTitle: "Dubai company formation, zone by zone",
  titleSuffix: "Dubai Company Formation",
  // What this site is for, in one phrase, for tools/seo-check.mjs and for
  // BaseLayout: the words that have to appear in the title, the h1 and the
  // description of every page a reader could arrive on from a search — and
  // the words the title suffix exists to supply when they are missing.
  keyword: "Dubai",
  complianceNote:
    "Informational, not legal or financial advice. Confirm current requirements with DED or your chosen free zone authority.",
  partnerDisclosure: false,
  /** Turns on the RSS autodiscovery link in the head. */
  feedTitle: feed.title,
};
