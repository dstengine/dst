// Eleven tours, in order. Every one gets a page: where a routing survives it is
// printed date for date, and where it does not, what happened on the road
// does the work instead. Nothing here is invented to fill a page — a tour
// with nothing to say would not have one.
import { checkedOn, OFFICIAL, WIKIPEDIA, type Source } from "./band";

export interface Show {
  /** ISO date. Every show on this site has one; that is the point of it. */
  date: string;
  city: string;
  country: string;
  /** Left out rather than guessed when the routing was announced without a
      room. "Not announced" is a truthful cell; an invented venue is not. */
  venue?: string;
  /** Outbound slug for a seller we have on file, resolved by /go/. */
  ticket?: string;
  /** Doors or curtain, when the venue prints it. Local time. */
  startTime?: string;
  /** A city page on this site. Filled in by cities.ts, not by hand. */
  cityPage?: string;
}

export interface Tour {
  slug: string;
  name: string;
  years: string;
  /** One line for the index. */
  blurb: string;
  /** The lede on the tour's own page: two or three paragraphs. */
  summary: string[];
  /** More, under headings, when there is more. */
  sections?: { heading: string; paragraphs: string[] }[];
  shows?: Show[];
  /** What the routing we print covers, when it is not the whole tour. */
  showsHeading?: string;
  showsNote?: string;
  source: Source;
}

const ARCHIVE: Source = {
  name: "sensation.vvm.space, recovered from the Internet Archive",
  verifiedOn: checkedOn,
};

const VENUE: Source = { name: "OVO Arena Wembley", url: "ovo-arena-events", verifiedOn: checkedOn };

export const arenaTour2026: Show[] = [
  { date: "2026-10-28", city: "London", country: "United Kingdom", venue: "OVO Arena Wembley", startTime: "18:00", ticket: "axs-wembley" },
  { date: "2026-10-30", city: "Paris", country: "France", venue: "Adidas Arena", ticket: "bit-paris-oct" },
  { date: "2026-11-01", city: "Hamburg", country: "Germany", venue: "Barclays Arena", ticket: "bit-hamburg" },
  { date: "2026-11-02", city: "Brussels", country: "Belgium", venue: "Forest National, Vorst", ticket: "bit-brussels" },
  { date: "2026-11-04", city: "Amsterdam", country: "Netherlands", venue: "AFAS Live", ticket: "bit-amsterdam" },
  { date: "2026-11-05", city: "Frankfurt", country: "Germany", venue: "Festhalle", ticket: "bit-frankfurt" },
  { date: "2026-11-07", city: "Berlin", country: "Germany", venue: "Uber Arena", ticket: "bit-berlin" },
  { date: "2026-11-08", city: "Nuremberg", country: "Germany", ticket: "bit-nuremberg" },
  { date: "2026-11-10", city: "Zürich", country: "Switzerland", venue: "Hallenstadion", ticket: "bit-zurich" },
  { date: "2026-11-11", city: "Milan", country: "Italy", venue: "Unipol Forum, Assago", ticket: "bit-milan" },
  { date: "2026-11-13", city: "Leipzig", country: "Germany", ticket: "bit-leipzig" },
  { date: "2026-11-15", city: "Vienna", country: "Austria", venue: "Wiener Stadthalle", ticket: "bit-vienna" },
  { date: "2026-11-16", city: "Munich", country: "Germany", venue: "Olympiahalle", ticket: "bit-munich" },
  { date: "2026-11-18", city: "Esch-sur-Alzette", country: "Luxembourg", venue: "Rockhal", ticket: "bit-esch" },
  { date: "2026-11-19", city: "Düsseldorf", country: "Germany", ticket: "bit-dusseldorf" },
  { date: "2026-11-21", city: "Paris", country: "France", ticket: "bit-paris-nov" },
  { date: "2026-11-23", city: "Madrid", country: "Spain", venue: "Palacio Vistalegre", ticket: "bit-madrid" },
];

