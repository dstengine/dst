// Primavera Sound São Paulo: the event as the scout's sheet has it, and its
// guide in Brazilian Portuguese.
//
// Generated once from the card (~/mind/ai/dubai/events/tasks/
// 2026-10-21-primavera-sound-sao-paulo-pt.md) and edited by hand from here
// on. The sheet is section 1's YAML with the scout's three repair blocks
// merged by key, as they say (after gate 1; S1-S9 after gate 2; R1-R2 after
// its round 2), values verbatim, each keeping its readOn. Two notes the
// scout wrote as the last item of a list are that list's note, under
// `listNotes` (copy.ts reads [prices.note] there), and the spelling note
// written under `lineup.days` is that list's item with the key "spelling".
// The card's working notes (the segment, the SERP as measured, the planned
// paths) are no page's facts and stay on the card, as does the prose of
// not_found_update_2.
//
// The copy is the writer's round 2 with round 3's 23 items applied by their
// exact strings, the session's two edits after gate 2 ("por não ser da
// competência da Vara"; "direto para") and the native reader's gate-3 swaps
// (a capital on the three subpages' sources), [key] tags left in; copy.ts
// turns it into HTML. The only additions to the approved strings are marks,
// which a verbatim comparison strips:
// - {{until prices}}…{{/until}} round every figure in reais and the
//   sentences that carry it, which the build drops on the day in `expires`;
// - a relative link ("(ingressos)", "(../)") written as the page's path;
// - "(s1)" after an outlet's name as its tag, [sources.s1], so the reader
//   sees the name alone ("Fonte: organizador, Ingresse.", gate 3, G2);
// - "**Fontes**" as the sources heading, with the main page's bracket as
//   the line under it and the subpages' text after the colon as their
//   paragraph (G3).
//
// The English guide (card 2026-10-24-primavera-sound-sao-paulo-en) is the
// writer's round 2 with the session's swaps after gate 2 round 2 applied
// by their exact strings, on the same sheet, which its scout re-read on
// 24 October and added to (round 1's additions, repairs R1-R3). It is
// second in `guides`, so the Portuguese guide stays the x-default and
// keeps the hub's card. The Portuguese guide took P1-P12 from that card,
// with the session's items 2-8.
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
    slug: "primavera-sound-sao-paulo",
    createdAt: "2026-10-22T20:00:00+04:00",
    updatedAt: "2026-10-24T13:52:00+04:00",
    name: "Primavera Sound São Paulo",
    edition: { start: "2026-12-05", end: "2026-12-06" },
    // Keys whose rows carry no readOn of their own.
    readOverrides: {
      // The scout's questions, gathered with round 1 on 21 October (section
      // 1, "questions"); the copy cites the list for "nothing announced
      // about 2027 as of 21 October 2026".
      questions: "2026-10-21",
      // The scout's note under the price rows (listNotes.prices), written on
      // 21 October; what the copy cites it for, one figure a record and no
      // tier, re-read on 24 October (the English twin's scout, R2).
      "prices.note": "2026-10-24",
      // The seller's page (s22), read on 21 and 22 October and re-read
      // paragraph by paragraph on 24 October, the same words (the English
      // twin's scout, round 1); the producer's line with it, and the
      // organiser's partner strip (R2).
      "sellerPageFacts.dates": "2026-10-24",
      "sellerPageFacts.generalSale": "2026-10-24",
      "sellerPageFacts.fees.online": "2026-10-24",
      "sellerPageFacts.fees.inPerson": "2026-10-24",
      "sellerPageFacts.solidario": "2026-10-24",
      "sellerPageFacts.lineupPerDay": "2026-10-24",
      "sellerPageFacts.gates.note": "2026-10-24",
      "sellerPageFacts.payment": "2026-10-24",
      "sellerPageFacts.meiaEntrada": "2026-10-24",
      "sellerPageFacts.vip": "2026-10-24",
      "sellerPageFacts.prices": "2026-10-24",
      "sellerPageFacts.producer": "2026-10-24",
      "event.organiser": "2026-10-24",
    },
    // The MusicEvent on the guide's main page (rules.ts):
    // - the start at the gates (gates.open, 12:30) at the venue's offset on
    //   the day (venue.utcOffsetOnDay, -03:00); the end as a date
    //   (editions.0.end), since the gates' "00:00" is the next day;
    // - the address as venue.address gives it, in its parts (s7);
    // - the organiser as its own page names it (event.organiser; s1), with
    //   that page as sameAs; Bonus Track has no address of its own on the
    //   sheet and is left out;
    // - two offers without a price, one per channel the seller's page names
    //   (sellerPageFacts.generalSale): Ingresse, on sale since the general
    //   sale opened (salesTimeline.1.from), and the Working Title box office
    //   (sellers.1), both through the Ingresse hop, which is the page that
    //   publishes the box office too. Ingresse shows no lot and no figure
    //   before a login, so no price is the honest one (SEO, gate 1 note 8;
    //   the session's X2, X3: no priceValidUntil);
    // - one event a day, each with the day's acts as the organiser lists
    //   them (lineup.days.N.acts; gate 3, G1);
    // - on the English twin's page, the two days and the box office as its
    //   copy names them (perGuide.en: "Saturday 5 December", "Working
    //   Title box office"), where the shared names are the Portuguese
    //   guide's (the twin's plan 5.7; the CTO at gate 3, note 1).
    markup: {
      startDate: "2026-12-05T12:30:00-03:00",
      endDate: "2026-12-06",
      address: { streetAddress: "Av. Senador Teotônio Vilela, 261 – Interlagos", addressLocality: "São Paulo", addressRegion: "SP", postalCode: "04801-010", addressCountry: "BR" },
      organizer: { name: "Primavera Sound", url: "https://www.primaverasound.com/pt/sao-paulo" },
      offers: [
        { seller: "Ingresse", go: "ingressos", validFrom: "2026-07-28T12:00:00-03:00", availability: "InStock" },
        { seller: "Bilheteria oficial (Working Title)", go: "ingressos", availability: "InStock", perGuide: { en: { seller: "Working Title box office" } } },
      ],
      subEvents: [
        { name: "Sábado, 5 de dezembro", startDate: "2026-12-05T12:30:00-03:00", acts: "lineup.days.0.acts", perGuide: { en: { name: "Saturday 5 December" } } },
        { name: "Domingo, 6 de dezembro", startDate: "2026-12-06T12:30:00-03:00", acts: "lineup.days.1.acts", perGuide: { en: { name: "Sunday 6 December" } } },
      ],
    },
    sheet: {
      event: {
        name: "Primavera Sound São Paulo",
        slug: "primavera-sound-sao-paulo",
        organiser: "Primavera Sound (Barcelona) with Bonus Track (São Paulo) — the organiser's partner strip reads PRODUÇÃO: Primavera Sound, Bonus Track",
        kind: "music festival",
      },
      editions: [
        {
          year: 2026,
          start: "2026-12-05",
          end: "2026-12-06",
          status: "announced",
          onSale: true,
          venue: "v1",
          source: "s1",
          readOn: "2026-10-24",
          note: "header caption '5 - 6 DEC, 2026 AUTÓDROMO DE INTERLAGOS, BR'; line-up blocks 'sábado 5 dez' / 'domingo 6 dez'; ticket texts 'SÁBADO e DOMINGO (05 e 06 de dezembro)'. Return announced 17 Oct 2025 (s15, media).",
        },
        {
          year: 2024,
          status: "cancelled",
          note: "planned 30 Nov – 1 Dec 2024 at Autódromo de Interlagos, announced by the organiser on 12 Dec 2023 (s31); cancelled, refund policy published 30 Aug 2024 (s10); the 2024 seller was T4F (s10)",
          source: "s10",
          readOn: "2026-10-21",
          announcedOn: "2023-12-12",
          announcedSource: "s31",
        },
        {
          year: 2023,
          start: "2023-12-02",
          end: "2023-12-03",
          status: "held",
          venue: "v1",
          source: "s24",
          readOn: "2026-10-21",
          note: "organiser news, 22 Mar 2023: 'On 25th and 26th November and 2nd and 3rd December, it will once again take place in Buenos Aires and São Paulo'; the 20 Jul 2023 line-up post (s25) repeats 2nd and 3rd December at the Autódromo de Interlagos, 'the new site of Primavera Sound São Paulo'. Replaces the media source s18 for the 2023 dates.",
          attendance: 115000,
          attendanceSource: "s31",
        },
        {
          year: 2022,
          start: "2022-11-05",
          end: "2022-11-06",
          status: "held",
          venueName: "Distrito Anhembi, São Paulo (gates 0 and 27 on Av. Olavo Fontoura)",
          source: "s23",
          readOn: "2026-10-21",
          note: "organiser post of 1 Nov 2022, 'Informações de como chegar e ir embora do festival': gates from midday 'nos dias 05 e 06 de novembro' at the Distrito Anhembi; the first Brazilian edition; 2022 seller Eventim. The organiser's recap of 15 Nov 2022 (s26) gives the attendance: 120,000 over the week, of which 110,000 on the two Anhembi days and 10,000 at Primavera na Cidade (Cine Joia, Auditório Anhembi, Audio). Replaces the media source s13b; closes the not_found item 'exact dates of the 2022 edition at an organiser page' and the 'attendance figures' item for 2022.",
        },
      ],
      venue: {
        key: "v1",
        name: "Autódromo de Interlagos (Autódromo José Carlos Pace)",
        address: "Av. Senador Teotônio Vilela, 261 – Interlagos, São Paulo – SP, 04801-010",
        phone: "(11) 5666-8822",
        lat: -23.7018,
        lon: -46.6969,
        city: "São Paulo",
        country: "BR",
        timezone: "America/Sao_Paulo",
        utcOffsetOnDay: "-03:00",
        source: "s7",
        coordsSource: "s12",
        timezoneSource: "s4",
        readOn: "2026-10-24",
        note: "the venue's own agenda (s8) lists 'Primavera Sound 2026: 04/12/26 • 05/12/26' with a line that dates may change and must be confirmed with the organiser; the organiser and its ticket records say 5–6 Dec (Sat–Sun). Organiser wins; do not print the venue's dates.",
        nameSource: "s7b",
      },
      sideVenues: "dropped with the Primavera na Cidade subpage (Cine Joia, Audio: addresses in s9 and s12 if ever needed)",
      sellers: [
        {
          name: "Ingresse",
          url: "https://www.ingresse.com/primavera-sound-sp-2026/",
          official: true,
          source: "s2",
          readOn: "2026-10-24",
          note: "the only seller in all five organiser ticket records (sellerName 'Web', active, priority 1); organiser post s3 names Ingresse for presale and general sale",
        },
        {
          name: "Bilheteria oficial (Working Title)",
          address: "R. Bela Cintra, 1966 - Jardim Paulista, São Paulo - SP, 01415-002",
          hours: "Mon–Thu 13h–17h, except holidays",
          fee: "none",
          official: true,
          source: "s22",
          readOn: "2026-10-24",
          note: "the Rua Augusta address the press printed in July (s13) is superseded by the seller's page",
        },
      ],
      ticketTypes: [
        {
          name: "Primavera Pass",
          pt: "Passe Geral",
          covers: "pista, sábado 5 e domingo 6 de dezembro",
          organiserSlug: "abono-general-sao-paulo-2026",
          source: "s2",
          readOn: "2026-10-24",
        },
        {
          name: "Primavera Day",
          pt: "Sábado 5 de dezembro / Domingo 6 de dezembro",
          covers: "pista, one chosen day",
          organiserSlugs: ["saturday-dayticket-sao-paulo-2026", "sunday-dayticket-sao-paulo-2026"],
          source: "s2",
          readOn: "2026-10-24",
        },
        {
          name: "Área VIP",
          pt: "VIP Sábado 5 de dezembro / VIP Domingo 6 de dezembro",
          sellerName: "Área VIP (s22)",
          organiserSubtitleEn: "VIP PRIMAVERA DAY (en field only; pt empty)",
          covers: "open bar, open food, transfer para o local, zona de descanso; 'R$1.200,00 por pessoa + o valor do ingresso do lote vigente'; sold in the general sale only",
          organiserSlugs: ["saturday-dayticket-vip-sao-paulo-2026", "sunday-dayticket-vip-sao-paulo-2026"],
          source: "s2",
          readOn: "2026-10-24",
        },
      ],
      prices: [
        {
          label: "Passe Geral (Primavera Pass), price as listed by the organiser",
          amount: 765.45,
          currency: "BRL",
          status: "ONSALE",
          showFee: true,
          seller: "Ingresse",
          source: "s2",
          recordUpdated: "2026-07-30",
          readOn: "2026-10-24",
        },
        {
          label: "Sábado 5 de dezembro (Primavera Day), as listed by the organiser",
          amount: 425.25,
          currency: "BRL",
          status: "ONSALE",
          showFee: true,
          seller: "Ingresse",
          source: "s2",
          recordUpdated: "2026-07-30",
          readOn: "2026-10-24",
        },
        {
          label: "Domingo 6 de dezembro (Primavera Day), as listed by the organiser",
          amount: 425.25,
          currency: "BRL",
          status: "ONSALE",
          showFee: true,
          seller: "Ingresse",
          source: "s2",
          recordUpdated: "2026-07-30",
          readOn: "2026-10-24",
        },
        {
          label: "VIP Sábado 5 de dezembro / VIP Domingo 6 de dezembro, as listed by the organiser (seller: Área VIP)",
          amount: 1625.25,
          currency: "BRL",
          status: "ONSALE",
          showFee: true,
          seller: "Ingresse",
          source: "s2",
          recordUpdated: "2026-07-30",
          readOn: "2026-10-24",
        },
      ],
      salesTimeline: [
        {
          phase: "Pré-venda exclusiva Cartões BB Visa",
          from: "2026-07-23 12:00",
          to: "2026-07-28 10:00",
          where: "Ingresse",
          terms: "15 % off the first lot ('sobre o primeiro lote'), already applied to the shown price; up to 10 instalments; inteira, meia-entrada and solidário only; no VIP",
          source: "s3",
          readOn: "2026-10-24",
          note: "the presale window closed on 28 Jul 10:00. The BB Visa cardholders' event (s34) stays on sale for the 10-instalment plan during the general sale (s34, s35 item 2.1/2.4).",
        },
        {
          phase: "Venda geral",
          from: "2026-07-28 12:00",
          where: "Ingresse",
          terms: "VIP available from the general sale",
          source: "s3",
          readOn: "2026-10-24",
          note: "the organiser's post says 'quinta-feira, 28 de julho' — 28 Jul 2026 is a Tuesday; the press (s13) also says Tuesday 28 Jul. Print the date, not the weekday.",
        },
        {
          phase: "Primavera na Cidade sales",
          status: "confirmed",
          where: "Ingresse, one event per night",
          earlyAccess: {
            from: "2026-10-20 10:00",
            to: "2026-10-21 10:00",
            for: "'compradores de Passaporte' (the seller's word)",
            limit: "2 per CPF",
          },
          from: "2026-10-21 12:00",
          terms: "general sale limited to 4 per CPF; 20% online fee; up to 12 instalments",
          source: "s50",
          sources: ["s50", "s51", "s52"],
          readOn: "2026-10-24",
          note: "confirmed by the seller on all three event pages, in the same words; the organiser's page still carries no ticket link. The Gazeta SP story (s21) gave the same dates; it is no longer needed and stays unprinted.",
        },
      ],
      age: {
        asGiven: "Classificação etária: A classificação etária do evento é de 16 (dezesseis) anos. A entrada de menores de idade entre 5 e 15 anos será permitida desde que estejam acompanhados dos pais ou responsáveis legais mediante assinatura do termo de responsabilidade de menores, comprovado por documento de identidade. Proibida entrada de menores de 5 anos. Esta determinação está sujeita à alteração nos termos do alvará a ser expedido pelo Juízo de Direito da Vara da Infância e da Juventude.",
        links: [
          {
            title: "Termo de menor de idade",
            url: "https://drive.google.com/file/d/1tkRmaMP2wOJpapv6DzEoB6a65dwJxDBq/view",
            opens: "without login, PDF, 1 page",
          },
          {
            title: "Alvará judicial para entrada de menores a partir de 16 anos desacompanhados dos pais e/ou responsáveis legais no Festival Primavera Sound",
            url: "https://drive.google.com/file/d/1lz4iyKKU1DadO3EHTdIznhjlogJ1blFT/view?usp=sharing",
            opens: "without login, PDF, 3 pages",
          },
        ],
        alvara: {
          what: "Sentença of the Vara da Infância e da Juventude, Foro Regional II – Santo Amaro, TJSP, processo 1015292-94.2026.8.26.0002, requerente Bônus Track Entretenimento Ltda, signed 18 Aug 2026 by Juiz Alberto Alonso Munoz; 'Serve a presente sentença … como ALVARÁ JUDICIAL com validade de 180 dias'",
          covers: "'DEFIRO PARCIALMENTE O PEDIDO, para autorizar a entrada e permanência no evento … de adolescentes com 16 (dezesseis) anos completos ou mais, desacompanhados dos pais ou responsável legal, desde que' four conditions are met (classificação indicativa observed; licences valid; protection measures; no alcohol to minors)",
          doesNotCover: "'Indefiro o pedido no tocante à fixação judicial de faixas etárias para ingresso de crianças e adolescentes acompanhados de pais ou responsável, por ausência de competência jurisdicional' — the 5–15 accompanied rule is the organiser's, not the court's",
          note: "the request also named gates 12h00 and close 00h00 on both days",
          readOn: "2026-10-22",
        },
        termo: {
          what: "Bonus Track form: event, legal guardian (pai/mãe/tutor/guardião/tios/avós, nome, RG), minor, accompanying adult (nome, RG, cel)",
          requires: "'Assinatura do RESPONSÁVEL LEGAL (com reconhecimento de firma em cartório)'; 'O MENOR e o ACOMPANHANTE RESPONSÁVEL devem portar documentos de identificação oficiais.'",
          readOn: "2026-10-24",
          authorizes: "O REPRESENTANTE LEGAL do MENOR autoriza para os devidos fins e efeitos legais, que o MENOR ingresse e permaneça no EVENTO acompanhado do ACOMPANHANTE RESPONSÁVEL, maior de idade, o qual se responsabilizará pela posse, guarda e cuidados do MENOR.",
          companion: "the form names a legal guardian (Pai / Mãe / Tutor / Guardião / Tios / Avós) and a separate ACOMPANHANTE (nome, RG, cel), an adult who need not be the guardian; the seller's paragraph says 'acompanhados dos pais ou responsáveis legais' — both are recorded, the sheet does not settle which governs",
        },
        naEntrada: "the seller's paragraph does not contain the words 'na entrada' or 'exigidos'; it makes the signed termo and the ID conditions of entry ('A entrada … será permitida desde que … mediante assinatura do termo …, comprovado por documento de identidade'). Ingresse's own rule 6 adds that access to the event requires the digital ticket 'juntamente com o respectivo documento de identificação oficial com foto'. So 'o termo e o documento são exigidos na entrada' is a fair paraphrase, not a quotation — print it without quotation marks or as 'são condição de entrada'",
        minorsSixteenPlus: "the link title says 'menores a partir de 16 anos', i.e. 16 and 17; the alvará text says 'adolescentes com 16 (dezesseis) anos completos ou mais'; 'maiores de 16' (17 and over) is wrong",
        source: "s22",
        readOn: "2026-10-24",
      },
      gates: {
        open: "12:30",
        lastEntry: "22:00",
        end: "00:00",
        source: "s22",
        readOn: "2026-10-24",
        note: "show times may change (seller's page)",
      },
      lineup: {
        announcedOn: "2026-05-11",
        // media: the organiser said the line-up would come on Monday 11 May; the organiser's own line-up page carries no date
        announcedOnSource: "s16",
        // media s13; the organiser's per-day blocks are undated
        perDayPublishedOn: "2026-07-21",
        // the SP page's two day blocks give the order; s4 (line-up record, alphabetical) gives each act's day only
        source: "s1",
        readOn: "2026-10-24",
        days: [
          {
            date: "2026-12-05",
            label: "sábado 5 dez",
            acts: [
              "The Strokes",
              "FKA twigs",
              "Lily Allen performing \"West End Girl\"",
              "CMAT",
              "Courtney Barnett",
              "Danny L Harle",
              "Nation of Language",
              "Cara Delevingne",
              "Zé Ibarra",
              "John Talabot",
              "Los Thuthanaka",
              "Mannequin Pussy",
              "Model/Actriz",
              "Nick León",
              "Black Pantera",
              "Gab Ferreira",
              "Johnny Hooker",
              "Josyara",
              "LARINHX",
              "Metrika",
            ],
            headliners: ["The Strokes", "FKA twigs", "Lily Allen"],
          },
          {
            date: "2026-12-06",
            label: "domingo 6 dez",
            acts: [
              "Gorillaz",
              "Arca",
              "Yung Lean",
              "underscores",
              "Duquesa",
              "Smerz",
              "ATARASHII GAKKO!",
              "Ecco2k",
              "Gaby Amarantos",
              "Ebony",
              "Ana Frango Elétrico",
              "Machine Girl",
              "Sophia Stel",
              "This Is Lorelei",
              "Carlos Do Complexo",
              "DJ Ramon Sucesso",
              "Juana Molina",
              "Julia Mestre",
              "Melly",
              "Paulete Lindacelva",
            ],
            headliners: ["Gorillaz", "Arca", "Yung Lean"],
          },
          {
            key: "spelling",
            note: "organiser's spelling kept for every act; the seller writes 'Lily Allen', 'Carlos do Complexo', 'Atarashii Gakko!', 'This is Lorelei' (s22) where the organiser writes 'Lily Allen performing \"West End Girl\"', 'Carlos Do Complexo', 'ATARASHII GAKKO!', 'This Is Lorelei' (s1 day blocks, s4)",
            readOn: "2026-10-24",
          },
        ],
        setTimes: "not published (organiser lineup record: showDateTime false; 40 artist sets, all venue 'autodromo-interlagos', date only)",
        exclusives: {
          note: "16 international acts play only São Paulo in 2026 per the organiser's producer (media s14, 28 Sep 2026) — print as the organiser's claim or not at all",
        },
        orderSource: {
          order: "s1",
          daySplit: "s4",
          note: "s4 lists the 40 acts alphabetically with a showDate each; the printed order is the organiser's page order, which is billing, not running order — set times are not published",
          readOn: "2026-10-24",
        },
      },
      primaveraNaCidade: {
        context: "Club nights in the festival week, separate from the festival: Wednesday 2 Dec at Cine Joia, Thursday 3 Dec at Audio, Friday 4 Dec at Cine Joia, with eight acts from the festival bill (organiser page dated 19 Oct 2026, s5 pt / s43 en). Sold on Ingresse, one event per night (ticketing). One context line on the main page and the line-up page at most; not a subpage.",
        organiserPage: "s5 and s43 re-read 24 Oct: still dated 19 Oct 2026; the 'BUY TICKETS' button has an empty URL; no ticket link; no organiser post on the club nights since",
        ticketing: {
          status: "on sale",
          seller: "Ingresse",
          summary: "Ingresse sells all three nights, one event each; general sale since 21 Oct 2026 at 12:00; early access for 'Passaporte' buyers ran from 20 Oct 10:00 to 21 Oct 10:00 and is over",
          publishedBy: "the producer account that publishes the festival's own Ingresse events (producerId 15006927 on events 109923, 109925, 109893 and on the festival's 93986 and 103672); the 2 Dec cart's ticket text names 'Bonus Track Entretenimento LTDA', CNPJ 07.072.702/0001-20 (the other two carts not checked for it)",
          onSaleBasis: "each night's cart (cart.ingresse.com, opened from the event page's 'BUY TICKET', no login) lists its tickets with 'Add one' enabled; session status 'available'; config salesEnabled true. The seller's widget API marks the same items 'finished' with stock left: not what a buyer sees. Not for printing.",
          nights: [
            {
              key: "2-dec",
              date: "2026-12-02",
              weekday: "Wednesday",
              venue: "Cine Joia",
              address: "Praça Carlos Gomes, 82 – Liberdade, São Paulo",
              addressNote: "the event text says 'Liberdade'; the cart's ticket text says '– Sé'; the record's street is 'Praça Carlos Gomes, 82', CEP 01501-040. Print the street without a district, or the event text's",
              acts: ["Model/Actriz", "Smerz"],
              order: "Line-up (ordem de apresentação): Model/Actriz - Smerz",
              ingresseEvent: 109923,
              session: 153262,
              url: "https://www.ingresse.com/primaveranacidade-2026-model-actriz-smerz/",
              source: "s50",
            },
            {
              key: "3-dec",
              date: "2026-12-03",
              weekday: "Thursday",
              venue: "Audio",
              address: "Av. Francisco Matarazzo, 694 – Água Branca, São Paulo",
              acts: ["Metrika", "Sophia Stel", "Ecco2k", "underscores b2b UMRU"],
              order: "Line-up (ordem de apresentação) Metrika - Sophia Stel - Ecco2k - underscores b2b UMRU",
              areas: "two groups in the cart: PISTA and MEZANINO",
              ingresseEvent: 109925,
              session: 153264,
              url: "https://www.ingresse.com/primaveranacidade-2026-metrika-ecco2k-sophiastel-underscores/",
              source: "s51",
            },
            {
              key: "4-dec",
              date: "2026-12-04",
              weekday: "Friday",
              venue: "Cine Joia",
              address: "Praça Carlos Gomes, 82 – Liberdade, São Paulo",
              acts: ["Nation of Language", "Mannequin Pussy"],
              order: "Line-up (ordem de apresentação): Nation of Language - Mannequin Pussy",
              ingresseEvent: 109893,
              session: 153164,
              url: "https://www.ingresse.com/primaveranacidade-2026-nationoflanguage-mannequinpussy/",
              source: "s52",
            },
          ],
          doors: "19:00 ('Abertura da casa: 19h'; each session record starts 22:00 UTC, 19:00 in São Paulo); 'Os horários dos shows podem sofrer alterações'",
          earlyAccess: "'compradores de Passaporte' from 20/10 at 10h to 21/10 at 10h '(ou enquanto durarem os estoques)'; labelled 'Acesso antecipado' on the 3 and 4 Dec pages and 'Retirada antecipada' on the 2 Dec page; 'limitada a 02 ingressos por CPF'. Over on 24 Oct. 'Passaporte' is the seller's word: the organiser calls its two-day ticket Passe Geral / Full Festival Ticket, and no page joins the two names.",
          earlyAccessRecord: "the widget lists a zero-price item 'CORTESIA PISTA -PASSAPORTE PRIMAVERA SOUND', sold out, stock 0, on all three nights; absent from the cart. Record field only: never print 'free' or 'complimentary'.",
          generalSale: "'Venda geral - início em 21/10 ao meio-dia'; 'Venda geral limitada a 04 ingressos por CPF'",
          age: "'A classificação etária do evento é de 16 (dezesseis) anos. A entrada de menores de idade entre 5 e 15 anos será permitida desde que estejam acompanhados dos pais ou responsáveis legais, comprovado por documento de identidade. Proibida a entrada de menores de 5 anos.' Subject to the court's alvará. Unlike the festival's paragraph (age.asGiven), it has no 'termo de responsabilidade'. The 2 and 4 Dec pages link two 'ALVARÁS CINE JOIA' files, which were not read.",
          fees: "'Vendas online - Taxa de conveniência de 20% sobre o valor total da compra. Vendas em bilheteria - Não possuem taxa de conveniência.'",
          boxOffice: "the Working Title box office, R. Bela Cintra, 1966 - Jardim Paulista, Monday to Thursday 13h–17h except holidays; and 'Nos dias dos shows no Cine Joia e na Audio, haverá bilheteria física nas casas.'",
          payment: "credit and debit cards; Pix; Click To Pay; Google Pay; 'Parcelamento em todos os cartões de crédito em até 12 vezes - com juros a partir da segunda parcela.'",
          capacity: "Cine Joia: 'CAPACIDADE MÁXIMA: 1.300 pessoas' (cart ticket text on the 2 and 4 Dec nights)",
          prices: "not recorded for printing (session ruling, gate 2 round 1: the guide does not price the club nights)",
          lotsOn24Oct: "2 Dec lot 1; 3 Dec pista lot 2 and mezanino lot 1; 4 Dec lot 2. Drifts. Not for printing.",
          sources: ["s50", "s51", "s52"],
          readOn: "2026-10-24",
        },
        source: "s5",
        readOn: "2026-10-24",
      },
      transport: [
        {
          how: "Estação Autódromo, Linha 9-Esmeralda (ViaMobilidade 8 e 9, Motiva Trilhos). The operator's station page: 'A Estação Autódromo está próxima do Autódromo José Carlos Pace, também conhecido como Autódromo de Interlagos'. Access A: Rua Plínio Schmidt, 307. Accessible station (lifts, ramps, tactile floor, accessible toilet). Bicicletário with 261 places, daily 6h–22h, registration with photo ID at the station.",
          source: "s29",
          readOn: "2026-10-24",
          note: "viamobilidade.com.br now redirects to trilhos.motiva.com.br (CCR's Motiva Trilhos); the station page carries no operating hours and no event-day arrangements. Festival-day hours, express trains and parking stay 'not published as of 21 Oct 2026'. The 2023 media pattern (02:00 trains, R$ 30 express, 850 m, no parking) is out of the printable facts.",
        },
        {
          how: "VIP ticket includes a shuttle to the VIP area inside Interlagos, boarding point 'a confirmar'",
          source: "s22",
          readOn: "2026-10-24",
        },
        {
          how: "VIP ticket includes a transfer to the venue",
          source: "s2",
          readOn: "2026-10-21",
        },
        {
          how: "ViaMobilidade appears in the organiser's partner strip under APOIO (support) for São Paulo",
          source: "s1",
          readOn: "2026-10-24",
          note: "the English page (s39) labels the same row PARTNER (logo via-mobilidade)",
        },
      ],
      questions: [
        {
          q: "primavera sound são paulo 2026",
          seen: "autocomplete",
          answer_from: ["s1"],
        },
        {
          q: "primavera sound são paulo 2026 lineup",
          seen: "autocomplete",
          answer_from: ["s4", "s5"],
        },
        {
          q: "primavera sound são paulo line up",
          seen: "autocomplete",
          answer_from: ["s4"],
        },
        {
          q: "primavera sound são paulo 2026 preço",
          seen: "autocomplete",
          answer_from: ["s2", "s6"],
        },
        {
          q: "primavera sound são paulo 2026 ingressos",
          seen: "autocomplete",
          answer_from: ["s2", "s3", "s6"],
        },
        {
          q: "primavera sound são paulo 2026 ingressos valor",
          seen: "autocomplete",
          answer_from: ["s2", "s6"],
        },
        {
          q: "primavera sound são paulo ingressos",
          seen: "autocomplete",
          answer_from: ["s3", "s6"],
        },
        {
          q: "primavera sound são paulo 2026 vendas",
          seen: "autocomplete",
          answer_from: ["s3"],
        },
        {
          q: "primavera sound são paulo 2023",
          seen: "autocomplete",
          answer_from: ["s18"],
        },
        {
          q: "primavera sound são paulo 2024",
          seen: "autocomplete",
          answer_from: ["s10", "s11"],
        },
        {
          q: "primavera sound são paulo 2025",
          seen: "autocomplete",
          answer_from: ["s15"],
          note: "there was no 2025 edition; the return was announced 17 Oct 2025 for Dec 2026",
        },
        {
          q: "primavera sound sao paulo 2027",
          seen: "autocomplete",
          answer_from: [],
          note: "nothing announced; answer honestly",
        },
        {
          q: "Quanto custa o ingresso do Primavera Sound São Paulo 2026? Tem meia-entrada?",
          seen: "search results (press headlines 'veja os valores dos ingressos'); People also ask not seen — no pane",
          answer_from: ["s2", "s6"],
        },
        {
          q: "Onde comprar ingresso para o Primavera Sound São Paulo?",
          seen: "press headlines",
          answer_from: ["s2", "s3"],
        },
        {
          q: "Qual a classificação etária do Primavera Sound São Paulo?",
          seen: "press (s13, s14 answer it from the sales page)",
          answer_from: ["s6"],
        },
        {
          q: "Que horas abrem os portões?",
          seen: "press (s13, s14)",
          answer_from: ["s6"],
        },
        {
          q: "Como chegar ao Autódromo de Interlagos para o Primavera Sound?",
          seen: "press headlines ('como chegar ao festival')",
          answer_from: ["s7", "s18"],
        },
        {
          q: "Quem toca em cada dia? Strokes é sábado e Gorillaz domingo?",
          seen: "press (Band, Billboard per-day pieces)",
          answer_from: ["s4"],
        },
        {
          q: "O que é o Primavera na Cidade e como conseguir ingresso?",
          seen: "press (Rolling Stone, Billboard, past editions)",
          answer_from: ["s5"],
        },
        {
          q: "O Primavera Sound 2024 foi cancelado? E o reembolso?",
          seen: "press (Billboard 2024)",
          answer_from: ["s10"],
        },
        {
          q: "Qual é o line-up do Primavera Sound 2026 em São Paulo?",
          seen: "people also ask (query 1)",
          answer_from: ["s4", "s22"],
        },
        {
          q: "Quanto custa o ingresso para o Primavera Sound?",
          seen: "people also ask (queries 1, 3, 5)",
          answer_from: ["s2", "s22"],
        },
        {
          q: "Quem vai cantar no Primavera Sound 2026?",
          seen: "people also ask (queries 2, 3)",
          answer_from: ["s4", "s22"],
        },
        {
          q: "Qual o valor do ingresso do Primavera Sound 2026?",
          seen: "people also ask (queries 2, 4)",
          answer_from: ["s2", "s22"],
        },
        {
          q: "Quem são os artistas confirmados para o Primavera Sound São Paulo?",
          seen: "people also ask (queries 2, 3)",
          answer_from: ["s4", "s22"],
        },
        {
          q: "Quando começam as vendas do Primavera Sound 2026?",
          seen: "people also ask (query 3)",
          answer_from: ["s3", "s22"],
        },
        {
          q: "Quando começa a venda dos ingressos do Primavera Sound 2026?",
          seen: "people also ask (query 5)",
          answer_from: ["s3", "s22"],
        },
        {
          q: "Quem estará no line-up do Primavera Sound São Paulo 2026?",
          seen: "people also ask (query 5)",
          answer_from: ["s4", "s22"],
        },
        {
          q: "Onde será realizado o Primavera Sound 2026?",
          seen: "people also ask (query 5)",
          answer_from: ["s1", "s7", "s22"],
        },
      ],
      sources: {
        s1: {
          label: "Primavera Sound São Paulo, página oficial (pt)",
          url: "https://www.primaverasound.com/pt/sao-paulo",
          kind: "organiser",
        },
        s2: {
          label: "Primavera Sound São Paulo, ingressos (organiser ticket records behind this page)",
          url: "https://www.primaverasound.com/pt/sao-paulo/tickets-sao-paulo",
          kind: "organiser",
        },
        s3: {
          label: "Primavera Sound: Informações sobre a venda de ingressos para o Primavera Sound São Paulo 2026 (20 Jul 2026)",
          url: "https://www.primaverasound.com/pt/news/abertura-de-vendas-primavera-sound-sao-paulo",
          kind: "organiser",
        },
        s4: {
          label: "Primavera Sound: Programação Primavera Sound São Paulo 2026",
          url: "https://www.primaverasound.com/pt/sao-paulo/programacao-primavera-sound-sao-paulo",
          kind: "organiser",
        },
        s5: {
          label: "Primavera Sound: Primavera Na Cidade São Paulo 2026 (page dated 19 Oct 2026)",
          url: "https://www.primaverasound.com/pt/sao-paulo/sao-paulo-primavera-na-cidade-programme",
          kind: "organiser",
        },
        s6: {
          label: "Ingresse: Primavera Sound São Paulo - 2026",
          url: "https://www.ingresse.com/primavera-sound-sp-2026/",
          kind: "seller",
          note: "not read — Cloudflare; see Needs the pane",
        },
        s7: {
          label: "Autódromo de Interlagos, Prefeitura de São Paulo",
          url: "https://autodromodeinterlagos.prefeitura.sp.gov.br/",
          kind: "venue",
        },
        s8: {
          label: "Autódromo de Interlagos, agenda",
          url: "https://autodromodeinterlagos.prefeitura.sp.gov.br/agenda",
          kind: "venue",
        },
        s9: {
          label: "Audio, casa de shows (endereço e bilheteria)",
          url: "https://audiosp.com.br/",
          kind: "venue",
        },
        s10: {
          label: "Primavera Sound: Política de Reembolso Early Bird – Primavera Sound São Paulo 2024 (30 Aug 2024)",
          url: "https://www.primaverasound.com/pt/sao-paulo/reembolso-early-bird",
          kind: "organiser",
        },
        s11: {
          label: "Primavera Sound: São Paulo festival banner record '30 NOV - 01 DEZ 2024 AUTÓDROMO DE INTERLAGOS' (record ps23-sao-paulo, created 13 Mar 2023, CMS date 6 Dec 2023 — a record date, not an announcement; the announcement is s31)",
          url: "https://www.primaverasound.com/pt/sao-paulo",
          kind: "organiser",
        },
        s12: {
          label: "OpenStreetMap Nominatim (coordinates of Interlagos, Cine Joia, Audio)",
          url: "https://nominatim.openstreetmap.org/search?q=Aut%C3%B3dromo+de+Interlagos+S%C3%A3o+Paulo&format=json",
          kind: "public data (not one of the five kinds — coordinates only, never a reader-facing claim)",
        },
        s13: {
          label: "Rolling Stone Brasil, 21 Jul 2026: line-up por dia e preços",
          url: "https://rollingstone.com.br/?p=309595",
          kind: "media",
        },
        s13b: {
          label: "Rolling Stone Brasil, 26 Sep 2022: Primavera na Cidade 2022 (first edition, Nov 2022)",
          url: "https://rollingstone.com.br/musica/primavera-sound-confira-datas-e-atracoes-do-primavera-na-cidade-e-entenda-como-garantir-ingresso/",
          kind: "media",
        },
        s14: {
          label: "Rolling Stone Brasil, 28 Sep 2026: 16 atrações exclusivas",
          url: "https://rollingstone.com.br/?p=320386",
          kind: "media",
        },
        s15: {
          label: "Billboard Brasil, 17 Oct 2025: Primavera Sound anuncia retorno a São Paulo em 2026",
          url: "https://billboard.com.br/primavera-sound-sao-paulo-2026/",
          kind: "media",
        },
        s16: {
          label: "Billboard Brasil, 6 May 2026: data para lançar line-up (11 May); Bonus Track",
          url: "https://billboard.com.br/primavera-sound-data-line-up/",
          kind: "media",
        },
        s17: {
          label: "Billboard Brasil, 11 May 2026: line-up com Gorillaz, Lily Allen e Strokes",
          url: "https://billboard.com.br/primavera-sound-sao-paulo-2026-line-up/",
          kind: "media",
        },
        s17b: {
          label: "Billboard Brasil, 27 Sep 2023: Primavera na Cidade 2023 (Cine Joia, Audio; passport holders free)",
          url: "https://billboard.com.br/primavera-sound-confira-locais-e-divisao-de-datas-e-artistas-do-primavera-na-cidade/",
          kind: "media",
        },
        s18: {
          label: "Billboard Brasil, 1 Dec 2023: como chegar ao festival (2023 edition, 2–3 Dec, Interlagos)",
          url: "https://billboard.com.br/primavera-sound-como-chegar-ao-festival/",
          kind: "media",
        },
        s19: {
          label: "Billboard Brasil, 31 Aug 2024: Primavera Sound 2024 cancelado",
          url: "https://billboard.com.br/primavera-sound-2024-cancelado/",
          kind: "media",
        },
        s20: {
          label: "ViaMobilidade, Estação Autódromo (Linha 9-Esmeralda)",
          url: "https://www.viamobilidade.com.br/linhas-8-e-9/estacoes/autodromo",
          kind: "public body",
          note: "connection refused from here; see Needs the pane",
        },
        s21: {
          label: "Gazeta SP, Oct 2026: Primavera na Cidade sales (20/21 Oct)",
          url: "https://www.gazetasp.com.br/entretenimento/primavera-sound-sao-paulo-2026-anuncia-atracoes-e-confirma-tres-dias-de-festival-em-interlagos-ingressos-comecam-a-ser-vendidos-nesta-terca/",
          kind: "media",
          note: "403 to WebFetch and curl; its headline conflates the club nights with the festival",
        },
        s22: {
          label: "Ingresse: Primavera Sound São Paulo - 2026, event text (read by the session in the pane, 2026-10-21)",
          url: "https://www.ingresse.com/primavera-sound-sp-2026/",
          kind: "seller",
          note: "same page as s6; the rendered event text, not the price list — prices sit behind an Ingresse login the session did not pass",
        },
        s23: {
          label: "Primavera Sound: Informações de como chegar e ir embora do festival (1 Nov 2022)",
          url: "https://www.primaverasound.com/pt/sao-paulo/primavera-sound-sao-paulo-informacoes-chegada-saida-festival",
          kind: "organiser",
        },
        s24: {
          label: "Primavera Sound: Reflect what you are — Primavera Sound returns to São Paulo and Buenos Aires (22 Mar 2023)",
          url: "https://www.primaverasound.com/pt/news/reflect-what-you-are--primavera-sound-returns-to-sao-paulo-and-buenos-aires",
          kind: "organiser",
        },
        s25: {
          label: "Primavera Sound: Through the looking glass — São Paulo reveals the lineup of its second edition (20 Jul 2023)",
          url: "https://www.primaverasound.com/pt/news/a-traves-del-espejo--primavera-sound-sao-paulo-revela-el-cartel-de-su-segunda-edicion",
          kind: "organiser",
        },
        s26: {
          label: "Primavera Sound: São Paulo premieres in Brazil with an audience of 120,000 people (15 Nov 2022)",
          url: "https://www.primaverasound.com/pt/news/primavera-sound-sao-paulo-premieres-in-brazil-with-an-audience-of-120-000-people",
          kind: "organiser",
        },
        s27: {
          label: "Primavera Sound: anuncia nuevas ediciones del festival en Buenos Aires y São Paulo en 2026 (17 Oct 2025)",
          url: "https://www.primaverasound.com/pt/news/primavera-sound-anuncia-nuevas-ediciones-del-festival-en-buenos-aires-y-sao-paulo-en-2026",
          kind: "organiser",
        },
        s28: {
          label: "Primavera Sound: Gorillaz and The Strokes headline the line-ups for Buenos Aires and São Paulo (11 May 2026)",
          url: "https://www.primaverasound.com/pt/news/gorillaz-y-the-strokes-encabezan-los-inconfundibles-carteles-del-esperado-regreso-de-primavera-sound-a-buenos-aires-y-sao-paulo",
          kind: "organiser",
        },
        s29: {
          label: "ViaMobilidade 8 e 9 (Motiva Trilhos): Estação Autódromo, Linha 9-Esmeralda",
          url: "https://trilhos.motiva.com.br/viamobilidade8e9/linha-9---esmeralda/autodromo/",
          kind: "public body",
          note: "concession operator of Lines 8 and 9; s20's URL now redirects here",
        },
        s30: {
          label: "Câmara dos Deputados, Legislação Informatizada: Lei nº 12.933, de 26 de dezembro de 2013 — publicação original",
          url: "https://www2.camara.leg.br/legin/fed/lei/2013/lei-12933-26-dezembro-2013-777776-publicacaooriginal-142529-pl.html",
          kind: "public body",
          note: "planalto.gov.br does not resolve from this machine and the pane denied it; normas.leg.br (read in the pane) carries only the record, not the text",
        },
        s31: {
          label: "Primavera Sound: takes root in Latin America in front of hundreds of thousands of fans and announces its dates for 2024 (12 Dec 2023)",
          url: "https://www.primaverasound.com/pt/news/primavera-sound-arraiga-en-latinoamerica-ante-cientos-de-miles-de-fans-y-anuncia-sus-fechas-para-2024",
          kind: "organiser",
          readOn: "2026-10-22",
        },
        s32: {
          label: "Planalto: Lei nº 10.741, de 1º de outubro de 2003 (Estatuto da Pessoa Idosa), texto compilado",
          url: "https://www.planalto.gov.br/ccivil_03/leis/2003/l10.741.htm",
          kind: "public body",
          readOn: "2026-10-22",
        },
        s33: {
          label: "Assembleia Legislativa do Estado de São Paulo: Lei nº 10.858, de 31 de agosto de 2001 (atualizada até a Lei nº 14.729/2012)",
          url: "https://www.al.sp.gov.br/repositorio/legislacao/lei/2001/lei-10858-31.08.2001.html",
          kind: "public body",
          readOn: "2026-10-22",
        },
        s7b: {
          label: "Autódromo de Interlagos, Prefeitura de São Paulo — História",
          url: "https://autodromodeinterlagos.prefeitura.sp.gov.br/historia",
          kind: "venue",
          readOn: "2026-10-22",
        },
        s30b: {
          label: "Planalto: Lei nº 12.933/2013, texto compilado",
          url: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12933.htm",
          kind: "public body",
          readOn: "2026-10-22",
          note: "DNS failed on 21 Oct; reachable 22 Oct",
        },
        s34: {
          label: "Ingresse: Primavera Sound São Paulo - 2026 - Clientes Cartão BB Visa",
          url: "https://www.ingresse.com/primavera-sound-sp-26-clientes-cartoes-bb-visa/",
          kind: "seller",
        },
        s35: {
          label: "Bonus Track: Termos e condições para compra de ingressos e para entrada e permanência no evento Primavera Sound São Paulo 2026 (Google Doc linked from s22)",
          url: "https://docs.google.com/document/d/1H7Ck-xfv2OKlLWSgq5KvU8mw25jU3QZW/edit",
          kind: "organiser",
          note: "the producer's document, published through the seller's page; the '#heading=…' fragment of the seller's link left off",
        },
        s36: {
          label: "Primavera Sound 2026 São Paulo: Itens proibidos (PDF, 3 pages, linked from s22)",
          url: "https://drive.google.com/file/d/1W-OzB3462kqVQjaVaxANWNpDwyCuzzP3/view",
          kind: "organiser",
          note: "opens without login (200)",
        },
        s37: {
          label: "Ingresse: the event record behind s22 (sessions, sale status) and its 'Online Selling Rules' in pt, es, en",
          url: "https://www.ingresse.com/primavera-sound-sp-2026/",
          kind: "seller",
          note: "read in the pane from api-site.ingresse.com/events/primavera-sound-sp-2026 and /events/configs/…, the calls the page makes; the rules print on the page under the event text",
        },
        s38: {
          label: "Ingresse: Primavera Sound São Paulo '26 landing page (the official online channel named by s22 and s35)",
          url: "https://primavera-sound-sp-26.ingresse.com/",
          kind: "seller",
        },
        s39: {
          label: "Primavera Sound São Paulo, official page (en)",
          url: "https://www.primaverasound.com/en/sao-paulo",
          kind: "organiser",
        },
        s40: {
          label: "Primavera Sound São Paulo, tickets (en; the English fields of the five ticket records)",
          url: "https://www.primaverasound.com/en/sao-paulo/tickets-sao-paulo",
          kind: "organiser",
        },
        s41: {
          label: "Primavera Sound: Primavera Sound São Paulo 2026 Ticket Information (en, 20 Jul 2026)",
          url: "https://www.primaverasound.com/en/news/abertura-de-vendas-primavera-sound-sao-paulo",
          kind: "organiser",
        },
        s42: {
          label: "Primavera Sound: Programme Primavera Sound São Paulo 2026 (en)",
          url: "https://www.primaverasound.com/en/sao-paulo/programacao-primavera-sound-sao-paulo",
          kind: "organiser",
        },
        s43: {
          label: "Primavera Sound: Primavera Na Cidade São Paulo 2026 (en)",
          url: "https://www.primaverasound.com/en/sao-paulo/sao-paulo-primavera-na-cidade-programme",
          kind: "organiser",
        },
        s44: {
          label: "GRU Airport: To/From the Airport – Train (en)",
          url: "https://www.gru.com.br/en/passenger/to-from-gru-airport/train",
          kind: "public body",
          note: "the airport's concessionaire; nearest of the five kinds, as s29 is",
        },
        s45: {
          label: "ViaMobilidade 8 e 9 (Motiva Trilhos): Linha 9-Esmeralda",
          url: "https://trilhos.motiva.com.br/viamobilidade8e9/linha-9---esmeralda/",
          kind: "public body",
        },
        s46: {
          label: "GOV.UK: Brazil travel advice, entry requirements",
          url: "https://www.gov.uk/foreign-travel-advice/brazil/entry-requirements",
          kind: "public body",
        },
        s47: {
          label: "Government of Canada: Travel advice and advisories, Brazil (entry and exit requirements)",
          url: "https://travel.gc.ca/destinations/brazil",
          kind: "public body",
        },
        s48: {
          label: "Ingresse help centre: Ticket purchase (foreigners)",
          url: "https://ingresse.freshdesk.com/support/solutions/articles/8000107097-ticket-purchase",
          kind: "seller",
        },
        s49: {
          label: "Ingresse help centre: Onde encontro o meu ingresso após a compra? (Como acessar)",
          url: "https://ingresse.freshdesk.com/support/solutions/articles/8000121256-onde-encontro-o-meu-ingresso-ap%C3%B3s-a-compra-como-acessar-",
          kind: "seller",
        },
        s50: {
          label: "Ingresse: Primavera na Cidade - Smerz + Model/Actriz (2 Dec 2026, Cine Joia)",
          url: "https://www.ingresse.com/primaveranacidade-2026-model-actriz-smerz/",
          kind: "seller",
          note: "event 109923; read from api-site.ingresse.com/events/<slug>, its config, and the cart the page opens",
        },
        s51: {
          label: "Ingresse: Primavera na Cidade - underscores b2b UMRU + Ecco2k + Sophia Stel + Metrika (3 Dec 2026, Audio)",
          url: "https://www.ingresse.com/primaveranacidade-2026-metrika-ecco2k-sophiastel-underscores/",
          kind: "seller",
          note: "event 109925; read as s50",
        },
        s52: {
          label: "Ingresse: Primavera na Cidade - Nation of Language + Mannequin Pussy (4 Dec 2026, Cine Joia)",
          url: "https://www.ingresse.com/primaveranacidade-2026-nationoflanguage-mannequinpussy/",
          kind: "seller",
          note: "event 109893; read as s50",
        },
      },
      // From s22, all read on 2026-10-21 (the official seller), except payment and
      // meiaEntrada, verbatim from the re-read of 22 October (readOverrides).
      sellerPageFacts: {
        dates: "December 5, 6, 2026 · Autódromo de Interlagos - São Paulo; Sat 5 Dec 12:30 PM, Sun 6 Dec 12:30 PM",
        producer: "Bonus Track (Luiz Oscar and Luiz Guilherme Niemeyer) in co-production with Primavera Sound, presented by Heineken",
        lineupPerDay: "matches the organiser's two blocks act for act (s4)",
        address: "Autódromo de Interlagos - Av. Senador Teotônio Vilela, 261 - Interlagos - CEP 04801-010",
        gates: {
          open: "12:30",
          lastEntry: "22:00",
          end: "00:00",
          note: "show times may change; official updates on instagram.com/bonustrack.live and instagram.com/primaverasound.saopaulo",
        },
        age: "Classificação etária: A classificação etária do evento é de 16 (dezesseis) anos. A entrada de menores de idade entre 5 e 15 anos será permitida desde que estejam acompanhados dos pais ou responsáveis legais mediante assinatura do termo de responsabilidade de menores, comprovado por documento de identidade. Proibida entrada de menores de 5 anos. Esta determinação está sujeita à alteração nos termos do alvará a ser expedido pelo Juízo de Direito da Vara da Infância e da Juventude.",
        boxOffice: {
          name: "Working Title",
          address: "R. Bela Cintra, 1966 - Jardim Paulista, São Paulo - SP, 01415-002",
          hours: "Monday to Thursday 13h–17h, except holidays",
          fee: "none",
          note: "supersedes the Rua Augusta address the press printed in July (s13)",
        },
        generalSale: "from 28 July at 12h on Ingresse, while stock lasts, at each lot's price; official channels: primavera-sound-sp-26.ingresse.com and the official box office",
        fees: {
          online: "20 % convenience fee on the total",
          inPerson: "none",
        },
        solidario: "part of the takings goes to partner charities; open to everyone, no proof needed; no food donation required on the day",
        meiaEntrada: "Para compras pela Internet é necessária a comprovação do direito ao benefício da meia-entrada no acesso ao evento. Para Bilheteria é necessária a comprovação do direito ao benefício da meia-entrada no ato da compra e no acesso ao evento.",
        vip: "exclusive shuttle to the VIP area inside Interlagos (boarding point a confirmar), rest area, open food, open bar premium, covered air-conditioned structure",
        payment: "Parcelamento digital e na bilheteria física para clientes de outros bancos, que não Cartões BB Visa: em até 8x com juros em todos os cartões aceitos. Cartões de crédito e débito (MASTERCARD, VISA, ELO, AMERICAN EXPRESS, DISCOVER, HIPERCARD, DINERS, JCB) ; Pix ; Click To Pay ; Google Pay. Não será aceito dinheiro como forma de pagamento.",
        prices: "NOT readable — the Buy button leads to a login wall; the organiser's listed figures (s2) stay the only sourced prices, with the note that the seller shows lot prices after login",
      },
      not_found: [
        "inteira / meia-entrada / solidário prices and the current lot at the seller (behind an Ingresse login; organiser lists one figure per type)",
        "which documents count for meia-entrada (the seller states only when proof is shown)",
        "Primavera na Cidade ticket sales: seller page, prices, dates (organiser page has no ticket link; Gazeta SP claims 20/21 Oct sales)",
        "set times (organiser record: date only; the seller says times may change)",
        "a 2026 transport page from the organiser, ViaMobilidade or SPTrans; the Autódromo station's hours",
        "an official route from Guarulhos (GRU) or Congonhas (CGH) airports to the venue",
        "exact dates of the 2022 edition at an organiser page",
        "lockers, accessibility, parking and the Primavera Sound app for São Paulo 2026",
        "attendance figures for past editions from the organiser",
      ],
      closed_by_the_pane_read: [
        "minimum age and minors' rules (s22)",
        "gate, last-entry and end times (s22)",
        "official box office address and hours (s22 — Working Title, R. Bela Cintra 1966; not Rua Augusta)",
        "20 % online fee, none in person (s22)",
        "meia-entrada proof rule and ingresso solidário terms (s22)",
        "payment methods and instalments (s22)",
      ],
      // The organiser's posts carry the dates the sheet first took from the press.
      announcements: [
        {
          what: "2026 edition announced (5–6 Dec 2026, Autódromo de Interlagos, with Bonus Track)",
          on: "2025-10-17",
          source: "s27",
          readOn: "2026-10-21",
          note: "replaces s15 (media) as the source for the return announcement",
        },
        {
          what: "2026 line-up announced (Gorillaz, The Strokes headline; 'at the Interlagos Circuit in São Paulo, a site that already hosted the 2023 edition')",
          on: "2026-05-11",
          source: "s28",
          readOn: "2026-10-21",
          note: "replaces s16/s17 (media) as lineup.announcedOnSource",
        },
        {
          what: "s27 counts 2026 as the third São Paulo edition",
          quote: "Las terceras ediciones de Primavera Sound Buenos Aires y Primavera Sound São Paulo llegarán en 2026.",
          language: "es",
          note: "the post's text is Spanish on every language path of the site; its pt field is empty",
          source: "s27",
          on: "2025-10-17",
          readOn: "2026-10-22",
        },
        {
          what: "s28 counts two editions held, 2022 and 2023",
          quote: "The festival will thus return to two cities that are already part of its recent history: just two editions, in 2022 and 2023, were enough to forge a strong bond that has not weakened.",
          language: "en",
          note: "English on every language path; pt field empty",
          source: "s28",
          on: "2026-05-11",
          readOn: "2026-10-22",
        },
        {
          what: "2024 edition announced (30 Nov – 1 Dec 2024; later cancelled)",
          on: "2023-12-12",
          source: "s31",
          readOn: "2026-10-22",
          quote: "It will be followed by the third editions of Primavera Sound Buenos Aires (23rd and 24th November) and São Paulo (30th November and 1st December)",
          language: "en",
          attendance2023: "the 115,000 of Primavera Sound São Paulo",
        },
      ],
      // The law, read at the Câmara's original publication (s30) and at Planalto's compiled text (s30b).
      meiaEntrada: {
        law: "Lei nº 12.933, de 26 de dezembro de 2013 (DOU 27/12/2013, Seção 1, p. 4)",
        source: "s30",
        readOn: "2026-10-21",
        who_and_proof: [
          {
            who: "estudantes regularmente matriculados",
            proof: "Carteira de Identificação Estudantil (CIE), apresentada na compra e na entrada",
            article: "Art. 1º, § 2º",
            validity: "a CIE vale da data de expedição até 31 de março do ano subsequente (Art. 1º, § 6º)",
          },
          {
            who: "pessoas com deficiência, inclusive seu acompanhante quando necessário",
            proof: "na forma do regulamento",
            article: "Art. 1º, § 8º",
          },
          {
            who: "jovens de 15 a 29 anos de baixa renda, inscritos no Cadastro Único (renda familiar até 2 salários mínimos)",
            proof: "na forma do regulamento (Identidade Jovem under Decreto 8.537/2015 — the decree was not read; name it only as 'o regulamento' unless read)",
            article: "Art. 1º, § 9º",
          },
          {
            who: "pessoas com 60 anos ou mais",
            law: "Lei 10.741/2003, art. 23",
            proof: "none named by the law",
            source: "s32",
            readOn: "2026-10-22",
          },
        ],
        cap: {
          text: "40 % (quarenta por cento) do total dos ingressos disponíveis para cada evento",
          article: "Art. 1º, § 10",
        },
        not_cumulative: {
          text: "não é cumulativo com outras promoções e convênios; não vale para serviços adicionais em camarotes, áreas e cadeiras especiais",
          article: "Art. 1º, § 1º",
        },
        sellerRule: "Para compras pela Internet é necessária a comprovação do direito ao benefício da meia-entrada no acesso ao evento. Para Bilheteria é necessária a comprovação do direito ao benefício da meia-entrada no ato da compra e no acesso ao evento.",
        otherLaws: [
          {
            law: "Lei nº 10.741, de 1º de outubro de 2003 (Estatuto da Pessoa Idosa)",
            source: "s32",
            readOn: "2026-10-22",
            who: "pessoas com idade igual ou superior a 60 (sessenta) anos",
            article1: "Art. 1º É instituído o Estatuto da Pessoa Idosa, destinado a regular os direitos assegurados às pessoas com idade igual ou superior a 60 (sessenta) anos. (Redação dada pela Lei nº 14.423, de 2022)",
            article23: "Art. 23. A participação das pessoas idosas em atividades culturais e de lazer será proporcionada mediante descontos de pelo menos 50% (cinquenta por cento) nos ingressos para eventos artísticos, culturais, esportivos e de lazer, bem como o acesso preferencial aos respectivos locais. (Redação dada pela Lei nº 14.423, de 2022)",
            condition: "age 60 or over",
            document: "the article names none; it is a discount 'de pelo menos 50%', not a meia-entrada by name, and the seller's proof rule (s22) is the only published rule on what to show",
          },
          {
            law: "Lei estadual (SP) nº 10.858, de 31 de agosto de 2001, atualizada até a Lei nº 14.729, de 30 de março de 2012",
            source: "s33",
            readOn: "2026-10-22",
            who: "professores da rede pública estadual e das redes municipais de ensino (State of São Paulo)",
            ementa: "Institui a meia-entrada para professores da rede pública estadual de ensino em estabelecimentos que proporcionem lazer e entretenimento",
            article1: "Artigo 1º - É assegurado o pagamento de 50% (cinquenta por cento) do valor realmente cobrado para o ingresso em casas de diversões, praças desportivas e similares, aos professores da rede pública estadual e das redes municipais de ensino. (NR) — Artigo 1º com redação dada pela Lei nº 14.729, de 30/03/2012",
            article1single: "Parágrafo único - A meia-entrada corresponderá sempre à metade do valor do ingresso cobrado, ainda que sobre o seu preço incidam descontos ou atividades promocionais.",
            article2: "Artigo 2.º - Consideram-se casas de diversões, para os efeitos desta lei, os estabelecimentos que realizarem espetáculos musicais, artísticos, circenses, teatrais, cinematográficos, atividades sociais recreativas e quaisquer outros que proporcionem lazer e entretenimento.",
            article3: "Artigo 3º - A prova da condição prevista no artigo 1º, para recebimento do benefício, será feita através da carteira funcional emitida pela Secretaria da Educação, ou pela apresentação do respectivo holerite. (NR) — Artigo 3º com redação dada pela Lei nº 14.729, de 30/03/2012",
            condition: "teacher of the São Paulo state public network or of a municipal public network; the law is state law and applies in the State of São Paulo",
            document: "carteira funcional emitida pela Secretaria da Educação, or the holerite",
          },
        ],
      },
      not_found_update: {
        closed: [
          "exact dates of the 2022 edition at an organiser page (s23)",
          "attendance figures from the organiser — 2022 only (s26)",
          "which documents prove meia-entrada — for estudantes, by law (s30)",
        ],
        still_open: [
          "festival-day station hours, express trains, parking (not published as of 21 Oct 2026)",
          "proof documents for pessoas com deficiência and jovens de baixa renda beyond 'na forma do regulamento' (Decreto 8.537/2015 not read)",
          "the idosos rule (Lei 10.741/2003 art. 23 not read)",
          "attendance of the 2023 edition from the organiser",
        ],
      },
      // The notes the scout wrote as the last item of the price list and of the
      // questions (copy.ts reads [prices.note] here).
      listNotes: {
        prices: {
          note: "The organiser lists one figure per type. Those figures equal the meia-entrada column of the general-sale table the press printed from the seller on 21 Jul 2026 (s13: Pass R$ 1.530,90 / 765,45 / 995,09; Day R$ 850,50 / 425,25 / 552,83; VIP R$ 2.050,50 / 1.625,25 / 1.752,83 as inteira / meia / solidário), and VIP = R$ 1.200 + 425,25. So the organiser's figure is the lowest tier, not the full price. The seller shows lot prices only after an Ingresse login (session's pane read, s22), so the organiser's figures are the only sourced prices: print them as 'a partir de', with the organiser as source and the 20 % online fee from s22; the press table is context, not a source.",
        },
        questions: {
          note: "No reddit or forum thread on the 2026 edition surfaced in five searches. PAA rows about Expoprimavera, Canto da Primavera and Lolla left out as off-topic.",
        },
      },
      // The English twin's scout, 24 October 2026 (card
      // 2026-10-24-primavera-sound-sao-paulo-en, section 1): round 1's additions,
      // with the repairs after gate 2 where they give a key whole (R2:
      // entry_us_au, edition2027, scout; R3: terms.resale, prohibited_items) and
      // the fact-check's S-1 on terms.meia_docs.
      // the organiser's own English record fields
      ticket_names_en: {
        pass: {
          name: "Full Festival Ticket",
          subtitle: "PRIMAVERA PASS",
          text: "PRIMAVERA PASS tickets grant General Admission access on Saturday, 5 December and Sunday, 6 December.",
        },
        day: {
          names: ["Saturday 5th December", "Sunday 6th December"],
          subtitle: "PRIMAVERA DAY",
          text: "PRIMAVERA DAY tickets grant General Admission access on the selected festival day (Saturday, 5 December or Sunday, 6 December), depending on the ticket purchased.",
        },
        vip: {
          names: ["VIP Saturday 5th December", "VIP Sunday 6th December"],
          subtitle: "VIP PRIMAVERA DAY",
          text: "The Primavera Sound VIP Area is an exclusive experience that includes open bar, open food, transportation to the festival venue, and a comfortable lounge area. The VIP experience costs R$1,200.00 per person, in addition to the price of the current ticket tier.",
        },
        source: "s40",
        readOn: "2026-10-24",
        note: "'General Admission' is the organiser's English for 'pista'. Prefer these over translating the pt names.",
      },
      sales_note_en: {
        text: "BB Visa presale on Ingresse 23 July 12:00 pm to 28 July 10:00 am, 15% off first-tier tickets, up to 10 instalments; presale had General Admission, Half-Price and Solidarity tickets only; VIP from the general sale; general sale on Ingresse from 28 July 12:00 pm",
        terms_en: {
          meia: "Half-Price",
          solidario: "Solidarity",
        },
        source: "s41",
        readOn: "2026-10-24",
        note: "the organiser's English words for meia-entrada and solidário",
      },
      bb_visa_channel: {
        text: "a separate Ingresse event, 'PRIMAVERA SOUND SÃO PAULO - 2026 - CLIENTES CARTÃO BB VISA', where BB Visa cardholders get 'parcelamento exclusivo em até 10x em todas as modalidades de ingresso, inclusive durante a venda geral'; T&C 2.4: up to 10 instalments 'com juros', only BB Visa credit and debit cards accepted on that event",
        status: "published; sessions 145688 (Sat) and 145689 (Sun) available; salesEnabled true",
        source: "s34",
        terms_source: "s35",
        readOn: "2026-10-24",
        note: "concerns Brazilian cardholders only. At most a clause on the English page; never a hop for an English reader",
      },
      official_channels: {
        text: "T&C item 2: online at primavera-sound-sp-26.ingresse.com; in person at Working Title, R. Bela Cintra, 1966 (Mon–Thu 13h–17h, except holidays). The landing page links the general-sale event (s22) for Sat, Sun and both days, and the BB Visa event (s34) for the same three.",
        source: "s35",
        landing: "s38",
        readOn: "2026-10-24",
      },
      venue_box_office: {
        text: "Haverá bilheteria no local do evento, nos dias do evento, para venda de ingressos, caso não estejam esgotados, e resolução de problemas e dúvidas.",
        source: "s35",
        item: 4,
        readOn: "2026-10-24",
      },
      // Bonus Track's T&C for Primavera Sound São Paulo 2026, linked from s22
      terms: {
        gates: "doors 12:30; entry closes 'impreterivelmente às 22h' (item 4)",
        water: "drinking-water points for the public (item 8)",
        no_cloakroom: "'O Evento não oferecerá serviço de guarda-volumes' (item 14)",
        no_reentry: "a holder who leaves cannot come back in, unless they hold another valid ticket for the same day (item 23)",
        search: "ticket holders are searched; prohibited objects are thrown away (item 5)",
        animals: "no animals, except identified guide dogs (item 9)",
        recording: "no sound or video recording or broadcast of the festival; no professional cameras or drones (item 11)",
        smoking: "no smoking in any wholly or partly enclosed space at Interlagos, under São Paulo state law 13.541/2009 (item 12)",
        alcohol_minors: "no alcohol to under-18s (item 7)",
        resale: {
          item21: "'É vedada a revenda de ingressos, bem como o seu uso para fins institucionais, promocionais ou sem o consentimento inequívoco da organização do evento.'",
          reading: "Resale is barred outright. The consent clause qualifies 'uso' (use for institutional or promotional purposes, or without consent), not resale. Print 'the terms forbid reselling tickets'; never 'without consent'.",
          item22: "'A organização do evento não se responsabiliza por ingressos adquiridos em canais não oficiais de comercialização dos ingressos.'",
          source: "s35",
          readOn: "2026-10-24",
        },
        refunds: "postponement: ticket valid for the new date, or a refund for whoever bought for the postponed day; cancellation: refund (item 16); changes to the programme or to some acts: no refund (items 17, 19); headliner of the day cancelled: the ticket stays valid, and a buyer who decides in advance not to go may ask for the face value back by the organiser's deadline (item 18); cooling-off: cancel within 7 calendar days of purchase (item 25); credit-card refunds within up to 2 billing cycles (item 26)",
        no_extra_costs: "neither the organiser nor Ingresse covers hotel, transport or food in any of those cases (item 20)",
        payment: "general sale, online and box office: up to 8 instalments with interest; credit and debit Mastercard, Visa, Elo, American Express, Discover, Hipercard, Diners, JCB; Pix; Apple Pay; Click To Pay; Google Pay; no cash (item 2.4). s22 lists the same without Apple Pay.",
        changeable: "'Todas as condições acima poderão ser alteradas sem aviso prévio' (under 2.3); the terms may change at any time (item 27)",
        meia_docs: "meia-entrada categories with the documents asked, linking sobre.ingresse.com/meia-entrada: students (Lei 12.852/13 art. 23, Lei 12.933/13 art. 1, Decreto 8.537/15 art. 3, Portaria 78/2018, Lei 9.394/96); low-income young people 15–29; people with disabilities and one companion; adults 60+ 'mediante apresentação de documento oficial com foto que contenha data de nascimento'; in São Paulo (state laws 15.298/2014 and 14.729/2012), teachers and school staff of the state and municipal public networks (official photo ID plus the Education Department's staff card or a payslip), and pensioners (city of São Paulo only, INSS card)",
        source: "s35",
        readOn: "2026-10-24",
      },
      // PDF linked from s22; same list as T&C item 5
      prohibited_items: {
        text: "bags or rucksacks larger than 20x30 cm; umbrellas of any size and selfie sticks; bottles, containers, cans, glass cups or any other packaging that could cause injury, holding a drink of any kind, except plastic cups or bottles of water for individual consumption, provided they have no cap (security may remove the cap at the entrance or anywhere at the event); drinks in any kind of container; alcohol; e-cigarettes, vapes, e-liquids and the like; sprays of any kind; medicines without a prescription; professional cameras (interchangeable lens), video cameras, recorders; tablets, laptops, walkie-talkies and large electronic equipment; laser pointers, strobe lights and other light-emitting devices; flags on poles; chairs and stools; polystyrene boxes, coolers or any storage container; tents; drones or any flying object; skateboards, bicycles or any vehicle, motorised or not; helmets; megaphones and horns; weapons, sharp objects (pens, scissors, nail clippers, razors); glass, metal or hard plastic objects that could cause harm; fireworks and flares; balloons and juggling items; heavy chains, belts and pendants; metal hand fans or similar; paints and dyes; rolls of paper, newspapers, magazines, posters, leaflets, stickers; ambush-marketing items and shirts, flags or signs with unauthorised commercial or discriminatory content; anything for sale",
        omitted: "items in the PDF the text above does not carry: clothing or accessories with sharp parts that could hurt; tasers, knuckle-dusters and the like; materials or objects that could cause injury; toxic, poisonous or illicit substances, including illegal drugs; flammable or corrosive products and sprays, or ones containing gas; other objects that could cause risk, damage or nuisance, at the discretion of the production and security",
        food: "only sealed industrial food (e.g. biscuits, crisps, cereal bars), up to 5 items a person; fruit only cut and in a clear, non-rigid pack; no food for sale or that poses a safety risk",
        search: "everyone entering is searched and inspected; prohibited items are discarded",
        source: "s36",
        readOn: "2026-10-24",
        note: "answers 'what to bring'. Every item is the PDF's own word ('Skate' is a skateboard in pt-BR). If the copy calls its list complete, it adds `omitted`; never add 'sunscreen allowed' or the like, which no source says. The terms' item 5 (s35) carries the same list.",
      },
      // the event's "Online Selling Rules", trilingual, on s22 and s34 alike
      ingresse_rules_en: {
        rule6: "To access the event, presentation of the ticket in digital format through the App (Ingresse - Ingressos e Eventos) is mandatory, together with the respective official identification document with photo",
        rule4: "The website (www.ingresse.com) and the App (Ingresse - Tickets and Events) are Ingresse's only official sales channels. Ingresse is not liable … for tickets purchased from third parties.",
        rule7: "Failure to attend the event will invalidate the ticket and will not allow a refund",
        rule8_en: "You may be eligible for a full refund of your ticket price only if: (i) the event is cancelled; (ii) the event is rescheduled; or (iii) the event organizer expressly orders Ingresse to make the refund.",
        rule8_pt: "the Portuguese rule 8 instead gives the consumer code's 7-day cooling-off (art. 49), not later than 48 hours before the event, refunded less the convenience fee, within 45 days; the Portuguese rule 9 deducts Ingresse's service and processing fees from a cooling-off refund",
        rule9_en: "the organiser alone decides whether tickets can be transferred",
        sac: "Ingresse customer service: every day 11 a.m.–7 p.m. by email, FAQ and phone; every day 10 a.m.–11 p.m. by WhatsApp (rule 12 en)",
        source: "s37",
        readOn: "2026-10-24",
        note: "the English and Portuguese rule 8 differ. The organiser's T&C item 25 (7 days) agrees with the Portuguese one. Print the T&C (organiser) for the cooling-off, and name the difference only if the copy talks refunds at all. Never say a foreign buyer has no cooling-off.",
      },
      // Ingresse help centre, article modified 30 Jul 2026
      ingresse_foreigners: {
        text: "a foreigner buys in the Ingresse app: log in, find the event, 'Comprar Ingresso', choose the number, 'Avançar', complete the registration 'with the number of your foreign document (eg; passport)', say whose ticket it is, pay by PayPal, finish; questions to contato@ingresse.com",
        source: "s48",
        readOn: "2026-10-24",
        note: "a general Ingresse article, not specific to this event. Print it as Ingresse's help page. It names PayPal as the payment method for this route; whether foreign cards work on the web checkout is not stated.",
      },
      // Ingresse help centre, modified 29 Jul 2026
      ingresse_qr: {
        text: "Ingresse tickets carry a dynamic QR code that keeps changing, so open the app at the gate; screenshots ('prints') are not accepted",
        source: "s49",
        readOn: "2026-10-24",
      },
      transport_air: {
        gru: "Airport-Guarulhos station is on CPTM Line 13-Jade to Engenheiro Goulart, where Line 12-Safira continues to Tatuapé and Brás ('connect') and Luz ('airport express'); Line 13 runs Sunday to Friday 4:00 am to 12:00 am, Saturdays 4:00 am to 1:00 am; a free shuttle links the station's Airport Access (by Terminal 1 parking) with the terminals",
        gru_source: "s44",
        line9: "Line 9-Esmeralda (Osasco–Varginha) connects with Metro Line 4-Amarela at Pinheiros, Line 5-Lilás at Santo Amaro and Line 8-Diamante at Osasco",
        line9_source: "s45",
        readOn: "2026-10-24",
        note: "two operator pages, not a route anyone published. The leg Luz → Pinheiros (Line 4) has no page read: the copy may name the lines and stations each page names, never a journey time or a fare. Congonhas (CGH): Aena's page answered 114 bytes, not read.",
      },
      // GOV.UK, page updated 29 Sep 2026 (that change concerned the 4 Oct elections)
      entry_uk: {
        for: "full 'British citizen' passport holders",
        visa: "visit without a visa for up to 90 days for tourism",
        passport: "'expiry date' at least 6 months after the date you arrive",
        stamp: "make sure the border officer stamps the passport; without a stamp you may be fined when you leave",
        dual: "Brazilian immigration often requires British-Brazilian dual nationals to travel on Brazilian passports",
        minors: "non-Brazilian under-18s travelling without one or both parents should follow the Brazilian minors' authorisation route and carry the original or a notarised copy of the birth certificate",
        cash: "declare USD 10,000 or more online",
        source: "s46",
        readOn: "2026-10-24",
      },
      // travel.gc.ca, last updated 14 Oct 2026 08:35 ET
      entry_ca: {
        for: "regular Canadian passport holders",
        visa: "Tourist visa: required (link: Brazil eVisa – VFS Global)",
        passport: "valid for the duration of the stay",
        other: "customs may ask for a return or onward ticket and proof of sufficient funds",
        dual: "Canadian-Brazilian dual citizens must enter and exit on the Brazilian passport",
        source: "s47",
        readOn: "2026-10-24",
      },
      entry_us_au: {
        text: "travel.state.gov answered 403 to curl; smartraveller.gov.au broke off the connection (HTTP/2 stream error). Name the US State Department and Smartraveller as pointers only: no link, no claim (session ruling, 24 Oct).",
        readOn: "2026-10-24",
      },
      // The copy's "nothing announced for 2027" (R2).
      edition2027: {
        status: "not announced",
        text: "On 24 Oct 2026 the organiser had announced no São Paulo edition for 2027. Its post search (searchPosts, en and pt) returns no 2027 São Paulo post; the newest São Paulo post is the Primavera na Cidade page of 19 Oct 2026; the São Paulo caption in the site menu reads '5 - 6 DEC, 2026 AUTÓDROMO DE INTERLAGOS, BR'. The 2027 dates in that menu are Barcelona's ('02 - 06 JUN, 2027 PARC DEL FÒRUM, ES') and Porto's.",
        source: "s39",
        readOn: "2026-10-24",
      },
      // Section 1 of the twin's card as the copy cites it: what no source says
      // (not_found, "1"-"9") and two of round 1's records (R2).
      scout: {
        readOn: "2026-10-24",
        not_found: {
          "1": "Prices at the seller for the festival: the current lot and the inteira, meia-entrada and solidário figures. The festival cart redirects to Ingresse's login (auth.prod.ingresse.com) and the ticket list the page loads is empty; I did not log in. The organiser's figures (s2, s40) remain the only sourced festival prices.",
          "2": "Whether a foreign visitor qualifies for meia-entrada (a student with a foreign student card, someone 60+ with a passport). The terms name the documents, not nationality.",
          "3": "Whether Ingresse's web checkout takes cards issued abroad, and whether it asks for a CPF. The help article (s48) describes the app route, with PayPal only.",
          "4": "Set times (organiser record showDateTime false); parking; festival-day station hours or extra trains (s29 and s35 say nothing). Primavera na Cidade sales are no longer on this list: found on 24 Oct (s50–s52).",
          "5": "An official route from Guarulhos (GRU) or Congonhas (CGH) to Interlagos: two operator pages are read (s44, s45), the Line 4 leg Luz → Pinheiros is not; Aena's Congonhas page returned 114 bytes on round 1.",
          "6": "Whether the Working Title box office sells VIP.",
          "7": "An official resale or transfer channel. The terms bar resale outright (item 21, terms.resale); whether tickets can be transferred is the organiser's decision (Ingresse rule 9) and is not stated. Ingresse's resale call for the festival (api-embedstore …/resale/event/93986/grouped) returns no groups on 24 Oct: a record, not a statement.",
          "8": "travel.state.gov (403) and smartraveller.gov.au (connection error), 24 Oct: pointers only (entry_us_au).",
          "9": "An organiser FAQ or getting-there page for São Paulo 2026. The São Paulo menu has Lineup, Primavera Na Cidade, Tickets and App only.",
        },
        "1": {
          "1": {
            ingresse_sessions: {
              text: "Ingresse, general sale (event 93986): Sat 5 Dec session 135684 and Sun 6 Dec session 135650 both 'available', event 'published', config salesEnabled true, secWaitlist false; session start 15:30 UTC (12:30 local). BB Visa event 103672: sessions 145688 and 145689 'available'.",
              source: "s37",
              readOn: "2026-10-24",
            },
          },
          "2": {
            organiser_tabs: {
              text: "The organiser's five ticket records, the same in every language: Full Festival Ticket / Passe Geral R$ 765.45; Saturday 5th December R$ 425.25; Sunday 6th December R$ 425.25; VIP Saturday 5th December R$ 1,625.25; VIP Sunday 6th December R$ 1,625.25. All BRL, status ONSALE, showFee true, updated 30 Jul 2026; sole seller Ingresse ('Web', active, priority 1), sellerTicketUrl https://www.ingresse.com/primavera-sound-sp-2026/; no zero-price record.",
              source: "s40",
              readOn: "2026-10-24",
            },
            who_sells_what: {
              text: "Ingresse sells the festival pass, the day tickets and the VIP (VIP only since the general sale, terms 'Sobre a ÁREA VIP'). The Working Title box office sells in person, without a fee; the terms do not say whether it sells VIP. On the festival days a box office at the circuit sells tickets if any are left (terms item 4). Primavera na Cidade: Ingresse, one event per night, general sale since 21 Oct 2026 12:00 (s50–s52), plus the Working Title box office and, on the nights, a box office at each club.",
              readOn: "2026-10-24",
            },
          },
        },
      },
    },
    go: {
      site: {
        url: "https://www.primaverasound.com/pt/sao-paulo",
        source: "s1",
        kind: "organiser",
        title: "Página oficial do Primavera Sound São Paulo",
      },
      ingressos: {
        url: "https://www.ingresse.com/primavera-sound-sp-2026/",
        source: "s22",
        kind: "seller",
        title: "Ingresse, canal oficial de venda do Primavera Sound São Paulo 2026",
        titles: { en: "Ingresse, the official seller of Primavera Sound São Paulo 2026, in Portuguese" },
      },
      vendas: {
        url: "https://www.primaverasound.com/pt/news/abertura-de-vendas-primavera-sound-sao-paulo",
        source: "s3",
        kind: "organiser",
        title: "Informações sobre a venda de ingressos, nota do organizador de 20 de julho de 2026",
      },
      "na-cidade": {
        url: "https://www.primaverasound.com/pt/sao-paulo/sao-paulo-primavera-na-cidade-programme",
        source: "s5",
        kind: "organiser",
        title: "Primavera na Cidade São Paulo 2026, página do organizador",
      },
      "reembolso-2024": {
        url: "https://www.primaverasound.com/pt/sao-paulo/reembolso-early-bird",
        source: "s10",
        kind: "organiser",
        title: "Política de reembolso da edição cancelada de 2024, publicada pelo organizador",
        titles: { en: "The organiser's refund policy for the cancelled 2024 edition" },
      },
      autodromo: {
        url: "https://autodromodeinterlagos.prefeitura.sp.gov.br/",
        source: "s7",
        kind: "venue",
        title: "Autódromo de Interlagos, Prefeitura de São Paulo",
        titles: { en: "The Autódromo de Interlagos website, run by the City of São Paulo, in Portuguese" },
      },
      mapa: {
        // A maps search for the circuit's official name (venue.name, as its
        // own history page gives it, s7b). Opened at 390 px on 22 Oct 2026:
        // this lands on the circuit's own place, "Autódromo José Carlos
        // Pace", with its route and call buttons. A search for the address
        // word for word (venue.address) landed instead on a nameless
        // building Google calls "Estacionamento", a car park, on a guide
        // that says no parking has been published; "Autódromo de
        // Interlagos" gave a list of two places to choose from.
        url: "https://www.google.com/maps/search/?api=1&query=Aut%C3%B3dromo%20Jos%C3%A9%20Carlos%20Pace",
        source: "venue.name",
        kind: "maps",
        // The pt-BR native reader's title for this target (the executor's
        // strings, 22 Oct 2026).
        title: "Autódromo de Interlagos, oficialmente Autódromo José Carlos Pace, no Google Maps",
        titles: { en: "The Autódromo de Interlagos, officially Autódromo José Carlos Pace, in Google Maps" },
      },
      viamobilidade: {
        url: "https://trilhos.motiva.com.br/viamobilidade8e9/linha-9---esmeralda/autodromo/",
        source: "s29",
        // The concession operator of a state railway line: of the hop kinds,
        // a public body is the nearest; it is not the organiser's, a seller's
        // or the venue's.
        kind: "public-body",
        title: "Estação Autódromo, Linha 9-Esmeralda, ViaMobilidade",
        titles: { en: "Autódromo station on Line 9-Esmeralda: access, lifts and the bicycle park, in Portuguese" },
      },
      "lei-12933": {
        url: "https://www2.camara.leg.br/legin/fed/lei/2013/lei-12933-26-dezembro-2013-777776-publicacaooriginal-142529-pl.html",
        source: "s30",
        kind: "public-body",
        title: "Lei da meia-entrada, publicação original na Câmara dos Deputados",
      },
      "estatuto-idoso": {
        url: "https://www.planalto.gov.br/ccivil_03/leis/2003/l10.741.htm",
        source: "s32",
        kind: "public-body",
        title: "Lei nº 10.741/2003, texto compilado no Planalto",
      },
      "lei-10858": {
        url: "https://www.al.sp.gov.br/repositorio/legislacao/lei/2001/lei-10858-31.08.2001.html",
        source: "s33",
        kind: "public-body",
        title: "Meia-entrada para professores da rede pública, Assembleia Legislativa de São Paulo",
      },
      // The two documents the seller's page links under its age paragraph
      // (age.links), each a Drive file view, which test:fest traces to its
      // link on the sheet: the same file, the sharing query left off. Both
      // opened without a login on 22 October 2026 (gate 3, G8).
      "termo-menor": {
        url: "https://drive.google.com/file/d/1tkRmaMP2wOJpapv6DzEoB6a65dwJxDBq/view",
        source: "age.links.0",
        kind: "seller-document",
        title: "Formulário da produtora para menores de 5 a 15 anos, publicado pela Ingresse",
        titles: { en: "The promoter's consent form for children aged 5 to 15, a PDF in Portuguese" },
      },
      alvara: {
        url: "https://drive.google.com/file/d/1lz4iyKKU1DadO3EHTdIznhjlogJ1blFT/view",
        source: "age.links.1",
        kind: "seller-document",
        title: "Alvará judicial para menores a partir de 16 anos, publicado pela Ingresse",
        titles: { en: "The court order on 16- and 17-year-olds without their parents, a PDF in Portuguese" },
      },
      // The hops only the English twin links (card 2026-10-24-primavera-sound-
      // sao-paulo-en, hop table), each titled in English, and the three
      // club-night pages on Ingresse, which both guides link (P10): a
      // Portuguese title, the native guide linking them first, and an English
      // one. Each traces to its source on the sheet, on that source's host.
      "site-en": {
        url: "https://www.primaverasound.com/en/sao-paulo",
        source: "s39",
        kind: "organiser",
        title: "The organiser's São Paulo page in English: dates and the line-up by day",
      },
      "tickets-en": {
        url: "https://www.primaverasound.com/en/sao-paulo/tickets-sao-paulo",
        source: "s40",
        kind: "organiser",
        title: "The organiser's ticket page in English: the pass, day and VIP tickets",
      },
      "sales-en": {
        url: "https://www.primaverasound.com/en/news/abertura-de-vendas-primavera-sound-sao-paulo",
        source: "s41",
        kind: "organiser",
        title: "The organiser's ticket information of 20 July 2026, in English: presale and general sale",
      },
      "line-up-en": {
        url: "https://www.primaverasound.com/en/sao-paulo/programacao-primavera-sound-sao-paulo",
        source: "s42",
        kind: "organiser",
        title: "The organiser's list of all 40 acts, each with its day, in English",
      },
      "na-cidade-en": {
        url: "https://www.primaverasound.com/en/sao-paulo/sao-paulo-primavera-na-cidade-programme",
        source: "s43",
        kind: "organiser",
        title: "Primavera Na Cidade 2026, the club nights of 2 to 4 December, on the organiser's site",
      },
      terms: {
        url: "https://docs.google.com/document/d/1H7Ck-xfv2OKlLWSgq5KvU8mw25jU3QZW/edit",
        source: "s35",
        kind: "organiser",
        title: "The promoter's terms for buying tickets and for entry, in Portuguese",
      },
      "prohibited-items": {
        url: "https://drive.google.com/file/d/1W-OzB3462kqVQjaVaxANWNpDwyCuzzP3/view",
        source: "s36",
        kind: "organiser",
        title: "The promoter's list of what may not be taken into the festival, a PDF in Portuguese",
      },
      "ingresse-foreigners": {
        url: "https://ingresse.freshdesk.com/support/solutions/articles/8000107097-ticket-purchase",
        source: "s48",
        kind: "seller",
        title: "Ingresse's help article on buying a ticket as a foreigner, with a passport",
      },
      "ingresse-tickets-help": {
        url: "https://ingresse.freshdesk.com/support/solutions/articles/8000121256-onde-encontro-o-meu-ingresso-ap%C3%B3s-a-compra-como-acessar-",
        source: "s49",
        kind: "seller",
        title: "Ingresse on its changing QR code, and why a screenshot will not do, in Portuguese",
      },
      "gru-train": {
        url: "https://www.gru.com.br/en/passenger/to-from-gru-airport/train",
        source: "s44",
        kind: "public-body",
        title: "Line 13-Jade from Guarulhos airport, its hours and the shuttle to the terminals, in English",
      },
      "line-9": {
        url: "https://trilhos.motiva.com.br/viamobilidade8e9/linha-9---esmeralda/",
        source: "s45",
        kind: "public-body",
        title: "Line 9-Esmeralda and the lines it meets, on the operator's site, in Portuguese",
      },
      "gov-uk": {
        url: "https://www.gov.uk/foreign-travel-advice/brazil/entry-requirements",
        source: "s46",
        kind: "public-body",
        title: "GOV.UK: what British citizen passport holders need to enter Brazil",
      },
      "travel-gc-ca": {
        url: "https://travel.gc.ca/destinations/brazil",
        source: "s47",
        kind: "public-body",
        title: "Government of Canada: travel advice and entry requirements for Brazil",
      },
      "na-cidade-2-dec": {
        url: "https://www.ingresse.com/primaveranacidade-2026-model-actriz-smerz/",
        source: "s50",
        kind: "seller",
        title: "Ingresse, venda do Primavera na Cidade de quarta, 2 de dezembro: Model/Actriz e Smerz no Cine Joia",
        titles: { en: "Ingresse's page for Wednesday 2 December, Model/Actriz and Smerz at Cine Joia, in Portuguese" },
      },
      "na-cidade-3-dec": {
        url: "https://www.ingresse.com/primaveranacidade-2026-metrika-ecco2k-sophiastel-underscores/",
        source: "s51",
        kind: "seller",
        title: "Ingresse, venda do Primavera na Cidade de quinta, 3 de dezembro: quatro atrações no Audio",
        titles: { en: "Ingresse's page for Thursday 3 December, four acts at Audio, in Portuguese" },
      },
      "na-cidade-4-dec": {
        url: "https://www.ingresse.com/primaveranacidade-2026-nationoflanguage-mannequinpussy/",
        source: "s52",
        kind: "seller",
        title: "Ingresse, venda do Primavera na Cidade de sexta, 4 de dezembro: Nation of Language e Mannequin Pussy no Cine Joia",
        titles: { en: "Ingresse's page for Friday 4 December, Nation of Language and Mannequin Pussy at Cine Joia, in Portuguese" },
      },
    },
  },
];

