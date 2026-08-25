import type { EventItem } from "../types.ts";

export const items: EventItem[] = [
  {
    slug: "step-conference-dubai-2026",
    site: "dst",
    title: "Step Conference 2026",
    summary:
      "Dubai's largest technology festival held its 14th edition on February 11–12, 2026 at Dubai Internet City, themed \"Intelligence Everywhere: The AI Economy\".",
    start: "2026-02-11",
    end: "2026-02-12",
    venue: "Dubai Internet City",
    city: "Dubai",
    organizer: "Step Conference",
    category: "Conference",
    source: {
      name: "Step Conference",
      url: "https://dubai.stepconference.com/",
      verifiedOn: "2026-08-25",
    },
    body: [
      "Step held its 14th Dubai edition across February 11 and 12, 2026 at Dubai Internet City, under the theme \"Intelligence Everywhere: The AI Economy\" — startups, finance, digital media and the spread of AI through all three.",
      "The organisers put the expected scale at more than 8,000 attendees, over 400 showcasing startups, 100+ participating companies, and investors representing upwards of $9 billion in available funding.",
    ],
    // No `outcome` yet: the organisers published projections beforehand and
    // no final count afterwards, so there is nothing to report here that
    // wouldn't be invented. It gets written when a real figure exists.
    expertise:
      "Those figures are the ones the organisers published in advance, and no final count has been released since — worth keeping in mind whenever an event's scale is quoted back at you, here included. Attendance projections are marketing until somebody publishes the actual number, which most conferences never do.",
  },
  {
    slug: "world-governments-summit-2027",
    site: "dst",
    title: "World Governments Summit 2027",
    summary:
      "Dubai hosts the World Governments Summit on February 1–3, 2027, following the largest participation in the summit's history.",
    start: "2027-02-01",
    end: "2027-02-03",
    city: "Dubai",
    organizer: "World Governments Summit Organisation",
    category: "Summit",
    source: {
      name: "World Governments Summit",
      url: "https://www.worldgovernmentssummit.org/media-hub/news/detail/world-governments-summit-2027-set-from-1-to-3-february",
      verifiedOn: "2026-08-25",
    },
    body: [
      "The World Governments Summit returns to Dubai from February 1 to 3, 2027. The organisers announced the dates following the summit's largest-ever global participation at the previous edition.",
      "The summit is where a good deal of the policy direction that later shows up as regulation in the UAE gets aired first — government service design, AI in the public sector, and the economic agenda behind Dubai's longer-range plans.",
    ],
    expertise:
      "The gap between what gets aired here and what turns into an actual rule is often short. Free zone licensing, residency categories and digital government services all appeared as policy direction from a summit stage before they existed as a resolution — which makes the programme worth reading as an early draft of the next year's regulation rather than as a conference agenda.",
  },
];
