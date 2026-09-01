// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
import { publisher } from "./content";

export const site = {
  siteName: "mxo.lol",
  titleSuffix: "mxo.lol",
  lang: "es-MX",
  publisher,
  networkFooter: false,
  partnerDisclosure: false,
  footerLinks: [{ href: "/acerca/", label: "Acerca" }],
};
