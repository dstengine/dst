// Tomorrowland Winter: the event as the scout's sheet has it, and its
// guide in the French of France.
//
// Generated once from the card (~/mind/ai/dubai/events/tasks/
// 2026-11-16-tomorrowland-winter-fr.md) and edited by hand from here on.
// The sheet is section 1's round-1 YAML, values verbatim, with the scout's
// rounds 2 and 3 on top: round 2's lineup block merged key by key (round
// 1's acts and announcedNote stay) and its ambassadeur block, then each of
// their prose repairs as the scout wrote it. The card's working notes (the
// segment, the SERP, the archive's paths) are no page's facts and stay on
// the card. One slip of the sheet is left as it is: round 3 gives
// ambassadeur.feesNote "Source s11", which is Emblem; the three desk pages
// it quotes are s10's, the block's own source, and no value moves.
//
// The copy is the writer's round 3 with the native reader's round-3 notes
// 1 (page 4, a colon for the first comma) and 2 (page 2, « l'acompte sur le
// logement »), [key] tags as written, and "1er" where the writer printed
// 1<sup>er</sup> (the CTO's gate-3 condition 2: no markup form in shared
// render code; LONG_DATE.fr and Igloofest print "1er"). The build's
// placings, not the copy's words:
// - « Pourquoi ce guide existe en français » is the main page's last
//   section, after the Ambassadeur block and before the questions (the fest
//   director's gate-3 ruling 2); the writer's root crumb `/festivals/` is
//   the hub at `/` (ruling 1);
// - each "Liens : A · B" closes its section as a paragraph of its own, each
//   label its /go/ hop;
// - each "… sur la page Billets / Dates et lieu / Programmation / Comment y
//   aller." is an arrow, anchored on that phrase (anchors);
// - the {{until prices}} spans hold every figure in euros and the sentences
//   that name it, from 28 December 2026 (expires.prices: the readings of
//   16 November and 42 days), and the two pointers to prices the take-down
//   empties (page 3 « Les prix sont sur la page Billets », page 4 « Les prix
//   complets et les règles d'achat sont sur la page Billets »);
// - a subpage's crumb is its tab label.
// The typography is France's (copy.ts, FR_FR_RULES): the guide's lang,
// fr-FR, picks it as the guide is loaded (index.ts).
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
    slug: "tomorrowland-winter",
    createdAt: "2026-11-17T10:56:00+04:00",
    updatedAt: "2026-11-17T10:56:00+04:00",
    name: "Tomorrowland Winter",
    edition: {
      start: "2027-03-20",
      end: "2027-03-27",
    },
    readOverrides: {
      // The organiser's name was read off the organiser's site (s1) with the
      // edition on 16 Nov 2026; the sheet carries no readOn of its own there.
      "event.organiser": "2026-11-16",
    },
    // Place name: the resort, never venue.name (the scout's long description).
    // No streetAddress: the open-air stage has none the organiser prints.
    markup: {
      startDate: "2027-03-20T19:00",
      endDate: "2027-03-27T01:30",
      timeZone: "Europe/Paris",
      placeName: "L'Alpe d'Huez",
      address: {
        addressLocality: "Huez",
        addressRegion: "Isère",
        postalCode: "38750",
        addressCountry: "FR",
      },
      organizer: {
        name: "Tomorrowland",
        url: "https://winter.tomorrowland.com/fr/bienvenue/",
      },
      offers: [
        {
          name: "Ticket Festival 7 jours",
          seller: "Tomorrowland Account",
          go: "account",
          validFrom: "2026-10-10T17:00:00+02:00",
          price: {
            key: "prices.0",
            currency: "EUR",
          },
        },
        {
          name: "Ticket Festival Comfort 7 jours",
          seller: "Tomorrowland Account",
          go: "account",
          validFrom: "2026-10-10T17:00:00+02:00",
          price: {
            key: "prices.1",
            currency: "EUR",
          },
        },
        {
          name: "Ticket Festival 4 jours",
          seller: "Tomorrowland Account",
          go: "account",
          validFrom: "2026-10-10T17:00:00+02:00",
          price: {
            key: "prices.2",
            currency: "EUR",
          },
        },
        {
          name: "Ticket Festival Comfort 4 jours",
          seller: "Tomorrowland Account",
          go: "account",
          validFrom: "2026-10-10T17:00:00+02:00",
          price: {
            key: "prices.3",
            currency: "EUR",
          },
        },
        {
          name: "Ticket Festival 1 jour, MainStage ouverte",
          seller: "Tomorrowland Account",
          go: "account",
          validFrom: "2026-10-10T17:00:00+02:00",
          price: {
            key: "prices.4",
            currency: "EUR",
          },
        },
        {
          name: "Ticket Festival Comfort 1 jour, MainStage ouverte",
          seller: "Tomorrowland Account",
          go: "account",
          validFrom: "2026-10-10T17:00:00+02:00",
          price: {
            key: "prices.5",
            currency: "EUR",
          },
        },
        {
          name: "Ticket Festival 1 jour, MainStage fermée",
          seller: "Tomorrowland Account",
          go: "account",
          validFrom: "2026-10-10T17:00:00+02:00",
          price: {
            key: "prices.6",
            currency: "EUR",
          },
        },
        {
          name: "Package Festival 7 jours",
          seller: "Tomorrowland Winter (Sunweb)",
          go: "tickets",
          validFrom: "2026-10-03T15:00:00+02:00",
          availability: "SoldOut",
        },
        {
          name: "Package Festival 4 jours",
          seller: "Tomorrowland Winter (Sunweb)",
          go: "tickets",
          validFrom: "2026-10-10T15:00:00+02:00",
          availability: "SoldOut",
        },
        {
          name: "Package Sunweb, Auris-en-Oisans ou Vaujany",
          seller: "Sunweb",
          go: "sunweb",
        },
      ],
      performers: ["lineup.acts"],
    },
    sheet: {
      event: {
        name: "Tomorrowland Winter",
        slug: "tomorrowland-winter",
        organiser: "Tomorrowland (We Are One World / WEAREONE.world, Belgium)",
        kind: "music festival",
        genre: "electronic",
        since: 2019,
      },
      editions: [
        {
          year: 2027,
          number: 7,
          start: "2027-03-20",
          end: "2027-03-27",
          status: "announced",
          ticketState: "Festival Tickets (7, 4, 1 day) on sale; the organiser's Festival Packages 4 & 7 days (Alpe d'Huez / Oz 3300) sold out on its home page; Sunweb's own packages (Auris-en-Oisans, Vaujany) on sale at sunweb.fr",
          venue: "v1",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          year: 2026,
          start: "2026-03-21",
          end: "2026-03-28",
          status: "held",
          source: "s4",
          readOn: "2026-11-16",
        },
        {
          year: 2025,
          start: "2025-03-15",
          end: "2025-03-22",
          status: "held",
          note: "fifth edition, 22,000+ visitors, 150+ artists, seven stages (organiser's figures)",
          source: "s4",
          readOn: "2026-11-16",
        },
        {
          year: 2024,
          start: "2024-03-16",
          end: "2024-03-23",
          status: "held",
          note: "fourth edition, 22,000+ visitors, eight stages, CORE stage debuted (organiser's figures)",
          source: "s4",
          readOn: "2026-11-16",
        },
        {
          year: 2023,
          start: "2023-03-18",
          end: "2023-03-25",
          status: "held",
          note: "third edition, 22,000 visitors, 100+ DJs (organiser's figures)",
          source: "s4",
          readOn: "2026-11-16",
        },
        {
          year: 2022,
          start: "2022-03-19",
          end: "2022-03-26",
          status: "held",
          note: "second edition, 18,000+ visitors, first covered and heated MainStage (organiser's figures)",
          source: "s4",
          readOn: "2026-11-16",
        },
        {
          year: 2019,
          start: "2019-03-09",
          end: "2019-03-16",
          status: "held",
          note: "first edition, 25,000 visitors (organiser's figure)",
          source: "s4",
          readOn: "2026-11-16",
        },
      ],
      venue: {
        key: "v1",
        name: "Alpe d'Huez (station de ski), MainStage in the resort centre, mountain stages on the Espace Alpe d'Huez ski area",
        address: "L'Alpe d'Huez, 38750 Huez, Isère, France (Office de Tourisme: Place Joseph Paganon, 38750 Alpe d'Huez)",
        lat: 45.0903,
        lon: 6.0655,
        coordsNote: "Place Joseph Paganon, resort centre, OpenStreetMap/Nominatim 2026-11-16 (s7); the organiser prints no street address for the MainStage",
        city: "Alpe d'Huez (commune de Huez)",
        region: "Oisans, Isère, Auvergne-Rhône-Alpes",
        country: "FR",
        timezone: "Europe/Paris",
        altitude: {
          resort_m: 1860,
          top_m: 3330,
          source: "s1",
          readOn: "2026-11-16",
        },
        skiArea: {
          name: "Espace Alpe d'Huez",
          pistes_km: 250,
          lifts: 84,
          resorts: ["Alpe d'Huez", "Auris-en-Oisans", "Villard-Reculas", "Oz-en-Oisans (Oz 3300)", "Vaujany"],
          source: "s1",
          readOn: "2026-11-16",
        },
        source: "s5",
        readOn: "2026-11-16",
      },
      hours: [
        {
          what: "Zone principale du festival (MainStage fermée), samedi 20 – lundi 22 mars",
          open: "19:00",
          close: "00:00",
          lastEntry: "23:30",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          what: "Zone principale du festival (MainStage ouverte), mardi 23 – vendredi 26 mars",
          open: "19:00",
          close: "01:30",
          lastEntry: "00:30",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          what: "Scènes en montagne, samedi – lundi",
          open: "12:00",
          close: "17:00",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          what: "Scènes en montagne, mardi – vendredi",
          open: "12:00",
          close: "17:30",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          what: "Moosebar by Day, centre de l'Alpe d'Huez, samedi – vendredi",
          open: "15:00",
          close: "19:30",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          what: "MainStage opens on Tuesday 23 March; Saturday–Monday are 'MainStage fermée' days",
          source: "s1",
          readOn: "2026-11-16",
        },
      ],
      sellers: [
        {
          name: "Tomorrowland Account (billetterie officielle, Paylogic)",
          url: "https://my.tomorrowland.com/",
          official: true,
          note: "the ticket shop link appears inside the account after pre-registration; Paylogic sends the confirmation",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          name: "Tomorrowland Winter, site officiel (page Tickets)",
          url: "https://winter.tomorrowland.com/fr/tickets",
          official: true,
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          name: "Sunweb (partenaire voyage officiel; opérateur de réservation des Packages Festival de l'organisateur; vend ses propres packages à Auris-en-Oisans et Vaujany)",
          url: "https://www.sunweb.fr/tomorrowland-winter",
          official: true,
          note: "the organiser's packages it operates are sold out (organiser's home page, 2026-11-16); Sunweb's own 5- and 8-day packages, with ski pass, Mountain Stage access and an evening shuttle from Tue 23 March, were on sale on sunweb.fr on 2026-11-16, no sold-out mark; a Sunweb package gives the evening festival in Alpe d'Huez only with the ALL IN upgrade; for the organiser's Festival Packages (the packages with lodging sold in the Tomorrowland Winter Shop, Sunweb as their booking operator), the organiser's help centre gives tomorrowlandwinter@sunweb.com: for cancellation questions, under 'Packages Festival – avec hébergement' (article 360038500631, section 'Après les Ventes', updated 2026-11-16T04:56Z: 'Sunweb étant l'organisateur officiel des réservations Tomorrowland Winter, ils gèrent le processus de réservation ainsi que les paiements'), and for the deposit on package lodging (article 360038502091, section 'Général', updated 2026-09-09); neither article concerns Sunweb's own Auris-en-Oisans and Vaujany packages, for which the sheet names no contact",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          name: "Emblem (listed by the organiser among its official travel partners; an under-30s discount card in Grenoble, emblemgrenoble.com)",
          url: "https://www.emblemgrenoble.com/",
          official: true,
          sellsTickets: "unknown",
          note: "the organiser's list names it without saying what it offers; Emblem's own site says nothing of Tomorrowland Winter and its 2026/27 card is sold out; print Emblem as the organiser lists it, nothing more; no /go/ link until a page says what it sells",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          name: "Pass Culture (canal officiel nommé par l'organisateur)",
          url: "https://passculture.app/lieu/26622",
          official: true,
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          name: "Exchange Desk (revente officielle)",
          url: "https://my.tomorrowland.com/",
          official: true,
          note: "named by the organiser as the only resale: Festival Tickets without accommodation bought via Paylogic (not Sunweb packages, not Business Sales tickets); opened in the main buyer's Tomorrowland Account from 10 Oct 2026 until 20 Jan 2027 23:59 CET; listing is final and cannot be withdrawn; resale is not guaranteed; if the ticket sells, the seller is told by e-mail at the latest one week before the event and refunded within 4–6 weeks, less 10 EUR per ticket; the organiser's own text still reads 'Tomorrowland Winter 2026' on both pages, a leftover the guide does not copy",
          source: "s1",
          readOn: "2026-11-16",
        },
      ],
      saleDates: [
        {
          what: "Packages Festival 7 jours (avec hébergement)",
          when: "2026-10-03 15:00 CEST",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          what: "Packages Festival 4 jours (avec hébergement)",
          when: "2026-10-10 15:00 CEST",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          what: "Tickets Festival 7, 4 et 1 jour (sans hébergement)",
          when: "2026-10-10 17:00 CEST",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          what: "Add-On Sale (locations, cours, casiers, pass transport, assurance ski)",
          when: "date not announced; 'à l'approche de l'événement', via the Tomorrowland Account",
          source: "s2",
          readOn: "2026-11-16",
        },
      ],
      prices: [
        {
          label: "Ticket Festival 7 jours (20–26 mars)",
          amount: 735,
          currency: "EUR",
          split: "346 festival + 389 forfait",
          seller: "Tomorrowland Account / Paylogic",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          label: "Ticket Festival Comfort 7 jours",
          amount: 1125,
          currency: "EUR",
          split: "736 + 389",
          seller: "Tomorrowland Account / Paylogic",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          label: "Ticket Festival 4 jours (23–26 mars)",
          amount: 560,
          currency: "EUR",
          split: "317 + 243",
          seller: "Tomorrowland Account / Paylogic",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          label: "Ticket Festival Comfort 4 jours",
          amount: 950,
          currency: "EUR",
          split: "707 + 243",
          seller: "Tomorrowland Account / Paylogic",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          label: "Ticket Festival 1 jour, MainStage ouverte (un jour du 23 au 26 mars)",
          amount: 190,
          currency: "EUR",
          split: "122 + 68",
          seller: "Tomorrowland Account / Paylogic",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          label: "Ticket Festival Comfort 1 jour, MainStage ouverte",
          amount: 340,
          currency: "EUR",
          split: "272 + 68",
          seller: "Tomorrowland Account / Paylogic",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          label: "Ticket Festival 1 jour, MainStage fermée (un jour du 20 au 22 mars)",
          amount: 130,
          currency: "EUR",
          split: "62 + 68",
          seller: "Tomorrowland Account / Paylogic",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          label: "Frais de Treasure Case (bracelet envoyé à domicile), par personne, UE",
          amount: 15,
          currency: "EUR",
          seller: "Tomorrowland Account / Paylogic",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          label: "Frais de Treasure Case, monde entier",
          amount: 22,
          currency: "EUR",
          seller: "Tomorrowland Account / Paylogic",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          label: "Package Festival 7 jours: festival part",
          amount: 316,
          currency: "EUR",
          note: "+ forfait 389 EUR + hébergement, total depends on the accommodation; the organiser's packages, sold out on its home page 2026-11-16",
          seller: "Tomorrowland Winter Shop (Sunweb as booking operator)",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          label: "Package Festival 4 jours: festival part",
          amount: 282,
          currency: "EUR",
          note: "+ forfait 243 EUR + hébergement; the organiser's packages, sold out on its home page 2026-11-16",
          seller: "Tomorrowland Winter Shop (Sunweb as booking operator)",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          label: "Supplément Comfort sur un package",
          amount: 390,
          currency: "EUR",
          seller: "Tomorrowland Winter Shop (Sunweb as booking operator)",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          label: "Transaltitude coach Grenoble gare routière – L'Alpe d'Huez « Paganon », aller simple plein tarif (web)",
          amount: 23.5,
          currency: "EUR",
          note: "aller-retour 42 EUR web; -26 ans 20 EUR; à bord 30 EUR; saison 2026–2027",
          seller: "Transaltitude",
          source: "s6",
          readOn: "2026-11-16",
        },
        {
          label: "Sunweb, package 8 jours à partir du samedi 20 mars, hébergement + forfait + matériel de ski + Pass Mountain Stage, prix par personne 'à partir de', recherche par défaut 4 personnes sans transport",
          amount: 870,
          currency: "EUR",
          range: "870–1 175 selon la résidence (Auris-en-Oisans, Vaujany)",
          seller: "Sunweb",
          source: "s8",
          readOn: "2026-11-16",
          note: "ALL IN upgrade priced only inside the booking flow, not read",
        },
      ],
      paymentAndRules: [
        {
          what: "Festival Tickets: pay at once (VISA, Mastercard, iDeal, Bancontact, Carte Bancaire, Apple Pay); purchases are final, no upgrade or cancellation; tickets personalised by name and e-mail; e-tickets a few weeks before",
          source: "s1",
          readOn: "2026-11-16",
          note: "spelling: the organiser's comment-commander page writes 'iDeal' for tickets and packages; the help centre writes 'iDEAL'",
        },
        {
          what: "Packages: 40% deposit (max 2,500 EUR) at purchase, balance within 30 days; personalisation free until 2026-11-30; name change 2026-12-01 – 2027-01-15 at 350 EUR; cancellation fees 70 % jusqu'au 1er novembre 2026, 80 % jusqu'au 1er décembre 2026, 90 % jusqu'au 1er février 2027, 100 % à partir du 1er février 2027 (the organiser's wording; the first two dates are past on 2026-11-16, and the packages are sold out)",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          what: "Tomorrowland Account recommended at least 2 hours before a sale; pre-registration on the Tomorrowland Winter 2027 event page in the account",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          what: "Resale is forbidden by the T&Cs; each bracelet has a unique code and ID is checked; the organiser reports fraud at fraude@tomorrowland.com",
          source: "s1",
          readOn: "2026-11-16",
        },
      ],
      age: {
        min: 18,
        note: "18 before the first festival day; no exception, accompanied or not",
        source: "s1",
        readOn: "2026-11-16",
      },
      lineup: {
        announcedOn: "2026-11-13",
        announcedNote: "the organiser's line-up data feed (the JSON the /fr/line-up page renders, artist-lineup-cdn.tomorrowland.com, event code TL27FR) carries Last-Modified Fri 13 Nov 2026 17:50 UTC; French media (Guettapen) published the full programme the same day; the organiser's YouTube reveal is dated about 14 Nov",
        count: "127 slots, 86 distinct performance names (89 artist names, b2b sets counted apart), Saturday 20 to Friday 26 March 2027; no Saturday 27 on the organiser's line-up",
        stages: ["MAINSTAGE", "CAGE", "PLANAXIS", "MOOSE BAR by night", "MOOSE BAR by day", "ORBYZ", "FROZEN LOTUS", "LIFE"],
        stagesNote: "feed spelling verbatim; CORE and 'Reflection of Love' debuted in 2024 (s4), not in the 2027 list; the feed files no set under a stage, only under a weekday",
        acts: ["Charlotte de Witte", "Dimitri Vegas & Like Mike", "Lost Frequencies", "Steve Aoki", "Afrojack", "Alok", "Timmy Trumpet", "Oliver Heldens", "Kölsch", "Joris Voorn", "Maceo Plex", "Miss Monique", "Kevin de Vries", "Sara Landry", "Slander", "Amber Broos", "Kungs", "Mosimann", "John Newman", "Hannah Laing", "Nico Moreno", "Space 92", "Korolova", "Sub Zero Project", "Chuckie", "A-Trak", "Morten", "Argy", "Mandy", "Blasterjaxx", "Quintino", "Yves V", "Tchami", "Matisse & Sadko", "Dubvision", "Dannic b2b Dyro", "ELFIGO", "Massano", "Novah", "HALŌ", "Third Party", "Gregor Salto", "Brina Knauss", "LNY TNZ", "Sound Rush", "Natte Visstick", "MATTN"],
        byDay: {
          "2027-03-20": ["Kölsch", "Korolova", "Oliver Heldens", "Karakals", "Afrojack", "Morten", "Mosimann", "Baron b2b Meloko", "Sub Zero Project", "Blasterjaxx", "Jeroen Visser", "Jelle DK"],
          "2027-03-21": ["Benwal", "Sub Zero Project", "Morten", "Yves V", "Karakals", "Lennert Wolfs", "Hannah Laing", "Yuuki Yoshiyama", "Oliver Heldens b2b Tchami", "Kungs", "Natte Visstick", "Jelle DK", "Jerrooo", "Jeroen Visser", "Marsolo"],
          "2027-03-22": ["Space 92", "Hannah Laing", "Afrojack", "A-Trak", "Gregor Salto", "Novah", "Third Party", "Benwal b2b Olive Anguz", "Joris Voorn b2b Kölsch", "Korolova", "Ian Asher", "Lisa Korver", "Jerrooo", "Jelle DK", "Prosit"],
          "2027-03-23": ["Steve Aoki", "HALŌ", "Mosimann", "MC Stretch", "Slander", "Massano", "Mila Journée", "Matisse & Sadko", "Miss Monique", "Nico Moreno", "Serafina", "Sara Landry", "Linska", "MATTN", "Meaghan", "Prosit", "Jelle DK", "Merow b2b Moksi"],
          "2027-03-24": ["Lost Frequencies", "Miss Monique", "Meaghan", "MC Stretch", "Nico Moreno", "Serafina", "Alt8 b2b Emilija", "ROW1", "John Newman", "Gravagerz", "Manuals", "Alok", "Dubvision", "David Latour", "Kevin de Vries", "Slander", "Timmy Trumpet", "Ian Asher", "Charlotte de Witte", "Koven", "MR. E.", "Jelle DK", "Effe Serieus", "Prosit"],
          "2027-03-25": ["Novah", "Kevin de Vries", "MATTN", "Telykast", "Lennert Wolfs", "MC Stretch", "The Saints", "Sound Rush", "Miss Puss b2b Pat B", "LNY TNZ", "Dimitri Vegas", "Argy", "ELFIGO", "Maceo Plex", "Bhaskar b2b Brina Knauss", "Brian", "Funkhauser", "MR. E.", "Hansi", "Amber Broos"],
          "2027-03-26": ["Dimitri Vegas & Like Mike", "Alok", "ELFIGO", "Lucca van Damme", "MC Stretch", "Quintino", "Dannic b2b Dyro", "David Latour", "Joris Voorn", "Brina Knauss", "Lost Frequencies", "John Newman", "Telykast", "Manuals", "The Saints", "Mandy", "DJ Schnake", "Pat B", "Charlotte de Witte", "Chuckie", "Funkhauser", "Brian", "Jelle DK"],
        },
        source: "s1",
        sourceNote: "https://artist-lineup-cdn.tomorrowland.com/TL27FR-W1-0aa5eba2-c6c8-4e1d-8211-efaf386f67a8.json (performances), stages-TL27FR-… (stages), config-TL27FR-… (weekend 2027-03-19 12:00 → 2027-03-27 03:00, withTimetable=false); all Last-Modified 2026-11-13 17:50 GMT; the page https://winter.tomorrowland.com/fr/line-up renders them",
        readOn: "2026-11-16",
        orderNote: "feed order within a day; every startTime is the 12:00 placeholder (withTimetable=false), so no billing order and no set times exist",
        byDayCount: {
          "2027-03-20": 12,
          "2027-03-21": 15,
          "2027-03-22": 15,
          "2027-03-23": 18,
          "2027-03-24": 24,
          "2027-03-25": 20,
          "2027-03-26": 23,
        },
        afterMidnight: [
          {
            day: "2027-03-23",
            acts: ["Slander", "Sara Landry"],
            feedDate: "2027-03-24",
          },
          {
            day: "2027-03-24",
            acts: ["Nico Moreno", "Timmy Trumpet"],
            feedDate: "2027-03-25",
          },
          {
            day: "2027-03-25",
            acts: ["Novah", "The Saints"],
            feedDate: "2027-03-26",
          },
          {
            day: "2027-03-26",
            acts: ["Quintino", "Charlotte de Witte"],
            feedDate: "2027-03-27",
          },
        ],
        afterMidnightNote: "the feed gives these a calendar date one day after their festival day and no time; the organiser's hours page closes the main zone at 01:30 on Tuesday–Friday nights, so Friday 26 ends at 01:30 on Saturday 27, which is why the organiser writes 20–27 mars",
        twice: ["Afrojack (Sat, Mon)", "Kölsch (Sat, Mon b2b)", "Oliver Heldens (Sat, Sun b2b)", "Morten (Sat, Sun)", "Korolova (Sat, Mon)", "Mosimann (Sat, Tue)", "Sub Zero Project (Sat, Sun)", "Hannah Laing (Sun, Mon)", "Nico Moreno (Tue, Wed)", "Miss Monique (Tue, Wed)", "Slander (Tue after midnight, Wed)", "Novah (Mon, Thu)", "Kevin de Vries (Wed, Thu)", "Lost Frequencies (Wed, Fri)", "Alok (Wed, Fri)", "John Newman (Wed, Fri)", "Charlotte de Witte (Wed, Fri)", "ELFIGO (Thu, Fri)", "The Saints (Thu, Fri)", "Dimitri Vegas (Thu) and Dimitri Vegas & Like Mike (Fri), as the feed writes them"],
        twiceNote: "a selection of the better-known repeats; the byDay lists are the record, and names such as Jelle DK, MC Stretch, Prosit, Joris Voorn (Mon b2b, Fri), Brina Knauss (Thu b2b, Fri), Pat B, Telykast, Manuals, David Latour, Ian Asher, Serafina, Meaghan, Karakals, Benwal, Lennert Wolfs, MATTN, Brian, Funkhauser, MR. E., Jeroen Visser and Jerrooo also play more than one day",
      },
      transport: [
        {
          how: "Train: Grenoble is the nearest station (national and international links); Grenoble – Alpe d'Huez about 90 minutes by coach or taxi",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          how: "Coach Grenoble gare routière → L'Alpe d'Huez « Paganon » (stop also at Huez « Le Village »), Transaltitude, 1h45, from 14.50 EUR with a Cars Région pass, 23.50 EUR full fare one way on the web, 42 EUR return; season 2026–2027; during the festival some stops are not served (Transaltitude's warning for March 2027); its plan closes the 'Palais des sports' stop and keeps 'Place Paganon', 'Eclose' and 'Parking Les Bergers', with 15 minutes' margin asked at every stop; the plan the page links for its March 2027 warning was put online in February 2026 (file under /uploads/2026/02/, Last-Modified Wed 25 Feb 2026 14:19:41 GMT); it names no edition, so a reader checks it again before travelling",
          source: "s6",
          readOn: "2026-11-16",
        },
        {
          how: "Plane: Lyon, Grenoble or Genève; dedicated shuttle services from each airport to Alpe d'Huez; the organiser lists shuttles and taxis (shared shuttle, private car, direct coach) on its transfers page",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          how: "Organiser's travel times: 1 h from Grenoble, 2 h from Lyon, under 5 h from Paris",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          how: "Car: parking is limited, no dedicated festival parking; carpooling recommended; covered car parks in the resort are booked via reservation.alpedhuez.com",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          how: "Coach services from Lyon or Genève to Alpe d'Huez exist (organiser names the cities, not the operators)",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          how: "Packages with transport (avion, train, autocar) were sold with the Festival Packages; sold out on 2026-11-16; Sunweb's own packages include an evening shuttle Auris/Vaujany ↔ Alpe d'Huez from Tuesday 23 March (s8, 2026-11-16)",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          how: "Daytime between villages: lifts with the included pass; last departures from Alpe d'Huez: Auris 16:30 (skiers only), Oz 3300 16:45, Villard-Reculas 16:40 (skiers only), Vaujany 16:30, Allemond 16:45, Huez 17:50; only lifts from the mountain stages back to Alpe d'Huez run until the stages close",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          how: "Evening: Tomorrowland transport passes (lift or shuttle) between Alpe d'Huez and Oz 3300, Bourg-d'Oisans, Villard-Reculas, Auris-en-Oisans, Vaujany; added at ticket purchase or in the Add-On Sale; the passes run by lift or by shuttle in the evening (organiser); the Oz lift runs through the festival evenings; the daytime last departures of transport.7 are the ski-area lifts, not the evening service",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          how: "Driving times from the villages (organiser, indicative): Huez 5 km 10 min; Villard-Reculas 9 km 45 min; Bourg-d'Oisans 16 km 35 min; Allemond 25 km 40 min; Auris-en-Oisans 30 km 50 min; Vaujany 32 km 50 min; Oz 3300 35 km 55 min. Walking between villages is forbidden by the organiser",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          how: "Inside the resort, free pedestrian lifts in winter: Télécentre (Office de Tourisme → Place Jean Moulin / Front de neige), Alpe Express (Place Paganon → Éclose, Bergers), Huez Express (Huez village → Alpe d'Huez)",
          source: "s1",
          readOn: "2026-11-16",
        },
      ],
      onSite: [
        {
          what: "Every Festival Ticket includes the Espace Alpe d'Huez lift & ski pass for the same days; all mountain stages are reachable on foot by lift; the pass can be extended at SATA lift ticket offices, not through Tomorrowland",
          source: "s2",
          readOn: "2026-11-16",
        },
        {
          what: "Ski insurance is not included; Assur'Glisse can be bought at SATA information points in the resort",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          what: "Reusable cups and plates with a small deposit; zero-tolerance drug policy; no own food or drink, no aerosols, no animals except guide dogs",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          what: "Lockers: a limited number on site, sold in the Add-On Sale",
          source: "s1",
          readOn: "2026-11-16",
        },
        {
          what: "By day: Oz 3300 is one lift from the mountain stages and about 15 minutes from Alpe d'Huez by two direct lifts (included ski pass)",
          source: "s2",
          readOn: "2026-11-16",
        },
        {
          what: "In the evening: an Oz package includes a transport pass; the Oz 3300 ↔ Alpe d'Huez lift (20 min) runs continuously during the festival evenings; in bad weather, buses of about 75 min",
          source: "s1",
          readOn: "2026-11-16",
        },
      ],
      ambassadeur: {
        what: "'Billetterie Ambassadeurs': early ticketing for owners, residents, workers and seasonal staff of the Espace Alpe d'Huez plus Bourg-d'Oisans and Allemond; requests open 'dès début juillet', about two months before the public sale; tickets limited, 'non garantis', validated by the resort municipalities and Tomorrowland",
        state: {
          label: "7, 4 & 1 JOUR - EN VENTE on all three desks",
          readOn: "2026-11-16",
          source: "s10",
        },
        communes: ["Alpe d'Huez", "Auris-en-Oisans", "Vaujany", "Villard-Reculas", "Oz-en-Oisans", "La Garde-en-Oisans", "Le Freney-d'Oisans", "Bourg-d'Oisans", "Allemond"],
        desks: [
          {
            name: "Ambassadeurs",
            who: "owners and/or residents of the communes above without a 2026/27 season or year pass (Espace Alpe d'Huez – Aeon), and their family and friends; the number of tickets per Ambassadeur depends on the beds of the accommodation",
            proof: "proof of accommodation under 3 months old (address; owner's name, phone, e-mail)",
            includes: "festival access + ski pass",
            prices: [
              {
                label: "7 jours (20–26 mars)",
                amount: 695,
              },
              {
                label: "4 jours (23–26 mars)",
                amount: 485,
              },
              {
                label: "1 jour pre-day (20, 21 ou 22 mars, MainStage fermée)",
                amount: 130,
              },
              {
                label: "1 jour (23–26 mars, MainStage ouverte)",
                amount: 190,
              },
            ],
          },
          {
            name: "Détenteurs de forfait de ski",
            who: "owners and/or residents of the same communes holding a 2026/27 season or year pass Espace Alpe d'Huez – Aeon (the card alone, a pedestrian pass or the Aeon flexipass do not count); one request per person",
            proof: "proof of accommodation under 3 months old + proof of purchase of the season/year pass; the organiser's deadline for the pass proof reads 'fin septembre'",
            includes: "festival access only; the holder uses their own pass for the lifts",
            prices: [
              {
                label: "7 jours",
                amount: 350,
              },
              {
                label: "4 jours",
                amount: 315,
              },
              {
                label: "1 jour pre-day",
                amount: 65,
              },
              {
                label: "1 jour (23–26 mars)",
                amount: 125,
              },
            ],
          },
          {
            name: "Travailleurs et Saisonniers",
            who: "workers and seasonal staff of the same communes, housed there; employers may pre-book under placeholder names",
            proof: "proof of accommodation under 3 months old + an employment contract signed by both parties and valid during festival week (a job promise is not proof; contract to be sent by e-mail before 'fin décembre' or the request is dropped)",
            includes: "festival access only; own pass for the lifts",
            prices: [
              {
                label: "7 jours",
                amount: 350,
              },
              {
                label: "4 jours",
                amount: 315,
              },
              {
                label: "1 jour pre-day",
                amount: 65,
              },
              {
                label: "1 jour (23–26 mars)",
                amount: 125,
              },
            ],
          },
        ],
        comfortUpgrade: {
          "7or4days": 390,
          oneDay23to26: 150,
          currency: "EUR",
          note: "mezzanine Comfort of the MainStage open Tuesday to Friday; pools, ice rink, one Alpine Coaster run",
        },
        feesNote: "every price above is in EUR; the organiser's three desk pages say two things about the bracelet and record both: under every tariff line, 'Hors coût Bracelet et Treasure Case (+15€)'; in the same pages' 'Informations importantes', 'Les tarifs inclus les frais de paiement, de dossier et votre bracelet Tomorrowland Winter'; so payment and file fees are included per the organiser, and the bracelet is both '+15 €' and 'inclus' on the same page, not settled here; no invoice; no refund, no exchange, no name change after personalisation (Ambassadeurs desk: one re-personalisation allowed until the deadline); tickets personal, resale forbidden",
        process: "request form on the desk's page → proofs checked by the municipalities and Tomorrowland → payment link by e-mail (can take long) → 7 days to pay → Paylogic confirmation → personalisation via the Tomorrowland Account (Ambassadeurs desk only; the two other desks need none)",
        contact: "ambassadeur@tomorrowlandwinter.com, text only; no ticketing request handled by phone",
        louez: "owners in Alpe d'Huez and Oz 3300 who do not attend may rent their flat through the organiser (Tomorrowland and Sunweb manage check-in, keys, cleaning, deposit); form on louez-votre-hebergement; a contract before September 2026 put the flat into the public package sale of late September 2026",
        source: "s10",
        readOn: "2026-11-16",
      },
      questions: [
        {
          q: "Tomorrowland Winter 2027 : quelle date ?",
          seen: "autocomplete ('tomorrowland winter 2027 date', 'tomorrowland winter date'); People also ask 'Quelles sont les dates de Tomorrowland Winter ?'",
          answer_from: ["s1", "s2"],
        },
        {
          q: "Où a lieu Tomorrowland Winter ?",
          seen: "People also ask (query 1, query 2 'Où se passe Tomorrowland en 2027 ?')",
          answer_from: ["s1", "s5"],
        },
        {
          q: "Quel est le prix d'une place pour Tomorrowland Winter 2027 ?",
          seen: "autocomplete ('prix', '2027 prix', '2027 tarif'); People also ask (queries 1, 3, 4, 6); related 'Prix billet tomorrowland winter 2027'",
          answer_from: ["s1"],
        },
        {
          q: "Quand les billets pour Tomorrowland Winter 2027 seront-ils disponibles ?",
          seen: "People also ask (query 3); autocomplete '2027 billetterie', '2027 tickets'",
          answer_from: ["s1", "s2"],
        },
        {
          q: "Quel est le programme / la line-up de Tomorrowland Winter 2027 ?",
          seen: "autocomplete ('2027 programme', '2027 lineup', '2027 artiste'); related 'Programmation Tomorrowland Winter 2027'",
          answer_from: ["s1"],
        },
        {
          q: "Tomorrowland Winter, ça coûte combien au total (budget) ?",
          seen: "forum: Reddit r/Tomorrowland 'Tomorrowland Winter - Ça coûte combien', 9 comments, about a year old; People also ask 'Quel budget prévoir pour Tomorrowland ?'",
          answer_from: ["s1", "s6"],
        },
        {
          q: "Le forfait de ski est-il inclus dans le billet ?",
          seen: "organiser FAQ titles; AI overview on queries 2 and 5",
          answer_from: ["s1", "s2"],
        },
        {
          q: "Peut-on acheter un billet sans hébergement ?",
          seen: "organiser FAQ 'Puis-je acheter un ticket sans hébergement ?'",
          answer_from: ["s2"],
        },
        {
          q: "Comment se rendre à l'Alpe d'Huez (Grenoble, Lyon, Genève) ?",
          seen: "organiser FAQ; AI overview prompt on query 5 ('navettes et accès à la station')",
          answer_from: ["s1", "s2", "s6"],
        },
        {
          q: "Quel est l'âge minimum pour Tomorrowland Winter ?",
          seen: "organiser FAQ",
          answer_from: ["s1", "s2"],
        },
        {
          q: "Qu'est-ce que la billetterie Ambassadeurs (résidents, propriétaires, saisonniers) ?",
          seen: "SERP query 3: three official 'ambassadeur' pages in the top 10; autocomplete '2027 ambassadeur'",
          answer_from: ["s10"],
        },
        {
          q: "Les packages 4 et 7 jours sont-ils complets ?",
          seen: "AI overview on queries 1 and 5 ('sold out')",
          answer_from: ["s1"],
        },
        {
          q: "Peut-on revendre son billet (Exchange Desk) ?",
          seen: "organiser FAQ 'Comment puis-je mettre mes Ticket(s) Festival sur l'Exchange Desk ?'",
          answer_from: ["s1", "s2"],
        },
        {
          q: "Où se garer à l'Alpe d'Huez pendant le festival ?",
          seen: "organiser FAQ 'Puis-je acheter parking à l'avance ?'",
          answer_from: ["s1", "s2"],
        },
        {
          q: "Plan de Tomorrowland Winter (scènes)",
          seen: "related searches 'Plan Tomorrowland Winter 2026' on queries 1, 2, 4",
          answer_from: ["s1"],
        },
      ],
      sources: {
        s1: {
          label: "Tomorrowland Winter, site officiel (FR): bienvenue, tickets/ticket-festival, infos-ventes/comment-commander, infos-ventes/les-canaux-officiels-de-ventes, info-pratiques/comment-y-aller, info-pratiques/horaires-d-ouverture, info-pratiques/au-festival, info-pratiques/alpe-d-huez, line-up",
          url: "https://winter.tomorrowland.com/fr/bienvenue/",
          kind: "organiser",
        },
        s2: {
          label: "Tomorrowland Winter, centre d'aide officiel (FR)",
          url: "https://faq.tomorrowlandwinter.com/hc/fr",
          kind: "organiser",
          note: "the help-centre articles used here, all under https://faq.tomorrowlandwinter.com/hc/fr/articles/: 40694299448852 (Exchange Desk), 4406896729876 (Oz 3300 package), 360038500631 (cancellation, Sunweb as booking operator), 4404976055060 ('Quelle est la Line-Up?', still 'sera dévoilée prochainement' on 2026-11-16: the help centre lags the feed)",
        },
        s3: {
          label: "Tomorrowland Account (billetterie officielle)",
          url: "https://my.tomorrowland.com/",
          kind: "seller",
        },
        s4: {
          label: "Tomorrowland Winter, 'Au fil du temps' (éditions passées)",
          url: "https://winter.tomorrowland.com/fr/bienvenue/au-fil-du-temps",
          kind: "organiser",
        },
        s5: {
          label: "Office de Tourisme de l'Alpe d'Huez, page Tomorrowland Winter et accès",
          url: "https://www.alpedhuez.com/fr/agenda/tomorrowland-winter/",
          kind: "public body",
        },
        s6: {
          label: "Transaltitude, ligne Grenoble – L'Alpe d'Huez (cars Région Auvergne-Rhône-Alpes)",
          url: "https://www.transaltitude.fr/fr/lalpe-dhuez/",
          kind: "public body",
        },
        s7: {
          label: "OpenStreetMap / Nominatim, Place Joseph Paganon, Huez (coordinates only)",
          url: "https://www.openstreetmap.org/way/1112039601",
          kind: "public body",
        },
        s8: {
          label: "Sunweb, Tomorrowland Winter 2027 (partenaire voyage officiel)",
          url: "https://www.sunweb.fr/tomorrowland-winter",
          kind: "seller",
        },
        s9: {
          label: "Alpe d'Huez, réservation des parkings couverts",
          url: "https://reservation.alpedhuez.com/services/parkings/?user-facet=winter",
          kind: "public body",
        },
        m1: {
          label: "Guettapen, 'Tomorrowland Winter 2027 dévoile sa programmation complète', 13 Nov 2026 (lead only, not a page source)",
          url: "https://www.guettapen.com/2026/11/13/tomorrowland-winter-2027-devoile-sa-programmation-complete/",
          kind: "media",
        },
        s10: {
          label: "Tomorrowland Winter, site Ambassadeurs (FR): bienvenue, billetterie-ambassadeurs (+ ambassadeurs, detenteurs-forfait, travailleurs-saisonniers), info-pratiques/mode-demploi-de-la-billetterie, louez-votre-hebergement",
          url: "https://winter.tomorrowland.com/ambassadeur/bienvenue/",
          kind: "organiser",
        },
        s11: {
          label: "Emblem, la carte d'avantages des -30 ans (Grenoble)",
          url: "https://www.emblemgrenoble.com/",
          kind: "seller",
          note: "read for what Emblem is; not a page source and not a /go/ target",
        },
        s12: {
          label: "Transaltitude, plan des arrêts de L'Alpe d'Huez pendant Tomorrowland Winter (image)",
          url: "https://www.transaltitude.fr/wp-content/uploads/2026/02/PLAN-AH-tomorrowland-PDSp-ferme.jpg",
          kind: "public body",
          note: "put online in February 2026 (path /uploads/2026/02/, Last-Modified 25 Feb 2026); names no edition; linked from the station page's March 2027 warning",
        },
      },
      not_found: ["a street address for the MainStage: the organiser prints none; Google's knowledge panel says 325 avenue de Brandes and the tourist office's snippet 70 avenue de Brandes, neither usable - the sheet anchors on the resort centre (Place Joseph Paganon)", "the stage-by-stage map ('plan') for 2027: not published by the organiser yet", "set times: the feed has withTimetable=false; times are placeholders", "the Add-On Sale date (locker, ski rental, transport pass add-ons): 'à l'approche de l'événement'", "airport shuttle operators, fares and timetables for Lyon and Genève: the organiser names the cities only; its transfers page lists partners behind a link not read here", "the on-sale state of each Festival Ticket tier (1-day Saturday etc.) inside the Paylogic shop: the shop is a JS app, read only its 'ON SALE' label on the organiser's home page", "capacity for 2027: the organiser's home says '+30,000 People of Tomorrow', the tourist office 'près de 22 000', the AI overview 25,000 - print the organiser's as its claim or none", "why 2020 and 2021 were not held: the organiser's history page skips them", "the Business Sales and Hospitality (Exclusive) package prices: on request pages only", "nationality of Kungs or Mosimann: not on any organiser page or in the feed; drop the sentence", "what Emblem offers for Tomorrowland Winter: neither the organiser's partner list nor emblemgrenoble.com says", "Sunweb's ALL IN upgrade price and its 5-day package prices: inside the booking flow only", "the Ambassadeur request forms' content: behind a form link, not read", "the exact closing date of the Ambassadeur sale: the pages say only 'EN VENTE' and 'quantité limitée'"],
    },
    go: {
      tickets: {
        url: "https://winter.tomorrowland.com/fr/tickets/",
        source: "sellers.1",
        kind: "organiser",
        title: "Les Tickets Festival et les packages de l'organisateur, catégorie par catégorie, avec le lien vers le Tomorrowland Account",
      },
      account: {
        url: "https://my.tomorrowland.com/",
        source: "s3",
        kind: "seller",
        title: "L'espace client de l'organisateur : préinscription, boutique et Exchange Desk",
      },
      horaires: {
        url: "https://winter.tomorrowland.com/fr/info-pratiques/horaires-d-ouverture/",
        source: "s1",
        kind: "organiser",
        title: "Les heures d'ouverture de chaque zone, jour par jour, selon l'organisateur",
      },
      transport: {
        url: "https://winter.tomorrowland.com/fr/info-pratiques/comment-y-aller/",
        source: "s1",
        kind: "organiser",
        title: "Train, car, avion et voiture jusqu'à l'Alpe d'Huez, selon l'organisateur",
      },
      site: {
        url: "https://winter.tomorrowland.com/fr/bienvenue/",
        source: "s1",
        kind: "organiser",
        title: "Le site de l'organisateur : Tomorrowland Winter, du 20 au 27 mars 2027 à l'Alpe d'Huez",
      },
      ambassadeur: {
        url: "https://winter.tomorrowland.com/ambassadeur/bienvenue/",
        source: "s10",
        kind: "organiser",
        title: "La billetterie de l'organisateur pour les résidents, propriétaires, travailleurs et saisonniers de l'Oisans",
      },
      faq: {
        url: "https://faq.tomorrowlandwinter.com/hc/fr",
        source: "s2",
        kind: "organiser",
        title: "Les réponses de l'organisateur sur les billets, les packages, le forfait et l'Exchange Desk",
      },
      sunweb: {
        url: "https://www.sunweb.fr/tomorrowland-winter",
        source: "s8",
        kind: "seller",
        title: "Les packages du partenaire voyage officiel, à Auris-en-Oisans et à Vaujany",
      },
      transaltitude: {
        url: "https://www.transaltitude.fr/fr/station/lalpe-dhuez/",
        source: "s6",
        kind: "public-body",
        title: "Le car Grenoble – L'Alpe d'Huez : horaires, tarifs et arrêts pendant le festival",
      },
      parking: {
        url: "https://reservation.alpedhuez.com/services/parkings/?user-facet=winter",
        source: "s9",
        kind: "public-body",
        title: "Le site de la station pour réserver une place dans un parking couvert",
      },
      office: {
        url: "https://www.alpedhuez.com/fr/agenda/tomorrowland-winter/",
        source: "s5",
        kind: "public-body",
        title: "La page de l'Office de Tourisme sur Tomorrowland Winter et l'accès à la station",
      },
      maps: {
        url: "https://www.google.com/maps/search/?api=1&query=45.0903%2C6.0655",
        source: "venue",
        kind: "maps",
        title: "Un repère sur Google Maps, aux coordonnées de la place Joseph Paganon",
      },
    },
  },
];

