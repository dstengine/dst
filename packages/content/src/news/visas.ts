import type { NewsItem } from "../types.ts";

export const items: NewsItem[] = [
  {
    slug: "two-year-investor-visa-minimum-dropped",
    site: "visas",
    // Layout appends " — Dubai Residency & Golden Visa", leaving 28
    // characters. "2-year" rather than "two-year" purely to fit.
    title: "2-year visa minimum dropped",
    summary:
      "The Dh750,000 property minimum on Dubai's two-year investor visa has been dropped for sole owners — a change that appeared in the Dubai Land Department's Cube Center without a formal announcement.",
    // Dated to the source's own publication, not to the change itself: the
    // change was never formally announced, so no reliable date for it
    // exists. The body says so rather than implying this is the date it
    // took effect.
    date: "2026-04-29",
    category: "Residency",
    image: "/news/investor-visa-thresholds.svg",
    imageAlt:
      "Dubai property thresholds by residency route: the two-year investor visa has no minimum for sole owners, down from Dh750,000; the five-year retirement visa still asks Dh1 million; the ten-year Golden Visa still asks Dh2 million.",
    imageKind: "illustration",
    imageCredit: "DST",
    source: {
      name: "Gulf News",
      url: "https://gulfnews.com/living-in-uae/visa-immigration/dubai-residency-by-investment-guide-1.500523250",
      verifiedOn: "2026-08-25",
    },
    body: [
      "Dubai has eased the property requirement on its two-year, property-linked investor visa: the previous <strong>Dh750,000 minimum has been dropped</strong> for sole owners of a fully paid property. For jointly owned property, the threshold reported is AED 400,000 per investor.",
      "The change carries an important caveat. As Gulf News reports it, <strong>no formal announcement was made</strong> — the updated requirements simply appeared on the Cube Center, a Dubai Land Department affiliate that handles services for property investors. There is no official effective date attached to it.",
      "The other two routes are unchanged: the five-year retirement visa still asks for <strong>AED 1 million</strong> in property and an applicant aged 55 or over, and the ten-year Golden Visa still asks for <strong>AED 2 million</strong>, held as one property or a portfolio.",
    ],
    expertise:
      "Two things are worth separating here. First, this affects the entry-level two-year visa only — the Golden Visa threshold has not moved, and the two get conflated constantly. Second, a requirement that changes inside a service platform without an announcement is not the same as one published in a resolution: it can be clarified, applied inconsistently between counters, or revised. Confirm the current position directly with the DLD or GDRFA before making a purchase that depends on it, rather than treating the figure above as settled.",
    related: [
      {
        href: "/golden/",
        title: "Golden Visa via property",
        text: "The ten-year route in full: eligibility, thresholds and what the process actually involves.",
        eyebrow: "Golden Visa",
      },
      {
        href: "/properties/",
        title: "Properties that qualify",
        text: "A filtered shortlist of listings that meet the investment threshold, by area and type.",
        eyebrow: "Properties",
      },
    ],
  },
];
