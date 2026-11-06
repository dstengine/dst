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

// The voice is plain English for a reader who knows Monero a little and
// Monzero not at all: what the Cake Wallet integration does, how it was
// built and tested and where its pull request stands, each figure with its
// source. The patch is ours, and the copy says so. No price talk, nothing
// to download.

export const home = {
  title: "Monzero in Cake Wallet: the XMZ integration, explained",
  description: "How Monzero (XMZ), a Monero fork, works in Cake Wallet: what the integration patch adds, BIP39 seeds, nodes, how it was built and tested, and its pull request.",
  h1: "Monzero in Cake Wallet",
  lede: `Monzero (XMZ) is a fork of Monero with a chain of its own. These guides follow the patch that adds it to Cake Wallet, the open-source wallet: what it adds, what it does with seeds and nodes, how it was built and tested, and where its pull request stands. Every figure names where it came from and the date it was checked.`,
};

export const guides = {
  title: "Every Monzero guide: XMZ in Cake Wallet, seeds and nodes",
  description: "Every Monzero guide on zerocake.org, newest first: the coin, the Cake Wallet integration, BIP39 seeds, nodes, the macOS build and the pull request.",
  h1: "Monzero guides",
  lede: `Every guide on the site, newest first. Each one names the source of its figures and the date they were checked against it.`,
};

export const about = {
  title: "About zerocake.org and its Monzero guides",
  description: "zerocake.org explains the patch that adds Monzero (XMZ) to Cake Wallet. It is written by the people who prepared the patch, and is run by neither Cake Wallet nor Monzero.",
  h1: "About zerocake.org and its Monzero guides",
  lede: `The guides here are written by the people who prepared the Monzero patch for Cake Wallet. Cake Wallet and the Monzero project neither run them nor endorse them, and nothing on the site is for sale.`,
};

/**
 * The site's RSS channel. It lives here rather than in the route because
 * site.config.ts needs the title too — the head's autodiscovery link is
 * what a reader's tool reads to offer the subscription, and a title written
 * out twice is a title that drifts.
 */
export const feed = {
  title: "zerocake.org — Monzero guides",
  description: "Monzero (XMZ) in Cake Wallet: guides to the integration patch, its seeds, nodes, build, tests and pull request, each naming the source of its figures.",
  /** RFC 5646. Without it an aggregator files this site under the wrong language. */
  language: "en",
};
