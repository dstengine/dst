import type { NewsItem } from "../types.ts";

export const items: NewsItem[] = [
  {
    slug: "free-zone-mainland-access-resolution-11-2025",
    site: "llc",
    // Layout appends " — Company Formation in Dubai", so the headline has
    // 31 characters to work with and still has to stand alone in dst.llc's
    // aggregated feed.
    title: "Free zones get mainland access",
    summary:
      "Dubai's Executive Council Resolution No. (11) of 2025 lets free zone companies trade in mainland Dubai on a DET branch licence or a temporary activity permit, instead of setting up a separate mainland company.",
    date: "2025-03-03",
    category: "Regulation",
    source: {
      name: "Dubai Legislation Portal",
      url: "https://dlp.dubai.gov.ae/Legislation%20Reference/2025/Executive%20Council%20Resolution%20No.%20(11)%20of%202025%20Regulating%20the%20Conduct%20of%20Free%20Zone%20Establishments%E2%80%99%20Activities.html",
      verifiedOn: "2026-08-25",
    },
    body: [
      "Executive Council Resolution No. (11) of 2025, issued on March 3, 2025, allows a free zone establishment to conduct its activities outside the free zone but within Dubai — provided it holds the right authorisation from the Department of Economy and Tourism.",
      "The resolution sets out three routes: a branch licence for a branch established in the mainland, a branch licence held by the free zone entity for mainland activities, and an activity permit covering specific activities for up to six months. The published fees are AED 10,000 per year for the free-zone-based branch licence and AED 5,000 for the activity permit.",
      "Companies taking either route must keep financial records for their mainland activities separate from the records covering activity inside the free zone. Existing establishments were given one year from the effective date to comply, with an extension possible.",
    ],
    expertise:
      "Before this, the free zone question was close to binary: take the free zone package and accept that serving mainland clients directly is off the table, or incorporate on the mainland from the start. A branch licence turns that into a sequencing decision rather than a permanent fork — you can start in a free zone and add mainland reach later. The separate-books requirement is the part worth planning for early: it is an ongoing accounting obligation, not a one-off filing.",
  },
];
