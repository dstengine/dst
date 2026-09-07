// The site publishes itself: these five domains are independent of the DST
// group and of each other, so every block of structured data on them has to
// name this host rather than the group — see VERCEL.md.
export const publisher = {
  id: "https://nyc42.lol/#organization",
  name: "New York 42",
  url: "https://nyc42.lol/",
};

export const siteId = "nyc42";
export const newsBase = "/news/";
export const eventsBase = "/events/";

export const home = {
  title: "What's on in New York City",
  description: "What's on in New York City, checked against the source and dated.",
  h1: "What's on in New York City",
  lede: `Museums and theatre, the river and the parks, and the things the seasons open and close. What is on, what changed this week, and when.`,
};

export const news = {
  title: "What changed in New York",
  description: "Not a wire feed. A few things a week that are worth knowing about and that we could check.",
  h1: "What changed in New York",
  lede: `Not a wire feed. A few things a week that are worth knowing about and that we could check.`,
};

export const events = {
  title: "New York events, by date",
  description: "Dates we have confirmed against the organiser. An event with no confirmed date is not listed until it has one.",
  h1: "New York, by date",
  lede: `Dates we have confirmed against the organiser. An event with no confirmed date is not listed until it has one.`,
};

export const about = {
  title: "About New York 42, a New York guide",
  description: "What is on in New York City, with a source and a date on every entry.",
  h1: "About New York 42, a New York listings site",
  lede: `What is on in New York City, with a source and a date on every entry.`,
};

/**
 * The site's RSS channel. It lives here rather than in the route because
 * site.config.ts needs the title too — the head's autodiscovery link is
 * what a reader's tool reads to offer the subscription, and a title written
 * out twice is a title that drifts.
 */
export const feed = {
  title: "New York 42 — news",
  description: "What changed in New York City, checked against the source and dated.",
  /** RFC 5646. Without it an aggregator files this site under the wrong language. */
  language: "en-US",
};
