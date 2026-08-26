import type { NewsItem } from "../types.ts";

// The group's own feed carries what moves the markets the network operates
// in — not internal plumbing. How leads and CRMs are wired is not news to
// anyone outside the company, and advertising it reads badly to a client.
export const items: NewsItem[] = [
  {
    slug: "dubai-tokenised-property-secondary-market",
    site: "dst",
    title: "Dubai opens a regulated market for tokenised property",
    summary:
      "Fractional stakes in Dubai Land Department title deeds became tradable between investors on February 20, 2026, under VARA supervision — the pilot behind it had drawn investors from over 50 nationalities and more than Dh18.5 million.",
    date: "2026-02-20",
    category: "Crypto",
    source: {
      name: "Gulf News",
      url: "https://gulfnews.com/business/property/prypco-rolls-out-dubai-marketplace-after-nod-for-property-stakes-trading-1.500438076",
      verifiedOn: "2026-08-26",
    },
    body: [
      "On <strong>February 20, 2026</strong> a regulated marketplace opened in Dubai for trading fractional stakes in property already registered with the Dubai Land Department. It runs under the Virtual Assets Regulatory Authority, in partnership with the DLD, and is open to UAE residents over 18 with a valid Emirates ID.",
      "The pilot that preceded it drew investors from more than 50 nationalities and over <strong>Dh18.5 million</strong> in tokenised property investments, with one offering fully funded in one minute and 58 seconds.",
      "The authorities describe the rollout as controlled rather than a broad market opening.",
    ],
    expertise:
      "The part worth noticing is what is being tokenised. This is not a crypto product with property attached — the token points at a title deed in a government registry, and the price is in dirhams. That makes it a liquidity mechanism for an asset class whose defining problem has always been that selling takes months, and it is the government registry, not a blockchain, that makes the claim enforceable. The unresolved question is the same one every fractional scheme meets: a secondary market only prices an asset once there are enough buyers on the other side, and a pilot funded in under two minutes says more about scarcity of supply than about depth of demand.",
  },
  {
    slug: "gitex-moves-to-expo-city-2026",
    site: "dst",
    title: "GITEX leaves the World Trade Centre after 45 years",
    summary:
      "Dubai's largest technology show moves to the Dubai Exhibition Centre at Expo City for its 2026 edition, and shifts from its long-standing October slot to December 7–11.",
    date: "2025-10-08",
    category: "Tech",
    source: {
      name: "Dubai Media Office",
      url: "https://mediaoffice.ae/en/news/2025/october/08-10/gitex-global-to-begin-a-new-chapter-at-expo-city-dubai-in-2026",
      verifiedOn: "2026-08-26",
    },
    body: [
      "GITEX GLOBAL leaves Dubai World Trade Centre, its home for 45 years, for the Dubai Exhibition Centre at Expo City Dubai. The 2026 edition runs <strong>December 7–11</strong> — the summit day at DWTC on the 7th, the exhibition at Expo City from the 8th.",
      "The new venue is around 1.5 times the size of the old one. The organisers put the expected 2026 scale at more than 200,000 attendees from over 180 countries, 6,800 exhibiting companies and 400+ government entities.",
      "Gulfood moves to the same venue in 2026.",
    ],
    expertise:
      "Two things change here for anyone planning around the show, and only one of them is the address. The October slot had been fixed long enough that half the region's product launches, funding announcements and hiring rounds were timed against it; moving to December pushes all of that into the last weeks of the financial year. The venue change is the smaller story — a bigger hall for a show that had outgrown its old one — but the calendar change is the one that quietly reshuffles a year of planning, and the attendance figures above are projections, not a count.",
  },
  {
    slug: "dubai-property-sales-h1-2026",
    site: "dst",
    title: "Dubai property sales reach Dh286b in H1",
    summary:
      "Dubai recorded Dh286.43 billion of property sales across 79,229 transactions in the first half of 2026 — an average of 433 sales and about Dh1.57 billion changing hands every day.",
    date: "2026-07-14",
    category: "Market",
    image: "/news/dubai-property-h1-2026.svg",
    imageAlt:
      "Dubai property sales in H1 2026: Dh286.43 billion across 79,229 transactions, 433 sales a day, with January at Dh72.16 billion against June at Dh32.66 billion.",
    imageKind: "diagram",
    imageCredit: "DST",
    imageWidth: 1200,
    imageHeight: 600,
    imageNarrow: "/news/dubai-property-h1-2026-narrow.svg",
    source: {
      name: "Khaleej Times",
      url: "https://www.khaleejtimes.com/business/dubai-property-sales-hit-dh286b-as-market-momentum-stays-strong-in-h1-2026",
      verifiedOn: "2026-08-25",
    },
    body: [
      "Dubai closed the first half of 2026 with <strong>Dh286.43 billion</strong> in property sales across 79,229 transactions — roughly 433 sales a day and close to Dh1.57 billion changing hands daily.",
      "January was the strongest month of the period, at Dh72.16 billion across 15,896 transactions. June closed with 13,766 sales worth Dh32.66 billion.",
    ],
    expertise:
      "The two published months are worth dividing out. January averaged Dh4.54 million per sale; June averaged Dh2.37 million. So while transactions fell 13% between them, value fell 55% — the gap is the average ticket, which fell 48%. On those figures the market shifted toward cheaper stock rather than simply slowing down. Two months are not a trend, and summer is reliably the quieter half of a Dubai year, but it is the average ticket that carries the information here: a headline total mixes price and volume together and hides which one moved.",
  },
];
