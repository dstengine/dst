// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
export const site = {
  siteName: "Dubai Residency",
  titleSuffix: "Dubai Residency",
  complianceNote:
    "Informational content, not immigration or legal advice. Golden Visa thresholds and eligibility criteria are set by UAE federal authorities and can change — always confirm current requirements before making an investment decision.",
  partnerDisclosure: true,
};
