// The site publishes itself: these domains are independent of the DST group
// and of each other, so every block of structured data on them has to name
// this host rather than the group — see VERCEL.md.
export const publisher = {
  id: "https://sol2go.lol/#organization",
  name: "sol2go",
  url: "https://sol2go.lol/",
};

export const siteId = "sol2go";
export const newsBase = "/news/";
export const eventsBase = "/events/";

export const home = {
  title: "Meetups, hackathons and conferences",
  description: "Solana meetups, hackathons and conferences, with the source and the date it was checked on every entry.",
  h1: "Where Solana meets in person",
  lede: `Hackathons, conferences and city meetups across the Solana ecosystem, plus the wider crypto calendar they sit in. Dates come from the organiser, and every entry says when we last looked.`,
};

export const news = {
  title: "Solana ecosystem news: releases, tooling, programmes",
  description: "What changed in the Solana ecosystem: releases, tooling, programmes and the calendar around them.",
  h1: "What changed in the Solana ecosystem",
  lede: `Releases, tooling and programmes — the things that change what a builder can do this month. Not a price feed.`,
};

export const events = {
  title: "The Solana events calendar",
  description: "Solana hackathons, conferences and meetups, on dates confirmed with the organiser.",
  h1: "The Solana calendar",
  lede: `Hackathons, conferences and meetups, on dates confirmed with the organiser. Anything whose date we could not confirm waits until we can.`,
};

export const about = {
  title: "About sol2go and its Solana events calendar",
  description: "A calendar and a newsfeed for the Solana ecosystem, with a source and a date on every entry.",
  h1: "About sol2go, a Solana calendar and newsfeed",
  lede: `A calendar and a newsfeed for the Solana ecosystem, with a source and a date on every entry. Not financial advice, and nothing here is a recommendation to buy anything.`,
};

/**
 * The site's RSS channel. It lives here rather than in the route because
 * site.config.ts needs the title too — the head's autodiscovery link is
 * what a reader's tool reads to offer the subscription, and a title written
 * out twice is a title that drifts.
 */
export const feed = {
  title: "sol2go — Solana news",
  description: "Solana meetups, hackathons and conferences, with the source and the date it was checked.",
  /** RFC 5646. Without it an aggregator files this site under the wrong language. */
  language: "en",
};
