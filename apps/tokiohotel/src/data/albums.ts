// The studio albums, and the singles that announced them. Dates from the
// band's Wikipedia article and its discography; where a record came out on
// two dates in two territories, both are printed rather than one picked.
import { checkedOn, DISCOGRAPHY, WIKIPEDIA, type Source } from "./band";

export interface Album {
  slug: string;
  title: string;
  /** Ordinal among the studio albums. */
  number: number;
  /** ISO, the first territory to get it. */
  released: string;
  /** Set when a second territory got a different date. */
  alsoReleased?: { date: string; where: string };
  label: string;
  language: string;
  /** The tour this record went out on, by tour slug. */
  tour?: string;
  upcoming?: boolean;
  blurb: string;
  body: string[];
  singles?: { title: string; released: string; note?: string }[];
  source: Source;
}

export const albums: Album[] = [
  {
    slug: "schrei",
    title: "Schrei",
    number: 1,
    released: "2005-09-19",
    label: "Universal Music Germany",
    language: "German",
    tour: "schrei-2005",
    blurb: "The debut, and the record that had to be partly re-recorded because the singer's voice broke.",
    body: [
      "Sony BMG signed the band and then terminated the contract shortly before the first album was due. Universal Music Germany picked them up in 2005, and the first single out of that deal — “Durch den Monsun” — entered the German chart at number 15 on 20 August 2005 and was number one six days later.",
      "The album followed on 19 September 2005 and was certified triple gold by the BVMI in 2006 for 300,000 copies in Germany. It was released in Germany, Italy, France, Canada and Japan and nowhere else.",
      "A year later came Schrei (so laut du kannst) — partly re-recorded and expanded, because Bill Kaulitz's voice had changed with puberty and three songs no longer sounded like the band that would have to sing them live.",
    ],
    singles: [
      { title: "Durch den Monsun", released: "2005-08", note: "number one in Germany and Austria" },
      { title: "Schrei", released: "2005", note: "number five in Germany" },
      { title: "Rette mich", released: "2006", note: "number one in Germany and Austria" },
      { title: "Der letzte Tag", released: "2006", note: "number one in Germany and Austria" },
    ],
    source: WIKIPEDIA,
  },
  {
    slug: "zimmer-483",
    title: "Zimmer 483",
    number: 2,
    released: "2007-02-23",
    label: "Universal Music Germany",
    language: "German",
    tour: "zimmer-483-2007",
    blurb: "Over 375,000 copies in two months, and the tour that started late over a stage design.",
    body: [
      "The second German album arrived on 23 February 2007 behind “Übers Ende der Welt”, which had gone to number one in Germany and Austria and number two in France a month earlier.",
      "It is the band's most reliable seller: over 375,000 copies in its first two months, platinum in Austria, gold in three countries. The tour behind it was meant to start in March and started two weeks late — the band wanted a different stage.",
    ],
    singles: [
      { title: "Übers Ende der Welt", released: "2007-01-26", note: "number one in Germany and Austria" },
      { title: "Spring nicht", released: "2007-04-07", note: "number three in Germany" },
      { title: "An deiner Seite (Ich bin da)", released: "2007-11-16", note: "number two in France" },
    ],
    source: WIKIPEDIA,
  },
  {
    slug: "scream",
    title: "Scream",
    number: 3,
    released: "2007-06-04",
    label: "Universal Music Germany",
    language: "English",
    tour: "zimmer-483-2007",
    blurb: "The first English album — the first two records sung again, and the passport out of Germany.",
    body: [
      "Not new songs: English versions of twelve songs already released, eight from Zimmer 483 and four from Schrei. In German-speaking countries it was called Room 483 instead, to keep the line from the album before it visible.",
      "It is the record that moved the band into France, Portugal, Spain and Italy, and the one that did not move them into Britain: “Ready, Set, Go!” spent a single week at number 77 in the UK chart and dropped out. Their first British concert had been on 19 June 2007, two weeks after the album.",
    ],
    singles: [
      { title: "Monsoon", released: "2007", note: "number eight in France and Italy" },
      { title: "Ready, Set, Go!", released: "2007-08-27", note: "number 77 in the UK" },
      { title: "Don't Jump", released: "2008" },
    ],
    source: WIKIPEDIA,
  },
  {
    slug: "humanoid",
    title: "Humanoid",
    number: 4,
    released: "2009-10-02",
    alsoReleased: { date: "2009-10-06", where: "the United States" },
    label: "Island Records / Cherrytree Records",
    language: "German and English",
    tour: "humanoid-city-2010",
    blurb: "Recorded twice, in two languages, and released worldwide on the same title.",
    body: [
      "Written and recorded in both German and English, with both versions released simultaneously under one name. Germany and the rest of Europe got it on 2 October 2009; the United States on 6 October. Britain got no release at all until iTunes put it up on 27 January 2014.",
      "The tour it fed — thirty-two European cities in eight weeks — produced the live album Humanoid City Live, recorded in Milan and released on 20 July 2010.",
    ],
    singles: [
      { title: "Automatisch / Automatic", released: "2009-09-22" },
      { title: "Lass uns laufen / World Behind My Wall", released: "2009-12" },
    ],
    source: WIKIPEDIA,
  },
  {
    slug: "kings-of-suburbia",
    title: "Kings of Suburbia",
    number: 5,
    released: "2014-10-03",
    alsoReleased: { date: "2014-10-06", where: "the rest of the world" },
    label: "Island Records",
    language: "English",
    tour: "feel-it-all-2015",
    blurb: "Four years of silence, then electropop and no German version at all.",
    body: [
      "Announced in 2013, promised again, and delivered a year later than that: Bill Kaulitz named it on Instagram on 3 September 2014 and it was out a month afterwards.",
      "It is the record where the band stops being a rock band. Everything before it came out in German and English; this one is English only, and the guitars give way to electropop and synth-pop. It went to number one in thirty countries and the top five in seventeen more.",
    ],
    singles: [
      { title: "Love Who Loves You Back", released: "2014-09-26" },
      { title: "Run, Run, Run", released: "2014-09-12", note: "promotional" },
      { title: "Girl Got a Gun", released: "2014-09-19", note: "promotional" },
    ],
    source: WIKIPEDIA,
  },
  {
    slug: "dream-machine",
    title: "Dream Machine",
    number: 6,
    released: "2017-03-03",
    label: "Starwatch Music",
    language: "English",
    tour: "dream-machine-2017",
    blurb: "The first album made outside Universal, announced by putting two songs on YouTube for free.",
    body: [
      "Two songs went up on YouTube in the last week of December 2016 — “Something New” on the 23rd, “What If” on the 29th — before the album had a date. The date came on 2 January 2017, along with the news that the band had left Universal and signed to Starwatch Music.",
      "The North American dates announced for 2018 behind it were later cancelled over technical problems with the band's own equipment.",
    ],
    singles: [
      { title: "Something New", released: "2016-12-23" },
      { title: "What If", released: "2016-12-29" },
      { title: "Boy Don't Cry", released: "2017-10-20" },
      { title: "Easy", released: "2017-12-22" },
    ],
    source: WIKIPEDIA,
  },
  {
    slug: "2001",
    title: "2001",
    number: 7,
    released: "2022-11-18",
    label: "Sony Music Germany / Epic Records Germany",
    language: "English and German",
    tour: "beyond-the-world-2023",
    blurb: "Named for the year the four of them met. Five and a half years after the last one — the longest gap of their career.",
    body: [
      "The title, the cover and the tracklist were revealed in a YouTube Premium livestream on 19 July 2022, and the album followed on 18 November. Five years and eight months after Dream Machine: the longest they have ever left between two studio albums.",
      "It arrived on a third label in three records — Sony Music Germany and Epic Records Germany, signed on 1 September 2020 — and after a run of singles that had kept the band audible through two years in which the tour behind them could not happen.",
    ],
    singles: [
      { title: "Bad Love", released: "2022-02-04" },
      { title: "HIM", released: "2022-04-08" },
      { title: "When We Were Younger", released: "2022-05-27" },
      { title: "Happy People", released: "2022-10-21", note: "with Daði Freyr" },
    ],
    source: WIKIPEDIA,
  },
  {
    slug: "encore",
    title: "Encore",
    number: 8,
    released: "2026-10-16",
    label: "Announced without a label",
    language: "Not announced",
    tour: "arena-tour-2026",
    upcoming: true,
    blurb: "Out twelve days before the tour opens in London. Four singles have been out for ten months.",
    body: [
      "The eighth album has been arriving in public for the better part of a year: “Changes” in November 2025, “California Nights” in February 2026, “Memory Lane” in May, “Without You” in July. The name came out of a mystery-word puzzle the band posted across their accounts on 25 May 2026, and was confirmed by an early Amazon pre-order listing before the band confirmed it themselves.",
      "The cover art was revealed on 18 August 2026 and the full tracklist on the 20th. Release is 16 October 2026 — twelve days before the Arena Tour opens at Wembley, which is close enough that London will be among the first rooms in the world to hear most of it played live.",
    ],
    singles: [
      { title: "Changes", released: "2025-11-14", note: "lead single" },
      { title: "California Nights", released: "2026-02-27" },
      { title: "Memory Lane", released: "2026-05-22" },
      { title: "Without You", released: "2026-07-24" },
    ],
    source: WIKIPEDIA,
  },
];

export const albumBySlug = (slug: string) => albums.find((a) => a.slug === slug);
export const albumForTour = (tour: string) => albums.find((a) => a.tour === tour);
export { checkedOn, DISCOGRAPHY };
