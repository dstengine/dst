// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
export const site = {
  siteName: "Palm Central",
  titleSuffix: "Palm Central",
  footerSiteName: "Palm Central DST",
  complianceNote:
    "Independent advisory site, not affiliated with or endorsed by Nakheel. Prices, availability, and release phases change — confirm current terms directly with the developer or a licensed broker before acting.",
  footerLinks: [{ href: "/privacy/", label: "Privacy" }],
};
