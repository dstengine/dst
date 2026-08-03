// Page content for riviera.dst.llc. Structure lives in @dst/ui's district
// components; this file is what actually changes between this site and
// mbr.dst.llc.

export const index = {
  title: "Living in Azizi Riviera",
  description:
    "What day-to-day life looks like in Azizi Riviera, block by block — the canal-front development in MBR City.",
  eyebrow: "Living here",
  h1: "Azizi Riviera, block by block",
  lede: `Azizi Riviera runs along the Dubai Water Canal in MBR City — a stretch
    of Mediterranean-style low-rise blocks wrapped around a ground-floor
    retail promenade, one of the larger single developments of its kind in
    the city. Day to day here has as much to do with which stretch of the
    promenade you're near as which building you're in.`,
  ledeWidth: "70ch",
  sections: [
    {
      heading: "What's built out and what isn't",
      paragraphs: [
        `Studios through three-bedroom units fill dozens of mid-rise blocks,
          each facing either the canal or an internal courtyard. Ground-floor
          retail — cafés, a handful of restaurants, a supermarket, general
          shops — runs the length of several buildings, which cuts down on
          car trips for the small stuff more than a comparable tower
          elsewhere in Dubai would.`,
        `Coverage tracks the construction timeline rather than the map:
          blocks that opened first carry a fuller promenade, later phases
          are still filling theirs in. And the canal that dominates every
          listing photo is a boat route, not a beach — see
          <a href="/water/">where people swim</a>.`,
      ],
    },
  ],
  links: [
    { href: "/coffee/", title: "Coffee", description: "Where the promenade's cafés cluster, block by block." },
    { href: "/food/", title: "Food", description: "Restaurants and the on-site supermarket for daily meals." },
    { href: "/pools/", title: "Pools", description: "A building amenity here, not shared across the development." },
    { href: "/water/", title: "Water", description: "Good for a walk. For a swim, look elsewhere on this page." },
    { href: "/money/", title: "Money", description: "Nearby exchange, and buying with crypto in practice." },
    { href: "/news/", title: "News", description: "What's changing inside the development." },
    { href: "/events/", title: "Events", description: "What's on locally, kept separate from news." },
  ],
  cta: {
    href: "/rent/",
    eyebrow: "Rent",
    h3: "Renting in Riviera specifically?",
    description: "Match the right block to what matters — canal view, courtyard, distance from the promenade.",
  },
};

export const coffee = {
  title: "Coffee in Azizi Riviera",
  description: "Cafés along Azizi Riviera's promenade, and how coverage shifts building to building.",
  eyebrow: "Coffee",
  h1: "Coffee on the promenade",
  lede: `A run of independent cafés and a couple of familiar chains along the
    canal-facing stretch — most of Riviera can reach a flat white without a car.`,
  sections: [
    {
      heading: "What's open",
      paragraphs: [
        `Density follows the construction timeline: the earliest-opened
          blocks carry the fullest café run, while newer phases are still
          being let. A five-minute walk from most buildings covers what's
          currently trading.`,
      ],
    },
  ],
  venuesHeading: "Where to go",
  venues: [
    {
      href: "/coffee/homebrew/",
      name: "Homebrew",
      blurb: "Old Dubai flavours on a modern café menu, open from 6am to late.",
      meta: "Building 24, Shop 3",
      tag: "Coffee",
      icon: "coffee",
      image: "/venues/homebrew.jpg",
    },
  ],
  callout: "Tenants turn over as leases end. Check a specific spot is open before making it the reason for a trip.",
};

