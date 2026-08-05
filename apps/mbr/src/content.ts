// Page content for mbr.dst.llc. Structure lives in @dst/ui's district
// components — the same ones riviera.dst.llc uses. This file is what
// actually changes between the two.

export const index = {
  title: "Living in MBR City",
  description:
    "What Mohammed Bin Rashid City is — the district behind the developer names, its communities, and how they fit together.",
  eyebrow: "Living here",
  h1: "MBR City, the district behind the names",
  lede: `Mohammed Bin Rashid City is one of Dubai's larger master-planned
    districts, south of Downtown and east of Al Khail Road, built out
    community by community rather than as one project. Most people meet it
    through a single development's name — District One, Meydan, Sobha
    Hartland, Azizi Riviera — without necessarily clocking that all four
    share the same district, the same schools and road network.`,
  sections: [
    {
      heading: "The communities, briefly",
      paragraphs: [
        `<strong>District One</strong> — villas and mansions around the Crystal
          Lagoon, the district's best-known amenity.`,
        `<strong>Meydan</strong> — anchored by the racecourse that hosts the
          Dubai World Cup, a mix of villas and mid-rise blocks.`,
        `<strong>Sobha Hartland</strong> — denser and more central, bordering
          Ras Al Khor and close to Business Bay.`,
        `<strong>Azizi Riviera</strong> — the canal-front apartment development
          with its own site at <a href="https://riviera.dst.llc" title="Living in Azizi Riviera">riviera.dst.llc</a>,
          which covers its day-to-day in more depth than makes sense to
          repeat here.`,
        `Pricing, unit types, and daily rhythm differ enough between these
          four that treating "MBR City" as one product is the mistake this
          site exists to head off.`,
      ],
    },
  ],
  links: [
    { href: "/coffee/", title: "Coffee", description: "Meydan One's café scene against Riviera's walkable promenade." },
    { href: "/food/", title: "Food", description: "One retail anchor, one exception, everyone else driving." },
    { href: "/pools/", title: "Pools", description: "Building pools against District One's Crystal Lagoon." },
    { href: "/water/", title: "Water", description: "The lagoon, the canal, and the real drive time to a beach." },
    { href: "/money/", title: "Money", description: "Nearby exchange, and buying with crypto in practice." },
    { href: "/news/", title: "News", description: "What's changing district-wide, not one community's own updates." },
    { href: "/events/", title: "Events", description: "Meydan racing, the lagoon's calendar, what draws a crowd." },
  ],
  cta: {
    href: "/rent/",
    eyebrow: "Rent",
    h3: "Looking to rent somewhere in MBR City?",
    description: "Tell us which community fits and get a shortlist matched to it — District One, Meydan, Sobha Hartland, or Riviera.",
  },
};

export const coffee = {
  title: "Coffee in MBR City",
  description: "Where to get coffee across MBR City's communities — Meydan One against Riviera's walkable promenade.",
  eyebrow: "Coffee",
  h1: "Coffee across the district",
  lede: `Two answers depending on where you're standing: what's inside your
    own community, and what's worth the short drive to Meydan One.`,
  sections: [
    {
      heading: "Meydan One",
      paragraphs: [
        `The district's main concentration of cafés and chains, drawing
          from across MBR City rather than just Meydan residents — the
          default answer if you're not near a community with its own
          promenade.`,
      ],
    },
    {
      heading: "Riviera's promenade",
      paragraphs: [
        `The one community with real walkable coffee of its own. See
          <a href="https://riviera.dst.llc/coffee/" title="Coffee in Azizi Riviera">Riviera's coffee
          page</a> for what's there.`,
      ],
    },
    {
      heading: "District One, Meydan, Sobha Hartland",
      paragraphs: [
        `These lean on Meydan One or nearby Business Bay for cafés rather
          than carrying dense retail of their own — worth knowing before
          picturing a walkable coffee scene from a render.`,
      ],
    },
  ],
};

