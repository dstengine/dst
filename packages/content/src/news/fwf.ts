import type { NewsItem } from "../types.ts";

// Thematic news for fwf.lol — the subjects the Future World Forum Dubai
// says it covers, reported as they actually happen in Dubai. The site's
// own subject is a single one-day event; without a feed of the things
// that event is about, there is nothing on it worth returning to.
//
// Nothing here is the organiser's announcement. Where a claim comes from
// the forum itself it is marked as such on the event page instead — this
// feed only carries facts published by the bodies that made them.

export const items: NewsItem[] = [
  {
    slug: "dubai-second-in-bcg-intelligent-cities-index",
    site: "fwf",
    title: "Dubai second in BCG's Intelligent Cities Index",
    summary:
      "Boston Consulting Group's inaugural Intelligent Cities Index put Dubai second of 61 cities worldwide, and first of all of them on adoption of AI and smart-city technology.",
    date: "2026-08-04",
    category: "Smart cities",
    source: {
      name: "Dubai Media Office",
      url: "https://www.mediaoffice.ae/en/news/2026/august/04-08/dubai-ranks-second-globally-in-the-adoption-of-ai",
      verifiedOn: "2026-08-27",
    },
    body: [
      "Boston Consulting Group published its Intelligent Cities Index for the first time in July 2026, scoring 61 cities across 39 countries on how far they have got with digital technology and AI in practice rather than on paper. London came first, Dubai second, New York third, Washington DC fourth and Amsterdam fifth.",
      "The index is built from 35 indicators grouped into five domains — outcomes, strategy, adoption, ways of working and enablers — covering 14 dimensions of digital transformation. Dubai's second place overall rests on a first place in one domain in particular: adoption, where it puts more smart-city use cases into live service than any other city measured.",
      "Digital Dubai's director general, Hamad Obaid Al Mansoori, tied the result to a decade of treating digital transformation and AI as government strategy rather than as procurement.",
    ],
    expertise:
      "Adoption is the interesting column for anyone attending a smart-city conference here. Plenty of cities score well on strategy documents; the gap between a published roadmap and a system a resident actually touches is where most municipal technology dies. A city that leads on deployment is a city where a pilot has somewhere to go afterwards — which is the practical reason vendors and planners keep booking flights to Dubai for this category of event.",
  },
  {
    slug: "rta-starts-commercial-robotaxi-operations",
    site: "fwf",
    title: "Dubai's robotaxis go commercial",
    summary:
      "The RTA began paid driverless taxi operations on 30 March 2026 with an initial 100 vehicles, bookable through the Uber and Apollo Go apps.",
    date: "2026-03-30",
    category: "Mobility",
    source: {
      name: "Dubai Media Office",
      url: "https://mediaoffice.ae/en/news/2026/march/30-3/rta-launches-commercial-operations-involving-autonomous-taxis",
      verifiedOn: "2026-08-27",
    },
    body: [
      "Dubai's Roads and Transport Authority started commercial autonomous taxi operations on 30 March 2026, covering Umm Suqeim and Jumeirah with an initial fleet of 100 vehicles. Rides are booked through the Uber app or the Apollo Go app, with the RTA describing a gradual widening of the fleet over the years that follow.",
      "The vehicles come from WeRide and from Apollo Go, Baidu's autonomous driving arm, with Tawasul Transport handling fleet operations and Dubai Taxi Company supporting locally. Between them the two operators had logged more than 150 million kilometres of driving and over 10 million autonomous trips elsewhere before the Dubai launch.",
      "Trials ran in the same districts through 2025 before the switch to paying passengers.",
    ],
    expertise:
      "The detail worth noticing is not the technology but the sequencing: a bounded geography, an existing hailing app as the front door, and a public operator keeping the fleet contract. That is a template a transport authority elsewhere can copy without owning the software, and it is the sort of thing a mobility panel is for — the vehicles are the least transferable part of the story.",
  },
  {
    slug: "vara-rules-for-virtual-asset-derivatives",
    site: "fwf",
    title: "VARA adds rules for crypto derivatives",
    summary:
      "Version 2.1 of Dubai's Exchange Services Rulebook added a framework for exchange-traded derivatives in virtual assets, effective immediately for licensed exchanges.",
    date: "2026-03-31",
    category: "Fintech & crypto",
    source: {
      name: "Virtual Assets Regulatory Authority",
      url: "https://www.vara.ae/en/news/",
      verifiedOn: "2026-08-27",
    },
    body: [
      "Dubai's Virtual Assets Regulatory Authority issued version 2.1 of its Exchange Services Rulebook on 31 March 2026, introducing a regime for exchange-traded derivatives in virtual assets. It applies immediately to every exchange service provider licensed in Dubai outside the DIFC.",
      "VARA has regulated virtual assets in the emirate under Law No. 4 of 2022 and has run a full market regulatory regime since February 2023, with a public register of licensed providers and a published list of firms operating without a licence.",
    ],
    expertise:
      "A derivatives framework is a later-stage regulatory move than a licensing regime: it presumes there is already a supervised spot market to reference. For a conference track on digital finance, the question this raises is less about Dubai and more about everyone else — a rulebook is the exportable artefact here, and jurisdictions competing for the same firms now have a drafted one to argue with.",
  },
  {
    slug: "dubai-land-department-tokenisation-pilot",
    site: "fwf",
    title: "Dubai pilots tokenised property titles",
    summary:
      "The Dubai Land Department's tokenisation pilot, run with VARA and the Dubai Future Foundation, projects AED 60 billion in tokenised property by 2033 — about 7% of the emirate's transactions.",
    date: "2025-03-19",
    category: "PropTech",
    source: {
      name: "Dubai Land Department",
      url: "https://dubailand.gov.ae/en/news-media/dubai-land-department-launches-pilot-phase-of-the-real-estate-tokenisation-project",
      verifiedOn: "2026-08-27",
    },
    body: [
      "The Dubai Land Department launched the pilot phase of its Real Estate Tokenisation Project in March 2025, working with the Virtual Assets Regulatory Authority, the Dubai Future Foundation and SandBox Real Estate. The department put the projected size of the tokenised market at AED 60 billion by 2033, or roughly 7% of Dubai's total real estate transactions.",
      "What distinguishes it from the tokenisation ventures that came before is the registry: the land department itself issues the record, so a token maps onto a title the state already recognises rather than onto a company that says it holds one.",
    ],
    expertise:
      "This is the PropTech story most worth following, because it is the one with a government registry behind it. Fractional property platforms have existed for a decade and mostly foundered on the same question — what exactly does the buyer own if the platform closes. A pilot that answers it at the land registry is a different proposition, and it is why property tokenisation keeps appearing on Dubai conference agendas while it has quietly dropped off others.",
  },
];
