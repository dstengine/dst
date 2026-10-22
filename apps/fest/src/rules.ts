// The decisions the pages make from the data, in one place and with no
// markup: which day it is, what has expired, the order of the hub, what the
// event's structured data says, and what a title must be.
import { hasEnded, lastDay } from "@dst/content/when";
import type { FestEvent, Guide, GuidePage } from "./data/types";
import { expired, pathOf, SITE } from "./copy";

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

interface Price { label: string; amount: number; currency: string; status?: string }
interface Venue { name: string; address: string; lat: number; lon: number; country: string }

/** The MusicEvent for a guide's main page: one event, one URL, so the
    subpages carry none. A plain "MusicEvent" with Festival as its
    additionalType keeps Google's event parser reading it. Offers carry the
    seller's face value until the guide's `prices` expiry, then only their
    hop and availability; once the edition has ended, no offers at all. No
    performer (the organiser ranks no act) and no image until the guide has
    a cover. */
export function musicEvent(event: FestEvent, guide: Guide, page: GuidePage, day: string): Record<string, unknown> {
  const url = `${SITE}${pathOf(page)}`;
  const venue = event.sheet.venue as Venue;
  const prices = event.sheet.prices as Price[];
  const { markup } = event;
  // "4484 Hamilton Highway, Hesse VIC 3321": the street, then the locality,
  // the state and the postcode as Australia writes them.
  const address = /^(.*), (.+) ([A-Z]{2,3}) (\d{4})$/.exec(venue.address);
  if (!address) throw new Error(`${event.slug}: venue.address "${venue.address}" is not "street, locality STATE postcode"`);
  // The offers print the sheet's prices, so the guide must say when they
  // stop being true, as its price spans do.
  if (!guide.expires.prices)
    throw new Error(`${guide.event}/${guide.slug}: the MusicEvent prints prices, and "expires" has no prices date`);
  const offers = hasEnded(event.edition, day)
    ? undefined
    : markup.offers.prices.map((i) => {
        const row = prices[i];
        if (!row) throw new Error(`${event.slug}: markup.offers names prices.${i}, which the sheet lacks`);
        return {
          "@type": "Offer",
          name: row.label,
          ...(expired(guide, "prices", day)
            ? {}
            : { price: row.amount, priceCurrency: row.currency, priceValidUntil: guide.expires.prices }),
          ...(row.status === "sold out" ? { availability: "https://schema.org/SoldOut" } : {}),
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
      address: {
        "@type": "PostalAddress",
        streetAddress: address[1],
        addressLocality: address[2],
        addressRegion: address[3],
        postalCode: address[4],
        addressCountry: venue.country,
      },
      geo: { "@type": "GeoCoordinates", latitude: venue.lat, longitude: venue.lon },
    },
    // The organiser's site as `sameAs`, not `url`: the network's structured
    // data names a third party only as an identity (tests/outbound-links).
    organizer: { "@type": "Organization", name: markup.organizer.name, sameAs: markup.organizer.url },
    publisher: { "@id": "https://fest.one/#organization" },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    ...(offers ? { offers } : {}),
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
