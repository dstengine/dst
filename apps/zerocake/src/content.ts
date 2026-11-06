// The site publishes itself: it is independent of the DST group, so every
// block of structured data on it has to name this host rather than the
// group — see VERCEL.md.
export const publisher = {
  id: "https://zerocake.org/#organization",
  name: "zerocake.org",
  url: "https://zerocake.org/",
};

export const siteId = "zerocake";
// The articles are guides: dated and kept up to date rather than replaced,
// so the address says guides, not news.
export const newsBase = "/guides/";

// The voice is plain English for a reader who is new to all of it: one
// question per guide, answered from the source, with the words a newcomer
// would not know explained where they first appear. No price talk and no
// promise of returns.

export const home = {
  title: "Monzero: Monero from zero, in plain guides",
  description: "Monzero is a set of plain guides to Monero for readers starting from zero: what it is, how it works and where to begin, with the source of every figure named.",
  h1: "Monzero: Monero from zero",
  lede: `Plain guides to Monero for someone who has never used it: what it is, how it works and where to begin. Every figure on the site names where it came from and the date it was checked.`,
};

export const guides = {
  title: "Monzero guides: Monero explained from zero",
  description: "Every Monzero guide on zerocake.org, newest first: Monero explained from zero, each naming the source of its figures and the date they were checked.",
  h1: "Monzero guides",
  lede: `Every guide on the site, newest first. Each one names the source of its figures and the date they were checked against it.`,
};

export const about = {
  title: "About zerocake.org and its Monzero guides",
  description: "zerocake.org publishes Monzero, independent guides to Monero for readers starting from zero, with the source named for every figure and nothing paid for.",
  h1: "About zerocake.org and Monzero",
  lede: `Independent guides to Monero for readers starting from zero. Nobody pays to be in them, and every figure in them names where it came from.`,
};

/**
 * The site's RSS channel. It lives here rather than in the route because
 * site.config.ts needs the title too — the head's autodiscovery link is
 * what a reader's tool reads to offer the subscription, and a title written
 * out twice is a title that drifts.
 */
export const feed = {
  title: "zerocake.org — Monzero guides",
  description: "Monzero: plain guides to Monero for readers starting from zero, each naming the source of its figures.",
  /** RFC 5646. Without it an aggregator files this site under the wrong language. */
  language: "en",
};
