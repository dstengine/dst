// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
import { disclaimer } from "./content";

export const site = {
  siteName: "Future World Forum",
  titleSuffix: "FWF Dubai",
  footerSiteName: "fwf.lol",
  complianceNote: disclaimer,
  partnerDisclosure: false,
  footerLinks: [{ href: "/about/", label: "About this site" }],
};
