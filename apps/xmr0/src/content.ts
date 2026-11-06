// The site publishes itself: it is independent of the DST group, so every
// block of structured data on it has to name this host rather than the
// group — see VERCEL.md.
export const publisher = {
  id: "https://xmr0.uk/#organization",
  name: "xmr0.uk",
  url: "https://xmr0.uk/",
};

export const siteId = "xmr0";
// The articles are guides: dated and kept up to date rather than replaced,
// so the address says guides, not news.
export const newsBase = "/guides/";

// The voice is British English, plain and exact: what the protocol does,
// the source that says so, and what it means for someone sending a payment.
// No price talk and no trading advice.

export const home = {
  title: "Monero privacy, explained: how private payments work",
  description: "Guides to Monero privacy: how ring signatures, stealth addresses and confidential amounts keep a payment private, and where that protection ends.",
  h1: "Monero privacy, explained",
  lede: `How Monero keeps a payment private — who sent it, who received it and how much — and where that protection ends. Every figure names the source it came from and the date it was checked.`,
};

export const guides = {
  title: "Monero privacy guides, newest first",
  description: "Every Monero privacy guide on xmr0.uk, newest first, each naming the source of its figures and the date they were checked.",
  h1: "Monero privacy guides",
  lede: `Every guide on the site, newest first. Each one names the source of its figures and the date they were checked against it.`,
};

export const about = {
  title: "About xmr0.uk and its Monero privacy guides",
  description: "xmr0.uk is an independent set of Monero privacy guides in British English, with the source named for every figure and nothing paid for.",
  h1: "About xmr0.uk and its Monero privacy guides",
  lede: `Independent guides to Monero privacy: what the protocol hides, how it hides it, and where it stops. Nobody pays to be in them, and every figure names where it came from.`,
};

/**
 * The site's RSS channel. It lives here rather than in the route because
 * site.config.ts needs the title too — the head's autodiscovery link is
 * what a reader's tool reads to offer the subscription, and a title written
 * out twice is a title that drifts.
 */
export const feed = {
  title: "xmr0.uk — Monero privacy guides",
  description: "Guides to Monero privacy: ring signatures, stealth addresses, confidential amounts and where their protection ends.",
  /** RFC 5646. Without it an aggregator files this site under the wrong language. */
  language: "en-GB",
};
