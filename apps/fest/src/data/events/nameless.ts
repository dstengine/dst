// Nameless: the event as the scout's sheet has it, and its guide in the
// Italian of Italy.
//
// Generated once from the card (~/mind/ai/dubai/events/tasks/
// 2026-11-19-nameless-it.md) and edited by hand from here on. The sheet is
// section 1's YAML, values verbatim, with the scout's round 2 edited into it
// as the scout wrote it; the card's working notes (the segment, the SERP,
// the reader questions, the archive's paths) are no page's facts and stay on
// the card. The copy is the writer's round 1, with round 2's blocks and
// round 3's changes over it, and the four lines the session set after gate 2
// (W10 and the native reader's round-3 notes 1, 3 and 4). The build's
// placings, not the copy's words:
// - the line on why the guide is in Italian is the main page's last
//   section, "Perché questa guida in italiano", before the questions;
// - each "Link: A · B" is a paragraph of its section, each label its /go/
//   hop;
// - each arrow is a link on the phrase the writer gave for it (anchors);
// - the writer's jump ids "domande" and "fonti" are the template's
//   "questions" and "sources", under the writer's labels;
// - the {{until prices}} spans hold every figure in euro and the sentences
//   that name it, and {{until residenti}} the residents' discount, its jump
//   and its link: both go on 31 December 2026 (expires, the readings of 19
//   November and 42 days; the organiser's form closes that night at 23:59).
//
// Nameless is two events under one name (editionsNote), each with its own
// dates, place and passes, so each prints its MusicEvent on its own page:
// the event's markup is the June festival's, on the main page, and the
// Winter page carries Barzio's. Each sells its passes through Ciaotickets,
// the only seller the organiser links, until its own last day (markup.run).
// The Forever Pass spans both and belongs to neither, and the residents'
// form is a request, not a sale, so neither is an Offer (the SEO lead's
// gate-2 note 7).
//
// The layout is what tools/record-blocks.mjs reads: each record opens on a
// line that is a brace at two spaces (a guide's pages at six), its slug on
// the next line, and both dates on lines of their own. A sheet edit is the
// event's, and moves every page through `with` in ../../dated.ts.
//
// No @dst/* import and nothing but erasable TypeScript: tools/lastmod.mjs
// loads this file through dated.ts with Node's type stripping.
import type { FestEvent, Guide } from "../types";
export const events: FestEvent[] = [
  {
    slug: "nameless",
    createdAt: "2026-11-19T14:13:00+04:00",
    updatedAt: "2026-11-19T14:13:00+04:00",
    name: "Nameless",
    edition: {
      start: "2027-02-13",
      end: "2027-06-06",
    },
    readOverrides: {
      editionsNote: "2026-11-19",
      pricesNote: "2026-11-19",
      tiersNote: "2026-11-19",
    },
    markup: {
      startDate: "2027-06-04T14:00",
      endDate: "2027-06-06T23:00",
      timeZone: "Europe/Rome",
      run: "editions.1",
      venue: "venues.0",
      address: {
        streetAddress: "Viale Don Giovanni Ticozzi",
        addressLocality: "Lecco",
        addressRegion: "LC",
        addressCountry: "IT",
      },
      placeName: "Area del Bione",
      organizer: {
        name: "Nameless Festival S.r.l.",
        url: "https://www.namelessfestival.it/",
      },
      offers: [
        {
          name: "General Admission 3 Days Festival Pass",
          seller: "Ciaotickets",
          go: "ciaotickets",
          price: {
            key: "prices.0",
            currency: "EUR",
          },
        },
        {
          name: "VIP 3 Days Festival Pass",
          seller: "Ciaotickets",
          go: "ciaotickets",
          price: {
            key: "prices.1",
            currency: "EUR",
          },
        },
        {
          name: "Biglietto di un giorno, prezzo minimo",
          seller: "Ciaotickets",
          go: "ciaotickets",
          price: {
            key: "prices.2",
            currency: "EUR",
          },
        },
      ],
      performers: [
        {
          key: "lineup.0.acts.0",
          name: "David Guetta",
        },
      ],
    },
    sheet: {
      event: {
        name: "Nameless Festival",
        slug: "nameless",
        organiser: "Nameless Festival S.r.l., Via dei Pescatori 27, 23900 Lecco",
        kind: "music festival",
        genre: "electronic music and hip hop / urban (organiser: 'l'evento italiano di riferimento per la musica elettronica e l'hip hop')",
        since: 2013,
        sinceSource: "s1",
        readOn: "2026-11-19",
      },
      editionsNote: "two events a year under one brand, each with its own site section, venue and tickets: Nameless Winter (two days, February, Barzio, Valsassina) and Nameless Festival (three days, early June, Lecco). A Forever Pass covers both.",
      editions: [
        {
          key: "winter",
          name: "Nameless Winter 2027",
          year: 2027,
          start: "2027-02-13",
          end: "2027-02-14",
          days: "sabato 13 e domenica 14 febbraio 2027, due giorni",
          status: "announced",
          ticketState: "on sale (organiser: Early Tickets; Ciaotickets: Super Early Ticket - 2nd release)",
          venue: "v2",
          times: {
            start: "2027-02-13T14:00:00+01:00",
            end: "2027-02-14T23:00:00+01:00",
            timezone: "Europe/Rome",
            note: "live_date and live_end_date in the organiser's page data; the FAQ text, shared word for word with the summer FAQ, says 'inizia tutti i giorni alle 14 e chiude alle 24' - print the FAQ's 14-24 only as the organiser's general rule, not as Winter's confirmed hours",
            source: "s6",
            readOn: "2026-11-19",
          },
          lineup: "none announced (the Winter page has no line-up block)",
          source: "s6",
          readOn: "2026-11-19",
        },
        {
          key: "festival",
          name: "Nameless Festival 2027",
          year: 2027,
          start: "2027-06-04",
          end: "2027-06-06",
          days: "venerdì 4, sabato 5 e domenica 6 giugno 2027, tre giorni",
          status: "announced",
          ticketState: "on sale: 3-day GA and VIP passes, single days, residents' discount",
          venue: "v1",
          times: {
            daily: "14:00-24:00",
            start: "2027-06-04T14:00:00+02:00",
            end: "2027-06-06T23:00:00+02:00",
            timezone: "Europe/Rome",
            note: "FAQ: 'Il festival inizia tutti i giorni alle 14 e chiude alle 24'; the page data's live_end_date says 23:00 on the 6th; Ciaotickets lists each day at 14:00",
            source: "s4",
            readOn: "2026-11-19",
          },
          source: "s19",
          readOn: "2026-11-19",
        },
        {
          year: 2026,
          key: "festival-2026",
          start: "2026-05-30",
          end: "2026-06-01",
          status: "past",
          venue: "v1",
          note: "first summer edition at the Bione in Lecco ('La nuova location al Bione di Lecco')",
          source: "s15",
          readOn: "2026-11-19",
        },
        {
          year: 2026,
          key: "winter-2026",
          start: "2026-02-14",
          end: "2026-02-15",
          status: "past",
          place: "Barzio",
          note: "the organiser's site title still reads 'Nameless Festival | 14, 15 February 2026 Barzio | 30 May - 1 June 2026 Lake Como'; the Winter page shows 'Partner Winter 2026'",
          source: "s1",
          readOn: "2026-11-19",
        },
      ],
      history: [
        {
          what: "places: Lecco 2013-2014; Barzio (Valsassina, Pratobuscante area) 2015-2019; Annone di Brianza 2022-2025 (with Molteno and Bosisio Parini); the Bione in Lecco since 2026",
          source: "s16",
          readOn: "2026-11-19",
        },
        {
          what: "Barzio hosted the festival 2015-2019 and is the home of Winter ('Nel cuore della Valsassina, dove tutto ha avuto inizio')",
          source: "s8",
          readOn: "2026-11-19",
        },
        {
          what: "2020 and 2021 cancelled (Covid-19)",
          source: "s16",
          readOn: "2026-11-19",
        },
        {
          what: "the organiser's timeline, guests / stages / artists by year (organiser's figures): 2014 9,000/1/20; 2015 15,000/2/43; 2016 24,000/2/51; 2017 30,000/2/54; 2018 40,000/3/63; 2019 54,000/3/70; 2022 90,000/4/110; 2023 100,000/4/120; 2024, 2025 and 2026 100,000/5/130 each",
          source: "s19",
          readOn: "2026-11-19",
        },
        {
          what: "renamed from Nameless Music Festival to Nameless Festival from 2023",
          source: "s16",
          readOn: "2026-11-19",
        },
        {
          what: "2026 guests named by Wikipedia: Calvin Harris, John Summit, TonyPitony, Fisher; 2025: Armin van Buuren, Martin Garrix, The Chainsmokers",
          source: "s16",
          readOn: "2026-11-19",
        },
      ],
      venues: [
        {
          key: "v1",
          name: "Bione, Lecco (area del Bione)",
          address: "Viale Don Giovanni Ticozzi, Lecco (LC)",
          lat: 45.8357381,
          lon: 9.4070082,
          city: "Lecco",
          region: "Lombardia",
          country: "IT",
          timezone: "Europe/Rome",
          setting: "on the lake (organiser: 'affacciata direttamente sul Lago di Como'; Wikipedia: on the shore of the lago di Garlate, in the Bione district) near Lecco centre and Lecco Maggianico station (the organiser writes 'Lecco-Maggianico'; RFI and Trenord write 'Lecco Maggianico', see stationName)",
          addressSource: "s10",
          coordsSource: "s17",
          source: "s3",
          readOn: "2026-11-19",
        },
        {
          key: "v2",
          name: "Nameless Winter, Barzio",
          address: "Via Fornaci Merlo, Barzio (LC)",
          lat: 45.9423576,
          lon: 9.4518142,
          city: "Barzio",
          region: "Lombardia",
          country: "IT",
          timezone: "Europe/Rome",
          setting: "Valsassina, in the mountains above Lecco; the organiser gives no venue name beyond Barzio",
          addressSource: "s11",
          coordsSource: "s18",
          source: "s8",
          readOn: "2026-11-19",
        },
      ],
      sellers: [
        {
          name: "Ciaotickets (shop of Nameless)",
          url: "https://nameless.ciaotickets.com/ecommerce/",
          official: true,
          note: "the only ticket link on the organiser's site, for every tier of both editions; single days open through a Queue-it waiting room (https://ciaotickets.queue-it.net/?c=ciaotickets&e=nmf27d123)",
          source: "s2",
          readOn: "2026-11-19",
        },
        {
          name: "Ciaotickets, Nameless Festival page",
          url: "https://www.ciaotickets.com/it/namelessfestival",
          official: true,
          note: "lists the three single days 4, 5, 6 June 2027, the 2027 Festival pass and the Winter Edition pass",
          source: "s9",
          readOn: "2026-11-19",
        },
        {
          name: "Residents' discount form (organiser)",
          url: "https://forms.gle/h4tsNb6SPRzcAkUb6",
          official: true,
          note: "'Sconto Residenti' 3-day GA pass is requested through this Google Form; the tier's deadline in the page data is 2026-12-31T23:59:59; which towns qualify is not on the page",
          source: "s2",
          readOn: "2026-11-19",
        },
      ],
      prices: [
        {
          label: "Nameless Festival 2027, General Admission, 3 Days Festival Pass ('Regular')",
          amount: 139,
          currency: "EUR",
          seller: "Ciaotickets",
          source: "s2",
          readOn: "2026-11-19",
        },
        {
          label: "Nameless Festival 2027, VIP, 3 Days Festival Pass ('Regular')",
          amount: 349,
          currency: "EUR",
          seller: "Ciaotickets",
          source: "s2",
          readOn: "2026-11-19",
        },
        {
          label: "Nameless Festival 2027, single day ('Super Early', from)",
          amount: 79,
          from: true,
          currency: "EUR",
          seller: "Ciaotickets",
          source: "s2",
          readOn: "2026-11-19",
        },
        {
          label: "Nameless Winter 2027, General Admission, 2 Giorni Festival Pass ('Early Tickets')",
          amount: 59,
          currency: "EUR",
          seller: "Ciaotickets",
          source: "s7",
          readOn: "2026-11-19",
        },
        {
          label: "Nameless Winter 2027, VIP, 2 Giorni Festival Pass ('Early Tickets')",
          amount: 199,
          currency: "EUR",
          seller: "Ciaotickets",
          source: "s7",
          readOn: "2026-11-19",
        },
        {
          label: "Forever Pass, Winter + Festival, 3+2 giorni (from)",
          amount: 198,
          from: true,
          currency: "EUR",
          seller: "Ciaotickets",
          source: "s7",
          readOn: "2026-11-19",
        },
      ],
      pricesFees: {
        text: "Al prezzo indicato potrebbero essere applicate ulteriori commissioni",
        seller: "Ciaotickets",
        sources: ["s10", "s11", "s12"],
        where: "s12: under the price box of the single-days page; s10 (Festival pass) and s11 (Winter pass): under the 'Info prezzi' tariff table, which is in the page source and shown by JavaScript",
        readOn: "2026-11-19",
      },
      pricesNote: "tier names differ between the two: the organiser calls the 3-day passes 'Regular' and Winter 'Early Tickets', while Ciaotickets lists 'GA/VIP - Super Early Ticket - 2nd/3rd release' (Festival) and '2nd release' (Winter) and shows no amounts without JavaScript. Print the organiser's figures and names, with the organiser as the source and Ciaotickets as the seller. Google's snippet of 21 Oct-era pages still says Super Early €119: that tier is gone.",
      tiers: [
        {
          edition: "festival",
          name: "General Admission",
          includes: "Accesso a tutti gli stage; Accesso a tutte le aree (eccetto VIP)",
          source: "s2",
          readOn: "2026-11-19",
        },
        {
          edition: "festival",
          name: "VIP",
          includes: "GA plus Accesso a tutte le aree VIP; Nameless Club; Priority line e ingresso dedicato; VIP Parking; Aree premium food & bar; VIP toilets",
          source: "s2",
          readOn: "2026-11-19",
        },
        {
          edition: "winter",
          name: "General Admission",
          includes: "Accesso a tutti gli stage; Accesso a tutte le aree (eccetto VIP)",
          source: "s7",
          readOn: "2026-11-19",
        },
        {
          edition: "winter",
          name: "VIP",
          includes: "GA plus Accesso a tutte le aree VIP; Priority line e ingresso dedicato; VIP Parking; Aree premium bar; VIP toilets",
          note: "the organiser's Winter table has no Nameless Club row and says 'Aree premium bar', not 'food & bar'",
          source: "s7",
          readOn: "2026-11-19",
        },
      ],
      tiersSeller: [
        {
          editions: ["festival", "winter"],
          name: "General",
          includes: "Accesso a tutti gli stage e a tutte le aree, a eccezione di quelle VIP.",
          sources: ["s10", "s11"],
          readOn: "2026-11-19",
        },
        {
          editions: ["festival", "winter"],
          name: "VIP",
          includes: "Accesso a tutti gli stage e a tutte le aree, comprese quelle VIP; Accesso al Nameless Club; VIP Area Access; VIP parking; Aree premium food e bar; VIP toilette; Ingresso dedicato tramite priority line; Tutto ciò che è incluso nel biglietto GA",
          sources: ["s10", "s11"],
          readOn: "2026-11-19",
        },
      ],
      tiersNote: "Ciaotickets prints the same VIP list word for word on the Festival pass (s10) and the Winter pass (s11). For Winter it differs from the organiser's own Winter table (s7): the seller lists 'Accesso al Nameless Club' and 'Aree premium food e bar', the organiser lists neither (it has 'Aree premium bar'). For the Festival the two agree. Neither says whether a Nameless Club exists at Barzio: print the difference as who says what, not 'only in summer'.",
      payment: {
        atSeller: "Ciaotickets accepts Scalapay (three instalments over three months), Carta della Cultura Giovani, Carta del merito and Carta del Docente for the single days",
        source: "s12",
        onSite: "cashless: cards or phone, 'Non sono accettati contanti'",
        onSiteSource: "s4",
        onSiteSourceWinter: "s22",
        readOn: "2026-11-19",
      },
      ticketRules: {
        delivery: {
          organiser: {
            text: "the ticket's QR code is shown at the entrance ('presentare il QR code del biglietto (consigliato in formato digitale)'; FAQ: 'sarà sufficiente mostrare il QR code del tuo biglietto')",
            sources: ["s5", "s4"],
            winterSources: ["s23", "s22"],
            readOn: "2026-11-19",
          },
          seller: {
            text: "'BIGLIETTO ELETTRONICO': shown at the entrance from the phone or printed at home ('direttamente dal tuo cellulare, o stamparlo con la stampante di casa'); no courier delivery",
            sources: ["s10", "s11", "s12"],
            readOn: "2026-11-19",
          },
        },
        reentry: {
          text: "one entry per day: 'Una volta usciti, non è possibile rientrare nello stesso giorno'",
          source: "s5",
          winterSource: "s23",
          readOn: "2026-11-19",
        },
        dayTicket: {
          text: "a day ticket is valid only for the date bought and cannot be changed",
          source: "s5",
          readOn: "2026-11-19",
        },
      },
      age: {
        min: 18,
        source: "s4",
        winterSource: "s22",
        readOn: "2026-11-19",
        rules: [
          {
            what: "minimum age 18 ('18 anni compiuti'); under 18 only inside with a parent or legal guardian",
            source: "s4",
            winterSource: "s22",
            alsoSeller: ["s10", "s11"],
            readOn: "2026-11-19",
          },
          {
            what: "the legal guardian cannot be named by self-declaration or temporary declaration; only parents or legal guardians may accompany minors",
            source: "s4",
            winterSource: "s22",
            readOn: "2026-11-19",
          },
          {
            what: "children up to 10 years old ('fino ai 10 anni compiuti') do not pay; everyone over 10 needs a ticket",
            source: "s4",
            winterSource: "s22",
            readOn: "2026-11-19",
          },
          {
            what: "the minor and the parent or guardian both with a valid ticket ('entrambi con biglietto valido')",
            source: "s5",
            winterSource: "s23",
            alsoSeller: ["s10", "s11"],
            sellerWords: "anch'esso munito di regolare biglietto",
            readOn: "2026-11-19",
          },
          {
            what: "alcohol only over 18, 'previa verifica del documento d'identità'",
            source: "s5",
            winterSource: "s23",
            readOn: "2026-11-19",
          },
        ],
        note: "the FAQ (s4, s22) and the Regolamento (s5, s23) are different pages: cite 'FAQ e Regolamento' whenever the guardian's ticket or the ID check is in the sentence. Winter's FAQ and Regolamento are word for word June's apart from the header (diffed 2026-11-19).",
      },
      lineup: [
        {
          edition: "festival",
          acts: ["David Guetta (domenica 6 giugno 2027)"],
          announcedOn: "2026-11-03 (first media reports; the organiser's own post not read)",
          source: "s19",
          readOn: "2026-11-19",
        },
        {
          edition: "winter",
          acts: [],
          note: "not announced",
          source: "s6",
          readOn: "2026-11-19",
        },
      ],
      transport: [
        {
          how: "Train to Lecco: direct or regional trains from Milano Centrale, Milano Porta Garibaldi, Bergamo, Como, Sondrio, Colico and Varenna arrive in the centre of Lecco; timetables and tickets on Trenord",
          source: "s14",
          readOn: "2026-11-19",
        },
        {
          how: "The Bione is close to Lecco centre and to Lecco Maggianico railway station, and is directly linked by public transport (organiser; its page writes 'Lecco-Maggianico')",
          source: "s3",
          readOn: "2026-11-19",
        },
        {
          how: "Car: SS36 (direction Colico) from Milan; SP639 from Bergamo; 'è possibile utilizzare i parcheggi del centro di Lecco' (Lecco Tourism, for Lecco in general, no car park named); Lecco has limited-traffic zones (ZTL); VIP passes include VIP parking",
          source: "s14",
          vipParkingSource: ["s2", "s7"],
          readOn: "2026-11-19",
        },
        {
          how: "Camper: the Lecco camper area is at the Bione, via Toscanini at the corner of via Ticozzi-Brodolini",
          source: "s14",
          readOn: "2026-11-19",
        },
        {
          how: "Bus to Lecco: C40 (ASF Autolinee) from Como via Erba; from Bellagio bus 10 of Linee Lecco (s14 writes 'LineeLecco'; see busOperatorName)",
          source: "s14",
          readOn: "2026-11-19",
        },
        {
          how: "Winter: Barzio is in the Valsassina; bus D35 (Lecco Trasporti) links the Valsassina with Lecco",
          source: "s14",
          readOn: "2026-11-19",
        },
      ],
      stationName: {
        use: "Lecco Maggianico",
        evidence: "RFI's station page title and heading 'Lecco Maggianico' (s25); Trenord's station list 'LECCO MAGGIANICO' (s26); the organiser alone writes 'Lecco-Maggianico' (s3)",
        sources: ["s25", "s26"],
        readOn: "2026-11-19",
      },
      busOperatorName: {
        use: "Linee Lecco",
        evidence: "the operator writes both: 'Linee Lecco S.p.a.' / 'Linee Lecco S.p.A.' as its company name (footer with P.IVA 02320500131, its April 2026 accounts release, running text) and 'LineeLecco' as its brand (page titles, logo, 'Viaggia sulle tratte LineeLecco'); Lecco Tourism (s14) writes 'LineeLecco'. Either is the operator's own; 'Linee Lecco' is its legal name",
        sources: ["s24"],
        readOn: "2026-11-19",
      },
      onSite: [
        {
          what: "official app (iOS, Android): line-up, live programme, interactive map",
          source: "s19",
          readOn: "2026-11-19",
        },
        {
          what: "virtual assistant 'Enne' on WhatsApp +39 392 027 7000",
          source: "s4",
          readOn: "2026-11-19",
        },
        {
          what: "lost & found point on the map; areas reserved for disabled visitors",
          source: "s4",
          readOn: "2026-11-19",
        },
        {
          what: "forbidden: outside food and drink, umbrellas, chairs, sleeping bags, professional cameras and drones (GoPro allowed), selfie sticks, bicycles, animals except assistance animals, among others",
          source: "s5",
          readOn: "2026-11-19",
        },
      ],
      sources: {
        s1: {
          label: "Nameless Festival, official site (home)",
          url: "https://www.namelessfestival.it/",
          kind: "organiser",
        },
        s2: {
          label: "Nameless Festival 2027, Biglietti",
          url: "https://www.namelessfestival.it/festival-2027/biglietti",
          kind: "organiser",
        },
        s3: {
          label: "Nameless Festival 2027, Location",
          url: "https://www.namelessfestival.it/festival-2027/location",
          kind: "organiser",
        },
        s4: {
          label: "Nameless Festival 2027, FAQ",
          url: "https://www.namelessfestival.it/festival-2027/faq",
          kind: "organiser",
        },
        s5: {
          label: "Nameless Festival 2027, Regolamento",
          url: "https://www.namelessfestival.it/festival-2027/regolamento",
          kind: "organiser",
        },
        s6: {
          label: "Nameless Winter 2027, official page",
          url: "https://www.namelessfestival.it/winter-2027",
          kind: "organiser",
        },
        s7: {
          label: "Nameless Winter 2027, Biglietti",
          url: "https://www.namelessfestival.it/winter-2027/biglietti",
          kind: "organiser",
        },
        s8: {
          label: "Nameless Winter 2027, Location",
          url: "https://www.namelessfestival.it/winter-2027/location",
          kind: "organiser",
        },
        s9: {
          label: "Ciaotickets, Nameless Festival",
          url: "https://www.ciaotickets.com/it/namelessfestival",
          kind: "seller",
        },
        s10: {
          label: "Ciaotickets, abbonamento Nameless Festival 2027",
          url: "https://www.ciaotickets.com/it/abbonamenti/nameless-festival-2027",
          kind: "seller",
        },
        s11: {
          label: "Ciaotickets, abbonamento Nameless Winter Edition 2027",
          url: "https://www.ciaotickets.com/it/abbonamenti/nameless-winter-edition-2027",
          kind: "seller",
        },
        s12: {
          label: "Ciaotickets, Nameless Festival Lecco, single days",
          url: "https://www.ciaotickets.com/it/biglietti/nameless-festival-lecco",
          kind: "seller",
        },
        s13: {
          label: "Ciaotickets, Nameless shop",
          url: "https://nameless.ciaotickets.com/ecommerce/",
          kind: "seller",
        },
        s14: {
          label: "Lecco Tourism (Comune di Lecco), Come arrivare",
          url: "https://leccotourism.it/info-di-viaggio/come-arrivare/",
          kind: "public body",
        },
        s15: {
          label: "Lecco Tourism (Comune di Lecco), Nameless Festival 2026",
          url: "https://leccotourism.it/nameless-festival/",
          kind: "public body",
        },
        s16: {
          label: "Wikipedia (it), Nameless Festival",
          url: "https://it.wikipedia.org/wiki/Nameless_Festival",
          kind: "reference",
        },
        s17: {
          label: "Nameless Festival on Google Maps (pin linked from the organiser's location page)",
          url: "https://maps.app.goo.gl/dQzS9QPP3bFybbm4A",
          kind: "organiser",
        },
        s18: {
          label: "Nameless Winter on Google Maps (pin linked from the organiser's Winter location page)",
          url: "https://maps.app.goo.gl/BmestK5cu4akcoNi8",
          kind: "organiser",
        },
        s19: {
          label: "Nameless Festival 2027, official page (line-up, timeline, app)",
          url: "https://www.namelessfestival.it/festival-2027",
          kind: "organiser",
        },
        s20: {
          label: "Nameless Festival, residents' discount form",
          url: "https://forms.gle/h4tsNb6SPRzcAkUb6",
          kind: "organiser",
          note: "linked from s2; the form itself not read",
        },
        s21: {
          label: "extra! music magazine, 'Primi nomi per l'edizione 2027' (3 Nov 2026)",
          url: "https://xtm.it/primi-nomi-per-ledizione-2027",
          kind: "media",
          note: "lead only, for the line-up announcement date; not opened at its URL, read in Google's result",
        },
        s22: {
          label: "Nameless Winter 2027, FAQ",
          url: "https://www.namelessfestival.it/winter-2027/faq",
          kind: "organiser",
          note: "FAQPage JSON-LD identical to s4 on 2026-11-19",
        },
        s23: {
          label: "Nameless Winter 2027, Regolamento",
          url: "https://www.namelessfestival.it/winter-2027/regolamento",
          kind: "organiser",
          note: "rules identical to s5 on 2026-11-19",
        },
        s24: {
          label: "Linee Lecco S.p.A., Trasporto pubblico locale",
          url: "https://lineelecco.it/trasporto/",
          kind: "transport operator",
          note: "for the operator's name only",
        },
        s25: {
          label: "RFI, stazione Lecco Maggianico",
          url: "https://www.rfi.it/it/stazioni/lecco-maggianico.html",
          kind: "public body",
          note: "Italy's rail infrastructure manager; for the station's name",
        },
        s26: {
          label: "Trenord, home (station search list)",
          url: "https://www.trenord.it/",
          kind: "transport operator",
          note: "for the station's name only",
        },
      },
      not_found: [
        "the Misano event: date, place and line-up of 12 Sept 2026 (and 2024, 2025) are only in Google's snippet of the organiser's Instagram and in media (wumagazine.com, zonzers.com); not read at the organiser. Whether there is a 2027 Misano date: no word anywhere",
        "the organiser's own announcement date for David Guetta and for the 2027 dates: media dated 3-4 Nov 2026 (xtm.it, laprovinciaunicatv.it, adnkronos.com) and linkiesta.it in Sept 2026; the organiser's posts not read",
        "Winter 2027 daily hours as Winter's own: the FAQ is a copy of the summer one; the page data says 13 Feb 14:00 to 14 Feb 23:00",
        "the residents' discount: price, and which towns count as residents (the Google Form not read)",
        "transport from the airports (Milano Malpensa, Linate, Bergamo Orio al Serio) to Lecco or Barzio: no organiser or public-body page read; shuttles: the organiser lists none",
        "Nameless Winter's venue name beyond 'Barzio' and 'Via Fornaci Merlo' (the 2015-2019 festival was in the Pratobuscante area per Wikipedia; whether Winter uses it is not said)",
        "TicketOne as a 2027 seller: the 21 Oct note listed it; the organiser links only Ciaotickets and ticketone.it refused the connection, so TicketOne is not an official seller on this card",
        "an official resale or name-change platform for Nameless: the organiser names none",
        "parking for GA holders at the Bione: the organiser's 'Come arrivare, dove parcheggiare' card leads to the location page, which gives no parking; Lecco Tourism (s14) only says the centre's car parks can be used, naming none and giving no distance to the Bione",
        "whether Nameless Winter has a Nameless Club: the organiser's Winter table omits it, the seller's Winter pass lists it; neither describes it",
        "capacity for 2027; the 100,000 'guests' a year since 2023 is the organiser's own figure",
        "camping or accommodation partners: none on the organiser's pages ('Dove dormire? Chiedi a Enne')",
      ],
    },
    go: {
      tickets: {
        url: "https://www.namelessfestival.it/festival-2027/biglietti",
        source: "s2",
        kind: "organiser",
        title: "General Admission, VIP e giornate singole del festival di giugno 2027",
      },
      official: {
        url: "https://www.namelessfestival.it/festival-2027/location",
        source: "s3",
        kind: "organiser",
        title: "L'area del Bione a Lecco, come la descrive l'organizzatore",
      },
      winter: {
        url: "https://www.namelessfestival.it/winter-2027",
        source: "s6",
        kind: "organiser",
        title: "Date e informazioni sul Nameless Winter 2027 a Barzio",
      },
      "winter-tickets": {
        url: "https://www.namelessfestival.it/winter-2027/biglietti",
        source: "s7",
        kind: "organiser",
        title: "I pass General Admission e VIP per il 13 e il 14 febbraio 2027",
      },
      ciaotickets: {
        url: "https://nameless.ciaotickets.com/ecommerce/",
        source: "s13",
        kind: "seller",
        title: "La biglietteria ufficiale del Nameless, per giugno e per febbraio",
      },
      residenti: {
        url: "https://forms.gle/h4tsNb6SPRzcAkUb6",
        source: "sellers.2",
        kind: "organiser",
        title: "Il modulo Google dell'organizzatore per richiedere lo sconto",
      },
      trenord: {
        url: "https://www.trenord.it/",
        source: "s26",
        kind: "public-body",
        title: "Treni regionali per Lecco da Milano, Bergamo e Como",
      },
      "lecco-tourism": {
        url: "https://leccotourism.it/info-di-viaggio/come-arrivare/",
        source: "s14",
        kind: "public-body",
        title: "In treno, in auto o in autobus fino a Lecco, a cura del Comune di Lecco",
      },
      map: {
        url: "https://www.google.com/maps/search/?api=1&query=45.8357381%2C9.4070082",
        source: "venues.0",
        kind: "maps",
        title: "Le coordinate dell'area del Bione su Google Maps: si apre un segnaposto senza nome",
      },
      "winter-map": {
        url: "https://www.google.com/maps/search/?api=1&query=45.9423576%2C9.4518142",
        source: "venues.1",
        kind: "maps",
        title: "Le coordinate del Nameless Winter a Barzio su Google Maps: si apre un segnaposto senza nome",
      },
    },
  },
];

