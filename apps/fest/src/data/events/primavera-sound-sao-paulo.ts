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
    updatedAt: "2026-10-22T20:00:00+04:00",
    name: "Primavera Sound São Paulo",
    edition: { start: "2026-12-05", end: "2026-12-06" },
    // Keys whose rows carry no readOn of their own.
    readOverrides: {
      // The scout's questions, gathered with round 1 on 21 October (section
      // 1, "questions"); the copy cites the list for "nothing announced
      // about 2027 as of 21 October 2026".
      questions: "2026-10-21",
      // The scout's note under the price rows, written with them on 21
      // October (listNotes.prices).
      "prices.note": "2026-10-21",
      // The seller's page as read on 21 October (s22, "all readOn
      // 2026-10-21" in the sheet's comment on sellerPageFacts).
      "sellerPageFacts.dates": "2026-10-21",
      "sellerPageFacts.prices": "2026-10-21",
      "sellerPageFacts.generalSale": "2026-10-21",
      "sellerPageFacts.fees.online": "2026-10-21",
      "sellerPageFacts.fees.inPerson": "2026-10-21",
      "sellerPageFacts.solidario": "2026-10-21",
      "sellerPageFacts.lineupPerDay": "2026-10-21",
      "sellerPageFacts.gates.note": "2026-10-21",
      // Re-read on 22 October: payment and meia-entrada verbatim (S9c), the
      // VIP lines (S7), which the copy prints as "lida em 22 de outubro".
      "sellerPageFacts.payment": "2026-10-22",
      "sellerPageFacts.meiaEntrada": "2026-10-22",
      "sellerPageFacts.vip": "2026-10-22",
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
    //   them (lineup.days.N.acts; gate 3, G1).
    markup: {
      startDate: "2026-12-05T12:30:00-03:00",
      endDate: "2026-12-06",
      address: { streetAddress: "Av. Senador Teotônio Vilela, 261 – Interlagos", addressLocality: "São Paulo", addressRegion: "SP", postalCode: "04801-010", addressCountry: "BR" },
      organizer: { name: "Primavera Sound", url: "https://www.primaverasound.com/pt/sao-paulo" },
      offers: [
        { seller: "Ingresse", go: "ingressos", validFrom: "2026-07-28T12:00:00-03:00", availability: "InStock" },
        { seller: "Bilheteria oficial (Working Title)", go: "ingressos", availability: "InStock" },
      ],
      subEvents: [
        { name: "Sábado, 5 de dezembro", startDate: "2026-12-05T12:30:00-03:00", acts: "lineup.days.0.acts" },
        { name: "Domingo, 6 de dezembro", startDate: "2026-12-06T12:30:00-03:00", acts: "lineup.days.1.acts" },
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
          readOn: "2026-10-21",
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
        readOn: "2026-10-21",
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
          readOn: "2026-10-21",
          note: "the only seller in all five organiser ticket records (sellerName 'Web', active, priority 1); organiser post s3 names Ingresse for presale and general sale",
        },
        {
          name: "Bilheteria oficial (Working Title)",
          address: "R. Bela Cintra, 1966 - Jardim Paulista, São Paulo - SP, 01415-002",
          hours: "Mon–Thu 13h–17h, except holidays",
          fee: "none",
          official: true,
          source: "s22",
          readOn: "2026-10-21",
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
          readOn: "2026-10-21",
        },
        {
          name: "Primavera Day",
          pt: "Sábado 5 de dezembro / Domingo 6 de dezembro",
          covers: "pista, one chosen day",
          organiserSlugs: ["saturday-dayticket-sao-paulo-2026", "sunday-dayticket-sao-paulo-2026"],
          source: "s2",
          readOn: "2026-10-21",
        },
        {
          name: "Área VIP",
          pt: "VIP Sábado 5 de dezembro / VIP Domingo 6 de dezembro",
          sellerName: "Área VIP (s22)",
          organiserSubtitleEn: "VIP PRIMAVERA DAY (en field only; pt empty)",
          covers: "open bar, open food, transfer para o local, zona de descanso; 'R$1.200,00 por pessoa + o valor do ingresso do lote vigente'; sold in the general sale only",
          organiserSlugs: ["saturday-dayticket-vip-sao-paulo-2026", "sunday-dayticket-vip-sao-paulo-2026"],
          source: "s2",
          readOn: "2026-10-21",
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
          readOn: "2026-10-21",
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
          readOn: "2026-10-21",
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
          readOn: "2026-10-21",
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
          readOn: "2026-10-21",
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
          readOn: "2026-10-21",
        },
        {
          phase: "Venda geral",
          from: "2026-07-28 12:00",
          where: "Ingresse",
          terms: "VIP available from the general sale",
          source: "s3",
          readOn: "2026-10-21",
          note: "the organiser's post says 'quinta-feira, 28 de julho' — 28 Jul 2026 is a Tuesday; the press (s13) also says Tuesday 28 Jul. Print the date, not the weekday.",
        },
        {
          phase: "Primavera na Cidade sales",
          status: "unconfirmed",
          note: "Gazeta SP (s21, 403 to me) reports early bird 20 Oct 10h and general sale 21 Oct 12h on Ingresse; the organiser's Primavera na Cidade page carries no ticket link (showTicket null, no ticket records) — confirm in the pane",
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
          readOn: "2026-10-22",
          authorizes: "O REPRESENTANTE LEGAL do MENOR autoriza para os devidos fins e efeitos legais, que o MENOR ingresse e permaneça no EVENTO acompanhado do ACOMPANHANTE RESPONSÁVEL, maior de idade, o qual se responsabilizará pela posse, guarda e cuidados do MENOR.",
          companion: "the form names a legal guardian (Pai / Mãe / Tutor / Guardião / Tios / Avós) and a separate ACOMPANHANTE (nome, RG, cel), an adult who need not be the guardian; the seller's paragraph says 'acompanhados dos pais ou responsáveis legais' — both are recorded, the sheet does not settle which governs",
        },
        naEntrada: "the seller's paragraph does not contain the words 'na entrada' or 'exigidos'; it makes the signed termo and the ID conditions of entry ('A entrada … será permitida desde que … mediante assinatura do termo …, comprovado por documento de identidade'). Ingresse's own rule 6 adds that access to the event requires the digital ticket 'juntamente com o respectivo documento de identificação oficial com foto'. So 'o termo e o documento são exigidos na entrada' is a fair paraphrase, not a quotation — print it without quotation marks or as 'são condição de entrada'",
        minorsSixteenPlus: "the link title says 'menores a partir de 16 anos', i.e. 16 and 17; the alvará text says 'adolescentes com 16 (dezesseis) anos completos ou mais'; 'maiores de 16' (17 and over) is wrong",
        source: "s22",
        readOn: "2026-10-22",
      },
      gates: {
        open: "12:30",
        lastEntry: "22:00",
        end: "00:00",
        source: "s22",
        readOn: "2026-10-21",
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
        readOn: "2026-10-21",
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
            readOn: "2026-10-22",
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
          readOn: "2026-10-22",
        },
      },
      primaveraNaCidade: {
        context: "Club nights in the festival week — 2 Dec Cine Joia, 3 Dec Audio, 4 Dec Cine Joia, eight festival acts (organiser page dated 19 Oct 2026, s5); how they are sold is not announced: no ticket link on s5 (CTA 'BUY TICKETS' with an empty URL, lineup record showTicket null), no organiser post, nothing on s22; one context line on the main page at most, not a subpage",
        ticketing: "not announced as of 22 Oct 2026",
        source: "s5",
        readOn: "2026-10-22",
      },
      transport: [
        {
          how: "Estação Autódromo, Linha 9-Esmeralda (ViaMobilidade 8 e 9, Motiva Trilhos). The operator's station page: 'A Estação Autódromo está próxima do Autódromo José Carlos Pace, também conhecido como Autódromo de Interlagos'. Access A: Rua Plínio Schmidt, 307. Accessible station (lifts, ramps, tactile floor, accessible toilet). Bicicletário with 261 places, daily 6h–22h, registration with photo ID at the station.",
          source: "s29",
          readOn: "2026-10-21",
          note: "viamobilidade.com.br now redirects to trilhos.motiva.com.br (CCR's Motiva Trilhos); the station page carries no operating hours and no event-day arrangements. Festival-day hours, express trains and parking stay 'not published as of 21 Oct 2026'. The 2023 media pattern (02:00 trains, R$ 30 express, 850 m, no parking) is out of the printable facts.",
        },
        {
          how: "VIP ticket includes a shuttle to the VIP area inside Interlagos, boarding point 'a confirmar'",
          source: "s22",
          readOn: "2026-10-21",
        },
        {
          how: "VIP ticket includes a transfer to the venue",
          source: "s2",
          readOn: "2026-10-21",
        },
        {
          how: "ViaMobilidade appears in the organiser's partner strip under APOIO (support) for São Paulo",
          source: "s1",
          readOn: "2026-10-21",
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
      },
      autodromo: {
        url: "https://autodromodeinterlagos.prefeitura.sp.gov.br/",
        source: "s7",
        kind: "venue",
        title: "Autódromo de Interlagos, Prefeitura de São Paulo",
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
      },
      viamobilidade: {
        url: "https://trilhos.motiva.com.br/viamobilidade8e9/linha-9---esmeralda/autodromo/",
        source: "s29",
        // The concession operator of a state railway line: of the hop kinds,
        // a public body is the nearest; it is not the organiser's, a seller's
        // or the venue's.
        kind: "public-body",
        title: "Estação Autódromo, Linha 9-Esmeralda, ViaMobilidade",
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
      },
      alvara: {
        url: "https://drive.google.com/file/d/1lz4iyKKU1DadO3EHTdIznhjlogJ1blFT/view",
        source: "age.links.1",
        kind: "seller-document",
        title: "Alvará judicial para menores a partir de 16 anos, publicado pela Ingresse",
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
    updatedAt: "2026-10-22T20:00:00+04:00",
    event: "primavera-sound-sao-paulo",
    // The event as the hub and the trail name it, with its year.
    name: "Primavera Sound São Paulo 2026",
    lang: "pt-BR",
    dir: "ltr",
    path: "/primavera-sound-sao-paulo/",
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
        updatedAt: "2026-10-22T20:00:00+04:00",
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
            body: "Quem vende online é a Ingresse, o único canal que o organizador lista para esta edição; a venda geral abriu em 28 de julho de 2026, às 12h. [sellers.0.name] [sellers.0.note] [salesTimeline.1.from] Quem prefere comprar sem taxa vai à bilheteria oficial, da Working Title, na Rua Bela Cintra, 1966, no Jardim Paulista, de segunda a quinta, das 13h às 17h, exceto feriados. [sellers.1.address] [sellers.1.hours] [sellers.1.fee] Online, a Ingresse cobra 20% de taxa de conveniência sobre o valor total da compra. [sellerPageFacts.fees.online]\n\nSão três tipos de ingresso: o Passe Geral, de pista, para o sábado e o domingo; o ingresso de um dia, de pista, para o sábado 5 ou o domingo 6; e a Área VIP, por dia, com open bar, open food, transfer para o local e área de descanso. [ticketTypes.0.covers] [ticketTypes.1.covers] [ticketTypes.2.covers] {{until prices}}Nos registros de ingressos do organizador, atualizados em 30 de julho de 2026 e lidos em 21 de outubro de 2026, o Passe Geral está listado a R$ 765,45 e o ingresso de um dia a R$ 425,25; a Ingresse não mostra o lote vigente nem os valores de inteira, meia-entrada e solidário antes do login. [prices.0.amount] [prices.0.recordUpdated] [prices.0.readOn] [prices.1.amount] [sellerPageFacts.prices]{{/until}} Os tipos, o VIP, o parcelamento, quem tem direito à meia-entrada e o ingresso solidário estão na [página de ingressos](/primavera-sound-sao-paulo/ingressos/).",
          },
          {
            id: "datas-e-horarios",
            heading: "Datas e horários: sábado 5 e domingo 6 de dezembro, dois dias",
            body: "O festival tem dois dias, sábado 5 e domingo 6 de dezembro, com portões às 12h30, última entrada às 22h e encerramento à meia-noite; a Ingresse avisa que os horários dos shows podem mudar. [editions.0.start] [editions.0.end] [gates.open] [gates.lastEntry] [gates.end] [gates.note] Se você leu que são três dias: os shows de 2, 3 e 4 de dezembro são o Primavera na Cidade, à parte do festival, em casas de show; ainda não foi anunciado pelo organizador como serão vendidos (lido em 22 de outubro de 2026). [primaveraNaCidade.context] [primaveraNaCidade.ticketing]\n\nA edição foi anunciada em 17 de outubro de 2025 e o line-up em 11 de maio de 2026, pelo próprio organizador. [announcements.0] [announcements.1] O histórico completo, de 2022 a 2026, está em [datas e local](/primavera-sound-sao-paulo/datas-e-local/).",
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
            a: "Shows em casas de show da cidade na semana do festival, com oito artistas do line-up: 2 de dezembro no Cine Joia, 3 no Audio e 4 no Cine Joia, à parte dos dois dias do festival. [primaveraNaCidade.context] A [página do organizador](/go/primavera-sound-sao-paulo-na-cidade/), de 19 de outubro de 2026, lista os shows e não traz informação de ingressos nem link de venda (lida em 22 de outubro de 2026). [primaveraNaCidade.ticketing] Fonte: organizador [sources.s5].",
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
        sourcesNote: "Lidas em 21 e 22 de outubro de 2026; a data de leitura de cada informação está ao lado dela no texto.",
        sources: "- Primavera Sound São Paulo, página oficial — primaverasound.com/pt/sao-paulo [sources.s1]\n- Primavera Sound, registros de ingressos e página de ingressos [sources.s2]\n- Primavera Sound, \"Informações sobre a venda de ingressos para o Primavera Sound São Paulo 2026\", 20 de julho de 2026 [sources.s3]\n- Primavera Sound, Programação Primavera Sound São Paulo 2026 [sources.s4]\n- Primavera Sound, Primavera Na Cidade São Paulo 2026, página datada de 19 de outubro de 2026 [sources.s5]\n- Primavera Sound, anúncio das edições de 2026, 17 de outubro de 2025 [sources.s27]; anúncio do line-up, 11 de maio de 2026 [sources.s28]; anúncio das datas de 2024, 12 de dezembro de 2023 [sources.s31]\n- Primavera Sound, Política de Reembolso Early Bird 2024, 30 de agosto de 2024 [sources.s10]\n- Primavera Sound, \"Informações de como chegar e ir embora do festival\", 1º de novembro de 2022 [sources.s23]; balanço de público, 15 de novembro de 2022 [sources.s26]; anúncio das datas de 2023, 22 de março de 2023 [sources.s24]; line-up de 2023, 20 de julho de 2023 [sources.s25]\n- Ingresse, Primavera Sound São Paulo – 2026, texto do evento [sources.s22]\n- Autódromo de Interlagos, Prefeitura de São Paulo — página inicial e história [sources.s7] [sources.s7b]\n- ViaMobilidade 8 e 9 (Motiva Trilhos), Estação Autódromo, Linha 9-Esmeralda [sources.s29]",
      },
      {
        slug: "primavera-sound-sao-paulo/ingressos",
        createdAt: "2026-10-22T20:00:00+04:00",
        updatedAt: "2026-10-22T20:00:00+04:00",
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
            body: "Na compra online a Ingresse cobra 20% de taxa de conveniência sobre o valor total da compra; na venda presencial não há cobrança de taxa. [sellerPageFacts.fees.online] [sellerPageFacts.fees.inPerson] A Ingresse aceita cartões de crédito e débito Mastercard, Visa, Elo, American Express, Discover, Hipercard, Diners e JCB, Pix, Click to Pay e Google Pay, e diz que não será aceito dinheiro como forma de pagamento. [sellerPageFacts.payment] O parcelamento, online e na bilheteria física, é em até 8x com juros em todos os cartões aceitos, exceto cartões BB Visa. [sellerPageFacts.payment] A pré-venda exclusiva para cartões BB Visa, com 15% de desconto sobre o primeiro lote e até 10 parcelas, foi de 23 de julho, às 12h, a 28 de julho de 2026, às 10h, e já terminou. [salesTimeline.0.from] [salesTimeline.0.to] [salesTimeline.0.terms]",
          },
          {
            id: "bilheteria",
            heading: "Bilheteria oficial",
            body: "A bilheteria oficial é da Working Title, na Rua Bela Cintra, 1966, Jardim Paulista, São Paulo, CEP 01415-002, de segunda a quinta, das 13h às 17h, exceto feriados, sem taxa. [sellers.1.address] [sellers.1.hours] [sellers.1.fee] Se você viu outro endereço, na Rua Augusta, em notícias de julho: a página da Ingresse, lida em 21 de outubro de 2026, traz a Bela Cintra. [sellers.1.note] Os canais oficiais, segundo a própria Ingresse, são primavera-sound-sp-26.ingresse.com e essa bilheteria. [sellerPageFacts.generalSale] [Ingresse, a página oficial de venda](/go/primavera-sound-sao-paulo-ingressos/) · [Nota do organizador sobre a venda](/go/primavera-sound-sao-paulo-vendas/)",
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
        sources: "Organizador, registros de ingressos, lidos em 21 de outubro de 2026 [sources.s2]; organizador, nota sobre a venda, 20 de julho de 2026 [sources.s3]; Ingresse, texto do evento, lido em 21 e 22 de outubro de 2026 [sources.s22]; Câmara dos Deputados, Lei nº 12.933/2013, publicação original [sources.s30], e Planalto, texto compilado [sources.s30b]; Planalto, Lei nº 10.741/2003 [sources.s32]; Assembleia Legislativa de São Paulo, Lei nº 10.858/2001 [sources.s33] — leis lidas em 22 de outubro de 2026.",
      },
      {
        slug: "primavera-sound-sao-paulo/line-up",
        createdAt: "2026-10-22T20:00:00+04:00",
        updatedAt: "2026-10-22T20:00:00+04:00",
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
            body: "Oito artistas do line-up também fazem shows à parte do festival na mesma semana, o Primavera na Cidade: quarta 2 de dezembro no Cine Joia, quinta 3 no Audio e sexta 4 no Cine Joia. [primaveraNaCidade.context] Ainda não foi anunciado pelo organizador como esses shows serão vendidos: a [página do organizador](/go/primavera-sound-sao-paulo-na-cidade/), datada de 19 de outubro de 2026, lista os shows e não traz informação de ingressos nem link de venda (lida em 22 de outubro de 2026). [primaveraNaCidade.ticketing] [primaveraNaCidade.readOn]",
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
        sources: "Organizador, página oficial com os blocos de sábado e domingo [sources.s1]; organizador, registro de line-up [sources.s4]; organizador, anúncio do line-up, 11 de maio de 2026 [sources.s28]; organizador, Primavera Na Cidade São Paulo 2026 [sources.s5]; Ingresse, texto do evento [sources.s22] — lidos em 21 e 22 de outubro de 2026.",
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
];
