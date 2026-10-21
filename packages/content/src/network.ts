// The map of the network: what each site is, and which of its pages are
// worth linking to from elsewhere.
//
// It exists because the link graph ran one way. Every vertical linked to
// the hub from every page — 7 to 12 links each — and the hub linked back
// two to four times, at the home page only. Everything a visitor or a
// crawler could follow led inward to dst.llc and stopped there, so the
// verticals had no standing of their own.
//
// Links are curated per site rather than generated all-to-all: a block of
// every site linking to every other site is a link farm, and it reads like
// one to a person too. Each entry below is a route someone actually has a
// reason to take.

export interface NetworkLink {
  href: string;
  label: string;
  /** The anchor's title attribute — says more than the label alone. */
  title: string;
}

export interface NetworkSite {
  key: string;
  host: string;
  name: string;
  /** One line on what the site is, for the hub's own listing. */
  blurb: string;
  /** Pages worth arriving on directly, not just the home page — the two or
      three the hub's footer carries on every page. */
  links: NetworkLink[];
  /** Every page the site has written by hand, feeds aside. The curated
      `links` above are a subset. Read by the hub's /network/ page, which
      exists so that each of these has at least one link from an indexable
      page — a page only a sitemap knows about is a page a crawler reaches
      last and revisits least. */
  pages: NetworkLink[];
}

const site = (key: string, host: string, name: string, blurb: string, links: NetworkLink[], pages: NetworkLink[]): NetworkSite => ({
  key, host, name, blurb, links, pages,
});

const url = (host: string, path = "/") => `https://${host}${path}`;

