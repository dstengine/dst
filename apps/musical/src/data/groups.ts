import type { RunGroup } from "./types";

// A season sold as one thing. The group gets an overview page of its own,
// but never a level in a URL: /chicago/manchester/ outlives the tour it
// belonged to, /chicago/uk/manchester/ would not.

export const groups: RunGroup[] = [
  {
    slug: "uk",
    name: "UK & Ireland Tour 2027",
    title: "Chicago: the UK & Ireland tour, 2027",
    blurb: "Thirty-three stops from Wimbledon in February to Edinburgh in November.",
    body: [
      "Ten months, thirty-three theatres, one country and a bit. The 2027 tour opens at the New Wimbledon Theatre on 5 February and finishes at the Edinburgh Playhouse on 27 November, and almost every stop in between lasts five or six nights — long enough to sell out twice, short enough that missing it means driving to the next town.",
      "Two stops run to a fortnight: Birmingham Hippodrome and Dublin. Both are city-sized bets on a show that has been running somewhere in the world without a break since 1996.",
    ],
  },
  {
    slug: "international",
    name: "International 2026",
    title: "Chicago in Tokyo, Osaka and Dubai, 2026",
    blurb: "Tokyo and Osaka in the summer, Dubai in December.",
    body: [
      "Three cities, three weeks of playing between them, and nothing else on the international calendar for 2026. Japan takes the show in August and September; Dubai takes it in December, in an arena more than ten times the size of the Broadway house it lives in.",
    ],
  },
];
