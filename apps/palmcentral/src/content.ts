// Facts about Palm Central Private Residences (Nakheel, Palm Jebel Ali), kept
// in one place so the home page, /prices/, /payment-plan/ and /faq/ can't
// drift apart on the same number.
//
// Two release phases exist and matter for accuracy:
//   - Phase 1 (October 2025): 212 residences, from AED 2.5M, handover August
//     2029. Sold out — per Property Finder, only resale units remain.
//   - Phase 2 (June 2026, current): 222 residences, from AED 2.7M, handover
//     September 2030. This is what a buyer can actually purchase today.
// Every competing site we found was still pitching Phase 1 pricing as
// available. Sources for Phase 2: Nakheel's own press release for unit
// count/types/amenities/completion; The National for per-type pricing.

// The site's default header photo. Every page uses this in its PhotoHero
// unless it has good reason to pass its own image/imageAlt instead — keeping
// it here means there's one place to update if the render changes, not six.
export const siteHeaderImage = {
  src: "/palmcentral.jpg",
  alt: "Night aerial render of Palm Central's beachfront residences and central Spine, Palm Jebel Ali.",
  // Our own render of a development still under construction — labelled on
  // the page, not just in the alt text.
  kind: "render" as const,
};

export const currentPhase = {
  label: "Phase 2",
  released: "June 2026",
  units: 222,
  buildings: 3,
  handover: "September 2030",
  sourceNote:
    "Unit count, types and completion date from Nakheel's press release; per-type pricing from The National's coverage of the launch.",
};

export const soldOutPhase = {
  label: "Phase 1",
  released: "October 2025",
  units: 212,
  handover: "August 2029",
  // Callers already say "is sold out —" themselves; this continues that
  // sentence rather than repeating "sold out" a second time.
  status: "only resale units remain, per Property Finder.",
};

export interface UnitType {
  type: string;
  bedrooms: string;
  priceFrom: string;
  priceFromUsd: string;
  notes?: string;
}

// Phase 2 (current). No 5-bedroom apartments or penthouses have been
// confirmed for this phase in primary coverage — only 1-4BR apartments and
// 4-5BR townhouses, per Nakheel's press release. Don't list units that
// haven't been confirmed for sale.
export const currentUnits: UnitType[] = [
  { type: "1-Bedroom Apartment", bedrooms: "1", priceFrom: "AED 2.7M", priceFromUsd: "$730K" },
  { type: "2-Bedroom Apartment", bedrooms: "2", priceFrom: "AED 4.3M", priceFromUsd: "$1.17M" },
  { type: "3-Bedroom Apartment", bedrooms: "3", priceFrom: "AED 7.5M", priceFromUsd: "$2.04M" },
  { type: "4-Bedroom Apartment", bedrooms: "4", priceFrom: "AED 12.4M", priceFromUsd: "$3.38M" },
  { type: "4–5-Bedroom Townhouse", bedrooms: "4–5", priceFrom: "AED 14.9M", priceFromUsd: "$4.06M" },
];

// Phase 1, for context/comparison only — not currently purchasable as new
// inventory. Kept because "what did the sold-out phase go for" is a real
// question buyers researching the project ask.
export const phase1Units: UnitType[] = [
  { type: "1-Bedroom Apartment", bedrooms: "1", priceFrom: "AED 2.5M", priceFromUsd: "$680K" },
  { type: "2-Bedroom Apartment", bedrooms: "2", priceFrom: "AED 4.26M", priceFromUsd: "$1.16M" },
  { type: "3-Bedroom Apartment", bedrooms: "3", priceFrom: "AED 7.51M", priceFromUsd: "$2.04M" },
  { type: "4-Bedroom Apartment", bedrooms: "4", priceFrom: "AED 12.62M", priceFromUsd: "$3.44M" },
  { type: "5-Bedroom Apartment", bedrooms: "5", priceFrom: "AED 18M", priceFromUsd: "$4.9M" },
  { type: "4-Bedroom Townhouse", bedrooms: "4", priceFrom: "AED 14.18M", priceFromUsd: "$3.86M" },
  { type: "5-Bedroom Penthouse", bedrooms: "5", priceFrom: "AED 31.81M", priceFromUsd: "$8.66M" },
];

