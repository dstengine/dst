import type { Section } from "./types";

// The running order of the 1996 revival — the version every production on
// this site's calendar plays. Individual productions move or cut a number
// (Class is the one that goes), which the page says rather than pretending
// the list is fixed. Numbers only: the entr'acte and the dance breaks are
// left out because their names differ between programmes.

export interface Song {
  act: 1 | 2;
  title: string;
  sungBy: string;
  note?: string;
}

export const songs: Song[] = [
  { act: 1, title: "All That Jazz", sungBy: "Velma and the company", note: "The opening. Velma sells the audience a night out while Roxie shoots her lover behind her." },
  { act: 1, title: "Funny Honey", sungBy: "Roxie", note: "Roxie thanks her husband for taking the blame, right up to the moment he stops taking it." },
  { act: 1, title: "Cell Block Tango", sungBy: "Velma and the six merry murderesses", note: "Six explanations, five of them jokes. The Hungarian one is not." },
  { act: 1, title: "When You're Good to Mama", sungBy: "Matron \"Mama\" Morton", note: "The prison's economy, stated as a business proposition." },
  { act: 1, title: "All I Care About", sungBy: "Billy Flynn and the girls", note: "The lawyer insists he only cares about love, surrounded by fans." },
  { act: 1, title: "A Little Bit of Good", sungBy: "Mary Sunshine", note: "The reporter who finds the good in everyone, sung as coloratura." },
  { act: 1, title: "We Both Reached for the Gun", sungBy: "Billy, Roxie, Mary Sunshine and the company", note: "Roxie as a ventriloquist's dummy, Billy answering the press for her." },
  { act: 1, title: "Roxie", sungBy: "Roxie and the boys", note: "What she actually wants: not acquittal, fame." },
  { act: 1, title: "I Can't Do It Alone", sungBy: "Velma", note: "Velma auditions her dead sister's double act for a new partner." },
  { act: 1, title: "My Own Best Friend", sungBy: "Roxie and Velma", note: "The act-one curtain, sung by two women who trust nobody, least of all each other." },
  { act: 2, title: "I Know a Girl", sungBy: "Velma" },
  { act: 2, title: "Me and My Baby", sungBy: "Roxie and the company", note: "Roxie announces a pregnancy the plot needs and biology does not." },
  { act: 2, title: "Mister Cellophane", sungBy: "Amos", note: "The husband's one number, and the only unironic thing in the show." },
  { act: 2, title: "When Velma Takes the Stand", sungBy: "Velma and the boys" },
  { act: 2, title: "Razzle Dazzle", sungBy: "Billy and the company", note: "How a trial is won. The thesis of the whole evening, sung by the lawyer." },
  { act: 2, title: "Class", sungBy: "Velma and Mama Morton", note: "A duet about falling standards. Cut from the 2002 film, and dropped by some stagings." },
  { act: 2, title: "Nowadays", sungBy: "Roxie", note: "The acquittal, and the anticlimax of getting what you wanted." },
  { act: 2, title: "Nowadays / Hot Honey Rag", sungBy: "Roxie and Velma", note: "The double act finally happens, in the Fosse choreography people come back for." },
  { act: 2, title: "Finale", sungBy: "The company" },
];

export const songsSection: Section = {
  slug: "songs",
  label: "The songs",
  title: "Chicago The Musical: every song, in order",
  description:
    "The running order of the 1996 revival — the version now playing everywhere on this site's calendar — with who sings what and why it is there.",
  template: "songs",
  body: [
    "Two of these songs are famous enough to have escaped the show: \"All That Jazz\" opens it, and \"Cell Block Tango\" is the one people quote. The other seventeen are the reason the evening works — a vaudeville bill in which every number is a turn performed at the audience rather than a scene played to another character.",
    "Below is the running order of the 1996 revival, which is what every production on this site's calendar plays. Individual stagings move or drop a number — \"Class\" is the one that goes — so treat this as the shape of the evening rather than a contract.",
  ],
};
