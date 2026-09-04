// The site publishes itself. It sits on a vvm.space host and is not part of
// the DST group, so every block of structured data on it names this host
// rather than the group — see VERCEL.md.
export const publisher = {
  id: "https://tokiohotel.vvm.space/#organization",
  name: "tokiohotel.vvm.space",
  url: "https://tokiohotel.vvm.space/",
};

export const origin = "https://tokiohotel.vvm.space";

export const home = {
  title: "Tokio Hotel tour dates",
  description:
    "Every Tokio Hotel tour date we can confirm: the seventeen-night 2026 Arena Tour, and the routings behind twenty years of touring.",
  h1: "Tokio Hotel on tour",
  lede: `Seventeen arena nights between 28 October and 23 November 2026, and ten tours behind them. Every date here names the source that confirmed it and the day we last looked.`,
};

export const tours = {
  title: "Tours",
  description: "Ten Tokio Hotel tours since 2005, in order, with the routings we can document.",
  h1: "Ten tours since 2005",
  lede: `From the Schrei Tour in 2005 to seventeen arena nights in late 2026. Two of these have a routing we can print date for date; the rest are here so the shape of twenty years is on one page.`,
};

export const cities = {
  title: "Cities",
  description: "Where Tokio Hotel play next, and where they last played — city by city.",
  h1: "City by city",
  lede: `A city gets a page here when there is something to say about it: a date coming, or a date that was the last one.`,
};

export const about = {
  title: "About",
  description: "What this site is, where the dates come from, and what it will not print.",
  h1: "About this site",
  lede: `A tour archive for one band, with a source and a date on every entry.`,
};
