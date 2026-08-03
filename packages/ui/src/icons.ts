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
  news: "M4 4h13a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V4ZM4 4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2M8 8h8M8 12h8M8 16h4",
  events: "M4 5h16v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5ZM4 9h16M8 2v4M16 2v4M8 13h2M14 13h2M8 17h2M14 17h2",
  rent: "M15 7a4 4 0 1 1-4 4M15 7a4 4 0 0 0-4-4M15 7v2m-4 2H4l2 2m0-4-2 2",
  pin: "M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
};

export function iconFor(href: string): string | undefined {
  const slug = href.replace(/\//g, "");
  return ICONS[slug];
}
