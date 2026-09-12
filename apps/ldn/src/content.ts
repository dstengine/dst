// The site publishes itself: these five domains are independent of the DST
// group and of each other, so every block of structured data on them has to
// name this host rather than the group — see VERCEL.md.
export const publisher = {
  id: "https://ldn.lol/#organization",
  name: "London Today",
  url: "https://ldn.lol/",
};

export const siteId = "ldn";
export const newsBase = "/news/";
export const eventsBase = "/events/";

export const home = {
  title: "What's on in central London",
  description: "What's on in central London — exhibitions, carnival, theatre and the weekend.",
  h1: "What's on in central London",
  lede: `Culture inside the centre: exhibitions, carnival, theatre, and what the weekend actually holds.`,
};

export const news = {
  title: "What changed in central London",
  description: "A few things a week from the centre, each one checked against the source that reported it.",
  h1: "What changed in central London",
  lede: `A few things a week from the centre, each one checked against the source that reported it.`,
};

// The intent phrase, not the filing word. "Events" is what this page is
// called in the menu and in its address, and it is a navigation label:
// on its own nobody types it. What gets typed is "things to do in
// central London" — so the title carries that and the description keeps the
// word "event", which is where it still earns its place. There is no
// separate /things-to-do/ page for the same reason /london/ does not
// exist: it would be this page at a second address.
export const events = {
  title: "Things to do in central London, by date",
  description: "Things to do in central London, by date: every event here has its date confirmed against the organiser, and nothing goes up on a date we could not confirm.",
  h1: "Things to do in central London, by date",
  lede: `Dates confirmed against the organiser. Nothing goes up on a date we could not confirm.`,
};

export const about = {
  title: "About London Today, a central London guide",
  description: "What is on in central London, with a source and a date on every entry.",
  h1: "About London Today, a central London listings site",
  lede: `What is on in central London, with a source and a date on every entry.`,
};

/**
 * The site's RSS channel. It lives here rather than in the route because
 * site.config.ts needs the title too — the head's autodiscovery link is
 * what a reader's tool reads to offer the subscription, and a title written
 * out twice is a title that drifts.
 */
export const feed = {
  title: "London Today — news",
  description: "What changed in central London: exhibitions, theatre and the weekend, each checked against the source.",
  /** RFC 5646. Without it an aggregator files this site under the wrong language. */
  language: "en-GB",
};
