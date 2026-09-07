// The site publishes itself: these five domains are independent of the DST
// group and of each other, so every block of structured data on them has to
// name this host rather than the group — see VERCEL.md.
export const publisher = {
  id: "https://lnd.lol/#organization",
  name: "London Boroughs",
  url: "https://lnd.lol/",
};

export const siteId = "lnd";
export const newsBase = "/news/";
export const eventsBase = "/events/";

export const home = {
  title: "Beyond the centre",
  description: "Greater London beyond the centre — what's happening borough by borough.",
  h1: "Greater London, beyond the centre",
  lede: `London past zone 1: the boroughs, their parks, their transport and their weekends.`,
};

export const news = {
  title: "Greater London news, borough by borough",
  description: "Borough news, checked against the source that reported it. A few things a week rather than everything.",
  h1: "What changed across Greater London",
  lede: `Borough news, checked against the source that reported it. A few things a week rather than everything.`,
};

export const events = {
  title: "Greater London events, by date",
  description: "Dates confirmed against the organiser, across the boroughs rather than the centre.",
  h1: "Greater London, by date",
  lede: `Dates confirmed against the organiser, across the boroughs rather than the centre.`,
};

export const about = {
  title: "About London Boroughs, a Greater London guide",
  description: "What is on across the London boroughs, with a source and a date on every entry.",
  h1: "About London Boroughs, a Greater London listings site",
  lede: `What is on across the London boroughs, with a source and a date on every entry.`,
};

/**
 * The site's RSS channel. It lives here rather than in the route because
 * site.config.ts needs the title too — the head's autodiscovery link is
 * what a reader's tool reads to offer the subscription, and a title written
 * out twice is a title that drifts.
 */
export const feed = {
  title: "London Boroughs — news",
  description: "Greater London beyond the centre, borough by borough, with the source on every entry.",
  /** RFC 5646. Without it an aggregator files this site under the wrong language. */
  language: "en-GB",
};
