// The hub's own verticals, as sections of dst.llc.
//
// Each of these has a site of its own on a subdomain. Those subdomains are
// not indexed, so their subjects — company formation, residency, two
// developments, two districts, the eco record — reach no one arriving from
// a search. A section here is the indexable address for the subject.
//
// It is not a mirror. The subdomain and the section cover the same ground
// in different words, written from different ends, because two hosts
// carrying one text compete with each other and the search engine picks the
// winner rather than us. `tools/overlap.mjs` is what keeps that honest.
//
// Everything about a section lives in this file: its pages, its sub-nav,
// the card on the front page, the label a breadcrumb prints. A seventh
// vertical is an entry here and nothing else — no template learns about it.

export interface VerticalPage {
  /** Path under the section, no slashes at either end: "zones", "coffee/homebrew". */
  path: string;
  /** What the chip says. */
  label: string;
  /** The chip's tooltip — says more than the label, per the network's rule. */
  title: string;
}

export interface Vertical {
  slug: string;
  /** The section's name, and what a breadcrumb prints instead of the slug. */
  name: string;
  /** One line for the card on the front page and on /sections/. */
  blurb: string;
  /** The subject of this section, which is not always the site's keyword.
      Used when writing the pages, and the reason eco is exempt from it. */
  subject: string;
  /** The vertical's own site. One link out per section, no more: these
      hosts are not indexed, and a block of links to them from every page
      would be a link scheme pointing at nothing. */
  host: string;
  /** Written, built and linked. A section is an address the moment it has
      pages; until then its entry here reserves the slug and describes the
      work, and nothing links to it — a menu that points at a 404 is worse
      than a menu that is short. */
  ready?: boolean;
  /** Card art on the front page. */
  image?: string;
  imageAlt?: string;
  pages: VerticalPage[];
}

