import type { NewsItem } from "../types.ts";

export const items: NewsItem[] = [
  {
    slug: "palm-jebel-ali-frond-f-villas",
    site: "palmcentral",
    image: "/covers/palm-jebel-ali-frond-f-villas.jpg",
    imageAlt: "A paper palm frond seen from above with a row of small houses along one edge",
    imageKind: "generated",
    imageWidth: 1536,
    imageHeight: 864,
    title: "Nakheel releases 44 villas on Frond F",
    summary:
      "Ten architectural designs across the Beach and Coral Collections, five to seven bedrooms, directly on the shoreline of Palm Jebel Ali. Handovers begin late 2026.",
    date: "2026-08-20",
    category: "Development",
    source: {
      name: "Government of Dubai Media Office",
      url: "https://www.mediaoffice.ae/en/news/2026/august/20-08/nakheel-unveils-limited-collection-of-44-beachfront-villas-on-palm-jebel-alis-frond-f",
      verifiedOn: "2026-09-01",
    },
    body: [
      "Forty-four villas is a small release, and on a frond that is the point: every one of them sits directly on the shoreline, and a frond has only so much shoreline.",
      "## What was released",
      "Nakheel has unveiled <strong>44 beachfront villas</strong> on <strong>Frond F</strong> at <strong>Palm Jebel Ali</strong>, drawn from its <strong>Beach</strong> and <strong>Coral</strong> Collections and spanning <strong>10 distinct architectural designs</strong>.",
      "<strong>Beach Collection</strong> &mdash; five- and six-bedroom villas, approximately <strong>7,500 to 8,500 sq ft</strong>.",
      "<strong>Coral Collection</strong> &mdash; six- and seven-bedroom residences, approximately <strong>11,500 to 12,500 sq ft</strong>.",
      "All face the Arabian Gulf with direct beach access.",
      "## Ten designs for forty-four houses",
      "That ratio is unusual and it is deliberate. A frond built from two or three repeated types reads as a development from the water; ten designs across forty-four plots means a run of neighbouring houses rarely repeats. The designs were produced with <strong>NAGA Architects</strong>, <strong>SAOTA</strong>, <strong>LW Design Group</strong> and <strong>LOCI Architecture</strong>.",
      "## Where the wider island stands",
      "Nakheel has awarded more than <strong>Dh13 billion</strong> in construction and infrastructure contracts on Palm Jebel Ali. <strong>544 villas across Fronds A to F</strong> are progressing through construction, and <strong>728 villas on Fronds K to P</strong> have reached internal and external finishing.",
      "Finishing stage on Fronds K to P is the more informative of those two figures: it means the island has moved past the phase where progress is measured in reclamation and into the phase where it is measured in handovers.",
      "## Handover",
      "A <strong>phased handover</strong> of the first villas is scheduled to begin in <strong>late 2026</strong> and continue through <strong>2027</strong>.",
    ],
    expertise:
      "On a frond, the orientation of the plot decides the product more than the floor area does. An east-facing villa gets morning light on the beach and afternoon shade on the terrace; a west-facing one gets the sunset and a terrace that is unusable from three until six for much of the year. That difference is not in the collection name, and it is worth establishing plot by plot before the design is chosen.",
  },
  {
    slug: "nakheel-palm-central-next-phase",
    site: "palmcentral",
    // Kept short because Layout appends " — Palm Central, Palm Jebel Ali",
    // but still self-contained: this headline also runs in dst.llc's
    // aggregated feed, where "the next phase" alone says nothing.
    title: "Nakheel releases 222 homes",
    summary:
      "Nakheel opened a new phase of Palm Central Private Residences on Palm Jebel Ali — 222 homes across three low- to mid-rise buildings, one- to four-bedroom apartments and four- to five-bedroom townhouses.",
    date: "2026-06-24",
    category: "Development",
    // DST's own render of the development, the same one the site uses as
    // its opener. Labelled as a render because that is what it is: the
    // buildings on this page are not built yet.
    image: "/palmcentral.jpg",
    imageAlt:
      "Night aerial render of Palm Central's beachfront residences on Palm Jebel Ali, with the lit beach curve and the Dubai skyline behind.",
    imageKind: "render",
    imageCredit: "DST",
    imageWidth: 1600,
    imageHeight: 900,
    source: {
      name: "Nakheel",
      url: "https://www.nakheel.com/en/media-centre/press-releases/news-detail/2026/06/24/nakheel-releases-next-phase-of-palm-central-private-residences-amid-accelerating-demand-for-beachfront-living-on-palm-jebel-ali",
      verifiedOn: "2026-08-25",
    },
    body: [
      "Nakheel released the next phase of Palm Central Private Residences on Palm Jebel Ali on June 24, 2026 — <strong>222 homes</strong> spread across three low- to mid-rise buildings, a mix of one- to four-bedroom apartments and four- to five-bedroom townhouses.",
      "It follows the project's first release in October 2025, which Nakheel says drew strong demand for beachfront living on Palm Jebel Ali — seven interconnected islands and more than 90 kilometres of beachfront, part of the Dubai 2040 Urban Master Plan. Completion across the wider Palm Jebel Ali development is scheduled for September 2030.",
    ],
    expertise:
      "A second release this close behind the first is usually a signal of absorbed inventory, not just a pre-planned rollout — worth watching for how it prices against the October 2025 phase once official numbers are out.",
    related: [
      {
        href: "/prices/",
        title: "Palm Central prices",
        text: "Current pricing by unit type, and how this phase sits against the first release.",
        eyebrow: "Prices",
      },
      {
        href: "/payment-plan/",
        title: "Payment plan",
        text: "The instalment structure through to handover, set out in full.",
        eyebrow: "Payment",
      },
    ],
  },
];
