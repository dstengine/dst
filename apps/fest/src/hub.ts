// The hub's own words, at /festivals/. They live here rather than in the
// data because they are the site's, not a guide's, and because
// tools/lastmod.mjs dates the hub by the files its route imports: a
// sentence edited here moves the hub's date, where one kept in src/data
// (whose records date themselves) would move nothing.
//
// English, as the site's front door; everything a guide brings to the hub
// (its language's name, its blurb, its page labels) is in that guide's
// language and tagged with it.
export const hub = {
  path: "/festivals/",
  title: "Festival guides: dates, tickets, lineups, getting there",
  description:
    "Festival guides, one per event and language: dates, ticket prices, the lineup by day and how to get there, every figure dated, every source named.",
  h1: "Festival guides",
  intro:
    "Each guide here answers what people search for about one festival, in their own language: when and where it is, what the tickets cost and who sells them, the lineup by day, and how to get there. Every figure carries the date it was read and names its source: the organiser, one of its official sellers, a public body or, where it is named as such, the press; no link goes to a reseller the organiser doesn't name, and nothing is sold here.",
};
