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
  // "London" first and "Greater London" nowhere: nobody searches for the
  // administrative name, and the word the boroughs share with the centre is
  // the one that has to be in front. Beyond the centre is still what makes
  // this site different from every other London listing — it is a
  // qualifier, not the subject.
  title: "London beyond the centre",
  description: "London beyond the centre — what is on borough by borough, with a date and a source on every entry.",
  h1: "London, beyond the centre",
  lede: `London past zone 1: the boroughs, their parks, their transport and their weekends.`,
};

export const news = {
  title: "London news, borough by borough",
  description: "Borough news from across London, checked against the source that reported it. A few things a week rather than everything.",
  h1: "What changed across London",
  lede: `Borough news, checked against the source that reported it. A few things a week rather than everything.`,
};

export const events = {
  title: "London events, by date",
  description: "London events with the date confirmed against the organiser, across the boroughs as well as the centre.",
  h1: "London events, by date",
  lede: `Dates confirmed against the organiser, across the boroughs rather than the centre.`,
};

export const about = {
  title: "About London Boroughs, a London guide",
  description: "What is on across London and its boroughs, with a source and a date on every entry.",
  h1: "About London Boroughs, a listings site for London",
  lede: `What is on across London and its boroughs, with a source and a date on every entry.`,
};

/**
 * The site's RSS channel. It lives here rather than in the route because
 * site.config.ts needs the title too — the head's autodiscovery link is
 * what a reader's tool reads to offer the subscription, and a title written
 * out twice is a title that drifts.
 */
export const feed = {
  title: "London Boroughs — news",
  description: "London beyond the centre, borough by borough, with the source on every entry.",
  /** RFC 5646. Without it an aggregator files this site under the wrong language. */
  language: "en-GB",
};
