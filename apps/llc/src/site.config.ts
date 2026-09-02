// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
export const site = {
  siteName: "Dubai Company Formation",
  titleSuffix: "Dubai Company Formation",
  complianceNote:
    "Informational, not legal or financial advice. Confirm current requirements with DED or your chosen free zone authority.",
  partnerDisclosure: false,
};
