import type { City } from "./types";

// Cities a run plays in. Most of them exist here only to be named and
// linked; a city gets a page of its own once it has two events to list, or
// when it is marked featured. See cityHasPage() in ../rules.ts — a page per
// city with one show on it would be the same facts at a second address.

export const cities: City[] = [
  {
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    featured: true,
    summary:
      "Dubai takes its touring musicals between October and April, when the evenings are worth walking to. The 2026 season leads with Chicago at Coca-Cola Arena.",
  },
  { slug: "new-york", name: "New York", country: "United States" },
  { slug: "tokyo", name: "Tokyo", country: "Japan" },
  { slug: "osaka", name: "Osaka", country: "Japan" },
  { slug: "wimbledon", name: "Wimbledon", country: "United Kingdom" },
  { slug: "plymouth", name: "Plymouth", country: "United Kingdom" },
  { slug: "cardiff", name: "Cardiff", country: "United Kingdom" },
  { slug: "sheffield", name: "Sheffield", country: "United Kingdom" },
  { slug: "liverpool", name: "Liverpool", country: "United Kingdom" },
  { slug: "newcastle", name: "Newcastle", country: "United Kingdom" },
  { slug: "bournemouth", name: "Bournemouth", country: "United Kingdom" },
  { slug: "glasgow", name: "Glasgow", country: "United Kingdom" },
  { slug: "aberdeen", name: "Aberdeen", country: "United Kingdom" },
  { slug: "manchester", name: "Manchester", country: "United Kingdom" },
  { slug: "york", name: "York", country: "United Kingdom" },
  { slug: "blackpool", name: "Blackpool", country: "United Kingdom" },
  { slug: "nottingham", name: "Nottingham", country: "United Kingdom" },
  { slug: "bradford", name: "Bradford", country: "United Kingdom" },
  { slug: "dublin", name: "Dublin", country: "Ireland" },
  { slug: "southend", name: "Southend", country: "United Kingdom" },
  { slug: "eastbourne", name: "Eastbourne", country: "United Kingdom" },
  { slug: "birmingham", name: "Birmingham", country: "United Kingdom" },
  { slug: "norwich", name: "Norwich", country: "United Kingdom" },
  { slug: "brighton", name: "Brighton", country: "United Kingdom" },
  { slug: "belfast", name: "Belfast", country: "United Kingdom" },
  { slug: "bristol", name: "Bristol", country: "United Kingdom" },
  { slug: "milton-keynes", name: "Milton Keynes", country: "United Kingdom" },
  { slug: "truro", name: "Truro", country: "United Kingdom" },
  { slug: "oxford", name: "Oxford", country: "United Kingdom" },
  { slug: "hull", name: "Hull", country: "United Kingdom" },
  { slug: "llandudno", name: "Llandudno", country: "United Kingdom" },
  { slug: "sunderland", name: "Sunderland", country: "United Kingdom" },
  { slug: "dartford", name: "Dartford", country: "United Kingdom" },
  { slug: "woking", name: "Woking", country: "United Kingdom" },
  { slug: "cheltenham", name: "Cheltenham", country: "United Kingdom" },
  { slug: "stoke", name: "Stoke", country: "United Kingdom" },
  { slug: "edinburgh", name: "Edinburgh", country: "United Kingdom" },
];
