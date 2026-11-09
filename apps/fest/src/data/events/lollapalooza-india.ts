// Lollapalooza India: the event as the scout's sheet has it, and its guide.
//
// Generated once from the card (~/mind/ai/dubai/events/tasks/
// 2026-11-06-lollapalooza-india-en.md) and edited by hand from here on.
// The sheet is section 1's YAML, values verbatim with the scout's rounds 2
// and 3 merged, its # comments as // comments. The card's working notes
// (the segment, the planned paths, the SERP) are no page's facts and stay
// on the card: no tag cites them. Two keys are the executor's, each marked
// where it stands: bms.floor, the listing's floor as a number, and
// sources.s15, the scout's Crewfare comment as a source. The copy is the
// writer's round 2 with round 3's fifteen replacements, [key] tags and
// {{until prices}} spans as written. The build's placings, not the copy's
// words:
// - the main lede's paragraph 2, the line on why the guide exists, is the
//   main page's last section, "Why this guide", as on UNTOLD Dubai;
// - main s1's second paragraph is three, cut at "There are day tickets
//   too." and "You can buy up to 10 tickets per person." (the fest
//   director, gate 3 item 1: a nine-sentence block on a 320 px phone);
// - each page's Sources list is its sources block, and its foot links its
//   links line;
// - a subpage's crumb is its label (the director's gate-3 item 2);
// - "the location page" anchors on the page labelled "Getting there";
// - the location page's map block is not built: GuidePage's map slot sets
//   its link under the 44 px tap target on a phone, a layout fix of its
//   own, and the same link stands in the page's first section.
//
// The layout is what tools/record-blocks.mjs reads: each record opens on a
// line that is a brace at two spaces (a guide's pages at six), its slug on
// the next line, and both dates on lines of their own. The take-down of the
// prices on 21 December re-dates the main and tickets pages. A sheet edit
// is the event's, and moves every page through `with` in ../../dated.ts.
//
// No @dst/* import and nothing but erasable TypeScript: tools/lastmod.mjs
// loads this file through dated.ts with Node's type stripping.
import type { FestEvent, Guide } from "../types";
export const events: FestEvent[] = [
  {
    slug: "lollapalooza-india",
    createdAt: "2026-11-09T11:28:00+04:00",
    updatedAt: "2026-11-09T11:28:00+04:00",
    name: "Lollapalooza India",
    edition: { start: "2027-01-23", end: "2027-01-24" },
    // Keys the copy cites that hold no readOn of their own. The scout read
    // the onsite block in the organiser's FAQ (s3) on 6 November 2026, as
    // its comment there says; a comment is no date a parser keeps.
    readOverrides: {
      "onsite.bags": "2026-11-06",
      "onsite.water": "2026-11-06",
      "onsite.food": "2026-11-06",
      "onsite.smoking": "2026-11-06",
      "onsite.cameras": "2026-11-06",
      "onsite.seating": "2026-11-06",
      "onsite.pets": "2026-11-06",
      "onsite.accessibility": "2026-11-06",
      "onsite.app": "2026-11-06",
      "onsite.map": "2026-11-06",
      "onsite.aftershows": "2026-11-06",
      "onsite.hotels": "2026-11-06",
    },
    // The MusicEvent on the guide's main page (rules.ts). The dates are the
    // organiser's, days only: no source gives a gate time (times.daily). The
    // address is the venue's own (venue.address, s8), the point the
    // organiser's pin (venue.lat, venue.lon). The organisers are the three
    // the sheet and the main page name (event.organiser and its comment):
    // Lollapalooza, LLC (s1's footer), C3 Presents (s6's byline) and
    // BookMyShow Live (s3), the site as sameAs on the first only, since no
    // source gives the others' own (the SEO lead, gate 3 note 5). One offer,
    // the listing's floor (bms.floor), valid from the general sale
    // (ticket_status.general_sale.start, s13; the SEO lead's note 4), with
    // no name, since it is no tier, and no priceValidUntil, since no source
    // names an end of sale. InStock as the listing read on 9 November 2026
    // (bms.status), and only until the prices come down.
    markup: {
      startDate: "2027-01-23",
      endDate: "2027-01-24",
      address: { streetAddress: "Race Course, K.K. Marg, Mahalakshmi", addressLocality: "Mumbai", addressRegion: "Maharashtra", postalCode: "400034", addressCountry: "IN" },
      organizer: [{ name: "Lollapalooza, LLC", url: "https://www.lollaindia.com/" }, { name: "C3 Presents" }, { name: "BookMyShow Live" }],
      offers: [{ seller: "BookMyShow", go: "tickets", validFrom: "2026-09-03", availability: "InStock", price: { key: "bms.floor", currency: "INR" } }],
      // The organiser's own written bill: s6's four headliners and eight acts, and the two its Instagram captions name (lineup.also_named_by_organiser). Never the seller's 43 (lineup.seller_listing), which no organiser text carries (the SEO lead, gate 2 note 11).
      performers: ["lineup.headliners", "lineup.acts", "lineup.also_named_by_organiser"],
    },
    sheet: {
      event: {
        name: "Lollapalooza India",
        slug: "lollapalooza-india",
        organiser: "Lollapalooza, LLC / C3 Presents (Live Nation), produced in India with BookMyShow Live",
        kind: "music festival",
        edition_no: 5,
        source: "s1",
        readOn: "2026-11-06",
      },
      // organiser line: the site footer reads "©Lollapalooza, LLC" (s1); the line-up release is bylined C3 Presents (s6);
      // every contact address on the organiser FAQ is @bookmyshow.com and the drinking-water answer names "events produced by BookMyShow Live" (s3)
      editions: [
        {
          year: 2027,
          start: "2027-01-23",
          end: "2027-01-24",
          days: "Saturday 23 and Sunday 24 January 2027",
          status: "announced",
          venue: "v1",
          source: "s1",
          readOn: "2026-11-06",
        },
        // organiser FAQ: "Lolla India will return for its fifth edition on Jan 23-24, 2027, at Mahalaxmi Race Course, Mumbai." (s3)
        {
          year: 2026,
          start: "2026-01-24",
          end: "2026-01-25",
          status: "held",
          venue: "v1",
          note: "fourth edition",
          source: "s12",
          readOn: "2026-11-06",
        },
        {
          year: 2023,
          start: "2023-01-28",
          end: "2023-01-29",
          status: "held",
          city: "Mumbai",
          note: "first edition; organiser site as archived 14 Jan 2023 reads 28-29 JANUARY 2023 MUMBAI",
          source: "s10",
          readOn: "2026-11-06",
        },
        // 2024 and 2025 editions: held (s11 says "over four editions" since the 2023 launch); exact dates not read at a source, see not_found
      ],
      times: {
        // UTC+05:30 on both days, no DST
        timezone: "Asia/Kolkata",
        daily: "approximately 8 hours on each day; exact timing and schedule to be announced closer to the festival",
        source: "s3",
        readOn: "2026-11-06",
      },
      venue: {
        key: "v1",
        // organiser's spelling (s1, s3); the venue itself writes "Mahalakshmi" in its address
        name: "Mahalaxmi Race Course",
        operator: "Royal Western India Turf Club (RWITC)",
        address: "Race Course, K.K. Marg, Mahalakshmi, Mumbai, Maharashtra 400034",
        lat: 18.979056,
        lon: 72.81616,
        geo_note: "the organiser's own Google Maps pin, labelled 'Mahalakshmi Race Course Gate 1' (s7); entry gate details for 2027 'will be shared closer to the festival dates' (s3)",
        city: "Mumbai",
        country: "IN",
        timezone: "Asia/Kolkata",
        // FAQ: "No, this is an open-air concert festival." (s3)
        open_air: true,
        source: ["s3", "s7", "s8"],
        readOn: "2026-11-06",
      },
      sellers: [
        {
          name: "BookMyShow",
          url: "https://in.bookmyshow.com/events/lollapalooza-india-2027/ET00513740",
          official: true,
          exclusive: true,
          note: "organiser FAQ: BookMyShow is the exclusive ticketing partner; tickets bought from any third party may be counterfeit and will not get you in",
          source: "s2",
          readOn: "2026-11-06",
        },
      ],
      ticket_status: {
        // the organiser's BOOK NOW links point to the live BookMyShow event (s1); per-tier availability NOT read (see not_found)
        status: "on sale",
        presale: {
          start: "2026-08-30 11:00 IST",
          note: "RuPay credit card holders only",
          source: "s3",
          readOn: "2026-11-06",
        },
        early_bird: {
          start: "2026-09-02 11:00 IST",
          source: "s3",
          readOn: "2026-11-06",
        },
        // round 2 additions (2026-11-09), from the organiser's Instagram (s13) and Linktree (s14):
        general_sale: {
          start: "2026-09-03",
          note: "organiser post of 3 Sep 2026: 'Lolla India 2027. General Sale is now LIVE - tickets in the link in bio'",
          source: "s13",
          post: "https://www.instagram.com/p/Dc0J-MDMSCD/",
          readOn: "2026-11-09",
        },
        day_tickets: {
          since: "2026-09-21",
          note: "organiser post of 21 Sep 2026: 'Day-wise tickets are now LIVE! Plan your weekend as per the acts you want to catch & book your tickets now - link in bio'; the organiser's Linktree button reads 'Day-Wise Tickets Are Live | BUY NOW!' and opens the BookMyShow listing (s5). The organiser's tickets page (s2) still describes only 2-day tickets: no day-ticket tier, inclusions or price is given at any organiser page. So: day tickets exist (organiser), sold on BookMyShow; what they include and cost is not_found",
          source: ["s13", "s14"],
          post: "https://www.instagram.com/p/DdjCrlmMpng/",
          readOn: "2026-11-09",
        },
        // round 3 (2026-11-09): post date corrected from 19 Oct to 20 Oct India time (fact-check round 2, note 6)
        day2_soldout: {
          on: "2026-10-20",
          note: "organiser post of 20 Oct 2026 (Tuesday, 09:01 IST; Instagram's logged-out page prints 19 Oct, which is US Pacific): 'Day 2 tickets across all categories except GA are now SOLD OUT! We're down to our last few GA Sunday tickets'. Day 2 is Sunday 24 January 2027. This is about the day tickets for Sunday; the organiser has said nothing about the 2-day passes being sold out, and BookMyShow still showed the festival as 'Available' on 9 Nov (bms.status)",
          source: "s13",
          post: "https://www.instagram.com/p/Des31hssVxo/",
          readOn: "2026-11-09",
        },
        limit: "up to 10 tickets per person",
        upgrades: "write to contactus.lollaindia@bookmyshow.com to move up a category, subject to availability",
        refunds: "tickets are not transferable or cancellable; if the event is cancelled, refund or carry-forward is offered, convenience and delivery fees not refunded",
        delivery: "the ticket is an RFID wristband, home-delivered about a week before the event; late buyers collect it at the venue box office on 23-24 Jan with the BookMyShow booking and a government photo ID; the wristband is also the only payment method inside (cashless top-up by QR)",
        reentry: "entry is permitted only once per day",
        source: ["s2", "s3"],
        readOn: "2026-11-06",
      },
      // the organiser's tickets page (s2) describes only 2-day passes; day tickets exist too, per the organiser's socials (ticket_status.day_tickets, round 2); names and inclusions from s2; NO prices on the organiser site
      tiers: [
        {
          label: "2-Day General Admission (GA)",
          includes: "both days, 4 stages, 40+ performances, food park, bars, free water stations",
          source: "s2",
          readOn: "2026-11-06",
        },
        {
          label: "2-Day Lolla Comfort by RuPay Credit",
          includes: "GA plus shaded Comfort zone with first-come seating, air-conditioned restrooms, own bar and food stalls",
          source: "s2",
          readOn: "2026-11-06",
        },
        {
          label: "2-Day Lolla VIP",
          includes: "GA plus on-field viewing at the 2 main stages, VIP zone, own bar, AC restrooms, fast entry lane, concierge",
          source: "s2",
          readOn: "2026-11-06",
        },
        {
          label: "2-Day RuPay Credit Amplified Access",
          includes: "VIP + Comfort + GA plus food, merch and cocktail/mocktail vouchers; RuPay credit card holders only",
          source: "s2",
          readOn: "2026-11-06",
        },
        // round 2: shuttle and parking reworded to s2's own text (fact-check note 6)
        {
          label: "2-Day Lolla Platinum by Johnnie Walker",
          includes: "AC lounge facing Main Stage 1, front-of-stage pits at Main Stages 1-2 and console areas at Stage 3 and Perry's Stage, complimentary food and bar in the lounge, shuttle between the main festival entrance, lounge and viewing pits, home-delivered kit, preferred parking adjacent to the venue, details closer to the event",
          source: "s2",
          readOn: "2026-11-09",
        },
        {
          label: "Lolla Platinum Weekend Under 25",
          includes: "Platinum for ages 5-25",
          source: ["s2", "s3"],
          readOn: "2026-11-06",
        },
        // the FAQ category list names GA, Lolla Comfort, Lolla VIP, Lolla Platinum (and on the tickets page RuPay Amplified Access)
      ],
      // per-tier prices not read at the seller: BookMyShow returns 403 to fetch and curl, and opening it in the browser pane was declined on 6 and 9 Nov (see not_found). The listing's floor is in bms.price below
      prices: [],
      // the session's reading of the BookMyShow listing (s5) in the user's Chrome, 6 Nov 2026, re-read 9 Nov 2026: price and status unchanged, so readOn moves to 2026-11-09 (round 2). This block supersedes the one the writer proposed in section 3; same values, new date, plus the Artists block
      bms: {
        price: "₹4499 onwards",
        // The executor's, not the scout's: the listing's "₹4499 onwards" as the number the MusicEvent's offer needs (rules.ts, channel). Never printed.
        floor: {
          amount: 4499,
        },
        status: "Available",
        login: "the per-tier list sits behind 'Login to book', not read",
        dates: "Sat 23 Jan 2027 - Sun 24 Jan 2027",
        hours: "8 Hours",
        languages: ["English", "Hindi"],
        genres: ["EDM", "Hip Hop", "Pop", "Rock"],
        stages: "four iconic stages",
        // the organiser's FAQ and terms win on age; the copy names no age from this line
        age_line: "All age groups",
        // the listing's Artists block on 9 Nov; the names the session noted are in lineup.seller_listing
        artists_count: 43,
        source: "s5",
        readOn: "2026-11-09",
      },
      age: {
        min: 0,
        rule: "family-friendly; children aged 0-5 enter free with a ticket holder; from age 5 (born before 23 Jan 2022) a child needs a ticket in the same category as the accompanying adult; Lolla Platinum Under 25 ticket for ages 5-25",
        alcohol: "service and consumption subject to applicable age restrictions and local laws (no age figure given)",
        buyer: "BookMyShow transactions only by persons over 18 (terms)",
        conflict: "tickets page says born before 22 January 2022, FAQ says born before Jan 23, 2022; write 'from age 5' and cite the FAQ",
        source: ["s2", "s3", "s4"],
        readOn: "2026-11-06",
      },
      lineup: {
        announcedOn: "2026-09-03",
        headliners: ["Olivia Dean", "Limp Bizkit", "KATSEYE", "Fontaines D.C."],
        acts: [
          "5 Seconds of Summer",
          "St. Vincent",
          "Steve Angello",
          "¥ØU$UK€ ¥UK1MAT$U",
          "Stewart Copeland and Ricky Kej",
          "Rachel Chinouriri",
          "Ecca Vandal",
          "Alain Johannes",
        ],
        // round 2: reworded to s6's own text (fact-check note 7); s6 re-read 2026-11-09, no act added since 3 Sep, no update date
        note: "the release adds 'many more' and lists ten named acts as debut performances in India: all but Steve Angello and Stewart Copeland and Ricky Kej; organiser site: 4 stages, 40+ performances; the organiser FAQ still says the 2027 line-up and day-wise schedule will be posted on its socials 'soon'",
        source: "s6",
        readOn: "2026-11-09",
        // round 2 additions (2026-11-09). The organiser's site has no line-up page (its 'lineup-schedule' id is only the FAQ category above). The organiser's socials (s13) carry the rest:
        // acts the organiser's own Instagram captions name as playing Lolla India 2027, beyond the 12 of s6
        also_named_by_organiser: [
          {
            act: "Scribe",
            note: "Mumbai post-hardcore band, organiser's artist post of 5 Oct 2026",
            source: "s13",
            post: "https://www.instagram.com/p/DeHOX2UMmKj/",
            readOn: "2026-11-09",
          },
          {
            act: "Noni-Mouse",
            note: "electronic, organiser's 'Friday Fix' post of 6 Nov 2026: 'come see her live at Lolla India'",
            source: "s13",
            post: "https://www.instagram.com/p/DfZ2mlrjLNU/",
            readOn: "2026-11-09",
          },
        ],
        poster: "the full bill, split by day, is published by the organiser only as an image: the Instagram post of 21 Sep 2026 ('Day-wise tickets are now LIVE! Plan your weekend as per the acts you want to catch'), s13. Its text was not read (image, no transcription at an organiser or seller page); see not_found",
        seller_listing: {
          count: 43,
          named: [
            "Limp Bizkit",
            "Olivia Dean",
            "5 Seconds of Summer",
            "Fontaines D.C.",
            "Katseye",
            "Steve Angello",
            "St Vincent",
            "2manydjs",
            "Stewart Copeland - Ricky Kej",
            "The Manganiyar Seduction",
          ],
          note: "the BookMyShow listing's Artists block names 43 acts; the session noted these ten on 9 Nov. The organiser's s6 and captions win on spelling. 2manydjs and The Manganiyar Seduction appear at no organiser text yet; print them, if at all, as the seller's listing",
          source: "s5",
          readOn: "2026-11-09",
        },
      },
      transport: [
        {
          how: "Suburban rail, Western line: Mahalaxmi station",
          source: "s3",
          readOn: "2026-11-06",
        },
        {
          how: "Suburban rail, Central line: Byculla station",
          source: "s3",
          readOn: "2026-11-06",
        },
        {
          how: "Metro: Science Centre station (Aqua Line, Metro Line 3); monorail: Sant Gadge Maharaj Chowk (Jacob Circle)",
          source: ["s3", "s9"],
          readOn: "2026-11-06",
        },
        {
          how: "From the airport: Aqua Line (Metro Line 3) stops at CSMI Airport-T1 and CSMI Airport-T2 and runs south through Bandra-Kurla Complex, Dadar and Worli to Science Centre, the organiser's nearest metro station; MMRCL lists 27 stations, Aarey JVLR to Cuffe Parade, 33.5 km operational; first train from Aarey JVLR 05:55, last from Cuffe Parade 22:30",
          source: "s9",
          readOn: "2026-11-06",
        },
        {
          how: "From the city centre (south): the same Aqua Line northbound from Cuffe Parade, Churchgate Metro or CSMT Metro to Science Centre; or the Western line local to Mahalaxmi",
          source: ["s3", "s9"],
          readOn: "2026-11-06",
        },
        {
          how: "Bus stops: Mahalaxmi Station, Famous Studio, Ambika Mill (H.U. Rakhangi Chowk), Nehru Planetarium (Worli)",
          source: "s3",
          readOn: "2026-11-06",
        },
        {
          how: "No parking at the venue; the organiser urges public transport. Rideshare details to come. Lolla Platinum gets preferred parking adjacent to the venue",
          source: ["s2", "s3"],
          readOn: "2026-11-06",
        },
        {
          how: "Train times: the organiser points to the m-indicator app",
          source: "s3",
          readOn: "2026-11-06",
        },
        // MMRCL's list also has a 'Mahalaxmi Metro' station; the organiser names Science Centre, so the page names Science Centre only
      ],
      // all from the organiser FAQ (s3), readOn 2026-11-06
      onsite: {
        bags: "only bags smaller than A4 (30 x 18 cm): wallets, side bags, fanny packs; all bags scanned; no lockers",
        water: "free water stations; bring an empty, reusable, transparent bottle up to 500 ml",
        food: "Lolla Food Park and food carts; no outside food or drink",
        smoking: "designated areas only; no cigarette packets taken in (sold inside); no vaping",
        cameras: "phone cameras yes, professional cameras and video no",
        seating: "standing festival; limited seating only in Comfort, VIP, Platinum",
        pets: "not allowed",
        accessibility: "Indian Sign Language interpreters for select main-stage acts, crew to guide visually impaired guests, wheelchair risers, accessible gender-neutral toilets; the ground is uneven in places; no wheelchairs provided",
        app: "Festiverse is the official app",
        map: "festival map to be posted",
        aftershows: "pre-parties and aftershows: yes, to be announced",
        hotels: "organiser partners: Airbnb and Crewfare (hotel rates)",
      },
      // round 2 (2026-11-09): the organiser's 'Road to Lolla India' series, from its Instagram (s13) and Linktree (s14); tickets on BookMyShow (links not readable to this role)
      preshows: [
        // round 3 (2026-11-09): post date corrected from 5 Nov to 6 Nov India time
        {
          date: "2026-11-21",
          name: "Road to Lolla India: OX7GEN Live",
          venue: "Hideaway, Goa",
          note: "album launch (Aeon) with his band; organiser post of 6 Nov 2026 (Friday, 12:11 IST)",
          source: "s13",
          post: "https://www.instagram.com/p/DfY_JsjRgn8/",
          tickets: "https://in.bookmyshow.com/events/road-to-lolla-presents-ox7gen-live/et670712wa",
          readOn: "2026-11-09",
        },
        // round 3 (2026-11-09): post date corrected from 6 Nov to 7 Nov India time; label spelling confirmed from the caption (native reader round 2, note 2)
        {
          date: "2026-11-29",
          name: "Road to Lolla India: Amnap Records Showcase",
          acts: ["Madam X", "Jameszoo", "Raka Ashok"],
          venue: "The Humming Tree, Bengaluru",
          note: "organiser post of 7 Nov 2026 (Saturday, 12:06 IST). The caption writes the label 'Amnap Records' (capital A, lower-case mnap), not 'AMNAP'; the organiser's form stands",
          source: "s13",
          post: "https://www.instagram.com/p/DfbjZAiDgff/",
          tickets: "https://in.bookmyshow.com/events/road-to-lolla-india-amnap-records-showcase/etondt2se1",
          readOn: "2026-11-09",
        },
      ],
      history: [
        {
          text: "Lollapalooza's Indian edition began in Mumbai on 28-29 January 2023",
          source: "s10",
          readOn: "2026-11-06",
        },
        {
          text: "2027 is the fifth edition, again at Mahalaxmi Race Course",
          source: ["s3", "s6"],
          readOn: "2026-11-06",
        },
        {
          text: "the fourth edition ran 24-25 January 2026 at Mahalaxmi Racecourse",
          source: "s12",
          readOn: "2026-11-06",
        },
        {
          text: "the organiser's claim, reported by the press: the 2026 edition had the festival's highest attendance and Linkin Park drew the largest single-set crowd since the Indian debut",
          source: "s11",
          readOn: "2026-11-06",
          kind: "media-claim",
        },
        // no move or cancellation for 2027; the Untold Dubai note of 21 Oct does not apply to this card
      ],
      sources: {
        s1: {
          label: "Lollapalooza India, official site (home)",
          url: "https://www.lollaindia.com/",
          kind: "organiser",
        },
        s2: {
          label: "Lollapalooza India, Tickets",
          url: "https://www.lollaindia.com/tickets",
          kind: "organiser",
        },
        s3: {
          label: "Lollapalooza India, Get Festival Ready (FAQ, getting here)",
          url: "https://www.lollaindia.com/festival-ready",
          kind: "organiser",
        },
        s4: {
          label: "Lollapalooza India, Terms and Conditions",
          url: "https://www.lollaindia.com/terms-and-conditions",
          kind: "organiser",
        },
        s5: {
          label: "BookMyShow, Lollapalooza India 2027",
          url: "https://in.bookmyshow.com/events/lollapalooza-india-2027/ET00513740",
          kind: "seller",
          note: "linked from s1; not readable by fetch, curl or the pane on 6 Nov",
        },
        s6: {
          label: "Live Nation Entertainment news (C3 Presents), line-up release, 3 Sep 2026",
          url: "https://news.livenationentertainment.com/news/olivia-dean-limp-bizkit-katseye-and-fontaines-d-c-to-headline-lollapalooza-india-2027",
          kind: "organiser",
        },
        s7: {
          label: "Organiser's Google Maps pin (linked from s3)",
          url: "https://maps.app.goo.gl/3628M1pdQHd4BNFe8",
          kind: "organiser",
        },
        s8: {
          label: "Royal Western India Turf Club, official contacts",
          url: "https://www.rwitc.com/officialcontact",
          kind: "venue",
        },
        s9: {
          label: "Mumbai Metro Rail Corporation (MMRCL), Aqua Line: home and FAQ",
          url: "https://mmrcl.com/passenger/pages/faqs",
          kind: "public body",
          note: "station list read from the site's own trip-planner data; first/last train from https://mmrcl.com/",
        },
        s10: {
          label: "lollaindia.com as archived on 14 Jan 2023 (Wayback Machine)",
          url: "http://web.archive.org/web/20230114215744/https://lollaindia.com/",
          kind: "organiser",
        },
        s11: {
          label: "The Hollywood Reporter India, 2027 dates story (updated 25 Aug 2026)",
          url: "https://www.hollywoodreporterindia.com/features/insight/lollapalooza-india-returns-to-mumbai-for-5th-edition-announces-january-dates",
          kind: "media",
        },
        s12: {
          label: "IANS, 2026 edition dates (19 Aug 2025)",
          url: "https://ianslive.in/4th-edition-of-lollapalooza-india-to-be-held-on-january-24-and-25-at-mumbais-mahalaxmi-racecourse--20250819111709",
          kind: "media",
        },
        s13: {
          label: "Lollapalooza India on Instagram (@lollaindia), the channel the organiser's FAQ names for line-up and schedule",
          url: "https://www.instagram.com/lollaindia/",
          kind: "organiser",
          note: "round 2, 9 Nov 2026: captions read in the built-in pane via the posts' /embed/captioned/ pages; each fact above carries its post permalink. Post images (the line-up posters) were not read. Round 3: post dates are India time, derived from the post ID (shortcode to media id, (id >> 23) + 1314220021721 ms); Instagram's logged-out page prints US Pacific dates, a day earlier for posts before 13:30 IST",
        },
        s14: {
          label: "Lollapalooza India, link page (Linktree, the 'link in bio')",
          url: "https://linktr.ee/lollaindia",
          kind: "organiser",
          note: "round 2, 9 Nov 2026: buttons 'Day-Wise Tickets Are Live | BUY NOW!' (to s5), 'Road to Lolla India' x2 (to BookMyShow), Crewfare, Airbnb, the site",
        },
        // also linked by the organiser, usable as /go/ targets: Crewfare https://crewfare.com/events/lollapalooza-india-2027/ ; Festiverse app https://apps.apple.com/us/app/festiverse/id6744997695
        // The executor's promotion of the scout's comment above (a URL the scout wrote down as a /go/ target, linked by the organiser from s3's hotels answer and s14's button), not a new reading: a hop traces to a source on its own host. The fact-checker opened it on 9 November 2026 (200).
        s15: {
          label: "Crewfare, Lollapalooza India 2027 (the organiser's hotel partner, linked from s3 and s14)",
          url: "https://crewfare.com/events/lollapalooza-india-2027/",
          kind: "seller",
        },
      },
      not_found: [
        "ticket prices per tier and phase: only BookMyShow has them, behind 'Login to book'; the listing's floor '₹4499 onwards' was read by the session on 6 and 9 Nov (bms). Press figures are leads only, not facts: Time Out 'from Rs 4,499' and 'one-day pass Rs 5,999 onwards' (22 Sep), Sunday Guardian / FPJ Rs 7,499 onwards, FPJ Platinum Rs 48,999 and VIP Rs 15,999 'sold out' (2 Sep)",
        "which 2-day passes are sold out: the organiser has said so only of the Day 2 (Sunday) day tickets, all categories except GA (20 Oct, ticket_status.day2_soldout); nothing on the 2-day passes; BookMyShow showed 'Available' on 9 Nov",
        "day tickets: what a day ticket includes and costs, and which categories it comes in. The organiser announced them (21 Sep) and sells them on BookMyShow, but its tickets page describes none",
        "day-wise line-up as text (which acts on 23 Jan, which on 24 Jan): the organiser published it as a poster image on Instagram (21 Sep post, s13); the organiser FAQ still says 'soon'. Time Out transcribed 21 + 21 acts on 22 Sep (Day 1 led by Fontaines D.C., Anuv Jain, 5 Seconds of Summer, Limp Bizkit; Day 2 by Olivia Dean, Steve Angello, Aditya Gadhvi, St. Vincent, KATSEYE), a lead, not a source. The one official text list is the BookMyShow Artists block (43 names), readable only in Chrome: the session may transcribe it if the writer wants the full bill",
        "the full poster beyond the release's list, including the Indian acts: same as above. Organiser text names only Scribe and Noni-Mouse beyond s6 (lineup.also_named_by_organiser); press names Anuv Jain, Indian Ocean, Aditya Gadhvi, Blackstratblues, Kayan, Yashraj, Rhea Raj, Varijashree Venugopal, Donn Bhat, Swadesi, Pinkshift, Isyana Sarasvati and more",
        "gate and set times for 2027 (organiser: about 8 hours a day, times to come; press says 2 pm to 10 pm for 2026)",
        "entry gate numbers for 2027, festival map, rideshare drop-off",
        "exact dates of the 2024 and 2025 editions at a primary source",
        "minimum age for alcohol at the venue (terms defer to local law, no figure)",
        "official resale: none; the organiser says tickets are not transferable",
        "box office opening hours on 23-24 Jan",
      ],
    },
    go: {
      official: {
        url: "https://www.lollaindia.com/",
        source: "s1",
        kind: "organiser",
        title: "The organiser's site for Lollapalooza India, 23–24 January 2027",
      },
      tickets: {
        url: "https://in.bookmyshow.com/events/lollapalooza-india-2027/ET00513740",
        source: "s5",
        kind: "seller",
        title: "The organiser's exclusive ticketing partner for 23–24 January 2027",
      },
      passes: {
        url: "https://www.lollaindia.com/tickets",
        source: "s2",
        kind: "organiser",
        title: "What each two-day pass includes, on the organiser's site",
      },
      info: {
        url: "https://www.lollaindia.com/festival-ready",
        source: "s3",
        kind: "organiser",
        title: "The organiser's answers on entry, bags, children and the way there",
      },
      terms: {
        url: "https://www.lollaindia.com/terms-and-conditions",
        source: "s4",
        kind: "organiser",
        title: "Refunds, age and alcohol in the organiser's terms",
      },
      lineup: {
        url: "https://news.livenationentertainment.com/news/olivia-dean-limp-bizkit-katseye-and-fontaines-d-c-to-headline-lollapalooza-india-2027",
        source: "s6",
        kind: "organiser",
        title: "C3 Presents' announcement of the 2027 headliners and acts",
      },
      instagram: {
        url: "https://www.instagram.com/lollaindia/",
        source: "s13",
        kind: "organiser",
        title: "The organiser's Instagram, where it posts the lineup and the day-wise schedule",
      },
      // The organiser's own pin (venue.lat, venue.lon, read from s7's short link). The copy's table gives s7; a maps hop is a plain search at the sheet's point, so it traces to `venue`. Google shows an unnamed pin there, which the title promises.
      maps: {
        url: "https://www.google.com/maps/search/?api=1&query=18.979056%2C72.81616",
        source: "venue",
        kind: "maps",
        title: "The organiser's map pin for Mahalaxmi Race Course, Gate 1",
      },
      metro: {
        url: "https://mmrcl.com/passenger/pages/faqs",
        source: "s9",
        kind: "public-body",
        title: "Aqua Line stations and train times from MMRCL",
      },
      venue: {
        url: "https://www.rwitc.com/officialcontact",
        source: "s8",
        kind: "venue",
        title: "The turf club that runs Mahalaxmi Race Course",
      },
      // Crewfare, the organiser's hotel partner (onsite.hotels): s15 is the executor's promotion of the scout's comment, not a new reading.
      hotels: {
        url: "https://crewfare.com/events/lollapalooza-india-2027/",
        source: "s15",
        kind: "seller",
        title: "Hotel rates from the organiser's hotel partner",
      },
    },
  },
];

