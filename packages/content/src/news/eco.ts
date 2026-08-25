import type { NewsItem } from "../types.ts";

export const items: NewsItem[] = [
  {
    slug: "eco-dst-llc-launched",
    site: "eco",
    title: "DST opens a non-commercial environmental direction",
    summary:
      "DST split its environmental work out of a single paragraph on the main site and gave it its own address, eco.dst.llc — a running portfolio where each funded planting gets its own mapped record.",
    date: "2026-03-14",
    category: "Company",
    body: [
      "DST moved its environmental activity off a single paragraph on the main site and gave it a dedicated address, eco.dst.llc. The change is structural, not cosmetic: instead of a general sustainability statement, the site is a running portfolio where each planting or initiative gets its own record — species, planter, and coordinates included.",
      "The first record covers Douglas fir saplings planted in the Sverdlovsk region of Russia, with a location precise enough to check on a map rather than a stock photo standing in for the place.",
      "Nothing on eco.dst.llc is sold or counted as an offset. It's a public log of funded activity DST does because it wants to, kept separate from the group's commercial verticals so the two claims never blur together.",
    ],
    expertise:
      "Environmental line items in company reports are easy to state and hard to verify. Publishing each planting as its own record with coordinates is a deliberate choice: it invites anyone to go and check, instead of asking them to take a summary figure on faith.",
    image: "/stories/douglas-fir-shilovka-01.jpg",
    imageAlt:
      "A young Douglas fir sapling freshly planted in tall grass near the Shaytanka river — the first record published on eco.dst.llc.",
    imageKind: "photo",
    geo: {
      name: "Nikolo-Pavlovsky district, Sverdlovsk region — near Shilovka, on the Shaytanka river",
      lat: 57.769599,
      lng: 60.140435,
    },
    related: [
      {
        href: "/portfolio/shilovka-shaytanka/",
        title: "Douglas fir saplings, Sverdlovsk region",
        text: "The first record published on eco.dst.llc — species, planter, and mapped coordinates.",
        image: "/stories/douglas-fir-shilovka-01.jpg",
        imageAlt: "A young Douglas fir sapling freshly planted in tall grass near the Shaytanka river.",
        eyebrow: "Eco portfolio",
      },
      {
        // eco's linking rule: related cards point only into eco itself or
        // to dst.llc, never across to an unrelated vertical.
        href: "https://dst.llc",
        title: "DST",
        text: "The operating group behind eco.dst.llc and its other ventures.",
        eyebrow: "DST",
      },
    ],
    form: {
      title: "Want updates on new eco records?",
      description: "Leave an email and we'll let you know when a new planting or initiative is added to the portfolio.",
      submitLabel: "Notify me",
      meta: { source: "eco-news-launch" },
    },
  },
];
