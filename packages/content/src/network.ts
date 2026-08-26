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
  /** Pages worth arriving on directly, not just the home page. */
  links: NetworkLink[];
}

const site = (key: string, host: string, name: string, blurb: string, links: NetworkLink[]): NetworkSite => ({
  key, host, name, blurb, links,
});

const url = (host: string, path = "/") => `https://${host}${path}`;

export const NETWORK: NetworkSite[] = [
  site("llc", "llc.dst.llc", "Company formation", "Setting a company up in Dubai: where to register it, what it costs, and what it owes afterwards.", [
    { href: url("llc.dst.llc", "/registration/"), label: "Registration", title: "What company registration in Dubai involves, step by step" },
    { href: url("llc.dst.llc", "/zones/"), label: "Free zones", title: "Free zones compared — cost, activity and ownership" },
    { href: url("llc.dst.llc", "/taxation/"), label: "Corporate tax", title: "Corporate tax and filing obligations in the UAE" },
  ]),
  site("visas", "visas.dst.llc", "Residency and visas", "UAE residency routes, from a standard employment visa to the ten-year Golden Visa.", [
    { href: url("visas.dst.llc", "/golden/"), label: "Golden Visa", title: "The Golden Visa via property — thresholds and the actual process" },
    { href: url("visas.dst.llc", "/properties/"), label: "Eligible property", title: "Which properties qualify for the Golden Visa" },
    { href: url("visas.dst.llc", "/family/"), label: "Family visas", title: "Sponsoring a spouse and children on a UAE residency" },
  ]),
  site("palmcentral", "palmcentral.dst.llc", "Palm Central", "Nakheel's Palm Central on Palm Jebel Ali — prices, payment plan and what is actually released.", [
    { href: url("palmcentral.dst.llc", "/prices/"), label: "Prices", title: "Palm Central price list by unit type and phase" },
    { href: url("palmcentral.dst.llc", "/payment-plan/"), label: "Payment plan", title: "The Palm Central payment plan, and what to confirm before booking" },
    { href: url("palmcentral.dst.llc", "/location/"), label: "Location", title: "Where Palm Central sits, and the real drive times" },
  ]),
  site("riviera", "riviera.dst.llc", "Azizi Riviera", "Day-to-day life in Azizi Riviera: what has been handed over, what it costs to rent, where to eat.", [
    { href: url("riviera.dst.llc", "/rent/"), label: "Renting", title: "What renting in Azizi Riviera actually costs" },
    { href: url("riviera.dst.llc", "/food/"), label: "Food", title: "Where to eat in and around Azizi Riviera" },
    { href: url("riviera.dst.llc", "/money/"), label: "Crypto nearby", title: "Where to change crypto near Azizi Riviera" },
  ]),
  site("mbr", "mbr.dst.llc", "MBR City", "What Mohammed Bin Rashid City is, district by district, and what living there is like.", [
    { href: url("mbr.dst.llc", "/rent/"), label: "Renting", title: "What renting in MBR City actually costs" },
    { href: url("mbr.dst.llc", "/pools/"), label: "The lagoon", title: "Swimming in MBR City — the crystal lagoon and the pools" },
    { href: url("mbr.dst.llc", "/money/"), label: "Crypto nearby", title: "Where to change crypto near MBR City" },
  ]),
  site("eco", "eco.dst.llc", "Eco portfolio", "A running record of the environmental initiatives DST funds, added as they happen.", [
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
