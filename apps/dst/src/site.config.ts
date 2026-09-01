// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
import { NETWORK } from "@dst/content/network";

export const site = {
  siteName: "DST",
  titleSuffix: "DST",
  complianceNote:
    "DST builds and operates the systems behind each venture; execution in regulated verticals (real estate, financial services) is carried out by licensed local partners.",
  logoSrc: "/logo-mini.png",
  favicon: true,
  // The hub lists the whole network in its footer, so every page of it
  // reaches the inner pages no other site links to.
  footerSites: NETWORK,
};
