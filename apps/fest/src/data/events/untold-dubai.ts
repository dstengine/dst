// UNTOLD Dubai: the event as the scout's sheet has it, and its guide.
//
// Generated once from the card (~/mind/ai/dubai/events/tasks/
// 2026-10-24-untold-dubai-en.md) and the approved copy
// (~/mind/ai/dubai/events/copy/2026-10-24-untold-dubai-en-r3.md), and edited
// by hand from here on. The sheet is section 1's YAML, values verbatim, each
// keeping its readOn, the scout's round 2 already merged into practical.2.
// The card's working notes (the segment, the planned paths, the verdict)
// are no page's facts and stay on the card; the SERP as measured stays,
// because the copy cites it. The copy is the writer's round 3, [key] tags
// and {{until prices}} spans as written. Two placings are the build's, not
// the copy's words:
// - the copy's lede paragraph 2, the line on why the guide exists, is the
//   main page's last section, "Why this guide", after "Where it is, and
//   getting home" (the fest director, gate 3 item 15), and so not a second
//   lede paragraph;
// - the FAQ page's rows 1, 5 and 7 carry the ids the other pages' links
//   name (#age, #times, #items: the SEO lead's gate-2 note 6).
//
// The layout is what tools/record-blocks.mjs reads: each record opens on a
// line that is a brace at two spaces (a guide's pages at six), its slug on
// the next line, and both dates on lines of their own. The take-down of the
// prices on 18 December re-dates the main and tickets pages and leaves the
// rest alone. A sheet edit is the event's, and moves every page through
// `with` in ../../dated.ts.
//
// No @dst/* import and nothing but erasable TypeScript: tools/lastmod.mjs
// loads this file through dated.ts with Node's type stripping.
import type { FestEvent, Guide } from "../types";
export const events: FestEvent[] = [
  {
    slug: "untold-dubai",
    createdAt: "2026-11-06T02:14:00+04:00",
    updatedAt: "2026-11-06T02:14:00+04:00",
    name: "UNTOLD Dubai",
    edition: { start: "2027-03-19", end: "2027-03-21" },
    // Keys the copy cites that hold no readOn of their own. The scout read
    // both notes on 6 November 2026 with the pages they sum up (sellers_note:
    // the terms s5 and the SERP; prices_note: s4, s5 and s9), and the SERP
    // keys were measured that day (serp.measured).
    readOverrides: {
      sellers_note: "2026-11-06",
      prices_note: "2026-11-06",
      "serp.note": "2026-11-06",
      "serp.queries.0": "2026-11-06",
      "serp.queries.0.panel": "2026-11-06",
      "serp.queries.0.hosts": "2026-11-06",
      "serp.queries.2.ads": "2026-11-06",
    },
    // The MusicEvent on the guide's main page (rules.ts). The start is the
    // passes' "18:00, 19 Mar - 21 Mar" and the organiser's festival record,
    // 2027-03-19T18:00:00+04:00 (editions.0.times.0 and .1); the end is a
    // date alone, since the sources differ on the last night's hour
    // (editions.0.times_note). The edition was moved from 5 November 2026
    // (editions.1), so the event is rescheduled from that day. The address
    // is the venue's "Sheikh Zayed Road (E11), … Dubai" (venue.address),
    // the point the organiser's own (venue.lat, venue.lon). The organiser
    // is UNTOLD EVENTS L.L.C. (event.organiser, Terms 1.1). The offers are
    // the two passes at each official seller, at the face value each lists
    // (prices.0 to prices.3): no validFrom, since District's 2026-02-26 is
    // the listing's date before the move, and no priceValidUntil, since no
    // source names an end of sale (the SEO lead, gate 3 item 13). InStock
    // only where District's own markup says so (sellers.1.note).
    markup: {
      startDate: "2027-03-19T18:00:00+04:00",
      endDate: "2027-03-21",
      previousStartDate: "2026-11-05",
      address: { streetAddress: "Sheikh Zayed Road (E11)", addressLocality: "Dubai", addressCountry: "AE" },
      organizer: { name: "UNTOLD EVENTS L.L.C.", url: "https://untold.ae/" },
      offers: [
        { seller: "UNTOLD Dubai", go: "tickets", name: "GA - 3 Day Pass - Early Bird", price: { key: "prices.0", currency: "AED" } },
        { seller: "UNTOLD Dubai", go: "tickets", name: "VIP - 3 Day Pass - Super Early Bird", price: { key: "prices.1", currency: "AED" } },
        { seller: "District by Zomato", go: "district", name: "GA - 3 Day Pass", availability: "InStock", price: { key: "prices.2", currency: "AED" } },
        { seller: "District by Zomato", go: "district", name: "VIP - 3 Day Pass", availability: "InStock", price: { key: "prices.3", currency: "AED" } },
      ],
    },
    sheet: {
      event: {
        name: "UNTOLD Dubai",
        slug: "untold-dubai",
        organiser: "UNTOLD EVENTS L.L.C.",
        kind: "music festival",
        organiser_note: "Terms 1.1: 'UNTOLD EVENTS L.L.C., an entity established under the laws of the U.A.E., licence number 1102119', mailing address The Offices at Ibn Battuta Gate, Office 1105, Dubai. The site's marketing-consent line names Dubai Holding Entertainment (DH Entertainment). The footer's 'UNTOLD Universe' links UNTOLD Europe (untold.com), Neversea and Massif.",
        source: "s5",
        readOn: "2026-11-06",
      },
      editions: [
        {
          year: 2027,
          start: "2027-03-19", // Friday
          end: "2027-03-21", // Sunday
          status: "announced", // the date the 2026 edition was moved to
          venue: "v1",
          times: [
            {
              what: "ticket listing time on both passes",
              value: "18:00, 19 Mar - 21 Mar",
              source: "s4",
              readOn: "2026-11-06",
            },
            {
              what: "festival record on the organiser's platform",
              start: "2027-03-19T18:00:00+04:00",
              end: "2027-03-21T23:55:00+04:00",
              source: "s6",
              readOn: "2026-11-06",
            },
            {
              what: "District listing",
              start: "2027-03-19T18:00:00+04:00",
              end: "2027-03-22T05:00:00+04:00",
              display: "Fri, 19 Mar, 6:00 PM – Mon, 22 Mar, 5:00 AM GST",
              source: "s9",
              readOn: "2026-11-06",
            },
            {
              what: "Terms 5.2.1, gates and wristband desk",
              value: "on-site check-in and wristband pick-up every festival day 16:00-02:00; entry to the festival area with a valid wristband 16:00 until 03:00 (last admission); updated times from the organiser prevail",
              source: "s5",
              readOn: "2026-11-06",
            },
          ],
          times_note: "The sources do not agree. The organiser's listing says 18:00 and its terms say 16:00. District runs the last night to 05:00 on Monday 22 March, but the organiser's record ends at 23:55 on Sunday. Print 'from 18:00' as the ticket listing time, and the 16:00/03:00 window as the terms' general rule. Print no closing time as a fact.",
          days: 3, // "3 days and nights" (home page meta); the 2025 edition and 2026 plan were four days
          announcement: [
            {
              what: "organiser's news post 'UNTOLD Dubai has new dates: March 19–21, 2027'",
              published: "2026-10-16",
              url: "https://untold.ae/news/33f08450-2e89-48e4-ad67-2b0593f262e0",
              says: "existing tickets automatically valid for the new dates; tickets for 19-21 March on sale at UNTOLD.ae or the District by Zomato app; line-up and new experiences 'will be announced soon'; organiser's stated reason: a stronger line-up, new stage productions and a new festival map built just for Dubai",
              source: "s2",
              readOn: "2026-11-06",
            },
            {
              what: "organiser FAQ on the move",
              says: "Q1-Q7: new dates 19-21 March 2027, still at Dubai Parks and Resorts, existing tickets remain valid with no exchange or reissue; Q2 reason 'a stronger edition of the festival and a better experience'",
              source: "s3",
              readOn: "2026-11-06",
            },
          ],
          source: "s1",
          readOn: "2026-11-06",
        },
        {
          year: 2026,
          start: "2026-11-05", // Thursday
          end: "2026-11-08", // Sunday
          status: "moved",
          venue: "v1",
          note: "Planned for Thursday 5 to Sunday 8 November 2026 at Dubai Parks and Resorts, gates 16:00 on the platform record. Moved to 19-21 March 2027. The organiser's page titled 'UNTOLD Dubai - 5-8 November 2026' is archived 14 Jul 2026 and was still on the platform record on 2 Oct 2026. Google's date panel still showed 'Thu, Nov 5, 2026 – Sun, Nov 8, 2026' for 'untold dubai' on 6 Nov 2026 (SERP below).",
          refund_window: {
            deadline: "Friday 9 October 2026, 23:59",
            fees_refunded: true,
            payout: "to the original payment method, about 5-14 working days",
            untold_ae_buyers: "ask@untold.ae",
            district_buyers: "eventsupport@district.ae",
            after_deadline: "handled under the ticketing terms",
            source: "s3",
            readOn: "2026-11-06",
            note: "The FAQ gives no year, but 9 October fell on a Friday in 2026 and the FAQ is about the March 2027 move. The window has closed. Both pass descriptions now say 'Paid orders cannot be returned' (s4), and District's FAQ says tickets are 'non-refundable once purchased' (s9).",
          },
          source: "s10",
          readOn: "2026-11-06",
        },
        {
          year: 2025,
          start: "2025-11-06", // Thursday
          end: "2025-11-09", // Sunday
          status: "held",
          venue: "v1",
          note: "Second edition and the first at Dubai Parks and Resorts, over four days and four nights (organiser article s13). The organiser's news post s2 says of 'last time': 190,000 people across six stages, with Martin Garrix, J Balvin, YUNGBLUD, Armin van Buuren and 100+ more artists. That is the organiser's own figure, print it as its claim. The archived page title wrongly reads '6-9 November 2026'. Its platform record gives 2025-11-06 18:00 to 2025-11-09 23:59 +04:00 and the address ' Dubai Park and Resorts, UAE'.",
          source: "s11",
          readOn: "2026-11-06",
        },
        {
          year: 2024,
          start: "2024-02-15", // Thursday
          end: "2024-02-18", // Sunday
          status: "held",
          venue: "Expo City Dubai",
          note: "First edition, at Expo City Dubai (platform record: address 'Expo City Dubai, UAE', 2024-02-15 20:00 to 2024-02-18 20:00 +04:00). The organiser's news list still carries the launch items, among them 'UNTOLD debuts at Expo City Dubai in February 2024' and an item on 10,000 pre-sale tickets.",
          source: "s12",
          readOn: "2026-11-06",
        },
      ],
      venue: {
        key: "v1",
        name: "Dubai Parks and Resorts",
        address: "Sheikh Zayed Road (E11), near Jebel Ali, Dubai, United Arab Emirates (the venue: 'on Sheikh Zayed Road, Across from Palm Jebel Ali')",
        lat: 24.917793, // organiser platform record, latitude 24.917792864046735
        lon: 55.005838, // longitude 55.00583802371156
        city: "Dubai",
        country: "AE",
        timezone: "Asia/Dubai", // +04:00 all year, no DST; organiser record localTime "+04:00"
        source: "s6",
        readOn: "2026-11-06",
        also: "District JSON-LD: 'Sheikh Zayed Rd - Dubai - United Arab Emirates', geo 24.923946, 55.0060946 (s9). The organiser's point is preferred. The venue's site is a theme-park resort of four parks, a water park and three hotels (s14). Its old UNTOLD page /en/untold-dubai now shows the resort home page (read 2026-11-06).",
      },
      sellers: [
        {
          name: "UNTOLD Dubai (untold.ae)",
          url: "https://untold.ae/passes",
          official: true,
          note: "/tickets redirects to /passes; checkout on untold.ae (platform 'Powered by Rhuna'); crypto payment enabled on the platform record (s6)",
          source: "s4",
          readOn: "2026-11-06",
        },
        {
          name: "District by Zomato",
          url: "https://www.district.ae/events/untold-dubai-2026-buy-tickets",
          official: true,
          note: "the organiser's FAQ Q13: 'The official ticketing partner of UNTOLD Dubai is District by Zomato'; listing titled 'UNTOLD Dubai 2027', organiser 'UNTOLD EVENTS L.L.C', both passes InStock, validFrom 2026-02-26; Google indexes the same listing on www.district.in (200)",
          source: "s9",
          readOn: "2026-11-06",
        },
        {
          name: "District by Zomato app",
          url: null,
          official: true,
          note: "named in the organiser's post s2 ('or through the District by Zomato app')",
          source: "s2",
          readOn: "2026-11-06",
        },
      ],
      sellers_note: "viagogo showed up for 'untold dubai tickets' and 'untold festival dubai', once as an ad and once organic. Never link it (rule 5). The organiser's terms 4.23-4.24: products bought outside the site and its contractual partners 'are at the Product Buyer's own risk and may be invalid', and resale outside the official site or authorised platforms is forbidden. The organiser names no official resale platform.",
      prices: [
        {
          label: "GA - 3 Day Pass - Early Bird",
          amount: 350,
          currency: "AED",
          seller: "untold.ae",
          source: "s4",
          readOn: "2026-11-06",
        },
        {
          label: "VIP - 3 Day Pass - Super Early Bird",
          amount: 900,
          currency: "AED",
          seller: "untold.ae",
          note: "VIP platform at the Mainstage; for those over 21",
          source: "s4",
          readOn: "2026-11-06",
        },
        {
          label: "GA - 3 Day Pass",
          amount: 350,
          currency: "AED",
          seller: "District by Zomato",
          source: "s9",
          readOn: "2026-11-06",
        },
        {
          label: "VIP - 3 Day Pass",
          amount: 900,
          currency: "AED",
          seller: "District by Zomato",
          source: "s9",
          readOn: "2026-11-06",
        },
      ],
      prices_note: "The organiser's site-wide banner says 'Get passes from AED 590.00' and no page explains it. It is not a price on sale: on 6 Nov the only passes listed were AED 350 and AED 900, so do not print 590. Visit Dubai's page (s16) says 'AED 299 - AED 799'. That is stale and is not printed. Terms 4.16: the final price is the base price plus VAT, and the pass data lists no included or excluded tax, so do not say whether 350 includes VAT. Instalments: the terms allow them with a non-refundable AED 100 (EUR 26) processing fee, not for purchases after 1 February 2027 (s5). Both passes on sale have instalments switched off in the organiser's data (installmentsEnabled false, s4). Prices come off on 2026-12-18 (six weeks).",
      priceValidUntil: "2026-12-18",
      age: {
        min: null, // all ages, with conditions; no general minimum
        rules: [
          "Under 16: valid ticket and identity document for everyone over 7; a Parental Consent form signed by a parent, guardian or an adult aged 21+ carried at entry; accompanied and supervised throughout by that adult (Terms 10.1).",
          "16 to 18: valid ticket, identity document and the signed Parental Consent form; no accompanying adult required (Terms 10.2).",
          "18 to 21: valid ticket and identity document; no consent form (Terms 10.3).",
          "Under 21: a wristband of a different colour; alcohol and cigarettes forbidden (Terms 10.4).",
          "VIP passes and the VIP area: 21 and over only (Terms 4.3, 10.11; VIP pass description s4).",
          "Children under 7 not recommended because of the noise; under 4 must wear ear protection (Terms 10.12, 10.13).",
        ],
        consent_form: "https://untold.ae/info/b277d6ac-06f3-475e-9ff8-dd935aa079de (s8)",
        seller_summary: "District FAQ: under 16 need parental consent and a parent/guardian with them, 16-18 parental consent only, 18+ no consent, all under 21 get a Minor Wristband (s9).",
        source: "s5",
        readOn: "2026-11-06",
      },
      lineup: {
        announcedOn: null, // not announced
        acts: [],
        status: "The organiser's Artists page reads 'Stay tuned! Artists are coming soon'. The platform's artists and stages lists are empty, and its post of 16 Oct says the line-up 'will be announced soon'.",
        previous: {
          edition: 2025,
          acts_named_by_organiser: ["Martin Garrix", "J Balvin", "YUNGBLUD", "Armin van Buuren"],
          source: "s2",
        },
        stages: "The home page meta says '100+ global artists across 5 spectacular stages' (s1). The 16 Oct post says six stages last time (s2). Do not print a 2027 stage count.",
        source: "s7",
        readOn: "2026-11-06",
      },
      transport: [
        {
          how: "Metro and bus: Dubai Metro Red Line to Ibn Battuta, then RTA bus DPR 1 from the Ibn Battuta Metro Station bus stop to Dubai Parks and Resorts. The venue says about every 75 minutes, 26 trips a day. From Ibn Battuta the first bus is at 07:30 and the last at 22:50. Back from the resort the first is at 08:10 and the last at 23:30. The last bus back leaves before the festival's night ends.",
          source: "s14",
          readOn: "2026-11-06",
        },
        {
          how: "Nearest metro station: the venue names 'UAE Exchange (Red Line)' and says taxis and shuttle buses wait at the station exit. RTA renamed UAE Exchange to Life Pharmacy Metro Station, with signage changed May to August 2025 (s15). Write 'Life Pharmacy (formerly UAE Exchange)'.",
          source: "s14",
          readOn: "2026-11-06",
        },
        {
          how: "From the city and DXB airport: the venue says the Red Line gives direct metro access from Downtown Dubai and DXB Airport.",
          source: "s14",
          readOn: "2026-11-06",
        },
        {
          how: "Taxi and ride-hailing: Dubai Taxi, Careem and Uber, with a dedicated taxi zone at the main gate. Limousines, taxis and private drivers use the drop-off next to the POD parking lots at VIP parking. Wheelchair-accessible taxis on request.",
          source: "s14",
          readOn: "2026-11-06",
        },
        {
          how: "Car: by Sheikh Zayed Road (E11), following the signs. The venue's own page gives both 'Exit 25' and 'take Exit 5', so print no exit number. Visitor parking is free and valet is AED 120 (park-day terms). For the festival, District's FAQ says there will be parking and an email with parking instructions closer to the date.",
          source: "s14",
          readOn: "2026-11-06",
          festival_parking_source: "s9",
        },
        {
          how: "Arrival steps: online check-in is mandatory for every ticket holder (pass descriptions, s4). Wristbands are collected at the Ticketing Desk outside the festival perimeter, 16:00-02:00 on festival days (Terms 5.2, 5.2.1). Bring an identity card or passport: entry needs it with the ticket's QR code, and photos of QR codes are not accepted (Terms 6.9-6.10, 9.4).",
          source: "s5",
          readOn: "2026-11-06",
        },
      ],
      practical: [
        {
          what: "entries",
          value: "Two entrances per day are allowed (Terms 9.3). District's FAQ says simply that re-entry is permitted (s9). Print the organiser's rule.",
          source: "s5",
          readOn: "2026-11-06",
        },
        {
          what: "ticket transfer",
          value: "A ticket can be passed to another person through the holder's account (Transfer button; with check-in done, delete the check-in first, free). Wristbands are non-transferable, and products bought in instalments cannot be transferred until paid in full (Terms VI, 5.3.7, 4.21).",
          source: "s5",
          readOn: "2026-11-06",
        },
        {
          what: "cashless",
          value: "Payment on site is by the RFID wristband. It is topped up with money, online by card (3D Secure) or from My Balance after online check-in, or at the top-up points on site (Terms 7.1-7.3). Money left on the wristband can be refunded (Terms VIII, 8.2). On site: at any top-up (loading) point on the festival perimeter during the festival only, with the wristband on the wrist; the organiser recommends asking at the latest when leaving on your last day; cash back is capped at AED 1,500 when the top-up was made by bank card (8.4.1.1-8.4.1.4). Online: online top-ups only, from Account Balance > Refund, either back to the card used (a processing fee is charged, amount not stated) or to the Account Balance (free), by the date the organiser announces on the platform (8.4.2.1-8.4.2.4). On-site top-ups can be refunded only at the on-site points, during the event (8.6). Unclaimed amounts become the festival's property (8.3). A refund of a pre-festival top-up before the festival starts only in exceptional cases (8.4.2.5). Separate rule for the account, not the wristband: money loaded into the Account Balance and converted into the platform's voucher currency cannot be turned back into cash except in exceptional circumstances (death, long inability to use the account, with documents), and it expires on 31 December of the edition's year (4.22.3). Spelling: the terms write 'Rhuna' (also 'RHUNA', defined as a multi-purpose voucher across the Untold group's festivals); the organiser's platform data has coinName 'Runa' (s6). Print 'Rhuna' if the name is printed at all.",
          source: "s5",
          readOn: "2026-11-06",
          coin_name_source: "s6",
        },
        {
          what: "allowed items",
          value: "compact cameras, lighters, GoPro cameras, small lightweight selfie sticks, power banks, lip balm, sun cream, non-flammable perfume or deodorant under 50 ml, baby bottles (Terms 9.6). Medicines only as Terms 9.7 sets out: 2-4 tablets of common medicines in cut blisters, and a prescription for anything else. Every visitor is searched in detail (Terms 9.10).",
          source: "s5",
          readOn: "2026-11-06",
        },
        {
          what: "food, drink, smoking, access",
          value: "District's FAQ says food, drinks and alcohol are sold on site, there is a designated smoking area, and the venue has wheelchair access and facilities for People of Determination.",
          source: "s9",
          readOn: "2026-11-06",
        },
        {
          what: "heat",
          value: "Some areas may be in direct sun or heat; drink enough and use sun protection (Terms 9.18).",
          source: "s5",
          readOn: "2026-11-06",
        },
      ],
      questions: [
        {
          q: "When is Untold Dubai 2026?",
          seen: "autocomplete (data.json, 21 Oct: 'untold dubai 2026'); Google date panel still shows 5-8 Nov 2026",
          answer_from: ["s2", "s3", "s10"],
        },
        {
          q: "Is Untold Dubai still happening in November 2026?",
          seen: "organiser FAQ Q3 'Is the festival definitely happening?'; Facebook result 'UNTOLD Dubai 2026 Returns Nov 5-8' on the first SERP",
          answer_from: ["s3", "s2"],
        },
        {
          q: "Untold Dubai 2027 dates",
          seen: "autocomplete ('untold dubai 2027'); SERP query 2",
          answer_from: ["s1", "s4", "s6"],
        },
        {
          q: "Why was Untold Dubai moved to March 2027?",
          seen: "organiser FAQ Q2; DJ Mag result 'UNTOLD Dubai postpones 2026 edition to March 2027'",
          answer_from: ["s3", "s2"],
        },
        {
          q: "Are my November 2026 tickets valid for March 2027?",
          seen: "organiser FAQ Q5-Q7",
          answer_from: ["s3", "s2"],
        },
        {
          q: "Can I get a refund for Untold Dubai tickets?",
          seen: "organiser FAQ Q9-Q12; District FAQ",
          answer_from: ["s3", "s4", "s9"],
        },
        {
          q: "How much are Untold Dubai tickets?",
          seen: "autocomplete ('untold dubai tickets', 'untold dubai 2026 tickets')",
          answer_from: ["s4", "s9"],
        },
        {
          q: "Where can I buy official Untold Dubai tickets?",
          seen: "SERP 'untold dubai tickets' (viagogo above the organiser)",
          answer_from: ["s3", "s4", "s9", "s5"],
        },
        {
          q: "Who is playing at UNTOLD Dubai?",
          seen: "people also ask ('untold dubai tickets', 'where is untold dubai'); autocomplete ('untold dubai lineup', '2026 lineup', 'artists', '2026 artists')",
          answer_from: ["s7", "s2"],
        },
        {
          q: "Who will be performing at the Untold Festival in 2026?",
          seen: "people also ask ('untold dubai tickets', 'untold dubai dates', 'where is untold dubai')",
          answer_from: ["s7", "s2"],
        },
        {
          q: "Untold Dubai 2025 line-up",
          seen: "autocomplete ('untold dubai 2025 lineup', 'untold dubai 2025')",
          answer_from: ["s2"],
        },
        {
          q: "Where is Untold happening in Dubai?",
          seen: "people also ask ('untold dubai dates'); reddit r/dubai thread 'Where is UNTOLD Dubai?' on the 'where is untold dubai' SERP",
          answer_from: ["s1", "s6", "s14"],
        },
        {
          q: "Where is the UNTOLD Festival held?",
          seen: "people also ask ('untold festival dubai')",
          answer_from: ["s6", "s12", "s1"],
        },
        {
          q: "What is UNTOLD Festival Dubai?",
          seen: "people also ask ('untold dubai', 'where is untold dubai', 'untold festival dubai')",
          answer_from: ["s1", "s2", "s13"],
        },
        {
          q: "How do I get to Untold Dubai by metro?",
          seen: "SERP title 'Untold Dubai 2025: Full lineup, tickets and how to get there' (Gulf News, first query)",
          answer_from: ["s14", "s15"],
        },
        {
          q: "Is there parking at Untold Dubai?",
          seen: "District FAQ",
          answer_from: ["s9", "s14"],
        },
        {
          q: "What is the age limit for Untold Dubai?",
          seen: "District FAQ 'Is there an age restriction for the event?'",
          answer_from: ["s5", "s9", "s8"],
        },
        {
          q: "What time does Untold Dubai start and finish?",
          seen: "derived from the conflicting times on the organiser and seller (no SERP row)",
          answer_from: ["s4", "s5", "s9"],
        },
        {
          q: "Is there a dress code for UNTOLD Dubai?",
          seen: "people also ask ('untold dubai tickets', 'where is untold dubai')",
          answer_from: [],
        },
        {
          q: "Is UNTOLD the biggest festival in the world?",
          seen: "people also ask ('untold festival dubai')",
          answer_from: ["s1"],
          note: "answer only with the organiser's own claim ('Dubai's First MEGA FESTIVAL', About page) as its claim",
        },
        {
          q: "untold dubai reddit",
          seen: "autocomplete (data.json, 21 Oct)",
          answer_from: [],
        },
      ],
      sources: {
        s1: {
          label: "UNTOLD Dubai, official site (home)",
          url: "https://untold.ae/",
          kind: "organiser",
        },
        s2: {
          label: "UNTOLD Dubai, news: 'UNTOLD Dubai has new dates: March 19–21, 2027' (published 16 Oct 2026)",
          url: "https://untold.ae/news/33f08450-2e89-48e4-ad67-2b0593f262e0",
          kind: "organiser",
        },
        s3: {
          label: "UNTOLD Dubai, FAQ (new dates, tickets, refunds)",
          url: "https://untold.ae/info/15ac0bd8-6de7-43c3-ad57-3589bb7ea253",
          kind: "organiser",
        },
        s4: {
          label: "UNTOLD Dubai, Passes & Accommodations",
          url: "https://untold.ae/passes",
          kind: "organiser",
        },
        s5: {
          label: "UNTOLD Dubai, General Terms and Conditions (event dated 19-21 March 2027)",
          url: "https://untold.ae/info/0af2e61b-d44b-42f8-a800-69afb4a38448",
          kind: "organiser",
        },
        s6: {
          label: "UNTOLD Dubai, festival record behind the site (dates, coordinates, UTC offset)",
          url: "https://untold.ae/api/get-festival",
          kind: "organiser",
          note: "machine-readable source; cite it, never link it",
        },
        s7: {
          label: "UNTOLD Dubai, Artists",
          url: "https://untold.ae/artists",
          kind: "organiser",
        },
        s8: {
          label: "UNTOLD Dubai, Parental Consent",
          url: "https://untold.ae/info/b277d6ac-06f3-475e-9ff8-dd935aa079de",
          kind: "organiser",
        },
        s9: {
          label: "District by Zomato, UNTOLD Dubai 2027",
          url: "https://www.district.ae/events/untold-dubai-2026-buy-tickets",
          kind: "seller",
        },
        s10: {
          label: "UNTOLD Dubai, official site as archived 14 Jul 2026 ('UNTOLD Dubai - 5-8 November 2026')",
          url: "https://web.archive.org/web/20260714035702/https://untold.ae/",
          kind: "organiser",
          note: "Wayback copy of the organiser's page; also 2 Oct 2026 snapshot 20261002101643",
        },
        s11: {
          label: "UNTOLD Dubai, official site as archived 29 Sep 2025 (2025 edition)",
          url: "https://web.archive.org/web/20250929105133/https://untold.ae/",
          kind: "organiser",
          note: "Wayback copy",
        },
        s12: {
          label: "UNTOLD Dubai, official site as archived 9 Jan 2024 (first edition, Expo City Dubai)",
          url: "https://web.archive.org/web/20240109082021/https://untold.ae/",
          kind: "organiser",
          note: "Wayback copy",
        },
        s13: {
          label: "UNTOLD Dubai, news: 'Return to Wonder' (9 Sep 2025)",
          url: "https://untold.ae/news/27b98b9d-92f9-447c-8fea-204a0e716655",
          kind: "organiser",
        },
        s14: {
          label: "Dubai Parks and Resorts, park hours and how to get here",
          url: "https://www.dubaiparksandresorts.com/en/park-hours",
          kind: "venue",
        },
        s15: {
          label: "RTA, 'RTA grants naming rights of metro station to Life Pharmacy' (5 May 2025)",
          url: "https://www.rta.ae/wps/portal/rta/ae/home/news-and-media/all-news/NewsDetails/rta-grants-naming-rights-of-metro-station-to-life-pharmacy",
          kind: "public body",
          alt: "https://mediaoffice.ae/en/news/2025/may/05-05/rta-grants-naming-rights-of-metro-station-to-life-pharmacy-under-a-10-year-agreement",
        },
        s16: {
          label: "Visit Dubai, UNTOLD Festival Dubai",
          url: "https://www.visitdubai.com/en/festivals-and-events/dubai-events-calendar/untold-festival-dubai",
          kind: "public body",
          note: "dates 19-21 Mar, from 18:00, links untold.ae/passes; title still says 2026 and prices 'AED 299 - AED 799' are stale: corroboration only, no price from here",
        },
        s17: {
          label: "Gulf News, 'Dubai's UNTOLD Festival set for March 2027' (last updated 6 Oct 2026)",
          url: "https://gulfnews.com/entertainment/dubais-untold-festival-set-for-march-2027-dates-tickets-and-all-you-need-to-know-1.500700240",
          kind: "media",
          note: "lead only: shows the move was public by 6 Oct, before the organiser's own post of 16 Oct; no fact on the page rests on it",
        },
      },
      serp: {
        measured: "2026-11-06",
        where: "built-in pane, google.com hl=en gl=ae num=10 pws=0; six queries, no captcha",
        queries: [
          {
            q: "untold dubai",
            hosts: [
              "untold.ae/news",
              "untold.ae/register",
              "untold.ae/media",
              "open.spotify.com (playlist 'Untold Dubai, November 5-8, 2026')",
              "gulfnews.com (2025 line-up and how to get there, 21 Oct 2025)",
              "YouTube (113th Street Music)",
            ],
            social: "Instagram x2, Facebook x7, short-video carousel",
            panel: "Google date panel 'Untold Dubai/Date: Thu, Nov 5, 2026 – Sun, Nov 8, 2026' (wrong)",
            paa: ["What is the biggest festival in Dubai?", "Who is touring in Dubai in 2026?", "What is an untold event in Dubai?"],
          },
          {
            q: "untold dubai 2027",
            hosts: [
              "untold.ae/stages",
              "untold.ae/map",
              "untold.ae/info (About)",
              "district.ae (listing)",
              "untold.ae/media",
              "dscvr.ae ('UNTOLD Dubai moves to new dates in March 2027', short news)",
            ],
            ads: "emiratesdubai7s.com",
            social: "Facebook x2, Instagram x3",
          },
          {
            q: "untold dubai tickets",
            hosts: [
              "untold.ae/passes",
              "untold.ae",
              "district.in (listing)",
              "coca-cola-arena.com (old UNTOLD page)",
              "untold.ae/info (FAQ)",
              "untold.ae/info ('Everything You Need to Know', now 500 on the live site)",
              "untold.ae/artists",
            ],
            ads: "tickets.emiratesdubai7s.com, viagogo (x2 rows), ticketmaster.ae (other event)",
            paa: [
              "Is there a dress code for UNTOLD Dubai?",
              "Who will be performing at the Untold Festival in 2026?",
              "Who is playing at UNTOLD Dubai?",
            ],
          },
          {
            q: "untold dubai dates",
            hosts: [
              "untold.ae",
              "untold.ae/passes",
              "untold.ae/artists",
              "district.in",
              "untold.ae/info (FAQ)",
              "timeoutdubai.com ('New dates announced for UNTOLD Dubai', news)",
              "coca-cola-arena.com",
            ],
            paa: [
              "Where is Untold happening in Dubai?",
              "Who will be performing at the Untold Festival in 2026?",
            ],
          },
          {
            q: "where is untold dubai",
            hosts: ["untold.ae (with sitelinks Map, Passes)", "coca-cola-arena.com", "district.in", "timeoutdubai.com (news)", "ticketsfy.net (listing)", "reddit r/dubai 'Where is UNTOLD Dubai?'"],
            ads: "tickets.emiratesdubai7s.com",
            paa: ["Is there a dress code for UNTOLD Dubai?", "Who is playing at UNTOLD Dubai?", "What is the Untold Festival in Dubai?"],
          },
          {
            q: "untold festival dubai",
            hosts: [
              "untold.ae",
              "district.in",
              "coca-cola-arena.com",
              "djmag.com ('UNTOLD Dubai postpones 2026 edition to March 2027', news)",
              "viagogo.com",
            ],
            ads: "emiratesdubai7s.com, viagogo",
            panel: "date panel again 'Thu, Nov 5, 2026 – Sun, Nov 8, 2026'",
            paa: [
              "What is UNTOLD Festival Dubai?",
              "Where is UNTOLD Festival in 2026?",
              "Is UNTOLD the biggest festival in the world?",
              "Where is the UNTOLD Festival held?",
            ],
          },
        ],
        grade: "LM",
        note: "The organiser holds 3-7 rows per query. Beyond it there are only its seller, the venue-adjacent Coca-Cola Arena page left over from an old listing, one stale 2025 Gulf News guide, and three short news items on the move (Time Out Dubai, DJ Mag, dscvr). No page in English puts together the move, tickets, age rules, entry and transport. Google's own date panel still gives the cancelled November 2026 dates, which is the gap this guide fills. viagogo buys and ranks for the ticket queries. Unchanged from 21 Oct (LM) and 24 Oct (LM).",
      },
      not_found: [
        "2027 line-up and the date of its first reveal (Artists page 'coming soon'; platform lists empty)",
        "2027 stage count, stage names, daily schedule and set times",
        "an organiser transport or shuttle plan for 2027: the 2026 'UNTOLD Dubai: Everything You Need to Know' page (untold.ae/info/cf34bdd6-5bbe-4ed7-a5bb-a70316fe5c3d) now answers 500. Its Wayback copy (20 May 2026) could not be read because the archive was briefly offline. Re-try it for leads only.",
        "the festival car park and its price (District: instructions by email closer to the date)",
        "the organiser's hotel packages for 2027: its 'Official UNTOLD Dubai Festival Hotel Packages' page answers 500, and the passes page is titled 'Passes & Accommodations' but lists only two passes",
        "later price tiers after Early Bird / Super Early Bird, and what the 'from AED 590' banner refers to",
        "whether AED 350 / 900 include VAT (Terms say the final price is base plus VAT; no tax line on the passes)",
        "day tickets for 2027 (none on sale)",
        "dress code (asked in people also ask; neither the organiser's FAQ and terms nor District's page has one)",
        "the organiser's own date for the first public word of the move: its post is dated 16 Oct 2026, but its FAQ set a 9 Oct refund deadline and Gulf News had the story by 6 Oct; probably the organiser's Instagram, not readable without a login",
        "a reason for the move beyond the organiser's 'stronger edition' and 'stronger lineup, new stage productions and new festival map'",
        "airport to venue times or fares from DXB or DWC (Al Maktoum) from any organiser, venue or public-body page",
        "the venue's motorway exit (its page gives both 25 and 5)",
        "an official resale platform (the organiser names none)",
      ],
    },
    go: {
      official: {
        url: "https://untold.ae/",
        source: "s1",
        kind: "organiser",
        title: "The organiser's site for UNTOLD Dubai, 19–21 March 2027",
      },
      tickets: {
        url: "https://untold.ae/passes",
        source: "s4",
        kind: "organiser",
        title: "GA and VIP three-day passes on the organiser's own site",
      },
      district: {
        url: "https://www.district.ae/events/untold-dubai-2026-buy-tickets",
        source: "s9",
        kind: "seller",
        title: "The organiser's official ticketing partner, District by Zomato",
      },
      faq: {
        url: "https://untold.ae/info/15ac0bd8-6de7-43c3-ad57-3589bb7ea253",
        source: "s3",
        kind: "organiser",
        title: "The organiser's answers on the new dates, tickets and refunds",
      },
      terms: {
        url: "https://untold.ae/info/0af2e61b-d44b-42f8-a800-69afb4a38448",
        source: "s5",
        kind: "organiser",
        title: "Age rules, entry, items and transfers in the organiser's terms",
      },
      news: {
        url: "https://untold.ae/news/33f08450-2e89-48e4-ad67-2b0593f262e0",
        source: "s2",
        kind: "organiser",
        title: "The organiser's post of 16 October 2026 on the move to March",
      },
      artists: {
        url: "https://untold.ae/artists",
        source: "s7",
        kind: "organiser",
        title: "The organiser's Artists page, for the March 2027 lineup",
      },
      venue: {
        url: "https://www.dubaiparksandresorts.com/en/park-hours",
        source: "s14",
        kind: "venue",
        title: "Bus times, metro stations, taxis and parking from the venue",
      },
      maps: {
        // The organiser's own point (venue.lat, venue.lon, s6). The copy's
        // table gives s6, and a maps hop traces to the sheet key that holds it.
        url: "https://www.google.com/maps/search/?api=1&query=24.917793%2C55.005838",
        source: "venue",
        kind: "maps",
        title: "The organiser's map point for the festival at Dubai Parks and Resorts",
      },
      rta: {
        url: "https://www.rta.ae/wps/portal/rta/ae/home/news-and-media/all-news/NewsDetails/rta-grants-naming-rights-of-metro-station-to-life-pharmacy",
        source: "s15",
        kind: "public-body",
        title: "RTA: UAE Exchange metro station renamed Life Pharmacy",
      },
      consent: {
        url: "https://untold.ae/info/b277d6ac-06f3-475e-9ff8-dd935aa079de",
        source: "s8",
        kind: "organiser",
        title: "The form under-18s carry at entry, signed by a parent, guardian or adult aged 21+",
      },
    },
  },
];

