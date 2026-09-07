// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
export const site = {
  siteName: "Palm Central",
  // The tooltip on the wordmark, and the one slot on every page of the site
  // that is free to say what the site is: the link's own text is the name,
  // so a title repeating it would say nothing twice.
  homeTitle: "Palm Central on Palm Jebel Ali: prices, plan and location",
  titleSuffix: "Palm Central",
  // What this site is for, in one phrase, for tools/seo-check.mjs and for
  // BaseLayout: the words that have to appear in the title, the h1 and the
  // description of every page a reader could arrive on from a search — and
  // the words the title suffix exists to supply when they are missing.
  keyword: "Palm Central",
  footerSiteName: "Palm Central DST",
  complianceNote:
    "Independent advisory site, not affiliated with or endorsed by Nakheel. Prices and release phases change; confirm current terms with the developer or a licensed broker.",
  footerLinks: [{ href: "/privacy/", label: "Privacy" }],
};
