// The hub's own words, at / (at /festivals/ until 23 Oct 2026, which now
// redirects here). They live here rather than in the
// data because they are the site's, not a guide's, and because
// tools/lastmod.mjs dates the hub by the files its route imports: a
// sentence edited here moves the hub's date, where one kept in src/data
// (whose records date themselves) would move nothing.
//
// English, as the site's front door; everything a guide brings to the hub
// (its language's name, its blurb, its page labels) is in that guide's
// language and tagged with it.
export const hub = {
  path: "/",
  title: "Festival guides: dates, tickets, lineups, getting there",
  description:
    "Festival guides, one per event and language: dates, ticket prices, the lineup by day and how to get there, every figure dated, every source named.",
  h1: "Festival guides",
  intro:
    "Each guide here answers what people search for about one festival, in their own language: when and where it is, what the tickets cost and who sells them, the lineup by day, and how to get there. Every figure carries the date it was read and names its source: the organiser, one of its official sellers, a public body or, where it is named as such, the press; no link goes to a reseller the organiser doesn't name, and nothing is sold here.",
  // The foot of the hub: the archive of the old festival site, whose pages
  // are this app's since 23 Oct 2026 and keep their addresses. Each link's
  // title is the page's own title, which says more than its label.
  archive: {
    heading: "From the archive",
    intro:
      "Three older sites live on here at their own addresses, restored from the Internet Archive: their text as it was written, mostly in Russian, with an English title and summary on every page.",
    links: [
      {
        href: "/archive/",
        label: "Festivals and tours across Russia",
        title: "The old front page of fest.one, restored from the Internet Archive",
        line: "The old front page of fest.one: The Prodigy's 2016 tour across four cities, and the venues and cities it indexed.",
      },
      {
        href: "/concert/",
        label: "Concert listings",
        title: "Concert and festival listings in four Russian cities, 2015–2017",
        line: "Concerts and festivals in Moscow, St Petersburg, Yekaterinburg and Nizhny Tagil, October 2015 to March 2017.",
      },
      {
        href: "/sensation2015/",
        label: "Sensation 2015",
        title: "Sensation 2015: a festival fan site in three languages",
        line: "A fan site about the all-white dance festival: Amsterdam, Dubai, Monterrey and Moscow, in English, Russian and Spanish.",
      },
    ],
  },
};
