// The site publishes itself: it is independent of the DST group, so every
// block of structured data on it has to name this host rather than the
// group — see VERCEL.md.
export const publisher = {
  id: "https://aivideo.zone/#organization",
  name: "aivideo.zone",
  url: "https://aivideo.zone/",
};

export const siteId = "aivideo";
export const newsBase = "/news/";

export const home = {
  title: "AI video news: models, tools and AI editing",
  description: "AI video news and guides: new generative video models, ComfyUI releases, AI editing tools and the APIs behind them, each with its source.",
  h1: "AI video: models, tools and AI editing",
  lede: `What changed in AI video generation and editing: new models and their open weights, ComfyUI releases, the APIs that opened and the ones that closed. Every entry names its source and the day we checked it.`,
};

export const news = {
  title: "AI video news: releases, models and tools",
  description: "Every AI video story on this site, newest first: model releases, open weights, ComfyUI updates, API changes and AI editing tools.",
  h1: "AI video news",
  lede: `Model releases, open weights, ComfyUI updates and API changes, newest first. Each one says where it came from.`,
};

export const about = {
  title: "About aivideo.zone, an AI video newsfeed",
  description: "aivideo.zone covers AI video generation and editing: models, tools and APIs, with a source and a date on every entry.",
  h1: "About aivideo.zone and its AI video coverage",
  lede: `A newsfeed and a set of guides on AI video: the generative models, the tools that run them and the editing that comes after. A source and a date on every entry, and nothing here is paid for.`,
};

/**
 * The site's RSS channel. It lives here rather than in the route because
 * site.config.ts needs the title too — the head's autodiscovery link is
 * what a reader's tool reads to offer the subscription, and a title written
 * out twice is a title that drifts.
 */
export const feed = {
  title: "aivideo.zone — AI video news",
  description: "AI video generation and editing: model releases, open weights, ComfyUI updates and API changes, with the source on every entry.",
  /** RFC 5646. Without it an aggregator files this site under the wrong language. */
  language: "en",
};
