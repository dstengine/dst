// Structured data for the two things this site describes: a band, and the
// nights it plays. Both are built from the same dataset the page renders,
// so the markup cannot drift from the visible text.
import { itemContext } from "@dst/ui/schema";
import { publisher, origin } from "./content";
import { band } from "./data/band";
import type { Show } from "./data/tours";

export const musicGroup = {
  "@type": "MusicGroup",
  "@id": `${origin}/#band`,
  name: band.name,
  foundingDate: band.formed,
  foundingLocation: { "@type": "Place", name: band.origin },
  // No `member` nodes. The network's structured-data test rejects a Person
  // anywhere in the graph — it exists to stop invented bylines, and the
  // line-up is on the page as text either way, so the guardrail stands.
};

/** One night, as a MusicEvent. `canonical` is the page it appears on. */
// Every country on either routing, by the zone its clocks keep. The offset
// is read for the night itself, so a date either side of a clock change gets
// the right one without a rule written here — the London opener falls three
// days after BST ends and is GMT; the summer run is all CEST.
const ZONES: Record<string, string> = {
  "United Kingdom": "Europe/London",
  France: "Europe/Paris",
  Germany: "Europe/Berlin",
  Belgium: "Europe/Brussels",
  Netherlands: "Europe/Amsterdam",
  Switzerland: "Europe/Zurich",
  Italy: "Europe/Rome",
  Austria: "Europe/Vienna",
  Luxembourg: "Europe/Luxembourg",
  Spain: "Europe/Madrid",
  Poland: "Europe/Warsaw",
};

function utcOffset(date: string, time: string, zone: string): string {
  const name = new Intl.DateTimeFormat("en-GB", { timeZone: zone, timeZoneName: "longOffset" })
    .formatToParts(new Date(`${date}T${time}:00Z`))
    .find((part) => part.type === "timeZoneName")!.value;
  return name === "GMT" ? "+00:00" : name.slice(3);
}

/** A seller's price is printed for six weeks after it was read, then left
    out: after that it is more likely wrong than right. */
export const PRICE_STALE_DAYS = 42;
export const freshPrice = (show: Show, today = new Date()) =>
  show.price && (today.getTime() - Date.parse(show.price.checkedOn)) / 86_400_000 <= PRICE_STALE_DAYS
    ? show.price
    : undefined;

export function musicEvent(show: Show, tourName: string, canonical: string) {
  const zone = ZONES[show.country];
  // A time with no zone we can vouch for is left off: a date alone is true,
  // a date with the wrong hour is not.
  const startDate = show.startTime && zone
    ? `${show.date}T${show.startTime}:00${utcOffset(show.date, show.startTime, zone)}`
    : show.date;
  const price = freshPrice(show);
  return {
    "@type": "MusicEvent",
    "@id": `${canonical}#${show.date}-${show.city.toLowerCase().replace(/[^a-z]+/g, "-")}`,
    name: `${tourName}: ${band.name} in ${show.city}`,
    startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    performer: { "@id": musicGroup["@id"] },
    location: {
      "@type": "Place",
      name: show.venue ?? show.city,
      address: {
        "@type": "PostalAddress",
        addressLocality: show.city,
        addressCountry: show.country,
      },
    },
    ...(show.ticket
      ? {
          offers: {
            "@type": "Offer",
            url: `${origin}/go/${show.ticket}/`,
            ...(price
              ? {
                  price: price.from,
                  ...(price.to ? { lowPrice: price.from, highPrice: price.to } : {}),
                  priceCurrency: price.currency,
                  seller: { "@type": "Organization", name: price.seller },
                }
              : {}),
          },
        }
      : {}),
    ...itemContext(canonical, publisher),
  };
}
