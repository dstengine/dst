// Structured data for the two things this site describes: a band, and the
// nights it plays. Both are built from the same dataset the page renders,
// so the markup cannot drift from the visible text.
import { itemContext } from "@dst/ui/schema";
import { publisher, origin } from "./content";
import { band, type Show } from "./data/tours";

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
export function musicEvent(show: Show, tourName: string, canonical: string) {
  const startDate = show.startTime
    ? // The 2026 London date falls three days after BST ends, so its local
      // time is GMT. Any future show that needs a different offset gets it
      // here, next to the reason — not as a bare string in the dataset.
      `${show.date}T${show.startTime}:00+00:00`
    : show.date;
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
    ...itemContext(canonical, publisher),
  };
}
