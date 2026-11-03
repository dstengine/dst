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
    // The week is the subject, not the theme: Chicago and Wicked have nothing
    // of Christmas in them, and they are here because they play it. What the
    // London roundups leave out is the time on each day, so the days are the
    // headings and the times were read off each seller's calendar by hand.
    slug: "christmas",
    createdAt: "2026-11-03T20:29:18+04:00",
    updatedAt: "2026-11-03T20:29:18+04:00",
    name: "Christmas week",
    eyebrow: "Christmas Eve to New Year's Day, day by day",
    h1: "Musicals over Christmas 2026: what plays on which day",
    title: "Christmas musical show times in London 2026: Boxing Day, NYE",
    description:
      "Christmas Eve, Boxing Day and New Year's Eve 2026 times for seventeen London and Broadway musicals, day by day, from the official booking calendars.",
    lede:
      "Seventeen of the musicals on this site are running over Christmas week — eight in London, eight on Broadway and Cats in Glasgow — and of the sixteen whose times are listed here, not one keeps its usual week. Here is which of them plays on each day from Christmas Eve to New Year's Day, and at what time.",
    body: [
      "The London and New York shows here take different days off. None of the seven London musicals with times listed here plays on Christmas Day, only one plays on New Year's Day, and none has a 7.30pm show on either eve. On Broadway it is nearly the other way round: three of the eight play on Christmas night, and not one plays on New Year's Eve.",
      "Both cities make up for it either side of the holidays. Every one of the seven London shows adds a matinee between 21 and 23 December, and six of them play on Sunday 27 December, a day they usually have off. On Broadway, The Lost Boys, Maybe Happy Ending, Wanted and The Fantasticks all add a Monday, the night they usually have off.",
      "On Broadway, Wicked costs more over Christmas: on 3 November its cheapest seat that week was $158.50, against $86.75 for a midweek night in January.",
      "Two of the London musicals are near the end of their runs: Into the Woods and Jesus Christ Superstar both close on 9 January 2027. And one is here without its times. Paddington plays the Savoy over Christmas, but the production says its times may vary over the holiday period, and they are not listed on this page: check ATG Tickets' calendar for the day you want.",
    ],
    sections: [
      {
        heading: "Christmas Eve, Thursday 24 December",
        paragraphs: [
          "Three of the seven London musicals play on Christmas Eve, all in the afternoon: Les Misérables at the Sondheim and The Phantom of the Opera at His Majesty's at 1pm, and One Day at the Garrick at 2pm. Into the Woods, Jesus Christ Superstar, Pride and Rent are dark. In Glasgow, Cats plays the Theatre Royal at 1pm, with no evening show.",
          "On Broadway, two play on Christmas Eve: The Lost Boys at the Palace at 1pm and The Fantasticks at the Hayes at 2pm. The other six are dark.",
        ],
      },
      {
        heading: "Christmas Day, Friday 25 December",
        paragraphs: [
          "None of the seven London musicals plays on Christmas Day, and neither does Cats in Glasgow.",
          "Three of the eight Broadway musicals play on Christmas night — Wicked at the Gershwin at 7pm, Wanted at the James Earl Jones at 7.30pm and Chicago at the Ambassador at 8pm — and they are the only ones of the sixteen with times listed here that play on 25 December. The Lost Boys, Maybe Happy Ending, DOLLY, The Fantasticks and Galileo are dark.",
        ],
      },
      {
        heading: "Boxing Day, Saturday 26 December",
        paragraphs: [
          "Four of the seven London musicals play on Boxing Day, each once, at 7.30pm: Into the Woods at the Noël Coward, Jesus Christ Superstar at Drury Lane, One Day at the Garrick and Pride at the Bridge. Les Misérables, The Phantom of the Opera and Rent do not play again until Sunday. Cats is back on stage in Glasgow at 7.30pm.",
          "All eight Broadway musicals play on 26 December, and seven of them twice — a matinee at 2pm and an evening show at 7pm, 7.30pm or 8pm. Chicago plays once, at 8pm, with no matinee that day.",
        ],
      },
      {
        heading: "Sunday 27 December",
        paragraphs: [
          "Six of the seven London musicals play twice on the Sunday after Christmas. Les Misérables, The Phantom of the Opera, Into the Woods, Jesus Christ Superstar and Pride all play at 2.30pm and 7.30pm, and One Day, which usually plays once on Sundays at 3pm, plays at 2pm and 7pm. Rent, which normally has Sundays off, plays once, at 7.30pm.",
          "It is also the last day of Cats in Glasgow: the three-week run at the Theatre Royal ends with a 1pm performance.",
        ],
      },
      {
        heading: "Monday 28 to Wednesday 30 December",
        paragraphs: [
          "Monday 28 December is a bank holiday in the UK, because Boxing Day falls on a Saturday this year. Five of the seven London musicals play that evening at 7.30pm — Les Misérables, The Phantom of the Opera, Into the Woods, Pride and Rent, which adds a 2.30pm matinee as well. Jesus Christ Superstar and One Day are dark.",
          "On Tuesday 29 December all seven play twice, at 2.30pm and 7.30pm. On Wednesday 30 December five of them do; Jesus Christ Superstar and One Day play only at 7.30pm.",
          "Every Broadway musical here plays on Monday 28 December: DOLLY at 8pm and the other seven at 7pm. On Wednesday 30 December, the day before all eight are dark, Wicked, Chicago, Maybe Happy Ending, DOLLY, Galileo and Wanted each play at 2pm, or 1pm in Galileo's case, and again in the evening; The Lost Boys plays once, at 2pm.",
        ],
      },
      {
        heading: "New Year's Eve, Thursday 31 December",
        paragraphs: [
          "All seven London musicals play on New Year's Eve, and all of them early: Les Misérables, The Phantom of the Opera and Rent at 1pm; Into the Woods, Jesus Christ Superstar and Pride at 2.30pm; and One Day twice, at 1pm and 5pm. None of them plays at 7.30pm.",
          "On Broadway, none of the eight plays on 31 December.",
        ],
      },
      {
        heading: "New Year's Day, Friday 1 January",
        paragraphs: [
          "Of the seven London musicals, only Jesus Christ Superstar plays on New Year's Day, at Drury Lane at 7.30pm, eight days before the production closes. Herod changes hands during this run: Layton Williams plays the part until 2 January, and Glenn Close takes it for the final week, from 4 January.",
          "Five of the eight Broadway musicals play that evening: The Lost Boys, DOLLY, The Fantasticks and Galileo at 7pm, and Chicago at 8pm. Wicked, Maybe Happy Ending and Wanted are dark. At Galileo that night the title role is played by Michael Park rather than Raúl Esparza, as it is at 7.30pm on 27 December.",
        ],
      },
    ],
    checkedOn: "3 November 2026",
    runs: [
      { show: "les-miserables", run: "london" },
      { show: "phantom-of-the-opera", run: "london" },
      { show: "into-the-woods", run: "london" },
      { show: "jesus-christ-superstar", run: "london" },
      { show: "one-day", run: "london" },
      { show: "pride", run: "london" },
      { show: "rent", run: "london" },
      { show: "paddington", run: "london" },
      { show: "cats", run: "glasgow" },
      { show: "wicked", run: "new-york" },
      { show: "chicago", run: "new-york" },
      { show: "lost-boys", run: "new-york" },
      { show: "maybe-happy-ending", run: "new-york" },
      { show: "wanted", run: "new-york" },
      { show: "fantasticks", run: "new-york" },
      { show: "galileo", run: "new-york" },
      { show: "dolly", run: "new-york" },
    ],
    outro: [
      "Each card leads to the show's page here, and its booking button goes to the seller's own calendar, where the price shown is the one you pay. In London, Delfont Mackintosh Theatres sells Les Misérables and Into the Woods; LW Theatres sells The Phantom of the Opera and Jesus Christ Superstar; Nimax Theatres sells One Day; the Bridge Theatre sells Pride; and ATG Tickets sells Rent and Paddington, and Cats in Glasgow. On Broadway, Broadway Direct sells Wicked and The Lost Boys; Telecharge sells Chicago, Maybe Happy Ending, Wanted and Galileo; ATG Tickets sells DOLLY; and Second Stage Theater sells The Fantasticks. None of them is a resale site, and nothing is sold here.",
      "All sources were read on 3 November 2026. Times and prices come from each seller's own calendar, except for The Phantom of the Opera and Jesus Christ Superstar, whose times come from the Society of London Theatre's Official London Theatre calendar; that calendar also confirms the times for Les Misérables and Into the Woods. Who plays Herod comes from LW Theatres' cast list, and who plays Galileo from Telecharge's calendar.",
    ],
  },
  {
    slug: "broadway",
    createdAt: "2026-09-13T03:28:04+04:00",
    updatedAt: "2026-10-12T02:08:20+04:00",
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
    createdAt: "2026-09-13T03:28:04+04:00",
    updatedAt: "2026-11-03T20:29:18+04:00",
    name: "Halloween",
    eyebrow: "Musicals for the last week of October",
    h1: "Halloween musicals: what is on, and what a seat costs",
    title: "Halloween musicals in London and New York",
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
