// A city page per stop on either announced tour, plus the two cities people
// keep looking for and will not find on either.
//
// Most of what a stop page says is derived from the routing itself — which
// night of how many this is, what came before it, how long the band have off
// in between. That is real information and it costs nothing to be truthful
// about, which is exactly why it is computed here rather than written by hand
// thirty-one times. Anything a city gets beyond that is in NOTES, and comes
// from the history, with a source.
//
// A city can now appear on both runs — Hamburg, Berlin and Frankfurt
// all do — so a city holds a list of stops, one per tour, and not a
// single position in a single routing.
import { tourBySlug, type Show, type Tour } from "./tours";
import { checkedOn, OFFICIAL, WIKIPEDIA, type Source } from "./band";

export interface CityGuide {
  host: string;
  url: string;
  label: string;
  /** What the reader gets by following it. */
  note: string;
}

/** One tour's worth of a city: which night, and what sits either side of it. */
export interface Stop {
  tour: Tour;
  shows: Show[];
  /** Index of the first night in this city, 1-based, within the tour. */
  night: number;
  total: number;
  previous?: Show;
  next?: Show;
}

export interface City {
  slug: string;
  name: string;
  country: string;
  stops: Stop[];
  /** Every show in this city, both tours, in date order. */
  shows: Show[];
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

// The band's own site writes Frankfurt one way in 2026 and the other in 2027.
// It is one city and gets one page.
const CANONICAL: Record<string, string> = { "Frankfurt am Main": "Frankfurt" };
const canonical = (name: string) => CANONICAL[name] ?? name;

const NOTES: Record<string, string[]> = {
  london: [
    "Britain took longer to fall than anywhere else in Europe. The band's first British concert was on 19 June 2007, two weeks after the English album Scream came out; the single meant to carry it, “Ready, Set, Go!”, spent one week at number 77 in the UK chart and dropped out again.",
    "Nineteen years later they open a European arena tour here. It is the only United Kingdom date on either announced run.",
  ],
  paris: [
    "France was the first country outside the German-speaking ones to take the band seriously: “Monsoon” reached number eight there in 2007 and “An deiner Seite (Ich bin da)” number two the same year.",
    "It shows in the 2026 routing. Paris is the only city on that run that gets two nights — 30 October on the way out, 21 November on the way back.",
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
  amsterdam: [
    "The Netherlands is one of the countries the 1000 Hotels World Tour reached in 2008, on the leg that opened in Brussels and ran until the singer's voice gave out. This is the only Dutch date on either announced run.",
    "It falls between two nights off and a night that has none: Frankfurt is the following evening.",
  ],
  nuremberg: [
    "One of the three 2026 dates still on sale without a room. Nuremberg follows Berlin with a single day between them — the tightest turnaround the routing has in Germany.",
    "It is also a Sunday, which on this run means the second half of a weekend the band open in Berlin.",
  ],
  zurich: [
    "Switzerland gets one night and no return. It is the first date after the German block breaks, and the band cross a border twice in three days: Zürich, then Milan.",
  ],
  leipzig: [
    "Leipzig sits in the exact middle of the run — night eleven of seventeen — with two nights off on either side of it, the only date on the tour that gets that much room.",
    "The venue has not been announced.",
  ],
  vienna: [
    "Austria was a number-one market before Germany finished becoming one. “Durch den Monsun” topped the Austrian singles chart in 2005, “Rette mich” and “Der letzte Tag” both went to number one there in 2006, and Schrei was certified platinum by the Austrian affiliate of the IFPI as well as the German one.",
    "This is the only Austrian date of the 2026 run. The country comes back in 2027, at a festival rather than an arena.",
  ],
  frankfurt: [
    "Frankfurt gets the band twice inside ten months, and the two dates are on sale in opposite states: the Festhalle night in November 2026 has a room, a date and a ticket link, while the August 2027 one has a date and nothing else yet.",
    "That is the difference between an arena booked eighteen months out and an open-air announced with the venue still to follow.",
  ],
  munich: [
    "A Monday, the night after Vienna, with no day between them. Munich is the last of the eight German nights on the 2026 run and the last time the tour is in Germany before it turns west for Luxembourg and France.",
  ],
  "esch-sur-alzette": [
    "Luxembourg is named in Wikipedia's account of the 1000 Hotels World Tour, which crossed it in the spring of 2008 between the Netherlands and France. Eighteen years later the country gets one night again.",
    "Rockhal is a fixed room on this routing where three of the German dates around it still have none.",
  ],
  dusseldorf: [
    "The night after Luxembourg, with no day off in between — the last of the tour's back-to-back pairs, and a border crossing on top of it.",
    "No venue has been announced. Two nights later the tour is in Paris for the second time.",
  ],
  rome: [
    "Rome opens the second run, and it puts the band in Italy twice inside ten months: Milan on 11 November 2026, Rome on 14 July 2027, in two very different kinds of room.",
    "Five nights then pass before Warsaw, and after Warsaw the routing stops for seventeen — the longest break either tour takes.",
  ],
  warsaw: [
    "Poland is the one country on either announced run that the arena tour does not reach at all. This is the only Polish date, and one of two dates on the 2027 run with a venue attached to it.",
    "It is also the last night before the long pause: the band do not play again until 5 August.",
  ],
  aurich: [
    "The German block starts here, seventeen nights after Warsaw — the longest gap in either routing, and the point where a scattered summer becomes a tour.",
    "Aurich is the northernmost stop of the run and the first of eleven German nights in twenty-three days.",
  ],
  dortmund: [
    "The night straight after Aurich, with nothing in between: the only back-to-back pair on the 2027 run, and the first two-in-a-row the band have played since Düsseldorf the previous November.",
  ],
  wurzburg: [
    "A Sunday in the middle of the German block, two nights after Dortmund and two before Mönchengladbach — the rhythm the rest of August keeps to almost without exception.",
  ],
  monchengladbach: [
    "The second half of the block's only tight turn: Mönchengladbach on the Tuesday, Frankfurt on the Wednesday.",
    "Like nine of the eleven German dates in 2027, it is on sale as a city and a date, with the room still to be named.",
  ],
  dresden: [
    "A Friday, and the door into the eastern end of the run: Dresden, then Magdeburg, then Halle, three cities inside five nights and the closest the routing comes to going home.",
  ],
  "halle-saale": [
    "Two nights after Magdeburg, and the last German date before the tour crosses into Austria for its only festival booking.",
    "Halle closes the eastern stretch that Dresden opened five nights earlier.",
  ],
  hanover: [
    "The last night. Hanover closes the Summer Encore run on a Friday in late August, two nights after Berlin, with nothing announced beyond it on either continent.",
    "It is the only city on the 2027 routing that gets the ending, and the only one where the band are not saving anything for a next stop.",
  ],
  madrid: [
    "Madrid closes the arena tour. Spain was on the 1000 Hotels routing in 2008 and has not had a Tokio Hotel arena night since; the last date of a run is the one a band plays knowing there is no next city to save anything for.",
  ],
  magdeburg: [
    "This is where it started. Bill Kaulitz, Tom Kaulitz, Georg Listing and Gustav Schäfer formed the band in Magdeburg in 2001, under the name Devilish, and the line-up has not changed since.",
    "It is the twenty-fifth anniversary year of that, and the date falls in the middle of the German block rather than at the end of it — a Sunday in August between Dresden and Halle, on a run that also takes in Rome and a festival main stage.",
  ],
  "sankt-polten": [
    "The Frequency Festival is the only festival booking on either announced tour: everything else on both runs is the band's own show, in their own room, on their own bill.",
    "It runs across three days from 19 August 2027, and a festival announces its day splits later than it announces its line-up — which is why this date is printed as the festival and not as an evening.",
  ],
};

const ANNOUNCED: Tour[] = [tourBySlug("arena-tour-2026")!, tourBySlug("summer-encore-2027")!];

function buildTourCities(): City[] {
  const byCity = new Map<string, City>();

  for (const tour of ANNOUNCED) {
    const routing = tour.shows!;
    const seen = new Map<string, Show[]>();
    for (const show of routing) {
      const key = canonical(show.city);
      const list = seen.get(key) ?? [];
      list.push(show);
      seen.set(key, list);
    }
    for (const [name, shows] of seen) {
      const first = shows[0];
      const index = routing.indexOf(first);
      const last = shows[shows.length - 1];
      const stop: Stop = {
        tour,
        shows,
        night: index + 1,
        total: routing.length,
        previous: index > 0 ? routing[index - 1] : undefined,
        next: routing.indexOf(last) < routing.length - 1 ? routing[routing.indexOf(last) + 1] : undefined,
      };
      const slug = slugify(name);
      const city = byCity.get(slug);
      if (city) {
        city.stops.push(stop);
        city.shows.push(...shows);
      } else {
        byCity.set(slug, {
          slug,
          name,
          country: first.country,
          stops: [stop],
          shows: [...shows],
          notes: NOTES[slug],
          source: OFFICIAL,
        });
      }
    }
  }

  const cities = [...byCity.values()];
  for (const city of cities) city.shows.sort((a, b) => a.date.localeCompare(b.date));
  return cities;
}

// The two cities that are on neither tour and are looked for anyway. Both
// point at a site of ours that does cover the city, because "nothing here"
// is a worse answer than "nothing here, but here is what is".
const pastCities: City[] = [
  {
    slug: "new-york",
    name: "New York",
    country: "United States",
    stops: [],
    shows: [],
    lastVisit: { date: "2024-12-04", venue: "Palladium Times Square", tour: "beyond-the-world-2023" },
    notes: [
      "Nothing upcoming, and nothing announced for the Americas at all: the 2026 routing stops at Madrid, and the 2027 one never leaves western and central Europe.",
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
    stops: [],
    shows: [],
    lastVisit: { date: "2024-12-06", venue: "Velódromo Olímpico Agustín Melgar", tour: "beyond-the-world-2023" },
    notes: [
      "Nothing upcoming. Both announced tours are European runs and neither crosses the Atlantic in either direction.",
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
    label: "the full listing on London Today",
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
/** Cities on one tour but not the other, in the order the routing plays them. */
export const citiesOn = (tourSlug: string) =>
  cities.filter((c) => c.stops.some((s) => s.tour.slug === tourSlug));
