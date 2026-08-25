import type { NewsItem } from "../types.ts";

// The group's own feed carries what moves the markets the network operates
// in — not internal plumbing. How leads and CRMs are wired is not news to
// anyone outside the company, and advertising it reads badly to a client.
export const items: NewsItem[] = [
  {
    slug: "dubai-property-sales-h1-2026",
    site: "dst",
    title: "Dubai property sales reach Dh286b in H1",
    summary:
      "Dubai recorded Dh286.43 billion of property sales across 79,229 transactions in the first half of 2026 — an average of 433 sales and about Dh1.57 billion changing hands every day.",
    date: "2026-07-14",
    category: "Market",
    source: {
      name: "Khaleej Times",
      url: "https://www.khaleejtimes.com/business/dubai-property-sales-hit-dh286b-as-market-momentum-stays-strong-in-h1-2026",
      verifiedOn: "2026-08-25",
    },
    body: [
      "Dubai closed the first half of 2026 with Dh286.43 billion in property sales across 79,229 transactions — roughly 433 sales a day and close to Dh1.57 billion changing hands daily.",
      "January was the strongest month of the period, at Dh72.16 billion across 15,896 transactions. June closed with 13,766 sales worth Dh32.66 billion.",
    ],
    expertise:
      "Volume at this level is the reason the group runs its property verticals as separate, narrow sites rather than one catalogue: at 433 transactions a day, a buyer's real problem is not finding listings but narrowing them, and a site scoped to a single development or district answers a question a city-wide portal cannot. It is also worth reading the headline number carefully — a half-year total says the market is liquid, not that any particular building is a good buy.",
  },
];
