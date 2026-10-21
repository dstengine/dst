// GB7 publishes this site (gb7.uk names it among its own), so the
// structured data on every page names GB7 rather than the host — the same
// @id the publisher's own page declares. It is an A/B/n sibling of ldn.lol
// and lnd.lol on a .uk domain, and links to neither.
export const publisher = {
  id: "https://gb7.uk/#organization",
  name: "GB7",
  url: "https://gb7.uk/",
};

export const siteId = "l0n";
export const newsBase = "/news/";
export const eventsBase = "/events/";

// The angle that keeps this site apart from its siblings: not what is on
// this weekend but the fixed points of the London year, published as soon
// as the organiser fixes them — months before the listings sites get there,
// which is when the date is being searched for.
export const home = {
  title: "London's big dates for the year ahead",
  description: "London's big dates for the year ahead — New Year's Eve, the Boat Race, the Marathon, Chelsea — each one as the organiser published it, with the source beside it.",
  h1: "London's big dates for the year ahead",
  lede: `The fixed points of the London year, as far ahead as their organisers have fixed them. Every date here is the organiser's own, and every entry says where we read it and when.`,
};

export const news = {
  title: "London calendar news: dates as they are fixed",
  description: "News from the London calendar: dates as the organisers fix them and tickets as they go on sale, each checked against the source.",
  h1: "London calendar news",
  lede: `Dates as the organisers fix them, tickets as they go on sale — each one checked against the source that published it.`,
};

// "Events" is the menu word and the address; what gets typed is the date
// of a named thing, so the title says what the page holds: London events,
// in date order, for the year ahead.
export const events = {
  title: "London events by date, for the year ahead",
  description: "London events by date for the year ahead: every date confirmed against the organiser, and nothing listed on a date we could not confirm.",
  h1: "London events for the year ahead, by date",
  lede: `Dates confirmed against the organiser. Nothing goes up on a date we could not confirm.`,
};

export const about = {
  title: "About London Calendar, the big London dates of the year",
  description: "London's big dates for the year ahead, published by GB7, with a source and a date on every entry.",
  h1: "About London Calendar",
  lede: `London's big dates for the year ahead, published by GB7, with a source and a date on every entry.`,
};

/**
 * The site's RSS channel. It lives here rather than in the route because
 * site.config.ts needs the title too, and a title written out twice is a
 * title that drifts.
 */
export const feed = {
  title: "London Calendar — news",
  description: "London's big dates as their organisers fix them, and tickets as they go on sale, each checked against the source.",
  /** RFC 5646. Without it an aggregator files this site under the wrong language. */
  language: "en-GB",
};
