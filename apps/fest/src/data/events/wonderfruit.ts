// Wonderfruit: the event as the scout's sheet has it, and its guide in Thai.
//
// Generated once from the card (~/mind/ai/dubai/events/tasks/
// 2026-10-21-wonderfruit-th.md) and edited by hand from here on. The sheet
// is section 1's YAML with the scout's repairs after gate 2 and after its
// round 2 merged as they say, by key, values verbatim, each keeping its
// readOn: the six added sources and three relabelled, s27 at its canonical
// URL, prices.12 restated with its seven rows, people restated, the new
// age.organiserId, salesPhases.scope and salesPhases_earlier, and the
// re-keyed lines. One item the repairs remove, not_found.1, keeps its slot
// with a line that says so: the copy cites not_found by its round-1 index.
// The card's working notes (the segment, the SERP as measured) are no
// page's facts and stay on the card.
//
// The copy is the writer's round 2 with round 3's 25 Was/Now and the
// session's items 1-3 after gate 2 round 3, [key] tags left in; copy.ts
// turns it into HTML. The only additions to the approved strings are marks,
// which a verbatim comparison strips:
// - the copy's "[ลิงก์: label → /go/…/]" and "[label → /wonderfruit/…/]" as
//   [label](href), the marker word not printed; its bare [s2] as
//   [sources.s2]; and the page names in each sources line linked to their
//   hops (the writer's "executor's map"), no word changed;
// - "[ปุ่ม: …] [ลิงก์: …]" as `cta: true` on its section: the button and
//   its second link open that section (GuidePage);
// - {{until prices}}…{{/until}} round every figure in baht with the words
//   that carry it, which the build drops on 2 December 2026, six weeks
//   after the oldest reading; {{until nov}}…{{/until}} round the four
//   lines that call The November Sale the next round, which drop on 10
//   November (the SEO lead's note 11). Adjacent, never nested;
// - {{read}} before the tags of each price, sale-state, gate-hours,
//   transport and hotel line whose words carry no date (the session's item
//   4): it prints "อ่านเมื่อ" and the day the line's facts were read
//   (copy.ts).
//
// The English twin (card ~/mind/ai/dubai/events/tasks/
// 2026-10-24-wonderfruit-en.md) is guides[1]: the writer's round 2 with
// the session's items after gate 2 round 2 (W10, W12, the en-GB reader's
// polish, the Agoda sentence, two paragraph breaks), [key] tags left in,
// its only additions marks, as above. Its re-read marks
// ([reread.prices.0-3] and the like) are spelled as the keys they name,
// or dropped where the tags beside them cite those keys already: the
// readings themselves moved. With it, on 24 October 2026:
// - the twin scout's round 1 and its sheet repairs after gate 2 merged as
//   they say, values verbatim, each keeping its readOn: the Directory's
//   first timetable (lineup.directory), the season's other dates, the
//   entry rules from GOV.UK, the Immigration Bureau and TAT (entry), the
//   organiser's list of what may not come in, Agoda official with its
//   offers unread (sellers.2.listing), and sources s31-s35; the keys it
//   re-read moved to 24 October, and the lists the copy cites by index
//   keep their indexes;
// - the hops only the twin links, titled in English, and `titles.en` on
//   the twelve both guides link (copy.ts reads the title in the guide's
//   own language, GoTarget.titleLang);
// - the writer's T1-T9 on the Thai guide, in the th-TH reader's wording.
//
// The layout is what tools/record-blocks.mjs reads: each record opens on a
// line that is a brace at two spaces (a guide's pages at six), its slug on
// the next line, and both dates on lines of their own. Each page is dated on
// its own; a sheet edit is the event's, and moves every page through `with`
// in ../../dated.ts.
//
// No @dst/* import and nothing but erasable TypeScript: tools/lastmod.mjs
// loads this file through dated.ts with Node's type stripping.
import type { FestEvent, Guide } from "../types";
export const events: FestEvent[] = [
  {
    slug: "wonderfruit",
    createdAt: "2026-10-22T21:05:00+04:00",
    updatedAt: "2026-10-24T10:49:00+04:00",
    name: "Wonderfruit",
    edition: { start: "2026-12-03", end: "2026-12-07" },
    // Keys whose rows carry no readOn of their own: the scout's event line,
    // written with round 1 on 21 October from the organiser's site, its
    // terms and the seller's page (section 1, "event"); read again on 24
    // October by the English twin's scout, from the home page (s1) and the
    // organiser account on the seller's page (s11).
    readOverrides: {
      "event.organiser": "2026-10-24",
      "event.kind": "2026-10-24",
      "event.edition": "2026-10-24",
      "event.theme": "2026-10-24",
    },
    // The MusicEvent on the guide's main page (rules.ts). Start and end are
    // the seller's line, 3 December 16:00 to 7 December 12:00 Bangkok time
    // (editions.0.sellerEventLine; the SEO lead's note 11). The address is
    // the organiser's own line in its parts, in Thai on a Thai page (the
    // native reader on the executor's strings, G): no street and no
    // postcode, which the session ruled out on 21 October; the point is the
    // scout's pair, the coordinates the organiser's FAQ links
    // (venue.coordsNote). The organiser is the company the terms and the
    // seller name (event.organiser). Two offers, the passes The November
    // Sale sells, at its prices (prices.0, prices.2), each valid from the
    // sale's opening, 3 November 16:00 (editions.0.salesPhases.2; the SEO
    // lead's gate-3 condition 3), to its last day, 9 November, the
    // organiser's own end of sale (the session's X3): from 10 November the
    // markup offers nothing, and the door prices are never marked up.
    markup: {
      startDate: "2026-12-03T16:00:00+07:00",
      endDate: "2026-12-07T12:00:00+07:00",
      address: { addressLocality: "พัทยา", addressRegion: "ชลบุรี", addressCountry: "TH" },
      // The English twin's MusicEvent names the place in English, as its page
      // does (the SEO lead's note 12): shaped as Offer.perGuide, keyed by a
      // later guide's lang and never the first's, it overrides the parts it
      // names; the country code is the address's above (rules.ts).
      perGuide: {
        en: {
          address: { addressLocality: "Pattaya", addressRegion: "Chonburi" },
        },
      },
      organizer: { name: "Scratch First Co., Ltd.", url: "https://wonderfruit.co/" },
      offers: [
        { seller: "Ticketmelon", go: "ticketmelon", name: "5-Day Full Pass", price: { key: "prices.0", currency: "THB" }, validFrom: "2026-11-03T16:00:00+07:00", priceValidUntil: "2026-11-09" },
        { seller: "Ticketmelon", go: "ticketmelon", name: "Weekend Pass", price: { key: "prices.2", currency: "THB" }, validFrom: "2026-11-03T16:00:00+07:00", priceValidUntil: "2026-11-09" },
      ],
    },
    sheet: {
      event: {
        name: "Wonderfruit",
        slug: "wonderfruit",
        organiser: "Scratch First Co., Ltd.",
        kind: "music, art and food festival",
        edition: 11,
        theme: "Field Village",
      },
      editions: [
        {
          year: 2026,
          start: "2026-12-03",
          end: "2026-12-07",
          status: "announced",
          venue: "v1",
          hours: [
            {
              day: "2026-12-03",
              open: "16:00",
              lastEntry: "24:00",
              source: "s3",
              readOn: "2026-10-24",
            },
            {
              day: "2026-12-04",
              open: "08:00",
              lastEntry: "24:00",
              source: "s3",
              readOn: "2026-10-24",
            },
            {
              day: "2026-12-05",
              open: "08:00",
              lastEntry: "24:00",
              source: "s3",
              readOn: "2026-10-24",
            },
            {
              day: "2026-12-06",
              open: "08:00",
              lastEntry: "24:00",
              source: "s3",
              readOn: "2026-10-24",
            },
            {
              day: "2026-12-07",
              note: "last morning; Sunday Pass runs to Monday sunrise; camping and cabins check out 12:00",
              source: "s3",
              readOn: "2026-10-24",
            },
          ],
          hoursNote: "gates closed to re-entry midnight to 08:00; leaving after midnight on Sunday 6 Dec means no re-entry on Monday 7 Dec; the organiser says hours may change",
          sellerEventLine: {
            text: "03 December 2026, 16:00 - 07 December 2026, 12:00",
            source: "s11",
            readOn: "2026-10-24",
          },
          timezone: "Asia/Bangkok",
          salesPhases: [
            {
              label: "September Sale",
              from: "2026-09-01",
              to: "2026-09-07",
              open: "16:00",
              fullPass: 10900,
              weekendPass: 9500,
              currency: "THB",
              status: "the ticket page shows 'Sold Out' (Thai 'ปิดการจำหน่าย') with no figures (s2, 22 Oct); the FAQ's September answer gives no figures (s3); the figures are dated history credited to s12",
              source: ["s2", "s12"],
              readOn: "2026-10-24",
              waitlistCodeLine: "'Each waitlist code can purchase a maximum of two (2) September Sale tickets. No exceptions.' (s11) belongs to the September Sale, not to Pre Sale; it moves to salesPhases[0]",
            },
            {
              label: "October Sale",
              from: "2026-10-01",
              to: "2026-10-07",
              fullPass: 11900,
              weekendPass: 10500,
              currency: "THB",
              status: "sold out (closed)",
              source: ["s2", "s3"],
              readOn: "2026-10-24",
            },
            {
              label: "The November Sale",
              from: "2026-11-03",
              to: "2026-11-09",
              open: "16:00",
              fullPass: 12900,
              weekendPass: 11500,
              currency: "THB",
              status: "upcoming; waitlist closes 2 Nov; the organiser calls it the last online sale; limited capacity, first come first served",
              source: ["s2", "s3", "s11"],
              readOn: "2026-10-24",
            },
            {
              label: "at the door",
              fullPass: 20000,
              weekendPass: 15000,
              currency: "THB",
              status: "after the November Sale, subject to availability",
              source: "s3",
              readOn: "2026-10-24",
            },
          ],
          note: "The 2026 edition is a week earlier than the festival's usual second weekend of December; the organiser's pages give no reason (Time Out, s18, links it to Tomorrowland's Pattaya debut on the usual weekend, as the writer's context, not an organiser quote).",
          source: ["s1", "s2", "s12"],
          readOn: "2026-10-24",
        },
        {
          year: 2025,
          start: "2025-12-11",
          end: "2025-12-15",
          status: "past",
          venue: "v1",
          note: "10th edition; dates from media (s19), the organiser's 2025 report is a PDF over 10 MB that WebFetch cannot read",
          source: "s19",
          readOn: "2026-10-21",
        },
        {
          year: 2024,
          start: "2024-12-12",
          end: "2024-12-16",
          status: "past",
          venue: "v1",
          note: "9th edition; more than 25,000 attendees per The Standard (s20, media)",
          source: "s20",
          readOn: "2026-10-21",
        },
        {
          year: 2023,
          start: "2023-12-14",
          end: "2023-12-18",
          status: "past",
          venue: "v1",
          note: "from the organiser's 2023 accommodation post: check-in 14 Dec, check-out 18 Dec",
          source: "s17",
          readOn: "2026-10-24",
        },
        {
          year: 2014,
          status: "first edition",
          note: "The organiser, of The Fields (s25, Decade of Wonder): 'The Fields are our home—a living landscape we've cultivated. Since 2014, it has shaped how we imagine and create.' Said of The Fields, not of the festival's first edition; Time Out (s18, media) has 'first launched in December 2014'.",
          source: ["s25", "s18"],
          readOn: "2026-10-22",
        },
      ],
      sideEvents: [
        {
          name: "Wonderfruit Chapters Kyoto",
          start: "2026-10-22",
          end: "2026-10-25",
          city: "Kyoto",
          country: "JP",
          note: "separate gathering; the organiser's FAQ says the main festival stays in Chonburi",
          source: ["s22", "s3", "s24"],
          readOn: "2026-10-24",
          faqDates: {
            value: "the FAQ prints 'Wonderfruit Chapters Kyoto: 21–25 October 2026' and links https://wonderfruitchapters.co (302 to chapterskyoto.co); the Kyoto site and the menu say 22–25 October 2026. Keep 22–25 (s22). Kyoto ends tomorrow, so the twin speaks of it in the past.",
            source: ["s3", "s22"],
            readOn: "2026-10-24",
          },
        },
      ],
      // The season's other dates, names only (the English twin's scout, round 1).
      seasonEvents: {
        rows: [
          { name: "Camp Wonder", start: "2026-12-18", end: "2026-12-23" },
          {
            name: "Field.D",
            date: "2026-12-20",
            note: "printed 'Field.D*' in the FAQ; the asterisk is not explained on the page",
          },
          { name: "Din Daen", start: "2027-01-29", end: "2027-01-31" },
          { name: "Open Fields", when: "Dec 2026–Jan 2027", note: "site menu only; not in the FAQ list" },
        ],
        wording: "FAQ 'When is Wonderfruit this year?': 'There will be other events unfolding throughout the end of this year, leading into the next:' then the four lines (Kyoto 21–25 October 2026, Camp Wonder, Field.D*, Din Daen)",
        note: "names and dates only: no page, place, price or description for any of them; the site menu shows them under 'Beyond the Festival' (on some cached pages still 'Coming soon'). None is Wonderfruit 2027: questions.8 stays 'not announced'.",
        source: ["s3", "s1"],
        readOn: "2026-10-24",
      },
      venue: {
        key: "v1",
        name: "The Fields at Siam Country Club",
        address: "The Fields at Siam Country Club, Chonburi, Thailand (the organiser's own line; the Thai press writes 'เมืองพัทยา จังหวัดชลบุรี'; the club's postal address was skipped on the session's decision, 21 Oct: the organiser's line plus the coordinates below is the venue block)",
        lat: 12.9027695,
        lon: 100.9998528,
        coordsNote: "the organiser's FAQ 'Where is Wonderfruit located?' links https://goo.gl/maps/if8a7g1pDkiLvwSy6, which resolves to the Google Maps place 'Wonderfruit' at these coordinates",
        city: "Pattaya",
        province: "Chonburi",
        country: "TH",
        timezone: "Asia/Bangkok",
        stages: "26 named venues on site, among them The Quarry, Forbidden Fruit, Forest Stage, Creature Stage, Solar Village, Molam World, Living Village, Enfold, Wonderness, Baan Bardo, Jungle House, Bath House, Little Wonder",
        source: ["s3", "s9"],
        readOn: "2026-10-24",
        nameThai: {
          text: "สยามคันทรีคลับ",
          context: "โดยงานจะจัดขึ้นในวันที่ 3–7 ธันวาคม 2569 ณ The Fields สยามคันทรีคลับ",
          source: "s27",
          readOn: "2026-10-22",
        },
      },
      sellers: [
        {
          name: "Wonderfruit, official ticket page",
          url: "https://wonderfruit.co/tickets",
          official: true,
          note: "The buttons read 'Add to Bag' (Thai 'เพิ่มลงตะกร้า') on the Sunday Pass, Teen Pass, Dog Pass, Wonder Cup and Fields Kit, and fill the organiser's own bag on wonderfruit.co. The 5-Day Full Pass and the Weekend Pass show 'Join the waitlist'; Intro and Youth show 'Apply'; Family shows 'Configure'. The raw ticket-page HTML holds one seller URL, https://www.ticketmelon.com/wonderfruit/wf26main; the bag strings 'You'll be redirected to ticketmelon.com' and 'Inclusive of 7% VAT. Fees calculated at checkout.' are in the organiser's bag script (SideCart, i18n keys cart.redirect-notice and cart.vat-inclusive), read in the page's own code on 22 Oct by the fact-checker, not on a rendered checkout; independently, s28's Family Pass steps say 'continue to check out with Ticketmelon'.",
          source: ["s2", "s11", "s28"],
          readOn: "2026-10-24",
        },
        {
          name: "Ticketmelon",
          url: "https://www.ticketmelon.com/wonderfruit/wf26main",
          official: true,
          note: "the ticketing platform behind the organiser's buttons. On its page, the event text published under the organiser account Scratch First Co., Ltd. and signed 'See you in The Fields, Team Wonderfruit' says 'Ticketmelon is the sole official ticketing platform for Wonderfruit 2026'; the Terms & Conditions block below repeats 'Ticketmelon is the sole official ticketing platform.' The speaker is the organiser; the place is Ticketmelon's page. Event page 'Wonderfruit 2026 - The November Sale', 3–9 November 2026 at 4PM BKK (GMT+7); no tier list or prices shown before the sale opens 3 Nov (pane read, session); 'Weekend Passes are limited and available for Saturday to Monday access.' (s11)",
          claim: {
            value: "'99+ hours of music, art, food, wellness, nature and more' at The Fields, 3–7 December 2026: in the same signed event text on Ticketmelon wf26main",
            speaker: "the organiser (Team Wonderfruit)",
            print_as: "the organiser's words on its Ticketmelon page, never Ticketmelon's",
            source: "s11",
            readOn: "2026-10-24",
          },
          source: ["s2", "s11"],
          readOn: "2026-10-24",
        },
        {
          name: "Agoda",
          url: "https://www.agoda.com/c/agoda_wonderfruit?ds=tXZzA03dpkT7tsYZ",
          // Official since the session's ruling after the English twin's gate 2:
          // the organiser names Agoda its "Official Travel Platform", with
          // tickets in its offer. No code reads the flag; `link` stays false.
          official: true,
          link: false,
          note: "the organiser's words (s7): 'Wonderfruit has partnered with Agoda, our Official Travel Platform, to make planning your trip easier. Enjoy access to Wonderfruit tickets at a preferred rate, then explore a wide selection of nearby properties, local transportation, flights to Thailand, and more from Agoda.' NOT linked (session's decision 21 Oct). The page lists three hotels and this Agoda block; it has no packages, so 'hotel packages' is not printed.",
          organiserWords: {
            value: "Wonderfruit, Hotels & Travel (https://wonderfruit.co/hotels), under the heading 'Discover your way to Wonderfruit, all in one place': 'Wonderfruit has partnered with Agoda, our Official Travel Platform, to make planning your trip easier. Enjoy access to Wonderfruit tickets at a preferred rate, then explore a wide selection of nearby properties, local transportation, flights to Thailand, and more from Agoda.' The button reads 'explore' and opens https://www.agoda.com/c/agoda_wonderfruit?ds=tXZzA03dpkT7tsYZ.",
            print_as: "the organiser's words, quoted; 'preferred rate' once, on the tickets page, attributed (session ruling); no price; no claim that tickets can be booked there",
            source: "s7",
            readOn: "2026-10-24",
          },
          // What the English twin's scout tried on 24 October; the tiles are recorded,
          // never printed (printable: false).
          listing: {
            status: "not readable",
            tried: "curl (desktop and iPhone UAs; en-gb, en-us, th-th; with and without enrichedOfferId and cid), WebFetch, and the pane in its own tab; every activities URL answers 404, the bare /activities index and an unrelated activity included (table above)",
            campaignTiles: [
              {
                name: "5-Day Full Pass",
                price: "THB 10,700",
                lines: ["5 days, 4 nights (Thu - Mon)", "3-7 Dec 2026"],
                button: "Book now",
                href: "https://agoda.com/activities/detail?activityId=1777705&enrichedOfferId=3128108&cid=1949834",
              },
              {
                name: "Weekend Pass",
                price: "THB 9,630",
                lines: ["3 days, 2 nights (Sat - Mon)", "5-7 Dec 2026"],
                button: "Book now",
                href: "https://agoda.com/activities/detail?activityId=1777705&enrichedofferid=3128109&cid=1949834",
              },
            ],
            campaignCopy: "the page places the event 'in The Fields, Siam Country Club, Chonburi, Thailand on 3 - 7 Dec 2026'; below the tiles come 'Hotels Nearby' (USD per night), 'Flights to Bangkok' and 'Transportation' (private transfers Bangkok/BKK/DMK/U-Tapao ↔ Pattaya), each with its own 'Book now'",
            printable: false,
            why_not: "a tile is not an offer (twin-1 lesson). Status, inclusions, VAT and fees, and whether either can be booked are unread. 'nights' on a ticket tile is unexplained, and no hotel is named. Both tile prices sit below the organiser's November Sale prices (12,900 / 11,500), so printing them would put an unverified figure above the organiser's own",
            source: "s7",
            readOn: "2026-10-24",
          },
          source: "s7",
          readOn: "2026-10-24",
        },
        {
          name: "Eventpop (eventpop.me/1554-wonderfruit)",
          official: false,
          link: false,
          note: "appears in the SERP (query 4) as a seller listing from an earlier edition; Ticketmelon is the sole official platform for 2026, so Eventpop is not linked",
          source: "s11",
          readOn: "2026-10-21",
        },
      ],
      prices: [
        {
          label: "5-Day Full Pass, 3–7 Dec, November Sale 3–9 Nov",
          amount: 12900,
          currency: "THB",
          seller: "Ticketmelon via wonderfruit.co/tickets",
          source: "s2",
          readOn: "2026-10-24",
        },
        {
          label: "5-Day Full Pass, at the door",
          amount: 20000,
          currency: "THB",
          seller: "box office",
          source: ["s2", "s3"],
          readOn: "2026-10-24",
        },
        {
          label: "Weekend Pass, Sat 5 – Mon 7 Dec (entry from 08:00 Sat), November Sale",
          amount: 11500,
          currency: "THB",
          seller: "Ticketmelon via wonderfruit.co/tickets",
          source: "s2",
          readOn: "2026-10-24",
        },
        {
          label: "Weekend Pass, at the door",
          amount: 15000,
          currency: "THB",
          seller: "box office",
          source: ["s2", "s3"],
          readOn: "2026-10-24",
        },
        {
          label: "Sunday Pass, from 08:00 Sun 6 Dec to Monday sunrise",
          amount: 5000,
          currency: "THB",
          door: 6500,
          seller: "Ticketmelon via wonderfruit.co/tickets",
          source: "s2",
          readOn: "2026-10-24",
        },
        {
          label: "Teen Pass, ages 13–19, 5 days",
          amount: 4500,
          currency: "THB",
          door: 5000,
          seller: "Ticketmelon via wonderfruit.co/tickets",
          source: "s2",
          readOn: "2026-10-24",
        },
        {
          label: "Dog Pass, 5 days (the owner needs a ticket)",
          amount: 1000,
          currency: "THB",
          door: 1500,
          seller: "Ticketmelon via wonderfruit.co/tickets",
          source: ["s2", "s3"],
          readOn: "2026-10-24",
        },
        {
          label: "Intro Pass, application, ages 20+, first-timers, one 24-hour entry Thu–Sun, no re-entry",
          amount: 4500,
          currency: "THB",
          seller: "wonderfruit.co/applications/intro-pass",
          source: ["s2", "s3", "s28"],
          readOn: "2026-10-24",
          note: "before fees and 7% VAT",
        },
        {
          label: "Youth Pass, application, ages 20–24, 5 days",
          amount: 3900,
          currency: "THB",
          seller: "wonderfruit.co/applications/youth-pass",
          source: ["s2", "s3", "s28"],
          readOn: "2026-10-24",
          note: "before fees and 7% VAT",
        },
        {
          label: "Family Pass, 1–2 adults and 1–4 kids or teens",
          discount: "5% off all paid tickets; children 12 and under free, no application",
          currency: "THB",
          seller: "Ticketmelon via wonderfruit.co/tickets",
          source: ["s2", "s3"],
          readOn: "2026-10-24",
        },
        {
          label: "General Camping, 5 days 4 nights, bring your own tent, 1 guest",
          amount: 1500,
          currency: "THB",
          note: "excludes 7% VAT and fees; check-in 3 Dec 16:00, check-out 7 Dec 12:00",
          seller: "Ticketmelon via wonderfruit.co/general-camping",
          source: "s4",
          readOn: "2026-10-24",
        },
        {
          label: "Slow Wonder Cabin, 26 cabins, 5 days 4 nights, ticket not included",
          amount: 235000,
          currency: "THB",
          note: "excludes VAT and fees; up to 2 Full Pass add-ons at THB 10,900 each as printed on that page (the September price; the ticket page says 12,900 for the November Sale); check-in 3 Dec 14:00, check-out 7 Dec 12:00",
          seller: "wonderfruit.co/slow-wonder",
          source: "s6",
          readOn: "2026-10-24",
        },
        {
          label: "Boutique Camping (Pavilion tents, The Hideaway or The Grove)",
          currency: "THB",
          note: "check-in 3 Dec 12:00, check-out 7 Dec 12:00",
          seller: "wonderfruit.co/boutique-camping",
          rows: [
            {
              label: "Boutique Camping, Pavilion Suite – King, The Grove, 5 days 4 nights",
              amount: 120000,
              currency: "THB",
              seller: "wonderfruit.co/boutique-camping (organiser's bag, hands off to Ticketmelon at checkout)",
              source: "s5",
              readOn: "2026-10-24",
            },
            {
              label: "Boutique Camping, Pavilion Suite – King, The Hideaway",
              amount: 120000,
              currency: "THB",
              status: "Sold out (caption on the page)",
              seller: "wonderfruit.co/boutique-camping",
              source: "s5",
              readOn: "2026-10-24",
            },
            {
              label: "Boutique Camping, Pavilion Suite (Double Queen Beds / Queen Bed and Two Singles / Four Singles), up to 4 guests",
              amount: 90000,
              currency: "THB",
              seller: "wonderfruit.co/boutique-camping",
              source: "s5",
              readOn: "2026-10-24",
            },
            {
              label: "Boutique Camping, Classic Pavilion, The Grove or The Hideaway, 2 guests (a third with the extra bed, rows.5)",
              amount: 80000,
              currency: "THB",
              seller: "wonderfruit.co/boutique-camping",
              source: "s5",
              readOn: "2026-10-24",
            },
            {
              label: "Boutique Camping, Shared Classic Pavilion, one single bed in a shared 3-bed tent (Thai caption: '1 เตียงเดี่ยวแชร์กันในเต็นท์ 3 เตียง')",
              amount: 25000,
              currency: "THB",
              unit: "per bed",
              seller: "wonderfruit.co/boutique-camping",
              source: "s5",
              readOn: "2026-10-24",
            },
            {
              label: "Boutique Camping add-on, extra single bed",
              amount: 10000,
              currency: "THB",
              seller: "wonderfruit.co/boutique-camping",
              source: "s5",
              readOn: "2026-10-24",
            },
            {
              label: "Boutique Camping add-on, daily breakfast per guest for the whole stay",
              amount: 1700,
              currency: "THB",
              seller: "wonderfruit.co/boutique-camping",
              source: "s5",
              readOn: "2026-10-24",
            },
          ],
          vatNote: "VAT and fees extra: the fact-checker read the footnote 'Price excludes 7% VAT and fees' rendered on the Boutique page on 22 Oct; my curl finds that exact footnote in the General Camping page HTML (s4) and the Ticketmelon terms (s11); print 'excluding 7% VAT and fees' with s5 as the fact-checker read it",
          vatEvidence: "the Boutique card script renders i18n `common.vat-excluded` = 'Price excludes 7% VAT and fees' (Thai 'ราคานี้ยังไม่รวมภาษี 7% และค่าธรรมเนียม') and imports the same cart (s2, s5, s28; read in the page's own code on 22 Oct by the fact-checker)",
          checkIn: "three things at check-in (s3, Boutique Camping 'What do I need to check in?'): 'Your physical ID or passport are required', 'Your Boutique Camping Entrant Code', 'Your Wonderfruit ticket Entrant Code' — two kinds of code, not two people's",
          source: "s5",
          readOn: "2026-10-24",
        },
        {
          label: "Wonder Cup (pre-order, box office pick-up)",
          amount: 690,
          currency: "THB",
          seller: "Ticketmelon via wonderfruit.co/tickets",
          source: "s2",
          readOn: "2026-10-24",
        },
        {
          label: "Fields Kit (pre-order)",
          amount: 4500,
          currency: "THB",
          seller: "Ticketmelon via wonderfruit.co/tickets",
          source: "s2",
          readOn: "2026-10-24",
        },
      ],
      purchaseRules: {
        limit: {
          text: "4 tickets per person",
          source: "s2",
          readOn: "2026-10-24",
        },
        vat: {
          text: "the listed price does not include 7% VAT and transaction fees; payments in THB, USD prices subject to FX",
          source: "s11",
          readOn: "2026-10-24",
          organiserLines: "General Camping 'Price excludes 7% VAT and fees' (s4); Program Passes post 'Single entry pass priced at THB 4,500 before fees and 7% VAT' and 'Youth Pass priced at THB 3,900 before fees and 7% VAT' (s28); the organiser's bag 'Inclusive of 7% VAT. Fees calculated at checkout.' (s2, in the bag's code). No fee amount appears anywhere.",
        },
        refunds: {
          text: "organiser terms: all ticket purchases are non-refundable; Ticketmelon: 'All sales are final. No refunds or transfers.'",
          source: ["s10", "s11"],
          readOn: "2026-10-24",
        },
        resale: {
          text: "s10: 'Tickets cannot be exchanged, resold, or transferred under any circumstances'; s11: 'All sales are final. No refunds or transfers.'",
          source: ["s10", "s11"],
          readOn: "2026-10-24",
        },
        refundsSellerPolicy: {
          text: "Ticketmelon's event data carries disclaimer.refund: no refunds unless the event is cancelled or postponed; on cancellation only the ticket value is refunded, never the fees",
          where: "event data, not on the rendered page",
          source: "s11",
          readOn: "2026-10-24",
        },
      },
      age: {
        min: 0,
        organiser: "'All ages are welcome'; children 12 and under enter free with no advance ticket and must be with a parent, guardian or nominated guardian; under-20s cannot buy alcohol and wear a Teen wristband; guests 'may be asked for ID at any time'; Teen Pass 13–19, Youth Pass 20–24, Intro Pass 20+",
        seller: "'All ages are welcome. Under 13s must be accompanied by a parent or guardian. ID check required.' (Ticketmelon, pane read)",
        flag: "the organiser is as plain as Ticketmelon for teens and programme passes and names the document; the round-1 flag ('the organiser says ID may be asked') was too narrow and is withdrawn. Ticketmelon's line stays as recorded in age.seller.",
        source: ["s3", "s2", "s10", "s11"],
        readOn: "2026-10-24",
        organiserId: {
          readOn: "2026-10-24",
          rules: [
            {
              where: "FAQ, 'Are there any age limits?'",
              text: "Guests will be required to show their ID upon request as proof of age at any time for proper drinking age limit verification.",
              source: "s3",
            },
            {
              where: "tickets, Teen Pass",
              text: "Valid ID required on entry",
              thai: "ก่อนเข้างานต้องแสดงเอกสารที่ทางราชการออกให้",
              source: "s2",
            },
            {
              where: "tickets, Intro Pass and Youth Pass",
              text: "ID required for verification",
              source: "s2",
            },
            {
              where: "Program Passes post, Intro Pass",
              text: "Ages 20+ (Government-issued ID required for verification)",
              source: "s28",
            },
            {
              where: "Program Passes post, Youth Pass",
              text: "You can only enter with the original government-issued ID you submitted in your application.",
              source: "s28",
            },
            {
              where: "terms, Special Program Passes",
              text: "Each Special Program Pass holder must present a valid government-issued form of identification showing name and date of birth upon entry.",
              source: "s10",
            },
            {
              where: "FAQ, Boutique Camping check-in",
              text: "Your physical ID or passport are required",
              source: "s3",
            },
          ],
          flag: "the organiser is as plain as Ticketmelon for teens and programme passes and names the document; the round-1 flag ('the organiser says ID may be asked') was too narrow and is withdrawn. Ticketmelon's line stays as recorded in age.seller.",
        },
      },
      lineup: {
        announcedOn: "2026-09-01",
        announcedNote: {
          text: "first names in the organiser's 1 September 2026 release (s12); the programme page (s8) carries them with 'AND MORE TO COME', so the line-up is not final; the full schedule is released later (s3); 'Wonderfruit has 24 hours of programming every day. It's not at all venues but there is always something on somewhere. The full schedule will be released on the Wonder App' (s3, 'What time does the music stop?', read 2026-10-22)",
          source: ["s12", "s8", "s3"],
          readOn: "2026-10-21",
          schedule: {
            value: "FAQ 'What time does the music stop?': 'The full schedule will be released on the Wonder App and Profiles on web later in the year.' (s3, unchanged). The Directory's profiles already print day, time and venue for 110 music acts (s31). Both are true at once: a first release is out, the full schedule is not.",
            source: ["s3", "s31"],
            readOn: "2026-10-24",
          },
        },
        acts: [
          "Tangerine Dream",
          "Eli Keszler",
          "Orphx",
          "ITSU & ARS",
          "Jesse You",
          "JakoJako & Pascal Hetzel (Live)",
          "Loyboy",
          "Gerd Janson",
          "Hamdi Ryder",
          "Omoloko",
          "ffan",
          "Faustus",
          "Nubya Garcia",
          "Jane Fitz",
          "Nicolas Lutz",
          "Sweely",
          "DOTT (House Set)",
          "Shanka Tribe",
          "DJ Python",
          "Genderfunk",
          "The Paradise Bangkok Molam International Band",
        ],
        // The scout's round 1 on the English twin's card (`changes: lineup.acts`): the
        // 21 names stand; where s8 and s31 now print them.
        actsNote: {
          note: "the 21 names stay as the organiser's 1 Sep release lists them (s12, unchanged on the wire copy today). s8 no longer prints DJ Python, Genderfunk or The Paradise Bangkok Molam International Band in its music lists; all three are in the Directory: 'DJ Python' (Sun 6 Dec 21:30–23:30, The Quarry), 'Genderfunk X Peach X Snug' (Fri 4 Dec 21:00–23:00, Forbidden Fruit), 'Paradise Bangkok Molam International Band' (no slot yet). Shanka Tribe is listed on s8 under 'Rituals & Ceremonies'. No act of the 21 has been dropped.",
          source: ["s12", "s8", "s31"],
          readOn: "2026-10-24",
        },
        // The forms of the 21 names in the release, the programme and the Directory
        // (the scout's repairs after gate 2, S7).
        actsForms: {
          release: "s12 prints the 21 as 'this year's highlights … and more to come', in this order and these forms: Tangerine Dream, Eli Keszler, Orphx, ITSU & ARS, Jesse You, JakoJako, Loyboy, Gerd Janson, Hamdi Ryder, Omoloko, ffan, Faustus, Nubya Garcia, Jane Fitz, Nicolas Lutz, Sweely, DOTT, Shanka Tribe, DJ Python, Genderfunk, the Paradise Bangkok Molam International Band",
          programme: "s8 'Global and Regional Sounds' prints 'JakoJako & Pascal Hetzel (Live)' and 'DOTT (House Set)' (17 names, 'AND MORE TO COME...')",
          directory: "separate profiles 'JakoJako' (Sat 5 Dec 02:00–05:00, The Quarry) and 'JakoJako & Pascal Hetzel (Live)' (Sat 5 Dec 00:00–02:00, Enfold); 'DOTT (House Set)' only (Mon 7 Dec 01:00–03:00, Forbidden Fruit); 'Genderfunk X Peach X Snug'",
          rule: "lineup.acts keeps the s8 forms. Copy that cites the release's order prints the release's forms, or says the names are given as the programme page prints them.",
          source: ["s12", "s8", "s31"],
          readOn: "2026-10-24",
        },
        rootMusic: [
          "Sansae",
          "Thee Marloes",
          "Jarb Cat",
          "Ghetto All Stars",
          "Toomturn Molam Group",
          "Sombat Simla",
          "MAKARA",
          "Rattanakosin Breakin' Crew",
          "Khontan & The Hymmapan Express",
          "Chamroen Bang Fai Bolan",
        ],
        solarVillage: ["Jason Kendig", "Alex Albrecht", "Markie", "Pam Anantr", "AWARË", "Salin", "Carps"],
        programmes: [
          "From Sound to Screen: Nick Dwyer films with live music over three evenings",
          "Sonic Minds by MSCTY_Studio with May-T, Sunju Hargun, Quantum Aria (Carl Stone & Akaihirume)",
          "Molam World (Isaan)",
          "wellness theme 'Rooted in the Inner Axis'",
        ],
        // The programme page's other strands, item 0 as the scout's repairs restate it.
        programmesMore: [
          {
            value: "Rituals & Ceremonies, 'rituals and ceremonies from diverse cultural traditions': Haedong Lee & Yidan Kim; Banana Blossom Tea, Flower & Sound Ceremony (by Jaykay, Katt, Ann & Japan); MONTAÑERA; Shanka Tribe; Dhyana, Non-Duality in Everyday Life, which is 'Curated by Black Turtle'; an Opening Ritual, 'Awakening the Space', with Tulku Ngawang; a Closing Ceremony, 'The Great Dissolving', with Tulku Ngawang & Dhyana Ensemble; Origin Myths Written in Salt and Lightning (by Zarina Muhammad and collaborators)",
            print_as: "Black Turtle curates Dhyana, not the strand. The page lists the Opening Ritual and Closing Ceremony after Dhyana's entry, with no heading between them, so it does not say whether they belong to Dhyana. Print them as part of Rituals & Ceremonies.",
            source: "s8",
            readOn: "2026-10-24",
          },
          {
            value: "Stories to eat: Open Kitchen, 'a women-led culinary ecosystem' (Life's Market by Auntie Chan; Ma's Kitchen by Lady GooGoo, a Burmese menu); Wonder Kitchen chef's tables (Chef Aom of Pimali Foundation/Luktarn, Somsak, Chef Jo of Samuay and sons, Samrub Samrub Thai & Chef Prin Polsuk, Chef Thav of 80/20)",
            source: "s8",
            readOn: "2026-10-24",
          },
          {
            value: "Living through the arts: 15 named installations, among them Light Hive (RGB x RedLight Lab), The Walk (Boonserm Premthada), Molam Bus (The Jim Thompson Art Center), Gathering Tables Wonderfruit (Pinaree Sanpitak), Baan Bardo (Wit Pimkanchanapong), 'AND MORE TO COME...'",
            source: "s8",
            readOn: "2026-10-24",
          },
          {
            value: "Unconditional Space: 'Tropicality: New Beginnings', co-programmed with art curator Aaditya Sathish",
            source: "s8",
            readOn: "2026-10-24",
          },
          {
            value: "Intermission (unsigned Thai bands, mentorship from producer Howie B, support from Siam Music Yamaha): applications 'Closed'",
            source: "s8",
            readOn: "2026-10-24",
          },
        ],
        // The organiser's Directory, its first release of day, time and venue: one
        // line an act, the organiser's day label (the calendar day the slot starts).
        directory: {
          what: "the organiser's Directory (https://wonderfruit.co/directory), headed 'FIRST RELEASE', filters All / Wellness / Music / Workshops & Activities / Food & Drink / Talks / Art; each entry opens a profile at /directory/<slug> that prints the act's day, time and venue. Records published 1 Sep – 22 Oct 2026 (Storyblok publish dates in the page data). The day label is the calendar day the slot starts, so 'Sat 5 Dec 00:00' is the small hours after Friday.",
          caveat: "the FAQ still says the full schedule comes 'later in the year' on the Wonder App (s3); print these as the organiser's first release, not as the final timetable",
          scheduled: [
            "Maft Sai and The Isan Clan (Live) | Thu 3 Dec 18:45–20:00 Molam World",
            "Amberleaf | Thu 3 Dec 20:00–22:00 Enfold",
            "Interval: Music for a Moving Maze by MSCTY_Studio | Thu 3 Dec 20:00–20:30 Baan Bardo; Fri 4 Dec 20:00–20:30 Baan Bardo; Sat 5 Dec 20:00–20:30 Baan Bardo",
            "QUANG ENSEMBLE | Thu 3 Dec 20:00–21:00 Creature Stage",
            "Jarb Cat | Thu 3 Dec 20:30–21:45 Molam World",
            "Haedong Lee & Yidan Kim | Thu 3 Dec 21:00–22:00 Baan Bardo",
            "Loyboy | Thu 3 Dec 21:00–23:00 Forbidden Fruit",
            "Masayoshi Fujita | Thu 3 Dec 22:00–23:00 Forest Stage",
            "Toomturn Molam Group | Thu 3 Dec 22:15–23:30 Molam World",
            "Tristan Bres | Thu 3 Dec 22:30–23:30 Baan Bardo",
            "Chalo | Thu 3 Dec 23:00–00:00 The Quarry",
            "YOKOSUN | Thu 3 Dec 23:00–01:00 Forbidden Fruit",
            "Shanka Tribe | Thu 3 Dec 23:30–01:00 Creature Stage; Sun 6 Dec 21:00–22:00 Forest Stage",
            "Maft Sai (DJ) | Thu 3 Dec 23:45–02:00 Molam World",
            "CHIDA | Fri 4 Dec 00:00–03:00 The Quarry",
            "Goldcap | Fri 4 Dec 00:00–02:00 Baan Bardo",
            "Gerd Janson | Fri 4 Dec 01:00–04:00 Forbidden Fruit",
            "Mano Le Tough | Fri 4 Dec 02:00–05:00 Baan Bardo",
            "Nhật-Vũ Đặng | Fri 4 Dec 02:00–04:00 Enfold",
            "Sonido Tupinamba | Fri 4 Dec 16:00–18:00 Forbidden Fruit",
            "Chamroen Bang Fai Bolan | Fri 4 Dec 17:30–18:45 Molam World",
            "MONTAÑERA | Fri 4 Dec 18:00–19:00 Forest Stage",
            "Nightmares on Wax | Fri 4 Dec 18:00–21:00 Forbidden Fruit",
            "Pete Herbert | Fri 4 Dec 18:30–21:00 Solar Village",
            "Phum Viphurit | Fri 4 Dec 18:30–19:30 Creature Stage",
            "DOTDOTDOT | Fri 4 Dec 19:00–20:00 (no venue given)",
            "Zound to Zion (Live) | Fri 4 Dec 19:15–20:30 Molam World",
            "Mindy Meng Wang 王萌 & Tim Shiel | Fri 4 Dec 19:30–20:30 Forest Stage",
            "Carl Stone | Fri 4 Dec 20:00–21:00 Enfold",
            "Oxmo Puccino & Demi Portion | Fri 4 Dec 20:00–21:00 Creature Stage",
            "VEGA | Fri 4 Dec 20:00–21:00 Creature Stage",
            "Genderfunk X Peach X Snug | Fri 4 Dec 21:00–23:00 Forbidden Fruit",
            "MAKARA | Fri 4 Dec 21:00–22:15 Molam World",
            "Maakornchai | Fri 4 Dec 21:00–22:00 Forest Stage",
            "Eli Keszler | Fri 4 Dec 21:30–22:30 Enfold; Sun 6 Dec 19:30–20:30 Forest Stage",
            "fox capture plan | Fri 4 Dec 21:30–22:30 Creature Stage",
            "The Panturas | Fri 4 Dec 22:30–23:30 Creature Stage",
            "Lorjhu' | Fri 4 Dec 22:45–00:00 Molam World",
            "Bouffant Bouffant | Fri 4 Dec 23:00–01:00 Forbidden Fruit",
            "Jim O'Rourke & Eiko Ishibashi | Fri 4 Dec 23:00–00:00 Enfold",
            "Justfin | Fri 4 Dec 23:00–00:30 The Quarry",
            "UKAWA NAOHIRO (DOMMUNE) | Fri 4 Dec 23:00–00:30 Baan Bardo",
            "JakoJako & Pascal Hetzel (Live) | Sat 5 Dec 00:00–02:00 Enfold",
            "Tangerine Dream | Sat 5 Dec 00:00–01:00 Creature Stage",
            "Orphx | Sat 5 Dec 00:30–02:00 The Quarry; Sat 5 Dec 22:30–23:30 Enfold",
            "Paradise Bangkok National Molam Project (Live) | Sat 5 Dec 00:30–01:45 Molam World",
            "Remcord (Live) | Sat 5 Dec 00:30–02:00 Baan Bardo",
            "Omoloko | Sat 5 Dec 01:00–03:00 Forbidden Fruit",
            "CIFIKA | Sat 5 Dec 02:00–03:00 Enfold",
            "JakoJako | Sat 5 Dec 02:00–05:00 The Quarry",
            "Manasseh (DJ) | Sat 5 Dec 02:00–04:00 Molam World",
            "Dar Disku | Sat 5 Dec 03:00–05:00 Forbidden Fruit",
            "LYDO | Sat 5 Dec 03:30–05:30 Enfold; Mon 7 Dec 02:30–04:30 The Quarry",
            "Salin | Sat 5 Dec 05:00–06:00 Solar Village; Sat 5 Dec 23:00–00:00 Forest Stage",
            "Alex Albrecht | Sat 5 Dec 06:15–09:00 Solar Village",
            "Husa & Zeyada (Live) | Sat 5 Dec 17:00–18:30 Solar Village",
            "Sombat Simla | Sat 5 Dec 17:30–18:45 Molam World",
            "The Insect Forecast by MSCTY_Studio with Quantum Aria (Carl Stone & Akaihirume) | Sat 5 Dec 18:00–19:00 Forest Stage",
            "Carps | Sat 5 Dec 19:00–21:00 Solar Village",
            "Jay Ru | Sat 5 Dec 19:00–21:00 Forbidden Fruit",
            "Sansae | Sat 5 Dec 19:15–20:30 Molam World",
            "Music for Small Actions by MSCTY_Studio with May-T | Sat 5 Dec 19:30–20:30 Forest Stage",
            "Jason Kendig | Sat 5 Dec 20:30–22:00 Enfold; Mon 7 Dec 07:00–09:00 Solar Village",
            "Ayøn B2B Bins | Sat 5 Dec 21:00–23:00 Forbidden Fruit",
            "Field Stories MSCTY_Studio with Sunju Hargun | Sat 5 Dec 21:00–22:30 Forest Stage",
            "ITSU & ARS | Sat 5 Dec 21:00–22:00 Baan Bardo",
            "Thee Marloes | Sat 5 Dec 21:00–22:15 Molam World",
            "Nubya Garcia | Sat 5 Dec 21:30–22:30 Creature Stage",
            "Jesse You | Sat 5 Dec 22:00–00:00 The Quarry",
            "ECHT! | Sat 5 Dec 22:30–23:30 Creature Stage",
            "Tu Direk (Live) | Sat 5 Dec 22:45–23:45 Molam World",
            "Felix Dickinson | Sat 5 Dec 23:00–01:00 Forbidden Fruit",
            "Jakrin | Sun 6 Dec 00:00–02:00 Baan Bardo",
            "Nicolas Lutz | Sun 6 Dec 00:00–02:30 The Quarry",
            "Pam Anantr | Sun 6 Dec 00:00–02:00 Enfold; Mon 7 Dec 09:00–11:00 Solar Village",
            "Ghetto All Stars | Sun 6 Dec 00:15–01:30 Molam World",
            "Joe Delon | Sun 6 Dec 01:00–03:00 Forbidden Fruit",
            "DJ Masda B2B Payu | Sun 6 Dec 02:00–05:00 Baan Bardo",
            "Tape Jam (DJ) | Sun 6 Dec 02:00–04:00 Molam World",
            "Jacob Meehan ft. Motherboard | Sun 6 Dec 02:30–03:30 Enfold",
            "Jane Fitz | Sun 6 Dec 02:30–05:00 The Quarry",
            "ffan | Sun 6 Dec 03:00–05:00 Forbidden Fruit",
            "Kyomi | Sun 6 Dec 04:00–05:00 Enfold",
            "Xiaolin | Sun 6 Dec 05:00–06:00 Enfold",
            "Kuniyuki (Live) | Sun 6 Dec 06:00–07:00 Enfold",
            "Shhhhh | Sun 6 Dec 07:00–08:00 Enfold",
            "B35 (Live) | Sun 6 Dec 17:30–18:45 Molam World",
            "Hamdi Ryder | Sun 6 Dec 19:00–21:00 Forbidden Fruit",
            "Krungasorn (Live) | Sun 6 Dec 19:15–20:30 Molam World",
            "Mong Tong | Sun 6 Dec 21:00–22:00 Baan Bardo",
            "Narongloud (Live) | Sun 6 Dec 21:00–22:15 Molam World",
            "Transport | Sun 6 Dec 21:00–23:00 Forbidden Fruit",
            "DJ Python | Sun 6 Dec 21:30–23:30 The Quarry",
            "Jack Wyllie | Sun 6 Dec 21:30–22:30 Creature Stage",
            "pause.dxa | Sun 6 Dec 22:00–23:00 Enfold",
            "Howie Lee | Sun 6 Dec 22:30–23:30 Baan Bardo",
            "Sheherazaad | Sun 6 Dec 22:30–23:30 Creature Stage",
            "Rattanakosin Breakin' Crew | Sun 6 Dec 22:45–00:00 Molam World",
            "Running Hot | Sun 6 Dec 23:00–01:00 Forbidden Fruit",
            "Sweely | Sun 6 Dec 23:30–00:30 The Quarry",
            "Marcel Dettmann | Mon 7 Dec 00:00–03:00 Baan Bardo",
            "Outlet Drift | Mon 7 Dec 00:00–01:00 Creature Stage",
            "DJ Masda | Mon 7 Dec 00:30–02:30 The Quarry",
            "Khontan & The Hymmapan Express | Mon 7 Dec 00:30–01:45 Molam World",
            "PASUTH | Mon 7 Dec 00:30–01:30 Enfold",
            "DOTT (House Set) | Mon 7 Dec 01:00–03:00 Forbidden Fruit",
            "Hey Arnold | Mon 7 Dec 02:00–05:00 Enfold",
            "K9 with KC ZuDZaNaN (Live) | Mon 7 Dec 02:00–04:00 Molam World",
            "DJ Deep | Mon 7 Dec 02:30–04:30 Baan Bardo",
            "AWARË | Mon 7 Dec 04:30–07:00 Solar Village",
          ],
          noSlotYet: [
            "Avr",
            "Chambord",
            "Cyril Grouvel",
            "Disko Santan",
            "Emel",
            "Faustus",
            "Gaspray",
            "Igor Marijuan",
            "Jacob Meehan",
            "Jenny Jen",
            "K-Sang",
            "Kibum",
            "Liem",
            "Markie",
            "Monkey Business",
            "Nomtii",
            "Okaydante",
            "Paradise Bangkok Molam International Band",
            "Raisoul",
            "Rui Rodrigues",
            "sho&tell",
            "Sāri & Merssini",
            "YONLAPA",
            "Your Nikola",
            "Yu Yang",
            "Zhiqi",
          ],
          counts: "136 music acts; 110 with a day and a time, 109 of them with a venue; 26 without a slot",
          venueless: "DOTDOTDOT, Fri 4 Dec 19:00–20:00: its schedule record has related_venue: [] and its profile prints no stage. Monkey Business and Markie also have empty schedule records, with no time, and are already in noSlotYet. No other music act lacks a venue",
          source: "s31",
          readOn: "2026-10-24",
        },
        source: ["s8", "s12"],
        readOn: "2026-10-24",
      },
      transport: [
        {
          how: "Shuttles and Parking are listed 'Coming soon' in the site-wide menu on every page and in the body of the ticket page under 'Prepare for The Fields' (Parking: Coming Soon; Shuttles: Coming Soon). The FAQ and the Hotels page say 'Shuttle Passes will be available soon' and 'Shuttle schedules will be released shortly'. The Journeys page books workshops, experiences and activities and carries no shuttle or parking content; /shuttles and /parking answer 302 to the home page.",
          source: ["s2", "s3", "s7"],
          readOn: "2026-10-24",
        },
        {
          how: "Partner hotels with an official shuttle stop in the lobby: Mövenpick Siam Na Jomtien Pattaya (16 km from The Fields), Centre Point Prime Hotel Pattaya (22 km; 8% off with code WDF26); Royal Cliff Beach Hotel Pattaya (27 km) runs its own complimentary shuttle to Wonderfruit at 15:00 and 18:00; guests staying elsewhere in Pattaya can reserve shuttle passes through the nearest partner hotel once schedules are out",
          source: ["s7", "s3"],
          readOn: "2026-10-24",
        },
        {
          how: "From Bangkok: the organiser's FAQ lists them (faqList). Roong Reuang Coach runs a direct bus Suvarnabhumi Airport → Pattaya Bus Terminal, from THB 135, about 2 hours; its Bangkok departure points are Ekkamai, Mo Chit and Suvarnabhumi, Pattaya stops North Pattaya and Jomtien; fares and timetables sit behind the booking search (rrcticket.com)",
          source: ["s3", "s14", "s15"],
          readOn: "2026-10-21",
          faqList: {
            text: "These include private and public buses, minivans, airport limousines, trains, car rentals and more.",
            source: "s3",
            readOn: "2026-10-24",
          },
        },
        {
          how: "Nearest airport: U-Tapao Rayong-Pattaya International Airport (its own Thai name, from its page title: 'ท่าอากาศยานนานาชาติอู่ตะเภา ระยอง-พัทยา'), 39.1 km from Pattaya city per the airport; the airport's home page carries route news, not a route list: direct U-Tapao–Surat Thani and U-Tapao–Hua Hin announced, Udon Thani–U-Tapao 'back'; none of the news items names Bangkok; the Domestic Schedule page returned no schedule to curl (fact-checker, 22 Oct)",
          source: "s16",
          readOn: "2026-10-22",
        },
        {
          how: "Boutique Camping guests get complimentary dedicated parking and a private entrance",
          source: "s5",
          readOn: "2026-10-24",
        },
        {
          how: "Taxi or Grab from Pattaya: no organiser figure; the venue is 16–27 km from the partner hotels in Na Jomtien and Pattaya (s7)",
          source: "s7",
          readOn: "2026-10-24",
        },
      ],
      practical: [
        {
          what: "cashless site; ATMs on site to top up wristbands; the organiser (s3): 'top-ups made using a Credit Card are non-refundable, so having some cash is always a good idea'",
          source: "s3",
          readOn: "2026-10-24",
        },
        {
          what: "no outside food or drink — the organiser (s3, s4): 'Outside food (except for campers with dietary restrictions or milk formula for babies)'; no alcohol, no glass, no single-use plastic; free water refill stations; no WiFi, patchy signal; charging at water stations",
          source: ["s3", "s4"],
          readOn: "2026-10-24",
        },
        {
          what: "General Camping: no tents provided or rented, first come first served, no tent trucks or campervans, village next to Enfold and Wonder Kitchen",
          source: "s4",
          readOn: "2026-10-24",
        },
        {
          what: "Slow Wonder: lower fields by the beach, breakfast at Jungle House, four pre-registered village guests allowed",
          source: ["s6", "s3"],
          readOn: "2026-10-24",
        },
        {
          what: "organiser contact info@wonderfruit.co; Slow Wonder concierge@slow-wonder.com",
          source: ["s3", "s6"],
          readOn: "2026-10-24",
        },
        {
          what: "the organiser's FAQ prints Slow Wonder check-in as 'Thursday 3 December 2025' (a year typo on their page); the cabin page says 3 December, 2pm",
          source: ["s3", "s6"],
          readOn: "2026-10-24",
        },
        {
          what: "a General Camping wristband enters the camping village (s4); event tickets and all accommodations are sold separately (s3, Boutique Camping FAQ answer: 'Yes, tickets for the event and for all accommodations are sold separately.')",
          source: ["s4", "s3"],
          readOn: "2026-10-24",
        },
        // What may not come in, and what may (the English twin's scout, round 1).
        {
          key: "prohibited",
          value: "the organiser's list 'prohibited at Wonderfruit and in General Camping' (s4, same on s3): gas or electric stoves; glass of any kind; drones; selfie sticks; professional camera equipment (DSLR allowed, extra lenses and tripods need approval); Native American headdresses; hoverboards; bicycles, skateboards, rollerblades; single-use plastics or glass bottles; outside drinks; outside food (except campers with dietary restrictions or baby formula); animals other than dogs with a Dog Pass; nasal or throat sprays without prescription; 'Weed exceeding a palm-sized amount (for personal use only)'; totems or large signs; alcohol, nitrous oxide, narcotics (confiscated; 'large amounts will be referred to police'); weapons. Allowed: prescribed medicine with the attendee's name, sealed supplements, camping gear, chairs, solar chargers, trolleys, hammocks, mallets and stakes. FAQ: 'Cameras and drones are forbidden unless you have applied for and received a permit from Wonderfruit in advance.'",
          note: "answers 'what to bring to wonderfruit' (autocomplete). The cannabis line is the organiser's house rule, printed as such, never as a statement of Thai law",
          source: ["s4", "s3"],
          readOn: "2026-10-24",
        },
      ],
      // Entry to Thailand for a reader from abroad, from GOV.UK, the Immigration
      // Bureau and TAT (the English twin's scout, round 1, and its repairs).
      entry: {
        uk: {
          value: "GOV.UK, for a full British citizen passport: passport expiry at least 6 months after arrival, at least 1 blank page; 'From 15 September 2026, if you enter Thailand under the visa exemption scheme, you can stay for up to 30 days for tourism only'; may be asked for proof of funds (at least 10,000 baht per person or 20,000 per family) and onward or return travel; a digital arrival card for all foreign nationals, registered 'within 3 days before they arrive'; overstay fine 500 baht a day up to 20,000. Page updated 12 October 2026 ('Updated information about visa requirements…').",
          source: "s32",
          readOn: "2026-10-24",
        },
        tdac: {
          value: "Thai Immigration Bureau's TDAC site, titled 'Official Thailand Digital Arrival Card (TDAC) – No Fees Required': 'All passengers must complete the Thailand Digital Arrival Card'; 'Foreigners are required to submit their arrival card information 3 days in advance of their arrival date in Thailand.'",
          note: "link only this host (tdac.immigration.go.th); look-alike TDAC sites that charge exist, so the page names the official one and says it is free, as the site does",
          source: "s34",
          readOn: "2026-10-24",
        },
        visaExemption: {
          value: "TAT, 1 Sep 2026: from 15 September 2026 the 60-day visa exemption ends; passports of 60 countries and territories get visa exemption 'for tourism, with a permitted stay of up to 30 days', among them the United Kingdom, Ireland, the United States, Canada, Australia, New Zealand, India, Singapore, Malaysia, Japan, Taiwan, the UAE and every EU member state (TAT lists all 27 by name, Austria to Sweden; it does not use the term 'EU'); land-border entries on it generally limited to twice per calendar year (not for Malaysia, Brunei, Indonesia, Singapore); based on Ministry of Interior announcements in the Royal Gazette, 31 August 2026",
          note: "gives non-British readers the rule from a Thai public body; the full list of 60 is on s35",
          source: "s35",
          readOn: "2026-10-24",
        },
        ukWarnings: {
          value: "GOV.UK warnings: FCDO advises against all but essential travel to Pattani, Yala and Narathiwat, the Hat Yai–Padang Besar line, and within 20 km of the Cambodian land border; Chonburi is not among them. The same page currently carries 'Severe Flooding … including Bangkok, Nonthaburi, Pathum Thani and Samut Prakan', undated.",
          note: "the flooding line is transient: not printed unless re-read on the deploy day, and then with its date; the area list is for the writer's own check, not a sentence the page needs",
          source: "s33",
          readOn: "2026-10-24",
        },
      },
      people: [
        {
          role: "founder",
          name: "Pranitan 'Pete' Phornprapha",
          organiserWording: "'Our Founder Pete Phornprapha' (s29, 13 Dec 2025); 'Wonderfruit founder Pranitan “Pete” Phornprapha' (s30, organiser's re-post of Everfest, 15 Jan 2018)",
          thai: "'พีท ประณิธาน พรประภา ผู้ก่อตั้ง Wonderfruit' (s21, Tatler Asia, 9 Dec 2025, caption and lead); 'พีท-ประณิธาน พรประภา' (s20, The Standard); 'คุณพีท ประณิธาน พรประภา ผู้ก่อตั้ง Wonderfruit' (s27, InfoQuest)",
          source: ["s29", "s30", "s21", "s20", "s27"],
          readOn: "2026-10-22",
        },
        {
          role: "co-founder",
          name: "Montonn 'Jay' Jira",
          organiserWording: "'his co-founder, Thai musician Montonn “Jay” Jira' (s30)",
          thai: "'เจ มณฑล จิรา ผู้ก่อตั้ง Wonderfruit' (s21 caption; Tatler uses ผู้ก่อตั้ง for both, never ผู้ร่วมก่อตั้ง)",
          source: ["s30", "s21"],
          readOn: "2026-10-22",
        },
      ],
      questions: [
        {
          q: "Wonderfruit คืออะไร",
          seen: "autocomplete: 'wonderfruit คือ', 'wonderfruit 2026 คือ'",
          answer_from: ["s1", "s12", "s9"],
        },
        {
          q: "บัตร Wonderfruit 2026 ราคาเท่าไหร่",
          seen: "autocomplete: 'wonderfruit ราคา บัตร', 'wonderfruit 2026 ราคา', 'wonderfruit ราคา'",
          answer_from: ["s2", "s3"],
        },
        {
          q: "ใครเป็นเจ้าของ Wonderfruit",
          seen: "autocomplete: 'wonderfruit เจ้าของ'",
          answer_from: ["s10", "s12", "s21", "s20"],
        },
        {
          q: "Wonderfruit 2026 จัดที่ไหน",
          seen: "autocomplete: 'wonderfruit 2026 จัด ที่ไหน', 'wonderfruit 2026 location'",
          answer_from: ["s3", "s9"],
        },
        {
          q: "Wonderfruit 2026 จัดวันไหน",
          seen: "autocomplete: 'wonderfruit 2026 dates'",
          answer_from: ["s1", "s3"],
        },
        {
          q: "ไลน์อัพ Wonderfruit 2026 มีใครบ้าง",
          seen: "autocomplete: 'wonderfruit 2026 lineup'",
          answer_from: ["s8", "s12"],
        },
        {
          q: "ซื้อบัตร Wonderfruit 2026 ได้ที่ไหน ขายรอบไหนบ้าง",
          seen: "autocomplete: 'wonderfruit 2026 tickets'",
          answer_from: ["s2", "s11", "s3"],
        },
        {
          q: "Wonderfruit Kyoto คืออะไร จัดเมื่อไหร่",
          seen: "autocomplete: 'wonderfruit 2026 kyoto'",
          answer_from: ["s22", "s3"],
        },
        {
          q: "Wonderfruit 2027 จัดเมื่อไหร่",
          seen: "autocomplete: 'wonderfruit 2027', 'wonderfruit 2027 dates'",
          answer_from: [],
          note: "not announced; the last two editions were announced in March (2026) and late May (2025)",
        },
        {
          q: "เด็กอายุต่ำกว่า 12 ต้องซื้อบัตรไหม / มีจำกัดอายุไหม",
          seen: "organiser FAQ (English)",
          answer_from: ["s3"],
        },
        {
          q: "กางเต็นท์เองได้ไหม General Camping ราคาเท่าไหร่",
          seen: "organiser FAQ (English); the row's 'camping and stay' page",
          answer_from: ["s4", "s5", "s6"],
        },
        {
          q: "ที่พักใกล้งานมีที่ไหนบ้าง",
          seen: "organiser Hotels page",
          answer_from: ["s7"],
        },
        {
          q: "ไปงาน Wonderfruit ยังไงจากกรุงเทพ / มีรถรับส่งไหม",
          seen: "organiser FAQ (English)",
          answer_from: ["s3", "s13", "s7", "s14", "s15"],
        },
        {
          q: "ประตูเปิดกี่โมง เข้า-ออกงานได้ไหม",
          seen: "organiser FAQ (English)",
          answer_from: ["s3"],
        },
        {
          q: "พาสุนัขเข้างานได้ไหม",
          seen: "organiser FAQ (English)",
          answer_from: ["s3", "s2"],
        },
        {
          q: "ในงานจ่ายเงินยังไง นำอาหารเข้าได้ไหม",
          seen: "organiser FAQ (English)",
          answer_from: ["s3", "s4"],
        },
        {
          q: "ขอคืนเงินหรือขายต่อบัตรได้ไหม",
          seen: "organiser terms",
          answer_from: ["s10"],
        },
        {
          q: "Wonderfruit คืองานอะไร",
          seen: "people also ask (query 1)",
          answer_from: ["s1", "s12", "s9"],
        },
        {
          q: "งาน Wonderfruit 2026 จะจัดขึ้นเมื่อไหร่?",
          seen: "people also ask (query 1)",
          answer_from: ["s1", "s3", "s11"],
        },
        {
          q: "Wonderfruit ของใคร",
          seen: "people also ask (query 1, query 6)",
          answer_from: ["s10", "s11", "s12", "s21"],
        },
        {
          q: "Wonderfruit 2026 ราคาเท่าไหร่?",
          seen: "people also ask (queries 1, 2, 3, 4, 5)",
          answer_from: ["s2", "s3", "s11"],
        },
        {
          q: "Wonderfruit งานอะไรบ้าง?",
          seen: "people also ask (query 2, query 5)",
          answer_from: ["s8", "s9"],
        },
        {
          q: "Wonderfruit Festival จัด ที่ไหน",
          seen: "people also ask (query 2)",
          answer_from: ["s3", "s9"],
        },
        {
          q: "งาน Wonderfruit ใครจัด",
          seen: "people also ask (query 2)",
          answer_from: ["s10", "s11", "s12"],
        },
        {
          q: "Wonderfruit 2026 จัดที่ไหน",
          seen: "people also ask (query 3)",
          answer_from: ["s3", "s9"],
        },
        {
          q: "งาน Wonderfruit คือ งาน อะไร",
          seen: "people also ask (query 4)",
          answer_from: ["s1", "s12"],
        },
        {
          q: "Wonderfruit Festival 2026 จัดที่ไหน",
          seen: "people also ask (query 5)",
          answer_from: ["s3", "s9"],
        },
        {
          q: "บัตรเข้าชมงาน Wonderfruit ราคาเท่าไหร่?",
          seen: "people also ask (query 6)",
          answer_from: ["s2", "s3", "s11"],
        },
        // The English twin's question the copy cites ([questions.en.burningMan]); the
        // rest of its table stays on its card.
        {
          key: "en",
          burningMan: {
            q: "Is Wonderfruit like Burning Man?",
            seen: "PAA q1–q5, q7, q8; autocomplete",
            answered: "not answered (a comparison no source makes); the page states the facts (cashless, no single-use plastic, camping) and leaves the comparison alone",
          },
        },
      ],
      sources: {
        s1: {
          label: "Wonderfruit, official site",
          url: "https://wonderfruit.co/",
          kind: "organiser",
        },
        s2: {
          label: "Wonderfruit, tickets (English at /tickets; Thai body at /tickets?lang=thai)",
          url: "https://wonderfruit.co/tickets",
          kind: "organiser",
        },
        s3: {
          label: "Wonderfruit, FAQ",
          url: "https://wonderfruit.co/faq",
          kind: "organiser",
        },
        s4: {
          label: "Wonderfruit, General Camping",
          url: "https://wonderfruit.co/general-camping",
          kind: "organiser",
        },
        s5: {
          label: "Wonderfruit, Boutique Camping",
          url: "https://wonderfruit.co/boutique-camping",
          kind: "organiser",
        },
        s6: {
          label: "Wonderfruit, Slow Wonder cabins",
          url: "https://wonderfruit.co/slow-wonder",
          kind: "organiser",
        },
        s7: {
          label: "Wonderfruit, Hotels & Travel",
          url: "https://wonderfruit.co/hotels",
          kind: "organiser",
        },
        s8: {
          label: "Wonderfruit, Guide to Wonder (programme; Thai prose at /guide-to-wonder?lang=thai)",
          url: "https://wonderfruit.co/guide-to-wonder",
          kind: "organiser",
        },
        s9: {
          label: "Wonderfruit, Venues",
          url: "https://wonderfruit.co/venues",
          kind: "organiser",
        },
        s10: {
          label: "Wonderfruit, Terms and Conditions",
          url: "https://wonderfruit.co/terms-and-conditions",
          kind: "organiser",
        },
        s11: {
          label: "Ticketmelon, Wonderfruit 2026 – The November Sale",
          url: "https://www.ticketmelon.com/wonderfruit/wf26main",
          kind: "seller",
        },
        s12: {
          label: "Wonderfruit press release, 1 Sep 2026 (wire copy on Việt Nam News media-outreach)",
          url: "https://vietnamnews.vn/media-outreach/1798743/first-look-at-the-fields-wonderfruit-unveils-programs-and-passes-for-december.html",
          kind: "media (organiser's release)",
        },
        s13: {
          label: "Wonderfruit, Journeys (bookable workshops, experiences and activities; no shuttle or parking content)",
          url: "https://wonderfruit.co/journeys",
          kind: "organiser",
        },
        s14: {
          label: "Roong Reuang Coach, Suvarnabhumi–Pattaya bus",
          url: "https://www.airportpattayabus.com/",
          kind: "transport operator",
        },
        s15: {
          label: "Roong Reuang Coach, ticketing (routes)",
          url: "https://rrcticket.com/customer/Webhome",
          kind: "transport operator",
        },
        s16: {
          label: "U-Tapao Rayong-Pattaya International Airport",
          url: "https://www.utapao.com/",
          kind: "public body",
        },
        s17: {
          label: "Wonderfruit, Wonderpost 'Sleeping in The Fields' (2023 accommodation)",
          url: "https://wonderfruit.co/wonderpost/accommodations-2023/",
          kind: "organiser",
        },
        s18: {
          label: "Time Out Asia, 9 Mar 2026: Wonderfruit 2026 dates, ticketing and Kyoto",
          url: "https://www.timeout.com/asia/news/all-you-need-to-know-about-wonderfruit-2026-dates-ticketing-and-new-kyoto-edition-030926",
          kind: "media",
        },
        s19: {
          label: "Time Out Bangkok, 29 May 2025: Wonderfruit 2025 dates and prices",
          url: "https://www.timeout.com/bangkok/news/wonderfruit-2025-dates-ticket-prices-and-everything-you-need-to-know-052925",
          kind: "media",
        },
        s20: {
          label: "The Standard (Thai), 25 Dec 2024: Wonderfruit 2024 wrap-up",
          url: "https://thestandard.co/wonderfruit-2024-wrap-up/",
          kind: "media",
        },
        s21: {
          label: "Tatler Asia: Pete Phornprapha, founder of Wonderfruit",
          url: "https://www.tatlerasia.com/power-purpose/leadership/pranitan-pete-phornprapha-10-year-wonderfruit-th",
          kind: "media",
        },
        s22: {
          label: "Wonderfruit Chapters Kyoto",
          url: "https://chapterskyoto.co/",
          kind: "organiser",
        },
        s23: {
          label: "Wonderfruit, Wonder Report (PDFs 2023, 2024, 2025 on assets.wonderfruit.co)",
          url: "https://wonderfruit.co/wonder-report",
          kind: "organiser",
        },
        s24: {
          label: "Wonderfruit, Thai home page",
          url: "https://wonderfruit.co/?lang=thai",
          kind: "organiser",
        },
        s25: {
          label: "Wonderfruit, Decade of Wonder",
          url: "https://wonderfruit.co/decade-of-wonder",
          kind: "organiser",
        },
        s26: {
          label: "Wonderfruit, The Pineapple Eyes",
          url: "https://wonderfruit.co/thepineappleeyes",
          kind: "organiser",
        },
        s27: {
          label: "InfoQuest (Thai), 19 Jun 2026: Wonderfruit 2026 Pre-Sale registration",
          url: "https://www.infoquest.co.th/2026/603042",
          kind: "media",
        },
        s28: {
          label: "Wonderfruit, Wonderpost 'Program Passes' (2026), 5 Aug 2026",
          url: "https://wonderfruit.co/wonderpost/program-passes",
          kind: "organiser",
        },
        s29: {
          label: "Wonderfruit, Wonderpost 'Saturday highlights 2025', 13 Dec 2025",
          url: "https://wonderfruit.co/wonderpost/saturday-highlights-2025",
          kind: "organiser",
        },
        s30: {
          label: "Wonderfruit, Wonderpost re-post of Everfest 'Thailand's celebration of sustainable partying', 15 Jan 2018",
          url: "https://wonderfruit.co/wonderpost/re-post-thailands-celebration-of-sustainable-partying",
          kind: "organiser",
        },
        // Read by the English twin's scout, 24 October 2026 (its round 1).
        s31: {
          label: "Wonderfruit, Directory (2026 programme A–Z, 'FIRST RELEASE'; profiles at /directory/<slug> print day, time and venue)",
          url: "https://wonderfruit.co/directory",
          kind: "organiser",
        },
        s32: {
          label: "GOV.UK, Foreign travel advice: Thailand, entry requirements (updated 12 Oct 2026)",
          url: "https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements",
          kind: "public body",
        },
        s33: {
          label: "GOV.UK, Foreign travel advice: Thailand, warnings and insurance",
          url: "https://www.gov.uk/foreign-travel-advice/thailand/warnings-and-insurance",
          kind: "public body",
        },
        s34: {
          label: "Thailand Digital Arrival Card (TDAC), Immigration Bureau",
          url: "https://tdac.immigration.go.th/arrival-card/",
          kind: "public body",
        },
        s35: {
          label: "Tourism Authority of Thailand, TAT Newsroom, 1 Sep 2026: new 30-day and 15-day visa exemption rules from 15 September",
          url: "https://www.tatnews.org/2026/09/thailand-introduces-new-30-day-and-15-day-visa-exemption-rules-from-15-september/",
          kind: "public body",
        },
      },
      not_found: [
        "Thai body text on the organiser's FAQ answers (/faq?lang=thai: Thai menu, English answers) and on the terms (/terms-and-conditions?lang=thai: English). The ticket page and the programme are in Thai: /tickets?lang=thai prints 'จำกัดการซื้อบัตรได้คนละ 4 ใบเท่านั้น', 'เพิ่มลงตะกร้า', 'ปิดการจำหน่าย' and the Teen line 'ก่อนเข้างานต้องแสดงเอกสารที่ทางราชการออกให้'; /guide-to-wonder?lang=thai prints 'โปรแกรมของเรา' and Thai prose on the Field Village. (Sources s2, s8, s3, s10; read 2026-10-22.)",
        "(removed by the scout's repairs after gate 2, repair 2: Boutique Camping prices are on the page, prices.12)",
        "shuttle pass prices, schedules and pick-up points; parking price (both 'Coming soon')",
        "box office / ticket exchange location and hours (the Directory page was read in the pane on 21 Oct: programme listing and navigation only, nothing on a box office)",
        "past editions' dates and attendance on an organiser HTML page (the Wonder Reports are PDFs over 10 MB); 2025 and 2024 dates here are from media",
        "a Thai spelling of either founder on an organiser page (the organiser names both in English only: s29, s30)",
        "the organiser's stated reason for the one-week shift of the 2026 dates",
        "2027 edition: not announced",
        "Thai forum or Pantip threads (three searches surfaced none); Reddit threads on Wonderfruit (none surfaced)",
        "tier statuses on Ticketmelon (which of 5-Day, Weekend, Sunday, Teen, Dog are on sale or sold out): the page shows no tier list before the November Sale opens, 3 Nov 2026 16:00 BKK; re-read on or after that date",,
        // The English twin's scout, 24 October 2026: promoCode, its repairs' item,
        // cited by key; then its round 1's items this list lacked, a record no copy
        // cites. The four it holds already (the tier list, 9; shuttles, 2; the box
        // office, 3; 2027, 7) are not doubled.
        {
          key: "promoCode",
          text: "No ticket promo code is published. wonderfruit.co/tickets: no 'promo', 'coupon', 'voucher' or 'code' in the page HTML or visible text. Ticketmelon wf26main: a 'Promo Code' box ('Enter promo code', 'Apply'); no code on the page. Its only code line is 'Each waitlist code can purchase a maximum of two (2) September Sale tickets' (already salesPhases.0.waitlistCodeLine). The only public code is Centre Point's room code WDF26 (transport.1), which is not a ticket code.",
          source: ["s2", "s11", "s7"],
          readOn: "2026-10-24",
        },
        "what Camp Wonder, Field.D, Din Daen and Open Fields are, where they happen, and what they cost: names and dates only, no page of their own",
        "the meaning of the asterisk on 'Field.D*' in the FAQ",
        "a full schedule on the Wonder App (the FAQ still promises it 'later in the year'); slots for 26 Directory music acts (Faustus, Markie and the Paradise Bangkok Molam International Band among them)",
        "whether the Google Play 'Wonderfruit' app is the organiser's (developer not checked); not cited",
        "the 30-day rule on a Thai MFA page: thaievisa.go.th/visa/visa-exemption answers 'Visa type not found'; TAT (s35) is the Thai public body read",
        "US and Australian government pages (travel.state.gov is behind a Cloudflare check; smartraveller.gov.au refused curl); s35 covers both nationalities",
        "Reddit thread bodies: reddit.com is blocked in the pane; titles read from Google only, used for questions, never for facts",
        "an English page from the organiser on getting from Bangkok beyond the FAQ's one sentence; no organiser-run Bangkok transfer",
      ],
      salesPhases: {
        scope: "the September, October and November rounds are the general sale rounds: the organiser's release calls 1 September the opening of 'General ticket sales' (s12). Earlier rounds existed.",
        source: "s12",
        readOn: "2026-10-22",
      },
      salesPhases_earlier: {
        note: "Round names only. No organiser or seller page gives a date, a price or a status for any of them; the sheet claims none.",
        rounds: [
          {
            key: "PineappleEyes",
            label: "The Pineapple Eyes",
            what: "the organiser's 'community of our most engaged Wonderers from over the years'; members 'enjoy early access to sales and exclusive launches' (s26, read 2026-10-24); a Ticketmelon ticket group of this name sits in the data of the current event page (s11)",
            dates: "unknown",
            price: "unknown",
            status: "unknown",
            source: ["s26", "s11"],
            readOn: "2026-10-22",
          },
          {
            label: "Pre Sale",
            what: "a Ticketmelon ticket group (s11)",
            dates: "unknown on organiser and seller pages; media only, not printable: InfoQuest (s27, 19 Jun 2026) says Pre-Sale registration 'จะปิดรับลงทะเบียนในวันที่ 21 มิถุนายน 2569 เวลา 16.00 น.'",
            price: "unknown",
            status: "unknown",
            source: ["s11", "s27"],
            readOn: "2026-10-22",
          },
          {
            label: "The Opening Sale",
            what: "a Ticketmelon ticket group (s11)",
            dates: "unknown",
            price: "unknown",
            status: "unknown",
            source: "s11",
            readOn: "2026-10-22",
          },
        ],
      },
    },
    go: {
      official: {
        url: "https://wonderfruit.co/?lang=thai",
        source: "s24",
        kind: "organiser",
        title: "wonderfruit.co",
      },
      tickets: {
        url: "https://wonderfruit.co/tickets?lang=thai",
        source: "s2",
        kind: "organiser",
        title: "หน้า Tickets บน wonderfruit.co (มีภาษาไทย)",
      },
      ticketmelon: {
        url: "https://www.ticketmelon.com/wonderfruit/wf26main",
        source: "s11",
        kind: "seller",
        title: "หน้าขายบัตร Wonderfruit 2026 บน ticketmelon.com",
        titles: { en: "The Wonderfruit 2026 sale page on ticketmelon.com" },
      },
      faq: {
        url: "https://wonderfruit.co/faq",
        source: "s3",
        kind: "organiser",
        title: "หน้า FAQ บน wonderfruit.co",
        titles: { en: "The organiser's FAQ on wonderfruit.co" },
      },
      hotels: {
        url: "https://wonderfruit.co/hotels",
        source: "s7",
        kind: "organiser",
        title: "หน้า Hotels & Travel บน wonderfruit.co",
        titles: { en: "Partner hotels and shuttles, on the organiser's Hotels & Travel page" },
      },
      venue: {
        url: "https://wonderfruit.co/venues",
        source: "s9",
        kind: "organiser",
        title: "หน้า Venues บน wonderfruit.co",
        titles: { en: "The festival's 26 named venues, on wonderfruit.co" },
      },
      map: {
        url: "https://www.google.com/maps/search/?api=1&query=12.9027695,100.9998528",
        source: "venue.coordsNote",
        kind: "maps",
        title: "หมุดตามพิกัดจากหน้า FAQ ของผู้จัด บน Google Maps (ไม่มีชื่อสถานที่)",
        titles: { en: "The spot the organiser's FAQ links to, in Google Maps: it opens as an unnamed pin" },
      },
      programme: {
        url: "https://wonderfruit.co/guide-to-wonder?lang=thai",
        source: "s8",
        kind: "organiser",
        title: "หน้า Guide to Wonder บน wonderfruit.co (มีภาษาไทย)",
      },
      "general-camping": {
        url: "https://wonderfruit.co/general-camping",
        source: "s4",
        kind: "organiser",
        title: "หน้า General Camping บน wonderfruit.co",
        titles: { en: "General Camping on wonderfruit.co: rules, check-in and price" },
      },
      "boutique-camping": {
        url: "https://wonderfruit.co/boutique-camping",
        source: "s5",
        kind: "organiser",
        title: "หน้า Boutique Camping บน wonderfruit.co",
        titles: { en: "Boutique Camping pavilions on wonderfruit.co" },
      },
      "slow-wonder": {
        url: "https://wonderfruit.co/slow-wonder",
        source: "s6",
        kind: "organiser",
        title: "หน้า Slow Wonder บน wonderfruit.co",
        titles: { en: "Slow Wonder cabins on wonderfruit.co" },
      },
      "intro-pass": {
        url: "https://wonderfruit.co/applications/intro-pass",
        source: "s2",
        kind: "organiser",
        title: "หน้าสมัคร Intro Pass บน wonderfruit.co",
        titles: { en: "The Intro Pass application form on wonderfruit.co" },
      },
      "youth-pass": {
        url: "https://wonderfruit.co/applications/youth-pass",
        source: "s2",
        kind: "organiser",
        title: "หน้าสมัคร Youth Pass บน wonderfruit.co",
        titles: { en: "The Youth Pass application form on wonderfruit.co" },
      },
      utapao: {
        url: "https://www.utapao.com/",
        source: "s16",
        kind: "public-body",
        title: "เว็บไซต์ท่าอากาศยานนานาชาติอู่ตะเภา (utapao.com)",
        titles: { en: "U-Tapao Rayong-Pattaya International Airport, official site" },
      },
      kyoto: {
        url: "https://chapterskyoto.co/",
        source: "s22",
        kind: "organiser",
        title: "chapterskyoto.co",
        titles: { en: "chapterskyoto.co, the Kyoto gathering's own site" },
      },
      // Linked by both guides, the Thai one first (T3): a Thai title, in the th-TH
      // reader's wording, and the English one beside it.
      directory: {
        url: "https://wonderfruit.co/directory",
        source: "s31",
        kind: "organiser",
        title: "หน้า Directory บน wonderfruit.co: รายชื่อศิลปินปี 2026 เรียงตามตัวอักษร ส่วนใหญ่มีวันและเวลาแสดงแล้ว",
        titles: { en: "The organiser's A–Z of 2026 acts, most with a day and a time" },
      },
      // Linked by the English twin only, so their title is the English one
      // (GoTarget.titleLang); official, tickets and programme open the organiser's
      // Thai pages, so the twin has its own three.
      "official-en": {
        url: "https://wonderfruit.co/",
        source: "s1",
        kind: "organiser",
        title: "wonderfruit.co, the organiser's site in English",
      },
      "tickets-en": {
        url: "https://wonderfruit.co/tickets",
        source: "s2",
        kind: "organiser",
        title: "Every Wonderfruit pass, its price and how to buy it, on wonderfruit.co",
      },
      "programme-en": {
        url: "https://wonderfruit.co/guide-to-wonder",
        source: "s8",
        kind: "organiser",
        title: "Guide to Wonder: the organiser's programme for 2026",
      },
      "gov-uk": {
        url: "https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements",
        source: "s32",
        kind: "public-body",
        title: "GOV.UK foreign travel advice for Thailand: entry requirements",
      },
      tdac: {
        url: "https://tdac.immigration.go.th/arrival-card/",
        source: "s34",
        kind: "public-body",
        title: "Thailand Digital Arrival Card, the Immigration Bureau's own site",
      },
      "tat-visa": {
        url: "https://www.tatnews.org/2026/09/thailand-introduces-new-30-day-and-15-day-visa-exemption-rules-from-15-september/",
        source: "s35",
        kind: "public-body",
        title: "TAT Newsroom, 1 September 2026: the 30-day visa exemption from 15 September",
      },
    },
  },
];

