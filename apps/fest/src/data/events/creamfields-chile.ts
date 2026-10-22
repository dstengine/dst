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
// No @dst/* import and nothing but erasable TypeScript: tools/lastmod.mjs
// loads this file through dated.ts with Node's type stripping.
import type { FestEvent, Guide } from "../types";
export const events: FestEvent[] = [
  {
    slug: "creamfields-chile",
    createdAt: "2026-10-22T17:00:00+04:00",
    updatedAt: "2026-10-22T18:20:00+04:00",
    name: "Creamfields Chile",
    edition: { start: "2026-11-14", end: "2026-11-15" },
    // These keys carry no readOn of their own; the scout's round 1 read them
    // on 21 October with the rest ("Every readOn below is 2026-10-21").
    readOverrides: {
      "event.organiser": "2026-10-21",
      "tickets.tiers": "2026-10-21",
      "tickets.formats": "2026-10-21",
      "tickets.service_charge": "2026-10-21",
      "tickets.includes.general": "2026-10-21",
      "tickets.includes.village": "2026-10-21",
      "tickets.includes.sky_lounge": "2026-10-21",
      "tickets.includes.diamond_lounge": "2026-10-21",
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
          readOn: "2026-10-21",
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
          note: "the seller page today says 2 instalments (session's pane read confirms); the April release and the Weekend T&C PDF (s5) said 3, due 1 Jun / 1 Jul / 1 Aug 2026 - history only, those dates are past; a separate Day Ticket PDF exists (s6, not read)",
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
          phase: "Venta 4 (EB 134.000, V2 144.000, V3 154.000 struck)",
          bank_price: 136000,
          bank_struck: true,
          source: "s20",
          readOn: "2026-10-21",
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
          phase: "Venta 4; V3 216.000 not struck; EB and V2 struck",
          bank_price: 200000,
          bank_struck: true,
          source: "s20",
          readOn: "2026-10-21",
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
          phase: "Venta 4; V2 500.000 and V3 550.000 not struck; EB struck",
          bank_price: 480000,
          bank_struck: true,
          source: "s20",
          readOn: "2026-10-21",
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
        readOn: "2026-10-21",
      },
      reduced_mobility: {
        text: "Ticket movilidad reducida: solo para personas con credencial de discapacidad; se pedirá para poder acceder al evento",
        applies_to: "General tables only",
        source: "s20",
        readOn: "2026-10-21",
      },
      entry: {
        chileans: "cédula de identidad o pasaporte chileno vigente",
        foreigners: "únicamente pasaporte extranjero vigente, en un punto de verificación exclusivo en el acceso",
        originals_only: true,
        source: "s1",
        readOn: "2026-10-21",
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
        readOn: "2026-10-22",
        stages: [
          "Main Stage (named on s1)",
          "a new 5,000 m² zone with an amphitheatre, 3,000 seated and 5,000 standing, holding one of the main stages (s15)",
        ],
        note: "line-up-x-dia.png unchanged: Last-Modified Thu, 27 Aug 2026 22:05:10 GMT, ETag c5839f9e7ca12311fcb168351046ce5a, 688454 bytes today; byte-identical to the 21 Oct file per the fact-checker. The copy's 'leído el 21 de octubre' on the line-up page becomes the 22nd; the 14-day limit moves to 5 Nov 2026",
      },
      schedule: {
        set_times: "not published as of 2026-10-21; the 'Horarios por día' page is the line-up by day and stage above, with an honest line that set times are not published",
        doors: "not published; the seller's JSON-LD startDate 2026-11-15T13:01:00 is a listing artefact, not a doors time",
        precedent: "in 2025 the day-by-day line-up came with the line-up announcement on 4 Aug 2025 (Meganoticias, media); set times were not found for 2025 either",
        readOn: "2026-10-21",
      },
      transport: [
        {
          how: "Airport (SCL) to the centre: Centropuerto bus to Metro República (L1), Intermodal Pajaritos or Terminal Sur; CLP 2.400 one way, CLP 4.100 return, every 15 minutes, every day",
          source: "s16",
          readOn: "2026-10-21",
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
      ],
      prices_v2: {
        readOn: "2026-10-22",
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
          day_tables: "sabado-ticketgeneral-v2.png (ptt018), domingo-general-v3.png (sm0194), sabado-village-v3.png (sm0194), domingo-village-v3.png (sm0194), sabado-skylonge-v1.png (sm0194), domingo-skylonge-v2.png (sm0194), sabado-diamond-v1.png (sm0194), domingo-diamond-v2.png (ptt018), under https://static.ptocdn.net/especiales/<folder>/img/",
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
                normal_s: "o",
                bank: 136000,
                bank_s: "s",
              },
            ],
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
                normal_s: "o",
                bank: 172800,
                bank_s: "s",
              },
              {
                phase: "Venta 4",
                normal: 250000,
                normal_s: "o",
                bank: 200000,
                bank_s: "s",
              },
            ],
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
                normal_s: "o",
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
        readOn: "2026-10-22",
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
      },
      reserve_plan_v2: {
        readOn: "2026-10-22",
        seller_page: {
          text: "ABONA $40.000 y paga el resto en 2 cuotas sin interés con cualquier medio de pago",
          applies_to: "General, The Village, Sky Lounge & Diamond Lounge",
          not_combinable: "No acumulable con dcto. Banco de Chile",
          links: "the plan box links s6 ('Revisa términos y condiciones aquí'); s5 is linked separately as 'Revisa términos y condiciones Weekend Ticket aquí'",
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
        readOn: "2026-10-22",
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
        readOn: "2026-10-22",
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
        readOn: "2026-10-22",
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
        readOn: "2026-10-22",
        set_times: "none on s1 or the line-up image today (fact-checker re-read)",
        doors: "none",
        precedent_2025: "the line-up by day was published on 4 Aug 2025 (s23); the sheet says nothing about 2025 set times",
        replaces: "`schedule.precedent` in full (S6)",
      },
    },
    go: {
      tickets: {
        url: "https://www.puntoticket.com/creamfields-2026",
        source: "s1",
        kind: "seller",
        title: "Creamfields Chile 2026 en Punto Ticket",
      },
      venue: {
        url: "https://www.clubhipico.cl/contacto/",
        source: "s3",
        kind: "venue",
        title: "Dirección, teléfono y mapa del Club Hípico de Santiago",
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
      },
      instagram: {
        url: "https://www.instagram.com/creamfields_cl",
        source: "s19",
        kind: "organiser",
        title: "Cuenta de Instagram de Creamfields Chile, con los anuncios de la organización",
      },
      "reserva-weekend": {
        url: "https://static-puntoticket.s3.amazonaws.com/especiales/sm0194_creamfields-2026/CREAMFIELDS%202026%20-%20T%C3%89RMINOS%20Y%20CONDICIONES%20SISTEMA%20DE%20RESERVA%20Y%20ABONOS.pdf",
        source: "s5",
        kind: "seller",
        // The seller's own file on its own host, linked from its page (s1's
        // "términos y condiciones" box): a seller link, not a Drive document.
        title: "PDF de Punto Ticket: Sistema de Reserva y Abonos, Weekend Ticket",
      },
      "reserva-day": {
        url: "https://static-puntoticket.s3.amazonaws.com/especiales/sm0194_creamfields-2026/CREAMFIELDS%202026%20-%20TE%CC%81RMINOS%20Y%20CONDICIONES%20SISTEMA%20DE%20RESERVA%20Y%20ABONOS%20DAY%20TICKET.pdf",
        source: "s6",
        kind: "seller",
        title: "PDF de Punto Ticket: Sistema de Reserva y Abonos, Day Ticket",
      },
    },
  },
];