// The main page's meta description, which is also the guide's line on the
// hub (gate 3, G7): one string, so the two cannot drift apart (the fest
// director's gate-3 condition 3).
const mainDescription = "Guia do festival Primavera Sound São Paulo 2026: ingressos na Ingresse e na bilheteria oficial, line-up por dia, como chegar a Interlagos, com fonte e data.";

export const guides: Guide[] = [
  {
    slug: "pt-BR",
    createdAt: "2026-10-22T20:00:00+04:00",
    updatedAt: "2026-10-23T14:10:00+04:00",
    event: "primavera-sound-sao-paulo",
    // The event as the hub and the trail name it, with its year.
    name: "Primavera Sound São Paulo 2026",
    lang: "pt-BR",
    dir: "ltr",
    path: "/primavera-sound-sao-paulo/",
    cover: "/covers/primavera-sound-sao-paulo.jpg",
    hubLabel: "Português (Brasil)",
    hubBlurb: mainDescription,
    // The figures in reais come off on 2 December 2026, six weeks after the
    // organiser's price records were read (prices.0.readOn, 21 October), the
    // most the oldest reading in a span allows, and three days before the
    // festival.
    expires: { prices: "2026-12-02" },
    footerNote: "Guia independente, escrito a partir das páginas do organizador, da Ingresse, do autódromo e da ViaMobilidade, cada uma com a data em que foi lida.",
    pages: [
      {
        slug: "primavera-sound-sao-paulo",
        createdAt: "2026-10-22T20:00:00+04:00",
        updatedAt: "2026-10-24T13:52:00+04:00",
        kind: "main",
        label: "Visão geral",
        crumb: "Primavera Sound São Paulo 2026",
        navTitle: "Resumo do festival: datas, ingressos, line-up e como chegar",
        linkTitle: "Visão geral do festival",
        title: "Primavera Sound São Paulo 2026: 5 e 6/12, guia do festival",
        description: mainDescription,
        h1: "Primavera Sound São Paulo 2026",
        lede: "O Primavera Sound São Paulo 2026 acontece no sábado 5 e no domingo 6 de dezembro de 2026, no Autódromo de Interlagos, em São Paulo. [editions.0.start] [editions.0.end] [venue.name] Os ingressos estão à venda na Ingresse desde 28 de julho de 2026, às 12h (página do organizador, lida em 21 de outubro de 2026), e o line-up dos dois dias está publicado. [salesTimeline.1.from] [editions.0.onSale] [editions.0.readOn] [lineup.days] A lista do organizador para sábado 5 traz primeiro The Strokes, FKA twigs e Lily Allen performing 'West End Girl'; a de domingo 6, Gorillaz, Arca e Yung Lean. A ordem é a da lista, não a dos shows: os horários não foram divulgados. [lineup.days.0.acts] [lineup.days.1.acts] [lineup.orderSource] [lineup.setTimes]\n\nÉ a terceira edição em São Paulo, na conta do organizador, depois de 2022 no Distrito Anhembi e 2023 no próprio Interlagos; a de 2024 foi cancelada, e a de 2026 foi anunciada pelo organizador em 17 de outubro de 2025. [announcements.2] [announcements.3] [editions.3.venueName] [editions.2.venue] [editions.1] [announcements.0]",
        // The facts at a glance (writer, round 1; the note as round 3, item 16
        // has it). The date keeps no-break spaces, as Creamfields Chile's
        // does: a Glance value prints as text, out of typeset's reach.
        glance: [
          { label: "Quando", value: "sábado 5 e domingo 6\u00a0de\u00a0dezembro\u00a0de\u00a02026 [editions.0.start] [editions.0.end]" },
          { label: "Onde", value: "Autódromo de Interlagos, São Paulo [venue.name]" },
          { label: "Portões", value: "12h30 [gates.open]" },
          { label: "Ingressos", value: "Ingresse e bilheteria Working Title [sellers.0.name] [sellers.1.name]" },
        ],
        glanceNote: "Fontes lidas em 21 e 22 de outubro de 2026",
        // The jump list under its own labels where a heading is long on a
        // phone (the pt-BR native reader on the executor's strings, 22 Oct
        // 2026); the rest are the headings.
        jumps: [
          { id: "ingressos", label: "Ingressos" },
          { id: "datas-e-horarios", label: "Datas e horários" },
          { id: "autodromo", label: "O Autódromo de Interlagos e como chegar" },
          { id: "line-up", label: "Line-up por dia" },
          { id: "sobre", label: "Sobre este guia" },
        ],
        sections: [
          {
            id: "ingressos",
            heading: "Ingressos: onde comprar e o que o organizador lista",
            body: "Quem vende online é a Ingresse, o único canal que o organizador lista para esta edição; a venda geral abriu em 28 de julho de 2026, às 12h. [sellers.0.name] [sellers.0.note] [salesTimeline.1.from] Quem prefere comprar sem taxa vai à bilheteria oficial, da Working Title, na Rua Bela Cintra, 1966, no Jardim Paulista, de segunda a quinta, das 13h às 17h, exceto feriados. [sellers.1.address] [sellers.1.hours] [sellers.1.fee] Nos dias do festival, os termos e condições da produtora preveem também uma bilheteria no autódromo, para venda de ingressos, caso não estejam esgotados, e para resolver problemas e tirar dúvidas. [venue_box_office.text] Online, a Ingresse cobra 20% de taxa de conveniência sobre o valor total da compra. [sellerPageFacts.fees.online]\n\nSão três tipos de ingresso: o Passe Geral, de pista, para o sábado e o domingo; o ingresso de um dia, de pista, para o sábado 5 ou o domingo 6; e a Área VIP, por dia, com open bar, open food, transfer para o local e área de descanso. [ticketTypes.0.covers] [ticketTypes.1.covers] [ticketTypes.2.covers] {{until prices}}Nos registros de ingressos do organizador, atualizados em 30 de julho de 2026 e lidos em 21 de outubro de 2026, o Passe Geral está listado a R$ 765,45 e o ingresso de um dia a R$ 425,25; a Ingresse não mostra o lote vigente nem os valores de inteira, meia-entrada e solidário antes do login. [prices.0.amount] [prices.0.recordUpdated] [prices.0.readOn] [prices.1.amount] [sellerPageFacts.prices]{{/until}} Os tipos, o VIP, o parcelamento, quem tem direito à meia-entrada e o ingresso solidário estão na [página de ingressos](/primavera-sound-sao-paulo/ingressos/).",
          },
          {
            id: "datas-e-horarios",
            heading: "Datas e horários: sábado 5 e domingo 6 de dezembro, dois dias",
            body: "O festival tem dois dias, sábado 5 e domingo 6 de dezembro, com portões às 12h30, última entrada às 22h e encerramento à meia-noite; a Ingresse avisa que os horários dos shows podem mudar. [editions.0.start] [editions.0.end] [gates.open] [gates.lastEntry] [gates.end] [gates.note] Se você leu que são três dias: os shows de 2, 3 e 4 de dezembro são o Primavera na Cidade, à parte do festival, em casas de show. [primaveraNaCidade.context] Em 24 de outubro de 2026, os ingressos das três noites estavam à venda na Ingresse, cada noite numa página própria, com a venda geral aberta desde 21 de outubro, às 12h. [primaveraNaCidade.ticketing.summary] [salesTimeline.2.from]\n\nA edição foi anunciada em 17 de outubro de 2025 e o line-up em 11 de maio de 2026, pelo próprio organizador. [announcements.0] [announcements.1] O histórico completo, de 2022 a 2026, está em [datas e local](/primavera-sound-sao-paulo/datas-e-local/).",
          },
          {
            id: "autodromo",
            heading: "O Autódromo de Interlagos e como chegar",
            body: "O endereço é Avenida Senador Teotônio Vilela, 261, Interlagos, São Paulo, CEP 04801-010; o telefone do autódromo é (11) 5666-8822. [venue.address] [venue.phone] O nome oficial é Autódromo José Carlos Pace, e foi ali que o organizador fez a edição de 2023. [venue.name] [venue.nameSource] [editions.2.venue] [Abrir no mapa](/go/primavera-sound-sao-paulo-mapa/) · [Site do autódromo](/go/primavera-sound-sao-paulo-autodromo/)\n\nDe trem, a referência é a [Estação Autódromo](/go/primavera-sound-sao-paulo-viamobilidade/), da Linha 9-Esmeralda, operada pela ViaMobilidade, que a operadora descreve como próxima do autódromo. [transport.0.how] O horário da estação nos dias do festival, trens extras e estacionamento não foram publicados pelo organizador nem pela operadora até 21 de outubro de 2026. [transport.0.note] O que a operadora publica sobre a estação, e o transfer do ingresso VIP, estão em [datas e local](/primavera-sound-sao-paulo/datas-e-local/).",
          },
          {
            id: "line-up",
            heading: "Line-up por dia",
            body: "São 20 nomes por dia, 40 no total, todos no autódromo. [lineup.setTimes] Ao anunciar o line-up em 11 de maio de 2026, o organizador apontou Gorillaz e The Strokes como headliners. [announcements.1.what] Os 40 nomes, dia a dia e na ordem do organizador, estão na [página de line-up](/primavera-sound-sao-paulo/line-up/).",
          },
          {
            id: "sobre",
            heading: "Sobre este guia",
            body: "Este guia junta num só lugar o que se pergunta sobre o Primavera Sound São Paulo 2026 — datas, ingressos, line-up por dia, classificação etária, portões e como chegar — com a fonte e a data de leitura de cada informação. É um guia independente, não o site oficial: compre só pelos canais oficiais, a Ingresse e a bilheteria da Working Title. [sellers.0] [sellers.1]",
          },
        ],
        faqHeading: "Perguntas frequentes",
        faq: [
          {
            q: "Quando e onde é o Primavera Sound São Paulo 2026?",
            a: "Sábado 5 e domingo 6 de dezembro de 2026, no Autódromo de Interlagos, em São Paulo; é o que a página do organizador e a da Ingresse dizem, lidas em 21 de outubro de 2026. [editions.0] [sellerPageFacts.dates] Fonte: organizador [sources.s1], Ingresse [sources.s22].",
          },
          {
            q: "Quanto custa o ingresso para o Primavera Sound 2026?",
            a: "{{until prices}}O organizador lista R$ 425,25 para um dia e R$ 765,45 para os dois, em registros atualizados em 30 de julho de 2026 e lidos em 21 de outubro de 2026; a Ingresse não mostra o lote vigente nem os valores de inteira, meia e solidário antes do login. [prices.1.amount] [prices.0.amount] [prices.0.recordUpdated] [prices.0.readOn] [sellerPageFacts.prices] Detalhes na [página de ingressos](/primavera-sound-sao-paulo/ingressos/). Fonte: organizador [sources.s2], Ingresse [sources.s22].{{/until}}",
          },
          {
            q: "Quando começam as vendas do Primavera Sound 2026?",
            a: "A venda geral abriu em 28 de julho de 2026, às 12h, na Ingresse, e segue enquanto durar o estoque, pelo valor de cada lote. [salesTimeline.1.from] [sellerPageFacts.generalSale] Fonte: organizador [sources.s3], Ingresse [sources.s22].",
          },
          {
            q: "Quem toca em cada dia do Primavera Sound São Paulo 2026? The Strokes é sábado e Gorillaz domingo?",
            a: "Sim: The Strokes está na lista de sábado 5 e Gorillaz na de domingo 6, segundo a página do organizador. [lineup.days.0.acts] [lineup.days.1.acts] Os 40 nomes estão na [página de line-up](/primavera-sound-sao-paulo/line-up/). Fonte: organizador [sources.s1] [sources.s4].",
          },
          {
            q: "Qual é a classificação etária?",
            a: "16 anos, pela regra da Ingresse. De 5 a 15 anos, acompanhados dos pais ou responsáveis legais, com o termo de responsabilidade assinado e documento de identidade; menores de 5 anos não entram; a regra pode mudar nos termos do alvará da Vara da Infância e da Juventude. [age.asGiven] O texto completo da Ingresse, o termo e o alvará estão em [datas e local](/primavera-sound-sao-paulo/datas-e-local/). Fonte: Ingresse [sources.s22].",
          },
          {
            q: "Que horas abrem os portões?",
            a: "Às 12h30 nos dois dias, segundo a Ingresse, que avisa que os horários dos shows podem mudar; última entrada e encerramento estão em [datas e local](/primavera-sound-sao-paulo/datas-e-local/). [gates.open] [gates.note] Fonte: Ingresse [sources.s22].",
          },
          {
            q: "O que é o Primavera na Cidade?",
            a: "Shows em casas de show da cidade na semana do festival, com oito artistas do line-up: 2 de dezembro no Cine Joia, 3 no Audio e 4 no Cine Joia, à parte dos dois dias do festival. [primaveraNaCidade.context] Os ingressos são vendidos pela Ingresse, numa página para cada noite. Em 24 de outubro de 2026 estavam à venda, com a venda geral aberta desde 21 de outubro, às 12h. [primaveraNaCidade.ticketing.summary] [salesTimeline.2.from] A [página do organizador](/go/primavera-sound-sao-paulo-na-cidade/), de 19 de outubro de 2026, lista os shows, mas não tem link de venda. [primaveraNaCidade.organiserPage] Fontes: Ingresse [sources.s50] [sources.s51] [sources.s52] e organizador [sources.s5].",
          },
          {
            q: "Como chegar ao Autódromo de Interlagos?",
            a: "Pela Linha 9-Esmeralda até a Estação Autódromo, que a operadora descreve como próxima do autódromo, com acesso pela Rua Plínio Schmidt, 307; o plano de transporte do festival não foi publicado até 21 de outubro de 2026. [transport.0.how] [transport.0.note] O que a operadora publica sobre a estação está em [datas e local](/primavera-sound-sao-paulo/datas-e-local/). Fonte: ViaMobilidade [sources.s29].",
          },
          {
            q: "O Primavera Sound 2024 foi cancelado?",
            a: "Foi. A edição estava marcada para 30 de novembro e 1º de dezembro de 2024 em Interlagos e o organizador publicou a [política de reembolso](/go/primavera-sound-sao-paulo-reembolso-2024/) em 30 de agosto de 2024. [editions.1.note] Fonte: organizador [sources.s10].",
          },
          {
            q: "Teve Primavera Sound São Paulo em 2025?",
            a: "Não. O organizador conta 2026 como a terceira edição em São Paulo, depois de 2022 e 2023; 2024 foi cancelada. [announcements.2] [announcements.3] [editions.1] Fonte: organizador [sources.s27] [sources.s28].",
          },
          {
            q: "Vai ter Primavera Sound São Paulo 2027?",
            a: "O organizador não anunciou nada até 21 de outubro de 2026. A edição de 2024 foi anunciada pelo organizador em 12 de dezembro de 2023 e a de 2026 em 17 de outubro de 2025. [questions] [announcements.4] [announcements.0] Fonte: organizador [sources.s31] [sources.s27].",
          },
          {
            q: "Este é o site oficial?",
            a: "Não. O site oficial é o [primaverasound.com](/go/primavera-sound-sao-paulo-site/) e a venda oficial é pela [Ingresse](/go/primavera-sound-sao-paulo-ingressos/) e pela bilheteria da Working Title; este guia reúne o que eles publicam, com a data de leitura. [sources.s1] [sellers.0] [sellers.1]",
          },
        ],
        sourcesHeading: "Fontes",
        sourcesNote: "Lidas em 21, 22 e 24 de outubro de 2026; a data de leitura de cada informação está ao lado dela no texto.",
        sources: "- Primavera Sound São Paulo, página oficial — primaverasound.com/pt/sao-paulo [sources.s1]\n- Primavera Sound, registros de ingressos e página de ingressos [sources.s2]\n- Primavera Sound, \"Informações sobre a venda de ingressos para o Primavera Sound São Paulo 2026\", 20 de julho de 2026 [sources.s3]\n- Primavera Sound, Programação Primavera Sound São Paulo 2026 [sources.s4]\n- Primavera Sound, Primavera Na Cidade São Paulo 2026, página datada de 19 de outubro de 2026 [sources.s5]\n- Primavera Sound, anúncio das edições de 2026, 17 de outubro de 2025 [sources.s27]; anúncio do line-up, 11 de maio de 2026 [sources.s28]; anúncio das datas de 2024, 12 de dezembro de 2023 [sources.s31]\n- Primavera Sound, Política de Reembolso Early Bird 2024, 30 de agosto de 2024 [sources.s10]\n- Primavera Sound, \"Informações de como chegar e ir embora do festival\", 1º de novembro de 2022 [sources.s23]; balanço de público, 15 de novembro de 2022 [sources.s26]; anúncio das datas de 2023, 22 de março de 2023 [sources.s24]; line-up de 2023, 20 de julho de 2023 [sources.s25]\n- Ingresse, Primavera Sound São Paulo – 2026, texto do evento [sources.s22]\n- Bonus Track, termos e condições para compra de ingressos e para entrada e permanência no evento, lidos em 24 de outubro de 2026 [sources.s35]\n- Ingresse, Primavera na Cidade, páginas das noites de 2, 3 e 4 de dezembro, lidas em 24 de outubro de 2026 [sources.s50] [sources.s51] [sources.s52]\n- Autódromo de Interlagos, Prefeitura de São Paulo — página inicial e história [sources.s7] [sources.s7b]\n- ViaMobilidade 8 e 9 (Motiva Trilhos), Estação Autódromo, Linha 9-Esmeralda [sources.s29]",
      },
      {
        slug: "primavera-sound-sao-paulo/ingressos",
        createdAt: "2026-10-22T20:00:00+04:00",
        updatedAt: "2026-10-24T13:52:00+04:00",
        kind: "tickets",
        label: "Ingressos",
        crumb: "Ingressos",
        navTitle: "Tipos, valores listados, taxa, meia-entrada e bilheteria",
        linkTitle: "Ingressos do Primavera Sound São Paulo 2026: tipos, valores listados e meia-entrada",
        title: "Ingressos Primavera Sound São Paulo 2026 — guia do festival",
        description: "Ingressos do festival Primavera Sound São Paulo 2026: tipos e valores listados pelo organizador, Ingresse ou bilheteria Working Title, taxa e meia-entrada.",
        h1: "Ingressos do Primavera Sound São Paulo 2026",
        lede: "Os ingressos do Primavera Sound São Paulo 2026 estão à venda na Ingresse desde 28 de julho de 2026, às 12h, e também na bilheteria oficial da Working Title, para o sábado 5 e o domingo 6 de dezembro de 2026, no Autódromo de Interlagos. [salesTimeline.1.from] [sellers.0.name] [sellers.1.name] [editions.0.start] [editions.0.end] Há três tipos — passe para os dois dias, ingresso de um dia e Área VIP —, e o valor que você paga é o do lote vigente na hora da compra; a Ingresse não mostra o lote vigente nem os valores antes do login. [ticketTypes] [sellerPageFacts.generalSale] [sellerPageFacts.prices]",
        // As the main page's: one short label (the native reader, as above),
        // and the prices' section leaves the list with its span.
        jumps: [
          { id: "tipos", label: "Os três tipos" },
          { id: "valores", label: "{{until prices}}O que o organizador lista como valor{{/until}}" },
          { id: "taxa-e-pagamento", label: "Taxa, pagamento e parcelamento" },
          { id: "bilheteria", label: "Bilheteria oficial" },
          { id: "meia-entrada", label: "Meia-entrada" },
          { id: "solidario", label: "Ingresso solidário" },
          { id: "idade-e-portoes", label: "Idade e portões" },
          { id: "sobre", label: "Sobre esta página" },
        ],
        sections: [
          {
            id: "tipos",
            heading: "Os três tipos",
            body: "- **Passe Geral** (Primavera Pass, no nome do organizador): pista, sábado 5 e domingo 6 de dezembro. [ticketTypes.0.name] [ticketTypes.0.pt] [ticketTypes.0.covers]\n- **Ingresso de um dia** (Primavera Day, no nome do organizador): pista, num dia à escolha — sábado 5 de dezembro ou domingo 6 de dezembro; quem toca em cada dia está na [página de line-up](/primavera-sound-sao-paulo/line-up/). [ticketTypes.1.name] [ticketTypes.1.covers]\n- **Área VIP**, vendida por dia e só na venda geral — é assim que a Ingresse a chama; nos registros do organizador os nomes são VIP Sábado 5 de dezembro e VIP Domingo 6 de dezembro. [ticketTypes.2.name] [ticketTypes.2.pt] [ticketTypes.2.covers] {{until prices}}O organizador descreve open bar, open food, transfer para o local e área de descanso, por \"R$1.200,00 por pessoa + o valor do ingresso do lote vigente\". [ticketTypes.2.covers]{{/until}} A Ingresse, lida em 22 de outubro de 2026, descreve shuttle exclusivo até a área VIP dentro de Interlagos, com detalhes de ponto de embarque a confirmar, área de repouso, gastronomia (open food), open bar premium e ambiente climatizado. [sellerPageFacts.vip] [ticketTypes.2.sellerName]",
          },
          {
            id: "valores",
            heading: "O que o organizador lista como valor",
            body: "{{until prices}}Nos registros de ingressos do próprio organizador, atualizados em 30 de julho de 2026 e lidos em 21 de outubro de 2026, aparece um valor por tipo: Passe Geral, R$ 765,45; sábado 5 de dezembro, R$ 425,25; domingo 6 de dezembro, R$ 425,25; VIP de sábado ou de domingo, R$ 1.625,25. [prices.0.amount] [prices.0.recordUpdated] [prices.0.readOn] [prices.1.amount] [prices.2.amount] [prices.3.amount] É um valor por tipo, sem dizer o lote nem se é inteira, meia-entrada ou solidário. [prices.note] A Ingresse vende enquanto durar o estoque, pelo valor de cada lote disponível, e não mostra o lote vigente nem os valores antes do login. [sellerPageFacts.generalSale] [sellerPageFacts.prices] Leia os números acima como a listagem do organizador em 30 de julho, não como o preço do dia: o que vale é o que a Ingresse mostra na hora da compra, mais a taxa online. [prices.0.recordUpdated] [sellerPageFacts.fees.online] Quem não tem direito à meia-entrada deve conferir o valor da inteira na Ingresse antes de contar com esses números. [prices.note]{{/until}}",
          },
          {
            id: "taxa-e-pagamento",
            heading: "Taxa, pagamento e parcelamento",
            body: "Na compra online a Ingresse cobra 20% de taxa de conveniência sobre o valor total da compra; na venda presencial não há cobrança de taxa. [sellerPageFacts.fees.online] [sellerPageFacts.fees.inPerson] A Ingresse aceita cartões de crédito e débito Mastercard, Visa, Elo, American Express, Discover, Hipercard, Diners e JCB, Pix, Click to Pay e Google Pay, e diz que não será aceito dinheiro como forma de pagamento. [sellerPageFacts.payment] Os termos e condições da produtora incluem também o Apple Pay. [terms.payment] O parcelamento na venda geral, online e na bilheteria física, é em até 8x com juros nos cartões aceitos. [terms.payment]\n\nOs cartões BB Visa têm ainda uma página de venda à parte na Ingresse, a dos clientes BB Visa, que só aceita esses cartões e permite parcelar em até 10x com juros, inclusive durante a venda geral. [bb_visa_channel.text] [bb_visa_channel.status] A pré-venda exclusiva para cartões BB Visa, com 15% de desconto sobre o primeiro lote e até 10 parcelas, foi de 23 de julho, às 12h, a 28 de julho de 2026, às 10h, e já terminou. [salesTimeline.0.from] [salesTimeline.0.to] [salesTimeline.0.terms]",
          },
          {
            id: "bilheteria",
            heading: "Bilheteria oficial",
            body: "A bilheteria oficial é da Working Title, na Rua Bela Cintra, 1966, Jardim Paulista, São Paulo, CEP 01415-002, de segunda a quinta, das 13h às 17h, exceto feriados, sem taxa. [sellers.1.address] [sellers.1.hours] [sellers.1.fee] Se você viu outro endereço, na Rua Augusta, em notícias de julho: a página da Ingresse, lida em 21 de outubro de 2026, traz a Bela Cintra. [sellers.1.note] Os canais oficiais, segundo a própria Ingresse, são primavera-sound-sp-26.ingresse.com e essa bilheteria. [sellerPageFacts.generalSale]\n\nOs termos e condições da produtora, lidos em 24 de outubro de 2026, preveem ainda uma bilheteria no autódromo nos dias do evento, que vende ingressos, caso não estejam esgotados, e ajuda a resolver problemas e tirar dúvidas. [venue_box_office.text] [Ingresse, a página oficial de venda](/go/primavera-sound-sao-paulo-ingressos/) · [Nota do organizador sobre a venda](/go/primavera-sound-sao-paulo-vendas/)",
          },
          {
            id: "meia-entrada",
            heading: "Meia-entrada: quem tem direito e como provar",
            body: "A regra da Ingresse é simples: quem compra pela internet comprova o direito à meia-entrada no acesso ao evento; quem compra na bilheteria comprova na compra e no acesso. [sellerPageFacts.meiaEntrada] [meiaEntrada.sellerRule] Quem tem direito à meia-entrada está na lei. A [Lei nº 12.933, de 26 de dezembro de 2013](/go/primavera-sound-sao-paulo-lei-12933/), dá meia-entrada a: [meiaEntrada.law]\n\n- estudantes regularmente matriculados, com a carteirinha de estudante (Carteira de Identificação Estudantil, CIE), apresentada na compra e na entrada (art. 1º, § 2º); a CIE vale da data de expedição até 31 de março do ano seguinte (art. 1º, § 6º); [meiaEntrada.who_and_proof.0]\n- pessoas com deficiência, inclusive o acompanhante quando necessário, na forma do regulamento (art. 1º, § 8º); [meiaEntrada.who_and_proof.1]\n- jovens de 15 a 29 anos de baixa renda, inscritos no Cadastro Único, com renda familiar mensal de até dois salários mínimos, na forma do regulamento (art. 1º, § 9º). [meiaEntrada.who_and_proof.2]\n\nPara pessoas com deficiência e jovens de baixa renda, a lei deixa os documentos para um regulamento à parte. [meiaEntrada.who_and_proof.1] [meiaEntrada.who_and_proof.2] A lei assegura a meia-entrada em 40% do total dos ingressos disponíveis para cada evento (art. 1º, § 10) e diz que ela não é cumulativa com outras promoções e convênios nem vale para serviços adicionais em camarotes, áreas e cadeiras especiais (art. 1º, § 1º). [meiaEntrada.cap] [meiaEntrada.not_cumulative]\n\nDuas outras leis valem além dessa. O [Estatuto da Pessoa Idosa](/go/primavera-sound-sao-paulo-estatuto-idoso/) (Lei nº 10.741/2003, art. 23) garante às pessoas com 60 anos ou mais desconto de pelo menos 50% nos ingressos para eventos artísticos, culturais, esportivos e de lazer; o artigo não diz qual documento apresentar. [meiaEntrada.otherLaws.0] [meiaEntrada.who_and_proof.3] A [Lei estadual nº 10.858/2001](/go/primavera-sound-sao-paulo-lei-10858/), com a redação da Lei nº 14.729/2012, assegura aos professores da rede pública estadual e das redes municipais de ensino do Estado de São Paulo o pagamento de 50% do valor do ingresso, comprovado pela carteira funcional da Secretaria da Educação ou pelo holerite (art. 3º). [meiaEntrada.otherLaws.1] Nenhuma das duas aparece como tipo de ingresso nos registros do organizador nem no texto da Ingresse, que, sobre descontos, fala só em meia-entrada e na regra de comprovação. [meiaEntrada.otherLaws.0.document] [sellerPageFacts.meiaEntrada]",
          },
          {
            id: "solidario",
            heading: "Ingresso solidário",
            body: "Parte da arrecadação do ingresso solidário vai para instituições parceiras; ele é aberto a qualquer pessoa, sem comprovação, e não é preciso levar alimento no dia. [sellerPageFacts.solidario]",
          },
          {
            id: "idade-e-portoes",
            heading: "Idade e portões",
            body: "A classificação etária, o termo para menores e o alvará da Vara da Infância são os que a Ingresse publica, e estão, junto com os horários dos portões, em [datas e local](/primavera-sound-sao-paulo/datas-e-local/). [age.asGiven] [gates]",
          },
          {
            id: "sobre",
            heading: "Sobre esta página",
            body: "Esta página reúne o que o organizador e a Ingresse publicam sobre os ingressos do Primavera Sound São Paulo 2026, com a data em que cada informação foi lida; o guia é independente e não vende nada — a compra é pela Ingresse ou na bilheteria da Working Title. [sellers.0] [sellers.1] O resumo do festival está no [guia do Primavera Sound São Paulo 2026](/primavera-sound-sao-paulo/).",
          },
        ],
        faqHeading: "Perguntas frequentes",
        faq: [
          {
            q: "Dá para pagar em dinheiro?",
            a: "Não, nem online nem na bilheteria: o trecho da Ingresse sobre pagamento fala do parcelamento digital e na bilheteria física, lista cartões, Pix, Click to Pay e Google Pay, e termina dizendo que não será aceito dinheiro como forma de pagamento. [sellerPageFacts.payment] Fonte: Ingresse [sources.s22].",
          },
          {
            q: "O VIP já inclui a entrada?",
            a: "{{until prices}}O organizador descreve a Área VIP como \"R$1.200,00 por pessoa + o valor do ingresso do lote vigente\" e lista R$ 1.625,25 para o VIP de sábado ou de domingo (registro de 30 de julho de 2026, lido em 21 de outubro de 2026). [ticketTypes.2.covers] [prices.3.amount] [prices.3.recordUpdated] Fonte: organizador [sources.s2].{{/until}}",
          },
          {
            q: "Preciso provar a meia-entrada na compra online?",
            a: "No acesso ao evento, segundo a Ingresse; na bilheteria, na compra e no acesso. [sellerPageFacts.meiaEntrada] Fonte: Ingresse [sources.s22].",
          },
          {
            q: "Ainda tem ingresso?",
            a: "Em 21 de outubro de 2026 os cinco registros do organizador estavam marcados como à venda, e a Ingresse vende enquanto durar o estoque de cada lote. [prices.0.status] [sellerPageFacts.generalSale] Fonte: organizador [sources.s2], Ingresse [sources.s22].",
          },
        ],
        sourcesHeading: "Fontes",
        sources: "Organizador, registros de ingressos, lidos em 21 de outubro de 2026 [sources.s2]; organizador, nota sobre a venda, 20 de julho de 2026 [sources.s3]; Ingresse, texto do evento, lido em 21 e 22 de outubro de 2026 [sources.s22], e página dos clientes BB Visa, lida em 24 de outubro de 2026 [sources.s34]; Bonus Track, termos e condições da produtora, lidos em 24 de outubro de 2026 [sources.s35]; Câmara dos Deputados, Lei nº 12.933/2013, publicação original [sources.s30], e Planalto, texto compilado [sources.s30b]; Planalto, Lei nº 10.741/2003 [sources.s32]; Assembleia Legislativa de São Paulo, Lei nº 10.858/2001 [sources.s33] — leis lidas em 22 de outubro de 2026.",
      },
      {
        slug: "primavera-sound-sao-paulo/line-up",
        createdAt: "2026-10-22T20:00:00+04:00",
        updatedAt: "2026-10-24T13:52:00+04:00",
        kind: "lineup",
        label: "Line-up",
        crumb: "Line-up",
        navTitle: "Os 40 nomes por dia, na ordem do organizador",
        linkTitle: "Line-up do Primavera Sound São Paulo 2026 por dia",
        title: "Line-up Primavera Sound São Paulo 2026 — guia do festival",
        description: "Line-up do festival Primavera Sound São Paulo 2026: quem toca no sábado 5 e no domingo 6 de dezembro em Interlagos, os 40 nomes na ordem do organizador.",
        h1: "Line-up do Primavera Sound São Paulo 2026",
        lede: "O line-up do Primavera Sound São Paulo 2026 tem 40 nomes, 20 no sábado 5 e 20 no domingo 6 de dezembro de 2026, todos no Autódromo de Interlagos. [lineup.days.0.acts] [lineup.days.1.acts] [lineup.setTimes] A lista do organizador para o sábado traz primeiro The Strokes, FKA twigs e Lily Allen performing 'West End Girl'; a de domingo, Gorillaz, Arca e Yung Lean. A ordem é a da lista, não a dos shows: os horários não foram divulgados. [lineup.days.0.acts] [lineup.days.1.acts] [lineup.orderSource] [lineup.setTimes] O organizador publicou o line-up em 11 de maio de 2026 e, nessa nota, apontou Gorillaz e The Strokes como headliners. [announcements.1]",
        sections: [
          {
            id: "sabado",
            heading: "Sábado, 5 de dezembro de 2026",
            // The day's acts as a row, each drawing its own dot (types.ts,
            // Section.kind).
            kind: "row",
            body: "The Strokes · FKA twigs · Lily Allen performing 'West End Girl' · CMAT · Courtney Barnett · Danny L Harle · Nation of Language · Cara Delevingne · Zé Ibarra · John Talabot · Los Thuthanaka · Mannequin Pussy · Model/Actriz · Nick León · Black Pantera · Gab Ferreira · Johnny Hooker · Josyara · LARINHX · Metrika [lineup.days.0.acts] [lineup.days.0.label]",
          },
          {
            id: "domingo",
            heading: "Domingo, 6 de dezembro de 2026",
            kind: "row",
            body: "Gorillaz · Arca · Yung Lean · underscores · Duquesa · Smerz · ATARASHII GAKKO! · Ecco2k · Gaby Amarantos · Ebony · Ana Frango Elétrico · Machine Girl · Sophia Stel · This Is Lorelei · Carlos Do Complexo · DJ Ramon Sucesso · Juana Molina · Julia Mestre · Melly · Paulete Lindacelva [lineup.days.1.acts] [lineup.days.1.label] [lineup.days.spelling]",
          },
          {
            id: "como-ler",
            heading: "Como ler a lista",
            body: "A ordem é a da página do festival do organizador, não uma ordem de horário: os horários de cada show não foram divulgados até 21 de outubro de 2026, e o registro do organizador traz só o dia de cada artista. [lineup.orderSource] [lineup.setTimes] [lineup.readOn] A grafia dos nomes é a do organizador, inclusive Lily Allen performing 'West End Girl', que é como ele escreve o show dela, e Carlos Do Complexo, com D maiúsculo. [lineup.days.0.acts] [lineup.days.spelling] A Ingresse avisa que os horários dos shows podem sofrer alterações e aponta as atualizações oficiais para os perfis bonustrack.live e primaverasound.saopaulo no Instagram. [sellerPageFacts.gates.note] Os portões abrem às 12h30, a última entrada é às 22h e o festival termina à meia-noite, nos dois dias ([datas e local](/primavera-sound-sao-paulo/datas-e-local/)). [gates.open] [gates.lastEntry] [gates.end]",
          },
          {
            id: "qual-ingresso",
            heading: "Que ingresso serve para qual dia",
            body: "O ingresso de um dia vale para o dia escolhido, sábado 5 ou domingo 6; o Passe Geral vale para os dois; a Área VIP é vendida por dia. [ticketTypes.1.covers] [ticketTypes.0.covers] [ticketTypes.2.covers] Quem quer The Strokes e Gorillaz no mesmo ingresso precisa do passe, porque um está na lista de sábado e o outro na de domingo. [lineup.days.0.acts] [lineup.days.1.acts] [ticketTypes.0.covers] Valores listados, taxa e meia-entrada estão na [página de ingressos](/primavera-sound-sao-paulo/ingressos/).",
          },
          {
            id: "quando-saiu",
            heading: "Quando o line-up saiu",
            body: "A edição foi anunciada pelo organizador em 17 de outubro de 2025, sem nomes; o line-up veio em 11 de maio de 2026, numa nota em que o organizador lembra que o Autódromo de Interlagos já recebeu a edição de 2023. [announcements.0] [announcements.1.what] A divisão por dia que está acima é a da página do festival do organizador e bate, nome a nome, com a da Ingresse, fora três grafias e o show de Lily Allen, que a Ingresse lista só como Lily Allen. [lineup.orderSource] [sellerPageFacts.lineupPerDay] [lineup.days.spelling]",
          },
          {
            id: "primavera-na-cidade",
            heading: "Primavera na Cidade",
            body: "Oito artistas do line-up também fazem shows à parte do festival na mesma semana, o Primavera na Cidade: quarta 2 de dezembro no Cine Joia, quinta 3 no Audio e sexta 4 no Cine Joia. [primaveraNaCidade.context] Em 24 de outubro de 2026, a Ingresse vendia ingressos para as três noites, uma página por noite, com a venda geral aberta desde 21 de outubro, às 12h. A casa abre às 19h. [primaveraNaCidade.ticketing.summary] [salesTimeline.2.from] [primaveraNaCidade.ticketing.doors] O acesso antecipado para \"compradores de Passaporte\", nas palavras da Ingresse, foi de 20 de outubro, às 10h, a 21 de outubro, às 10h, e já terminou. [primaveraNaCidade.ticketing.earlyAccess] A [página do organizador](/go/primavera-sound-sao-paulo-na-cidade/), datada de 19 de outubro de 2026, lista os shows, mas não tem link de venda. [primaveraNaCidade.organiserPage]\n\nNa Ingresse: [quarta, 2 de dezembro](/go/primavera-sound-sao-paulo-na-cidade-2-dec/) · [quinta, 3 de dezembro](/go/primavera-sound-sao-paulo-na-cidade-3-dec/) · [sexta, 4 de dezembro](/go/primavera-sound-sao-paulo-na-cidade-4-dec/)",
          },
          {
            id: "sobre",
            heading: "Sobre esta página",
            body: "Esta página reproduz a programação do organizador dia a dia, na ordem e na grafia dele, para quem quer saber de uma vez quem toca em qual dia; o guia é independente e não vende ingresso. [lineup.orderSource] O resumo do festival está no [guia do Primavera Sound São Paulo 2026](/primavera-sound-sao-paulo/).",
          },
        ],
        faqHeading: "Perguntas frequentes",
        faq: [
          {
            q: "Quem são os headliners do Primavera Sound São Paulo 2026?",
            a: "Gorillaz e The Strokes, segundo a nota do organizador de 11 de maio de 2026; os demais nomes aparecem na ordem da página do festival, sem esse título. [announcements.1.what] [lineup.orderSource] Fonte: organizador [sources.s28] [sources.s1].",
          },
          {
            q: "Que show a Lily Allen faz?",
            a: "O organizador escreve Lily Allen performing 'West End Girl' na lista de sábado, 5 de dezembro. [lineup.days.0.acts] Fonte: organizador [sources.s1] [sources.s4].",
          },
          {
            q: "Já tem horário dos shows?",
            a: "Não até 21 de outubro de 2026: o organizador publicou só o dia de cada artista. [lineup.setTimes] [lineup.readOn] Fonte: organizador [sources.s4].",
          },
          {
            q: "Quantos artistas são?",
            a: "40, 20 por dia, todos no autódromo. [lineup.setTimes] [lineup.days.0.acts] [lineup.days.1.acts] Fonte: organizador [sources.s4].",
          },
        ],
        sourcesHeading: "Fontes",
        sources: "Organizador, página oficial com os blocos de sábado e domingo [sources.s1]; organizador, registro de line-up [sources.s4]; organizador, anúncio do line-up, 11 de maio de 2026 [sources.s28]; organizador, Primavera Na Cidade São Paulo 2026 [sources.s5]; Ingresse, texto do evento [sources.s22]; Ingresse, páginas das três noites do Primavera na Cidade, lidas em 24 de outubro de 2026 [sources.s50] [sources.s51] [sources.s52] — os demais, lidos em 21 e 22 de outubro de 2026.",
      },
      {
        slug: "primavera-sound-sao-paulo/datas-e-local",
        createdAt: "2026-10-22T20:00:00+04:00",
        updatedAt: "2026-10-22T20:00:00+04:00",
        kind: "dates",
        label: "Datas e local",
        crumb: "Datas e local",
        navTitle: "Horários, classificação etária, endereço, como chegar e edições anteriores",
        linkTitle: "Datas, horários, idade e como chegar ao Primavera Sound São Paulo 2026",
        title: "Datas e local do festival Primavera Sound São Paulo 2026",
        description: "Datas e local do festival Primavera Sound São Paulo 2026: 5 e 6 de dezembro no Autódromo de Interlagos, portões, idade, Estação Autódromo e edições anteriores.",
        h1: "Datas e local do Primavera Sound São Paulo 2026",
        lede: "O Primavera Sound São Paulo 2026 é no sábado 5 e no domingo 6 de dezembro de 2026, no Autódromo de Interlagos — Avenida Senador Teotônio Vilela, 261, São Paulo —, com portões às 12h30 nos dois dias. [editions.0.start] [editions.0.end] [venue.address] [gates.open] É a terceira edição, na conta do organizador, e a segunda no autódromo; a de 2024 foi cancelada. [announcements.2] [announcements.3] [editions.2.venue] [editions.1]",
        sections: [
          {
            id: "horarios",
            heading: "Horários",
            body: "Os portões abrem às 12h30, a última entrada é às 22h e o festival termina à meia-noite, no sábado e no domingo; a Ingresse avisa que os horários dos shows podem sofrer alterações e indica os perfis bonustrack.live e primaverasound.saopaulo, no Instagram, para as atualizações oficiais. [gates.open] [gates.lastEntry] [gates.end] [gates.note] [sellerPageFacts.gates.note] Os horários de cada show não foram divulgados até 21 de outubro de 2026; quem toca em cada dia está na [página de line-up](/primavera-sound-sao-paulo/line-up/). [lineup.setTimes] [lineup.readOn] O festival é só nesses dois dias; os shows do Primavera na Cidade, de quarta 2 a sexta 4 de dezembro, no Cine Joia e no Audio, são à parte. [primaveraNaCidade.context]",
          },
          {
            id: "classificacao-etaria",
            heading: "Classificação etária",
            body: "A Ingresse publica este texto: \"Classificação etária: A classificação etária do evento é de 16 (dezesseis) anos. A entrada de menores de idade entre 5 e 15 anos será permitida desde que estejam acompanhados dos pais ou responsáveis legais mediante assinatura do termo de responsabilidade de menores, comprovado por documento de identidade. Proibida entrada de menores de 5 anos. Esta determinação está sujeita à alteração nos termos do alvará a ser expedido pelo Juízo de Direito da Vara da Infância e da Juventude.\" [age.asGiven]\n\nAbaixo do texto, a Ingresse publica dois documentos, abertos sem login. [age.links] O [termo de responsabilidade de menores](/go/primavera-sound-sao-paulo-termo-menor/) é o formulário da produtora: identifica o evento, o responsável legal, o menor e o adulto acompanhante, e exige a assinatura do responsável legal com reconhecimento de firma em cartório; o menor e o acompanhante devem portar documentos de identificação oficiais. [age.links.0] [age.termo.what] [age.termo.requires] Pelo termo, o responsável legal autoriza o menor a entrar e permanecer no evento com um acompanhante maior de idade, que fica responsável por ele. [age.termo.authorizes] [age.termo.companion]\n\nO [alvará judicial](/go/primavera-sound-sao-paulo-alvara/) é uma sentença da Vara da Infância e da Juventude de São Paulo, de 18 de agosto de 2026, com validade de 180 dias, que autoriza a entrada e a permanência no evento de adolescentes com 16 anos completos ou mais, desacompanhados dos pais ou responsável legal, desde que quatro condições sejam cumpridas: classificação indicativa observada, licenças em dia, medidas de proteção e nenhuma bebida alcoólica para crianças e adolescentes. [age.links.1] [age.alvara.what] [age.alvara.covers]\n\nO alvará não fixa faixas etárias para crianças e adolescentes acompanhados: o juiz recusou esse pedido por não ser da competência da Vara; a regra dos 5 aos 15 anos é a que a Ingresse publica. [age.alvara.doesNotCover] [age.asGiven] Para levar um menor de 5 a 15 anos, o termo assinado e o documento são exigidos na entrada, e o ingresso vale só com documento oficial com foto. [age.naEntrada] Leia a [página da Ingresse](/go/primavera-sound-sao-paulo-ingressos/) antes de comprar o [ingresso](/primavera-sound-sao-paulo/ingressos/) para um menor.",
          },
          {
            id: "autodromo",
            heading: "O Autódromo de Interlagos",
            body: "O endereço é Avenida Senador Teotônio Vilela, 261, Interlagos, São Paulo, CEP 04801-010, e o telefone é (11) 5666-8822. [venue.address] [venue.phone] O nome oficial é Autódromo José Carlos Pace: segundo a página de história do próprio autódromo, ele recebeu esse nome em 1985. [venue.name] [venue.nameSource] O festival usa o autódromo pela segunda vez: a edição de 2023 foi ali, e o organizador, ao anunciar o line-up de 2026, lembrou que o local já recebeu a edição de 2023. [editions.2.venue] [announcements.1.what] [Abrir no mapa](/go/primavera-sound-sao-paulo-mapa/) · [Site do autódromo](/go/primavera-sound-sao-paulo-autodromo/)",
          },
          {
            id: "como-chegar",
            heading: "Como chegar ao Autódromo de Interlagos",
            body: "De trem: a [Estação Autódromo](/go/primavera-sound-sao-paulo-viamobilidade/), da Linha 9-Esmeralda, operada pela ViaMobilidade 8 e 9 (Motiva Trilhos). [transport.0.how] A página da estação diz que ela \"está próxima do Autódromo José Carlos Pace, também conhecido como Autódromo de Interlagos\"; o acesso A fica na Rua Plínio Schmidt, 307. [transport.0.how] A estação é acessível, com elevadores, rampas, piso tátil e sanitário acessível, e tem bicicletário com 261 vagas, aberto todos os dias das 6h às 22h, com cadastro na própria estação mediante documento com foto. [transport.0.how]\n\nO que o organizador e a operadora ainda não publicaram (lido em 21 de outubro de 2026): o horário da estação nos dias do festival, trens extras e estacionamento. O organizador não tem página de transporte para 2026, e a página da estação não traz horários nem avisos de evento. [transport.0.note] A ViaMobilidade aparece entre os apoiadores do festival na página do organizador. [transport.3.how] O ingresso VIP inclui um transfer — \"transfer para o local\", nas palavras do organizador; shuttle exclusivo direto para a área VIP dentro de Interlagos, nas da Ingresse —, com ponto de embarque a confirmar. [ticketTypes.2.covers] [transport.1.how]",
          },
          {
            id: "edicoes-anteriores",
            heading: "As edições anteriores",
            body: "- **2022** — sábado 5 e domingo 6 de novembro de 2022, no Distrito Anhembi, a primeira edição brasileira; o organizador contou 120 mil pessoas na semana, 110 mil nos dois dias do Anhembi e 10 mil nos shows do Primavera na Cidade, no Cine Joia, no Auditório Anhembi e no Audio. [editions.3.start] [editions.3.end] [editions.3.venueName] [editions.3.note]\n- **2023** — sábado 2 e domingo 3 de dezembro de 2023, no Autódromo de Interlagos, que o organizador apresentou, em julho de 2023, como o novo local do festival; o balanço do organizador fala em 115 mil pessoas. [editions.2.start] [editions.2.end] [editions.2.note] [editions.2.attendance] [announcements.4]\n- **2024** — marcada para sábado 30 de novembro e domingo 1º de dezembro de 2024, em Interlagos, anunciada pelo organizador em 12 de dezembro de 2023 e cancelada; o organizador publicou a [política de reembolso](/go/primavera-sound-sao-paulo-reembolso-2024/) em 30 de agosto de 2024. [editions.1.note] [editions.1.announcedOn] [announcements.4]\n- **2025** — não houve edição; o organizador conta 2026 como a terceira, depois de 2022 e 2023. [announcements.2] [announcements.3]\n- **2026** — sábado 5 e domingo 6 de dezembro, em Interlagos, anunciada pelo organizador em 17 de outubro de 2025, com o line-up publicado em 11 de maio de 2026. [editions.0] [announcements.0] [announcements.1]",
          },
          {
            id: "e-2027",
            heading: "E 2027?",
            body: "O organizador não anunciou nada sobre 2027 até 21 de outubro de 2026. [questions] A edição de 2024 foi anunciada pelo organizador em 12 de dezembro de 2023 e a de 2026 em 17 de outubro de 2025. [announcements.4] [announcements.0]",
          },
          {
            id: "sobre",
            heading: "Sobre esta página",
            body: "Esta página reúne o que o organizador, a Ingresse, o autódromo e a operadora da Linha 9 publicaram sobre o lugar, os horários e as datas do Primavera Sound São Paulo 2026, com a data em que cada coisa foi lida; o que não foi publicado está dito como não publicado. [transport.0.note] O resumo do festival está no [guia do Primavera Sound São Paulo 2026](/primavera-sound-sao-paulo/).",
          },
        ],
        faqHeading: "Perguntas frequentes",
        faq: [
          {
            q: "Onde será realizado o Primavera Sound 2026?",
            a: "No Autódromo de Interlagos, nome oficial Autódromo José Carlos Pace, Avenida Senador Teotônio Vilela, 261, Interlagos, São Paulo, CEP 04801-010, telefone (11) 5666-8822. [venue.name] [venue.nameSource] [venue.address] [venue.phone] Fonte: autódromo [sources.s7] [sources.s7b].",
          },
          {
            q: "Qual é a estação mais perto?",
            a: "A operadora liga a Estação Autódromo, da Linha 9-Esmeralda, ao autódromo; o acesso é pela Rua Plínio Schmidt, 307. [transport.0.how] Fonte: ViaMobilidade [sources.s29].",
          },
          {
            q: "Tem estacionamento?",
            a: "Nem o organizador nem a operadora da estação publicaram nada sobre estacionamento até 21 de outubro de 2026. [transport.0.note] Fonte: organizador [sources.s1], ViaMobilidade [sources.s29].",
          },
          {
            q: "Menor de 16 pode ir?",
            a: "Pela regra da Ingresse, de 5 a 15 anos acompanhados dos pais ou responsáveis legais, com o termo de responsabilidade assinado e documento de identidade; menores de 5 anos não entram; a regra pode mudar nos termos do alvará da Vara da Infância e da Juventude. [age.asGiven] Fonte: Ingresse [sources.s22].",
          },
          {
            q: "Até que horas dá para entrar?",
            a: "Última entrada às 22h; o festival termina à meia-noite. [gates.lastEntry] [gates.end] Fonte: Ingresse [sources.s22].",
          },
        ],
        sourcesHeading: "Fontes",
        sources: "Organizador, página oficial [sources.s1]; anúncio de 17 de outubro de 2025 [sources.s27]; anúncio do line-up, 11 de maio de 2026 [sources.s28]; anúncio das datas de 2024, 12 de dezembro de 2023 [sources.s31]; \"Informações de como chegar e ir embora do festival\", 1º de novembro de 2022 [sources.s23]; balanço de público, 15 de novembro de 2022 [sources.s26]; anúncio das datas de 2023, 22 de março de 2023 [sources.s24]; line-up de 2023, 20 de julho de 2023 [sources.s25]; política de reembolso 2024, 30 de agosto de 2024 [sources.s10]; Ingresse, texto do evento, termo e alvará [sources.s22]; Autódromo de Interlagos, Prefeitura de São Paulo, página inicial e história [sources.s7] [sources.s7b]; ViaMobilidade 8 e 9, Estação Autódromo [sources.s29] — lidos em 21 e 22 de outubro de 2026; a data de leitura de cada informação está ao lado dela no texto.",
      },
    ],
  },
  {
    slug: "en",
    createdAt: "2026-10-24T13:52:00+04:00",
    updatedAt: "2026-10-24T13:52:00+04:00",
    event: "primavera-sound-sao-paulo",
    // The English twin (card 2026-10-24-primavera-sound-sao-paulo-en): the
    // same edition and sheet, for a reader who searches in English, in the
    // writer's round 2 with the session's swaps after gate 2. Second in the
    // list, so the Portuguese guide stays the x-default and keeps the hub's
    // one card (rules.ts, firstGuides).
    name: "Primavera Sound São Paulo 2026",
    lang: "en",
    dir: "ltr",
    path: "/primavera-sound-sao-paulo/en/",
    cover: "/covers/primavera-sound-sao-paulo.jpg",
    hubLabel: "English",
    hubBlurb: "Primavera Sound São Paulo 2026 is on Saturday 5 and Sunday 6 December 2026 at the Autódromo de Interlagos, São Paulo, Brazil [editions.0.start] [editions.0.end] [venue.name] [venue.country].",
    // sale: 42 days after the 24 October readings in its spans, the most test:fest allows (gate 3, D1).
    expires: { prices: "2026-12-02", sale: "2026-12-05" },
    footerNote: "An independent guide, written from the sources named in it, each with the date it was read. None of them has a hand in it.",
    pages: [
      {
        slug: "primavera-sound-sao-paulo/en",
        createdAt: "2026-10-24T13:52:00+04:00",
        updatedAt: "2026-10-24T13:52:00+04:00",
        kind: "main",
        label: "Guide",
        crumb: "Primavera Sound São Paulo 2026",
        navTitle: "The festival in brief: dates, tickets, the line-up, getting there, what to bring",
        linkTitle: "Primavera Sound São Paulo 2026 in brief: dates, tickets, line-up, getting there and what to bring",
        title: "Primavera Sound São Paulo 2026: 5–6 Dec — festival guide",
        description: "Primavera Sound São Paulo 2026, 5–6 December at Interlagos: tickets, the line-up by day, getting there, what to bring and the age rule. Festival guide.",
        h1: "Primavera Sound São Paulo 2026",
        lede: "Primavera Sound São Paulo 2026 is on Saturday 5 and Sunday 6 December 2026 at the Autódromo de Interlagos, São Paulo, Brazil [editions.0.start] [editions.0.end] [venue.name] [venue.country]. {{until sale}}Tickets are sold online by [Ingresse, the official seller](/go/primavera-sound-sao-paulo-ingressos/) (in Portuguese), and in person at the Working Title box office [sellers.0.name] [sellers.1.name].{{/until}} The Strokes head Saturday's list and Gorillaz head Sunday's [lineup.days.0.acts] [lineup.days.1.acts] [announcements.1.what]. Gates open at 12:30 on both days. The age rating is 16, and children from 5 to 15 come in only with a parent or legal guardian [gates.open] [age.asGiven].\n\nAnyone coming to Interlagos from abroad will find the rules for the day in Portuguese: the terms of Bonus Track (the promoter), its list of prohibited items and Ingresse's event page [sellerPageFacts.producer] [sources.s35] [sources.s36] [sources.s22]. The organiser, Barcelona's Primavera Sound with Bonus Track, publishes the dates, the line-up and the ticket names in English [event.organiser] [sources.s39] [sources.s40]. This guide puts the rest in English, each fact with its source and the date it was read.",
        ledeParas: 1,
        glanceHeading: "At a glance",
        // The date keeps no-break spaces, as the native's does: a Glance
        // value prints as text, out of typeset's reach.
        glance: [
          { label: "Dates", value: "Saturday 5 and Sunday 6\u00a0December\u00a02026 [editions.0.start] [editions.0.end]" },
          { label: "Venue", value: "Autódromo de Interlagos, São Paulo [venue.name]" },
          { label: "Gates", value: "12:30, last entry 22:00 [gates.open] [gates.lastEntry]" },
          { label: "Tickets", value: "Ingresse and the Working Title box office [sellers.0.name] [sellers.1.name]{{until prices}}. The organiser lists R$425.25 for a day and R$765.45 for both [prices.1.amount] [prices.0.amount]{{/until}}" },
          { label: "Age", value: "16. From 5 to 15 with a parent or legal guardian [age.asGiven]" },
        ],
        glanceNote: "Read on 24 October 2026",
        jumps: [
          { id: "tickets", label: "Tickets" },
          { id: "days", label: "Dates and times" },
          { id: "line-up", label: "Line-up" },
          { id: "getting-there", label: "Getting there" },
          { id: "what-to-bring", label: "What to bring" },
          { id: "before-you-fly", label: "Before you fly" },
          { id: "questions", label: "Questions" },
          { id: "sources", label: "Sources" },
        ],
        sections: [
          {
            id: "tickets",
            heading: "Tickets{{until sale}}: who sells them{{/until}}{{until prices}} and the organiser's listed prices{{/until}}",
            body: "{{until sale}}[Ingresse](/go/primavera-sound-sao-paulo-ingressos/) (in Portuguese) sells online. It is the only seller in the organiser's ticket records, and its general sale opened at 12:00 on 28 July 2026 [sellers.0.note] [salesTimeline.1.from]. In person, the official box office is Working Title, at Rua Bela Cintra, 1966, Jardim Paulista. It is open Monday to Thursday from 13:00 to 17:00, except on public holidays [sellers.1.address] [sellers.1.hours].{{/until}} {{until prices}}Working Title charges no fee. Online, Ingresse adds a 20% booking fee to the total [sellers.1.fee] [sellerPageFacts.fees.online].{{/until}} {{until sale}}The promoter's terms also provide for a box office at the circuit on the festival days, which sells only if tickets remain [venue_box_office.text].{{/until}}\n\nThere are three kinds of ticket, in the organiser's English. The Full Festival Ticket, or Primavera Pass, gives General Admission on both days. The day ticket, Primavera Day, covers Saturday 5 or Sunday 6 December. VIP is sold by the day [ticket_names_en.pass] [ticket_names_en.day] [ticket_names_en.vip]. {{until prices}}The organiser's ticket records, last updated on 30 July 2026 and read on 24 October 2026, list R$765.45 for the Full Festival Ticket and R$425.25 for a day ticket [prices.0.amount] [prices.1.amount] [prices.0.recordUpdated] [prices.0.readOn].{{/until}} {{until sale}}Ingresse shows its current tier and its own prices only after you log in [sellerPageFacts.prices] [scout.not_found.1].{{/until}} What each ticket covers, Half-Price, buying from abroad and the Portuguese words on Ingresse's pages are on [the tickets page](/primavera-sound-sao-paulo/en/tickets/).",
          },
          {
            id: "days",
            heading: "Two festival days, and three club nights before them",
            body: "The festival itself runs for two days, Saturday 5 and Sunday 6 December 2026 [editions.0.start] [editions.0.end]. Gates open at 12:30. Entry closes at 22:00, and the day ends at midnight [gates.open] [gates.lastEntry] [gates.end]. Ingresse warns that show times may change, and points to the Instagram accounts @bonustrack.live and @primaverasound.saopaulo for official updates [sellerPageFacts.gates.note]. On 24 October 2026 no set times had been published. The organiser gives each act a day and nothing more [lineup.setTimes] [lineup.readOn].\n\nIf you have read that the festival runs over more days, that is Primavera na Cidade, \"Primavera in the City\". It is a separate series of club nights in the same week, with eight acts from the bill. They are on Wednesday 2 December at Cine Joia, Thursday 3 December at Audio and Friday 4 December at Cine Joia again [primaveraNaCidade.context]. {{until sale}}Ingresse has had all three on general sale since 12:00 on 21 October 2026, with a page for each night [primaveraNaCidade.ticketing.summary] [salesTimeline.2.from].{{/until}} Who plays which night is on [the line-up page](/primavera-sound-sao-paulo/en/lineup/).",
          },
          {
            id: "line-up",
            heading: "Who plays which day",
            body: "The organiser lists 20 acts a day, 40 in all [lineup.days.0.acts] [lineup.days.1.acts]. Saturday's list opens with The Strokes, FKA twigs and Lily Allen performing \"West End Girl\". Sunday's opens with Gorillaz, Arca and Yung Lean [lineup.days.0.acts] [lineup.days.1.acts]. That is the organiser's order, not a running order [lineup.orderSource]. When it announced the bill on 11 May 2026, the organiser named Gorillaz and The Strokes as headliners [announcements.1.what]. Every name, day by day, is on [the line-up page](/primavera-sound-sao-paulo/en/lineup/).",
          },
          {
            id: "getting-there",
            heading: "Getting to Interlagos",
            body: "The address is Av. Senador Teotônio Vilela, 261, Interlagos, São Paulo – SP, 04801-010 [venue.address]. The circuit's official name is Autódromo José Carlos Pace, and the organiser's English calls it the Interlagos Circuit [venue.name] [venue.nameSource] [announcements.1.what]. [Open in maps](/go/primavera-sound-sao-paulo-mapa/) · [The circuit's website (in Portuguese)](/go/primavera-sound-sao-paulo-autodromo/)\n\nTrains on Line 9-Esmeralda, which ViaMobilidade runs, stop at [Autódromo](/go/primavera-sound-sao-paulo-viamobilidade/) (in Portuguese). The operator describes it as near the circuit, and its entrance A is at Rua Plínio Schmidt, 307 [transport.0.how]. On 24 October 2026 neither the organiser nor the operator had published the station's hours on the festival days, extra trains or parking [transport.0.note] [transport.0.readOn]. The trains from Guarulhos airport, and the lines that meet Line 9, are on [the dates and venue page](/primavera-sound-sao-paulo/en/dates-and-venue/) [transport_air.gru] [transport_air.line9].",
          },
          {
            id: "what-to-bring",
            heading: "What to bring, and what to leave behind",
            body: "Everyone is searched at the entrance, and anything on the prohibited list is thrown away [prohibited_items.search] [terms.search]. There is no cloakroom, according to the promoter's terms, so what you bring stays with you all day [terms.no_cloakroom]. Once you leave, you cannot come back in, unless you hold another valid ticket for the same day [terms.no_reentry].\n\nIngresse's selling rules say you show the ticket in the Ingresse app at the gate, with an official photo ID [ingresse_rules_en.rule6]. The app's QR code keeps changing, and Ingresse's help centre says a screenshot is not accepted [ingresse_qr.text]. So bring your phone, with the app on it, and your ID.\n\nYou may bring in food only if it is sealed and factory-made, such as biscuits, crisps or cereal bars, up to five items a person. Fruit must be cut up and carried in a clear, soft pack [prohibited_items.food]. You may also bring water in single-serve plastic cups or bottles, but without the cap. Security may take a cap off at the entrance or anywhere on site [prohibited_items.text]. The terms promise drinking-water points for the public [terms.water].\n\nThe promoter's [list of prohibited items, a PDF in Portuguese](/go/primavera-sound-sao-paulo-prohibited-items/), and its terms rule out, among other things [prohibited_items.text] [prohibited_items.omitted]:\n\n- bags or rucksacks larger than 20 × 30 cm\n- umbrellas of any size, and selfie sticks\n- any other drink, in any container, alcohol included\n- e-cigarettes, vapes and e-liquids, and aerosols and sprays of any kind\n- medicines without a prescription\n- professional cameras with interchangeable lenses, video cameras, recorders, tablets, laptops, walkie-talkies and other large electronic equipment\n- chairs and stools, polystyrene boxes, cool boxes and other storage containers, tents, and flags on poles\n- drones and anything else that flies, skateboards, bicycles and any other vehicle, motorised or not, and helmets\n- glass, metal or hard plastic objects that could cause harm, and sharp objects such as pens, scissors, nail clippers and razors\n- weapons, tasers and knuckle-dusters, illegal drugs, and anything flammable or corrosive [prohibited_items.omitted]\n- laser pointers, strobe lights and other light-emitting devices, fireworks and flares, and megaphones and horns\n- metal hand fans, and heavy chains, belts and pendants\n- balloons and juggling kit, paints and dyes, rolls of paper, newspapers, magazines, posters, leaflets and stickers, and goods to sell\n- ambush-marketing items, and shirts, flags or signs with unauthorised commercial or discriminatory content\n- animals, except guide dogs with identification [terms.animals]\n- recording or broadcasting the festival, in sound or on video [terms.recording]\n\nIt is a thorough list. It even covers juggling.",
          },
          {
            id: "before-you-fly",
            heading: "Before you fly: passports and visas",
            body: "British citizen passport holders can visit Brazil for tourism for up to 90 days without a visa, according to GOV.UK's entry requirements for Brazil, updated 29 September 2026 [entry_uk.for] [entry_uk.visa] [sources.s46]. The passport must have an expiry date at least six months after the day you arrive [entry_uk.passport]. Make sure the border officer stamps it. Without a stamp you may be fined when you leave [entry_uk.stamp]. Brazilian immigration often requires British-Brazilian dual nationals to travel on their Brazilian passport [entry_uk.dual]. Cash or travellers cheques worth USD 10,000 or more must be declared online [entry_uk.cash]. [GOV.UK, Brazil entry requirements](/go/primavera-sound-sao-paulo-gov-uk/)\n\nOn a regular Canadian passport, you need a tourist visa, according to the Government of Canada's travel advice for Brazil, last updated 14 October 2026. Its page links to \"Brazil eVisa – VFS Global\" [entry_ca.for] [entry_ca.visa] [sources.s47]. The passport must be valid for the length of the stay [entry_ca.passport]. Customs may ask for a return or onward ticket and proof of enough money for the stay [entry_ca.other]. Canadian-Brazilian dual citizens must enter and leave Brazil on their Brazilian passport [entry_ca.dual]. [Government of Canada, travel advice for Brazil](/go/primavera-sound-sao-paulo-travel-gc-ca/)\n\nOn a US passport, the State Department's travel advice is the place to check. On an Australian one, Smartraveller. On any other passport, check your own government's advice for Brazil [entry_us_au.text].",
          },
        ],
        faqHeading: "Questions people ask",
        faq: [
          {
            q: "When is Primavera Sound São Paulo 2026?",
            a: "On Saturday 5 and Sunday 6 December 2026, with gates opening at 12:30 on both days. Those are the dates on the organiser's São Paulo page and on Ingresse's, both read 24 October 2026 [editions.0.start] [editions.0.end] [sellerPageFacts.dates] [gates.open] [sources.s39] [sources.s22].",
          },
          {
            q: "Where is Primavera Sound São Paulo held?",
            a: "At the Autódromo de Interlagos, Av. Senador Teotônio Vilela, 261, in Interlagos, São Paulo. The operator of Line 9-Esmeralda describes its Autódromo station as near the circuit [venue.address] [transport.0.how] [sources.s7] [sources.s29].",
          },
          {
            q: "Who is playing Primavera Sound São Paulo 2026?",
            a: "The Strokes, FKA twigs and Lily Allen open Saturday's list. Gorillaz, Arca and Yung Lean open Sunday's. Forty acts in all, according to the organiser's page, read 24 October 2026 [lineup.days.0.acts] [lineup.days.1.acts] [lineup.readOn] [sources.s39]. The full list is on [the line-up page](/primavera-sound-sao-paulo/en/lineup/).",
          },
          {
            q: "Has Primavera Sound São Paulo 2026 sold out?",
            a: "{{until sale}}Not by 24 October 2026. The organiser's five ticket records were marked on sale, and both days were available on Ingresse [prices.0.status] [scout.1.2.organiser_tabs] [scout.1.1.ingresse_sessions] [sources.s40] [sources.s37]. Ingresse sells while stocks last [sellerPageFacts.generalSale].{{/until}}",
          },
          {
            q: "How much are Primavera Sound São Paulo tickets?",
            a: "{{until prices}}The organiser lists R$425.25 for a day ticket and R$765.45 for the Full Festival Ticket, in records updated 30 July 2026 and read 24 October 2026 [prices.1.amount] [prices.0.amount] [prices.0.recordUpdated] [prices.0.readOn] [sources.s40].{{/until}} {{until sale}}Ingresse shows the current tier's price after you log in [sellerPageFacts.prices] [sources.s22].{{/until}} {{until prices}}Online, it adds a 20% booking fee [sellerPageFacts.fees.online].{{/until}} {{until sale}}The details are on [the tickets page](/primavera-sound-sao-paulo/en/tickets/).{{/until}}",
          },
          {
            q: "Is Primavera Sound São Paulo 18+?",
            a: "No. The age rating is 16, according to Ingresse's page. Children aged 5 to 15 may come with their parents or legal guardians and a signed consent form, and under-5s may not enter [age.asGiven] [sources.s22]. The form and the court order are on [the dates and venue page](/primavera-sound-sao-paulo/en/dates-and-venue/).",
          },
          {
            q: "Can you bring alcohol into Primavera Sound São Paulo?",
            a: "No. The promoter's list of prohibited items bars alcohol and every other drink, except single-serve plastic cups or bottles of water with the cap off [prohibited_items.text] [sources.s36].",
          },
          {
            q: "Is there a cloakroom at Primavera Sound São Paulo?",
            a: "No. The promoter's terms say the event will not offer one [terms.no_cloakroom] [sources.s35].",
          },
          {
            q: "How do I get to Primavera Sound São Paulo from the airport?",
            a: "At Guarulhos (GRU), the airport's station is on CPTM Line 13-Jade, which runs to Engenheiro Goulart. There you change to Line 12-Safira, which goes to Tatuapé, Brás and Luz, according to the airport's page [transport_air.gru] [sources.s44]. Autódromo station, which its operator describes as near the circuit, is on Line 9-Esmeralda. According to the same operator, that line meets Line 4-Amarela at Pinheiros, Line 5-Lilás at Santo Amaro and Line 8-Diamante at Osasco [transport.0.how] [transport_air.line9] [sources.s45]. No official page sets out the whole route [transport_air.note].",
          },
          {
            q: "Do I need a visa for Brazil?",
            a: "Not as a tourist on a British citizen passport, for up to 90 days, according to GOV.UK. On a regular Canadian passport, you need a tourist visa, according to the Government of Canada. Both pages were read 24 October 2026 [entry_uk.for] [entry_uk.visa] [entry_ca.for] [entry_ca.visa] [sources.s46] [sources.s47]. On a US passport, check the State Department's advice [entry_us_au.text].",
          },
          {
            q: "Is Primavera Sound São Paulo the same as Primavera Sound Barcelona?",
            a: "Same brand, separate festival. Primavera Sound of Barcelona puts on the São Paulo edition with Bonus Track, a São Paulo promoter. It has its own dates, venue and line-up [event.organiser] [sellerPageFacts.producer] [sources.s39] [sources.s22].",
          },
        ],
        sourcesHeading: "Sources",
        sourcesNote: "Read on 24 October 2026 unless another date is given.",
        sources: "- [Primavera Sound São Paulo, the organiser's page in English](/go/primavera-sound-sao-paulo-site-en/): dates and the line-up by day [sources.s39] [sources.s1]\n- [The organiser's ticket page, in English](/go/primavera-sound-sao-paulo-tickets-en/): ticket names{{until prices}} and listed prices{{/until}} [sources.s40] [sources.s2]\n- The organiser's line-up announcement, 11 May 2026, read 21 October 2026 [sources.s28]\n- [Primavera Na Cidade São Paulo 2026, the organiser's page in English](/go/primavera-sound-sao-paulo-na-cidade-en/) [sources.s43] [sources.s5] · Ingresse's pages for the three club nights, in Portuguese [sources.s50] [sources.s51] [sources.s52]\n- [Ingresse, the official seller, event page in Portuguese](/go/primavera-sound-sao-paulo-ingressos/), with its selling rules in English [sources.s22] [sources.s37]\n- [Bonus Track, terms and conditions for Primavera Sound São Paulo 2026, in Portuguese](/go/primavera-sound-sao-paulo-terms/) [sources.s35]\n- [Prohibited items, a PDF in Portuguese](/go/primavera-sound-sao-paulo-prohibited-items/) [sources.s36]\n- [Ingresse help centre, where to find your ticket, in Portuguese](/go/primavera-sound-sao-paulo-ingresse-tickets-help/) [sources.s49]\n- [Autódromo de Interlagos, City of São Paulo](/go/primavera-sound-sao-paulo-autodromo/), home page, and its history page, read 22 October 2026 [sources.s7] [sources.s7b]\n- [ViaMobilidade, Autódromo station, Line 9-Esmeralda](/go/primavera-sound-sao-paulo-viamobilidade/) [sources.s29]\n- [GRU Airport, to and from the airport by train](/go/primavera-sound-sao-paulo-gru-train/) [sources.s44] · [ViaMobilidade, Line 9-Esmeralda](/go/primavera-sound-sao-paulo-line-9/) [sources.s45]\n- [GOV.UK, Brazil entry requirements](/go/primavera-sound-sao-paulo-gov-uk/), updated 29 September 2026 [sources.s46]\n- [Government of Canada, travel advice for Brazil](/go/primavera-sound-sao-paulo-travel-gc-ca/), updated 14 October 2026 [sources.s47]",
      },
      {
        slug: "primavera-sound-sao-paulo/en/tickets",
        createdAt: "2026-10-24T13:52:00+04:00",
        updatedAt: "2026-10-24T13:52:00+04:00",
        kind: "tickets",
        label: "Tickets",
        crumb: "Tickets",
        navTitle: "The three kinds of ticket, buying from abroad, how to pay, Half-Price and refunds",
        linkTitle: "Primavera Sound São Paulo 2026 tickets: pass, day and VIP, buying from abroad, Half-Price and refunds",
        title: "Primavera Sound São Paulo 2026: tickets — festival guide",
        description: "Primavera Sound São Paulo 2026 tickets: the pass, day and VIP tickets, Ingresse or the box office, Half-Price and buying from abroad. Festival guide.",
        h1: "Primavera Sound São Paulo 2026 tickets",
        lede: "{{until sale}}Tickets for Primavera Sound São Paulo 2026 are sold online by Ingresse and in person at the Working Title box office in São Paulo [sellers.0.name] [sellers.1.name]. Visitors from abroad can buy in the Ingresse app with a passport number and PayPal, according to Ingresse's help centre [ingresse_foreigners.text].{{/until}} The tickets are for Saturday 5 and Sunday 6 December 2026 at the Autódromo de Interlagos [editions.0.start] [editions.0.end]. There are three kinds: the Full Festival Ticket for both days, a day ticket, and VIP by the day [ticket_names_en.pass] [ticket_names_en.day] [ticket_names_en.vip]. {{until sale}}The price is the current tier's at the moment you buy, and Ingresse shows it only after you log in [sellerPageFacts.generalSale] [sellerPageFacts.prices].{{/until}} Who plays which day is on [the line-up page](/primavera-sound-sao-paulo/en/lineup/). Getting there and what to bring are in [the main guide](/primavera-sound-sao-paulo/en/).",
        jumps: [
          { id: "kinds", label: "The three kinds" },
          { id: "prices", label: "{{until prices}}Listed prices{{/until}}" },
          { id: "from-abroad", label: "Buying from abroad" },
          { id: "paying", label: "How to pay" },
          { id: "box-offices", label: "{{until sale}}Box offices{{/until}}" },
          { id: "half-price", label: "Half-Price" },
          { id: "solidarity", label: "Solidarity" },
          { id: "resale-refunds", label: "Resale and refunds" },
          { id: "portuguese", label: "The seller's Portuguese" },
        ],
        sections: [
          {
            id: "kinds",
            heading: "The three kinds of ticket",
            body: "- **Full Festival Ticket** (PRIMAVERA PASS). In the organiser's words, it grants \"General Admission access on Saturday, 5 December and Sunday, 6 December\" [ticket_names_en.pass]. General Admission is the organiser's English for \"pista\", the word on the Portuguese pages [ticket_names_en.note] [ticketTypes.0.covers].\n- **Day ticket** (PRIMAVERA DAY), sold as \"Saturday 5th December\" or \"Sunday 6th December\". It gives General Admission on the day you choose [ticket_names_en.day]. Who plays which day is on [the line-up page](/primavera-sound-sao-paulo/en/lineup/).\n- **VIP** (VIP PRIMAVERA DAY), sold by the day as \"VIP Saturday 5th December\" or \"VIP Sunday 6th December\" [ticket_names_en.vip]. The organiser describes \"open bar, open food, transportation to the festival venue, and a comfortable lounge area\" [ticket_names_en.vip]. Ingresse's page adds a shuttle to the VIP area inside Interlagos, its boarding point still to be confirmed, and a covered, air-conditioned space [sellerPageFacts.vip]. VIP was not in the presale. It went on sale when the general sale opened [salesTimeline.0.terms] [salesTimeline.1.terms]. {{until prices}}The organiser's English page prices it at \"R$1,200.00 per person, in addition to the price of the current ticket tier\" [ticket_names_en.vip].{{/until}}",
          },
          {
            id: "prices",
            heading: "{{until prices}}What the organiser lists as prices{{/until}}",
            body: "{{until prices}}The organiser's five ticket records were last updated on 30 July 2026. On 24 October 2026 they listed one price per ticket, in Brazilian reais (R$), and all five were marked on sale [prices.0.recordUpdated] [prices.0.readOn] [prices.0.status] [scout.1.2.organiser_tabs]:{{/until}}\n\n- {{until prices}}Full Festival Ticket: R$765.45 [prices.0.amount]{{/until}}\n- {{until prices}}Saturday 5th December: R$425.25 [prices.1.amount]{{/until}}\n- {{until prices}}Sunday 6th December: R$425.25 [prices.2.amount]{{/until}}\n- {{until prices}}VIP Saturday 5th December or VIP Sunday 6th December: R$1,625.25, which is R$1,200.00 plus the day ticket's R$425.25 [prices.3.amount] [ticket_names_en.vip] [prices.1.amount]{{/until}}\n\n{{until prices}}Each record gives one figure. It does not say which tier it is, or whether it is the full price, the Half-Price or the Solidarity price [prices.note]. Ingresse sells while stocks last, at each tier's price, and shows the current tier and its prices only after you log in [sellerPageFacts.generalSale] [sellerPageFacts.prices] [scout.not_found.1]. Read the list as the organiser's listing of 30 July, not as the price of the day. What counts is what Ingresse shows when you buy, plus the 20% booking fee online [prices.0.recordUpdated] [sellerPageFacts.fees.online]. Check the price for your own ticket on Ingresse before counting on these figures [sellerPageFacts.prices].{{/until}}",
          },
          {
            id: "from-abroad",
            heading: "Buying from abroad",
            body: "Ingresse's help centre has [an article for foreigners](/go/primavera-sound-sao-paulo-ingresse-foreigners/), written for all its events rather than this one [ingresse_foreigners.text] [ingresse_foreigners.note]. It describes buying in the Ingresse app, in these steps [ingresse_foreigners.text]:\n\n1. Log in and find the event.\n2. Tap \"Comprar Ingresso\" (buy ticket), choose how many, and tap \"Avançar\" (next).\n3. Complete the registration \"with the number of your foreign document (eg; passport)\".\n4. Say whose ticket it is.\n5. Pay by PayPal, and finish.\n\nQuestions go to contato@ingresse.com [ingresse_foreigners.text]. The article does not say whether Ingresse's website checkout takes cards issued abroad, or whether it asks for a Brazilian CPF (taxpayer) number [ingresse_foreigners.note] [scout.not_found.3].\n\nThe ticket lives in the app. Its QR code keeps changing, so you open the app at the gate, and a screenshot is not accepted [ingresse_qr.text]. Ingresse's selling rules ask for the digital ticket in the app together with an official photo ID [ingresse_rules_en.rule6]. Its customer service answers every day from 11:00 to 19:00 by email and phone, and from 10:00 to 23:00 on WhatsApp. It also has an online FAQ [ingresse_rules_en.sac].",
          },
          {
            id: "paying",
            heading: "How to pay",
            body: "{{until prices}}Online, Ingresse adds a 20% booking fee to the whole purchase. In person there is none [sellerPageFacts.fees.online] [sellerPageFacts.fees.inPerson].{{/until}} Ingresse's page lists credit and debit cards (Mastercard, Visa, Elo, American Express, Discover, Hipercard, Diners and JCB), Pix, Click to Pay and Google Pay. Cash is not accepted [sellerPageFacts.payment]. The promoter's terms list Apple Pay as well [terms.payment]. Under those terms, the general sale allows up to eight instalments, with interest, on the accepted cards, online or at the box office [terms.payment].\n\n{{until sale}}The BB Visa presale ran from 12:00 on 23 July to 10:00 on 28 July 2026, with 15% off first-tier tickets, and it is over [sales_note_en.text] [salesTimeline.0.from] [salesTimeline.0.to]. There is also a separate sales page on Ingresse for BB Visa cards. It takes only those cards, and allows up to ten instalments, with interest, during the general sale too [bb_visa_channel.text] [bb_visa_channel.status].{{/until}}",
          },
          {
            id: "box-offices",
            heading: "{{until sale}}The box offices{{/until}}",
            body: "{{until sale}}The official box office is Working Title, at Rua Bela Cintra, 1966, Jardim Paulista, São Paulo, 01415-002. It is open Monday to Thursday from 13:00 to 17:00, except on public holidays [sellers.1.address] [sellers.1.hours].{{/until}} {{until prices}}It charges no fee [sellers.1.fee].{{/until}} {{until sale}}If you have seen an address on Rua Augusta in reports from July, Ingresse's page gives Rua Bela Cintra [sellers.1.note]. Neither Ingresse's page nor the promoter's terms say whether the box office sells VIP [scout.not_found.6].{{/until}}\n\n{{until sale}}The promoter's terms name two official channels: online at primavera-sound-sp-26.ingresse.com, and in person at Working Title [official_channels.text]. They add a box office at the circuit on the festival days. It sells tickets if they have not sold out, and deals with problems and questions [venue_box_office.text]. [Ingresse, the official seller (in Portuguese)](/go/primavera-sound-sao-paulo-ingressos/) · [The organiser's ticket note of 20 July 2026, in English](/go/primavera-sound-sao-paulo-sales-en/){{/until}}",
          },
          {
            id: "half-price",
            heading: "Half-Price (meia-entrada): who qualifies",
            body: "Brazilian law gives some buyers a half-price ticket, the meia-entrada, which the organiser calls Half-Price in English [meiaEntrada.law] [sales_note_en.terms_en]. The promoter's terms list who qualifies [terms.meia_docs]:\n\n- students\n- low-income young people aged 15 to 29\n- people with disabilities, and one companion\n- people aged 60 and over, with an official photo ID that shows the date of birth\n- teachers and staff at state and municipal public schools in São Paulo\n- pensioners, in the city of São Paulo only, with an INSS card\n\nIf you buy online, you show proof of entitlement at the entrance. At the box office you show it when you buy, and again at the entrance [sellerPageFacts.meiaEntrada]. For students, the proof the law names is the Carteira de Identificação Estudantil (CIE), the student ID card, under Lei nº 12.933/2013 (read 21 October 2026) [meiaEntrada.who_and_proof.0] [meiaEntrada.readOn]. Neither the terms nor Ingresse's page says whether a student card or a passport from another country counts [scout.not_found.2].",
          },
          {
            id: "solidarity",
            heading: "Solidarity tickets",
            body: "The Solidarity ticket, \"solidário\" on Ingresse, sends part of the takings to partner charities [sales_note_en.terms_en] [sellerPageFacts.solidario]. Anyone may buy it, with no proof, and no food donation is needed on the day [sellerPageFacts.solidario].",
          },
          {
            id: "resale-refunds",
            heading: "Resale, refunds and the small print",
            body: "The promoter's terms forbid reselling tickets. The organiser is not responsible for tickets bought through unofficial channels [terms.resale]. Ingresse's selling rules call its website and app its only official sales channels [ingresse_rules_en.rule4]. Whether a ticket can be transferred is the organiser's decision, and on 24 October 2026 it had not said [ingresse_rules_en.rule9_en] [scout.not_found.7].\n\nUnder the terms [terms.refunds]:\n\n- you may cancel within seven calendar days of buying\n- if the festival is postponed, the ticket is valid for the new date, or you may ask for a refund instead\n- if it is cancelled, tickets are refunded\n- changes to the programme or to some of the acts bring no refund\n- if a day's headliner cancels, the ticket stays valid, and a buyer who decides in advance not to go may ask for the face value back by the organiser's deadline\n- a card refund can take up to two billing cycles\n- in none of these cases will the organiser or Ingresse pay for hotels, travel or food [terms.no_extra_costs]\n\nNot turning up voids the ticket, with no refund, under Ingresse's rules [ingresse_rules_en.rule7].\n\nIngresse's own rules differ by language. The Portuguese version gives the same seven days, up to 48 hours before the event, less the booking fee. The English version lists only a cancelled or rescheduled event, or an order from the organiser [ingresse_rules_en.rule8_pt] [ingresse_rules_en.rule8_en]. The terms themselves may change at any time [terms.changeable]. [The promoter's terms, in Portuguese](/go/primavera-sound-sao-paulo-terms/)",
          },
          {
            id: "portuguese",
            heading: "The seller's Portuguese, in brief",
            body: "- **ingresso**: ticket [venue_box_office.text]\n- **inteira**: the full price [prices.note]\n- **meia-entrada**, or \"meia\": Half-Price [sales_note_en.terms_en]\n- **solidário**: the Solidarity ticket [sales_note_en.terms_en]\n- **lote**: a price tier [sellerPageFacts.generalSale]\n- **pista**: General Admission [ticket_names_en.note]\n- **taxa de conveniência**: the booking fee [primaveraNaCidade.ticketing.fees]\n- **parcelamento**, \"em até 8x com juros\": paying in up to eight instalments, with interest [sellerPageFacts.payment]\n- **bilheteria**: box office [sellerPageFacts.payment]\n- **termo de responsabilidade**: the consent form for minors [age.asGiven]",
          },
        ],
        faqHeading: "Questions people ask",
        faq: [
          {
            q: "How do you get tickets for Primavera Sound São Paulo?",
            a: "{{until sale}}Online on Ingresse, or in person at the Working Title box office in São Paulo, Monday to Thursday from 13:00 to 17:00, except on public holidays. On the festival days, the promoter's terms provide for a box office at the circuit, if tickets remain [sellers.0.name] [sellers.1.name] [sellers.1.hours] [venue_box_office.text] [sources.s22] [sources.s35].{{/until}}",
          },
          {
            q: "Can you buy one-day tickets for Primavera Sound São Paulo?",
            a: "Yes. The day ticket, Primavera Day, gives General Admission on Saturday 5 or Sunday 6 December, according to the organiser's ticket page, read 24 October 2026 [ticket_names_en.day] [sources.s40].",
          },
          {
            q: "Can a foreigner buy tickets on Ingresse?",
            a: "Yes, in the app, according to Ingresse's help article for foreigners. You register with a passport number and pay by PayPal [ingresse_foreigners.text] [sources.s48]. The article does not say whether the website takes cards issued abroad [scout.not_found.3].",
          },
          {
            q: "Can I show a screenshot of my ticket?",
            a: "No. Ingresse's tickets carry a QR code that keeps changing, so you open the app at the gate, according to Ingresse's help centre [ingresse_qr.text] [sources.s49].",
          },
          {
            q: "Can I resell my Primavera Sound São Paulo ticket?",
            a: "No. The promoter's terms forbid reselling tickets [terms.resale] [sources.s35]. Ingresse calls its website and app its only official sales channels [ingresse_rules_en.rule4] [sources.s37].",
          },
          {
            q: "How much is the VIP ticket?",
            a: "{{until prices}}The organiser's English page prices VIP at \"R$1,200.00 per person, in addition to the price of the current ticket tier\". Its records, updated 30 July 2026 and read 24 October 2026, list R$1,625.25 for VIP on Saturday or Sunday [ticket_names_en.vip] [prices.3.amount] [prices.3.recordUpdated] [prices.3.readOn] [sources.s40].{{/until}}",
          },
          {
            q: "Can I pay in cash?",
            a: "No. Cash is not accepted, not even at the box office, according to Ingresse's page and the promoter's terms [sellerPageFacts.payment] [terms.payment] [sources.s22] [sources.s35].",
          },
        ],
        sourcesHeading: "Sources",
        sourcesNote: "Read on 24 October 2026 unless another date is given.",
        sources: "- [The organiser's ticket page, in English](/go/primavera-sound-sao-paulo-tickets-en/), and its five ticket records [sources.s40] [sources.s2]\n- [The organiser's ticket note, 20 July 2026, in English](/go/primavera-sound-sao-paulo-sales-en/) [sources.s41]\n- [Ingresse, the official seller, event page in Portuguese](/go/primavera-sound-sao-paulo-ingressos/), with its selling rules in Portuguese, Spanish and English [sources.s22] [sources.s37]\n- Ingresse, the BB Visa cardholders' sales page [sources.s34]\n- [Bonus Track, terms and conditions for Primavera Sound São Paulo 2026, in Portuguese](/go/primavera-sound-sao-paulo-terms/) [sources.s35]\n- [Ingresse help centre, buying as a foreigner](/go/primavera-sound-sao-paulo-ingresse-foreigners/) [sources.s48] · [where to find your ticket, in Portuguese](/go/primavera-sound-sao-paulo-ingresse-tickets-help/) [sources.s49]\n- Ingresse, Primavera na Cidade on 2 December, in Portuguese [sources.s50]\n- Câmara dos Deputados, Lei nº 12.933/2013, read 21 October 2026 [sources.s30]",
      },
      {
        slug: "primavera-sound-sao-paulo/en/lineup",
        createdAt: "2026-10-24T13:52:00+04:00",
        updatedAt: "2026-10-24T13:52:00+04:00",
        kind: "lineup",
        label: "Line-up",
        crumb: "Line-up",
        navTitle: "All 40 acts by day, in the organiser's order",
        linkTitle: "Primavera Sound São Paulo 2026 line-up by day",
        title: "Primavera Sound São Paulo 2026: line-up — festival guide",
        description: "Primavera Sound São Paulo 2026 line-up by day: who plays on Saturday 5 and Sunday 6 December, all 40 acts in the organiser's order. Festival guide.",
        h1: "Primavera Sound São Paulo 2026 line-up by day",
        // Each whole: at 305 and 320 px the h1 broke "2026 line- | up by day",
        // and with "line-up" alone held, "line-up by | day" up to 350 px.
        h1Keep: ["line-up", "by day"],
        lede: "The line-up of Primavera Sound São Paulo 2026 has 40 acts, 20 on Saturday 5 and 20 on Sunday 6 December 2026, all at the Autódromo de Interlagos [lineup.days.0.acts] [lineup.days.1.acts] [lineup.setTimes]. Saturday's list opens with The Strokes, FKA twigs and Lily Allen performing \"West End Girl\". Sunday's opens with Gorillaz, Arca and Yung Lean [lineup.days.0.acts] [lineup.days.1.acts]. The order is the organiser's list, not the running order. On 24 October 2026 no set times had been published [lineup.orderSource] [lineup.setTimes] [lineup.readOn].",
        sections: [
          {
            id: "saturday",
            heading: "Saturday 5 December 2026",
            kind: "row",
            body: "The Strokes · FKA twigs · Lily Allen performing \"West End Girl\" · CMAT · Courtney Barnett · Danny L Harle · Nation of Language · Cara Delevingne · Zé Ibarra · John Talabot · Los Thuthanaka · Mannequin Pussy · Model/Actriz · Nick León · Black Pantera · Gab Ferreira · Johnny Hooker · Josyara · LARINHX · Metrika [lineup.days.0.acts] [lineup.days.0.label]",
          },
          {
            id: "sunday",
            heading: "Sunday 6 December 2026",
            kind: "row",
            body: "Gorillaz · Arca · Yung Lean · underscores · Duquesa · Smerz · ATARASHII GAKKO! · Ecco2k · Gaby Amarantos · Ebony · Ana Frango Elétrico · Machine Girl · Sophia Stel · This Is Lorelei · Carlos Do Complexo · DJ Ramon Sucesso · Juana Molina · Julia Mestre · Melly · Paulete Lindacelva [lineup.days.1.acts] [lineup.days.1.label] [lineup.days.spelling]",
          },
          {
            id: "reading",
            heading: "How to read the list",
            body: "The order is the one on the organiser's São Paulo page. It is billing, not a timetable [lineup.orderSource]. The organiser's line-up record gives each act its day and nothing more [lineup.setTimes]. Names are spelt as the organiser spells them, \"Carlos Do Complexo\" with a capital D among them. Ingresse spells three of them differently, and lists Lily Allen without the title of her show [lineup.days.spelling] [sellerPageFacts.lineupPerDay]. Ingresse also warns that show times may change [sellerPageFacts.gates.note]. Gates, last entry and the end of each day are on [the dates and venue page](/primavera-sound-sao-paulo/en/dates-and-venue/) [gates.open] [gates.lastEntry] [gates.end].",
          },
          {
            id: "which-ticket",
            heading: "Which ticket covers which day",
            body: "A day ticket covers the day you choose, Saturday 5 or Sunday 6. The Full Festival Ticket covers both, and VIP is sold by the day [ticket_names_en.day] [ticket_names_en.pass] [ticket_names_en.vip]. The Strokes are on Saturday's list and Gorillaz on Sunday's [lineup.days.0.acts] [lineup.days.1.acts]. Seeing both takes the Full Festival Ticket, or a day ticket for each day [ticket_names_en.pass] [ticket_names_en.day]. What each ticket covers, Half-Price and buying from abroad are on [the tickets page](/primavera-sound-sao-paulo/en/tickets/).",
          },
          {
            id: "announced",
            heading: "When the line-up came out",
            body: "The organiser announced the 2026 edition on 17 October 2025, without names. The line-up followed on 11 May 2026 [announcements.0] [announcements.1]. In that announcement the organiser recalled that the Interlagos Circuit had \"already hosted the 2023 edition\" [announcements.1.what]. The day split above is the one on the organiser's São Paulo page. Ingresse's page has the same split, act for act [lineup.orderSource] [sellerPageFacts.lineupPerDay].",
          },
          {
            id: "na-cidade",
            heading: "Primavera na Cidade: the club nights",
            body: "Eight acts from the bill also play club nights on the three nights before the festival, separately from it. Primavera na Cidade has tickets of its own, sold on Ingresse with a page for each night [primaveraNaCidade.context] [primaveraNaCidade.ticketing.summary]. Ingresse lists each night's acts in the order they play:\n\n- **Wednesday 2 December, Cine Joia**, Praça Carlos Gomes, 82, Liberdade: Model/Actriz, then Smerz [primaveraNaCidade.ticketing.nights.0.date] [primaveraNaCidade.ticketing.nights.0.address] [primaveraNaCidade.ticketing.nights.0.order]\n- **Thursday 3 December, Audio**, Av. Francisco Matarazzo, 694, Água Branca: Metrika, Sophia Stel, Ecco2k, then underscores b2b UMRU [primaveraNaCidade.ticketing.nights.1.date] [primaveraNaCidade.ticketing.nights.1.address] [primaveraNaCidade.ticketing.nights.1.order]\n- **Friday 4 December, Cine Joia**: Nation of Language, then Mannequin Pussy [primaveraNaCidade.ticketing.nights.2.date] [primaveraNaCidade.ticketing.nights.2.order]\n\nDoors open at 19:00, and Ingresse warns that show times may change [primaveraNaCidade.ticketing.doors]. {{until sale}}Ingresse has had all three nights on general sale since 12:00 on 21 October 2026. On each night the club has a box office of its own as well [salesTimeline.2.from] [primaveraNaCidade.ticketing.boxOffice].{{/until}}\n\n{{until sale}}Early access for \"Passaporte\" buyers, in Ingresse's word, ran from 10:00 on 20 October to 10:00 on 21 October, and it is over. The pages do not say which festival ticket that word means [primaveraNaCidade.ticketing.earlyAccess]. [The organiser's page for the club nights](/go/primavera-sound-sao-paulo-na-cidade-en/), dated 19 October 2026, lists them without a ticket link [primaveraNaCidade.organiserPage].{{/until}}\n\n{{until sale}}Ingresse, in Portuguese: [Wednesday 2 December](/go/primavera-sound-sao-paulo-na-cidade-2-dec/) · [Thursday 3 December](/go/primavera-sound-sao-paulo-na-cidade-3-dec/) · [Friday 4 December](/go/primavera-sound-sao-paulo-na-cidade-4-dec/){{/until}}",
          },
        ],
        faqHeading: "Questions people ask",
        faq: [
          {
            q: "Who are the headliners of Primavera Sound São Paulo 2026?",
            a: "Gorillaz and The Strokes, in the organiser's announcement of 11 May 2026. The other names follow in the order of the organiser's São Paulo page, without being billed as headliners [announcements.1.what] [lineup.orderSource] [sources.s28] [sources.s39].",
          },
          {
            q: "Are the Primavera Sound São Paulo set times out?",
            a: "Not by 24 October 2026. The organiser had published only the day of each act [lineup.setTimes] [lineup.readOn] [sources.s42].",
          },
          {
            q: "Which day is Lily Allen playing?",
            a: "Saturday 5 December. The organiser lists her as Lily Allen performing \"West End Girl\" [lineup.days.0.acts] [sources.s39] [sources.s42].",
          },
          {
            q: "How many acts are there?",
            a: "Forty, 20 a day, all at the Autódromo de Interlagos, according to the organiser's programme [lineup.days.0.acts] [lineup.days.1.acts] [lineup.setTimes] [sources.s42].",
          },
          {
            q: "Can I get tickets for Primavera na Cidade?",
            a: "{{until sale}}Yes, on Ingresse. On 24 October 2026 it was selling all three nights, each on its own page, with the general sale open since 12:00 on 21 October [primaveraNaCidade.ticketing.summary] [salesTimeline.2.from] [sources.s50] [sources.s51] [sources.s52]. The organiser's own page for the club nights had no ticket link [primaveraNaCidade.organiserPage] [sources.s43].{{/until}}",
          },
        ],
        sourcesHeading: "Sources",
        sourcesNote: "Read on 24 October 2026 unless another date is given.",
        sources: "- [Primavera Sound São Paulo, the organiser's page in English](/go/primavera-sound-sao-paulo-site-en/), with the Saturday and Sunday lists [sources.s39] [sources.s1]\n- [The organiser's programme for São Paulo 2026, in English](/go/primavera-sound-sao-paulo-line-up-en/) [sources.s42] [sources.s4]\n- The organiser's announcements of the 2026 edition, 17 October 2025, and of the line-up, 11 May 2026, both read 21 October 2026 [sources.s27] [sources.s28]\n- [Primavera Na Cidade São Paulo 2026, the organiser's page in English](/go/primavera-sound-sao-paulo-na-cidade-en/) [sources.s43] [sources.s5]\n- Ingresse, Primavera na Cidade, in Portuguese: [2 December](/go/primavera-sound-sao-paulo-na-cidade-2-dec/) · [3 December](/go/primavera-sound-sao-paulo-na-cidade-3-dec/) · [4 December](/go/primavera-sound-sao-paulo-na-cidade-4-dec/) [sources.s50] [sources.s51] [sources.s52]\n- [Ingresse, the official seller, event page in Portuguese](/go/primavera-sound-sao-paulo-ingressos/) [sources.s22]",
      },
      {
        slug: "primavera-sound-sao-paulo/en/dates-and-venue",
        createdAt: "2026-10-24T13:52:00+04:00",
        updatedAt: "2026-10-24T13:52:00+04:00",
        kind: "dates",
        label: "Dates and venue",
        crumb: "Dates and venue",
        navTitle: "Gate times, the venue, the train and the airport, the age rule, past editions",
        linkTitle: "Primavera Sound São Paulo 2026: gate times, getting to Interlagos, age and past editions",
        title: "Primavera Sound São Paulo 2026: Interlagos — festival guide",
        description: "Primavera Sound São Paulo 2026 at Interlagos, 5–6 December: gate times, the train, the airport link, the under-16 rule, past editions. Festival guide.",
        h1: "Primavera Sound São Paulo 2026: dates, venue and getting there",
        lede: "Primavera Sound São Paulo 2026 is on Saturday 5 and Sunday 6 December 2026 at the Autódromo de Interlagos, Av. Senador Teotônio Vilela, 261, São Paulo, with gates opening at 12:30 on both days [editions.0.start] [editions.0.end] [venue.address] [gates.open]. The organiser counts it as the third São Paulo edition, and it is the second at the circuit. The 2024 edition was cancelled [announcements.2] [announcements.3] [editions.2.venue] [editions.1].",
        jumps: [
          { id: "hours", label: "Gates" },
          { id: "venue", label: "The venue" },
          { id: "getting-there", label: "Getting there" },
          { id: "age", label: "Age" },
          { id: "editions", label: "Past editions" },
          { id: "2027", label: "2027" },
          { id: "questions", label: "Questions" },
          { id: "sources", label: "Sources" },
        ],
        sections: [
          {
            id: "hours",
            heading: "Gates and hours",
            body: "On Saturday and on Sunday the gates open at 12:30 and the last entry is at 22:00. The promoter's terms add \"impreterivelmente\": without exception [gates.open] [gates.lastEntry] [terms.gates]. The festival ends at midnight [gates.end]. Set times had not been published on 24 October 2026, and Ingresse warns that show times may change [lineup.setTimes] [lineup.readOn] [gates.note]. Who plays which day is on [the line-up page](/primavera-sound-sao-paulo/en/lineup/). The festival is only these two days. The Primavera na Cidade club nights, from Wednesday 2 to Friday 4 December at Cine Joia and Audio, are separate events [primaveraNaCidade.context].",
          },
          {
            id: "venue",
            heading: "The Autódromo de Interlagos",
            body: "The address is Av. Senador Teotônio Vilela, 261, Interlagos, São Paulo – SP, 04801-010. The circuit's phone number, as its site prints it, is (11) 5666-8822. From abroad, put Brazil's country code in front [venue.address] [venue.phone]. Its official name is Autódromo José Carlos Pace, according to the circuit's own history page [venue.name] [venue.nameSource]. The festival was there in 2023 too, and the organiser recalled as much when it announced the 2026 line-up [editions.2.venue] [announcements.1.what]. ViaMobilidade, the train operator, is among the festival's partners on the organiser's English page [transport.3.how] [transport.3.note]. [Open in maps](/go/primavera-sound-sao-paulo-mapa/) · [The circuit's website (in Portuguese)](/go/primavera-sound-sao-paulo-autodromo/)",
          },
          {
            id: "getting-there",
            heading: "Getting there: by train, and from the airport",
            body: "**By train.** [Autódromo station](/go/primavera-sound-sao-paulo-viamobilidade/) (in Portuguese) is on Line 9-Esmeralda, run by ViaMobilidade 8 e 9 (Motiva Trilhos). The station page says it is near the circuit, and entrance A is at Rua Plínio Schmidt, 307 [transport.0.how]. The station has lifts, ramps, tactile flooring and an accessible toilet. Its bicycle park has 261 spaces, open daily from 06:00 to 22:00, and you register at the station with a photo ID [transport.0.how].\n\n**From Guarulhos airport (GRU).** According to the airport's English page, Airport-Guarulhos station is on CPTM Line 13-Jade, which runs to Engenheiro Goulart. There you change to Line 12-Safira, which goes to Tatuapé and Brás (\"connect\") and to Luz (\"airport express\") [transport_air.gru]. Line 13 runs from 04:00 to midnight Sunday to Friday, and from 04:00 to 01:00 on Saturdays. A free shuttle links the station's Airport Access, next to the Terminal 1 car park, with the terminals [transport_air.gru]. [GRU Airport, by train](/go/primavera-sound-sao-paulo-gru-train/)\n\n**Joining Line 9.** According to [its operator](/go/primavera-sound-sao-paulo-line-9/) (in Portuguese), Line 9-Esmeralda, which serves Autódromo, meets Metro Line 4-Amarela at Pinheiros, Line 5-Lilás at Santo Amaro and Line 8-Diamante at Osasco [transport_air.line9] [transport.0.how]. Neither page sets out a route from the airport to the circuit, with a time or a fare [transport_air.note].\n\n**What is not published.** On 24 October 2026 the organiser and the operator had published no station hours for the festival days, no extra trains and nothing on parking. The organiser's São Paulo menu had no transport page for this edition [transport.0.note] [transport.0.readOn] [scout.not_found.9].\n\n**VIP tickets.** VIP tickets include a transfer: \"transportation to the festival venue\" in the organiser's words, a shuttle to the VIP area inside Interlagos in Ingresse's, with the boarding point to be confirmed [ticket_names_en.vip] [transport.1.how].",
          },
          {
            id: "age",
            heading: "Age: 16, and the rules for younger children",
            body: "Ingresse's page gives the age rating as 16. Children aged 5 to 15 may enter with their parents or legal guardians, who sign the minors' consent form (the \"termo de responsabilidade\") and show an identity document. Children under 5 may not enter. Ingresse adds that the rule may change under the terms of the court order, the \"alvará\", of the Childhood and Youth Court [age.asGiven]. The same court order lets 16- and 17-year-olds in without a parent, on conditions set out below [age.alvara.covers] [age.minorsSixteenPlus].\n\n**The consent form, for ages 5 to 15.** The [consent form, a PDF in Portuguese](/go/primavera-sound-sao-paulo-termo-menor/), is the promoter's. It names the event, the legal guardian, the child and an accompanying adult [age.links.0] [age.termo.what]. The guardian's signature must be notarised, in the form's words \"com reconhecimento de firma em cartório\". The child and the accompanying adult must both carry official ID [age.termo.requires]. By signing, the guardian lets the child enter and stay with an adult companion, who takes responsibility for the child [age.termo.authorizes].\n\n**The court order, for 16 and 17.** The [court order, a PDF in Portuguese](/go/primavera-sound-sao-paulo-alvara/), is dated 18 August 2026 and valid for 180 days (read 22 October 2026). It lets 16- and 17-year-olds in without their parents or guardians, on four conditions: the age rating is observed, the licences are valid, protection measures are in place, and no alcohol goes to minors [age.links.1] [age.alvara.what] [age.alvara.covers] [age.minorsSixteenPlus] [age.alvara.readOn]. The judge declined to set age bands for children who come with their parents, so the 5-to-15 rule is the organiser's own [age.alvara.doesNotCover]. The promoter's terms add that no alcohol is served to under-18s [terms.alcohol_minors].\n\n**Travelling with a child from the UK.** GOV.UK says non-Brazilian under-18s travelling without one or both parents should follow Brazil's authorisation process for minors, and carry the original birth certificate or a notarised copy [entry_uk.minors] [sources.s46]. Read [Ingresse's page](/go/primavera-sound-sao-paulo-ingressos/) (in Portuguese) before buying [a ticket](/primavera-sound-sao-paulo/en/tickets/) for anyone under 16.",
          },
          {
            id: "editions",
            heading: "Past editions",
            body: "- **2022**: Saturday 5 and Sunday 6 November 2022 at the Distrito Anhembi, the first Brazilian edition. The organiser counted 120,000 people over the week: 110,000 on the two days at Anhembi, and 10,000 at the Primavera na Cidade nights at Cine Joia, Auditório Anhembi and Audio [editions.3.start] [editions.3.end] [editions.3.venueName] [editions.3.note].\n- **2023**: Saturday 2 and Sunday 3 December 2023 at the Autódromo de Interlagos, which the organiser called \"the new site of Primavera Sound São Paulo\" in July 2023. Its later announcement put the audience at 115,000 [editions.2.start] [editions.2.end] [editions.2.note] [editions.2.attendance] [announcements.4.attendance2023].\n- **2024**: planned for Saturday 30 November and Sunday 1 December 2024 at Interlagos, announced by the organiser on 12 December 2023, and cancelled. The organiser published [its refund policy](/go/primavera-sound-sao-paulo-reembolso-2024/) on 30 August 2024 [editions.1.note] [editions.1.announcedOn] [announcements.4].\n- **2025**: no edition. The organiser counts 2026 as the third, after 2022 and 2023 [announcements.2] [announcements.3].\n- **2026**: Saturday 5 and Sunday 6 December at Interlagos, announced on 17 October 2025, with the line-up out on 11 May 2026 [editions.0.start] [editions.0.end] [announcements.0] [announcements.1].",
          },
          {
            id: "2027",
            heading: "And 2027?",
            body: "On 24 October 2026 the organiser had announced nothing for São Paulo in 2027 [edition2027.status] [edition2027.text]. It announced the 2024 edition on 12 December 2023, and the 2026 one on 17 October 2025 [announcements.4] [announcements.0]. Patience, then.",
          },
        ],
        faqHeading: "Questions people ask",
        faq: [
          {
            q: "What city is Interlagos in?",
            a: "São Paulo. The Autódromo de Interlagos is at Av. Senador Teotônio Vilela, 261, in Interlagos, São Paulo, according to the circuit's own site [venue.address] [sources.s7].",
          },
          {
            q: "Which train station is near Primavera Sound São Paulo?",
            a: "Autódromo, on Line 9-Esmeralda, which its operator describes as near the circuit. Its entrance A is at Rua Plínio Schmidt, 307 [transport.0.how] [sources.s29].",
          },
          {
            q: "Is there parking at Interlagos for the festival?",
            a: "Neither the organiser nor the station's operator had published anything on parking by 24 October 2026 [transport.0.note] [sources.s39] [sources.s29].",
          },
          {
            q: "Can under-16s go to Primavera Sound São Paulo?",
            a: "Children aged 5 to 15 may go with their parents or legal guardians and the signed consent form, according to Ingresse's page. Under-5s may not. The court order lets 16- and 17-year-olds in on their own, on certain conditions [age.asGiven] [age.alvara.covers] [sources.s22].",
          },
          {
            q: "What time is last entry?",
            a: "22:00, and the festival ends at midnight, according to Ingresse's page [gates.lastEntry] [gates.end] [sources.s22].",
          },
          {
            q: "Can I leave and come back in?",
            a: "No, unless you hold another valid ticket for the same day, under the promoter's terms [terms.no_reentry] [sources.s35].",
          },
          {
            q: "How many people go to Primavera Sound São Paulo?",
            a: "The organiser counted 115,000 at the 2023 edition, and 120,000 over the 2022 festival week, 110,000 of them on the two festival days [announcements.4.attendance2023] [editions.2.attendance] [editions.3.note] [sources.s31] [sources.s26].",
          },
          {
            q: "Was Primavera Sound São Paulo 2024 cancelled?",
            a: "Yes. It was planned for 30 November and 1 December 2024 at Interlagos, and the organiser published its refund policy on 30 August 2024 [editions.1.note] [sources.s10].",
          },
        ],
        sourcesHeading: "Sources",
        sourcesNote: "Read on 24 October 2026 unless another date is given.",
        sources: "- [Primavera Sound São Paulo, the organiser's page in English](/go/primavera-sound-sao-paulo-site-en/) [sources.s39] [sources.s1]\n- The organiser's announcements, read 21 and 22 October 2026: the 2026 edition, 17 October 2025 [sources.s27], the line-up, 11 May 2026 [sources.s28], and the 2024 dates, 12 December 2023 [sources.s31]\n- The organiser's earlier posts, read 21 October 2026: the 2022 arrival and departure information, 1 November 2022 [sources.s23], the 2022 audience, 15 November 2022 [sources.s26], the 2023 dates, 22 March 2023 [sources.s24], the 2023 line-up, 20 July 2023 [sources.s25], and the 2024 refund policy, 30 August 2024 [sources.s10]\n- [Ingresse, the official seller, event page in Portuguese](/go/primavera-sound-sao-paulo-ingressos/), with the consent form and the court order [sources.s22]\n- [Bonus Track, terms and conditions, in Portuguese](/go/primavera-sound-sao-paulo-terms/) [sources.s35]\n- [Autódromo de Interlagos, City of São Paulo](/go/primavera-sound-sao-paulo-autodromo/), home page, and its history page, read 22 October 2026 [sources.s7] [sources.s7b]\n- [ViaMobilidade, Autódromo station](/go/primavera-sound-sao-paulo-viamobilidade/) [sources.s29] · [Line 9-Esmeralda](/go/primavera-sound-sao-paulo-line-9/) [sources.s45]\n- [GRU Airport, to and from the airport by train](/go/primavera-sound-sao-paulo-gru-train/) [sources.s44]\n- [GOV.UK, Brazil entry requirements](/go/primavera-sound-sao-paulo-gov-uk/), updated 29 September 2026 [sources.s46]",
      },
    ],
  },
];
