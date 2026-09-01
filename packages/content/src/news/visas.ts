import type { NewsItem } from "../types.ts";

export const items: NewsItem[] = [
  {
    slug: "entry-visa-opens-to-six-more-nationalities",
    site: "visas",
    image: "/covers/entry-visa-opens-to-six-more-nationalities.jpg",
    imageAlt: "Six blank passport-shaped cards in two rows, one carrying a single red stamp",
    imageKind: "generated",
    imageWidth: 1536,
    imageHeight: 864,
    title: "Six more nationalities can now get a visa on arrival",
    titleSeo: "Visa on arrival: six more nationalities",
    summary:
      "The ICP has added Indonesia, Vietnam, Thailand, the Philippines, Kenya and South Africa — and six new countries of residence. Dh100 for 14 days, Dh250 for 60.",
    date: "2026-06-25",
    category: "Residency",
    source: {
      name: "Khaleej Times",
      url: "https://www.khaleejtimes.com/uae/uae-expands-entry-visit-visa-eligibility",
      verifiedOn: "2026-09-01",
    },
    body: [
      "The rule that changed here is a conditional one, and the condition is the part people misread. This is not a passport-based entitlement. It is an entitlement that depends on <strong>where you live</strong> as much as on which passport you hold.",
      "## The six new nationalities",
      "The Federal Authority for Identity, Citizenship, Customs and Port Security has extended entry-visa eligibility to nationals of <strong>Indonesia</strong>, <strong>Vietnam</strong>, <strong>Thailand</strong>, <strong>the Philippines</strong>, <strong>Kenya</strong> and <strong>South Africa</strong>, joining India on the list.",
      "## The six new countries of residence",
      "The list of qualifying residences has widened too. Alongside the <strong>United States</strong>, the <strong>United Kingdom</strong> and <strong>EU member states</strong>, an applicant may now hold valid residency in <strong>Singapore</strong>, <strong>Japan</strong>, <strong>South Korea</strong>, <strong>Australia</strong>, <strong>New Zealand</strong> or <strong>Canada</strong>.",
      "Both conditions have to hold at once: an eligible nationality <em>and</em> a valid residence permit from an approved country. A Kenyan national resident in Kenya is not covered by this change; a Kenyan national resident in Canada is.",
      "## What each visa costs and does",
      "<strong>14-day visa &mdash; Dh100.</strong> Extendable once during the stay.",
      "<strong>60-day visa &mdash; Dh250.</strong> Single entry, and <strong>not extendable</strong>.",
      "The asymmetry is worth pausing on. The cheaper visa is the flexible one; the longer visa is the rigid one. Someone planning a two-month stay with an uncertain end date is choosing between a 60-day visa that cannot move and a 14-day visa that can be extended once &mdash; and the second is not obviously the wrong answer.",
      "## The overstay figure",
      "Overstaying carries a fine of <strong>Dh50 per day</strong>. On a non-extendable 60-day visa, that is the number to hold in mind when booking a return flight for the sixtieth day rather than the fifty-eighth.",
    ],
    expertise:
      "A visa on arrival is granted at the counter, not before the flight &mdash; which means the residence permit is the document to have ready in hand, not filed in an email. The single most common cause of a refusal in this category is a residence permit that expires during the intended stay, since the entry visa cannot outlive the residency that qualified it.",
  },
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
    imageKind: "diagram",
    imageCredit: "DST",
    imageWidth: 1200,
    imageHeight: 600,
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
