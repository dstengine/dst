// The site publishes itself: these five domains are independent of the DST
// group and of each other, so every block of structured data on them has to
// name this host rather than the group — see VERCEL.md.
export const publisher = {
  id: "https://lnd.lol/#organization",
  name: "lnd.lol",
  url: "https://lnd.lol/",
};

export const site = "lnd";
export const newsBase = "/news/";
export const eventsBase = "/events/";

export const home = {
  title: "Beyond the centre",
  description: "Greater London beyond the centre — what's happening borough by borough.",
  h1: "Greater London, beyond the centre",
  lede: `London past zone 1: the boroughs, their parks, their transport and their weekends.`,
};

export const news = {
  title: "News",
  description: "Borough news, checked against the source that reported it. A few things a week rather than everything.",
  h1: "What changed across the boroughs",
  lede: `Borough news, checked against the source that reported it. A few things a week rather than everything.`,
};

export const events = {
  title: "Events",
  description: "Dates confirmed against the organiser, across the boroughs rather than the centre.",
  h1: "Greater London, by date",
  lede: `Dates confirmed against the organiser, across the boroughs rather than the centre.`,
};

export const about = {
  title: "About",
  description: "What is on across the London boroughs, with a source and a date on every entry.",
  h1: "About lnd",
  lede: `What is on across the London boroughs, with a source and a date on every entry.`,
};