export const guides: Guide[] = [
  {
    slug: "it-IT",
    createdAt: "2026-11-19T14:13:00+04:00",
    updatedAt: "2026-11-19T14:13:00+04:00",
    event: "nameless",
    name: "Nameless Festival 2027",
    lang: "it-IT",
    dir: "ltr",
    path: "/nameless/",
    hubLabel: "Italiano (Italia)",
    hubPlace: "Lecco e Barzio, Italia",
    hubBlurb: "Nameless Winter sabato 13 e domenica 14 febbraio 2027 a Barzio, Nameless Festival dal 4 al 6 giugno 2027 al Bione di Lecco. Biglietti, orari, line-up e come arrivare. [editions.0.days] [venues.1.city] [editions.1.days] [venues.0.name]",
    navLabel: "Pagine della guida al Nameless",
    faqLabel: "Domande frequenti sul Nameless",
    expires: {
      prices: "2026-12-31",
      residenti: "2026-12-31",
    },
    pages: [
      {
        slug: "nameless",
        createdAt: "2026-11-19T14:13:00+04:00",
        updatedAt: "2026-11-19T14:40:00+04:00",
        kind: "main",
        label: "Guida",
        crumb: "Nameless Festival 2027",
        title: "Nameless Festival 2027: date e biglietti — guida al festival",
        description: "Nameless Festival 4-6 giugno 2027 al Bione di Lecco, Nameless Winter 13-14 febbraio 2027 a Barzio: biglietti, orari, line-up, come arrivare. Guida al festival.",
        h1: "Nameless Festival 2027",
        anchors: [
          {
            target: "/nameless/biglietti/",
            text: "pagina Biglietti",
          },
          {
            target: "/nameless/winter/",
            text: "pagina del Winter",
          },
          {
            target: "/nameless/come-arrivare/",
            text: "pagina Come arrivare",
          },
        ],
        jumps: [
          {
            id: "biglietti",
            label: "Biglietti",
          },
          {
            id: "date",
            label: "Date",
          },
          {
            id: "dove",
            label: "Come arrivare",
          },
          {
            id: "lineup",
            label: "Line-up",
          },
          {
            id: "perche",
            label: "Perché questa guida",
          },
          {
            id: "questions",
            label: "Domande",
          },
          {
            id: "sources",
            label: "Fonti",
          },
        ],
        lede: "Il Nameless Festival 2027 si tiene a Lecco, nell'area del Bione, da venerdì 4 a domenica 6 giugno 2027 [editions.1.days] [venues.0.name]. Prima c'è il Nameless Winter 2027, a Barzio in Valsassina, sabato 13 e domenica 14 febbraio [editions.0.days] [venues.1.city] [venues.1.setting]. Sono due eventi con lo stesso nome, e ognuno ha le sue date, il suo luogo e i suoi biglietti [editionsNote]. Il 19 novembre 2026 erano in vendita tutti e due, su Ciaotickets [editions.0.ticketState] [editions.1.ticketState] [sellers.0]. Il primo artista annunciato per giugno è David Guetta, domenica 6 [lineup.0]. E il festival è tornato a casa. È nato a Lecco nel 2013 e, dopo Barzio e quattro edizioni ad Annone di Brianza, nel 2026 è rientrato in città [event.since] [history.0].",
        sections: [
          {
            id: "biglietti",
            heading: "Biglietti: chi li vende{{until prices}} e quanto costano{{/until}}",
            body: "Tutti i biglietti del Nameless, per giugno e per febbraio, si comprano su Ciaotickets [sellers.0]. È l'unico sito di vendita a cui rimandano le pagine dell'organizzatore, Nameless Festival S.r.l. di Lecco [sellers.0.note] [event.organiser]. {{until prices}}Questi sono i prezzi che l'organizzatore pubblicava il 19 novembre 2026, con i nomi delle sue tariffe [pricesNote]:\n\n- **General Admission, 3 Days Festival Pass** («Regular»), dal 4 al 6 giugno: 139 euro [prices.0].\n- **VIP, 3 Days Festival Pass** («Regular»), dal 4 al 6 giugno: 349 euro [prices.1].\n- **Biglietto di un giorno** («Super Early»), il 4, il 5 o il 6 giugno: da 79 euro [prices.2] [sellers.1.note].\n- **Nameless Winter, General Admission, 2 Giorni Festival Pass** («Early Tickets»): 59 euro [prices.3].\n- **Nameless Winter, VIP, 2 Giorni Festival Pass** («Early Tickets»): 199 euro [prices.4].\n- **Forever Pass**, Winter e festival, 3+2 giorni: da 198 euro [prices.5].\n\nCiaotickets avverte che al prezzo indicato possono aggiungersi commissioni [pricesFees]. Sul suo sito le tariffe compaiono come «Super Early Ticket - 2nd release» o «3rd release» [pricesNote]. {{/until}}Il pass General Admission dà accesso a tutti gli stage e a tutte le aree, tranne quelle VIP [tiers.0] [tiers.2]. Il pass VIP aggiunge le aree VIP, una fila prioritaria con ingresso dedicato, il parcheggio VIP, aree bar premium e bagni riservati [tiers.1] [tiers.3]. Sul Nameless Club le fonti non coincidono. L'organizzatore lo elenca tra i vantaggi del pass VIP di giugno ma non in quello del Winter, mentre Ciaotickets lo mette in tutti e due [tiers.1] [tiers.3] [tiersSeller.1] [tiersNote]. {{until residenti}}C'è poi lo «Sconto Residenti» sull'abbonamento General Admission di 3 giorni. Si richiede compilando un modulo dell'organizzatore entro giovedì 31 dicembre 2026 [sellers.2] [sellers.2.note]. La pagina non dice a quali comuni si applica [sellers.2.note] [not_found.3]. {{/until}}Pagamenti, biglietto giornaliero e regole d'ingresso sono nella pagina Biglietti. → /nameless/biglietti/\n\nLink: [Biglietti sul sito del Nameless](/go/nameless-tickets/) · [Shop Nameless su Ciaotickets](/go/nameless-ciaotickets/)",
          },
          {
            id: "date",
            heading: "Date 2027 e il ritorno a Lecco",
            body: "Il festival di giugno dura tre giorni, da venerdì 4 a domenica 6 giugno 2027 [editions.1.days]. Le FAQ dell'organizzatore dicono che apre tutti i giorni alle 14 e chiude alle 24 [editions.1.times.daily]. Domenica 6 giugno, però, secondo la pagina del festival 2027, si chiude alle 23 [editions.1.times.end] [editions.1.times.note]. Su Ciaotickets ogni giornata comincia alle 14 [editions.1.times.note]. Il Winter dura due giorni, sabato 13 e domenica 14 febbraio 2027 [editions.0.days]. Secondo la pagina del Winter si comincia sabato alle 14 e si finisce domenica alle 23 [editions.0.times].\n\nIl Nameless ha cambiato casa tre volte in tredici anni. È nato a Lecco nel 2013 ed è rimasto in città anche nel 2014 [event.since] [history.0]. Dal 2015 al 2019 si è tenuto a Barzio, in Valsassina [history.0]. Nel 2020 e nel 2021 è stato annullato per il Covid-19 [history.2]. Dal 2022 al 2025 è stato ad Annone di Brianza, insieme a Molteno e Bosisio Parini [history.0]. Nel 2026 è tornato a Lecco, al Bione, da sabato 30 maggio a lunedì 1° giugno [editions.2] [history.0]. Barzio oggi è la casa del Winter [history.1]. Dal 2023 si chiama Nameless Festival. Prima era Nameless Music Festival [history.4].\n\nAnche i numeri sono cambiati. Nella cronologia dell'organizzatore, il 2014 conta 9.000 presenze, un palco e 20 artisti [history.3]. Il 2019 arriva a 54.000 presenze, con tre palchi e 70 artisti [history.3]. Dal 2023 l'organizzatore dichiara 100.000 presenze l'anno [history.3]. Nel 2024, nel 2025 e nel 2026 i palchi sono cinque e gli artisti 130 [history.3]. Per {{until prices}}prezzi, {{/until}}orari e strada per Barzio c'è la pagina del Winter. → /nameless/winter/",
          },
          {
            id: "dove",
            heading: "Dove si svolge e come arrivare",
            body: "Che lago è quello del Bione? Per l'organizzatore l'area è «affacciata direttamente sul Lago di Como» [venues.0.setting]. Wikipedia la mette invece sulla sponda del lago di Garlate [venues.0.setting] [sources.s16]. In ogni caso si va a Lecco, in viale Don Giovanni Ticozzi, a poca distanza dal centro e dalla stazione di Lecco Maggianico [venues.0.address] [transport.1] [stationName]. In treno Lecco si raggiunge da Milano, Bergamo, Como, Sondrio, Colico e Varenna [transport.0]. Chi guida arriva da Milano sulla SS36 e da Bergamo sulla SP639, e in città trova zone a traffico limitato [transport.2]. Solo il pass VIP include un parcheggio. Per il General Admission l'organizzatore non ne indica [tiers.1] [not_found.8]. Per il Winter si sale invece a Barzio, in Valsassina, la valle che l'autobus D35 collega a Lecco [venues.1.city] [transport.5]. Bus da Como e da Bellagio, area camper e regole sul posto si trovano nella pagina Come arrivare. → /nameless/come-arrivare/\n\nLink: [Apri il Bione su Google Maps](/go/nameless-map/) · [Orari dei treni su Trenord](/go/nameless-trenord/)",
          },
          {
            id: "lineup",
            heading: "Line-up 2027",
            body: "Chi suona al Nameless 2027? Per ora l'organizzatore ha annunciato un nome solo: David Guetta, domenica 6 giugno 2027 [lineup.0]. Lo riporta la pagina del festival 2027, letta il 19 novembre 2026 [sources.s19]. Per il Winter non c'è ancora nessun artista, e la sua pagina non ha una sezione line-up [lineup.1] [editions.0.lineup]. Per capire che cartellone aspettarsi si può guardare indietro. Wikipedia cita per il 2025 Armin van Buuren, Martin Garrix e The Chainsmokers, e per il 2026 Calvin Harris, John Summit, TonyPitony e Fisher [history.5]. L'organizzatore si presenta come «l'evento italiano di riferimento per la musica elettronica e l'hip hop» [event.genre]. Durante il festival l'app ufficiale, per iOS e Android, mostra la line-up, il programma in diretta e una mappa interattiva [onSite.0].",
          },
          {
            id: "perche",
            heading: "Perché questa guida in italiano",
            body: "Sotto il marchio Nameless ci sono due eventi lombardi, il Winter a Barzio e il festival a Lecco, tornato in città nel 2026 nella nuova area del Bione: questa guida li racconta insieme, in italiano, con date, biglietti e strade per arrivarci [editionsNote] [venues.0.region] [history.0] [editions.2.note].",
          },
        ],
        faqHeading: "Domande frequenti",
        faq: [
          {
            q: "Dove si fa il Nameless 2027?",
            a: "Il Nameless Festival 2027 si fa a Lecco, nell'area del Bione, sul lago, secondo la pagina Location dell'organizzatore [venues.0.name] [venues.0.setting] [sources.s3]. Ciaotickets ne indica l'indirizzo in viale Don Giovanni Ticozzi [venues.0.address] [sources.s10]. Il Nameless Winter 2027 è a Barzio, in Valsassina, secondo la pagina Location del Winter, e Ciaotickets indica via Fornaci Merlo [venues.1.city] [sources.s8] [venues.1.address] [sources.s11].",
          },
          {
            q: "Quando si terrà il Nameless Festival 2027?",
            a: "Da venerdì 4 a domenica 6 giugno 2027, secondo la pagina del festival 2027 dell'organizzatore [editions.1.days] [sources.s19]. Il Nameless Winter 2027 è sabato 13 e domenica 14 febbraio, secondo la pagina del Winter [editions.0.days] [sources.s6].",
          },
          {
            q: "Quanto costa il biglietto del Nameless?",
            a: "Dipende dal pass, General Admission o VIP, e dalla fase di vendita [tiers] [pricesNote]. Le cifre aggiornate sono sulle pagine Biglietti dell'organizzatore [sources.s2] [sources.s7]. {{until prices}}Il 19 novembre 2026 l'abbonamento General Admission di 3 giorni costava 139 euro, il VIP 349 euro e il biglietto di un giorno da 79 euro [prices.0] [prices.1] [prices.2] [sources.s2]. Per il Winter, 59 euro il General Admission di 2 giorni e 199 euro il VIP [prices.3] [prices.4] [sources.s7]. Ciaotickets avverte che possono aggiungersi commissioni [pricesFees]. {{/until}}Si comprano tutti su Ciaotickets, l'unico venditore a cui rimanda l'organizzatore [sellers.0.note].",
          },
          {
            q: "Chi suona al Nameless 2027?",
            a: "David Guetta, domenica 6 giugno 2027. Al 19 novembre 2026 è l'unico nome annunciato sulla pagina del festival 2027 dell'organizzatore [lineup.0] [sources.s19].",
          },
          {
            q: "Chi sono gli artisti del Nameless Winter 2027?",
            a: "Non sono ancora stati annunciati. Il 19 novembre 2026 la pagina del Winter dell'organizzatore non aveva una line-up [lineup.1] [sources.s6].",
          },
          {
            q: "Quali sono gli orari del Nameless?",
            a: "Secondo le FAQ dell'organizzatore il festival apre ogni giorno alle 14 e chiude alle 24 [editions.1.times.daily] [sources.s4]. Secondo la pagina del festival 2027, domenica 6 giugno si chiude alle 23 [editions.1.times.end] [sources.s19]. Il Winter va da sabato 13 febbraio alle 14 a domenica 14 febbraio alle 23, secondo la sua pagina [editions.0.times] [sources.s6].",
          },
          {
            q: "Quanto dura il Nameless Festival?",
            a: "Tre giorni, da venerdì 4 a domenica 6 giugno 2027, secondo la pagina del festival 2027 [editions.1.days] [sources.s19]. Il Winter dura due giorni, sabato 13 e domenica 14 febbraio 2027 [editions.0.days] [sources.s6].",
          },
          {
            q: "Che cos'è il Nameless Festival?",
            a: "Un festival nato nel 2013, secondo il sito dell'organizzatore [event.since] [sources.s1]. Per Wikipedia, le prime due edizioni, nel 2013 e nel 2014, si sono tenute a Lecco [history.0] [sources.s16]. L'organizzatore lo presenta come «l'evento italiano di riferimento per la musica elettronica e l'hip hop» [event.genre] [sources.s1]. Ogni anno ha due eventi, il Winter a febbraio a Barzio e il festival a giugno a Lecco [editionsNote]. L'organizzatore dichiara 100.000 presenze all'anno dal 2023 al 2026 [history.3] [sources.s19].",
          },
          {
            q: "Il Nameless è a Misano?",
            a: "Il Nameless Festival 2027 è a Lecco, al Bione, dal 4 al 6 giugno, e il Nameless Winter 2027 a Barzio, il 13 e 14 febbraio, secondo le pagine dell'organizzatore [editions.1] [editions.0] [sources.s19] [sources.s6]. Le pagine 2027 dell'organizzatore non indicano date a Misano. Non ne indica nemmeno Ciaotickets, che nella sua pagina Nameless elenca solo le giornate di giugno e gli abbonamenti al festival e al Winter [not_found.0] [sellers.1.note] [sources.s9].",
          },
          {
            q: "Si possono comprare biglietti per un solo giorno?",
            a: "Sì, per il festival di giugno. Ciaotickets vende a parte venerdì 4, sabato 5 e domenica 6 giugno 2027 [sellers.1.note] [sources.s9]. Si entra nello shop passando prima da una coda virtuale [sellers.0.note]. {{until prices}}Il 19 novembre 2026 i biglietti di un giorno partivano da 79 euro, secondo l'organizzatore [prices.2]. {{/until}}Secondo il regolamento, il biglietto vale solo per il giorno scelto e non si può cambiare [ticketRules.dayTicket] [sources.s5].",
          },
          {
            q: "Qual è l'età minima? I minorenni possono entrare?",
            a: "L'età minima è 18 anni [age.rules.0]. I minorenni entrano solo con un genitore o un tutore legale, entrambi con un biglietto valido [age.rules.0] [age.rules.3]. Il tutore non si può indicare con un'autocertificazione [age.rules.1]. I bambini fino ai 10 anni compiuti non pagano [age.rules.2]. Gli alcolici si servono solo ai maggiorenni, con controllo del documento [age.rules.4]. Sono le regole delle FAQ e del Regolamento dell'organizzatore [age.note] [sources.s4] [sources.s5].",
          },
          {
            q: "Come arrivare al Nameless? Dove parcheggiare?",
            a: "In treno fino a Lecco, da Milano, Bergamo, Como, Sondrio, Colico o Varenna, secondo Lecco Tourism [transport.0] [sources.s14]. Il Bione è vicino al centro e alla stazione di Lecco Maggianico, secondo l'organizzatore [transport.1] [stationName] [sources.s3]. Il pass VIP comprende il parcheggio VIP. Per il General Admission l'organizzatore non indica parcheggi [tiers.1] [not_found.8]. Per la città in generale, Lecco Tourism rimanda ai parcheggi del centro di Lecco [transport.2] [sources.s14]. I camper hanno un'area sosta proprio al Bione, secondo Lecco Tourism [transport.3] [sources.s14].",
          },
        ],
        sourcesHeading: "Fonti",
        sources: "Nameless Festival, sito ufficiale: home, pagina del festival 2027, Biglietti, Location, FAQ e Regolamento, lette il 19 novembre 2026 [sources.s1] [sources.s19] [sources.s2] [sources.s3] [sources.s4] [sources.s5]. Nameless Winter 2027, pagina ufficiale, Biglietti e Location, lette il 19 novembre 2026 [sources.s6] [sources.s7] [sources.s8]. Ciaotickets, pagina Nameless Festival, abbonamenti 2027 del festival e del Winter, biglietti giornalieri e shop Nameless, letti il 19 novembre 2026 [sources.s9] [sources.s10] [sources.s11] [sources.s12] [sources.s13]. Lecco Tourism (Comune di Lecco), pagine Come arrivare e Nameless Festival 2026, lette il 19 novembre 2026 [sources.s14] [sources.s15]. Wikipedia in italiano, voce «Nameless Festival», letta il 19 novembre 2026 [sources.s16].",
      },
      {
        slug: "nameless/biglietti",
        createdAt: "2026-11-19T14:13:00+04:00",
        updatedAt: "2026-11-19T14:13:00+04:00",
        kind: "tickets",
        label: "Biglietti",
        crumb: "Biglietti",
        title: "Nameless 2027: biglietti e abbonamenti — guida al festival",
        description: "Biglietti per il Nameless Festival 2027 (Lecco, 4-6 giugno) e il Nameless Winter 2027 (Barzio, 13-14 febbraio): General Admission, VIP, giorno singolo, regole.",
        h1: "Biglietti per il Nameless Festival 2027",
        anchors: [
          {
            target: "/nameless/winter/",
            text: "pagina del Winter",
          },
          {
            target: "/nameless/",
            text: "guida al Nameless",
          },
        ],
        jumps: [
          {
            id: "chi-vende",
            label: "Chi vende",
          },
          {
            id: "festival",
            label: "Pass di giugno",
          },
          {
            id: "residenti",
            label: "{{until residenti}}Sconto Residenti{{/until}}",
          },
          {
            id: "winter",
            label: "Winter",
          },
          {
            id: "forever",
            label: "Forever Pass",
          },
          {
            id: "pagare",
            label: "Pagamenti",
          },
          {
            id: "ingresso",
            label: "All'ingresso",
          },
          {
            id: "sources",
            label: "Fonti",
          },
        ],
        lede: "I biglietti del Nameless Festival 2027, da venerdì 4 a domenica 6 giugno a Lecco, e quelli del Nameless Winter 2027, sabato 13 e domenica 14 febbraio a Barzio, si comprano su Ciaotickets [editions.1.days] [editions.0.days] [sellers.0]. Il 19 novembre 2026 per giugno erano in vendita gli abbonamenti di tre giorni, General Admission e VIP, e i biglietti giornalieri [editions.1.ticketState]. {{until residenti}}C'era anche lo sconto per i residenti, da richiedere entro il 31 dicembre [editions.1.ticketState] [sellers.2.note]. {{/until}}Per il Winter erano aperti gli «Early Tickets» [editions.0.ticketState]. Una regola conviene saperla prima di comprare: chi esce dal festival non può rientrare lo stesso giorno [ticketRules.reentry].",
        sections: [
          {
            id: "chi-vende",
            heading: "Chi vende",
            body: "L'organizzatore è Nameless Festival S.r.l., in via dei Pescatori 27 a Lecco [event.organiser]. Sulle sue pagine c'è un solo link per comprare, verso lo shop Nameless di Ciaotickets, e vale per tutte le tariffe di entrambe le edizioni [sellers.0] [sellers.0.note]. Ciaotickets ha anche una sua pagina Nameless Festival. Lì elenca le tre giornate del 4, 5 e 6 giugno 2027, l'abbonamento al festival 2027 e quello alla Winter Edition [sellers.1] [sellers.1.note]. Per i biglietti giornalieri si passa prima da una coda virtuale gestita da Queue-it [sellers.0.note]. Ciaotickets vende un biglietto elettronico, da mostrare all'ingresso sul telefono o da stampare a casa [ticketRules.delivery.seller]. L'organizzatore chiede di presentare il QR code del biglietto e consiglia il formato digitale [ticketRules.delivery.organiser].\n\nLink: [Shop Nameless su Ciaotickets](/go/nameless-ciaotickets/) · [Biglietti sul sito del Nameless](/go/nameless-tickets/)",
          },
          {
            id: "festival",
            heading: "I pass del festival di giugno{{until prices}}, prezzi al 19 novembre 2026{{/until}}",
            body: "Gli abbonamenti valgono per i tre giorni, da venerdì 4 a domenica 6 giugno 2027 [editions.1.days]. Il pass General Admission dà accesso a tutti gli stage e a tutte le aree, tranne quelle VIP [tiers.0]. Il pass VIP comprende tutto quello che offre il General Admission e in più le aree VIP, il Nameless Club, la priority line con ingresso dedicato, il VIP Parking, le aree premium food & bar e i bagni VIP [tiers.1] [tiersSeller.1]. {{until prices}}Sulla pagina Biglietti dell'organizzatore, il 19 novembre 2026, l'abbonamento General Admission di 3 giorni costava 139 euro e il VIP 349 euro, tutti e due in tariffa «Regular» [prices.0] [prices.1]. Il biglietto di un giorno partiva da 79 euro, in tariffa «Super Early» [prices.2]. Ciaotickets avverte che a questi prezzi possono aggiungersi commissioni [pricesFees]. Sulla pagina Ciaotickets dell'abbonamento 2027, General Admission e VIP compaiono tutti e due come «Super Early Ticket», in «2nd release» e in «3rd release» [pricesNote] [sources.s10]. {{/until}}Il biglietto giornaliero vale solo per la data scelta e non si può spostare su un altro giorno [ticketRules.dayTicket].",
          },
          {
            id: "residenti",
            heading: "Sconto Residenti",
            body: "{{until residenti}}Lo «Sconto Residenti» riguarda l'abbonamento General Admission di tre giorni del festival di giugno [sellers.2.note]. Si richiede compilando un modulo Google dell'organizzatore, linkato dalla sua pagina Biglietti [sellers.2] [sources.s20]. La scadenza è giovedì 31 dicembre 2026 alle 23:59 [sellers.2.note]. La pagina dell'organizzatore non indica il prezzo scontato e non dice a quali comuni si applica [sellers.2.note] [not_found.3].\n\nLink: [Modulo per lo Sconto Residenti](/go/nameless-residenti/){{/until}}",
          },
          {
            id: "winter",
            heading: "Nameless Winter: due giorni a Barzio",
            body: "Per il Winter, sabato 13 e domenica 14 febbraio 2027, ci sono due pass da due giorni, General Admission e VIP [editions.0.days] [prices.3] [prices.4]. {{until prices}}Il 19 novembre 2026 la pagina Biglietti del Winter li indicava a 59 e a 199 euro, nella fase «Early Tickets» [prices.3] [prices.4] [sources.s7]. Ciaotickets elenca il General Admission come «Super Early Ticket - 2nd release» e avverte che possono aggiungersi commissioni [editions.0.ticketState] [pricesNote] [pricesFees]. {{/until}}Sul Nameless Club le due fonti non coincidono. La tabella del Winter dell'organizzatore non lo mette tra i vantaggi del VIP, mentre la pagina Ciaotickets dell'abbonamento Winter lo elenca [tiers.3] [tiersSeller.1] [tiersNote]. Orari, luogo e strada per arrivare al Winter sono nella pagina del Winter. → /nameless/winter/",
          },
          {
            id: "forever",
            heading: "Forever Pass: febbraio e giugno insieme",
            body: "Il Forever Pass unisce le due edizioni: i due giorni del Winter a Barzio e i tre del festival a Lecco [prices.5] [editionsNote]. Si compra nello stesso shop Ciaotickets degli altri biglietti [sellers.0.note]. {{until prices}}Il 19 novembre 2026 partiva da 198 euro, sulla pagina Biglietti del Winter [prices.5] [sources.s7]. È la stessa cifra dei due General Admission comprati separatamente, 139 più 59 euro [prices.0] [prices.3]. {{/until}}",
          },
          {
            id: "pagare",
            heading: "Come si paga",
            body: "Sulla pagina delle giornate singole, Ciaotickets accetta Scalapay, cioè il pagamento in tre rate in tre mesi [payment.atSeller] [sources.s12]. Per i biglietti giornalieri si possono usare anche la Carta della Cultura Giovani, la Carta del merito e la Carta del Docente [payment.atSeller]. Al festival, invece, si paga solo con carta o con il telefono. L'organizzatore lo scrive chiaro: «Non sono accettati contanti» [payment.onSite].",
          },
          {
            id: "ingresso",
            heading: "All'ingresso: biglietto, età, oggetti",
            body: "Si entra una volta al giorno. Chi esce non può rientrare lo stesso giorno [ticketRules.reentry]. L'età minima è 18 anni [age.rules.0]. I minorenni entrano solo con un genitore o un tutore legale, ed entrambi devono avere un biglietto valido [age.rules.0] [age.rules.3]. Il tutore non si può indicare con un'autocertificazione [age.rules.1]. I bambini fino ai 10 anni compiuti non pagano [age.rules.2]. Gli alcolici si servono solo ai maggiorenni, con controllo del documento [age.rules.4]. Queste regole sono nelle FAQ e nel regolamento dell'organizzatore [age.note]. Il regolamento vieta, tra le altre cose, cibo e bevande portati da fuori, ombrelli, sedie, sacchi a pelo, macchine fotografiche professionali e droni, bastoni per selfie, biciclette e animali, tranne quelli di assistenza [onSite.3]. Le GoPro sono ammesse [onSite.3]. Le altre domande, da Misano agli orari, trovano risposta nella guida al Nameless. → /nameless/",
          },
        ],
        faq: [],
        sourcesHeading: "Fonti",
        sources: "Nameless Festival 2027, pagine Biglietti, FAQ e Regolamento dell'organizzatore, lette il 19 novembre 2026 [sources.s2] [sources.s4] [sources.s5]. Nameless Winter 2027, pagina Biglietti, letta il 19 novembre 2026 [sources.s7]. Ciaotickets, pagina Nameless Festival, abbonamenti Nameless Festival 2027 e Nameless Winter Edition 2027, biglietti giornalieri e shop Nameless, letti il 19 novembre 2026 [sources.s9] [sources.s10] [sources.s11] [sources.s12] [sources.s13].",
      },
      {
        slug: "nameless/winter",
        createdAt: "2026-11-19T14:13:00+04:00",
        updatedAt: "2026-11-19T14:13:00+04:00",
        kind: "winter",
        label: "Winter",
        crumb: "Nameless Winter 2027",
        title: "Nameless Winter 2027: date, biglietti — guida al festival",
        description: "Nameless Winter 2027 a Barzio, in Valsassina, sabato 13 e domenica 14 febbraio: biglietti, orari, artisti e come arrivare da Lecco. Guida al festival.",
        h1: "Nameless Winter 2027",
        anchors: [
          {
            target: "/nameless/biglietti/",
            text: "pagina Biglietti",
          },
          {
            target: "/nameless/come-arrivare/",
            text: "pagina Come arrivare",
          },
        ],
        jumps: [
          {
            id: "date",
            label: "Date e orari",
          },
          {
            id: "barzio",
            label: "Barzio",
          },
          {
            id: "biglietti",
            label: "Biglietti",
          },
          {
            id: "artisti",
            label: "Artisti",
          },
          {
            id: "arrivare",
            label: "Come arrivare",
          },
          {
            id: "regole",
            label: "Età e regole",
          },
          {
            id: "sources",
            label: "Fonti",
          },
        ],
        lede: "Il Nameless Winter 2027 si tiene a Barzio, in Valsassina, sabato 13 e domenica 14 febbraio 2027 [editions.0.days] [venues.1.city]. È l'edizione d'inverno del Nameless: due giorni in montagna sopra Lecco, quasi quattro mesi prima del festival di giugno al Bione [editionsNote] [venues.1.setting] [editions.1.start]. Barzio non è un posto nuovo per il Nameless. Il festival si è tenuto qui per cinque edizioni, dal 2015 al 2019 [history.0] [history.1]. Il 19 novembre 2026 i biglietti erano in vendita su Ciaotickets, mentre gli artisti non erano ancora stati annunciati [editions.0.ticketState] [lineup.1].",
        sections: [
          {
            id: "date",
            heading: "Date e orari",
            body: "Il Winter occupa un fine settimana, sabato 13 e domenica 14 febbraio 2027 [editions.0.days]. Secondo la pagina del Winter si comincia sabato alle 14 e si finisce domenica alle 23 [editions.0.times]. L'organizzatore non pubblica orari del Winter giorno per giorno [not_found.2]. Le FAQ del Winter sono identiche a quelle del festival di giugno e danno la regola generale del Nameless, apertura alle 14 e chiusura alle 24 [editions.0.times.note] [age.note] [sources.s22]. Anche l'edizione 2026 si è tenuta a Barzio, sabato 14 e domenica 15 febbraio 2026 [editions.3].",
          },
          {
            id: "barzio",
            heading: "Barzio, in Valsassina",
            body: "Perché proprio Barzio? L'organizzatore presenta il Winter con queste parole: «Nel cuore della Valsassina, dove tutto ha avuto inizio» [history.1]. Secondo Wikipedia le prime due edizioni, nel 2013 e nel 2014, si erano tenute a Lecco [history.0] [sources.s16]. È a Barzio però che il festival è cresciuto, dal 2015 al 2019, nella zona di Pratobuscante [history.0]. Nella cronologia dell'organizzatore, in quegli anni le presenze passano da 15.000 a 54.000 e gli artisti da 43 a 70 [history.3]. Per il Winter l'organizzatore non dà al luogo un nome diverso da Barzio [venues.1.setting]. Ciaotickets indica l'indirizzo in via Fornaci Merlo, Barzio, in provincia di Lecco [venues.1.address]. Se sia la stessa zona delle edizioni 2015-2019, l'organizzatore non lo dice [not_found.5]. Barzio è in Valsassina, sulle montagne sopra Lecco, in Lombardia [venues.1.setting] [venues.1.region].\n\nLink: [Apri il Nameless Winter su Google Maps](/go/nameless-winter-map/) · [La pagina del Winter sul sito del Nameless](/go/nameless-winter/)",
          },
          {
            id: "biglietti",
            heading: "Biglietti del Winter",
            body: "I pass del Winter sono due, General Admission e VIP, e valgono per entrambi i giorni [prices.3] [prices.4]. {{until prices}}Il 19 novembre 2026 l'organizzatore li indicava a 59 euro il General Admission e a 199 euro il VIP, nella fase «Early Tickets» [prices.3] [prices.4]. Ciaotickets avverte che al prezzo indicato possono aggiungersi commissioni [pricesFees] [sources.s11]. {{/until}}Si comprano nello shop Nameless di Ciaotickets, l'unico link per i biglietti sul sito dell'organizzatore [sellers.0] [sellers.0.note]. Ciaotickets ha anche una pagina per l'abbonamento Nameless Winter Edition 2027 [sellers.1.note] [sources.s11]. Sulla pagina Biglietti del Winter il pass VIP comprende le aree VIP, la priority line con ingresso dedicato, il VIP Parking, le aree premium bar e i bagni VIP [tiers.3] [sources.s7]. Il Nameless Club non è in quella lista. Lo elenca invece la pagina Ciaotickets dell'abbonamento Winter, che parla anche di aree premium food e bar [tiersSeller.1] [tiersNote] [sources.s11]. Chi vuole venire anche a giugno può prendere il Forever Pass, che copre i due giorni del Winter e i tre del festival di Lecco [prices.5]. {{until prices}}Partiva da 198 euro [prices.5]. {{/until}}Tutte le tariffe, i pagamenti e le regole sui biglietti le spiega la pagina Biglietti. → /nameless/biglietti/\n\nLink: [Biglietti del Winter sul sito del Nameless](/go/nameless-winter-tickets/)",
          },
          {
            id: "artisti",
            heading: "Artisti",
            body: "Chi suona al Nameless Winter 2027? Al 19 novembre 2026 nessun nome è annunciato, e la pagina del Winter non ha una sezione line-up [lineup.1] [editions.0.lineup]. Per il festival di giugno, invece, l'organizzatore ha già annunciato David Guetta, domenica 6 giugno 2027 [lineup.0].",
          },
          {
            id: "arrivare",
            heading: "Come arrivare a Barzio",
            body: "La Valsassina è collegata a Lecco dall'autobus D35 di Lecco Trasporti [transport.5]. A Lecco si arriva in treno, e orari e biglietti sono su Trenord [transport.0]. L'organizzatore non indica navette [not_found.4]. Non indica nemmeno strutture convenzionate per dormire. Alla domanda «Dove dormire?» risponde «Chiedi a Enne», il suo assistente virtuale su WhatsApp, al numero +39 392 027 7000 [not_found.11] [onSite.1]. Le strade per Lecco e il resto dei trasporti sono nella pagina Come arrivare. → /nameless/come-arrivare/\n\nLink: [Orari dei treni su Trenord](/go/nameless-trenord/)",
          },
          {
            id: "regole",
            heading: "Età e regole",
            body: "Le FAQ del Winter, identiche a quelle del festival di giugno, fissano l'età minima a 18 anni [age.rules.0] [sources.s22]. I minorenni entrano solo con un genitore o un tutore legale [age.rules.0]. Il regolamento del Winter aggiunge che tutti e due devono avere un biglietto valido [age.rules.3] [sources.s23]. I bambini fino ai 10 anni compiuti non pagano [age.rules.2]. Le stesse FAQ dicono che si paga senza contanti, con carta o telefono [payment.onSite] [payment.onSiteSourceWinter].",
          },
        ],
        faq: [],
        sourcesHeading: "Fonti",
        sources: "Nameless Winter 2027, pagina ufficiale, Biglietti, Location, FAQ e Regolamento, lette il 19 novembre 2026 [sources.s6] [sources.s7] [sources.s8] [sources.s22] [sources.s23]. Nameless Festival 2027, pagina FAQ dell'organizzatore e pagina del festival 2027, lette il 19 novembre 2026 [sources.s4] [sources.s19]. Ciaotickets, abbonamento Nameless Winter Edition 2027, letto il 19 novembre 2026 [sources.s11]. Lecco Tourism (Comune di Lecco), Come arrivare, letta il 19 novembre 2026 [sources.s14]. Wikipedia in italiano, voce «Nameless Festival», letta il 19 novembre 2026 [sources.s16].",
        markup: {
          name: "Nameless Winter 2027",
          startDate: "2027-02-13T14:00",
          endDate: "2027-02-14T23:00",
          timeZone: "Europe/Rome",
          run: "editions.0",
          venue: "venues.1",
          address: {
            streetAddress: "Via Fornaci Merlo",
            addressLocality: "Barzio",
            addressRegion: "LC",
            addressCountry: "IT",
          },
          placeName: "Barzio",
          organizer: {
            name: "Nameless Festival S.r.l.",
            url: "https://www.namelessfestival.it/",
          },
          offers: [
            {
              name: "General Admission 2 Giorni Festival Pass",
              seller: "Ciaotickets",
              go: "ciaotickets",
              price: {
                key: "prices.3",
                currency: "EUR",
              },
            },
            {
              name: "VIP 2 Giorni Festival Pass",
              seller: "Ciaotickets",
              go: "ciaotickets",
              price: {
                key: "prices.4",
                currency: "EUR",
              },
            },
          ],
        },
      },
      {
        slug: "nameless/come-arrivare",
        createdAt: "2026-11-19T14:13:00+04:00",
        updatedAt: "2026-11-19T14:13:00+04:00",
        kind: "location",
        label: "Come arrivare",
        crumb: "Come arrivare",
        title: "Nameless 2027: come arrivare a Lecco — guida al festival",
        description: "Come arrivare al Nameless 2027, dal 4 al 6 giugno al Bione di Lecco: treni, stazione di Lecco Maggianico, SS36 e SP639, bus, area camper. Guida al festival.",
        h1: "Come arrivare al Nameless Festival 2027",
        anchors: [
          {
            target: "/nameless/winter/",
            text: "pagina del Winter",
          },
          {
            target: "/nameless/biglietti/",
            text: "pagina Biglietti",
          },
        ],
        jumps: [
          {
            id: "bione",
            label: "Il Bione",
          },
          {
            id: "treno",
            label: "In treno",
          },
          {
            id: "auto",
            label: "Auto e camper",
          },
          {
            id: "bus",
            label: "In autobus",
          },
          {
            id: "winter",
            label: "Il Winter",
          },
          {
            id: "sul-posto",
            label: "Sul posto",
          },
          {
            id: "sources",
            label: "Fonti",
          },
        ],
        lede: "Dal 4 al 6 giugno 2027, venerdì, sabato e domenica, il Nameless Festival è nell'area del Bione, in viale Don Giovanni Ticozzi a Lecco [editions.1.days] [venues.0.address]. Il Bione è vicino al centro della città e alla stazione di Lecco Maggianico, e l'organizzatore lo dice collegato direttamente dai mezzi pubblici [transport.1] [stationName]. Chi arriva in camper trova l'area sosta di Lecco proprio al Bione [transport.3]. Chi arriva in auto con un General Admission, invece, non trova parcheggi indicati dall'organizzatore [not_found.8].",
        sections: [
          {
            id: "bione",
            heading: "Il Bione, sul lago",
            body: "Lago di Como o lago di Garlate? L'organizzatore parla di un'area che si affaccia sul lago di Como. Wikipedia la colloca sulla riva del lago di Garlate, nel quartiere Bione [venues.0.setting] [sources.s16]. Il 2026 è stato il primo anno del festival qui, e Lecco Tourism lo annunciava come «La nuova location al Bione di Lecco» [editions.2.note] [sources.s15]. Per il Nameless è un ritorno, perché Lecco è la città delle prime due edizioni, il 2013 e il 2014 [history.0] [event.since]. Dal 2022 al 2025 il festival era ad Annone di Brianza. Chi ci è stato in quegli anni, quindi, oggi trova il festival in un posto diverso [history.0].\n\nLink: [Apri il Bione su Google Maps](/go/nameless-map/) · [Location sul sito del Nameless](/go/nameless-official/)",
          },
          {
            id: "treno",
            heading: "In treno",
            body: "A Lecco arrivano treni diretti o regionali da Milano Centrale, Milano Porta Garibaldi, Bergamo, Como, Sondrio, Colico e Varenna, e si scende nel centro della città [transport.0]. Orari e biglietti sono su Trenord [transport.0]. Dal centro, o dalla stazione di Lecco Maggianico, il Bione è vicino [transport.1] [stationName]. Secondo le FAQ dell'organizzatore il festival chiude alle 24 [editions.1.times.daily]. Domenica 6 giugno, secondo la pagina del festival 2027, si chiude alle 23 [editions.1.times.end]. Chi torna in treno controlli su Trenord l'ultima corsa della sera prima di partire.\n\nLink: [Orari dei treni su Trenord](/go/nameless-trenord/)",
          },
          {
            id: "auto",
            heading: "In auto e in camper",
            body: "Da Milano si prende la SS36 in direzione Colico. Da Bergamo si arriva con la SP639 [transport.2]. Lecco ha zone a traffico limitato (ZTL), quindi conviene controllare il percorso prima di entrare in città [transport.2]. Il pass VIP comprende il VIP Parking [tiers.1] [tiers.3]. Per chi ha il General Admission la pagina Location dell'organizzatore non indica parcheggi [not_found.8]. Per la città in generale, Lecco Tourism rimanda ai parcheggi del centro di Lecco [transport.2]. L'area camper di Lecco è al Bione, in via Toscanini all'angolo con via Ticozzi-Brodolini, secondo Lecco Tourism [transport.3]. Le biciclette, infine, sono tra gli oggetti che il regolamento non fa entrare nel festival [onSite.3].",
          },
          {
            id: "bus",
            heading: "In autobus da Como e da Bellagio",
            body: "Da Como c'è la linea C40 di ASF Autolinee, che passa per Erba [transport.4]. Da Bellagio c'è l'autobus 10 di Linee Lecco [transport.4] [busOperatorName]. L'organizzatore non indica navette per il festival [not_found.4].\n\nLink: [Come arrivare a Lecco, su Lecco Tourism](/go/nameless-lecco-tourism/)",
          },
          {
            id: "winter",
            heading: "Il Winter: da Lecco a Barzio",
            body: "Il Nameless Winter, sabato 13 e domenica 14 febbraio 2027, è a Barzio, in via Fornaci Merlo [editions.0.days] [venues.1.address]. Barzio è in Valsassina, e la valle è collegata a Lecco dall'autobus D35 di Lecco Trasporti [venues.1.setting] [transport.5]. Per date, biglietti e orari del Winter c'è la pagina del Winter. → /nameless/winter/",
          },
          {
            id: "sul-posto",
            heading: "Sul posto: app, Enne e regole d'ingresso",
            body: "L'app ufficiale del Nameless, per iOS e Android, ha una mappa interattiva dell'area, oltre alla line-up e al programma in diretta [onSite.0]. Sulla mappa è segnato il punto oggetti smarriti, e ci sono aree riservate alle persone con disabilità [onSite.2]. Per le domande pratiche l'organizzatore ha un assistente virtuale, Enne, su WhatsApp al +39 392 027 7000 [onSite.1]. Anche per dormire rimanda a lui, perché sulle sue pagine non ci sono campeggi né strutture convenzionate [not_found.11]. Si entra una volta al giorno, e chi esce non può rientrare lo stesso giorno [ticketRules.reentry]. Dentro si paga senza contanti, con carta o telefono [payment.onSite]. Età minima e oggetti vietati sono nella pagina Biglietti. → /nameless/biglietti/",
          },
        ],
        faq: [],
        sourcesHeading: "Fonti",
        sources: "Nameless Festival 2027, pagine Location, FAQ, Regolamento e pagina del festival 2027 dell'organizzatore, lette il 19 novembre 2026 [sources.s3] [sources.s4] [sources.s5] [sources.s19]. Lecco Tourism (Comune di Lecco), pagine Come arrivare e Nameless Festival 2026, lette il 19 novembre 2026 [sources.s14] [sources.s15]. RFI, pagina della stazione di Lecco Maggianico, e Linee Lecco, pagina del trasporto pubblico locale, lette il 19 novembre 2026 [sources.s25] [sources.s24]. Ciaotickets, abbonamenti Nameless Festival 2027 e Nameless Winter Edition 2027, per gli indirizzi, letti il 19 novembre 2026 [sources.s10] [sources.s11]. Segnaposto del Nameless e del Nameless Winter su Google Maps, linkati dall'organizzatore [sources.s17] [sources.s18]. Wikipedia in italiano, voce «Nameless Festival», letta il 19 novembre 2026 [sources.s16].",
      },
    ],
  },
];