// Recovered from our own archive of sensation.vvm.space, a listings site
// this operator ran in 2015 and 2016. Sixteen consecutive nights of what the
// band themselves called Part 4 of the Feel It All tour, in the order they
// were played — a routing no current source still carries date for date.
export const feelItAllEast2015: Show[] = [
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

// The second tour on the band's own site, and the one no listing carried
// when this page was first written. Fourteen entries: two European cities,
// a festival, and eleven German open-air nights in August.
export const summerEncore2027: Show[] = [
  { date: "2027-07-14", city: "Rome", country: "Italy", ticket: "vivaticket-rome" },
  { date: "2027-07-19", city: "Warsaw", country: "Poland", venue: "Progresja Summer Stage", ticket: "ebilet-warsaw" },
  { date: "2027-08-05", city: "Aurich", country: "Germany", ticket: "eventim-aurich" },
  { date: "2027-08-06", city: "Dortmund", country: "Germany", ticket: "eventim-dortmund" },
  { date: "2027-08-08", city: "Würzburg", country: "Germany", ticket: "eventim-wurzburg" },
  { date: "2027-08-10", city: "Mönchengladbach", country: "Germany", ticket: "eventim-monchengladbach" },
  { date: "2027-08-11", city: "Frankfurt am Main", country: "Germany", ticket: "eventim-frankfurt" },
  { date: "2027-08-13", city: "Dresden", country: "Germany", ticket: "eventim-dresden" },
  { date: "2027-08-15", city: "Magdeburg", country: "Germany", ticket: "eventim-magdeburg" },
  { date: "2027-08-17", city: "Halle (Saale)", country: "Germany", ticket: "eventim-halle" },
  { date: "2027-08-19", city: "Sankt Pölten", country: "Austria", venue: "Frequency Festival", ticket: "frequency-tickets" },
  { date: "2027-08-23", city: "Hamburg", country: "Germany", ticket: "eventim-hamburg" },
  { date: "2027-08-25", city: "Berlin", country: "Germany", ticket: "eventim-berlin" },
  { date: "2027-08-27", city: "Hanover", country: "Germany", ticket: "eventim-hanover" },
];

export const tours: Tour[] = [
  {
    slug: "schrei-2005",
    name: "Schrei Tour",
    years: "2005–2006",
    blurb: "The first one. Four teenagers, a number-one single, and a country that had not seen this in a decade.",
    summary: [
      "The tour behind the debut, played by a band whose oldest member was eighteen and whose singer was sixteen. “Durch den Monsun” had gone to number one in Germany and Austria in August 2005; the album followed in September; the road followed the album.",
      "It is the only Tokio Hotel tour that never had to compete with a back catalogue. Everything they could play, they had written in the previous two years.",
    ],
    source: WIKIPEDIA,
  },
  {
    slug: "zimmer-483-2007",
    name: "Zimmer 483 Tour",
    years: "2007",
    blurb: "Started two weeks late because the band did not like the stage.",
    summary: [
      "Scheduled to open in March 2007 behind an album that had gone straight to number one, and pushed back a fortnight — not by illness or ticketing, but because the band wanted a different stage design and were in a position to ask for one.",
      "The year around it is the year the band stopped being German: the English album Scream came out on 4 June, the first British concert was on 19 June, and the first North American dates followed in February 2008.",
    ],
    source: WIKIPEDIA,
  },
  {
    slug: "1000-hotels-2008",
    name: "1000 Hotels World Tour",
    years: "2008",
    blurb: "Forty-three shows without a break, then surgery on the singer's vocal cords.",
    summary: [
      "It opened in Brussels on 3 March 2008 and ran through the Netherlands, Luxembourg, France, Spain, Portugal, Italy, Serbia and Scandinavia, due to finish on 9 April.",
      "It did not finish on 9 April. In Marseille on 14 March the singer's voice went: he handed more of the set to the audience and the band played sixteen songs instead of twenty-one. Two days later the Lisbon show was cancelled minutes before it should have started, and the rest of the tour — plus a North American run — went with it.",
    ],
    sections: [
      {
        heading: "What it cost",
        paragraphs: [
          "Bill Kaulitz had played forty-three concerts without a break. On 30 March he had surgery on his larynx to remove a cyst that had formed on his vocal cords, the result of an untreated throat infection. He could not speak for ten days and spent four weeks in vocal rehabilitation.",
          "The medical verdict, reported at the time, was that finishing the tour would have damaged the voice permanently. This is the single hardest fact in twenty-five years of this band's touring, and it is why every routing since has looked more cautious than it needs to.",
        ],
      },
      {
        heading: "How it ended",
        paragraphs: [
          "They started playing again in May 2008 and went back out for a second half built around open-air dates, wrapping up on 13 July in Werchter, Belgium — the same small country the tour had opened in four months earlier.",
        ],
      },
    ],
    source: WIKIPEDIA,
  },
  {
    slug: "humanoid-city-2010",
    name: "Welcome to Humanoid City Tour",
    years: "2010–2011",
    blurb: "Thirty-two European cities in eight weeks, one of which became a live album.",
    summary: [
      "Twenty-second of February to fourteenth of April 2010: thirty-two cities across Europe, the densest routing the band has ever played. The Milan show was recorded and released on 20 July 2010 as the live album Humanoid City Live.",
      "The year kept going after Europe. A South American run ended in Mexico on 2 December 2010; Tokyo followed on 15 December — the city the band is named after, thirty-five years of German pop history after somebody picked the name for the sound of it.",
    ],
    sections: [
      {
        heading: "And then a long silence",
        paragraphs: [
          "This is the last tour before the gap. Bill and Tom Kaulitz moved to Los Angeles not long after it ended, and the next Tokio Hotel tour was five years away.",
        ],
      },
    ],
    source: WIKIPEDIA,
  },
  {
    slug: "feel-it-all-2015",
    name: "Feel It All World Tour",
    years: "2015",
    blurb: "Four parts, deliberately. Clubs first, then America, then Latin America, then sixteen nights east of Berlin.",
    summary: [
      "The comeback tour, and the only one the band split into numbered parts. Part 1 opened in Europe on 6 March 2015 as “the Club Experience” — arenas traded for rooms small enough to stand close in, by a band that had spent 2010 filling thirty-two arenas. Part 2 was the United States, Part 3 Latin America, Part 4 the east.",
      "Part 4 is the reason this site exists in the shape it does. We have it night by night, because we published it at the time.",
    ],
    shows: feelItAllEast2015,
    showsHeading: "Part 4, night by night",
    showsNote:
      "Sixteen consecutive shows between 10 October and 8 November 2015, opening in Irkutsk — closer to Beijing than to Moscow — and closing in Minsk a month later. This routing was published at the time on sensation.vvm.space, a listings site run by this operator; the site closed and the leg went with it. It was recovered from the web archive in 2026. No current listing carries it date for date.",
    source: ARCHIVE,
  },
  {
    slug: "dream-machine-2017",
    name: "Dream Machine Tour",
    years: "2017–2018",
    blurb: "The first tour outside Universal, and a North American leg cancelled by the band's own equipment.",
    summary: [
      "Behind the first album the band made after leaving Universal. The 2018 North American dates, announced on 25 September 2017, were later cancelled over technical problems with the band's own gear — a rare thing to admit publicly, and the reason this tour is remembered as two-thirds of a tour.",
    ],
    source: WIKIPEDIA,
  },
  {
    slug: "melancholic-paradise-2019",
    name: "Melancholic Paradise Tour",
    years: "2019–2020",
    blurb: "Three venues into the Americas leg when the world shut.",
    summary: [
      "Announced on 29 October 2018 with European dates and a promise of new songs alongside the familiar ones; North and Latin American legs were added in October 2019 for 2020.",
      "Three shows of that leg were played. The rest was cancelled at the last minute as the pandemic closed borders and venues, and the band would not play a full tour again for three years.",
    ],
    source: WIKIPEDIA,
  },
  {
    slug: "beyond-the-world-2023",
    name: "Beyond the World Tour",
    years: "2023–2024",
    blurb: "Announced for 2021, moved twice, finally played — and the last time they crossed the Atlantic.",
    summary: [
      "Announced on 7 December 2020 for autumn 2021. Postponed in May 2021 to spring 2022 as the pandemic ran on. Postponed again on 6 March 2022, the band saying it did not feel right to carry on as usual; most of the shows were moved into 2023 and every ticket stayed valid.",
      "It finally ran in 2023, and got a second life the following year: a Latin American and North American leg announced on 20 June 2024, played through the end of November and into December, with dates in the United States, Canada, Mexico and South America.",
    ],
    sections: [
      {
        heading: "The last American nights",
        paragraphs: [
          "That 2024 leg is why the New York and Mexico City pages on this site read the way they do. New York got 4 December 2024 at Palladium Times Square; Mexico City got 6 December at the Velódromo Olímpico Agustín Melgar. Nothing has been announced on either continent since, and the 2026 routing stops at Madrid.",
        ],
      },
    ],
    source: WIKIPEDIA,
  },
  {
    slug: "the-tour-2025",
    name: "The Tour",
    years: "2025",
    blurb: "Announced eighteen months ahead, and bracketed by a one-night anniversary show.",
    summary: [
      "Announced on 5 December 2023 with European dates — an unusually long run-up, and a sign of a band planning in years again rather than in seasons.",
      "The year it landed in also held a single night of its own: on 15 August 2025 the band played a one-off concert marking twenty years since “Durch den Monsun”, twenty years to the month after the single that started everything entered the German chart.",
    ],
    source: WIKIPEDIA,
  },
  {
    slug: "arena-tour-2026",
    name: "Arena Tour",
    years: "2026",
    blurb: "Seventeen arena nights across ten countries, twelve days after a new album lands.",
    summary: [
      "Seventeen shows in twenty-seven days, from London on 28 October to Madrid on 23 November 2026. Ten countries; eight of the seventeen nights in Germany, which is what a band's home territory looks like on a map.",
      "It was announced on 19 March 2025, alongside the anniversary show — eighteen months of notice for a run that will be, in practice, the Encore tour: the eighth studio album is out on 16 October 2026, twelve days before the opening night.",
    ],
    sections: [
      {
        heading: "How the routing reads",
        paragraphs: [
          "Paris is the only city that gets the band twice, on 30 October and again on 21 November — once on the way out, once on the way back. Everywhere else gets one night and no return.",
          "There is no Americas leg, and no second British date. If you are reading this from outside the ten countries below, the honest answer is that this run has nothing for you — though the summer after it does add Poland, and puts the band in the town they formed in.",
        ],
      },
      {
        heading: "What they will be playing",
        paragraphs: [
          "Four songs from Encore have been public for months — “Changes” since November 2025, “California Nights” since February, “Memory Lane” since May, “Without You” since July — and the full tracklist since 20 August 2026. Everything else on the record will be twelve days old on opening night.",
        ],
      },
    ],
    shows: arenaTour2026,
    showsHeading: "All seventeen dates",
    source: OFFICIAL,
  },
  {
    slug: "summer-encore-2027",
    name: "Summer Encore",
    years: "2027",
    blurb: "Fourteen open-air nights the summer after — including, on 15 August, the town they formed in.",
    summary: [
      "The Arena Tour is not the end of it. A second run is on sale for the summer that follows: fourteen dates from Rome on 14 July to Hanover on 27 August 2027, most of them German open-airs in a three-week block through August.",
      "The two runs are opposites. The arena tour is indoors, in the dark, in ten countries, over twenty-seven days at the end of the year. This one is outdoors, in daylight, in four, and eleven of its fourteen nights are in Germany — the shape a band takes when it has stopped needing to prove the reach and starts playing the summer circuit at home.",
    ],
    sections: [
      {
        heading: "The 15th of August",
        paragraphs: [
          "Magdeburg is on the list. That is where the four of them met and where the band was formed in 2001, and on this routing it is not a stop between two others — it sits in the middle of the German block, on a Sunday, between Dresden and Halle.",
          "They have played the city before. They have rarely played it as one of fourteen dates on a run that also takes in Rome and a festival main stage.",
        ],
      },
      {
        heading: "Where the rooms are not yet named",
        paragraphs: [
          "Two of the fourteen have a venue: Progresja Summer Stage in Warsaw, and the Frequency Festival at Sankt Pölten, which runs across three days from 19 August. The other twelve are on sale with a city and a date and nothing else, which is normal this far out for open-airs and is exactly how they are printed below.",
          "Poland is the one country here that the arena tour does not reach; Italy, Austria and Germany are on both runs, in different cities. Only three cities repeat: Hamburg, Frankfurt and Berlin get a second look at a band they will already have seen nine or ten months earlier, in a very different room. The other eleven stops here are places the arena tour never reaches.",
        ],
      },
      {
        heading: "About the ticket links",
        paragraphs: [
          "The band's own site marks eleven of these dates with an asterisk and the words “Advertising – Affiliate Links”: those buttons route through a tracking domain that pays a commission per click. The links here go to the same Eventim events with the affiliate code taken off. Same seller, same price, one redirect fewer, and nobody is paid for your click.",
        ],
      },
    ],
    shows: summerEncore2027,
    showsHeading: "All fourteen dates",
    showsNote: "Venue is printed where one has been announced. Twelve of the fourteen are on sale as a city and a date.",
    source: OFFICIAL,
  },
];

export const tourBySlug = (slug: string) => tours.find((t) => t.slug === slug);
export { checkedOn, VENUE };