export const coffeeVenues = {
  homebrew: {
    slug: "homebrew",
    eyebrow: "Coffee",
    name: "Homebrew",
    tagline: "Nostalgic tastes, locally sourced.",
    description:
      "A café built around the Dubai its founder grew up in — old-school local flavours reworked for a modern menu, rather than the specialty-coffee template most new openings reach for. It sits on the Building 24 stretch of the promenade and keeps longer hours than anything else nearby.",
    image: "/venues/homebrew.jpg",
    building: "Azizi Riviera, Building 24 – Shop 3, Nad Al Sheba 1",
    hours: "6:00am – 11:00pm daily",
    // schema.org format, kept alongside the human-readable `hours` above so
    // the two can't drift apart unnoticed.
    openingHours: "Mo-Su 06:00-23:00",
    phone: "+971 58 511 3251",
    details: [
      { label: "Neighbourhood", value: "Nad Al Sheba 1" },
      { label: "Good for", value: "Remote work, breakfast" },
    ],
    highlights: [
      {
        title: "Order this",
        text: "The labneh sourdough bagel — labneh, mint, and local vegetables, built as a nod to Al Reef Lebanese Bakery rather than a copy of it.",
      },
      {
        title: "The room",
        text: "Laid-back enough to work from for a few hours, which is what most of the weekday crowd is doing. Families take over later in the day.",
      },
      {
        title: "Worth knowing",
        text: "Named in Virgin Radio's top ten coffee shops in the UAE — unusual for a café inside a residential development rather than a retail district.",
      },
    ],
    sections: [
      {
        heading: "Why it reads differently",
        paragraphs: [
          `Founded by <strong>Ania Kubow</strong>, a Dubai-raised software
            developer, with a menu put together by head chef Saba, also from
            here. The premise is specific: dishes that reference what eating
            in Dubai was like before the city's current restaurant scene,
            served in a room that doesn't lean on that nostalgia visually.`,
          `The practical consequence is that the food menu carries as much
            weight as the coffee, which is not the default on this
            promenade.`,
        ],
      },
      {
        heading: "When to go",
        paragraphs: [
          `The 6am open is the outlier here — useful before a commute, and
            earlier than the rest of Riviera's ground-floor retail. Late
            evening is the other quiet window; the middle of the day is when
            the room fills.`,
        ],
      },
    ],
    externalHref: "https://www.instagram.com/homebrew.ae/",
    externalLabel: "Instagram",
    mapHref: "https://www.google.com/maps/search/?api=1&query=Homebrew+Coffee+Azizi+Riviera+Dubai",
  },
};

export const food = {
  title: "Food in Azizi Riviera",
  description: "Restaurants and groceries in Azizi Riviera — what's on the promenade, and where residents drive for more.",
  eyebrow: "Food",
  h1: "Eating in Riviera",
  lede: `Enough on the ground floor for a weeknight dinner and a grocery
    run — beyond that, most people drive.`,
  sections: [
    {
      heading: "Restaurants",
      paragraphs: [
        `Casual dining spans the promenade, geared toward a quick meal
          rather than a night out. For that, Meydan One and Downtown are
          both a short drive.`,
      ],
    },
    {
      heading: "Groceries",
      paragraphs: [
        `One supermarket on-site covers routine shopping. Specialty and
          international groceries mean a trip to the larger stores in
          Meydan or Business Bay.`,
      ],
    },
  ],
  callout: "The supermarket's range and specific restaurants shift as the promenade fills in.",
};

export const pools = {
  title: "Pools in Azizi Riviera",
  description: "Pool access in Azizi Riviera is a per-building amenity — what's standard, and how it varies by block.",
  eyebrow: "Pools",
  h1: "The pool is in your building, not the development",
  lede: `There's no shared pool across Riviera as a whole — whether you have
    one comes down to which block you're in.`,
  sections: [
    {
      heading: "What's standard",
      paragraphs: [
        `A residents' pool on a podium or rooftop level, usually next to
          the gym, is the norm across Riviera's buildings. It's for that
          building's residents only — not shared with the wider
          development.`,
      ],
    },
    {
      heading: "Canal-facing or courtyard-facing",
      paragraphs: [
        `Pool decks face one or the other depending on the block. If a
          canal view from the pool deck matters to you specifically, ask
          about that building rather than assuming it from a Riviera
          listing in general.`,
        `Sorting buildings by pool setup as part of choosing where to rent?
          Start on the <a href="/rent/">rent page</a>.`,
      ],
    },
  ],
};

export const water = {
  title: "Where to Swim Near Azizi Riviera",
  description: "Looking for somewhere to swim near Azizi Riviera? Building pool first — the canal isn't a swimming spot.",
  eyebrow: "Water",
  h1: "Where residents swim",
  lede: `If a search for "swimming near Riviera" brought you here: start
    with your building's pool. The canal that runs alongside the
    development carries boat and water-taxi traffic — worth a walk, not a swim.`,
  sections: [
    {
      heading: "Your building's pool",
      paragraphs: [
        `Covers most people's swimming, more than the canal or a beach
          trip does. See the <a href="/pools/">pools page</a> for what's
          typical and how it differs by block.`,
      ],
    },
    {
      heading: "The canal",
      paragraphs: [
        `Active transit for boats and water taxis, not a bathing area —
          whatever the marketing renders suggest. Treat the canal walkway
          as a place to walk and run.`,
      ],
    },
    {
      heading: "The coast",
      paragraphs: [
        `Kite Beach, La Mer, and JBR sit roughly 20 to 30 minutes away by
          car, depending on traffic and which part of Riviera you're
          starting from. There's no direct transit route, so a car or taxi
          is the realistic way to get there.`,
      ],
    },
  ],
};