export const guides: Guide[] = [
  {
    slug: "en-IN",
    createdAt: "2026-11-09T11:28:00+04:00",
    updatedAt: "2026-11-09T11:28:00+04:00",
    event: "lollapalooza-india",
    name: "Lollapalooza India 2027",
    lang: "en-IN",
    dir: "ltr",
    path: "/lollapalooza-india/",
    hubLabel: "English",
    hubBlurb: "Lollapalooza India returns to Mahalaxmi Race Course, Mumbai, on Saturday 23 and Sunday 24 January 2027, its fifth edition. The guide covers the six two-day passes and the day tickets sold only on BookMyShow, the announced lineup, and the local train and Aqua Line to the gate. [editions.0.days] [editions.0.venue] [event.edition_no] [tiers] [ticket_status.day_tickets] [sellers.0] [lineup.headliners] [transport.0] [transport.2]",
    hubPlace: "Mahalaxmi Race Course, Mumbai",
    // The listing's floor and the organiser's sold-out post were read on
    // 9 November 2026: 42 days good.
    expires: { prices: "2026-12-21" },
    footerNote: "An independent guide, written from the pages of the organiser, BookMyShow, the venue's operator and MMRCL. None of them is involved in it.",
    pages: [
      {
        slug: "lollapalooza-india",
        createdAt: "2026-11-09T11:28:00+04:00",
        updatedAt: "2026-11-09T11:28:00+04:00",
        kind: "main",
        label: "Guide",
        crumb: "Lollapalooza India 2027",
        title: "Lollapalooza India 2027 in Mumbai: dates — festival guide",
        description: "Lollapalooza India festival, Saturday 23 and Sunday 24 January 2027 at Mahalaxmi Race Course, Mumbai: two-day passes on BookMyShow, lineup, local train, metro.",
        h1: "Lollapalooza India 2027",
        anchors: [
          {
            target: "/lollapalooza-india/location/",
            text: "the location page",
          },
        ],
        glanceHeading: "At a glance",
        glance: [
          {
            label: "Dates",
            value: "Saturday 23 and Sunday 24\u00a0January\u00a02027 [editions.0.days]",
          },
          {
            label: "Venue",
            value: "Mahalaxmi Race Course, Mumbai [venue.name] [venue.city]",
          },
          {
            label: "Tickets",
            value: "BookMyShow only. Six two-\u2060day passes and day tickets [sellers.0] [tiers] [ticket_status.day_tickets]{{until prices}}. From ₹4,499 on 9\u00a0November\u00a02026 [bms.price]{{/until}}",
          },
          {
            label: "Headliners",
            value: "Olivia Dean, Limp Bizkit, KATSEYE, Fontaines D.C. [lineup.headliners]",
          },
          {
            label: "Ages",
            value: "all ages. Under\u00a05 free with a ticket holder [age.rule]",
          },
          {
            label: "Each day",
            value: "about 8\u00a0hours, times still to come [times.daily]",
          },
        ],
        glanceNote: "Read at the organiser's site on 6 November 2026, and at its Instagram and BookMyShow on 9 November 2026. [sources.s1] [sources.s13] [sources.s5]",
        lede: "Lollapalooza India 2027 is on Saturday 23 and Sunday 24 January 2027 at Mahalaxmi Race Course in Mumbai. [editions.0.days] [editions.0.venue] [venue.city] It is the fifth edition of Lolla India, as the organiser calls it, on the same racecourse as in January 2026. [event.edition_no] [editions.1.venue] [history.1] The organiser promises 4 stages and more than 40 performances over the two days. [tiers.0.includes] Your ticket is not a piece of paper. It is an RFID wristband, delivered to your home about a week before, and it is also how you pay for everything inside. [ticket_status.delivery]",
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
            q: "When and where is Lollapalooza India 2027?",
            a: "On Saturday 23 and Sunday 24 January 2027, at Mahalaxmi Race Course in Mumbai. It is the fifth edition. [editions.0.days] [editions.0.venue] [event.edition_no] Source: the organiser's FAQ, read 6 November 2026.",
          },
          {
            q: "Is KATSEYE coming to Lollapalooza India 2027?",
            a: "Yes. KATSEYE is one of the four headliners, with Olivia Dean, Limp Bizkit and Fontaines D.C. [lineup.headliners] Source: the C3 Presents lineup release of 3 September 2026, read 9 November 2026.",
          },
          {
            q: "How much are Lollapalooza India 2027 tickets?",
            a: "{{until prices}}On 9 November 2026 BookMyShow listed them from ₹4,499. [bms.price] {{/until}}The organiser's own site describes the six two-day passes but prints no prices, and says nothing about what a day ticket costs, so check the ticket you want on BookMyShow, the only official seller. [tiers] [ticket_status.day_tickets] [not_found.0] [sellers.0] Source: the BookMyShow listing, read 9 November 2026, and the organiser's tickets page, read 6 November 2026.",
          },
          {
            q: "Is Lollapalooza India 2027 sold out?",
            a: "{{until prices}}Not as a whole. On Tuesday 20 October 2026 the organiser posted that Day 2 tickets, for Sunday, were sold out in every category except GA. On 9 November 2026 BookMyShow still showed the festival as available, from ₹4,499. [ticket_status.day2_soldout] [bms.status] [bms.price] {{/until}}The organiser posts its sold-out notices on its Instagram, and BookMyShow shows which passes are left once you log in. [sources.s13] [bms.login] Source: the organiser's Instagram and the BookMyShow listing, read 9 November 2026.",
          },
          {
            q: "Can I resell my Lollapalooza India ticket?",
            a: "No. The organiser says tickets are not transferable or cancellable. It also warns that a ticket from any third party may be counterfeit and will not get you in. [ticket_status.refunds] [sellers.0.note] Source: the organiser's tickets page and FAQ, read 6 November 2026.",
          },
        ],
        sections: [
          {
            id: "tickets",
            heading: "Tickets: BookMyShow only",
            body: "The organiser's FAQ names BookMyShow as its exclusive ticketing partner. It warns that a ticket bought from any third party may be counterfeit and will not get you in. [sellers.0.note] {{until prices}}On 9 November 2026 the BookMyShow listing read ₹4,499 onwards and showed the festival as available. [bms.price] [bms.status] That is where the passes start, not what every pass costs.{{/until}} The price of each pass shows on BookMyShow once you log in to book. [bms.login]\n\nThe organiser's tickets page describes six passes, and every one of those covers both days. [tiers] They run from 2-Day General Admission to 2-Day Lolla Platinum by Johnnie Walker, with a Platinum pass for ages 5 to 25 as well. [tiers.0] [tiers.4] [tiers.5]\n\nThere are day tickets too. The organiser announced them on Monday 21 September 2026, sold on BookMyShow, and its pages do not say what a day ticket includes or costs. [ticket_status.day_tickets] [not_found.2] {{until prices}}On Tuesday 20 October 2026 it posted that Day 2 tickets, for Sunday 24 January, were sold out in every category except GA, with its last few GA Sunday tickets left. It said nothing about the two-day passes. [ticket_status.day2_soldout]{{/until}}\n\nYou can buy up to 10 tickets per person. [ticket_status.limit] Tickets cannot be transferred or cancelled, so buy for the people who will actually go. [ticket_status.refunds] What each pass adds, the day tickets, the wristband and refunds are on the tickets page. → /lollapalooza-india/tickets/\n\nLinks: [BookMyShow, Lollapalooza India 2027](/go/lollapalooza-india-tickets/) · [The organiser's tickets page](/go/lollapalooza-india-passes/)",
          },
          {
            id: "dates",
            heading: "Dates, hours and four editions before this one",
            body: "This is the fifth edition. Lollapalooza first came to India on Saturday 28 and Sunday 29 January 2023, in Mumbai. [editions.2] [history.0] The fourth edition ran on Saturday 24 and Sunday 25 January 2026 at Mahalaxmi Racecourse, as IANS reported the dates. [editions.1] [history.2] The Hollywood Reporter India reported the organiser's claim that 2026 had the festival's highest attendance yet. [history.3] The fifth edition, in 2027, goes back to the same ground. [history.1]\n\nEach day runs for about eight hours, the organiser's FAQ says. It will give the exact timing and schedule closer to the festival. [times.daily] Entry is allowed only once a day, so if you step out, you are out for that day. [ticket_status.reentry] The festival is open-air, and mostly standing. Seating is limited to the Comfort, VIP and Platinum areas. [venue.open_air] [onsite.seating]",
          },
          {
            id: "lineup",
            heading: "Lineup, as announced",
            body: "Is KATSEYE coming? Yes. KATSEYE heads the 2027 bill with Olivia Dean, Limp Bizkit and Fontaines D.C., in the lineup C3 Presents released on Thursday 3 September 2026. [lineup.headliners] [lineup.announcedOn] [sources.s6] The same release names 5 Seconds of Summer, St. Vincent, Steve Angello, ¥ØU$UK€ ¥UK1MAT$U, Stewart Copeland and Ricky Kej, Rachel Chinouriri, Ecca Vandal and Alain Johannes, and promises many more. [lineup.acts] [lineup.note] Since then the organiser's own Instagram has named two more acts in its captions, Scribe and Noni-Mouse. [lineup.also_named_by_organiser]\n\nWhich act plays which day? The organiser has posted its bill, split by day, as a poster on its Instagram, on Monday 21 September 2026. [lineup.poster] Its FAQ, read on 6 November 2026, still says the day-wise schedule will be posted on its social media soon, and set times are not out. [lineup.note] [times.daily] A two-day pass covers both days, so the split changes your plans, not your ticket. With a day ticket, the split decides which day you buy. [tiers] [ticket_status.day_tickets] The stages, the India debuts, the two pre-shows and the 2026 crowd are on the lineup page. → /lollapalooza-india/lineup/\n\nLinks: [The lineup release of 3 September 2026](/go/lollapalooza-india-lineup/) · [The organiser's Instagram](/go/lollapalooza-india-instagram/)",
          },
          {
            id: "location",
            heading: "Getting to Mahalaxmi Race Course",
            body: "Can you drive there? Not to the gate. There is no parking at the venue, and the organiser asks everyone to use public transport. [transport.6] By local train, get down at Mahalaxmi on the Western line or at Byculla on the Central line. [transport.0] [transport.1] By metro, take the Aqua Line (Metro Line 3) to Science Centre. [transport.2] Flying in? The Aqua Line stops at both airport terminals and runs south through Bandra-Kurla Complex (BKC), Dadar and Worli to Science Centre, all on the same line. [transport.3]\n\nThe organiser will share the 2027 gate details closer to the dates. [venue.geo_note] The monorail stop, the bus stops, the first and last metro trains and the venue's two spellings are on the location page. → /lollapalooza-india/location/\n\nLinks: [Open in maps](/go/lollapalooza-india-maps/) · [The organiser's getting-here guide](/go/lollapalooza-india-info/)",
          },
          {
            id: "why",
            heading: "Why this guide",
            body: "The organiser's answers are spread over its home page, its tickets page, a long FAQ, its Instagram and the BookMyShow listing. This guide puts the dates, the passes and the way to Mahalaxmi in one place, each fact with the day it was read. It is independent: Lollapalooza, C3 Presents and BookMyShow are not involved in it. [event.organiser] [sources.s13]",
          },
        ],
        sourcesHeading: "Sources",
        sources: "- Lollapalooza India (lollaindia.com): the home page, Tickets, Get Festival Ready (the FAQ and getting here) and the Terms and Conditions, read 6 November 2026, the Platinum card again on 9 November 2026. [sources.s1] [sources.s2] [sources.s3] [sources.s4]\n- Lollapalooza India on Instagram (@lollaindia), the channel its FAQ names for the lineup and the schedule, and its link page, read 9 November 2026. [sources.s13] [sources.s14]\n- BookMyShow, the Lollapalooza India 2027 listing, read 9 November 2026. [sources.s5]\n- C3 Presents, the lineup release of 3 September 2026 on Live Nation Entertainment's news site, read 9 November 2026. [sources.s6]\n- Mumbai Metro Rail Corporation (MMRCL), the Aqua Line, read 6 November 2026. [sources.s9]\n- For the past editions: the organiser's site as archived on 14 January 2023, The Hollywood Reporter India (updated 25 August 2026) and IANS (19 August 2025), read 6 November 2026. [sources.s10] [sources.s11] [sources.s12]",
        links: "Links: [Lollapalooza India, official site](/go/lollapalooza-india-official/) · [The organiser's FAQ and getting-here guide](/go/lollapalooza-india-info/)",
      },
      {
        slug: "lollapalooza-india/tickets",
        createdAt: "2026-11-09T11:28:00+04:00",
        updatedAt: "2026-11-09T11:28:00+04:00",
        kind: "tickets",
        label: "Tickets",
        crumb: "Tickets",
        title: "Lollapalooza India 2027 tickets and price — festival guide",
        description: "Lollapalooza India 2027 festival tickets, 23–24 January, Mumbai: six two-day passes and day tickets on BookMyShow, the only seller, wristband, refunds, resale.",
        h1: "Lollapalooza India 2027 tickets",
        h1Keep: ["2027 tickets"],
        cta: {
          href: "/go/lollapalooza-india-tickets/",
          label: "BookMyShow: Lollapalooza India 2027",
          title: "The organiser's exclusive ticketing partner for 23–24 January 2027",
          seller: "BookMyShow, the organiser's exclusive ticketing partner [sellers.0]",
          secondary: {
            href: "/go/lollapalooza-india-passes/",
            label: "The organiser's tickets page",
            title: "What each two-day pass includes, on the organiser's site",
          },
        },
        lede: "Tickets for Lollapalooza India 2027, on Saturday 23 and Sunday 24 January at Mahalaxmi Race Course in Mumbai, are sold only on BookMyShow. [editions.0.days] [venue.name] [sellers.0] {{until prices}}On 9 November 2026 its listing read ₹4,499 onwards, with the festival shown as available. [bms.price] [bms.status] {{/until}}The organiser's tickets page describes six passes, every one of them for both days, and prints no price. [tiers] [not_found.0] Day tickets exist as well, announced on Monday 21 September 2026, and the organiser's pages say nothing about what they include or cost. [ticket_status.day_tickets] [not_found.2]",
        faq: [],
        sections: [
          {
            id: "passes",
            heading: "The six two-day passes",
            body: "What does each pass add? Here is each one as the organiser's tickets page describes it. [tiers]\n\n- **2-Day General Admission (GA).** Both days, all 4 stages and 40+ performances, the food park, the bars and the free water stations. [tiers.0]\n- **2-Day Lolla Comfort by RuPay Credit.** Everything in GA, plus a shaded Comfort zone with first-come seating, air-conditioned washrooms and its own bar and food stalls. [tiers.1]\n- **2-Day Lolla VIP.** GA plus on-field viewing at the two main stages, a VIP zone with its own bar, AC washrooms, a fast entry lane and a concierge. [tiers.2]\n- **2-Day RuPay Credit Amplified Access.** VIP, Comfort and GA together, plus vouchers for food, merchandise and cocktails or mocktails. It is for RuPay credit card holders only. [tiers.3]\n- **2-Day Lolla Platinum by Johnnie Walker.** An air-conditioned lounge facing Main Stage 1 with food and bar included, front-of-stage pits at Main Stages 1 and 2, console areas at Stage 3 and Perry's Stage, a shuttle between the main entrance, the lounge and the viewing pits, a kit delivered to your home, and preferred parking next to the venue, with details to come. [tiers.4]\n- **Lolla Platinum Weekend Under 25.** The Platinum pass, for anyone aged 5 to 25. [tiers.5]\n\nSeating is limited to Comfort, VIP and Platinum. The rest of the festival is standing. [onsite.seating] Lolla Platinum also includes preferred parking next to the venue, which has none of its own. [tiers.4] [transport.6]",
          },
          {
            id: "day-tickets",
            heading: "Day tickets",
            body: "Can you come for one day only? Yes. The organiser announced day-wise tickets on Monday 21 September 2026, with the words \"plan your weekend as per the acts you want to catch\", and sells them on BookMyShow. [ticket_status.day_tickets] Its tickets page still describes only the two-day passes. The full list of day-ticket categories, what a day ticket includes and what it costs are not published on the organiser's pages. [ticket_status.day_tickets] [not_found.2] BookMyShow shows them once you log in. [bms.login]\n\n{{until prices}}On Tuesday 20 October 2026 the organiser posted that Day 2 tickets, for Sunday 24 January, were sold out in every category except GA, and that it was down to its last few GA Sunday tickets. It has said nothing about the two-day passes, and on 9 November 2026 BookMyShow still showed the festival as available. [ticket_status.day2_soldout] [bms.status]{{/until}} Which acts play which day, and where the organiser has posted that, is on the lineup page. → /lollapalooza-india/lineup/",
          },
          {
            id: "sale",
            heading: "How the sale has run",
            body: "When did tickets go on sale? The presale opened on Sunday 30 August 2026 at 11 am IST, for RuPay credit card holders only. [ticket_status.presale] Early bird followed on Wednesday 2 September 2026 at 11 am IST. [ticket_status.early_bird] General sale opened on Thursday 3 September 2026, the day the lineup was announced. [ticket_status.general_sale] [lineup.announcedOn] Day tickets came on Monday 21 September 2026. [ticket_status.day_tickets] {{until prices}}On 9 November 2026 BookMyShow still showed the festival as available, from ₹4,499. [bms.status] [bms.price]{{/until}}\n\nThe list of passes and their prices on BookMyShow sits behind its login, so that is where you see what is left. [bms.login] You can buy up to 10 tickets per person. [ticket_status.limit] The organiser's terms allow only people over 18 to buy on BookMyShow. [age.buyer]",
            cta: true,
          },
          {
            id: "wristband",
            heading: "Your ticket is a wristband",
            body: "What arrives at your door? Not a paper ticket. Your ticket is an RFID wristband, delivered to your home about a week before the festival. [ticket_status.delivery] If you buy late, you collect it at the venue box office on 23 or 24 January. Bring your BookMyShow booking confirmation and a government-issued photo ID. [ticket_status.delivery]\n\nKeep the wristband on. It is also the only way to pay inside the festival, and you top it up by QR. [ticket_status.delivery] Entry is allowed only once a day. If you leave, you cannot come back in that day. [ticket_status.reentry] Bags, water and the other gate rules are on the questions page. → /lollapalooza-india/faq/",
          },
          {
            id: "refunds",
            heading: "Upgrades, refunds and resale",
            body: "Can you change your mind? Mostly not. Tickets are not transferable and cannot be cancelled. [ticket_status.refunds] If the festival itself is cancelled, the organiser offers a refund or a carry-forward. Convenience and delivery fees are not refunded. [ticket_status.refunds]\n\nYou can ask to move up to a higher category, subject to availability. Write to contactus.lollaindia@bookmyshow.com. [ticket_status.upgrades]\n\nTickets offered on resale sites or by strangers online are a risk. The organiser warns that a ticket bought from any third party may be counterfeit and will not get you in. [sellers.0.note] It names no official resale. [not_found.9]",
          },
          {
            id: "children",
            heading: "Children and the Under 25 pass",
            body: "Do children need tickets? Not under 5. Children under 5 get in free with a ticket holder. [age.rule] From age 5, a child needs a ticket in the same category as the adult they come with. So a family in VIP buys a VIP pass for a seven-year-old too. [age.rule] The Lolla Platinum Weekend Under 25 pass gives the Platinum experience to anyone aged 5 to 25. [tiers.5] Age, alcohol and the rest of the family rules are in the [questions on age](/lollapalooza-india/faq/#age).",
          },
        ],
        sourcesHeading: "Sources",
        sources: "- Lollapalooza India (lollaindia.com): Tickets, Get Festival Ready (the FAQ) and the Terms and Conditions, read 6 November 2026, the Platinum card again on 9 November 2026. [sources.s2] [sources.s3] [sources.s4]\n- Lollapalooza India on Instagram (@lollaindia) and its link page, for the general sale, the day tickets and the sold-out notice, read 9 November 2026. [sources.s13] [sources.s14]\n- BookMyShow, the Lollapalooza India 2027 listing, read 9 November 2026. [sources.s5]",
        links: "Links: [BookMyShow, Lollapalooza India 2027](/go/lollapalooza-india-tickets/) · [The organiser's terms](/go/lollapalooza-india-terms/)",
      },
      {
        slug: "lollapalooza-india/lineup",
        createdAt: "2026-11-09T11:28:00+04:00",
        updatedAt: "2026-11-09T11:28:00+04:00",
        kind: "lineup",
        label: "Lineup",
        crumb: "Lineup",
        title: "Lollapalooza India 2027 lineup and artists — festival guide",
        description: "Lollapalooza India 2027 festival lineup: Olivia Dean, Limp Bizkit, KATSEYE and Fontaines D.C. head Mumbai's 23–24 January bill, with 5 Seconds of Summer.",
        h1: "Lollapalooza India 2027 lineup",
        lede: "Olivia Dean, Limp Bizkit, KATSEYE and Fontaines D.C. head the lineup of Lollapalooza India 2027, on Saturday 23 and Sunday 24 January at Mahalaxmi Race Course, Mumbai. [lineup.headliners] [editions.0.days] [venue.name] C3 Presents announced them on Thursday 3 September 2026, with eight more names and a promise of many more. [lineup.announcedOn] [lineup.acts] [lineup.note] Since then the organiser's Instagram has named Scribe and Noni-Mouse, and posted its bill, split by day, as a poster. [lineup.also_named_by_organiser] [lineup.poster] BookMyShow lists the festival's genres as EDM, hip hop, pop and rock. [bms.genres]",
        faqHeading: "Lineup questions",
        faq: [
          {
            q: "Who is headlining Lollapalooza India 2027?",
            a: "Olivia Dean, Limp Bizkit, KATSEYE and Fontaines D.C. [lineup.headliners] Source: the C3 Presents lineup release of 3 September 2026, read 9 November 2026.",
          },
          {
            q: "When is the day-wise lineup out?",
            a: "It is out as a poster. The organiser posted the bill split by day on its Instagram on Monday 21 September 2026. Its FAQ still says the day-wise schedule will be posted on its social media soon, and set times are not out. [lineup.poster] [lineup.note] [times.daily] Source: the organiser's Instagram, read 9 November 2026, and its FAQ, read 6 November 2026.",
          },
          {
            q: "How many acts are playing Lollapalooza India 2027?",
            a: "The organiser's site says 40+ performances on 4 stages. Its release and its Instagram captions have named fourteen acts, and the BookMyShow listing named 43 on 9 November 2026. [tiers.0.includes] [lineup.acts] [lineup.also_named_by_organiser] [lineup.seller_listing] Source: the organiser's tickets page, read 6 November 2026, the C3 Presents release and the BookMyShow listing, read 9 November 2026.",
          },
        ],
        sections: [
          {
            id: "headliners",
            heading: "The four headliners",
            body: "Four names head the bill. [lineup.headliners]\n\n- Olivia Dean\n- Limp Bizkit\n- KATSEYE\n- Fontaines D.C.\n\nThe release lists ten of the twelve as debut performances in India. Steve Angello and the pairing of Stewart Copeland and Ricky Kej are not on that list. [lineup.note] So yes, KATSEYE is coming to Mumbai in January 2027. [lineup.headliners] [editions.0.days]",
          },
          {
            id: "acts",
            heading: "Also announced",
            body: "Eight more acts are in the release. [lineup.acts]\n\n- 5 Seconds of Summer\n- St. Vincent\n- Steve Angello\n- ¥ØU$UK€ ¥UK1MAT$U\n- Stewart Copeland and Ricky Kej\n- Rachel Chinouriri\n- Ecca Vandal\n- Alain Johannes\n\nThe release ends its list with \"many more\". [lineup.note] The organiser's site counts 40+ performances across 4 stages, and twelve are named above. [tiers.0.includes] [lineup.headliners] [lineup.acts] Two more carry the organiser's own words on Instagram: Scribe, a post-hardcore band from Mumbai, in a post of Monday 5 October 2026, and Noni-Mouse, an electronic act, on Friday 6 November 2026. [lineup.also_named_by_organiser]\n\nThe organiser has published the rest of the bill only as pictures, on its posters of Thursday 3 September and Monday 21 September 2026. [lineup.poster] The Artists block on the BookMyShow listing named 43 acts on 9 November 2026, among them 2manydjs and The Manganiyar Seduction. [lineup.seller_listing]",
          },
          {
            id: "days",
            heading: "Which day, and what time",
            body: "Who plays on Saturday, and who on Sunday? The organiser has answered with a picture. On Monday 21 September 2026 it posted the day-wise bill as a poster on its Instagram, with the words \"plan your weekend as per the acts you want to catch\". [lineup.poster] Its FAQ, read on 6 November 2026, still says the 2027 lineup and day-wise schedule will be posted on its social media soon. [lineup.note] Some news sites print the split as text. Check any such list against the organiser's own poster before you plan around one act. [not_found.3]\n\nWith a two-day pass the split changes your plans, not your ticket. With a day ticket, sold on BookMyShow since 21 September, the split decides which day you buy. [tiers] [ticket_status.day_tickets] Set times are not out. The organiser says each day runs for about eight hours and that the exact timing will come closer to the festival. [times.daily]\n\nLinks: [The organiser's Instagram](/go/lollapalooza-india-instagram/)",
          },
          {
            id: "stages",
            heading: "Four stages",
            body: "The organiser's pass descriptions name four stages: Main Stage 1, Main Stage 2, Stage 3 and Perry's Stage. [tiers.0.includes] [tiers.4] BookMyShow calls them \"four iconic stages\". [bms.stages] Where you watch from depends on your pass. VIP gets on-field viewing at the two main stages. Platinum adds front-of-stage pits at both and console areas at Stage 3 and Perry's Stage. [tiers.2] [tiers.4] Every pass, side by side, is on the tickets page. → /lollapalooza-india/tickets/",
          },
          {
            id: "preshows",
            heading: "Road to Lolla India: two pre-shows",
            body: "Before Mumbai, the organiser is taking the name on the road. Its Road to Lolla India series opens on Saturday 21 November 2026 with OX7GEN Live at Hideaway in Goa, the launch of his album Aeon with his band, announced on Friday 6 November 2026. [preshows.0] On Sunday 29 November 2026 the Amnap Records Showcase follows at The Humming Tree in Bengaluru, with Madam X, Jameszoo and Raka Ashok, announced on Saturday 7 November 2026. [preshows.1] Tickets for both are on BookMyShow. [preshows.0] [preshows.1] Pre-parties and aftershows at the festival itself are another matter. The organiser's FAQ says they will happen, with details to come. [onsite.aftershows]",
          },
          {
            id: "past",
            heading: "Who came before",
            body: "Lollapalooza's Indian edition began in Mumbai on Saturday 28 and Sunday 29 January 2023. [history.0] [editions.2] The fourth edition ran on Saturday 24 and Sunday 25 January 2026 at Mahalaxmi Racecourse. [history.2] Linkin Park played that year. By the organiser's claim, as The Hollywood Reporter India reported it, 2026 had the festival's highest attendance, and Linkin Park drew the largest single-set crowd since the Indian debut. [history.3] The fifth edition, in January 2027, is back on the same racecourse. [history.1]",
          },
        ],
        sourcesHeading: "Sources",
        sources: "- C3 Presents, the lineup release of 3 September 2026 on Live Nation Entertainment's news site, read 9 November 2026. [sources.s6]\n- Lollapalooza India on Instagram (@lollaindia), the channel its FAQ names for the lineup and the schedule: the posts of 3 and 21 September, 5 October, 6 and 7 November 2026, read 9 November 2026. [sources.s13]\n- Lollapalooza India (lollaindia.com): Tickets and Get Festival Ready (the FAQ), read 6 November 2026. [sources.s2] [sources.s3]\n- BookMyShow, the Lollapalooza India 2027 listing and its Artists block, read 9 November 2026. [sources.s5]\n- For the past editions: the organiser's site as archived on 14 January 2023, IANS (19 August 2025) and The Hollywood Reporter India (updated 25 August 2026), read 6 November 2026. [sources.s10] [sources.s12] [sources.s11]",
        links: "Links: [The lineup release of 3 September 2026](/go/lollapalooza-india-lineup/) · [Lollapalooza India, official site](/go/lollapalooza-india-official/)",
      },
      {
        slug: "lollapalooza-india/location",
        createdAt: "2026-11-09T11:28:00+04:00",
        updatedAt: "2026-11-09T11:28:00+04:00",
        kind: "location",
        label: "Getting there",
        crumb: "Getting there",
        title: "Lollapalooza India 2027 venue and metro — festival guide",
        description: "Lollapalooza India 2027 festival venue: Mahalaxmi Race Course, K.K. Marg, Mumbai. The local train, the Aqua Line from the airport, monorail, buses, no parking.",
        h1: "Lollapalooza India 2027 venue",
        lede: "Lollapalooza India 2027 is at Mahalaxmi Race Course, K.K. Marg, Mahalakshmi, Mumbai 400034, on Saturday 23 and Sunday 24 January 2027. [venue.name] [venue.address] [editions.0.days] There is no parking at the venue, and the organiser asks you to come by public transport. [transport.6] It lists stations on two local train lines, a metro station, a monorail stop and four bus stops. [transport]",
        faq: [],
        sections: [
          {
            id: "venue",
            heading: "The racecourse, and its two spellings",
            body: "Mahalaxmi or Mahalakshmi? Both. The organiser writes Mahalaxmi Race Course. The venue's own address reads Mahalakshmi, and IANS wrote Racecourse as one word. [venue.name] [venue.address] [history.2] It is the same ground, run by the Royal Western India Turf Club (RWITC). [venue.operator] The festival is open-air, and the organiser warns that the ground is uneven in places. [venue.open_air] [onsite.accessibility]\n\nThe organiser's map pin is labelled Mahalakshmi Race Course Gate 1. It says the entry gate details for 2027 will be shared closer to the festival dates. [venue.geo_note] A festival map is still to be posted. [onsite.map]\n\nLinks: [Open in maps](/go/lollapalooza-india-maps/) · [Royal Western India Turf Club](/go/lollapalooza-india-venue/)",
          },
          {
            id: "train",
            heading: "By local train",
            body: "Which station? There are two. On the Western line, get down at Mahalaxmi. On the Central line, get down at Byculla. [transport.0] [transport.1] From the south of the city, the Western line local to Mahalaxmi is one way in. The Aqua Line, below, is the other. [transport.4] For train times, the organiser points to the m-Indicator app. [transport.7]",
          },
          {
            id: "metro",
            heading: "By metro and monorail",
            body: "The metro station the organiser names is Science Centre, on the Aqua Line (Metro Line 3). [transport.2] From the airport, the Aqua Line stops at CSMI Airport-T1 and CSMI Airport-T2, then runs south through Bandra-Kurla Complex (BKC), Dadar and Worli to Science Centre. It is one line, with no change of train. [transport.3] From the south, take the Aqua Line northbound from Cuffe Parade, Churchgate Metro or CSMT Metro. [transport.4]\n\nMMRCL lists 27 stations on the line, from Aarey JVLR to Cuffe Parade, over 33.5 km. [transport.3] The first train leaves Aarey JVLR at 5:55 am, and the last leaves Cuffe Parade at 10:30 pm. [transport.3] The festival's 2027 hours are not out yet, so check them against that last train before you count on the metro home. [times.daily]\n\nThe monorail stop is Sant Gadge Maharaj Chowk, at Jacob Circle. [transport.2]\n\nLinks: [MMRCL, the Aqua Line](/go/lollapalooza-india-metro/)",
          },
          {
            id: "road",
            heading: "By bus, cab or car",
            body: "The organiser lists four bus stops: Mahalaxmi Station, Famous Studio, Ambika Mill (H.U. Rakhangi Chowk) and Nehru Planetarium (Worli). [transport.5] Cab drop-off details are still to come, it says. [transport.6] [not_found.6]\n\nIf you were planning to drive, plan again. There is no parking at the venue. [transport.6] Lolla Platinum includes preferred parking next to the venue. Details are still to come. [tiers.4] [transport.6] Its shuttle runs inside the grounds, between the main entrance, the lounge and the viewing pits. [tiers.4] Which pass gives what is on the tickets page. → /lollapalooza-india/tickets/",
          },
          {
            id: "gate",
            heading: "At the gate",
            body: "Late buyers collect their wristband at the venue box office on 23 or 24 January, with the BookMyShow booking confirmation and a government-issued photo ID. [ticket_status.delivery] Everyone else wears the wristband that came home about a week before. [ticket_status.delivery] Entry is once a day. Once you are out, you are out for the day. [ticket_status.reentry] Bags, water bottles and what else may come in are on the questions page. → /lollapalooza-india/faq/",
          },
          {
            id: "stay",
            heading: "Staying the night",
            body: "Coming from outside Mumbai? The organiser's hotel partners are Airbnb and Crewfare, which offers hotel rates for the festival. [onsite.hotels]\n\nLinks: [Crewfare, Lollapalooza India 2027](/go/lollapalooza-india-hotels/)",
          },
        ],
        sourcesHeading: "Sources",
        sources: "- Lollapalooza India (lollaindia.com): Get Festival Ready (getting here and the FAQ) and the organiser's map pin, read 6 November 2026, and Tickets, the Platinum card, read 9 November 2026. [sources.s3] [sources.s2] [sources.s7]\n- Royal Western India Turf Club, official contacts, for the venue's address, read 6 November 2026. [sources.s8]\n- Mumbai Metro Rail Corporation (MMRCL), the Aqua Line stations and first and last trains, read 6 November 2026. [sources.s9]\n- IANS, 19 August 2025, for the 2026 edition, read 6 November 2026. [sources.s12]",
        links: "Links: [The organiser's getting-here guide](/go/lollapalooza-india-info/) · [MMRCL, the Aqua Line](/go/lollapalooza-india-metro/)",
      },
      {
        slug: "lollapalooza-india/faq",
        createdAt: "2026-11-09T11:28:00+04:00",
        updatedAt: "2026-11-09T11:28:00+04:00",
        kind: "faq",
        label: "Questions",
        crumb: "Questions",
        title: "Lollapalooza India 2027: age, bags, entry — festival guide",
        description: "Lollapalooza India 2027 festival questions, from the organiser: children and age, bags, water, food, smoking, cameras, re-entry, access and the Festiverse app.",
        h1: "Lollapalooza India 2027: questions",
        anchors: [
          {
            target: "/lollapalooza-india/location/",
            text: "the location page",
          },
        ],
        lede: "Lollapalooza India 2027 runs on Saturday 23 and Sunday 24 January at Mahalaxmi Race Course, Mumbai. [editions.0.days] [venue.name] The answers below are the organiser's, from its Get Festival Ready page and its terms, read on 6 November 2026, and from its Instagram, read on 9 November 2026. [sources.s3] [sources.s4] [sources.s13] Passes, day tickets and refunds are on the tickets page. → /lollapalooza-india/tickets/ Trains, metro and buses are on the location page. → /lollapalooza-india/location/",
        faq: [
          {
            id: "age",
            q: "Is there an age limit?",
            a: "No. The organiser calls it a family-friendly festival. Children under 5 get in free with a ticket holder. From age 5, a child needs a ticket in the same category as the adult they come with. [age.rule] Source: the organiser's FAQ.",
          },
          {
            q: "Is there a drinking age?",
            a: "Alcohol is served subject to the applicable age restrictions and local laws, the organiser says. It gives no age figure of its own. [age.alcohol] Source: the organiser's FAQ and terms.",
          },
          {
            q: "Is Lollapalooza coming back to India?",
            a: "Yes. The fifth edition is on Saturday 23 and Sunday 24 January 2027, at Mahalaxmi Race Course in Mumbai. [editions.0] [event.edition_no] Source: the organiser's home page and FAQ.",
          },
          {
            id: "bags",
            q: "Which bags can I bring?",
            a: "Only bags smaller than A4, which the organiser puts at 30 x 18 cm: wallets, side bags and fanny packs. Every bag is scanned, and there are no lockers. [onsite.bags] Source: the organiser's FAQ.",
          },
          {
            q: "Can I bring water?",
            a: "Bring an empty, reusable, transparent bottle of up to 500 ml. Free water stations will be inside to fill it. [onsite.water] Source: the organiser's FAQ.",
          },
          {
            q: "Can I bring food?",
            a: "No outside food or drink is allowed. Inside there is the Lolla Food Park and food carts. [onsite.food] Source: the organiser's FAQ.",
          },
          {
            q: "Can I smoke or vape?",
            a: "Smoking is allowed in designated areas only. You cannot take a cigarette packet in, but cigarettes are sold inside. Vaping is not allowed. [onsite.smoking] Source: the organiser's FAQ.",
          },
          {
            q: "Can I take photos?",
            a: "Phone cameras, yes. Professional cameras and video, no. [onsite.cameras] Source: the organiser's FAQ.",
          },
          {
            id: "reentry",
            q: "Can I leave and come back in?",
            a: "No. Entry is allowed only once a day. [ticket_status.reentry] Source: the organiser's tickets page and FAQ.",
          },
          {
            q: "How do I pay inside?",
            a: "With your wristband. It is the only payment method inside, and you top it up cashless by QR. [ticket_status.delivery] Source: the organiser's FAQ.",
          },
          {
            q: "Is there seating?",
            a: "It is a standing festival, and an open-air one. Limited seating is only in the Comfort, VIP and Platinum areas. [onsite.seating] [venue.open_air] Source: the organiser's FAQ.",
          },
          {
            q: "What time does it start and finish?",
            a: "Not announced yet. The organiser says each day runs for about eight hours, and that exact timing and the schedule will be shared closer to the festival. [times.daily] Source: the organiser's FAQ.",
          },
          {
            id: "access",
            q: "Is it accessible for wheelchair users and people with disabilities?",
            a: "The organiser lists Indian Sign Language interpreters for selected main-stage acts, crew to guide visually impaired guests, wheelchair risers and accessible gender-neutral toilets. The ground is uneven in places, and no wheelchairs are provided, so bring your own. [onsite.accessibility] Source: the organiser's FAQ.",
          },
          {
            q: "Can I bring my pet?",
            a: "No, pets are not allowed. [onsite.pets] Source: the organiser's FAQ.",
          },
          {
            q: "Is there an official app?",
            a: "Yes. Festiverse is the festival's official app. [onsite.app] Source: the organiser's FAQ.",
          },
          {
            q: "Are there single-\u2060day tickets?",
            a: "Yes. The organiser announced day-wise tickets on Monday 21 September 2026, sold on BookMyShow. Its own pages do not say what a day ticket includes or costs. [ticket_status.day_tickets] [not_found.2] Source: the organiser's Instagram and link page, read 9 November 2026.",
          },
          {
            q: "Are there pre-parties and aftershows?",
            a: "Yes. The organiser's FAQ says so, with the details at the festival still to be announced. Before it, two Road to Lolla India pre-shows are set: OX7GEN Live at Hideaway, Goa, on Saturday 21 November 2026, and the Amnap Records Showcase at The Humming Tree, Bengaluru, on Sunday 29 November 2026, with tickets for both on BookMyShow. [onsite.aftershows] [preshows.0] [preshows.1] Source: the organiser's FAQ, read 6 November 2026, and its Instagram, read 9 November 2026.",
          },
        ],
        faqFirst: true,
        sections: [],
        sourcesHeading: "Sources",
        sources: "- Lollapalooza India (lollaindia.com): Get Festival Ready (the FAQ), Tickets and the Terms and Conditions, read 6 November 2026. [sources.s3] [sources.s2] [sources.s4]\n- Lollapalooza India on Instagram (@lollaindia) and its link page, for the day tickets and the pre-shows, read 9 November 2026. [sources.s13] [sources.s14]",
        links: "Links: [The organiser's FAQ](/go/lollapalooza-india-info/) · [The organiser's terms](/go/lollapalooza-india-terms/)",
      },
    ],
  },
];