export const guides: Guide[] = [
  {
    slug: "es-CL",
    createdAt: "2026-10-22T17:00:00+04:00",
    updatedAt: "2026-10-22T17:00:00+04:00",
    event: "creamfields-chile",
    lang: "es-CL",
    dir: "ltr",
    path: "/creamfields-chile/",
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
        updatedAt: "2026-10-22T18:20:00+04:00",
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
            body: "Hay cuatro tipos de ticket, General, The Village, Sky Lounge y Diamond Lounge [tickets.tiers], y cada uno en tres formatos: Weekend Ticket para los dos días, Day Ticket sábado y Day Ticket domingo [tickets.formats]. {{until prices}}Los precios de las tablas de Punto Ticket no incluyen el cargo por servicio del 12,5% [tickets.service_charge]. Cada tabla tiene cuatro fases y dos columnas: el precio normal y el precio con 20% de descuento para clientes de Banco de Chile [prices_v2.note]. El vendedor ofrece además un Plan de reserva, en sus palabras: \"abona $40.000 y paga el resto en 2 cuotas sin interés con cualquier medio de pago\" [reserve_plan_v2.seller_page.text]. Las doce tablas, tal como las publica el vendedor, lo que incluye cada ticket y las reglas de ingreso están en la página de entradas. → /creamfields-chile/entradas/ {{/until}}",
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
            a: "En el Club Hípico de Santiago, Av. Blanco Encalada 2540, Santiago Centro, el sábado 14 y el domingo 15 de noviembre de 2026 [editions_v2.items.0.dates] [venue.address]. Lo dice la página oficial de venta en Punto Ticket, leída el 22 de octubre de 2026; la dirección es la del club [sources.s1] [sources.s3].",
          },
          {
            q: "¿Cuánto cuestan las entradas para Creamfields Chile en 2026?",
            a: "{{until prices}}Depende del tipo y del formato. En las doce tablas de Punto Ticket, leídas el 22 de octubre de 2026, la cifra no tachada más baja en la columna de precio normal es $98.000 (Day Ticket sábado General, Venta 2) y la más alta, $850.000 (Weekend Ticket Diamond Lounge, Venta 4), sin el cargo por servicio del 12,5% [prices_v2.lowest_unstruck_normal] [prices_v2.highest_unstruck_normal] [tickets.service_charge]. La tabla no indica cuál fase está abierta: vale el precio que Punto Ticket muestra al comprar [prices_v2.note]. Las doce tablas están en la página de entradas. → /creamfields-chile/entradas/ {{/until}}",
          },
          {
            q: "¿Qué artistas se presentarán en Creamfields Chile 2026?",
            a: "Calvin Harris, Charlotte de Witte, Fisher y Hugel en el Main Stage del domingo 15; Hardwell y Boris Brejcha en el del sábado 14 [lineup.by_day.1.stages.0.acts] [lineup.by_day.0.stages.0.acts]. También Don Diablo, Jonas Blue, The Blessed Madonna, Kölsch, Faithless Sound System, Enrico Sangiuliano y Âme Live, entre otros, según el line-up por día de Punto Ticket, leído el 22 de octubre de 2026 [lineup.by_day.0.stages.1.acts] [lineup.by_day.1.stages.2.acts] [lineup.by_day.1.stages.3.acts]. La lista completa, escenario por escenario, está en la página del line-up. → /creamfields-chile/line-up/",
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
        sources: "- [Punto Ticket, página oficial de Creamfields Chile 2026 (creamfields.cl redirige aquí)](/go/creamfields-chile-tickets/), leída el 22 de octubre de 2026 [sources.s1]\n- Line-up por día, imagen en la página de Punto Ticket, leída el 22 de octubre de 2026{{until prices}}; tablas de precios, leídas el 22 de octubre de 2026{{/until}} [sources.s20]\n- Punto Ticket, \"Creamfields Chile 2026: ¡Prepárense para la celebración más grande de la música electrónica!\", comunicado de la organización, leído el 22 de octubre de 2026 [sources.s7]\n- Punto Ticket, \"Creamfields Chile crece: Suma una nueva zona de 5.000 m² y estrena anfiteatro en Club Hípico\", leído el 22 de octubre de 2026 [sources.s15] [labels_v2.s15_headline]\n- [Club Hípico de Santiago, contacto](/go/creamfields-chile-venue/), leído el 22 de octubre de 2026 [sources.s3]\n- Prensa, citada en el texto: Radio Agricultura, 23 de mayo de 2025 y 17 de marzo de 2026 [sources.s21] [sources.s9]; La Tercera Culto, 26 de mayo de 2025 y 28 de abril de 2026 [sources.s8] [sources.s18]; CNN Chile, \"Vuelve Creamfields Chile: Cuándo es la edición 2026 en Santiago y cómo inscribirse para la preventa\" [sources.s10] [labels_v2.s10_headline]; Meganoticias y 24horas.cl, 7 de agosto de 2026 [sources.s12] [sources.s13]\n- [Creamfields Chile en Instagram, canal de la organización](/go/creamfields-chile-instagram/) [sources.s19]",
        anchors: [
          { target: "/creamfields-chile/entradas/", text: "página de entradas" },
          { target: "/creamfields-chile/line-up/", text: "página del line-up" },
        ],
      },
      {
        slug: "creamfields-chile/entradas",
        createdAt: "2026-10-22T17:00:00+04:00",
        updatedAt: "2026-10-22T17:00:00+04:00",
        kind: "tickets",
        label: "Entradas",
        title: "Entradas Creamfields Chile 2026: precios — guía del festival",
        description: "Entradas de Creamfields Chile 2026 en Punto Ticket: General, The Village, Sky Lounge y Diamond Lounge, las cuatro fases de precio en texto. Guía del festival.",
        h1: "Entradas Creamfields Chile 2026",
        lede: "{{until sale}}Las entradas de Creamfields Chile 2026 se venden en [Punto Ticket, la ticketera oficial](/go/creamfields-chile-tickets/): creamfields.cl redirige a su página [sellers_v2.items.0] [sellers.0.kind].{{/until}} Hay cuatro tipos, General, The Village, Sky Lounge y Diamond Lounge, y cada uno como Weekend Ticket para los dos días o como Day Ticket para el sábado 14 o el domingo 15 de noviembre de 2026 [tickets.tiers] [tickets.formats] [editions_v2.items.0.dates]. {{until prices}}El vendedor publica sus precios en doce imágenes; aquí están las doce tablas en texto, leídas el 22 de octubre de 2026, con cada fase tachada marcada como tachada [prices_v2].{{/until}} Quién toca cada día está en la página del line-up; → /creamfields-chile/line-up/ fechas, lugar y el resto de la guía, en la página de Creamfields Chile 2026. → /creamfields-chile/",
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
            body: "{{until prices}}Cada tabla de Punto Ticket tiene cuatro fases en el orden del vendedor, Early Bird, Venta 2, Venta 3 y Venta 4, y dos columnas: el precio normal y el precio con 20% de descuento, que es solo para clientes de Banco de Chile y se aplica sobre la entrada, no sobre el cargo por servicio [prices_v2.note] [bank_offer.conditions]. El vendedor tacha las fases cerradas; la tabla no indica cuál fase está abierta; vale el precio que Punto Ticket muestra al comprar [prices_v2.note]. Precios en pesos chilenos (CLP), sin el cargo por servicio del 12,5% [tickets.service_charge], leídos el 22 de octubre de 2026 [prices_v2.readOn].\n\n**Ticket General**\n\nWeekend Ticket General [prices_v2.tables.0]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $128.000 (tachado) | $102.400 (tachado) |\n| Venta 2 | $138.000 (tachado) | $110.400 (tachado) |\n| Venta 3 | $146.000 (tachado) | $116.800 (tachado) |\n| Venta 4 | $160.000 | $128.000 (tachado) |\n\nDay Ticket sábado General [prices_v2.tables.1]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $92.000 (tachado) | $73.600 (tachado) |\n| Venta 2 | $98.000 | $78.400 (tachado) |\n| Venta 3 | $106.000 | $84.800 (tachado) |\n| Venta 4 | $120.000 | $96.000 |\n\nDay Ticket domingo General [prices_v2.tables.2]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $92.000 (tachado) | $73.600 (tachado) |\n| Venta 2 | $98.000 (tachado) | $78.400 (tachado) |\n| Venta 3 | $106.000 (tachado) | $84.800 (tachado) |\n| Venta 4 | $120.000 (tachado) | $96.000 (tachado) |\n\nDay Ticket domingo General: la tabla del vendedor muestra las ocho celdas tachadas [prices_v2.tables.2.note].\n\n**Ticket The Village**\n\nWeekend Ticket The Village [prices_v2.tables.3]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $206.000 (tachado) | $164.800 (tachado) |\n| Venta 2 | $216.000 (tachado) | $172.800 (tachado) |\n| Venta 3 | $226.000 (tachado) | $180.800 (tachado) |\n| Venta 4 | $240.000 | $192.000 (tachado) |\n\nDay Ticket sábado The Village [prices_v2.tables.4]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $134.000 (tachado) | $107.200 (tachado) |\n| Venta 2 | $144.000 | $115.200 (tachado) |\n| Venta 3 | $154.000 | $123.200 (tachado) |\n| Venta 4 | $170.000 | $136.000 |\n\nDay Ticket domingo The Village [prices_v2.tables.5]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $134.000 (tachado) | $107.200 (tachado) |\n| Venta 2 | $144.000 (tachado) | $115.200 (tachado) |\n| Venta 3 | $154.000 (tachado) | $123.200 (tachado) |\n| Venta 4 | $170.000 | $136.000 (tachado) |\n\n**Ticket Sky Lounge**\n\nWeekend Ticket Sky Lounge [prices_v2.tables.6]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $276.000 (tachado) | $220.800 (tachado) |\n| Venta 2 | $286.000 (tachado) | $228.800 (tachado) |\n| Venta 3 | $296.000 (tachado) | $236.800 (tachado) |\n| Venta 4 | $320.000 | $256.000 (tachado) |\n\nDay Ticket sábado Sky Lounge [prices_v2.tables.7]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $196.000 | $156.800 (tachado) |\n| Venta 2 | $206.000 | $164.800 (tachado) |\n| Venta 3 | $216.000 | $172.800 |\n| Venta 4 | $250.000 | $200.000 |\n\nDay Ticket domingo Sky Lounge [prices_v2.tables.8]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $196.000 (tachado) | $156.800 (tachado) |\n| Venta 2 | $206.000 (tachado) | $164.800 (tachado) |\n| Venta 3 | $216.000 | $172.800 (tachado) |\n| Venta 4 | $250.000 | $200.000 (tachado) |\n\n**Ticket Diamond Lounge**\n\nWeekend Ticket Diamond Lounge [prices_v2.tables.9]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $700.000 (tachado) | $560.000 (tachado) |\n| Venta 2 | $750.000 (tachado) | $600.000 (tachado) |\n| Venta 3 | $800.000 | $640.000 (tachado) |\n| Venta 4 | $850.000 | $680.000 (tachado) |\n\nDay Ticket sábado Diamond Lounge [prices_v2.tables.10]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $450.000 | $360.000 (tachado) |\n| Venta 2 | $500.000 | $400.000 (tachado) |\n| Venta 3 | $550.000 | $440.000 |\n| Venta 4 | $600.000 | $480.000 |\n\nDay Ticket domingo Diamond Lounge [prices_v2.tables.11]\n\n| Fase | Precio normal | Con 20% dcto Banco de Chile |\n|---|---|---|\n| Early Bird | $450.000 (tachado) | $360.000 (tachado) |\n| Venta 2 | $500.000 | $400.000 (tachado) |\n| Venta 3 | $550.000 | $440.000 (tachado) |\n| Venta 4 | $600.000 | $480.000 (tachado) |\n\nEl ticket de movilidad reducida existe solo en las tablas General y es solo para personas con credencial de discapacidad, que se pedirá para acceder al evento [reduced_mobility.text] [reduced_mobility.applies_to].{{/until}}",
          },
          {
            id: "banco-de-chile",
            heading: "Banco de Chile: el 20% de descuento del vendedor",
            body: "Punto Ticket publica para clientes de Banco de Chile un precio con 20% de descuento sobre la entrada, no sobre el cargo por servicio, con un máximo de 4 entradas por cliente, que no se combina con el Plan de reserva [bank_offer.conditions] [reserve_plan_v2.seller_page.not_combinable]. Es para titulares de tarjetas de crédito o débito de Banco de Chile, Banco Edwards incluido, comprando en puntoticket.com a través del botón de pago del banco [bank_offer.conditions]. La preventa Banco de Chile fue del 6 de mayo de 2026 a las 12:00 horas al 8 de mayo a las 11:30, con un tope de 5.000 entradas Weekend y 5.000 Day Tickets [bank_offer.presale_may] [bank_offer.seller_labels]; la venta Day Ticket Banco de Chile partió el 28 de agosto de 2026 a las 12:00 horas, con un tope de 2.500 de sábado y 2.500 de domingo, y el vendedor no informa su término [bank_offer.day] [bank_offer.seller_labels]. {{until prices}}Ese precio es la segunda columna de cada tabla de arriba, y donde el vendedor la tacha aparece tachada [prices_v2.tables].{{/until}}",
          },
          {
            id: "plan-de-reserva",
            heading: "Plan de reserva{{until prices}}: $40.000 de abono{{/until}}",
            body: "{{until prices}}El vendedor lo describe así: \"abona $40.000 y paga el resto en 2 cuotas sin interés con cualquier medio de pago\" [reserve_plan_v2.seller_page.text].{{/until}} Aplica a General, The Village, Sky Lounge y Diamond Lounge [reserve_plan_v2.seller_page.applies_to] y no se combina con el 20% de Banco de Chile [reserve_plan_v2.seller_page.not_combinable].\n\n{{until prices}}Los dos PDF de términos y condiciones no dicen lo mismo: el del Weekend Ticket habla de un abono inicial de $40.000 más tres cuotas iguales y el del Day Ticket, de dos [reserve_plan_v2.weekend_pdf.instalments] [reserve_plan_v2.day_pdf.instalments].{{/until}} Según los términos del vendedor, al comprador se le informa el plan de abonos, el monto de cada uno y sus fechas de vencimiento [reserve_plan_v2.informed], y el plan se calcula sobre el precio con el cargo por servicio incluido: a ese total se le descuenta el abono inicial y el resto se divide en cuotas iguales [reserve_plan_v2.weekend_pdf.computed_on] [reserve_plan_v2.day_pdf.computed_on].\n\n{{until prices}}Según los mismos términos, si una cuota no se paga a su vencimiento el pedido queda sin efecto, Punto Ticket retiene los $40.000 del abono inicial, las cuotas ya pagadas se convierten en una Giftcard StreetMachine, con validez de 12 meses, para una entrada de otro evento musical de Street Machine, hay 10 días de gracia si un cargo es rechazado y el comprador no puede dejar sin efecto la reserva por su cuenta [reserve_plan_v2.caution_clause_3].{{/until}} Los PDF están en el sitio del vendedor: [términos del Weekend Ticket](/go/creamfields-chile-reserva-weekend/) [sources.s5] y [términos del Day Ticket](/go/creamfields-chile-reserva-day/) [sources.s6].",
          },
          {
            id: "que-incluye",
            heading: "Qué incluye cada ticket",
            body: "Ticket General: acceso general al festival y a todos los escenarios, zonas gastronómicas y barras, puntos de hidratación gratuitos, activaciones y experiencias de marca, y acceso a lockers, que son pagados [tickets.includes.general].\n\nTicket The Village: todo lo del ticket General, más ingreso diferenciado, acceso exclusivo al PIT frente al Main Stage, baños tipo trailer, zona coctelera y gastronómica by ÑAM, zonas de descanso y sombra, photo opportunities y experiencias, y lockers pagados [tickets.includes.village] [includes_v2.village_add].\n\nTicket Sky Lounge: todo lo de The Village, más una estructura en altura con sombra dentro de The Village y vista al Main Stage, barra exclusiva con servicio de garzones, cóctel de bienvenida con el vaso oficial 2026 y una subida a La Gran Rueda por acceso fast track [tickets.includes.sky_lounge].\n\nTicket Diamond Lounge: un espacio exclusivo para 400 personas con acceso a The Village, un estacionamiento para el comprador, ingreso directo y exclusivo, estructura en altura con sombra propia, servicio de garzones, bar abierto de coctelería y tragos premium, un almuerzo o comida a elección, visita al backstage del Main Stage y una subida a la rueda por acceso fast track [tickets.includes.diamond_lounge] [includes_v2.diamond_fix]. Incluye además un kit con pulsera del festival, lanyard oficial con el line-up, jockey oficial edición 2026 y sorpresas: las compras hechas hasta el 25 de octubre de 2026 a las 23:59 lo reciben a domicilio; las posteriores lo retiran en el festival [tickets.includes.diamond_lounge] [includes_v2.diamond_fix].",
          },
          {
            id: "ingreso",
            heading: "Ingreso: edad y documentos",
            body: "El evento es para mayores de 18 años [age.text]. Quienes tienen cédula chilena entran con ella o con pasaporte chileno vigente [entry.chileans] [entry_v2.chileans_wording]; los extranjeros, únicamente con pasaporte extranjero vigente, en un punto de verificación exclusivo en el acceso [entry.foreigners]. Solo valen documentos originales [entry.originals_only]. El nombre en la entrada debe coincidir exactamente con el del documento [entry_v2.name_match]. El ticket de movilidad reducida es solo para personas con credencial de discapacidad, que se pedirá para acceder, y existe solo en General [reduced_mobility.text] [reduced_mobility.applies_to].",
          },
        ],
        faqHeading: "Preguntas frecuentes",
        faq: [
          {
            q: "¿Cómo funciona la preventa Banco de Chile para Creamfields?",
            a: "Punto Ticket publica un precio con 20% de descuento sobre la entrada, no sobre el cargo por servicio, para titulares de tarjetas de crédito o débito de Banco de Chile, hasta 4 entradas por cliente y no combinable con el Plan de reserva [bank_offer.conditions] [reserve_plan_v2.seller_page.not_combinable]. La preventa Banco de Chile fue del 6 al 8 de mayo de 2026; la venta Day Ticket Banco de Chile partió el 28 de agosto de 2026 y el vendedor no informa su término [bank_offer.presale_may] [bank_offer.day] [bank_offer.seller_labels]. {{until prices}}Ese precio es la segunda columna de cada tabla de arriba.{{/until}}",
          },
          {
            q: "¿Qué es el Plan de Reserva de Creamfields?",
            a: "{{until prices}}Un sistema de abono del vendedor: \"abona $40.000 y paga el resto en 2 cuotas sin interés con cualquier medio de pago\" [reserve_plan_v2.seller_page.text].{{/until}} Aplica a General, The Village, Sky Lounge y Diamond Lounge, no se combina con el 20% de Banco de Chile, y los términos completos están en los dos PDF del vendedor enlazados arriba [reserve_plan_v2.seller_page.applies_to] [reserve_plan_v2.seller_page.not_combinable] [sources.s5] [sources.s6].",
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
        sources: "- [Punto Ticket, página oficial de Creamfields Chile 2026, texto, condiciones de ingreso, Banco de Chile y Plan de reserva](/go/creamfields-chile-tickets/), leída el 22 de octubre de 2026 [sources.s1]\n- {{until prices}}Las doce tablas de precios, imágenes en la página de Punto Ticket, leídas el 22 de octubre de 2026 [sources.s20]{{/until}}\n- Términos y condiciones del Sistema de Reserva y Abonos, [Weekend Ticket](/go/creamfields-chile-reserva-weekend/) y [Day Ticket](/go/creamfields-chile-reserva-day/), PDF del vendedor, leídos el 22 de octubre de 2026 [sources.s5] [sources.s6]\n- Punto Ticket, \"Anuncio fecha venta de entradas\", comunicado de la organización, leído el 22 de octubre de 2026 [sources.s7]",
        anchors: [
          { target: "/creamfields-chile/line-up/", text: "página del line-up" },
          { target: "/creamfields-chile/", text: "página de Creamfields Chile 2026" },
        ],
      },
      {
        slug: "creamfields-chile/line-up",
        createdAt: "2026-10-22T17:00:00+04:00",
        updatedAt: "2026-10-22T18:20:00+04:00",
        kind: "lineup",
        label: "Line-up",
        title: "Creamfields Chile 2026: line-up por día — guía del festival",
        description: "Line-up de Creamfields Chile 2026 por día y escenario: Calvin Harris, Hardwell, Charlotte de Witte, Fisher y Hugel en el Main Stage. Guía del festival.",
        h1: "Line-up de Creamfields Chile 2026 por día",
        lede: "El line-up de Creamfields Chile 2026 llegó el viernes 7 de agosto de 2026, según Meganoticias y 24horas.cl [editions_v2.items.0.in_press.2], y Punto Ticket, la ticketera oficial, lo publica por día y por escenario en una sola imagen; aquí está en texto, leído el 22 de octubre de 2026 [lineup.by_day_source] [sources.s20]. El sábado 14 de noviembre en el Main Stage tocan Hardwell y Boris Brejcha; el domingo 15, Calvin Harris, Charlotte de Witte, Fisher y Hugel [lineup.by_day.0.stages.0.acts] [lineup.by_day.1.stages.0.acts]. Son seis escenarios cada día [lineup.by_day]. Los horarios por artista no están publicados [schedule_v2.set_times].",
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
            body: "Al 22 de octubre de 2026 la organización ha publicado el día y el escenario de cada artista, pero no la hora de cada set ni la hora de apertura de puertas [schedule_v2.set_times] [schedule_v2.doors]. En 2025 el line-up por día se publicó el 4 de agosto, según Meganoticias [editions_v2.items.1.day_split_in_press] [sources.s23]. {{until prices}}Lo que sí está decidido: el Weekend Ticket cubre los dos días, y el Day Ticket es solo para el sábado o solo para el domingo [tickets.formats]; si vas por un artista, su día está en las listas de arriba, y los precios del Day Ticket de ese día están en la página de entradas. → /creamfields-chile/entradas/ {{/until}}Fechas y lugar están en la página de Creamfields Chile 2026. → /creamfields-chile/",
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
            a: "El sábado 14 de noviembre, en el Main Stage, Hardwell, Boris Brejcha, Morten, LP Giobbi, Aerobica y Carla Valenti, más un cupo que el vendedor publica como \"Artist TBC\" [lineup.by_day.0.stages.0.acts]; el domingo 15, Calvin Harris, Charlotte de Witte, Fisher, Hugel, Innellea, Miss Javi y O-Sessions [lineup.by_day.1.stages.0.acts]. Los seis escenarios de cada día, con todos sus nombres, están arriba, según la imagen de Punto Ticket leída el 22 de octubre de 2026 [sources.s20].",
          },
          {
            q: "¿Cuál es el horario de Creamfields 2026?",
            a: "Al 22 de octubre de 2026 no hay horarios publicados: la organización ha dado el día y el escenario de cada artista, no la hora de cada set ni la apertura de puertas [schedule_v2.set_times] [schedule_v2.doors]. En 2025 el line-up por día salió el 4 de agosto, según Meganoticias [editions_v2.items.1.day_split_in_press].",
          },
        ],
        sourcesHeading: "Fuentes",
        sources: "- [Line-up por día y escenario, imagen en la página de Punto Ticket](/go/creamfields-chile-tickets/), leída el 22 de octubre de 2026; sin horarios en la página ni en la imagen al 22 de octubre de 2026 [sources.s20] [schedule_v2]\n- Punto Ticket, página oficial de Creamfields Chile 2026 (Main Stage nombrado en el texto), leída el 22 de octubre de 2026 [sources.s1]\n- Punto Ticket, \"Creamfields Chile crece: Suma una nueva zona de 5.000 m² y estrena anfiteatro en Club Hípico\", leído el 22 de octubre de 2026 [sources.s15]\n- Prensa, citada en el texto: Meganoticias y 24horas.cl, 7 de agosto de 2026 [sources.s12] [sources.s13]; Meganoticias, 4 de agosto de 2025 [sources.s23]",
        anchors: [
          { target: "/creamfields-chile/entradas/", text: "página de entradas" },
          { target: "/creamfields-chile/", text: "página de Creamfields Chile 2026" },
        ],
      },
    ],
  },
];
