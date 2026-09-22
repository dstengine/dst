import type { EventItem } from "../types.ts";

// The one event this site exists for. Everything here is either printed on
// the organiser's ticket listing or derived from the structured data that
// listing publishes — the forum's own website (futureworldforum.com) has
// been an unconnected domain since at least August 2026, so there is no
// second source to check it against. Nothing has been filled in from what
// a conference of this kind usually does.

export const items: EventItem[] = [
  {
    slug: "dubai-future-week-2026",
    createdAt: "2026-08-28T01:39:41+04:00",
    updatedAt: "2026-09-23T01:56:10+04:00",
    site: "fwf",
    image: "/covers/dubai-future-week-2026.jpg",
    imageAlt: "Five pale lilac paper bands of different widths fanning out from one periwinkle point on an indigo ground",
    imageKind: "generated",
    imageWidth: 1536,
    imageHeight: 864,
    title: "Dubai Future Week 2026",
    // The two questions a search for the week asks are "when" and "how do I
    // get in"; the venue is in the summary, where it fits and the title does not.
    titleSeo: "Dubai Future Week 2026: 18–21 November and how to register",
    summary:
      "Dubai Future Week runs 18–21 November 2026 at Emirates Towers and the Museum of the Future: about 75 events in five tracks, with registration open on the official site. It folds in the Dubai Future Forum and Dubai AI Week.",
    start: "2026-11-18",
    end: "2026-11-21",
    venue: "Emirates Towers and the Museum of the Future",
    city: "Dubai",
    // The organiser's own map puts its two pins here; Emirates Towers is the
    // building Visit Dubai lists, so it carries the marker. The museum is the
    // other pin, at 25.2194, 55.2812 — about 250 m away.
    geo: {
      name: "Emirates Towers, Sheikh Zayed Road, Dubai",
      lat: 25.2175,
      lng: 55.28,
    },
    organizer: "Dubai Future Foundation",
    category: "Foresight",
    ticket: { url: "https://www.dubaifutureweek.com/en#register", label: "Register to attend" },
    source: {
      name: "Dubai Future Week, the organiser's official site",
      url: "https://www.dubaifutureweek.com/en",
      verifiedOn: "2026-09-23",
    },
    body: [
      "Dubai has spent several years running its futures events separately. From November it runs them as one week.",
      "## Dubai Future Week 2026 dates",
      "<strong>18–21 November 2026</strong>, across <strong>Emirates Towers</strong> and the <strong>Museum of the Future</strong>, organised by the <strong>Dubai Future Foundation</strong> under the patronage of <strong>Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum</strong>, Crown Prince of Dubai. The Dubai Government Media Office announced it on 1 September 2026. The official site now describes the tracks and the formats, but as of 23 September 2026 it had published no day-by-day timetable and no named speakers.",
      "## How to register",
      "Registration to attend is open through a form on the official site, dubaifutureweek.com. It asks for your name, nationality, country of residence, email, mobile number, organisation, job title and date of birth. No price appears on the form or anywhere else on the site as of 23 September 2026. Separate applications take would-be speakers and partners.",
      "## What it absorbs",
      "The week folds in events that used to stand alone. The <strong>Dubai Future Forum</strong> had announced its fifth edition for 17–18 November at the museum; its 2026 page now redirects to the week's site (<a href=\"/events/dubai-future-forum-2026/\" title=\"Dubai Future Forum 2026\">more on the forum</a>). <strong>Dubai AI Week</strong> held its second edition on its own, 6–9 April 2026. <strong>AI Grandmaster</strong> is now part of the week's competitions, the <strong>Prototypes for Humanity</strong> exhibition fills its prototype floor, and the annual <strong>AI Retreat</strong> sits in its policy room. The <strong>Dubai Foresight Awards</strong> and <strong>TED Talks</strong> are on the list too.",
      "## The five tracks",
      "The programme is organised around people rather than technologies, under the line <strong>For the Human of the Future</strong>. Each track, with the subjects the organiser lists for it:",
      "<strong>How We'll Live</strong>: future cities and urban design, smart and sustainable homes, mobility, climate resilience, public space. <strong>How We'll Think</strong>: AI, education, human–machine collaboration, ethics and trust in AI. <strong>How We'll Innovate</strong>: robotics, space, synthetic biology, quantum, deep-tech start-ups. <strong>How We'll Feel</strong>: longevity, mental health, food, health technology, sport. <strong>How We'll Do Business</strong>: money and finance, trade, the future of work, digital assets and fintech.",
      "## 500 Future Minds",
      "One strand has its own application. <strong>500 Future Minds</strong> takes 100 each of teachers, frontline responders, urban planners and architects, finance professionals and homegrown entrepreneurs who work or run a business in Dubai. They meet behind closed doors for a two-hour session on each of two days in the week of 16 November, mostly in English. The application takes about ten minutes and asks for an Emirates ID and a CV. Decisions come by <strong>1 November</strong>: if you have not heard by then, you were not accepted. Accepted applicants still have to register for the week itself.",
      "## Getting there",
      "The two buildings are about <strong>250 metres apart</strong> in a straight line, by the pins on the organiser's own map, both on the east side of Sheikh Zayed Road. <strong>Emirates Towers</strong> station on the Metro Red Line is connected to the Museum of the Future by a walkway.",
      "## The museum itself is closed",
      "The Museum of the Future closed to visitors at the beginning of September 2026 and says it will reopen in the first quarter of 2027 with an entirely new exhibition. The week still lists the building as one of its two venues. Nothing published so far says the exhibition floors will be open to people attending, so do not count on seeing them.",
      "## The size",
      "More than <strong>10,000 participants</strong> and about <strong>75 events</strong> by the organiser's count, across four stages that take speakers: the Big Stage, the Policy Room, the Pitch and the Offstage.",
      "## Two days after Future World Forum",
      "<a href=\"/\" title=\"Future World Forum Dubai 2026\">Future World Forum Dubai</a>, the one-day urban-technology conference this site follows, is on 16 November. It has a different organiser, Futur World Expo, sells paid tickets on Eventbrite and shares nothing with the week's programme. A visitor who flies in for one is in the city for the other.",
    ],
    // The eight formats, as the official site names them. A list of parallel
    // things, so it renders as one rather than as eight paragraphs.
    programme: [
      { heading: "The Big Stage", text: "Headline keynotes, debates, the week's major announcements and its award ceremonies." },
      { heading: "The Prototype Floor", text: "Working prototypes from universities around the world, including the Dubai Future Solutions – Prototypes for Humanity exhibition, in AI, health and climate." },
      { heading: "The Pitch", text: "Founders pitch future-focused ventures on stage, judged live, with investors in the room." },
      { heading: "The Policy Room", text: "Closed-door roundtables for policymakers and experts, including the annual AI Retreat." },
      { heading: "The Challenge", text: "Live AI and robotics competitions with prizes, including AI Grandmaster." },
      { heading: "The Offstage", text: "Workshops, invite-only dinners, creator gatherings and closed roundtables away from the main stage." },
      { heading: "500 Future Minds", text: "Closed-door sessions for 500 Dubai professionals, by application; see above." },
      { heading: "The District", text: "Immersive installations, family activities and food, which the organiser describes as open to the public all week." },
    ],
    // "Who you'll reach", from the organiser's partner page.
    audience: [
      "Government and policymakers",
      "Investors and venture capital",
      "Founders and start-ups",
      "Corporate innovation leaders",
      "Researchers and academics",
      "Media and creators",
    ],
    faq: [
      {
        q: "When is Dubai Future Week 2026?",
        a: "From 18 to 21 November 2026, at Emirates Towers and the Museum of the Future in Dubai. As of 23 September 2026 no day-by-day timetable had been published.",
      },
      {
        q: "How do I register for Dubai Future Week?",
        a: "Through the form on the official site, dubaifutureweek.com. It asks for your name, nationality, residence, contact details, organisation, job title and date of birth. No price is shown on the site as of 23 September 2026.",
      },
      {
        q: "Is Dubai Future Week open to the public?",
        a: "Part of it is. The organiser describes <strong>the District</strong>, with its installations, family activities and food, as open to the public all week. Everything else goes through registration, and some of it is closed-door or by invitation: the Policy Room roundtables, the Offstage dinners and 500 Future Minds.",
      },
      {
        q: "Is the Dubai Future Forum still happening in 2026?",
        a: "Yes, as part of Dubai Future Week, 18–21 November. The Media Office lists it among the events the week absorbs, and the forum's own 2026 page now redirects to the week's site. The days within the week that belong to the forum have not been published.",
      },
      {
        q: "Is the Museum of the Future open during Dubai Future Week?",
        a: "The museum closed to visitors at the beginning of September 2026 and says it will reopen in the first quarter of 2027. It is still one of the week's two venues, but nothing published so far says its exhibitions will be open to people attending.",
      },
      {
        q: "What is 500 Future Minds?",
        a: "A closed-door strand for 500 professionals who work or run a business in Dubai: 100 each of teachers, frontline responders, urban planners and architects, finance professionals and homegrown entrepreneurs. It runs as a two-hour session on each of two days, with applications decided by <strong>1 November 2026</strong>.",
      },
      {
        q: "Is Dubai Future Week the same as Future World Forum Dubai?",
        a: "No. Future World Forum Dubai is a one-day conference and expo on 16 November, organised by Futur World Expo and ticketed on Eventbrite. Dubai Future Week is the Dubai Future Foundation's four-day programme, which starts two days later.",
      },
    ],
    related: [
      {
        href: "/",
        title: "Future World Forum Dubai 2026",
        text: "The one-day urban-technology conference on 16 November, two days before the week opens.",
        eyebrow: "16 November",
      },
      {
        href: "/events/dubai-future-forum-2026/",
        title: "Dubai Future Forum 2026",
        text: "The foresight forum the week absorbed, and what changed about its dates.",
        eyebrow: "Part of the week",
      },
    ],
    updates: [
      {
        on: "2026-09-23",
        text: "The official site is up. Registration is open, the eight programme formats and 500 Future Minds are described, and the organiser counts about 75 events. Separately, the Museum of the Future, one of the two venues, has been closed to visitors since the beginning of September and plans to reopen in early 2027.",
      },
    ],
    expertise:
      "The consolidation is the story, and it changes how to plan a trip. Anyone who used to block separate dates for the Future Forum and AI Week now needs one window, and the week of 16 November holds more than this one: Future World Forum on the Monday, 500 Future Minds sessions within the same week, then the four days from Wednesday. The two buildings matter less than they sound: about 250 metres apart, with the Metro walkway between them. The track structure is a real signal rather than branding. Organising by \"how we'll live\" instead of by technology tends to produce cross-disciplinary panels, which is better for scanning a field and worse for depth in any one of them. For a PropTech reader, the track to target is How We'll Live, with How We'll Do Business for the tokenisation and digital-asset side. The one thing not to assume is a look inside the museum: it is closed to visitors until early 2027, venue or not.",
  },

  {
    slug: "future-world-forum-dubai-2026",
    createdAt: "2026-08-28T01:39:41+04:00",
    updatedAt: "2026-09-03T07:30:21+04:00",
    site: "fwf",
    image: "/covers/future-world-forum-dubai-2026.jpg",
    imageAlt: "A circular forum floor in layered paper with concentric rings of seating",
    imageKind: "generated",
    imageWidth: 1536,
    imageHeight: 864,
    title: "Future World Forum Dubai 2026",
    summary:
      "A one-day conference and expo on urban technology, listed for 16 November 2026 in Dubai, 10:00–17:30. Tickets run from USD 49 and sales close on 25 September 2026.",
    start: "2026-11-16",
    startTime: "10:00",
    endTime: "17:30",
    city: "Dubai",
    organizer: "Futur World Expo",
    category: "Conference",
    source: {
      name: "Eventbrite listing by Futur World Expo",
      url: "https://www.eventbrite.com/e/future-world-forum-dubai-tickets-1324931388449",
      verifiedOn: "2026-08-27",
    },
    tickets: {
      priceFrom: 49,
      priceTo: 3096,
      currency: "USD",
      salesEnd: "2026-09-25",
      refundPolicy: "Refunds up to 7 days before the event.",
    },
    ticket: {
      url: "https://www.eventbrite.com/e/future-world-forum-dubai-tickets-1324931388449",
      label: "Tickets and full terms on Eventbrite",
    },
    programme: [
      {
        heading: "Fintech & crypto",
        text: "Digital finance under the UAE's regulatory framework — blockchain applications, decentralised finance and where investment is going in virtual assets.",
      },
      {
        heading: "AI & data-driven solutions",
        text: "Artificial intelligence and analytics applied to forecasting, operational efficiency, cybersecurity and sustainable development.",
      },
      {
        heading: "PropTech & smart real estate",
        text: "Digital twins for urban planning, smart buildings, and financing models for property investment in Dubai.",
      },
      {
        heading: "Cyber resilient cities",
        text: "Protecting interconnected urban systems and the data they run on, for both public bodies and businesses in the region.",
      },
      {
        heading: "Smart infrastructure & mobility",
        text: "Intelligent transport, mobility-as-a-service, clean utilities and the move to a circular economy.",
      },
    ],
    audience: [
      "Government officials",
      "CIOs, CTOs and IT engineers",
      "Investors and VCs",
      "Developers and PropTech",
      "Data scientists and AI researchers",
      "Urban planners",
      "Finance, banking and crypto",
      "Media",
    ],
    body: [
      "Future World Forum Dubai is listed as a one-day conference and expo on Monday 16 November 2026, running 10:00 to 17:30 Gulf time. The organiser is Futur World Expo, and the only live source of information about it is its own ticket listing.",
      "The programme is described by sector rather than by session: fintech and crypto, AI and data, PropTech, urban cybersecurity, and smart infrastructure and mobility. No speakers, agenda times or exhibitor list had been published as of late August 2026.",
      "Tickets are sold in a wide band — from USD 49 for entry to just over USD 3,000 at the top, which on a one-day event of this shape usually separates a delegate seat from an exhibitor or sponsor package, though the listing does not spell that out. Sales are set to close on 25 September 2026, seven weeks before the date itself, and refunds are available up to seven days before.",
      "One thing to know before you buy: the website printed on the listing, futureworldforum.com, does not resolve to a site — the domain sits unconnected at its host. The listing itself remains live and marked as scheduled. Treat the ticket page as the authoritative source, and confirm the venue with the organiser before booking travel.",
    ],
    expertise:
      "The venue is the gap worth watching. Everything else about the listing is specific — date, hours, price band, sales cutoff — while the location says only \"Dubai\". For an event eight weeks from its ticket deadline that is unusual, and it is the single question to put to the organiser before spending anything that isn't refundable. This site tracks the listing and will say plainly if that changes, in either direction.",
  },
  {
    slug: "dubai-future-forum-2026",
    createdAt: "2026-08-28T01:56:27+04:00",
    updatedAt: "2026-09-23T01:56:10+04:00",
    site: "fwf",
    image: "/covers/dubai-future-forum-2026.jpg",
    imageAlt: "A plain paper ring standing upright on a low mound between two pale panels",
    imageKind: "generated",
    imageWidth: 1536,
    imageHeight: 864,
    title: "Dubai Future Forum 2026",
    summary:
      "The Dubai Future Foundation's gathering of futurists, now folded into Dubai Future Week, 18–21 November 2026 at Emirates Towers and the Museum of the Future. It starts two days after Future World Forum, the event it is most often confused with.",
    // The week's dates, not the forum's: the forum's own 17–18 November was
    // withdrawn when its page began redirecting to the week, and which of the
    // four days are the forum's has not been published. The body says so.
    start: "2026-11-18",
    end: "2026-11-21",
    venue: "Emirates Towers and the Museum of the Future",
    city: "Dubai",
    geo: {
      name: "Museum of the Future, Sheikh Zayed Road, Dubai",
      lat: 25.2194,
      lng: 55.2812,
    },
    organizer: "Dubai Future Foundation",
    category: "Conference",
    source: {
      name: "Dubai Government Media Office",
      url: "https://www.mediaoffice.ae/en/news/2026/september/01-09/under-hamdan-bin-mohammeds-directives-dubai-future-week-to-be-held-from-18-to-21-november-2026",
      verifiedOn: "2026-09-23",
    },
    body: [
      "The Dubai Future Forum's fifth edition was first announced for 17 and 18 November 2026 at the Museum of the Future. On 1 September the Dubai Government Media Office listed it among the events folded into <a href=\"/events/dubai-future-week-2026/\" title=\"Dubai Future Week 2026\">Dubai Future Week</a>, which runs 18–21 November across Emirates Towers and the Museum of the Future. The forum's own 2026 page now redirects to the week's site. Which of the four days belong to the forum has not been published.",
      "It is run by the Dubai Future Foundation, a government body, and gathers futurists, policymakers, scientists and researchers rather than exhibitors. The 2025 edition drew 2,500 participants from 100 organisations, with around 150 speakers across some 70 sessions, which is the scale to expect.",
      "The forum no longer has a registration of its own. Its page leads to the week's site, which has one form for the whole programme.",
      "The week opens two days after Future World Forum Dubai. Anyone flying in for one is in the city for the other.",
    ],
    updates: [
      {
        on: "2026-09-23",
        text: "Corrected: the forum is no longer a standalone event on 17–18 November. It is part of Dubai Future Week, 18–21 November, and its own page now redirects to the week's site.",
      },
    ],
    related: [
      {
        href: "/events/dubai-future-week-2026/",
        title: "Dubai Future Week 2026",
        text: "The four-day programme the forum is now part of: dates, registration, the eight formats and getting there.",
        eyebrow: "18–21 November",
      },
    ],
    expertise:
      "This is the event people often mean when they type \"future world forum dubai\" into a search box. The names are nearly identical, the dates are two days apart, and only one of the two is run by a government foundation with a named venue and a five-year record. They are not competitors so much as different products. This one is a policy and foresight gathering with no expo floor, and nothing is sold in the room. From 2026 it is also no longer a separate trip: it sits inside a four-day week alongside AI competitions, start-up pitches and a public district.",
  },
  {
    slug: "gitex-global-2026",
    createdAt: "2026-08-28T01:56:27+04:00",
    updatedAt: "2026-08-31T08:15:19+04:00",
    site: "fwf",
    image: "/covers/gitex-global-2026.jpg",
    imageAlt: "A grid of pavilion roofs seen from above with a domed hall at the centre",
    imageKind: "generated",
    imageWidth: 1536,
    imageHeight: 864,
    title: "GITEX Global 2026",
    summary:
      "The region's largest technology exhibition, 7–11 December 2026 at Dubai Exhibition Centre — the smart-city and government-technology floor that the smaller forums orbit.",
    start: "2026-12-07",
    end: "2026-12-11",
    venue: "Dubai Exhibition Centre",
    city: "Dubai",
    geo: {
      name: "Dubai Exhibition Centre, Expo City Dubai",
      lat: 24.959572,
      lng: 55.145022,
    },
    organizer: "Dubai World Trade Centre",
    category: "Exhibition",
    source: {
      name: "Dubai Exhibition Centre",
      url: "https://www.dubaiexhibitioncentre.com/en/whats-on/gitex-global-2026",
      verifiedOn: "2026-08-28",
    },
    body: [
      "GITEX Global runs 7–11 December 2026 at Dubai Exhibition Centre in Expo City: over 200,000 attendees from more than 180 countries, 6,800 exhibiting companies, 400-plus government entities and around 2,000 startups.",
      "For the subjects this site follows it is the widest floor of the year. Smart-city systems, government platforms, mobility and urban AI all have their own halls, and most of the vendors who take a stand at a one-day forum in November are here in December at ten times the scale.",
    ],
    expertise:
      "Worth knowing when you are budgeting. A week at GITEX and a seat at a one-day forum are not the same purchase, and if the reason for going is to meet suppliers rather than to be met, the December floor covers in one day what a small November conference covers in its entirety. The case for the smaller room is the opposite one: it is small enough to speak to someone.",
  },
  {
    slug: "proptech-connect-middle-east-2026",
    createdAt: "2026-08-28T01:56:27+04:00",
    updatedAt: "2026-09-02T07:22:25+04:00",
    site: "fwf",
    image: "/covers/proptech-connect-middle-east-2026.jpg",
    imageAlt: "Paper tower blocks with thin lines and nodes strung between their rooftops",
    imageKind: "generated",
    imageWidth: 1536,
    imageHeight: 864,
    title: "PropTech Connect Middle East 2026",
    summary:
      "Held 4–5 February 2026 at the Grand Hyatt Dubai with the Dubai Land Department, drawing more than 4,000 industry professionals. Past — kept here for what it showed.",
    start: "2026-02-04",
    end: "2026-02-05",
    venue: "Grand Hyatt Dubai",
    geo: { name: "Grand Hyatt Dubai", lat: 25.227888, lng: 55.328391 },
    city: "Dubai",
    organizer: "PropTech Connect, with the Dubai Land Department",
    category: "Conference",
    source: {
      name: "Dubai Land Department",
      url: "https://dubailand.gov.ae/en/news-media/proptech-connect-2026-kicks-off-tomorrow-with-more-than-4-000-industry-professionals-participating/",
      verifiedOn: "2026-08-28",
    },
    body: [
      "PropTech Connect Middle East ran on 4 and 5 February 2026 at the Grand Hyatt Dubai, organised with the Dubai Land Department, with more than 4,000 industry professionals taking part. The programme covered digital solutions, AI, blockchain and data analytics in real estate, and the land department used it to talk about governance and tokenised investment.",
    ],
    outcome: [
      "The land department framed the event around its own tokenisation work, which by then had moved from pilot to issuing token ownership certificates against titles it registers itself.",
    ],
    expertise:
      "It is on this page as a reference point rather than as an opportunity. A government registry putting its name on a private conference is the clearest signal available of which technology track Dubai is actually funding — and PropTech is on the forum's November programme for the same reason.",
  },

  {
    slug: "one-billion-followers-summit-2027",
    createdAt: "2026-09-08T16:29:32+04:00",
    updatedAt: "2026-09-08T16:29:32+04:00",
    site: "fwf",
    image: "/covers/one-billion-followers-summit-2027.jpg",
    imageAlt: "Five pale concentric rings spreading outward from a single dot on deep indigo",
    imageKind: "generated",
    imageWidth: 1536,
    imageHeight: 864,
    title: "1 Billion Followers Summit 2027",
    summary:
      "The fifth edition runs 8–10 January 2027 in Dubai, staged across Jumeirah Emirates Towers, DIFC and the Museum of the Future — a government-run event treating the creator economy as economic policy.",
    start: "2027-01-08",
    end: "2027-01-10",
    utcOffset: "+04:00",
    venue: "Jumeirah Emirates Towers, DIFC and Museum of the Future",
    city: "Dubai",
    country: "United Arab Emirates",
    organizer: "UAE Government Media Office",
    category: "Media",
    source: {
      name: "1 Billion Followers Summit",
      url: "https://www.1billionsummit.com/",
      verifiedOn: "2026-09-08",
    },
    body: [
      "Most governments treat content creators as something to regulate. This one convenes them, at scale, in January, and calls it an economic sector.",
      "## 1 Billion Followers Summit 2027 dates",
      "<strong>8–10 January 2027</strong>. The organisers list three venues: <strong>Jumeirah Emirates Towers</strong>, the <strong>Dubai International Financial Centre</strong> and the <strong>Museum of the Future</strong>.",
      "## The scale it works at",
      "The summit describes itself as the world's largest expo for content creators. For the <strong>2026 edition</strong>, the organisers gave a combined following of <strong>over 3.5 billion</strong> across their speakers, naming <strong>MrBeast</strong> and <strong>Vlad &amp; Niki</strong> among them.",
      "## Why it belongs in a future-of-work calendar",
      "The summit is run by a government media office rather than a platform or an agency, which makes it one of the few places where the working conditions of the creator economy — payment, rights, platform dependency — are discussed by the people who could legislate on them.",
    ],
    expertise:
      "Watch the venue list rather than the line-up. The Museum of the Future closed its galleries on 1 September 2026 for a refurbishment its operator has said will be finished around the fifth anniversary on 22 February 2027 — after this summit. The organiser lists it as a venue anyway, which either means a partial reopening or a change of plan, and it is the detail to confirm before booking travel. The programming point is simpler: a January date puts this at the start of the UAE's event calendar rather than in the autumn crush, so it is one of the few large Dubai events where the hotels are the constraint and the diary is not.",
  },
];
