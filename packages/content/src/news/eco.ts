import type { NewsItem } from "../types.ts";

export const items: NewsItem[] = [
  {
    slug: "uae-mangroves-halfway-to-100-million",
    site: "eco",
    image: "/covers/uae-mangroves-halfway-to-100-million.jpg",
    imageAlt: "Paper mangrove roots and canopy filling the left half of the frame, open water on the right",
    imageKind: "generated",
    imageWidth: 1536,
    imageHeight: 864,
    title: "The UAE is halfway to 100 million mangroves",
    summary:
      "Roughly 51 million trees planted against a 2030 target of 100 million — a target that was raised from 30 million. Marine protected areas stand at 12% against a 30% goal.",
    date: "2026-08-22",
    category: "Environment",
    source: {
      name: "Gulf News",
      url: "https://gulfnews.com/uae/environment/uae-reaches-51-of-target-to-plant-100-million-mangrove-trees-by-2030-1.500648706",
      verifiedOn: "2026-09-01",
    },
    body: [
      "Halfway with four years to run sounds comfortable until you remember what the denominator used to be. The UAE&rsquo;s 2030 mangrove target was originally <strong>30 million</strong> trees. It was raised to <strong>100 million</strong> &mdash; so the current <strong>51 million</strong> is not half of the original ambition, it is nearly twice it.",
      "## Where the programme stands",
      "Approximately <strong>51 million</strong> mangroves have been planted, <strong>51%</strong> of the <strong>100 million</strong> target for <strong>2030</strong>.",
      "Hiba Obaid Al Shehhi, Assistant Undersecretary for the Biodiversity and Aquatic Life Sector at the Ministry of Climate Change and Environment, described a shift in approach: marine conservation is no longer focused solely on protecting existing natural resources, but increasingly involves <strong>restoring damaged ecosystems</strong>.",
      "## The other numbers in the same programme",
      "<strong>Marine and coastal protected areas: 12%</strong> of national waters, against a <strong>30% target for 2030</strong>. There are <strong>16</strong> protected areas in the UAE.",
      "This is the figure carrying the real gap. Mangrove planting is a schedule; raising protected coverage from 12% to 30% is a set of decisions about who may fish, anchor and build where &mdash; and those move slowly for reasons that have nothing to do with horticulture.",
      "## Coral",
      "A project in <strong>Fujairah</strong> aims to establish <strong>1.5 million coral colonies over five years</strong>, covering more than <strong>300,000 square metres</strong>. Since 2018, <strong>66,173</strong> coral pieces have been cultivated across <strong>22,827 square metres</strong>. Research has mapped <strong>210 coral locations</strong> and identified more than <strong>55 hard coral species</strong>.",
      "Set those side by side and the scale of the new project is clear: it proposes to do roughly twenty times as much area in five years as the previous eight produced.",
      "## Artificial habitat",
      "By the end of 2025, <strong>22,982</strong> artificial cave structures had been deployed under a programme running since <strong>2016</strong>.",
      "## Why mangroves, specifically",
      "A mangrove is three pieces of infrastructure at once: a carbon store that holds far more per hectare below ground than above it, a nursery that fish stocks depend on, and a wave break that reduces what a coastline has to be engineered to withstand. Counting trees is a proxy for all three, which is why the count gets published.",
    ],
    expertise:
      "Planted mangrove counts and surviving mangrove counts are different measurements, and the gap between them is where these programmes are actually judged. Survival depends on tidal elevation at the planting site more than on the number of seedlings put in &mdash; a stand set even slightly too high or too low in the tidal frame will thin out over its first three years regardless of how carefully it was planted.",
  },
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
