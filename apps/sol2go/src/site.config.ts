// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
import { publisher } from "./content";

export const site = {
  siteName: "sol2go.lol",
  // Nobody searches for "sol2go", so the suffix — the most expensive
  // sixty characters on the page — went to a name that taught a reader
  // nothing. A brand belongs in a title once it is one; until then the
  // slot is worth more as the word the site is actually about.
  titleSuffix: "Solana events",
  lang: "en",
  publisher,
  // Independent of the DST group and of the other .lol sites: no footer
  // link to the network, and the group's partner disclosure is not this
  // site's to make.
  networkFooter: false,
  partnerDisclosure: false,
  footerLinks: [{ href: "/about/", label: "About" }],
};
