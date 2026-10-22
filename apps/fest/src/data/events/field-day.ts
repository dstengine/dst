// Field Day: the event as the scout's sheet has it, and its guide.
//
// Generated once from the card (~/mind/ai/dubai/events/tasks/
// 2026-10-21-field-day-en.md) and edited by hand from here on: the sheet is
// section 1's YAML with the scout's repairs merged, values verbatim, each
// keeping its readOn. The card's working notes (the SERP as measured, the
// planned paths, the segment) are no page's facts and stay on the card. The
// copy is the writer's round 3 with the session's three edits after gate 2,
// [key] tags and "→ /path/" arrows left in; copy.ts turns it into HTML. The
// only additions to the approved strings are marks, which a verbatim
// comparison strips:
// - {{until key}}…{{/until}} spans round every dollar figure and round the
//   MobTix window, which the build drops from the dates in `expires`;
// - [label](/go/…) on words the copy already has, where the copy put
//   "→ /go/…" after them (the fest director's gate-3 conditions 1 to 4), and
//   [the section below](/field-day/faq/#cant-bring);
// - **label** on the seven price cards (copy.ts, ul.cards);
// - the sources one to a line: the writer's " · " is drawn by the
//   stylesheet between them (theme.css, .sources-row), so a line never
//   starts or ends with it.
//
// The layout is what tools/record-blocks.mjs reads: each record opens on a
// line that is a brace at two spaces (a guide's pages at six), its slug on
// the next line, and both dates on lines of their own. Each page is dated on
// its own, so the take-down of the prices and the MobTix form on 2 December
// re-dates the main, tickets and FAQ pages and leaves the lineup alone. A
// sheet edit is the event's, and moves every page through `with` in
// ../../dated.ts.
//
// No @dst/* import and nothing but erasable TypeScript: tools/lastmod.mjs
// loads this file through dated.ts with Node's type stripping.
import type { FestEvent, Guide } from "../types";
export const events: FestEvent[] = [
  {
    slug: "field-day",
    createdAt: "2026-10-22T14:55:00+04:00",
    updatedAt: "2026-10-22T14:55:00+04:00",
    name: "Field Day",
    edition: { start: "2027-01-01", end: "2027-01-01" },
    // The event block carries no readOn of its own; the scout read it on
    // 21 October with the organiser's page (s1).
    readOverrides: { "event.organiser": "2026-10-21", "event.name_forms": "2026-10-21" },
    // The MusicEvent on the guide's main page (rules.ts): what the sheet
    // holds only as prose, written out once. The start is Moshtix's
    // "12:00pm, Fri 1 January, 2027" and the end the Botanic Gardens'
    // "12pm - 11pm" (editions.0.note, s3 and s7), at AEDT
    // (editions.0.utc_offset_on_event); the organiser is Fuzzy at s5
    // (event.organiser). The offers are the five GA releases and VIP,
    // prices.0 and prices.3 to prices.7, sold by Moshtix (sellers.0), each at
    // the total Moshtix prints with its fee (rules.ts, Price.total), valid
    // from the general on-sale, "12pm AEST, 10 September 2026"
    // (sales_timeline.5). Left out: the Fast Forward Pass, an add-on to a GA
    // ticket, and MobTix and Affordability Tix, sold by request.
    markup: {
      startDate: "2027-01-01T12:00:00+11:00",
      endDate: "2027-01-01T23:00:00+11:00",
      organizer: { name: "Fuzzy", url: "https://fuzzy.com.au/" },
      offers: { prices: [0, 3, 4, 5, 6, 7], go: "tickets", seller: "Moshtix", validFrom: "2026-09-10T12:00:00+10:00" },
    },
    sheet: {
      event: {
        name: "Field Day",
        slug: "field-day",
        organiser: "Fuzzy (Fuzzy Events Pty Ltd; the event's own entity in the terms is Field Day New Years Day Pty Ltd, ABN 13 095 488 396)",
        kind: "music festival",
        camping: false,
        one_day: true,
        name_forms: "Organiser (s1): 'Field Day' and 'Field Day 2027' ('When and where is Field Day 2027?', 'Where can I buy Field Day 2027 tickets?'); page title 'Home Page - Field Day'; tagline 'The only way for New Year's Day'. Fuzzy (s5): 'Field Day 2027 — 1 January 2027 — Gadigal Country / The Domain Sydney'. Moshtix (s3): 'Field Day 2027 — A festival by Fuzzy — The Domain, NSW'. Venue (s7): 'Field Day, Sydney/Gadigal Country's biggest New Year's Day'. 'Field Day Sydney' appears officially only in the social handles @fielddaysyd and @field_day_sydney; media say 'Sydney's annual New Year's Day festival' (s12). No official page is titled 'Field Day Sydney'. For the page: h1 'Field Day', body copy 'Field Day 2027 at The Domain, Sydney, on New Year's Day', and one disambiguating sentence (not the Warrandyte market, not Field Day London, not the Hamilton field days).",
      },
      editions: [
        {
          year: 2027,
          start: "2027-01-01",
          end: "2027-01-01",
          start_time: "12:00",
          end_time: "23:00",
          timezone: "Australia/Sydney",
          utc_offset_on_event: "+11:00 (AEDT)",
          status: "announced",
          on_sale: true,
          sold_out: false,
          venue: "v1",
          source: "s1",
          readOn: "2026-10-21",
          note: "Organiser: 'Field Day returns to Gadigal Country at The Domain, Sydney on Friday 1 January 2027' (s1). Start 12:00pm on Moshtix ('12:00pm, Fri 1 January, 2027', s3); the venue's listing prints '12pm - 11pm' (s7); the organiser prints no hours. The 11pm finish rests on the Botanic Gardens' listing alone: Moshtix's '11:00pm' is the sales close, not the finish, and fieldday.com.au gives no hours (re-read 2026-10-22). Sales close '11:00pm, Fri 1 Jan, 2027' on every tier except the 18–25s, which closed '11:00am, Thu 10 Sep, 2026' (s3; gate 2 item 10, 'on every GA tier' corrected). Not sold out: Second, Third and Final Release GA, VIP and Fast Forward were buyable on 2026-10-21; 18–25 and First Release show 'Allocation Exhausted' (s3).",
        },
        {
          year: 2026,
          start: "2026-01-01",
          end: "2026-01-01",
          status: "past",
          venue: "v1",
          source: "s13",
          readOn: "2026-10-21",
          note: "Thursday 1 January 2026, The Domain, Gadigal Country; headliners Carl Cox and Jamie Jones — The Note's announcement wording, 28 Oct 2025, verbatim: 'announcing a special solo back-to-back sets from legendary British DJ Carl Cox and Welsh producer Jamie Jones' (a booking as announced; nothing read says what was played; gate 2 item 12) — with Deborah De Luca, Kölsch, Patrick Topping, The Presets; presale 12pm AEDT Wed 29 Oct 2025, general on sale 12pm AEDT Thu 30 Oct 2025; line-up announced 28 Oct 2025 (s13, media). The organiser calls it the 25-years edition: 'now taking over The Domain on New Years Day for Field Day – celebrating 25 years in 2026' (s6). Camp Ground stage debuted in 2026 (s13).",
        },
      ],
      history: [
        {
          fact: "Fuzzy: 'From Sublime, a cult club night in 1996, to creating Parklife, Field Day, Harbourlife, Shore Thing and Listen Out, we've spent three decades building music experiences'",
          source: "s5",
          readOn: "2026-10-21",
        },
        {
          fact: "Fuzzy about page: Flume won a triple j Unearthed slot at Field Day and returned as headliner in 2018; '25 years in 2026'",
          source: "s6",
          readOn: "2026-10-21",
        },
        {
          fact: "Media: 'more than 500,000 people' have attended over the festival's history; 2027 is the edition after the 25th anniversary",
          source: "s12",
          readOn: "2026-10-21",
          note: "media figure; print attributed or drop",
        },
        {
          fact: "Organiser's positioning: 'no tents, no campsite, no long haul home. Just 100% dance in the middle of Sydney'; three stages: Centre Field (main), Tree Top, Casamigos Camp Ground",
          source: "s1",
          readOn: "2026-10-22",
          venue_listing: "The Botanic Gardens' listing (s7), which refers to Fuzzy in the third person, adds: 'the return of Casamigos Camp Ground', 'proudly curated by the LGBTQIA+ community', and Major Lazer 'making their return to Australia for the first time in 11 years'; The Note of 1 Sep 2026 (s12) carries both claims too. Neither phrase is on fieldday.com.au or Fuzzy's event page (read 2026-10-22). Credit them to the listing and The Note, not the organiser. Gate 2 item 11.",
        },
      ],
      public_holiday: {
        date: "2027-01-01",
        weekday: "Friday",
        name: "New Year's Day",
        state: "NSW",
        source: "s18",
        readOn: "2026-10-22",
        note: "NSW Government, table 'NSW public holidays 2026 to 2027', row 'New Year's Day — Thursday 1 January 2026 — Friday 1 January 2027'. Gate 2 item 7; the Trip Planner's public-holiday timetable applies that day.",
      },
      venue: {
        key: "v1",
        name: "The Domain",
        address: "Art Gallery Road, Sydney NSW 2000",
        address_venue_page: "Mrs Macquaries Rd, Sydney NSW 2000",
        lat: -33.868836,
        lon: 151.214573,
        city: "Sydney",
        state: "NSW",
        country: "AU",
        timezone: "Australia/Sydney",
        manager: "Botanic Gardens of Sydney (Royal Botanic Gardens and Domain Trust)",
        capacity: "up to 50,000 (venue hire page)",
        precinct: "Phillip Precinct ('The Domain')",
        source: "s7",
        address_source: "s3",
        coords_source: "s8",
        readOn: "2026-10-21",
        note: "Address as Moshtix prints it for the venue, 'Art Gallery Road, Sydney NSW 2000', 'on the eastern edge of the Sydney central business district, near Woolloomooloo' (s3 venue page, https://moshtix.com.au/v2/venues/the-domain/607). The venue's own hire page gives 'Mrs Macquaries Rd, Sydney NSW 2000' and its map marker lat -33.868836254518, lng 151.21457285918 (s8, in the page's map component). City of Sydney lists the combined park at Mrs Macquaries Road, Sydney 2000, 'The Domain: Monday to Sunday, open 24 hours', marker -33.86419, 151.21657 (s9; that marker is the Garden end, not the Domain lawn). The Domain and the Royal Botanic Garden are on the NSW State Heritage Register (s9).",
      },
      gates: [
        {
          what: "Event hours",
          when: "12pm – 11pm, Friday 1 January 2027 (AEDT)",
          source: "s7",
          readOn: "2026-10-21",
          note: "venue listing; Moshtix start 12:00pm (s3); the organiser says 'we'll share detailed transport info closer to the event' and prints no gate time (s1)",
        },
        {
          what: "Re-entry",
          when: "none: 'pass-outs and re-entry are not permitted' (s1); terms 'No passouts will be permitted, unless otherwise advised' (s4)",
          source: "s1",
          readOn: "2026-10-21",
        },
        {
          what: "Entry lanes",
          when: "dedicated lanes for 18–25 tickets (ID checked against name and date of birth), Fast Forward, VIP and accessible tickets",
          source: "s1",
          readOn: "2026-10-21",
        },
      ],
      sellers: [
        {
          key: "moshtix",
          name: "Moshtix",
          url: "https://moshtix.com.au/v2/event/field-day-2027/199201",
          official: true,
          role: "the only seller: 'Field Day 2027 tickets are sold via Moshtix and Moshtix only' (s1); 'Moshtix is the only official online ticketing outlet' (s3)",
          source: "s1",
          readOn: "2026-10-21",
          note: "the organiser links it with ?skin=FD27&lid=…; link through /go/ to the plain URL. Moshtix adds $10.00 fees per GA/VIP ticket and $5.00 per Fast Forward; 'Total price is in AUD and includes GST and service fees'; $12.50 reissue fee for a wrong name or DOB; quantity selector 1–10 (s3).",
        },
        {
          key: "presale",
          name: "Field Day presale sign-up (Tradable Bits)",
          url: "https://tradablebits.com/tb_app/556743917",
          official: true,
          role: "presale registration; 'A unique presale link will be sent via SMS on the morning of 9 September'",
          source: "s1",
          readOn: "2026-10-21",
          note: "the presale closed 10 Sep 2026; keep only as history",
        },
        {
          key: "mobtix",
          name: "MobTix entry form (Google Form)",
          url: "https://docs.google.com/forms/d/e/1FAIpQLSfLU-ADVIrwZg0MM1IrcXyF8FPCi3NSFJpTKW08vun9TMOSbw/viewform",
          official: true,
          role: "affordability ticket request for Aboriginal and Torres Strait Islander people, $99.90 + fees",
          source: "s1",
          readOn: "2026-10-21",
          link_policy: "not linked unless a window is open",
          window: "open on 2026-10-21: the form ('FD27 MobTix Form') says 'MobTix entries for Field Day are open now!'; 'Entries open: 1 September 2026', 'Entries close: 1 December 2026', 'Purchase your ticket by: 31 December 2026'; one (1) General Admission ticket for $99.90 + booking fees; entries checked once per fortnight, codes emailed to successful entrants, 'only available until allocations are exhausted'; questions tickets@fuzzy.com.au",
          form_readOn: "2026-10-21",
          note: "a Google Form; linkable via /go/field-day-mobtix/ while the window is open, i.e. until 1 Dec 2026; after that the link comes off",
        },
        {
          key: "affordability",
          name: "Affordability Tix entry form (Google Form)",
          url: "https://docs.google.com/forms/d/e/1FAIpQLSds3Esbu72bdK9BmYI_o8jTgR_a1LQu5j45yDmK5wDAtFHJpg/viewform",
          official: true,
          role: "affordability ticket request for selected Concession Card holders / eligible government payments, $99.90 + fees",
          source: "s1",
          readOn: "2026-10-21",
          link_policy: "not linked unless a window is open",
          window: "unknown: the form answers HTTP 401 and a Google sign-in wall to curl on 2026-10-21 (the owner restricted it to signed-in accounts); the organiser's page (s1) names it with no dates",
          note: "do not link until someone reads the form in a signed-in browser and records its window; describe it in words from s1 only",
        },
      ],
      resale: {
        official: "none",
        source: "s1",
        readOn: "2026-10-21",
        note: "Rule 5: no official resale is named. Organiser: 'Be wary of scammers and unofficial resale' (s1). Fuzzy's terms 2.3: 'we may offer an official resale facility once an event has sold out'; 'Every ticket sold via our official resale facility must be sold at the original ticket price (plus associated fees)'; 'We reserve the right to open and close our resale facility at any time.' Terms 2.4, headed 'Permitted transfers for events in NSW, SA and WA', verbatim: 'There are laws in place in certain states that prohibit resale of tickets to certain events or limit the prices at which they may be resold. As a ticket purchaser, you are responsible for complying with any such laws. If you do not comply these laws then any resale will be a breach of these T&Cs.' (s4, read 2026-10-22; gate 2 item 2: the earlier 'NSW law limits resale prices' named a state's rule and a cap the terms do not give, and is withdrawn). Tixel is NOT named by the organiser for Field Day 2027: do not link it. Name changes: 'We may offer a ticket name-change service for certain events', friends and family only, fee per ticket, tickets@fuzzy.com.au (s4); 18–25 tickets cannot be name-changed (s1).",
      },
      sales_timeline: [
        {
          what: "Line-up announced (Major Lazer, Sub Focus, 'secret headliner', full undercard)",
          when: "2026-08-31",
          source: "s12",
          readOn: "2026-10-21",
          note: "The Note's byline reads 1 September 2026 (AEST morning of 1 Sep = 31 Aug UTC); organiser pages carry no date; the organiser's home page JSON-LD datePublished is 2026-08-31T22:03:54+00:00 (s1), i.e. 1 Sep 2026 08:03 AEST. Print 'announced 1 September 2026 (AEST)'.",
        },
        {
          what: "18–25 Ticket Request opens",
          when: "12pm AEST, 2 September 2026",
          source: "s1",
          readOn: "2026-10-21",
        },
        {
          what: "18–25 Ticket Request closes",
          when: "11:59pm AEST, 6 September 2026",
          source: "s1",
          readOn: "2026-10-21",
        },
        {
          what: "Ticket Requests fulfilled",
          when: "7 September 2026",
          source: "s1",
          readOn: "2026-10-21",
        },
        {
          what: "Presale",
          when: "12pm AEST 9 September to 11am AEST 10 September 2026, 'or until presale allocations are exhausted'",
          source: "s1",
          readOn: "2026-10-21",
        },
        {
          what: "General on sale",
          when: "12pm AEST, 10 September 2026",
          source: "s1",
          readOn: "2026-10-21",
        },
        {
          what: "Mall Grab revealed as the third ('secret') headliner",
          when: "2026-10-16",
          source: "s14",
          readOn: "2026-10-21",
          note: "media (The Note, Rolling Stone AU, both 16 Oct 2026); the organiser's home page dateModified is 2026-10-15T21:06:48+00:00 = 16 Oct 2026 08:06 AEDT (s1)",
        },
        {
          what: "Sales close",
          when: "11:00pm, Fri 1 Jan 2027 for every tier except the 18–25s; the 18–25s row reads 'Sales Close: 11:00am, Thu 10 Sep, 2026'",
          source: "s3",
          readOn: "2026-10-22",
          repaired: "gate 2 item 10: 'all tiers' was wrong",
        },
      ],
      // organiser prices 'excl. fees' (s1); Moshtix adds the fee and prints both (s3); AUD incl. GST
      prices: [
        {
          label: "18–25s ticket (ballot, ages 18–25 on 1 Jan 2027)",
          amount: 99.90,
          fees: 10.00,
          total: 109.90,
          currency: "AUD",
          seller: "moshtix",
          status: "Allocation Exhausted; entries closed",
          source: "s3",
          readOn: "2026-10-21",
          allocation: {
            how: "by random draw from requests, charged automatically on success",
            source: "s1",
            seller_source: "s3",
            readOn: "2026-10-22",
            quotes: "Organiser FAQ (s1): 'Once the Ticket Request period closes, successful applicants will be selected at random from all eligible requests.' 'When you submit your request, Moshtix will place a temporary hold on your payment method for the full amount. If your request is successful, payment will be processed automatically. If you're unsuccessful, the hold will be released.' 'There is a limited allocation available, so submitting a request gives you the chance to purchase a ticket but does not guarantee one.' Moshtix (s3): 'The total cost of your request will be held on your card for up to 7 days.' 'If your request is successful, your card will be automatically charged.' Moshtix does not say 'random'. Gate 2 round 2 item 1.",
          },
        },
        {
          label: "MobTix (Aboriginal and Torres Strait Islander people)",
          amount: 99.90,
          currency: "AUD",
          seller: "mobtix",
          note: "+ fees; by request form",
          source: "s1",
          readOn: "2026-10-21",
        },
        {
          label: "Affordability Tix (selected concession cards / eligible government payments)",
          amount: 99.90,
          currency: "AUD",
          seller: "affordability",
          note: "+ fees; by request form",
          source: "s1",
          readOn: "2026-10-21",
        },
        {
          label: "General Admission, First Release",
          amount: 189.90,
          fees: 10.00,
          total: 199.90,
          currency: "AUD",
          seller: "moshtix",
          status: "Allocation Exhausted",
          source: "s3",
          readOn: "2026-10-21",
        },
        {
          label: "General Admission, Second Release",
          amount: 209.90,
          fees: 10.00,
          total: 219.90,
          currency: "AUD",
          seller: "moshtix",
          status: "on sale: quantity selector 1–10, no 'Allocation Exhausted' (Moshtix, read 2026-10-21; the cheapest ticket a buyer can choose that day, $219.90 incl. fees)",
          source: "s3",
          readOn: "2026-10-21",
        },
        {
          label: "General Admission, Third Release",
          amount: 219.90,
          fees: 10.00,
          total: 229.90,
          currency: "AUD",
          seller: "moshtix",
          status: "on sale: quantity selector 1–10, no 'Allocation Exhausted' (Moshtix, read 2026-10-21)",
          source: "s3",
          readOn: "2026-10-21",
        },
        {
          label: "General Admission, Final Release",
          amount: 239.90,
          fees: 10.00,
          total: 249.90,
          currency: "AUD",
          seller: "moshtix",
          status: "on sale: quantity selector 1–10, no 'Allocation Exhausted' (Moshtix, read 2026-10-21)",
          source: "s3",
          readOn: "2026-10-21",
        },
        {
          label: "VIP (exclusive VIP area with dedicated bar and toilets, own entry lane, viewing platform at the Centre Field stage)",
          amount: 299.90,
          fees: 10.00,
          total: 309.90,
          currency: "AUD",
          seller: "moshtix",
          status: "on sale",
          source: "s3",
          readOn: "2026-10-21",
        },
        {
          label: "Fast Forward add-on (dedicated entry lane, express bar and toilet lanes; must be bought with a GA ticket)",
          seller_label: "FAST FORWARD PASS | Must be paired with a GA festival ticket",
          seller_label_note: "Moshtix's ticket row, under its 'FAST FORWARD' heading (s3, read 2026-10-22); the organiser's label is 'Fast Forward add-on' (s1); 'GA' is Moshtix's abbreviation on the row. Gate 2 item 6.",
          amount: 39.90,
          fees: 5.00,
          total: 44.90,
          currency: "AUD",
          seller: "moshtix",
          status: "on sale",
          source: "s3",
          readOn: "2026-10-21",
        },
        {
          label: "Venue listing: 'Prices start from $109.90'",
          amount: 109.90,
          currency: "AUD",
          seller: "moshtix",
          source: "s7",
          readOn: "2026-10-21",
          note: "that is the 18–25 ticket incl. fee, which Moshtix marks 'Allocation Exhausted'; the cheapest ticket a buyer can choose on 21 Oct 2026 is Second Release at $209.90 + $10.00 fees = $219.90 (s3). Moshtix's own line 'Tickets from $99.90+fees' refers to the exhausted and form-only tiers.",
        },
        {
          label: "Payment plans",
          amount: null,
          currency: "AUD",
          seller: "moshtix",
          note: "'Afterpay and PayPal Pay in 4 are available via Moshtix during the presale and general on sale. Payment plans are not available for the 18-25s Ticket.'",
          source: "s1",
          readOn: "2026-10-21",
        },
      ],
      age: {
        min: 18,
        source: "s1",
        readOn: "2026-10-21",
        note: "'The event is strictly 18+, so you'll need valid photo ID to enter' (s1); Moshtix 'You need to be 18+ to attend this event' (s3). Accepted ID per Fuzzy's terms: current photo driver's licence, current passport, an accepted Proof of Age card (s4). 18–25 ticket: born between 2 January 2001 and 1 January 2009 inclusive (s1).",
      },
      lineup: {
        announcedOn: "2026-08-31",
        announced_note: "undercard and two headliners 1 Sep 2026 AEST (s12); Mall Grab added 16 Oct 2026 (s14); organiser pages print no dates",
        source: "s1",
        readOn: "2026-10-21",
        headliners: ["Major Lazer", "Mall Grab", "Sub Focus"],
        headliners_stage: {
          stage: "Centre Field",
          source: ["s2", "s3"],
          readOn: "2026-10-22",
          note: "Fuzzy's event page prints 'CENTRE FIELD / Major Lazer | Mall Grab | Sub Focus / (A-Z) …' (s2); Moshtix prints the same under '2027 LINEUP / CENTRE FIELD' (s3); fieldday.com.au prints the three above 'CENTRE FIELD (A-Z)' with no stage of their own (s1). Gate 2 item 5.",
        },
        centre_field_az: ["Andy C", "Elderbrook", "Hannah Laing", "Łaszewo", "nimino"],
        centre_field_plus: ["MAD.DAY", "Tiff Cornish"],
        tree_top_az: [
          "Boys Noize",
          "Club Angel",
          "Funk Tribu",
          "Joe Hunt",
          "Julian Fijma",
          "MPH",
          "Oppidan",
          "southstar",
          "WOLTERS",
        ],
        tree_top_plus: ["Cassette", "Stacie Fields"],
        casamigos_camp_ground_az: [
          "2charm",
          "Disco Dora",
          "Fried Pork Chop",
          "Jawbreakers",
          "Latifa Tee",
          "Loosie Grind",
          "TANZER",
          "Tiddalicious",
        ],
        note: "Order and casing as on fieldday.com.au (s1). 'Jawbreakers' is on the organiser's site only; Moshtix (s3), Fuzzy's event page (s2: 'CASAMIGOS CAMP GROUND (A-Z) / 2charm | Disco Dora | Fried Pork Chop | Latifa Tee | Loosie Grind | TANZER | Tiddalicious', read 2026-10-22) and the 16 Oct media lists omit it — Fuzzy's home page (s5) prints no line-up at all, so it is not a source either way (gate 2 round 2 item 3); Moshtix writes 'Mad.Day'. Media claims not on the organiser's pages: Major Lazer's 'first Australian visit in more than a decade' / 'first time in 11 years' (s12, s14; the Botanic Gardens' listing also says 'making their return to Australia for the first time in 11 years', s7 — the venue's page, which names Fuzzy in the third person; gate 2 item 11); Mall Grab 'one of Australia's biggest dance exports' (s14). Set times: none published; the organiser's terms allow it to 'add, withdraw or substitute artists' (s4).",
      },
      transport: [
        {
          how: "Organiser: 'We strongly recommend using public transport to get to and from The Domain and we'll share detailed transport info closer to the event.'",
          source: "s1",
          readOn: "2026-10-21",
        },
        {
          how: "Nearest stations (venue's word): 'St James, Martin Place and Circular Quay stations are all about a 10-minute walk'; ferries to Circular Quay, 'an easy 10-minute walk from the wharves'; bus 441 from the York Street side of the Queen Victoria Building drops near the Art Gallery and returns from outside it; bus 200 (Chatswood–Bondi) stops on Macquarie Street in weekday peaks; 'Drop-off and pick-up zone on Art Gallery Road near the front of the Art Gallery'; bicycle parking along Art Gallery Road; Transport Infoline 131 500 and transportnsw.info",
          source: "s10",
          readOn: "2026-10-21",
          note: "the venue's getting-here page is written for the Royal Botanic Garden, which adjoins The Domain; the Domain lawn is nearer St James than Circular Quay",
        },
        {
          how: "From Sydney Airport: the T8 Airport & South Line serves both airport stations, 'services every day between 5am and midnight'; stations are under the terminals (Domestic: lift or escalator near baggage carousel 1 in T2 and T3; International: T1 Arrivals, Exit A, turn right to the end). A station access fee is added to the train fare, charged by the Airport Link Company: adult $18.61 (weekly cap $37.75; $19.00 on an Opal single ticket), child/youth and concession $16.64. Opal cards sold at the airport stations with a $35 minimum top-up; contactless cards accepted. Buses 350 (Domestic–Bondi Junction), 420 (Burwood–Mascot via both terminals), N20 (night, International–City, midnight to 4am). Taxi flat fare airport to CBD $60 ($80 maxi), trial since 3 Nov 2025",
          source: "s11",
          readOn: "2026-10-21",
          note: "Session ruling 2026-10-21: no Transport for NSW page read in text says which city stations the airport line calls at (the timetable is a PDF neither of us can render), so the page does NOT name them. Write: train from the airport on the T8 line to the city, then the venue's own line 'St James, Martin Place and Circular Quay stations are all about a 10-minute walk' (s10), and point to the Trip Planner for 1 Jan 2027.",
        },
        {
          how: "New Sydney Trains timetable from Sunday 15 November 2026: the T8 Airport & South line is renamed 'T8 SYD Airport & South West line' and 'All T8 SYD Airport & South West line services will operate via the Airport Tunnel'; trips can be planned from Sunday 1 November 2026",
          source: "s15",
          readOn: "2026-10-21",
          note: "the guide should point to the Trip Planner for 1 Jan 2027 (public-holiday timetable) rather than print train times",
        },
        {
          how: "Parking (venue): 24-hour meter parking on Mrs Macquaries Road and Hospital Road, $9/hour 8am–8pm and $5/hour 8pm–8am, cashless (PARK'nPAY app or card); closest car parks the Domain Car Park and The Wharf Woolloomooloo Car Park, bookable online; City of Sydney: 'Car parking is available at The Domain'",
          source: "s10",
          readOn: "2026-10-21",
          note: "the organiser recommends public transport; road closures and rideshare points for the day are not announced (not_found)",
        },
      ],
      // from the organiser's FAQ (s1) and Fuzzy's terms (s4)
      rules: [
        {
          fact: "Arrive with ticket, photo ID 'and anything else you need for the day'; no pass-outs",
          source: "s1",
          readOn: "2026-10-21",
        },
        {
          fact: "Prohibited items, terms 3.3, the full list as the terms give it ('The following restricted or prohibited items are not permitted by patrons into the event'): (a) 'Glass bottles or cans (includes perfume bottles and makeup containers)'; (b) 'Any liquids – including alcoholic beverages, e-cigarette liquids, pump sunscreen'; (c) 'Illicit drugs'; (d) 'Knives or other dangerous weapons including potential missiles'; (e) 'Flares, fireworks or sparklers'; (f) 'Lasers or laser pointers'; (g) 'Animals or pets (other than guide dogs)'; (h) 'Professional recording or broadcast devices without the promoter's permission'; (i) 'Flags with poles, large flags or banners that may obstruct the view of other patrons'; (j) 'Any item that you intend (or such quantities of the item from which Management can reasonably infer that you intend) to distribute, hawk, sell, offer, expose for sale or display for marketing or promotional purposes'; (k) 'Large items including drink coolers, ice boxes, chairs (including foldable chairs)'; (l) 'Umbrellas'; (m) 'Any dangerous goods: Any other items as determined by Security or Management that may cause injury or public nuisance'; (n) 'Plastic sealed or opened drink containers (only empty, clear reusable water bottles are allowed into the event)'; (o) 'Drones or other airborne recording/ photography devices'; (p) 'Metal drink bottles'; (q) 'Any dangerous goods'; (r) 'Large bags and/or backpacks over the size of an A4 piece of paper, or otherwise deemed dangerous by security'; (s) 'Any other items deemed as dangerous by Security or event staff'. Prescription medicine: 'in its original packaging and untampered', 'in a clear, resealable bag accompanied by the proof of script', 'only permitted to bring the dosage for that day'. Also in 3.3: 'free earplugs are available from first aid'; 'Please keep your shirt on!'; 'No passouts will be permitted, unless otherwise advised'; searches of persons and possessions at entry; 'stage diving', 'moshing', 'climbing' and 'crowd surfing' prohibited.",
          source: "s4",
          readOn: "2026-10-22",
          repaired: "gate 2 item 4: the earlier line was a partial list written as if whole; 'glass' becomes 'glass bottles or cans', 'chairs and coolers' becomes (k) verbatim",
        },
        {
          fact: "Terms 3.2, whole: 'No BYO alcohol as most venues are licensed. Food, alcohol and non-alcoholic beverages will be available for purchase at the event.' Food is not banned; what the prohibited list bans is 'Any liquids – including alcoholic beverages, e-cigarette liquids, pump sunscreen' and 'Plastic sealed or opened drink containers (only empty, clear reusable water bottles are allowed into the event)'. Terms 3.3(e): 'This event is fully licensed. Alcohol sales are subject to Responsible Service of Alcohol and Harm Minimization Practices. We are prohibited by law from serving liquor to intoxicated persons.'",
          source: "s4",
          readOn: "2026-10-22",
          repaired: "gate 2 item 3: the earlier line dropped 'alcohol' after 'No BYO' and read as a ban on food",
        },
        {
          fact: "Ticket limit 10 per customer per event; e-tickets by email; Moshtix sends tickets 'closer to the event'; name and DOB per ticket holder, $12.50 reissue for a wrong spelling or DOB",
          source: "s4",
          seller_source: "s3",
          readOn: "2026-10-21",
        },
        {
          fact: "Refunds, terms 1.6 verbatim: 'You are not entitled to a refund if you change your mind or if you are unable to attend an event due to your own personal circumstances which are out of our control.' 'If we cancel an event, we will email the person whose contact details are currently associated with the Tickets to the event to organise a refund of the original Ticket price. We will only refund the original Ticket price and not any booking fees or other transaction costs you might incur. We will use reasonable efforts to pay refunds within 28 days after the date the cancelled event was scheduled to occur.' 'If we change the date or venue of an event, Tickets will still be valid for the new date and venue.' The two 'reasonable' sentences decide only whether a refund is owed: 'You are not entitled to a refund if we reschedule an event to a later date that is within a reasonable time of the original date. You are not entitled to a refund if we move an event to a different venue that is within a reasonable distance of the original venue and has substantially similar facilities and amenities to the original venue.' 'We reserve the right to add, withdraw, reschedule or substitute artists. If we change any other details of an event, such as line-up changes for artists performing at an event, you are not entitled to a refund.' Questions: tickets@fuzzy.com.au",
          source: "s4",
          readOn: "2026-10-22",
          repaired: "gate 2 item 1: the earlier paraphrase 'within about 28 days' and 'a date or venue change within reason keeps the ticket valid' was the scout's and is replaced",
        },
        {
          fact: "Terms: 'Many festivals and events across Australia have been targeted by sniffer dog operations'; Fuzzy's Party Safe page: Patron Care team with first-aid accreditation and harm-reduction training; patrons invited to do the Australian Festival Association's Party Safe training; messaging emailed to ticket holders before the event",
          source: "s4",
          party_safe_source: "s16",
          readOn: "2026-10-21",
        },
        {
          fact: "Accessibility: ramped viewing platform at the Centre Field main stage, accessibility hotline (phone/text to an Accessibility Manager), lowered bar counters, accessible entry, Companion Card tickets; buy any ticket then complete the Accessibility Request via the 'Accessibility Information' button on the Moshtix page; Companion tickets via tixsupport.moshtix.com.au",
          source: "s1",
          seller_source: "s3",
          readOn: "2026-10-21",
        },
        {
          key: "terms_changes",
          fact: "Terms 4.1 'Variations', verbatim: 'We may vary these T&Cs at any time without notice to you. These T&Cs will apply as varied by us from time to time to all Tickets we subsequently issue. You should check our website to see the most up-to-date T&Cs.'",
          source: "s4",
          readOn: "2026-10-22",
          note: "rules.7; added after gate 2 round 2 for the writer's round-3 quote (the director's note). The page's own terms are what a reader is sent to; the guide quotes them with the read date.",
        },
      ],
      // English, Australia; 'autocomplete' = data.json rows of 21 Oct 2026; 'organiser FAQ' = the organiser's own headings on s1; 'people also ask' pending from the session's SERP
      questions: [
        {
          q: "When is Field Day 2027?",
          seen: "autocomplete ('field day 2027', 'field day 2027 dates'); organiser FAQ 'When and where is Field Day 2027?'",
          answer_from: ["s1", "s3", "s7"],
        },
        {
          q: "Where is Field Day 2027? Is it still at The Domain?",
          seen: "autocomplete ('field day 2027 location', 'field day sydney', 'field day 2027 sydney', 'field day 2027 australia'); organiser FAQ",
          answer_from: ["s1", "s3", "s8"],
        },
        {
          q: "Who is on the Field Day 2027 lineup?",
          seen: "autocomplete ('field day 2027 lineup', 'field day lineup', 'field day 2027 predictions')",
          answer_from: ["s1", "s12", "s14"],
          note: "'predictions' is answered by the announced line-up; the page says it is announced, in the body",
        },
        {
          q: "Who is the secret / mystery headliner at Field Day 2027?",
          seen: "media (s12, s14); the organiser's home page before 16 Oct",
          answer_from: ["s1", "s14"],
        },
        {
          q: "How much are Field Day 2027 tickets? Are they still available?",
          seen: "autocomplete ('field day 2027 tickets'); organiser FAQ 'How much are tickets?', 'Where can I buy Field Day 2027 tickets?'",
          answer_from: ["s1", "s3"],
        },
        {
          q: "Is Field Day sold out? What release is it on?",
          seen: "Moshtix tier statuses (s3)",
          answer_from: ["s3"],
        },
        {
          q: "Is Field Day 18+?",
          seen: "organiser 'Event info'; Moshtix; terms",
          answer_from: ["s1", "s3", "s4"],
        },
        {
          q: "What is the $99.90 18–25 ticket and can I still get one?",
          seen: "organiser FAQ (eleven headings on the 18–25 ticket)",
          answer_from: ["s1", "s3"],
        },
        {
          q: "What are MobTix and Affordability Tix?",
          seen: "organiser FAQ 'Are there any ticket affordability programs?'",
          answer_from: ["s1"],
        },
        {
          q: "Can I pay in instalments (Afterpay)?",
          seen: "organiser FAQ 'Are payment plans available?'",
          answer_from: ["s1"],
        },
        {
          q: "What time does Field Day start and finish?",
          seen: "web search ('field day set times', 'what time does it finish'); venue listing hours",
          answer_from: ["s3", "s7"],
          note: "set times not published; past years' set times came in the Fuzzy app and on media in the last week of December (s17)",
        },
        {
          q: "How do I get to The Domain? Which station?",
          seen: "candidate row's planned 'how to get there' page; venue getting-here page",
          answer_from: ["s1", "s10", "s11", "s15"],
        },
        {
          q: "Can I leave and come back (pass-outs)?",
          seen: "organiser 'Event info'; terms 3.3(q)",
          answer_from: ["s1", "s4"],
        },
        {
          q: "What can't I bring? Can I bring a water bottle?",
          seen: "organiser 'Event info' (points to the terms)",
          answer_from: ["s4"],
        },
        {
          q: "Can I sell or transfer my ticket? Is there an official resale?",
          seen: "organiser 'Be wary of scammers and unofficial resale'; terms 2.2–2.4",
          answer_from: ["s1", "s4"],
        },
        {
          q: "Is there a VIP area? What is Fast Forward?",
          seen: "organiser FAQ 'How much are tickets?'",
          answer_from: ["s1", "s3"],
        },
        {
          q: "Is Field Day accessible / are there Companion Card tickets?",
          seen: "organiser 'Accessibility at Field Day'",
          answer_from: ["s1", "s3"],
        },
        {
          q: "Which Field Day? (Warrandyte market, Field Day London, Hamilton field days, 'field day pantry', 'field day meaning')",
          seen: "autocomplete ('field day warrandyte', 'field day meaning', 'field day pantry', 'field day 2027 london', 'field days 2027 hamilton')",
          answer_from: ["s1", "s5"],
          note: "one disambiguating sentence on the main page; no page for the other events",
        },
        {
          q: "Field Day 2026: who played, when was it?",
          seen: "autocomplete ('field day 2026')",
          answer_from: ["s6", "s13"],
        },
        {
          q: "Is Field Day happening in 2026? Is Field Day 2026 happening?",
          seen: "people also ask (queries 1, 4, 5)",
          answer_from: ["s1", "s3", "s13"],
          note: "readers mean the next edition and are a year behind: the 2026 edition was on 1 Jan 2026 (s13); the next is Field Day 2027 on Friday 1 Jan 2027 (s1). Answer both halves plainly in the FAQ and the dates page; no status word in titles (rule 4).",
        },
        {
          q: "Where is Field Day 2026? Where is Field Day held in Sydney? Where is the Field Day festival in Sydney?",
          seen: "people also ask (queries 1, 2, 5)",
          answer_from: ["s1", "s3", "s8", "s6", "s13"],
          note: "The Domain, Art Gallery Road. 2027 at The Domain (s1, s3); 2026 at The Domain (s6 'now taking over The Domain on New Years Day for Field Day – celebrating 25 years in 2026'; s13). Fuzzy's About names 2018 and 2024 editions without a venue, so nothing is said about earlier editions' venues. Gate 2 item 9: 'in every edition the organiser's pages mention' struck, it had no source.",
        },
        {
          q: "How much are Field Day tickets in Sydney?",
          seen: "people also ask (queries 2, 4, 5)",
          answer_from: ["s1", "s3"],
          note: "print the tier table with fees, the seller and the read date; six-week price limit",
        },
        {
          q: "Who will be performing at Field Day 2026 in Sydney?",
          seen: "people also ask (query 3)",
          answer_from: ["s1", "s13", "s14"],
          note: "same year confusion: give the 2027 line-up as the answer and the 2026 headliners as history",
        },
        {
          q: "Is this the London Field Day?",
          seen: "SERP (query 4: fielddayfestivals.com and skiddle 'Field Day London 2027' rank for 'field day 2027 tickets')",
          answer_from: ["s1", "s5"],
          note: "one honest sentence on the main and tickets pages: this guide is the Sydney New Year's Day festival by Fuzzy; the London festival of the same name is unrelated. No link to it.",
        },
      ],
      sources: {
        s1: {
          label: "Field Day, official site (home, tickets, FAQs, accessibility)",
          url: "https://fieldday.com.au/",
          kind: "organiser",
          note: "fieldday.sydney 301s here; WordPress, JSON-LD datePublished 2026-08-31, dateModified 2026-10-15 (UTC)",
        },
        s2: {
          label: "Fuzzy, Field Day event page",
          url: "https://fuzzy.com.au/events/field-day/",
          kind: "organiser",
        },
        s3: {
          label: "Moshtix, Field Day 2027 (the only official seller)",
          url: "https://moshtix.com.au/v2/event/field-day-2027/199201",
          kind: "seller",
          note: "venue page https://moshtix.com.au/v2/venues/the-domain/607 gives the address; curl reads both",
        },
        s4: {
          label: "Fuzzy, Terms and Conditions (entry conditions, prohibited items, refunds, resale)",
          url: "https://fuzzy.com.au/terms-conditions/",
          kind: "organiser",
        },
        s5: {
          label: "Fuzzy, home (upcoming events, 30 years)",
          url: "https://fuzzy.com.au/",
          kind: "organiser",
        },
        s6: {
          label: "Fuzzy, About",
          url: "https://fuzzy.com.au/about/",
          kind: "organiser",
        },
        s7: {
          label: "Botanic Gardens of Sydney, What's On: Field Day (1 January 2027, 12pm–11pm)",
          url: "https://www.botanicgardens.org.au/whats-on/field-day",
          kind: "venue",
        },
        s8: {
          label: "Botanic Gardens of Sydney, The Domain Sydney (venue hire page: precincts, capacity, map marker)",
          url: "https://www.botanicgardens.org.au/venues-and-lawns/all-venues-and-lawns/domain-sydney",
          kind: "venue",
          note: "the bare host 301s to www; WebFetch needs the www URL",
        },
        s9: {
          label: "City of Sydney, Royal Botanic Garden and The Domain (park record)",
          url: "https://www.cityofsydney.nsw.gov.au/parks/royal-botanic-garden-domain",
          kind: "public body",
        },
        s10: {
          label: "Botanic Gardens of Sydney, Getting here (stations, buses, ferries, parking)",
          url: "https://www.botanicgardens.org.au/royal-botanic-garden-sydney/plan-your-visit/getting-here",
          kind: "venue",
        },
        s11: {
          label: "Transport for NSW, Getting to and from Sydney Airport",
          url: "https://transportnsw.info/travel-info/airport-travel/getting-to-from-sydney-airport",
          kind: "public body",
        },
        s12: {
          label: "The Note, 'Major Lazer, Sub Focus & More Headline Field Day 2027', 1 Sep 2026",
          url: "https://www.thenote.com.au/news/field-day-2027-lineup",
          kind: "media",
        },
        s13: {
          label: "The Note, 'Carl Cox and Jamie Jones Headline Field Day 2026', 28 Oct 2025",
          url: "https://www.thenote.com.au/news/field-day-2026-lineup",
          kind: "media",
        },
        s14: {
          label: "Rolling Stone AU, 'Final Headliner for Field Day 2027 Revealed', 16 Oct 2026",
          url: "https://au.rollingstone.com/music/music-news/field-day-2027-headliner-revealed-tickets-dates-102268/",
          kind: "media",
          note: "The Note, same day: https://www.thenote.com.au/news/mall-grab-revealed-as-field-day-2027-secret-headline",
        },
        s15: {
          label: "Transport for NSW, 2026 train timetable changes (from Sunday 15 November 2026)",
          url: "https://transportnsw.info/travel-info/2026-train-timetable-changes",
          kind: "public body",
          readOn: "2026-10-22",
          url_note: "gate 2 item 25: the old URL https://transportnsw.info/news/2026/2026-train-timetable-changes answers 301 to this one (2026-10-22); content unchanged — 'On Sunday 15 November 2026, Transport will introduce a new train timetable', the T8 rename, 'All T8 SYD Airport & South West line services will operate via the Airport Tunnel', 'You can plan your trip from Sunday 1 November 2026'",
          note: "T8 fact sheet PDF https://transportnsw.info/document/8999/2026-train-timetable-changes-t8-line-fact-sheet.pdf, not readable without the pane",
        },
        s16: {
          label: "Fuzzy, Party Safe",
          url: "https://fuzzy.com.au/party-safe/",
          kind: "organiser",
        },
        s18: {
          label: "NSW Government, NSW public holidays (table 'NSW public holidays 2026 to 2027')",
          url: "https://www.nsw.gov.au/about-nsw/public-holidays",
          kind: "public body",
          readOn: "2026-10-22",
          go: "/go/field-day-public-holidays/ (404 on fest.one, 2026-10-22)",
        },
        s19: {
          label: "Transport for NSW, Trip Planner",
          url: "https://transportnsw.info/trip",
          kind: "public body",
          readOn: "2026-10-22",
          go: "/go/field-day-trip-planner/ (404 on fest.one, 2026-10-22)",
          note: "page title 'Trip planner | transportnsw.info', HTTP 200; its own slug, so that /go/field-day-timetable/ keeps pointing at s15 only. Gate 2 item 8.",
        },
        s20: {
          label: "NSW Government, Daylight saving in NSW: when it starts and ends in 2026 and 2027",
          url: "https://www.nsw.gov.au/about-nsw/daylight-saving",
          kind: "public body",
          readOn: "2026-10-22",
          note: "Starts 'Sunday 4 October 2026' at '2am Eastern Standard Time (AEST)'; ends 'Sunday 4 April 2027' at '3am Eastern Daylight Time (AEDT)'; 'New South Wales, Victoria, South Australia, Tasmania, and the Australian Capital Territory observe daylight saving. Queensland, Western Australia, and the Northern Territory do not.' The page names AEST and AEDT but prints no UTC offset; UTC+11 for AEDT is the IANA zone Australia/Sydney's, not the page's. So 1 Jan 2027 is AEDT. Gate 2 round 2 item 2.",
        },
        s17: {
          label: "Music Feeds, 'Field Day Unveils 2019 Lineup Additions & Set Times' (set times came via the Fuzzy app)",
          url: "https://musicfeeds.com.au/news/field-day-unveils-2019-lineup-additions-set-times/",
          kind: "media",
          note: "cited by no fact; background for the 'set times' answer only",
        },
      },
      not_found: [
        "Gate-opening time and set times for 2027 (organiser: 'detailed transport info closer to the event'; no times on s1; hours only on the venue listing s7 and Moshtix start s3)",
        "An organiser statement of the first year (Wikipedia says 2002; the organiser only says '25 years in 2026')",
        "Attendance or capacity for Field Day itself (only the venue's 'up to 50,000' hire capacity and media's '500,000 over its history')",
        "A Transport for NSW page for Field Day 2027 (none at /events/2027/01/…; past years' pages are gone); road closures, rideshare pick-up point, last trains on 1 Jan 2027",
        "Confirmation from a Transport for NSW HTML page that T8 calls at St James and Museum (the timetable is a PDF no one here can render; the page names no airport-line city station — session ruling, see Needs the pane)",
        "Official resale (none named; Fuzzy's terms say one may open after a sell-out); Tixel is not named for this event",
        "Cloakroom, lockers, ATMs, cashless policy, water stations, lost property",
        "Name-change fee and window for 2027 tickets (terms say 'fees we specify', tickets@fuzzy.com.au)",
        "A public 'Field Day 2026 set times / hours' page still online (the venue listing has rolled over to 2027)",
        "Reddit threads (old.reddit search is behind a login wall for curl; session ruling: reddit is not a source, item closed — the questions come from autocomplete, the organiser's FAQ and People also ask)",
        "Field Day's own line-up announcement date on an organiser page (only JSON-LD timestamps and media dates)",
      ],
    },
    go: {
      official: {
        url: "https://fieldday.com.au/",
        source: "s1",
        kind: "organiser",
        title: "Field Day's own site, run by Fuzzy: dates, tickets and FAQs",
      },
      tickets: {
        url: "https://moshtix.com.au/v2/event/field-day-2027/199201",
        source: "s3",
        kind: "seller",
        title: "Moshtix's Field Day 2027 page, which the organiser names as its only seller",
      },
      fuzzy: {
        url: "https://fuzzy.com.au/events/field-day/",
        source: "s2",
        kind: "organiser",
        title: "Fuzzy's page for Field Day 2027 at The Domain",
      },
      terms: {
        url: "https://fuzzy.com.au/terms-conditions/",
        source: "s4",
        kind: "organiser",
        title: "Fuzzy's ticket terms: refunds, prohibited items, entry",
      },
      venue: {
        url: "https://www.botanicgardens.org.au/whats-on/field-day",
        source: "s7",
        kind: "venue",
        title: "The Botanic Gardens of Sydney's Field Day listing, with its hours",
      },
      "getting-here": {
        url: "https://www.botanicgardens.org.au/royal-botanic-garden-sydney/plan-your-visit/getting-here",
        source: "s10",
        kind: "venue",
        title: "Stations, ferries and parking near the Royal Botanic Garden",
      },
      airport: {
        url: "https://transportnsw.info/travel-info/airport-travel/getting-to-from-sydney-airport",
        source: "s11",
        kind: "public-body",
        title: "Trains from Sydney Airport's stations, Transport for NSW",
      },
      timetable: {
        url: "https://transportnsw.info/travel-info/2026-train-timetable-changes",
        source: "s15",
        kind: "public-body",
        title: "The T8 line's new name and timetable from November 2026",
      },
      "trip-planner": {
        url: "https://transportnsw.info/trip",
        source: "s19",
        kind: "public-body",
        title: "Plan a train, bus or ferry trip in Sydney for 1 January 2027",
      },
      "public-holidays": {
        url: "https://www.nsw.gov.au/about-nsw/public-holidays",
        source: "s18",
        kind: "public-body",
        title: "NSW public holiday dates, New Year's Day included",
      },
      maps: {
        url: "https://www.google.com/maps/search/?api=1&query=-33.868836%2C151.214573",
        source: "venue",
        kind: "maps",
        title: "The Domain, Art Gallery Road, Sydney, on Google Maps",
      },
      accessibility: {
        url: "https://fieldday.com.au/",
        source: "s1",
        kind: "organiser",
        title: "Field Day's own site: the accessibility details are further down the page",
      },
      mobtix: {
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfLU-ADVIrwZg0MM1IrcXyF8FPCi3NSFJpTKW08vun9TMOSbw/viewform",
        source: "sellers.2",
        kind: "organiser",
        title: "The organiser's MobTix request form for Aboriginal and Torres Strait Islander people",
      },
    },
  },
];

