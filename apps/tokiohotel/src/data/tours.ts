// Every fact on this site lives here once, with the source that confirmed
// it. Nothing goes in without one — a date we could not confirm waits.

export interface Source {
  name: string;
  url?: string;
  verifiedOn: string;
}

export interface Show {
  /** ISO date. Every show on this site has one; that is the point of it. */
  date: string;
  city: string;
  country: string;
  /** Left out rather than guessed when the routing was announced without
      a room. "Not announced" is a truthful cell; an invented venue is not. */
  venue?: string;
  /** Outbound slug for a seller we have on file, resolved by /go/. */
  ticket?: string;
  /** Doors or curtain, when the venue prints it. Local time. */
  startTime?: string;
  /** A city page on this site, when the city has one. */
  cityPage?: string;
}

export interface Tour {
  slug: string;
  name: string;
  years: string;
  /** One line for the index. */
  blurb: string;
  /** Only tours we can fill a page for get one; the rest are index rows. */
  page?: boolean;
  summary?: string[];
  shows?: Show[];
  source?: Source;
}

export const band = {
  name: "Tokio Hotel",
  formed: "2001",
  origin: "Magdeburg, Germany",
  members: [
    { name: "Bill Kaulitz", role: "vocals" },
    { name: "Tom Kaulitz", role: "guitar" },
    { name: "Georg Listing", role: "bass" },
    { name: "Gustav Schäfer", role: "drums" },
  ],
};

/** The date every "last checked" line on the site prints. One constant, so
    the site cannot claim two different freshnesses on two pages. */
export const checkedOn = "2026-09-04";

const arenaTour2026: Show[] = [
  { date: "2026-10-28", city: "London", country: "United Kingdom", venue: "OVO Arena Wembley", startTime: "18:00", ticket: "axs-wembley", cityPage: "/cities/london/" },
  { date: "2026-10-30", city: "Paris", country: "France", venue: "Adidas Arena" },
  { date: "2026-11-01", city: "Hamburg", country: "Germany", venue: "Barclays Arena" },
  { date: "2026-11-02", city: "Brussels", country: "Belgium", venue: "Forest National, Vorst" },
  { date: "2026-11-04", city: "Amsterdam", country: "Netherlands", venue: "AFAS Live" },
  { date: "2026-11-05", city: "Frankfurt", country: "Germany", venue: "Festhalle" },
  { date: "2026-11-07", city: "Berlin", country: "Germany", venue: "Uber Arena" },
  { date: "2026-11-08", city: "Nuremberg", country: "Germany" },
  { date: "2026-11-10", city: "Zürich", country: "Switzerland", venue: "Hallenstadion" },
  { date: "2026-11-11", city: "Milan", country: "Italy", venue: "Unipol Forum, Assago" },
  { date: "2026-11-13", city: "Leipzig", country: "Germany" },
  { date: "2026-11-15", city: "Vienna", country: "Austria", venue: "Wiener Stadthalle" },
  { date: "2026-11-16", city: "Munich", country: "Germany", venue: "Olympiahalle" },
  { date: "2026-11-18", city: "Esch-sur-Alzette", country: "Luxembourg", venue: "Rockhal" },
  { date: "2026-11-19", city: "Düsseldorf", country: "Germany" },
  { date: "2026-11-21", city: "Paris", country: "France" },
  { date: "2026-11-23", city: "Madrid", country: "Spain", venue: "Palacio Vistalegre" },
];

// Recovered from our own archive of sensation.vvm.space, a listings site
// this operator ran in 2015 and 2016. Sixteen consecutive nights of the
// Feel It All leg east of Berlin, in the order they were played — a routing
// no current source still carries, which is the whole reason it is here.
const feelItAllEast2015: Show[] = [
  { date: "2015-10-10", city: "Irkutsk", country: "Russia" },
  { date: "2015-10-12", city: "Krasnoyarsk", country: "Russia" },
  { date: "2015-10-14", city: "Novosibirsk", country: "Russia" },
  { date: "2015-10-16", city: "Yekaterinburg", country: "Russia" },
  { date: "2015-10-17", city: "Chelyabinsk", country: "Russia" },
  { date: "2015-10-19", city: "Ufa", country: "Russia" },
  { date: "2015-10-20", city: "Perm", country: "Russia" },
  { date: "2015-10-22", city: "Samara", country: "Russia" },
  { date: "2015-10-25", city: "Nizhny Novgorod", country: "Russia" },
  { date: "2015-10-27", city: "Saint Petersburg", country: "Russia" },
  { date: "2015-10-31", city: "Krasnodar", country: "Russia" },
  { date: "2015-11-01", city: "Rostov-on-Don", country: "Russia" },
  { date: "2015-11-02", city: "Volgograd", country: "Russia" },
  { date: "2015-11-04", city: "Voronezh", country: "Russia" },
  { date: "2015-11-06", city: "Kyiv", country: "Ukraine" },
  { date: "2015-11-08", city: "Minsk", country: "Belarus" },
];