export const NETWORK: NetworkSite[] = [
  site("llc", "llc.dst.llc", "Company formation", "Setting a company up in Dubai: where to register it, what it costs, and what it owes afterwards.", [
    { href: url("llc.dst.llc", "/registration/"), label: "Registration", title: "What company registration in Dubai involves, step by step" },
    { href: url("llc.dst.llc", "/zones/"), label: "Free zones", title: "Free zones compared — cost, activity and ownership" },
    { href: url("llc.dst.llc", "/taxation/"), label: "Corporate tax", title: "Corporate tax and filing obligations in the UAE" },
  ], [
    { href: url("llc.dst.llc", "/registration/"), label: "Registration", title: "Registering a company in Dubai, step by step" },
    { href: url("llc.dst.llc", "/zones/"), label: "Free zones", title: "Dubai free zones compared by activity fit, with a decision guide" },
    { href: url("llc.dst.llc", "/mainland/"), label: "Mainland", title: "When a Dubai mainland licence is required, and how it differs from a free zone" },
    { href: url("llc.dst.llc", "/taxation/"), label: "Corporate tax", title: "Corporate tax and filing for a Dubai company" },
    { href: url("llc.dst.llc", "/banking/"), label: "Banking", title: "Opening a business bank account in Dubai as a non-resident founder" },
    { href: url("llc.dst.llc", "/financing/"), label: "Financing", title: "Financing a Dubai company once it trades" },
    { href: url("llc.dst.llc", "/payments/"), label: "Payments", title: "Stripe and payment processing for a Dubai company" },
  ]),
  site("visas", "visas.dst.llc", "Residency and visas", "UAE residency routes, from a standard employment visa to the ten-year Golden Visa.", [
    { href: url("visas.dst.llc", "/golden/"), label: "Golden Visa", title: "The Golden Visa via property — thresholds and the actual process" },
    { href: url("visas.dst.llc", "/properties/"), label: "Eligible property", title: "Which properties qualify for the Golden Visa" },
    { href: url("visas.dst.llc", "/family/"), label: "Family visas", title: "Sponsoring a spouse and children on a UAE residency" },
  ], [
    { href: url("visas.dst.llc", "/golden/"), label: "Golden Visa", title: "The UAE Golden Visa through property — thresholds and the actual process" },
    { href: url("visas.dst.llc", "/properties/"), label: "Eligible property", title: "Developments that already clear the Golden Visa investment threshold" },
    { href: url("visas.dst.llc", "/family/"), label: "Family", title: "A UAE Golden Visa from the family's side: schooling, healthcare, settling in" },
    { href: url("visas.dst.llc", "/consultation/"), label: "Consultation", title: "Request a UAE residency consultation" },
  ]),
  site("palmcentral", "palmcentral.dst.llc", "Palm Central", "Nakheel's Palm Central on Palm Jebel Ali — prices, payment plan and what is actually released.", [
    { href: url("palmcentral.dst.llc", "/prices/"), label: "Prices", title: "Palm Central price list by unit type and phase" },
    { href: url("palmcentral.dst.llc", "/payment-plan/"), label: "Payment plan", title: "The Palm Central payment plan, and what to confirm before booking" },
    { href: url("palmcentral.dst.llc", "/location/"), label: "Location", title: "Where Palm Central sits, and the real drive times" },
  ], [
    { href: url("palmcentral.dst.llc", "/prices/"), label: "Prices", title: "Palm Central prices by unit type, both release phases" },
    { href: url("palmcentral.dst.llc", "/payment-plan/"), label: "Payment plan", title: "The Palm Central payment plan, and what to get in writing before booking" },
    { href: url("palmcentral.dst.llc", "/location/"), label: "Location", title: "Where Palm Central sits on Palm Jebel Ali, and the real drive times" },
    { href: url("palmcentral.dst.llc", "/golden-visa/"), label: "Golden Visa", title: "Palm Central and the AED 2 million Golden Visa threshold" },
    { href: url("palmcentral.dst.llc", "/faq/"), label: "FAQ", title: "Palm Central: availability, pricing, payment plan and location, asked and answered" },
    { href: url("palmcentral.dst.llc", "/privacy/"), label: "Privacy", title: "What the Palm Central site collects when you register interest" },
  ]),
  site("riviera", "riviera.dst.llc", "Azizi Riviera", "Day-to-day life in Azizi Riviera: what has been handed over, what it costs to rent, where to eat.", [
    { href: url("riviera.dst.llc", "/rent/"), label: "Renting", title: "What renting in Azizi Riviera actually costs" },
    { href: url("riviera.dst.llc", "/food/"), label: "Food", title: "Where to eat in and around Azizi Riviera" },
    { href: url("riviera.dst.llc", "/money/"), label: "Crypto nearby", title: "Where to change crypto near Azizi Riviera" },
  ], [
    { href: url("riviera.dst.llc", "/rent/"), label: "Renting", title: "What renting in Azizi Riviera actually costs" },
    { href: url("riviera.dst.llc", "/food/"), label: "Food", title: "Restaurants and groceries in and around Azizi Riviera" },
    { href: url("riviera.dst.llc", "/coffee/"), label: "Coffee", title: "Coffee in Azizi Riviera — the cafés, building by building" },
    { href: url("riviera.dst.llc", "/coffee/homebrew/"), label: "Homebrew", title: "Homebrew, Azizi Riviera Building 24: hours, menu and when to go" },
    { href: url("riviera.dst.llc", "/pools/"), label: "Pools", title: "Pool access in Azizi Riviera, block by block" },
    { href: url("riviera.dst.llc", "/water/"), label: "Swimming", title: "Where to swim near Azizi Riviera" },
    { href: url("riviera.dst.llc", "/sport/"), label: "Sport", title: "Sport in Azizi Riviera — what changed, and when" },
    { href: url("riviera.dst.llc", "/money/"), label: "Crypto nearby", title: "Where to change crypto near Azizi Riviera" },
  ]),
  site("mbr", "mbr.dst.llc", "MBR City", "What Mohammed Bin Rashid City is, district by district, and what living there is like.", [
    { href: url("mbr.dst.llc", "/rent/"), label: "Renting", title: "What renting in MBR City actually costs" },
    { href: url("mbr.dst.llc", "/pools/"), label: "The lagoon", title: "Swimming in MBR City — the crystal lagoon and the pools" },
    { href: url("mbr.dst.llc", "/money/"), label: "Crypto nearby", title: "Where to change crypto near MBR City" },
  ], [
    { href: url("mbr.dst.llc", "/rent/"), label: "Renting", title: "What renting in MBR City actually costs" },
    { href: url("mbr.dst.llc", "/food/"), label: "Food", title: "Dining and groceries across MBR City's communities" },
    { href: url("mbr.dst.llc", "/coffee/"), label: "Coffee", title: "Where to get coffee across MBR City" },
    { href: url("mbr.dst.llc", "/pools/"), label: "The lagoon", title: "The crystal lagoon and the pools of MBR City" },
    { href: url("mbr.dst.llc", "/water/"), label: "Swimming", title: "Where to swim in MBR City" },
    { href: url("mbr.dst.llc", "/transport/"), label: "Transport", title: "Getting in and out of MBR City" },
    { href: url("mbr.dst.llc", "/money/"), label: "Crypto nearby", title: "Where to change crypto near MBR City" },
  ]),
  site("eco", "eco.dst.llc", "Eco portfolio", "A running record of the environmental initiatives DST funds, added as they happen.", [
    { href: url("eco.dst.llc", "/portfolio/shilovka-shaytanka/"), label: "Shilovka–Shaytanka", title: "The Shilovka–Shaytanka planting, in detail" },
  ], [
    { href: url("eco.dst.llc", "/exhibitions/"), label: "Exhibitions", title: "Where the eco portfolio has been shown" },
    { href: url("eco.dst.llc", "/portfolio/shilovka-shaytanka/"), label: "Shilovka–Shaytanka", title: "The Shilovka–Shaytanka planting, in detail" },
  ]),
];

export const siteByKey = (key: string) => NETWORK.find((s) => s.key === key);

// Who links to whom, and why. eco is deliberately absent from every list:
// it links to dst.llc and back, and to no vertical — an environmental
// record has nothing to do with visas or off-plan property, and pretending
// otherwise is what makes a network look manufactured.
const RELATED: Record<string, string[]> = {
  llc: ["visas"],
  visas: ["llc", "palmcentral"],
  palmcentral: ["visas"],
  // District guides point at each other and stop there. A guide to living
  // somewhere is not a residency-visa enquiry, and putting visas in the
  // footer of every page of both guides made it the most-linked host in
  // the network by a factor of three — which is what a link scheme looks
  // like from the outside.
  riviera: ["mbr"],
  mbr: ["riviera"],
  eco: [],
  dst: [],
};

/** The two or three links a given site shows towards the rest of the network. */
export function relatedLinks(key: string, perSite = 2): NetworkLink[] {
  return (RELATED[key] ?? []).flatMap((other) => {
    const target = siteByKey(other);
    if (!target) return [];
    return [
      { href: url(target.host), label: target.name, title: `${target.name} — ${target.blurb}` },
      ...target.links.slice(0, perSite - 1),
    ];
  });
}