// The main page's meta description, which is also the guide's line on the
// hub: one string, so the two cannot drift apart.
const mainDescription = "Wonderfruit 2026 จัด 3–7 ธ.ค. ที่ The Fields at Siam Country Club พัทยา ชลบุรี เทศกาลดนตรี ศิลปะ และอาหารครั้งที่ 11 ราคาบัตร รอบขาย ไลน์อัพ เวลาเปิดประตู";

export const guides: Guide[] = [
  {
    slug: "th-TH",
    createdAt: "2026-10-22T21:05:00+04:00",
    updatedAt: "2026-10-24T10:49:00+04:00",
    event: "wonderfruit",
    // The event as the hub and the trail name it, with its year.
    name: "Wonderfruit 2026",
    lang: "th-TH",
    dir: "ltr",
    path: "/wonderfruit/",
    cover: "/covers/wonderfruit.jpg",
    hubLabel: "ภาษาไทย",
    hubBlurb: mainDescription,
    // The figures in baht come off on 2 December 2026, six weeks after the
    // oldest price reading (24 October), the day before the gates open; the
    // lines that call The November Sale the next round, on 10 November, the
    // day after it ends.
    expires: { prices: "2026-12-02", nov: "2026-11-10" },
    footerNote: "คู่มือเทศกาล Wonderfruit 2026 ภาษาไทยบน fest.one · ข้อมูลทุกข้ออ่านจากหน้าของผู้จัด ผู้ขาย และแหล่งที่ระบุชื่อไว้ในหน้านี้ ตามวันที่กำกับไว้ข้างข้อนั้น",
    // After the hub's link: the organiser's site and the seller, through
    // their hops, nofollow as every hop is (the CTO's gate-3 item 3).
    footerLinks: [
      { href: "/go/wonderfruit-official/", label: "เว็บไซต์ผู้จัด Wonderfruit", title: "wonderfruit.co", rel: "nofollow" },
      { href: "/go/wonderfruit-ticketmelon/", label: "Ticketmelon", title: "หน้าขายบัตร Wonderfruit 2026 บน ticketmelon.com", rel: "nofollow" },
    ],
    pages: [
      {
        slug: "wonderfruit",
        createdAt: "2026-10-22T21:05:00+04:00",
        updatedAt: "2026-10-24T10:49:00+04:00",
        kind: "main",
        label: "ภาพรวม",
        crumb: "Wonderfruit 2026",
        navTitle: "วันจัดงาน ราคาบัตร ไลน์อัพ และสถานที่ของ Wonderfruit 2026",
        linkTitle: "ภาพรวม Wonderfruit 2026: วันจัดงาน ราคาบัตร ไลน์อัพ",
        title: "Wonderfruit 2026: วันจัดงาน ราคาบัตร ไลน์อัพ — คู่มือเทศกาล",
        description: mainDescription,
        h1: "Wonderfruit 2026",
        lede: "Wonderfruit 2026 จัดวันพฤหัสบดีที่ 3 ถึงวันจันทร์ที่ 7 ธันวาคม 2026 (พ.ศ. 2569) ที่ The Fields at Siam Country Club พัทยา จังหวัดชลบุรี [editions.0.start] [editions.0.end] [venue.name] [venue.city] [venue.province] นี่คือครั้งที่ 11 ของเทศกาลดนตรี ศิลปะ และอาหารที่จัดโดย Scratch First Co., Ltd. ในธีม Field Village [event.edition] [event.kind] [event.organiser] [event.theme]\n\nผู้จัดระบุบนหน้าขายของ Ticketmelon ว่า Ticketmelon เป็นแพลตฟอร์มจำหน่ายบัตรอย่างเป็นทางการเพียงรายเดียวของ Wonderfruit 2026 [sellers.1] [sellers.1.note] {{until nov}}และ ณ วันที่ 24 ตุลาคม 2026 รอบขายออนไลน์รอบต่อไปคือ The November Sale วันอังคารที่ 3 ถึงวันจันทร์ที่ 9 พฤศจิกายน 2026 เปิดขายเวลา 16:00 น. [editions.0.salesPhases.2]{{/until}} {{until nov}}ราคาในรอบนั้นตามหน้าบัตรของผู้จัด อ่านเมื่อ 24 ตุลาคม 2026 คือ 5-Day Full Pass (บัตร 5 วัน) 12,900 บาท และ Weekend Pass (บัตรเสาร์ถึงจันทร์) 11,500 บาท [prices.0] [prices.2] ยังไม่รวม VAT 7% และค่าธรรมเนียมการทำรายการ ตามหน้าขายของ Ticketmelon [purchaseRules.vat]{{/until}} {{until prices}}หลังรอบนี้ผู้จัดระบุว่ามีบัตรหน้างานตามจำนวนที่เหลือ Full Pass 20,000 บาท และ Weekend Pass 15,000 บาท ตามหน้าบัตรของผู้จัด อ่านเมื่อ 24 ตุลาคม 2026 [prices.1] [prices.3] [editions.0.salesPhases.3]{{/until}}\n\nคำตอบในคำถามที่พบบ่อยและเงื่อนไขการซื้อบัตรบนเว็บไซต์ของผู้จัดเป็นภาษาอังกฤษแม้กดสลับเป็นภาษาไทยแล้ว (อ่านเมื่อ 24 ตุลาคม 2026) คู่มือนี้จึงตอบเป็นภาษาไทย โดยวางลิงก์ไปหน้าต้นทางของผู้จัดกำกับไว้ทุกข้อ [not_found.0]",
        ledeParas: 2,
        cta: {
          href: "/go/wonderfruit-ticketmelon/",
          label: "ไปที่หน้าบัตรของ Ticketmelon",
          title: "หน้าขายบัตร Wonderfruit 2026 บน ticketmelon.com",
          secondary: {
            href: "/go/wonderfruit-tickets/",
            label: "หน้าบัตรบนเว็บไซต์ผู้จัด",
            title: "หน้า Tickets บน wonderfruit.co (มีภาษาไทย)",
          },
        },
        glance: [
          {
            label: "วันที่",
            value: "3–\u20607\u00a0ธันวาคม\u00a02026 [editions.0.start] [editions.0.end]",
          },
          {
            label: "สถานที่",
            value: "The Fields at Siam Country Club [venue.name]",
          },
          {
            label: "เมือง",
            value: "พัทยา จังหวัดชลบุรี [venue.city] [venue.province]",
          },
          {
            label: "ผู้ขายบัตร",
            value: "Ticketmelon [sellers.1]",
          },
          {
            label: "ตรวจสอบเมื่อ",
            value: "21–\u206024\u00a0ตุลาคม\u00a02026",
          },
        ],
        jumps: [
          {
            id: "about",
            label: "Wonderfruit คืออะไร",
          },
          {
            id: "buy",
            label: "ซื้อบัตรที่ไหน",
          },
          {
            id: "dates",
            label: "วันจัดงานและเวลาเปิดประตู",
          },
          {
            id: "lineup",
            label: "ไลน์อัพ",
          },
          {
            id: "editions",
            label: "ครั้งก่อน ๆ และ Wonderfruit 2027",
          },
          {
            id: "venue",
            label: "สถานที่",
          },
          {
            id: "more-questions",
            label: "คำถามอื่นที่คนถามบ่อย",
          },
        ],
        sections: [
          {
            id: "about",
            heading: "Wonderfruit คืออะไร ใครจัด และเป็นของใคร",
            body: "Wonderfruit เป็นเทศกาลดนตรี ศิลปะ และอาหารที่จัดกลางทุ่ง The Fields ปีละครั้งในเดือนธันวาคม [event.kind] [venue.name] [editions.1] [editions.2] [editions.3] ผู้จัดระบุว่าในพื้นที่งานมีเวทีและโซนที่ตั้งชื่อไว้ 26 แห่ง เช่น The Quarry, Forbidden Fruit, Forest Stage, Creature Stage, Solar Village, Molam World, Living Village, Enfold, Wonderness, Baan Bardo, Jungle House, Bath House และ Little Wonder [venue.stages] และมีโปรแกรมตลอด 24 ชั่วโมงทุกวัน ไม่ใช่ทุกเวทีพร้อมกัน แต่ผู้จัดบอกว่ามีอะไรให้ดูอยู่ที่ไหนสักแห่งเสมอ [lineup.announcedNote] บริษัทผู้จัดคือ Scratch First Co., Ltd. ตามเงื่อนไขการซื้อบัตรของผู้จัดและหน้าขายของ Ticketmelon [event.organiser] [sellers.1] ผู้ก่อตั้งคือ พีท ประณิธาน พรประภา และผู้ร่วมก่อตั้งคือ เจ มณฑล จิรา นักดนตรีชาวไทย ตามที่เว็บไซต์ของผู้จัดเขียนไว้ใน Wonderpost [people.0] [people.1]\n\nผู้จัดเขียนถึงพื้นที่ The Fields ในหน้า Decade of Wonder ว่า \"Since 2014\" ส่วน Time Out Asia ระบุว่าเทศกาลครั้งแรกจัดเมื่อเดือนธันวาคม 2014 [editions.4] นอกจากงานหลักยังมี Wonderfruit Chapters Kyoto ซึ่งเป็นงานแยกของ Wonderfruit ที่จัดที่เกียวโตในเดือนตุลาคม 2026 และคำถามที่พบบ่อยของผู้จัดยืนยันว่างานหลักยังอยู่ที่ชลบุรี [sideEvents.0] [เว็บไซต์ Wonderfruit Chapters Kyoto](/go/wonderfruit-kyoto/)",
          },
          {
            id: "buy",
            heading: "บัตร Wonderfruit 2026: ซื้อที่ไหน",
            cta: true,
            body: "ผู้ขายบัตร: Ticketmelon ชำระเงินบนเว็บไซต์ของ Ticketmelon [sellers.1] คู่มือนี้ไม่ได้เป็นของผู้จัดและไม่ได้ขายบัตร\n\nจุดเริ่มคือหน้า Tickets บนเว็บไซต์ของผู้จัด ซึ่งมีภาษาไทย บัตรที่กดจะเข้าตะกร้าของผู้จัดเองก่อน แล้วส่งต่อไปชำระเงินที่ ticketmelon.com [sellers.0] ผู้จัดเรียก The November Sale ว่ารอบขายออนไลน์รอบสุดท้าย จำนวนจำกัด ใครมาก่อนได้ก่อน และปิดรับลงชื่อรอซื้อ (waitlist) วันจันทร์ที่ 2 พฤศจิกายน [editions.0.salesPhases.2] รอบทั่วไปเดือนกันยายนและตุลาคมปิดการจำหน่ายแล้ว ณ วันที่ 24 ตุลาคม [editions.0.salesPhases.0] [editions.0.salesPhases.1] ราคาบัตรทุกประเภท ทั้ง Sunday Pass บัตรวัยรุ่น บัตรสำหรับสุนัข ส่วนลดครอบครัว บัตรที่ต้องสมัครก่อน รวมถึงกติกาการซื้อ อยู่ที่หน้า [บัตร Wonderfruit 2026](/wonderfruit/tickets/)",
          },
          {
            id: "dates",
            heading: "วันจัดงานและเวลาเปิดประตู",
            body: "งานกินเวลาห้าวัน จากบ่ายวันพฤหัสบดีถึงเช้าวันจันทร์ (3–7 ธันวาคม) หน้าขายของ Ticketmelon เขียนช่วงเวลาไว้ว่า 3 ธันวาคม 2026 เวลา 16:00 น. ถึง 7 ธันวาคม 2026 เวลา 12:00 น. [editions.0.sellerEventLine]\n\n- วันพฤหัสบดีที่ 3 ธันวาคม: ประตูเปิด 16:00 น. เข้างานได้ถึง 24:00 น. {{read}} [editions.0.hours.0]\n- วันศุกร์ที่ 4 ถึงวันอาทิตย์ที่ 6 ธันวาคม: ประตูเปิด 08:00 น. เข้างานได้ถึง 24:00 น. {{read}} [editions.0.hours.1] [editions.0.hours.2] [editions.0.hours.3]\n- วันจันทร์ที่ 7 ธันวาคม: เช้าวันสุดท้าย ผู้ถือ Sunday Pass อยู่ได้ถึงพระอาทิตย์ขึ้น พื้นที่กางเต็นท์และบ้านพักเช็กเอาต์ 12:00 น. {{read}} [editions.0.hours.4]\n\nระหว่างเที่ยงคืนถึง 08:00 น. ประตูปิดไม่ให้กลับเข้า ข้อนี้สำคัญเป็นพิเศษในคืนสุดท้าย ถ้าคุณออกจากงานหลังเที่ยงคืนของคืนวันอาทิตย์ที่ 6 จะกลับเข้าในวันจันทร์ที่ 7 ไม่ได้อีก [editions.0.hoursNote] ผู้จัดระบุด้วยว่าเวลาเหล่านี้อาจเปลี่ยนแปลงได้ {{read}} [editions.0.hoursNote]",
          },
          {
            id: "lineup",
            heading: "ไลน์อัพ Wonderfruit 2026 (ทยอยประกาศตั้งแต่ 1 กันยายน 2026)",
            body: "รายชื่อชุดแรกออกมาในแถลงข่าวของผู้จัดวันที่ 1 กันยายน 2026 และหน้าโปรแกรม Guide to Wonder ของผู้จัดยังเขียนกำกับว่า \"AND MORE TO COME\" ตารางเวลาเต็มจะออกภายหลังบน Wonder App ตามคำถามที่พบบ่อยของผู้จัด [lineup.announcedOn] [lineup.announcedNote] แต่ตารางเวลาชุดแรกออกแล้ว หน้า Directory ของผู้จัดซึ่งขึ้นหัวว่า \"FIRST RELEASE\" มีศิลปินดนตรี 136 ราย ในจำนวนนี้ 110 รายมีวันและเวลาแสดงแล้ว อ่านเมื่อ 24 ตุลาคม 2026 [lineup.directory] [lineup.directory.counts] [lineup.announcedNote.schedule] ชื่อที่ประกาศในแถลงข่าว ตามลำดับ: Tangerine Dream, Eli Keszler, Orphx, ITSU & ARS, Jesse You, JakoJako, Loyboy, Gerd Janson, Hamdi Ryder, Omoloko, ffan, Faustus, Nubya Garcia, Jane Fitz, Nicolas Lutz, Sweely, DOTT, Shanka Tribe, DJ Python, Genderfunk และ The Paradise Bangkok Molam International Band [lineup.acts] [lineup.actsForms] ใน Directory ยังมีชื่อที่ไม่อยู่ในแถลงข่าว เช่น Nightmares on Wax, Marcel Dettmann, Mano Le Tough, Jim O'Rourke & Eiko Ishibashi, Phum Viphurit, Kuniyuki (Live) และ Howie Lee [lineup.directory] [หน้า Directory ของผู้จัด](/go/wonderfruit-directory/)\n\nสายดนตรีรากเหง้าและหมอลำ (Root Music): Sansae, Thee Marloes, Jarb Cat, Ghetto All Stars, Toomturn Molam Group, Sombat Simla, MAKARA, Rattanakosin Breakin' Crew, Khontan & The Hymmapan Express และ Chamroen Bang Fai Bolan [lineup.rootMusic] เวที Solar Village: Jason Kendig, Alex Albrecht, Markie, Pam Anantr, AWARË, Salin และ Carps [lineup.solarVillage] โปรแกรมพิเศษที่ประกาศแล้วมี From Sound to Screen ซึ่งฉายหนังของ Nick Dwyer พร้อมดนตรีสดสามค่ำคืน Sonic Minds โดย MSCTY_Studio กับ May-T, Sunju Hargun และ Quantum Aria (Carl Stone กับ Akaihirume) โซนหมอลำอีสาน Molam World และธีมสุขภาพกายใจ \"Rooted in the Inner Axis\" [lineup.programmes] ณ วันที่ 24 ตุลาคม 2026 ยังมี Rituals & Ceremonies ซึ่งรวมถึง Dhyana ที่ Black Turtle เป็นผู้คัดสรร [lineup.programmesMore.0] นอกจากนี้ยังมีครัว Open Kitchen กับโต๊ะเชฟของ Wonder Kitchen งานศิลปะจัดวางที่ประกาศชื่อแล้ว 15 ชิ้น และ Unconditional Space ในหัวข้อ \"Tropicality: New Beginnings\" [lineup.programmesMore] [หน้าโปรแกรมของผู้จัด (มีภาษาไทย)](/go/wonderfruit-programme/)",
          },
          {
            id: "editions",
            heading: "ครั้งก่อน ๆ และ Wonderfruit 2027",
            body: "ปีนี้งานขยับมาเร็วกว่าปีก่อน ๆ หนึ่งสัปดาห์ โดยหน้าเว็บของผู้จัดไม่ได้บอกเหตุผล [editions.0.note] [not_found.6] ปี 2025 ครั้งที่ 10 จัดวันที่ 11–15 ธันวาคม ตามรายงานของ Time Out Bangkok [editions.1] ปี 2024 ครั้งที่ 9 จัดวันที่ 12–16 ธันวาคม ตามรายงานของ The Standard [editions.2] และปี 2023 จัดวันที่ 14–18 ธันวาคม ตามโพสต์เรื่องที่พักของผู้จัดเอง ซึ่งระบุเช็กอิน 14 ธันวาคม และเช็กเอาต์ 18 ธันวาคม [editions.3] ทั้งสามครั้งเริ่มวันพฤหัสบดี จบวันจันทร์ และจัดที่เดิมเหมือนปีนี้ [editions.1] [editions.2] [editions.3] ส่วน Wonderfruit 2027 ผู้จัดยังไม่ประกาศ [questions.8]",
          },
          {
            id: "venue",
            heading: "สถานที่: The Fields at Siam Country Club พัทยา",
            body: "ผู้จัดเขียนที่อยู่ไว้สั้น ๆ ว่า The Fields at Siam Country Club, Chonburi, Thailand [venue.address] The Fields เป็นพื้นที่ของ Siam Country Club (สยามคันทรีคลับ) ที่พัทยา จังหวัดชลบุรี [venue.name] [venue.nameThai] [venue.city] [venue.province] คำถามที่พบบ่อยของผู้จัดลิงก์ไปยังจุด \"Wonderfruit\" บน Google Maps ที่พิกัด 12.9027695, 100.9998528 [venue.lat] [venue.lon] [venue.coordsNote] [เปิดในแผนที่](/go/wonderfruit-map/) [หน้าเวทีและโซนของผู้จัด](/go/wonderfruit-venue/) ที่พักในพื้นที่งาน โรงแรมพาร์ตเนอร์ และเส้นทางจากกรุงเทพฯ และพัทยา อยู่ที่หน้า [ที่พักและการเดินทาง](/wonderfruit/stay/)",
          },
          {
            id: "more-questions",
            heading: "คำถามอื่นที่คนถามบ่อย",
            body: "เรื่องเด็กและเกณฑ์อายุ เอกสารที่ผู้จัดขอดูตอนเข้างาน การพาสุนัขเข้างาน การจ่ายเงินในงานแบบไม่ใช้เงินสด อาหารและเครื่องดื่มจากข้างนอก สัญญาณมือถือ การคืนเงิน Wonderfruit Chapters Kyoto และวิธีติดต่อผู้จัด ตอบไว้ทีละข้อพร้อมหน้าต้นทางที่ [คำถามที่พบบ่อย Wonderfruit 2026](/wonderfruit/faq/)",
          },
        ],
        faq: [],
        sourcesHeading: "แหล่งที่มา",
        sources: "- Wonderfruit เว็บไซต์ผู้จัด: [หน้าหลัก](/go/wonderfruit-official/), [หน้าบัตร](/go/wonderfruit-tickets/), [คำถามที่พบบ่อย](/go/wonderfruit-faq/), [หน้าเวทีและโซน](/go/wonderfruit-venue/), [โปรแกรม Guide to Wonder](/go/wonderfruit-programme/), เงื่อนไขการซื้อบัตร, หน้า Decade of Wonder, Wonderpost, [Wonderfruit Chapters Kyoto](/go/wonderfruit-kyoto/) — อ่านเมื่อ 21–24 ตุลาคม 2026\n- [Ticketmelon หน้าขาย Wonderfruit 2026 – The November Sale](/go/wonderfruit-ticketmelon/) — อ่านเมื่อ 21–24 ตุลาคม 2026\n- แถลงข่าวของผู้จัด 1 กันยายน 2026\n- Time Out Bangkok 29 พฤษภาคม 2025, Time Out Asia 9 มีนาคม 2026, The Standard 25 ธันวาคม 2024, Tatler Asia 9 ธันวาคม 2025 — อ่านเมื่อ 21–22 ตุลาคม 2026",
      },
      {
        slug: "wonderfruit/tickets",
        createdAt: "2026-10-22T21:05:00+04:00",
        updatedAt: "2026-10-24T09:53:00+04:00",
        kind: "tickets",
        label: "บัตร",
        navTitle: "ราคาบัตรทุกประเภทและรอบขายของ Wonderfruit 2026",
        title: "บัตร Wonderfruit 2026: ราคา รอบขาย วิธีซื้อ — คู่มือเทศกาล",
        description: "บัตร Wonderfruit 2026: ราคา Full Pass, Weekend Pass และบัตรอื่นทุกรอบขายทั่วไปจนถึงหน้างาน ซื้อผ่าน Ticketmelon คืนเงินไม่ได้ คู่มือเทศกาล",
        h1: "บัตร Wonderfruit 2026",
        lede: "บัตร Wonderfruit 2026 (3–7 ธันวาคม ที่ The Fields at Siam Country Club พัทยา) ชำระเงินที่ Ticketmelon ซึ่งผู้จัดระบุบนหน้าขายว่าเป็นแพลตฟอร์มจำหน่ายบัตรอย่างเป็นทางการเพียงรายเดียวของงาน [editions.0.start] [editions.0.end] [venue.name] [sellers.1] {{until nov}}และ ณ วันที่ 24 ตุลาคม 2026 รอบขายออนไลน์รอบต่อไปคือ The November Sale วันอังคารที่ 3 ถึงวันจันทร์ที่ 9 พฤศจิกายน 2026 เปิดขายเวลา 16:00 น. [editions.0.salesPhases.2]{{/until}} ตัวเลขในหน้านี้มาจากหน้าบัตรของผู้จัด (อ่านเมื่อ 24 ตุลาคม 2026) คำถามที่พบบ่อยของผู้จัด แถลงข่าวของผู้จัดวันที่ 1 กันยายน 2026 และโพสต์ Program Passes ของผู้จัด โดยแต่ละตัวเลขบอกไว้ว่ามาจากหน้าไหน [sources.s2] [sources.s3] [sources.s12] [sources.s28] ทุกตัวเลขยังไม่รวม VAT 7% และค่าธรรมเนียมการทำรายการ ซึ่งหน้าขายของ Ticketmelon ระบุไว้โดยไม่บอกจำนวนค่าธรรมเนียม หน้านี้จึงไม่คำนวณยอดรวมให้ [purchaseRules.vat] บัตรแบบเดียวกันนี้ขายมาแล้วสองรอบทั่วไปในราคาที่ถูกกว่า และราคาหน้างานที่ผู้จัดแจ้งไว้สูงกว่ารอบพฤศจิกายนอีกหลายพันบาท [editions.0.salesPhases.0] [editions.0.salesPhases.1] [editions.0.salesPhases.3]",
        cta: {
          href: "/go/wonderfruit-ticketmelon/",
          label: "ไปที่หน้าบัตรของ Ticketmelon",
          title: "หน้าขายบัตร Wonderfruit 2026 บน ticketmelon.com",
          secondary: {
            href: "/go/wonderfruit-tickets/",
            label: "หน้าบัตรบนเว็บไซต์ผู้จัด",
            title: "หน้า Tickets บน wonderfruit.co (มีภาษาไทย)",
          },
        },
        jumps: [
          {
            id: "rounds",
            label: "รอบขายทั่วไป",
          },
          {
            id: "prices",
            label: "ราคาบัตรแต่ละประเภท",
          },
          {
            id: "applications",
            label: "Intro Pass และ Youth Pass",
          },
          {
            id: "rules",
            label: "กติกาที่ควรรู้ก่อนกดซื้อ",
          },
          {
            id: "where-to-buy",
            label: "ซื้อบัตรที่ไหน",
          },
        ],
        sections: [
          {
            id: "rounds",
            heading: "รอบขายทั่วไปของ Wonderfruit 2026 ตามหน้าบัตรของผู้จัด",
            body: "แถลงข่าวของผู้จัดเรียกวันที่ 1 กันยายน 2026 ว่าเป็นวันเปิดขายบัตรรอบทั่วไป [salesPhases.scope] นอกจากรอบทั่วไป ผู้จัดให้สมาชิกชุมชน The Pineapple Eyes ได้สิทธิ์ซื้อก่อน และหน้าของ Ticketmelon ยังมีรอบชื่อ Pre Sale กับ The Opening Sale ซึ่งหน้าของผู้จัดและของผู้ขายไม่ได้ระบุวันหรือราคาไว้ [salesPhases_earlier] รอบที่หน้าบัตรของผู้จัดแสดงมีสี่รอบ:\n\n1. **September Sale** วันอังคารที่ 1 ถึงวันจันทร์ที่ 7 กันยายน 2026 เปิด 16:00 น. {{until prices}}Full Pass 10,900 บาท Weekend Pass 9,500 บาท ตามแถลงข่าวของผู้จัดวันที่ 1 กันยายน 2026 —{{/until}} หน้าบัตรของผู้จัดขึ้นว่า \"ปิดการจำหน่าย\" (Sold Out) อ่านเมื่อ 24 ตุลาคม [editions.0.salesPhases.0] [sources.s12] [sources.s2]\n2. **October Sale** วันพฤหัสบดีที่ 1 ถึงวันพุธที่ 7 ตุลาคม 2026 {{until prices}}Full Pass 11,900 บาท Weekend Pass 10,500 บาท ตามคำถามที่พบบ่อยของผู้จัด —{{/until}} หน้าบัตรของผู้จัดขึ้นว่า \"ปิดการจำหน่าย\" อ่านเมื่อ 24 ตุลาคม [editions.0.salesPhases.1] [sources.s3] [sources.s2]\n3. **The November Sale** วันอังคารที่ 3 ถึงวันจันทร์ที่ 9 พฤศจิกายน 2026 เปิด 16:00 น. {{until prices}}Full Pass 12,900 บาท Weekend Pass 11,500 บาท ตามหน้าบัตรของผู้จัด{{/until}} {{until nov}}— ยังไม่เปิด ณ วันที่ 24 ตุลาคม ปิดรับลงชื่อรอซื้อ (waitlist) วันจันทร์ที่ 2 พฤศจิกายน{{/until}} ผู้จัดเรียกรอบนี้ว่ารอบขายออนไลน์รอบสุดท้าย จำนวนจำกัด ใครมาก่อนได้ก่อน และ Ticketmelon ระบุว่าการขายจะปิดเมื่อเต็มจำนวน [editions.0.salesPhases.2] [sellers.1]\n4. **หน้างาน** {{until prices}}Full Pass 20,000 บาท Weekend Pass 15,000 บาท ตามหน้าบัตรของผู้จัด อ่านเมื่อ 24 ตุลาคม —{{/until}} ผู้จัดระบุว่าขายหลัง The November Sale และขึ้นอยู่กับจำนวนที่เหลือ ไม่มีข้อมูลจุดขายหรือเวลาเปิดของจุดขายหน้างานบนหน้าของผู้จัด [editions.0.salesPhases.3] [not_found.3]\n\nหน้าขายของ Ticketmelon ไม่แสดงรายการบัตรหรือสถานะของบัตรแต่ละประเภท ทั้งเมื่ออ่านวันที่ 21, 22 และ 24 ตุลาคม หน้านี้จึงไม่ได้บอกว่าบัตรประเภทไหนยังมีหรือหมด [not_found.9]",
          },
          {
            id: "prices",
            heading: "ราคาบัตรแต่ละประเภท",
            body: "{{until prices}}ทุกราคาด้านล่างมาจากหน้าบัตรของผู้จัด อ่านเมื่อ 24 ตุลาคม 2026 [sources.s2]{{/until}}\n\n- {{until prices}}**5-Day Full Pass** บัตร 5 วัน เข้าได้ตั้งแต่ 3 ถึง 7 ธันวาคม: 12,900 บาท ในรอบ The November Sale หน้างาน 20,000 บาท {{read}} [prices.0] [prices.1]{{/until}}\n- {{until prices}}**Weekend Pass** บัตรสุดสัปดาห์ วันเสาร์ที่ 5 ถึงวันจันทร์ที่ 7 ธันวาคม เข้าได้ตั้งแต่ 08:00 น. วันเสาร์: 11,500 บาท ในรอบ The November Sale หน้างาน 15,000 บาท Ticketmelon ระบุว่าบัตรประเภทนี้มีจำนวนจำกัด {{read}} [prices.2] [prices.3] [sellers.1]{{/until}}\n- {{until prices}}**Sunday Pass** บัตรวันอาทิตย์ เข้าได้ตั้งแต่ 08:00 น. วันอาทิตย์ที่ 6 ธันวาคม ถึงพระอาทิตย์ขึ้นวันจันทร์: 5,000 บาท บัตรหน้างาน 6,500 บาท {{read}} [prices.4]{{/until}}\n- {{until prices}}**Teen Pass** บัตรวัยรุ่นอายุ 13–19 ปี 5 วัน: 4,500 บาท บัตรหน้างาน 5,000 บาท {{read}} [prices.5]{{/until}}\n- {{until prices}}**Dog Pass** บัตรสำหรับสุนัข 5 วัน เจ้าของต้องมีบัตรเข้างานของตัวเอง: 1,000 บาท บัตรหน้างาน 1,500 บาท {{read}} [prices.6]{{/until}}\n- **Family Pass** ผู้ใหญ่ 1–2 คน กับเด็กหรือวัยรุ่น 1–4 คน: ลด 5% จากบัตรที่มีราคาทุกใบในชุด ไม่ต้องสมัคร {{read}} [prices.9] เด็กอายุ 12 ปีลงมาเข้าฟรีและไม่ต้องจองบัตรล่วงหน้า ตามคำถามที่พบบ่อยของผู้จัด [age.organiser]\n\n{{until prices}}ราคาที่เขียนเป็นคู่ของ Sunday Pass บัตรวัยรุ่น และบัตรสำหรับสุนัข คือราคาแรก และราคาบัตรหน้างาน ตามที่หน้าบัตรภาษาไทยของผู้จัดแสดงไว้ หน้าของผู้จัดไม่ได้ระบุว่าราคาแรกผูกกับรอบขายรอบไหน {{read}} [prices.4] [prices.5] [prices.6]{{/until}} ที่พักในพื้นที่งาน ทั้ง General Camping, Boutique Camping และบ้านพัก Slow Wonder ขายแยกจากบัตรเข้างาน ตามคำตอบในคำถามที่พบบ่อยของผู้จัด และอยู่ที่หน้า [ที่พักและการเดินทาง](/wonderfruit/stay/) [practical.6]",
          },
          {
            id: "applications",
            heading: "บัตรที่ต้องสมัครก่อน: Intro Pass และ Youth Pass",
            body: "ถ้าคุณอายุ 20 ปีขึ้นไปและยังไม่เคยไป Wonderfruit ผู้จัดเปิดให้สมัคร **Intro Pass** {{until prices}}ราคา 4,500 บาท ก่อนค่าธรรมเนียมและ VAT 7% ตามโพสต์ Program Passes ของผู้จัด{{/until}} เข้างานได้หนึ่งครั้งเป็นเวลา 24 ชั่วโมง เลือกได้ระหว่างวันพฤหัสบดีถึงวันอาทิตย์ ออกจากงานแล้วกลับเข้าไม่ได้ [prices.7] [sources.s28] ส่วน **Youth Pass** สำหรับอายุ 20–24 ปี เป็นบัตร 5 วัน{{until prices}}ราคา 3,900 บาท ก่อนค่าธรรมเนียมและ VAT 7%{{/until}} [prices.8] [sources.s28] ทั้งสองแบบไม่ได้กดซื้อจากตะกร้า แต่ปุ่มบนหน้าบัตรขึ้นว่า Apply และพาไปหน้าใบสมัครบนเว็บไซต์ของผู้จัด {{read}} [sellers.0] [prices.7] [prices.8] เอกสารที่ผู้จัดกำหนดสำหรับบัตรสองแบบนี้อยู่ที่ [คำถามที่พบบ่อย](/wonderfruit/faq/) [สมัคร Intro Pass](/go/wonderfruit-intro-pass/) [สมัคร Youth Pass](/go/wonderfruit-youth-pass/)",
          },
          {
            id: "rules",
            heading: "กติกาที่ควรรู้ก่อนกดซื้อ",
            body: "- หน้าบัตรของผู้จัดเขียนเป็นภาษาไทยว่า \"จำกัดการซื้อบัตรได้คนละ 4 ใบเท่านั้น\" [purchaseRules.limit] [not_found.0]\n- ราคาที่แสดงยังไม่รวม VAT 7% และค่าธรรมเนียมการทำรายการ ชำระเป็นเงินบาท ราคาที่แสดงเป็นดอลลาร์ขึ้นกับอัตราแลกเปลี่ยน ตามหน้าขายของ Ticketmelon [purchaseRules.vat]\n- คืนเงินไม่ได้ เงื่อนไขของผู้จัดเขียนว่าการซื้อบัตรทุกรายการไม่สามารถขอคืนเงินได้ และ Ticketmelon เขียนว่า \"All sales are final. No refunds or transfers.\" [purchaseRules.refunds]\n- เงื่อนไขของผู้จัดเขียนว่าบัตรไม่สามารถแลกเปลี่ยน ขายต่อ หรือโอนได้ไม่ว่ากรณีใด [purchaseRules.resale]\n- ทุกวัยเข้างานได้ เด็กอายุ 12 ปีลงมาต้องมาพร้อมพ่อแม่ ผู้ปกครอง หรือผู้ดูแลที่ระบุชื่อไว้ ผู้ที่อายุต่ำกว่า 20 ปีซื้อแอลกอฮอล์ไม่ได้และต้องใส่ริสต์แบนด์วัยรุ่น ตามคำถามที่พบบ่อยของผู้จัด [age.organiser] สิ่งที่ผู้จัดและ Ticketmelon เขียนไว้เรื่องบัตรประจำตัวอยู่ที่หน้าคำถามที่พบบ่อย [age.organiserId] [age.seller]",
          },
          {
            id: "where-to-buy",
            heading: "ซื้อบัตร Wonderfruit 2026 ที่ไหน",
            cta: true,
            body: "ผู้ขายบัตร: Ticketmelon ชำระเงินบนเว็บไซต์ของ Ticketmelon [sellers.1] คู่มือนี้ไม่ได้ขายบัตรและไม่ได้เป็นของผู้จัด\n\nจุดเริ่มคือหน้า Tickets บนเว็บไซต์ของผู้จัด ซึ่งมีภาษาไทย เมื่ออ่านวันที่ 24 ตุลาคม ปุ่มของ Sunday Pass บัตรวัยรุ่น และบัตรสำหรับสุนัขเขียนว่า \"เพิ่มลงตะกร้า\" (Add to Bag) และใส่บัตรลงตะกร้าของผู้จัดเอง ซึ่งตอนชำระเงินแจ้งว่าจะพาไปที่ ticketmelon.com ส่วน 5-Day Full Pass กับ Weekend Pass ขึ้นว่า Join the waitlist, Intro กับ Youth ขึ้นว่า Apply และ Family ขึ้นว่า Configure [sellers.0] บนหน้าขายของ Ticketmelon บริษัทผู้จัด Scratch First Co., Ltd. ระบุว่า Ticketmelon เป็นแพลตฟอร์มจำหน่ายบัตรอย่างเป็นทางการเพียงรายเดียวของ Wonderfruit 2026 [sellers.1] [sellers.1.note] [event.organiser]",
          },
        ],
        faq: [],
        sourcesHeading: "แหล่งที่มา",
        sources: "Wonderfruit [หน้าบัตร](/go/wonderfruit-tickets/) (มีภาษาไทย), [คำถามที่พบบ่อย](/go/wonderfruit-faq/), เงื่อนไขการซื้อบัตร, โพสต์ Program Passes 5 สิงหาคม 2026, ใบสมัคร [Intro Pass](/go/wonderfruit-intro-pass/) และ [Youth Pass](/go/wonderfruit-youth-pass/) — อ่านเมื่อ 21–24 ตุลาคม 2026\n[Ticketmelon หน้าขาย Wonderfruit 2026 – The November Sale](/go/wonderfruit-ticketmelon/) — อ่านเมื่อ 21–24 ตุลาคม 2026\nแถลงข่าวของผู้จัด 1 กันยายน 2026",
      },
      {
        slug: "wonderfruit/stay",
        createdAt: "2026-10-22T21:05:00+04:00",
        updatedAt: "2026-10-24T09:53:00+04:00",
        kind: "stay",
        label: "ที่พักและการเดินทาง",
        navTitle: "กางเต็นท์ Boutique Camping บ้านพัก โรงแรม และเส้นทางไป The Fields",
        title: "ที่พัก Wonderfruit 2026: กางเต็นท์ โรงแรม — คู่มือเทศกาล",
        description: "ที่พัก Wonderfruit 2026: กางเต็นท์เอง General Camping, Boutique Camping, บ้านพัก Slow Wonder โรงแรมที่มีรถรับส่ง และทางจากกรุงเทพฯ ถึงพัทยา คู่มือเทศกาล",
        h1: "ที่พักและการเดินทาง Wonderfruit 2026",
        lede: "ที่ Wonderfruit 2026 (วันพฤหัสบดีที่ 3 ถึงวันจันทร์ที่ 7 ธันวาคม ที่ The Fields at Siam Country Club พัทยา) คุณค้างคืนในพื้นที่งานได้สามแบบ กางเต็นท์เองใน General Camping{{until prices}} 1,500 บาทสำหรับผู้เข้าพัก 1 คน{{/until}} เต็นท์แบบ Pavilion ใน Boutique Camping{{until prices}} ตั้งแต่ 25,000 บาทต่อเตียงในเต็นท์แชร์ ถึง 120,000 บาทสำหรับ Pavilion Suite – King{{/until}} หรือบ้านพัก Slow Wonder{{until prices}} 235,000 บาท ทุกราคายังไม่รวม VAT 7% และค่าธรรมเนียม อ่านจากหน้าของผู้จัดเมื่อ 24 ตุลาคม 2026{{/until}} [editions.0.start] [editions.0.end] [venue.name] [prices.10] [prices.12] [prices.11] บัตรเข้างานกับที่พักทุกแบบขายแยกกัน ตามคำตอบในคำถามที่พบบ่อยของผู้จัดใต้หัวข้อ Boutique Camping [practical.6] หรือจะพักโรงแรมพาร์ตเนอร์ในพัทยาและนาจอมเทียนก็ได้ ซึ่งห่างจากงาน 16–27 กิโลเมตร ผู้จัดระบุว่าสองแห่งมีจุดจอดรถรับส่งอย่างเป็นทางการที่ล็อบบี้ และอีกแห่งมีรถรับส่งของโรงแรมเอง [transport.1] ส่วนที่ยังไม่มีข้อมูล ณ วันที่ 24 ตุลาคม คือรถรับส่งและที่จอดรถของงานเอง ซึ่งเว็บไซต์ของผู้จัดยังขึ้นว่า Coming soon [transport.0]",
        jumps: [
          {
            id: "general-camping",
            label: "General Camping",
          },
          {
            id: "boutique-camping",
            label: "Boutique Camping",
          },
          {
            id: "slow-wonder",
            label: "Slow Wonder",
          },
          {
            id: "hotels",
            label: "โรงแรมพาร์ตเนอร์และรถรับส่ง",
          },
          {
            id: "getting-there",
            label: "การเดินทาง",
          },
        ],
        sections: [
          {
            id: "general-camping",
            heading: "กางเต็นท์เอง: General Camping",
            body: "General Camping คือพื้นที่กางเต็นท์ของตัวเอง {{until prices}}ราคา 1,500 บาทสำหรับผู้เข้าพัก 1 คน 5 วัน 4 คืน ยังไม่รวม VAT 7% และค่าธรรมเนียม ซื้อผ่าน Ticketmelon จากหน้า General Camping ของผู้จัด อ่านเมื่อ 24 ตุลาคม 2026 [prices.10]{{/until}} ริสต์แบนด์ General Camping ใช้เข้าหมู่บ้านแคมป์ ส่วนบัตรเข้างานต้องซื้อแยก ตามที่คำถามที่พบบ่อยของผู้จัดตอบไว้ใต้หัวข้อ Boutique Camping ว่าบัตรเข้างานและที่พักทุกแบบขายแยกกัน [practical.6] เช็กอินได้ตั้งแต่วันพฤหัสบดีที่ 3 ธันวาคม 16:00 น. และต้องเช็กเอาต์วันจันทร์ที่ 7 ธันวาคม ก่อน 12:00 น. [prices.10] ผู้จัดไม่มีเต็นท์ให้ยืมหรือให้เช่า เลือกที่กางแบบมาก่อนได้ก่อน และไม่อนุญาตรถบ้านหรือรถที่ดัดแปลงเป็นเต็นท์ [practical.2] หมู่บ้านแคมป์อยู่ติดกับโซน Enfold และ Wonder Kitchen [practical.2] ในงานมีจุดเติมน้ำดื่มฟรี ชาร์จโทรศัพท์ได้ที่จุดเติมน้ำ ไม่มี WiFi และสัญญาณมือถือไม่สม่ำเสมอ ห้ามนำขวดแก้วและพลาสติกใช้ครั้งเดียวเข้ามา [practical.1] [หน้า General Camping ของผู้จัด](/go/wonderfruit-general-camping/)",
          },
          {
            id: "boutique-camping",
            heading: "เต็นท์แบบ Pavilion: Boutique Camping",
            body: "Boutique Camping เป็นเต็นท์แบบ Pavilion ในโซน The Hideaway หรือ The Grove {{until prices}}ราคาบนหน้า Boutique Camping ของผู้จัด อ่านเมื่อ 24 ตุลาคม 2026 ยังไม่รวม VAT 7% และค่าธรรมเนียม และชำระเงินผ่านตะกร้าของผู้จัดที่ส่งต่อไป Ticketmelon [prices.12]{{/until}}\n\n- {{until prices}}Pavilion Suite – King ใน The Grove: 120,000 บาท ส่วนแบบเดียวกันใน The Hideaway หน้าของผู้จัดขึ้นว่า Sold out เมื่อ 24 ตุลาคม [prices.12.rows.0] [prices.12.rows.1]{{/until}}\n- {{until prices}}Pavilion Suite แบบเตียงควีน 2 เตียง, ควีน 1 กับเตียงเดี่ยว 2 หรือเตียงเดี่ยว 4 เตียง สูงสุด 4 คน: 90,000 บาท {{read}} [prices.12.rows.2]{{/until}}\n- {{until prices}}Classic Pavilion ใน The Grove หรือ The Hideaway สำหรับ 2 คน หรือ 3 คนเมื่อเพิ่มเตียงเสริม: 80,000 บาท {{read}} [prices.12.rows.3] [prices.12.rows.5]{{/until}}\n- {{until prices}}Shared Classic Pavilion เตียงเดี่ยว 1 เตียงแชร์กันในเต็นท์ 3 เตียง: 25,000 บาทต่อเตียง {{read}} [prices.12.rows.4]{{/until}}\n- {{until prices}}เตียงเดี่ยวเสริม: 10,000 บาท และอาหารเช้าทุกวันตลอดการเข้าพัก: 1,700 บาทต่อคน {{read}} [prices.12.rows.5] [prices.12.rows.6]{{/until}}\n\nเช็กอินวันพฤหัสบดีที่ 3 ธันวาคม 12:00 น. เช็กเอาต์วันจันทร์ที่ 7 ธันวาคม 12:00 น. [prices.12] ตอนเช็กอินคำถามที่พบบ่อยของผู้จัดให้เตรียมสามอย่าง คือบัตรประจำตัวฉบับจริงหรือพาสปอร์ต รหัสผู้เข้าพัก Boutique Camping และรหัสผู้เข้างานของบัตร Wonderfruit [prices.12.checkIn] ผู้เข้าพักแบบนี้ได้ที่จอดรถเฉพาะและทางเข้าส่วนตัวโดยไม่มีค่าใช้จ่ายเพิ่ม {{read}} [transport.4] [หน้า Boutique Camping ของผู้จัด](/go/wonderfruit-boutique-camping/)",
          },
          {
            id: "slow-wonder",
            heading: "บ้านพักริมหาด: Slow Wonder",
            body: "Slow Wonder คือบ้านพัก 26 หลังในทุ่งล่างติดชายหาด {{until prices}}ราคา 235,000 บาท สำหรับ 5 วัน 4 คืน ยังไม่รวม VAT และค่าธรรมเนียม และไม่รวมบัตรเข้างาน อ่านจากหน้าของผู้จัดเมื่อ 24 ตุลาคม 2026 [prices.11]{{/until}} [practical.3] ผู้เข้าพักกินอาหารเช้าที่ Jungle House และพาแขกที่ลงทะเบียนล่วงหน้าเข้าหมู่บ้าน Slow Wonder ได้ 4 คน [practical.3] เช็กอินวันพฤหัสบดีที่ 3 ธันวาคม 14:00 น. เช็กเอาต์วันจันทร์ที่ 7 ธันวาคม 12:00 น. [prices.11] ติดต่อทีมดูแลได้ที่ concierge@slow-wonder.com [practical.4] [หน้า Slow Wonder ของผู้จัด](/go/wonderfruit-slow-wonder/)",
          },
          {
            id: "hotels",
            heading: "โรงแรมพาร์ตเนอร์และรถรับส่ง",
            body: "หน้า Hotels & Travel ของผู้จัดระบุโรงแรมพาร์ตเนอร์สามแห่ง Mövenpick Siam Na Jomtien Pattaya ห่างจาก The Fields 16 กิโลเมตร และ Centre Point Prime Hotel Pattaya 22 กิโลเมตร มีจุดจอดรถรับส่งอย่างเป็นทางการของงานตรงจากล็อบบี้ ส่วน Royal Cliff Beach Hotel Pattaya 27 กิโลเมตร จัดรถรับส่งของโรงแรมเองไปงานโดยไม่คิดค่าใช้จ่าย รอบ 15:00 น. และ 18:00 น. [transport.1] บัตรรถรับส่งของงานขายแยกจากแพ็กเกจโรงแรม และหน้าของผู้จัดเขียนว่าบัตรรถรับส่งจะเปิดให้ซื้อเร็ว ๆ นี้ และตารางรถจะประกาศในไม่ช้า อ่านเมื่อ 24 ตุลาคม [transport.0] [transport.1] ถ้าคุณพักโรงแรมอื่นในพัทยา ผู้จัดบอกว่าจะจองบัตรรถรับส่งผ่านโรงแรมพาร์ตเนอร์ที่ใกล้ที่สุดได้เมื่อตารางรถออก [transport.1] ผู้จัดยังระบุว่า Agoda เป็น Official Travel Platform ของงาน [sellers.2] [หน้า Hotels & Travel ของผู้จัด](/go/wonderfruit-hotels/)",
          },
          {
            id: "getting-there",
            heading: "ไปงาน Wonderfruit ยังไง จากกรุงเทพฯ และจากพัทยา",
            body: "รถรับส่งและที่จอดรถของงานเองยังไม่มีรายละเอียด เมนูของเว็บไซต์ผู้จัดและหน้าบัตรขึ้นว่า Coming soon ทั้งสองรายการ อ่านเมื่อ 24 ตุลาคม [transport.0] [หน้าบัตรของผู้จัด](/go/wonderfruit-tickets/) จากกรุงเทพฯ คำถามที่พบบ่อยของผู้จัดบอกว่ามีทั้งรถโดยสารสาธารณะและเอกชน รถตู้ รถลีมูซีนสนามบิน รถไฟ รถเช่า และอื่น ๆ โดยไม่ได้แนะนำทางใดเป็นพิเศษ [transport.2] ทางหนึ่งคือรถโดยสารของ Roong Reuang Coach จากสนามบินสุวรรณภูมิไปสถานีขนส่งพัทยา ซึ่งผู้ให้บริการระบุว่าใช้เวลาราวสองชั่วโมง มีจุดขึ้นรถในกรุงเทพฯ ที่เอกมัย หมอชิต และสุวรรณภูมิ และจุดลงที่พัทยาเหนือกับจอมเทียน ค่าโดยสารและตารางเวลาต้องดูในระบบจองของผู้ให้บริการเอง อ่านเมื่อ 21 ตุลาคม [transport.2] จากสถานีขนส่งหรือจากโรงแรมในพัทยาไปถึง The Fields ผู้จัดไม่ได้ให้ตัวเลขค่าแท็กซี่หรือ Grab ไว้ ระยะทางที่รู้คือ 16–27 กิโลเมตรจากโรงแรมพาร์ตเนอร์ [transport.5] ถ้าบินมา สนามบินที่ใกล้ที่สุดคือท่าอากาศยานนานาชาติอู่ตะเภา ระยอง-พัทยา ห่างจากตัวเมืองพัทยา 39.1 กิโลเมตรตามข้อมูลของสนามบิน เว็บไซต์ของสนามบินอู่ตะเภาประกาศเส้นทางบินไปสุราษฎร์ธานี หัวหิน และอุดรธานี และไม่ได้ระบุเส้นทางจากกรุงเทพฯ อ่านเมื่อ 22 ตุลาคม [transport.3] [ท่าอากาศยานนานาชาติอู่ตะเภา](/go/wonderfruit-utapao/)",
          },
        ],
        faq: [],
        sourcesHeading: "แหล่งที่มา",
        sources: "Wonderfruit หน้า [General Camping](/go/wonderfruit-general-camping/), [Boutique Camping](/go/wonderfruit-boutique-camping/), [Slow Wonder](/go/wonderfruit-slow-wonder/), [Hotels & Travel](/go/wonderfruit-hotels/), [หน้าบัตร](/go/wonderfruit-tickets/), [คำถามที่พบบ่อย](/go/wonderfruit-faq/) — อ่านเมื่อ 21–24 ตุลาคม 2026\n[ท่าอากาศยานนานาชาติอู่ตะเภา](/go/wonderfruit-utapao/) — อ่านเมื่อ 22 ตุลาคม 2026\nRoong Reuang Coach — อ่านเมื่อ 21 ตุลาคม 2026",
      },
      {
        slug: "wonderfruit/faq",
        createdAt: "2026-10-22T21:05:00+04:00",
        updatedAt: "2026-10-24T10:49:00+04:00",
        kind: "faq",
        label: "คำถามที่พบบ่อย",
        navTitle: "เด็ก เอกสาร สุนัข การจ่ายเงิน การเข้าออก และการคืนบัตร",
        title: "คำถามที่พบบ่อย Wonderfruit 2026: เด็ก สุนัข — คู่มือเทศกาล",
        description: "คำถามที่พบบ่อย Wonderfruit 2026: เด็กเข้าฟรีถึงกี่ขวบ พาสุนัขได้ไหม จ่ายเงินยังไง เข้าออกได้ไหม คืนบัตรได้ไหม คำตอบจากผู้จัดและ Ticketmelon คู่มือเทศกาล",
        h1: "คำถามที่พบบ่อย Wonderfruit 2026",
        h1Id: "wonderfruit-faq",
        lede: "คำตอบในหน้านี้มาจากคำถามที่พบบ่อย หน้าบัตร เงื่อนไขการซื้อบัตร โพสต์ Program Passes หน้า General Camping และหน้า Hotels & Travel ของผู้จัด Wonderfruit หน้าขายของ Ticketmelon และเว็บไซต์ Wonderfruit Chapters Kyoto ซึ่งอ่านเมื่อ 21–24 ตุลาคม 2026 และแต่ละข้อบอกไว้ว่ามาจากหน้าไหน [sources.s3] [sources.s2] [sources.s10] [sources.s28] [sources.s4] [sources.s7] [sources.s11] [sources.s22] วันจัดงาน สถานที่ ไลน์อัพ และผู้จัดอยู่ที่ [ภาพรวม Wonderfruit 2026](/wonderfruit/) ราคาและรอบขายอยู่ที่ [บัตร](/wonderfruit/tickets/) ที่พักและเส้นทางอยู่ที่ [ที่พักและการเดินทาง](/wonderfruit/stay/)",
        sections: [],
        faqFirst: true,
        faq: [
          {
            q: "ซื้อบัตร Wonderfruit 2026 ได้ที่ไหน และขายกี่รอบ",
            a: "ชำระเงินที่ Ticketmelon ซึ่งผู้จัดเขียนบนหน้าขายว่าเป็นแพลตฟอร์มจำหน่ายบัตรอย่างเป็นทางการเพียงรายเดียวของ Wonderfruit 2026 โดยเริ่มจากหน้าบัตรบนเว็บไซต์ของผู้จัด [sellers.1] [sellers.0] หน้าบัตรของผู้จัดแสดงรอบขายทั่วไปสี่รอบ คือ September Sale, October Sale, The November Sale (3–9 พฤศจิกายน 2026 เปิด 16:00 น.) และบัตรหน้างานหลังจากนั้นตามจำนวนที่เหลือ {{until nov}}ณ วันที่ 24 ตุลาคม 2026 สองรอบแรกปิดการจำหน่ายแล้ว{{/until}} [editions.0.salesPhases.0] [editions.0.salesPhases.1] [editions.0.salesPhases.2] [editions.0.salesPhases.3] ราคาทุกประเภทอยู่ที่หน้าบัตร",
          },
          {
            q: "เด็กต้องซื้อบัตรไหม และมีเกณฑ์อายุอะไรบ้าง",
            a: "ผู้จัดเขียนว่ายินดีต้อนรับทุกวัย เด็กอายุ 12 ปีลงมาเข้าฟรีโดยไม่ต้องจองบัตรล่วงหน้า แต่ต้องมาพร้อมพ่อแม่ ผู้ปกครอง หรือผู้ดูแลที่ระบุชื่อไว้ [age.organiser] Ticketmelon เขียนในแบบเดียวกันว่าเด็กอายุต่ำกว่า 13 ปีต้องมีพ่อแม่หรือผู้ปกครองมาด้วย [age.seller] อายุ 13–19 ปีใช้ Teen Pass และคนที่อายุต่ำกว่า 20 ปีจะได้ริสต์แบนด์วัยรุ่นซึ่งซื้อแอลกอฮอล์ไม่ได้ [prices.5] [age.organiser] ครอบครัวที่มีผู้ใหญ่ 1–2 คนกับเด็ก 1–4 คนใช้ Family Pass ลด 5% ได้ {{read}} [prices.9] ราคา Teen Pass และ Family Pass อยู่ที่หน้าบัตร",
          },
          {
            q: "ต้องพกบัตรประจำตัวไปไหม",
            a: "ผู้จัดเขียนเรื่องนี้ไว้หลายหน้า คำถามที่พบบ่อยของผู้จัดเขียนว่าผู้เข้างานอาจถูกขอดูบัตรประจำตัวได้ทุกเมื่อ เพื่อตรวจอายุสำหรับการซื้อแอลกอฮอล์ และบัตรบางประเภทต้องแสดงเอกสารตอนเข้างาน [age.organiserId.rules.0] หน้าบัตรภาษาไทยเขียนที่ Teen Pass ว่า \"ก่อนเข้างานต้องแสดงเอกสารที่ทางราชการออกให้\" [age.organiserId.rules.1] เงื่อนไขของผู้จัดเขียนว่าผู้ถือ Intro Pass และ Youth Pass ต้องแสดงเอกสารที่ทางราชการออกให้ซึ่งมีชื่อและวันเกิดตอนเข้างาน และโพสต์ Program Passes เขียนว่าผู้ถือ Youth Pass เข้างานได้ด้วยเอกสารฉบับจริงที่ใช้สมัครเท่านั้น [age.organiserId.rules.5] [age.organiserId.rules.4] ส่วนหน้าขายของ Ticketmelon เขียนว่า \"ID check required\" [age.seller]",
          },
          {
            q: "พาสุนัขเข้างานได้ไหม",
            a: "ได้ โดยซื้อ Dog Pass สำหรับ 5 วัน และเจ้าของต้องมีบัตรเข้างานของตัวเองด้วย ตามหน้าบัตรและคำถามที่พบบ่อยของผู้จัด {{read}} [prices.6] ราคาอยู่ที่หน้าบัตร",
          },
          {
            q: "ในงานจ่ายเงินยังไง ใช้เงินสดได้ไหม",
            a: "ในงานไม่รับเงินสด ทุกอย่างจ่ายผ่านริสต์แบนด์ที่เติมเงินไว้ และมีตู้ ATM ในงานสำหรับเติมเงิน [practical.0] คำถามที่พบบ่อยของผู้จัดเขียนว่าเงินที่เติมด้วยบัตรเครดิตขอคืนไม่ได้ และผู้จัดเองแนะนำให้พกเงินสดไปบ้าง [practical.0]",
          },
          {
            q: "นำอาหาร เครื่องดื่ม หรือแอลกอฮอล์เข้างานได้ไหม",
            a: "ผู้จัดห้ามนำอาหารและเครื่องดื่มจากข้างนอก แอลกอฮอล์ ขวดแก้ว และพลาสติกใช้ครั้งเดียวเข้างาน และมีจุดเติมน้ำดื่มฟรีทั่วงาน [practical.1] หน้า General Camping ของผู้จัดยกเว้นให้นำอาหารเข้ามาได้สำหรับผู้กางเต็นท์ที่มีข้อจำกัดด้านอาหาร และนมผงสำหรับเด็กเล็ก [practical.1]",
          },
          {
            q: "มี WiFi ไหม ชาร์จมือถือได้ที่ไหน",
            a: "ไม่มี WiFi และผู้จัดเตือนว่าสัญญาณมือถือไม่สม่ำเสมอ จุดชาร์จอยู่ที่จุดเติมน้ำดื่ม ตามคำถามที่พบบ่อยและหน้า General Camping ของผู้จัด [practical.1]",
          },
          {
            q: "ประตูเปิดกี่โมง และออกจากงานแล้วกลับเข้าได้ไหม",
            a: "วันแรก วันพฤหัสบดีที่ 3 ธันวาคม ประตูเปิด 16:00 น. วันศุกร์ถึงวันอาทิตย์เปิด 08:00 น. และตั้งแต่วันพฤหัสบดีถึงวันอาทิตย์เข้างานได้ถึงเที่ยงคืน ส่วนวันจันทร์ที่ 7 เป็นเช้าวันสุดท้าย [editions.0.hours.0] [editions.0.hours.1] [editions.0.hours.2] [editions.0.hours.3] [editions.0.hours.4] กลับเข้าได้ ยกเว้นช่วงเที่ยงคืนถึง 08:00 น. ที่ประตูปิด และคืนวันอาทิตย์ที่ 6 เป็นข้อยกเว้นสำคัญ ออกหลังเที่ยงคืนแล้วจะไม่ได้กลับเข้าในวันจันทร์ที่ 7 [editions.0.hoursNote] ผู้จัดระบุว่าเวลาอาจเปลี่ยนแปลง {{read}} [editions.0.hoursNote]",
          },
          {
            q: "ขอคืนเงินหรือขายบัตรต่อได้ไหม",
            a: "ไม่ได้ เงื่อนไขของผู้จัดระบุว่าการซื้อบัตรทุกรายการไม่สามารถขอคืนเงิน และบัตรไม่สามารถแลกเปลี่ยน ขายต่อ หรือโอนได้ไม่ว่ากรณีใด [purchaseRules.refunds] [purchaseRules.resale] Ticketmelon เขียนตรงกันว่าการขายถือเป็นที่สิ้นสุด ไม่มีการคืนเงินหรือโอนสิทธิ์ [purchaseRules.refunds]",
          },
          {
            q: "กางเต็นท์เองได้ไหม ราคาเท่าไหร่",
            a: "ได้ ใน General Camping {{until prices}}ราคา 1,500 บาทสำหรับผู้เข้าพัก 1 คน 5 วัน 4 คืน ยังไม่รวม VAT 7% และค่าธรรมเนียม ตามหน้า General Camping ของผู้จัด อ่านเมื่อ 24 ตุลาคม 2026{{/until}} ต้องเอาเต็นท์มาเอง เพราะผู้จัดไม่มีให้ยืมหรือเช่า [prices.10] [practical.2] บัตรเข้างานขายแยกจากที่พักทุกแบบ ตามคำถามที่พบบ่อยของผู้จัด [practical.6] กติกา เวลาเช็กอิน และทางเลือกอื่นอย่าง Boutique Camping กับบ้านพัก Slow Wonder อยู่ที่หน้าที่พัก",
          },
          {
            q: "ไปจากกรุงเทพฯ ยังไง และมีรถรับส่งของงานไหม",
            a: "รถรับส่งและที่จอดรถของงานยังขึ้นว่า Coming soon บนเว็บไซต์ของผู้จัด ณ วันที่ 24 ตุลาคม และหน้าโรงแรมของผู้จัดเขียนว่าบัตรรถรับส่งจะเปิดให้ซื้อเร็ว ๆ นี้ [transport.0] ที่ผู้จัดระบุแล้วคือจุดจอดรถรับส่งอย่างเป็นทางการที่ล็อบบี้ของโรงแรมพาร์ตเนอร์สองแห่ง และรถรับส่งของโรงแรม Royal Cliff เอง [transport.1] จากกรุงเทพฯ ผู้จัดบอกว่ามีทั้งรถโดยสาร รถตู้ รถลีมูซีนสนามบิน รถไฟ และรถเช่า ทางหนึ่งคือรถโดยสาร Roong Reuang Coach จากสุวรรณภูมิไปสถานีขนส่งพัทยา [transport.2] รายละเอียดอยู่ที่หน้าที่พักและการเดินทาง",
          },
          {
            q: "Wonderfruit Chapters Kyoto คืออะไร จัดเมื่อไหร่",
            a: "เป็นงานแยกของ Wonderfruit ที่เกียวโต ประเทศญี่ปุ่น ในเดือนตุลาคม 2026 มีเว็บไซต์ของตัวเองที่ chapterskyoto.co และคำถามที่พบบ่อยของผู้จัดยืนยันว่างานหลักยังคงจัดที่ชลบุรีเหมือนเดิม [sideEvents.0]",
          },
          {
            q: "ตารางเวลาเต็มของ Wonderfruit 2026 ออกเมื่อไหร่",
            a: "ตารางเวลาเต็มยังไม่ออก หน้าโปรแกรมของผู้จัดยังเขียนว่า \"AND MORE TO COME\" และคำถามที่พบบ่อยระบุว่าตารางเวลาเต็มจะประกาศบน Wonder App [lineup.announcedNote] [lineup.announcedNote.schedule] แต่ตารางเวลาชุดแรกออกแล้ว หน้า Directory ของผู้จัดซึ่งขึ้นหัวว่า \"FIRST RELEASE\" ระบุวันและเวลาแสดงของศิลปินดนตรี 110 รายจากทั้งหมด 136 ราย อ่านเมื่อ 24 ตุลาคม 2026 [lineup.directory] [lineup.directory.counts] ชื่อที่ประกาศแล้วตั้งแต่ 1 กันยายน อยู่ที่หน้าภาพรวม [lineup.announcedOn]",
          },
          {
            q: "Wonderfruit 2027 จัดเมื่อไหร่",
            a: "ผู้จัดยังไม่ประกาศ [questions.8]",
          },
          {
            q: "ติดต่อผู้จัดได้ที่ไหน",
            a: "อีเมล info@wonderfruit.co ตามคำถามที่พบบ่อยของผู้จัด ส่วนเรื่องบ้านพัก Slow Wonder ติดต่อ concierge@slow-wonder.com [practical.4]",
          },
        ],
        sourcesHeading: "แหล่งที่มา",
        sources: "Wonderfruit [คำถามที่พบบ่อย](/go/wonderfruit-faq/), [หน้าบัตร](/go/wonderfruit-tickets/), เงื่อนไขการซื้อบัตร, โพสต์ Program Passes, [หน้า General Camping](/go/wonderfruit-general-camping/), [หน้า Hotels & Travel](/go/wonderfruit-hotels/), [Wonderfruit Chapters Kyoto](/go/wonderfruit-kyoto/) — อ่านเมื่อ 21–24 ตุลาคม 2026\n[Ticketmelon หน้าขาย Wonderfruit 2026 – The November Sale](/go/wonderfruit-ticketmelon/) — อ่านเมื่อ 21–24 ตุลาคม 2026",
      },
    ],
  },
  {
    slug: "en",
    createdAt: "2026-10-24T09:53:00+04:00",
    updatedAt: "2026-10-24T09:53:00+04:00",
    event: "wonderfruit",
    // The English twin: the same edition and sheet, for a reader who
    // searches in English. Second in the list, so the Thai guide stays the
    // x-default and keeps the hub's one card (rules.ts, firstGuides).
    name: "Wonderfruit 2026",
    lang: "en",
    dir: "ltr",
    path: "/wonderfruit/en/",
    cover: "/covers/wonderfruit.jpg",
    hubLabel: "English",
    hubBlurb: "Wonderfruit 2026, Thursday 3 to Monday 7 December at The Fields at Siam Country Club, Pattaya: ticket prices and sale rounds, the line-up, camping and hotels, the way from Bangkok and Thailand's entry rules [editions.0.start] [editions.0.end] [venue.name] [venue.city].",
    // The Thai guide's days: the figures in baht come off on 2 December
    // 2026, the lines that call the November Sale the next round on 10
    // November, the day after it ends.
    expires: { prices: "2026-12-02", nov: "2026-11-10" },
    footerNote: "An independent guide, written from the pages of the organiser, its ticket seller and the public bodies named in it. None of them has a hand in it.",
    footerLinks: [
      { href: "/go/wonderfruit-official-en/", label: "Wonderfruit's own site", title: "wonderfruit.co, the organiser's site in English", rel: "nofollow" },
      { href: "/go/wonderfruit-ticketmelon/", label: "Ticketmelon", title: "The Wonderfruit 2026 sale page on ticketmelon.com", rel: "nofollow" },
    ],
    pages: [
      {
        slug: "wonderfruit/en",
        createdAt: "2026-10-24T09:53:00+04:00",
        updatedAt: "2026-10-24T10:49:00+04:00",
        kind: "main",
        label: "Guide",
        crumb: "Wonderfruit 2026",
        navTitle: "Dates, ticket prices, line-up and the venue of Wonderfruit 2026",
        linkTitle: "Wonderfruit 2026 guide: dates, tickets, line-up and entry rules",
        title: "Wonderfruit 2026: dates, tickets, line-up — festival guide",
        description: "Wonderfruit 2026, 3–7 December at The Fields at Siam Country Club, Pattaya: ticket prices, sale rounds, line-up, gate times and entry rules. Festival guide.",
        h1: "Wonderfruit 2026",
        lede: "Wonderfruit 2026 runs from Thursday 3 to Monday 7 December 2026 at The Fields at Siam Country Club in Pattaya, Chonburi, Thailand [editions.0.start] [editions.0.end] [venue.name] [venue.city] [venue.province]. It is the eleventh edition of a music, art and food festival run by Scratch First Co., Ltd., this year under the theme Field Village [event.edition] [event.kind] [event.organiser] [event.theme].\n\n{{until nov}}The 5-Day Full Pass costs THB 12,900 and the Weekend Pass THB 11,500 in the November Sale, according to the organiser's ticket page on 24 October 2026 [prices.0] [prices.2]. At Ticketmelon, which takes the money, the sale runs from Tuesday 3 to Monday 9 November 2026 and opens at 16:00 Bangkok time, 09:00 in London [editions.0.salesPhases.2] [sellers.1]. The organiser calls it the last online sale [editions.0.salesPhases.2]. Ticketmelon's page says its prices do not include 7% VAT and transaction fees [purchaseRules.vat].{{/until}}\n\n{{until prices}}For the door, after the November Sale, the organiser's ticket page (read 24 October 2026) lists THB 20,000 for the 5-Day Full Pass and THB 15,000 for the Weekend Pass, subject to availability [prices.1] [prices.3] [editions.0.salesPhases.3].{{/until}} Under the organiser's terms, tickets are non-refundable and cannot be resold or transferred [purchaseRules.refunds] [purchaseRules.resale].",
        ledeParas: 3,
        cta: {
          href: "/go/wonderfruit-ticketmelon/",
          label: "Ticketmelon's ticket page",
          title: "The Wonderfruit 2026 sale page on ticketmelon.com",
          secondary: {
            href: "/go/wonderfruit-tickets-en/",
            label: "The organiser's ticket page",
            title: "Every Wonderfruit pass, its price and how to buy it, on wonderfruit.co",
          },
        },
        glance: [
          { label: "Dates", value: "3–\u20607\u00a0December\u00a02026 [editions.0.start] [editions.0.end]" },
          { label: "Venue", value: "The Fields at Siam Country Club [venue.name]" },
          { label: "Where", value: "Pattaya, Chonburi, Thailand [venue.city] [venue.province]" },
          { label: "Tickets", value: "Ticketmelon [sellers.1]" },
          { label: "Checked", value: "21–\u206024\u00a0October\u00a02026" },
        ],
        jumps: [
          { id: "about", label: "What it is" },
          { id: "buy", label: "Tickets" },
          { id: "dates", label: "Dates and gates" },
          { id: "lineup", label: "Line-up" },
          { id: "venue", label: "Getting there" },
          { id: "before-you-fly", label: "Before you fly" },
          { id: "editions", label: "Past and future" },
          { id: "why-english", label: "Why in English" },
          { id: "more-questions", label: "More questions" },
        ],
        sections: [
          {
            id: "about",
            heading: "What Wonderfruit is, and who runs it",
            body: "Wonderfruit is a music, art and food festival held each December at The Fields, part of Siam Country Club in Pattaya [event.kind] [venue.name] [editions.1] [editions.2] [editions.3]. On its Ticketmelon page, the organiser bills it as \"99+ hours of music, art, food, wellness, nature and more\" [sellers.1.claim]. The organiser counts 26 named venues on site, among them The Quarry, Forbidden Fruit, Forest Stage, Creature Stage, Solar Village, Molam World, Enfold and Baan Bardo [venue.stages]. Its FAQ promises \"24 hours of programming every day\", and adds: \"It's not at all venues but there is always something on somewhere.\" [lineup.announcedNote]\n\nThe company behind it is Scratch First Co., Ltd., named in the organiser's terms, and the organiser account that publishes the event on Ticketmelon [event.organiser] [sellers.1.note]. The organiser's Wonderpost names Pranitan \"Pete\" Phornprapha as the founder, and the Thai musician Montonn \"Jay\" Jira as his co-founder [people.0] [people.1]. Of The Fields, the organiser writes \"Since 2014\". Time Out Asia dates the first festival to December 2014 [editions.4].",
          },
          {
            id: "buy",
            heading: "Tickets: what they cost and who takes the money",
            cta: true,
            body: "You pay Ticketmelon. On the festival's page there, the organiser calls it \"the sole official ticketing platform for Wonderfruit 2026\" [sellers.1.note]. You start on the organiser's ticket page. Its \"Add to Bag\" buttons fill the organiser's own bag, which passes you on to ticketmelon.com to pay [sellers.0].\n\nThe September and October rounds are sold out [editions.0.salesPhases.0] [editions.0.salesPhases.1]. {{until nov}}The November Sale is limited and first come, first served, and the organiser's waitlist for it was due to close on Monday 2 November [editions.0.salesPhases.2].{{/until}} On 24 October 2026 the organiser's ticket page had the Sunday, Teen and Dog Passes on sale, and the 5-Day Full Pass and the Weekend Pass showed \"Join the waitlist\" [sellers.0] [prices.4] [prices.5] [prices.6] [prices.0] [prices.1] [prices.2] [prices.3]. Ticketmelon's own page listed no tiers that day [not_found.9]. Every pass and its price, the passes you apply for, and the rules on refunds and resale are on the [tickets page](/wonderfruit/en/tickets/).",
          },
          {
            id: "dates",
            heading: "Dates and gate times",
            body: "The festival runs for five days, from Thursday afternoon to Monday morning. Ticketmelon's page gives the span as \"03 December 2026, 16:00 - 07 December 2026, 12:00\" [editions.0.sellerEventLine]. The organiser's FAQ, read 24 October 2026, sets the gates [editions.0.hours]:\n\n- Thursday 3 December: gates open at 16:00, last entry at midnight [editions.0.hours.0]\n- Friday 4 to Sunday 6 December: gates open at 08:00, last entry at midnight [editions.0.hours.1] [editions.0.hours.2] [editions.0.hours.3]\n- Monday 7 December: the last morning. The Sunday Pass runs to Monday sunrise. Camping and cabins check out at 12:00 [editions.0.hours.4].\n\nBetween midnight and 08:00 nobody is let back in. That matters most on the last night. If you leave after midnight on Sunday 6 December, you cannot come back in on Monday 7 [editions.0.hoursNote]. The organiser adds that the times may change [editions.0.hoursNote].",
          },
          {
            id: "lineup",
            heading: "Line-up and programme",
            body: "The organiser announced its first acts on 1 September 2026 [lineup.announcedOn]. On 24 October 2026 [its Directory](/go/wonderfruit-directory/), headed \"FIRST RELEASE\", listed 136 music acts, 110 of them with a day and a time [lineup.directory] [lineup.directory.counts]. The FAQ still says the full schedule comes \"later in the year\" on the Wonder App. So the Directory's times are a first release, not the final timetable [lineup.announcedNote.schedule].\n\nThe release of 1 September named, in this order, Tangerine Dream, Eli Keszler, Orphx, ITSU & ARS, Jesse You, JakoJako, Loyboy, Gerd Janson, Hamdi Ryder, Omoloko and ffan [lineup.acts] [lineup.actsForms]. After them came Faustus, Nubya Garcia, Jane Fitz, Nicolas Lutz, Sweely, DOTT, Shanka Tribe, DJ Python, Genderfunk and the Paradise Bangkok Molam International Band [lineup.acts] [lineup.actsForms]. The Directory carries names the release did not, among them Nightmares on Wax, Marcel Dettmann, Mano Le Tough, Jim O'Rourke & Eiko Ishibashi, Phum Viphurit, Kuniyuki (Live) and Howie Lee [lineup.directory] [lineup.actsNote].\n\nThe Directory dates each slot by the day it starts [lineup.directory]. So Tangerine Dream's \"Sat 5 Dec 00:00\" falls in the small hours after Friday night. A Weekend Pass, which lets you in from 08:00 on Saturday, does not cover it, and Friday's last entry is at midnight [prices.2] [editions.0.hours.1]. Marcel Dettmann's Monday slot is Sunday night, inside a Sunday Pass that runs to Monday sunrise [prices.4]. It is the kind of detail otherwise learnt at the gate.\n\nA few slots as the Directory's profiles print them [lineup.directory.scheduled]:\n\n- Nightmares on Wax: Friday 4 December, 18:00–21:00, Forbidden Fruit\n- Tangerine Dream: Saturday 5 December, 00:00–01:00, Creature Stage\n- Nubya Garcia: Saturday 5 December, 21:30–22:30, Creature Stage\n- DJ Python: Sunday 6 December, 21:30–23:30, The Quarry\n- Marcel Dettmann: Monday 7 December, 00:00–03:00, Baan Bardo\n\nThe organiser's Root Music list includes Sansae, Thee Marloes, Jarb Cat, Sombat Simla and Rattanakosin Breakin' Crew [lineup.rootMusic]. Solar Village has Jason Kendig, Alex Albrecht, Pam Anantr and AWARË among its names [lineup.solarVillage].\n\nBeyond the music, the programme page announces From Sound to Screen, Nick Dwyer's films with live music over three evenings [lineup.programmes]. It also announces Sonic Minds by MSCTY_Studio, with May-T, Sunju Hargun and Quantum Aria (Carl Stone & Akaihirume) [lineup.programmes]. Rituals & Ceremonies takes in an Opening Ritual and a Closing Ceremony with Tulku Ngawang, and Dhyana, curated by Black Turtle [lineup.programmesMore.0]. There are also the Open Kitchen, Wonder Kitchen's chef's tables, 15 named art installations, and Unconditional Space under the title \"Tropicality: New Beginnings\" [lineup.programmesMore]. The wellness theme is \"Rooted in the Inner Axis\" [lineup.programmes]. [The organiser's programme page](/go/wonderfruit-programme-en/)",
          },
          {
            id: "venue",
            heading: "Where it is and how to get there",
            body: "The organiser gives the address in one line: \"The Fields at Siam Country Club, Chonburi, Thailand\" [venue.address]. The Fields are part of Siam Country Club in Pattaya, Chonburi province [venue.name] [venue.city] [venue.province]. The organiser's FAQ links a Google Maps point at 12.9027695, 100.9998528 [venue.lat] [venue.lon] [venue.coordsNote]. [Open in maps](/go/wonderfruit-map/) [The organiser's venues page](/go/wonderfruit-venue/)\n\nOn 24 October 2026 the festival's own shuttles and parking were still marked \"Coming soon\" [transport.0]. Two partner hotels in Na Jomtien and Pattaya have an official shuttle stop in the lobby, and a third runs its own [transport.1]. The way from Bangkok, camping, cabins and hotels are on the [stay and travel page](/wonderfruit/en/stay/).",
          },
          {
            id: "before-you-fly",
            heading: "Before you fly: passport, visa exemption and the arrival card",
            body: "Thailand changed its visa-exemption rules on 15 September 2026. The Tourism Authority of Thailand announced on 1 September that the 60-day exemption would end [entry.visaExemption]. Passports of 60 countries and territories now get visa-free entry \"for tourism, with a permitted stay of up to 30 days\" [entry.visaExemption]. The list includes the United Kingdom, Ireland, the United States, Canada, Australia, New Zealand, India, Singapore, Malaysia, Japan, Taiwan, the UAE and every EU member state [entry.visaExemption.value].\n\nIf you travel on a full British citizen passport, GOV.UK's advice, updated 12 October 2026, says it must be valid for at least six months after you arrive, with at least one blank page [entry.uk]. You may be asked for proof of funds, at least THB 10,000 per person or THB 20,000 per family, and for proof of onward or return travel [entry.uk]. Overstaying costs THB 500 a day, up to THB 20,000 [entry.uk].\n\nEvery foreign arrival also fills in the Thailand Digital Arrival Card. \"All passengers must complete the Thailand Digital Arrival Card\", says the Immigration Bureau's own site, whose title says \"No Fees Required\" [entry.tdac]. GOV.UK says to register it \"within 3 days before they arrive\" [entry.uk].\n\nOn any other passport, check your own government's advice as well. In the United States that is the State Department, and in Australia Smartraveller. [The official arrival card site](/go/wonderfruit-tdac/) [GOV.UK on entering Thailand](/go/wonderfruit-gov-uk/) [The Tourism Authority of Thailand on the new rules](/go/wonderfruit-tat-visa/)",
          },
          {
            id: "editions",
            heading: "Earlier editions, the rest of the season and 2027",
            body: "This year's festival is a week earlier than its usual second weekend of December, and the organiser's pages give no reason [editions.0.note] [not_found.6]. Time Out Asia, on 9 March 2026, linked the move to Tomorrowland's Pattaya debut on the usual weekend [editions.0.note] [sources.s18]. The tenth edition ran from Thursday 11 to Monday 15 December 2025, according to Time Out Bangkok [editions.1]. The ninth ran from 12 to 16 December 2024, and The Standard put attendance at more than 25,000 [editions.2]. For 2023, the organiser's own accommodation post gave check-in on 14 December and check-out on 18 December [editions.3].\n\nThe organiser's FAQ lists other events after the festival. Camp Wonder runs from 18 to 23 December 2026, Field.D is on 20 December 2026, and Din Daen runs from 29 to 31 January 2027 [seasonEvents]. Its site menu also names Open Fields, \"Dec 2026–Jan 2027\" [seasonEvents]. On 24 October none of them had a page of its own, and none is announced as Wonderfruit 2027, which the organiser has not announced [seasonEvents] [questions.8]. Wonderfruit Chapters Kyoto, a separate gathering in Kyoto on 22–25 October 2026, has a site of its own. The organiser's FAQ says the main festival stays in Chonburi [sideEvents.0] [sideEvents.0.faqDates]. Wonderfruit, it seems, prefers a season to a weekend. [Wonderfruit Chapters Kyoto](/go/wonderfruit-kyoto/)",
          },
          {
            id: "why-english",
            heading: "Why this guide is in English",
            body: "This guide is in English for those who come to Wonderfruit from abroad, or live in Thailand and would rather read in English. Ticketmelon takes payment in baht and says prices in US dollars are subject to the exchange rate [purchaseRules.vat]. A visitor on a foreign passport needs the 30-day rule and the arrival card as much as the gate times [entry.visaExemption] [entry.tdac]. Those answers are spread over the organiser's ticket, FAQ, camping, hotel and programme pages, Ticketmelon's page and three public bodies' sites. Here they are together, each with its source and the date it was read.",
          },
          {
            id: "more-questions",
            heading: "More questions",
            body: "Children and age limits, ID, dogs, paying on a cashless site, what you may not bring, refunds and promo codes are answered one by one, each with its source, on the [questions page](/wonderfruit/en/faq/).",
          },
        ],
        faq: [
        ],
        sourcesHeading: "Sources",
        sources: "- Wonderfruit, the organiser: [home page](/go/wonderfruit-official-en/), [tickets](/go/wonderfruit-tickets-en/), [FAQ](/go/wonderfruit-faq/), [venues](/go/wonderfruit-venue/), [Guide to Wonder](/go/wonderfruit-programme-en/), [Directory](/go/wonderfruit-directory/), terms and conditions, Decade of Wonder, Wonderpost, [Wonderfruit Chapters Kyoto](/go/wonderfruit-kyoto/) — read 21–24 October 2026\n- [Ticketmelon, Wonderfruit 2026 – The November Sale](/go/wonderfruit-ticketmelon/) — read 21–24 October 2026\n- The organiser's press release of 1 September 2026\n- [GOV.UK, Thailand entry requirements](/go/wonderfruit-gov-uk/), updated 12 October 2026, [Thailand Digital Arrival Card](/go/wonderfruit-tdac/), [Tourism Authority of Thailand, 1 September 2026](/go/wonderfruit-tat-visa/) — read 24 October 2026\n- Time Out Bangkok, 29 May 2025, Time Out Asia, 9 March 2026, The Standard, 25 December 2024 — read 21–22 October 2026",
      },
      {
        slug: "wonderfruit/en/tickets",
        createdAt: "2026-10-24T09:53:00+04:00",
        updatedAt: "2026-10-24T10:49:00+04:00",
        kind: "tickets",
        label: "Tickets",
        crumb: "Tickets",
        navTitle: "Every Wonderfruit 2026 pass, its price and its sale round",
        linkTitle: "Wonderfruit 2026 tickets: every pass, the sale rounds and the rules",
        title: "Wonderfruit 2026: ticket prices, passes — festival guide",
        description: "Wonderfruit 2026 tickets: 5-Day, Weekend and Sunday Pass prices, the November Sale of 3–9 November, door prices and the no-refund rule. Festival guide.",
        h1: "Wonderfruit 2026 tickets",
        lede: "Wonderfruit 2026 runs from Thursday 3 to Monday 7 December at The Fields at Siam Country Club [editions.0.start] [editions.0.end] [venue.name]. You choose your tickets on the organiser's ticket page and pay at Ticketmelon [sellers.0] [sellers.1]. On the festival's page there, the organiser names Ticketmelon the sole official ticketing platform for Wonderfruit 2026 [sellers.1.note]. {{until nov}}On 24 October 2026 the next general round on the organiser's ticket page was the November Sale, from Tuesday 3 to Monday 9 November, opening at 16:00 Bangkok time [editions.0.salesPhases.2].{{/until}} The figures here are from the organiser's ticket page, read 24 October 2026, unless a line names another source [sources.s2] [prices]. Ticketmelon's page says the listed price does not include 7% VAT and transaction fees. No page gives the amount of the fees [purchaseRules.vat].",
        cta: {
          href: "/go/wonderfruit-ticketmelon/",
          label: "Ticketmelon's ticket page",
          title: "The Wonderfruit 2026 sale page on ticketmelon.com",
          secondary: {
            href: "/go/wonderfruit-tickets-en/",
            label: "The organiser's ticket page",
            title: "Every Wonderfruit pass, its price and how to buy it, on wonderfruit.co",
          },
        },
        jumps: [
          { id: "rounds", label: "Sale rounds" },
          { id: "prices", label: "Prices" },
          { id: "applications", label: "Intro and Youth" },
          { id: "rules", label: "Rules" },
          { id: "where-to-buy", label: "Where to buy" },
        ],
        sections: [
          {
            id: "rounds",
            heading: "The sale rounds",
            body: "The organiser's press release called 1 September 2026 the opening of general ticket sales [salesPhases.scope]. There were earlier rounds. Members of The Pineapple Eyes, which the organiser describes as \"a community of our most engaged Wonderers from over the years\", \"enjoy early access to sales and exclusive launches\" [salesPhases_earlier.rounds.PineappleEyes.what]. Ticketmelon's page also carries rounds named Pre Sale and The Opening Sale. No organiser or seller page gives their dates or prices [salesPhases_earlier]. The organiser's ticket page shows four rounds:\n\n1. **September Sale**, Tuesday 1 to Monday 7 September 2026, from 16:00. {{until prices}}Full Pass THB 10,900, Weekend Pass THB 9,500, according to the organiser's release of 1 September.{{/until}} Sold out [editions.0.salesPhases.0] [sources.s12] [sources.s2].\n2. **October Sale**, Thursday 1 to Wednesday 7 October 2026. {{until prices}}Full Pass THB 11,900, Weekend Pass THB 10,500, according to the organiser's FAQ.{{/until}} Sold out [editions.0.salesPhases.1] [sources.s3] [sources.s2].\n3. **November Sale**, Tuesday 3 to Monday 9 November 2026, from 16:00 Bangkok time, which is 09:00 in London. {{until prices}}Full Pass THB 12,900, Weekend Pass THB 11,500.{{/until}} {{until nov}}The organiser's waitlist for it was due to close on Monday 2 November.{{/until}} The organiser calls it the last online sale, with limited capacity, first come, first served [editions.0.salesPhases.2] [sellers.1].\n4. **At the door**, after the November Sale and subject to availability. {{until prices}}Full Pass THB 20,000, Weekend Pass THB 15,000.{{/until}} The organiser's pages give no box office location or hours [editions.0.salesPhases.3] [not_found.3].\n\nOn 21, 22 and 24 October 2026 Ticketmelon's page showed no list of tiers and no tier's status. That page gave 3 November at 16:00 Bangkok time as the sale's opening [not_found.9] [sellers.1].",
          },
          {
            id: "prices",
            heading: "What each pass costs",
            body: "{{until prices}}Prices from the organiser's ticket page, read 24 October 2026 [sources.s2] [prices].{{/until}}\n\n- {{until prices}}**5-Day Full Pass**, Thursday 3 to Monday 7 December: THB 12,900 in the November Sale, THB 20,000 at the door [prices.0] [prices.1].{{/until}}\n- {{until prices}}**Weekend Pass**, Saturday 5 to Monday 7 December, entry from 08:00 on Saturday: THB 11,500 in the November Sale, THB 15,000 at the door. Ticketmelon's page says Weekend Passes are limited [prices.2] [prices.3] [sellers.1].{{/until}}\n- {{until prices}}**Sunday Pass**, from 08:00 on Sunday 6 December to Monday sunrise: THB 5,000, or THB 6,500 at the door [prices.4].{{/until}}\n- {{until prices}}**Teen Pass**, ages 13 to 19, five days: THB 4,500, or THB 5,000 at the door [prices.5].{{/until}}\n- {{until prices}}**Dog Pass**, five days (the owner needs a ticket of their own): THB 1,000, or THB 1,500 at the door [prices.6].{{/until}}\n- **Family Pass**, one or two adults with one to four children or teens: 5% off every paid ticket in the group, with no application [prices.9]. Children aged 12 and under go free, with no ticket in advance, says the organiser's FAQ [age.organiser].\n\n{{until prices}}For the Sunday, Teen and Dog Passes the ticket page prints two prices, the first and the door price. It does not say which sale round the first belongs to [prices.4] [prices.5] [prices.6]. On 24 October all three were on sale (\"Add to Bag\") [prices.4] [prices.5] [prices.6]. So were two add-ons, both pre-orders: the Wonder Cup at THB 690, collected at the box office, and the Fields Kit at THB 4,500 [prices.13] [prices.14].{{/until}} Camping, Boutique Camping and the Slow Wonder cabins are sold separately from festival tickets, says the organiser's FAQ [practical.6]. They are on the [stay and travel page](/wonderfruit/en/stay/).",
          },
          {
            id: "applications",
            heading: "Passes you apply for: Intro and Youth",
            body: "If you are 20 or over and have never been to Wonderfruit, you can apply for the **Intro Pass**. {{until prices}}It costs THB 4,500 before fees and 7% VAT, says the organiser's Program Passes post.{{/until}} It gives one 24-hour entry, on a day you choose from Thursday to Sunday, with no re-entry [prices.7] [sources.s28]. The **Youth Pass** is for ages 20 to 24 and covers all five days{{until prices}}, at THB 3,900 before fees and 7% VAT{{/until}} [prices.8] [sources.s28]. Neither can be added to the bag. Their buttons read \"Apply\" and open a form on the organiser's site [sellers.0] [prices.7] [prices.8]. Both need a government-issued ID showing name and date of birth at the gate [age.organiserId.rules.5]. For the Youth Pass it must be the original you applied with [age.organiserId.rules.4]. [Apply for the Intro Pass](/go/wonderfruit-intro-pass/) [Apply for the Youth Pass](/go/wonderfruit-youth-pass/)",
          },
          {
            id: "rules",
            heading: "Before you pay: the rules",
            body: "- Four tickets per person at most, says the organiser's ticket page [purchaseRules.limit].\n- Ticketmelon takes payment in Thai baht. It says prices shown in US dollars are subject to the exchange rate [purchaseRules.vat].\n- No refunds. The organiser's terms say all ticket purchases are non-refundable, and Ticketmelon's page says \"All sales are final. No refunds or transfers.\" [purchaseRules.refunds]\n- No resale. The terms say tickets \"cannot be exchanged, resold, or transferred under any circumstances\" [purchaseRules.resale]. So there is no official resale channel. Listings on resale sites are not the organiser's.\n- All ages are welcome. Children 12 and under must be with a parent, guardian or nominated guardian. Under-20s wear a Teen wristband and cannot buy alcohol [age.organiser]. What the organiser asks to see as ID is on the [questions page](/wonderfruit/en/faq/) [age.organiserId] [age.seller].",
          },
          {
            id: "where-to-buy",
            heading: "Where to buy",
            cta: true,
            body: "You pay Ticketmelon, on ticketmelon.com [sellers.1]. You start on the organiser's ticket page, in English [sellers.0]. On 24 October 2026 its \"Add to Bag\" buttons were on the Sunday, Teen and Dog Passes, the Wonder Cup and the Fields Kit. They fill the organiser's own bag, which says at checkout \"You'll be redirected to ticketmelon.com\" [sellers.0] [prices.4] [prices.5] [prices.6]. The 5-Day Full Pass and the Weekend Pass showed \"Join the waitlist\", Intro and Youth \"Apply\", and Family \"Configure\" [sellers.0] [prices.0] [prices.1] [prices.2] [prices.3]. On Ticketmelon, the event is published under the organiser account Scratch First Co., Ltd. [sellers.1.note] [event.organiser]\n\nThe organiser names one more partner on its Hotels & Travel page: \"Wonderfruit has partnered with Agoda, our Official Travel Platform\" [sellers.2] [sellers.2.organiserWords]. The same page invites you to \"enjoy access to Wonderfruit tickets at a preferred rate\", then to explore nearby properties, local transport and flights to Thailand \"from Agoda\" [sellers.2.organiserWords]. Agoda's ticket offers could not be opened, so this guide gives no price for them and cannot say what they include [sellers.2.listing].",
          },
        ],
        faq: [
        ],
        sourcesHeading: "Sources",
        sources: "Wonderfruit [tickets](/go/wonderfruit-tickets-en/), [FAQ](/go/wonderfruit-faq/), terms and conditions, Program Passes post of 5 August 2026, The Pineapple Eyes, [Hotels & Travel](/go/wonderfruit-hotels/), the [Intro Pass](/go/wonderfruit-intro-pass/) and [Youth Pass](/go/wonderfruit-youth-pass/) applications — read 21–24 October 2026\n[Ticketmelon, Wonderfruit 2026 – The November Sale](/go/wonderfruit-ticketmelon/) — read 21–24 October 2026\nThe organiser's press release of 1 September 2026",
      },
      {
        slug: "wonderfruit/en/stay",
        createdAt: "2026-10-24T09:53:00+04:00",
        updatedAt: "2026-10-24T09:53:00+04:00",
        kind: "stay",
        label: "Stay and travel",
        crumb: "Stay and travel",
        navTitle: "Camping, pavilion tents, cabins, partner hotels and the way to The Fields",
        linkTitle: "Wonderfruit 2026 accommodation: camping, cabins, hotels and getting there",
        title: "Wonderfruit 2026: accommodation, travel — festival guide",
        description: "Wonderfruit 2026 accommodation: General Camping, Boutique Camping, Slow Wonder cabins, partner hotels and the bus from Bangkok. Festival guide.",
        h1: "Wonderfruit 2026 accommodation and travel",
        lede: "At Wonderfruit 2026, Thursday 3 to Monday 7 December at The Fields at Siam Country Club, you can sleep on site in three ways [editions.0.start] [editions.0.end] [venue.name]. The choice is your own tent in General Camping{{until prices}}, THB 1,500 a guest{{/until}}, a pavilion tent in Boutique Camping, or a Slow Wonder cabin [prices.10] [prices.12] [prices.11]. {{until prices}}Boutique Camping runs from THB 25,000 for a bed in a shared tent to THB 120,000 for a Pavilion Suite – King, and a cabin is THB 235,000 [prices.12] [prices.11]. All are before 7% VAT and fees, according to the organiser's pages (read 24 October 2026) [prices.10] [prices.11] [prices.12].{{/until}} Festival tickets are sold separately from every kind of stay, says the organiser's FAQ [practical.6]. Or you can stay at one of three partner hotels, 16 to 27 km away in Na Jomtien and Pattaya [transport.1]. The festival's own shuttles and parking were still \"Coming soon\" on 24 October [transport.0].",
        jumps: [
          { id: "general-camping", label: "General Camping" },
          { id: "boutique-camping", label: "Boutique Camping" },
          { id: "slow-wonder", label: "Slow Wonder" },
          { id: "hotels", label: "Hotels and shuttles" },
          { id: "getting-there", label: "Getting there" },
        ],
        sections: [
          {
            id: "general-camping",
            heading: "Your own tent: General Camping",
            body: "General Camping is for your own tent, for five days and four nights [prices.10]. {{until prices}}It costs THB 1,500 for one guest, before 7% VAT and fees, sold through Ticketmelon from the organiser's General Camping page, read 24 October 2026 [prices.10].{{/until}} The camping wristband gets you into the camping village. The festival itself needs its own ticket [practical.6]. Check-in opens at 16:00 on Thursday 3 December, and check-out is by 12:00 on Monday 7 December [prices.10]. The organiser does not lend or hire out tents. Pitches are first come, first served, and tent trucks and campervans are not allowed [practical.2]. The village is next to Enfold and Wonder Kitchen [practical.2].\n\nGas and electric stoves are on the organiser's list of things not allowed. Camping gear, chairs, solar chargers, trolleys, hammocks, mallets and stakes are allowed [practical.prohibited]. There are free water refill stations, and you can charge your phone there too. There is no Wi-Fi, and the signal is patchy [practical.1]. Some will count that among the attractions. [The organiser's General Camping page](/go/wonderfruit-general-camping/)",
          },
          {
            id: "boutique-camping",
            heading: "Pavilion tents: Boutique Camping",
            body: "Boutique Camping is a pavilion tent in The Hideaway or The Grove [prices.12]. {{until prices}}The prices below are from the organiser's Boutique Camping page, read 24 October 2026. They are before 7% VAT and fees, and paid through the organiser's bag, which passes you on to Ticketmelon [prices.12].{{/until}}\n\n- {{until prices}}Pavilion Suite – King in The Grove: THB 120,000. The same in The Hideaway showed \"Sold out\" [prices.12.rows.0] [prices.12.rows.1].{{/until}}\n- {{until prices}}Pavilion Suite with two queen beds, a queen and two singles, or four singles, for up to four guests: THB 90,000 [prices.12.rows.2].{{/until}}\n- {{until prices}}Classic Pavilion in The Grove or The Hideaway, for two guests, or three with an extra bed: THB 80,000 [prices.12.rows.3] [prices.12.rows.5].{{/until}}\n- {{until prices}}Shared Classic Pavilion, one single bed in a shared three-bed tent: THB 25,000 a bed [prices.12.rows.4].{{/until}}\n- {{until prices}}Extra single bed: THB 10,000. Daily breakfast for the whole stay: THB 1,700 a guest [prices.12.rows.5] [prices.12.rows.6].{{/until}}\n\nCheck-in is at 12:00 on Thursday 3 December, check-out at 12:00 on Monday 7 December [prices.12]. At check-in the organiser's FAQ asks for three things: \"Your physical ID or passport\", your Boutique Camping Entrant Code and your Wonderfruit ticket Entrant Code [prices.12.checkIn]. Guests get free dedicated parking and a private entrance [transport.4]. [The organiser's Boutique Camping page](/go/wonderfruit-boutique-camping/)",
          },
          {
            id: "slow-wonder",
            heading: "Cabins by the beach: Slow Wonder",
            body: "Slow Wonder is 26 cabins in the lower fields by the beach [prices.11] [practical.3]. {{until prices}}A cabin costs THB 235,000 for five days and four nights, before VAT and fees, according to the organiser's Slow Wonder page, read 24 October 2026. Festival tickets are not included [prices.11]. The cabin page offers up to two Full Pass add-ons at THB 10,900 each, the September price, while the ticket page priced the Full Pass at THB 12,900 for the November Sale [prices.11] [prices.0].{{/until}} Guests take breakfast at Jungle House and may bring four pre-registered guests into the village [practical.3]. Check-in is at 14:00 on Thursday 3 December, check-out at 12:00 on Monday 7 December [prices.11]. The concierge is at concierge@slow-wonder.com [practical.4]. [The organiser's Slow Wonder page](/go/wonderfruit-slow-wonder/)",
          },
          {
            id: "hotels",
            heading: "Partner hotels and their shuttles",
            body: "The organiser's Hotels & Travel page names three partner hotels [transport.1]. Mövenpick Siam Na Jomtien Pattaya is 16 km from The Fields, and Centre Point Prime Hotel Pattaya 22 km. Both have an official festival shuttle stop in the lobby. Centre Point gives 8% off with the code WDF26 [transport.1]. Royal Cliff Beach Hotel Pattaya, 27 km away, runs its own free shuttle to Wonderfruit at 15:00 and 18:00 [transport.1]. If you stay elsewhere in Pattaya, the organiser says you can reserve shuttle passes through the nearest partner hotel once the schedules are out [transport.1]. On 24 October 2026 its pages still said \"Shuttle Passes will be available soon\" [transport.0]. [The organiser's Hotels & Travel page](/go/wonderfruit-hotels/)",
          },
          {
            id: "getting-there",
            heading: "Getting there from Bangkok and Pattaya",
            body: "There are no details yet of the festival's own shuttles and parking. On 24 October 2026 the organiser's menu and ticket page both read \"Coming soon\" [transport.0]. [The organiser's ticket page](/go/wonderfruit-tickets-en/)\n\nFrom Bangkok, the organiser's FAQ lists \"private and public buses, minivans, airport limousines, trains, car rentals and more\", without recommending one [transport.2.faqList]. One way is Roong Reuang Coach's direct bus from Suvarnabhumi Airport to Pattaya Bus Terminal, about two hours by the operator's account [transport.2]. It picks up in Bangkok at Ekkamai, Mo Chit and Suvarnabhumi, and stops in Pattaya at North Pattaya and Jomtien. Fares and timetables are in its own booking system (read 21 October 2026) [transport.2].\n\nFor the last stretch to The Fields, by taxi or Grab, the organiser gives no fare. The partner hotels are 16 to 27 km from the site [transport.5]. The nearest airport is U-Tapao Rayong-Pattaya International, 39.1 km from Pattaya city by the airport's own figure [transport.3]. Its site announces routes to Surat Thani, Hua Hin and Udon Thani and names none from Bangkok (read 22 October 2026) [transport.3]. [U-Tapao airport](/go/wonderfruit-utapao/)",
          },
        ],
        faq: [
        ],
        sourcesHeading: "Sources",
        sources: "Wonderfruit [General Camping](/go/wonderfruit-general-camping/), [Boutique Camping](/go/wonderfruit-boutique-camping/), [Slow Wonder](/go/wonderfruit-slow-wonder/), [Hotels & Travel](/go/wonderfruit-hotels/), [tickets](/go/wonderfruit-tickets-en/), [FAQ](/go/wonderfruit-faq/) — read 21–24 October 2026\n[U-Tapao Rayong-Pattaya International Airport](/go/wonderfruit-utapao/) — read 22 October 2026\nRoong Reuang Coach — read 21 October 2026",
      },
      {
        slug: "wonderfruit/en/faq",
        createdAt: "2026-10-24T09:53:00+04:00",
        updatedAt: "2026-10-24T10:49:00+04:00",
        kind: "faq",
        label: "Questions",
        crumb: "FAQ",
        navTitle: "Children, ID, dogs, cash, what not to bring, refunds, visas and the season",
        linkTitle: "Wonderfruit 2026 FAQ: day pass, resale, children, dogs, visas and more",
        title: "Wonderfruit 2026 FAQ: day pass, resale — festival guide",
        description: "Wonderfruit 2026 questions: is it going ahead, who is playing, the day pass, resale, children, dogs, cash, visas and the arrival card. Festival guide.",
        h1: "Wonderfruit 2026 FAQ",
        h1Id: "wonderfruit-faq",
        lede: "The answers here come from the organiser's FAQ, ticket page, terms, Program Passes post, Directory, camping and hotel pages, from Ticketmelon, and from GOV.UK, the Immigration Bureau and the Tourism Authority of Thailand. Each answer names its source, read between 21 and 24 October 2026 [sources.s3] [sources.s2] [sources.s10] [sources.s28] [sources.s31] [sources.s4] [sources.s7] [sources.s11] [sources.s32] [sources.s34] [sources.s35]. Dates, the venue and the line-up are in the [guide](/wonderfruit/en/), prices and sale rounds on the [tickets page](/wonderfruit/en/tickets/), camping and the journey on the [stay and travel page](/wonderfruit/en/stay/).",
        sections: [
        ],
        faqFirst: true,
        faq: [
          {
            q: "Is Wonderfruit 2026 going ahead?",
            a: "Yes. The organiser's site and FAQ give 3–7 December 2026 at The Fields at Siam Country Club, Chonburi (read 24 October 2026) [editions.0]. That is Thursday to Monday [editions.0.start] [editions.0.end].",
          },
          {
            q: "What is Wonderfruit?",
            a: "A music, art and food festival, in its eleventh edition, held each December at The Fields at Siam Country Club in Pattaya [event.kind] [event.edition] [venue.name]. The organiser counts 26 named venues on site and programming 24 hours a day, though not at every venue at once [venue.stages] [lineup.announcedNote]. On its Ticketmelon page, the organiser bills it as \"99+ hours of music, art, food, wellness, nature and more\" [sellers.1.claim].",
          },
          {
            q: "Who is playing at Wonderfruit 2026?",
            a: "The first acts the organiser announced, on 1 September 2026, include Tangerine Dream, Nubya Garcia, Gerd Janson, Jane Fitz and DJ Python [lineup.announcedOn] [lineup.acts]. On 24 October 2026 its Directory listed 136 music acts, 110 of them with a day and a time. Nightmares on Wax and Marcel Dettmann are among the later names [lineup.directory] [lineup.directory.counts]. The programme page lists music under headings such as Global and Regional Sounds, Root Music and Music Guided by The Sun, the last for Solar Village [lineup.rootMusic] [lineup.solarVillage] [lineup.programmes]. More names and a few slots are in the guide's [line-up section](/wonderfruit/en/#lineup).",
          },
          {
            q: "Is Wonderfruit like Burning Man?",
            a: "The organiser's FAQ, programme and ticket pages make no such comparison [questions.en.burningMan]. What its pages do say: the site is cashless, single-use plastic and outside drinks are not allowed, water refills are free, and you can camp in The Fields [practical.0] [practical.1] [practical.2].",
          },
          {
            q: "How much is a Wonderfruit ticket?",
            a: "{{until nov}}In the November Sale, 3–9 November 2026, the 5-Day Full Pass is THB 12,900 and the Weekend Pass THB 11,500, according to the organiser's ticket page on 24 October 2026 [prices.0] [prices.2] [editions.0.salesPhases.2].{{/until}} {{until prices}}According to the organiser's ticket page, read 24 October 2026, the door price is THB 20,000 for the 5-Day Full Pass and THB 15,000 for the Weekend Pass [prices.1] [prices.3]. The Sunday Pass is THB 5,000, or THB 6,500 at the door, and the Teen Pass THB 4,500, or THB 5,000 at the door [prices.4] [prices.5]. Ticketmelon's page says its prices do not include 7% VAT and transaction fees [purchaseRules.vat].{{/until}}",
          },
          {
            q: "Is there a Wonderfruit day pass?",
            a: "The Sunday Pass is the one ticket for a single day. It runs from 08:00 on Sunday 6 December to Monday sunrise{{until prices}}, at THB 5,000, or THB 6,500 at the door, on the organiser's ticket page (read 24 October 2026){{/until}} [prices.4]. First-timers aged 20 and over can also apply for the Intro Pass, one 24-hour entry on a day from Thursday to Sunday [prices.7].",
          },
          {
            q: "What time does the November Sale open in London and Sydney?",
            a: "{{until nov}}At 16:00 Bangkok time on Tuesday 3 November 2026, which is 09:00 in London and 20:00 in Sydney and Melbourne. It runs to Monday 9 November [editions.0.salesPhases.2] [sellers.1].{{/until}}",
          },
          {
            q: "Is there a promo code for Wonderfruit tickets?",
            a: "None, as of 24 October 2026. The organiser's ticket page carried no code, and Ticketmelon's page had a \"Promo Code\" box but no code to put in it [not_found.promoCode]. The one public code is WDF26, 8% off a room at Centre Point Prime Hotel Pattaya, a partner hotel. It is not a ticket code [transport.1] [not_found.promoCode].",
          },
          {
            q: "Where exactly is Wonderfruit?",
            a: "At The Fields at Siam Country Club in Pattaya, Chonburi province. The organiser writes it as \"The Fields at Siam Country Club, Chonburi, Thailand\" [venue.address] [venue.city] [venue.province]. Its FAQ links a map point at 12.9027695, 100.9998528 [venue.coordsNote].",
          },
          {
            q: "How do I get to Wonderfruit from Bangkok?",
            a: "The organiser's FAQ lists buses, minivans, airport limousines, trains and car rentals, without picking one [transport.2.faqList]. Roong Reuang Coach runs a direct bus from Suvarnabhumi Airport to Pattaya Bus Terminal, about two hours by its own account [transport.2]. The festival's own shuttles and parking were \"Coming soon\" on 24 October 2026 [transport.0]. Two partner hotels have an official shuttle stop in the lobby, and Royal Cliff Beach Hotel Pattaya runs its own at 15:00 and 18:00 [transport.1].",
          },
          {
            q: "Do I need a visa for Thailand, and what is the arrival card?",
            a: "Since 15 September 2026, passports of 60 countries and territories can enter without a visa for tourism and stay up to 30 days, says the Tourism Authority of Thailand. The UK, the US, Australia and every EU member state are among them [entry.visaExemption] [entry.visaExemption.value]. GOV.UK asks British visitors for a passport valid for at least six months after arrival, with a blank page [entry.uk]. You also fill in the Thailand Digital Arrival Card in the three days before you arrive, on the Immigration Bureau's site, which says no fee is required [entry.tdac] [entry.uk]. The details are under [Before you fly](/wonderfruit/en/#before-you-fly).",
          },
          {
            q: "What are the gate times, and is there re-entry?",
            a: "On Thursday 3 December the gates open at 16:00, and from Friday to Sunday at 08:00. Last entry is at midnight on each of those days, and Monday 7 December is the last morning [editions.0.hours.0] [editions.0.hours.1] [editions.0.hours.2] [editions.0.hours.3] [editions.0.hours.4]. You can come back in, except from midnight to 08:00, when the gates admit nobody. If you leave after midnight on Sunday 6 December, you cannot return on Monday 7 [editions.0.hoursNote]. The Intro Pass allows no re-entry at all [prices.7]. The organiser says the times may change [editions.0.hoursNote].",
          },
          {
            q: "Can children come to Wonderfruit?",
            a: "Yes. \"All ages are welcome\", says the organiser. Children 12 and under go free with no ticket in advance, but must be with a parent, guardian or nominated guardian [age.organiser]. Ticketmelon's page puts it as under-13s with a parent or guardian [age.seller]. Ages 13 to 19 take the Teen Pass. Everyone under 20 wears a Teen wristband and cannot buy alcohol [prices.5] [age.organiser]. A Family Pass gives 5% off for one or two adults with one to four children or teens [prices.9].",
          },
          {
            q: "Do I need ID at Wonderfruit?",
            a: "Have it with you. The organiser's FAQ says \"Guests will be required to show their ID upon request as proof of age at any time\" [age.organiserId.rules.0]. The Teen Pass says \"Valid ID required on entry\" [age.organiserId.rules.1]. The terms ask each Intro and Youth Pass holder for a government-issued ID with name and date of birth, and a Youth Pass holder can only enter with the original ID used to apply [age.organiserId.rules.5] [age.organiserId.rules.4]. Ticketmelon's page says \"ID check required\" [age.seller]. Boutique Camping check-in asks for \"Your physical ID or passport\" [age.organiserId.rules.6].",
          },
          {
            q: "Can I bring my dog?",
            a: "Yes, with a Dog Pass for the five days{{until prices}}, THB 1,000, or THB 1,500 at the door, on the organiser's ticket page (read 24 October 2026){{/until}}. The owner needs a festival ticket too [prices.6]. The organiser's list bars animals other than dogs with a Dog Pass [practical.prohibited].",
          },
          {
            q: "Is Wonderfruit cashless?",
            a: "Yes. You pay with a wristband you top up, and there are ATMs on site for that [practical.0]. The organiser warns that \"top-ups made using a Credit Card are non-refundable, so having some cash is always a good idea\" [practical.0].",
          },
          {
            q: "What can't I bring to Wonderfruit?",
            a: "The organiser's list for the festival and General Camping is long [practical.prohibited]. It bars glass of any kind, single-use plastics, and outside food and drink. The exceptions for food are baby formula, and food for campers with dietary requirements [practical.prohibited] [practical.1]. It also bars gas or electric stoves, drones, selfie sticks, hoverboards, bicycles, skateboards, rollerblades, totems, large signs and Native American headdresses. Alcohol, nitrous oxide and narcotics are confiscated, and \"large amounts will be referred to police\". Weapons are banned. Nasal or throat sprays need a prescription. The list also names \"Weed exceeding a palm-sized amount (for personal use only)\" [practical.prohibited]. Allowed: prescribed medicine with your name on it, sealed supplements, camping gear, chairs, solar chargers, trolleys, hammocks, mallets and stakes [practical.prohibited].",
          },
          {
            q: "Can I bring a camera or a drone?",
            a: "Not without the organiser's permit. Its FAQ says \"Cameras and drones are forbidden unless you have applied for and received a permit from Wonderfruit in advance.\" The camping page's list bars professional camera equipment but allows a DSLR, with extra lenses and tripods needing approval [practical.prohibited].",
          },
          {
            q: "Is there Wi-Fi or phone charging?",
            a: "There is no Wi-Fi, and the organiser warns that the signal is patchy. You can charge your phone at the water refill stations [practical.1].",
          },
          {
            q: "Can I get a refund, or resell my ticket?",
            a: "No. The organiser's terms say all ticket purchases are non-refundable, and that tickets \"cannot be exchanged, resold, or transferred under any circumstances\" [purchaseRules.refunds] [purchaseRules.resale]. Ticketmelon's page says the same: \"All sales are final. No refunds or transfers.\" [purchaseRules.refunds] There is no official resale channel.",
          },
          {
            q: "How many people go to Wonderfruit?",
            a: "The organiser's pages give no figure. The Standard reported more than 25,000 at the 2024 edition [editions.2].",
          },
          {
            q: "Was Wonderfruit 2025 cancelled?",
            a: "No. The tenth edition ran from Thursday 11 to Monday 15 December 2025, according to Time Out Bangkok [editions.1]. The organiser posted its Saturday highlights on 13 December 2025 [sources.s29].",
          },
          {
            q: "Why is Wonderfruit a week early this year?",
            a: "The 2026 edition is a week earlier than the usual second weekend of December, and the organiser's pages give no reason [editions.0.note] [not_found.6]. Time Out Asia, on 9 March 2026, linked the move to Tomorrowland's Pattaya debut on the usual weekend [editions.0.note] [sources.s18].",
          },
          {
            q: "What is Wonderfruit Kyoto?",
            a: "Wonderfruit Chapters Kyoto, a separate gathering in Kyoto, Japan, on 22–25 October 2026, with a site of its own at chapterskyoto.co [sideEvents.0] [sideEvents.0.faqDates]. The organiser's FAQ says the main festival stays in Chonburi [sideEvents.0].",
          },
          {
            q: "What else is on after the festival?",
            a: "The organiser's FAQ lists Camp Wonder, 18–23 December 2026, Field.D, 20 December 2026, and Din Daen, 29–31 January 2027. Its site menu also names Open Fields, \"Dec 2026–Jan 2027\" [seasonEvents]. On 24 October 2026 the organiser gave names and dates only, with no place, price or page for any of them [seasonEvents].",
          },
          {
            q: "When is the full Wonderfruit 2026 schedule out?",
            a: "Partly now. On 24 October 2026 the organiser's Directory, headed \"FIRST RELEASE\", gave a day and a time for 110 of its 136 music acts [lineup.directory] [lineup.directory.counts]. The FAQ says the full schedule will be released on the Wonder App \"later in the year\" [lineup.announcedNote.schedule]. The Directory dates a slot by the day it starts, so \"Sat 5 Dec 00:00\" falls in the small hours after Friday night [lineup.directory].",
          },
          {
            q: "When is Wonderfruit 2027?",
            a: "The organiser has not announced it [questions.8]. Din Daen, 29–31 January 2027, is on its list of the season's other events, not announced as Wonderfruit 2027 [seasonEvents].",
          },
          {
            q: "How do I contact the organiser?",
            a: "By email at info@wonderfruit.co, says the organiser's FAQ. For the Slow Wonder cabins, write to concierge@slow-wonder.com [practical.4].",
          },
        ],
        sourcesHeading: "Sources",
        sources: "Wonderfruit [FAQ](/go/wonderfruit-faq/), [tickets](/go/wonderfruit-tickets-en/), terms and conditions, Program Passes post, [General Camping](/go/wonderfruit-general-camping/), [Hotels & Travel](/go/wonderfruit-hotels/), [Directory](/go/wonderfruit-directory/), Wonderpost, [Wonderfruit Chapters Kyoto](/go/wonderfruit-kyoto/) — read 21–24 October 2026\n[Ticketmelon, Wonderfruit 2026 – The November Sale](/go/wonderfruit-ticketmelon/) — read 21–24 October 2026\n[GOV.UK](/go/wonderfruit-gov-uk/), [Thailand Digital Arrival Card](/go/wonderfruit-tdac/), [Tourism Authority of Thailand](/go/wonderfruit-tat-visa/) — read 24 October 2026\nTime Out Bangkok, 29 May 2025, Time Out Asia, 9 March 2026, The Standard, 25 December 2024 — read 21–22 October 2026",
      },
    ],
  },
];
