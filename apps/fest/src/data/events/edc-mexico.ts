// EDC México: the event as the scout's sheet has it, and its guide.
//
// Generated once from the card (~/mind/ai/dubai/events/tasks/
// 2026-11-10-edc-mexico-es.md) and edited by hand from here on. The sheet is
// section 1's YAML, values verbatim with the scout's rounds 2 and 3 as the
// scout wrote them; the card's working notes (the segment, the SERP) are no
// page's facts and stay on the card. The copy is the writer's round 2 with
// round 3's changes, the fact-checker's round-3 condition on page 1 (the
// Excélsior line in Fuentes, [sources.s14] in FAQ 4 and 5) and the native
// reader's round-3 split of page 2's first sales sentence, [key] tags as
// written. The [SWAP] markers are gone and their words stay: the guide ships
// with the Wise Owl figures, dated and in the past tense, and a refresh
// after the Ticketmaster sale of 12-13 November 2026 (plan P0, approved at
// gate 3). The build's placings, not the copy's words:
// - "Por qué existe esta guía en español" is the main page's first section,
//   as the writer placed it;
// - long paragraphs are cut at sentence ends: the main page's "Boletos" at
//   "de fase en fase" and "Citibanamex", "Dónde es" at "por Iztacalco" and
//   "no está publicado" (the fest director, as on Lollapalooza India);
// - each "Enlaces: A · B" is its section's links paragraph, each label its
//   /go/ hop;
// - each "… en la página de precios / de fechas / de lineup / la guía
//   principal." is an arrow, anchored on that phrase (anchors);
// - the {{until prices}} spans hold every Wise Owl figure and the sentences
//   that name it, from 22 December 2026 (expires.prices);
// - a subpage's crumb is its tab label.
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
    slug: "edc-mexico",
    createdAt: "2026-11-10T11:35:00+04:00",
    updatedAt: "2026-11-10T11:35:00+04:00",
    name: "EDC México",
    edition: { start: "2027-02-19", end: "2027-02-21" },
    // Keys the copy cites that hold no readOn of their own: the event line
    // and the notes-only rows of hours and prices, all read by the scout on
    // 10 November 2026 with the rest of section 1.
    readOverrides: {
      "event.organiser": "2026-11-10",
      "event.edition": "2026-11-10",
      "hours.3": "2026-11-10",
      "prices.4": "2026-11-10",
    },
    // The MusicEvent on the guide's main page (rules.ts). Doors on Friday at
    // 16:00 and the close at 02:00 on Monday 22 February, Mexico City time
    // (hours.0, hours.2, s10); the offset comes from the zone. The address is
    // the organiser's (venue.address, s6 and s10), cut into its parts without
    // a changed character. The organisers are the two event.organiser names,
    // the site as sameAs on Insomniac's. Two offers with no price: nothing
    // could be bought at Ticketmaster on 10 November (sales.4), and from 12
    // November the Wise Owl figure may be a closed phase's (the SEO lead,
    // gate 1 note 5). Ticketmaster from its general sale (sales.3, s11);
    // Front Gate with no validFrom, since no source dates its sale; no
    // priceValidUntil, since no source ends a sale; no SkyDeck, whose price
    // is on request. The performers are the three the press put at the
    // front (lineup.headliners_per_media), each in the organiser's own list
    // (the SEO lead, gate 3 note 3).
    markup: {
      startDate: "2027-02-19T16:00",
      endDate: "2027-02-22T02:00",
      timeZone: "America/Mexico_City",
      address: { streetAddress: "Av. Río Churubusco, Puerta 5, Ciudad Deportiva, Granjas México", addressLocality: "Iztacalco", addressRegion: "Ciudad de México", postalCode: "08400", addressCountry: "MX" },
      organizer: [{ name: "Insomniac Events", url: "https://mexico.edc.com/" }, { name: "OCESA" }],
      offers: [
        { seller: "Ticketmaster México", go: "ticketmaster", validFrom: "2026-11-13T14:00:00-06:00" },
        { seller: "Front Gate Tickets", go: "frontgate" },
      ],
      performers: ["lineup.headliners_per_media"],
    },
    sheet: {
      event: {
        name: "EDC México",
        slug: "edc-mexico",
        organiser: "Insomniac Events / OCESA",
        kind: "music festival",
        edition: "13ª edición (per Ticketmaster 'Acerca de')",
      },
      editions: [
        {
          year: 2027,
          start: "2027-02-19",
          end: "2027-02-21",
          status: "announced",
          venue: "v1",
          source: "s1",
          readOn: "2026-11-10",
          note: "three days, Fri–Sun; title of the organiser's home: 'EDC Mexico | 19-21 Febrero, 2027 | Mexico City'; Ticketmaster: 'Del 19 al 21 de febrero de 2027'",
        },
        {
          year: 2026,
          start: "2026-02-20",
          end: "2026-02-22",
          status: "past",
          venue: "v1",
          source: "s18",
          readOn: "2026-11-10",
          round2: "source changed from media (s15) to the organiser's photo page s18, linked from the home's 'Ediciones Pasadas': heading 'EDC Mexico 2026', date 'Feb 20, 2026', slug 2026-02-20-21-22; it names no venue; Ticketmaster calls 2026 'su edición más grande hasta la fecha'",
          round3: "venue claim re-sourced from s10 to s1 (fact-check round 2, note 1): s10 'Acerca de' says only 'Tras su edición más grande hasta la fecha, EDC México volverá a la CDMX en 2027', the city and not the venue. s1 re-read by curl 10 Nov 2026 06:38:58 GMT (server date header): <meta name=\"description\"> = og:description = twitter:description = '¡Electric Daisy Carnival regresa al Autódromo Hermanos Rodríguez con un horario extendido! Acompáñennos durante tres días con la mejor música electrónica, atracciones, artistas y arte. ¡Aquí todos son bienvenidos!'; the English variant on the same page reads 'Autódromo Hermanos Rodríguez with an expanded schedule!'. 'Regresa al Autódromo' is the organiser's own word that the festival returns to that venue, i.e. that earlier editions were held there; it does not name 2026 by year, so the writer prints 'el organizador dice que EDC regresa al Autódromo Hermanos Rodríguez' keyed to s1 and does not attribute the 2026 venue to Ticketmaster",
          venue_2026_source: "s1",
        },
      ],
      venue: {
        key: "v1",
        name: "Autódromo Hermanos Rodríguez",
        address: "Av. Río Churubusco, Puerta 5, Ciudad Deportiva, Granjas México, Iztacalco, 08400 Ciudad de México",
        address_source: ["s6", "s10"],
        address_ticketmaster: "Viaducto Piedad y Río Churubusco s/n, Cd. Deportiva, CDMX 08400",
        address_ticketmaster_source: "s11",
        lat: 19.4055237,
        lon: -99.0925662,
        coordinates_source: "s13",
        city: "Ciudad de México",
        country: "MX",
        timezone: "America/Mexico_City",
        utc_offset_feb_2027: "-06:00",
        readOn: "2026-11-10",
        note: "coordinates from the organiser's own Google Maps link (s13) resolved by curl; Ticketmaster prints GMT-6 for every time",
        round2: "source tags split per field: the organiser's address is on s6 and on s10 'Ubicación' ('Ave. Río Churubusco Puerta 5 Ciudad Deportiva, Granjas México, Iztacalco, 08400'); the Viaducto Piedad form is s11 'DETALLES DEL INMUEBLE' only; coordinates not re-resolved in round 2",
      },
      hours: [
        {
          day: "2027-02-19",
          doors: "16:00",
          close: "02:00 (20 Feb)",
          source: "s10",
          readOn: "2026-11-10",
        },
        {
          day: "2027-02-20",
          doors: "15:00",
          close: "02:00 (21 Feb)",
          source: "s10",
          readOn: "2026-11-10",
        },
        {
          day: "2027-02-21",
          doors: "15:00",
          close: "02:00 (22 Feb)",
          source: "s10",
          readOn: "2026-11-10",
        },
        {
          note: "organiser's 'Horas e Info' page has the heading 'Horario del Festival' with no times yet (s5); the hours above are the Ticketmaster artist-page FAQ '¿A qué hora terminará cada día del festival?'",
        },
      ],
      sellers: [
        {
          name: "Ticketmaster México",
          url: "https://www.ticketmaster.com.mx/edc-mexico-boletos/artist/1329224",
          official: true,
          market: "México y público general",
          source: "s2",
          readOn: "2026-11-10",
          note: "organiser: 'Compra únicamente a través de Ticketmaster y evita revendedores'",
        },
        {
          name: "Front Gate Tickets",
          url: "https://edcmexico.frontgatetickets.com/",
          official: true,
          market: "EE. UU. y Canadá",
          source: ["s2", "s12"],
          readOn: "2026-11-10",
          resale: "Front Gate's own resale for its orders: 'Want to sell your tickets?' → sign in → Order History → View Order Detail → 'Sell Tickets' button, '(only displayed if eligible to be resold)'; no third-party platform named",
          resale_source: "s12",
          round2: "resale row added from s12 (read 10 Nov 2026); s12 lists the three 2027 passes as 'Feb 19-21, Fri-Sun, Autódromo Hermanos Rodríguez', GA and GA+ 'All Ages', VIP 'Ages 18+ Only', no prices",
        },
        {
          name: "SkyDeck (formulario de consulta del organizador)",
          url: "https://mexico.edc.com/tickets/skydeck/",
          official: true,
          source: "s9",
          readOn: "2026-11-10",
          note: "tables with main-stage view; price on request only",
        },
      ],
      sales: [
        {
          phase: "Preventa Banamex (first)",
          start: "2026-09-15T14:00-06:00",
          source: ["s14", "s17"],
          readOn: "2026-11-10",
          kind_note: "media (Excélsior, 8 Sep 2026) corroborated by the organiser's Instagram snippet in SERP q3: '#PreventaBanamex: 15 de sept'",
        },
        {
          phase: "Venta general (first)",
          start: "2026-09-16T14:00-06:00",
          source: "s14",
          readOn: "2026-11-10",
          kind_note: "media only (Excélsior)",
        },
        {
          phase: "Preventa Banamex (after the line-up)",
          start: "2026-11-12T14:00-06:00",
          end: "2026-11-12T23:59-06:00",
          source: "s11",
          readOn: "2026-11-10",
          note: "Ticketmaster: 'Inicia la próxima venta jue 12 de nov, 2:00 p.m. GMT-6'; shown on all three Abonos (s10: 'PREVENTA: 12/11/26, 2:00 P.M.')",
        },
        {
          phase: "Venta General (after the line-up)",
          start: "2026-11-13T14:00-06:00",
          end: "2027-02-21T15:01-06:00",
          source: "s11",
          readOn: "2026-11-10",
        },
        {
          status_now: "no ticket purchasable on Ticketmaster on 10 Nov 2026 (countdown to 12 Nov); the organiser's page still shows Wise Owl prices and says 'Compra ahora y ahorra. Los precios suben por fases y los boletos se agotan.'",
          source: ["s2", "s11"],
          readOn: "2026-11-10",
        },
        {
          phase_history: "media only, for context, never as a printed price: 'Future Owl' from the Preventa Banamex of 25 Mar 2026 14:00 and venta general 26 Mar 2026 ($3,480 / $4,180 / $6,960 MXN, ADN40 s20); 'Early Owl' current on 14 Oct 2026 (MXN 3,680 / 4,480 / 7,360 before fees, Rio Times s21); 'Wise Owl' is the phase on the organiser's page on 10 Nov 2026 (s2). Neither the organiser nor Ticketmaster dates the Wise Owl phase; the September 15–16 sale (s14) is reported without a phase name.",
          source: ["s2", "s14", "s20", "s21"],
          readOn: "2026-11-10",
          round2: "row added; replaces the unsourced 'Wise Owl = September phase' in round-1 prose. Phase prices from media are NOT for the page.",
        },
      ],
      prices: [
        {
          label: "3 Días GA (Wise Owl)",
          amount: 4811,
          currency: "MXN",
          usd: 284,
          fees: "todo incluido",
          seller: "Ticketmaster México",
          source: "s2",
          readOn: "2026-11-10",
          expires: "2026-12-22",
        },
        {
          label: "3 Días GA + Comfort Pass (Wise Owl)",
          amount: 5832,
          currency: "MXN",
          usd: 344,
          fees: "todo incluido",
          seller: "Ticketmaster México",
          source: "s2",
          readOn: "2026-11-10",
          expires: "2026-12-22",
        },
        {
          label: "3 Días VIP Banamex Plus (Wise Owl)",
          amount: 10414,
          currency: "MXN",
          usd: 613,
          fees: "todo incluido",
          seller: "Ticketmaster México",
          source: "s2",
          readOn: "2026-11-10",
          expires: "2026-12-22",
          age: "18+",
        },
        {
          label: "SkyDeck",
          amount: null,
          note: "price on request via the organiser's form; 18+",
          source: "s9",
          readOn: "2026-11-10",
        },
        {
          note: "Ticketmaster lists three Abonos for 2027 (General, Comfort Pass, Banamex Plus) and no single-day ticket on 10 Nov; Front Gate lists the same three as '2027 EDC Mexico - 3-Day …' without prices (s12). Installments: 3, 6 or 9 meses with Citibanamex credit cards (s4). Next-phase prices unknown until 12 Nov 14:00.",
        },
      ],
      ticket_includes: [
        {
          ticket: "3 Días GA",
          text: "Tu boleto es tu pase para recorrer EDC libremente: color, música y magia en cada rincón.",
          source: "s2",
          readOn: "2026-11-10",
          round2: "added",
        },
        {
          ticket: "3 Días GA + Comfort Pass",
          text: "Acceso exprés exclusivo y baños premium con aire acondicionado. Todo lo de GA, con un nivel más.",
          items: [
            "Baños privados con aire acondicionado cerca de kineticFIELD y circuitGROUNDS",
            "Entrada exclusiva y rápida al festival",
          ],
          caveat: "**no tiene acceso al área Banamex PLUS",
          source: "s2",
          readOn: "2026-11-10",
          round2: "added; answers the PAA '¿Qué incluye el Comfort Pass de EDC?' from the organiser's own page; no viewing area is part of Comfort Pass",
        },
        {
          ticket: "3 Días VIP Banamex Plus",
          text: "Más que un festival. Con Banamex PLUS accedes a entrada exprés, amenidades exclusivas, opciones gourmet, plataformas VIP, actividades especiales y mucho más.",
          items: [
            "Entrada exprés exclusiva",
            "Tarima con vista preferencial en kineticFIELD",
            "Pit lateral en kineticFIELD, circuitGROUNDS y neonGARDEN",
            "Baños privados con A/C en kineticFIELD, circuitGROUNDS y neonGARDEN",
            "Zonas exclusivas para descansar y rehidratarte",
            "Oferta gastronómica exclusiva y cócteles temáticos de EDC* (*con costo adicional)",
            "Zonas de recarga Digicash presentado por Banamex",
            "Préstamo de baterías",
            "Wifi",
            "Guardarropa",
            "Estacionamiento preferencial (1 lugar por cada 4 personas con boleto Banamex Plus del mismo día)** (**sujeto a disponibilidad)",
            "Concierge VIP online antes, durante y después del festival",
            "EDC Unity Wall",
            "Beauty Bar y Barber Shop",
            "Photo Opportunity interactivo",
          ],
          age: "Debes tener 18 años o más para acceder a las zonas Banamex Plus. Se requiere ID oficial vigente.",
          source: "s2",
          readOn: "2026-11-10",
          round2: "added",
        },
        {
          ticket: "SkyDeck con Servicio de Mesa",
          text: "SkyDeck tiene mesas con vista directa al escenario principal y servicio privado para ti y tu crew.",
          source: ["s2", "s9"],
          readOn: "2026-11-10",
          round2: "added",
        },
      ],
      age: [
        {
          rule: "ticket required from age 3 (organiser: 'Se requiere boleto para todos los asistentes de 3 años en adelante'); under 3 free (organiser: 'Los niños menores de 3 años pueden asistir sin costo')",
          source: "s4",
          readOn: "2026-11-10",
          round2: "split by source",
        },
        {
          rule: "Ticketmaster event page: 'Límite de edad: Ingresan de 3 años en adelante' and 'Pagan boleto a partir de: 3 años en adelante'",
          source: "s11",
          readOn: "2026-11-10",
          round2: "added; Ticketmaster's wording admits from age 3 and says nothing about under-3s, so 'under 3 free' is the organiser's rule only",
        },
        {
          rule: "under 16 only with a legal guardian ('Podrás ingresar a EDC acompañado de tu tutor legal')",
          source: ["s4", "s10"],
          readOn: "2026-11-10",
        },
        {
          rule: "organiser recommends 16+ to attend without an adult",
          source: "s5",
          readOn: "2026-11-10",
        },
        {
          rule: "18+ for Banamex Plus / VIP zones and SkyDeck, official ID required; 18+ to buy and drink alcohol",
          source: ["s2", "s5", "s9"],
          readOn: "2026-11-10",
        },
      ],
      reentry: [
        {
          allowed: false,
          text: "No, si sales del recinto, ya no podrás ingresar nuevamente.",
          question: "¿Puedo reingresar al Autódromo?",
          source: "s10",
          readOn: "2026-11-10",
          round2: "split by source; this quote is Ticketmaster's only",
        },
        {
          allowed: false,
          text: "No, entradas y salidas no están autorizadas.",
          question: "¿Está permitida el reingreso?",
          source: "s4",
          readOn: "2026-11-10",
          round2: "added",
        },
        {
          allowed: false,
          text: "NO hay reingreso una vez que el boleto ha sido escaneado.",
          source: "s5",
          readOn: "2026-11-10",
          round2: "added",
        },
      ],
      lineup: {
        announcedOn: "2026-11-09",
        announcedOn_note: "organiser page undated; dated from the organiser's Instagram post ('¡Ya está aquí!', ~7 h before the read) and Récord/Sopitas (12–13 h before the read, 10 Nov ~00:00 CDMX)",
        source: "s3",
        readOn: "2026-11-10",
        headliners_per_media: ["Martin Garrix", "Tiësto", "Fatboy Slim"],
        headliners_per_media_source: ["s15", "s19", "s16"],
        headliners_per_media_round2: "sources given per article (10 Nov 2026): s15 Récord, headline 'EDC México 2027 revela cartel oficial: Martin Garrix, Tiësto y Fatboy Slim encabezan el festival' (URL from Google's result, slug timestamp 2026-11-09 18:09; body behind a Cloudflare challenge to WebFetch and the pane, headline verified in the SERP only); s19 Milenio, 9 Nov 2026 13:49, 'encabezado por Martin Garrix, Tiësto, Fatboy Slim, Dom Dolla y FISHER'; s16 Sopitas, 9 Nov 2026, names Tiësto and Fatboy Slim among the names that drew attention and Martin Garrix only in the full list. Other outlets add Dom Dolla, Fisher, Illenium. The organiser itself names no headliner.",
        acts: [
          "3BallMTY",
          "Aaron Hibell",
          "Adriatique",
          "Aerea",
          "Alarico b2b Yanamaste",
          "All Matter b2b Moisees",
          "Alpha 9",
          "Alyssa Jolee",
          "Apashe",
          "Bad Boombox b2b Mija",
          "Badwolf",
          "Ben Klock b2b SHDW",
          "Ben UFO b2b Four Tet",
          "Bipolar Sunshine",
          "Blond:ish",
          "Bolo",
          "Bontan b2b Yamagucci",
          "Brennan Heart",
          "BUNT.",
          "Cabizbajo",
          "Carlita",
          "Cassian",
          "Celice",
          "Chasewest",
          "Chloé Caillet b2b Job Jobse",
          "Cloonee",
          "Close Friends Only",
          "Colossio",
          "Coone",
          "D-Sturb",
          "Da Tweekaz",
          "Damian Lazarus",
          "Dash Berlin",
          "Davyboi b2b Mika Heggemann",
          "Dax J",
          "Deborah de Luca b2b Eli Brown",
          "Devault",
          "Discip",
          "DJ Harvey",
          "DJ Sash!",
          "Dom Dolla",
          "Dømina",
          "Don Diablo",
          "Dual Damage",
          "Dualité",
          "Dusky",
          "Easttown",
          "Elmefti",
          "Enemix",
          "Fatboy Slim",
          "Fatima Hajji",
          "Fisher",
          "Freebot",
          "Fuentes Prod",
          "Fumi",
          "Fux Beat",
          "Galantis",
          "Gregorio",
          "Gryffin b2b Odd Mob",
          "Gudfella",
          "Hannah Laing",
          "HOL!",
          "Holy Priest",
          "I Hate Models",
          "Illenium",
          "Jackie Hollander",
          "Jamback",
          "Jenna Shaw",
          "Jessica Audiffred",
          "JOA",
          "John Askew + Simon Patterson",
          "Kayzo",
          "Kettama",
          "Kloud",
          "Knolldoll",
          "Korolova",
          "Kuko b2b Onlynumbers",
          "La Bad Curly",
          "Labibe",
          "Laidback Luke",
          "Łaszewo",
          "Linska",
          "Lisa Korver b2b Supergloss",
          "Liu",
          "Loojan",
          "Los Dutis",
          "Lost Frequencies",
          "Lost Kings",
          "Luch",
          "Luciana",
          "Luciano",
          "Mandragora",
          "Marie Vaunt",
          "Mario Santander",
          "Marrøn",
          "Marsh",
          "Marsolo",
          "Martin Garrix",
          "Mary Droppinz",
          "The Masquerade",
          "Mella Dee",
          "Michael Bibi",
          "Miss K8",
          "Murderith",
          "Mystery Affair",
          "NGHTMRE",
          "Nico Moreno",
          "Novah",
          "NRG2000",
          "Olisso",
          "Omiki",
          "Omnom b2b Walker & Royce",
          "Omri.",
          "Øtta b2b SPFDJ",
          "Paul van Dyk presents The Essence of Acid",
          "Philou",
          "Quest",
          "Rafael",
          "Ranger Trucco",
          "Ray Volpe",
          "Rayburger",
          "Rebelion",
          "Richie Hawtin",
          "The Rocketman",
          "Rommii",
          "Sam Blacky",
          "Sasha & Digweed",
          "Secret Echoes (live)",
          "Sequence Six",
          "Silver Panda",
          "Slander",
          "Somewhen b2b Ueberrest",
          "Sub Zero Project",
          "Surf Mesa",
          "Svdden Death",
          "Tiësto",
          "Tripolism",
          "Überkikz",
          "Vintage Culture",
          "Volkoder",
          "VTSS",
          "WhoMadeWho",
          "Wooli",
          "YDG",
          "Yosoymatt",
          "Zack Fox",
          "Zombies in Miami",
        ],
        acts_note: "alphabetical as printed; no days, no stages, no set times on 10 Nov; the page closes 'and the most important headliner of all: you'. Ticketmaster: 'Más de 100 artistas de techno, house, psytrance, hardstyle, bass, EDM y ritmos latinos'.",
      },
      transport: [
        {
          how: "Metro Línea 9 (café, Pantitlán–Tacubaya): estaciones Velódromo, Ciudad Deportiva y Puebla",
          source: ["s7", "s10"],
          readOn: "2026-11-10",
        },
        {
          how: "Metrobús Línea 2 (morada, Tacubaya–Tepalcates): UPIICSA y El Rodeo (organiser); 'arribo Iztacalco' (Ticketmaster)",
          source: ["s7", "s10"],
          readOn: "2026-11-10",
        },
        {
          how: "Trolebús Línea 2: Ciudad Deportiva, Puerta 8, Puebla, Av. Río Churubusco",
          source: "s10",
          readOn: "2026-11-10",
        },
        {
          how: "Estacionamiento: entrada por la Puerta 15 del Autódromo (s8, s10); preferente en el estacionamiento del Estadio Harp Helú (s8 only); los del Palacio de los Deportes también abiertos al público (s10 only); 'funcionando desde las 07:00 am, los tres días del festival' (s10 only); 'Cualquier vehículo que permanezca en las zonas de estacionamiento entre las 4am y 8am será remolcado' (s8 and s10, same words)",
          source: ["s8", "s10"],
          readOn: "2026-11-10",
          round2: "source tags per clause; 'permanezca', not 'llegue'",
        },
        {
          how: "Taxis listed by the organiser: Taximex 9171-8888; Sitio Palacio de los Deportes 4000-8294; Radio Taxis Elite 5660-1122; Grupo Set 3874-6965",
          source: "s7",
          readOn: "2026-11-10",
        },
        {
          how: "Aeropuerto más cercano: AICM ('El Aeropuerto Internacional de la Ciudad de México es el más cercano al inmueble'); no route given",
          source: ["s4", "s7"],
          readOn: "2026-11-10",
        },
        {
          how: "Ticket 2 Ride, el programa oficial de shuttles de Insomniac ('tarifas especiales en paquetes de shuttle'); ocho Puntos de Encuentro: Mundo E (Antiguo Camino a Santa Mónica / Benito Juárez, entre Convento de Acolman y Periférico, frente a la funeraria Gayoso), Plaza Lindavista (Instituto Politécnico Nacional entre Montevideo y Cda. de Otavalo, junto a Sears), Galerías Coapa (Calz. de Tenorios entre Calz. del Hueso y Parma, frente a Sears), Perisur Zacatepetl (entre Periférico y Av. Centro Comercial, frente a Palacio de Hierro), Santa Fe (Vasco de Quiroga 3800, entre Mario Pani y Prolongación de la Reforma, frente a Palacio de Hierro), Interlomas (Paseo de la Herradura entre Parque de Cádiz y Blvd. Interlomas, frente a Mitsubishi), Parque de los Venados (Av. División del Norte y Dr. José María Vértiz, Sta. Cruz Atoyac, Benito Juárez, 03310), Condesa Parque España (Parque España, Condesa, Cuauhtémoc, 06140). No prices, no times, no dates, no purchase link on the page; title still 'Ticket 2 Ride – EDC Mexico 2026 ES'",
          source: "s22",
          readOn: "2026-11-10",
          round2: "rewritten: the page answers 200 (WebFetch and curl, 10 Nov 2026, before 06:35 GMT; the '~09:20 GMT' first written here was wrong); the round-1 404 was on a different URL from the menu",
          round3: "re-read by curl 10 Nov 2026 06:39:22 GMT (server date header): 200, title still 'Ticket 2 Ride – EDC Mexico 2026 ES', all eight meeting points present, still no prices, times or dates",
        },
        {
          how: "Will Call: 'Todas las órdenes internacionales se entregarán en Will Call, ubicada en la Explanada OCESA en puerta 6 dentro del Autódromo Hermanos Rodríguez, cerca de Metro Ciudad Deportiva'; tickets not received by festival week are also held there",
          source: "s4",
          readOn: "2026-11-10",
          round2: "quote completed (international orders, puerta 6)",
        },
      ],
      allowed_items_source: {
        source: "s10",
        readOn: "2026-11-10",
        note: "full lists '¿Con qué objetos puedo entrar?' / '¿Qué objetos están prohibidos?' on the Ticketmaster artist page; bags max 30×30 cm, empty hydration packs, totems ≤3 cm diameter; no re-entry, no outside food or drink, no vapes, no umbrellas, no professional cameras",
      },
      questions: [
        {
          q: "¿Cuándo es EDC México 2027?",
          seen: "people also ask (q6); autocomplete 'edc mexico 2027 fechas'",
          answer_from: ["s1", "s10"],
        },
        {
          q: "¿Dónde será EDC México 2027?",
          seen: "people also ask (q2)",
          answer_from: ["s6", "s10"],
        },
        {
          q: "¿Cuánto cuestan los boletos para EDC México 2027?",
          seen: "people also ask (q4); autocomplete 'edc mexico 2027 precios'",
          answer_from: ["s2", "s11"],
        },
        {
          q: "¿Cuándo salen los boletos de EDC México 2027?",
          seen: "autocomplete 'edc mexico 2027 cuando salen los boletos'; people also ask (q2, q3, q6 as '…del EDC 2026')",
          answer_from: ["s11", "s10"],
        },
        {
          q: "¿Cuándo es la preventa de EDC México 2027?",
          seen: "autocomplete 'edc mexico 2027 preventa'",
          answer_from: ["s11", "s14"],
        },
        {
          q: "¿Cuál es el lineup / cartel de EDC México 2027?",
          seen: "autocomplete 'edc mexico 2027 lineup', 'edc méxico 2027 cartelera', 'edc mexico 2027 cartel', 'edc mexico 2027 artistas'",
          answer_from: ["s3"],
        },
        {
          q: "¿Qué artistas van a estar en EDC México?",
          seen: "people also ask (q4, q5)",
          answer_from: ["s3"],
        },
        {
          q: "¿Cuáles son los horarios de EDC México?",
          seen: "people also ask (q5)",
          answer_from: ["s10"],
        },
        {
          q: "¿Qué incluye el Comfort Pass de EDC?",
          seen: "people also ask (q6)",
          answer_from: ["s2"],
          round2: "answer now in `ticket_includes` (organiser's own text)",
        },
        {
          q: "¿Qué es EDC México?",
          seen: "people also ask (q1 '¿Qué significa EDC en México?'); autocomplete 'edc mexico 2027 que es'",
          answer_from: ["s1", "s10"],
        },
        {
          q: "¿Puedo comprar boletos a meses sin intereses?",
          seen: "organiser FAQ (s4)",
          answer_from: ["s4"],
        },
        {
          q: "¿Los niños necesitan boleto para asistir? / ¿Qué pasa si soy menor de 16 años?",
          seen: "organiser FAQ (s4); Ticketmaster FAQ (s10)",
          answer_from: ["s4", "s10"],
        },
        {
          q: "¿Está permitido el reingreso?",
          seen: "organiser FAQ (s4); Ticketmaster FAQ (s10)",
          answer_from: ["s4", "s10"],
        },
        {
          q: "¿Con qué objetos puedo entrar y cuáles están prohibidos?",
          seen: "organiser FAQ (s4); Ticketmaster FAQ (s10)",
          answer_from: ["s10"],
        },
        {
          q: "¿Cómo llegar al Autódromo Hermanos Rodríguez en Metro?",
          seen: "Ticketmaster 'Opciones para llegar' (s10); organiser Transportación (s7)",
          answer_from: ["s7", "s10"],
        },
        {
          q: "¿Cuál es el aeropuerto más cercano?",
          seen: "organiser FAQ (s4)",
          answer_from: ["s4"],
        },
        {
          q: "¿Cómo puedo evitar un fraude al comprar boletos?",
          seen: "organiser FAQ (s4)",
          answer_from: ["s2", "s4"],
        },
      ],
      sources: {
        s1: {
          label: "EDC México, sitio oficial (es)",
          url: "https://mexico.edc.com/",
          kind: "organiser",
        },
        s2: {
          label: "EDC México, Boletos (es)",
          url: "https://mexico.edc.com/tickets/",
          kind: "organiser",
        },
        s3: {
          label: "EDC México, Lineup",
          url: "https://mexico.edc.com/lineup/",
          kind: "organiser",
        },
        s4: {
          label: "EDC México, Preguntas frecuentes",
          url: "https://mexico.edc.com/guide/faq/",
          kind: "organiser",
        },
        s5: {
          label: "EDC México, Horas e Info",
          url: "https://mexico.edc.com/guide/hours-info/",
          kind: "organiser",
        },
        s6: {
          label: "EDC México, Locación",
          url: "https://mexico.edc.com/travel/location/",
          kind: "organiser",
          round2: "URL updated: /guide/location/ 301s here (curl, 10 Nov 2026)",
        },
        s7: {
          label: "EDC México, Transportación",
          url: "https://mexico.edc.com/travel/transportation/",
          kind: "organiser",
        },
        s8: {
          label: "EDC México, Estacionamiento",
          url: "https://mexico.edc.com/travel/parking/",
          kind: "organiser",
        },
        s9: {
          label: "EDC México, SkyDeck",
          url: "https://mexico.edc.com/tickets/skydeck/",
          kind: "organiser",
        },
        s10: {
          label: "Ticketmaster México, Boletos para EDC México (artist page: hours, transport, FAQ, items)",
          url: "https://www.ticketmaster.com.mx/edc-mexico-boletos/artist/1329224",
          kind: "seller",
        },
        s11: {
          label: "Ticketmaster México, Abono General EDC 2027 (sale schedule)",
          url: "https://www.ticketmaster.com.mx/abono-general-electric-daisy-carnival-2027-mexico-19-02-2027/event/14006474B698816D",
          kind: "seller",
        },
        s12: {
          label: "Front Gate Tickets, EDC Mexico 2027 (US/CA)",
          url: "https://edcmexico.frontgatetickets.com/",
          kind: "seller",
        },
        s13: {
          label: "Autódromo Hermanos Rodríguez on Google Maps (organiser's link)",
          url: "https://maps.app.goo.gl/va4XkrdUSd3ZvqYCA",
          kind: "venue",
        },
        s14: {
          label: "Excélsior, 8 Sep 2026: cuándo comienza la preventa (history only)",
          url: "https://www.excelsior.com.mx/espectaculos/edc-mexico-2027-decimos-cuando-comienza-preventa-boletos",
          kind: "media",
        },
        s15: {
          label: "Récord, 9 Nov 2026 18:09: EDC México 2027 revela cartel oficial: Martin Garrix, Tiësto y Fatboy Slim encabezan el festival",
          url: "https://www.record.com.mx/historia/edc-mexico-2027-revela-cartel-oficial-martin-garrix-tiesto-y-fatboy-slim-encabezan-el-festival-2026110918090481419",
          kind: "media",
          round2: "article URL replaces the home URL; URL and headline from Google's result (pane), body behind Cloudflare (403 to WebFetch and the pane); no longer cited for the 2026 dates",
        },
        s16: {
          label: "Sopitas, 9 Nov 2026 (Alvaro Cortes): ¡Ya tenemos cartel para el EDC México 2027!",
          url: "https://www.sopitas.com/musica/edc-mexico-2027-lineup-boletos-fechas/",
          kind: "media",
          round2: "article URL replaces the home URL; read by WebFetch 10 Nov 2026: dates 19–21 Feb, sale from 12 Nov, prices 4,811 / 5,832 / 10,414 MXN",
        },
        s17: {
          label: "EDC México on Instagram (@edc_mexico), snippets in SERP only",
          url: "https://www.instagram.com/edc_mexico/",
          kind: "organiser",
        },
        s18: {
          label: "Insomniac, EDC Mexico 2026 photos (linked from the organiser's home as 'Ediciones Pasadas')",
          url: "https://www.insomniac.com/photos/2026-02-20-21-22-edc-mexico/",
          kind: "organiser",
          round2: "added; heading 'EDC Mexico 2026', 'Feb 20, 2026', slug 20-21-22, no venue",
        },
        s19: {
          label: "Milenio, 9 Nov 2026 13:49 (Johan Kalet Segura Clemens): EDC México 2027: cartel completo, artistas y fechas",
          url: "https://www.milenio.com/espectaculos/musica/edc-mexico-2027-cartel-completo-artistas-lineup-fechas",
          kind: "media",
          round2: "added; 'encabezado por Martin Garrix, Tiësto, Fatboy Slim, Dom Dolla y FISHER'",
        },
        s20: {
          label: "ADN40, 25 Mar 2026: fecha, preventa y precio de boletos (Future Owl phase; history only)",
          url: "https://www.adn40.mx/entretenimiento/2026-03-25/festival-edc-mexico-2027-fecha-preventa-y-precio-boletos/",
          kind: "media",
          round2: "added",
        },
        s21: {
          label: "The Rio Times, 14 Oct 2026 (updated 8 Nov): EDC Mexico City 2027 (Early Owl phase; history only)",
          url: "https://www.riotimesonline.com/edc-mexico-city-electric-daisy-carnival-2026/",
          kind: "media",
          round2: "added",
        },
        s22: {
          label: "EDC México, Ticket 2 Ride (shuttles)",
          url: "https://mexico.edc.com/travel/shuttles/",
          kind: "organiser",
          round2: "added; 200 on 10 Nov 2026",
        },
      },
      not_found: [
        "prices of the phase that opens 12 Nov 2026 (not published anywhere on 10 Nov)",
        "single-day tickets for 2027 (not listed by Ticketmaster or Front Gate on 10 Nov; 2026 had them per media)",
        "Ticketmaster service fees per Abono (organiser says 'todo incluido'; Ticketmaster shows no price while the sale is paused)",
        "SkyDeck price (form only)",
        "festival hours on the organiser's own page (heading without times; hours taken from Ticketmaster)",
        "set times, stages and day split of the 2027 line-up",
        "Ticket 2 Ride shuttle prices, departure times, dates and where to buy (round 2: the page is up and lists eight meeting points, nothing else)",
        "parking price",
        "route from AICM airport and from the Centro Histórico to the Autódromo (no organiser/seller/public page gives one; metro.cdmx.gob.mx refused the connection)",
        "box office / Will Call hours",
        "official resale platform for Ticketmaster México orders (organiser names none, 'evita revendedores'; s10/s11 say nothing; round 2: Front Gate has its own 'Sell Tickets' for eligible US/CA orders, see sellers)",
        "exact date the 2027 dates were first announced on an organiser page (media: 25 Mar 2026 per ADN40 s20, round 2; the 8 Sep 2026 Excélsior piece reported the September sale)",
        "start date of the Wise Owl phase and of any phase (organiser and Ticketmaster do not date phases; round 2)",
        "2026 headliners from an organiser source (round 2: Anyma, Hardwell and Alesso withdrawn; media disagree and ADN40 framed them as its own picks)",
        "venue's own site listing for the event (autodromohermanosrodriguez.com.mx is a blog index)",
      ],
    },
    go: {
      ticketmaster: {
        url: "https://www.ticketmaster.com.mx/edc-mexico-boletos/artist/1329224",
        source: "s10",
        kind: "seller",
        title: "La página de EDC México en Ticketmaster México: abonos, horarios y preguntas frecuentes",
      },
      frontgate: {
        url: "https://edcmexico.frontgatetickets.com/",
        source: "s12",
        kind: "seller",
        title: "El vendedor que el organizador nombra para Estados Unidos y Canadá",
      },
      official: {
        url: "https://mexico.edc.com/",
        source: "s1",
        kind: "organiser",
        title: "El sitio del organizador: EDC México, del 19 al 21 de febrero de 2027",
      },
      // The organiser's SkyDeck form, an official seller in the sheet with its
      // own URL and reading (sellers.2), as Field Day's MobTix form.
      skydeck: {
        url: "https://mexico.edc.com/tickets/skydeck/",
        source: "sellers.2",
        kind: "seller",
        title: "Mesas SkyDeck: el precio se pide al organizador en este formulario",
      },
      // The point of the organiser's own Maps link (venue.lat, venue.lon, read
      // from s13): a maps hop is a plain search at the sheet's point, so it
      // traces to `venue`. Google shows an unnamed pin there, which the title
      // promises.
      maps: {
        url: "https://www.google.com/maps/search/?api=1&query=19.4055237%2C-99.0925662",
        source: "venue",
        kind: "maps",
        title: "Un pin en Google Maps, en el punto del Autódromo que marca el organizador",
      },
    },
  },
];

