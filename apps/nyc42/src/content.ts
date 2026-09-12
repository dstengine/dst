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
  title: "New York news: a few checked things a week",
  description: "Not a wire feed. A few things a week that are worth knowing about and that we could check.",
  h1: "What changed in New York",
  lede: `Not a wire feed. A few things a week that are worth knowing about and that we could check.`,
};

// The intent phrase, not the filing word. "Events" is what this page is
// called in the menu and in its address, and it is a navigation label:
// on its own nobody types it. What gets typed is "things to do in
// New York" — so the title carries that and the description keeps the
// word "event", which is where it still earns its place. There is no
// separate /things-to-do/ page for the same reason /london/ does not
// exist: it would be this page at a second address.
export const events = {
  title: "Things to do in New York, by date",
  description: "Things to do in New York, by date: every event here has its date confirmed with the organizer, and one with no confirmed date is not listed until it has one.",
  h1: "Things to do in New York, by date",
  lede: `Dates we have confirmed with the organizer. An event with no confirmed date is not listed until it has one.`,
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
