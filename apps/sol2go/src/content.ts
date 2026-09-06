// The site publishes itself: these domains are independent of the DST group
// and of each other, so every block of structured data on them has to name
// this host rather than the group — see VERCEL.md.
export const publisher = {
  id: "https://sol2go.lol/#organization",
  name: "sol2go.lol",
  url: "https://sol2go.lol/",
};

export const site = "sol2go";
export const newsBase = "/news/";
export const eventsBase = "/events/";

export const home = {
  title: "Solana events, meetups and hackathons",
  description: "Solana meetups, hackathons and conferences, with the source and the date it was checked on every entry.",
  h1: "Where Solana meets in person",
  lede: `Hackathons, conferences and city meetups across the Solana ecosystem, plus the wider crypto calendar they sit in. Dates come from the organiser, and every entry says when we last looked.`,
};

export const news = {
  title: "News",
  description: "What changed in the Solana ecosystem: releases, tooling, programmes and the calendar around them.",
  h1: "What changed in the ecosystem",
  lede: `Releases, tooling and programmes — the things that change what a builder can do this month. Not a price feed.`,
};

export const events = {
  title: "Events",
  description: "Hackathons, conferences and meetups on dates confirmed with the organiser.",
  h1: "The calendar",
  lede: `Hackathons, conferences and meetups, on dates confirmed with the organiser. Anything whose date we could not confirm waits until we can.`,
};

export const about = {
  title: "About",
  description: "A calendar and a newsfeed for the Solana ecosystem, with a source and a date on every entry.",
  h1: "About sol2go",
  lede: `A calendar and a newsfeed for the Solana ecosystem, with a source and a date on every entry. Not financial advice, and nothing here is a recommendation to buy anything.`,
};
