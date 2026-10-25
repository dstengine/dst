// The site publishes itself: it is independent of the DST group, so every
// block of structured data on it has to name this host rather than the
// group — see VERCEL.md.
export const publisher = {
  id: "https://random.directory/#organization",
  name: "random.directory",
  url: "https://random.directory/",
};

export const siteId = "random";
// The articles are reference guides: what a variant does, how much memory a
// miner needs, what a release changed. They are dated and kept up to date
// rather than replaced, so the address says guides, not news.
export const newsBase = "/guides/";

// The voice is plain technical English: a figure, the place it comes from,
// and what it means for someone running a miner. No price talk and no
// promise of earnings — the site is about the algorithm, not the coin.

export const home = {
  title: "RandomX guides: the algorithm, the miners and the coins",
  description: "A reference to RandomX, the CPU proof of work behind Monero: how it works, RandomX v2, how much memory it needs, its variants, the coins and the software that mine it.",
  h1: "RandomX, explained and indexed",
  lede: `RandomX is the proof of work that keeps Monero mineable on an ordinary CPU. This is a directory of it: how the algorithm works, what RandomX v2 changes, the variants and the coins built on them, and the miners and pools that run it — every figure from the source code, the specification or the project that published it.`,
};

export const guides = {
  title: "RandomX guides: algorithm, memory, variants and mining",
  description: "Every RandomX guide on the site: the algorithm and RandomX v2, memory and hardware, the rx/ variants and their coins, XMRig and P2Pool.",
  h1: "RandomX guides",
  lede: `Every guide on the site, newest first. Each one names the source of its figures and the date they were checked against it.`,
};

export const about = {
  title: "About random.directory, a RandomX reference",
  description: "random.directory is an independent reference to the RandomX proof of work, with the source named for every figure and no promise of earnings.",
  h1: "About random.directory and its RandomX guides",
  lede: `An independent reference to RandomX: the algorithm, the variants, the coins and the software. Nobody pays to be in it, and every figure on it names where it came from.`,
};

/**
 * The site's RSS channel. It lives here rather than in the route because
 * site.config.ts needs the title too — the head's autodiscovery link is
 * what a reader's tool reads to offer the subscription, and a title written
 * out twice is a title that drifts.
 */
export const feed = {
  title: "random.directory — RandomX guides",
  description: "Guides to the RandomX proof of work: the algorithm, RandomX v2, memory, the variants and coins, and the software that mines it.",
  /** RFC 5646. Without it an aggregator files this site under the wrong language. */
  language: "en",
};
