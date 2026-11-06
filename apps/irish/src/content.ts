// The site publishes itself: it is independent of the DST group, so every
// block of structured data on it has to name this host rather than the
// group — see VERCEL.md.
export const publisher = {
  id: "https://sensation.irish/#organization",
  name: "sensation.irish",
  url: "https://sensation.irish/",
};

export const siteId = "irish";
// The articles are guides: dated and kept up to date rather than replaced,
// so the address says guides, not news.
export const newsBase = "/guides/";

// The voice is Irish English, warm and exact: the date, the place, the
// line-up as announced and how the tickets are sold, each from the organiser.
// Nothing guessed: what has not been announced is said in the body, never
// in a title or a summary.

export const home = {
  title: "Dance festivals Ireland: dates, venues and tickets",
  description: "A guide to the dance festivals Ireland hosts: dates, venues, line-ups and tickets, every detail taken from the organiser and dated.",
  h1: "The dance festivals Ireland hosts, one guide each",
  lede: `Dance music festivals in Ireland: when each one is, where, who is on the line-up and how to get a ticket — every detail from the organiser, with the date it was checked.`,
};

export const guides = {
  title: "Dance festivals Ireland: every festival guide",
  description: "Every guide to the dance festivals Ireland hosts, newest first: dates, venues, line-ups and tickets, each taken from the organiser.",
  h1: "Guides to the dance festivals Ireland hosts",
  lede: `Every guide on the site, newest first. Each one names its source and the date it was checked against it.`,
};

export const about = {
  title: "About sensation.irish",
  description: "sensation.irish is an independent guide to the dance festivals Ireland hosts, with every date and price taken from the organiser and nothing paid for.",
  h1: "About sensation.irish and the dance festivals Ireland hosts",
  lede: `An independent guide to dance music festivals in Ireland. No festival, promoter or ticket seller runs it or pays to be in it, and every detail names where it came from.`,
};

/**
 * The site's RSS channel. It lives here rather than in the route because
 * site.config.ts needs the title too — the head's autodiscovery link is
 * what a reader's tool reads to offer the subscription, and a title written
 * out twice is a title that drifts.
 */
export const feed = {
  title: "sensation.irish — dance festivals Ireland",
  description: "Guides to the dance festivals Ireland hosts: dates, venues, line-ups and tickets, from the organisers.",
  /** RFC 5646. Without it an aggregator files this site under the wrong language. */
  language: "en-IE",
};
