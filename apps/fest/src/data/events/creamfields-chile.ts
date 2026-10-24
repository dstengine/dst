// Creamfields Chile: the event as the scout's sheet has it, and its guide.
//
// Generated once from the card (~/mind/ai/dubai/events/tasks/
// 2026-10-21-creamfields-chile-es.md) and edited by hand from here on: the
// sheet is section 1's YAML with the scout's two repair blocks merged as
// they say (a _v2 block beside the one it replaces, a key marked "removed"
// taken out, a block restated whole taken as written, the added and changed
// sources applied), values verbatim, each keeping its readOn. The card's
// working notes (the segment, the SERP as measured, the planned paths) are
// no page's facts and stay on the card. One sheet line is the executor's,
// not the scout's, and says so: venue.geo_venue, the club's own map marker,
// for the fest director's ruling on where the markup puts the venue.
//
// The copy is the writer's round 2 with round 3's sixteen "Now:" lines and
// the session's items after gate 2 (the card's section 5, 4), [key] tags
// left in; copy.ts turns it into HTML. The only additions to the approved
// strings are marks, which a verbatim comparison strips:
// - {{until key}}…{{/until}} spans round every peso figure and the
//   sentences that point at them, and round the sentences that say the
//   tickets are on sale, which the build drops on the days in `expires`;
// - "→ /creamfields-chile/…/" after the sentence for the copy's
//   "[→ tickets]", "[→ lineup]" and "[→ main]", each found by its phrase
//   in `anchors`;
// - [label](/go/…) on words the copy already has, where the copy put
//   "[→ /go/…]" after them, on the seller named in each lede (the fest
//   director's gate-3 condition 1) and on each linked source's name;
// - the tables as "|" rows under their caption line and **label** over each
//   group, which a section of kind "table" reads (copy.ts); the main page's
//   why-line as the lede's second paragraph (GuidePage); and the Plan de
//   reserva paragraph set as three, no word changed.
//
// The layout is what tools/record-blocks.mjs reads: each record opens on a
// line that is a brace at two spaces (a guide's pages at six), its slug on
// the next line, and both dates on lines of their own. Each page is dated on
// its own; a sheet edit is the event's, and moves every page through `with`
// in ../../dated.ts.
//
// The English twin (card ~/mind/ai/dubai/events/tasks/
// 2026-10-24-creamfields-chile-en.md) is guides[1]: the writer's round 2
// with the session's swaps after gate 2 (the card's section 5, 5.4, T1-T9),
// [key] tags left in, its only additions marks, as above, and the short
// jump labels of its tickets page (the fest director, gate 3). With it, on
// 24 October 2026:
// - the twin scout's round 1 merged into the sheet as its `changes:` and
//   `additions:` say, with its two repair blocks (S1, S2) and sources
//   s28-s40; `scout` holds the rows of that card the copy cites;
// - the hops only the twin links, each titled in English, and `titles.en`
//   on the six both guides link (copy.ts reads the title in the guide's
//   own language, GoTarget.titleLang);
// - the writer's E-list on the Spanish guide, with the es-CL reader's
//   three notes (E11, E12, E15).
//
// No @dst/* import and nothing but erasable TypeScript: tools/lastmod.mjs
// loads this file through dated.ts with Node's type stripping.
import type { FestEvent, Guide } from "../types";
export const events: FestEvent[] = [
  {
    slug: "creamfields-chile",
    createdAt: "2026-10-22T17:00:00+04:00",
    updatedAt: "2026-10-24T08:25:00+04:00",
    name: "Creamfields Chile",
    edition: { start: "2026-11-14", end: "2026-11-15" },
    // These keys carry no readOn of their own. The scout's round 1 read them
    // on 21 October with the rest ("Every readOn below is 2026-10-21"); the
    // English twin's scout read them again on 24 October, unchanged.
    readOverrides: {
      "event.organiser": "2026-10-24",
      "tickets.tiers": "2026-10-24",
      "tickets.formats": "2026-10-24",
      "tickets.service_charge": "2026-10-24",
      "tickets.includes.general": "2026-10-24",
      "tickets.includes.village": "2026-10-24",
      "tickets.includes.sky_lounge": "2026-10-24",
      "tickets.includes.diamond_lounge": "2026-10-24",
    },
    // The MusicEvent on the guide's main page (rules.ts). Dates alone: no
    // source gives a time for the gates (schedule_v2.doors). The address is
    // venue.address in its parts, with no region and no postcode, which the
    // sheet does not have; the point is the club's own marker on its contact
    // page (venue.geo_venue, s3), as the fest director ruled at gate 3, not
    // the seller's pair about 100 m south (venue.lat, venue.lon). The
    // organiser is the company the seller names (event.organiser), which has
    // no site of its own to give as sameAs. One offer (the session's X2):
    // the lowest figure the tables print in the normal-price column, $98.000
    // for Day Ticket sábado General, Venta 2 (prices_v2.lowest_unstruck_
    // normal), without the 12,5% charge, since no source prints a total;
    // the cell it names moves only when the scout re-reads the tables. Valid
    // from the general sale, 8 May 2026 at 12:00 (tickets.general_sale.from,
    // s7), Santiago time, UTC-4 in May.
    markup: {
      startDate: "2026-11-14",
      endDate: "2026-11-15",
      address: { streetAddress: "Av. Blanco Encalada 2540", addressLocality: "Santiago", addressCountry: "CL" },
      geo: "venue.geo_venue",
      organizer: { name: "Street Machine Producciones" },
      offers: { price: { key: "prices_v2.lowest_unstruck_normal", currency: "CLP" }, go: "tickets", seller: "Punto Ticket", validFrom: "2026-05-08T12:00:00-04:00" },
    },
    sheet: {
      event: {
        name: "Creamfields Chile",
        slug: "creamfields-chile",
        organiser: "Street Machine Producciones Ltda. (RUT 77.929.090-5)",
        kind: "music festival",
        brand_origin: "Creamfields, UK, first edition 1998 (per CNN Chile, media)",
      },
      editions: [
        {
          year: 2026,
          start: "2026-11-14",
          end: "2026-11-15",
          days: ["sábado 14", "domingo 15"],
          status: "announced",
          on_sale: true,
          venue: "v1",
          source: "s1",
          readOn: "2026-10-24",
          announcedOn: "2026-03-17",
          announced_source: "s9",
        },
        {
          year: 2025,
          start: "2025-10-11",
          end: "2025-10-12",
          status: "past",
          venue: "v1",
          note: "20th-anniversary edition; headliners per media David Guetta, Armin van Buuren, deadmau5, Alok, Claptone; the seller's 2025 page is gone (puntoticket.com/creamfields-2025 answers an empty 53-byte body), so the dates rest on La Tercera",
          source: "s8",
          readOn: "2026-10-21",
        },
        {
          year: 2024,
          status: "past",
          note: "80+ names, Swedish House Mafia among them, per CNN Chile; dates and venue not confirmed at source",
          source: "s10",
          readOn: "2026-10-21",
        },
      ],
      venue: {
        key: "v1",
        name: "Club Hípico de Santiago",
        address: "Av. Blanco Encalada 2540, Santiago Centro, Santiago, Chile",
        lat: -33.4594231,
        lon: -70.6707,
        city: "Santiago",
        country: "CL",
        timezone: "America/Santiago",
        phone: "+56 2 2693 9600",
        email: "contacto@clubhipico.cl",
        source: "s3",
        readOn: "2026-10-21",
        coords_source: "s1",
        geo_venue: {
          lat: -33.458531,
          lon: -70.6707622,
          source: "s3",
          readOn: "2026-10-22",
          note: "added by the executor, not the scout: marker 0, 'Avda. Blanco Encalada #2540', in the markers list of the club's contact page script, read by curl on 2026-10-22 (fest director, gate 3, ruling 7)",
        },
        note: "address and contact from the venue; coordinates from the seller's JSON-LD; the venue's outdoor 'Sector Polo' is listed at 50,000 capacity on s4, not stated as the festival's capacity",
      },
      sellers: [
        {
          name: "Punto Ticket",
          url: "https://www.puntoticket.com/creamfields-2026",
          official: true,
          kind: "sole official seller; creamfields.cl redirects here",
          source: "s1",
          readOn: "2026-10-21",
        },
        {
          name: "Punto Ticket (event listing)",
          url: "https://www.puntoticket.com/evento/creamfields-2026",
          official: true,
          source: "s2",
          readOn: "2026-10-21",
        },
      ],
      tickets: {
        tiers: ["Ticket General", "Ticket The Village", "Ticket Sky Lounge", "Ticket Diamond Lounge"],
        formats: ["Weekend Ticket (both days)", "Day Ticket Sábado", "Day Ticket Domingo"],
        service_charge: "12,5 % added on top of the listed prices (s1: 'PRECIOS NO INCLUYEN CARGO POR SERVICIO DEL 12,5%')",
        reserve_plan: {
          deposit: 40000,
          currency: "CLP",
          text: "ABONA $40.000 y paga el resto en 2 cuotas sin interés con cualquier medio de pago",
          applies_to: "General, The Village, Sky Lounge & Diamond Lounge",
          not_combinable_with: "the Banco de Chile 20 % discount",
          note: "the seller page today says 2 instalments (session's pane read confirms); the April release and the Weekend T&C PDF (s5) said 3, due 1 Jun / 1 Jul / 1 Aug 2026 - history only, those dates are past; a separate Day Ticket PDF exists (s6, not read); superseded by reserve_plan_v2.seller_page.status (2026-10-24)",
          source: "s1",
          readOn: "2026-10-21",
        },
        bank_presale: {
          bank: "Banco de Chile",
          discount: "20 %",
          weekend: "6 May 2026 12:00 to 8 May 11:30, 5,000 Weekend + 5,000 day tickets",
          day: "from 28 Aug 2026 12:00, 2,500 Saturday + 2,500 Sunday day tickets",
          max_per_customer: 4,
          source: "s1",
          readOn: "2026-10-21",
        },
        general_sale: {
          from: "2026-05-08 12:00",
          source: "s7",
          readOn: "2026-10-21",
        },
        includes: {
          general: [
            "acceso general al festival",
            "acceso a todos los escenarios",
            "zonas gastronómicas y barras",
            "puntos de hidratación gratuitos",
            "activaciones y experiencias de marca",
            "acceso a lockers (pagados)",
          ],
          village: [
            "todo lo del ticket general",
            "ingreso diferenciado",
            "acceso exclusivo a PIT frente al Main Stage",
            "baños tipo trailer",
            "zona coctelera y gastronómica by ÑAM",
            "zonas de descanso y sombras",
            "lockers (pagados)",
          ],
          sky_lounge: [
            "todo lo de The Village",
            "estructura en altura con sombra dentro de The Village, con vista al Main Stage",
            "barra exclusiva y servicio de garzones",
            "cóctel de bienvenida con vaso oficial 2026",
            "una subida a La Gran Rueda por acceso fast track",
          ],
          diamond_lounge: [
            "espacio exclusivo para 400 personas",
            "acceso a The Village",
            "un estacionamiento para el comprador",
            "ingreso directo y exclusivo",
            "estructura en altura con sombra exclusiva para Diamond Lounge",
            "servicio de garzones",
            "barra abierta (open bar)",
            "un almuerzo o comida a elección",
            "visita al backstage del Main Stage",
            "kit a domicilio (pulsera, lanyard oficial con line-up, jockey 2026) para compras hasta el 25 de octubre 23:59; compras posteriores lo retiran en el festival",
            "una subida a la rueda por acceso fast track",
          ],
        },
        includes_source: "s1 (text) and s20 (session's pane read, 2026-10-21)",
      },
      prices: [
        {
          label: "Weekend Ticket General, Venta 4, precio normal",
          amount: 160000,
          currency: "CLP",
          seller: "puntoticket",
          phase: "Venta 4 (Early Bird 128.000, Venta 2 138.000, Venta 3 146.000 struck)",
          bank_price: 128000,
          bank_struck: true,
          source: "s20",
          readOn: "2026-10-21",
        },
        {
          label: "Day Ticket sábado General, Venta 4, precio normal",
          amount: 120000,
          currency: "CLP",
          seller: "puntoticket",
          phase: "Venta 4; Venta 2 98.000 and Venta 3 106.000 not struck on the image; Early Bird 92.000 struck",
          bank_price: 96000,
          bank_struck: false,
          source: "s20",
          readOn: "2026-10-21",
        },
        {
          label: "Day Ticket domingo General",
          amount: 120000,
          currency: "CLP",
          seller: "puntoticket",
          phase: "every phase struck (EB 92.000, V2 98.000, V3 106.000, V4 120.000): the seller's table shows no open phase for it; the seller's text does not say 'agotado', so neither does the page",
          bank_price: 96000,
          bank_struck: true,
          source: "s20",
          readOn: "2026-10-21",
        },
        {
          label: "Weekend Ticket The Village, Venta 4, precio normal",
          amount: 240000,
          currency: "CLP",
          seller: "puntoticket",
          phase: "Venta 4 (EB 206.000, V2 216.000, V3 226.000 struck)",
          bank_price: 192000,
          bank_struck: true,
          source: "s20",
          readOn: "2026-10-21",
        },
        {
          label: "Day Ticket sábado The Village, Venta 4, precio normal",
          amount: 170000,
          currency: "CLP",
          seller: "puntoticket",
          phase: "Venta 4; V2 144.000 and V3 154.000 not struck; EB 134.000 struck",
          bank_price: 136000,
          bank_struck: false,
          source: "s20",
          readOn: "2026-10-21",
        },
        {
          label: "Day Ticket domingo The Village, Venta 4, precio normal",
          amount: 170000,
          currency: "CLP",
          seller: "puntoticket",
          phase: "every phase struck (EB 134.000, V2 144.000, V3 154.000, V4 170.000)",
          bank_price: 136000,
          bank_struck: true,
          source: "s20",
          readOn: "2026-10-24",
        },
        {
          label: "Weekend Ticket Sky Lounge, Venta 4, precio normal",
          amount: 320000,
          currency: "CLP",
          seller: "puntoticket",
          phase: "Venta 4 (EB 276.000, V2 286.000, V3 296.000 struck)",
          bank_price: 256000,
          bank_struck: true,
          source: "s20",
          readOn: "2026-10-21",
        },
        {
          label: "Day Ticket sábado Sky Lounge, Venta 4, precio normal",
          amount: 250000,
          currency: "CLP",
          seller: "puntoticket",
          phase: "Venta 4; EB 196.000, V2 206.000, V3 216.000 not struck",
          bank_price: 200000,
          bank_struck: false,
          source: "s20",
          readOn: "2026-10-21",
        },
        {
          label: "Day Ticket domingo Sky Lounge, Venta 4, precio normal",
          amount: 250000,
          currency: "CLP",
          seller: "puntoticket",
          phase: "every phase struck (EB 196.000, V2 206.000, V3 216.000, V4 250.000)",
          bank_price: 200000,
          bank_struck: true,
          source: "s20",
          readOn: "2026-10-24",
        },
        {
          label: "Weekend Ticket Diamond Lounge, Venta 4, precio normal",
          amount: 850000,
          currency: "CLP",
          seller: "puntoticket",
          phase: "Venta 4; V3 800.000 not struck; EB 700.000 and V2 750.000 struck",
          bank_price: 680000,
          bank_struck: true,
          source: "s20",
          readOn: "2026-10-21",
        },
        {
          label: "Day Ticket sábado Diamond Lounge, Venta 4, precio normal",
          amount: 600000,
          currency: "CLP",
          seller: "puntoticket",
          phase: "Venta 4; EB 450.000, V2 500.000, V3 550.000 not struck",
          bank_price: 480000,
          bank_struck: false,
          source: "s20",
          readOn: "2026-10-21",
        },
        {
          label: "Day Ticket domingo Diamond Lounge, Venta 4, precio normal",
          amount: 600000,
          currency: "CLP",
          seller: "puntoticket",
          phase: "Venta 4; V3 550.000 not struck; EB 450.000 and V2 500.000 struck",
          bank_price: 480000,
          bank_struck: true,
          source: "s20",
          readOn: "2026-10-24",
        },
        {
          label: "range across all tiers and formats, seller's structured data (AggregateOffer lowPrice/highPrice)",
          low: 118400,
          high: 956250,
          currency: "CLP",
          seller: "puntoticket",
          source: "s1",
          readOn: "2026-10-21",
          note: "the JSON-LD aggregate; consistent with the image tables once the 12,5 % charge is added (no longer the only text figure)",
        },
        {
          label: "early bird, per day, stale",
          amount: 92000,
          currency: "CLP",
          seller: "Punto Ticket via chile.travel",
          source: "s11",
          readOn: "2026-10-21",
          note: "from Sernatur's listing written in the April presale window; matches the Early Bird day price now struck; do not print as a price",
        },
      ],
      age: {
        min: 18,
        text: "Evento para mayores de 18 años.",
        source: "s1",
        readOn: "2026-10-24",
      },
      reduced_mobility: {
        text: "Ticket movilidad reducida: solo para personas con credencial de discapacidad; se pedirá para poder acceder al evento",
        applies_to: "General tables only",
        source: "s20",
        readOn: "2026-10-24",
      },
      entry: {
        chileans: "cédula de identidad o pasaporte chileno vigente",
        foreigners: "únicamente pasaporte extranjero vigente, en un punto de verificación exclusivo en el acceso",
        originals_only: true,
        source: "s1",
        readOn: "2026-10-24",
      },
      lineup: {
        announcedOn: "2026-08-07",
        size: "85 artists, 39 international and 46 Chilean (per s12/s13, media quoting the organiser)",
        headliners: ["Calvin Harris", "Boris Brejcha", "Charlotte de Witte", "Fisher", "Hardwell", "Hugel"],
        also_named_by_media: [
          "The Blessed Madonna",
          "Don Diablo",
          "Jonas Blue",
          "Kölsch",
          "Anfisa Letyago",
          "Enrico Sangiuliano",
          "Loud Luxury",
          "Âme Live",
          "Faithless Sound System",
          "Bruno Martini",
        ],
        // Dated 2026-10-22, not the session's pane read of the 21st: the
        // gate-2 ruling (the card's section 4, fest director round 2 (b) and
        // the session after gate 2, item 2) moved the line-up's reading to 22
        // October once the fact-checker found the image byte-identical that
        // day, and the critic's own fetch on 22 October found it
        // hash-identical again (critic m1). lineup.readOn below says the same.
        by_day_source: "s20 (the seller's line-up-x-dia.png, read in full by the session in the pane on 2026-10-21, byte-identical again on 2026-10-22); day and stage only, no set times; Morten plays both days; Saturday Main Stage carries one 'Artist TBC'",
        by_day: [
          {
            day: "Sábado 14 de noviembre",
            date: "2026-11-14",
            stages: [
              {
                stage: "Main Stage",
                acts: [
                  "Hardwell",
                  "Boris Brejcha",
                  "Artist TBC",
                  "Morten",
                  "LP Giobbi",
                  "Aerobica",
                  "Carla Valenti",
                ],
              },
              {
                stage: "A Stage",
                acts: [
                  "Don Diablo",
                  "Jonas Blue",
                  "Two Friends",
                  "MATTN",
                  "Bruno Martini",
                  "Groovearth",
                  "Alexander Robledo",
                  "Javica",
                ],
              },
              {
                stage: "Alternative",
                acts: [
                  "Warface",
                  "Brennan Heart",
                  "The Straikerz",
                  "Mutilator",
                  "Bass Modulators",
                  "Virtual Riot",
                  "STMZ",
                  "Rebelnoise",
                  "Jokerz",
                ],
              },
              {
                stage: "HE.SHE.THEY",
                acts: [
                  "AZYR",
                  "Cristobal Pesce",
                  "Charlie Sparks",
                  "Clara Cuvé",
                  "Yanamaste",
                  "EM11",
                  "Superqueer B2B Giullian",
                ],
              },
              {
                stage: "Radio Carolina",
                acts: [
                  "Gonzalo Vallejo B2B Natalia Pastor",
                  "Saulo",
                  "Nico Ferrada",
                  "Bruno Bona",
                  "Turbangirll",
                  "Gaby Yavar",
                  "Arayko",
                  "Osvaldo Solorza",
                ],
              },
              {
                stage: "Grieta x Panal Records",
                acts: ["Potenciómetro", "F600", "Fantasna", "Bele Cox", "Nara Back"],
              },
            ],
          },
          {
            day: "Domingo 15 de noviembre",
            date: "2026-11-15",
            stages: [
              {
                stage: "Main Stage",
                acts: [
                  "Calvin Harris",
                  "Charlotte de Witte",
                  "Fisher",
                  "Hugel",
                  "Innellea",
                  "Miss Javi",
                  "O-Sessions",
                ],
              },
              {
                stage: "A Stage",
                acts: [
                  "Morten",
                  "Loud Luxury",
                  "Bassjackers",
                  "Jaden Bojsen",
                  "Aaron Hibell",
                  "Colayuta",
                  "Ania",
                ],
              },
              {
                stage: "Cream",
                acts: [
                  "Faithless Sound System",
                  "The Blessed Madonna",
                  "Kölsch",
                  "Nic Fanciulli",
                  "Sosa",
                  "Camilo Gil",
                  "Gianni B2B Francisco Martinez",
                  "Tweeter",
                ],
              },
              {
                stage: "Feral",
                acts: [
                  "Yanamaste Live",
                  "Delia",
                  "Enrico Sangiuliano",
                  "Âme Live",
                  "Anfisa Letyago",
                  "NPLNSSS",
                  "Marcelo Antonio",
                ],
              },
              {
                stage: "Radio Carolina",
                acts: [
                  "Juan Hinrichsen",
                  "Luka Kuhnow",
                  "Josefina",
                  "Fanvel",
                  "Alex Brugnara",
                  "Urubmara",
                  "Syntrovert",
                  "ICA DJ",
                ],
              },
              {
                stage: "Grieta x Panal Records",
                acts: ["Alisú", "Dupøuy", "Weisser", "Elias Deepman", "Fuzzler"],
              },
            ],
          },
        ],
        source: "s1",
        names_source: "s20 for every name above (the organiser's bill as the seller publishes it); s12 and s14 were the leads and agree with it",
        readOn: "2026-10-24",
        stages: [
          "Main Stage (named on s1)",
          "a new 5,000 m² zone with an amphitheatre, 3,000 seated and 5,000 standing, holding one of the main stages (s15)",
        ],
        note: "line-up-x-dia.png unchanged: Last-Modified Thu, 27 Aug 2026 22:05:10 GMT, ETag c5839f9e7ca12311fcb168351046ce5a, 688454 bytes today; byte-identical to the 21 Oct file per the fact-checker. The copy's 'leído el 21 de octubre' on the line-up page becomes the 22nd; the 14-day limit moves to 5 Nov 2026",
        reread: "line-up-x-dia.png byte-identical (ETag c5839f9e7ca12311fcb168351046ce5a, 688454 bytes, Last-Modified Thu, 27 Aug 2026 22:05:10 GMT); the 14-day limit moves to 7 Nov 2026",
      },
      schedule: {
        set_times: "not published as of 2026-10-21; the 'Horarios por día' page is the line-up by day and stage above, with an honest line that set times are not published",
        doors: "not published; the seller's JSON-LD startDate 2026-11-15T13:01:00 is a listing artefact, not a doors time",
        precedent: "in 2025 the day-by-day line-up came with the line-up announcement on 4 Aug 2025 (Meganoticias, media); set times were not found for 2025 either",
        readOn: "2026-10-21",
      },
      transport: [
        {
          how: "Airport (SCL) to the centre: Centropuerto bus to the stop it names 'Metro República', Intermodal Pajaritos or Terminal Sur; CLP 2.400 one way, CLP 4.100 return; República and Pajaritos every 10 to 15 minutes Monday to Friday and every 15 to 25 minutes on Saturdays, Sundays and holidays, Terminal Sur every 30 minutes every day (route pages); the home page's own line is 'every 15 minutes, every day'",
          source: ["s16", "s36", "s38", "s39"],
          readOn: "2026-10-24",
        },
        {
          how: "Centre to the venue: Club Hípico is at Av. Blanco Encalada 2540, Santiago Centro; neither the organiser nor the venue names a Metro station, and metro.cl stays unread (session's ruling), so 'Cómo llegar' is the venue's address and an 'abrir en mapas' link through /go/, with no station named",
          source: "s3",
          readOn: "2026-10-21",
          status: "partial",
        },
        {
          how: "Parking, buses, taxi/app drop-off: not on the venue's site (its 'Cómo llegar' section is empty)",
          source: "s3",
          readOn: "2026-10-21",
          status: "not_found",
        },
      ],
      questions: [
        {
          q: "¿Cuándo es Creamfields Chile 2026?",
          seen: "autocomplete 'creamfields chile 2026 fecha'",
          answer_from: ["s1", "s9"],
        },
        {
          q: "¿Dónde es Creamfields Chile 2026?",
          seen: "autocomplete 'creamfields chile 2026'",
          answer_from: ["s1", "s3"],
        },
        {
          q: "¿Cuánto cuestan las entradas de Creamfields 2026?",
          seen: "autocomplete 'creamfields chile 2026 precio' / 'entradas'",
          answer_from: ["s1"],
        },
        {
          q: "¿Quiénes tocan en Creamfields Chile 2026? / artistas confirmados",
          seen: "autocomplete 'creamfields chile 2026 artistas', 'line up', 'artistas confirmados'",
          answer_from: ["s1", "s12", "s14"],
        },
        {
          q: "¿Cuál es el line up por día de Creamfields 2026?",
          seen: "autocomplete 'creamfields chile 2026 line up por dia'",
          answer_from: ["s1"],
        },
        {
          q: "¿Cuáles son los horarios de Creamfields 2026?",
          seen: "autocomplete 'creamfields chile 2026 horarios'",
          answer_from: ["s1"],
          note: "not published; answer says so and what the 2025 precedent was",
        },
        {
          q: "¿Qué es Creamfields Chile?",
          seen: "autocomplete 'creamfields chile 2026 que es'",
          answer_from: ["s10", "s8"],
        },
        {
          q: "¿Cómo funciona la preventa Banco de Chile para Creamfields?",
          seen: "autocomplete 'creamfields chile 2026 banco chile'",
          answer_from: ["s1"],
        },
        {
          q: "¿Cuándo es Creamfields Chile 2027?",
          seen: "autocomplete 'creamfields chile 2027'",
          answer_from: ["s9", "s8"],
          note: "not announced; the organiser announced 2026 on 17 Mar 2026 and 2025 on 26 May 2025",
        },
        {
          q: "¿Cuándo fue Creamfields Chile 2025 y quiénes tocaron?",
          seen: "autocomplete 'creamfields chile 2025', 'creamfields chile 2025 lineup'",
          answer_from: ["s8", "s10"],
        },
        {
          q: "¿Es para mayores de 18?",
          seen: "seller page (entry conditions block)",
          answer_from: ["s1"],
        },
        {
          q: "¿Puedo entrar con pasaporte extranjero?",
          seen: "seller page (entry conditions block)",
          answer_from: ["s1"],
        },
        {
          q: "¿Qué incluye The Village / Sky Lounge / Diamond Lounge?",
          seen: "seller page; Chilevisión and Meganoticias coverage",
          answer_from: ["s1"],
        },
        {
          q: "¿Qué es el Plan de Reserva de Creamfields?",
          seen: "seller page; La Tercera 28 Apr 2026",
          answer_from: ["s1", "s5", "s7"],
        },
        {
          q: "¿Cómo llegar al Club Hípico en metro?",
          seen: "web search results (tourist guides), no official page reachable",
          answer_from: ["s3"],
          note: "no station from an official page; answer with the address and the map link only",
        },
        {
          q: "¿Dónde será Creamfields en 2026?",
          seen: "people also ask (queries 1, 2, 4)",
          answer_from: ["s1", "s3"],
        },
        {
          q: "¿Cuánto cuestan las entradas para Creamfields Chile en 2026?",
          seen: "people also ask (queries 1, 2, 3, 4)",
          answer_from: ["s20", "s1"],
        },
        {
          q: "¿Qué artistas se presentarán en Creamfields Chile 2026?",
          seen: "people also ask (queries 1, 2, 3, 4, 5)",
          answer_from: ["s20"],
        },
        {
          q: "¿Cuál es el horario de Creamfields 2026?",
          seen: "people also ask (query 3)",
          answer_from: ["s20"],
          note: "day and stage only; set times not published",
        },
        {
          q: "¿Dónde está el Creamfields 2026? / ¿Dónde se hace Creamfields 2026?",
          seen: "people also ask (queries 3, 4, 5)",
          answer_from: ["s1", "s3"],
        },
        {
          q: "¿Cuál es el valor de Creamfields Chile 2026?",
          seen: "people also ask (query 5)",
          answer_from: ["s20"],
        },
        {
          q: "¿Hay algún festival de electrónica en Chile? / ¿Hay algún concierto de electrónica en Chile en 2026?",
          seen: "people also ask (queries 1, 2)",
          answer_from: ["s1", "s10"],
          note: "answered in one line on the main page: Creamfields Chile is the one the organiser calls the country's biggest; no list of other festivals",
        },
        {
          q: "¿Quiénes son los artistas confirmados para Creamfields Argentina 2026?",
          seen: "people also ask (query 5)",
          answer_from: [],
          note: "another edition; not for this page",
        },
      ],
      sources: {
        s1: {
          label: "Creamfields Chile 2026, Punto Ticket special page (creamfields.cl redirects here)",
          url: "https://www.puntoticket.com/creamfields-2026",
          kind: "seller",
        },
        s2: {
          label: "Creamfields Chile 2026, Punto Ticket event listing",
          url: "https://www.puntoticket.com/evento/creamfields-2026",
          kind: "seller",
          status: "alias of s1 (301 today); not a link target",
        },
        s3: {
          label: "Club Hípico de Santiago, contact page",
          url: "https://www.clubhipico.cl/contacto/",
          kind: "venue",
        },
        s4: {
          label: "Club Hípico de Santiago, event spaces",
          url: "https://www.clubhipico.cl/eventos/tipos-de-eventos/",
          kind: "venue",
        },
        s5: {
          label: "Creamfields 2026, Términos y Condiciones Sistema de Reserva y Abonos (Weekend Ticket), PDF",
          url: "https://static-puntoticket.s3.amazonaws.com/especiales/sm0194_creamfields-2026/CREAMFIELDS%202026%20-%20T%C3%89RMINOS%20Y%20CONDICIONES%20SISTEMA%20DE%20RESERVA%20Y%20ABONOS.pdf",
          kind: "seller",
        },
        s6: {
          label: "Creamfields 2026, Términos y Condiciones Reserva y Abonos Day Ticket, PDF",
          url: "https://static-puntoticket.s3.amazonaws.com/especiales/sm0194_creamfields-2026/CREAMFIELDS%202026%20-%20TE%CC%81RMINOS%20Y%20CONDICIONES%20SISTEMA%20DE%20RESERVA%20Y%20ABONOS%20DAY%20TICKET.pdf",
          kind: "seller",
          status: "read today (decoded, see reserve_plan_v2.day_pdf.read_how); label drops '(not read)'",
        },
        s7: {
          label: "Punto Ticket, 'Anuncio fecha venta de entradas' (organiser's release, 28 Apr 2026)",
          url: "https://www.puntoticket.com/anuncio-fecha-venta-de-entradas",
          kind: "seller",
        },
        s8: {
          label: "La Tercera Culto, 'Creamfields Chile 2025 tendrá dos días de fiesta por sus 20 años', 26 May 2025",
          url: "https://www.latercera.com/culto/noticia/creamfields-chile-2025-tendra-dos-dias-de-fiesta-por-sus-20-anos/",
          kind: "media",
        },
        s9: {
          label: "Radio Agricultura, 'Vuelve Creamfields Chile: anuncian fechas para la edición 2026', 17 Mar 2026",
          url: "https://www.radioagricultura.cl/entretencion/vuelve-creamfields-chile-anuncian-fechas-para-la-edicion-2026-del-festival-electronico_20260317/",
          kind: "media",
        },
        s10: {
          label: "CNN Chile, 'Vuelve Creamfields Chile: Cuándo es la edición 2026 en Santiago y cómo inscribirse para la preventa' (URL dated 19 Mar 2026, no date on the page)",
          url: "https://www.cnnchile.com/cultura/creamfields-chile-2026-fecha-14-15-noviembre-club-hipico-registro-preventa_20260319/",
          kind: "media",
        },
        s11: {
          label: "Chile Travel (Sernatur), 'Creamfields Chile 2026'",
          url: "https://chile.travel/eventos/creamfields-chile-2026/",
          kind: "public body",
        },
        s12: {
          label: "Meganoticias, 'Con Calvin Harris a la cabeza: este es el line-up de Creamfields Chile 2026', 7 Aug 2026",
          url: "https://www.meganoticias.cl/tendencias/528854-creamfields-chile-line-up-2026-7-8-2023.html",
          kind: "media",
        },
        s13: {
          label: "24horas.cl, 'Creamfields Chile 2026 revela cartel', 7 Aug 2026",
          url: "https://www.24horas.cl/tendencias/espectaculos/creamfields-chile-2026-revela-cartel-calvin-harris-",
          kind: "media",
        },
        s14: {
          label: "Billboard Brasil, 'Creamfields Chile 2026 anuncia line-up', 7 Aug 2026 (Portuguese; lead only, not for the page)",
          url: "https://billboard.com.br/creamfields-chile-2026-line-up/",
          kind: "media",
        },
        s15: {
          label: "Punto Ticket, news item 'Creamfields Chile crece: Suma una nueva zona de 5.000 m² y estrena anfiteatro en Club Hípico' on the official event page (unsigned, undated; no source calls it the organiser's release)",
          url: "https://www.puntoticket.com/creamfields-crece",
          kind: "seller",
          note: "not a 'comunicado': the page carries no byline, date or release wording, and Radio Agricultura's 28 Apr 2026 report of the new zone does not use the word either (fact-checker's read); the copy says 'en su página oficial en Punto Ticket, en la noticia «Creamfields Chile crece»'",
        },
        s16: {
          label: "Centropuerto, airport bus",
          url: "https://www.centropuerto.cl/",
          kind: "transport operator",
        },
        s17: {
          label: "Punto Ticket, 'Creamfields Chile 2026 presenta The Village'",
          url: "https://www.puntoticket.com/creamfields-chile-2026-presenta-the-village-el-nuevo-espacio-de-experiencias-premium-dentro-del-festival",
          kind: "seller",
        },
        s18: {
          label: "La Tercera Culto, 'Creamfields Chile 2026: parte la venta de entradas', 28 Apr 2026",
          url: "https://www.latercera.com/culto/noticia/creamfields-chile-2026-parte-la-venta-de-entradas-para-el-mayor-festival-de-musica-electronica-del-pais/",
          kind: "media",
        },
        s19: {
          label: "Creamfields Chile on Instagram (organiser's channel; not fetched)",
          url: "https://www.instagram.com/creamfields_cl",
          kind: "organiser",
        },
        s20: {
          label: "Creamfields Chile 2026, the seller's price tables and line-up-by-day images on the Punto Ticket page (static.ptocdn.net/especiales/ptt018_creamfields-2026/img/ and sm0194_creamfields-2026/img/: line-up-x-dia.png, sabado-*/domingo-* price tables, 1-v4/7-v2/4-v3/v_1-v3 weekend tables), read by the session in the pane on 2026-10-21",
          url: "https://www.puntoticket.com/creamfields-2026",
          image: "https://static.ptocdn.net/especiales/ptt018_creamfields-2026/img/line-up-x-dia.png",
          kind: "seller",
        },
        s21: {
          label: "Radio Agricultura, 'Creamfields Chile 2025 celebra sus 20 años…', 23 May 2025",
          url: "https://www.radioagricultura.cl/entretencion/hoy-se-sale/creamfields-chile-2025-celebra-sus-20-anos-con-una-fiesta-que-promete-romper-todos-los-records_20250523/",
          kind: "media",
        },
        s22: {
          label: "24horas.cl, 'Creamfields Chile 2025 confirma artistas: David Guetta…', 13 Jun 2025",
          url: "https://www.24horas.cl/tendencias/espectaculos/creamfields-chile-2025-confirma-artistas-david-guetta",
          kind: "media",
        },
        s23: {
          label: "Meganoticias, 'Revelan el line-up diario de Creamfields…', 4 Aug 2025",
          url: "https://www.meganoticias.cl/tendencias/494328-creamfields-line-up-diario-artistas-venta-de-entradas-precios-pdp-4-8-2025.html",
          kind: "media",
        },
        // Read by the English twin's scout, 24 October 2026 (s28-s35 its round 1,
        // s36-s40 its repair S1).
        s28: {
          label: "Creamfields (UK), History",
          url: "https://creamfields.com/history/",
          kind: "organiser",
          note: "the brand owner's site (Live Nation), not the Chilean organiser",
          readOn: "2026-10-24",
        },
        s29: {
          label: "Creamfields (UK), International",
          url: "https://creamfields.com/international/",
          kind: "organiser",
          readOn: "2026-10-24",
        },
        s30: {
          label: "GOV.UK, Chile travel advice: entry requirements",
          url: "https://www.gov.uk/foreign-travel-advice/chile/entry-requirements",
          kind: "public body",
          readOn: "2026-10-24",
        },
        s31: {
          label: "Government of Canada, Travel advice: Chile (entry and exit requirements)",
          url: "https://travel.gc.ca/destinations/chile",
          kind: "public body",
          readOn: "2026-10-24",
        },
        s32: {
          label: "Centropuerto, airport bus (English)",
          url: "https://www.centropuerto.cl/?locale=en",
          kind: "transport operator",
          readOn: "2026-10-24",
        },
        s33: {
          label: "Punto Ticket help centre, '¿Puedo devolver, cancelar o cambiar mi entrada?'",
          url: "https://ayuda.puntoticket.cl/helpcenter/article/puedo-devolver-cancelar-o-cambiar-mi-entrada",
          kind: "seller",
          readOn: "2026-10-24",
        },
        s34: {
          label: "Punto Ticket help centre, '¿Qué son las entradas nominativas?'",
          url: "https://ayuda.puntoticket.cl/helpcenter/article/que-son-las-entradas-nominativas",
          kind: "seller",
          readOn: "2026-10-24",
        },
        s35: {
          label: "Chile Travel (Sernatur), 'Two days of electronic music in Santiago'",
          url: "https://chile.travel/en/events/creamfields-chile-2026/",
          kind: "public body",
          readOn: "2026-10-24",
        },
        s36: {
          label: "Centropuerto, República – Airport route",
          url: "https://www.centropuerto.cl/los-rutas?departureStation=CLSCLSLH&arrivalArea=CLSCLSA",
          kind: "transport operator",
          en: "same URL + &locale=en",
          readOn: "2026-10-24",
        },
        s37: {
          label: "Centropuerto, Maipú – Airport route",
          url: "https://www.centropuerto.cl/maipu-rutas",
          kind: "transport operator",
          en: "?locale=en",
          readOn: "2026-10-24",
        },
        s38: {
          label: "Centropuerto, Pajaritos – Airport route",
          url: "https://www.centropuerto.cl/pajaritos-rutas?departureStation=CLSCLIPA&arrivalArea=CLSCLSA",
          kind: "transport operator",
          readOn: "2026-10-24",
        },
        s39: {
          label: "Centropuerto, Terminal Sur – Airport route",
          url: "https://www.centropuerto.cl/terminalsur-rutas?departureStation=CLSCLTES&arrivalArea=CLSCLSA",
          kind: "transport operator",
          readOn: "2026-10-24",
        },
        s40: {
          label: "Centropuerto, Preguntas frecuentes",
          url: "https://www.centropuerto.cl/centro-faq",
          kind: "transport operator",
          readOn: "2026-10-24",
        },
      },
      not_found: [
        "sold-out status per tier: the seller's text says nothing about stock; its images strike earlier phases and every phase of Day Ticket domingo General (Meganoticias 7 Aug: 'últimas Weekend Tickets')",
        "doors time and set times for either day (the line-up image gives day and stage only)",
        "the 'Artist TBC' on Saturday's Main Stage",
        "the venue's Metro stations, parking and bus lines from an official page (metro.cl unread by the session's ruling; the venue's 'Cómo llegar' is empty; the organiser names no station)",
        "an official resale or ticket-transfer channel (none named on s1; Reventick is NOT named by the organiser, so it is not linked)",
        "the 2024 and 2025 editions' dates on an organiser or seller page (the 2025 seller page is gone)",
        "the festival's first Chilean edition year (the 2025 '20° aniversario' points to 2005 or 2006; no source says it)",
        "the organiser's own site (streetmachine.cl is the company's streetwear shop; Creamfields is a merchandise collection there, no event facts)",
        "box office hours, lockers' price, re-entry policy",
        "the Metro line serving Centropuerto's 'Metro República' stop, and any Metro station or line for the Club Hípico; tried 2026-10-24: s16, s32 (home ES/EN), s36–s39 (route pages ES/EN), s40 (FAQ): 0 matches for 'Línea', 'L1', 'Line 1'; the stop name 'Metro República' appears only on the home page's trip list. s3 clubhipico.cl/contacto: 0 matches for 'metro'. s35 chile.travel/en/events/creamfields-chile-2026: 0 matches for 'metro'. dtpm.cl (Directorio de Transporte Público Metropolitano) home and /sistema-de-transportes/metro: lines and station counts only, no station list naming República. red.cl home: notices on other stops, nothing on República or the Club Hípico. metro.cl: not tried (403 to curl and the pane, session ruling)",
        "first and last departures of the República, Pajaritos and Terminal Sur routes (not printed on the route pages or the FAQ)",
      ],
      prices_v2: {
        readOn: "2026-10-24",
        reread: "all twelve tables re-read 2026-10-24; nine unchanged",
        source: "s20",
        note: "The seller prints, per ticket type and format, four rows (Early Bird, Venta 2, Venta 3, Venta 4) by two columns ('Precio normal' | 'Compra con 20% dcto Banco de Chile'); a struck cell is a phase the seller marks closed; nothing on the images or the page names the open phase. CLP, before the 12,5% service charge. The bank column is for Banco de Chile credit/debit cardholders (Banco Edwards included) through the bank's payment button, on the ticket value and not on the service charge, max 4 per customer, not combinable with the Plan de reserva. Every bank cell is 80% of its normal cell.",
        lowest_unstruck_any_column: {
          amount: 96000,
          cell: "Day Ticket sábado General, Venta 4, Banco de Chile",
        },
        lowest_unstruck_normal: {
          amount: 98000,
          cell: "Day Ticket sábado General, Venta 2, precio normal",
        },
        highest_unstruck_normal: {
          amount: 850000,
          cell: "Weekend Ticket Diamond Lounge, Venta 4, precio normal",
        },
        images: {
          weekend_tables: "https://static.ptocdn.net/especiales/ptt018_creamfields-2026/img/1-v4.png, …/7-v2.png, …/v_1-v3.png and https://static.ptocdn.net/especiales/sm0194_creamfields-2026/img/4-v3.png (alt 'precio 1/2/3'); which file is which tier is the readers' assignment, not the file name",
          day_tables: "sabado-ticketgeneral-v2.png (ptt018), domingo-general-v3.png (sm0194), sabado-village-v3.png (sm0194), domingo-village-v4.png (sm0194), sabado-skylonge-v1.png (sm0194), domingo-skylonge-v3.png (sm0194), sabado-diamond-v1.png (sm0194), domingo-diamond-v3.png (ptt018), under https://static.ptocdn.net/especiales/<folder>/img/",
        },
        tables: [
          {
            type: "General",
            format: "Weekend Ticket",
            rows: [
              {
                phase: "Early Bird",
                normal: 128000,
                normal_s: "s",
                bank: 102400,
                bank_s: "s",
              },
              {
                phase: "Venta 2",
                normal: 138000,
                normal_s: "s",
                bank: 110400,
                bank_s: "s",
              },
              {
                phase: "Venta 3",
                normal: 146000,
                normal_s: "s",
                bank: 116800,
                bank_s: "s",
              },
              {
                phase: "Venta 4",
                normal: 160000,
                normal_s: "o",
                bank: 128000,
                bank_s: "s",
              },
            ],
          },
          {
            type: "General",
            format: "Day Ticket sábado",
            rows: [
              {
                phase: "Early Bird",
                normal: 92000,
                normal_s: "s",
                bank: 73600,
                bank_s: "s",
              },
              {
                phase: "Venta 2",
                normal: 98000,
                normal_s: "o",
                bank: 78400,
                bank_s: "s",
              },
              {
                phase: "Venta 3",
                normal: 106000,
                normal_s: "o",
                bank: 84800,
                bank_s: "s",
              },
              {
                phase: "Venta 4",
                normal: 120000,
                normal_s: "o",
                bank: 96000,
                bank_s: "o",
              },
            ],
          },
          {
            type: "General",
            format: "Day Ticket domingo",
            rows: [
              {
                phase: "Early Bird",
                normal: 92000,
                normal_s: "s",
                bank: 73600,
                bank_s: "s",
              },
              {
                phase: "Venta 2",
                normal: 98000,
                normal_s: "s",
                bank: 78400,
                bank_s: "s",
              },
              {
                phase: "Venta 3",
                normal: 106000,
                normal_s: "s",
                bank: 84800,
                bank_s: "s",
              },
              {
                phase: "Venta 4",
                normal: 120000,
                normal_s: "s",
                bank: 96000,
                bank_s: "s",
              },
            ],
            note: "every cell struck: the seller's table shows no open phase; the seller's text says nothing, so the page says no more than that",
          },
          {
            type: "The Village",
            format: "Weekend Ticket",
            rows: [
              {
                phase: "Early Bird",
                normal: 206000,
                normal_s: "s",
                bank: 164800,
                bank_s: "s",
              },
              {
                phase: "Venta 2",
                normal: 216000,
                normal_s: "s",
                bank: 172800,
                bank_s: "s",
              },
              {
                phase: "Venta 3",
                normal: 226000,
                normal_s: "s",
                bank: 180800,
                bank_s: "s",
              },
              {
                phase: "Venta 4",
                normal: 240000,
                normal_s: "o",
                bank: 192000,
                bank_s: "s",
              },
            ],
          },
          {
            type: "The Village",
            format: "Day Ticket sábado",
            rows: [
              {
                phase: "Early Bird",
                normal: 134000,
                normal_s: "s",
                bank: 107200,
                bank_s: "s",
              },
              {
                phase: "Venta 2",
                normal: 144000,
                normal_s: "o",
                bank: 115200,
                bank_s: "s",
              },
              {
                phase: "Venta 3",
                normal: 154000,
                normal_s: "o",
                bank: 123200,
                bank_s: "s",
              },
              {
                phase: "Venta 4",
                normal: 170000,
                normal_s: "o",
                bank: 136000,
                bank_s: "o",
              },
            ],
          },
          {
            type: "The Village",
            format: "Day Ticket domingo",
            rows: [
              {
                phase: "Early Bird",
                normal: 134000,
                normal_s: "s",
                bank: 107200,
                bank_s: "s",
              },
              {
                phase: "Venta 2",
                normal: 144000,
                normal_s: "s",
                bank: 115200,
                bank_s: "s",
              },
              {
                phase: "Venta 3",
                normal: 154000,
                normal_s: "s",
                bank: 123200,
                bank_s: "s",
              },
              {
                phase: "Venta 4",
                normal: 170000,
                normal_s: "s",
                bank: 136000,
                bank_s: "s",
              },
            ],
            note: "every cell struck: the seller's table shows no open phase; the seller's text says nothing, so the page says no more than that",
          },
          {
            type: "Sky Lounge",
            format: "Weekend Ticket",
            rows: [
              {
                phase: "Early Bird",
                normal: 276000,
                normal_s: "s",
                bank: 220800,
                bank_s: "s",
              },
              {
                phase: "Venta 2",
                normal: 286000,
                normal_s: "s",
                bank: 228800,
                bank_s: "s",
              },
              {
                phase: "Venta 3",
                normal: 296000,
                normal_s: "s",
                bank: 236800,
                bank_s: "s",
              },
              {
                phase: "Venta 4",
                normal: 320000,
                normal_s: "o",
                bank: 256000,
                bank_s: "s",
              },
            ],
          },
          {
            type: "Sky Lounge",
            format: "Day Ticket sábado",
            rows: [
              {
                phase: "Early Bird",
                normal: 196000,
                normal_s: "o",
                bank: 156800,
                bank_s: "s",
              },
              {
                phase: "Venta 2",
                normal: 206000,
                normal_s: "o",
                bank: 164800,
                bank_s: "s",
              },
              {
                phase: "Venta 3",
                normal: 216000,
                normal_s: "o",
                bank: 172800,
                bank_s: "o",
              },
              {
                phase: "Venta 4",
                normal: 250000,
                normal_s: "o",
                bank: 200000,
                bank_s: "o",
              },
            ],
          },
          {
            type: "Sky Lounge",
            format: "Day Ticket domingo",
            rows: [
              {
                phase: "Early Bird",
                normal: 196000,
                normal_s: "s",
                bank: 156800,
                bank_s: "s",
              },
              {
                phase: "Venta 2",
                normal: 206000,
                normal_s: "s",
                bank: 164800,
                bank_s: "s",
              },
              {
                phase: "Venta 3",
                normal: 216000,
                normal_s: "s",
                bank: 172800,
                bank_s: "s",
              },
              {
                phase: "Venta 4",
                normal: 250000,
                normal_s: "s",
                bank: 200000,
                bank_s: "s",
              },
            ],
            note: "every cell struck: the seller's table shows no open phase; the seller's text says nothing, so the page says no more than that",
          },
          {
            type: "Diamond Lounge",
            format: "Weekend Ticket",
            rows: [
              {
                phase: "Early Bird",
                normal: 700000,
                normal_s: "s",
                bank: 560000,
                bank_s: "s",
              },
              {
                phase: "Venta 2",
                normal: 750000,
                normal_s: "s",
                bank: 600000,
                bank_s: "s",
              },
              {
                phase: "Venta 3",
                normal: 800000,
                normal_s: "o",
                bank: 640000,
                bank_s: "s",
              },
              {
                phase: "Venta 4",
                normal: 850000,
                normal_s: "o",
                bank: 680000,
                bank_s: "s",
              },
            ],
          },
          {
            type: "Diamond Lounge",
            format: "Day Ticket sábado",
            rows: [
              {
                phase: "Early Bird",
                normal: 450000,
                normal_s: "o",
                bank: 360000,
                bank_s: "s",
              },
              {
                phase: "Venta 2",
                normal: 500000,
                normal_s: "o",
                bank: 400000,
                bank_s: "s",
              },
              {
                phase: "Venta 3",
                normal: 550000,
                normal_s: "o",
                bank: 440000,
                bank_s: "o",
              },
              {
                phase: "Venta 4",
                normal: 600000,
                normal_s: "o",
                bank: 480000,
                bank_s: "o",
              },
            ],
          },
          {
            type: "Diamond Lounge",
            format: "Day Ticket domingo",
            rows: [
              {
                phase: "Early Bird",
                normal: 450000,
                normal_s: "s",
                bank: 360000,
                bank_s: "s",
              },
              {
                phase: "Venta 2",
                normal: 500000,
                normal_s: "s",
                bank: 400000,
                bank_s: "s",
              },
              {
                phase: "Venta 3",
                normal: 550000,
                normal_s: "o",
                bank: 440000,
                bank_s: "s",
              },
              {
                phase: "Venta 4",
                normal: 600000,
                normal_s: "o",
                bank: 480000,
                bank_s: "s",
              },
            ],
          },
        ],
        replaces: "the original `prices` rows 1–12 (Venta 4 only, one bank cell each): wrong by omission; the three cells the writer marked NEEDS SCOUT (Sunday Sky Lounge Early Bird 196.000 | 156.800, Venta 2 206.000 | 164.800; Sunday Diamond Early Bird 450.000 | 360.000, all struck) are above; the aggregate row stands; the Sernatur row stands with the s11 correction in item 9",
      },
      bank_offer: {
        readOn: "2026-10-24",
        source: "s1",
        seller_labels: {
          day: "Venta Day ticket Banco de Chile",
          presale_may: "Preventa Banco de Chile",
        },
        day: {
          from: "28 Aug 2026 12:00",
          to: null,
          text: "a partir del 28 de agosto de 2026 a las 12 horas, hasta agotar stock de entradas definidas para el evento",
          cap: "2.500 Day ticket Sábado y 2.500 Day Ticket Domingo",
          status: "no end date on the seller page; the Saturday tables show open bank cells today",
        },
        conditions: "clientes titulares de Tarjetas de Crédito y/o Débito emitidas por Banco de Chile, incluye Banco Edwards; compra en puntoticket.com a través del Botón de Pago Banco de Chile 'Canje y Compra'; máximo 4 entradas por cliente; el descuento sólo aplica para el valor de la entrada, no considera el cargo por servicio; no hay derecho a retracto",
        replaces: "the original `tickets.bank_presale` keeps its values; its key name 'presale' for the Day window and any 'ya pasó' reading of it are wrong: the seller gives the Day window a start and no end",
        presale_may: {
          from: "6 May 2026 12:00",
          to: "8 May 2026 11:30",
          or: "hasta agotar stock",
          cap: "5.000 entradas Weekend y 5.000 Tickets Diarios",
          applies_to: "no format named by the seller; the cap counts Weekend and day tickets",
          also_per_s7: "for Banco de Chile clients and people registered on creamfields.cl, no format named",
          status: "ended by its own end time",
          source: ["s1", "s7"],
          readOn: "2026-10-22",
        },
        instalments: {
          text: "copago con Dólares-Premio y 3, 9 o 12 cuotas sin interés, exclusivo para clientes titulares de Tarjetas de Crédito emitidas por Banco de Chile, incluye Banco Edwards",
          also: ["Transacciones en cuotas están afectas a impuesto de timbres DL3475 que es de cargo del cliente", "Saldo mínimo para canje 200 Dólares-Premio"],
          where: "both the presale_may and the day paragraphs",
          source: "s1",
          readOn: "2026-10-24",
          note: "Chilean cardholders only; for the English page at most a clause",
        },
      },
      reserve_plan_v2: {
        readOn: "2026-10-22",
        seller_page: {
          text: "ABONA $40.000 y paga el resto en 2 cuotas sin interés con cualquier medio de pago",
          applies_to: "General, The Village, Sky Lounge & Diamond Lounge",
          not_combinable: "No acumulable con dcto. Banco de Chile",
          links: "the plan box links s6 ('Revisa términos y condiciones aquí'); s5 is linked separately as 'Revisa términos y condiciones Weekend Ticket aquí'",
          status: {
            text: "not on s1 since at least 2026-10-24: the box with 'ABONA $40.000…' and 'No acumulable con dcto. Banco de Chile' is gone (curl HTML and pane DOM); its slot now holds the Cashless block; s1 still links s5 and s6 under 'Revisa términos y condiciones Weekend Ticket / Day ticket aquí'; no source says the plan has closed or is still sold",
            source: "s1",
            readOn: "2026-10-24",
          },
          source: "s1",
        },
        weekend_pdf: {
          source: "s5",
          last_modified: "unchanged (fact-checker: 5 May 2026)",
          instalments: "Abono Inicial CLP$40.000 por cada Weekend Ticket + 3 abonos adicionales, por montos iguales",
          due: "el primer día del mes durante los meses de junio, julio y agosto de 2026",
          computed_on: "al precio de la categoría seleccionada (cargo por servicio incluido) se le descontará el monto del Abono Inicial",
          example: "CLP$144.000 → Abono Inicial CLP $40.000 y tres abonos de CLP $34.667",
          precedence: "En caso de discrepancia con los Términos y Condiciones de Compra de Punto Ticket y Términos y Condiciones de Devoluciones de Punto Ticket, primarán los Términos y Condiciones del Sistema de Reserva y Abonos contenidos en este documento.",
        },
        day_pdf: {
          source: "s6",
          last_modified: "unchanged (fact-checker: 26 Aug 2026)",
          instalments: "Abono Inicial CLP$40.000 por cada Day Ticket + 2 abonos adicionales, por montos iguales",
          due: "el primer día del mes durante los meses de septiembre y octubre de 2026",
          read_how: "the file's font carries no usable ToUnicode map; I decoded it by glyph alignment against the Weekend file's identical preamble, which leaves a few characters unresolved but every sentence above legible; the fact-checker read the same with PDFKit (S3)",
          computed_on: "al precio de la categoría seleccionada (cargo por servicio incluido) se le descontará el monto del Abono Inicial, y el monto resultante de dicha operación se dividirá en 2 abonos posteriores",
          computed_on_note: "clause 2 of s6, decoded today as described in read_how; same words as s5 with '2 abonos' for '3 abonos'; the copy's calculation sentence may cite s5 and s6 together",
          readOn: "2026-10-22",
        },
        informed: {
          text: "Al usuario se le informará el correspondiente plan de abonos, los montos de cada uno y las fechas de vencimiento para cada uno de ellos.",
          where: "clause 2 of s5 and of s6, same words",
          note: "neither PDF says 'al comprar'",
        },
        caution_clause_3: {
          source: "s5 (verbatim) and s6 (same words, Day Ticket for Weekend Ticket)",
          text: "3. Incumplimiento, multa y atrasos: Si, por cualquier motivo, no realiza alguno de los abonos en la fecha de vencimiento, Punto Ticket enviará un aviso al correo electrónico registrado por el usuario en su portal web de Punto Ticket, requiriéndole la realización del mismo. El usuario entiende, consiente y acepta que su pedido de Weekend Ticket quedará sin efecto automáticamente, liberándose el cupo de la misma para ser comercializado por Punto Ticket. De verificarse el mencionado incumplimiento del usuario, Punto Ticket: (i) retendrá el monto del Abono Inicial de CLP$40.000 a título de tarifa de cancelación e incumplimiento y avaluación anticipada de los perjuicios por incumplimiento, dándose así por resuelto el pedido en forma inmediata y sin necesidad de declaración judicial alguna; y (ii) los abonos restantes ya enterados se convertirán en una Giftcard StreetMachine, con el cual podrás adquirir un ticket nuevo para otro evento musical de Street Machine producciones S.A. que sea informado. Para estos efectos y luego de verificado el incumplimiento, Punto Ticket enviará una comunicación al correo electrónico del usuario registrado en su portal web de Punto Ticket, con la información de la Giftcard StreetMachine con una validez de 12 meses. Conforme a lo establecido en el artículo 3 bis, letra b) de la Ley Nº 19.496 sobre Protección de los Derechos de los Consumidores, el usuario no podrá poner término unilateral a la reserva y pedido efectuado a través del Sistema de Reserva y Abonos, sin expresión de causa. El usuario acepta, además, que no es reembolsable y que no se realizarán cambios ni devoluciones. En caso de cancelación del Festival, se procederá a realizar la devolución de todos los abonos efectuados por el usuario, incluido el Abono Inicial, conforme a los Términos y Condiciones De Devoluciones De Punto Ticket. Atrasos. Si el cargo por el abono es rechazado tendrás (10) días de gracia para regularizarlo, en caso contrario aplica lo anterior.",
          read_note: "the Weekend file's text order scrambles the words between 'ya enter' and 'con el cual' and the Giftcard validity; those two fragments ('ya enterados se convertirán en una Giftcard StreetMachine', 'con una validez de 12 meses') are the Day file's decoded wording and the fact-checker's PDFKit read of both files; the rest is verbatim from s5",
        },
        governs_today: "no source says which document governs a purchase made now; every due date in both PDFs is past; the sheet says nothing about what 'rige hoy'",
        replaces: "the original `tickets.reserve_plan.note` ('history only', 's6 not read', the 3-vs-2 reading): wrong, both PDFs are linked today and s6 is now read",
      },
      entry_v2: {
        readOn: "2026-10-24",
        source: "s1",
        name_match: {
          heading: "Tus datos deben coincidir:",
          text: "El nombre en tu entrada tiene que ser exacto al que figura en tu documento.",
          followed_by: "entry refused to anyone who does not validate identity on these terms (fact-checker's read of the ID modal)",
        },
        chileans_wording: "the seller's condition is 'Si tienes cédula chilena', which includes resident foreigners; the original `entry.chileans` key name is narrower than the seller's words (W14)",
      },
      claims: {
        readOn: "2026-10-22",
        items: [
          {
            text: "¡Prepárense para la celebración más grande de la música electrónica!",
            where: "s7, lead heading 'Creamfields Chile 2026: ¡Prepárense para la celebración más grande de la música electrónica!'",
            kind: "marketing claim, organiser's release on the seller's site",
            source: "s7",
          },
          {
            text: "Con esta curatoría, Creamfields Chile reafirma su posición como el festival de música electrónica líder en la región.",
            where: "s7, section 'Line-up de artistas'",
            kind: "marketing claim, organiser's release",
            source: "s7",
            dated_by: "s18 (La Tercera, 28 Apr 2026) quotes the same sentence as 'dice un comunicado'; s7 itself shows no date",
          },
          {
            text: "el mayor festival de música electrónica del país",
            where: "s18's own headline, La Tercera's words, not the organiser's",
            kind: "media",
            source: "s18",
          },
        ],
      },
      editions_v2: {
        readOn: "2026-10-22",
        items: [
          {
            year: 2026,
            dates: "sábado 14 y domingo 15 de noviembre de 2026, Club Hípico de Santiago",
            source: "s1",
            in_press: [
              {
                what: "dates",
                on: "2026-03-17",
                outlet: "Radio Agricultura",
                source: "s9",
                quote: "la versión 2026 del evento se realizará los días sábado 14 y domingo 15 de noviembre",
              },
              {
                what: "sale dates and the organiser's release",
                on: "2026-04-28",
                outlet: "La Tercera Culto",
                source: "s18",
              },
              {
                what: "line-up",
                on: "2026-08-07",
                outlets: "Meganoticias (07 ag. 2026 - 11:01 hrs.) and 24horas.cl (viernes 7 de agosto de 2026)",
                sources: ["s12", "s13"],
              },
            ],
            replaces: "`editions.0.announcedOn: 2026-03-17` and `lineup.announcedOn: 2026-08-07` are press dates, not the organiser's; print them attributed to their outlet or as the month",
          },
          {
            year: 2025,
            dates: "11 y 12 de octubre de 2025, Club Hípico de Santiago, 20° aniversario",
            dates_source: {
              source: "s8",
              quote: "El evento se realizará entre el 11 y 12 de octubre de 2025 en el Club Hípico de Santiago, celebrando su 20° aniversario.",
              published: "26 MAYO 2025",
              names_an_act: false,
            },
            first_in_press: {
              on: "2025-05-23",
              outlet: "Radio Agricultura",
              source: "s21",
              quote: "Creamfields Chile vuelve este 11 y 12 de octubre … en el icónico Club Hípico de Santiago",
              names_an_act: false,
            },
            names: {
              source: "s10",
              quote: "En 2025, Creamfields Chile celebró su aniversario de 20 años con un cartel que incluyó a nombres como David Guetta, Armin van Buuren, deadmau5, Alok, Claptone",
              note: "CNN Chile's words, 'nombres como', not headliners; s10 gives no 2025 dates",
            },
            artists_in_press: {
              on: "2025-06-13",
              outlet: "24horas.cl",
              source: "s22",
              names: ["David Guetta", "Armin van Buuren", "Alok", "Claptone", "deadmau5"],
              day_split: false,
            },
            day_split_in_press: {
              on: "2025-08-04",
              outlet: "Meganoticias",
              source: "s23",
              quote: "Este lunes 4 de agosto se reveló el line up por día de Creamfields Chile",
              set_times: "the article gives none",
            },
            replaces: "`editions.1.note` gave the five names to s8: wrong, s8 names no act; `questions.8.note` '2025 on 26 May 2025': wrong, 26 May is s8's article date and the dates were in the press on 23 May 2025; `schedule.precedent` 'the day-by-day line-up came with the line-up announcement on 4 Aug 2025': wrong, the artists came 13 Jun 2025 and the day split 4 Aug 2025; and 'set times were not found for 2025 either' is our search, not a source: dropped",
          },
          {
            year: 2024,
            source: "s10",
            quote: "En 2024, en tanto, el festival también operó como evento de dos días y contó con más de 80 nombres en su cartel",
            also: "Swedish House Mafia among the names (s10); no dates or venue at source",
          },
        ],
        brand: {
          source: "s10",
          quotes: [
            "Creamfields es una marca de festival nacida en el Reino Unido.",
            "Su edición original se remonta a 1998",
          ],
        },
      },
      sellers_v2: {
        readOn: "2026-10-24",
        items: [
          {
            name: "Punto Ticket",
            url: "https://www.puntoticket.com/creamfields-2026",
            official: true,
            seller_words: "La venta, descuento, control y distribución de las entradas son de exclusiva responsabilidad de Punto Ticket",
            note: "'único vendedor' is not the organiser's phrase; 'ticketera oficial' is safe (director 4, native 12)",
            source: "s1",
          },
        ],
        s2_status: "https://www.puntoticket.com/evento/creamfields-2026 answers 301 to s1 today (curl); not a listing of its own",
        replaces: "`sellers[1]` and source s2 are dropped as a seller row and as a link target; s2 stays in `sources` only as an alias of s1 (its JSON-LD was read from s1's HTML anyway); `/go/creamfields-chile-puntoticket/` is not needed",
      },
      venue_v2: {
        readOn: "2026-10-22",
        source: "s3",
        como_llegar: {
          heading: "TE AYUDAMOS A LLEGAR / CÓMO LLEGAR (upper-case headings on the page)",
          map: "drawn by the Google Maps JavaScript API from a markers list in the page's script (the Google Maps iframe in the HTML is commented out); plus a directions button that opens Google Maps to 'Club Hípico - Blanco Encalada 2540, Santiago'",
          access_points: [
            {
              n: 0,
              label: "Av. Blanco Encalada 2540, Santiago - Chile (the page's address line)",
            },
            {
              n: 1,
              label: "Avda. Club Hípico 875, esquina Avda. Tupper",
              lat: -33.45859,
              lon: -70.66505,
            },
            {
              n: 2,
              label: "Avda España con Blanco Encalada",
              lat: -33.45791,
              lon: -70.66821,
            },
            {
              n: 3,
              label: "Abate Molina con Blanco Encalada",
              lat: -33.45859,
              lon: -70.67194,
            },
          ],
          placeholder: "'No encontramos Sucursal' is the empty state of a branch finder on the same page, not the access block",
          not_named: "no Metro station, bus line or parking on the page",
          mentions_festival: false,
          access_points_0_label: "Avda. Blanco Encalada #2540 (marker 0's label in the list; the page's address line reads 'Av. Blanco Encalada 2540, Santiago - Chile')",
          readOn: "2026-10-22",
        },
        replaces: "`transport[2]` 'its Cómo llegar section is empty': wrong; the row's rest stands (no station, bus or parking named). Any sentence that the club 'says' where the festival is: wrong, s3, s4 and the club's home page never mention Creamfields (0 matches today); the venue gives the address, the seller gives the festival",
      },
      s11_v2: {
        readOn: "2026-10-22",
        source: "s11",
        price_text: "Desde $92.000 (aprox. USD 102) por día en preventa early bird.",
        month: "none",
        updated_line: "Actualizado el 13 de agosto, 2026",
        carries: "the 85-artist bill and Calvin Harris, so the text is August 2026 or later",
        replaces: "the original `prices` last row's note 'from Sernatur's listing written in the April presale window': wrong; say only that it is Chile Travel's 'desde' figure for the early bird, matching the Early Bird day cell now struck in the seller's tables",
      },
      lineup_size_v2: {
        readOn: "2026-10-22",
        figure: "85 artistas, 39 internacionales y 46 nacionales",
        s12_quote: "reunirá a 85 artistas, de los cuales 39 son internacionales y 46 nacionales",
        s12_date: "07 ag. 2026 - 11:01 hrs.",
        s13_quote: "contará con un cartel de 85 artistas —39 internacionales y 46 nacionales—",
        s13_date: "Viernes 7 de agosto de 2026",
        s13_headline: "Creamfields Chile 2026 revela cartel: Calvin Harris, Charlotte de Witte y Hardwell encabezan",
        note: "both report the festival's announcement; neither quotes the organiser for the split; 'según Meganoticias y 24horas.cl' is exact. The seller's image counts 44 names Saturday and 42 Sunday with 'Artist TBC' and each B2B as one entry (fact-checker), which does not reconcile with 85; print the media figure attributed, never both as one count",
      },
      includes_v2: {
        readOn: "2026-10-24",
        source: "s1",
        village_add: "Photo opportunities y experiencias",
        diamond_fix: [
          "Bar abierto de coctelería y tragos premium (the sheet's 'barra abierta (open bar)' is short of the seller's words)",
          "kit: Pulsera del festival, Lanyard oficial con Line-up, Jockey oficial edición 2026 y sorpresas",
        ],
        replaces: "`tickets.includes.village` and `.diamond_lounge` by addition only (S10)",
      },
      labels_v2: {
        readOn: "2026-10-22",
        s10_headline: "Vuelve Creamfields Chile: Cuándo es la edición 2026 en Santiago y cómo inscribirse para la preventa",
        s10_date: "none shown on the page (only '© 2025 CNN Chile'); the URL slug carries 20260319",
        s15_headline: "Creamfields Chile crece: Suma una nueva zona de 5.000 m² y estrena anfiteatro en Club Hípico",
        s15_quote: "incluirá un anfiteatro con capacidad para 3.000 personas sentadas y 5.000 de pie",
        replaces: "the labels of s10 and s15 in `sources` (S11)",
      },
      schedule_v2: {
        readOn: "2026-10-24",
        reread: "set times and doors: none on s1 or the image",
        set_times: "none on s1 or the line-up image today (fact-checker re-read)",
        doors: "none",
        precedent_2025: "the line-up by day was published on 4 Aug 2025 (s23); the sheet says nothing about 2025 set times",
        replaces: "`schedule.precedent` in full (S6)",
      },
      // The twin scout's round 1 additions (24 October 2026), values verbatim:
      // a block new on s1, the cashless wristband; the sheet had no word on
      // paying inside the venue.
      cashless: {
        text: "La Pulsera Cashless es el único medio de pago para Creamfields 2026",
        what: "a smart wristband replaces cash and cards for food, drink and merch on both days; the same wristband serves Saturday and Sunday",
        online_preload: "recommended; create a 'Personal Account', load from $10.000 in steps of $5.000 by debit or credit card, receive a pick-up QR; on the day show the QR at the 'PRECARGA CASHLESS' zone before entering; activation free",
        bonus: {
          from: 50000,
          to: 100000,
          table: "50.000→5.000, 60.000→6.000, 70.000→7.000, 80.000→8.000, 90.000→9.000, 100.000 or more→10.000; 10.000–45.000 no bonus",
          deadline: "jueves 12 de noviembre a las 23:59",
          rules: "online preloads only; once per person; spent last, after the preloaded balance; never refunded; not transferable; expires at the close of the event",
        },
        on_site: "buy at the festival's cashiers with a $1.000 activation charge; top-ups there earn no bonus",
        topup: "from the personal account or at the cashiers; balance online or at any cashier",
        currency: "CLP",
        source: "s1",
        readOn: "2026-10-24",
      },
      brand_origin_v2: {
        text: "Creamfields began as Cream, a weekly house night at Nation (formerly Snobs Disco), Wolstenholme Square, Liverpool, October 1992 to June 2002; the festival is held at Daresbury, UK; the brand's archive lists festival years from 1998",
        source: "s28",
        readOn: "2026-10-24",
        replaces: "event.brand_origin's media source (CNN Chile) for an English reader; the year 1998 is the first year in the brand's own archive list",
      },
      brand_lists_chile: {
        text: "creamfields.com 'Creamfields International' lists Creamfields Chile (with Argentina and Malta), linking creamfields.cl",
        source: "s29",
        readOn: "2026-10-24",
      },
      // GOV.UK's page, updated 2026-10-09.
      entry_uk: {
        for: "British citizen passport holders",
        visa: "visits up to 90 days without a visa",
        passport: "expiry date after the day you plan to leave Chile",
        tourist_card: "immigration issues a tourist card ('tarjeta de turismo'); keep it and hand it in when leaving; PDI issues a duplicate online",
        dual: "British-Chilean dual nationals must enter and leave Chile on their Chilean passport",
        source: "s30",
        readOn: "2026-10-24",
      },
      // travel.gc.ca, last updated 2026-10-19 11:28 ET.
      entry_ca: {
        for: "regular Canadian passport holders",
        visa: "tourist visa not required",
        passport: "valid for the duration of the stay",
        tourist_card: "issued on arrival, valid up to 90 days, keep it and present it on departure",
        funds: "the Chilean government requires visitors to have at least USD 46 per day; customs may ask for proof",
        source: "s31",
        readOn: "2026-10-24",
      },
      // A note: nothing cites it.
      entry_us: "travel.state.gov not read (Cloudflare, session ruling 24 Oct): name the State Department as a pointer only, no link, no claim",
      // Centropuerto's English page, with the route pages of repair S1.
      transport_en: {
        text: "One Way $2,400, e-ticket valid 90 days; Round Trip $4,100, return valid 90 days; routes República – Airport, Pajaritos – Airport, Terminal South – Airport, Maipú – Airport; office at the Santiago Airport bus terminal, in front of platform 24; Maipú – Airport runs on working days only (s37)",
        maipu: {
          days: "working days only ('Opera solo en días hábiles' / 'Operates only on weekdays')",
          to_airport: ["06:55", "08:10"],
          from_airport: ["18:05"],
          festival_days: "does not run on Sat 14 or Sun 15 Nov 2026",
          source: "s37",
          readOn: "2026-10-24",
        },
        frequency: {
          home_page_claim: {
            text: "Departures every 15 minutes, every day",
            source: "s32",
            readOn: "2026-10-24",
            note: "Centropuerto's own line on / and /?locale=en; print as its claim, beside the route figure",
          },
          republica: {
            weekdays: "every 10 to 15 min",
            weekends_holidays: "every 15 to 25 min",
            source: "s36",
            readOn: "2026-10-24",
          },
          pajaritos: {
            weekdays: "every 10 to 15 min",
            weekends_holidays: "every 15 to 25 min",
            source: "s38",
            readOn: "2026-10-24",
          },
          terminal_sur: {
            every_day: "every 30 min",
            source: "s39",
            readOn: "2026-10-24",
          },
          first_last: "not printed on any route page or the FAQ (Maipú aside)",
        },
        source: "s32",
        readOn: "2026-10-24",
        note: "'Metro República' is the name Centropuerto gives its stop (home page, 'Viajes populares'); no sheet source says which Metro line serves it or how the stop relates to the Club Hípico; that leg has no official source",
      },
      // Centropuerto's questions page, in Spanish only (repair S1). Nothing
      // prints it: the writer did not take it, and no note asked for it.
      transport_faq: {
        journey: "about 40 minutes each way ('duración estimada de 40 minutos')",
        boarding_at_airport: "bus platform at the Centro de Transportes (CTR), west side between T1 (domestic) and T2 (international); from T1 walk along level 1 towards exit 6; from T2 board on the third lane of level 1, between exits 4 and 5",
        paying: "online recommended; from Santiago a bank card on boarding; at the airport cash or card at the counters (T1 exit, bus station, T2 platform)",
        luggage: "up to 2 pieces per person, none larger than a big suitcase, space permitting",
        source: "s40",
        readOn: "2026-10-24",
      },
      refunds: {
        text: "no changes or refunds once a purchase is completed; the change and refund policy applies only if the event is cancelled or its configuration changes",
        source: "s33",
        readOn: "2026-10-24",
        note: "Punto Ticket's general help article (dated 7 Aug 2026), not Creamfields-specific; matches s5/s6 clause 3 wording for the plan",
      },
      named_tickets: {
        text: "Punto Ticket: 'entradas nominativas' carry the holder's name and ID and are non-transferable",
        source: "s34",
        readOn: "2026-10-24",
        note: "generic article; s1 does not call Creamfields tickets 'nominativas'. s1 does say the name on the ticket must match the ID exactly (entry_v2.name_match). Print the two side by side, attributed; never 'Creamfields tickets are non-transferable'",
      },
      chile_travel_en: {
        text: "Creamfields Chile returns to Club Hípico on November 14 and 15; 85 artists; 'from house and Latin house to techno and EDM'; 'From $92,000 (approx. USD 102) per day in early bird presale'",
        source: "s35",
        readOn: "2026-10-24",
        note: "public body's English page; the genre line answers 'what kind of music'; its price is the struck Early Bird cell: never print it as a price",
      },
      // The rows of the twin scout's card that the copy cites, by their place
      // on the card (~/mind/ai/dubai/events/tasks/
      // 2026-10-24-creamfields-chile-en.md): `not_found` is its section 1.6,
      // item N counted from 1; "1"."5" is section 1.5, the questions English
      // searchers ask, one row each, with repair S2's answer for the Metro row.
      // Kept here because a tag must resolve to a value with its reading date.
      scout: {
        source: "s1",
        readOn: "2026-10-24",
        not_found: {
          "1": "Gate (doors) times and set times for either day (s1, image, 24 Oct).",
          "2": "The Saturday Main Stage \"Artist TBC\" (image unchanged since 27 Aug).",
          "3": "Whether the Plan de reserva is still sold: the box is gone from s1, and no text says it closed.",
          "4": "Whether an unspent cashless balance (not the bonus) is refunded; the cashless \"Personal Account\" link on s1 is `#` (no URL).",
          "5": "An official resale or transfer channel for Creamfields; whether its tickets are \"nominativas\".",
          "6": "The Metro station, bus lines or parking for the Club Hípico from an official page: metro.cl answers 403 to curl and to the pane; the venue names none.",
          "7": "An English page of the organiser or seller: creamfields.cl/en 404; Punto Ticket has none; Street Machine has none.",
          "8": "Whether Punto Ticket takes foreign cards or asks for a RUT at registration: its help centre FAQ is script-loaded and lists no such article.",
          "9": "Camping (not on s1).",
          "10": "travel.state.gov (Cloudflare; not attempted, per the session ruling).",
        },
        "1": {
          "5": {
            sold_out: {
              question: "Are all Creamfields tickets sold out?",
              seen: "PAA q3",
              answered_by: "prices_v2 struck states (no \"agotado\" word on s1)",
            },
            metro: {
              question: "Metro Santiago Creamfields (how to get there)",
              seen: "autocomplete (us, cl)",
              answered_by: "not answered: no official page names a station or line for the Club Hípico; the page gives the address and the map hop",
            },
          },
        },
      },
    },
    go: {
      tickets: {
        url: "https://www.puntoticket.com/creamfields-2026",
        source: "s1",
        kind: "seller",
        title: "Creamfields Chile 2026 en Punto Ticket",
        titles: { en: "Creamfields Chile 2026 at Punto Ticket, the official seller, in Spanish" },
      },
      venue: {
        url: "https://www.clubhipico.cl/contacto/",
        source: "s3",
        kind: "venue",
        title: "Dirección, teléfono y mapa del Club Hípico de Santiago",
        titles: { en: "The Club Hípico de Santiago's contact page: address, phone and map, in Spanish" },
      },
      map: {
        url: "https://www.google.com/maps/search/?api=1&query=-33.458531%2C-70.6707622",
        source: "venue.geo_venue",
        kind: "maps",
        // Google Maps names no place at this pair: opened at 390 px on 22 Oct
        // 2026, the hop lands on a pin titled with its coordinates
        // (33°27'30.7"S 70°40'14.7"W, "No hay opiniones"), so the title
        // says a nameless pin opens, and at whose coordinates (fest director,
        // gate 3, condition 9). The native reader (es-CL) returned the first
        // string, "Un punto en el Club Hípico de Santiago en Google Maps: las
        // coordenadas del club", and wrote this one on 22 Oct 2026.
        title: "Las coordenadas del Club Hípico de Santiago en Google Maps: se abre un pin sin nombre",
        titles: { en: "The Club Hípico de Santiago's coordinates in Google Maps, which opens on an unnamed pin" },
      },
      instagram: {
        url: "https://www.instagram.com/creamfields_cl",
        source: "s19",
        kind: "organiser",
        title: "Cuenta de Instagram de Creamfields Chile, con los anuncios de la organización",
        titles: { en: "Creamfields Chile on Instagram, where the organiser posts its announcements" },
      },
      "reserva-weekend": {
        url: "https://static-puntoticket.s3.amazonaws.com/especiales/sm0194_creamfields-2026/CREAMFIELDS%202026%20-%20T%C3%89RMINOS%20Y%20CONDICIONES%20SISTEMA%20DE%20RESERVA%20Y%20ABONOS.pdf",
        source: "s5",
        kind: "seller",
        // The seller's own file on its own host, linked from its page (s1's
        // "términos y condiciones" box): a seller link, not a Drive document.
        title: "PDF de Punto Ticket: Sistema de Reserva y Abonos, Weekend Ticket",
        titles: { en: "Punto Ticket's PDF, in Spanish: the reserve-plan terms for the Weekend Ticket" },
      },
      "reserva-day": {
        url: "https://static-puntoticket.s3.amazonaws.com/especiales/sm0194_creamfields-2026/CREAMFIELDS%202026%20-%20TE%CC%81RMINOS%20Y%20CONDICIONES%20SISTEMA%20DE%20RESERVA%20Y%20ABONOS%20DAY%20TICKET.pdf",
        source: "s6",
        kind: "seller",
        title: "PDF de Punto Ticket: Sistema de Reserva y Abonos, Day Ticket",
        titles: { en: "Punto Ticket's PDF, in Spanish: the reserve-plan terms for the Day Ticket" },
      },
      // Linked by the English twin only, so their title is the English one
      // (GoTarget.titleLang).
      "gov-uk": {
        url: "https://www.gov.uk/foreign-travel-advice/chile/entry-requirements",
        source: "s30",
        kind: "public-body",
        title: "GOV.UK: what British citizen passport holders need to enter Chile",
      },
      "travel-gc-ca": {
        url: "https://travel.gc.ca/destinations/chile",
        source: "s31",
        kind: "public-body",
        title: "Government of Canada: travel advice and entry requirements for Chile",
      },
      "chile-travel": {
        url: "https://chile.travel/en/events/creamfields-chile-2026/",
        source: "s35",
        kind: "public-body",
        title: "Chile Travel's page in English on Creamfields Chile 2026",
      },
    },
  },
];

