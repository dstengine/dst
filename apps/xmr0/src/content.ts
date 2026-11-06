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

// The voice is British English, plain and exact, for readers who know
// security: what the protocol does, the code or paper that says so, and what
// it means for someone sending a payment. Privacy is a security property
// here, like encryption. No price talk and no trading advice.

export const home = {
  title: "Monero privacy, explained: protocol, network and wallet",
  description: "Monero privacy guides for readers who know security: rings and FCMP++, Dandelion++ and Tor, view keys and seeds, each figure from the code or the paper that states it.",
  h1: "Monero privacy, explained",
  lede: `How Monero hides who paid, who was paid and how much — on the chain, on the network and in the wallet — and where each protection ends. Every figure comes from the code, the specification or the paper, with the date it was checked.`,
};

export const guides = {
  title: "Monero privacy guides: protocol, network and wallet",
  description: "Every Monero privacy guide on xmr0.uk, newest first: the protocol, the network, the wallet and the rules on privacy coins, each naming the source of its figures.",
  h1: "Monero privacy guides",
  lede: `Every guide on the site, newest first: the protocol, the network, the wallet and the rules. Each one names the source of its figures and the date they were checked against it.`,
};

export const about = {
  title: "About xmr0.uk and its Monero privacy guides",
  description: "xmr0.uk writes independent Monero privacy guides in British English: privacy coins, peer-to-peer privacy and wallet security, every figure sourced and nothing paid for.",
  h1: "About xmr0.uk and its Monero privacy guides",
  lede: `Independent guides to Monero privacy and the security around it: what the protocol hides, how it hides it, and where it stops. Nobody pays to be in them, and every figure names where it came from.`,
};

/**
 * The site's RSS channel. It lives here rather than in the route because
 * site.config.ts needs the title too — the head's autodiscovery link is
 * what a reader's tool reads to offer the subscription, and a title written
 * out twice is a title that drifts.
 */
export const feed = {
  title: "xmr0.uk — Monero privacy guides",
  description: "Monero privacy guides: ring signatures and FCMP++, Dandelion++ and Tor, view keys and seeds, and the rules on privacy coins.",
  /** RFC 5646. Without it an aggregator files this site under the wrong language. */
  language: "en-GB",
};