export const money = {
  title: "Money: Crypto Near Azizi Riviera",
  description: "Crypto exchange near Azizi Riviera, and how buying property with crypto works in practice.",
  eyebrow: "Money",
  h1: "Crypto, a short drive from Riviera",
  lede: `Riviera's location puts licensed exchange desks within easy reach,
    even though there's nothing on the promenade itself.`,
  sections: [
    {
      heading: "Nearest exchange desks",
      paragraphs: [
        `Business Bay, DIFC, and Downtown carry most of the licensed
          desks and ATMs — a 15 to 20 minute drive from Riviera, close
          enough to be routine rather than a special trip. Confirm current
          VARA licensing directly before using any specific provider,
          since that changes faster than this page does.`,
      ],
    },
    {
      heading: "Buying with crypto",
      paragraphs: [
        `Crypto-funded purchases typically go through a licensed
          conversion step at the point of sale rather than the developer
          holding crypto directly. Ask the brokerage handling the specific
          unit whether that's supported before assuming it is.`,
      ],
    },
  ],
  callout: "DST's crypto vertical covers regulation and the buy-with-crypto process in more depth network-wide. This page is the Riviera-specific summary.",
  calloutKind: "note" as const,
};

export const news = {
  title: "Riviera News",
  description: "What's changing inside Azizi Riviera — not a citywide press release.",
  eyebrow: "News",
  h1: "What's changing in Riviera",
  lede: `Coverage of the development itself — new promenade tenants,
    completed phases, management changes — kept apart from
    <a href="/events/">events</a>, since the two age differently.`,
  sections: [
    {
      paragraphs: [
        `Citywide stories already get covered elsewhere; this stays
          narrow to what changes about living here.`,
        `The fastest-moving version of this runs on Instagram
          (<strong>@rivieradst</strong>). This page is the record that's
          still findable a year later.`,
      ],
    },
  ],
};

export const events = {
  title: "Riviera Events",
  description: "What's on locally in Azizi Riviera — resident meetups and promenade launches, not a citywide calendar.",
  eyebrow: "Events",
  h1: "What's on, locally",
  lede: `Meetups, promenade openings, seasonal activity along the canal —
    the kind of thing that doesn't show up on a citywide events calendar.`,
  sections: [
    {
      paragraphs: [
        `Kept separate from <a href="/news/">news</a> deliberately: "what's
          happening this week" and "what's changed about the development"
          are different questions with different shelf lives.`,
        `Instagram (<strong>@rivieradst</strong>) moves faster than this
          page does — check there for anything time-sensitive.`,
      ],
    },
  ],
};

export const rent = {
  title: "Renting in Azizi Riviera",
  description: "Looking to rent in Azizi Riviera specifically? Get a shortlist matched to the building, view, and unit size you want.",
  eyebrow: "Rent",
  h1: "Renting in Riviera, by block",
  lede: `Riviera spans dozens of buildings, and they're not interchangeable
    — canal-facing costs more than courtyard-facing, the original phase
    reads differently from the newer ones. Tell us what matters and get a
    shortlist that reflects it.`,
  varies: [
    { label: "View", text: "canal-facing units carry a real premium over courtyard-facing ones." },
    { label: "Distance to the promenade", text: "matters more here than in most developments, given how much daily life happens on it." },
    { label: "Phase and finish age", text: "the original stretch versus newer buildings, which affects both finish quality and how built-out the nearby retail is." },
  ],
  formSubmitLabel: "Request my Riviera shortlist",
  formFields: [
    {
      id: "unit-size",
      name: "meta.unitSize",
      label: "Unit size",
      defaultOption: "Prefer not to say",
      options: [
        { value: "studio", label: "Studio" },
        { value: "1br", label: "1 bedroom" },
        { value: "2br", label: "2 bedroom" },
        { value: "3br", label: "3 bedroom" },
      ],
    },
    {
      id: "view-pref",
      name: "meta.viewPreference",
      label: "View preference",
      defaultOption: "No preference",
      options: [
        { value: "canal", label: "Canal-facing" },
        { value: "courtyard", label: "Courtyard-facing" },
      ],
    },
  ],
};
