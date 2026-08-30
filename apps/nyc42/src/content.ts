// The site publishes itself: these five domains are independent of the DST
// group and of each other, so every block of structured data on them has to
// name this host rather than the group — see VERCEL.md.
export const publisher = {
  id: "https://nyc42.lol/#organization",
  name: "nyc42.lol",
  url: "https://nyc42.lol/",
};

export const site = "nyc42";
export const newsBase = "/news/";
export const eventsBase = "/events/";

export const home = {
  title: "What's on in New York City",
  description: "What's on in New York City, checked against the source and dated.",
  h1: "What's on in New York City",
  lede: `A short list of what is happening in New York, and what changed this week. Every entry names the source it came from and the day it was checked against it.`,
};

export const news = {
  title: "News",
  description: "Not a wire feed. A few things a week that are worth knowing about and that we could check.",
  h1: "What changed in New York",
  lede: `Not a wire feed. A few things a week that are worth knowing about and that we could check.`,
};

export const events = {
  title: "Events",
  description: "Dates we have confirmed against the organiser. An event with no confirmed date is not listed until it has one.",
  h1: "New York, by date",
  lede: `Dates we have confirmed against the organiser. An event with no confirmed date is not listed until it has one.`,
};

export const about = {
  title: "About",
  description: "A small listings site for New York City, run to a short set of rules.",
  h1: "About nyc42",
  lede: `A small listings site for New York City, run to a short set of rules.`,
};
