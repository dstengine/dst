// The site publishes itself: it is independent of the DST group, so every
// block of structured data on it has to name this host rather than the
// group — see VERCEL.md.
export const publisher = {
  id: "https://tea.ceo/#organization",
  name: "tea.ceo",
  url: "https://tea.ceo/",
};

export const siteId = "tea";
// The articles are guides, not news: a brewing time is still true next
// year. The address says so, and "/news/" would promise a reader something
// this site does not do.
export const newsBase = "/guides/";

// The voice is UK English with a little polish — perhaps one sentence in ten
// carries it. Effortless is the point: a page that tries to sound grand
// sounds like a hotel menu.

export const home = {
  title: "Tea guides, brewing times and the tea calendar",
  description: "How to brew every kind of tea — temperatures, times and how much leaf — and a live countdown to the next proper moment for a cup.",
  h1: "Tea, brewed properly and taken on time",
  lede: `How to brew each kind of tea, and when to put the kettle on. Temperatures and times come from the people who grow and sell the leaf; the clock below counts down to the next respectable excuse for a pot.`,
};

export const guides = {
  title: "Tea brewing guides: temperatures, times and ratios",
  description: "How to brew tea, kind by kind: black, green, oolong, white and pu-erh, and the named teas within them — water temperature, steeping time and how much leaf.",
  h1: "How to brew tea",
  lede: `Every kind of tea, and the better-known teas within each: how hot the water, how long the steep, how much leaf. Where the growers disagree with one another, the page says so rather than picking a winner.`,
};

export const schedule = {
  title: "Tea times: afternoon tea, elevenses and tea days",
  description: "The tea calendar, with a live countdown to each: elevenses, afternoon tea and high tea on your own clock, and the tea days of the year from National Tea Day to the Boston Tea Party.",
  h1: "The tea calendar",
  lede: `The daily tea times, on your own clock wherever you are, and the days of the year that exist chiefly to be marked with a cup. Each one counts down; any of them can go into your calendar with a reminder attached.`,
};

export const about = {
  title: "About tea.ceo, a tea guide and calendar",
  description: "tea.ceo is an independent guide to brewing tea and a calendar of tea times and tea days, with the source named for every figure.",
  h1: "About tea.ceo and its tea guides",
  lede: `An independent guide to brewing tea, and a calendar for drinking it. Nobody pays to be in it, and every temperature and time on it names where it came from.`,
};

/**
 * The site's RSS channel. It lives here rather than in the route because
 * site.config.ts needs the title too — the head's autodiscovery link is
 * what a reader's tool reads to offer the subscription, and a title written
 * out twice is a title that drifts.
 */
export const feed = {
  title: "tea.ceo — tea guides",
  description: "How to brew tea, kind by kind and tea by tea: temperatures, steeping times and how much leaf, with the source named.",
  /** RFC 5646. Without it an aggregator files this site under the wrong language. */
  language: "en-GB",
};