export const guides: Guide[] = [
  {
    slug: "fr-FR",
    createdAt: "2026-11-17T10:56:00+04:00",
    updatedAt: "2026-11-17T11:25:00+04:00",
    event: "tomorrowland-winter",
    name: "Tomorrowland Winter 2027",
    lang: "fr-FR",
    dir: "ltr",
    path: "/tomorrowland-winter/",
    hubLabel: "Français (France)",
    hubPlace: "Alpe d'Huez, France",
    hubBlurb: "Du 20 au 27 mars 2027 à l'Alpe d'Huez, en Isère. Tickets Festival avec le forfait de ski, horaires jour par jour, programmation, car depuis Grenoble et remontées entre les villages.",
    expires: {
      prices: "2026-12-28",
      // The workers' desk asks for the contract by e-mail before « fin
      // décembre » (ambassadeur.desks.2.proof): from 1 January 2027 that
      // deadline has passed, and the clause comes off until a commit puts
      // it back in the past tense (critic m2, FIX round 1).
      workersProof: "2027-01-01",
    },
    navLabel: "Pages du guide Tomorrowland Winter",
    faqLabel: "Questions fréquentes sur Tomorrowland Winter",
    updatedLine: true,
    pages: [
      {
        slug: "tomorrowland-winter",
        createdAt: "2026-11-17T10:56:00+04:00",
        updatedAt: "2026-11-17T11:25:00+04:00",
        kind: "main",
        label: "Guide",
        crumb: "Tomorrowland Winter 2027",
        title: "Tomorrowland Winter 2027 : dates, prix — guide du festival",
        description: "Tomorrowland Winter 2027 du 20 au 27 mars à l'Alpe d'Huez : prix des billets, forfait de ski compris, horaires, programmation et accès. Guide du festival.",
        h1: "Tomorrowland Winter 2027",
        anchors: [
          {
            target: "/tomorrowland-winter/billets/",
            text: "la page Billets",
          },
          {
            target: "/tomorrowland-winter/dates-lieu/",
            text: "la page Dates et lieu",
          },
          {
            target: "/tomorrowland-winter/comment-y-aller/",
            text: "la page Comment y aller",
          },
          {
            target: "/tomorrowland-winter/programmation/",
            text: "la page Programmation",
          },
        ],
        jumps: [
          {
            id: "billets",
            label: "Billets",
          },
          {
            id: "dates",
            label: "Dates",
          },
          {
            id: "acces",
            label: "Accès",
          },
          {
            id: "programmation",
            label: "Programmation",
          },
          {
            id: "budget",
            label: "Budget",
          },
          {
            id: "ambassadeurs",
            label: "Ambassadeurs",
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
        lede: "Tomorrowland Winter 2027 se tient à l'Alpe d'Huez, en Isère, du samedi 20 au samedi 27 mars 2027 [editions.0.start] [editions.0.end] [venue.city] [venue.region]. C'est la septième édition du festival d'hiver de Tomorrowland : une MainStage au centre de la station, à 1 860 m d'altitude, et des scènes en montagne sur le domaine skiable de l'Espace Alpe d'Huez [editions.0.number] [venue.name] [venue.altitude.resort_m]. Les Tickets Festival de 7, 4 et 1 jour, mis en vente le samedi 10 octobre 2026 sur le Tomorrowland Account, étaient toujours en vente le 16 novembre 2026 [editions.0.ticketState] [saleDates.2] [sellers.0]. Chaque billet comprend le forfait de ski des mêmes jours [onSite.0]. Les Packages Festival 4 et 7 jours de l'organisateur, avec hébergement, étaient complets le 16 novembre 2026 sur sa page d'accueil [editions.0.ticketState]. Sunweb, son partenaire voyage officiel, vendait encore ce jour-là ses propres packages à Auris-en-Oisans et à Vaujany [sellers.2.note]. La programmation complète est connue depuis le vendredi 13 novembre 2026 : 86 noms sur huit scènes, dont Charlotte de Witte, Dimitri Vegas & Like Mike, Lost Frequencies, Steve Aoki, Afrojack et Alok [lineup.announcedOn] [lineup.count] [lineup.stages] [lineup.acts].",
        sections: [
          {
            id: "billets",
            heading: "Billets : qui vend{{until prices}} et à quel prix{{/until}}",
            body: "L'organisateur, Tomorrowland (We Are One World, Belgique), vend ses billets lui-même, sur le Tomorrowland Account [event.organiser] [sellers.0]. Le lien vers la boutique apparaît dans le compte après la préinscription, et la confirmation d'achat vient de Paylogic [sellers.0.note]. L'organisateur conseille d'avoir son compte prêt au moins deux heures avant une vente [paymentAndRules.2]. {{until prices}}Voici les prix lus le 16 novembre 2026 sur sa page Tickets, forfait de ski compris. L'organisateur donne lui-même la part festival et la part forfait de chaque billet [prices.0.split].\n\n- Ticket Festival 7 jours, du 20 au 26 mars : 735 €, soit 346 € de festival et 389 € de forfait [prices.0].\n- Ticket Festival 4 jours, du 23 au 26 mars : 560 €, soit 317 € et 243 € [prices.2].\n- Ticket Festival 1 jour, MainStage ouverte, un jour du 23 au 26 mars : 190 €, soit 122 € et 68 € [prices.4].\n- Ticket Festival 1 jour, MainStage fermée, un jour du 20 au 22 mars : 130 €, soit 62 € et 68 € [prices.6].\n- En Comfort : 1 125 € pour 7 jours, 950 € pour 4 jours, 340 € pour 1 jour MainStage ouverte [prices.1] [prices.3] [prices.5].\n\nComptez en plus 15 € par personne pour l'envoi du bracelet, le Treasure Case, dans l'Union européenne, et 22 € pour le reste du monde [prices.7] [prices.8]. {{/until}}On paie en une fois, par Visa, Mastercard, Carte Bancaire, iDEAL, Bancontact ou Apple Pay [paymentAndRules.0]. L'achat est définitif : pas d'annulation, pas de changement de catégorie [paymentAndRules.0]. Chaque billet porte un nom et une adresse e-mail, et les e-tickets arrivent quelques semaines avant le festival [paymentAndRules.0]. Les Packages Festival 4 et 7 jours de l'organisateur, à l'Alpe d'Huez ou à Oz 3300, étaient complets le 16 novembre 2026 sur sa page d'accueil [editions.0.ticketState] [sellers.2.note]. Sunweb, qui gère les réservations de ces packages pour l'organisateur, vend en plus ses propres packages, à Auris-en-Oisans et à Vaujany, et ils étaient en vente le même jour [sellers.2] [sellers.2.note]. L'organisateur cite aussi, parmi ses partenaires officiels de voyage, le pass Culture et Emblem, sans dire ce que chacun propose [sellers.4] [sellers.3] [sellers.3.note]. La seule revente autorisée est l'Exchange Desk du Tomorrowland Account, ouvert jusqu'au mercredi 20 janvier 2027 à 23 h 59 [sellers.5] [sellers.5.note]. Les résidents, propriétaires et saisonniers des stations de l'Oisans ont une billetterie à part, décrite plus bas [ambassadeur.what]. Le détail des packages, des dates de vente et des règles de revente est sur la page Billets. → /tomorrowland-winter/billets/\n\nLiens : [Page Tickets de l'organisateur](/go/tomorrowland-winter-tickets/) · [Tomorrowland Account](/go/tomorrowland-winter-account/).",
          },
          {
            id: "dates",
            heading: "Dates et horaires",
            body: "Le festival dure du samedi 20 au samedi 27 mars 2027, heure de Paris [editions.0.start] [editions.0.end] [venue.timezone]. Les trois premiers jours, du samedi 20 au lundi 22 mars, sont des journées « MainStage fermée » : la zone principale du festival ouvre de 19 h à minuit, dernière entrée à 23 h 30 [hours.0] [hours.5]. La MainStage ouvre le mardi 23 mars [hours.5]. Du mardi 23 au vendredi 26 mars, la zone principale est ouverte de 19 h à 1 h 30, dernière entrée à 0 h 30 [hours.1]. En journée, les scènes en montagne sont ouvertes de 12 h à 17 h du samedi au lundi, puis de 12 h à 17 h 30 du mardi au vendredi [hours.2] [hours.3]. Le MOOSE BAR by day, au centre de l'Alpe d'Huez, ouvre de 15 h à 19 h 30 chaque jour du samedi au vendredi [hours.4]. Le vendredi 26 est le dernier soir dont l'organisateur publie les horaires : la zone principale ferme à 1 h 30, donc le samedi 27 mars au petit matin [hours.1]. La programmation ne compte aucune journée du samedi 27 : les derniers sets du vendredi, Quintino et Charlotte de Witte, jouent après minuit [lineup.count] [lineup.afterMidnight]. Les éditions passées et les dates de vente sont sur la page Dates et lieu. → /tomorrowland-winter/dates-lieu/\n\nLien : [Horaires d'ouverture (organisateur)](/go/tomorrowland-winter-horaires/).",
          },
          {
            id: "acces",
            heading: "Où ça se passe et comment y aller",
            body: "L'Alpe d'Huez est une station de ski de la commune de Huez, dans l'Oisans, en Isère [venue.city] [venue.region]. La station est à 1 860 m et le domaine monte à 3 330 m [venue.altitude]. La MainStage se dresse au centre de la station, et on rejoint les scènes en montagne en remontées mécaniques, avec le forfait du billet [venue.name] [onSite.0]. L'organisateur ne publie pas d'adresse précise pour la MainStage [venue.coordsNote]. Le repère est la place Joseph Paganon, au centre de l'Alpe d'Huez, 38750 Huez, où se trouve l'Office de Tourisme [venue.address]. « Ouvrir dans Maps » mène à ce point [venue.lat] [venue.lon].\n\nLa gare la plus proche est celle de Grenoble, desservie par les trains nationaux et internationaux [transport.0]. De la gare routière de Grenoble, le car Transaltitude monte à l'Alpe d'Huez en 1 h 45, avec un arrêt à Huez « Le Village » [transport.1]. {{until prices}}En ligne, l'aller simple plein tarif coûte 23,50 € et l'aller-retour 42 €, l'aller simple est à 20 € pour les moins de 26 ans, et le billet pris à bord 30 €, tarifs Transaltitude de la saison 2026-2027 lus le 16 novembre 2026 [prices.12]. {{/until}}Attention : Transaltitude prévient que, pendant le festival, certains arrêts de l'Alpe d'Huez ne seront pas desservis [transport.1]. Son plan ferme l'arrêt « Palais des sports » et garde « Place Paganon », « Éclose » et « Parking Les Bergers », mais il a été mis en ligne en février 2026 et ne nomme aucune édition : revérifiez-le avant de partir [transport.1] [sources.s12]. En avion, l'organisateur cite Lyon, Grenoble et Genève, avec des navettes depuis chaque aéroport [transport.2]. Il compte 1 h de route depuis Grenoble, 2 h depuis Lyon et moins de 5 h depuis Paris [transport.3]. En voiture, les places sont limitées et il n'y a pas de parking du festival : l'organisateur recommande le covoiturage, et les parkings couverts de la station se réservent sur le site de réservation de l'Alpe d'Huez [transport.4]. Entre les villages, on ne se déplace pas à pied, l'organisateur l'interdit [transport.9]. Les derniers départs des remontées, les pass transport du soir et les temps de trajet village par village sont sur la page Comment y aller. → /tomorrowland-winter/comment-y-aller/\n\nLiens : [Ouvrir dans Maps](/go/tomorrowland-winter-maps/) · [Transaltitude](/go/tomorrowland-winter-transaltitude/) · [Réserver un parking couvert](/go/tomorrowland-winter-parking/) · [Comment y aller (organisateur)](/go/tomorrowland-winter-transport/).",
          },
          {
            id: "programmation",
            heading: "Programmation 2027, publiée le 13 novembre 2026",
            body: "L'organisateur a mis en ligne sa programmation complète le vendredi 13 novembre 2026 [lineup.announcedOn] [lineup.announcedNote]. Elle compte 127 passages pour 86 noms, du samedi 20 au vendredi 26 mars [lineup.count]. Huit scènes, dans la graphie de l'organisateur : MAINSTAGE, CAGE, PLANAXIS, ORBYZ, FROZEN LOTUS, LIFE, MOOSE BAR by day et MOOSE BAR by night [lineup.stages]. Parmi les noms de l'affiche : Charlotte de Witte, Dimitri Vegas & Like Mike, Lost Frequencies, Steve Aoki, Afrojack, Alok, Timmy Trumpet, Oliver Heldens, Kölsch, Joris Voorn, Maceo Plex, Miss Monique, Kevin de Vries, Sara Landry et Slander [lineup.acts]. Le mercredi 24 mars est le jour le plus chargé, avec 24 passages, dont Lost Frequencies, Charlotte de Witte, Alok, Slander, John Newman et Timmy Trumpet [lineup.byDayCount] [lineup.byDay[2027-03-24]]. Le vendredi 26, dernier soir dont l'organisateur publie les horaires, affiche entre autres Dimitri Vegas & Like Mike, Lost Frequencies, Alok, Joris Voorn, Quintino et Charlotte de Witte [lineup.byDay[2027-03-26]] [hours.1]. L'organisateur ne publie ni horaires ni ordre de passage [not_found.2] [lineup.orderNote]. Le jour par jour, complet, est sur la page Programmation. → /tomorrowland-winter/programmation/",
          },
          {
            id: "budget",
            heading: "Ce que la semaine coûte",
            body: "Le budget tient en quatre postes : le billet, le transport, le logement et les extras. Le billet comprend le forfait de ski des mêmes jours sur l'Espace Alpe d'Huez, 250 km de pistes et 84 remontées réparties sur cinq stations [onSite.0] [venue.skiArea]. Il n'y a donc pas de forfait à acheter à part [onSite.0]. Si vous skiez plus de jours que le billet n'en couvre, le forfait se prolonge aux caisses SATA, pas chez Tomorrowland [onSite.0]. {{until prices}}Pour une personne qui vient de Grenoble en car avec un Ticket Festival 7 jours, le compte fait 735 € de billet, 15 € de Treasure Case et 42 € d'aller-retour, soit 792 € avant le logement et les repas [prices.0] [prices.7] [prices.12]. Avec un Ticket Festival 4 jours, le même calcul donne 617 € [prices.2] [prices.7] [prices.12]. {{/until}}Le logement : les Packages Festival 4 et 7 jours de l'organisateur, à l'Alpe d'Huez ou à Oz 3300, étaient complets le 16 novembre 2026 sur sa page d'accueil [editions.0.ticketState]. Il reste deux voies. Sunweb d'abord : le partenaire voyage officiel vendait le même jour ses propres packages de 5 ou 8 jours à Auris-en-Oisans et à Vaujany, avec l'hébergement, le forfait de ski, l'accès aux scènes en montagne (Pass Mountain Stage) et une navette du soir vers l'Alpe d'Huez à partir du mardi 23 mars [sellers.2.note]. Un package Sunweb ne donne accès à la zone du soir à l'Alpe d'Huez qu'avec l'option ALL IN, proposée pendant la réservation [sellers.2.note]. {{until prices}}Pour 8 jours à partir du samedi 20 mars, à 4 personnes et sans transport, Sunweb affichait quatre résidences « à partir de » 870 € à 1 175 € par personne, matériel de ski compris, prix lus le 16 novembre 2026 [prices.13]. {{/until}}Le prix de l'option ALL IN n'apparaît que dans le parcours de réservation [prices.13.note]. Sinon, vous vous logez par vos propres moyens à l'Alpe d'Huez ou dans l'un des villages du domaine : Auris-en-Oisans, Villard-Reculas, Oz-en-Oisans (Oz 3300) ou Vaujany [venue.skiArea.resorts]. Depuis ces villages, le soir, les pass transport Tomorrowland (remontée ou navette) relient Oz 3300, Bourg-d'Oisans, Villard-Reculas, Auris-en-Oisans et Vaujany à l'Alpe d'Huez, et s'ajoutent à l'achat du billet ou dans l'Add-On Sale [transport.8]. L'assurance ski n'est pas comprise, l'Assur'Glisse se prend aux points d'information SATA de la station [onSite.1]. Casiers, location de matériel, cours et pass transport se vendent dans l'Add-On Sale, dont la date n'était pas annoncée le 16 novembre 2026 [saleDates.3] [onSite.3]. Sur place, gobelets et assiettes sont réutilisables, contre une petite caution [onSite.2]. Nourriture et boissons de l'extérieur sont interdites, comme les aérosols et les animaux, chiens guides exceptés [onSite.2].",
          },
          {
            id: "ambassadeurs",
            heading: "Billetterie Ambassadeurs : résidents, propriétaires, saisonniers",
            body: "L'organisateur tient un site à part, en français, pour les habitants des stations de l'Oisans : la « Billetterie Ambassadeurs » [ambassadeur.what] [sources.s10]. Elle s'adresse aux propriétaires, résidents, travailleurs et saisonniers de neuf communes : Alpe d'Huez, Auris-en-Oisans, Vaujany, Villard-Reculas, Oz-en-Oisans, La Garde-en-Oisans, Le Freney-d'Oisans, Bourg-d'Oisans et Allemond [ambassadeur.communes]. Les demandes ouvrent « dès début juillet », environ deux mois avant la vente publique [ambassadeur.what]. Les billets sont limités et « non garantis », et les communes et Tomorrowland vérifient chaque justificatif [ambassadeur.what]. {{until prices}}Trois guichets. « Ambassadeurs », pour les propriétaires et résidents sans forfait de saison, avec le forfait de ski compris, à 695 € les 7 jours, 485 € les 4 jours, 130 € ou 190 € la journée [ambassadeur.desks.0]. « Détenteurs de forfait de ski » : billet seul, à 350 € les 7 jours, 315 € les 4 jours, 65 € ou 125 € la journée [ambassadeur.desks.1]. « Travailleurs et Saisonniers » : mêmes prix que les détenteurs de forfait [ambassadeur.desks.2]. Prix lus le 16 novembre 2026 sur le site Ambassadeurs de l'organisateur, dont les trois guichets affichaient ce jour-là « 7, 4 & 1 jour – en vente » [ambassadeur.state]. {{/until}}Les conditions, les justificatifs et le parcours de demande sont sur la page Billets. → /tomorrowland-winter/billets/ L'organisateur répond par écrit seulement, à ambassadeur@tomorrowlandwinter.com [ambassadeur.contact].",
          },
          {
            id: "pourquoi",
            heading: "Pourquoi ce guide existe en français",
            body: "Tomorrowland Winter a lieu en France, à l'Alpe d'Huez, et ce guide réunit en une page, en français et avec sa date de lecture, ce qui est dispersé entre le site de l'organisateur, son site Ambassadeurs, son centre d'aide, Sunweb, l'Office de Tourisme et Transaltitude : {{until prices}}les prix avec le forfait compris, {{/until}}le car depuis Grenoble, les derniers départs des remontées vers les villages et ce qu'un jour « MainStage fermée » veut dire [venue.country].",
          },
        ],
        faqHeading: "Questions fréquentes",
        faq: [
          {
            q: "Quelles sont les dates de Tomorrowland Winter 2027 ?",
            a: "Du samedi 20 au samedi 27 mars 2027, à l'Alpe d'Huez, selon la page d'accueil de l'organisateur lue le 16 novembre 2026 [editions.0] [sources.s1]. La MainStage ouvre à partir du mardi 23 mars [hours.5].",
          },
          {
            q: "Où a lieu Tomorrowland Winter ?",
            a: "À l'Alpe d'Huez, station de la commune de Huez, en Isère, à 1 860 m d'altitude [venue.city] [venue.altitude]. La MainStage est au centre de la station et les scènes en montagne sur le domaine skiable, selon l'organisateur et l'Office de Tourisme [venue.name] [sources.s1] [sources.s5].",
          },
          {
            q: "Quel est le prix d'un billet pour Tomorrowland Winter 2027 ?",
            a: "{{until prices}}Sur la page Tickets de l'organisateur, lue le 16 novembre 2026 : 735 € pour 7 jours, 560 € pour 4 jours, 190 € pour 1 jour MainStage ouverte et 130 € pour 1 jour MainStage fermée, forfait de ski compris [prices.0] [prices.2] [prices.4] [prices.6]. Plus 15 € de Treasure Case par personne dans l'Union européenne [prices.7].{{/until}}",
          },
          {
            q: "Quand les billets pour Tomorrowland Winter 2027 sont-\u2060ils en vente ?",
            a: "Les Tickets Festival de 7, 4 et 1 jour ont été mis en vente le samedi 10 octobre 2026 à 17 h, sur le Tomorrowland Account, et étaient toujours en vente le 16 novembre 2026 [saleDates.2] [sellers.0] [editions.0.ticketState]. Les Packages Festival de l'organisateur ont été mis en vente les 3 et 10 octobre 2026 et étaient complets le 16 novembre [saleDates.0] [saleDates.1] [editions.0.ticketState].",
          },
          {
            q: "Quelle est la programmation de Tomorrowland Winter 2027 ?",
            a: "86 noms publiés par l'organisateur le 13 novembre 2026, dont Charlotte de Witte, Dimitri Vegas & Like Mike, Lost Frequencies, Steve Aoki, Afrojack, Alok, Timmy Trumpet et Oliver Heldens, sur huit scènes [lineup.acts] [lineup.announcedOn] [lineup.stages]. Le jour par jour complet est sur la page Programmation de ce guide. → /tomorrowland-winter/programmation/",
          },
          {
            q: "Le forfait de ski est-\u2060il inclus dans le billet ?",
            a: "Oui. Chaque Ticket Festival comprend le forfait Espace Alpe d'Huez des mêmes jours, selon le centre d'aide de l'organisateur [onSite.0] [sources.s2]. L'assurance ski n'est pas comprise [onSite.1].",
          },
          {
            q: "Peut-on acheter un billet sans hébergement ?",
            a: "Oui. Les Tickets Festival de 7, 4 et 1 jour se vendent sans logement, selon la page Tickets de l'organisateur et son centre d'aide [editions.0.ticketState] [sellers.1] [sources.s2].",
          },
          {
            q: "Les packages 4\u00a0et 7\u00a0jours sont-\u2060ils complets ?",
            a: "Ceux de l'organisateur, oui, le 16 novembre 2026, selon sa page d'accueil [editions.0.ticketState] [sources.s1]. Les Tickets Festival sans hébergement restaient en vente le même jour, et Sunweb vendait encore ses propres packages à Auris-en-Oisans et à Vaujany, sans mention « complet » sur sa page [editions.0.ticketState] [sellers.2.note].",
          },
          {
            q: "Peut-on revendre son billet ?",
            a: "Seulement par l'Exchange Desk du Tomorrowland Account, jusqu'au mercredi 20 janvier 2027 à 23 h 59, selon l'organisateur [sellers.5.note]. La mise en vente est définitive et la revente n'est pas garantie : si le billet trouve preneur, vous êtes prévenu par e-mail au plus tard une semaine avant le festival et remboursé sous 4 à 6 semaines{{until prices}}, moins 10 € par billet{{/until}} [sellers.5.note]. Toute autre revente est interdite par ses conditions générales : chaque bracelet a un code unique et l'identité est contrôlée [paymentAndRules.3].",
          },
          {
            q: "Quel est l'âge minimum pour Tomorrowland Winter ?",
            a: "18 ans, atteints avant le premier jour du festival, sans exception, accompagné ou non, selon l'organisateur [age].",
          },
          {
            q: "Comment se rendre à l'Alpe d'Huez ?",
            a: "En train jusqu'à la gare de Grenoble, la plus proche, puis en car Transaltitude en 1 h 45{{until prices}} (23,50 € l'aller en ligne, saison 2026-2027){{/until}} ou en taxi [transport.0] [transport.1] [prices.12]. Transaltitude prévient que certains arrêts ne seront pas desservis pendant le festival [transport.1]. En avion jusqu'à Lyon, Grenoble ou Genève, puis en navette [transport.2]. Le détail est sur la page Comment y aller de ce guide. → /tomorrowland-winter/comment-y-aller/",
          },
          {
            q: "Où se garer à l'Alpe d'Huez pendant le festival ?",
            a: "Il n'y a pas de parking du festival et les places sont limitées, selon l'organisateur [transport.4]. Les parkings couverts de la station se réservent à l'avance sur le site de réservation de l'Alpe d'Huez, et l'organisateur recommande le covoiturage [transport.4] [sources.s9].",
          },
          {
            q: "Tomorrowland Winter, ça coûte combien au total ?",
            a: "{{until prices}}Pour une personne venue de Grenoble en car, billet, Treasure Case et aller-retour font 792 € avec un Ticket Festival 7 jours et 617 € avec un Ticket Festival 4 jours, aux prix de l'organisateur et de Transaltitude lus le 16 novembre 2026 [prices.0] [prices.2] [prices.7] [prices.12]. Le logement et les repas s'ajoutent. Le forfait de ski est déjà dans le billet [onSite.0].{{/until}}",
          },
          {
            q: "Qu'est-ce qu'un jour « MainStage fermée » ?",
            a: "Les samedi 20, dimanche 21 et lundi 22 mars 2027 : la MainStage n'ouvre pas, la zone principale ferme à minuit{{until prices}}, et le Ticket Festival 1 jour coûte 130 € au lieu de 190 €{{/until}}, selon les horaires et la page Tickets de l'organisateur [hours.0] [hours.5] [prices.6] [prices.4].",
          },
          {
            q: "Qu'est-ce que la billetterie Ambassadeurs ?",
            a: "La billetterie que l'organisateur réserve, sur son site Ambassadeurs, aux propriétaires, résidents, travailleurs et saisonniers de l'Espace Alpe d'Huez, de Bourg-d'Oisans et d'Allemond [ambassadeur.what] [ambassadeur.communes] [sources.s10]. Les demandes ouvrent dès début juillet, les billets sont limités et non garantis, et le 16 novembre 2026 les trois guichets affichaient encore « en vente » [ambassadeur.what] [ambassadeur.state]. {{until prices}}Un billet Ambassadeur 7 jours avec forfait coûtait 695 €, un billet 7 jours sans forfait, pour les détenteurs de forfait de saison et les saisonniers, 350 € [ambassadeur.desks.0.prices] [ambassadeur.desks.1.prices] [ambassadeur.desks.2.prices]. {{/until}}Le détail est sur la page Billets de ce guide. → /tomorrowland-winter/billets/",
          },
        ],
        sourcesHeading: "Sources",
        sources: "Tomorrowland Winter, site officiel en français : pages Bienvenue, Ticket Festival, Ticket Festival + logement, Comment commander, Les canaux officiels de ventes, Comment y aller, Horaires d'ouverture, Au festival, Alpe d'Huez, Line-up et Au fil du temps, lues le 16 novembre 2026 [sources.s1] [sources.s4]. Tomorrowland Winter, site Ambassadeurs, lu le 16 novembre 2026 [sources.s10]. Centre d'aide officiel de Tomorrowland Winter, lu le 16 novembre 2026 [sources.s2]. Tomorrowland Account, la billetterie officielle [sources.s3]. Office de Tourisme de l'Alpe d'Huez, page Tomorrowland Winter et accès, lue le 16 novembre 2026 [sources.s5]. Transaltitude, ligne Grenoble – L'Alpe d'Huez, tarifs 2026-2027 et plan des arrêts pendant le festival, lus le 16 novembre 2026 [sources.s6] [sources.s12]. Sunweb, Tomorrowland Winter 2027, partenaire voyage officiel, lu le 16 novembre 2026 [sources.s8]. Alpe d'Huez, réservation des parkings couverts [sources.s9]. Coordonnées de la place Joseph Paganon : OpenStreetMap, 16 novembre 2026 [sources.s7].",
      },
      {
        slug: "tomorrowland-winter/billets",
        createdAt: "2026-11-17T10:56:00+04:00",
        updatedAt: "2026-11-17T11:25:00+04:00",
        kind: "tickets",
        label: "Billets",
        crumb: "Billets",
        title: "Billets Tomorrowland Winter 2027 : prix — guide du festival",
        description: "Tickets Festival 7, 4 et 1 jour de Tomorrowland Winter 2027, forfait de ski compris, sur le Tomorrowland Account. Packages, revente, règles. Guide du festival.",
        h1: "Billets pour Tomorrowland Winter 2027",
        h1Keep: ["Tomorrowland", "Winter"],
        jumps: [
          {
            id: "qui-vend",
            label: "Qui vend",
          },
          {
            id: "tickets-festival",
            label: "Tickets Festival",
          },
          {
            id: "packages",
            label: "Packages",
          },
          {
            id: "sunweb",
            label: "Sunweb",
          },
          {
            id: "calendrier",
            label: "Calendrier",
          },
          {
            id: "paiement",
            label: "Paiement",
          },
          {
            id: "revente",
            label: "Revente",
          },
          {
            id: "ambassadeurs",
            label: "Ambassadeurs",
          },
          {
            id: "sources",
            label: "Sources",
          },
        ],
        lede: "Les billets de Tomorrowland Winter 2027, du samedi 20 au samedi 27 mars 2027 à l'Alpe d'Huez, se vendent sur le Tomorrowland Account, la billetterie de l'organisateur, et chaque Ticket Festival comprend le forfait de ski des jours qu'il couvre [editions.0.start] [editions.0.end] [venue.city] [sellers.0] [onSite.0]. Cette page dit qui vend, {{until prices}}ce que coûtait chaque billet le 16 novembre 2026, {{/until}}quand chaque vente a ouvert, comment on paie, comment céder un billet si vous ne pouvez plus venir, et ce que la billetterie Ambassadeurs réserve aux habitants de l'Oisans. Le 16 novembre 2026, les Packages Festival de l'organisateur étaient complets, les Tickets Festival sans hébergement restaient en vente, et Sunweb vendait ses propres packages [editions.0.ticketState].",
        sections: [
          {
            id: "qui-vend",
            heading: "Qui vend",
            body: "Tomorrowland Winter est organisé par Tomorrowland, la société belge We Are One World [event.organiser]. Il vend via son propre espace client, le Tomorrowland Account : on s'y inscrit, on se préinscrit sur la page de l'événement Tomorrowland Winter 2027, et le lien vers la boutique apparaît dans le compte [sellers.0] [sellers.0.note] [paymentAndRules.2]. La confirmation d'achat vient de Paylogic [sellers.0.note]. L'organisateur conseille de créer le compte au moins deux heures avant l'ouverture d'une vente [paymentAndRules.2]. Sa page Tickets explique les catégories et renvoie vers le compte [sellers.1]. Sunweb est son partenaire voyage officiel : il gère les réservations et les paiements des Packages Festival de l'organisateur, et il vend en plus ses propres packages, à Auris-en-Oisans et à Vaujany [sellers.2] [sellers.2.note]. L'organisateur cite aussi Emblem et le pass Culture parmi ses partenaires officiels de voyage, sans dire ce que chacun propose [sellers.3] [sellers.3.note] [sellers.4]. Hors de ces canaux, la revente est interdite par les conditions générales : chaque bracelet porte un code unique, l'identité est contrôlée à l'entrée, et l'organisateur reçoit les signalements de fraude à l'adresse fraude@tomorrowland.com [paymentAndRules.3].\n\nLiens : [Tomorrowland Account](/go/tomorrowland-winter-account/) · [Page Tickets de l'organisateur](/go/tomorrowland-winter-tickets/) · [Sunweb](/go/tomorrowland-winter-sunweb/).",
          },
          {
            id: "tickets-festival",
            heading: "Les Tickets Festival{{until prices}} et leurs prix au 16 novembre 2026{{/until}}",
            body: "Un Ticket Festival donne accès au festival et comprend le forfait de ski de l'Espace Alpe d'Huez pour les mêmes jours [onSite.0]. {{until prices}}L'organisateur affiche pour chaque billet la part festival et la part forfait, et c'est la somme des deux que vous payez [prices.0.split]. Prix lus le 16 novembre 2026 sur sa page Tickets, vendeur Tomorrowland Account, confirmation Paylogic [sources.s1] [sellers.0] :\n\n- Ticket Festival 7 jours, du samedi 20 au vendredi 26 mars : 735 €, dont 346 € de festival et 389 € de forfait [prices.0].\n- Ticket Festival Comfort 7 jours : 1 125 €, dont 736 € et 389 € [prices.1].\n- Ticket Festival 4 jours, du mardi 23 au vendredi 26 mars : 560 €, dont 317 € et 243 € [prices.2].\n- Ticket Festival Comfort 4 jours : 950 €, dont 707 € et 243 € [prices.3].\n- Ticket Festival 1 jour, MainStage ouverte, un jour au choix du mardi 23 au vendredi 26 mars : 190 €, dont 122 € et 68 € [prices.4].\n- Ticket Festival Comfort 1 jour, MainStage ouverte : 340 €, dont 272 € et 68 € [prices.5].\n- Ticket Festival 1 jour, MainStage fermée, un jour au choix du samedi 20 au lundi 22 mars : 130 €, dont 62 € et 68 € [prices.6].\n\nLe Treasure Case, l'envoi du bracelet à domicile, coûte 15 € par personne dans l'Union européenne et 22 € pour le reste du monde [prices.7] [prices.8]. La différence entre 190 € et 130 € pour un jour tient à la MainStage : elle n'ouvre qu'à partir du mardi 23 mars, et les trois premiers soirs la zone principale ferme à minuit au lieu de 1 h 30 [hours.5] [hours.0] [hours.1]. {{/until}}Le forfait compris vaut sur les 250 km de pistes et 84 remontées de l'Espace Alpe d'Huez, et il se prolonge aux caisses SATA si vous restez plus longtemps [venue.skiArea] [onSite.0]. L'assurance ski n'est pas comprise [onSite.1]. Ce que la boutique affiche comme disponible, catégorie par catégorie, se voit dans le compte au moment d'acheter : le 16 novembre 2026, la page d'accueil de l'organisateur marquait les Tickets Festival « en vente » sans détail par catégorie [editions.0.ticketState] [not_found.5].",
          },
          {
            id: "packages",
            heading: "Les Packages Festival de l'organisateur, complets le 16 novembre 2026",
            body: "Les Packages Festival de 7 et 4 jours réunissent le billet, le forfait et un logement à l'Alpe d'Huez ou à Oz 3300 [prices.9] [prices.10] [editions.0.ticketState]. Ils se vendaient dans la boutique de l'organisateur, Sunweb assurant la réservation et le paiement [prices.9] [sellers.2]. Le 16 novembre 2026, la page d'accueil de l'organisateur les affichait complets [editions.0.ticketState]. {{until prices}}Pour mémoire, leur part festival était de 316 € pour 7 jours et 282 € pour 4 jours, à laquelle s'ajoutaient le forfait, 389 € ou 243 €, et le prix du logement, qui dépend de l'hébergement choisi [prices.9] [prices.10]. Le supplément Comfort sur un package était de 390 € [prices.11]. {{/until}}Des packages avec transport (avion, train, autocar) ont été vendus avec eux et étaient complets eux aussi [transport.6]. Pour qui a un package à Oz 3300 : en journée, Oz est à une remontée des scènes en montagne et à environ 15 minutes de l'Alpe d'Huez par deux remontées directes, avec le forfait compris [onSite.4]. Le soir, le package comprend un pass transport, la remontée Oz 3300 – Alpe d'Huez (20 min) tourne en continu pendant les soirées du festival, et par mauvais temps des bus d'environ 75 minutes la remplacent [onSite.5]. Les règles de ces packages, pour ceux qui en ont un, telles que l'organisateur les publie : un acompte de 40 %{{until prices}} (2 500 € au plus){{/until}} à l'achat et le solde sous 30 jours [paymentAndRules.1]. La personnalisation est gratuite jusqu'au lundi 30 novembre 2026{{until prices}}, puis un changement de nom coûte 350 € du mardi 1er décembre 2026 au vendredi 15 janvier 2027{{/until}} [paymentAndRules.1]. Les frais d'annulation sont de 70 % jusqu'au 1er novembre 2026, un palier déjà passé le 16 novembre 2026, puis de 80 % jusqu'au 1er décembre 2026, de 90 % jusqu'au 1er février 2027 et de 100 % à partir du 1er février 2027 [paymentAndRules.1]. Pour ces packages, leur annulation ou l'acompte sur le logement, le centre d'aide de l'organisateur donne l'adresse tomorrowlandwinter@sunweb.com, Sunweb étant l'opérateur officiel de leurs réservations et de leurs paiements [sellers.2.note].",
          },
          {
            id: "sunweb",
            heading: "Les packages Sunweb, en vente le 16 novembre 2026",
            body: "Sunweb vend aussi ses propres packages, qu'il présente comme « une exclusivité Sunweb » : 5 ou 8 jours, hébergement à Auris-en-Oisans ou à Vaujany, forfait Espace Alpe d'Huez, accès aux scènes en montagne (Pass Mountain Stage) et navette du soir entre le village et l'Alpe d'Huez, aller et retour, à partir du mardi 23 mars [sellers.2.note] [transport.6]. Le festival du soir, dans la zone principale de l'Alpe d'Huez, n'est compris qu'avec l'option ALL IN, proposée pendant la réservation [sellers.2.note]. Le 16 novembre 2026, sa page ne portait aucune mention « complet » [sellers.2.note]. {{until prices}}Pour la recherche par défaut du site, 8 jours à partir du samedi 20 mars, 4 personnes, sans transport, quatre résidences s'affichaient « à partir de » 870 € par personne, aux Balcons d'Aurea à Auris-en-Oisans, jusqu'à 1 175 € aux Hauts de Vaujany, hébergement, forfait, matériel de ski et Pass Mountain Stage compris [prices.13]. Ce sont des prix « à partir de » pour cette recherche, pas une grille tarifaire [prices.13]. {{/until}}Le prix de l'option ALL IN et ceux des packages 5 jours n'apparaissent que dans le parcours de réservation [prices.13.note] [not_found].\n\nLien : [Sunweb](/go/tomorrowland-winter-sunweb/).",
          },
          {
            id: "calendrier",
            heading: "Le calendrier des ventes",
            body: "Les Packages Festival 7 jours de l'organisateur ont ouvert le samedi 3 octobre 2026 à 15 h, les Packages Festival 4 jours le samedi 10 octobre 2026 à 15 h, et les Tickets Festival de 7, 4 et 1 jour le même samedi 10 octobre à 17 h, heure de Paris [saleDates.0] [saleDates.1] [saleDates.2]. L'Add-On Sale, où se vendent les locations de matériel, les cours, les casiers, les pass transport et l'assurance ski, n'avait pas de date le 16 novembre 2026 : l'organisateur écrit qu'elle ouvrira « à l'approche de l'événement », dans le Tomorrowland Account [saleDates.3]. Les casiers y sont en nombre limité [onSite.3]. L'Exchange Desk, la revente officielle, a ouvert le 10 octobre 2026 et sa clôture est fixée au mercredi 20 janvier 2027 à 23 h 59 [sellers.5.note].",
          },
          {
            id: "paiement",
            heading: "Paiement, nom et âge",
            body: "Un Ticket Festival se paie en une fois, par Visa, Mastercard, Carte Bancaire, iDEAL, Bancontact ou Apple Pay [paymentAndRules.0]. L'achat est définitif : pas d'annulation, pas de passage à une catégorie supérieure [paymentAndRules.0]. Chaque billet est personnalisé au nom et à l'adresse e-mail de son titulaire, et les e-tickets sont envoyés quelques semaines avant le festival [paymentAndRules.0]. Il faut avoir 18 ans avant le premier jour du festival, sans exception, accompagné ou non [age].",
          },
          {
            id: "revente",
            heading: "Revendre un billet : l'Exchange Desk",
            body: "L'organisateur nomme une seule revente : l'Exchange Desk, dans le Tomorrowland Account du premier acheteur [sellers.5]. Il accepte les Tickets Festival sans hébergement achetés via Paylogic, pas les packages Sunweb ni les billets Business Sales [sellers.5.note]. Il a ouvert le 10 octobre 2026 et sa clôture est fixée au mercredi 20 janvier 2027 à 23 h 59 [sellers.5.note]. La mise en vente est définitive et ne peut pas être retirée, et la revente n'est pas garantie [sellers.5.note]. Si le billet trouve preneur, le vendeur est prévenu par e-mail au plus tard une semaine avant le festival et remboursé sous 4 à 6 semaines{{until prices}}, moins 10 € de frais par billet{{/until}} [sellers.5.note]. En dehors de l'Exchange Desk, la revente est interdite par les conditions générales [paymentAndRules.3].\n\nLien : [Tomorrowland Account](/go/tomorrowland-winter-account/).",
          },
          {
            id: "ambassadeurs",
            heading: "Billetterie Ambassadeurs : résidents, propriétaires, travailleurs et saisonniers",
            body: "L'organisateur tient un site Ambassadeurs, en français, pour les habitants des stations de l'Oisans [sources.s10] [ambassadeur.what]. Neuf communes sont concernées : Alpe d'Huez, Auris-en-Oisans, Vaujany, Villard-Reculas, Oz-en-Oisans, La Garde-en-Oisans, Le Freney-d'Oisans, Bourg-d'Oisans et Allemond [ambassadeur.communes]. Les demandes ouvrent « dès début juillet », environ deux mois avant la vente publique [ambassadeur.what]. Les billets sont en quantité limitée et « non garantis » : les communes et Tomorrowland valident chaque demande [ambassadeur.what]. Le 16 novembre 2026, les trois guichets affichaient « 7, 4 & 1 jour – en vente » [ambassadeur.state]. La date de clôture n'est pas publiée [not_found].\n\n- **Guichet Ambassadeurs** : propriétaires et résidents de ces communes sans forfait de saison ou d'année 2026/27 Espace Alpe d'Huez – Aeon, ainsi que leur famille et leurs amis, le nombre de billets dépendant du nombre de lits du logement [ambassadeur.desks.0.who]. Justificatif : une preuve de logement de moins de 3 mois, avec l'adresse et le nom, le téléphone et l'e-mail du propriétaire [ambassadeur.desks.0.proof]. Le billet comprend le festival et le forfait de ski [ambassadeur.desks.0.includes].{{until prices}} Prix : 695 € les 7 jours (20–26 mars), 485 € les 4 jours (23–26 mars), 130 € la journée du 20, 21 ou 22 mars, MainStage fermée, 190 € la journée du 23 au 26 mars, MainStage ouverte [ambassadeur.desks.0.prices].{{/until}}\n- **Guichet Détenteurs de forfait de ski** : propriétaires et résidents des mêmes communes qui ont un forfait de saison ou d'année 2026/27 Espace Alpe d'Huez – Aeon, une demande par personne [ambassadeur.desks.1.who]. La carte seule, un forfait piéton ou le flexipass Aeon ne comptent pas [ambassadeur.desks.1.who]. Justificatifs : preuve de logement de moins de 3 mois et preuve d'achat du forfait, que l'organisateur demandait pour « fin septembre » [ambassadeur.desks.1.proof]. Le billet donne le festival seul, le forfait étant déjà le vôtre pour les remontées [ambassadeur.desks.1.includes].{{until prices}} Prix : 350 € les 7 jours, 315 € les 4 jours, 65 € la journée du 20 au 22 mars, 125 € la journée du 23 au 26 mars [ambassadeur.desks.1.prices].{{/until}}\n- **Guichet Travailleurs et Saisonniers** : salariés et saisonniers de ces communes, logés sur place, les employeurs pouvant préréserver sous des noms provisoires [ambassadeur.desks.2.who]. Justificatifs : preuve de logement de moins de 3 mois et contrat de travail signé des deux parties et valable la semaine du festival{{until workersProof}}, à envoyer par e-mail avant « fin décembre », faute de quoi la demande est abandonnée{{/until}} [ambassadeur.desks.2.proof]. Une promesse d'embauche ne suffit pas [ambassadeur.desks.2.proof]. Le billet donne le festival seul{{until prices}}, aux mêmes prix que le guichet précédent : 350 €, 315 €, 65 € et 125 € [ambassadeur.desks.2.prices]{{/until}} [ambassadeur.desks.2.includes].\n\n{{until prices}}Tous ces prix ont été lus le 16 novembre 2026 sur le site Ambassadeurs de l'organisateur [ambassadeur.desks.0.prices] [ambassadeur.desks.1.prices] [ambassadeur.desks.2.prices] [ambassadeur.state]. Sous chaque ligne de tarif, le site écrit « Hors coût Bracelet et Treasure Case (+15 €) » [ambassadeur.feesNote]. Dans les « Informations importantes » de la même page, il écrit que les tarifs comprennent les frais de paiement, les frais de dossier et le bracelet Tomorrowland Winter [ambassadeur.feesNote]. Les deux mentions figurent ensemble sur chacune des trois pages de guichet [ambassadeur.feesNote]. {{/until}}Pas de facture, pas de remboursement, pas d'échange, pas de changement de nom après personnalisation, le guichet Ambassadeurs permettant une seule repersonnalisation avant la date limite [ambassadeur.feesNote]. Les billets sont nominatifs et la revente est interdite [ambassadeur.feesNote]. {{until prices}}L'option Comfort, la mezzanine de la MainStage ouverte du mardi au vendredi, avec piscines, patinoire et un tour d'Alpine Coaster, coûte 390 € sur un billet 7 ou 4 jours et 150 € sur une journée du 23 au 26 mars [ambassadeur.comfortUpgrade]. {{/until}}Le parcours : formulaire de demande sur la page du guichet, vérification des justificatifs par les communes et Tomorrowland, lien de paiement envoyé par e-mail, parfois longtemps après, 7 jours pour payer, confirmation Paylogic, puis personnalisation dans le Tomorrowland Account pour le seul guichet Ambassadeurs [ambassadeur.process]. Les questions se posent par écrit à ambassadeur@tomorrowlandwinter.com, aucune demande de billetterie n'est traitée par téléphone [ambassadeur.contact]. Les propriétaires de l'Alpe d'Huez et d'Oz 3300 qui ne viennent pas peuvent louer leur appartement via l'organisateur, Tomorrowland et Sunweb gérant l'arrivée, les clés, le ménage et la caution [ambassadeur.louez].\n\nLien : [Site Ambassadeurs (organisateur)](/go/tomorrowland-winter-ambassadeur/).",
          },
        ],
        faq: [],
        sourcesHeading: "Sources",
        sources: "Tomorrowland Winter, site officiel : pages Ticket Festival, Ticket Festival + logement, Comment commander et Les canaux officiels de ventes, lues le 16 novembre 2026 [sources.s1]. Tomorrowland Winter, site Ambassadeurs : Bienvenue, Billetterie Ambassadeurs et ses trois guichets, Mode d'emploi de la billetterie, Louez votre hébergement, lus le 16 novembre 2026 [sources.s10]. Centre d'aide officiel, lu le 16 novembre 2026 [sources.s2]. Tomorrowland Account [sources.s3]. Sunweb, Tomorrowland Winter 2027, lu le 16 novembre 2026 [sources.s8].",
      },
      {
        slug: "tomorrowland-winter/dates-lieu",
        createdAt: "2026-11-17T10:56:00+04:00",
        updatedAt: "2026-11-17T11:25:00+04:00",
        kind: "dates",
        label: "Dates et lieu",
        crumb: "Dates et lieu",
        title: "Dates de Tomorrowland Winter 2027 — guide du festival",
        description: "Tomorrowland Winter 2027 : du 20 au 27 mars à l'Alpe d'Huez, en Isère, horaires jour par jour, MainStage dès le 23 mars, éditions passées. Guide du festival.",
        h1: "Dates et lieu de Tomorrowland Winter 2027",
        h1Keep: ["Tomorrowland", "Winter"],
        anchors: [
          {
            target: "/tomorrowland-winter/billets/",
            text: "la page Billets",
          },
        ],
        jumps: [
          {
            id: "jour-par-jour",
            label: "Jour par jour",
          },
          {
            id: "samedi-27",
            label: "Samedi 27 mars",
          },
          {
            id: "lieu",
            label: "Le lieu",
          },
          {
            id: "editions",
            label: "Éditions passées",
          },
          {
            id: "ventes",
            label: "Ventes",
          },
          {
            id: "sources",
            label: "Sources",
          },
        ],
        lede: "Tomorrowland Winter 2027 a lieu du samedi 20 au samedi 27 mars 2027 à l'Alpe d'Huez, en Isère, à 1 860 m d'altitude [editions.0.start] [editions.0.end] [venue.city] [venue.altitude.resort_m]. C'est la septième édition [editions.0.number]. Depuis 2022, chaque édition s'est tenue en mars, entre le 15 et le 28 [editions.1] [editions.2] [editions.3] [editions.4] [editions.5]. L'édition 2026 s'est tenue du samedi 21 au samedi 28 mars 2026 [editions.1]. Cette page donne les horaires jour par jour, le lieu et les éditions passées avec les chiffres de l'organisateur.",
        sections: [
          {
            id: "jour-par-jour",
            heading: "Jour par jour : ce qui ouvre et à quelle heure",
            body: "Les horaires ci-dessous sont ceux de la page « Horaires d'ouverture » de l'organisateur, lus le 16 novembre 2026, heure de Paris [sources.s1] [venue.timezone].\n\n- Samedi 20, dimanche 21 et lundi 22 mars : journées « MainStage fermée ». Scènes en montagne de 12 h à 17 h. MOOSE BAR by day au centre de la station de 15 h à 19 h 30. Zone principale du festival de 19 h à minuit, dernière entrée à 23 h 30 [hours.0] [hours.2] [hours.4] [hours.5].\n- Mardi 23, mercredi 24, jeudi 25 et vendredi 26 mars : la MainStage ouvre. Scènes en montagne de 12 h à 17 h 30. MOOSE BAR by day de 15 h à 19 h 30. Zone principale de 19 h à 1 h 30, dernière entrée à 0 h 30 [hours.1] [hours.3] [hours.4] [hours.5].\n\nEn journée, on rejoint les scènes en montagne en remontées mécaniques, avec le forfait compris dans le billet [onSite.0]. Seules les remontées qui redescendent des scènes vers l'Alpe d'Huez tournent jusqu'à la fermeture des scènes [transport.7]. Les derniers départs de l'Alpe d'Huez vers les autres villages sont plus tôt : Auris 16 h 30 (skieurs seulement), Vaujany 16 h 30, Villard-Reculas 16 h 40 (skieurs seulement), Oz 3300 16 h 45, Allemond 16 h 45, Huez 17 h 50 [transport.7]. Le soir, ce sont les pass transport Tomorrowland, en remontée ou en navette, qui relient l'Alpe d'Huez à Oz 3300, Bourg-d'Oisans, Villard-Reculas, Auris-en-Oisans et Vaujany [transport.8].\n\nLien : [Horaires d'ouverture (organisateur)](/go/tomorrowland-winter-horaires/).",
          },
          {
            id: "samedi-27",
            heading: "Et le samedi 27 mars ?",
            body: "L'organisateur date l'édition du 20 au 27 mars 2027 [editions.0.start] [editions.0.end]. Le Ticket Festival 7 jours couvre du 20 au 26 mars [prices.0]. Le vendredi 26 est le dernier soir dont l'organisateur publie les horaires : la zone principale ferme à 1 h 30, c'est-à-dire le samedi 27 au petit matin [hours.1]. Sa programmation ne compte aucune journée du samedi 27 : elle va du samedi 20 au vendredi 26 [lineup.count]. Les derniers sets du vendredi, Quintino et Charlotte de Witte, jouent après minuit, donc déjà le 27 au calendrier, et l'organisateur ne donne pas leur heure [lineup.afterMidnight] [lineup.afterMidnightNote]. Il en va de même les soirs du mardi, du mercredi et du jeudi, qui ont chacun deux sets après minuit [lineup.afterMidnight]. Si vous visez cette dernière nuit, vérifiez les horaires de l'organisateur avant de réserver votre retour.",
          },
          {
            id: "lieu",
            heading: "Le lieu : l'Alpe d'Huez",
            body: "L'Alpe d'Huez est une station de ski de la commune de Huez, dans l'Oisans, en Isère, région Auvergne-Rhône-Alpes [venue.city] [venue.region]. La station est à 1 860 m, le point haut du domaine à 3 330 m [venue.altitude]. Le domaine, l'Espace Alpe d'Huez, compte 250 km de pistes et 84 remontées, partagés entre cinq stations : l'Alpe d'Huez, Auris-en-Oisans, Villard-Reculas, Oz-en-Oisans (Oz 3300) et Vaujany [venue.skiArea]. Pendant le festival, la MainStage est montée au centre de la station et les scènes en montagne sur le domaine [venue.name]. L'organisateur ne publie pas d'adresse précise pour la MainStage [venue.coordsNote]. Le repère de ce guide est la place Joseph Paganon, 38750 Huez, au centre de l'Alpe d'Huez, où se trouve l'Office de Tourisme [venue.address]. L'arrêt du car de Grenoble, L'Alpe d'Huez « Paganon », est tout près, mais Transaltitude prévient que certains arrêts ne seront pas desservis pendant le festival : son plan, mis en ligne en février 2026, garde « Place Paganon » et ferme « Palais des sports », et il faut le vérifier avant de partir [transport.1] [sources.s12]. « Ouvrir dans Maps » mène à la place Paganon [venue.lat] [venue.lon]. Dans la station, trois ascenseurs piétons sont gratuits en hiver : le Télécentre, de l'Office de Tourisme à la place Jean Moulin et au front de neige, l'Alpe Express, de la place Paganon vers l'Éclose et les Bergers, et le Huez Express, du village de Huez à l'Alpe d'Huez [transport.10].\n\nLiens : [Ouvrir dans Maps](/go/tomorrowland-winter-maps/) · [Office de Tourisme de l'Alpe d'Huez](/go/tomorrowland-winter-office/).",
          },
          {
            id: "editions",
            heading: "Les éditions passées, chiffres de l'organisateur",
            body: "La page « Au fil du temps » de l'organisateur, lue le 16 novembre 2026, raconte six éditions [sources.s4]. 2019, du 9 au 16 mars : la première, 25 000 visiteurs [editions.6]. 2022, du 19 au 26 mars : la deuxième, plus de 18 000 visiteurs et la première MainStage couverte et chauffée [editions.5]. 2023, du 18 au 25 mars : la troisième, 22 000 visiteurs et plus de 100 DJ [editions.4]. 2024, du 16 au 23 mars : la quatrième, plus de 22 000 visiteurs, huit scènes et la première scène CORE [editions.3]. 2025, du 15 au 22 mars : la cinquième, plus de 22 000 visiteurs, plus de 150 artistes et sept scènes [editions.2]. 2026, du samedi 21 au samedi 28 mars : la sixième [editions.1]. Les chiffres de fréquentation sont ceux que l'organisateur publie. Sa page passe de 2019 à 2022 sans mentionner 2020 ni 2021 et n'en donne pas la raison [editions.6] [not_found.7]. Les scènes CORE et « Reflection of Love », apparues en 2024 selon cette page, ne figurent pas dans la liste des scènes de 2027, et la page ne nomme aucune scène pour 2025 ni 2026 [lineup.stagesNote].",
          },
          {
            id: "ventes",
            heading: "Les dates de vente",
            body: "Les Packages Festival 7 jours de l'organisateur ont ouvert le samedi 3 octobre 2026 à 15 h, les Packages Festival 4 jours et les Tickets Festival le samedi 10 octobre 2026, à 15 h et à 17 h [saleDates.0] [saleDates.1] [saleDates.2]. Le 16 novembre 2026, les packages de l'organisateur étaient complets, les Tickets Festival en vente, et Sunweb vendait ses propres packages à Auris-en-Oisans et à Vaujany [editions.0.ticketState]. La clôture de l'Exchange Desk est fixée au mercredi 20 janvier 2027 à 23 h 59 [sellers.5.note]. L'Add-On Sale n'a pas encore de date [saleDates.3].{{until prices}} Les prix sont sur la page Billets. → /tomorrowland-winter/billets/ {{/until}}",
          },
        ],
        faq: [],
        sourcesHeading: "Sources",
        sources: "Tomorrowland Winter, site officiel : pages Bienvenue, Horaires d'ouverture, Alpe d'Huez, Comment y aller, Line-up et Au fil du temps, lues le 16 novembre 2026 [sources.s1] [sources.s4]. Office de Tourisme de l'Alpe d'Huez, lu le 16 novembre 2026 [sources.s5]. Transaltitude, plan des arrêts pendant le festival, vu le 16 novembre 2026 [sources.s6] [sources.s12]. OpenStreetMap pour les coordonnées de la place Joseph Paganon [sources.s7].",
      },
      {
        slug: "tomorrowland-winter/programmation",
        createdAt: "2026-11-17T10:56:00+04:00",
        updatedAt: "2026-11-17T11:25:00+04:00",
        kind: "lineup",
        label: "Programmation",
        linkTitle: "Programmation de Tomorrowland Winter 2027, jour par jour",
        crumb: "Programmation",
        title: "Programmation Tomorrowland Winter 2027 — guide du festival",
        description: "Line-up de Tomorrowland Winter 2027 jour par jour, du 20 au 26 mars à l'Alpe d'Huez : Charlotte de Witte, Lost Frequencies, Steve Aoki. Guide du festival.",
        h1: "Programmation de Tomorrowland Winter 2027",
        // Held as on Billets, Dates et lieu and Comment y aller: at 360 px Chrome
        // split « Tomorrow-land » (QA round 1, 17 Nov 2026); the note on Comment y
        // aller, written before that sweep, had this page better unheld. Only
        // « Program-mation » may still hyphenate, at 305–320 px.
        h1Keep: ["Tomorrowland", "Winter"],
        anchors: [
          {
            target: "/tomorrowland-winter/billets/",
            text: "la page Billets",
          },
        ],
        lede: "La programmation de Tomorrowland Winter 2027, du samedi 20 au samedi 27 mars 2027 à l'Alpe d'Huez, a été publiée en entier par l'organisateur le vendredi 13 novembre 2026 [editions.0.start] [editions.0.end] [venue.city] [lineup.announcedOn]. Elle compte 127 passages pour 86 noms, sur huit scènes, du samedi 20 au vendredi 26 mars [lineup.count] [lineup.stages]. Il n'y a pas de journée du samedi 27 : les sets qui débordent après minuit sont rangés sous le soir qui les commence [lineup.count] [lineup.afterMidnight]. Les horaires de passage ne sont pas publiés [not_found.2]. Les listes ci-dessous reprennent, jour par jour et en entier, les noms de la page Line-up de l'organisateur, lue le 16 novembre 2026 [lineup.byDay] [lineup.readOn].",
        sections: [
          {
            id: "line-up",
            heading: "Line-up 2027 : les noms et les scènes",
            body: "Parmi les noms de l'affiche : Charlotte de Witte, Dimitri Vegas & Like Mike, Lost Frequencies, Steve Aoki, Afrojack, Alok, Timmy Trumpet, Oliver Heldens, Kölsch, Joris Voorn, Maceo Plex, Miss Monique, Kevin de Vries, Sara Landry et Slander [lineup.acts]. Aussi, entre autres, Amber Broos, Kungs, Mosimann, John Newman, Hannah Laing, Nico Moreno, Space 92, Korolova, Sub Zero Project, Chuckie, A-Trak, Morten, Argy, Mandy, Blasterjaxx, Quintino, Yves V, Tchami, Matisse & Sadko, Dubvision, Dannic b2b Dyro, ELFIGO, Massano, Novah, HALŌ, Third Party, Gregor Salto, Brina Knauss, LNY TNZ, Sound Rush, Natte Visstick et MATTN [lineup.acts]. L'organisateur n'indique pas d'ordre de passage : sa page liste les artistes par jour, sans heure, et n'y désigne aucune tête d'affiche [lineup.orderNote]. Les huit scènes de 2027, dans sa graphie : MAINSTAGE, CAGE, PLANAXIS, ORBYZ, FROZEN LOTUS, LIFE, MOOSE BAR by day et MOOSE BAR by night [lineup.stages]. La page Line-up ne range aucun set sous une scène, seulement sous un jour [lineup.stagesNote]. La MainStage n'ouvre qu'à partir du mardi 23 mars : les trois premiers jours, tout se joue donc sur les autres scènes [hours.5]. Le plan des scènes pour 2027 n'était pas publié le 16 novembre 2026 [not_found.1].",
          },
          {
            id: "jour-par-jour",
            heading: "Jour par jour",
            body: "Les noms sont ceux de la page Line-up de l'organisateur, dans sa graphie et dans son ordre, qui n'est pas un ordre de passage [lineup.sourceNote] [lineup.orderNote]. Beaucoup jouent plusieurs jours, par exemple Afrojack, Kölsch, Oliver Heldens, Lost Frequencies, Alok, John Newman ou Charlotte de Witte [lineup.twice]. Les sets qui débordent après minuit sont rangés sous le soir qui les commence, comme le fait l'organisateur [lineup.afterMidnight] [lineup.afterMidnightNote].\n\n- **Samedi 20 mars** (MainStage fermée), 12 passages : Kölsch, Korolova, Oliver Heldens, Karakals, Afrojack, Morten, Mosimann, Baron b2b Meloko, Sub Zero Project, Blasterjaxx, Jeroen Visser, Jelle DK [lineup.byDay[2027-03-20]] [lineup.byDayCount] [hours.5].\n- **Dimanche 21 mars** (MainStage fermée), 15 passages : Benwal, Sub Zero Project, Morten, Yves V, Karakals, Lennert Wolfs, Hannah Laing, Yuuki Yoshiyama, Oliver Heldens b2b Tchami, Kungs, Natte Visstick, Jelle DK, Jerrooo, Jeroen Visser, Marsolo [lineup.byDay[2027-03-21]] [lineup.byDayCount] [hours.5].\n- **Lundi 22 mars** (MainStage fermée), 15 passages : Space 92, Hannah Laing, Afrojack, A-Trak, Gregor Salto, Novah, Third Party, Benwal b2b Olive Anguz, Joris Voorn b2b Kölsch, Korolova, Ian Asher, Lisa Korver, Jerrooo, Jelle DK, Prosit [lineup.byDay[2027-03-22]] [lineup.byDayCount] [hours.5].\n- **Mardi 23 mars** (ouverture de la MainStage), 18 passages : Steve Aoki, HALŌ, Mosimann, MC Stretch, Slander, Massano, Mila Journée, Matisse & Sadko, Miss Monique, Nico Moreno, Serafina, Sara Landry, Linska, MATTN, Meaghan, Prosit, Jelle DK, Merow b2b Moksi [lineup.byDay[2027-03-23]] [lineup.byDayCount] [hours.5]. Slander et Sara Landry jouent après minuit [lineup.afterMidnight].\n- **Mercredi 24 mars**, 24 passages, le jour le plus chargé : Lost Frequencies, Miss Monique, Meaghan, MC Stretch, Nico Moreno, Serafina, Alt8 b2b Emilija, ROW1, John Newman, Gravagerz, Manuals, Alok, Dubvision, David Latour, Kevin de Vries, Slander, Timmy Trumpet, Ian Asher, Charlotte de Witte, Koven, MR. E., Jelle DK, Effe Serieus, Prosit [lineup.byDay[2027-03-24]] [lineup.byDayCount]. Nico Moreno et Timmy Trumpet jouent après minuit [lineup.afterMidnight].\n- **Jeudi 25 mars**, 20 passages : Novah, Kevin de Vries, MATTN, Telykast, Lennert Wolfs, MC Stretch, The Saints, Sound Rush, Miss Puss b2b Pat B, LNY TNZ, Dimitri Vegas, Argy, ELFIGO, Maceo Plex, Bhaskar b2b Brina Knauss, Brian, Funkhauser, MR. E., Hansi, Amber Broos [lineup.byDay[2027-03-25]] [lineup.byDayCount]. Novah et The Saints jouent après minuit [lineup.afterMidnight].\n- **Vendredi 26 mars**, 23 passages, dernier soir dont l'organisateur publie les horaires : Dimitri Vegas & Like Mike, Alok, ELFIGO, Lucca van Damme, MC Stretch, Quintino, Dannic b2b Dyro, David Latour, Joris Voorn, Brina Knauss, Lost Frequencies, John Newman, Telykast, Manuals, The Saints, Mandy, DJ Schnake, Pat B, Charlotte de Witte, Chuckie, Funkhauser, Brian, Jelle DK [lineup.byDay[2027-03-26]] [lineup.byDayCount] [hours.1]. Quintino et Charlotte de Witte jouent après minuit, donc le samedi 27 au calendrier, et la zone principale ferme à 1 h 30 [lineup.afterMidnight] [hours.1].\n\nL'organisateur écrit « Dimitri Vegas » le jeudi et « Dimitri Vegas & Like Mike » le vendredi, et ce guide reprend ses deux graphies [lineup.twice].",
          },
          {
            id: "quel-billet",
            heading: "Quel billet pour quel jour",
            body: "Le Ticket Festival 7 jours couvre du samedi 20 au vendredi 26 mars, le Ticket Festival 4 jours du mardi 23 au vendredi 26 [prices.0] [prices.2]. {{until prices}}Pour une seule soirée, le Ticket Festival 1 jour coûte 190 € du mardi 23 au vendredi 26, MainStage ouverte, et 130 € du samedi 20 au lundi 22, MainStage fermée, prix de l'organisateur lus le 16 novembre 2026, forfait de ski compris [prices.4] [prices.6] [onSite.0]. Les prix complets et les règles d'achat sont sur la page Billets. → /tomorrowland-winter/billets/ {{/until}}\n\nLien : [Site officiel de Tomorrowland Winter](/go/tomorrowland-winter-site/).",
          },
        ],
        faq: [],
        sourcesHeading: "Sources",
        sources: "Tomorrowland Winter, site officiel, page Line-up et page Horaires d'ouverture, lues le 16 novembre 2026 [sources.s1] [lineup.readOn]. La page Line-up affiche le flux de données de l'organisateur, daté du 13 novembre 2026, qui range chaque set sous un jour de festival et donne aux sets d'après minuit la date du lendemain [lineup.announcedNote] [lineup.sourceNote] [lineup.afterMidnightNote].",
      },
      {
        slug: "tomorrowland-winter/comment-y-aller",
        createdAt: "2026-11-17T10:56:00+04:00",
        updatedAt: "2026-11-17T10:56:00+04:00",
        kind: "location",
        label: "Comment y aller",
        crumb: "Comment y aller",
        title: "Transport Tomorrowland Winter 2027 — guide du festival",
        description: "Aller à Tomorrowland Winter 2027, Alpe d'Huez : car depuis Grenoble, aéroports de Lyon et Genève, parking, remontées entre les villages. Guide du festival.",
        h1: "Comment aller à Tomorrowland Winter 2027",
        // Here and on Billets and Dates et lieu: Chrome hyphenated « Tomor-rowland »,
        // then « Win-ter », at 320–944 px where each word fits a line of its own (the
        // line-break sweep, 17 Nov 2026). Held whole, each moves to the next line; at
        // 305 px « Tomorrowland » overhangs the column by 4 px into the gutter. The
        // main page and Programmation are better unheld (measured at 17 widths).
        h1Keep: ["aller", "Tomorrowland", "Winter"],
        jumps: [
          {
            id: "train",
            label: "Train et car",
          },
          {
            id: "avion",
            label: "Avion",
          },
          {
            id: "voiture",
            label: "Voiture",
          },
          {
            id: "remontees",
            label: "Remontées",
          },
          {
            id: "soir",
            label: "Pass du soir",
          },
          {
            id: "station",
            label: "Dans la station",
          },
          {
            id: "sources",
            label: "Sources",
          },
        ],
        lede: "Tomorrowland Winter 2027 se tient à l'Alpe d'Huez, en Isère, du samedi 20 au samedi 27 mars 2027, à 1 h de route de Grenoble, 2 h de Lyon et moins de 5 h de Paris selon l'organisateur [editions.0.start] [editions.0.end] [venue.city] [transport.3]. La gare la plus proche est celle de Grenoble, d'où un car monte à la station en 1 h 45 [transport.0] [transport.1]. Pendant le festival, certains arrêts de ce car à l'Alpe d'Huez ne sont pas desservis [transport.1]. Cette page suit l'ordre d'un voyage : arriver à la station, se garer, se déplacer entre les villages le jour et le soir, et marcher dans la station.",
        sections: [
          {
            id: "train",
            heading: "En train, puis en car depuis Grenoble",
            body: "La gare la plus proche est celle de Grenoble, avec des liaisons nationales et internationales [transport.0]. L'organisateur compte environ 90 minutes de Grenoble à l'Alpe d'Huez en car ou en taxi [transport.0]. Le car est celui de Transaltitude, les cars de la Région Auvergne-Rhône-Alpes : il part de la gare routière de Grenoble, s'arrête à Huez « Le Village » et monte à l'Alpe d'Huez en 1 h 45, son terminus habituel étant L'Alpe d'Huez « Paganon », au centre de la station [transport.1] [sources.s6]. {{until prices}}Tarifs de la saison 2026-2027, lus le 16 novembre 2026 sur le site de Transaltitude : 23,50 € l'aller simple plein tarif en ligne, 42 € l'aller-retour, 20 € l'aller simple pour les moins de 26 ans, 30 € à bord, et à partir de 14,50 € avec un abonnement Cars Région [prices.12] [transport.1]. {{/until}}Pendant le festival, la desserte change. Transaltitude prévient que « certains arrêts ne seront pas desservis » en mars 2027 et renvoie aux arrêts les plus proches [transport.1]. Son plan ferme l'arrêt « Palais des sports », à côté de la zone du festival, et garde « Place Paganon », « Éclose » et « Parking Les Bergers » [transport.1] [sources.s12]. Il demande d'être à l'arrêt au moins 15 minutes avant le départ et de prévoir large pour les correspondances [transport.1]. Ce plan a été mis en ligne en février 2026 et ne nomme aucune édition, et c'est encore vers lui que la page renvoyait pour 2027 le 16 novembre 2026 : revérifiez-le avant de partir [transport.1] [sources.s12]. La place Paganon est aussi le repère de ce guide pour la MainStage, que l'organisateur ne situe pas par une adresse précise [venue.address] [venue.coordsNote].\n\nLiens : [Transaltitude](/go/tomorrowland-winter-transaltitude/) · [Ouvrir dans Maps](/go/tomorrowland-winter-maps/).",
          },
          {
            id: "avion",
            heading: "En avion",
            body: "L'organisateur cite trois aéroports : Lyon, Grenoble et Genève [transport.2]. Depuis chacun, des navettes dédiées montent à l'Alpe d'Huez, et sa page des transferts liste des navettes partagées, des voitures privées et des cars directs, ainsi que des taxis [transport.2]. Les opérateurs, les tarifs et les horaires de ces navettes ne figurent pas dans ce guide : l'organisateur renvoie, pour ces détails, à une page de transferts dédiée [not_found.4]. Des cars existent aussi depuis Lyon et Genève vers l'Alpe d'Huez, l'organisateur nomme les villes sans nommer les compagnies [transport.5].\n\nLien : [Comment y aller (organisateur)](/go/tomorrowland-winter-transport/).",
          },
          {
            id: "voiture",
            heading: "En voiture et le stationnement",
            body: "L'organisateur compte 1 h de route depuis Grenoble, 2 h depuis Lyon et moins de 5 h depuis Paris [transport.3]. Le stationnement est limité et il n'y a pas de parking du festival [transport.4]. L'organisateur recommande le covoiturage [transport.4]. Les parkings couverts de la station se réservent à l'avance sur le site de réservation de l'Alpe d'Huez [transport.4] [sources.s9]. Si vous logez dans un village du domaine, voici les distances et temps de route jusqu'à l'Alpe d'Huez que l'organisateur donne à titre indicatif [transport.9] :\n\n- Huez : 5 km, 10 min.\n- Villard-Reculas : 9 km, 45 min.\n- Bourg-d'Oisans : 16 km, 35 min.\n- Allemond : 25 km, 40 min.\n- Auris-en-Oisans : 30 km, 50 min.\n- Vaujany : 32 km, 50 min.\n- Oz 3300 : 35 km, 55 min.\n\nMarcher d'un village à l'autre est interdit par l'organisateur [transport.9].\n\nLien : [Réserver un parking couvert](/go/tomorrowland-winter-parking/).",
          },
          {
            id: "remontees",
            heading: "Entre les villages, le jour : les remontées",
            body: "Le jour, on passe d'un village à l'autre par les remontées mécaniques, avec le forfait compris dans le billet [transport.7] [onSite.0]. Toutes les scènes en montagne se trouvent à quelques pas des remontées [onSite.0]. Attention aux derniers départs de l'Alpe d'Huez vers les villages : Auris 16 h 30 (skieurs seulement), Vaujany 16 h 30, Villard-Reculas 16 h 40 (skieurs seulement), Oz 3300 16 h 45, Allemond 16 h 45, Huez 17 h 50 [transport.7]. Les scènes en montagne ferment à 17 h du samedi au lundi et à 17 h 30 du mardi au vendredi, et seules les remontées qui redescendent des scènes vers l'Alpe d'Huez tournent jusqu'à cette heure [hours.2] [hours.3] [transport.7]. Depuis Oz 3300, en journée, les scènes en montagne sont à une remontée, et l'Alpe d'Huez à environ 15 minutes par deux remontées directes [onSite.4]. Si vous restez plus de jours que votre billet n'en couvre, le forfait se prolonge aux caisses SATA, pas chez Tomorrowland [onSite.0].",
          },
          {
            id: "soir",
            heading: "Le soir : les pass transport Tomorrowland",
            body: "Le soir, les trajets entre l'Alpe d'Huez et les villages se font avec les pass transport Tomorrowland, en remontée mécanique ou en navette [transport.8]. L'organisateur les vend pour Oz 3300, Bourg-d'Oisans, Villard-Reculas, Auris-en-Oisans et Vaujany, à l'achat du billet ou plus tard dans l'Add-On Sale, dont la date n'était pas annoncée le 16 novembre 2026 [transport.8] [saleDates.3]. Les derniers départs listés plus haut sont ceux du domaine skiable en journée, pas ceux du service du soir [transport.8]. Pour Oz 3300, la remontée Oz – Alpe d'Huez, 20 minutes, tourne en continu pendant les soirées du festival, et par mauvais temps des bus d'environ 75 minutes la remplacent [onSite.5]. Un package Oz comprend ce pass [onSite.5]. La zone principale ferme à minuit du samedi 20 au lundi 22 mars et à 1 h 30 du mardi 23 au vendredi 26 [hours.0] [hours.1]. Des packages avec transport (avion, train, autocar) ont été vendus avec les Packages Festival de l'organisateur et étaient complets le 16 novembre 2026 [transport.6]. Les packages Sunweb, à Auris-en-Oisans et à Vaujany, comprennent leur propre navette du soir vers l'Alpe d'Huez et retour, à partir du mardi 23 mars [transport.6] [sellers.2.note].",
          },
          {
            id: "station",
            heading: "Dans la station : trois ascenseurs gratuits",
            body: "L'Alpe d'Huez est à 1 860 m d'altitude [venue.altitude.resort_m]. Trois ascenseurs piétons sont gratuits en hiver : le Télécentre relie l'Office de Tourisme à la place Jean Moulin et au front de neige, l'Alpe Express va de la place Paganon vers l'Éclose et les Bergers, et le Huez Express monte du village de Huez à l'Alpe d'Huez [transport.10]. Le MOOSE BAR by day, au centre de la station, ouvre de 15 h à 19 h 30 chaque jour du samedi au vendredi [hours.4].\n\nLiens : [Office de Tourisme de l'Alpe d'Huez](/go/tomorrowland-winter-office/) · [Centre d'aide de l'organisateur](/go/tomorrowland-winter-faq/).",
          },
        ],
        faq: [],
        sourcesHeading: "Sources",
        sources: "Tomorrowland Winter, site officiel : pages Comment y aller, Ticket Festival + logement, Horaires d'ouverture, Au festival et Alpe d'Huez, lues le 16 novembre 2026 [sources.s1]. Centre d'aide officiel, lu le 16 novembre 2026 [sources.s2]. Transaltitude, ligne Grenoble – L'Alpe d'Huez, tarifs 2026-2027 et plan des arrêts pendant le festival, lus le 16 novembre 2026 [sources.s6] [sources.s12]. Sunweb, Tomorrowland Winter 2027, lu le 16 novembre 2026 [sources.s8]. Office de Tourisme de l'Alpe d'Huez [sources.s5]. Alpe d'Huez, réservation des parkings couverts [sources.s9]. OpenStreetMap pour les coordonnées de la place Joseph Paganon [sources.s7].",
      },
    ],
  },
];
