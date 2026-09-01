import type { NewsItem } from "../types.ts";

export const items: NewsItem[] = [
  {
    slug: "difc-passes-10000-active-companies",
    site: "llc",
    image: "/covers/difc-passes-10000-active-companies.jpg",
    imageAlt: "Six paper columns rising in a staircase, a thin ruled line crossing above them",
    imageKind: "generated",
    imageWidth: 1536,
    imageHeight: 864,
    title: "DIFC passes 10,000 companies for the first time",
    titleSeo: "DIFC passes 10,000 companies",
    summary:
      "2,318 new firms joined in the first half of 2026, taking the active register to 10,018 — 30% growth in twelve months. Regulated financial firms reached 1,134.",
    date: "2026-07-28",
    category: "Free zones",
    source: {
      name: "Government of Dubai Media Office",
      url: "https://mediaoffice.ae/en/news/2026/july/28-07/difc-records-industry-leading-achievements-in-h1-2026",
      verifiedOn: "2026-09-01",
    },
    body: [
      "Round numbers are arbitrary and people notice them anyway. The Dubai International Financial Centre ended the first half of 2026 with <strong>10,018 active registered companies</strong> &mdash; the first time the centre has held more than ten thousand.",
      "## The half-year figures",
      "<strong>2,318</strong> new active registered companies joined in the six months to June, and the register grew <strong>30%</strong> over the preceding twelve months.",
      "Two sub-totals matter more than the headline, because they say what kind of centre this is becoming rather than how large it is.",
      "<strong>Regulated financial services firms rose 16% to 1,134.</strong> These are the entities under the DFSA&rsquo;s supervision &mdash; banks, asset managers, brokers, insurers. Everything else on the register is a company that chose the jurisdiction; these are companies that also submitted to its regulator.",
      "<strong>AI, FinTech and innovation firms reached 1,933, up 39% year on year.</strong> That is now a larger population than the regulated financial firms, inside a financial centre.",
      "## Family businesses, quietly",
      "Family-business-related entities reached <strong>1,408</strong>, up <strong>36%</strong>. This is the least visible of the four numbers and arguably the most consequential: a family holding structure is a decades-long commitment to a legal system, not a lease.",
      "## Who arrived",
      "Firms establishing regional offices in DIFC since the first half of 2025 include <strong>Citadel</strong>, <strong>Bank of Canada</strong>, <strong>JP Morgan International Advisors</strong>, <strong>ICICI Prudential Asset Management</strong>, <strong>Allianz Trade Middle East</strong> and <strong>Sun Life</strong>.",
      "## What this changes for a company choosing a jurisdiction",
      "A register of ten thousand is a different product from a register of three thousand. It means depth of local counsel, auditors who have seen your structure before, and a secondary market in office space &mdash; and it also means DIFC is no longer the quiet option. Costs in a jurisdiction follow demand for it.",
    ],
    expertise:
      "DIFC and the mainland are not competing offers for most companies &mdash; they answer different questions. DIFC is worth its premium when the business needs common law, a DFSA licence, or a family or fund structure that a mainland licence cannot hold. For a trading or services company selling into the UAE, the mainland route remains simpler and cheaper, and 10,018 registrations does not change that arithmetic.",
  },
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
    image: "/news/free-zone-mainland-routes.svg",
    imageAlt:
      "The three routes a free zone company can take to the mainland under Resolution 11 of 2025: a mainland branch licence, a free-zone-held branch licence at AED 10,000 a year, or an activity permit of up to six months at AED 5,000.",
    imageKind: "diagram",
    imageCredit: "DST, from the resolution text",
    imageWidth: 1200,
    imageHeight: 600,
    source: {
      name: "Dubai Legislation Portal",
      url: "https://dlp.dubai.gov.ae/Legislation%20Reference/2025/Executive%20Council%20Resolution%20No.%20(11)%20of%202025%20Regulating%20the%20Conduct%20of%20Free%20Zone%20Establishments%E2%80%99%20Activities.html",
      verifiedOn: "2026-08-25",
    },
    // Emphasis is on the facts a reader would come back to check — the
    // instrument, the fees, the standing obligation — not scattered for
    // effect, which is the state in which it stops meaning anything.
    body: [
      "<strong>Executive Council Resolution No. (11) of 2025</strong>, issued on March 3, 2025, allows a free zone establishment to conduct its activities outside the free zone but within Dubai — provided it holds the right authorisation from the Department of Economy and Tourism.",
      "The resolution sets out three routes: a branch licence for a branch established in the mainland, a branch licence held by the free zone entity for mainland activities, and an activity permit covering specific activities for up to six months. The published fees are <strong>AED 10,000 per year</strong> for the free-zone-based branch licence and <strong>AED 5,000</strong> for the activity permit.",
      "Companies taking either route must <strong>keep financial records for their mainland activities separate</strong> from the records covering activity inside the free zone. Existing establishments were given one year from the effective date to comply, with an extension possible.",
    ],
    expertise:
      "Before this, the free zone question was close to binary: take the free zone package and accept that serving mainland clients directly is off the table, or incorporate on the mainland from the start. A branch licence turns that into a sequencing decision rather than a permanent fork — you can start in a free zone and add mainland reach later. The separate-books requirement is the part worth planning for early: it is an ongoing accounting obligation, not a one-off filing.",
    // The news is the trigger; the depth lives on the topic pages, which
    // are the ones that should rank for the underlying question.
    related: [
      {
        href: "/zones/",
        image: "/covers/zones.jpg",
        imageAlt: "Cut-paper illustration: a grid of walled enclosures seen from above, one corner left open.",
        title: "Dubai free zone comparison",
        text: "Which free zone actually fits an activity — compared by fit rather than ranked into a top-10.",
        eyebrow: "Free zones",
      },
      {
        href: "/mainland/",
        image: "/covers/mainland.jpg",
        imageAlt: "Cut-paper illustration: a flat shoreline of layered strips meeting a cluster of towers.",
        title: "Mainland company setup",
        text: "When a mainland licence is genuinely required, and how it differs from holding a branch.",
        eyebrow: "Mainland",
      },
      {
        href: "/taxation/",
        image: "/covers/taxation.jpg",
        imageAlt: "Cut-paper illustration: a balance beam with two shallow trays, one holding a stack of discs.",
        title: "Corporate tax and filing",
        text: "What the tax and filing obligations look like once activity runs on both sides.",
        eyebrow: "Tax",
      },
    ],
  },
];
