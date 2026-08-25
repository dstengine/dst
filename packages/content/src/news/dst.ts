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
    image: "/news/dubai-property-h1-2026.svg",
    imageAlt:
      "Dubai property sales in H1 2026: Dh286.43 billion across 79,229 transactions, 433 sales a day, with January at Dh72.16 billion against June at Dh32.66 billion.",
    imageKind: "illustration",
    imageCredit: "DST",
    imageWidth: 1200,
    imageHeight: 600,
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