export const food = {
  title: "Food in MBR City",
  description: "Dining and groceries across MBR City's communities — Meydan One's retail anchor, Riviera's promenade, and everywhere else.",
  eyebrow: "Food",
  h1: "Where the district eats",
  lede: `One real anchor, one walkable exception, everyone else driving to
    one or the other.`,
  sections: [
    {
      heading: "Meydan One Mall",
      paragraphs: [
        `The main retail and dining anchor — cinema, restaurants, a
          large-format mall most individual communities don't have on
          their own. District One and Sobha Hartland residents drive here
          or to Downtown for anything beyond convenience retail.`,
      ],
    },
    {
      heading: "Riviera's promenade",
      paragraphs: [
        `The exception — ground-floor dining and groceries without
          leaving the development. See <a href="https://riviera.dst.llc/food/" title="Restaurants and groceries in Azizi Riviera">Riviera's
          food page</a> for detail.`,
      ],
    },
    {
      heading: "Groceries district-wide",
      paragraphs: [
        `Larger supermarkets sit in Meydan and Business Bay. Most
          individual communities have convenience-level grocery at best;
          Riviera's on-site supermarket is the closest thing to an
          exception.`,
      ],
    },
  ],
};

export const pools = {
  title: "Pools in MBR City",
  description: "Pool access across MBR City's communities — building pools against District One's Crystal Lagoon.",
  eyebrow: "Pools",
  h1: "Building pools, and one district-scale exception",
  lede: `Pool access here is mostly a per-building amenity, same as
    anywhere in Dubai. District One's Crystal Lagoon is the one
    community-scale exception, and it's a different kind of amenity —
    not a bigger pool.`,
  sections: [
    {
      heading: "Building pools",
      paragraphs: [
        `Standard across apartment buildings in Riviera and Sobha
          Hartland, common in Meydan's mid-rise blocks too — see
          <a href="https://riviera.dst.llc/pools/" title="Pool access in Azizi Riviera">Riviera's own pools
          page</a> for what's typical there. Villa communities like
          District One more often carry private pools per unit instead.`,
      ],
    },
    {
      heading: "District One's Crystal Lagoon",
      paragraphs: [
        `A large artificial lagoon, not a conventional pool — see the
          <a href="/water/" title="Where to swim near MBR City">water page</a> for what it offers and who has
          access.`,
      ],
    },
  ],
};

export const water = {
  title: "Where to Swim in MBR City",
  description: "Looking for where to swim in MBR City? Building pools, District One's Crystal Lagoon and who has access, and the drive to the sea.",
  eyebrow: "Water",
  h1: "Where residents swim",
  lede: `MBR City has two real water features — District One's Crystal
    Lagoon and the Riviera canal — plus the building-pool amenity most
    communities share. Here's which of those you can swim in.`,
  sections: [
    {
      heading: "District One's Crystal Lagoon",
      paragraphs: [
        `The district's most distinctive water feature: a large artificial
          lagoon with clear turquoise water, ringed by a running and
          cycling track. It reads as the closest thing to a beach in MBR
          City, but access ties to the surrounding villas rather than the
          district as a whole — confirm access terms directly if you're
          not a District One resident, rather than assuming it's open to
          the public.`,
      ],
    },
    {
      heading: "The Riviera canal",
      paragraphs: [
        `Active boat and water-taxi traffic along Azizi Riviera, not a
          swimming spot despite the waterfront renders. See
          <a href="https://riviera.dst.llc/water/" title="Where to swim near Azizi Riviera">Riviera's own water
          page</a> for the full version.`,
      ],
    },
    {
      heading: "Building pools",
      paragraphs: [
        `The realistic day-to-day answer for most residents — see the
          <a href="/pools/" title="Pool access in MBR City">pools page</a>.`,
      ],
    },
    {
      heading: "The coast",
      paragraphs: [
        `MBR City itself is inland — the nearest public beaches (Kite
          Beach, La Mer, JBR) run 20 to 30 minutes by car depending on
          traffic and which community you're leaving from. No metro or
          tram gets you there, so it's a car or taxi trip every time.`,
      ],
    },
  ],
};

