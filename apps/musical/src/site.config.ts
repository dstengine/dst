// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
import { disclaimer } from "./content";

export const site = {
  siteName: "musical.today",
  titleSuffix: "musical.today",
  complianceNote: disclaimer,
  // The site is not tied to the group, so the markup has to say the same
  // thing the footer does — see ~/mind/ai/dubai/musical.today.md.
  publisher: {
    id: "https://musical.today/#organization",
    name: "musical.today",
    url: "https://musical.today/",
  },
  partnerDisclosure: false,
  networkFooter: false,
  footerLinks: [
    { href: "/venues/", label: "Venues" },
    { href: "/online/", label: "Online" },
    { href: "/about/", label: "About this site" },
  ],
};
