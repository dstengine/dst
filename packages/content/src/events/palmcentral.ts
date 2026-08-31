import type { EventItem } from "../types.ts";

export const items: EventItem[] = [
  {
    slug: "international-property-show-2026",
    site: "palmcentral",
    image: "/covers/international-property-show-2026.jpg",
    imageAlt: "A row of small paper building models with a large key lying beside them",
    imageKind: "generated",
    imageWidth: 1536,
    imageHeight: 864,
    // Layout appends " — Palm Central, Palm Jebel Ali", leaving 29 characters.
    title: "International Property Show",
    summary:
      "The 22nd International Property Show runs September 7–9, 2026 at Dubai World Trade Centre, bringing developers, investors and institutions together. Entry is free for professional visitors.",
    start: "2026-09-07",
    end: "2026-09-09",
    startTime: "10:00",
    endTime: "18:00",
    venue: "Dubai World Trade Centre, Halls 4–8",
    city: "Dubai",
    geo: {
      name: "Dubai World Trade Centre",
      lat: 25.224198,
      lng: 55.286468,
    },
    organizer: "Dubai World Trade Centre",
    category: "Exhibition",
    source: {
      name: "Dubai World Trade Centre",
      url: "https://www.dwtc.com/en/events/international-property-show-2026/",
      verifiedOn: "2026-08-25",
    },
    body: [
      "The International Property Show returns for its 22nd edition from September 7 to 9, 2026, running 10:00 to 18:00 in halls 4 to 8 of the Dubai World Trade Centre. It brings together developers, investors and institutions around real estate investment, and entry is free for professional visitors who pre-register online.",
    ],
    expertise:
      "A show floor is a useful way to compare payment plans across developers in an afternoon, which is genuinely hard to do from listing sites. It is a poor place to make a decision: launch pricing presented at an exhibition is a sales environment, and the figures worth acting on are the ones you can check afterwards against the DLD record for the specific project and unit.",
  },
];
