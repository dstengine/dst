// Twenty-five years on one page. Every entry is a dated event from the
// band's own history, in order — no summaries of periods, because a period
// is an opinion and a date is not.
import { checkedOn, WIKIPEDIA } from "./band";

export interface Moment {
  /** A year, a month, or a full date — whatever the source actually pins. */
  when: string;
  /** Sortable. */
  sort: string;
  title: string;
  text: string;
}

export const timeline: Moment[] = [
  { when: "2001", sort: "2001-01-01", title: "Four of them, and a name they lost",
    text: "Bill and Tom Kaulitz had been playing Magdeburg since they were ten. At twelve they met Georg Listing, then fourteen, and Gustav Schäfer, then thirteen, in the audience at one of their own shows; the pair offered to join afterwards. The band was renamed Devilish that year, after a review that called their sound devilishly great." },
  { when: "2003", sort: "2003-01-01", title: "A talent show, and a new name",
    text: "Bill Kaulitz, thirteen, went out of the children's Star Search in the quarter-final and was picked up by producer Peter Hoffmann anyway. Devilish became Tokio Hotel: “Tokio” for the city, spelled the German way, and “Hotel” for where a touring band lives." },
  { when: "2005", sort: "2005-01-01", title: "Dropped, then signed",
    text: "Sony BMG terminated the contract shortly before the first album was due. Universal Music Germany signed them the same year." },
  { when: "20 August 2005", sort: "2005-08-20", title: "“Durch den Monsun” enters at 15",
    text: "Six days later it was number one in Germany, and number one in Austria too." },
  { when: "19 September 2005", sort: "2005-09-19", title: "Schrei",
    text: "The debut album, certified triple gold in Germany the following year for 300,000 copies. Released in five countries only." },
  { when: "23 February 2007", sort: "2007-02-23", title: "Zimmer 483",
    text: "Straight to number one, and over 375,000 copies in two months — still their most reliable seller." },
  { when: "4 June 2007", sort: "2007-06-04", title: "Scream",
    text: "The first English album: the first two records sung again, and the passport out of the German-speaking market." },
  { when: "1 November 2007", sort: "2007-11-01", title: "First MTV Europe Music Award",
    text: "Best InterAct, with a performance of “Monsoon” at the ceremony." },
  { when: "March 2008", sort: "2008-03-14", title: "The voice goes",
    text: "Forty-three shows into the 1000 Hotels World Tour, in Marseille on 14 March, Bill Kaulitz could not finish the set. Lisbon was cancelled two days later; surgery on his vocal cords followed on 30 March." },
  { when: "September 2008", sort: "2008-09-07", title: "Best New Artist at the VMAs",
    text: "The first German band ever to win an MTV Video Music Award." },
  { when: "2 October 2009", sort: "2009-10-02", title: "Humanoid",
    text: "Recorded twice, in German and English, and released worldwide under one title." },
  { when: "22 February 2010", sort: "2010-02-22", title: "Thirty-two cities in eight weeks",
    text: "The Welcome to Humanoid City Tour, the densest routing the band has played. The Milan night became the live album Humanoid City Live." },
  { when: "3 October 2014", sort: "2014-10-03", title: "Kings of Suburbia",
    text: "Four years of near-silence, then an English-only electropop record that went to number one in thirty countries." },
  { when: "6 March 2015", sort: "2015-03-06", title: "Feel It All, in four parts",
    text: "Clubs first, then the United States, then Latin America, then sixteen nights east of Berlin in October and November." },
  { when: "3 March 2017", sort: "2017-03-03", title: "Dream Machine",
    text: "The first album made outside Universal, announced by putting two songs on YouTube over Christmas." },
  { when: "2020", sort: "2020-03-01", title: "Three venues, then nothing",
    text: "The Melancholic Paradise Tour got three shows into its Americas leg before the pandemic closed the rest. New deals with Sony Music Germany and Epic Records Germany followed in September." },
  { when: "18 November 2022", sort: "2022-11-18", title: "2001",
    text: "Named for the year the four of them met, and released five years and eight months after Dream Machine — the longest gap of their career." },
  { when: "25 June 2024", sort: "2024-06-25", title: "Kaulitz & Kaulitz",
    text: "A Netflix film about the twins' early life and the road out of Magdeburg." },
  { when: "4 and 6 December 2024", sort: "2024-12-04", title: "The last American nights",
    text: "New York on the 4th at Palladium Times Square, Mexico City on the 6th at the Velódromo Olímpico Agustín Melgar. Nothing has been announced on either continent since." },
  { when: "19 March 2025", sort: "2025-03-19", title: "The Arena Tour is announced",
    text: "Eighteen months ahead of opening night, alongside a one-off anniversary show." },
  { when: "15 August 2025", sort: "2025-08-15", title: "Twenty years of “Durch den Monsun”",
    text: "One concert, marking twenty years to the month since the single entered the German chart." },
  { when: "16 October 2026", sort: "2026-10-16", title: "Encore",
    text: "The eighth studio album, its name confirmed by an Amazon pre-order listing before the band said it themselves. Out twelve days before the tour opens." },
  { when: "28 October 2026", sort: "2026-10-28", title: "Wembley",
    text: "The Arena Tour opens at OVO Arena Wembley: seventeen nights, ten countries, finishing in Madrid on 23 November." },
];

export const orderedTimeline = [...timeline].sort((a, b) => a.sort.localeCompare(b.sort));
export { checkedOn, WIKIPEDIA };