export const VERTICALS: Vertical[] = [
  {
    slug: "llc",
    name: "Company formation",
    blurb: "Setting a company up in Dubai: where to register it, what it costs, and what it owes afterwards.",
    subject: "Dubai",
    host: "llc.dst.llc",
    ready: true,
    pages: [
      { path: "zones", label: "Free zones", title: "Dubai free zones compared — cost, activity, ownership" },
      { path: "mainland", label: "Mainland", title: "Mainland company setup in Dubai" },
      { path: "registration", label: "Registration", title: "Registering a company in Dubai, step by step" },
      { path: "taxation", label: "Tax", title: "Corporate tax and filing for a Dubai company" },
      { path: "banking", label: "Banking", title: "Opening a business account in Dubai" },
      { path: "financing", label: "Financing", title: "Financing a Dubai company once it trades" },
      { path: "payments", label: "Payments", title: "Taking card payments as a Dubai company" },
    ],
  },
  {
    slug: "visas",
    name: "Residency and visas",
    // Not "the ten-year Golden Visa": the federal portal and the Dubai Land
    // Department currently give different durations for the same property
    // route, and the blurb is not the place to pick a winner.
    blurb: "UAE residency routes, from a sponsored employment visa to the Golden Visa and what each one costs.",
    subject: "Dubai",
    host: "visas.dst.llc",
    ready: true,
    pages: [
      { path: "golden", label: "Golden Visa", title: "The Golden Visa through Dubai property" },
      { path: "properties", label: "Eligible property", title: "Which Dubai properties qualify for the Golden Visa" },
      { path: "family", label: "Family", title: "Sponsoring a family on a Dubai residency" },
      { path: "consultation", label: "Consultation", title: "Talk to someone about a Dubai residency" },
    ],
  },
  {
    slug: "palm-central",
    ready: true,
    name: "Palm Central",
    blurb: "Nakheel's Palm Central on Palm Jebel Ali — prices, payment plan and what is actually released.",
    subject: "Palm Jebel Ali",
    host: "palmcentral.dst.llc",
    image: "/palmcentral.jpg",
    imageAlt:
      "Night aerial render of Palm Central's beachfront residences and central Spine, Palm Jebel Ali.",
    pages: [
      { path: "prices", label: "Prices", title: "Palm Central prices by unit type and phase" },
      { path: "payment-plan", label: "Payment plan", title: "The Palm Central payment plan, and what to confirm first" },
      { path: "location", label: "Location", title: "Where Palm Central sits, and the real drive times" },
      { path: "golden-visa", label: "Golden Visa", title: "Palm Central and the Dubai Golden Visa threshold" },
      { path: "faq", label: "FAQ", title: "Palm Central: the questions buyers actually ask" },
      { path: "privacy", label: "Privacy", title: "How the Palm Central pages handle an enquiry" },
    ],
  },
  {
    slug: "riviera",
    name: "Azizi Riviera",
    blurb: "Day-to-day life in Azizi Riviera: what has been handed over, what it costs to rent, where to eat.",
    subject: "Azizi Riviera",
    host: "riviera.dst.llc",
    image: "/riviera.jpg",
    imageAlt:
      "Illustration of the Azizi Riviera promenade at night: lit low-rise blocks along a canal, palms and walkways at the water's edge.",
    pages: [
      { path: "rent", label: "Renting", title: "What renting in Azizi Riviera actually costs" },
      { path: "food", label: "Food", title: "Where to eat in and around Azizi Riviera" },
      { path: "coffee", label: "Coffee", title: "Coffee in Azizi Riviera" },
      { path: "coffee/homebrew", label: "Homebrew", title: "Making coffee at home in Azizi Riviera" },
      { path: "pools", label: "Pools", title: "Swimming in Azizi Riviera" },
      { path: "water", label: "Water", title: "Drinking water in Azizi Riviera" },
      { path: "sport", label: "Sport", title: "Training and sport around Azizi Riviera" },
      { path: "money", label: "Crypto nearby", title: "Where to change crypto near Azizi Riviera" },
    ],
  },
  {
    slug: "mbr",
    name: "MBR City",
    blurb: "What Mohammed Bin Rashid City is, district by district, and what living there is like.",
    subject: "MBR City",
    host: "mbr.dst.llc",
    pages: [
      { path: "rent", label: "Renting", title: "What renting in MBR City actually costs" },
      { path: "food", label: "Food", title: "Where to eat in MBR City" },
      { path: "coffee", label: "Coffee", title: "Coffee in MBR City" },
      { path: "pools", label: "The lagoon", title: "The crystal lagoon and the pools of MBR City" },
      { path: "water", label: "Water", title: "Drinking water in MBR City" },
      { path: "transport", label: "Transport", title: "Getting in and out of MBR City" },
      { path: "money", label: "Crypto nearby", title: "Where to change crypto near MBR City" },
    ],
  },
  {
    slug: "eco",
    name: "Eco portfolio",
    blurb: "A running record of the environmental initiatives DST funds, added as they happen.",
    // Not Dubai, and not pretended to be: the plantings are in the Urals.
    // This is the one section exempt from the hub's head keyword, because
    // the alternative is a false sentence and the rule says a keyword is
    // never worth one.
    subject: "environmental record",
    host: "eco.dst.llc",
    pages: [
      { path: "exhibitions", label: "Exhibitions", title: "Where the eco portfolio has been shown" },
      { path: "portfolio/shilovka-shaytanka", label: "Shilovka–Shaytanka", title: "The Shilovka–Shaytanka planting, in detail" },
    ],
  },
];

export const verticalBySlug = (slug: string) => VERTICALS.find((v) => v.slug === slug);

/** Sections that are actually built, in registry order. */
export const readyVerticals = (): Vertical[] => VERTICALS.filter((v) => v.ready);

/** Every address a built section claims, section roots included — what the
    route test checks against `dist`. Slugs that are merely reserved are not
    addresses yet, so they are not in here. `sections.ts` reserves all six
    from `VERTICALS` separately, because a slug has to be taken before the
    page behind it exists or a topic tag will win the route quietly. */
export const verticalPaths = (): string[] =>
  readyVerticals().flatMap((v) => [`/${v.slug}/`, ...v.pages.map((p) => `/${v.slug}/${p.path}/`)]);

/** The sub-nav for one section: the section root first, then its pages. */
export const verticalNav = (v: Vertical) => [
  { href: `/${v.slug}/`, label: "Overview", title: `${v.name} — ${v.blurb}` },
  ...v.pages.map((p) => ({ href: `/${v.slug}/${p.path}/`, label: p.label, title: p.title })),
];
