import type { NewsItem } from "../types.ts";

// News for musical.today. The site's own pages are listings: they say when a
// show plays and where to buy. This feed is for the things that change the
// listings — a run announced, a theatre renamed, a production that sets the
// terms for the ones that follow — and it carries the same rule as the rest
// of the site: a claim appears here when a named source has published it.
export const items: NewsItem[] = [
  {
    slug: "chicago-takes-an-arena-stage-in-dubai",
    site: "musical",
    image: "/covers/chicago-takes-an-arena-stage-in-dubai.jpg",
    imageAlt: "A wide dark paper arena bowl with a narrow lit rectangle of pale paper at its centre, five small chevrons above it",
    imageKind: "generated",
    imageWidth: 1536,
    imageHeight: 864,
    title: "Chicago plays an arena in Dubai, eight performances across five days",
    cardTitle: "Chicago plays an arena in Dubai",
    titleSeo: "Chicago at the Coca-Cola Arena",
    summary:
      "The Coca-Cola Arena hosts Chicago from 16 to 20 December 2026 — eight performances, and the first Broadway production staged on that arena floor.",
    date: "2026-09-06",
    category: "Runs",
    source: {
      name: "Gulf News",
      url: "https://gulfnews.com/entertainment/razzle-dazzle-in-dubai-chicago-the-musical-announces-dates-and-ticket-details-1.500549598",
      verifiedOn: "2026-09-06",
    },
    body: [
      "A musical built for a 1,100-seat Broadway house is about to be played in a room that holds seventeen thousand. That is the interesting part of this booking, and it is not a detail of scale — it changes what the audience sees.",
      "## The dates",
      "<strong>Chicago</strong> runs at the <strong>Coca-Cola Arena</strong>, Dubai, from <strong>Wednesday 16 to Sunday 20 December 2026</strong>: <strong>eight performances over five days</strong>. Matinees at <strong>3pm</strong> on each of the five days, with <strong>8pm</strong> evening performances added on the Friday, Saturday and Sunday.",
      "It is presented by <strong>Marquee Global Events</strong>, and billed as the first Broadway theatrical production to take the arena’s stage.",
      "## Tickets",
      "Early-bird pricing starts at <strong>Dh49</strong> for bronze and <strong>Dh99</strong> for silver, with <strong>Dh199</strong> gold, <strong>Dh399</strong> for diamond and platinum floor seats, and <strong>Dh599</strong> for front-row VIP. Tickets are on sale through the arena. The show is <strong>15+</strong>.",
      "## Why an arena, and what it costs the show",
      "Chicago has been staged since 1996 in the shape it took at Encores!: the orchestra on stage, black costumes, almost no set. That is the rare Broadway design that survives an arena, because there is nothing to lose in the scale-up — no painted flats to look thin from row forty, no scene changes to slow the width.",
      "What an arena does take is intimacy. Chicago is a show of held looks and quiet asides, and at that distance the choreography carries what a face would carry in a theatre.",
    ],
    expertise:
      "Two things are worth knowing before choosing a price band. The first is that in a five-day arena run the cheapest seats are usually the furthest from the floor rather than the worst-sighted; for a show with a stage-level band and no flown scenery, height is more forgiving than side angle, so a bronze seat straight on will read better than a diamond seat at forty-five degrees. The second is the schedule itself: 3pm matinees on all five days, with evenings added only from Friday, means the two Wednesday and Thursday performances are the least contested tickets of the run and the most likely to have real availability at the entry price. On the fifteen-plus rating — that is a house policy on this production, not a claim about a particular scene; Chicago has been playing to mixed audiences for thirty years, and the age line is the promoter’s decision to make in this market.",
  },

  {
    slug: "rent-turns-thirty-in-a-renamed-theatre",
    site: "musical",
    image: "/covers/rent-turns-thirty-in-a-renamed-theatre.jpg",
    imageAlt: "A pale paper theatre facade on a dark ground, the nameplate above its doors left blank and slightly askew",
    imageKind: "generated",
    imageWidth: 1536,
    imageHeight: 864,
    title: "Rent turns thirty in a West End theatre that is changing its name",
    cardTitle: "Rent at thirty, in a renamed theatre",
    titleSeo: "Rent, West End 2026: dates, cast and theatre",
    summary:
      "Previews from 28 September, booking to 27 March 2027, at the Duke of York’s — now the Tom Stoppard Theatre. Gaten Matarazzo makes his West End debut as Mark.",
    date: "2026-09-05",
    category: "Productions",
    source: {
      name: "London Theatre",
      url: "https://www.londontheatre.co.uk/theatre-news/news/everything-you-need-to-know-about-rent-in-the-west-end",
      verifiedOn: "2026-09-06",
    },
    body: [
      "A musical about people who cannot make the rent is thirty years old, and is opening in a building that has just been renamed after a playwright. Both facts are about the same thing: what a theatre decides to keep.",
      "## The run",
      "<strong>Rent</strong> begins previews on <strong>28 September 2026</strong> at the <strong>Tom Stoppard Theatre</strong> on St Martin’s Lane — the house that has been the <strong>Duke of York’s</strong> — and is booking to <strong>27 March 2027</strong>. Performances run <strong>Monday to Saturday at 7.30pm</strong>, with <strong>2.30pm</strong> matinees on Friday and Saturday. Tickets start at <strong>£31</strong>.",
      "## Who is in it",
      "<strong>Gaten Matarazzo</strong> plays <strong>Mark Cohen</strong> in his West End debut, with <strong>Travis Ross</strong> as Roger, <strong>Bella Brown</strong> as Mimi, <strong>Billy Nevers</strong> as Collins, <strong>Jeevan Braich</strong> as Angel, <strong>Lazy Violet</strong> as Maureen, <strong>Danielle Fiamanya</strong> as Joanne and <strong>Joaquin Pedro Valdes</strong> as Benny.",
      "<strong>Luke Sheppard</strong> directs, with choreography by <strong>Tom Jackson Greaves</strong>, set by <strong>David Woodhead</strong>, costumes by <strong>Gabriella Slade</strong>, lighting by <strong>Howard Hudson</strong> and sound by <strong>Paul Gatehouse</strong>.",
      "## The anniversary",
      "Jonathan Larson’s show premiered in <strong>1996</strong>, which makes this its <strong>thirtieth year</strong>. Thirty is the age at which a musical stops being revived because people remember it and starts being revived because they do not — the audience for this production was not alive for the first one.",
    ],
    expertise:
      "A six-month booking period is the number to read here. West End productions of this kind are announced to a fixed date and extended if they sell; a booking window that closes on 27 March is a commitment to twenty-six weeks and an option on anything after that, which is why the honest advice for anyone planning a trip is to treat the March end date as real rather than assume an extension. The casting tells you who the production is aimed at: a lead known from television draws an audience that does not otherwise book plays, and that audience buys late and buys weekends. If you want a weekday in the first month at the £31 level, that is the window where a name-led show is least busy — previews before the reviews land, on nights the television audience is not free.",
  },
];
