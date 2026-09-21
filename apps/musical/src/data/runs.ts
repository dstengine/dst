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
    slug: "london",
    show: "les-miserables",
    city: "london",
    venue: "sondheim-theatre",
    start: "1985-10-08",
    openRun: true,
    sellers: [
      {
        slug: "tickets-les-miserables-london",
        name: "Delfont Mackintosh Theatres",
        official: true,
        price: {
          from: 25,
          currency: "GBP",
          checkedOn: "2026-09-22",
          note: "the standard bottom of the range; individual performances price separately",
        },
      },
    ],
    summary:
      "The run opened at the Barbican on 8 October 1985, moved to the Palace Theatre that December, moved again to this theatre in 2004, and has never closed. Tickets are on sale to 2 October 2027 and the date moves forward as it approaches — there is no announced ending to book ahead of.",
    runningTime: "2 hours 50 minutes, including a 15-minute interval",
    language: "English",
    ageGuidance:
      "Recommended 7+. Nobody under 3 is admitted, everyone needs their own ticket, and under-16s must sit next to a ticketholder aged 18 or over.",
    bodyHeading: "The production, the theatre and the run",
    body: [
      "This is the third theatre and the second production. Les Mis\u00e9rables opened at the Barbican in October 1985 to reviews that would have closed most shows, moved to the Palace Theatre that December, and moved again in 2004 to the house on Shaftesbury Avenue that has since been renamed for Stephen Sondheim. It has not had a break in any of those moves.",
      "The staging changed in 2019. The original Trevor Nunn and John Caird production, with the revolve that made the barricade turn, was replaced by the staging built for the show\u2019s twenty-fifth anniversary tour \u2014 no revolve, projections drawn from Victor Hugo\u2019s own paintings, a different set of stage pictures for the same score. A reader who last saw it in the nineties has not seen this one.",
      "The Sondheim seats 1,074, which is small for a show of this scale and part of why the sound in it works the way it does. It is a Delfont Mackintosh house, and Cameron Mackintosh produces the show, so the theatre and the production are the same company \u2014 which is why the tickets are sold direct with no booking fee.",
    ],
    faq: [
      {
        q: "What are the performance times?",
        a: "Evenings at 7.30pm Monday to Saturday, with matinees at 2.30pm on Thursday and Saturday. There are no Sunday performances.",
      },
      {
        q: "How far ahead can I book?",
        a: "To 2 October 2027, as the production's own ticket page had it on 22 September 2026, having said March a fortnight earlier. The show is open-ended, so that horizon is extended rather than reached.",
      },
      {
        q: "Is there anything in it I should know about first?",
        a: "The production uses gunfire, smoke and flashing light effects, and latecomers may not be let in until a suitable break.",
      },
    ],
    tags: ["west-end", "open-run"],
  },
  {
    slug: "london",
    show: "phantom-of-the-opera",
    city: "london",
    venue: "his-majestys-theatre",
    start: "1986-10-09",
    openRun: true,
    sellers: [
      {
        slug: "tickets-phantom-london",
        name: "LW Theatres",
        official: true,
        price: {
          from: 25,
          currency: "GBP",
          checkedOn: "2026-09-22",
          note: "no booking fee booking direct, and every price already includes a \u00a31.70 restoration levy",
          tiers: [
            { name: "Day seats", from: 37.5, note: "released online at 10am for that day's performances" },
            { name: "Luxury Experience", from: 72.5, note: "per person" },
            { name: "Chandelier Experience", from: 135, note: "per person" },
          ],
        },
      },
    ],
    summary:
      "Previews began on 27 September 1986 and the production opened on 9 October, in the theatre it has never left. It is now in its fortieth year at His Majesty's and is the second-longest-running show in West End history. Tickets are on sale to March 2027, with the horizon pushed forward rather than closed.",
    runningTime: "2 hours 30 minutes, including a 20-minute interval",
    language: "English",
    ageGuidance:
      "No children under 4 are admitted, and every child needs their own seat and must be able to sit in it unaided. Under-16s must be accompanied by an adult.",
    bodyHeading: "The production, the theatre and the run",
    body: [
      "His Majesty\u2019s Theatre was built for opera in 1705 and rebuilt three times since; the building on the Haymarket today went up in 1897. For the last forty years it has housed a musical about a man who lives underneath an opera house, which is a coincidence the production has never had to explain.",
      "The staging is the original one. Hal Prince directed it in 1986, Maria Bj\u00f6rnson designed the sets and the costumes, and what plays now is that production rather than a revival of it \u2014 the same chandelier, on the same rig, in the same room. A West End auditorium of this age is small by modern standards, 1,216 seats across four levels, and the sightlines were drawn for a house where the boxes mattered; where you sit changes the evening here more than it does in a purpose-built theatre.",
      "It opened on 9 October 1986 after previews from 27 September, and has never moved. That makes it the second-longest-running show in West End history behind Les Mis\u00e9rables, and it is now in its fortieth year. Nothing about the run is provisional: the booking horizon is pushed forward as it is reached rather than closed.",
      "What that means for a reader deciding between a Saturday matinee and a Tuesday evening is mostly about the room rather than the cast. There are no Sunday performances at all; the day seats are online only and go at 10am for that same day; and the interval is twenty minutes rather than the fifteen most of the street runs, which is worth knowing if you have booked anything afterwards.",
    ],
    faq: [
      {
        q: "What are the performance times?",
        a: "Evenings at 7.30pm Monday to Saturday, with matinees at 2.30pm on Wednesday and Saturday. There are no Sunday performances.",
      },
      {
        q: "Are there cheaper seats on the day?",
        a: "A limited number of day seats from £37.50 are released online at 10am for that day's performances, and are sold online only.",
      },
      {
        q: "Is there anything in it I should know about first?",
        a: "The production uses loud sounds, gunshots, flashing lights, haze, fire and pyrotechnics, and depicts violence and death at certain points.",
      },
    ],
    tags: ["west-end", "open-run"],
  },
  {
    slug: "new-york",
    show: "chicago",
    city: "new-york",
    venue: "ambassador-theatre",
    start: "1996-11-14",
    openRun: true,
    sellers: [
      {
        slug: "tickets-chicago-new-york",
        name: "Telecharge",
        official: true,
        price: {
          from: 74.5,
          to: 499,
          currency: "USD",
          checkedOn: "2026-09-08",
          note: "the range Telecharge's own price filter spans across all performances",
          tiers: [
            {
              name: "VIP",
              note: "eighth-row seating with a cast meet-and-greet and photograph, 3 August to 22 November 2026",
            },
          ],
        },
      },
    ],
    summary:
      "The revival's first preview was on 23 October 1996 and it opened on 14 November. It has not closed since. It moved into the Ambassador in January 2003 and stayed, and no closing date has ever been announced — this is the one run on this site you cannot miss by booking late. Seats are on sale through 28 March 2027, a horizon that keeps moving.",
    runningTime: "2 hours 30 minutes, including a 15-minute intermission",
    language: "English",
    ageGuidance:
      "Recommended for ages 13 and up. No children under 4 are admitted.",
    bodyHeading: "The production, the theatre and the run",
    body: [
      "The version playing is the cheap one, and that is the point. The 1996 revival began as an Encores! concert staging at City Center with no set, no costumes to speak of and the band on stage because there was nowhere else to put them. Everything that reads as a design decision now \u2014 the black, the chairs, the orchestra in full view \u2014 started as a constraint of a four-performance concert.",
      "It has been at the Ambassador Theatre since 29 January 2003, having opened at the Richard Rodgers in November 1996 and spent six years at the Shubert in between. The Ambassador holds 1,125 seats, which is at the smaller end for a Broadway musical house and closer to the scale the concert version was built for than either of the theatres it came from.",
      "On 23 November 2014 it passed Cats at its 7,486th performance and became the longest-running American musical in Broadway history. Only The Phantom of the Opera has run longer on Broadway at all.",
    ],
    faq: [
      {
        q: "What are the performance times?",
        a: "Evenings at 7pm on Monday, Tuesday and Thursday and at 8pm on Friday and Saturday, with matinees at 2.30pm on Saturday and 2pm on Sunday, which also plays at 7pm. The theatre is dark on Wednesdays.",
      },
      {
        q: "How far ahead can I book?",
        a: "Through 28 March 2027, as Telecharge had it on 8 September 2026. The run is open-ended, so that date is extended rather than reached.",
      },
      {
        q: "Is there anything in it I should know about first?",
        a: "There is smoking on stage, and no children under 4 are admitted.",
      },
    ],
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
      {
        slug: "tickets-chicago-dubai-arena",
        name: "Coca-Cola Arena",
        official: true,
        covers: "the venue's own box office, with payment by instalments through Tabby",
      },
      { slug: "tickets-chicago-dubai-ticketmaster", name: "Ticketmaster AE" },
    ],
    summary:
      "The first Broadway theatrical production ever staged at Coca-Cola Arena, brought in by Marquee Global Events: eight performances over five days in December, in a room that holds seventeen thousand people. Chicago was built for a Broadway house a tenth that size, which is the whole reason to see what it does with an arena. The first two days are matinees only; the last three add an evening.",
    ageGuidance:
      "12+ only. Everyone over 12 needs their own ticket, and anyone under 16 must be with a parent or an adult aged 18 or over. Government-issued photo ID may be asked for at the door.",
    faq: [
      {
        q: "What are the performance times?",
        a: "3pm on Wednesday 16 and Thursday 17 December, then 3pm and 8pm on the 18th, 19th and 20th — eight performances in all.",
      },
      {
        q: "Who is actually selling this?",
        a: "Two sellers at once: the arena's own box office, which also takes payment in instalments through Tabby, and Ticketmaster AE. Tickets went on sale on 19 June 2026.",
      },
      {
        q: "When do the tickets arrive?",
        a: "The arena sends e-tickets five days before the performance, not at the moment of booking.",
      },
    ],
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
      "Twelve days eleven floors above Shibuya Station, before the production moved to Osaka for four. Tokyo was the long half of the 2026 Japanese visit by a factor of three, and the visit is over.",
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
      "Four days, and the 2026 Japanese dates were done. Osaka got the short end of a two-city visit — Tokyo played twelve.",
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
    sellers: [
      {
        slug: "tickets-chicago-wimbledon",
        name: "ATG Tickets",
        price: {
          from: 18,
          currency: "GBP",
          checkedOn: "2026-09-02",
          note: "across every performance of this run",
        },
      },
    ],
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
    sellers: [
      {
        slug: "tickets-chicago-liverpool",
        name: "ATG Tickets",
        price: {
          from: 25,
          currency: "GBP",
          checkedOn: "2026-09-02",
          note: "across every performance of this run",
        },
      },
    ],
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
    sellers: [
      {
        slug: "tickets-chicago-glasgow",
        name: "ATG Tickets",
        price: {
          from: 20,
          currency: "GBP",
          checkedOn: "2026-09-02",
          note: "across every performance of this run",
        },
      },
    ],
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
      "Five nights at His Majesty's Theatre, open since December 1906 and the northernmost point of the tour. Cats played the same stage in February, three months before.",
  },
  {
    slug: "manchester",
    show: "chicago",
    city: "manchester",
    group: "uk",
    venue: "opera-house-manchester",
    start: "2027-05-25",
    end: "2027-05-29",
    sellers: [
      {
        slug: "tickets-chicago-manchester",
        name: "ATG Tickets",
        price: {
          from: 18,
          currency: "GBP",
          checkedOn: "2026-09-02",
          note: "across every performance of this run",
        },
      },
    ],
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
    sellers: [
      {
        slug: "tickets-chicago-york",
        name: "ATG Tickets",
        price: {
          from: 18,
          currency: "GBP",
          checkedOn: "2026-09-02",
          note: "across every performance of this run",
        },
      },
    ],
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
      {
        slug: "tickets-chicago-blackpool",
        name: "Winter Gardens Blackpool",
        price: {
          from: 25.95,
          currency: "GBP",
          checkedOn: "2026-09-22",
          note: "the online price, which already carries a booking fee, a restoration levy and a \u00a31.50 processing fee",
        },
      },
    ],
    summary:
      "Five nights in the Opera House, which seats 2,812: after Edinburgh, the largest room the British tour plays, and nearly four times the Cheltenham house at the other end of it.",
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
        price: {
          from: 24,
          to: 54.5,
          currency: "GBP",
          checkedOn: "2026-09-22",
          note: "the range the hall's own listing gives across every performance of this run",
        },
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
    sellers: [
      {
        slug: "tickets-chicago-southend",
        name: "Trafalgar Tickets",
        price: {
          from: 33,
          currency: "GBP",
          checkedOn: "2026-09-22",
          note: "across every performance of this run",
        },
      },
    ],
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
      {
        slug: "tickets-chicago-eastbourne",
        name: "Trafalgar Tickets",
        price: {
          from: 26,
          currency: "GBP",
          checkedOn: "2026-09-22",
          note: "across every performance of this run",
        },
      },
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
    sellers: [
      {
        slug: "tickets-chicago-brighton",
        name: "ATG Tickets",
        price: {
          from: 20,
          currency: "GBP",
          checkedOn: "2026-09-02",
          note: "across every performance of this run",
        },
      },
    ],
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
    sellers: [
      {
        slug: "tickets-chicago-bristol",
        name: "ATG Tickets",
        price: {
          from: 20,
          currency: "GBP",
          checkedOn: "2026-09-02",
          note: "across every performance of this run",
        },
      },
    ],
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
    sellers: [
      {
        slug: "tickets-chicago-milton-keynes",
        name: "ATG Tickets",
        price: {
          from: 18,
          currency: "GBP",
          checkedOn: "2026-09-02",
          note: "across every performance of this run",
        },
      },
    ],
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
    sellers: [
      {
        slug: "tickets-chicago-oxford",
        name: "ATG Tickets",
        price: {
          from: 18,
          currency: "GBP",
          checkedOn: "2026-09-02",
          note: "across every performance of this run",
        },
      },
    ],
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
    sellers: [
      {
        slug: "tickets-chicago-hull",
        name: "Hull Theatres",
        price: { from: 24, currency: "GBP", checkedOn: "2026-09-22" },
      },
    ],
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
    summary:
      "Six nights at Venue Cymru, on the tour's own list and nowhere else. The theatre had an enquiries page for these dates in September 2026 and has since taken it down; nothing is on sale and there is no box office page to ask at.",
  },
  {
    slug: "sunderland",
    show: "chicago",
    city: "sunderland",
    group: "uk",
    venue: "sunderland-empire",
    start: "2027-10-11",
    end: "2027-10-16",
    sellers: [
      {
        slug: "tickets-chicago-sunderland",
        name: "ATG Tickets",
        price: {
          from: 18,
          currency: "GBP",
          checkedOn: "2026-09-02",
          note: "across every performance of this run",
        },
      },
    ],
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
    sellers: [
      {
        slug: "tickets-chicago-woking",
        name: "ATG Tickets",
        price: {
          from: 18,
          currency: "GBP",
          checkedOn: "2026-09-02",
          note: "across every performance of this run",
        },
      },
    ],
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
    sellers: [
      {
        slug: "tickets-chicago-stoke",
        name: "ATG Tickets",
        price: {
          from: 18,
          currency: "GBP",
          checkedOn: "2026-09-02",
          note: "across every performance of this run",
        },
      },
    ],
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
    sellers: [
      {
        slug: "tickets-chicago-edinburgh",
        name: "ATG Tickets",
        price: {
          from: 20,
          currency: "GBP",
          checkedOn: "2026-09-02",
          note: "across every performance of this run",
        },
      },
    ],
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
      {
        slug: "tickets-cats-hull",
        name: "Hull Theatres",
        official: true,
        price: { from: 29, currency: "GBP", checkedOn: "2026-09-22" },
      },
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
      {
        slug: "tickets-cats-manchester",
        name: "ATG Tickets",
        official: true,
        price: {
          from: 21,
          currency: "GBP",
          checkedOn: "2026-09-02",
          note: "across every performance of this run",
        },
      },
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
      {
        slug: "tickets-cats-bristol",
        name: "ATG Tickets",
        official: true,
        price: {
          from: 26,
          currency: "GBP",
          checkedOn: "2026-09-02",
          note: "across every performance of this run",
        },
      },
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
      {
        slug: "tickets-cats-llandudno",
        name: "Venue Cymru",
        official: true,
        price: {
          from: 15,
          currency: "GBP",
          checkedOn: "2026-09-22",
          note: "the figure the theatre advertises, which already includes a \u00a33 administration fee and a \u00a31.50 theatre levy",
        },
      },
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
      {
        slug: "tickets-cats-glasgow",
        name: "ATG Tickets",
        official: true,
        price: {
          from: 21,
          currency: "GBP",
          checkedOn: "2026-09-02",
          note: "across every performance of this run",
        },
      },
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
        price: {
          from: 31.5,
          to: 64,
          currency: "GBP",
          checkedOn: "2026-09-22",
          note: "the range the hall's own listing gives across every performance of this run",
        },
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
  {
    slug: "new-york",
    show: "lost-boys",
    city: "new-york",
    venue: "palace-theatre",
    start: "2026-04-26",
    openRun: true,
    sellers: [
      {
        slug: "tickets-lost-boys-new-york",
        name: "Broadway Direct",
        official: true,
        price: {
          from: 55,
          currency: "USD",
          checkedOn: "2026-09-13",
          note: "the lowest price on the seller's own calendar; most performances are listed above it, and fees are added at checkout",
          tiers: [
            { name: "Digital lottery", from: 45, note: "entered the day before, limited seats" },
            { name: "In-person rush", from: 45, note: "at the box office when it opens, limited availability" },
          ],
        },
      },
    ],
    summary:
      "Previews began on 27 March 2026 and the production opened on 26 April, in a theatre that had reopened two years earlier a storey higher than it was built. It won four Tony Awards in its first season and is on sale through 7 March 2027, with no closing date announced.",
    runningTime: "2 hours 30 minutes, including a 15-minute interval",
    language: "English",
    ageGuidance:
      "Recommended for ages 11 and up. Everyone in the room needs a ticket, and there is a limit of twelve per person.",
    bodyHeading: "The production, the theatre and the run",
    body: [
      "The Palace Theatre is the reason to arrive early. Between 2018 and 2024 the whole building was rebuilt into the base of the TSX Broadway tower, and in 2022 the auditorium itself \u2014 walls, ceiling, plasterwork \u2014 was cut free of its foundations and raised thirty feet so that retail space could be built underneath. The room that reopened in 2024 is the room of 1913, one storey higher than it was built.",
      "The show inside it is a 1987 comedy horror film about teenage vampires on a Californian boardwalk, set to a rock score by The Rescues, with a book by David Hornsby and Chris Hoch and direction by Michael Arden. It opened on 26 April 2026 after previews from 27 March and won four Tony Awards in its first season \u2014 two for performances, two for how it looks.",
      "It runs two and a half hours with a fifteen-minute interval, is recommended for ages 11 and up, and everyone in the room needs a ticket of their own. The cheapest way in is the digital lottery or the in-person rush, both at $45, neither of which can be bought in advance.",
    ],
    faq: [
      {
        q: "What are the performance times?",
        a: "Eight a week: Tuesday at 7pm, Wednesday at 2pm and 7.30pm, Thursday and Friday at 7pm, Saturday at 2pm and 8pm, and Sunday at 3pm. Monday is dark, and the odd week moves a performance — the seller's calendar is the schedule.",
      },
      {
        q: "Is it playing on Halloween?",
        a: "Yes, twice. Saturday 31 October 2026 has a 2pm and an 8pm, and both are listed at the run's $55 floor price rather than above it.",
      },
      {
        q: "Are there cheaper seats?",
        a: "Broadway Direct runs a digital lottery and an in-person rush for the show, both at $45. Neither can be bought in advance online at that price.",
      },
    ],
    tags: ["broadway", "open-run"],
  },
  {
    slug: "new-york",
    show: "wicked",
    city: "new-york",
    venue: "gershwin-theatre",
    start: "2003-10-30",
    openRun: true,
    sellers: [
      {
        slug: "tickets-wicked-new-york",
        name: "Broadway Direct",
        official: true,
        price: {
          from: 97.75,
          currency: "USD",
          checkedOn: "2026-09-13",
          note: "the lowest price on the seller's own calendar; Saturday and Sunday performances are listed from $110.75",
          tiers: [
            { name: "Student", from: 59, note: "at the box office in person, with a valid student card" },
            { name: "Military", from: 79, note: "at the box office in person" },
            { name: "Digital lottery", from: 55, note: "including all fees" },
          ],
        },
      },
    ],
    summary:
      "Previews began at the Gershwin Theatre on 8 October 2003, the production opened on the 30th, and it has never played another New York address. It is on sale through 25 April 2027, with no closing date announced.",
    runningTime: "2 hours 45 minutes, including a 15-minute interval",
    language: "English",
    ageGuidance:
      "Recommended for ages 8 and up. Children under 5 are not admitted, and everyone in the room needs a ticket whatever their age.",
    bodyHeading: "The production, the theatre and the run",
    body: [
      "Wicked has never played anywhere else in New York. It opened at the Gershwin Theatre on 30 October 2003 and has stayed in the same house for its whole run, which is unusual for a show of this length \u2014 both of the other Broadway open runs on this site moved at least once.",
      "The Gershwin is the largest theatre the Nederlander Organization runs on Broadway, at 1,900 seats. That is roughly four hundred more than the Shubert and nearly eight hundred more than the Ambassador, and it is the practical reason a show that sells this consistently can keep its cheapest seats where they are: there are simply more of them to sell.",
      "There are student, military and lottery prices below the standing floor, and none of them can be bought as an ordinary advance booking. The lottery is entered online for a specific performance; the student and military rates are verified at purchase.",
    ],
    faq: [
      {
        q: "What are the performance times?",
        a: "Eight a week: Tuesday to Friday at 7pm, Saturday at 2pm and 8pm, and Sunday at 2pm and 7pm. Monday is dark.",
      },
      {
        q: "Are there cheaper seats?",
        a: "Three routes, none of them the ordinary online one: student tickets at $59 and military tickets at $79, both bought at the box office in person with the relevant card, and a digital lottery at $55 including fees.",
      },
      {
        q: "Is this the same production as the London one?",
        a: "The same staging, in a different theatre and with a different company. London has played the Apollo Victoria since September 2006; this page covers New York only.",
      },
    ],
    tags: ["broadway", "open-run"],
  },
  {
    slug: "new-york",
    show: "wanted",
    city: "new-york",
    venue: "james-earl-jones-theatre",
    start: "2026-10-15",
    openRun: true,
    sellers: [
      {
        slug: "tickets-wanted-new-york",
        name: "Telecharge",
        official: true,
      },
    ],
    summary:
      "The first performance is on Thursday 15 October 2026 at 8pm. No closing date has been announced, and the production has group bookings on sale through 31 March 2027.",
    runningTime: "2 hours 15 minutes, including a 15-minute interval",
    language: "English",
    ageGuidance:
      "Recommended for ages 10 and up. The production notes themes of violence and of frontier life, and says there is no swearing in the show.",
    faq: [
      {
        q: "When does Wanted start?",
        a: "The first performance is Thursday 15 October 2026 at 8pm, at the James Earl Jones Theatre, 138 West 48th Street.",
      },
      {
        q: "Who sells the tickets?",
        a: "Telecharge, which is the box office for every Shubert Organization house. The show's own site links directly to it. Groups of ten or more are booked separately, and are on sale through 31 March 2027.",
      },
      {
        q: "How long is it?",
        a: "2 hours 15 minutes including a 15-minute interval \u2014 a figure the production flags as provisional while the show is still developing.",
      },
    ],
    tags: ["broadway", "open-run"],
  },
  {
    slug: "new-york",
    show: "galileo",
    city: "new-york",
    venue: "shubert-theatre",
    start: "2026-11-10",
    openRun: true,
    sellers: [
      {
        slug: "tickets-galileo-new-york",
        name: "Telecharge",
        official: true,
      },
    ],
    summary:
      "Previews begin on Tuesday 10 November 2026 at 8pm and opening night is 6 December. No closing date has been announced.",
    language: "English",
    faq: [
      {
        q: "When does Galileo start?",
        a: "The first preview is Tuesday 10 November 2026 at 8pm at the Shubert Theatre, 225 West 44th Street. Opening night is Sunday 6 December 2026.",
      },
      {
        q: "What are the performance times?",
        a: "Evenings at 8pm Tuesday to Saturday, with 2pm matinees on Wednesday and Saturday once the run settles and a 3pm on Sunday 29 November. Monday is dark, and the production's own calendar is the schedule.",
      },
      {
        q: "Are there rush or lottery tickets?",
        a: "Not yet. The production says a rush and lottery policy is soon to be announced; until it is, there is no cheap route to a seat published anywhere.",
      },
      {
        q: "Is Ra\u00fal Esparza in every performance?",
        a: "No. The production says the role of Galileo Galilei is played by Michael Park at selected performances, and marks which ones on its own calendar.",
      },
    ],
    tags: ["broadway", "open-run"],
  },
  {
    slug: "new-york",
    show: "fantasticks",
    city: "new-york",
    venue: "hayes-theater",
    start: "2026-10-22",
    openRun: true,
    sellers: [
      {
        slug: "tickets-fantasticks-new-york",
        name: "Second Stage Theater",
        official: true,
      },
    ],
    summary:
      "Previews begin on Thursday 22 October 2026 at 8pm and opening night is 16 November. Sixty-six years after the show first opened, this is its Broadway debut.",
    language: "English",
    faq: [
      {
        q: "When does The Fantasticks start?",
        a: "The first preview is Thursday 22 October 2026 at 8pm at the Hayes Theater, 240 West 44th Street. Opening night is 16 November 2026.",
      },
      {
        q: "What are the performance times?",
        a: "Evenings at 8pm Tuesday to Saturday, with 2pm matinees on Saturday and Sunday. Monday is dark.",
      },
      {
        q: "Who sells the tickets?",
        a: "Second Stage Theater, the non-profit that runs the Hayes, through its own box office rather than a ticketing agency. In-person sales begin on 6 October 2026; the single ticket line is 212-541-4516, midday to 6pm daily.",
      },
      {
        q: "Is it playing on Halloween?",
        a: "Yes, twice \u2014 2pm and 8pm on Saturday 31 October 2026, both during previews.",
      },
    ],
    tags: ["broadway", "open-run"],
  },
  {
    slug: "new-york",
    show: "dolly",
    city: "new-york",
    venue: "st-james-theatre",
    start: "2026-12-07",
    openRun: true,
    sellers: [
      {
        slug: "tickets-dolly-new-york",
        name: "ATG Tickets",
        official: true,
      },
    ],
    summary:
      "Previews begin on Monday 7 December 2026 and opening night is 19 January 2027 \u2014 Dolly Parton's eighty-first birthday. Six weeks of previews across the holidays, and no closing date announced.",
    language: "English",
    ageGuidance:
      "The production says the show may be inappropriate for ages 8 and under. That is a recommendation, not a rule at the door.",
    faq: [
      {
        q: "When does DOLLY start?",
        a: "Previews begin on Monday 7 December 2026 at the St. James Theatre, 246 West 44th Street. Opening night is Tuesday 19 January 2027.",
      },
      {
        q: "Who sells the tickets?",
        a: "ATG Tickets \u2014 ATG Entertainment operates the St. James, and the production's own site links to nothing else. Telephone bookings are on +1 888 811 5040, and groups of ten or more on 1-800-BROADWAY extension 2.",
      },
      {
        q: "When does the box office open?",
        a: "In-person sales at the St. James begin on Monday 9 November 2026, four weeks before the first preview.",
      },
    ],
    tags: ["broadway", "open-run"],
  },
];
