import type { EventItem } from "../types.ts";

// The one event this site exists for. Everything here is either printed on
// the organiser's ticket listing or derived from the structured data that
// listing publishes — the forum's own website (futureworldforum.com) has
// been an unconnected domain since at least August 2026, so there is no
// second source to check it against. Nothing has been filled in from what
// a conference of this kind usually does.

export const items: EventItem[] = [
  {
    slug: "future-world-forum-dubai-2026",
    site: "fwf",
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
];
