import type { NewsItem } from "../types.ts";

export const items: NewsItem[] = [
  {
    slug: "nakheel-palm-central-next-phase",
    site: "palmcentral",
    // Kept short because Layout appends " — Palm Central, Palm Jebel Ali",
    // but still self-contained: this headline also runs in dst.llc's
    // aggregated feed, where "the next phase" alone says nothing.
    title: "Nakheel releases 222 homes",
    summary:
      "Nakheel opened a new phase of Palm Central Private Residences on Palm Jebel Ali — 222 homes across three low- to mid-rise buildings, one- to four-bedroom apartments and four- to five-bedroom townhouses.",
    date: "2026-06-24",
    category: "Development",
    // DST's own render of the development, the same one the site uses as
    // its opener. Labelled as a render because that is what it is: the
    // buildings on this page are not built yet.
    image: "/palmcentral.jpg",
    imageAlt:
      "Night aerial render of Palm Central's beachfront residences on Palm Jebel Ali, with the lit beach curve and the Dubai skyline behind.",
    imageKind: "render",
    imageCredit: "DST",
    imageWidth: 1600,
    imageHeight: 900,
    source: {
      name: "Nakheel",
      url: "https://www.nakheel.com/en/media-centre/press-releases/news-detail/2026/06/24/nakheel-releases-next-phase-of-palm-central-private-residences-amid-accelerating-demand-for-beachfront-living-on-palm-jebel-ali",
      verifiedOn: "2026-08-25",
    },
    body: [
      "Nakheel released the next phase of Palm Central Private Residences on Palm Jebel Ali on June 24, 2026 — <strong>222 homes</strong> spread across three low- to mid-rise buildings, a mix of one- to four-bedroom apartments and four- to five-bedroom townhouses.",
      "It follows the project's first release in October 2025, which Nakheel says drew strong demand for beachfront living on Palm Jebel Ali — seven interconnected islands and more than 90 kilometres of beachfront, part of the Dubai 2040 Urban Master Plan. Completion across the wider Palm Jebel Ali development is scheduled for September 2030.",
    ],
    expertise:
      "A second release this close behind the first is usually a signal of absorbed inventory, not just a pre-planned rollout — worth watching for how it prices against the October 2025 phase once official numbers are out.",
    related: [
      {
        href: "/prices/",
        title: "Palm Central prices",
        text: "Current pricing by unit type, and how this phase sits against the first release.",
        eyebrow: "Prices",
      },
      {
        href: "/payment-plan/",
        title: "Payment plan",
        text: "The instalment structure through to handover, set out in full.",
        eyebrow: "Payment",
      },
    ],
  },
];
