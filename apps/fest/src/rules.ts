// The decisions the pages make from the data, in one place and with no
// markup: which day it is, what has expired, the order of the hub, what the
// event's structured data says, and what a title must be.
import { hasEnded, lastDay } from "@dst/content/when";
import type { FestEvent, Guide, GuidePage } from "./data/types";
import { expired, pathOf, resolve, SITE } from "./copy";

/** The day the build is for, ISO. `FEST_TODAY` sets it, so the expiry of a
    price can be built and tested before the day comes (and a session on
    another card can run the suites green on the day it does). UTC, which is
    what Vercel builds in. */
export function today(): string {
  const set = process.env.FEST_TODAY;
  if (set && !/^\d{4}-\d{2}-\d{2}$/.test(set)) throw new Error(`FEST_TODAY=${set}: not an ISO day`);
  return set || new Date().toISOString().slice(0, 10);
}

export const eventOf = (events: FestEvent[], guide: Guide): FestEvent => {
  const event = events.find((e) => e.slug === guide.event);
  if (!event) throw new Error(`guide ${guide.slug} names event "${guide.event}", which no file has`);
  return event;
};

export const mainPage = (guide: Guide): GuidePage => {
  const main = guide.pages.find((p) => pathOf(p) === guide.path);
  if (!main) throw new Error(`${guide.event}/${guide.slug}: no page at the guide's own path ${guide.path}`);
  return main;
};

/** The hub's order: editions still to come or on now by their first day,
    soonest first; then the ones that have ended, the most recent first;
    ties by the event's name, then the guide's locale. A reader looking for
    their festival finds the next ones at the top, and a guide whose edition
    is over does not sit above one that is about to start because it was
    written later. */
export function hubOrder(guides: Guide[], events: FestEvent[], day: string): Guide[] {
  return [...guides].sort((a, b) => {
    const ea = eventOf(events, a).edition;
    const eb = eventOf(events, b).edition;
    const enda = hasEnded(ea, day);
    const endb = hasEnded(eb, day);
    if (enda !== endb) return enda ? 1 : -1;
    const by = enda ? lastDay(eb).localeCompare(lastDay(ea)) : ea.start.localeCompare(eb.start);
    return by || eventOf(events, a).name.localeCompare(eventOf(events, b).name) || a.slug.localeCompare(b.slug);
  });
}

/** A price row of the sheet. `total` is the seller's price with its fee,
    where the seller prints both (Moshtix): it is what a buyer pays, which
    is what Google's Event reference asks an offer's price to be. */
interface Price { label: string; amount: number; total?: number; currency: string; status?: string }

/** Sold out in the seller's own words: Megatix's "sold out", Moshtix's
    "Allocation Exhausted". */
const soldOut = (status = "") => status === "sold out" || status.startsWith("Allocation Exhausted");
interface Venue { name: string; address: string; lat: number; lon: number; country: string }

/** The MusicEvent for a guide's main page: one event, one URL, so the
    subpages carry none. A plain "MusicEvent" with Festival as its
    additionalType keeps Google's event parser reading it. Offers carry the
    seller's face value until the guide's `prices` expiry, then only their
    hop and availability; once the edition has ended, no offers at all. The
    expiry is the day we take our figures down, not a day the seller stops
    selling at them, so it is never printed as `priceValidUntil`: an offer
    names only the dates its sources give, and none of ours gives a date on
    which a price ends. No performer (the organiser ranks no act) and no
    image until the guide has a cover. */