export const amenities = [
  { name: "Private beach access", note: "Direct access to the development's stretch of shoreline." },
  { name: "Infinity pools", note: "Beachfront pools with Arabian Gulf views." },
  { name: "Fitness centre", note: "Full gym, confirmed for the current phase." },
  { name: "Games room", note: "Indoor entertainment space." },
  { name: "Kids' club", note: "Dedicated children's facility." },
  { name: "Sports courts", note: "Outdoor courts — Nakheel's release doesn't specify which sports." },
  { name: "Landscaped gardens", note: "Grounds throughout the development." },
];

export const distances = [
  { to: "Ibn Battuta Mall", time: "15 min" },
  { to: "Al Maktoum International Airport", time: "15 min" },
  { to: "Jebel Ali Port", time: "10 min" },
  { to: "Dubai Marina", time: "15–20 min" },
  { to: "JBR Beach", time: "18 min" },
  { to: "Dubai International Airport", time: "20 min" },
  { to: "Mall of the Emirates", time: "20 min" },
  { to: "Downtown Dubai & Burj Khalifa", time: "25 min" },
  { to: "Expo City Dubai", time: "25 min" },
];

export const faqItems = [
  {
    q: "Is Palm Central still available to buy, or is it sold out?",
    a: "Phase 1 (launched October 2025, 212 residences) <strong>is sold out</strong> — only resale units remain, per Property Finder listings. The current inventory is <strong>Phase 2</strong>, released June 2026: 222 residences across the same three buildings, with new pricing and a September 2030 handover. If a site quotes Phase 1 pricing (from AED 2.5M) as currently available, that's the older release.",
  },
  {
    q: "What does Phase 2 of Palm Central cost?",
    a: "Per The National's coverage of the June 2026 launch: <strong>1-bedroom apartments from AED 2.7M</strong>, 2-bedroom from AED 4.3M, 3-bedroom from AED 7.5M, 4-bedroom from AED 12.4M, and 4–5-bedroom townhouses from AED 14.9M. No 5-bedroom apartments or penthouses have been confirmed for this phase.",
  },
  {
    q: "When does Phase 2 hand over?",
    a: "<strong>September 2030</strong>, per Nakheel's press release. This is later than Phase 1's August 2029 handover — a full year further out, which is worth factoring into any investment timeline comparison between the two phases.",
  },
  {
    q: "What is the payment plan?",
    a: "Phase 1 used a <strong>20% booking / 50% during construction</strong> (7–8 installments) <strong>/ 30% on handover</strong> structure. Nakheel's Phase 2 press release doesn't publish exact payment terms — secondary sources describe a similar staged plan, but we're not going to state percentages we can't confirm from the developer or your sales contact. Ask for the current schedule in writing before booking.",
  },
  {
    q: "Is Palm Central eligible for the UAE Golden Visa?",
    a: "Properties valued at <strong>AED 2 million</strong> and above generally qualify for Golden Visa sponsorship, and every unit type in both Palm Central phases clears that threshold. See our Golden Visa page for how the property route actually works, thresholds, and what it changes day to day.",
  },
  {
    q: "Who is the developer, and is this an official Nakheel site?",
    a: "Palm Central is developed by <strong>Nakheel</strong> — the master developer behind Palm Jumeirah, Deira Islands, and the wider Palm Jebel Ali master plan. This site is independent advisory content, not affiliated with or endorsed by Nakheel; official transactions and documentation run through Nakheel or their appointed sales channels.",
  },
  {
    q: "Where exactly is Palm Central on Palm Jebel Ali?",
    a: "On the island's central <strong>Spine, between Fronds M and N</strong> — the part of the master plan set aside for community and retail rather than the villa fronds either side of it. See our location page for what that means for day-to-day access.",
  },
];
