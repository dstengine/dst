// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
import { go } from "./outbound";

export const site = {
  siteName: "DST Eco",
  titleSuffix: "DST Eco",
  footerSiteName: "DST",
  instagram: go("instagram"),
  // The network-wide partner disclosure is about regulated verticals
  // routing to licensed local partners. Nothing here is a regulated
  // service, so that note would be noise; this site carries its own
  // compliance line instead — the offset disclaimer, which is the claim an
  // environmental page actually has to be careful about.
  partnerDisclosure: false,
  complianceNote:
    "This page describes DST's own environmental activity. It is not a carbon-offset programme: nothing here is sold, certified, or counted as an offset credit.",
};