export const tours: Tour[] = [
  {
    slug: "arena-tour-2026",
    name: "Arena Tour",
    years: "2026",
    blurb: "Seventeen arena nights across ten countries, London first and Madrid last.",
    page: true,
    summary: [
      "Seventeen shows in twenty-seven days, from London on 28 October to Madrid on 23 November 2026. Ten countries, and eight of the seventeen nights in Germany — a routing that reads exactly like a band playing the territory that has always been theirs, with the rest of Europe on the way there and back.",
      "Two nights sit in Paris, on 30 October and 21 November, which makes Paris the only city on the run to get the band twice. Everywhere else gets one night and no return.",
    ],
    shows: arenaTour2026,
    source: { name: "Songkick", verifiedOn: checkedOn },
  },
  {
    slug: "feel-it-all-2015",
    name: "Feel It All World Tour",
    years: "2015",
    blurb: "The eastern leg, sixteen consecutive nights, recovered from our own 2015 archive.",
    page: true,
    summary: [
      "Between 10 October and 8 November 2015 the Feel It All tour played sixteen cities east of Berlin, opening in Irkutsk — closer to Beijing than to Moscow — and finishing in Minsk a month later.",
      "This routing is here because we have it first-hand. It was published at the time on sensation.vvm.space, a listings site run by this operator, and recovered in 2026 from the web archive of that site. No current listing still carries the leg date for date.",
    ],
    shows: feelItAllEast2015,
    source: { name: "sensation.vvm.space, recovered from the Internet Archive", verifiedOn: checkedOn },
  },
  { slug: "schrei-2005", name: "Schrei Tour", years: "2005–2006", blurb: "The first tour, behind the debut album." },
  { slug: "zimmer-483-2007", name: "Zimmer 483 Tour", years: "2007", blurb: "The second album takes them out of Germany." },
  { slug: "1000-hotels-2008", name: "1000 Hotels Tour", years: "2008", blurb: "The first tour built for arenas." },
  { slug: "humanoid-city-2010", name: "Welcome to Humanoid City Tour", years: "2010–2011", blurb: "The Humanoid staging, and the last tour before the long gap." },
  { slug: "dream-machine-2017", name: "Dream Machine Tour", years: "2017–2018", blurb: "Back on the road after Feel It All." },
  { slug: "melancholic-paradise-2019", name: "Melancholic Paradise Tour", years: "2019–2020", blurb: "Cut short in 2020." },
  { slug: "beyond-the-world-2023", name: "Beyond the World Tour", years: "2023–2024", blurb: "The tour that last brought them to New York and Mexico City." },
  { slug: "the-tour-2025", name: "The Tour", years: "2025", blurb: "The run immediately before the 2026 arenas." },
];

export const tourBySlug = (slug: string) => tours.find((t) => t.slug === slug);
export const tourPages = () => tours.filter((t) => t.page);

export interface City {
  slug: string;
  name: string;
  country: string;
  /** Upcoming shows on this site, by tour slug. */
  upcoming?: { tour: string; show: Show }[];
  /** The last time the band played here, when there is nothing upcoming. */
  lastVisit?: { date: string; venue: string; tour: string };
  /** A site of ours that covers this city and carries the listing. */
  cityGuide?: { host: string; url: string; label: string };
  summary: string[];
  source: Source;
}

export const cities: City[] = [
  {
    slug: "london",
    name: "London",
    country: "United Kingdom",
    upcoming: [{ tour: "arena-tour-2026", show: arenaTour2026[0] }],
    cityGuide: {
      host: "ldn.lol",
      url: "https://ldn.lol/events/tokio-hotel-ovo-arena-2026/",
      label: "the full listing on ldn.lol",
    },
    summary: [
      "London opens the 2026 Arena Tour on Wednesday 28 October at OVO Arena Wembley, three days after the clocks go back — so a 6pm start is an after-dark one, and the walk from Wembley Park down Olympic Way is the walk you get.",
      "It is the only United Kingdom date on the run. The tour crosses to Paris two days later and does not come back.",
    ],
    source: { name: "OVO Arena Wembley", url: "ovo-arena-events", verifiedOn: checkedOn },
  },
  {
    slug: "new-york",
    name: "New York",
    country: "United States",
    lastVisit: { date: "2024-12-04", venue: "Palladium Times Square", tour: "beyond-the-world-2023" },
    summary: [
      "Nothing upcoming. The 2026 Arena Tour is a European run — seventeen dates, none of them in the Americas.",
      "The last New York show was on 4 December 2024 at Palladium Times Square, near the end of the Beyond the World Tour.",
    ],
    source: { name: "Songkick", verifiedOn: checkedOn },
  },
  {
    slug: "mexico-city",
    name: "Mexico City",
    country: "Mexico",
    lastVisit: { date: "2024-12-06", venue: "Velódromo Olímpico Agustín Melgar", tour: "beyond-the-world-2023" },
    summary: [
      "Nothing upcoming, and nothing announced for the Americas at all: the 2026 routing stops at Madrid.",
      "The last Mexico City show was on 6 December 2024 at the Velódromo Olímpico Agustín Melgar, two nights after New York and at the close of the Beyond the World Tour.",
    ],
    source: { name: "Songkick", verifiedOn: checkedOn },
  },
];

export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