export const guides: Guide[] = [
  {
    slug: "es-CL",
    createdAt: "2026-10-22T17:00:00+04:00",
    updatedAt: "2026-10-23T14:10:00+04:00",
    event: "creamfields-chile",
    lang: "es-CL",
    dir: "ltr",
    path: "/creamfields-chile/",
    cover: "/covers/creamfields-chile.jpg",
    hubLabel: "Español (Chile)",
    hubBlurb: "Creamfields Chile 2026 se hace el sábado 14 y el domingo 15 de noviembre de 2026 en el Club Hípico de Santiago, Av. Blanco Encalada 2540, Santiago Centro [editions_v2.items.0.dates] [venue.address].",
    // The prices and the sale lines come off the day after the edition, 16
    // November 2026, well inside the 42 days the oldest reading in a span
    // allows (tickets.service_charge, 21 October: 2 December).
    expires: { prices: "2026-11-16", sale: "2026-11-16" },
    pages: [
      {
        slug: "creamfields-chile",
        createdAt: "2026-10-22T17:00:00+04:00",
        updatedAt: "2026-10-24T08:25:00+04:00",
        kind: "main",
        label: "Guía",
        title: "Creamfields Chile 2026: fechas, entradas — guía del festival",
        description: "Creamfields Chile 2026: 14 y 15 de noviembre, Club Hípico, entradas en Punto Ticket. Guía del festival: precios, line-up por día y dudas frecuentes.",
        h1: "Creamfields Chile 2026",
        lede: "Creamfields Chile 2026 se hace el sábado 14 y el domingo 15 de noviembre de 2026 en el Club Hípico de Santiago, Av. Blanco Encalada 2540, Santiago Centro [editions_v2.items.0.dates] [venue.address]. {{until sale}}Las entradas se venden en [Punto Ticket, la ticketera oficial](/go/creamfields-chile-tickets/); la dirección creamfields.cl lleva directo a su página [sellers_v2.items.0] [sellers.0.kind].{{/until}} El domingo en el Main Stage tocan Calvin Harris, Charlotte de Witte, Fisher y Hugel; el sábado, Hardwell y Boris Brejcha [lineup.by_day.1.stages.0.acts] [lineup.by_day.0.stages.0.acts]. La marca Creamfields nació en el Reino Unido y su edición original se remonta a 1998, según CNN Chile [editions_v2.brand]; la edición chilena de 2025 fue, según La Tercera, la de los 20 años del festival en Chile [editions_v2.items.1.dates_source]. {{until prices}}Los precios, en las cuatro fases del vendedor, están en la página de entradas. → /creamfields-chile/entradas/ {{/until}}\n\nPunto Ticket, la ticketera oficial, publica el line-up por día y las tablas de precios como imágenes; en esta guía están en texto, con la fecha en que se leyó cada dato [sources.s20].",
        glanceHeading: "De un vistazo",
        glance: [
          { label: "Fechas", value: "sábado 14 y domingo 15\u00a0de\u00a0noviembre\u00a0de\u00a02026 [editions_v2.items.0.dates]" },
          { label: "Lugar", value: "Club Hípico de Santiago, Av. Blanco Encalada 2540, Santiago Centro [venue.name] [venue.address]" },
          { label: "Entradas", value: "Punto Ticket, ticketera oficial [sellers_v2.items.0]" },
          { label: "Edad", value: "mayores de 18 años [age.min]" },
        ],
        jumps: [
          { id: "fechas", label: "Fechas" },
          { id: "lugar", label: "Lugar" },
          { id: "entradas", label: "Entradas" },
          { id: "line-up", label: "Line-up" },
          { id: "questions", label: "Preguntas" },
        ],
        sections: [
          {
            id: "fechas",
            heading: "Fechas: dos días de noviembre",
            body: "Son dos jornadas seguidas: sábado 14 y domingo 15 de noviembre de 2026 [editions_v2.items.0.dates]. Radio Agricultura informó las fechas el 17 de marzo de 2026 [editions_v2.items.0.in_press.0]; la venta general partió el viernes 8 de mayo a las 12:00 horas [tickets.general_sale.from], y el line-up llegó el viernes 7 de agosto, según Meganoticias y 24horas.cl [editions_v2.items.0.in_press.2]. Hay Weekend Ticket para los dos días y Day Ticket para el sábado o el domingo por separado [tickets.formats]. El evento es para mayores de 18 años [age.min].\n\nSegún La Tercera (26 de mayo de 2025), Creamfields Chile 2025 se anunció para el sábado 11 y el domingo 12 de octubre de 2025 en el Club Hípico, como la edición de los 20 años del festival en Chile [editions_v2.items.1.dates_source]. Según CNN Chile (19 de marzo de 2026), el cartel de esa edición incluyó a nombres como David Guetta, Armin van Buuren, deadmau5, Alok y Claptone [editions_v2.items.1.names]. Ambos datos vienen de la prensa, no de la organización.\n\n¿Creamfields Chile 2027? Al 21 de octubre de 2026 la organización no lo ha anunciado [questions.8.note]. Como referencia, las fechas de 2026 estaban en la prensa el 17 de marzo de 2026 y las de 2025, el 23 de mayo de 2025, ambas en Radio Agricultura [editions_v2.items.0.in_press.0] [editions_v2.items.1.first_in_press].",
          },
          {
            id: "lugar",
            heading: "El Club Hípico de Santiago y cómo llegar",
            body: "El Club Hípico de Santiago está en Av. Blanco Encalada 2540, Santiago Centro [venue.address]. El teléfono del club es +56 2 2693 9600 y su correo, contacto@clubhipico.cl; son los contactos del club, no del festival [venue.phone] [venue.email]. [Ver en el mapa](/go/creamfields-chile-map/).\n\nEl club publica en su sitio un mapa con sus accesos y un botón de indicaciones de Google Maps [venue_v2.como_llegar]; ni la organización ni el club nombran una estación de Metro, un recorrido de micros ni un estacionamiento para el festival [transport.1] [venue_v2.como_llegar.not_named]. Lo único que el vendedor publica sobre estacionamiento es un beneficio del Diamond Lounge: un estacionamiento para el comprador [tickets.includes.diamond_lounge]. Para 2026 la organización anuncia una zona nueva de 5.000 m² con anfiteatro en el Club Hípico [labels_v2.s15_headline]; el detalle está en la página del line-up. → /creamfields-chile/line-up/",
          },
          {
            id: "entradas",
            heading: "Entradas: cuatro tipos y tres formatos",
            body: "Hay cuatro tipos de ticket, General, The Village, Sky Lounge y Diamond Lounge [tickets.tiers], y cada uno en tres formatos: Weekend Ticket para los dos días, Day Ticket sábado y Day Ticket domingo [tickets.formats]. {{until prices}}Los precios de las tablas de Punto Ticket no incluyen el cargo por servicio del 12,5% [tickets.service_charge]. Cada tabla tiene cuatro fases y dos columnas: el precio normal y el precio con 20% de descuento para clientes de Banco de Chile [prices_v2.note]. Al 24 de octubre de 2026 ya no aparece en la página del vendedor el Plan de reserva que mostraba antes: \"abona $40.000 y paga el resto en 2 cuotas sin interés con cualquier medio de pago\" [reserve_plan_v2.seller_page.text] [reserve_plan_v2.seller_page.status]. Las doce tablas, tal como las publica el vendedor, lo que incluye cada ticket y las reglas de ingreso están en la página de entradas. → /creamfields-chile/entradas/ {{/until}}",
          },
          {
            id: "line-up",
            heading: "Line-up: quién toca cada día",
            body: "El line-up llegó el viernes 7 de agosto de 2026, según Meganoticias y 24horas.cl [editions_v2.items.0.in_press.2]. Punto Ticket lo publica por día y por escenario, sin horarios [lineup.by_day_source] [schedule_v2.set_times]. El sábado 14 hay seis escenarios: Main Stage, A Stage, Alternative, HE.SHE.THEY, Radio Carolina y Grieta x Panal Records; el domingo 15, otros seis: Main Stage, A Stage, Cream, Feral, Radio Carolina y Grieta x Panal Records [lineup.by_day.0.stages] [lineup.by_day.1.stages]. Morten toca los dos días, y en el Main Stage del sábado el vendedor publica un cupo como \"Artist TBC\", sin nombre [lineup.by_day_source] [not_found.2]. La lista completa, escenario por escenario, está en la página del line-up. → /creamfields-chile/line-up/",
          },
        ],
        faqHeading: "Preguntas frecuentes",
        faq: [
          {
            q: "¿Dónde será Creamfields en 2026?",
            a: "En el Club Hípico de Santiago, Av. Blanco Encalada 2540, Santiago Centro, el sábado 14 y el domingo 15 de noviembre de 2026 [editions_v2.items.0.dates] [venue.address]. Lo dice la página oficial de venta en Punto Ticket, leída el 24 de octubre de 2026; la dirección es la del club [sources.s1] [sources.s3].",
          },
          {
            q: "¿Cuánto cuestan las entradas para Creamfields Chile en 2026?",
            a: "{{until prices}}Depende del tipo y del formato. En las doce tablas de Punto Ticket, leídas el 24 de octubre de 2026, la cifra no tachada más baja en la columna de precio normal es $98.000 (Day Ticket sábado General, Venta 2) y la más alta, $850.000 (Weekend Ticket Diamond Lounge, Venta 4), sin el cargo por servicio del 12,5% [prices_v2.lowest_unstruck_normal] [prices_v2.highest_unstruck_normal] [tickets.service_charge]. La tabla no indica cuál fase está abierta: vale el precio que Punto Ticket muestra al comprar [prices_v2.note]. Las doce tablas están en la página de entradas. → /creamfields-chile/entradas/ {{/until}}",
          },
          {
            q: "¿Qué artistas se presentarán en Creamfields Chile 2026?",
            a: "Calvin Harris, Charlotte de Witte, Fisher y Hugel en el Main Stage del domingo 15; Hardwell y Boris Brejcha en el del sábado 14 [lineup.by_day.1.stages.0.acts] [lineup.by_day.0.stages.0.acts]. También Don Diablo, Jonas Blue, The Blessed Madonna, Kölsch, Faithless Sound System, Enrico Sangiuliano y Âme Live, entre otros, según el line-up por día de Punto Ticket, leído el 24 de octubre de 2026 [lineup.by_day.0.stages.1.acts] [lineup.by_day.1.stages.2.acts] [lineup.by_day.1.stages.3.acts]. La lista completa, escenario por escenario, está en la página del line-up. → /creamfields-chile/line-up/",
          },
          {
            q: "¿Hay algún festival de electrónica en Chile?",
            a: "Sí: Creamfields Chile, que la organización describe en su comunicado como \"el festival de música electrónica líder en la región\" [claims.items.1] y que La Tercera tituló, el 28 de abril de 2026, \"el mayor festival de música electrónica del país\" [claims.items.2]. La edición 2026 es el 14 y 15 de noviembre en el Club Hípico de Santiago [editions_v2.items.0.dates].",
          },
          {
            q: "¿Cuándo es Creamfields Chile 2026?",
            a: "El sábado 14 y el domingo 15 de noviembre de 2026, dos días seguidos, con Weekend Ticket para ambos y Day Ticket por día [editions_v2.items.0.dates] [tickets.formats]. Cómo y cuándo se anunció está en la sección Fechas de arriba.",
          },
          {
            q: "¿Qué es Creamfields Chile?",
            a: "Es la edición chilena de Creamfields, una marca de festival nacida en el Reino Unido cuya edición original se remonta a 1998, según CNN Chile [editions_v2.brand]. Lo produce Street Machine Producciones [event.organiser], dura dos días [editions_v2.items.0.dates], es para mayores de 18 años [age.min] y en 2025 celebró, según CNN Chile, sus 20 años en Chile [editions_v2.items.1.names].",
          },
          {
            q: "¿Cuándo fue Creamfields Chile 2025 y quiénes tocaron?",
            a: "Según La Tercera (26 de mayo de 2025), el sábado 11 y el domingo 12 de octubre de 2025 en el Club Hípico de Santiago, como la edición de los 20 años [editions_v2.items.1.dates_source]. Según CNN Chile, el cartel incluyó a nombres como David Guetta, Armin van Buuren, deadmau5, Alok y Claptone [editions_v2.items.1.names].",
          },
          {
            q: "¿Cuándo es Creamfields Chile 2027?",
            a: "Al 21 de octubre de 2026 la organización no lo ha anunciado [questions.8.note]. Las dos ediciones anteriores aparecieron en la prensa con meses de anticipación: la de 2026 en marzo de 2026 y la de 2025 en mayo de 2025, según Radio Agricultura [editions_v2.items.0.in_press.0] [editions_v2.items.1.first_in_press].",
          },
        ],
        sourcesHeading: "Fuentes",
        sources: "- [Punto Ticket, página oficial de Creamfields Chile 2026 (creamfields.cl redirige aquí)](/go/creamfields-chile-tickets/), leída el 24 de octubre de 2026 [sources.s1]\n- Line-up por día, imagen en la página de Punto Ticket, leída el 24 de octubre de 2026{{until prices}}; tablas de precios, leídas el 24 de octubre de 2026{{/until}} [sources.s20]\n- Punto Ticket, \"Creamfields Chile 2026: ¡Prepárense para la celebración más grande de la música electrónica!\", comunicado de la organización, leído el 22 de octubre de 2026 [sources.s7]\n- Punto Ticket, \"Creamfields Chile crece: Suma una nueva zona de 5.000 m² y estrena anfiteatro en Club Hípico\", leído el 22 de octubre de 2026 [sources.s15] [labels_v2.s15_headline]\n- [Club Hípico de Santiago, contacto](/go/creamfields-chile-venue/), leído el 22 de octubre de 2026 [sources.s3]\n- Prensa, citada en el texto: Radio Agricultura, 23 de mayo de 2025 y 17 de marzo de 2026 [sources.s21] [sources.s9]; La Tercera Culto, 26 de mayo de 2025 y 28 de abril de 2026 [sources.s8] [sources.s18]; CNN Chile, \"Vuelve Creamfields Chile: Cuándo es la edición 2026 en Santiago y cómo inscribirse para la preventa\" [sources.s10] [labels_v2.s10_headline]; Meganoticias y 24horas.cl, 7 de agosto de 2026 [sources.s12] [sources.s13]\n- [Creamfields Chile en Instagram, canal de la organización](/go/creamfields-chile-instagram/) [sources.s19]",
        anchors: [
          { target: "/creamfields-chile/entradas/", text: "página de entradas" },
          { target: "/creamfields-chile/line-up/", text: "página del line-up" },
        ],
      },
      {
        slug: "creamfields-chile/entradas",
        createdAt: "2026-10-22T17:00:00+04:00",
        updatedAt: "2026-10-24T08:25:00+04:00",
        kind: "tickets",
        label: "Entradas",
        title: "Entradas Creamfields Chile 2026: precios — guía del festival",
        description: "Entradas de Creamfields Chile 2026 en Punto Ticket: General, The Village, Sky Lounge y Diamond Lounge, las cuatro fases de precio en texto. Guía del festival.",
        h1: "Entradas Creamfields Chile 2026",
        lede: "{{until sale}}Las entradas de Creamfields Chile 2026 se venden en [Punto Ticket, la ticketera oficial](/go/creamfields-chile-tickets/): creamfields.cl redirige a su página [sellers_v2.items.0] [sellers.0.kind].{{/until}} Hay cuatro tipos, General, The Village, Sky Lounge y Diamond Lounge, y cada uno como Weekend Ticket para los dos días o como Day Ticket para el sábado 14 o el domingo 15 de noviembre de 2026 [tickets.tiers] [tickets.formats] [editions_v2.items.0.dates]. {{until prices}}El vendedor publica sus precios en doce imágenes; aquí están las doce tablas en texto, leídas el 24 de octubre de 2026, con cada fase tachada marcada como tachada [prices_v2].{{/until}} Quién toca cada día está en la página del line-up; → /creamfields-chile/line-up/ fechas, lugar y el resto de la guía, en la página de Creamfields Chile 2026. → /creamfields-chile/",
        sections: [
          {
            id: "donde-comprar",
            heading: "Dónde se compran y cuánto es el cargo por servicio",
            body: "{{until prices}}Vende [Punto Ticket, ticketera oficial](/go/creamfields-chile-tickets/), y a cada precio de las tablas le suma un cargo por servicio del 12,5% [tickets.service_charge].{{/until}} La venta general partió el viernes 8 de mayo de 2026 a las 12:00 horas [tickets.general_sale.from]. La organización no nombra ningún canal oficial de reventa ni de transferencia de entradas [not_found.4].",
          },
          {
            id: "precios",
            kind: "table",
            heading: "Precios por tipo de ticket, en las cuatro fases",
            body: "{{until prices}}Cada tabla de Punto Ticket tiene cuatro fases en el orden del vendedor, Early Bird, Venta 2, Venta 3 y Venta 4, y dos columnas: el precio normal y el precio con 20% de descuento, que es solo para clientes de Banco de Chile y se aplica sobre la entrada, no sobre el cargo por servicio [prices_v2.note] [bank_offer.conditions]. El vendedor tacha las fases cerradas; la tabla no indica cuál fase está abierta; vale el precio que Punto Ticket muestra al comprar [prices_v2.note]. Precios en pesos chilenos (CLP), sin el cargo por servicio del 12,5% [tickets.service_charge], leídos el 24 de octubre de 2026 [prices_v2.readOn].\n\n**Ticket General**\n\nWeekend Ticket General [prices_v2.tables.0]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $128.000 (tachado) | $102.400 (tachado) |\n| Venta 2 | $138.000 (tachado) | $110.400 (tachado) |\n| Venta 3 | $146.000 (tachado) | $116.800 (tachado) |\n| Venta 4 | $160.000 | $128.000 (tachado) |\n\nDay Ticket sábado General [prices_v2.tables.1]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $92.000 (tachado) | $73.600 (tachado) |\n| Venta 2 | $98.000 | $78.400 (tachado) |\n| Venta 3 | $106.000 | $84.800 (tachado) |\n| Venta 4 | $120.000 | $96.000 |\n\nDay Ticket domingo General [prices_v2.tables.2]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $92.000 (tachado) | $73.600 (tachado) |\n| Venta 2 | $98.000 (tachado) | $78.400 (tachado) |\n| Venta 3 | $106.000 (tachado) | $84.800 (tachado) |\n| Venta 4 | $120.000 (tachado) | $96.000 (tachado) |\n\nDay Ticket domingo General: la tabla del vendedor muestra las ocho celdas tachadas [prices_v2.tables.2.note].\n\n**Ticket The Village**\n\nWeekend Ticket The Village [prices_v2.tables.3]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $206.000 (tachado) | $164.800 (tachado) |\n| Venta 2 | $216.000 (tachado) | $172.800 (tachado) |\n| Venta 3 | $226.000 (tachado) | $180.800 (tachado) |\n| Venta 4 | $240.000 | $192.000 (tachado) |\n\nDay Ticket sábado The Village [prices_v2.tables.4]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $134.000 (tachado) | $107.200 (tachado) |\n| Venta 2 | $144.000 | $115.200 (tachado) |\n| Venta 3 | $154.000 | $123.200 (tachado) |\n| Venta 4 | $170.000 | $136.000 |\n\nDay Ticket domingo The Village [prices_v2.tables.5]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $134.000 (tachado) | $107.200 (tachado) |\n| Venta 2 | $144.000 (tachado) | $115.200 (tachado) |\n| Venta 3 | $154.000 (tachado) | $123.200 (tachado) |\n| Venta 4 | $170.000 (tachado) | $136.000 (tachado) |\n\nDay Ticket domingo The Village: la tabla del vendedor muestra las ocho celdas tachadas [prices_v2.tables.5.rows.3.normal_s] [prices_v2.tables.5.note].\n\n**Ticket Sky Lounge**\n\nWeekend Ticket Sky Lounge [prices_v2.tables.6]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $276.000 (tachado) | $220.800 (tachado) |\n| Venta 2 | $286.000 (tachado) | $228.800 (tachado) |\n| Venta 3 | $296.000 (tachado) | $236.800 (tachado) |\n| Venta 4 | $320.000 | $256.000 (tachado) |\n\nDay Ticket sábado Sky Lounge [prices_v2.tables.7]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $196.000 | $156.800 (tachado) |\n| Venta 2 | $206.000 | $164.800 (tachado) |\n| Venta 3 | $216.000 | $172.800 |\n| Venta 4 | $250.000 | $200.000 |\n\nDay Ticket domingo Sky Lounge [prices_v2.tables.8]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $196.000 (tachado) | $156.800 (tachado) |\n| Venta 2 | $206.000 (tachado) | $164.800 (tachado) |\n| Venta 3 | $216.000 (tachado) | $172.800 (tachado) |\n| Venta 4 | $250.000 (tachado) | $200.000 (tachado) |\n\nDay Ticket domingo Sky Lounge: la tabla del vendedor muestra las ocho celdas tachadas [prices_v2.tables.8.rows.2.normal_s] [prices_v2.tables.8.rows.3.normal_s] [prices_v2.tables.8.note].\n\n**Ticket Diamond Lounge**\n\nWeekend Ticket Diamond Lounge [prices_v2.tables.9]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $700.000 (tachado) | $560.000 (tachado) |\n| Venta 2 | $750.000 (tachado) | $600.000 (tachado) |\n| Venta 3 | $800.000 | $640.000 (tachado) |\n| Venta 4 | $850.000 | $680.000 (tachado) |\n\nDay Ticket sábado Diamond Lounge [prices_v2.tables.10]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $450.000 | $360.000 (tachado) |\n| Venta 2 | $500.000 | $400.000 (tachado) |\n| Venta 3 | $550.000 | $440.000 |\n| Venta 4 | $600.000 | $480.000 |\n\nDay Ticket domingo Diamond Lounge [prices_v2.tables.11]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $450.000 (tachado) | $360.000 (tachado) |\n| Venta 2 | $500.000 (tachado) | $400.000 (tachado) |\n| Venta 3 | $550.000 | $440.000 (tachado) |\n| Venta 4 | $600.000 | $480.000 (tachado) |\n\nEl ticket de movilidad reducida existe solo en las tablas General y es solo para personas con credencial de discapacidad, que se pedirá para acceder al evento [reduced_mobility.text] [reduced_mobility.applies_to].{{/until}}",
          },
          {
            id: "banco-de-chile",
            heading: "Banco de Chile: el 20% de descuento del vendedor",
            body: "Punto Ticket publica para clientes de Banco de Chile un precio con 20% de descuento sobre la entrada, no sobre el cargo por servicio, con un máximo de 4 entradas por cliente [bank_offer.conditions]. Es para titulares de tarjetas de crédito o débito de Banco de Chile, Banco Edwards incluido, comprando en puntoticket.com a través del botón de pago del banco [bank_offer.conditions]. Con tarjeta de crédito Banco de Chile, además se puede hacer copago con Dólares-Premio y pagar en 3, 9 o 12 cuotas sin interés. Las compras en cuotas están afectas al impuesto de timbres, de cargo del cliente [bank_offer.instalments]. La preventa Banco de Chile fue del 6 de mayo de 2026 a las 12:00 horas al 8 de mayo a las 11:30, con un tope de 5.000 entradas Weekend y 5.000 Day Tickets [bank_offer.presale_may] [bank_offer.seller_labels]; la venta Day Ticket Banco de Chile partió el 28 de agosto de 2026 a las 12:00 horas, con un tope de 2.500 de sábado y 2.500 de domingo, y el vendedor no informa su término [bank_offer.day] [bank_offer.seller_labels]. {{until prices}}Ese precio es la segunda columna de cada tabla de arriba, y donde el vendedor la tacha aparece tachada [prices_v2.tables].{{/until}}",
          },
          {
            id: "plan-de-reserva",
            heading: "Plan de reserva: ya no figura en la página del vendedor",
            body: "{{until prices}}El 22 de octubre de 2026 el vendedor lo describía así: \"abona $40.000 y paga el resto en 2 cuotas sin interés con cualquier medio de pago\" [reserve_plan_v2.seller_page.text].{{/until}} Al 24 de octubre de 2026 el plan ya no aparece en la página del vendedor, y ningún texto de Punto Ticket dice si se cerró o si sigue disponible [reserve_plan_v2.seller_page.status]. Según esa misma página, el 22 de octubre de 2026 aplicaba a General, The Village, Sky Lounge y Diamond Lounge [reserve_plan_v2.seller_page.applies_to] y no se combinaba con el 20% de Banco de Chile [reserve_plan_v2.seller_page.not_combinable].\n\n{{until prices}}Los dos PDF de términos y condiciones no dicen lo mismo: el del Weekend Ticket habla de un abono inicial de $40.000 más tres cuotas iguales y el del Day Ticket, de dos [reserve_plan_v2.weekend_pdf.instalments] [reserve_plan_v2.day_pdf.instalments].{{/until}} Según los términos del vendedor, al comprador se le informa el plan de abonos, el monto de cada uno y sus fechas de vencimiento [reserve_plan_v2.informed], y el plan se calcula sobre el precio con el cargo por servicio incluido: a ese total se le descuenta el abono inicial y el resto se divide en cuotas iguales [reserve_plan_v2.weekend_pdf.computed_on] [reserve_plan_v2.day_pdf.computed_on].\n\n{{until prices}}Según los mismos términos, si una cuota no se paga a su vencimiento el pedido queda sin efecto, Punto Ticket retiene los $40.000 del abono inicial, las cuotas ya pagadas se convierten en una Giftcard StreetMachine, con validez de 12 meses, para una entrada de otro evento musical de Street Machine, hay 10 días de gracia si un cargo es rechazado y el comprador no puede dejar sin efecto la reserva por su cuenta [reserve_plan_v2.caution_clause_3].{{/until}} Al 24 de octubre de 2026 los PDF seguían enlazados desde la página del vendedor: [términos del Weekend Ticket](/go/creamfields-chile-reserva-weekend/) [sources.s5] y [términos del Day Ticket](/go/creamfields-chile-reserva-day/) [sources.s6]. Todas las fechas de vencimiento que fijan ya pasaron [reserve_plan_v2.seller_page.status] [reserve_plan_v2.governs_today].",
          },
          {
            id: "que-incluye",
            heading: "Qué incluye cada ticket",
            body: "Ticket General: acceso general al festival y a todos los escenarios, zonas gastronómicas y barras, puntos de hidratación gratuitos, activaciones y experiencias de marca, y acceso a lockers, que son pagados [tickets.includes.general].\n\nTicket The Village: todo lo del ticket General, más ingreso diferenciado, acceso exclusivo al PIT frente al Main Stage, baños tipo trailer, zona coctelera y gastronómica by ÑAM, zonas de descanso y sombra, photo opportunities y experiencias, y lockers pagados [tickets.includes.village] [includes_v2.village_add].\n\nTicket Sky Lounge: todo lo de The Village, más una estructura en altura con sombra dentro de The Village y vista al Main Stage, barra exclusiva con servicio de garzones, cóctel de bienvenida con el vaso oficial 2026 y una subida a La Gran Rueda por acceso fast track [tickets.includes.sky_lounge].\n\nTicket Diamond Lounge: un espacio exclusivo para 400 personas con acceso a The Village, un estacionamiento para el comprador, ingreso directo y exclusivo, estructura en altura con sombra propia, servicio de garzones, bar abierto de coctelería y tragos premium, un almuerzo o comida a elección, visita al backstage del Main Stage y una subida a la rueda por acceso fast track [tickets.includes.diamond_lounge] [includes_v2.diamond_fix]. Incluye además un kit con pulsera del festival, lanyard oficial con el line-up, jockey oficial edición 2026 y sorpresas: las compras hechas hasta el 25 de octubre de 2026 a las 23:59 lo reciben a domicilio; las posteriores lo retiran en el festival [tickets.includes.diamond_lounge] [includes_v2.diamond_fix].",
          },
          {
            id: "ingreso",
            heading: "Ingreso: edad, documentos y pulsera cashless",
            body: "El evento es para mayores de 18 años [age.text]. Quienes tienen cédula chilena entran con ella o con pasaporte chileno vigente [entry.chileans] [entry_v2.chileans_wording]; los extranjeros, únicamente con pasaporte extranjero vigente, en un punto de verificación exclusivo en el acceso [entry.foreigners]. Solo valen documentos originales [entry.originals_only]. El nombre en la entrada debe coincidir exactamente con el del documento [entry_v2.name_match]. El ticket de movilidad reducida es solo para personas con credencial de discapacidad, que se pedirá para acceder, y existe solo en General [reduced_mobility.text] [reduced_mobility.applies_to].\n\nDentro del festival se paga solo con la Pulsera Cashless: el vendedor la llama \"el único medio de pago para Creamfields 2026\", y la misma pulsera sirve el sábado y el domingo [cashless.text] [cashless.what]. {{until prices}}El vendedor recomienda precargarla online. Se crea una cuenta personal y se carga con tarjeta de débito o crédito, desde $10.000 y en múltiplos de $5.000. Luego llega un código QR, que se muestra en la zona \"PRECARGA CASHLESS\" antes de entrar. La activación es gratis [cashless.online_preload]. Las precargas online hechas hasta el jueves 12 de noviembre a las 23:59 dan un bono: $5.000 al cargar $50.000, $6.000 al cargar $60.000, $7.000 por $70.000, $8.000 por $80.000, $9.000 por $90.000 y $10.000 por $100.000 o más. Por menos de $50.000 no hay bono. El bono es uno por persona y se descuenta después del saldo cargado. No se devuelve, no se transfiere y vence al cierre del evento [cashless.bonus]. En el festival la pulsera se compra en las cajas, con un cargo de activación de $1.000, y las recargas ahí no suman bono [cashless.on_site].{{/until}}",
          },
        ],
        faqHeading: "Preguntas frecuentes",
        faq: [
          {
            q: "¿Cómo funciona la preventa Banco de Chile para Creamfields?",
            a: "Punto Ticket publica un precio con 20% de descuento sobre la entrada, no sobre el cargo por servicio, para titulares de tarjetas de crédito o débito de Banco de Chile, hasta 4 entradas por cliente [bank_offer.conditions]. La preventa Banco de Chile fue del 6 al 8 de mayo de 2026; la venta Day Ticket Banco de Chile partió el 28 de agosto de 2026 y el vendedor no informa su término [bank_offer.presale_may] [bank_offer.day] [bank_offer.seller_labels]. {{until prices}}Ese precio es la segunda columna de cada tabla de arriba.{{/until}}",
          },
          {
            q: "¿Qué es el Plan de Reserva de Creamfields?",
            a: "Un sistema de abono del vendedor. {{until prices}}El 22 de octubre de 2026 su página lo describía así: \"abona $40.000 y paga el resto en 2 cuotas sin interés con cualquier medio de pago\" [reserve_plan_v2.seller_page.text].{{/until}} Al 24 de octubre de 2026 el plan ya no aparece en la página de Punto Ticket, y ningún texto dice si se cerró [reserve_plan_v2.seller_page.status]. Aplicaba a General, The Village, Sky Lounge y Diamond Lounge y no se combinaba con el 20% de Banco de Chile. Los términos completos están en los dos PDF del vendedor enlazados arriba, con todas sus fechas de vencimiento ya pasadas [reserve_plan_v2.seller_page.applies_to] [reserve_plan_v2.seller_page.not_combinable] [sources.s5] [sources.s6] [reserve_plan_v2.governs_today].",
          },
          {
            q: "¿Qué incluye The Village, Sky Lounge y Diamond Lounge?",
            a: "The Village suma al ticket General un ingreso diferenciado, el PIT frente al Main Stage, baños tipo trailer y zona coctelera by ÑAM [tickets.includes.village]. Sky Lounge suma una estructura en altura con vista al Main Stage, barra exclusiva, cóctel de bienvenida y una subida a La Gran Rueda [tickets.includes.sky_lounge]. Diamond Lounge es un espacio para 400 personas con bar abierto, almuerzo o comida, backstage del Main Stage y un estacionamiento [tickets.includes.diamond_lounge]. Las listas completas están arriba.",
          },
          {
            q: "¿Es para mayores de 18?",
            a: "Sí. El vendedor lo dice en las condiciones de ingreso: \"Evento para mayores de 18 años\" [age.text]. Para entrar, quienes tienen cédula chilena muestran la cédula o un pasaporte chileno vigente, en original, y el nombre debe coincidir exactamente con el de la entrada [entry.chileans] [entry.originals_only] [entry_v2.name_match].",
          },
          {
            q: "¿Puedo entrar con pasaporte extranjero?",
            a: "Sí, y es el único documento que vale para extranjeros: pasaporte extranjero vigente, en original, revisado en un punto de verificación exclusivo en el acceso [entry.foreigners] [entry.originals_only]. El evento es para mayores de 18 años [age.min].",
          },
        ],
        sourcesHeading: "Fuentes",
        sources: "- [Punto Ticket, página oficial de Creamfields Chile 2026, texto, condiciones de ingreso, Banco de Chile y Pulsera Cashless](/go/creamfields-chile-tickets/), leída el 24 de octubre de 2026 [sources.s1]\n- {{until prices}}Las doce tablas de precios, imágenes en la página de Punto Ticket, leídas el 24 de octubre de 2026 [sources.s20]{{/until}}\n- Términos y condiciones del Sistema de Reserva y Abonos, [Weekend Ticket](/go/creamfields-chile-reserva-weekend/) y [Day Ticket](/go/creamfields-chile-reserva-day/), PDF del vendedor, leídos el 22 de octubre de 2026 [sources.s5] [sources.s6]\n- Punto Ticket, \"Anuncio fecha venta de entradas\", comunicado de la organización, leído el 22 de octubre de 2026 [sources.s7]",
        anchors: [
          { target: "/creamfields-chile/line-up/", text: "página del line-up" },
          { target: "/creamfields-chile/", text: "página de Creamfields Chile 2026" },
        ],
      },
      {
        slug: "creamfields-chile/line-up",
        createdAt: "2026-10-22T17:00:00+04:00",
        updatedAt: "2026-10-24T08:25:00+04:00",
        kind: "lineup",
        label: "Line-up",
        title: "Creamfields Chile 2026: line-up por día — guía del festival",
        description: "Line-up de Creamfields Chile 2026 por día y escenario: Calvin Harris, Hardwell, Charlotte de Witte, Fisher y Hugel en el Main Stage. Guía del festival.",
        h1: "Line-up de Creamfields Chile 2026 por día",
        lede: "El line-up de Creamfields Chile 2026 llegó el viernes 7 de agosto de 2026, según Meganoticias y 24horas.cl [editions_v2.items.0.in_press.2], y Punto Ticket, la ticketera oficial, lo publica por día y por escenario en una sola imagen; aquí está en texto, leído el 24 de octubre de 2026 [lineup.by_day_source] [sources.s20] [lineup.readOn]. El sábado 14 de noviembre en el Main Stage tocan Hardwell y Boris Brejcha; el domingo 15, Calvin Harris, Charlotte de Witte, Fisher y Hugel [lineup.by_day.0.stages.0.acts] [lineup.by_day.1.stages.0.acts]. Son seis escenarios cada día [lineup.by_day]. Los horarios por artista no están publicados [schedule_v2.set_times].",
        sections: [
          {
            id: "sabado",
            heading: "Sábado 14 de noviembre: seis escenarios",
            body: "El sábado tiene a Hardwell y Boris Brejcha en el Main Stage y a Don Diablo y Jonas Blue en el A Stage; en Alternative van Warface, Brennan Heart y Virtual Riot, y HE.SHE.THEY trae a AZYR, Charlie Sparks y Clara Cuvé [lineup.by_day.0.stages]. El orden de los nombres es el de la imagen del vendedor; la imagen no indica horarios ni en qué orden tocan [lineup.by_day_source] [schedule_v2.set_times].\n\n- Main Stage: Hardwell, Boris Brejcha, Artist TBC, Morten, LP Giobbi, Aerobica, Carla Valenti [lineup.by_day.0.stages.0.acts]\n- A Stage: Don Diablo, Jonas Blue, Two Friends, MATTN, Bruno Martini, Groovearth, Alexander Robledo, Javica [lineup.by_day.0.stages.1.acts]\n- Alternative: Warface, Brennan Heart, The Straikerz, Mutilator, Bass Modulators, Virtual Riot, STMZ, Rebelnoise, Jokerz [lineup.by_day.0.stages.2.acts]\n- HE.SHE.THEY: AZYR, Cristobal Pesce, Charlie Sparks, Clara Cuvé, Yanamaste, EM11, Superqueer B2B Giullian [lineup.by_day.0.stages.3.acts]\n- Radio Carolina: Gonzalo Vallejo B2B Natalia Pastor, Saulo, Nico Ferrada, Bruno Bona, Turbangirll, Gaby Yavar, Arayko, Osvaldo Solorza [lineup.by_day.0.stages.4.acts]\n- Grieta x Panal Records: Potenciómetro, F600, Fantasna, Bele Cox, Nara Back [lineup.by_day.0.stages.5.acts]\n\nEn el Main Stage el vendedor publica un cupo como \"Artist TBC\", sin nombre [not_found.2].",
          },
          {
            id: "domingo",
            heading: "Domingo 15 de noviembre: seis escenarios",
            body: "El domingo, Calvin Harris, Charlotte de Witte, Fisher y Hugel tocan en el Main Stage; Morten repite, esta vez en el A Stage junto a Loud Luxury y Bassjackers [lineup.by_day.1.stages.0.acts] [lineup.by_day.1.stages.1.acts]. El domingo hay dos escenarios que el sábado no están: Cream, con Faithless Sound System, The Blessed Madonna y Kölsch, y Feral, con Enrico Sangiuliano, Âme Live y Anfisa Letyago [lineup.by_day.1.stages.2.acts] [lineup.by_day.1.stages.3.acts].\n\n- Main Stage: Calvin Harris, Charlotte de Witte, Fisher, Hugel, Innellea, Miss Javi, O-Sessions [lineup.by_day.1.stages.0.acts]\n- A Stage: Morten, Loud Luxury, Bassjackers, Jaden Bojsen, Aaron Hibell, Colayuta, Ania [lineup.by_day.1.stages.1.acts]\n- Cream: Faithless Sound System, The Blessed Madonna, Kölsch, Nic Fanciulli, Sosa, Camilo Gil, Gianni B2B Francisco Martinez, Tweeter [lineup.by_day.1.stages.2.acts]\n- Feral: Yanamaste Live, Delia, Enrico Sangiuliano, Âme Live, Anfisa Letyago, NPLNSSS, Marcelo Antonio [lineup.by_day.1.stages.3.acts]\n- Radio Carolina: Juan Hinrichsen, Luka Kuhnow, Josefina, Fanvel, Alex Brugnara, Urubmara, Syntrovert, ICA DJ [lineup.by_day.1.stages.4.acts]\n- Grieta x Panal Records: Alisú, Dupøuy, Weisser, Elias Deepman, Fuzzler [lineup.by_day.1.stages.5.acts]",
          },
          {
            id: "horarios",
            heading: "Horarios",
            body: "Al 24 de octubre de 2026 la organización ha publicado el día y el escenario de cada artista, pero no la hora de cada set ni la hora de apertura de puertas [schedule_v2.set_times] [schedule_v2.doors]. En 2025 el line-up por día se publicó el 4 de agosto, según Meganoticias [editions_v2.items.1.day_split_in_press] [sources.s23]. {{until prices}}Lo que sí está decidido: el Weekend Ticket cubre los dos días, y el Day Ticket es solo para el sábado o solo para el domingo [tickets.formats]; si vas por un artista, su día está en las listas de arriba, y los precios del Day Ticket de ese día están en la página de entradas. → /creamfields-chile/entradas/ {{/until}}Fechas y lugar están en la página de Creamfields Chile 2026. → /creamfields-chile/",
          },
          {
            id: "escenarios",
            heading: "Los escenarios",
            body: "Cuatro escenarios repiten nombre los dos días: Main Stage, A Stage, Radio Carolina y Grieta x Panal Records; el sábado se suman Alternative y HE.SHE.THEY, y el domingo, Cream y Feral [lineup.by_day.0.stages] [lineup.by_day.1.stages]. El Main Stage es el que el vendedor nombra en su página [lineup.stages.0]: el PIT exclusivo de The Village está frente a él, la estructura en altura del Sky Lounge tiene vista hacia él y el Diamond Lounge incluye una visita a su backstage [tickets.includes.village] [tickets.includes.sky_lounge] [tickets.includes.diamond_lounge]. Para 2026 la organización anuncia en su página oficial en Punto Ticket, en la noticia \"Creamfields Chile crece\", una zona nueva de 5.000 m² que \"incluirá un anfiteatro con capacidad para 3.000 personas sentadas y 5.000 de pie\", donde va uno de los escenarios principales [lineup.stages.1] [labels_v2.s15_quote] [sources.s15]. Según Meganoticias y 24horas.cl, el cartel reúne 85 artistas, 39 internacionales y 46 nacionales [lineup_size_v2].",
          },
        ],
        faqHeading: "Preguntas frecuentes",
        faq: [
          {
            q: "¿Cuál es el line-up por día de Creamfields 2026?",
            a: "El sábado 14 de noviembre, en el Main Stage, Hardwell, Boris Brejcha, Morten, LP Giobbi, Aerobica y Carla Valenti, más un cupo que el vendedor publica como \"Artist TBC\" [lineup.by_day.0.stages.0.acts]; el domingo 15, Calvin Harris, Charlotte de Witte, Fisher, Hugel, Innellea, Miss Javi y O-Sessions [lineup.by_day.1.stages.0.acts]. Los seis escenarios de cada día, con todos sus nombres, están arriba, según la imagen de Punto Ticket leída el 24 de octubre de 2026 [sources.s20] [lineup.readOn].",
          },
          {
            q: "¿Cuál es el horario de Creamfields 2026?",
            a: "Al 24 de octubre de 2026 no hay horarios publicados: la organización ha dado el día y el escenario de cada artista, no la hora de cada set ni la apertura de puertas [schedule_v2.set_times] [schedule_v2.doors]. En 2025 el line-up por día salió el 4 de agosto, según Meganoticias [editions_v2.items.1.day_split_in_press].",
          },
        ],
        sourcesHeading: "Fuentes",
        sources: "- [Line-up por día y escenario, imagen en la página de Punto Ticket](/go/creamfields-chile-tickets/), leída el 24 de octubre de 2026; sin horarios en la página ni en la imagen al 24 de octubre de 2026 [sources.s20] [schedule_v2]\n- Punto Ticket, página oficial de Creamfields Chile 2026 (Main Stage nombrado en el texto), leída el 24 de octubre de 2026 [sources.s1]\n- Punto Ticket, \"Creamfields Chile crece: Suma una nueva zona de 5.000 m² y estrena anfiteatro en Club Hípico\", leído el 22 de octubre de 2026 [sources.s15]\n- Prensa, citada en el texto: Meganoticias y 24horas.cl, 7 de agosto de 2026 [sources.s12] [sources.s13]; Meganoticias, 4 de agosto de 2025 [sources.s23]",
        anchors: [
          { target: "/creamfields-chile/entradas/", text: "página de entradas" },
          { target: "/creamfields-chile/", text: "página de Creamfields Chile 2026" },
        ],
      },
    ],
  },
  {
    slug: "en",
    createdAt: "2026-10-24T08:25:00+04:00",
    updatedAt: "2026-10-24T08:25:00+04:00",
    event: "creamfields-chile",
    // The English twin: the same edition and sheet, for a reader who
    // searches in English. Second in the list, so the Spanish guide stays the
    // x-default and keeps the hub's one card (rules.ts, firstGuides).
    name: "Creamfields Chile 2026",
    lang: "en",
    dir: "ltr",
    path: "/creamfields-chile/en/",
    cover: "/covers/creamfields-chile.jpg",
    hubLabel: "English",
    hubBlurb: "Creamfields Chile 2026 is on Saturday 14 and Sunday 15 November 2026 at the Club Hípico de Santiago, Av. Blanco Encalada 2540, Santiago Centro [editions_v2.items.0.dates] [venue.address].",
    // The Spanish guide's day: every reading inside a span is of 24 October
    // 2026, or of 21 October for the service charge, inside 42 days on the
    // 16th.
    expires: { prices: "2026-11-16", sale: "2026-11-16" },
    footerNote: "An independent guide, written from the sources named in it, each with the date it was read. None of them has a hand in it.",
    pages: [
      {
        slug: "creamfields-chile/en",
        createdAt: "2026-10-24T08:25:00+04:00",
        updatedAt: "2026-10-24T08:25:00+04:00",
        kind: "main",
        label: "Guide",
        crumb: "Creamfields Chile 2026",
        title: "Creamfields Chile 2026: dates, tickets — festival guide",
        description: "Creamfields Chile 2026, 14–15 November at the Club Hípico, Santiago: tickets in CLP from Punto Ticket, line-up by day, the passport rule. Festival guide.",
        h1: "Creamfields Chile 2026",
        lede: "Creamfields Chile 2026 is on Saturday 14 and Sunday 15 November 2026 at the Club Hípico de Santiago, Av. Blanco Encalada 2540, Santiago Centro [editions_v2.items.0.dates] [venue.address]. {{until sale}}Tickets are sold by [Punto Ticket, the official seller](/go/creamfields-chile-tickets/), and creamfields.cl takes you straight to its page [sellers_v2.items.0] [sellers.0.kind].{{/until}} Calvin Harris, Charlotte de Witte, Fisher and Hugel play the Main Stage on Sunday. Hardwell and Boris Brejcha play it on Saturday [lineup.by_day.1.stages.0.acts] [lineup.by_day.0.stages.0.acts]. It is for over-18s, and the only document a visitor from abroad can get in with is a valid passport, the original [age.min] [entry.foreigners] [entry.originals_only].\n\nChile Travel writes about the festival in English, and the festival's ticket seller runs a separate passport check for visitors from abroad [chile_travel_en] [entry.foreigners]. Yet neither the organiser nor the seller has a page in English, and the seller gives the line-up{{until prices}}, like the price tables,{{/until}} as a picture [scout.not_found.7] [sources.s20]. Here it all is in English, as text, every fact with its source and the date it was read.",
        ledeParas: 1,
        glanceHeading: "At a glance",
        glance: [
          { label: "Dates", value: "Saturday 14 and Sunday 15\u00a0November\u00a02026 [editions_v2.items.0.dates]" },
          { label: "Venue", value: "Club Hípico de Santiago, Av. Blanco Encalada 2540, Santiago Centro [venue.name] [venue.address]" },
          { label: "Tickets", value: "Punto Ticket, the official seller [sellers_v2.items.0]{{until prices}}. Normal prices not crossed out on 24\u00a0October\u00a02026: CLP\u00a098,000\u00a0to CLP\u00a0850,000, plus a 12.5%\u00a0charge [prices_v2.lowest_unstruck_normal] [prices_v2.highest_unstruck_normal] [prices_v2.readOn] [tickets.service_charge]{{/until}}" },
          { label: "Age", value: "18 and over [age.min]" },
          { label: "Paying inside", value: "cashless wristband only [cashless.text]" },
        ],
        jumps: [
          { id: "tickets", label: "Tickets" },
          { id: "days", label: "The two days" },
          { id: "venue", label: "Getting there" },
          { id: "entry", label: "Passport and age" },
          { id: "cashless", label: "Paying inside" },
          { id: "before-you-fly", label: "Before you fly" },
          { id: "origins", label: "Where it comes from" },
          { id: "questions", label: "Questions" },
          { id: "sources", label: "Sources" },
        ],
        sections: [
          {
            id: "tickets",
            heading: "Tickets: who sells them{{until prices}} and what is left{{/until}}",
            body: "{{until sale}}There is one official seller, Punto Ticket, and the organiser's own address, creamfields.cl, forwards to its page [sellers_v2.items.0] [sellers.0.kind].{{/until}} Punto Ticket's page is plain on the point: \"La venta, descuento, control y distribución de las entradas son de exclusiva responsabilidad de Punto Ticket\". The sale, discounts, checks and distribution of tickets are Punto Ticket's alone [sellers_v2.items.0.seller_words]. There are four kinds of ticket: General, The Village, Sky Lounge and Diamond Lounge. Each comes as a Weekend Ticket for both days or as a day ticket for Saturday or Sunday [tickets.tiers] [tickets.formats].\n\n{{until prices}}Prices are in Chilean pesos (CLP), and the seller adds a 12.5% service charge to each of them [prices_v2.note] [tickets.service_charge]. On 24 October 2026 the lowest normal price not crossed out on the seller's tables was CLP 98,000, for a Saturday General day ticket [prices_v2.lowest_unstruck_normal] [prices_v2.readOn]. The highest was CLP 850,000, for a Weekend Diamond Lounge ticket [prices_v2.highest_unstruck_normal].{{/until}}\n\n{{until prices}}Sunday is where the tables have changed. Between 22 and 24 October 2026 the seller crossed out the last open prices of two more Sunday day tickets. By the 24th, every price was crossed out for the Sunday day ticket in General, The Village and Sky Lounge [prices_v2.tables.2.note] [prices_v2.tables.5.rows.3.normal_s] [prices_v2.tables.8.rows.2.normal_s] [prices_v2.tables.8.rows.3.normal_s]. Sunday's Diamond Lounge day ticket still showed CLP 550,000 and CLP 600,000 [prices_v2.tables.11]. Every Weekend Ticket, which covers Sunday too, still showed a price, the cheapest being the Weekend General at CLP 160,000 [prices_v2.tables.0] [prices_v2.tables.3] [prices_v2.tables.6] [prices_v2.tables.9]. Punto Ticket's Creamfields page does not use the word \"agotado\", sold out, for any of it [prices_v2.tables.2.note] [scout.1.5.sold_out].{{/until}} What each ticket includes, and the rules on names and refunds, are on [the tickets page](/creamfields-chile/en/tickets/){{until prices}}, with the twelve tables in full{{/until}}.",
          },
          {
            id: "days",
            heading: "Two days, two different bills",
            body: "The festival runs on two consecutive days, Saturday 14 and Sunday 15 November 2026 [editions_v2.items.0.dates]. Each day has six stages and its own line-up, so a day ticket buys one bill rather than half of two [lineup.by_day] [tickets.formats]. Saturday's Main Stage has Hardwell and Boris Brejcha, and one slot the seller lists only as \"Artist TBC\" [lineup.by_day.0.stages.0.acts] [not_found.2]. Sunday's has Calvin Harris, Charlotte de Witte, Fisher and Hugel [lineup.by_day.1.stages.0.acts]. Morten plays both days, on Saturday's Main Stage and Sunday's A Stage [lineup.by_day.0.stages.0.acts] [lineup.by_day.1.stages.1.acts].\n\nOn 24 October 2026 neither the organiser nor the seller had published set times, or the hour the gates open [schedule_v2.set_times] [schedule_v2.doors] [schedule_v2.readOn]. Every stage and every name, day by day, is on [the line-up page](/creamfields-chile/en/lineup/).\n\nRadio Agricultura reported the dates on Tuesday 17 March 2026 [editions_v2.items.0.in_press.0]. General sale opened on Friday 8 May 2026 at 12:00 [tickets.general_sale.from]. The line-up followed on Friday 7 August 2026, according to Meganoticias and 24horas.cl [editions_v2.items.0.in_press.2]. Last year's edition was on 11 and 12 October 2025 at the same club, and La Tercera reported it as the festival's 20th anniversary [editions_v2.items.1.dates_source].",
          },
          {
            id: "venue",
            heading: "The Club Hípico and how to get there",
            body: "The festival is at the Club Hípico de Santiago, Av. Blanco Encalada 2540, Santiago Centro [venue.name] [venue.address]. The club's contact page marks that address and three more points on its map: Avenida Club Hípico 875 at the corner of Avenida Tupper, Avenida España at Blanco Encalada, and Abate Molina at Blanco Encalada [venue_v2.como_llegar.access_points]. That page does not mention the festival [venue_v2.como_llegar.mentions_festival]. Neither the club nor the organiser names a Metro station, a bus route or a car park for it [transport.1] [venue_v2.como_llegar.not_named]. The only parking either mentions is the one space that comes with a Diamond Lounge ticket [tickets.includes.diamond_lounge]. The club's phone, +56 2 2693 9600, and its email, contacto@clubhipico.cl, are the club's, not the festival's [venue.phone] [venue.email]. [Open in maps](/go/creamfields-chile-map/) shows the club's own marker [venue.geo_venue].\n\nFrom the airport, the bus company Centropuerto (centropuerto.cl) runs four routes, according to its English page: República – Airport, Pajaritos – Airport, Terminal South – Airport and Maipú – Airport [transport_en.text]. The Maipú route runs on working days only, so not on the festival's Saturday and Sunday [transport_en.maipu.days] [transport_en.maipu.festival_days]. Centropuerto's home page says \"Departures every 15 minutes, every day\" [transport_en.frequency.home_page_claim]. Its page for the República route is more exact: every 10 to 15 minutes from Monday to Friday, and every 15 to 25 minutes on Saturdays, Sundays and public holidays [transport_en.frequency.republica.weekdays] [transport_en.frequency.republica.weekends_holidays].\n\n{{until prices}}A single is CLP 2,400, valid for 90 days. A return is CLP 4,100, and its return leg is valid for 90 days too [transport_en.text].{{/until}} The company's office is in the Santiago Airport bus terminal, opposite platform 24 [transport_en.text]. No official page gives the way from the city end of these routes to the club, so the address and a map will have to do [transport_en.note].",
          },
          {
            id: "entry",
            heading: "Getting in: passport, age and the name on the ticket",
            body: "Creamfields Chile is for over-18s. The seller's line is \"Evento para mayores de 18 años\" [age.text]. If you hold a Chilean ID card, the cédula, you may enter with it or with a valid Chilean passport [entry.chileans] [entry_v2.chileans_wording]. Everyone else needs a valid foreign passport, checked at a verification point of its own at the entrance [entry.foreigners]. Only the original counts, so take the passport itself, not a copy [entry.originals_only].\n\nThe name on your ticket has to match the one in your passport exactly. The seller's words are \"El nombre en tu entrada tiene que ser exacto al que figura en tu documento\", and anyone whose identity does not check out on those terms is turned away [entry_v2.name_match]. So it is worth typing your name at checkout as the passport prints it [entry_v2.name_match].",
          },
          {
            id: "cashless",
            heading: "Paying inside: the cashless wristband",
            body: "Inside the festival you pay with a wristband. The seller calls its \"Pulsera Cashless\", the cashless wristband, \"el único medio de pago para Creamfields 2026\": the only means of payment for food, drink and merchandise [cashless.text] [cashless.what]. One wristband covers both Saturday and Sunday [cashless.what].\n\n{{until prices}}The seller recommends loading it online before you go. You open a \"Personal Account\", load it with CLP 10,000 or more in steps of CLP 5,000 by debit or credit card, and receive a QR code [cashless.online_preload]. On the day you show the QR at the \"PRECARGA CASHLESS\" zone before going in, and activation is free [cashless.online_preload].{{/until}}\n\n{{until prices}}The seller's bonus is for online loads made by 23:59 on Thursday 12 November 2026, on this scale [cashless.bonus]:{{/until}}\n\n- {{until prices}}CLP 50,000 loaded: CLP 5,000 bonus [cashless.bonus]{{/until}}\n- {{until prices}}CLP 60,000 loaded: CLP 6,000 bonus [cashless.bonus]{{/until}}\n- {{until prices}}CLP 70,000 loaded: CLP 7,000 bonus [cashless.bonus]{{/until}}\n- {{until prices}}CLP 80,000 loaded: CLP 8,000 bonus [cashless.bonus]{{/until}}\n- {{until prices}}CLP 90,000 loaded: CLP 9,000 bonus [cashless.bonus]{{/until}}\n- {{until prices}}CLP 100,000 or more loaded: CLP 10,000 bonus [cashless.bonus]{{/until}}\n\n{{until prices}}Loads below CLP 50,000 earn none. The bonus comes once per person and is spent only after the loaded balance has run out. It is never refunded, cannot be passed on and expires when the festival closes [cashless.bonus].{{/until}}\n\n{{until prices}}A wristband bought at the festival's cashiers carries a CLP 1,000 activation charge, and top-ups made there earn no bonus [cashless.on_site]. You can top up from your account or at a cashier, and check the balance online or at any cashier [cashless.topup].{{/until}} On 24 October 2026 the seller's page did not say whether an unspent balance would be refunded{{until prices}}, and its \"Personal Account\" button did not lead anywhere{{/until}} [scout.not_found.4].",
          },
          {
            id: "before-you-fly",
            heading: "Before you fly: passports and visas",
            body: "British citizen passport holders can visit Chile for up to 90 days without a visa, according to GOV.UK's entry requirements for Chile, updated 9 October 2026 and read 24 October 2026 [entry_uk.for] [entry_uk.visa]. The passport should have an expiry date after the day you plan to leave Chile [entry_uk.passport]. Immigration issues a tourist card, the \"tarjeta de turismo\", which you keep and hand in when you leave. If it goes missing, the PDI issues a duplicate online [entry_uk.tourist_card]. British-Chilean dual nationals must enter and leave Chile on their Chilean passport [entry_uk.dual]. [GOV.UK, Chile entry requirements](/go/creamfields-chile-gov-uk/).\n\nHolders of a regular Canadian passport need no tourist visa, says the Government of Canada's travel advice for Chile, last updated 19 October 2026 [entry_ca.for] [entry_ca.visa]. The passport must be valid for the length of the stay [entry_ca.passport]. The tourist card is issued on arrival, is valid for up to 90 days and is shown again on departure [entry_ca.tourist_card]. The same page says the Chilean government requires visitors to have at least USD 46 a day, and that customs may ask for proof [entry_ca.funds]. [Government of Canada, travel advice for Chile](/go/creamfields-chile-travel-gc-ca/).\n\nOn a US passport, the State Department's travel advice is the place to check. On any other passport, check your own government's advice for Chile.",
          },
          {
            id: "origins",
            heading: "From a Liverpool club night to Santiago",
            body: "Creamfields began as Cream, a weekly house night at Nation, formerly Snobs Disco, in Wolstenholme Square, Liverpool. It ran from October 1992 to June 2002, according to the brand's own history page [brand_origin_v2]. The British festival is held at Daresbury, and the same page lists festivals from 1998 onwards [brand_origin_v2]. Creamfields Chile is produced by Street Machine Producciones [event.organiser]. Chile Travel (Sernatur) counts 85 artists for 2026, playing \"from house and Latin house to techno and EDM\" [chile_travel_en]. The Chilean edition is one of the brand's international ones, listed on creamfields.com beside Argentina and Malta [brand_lists_chile]. Quite some distance from Wolstenholme Square.",
          },
        ],
        faqHeading: "Questions people ask",
        faq: [
          {
            q: "When is Creamfields Chile 2026?",
            a: "On Saturday 14 and Sunday 15 November 2026, two days in a row, at the Club Hípico de Santiago. Those are the dates on Punto Ticket's official page, read 24 October 2026 [editions_v2.items.0.dates] [editions.0.readOn] [sources.s1].",
          },
          {
            q: "Where exactly is Creamfields Chile?",
            a: "At the Club Hípico de Santiago, Av. Blanco Encalada 2540, Santiago Centro. The seller's page gives the venue, and the club's contact page the address [venue.address] [sources.s1] [sources.s3]. Directions are under \"Getting there\" above.",
          },
          {
            q: "Who is headlining Creamfields Chile 2026?",
            a: "Calvin Harris, Charlotte de Witte, Fisher and Hugel on Sunday's Main Stage. Hardwell and Boris Brejcha on Saturday's. That is the seller's line-up picture, read 24 October 2026 [lineup.by_day.1.stages.0.acts] [lineup.by_day.0.stages.0.acts] [sources.s20]. Also on the bill: Don Diablo, Jonas Blue, The Blessed Madonna, Kölsch, Faithless Sound System, Enrico Sangiuliano and Âme Live, among others [lineup.by_day.0.stages.1.acts] [lineup.by_day.1.stages.2.acts] [lineup.by_day.1.stages.3.acts].",
          },
          {
            q: "How much are Creamfields Chile tickets?",
            a: "{{until prices}}It depends on the ticket and the day. On the seller's tables, read 24 October 2026, normal prices not crossed out ran from CLP 98,000 for a Saturday General day ticket to CLP 850,000 for a Weekend Diamond Lounge ticket [prices_v2.lowest_unstruck_normal] [prices_v2.highest_unstruck_normal] [sources.s20]. The seller adds a 12.5% service charge [tickets.service_charge]. Every table is on [the tickets page](/creamfields-chile/en/tickets/).{{/until}}",
          },
          {
            q: "Are Creamfields Chile tickets sold out?",
            a: "{{until prices}}Punto Ticket's Creamfields page does not say so. On its tables, read 24 October 2026, the Sunday day tickets in General, The Village and Sky Lounge were crossed out in every phase. Every Saturday and Weekend table, and Sunday's Diamond Lounge, still showed a price [prices_v2.tables] [prices_v2.tables.2.note] [scout.1.5.sold_out] [sources.s20].{{/until}}",
          },
          {
            q: "What age is Creamfields Chile?",
            a: "18 and over. The seller's entry conditions say \"Evento para mayores de 18 años\", an event for over-18s [age.text] [sources.s1].",
          },
          {
            q: "Can I get in with a foreign passport?",
            a: "Yes. Unless you hold a Chilean ID card, a valid foreign passport is the only document that works [entry.foreigners] [entry_v2.chileans_wording]. It must be the original, and it is checked at a separate point at the entrance [entry.originals_only] [entry.foreigners]. The name on the ticket must match it exactly. Both rules are on the seller's page, read 24 October 2026 [entry_v2.name_match] [sources.s1].",
          },
          {
            q: "Do I need a visa for Chile?",
            a: "Not as a tourist on a British citizen passport or a regular Canadian one, according to GOV.UK and the Government of Canada, both read 24 October 2026 [entry_uk.for] [entry_uk.visa] [entry_ca.for] [entry_ca.visa]. Both mention a tourist card issued on arrival, which you keep and present when you leave [entry_uk.tourist_card] [entry_ca.tourist_card]. On a US passport, check the State Department's advice.",
          },
          {
            q: "How do I pay inside Creamfields Chile?",
            a: "With the cashless wristband, which the seller calls the only means of payment [cashless.text]. {{until prices}}Its bonus is for online loads of CLP 50,000 or more made by 23:59 on Thursday 12 November 2026. A wristband bought on the day costs CLP 1,000 to activate [cashless.bonus] [cashless.on_site] [sources.s1].{{/until}}",
          },
          {
            q: "Which Metro station is nearest the Club Hípico?",
            a: "Neither the organiser nor the club names one, and the club's page does not mention the festival [transport.1] [venue_v2.como_llegar.not_named] [venue_v2.como_llegar.mentions_festival]. The address to give a map or a driver is Av. Blanco Encalada 2540, Santiago Centro [venue.address].",
          },
          {
            q: "What kind of music is at Creamfields Chile?",
            a: "Chile Travel (Sernatur) puts it as \"from house and Latin house to techno and EDM\", on its English page about this edition, read 24 October 2026 [chile_travel_en] [sources.s35].",
          },
          {
            q: "Is there camping at Creamfields Chile?",
            a: "The seller's page, read 24 October 2026, mentions none [scout.not_found.9].",
          },
          {
            q: "What is Creamfields Chile?",
            a: "The Chilean edition of Creamfields, which began as Cream, a Liverpool club night. The brand's own history page lists festivals from 1998 onwards, and its international page lists Chile with Argentina and Malta [brand_origin_v2] [brand_lists_chile] [sources.s28] [sources.s29]. Street Machine Producciones produces it, over two days, for over-18s [event.organiser] [editions_v2.items.0.dates] [age.min].",
          },
          {
            q: "When was Creamfields Chile 2025, and who played?",
            a: "On Saturday 11 and Sunday 12 October 2025 at the Club Hípico de Santiago, according to La Tercera (26 May 2025), which reported it as the festival's 20th anniversary [editions_v2.items.1.dates_source]. CNN Chile named David Guetta, Armin van Buuren, deadmau5, Alok and Claptone among its acts [editions_v2.items.1.names]. Both are press reports, as the seller's 2025 page is gone [editions.1.note].",
          },
          {
            q: "When is Creamfields Chile 2027?",
            a: "On 21 October 2026 the organiser had not announced it [questions.8.note]. The 2026 dates were in the press on 17 March 2026, and the 2025 dates on 23 May 2025, both in Radio Agricultura [editions_v2.items.0.in_press.0] [editions_v2.items.1.first_in_press].",
          },
        ],
        sourcesHeading: "Sources",
        sourcesNote: "Read on 24 October 2026 unless another date is given.",
        sources: "- [Punto Ticket, the official Creamfields Chile 2026 page (creamfields.cl forwards here)](/go/creamfields-chile-tickets/): dates, entry conditions, the cashless wristband [sources.s1]\n- The line-up{{until prices}} and the twelve price tables{{/until}}, pictures on the same page [sources.s20]\n- [Club Hípico de Santiago, contact page](/go/creamfields-chile-venue/), read 22 October 2026 [sources.s3]\n- Centropuerto, airport buses: the home page in English and the República and Maipú route pages, at centropuerto.cl [sources.s32] [sources.s36] [sources.s37]\n- [GOV.UK, Chile entry requirements](/go/creamfields-chile-gov-uk/), updated 9 October 2026 [sources.s30]\n- [Government of Canada, travel advice for Chile](/go/creamfields-chile-travel-gc-ca/), updated 19 October 2026 [sources.s31]\n- [Chile Travel (Sernatur), \"Two days of electronic music in Santiago\"](/go/creamfields-chile-chile-travel/) [sources.s35]\n- Creamfields, \"History\" and \"International\", at creamfields.com [sources.s28] [sources.s29]\n- Press, cited in the text, each read 22 October 2026: Radio Agricultura, 23 May 2025 and 17 March 2026 [sources.s21] [sources.s9]. La Tercera Culto, 26 May 2025 [sources.s8]. CNN Chile, \"Vuelve Creamfields Chile: Cuándo es la edición 2026 en Santiago y cómo inscribirse para la preventa\" [sources.s10]. Meganoticias and 24horas.cl, 7 August 2026 [sources.s12] [sources.s13] [editions_v2.readOn]\n- [Creamfields Chile on Instagram, the organiser's channel](/go/creamfields-chile-instagram/) [sources.s19]",
      },
      {
        slug: "creamfields-chile/en/tickets",
        createdAt: "2026-10-24T08:25:00+04:00",
        updatedAt: "2026-10-24T08:25:00+04:00",
        kind: "tickets",
        label: "Tickets",
        crumb: "Tickets",
        linkTitle: "Creamfields Chile 2026 tickets: every price table, what each ticket includes, names and refunds",
        title: "Creamfields Chile 2026: tickets and prices — festival guide",
        description: "Creamfields Chile 2026 tickets at Punto Ticket: four kinds, twelve price tables in CLP, the 12.5% charge and what each ticket includes. Festival guide.",
        h1: "Creamfields Chile 2026 tickets",
        lede: "{{until sale}}Tickets for Creamfields Chile 2026 are sold by [Punto Ticket, the official seller](/go/creamfields-chile-tickets/), and creamfields.cl forwards to its page [sellers_v2.items.0] [sellers.0.kind].{{/until}} There are four kinds: General, The Village, Sky Lounge and Diamond Lounge [tickets.tiers]. Each comes as a Weekend Ticket or as a day ticket for Saturday 14 or Sunday 15 November 2026 [tickets.formats] [editions_v2.items.0.dates]. {{until prices}}The seller publishes its prices as twelve pictures in Spanish. Below they are in text, read 24 October 2026, with every crossed-out price marked [prices_v2] [prices_v2.readOn].{{/until}} Who plays which day is on [the line-up page](/creamfields-chile/en/lineup/). The venue, the passport rule and the cashless wristband are in [the main guide](/creamfields-chile/en/).",
        jumps: [
          { id: "where-to-buy", label: "Where to buy" },
          { id: "whats-left", label: "{{until prices}}What is left{{/until}}" },
          { id: "prices", label: "{{until prices}}Prices{{/until}}" },
          { id: "includes", label: "What is included" },
          { id: "names-refunds", label: "Names and refunds" },
          { id: "banco-de-chile", label: "{{until sale}}Banco de Chile{{/until}}" },
          { id: "reserve-plan", label: "Reserve plan" },
          { id: "spanish", label: "The seller's Spanish" },
          { id: "questions", label: "Questions" },
          { id: "sources", label: "Sources" },
        ],
        sections: [
          {
            id: "where-to-buy",
            heading: "Where to buy{{until prices}}, and what the seller adds{{/until}}",
            body: "{{until prices}}[Punto Ticket](/go/creamfields-chile-tickets/) is the official seller, and it adds a 12.5% service charge to every price on its tables. Its own line is \"PRECIOS NO INCLUYEN CARGO POR SERVICIO DEL 12,5%\" [sellers_v2.items.0] [tickets.service_charge].{{/until}} General sale opened on Friday 8 May 2026 at 12:00 [tickets.general_sale.from]. Punto Ticket's Creamfields page is in Spanish only, and on 24 October 2026 it did not say whether cards issued outside Chile were accepted [scout.not_found.7] [scout.not_found.8].",
          },
          {
            id: "whats-left",
            heading: "What the tables showed on 24 October",
            body: "{{until prices}}Nothing on the tables says which phase is on sale. The seller crosses out the phases it has closed, and the price that counts is the one Punto Ticket shows when you buy [prices_v2.note]. On 24 October 2026 the normal-price column looked like this [prices_v2.readOn].{{/until}}\n\n- {{until prices}}Saturday: every kind still showed prices. General from CLP 98,000, The Village from CLP 144,000, Sky Lounge from CLP 196,000 and Diamond Lounge from CLP 450,000 [prices_v2.tables.1] [prices_v2.tables.4] [prices_v2.tables.7] [prices_v2.tables.10].{{/until}}\n- {{until prices}}Sunday: the General, The Village and Sky Lounge day tickets were crossed out in every phase. Diamond Lounge still showed CLP 550,000 and CLP 600,000 [prices_v2.tables.2.note] [prices_v2.tables.5] [prices_v2.tables.8] [prices_v2.tables.11].{{/until}}\n- {{until prices}}Weekend: General CLP 160,000, The Village CLP 240,000, Sky Lounge CLP 320,000, and Diamond Lounge CLP 800,000 and CLP 850,000 [prices_v2.tables.0] [prices_v2.tables.3] [prices_v2.tables.6] [prices_v2.tables.9].{{/until}}\n\n{{until prices}}Punto Ticket's Creamfields page calls none of them sold out [prices_v2.tables.2.note] [scout.1.5.sold_out].{{/until}}",
          },
          {
            id: "prices",
            kind: "table",
            heading: "Prices by ticket, in the seller's four phases",
            body: "{{until prices}}Each table has the seller's four phases, in the seller's order: Early Bird, Venta 2, Venta 3 and Venta 4. Each phase has two prices. One is the normal price. The other is 20% off for Banco de Chile cardholders, on the ticket and not on the service charge [prices_v2.note] [bank_offer.conditions]. Prices in Chilean pesos (CLP), before the 12.5% service charge, read 24 October 2026 [tickets.service_charge] [prices_v2.readOn].{{/until}}\n\n{{until prices}}**General**{{/until}}\n\n{{until prices}}Weekend Ticket, General, prices in CLP [prices_v2.tables.0]{{/until}}\n\n{{until prices}}| Phase | Normal price | Banco de Chile, 20% off |\n|---|---|---|\n| Early Bird | 128,000 (crossed out) | 102,400 (crossed out) |\n| Venta 2 | 138,000 (crossed out) | 110,400 (crossed out) |\n| Venta 3 | 146,000 (crossed out) | 116,800 (crossed out) |\n| Venta 4 | 160,000 | 128,000 (crossed out) |{{/until}}\n\n{{until prices}}Saturday day ticket, General, prices in CLP [prices_v2.tables.1]{{/until}}\n\n{{until prices}}| Phase | Normal price | Banco de Chile, 20% off |\n|---|---|---|\n| Early Bird | 92,000 (crossed out) | 73,600 (crossed out) |\n| Venta 2 | 98,000 | 78,400 (crossed out) |\n| Venta 3 | 106,000 | 84,800 (crossed out) |\n| Venta 4 | 120,000 | 96,000 |{{/until}}\n\n{{until prices}}Sunday day ticket, General, prices in CLP [prices_v2.tables.2]{{/until}}\n\n{{until prices}}| Phase | Normal price | Banco de Chile, 20% off |\n|---|---|---|\n| Early Bird | 92,000 (crossed out) | 73,600 (crossed out) |\n| Venta 2 | 98,000 (crossed out) | 78,400 (crossed out) |\n| Venta 3 | 106,000 (crossed out) | 84,800 (crossed out) |\n| Venta 4 | 120,000 (crossed out) | 96,000 (crossed out) |{{/until}}\n\n{{until prices}}Every price on the seller's table for the Sunday day ticket in General is crossed out [prices_v2.tables.2.note].{{/until}}\n\n{{until prices}}**The Village**{{/until}}\n\n{{until prices}}Weekend Ticket, The Village, prices in CLP [prices_v2.tables.3]{{/until}}\n\n{{until prices}}| Phase | Normal price | Banco de Chile, 20% off |\n|---|---|---|\n| Early Bird | 206,000 (crossed out) | 164,800 (crossed out) |\n| Venta 2 | 216,000 (crossed out) | 172,800 (crossed out) |\n| Venta 3 | 226,000 (crossed out) | 180,800 (crossed out) |\n| Venta 4 | 240,000 | 192,000 (crossed out) |{{/until}}\n\n{{until prices}}Saturday day ticket, The Village, prices in CLP [prices_v2.tables.4]{{/until}}\n\n{{until prices}}| Phase | Normal price | Banco de Chile, 20% off |\n|---|---|---|\n| Early Bird | 134,000 (crossed out) | 107,200 (crossed out) |\n| Venta 2 | 144,000 | 115,200 (crossed out) |\n| Venta 3 | 154,000 | 123,200 (crossed out) |\n| Venta 4 | 170,000 | 136,000 |{{/until}}\n\n{{until prices}}Sunday day ticket, The Village, prices in CLP [prices_v2.tables.5]{{/until}}\n\n{{until prices}}| Phase | Normal price | Banco de Chile, 20% off |\n|---|---|---|\n| Early Bird | 134,000 (crossed out) | 107,200 (crossed out) |\n| Venta 2 | 144,000 (crossed out) | 115,200 (crossed out) |\n| Venta 3 | 154,000 (crossed out) | 123,200 (crossed out) |\n| Venta 4 | 170,000 (crossed out) | 136,000 (crossed out) |{{/until}}\n\n{{until prices}}Every price on the seller's table for the Sunday day ticket in The Village is crossed out [prices_v2.tables.5.rows.3.normal_s] [prices_v2.tables.5.note].{{/until}}\n\n{{until prices}}**Sky Lounge**{{/until}}\n\n{{until prices}}Weekend Ticket, Sky Lounge, prices in CLP [prices_v2.tables.6]{{/until}}\n\n{{until prices}}| Phase | Normal price | Banco de Chile, 20% off |\n|---|---|---|\n| Early Bird | 276,000 (crossed out) | 220,800 (crossed out) |\n| Venta 2 | 286,000 (crossed out) | 228,800 (crossed out) |\n| Venta 3 | 296,000 (crossed out) | 236,800 (crossed out) |\n| Venta 4 | 320,000 | 256,000 (crossed out) |{{/until}}\n\n{{until prices}}Saturday day ticket, Sky Lounge, prices in CLP [prices_v2.tables.7]{{/until}}\n\n{{until prices}}| Phase | Normal price | Banco de Chile, 20% off |\n|---|---|---|\n| Early Bird | 196,000 | 156,800 (crossed out) |\n| Venta 2 | 206,000 | 164,800 (crossed out) |\n| Venta 3 | 216,000 | 172,800 |\n| Venta 4 | 250,000 | 200,000 |{{/until}}\n\n{{until prices}}Sunday day ticket, Sky Lounge, prices in CLP [prices_v2.tables.8]{{/until}}\n\n{{until prices}}| Phase | Normal price | Banco de Chile, 20% off |\n|---|---|---|\n| Early Bird | 196,000 (crossed out) | 156,800 (crossed out) |\n| Venta 2 | 206,000 (crossed out) | 164,800 (crossed out) |\n| Venta 3 | 216,000 (crossed out) | 172,800 (crossed out) |\n| Venta 4 | 250,000 (crossed out) | 200,000 (crossed out) |{{/until}}\n\n{{until prices}}Every price on the seller's table for the Sunday day ticket in Sky Lounge is crossed out [prices_v2.tables.8.rows.2.normal_s] [prices_v2.tables.8.rows.3.normal_s] [prices_v2.tables.8.note].{{/until}}\n\n{{until prices}}**Diamond Lounge**{{/until}}\n\n{{until prices}}Weekend Ticket, Diamond Lounge, prices in CLP [prices_v2.tables.9]{{/until}}\n\n{{until prices}}| Phase | Normal price | Banco de Chile, 20% off |\n|---|---|---|\n| Early Bird | 700,000 (crossed out) | 560,000 (crossed out) |\n| Venta 2 | 750,000 (crossed out) | 600,000 (crossed out) |\n| Venta 3 | 800,000 | 640,000 (crossed out) |\n| Venta 4 | 850,000 | 680,000 (crossed out) |{{/until}}\n\n{{until prices}}Saturday day ticket, Diamond Lounge, prices in CLP [prices_v2.tables.10]{{/until}}\n\n{{until prices}}| Phase | Normal price | Banco de Chile, 20% off |\n|---|---|---|\n| Early Bird | 450,000 | 360,000 (crossed out) |\n| Venta 2 | 500,000 | 400,000 (crossed out) |\n| Venta 3 | 550,000 | 440,000 |\n| Venta 4 | 600,000 | 480,000 |{{/until}}\n\n{{until prices}}Sunday day ticket, Diamond Lounge, prices in CLP [prices_v2.tables.11]{{/until}}\n\n{{until prices}}| Phase | Normal price | Banco de Chile, 20% off |\n|---|---|---|\n| Early Bird | 450,000 (crossed out) | 360,000 (crossed out) |\n| Venta 2 | 500,000 (crossed out) | 400,000 (crossed out) |\n| Venta 3 | 550,000 | 440,000 (crossed out) |\n| Venta 4 | 600,000 | 480,000 (crossed out) |{{/until}}\n\n{{until prices}}The reduced-mobility ticket exists only in the General tables. It is only for people with an official disability card, the \"credencial de discapacidad\", which is asked for at the entrance [reduced_mobility.text] [reduced_mobility.applies_to].{{/until}}",
          },
          {
            id: "includes",
            heading: "What each ticket includes",
            body: "General: entry to the festival and to every stage, food areas and bars, free water points, brand activations and experiences, and paid lockers [tickets.includes.general].\n\nThe Village: everything in General, plus a separate entrance and exclusive access to the PIT in front of the Main Stage. It adds toilet trailers, a cocktail and food area by ÑAM, rest areas with shade, photo opportunities and experiences, and paid lockers [tickets.includes.village] [includes_v2.village_add].\n\nSky Lounge: everything in The Village, plus a raised, shaded platform inside The Village looking onto the Main Stage. It has its own bar with waiter service, a welcome cocktail in the official 2026 glass, and one fast-track ride on La Gran Rueda, the big wheel [tickets.includes.sky_lounge].\n\nDiamond Lounge: an exclusive space for 400 people, with access to The Village, one parking space for the buyer and direct, exclusive entry. It has a raised and shaded platform of its own, waiter service and an open bar of cocktails and premium drinks. It includes a lunch or dinner of your choice, a visit backstage at the Main Stage and a fast-track ride on the wheel [tickets.includes.diamond_lounge] [includes_v2.diamond_fix]. It comes with a kit as well: the festival wristband, an official lanyard with the line-up, an official 2026 cap and some surprises. The seller delivers the kit to the door for purchases made by 23:59 on 25 October 2026. Buyers after that collect it at the festival [tickets.includes.diamond_lounge] [includes_v2.diamond_fix].",
          },
          {
            id: "names-refunds",
            heading: "Names, transfers and refunds",
            body: "The name on the ticket must be exactly the one on the document shown at the entrance, under the seller's entry conditions [entry_v2.name_match]. For a visitor from abroad, that document is the passport [entry.foreigners]. The organiser names no official resale or transfer channel [not_found.4]. Punto Ticket's help centre describes \"entradas nominativas\", named tickets, as carrying the holder's name and ID and as not transferable. Its Creamfields page does not call its tickets that [named_tickets]. On refunds, the help centre says there are no changes or refunds once a purchase is complete, unless the event is cancelled or its set-up changes (the seller's word is \"configuración\"). That is the seller's general article, dated 7 August 2026, not a Creamfields page [refunds].",
          },
          {
            id: "banco-de-chile",
            heading: "Banco de Chile: 20% off and instalments, for its cardholders",
            body: "{{until sale}}The 20% price on every table is for holders of credit or debit cards issued by Banco de Chile, Banco Edwards included, buying on puntoticket.com through the bank's own payment button [bank_offer.conditions]. The discount is 20% on the ticket, not on the service charge, with at most four tickets per customer [bank_offer.conditions]. The bank's day-ticket sale opened on Friday 28 August 2026 at 12:00, capped at 2,500 Saturday and 2,500 Sunday tickets, and the seller gives no end date [bank_offer.day]. Holders of Banco de Chile credit cards, Banco Edwards included, may also pay part of the price in Dólares-Premio, and spread the payment over 3, 9 or 12 interest-free instalments. The minimum balance to redeem is 200 Dólares-Premio [bank_offer.instalments]. Instalment purchases carry stamp duty, which the customer pays [bank_offer.instalments]. With a card from any other bank, you pay the normal price [prices_v2.note] [bank_offer.conditions].{{/until}}",
          },
          {
            id: "reserve-plan",
            heading: "The reserve plan, no longer on the seller's page",
            body: "{{until prices}}On 22 October 2026 the seller's page offered a \"Plan de reserva\": \"ABONA $40.000 y paga el resto en 2 cuotas sin interés con cualquier medio de pago\". That is a CLP 40,000 deposit, with the rest in two interest-free instalments [reserve_plan_v2.seller_page.text] [reserve_plan_v2.readOn].{{/until}} On 24 October 2026 the plan was no longer on the seller's page, and nothing the seller publishes says whether it has closed or is still on sale [reserve_plan_v2.seller_page.status]. Its terms, two PDFs in Spanish, were still linked from the page that day: one for the [Weekend Ticket](/go/creamfields-chile-reserva-weekend/) [sources.s5] and one for the [Day Ticket](/go/creamfields-chile-reserva-day/) [sources.s6]. Every due date in them has passed [reserve_plan_v2.seller_page.status] [reserve_plan_v2.governs_today].",
          },
          {
            id: "spanish",
            heading: "The seller's Spanish, in brief",
            body: "- sábado, domingo: Saturday, Sunday [tickets.formats]\n- Precio normal: the normal price [prices_v2.note]\n- Compra con 20% dcto Banco de Chile: the price with the 20% Banco de Chile discount [prices_v2.note]\n- Venta 2, Venta 3, Venta 4: the second, third and fourth sale phases, after Early Bird [prices_v2.note]\n- Cargo por servicio: service charge [tickets.service_charge]\n- Movilidad reducida: reduced mobility [reduced_mobility.text]\n- Cédula: the Chilean ID card [entry_v2.chileans_wording]\n- Precarga cashless: loading the cashless wristband in advance [cashless.online_preload]\n- Agotado: sold out, a word Punto Ticket's Creamfields page did not use on 24 October 2026 [scout.1.5.sold_out]",
          },
        ],
        faqHeading: "Questions about tickets",
        faq: [
          {
            q: "Can I transfer or resell a Creamfields Chile ticket?",
            a: "The organiser names no official way to do either [not_found.4]. The ticket must carry the name on the holder's document, exactly [entry_v2.name_match]. Punto Ticket's help centre says its named tickets are not transferable, though the Creamfields page does not call its tickets named [named_tickets] [sources.s34].",
          },
          {
            q: "Can I get a refund on a Creamfields Chile ticket?",
            a: "Punto Ticket's general help article, dated 7 August 2026, says there are no changes or refunds once a purchase is complete. The exception is an event that is cancelled or whose set-up changes [refunds] [sources.s33].",
          },
          {
            q: "Does Punto Ticket take cards from abroad?",
            a: "Its Creamfields page, read 24 October 2026, does not say [scout.not_found.8]. The 20% price is for Banco de Chile cardholders only [bank_offer.conditions].",
          },
          {
            q: "Is the service charge included in the prices?",
            a: "{{until prices}}No. The seller adds 12.5% to the prices on its tables: \"PRECIOS NO INCLUYEN CARGO POR SERVICIO DEL 12,5%\" [tickets.service_charge] [sources.s1].{{/until}}",
          },
          {
            q: "What is The Village at Creamfields Chile?",
            a: "A ticket that adds to General a separate entrance, the PIT in front of the Main Stage, toilet trailers and a cocktail area by ÑAM, as the seller lists it [tickets.includes.village] [sources.s1]. Sky Lounge and Diamond Lounge both include The Village [tickets.includes.sky_lounge] [tickets.includes.diamond_lounge].",
          },
          {
            q: "What is the Banco de Chile presale?",
            a: "{{until sale}}A 20% discount on the ticket for Banco de Chile and Banco Edwards cardholders, at most four tickets each, through the bank's payment button on puntoticket.com [bank_offer.conditions]. The May presale ran from 6 to 8 May 2026. The bank's day-ticket sale opened on 28 August 2026, and the seller gives it no end date [bank_offer.presale_may] [bank_offer.day].{{/until}}",
          },
        ],
        sourcesHeading: "Sources",
        sourcesNote: "Read on 24 October 2026 unless another date is given.",
        sources: "- [Punto Ticket, Creamfields Chile 2026 page: the ticket kinds, what each includes, Banco de Chile, entry conditions](/go/creamfields-chile-tickets/) [sources.s1]\n- {{until prices}}The twelve price tables, pictures on the same page [sources.s20]{{/until}}\n- Reserve-plan terms, [Weekend Ticket](/go/creamfields-chile-reserva-weekend/) and [Day Ticket](/go/creamfields-chile-reserva-day/), the seller's PDFs in Spanish, read 22 October 2026 [sources.s5] [sources.s6]\n- Punto Ticket help centre, \"¿Puedo devolver, cancelar o cambiar mi entrada?\" (7 August 2026) and \"¿Qué son las entradas nominativas?\" [sources.s33] [sources.s34]\n- Punto Ticket, \"Anuncio fecha venta de entradas\", the organiser's release on the seller's site, read 22 October 2026 [sources.s7]",
      },
      {
        slug: "creamfields-chile/en/lineup",
        createdAt: "2026-10-24T08:25:00+04:00",
        updatedAt: "2026-10-24T08:25:00+04:00",
        kind: "lineup",
        label: "Line-up",
        crumb: "Line-up",
        linkTitle: "Creamfields Chile 2026 line-up: every stage and every name, Saturday and Sunday",
        title: "Creamfields Chile 2026: line-up by day — festival guide",
        description: "Creamfields Chile 2026 line-up: Hardwell and Boris Brejcha on Saturday, Calvin Harris, Charlotte de Witte, Fisher and Hugel on Sunday. Festival guide.",
        h1: "Creamfields Chile 2026 line-up by day",
        lede: "Creamfields Chile 2026 has six stages on each of its two days, Saturday 14 and Sunday 15 November 2026 [lineup.by_day] [editions_v2.items.0.dates]. Hardwell and Boris Brejcha play Saturday's Main Stage. Calvin Harris, Charlotte de Witte, Fisher and Hugel play Sunday's [lineup.by_day.0.stages.0.acts] [lineup.by_day.1.stages.0.acts]. Punto Ticket, the official seller, publishes the bill as one picture, by day and by stage, with no times. Here it is as text, read 24 October 2026 [lineup.by_day_source] [sources.s20] [lineup.readOn]. The line-up came out on Friday 7 August 2026, according to Meganoticias and 24horas.cl [editions_v2.items.0.in_press.2].",
        sections: [
          {
            id: "saturday",
            heading: "Saturday 14 November: six stages",
            body: "Hardwell and Boris Brejcha play Saturday's Main Stage, and Don Diablo and Jonas Blue the A Stage. Alternative has Warface, Brennan Heart and Virtual Riot. HE.SHE.THEY has AZYR, Charlie Sparks and Clara Cuvé [lineup.by_day.0.stages]. The names run in the order of the seller's picture, which gives neither times nor a running order [lineup.by_day_source] [schedule_v2.set_times].\n\n- Main Stage: Hardwell, Boris Brejcha, Artist TBC, Morten, LP Giobbi, Aerobica, Carla Valenti [lineup.by_day.0.stages.0.acts]\n- A Stage: Don Diablo, Jonas Blue, Two Friends, MATTN, Bruno Martini, Groovearth, Alexander Robledo, Javica [lineup.by_day.0.stages.1.acts]\n- Alternative: Warface, Brennan Heart, The Straikerz, Mutilator, Bass Modulators, Virtual Riot, STMZ, Rebelnoise, Jokerz [lineup.by_day.0.stages.2.acts]\n- HE.SHE.THEY: AZYR, Cristobal Pesce, Charlie Sparks, Clara Cuvé, Yanamaste, EM11, Superqueer B2B Giullian [lineup.by_day.0.stages.3.acts]\n- Radio Carolina: Gonzalo Vallejo B2B Natalia Pastor, Saulo, Nico Ferrada, Bruno Bona, Turbangirll, Gaby Yavar, Arayko, Osvaldo Solorza [lineup.by_day.0.stages.4.acts]\n- Grieta x Panal Records: Potenciómetro, F600, Fantasna, Bele Cox, Nara Back [lineup.by_day.0.stages.5.acts]\n\n\"Artist TBC\" is the seller's own entry on the Main Stage. On 24 October 2026 no name had replaced it [not_found.2] [lineup.readOn].",
          },
          {
            id: "sunday",
            heading: "Sunday 15 November: six stages",
            body: "Calvin Harris, Charlotte de Witte, Fisher and Hugel play Sunday's Main Stage. Morten is back, this time on the A Stage with Loud Luxury and Bassjackers [lineup.by_day.1.stages.0.acts] [lineup.by_day.1.stages.1.acts]. Two stages appear only on Sunday. Cream has Faithless Sound System, The Blessed Madonna and Kölsch. Feral has Enrico Sangiuliano, Âme Live and Anfisa Letyago [lineup.by_day.1.stages.2.acts] [lineup.by_day.1.stages.3.acts]. A stage called Cream, at a festival that began as a Liverpool night of that name, seems only right [brand_origin_v2].\n\n- Main Stage: Calvin Harris, Charlotte de Witte, Fisher, Hugel, Innellea, Miss Javi, O-Sessions [lineup.by_day.1.stages.0.acts]\n- A Stage: Morten, Loud Luxury, Bassjackers, Jaden Bojsen, Aaron Hibell, Colayuta, Ania [lineup.by_day.1.stages.1.acts]\n- Cream: Faithless Sound System, The Blessed Madonna, Kölsch, Nic Fanciulli, Sosa, Camilo Gil, Gianni B2B Francisco Martinez, Tweeter [lineup.by_day.1.stages.2.acts]\n- Feral: Yanamaste Live, Delia, Enrico Sangiuliano, Âme Live, Anfisa Letyago, NPLNSSS, Marcelo Antonio [lineup.by_day.1.stages.3.acts]\n- Radio Carolina: Juan Hinrichsen, Luka Kuhnow, Josefina, Fanvel, Alex Brugnara, Urubmara, Syntrovert, ICA DJ [lineup.by_day.1.stages.4.acts]\n- Grieta x Panal Records: Alisú, Dupøuy, Weisser, Elias Deepman, Fuzzler [lineup.by_day.1.stages.5.acts]\n\n{{until prices}}If Sunday is your day, mind the tickets. On 24 October 2026 the seller had crossed out every Sunday day ticket except Diamond Lounge. The Weekend Ticket covers Sunday too, and [the tickets page](/creamfields-chile/en/tickets/) has every table [prices_v2.tables.2.note] [prices_v2.tables.5] [prices_v2.tables.8] [prices_v2.tables.11] [tickets.formats].{{/until}}",
          },
          {
            id: "set-times",
            heading: "Set times and gates",
            body: "On 24 October 2026 the organiser had published the day and stage of every act, but no set times and no time for the gates to open [schedule_v2.set_times] [schedule_v2.doors] [schedule_v2.readOn]. Last year the line-up by day came out on 4 August 2025, according to Meganoticias [editions_v2.items.1.day_split_in_press]. {{until sale}}What is settled is which ticket covers which day. A Weekend Ticket covers both days, and a day ticket only the day it names, so the lists above tell you which day to buy for an act [tickets.formats].{{/until}} The dates, the venue and how to get there are in [the main guide](/creamfields-chile/en/).",
          },
          {
            id: "stages",
            heading: "The stages",
            body: "Four stages appear on both days: Main Stage, A Stage, Radio Carolina and Grieta x Panal Records. Saturday adds Alternative and HE.SHE.THEY, and Sunday adds Cream and Feral [lineup.by_day.0.stages] [lineup.by_day.1.stages]. The seller's page names the Main Stage in its text [lineup.stages.0]. The Village's PIT is in front of it, the Sky Lounge platform looks onto it, and Diamond Lounge includes a visit to its backstage [tickets.includes.village] [tickets.includes.sky_lounge] [tickets.includes.diamond_lounge]. For 2026, Punto Ticket's news item \"Creamfields Chile crece\" announces a new 5,000 m² zone at the Club Hípico, holding one of the main stages [lineup.stages.1] [labels_v2.s15_headline] [sources.s15]. It \"incluirá un anfiteatro con capacidad para 3.000 personas sentadas y 5.000 de pie\", an amphitheatre for 3,000 seated and 5,000 standing [labels_v2.s15_quote]. Meganoticias and 24horas.cl count 85 artists, 39 international and 46 Chilean, and Chile Travel also gives 85 [lineup_size_v2] [chile_travel_en].",
          },
        ],
        faqHeading: "Questions about the line-up",
        faq: [
          {
            q: "What is the Creamfields Chile 2026 line-up by day?",
            a: "On Saturday 14 November the Main Stage has Hardwell, Boris Brejcha, Morten, LP Giobbi, Aerobica and Carla Valenti, with one slot the seller lists as \"Artist TBC\" [lineup.by_day.0.stages.0.acts]. On Sunday 15 November it has Calvin Harris, Charlotte de Witte, Fisher, Hugel, Innellea, Miss Javi and O-Sessions [lineup.by_day.1.stages.0.acts]. All six stages of each day are above, from the seller's picture read 24 October 2026 [sources.s20] [lineup.readOn].",
          },
          {
            q: "What are the set times for Creamfields Chile 2026?",
            a: "On 24 October 2026 none were published. The organiser has given the day and stage of every act, but not the time of each set or of the gates [schedule_v2.set_times] [schedule_v2.doors] [schedule_v2.readOn].",
          },
          {
            q: "Is Tiësto playing Creamfields Chile 2026?",
            a: "He is not on the line-up the seller publishes, read 24 October 2026 [lineup.by_day] [sources.s20] [lineup.readOn].",
          },
          {
            q: "How many artists are on the bill?",
            a: "85, of whom 39 are international and 46 Chilean, according to Meganoticias and 24horas.cl on 7 August 2026 [lineup_size_v2]. Chile Travel also gives 85, read 24 October 2026 [chile_travel_en] [sources.s35].",
          },
        ],
        sourcesHeading: "Sources",
        sourcesNote: "Read on 24 October 2026 unless another date is given.",
        sources: "- [Line-up by day and stage, a picture on Punto Ticket's page](/go/creamfields-chile-tickets/), with no set times on the page or in the picture [sources.s20] [schedule_v2]\n- Punto Ticket, Creamfields Chile 2026 page, which names the Main Stage in its text [sources.s1]\n- Punto Ticket, \"Creamfields Chile crece: Suma una nueva zona de 5.000 m² y estrena anfiteatro en Club Hípico\", read 22 October 2026 [sources.s15]\n- [Chile Travel (Sernatur), \"Two days of electronic music in Santiago\"](/go/creamfields-chile-chile-travel/) [sources.s35]\n- Creamfields, \"History\", at creamfields.com [sources.s28]\n- Press, cited in the text, each read 22 October 2026: Meganoticias and 24horas.cl, 7 August 2026 [sources.s12] [sources.s13]. Meganoticias, 4 August 2025 [sources.s23] [lineup_size_v2.readOn] [editions_v2.readOn]",
      },
    ],
  },
];
