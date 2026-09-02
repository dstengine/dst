import type { Run } from "./types";

// Every run of every show, flat. A run belongs to a group when it was sold
// as part of a season, and the group is a page — not a URL level, so
// /chicago/manchester/ survives the next tour.
//
// Facts come from chicagothemusical.com: the front page for Broadway, the
// international page for Japan and Dubai, the UK tour page for the rest.
// `summary` is written by hand only where there is something to say that
// the facts of the run do not say by themselves; elsewhere runIntro() in
// ../rules.ts composes an opening out of the dates, the venue and the tour.

export const runs: Run[] = [
  {
    slug: "new-york",
    show: "chicago",
    city: "new-york",
    venue: "ambassador-theatre",
    start: "1996-11-14",
    openRun: true,
    sellers: [
      { slug: "tickets-chicago-new-york", name: "Telecharge", official: true },
    ],
    summary:
      "The revival opened on 14 November 1996 and has not closed since. It moved into the Ambassador in January 2003 and stayed, and no closing date has ever been announced — this is the one run on this site you cannot miss by booking late.",
    tags: ["broadway", "open-run"],
  },
  {
    slug: "dubai",
    show: "chicago",
    city: "dubai",
    group: "international",
    venue: "coca-cola-arena",
    start: "2026-12-16",
    end: "2026-12-20",
    sellers: [
      { slug: "tickets-chicago-dubai-ticketmaster", name: "Ticketmaster AE" },
    ],
    summary:
      "Eight performances over five days in December, in a room that holds seventeen thousand people. Chicago was built for a Broadway house a tenth that size, which is the whole reason to see what it does with an arena. The first two days are matinees only; the last three add an evening.",
    tags: ["arena", "gulf"],
  },
  {
    slug: "tokyo",
    show: "chicago",
    city: "tokyo",
    group: "international",
    venue: "tokyu-theatre-orb",
    start: "2026-08-19",
    end: "2026-08-30",
    sellers: [
      { slug: "tickets-chicago-tokyo", name: "Kyodo Tokyo", official: true },
    ],
    summary:
      "Twelve days eleven floors above Shibuya Station, and then the production moves to Osaka for four. Tokyo is the long half of the Japanese visit by a factor of three.",
    tags: ["japan"],
  },
  {
    slug: "osaka",
    show: "chicago",
    city: "osaka",
    group: "international",
    venue: "orix-theater",
    start: "2026-09-03",
    end: "2026-09-06",
    sellers: [{ slug: "tickets-chicago-osaka", name: "e+", official: true }],
    summary:
      "Four days, and the 2026 Japanese dates are done. Osaka gets the short end of a two-city visit — Tokyo plays twelve.",
    tags: ["japan"],
  },
  {
    slug: "wimbledon",
    show: "chicago",
    city: "wimbledon",
    group: "uk",
    venue: "new-wimbledon-theatre",
    start: "2027-02-05",
    end: "2027-02-13",
    sellers: [{ slug: "tickets-chicago-wimbledon", name: "ATG Tickets" }],
    summary:
      "The tour opens here. Nine days at the New Wimbledon Theatre in February 2027, and then Chicago spends the next ten months crossing Britain and Ireland \u2014 thirty-three stops, of which this is the first.",
    tags: ["tour-opener"],
  },
  {
    slug: "plymouth",
    show: "chicago",
    city: "plymouth",
    group: "uk",
    venue: "theatre-royal-plymouth",
    start: "2027-02-16",
    end: "2027-02-20",
    sellers: [
      { slug: "tickets-chicago-plymouth", name: "Theatre Royal Plymouth" },
    ],
    summary:
      "The tour's second stop, and its first outside London: five nights at the Theatre Royal. Cats played this same 1,320-seat house four months earlier and was given twelve nights to Chicago's five.",
  },
  {
    slug: "cardiff",
    show: "chicago",
    city: "cardiff",
    group: "uk",
    venue: "wales-millennium-centre",
    start: "2027-02-22",
    end: "2027-02-27",
    sellers: [
      { slug: "tickets-chicago-cardiff", name: "Wales Millennium Centre" },
    ],
    summary:
      "Six nights at the Wales Millennium Centre, which opened in November 2004 — one of the few buildings on this tour younger than the theatres it otherwise plays. Cats returns to the same hall for five nights in May.",
  },
  {
    slug: "sheffield",
    show: "chicago",
    city: "sheffield",
    group: "uk",
    venue: "sheffield-lyceum",
    start: "2027-03-02",
    end: "2027-03-06",
    sellers: [],
    summary:
      "Five nights at the Sheffield Lyceum, in the week the tour turns north. The dates are fixed; the box office is not open on them yet.",
  },
  {
    slug: "liverpool",
    show: "chicago",
    city: "liverpool",
    group: "uk",
    venue: "liverpool-empire",
    start: "2027-03-24",
    end: "2027-03-27",
    sellers: [{ slug: "tickets-chicago-liverpool", name: "ATG Tickets" }],
    summary:
      "Four nights, the shortest stop of the British tour and shorter than anything except Osaka. Cats takes the same Liverpool Empire stage for eleven nights six weeks later.",
  },
  {
    slug: "newcastle",
    show: "chicago",
    city: "newcastle",
    group: "uk",
    venue: "newcastle-theatre-royal",
    start: "2027-03-29",
    end: "2027-04-03",
    sellers: [
      { slug: "tickets-chicago-newcastle", name: "Newcastle Theatre Royal" },
    ],
    summary:
      "Six nights at a Theatre Royal that opened in February 1837, the third-oldest building on the tour after Norwich and Brighton. Cats plays here too, in June, and stays twice as long.",
  },
  {
    slug: "bournemouth",
    show: "chicago",
    city: "bournemouth",
    group: "uk",
    venue: "bournemouth-pavilion",
    start: "2027-04-06",
    end: "2027-04-10",
    sellers: [
      { slug: "tickets-chicago-bournemouth", name: "Bournemouth Pavilion" },
    ],
    summary:
      "Five nights at the Pavilion, a 1929 seaside theatre, and then the tour stops entirely: Chicago plays nothing for the month between here and Glasgow.",
  },
  {
    slug: "glasgow",
    show: "chicago",
    city: "glasgow",
    group: "uk",
    venue: "kings-theatre-glasgow",
    start: "2027-05-10",
    end: "2027-05-15",
    sellers: [{ slug: "tickets-chicago-glasgow", name: "ATG Tickets" }],
    summary:
      "The tour's longest break ends here. Chicago plays nothing between Bournemouth on 10 April and this opening night a month later, then runs almost without a gap to Edinburgh in November.",
  },
  {
    slug: "aberdeen",
    show: "chicago",
    city: "aberdeen",
    group: "uk",
    venue: "his-majestys-theatre-aberdeen",
    start: "2027-05-18",
    end: "2027-05-22",
    sellers: [
      { slug: "tickets-chicago-aberdeen", name: "Aberdeen Performing Arts" },
    ],
    summary:
      "Six nights at His Majesty's Theatre, open since December 1906 and the northernmost point of the tour. Cats played the same stage in February, three months before.",
  },
  {
    slug: "manchester",
    show: "chicago",
    city: "manchester",
    group: "uk",
    venue: "opera-house-manchester",
    start: "2027-05-25",
    end: "2027-05-29",
    sellers: [{ slug: "tickets-chicago-manchester", name: "ATG Tickets" }],
    summary:
      "Five nights at the Opera House — not the Palace, where Cats played, and one of only three cities where the two shows use different stages. The Opera House holds 1,920, the Palace slightly more.",
  },
  {
    slug: "york",
    show: "chicago",
    city: "york",
    group: "uk",
    venue: "grand-opera-house-york",
    start: "2027-05-31",
    end: "2027-06-05",
    sellers: [{ slug: "tickets-chicago-york", name: "ATG Tickets" }],
    summary:
      "Six nights at the Grand Opera House, which opened in January 1902. York is one of twelve British cities Chicago plays that Cats does not.",
  },
  {
    slug: "blackpool",
    show: "chicago",
    city: "blackpool",
    group: "uk",
    venue: "blackpool-opera-house",
    // The Winter Gardens box office lists the first night as Tuesday the 8th,
    // not the Monday the tour listing implied.
    start: "2027-06-08",
    end: "2027-06-12",
    sellers: [
      { slug: "tickets-chicago-blackpool", name: "Winter Gardens Blackpool" },
    ],
    summary:
      "Six nights in the Opera House, which seats 2,812: after Edinburgh, the largest room the British tour plays, and nearly four times the Cheltenham house at the other end of it.",
  },
  {
    slug: "nottingham",
    show: "chicago",
    city: "nottingham",
    group: "uk",
    venue: "nottingham-royal-concert-hall",
    start: "2027-06-14",
    end: "2027-06-19",
    sellers: [
      {
        slug: "tickets-chicago-nottingham",
        name: "Royal Concert Hall Nottingham",
      },
    ],
    summary:
      "Six nights in the Royal Concert Hall — a 2,499-seat concert room rather than a theatre, and the third-largest space on the British tour. Cats played eleven nights here in January.",
  },
  {
    slug: "bradford",
    show: "chicago",
    city: "bradford",
    group: "uk",
    venue: "alhambra-theatre-bradford",
    start: "2027-06-21",
    end: "2027-06-26",
    sellers: [{ slug: "tickets-chicago-bradford", name: "Bradford Theatres" }],
    summary:
      "Six nights at the Alhambra, a 1914 house of 1,456 seats. Cats had five nights on the same stage seven weeks earlier.",
  },
  {
    slug: "dublin",
    show: "chicago",
    city: "dublin",
    group: "uk",
    start: "2027-06-29",
    end: "2027-07-10",
    sellers: [],
    summary:
      "Twelve days in Dublin, and the only stop whose theatre has not been named. The dates come from the tour's own listing; the venue is not on it, so it is not named here either.",
    tags: ["long-stop", "ireland"],
  },
  {
    slug: "southend",
    show: "chicago",
    city: "southend",
    group: "uk",
    venue: "cliffs-pavilion-southend",
    start: "2027-07-13",
    end: "2027-07-17",
    sellers: [{ slug: "tickets-chicago-southend", name: "Trafalgar Tickets" }],
    summary:
      "Five nights at the Cliffs Pavilion, which opened in July 1964 — one of the few post-war buildings on a tour otherwise made of Victorian and Edwardian theatres.",
  },
  {
    slug: "eastbourne",
    show: "chicago",
    city: "eastbourne",
    group: "uk",
    venue: "congress-theatre-eastbourne",
    start: "2027-07-19",
    end: "2027-07-24",
    sellers: [
      { slug: "tickets-chicago-eastbourne", name: "Trafalgar Tickets" },
    ],
    summary:
      "Six nights at the Congress Theatre, opened in June 1963, the second of two consecutive seaside stops on the south coast.",
  },
  {
    slug: "birmingham",
    show: "chicago",
    city: "birmingham",
    group: "uk",
    venue: "birmingham-hippodrome",
    start: "2027-07-27",
    end: "2027-08-07",
    sellers: [
      { slug: "tickets-chicago-birmingham", name: "Birmingham Hippodrome" },
    ],
    summary:
      "Twelve days at the Hippodrome \u2014 the longest stop of the tour, matched only by Dublin. Everywhere else gets five or six.",
    tags: ["long-stop"],
  },
  {
    slug: "norwich",
    show: "chicago",
    city: "norwich",
    group: "uk",
    venue: "norwich-theatre-royal",
    start: "2027-08-09",
    end: "2027-08-14",
    sellers: [{ slug: "tickets-chicago-norwich", name: "Norwich Theatre" }],
    summary:
      "Six nights in a theatre working since 1758 — older than every other building on the tour by more than forty years. Cats had twelve nights on the same stage in February.",
  },
  {
    slug: "brighton",
    show: "chicago",
    city: "brighton",
    group: "uk",
    venue: "theatre-royal-brighton",
    start: "2027-08-16",
    end: "2027-08-21",
    sellers: [{ slug: "tickets-chicago-brighton", name: "ATG Tickets" }],
    summary:
      "Six nights in a theatre that opened in June 1807: the second-oldest building on the tour and, at 952 seats, the second-smallest. Only Norwich is older and only Cheltenham is tighter.",
  },
  {
    slug: "belfast",
    show: "chicago",
    city: "belfast",
    group: "uk",
    venue: "grand-opera-house-belfast",
    start: "2027-08-23",
    end: "2027-08-28",
    sellers: [
      { slug: "tickets-chicago-belfast", name: "Grand Opera House Belfast" },
    ],
    summary:
      "Six nights at the Grand Opera House, open since December 1895 and, at 1,058 seats, one of the smallest rooms on the tour. Cats played twelve nights here in March.",
  },
  {
    slug: "bristol",
    show: "chicago",
    city: "bristol",
    group: "uk",
    venue: "bristol-hippodrome",
    start: "2027-08-31",
    end: "2027-09-04",
    sellers: [{ slug: "tickets-chicago-bristol", name: "ATG Tickets" }],
    summary:
      "Five nights at the Hippodrome, a 1,951-seat house opened in December 1912. Cats had the same stage for five nights nine months earlier.",
  },
  {
    slug: "milton-keynes",
    show: "chicago",
    city: "milton-keynes",
    group: "uk",
    venue: "milton-keynes-theatre",
    start: "2027-09-06",
    end: "2027-09-11",
    sellers: [{ slug: "tickets-chicago-milton-keynes", name: "ATG Tickets" }],
    summary:
      "Six nights at Milton Keynes Theatre, which opened in October 1999 and is among the newest buildings on the tour. Cats played the same house in June.",
  },
  {
    slug: "truro",
    show: "chicago",
    city: "truro",
    group: "uk",
    venue: "hall-for-cornwall",
    start: "2027-09-13",
    end: "2027-09-18",
    sellers: [{ slug: "tickets-chicago-truro", name: "Hall for Cornwall" }],
    summary:
      "Six nights at Hall for Cornwall, the westernmost stop of the tour and the only one in Cornwall. Nothing else on the itinerary comes within a hundred miles of it.",
  },
  {
    slug: "oxford",
    show: "chicago",
    city: "oxford",
    group: "uk",
    venue: "new-theatre-oxford",
    start: "2027-09-20",
    end: "2027-09-25",
    sellers: [{ slug: "tickets-chicago-oxford", name: "ATG Tickets" }],
    summary:
      "Six nights at the New Theatre, open since February 1934. Cats played five nights on the same stage in March, six months before Chicago arrives.",
  },
  {
    slug: "hull",
    show: "chicago",
    city: "hull",
    group: "uk",
    venue: "hull-new-theatre",
    start: "2027-09-27",
    end: "2027-10-02",
    sellers: [{ slug: "tickets-chicago-hull", name: "Hull Theatres" }],
    summary:
      "Six nights at the Hull New Theatre, a 1939 house of 1,351 seats. Cats opened its own visit here almost a year earlier, for five.",
  },
  {
    slug: "llandudno",
    show: "chicago",
    city: "llandudno",
    group: "uk",
    venue: "venue-cymru",
    start: "2027-10-04",
    end: "2027-10-09",
    sellers: [],
    infoSlug: "info-llandudno",
    summary:
      "Six nights at Venue Cymru, listed with an information page rather than a sale. The theatre is taking enquiries; tickets are not on general sale.",
  },
  {
    slug: "sunderland",
    show: "chicago",
    city: "sunderland",
    group: "uk",
    venue: "sunderland-empire",
    start: "2027-10-11",
    end: "2027-10-16",
    sellers: [{ slug: "tickets-chicago-sunderland", name: "ATG Tickets" }],
    summary:
      "Six nights at the Empire, 1,860 seats and open since July 1907. Cats played the same theatre in January, and five stops remain after this one.",
  },
  {
    slug: "dartford",
    show: "chicago",
    city: "dartford",
    group: "uk",
    venue: "orchard-theatre-dartford",
    start: "2027-10-25",
    end: "2027-10-30",
    sellers: [],
    summary:
      "Six nights at the Orchard Theatre in October 2027 — a Dartford stop between two much larger ones, and the last of the tour's three dateless box offices.",
  },
  {
    slug: "woking",
    show: "chicago",
    city: "woking",
    group: "uk",
    venue: "woking-theatre",
    start: "2027-11-01",
    end: "2027-11-06",
    sellers: [{ slug: "tickets-chicago-woking", name: "ATG Tickets" }],
    summary:
      "Six nights at the New Victoria, a 1992 building and one of the newest on the tour. Three stops remain after Woking before Chicago finishes in Edinburgh.",
  },
  {
    slug: "cheltenham",
    show: "chicago",
    city: "cheltenham",
    group: "uk",
    venue: "everyman-theatre-cheltenham",
    start: "2027-11-08",
    end: "2027-11-13",
    sellers: [
      {
        slug: "tickets-chicago-cheltenham",
        name: "Everyman Theatre Cheltenham",
      },
    ],
    summary:
      "Six nights in a 718-seat house, ten days before the tour ends in an Edinburgh theatre four times the size. Chicago is not a small show, and Cheltenham is the test of that.",
  },
  {
    slug: "stoke",
    show: "chicago",
    city: "stoke",
    group: "uk",
    venue: "regent-theatre-stoke",
    start: "2027-11-15",
    end: "2027-11-20",
    sellers: [{ slug: "tickets-chicago-stoke", name: "ATG Tickets" }],
    summary:
      "Six nights at the Regent, a 1929 house of 1,600 seats, and the last stop before the tour ends in Edinburgh the following week.",
  },
  {
    slug: "edinburgh",
    show: "chicago",
    city: "edinburgh",
    group: "uk",
    venue: "edinburgh-playhouse",
    start: "2027-11-23",
    end: "2027-11-27",
    sellers: [{ slug: "tickets-chicago-edinburgh", name: "ATG Tickets" }],
    summary:
      "The last stop. Five nights at the Playhouse in late November 2027, and a tour that started in Wimbledon in February is over.",
    tags: ["tour-finale"],
  },
  // Cats, UK & Ireland tour 2026–27. Twenty-three stops from Plymouth in
  // October to Newcastle the following June, all of them on sale through the
  // theatre or through ATG — the tour site links one seller per stop and no
  // stop is left without one.
  {
    slug: "plymouth",
    show: "cats",
    city: "plymouth",
    group: "uk",
    venue: "theatre-royal-plymouth",
    start: "2026-10-06",
    end: "2026-10-17",
    sellers: [
      {
        slug: "tickets-cats-plymouth",
        name: "Theatre Royal Plymouth",
        official: true,
      },
    ],
    summary:
      "Twelve nights, where most cities on this tour get five. The Theatre Royal is also where Chicago plays the following February — the same 1,320 seats, four months later, a different show.",
  },
  {
    slug: "hull",
    show: "cats",
    city: "hull",
    group: "uk",
    venue: "hull-new-theatre",
    start: "2026-10-20",
    end: "2026-10-24",
    sellers: [
      { slug: "tickets-cats-hull", name: "Hull Theatres", official: true },
    ],
    summary:
      "Five nights at the Hull New Theatre, and then the tour moves inland. Chicago reaches the same 1,351-seat house almost a year later, and stays a night longer.",
  },
  {
    slug: "birmingham",
    show: "cats",
    city: "birmingham",
    group: "uk",
    venue: "birmingham-hippodrome",
    start: "2026-10-27",
    end: "2026-11-07",
    sellers: [
      {
        slug: "tickets-cats-birmingham",
        name: "Birmingham Hippodrome",
        official: true,
      },
    ],
    summary:
      "Twelve nights at the Hippodrome, more than double what most stops on this tour are given. Chicago arrives at the same address in July 2027 and stays exactly as long.",
  },
  {
    slug: "manchester",
    show: "cats",
    city: "manchester",
    group: "uk",
    venue: "palace-theatre-manchester",
    start: "2026-11-10",
    end: "2026-11-21",
    sellers: [
      { slug: "tickets-cats-manchester", name: "ATG Tickets", official: true },
    ],
    summary:
      "Manchester is one of three cities where the two shows do not share a stage: Cats is at the Palace, Chicago at the Opera House up the road. Twelve nights, in the larger of the two.",
  },
  {
    slug: "bristol",
    show: "cats",
    city: "bristol",
    group: "uk",
    venue: "bristol-hippodrome",
    start: "2026-11-24",
    end: "2026-11-28",
    sellers: [
      { slug: "tickets-cats-bristol", name: "ATG Tickets", official: true },
    ],
    summary:
      "Five nights at the Hippodrome, a 1912 house that seats 1,951 — near the top end of what this tour plays. Chicago follows into the same auditorium in the summer of 2027.",
  },
  {
    slug: "llandudno",
    show: "cats",
    city: "llandudno",
    group: "uk",
    venue: "venue-cymru",
    start: "2026-12-01",
    end: "2026-12-05",
    sellers: [
      { slug: "tickets-cats-llandudno", name: "Venue Cymru", official: true },
    ],
    summary:
      "Five nights at Venue Cymru, the tour's only Welsh coastal stop, and the last dates before Cats settles into Glasgow for the whole of December.",
  },
  {
    slug: "glasgow",
    show: "cats",
    city: "glasgow",
    group: "uk",
    venue: "theatre-royal-glasgow",
    start: "2026-12-08",
    end: "2026-12-27",
    sellers: [
      { slug: "tickets-cats-glasgow", name: "ATG Tickets", official: true },
    ],
    summary:
      "Twenty nights, from 8 to 27 December — the longest single stay of any run listed on this site, and the only one that plays through Christmas. Chicago comes to Glasgow too, but to the King's, not the Theatre Royal.",
  },
  {
    slug: "nottingham",
    show: "cats",
    city: "nottingham",
    group: "uk",
    venue: "nottingham-royal-concert-hall",
    start: "2027-01-06",
    end: "2027-01-16",
    sellers: [
      {
        slug: "tickets-cats-nottingham",
        name: "Royal Concert Hall",
        official: true,
      },
    ],
    summary:
      "Eleven nights in a 2,499-seat concert hall rather than a theatre: after Edinburgh, the largest room Cats plays on this tour. Chicago takes the same hall for six nights in June 2027.",
  },
  {
    slug: "canterbury",
    show: "cats",
    city: "canterbury",
    group: "uk",
    venue: "marlowe-theatre-canterbury",
    start: "2027-01-19",
    end: "2027-01-23",
    sellers: [
      {
        slug: "tickets-cats-canterbury",
        name: "Marlowe Theatre",
        official: true,
      },
    ],
    summary:
      "One of only two cities on the Cats tour that Chicago does not visit. The Marlowe opened in October 2011, which makes it the newest theatre on either British tour.",
  },
  {
    slug: "sunderland",
    show: "cats",
    city: "sunderland",
    group: "uk",
    venue: "sunderland-empire",
    start: "2027-01-26",
    end: "2027-01-30",
    sellers: [
      { slug: "tickets-cats-sunderland", name: "ATG Tickets", official: true },
    ],
    summary:
      "Five nights at the Empire, open since 1907 and, at 1,860 seats, the largest theatre in the north-east that either tour plays. Chicago follows in October 2027.",
  },
  {
    slug: "aberdeen",
    show: "cats",
    city: "aberdeen",
    group: "uk",
    venue: "his-majestys-theatre-aberdeen",
    start: "2027-02-09",
    end: "2027-02-13",
    sellers: [
      {
        slug: "tickets-cats-aberdeen",
        name: "Aberdeen Performing Arts",
        official: true,
      },
    ],
    summary:
      "Five nights at His Majesty's, the furthest north Cats travels. Chicago reaches the same stage three months later, in May 2027.",
  },
  {
    slug: "norwich",
    show: "cats",
    city: "norwich",
    group: "uk",
    venue: "norwich-theatre-royal",
    start: "2027-02-16",
    end: "2027-02-27",
    sellers: [
      { slug: "tickets-cats-norwich", name: "Norwich Theatre", official: true },
    ],
    summary:
      "Twelve nights in a theatre that has been working since 1758 — by well over a century, the oldest house on either tour. Chicago gets six nights here in August 2027.",
  },
  {
    slug: "belfast",
    show: "cats",
    city: "belfast",
    group: "uk",
    venue: "grand-opera-house-belfast",
    start: "2027-03-02",
    end: "2027-03-13",
    sellers: [
      {
        slug: "tickets-cats-belfast",
        name: "Grand Opera House",
        official: true,
      },
    ],
    summary:
      "Twelve nights in the smallest house on the Cats tour. The Grand Opera House holds 1,058 — a third of the Edinburgh Playhouse — and still gets one of the longest stays.",
  },
  {
    slug: "dublin",
    show: "cats",
    city: "dublin",
    group: "uk",
    venue: "bord-gais-energy-theatre",
    start: "2027-03-16",
    end: "2027-03-20",
    sellers: [
      {
        slug: "tickets-cats-dublin",
        name: "Bord Gáis Energy Theatre",
        official: true,
      },
    ],
    summary:
      "Five nights at the Bord Gáis, a 2,111-seat house opened in 2010. Chicago also plays Dublin in 2027, for twelve nights, at a theatre its tour has not yet named.",
  },
  {
    slug: "oxford",
    show: "cats",
    city: "oxford",
    group: "uk",
    venue: "new-theatre-oxford",
    start: "2027-03-23",
    end: "2027-03-27",
    sellers: [
      { slug: "tickets-cats-oxford", name: "ATG Tickets", official: true },
    ],
    summary:
      "Five nights at the New Theatre, in the middle of the tour's tightest stretch — Belfast, Dublin and Oxford inside four weeks, in three countries.",
  },
  {
    slug: "southampton",
    show: "cats",
    city: "southampton",
    group: "uk",
    venue: "mayflower-theatre-southampton",
    start: "2027-03-30",
    end: "2027-04-10",
    sellers: [
      {
        slug: "tickets-cats-southampton",
        name: "Mayflower Theatre",
        official: true,
      },
    ],
    summary:
      "Twelve nights at the Mayflower, and the second of the two cities Cats visits that Chicago does not. At 2,300 seats it is among the largest rooms on the tour.",
  },
  {
    slug: "edinburgh",
    show: "cats",
    city: "edinburgh",
    group: "uk",
    venue: "edinburgh-playhouse",
    start: "2027-04-20",
    end: "2027-04-24",
    sellers: [
      { slug: "tickets-cats-edinburgh", name: "ATG Tickets", official: true },
    ],
    summary:
      "Five nights in the Playhouse, which holds 3,059 — the largest theatre on either British tour, and nearly three times the Belfast house Cats had filled in March.",
  },
  {
    slug: "bradford",
    show: "cats",
    city: "bradford",
    group: "uk",
    venue: "alhambra-theatre-bradford",
    start: "2027-04-27",
    end: "2027-05-01",
    sellers: [
      {
        slug: "tickets-cats-bradford",
        name: "Bradford Theatres",
        official: true,
      },
    ],
    summary:
      "Five nights at the Alhambra, open since March 1914. Chicago follows into the same theatre in June 2027, six nights to Cats's five.",
  },
  {
    slug: "liverpool",
    show: "cats",
    city: "liverpool",
    group: "uk",
    venue: "liverpool-empire",
    start: "2027-05-05",
    end: "2027-05-15",
    sellers: [
      { slug: "tickets-cats-liverpool", name: "ATG Tickets", official: true },
    ],
    summary:
      "Eleven nights at the Empire, six weeks after Chicago passed through the same house in four. Same 2,348 seats, nearly three times the stay.",
  },
  {
    slug: "woking",
    show: "cats",
    city: "woking",
    group: "uk",
    venue: "woking-theatre",
    start: "2027-05-18",
    end: "2027-05-22",
    sellers: [
      { slug: "tickets-cats-woking", name: "ATG Tickets", official: true },
    ],
    summary:
      "Five nights at the New Victoria, a purpose-built theatre from 1992 rather than one of the Victorian houses this tour mostly plays. Chicago arrives here in November 2027, near the end of its own tour.",
  },
  {
    slug: "cardiff",
    show: "cats",
    city: "cardiff",
    group: "uk",
    venue: "wales-millennium-centre",
    start: "2027-05-25",
    end: "2027-05-29",
    sellers: [
      {
        slug: "tickets-cats-cardiff",
        name: "Wales Millennium Centre",
        official: true,
      },
    ],
    summary:
      "Five nights at the Wales Millennium Centre, three months after Chicago played the same hall. The building opened in November 2004, which makes it one of the youngest on either tour.",
  },
  {
    slug: "milton-keynes",
    show: "cats",
    city: "milton-keynes",
    group: "uk",
    venue: "milton-keynes-theatre",
    start: "2027-06-01",
    end: "2027-06-05",
    sellers: [
      {
        slug: "tickets-cats-milton-keynes",
        name: "ATG Tickets",
        official: true,
      },
    ],
    summary:
      "Five nights at a theatre that opened in October 1999 — a purpose-built house, unlike most of the Victorian and Edwardian stages on this tour. Chicago follows in September 2027.",
  },
  {
    slug: "newcastle",
    show: "cats",
    city: "newcastle",
    group: "uk",
    venue: "newcastle-theatre-royal",
    start: "2027-06-08",
    end: "2027-06-19",
    sellers: [
      {
        slug: "tickets-cats-newcastle",
        name: "Theatre Royal Newcastle",
        official: true,
      },
    ],
    summary:
      "Twelve nights in a Theatre Royal open since February 1837. Chicago had six nights on the same stage in the spring; Cats gets double.",
  },
];
