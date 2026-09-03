// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
import { disclaimer } from "./content";

export const site = {
  siteName: "Future World Forum",
  titleSuffix: "Future World Forum Dubai",
  footerSiteName: "fwf.lol",
  complianceNote: disclaimer,
  partnerDisclosure: false,
  // The site opens dark. Its own hero is a night photograph of a lit
  // facade, its accent is a violet that carries on a dark ground and goes
  // flat on a white one, and the subject is an evening conference — a
  // reader arriving on a light page sees a design that was drawn for the
  // other one. The toggle is still in the header, and a reader who presses
  // it is remembered.
  defaultTheme: "dark" as const,
  footerLinks: [{ href: "/about/", label: "About this site" }],
};
