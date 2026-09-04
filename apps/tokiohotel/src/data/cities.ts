// A city page per stop on the current tour, plus the two cities people keep
// looking for and will not find on it.
//
// Most of what a stop page says is derived from the routing itself — which
// night of seventeen this is, what came before it, how long the band have
// off in between. That is real information and it costs nothing to be
// truthful about, which is exactly why it is computed here rather than
// written by hand seventeen times. Anything a city gets beyond that is in
// NOTES, and comes from the history, with a source.
import { arenaTour2026, tourBySlug, type Show } from "./tours";
import { checkedOn, WIKIPEDIA, type Source } from "./band";

export interface CityGuide {
  host: string;
  url: string;
  label: string;
  /** What the reader gets by following it. */
  note: string;
}

export interface City {
  slug: string;
  name: string;
  country: string;
  shows: Show[];
  /** Index of the first night, 1-based, within the seventeen. */
  night?: number;
  previous?: Show;
  next?: Show;
  /** Extra paragraphs from the band's history in this city. */
  notes?: string[];
  /** When there is nothing upcoming, what there was. */
  lastVisit?: { date: string; venue: string; tour: string };
  cityGuide?: CityGuide;
  source: Source;
}

const slugify = (name: string) =>
  name.toLowerCase()
    .replace(/ü/g, "u").replace(/ö/g, "o").replace(/ä/g, "a").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const NOTES: Record<string, string[]> = {
  london: [
    "Britain took longer to fall than anywhere else in Europe. The band's first British concert was on 19 June 2007, two weeks after the English album Scream came out; the single meant to carry it, “Ready, Set, Go!”, spent one week at number 77 in the UK chart and dropped out again.",
    "Nineteen years later they open a European arena tour here. It is the only United Kingdom date on the run.",
  ],
  paris: [
    "France was the first country outside the German-speaking ones to take the band seriously: “Monsoon” reached number eight there in 2007 and “An deiner Seite (Ich bin da)” number two the same year.",
    "It shows in the 2026 routing. Paris is the only city on the run that gets two nights — 30 October on the way out, 21 November on the way back.",
  ],
  brussels: [
    "The 1000 Hotels World Tour opened in Brussels on 3 March 2008, and after the tour collapsed a fortnight later it was Belgium that got the ending too: the rescheduled second half wrapped at Werchter on 13 July that year.",
  ],
  milan: [
    "The Milan show on the Welcome to Humanoid City Tour was recorded and released on 20 July 2010 as the live album Humanoid City Live. It is the only Tokio Hotel live album named after the room it was played in rather than the tour it belonged to.",
  ],
  hamburg: [
    "Humanoid was written and recorded here, in both German and English, between two North American tours in 2008 and 2009.",
  ],
  berlin: [
    "The band signed to Sony Music Germany and Epic Records Germany in September 2020 and put out a single called “Berlin” three months later. In October 2021 they played “White Lies”, “Behind Blue Eyes” and “Here Comes the Night” at the China Club Berlin to launch the last of them.",
  ],
  madrid: [
    "Madrid closes the tour. Spain was on the 1000 Hotels routing in 2008 and has not had a Tokio Hotel arena night since; the last date of a run is the one a band plays knowing there is no next city to save anything for.",
  ],
};

function buildTourCities(): City[] {
  const byCity = new Map<string, Show[]>();
  for (const show of arenaTour2026) {
    const list = byCity.get(show.city) ?? [];
    list.push(show);
    byCity.set(show.city, list);
  }
  return [...byCity.entries()].map(([name, shows]) => {
    const first = shows[0];
    const index = arenaTour2026.indexOf(first);
    const slug = slugify(name);
    return {
      slug,
      name,
      country: first.country,
      shows,
      night: index + 1,
      previous: index > 0 ? arenaTour2026[index - 1] : undefined,
      next: index < arenaTour2026.length - 1 ? arenaTour2026[index + 1] : undefined,
      notes: NOTES[slug],
      source: tourBySlug("arena-tour-2026")!.source,
    };
  });
}

// The two cities that are not on the tour and are looked for anyway. Both
// point at a site of ours that does cover the city, because "nothing here"
// is a worse answer than "nothing here, but here is what is".
const pastCities: City[] = [
  {
    slug: "new-york",
    name: "New York",
    country: "United States",
    shows: [],
    lastVisit: { date: "2024-12-04", venue: "Palladium Times Square", tour: "beyond-the-world-2023" },
    notes: [
      "Nothing upcoming, and nothing announced for the Americas at all: the 2026 routing stops at Madrid.",
      "The last New York show was on 4 December 2024 at Palladium Times Square, near the end of the Beyond the World Tour — a 2,100-capacity room on 43rd Street, which for a band who won Best New Artist at the MTV Video Music Awards in 2008 is a smaller stage than the history suggests and a closer one than most of the crowd will ever get again.",
    ],
    cityGuide: {
      host: "nyc42.lol",
      url: "https://nyc42.lol/events/",
      label: "what is on in New York",
      note: "our New York listings, checked against the organiser",
    },
    source: { name: "Songkick", verifiedOn: checkedOn },
  },
  {
    slug: "mexico-city",
    name: "Mexico City",
    country: "Mexico",
    shows: [],
    lastVisit: { date: "2024-12-06", venue: "Velódromo Olímpico Agustín Melgar", tour: "beyond-the-world-2023" },
    notes: [
      "Nothing upcoming. The 2026 Arena Tour is a European run and does not cross the Atlantic in either direction.",
      "Mexico has a longer history with this band than the touring map suggests: the South American leg of the Welcome to Humanoid City Tour finished in Mexico on 2 December 2010, and the last time they played the city was 6 December 2024, at the Velódromo Olímpico Agustín Melgar — two nights after New York, at the close of the Beyond the World Tour.",
    ],
    cityGuide: {
      host: "cmx.lol",
      url: "https://cmx.lol/eventos/",
      label: "qué hacer en la Ciudad de México",
      note: "our Mexico City listings, in Spanish",
    },
    source: WIKIPEDIA,
  },
];

export const cities: City[] = [...buildTourCities(), ...pastCities];

// London is the one stop with a listing of its own elsewhere in our network,
// because it is the one stop we could confirm against the venue itself.
const london = cities.find((c) => c.slug === "london");
if (london) {
  london.cityGuide = {
    host: "ldn.lol",
    url: "https://ldn.lol/events/tokio-hotel-ovo-arena-2026/",
    label: "the full listing on ldn.lol",
    note: "how the evening sits in the week, and how you get to Wembley Park",
  };
  london.source = { name: "OVO Arena Wembley", url: "ovo-arena-events", verifiedOn: checkedOn };
}

// The tour data is written without knowing which cities have pages; this is
// where it finds out, so a routing row links to a stop page only when there
// is one to link to.
for (const city of cities) {
  for (const show of city.shows) show.cityPage = `/cities/${city.slug}/`;
}

export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
export const upcomingCities = () => cities.filter((c) => c.shows.length > 0);
export const pastOnlyCities = () => cities.filter((c) => c.shows.length === 0);
