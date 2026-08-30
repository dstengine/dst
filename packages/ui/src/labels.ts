// Every word the article components put on a page that does not come from
// the item itself.
//
// These used to be string literals inside EventArticle and NewsArticle, and
// that was invisible for as long as the whole network published in English.
// It stopped being invisible when cmx.lol and mxo.lol went out in Spanish:
// the body copy was Spanish, the page was <html lang="es-MX">, and the
// furniture around it — "Format", "Where", "Add to calendar", "All events" —
// was still English. A reader does not experience that as a missing
// translation; they experience it as a site that was assembled somewhere
// else.
//
// English stays the default, so the eleven English sites pass nothing and
// render exactly what they rendered before. A site writing in another
// language passes its own set from its own src/content.ts — its own,
// because each app builds in isolation on Vercel and cannot import from a
// sibling app.
export interface ArticleLabels {
  // Header and the ended badge
  ended: string;
  organizedBy: string;
  minRead: (n: number) => string;

  // Actions
  tickets: string;
  register: string;
  addToCalendar: string;
  /** Title attribute on the calendar button, given the event's own name. */
  addToCalendarTitle: (title: string) => string;

  // Glance rows
  time: string;
  /** "From 19:00" when only a start time is published. */
  timeFrom: (start: string) => string;
  duration: string;
  /** "2 hours 30 minutes" — assembled here so the plural rules are local. */
  durationValue: (hours: number, minutes: number) => string;
  format: string;
  inPerson: string;
  where: string;
  ticketsRow: string;
  salesClose: string;
  refunds: string;
  organizer: string;

  // Section headings
  whatHappened: string;
  programme: string;
  whoItsFor: string;
  locate: string;
  related: string;
  moreEvents: string;
  moreNews: string;
  latestNews: string;
  comingUp: string;

  // Card and link furniture
  readMore: string;
  allEvents: string;
  allNews: string;
  upcoming: string;
  /** Heading over the group of events that have happened. */
  pastGroup: string;
  /** Chip on one card that has. Separate from the heading above because a
      language that inflects for number needs a singular here. */
  past: string;
  /** Title attribute on the map iframe, given the place's name. */
  mapTitle: (place: string) => string;

  // Source line
  source: string;
  checkedAgainstSource: string;
  /** Title attribute on the checked-on date. */
  checkedTitle: (sourceName: string) => string;

  // ImageNote — the word under a picture saying what kind of picture it is.
  // `generated` is deliberately absent here as it is in ImageNote itself.
  imageKinds: { photo: string; diagram: string; illustration: string; render: string };
}

export const EN: ArticleLabels = {
  ended: "Ended",
  organizedBy: "Organized by",
  minRead: (n) => `${n} min read`,

  tickets: "Tickets",
  register: "Register",
  addToCalendar: "Add to calendar",
  addToCalendarTitle: (title) => `Add ${title} to your calendar`,

  time: "Time",
  timeFrom: (start) => `From ${start}`,
  duration: "Duration",
  durationValue: (hours, minutes) =>
    [hours && `${hours} hour${hours === 1 ? "" : "s"}`, minutes && `${minutes} minutes`]
      .filter(Boolean)
      .join(" "),
  format: "Format",
  inPerson: "In person",
  where: "Where",
  ticketsRow: "Tickets",
  salesClose: "Sales close",
  refunds: "Refunds",
  organizer: "Organizer",

  whatHappened: "What happened",
  programme: "Programme",
  whoItsFor: "Who it's for",
  locate: "Locate",
  related: "Related",
  moreEvents: "More events",
  moreNews: "More news",
  latestNews: "Latest news",
  comingUp: "Coming up",

  readMore: "Read more",
  allEvents: "All events",
  allNews: "All news",
  upcoming: "Upcoming",
  pastGroup: "Past",
  past: "Past",
  mapTitle: (place) => `Map — ${place}`,

  source: "Source",
  checkedAgainstSource: "checked against the source",
  checkedTitle: (name) => `Last checked against ${name} on this date`,

  imageKinds: {
    photo: "Photograph",
    diagram: "Diagram",
    illustration: "Illustration",
    render: "Render",
  },
};

/** The caller's overrides on top of English, so a partial set is legal. */
export function withLabels(labels?: Partial<ArticleLabels>): ArticleLabels {
  if (!labels) return EN;
  return { ...EN, ...labels, imageKinds: { ...EN.imageKinds, ...labels.imageKinds } };
}
