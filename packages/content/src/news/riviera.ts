import type { NewsItem } from "../types.ts";

export const items: NewsItem[] = [
  {
    slug: "azizi-riviera-final-handover-phase",
    site: "riviera",
    // Layout appends " — Azizi Riviera Guide".
    title: "Riviera's final handover phase",
    summary:
      "Azizi has entered the last stage of delivery at Riviera: 53 of the 75 buildings handed over, all of phases 1 to 3 complete, and the remaining 22 buildings scheduled through Q2 2026.",
    date: "2025-08-13",
    category: "Development",
    image: "/news/azizi-riviera-handover.svg",
    imageAlt:
      "One square per building: 53 of Riviera's 75 buildings handed over — all of phases 1 to 3 plus five of phase 4 — with 22 still to come as of August 2025.",
    imageKind: "illustration",
    imageCredit: "DST",
    source: {
      name: "Middle East Construction News",
      url: "https://meconstructionnews.com/64270/azizi-riviera-in-mbr-city-enters-final-stage-of-delivery",
      verifiedOn: "2026-08-25",
    },
    body: [
      "Azizi has moved Riviera into its final stage of delivery. Of the 75 buildings in the master plan, 53 had been handed over — all of phases 1, 2 and 3, plus five buildings from phase 4 — with the remaining 22 scheduled through the second quarter of 2026.",
      "Named handovers in that run included Riviera 63 in March, Riviera 61 in June, and Riviera 67 and Riviera 65 on July 1 and July 21. Azure was slated for August and Riviera 52 for September, with the rest of phase 4 following behind them.",
      "Completed, Riviera comes to roughly 16,000 residences across mid- and high-rise buildings along the canal.",
    ],
    expertise:
      "For anyone living here, the practical effect of a late-phase building is not the handover date itself but what surrounds it: a block that completes while neighbouring plots are still finishing gets construction noise, partial promenade retail, and a thinner set of open ground-floor units than the same building will have a year later. That gap has been closing steadily as phase 4 lands. Worth noting that the Q2 2026 target above comes from the August 2025 announcement — check the current position on any specific building before signing for it.",
  },
];
