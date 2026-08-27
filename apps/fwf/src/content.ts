// The forum's own record, read from @dst/content so every page on this site
// quotes one set of figures. When the organiser changes the listing, the
// event file changes and the whole site follows — rather than a date left
// stale on the page nobody remembered to edit.
import { eventsBySite } from "@dst/content/events";

const events = eventsBySite("fwf");

/** The forum this site is named after. Its page is the home page, not an
    entry under /events/ — the calendar around it is context, not the point. */
export const forum = events.find((e) => e.slug === "future-world-forum-dubai-2026")!;

/** Everything else in the calendar: the Dubai events on the same subjects,
    which is what makes this site worth a visit in a week when the forum
    itself has published nothing new. */
export const otherEvents = events.filter((e) => e.slug !== forum.slug);

/** "16 November 2026" — the long form used in prose. */
export const forumDate = new Date(`${forum.start}T00:00:00Z`).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export const ticketsFrom = `${forum.tickets!.currency} ${forum.tickets!.priceFrom}`;
export const ticketsTo = `${forum.tickets!.currency} ${forum.tickets!.priceTo!.toLocaleString("en-GB")}`;

/** When the forum's listing was last read. One constant rather than a date
    typed into six pages, because it is the figure that has to be right. */
export const checkedOn = "28 August 2026";

// The page opener. The same picture the hub uses for this event, with the
// same words describing it — one conference, one image across the network.
// It is our own picture, not the organiser's: the alt says what it shows
// without treating the lit facade as a venue announcement, because none has
// been made.
export const siteHeaderImage = {
  src: "/fwf-hero.jpg",
  alt: "A conference venue at dusk under a Dubai skyline, its facade lit with the words Future World Forum Dubai",
  kind: "generated" as const,
};

/** What this site is, in one sentence, wherever it has to be said again. */
export const disclaimer =
  "Independent guide. Not the organiser, not affiliated with Futur World Expo, and not a ticket seller — confirm every detail on the official ticket page before you book anything.";
