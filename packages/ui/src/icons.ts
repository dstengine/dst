// Shared line-icon set (24x24, stroke paths) for district sites — one icon
// per topic slug used by DistrictHub's "Start here" grid, plus a generic
// pin for named venues that don't carry their own licensed logo. Adding a
// venue's real logo requires the business's own asset, not something
// scraped from the web — see VenueCard.astro.
export const ICONS: Record<string, string> = {
  coffee: "M3 8h13a3 3 0 0 1 0 6h-1M3 8v7a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V8M3 8V5h9v3M6 2v1.5M9 2v1.5",
  food: "M4 2v7a2 2 0 0 0 2 2v9M4 2v4M6 2v4M8 2v4M8 2v9a2 2 0 0 1-2 2M16 2c-2 0-3 2-3 5s1 4 3 4v9",
  pools: "M2 8c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0M2 14c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0M2 20c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0",
  water: "M12 2c3 4.5 6 8.2 6 11.5a6 6 0 0 1-12 0C6 10.2 9 6.5 12 2Z",
  money: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18ZM12 7v10M15 10c0-1.4-1.3-2.5-3-2.5s-3 1.1-3 2.5c0 1.4 1.3 2 3 2.5s3 1.1 3 2.5-1.3 2.5-3 2.5-3-1.1-3-2.5",
  // Three islands over water: a large one with a rise, two smaller behind.
  islands: "M2 19c1.4-1.3 2.8-1.3 4.2 0s2.8 1.3 4.2 0 2.8-1.3 4.2 0 2.8 1.3 4.2 0M4 15c1.4-3.4 3.6-5.1 6.5-5.1s5.1 1.7 6.5 5.1M13.5 9.4c.9-1.6 2.1-2.4 3.6-2.4s2.7.8 3.6 2.4M10.5 9.9V6M10.5 6c-1.2 0-2.1.5-2.7 1.5 1-.3 1.9-.2 2.7.3M10.5 6c1.2 0 2.1.5 2.7 1.5-1-.3-1.9-.2-2.7.3",
  news: "M4 4h13a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V4ZM4 4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2M8 8h8M8 12h8M8 16h4",
  events: "M4 5h16v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5ZM4 9h16M8 2v4M16 2v4M8 13h2M14 13h2M8 17h2M14 17h2",
  rent: "M15 7a4 4 0 1 1-4 4M15 7a4 4 0 0 0-4-4M15 7v2m-4 2H4l2 2m0-4-2 2",
  pin: "M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  clock: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18ZM12 7v5l3.5 2",
  // A stub with the notch a barrier tears along, and a perforated line.
  ticket: "M3 8V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a2 2 0 0 0 0 4v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6a2 2 0 0 0 0-4ZM15 5v2M15 11v2M15 17v2",
  hourglass: "M6 2h12M6 22h12M7 2c0 5 5 6.2 5 10S7 17 7 22M17 2c0 5-5 6.2-5 10s5 5 5 10",
  phone: "M7 3H4.5A1.5 1.5 0 0 0 3 4.6C3 12.5 11.5 21 19.4 21A1.5 1.5 0 0 0 21 19.5V17l-4-2-2 2.5c-2.5-1.2-4.8-3.5-6-6L11.5 9 9.5 5Z",
  link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",
  briefcase: "M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8ZM9 8V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3M3 13h18",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  star: "M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.8L5.7 21l1.7-7-5.4-4.7 7.1-.6L12 2Z",
  // A cat's head: two ear points over a round jaw, eyes as dots, a nose.
  cat: "M4.5 4.5 5 10a7 7 0 0 0 14 0l.5-5.5-3.7 3a9 9 0 0 0-7.6 0ZM9.5 12h.01M14.5 12h.01M12 14.6l-1 1h2Z",
  // A proscenium: two tabs of curtain drawn back over a stage floor.
  stage: "M3 4h18M4 4c0 5-.6 8-2 9 2.2.6 3.4 2 3.5 4M20 4c0 5 .6 8 2 9-2.2.6-3.4 2-3.5 4M2 21h20M8.5 17c1-1.5 2.2-2.2 3.5-2.2s2.5.7 3.5 2.2",
  play: "M3 5h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM10 9l5 2.5L10 14V9Z",
  home: "M3 10.5 12 3l9 7.5M5.5 9v11h13V9",
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  steps: "M3 20h5v-5H3zM9.5 20h5V9h-5zM16 20h5V4h-5z",
  mail: "M3 6h18v12H3zM3 6l9 7 9-7",
  leaf: "M4 20C4 11 10 6 20 5c0 9-5 14-13 14H4ZM8 16c2-4 5-6 9-7",
  map: "M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2ZM9 4v14M15 6v14",
  building: "M4 21V6l7-3v18M11 21h9V10l-9-3M7 9h1M7 13h1M7 17h1M14 12h2M14 16h2",
  document: "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",
  percent: "M6 18 18 6M8 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM16 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  bank: "M3 9 12 4l9 5M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18",
  card: "M2 7h20v11H2zM2 11h20",
  tag: "M3 12V4h8l9 9-8 8-9-9ZM7.5 7.5h.01",
  list: "M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01",
  id: "M4 5h16v14H4zM8.5 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 16c.6-1.6 1.6-2.4 2.5-2.4S10.4 14.4 11 16M14 10h4M14 13h4",
  users: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20c.7-3.3 3.2-5 6.5-5s5.8 1.7 6.5 5M16 5.5a3 3 0 0 1 0 6M18 15c2 .7 3.2 2.3 3.5 5",
  chat: "M4 5h16v11H9l-5 4V5ZM8 9h8M8 12.5h5",
  help: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18ZM9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .8-1 1.7M12 17h.01",
};

export function iconFor(href: string): string | undefined {
  const slug = href.replace(/\//g, "");
  return ICONS[slug];
}

// Header and footer navigation. Every site's nav is a different set of
// pages, so the icon is looked up from the href rather than written out
// seven times — a page named the same thing on two sites gets the same mark.
const NAV_ICONS: Record<string, string> = {
  "": "home",
  "#hubs": "grid",
  "#approach": "steps",
  "#portfolio": "leaf",
  "#interest": "star",
  contact: "mail",
  news: "news",
  events: "events",
  zones: "map",
  mainland: "building",
  registration: "document",
  taxation: "percent",
  banking: "bank",
  financing: "chart",
  payments: "card",
  prices: "tag",
  "payment-plan": "list",
  location: "pin",
  "golden-visa": "id",
  golden: "star",
  properties: "building",
  family: "users",
  consultation: "chat",
  faq: "help",
  privacy: "document",
  programme: "list",
  tickets: "ticket",
  venue: "pin",
  about: "id",
  coffee: "coffee",
  food: "food",
  pools: "pools",
  water: "water",
  money: "money",
  rent: "rent",
};

export function navIconFor(href: string): string | undefined {
  const key = href.replace(/^\/+|\/+$/g, "");
  const name = NAV_ICONS[key];
  return name ? ICONS[name] : undefined;
}
