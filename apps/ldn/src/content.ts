// The site publishes itself: these five domains are independent of the DST
// group and of each other, so every block of structured data on them has to
// name this host rather than the group — see VERCEL.md.
export const publisher = {
  id: "https://ldn.lol/#organization",
  name: "ldn.lol",
  url: "https://ldn.lol/",
};

export const site = "ldn";
export const newsBase = "/news/";
export const eventsBase = "/events/";

export const home = {
  title: "What's on in central London",
  description: "What's on in central London — exhibitions, carnival, theatre and the weekend.",
  h1: "What's on in central London",
  lede: `Culture and what's on inside the centre: exhibitions, carnival, theatre, and what the weekend actually holds. Every entry names its source and the day it was checked.`,
};

export const news = {
  title: "News",
  description: "A few things a week from the centre, each one checked against the source that reported it.",
  h1: "What changed in central London",
  lede: `A few things a week from the centre, each one checked against the source that reported it.`,
};

export const events = {
  title: "Events",
  description: "Dates confirmed against the organiser. Nothing goes up on a date we could not confirm.",
  h1: "Central London, by date",
  lede: `Dates confirmed against the organiser. Nothing goes up on a date we could not confirm.`,
};

export const about = {
  title: "About",
  description: "What is on in central London, with a source and a date on every entry.",
  h1: "About ldn",
  lede: `What is on in central London, with a source and a date on every entry.`,
};