export const guides: Guide[] = [
  {
    slug: "es-MX",
    createdAt: "2026-11-10T11:35:00+04:00",
    updatedAt: "2026-11-10T11:35:00+04:00",
    event: "edc-mexico",
    name: "EDC México 2027",
    lang: "es-MX",
    dir: "ltr",
    path: "/edc-mexico/",
    hubLabel: "Español (México)",
    hubBlurb: "Del 19 al 21 de febrero de 2027 en el Autódromo Hermanos Rodríguez, Ciudad de México. Boletos en Ticketmaster México, horarios, Metro y cartel.",
    // The markup's locality is the borough, Iztacalco; the hub card says the
    // city, as the writer's card does.
    hubPlace: "Ciudad de México",
    // The Wise Owl figures were read on 10 November 2026: 42 days good.
    expires: { prices: "2026-12-22" },
    pages: [
      {
        slug: "edc-mexico",
        createdAt: "2026-11-10T11:35:00+04:00",
        updatedAt: "2026-11-10T12:36:00+04:00",
        kind: "main",
        label: "Guía",
        crumb: "EDC México 2027",
        title: "EDC México 2027: fechas y boletos — guía del festival",
        description: "EDC México 2027: del 19 al 21 de febrero en el Autódromo Hermanos Rodríguez, CDMX. Boletos en Ticketmaster, horarios, Metro y cartel. Guía del festival.",
        h1: "EDC México 2027",
        anchors: [
          { target: "/edc-mexico/precios-2027/", text: "la página de precios" },
          { target: "/edc-mexico/fechas/", text: "la página de fechas" },
          { target: "/edc-mexico/lineup/", text: "la página de lineup" },
        ],
        // Short chips over the five sections, the questions and the sources:
        // the headings themselves run to 58 characters (executor strings, card
        // section 8). The line on why the guide exists is the first section
        // and takes no chip.
        jumps: [
          { id: "boletos", label: "Boletos" },
          { id: "fechas", label: "Fechas" },
          { id: "como-llegar", label: "Cómo llegar" },
          { id: "cartel", label: "Cartel" },
          { id: "questions", label: "Preguntas" },
          { id: "sources", label: "Fuentes" },
        ],
        lede: "EDC México 2027 se celebra del viernes 19 al domingo 21 de febrero de 2027 en el Autódromo Hermanos Rodríguez, en Iztacalco, en la Ciudad de México [editions.0.start] [editions.0.end] [venue.name] [venue.address]. Son tres días con un solo abono: Ticketmaster México no lista boletos por día para 2027 [prices.4]. El cartel se publicó el lunes 9 de noviembre de 2026, con 147 nombres, y Récord y Milenio pusieron al frente a Martin Garrix, Tiësto y Fatboy Slim [lineup.announcedOn] [sources.s17] [lineup.acts] [lineup.headliners_per_media] [sources.s15] [sources.s19]. Ticketmaster programó una Preventa Banamex para el jueves 12 de noviembre de 2026 a las 14:00 (GMT-6) y la venta general desde el viernes 13 de noviembre a la misma hora [sales.2] [sales.3]. El festival lo organizan Insomniac Events y OCESA, y Ticketmaster lo presenta como su 13ª edición en México [event.organiser] [event.edition].",
        sections: [
          {
            id: "por-que",
            heading: "Por qué existe esta guía en español",
            body: "Esta guía junta en una sola página, en español y con la fecha en que se consultó cada dato, lo que está repartido entre el sitio del organizador y Ticketmaster: fechas, fases de venta, horarios, qué se puede meter y cómo llegar al Autódromo en Metro, Metrobús o coche.",
          },
          {
            id: "boletos",
            heading: "Boletos: quién los vende y cuánto cuestan",
            body: "El organizador pide comprar únicamente en Ticketmaster México y evitar revendedores [sellers.0.note]. Para Estados Unidos y Canadá el vendedor es Front Gate Tickets, que lista los mismos tres abonos de tres días sin precio [sellers.1] [prices.4]. Los abonos de 2027 son tres: General, General con Comfort Pass y VIP Banamex Plus [prices.4]. El organizador vende por fases y avisa que los precios suben de fase en fase [sales.4].\n\n{{until prices}}En la fase Wise Owl, la que el sitio del organizador seguía mostrando el 10 de noviembre de 2026, estos eran los precios de Ticketmaster México, todo incluido: 3 Días General $4,811 MXN, 3 Días General con Comfort Pass $5,832 MXN y 3 Días VIP Banamex Plus $10,414 MXN [prices.0] [prices.1] [prices.2]. {{/until}}Con la Preventa Banamex del 12 de noviembre abre una fase nueva, y el precio vigente es el que muestra Ticketmaster México al momento de comprar [sales.2] [not_found.0]. El organizador dice en sus preguntas frecuentes que hay pagos a 3, 6 o 9 meses sin intereses con tarjetas de crédito Citibanamex [prices.4] [sources.s4].\n\nEl VIP Banamex Plus es solo para mayores de 18 años, con identificación oficial [prices.2.age] [age.4]. El SkyDeck, mesas con vista al escenario principal, se pide por un formulario del organizador y no tiene precio publicado [sellers.2] [prices.3]. Fases, abonos y pagos, con detalle, en la página de precios. → /edc-mexico/precios-2027/\n\nEnlaces: [Comprar en Ticketmaster México](/go/edc-mexico-ticketmaster/) · [Front Gate Tickets (EE. UU. y Canadá)](/go/edc-mexico-frontgate/) · [Sitio oficial de EDC México](/go/edc-mexico-official/).",
          },
          {
            id: "fechas",
            heading: "Fechas y horarios",
            body: "Tres días seguidos: viernes 19, sábado 20 y domingo 21 de febrero de 2027 [editions.0.start] [editions.0.end]. El organizador escribe las fechas en el título de su portada, \"19-21 Febrero, 2027\", y Ticketmaster como \"Del 19 al 21 de febrero de 2027\" [editions.0.note]. Los horarios los publica Ticketmaster México en su página del festival, porque la página \"Horas e Info\" del organizador todavía no trae horas [hours.3] [sources.s5]: el viernes abren puertas a las 16:00, el sábado y el domingo a las 15:00, y los tres días el festival termina a las 02:00 de la madrugada siguiente [hours.0] [hours.1] [hours.2]. Todas las horas son de la Ciudad de México (GMT-6) [venue.utc_offset_feb_2027]. No hay reingreso: el organizador dice que \"entradas y salidas no están autorizadas\" y Ticketmaster que, si sales del recinto, ya no podrás ingresar nuevamente [reentry.1] [reentry.0]. El calendario de ventas, día por día, y la edición anterior están en la página de fechas. → /edc-mexico/fechas/",
          },
          {
            id: "como-llegar",
            heading: "Dónde es y cómo llegar",
            body: "El Autódromo Hermanos Rodríguez está en Av. Río Churubusco, Puerta 5, Ciudad Deportiva, colonia Granjas México, Iztacalco, C.P. 08400, Ciudad de México [venue.address]. Ticketmaster lo ubica en \"Viaducto Piedad y Río Churubusco s/n, Cd. Deportiva, CDMX 08400\" [venue.address_ticketmaster]. El punto exacto es el que el propio organizador enlaza en Google Maps, 19.4055, −99.0926, y lo abres con \"Abrir en el mapa\" [venue.lat] [venue.lon] [sources.s13].\n\nEn Metro, la Línea 9 (café, Pantitlán–Tacubaya) tiene tres estaciones para el festival: Velódromo, Ciudad Deportiva y Puebla [transport.0]. El Will Call está en la Explanada OCESA, en la puerta 6 del Autódromo, cerca del Metro Ciudad Deportiva: ahí se entregan los pedidos internacionales y los boletos que no llegaron antes de la semana del festival [transport.7]. En Metrobús, la Línea 2 (morada, Tacubaya–Tepalcates) deja en UPIICSA y El Rodeo según el organizador, y Ticketmaster habla de llegar por Iztacalco [transport.1].\n\nEl Trolebús Línea 2 para en Ciudad Deportiva, Puerta 8, Puebla y Av. Río Churubusco [transport.2]. Si vas en coche, la entrada al estacionamiento es por la Puerta 15 del Autódromo, el estacionamiento preferente está en el del Estadio Harp Helú y los del Palacio de los Deportes también abren [transport.3]. Los estacionamientos abren a las 07:00 los tres días, y un vehículo que siga en el estacionamiento entre las 04:00 y las 08:00 será remolcado [transport.3]. El precio del estacionamiento no está publicado [not_found.7].\n\nEl organizador lista cuatro sitios de taxis, Taximex, Sitio Palacio de los Deportes, Radio Taxis Elite y Grupo Set, con sus teléfonos en su página de Transportación [transport.4] [sources.s7]. También tiene un programa de shuttles, Ticket 2 Ride, con ocho puntos de encuentro en la ciudad: Mundo E, Plaza Lindavista, Galerías Coapa, Perisur Zacatepetl, Santa Fe, Interlomas, Parque de los Venados y Condesa Parque España [transport.6]. Su página no publica precios, horarios ni fechas de salida [transport.6] [not_found.6]. El aeropuerto más cercano es el Aeropuerto Internacional de la Ciudad de México (AICM), según el organizador, que no publica una ruta desde ahí [transport.5] [not_found.8].\n\nEnlaces: [Abrir en el mapa](/go/edc-mexico-maps/) · [Sitio oficial de EDC México](/go/edc-mexico-official/).",
          },
          {
            id: "cartel",
            heading: "Cartel (lineup) 2027, publicado el 9 de noviembre de 2026",
            body: "El organizador publicó el cartel completo el lunes 9 de noviembre de 2026 en su página \"Lineup\" y en su Instagram [lineup.announcedOn] [sources.s3] [sources.s17]. Son 147 nombres [lineup.acts]. Récord tituló que Martin Garrix, Tiësto y Fatboy Slim encabezan el festival, y Milenio sumó a Dom Dolla y Fisher [lineup.headliners_per_media] [sources.s15] [sources.s19]. En la misma lista están Illenium, Richie Hawtin, Sasha & Digweed, Paul van Dyk con \"The Essence of Acid\", Ben UFO b2b Four Tet, Deborah de Luca b2b Eli Brown, Galantis, Don Diablo, Lost Frequencies, Slander, Michael Bibi, Vintage Culture, I Hate Models, Jessica Audiffred y 3BallMTY [lineup.acts]. Ticketmaster lo resume como \"más de 100 artistas de techno, house, psytrance, hardstyle, bass, EDM y ritmos latinos\" [lineup.acts_note]. La lista está en orden alfabético y todavía no dice quién toca qué día, en qué escenario ni a qué hora [lineup.acts_note] [not_found.5]. El cartel completo, nombre por nombre, está en la página de lineup. → /edc-mexico/lineup/",
          },
        ],
        faqHeading: "Preguntas frecuentes",
        faq: [
          {
            q: "¿Cuándo es EDC México 2027?",
            a: "Del viernes 19 al domingo 21 de febrero de 2027, según la portada del organizador y la página de Ticketmaster México, leídas el 10 de noviembre de 2026 [editions.0] [sources.s1] [sources.s10].",
          },
          {
            q: "¿Dónde será EDC México 2027?",
            a: "En el Autódromo Hermanos Rodríguez, Av. Río Churubusco, Puerta 5, Ciudad Deportiva, Iztacalco, Ciudad de México, según la página \"Locación\" del organizador y Ticketmaster [venue.address] [sources.s6] [sources.s10].",
          },
          {
            q: "¿Cuánto cuestan los boletos para EDC México 2027?",
            a: "Depende de la fase. {{until prices}}En la fase Wise Owl, que el sitio del organizador todavía mostraba el 10 de noviembre de 2026, el abono General de 3 días costaba en Ticketmaster México $4,811 MXN, con Comfort Pass $5,832 MXN y el VIP Banamex Plus $10,414 MXN, todo incluido [prices.0] [prices.1] [prices.2]. {{/until}}Con la Preventa Banamex del 12 de noviembre de 2026 abre una fase nueva, y el precio vigente es el de Ticketmaster México [sales.2] [not_found.0].",
          },
          {
            q: "¿Cuándo salen los boletos de EDC México 2027?",
            a: "Ticketmaster México programó la Preventa Banamex para el jueves 12 de noviembre de 2026, de 14:00 a 23:59 (GMT-6), y la venta general desde el viernes 13 de noviembre de 2026 a las 14:00 (GMT-6), hasta el 21 de febrero de 2027 [sales.2] [sales.3] [sources.s11]. La primera venta fue en septiembre de 2026 [sales.0] [sales.1] [sources.s14].",
          },
          {
            q: "¿Cuándo es la preventa de EDC México 2027?",
            a: "La Preventa Banamex posterior al cartel es el jueves 12 de noviembre de 2026, de 14:00 a 23:59 (GMT-6), según la página del Abono General en Ticketmaster México [sales.2] [sources.s11]. Hubo una primera Preventa Banamex el martes 15 de septiembre de 2026 a las 14:00 [sales.0] [sources.s14].",
          },
          {
            q: "¿Cuál es el cartel de EDC México 2027?",
            a: "147 nombres publicados por el organizador el 9 de noviembre de 2026, con Martin Garrix, Tiësto, Fatboy Slim, Fisher, Illenium, Dom Dolla, Richie Hawtin y Sasha & Digweed entre ellos. La lista completa está en la página de lineup de esta guía [lineup.acts] [lineup.announcedOn] [sources.s3]. → /edc-mexico/lineup/",
          },
          {
            q: "¿Cuáles son los horarios de EDC México 2027?",
            a: "Según Ticketmaster México: viernes 19 de febrero puertas a las 16:00, sábado 20 y domingo 21 a las 15:00, y cierre a las 02:00 cada noche, hora de la Ciudad de México [hours.0] [hours.1] [hours.2] [sources.s10].",
          },
          {
            q: "¿Qué es EDC México?",
            a: "Es la edición mexicana del Electric Daisy Carnival, el festival de música electrónica de Insomniac Events, organizado en México con OCESA [event.organiser] [sources.s11]. Ticketmaster lo describe como un festival de \"más de 100 artistas de techno, house, psytrance, hardstyle, bass, EDM y ritmos latinos\" y presenta la de 2027 como su 13ª edición [lineup.acts_note] [event.edition].",
          },
          {
            q: "¿Qué incluye el Comfort Pass de EDC?",
            a: "Según la página de boletos del organizador, el abono General con Comfort Pass tiene todo lo del General más baños privados con aire acondicionado cerca de kineticFIELD y circuitGROUNDS, y una entrada exclusiva y rápida al festival [ticket_includes.1]. No incluye acceso al área Banamex Plus [ticket_includes.1.caveat]. La tarima con vista preferencial, el guardarropa y el wifi están en la lista del VIP Banamex Plus [ticket_includes.2].",
          },
          {
            q: "¿Puedo comprar boletos a meses sin intereses?",
            a: "Sí, según las preguntas frecuentes del organizador: a 3, 6 o 9 meses con tarjetas de crédito Citibanamex, como las nombra el organizador [prices.4] [sources.s4].",
          },
          {
            q: "¿Los niños necesitan boleto?",
            a: "Según el organizador, se requiere boleto desde los 3 años y los menores de 3 años entran sin costo [age.0] [sources.s4]. Ticketmaster México dice que ingresan de 3 años en adelante y que pagan boleto a partir de los 3 años [age.1] [sources.s11].",
          },
          {
            q: "¿Qué pasa si soy menor de 16 años?",
            a: "Los menores de 16 años entran acompañados de su tutor legal, según el organizador y Ticketmaster [age.2]. El organizador recomienda tener 16 años o más para asistir sin un adulto [age.3]. Las zonas VIP Banamex Plus y SkyDeck son para mayores de 18 años con identificación oficial, igual que comprar y tomar alcohol [age.4].",
          },
          {
            q: "¿Está permitido el reingreso?",
            a: "No. Ticketmaster México lo escribe así: \"si sales del recinto, ya no podrás ingresar nuevamente\" [reentry.0] [sources.s10]. El organizador dice que \"entradas y salidas no están autorizadas\" y que no hay reingreso una vez escaneado el boleto [reentry.1] [reentry.2] [sources.s4] [sources.s5].",
          },
          {
            q: "¿Con qué objetos puedo entrar y cuáles están prohibidos?",
            a: "Según la página de Ticketmaster México: bolsas de hasta 30 × 30 cm, mochilas de hidratación vacías y tótems de hasta 3 cm de diámetro sí entran [allowed_items_source]. No entran comida ni bebida de fuera, vapeadores, paraguas ni cámaras profesionales. La lista completa está en esa página [allowed_items_source] [sources.s10].",
          },
          {
            q: "¿Cómo llegar al Autódromo Hermanos Rodríguez en Metro?",
            a: "Línea 9 (café), estaciones Velódromo, Ciudad Deportiva o Puebla, según el organizador y Ticketmaster [transport.0] [sources.s7] [sources.s10].",
          },
          {
            q: "¿Cuál es el aeropuerto más cercano?",
            a: "El Aeropuerto Internacional de la Ciudad de México (AICM), según las preguntas frecuentes del organizador. No publica una ruta desde el aeropuerto al recinto [transport.5] [not_found.8].",
          },
          {
            q: "¿Cómo evito un fraude al comprar boletos?",
            a: "El organizador pide comprar únicamente a través de Ticketmaster México y evitar revendedores. Para Estados Unidos y Canadá nombra a Front Gate Tickets [sellers.0.note] [sellers.1] [sources.s2].",
          },
        ],
        sourcesHeading: "Fuentes",
        sources: "EDC México, sitio oficial, Boletos, Lineup, Preguntas frecuentes, Horas e Info, Locación, Transportación, Estacionamiento, SkyDeck y Ticket 2 Ride (mexico.edc.com), leídos el 10 de noviembre de 2026 [sources.s1] [sources.s2] [sources.s3] [sources.s4] [sources.s5] [sources.s6] [sources.s7] [sources.s8] [sources.s9] [sources.s22]. Ticketmaster México, página del festival y página del Abono General 2027, leídas el 10 de noviembre de 2026 [sources.s10] [sources.s11]. Front Gate Tickets, EDC Mexico 2027, leído el 10 de noviembre de 2026 [sources.s12]. Autódromo Hermanos Rodríguez en Google Maps, el enlace del organizador [sources.s13]. Instagram de EDC México, para la fecha del cartel y la preventa de septiembre [sources.s17]. Excélsior, 8 de septiembre de 2026, para las fechas de la preventa y la venta general de septiembre [sources.s14]. Récord, 9 de noviembre de 2026, \"EDC México 2027 revela cartel oficial: Martin Garrix, Tiësto y Fatboy Slim encabezan el festival\", y Milenio, 9 de noviembre de 2026, \"EDC México 2027: cartel completo, artistas y fechas\", para los nombres que la prensa destacó [sources.s15] [sources.s19].",
      },
      {
        slug: "edc-mexico/precios-2027",
        createdAt: "2026-11-10T11:35:00+04:00",
        updatedAt: "2026-11-10T12:36:00+04:00",
        kind: "tickets",
        label: "Precios 2027",
        crumb: "Precios 2027",
        title: "Precios EDC México 2027 por fase — guía del festival",
        description: "Abonos de 3 días de EDC México 2027 en Ticketmaster México: General, Comfort Pass y VIP Banamex Plus, por fases y a meses. Guía del festival en español.",
        h1: "Precios de EDC México 2027",
        anchors: [
          { target: "/edc-mexico/", text: "la guía principal" },
          { target: "/edc-mexico/lineup/", text: "la página de lineup" },
        ],
        lede: "EDC México 2027 se vende en Ticketmaster México con tres abonos de tres días, del viernes 19 al domingo 21 de febrero de 2027, y el precio cambia por fases [editions.0.start] [editions.0.end] [prices.4] [sales.4]. Los abonos son General, General con Comfort Pass y VIP Banamex Plus, y el VIP es solo para mayores de 18 años [prices.4] [prices.2.age]. La fase que el organizador mostraba el 10 de noviembre de 2026 se llama Wise Owl, y la siguiente abre con la Preventa Banamex del jueves 12 de noviembre de 2026 [sales.4] [sales.2]. No hay boleto por día para 2027 en Ticketmaster ni en Front Gate, al 10 de noviembre de 2026 [prices.4] [not_found.1].",
        sections: [
          {
            id: "quien-vende",
            heading: "Quién vende y a quién le pagas",
            body: "El organizador, Insomniac Events con OCESA, dice en su página de boletos: \"Compra únicamente a través de Ticketmaster y evita revendedores\" [event.organiser] [sellers.0.note]. Para México y el público general el vendedor es Ticketmaster México [sellers.0]. Para Estados Unidos y Canadá es Front Gate Tickets, que lista \"2027 EDC Mexico - 3-Day\" en sus tres versiones sin precio [sellers.1] [prices.4] [sources.s12]. El SkyDeck, mesas con vista al escenario principal, no se compra en línea: se pide por un formulario del organizador y el precio se da a quien lo solicita [sellers.2] [prices.3]. Ni el organizador ni Ticketmaster México nombran una plataforma oficial de reventa [not_found.10]. Front Gate sí tiene reventa propia para sus pedidos de Estados Unidos y Canadá: en el historial del pedido aparece un botón \"Sell Tickets\", solo si ese boleto puede revenderse [sellers.1.resale] [sources.s12].\n\nEnlaces: [Comprar en Ticketmaster México](/go/edc-mexico-ticketmaster/) · [Front Gate Tickets (EE. UU. y Canadá)](/go/edc-mexico-frontgate/) · [Formulario SkyDeck del organizador](/go/edc-mexico-skydeck/).",
          },
          {
            id: "abonos",
            heading: "Los tres abonos{{until prices}} y lo que costaban en la fase Wise Owl{{/until}}",
            body: "Ticketmaster México lista tres abonos para 2027: General, General con Comfort Pass y VIP Banamex Plus [prices.4]. El organizador vende por fases con nombre propio y avisa en su página: \"Compra ahora y ahorra. Los precios suben por fases y los boletos se agotan\" [sales.4]. {{until prices}}La fase que el sitio del organizador seguía mostrando el 10 de noviembre de 2026 era la Wise Owl, con estos precios de Ticketmaster México, todo incluido [sales.4] [prices.0.fees]:\n\n- 3 Días General: $4,811 MXN, unos 284 dólares [prices.0].\n- 3 Días General con Comfort Pass: $5,832 MXN, unos 344 dólares [prices.1].\n- 3 Días VIP Banamex Plus: $10,414 MXN, unos 613 dólares, solo mayores de 18 años [prices.2].\n\nEsos son precios de la fase Wise Owl, leídos el 10 de noviembre de 2026. {{/until}}Con la Preventa Banamex del jueves 12 de noviembre de 2026 a las 14:00 (GMT-6) abre una fase nueva. Sus precios no estaban publicados el 10 de noviembre, y el precio vigente es el que muestra Ticketmaster México al momento de comprar [sales.2] [not_found.0].{{until prices}} El organizador escribe \"todo incluido\" junto a cada precio. Ticketmaster no mostraba sus cargos por servicio mientras la venta estaba en pausa [prices.0.fees] [not_found.2].{{/until}}",
          },
          {
            id: "que-incluye",
            heading: "Qué incluye cada abono, en palabras del organizador",
            body: "El General es, en la página de boletos del organizador, el pase para recorrer el festival libremente [ticket_includes.0]. El General con Comfort Pass suma baños privados con aire acondicionado cerca de kineticFIELD y circuitGROUNDS y una entrada exclusiva y rápida, y el organizador aclara que no da acceso al área Banamex Plus [ticket_includes.1] [ticket_includes.1.caveat]. El VIP Banamex Plus incluye, según la misma página, entrada exprés, una tarima con vista preferencial en kineticFIELD, pit lateral en kineticFIELD, circuitGROUNDS y neonGARDEN, baños privados con aire acondicionado en esos tres escenarios, zonas para descansar, oferta gastronómica y cócteles con costo adicional, préstamo de baterías, wifi, guardarropa, un lugar de estacionamiento preferencial por cada cuatro boletos Banamex Plus del mismo día, sujeto a disponibilidad, y un concierge VIP en línea [ticket_includes.2]. Para entrar a las zonas Banamex Plus hay que tener 18 años o más y llevar identificación oficial vigente [ticket_includes.2.age]. El SkyDeck tiene mesas con vista directa al escenario principal y servicio privado [ticket_includes.3].",
          },
          {
            id: "ventas",
            heading: "Cuándo abre cada venta",
            body: "La primera Preventa Banamex fue el martes 15 de septiembre de 2026 a las 14:00 (GMT-6), según la prensa y el Instagram del organizador [sales.0] [sources.s14] [sources.s17]. La primera venta general fue el miércoles 16 de septiembre a la misma hora, según la prensa [sales.1] [sources.s14]. Tras publicar el cartel, Ticketmaster México programó una segunda Preventa Banamex para el jueves 12 de noviembre de 2026, de 14:00 a 23:59 (GMT-6), y la venta general desde el viernes 13 de noviembre de 2026 a las 14:00 (GMT-6), que sigue hasta el domingo 21 de febrero de 2027 a las 15:01 [sales.2] [sales.3] [sources.s11]. El 10 de noviembre de 2026 no se podía comprar ningún boleto en Ticketmaster: su página mostraba la cuenta regresiva hacia el 12 de noviembre [sales.4]. Ni el organizador ni Ticketmaster dicen cuándo empezó la fase Wise Owl [sales.5] [not_found.12]. Los pagos a 3, 6 o 9 meses sin intereses son con tarjetas de crédito Citibanamex, según las preguntas frecuentes del organizador [prices.4] [sources.s4].",
          },
          {
            id: "edades",
            heading: "Edades: quién entra y quién compra cada abono",
            body: "Según el organizador, se requiere boleto desde los 3 años y los menores de 3 entran sin costo [age.0] [sources.s4]. Ticketmaster México escribe \"Ingresan de 3 años en adelante\" y \"Pagan boleto a partir de: 3 años en adelante\" [age.1] [sources.s11]. Un menor de 16 años entra únicamente acompañado de su tutor legal, según el organizador y Ticketmaster [age.2]. El organizador recomienda tener 16 años o más para asistir sin adulto [age.3]. El VIP Banamex Plus y el SkyDeck son para mayores de 18 años con identificación oficial, y la misma edad vale para comprar y tomar alcohol dentro [age.4]. No hay reingreso: Ticketmaster México lo dice así, \"si sales del recinto, ya no podrás ingresar nuevamente\", y el organizador escribe que \"entradas y salidas no están autorizadas\" [reentry.0] [reentry.1]. Las bolsas permitidas miden hasta 30 × 30 cm, según Ticketmaster [allowed_items_source].",
          },
          {
            id: "fraude",
            heading: "Cómo evitar un fraude",
            body: "El organizador lo dice en una línea: compra únicamente en Ticketmaster México y evita revendedores [sellers.0.note]. Fuera de México, Front Gate Tickets es el vendedor que nombra el organizador para Estados Unidos y Canadá [sellers.1]. Los pedidos internacionales se entregan en el Will Call, en la Explanada OCESA, puerta 6 del Autódromo, cerca del Metro Ciudad Deportiva, igual que los boletos que no llegaron antes de la semana del festival [transport.7] [sources.s4]. Las fechas, horarios y el camino al Autódromo están en la guía principal, y el cartel completo en la página de lineup. → /edc-mexico/ · → /edc-mexico/lineup/",
          },
        ],
        faq: [],
        sourcesHeading: "Fuentes",
        sources: "EDC México, Boletos, Preguntas frecuentes y SkyDeck, leídos el 10 de noviembre de 2026 [sources.s2] [sources.s4] [sources.s9]. Ticketmaster México, página del festival y Abono General 2027, leídas el 10 de noviembre de 2026 [sources.s10] [sources.s11]. Front Gate Tickets, leído el 10 de noviembre de 2026 [sources.s12]. Instagram de EDC México, para la preventa de septiembre [sources.s17]. Excélsior, 8 de septiembre de 2026, para las fechas de la preventa y la venta general de septiembre [sources.s14].",
      },
      {
        slug: "edc-mexico/fechas",
        createdAt: "2026-11-10T11:35:00+04:00",
        updatedAt: "2026-11-10T12:36:00+04:00",
        kind: "dates",
        label: "Fechas",
        crumb: "Fechas",
        title: "EDC México 2027: fechas y horarios — guía del festival",
        description: "EDC México 2027: viernes 19, sábado 20 y domingo 21 de febrero en el Autódromo Hermanos Rodríguez. Horarios por día y fechas de venta. Guía del festival.",
        h1: "Fechas de EDC México 2027",
        anchors: [
          { target: "/edc-mexico/precios-2027/", text: "la página de precios" },
        ],
        lede: "EDC México 2027 es el viernes 19, el sábado 20 y el domingo 21 de febrero de 2027, tres días seguidos en el Autódromo Hermanos Rodríguez, en la Ciudad de México [editions.0.start] [editions.0.end] [venue.name] [venue.city]. El organizador lo anuncia en el título de su portada como \"19-21 Febrero, 2027\" y Ticketmaster como \"Del 19 al 21 de febrero de 2027\" [editions.0.note]. Un solo abono cubre los tres días: Ticketmaster México no lista boletos por día para esta edición [prices.4].",
        sections: [
          {
            id: "horario",
            heading: "Horario por día, según Ticketmaster",
            body: "Los horarios los publica Ticketmaster México en la sección de preguntas de su página del festival, a la pregunta \"¿A qué hora terminará cada día del festival?\" [hours.3] [sources.s10]. La página \"Horas e Info\" del organizador tiene el apartado \"Horario del Festival\", pero sin horas al 10 de noviembre de 2026 [hours.3] [sources.s5] [not_found.4].\n\n- Viernes 19 de febrero de 2027: puertas a las 16:00, cierre a las 02:00 del sábado 20 [hours.0].\n- Sábado 20 de febrero: puertas a las 15:00, cierre a las 02:00 del domingo 21 [hours.1].\n- Domingo 21 de febrero: puertas a las 15:00, cierre a las 02:00 del lunes 22 [hours.2].\n\nTodas las horas son de la Ciudad de México, GMT-6 en febrero [venue.utc_offset_feb_2027]. Quién toca a qué hora y en qué escenario no está publicado: el cartel es una lista alfabética sin días ni horarios [lineup.acts_note] [not_found.5]. No hay reingreso una vez escaneado el boleto, según el organizador [reentry.2] [sources.s5].",
          },
          {
            id: "ventas",
            heading: "Las fechas de venta, en orden",
            body: "- Martes 15 de septiembre de 2026, 14:00 (GMT-6): primera Preventa Banamex, según la prensa y el Instagram del organizador [sales.0] [sources.s17] [sources.s14].\n- Miércoles 16 de septiembre de 2026, 14:00 (GMT-6): primera venta general, según la prensa [sales.1] [sources.s14].\n- Lunes 9 de noviembre de 2026: el organizador publica el cartel completo [lineup.announcedOn] [sources.s17].\n- Jueves 12 de noviembre de 2026, de 14:00 a 23:59 (GMT-6): Preventa Banamex posterior al cartel, según la página del Abono General en Ticketmaster México [sales.2] [sources.s11].\n- Viernes 13 de noviembre de 2026, 14:00 (GMT-6): venta general, abierta hasta el domingo 21 de febrero de 2027 a las 15:01 [sales.3].\n\nLos precios suben de fase en fase, según el organizador, y los de la fase vigente están en Ticketmaster México [sales.4]. Los precios leídos y las condiciones de cada abono están en la página de precios. → /edc-mexico/precios-2027/",
          },
          {
            id: "estacionamiento",
            heading: "Estacionamiento: horarios y accesos",
            body: "Los estacionamientos abren a las 07:00 los tres días del festival, según Ticketmaster [transport.3] [sources.s10]. La entrada es por la Puerta 15 del Autódromo, el estacionamiento preferente está en el del Estadio Harp Helú, y los del Palacio de los Deportes también abren [transport.3]. Un vehículo que siga en el estacionamiento entre las 04:00 y las 08:00 será remolcado, según el organizador y Ticketmaster [transport.3] [sources.s8] [sources.s10]. El precio del estacionamiento no está publicado [not_found.7].",
          },
          {
            id: "edicion-anterior",
            heading: "La edición anterior y qué número de edición es",
            body: "Ticketmaster México presenta la de 2027 como la 13ª edición de EDC México y dice de la de 2026 que fue \"su edición más grande hasta la fecha\" [event.edition] [editions.1.round2]. El organizador fecha la edición de 2026 del viernes 20 al domingo 22 de febrero de 2026 en su galería de fotos \"EDC Mexico 2026\" [editions.1.start] [editions.1.end] [sources.s18]. Esa galería no nombra el recinto. El organizador, en la descripción de su portada, escribe que EDC \"regresa al Autódromo Hermanos Rodríguez\" [editions.1.round3] [editions.1.venue_2026_source] [sources.s1]. Si buscaste \"EDC México 2026\", esa edición ya pasó: la siguiente es la de febrero de 2027 [editions.1.status] [editions.0].",
          },
        ],
        faq: [],
        sourcesHeading: "Fuentes",
        sources: "EDC México, sitio oficial, Horas e Info, Estacionamiento y la galería de fotos de 2026 en Insomniac, leídos el 10 de noviembre de 2026 [sources.s1] [sources.s5] [sources.s8] [sources.s18]. Ticketmaster México, página del festival y Abono General 2027, leídas el 10 de noviembre de 2026 [sources.s10] [sources.s11]. Instagram de EDC México, para la preventa de septiembre y la fecha del cartel [sources.s17]. Excélsior, 8 de septiembre de 2026, para las fechas de la preventa y la venta general de septiembre [sources.s14].",
      },
      {
        slug: "edc-mexico/lineup",
        createdAt: "2026-11-10T11:35:00+04:00",
        updatedAt: "2026-11-10T12:36:00+04:00",
        kind: "lineup",
        label: "Lineup",
        crumb: "Lineup",
        title: "EDC México 2027: lineup y artistas — guía del festival",
        description: "Cartel completo de EDC México 2027, publicado el 9 de noviembre de 2026: 147 nombres, con Martin Garrix, Tiësto y Fatboy Slim al frente. Guía del festival.",
        h1: "Cartel (lineup) de EDC México 2027",
        anchors: [
          { target: "/edc-mexico/precios-2027/", text: "la página de precios" },
          { target: "/edc-mexico/fechas/", text: "la de fechas" },
          { target: "/edc-mexico/", text: "la guía principal" },
        ],
        lede: "El cartel de EDC México 2027 salió el lunes 9 de noviembre de 2026, en la página \"Lineup\" del organizador y en su Instagram, para los tres días del viernes 19 al domingo 21 de febrero de 2027 en el Autódromo Hermanos Rodríguez [lineup.announcedOn] [sources.s3] [sources.s17] [editions.0.start] [editions.0.end] [venue.name]. Son 147 nombres en orden alfabético, como en la página del organizador, sin día, escenario ni hora [lineup.acts] [lineup.acts_note]. Récord y Milenio pusieron al frente a Martin Garrix, Tiësto y Fatboy Slim [lineup.headliners_per_media] [sources.s15] [sources.s19]. Abajo está la lista completa.",
        sections: [
          {
            id: "que-se-sabe",
            heading: "Qué se sabe y qué no",
            body: "El organizador no ha dicho quién toca cada día ni en qué escenario, y no hay horarios por artista [lineup.acts_note] [not_found.5]. La página del organizador cierra la lista diciendo que el headliner más importante de todos eres tú [lineup.acts_note]. Ticketmaster México resume la propuesta como \"más de 100 artistas de techno, house, psytrance, hardstyle, bass, EDM y ritmos latinos\" [lineup.acts_note]. Contados en la lista del organizador, 15 de los 147 nombres son sets b2b, dos artistas en una misma cabina, y uno más va con un \"+\", John Askew + Simon Patterson [lineup.acts]. Un solo set está marcado como en vivo, Secret Echoes (live), y Paul van Dyk aparece con un show con nombre propio, \"The Essence of Acid\" [lineup.acts]. Los escenarios no están en el cartel, pero el organizador nombra tres en la descripción de sus abonos: kineticFIELD, circuitGROUNDS y neonGARDEN [ticket_includes.1.items] [ticket_includes.2.items]. El organizador no nombra headliners [lineup.headliners_per_media_round2]. Los que la prensa destacó son los de Récord, en su titular del 9 de noviembre, y los de Milenio, que escribió \"encabezado por Martin Garrix, Tiësto, Fatboy Slim, Dom Dolla y FISHER\" [lineup.headliners_per_media] [sources.s15] [sources.s19].",
          },
          {
            id: "destacados",
            heading: "Nombres que la prensa destaca y otros de la lista",
            body: "Martin Garrix, Tiësto y Fatboy Slim son los tres que Récord puso en su titular el 9 de noviembre de 2026, y Milenio sumó a Dom Dolla y Fisher [lineup.headliners_per_media] [sources.s15] [sources.s19]. En la misma lista del organizador están Illenium, Richie Hawtin, Sasha & Digweed, Paul van Dyk con \"The Essence of Acid\", Galantis, Don Diablo, Lost Frequencies, Laidback Luke, Dash Berlin, Slander, NGHTMRE, Kayzo, Svdden Death, Michael Bibi, Cloonee, Vintage Culture, I Hate Models, Ben Klock b2b SHDW, Ben UFO b2b Four Tet, Deborah de Luca b2b Eli Brown, Gryffin b2b Odd Mob y Omnom b2b Walker & Royce [lineup.acts]. También están 3BallMTY, Jessica Audiffred, Zombies in Miami, Los Dutis, Colossio, Cabizbajo, Yosoymatt, Brennan Heart, Coone, Da Tweekaz, D-Sturb, Rebelion, Sub Zero Project y Miss K8 [lineup.acts].",
          },
          {
            id: "cartel-completo",
            heading: "Cartel completo, en orden alfabético, como en la página del organizador (leído el 10 de noviembre de 2026)",
            // The 147 names as a row, each drawing its own dot (types.ts, Section.kind), as
            // Primavera Sound São Paulo's acts of a day: a placing, not words.
            kind: "row",
            body: "3BallMTY · Aaron Hibell · Adriatique · Aerea · Alarico b2b Yanamaste · All Matter b2b Moisees · Alpha 9 · Alyssa Jolee · Apashe · Bad Boombox b2b Mija · Badwolf · Ben Klock b2b SHDW · Ben UFO b2b Four Tet · Bipolar Sunshine · Blond:ish · Bolo · Bontan b2b Yamagucci · Brennan Heart · BUNT. · Cabizbajo · Carlita · Cassian · Celice · Chasewest · Chloé Caillet b2b Job Jobse · Cloonee · Close Friends Only · Colossio · Coone · D-Sturb · Da Tweekaz · Damian Lazarus · Dash Berlin · Davyboi b2b Mika Heggemann · Dax J · Deborah de Luca b2b Eli Brown · Devault · Discip · DJ Harvey · DJ Sash! · Dom Dolla · Dømina · Don Diablo · Dual Damage · Dualité · Dusky · Easttown · Elmefti · Enemix · Fatboy Slim · Fatima Hajji · Fisher · Freebot · Fuentes Prod · Fumi · Fux Beat · Galantis · Gregorio · Gryffin b2b Odd Mob · Gudfella · Hannah Laing · HOL! · Holy Priest · I Hate Models · Illenium · Jackie Hollander · Jamback · Jenna Shaw · Jessica Audiffred · JOA · John Askew + Simon Patterson · Kayzo · Kettama · Kloud · Knolldoll · Korolova · Kuko b2b Onlynumbers · La Bad Curly · Labibe · Laidback Luke · Łaszewo · Linska · Lisa Korver b2b Supergloss · Liu · Loojan · Los Dutis · Lost Frequencies · Lost Kings · Luch · Luciana · Luciano · Mandragora · Marie Vaunt · Mario Santander · Marrøn · Marsh · Marsolo · Martin Garrix · Mary Droppinz · The Masquerade · Mella Dee · Michael Bibi · Miss K8 · Murderith · Mystery Affair · NGHTMRE · Nico Moreno · Novah · NRG2000 · Olisso · Omiki · Omnom b2b Walker & Royce · Omri. · Øtta b2b SPFDJ · Paul van Dyk presents The Essence of Acid · Philou · Quest · Rafael · Ranger Trucco · Ray Volpe · Rayburger · Rebelion · Richie Hawtin · The Rocketman · Rommii · Sam Blacky · Sasha & Digweed · Secret Echoes (live) · Sequence Six · Silver Panda · Slander · Somewhen b2b Ueberrest · Sub Zero Project · Surf Mesa · Svdden Death · Tiësto · Tripolism · Überkikz · Vintage Culture · Volkoder · VTSS · WhoMadeWho · Wooli · YDG · Yosoymatt · Zack Fox · Zombies in Miami [lineup.acts]",
          },
          {
            id: "para-ir",
            heading: "Para ir a verlos",
            body: "Los tres días se venden en un solo abono en Ticketmaster México, por fases, y el VIP Banamex Plus es para mayores de 18 años [prices.4] [sales.4] [age.4]. Las puertas abren a las 16:00 el viernes y a las 15:00 el sábado y el domingo, y cada día termina a las 02:00, según Ticketmaster [hours.0] [hours.1] [hours.2]. Al Autódromo se llega en Metro Línea 9, estaciones Velódromo, Ciudad Deportiva y Puebla [transport.0]. Precios por fase en la página de precios, horarios y ventas en la de fechas, y el camino completo en la guía principal. → /edc-mexico/precios-2027/ · → /edc-mexico/fechas/ · → /edc-mexico/",
          },
        ],
        faq: [],
        sourcesHeading: "Fuentes",
        sources: "EDC México, Lineup y Boletos, leídos el 10 de noviembre de 2026 [sources.s3] [sources.s2]. Instagram de EDC México, para la fecha de publicación [sources.s17]. Ticketmaster México, página del festival, leída el 10 de noviembre de 2026 [sources.s10]. Récord, 9 de noviembre de 2026, \"EDC México 2027 revela cartel oficial: Martin Garrix, Tiësto y Fatboy Slim encabezan el festival\", y Milenio, 9 de noviembre de 2026, \"EDC México 2027: cartel completo, artistas y fechas\" [sources.s15] [sources.s19].",
      },
    ],
  },
];
