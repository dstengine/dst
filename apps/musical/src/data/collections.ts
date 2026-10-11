import type { Collection } from "./types";

// The pages that gather runs across shows. A city page answers "what is on
// here" and a show page answers "where is this playing"; these answer the
// two questions neither of them can — "what is on Broadway" and "what is on
// at Halloween" — and both of those are typed into a search box far more
// often than anything else this site holds.
//
// Membership is written out, run by run. The alternative is a rule, and a
// rule on a Halloween page would eventually decide that a musical about two
// women who shoot their lovers is seasonal. See Collection in ./types.

export const collections: Collection[] = [
  {
    slug: "broadway",
    name: "Broadway",
    city: "new-york",
    eyebrow: "The district, theatre by theatre",
    h1: "Broadway musicals: what is playing, and who sells it",
    title: "Broadway musicals: theatres and tickets",
    description:
      "Broadway musicals running now and opening next: the theatre, the dates, the run time, the age guidance and the official seller for each, read from the seller's own calendar.",
    lede:
      "Twelve musicals in twelve theatres, from 42nd Street to 51st — four already running, four opening between October and December and four announced for the spring of 2027 — with the dates, the theatre and the official seller for each.",
    body: [
      "A Broadway theatre is a category rather than an address. There are forty-one of them, a house needs at least five hundred seats to be one, they cluster in the Theater District around Times Square — and only three of them actually stand on Broadway. The Palace Theatre is one of the three, at 1564 Broadway, and in 2022 it was cut loose from its foundations and lifted thirty feet into the air so that shops could be built underneath it. It reopened in 2024 with the auditorium of 1913 intact, a storey higher than it used to be.",
      "Four of the twelve are already running. Chicago moved into the Ambassador Theatre in January 2003 and Wicked opened at the Gershwin that October; neither has closed since. Maybe Happy Ending opened at the Belasco in November 2024 and won six Tony Awards the following June, Best Musical among them, and The Lost Boys opened at the Palace in April 2026 and won four in its first season.",
      "Four more are this autumn's new musicals. Wanted opens at the James Earl Jones Theatre on 15 October; The Fantasticks begins previews at the Hayes on 22 October, sixty-six years after it first opened and having never played Broadway in any of them; Galileo begins previews at the Shubert on 10 November; and DOLLY: A True Original Musical begins previews at the St. James on 7 December, opening on Dolly Parton's eighty-first birthday.",
      "The last four are already announced for the spring of 2027. Evita, Jamie Lloyd's Palladium production with Rachel Zegler, begins previews at the Winter Garden on 27 February; Purple Rain, the stage musical of Prince's film, at the Majestic on 12 March; Paddington The Musical, transferring from the Savoy with seven Olivier Awards, at the Al Hirschfeld on 30 March; and Roundabout's revival of The Full Monty at the Todd Haimes on 3 April.",
      "Eleven of the twelve have no closing date. That is what an open run means on Broadway — the production sells as far ahead as it has cleared with the theatre, extends when it is still selling, and announces a last performance only when it has one. The dates below are how far ahead each is currently on sale, not how long it has left. The exception is The Full Monty, which Roundabout schedules as a limited season, from 3 April to 20 June 2027.",
    ],
    checkedOn: "13 September 2026",
    runs: [
      { show: "lost-boys", run: "new-york" },
      { show: "wicked", run: "new-york" },
      { show: "chicago", run: "new-york" },
      { show: "maybe-happy-ending", run: "new-york" },
      { show: "wanted", run: "new-york" },
      { show: "fantasticks", run: "new-york" },
      { show: "galileo", run: "new-york" },
      { show: "dolly", run: "new-york" },
      { show: "evita", run: "new-york" },
      { show: "purple-rain", run: "new-york" },
      { show: "paddington", run: "new-york" },
      { show: "full-monty", run: "new-york" },
    ],
    venues: [
      "palace-theatre",
      "gershwin-theatre",
      "ambassador-theatre",
      "james-earl-jones-theatre",
      "hayes-theater",
      "shubert-theatre",
      "st-james-theatre",
      "belasco-theatre",
      "winter-garden-theatre",
      "majestic-theatre",
      "al-hirschfeld-theatre",
      "todd-haimes-theatre",
    ],
    outro: [
      "Every button on this page lands on the seller's own calendar, where the price for a given night is the price. Who that seller is follows the building: Broadway Direct is the Nederlander Organization's own box office and sells the Palace and the Gershwin; Telecharge is the Shubert Organization's and sells the Ambassador, the James Earl Jones, the Shubert, the Belasco, the Winter Garden and the Majestic; ATG Tickets sells the St. James and the Al Hirschfeld, which ATG operates; and two houses belong to non-profits rather than chains and sell their own seats — Second Stage Theater sells The Fantasticks at the Hayes, and Roundabout Theatre Company sells The Full Monty at the Todd Haimes, to its subscribers first. None of them is a resale site, and nothing is sold here.",
      "Sources: each production's own listing and its seller's calendar, read on 13 September 2026 for the first seven musicals and on 12 October 2026 for the five added since, for the dates, the prices, the run times and the age guidance; Wikipedia for the count of Broadway theatres, the five-hundred-seat threshold and the history of the three buildings.",
    ],
  },
  {
    slug: "halloween",
    name: "Halloween",
    eyebrow: "Musicals for the last week of October",
    h1: "Halloween musicals: what is on, and what a seat costs",
    title: "Halloween musicals playing 31 October 2026",
    description:
      "Musicals playing over Halloween 2026 with something of the season in them: vampires on Broadway, a witch at the Gershwin, another in London's woods and a masked man under an opera house — with times and sellers.",
    lede:
      "Four musicals playing on Halloween night itself: vampires at the Palace, a witch at the Gershwin, another witch in the woods at the Noël Coward, and forty years of a masked man under an opera house in the Haymarket.",
    body: [
      "The cheapest seat The Lost Boys sells is on the night the show is about. Broadway Direct lists the Palace Theatre run from $55; most October performances are priced above that, and both Halloween performances are not. Halloween 2026 falls on a Saturday, so the show plays it twice — 2pm and 8pm, each from $55.",
      "Wicked has the better anniversary. It opened at the Gershwin Theatre on 30 October 2003, which makes the last night of this October its twenty-third birthday, and it plays Halloween as a Saturday two-show day as well — a 2pm and an 8pm, four blocks north of the vampires. It is the least frightening thing on this page and the only one with a green witch in it.",
      "In London, The Phantom of the Opera has been the answer to this question since 1986. It plays His Majesty's Theatre, which opened as an opera house in 1705 and has spent the last forty years staging a musical about a man living underneath one, and the chandelier still comes down every night in a room that was built for opera and never expected this.",
      "The West End has a witch of its own this year. Into the Woods, the Olivier-winning revival that began at the Bridge, sends a baker and his wife into a forest full of fairy-tale characters, and the witch who cursed them is played by Kate Fleetwood. It plays the Noël Coward Theatre twice on 31 October, at 2.30pm and 7.30pm, and its second act is about what the woods do to people after the happy ending.",
      "What is not here is as deliberate as what is. Other musicals on this site also play on 31 October 2026 — Les Misérables in London, Chicago and Maybe Happy Ending in New York, Cats at the Birmingham Hippodrome and The Fantasticks, in previews at the Hayes, among them — and none of them has anything to do with the season. Listing them would make this a page about the last week of October rather than a page about Halloween.",
    ],
    checkedOn: "13 September 2026",
    runs: [
      { show: "lost-boys", run: "new-york" },
      { show: "wicked", run: "new-york" },
      { show: "phantom-of-the-opera", run: "london" },
      { show: "into-the-woods", run: "london" },
    ],
    outro: [
      "Every button here lands on the seller's own calendar. The Lost Boys and Wicked are sold by Broadway Direct, the Nederlander Organization's own box office; The Phantom of the Opera by LW Theatres, which owns His Majesty's and sells its dates direct with no booking fee; and Into the Woods by Delfont Mackintosh Theatres, which owns the Noël Coward. None of the four is a resale site, and nothing is sold here.",
    ],
  },
];
