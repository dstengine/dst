import type { Section } from "./types";

/** One dated step. `title` is the headline of the moment, `text` the part
    people repeat afterwards. */
export interface Milestone {
  date: string;
  title: string;
  text: string;
}

// Sources: the Wikipedia articles "Chicago (musical)" and "Chicago (2002
// film)", read on the date in checkedOn. Every number here is in one of
// them; nothing has been rounded up to sound better.
export const milestones: Milestone[] = [
  {
    date: "March–April 1924",
    title: "Two women, two revolvers, one courthouse",
    text: "Belva Gaertner is arrested on 12 March, Beulah Annan on 3 April. Both are accused of shooting a man; both are acquitted. Maurine Dallas Watkins covers the trials for the Chicago Tribune and watches the city fall for the defendants rather than the dead.",
  },
  {
    date: "1926",
    title: "The reporter writes the play",
    text: "Watkins turns her own copy into a stage satire. Roxie Hart and Velma Kelly are Annan and Gaertner with the names changed, and the target is not murder but the machinery that makes a murderer famous.",
  },
  {
    date: "3 June 1975",
    title: "Kander, Ebb and Fosse open on Broadway",
    text: "Music by John Kander, lyrics by Fred Ebb, book by Ebb and Bob Fosse, who directs and choreographs. Gwen Verdon is Roxie, Chita Rivera is Velma, Jerry Orbach is Billy Flynn, Barney Martin is Amos. It runs 936 performances at the 46th Street Theatre and closes on 27 August 1977.",
  },
  {
    date: "August–September 1975",
    title: "Liza Minnelli takes over for a month",
    text: "Verdon needs throat surgery. Minnelli plays Roxie from 8 August to 13 September, unbilled, and the house sells out. A Chorus Line has opened the same season and takes most of the attention anyway.",
  },
  {
    date: "1979",
    title: "London, first attempt",
    text: "The Cambridge Theatre stages it for around 600 performances. It is a success, not yet a fixture.",
  },
  {
    date: "1992",
    title: "Long Beach, and a young director",
    text: "The Long Beach Civic Light Opera revives it, directed by Rob Marshall. Ten years later Marshall will direct the film.",
  },
  {
    date: "May 1996",
    title: "A concert staging at City Center",
    text: "Encores! puts it on with the orchestra on stage, the cast in black, and nothing else. The staging was a budget decision. It became the show.",
  },
  {
    date: "14 November 1996",
    title: "Broadway again — and this time it does not stop",
    text: "The Encores! version transfers to the Richard Rodgers, directed by Walter Bobbie with choreography by Ann Reinking in the style of Bob Fosse. Reinking plays Roxie, Bebe Neuwirth Velma, James Naughton Billy Flynn, Joel Grey Amos.",
  },
  {
    date: "1997",
    title: "Six Tony Awards",
    text: "Best Revival of a Musical, Neuwirth, Naughton, Bobbie, Reinking, and Ken Billington for lighting — more than any revival had won before.",
  },
  {
    date: "18 November 1997",
    title: "London, second attempt: fifteen years",
    text: "The Adelphi opens with Ute Lemper as Velma and Ruthie Henshall as Roxie, Henry Goodman as Billy Flynn and Nigel Planer as Amos. It moves to the Cambridge in April 2006 and finally closes on 1 September 2012.",
  },
  {
    date: "27 December 2002",
    title: "The film wins Best Picture",
    text: "Rob Marshall directs Renée Zellweger, Catherine Zeta-Jones, Richard Gere, Queen Latifah and John C. Reilly. Six Academy Awards, including Best Picture and Best Supporting Actress for Zeta-Jones, and $306.8 million at the box office.",
  },
  {
    date: "29 January 2003",
    title: "The revival moves into the Ambassador",
    text: "After the Richard Rodgers and the Shubert, it settles into the house on West 49th Street where it still plays.",
  },
  {
    date: "23 November 2014",
    title: "It passes Cats",
    text: "Performance number 7,486 makes it the longest-running American musical in Broadway history. Only The Phantom of the Opera has run longer on Broadway, and the count is past eleven thousand.",
  },
];

export const historySection: Section = {
  slug: "history",
  image: "/covers/chicago-history.jpg",
  imageAlt: "Cut-paper illustration: a receding row of layered arched theatre fronts.",
  label: "History",
  title: "Chicago The Musical: a hundred-year history",
  description:
    "Two acquittals in 1924, a reporter's play in 1926, a Fosse musical in 1975, and a concert staging in 1996 that has been running ever since.",
  template: "history",
  body: [
    "Two women shot their lovers in Chicago in the spring of 1924. Both were acquitted, both became famous, and the court reporter who covered them turned the whole circus into a play. A century later, the musical made from that play is the longest-running American musical in Broadway history — and it is still selling tickets in thirty-seven cities.",
    "What follows is the whole chain, dated. The interesting part is not that Chicago succeeded; it is that it failed first, was revived on a shoestring, and won because the shoestring turned out to be the right idea.",
  ],
};
