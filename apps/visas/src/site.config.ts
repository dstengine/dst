// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
import { feed } from "./content";

export const site = {
  siteName: "Dubai Residency",
  // The tooltip on the wordmark, and the one slot on every page of the site
  // that is free to say what the site is: the link's own text is the name,
  // so a title repeating it would say nothing twice.
  homeTitle: "UAE residency and the Golden Visa, route by route",
  titleSuffix: "Dubai Residency",
  // What this site is for, in one phrase, for tools/seo-check.mjs and for
  // BaseLayout: the words that have to appear in the title, the h1 and the
  // description of every page a reader could arrive on from a search — and
  // the words the title suffix exists to supply when they are missing.
  keyword: "UAE",
  complianceNote:
    "Informational, not immigration or legal advice. UAE federal authorities set the Golden Visa thresholds and change them; confirm the current ones before you invest.",
  partnerDisclosure: true,
  /** Turns on the RSS autodiscovery link in the head. */
  feedTitle: feed.title,
};
