import type { NewsItem } from "../types.ts";

export const items: NewsItem[] = [
  {
    slug: "dubai-completed-104-projects-in-six-months",
    site: "riviera",
    image: "/covers/dubai-completed-104-projects-in-six-months.jpg",
    imageAlt: "Three finished paper buildings with their scaffolding peeled away and folded beside them",
    imageKind: "generated",
    imageWidth: 1536,
    imageHeight: 864,
    title: "104 projects finished in six months",
    summary:
      "Dubai completed 104 real estate projects in the first half of 2026 — up 52% — delivering more than 24,000 units worth around Dh111 billion.",
    date: "2026-08-20",
    category: "Development",
    source: {
      name: "Gulf News",
      url: "https://gulfnews.com/business/property/dubai-adds-more-than-24000-property-units-in-six-months-1.500646931",
      verifiedOn: "2026-09-01",
    },
    body: [
      "Launches are announcements; completions are handovers. Only one of the two puts keys in anyone&rsquo;s hand, and the first half of 2026 was unusually good at the second kind.",
      "## The numbers",
      "<strong>104 real estate projects</strong> were completed in Dubai between January and June 2026, a <strong>52% increase</strong> on the same period a year earlier. Those projects added <strong>more than 24,000</strong> residential and commercial units, up <strong>36%</strong> year on year, with an investment value of around <strong>Dh111 billion</strong>.",
      "Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum, Crown Prince of Dubai and Deputy Prime Minister, said the projects &laquo;added more than 24,000 new real estate units in Dubai, up 36% compared with last year&raquo;.",
      "## Why the completion rate matters more than the launch rate",
      "Every off-plan market in the world can produce launch numbers. The question a buyer holding a 2027 handover date actually needs answered is whether this city&rsquo;s contractors, utilities connections and inspection authorities can absorb the volume already sold.",
      "A 52% rise in completions against a 36% rise in units says something specific: the average completed project got <strong>smaller</strong>. More buildings, each delivering fewer homes. That is what a market looks like when mid-sized developers are finishing, rather than a handful of large towers landing at once.",
      "## What it does not tell you",
      "A completion figure is city-wide. It says nothing about whether a particular community got its promised retail, its landscaping, or its second access road &mdash; the parts that arrive after the handover certificate and are not counted in anyone&rsquo;s half-year total.",
    ],
    expertise:
      "For anyone tracking a handover, the useful document is not the city-wide figure but the project&rsquo;s own completion percentage on the Dubai Land Department&rsquo;s project register, which is updated from the consultant&rsquo;s reports rather than the developer&rsquo;s marketing. A project sitting at the same percentage across two quarters is the signal worth acting on.",
  },
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
    imageKind: "diagram",
    imageCredit: "DST",
    imageWidth: 1200,
    imageHeight: 640,
    source: {
      name: "Middle East Construction News",
      url: "https://meconstructionnews.com/64270/azizi-riviera-in-mbr-city-enters-final-stage-of-delivery",
      verifiedOn: "2026-08-25",
    },
    body: [
      "Azizi has moved Riviera into its final stage of delivery. Of the 75 buildings in the master plan, <strong>53 had been handed over</strong> — all of phases 1, 2 and 3, plus five buildings from phase 4 — with the remaining 22 scheduled through the second quarter of 2026.",
      "Named handovers in that run included Riviera 63 in March, Riviera 61 in June, and Riviera 67 and Riviera 65 on July 1 and July 21. Azure was slated for August and Riviera 52 for September, with the rest of phase 4 following behind them.",
      "Completed, Riviera comes to roughly 16,000 residences across mid- and high-rise buildings along the canal.",
    ],
    expertise:
      "For anyone living here, the practical effect of a late-phase building is not the handover date itself but what surrounds it: a block that completes while neighbouring plots are still finishing gets construction noise, partial promenade retail, and a thinner set of open ground-floor units than the same building will have a year later. That gap has been closing steadily as phase 4 lands. Worth noting that the Q2 2026 target above comes from the August 2025 announcement — check the current position on any specific building before signing for it.",
    related: [
      {
        href: "/rent/",
        image: "/riviera.jpg",
        imageAlt: "The Azizi Riviera promenade at night: lit low-rise blocks along the canal.",
        title: "Renting in Riviera",
        text: "Matching a block to what matters — canal view, courtyard, distance from the promenade.",
        eyebrow: "Rent",
      },
    ],
  },
];