export const guides: Guide[] = [
  {
    slug: "en-AE",
    createdAt: "2026-11-06T02:14:00+04:00",
    updatedAt: "2026-11-06T02:14:00+04:00",
    event: "untold-dubai",
    name: "UNTOLD Dubai 2027",
    lang: "en-AE",
    dir: "ltr",
    path: "/untold-dubai/",
    hubLabel: "English",
    hubBlurb: "UNTOLD Dubai runs from Friday 19 to Sunday 21 March 2027 at Dubai Parks and Resorts, after its move from November 2026. The guide covers the two passes and who sells them, the age rules at 16, 18 and 21, and the metro and bus there and back. [editions.0.start] [editions.0.end] [editions.0.venue] [editions.1] [prices] [sellers] [age.rules] [transport.0]",
    hubPlace: "Dubai Parks and Resorts, Dubai",
    // The prices are the sellers' of 6 November 2026, 42 days good. The
    // sheet's priceValidUntil is this take-down, not a seller's end of sale,
    // so it is never printed (rules.ts, musicEvent).
    expires: { prices: "2026-12-18" },
    footerNote: "An independent guide, written from the pages of the organiser, its ticket seller, the venue and the RTA. None of them has a hand in it.",
    pages: [
      {
        slug: "untold-dubai",
        createdAt: "2026-11-06T02:14:00+04:00",
        updatedAt: "2026-11-06T02:14:00+04:00",
        kind: "main",
        label: "Guide",
        crumb: "UNTOLD Dubai 2027",
        title: "Untold Dubai 2027: dates, tickets, lineup — festival guide",
        description: "UNTOLD Dubai festival, Friday 19 to Sunday 21 March 2027 at Dubai Parks and Resorts, moved from 5–8 November 2026: passes, official sellers, age rules, metro.",
        h1: "UNTOLD Dubai 2027",
        lede: "UNTOLD Dubai 2027 runs from Friday 19 to Sunday 21 March 2027 at Dubai Parks and Resorts, on Sheikh Zayed Road near Jebel Ali. [editions.0.start] [editions.0.end] [editions.0.venue] [venue.address] These are new dates. The festival was planned for Thursday 5 to Sunday 8 November 2026, and the organiser moved it to March at the same venue, so UNTOLD Dubai will not take place in November 2026. [editions.1.note] [editions.0.announcement.1] Tickets bought for November stay valid for March, with nothing to exchange and nothing reissued, the organiser says. [editions.0.announcement.0] [editions.0.announcement.1] The organiser bills March as \"3 days and nights\". [editions.0.days] [sources.s1]",
        glanceHeading: "At a glance",
        glance: [
          {
            label: "Dates",
            value: "Friday 19 to Sunday 21\u00a0March\u00a02027 [editions.0.start] [editions.0.end]",
          },
          {
            label: "Moved from",
            value: "Thursday 5 to Sunday 8\u00a0November\u00a02026 [editions.1.start] [editions.1.end] [editions.1.status]",
          },
          {
            label: "Venue",
            value: "Dubai Parks and Resorts, Sheikh Zayed Road (E11), Dubai [venue.name] [venue.address]",
          },
          {
            label: "Tickets",
            value: "untold.ae and District by Zomato [sellers.0] [sellers.1]{{until prices}}. General admission (GA) three-\u2060day pass AED\u00a0350, VIP AED\u00a0900, read 6\u00a0November\u00a02026 [prices.0] [prices.1] [prices.2] [prices.3]{{/until}}",
          },
          {
            label: "Ages",
            value: "all ages. Under-18s need a signed consent form and under-16s an adult with them. VIP 21\u00a0and\u00a0over [age.min] [age.rules]",
          },
          {
            label: "Lineup",
            value: "not announced on 6\u00a0November\u00a02026 [lineup.announcedOn] [lineup.status]",
          },
        ],
        jumps: [
          {
            id: "tickets",
            label: "Tickets",
          },
          {
            id: "dates",
            label: "Dates",
          },
          {
            id: "lineup",
            label: "Lineup",
          },
          {
            id: "location",
            label: "Getting there",
          },
          {
            id: "questions",
            label: "Questions",
          },
          {
            id: "sources",
            label: "Sources",
          },
        ],
        faqHeading: "Questions people ask",
        faq: [
          {
            q: "What is UNTOLD Dubai?",
            a: "A music festival in Dubai run by UNTOLD EVENTS L.L.C., a company established under UAE law, which calls it \"Dubai's First MEGA FESTIVAL\". [event] [event.organiser_note] [questions.19.note] Its first edition ran from Thursday 15 to Sunday 18 February 2024 at Expo City Dubai, and its second from Thursday 6 to Sunday 9 November 2025 at Dubai Parks and Resorts. [editions.3] [editions.2] The organiser's site links, under \"UNTOLD Universe\", to Untold Europe, Neversea and Massif. [event.organiser_note] Source: the organiser's site, its terms and its archived pages, read 6 November 2026.",
          },
          {
            q: "Who is playing at UNTOLD Dubai?",
            a: "No act is announced yet for 19–21 March 2027, and UNTOLD Dubai has no edition in 2026. [lineup.status] [editions.1.status] The organiser names Martin Garrix, J Balvin, YUNGBLUD and Armin van Buuren among the acts of November 2025. [lineup.previous] Source: the organiser's Artists page and its post of 16 October 2026, read 6 November 2026.",
          },
          {
            q: "Where is UNTOLD Dubai held?",
            a: "At Dubai Parks and Resorts, on Sheikh Zayed Road (E11) near Jebel Ali, for March 2027 as in 2025. [editions.0.venue] [venue.address] [editions.2] The first edition, in 2024, was at Expo City Dubai. [editions.3] Source: the organiser's festival record and its archived pages, read 6 November 2026.",
          },
        ],
        sections: [
          {
            id: "tickets",
            heading: "Tickets: two passes, two official sellers",
            body: "Both passes on sale cover all three days, and on 6 November 2026 neither seller had day tickets. [prices] [not_found.7] {{until prices}}The GA pass was AED 350 and the VIP pass AED 900, the same at both sellers. [prices.0] [prices.1] [prices.2] [prices.3]{{/until}} VIP is for over-21s only. [age.rules.4]\n\nThere are two official places to buy. One is the organiser's own checkout at untold.ae. The other is District by Zomato, on its website or in its app, which the organiser's FAQ names as its official ticketing partner. [sellers.0] [sellers.1] [sellers.2] The organiser's terms warn that tickets bought anywhere else are at the buyer's own risk and may be invalid. [sellers_note] The tier names, what VIP adds, refunds and how to pass a ticket on are on the [tickets page](/untold-dubai/tickets/).\n\nLinks: [UNTOLD Dubai, passes](/go/untold-dubai-tickets/) · [District by Zomato, UNTOLD Dubai 2027](/go/untold-dubai-district/)",
          },
          {
            id: "dates",
            heading: "Dates, and the move from November",
            body: "The November edition was meant to run over four days. The March one has three. [editions.1.start] [editions.1.end] [editions.0.days] The organiser gives a stronger lineup and new stage productions as its reason. [editions.0.announcement.0] The refund window it opened for the move closed on Friday 9 October 2026, and both passes now say \"Paid orders cannot be returned\". [editions.1.refund_window] [editions.1.refund_window.note] What the organiser says about November tickets, the refund window and its contact addresses are on the [new dates page](/untold-dubai/new-dates/).\n\nBoth passes list 18:00, 19 to 21 March. The organiser's general terms let people in from 16:00. [editions.0.times.0] [editions.0.times.3] The full set of times, and where the sources disagree on the finish, is in the [questions on age, entry and times](/untold-dubai/faq/#times).",
          },
          {
            id: "lineup",
            heading: "Lineup, as announced",
            body: "No act has been announced for March 2027. [lineup.announcedOn] On 6 November 2026 the organiser's Artists page read \"Stay tuned! Artists are coming soon\", and its post of 16 October says the lineup \"will be announced soon\". [lineup.status] There is no 2026 lineup to look for either. UNTOLD Dubai holds no edition in 2026, so the next lineup is the one for March. [editions.1.status] [editions.1.note] The organiser's home page promises \"100+ global artists\". [lineup.stages] [sources.s1]\n\nFor the last edition, in November 2025, the organiser's post names Martin Garrix, J Balvin, YUNGBLUD and Armin van Buuren, with \"100+ more artists\". [lineup.previous] [editions.2.note] UNTOLD puts that edition at 190,000 people over six stages. [editions.2.note]\n\nLinks: [UNTOLD Dubai, Artists](/go/untold-dubai-artists/)",
          },
          {
            id: "location",
            heading: "Where it is, and getting home",
            body: "Dubai Parks and Resorts is a theme-park resort \"on Sheikh Zayed Road, Across from Palm Jebel Ali\", in the venue's words. [venue.also] [venue.address] The festival first came here in November 2025. Its first edition, in February 2024, was at Expo City Dubai. [editions.2.note] [editions.3.note]\n\nBy public transport, take the Dubai Metro Red Line to Ibn Battuta and then the RTA bus DPR1 to the resort. [transport.0] Plan the end of the night before you set off. The venue gives 23:30 as the last DPR1 back from the resort, and the organiser's terms allow entry until 03:00. [transport.0] [editions.0.times.3] After the last bus, Dubai Taxi, Careem and Uber use a dedicated taxi zone at the main gate. [transport.3] The bus times both ways, the second metro station, driving and parking, and what to have ready at the gate are on the [location page](/untold-dubai/location/).\n\nLinks: [Open in maps](/go/untold-dubai-maps/) · [Dubai Parks and Resorts, how to get here](/go/untold-dubai-venue/)",
          },
          {
            id: "why",
            heading: "Why this guide",
            body: "On 6 November 2026, Google still gave the old November dates for UNTOLD Dubai, and none of the English pages it listed put the move, the tickets, the age rules and the trip there together. [serp.queries.0.panel] [serp.note] This guide does, from the organiser's, District's and the venue's own pages, each with the date it was read.",
          },
        ],
        sourcesHeading: "Sources",
        sources: "- UNTOLD Dubai (untold.ae): the home page, the news post \"UNTOLD Dubai has new dates: March 19–21, 2027\" of 16 October 2026, the FAQ on the new dates, the passes page, the general terms and the Artists page, all read 6 November 2026. [sources.s1] [sources.s2] [sources.s3] [sources.s4] [sources.s5] [sources.s7]\n- The organiser's festival record behind its site, for the dates, times and map point, read 6 November 2026. [sources.s6]\n- The organiser's site as archived on 14 July 2026, 29 September 2025 and 9 January 2024, for the past and planned editions, read 6 November 2026. [sources.s10] [sources.s11] [sources.s12]\n- District by Zomato, the UNTOLD Dubai 2027 listing and its FAQ, read 6 November 2026. [sources.s9]\n- Dubai Parks and Resorts, park hours and how to get here, read 6 November 2026. [sources.s14]",
        links: "",
      },
      {
        slug: "untold-dubai/tickets",
        createdAt: "2026-11-06T02:14:00+04:00",
        updatedAt: "2026-11-06T02:14:00+04:00",
        kind: "tickets",
        label: "Tickets",
        crumb: "Tickets",
        title: "Untold Dubai 2027 tickets: passes, sellers — festival guide",
        description: "UNTOLD Dubai 2027 festival tickets: the GA and VIP three-day passes, the two official sellers, the organiser's warning on resale, refunds and transfers.",
        h1: "UNTOLD Dubai 2027 tickets",
        lede: "Two passes are on sale for UNTOLD Dubai 2027, Friday 19 to Sunday 21 March 2027: general admission (GA) and VIP. Each covers all three days. [prices] [editions.0.start] [editions.0.end] {{until prices}}On 6 November 2026 GA cost AED 350 and VIP AED 900, at untold.ae and at District by Zomato alike. [prices.0] [prices.1] [prices.2] [prices.3]{{/until}} Those are the organiser's own site and the seller it names as official, and it warns that tickets from anywhere else may be invalid. [sellers] [sellers_note]",
        cta: {
          href: "/go/untold-dubai-tickets/",
          label: "GA and VIP passes on untold.ae",
          title: "The organiser's own checkout for the UNTOLD Dubai 2027 passes",
          seller: "Sold by the organiser on untold.ae, or by District by Zomato. The booking is completed on the seller's site. [sellers.0] [sellers.1]",
          secondary: {
            href: "/go/untold-dubai-district/",
            label: "The same passes on District by Zomato",
            title: "District by Zomato's listing for UNTOLD Dubai 2027",
          },
        },
        faqHeading: "Questions about tickets",
        faq: [
          {
            q: "How much are UNTOLD Dubai tickets?",
            a: "Two three-day passes are on sale, GA and VIP.{{until prices}} On 6 November 2026 they were AED 350 and AED 900, at untold.ae and at District by Zomato.{{/until}} [prices.0] [prices.1] [prices.2] [prices.3] Source: the organiser's passes page and District's listing, read 6 November 2026.",
          },
          {
            q: "Where can I buy official UNTOLD Dubai tickets?",
            a: "At untold.ae, the organiser's own site, or from District by Zomato on its website or app, which the organiser calls its official ticketing partner. [sellers.0] [sellers.1] [sellers.2] Source: the organiser's FAQ, passes page and post of 16 October 2026, read 6 November 2026.",
          },
          {
            q: "Are there day tickets for UNTOLD Dubai 2027?",
            a: "None were on sale on 6 November 2026. Both passes on sale cover all three days. [not_found.7] [prices] Source: the organiser's passes page and District's listing, read 6 November 2026.",
          },
          {
            q: "Can I give my UNTOLD Dubai ticket to someone else?",
            a: "Yes, from your account with the Transfer button. Delete any check-in first, which is free. The wristband itself cannot be transferred. [practical.1] Source: the organiser's general terms, read 6 November 2026.",
          },
        ],
        sections: [
          {
            id: "passes",
            heading: "The two passes",
            body: "{{until prices}}On the organiser's passes page, read 6 November 2026, the two carry tier names: \"GA - 3 Day Pass - Early Bird\" at AED 350 and \"VIP - 3 Day Pass - Super Early Bird\" at AED 900. [prices.0] [prices.1] District by Zomato lists them as \"GA - 3 Day Pass\" and \"VIP - 3 Day Pass\", at the same AED 350 and AED 900. [prices.2] [prices.3]{{/until}} Early Bird and Super Early Bird are the organiser's own tier names. It has published no later tier and no later price. [not_found.5]\n\nVIP includes a VIP platform at the Mainstage, the organiser's pass description says. Both the VIP pass and the VIP area are 21+. [prices.1.note] [age.rules.4] GA has no such limit, and the rules for under-21s are in the [questions on age, entry and times](/untold-dubai/faq/#age). [age.rules]\n\nThe organiser's terms define the final price as the base price plus VAT. The pass listings show no tax line, so go by the total at checkout. [prices_note] [not_found.6] On 6 November 2026 no day tickets were on sale at either seller. [not_found.7]",
          },
          {
            id: "where-to-buy",
            heading: "Where to buy: untold.ae or District",
            body: "The organiser sells both passes on its own site, at untold.ae/passes, and checkout stays on untold.ae. The address untold.ae/tickets leads to the same page. [sellers.0] [sellers.0.note]\n\nDistrict by Zomato is the second official route. The organiser's FAQ puts it in one line: \"The official ticketing partner of UNTOLD Dubai is District by Zomato\". [sellers.1] District's listing is titled \"UNTOLD Dubai 2027\" and names UNTOLD EVENTS L.L.C as the organiser, though its web address still says 2026. [sellers.1.note] In search results the same listing also shows up at district.in. [sellers.1.note] The organiser's post of 16 October 2026 adds the District by Zomato app as a place to buy. [sellers.2]\n\nLinks: [UNTOLD Dubai, passes](/go/untold-dubai-tickets/) · [District by Zomato, UNTOLD Dubai 2027](/go/untold-dubai-district/)",
            cta: true,
          },
          {
            id: "elsewhere",
            heading: "Tickets from anywhere else",
            body: "A resale site buys ads on the searches for UNTOLD Dubai tickets and also ranks among the results. [sellers_note] [serp.queries.2.ads] The organiser's terms are plain about tickets bought that way. Products bought outside its site and its contractual partners \"are at the Product Buyer's own risk and may be invalid\". Reselling outside the official site or authorised platforms is forbidden. [sellers_note] The organiser names no official resale platform. [sellers_note] [not_found.13]",
          },
          {
            id: "changes",
            heading: "Refunds, and passing a ticket on",
            body: "Neither seller gives refunds now. [editions.1.refund_window.note] The organiser's window for refunds after the move shut on Friday 9 October 2026. What it covered is on the [new dates page](/untold-dubai/new-dates/#refunds). [editions.1.refund_window]\n\nIf you cannot go, the ticket can go to someone else. The organiser's terms let the holder pass it on from their own account, with the Transfer button. [practical.1] If you have already checked in, delete the check-in first, which costs nothing. [practical.1] The wristband is a different matter: it cannot be transferred. [practical.1]",
          },
          {
            id: "after",
            heading: "After you buy",
            body: "Once you have a pass, checking in online is compulsory, the pass descriptions say. [transport.5] Your wristband, the ID to bring and the desk where you collect it are on the [location page](/untold-dubai/location/#arriving). [transport.5]",
          },
        ],
        sourcesHeading: "Sources",
        sources: "- UNTOLD Dubai (untold.ae): the passes page, the FAQ on the new dates, the general terms and the news post of 16 October 2026, read 6 November 2026. [sources.s4] [sources.s3] [sources.s5] [sources.s2]\n- District by Zomato, the UNTOLD Dubai 2027 listing and its FAQ, read 6 November 2026. [sources.s9]",
        links: "",
      },
      {
        slug: "untold-dubai/location",
        createdAt: "2026-11-06T02:14:00+04:00",
        updatedAt: "2026-11-06T02:14:00+04:00",
        kind: "location",
        label: "Location",
        crumb: "Location",
        title: "Untold Dubai venue: Dubai Parks and Resorts — festival guide",
        description: "The UNTOLD Dubai festival is at Dubai Parks and Resorts on Sheikh Zayed Road: Red Line and DPR1 bus, the last bus back at 23:30, taxis, parking, wristbands.",
        h1: "UNTOLD Dubai venue: Dubai Parks and Resorts",
        lede: "UNTOLD Dubai 2027 is at Dubai Parks and Resorts, on Sheikh Zayed Road (E11) across from Palm Jebel Ali. [editions.0.venue] [venue.address] The organiser's own map point is 24.917793, 55.005838. [venue.lat] [venue.lon] Getting there is the easy half. Getting back is the half to plan, because the last bus from the resort to the metro leaves at 23:30. [transport.0]",
        faqHeading: "Questions about getting there",
        faq: [
          {
            q: "How do I get to UNTOLD Dubai by metro?",
            a: "Take the Red Line to Ibn Battuta and then the DPR1 bus, or to Life Pharmacy (formerly UAE Exchange), where the venue says taxis and shuttle buses wait. [transport.0] [transport.1] The last DPR1 back leaves the resort at 23:30. [transport.0] Source: Dubai Parks and Resorts and the RTA, read 6 November 2026.",
          },
          {
            q: "Is there parking at UNTOLD Dubai?",
            a: "District says there will be parking, with instructions sent by email closer to the date. No festival parking price is published. [transport.4] [not_found.3] Source: District's FAQ, read 6 November 2026.",
          },
          {
            q: "How do I get home from UNTOLD Dubai at night?",
            a: "By taxi or ride-hailing after 23:30, when the last bus has gone. Dubai Taxi, Careem and Uber use the taxi zone at the main gate. [transport.0] [transport.3] Source: Dubai Parks and Resorts, read 6 November 2026.",
          },
        ],
        sections: [
          {
            id: "venue",
            heading: "The venue",
            body: "Dubai Parks and Resorts is a theme-park resort with four parks, a water park and three hotels, according to its own site. [venue.also] The festival first came here for its second edition, from Thursday 6 to Sunday 9 November 2025, after a first edition at Expo City Dubai in February 2024. [editions.2.note] [editions.3.note] District's listing gives the address as \"Sheikh Zayed Rd - Dubai - United Arab Emirates\". [venue.also]\n\nLinks: [Open in maps](/go/untold-dubai-maps/) · [Dubai Parks and Resorts, how to get here](/go/untold-dubai-venue/)",
          },
          {
            id: "home",
            heading: "Getting home: the last bus is at 23:30",
            body: "The RTA bus DPR1 links the resort with Ibn Battuta Metro Station. The venue gives its last trip back from the resort at 23:30. [transport.0] The organiser's terms allow entry to the festival area until 03:00, so the night can run well past that bus. [editions.0.times.3] [transport.0] The organiser has published no shuttle or transport plan for March 2027. [not_found.2]\n\nFor the ride home after the last bus, the venue names Dubai Taxi, Careem and Uber, with a dedicated taxi zone at the main gate. [transport.3] Wheelchair-accessible taxis are available on request. [transport.3] If a driver is collecting you, limousines, taxis and private drivers use the drop-off next to the POD parking lots at VIP parking. [transport.3]",
          },
          {
            id: "metro",
            heading: "By metro and bus",
            body: "The venue says the Dubai Metro Red Line gives direct access from Downtown Dubai and DXB Airport. [transport.2] It names two stations on that line.\n\nFrom Ibn Battuta, the DPR1 bus leaves the Ibn Battuta Metro Station bus stop for the resort. The venue puts it at about every 75 minutes, 26 trips a day. The first bus leaves Ibn Battuta at 07:30 and the last at 22:50. Back from the resort, the first leaves at 08:10 and the last at 23:30. [transport.0]\n\nThe venue names UAE Exchange as its nearest station, and says taxis and shuttle buses wait at the station exit. [transport.1] The RTA renamed it Life Pharmacy Metro Station in 2025, with new signs going up between May and August that year. Look for Life Pharmacy (formerly UAE Exchange). [transport.1] [sources.s15]\n\nThe organiser and the venue give no journey time or fare from DXB or from Al Maktoum (DWC). [not_found.11]\n\nLinks: [RTA, the station's new name](/go/untold-dubai-rta/)",
          },
          {
            id: "car",
            heading: "By car, and parking",
            body: "Drive by Sheikh Zayed Road (E11) and follow the signs for Dubai Parks and Resorts. [transport.4] The venue's own directions give two different exit numbers, so the signs are the safer guide. [transport.4] [not_found.12]\n\nOn ordinary park days, visitor parking is free, the venue says. [transport.4] For the festival, District's FAQ says there will be parking, and that an email with parking instructions comes closer to the date. [transport.4] No price for festival parking has been published. [not_found.3]",
          },
          {
            id: "arriving",
            heading: "At the gate: check-\u2060in, wristband, ID",
            body: "Every ticket holder has to check in online before the festival, the pass descriptions say. [transport.5] Then collect your wristband at the Ticketing Desk outside the festival perimeter. The desk opens at 16:00 and closes at 02:00 on each festival day, the organiser's terms say. [transport.5] [editions.0.times.3]\n\nBring an identity card or passport. Entry needs it together with your ticket's QR code, and a photo of a QR code is not accepted. [transport.5] Expect a thorough search at entry as well. [practical.3] You may go in twice a day, and what you may carry through is in the [questions on age, entry and times](/untold-dubai/faq/#items). [practical.0]",
          },
        ],
        sourcesHeading: "Sources",
        sources: "- Dubai Parks and Resorts, park hours and how to get here, read 6 November 2026. [sources.s14]\n- RTA, \"RTA grants naming rights of metro station to Life Pharmacy\", 5 May 2025, read 6 November 2026. [sources.s15]\n- UNTOLD Dubai (untold.ae): the passes page, the general terms and the festival record behind the site, read 6 November 2026. [sources.s4] [sources.s5] [sources.s6]\n- District by Zomato, the UNTOLD Dubai 2027 listing and its FAQ, read 6 November 2026. [sources.s9]",
      },
      {
        slug: "untold-dubai/faq",
        createdAt: "2026-11-06T02:14:00+04:00",
        updatedAt: "2026-11-06T02:14:00+04:00",
        kind: "faq",
        label: "FAQ",
        crumb: "FAQ",
        title: "Untold Dubai 2027: age limit, entry, times — festival guide",
        description: "UNTOLD Dubai 2027 festival questions: the age rules at 16, 18 and 21, VIP 21+, start times, entries per day, what you can bring and paying by wristband.",
        h1: "UNTOLD Dubai 2027: age, entry and times",
        lede: "UNTOLD Dubai has no general minimum age. [age.min] All ages can go, but the rules change at 16, 18 and 21, and VIP is for those 21 and over. [age.rules] The answers below come from the organiser's general terms for the March 2027 edition and from District's FAQ, read 6 November 2026. [sources.s5] [sources.s9]",
        faqHeading: "Questions people ask",
        faqFirst: true,
        faq: [
          {
            q: "What is the age limit for UNTOLD Dubai?",
            a: "There is no general one. VIP passes and the VIP area are for people aged 21 and over. [age.min] [age.rules.4] Everyone under 21 wears a wristband of a different colour and is not allowed alcohol or cigarettes. [age.rules.3] Younger visitors need more documents, as the next answers set out. Source: the organiser's general terms, sections 4 and 10, read 6 November 2026.",
            id: "age",
          },
          {
            q: "Can under-16s go to UNTOLD Dubai?",
            a: "Yes, with an adult. They need a valid ticket, and anyone over 7 needs an identity document too. They also need a Parental Consent form signed by a parent, a guardian or an adult aged 21 or over, carried at entry. That adult has to stay with them and supervise them the whole time. [age.rules.0] [age.consent_form] Source: the organiser's general terms, section 10.1, and its Parental Consent page, read 6 November 2026.",
          },
          {
            q: "What do 16- to 21-year-olds need?",
            a: "From 16 to 18: a valid ticket, an identity document and the signed Parental Consent form, but no adult with them. [age.rules.1] From 18 to 21: a valid ticket and an identity document, and no form. [age.rules.2] Source: the organiser's general terms, sections 10.2 and 10.3, read 6 November 2026.",
          },
          {
            q: "Can I bring young children?",
            a: "The organiser does not recommend it for children under 7, because of the noise. Children under 4 must wear ear protection. [age.rules.5] Source: the organiser's general terms, sections 10.12 and 10.13, read 6 November 2026.",
          },
          {
            q: "What time does UNTOLD Dubai start and finish?",
            a: "The passes show 18:00 next to the dates, Friday 19 to Sunday 21 March 2027. [editions.0.times.0] The terms set a wider rule. The wristband desk is open from 16:00 to 02:00 on each festival day. Entry to the festival area runs from 16:00 until 03:00, the last admission, and updated times from the organiser take over. [editions.0.times.3] For the end of the last night the sources differ. The organiser's festival record ends at 23:55 on Sunday 21 March, and District's listing runs to 05:00 on Monday 22 March. [editions.0.times.1] [editions.0.times.2] [editions.0.times_note] No daily timetable or set times have been published. [not_found.1] Source: the organiser's passes page, terms and festival record, and District's listing, read 6 November 2026.",
            id: "times",
          },
          {
            q: "Can I leave and come back in?",
            a: "Yes, twice. The organiser's terms allow two entrances a day. District's FAQ simply says re-entry is permitted, and the organiser's rule is the one at the gate. [practical.0] Source: the organiser's general terms, section 9.3, and District's FAQ, read 6 November 2026.",
          },
          {
            q: "What can I bring into UNTOLD Dubai?",
            a: "The terms list compact cameras, GoPro cameras, small lightweight selfie sticks, power banks, lighters, lip balm, sun cream, non-flammable perfume or deodorant under 50 ml, and baby bottles. [practical.3] Every visitor is thoroughly searched. [practical.3] Source: the organiser's general terms, sections 9.6 and 9.10, read 6 November 2026.",
            id: "items",
          },
          {
            q: "Can I bring my medicine?",
            a: "You may bring 2 to 4 tablets of a common medicine, cut from the blister pack. Anything else needs a prescription. [practical.3] Source: the organiser's general terms, section 9.7, read 6 November 2026.",
          },
          {
            q: "How do I pay inside the festival?",
            a: "With your wristband. You load money onto it online by card, from My Balance after online check-in, or at the top-up points on site. [practical.2] Money left on the wristband can be refunded. On site, ask at any top-up point during the festival, with the wristband on your wrist. The organiser suggests doing it before you leave on your last day. Cash refunds there are capped at AED 1,500 if you topped up by bank card. [practical.2] Online top-ups can also be refunded online, by the date the organiser announces, either to your card for a fee or to your account balance for free. Money topped up on site can be refunded only on site, during the festival. Anything left unclaimed becomes the festival's. [practical.2] The account balance is a separate case. Money converted there into Rhuna, the platform's voucher currency, can be turned back into cash only in exceptional cases. [practical.2] Source: the organiser's general terms, sections 4.22, 7 and 8, read 6 November 2026.",
          },
          {
            q: "Is alcohol sold at UNTOLD Dubai, and can I smoke?",
            a: "District's FAQ says food, drinks and alcohol are sold on site, and that there is a designated smoking area. [practical.4] Under-21s may have neither alcohol nor cigarettes. [age.rules.3] Source: District's FAQ and the organiser's general terms, read 6 November 2026.",
          },
          {
            q: "Is UNTOLD Dubai wheelchair accessible?",
            a: "District's FAQ says the venue has wheelchair access and facilities for People of Determination. [practical.4] More on wheelchair-accessible taxis is on the [location page](/untold-dubai/location/#home). [transport.3] Source: District's FAQ, read 6 November 2026.",
          },
        ],
        sections: [
          {
            id: "before",
            heading: "Sun, and what to wear",
            body: "The organiser's terms warn that some areas may be in direct sun or heat. Drink enough and use sun protection. [practical.5] Sun cream is on the list of things you may bring. [practical.3] The organiser publishes no dress code in its FAQ or its terms, and District's page has none either. [not_found.8]",
          },
        ],
        sourcesHeading: "Sources",
        sources: "- UNTOLD Dubai (untold.ae): the general terms (event dated 19–21 March 2027), the Parental Consent page, the passes page and the festival record behind the site, read 6 November 2026. [sources.s5] [sources.s8] [sources.s4] [sources.s6]\n- District by Zomato, the UNTOLD Dubai 2027 listing and its FAQ, read 6 November 2026. [sources.s9]",
        links: "",
      },
      {
        slug: "untold-dubai/new-dates",
        createdAt: "2026-11-06T02:14:00+04:00",
        updatedAt: "2026-11-06T02:14:00+04:00",
        kind: "new-dates",
        label: "New dates",
        crumb: "New dates",
        title: "Untold Dubai 2026 moved to 19–21 March 2027 — festival guide",
        description: "The UNTOLD Dubai festival moved from 5–8 November 2026 to 19–21 March 2027 at Dubai Parks and Resorts: tickets stay valid, refunds, transfers.",
        h1: "UNTOLD Dubai 2026: the move to March 2027",
        lede: "The UNTOLD Dubai edition planned for Thursday 5 to Sunday 8 November 2026 moved to Friday 19 to Sunday 21 March 2027. It stays at Dubai Parks and Resorts. [editions.1.note] [editions.0.start] [editions.0.end] [editions.0.announcement.1] Tickets already bought are valid for March automatically, the organiser says, with no exchange and no reissue. [editions.0.announcement.0] [editions.0.announcement.1]",
        faqHeading: "Questions about the move",
        faq: [
          {
            q: "When is UNTOLD Dubai 2026?",
            a: "UNTOLD Dubai has no edition in 2026. The one planned for 5 to 8 November 2026 moved to Friday 19 to Sunday 21 March 2027, at Dubai Parks and Resorts. [editions.1.status] [editions.0] Source: the organiser's post of 16 October 2026 and its FAQ, read 6 November 2026.",
          },
          {
            q: "Why was UNTOLD Dubai moved to March 2027?",
            a: "For \"a stronger edition of the festival and a better experience\", says the organiser's FAQ. Its post with the new dates spells out what that means, from the lineup to a new festival map. [editions.0.announcement.1] [editions.0.announcement.0] Source: the organiser's FAQ and post of 16 October 2026, read 6 November 2026.",
          },
          {
            q: "Are my November\u00a02026\u00a0tickets valid for March 2027?",
            a: "Yes, automatically, with no exchange or reissue. [editions.0.announcement.0] [editions.0.announcement.1] Source: the organiser's FAQ and post of 16 October 2026, read 6 November 2026.",
          },
          {
            q: "Can I still get a refund for UNTOLD Dubai tickets?",
            a: "The refund window for the move closed on Friday 9 October 2026 at 23:59. Paid orders cannot now be returned, and later requests fall under the ticketing terms. [editions.1.refund_window] [editions.1.refund_window.note] Source: the organiser's FAQ and passes page, and District's FAQ, read 6 November 2026.",
          },
        ],
        sections: [
          {
            id: "announced",
            heading: "What the organiser announced",
            body: "The organiser's news post \"UNTOLD Dubai has new dates: March 19–21, 2027\" is dated Friday 16 October 2026. [editions.0.announcement.0] Its reason, in its own words, is a stronger lineup, new stage productions and a new festival map built just for Dubai. [editions.0.announcement.0] Its FAQ on the move puts it more briefly: \"a stronger edition of the festival and a better experience\". [editions.0.announcement.1] Neither page gives any other reason. [not_found.10]\n\nThe post also says the lineup and new experiences will be announced soon. It sends buyers for 19 to 21 March to untold.ae or the District by Zomato app. [editions.0.announcement.0]\n\nLinks: [The organiser's post with the new dates](/go/untold-dubai-news/) · [The organiser's FAQ on the new dates](/go/untold-dubai-faq/)",
          },
          {
            id: "tickets",
            heading: "Your November tickets",
            body: "Every ticket bought for November is valid for 19 to 21 March 2027, the post and the FAQ both say. There is nothing to exchange, and no ticket is reissued. [editions.0.announcement.0] [editions.0.announcement.1] The March edition runs three days and nights, where the November dates spanned four days. [editions.0.days] [editions.1.start] [editions.1.end]\n\nIf March does not suit you, the ticket can go to someone else through your account, under the organiser's terms. The wristband cannot. [practical.1] How that works is on the [tickets page](/untold-dubai/tickets/#changes).",
          },
          {
            id: "refunds",
            heading: "Refunds: the window closed on 9 October 2026",
            body: "The organiser's FAQ on the move offered refunds until Friday 9 October 2026 at 23:59. [editions.1.refund_window] Refunds in that window included the fees. The money goes back to the original payment method, which the FAQ says takes about 5 to 14 working days. [editions.1.refund_window] For a refund request, the FAQ sent untold.ae buyers to ask@untold.ae and District buyers to eventsupport@district.ae. [editions.1.refund_window]\n\nRequests after the deadline are handled under the ticketing terms, the FAQ says. [editions.1.refund_window] Both passes now carry the line \"Paid orders cannot be returned\", and District's FAQ says its tickets are \"non-refundable once purchased\". [editions.1.refund_window.note]",
          },
          {
            id: "editions",
            heading: "February, November, now March",
            body: "The first UNTOLD Dubai ran from Thursday 15 to Sunday 18 February 2024 at Expo City Dubai. [editions.3] [editions.3.note] The second moved to Dubai Parks and Resorts and ran over four days and four nights, Thursday 6 to Sunday 9 November 2025. [editions.2] [editions.2.note] The organiser says 190,000 people came, across six stages. [editions.2.note]\n\nThe third was set for early November again, Thursday 5 to Sunday 8 November 2026. The organiser's home page carried those dates in its title, as archived on 14 July 2026. [editions.1.note] [sources.s10] March 2027 makes it the first UNTOLD Dubai in March.",
          },
          {
            id: "search",
            heading: "If search shows November",
            body: "On 6 November 2026, Google's date box for UNTOLD Dubai still read \"Thu, Nov 5, 2026 – Sun, Nov 8, 2026\". [serp.queries.0.panel] [editions.1.note] Those are the old dates. A playlist and a Facebook post with the November 2026 dates also turn up in the results. [serp.queries.0.hosts] [questions.1.seen] The dates the organiser and District give now are Friday 19 to Sunday 21 March 2027. [editions.0] [sources.s4] [sources.s9]",
          },
        ],
        sourcesHeading: "Sources",
        sources: "- UNTOLD Dubai (untold.ae): the news post of 16 October 2026, the FAQ on the new dates, the passes page and the general terms, read 6 November 2026. [sources.s2] [sources.s3] [sources.s4] [sources.s5]\n- The organiser's site as archived on 14 July 2026, 29 September 2025 and 9 January 2024, read 6 November 2026. [sources.s10] [sources.s11] [sources.s12]\n- District by Zomato, the UNTOLD Dubai 2027 listing and its FAQ, read 6 November 2026. [sources.s9]\n- Google search for \"untold dubai\", hl=en gl=ae, 6 November 2026, for the date box. [serp.queries.0]",
      },
    ],
  },
];