export const money = {
  title: "Money: Crypto Near MBR City",
  description: "Crypto exchange near MBR City, and how buying property with crypto works in practice.",
  eyebrow: "Money",
  h1: "Crypto, close to the district",
  lede: `MBR City's location bordering Business Bay puts licensed exchange
    infrastructure within easy reach regardless of which community you're
    in.`,
  sections: [
    {
      heading: "Nearest exchange desks",
      paragraphs: [
        `MBR City borders Business Bay directly, and that's where most of
          the licensed exchange desks in this part of Dubai actually sit
          — for communities near the border like Sobha Hartland it's
          closer to a 10-minute drive than the 20 you'd budget from
          further into the district. VARA licensing status is worth
          checking fresh with whichever desk you use rather than assuming
          it hasn't changed.`,
      ],
    },
    {
      heading: "Buying with crypto",
      paragraphs: [
        `Developers in MBR City don't hold crypto themselves — a licensed
          exchange handles the conversion at the point of sale. Whether a
          given unit's brokerage actually supports this varies by
          listing, so it's worth asking upfront rather than assuming.`,
      ],
    },
  ],
  callout: "The mechanics of paying with crypto, and the regulatory side of it, get the full treatment on DST's network-wide crypto vertical — this page just covers what's specific to MBR City.",
  calloutKind: "note" as const,
};

export const news = {
  title: "MBR City News",
  description: "District-wide news across MBR City — what's changing across communities, not one community's own updates.",
  eyebrow: "News",
  h1: "What's changing, district-wide",
  lede: `Coverage of what's changing across MBR City's communities, not
    what's hyper-local to one of them — kept apart from
    <a href="/events/" title="What's on in MBR City">events</a>, since the two age differently.`,
  sections: [
    {
      paragraphs: [
        `New Meydan One Mall tenants, road or infrastructure changes that
          affect the district as a whole, communities completing new
          phases — that scale of change, not a single building's news.`,
        `For what's changing inside one specific community, that content
          lives on that community's own site where one exists — Riviera's
          <a href="https://riviera.dst.llc/news/" title="What's changing in Azizi Riviera">news page</a> is the
          model this network follows as it covers more of MBR City the
          same way.`,
      ],
    },
  ],
};

export const events = {
  title: "MBR City Events",
  description: "District-wide events across MBR City — Meydan racing, District One's lagoon calendar, and what draws a crowd from across the district.",
  eyebrow: "Events",
  h1: "What's on, district-wide",
  lede: `What draws people from across MBR City's communities, not what's
    hyper-local to one of them.`,
  sections: [
    {
      paragraphs: [
        `Meydan Racecourse events — the Dubai World Cup chief among them —
          pull attention and traffic across the whole district, not just
          Meydan residents. District One's Crystal Lagoon runs its own
          seasonal programming that draws from neighbouring communities
          too.`,
        `For Riviera's own hyper-local calendar, see
          <a href="https://riviera.dst.llc/events/" title="What's on in Azizi Riviera">its events page</a>.`,
      ],
    },
  ],
};

export const rent = {
  title: "Renting in MBR City",
  description: "Looking to rent somewhere in MBR City? Get a shortlist matched to the right community — District One, Meydan, Sobha Hartland, or Riviera.",
  eyebrow: "Rent",
  h1: "Renting in MBR City, matched to the right community",
  lede: `A District One villa, a Meydan townhouse, a Sobha Hartland
    apartment, and a Riviera unit are different rentals with different
    budgets. Tell us what you're after and get a shortlist that reflects
    it, before you start touring units.`,
  varies: [
    { label: "Unit type", text: "villas and mansions in District One and much of Meydan against apartments in Sobha Hartland and Riviera." },
    { label: "Distance to Business Bay/Downtown", text: "Sobha Hartland is closest; District One and Meydan trade proximity for space and the lagoon or racecourse setting." },
    { label: "Day-to-day walkability", text: "Riviera's promenade is the outlier here — the villa communities are far more car-dependent for daily errands." },
  ],
  formSubmitLabel: "Request my MBR City shortlist",
  formFields: [
    {
      id: "community",
      name: "meta.community",
      label: "Which community interests you?",
      defaultOption: "Not sure yet",
      options: [
        { value: "district-one", label: "District One" },
        { value: "meydan", label: "Meydan" },
        { value: "sobha-hartland", label: "Sobha Hartland" },
        { value: "riviera", label: "Azizi Riviera" },
      ],
    },
    {
      id: "unit-type",
      name: "meta.unitType",
      label: "Unit type",
      defaultOption: "Prefer not to say",
      options: [
        { value: "apartment", label: "Apartment" },
        { value: "townhouse", label: "Townhouse" },
        { value: "villa", label: "Villa" },
      ],
    },
  ],
};