export const guides: Guide[] = [
  {
    slug: "en-AU",
    createdAt: "2026-10-22T14:55:00+04:00",
    updatedAt: "2026-10-22T14:55:00+04:00",
    event: "field-day",
    lang: "en-AU",
    dir: "ltr",
    path: "/field-day/",
    hubLabel: "English (Australia)",
    hubBlurb: "Field Day 2027 is on Friday 1 January 2027 at The Domain in Sydney, on Gadigal Country, with a 12pm start (Moshtix) and an 11pm finish (the Botanic Gardens' listing). [editions.0.start] [editions.0.note] [gates.0] It's Fuzzy's one-day dance festival on New Year's Day: three stages on parkland in the middle of the city, no camping, and strictly 18+. [event.organiser] [history.3] [age]",
    // Prices are Moshtix's of 21 October 2026, 42 days good; the MobTix
    // form takes entries until 1 December 2026 (sellers.2.window), and its
    // link comes off the day after (sellers.2.note).
    expires: { prices: "2026-12-02", mobtix: "2026-12-02" },
    pages: [
      {
        slug: "field-day",
        createdAt: "2026-10-22T14:55:00+04:00",
        updatedAt: "2026-10-22T14:55:00+04:00",
        kind: "main",
        label: "Overview",
        title: "Field Day 2027 Sydney: tickets, lineup — festival guide",
        description: "Field Day 2027, Sydney's New Year's Day festival: Friday 1 January at The Domain, 12pm to 11pm, 18+. Ticket prices by release, lineup by stage, getting there.",
        h1: "Field Day 2027",
        lede: "Field Day 2027 is on Friday 1 January 2027 at The Domain in Sydney, on Gadigal Country, with a 12pm start (Moshtix) and an 11pm finish (the Botanic Gardens' listing). [editions.0.start] [editions.0.note] [gates.0] It's Fuzzy's one-day dance festival on New Year's Day: three stages on parkland in the middle of the city, no camping, and strictly 18+. [event.organiser] [history.3] [age] {{until prices}}Tickets are sold through [Moshtix](/go/field-day-tickets/), and on 21 October 2026 the cheapest General Admission (GA) ticket on sale there was Second Release at $219.90 including fees. [sellers.0.role] [prices.4]{{/until}}",
        sections: [
          {
            id: "tickets",
            heading: "Tickets: Moshtix, and what they cost",
            body: "The organiser's own words are \"Field Day 2027 tickets are sold via Moshtix and Moshtix only\". [sellers.0.role] {{until prices}}Prices are in Australian dollars (AUD), and Moshtix shows two figures for every ticket: the organiser's price and the total with a $10 service fee, or $5 on the Fast Forward Pass, GST included. [sellers.0.note] [prices] On 21 October 2026 the Moshtix page listed five GA releases. The 18–25s ticket at $109.90 and First Release at $199.90 read \"Allocation Exhausted\"; Second Release at $219.90, Third Release at $229.90 and Final Release at $249.90 were all on sale. [prices.0] [prices.3] [prices.4] [prices.5] [prices.6] VIP was $309.90, and the Fast Forward Pass, an add-on you buy with a GA ticket, was $44.90. [prices.7] [prices.8] [prices.8.seller_label] The two \"from\" prices you'll see elsewhere, Moshtix's \"from $99.90+fees\" and the Botanic Gardens' \"from $109.90\", are both the $99.90 price ($109.90 with the fee): on Moshtix that's the 18–25s ticket, now \"Allocation Exhausted\", while MobTix and Affordability Tix cost the same but are by request. [prices.9] [prices.0] [prices.1] [prices.2]{{/until}} Afterpay and PayPal Pay in 4 are offered through Moshtix, though not on the 18–25s ticket. [prices.10] Sales for every ticket still on sale close at 11pm on the day itself; the 18–25s ticket closed on 10 September 2026. [sales_timeline.7] {{until prices}}Every release with its fee, the two $99.90 request programs, {{/until}}Afterpay, refunds and name changes are on the tickets page. → /field-day/tickets/\n\n[Field Day 2027 at Moshtix](/go/field-day-tickets/)",
          },
          {
            id: "when",
            heading: "When: Friday 1 January 2027, 12pm to 11pm",
            body: "The Botanic Gardens of Sydney's listing gives the hours as 12pm to 11pm; Moshtix gives the start as 12:00pm; the organiser hasn't published gate times and says it will \"share detailed transport info closer to the event\". [gates.0] [editions.0.note] [transport.0] Everything on this page is Sydney time, AEDT, which is UTC+11 on that day. [editions.0.utc_offset_on_event] Queensland, WA and the NT don't have daylight saving, so if you're flying in from there, check the time difference before you book. [sources.s20] The previous edition, Field Day 2026, was on Thursday 1 January 2026 at the same park. [editions.1]",
          },
          {
            id: "venue",
            heading: "The Domain, and how to get there",
            body: "The Domain is the open parkland on the eastern edge of the CBD, near Woolloomooloo. [venue.note] Moshtix gives the address as Art Gallery Road, Sydney NSW 2000; the Botanic Gardens of Sydney, which manages the park, uses Mrs Macquaries Rd, Sydney NSW 2000. [venue.address] [venue.address_venue_page] [venue.manager]\n\n[The Domain in maps](/go/field-day-maps/)\n\nThe Domain and the Royal Botanic Garden beside it are on the NSW State Heritage Register. [venue.note] The organiser's pitch for the place: \"no tents, no campsite, no long haul home. Just 100% dance in the middle of Sydney\". [history.3]\n\nThe organiser says it \"strongly recommend[s] using public transport to get to and from The Domain\" and that detailed transport information comes closer to the event. [transport.0] Until then, what exists is the Botanic Gardens' own visitor page, written for the Garden next door: \"St James, Martin Place and Circular Quay stations are all about a 10-minute walk\" from the Garden, and for ferries, \"The Garden is an easy 10-minute walk from the wharves\" at Circular Quay. [transport.1] Friday 1 January 2027 is a public holiday in NSW, so plan the trip for that date in the Transport for NSW Trip Planner rather than from a weekday timetable. [public_holiday]\n\n[NSW public holidays, NSW Government](/go/field-day-public-holidays/)\n[Transport for NSW Trip Planner](/go/field-day-trip-planner/)\n[Getting here, Botanic Gardens of Sydney](/go/field-day-getting-here/)\n\nFlying in: trains leave from stations under both airport terminals on the T8 Airport & South Line, which Transport for NSW renames the T8 SYD Airport & South West Line from Sunday 15 November 2026, with every service running via the Airport Tunnel; trips on the new timetable can be planned from Sunday 1 November 2026. [transport.2] [transport.3] Plan the trip from the airport for 1 January 2027 in the Transport for NSW Trip Planner. [sources.s19]\n\n[Getting to and from Sydney Airport, Transport for NSW](/go/field-day-airport/)\n[Transport for NSW, 2026 train timetable changes](/go/field-day-timetable/)\n\nDriving: the Gardens' visitor page lists metered parking on Mrs Macquaries Road and Hospital Road and two bookable car parks, the Domain Car Park and The Wharf Woolloomooloo Car Park. [transport.4] That's the Gardens' usual visitor info, not anything set up for Field Day; as of 21 October 2026 the organiser hasn't announced road closures, rideshare pick-up or parking for the day. [transport.4] [not_found]",
          },
          {
            id: "lineup",
            heading: "Lineup: three headliners, three stages",
            body: "Major Lazer, Mall Grab and Sub Focus headline. [lineup.headliners] The lineup was announced on 1 September 2026 (AEST) with a \"secret headliner\" held back; Mall Grab was revealed as that headliner on 16 October 2026. [sales_timeline.0] [sales_timeline.6] The organiser lists the acts A to Z within each stage, Centre Field, Tree Top and Casamigos Camp Ground, so the order on the organiser's list says nothing about billing. [lineup.note] [history.3] Set times haven't been published. [lineup.note] Every act by stage, with part of the 2026 bill for comparison, is on the lineup page. → /field-day/lineup/",
          },
          {
            id: "entry",
            heading: "Entry: 18+, photo ID, no pass-outs",
            body: "\"The event is strictly 18+, so you'll need valid photo ID to enter.\" [age] Fuzzy's terms, read 22 October 2026, accept a current photo driver's licence, a current passport or an accepted Proof of Age card. [age.note] Once you're in, you stay in: \"pass-outs and re-entry are not permitted\". [gates.1] There are dedicated entry lanes for 18–25 tickets, where ID is checked against the name and date of birth on the ticket, and for Fast Forward, VIP and accessible tickets. [gates.2] Glass bottles or cans, any liquids, umbrellas, eskies and chairs, bags bigger than A4: those are the main items from Fuzzy's terms, and the full list, with what the terms say about medicine, food and drink, is on the FAQ page. [rules.1] → /field-day/faq/",
          },
          {
            id: "history",
            heading: "Field Day 2026 and the years before",
            body: "Field Day 2026 was on Thursday 1 January 2026 at The Domain, headlined by Carl Cox and Jamie Jones (The Note, 28 October 2025); more of the 2026 bill is on the lineup page. [editions.1] [editions.1.note] Fuzzy's About page calls it \"celebrating 25 years in 2026\". [history.1] Fuzzy's own account of itself runs from \"Sublime, a cult club night in 1996\" through Parklife, Field Day, Harbourlife, Shore Thing and Listen Out, \"three decades building music experiences\", in its words. [history.0] Fuzzy's About page records that Flume won a triple j Unearthed slot at Field Day and came back as a headliner in 2018. [history.1] The Botanic Gardens' listing calls Field Day \"Sydney/Gadigal Country's biggest New Year's Day\". [event.name_forms] The organiser gives no founding year for Field Day and no attendance figure, so this page gives neither. [not_found]",
          },
          {
            id: "why",
            heading: "Why this guide",
            body: "The organiser's site is a single page, and the rest of the answers, hours, prices by release, stations, what you can carry in, sit at Moshtix, the Botanic Gardens of Sydney, Fuzzy's terms and Transport for NSW; this guide puts what each of them says in one place, with the date it was read. A London festival is also called Field Day; it is a different event. [questions.23]",
          },
        ],
        faqHeading: "Questions readers ask",
        faq: [
          {
            q: "Is Field Day happening in 2026?",
            a: "It's been and gone: Field Day 2026 was on Thursday 1 January 2026 at The Domain (The Note, 28 October 2025). [editions.1] The next one is Field Day 2027, Friday 1 January 2027, same park (organiser and Moshtix, read 21 October 2026). [editions.0]",
            generic: true,
          },
          {
            q: "Where is Field Day held in Sydney?",
            a: "At The Domain, Art Gallery Road, Sydney NSW 2000, the parkland beside the Royal Botanic Garden on the eastern edge of the CBD (Moshtix venue page and organiser, read 21 October 2026). Field Day 2026 was at The Domain too (Fuzzy's About page; The Note). [venue.address] [venue.note] [questions.20]",
            generic: true,
          },
          {
            q: "How much are Field Day tickets in Sydney?",
            a: "{{until prices}}On 21 October 2026 the cheapest GA ticket on sale at Moshtix was Second Release, $209.90 plus a $10 fee, $219.90 in all; Final Release is $249.90 and VIP $309.90 with the fee (Moshtix, read 21 October 2026). [prices.4] [prices.6] [prices.7]{{/until}}",
            generic: true,
          },
          {
            q: "What time does Field Day start and finish?",
            a: "12pm to 11pm on the Botanic Gardens' listing; Moshtix gives a 12:00pm start; set times aren't published (both read 21 October 2026). [gates.0] [lineup.note]",
            generic: true,
          },
          {
            q: "Which station is closest?",
            a: "The Botanic Gardens name St James, Martin Place and Circular Quay, \"all about a 10-minute walk\" from the Garden; the organiser says its own transport details are coming closer to the event (Gardens' Getting here page and organiser, read 21 October 2026). [transport.1] [transport.0]",
            generic: true,
          },
          {
            q: "Is Field Day 2027 sold out?",
            a: "{{until prices}}Not on 21 October 2026: Second, Third and Final Release, VIP and the Fast Forward Pass were all on sale at Moshtix; only the 18–25s and First Release tickets read \"Allocation Exhausted\". [editions.0.note] [prices.4]{{/until}}",
            generic: true,
          },
        ],
        sourcesHeading: "Sources",
        sourcesNote: "(read 21 October 2026 unless dated)",
        sources: "[Field Day, official site](/go/field-day-official/) (fieldday.com.au) [sources.s1]\n[Moshtix, Field Day 2027](/go/field-day-tickets/) [sources.s3]\n[Fuzzy, Field Day event page](/go/field-day-fuzzy/) [sources.s2]\nFuzzy, About and home (named, not linked) [sources.s5] [sources.s6]\n[Fuzzy, Terms and Conditions](/go/field-day-terms/), read 22 October 2026 [sources.s4]\n[Botanic Gardens of Sydney, What's On: Field Day](/go/field-day-venue/) [sources.s7]\n[Botanic Gardens of Sydney, Getting here](/go/field-day-getting-here/) [sources.s10]\n[Transport for NSW, Getting to and from Sydney Airport](/go/field-day-airport/) [sources.s11]\n[Transport for NSW, 2026 train timetable changes](/go/field-day-timetable/), read 22 October 2026 [sources.s15]\n[Transport for NSW, Trip Planner](/go/field-day-trip-planner/), read 22 October 2026 [sources.s19]\n[NSW Government, NSW public holidays](/go/field-day-public-holidays/), read 22 October 2026 [sources.s18]\nThe Note, 1 September 2026 and 28 October 2025, and Rolling Stone AU, 16 October 2026, for the announcement dates and the 2026 bill (not linked). [sources.s12] [sources.s13] [sources.s14]",
        anchors: [{ target: "/field-day/faq/", text: "the FAQ page" }],
      },
      {
        slug: "field-day/tickets",
        createdAt: "2026-10-22T14:55:00+04:00",
        updatedAt: "2026-10-22T14:55:00+04:00",
        kind: "tickets",
        label: "Tickets",
        title: "Field Day 2027 Sydney tickets: prices, fees — festival guide",
        description: "Field Day 2027 ticket prices at Moshtix by release, fees included: GA, VIP, Fast Forward, 18–25s, MobTix, Afterpay, refunds. Sydney festival, Friday 1 January.",
        h1: "Field Day 2027 tickets",
        lede: "Field Day 2027 tickets are sold at [Moshtix](/go/field-day-tickets/), \"and Moshtix only\" in the organiser's words, for Friday 1 January 2027 at The Domain in Sydney. [sellers.0.role] [editions.0] {{until prices}}On 21 October 2026 the cheapest General Admission (GA) ticket on sale there was Second Release: $209.90 plus a $10 fee, $219.90 in all. [prices.4] Every figure below is what Moshtix showed that day, in Australian dollars: the price first, then the total with its fee, which Moshtix says includes GST and the service fee; the prices here are re-read or taken down by 2 December 2026. [sellers.0.note]{{/until}}",
        sections: [
          {
            id: "releases",
            heading: "Every release, as Moshtix showed it on 21 October 2026",
            body: "{{until prices}}GA is sold in releases, each at its own price; Moshtix marks a release \"Allocation Exhausted\" when it's gone, and on 21 October 2026 it showed a quantity dropdown of 1 to 10 for each release still on sale. [editions.0.note] One card per ticket, Moshtix's price first, then the total with its fee: [prices]\n\n- **18–25s ticket**: $99.90 + $10.00 fees = $109.90. \"Allocation Exhausted\"; sales closed 11:00am, Thursday 10 September 2026. [prices.0] [sales_timeline.7]\n- **GA, First Release**: $189.90 + $10.00 fees = $199.90. \"Allocation Exhausted\". [prices.3]\n- **GA, Second Release**: $209.90 + $10.00 fees = $219.90. On sale; up to 10 per customer (Fuzzy's terms). [prices.4] [rules.3]\n- **GA, Third Release**: $219.90 + $10.00 fees = $229.90. On sale; up to 10 per customer. [prices.5]\n- **GA, Final Release**: $239.90 + $10.00 fees = $249.90. On sale; up to 10 per customer. [prices.6]\n- **VIP**: $299.90 + $10.00 fees = $309.90. On sale. [prices.7]\n- **Fast Forward Pass**: $39.90 + $5.00 fees = $44.90. On sale; \"Must be paired with a GA festival ticket\". [prices.8] [prices.8.seller_label]\n\nThe releases still on sale, VIP and the Fast Forward Pass close at 11pm on Friday 1 January 2027. [sales_timeline.7] Fuzzy's terms cap tickets at ten per customer per event. [rules.3]{{/until}}",
          },
          {
            id: "from-prices",
            heading: "What the two \"from\" prices refer to",
            body: "{{until prices}}Moshtix's headline reads \"Tickets from $99.90+fees\" and the Botanic Gardens' listing says \"Prices start from $109.90\". [prices.9] Both are the $99.90 price ($109.90 with the fee). On Moshtix that's the 18–25s ticket, now \"Allocation Exhausted\", with entries closed on the organiser's page; MobTix and Affordability Tix cost the same but are by request. [prices.0] [prices.1] [prices.2] [prices.9] The cheapest GA ticket on sale that day was Second Release at $219.90. [prices.4]{{/until}}",
          },
          {
            id: "vip",
            heading: "VIP and the Fast Forward Pass",
            body: "VIP{{until prices}}, $309.90 with the fee,{{/until}} gets you into a VIP area with its own bar and toilets, its own entry lane and a viewing platform at the Centre Field stage. [prices.7] The Fast Forward Pass{{until prices}}, $44.90 with its $5 fee,{{/until}} isn't a ticket on its own but an add-on you buy with a GA ticket: a dedicated entry lane and express lanes at the bars and toilets. [prices.8] [prices.8.seller_label] [gates.2]",
          },
          {
            id: "request-tickets",
            heading: "The three {{until prices}}$99.90 {{/until}}tickets: 18–25s, MobTix, Affordability Tix",
            body: "The 18–25s ticket is sold by ballot. It's for people aged 18 to 25 on 1 January 2027, born between 2 January 2001 and 1 January 2009 inclusive, allocated by random draw from all eligible requests; successful requests were charged automatically. [age.note] [prices.0.allocation] The Ticket Request opened at 12pm AEST on 2 September 2026, closed at 11:59pm AEST on 6 September, and requests were fulfilled on 7 September. [sales_timeline.1] [sales_timeline.2] [sales_timeline.3] At the gate the name and date of birth on an 18–25s ticket are checked against the holder's ID, in a lane of its own, and the ticket can't be name-changed. [gates.2] [resale] Payment plans don't apply to it. [prices.10]\n\nMobTix is the organiser's affordability ticket for Aboriginal and Torres Strait Islander people: one GA ticket{{until prices}} at $99.90 plus booking fees{{/until}}, by request through a form. [sellers.2.role] [prices.1] {{until mobtix}}As the form read on 21 October 2026, entries opened on 1 September 2026, close on 1 December 2026, and a successful entrant must buy the ticket by 31 December 2026; entries are checked once a fortnight, codes go out by email, and the tickets are \"only available until allocations are exhausted\"; questions go to tickets@fuzzy.com.au. [sellers.2.window]\n\n[MobTix entry form](/go/field-day-mobtix/){{/until}}\n\nAffordability Tix is the organiser's matching ticket for holders of selected Concession Cards and people on eligible government payments, also{{until prices}} $99.90 plus fees and also{{/until}} by request form. [sellers.3.role] [prices.2] The organiser's page gives it no dates, so this guide can't say whether requests are open; the organiser's page is where to look. [sellers.3.window] [sellers.3.note]\n\n[Field Day, official site](/go/field-day-official/)",
          },
          {
            id: "sale",
            heading: "How the sale ran",
            body: "The lineup and the first two headliners were announced on 1 September 2026 (AEST). [sales_timeline.0] The 18–25s Ticket Request ran from 12pm AEST on 2 September to 11:59pm AEST on 6 September and was fulfilled on 7 September. [sales_timeline.1] [sales_timeline.2] [sales_timeline.3] The presale, for people who had registered, ran from 12pm AEST on 9 September to 11am AEST on 10 September 2026 \"or until presale allocations are exhausted\", with a unique link sent by SMS on the morning of 9 September; that sign-up is closed and is history now. [sales_timeline.4] [sellers.1] General on sale opened at 12pm AEST on 10 September 2026, and the 18–25s ticket closed at 11am the same day. [sales_timeline.5] [sales_timeline.7] Mall Grab was named as the third headliner on 16 October 2026. [sales_timeline.6] Sales for everything still on sale close at 11pm on Friday 1 January 2027. [sales_timeline.7]",
          },
          {
            id: "paying",
            heading: "Paying, and the name on the ticket",
            body: "\"Afterpay and PayPal Pay in 4 are available via Moshtix during the presale and general on sale. Payment plans are not available for the 18-25s Ticket.\" [prices.10] Tickets are e-tickets, sent by email; Moshtix sends them \"closer to the event\". [rules.3] Each ticket carries the holder's name and date of birth{{until prices}}, and a wrong spelling or wrong date costs $12.50 to reissue{{/until}}. [rules.3] [sellers.0.note]",
          },
          {
            id: "refunds",
            heading: "Refunds, name changes and resale",
            body: "Fuzzy's terms, read 22 October 2026, give no refund for a change of mind: \"You are not entitled to a refund if you change your mind or if you are unable to attend an event due to your own personal circumstances which are out of our control.\" [rules.4] If the event is cancelled, \"We will only refund the original Ticket price and not any booking fees or other transaction costs you might incur. We will use reasonable efforts to pay refunds within 28 days after the date the cancelled event was scheduled to occur.\" [rules.4] If the date or venue changes, the ticket stays valid; there is no refund when the new date is within a reasonable time, or the new venue within a reasonable distance with similar facilities (Fuzzy's terms). [rules.4] A lineup change gives no refund, since the terms allow Fuzzy to \"add, withdraw, reschedule or substitute artists\". [rules.4] [lineup.note]\n\nName changes: the terms say Fuzzy \"may offer a ticket name-change service for certain events\", to friends and family only, for a fee per ticket, through tickets@fuzzy.com.au; the 18–25s ticket is excluded. [resale] The fee and the window for 2027 weren't published on 21 October 2026. [not_found]\n\nResale: the organiser names no official resale for Field Day 2027 and warns, \"Be wary of scammers and unofficial resale\". [resale] Fuzzy's terms say \"we may offer an official resale facility once an event has sold out\", where every ticket \"must be sold at the original ticket price (plus associated fees)\", and that \"There are laws in place in certain states that prohibit resale of tickets to certain events or limit the prices at which they may be resold\"; this guide gives no figure and links no resale site. [resale]",
          },
          {
            id: "accessibility",
            heading: "Accessible and Companion Card tickets",
            body: "Buy any ticket, then complete the Accessibility Request through the \"Accessibility Information\" button on the Moshtix page; Companion Card tickets go through Moshtix's ticket support. [rules.6] The organiser lists a ramped viewing platform at the Centre Field main stage, an accessibility hotline by phone or text to an Accessibility Manager, lowered bar counters and an accessible entry lane. [rules.6] [gates.2]\n\n[Accessibility at Field Day](/go/field-day-accessibility/)",
          },
        ],
        faq: [],
        sourcesHeading: "Sources",
        sourcesNote: "(read 21 October 2026 unless dated)",
        sources: "[Moshtix, Field Day 2027](/go/field-day-tickets/) [sources.s3]\n[Field Day, official site, tickets and FAQs](/go/field-day-official/) [sources.s1]\n[Fuzzy, Terms and Conditions](/go/field-day-terms/), read 22 October 2026 [sources.s4]\n{{until mobtix}}[FD27 MobTix Form](/go/field-day-mobtix/) [sellers.2]{{/until}}\n[Botanic Gardens of Sydney, What's On: Field Day](/go/field-day-venue/) [sources.s7]",
      },
      {
        slug: "field-day/lineup",
        createdAt: "2026-10-22T14:55:00+04:00",
        updatedAt: "2026-10-22T14:55:00+04:00",
        kind: "lineup",
        label: "Lineup",
        title: "Field Day 2027 lineup by stage, Sydney — festival guide",
        description: "Field Day 2027 lineup, The Domain, Sydney, 1 Jan: Major Lazer, Mall Grab, Sub Focus and every act on Centre Field, Tree Top and Camp Ground. Festival guide.",
        h1: "Field Day 2027 lineup",
        lede: "Field Day 2027 at The Domain in Sydney on Friday 1 January 2027 is headlined by Major Lazer, Mall Grab and Sub Focus, with 26 more acts across three stages. [editions.0] [lineup.headliners] [lineup] The organiser's list, read 21 October 2026, is below as fieldday.com.au has it: A to Z within each stage, so the order is alphabetical and says nothing about who plays when. [lineup.note] Set times haven't been published. [lineup.note]",
        sections: [
          {
            id: "headliners",
            heading: "Three headliners, announced in two steps",
            body: "The lineup went out on 1 September 2026 (AEST) with Major Lazer and Sub Focus named and a \"secret headliner\" held back; the organiser's page carries no date, and The Note's byline dates it 1 September 2026. [sales_timeline.0] [lineup.announced_note] On 16 October 2026 the secret headliner was revealed as Mall Grab, as Rolling Stone AU and The Note reported that day. [sales_timeline.6] The Botanic Gardens' listing says Major Lazer are \"making their return to Australia for the first time in 11 years\"; The Note of 1 September says the same. [history.3.venue_listing] [lineup.note]",
          },
          {
            id: "centre-field",
            heading: "Centre Field",
            body: "The main stage. Major Lazer, Mall Grab and Sub Focus headline Centre Field (Fuzzy's event page, Moshtix). [history.3] [lineup.headliners_stage] VIP has a viewing platform here, and the organiser lists a ramped accessible viewing platform facing the stage. [prices.7] [rules.6] Then, A to Z: Andy C, Elderbrook, Hannah Laing, Łaszewo, nimino; plus MAD.DAY and Tiff Cornish, listed after the A-to-Z run. [lineup.centre_field_az] [lineup.centre_field_plus]",
          },
          {
            id: "tree-top",
            heading: "Tree Top",
            body: "A to Z: Boys Noize, Club Angel, Funk Tribu, Joe Hunt, Julian Fijma, MPH, Oppidan, southstar, WOLTERS; plus Cassette and Stacie Fields. [lineup.tree_top_az] [lineup.tree_top_plus]",
          },
          {
            id: "camp-ground",
            heading: "Casamigos Camp Ground",
            body: "The stage the Botanic Gardens' listing describes as \"proudly curated by the LGBTQIA+ community\". [history.3.venue_listing] A to Z: 2charm, Disco Dora, Fried Pork Chop, Jawbreakers, Latifa Tee, Loosie Grind, TANZER, Tiddalicious. [lineup.casamigos_camp_ground_az] The Camp Ground stage first appeared in 2026, as The Note reported in October 2025. [editions.1.note]",
          },
          {
            id: "reading",
            heading: "How to read the list",
            body: "Names and capitalisation are as fieldday.com.au has them: \"Łaszewo\" with its Polish Ł, \"nimino\" and \"southstar\" in lower case, \"MAD.DAY\" in capitals where Moshtix writes \"Mad.Day\". [lineup.note] Jawbreakers are on the organiser's site but not on Moshtix, Fuzzy's event page or the 16 October stories. [lineup.note] Fuzzy's terms allow it to \"add, withdraw, reschedule or substitute artists\", and a lineup change isn't grounds for a refund. [lineup.note] [rules.4] No set times have been published for 2027, and this page won't list any until the organiser does. [lineup.note] [not_found]",
          },
          {
            id: "field-day-2026",
            heading: "Field Day 2026, for comparison",
            body: "The previous edition, Thursday 1 January 2026 at The Domain, was headlined by Carl Cox and Jamie Jones, announced by The Note on 28 October 2025 as \"a special solo back-to-back sets from legendary British DJ Carl Cox and Welsh producer Jamie Jones\", with Deborah De Luca, Kölsch, Patrick Topping and The Presets on the bill. [editions.1] [editions.1.note] Fuzzy's About page calls that edition \"celebrating 25 years in 2026\". [history.1]",
          },
        ],
        faq: [],
        sourcesHeading: "Sources",
        sourcesNote: "(read 21 October 2026 unless dated)",
        sources: "[Field Day, official site](/go/field-day-official/) [sources.s1]\n[Moshtix, Field Day 2027](/go/field-day-tickets/) [sources.s3]\n[Fuzzy, Field Day event page](/go/field-day-fuzzy/), read 22 October 2026 [sources.s2]\nFuzzy, About (named, not linked) [sources.s6]\n[Botanic Gardens of Sydney, What's On: Field Day](/go/field-day-venue/) [sources.s7]\nThe Note, 1 September 2026 and 28 October 2025; Rolling Stone AU, 16 October 2026 (dates and the 2026 bill only, not linked). [sources.s12] [sources.s13] [sources.s14]",
      },
      {
        slug: "field-day/faq",
        createdAt: "2026-10-22T14:55:00+04:00",
        updatedAt: "2026-10-22T14:55:00+04:00",
        kind: "faq",
        label: "FAQ",
        title: "Field Day 2027 FAQ: 18+, pass-outs, bags — festival guide",
        description: "Field Day 2027 answers from the organiser, Moshtix, Fuzzy's terms and the venue: age and ID, pass-outs, what you can't bring, hours, stations. Sydney festival.",
        h1: "Field Day 2027 FAQ",
        lede: "Field Day 2027 is on Friday 1 January 2027 at The Domain in Sydney, from 12pm (Moshtix) to 11pm (the Botanic Gardens' listing), and strictly 18+. [editions.0] [gates.0] [age] The answers below come from the organiser's page, Moshtix, Fuzzy's terms and conditions and the Botanic Gardens of Sydney, each read on 21 or 22 October 2026 and named in its answer; where the organiser hasn't said anything yet, the answer says so.",
        sections: [
          {
            id: "cant-bring",
            heading: "What you can't bring: Fuzzy's terms, clause 3.3, read 22 October 2026",
            body: "The terms' list of restricted or prohibited items, in the order the terms give it: [rules.1]\n\n- glass bottles or cans, including perfume bottles and makeup containers\n- any liquids, including alcohol, e-cigarette liquids and pump sunscreen\n- illicit drugs\n- knives or other dangerous weapons, including \"potential missiles\"\n- flares, fireworks or sparklers\n- lasers or laser pointers\n- animals or pets, other than guide dogs\n- professional recording or broadcast devices without the promoter's permission\n- flags with poles, and large flags or banners that may block others' view\n- anything you intend to sell, hand out or use for promotion\n- large items including drink coolers and ice boxes (eskies) and chairs, including fold-up chairs\n- umbrellas\n- \"dangerous goods\": anything else Security or Management decide may cause injury or public nuisance\n- plastic drink containers, sealed or opened; only empty, clear, reusable water bottles are allowed in\n- drones or other airborne recording devices\n- metal drink bottles\n- any dangerous goods\n- bags or backpacks bigger than an A4 sheet of paper\n- anything else security or event staff deem dangerous\n\nPrescription medicine must be \"in its original packaging and untampered\", \"in a clear, resealable bag accompanied by the proof of script\", one day's dose only. [rules.1] The terms also say \"free earplugs are available from first aid\", \"Please keep your shirt on!\", that people and bags may be searched at entry, and anyone who refuses won't be let in, and that stage diving, moshing, climbing and crowd surfing are prohibited. [rules.1] Fuzzy \"may vary these T&Cs at any time without notice\" and says \"You should check our website to see the most up-to-date T&Cs\" (clause 4.1, read 22 October 2026). [rules.7]\n\n[Fuzzy, Terms and Conditions](/go/field-day-terms/)",
          },
        ],
        faqFirst: true,
        faq: [
          {
            q: "When is Field Day 2027?",
            a: "Friday 1 January 2027, New Year's Day, from 12pm to 11pm. The date is the organiser's and Moshtix's; the hours are the Botanic Gardens' listing, with Moshtix giving the 12:00pm start. [editions.0] [gates.0]",
          },
          {
            q: "Where is Field Day 2027? Is it still at The Domain?",
            a: "Yes: The Domain, Art Gallery Road, Sydney NSW 2000, the parkland on the eastern edge of the CBD near Woolloomooloo, on Gadigal Country (organiser; Moshtix venue page). [editions.0.venue] [venue.address] [venue.note]",
          },
          {
            q: "Is Field Day happening in 2026? Is Field Day 2026 happening?",
            a: "It's been and gone: Field Day 2026 was on Thursday 1 January 2026 at The Domain (The Note, 28 October 2025). The next edition is Field Day 2027 on Friday 1 January 2027 (organiser, read 21 October 2026). [editions.1] [editions.0]",
          },
          {
            q: "Where was Field Day 2026?",
            a: "Field Day 2026 was at The Domain too (Fuzzy's About page; The Note), the same park as 2027. [questions.20] [editions.1]",
          },
          {
            q: "Who is on the Field Day 2027 lineup?",
            a: "Major Lazer, Mall Grab and Sub Focus headline; the other 26 acts run A to Z by stage on Centre Field, Tree Top and Casamigos Camp Ground (organiser, read 21 October 2026). The full list is on the lineup page. [lineup.headliners] [lineup.note] → /field-day/lineup/",
          },
          {
            q: "Who was the secret headliner?",
            a: "Mall Grab, revealed on 16 October 2026 (Rolling Stone AU, The Note); The Note of 1 September 2026 and the Botanic Gardens' listing had both promised \"a secret headliner\". [sales_timeline.6] [sales_timeline.0]",
          },
          {
            q: "Who will be performing at Field Day 2026 in Sydney?",
            a: "If you mean the coming New Year's Day, that's Field Day 2027: Major Lazer, Mall Grab, Sub Focus and the stage lists on the lineup page. If you mean the edition that's passed, Field Day 2026 was headlined by Carl Cox and Jamie Jones (The Note, 28 October 2025); more of the 2026 bill is on the lineup page. [lineup.headliners] [editions.1] → /field-day/lineup/",
          },
          {
            q: "How much are Field Day 2027 tickets?",
            a: "{{until prices}}On 21 October 2026 Moshtix listed General Admission (GA) at $199.90, $219.90, $229.90 and $249.90 by release with the $10 fee included, VIP at $309.90 and the Fast Forward Pass at $44.90; the cheapest GA ticket on sale was Second Release at $219.90, because the $109.90 18–25s ticket and First Release were \"Allocation Exhausted\". The tickets page has every row. [prices.3] [prices.4] [prices.5] [prices.6] [prices.7] [prices.8] [prices.0] → /field-day/tickets/{{/until}}",
          },
          {
            q: "Is Field Day 2027 sold out? What release is it on?",
            a: "On 21 October 2026, no: Second, Third and Final Release, VIP and the Fast Forward Pass were all on sale at Moshtix; only the 18–25s and First Release read \"Allocation Exhausted\". Moshtix doesn't say which release is \"current\"; it shows what you can buy. [editions.0.note] [prices.4] [prices.5] [prices.6]",
          },
          {
            q: "Where do I buy tickets?",
            a: "Moshtix, and in the organiser's words, \"Moshtix and Moshtix only\"; [the Moshtix page](/go/field-day-tickets/) calls itself \"the only official online ticketing outlet\" (both read 21 October 2026). [sellers.0.role]",
          },
          {
            q: "Is Field Day 18+?",
            a: "Yes. \"The event is strictly 18+, so you'll need valid photo ID to enter\" (organiser); Moshtix says the same. Fuzzy's terms accept a current photo driver's licence, a current passport or an accepted Proof of Age card. [age] [age.note]",
          },
          {
            q: "What is the {{until prices}}$99.90 {{/until}}18–25s ticket and can I still get one?",
            a: "A ballot ticket for people born between 2 January 2001 and 1 January 2009 inclusive{{until prices}}, $99.90 plus a $10 fee{{/until}}, allocated by random draw from all eligible requests. [prices.0.allocation] Requests ran 2 to 6 September 2026 and were fulfilled on 7 September; on 21 October 2026 the organiser's page said entries were closed and Moshtix marked the ticket \"Allocation Exhausted\" with sales closed on 10 September. It can't be name-changed and has no payment plan. [age.note] [sales_timeline.1] [sales_timeline.2] [sales_timeline.7] [prices.0] [resale] [prices.10]",
          },
          {
            q: "What are MobTix and Affordability Tix?",
            a: "Two request-only tickets{{until prices}} at $99.90 plus fees{{/until}}: MobTix for Aboriginal and Torres Strait Islander people, Affordability Tix for holders of selected Concession Cards and people on eligible government payments (organiser). {{until mobtix}}The MobTix form, read 21 October 2026, takes entries until 1 December 2026 with purchase by 31 December; [the organiser's page](/go/field-day-official/) gives no dates for Affordability Tix, so this guide can't say whether its requests are open.{{/until}} [sellers.2] [sellers.3] [prices.1] [prices.2]",
          },
          {
            q: "Can I pay in instalments?",
            a: "\"Afterpay and PayPal Pay in 4 are available via Moshtix during the presale and general on sale. Payment plans are not available for the 18-25s Ticket\" (organiser, read 21 October 2026). [prices.10]",
          },
          {
            q: "What time does Field Day start and finish?",
            a: "12pm to 11pm on the Botanic Gardens' listing; Moshtix gives a 12:00pm start; the organiser hasn't published gate times. Set times aren't published, and this guide doesn't guess when they will be. [gates.0] [lineup.note] [not_found]",
          },
          {
            q: "How do I get to The Domain? Which station?",
            a: "The organiser recommends public transport and says its own transport details are coming \"closer to the event\". The Botanic Gardens' visitor page, written for the Garden next door, says \"St James, Martin Place and Circular Quay stations are all about a 10-minute walk\" from the Garden and, for ferries, \"The Garden is an easy 10-minute walk from the wharves\". Friday 1 January 2027 is a public holiday in NSW (NSW Government): plan the trip for that date in the [Transport for NSW Trip Planner](/go/field-day-trip-planner/). [transport.0] [transport.1] [public_holiday]",
          },
          {
            q: "I'm flying in. How do I get from the airport?",
            a: "By train from [the stations under both terminals](/go/field-day-airport/) on the T8 Airport & South Line, called the T8 SYD Airport & South West Line from Sunday 15 November 2026, when every service runs via the Airport Tunnel (Transport for NSW). Plan the trip from the airport for 1 January 2027 in the [Transport for NSW Trip Planner](/go/field-day-trip-planner/). [transport.2] [transport.3]",
          },
          {
            q: "Can I drive and park?",
            a: "The Botanic Gardens' visitor page lists metered parking on Mrs Macquaries Road and Hospital Road and two bookable car parks, the Domain Car Park and The Wharf Woolloomooloo Car Park. That's the Gardens' usual visitor info, not anything set up for Field Day; the organiser recommends public transport and, as of 21 October 2026, hasn't announced road closures, rideshare pick-up or parking for the day. [transport.4] [transport.0] [not_found]",
          },
          {
            q: "Can I leave and come back?",
            a: "No. The organiser: \"pass-outs and re-entry are not permitted\". Fuzzy's terms: \"No passouts will be permitted, unless otherwise advised\". [gates.1]",
          },
          {
            q: "What can't I bring? Can I bring a water bottle?",
            a: "An empty, clear, reusable water bottle is allowed; any liquid, and any sealed or opened plastic drink container, isn't. The main items on Fuzzy's list are glass bottles or cans, any liquids, umbrellas, drink coolers and ice boxes (eskies), chairs, metal drink bottles, drones, laser pointers and bags bigger than an A4 sheet of paper; the full list, with what the terms say about medicine and searches, is in [the section below](/field-day/faq/#cant-bring) (Fuzzy's terms, clause 3.3, read 22 October 2026). [rules.1]",
          },
          {
            q: "Can I bring food or drinks?",
            a: "No BYO alcohol and no liquids (Fuzzy's terms); food and drinks are on sale inside: \"Food, alcohol and non-alcoholic beverages will be available for purchase at the event\". The event is fully licensed and alcohol sales follow Responsible Service of Alcohol (RSA) rules. [rules.2]",
          },
          {
            q: "What do the terms say about sniffer dogs and safety?",
            a: "The terms state that \"Many festivals and events across Australia have been targeted by sniffer dog operations\". Fuzzy's Party Safe page describes a Patron Care team with first-aid accreditation and harm-reduction training, invites patrons to do the Australian Festival Association's Party Safe training, and says this messaging is emailed to ticket holders before the event. This guide adds nothing of its own. [rules.5]",
          },
          {
            q: "Can I sell or transfer my ticket? Is there an official resale?",
            a: "No official resale is named for Field Day 2027; the organiser says \"Be wary of scammers and unofficial resale\". Fuzzy's terms say \"we may offer an official resale facility once an event has sold out\", at the original ticket price plus fees, and that \"There are laws in place in certain states that prohibit resale of tickets to certain events or limit the prices at which they may be resold\". Name changes may be offered to friends and family for a fee per ticket through tickets@fuzzy.com.au; not for the 18–25s ticket. [resale]",
          },
          {
            q: "What if it's cancelled or the lineup changes?",
            a: "Fuzzy's terms, read 22 October 2026: no refund if you change your mind. If the event is cancelled, \"We will only refund the original Ticket price and not any booking fees or other transaction costs you might incur. We will use reasonable efforts to pay refunds within 28 days after the date the cancelled event was scheduled to occur.\" If the date or venue changes, the ticket stays valid; there is no refund when the new date is within a reasonable time, or the new venue within a reasonable distance with similar facilities. A lineup change gives no refund. [rules.4]",
          },
          {
            q: "Is there a VIP area? What is the Fast Forward Pass?",
            a: "VIP{{until prices}} ($309.90 with the fee){{/until}} gets you into a VIP area with its own bar and toilets, its own entry lane and a viewing platform at Centre Field. The Fast Forward Pass{{until prices}} ($44.90 with its fee){{/until}} is an add-on to a GA ticket, \"Must be paired with a GA festival ticket\" on Moshtix: a dedicated entry lane and express bar and toilet lanes (Moshtix, organiser, read 21 October 2026). [prices.7] [prices.8] [prices.8.seller_label]",
          },
          {
            q: "Is Field Day accessible? Are there Companion Card tickets?",
            a: "The organiser lists a ramped viewing platform at the Centre Field stage, an accessibility hotline by phone or text, lowered bar counters, an accessible entry lane and Companion Card tickets. Buy any ticket, then complete the Accessibility Request via the \"Accessibility Information\" button on the Moshtix page; Companion tickets go through Moshtix ticket support ([organiser's accessibility page](/go/field-day-accessibility/), Moshtix). [rules.6]",
          },
          {
            q: "When do I get my tickets?",
            a: "By email, as e-tickets; Moshtix sends them \"closer to the event\". Each carries a name and date of birth{{until prices}}, and a wrong spelling or date costs $12.50 to reissue{{/until}} (Fuzzy's terms; Moshtix). [rules.3]",
          },
          {
            q: "Is this the London Field Day?",
            a: "No. This guide is for Field Day in Sydney, Fuzzy's New Year's Day festival at The Domain. A London festival is also called Field Day; it is a different event and isn't covered here. [questions.23] [event.name_forms]",
          },
        ],
        sourcesHeading: "Sources",
        sourcesNote: "(read 21 October 2026 unless dated)",
        sources: "[Field Day, official site](/go/field-day-official/) [sources.s1]\n[Moshtix, Field Day 2027](/go/field-day-tickets/) [sources.s3]\n[Fuzzy, Terms and Conditions](/go/field-day-terms/), read 22 October 2026 [sources.s4]\nFuzzy, Party Safe (named, not linked) [sources.s16]\nFuzzy, About (named, not linked) [sources.s6]\n[Botanic Gardens of Sydney, What's On: Field Day](/go/field-day-venue/) [sources.s7]\n[Botanic Gardens of Sydney, Getting here](/go/field-day-getting-here/) [sources.s10]\n[Transport for NSW, Getting to and from Sydney Airport](/go/field-day-airport/) [sources.s11]\n[Transport for NSW, Trip Planner](/go/field-day-trip-planner/), read 22 October 2026 [sources.s19]\n[NSW Government, NSW public holidays](/go/field-day-public-holidays/), read 22 October 2026 [sources.s18]\nThe Note, 1 September 2026 and 28 October 2025; Rolling Stone AU, 16 October 2026 (dates and the 2026 bill only, not linked). [sources.s12] [sources.s13] [sources.s14]",
        anchors: [{ target: "/field-day/tickets/", text: "The tickets page" }],
      },
    ],
  },
];
