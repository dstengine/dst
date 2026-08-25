import type { NewsItem } from "../types.ts";

export const items: NewsItem[] = [
  {
    slug: "metro-blue-line-progress",
    site: "mbr",
    // Layout appends " — MBR City Guide".
    title: "Metro Blue Line reaches 10%",
    summary:
      "Dubai's 30km, 14-station Blue Line hit 10% completion five months after breaking ground and is targeting 30% by the end of 2026, for a September 2029 opening — on a route that does not serve MBR City.",
    date: "2025-11-09",
    category: "Transport",
    image: "/news/metro-blue-line-progress.svg",
    imageAlt:
      "Construction timeline of the Dubai Metro Blue Line: 10% complete in November 2025, a 30% target for the end of 2026, and opening in September 2029, with a note that the route runs east of MBR City.",
    imageKind: "illustration",
    imageCredit: "DST, from RTA figures",
    source: {
      name: "Dubai Media Office",
      url: "https://www.mediaoffice.ae/en/news/2025/november/09-11/rta",
      verifiedOn: "2026-08-25",
    },
    body: [
      "The Dubai Metro Blue Line reached 10% completion within five months of its June 2025 groundbreaking, with the RTA targeting 30% by the end of 2026 and an opening on September 9, 2029. Over 500 engineers and 3,000 workers are deployed across 12 sites.",
      "The line runs 30km with 14 stations in two directions: 21km and 10 stations from Creek Interchange through Dubai Festival City, Dubai Creek Harbour and International City to Dubai Academic City, plus 9km and four stations from Centrepoint Interchange through Mirdif and Al Warqa to International City. The Emaar station will be the world's tallest metro station at 74 metres, built for 240,000 daily passengers by 2040.",
    ],
    expertise:
      "The useful detail for MBR City is what is absent from that route: the Blue Line runs east of the district and does not serve it. MBR City stays car-dependent, with the existing Red Line stations along Sheikh Zayed Road the nearest rail access — worth factoring in against communities on the new line when comparing commutes, and worth ignoring entirely if a listing tries to sell Blue Line proximity as an MBR City benefit.",
  },
];
