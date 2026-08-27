// The forum's own record, read from @dst/content so every page on this site
// quotes one set of figures. When the organiser changes the listing, the
// event file changes and the whole site follows — rather than a date left
// stale on the page nobody remembered to edit.
import { eventsBySite } from "@dst/content/events";

export const forum = eventsBySite("fwf")[0];

/** "16 November 2026" — the long form used in prose. */
export const forumDate = new Date(`${forum.start}T00:00:00Z`).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export const ticketsFrom = `${forum.tickets!.currency} ${forum.tickets!.priceFrom}`;
export const ticketsTo = `${forum.tickets!.currency} ${forum.tickets!.priceTo!.toLocaleString("en-GB")}`;

/** What this site is, in one sentence, wherever it has to be said again. */
export const disclaimer =
  "Independent guide. Not the organiser, not affiliated with Futur World Expo, and not a ticket seller — confirm every detail on the official ticket page before you book anything.";