export function musicEvent(event: FestEvent, guide: Guide, page: GuidePage, day: string): Record<string, unknown> {
  const url = `${SITE}${pathOf(page)}`;
  const venue = event.sheet.venue as Venue;
  const prices = event.sheet.prices as Price[];
  const { markup } = event;
  // "4484 Hamilton Highway, Hesse VIC 3321": the street, then the locality,
  // the state and the postcode as Australia writes them. A venue elsewhere
  // gives its parts in markup.address ("Av. Blanco Encalada 2540, Santiago
  // Centro, Santiago, Chile" has no state and no postcode to read).
  const postal = markup.address ?? { ...australian(event.slug, venue.address), addressCountry: venue.country };
  // The point the markup names: the venue's own marker where the guide
  // took it (Creamfields Chile's club page), else the scout's pair.
  const at = markup.geo ? (resolve(event.sheet, markup.geo) as { lat: number; lon: number } | undefined) : venue;
  if (!at || typeof at.lat !== "number" || typeof at.lon !== "number")
    throw new Error(`${event.slug}: markup.geo "${markup.geo}" names no { lat, lon } in the sheet`);
  // The offers print the sheet's prices, so the guide must say when they
  // stop being true, as its price spans do.
  if (!guide.expires.prices)
    throw new Error(`${guide.event}/${guide.slug}: the MusicEvent prints prices, and "expires" has no prices date`);
  const shown = !expired(guide, "prices", day);
  const offers = hasEnded(event.edition, day)
    ? undefined
    : !("prices" in markup.offers)
      ? [single(event, markup.offers, shown)]
      : markup.offers.prices.map((i) => {
          const row = prices[i];
          if (!row) throw new Error(`${event.slug}: markup.offers names prices.${i}, which the sheet lacks`);
          return {
            "@type": "Offer",
            name: row.label,
            ...(shown ? { price: row.total ?? row.amount, priceCurrency: row.currency } : {}),
            ...(soldOut(row.status) ? { availability: "https://schema.org/SoldOut" } : {}),
            validFrom: markup.offers.validFrom,
            url: `${SITE}/go/${event.slug}-${markup.offers.go}/`,
            seller: { "@type": "Organization", name: markup.offers.seller },
          };
        });
  return {
    "@type": "MusicEvent",
    additionalType: "https://schema.org/Festival",
    "@id": `${url}#event`,
    name: page.h1,
    url,
    description: page.description,
    startDate: markup.startDate,
    endDate: markup.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: venue.name,
      address: { "@type": "PostalAddress", ...postal },
      geo: { "@type": "GeoCoordinates", latitude: at.lat, longitude: at.lon },
    },
    // The organiser's site as `sameAs`, not `url`: the network's structured
    // data names a third party only as an identity (tests/outbound-links).
    // None where the organiser has no site of its own (Creamfields Chile's
    // only channel is Instagram, a third party's page, which stays a hop).
    organizer: {
      "@type": "Organization",
      name: markup.organizer.name,
      ...(markup.organizer.url ? { sameAs: markup.organizer.url } : {}),
    },
    publisher: { "@id": "https://fest.one/#organization" },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    ...(offers ? { offers } : {}),
  };
}

/** An Australian address in its parts, in the order the markup prints
    them. */
function australian(slug: string, address: string) {
  const parts = /^(.*), (.+) ([A-Z]{2,3}) (\d{4})$/.exec(address);
  if (!parts) throw new Error(`${slug}: venue.address "${address}" is not "street, locality STATE postcode"; give markup.address`);
  return { streetAddress: parts[1], addressLocality: parts[2], addressRegion: parts[3], postalCode: parts[4] };
}

/** One offer at one sheet figure, for a seller whose prices carry no fee
    and whose total no source prints (Creamfields Chile: Punto Ticket's
    tables, the 12,5% charge added at checkout). The figure is a cell the
    page prints; which cell moves only when the scout re-reads the tables.
    No name, no availability: the seller says nothing about stock. */
function single(event: FestEvent, offers: { price: { key: string; currency: string }; go: string; seller: string; validFrom: string }, shown: boolean) {
  const figure = resolve(event.sheet, offers.price.key) as { amount?: unknown } | undefined;
  if (typeof figure?.amount !== "number") throw new Error(`${event.slug}: markup.offers.price.key "${offers.price.key}" names no { amount } in the sheet`);
  return {
    "@type": "Offer",
    ...(shown ? { price: figure.amount, priceCurrency: offers.price.currency } : {}),
    validFrom: offers.validFrom,
    url: `${SITE}/go/${event.slug}-${offers.go}/`,
    seller: { "@type": "Organization", name: offers.seller },
  };
}

/** Sixty code points is where a result's title is cut; the keyword is what
    the title is for. Checked on the title as printed, suffix included. */
export function assertTitle(printed: string, keyword: string, where: string) {
  const length = [...printed].length;
  if (length > 60) throw new Error(`${where}: the title "${printed}" is ${length} code points, over 60`);
  if (!printed.toLowerCase().includes(keyword.toLowerCase()))
    throw new Error(`${where}: the title "${printed}" lacks the keyword "${keyword}"`);
}
