// Igloofest: the event as the scout's sheet has it, and its guide in
// Quebec French.
//
// Generated once from the card (~/mind/ai/dubai/events/tasks/
// 2026-10-21-igloofest-fr.md) and edited by hand from here on. The sheet is
// section 1's round 1 with the scout's three repair blocks (after gate 1,
// after gate 2 rounds 1 and 2) merged by key, each repair replacing the key
// it names, in the scout's words with its own readOn. Each list item the
// copy addresses by a selector ("editions[Gatineau 2027]", "venues[v1]",
// "transport[Montréal, métro]") carries that selector as its `key`;
// copy.ts resolves the brackets.
//
// The copy is the writer's round 3 with the session's items 1 to 11 applied
// (scratch ig-ship.md), [key] tags left in, verbatim. Typography is not in
// this file: oqlf() in copy.ts sets the OQLF's spaces over every French
// string when the file is loaded (data/events/index.ts). The only additions
// to the approved strings are:
// - {{until prices}}…{{/until}} round each sentence, clause or answer that
//   prints one of the 14 « $ » figures, and round what hangs on them, which
//   the build drops on 2 December 2026, six weeks after the oldest reading
//   inside them (sellers[0], 21 October, when the spans were written);
// - the arrows' anchors (page.anchors): the phrase in the sentence that
//   becomes the link, the director's words held beside the copy; the one
//   group with no phrase (tickets: « … sont sur sa page. ») prints its two
//   targets after the sentence under their labels (gate 3, D5 (a));
// - the four week-ends of the line-up as night cards (section kind
//   "nights"), which keep the copy's line in the Markdown twin.
// The strings the copy does not give (hop titles, the pages' crumbs and
// strip titles, the chrome row in site.config.ts) are the plan's, with the
// native reader's gate-3 swaps.
//
// The layout is what tools/record-blocks.mjs reads: each record opens on a
// line that is a brace at two spaces (a guide's pages at six), its slug on
// the next line, and both dates on lines of their own.
//
// The English twin (card ~/mind/ai/dubai/events/tasks/
// 2026-10-24-igloofest-en.md) adds, from 24 October 2026:
// - The twin scout's readings, merged into the sheet by key (1b changes,
//   1c additions, the repairs after gate 2, which win where both name a
//   key), and its re-read (W10), which moves every reading it lists to
//   24 October.
// - The writer's F-list on the French guide, F1 to F16, with the fr-CA
//   reader's three amendments: the Igloopasse sold out, the general sale
//   open, the shop's night prices, the Saturday close and one bottle
//   service address.
// - Seventeen hops of the twin's own, `titles.en` on the eight French
//   hops it links, and `perGuide.en` on the three Montréal offers.
// - The Quebec City and Gatineau markups as two shared consts.
// - guides[1], the English guide: the writer's round 2 with the
//   session's swaps after gate 2, [key] tags left in, verbatim.
//
// No @dst/* import and nothing but erasable TypeScript: tools/lastmod.mjs
// loads this file through dated.ts with Node's type stripping.
import type { FestEvent, Guide, GuidePage } from "../types";
export const events: FestEvent[] = [
  {
    slug: "igloofest",
    createdAt: "2026-10-22T22:00:00+04:00",
    updatedAt: "2026-10-24T16:30:00+04:00",
    name: "Igloofest",
    // The season, Montréal's first night to Edmonton's last: the hub's order.
    edition: { start: "2027-01-14", end: "2027-03-13" },
    // Keys the copy cites whole that carry no readOn of their own.
    readOverrides: {
      // The scout's "not found" list after gate 2: items 0 to 5 are round
      // 1's repairs (21 October), 6 to 9 round 2's (22 October). The copy
      // cites items by index. Items 6 and 7 (no per-night price, no tax
      // line) are answered since 24 October by the shop's night prices and
      // its "+ taxes", and carry their own readOn (the English twin's card,
      // 1b). No copy cites the list whole any more: a bare [not_found_added]
      // would read their 24 October before the line below. Item 0 (no gate
      // wording at the quay) is the fact-checker's one-off re-read of s3, s5
      // and s15 on 22 October, 15:02 to 15:05 in Montréal, which the copy's
      // « au 22 octobre 2026 » dates (card §4, the re-read for five read
      // dates).
      "not_found_added": "2026-10-22",
      "not_found_added.0": "2026-10-22",
      "not_found_added.4": "2026-10-21",
      // Round 1's "not found" lines and its Edmonton age row (null source,
      // "not stated on the French Edmonton site"): the scout's first read,
      // dated by its oldest day, 21 October. Items 3 to 5 (the quay's
      // street number, Gatineau's prices, Edmonton) take 22 October, the day
      // of the same one-off re-read, as the copy dates them. The age row
      // takes 24 October: the English twin's scout read the Edmonton pages
      // again that day (s12, s23, s23b, s23c) and found them still silent
      // (card 2026-10-24-igloofest-en, W10).
      "not_found.2": "2026-10-21",
      "not_found.3": "2026-10-22",
      "not_found.4": "2026-10-22",
      "not_found.5": "2026-10-22",
      "not_found.6": "2026-10-21",
      "age.3": "2026-10-24",
      // Edmonton's transport row (null source: no organiser page gives
      // travel advice for Edmonton). The English twin's fact-check read s12,
      // s23 and s23c on 24 October, and the organiser's English location and
      // transportation path for Edmonton answered 404: Edmonton is still
      // silent (card 2026-10-24-igloofest-en, item 25).
      "transport.6": "2026-10-24",
      // The gate-1 repairs: "every line here rests on a page I read myself
      // on 2026-10-22" (the scout's block header). The English twin's scout
      // read the same pages again on 24 October and found every line
      // unchanged (card 2026-10-24-igloofest-en, W10).
      "stale_or_contradictory.2": "2026-10-24",
      "stale_or_contradictory.3": "2026-10-24",
      "stale_or_contradictory.5": "2026-10-24",
      "not_printable.1": "2026-10-24",
      // Read at 2026-10-22T07:12Z (its readAt).
      "prices_now": "2026-10-22",
    },
    // The MusicEvent on both guides' main pages (rules.ts) is Montréal's
    // run, named as the French Montréal page's h1 in both (SEO gate 3, D8).
    // It starts at the first set, 19 h 30 on 14 January 2027
    // (editions.0.note), its offset from the zone at build. It ends when
    // the last night closes, 0 h 30 after Saturday 6 February: the
    // organiser's English FAQ gives the Saturday close (hours_montreal, read
    // 24 October), where the French page published none (not_found.2, SEO
    // 8a on the English twin's card). The place is the quay as the
    // organiser names it, with no civic number (venues.v1), and the
    // organizer Multicolore, the producer (event.organiser).
    // The three offers are the three cards of « Passes et billets » (s2,
    // ticket_cards), each « À partir de », which Google's Event reference
    // reads as the lowest price: Offer, not AggregateOffer (X2). validFrom
    // is the general sale, 23 October 2026 at 11 h Eastern (sale_times),
    // and no source gives an end of sale, so there is no priceValidUntil
    // (X3). The Igloopasse is SoldOut, as the shop, the French page and the
    // English page all say on 24 October (s25, s2, s2en, SEO 8b). The other
    // two carry no availability, which rules.ts prints only while the
    // prices hold. The English guide sells through its own hop, the
    // organiser's shop in English, under the English pages' own names
    // (perGuide.en, SEO 8c).
    markup: {
      startDate: "2027-01-14T19:30",
      endDate: "2027-02-07T00:30",
      timeZone: "America/Toronto",
      name: "Igloofest Montréal 2027",
      venue: "venues.v1",
      address: { addressLocality: "Montréal", addressRegion: "QC", addressCountry: "CA" },
      organizer: { name: "Multicolore", url: "https://igloofest.ca/fr" },
      offers: [
        { seller: "Billetterie Igloofest", go: "billets", name: "Admission générale", validFrom: "2026-10-23T11:00:00-04:00", price: { key: "prices[AG]", currency: "CAD" }, perGuide: { en: { go: "shop", name: "General admission" } } },
        { seller: "Billetterie Igloofest", go: "billets", name: "Terrasse VIP", validFrom: "2026-10-23T11:00:00-04:00", price: { key: "prices[VIP]", currency: "CAD" }, perGuide: { en: { go: "shop", name: "VIP terrace" } } },
        { seller: "Billetterie Igloofest", go: "billets", name: "Igloopasse", validFrom: "2026-10-23T11:00:00-04:00", availability: "SoldOut", price: { key: "prices[Igloopasse]", currency: "CAD" }, perGuide: { en: { go: "shop", name: "Igloopass" } } },
      ],
    },
    sheet: {
      "event": {
        "name": "Igloofest",
        "slug": "igloofest",
        "organiser": {
          "text": "Produit par Multicolore, programmation par Courage (Montréal); Gestev et Multicolore (Québec)",
          "source": [
            "s4",
            "s7",
            "s13b"
          ],
          "readOn": "2026-10-24",
          "note": "s4 (21 Oct 2026 post): 'Produit par @multicolore.officiel / Programmation par @couragemesamis'; s7: 'Gestev et Multicolore convient l'abominable gang des neiges …' and 'Martin Tremblay, président de Gestev', 'Pascal Lefebvre, cofondateur de Multicolore'; s13b contact: info@gestev.com. No organiser page names the producer of Gatineau or Edmonton"
        },
        "kind": "music festival",
        "since": {
          "value": 2007,
          "source": [
            "s5b",
            "s7"
          ],
          "readOn": "2026-10-24",
          "note": "'Depuis 2007, Igloofest rassemble des milliers d'amateurs de musique venus danser à la belle étoile au Vieux-Port de Montréal' (s5b; the same sentence in the 'À propos d'Igloofest' boilerplate of s7)"
        },
        "tagline_claim": {
          "text": "le festival de musique le plus froid au monde",
          "source": [
            "s12",
            "s11",
            "s13c"
          ],
          "readOn": "2026-10-24",
          "note": "s12 (Edmonton home): 'Le festival de musique le plus froid au monde arrive en ville cet hiver'; s11 (Gatineau About): 'Igloofest, connu comme étant le festival de musique le plus froid au monde'; s13c (Québec experience): 'Le festival de musique le plus froid au monde qui fait danser … depuis maintenant plus de 15 ans'; s2 opens with 'Viens danser dans le festival le plus froid du monde'. Printed only as the organiser's claim"
        },
        "kind_sentence": {
          "text": "Chaque hiver, Igloofest rassemble des milliers d'amateurs de musique électronique venus danser à la belle étoile au Vieux-Port de Montréal.",
          "source": "s5",
          "readOn": "2026-10-24",
          "note": "the organiser's own sentence for 'électronique' (W9); 'festival électro' is not on any page read"
        }
      },
      "editions": [
        {
          "year": 2027,
          "city": "Montréal",
          "start": "2027-01-14",
          "end": "2027-02-06",
          "status": "announced",
          "note": "4 week-ends, jeudi–samedi, 12 soirées; week-end 1: 14–16 janv.; 2: 21–23 janv.; 3: 28–30 janv.; 4: 4–6 févr.; first set every night 19 h 30 (programme pages)",
          "venue": "v1",
          "source": "s1",
          "readOn": "2026-10-24"
        },
        {
          "key": "Gatineau 2027",
          "year": 2027,
          "city": "Gatineau",
          "start": "2027-02-11",
          "end": "2027-02-13",
          "status": "announced",
          "venue": "v3",
          "source": "s9",
          "readOn": "2026-10-24",
          "note": "dates and 'Annonce de programmation à venir' from the home page (s9); 'Le 11, 12 et 13 février 2027, de 19h00 à 23h00' is the Gatineau FAQ's (s14b), read 22 Oct; presale sign-up open, no sale yet"
        },
        {
          "key": "Québec 2027",
          "year": 2027,
          "city": "Québec",
          "start": "2027-03-04",
          "end": "2027-03-06",
          "status": "announced",
          "venue": "v2",
          "source": "s6",
          "readOn": "2026-10-24",
          "note": "dates and place from the home page (s6); '5e édition', 'à compter de 19h00' and 'Les billets seront bientôt disponibles' are the Québec FAQ's (s13b), read 22 Oct; the same FAQ says 'on annonce bientôt les dates' beside the dates — not a fact, not printed"
        },
        {
          "year": 2027,
          "city": "Edmonton",
          "start": "2027-03-11",
          "end": "2027-03-13",
          "status": "announced",
          "note": "2027 dates on the Edmonton home and programme pages (s12); the organiser does not number the edition; the programme's three nights each carry the page-data displayTitle « MYSTERY GUEST » (upper case, as the organiser prints it; the sheet's 'Mystery guest' is withdrawn); the « Après Ski · 12 au 14 mars » tab is a 2026 leftover (page data eventDate 2026-03-12/13/14T04:00:00+00:00)",
          "venue": "v4",
          "source": "s12",
          "readOn": "2026-10-24",
          "key": "Edmonton 2027"
        },
        {
          "year": 2026,
          "city": "Montréal",
          "start": "2026-01-15",
          "end": "2026-02-07",
          "status": "held",
          "note": "18e édition; 4 week-ends; Igloopasse 2026 sold out (organiser's FAQ, stale text still on the tickets page)",
          "source": "s5",
          "readOn": "2026-10-24"
        },
        {
          "key": "Gatineau 2026",
          "year": 2026,
          "city": "Gatineau",
          "start": "2026-02-12",
          "end": "2026-02-14",
          "status": "held",
          "source": "s10b",
          "readOn": "2026-10-24",
          "note": "recap of 16 Feb 2026: 'Près de 17 000 festivaliers', BUNT. le 12 février, Kaskade le 13 février, Steve Aoki le 14 février; the 12 Nov 2025 announcement (s10c) names 'En tête d'affiche … Steve Aoki, Kaskade et BUNT.' plus Swimming Paul and DJ Mandy, presale 13 Nov, general sale 14 Nov; W12 i"
        },
        {
          "year": 2026,
          "city": "Québec",
          "start": "2026-03-05",
          "end": "2026-03-07",
          "status": "held",
          "note": "4e édition; 18 000+ Igloosapiens over three nights; headliners Disclosure (DJ set), Zeds Dead, Chris Lake; first 16+ edition; programme and sale announced 12 Nov 2025, presale 13 Nov 11 h, general sale 14 Nov 11 h, day tickets from 39 $ + taxes",
          "source": "s7",
          "readOn": "2026-10-24"
        },
        {
          "key": "Edmonton 2026",
          "year": 2026,
          "city": "Edmonton",
          "start": "2026-03-12",
          "end": "2026-03-14",
          "status": "announced-unconfirmed",
          "source": "s5b",
          "corroboration": "s7",
          "readOn": "2026-10-24",
          "dates_from": "s5b alone (Montréal À propos, 2026 text): « De Montréal à Edmonton, Igloofest sillonnera le pays : Montréal du 15 janvier au 7 février, Gatineau du 12 au 14 février, Québec du 6 au 8 mars et enfin Edmonton du 12 au 14 mars, pour clore l'hiver sur une note grandiose. » — no year printed; the sentence sits beside « Cette année et pour une 18e édition », i.e. the 2026 season. The Edmonton programme page's « Après Ski » page data (eventDate 2026-03-12/13/14) is the only other trace of those dates",
          "s7_gives": "no Edmonton dates. Only « avec maintenant quatre villes au programme, dont Edmonton qui se joint à la famille cette année » (Pascal Lefebvre's quote) and, in the boilerplate, « s'étend aujourd'hui dans les marchés de Québec, Gatineau et, nouvellement, Edmonton »",
          "stale_in_the_same_sentence": "s5b's « Québec du 6 au 8 mars » is the 2025 Québec edition's dates (s8: 6–8 mars 2025); the 2026 Québec edition ran 5–7 mars 2026 (s7: « Du 5 au 7 mars 2026 »). So the About sentence mixes seasons and is cited for Edmonton's dates only, with that caveat; its Québec dates are never printed",
          "note": "the ruling stands: « annoncée pour les 12, 13 et 14 mars 2026 » by the Montréal About page, with the Québec release of 12 Nov 2025 saying Edmonton joined « cette année »; never 'held', never 'deuxième édition' in the page's voice (W14)"
        },
        {
          "year": 2025,
          "city": "Québec",
          "start": "2025-03-06",
          "end": "2025-03-08",
          "status": "held",
          "note": "3e édition; Tiësto, Miss Monique, deadmau5; announced 20 Nov 2024 (s8), presale 21 Nov 10 h, sale 22 Nov 10 h, '(à partir de 39 $, taxes en sus)' as s8 words it. The 'plus de 9 000 Igloosapiens … en une seule soirée, avec Tiësto en tête d'affiche' is s7's sentence (12 Nov 2025), not s8's; W6",
          "source": "s8",
          "readOn": "2026-10-24",
          "key": "Québec 2025"
        },
        {
          "year": 2025,
          "city": "Gatineau",
          "status": "held",
          "note": "first Gatineau edition at Place des Festivals Zibi, as the About page (s11) and the 23 Oct 2025 news item (s10) say; 'dans le cadre du Bal de Neige' is the About page's undated sentence",
          "source": "s11",
          "readOn": "2026-10-24",
          "key": "Gatineau 2025"
        }
      ],
      "venues": [
        {
          "key": "v1",
          "name": "Quai Jacques-Cartier, Vieux-Port de Montréal",
          "address": "Quai Jacques-Cartier, Vieux-Port de Montréal",
          "lat": 45.5073,
          "lon": -73.5488,
          "coords_source": "s17",
          "city": "Montréal",
          "region": "QC",
          "country": "CA",
          "timezone": "America/Toronto",
          "source": "s3",
          "readOn": "2026-10-24",
          "note": "the organiser names the quay and no street number; no gate wording and no count of entrances on any page read (not_found). s3's 'Les rues de la Commune, Berri ou le boulevard Saint-Laurent vous donnent accès aux entrées du Vieux-Port et à ses stationnements' is about the Old Port's road entrances and car parks ('Des stationnements sont disponibles au Quai de l'horloge et au Quai King-Edward'): printed under 'Voiture' only, never as the festival's gates; W10. s15 (Accessibilité) names an 'entrée VIP sur la plate-forme ouest' and 'l'allée centrale, qui sert de sortie aux festivaliers à la fin de l'événement' — the only gate words the organiser prints",
          "site_map": {
            "fr": "Plan de site (Bientôt dévoilé)",
            "en": null,
            "note": "on the French transport page under « Lieu »; the English transport page (s3en) has no site-map line at all",
            "source": "s3",
            "readOn": "2026-10-24"
          },
          "en": {
            "name": "Jacques-Cartier Pier in the Old Port of Montreal",
            "source": "s3en",
            "readOn": "2026-10-24"
          }
        },
        {
          "key": "v2",
          "name": "Place Jean-Béliveau (ExpoCité)",
          "address": "250, boulevard Wilfrid-Hamel, Québec (Québec) G1L 5A7",
          "lat": 46.828,
          "lon": -71.2468,
          "city": "Québec",
          "region": "QC",
          "country": "CA",
          "timezone": "America/Toronto",
          "source": "s13",
          "readOn": "2026-10-24",
          "coords_source": "s17",
          "note": "« place publique de la ville de Québec. Située au cœur d'ExpoCité et au nord du boulevard Wilfrid-Hamel, elle est bordée par le Centre Vidéotron, le Pavillon de la Jeunesse et le Grand Marché de Québec » is the Québec FAQ's (s13b, « Où se déroule Igloofest Québec? »); s13 (Lieu et transport) gives the address only: « 250 Boulevard Wilfrid-Hamel, Québec, QC G1L 5A7 ». Both read 22 Oct"
        },
        {
          "key": "v3",
          "name": "Place des Festivals Zibi",
          "address": "60, rue Jos-Montferrand, Gatineau (Québec) J8X",
          "lat": 45.4245,
          "lon": -75.7166,
          "city": "Gatineau",
          "region": "QC",
          "country": "CA",
          "timezone": "America/Toronto",
          "source": "s14",
          "readOn": "2026-10-24",
          "coords_source": "s17",
          "note": "Place des Festivals Zibi, 60, rue Jos-Montferrand, Gatineau (s14). s11 (About): 'Depuis 2025, la fête s'invite à Gatineau, à la Place des Festivals Zibi, dans le cadre du Bal de Neige' and 'on va faire vibrer la place, tout en ayant une vue sur le Parlement du Canada' — the view of Parliament is restored, as the About page's sentence. 'Vieux-Hull' is where s14 puts the car parks ('plusieurs stationnements disponibles à quelques pas du site dans le Vieux-Hull'), not the site itself: the page says 'à quelques pas du Vieux-Hull' or names the street, never 'dans le Vieux-Hull' for the venue. Festival map 'au courant du mois de janvier 2027' (s14)"
        },
        {
          "key": "v4",
          "name": "Fan Park, ICE District",
          "address": "10128 - 104 Avenue NW, Edmonton, AB T5J 4Y8",
          "address_source": "s22",
          "address_readOn": "2026-10-22",
          "lat": 53.5468,
          "lon": -113.4965,
          "coords_source": "s17",
          "city": "Edmonton",
          "region": "AB",
          "country": "CA",
          "timezone": "America/Edmonton",
          "name_source": "s12",
          "readOn": "2026-10-24",
          "note": "the organiser's French and English Edmonton pages print only 'Fan Park / ICE District' (spelled 'ICE Disctrict'); the street is Ticketmaster's and carries s22"
        }
      ],
      "sellers": [
        {
          "name": "Billetterie Igloofest (billets.igloofest.ca)",
          "cities": [
            "Montréal"
          ],
          "official": true,
          "source": [
            "s2",
            "s2en",
            "s1",
            "s1en"
          ],
          "readOn": "2026-10-24",
          "url_linked_today": null,
          "url_linked_today_note": "withdrawn: the 9cd9e322 Igloopasse-card address is no longer on s2 (24 Oct)",
          "url_round1": "https://billets.igloofest.ca/mul/go/f9ac2238-e384-4829-b261-b87a74f67cd3?fac=IGLOOFEST&locale=fr-CA&skin=igloofestmtl",
          "url_round1_note": "was the header 'Achète tes billets' link on igloofest.ca/fr/festival at the first read (21 Oct ~17:00 UTC); on re-read at 21:30 UTC every 'Achète tes billets' and every per-night 'Achète ton billet' goes to https://contact.igloofest.ca/prevente2027 (a presale sign-up form, 'PRÉVENTE BILLETS & IGLOOPASSE', not a seller: no /go/ target); the first read of the week-end pages also carried per-night shop links of the form billets.igloofest.ca/mul/go/6070144b-…/shop/search?ec=IGLOOMTL20270114 and a 'waiting-room/not-on-sale' address — gone at the re-read",
          "go_target": "unchanged /go/igloofest-billets/ → s2 is still sound for FR; the EN guide may hop to the EN tickets page (s2en) or the live English shop list (s25), session's call; the FR card buttons still point to the waiting room",
          "note": "'Les SEULS billets acceptés doivent être achetés sur la billetterie d'Igloofest' (s2) is Montréal's sentence; Gatineau has its own (below)",
          "urls_linked_today": {
            "fr_cards": "all three « Acheter » → …/6070144b-…/waiting-room/not-on-sale?…locale=fr-CA (s2, page data ticketsUrl and anchors)",
            "en_cards": "General Admission and VIP Terrace 'Buy' → the shop list …/6070144b-f1a0-457e-a50c-af5a0d1ce2a4?fac=IGLOOFEST&locale=en-CA&skin=igloofestmtl; Igloopass 'Buy' → …/waiting-room/not-on-sale?…locale=en-CA (s2en)",
            "header": "'Achète tes billets' / 'Buy your tickets' → the shop list (s2, s2en, s1, s1en)",
            "faq": "« notre billetterie » / 'ticketing platform' → …/shop/custom-pack (s2, s2en)",
            "nights": "per-night 'Achète ton billet' / buy links on the week-end pages → …/shop/select?…&ec=IGLOOMTL20270114 and …?…&ec=IGLOOMTL20270116 (s1, s1en, week-end 1)",
            "lands": "the shop list redirects to …/shop/custom-pack (24 Oct, pane)",
            "go_target": "unchanged: /go/igloofest-billets/ → s2; /go/igloofest-shop/ → s25 (session's call, 1b)"
          },
          "terms": {
            "source": "s2",
            "readOn": "2026-10-24",
            "payment": "Notre billetterie en ligne accepte les cartes Visa et Mastercard. Malheureusement, les cartes de crédit prépayée et les cartes Visa Débit ne fonctionnent pas sur notre plateforme. Nous travaillons actuellement à ajouter ces modes de paiement.",
            "door": "Non! Les billets sont en vente uniquement en ligne.",
            "refunds": "Les ventes de billets sont finales. Cependant, les événements restent sujets à un report ou une annulation (avec remboursement).",
            "only_accepted": "Les SEULS billets acceptés doivent être achetés sur la billetterie d'Igloofest.",
            "eticket": "L'Igloopasse et les billets individuels peuvent être achetés à l'avance. La confirmation est envoyée par courriel, il suffit de la télécharger à l'avance et de l'afficher sur ton téléphone intelligent pour la faire scanner à ton entrée sur le site.",
            "account": "Pour accéder à tes billets rends-toi sur ton compte Igloofest. (https://compte.igloofest.ca/)",
            "purchase_trouble": "Dans la plupart des cas, une transaction non complétée est due à une erreur dans l'adresse de facturation saisie.",
            "pending_charge": "la transaction qui apparaît est seulement temporaire (habituellement identifiée en attente d'autorisation). Elle disparaîtra d'elle-même après 5 ou 6 jours ouvrables.",
            "ticket_missing": "Va jeter un oeil dans ta boîte de courrier indésirable (SPAM). … tu as jusqu'à la veille de l'événement pour écrire à info@igloofest.ca … Sinon, présente toi au service à la clientèle de la billetterie à ton arrivée sur le site avec la carte de crédit ayant servie à l'achat ainsi qu'une pièce d'identité avec photo.",
            "contact": "info@igloofest.ca",
            "english_same": "s2en carries the same four terms (Visa/Mastercard with prepaid and Visa Debit excluded; online only; sales final with reimbursement on postponement or cancellation; 'individual and nominal' pass)",
            "shop": {
              "text": "Advertised prices include service fees. Taxes are extra. Max 6 tickets per transaction. Price subject to change without notice. No exchange / no refund.",
              "source": "s25",
              "readOn": "2026-10-24"
            }
          }
        },
        {
          "name": "quebec.igloofest.ca (Igloofest Québec, sale via the organiser's site)",
          "url": "https://quebec.igloofest.ca/fr",
          "cities": [
            "Québec"
          ],
          "official": true,
          "source": "s6",
          "readOn": "2026-10-24",
          "note": "'Les billets seront bientôt disponibles' is the Québec FAQ's line (s13b, read 22 Oct); the last two releases (s7, s8) sent buyers to quebec.igloofest.ca/fr"
        },
        {
          "name": "Ticketmaster Canada (Fan Park at ICE District, venue page)",
          "url": "https://www.ticketmaster.ca/fan-park-at-ice-district-tickets-edmonton/venue/140831",
          "cities": [
            "Edmonton"
          ],
          "official": true,
          "named_by": "s12",
          "source": "s22",
          "readOn": "2026-10-24",
          "note": "the organiser's Edmonton site sends buyers to Ticketmaster's page for the venue; read 22 Oct 2026 (200): it lists four events, all 'Oktoberfest @ ICE District' (17, 18, 25 Sep and 2 Oct 2027), and no Igloofest date. The page says so, never that Edmonton tickets are on sale. The French hero button 'Inscris-toi à la prévente!' carries a malformed address (a Laylo address pasted into the Ticketmaster slug) and the other sign-up is laylo.com: neither is an organiser, seller, venue or public body, so neither is a /go/ target; the reader is sent to the organiser's Edmonton site",
          "now": {
            "text": "FR Edmonton site → Ticketmaster venue page (no Igloofest; 4 Oktoberfest 2027 dates); EN Edmonton site 'BUY TICKETS' → Ticketmaster artist page 4082829, 0 events",
            "source": [
              "s22",
              "s22b",
              "s12",
              "s23"
            ],
            "readOn": "2026-10-24"
          },
          "en": {
            "text": "EN Edmonton site 'BUY TICKETS' → Ticketmaster artist page 4082829, 0 events",
            "source": [
              "s22b",
              "s23c"
            ],
            "readOn": "2026-10-24"
          }
        }
      ],
      "sales": [
        {
          "city": "Montréal",
          "what": "Prévente infolettre & SMS",
          "on": "2026-10-22T11:00",
          "tz": "America/Toronto",
          "source": "s4",
          "readOn": "2026-10-24"
        },
        {
          "city": "Montréal",
          "what": "Vente générale (billets individuels par soirée)",
          "on": "2026-10-23T11:00",
          "tz": "America/Toronto",
          "source": "s4",
          "readOn": "2026-10-24"
        },
        {
          "key": "Montréal Igloopasse",
          "city": "Montréal",
          "what": "Igloopasse (12 soirées, admission générale)",
          "status": "sold out (2027)",
          "status_22_oct": "on sale: presale 2026-10-22T11:00, general sale 2026-10-23T11:00 (America/Toronto); not sold out",
          "displayed": "À partir de 234,00 $",
          "from": 234,
          "currency": "CAD",
          "soldOut": true,
          "evidence": [
            {
              "where": "shop list, s25",
              "text": "Igloofest Montreal - Season Passes 2027 — Sold Out"
            },
            {
              "where": "s2 FAQ « Comment me procurer une Igloopasse? »",
              "text": "Les Igloopasses pour la saison 2027 sont épuisées."
            },
            {
              "where": "s2en FAQ",
              "text": "Igloopasses for 2027 are now sold out."
            }
          ],
          "card_still": "the Igloopasse card on s2/s2en still prints « À partir de 234,00 $ » / « From $234.00 », soldOut:false, button to waiting-room/not-on-sale: the page contradicts itself; print the sold-out state with the shop and the FAQ, the card price at most as history",
          "when_sold_out": "not stated",
          "source": [
            "s25",
            "s2",
            "s2en"
          ],
          "readOn": "2026-10-24",
          "note": "read 22 Oct 03:12 Montréal: card « Igloopasse — Accès aux 12 soirées d'Igloofest Montréal (Admission générale) — À partir de 234,00 $ — Acheter », soldOut:false in the page data, the button to the shop's waiting room (s24). The 21 Oct state (« Complet », soldOut:true, read 15:00–17:28 Montréal) is history: printable at most as 'la page affichait « Complet » le 21 octobre', never in the present tense, and the question « pourquoi est-elle complète ? » is withdrawn from `questions`. The FAQ's 2026-season lines stand as last season's and are not 2027 facts: « Les Igloopasses pour la saison 2026 sont épuisés. Note, qu'ils exclusivement disponibles à nos abonnés à l'infolettre », « Ta passe Igloofest te donne accès au 12 soirées de la saison Igloofest Montréal 2026 en admission générale! », « Pour 2026, l'Igloopasse est disponible au format numérique uniquement ». Nominative, current: « Non. L'Igloopasse est individuelle et nominale. Elle doit être accompagnée d'une pièce d'identité avec photo à l'entrée. » (s2 FAQ, « Est-ce que je peux prêter ma Igloopasse à un.e ami.e? »). The day the pass opened and whether it was ever sold out for 2027: still not stated by the organiser (not_found)",
          "faq_now": {
            "lines": [
              "Les Igloopasses pour la saison 2027 sont épuisées. Note, qu'ils exclusivement disponibles à nos abonnés à l'infolettre, alors inscris-toi pour la prochaine fois ;)",
              "Pour 2027, l'Igloopasse est disponible au format numérique uniquement est sera envoyée automatiquement par email lors de l'achat.",
              "unchanged and stale: « Ta passe Igloofest te donne accès au 12 soirées de la saison Igloofest Montréal 2026 en admission générale! »"
            ],
            "source": "s2",
            "readOn": "2026-10-24"
          }
        },
        {
          "city": "Gatineau",
          "what": "presale sign-up (Mailchimp), no sale yet",
          "source": "s9",
          "readOn": "2026-10-24"
        },
        {
          "city": "Québec",
          "what": "no sale yet; pattern of the last two years: release + presale + general sale within three days in mid/late November",
          "source": [
            "s7",
            "s8"
          ],
          "readOn": "2026-10-22"
        }
      ],
      "prices": [
        {
          "key": "Igloopasse",
          "label": "Igloopasse Montréal 2027, 12 soirées, admission générale",
          "amount": 234,
          "currency": "CAD",
          "prefix": "À partir de",
          "displayed": "À partir de 234,00 $",
          "soldOut": true,
          "soldOut_source": [
            "s25",
            "s2",
            "s2en"
          ],
          "seller": "Billetterie Igloofest (billets.igloofest.ca), as the « Acheter » button of igloofest.ca/fr/passes-et-billets links it",
          "source": "s2",
          "readOn": "2026-10-24",
          "expires": "2026-12-03",
          "note": "taxes not stated on either language's Igloopasse card (the English GA and VIP cards say '+tx'; the Igloopass does not)"
        },
        {
          "label": "Igloofest Québec 2026, billet journalier (last edition, for scale)",
          "amount": 39,
          "currency": "CAD",
          "suffix": "+ taxes",
          "seller": "quebec.igloofest.ca",
          "source": "s7",
          "readOn": "2026-10-24",
          "note": "2026 price; 2027 not announced",
          "en": {
            "text": "Day passes will be available starting at $39 + tax.",
            "source": "s7en",
            "readOn": "2026-10-24"
          }
        },
        {
          "label": "Stationnement du Centre Vidéotron, Québec",
          "amount": 15,
          "currency": "CAD",
          "per": "véhicule",
          "source": "s13b",
          "readOn": "2026-10-24"
        },
        {
          "label": "Navette La Québécoise Montréal/St-Hyacinthe/Drummondville → Igloofest Québec, aller-retour, transport + billet",
          "amount": 75,
          "currency": "CAD",
          "suffix": "+ taxes",
          "source": "s13",
          "readOn": "2026-10-24",
          "note": "the page still says 'la soirée du 7 mars' (2026); treat as last year's offer until updated"
        },
        {
          "key": "AG",
          "label": "Billet Admission Générale, Montréal 2027, une soirée",
          "amount": 49,
          "currency": "CAD",
          "prefix": "À partir de",
          "displayed": "À partir de 49,00 $",
          "soldOut": false,
          "seller": "Billetterie Igloofest (billets.igloofest.ca), as the « Acheter » button of s2 links it",
          "source": "s2",
          "readOn": "2026-10-22",
          "expires": "2026-12-03",
          "note": "'À partir de' is the organiser's starting tier under its « paliers progressifs » sentence (`pricing_model` stands); taxes: the French card is silent, the English card prints '+tx' (s2en)"
        },
        {
          "key": "VIP",
          "label": "Billet Terrasse VIP, Montréal 2027, une soirée",
          "amount": 99,
          "currency": "CAD",
          "prefix": "À partir de",
          "displayed": "À partir de 99,00 $",
          "soldOut": false,
          "seller": "Billetterie Igloofest (billets.igloofest.ca), as the « Acheter » button of s2 links it",
          "source": "s2",
          "readOn": "2026-10-22",
          "expires": "2026-12-03",
          "note": "same tier and tax caveats as prices[AG]"
        }
      ],
      "age": [
        {
          "city": "Montréal",
          "min": 18,
          "source": "s5",
          "readOn": "2026-10-24",
          "quote": "Pour tous les guerriers désirant défier l'hiver et aller jouer dehors, amateurs de musique électronique (ou pas) mais qui ont 18 ans et +. C'est d'même!",
          "note": "photo ID is s5's bring list (« Pièce d'identité avec photo »); « L'Igloopasse est individuelle et nominale. Elle doit être accompagnée d'une pièce d'identité avec photo à l'entrée. » is s2's FAQ, not s5's — the round-1 'Igloopasse is nominal' carries s2",
          "shop": {
            "text": "Event for 18 years old and up",
            "source": "s25",
            "readOn": "2026-10-24"
          }
        },
        {
          "key": "Québec",
          "city": "Québec",
          "min": 16,
          "source": "s13b",
          "readOn": "2026-10-24",
          "note": "'16 ans et +' on the Québec FAQ; the 12 Nov 2025 release (s7) says the 16+ formula began with the 2026 edition"
        },
        {
          "key": "Gatineau",
          "city": "Gatineau",
          "min": "none",
          "source": "s14b",
          "readOn": "2026-10-24",
          "quote": "L'événement est habituellement 18+, cependant à Gatineau c'est différent! Les enfants âgés de 12 ans et moins sont admis gratuitement lorsqu'ils sont accompagnés d'un parent qui détient un billet valide du festival. À partir de 13 ans, ils doivent : se procurer un billet pour entrer; doivent présenter une pièce d'identité; être accompagnés d'un parent (un enfant par adulte).",
          "note": "the organiser's word is 'enfants' with no upper age; 'pièce d'identité' without 'avec photo' (photo ID is the bring-list's item, below); W3"
        },
        {
          "city": "Edmonton",
          "source": null,
          "note": "not stated on the French Edmonton site (not_found)"
        }
      ],
      "lineup": {
        "announcedOn": "2026-10-21",
        "firstActsOn": "2026-09-21",
        "city": "Montréal",
        "source": "s1",
        "readOn": "2026-10-24",
        "note": "full programme with stage and set times on igloofest.ca/fr/festival (week-end pages 1–4); first acts (23 Jan night) announced 21 Sep 2026; 'Mystery guests' on 21 Jan and 29 Jan; Gatineau, Québec: not announced; Edmonton: 'Mystery guest' every night",
        "nights": [
          {
            "date": "2027-01-14",
            "sapporo": [
              "KAYTRANADA 22:00",
              "Lou Phelps (DJ set) 20:30",
              "Taima 19:30"
            ],
            "videotron": [
              "Make A Dance 20:45",
              "silktits 19:30"
            ],
            "videotron_label": "Ferias"
          },
          {
            "date": "2027-01-15",
            "sapporo": [
              "James Hype 23:00",
              "Tini Gessler 21:30",
              "The Holy 19:30"
            ],
            "videotron": [
              "Prïa B2B Zac Martel B2B NAB 19:30"
            ],
            "videotron_label": "AMPER"
          },
          {
            "date": "2027-01-16",
            "sapporo": [
              "Chris Lorenzo 22:30",
              "SAPIAN 21:00",
              "Anna Wilder 19:30"
            ],
            "videotron": [
              "SALOME 21:30",
              "Xia 20:30",
              "No Police 19:30"
            ]
          },
          {
            "date": "2027-01-21",
            "sapporo": [
              "Fatboy Slim 21:30",
              "Mystery guests 20:30",
              "Lia Plutonic 19:30"
            ]
          },
          {
            "date": "2027-01-22",
            "sapporo": [
              "KETTAMA 23:00",
              "Robbie Doherty 21:30",
              "Elvis Guetta 20:30",
              "syd woz 19:30"
            ],
            "videotron": [
              "Chippy Nonstop b2b Nino Brown b2b Young Teesh 19:30"
            ],
            "videotron_label": "Pep Rally"
          },
          {
            "date": "2027-01-23",
            "sapporo": [
              "Ninajirachi 23:00",
              "Frost Children (DJ set) 22:00",
              "MGNA Crrrta (DJ set) 21:00",
              "Isla Den (DJ set) 19:30"
            ],
            "videotron": [
              "Mowie B2B the bald girl 22:00",
              "swedm® (Varg²™ + jamesjamesjames) 20:30",
              "Beamskii 19:30"
            ]
          },
          {
            "date": "2027-01-28",
            "sapporo": [
              "Mosimann 21:30",
              "TONY ROMERA 20:30",
              "V!A 19:30"
            ]
          },
          {
            "date": "2027-01-29",
            "sapporo": [
              "Mystery guests 19:30"
            ],
            "videotron": [
              "Chris Luno 21:30",
              "Moti (CR) 20:30",
              "DUZA 19:30"
            ]
          },
          {
            "date": "2027-01-30",
            "sapporo": [
              "deadmau5 22:30",
              "TDJ 21:00",
              "Claireyy 19:30"
            ],
            "videotron": [
              "Rodriguez Jr. (DJ set) 21:00",
              "Hicky & Kalo 19:30"
            ],
            "videotron_label": "Sun & Earth"
          },
          {
            "date": "2027-02-04",
            "sapporo": [
              "Fcukers (DJs) 21:30",
              "Marie Davidson (DJ set) 20:00",
              "Field Note 19:30"
            ]
          },
          {
            "date": "2027-02-05",
            "sapporo": [
              "Boris Brejcha 23:00",
              "DREYA V 21:30",
              "Kolophane 19:30"
            ],
            "videotron": [
              "tINI 21:00",
              "Dimitry b2b Lara Bee 19:30"
            ],
            "videotron_label": "KNTC"
          },
          {
            "date": "2027-02-06",
            "sapporo": [
              "Subtronics 23:15",
              "Taiki Nulight 21:30",
              "NAË 19:30"
            ],
            "videotron": [
              "Miss Bashful 22:15",
              "Siren Mars 20:45",
              "HŸDRA 19:30"
            ],
            "videotron_label": "Hauterageous"
          }
        ],
        "casing": {
          "note": "as the week-end pages print them: 'Lou Phelps (DJ set)' (14 Jan); 'Frost Children (DJ SET)', 'MGNA Crrrta (DJ SET)', 'Isla Den (DJ SET)' (23 Jan); 'Rodriguez Jr. (DJ Set)' (30 Jan); 'Marie Davidson (DJ Set)' (4 Feb); 'Fcukers (DJs)'; the 21 Sep post (s4b) writes '(DJ set)' for the 23 Jan acts. The sheet's uniform '(DJ set)' is withdrawn; the executor copies the week-end pages' casing; W12 h",
          "source": "s1",
          "readOn": "2026-10-24"
        }
      },
      "tickets_detail": [
        {
          "city": "Montréal",
          "item": "Admission générale",
          "includes": "la soirée choisie, Scène Sapporo et Scène Vidéotron, Igloovillage, sélection de bars",
          "source": "s2",
          "readOn": "2026-10-24"
        },
        {
          "city": "Montréal",
          "item": "VIP (FAQ « À quoi me donne accès mon billet VIP? »)",
          "includes": [
            "Entrée rapide sur le site",
            "Service de bouteilles",
            "Terrasse exclusive avec toilettes chauffées",
            "Vue imprenable sur la scène",
            "Espace intérieur chauffé"
          ],
          "bottle_contact": "groupe@multicolore.ca",
          "bottle_contact_22_oct": "groupe@igloofest.ca",
          "source": "s2",
          "readOn": "2026-10-24"
        },
        {
          "city": "Montréal",
          "item": "Accessibilité",
          "includes": "reduced-mobility guests swap a GA ticket for VIP at customer service at the entrance; companion enters free",
          "source": "s15",
          "readOn": "2026-10-24"
        },
        {
          "city": "Gatineau",
          "item": "Igloopasse",
          "includes": "3 soirs, admission générale, nominal",
          "source": "s14b",
          "readOn": "2026-10-24"
        },
        {
          "city": "Québec",
          "item": "VIP",
          "includes": "entrée rapide, terrasse exclusive, toilettes chauffées, espace chauffé, vue sur la scène principale",
          "source": "s13b",
          "readOn": "2026-10-24"
        },
        {
          "city": "Québec",
          "item": "Réadmission",
          "value": "aucune",
          "source": "s13b",
          "readOn": "2026-10-24"
        },
        {
          "key": "1b",
          "city": "Montréal",
          "item": "VIP (card « Billets VIP » / « Terrasse VIP »)",
          "includes": [
            "Bénéfices du billet ADMISSION GENERALE",
            "Entrée rapide sur le site",
            "Terrasse chauffée avec vue imprenable sur la scène principale",
            "Toilettes exclusives chauffées",
            "Bars exclusifs",
            "Service optionnel de bouteilles, pour plus de détails contactez groupe@multicolore.ca"
          ],
          "source": "s2",
          "readOn": "2026-10-24",
          "note": "the card says « Terrasse chauffée », « Toilettes exclusives chauffées », « Bars exclusifs » and « optionnel »; the FAQ says « Terrasse exclusive avec toilettes chauffées », « Espace intérieur chauffé » (not on the card) and « Service de bouteilles ». Printed as two lists from one page, or the card's list with the FAQ's « espace intérieur chauffé » credited to the FAQ"
        },
        {
          "key": "0b",
          "city": "Montréal",
          "item": "Admission générale (card « Billets AG »)",
          "includes": [
            "Accès au dancefloor le plus froid du monde",
            "Accès à l'Igloovillage et ses activités",
            "Accès à une sélection de bars et camions de rue"
          ],
          "source": "s2",
          "readOn": "2026-10-24",
          "note": "« camions de rue » is the card's; the FAQ's GA list (tickets_detail.0: « Scène Sapporo et Scène Vidéotron », « Igloovillage », « Sélection de bars ») has no food trucks"
        }
      ],
      "rules_cold_weather": [
        {
          "rule": "No dress code; the organiser's cold list: manteau d'hiver coupe-vent, pantalon de neige, tuque, mitaines (plus chaud que les gants), bottes (pas des souliers), bas chauds + 2e paire, foulard/cache-cou/cagoule, réchauffe-pieds et réchauffe-mains",
          "source": "s5",
          "readOn": "2026-10-24"
        },
        {
          "rule": "Bring list, Montréal",
          "items": [
            "Pièce d'identité avec photo (Permis, passeport, carte assurance maladie)",
            "Gourde réutilisable",
            "Vêtements adaptés la température (Tuque, gants et bottes nécessaires pour passer une incroyable soirée)",
            "Petit parapluie",
            "Les petits sacs (ils seront fouillés à l'entrée)"
          ],
          "source": "s5",
          "readOn": "2026-10-24",
          "note": "five items in this order; the clothing line is the organiser's with its missing « à » (« adaptés la température »), kept as printed or quoted with [sic]-free paraphrase; Gatineau's FAQ carries the same line with the « à » (« Vêtements adaptés à la température … », `gatineau_faq.bring`) and no « Petit parapluie ». So the clothing line is shared by the two FAQs, not Gatineau's alone (W15)"
        },
        {
          "rule": "Banned: backpacks and any bag over 35 × 35 × 15,25 cm, alcohol, food and drinks, glass, umbrellas (listed as banned on the same page that suggests a 'petit parapluie' — flag for the writer), chairs, cameras ≥ 8 in with detachable lens, drones/tripods/selfie sticks, laser pointers, fireworks, bikes/skates, animals except service dogs, First Nations headdresses; no cloakroom in Montréal",
          "source": "s5",
          "readOn": "2026-10-24"
        },
        {
          "rule": "Québec: bags over 35 × 35 × 15,25 cm refused, a consigne exists at the entrance; no re-entry; shows go on 'beau temps mauvais temps', cancellation only for dangerous weather, status on the Facebook page",
          "source": "s13b",
          "readOn": "2026-10-24"
        },
        {
          "rule": "Cannabis: no smoking/vaping in public places; under-21s may not buy or hold it (Québec law as the organiser states it)",
          "source": "s5",
          "readOn": "2026-10-24"
        },
        {
          "rule": "On-site payment: credit and debit cards only; no ATMs (Québec)",
          "source": [
            "s5",
            "s13b"
          ],
          "readOn": "2026-10-24"
        },
        {
          "rule": "GRIP harm-reduction team on site at the indoor Scéna space (Montréal); consent policy printed in the FAQ",
          "source": "s5",
          "readOn": "2026-10-24"
        },
        {
          "rule": "Iglooswag: the organiser's contest for the most improbable snowsuit (2026 edition announced 19 Dec 2025)",
          "source": "s16",
          "readOn": "2026-10-24"
        }
      ],
      "transport": [
        {
          "key": "Montréal, métro",
          "city": "Montréal",
          "how": "Nous sommes à quelques minutes à pied des stations Champs-de-Mars et Place d'Armes, sur la ligne orange. Il est aussi possible de venir en autobus.",
          "source": "s5",
          "readOn": "2026-10-24",
          "note": "s3 names the same two stations with the last-train lines; 'le plus souvent par la ligne orange' is nobody's sentence and is withdrawn; the lede names the two stations and 'ligne orange' as s5 has them; (c). The last-train lines are printed with the organiser's parentheses: 'Direction Montmorency : 00 h 51 tous les jours (sauf samedi 01 h 21)'; they were not compared with the STM's: stm.info timed out again at 21:35 UTC (curl 000), sto.ca answered 503",
          "last_trains": {
            "source": "s3en",
            "readOn": "2026-10-24",
            "fr_source": "s3",
            "en": {
              "Place-d'Armes": [
                "Towards Montmorency: 00:51 AM every day (except Saturday 1:21 AM)",
                "Towards Côte-Vertu: 1:00 AM every day (except Saturday 1:30 AM)"
              ],
              "Champ-de-Mars": [
                "Towards Montmorency: 00:52 AM every day (except Saturday 1:22 AM)",
                "Towards Côte-Vertu: 00:59 AM every day (except Saturday 1:29 AM)"
              ]
            },
            "heading_en": "Last subway passage",
            "fr": {
              "Place-d'Armes": [
                "Direction Montmorency : 00 h 51 tous les jours (sauf samedi 01 h 21)",
                "Direction Côte-Vertu : 1 h tous les jours (sauf samedi 01 h 30)"
              ],
              "Champ-de-Mars": [
                "Direction Montmorency : 00 h 52 tous les jours (sauf samedi 01 h 22)",
                "Direction Côte-Vertu : 00 h 59 tous les jours (sauf samedi 01 h 29)"
              ]
            },
            "note": "the two pages agree time for time. 'except Saturday' is the organiser's, as ambiguous as « sauf samedi » (stale_or_contradictory.2): print 'or 01:21 on Saturdays' (W4), never 'Saturday night'. Not compared with the STM's own timetable (stm.info not read). The English FAQ spells the station 'Champs-de-Mars'; the transport pages 'Champ-de-Mars'"
          }
        },
        {
          "city": "Montréal",
          "how": "Bus 55 Saint-Laurent (arrêt Saint-Laurent / Saint-Jacques), 715 Vieux-Montréal/Vieux-Port (arrêt Notre-Dame / De Bonsecours), night bus 361 Saint-Denis (arrêt Place Jacques-Cartier)",
          "source": "s3",
          "readOn": "2026-10-24",
          "public_body": "s18"
        },
        {
          "key": "Montréal, YUL",
          "city": "Montréal",
          "how": "Navette de l'aéroport au centre-ville — Ligne 747 YUL Aéroport Montréal-Trudeau/Centre-Ville",
          "source": "s3",
          "readOn": "2026-10-24",
          "note": "s3 gives the 747 only; 'puis le métro' was the sheet's inference and is withdrawn; W12 d"
        },
        {
          "city": "Montréal",
          "how": "Train: Gare centrale (métro Bonaventure), VIA Rail and Amtrak; coach: Gare d'autocars de Montréal (métro Berri-UQAM); car: parking at Quai de l'Horloge and Quai King-Edward, entrances via rue de la Commune, rue Berri, boulevard Saint-Laurent; carpool: AmigoExpress",
          "source": "s3",
          "readOn": "2026-10-24"
        },
        {
          "city": "Québec",
          "how": "RTC bus 802 (arrêt Centre de Foires); 64, 74, 82, 84 (arrêt François-1re from downtown); 4 (arrêt Daniel); 3, 801 (arrêt 18e Rue) or 64/74/82/84 (arrêt Fleur-de-Lys); Centre Vidéotron parking 15 $/vehicle; La Québécoise coach from Montréal (Place Bonaventure 15 h 00), St-Hyacinthe, Drummondville, 75 $ + taxes return incl. ticket, booking marketing@groupealq.com — 2026 wording",
          "source": [
            "s13",
            "s13b"
          ],
          "readOn": "2026-10-24",
          "public_body": "s19"
        },
        {
          "city": "Gatineau",
          "how": "STO Plani-bus trip planner; car: 60, rue Jos-Montferrand, paid parking in Vieux-Hull (Dubé Stationnement); Tolérance Zéro designated-driver service on site, fee by distance; AmigoExpress carpool",
          "source": "s14",
          "readOn": "2026-10-24",
          "public_body": "s20"
        },
        {
          "city": "Edmonton",
          "how": "not stated on the French site (not_found)",
          "source": null
        }
      ],
      "questions": [
        {
          "q": "Quelle est la date de l'Igloofest à Montréal ?",
          "seen": "people also ask (igloofest montréal 2027)",
          "answer_from": [
            "s1"
          ]
        },
        {
          "q": "Quel est le prix d'un billet pour l'Igloofest ?",
          "seen": "people also ask (4 of 5 queries)",
          "answer_from": [
            "s2",
            "s7"
          ]
        },
        {
          "q": "Comment s'habiller pour l'Igloofest ?",
          "seen": "people also ask (4 of 5 queries)",
          "answer_from": [
            "s5",
            "s13c"
          ]
        },
        {
          "q": "Est-ce que Igloofest est gratuit ?",
          "seen": "people also ask (igloofest montréal 2027)",
          "answer_from": [
            "s2",
            "s14b"
          ]
        },
        {
          "q": "Quelle est la date d'Igloofest Québec ?",
          "seen": "people also ask (igloofest québec 2027)",
          "answer_from": [
            "s6"
          ]
        },
        {
          "q": "Où se déroule Igloofest ?",
          "seen": "people also ask (igloofest québec 2027)",
          "answer_from": [
            "s3",
            "s13",
            "s14",
            "s12"
          ]
        },
        {
          "q": "Quand commence Igloofest ?",
          "seen": "people also ask (igloofest 2027 programmation)",
          "answer_from": [
            "s1"
          ]
        },
        {
          "q": "Quel est le festival le plus froid du monde ?",
          "seen": "people also ask (igloofest 2027 programmation)",
          "answer_from": [
            "s5"
          ]
        },
        {
          "q": "Quand est Igloofest ?",
          "seen": "people also ask (igloofest gatineau 2027)",
          "answer_from": [
            "s1",
            "s9",
            "s6",
            "s12"
          ]
        },
        {
          "q": "Igloofest 2027 : dates ? (igloofest 2027 dates)",
          "seen": "autocomplete",
          "answer_from": [
            "s1",
            "s9",
            "s6",
            "s12"
          ]
        },
        {
          "q": "Igloofest 2027 : programmation / lineup ? (igloofest 2027 programmation, igloofest 2027 lineup, igloofest montreal 2027 lineup)",
          "seen": "autocomplete",
          "answer_from": [
            "s1",
            "s4"
          ]
        },
        {
          "q": "Igloofest 2027 : billets et prix ? (igloofest 2027 tickets, igloofest 2027 tickets price)",
          "seen": "autocomplete",
          "answer_from": [
            "s2",
            "s4"
          ]
        },
        {
          "q": "Igloofest Québec 2027 ? (igloofest quebec 2027, igloofest quebec)",
          "seen": "autocomplete",
          "answer_from": [
            "s6",
            "s13",
            "s13b"
          ]
        },
        {
          "q": "Igloofest Gatineau 2027 ? (igloofest gatineau, igloofest gatineau 2027, igloofest 2027 gatineau)",
          "seen": "autocomplete",
          "answer_from": [
            "s9",
            "s14",
            "s14b"
          ]
        },
        {
          "q": "Igloofest Montréal 2027 / igloofest mtl 2027 ?",
          "seen": "autocomplete",
          "answer_from": [
            "s1",
            "s3"
          ]
        },
        {
          "q": "C'est 18 ans et plus ? (Igloofest, c'est pour qui ?)",
          "seen": "organiser's FAQ (Montréal, Québec, Gatineau)",
          "answer_from": [
            "s5",
            "s13b",
            "s14b"
          ]
        },
        {
          "q": "Je m'y rends comment ? / Quel est le dernier métro ?",
          "seen": "organiser's FAQ and transport page",
          "answer_from": [
            "s3"
          ]
        },
        {
          "q": "Qu'est-ce qui est interdit d'apporter sur le site ?",
          "seen": "organiser's FAQ",
          "answer_from": [
            "s5",
            "s13b",
            "s14b"
          ]
        },
        {
          "q": "Est-ce que je peux me faire rembourser ?",
          "seen": "organiser's tickets FAQ",
          "answer_from": [
            "s2"
          ]
        },
        {
          "q": "Est-ce qu'il y a des billets disponibles à la porte ?",
          "seen": "organiser's tickets FAQ",
          "answer_from": [
            "s2"
          ]
        },
        {
          "q": "Qu'est-ce que l'Igloopasse et combien coûte-t-elle ?",
          "seen": "organiser's tickets page (card « Igloopasse », FAQ « À quoi me donne accès ma passe Igloofest? »)",
          "answer_from": [
            "s2"
          ]
        },
        {
          "q": "Quand commence la vente des billets pour Igloofest 2027 ?",
          "seen": "organiser's tickets page banner and the 21 Oct post",
          "answer_from": [
            "s2",
            "s4",
            "s24"
          ]
        }
      ],
      "sources": {
        "s1": {
          "label": "Igloofest Montréal — programmation 2027 (week-ends 1–4)",
          "url": "https://igloofest.ca/fr/festival",
          "kind": "organiser"
        },
        "s2": {
          "label": "Igloofest Montréal — Passes et billets",
          "url": "https://igloofest.ca/fr/passes-et-billets",
          "kind": "organiser"
        },
        "s3": {
          "label": "Igloofest Montréal — Lieu et transport",
          "url": "https://igloofest.ca/fr/infos-festivaliers/lieu-et-transport",
          "kind": "organiser"
        },
        "s4": {
          "label": "Igloofest Montréal — « Programmation 2027 », 21 oct. 2026",
          "url": "https://igloofest.ca/fr/nouvelles/prog-2027",
          "kind": "organiser"
        },
        "s4b": {
          "label": "Igloofest Montréal — « Igloofest MTL #16 | 23 janvier 2027 », 21 sept. 2026",
          "url": "https://igloofest.ca/fr/nouvelles/prog-igloofest-mtl-6",
          "kind": "organiser"
        },
        "s5": {
          "label": "Igloofest Montréal — Règlements et FAQ",
          "url": "https://igloofest.ca/fr/infos-festivaliers/reglements-et-faq",
          "kind": "organiser"
        },
        "s5b": {
          "label": "Igloofest Montréal — À propos (2026 text: 18e édition, four cities)",
          "url": "https://igloofest.ca/fr/a-propos",
          "kind": "organiser"
        },
        "s6": {
          "label": "Igloofest Québec — accueil (4, 5 et 6 mars 2027)",
          "url": "https://quebec.igloofest.ca/fr",
          "kind": "organiser"
        },
        "s7": {
          "label": "Igloofest Québec — communiqué 12 nov. 2025 (édition 2026, mise en vente)",
          "url": "https://quebec.igloofest.ca/fr/nouvelles/general-ticket-sales-will-begin-this-friday-november-14-at-1100-a-m",
          "kind": "organiser"
        },
        "s8": {
          "label": "Igloofest Québec — communiqué 20 nov. 2024 (édition 2025)",
          "url": "https://quebec.igloofest.ca/fr/nouvelles/communique-igloofest-quebec-plus-gros-et-indomptable-que-jamais",
          "kind": "organiser"
        },
        "s9": {
          "label": "Igloofest Gatineau — accueil et programmation (11 au 13 février 2027)",
          "url": "https://gatineau.igloofest.ca/fr",
          "kind": "organiser"
        },
        "s10": {
          "label": "Igloofest Gatineau — nouvelles (2026 announcements, 23 oct. and 12 nov. 2025)",
          "url": "https://gatineau.igloofest.ca/fr/nouvelles",
          "kind": "organiser"
        },
        "s11": {
          "label": "Igloofest Gatineau — À propos",
          "url": "https://gatineau.igloofest.ca/fr/a-propos",
          "kind": "organiser"
        },
        "s12": {
          "label": "Igloofest Edmonton — accueil et programmation (11–13 mars 2027, Fan Park ICE District, Ticketmaster)",
          "url": "https://edmonton.igloofest.ca/fr",
          "kind": "organiser"
        },
        "s13": {
          "label": "Igloofest Québec — Lieu et transport",
          "url": "https://quebec.igloofest.ca/fr/infos-festivaliers/lieu-et-transport",
          "kind": "organiser"
        },
        "s13b": {
          "label": "Igloofest Québec — Règlements et FAQ",
          "url": "https://quebec.igloofest.ca/fr/infos-festivaliers/reglements-et-faq",
          "kind": "organiser"
        },
        "s13c": {
          "label": "Igloofest Québec — L'expérience (dress ideas, 2026 recap)",
          "url": "https://quebec.igloofest.ca/fr/experience",
          "kind": "organiser"
        },
        "s14": {
          "label": "Igloofest Gatineau — Lieu et transport",
          "url": "https://gatineau.igloofest.ca/fr/infos-festivaliers/lieu-et-transport",
          "kind": "organiser"
        },
        "s14b": {
          "label": "Igloofest Gatineau — Règlements et FAQ",
          "url": "https://gatineau.igloofest.ca/fr/infos-festivaliers/reglements-et-faq",
          "kind": "organiser"
        },
        "s15": {
          "label": "Igloofest Montréal — Accessibilité",
          "url": "https://igloofest.ca/fr/infos-festivaliers/accessibilite",
          "kind": "organiser"
        },
        "s16": {
          "label": "Igloofest Montréal — Nouvelles (announcement dates 2025–2026)",
          "url": "https://igloofest.ca/fr/nouvelles",
          "kind": "organiser"
        },
        "s17": {
          "label": "OpenStreetMap Nominatim (coordinates only)",
          "url": "https://nominatim.openstreetmap.org/",
          "kind": "public body"
        },
        "s18": {
          "label": "STM — Société de transport de Montréal",
          "url": "https://www.stm.info/fr",
          "kind": "public body",
          "note": "named by the organiser; stm.info timed out from here on 22 Oct, not read"
        },
        "s19": {
          "label": "RTC — Réseau de transport de la Capitale",
          "url": "https://www.rtcquebec.ca/",
          "kind": "public body",
          "note": "reachable (200); routes taken from the organiser's page"
        },
        "s20": {
          "label": "STO — Société de transport de l'Outaouais",
          "url": "https://www.sto.ca/",
          "kind": "public body",
          "note": "503 on 22 Oct; named by the organiser"
        },
        "s21": {
          "label": "Vieux-Port de Montréal",
          "url": "https://www.vieuxportdemontreal.com/",
          "kind": "venue",
          "note": "home reachable; no page for the quay found"
        },
        "s22": {
          "label": "Ticketmaster Canada — Fan Park at ICE District",
          "url": "https://www.ticketmaster.ca/fan-park-at-ice-district-tickets-edmonton/venue/140831",
          "kind": "seller",
          "note": "the organiser's link; not read"
        },
        "s10b": {
          "label": "Igloofest Gatineau — « Igloofest Gatineau 2026 : une deuxième édition qui frappe fort », 16 févr. 2026",
          "url": "https://gatineau.igloofest.ca/fr/nouvelles/igloofest-gatineau-2026-une-deuxieme-edition-qui-frappe-fort",
          "kind": "organiser"
        },
        "s10c": {
          "label": "Igloofest Gatineau — « Steve Aoki, Kaskade et BUNT. à Igloofest Gatineau », 12 nov. 2025",
          "url": "https://gatineau.igloofest.ca/fr/nouvelles/steve-aoki-kaskade-et-bunt-a-igloofest-gatineau",
          "kind": "organiser"
        },
        "s23": {
          "label": "Igloofest Edmonton — accueil (anglais)",
          "url": "https://edmonton.igloofest.ca/en",
          "kind": "organiser",
          "note": "2027 dates only; read for S1"
        },
        "s2en": {
          "label": "Igloofest Montréal — Passes and tickets (English page of s2)",
          "url": "https://igloofest.ca/en/passes-and-tickets",
          "kind": "organiser",
          "note": "read 22 Oct 2026 03:12 Montréal, where the French guide cites it only for '+tx' and the English button targets; read again on 24 Oct 2026 for the English twin, whose tickets page it is"
        },
        "s24": {
          "label": "Billetterie Igloofest — salle d'attente (the « Acheter » buttons' target), Eventshopper",
          "url": "https://billets.igloofest.ca/mul/go/6070144b-f1a0-457e-a50c-af5a0d1ce2a4/waiting-room/not-on-sale?fac=IGLOOFEST&locale=fr-CA&skin=igloofestmtl",
          "kind": "seller",
          "note": "JavaScript app (Outbox Technology / Eventshopper 9.60.7); read in the pane 22 Oct 07:15 UTC behind its cookie dialog, which was neither accepted nor refused; the page announces it will redirect into a random queue position when sales open, so it was left at once. Cited for the sale time with its zone; not a /go/ target (the session's ruling: /go/igloofest-billets/ → s2)"
        },
        "s1en": {
          "label": "Igloofest Montreal — Montreal Lineup (week-ends 1–4)",
          "url": "https://igloofest.ca/en/festival",
          "kind": "organiser"
        },
        "s3en": {
          "label": "Igloofest Montreal — Location and transportation",
          "url": "https://igloofest.ca/en/infos-festivaliers/location-and-transportation",
          "kind": "organiser"
        },
        "s4en": {
          "label": "Igloofest Montreal — 'IGLOOFEST MTL | 2027 Lineup', 21 Oct 2026",
          "url": "https://igloofest.ca/en/news/prog-2027",
          "kind": "organiser"
        },
        "s5en": {
          "label": "Igloofest Montreal — Rules and FAQ",
          "url": "https://igloofest.ca/en/infos-festivaliers/rules-and-faq",
          "kind": "organiser"
        },
        "s5ben": {
          "label": "Igloofest Montreal — About us (2026 text)",
          "url": "https://igloofest.ca/en/about-us",
          "kind": "organiser"
        },
        "s6en": {
          "label": "Igloofest Quebec — English home (March 04, 05 and 06, 2027)",
          "url": "https://quebec.igloofest.ca/en",
          "kind": "organiser",
          "note": "the English site has eight pages answering 200 on 24 Oct 2026: home, /en/experience, /en/festival (line-up, 'Schedule to come'), /en/news (the 12 Nov 2025 release in English), /en/partners, /en/sustainable-development, /en/contact, /en/media. Its footer's 'Rules and FAQ', 'Location and transportation', 'Lost and founds' and 'What to do in Quebec City?' go to the French pages; /en/infos-festivaliers/rules-and-faq and /en/infos-festivaliers/location-and-transportation answer 404. Replaces the 1c note"
        },
        "s6ben": {
          "label": "Igloofest Quebec — Quebec lineup (English)",
          "url": "https://quebec.igloofest.ca/en/festival",
          "kind": "organiser",
          "note": "'Schedule to come' on 24 Oct 2026"
        },
        "s7en": {
          "label": "Igloofest Quebec — 'Igloofest Québec 2026 set to take Québec City by storm!', release of 12 Nov 2025 (English; page title 'General ticket sales will begin this Friday, November 14 at 11:00 a.m.')",
          "url": "https://quebec.igloofest.ca/en/news/general-ticket-sales-will-begin-this-friday-november-14-at-1100-a-m",
          "kind": "organiser"
        },
        "s9en": {
          "label": "Igloofest Gatineau — home (February 11 to 13, 2027)",
          "url": "https://gatineau.igloofest.ca/en",
          "kind": "organiser"
        },
        "s10ben": {
          "label": "Igloofest Gatineau — 'Igloofest Gatineau 2026: Year Two Was One for the Books', 16 Feb 2026 (English)",
          "url": "https://gatineau.igloofest.ca/en/news/igloofest-gatineau-2026-une-deuxieme-edition-qui-frappe-fort",
          "kind": "organiser"
        },
        "s11en": {
          "label": "Igloofest Gatineau — About us (English)",
          "url": "https://gatineau.igloofest.ca/en/about-us",
          "kind": "organiser"
        },
        "s13cen": {
          "label": "Igloofest Quebec — The experience (English)",
          "url": "https://quebec.igloofest.ca/en/experience",
          "kind": "organiser",
          "note": "'Igloofest Québec will be back in the capital from March 4 to 6, 2027!'; 'Wondering what the dresscode is? We have some ideas for you.' (costume ideas, not rules)"
        },
        "s14en": {
          "label": "Igloofest Gatineau — Location and Transportation",
          "url": "https://gatineau.igloofest.ca/en/infos-festivaliers/location-and-transportation",
          "kind": "organiser"
        },
        "s14ben": {
          "label": "Igloofest Gatineau — Rules and FAQ",
          "url": "https://gatineau.igloofest.ca/en/infos-festivaliers/rules-and-faq",
          "kind": "organiser"
        },
        "s15en": {
          "label": "Igloofest Montreal — Accessibility",
          "url": "https://igloofest.ca/en/infos-festivaliers/accessibility",
          "kind": "organiser"
        },
        "s16en": {
          "label": "Igloofest Montreal — News",
          "url": "https://igloofest.ca/en/news",
          "kind": "organiser"
        },
        "s22b": {
          "label": "Ticketmaster Canada — Igloofest Edmonton (artist page)",
          "url": "https://www.ticketmaster.ca/igloofest-edmonton-tickets/artist/4082829",
          "kind": "seller",
          "note": "linked by the EN Edmonton site; 0 events on 24 Oct"
        },
        "s23b": {
          "label": "Igloofest Edmonton — Lineup",
          "url": "https://edmonton.igloofest.ca/en/festival",
          "kind": "organiser"
        },
        "s23c": {
          "label": "Igloofest Edmonton — Passes & Tickets",
          "url": "https://edmonton.igloofest.ca/en/passes-and-tickets",
          "kind": "organiser"
        },
        "s25": {
          "label": "Billetterie Igloofest — Igloofest Montreal 2027 (English shop list and night pages)",
          "url": "https://billets.igloofest.ca/mul/go/6070144b-f1a0-457e-a50c-af5a0d1ce2a4?fac=IGLOOFEST&locale=en-CA&skin=igloofestmtl",
          "kind": "seller",
          "note": "read once, 24 Oct 2026 02:30–03:00 UTC (round 1). Re-read attempted 04:20–04:35 UTC: the list URL redirects to …/shop/custom-pack and shows only 'Igloofest Montreal 2027 / Jacques-Cartier Pier - Montréal, QC / Jan 14 - Feb 6, 2027' behind a visible reCAPTCHA challenge; the night 1 page (…/shop/search?ec=IGLOOMTL20270114…) shows only 'Igloofest Montréal #1 - KAYTRANADA / Jacques-Cartier Pier - Montréal, QC / Jan 14, 2027, 7:30 PM'. Not touched; not re-read"
        },
        "s26": {
          "label": "GOV.UK — Canada travel advice: entry requirements",
          "url": "https://www.gov.uk/foreign-travel-advice/canada/entry-requirements",
          "kind": "public body",
          "note": "last updated 2 Jun 2026 (content API)"
        },
        "s27": {
          "label": "Government of Canada — Electronic travel authorization (eTA)",
          "url": "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html",
          "kind": "public body",
          "note": "page details 2026-06-05"
        },
        "s28": {
          "label": "Government of Canada — What you need to enter Canada",
          "url": "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/entry-requirements-country.html",
          "kind": "public body",
          "note": "dcterms.modified 2026-07-31"
        },
        "s29": {
          "label": "Government of Canada — Find out about electronic travel authorization (eTA)",
          "url": "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/facts.html",
          "kind": "public body",
          "note": "linked from s27 as 'Find out about eTAs and if you can apply'; dcterms.modified 2024-04-23"
        }
      },
      "not_found": [
        {
          "gap": "single-night prices for Montréal 2027 (sale opens 23 Oct; the shop is JavaScript-only) — the writer prints no night price; re-read billets.igloofest.ca in the pane after 23 Oct 11 h",
          "value": "resolved by the per-night prices above (nights 9–11 excepted)",
          "source": "s25",
          "readOn": "2026-10-24"
        },
        "the day the Montréal Igloopasse went on sale and the day it sold out",
        {
          "gap": "Montréal closing time per night (set times run to 23:15; last metro ~0 h 51–1 h 30 on the organiser's page)",
          "value": "superseded 24 Oct 2026: Montréal's hours are published in the English FAQ (hours_montreal); what is still not found is in not_found_hours. Cite neither this item nor its old text"
        },
        "a street address for Quai Jacques-Cartier from the organiser or the Old Port (the organiser names the quay and its three street entrances)",
        "Gatineau and Québec 2027 line-ups, prices and sale dates (Gatineau: 'à venir'; Québec: 'bientôt'; the last two Québec releases came 20 Nov 2024 and 12 Nov 2025)",
        "Edmonton: minimum age, transport, prices, line-up (French site shows 'Mystery guest' only); Ticketmaster page not read",
        "the edition number of Montréal 2027 as the organiser states it (2026 was 'la 18e édition')",
        "box office / customer-service hours",
        "taxes on the 234 $ Igloopasse price",
        "forum and reddit threads in French: not surveyed this round to spare the allowance; the questions above come from PAA, autocomplete and the organiser's own FAQs"
      ],
      "pricing_model": {
        "text": "Les billets sont vendus par paliers progressifs pour nous permettre d'offrir des billets aux meilleurs prix à nos early birds.",
        "source": "s2",
        "readOn": "2026-10-24",
        "note": "the organiser's sentence on its pricing; the honest answer to 'prix' until a night price is read with seller and date. 'Dépêchez-vous si vous voulez payer votre billet au meilleur prix' is its marketing, quoted at most as its sentence"
      },
      "stale_or_contradictory": [
        {
          "line": "Les billets pour Igloofest Montréal sont désormais disponibles sur notre billetterie !",
          "where": "tickets FAQ (s2)",
          "status": "stale: sits under the banner 'Prévente le 22 octobre à 11h / Mise en vente des billets le 23 octobre à 11h00'; the timeline comes from the banner and the 21 Oct post (s4) alone",
          "now": {
            "text": "no longer stale: the sale is open",
            "source": [
              "s2",
              "s25"
            ],
            "readOn": "2026-10-24"
          }
        },
        {
          "line": "Situé à seulement 20 minutes du centre-ville (FAQ, s5) / à seulement 30 minutes du centre-ville (Lieu et transport, s3)",
          "status": "contradictory: neither figure is printed; the page gives the 747 bus and the organiser's transport page"
        },
        {
          "line": "Direction Montmorency : 00 h 51 tous les jours (sauf samedi 01 h 21) …",
          "where": "Lieu et transport (s3)",
          "status": "ambiguous: 'samedi' does not say whether Friday night or Saturday night; printed verbatim as the organiser's, read 22 Oct, never as 'samedi soir' and never as STM's (stm.info not read: timed out 21 and 22 Oct)"
        },
        {
          "line": "'Parapluie' in the banned list and 'Petit parapluie' under what to bring",
          "where": "Règlements et FAQ (s5)",
          "status": "contradictory: both printed as the organiser prints them, the disagreement named, info@igloofest.ca (on the tickets page, s2) as the one who can answer"
        },
        {
          "line": "'Après Ski 12 au 14 mars' tab",
          "where": "Edmonton programme (s12)",
          "status": "2026 leftover (page data dated 12–14 March 2026)"
        },
        {
          "line": "Montréal FAQ 'du 15 janvier au 7 février', À propos '18e édition', tickets FAQ 'saison 2026', Québec coach 'la soirée du 7 mars', Edmonton sidebar with 2026 dates",
          "status": "as listed in round 1: not copied",
          "now": {
            "text": "Montréal FAQ now 2027 (FR « L'édition 2027 à Montréal va se tenir du 14 janvier au 6 février 2027 », EN 'January 14th to February 6th'); About FR/EN still the 2026 text (18e édition, 15 Jan–7 Feb …)",
            "source": [
              "s5",
              "s5en",
              "s5b",
              "s5ben"
            ],
            "readOn": "2026-10-24"
          }
        }
      ],
      "not_printable": [
        {
          "text": "plus de 20 000 festivaliers sont attendus",
          "where": "Québec release 12 Nov 2025 (s7) and 20 Nov 2024 (s8)",
          "why": "a forecast; never printed"
        },
        {
          "text": "plus de 18 000 Igloosapiens",
          "where": "Québec experience page (s13c)",
          "how": "only as the 2026 edition's after-the-event figure, labelled 2026, never beside a 2027 sentence"
        },
        {
          "text": "Bonjour Québec, Québec Vacances, Silo 57, FestLocator",
          "why": "the SERP's competition: not cited, not linked"
        },
        {
          "text": "s17 Nominatim",
          "why": "not a public body: coordinates for geo only, never linked"
        }
      ],
      "paths": {
        "cut": [
          "/go/igloofest-vieux-port/"
        ]
      },
      "bal_de_neige": {
        "text": "Le festival de musique le plus froid au monde sera de retour à Gatineau, en 2027, à la Place des Festivals Zibi, dans le cadre de l'iconique Bal de neige.",
        "where": "meta description of gatineau.igloofest.ca/fr (s9)",
        "readOn": "2026-10-24",
        "note": "the organiser now dates it: 2027 within Bal de Neige, as s9's meta description. The gate-1 'undated' repair is superseded; the About page's present-tense sentence (s11) remains the undated one. The writer may say 2027 citing s9's description, and cuts 'ce guide ne la transforme pas en fait de 2027'"
      },
      "payment_on_site": [
        {
          "city": "Montréal",
          "text": "Nous n'acceptons dorénavant que les paiements par carte de crédit et débit sur l'ensemble du site.",
          "source": "s5",
          "readOn": "2026-10-24"
        },
        {
          "city": "Gatineau",
          "text": "Nous n'acceptons que les paiements par carte de crédit et débit sur l'ensemble du site.",
          "source": "s14b",
          "readOn": "2026-10-24"
        },
        {
          "city": "Québec",
          "text": "Y a-t-il des guichets automatiques sur les sites? Non.",
          "source": "s13b",
          "readOn": "2026-10-24",
          "note": "no 'cards only' sentence on the Québec FAQ; only the no-ATM answer"
        },
        {
          "city": "Edmonton",
          "text": null,
          "note": "not stated"
        }
      ],
      "gatineau_seller": {
        "text": "Les passes et les billets sont disponibles via la billetterie officielle d'Igloofest. … Seuls les billets achetés via la billetterie officielle d'Igloofest seront acceptés. … Les billets sont en vente uniquement en ligne, via notre billetterie officielle.",
        "en": "Passes and tickets can be purchased through the ticketing platform. … ONLY tickets purchased through Igloofest's ticketing platform will be accepted. … Tickets are only available online through our ticketing platform.",
        "source": [
          "s14b",
          "s14ben"
        ],
        "readOn": "2026-10-24",
        "note": "until 22 Oct the first sentence began « Les Igloopasses et les billets »; no Gatineau page names or links billets.igloofest.ca (unchanged)"
      },
      "banned_items": [
        {
          "key": "Montréal",
          "city": "Montréal",
          "source": "s5",
          "readOn": "2026-10-24",
          "header": "TOUS LES FESTIVALIERS ET LES SACS SERONT ASSUJETTIS À UNE FOUILLE LORS DE L'ACCÈS AU SITE!",
          "items": [
            "Animaux, sauf les chiens d'assistance dûment identifiés et accrédités",
            "Appareil photo de 8 pouces ou plus avec accessoires (lentilles détachable, flash, trépieds). Les appareils conformes seront acceptés",
            "Armes blanches, objets contondants ou tout élément qui peuvent être utilisés comme une arme (y compris les chaînes et même les chaînes de portefeuille et les spikes)",
            "Aucun sac à dos, sac-glacière, sac de sport, sac de type camping ou à armature, quelle que soit sa taille … Tous les autres sacs dont les dimensions dépassent 35 cm x 35 cm x 15,25 cm seront également refusés",
            "Breuvages alcoolisés",
            "Casque de moto ou de vélo",
            "Chaises portatives et pliantes de toute sorte",
            "Contenants de verre",
            "Dossards ou habits de sécurité fluorescents",
            "Drogues et accessoires reliés (sauf médicaments sous prescription dans le contenant original avec la prescription)",
            "Équipement vidéo ou d'enregistrement audio ou vidéo d'aucune sorte (Drône, Pieds de caméra, bâton à égoportrait (selfie), micro, trépied ou article similaire)",
            "Feux d'artifice, confettis, feux de Bengale ou pétards",
            "Instruments de musique (mégaphone, speaker, sifflet)",
            "Le port des coiffes de guerre ou des Premières Nations",
            "Matériel Promotionnel et/ou flyers en grande quantité …",
            "Matériel, récipients ou objets activés par de l'air comprimé ou par des propulseurs sous pression",
            "Nourriture et breuvages",
            "Parapluie",
            "Pointeur laser",
            "Tentes",
            "Tout autre objet jugé dangereux ou nuisible, à la discrétion de l'organisation",
            "Vélos, planches à roulette, patins"
          ],
          "closing": "Toute personne ayant en sa possession un objet interdit se verra interdire l'accès, à moins de se départir volontairement de cet objet dans les contenants prévus à cet effet. Il n'y a aucun vestiaire ni endroit pour placer des objets en consignes."
        },
        {
          "key": "Gatineau",
          "city": "Gatineau",
          "source": "s14b",
          "readOn": "2026-10-24",
          "header": "TOUS LES FESTIVALIERS ET LES SACS SERONT ASSUJETTIS À UNE FOUILLE LORS DE L'ACCÈS AU SITE! Sachez qu'il est interdit d'apporter ces objets sur le site :",
          "items": [
            "Appareils photo professionnels (sont considérés comme « professionnels » les appareils avec lentille détachable)",
            "Armes blanches, objets contondants … (y compris les chaînes et même les chaînes de portefeuille et les spikes)",
            "aucun sac à dos, sacs-glacières, sacs de sport, sac style camping ou à armature, peu importe les dimensions … Tous autres sacs dont les dimensions excèdent 35cm X 35cm X 15.25cm",
            "Breuvages alcoolisés",
            "Casque de moto ou de vélo",
            "Chaises portatives et pliantes de toute sorte",
            "Contenants de verre",
            "Dossard ou habit de sécurité fluorescent",
            "Drogues et accessoires reliés (sauf médicaments sous prescription dans le contenant original avec la prescription)",
            "Équipement vidéo ou d'enregistrement audio ou vidéo d'aucune sorte (Drône, Pieds de caméra, bâton à égoportrait (selfie), trépied ou article similaire)",
            "Feux d'artifice, confettis, feux de Bengale ou pétards",
            "Instruments de musique (mégaphone, speaker, sifflet)",
            "Le port des coiffes de guerre ou des Premières Nations",
            "Matériel Promotionnel et/ou flyers en grande quantité …",
            "Matériel, récipients ou objets activés par de l'air comprimé ou par des propulseurs sous pression",
            "Nourriture et breuvages",
            "Parapluie",
            "Pointeur laser",
            "Tentes",
            "Vélos, planches à roulette, patins",
            "Tout autre objet jugé dangereux ou nuisible, à la discrétion de l'organisation"
          ],
          "closing": "Toute personne ayant en sa possession un objet interdit se verra refuser l'accès, à moins de se départir volontairement de cet objet dans les contenants prévus à cet effet. Il n'y a aucun vestiaire ni endroit pour placer des objets en consigne.",
          "animals": "Seuls les chiens d'assistance dûment identifiés et accrédités sont permis sur le site. Une preuve vous sera demandée à l'entrée.",
          "differs_from_montreal": "no 'Animaux' line in the list (a separate question instead), no camera-size rule (any detachable lens), no 'Petit parapluie' in the bring list, so no umbrella contradiction in Gatineau"
        },
        {
          "key": "Québec",
          "city": "Québec",
          "source": "s13b",
          "readOn": "2026-10-24",
          "header": "TOUS LES SACS À MAIN SERONT ASSUJETTIS À UNE FOUILLE LORS DE L'ACCÈS AU SITE. Aucune bouteille n'est acceptée sur le site. Aucun sac dont les dimensions excèdent 35 cm x 35 cm x 15,25 cm ne sera accepté sur le site. Une consigne est disponible à l'entrée.",
          "items": [
            "Nourriture et breuvages",
            "Animaux (chiens-guides acceptés)",
            "Appareils photo professionnels (… lentille détachables, même de petite taille)",
            "Équipement vidéo ou d'enregistrement audio d'aucune sorte",
            "Pieds de caméra, bâton à égoportrait (selfie), trépied ou article similaire",
            "Armes blanches, objets contondants … (y compris les chaînes et même les chaînes de portefeuille et les spikes)",
            "Casque de moto ou de vélo (à déposer au vestiaire à l'entrée)",
            "Chaises portatives et pliantes de toute sorte",
            "Drogues et accessoires reliés (sauf médicaments sous prescription)",
            "Feux d'artifice, feux de Bengale ou pétards",
            "Grands sacs à dos de style camping ou à armature en métal",
            "Item pouvant poser un danger à la sécurité des autres spectateurs",
            "Pointeur laser de toute nature",
            "Tentes",
            "Vêtements à l'image de gang de rue",
            "Il est interdit de fumer ou de vapoter du cannabis sur le site de la Place Jean Béliveau",
            "Tout autre objet jugé dangereux ou nuisible, à la discrétion de l'organisation"
          ]
        }
      ],
      "drugs_line": {
        "text": "Drogues et accessoires reliés (sauf médicaments sous prescription dans le contenant original avec la prescription)",
        "source": [
          "s5",
          "s14b"
        ],
        "readOn": "2026-10-24",
        "note": "verbatim on both; Québec's shorter '(sauf médicaments sous prescription)' on s13b"
      },
      "cannabis": {
        "text": "Sous la nouvelle loi… la nouvelle loi interdit maintenant de fumer ou de vapoter du cannabis dans tous les lieux publics; depuis le 1er janvier 2020, il est interdit aux moins de 21 ans d'acheter ou posséder du cannabis.",
        "source": [
          "s5",
          "s14b",
          "s13b"
        ],
        "readOn": "2026-10-24",
        "note": "the organiser says 'la nouvelle loi' and never names Québec; Québec's FAQ adds 'Il est interdit de fumer ou de vapoter du cannabis sur le site de la Place Jean Béliveau'; one attributed sentence at most; W12 e"
      },
      "gatineau_faq": {
        "source": "s14b",
        "readOn": "2026-10-24",
        "who": "Pour tous les guerriers désirant défier l'hiver et les amateurs de musique électronique (ou pas). L'événement est habituellement 18+, cependant à Gatineau c'est différent!",
        "when": "Le 11, 12 et 13 février 2027, de 19h00 à 23h00.",
        "bring": [
          "Pièce d'identité avec photo (Permis de conduite, carte assurance maladie, passeport)",
          "Gourde réutilisable",
          "Vêtements adaptés à la température (Tuque, gants et bottes nécessaires pour passer une incroyable soirée)",
          "Les petits sacs (ils seront fouillés à l'entrée)"
        ],
        "cloakroom": "Il n'y a aucun vestiaire ni endroit pour placer des objets en consigne.",
        "payment": "Nous n'acceptons que les paiements par carte de crédit et débit sur l'ensemble du site.",
        "eticket": "Une confirmation d'achat ainsi que ton billet électronique te seront envoyés par courriel. Télécharge ton billet à l'avance et présente-le sur ton téléphone intelligent à ton arrivée pour qu'il soit scanné à l'entrée.",
        "igloopasse": "Un Igloopasse te donne accès aux 3 soirs d'Igloofest Gatineau avec les mêmes privilèges qu'une admission générale. … Non, l'Igloopasse ne peut pas être partagé. Les détenteurs d'un igloopasse devront fournir une pièce d'identité à l'entrée pour valider que le bon nom figure sur la passe.",
        "igloopasse_en": "An Igloopass gives you access to all three nights of Igloofest Gatineau with the same privileges as general admission. … No, the Igloopass cannot be shared. The Igloopass holder must present a valid ID at the entrance to verify that the name matches the one on the pass.",
        "vip": [
          "Entrée rapide sur le site",
          "Service de bouteilles",
          "Terrasse exclusive avec toilettes chauffées",
          "Vue imprenable sur la scène",
          "Espace intérieur chauffé"
        ],
        "refunds": "Les ventes de billets sont finales. Cependant, les événements restent sujets à un report ou une annulation (avec remboursement).",
        "online_payment": "Notre billetterie en ligne accepte les cartes Visa et Mastercard. … les cartes de crédit prépayées et les cartes Visa Débit ne fonctionnent pas sur notre plateforme.",
        "door": "Les billets sont en vente uniquement en ligne, via notre billetterie officielle.",
        "ticket_missing": "Va jeter un œil dans ta boîte de courrier indésirable (SPAM). Si tu as toujours rien reçu d'ici la veille de l'événement, écris à info@Igloofestgatineau.net et on renverra ton billet avec grand plaisir.",
        "purchase_trouble": "… une transaction non complétée est due à une erreur dans l'adresse de facturation saisie … Si malgré tout, tu as des problèmes, contacte info@Igloofestgatineau.net; a pending card charge 'disparaîtra d'elle-même après 5 ou 6 jours ouvrables'",
        "values": "L'inclusivité, le respect, la tolérance et la diversité sont des valeurs importantes pour Igloofest. Tolérance zéro pour l'homophobie, le racisme, le sexisme, la transphobie et la xénophobie."
      },
      "gatineau_transport": {
        "source": "s14",
        "readOn": "2026-10-24",
        "tolerance_zero": "L'équipe de Tolérance Zéro sera sur place pour vous raccompagner à la maison en toute sécurité. Les frais varient selon le trajet.",
        "parking": "Si tu décides de prendre ta voiture, plusieurs espaces de stationnement sont disponibles dans le Vieux-Hull. On t'invite à consulter le site de Dubé Stationnement pour prendre conscience de tes options et connaître les tarifs offerts.",
        "note": "neither 'exploités par' nor 'la voiture' is on the page; W12 f"
      },
      "quebec_faq": {
        "source": "s13b",
        "readOn": "2026-10-24",
        "mobility": "Oui. De plus, une zone leur sera réservée et des toilettes sont mises à la disposition de cette clientèle.",
        "food_drink": "Oui, des offres alimentaires seront offertes sur le site. Une sélection de breuvages, alcoolisés et non alcoolisés, sera disponible à des endroits identifiés à cet effet. Une pièce d'identité avec photo pourra être requise afin d'acheter de l'alcool. Aucun alcool ni nourriture provenant de l'extérieur du site ne sera toléré.",
        "merchandise": "Oui, des produits dérivés seront disponibles sur le site.",
        "lost_property": "Remplis ce formulaire dès que possible : 2026 IGF- Objets perdus (link on the FAQ; a 2026 form)",
        "helmets": "Casque de moto ou de vélo (à déposer au vestiaire à l'entrée)",
        "bags": "Aucun sac dont les dimensions excèdent 35 cm x 35 cm x 15,25 cm ne sera accepté sur le site. Une consigne est disponible à l'entrée.",
        "gang_clothing": "Vêtements à l'image de gang de rue",
        "cannabis_site": "Il est interdit de fumer ou de vapoter du cannabis sur le site de la Place Jean Béliveau",
        "toilets": "Oui, plusieurs toilettes sont disponibles sur le site.",
        "atm": "Non.",
        "reentry": "Aucune réadmission ne sera permise. Si vous sortez du site, il vous sera impossible d'entrer à nouveau.",
        "weather": "Les spectacles auront lieu beau temps mauvais temps. *Il est certain que si la situation météorologique est dangereuse ou hors de contrôle, nous devrons annuler… Visitez la page Facebook pour connaître l'état des activités.",
        "weather_facebook": "https://www.facebook.com/igloofestqc (the link on the FAQ; answers 200 but is an account-walled page: not read, not a fact source; linkable as the organiser's page only through the FAQ)",
        "contact": "T'as une question pour nous ? : info@gestev.com"
      },
      "quebec_2026_lineup": {
        "text": "neuf DJs de la programmation 2026, dont les têtes d'affiche Disclosure (DJ set), Zeds Dead et Chris Lake",
        "source": "s13c",
        "readOn": "2026-10-24",
        "note": "headliners, not the whole bill; W12 i"
      },
      "venue_2026_montreal": {
        "text": "2026 was at the Vieux-Port de Montréal: s5b (About, 2026 text): 'Cette année et pour une 18e édition, Igloofest déferle sur le Vieux-Port de Montréal'; s5: 'Est-ce qu'Igloofest Montréal aura lieu sur le même site que par le passé? Ouiiii!' (the 2026-season FAQ, undated). No page read names Quai Jacques-Cartier for 2026",
        "source": [
          "s5b",
          "s5"
        ],
        "readOn": "2026-10-24",
        "note": "'au même quai' is cut or becomes 'au Vieux-Port, comme en 2026' with s5b; (d)"
      },
      "prices_now": {
        "readAt": "2026-10-22T07:12Z (03:12 Montréal, EDT)",
        "igloofest_ca_passes_et_billets": "renders the banner « IGLOOFEST 2027 — Prévente le 22 octobre à 11h — Mise en vente des billets le 23 octobre à 11h00 — Inscris-toi à la prévente » and three cards: « Admission Générale · À partir de · 49,00 $ · Acheter », « Terrasse VIP · À partir de · 99,00 $ · Acheter », « Igloopasse · À partir de · 234,00 $ · Acheter ». Page data: price 49 / 99 / 234, pricePrefix « À partir de », priceSuffix null, salePrice null, soldOut false on all three. No « Complet ». No night price, no tier name, no tax line",
        "billets_igloofest_ca": "the three French buttons lead to one waiting-room/not-on-sale page (s24, JavaScript shop): « Vous êtes dans la salle d'attente … La mise en vente débutera le vendredi 23 octobre 2026 à 19 h 00 UTC+4 » (= 11 h Montréal), no product and no price on it. The FAQ's « notre billetterie » link now goes to https://billets.igloofest.ca/mul/#/55bc0823-8aab-4dfe-8650-7221e0f22fae/shop/custom-pack?fac=IGLOOFEST&locale=fr-CA&skin=igloofestmtl (a shop page named 'custom-pack'; JavaScript-only to curl; not opened); « compte Igloofest » → https://compte.igloofest.ca/. The host root still answers 'Redirecting…'",
        "verdict": "three displayed starting prices exist and are printed with s2 and this read date, each labelled « À partir de »; a per-night or per-tier price does not exist before the shop opens. The gate-2 verdict 'no Montréal night price exists to print' and the session's three rulings are superseded as the session says (3691). Tiers, if any, go to the ship-time re-read after 23 Oct 11 h Montréal (director's C4), not to this round"
      },
      "not_reached": [
        "stm.info — curl 000 (timeout) at 21:35 UTC 21 Oct; public body, linkable, no fact taken",
        "sto.ca — 503 at 21:35 UTC 21 Oct; same",
        "facebook.com/igloofestqc — 200 but account-walled; not read"
      ],
      "not_found_added": [
        "the festival's own gate wording or a count of entrances at the Quai Jacques-Cartier (only s15's 'entrée VIP sur la plate-forme ouest' and 'allée centrale' exit)",
        "Quai Jacques-Cartier named as the 2026 venue (only 'Vieux-Port de Montréal')",
        "any organiser page saying Edmonton 2026 was held",
        "a Gatineau page naming billets.igloofest.ca",
        "a weather policy for Montréal, Gatineau or Edmonton on the pages read (covers W12 k)",
        "the producer of the Gatineau and Edmonton editions",
        {
          "gap": "a per-night or per-tier Montréal price (none exists before the shop opens 23 Oct 11 h; only « À partir de » 49 / 99 / 234)",
          "value": "resolved by the per-night prices above (nights 9–11 excepted)",
          "source": "s25",
          "readOn": "2026-10-24"
        },
        {
          "gap": "taxes on the French cards (the English GA and VIP cards print '+tx'; no page says what tax or how much)",
          "value": "Advertised prices include service fees. Taxes are extra. (shop night page); no rate or amount",
          "source": "s25",
          "readOn": "2026-10-24"
        },
        "why the Igloopasse read « Complet » on 21 Oct and not on 22 Oct (the organiser says nothing; no news item between 21 Oct and this read: s16 lists two items dated 21 Oct 2026, both the programme post)",
        "a zone on igloofest.ca's sale times (the shop page supplies it; see sale_times)"
      ],
      "ticket_cards": {
        "cards": [
          {
            "key": "ag",
            "card": "Billets AG",
            "label": "Admission Générale",
            "displayed": "À partir de 49,00 $",
            "price": 49,
            "currency": "CAD",
            "pricePrefix": "À partir de",
            "priceSuffix": null,
            "salePrice": null,
            "soldOut": false,
            "button": "Acheter",
            "leads_to": "https://billets.igloofest.ca/mul/go/6070144b-f1a0-457e-a50c-af5a0d1ce2a4/waiting-room/not-on-sale?fac=IGLOOFEST&locale=fr-CA&skin=igloofestmtl",
            "perks": [
              "Accès au dancefloor le plus froid du monde",
              "Accès à l'Igloovillage et ses activités",
              "Accès à une sélection de bars et camions de rue"
            ],
            "source": "s2",
            "readOn": "2026-10-24",
            "expires": "2026-12-03"
          },
          {
            "key": "vip",
            "card": "Billets VIP",
            "label": "Terrasse VIP",
            "displayed": "À partir de 99,00 $",
            "price": 99,
            "currency": "CAD",
            "pricePrefix": "À partir de",
            "priceSuffix": null,
            "salePrice": null,
            "soldOut": false,
            "button": "Acheter",
            "leads_to": "the same waiting-room/not-on-sale address",
            "perks": [
              "Bénéfices du billet ADMISSION GENERALE",
              "Entrée rapide sur le site",
              "Terrasse chauffée avec vue imprenable sur la scène principale",
              "Toilettes exclusives chauffées",
              "Bars exclusifs",
              "Service optionnel de bouteilles, pour plus de détails contactez groupe@multicolore.ca"
            ],
            "source": "s2",
            "readOn": "2026-10-24",
            "expires": "2026-12-03"
          },
          {
            "key": "pass",
            "card": "Igloopasse",
            "label": "Igloopasse",
            "displayed": "À partir de 234,00 $",
            "price": 234,
            "currency": "CAD",
            "pricePrefix": "À partir de",
            "priceSuffix": null,
            "salePrice": null,
            "soldOut": false,
            "button": "Acheter",
            "leads_to": "the same waiting-room/not-on-sale address",
            "perks": [
              "Accès aux 12 soirées d'Igloofest Montréal (Admission générale)"
            ],
            "source": "s2",
            "readOn": "2026-10-24",
            "expires": "2026-12-03"
          }
        ],
        "rendered": "each card prints its card title, the perks, the label, « À partir de » on one line, the amount with « $ » on the next (« 49,00 $ », « 99,00 $ », « 234,00 $ »), then the button « Acheter ». No « Complet » anywhere on the page. No night, no tier name, no tax line, no age note and no 'nominative' note on the cards: the cards' details are the perks above and nothing else; age (18+) is s5's, 'individuelle et nominale' is the FAQ's on s2 (below)",
        "banner": "above the cards, unchanged: « IGLOOFEST 2027 — Prévente le 22 octobre à 11h — Mise en vente des billets le 23 octobre à 11h00 » with the button « Inscris-toi à la prévente » → https://contact.igloofest.ca/presale; the header button of the same name → https://contact.igloofest.ca/prevente2027. Lede: « Viens danser dans le festival le plus froid du monde. Les billets pour l'édition 2027 d'Igloofest Montréal seront en vente bientôt! »",
        "english": {
          "source": "s2en",
          "readOn": "2026-10-24",
          "cards": [
            "Tickets GA / General Admission — Starting at $49.00 +tx — Buy",
            "VIP Tickets / VIP Terrace — Starting at $99.00 +tx — Buy",
            "Igloopasse / Igloopass — From $234.00 — Buy"
          ],
          "data": "priceSuffix '+tx' on GA and VIP, null on the Igloopass; soldOut false on all three; the GA and VIP buttons go to https://billets.igloofest.ca/mul/go/6070144b-f1a0-457e-a50c-af5a0d1ce2a4?fac=IGLOOFEST&locale=en-CA&skin=igloofestmtl (no waiting-room segment), the Igloopass button to the waiting-room/not-on-sale address with locale=en-CA; banner 'Pre-sale on October 22 at 11:00 a.m. / Tickets go on sale on October 23 at 11:00 a.m.'",
          "note": "two differences from the French page: '+tx' on the GA and VIP cards, and the GA/VIP button targets. The French page prints no tax suffix on any card. A 'plus taxes' sentence for the 49 $ and 99 $ can rest only on s2en and must say so; the Igloopasse carries no tax note on either page (not_found stays)"
        }
      },
      "sale_times": {
        "times": [
          {
            "what": "Prévente",
            "text": "Prévente le 22 octobre à 11h",
            "where": "s2 banner",
            "on": "2026-10-22T11:00",
            "tz": "America/Toronto",
            "source": "s2",
            "readOn": "2026-10-22"
          },
          {
            "what": "Mise en vente",
            "text": "Mise en vente des billets le 23 octobre à 11h00",
            "where": "s2 banner",
            "on": "2026-10-23T11:00",
            "tz": "America/Toronto",
            "source": "s2",
            "readOn": "2026-10-22"
          },
          {
            "what": "Prévente infolettre & SMS",
            "text": "🎟️ Prévente infolettre & SMS : 22 octobre, 11 h",
            "where": "21 Oct 2026 post (s4), line under « 12 événements au sommet du FRETTE »",
            "source": "s4",
            "readOn": "2026-10-22"
          },
          {
            "what": "Vente générale",
            "text": "🎟️ Vente générale : 23 octobre, 11 h",
            "where": "s4, next line",
            "source": "s4",
            "readOn": "2026-10-22"
          },
          {
            "what": "English banner",
            "text": "Pre-sale on October 22 at 11:00 a.m. / Tickets go on sale on October 23 at 11:00 a.m.",
            "source": "s2en",
            "readOn": "2026-10-22"
          },
          {
            "what": "the shop's waiting room (the target of all three French « Acheter » buttons)",
            "text": "La mise en vente débutera le vendredi 23 octobre 2026 à 19 h 00 UTC+4.",
            "title": "Vous êtes dans la salle d'attente",
            "source": "s24",
            "readAt": "2026-10-22T07:15Z, pane",
            "note": "the shop renders the time in the reader's browser zone (+04 here): 19 h 00 UTC+4 = 15:00 UTC = 11 h 00 America/Toronto (EDT, UTC-4; Québec moves to EST on 1 Nov 2026, after both sale days). It is the one organiser-side statement that fixes the zone, and it names Friday 23 Oct, the general sale. The page also says « Une salle d'attente virtuelle sera ouverte peu avant le début des ventes. Cette page se rafraîchira automatiquement et vous serez redirigé et assigné à une position aléatoire dans la file d'attente. Merci de votre patience. » and a header « Quai Jacques-Cartier · Montréal, QC · 14 janv. - 6 févr. 2027 »; footer « Outbox Technology CRB Inc. - Eventshopper™ ». No product, price or tier on it"
          }
        ],
        "verdict": "both confirmed from the organiser: presale Thursday 22 Oct 2026, 11 h, for newsletter and SMS subscribers (s4's words « infolettre & SMS »); general sale Friday 23 Oct 2026, 11 h; zone America/Toronto, fixed by the shop's own page (s24) since igloofest.ca prints none. The fact-checker's two times stand. The sign-up forms contact.igloofest.ca/prevente2027 and /presale are forms, not sellers (no /go/ target, as ruled)",
        "status": "held; general sale open since 23 Oct 2026 11:00 America/Toronto: the shop lists the 12 nights with « Buy »",
        "banner_now": {
          "fr": "Mise en vente des billets le 23 octobre à 11h00",
          "en": "Tickets go on sale on October 23 at 11:00 a.m."
        },
        "source": [
          "s25",
          "s2",
          "s2en"
        ],
        "readOn": "2026-10-24"
      },
      "bottle_service": {
        "addresses": [
          {
            "address": "groupe@multicolore.ca",
            "where": "the « Billets VIP » card on s2, last perk: « Service optionnel de bouteilles, pour plus de détails contactez groupe@multicolore.ca »",
            "source": [
              "s2",
              "s2en"
            ],
            "readOn": "2026-10-24",
            "note": "the English card says the same with the same address"
          },
          {
            "address": "groupe@multicolore.ca",
            "address_22_oct": "groupe@igloofest.ca",
            "where": "the FAQ on the same page, « À quoi me donne accès mon billet VIP? »: « Pour toutes les demandes reliées au service de bouteilles : groupe@multicolore.ca »",
            "source": [
              "s2",
              "s2en"
            ],
            "readOn": "2026-10-24",
            "note": "the English FAQ says the same with the same address"
          }
        ],
        "note": "since 24 Oct 2026 one address, groupe@multicolore.ca (FR « Pour toutes les demandes reliées au service de bouteilles : groupe@multicolore.ca »; EN the same); one address now, card and FAQ agree (s2, s2en); on 22 Oct the FAQ gave groupe@igloofest.ca (addresses.1.address_22_oct) and the French copy printed each where it sat; multicolore.ca is the producer's domain (`event.organiser`)"
      },
      "prices_nights": {
        "seller": "Billetterie Igloofest (billets.igloofest.ca, Eventshopper), English shop",
        "currency": "CAD",
        "source": "s25",
        "readOn": "2026-10-24",
        "expires": "2026-12-05",
        "terms": {
          "text": "Advertised prices include service fees. Taxes are extra. Max 6 tickets per transaction. Price subject to change without notice. No exchange / no refund.",
          "source": "s25",
          "readOn": "2026-10-24"
        },
        "tiers": {
          "text": "the shop's general-admission levels are named Early Bird, Regular, Last Chance and Day of show; a night showing a range had two levels on sale at once",
          "source": "s25",
          "readOn": "2026-10-24"
        },
        "areas": [
          "General Admission",
          "VIP - Sapporo",
          "VIP - Multicolore",
          "VIP - Intelcom",
          "VIP - Poppers",
          "VIP - Casino de Montréal",
          "NYX Cosmetics Baddie Zone - Side Stage East",
          "NYX Cosmetics Baddie Zone - Side Stage West"
        ],
        "ranges": {
          "ga": "49.00–89.00",
          "vip": "91.75–166.75",
          "baddie": "149.00–237.00",
          "note": "lowest and highest figure the shop showed across the twelve nights (nine at the morning read of 24 Oct 2026, all twelve at the evening re-read the same day; the figures did not move); vip = the five VIP areas, baddie = the two NYX areas; computed by script from nights[]",
          "source": "s25",
          "readOn": "2026-10-24"
        },
        "unpriced": {
          "dates": [],
          "note": "none at the evening re-read of 24 Oct 2026 (the session, English shop in Chrome, all twelve night pages); at the morning read 30 Jan, 4 Feb and 5 Feb showed no price list at repeated reads (two, two and one) while the list page said Buy",
          "source": "s25",
          "readOn": "2026-10-24"
        },
        "nights": [
          {
            "key": "2027-01-14",
            "ga": "89.00",
            "sapporo": "166.75",
            "multicolore": "135.00–145.00",
            "intelcom": "135.00–145.00",
            "poppers": "125.25–134.50",
            "casino": "125.25–134.50",
            "nyx_east": "207.00–237.00",
            "nyx_west": "207.00–237.00",
            "lowest": {
              "ga": "89.00",
              "vip": "125.25",
              "baddie": "207.00"
            }
          },
          {
            "key": "2027-01-15",
            "ga": "59.00–69.00",
            "sapporo": "143.75",
            "multicolore": "125.00",
            "intelcom": "109.00–125.00",
            "poppers": "101.00–116.00",
            "casino": "91.75–116.00",
            "nyx_east": "159.00–169.00",
            "nyx_west": "159.00–169.00",
            "lowest": {
              "ga": "59.00",
              "vip": "91.75",
              "baddie": "159.00"
            }
          },
          {
            "key": "2027-01-16",
            "ga": "59.00–69.00",
            "sapporo": "125.50–143.75",
            "multicolore": "99.00–125.00",
            "intelcom": "109.00–125.00",
            "poppers": "91.75–116.00",
            "casino": "91.75–116.00",
            "nyx_east": "159.00–169.00",
            "nyx_west": "159.00–169.00",
            "lowest": {
              "ga": "59.00",
              "vip": "91.75",
              "baddie": "159.00"
            }
          },
          {
            "key": "2027-01-21",
            "ga": "59.00–69.00",
            "sapporo": "143.75",
            "multicolore": "99.00–125.00",
            "intelcom": "99.00–125.00",
            "poppers": "101.00–116.00",
            "casino": "116.00",
            "nyx_east": "159.00–169.00",
            "nyx_west": "159.00–169.00",
            "lowest": {
              "ga": "59.00",
              "vip": "99.00",
              "baddie": "159.00"
            },
            "note": "VIP - Multicolore and VIP - Intelcom read SOLD OUT at the morning read of 24 Oct 2026 and 99.00–125.00 each at the evening re-read; the other six areas unchanged"
          },
          {
            "key": "2027-01-22",
            "ga": "69.00",
            "sapporo": "143.75",
            "multicolore": "125.00",
            "intelcom": "109.00–125.00",
            "poppers": "101.00–116.00",
            "casino": "101.00–116.00",
            "nyx_east": "169.00",
            "nyx_west": "169.00",
            "lowest": {
              "ga": "69.00",
              "vip": "101.00",
              "baddie": "169.00"
            }
          },
          {
            "key": "2027-01-23",
            "ga": "69.00",
            "sapporo": "143.75",
            "multicolore": "125.00",
            "intelcom": "125.00",
            "poppers": "101.00–116.00",
            "casino": "101.00–116.00",
            "nyx_east": "159.00",
            "nyx_west": "149.00–159.00",
            "lowest": {
              "ga": "69.00",
              "vip": "101.00",
              "baddie": "149.00"
            }
          },
          {
            "key": "2027-01-28",
            "ga": "59.00–69.00",
            "sapporo": "143.75",
            "multicolore": "99.00–125.00",
            "intelcom": "99.00–125.00",
            "poppers": "91.75–116.00",
            "casino": "91.75–116.00",
            "nyx_east": "149.00–159.00",
            "nyx_west": "149.00–159.00",
            "lowest": {
              "ga": "59.00",
              "vip": "91.75",
              "baddie": "149.00"
            }
          },
          {
            "key": "2027-01-29",
            "ga": "49.00–69.00",
            "sapporo": "125.50–143.75",
            "multicolore": "99.00–125.00",
            "intelcom": "125.00",
            "poppers": "91.75–116.00",
            "casino": "91.75–116.00",
            "nyx_east": "159.00–169.00",
            "nyx_west": "159.00–169.00",
            "lowest": {
              "ga": "49.00",
              "vip": "91.75",
              "baddie": "159.00"
            }
          },
          {
            "key": "2027-01-30",
            "ga": "79.00",
            "sapporo": "125.50–143.75",
            "multicolore": "125.00",
            "intelcom": "125.00",
            "poppers": "116.00",
            "casino": "116.00",
            "nyx_east": "237.00",
            "nyx_west": "237.00",
            "lowest": {
              "ga": "79.00",
              "vip": "116.00",
              "baddie": "237.00"
            },
            "note": "priced at the evening re-read of 24 Oct 2026; at the morning read no price list on the night's page (two reads); the list page said Buy"
          },
          {
            "key": "2027-02-04",
            "ga": "49.00–69.00",
            "sapporo": "125.50–143.75",
            "multicolore": "99.00–125.00",
            "intelcom": "99.00–125.00",
            "poppers": "91.75–116.00",
            "casino": "91.75–116.00",
            "nyx_east": "149.00–159.00",
            "nyx_west": "149.00–159.00",
            "lowest": {
              "ga": "49.00",
              "vip": "91.75",
              "baddie": "149.00"
            },
            "note": "priced at the evening re-read of 24 Oct 2026; at the morning read no price list (two reads)"
          },
          {
            "key": "2027-02-05",
            "ga": "79.00–89.00",
            "sapporo": "166.75",
            "multicolore": "145.00",
            "intelcom": "145.00",
            "poppers": "125.25–134.50",
            "casino": "125.25–134.50",
            "nyx_east": "237.00",
            "nyx_west": "207.00–237.00",
            "lowest": {
              "ga": "79.00",
              "vip": "125.25",
              "baddie": "207.00"
            },
            "note": "priced at the evening re-read of 24 Oct 2026; at the morning read no price list (one read)"
          },
          {
            "key": "2027-02-06",
            "ga": "69.00",
            "sapporo": "143.75",
            "multicolore": "125.00",
            "intelcom": "109.00–125.00",
            "poppers": "101.00–116.00",
            "casino": "101.00–116.00",
            "nyx_east": "159.00–169.00",
            "nyx_west": "159.00–169.00",
            "lowest": {
              "ga": "69.00",
              "vip": "101.00",
              "baddie": "159.00"
            }
          }
        ]
      },
      "hours_montreal": {
        "text": "Thursdays 7:30pm–11pm; Fridays and Saturdays 7:30pm–12:30am",
        "source": "s5en",
        "readOn": "2026-10-24"
      },
      "not_found_hours": {
        "set_end": {
          "text": "no end time for any set: the twelve nights' pages give each act's start time only (latest start Subtronics, 23:15, Sat 6 Feb 2027)",
          "source": [
            "s1",
            "s1en"
          ],
          "readOn": "2026-10-24"
        },
        "fr_faq": {
          "text": "the French FAQ gives no hours: « Du jeudi au samedi, à travers 4 week-ends durant l'hiver Montréalais. L'édition 2027 à Montréal va se tenir du 14 janvier au 6 février 2027. », where the English FAQ gives 'Join us from 7:30pm to 11pm on Thursdays, and from 7:30pm to 12:30am on Fridays and Saturdays.'",
          "source": [
            "s5",
            "s5en"
          ],
          "readOn": "2026-10-24"
        }
      },
      "entry": [
        {
          "who": "British citizens (full passport)",
          "text": "passport valid for the length of the stay; most people need a visa or an eTA, not both; no visa for short visits (normally up to 6 months), an eTA instead; no eTA when arriving by land or sea; border officers may ask for a return or onward ticket and proof of funds; unauthorised websites charge for applications",
          "note": "GOV.UK's advice is for people travelling on a full British citizen passport; it does not make that passport a condition of entry (W8). Content API public_updated_at 2026-06-02 on 24 Oct",
          "source": "s26",
          "readOn": "2026-10-24"
        },
        {
          "who": "eTA",
          "text": "costs CAN$7; applied for online with a valid passport, a credit or debit card and an email address; needed with a valid passport to board a flight to Canada for citizens of eTA-required countries (British citizens are on that list); not needed arriving by car, bus, train or boat",
          "quote_fee": "It only costs CAN$7.",
          "source": [
            "s27",
            "s28"
          ],
          "readOn": "2026-10-24"
        },
        {
          "who": "American citizens",
          "text": "It's recommended that you always travel with a valid passport as it's the only reliable and universally accepted travel and ID document. If you don't have a valid passport and aren't travelling by air, you can also present identity documents that show your full name, date of birth, citizenship.",
          "source": "s28",
          "readOn": "2026-10-24"
        },
        {
          "who": "US lawful permanent residents",
          "text": "by air: a valid passport from your country of nationality (or an equivalent acceptable travel document) and a valid permanent resident (green) card (or equivalent valid proof of status in the US); by land or water directly from the US: the green card or equivalent proof of status only, 'You don't need to provide your passport.'",
          "source": "s28",
          "readOn": "2026-10-24"
        },
        {
          "who": "US State Department",
          "text": "pointer only: no link, no claim (section 0, 'Entry and passports')",
          "checked": "travel.state.gov answered 403 to curl on 24 Oct 2026, 04:2x UTC, as in round 1",
          "source": null,
          "readOn": "2026-10-24"
        },
        {
          "who": "US citizens and US permanent residents: no eTA",
          "text": "U.S. citizens are exempt from the eTA requirement and must carry proper identification such as a valid U.S. passport.",
          "text_lpr": "Lawful permanent residents of the United States who hold valid status in the U.S. are exempt from the eTA requirement.",
          "source": "s29",
          "corroboration": {
            "text": "You don't need a visa or an eTA to travel to Canada if you are one of the following: a US national or permanent resident",
            "source": "s28"
          },
          "note": "s27 itself does not say it; s29 is the page s27 links for who can apply",
          "readOn": "2026-10-24"
        }
      ],
      "dress_code": {
        "en": {
          "question": "Is there a dress code?",
          "answer": "No. Gender-specific dress codes can create barriers for transgender people and those with diverse gender identities by preventing them from dressing in a way that aligns with their lived gender identity. This could constitute discrimination under the Human Rights Act. Our event does not have a gender-specific dress code.",
          "kit_header": "Here is the perfect kit for warriors of the cold:",
          "kit": [
            "Very warm windproof winter coat",
            "Snow pants",
            "Beanie",
            "Mittens (they're warmer than gloves!)",
            "Boots (no shoes, please, boots!)",
            "Warm socks (+ a second pair just in case)",
            "Scarf, neck warmer, or balaclava to cover your beautiful face",
            "Foot warmers and hand warmers"
          ],
          "bring_clothing": "Clothing adapted to the temperature (hat, gloves and boots necessary for an incredible evening)",
          "note": "the question, the answer and the kit are one accordion item of the English Rules and FAQ; the bring-list line is the separate 'What should I bring on site?' answer",
          "source": "s5en",
          "readOn": "2026-10-24"
        },
        "fr": {
          "question": "Y a-t-il un code vestimentaire?",
          "answer": "Non. Les codes vestimentaires sexospécifiques sont susceptibles de poser des obstacles pour les personnes trans et aux identités sexuelles variées en les empêchant de s'habiller d'une façon qui correspond à leur identité sexuelle vécue. Il pourrait s'agir de discrimination aux termes de la charte des droits de la personne. Notre événement n'a pas de code vestimentaire sexospécifique.",
          "kit_header": "Pour rester bien au chaud quand l'hiver attaque, voici nos recos:",
          "kit": [
            "Manteau d'hiver coupe vent très chaud",
            "Pantalon de neige",
            "Tuque",
            "Mitaines (c'est plus chaud que les gants!)",
            "Bottes (pas des souliers svp, des bottes!)",
            "Bas chauds (+ une 2e paire au cas où)",
            "Foulard, cache-cou ou cagoule pour couvrir votre beau visage",
            "Des réchauffe-pieds et réchauffe-mains"
          ],
          "source": "s5",
          "readOn": "2026-10-24"
        }
      },
      "gatineau_ottawa": {
        "tagline": {
          "text": "Gatineau-Ottawa, cold through and through.",
          "fr": "Gatineau-Ottawa, Frette de bord en bord",
          "where": "home page, under the dates",
          "source": [
            "s9en",
            "s9"
          ],
          "readOn": "2026-10-24"
        },
        "parliament_view": {
          "text": "Since 2025, the party also hits Gatineau, at the Place des Festivals Zibi, as part of Winderlude. … we're about to drop the sickest beats while enjoying a view of the Parliament.",
          "fr": "… on va faire vibrer la place, tout en ayant une vue sur le Parlement du Canada.",
          "note": "'Winderlude' is the page's spelling; the French says Parliament of Canada",
          "source": [
            "s11en",
            "s11"
          ],
          "readOn": "2026-10-24"
        },
        "recap": {
          "text": "Three nights, three unique vibes and one shared energy: bringing Gatineau and Ottawa together to celebrate winter through music.",
          "source": "s10ben",
          "readOn": "2026-10-24"
        },
        "winterlude_en": {
          "text": "The world's coldest music festival is unleashing its vibe in Gatineau at the Place des Festivals Zibi in February 2027 as part of the iconic Winterlude.",
          "where": "meta description of gatineau.igloofest.ca/en",
          "source": "s9en",
          "readOn": "2026-10-24",
          "note": "the English name of Bal de neige (W10 optional, en-GB 8)"
        },
        "not_found": "no organiser, venue or public-body page read gives the site's distance from Ottawa, a bridge or 'across the river'; STO (s20) not read"
      },
      "edmonton_tickets": {
        "text": "Igloopasses and tickets via Ticketmaster only; Igloopass = all three evenings, general-admission privileges, not shareable, ID checked; sales final (refund on postponement or cancellation); online only; Ticketmaster takes major cards, PayPal, Venmo, Apple Pay, Google Pay, gift cards; no price, no age, no transport stated",
        "source": "s23c",
        "readOn": "2026-10-24"
      },
      "montreal_en_only": [
        {
          "text": "accessibility FAQ: no reserved section, accessible toilets, free entry for a companion via customer service",
          "source": "s5en",
          "readOn": "2026-10-24"
        },
        {
          "text": "'Small recording devices allowed only (less than 8 inches).' in the banned list",
          "source": "s5en",
          "readOn": "2026-10-24"
        },
        {
          "text": "EN transport page names 'Carpool Kangaride'; EN FAQ and FR pages name AmigoExpress: print neither or the FAQ's",
          "source": [
            "s3en",
            "s5en"
          ],
          "readOn": "2026-10-24"
        }
      ],
      "gatineau_harm_reduction": {
        "text": "Euphorie team on site at all times (FR « Les intervenant·e·s du groupe Euphorie »)",
        "source": [
          "s14b",
          "s14ben"
        ],
        "readOn": "2026-10-24"
      },
      "lineup_casing_en": {
        "note": "EN week-end pages print: 'Lou Phelps' (no DJ set), 'Prïa b2b Zac Martel b2b NAB', 'Mystery guest' (singular, 21 and 29 Jan), 'Frost Children (DJ set)', 'MGNA CRRRTA (DJ SET)', 'Isla Den (DJ set)', 'Tony Romera'; stage names 'SAPPORO STAGE', 'VIDEOTRON STAGE'; times as '10:00PM'. The shop's night 1 page prints 'Lou Phelps (DJ Set)'. The EN guide follows the FR pages' casing (lineup.casing) unless the session rules otherwise",
        "source": "s1en",
        "readOn": "2026-10-24"
      }
    },
    // Twenty hops, each to the page its source names (plan 5.4; the session's
    // carry, SEO c): « billets » goes to the organiser's « Passes et billets »
    // page, not to the shop, whose only address an organiser page linked on
    // 22 October was a waiting room (s24), and whose French cards still lead
    // to one (sellers[0].urls_linked_today, 24 October); no sign-up form is a
    // target. The three maps hops are name searches by the words the labels
    // use (gate 3, D6); their titles promise Google Maps, not a pin, with the
    // native reader's « sur Google Maps » (gate 3, swap 1). Titles are the
    // native reader's (gate 3, D2), none equal to a label linking to it.
    //
    // The English guide (card 2026-10-24-igloofest-en, its hop table) links
    // seventeen hops of its own, each titled in English, after the twenty,
    // and eight of the twenty, which carry `titles.en` (copy.ts reads the
    // title in the guide's own language, GoTarget.titleLang). Its `shop`
    // is the organiser's ticket shop in English, the target of the English
    // General Admission and VIP buttons on s2en. The English maps titles
    // say what the click opens, a Google Maps search for the place's
    // name (the en-GB reader on the executor's strings, 24 October).
    go: {
      site: {
        url: "https://igloofest.ca/fr",
        source: "s5b",
        kind: "organiser",
        title: "igloofest.ca, le site d'Igloofest Montréal",
      },
      billets: {
        url: "https://igloofest.ca/fr/passes-et-billets",
        source: "s2",
        kind: "organiser",
        title: "La page « Passes et billets » d'igloofest.ca",
      },
      quebec: {
        url: "https://quebec.igloofest.ca/fr",
        source: "s6",
        kind: "organiser",
        title: "quebec.igloofest.ca, le site d'Igloofest Québec",
      },
      gatineau: {
        url: "https://gatineau.igloofest.ca/fr",
        source: "s9",
        kind: "organiser",
        title: "gatineau.igloofest.ca, le site d'Igloofest Gatineau",
      },
      edmonton: {
        url: "https://edmonton.igloofest.ca/fr",
        source: "s12",
        kind: "organiser",
        title: "edmonton.igloofest.ca, le site d'Igloofest Edmonton",
      },
      ticketmaster: {
        url: "https://www.ticketmaster.ca/fan-park-at-ice-district-tickets-edmonton/venue/140831",
        source: "s22",
        kind: "seller",
        title: "La page du Fan Park at ICE District sur ticketmaster.ca",
      },
      accessibilite: {
        url: "https://igloofest.ca/fr/infos-festivaliers/accessibilite",
        source: "s15",
        kind: "organiser",
        title: "La page « Accessibilité » d'igloofest.ca",
      },
      programmation: {
        url: "https://igloofest.ca/fr/festival",
        source: "s1",
        kind: "organiser",
        title: "La programmation 2027 d'Igloofest Montréal sur igloofest.ca",
      },
      transport: {
        url: "https://igloofest.ca/fr/infos-festivaliers/lieu-et-transport",
        source: "s3",
        kind: "organiser",
        title: "La page « Lieu et transport » d'igloofest.ca",
      },
      reglements: {
        url: "https://igloofest.ca/fr/infos-festivaliers/reglements-et-faq",
        source: "s5",
        kind: "organiser",
        title: "La page « Règlements et FAQ » d'igloofest.ca",
      },
      "quebec-faq": {
        url: "https://quebec.igloofest.ca/fr/infos-festivaliers/reglements-et-faq",
        source: "s13b",
        kind: "organiser",
        title: "La page « Règlements et FAQ » de quebec.igloofest.ca",
        titles: { en: "The Règlements et FAQ page on quebec.igloofest.ca, in French" },
      },
      "quebec-transport": {
        url: "https://quebec.igloofest.ca/fr/infos-festivaliers/lieu-et-transport",
        source: "s13",
        kind: "organiser",
        title: "La page « Lieu et transport » de quebec.igloofest.ca",
        titles: { en: "The Lieu et transport page on quebec.igloofest.ca, in French" },
      },
      "gatineau-faq": {
        url: "https://gatineau.igloofest.ca/fr/infos-festivaliers/reglements-et-faq",
        source: "s14b",
        kind: "organiser",
        title: "La page « Règlements et FAQ » de gatineau.igloofest.ca",
      },
      "gatineau-transport": {
        url: "https://gatineau.igloofest.ca/fr/infos-festivaliers/lieu-et-transport",
        source: "s14",
        kind: "organiser",
        title: "La page « Lieu et transport » de gatineau.igloofest.ca",
      },
      stm: {
        url: "https://www.stm.info/fr",
        source: "s18",
        kind: "public-body",
        title: "stm.info, la Société de transport de Montréal",
        titles: { en: "stm.info, the Société de transport de Montréal, in French" },
      },
      rtc: {
        url: "https://www.rtcquebec.ca/",
        source: "s19",
        kind: "public-body",
        title: "rtcquebec.ca, le Réseau de transport de la Capitale",
        titles: { en: "rtcquebec.ca, the Réseau de transport de la Capitale" },
      },
      sto: {
        url: "https://www.sto.ca/",
        source: "s20",
        kind: "public-body",
        title: "sto.ca, la Société de transport de l'Outaouais",
        titles: { en: "sto.ca, the Société de transport de l'Outaouais" },
      },
      "maps-montreal": {
        url: "https://www.google.com/maps/search/?api=1&query=Quai%20Jacques-Cartier%2C%20Montr%C3%A9al",
        source: "venues.v1",
        kind: "maps",
        title: "Le Quai Jacques-Cartier sur Google Maps",
        titles: { en: "A Google Maps search for the Quai Jacques-Cartier, Montreal" },
      },
      "maps-quebec": {
        url: "https://www.google.com/maps/search/?api=1&query=Place%20Jean-B%C3%A9liveau%2C%20Qu%C3%A9bec",
        source: "venues.v2",
        kind: "maps",
        title: "La Place Jean-Béliveau sur Google Maps",
        titles: { en: "A Google Maps search for the Place Jean-Béliveau, Quebec City" },
      },
      "maps-gatineau": {
        url: "https://www.google.com/maps/search/?api=1&query=Place%20des%20Festivals%20Zibi%2C%20Gatineau",
        source: "venues.v3",
        kind: "maps",
        title: "La Place des Festivals Zibi sur Google Maps",
        titles: { en: "A Google Maps search for the Place des Festivals Zibi, Gatineau" },
      },
      shop: {
        url: "https://billets.igloofest.ca/mul/go/6070144b-f1a0-457e-a50c-af5a0d1ce2a4?fac=IGLOOFEST&locale=en-CA&skin=igloofestmtl",
        source: "s25",
        kind: "seller",
        title: "billets.igloofest.ca, the organiser's ticket shop, in English",
      },
      "tickets-en": {
        url: "https://igloofest.ca/en/passes-and-tickets",
        source: "s2en",
        kind: "organiser",
        title: "The Passes and tickets page on igloofest.ca",
      },
      "rules-en": {
        url: "https://igloofest.ca/en/infos-festivaliers/rules-and-faq",
        source: "s5en",
        kind: "organiser",
        title: "The Rules and FAQ page on igloofest.ca",
      },
      "lineup-en": {
        url: "https://igloofest.ca/en/festival",
        source: "s1en",
        kind: "organiser",
        title: "The Montreal 2027 line-up on igloofest.ca",
      },
      "transport-en": {
        url: "https://igloofest.ca/en/infos-festivaliers/location-and-transportation",
        source: "s3en",
        kind: "organiser",
        title: "The Location and transportation page on igloofest.ca",
      },
      "accessibility-en": {
        url: "https://igloofest.ca/en/infos-festivaliers/accessibility",
        source: "s15en",
        kind: "organiser",
        title: "The Accessibility page on igloofest.ca",
      },
      "quebec-en": {
        url: "https://quebec.igloofest.ca/en",
        source: "s6en",
        kind: "organiser",
        title: "quebec.igloofest.ca, the Igloofest Quebec site, in English",
      },
      "gatineau-en": {
        url: "https://gatineau.igloofest.ca/en",
        source: "s9en",
        kind: "organiser",
        title: "gatineau.igloofest.ca, the Igloofest Gatineau site, in English",
      },
      "gatineau-faq-en": {
        url: "https://gatineau.igloofest.ca/en/infos-festivaliers/rules-and-faq",
        source: "s14ben",
        kind: "organiser",
        title: "The Rules and FAQ page on gatineau.igloofest.ca",
      },
      "gatineau-transport-en": {
        url: "https://gatineau.igloofest.ca/en/infos-festivaliers/location-and-transportation",
        source: "s14en",
        kind: "organiser",
        title: "The Location and transportation page on gatineau.igloofest.ca",
      },
      "gatineau-about-en": {
        url: "https://gatineau.igloofest.ca/en/about-us",
        source: "s11en",
        kind: "organiser",
        title: "The About us page on gatineau.igloofest.ca",
      },
      "edmonton-en": {
        url: "https://edmonton.igloofest.ca/en",
        source: "s23",
        kind: "organiser",
        title: "edmonton.igloofest.ca, the Igloofest Edmonton site, in English",
      },
      "edmonton-tickets": {
        url: "https://edmonton.igloofest.ca/en/passes-and-tickets",
        source: "s23c",
        kind: "organiser",
        title: "The Passes & Tickets page on edmonton.igloofest.ca",
      },
      "gov-uk": {
        url: "https://www.gov.uk/foreign-travel-advice/canada/entry-requirements",
        source: "s26",
        kind: "public-body",
        title: "GOV.UK travel advice for Canada: entry requirements",
      },
      eta: {
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html",
        source: "s27",
        kind: "public-body",
        title: "The Government of Canada's page on the Electronic Travel Authorization (eTA)",
      },
      "eta-facts": {
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/facts.html",
        source: "s29",
        kind: "public-body",
        title: "The Government of Canada's eTA facts page, with who is exempt",
      },
      "canada-entry": {
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/entry-requirements-country.html",
        source: "s28",
        kind: "public-body",
        title: "The Government of Canada's page on what you need to enter Canada",
      },
    },
  },
];

// The Quebec City and Gatineau pages' MusicEvents, one value each that both
// guides' pages hold, so the address and the organizer cannot drift apart
// (card 2026-10-24-igloofest-en, 5.3, items 5 and 18). typographed() in
// copy.ts hands `markup` back by reference, so the French and English
// pages share the object itself, and frozen() makes a write to it throw
// (CTO gate 3, 7). Each page's MusicEvent takes its name and description
// from that page's own h1 and meta description (rules.ts). These lines
// sit outside every record, so tests/record-dates.test.js does not see
// an edit to them: move the updatedAt of both guides' page records with it.
function frozen<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const v of Object.values(value)) frozen(v);
    Object.freeze(value);
  }
  return value;
}

// Igloofest Québec 2027 (editions[Québec 2027]): from 19 h on the
// first night, America/Toronto, to the last night's date; Place
// Jean-Béliveau with the organiser's address (venues.v2, s13);
// produced by Gestev and Multicolore (event.organiser). Its name and
// description are the page's h1 and meta description (rules.ts; SEO
// gate 3, condition 4).
export const QUEBEC_MARKUP: GuidePage["markup"] = frozen({
  "startDate": "2027-03-04T19:00",
  "endDate": "2027-03-06",
  "timeZone": "America/Toronto",
  "venue": "venues.v2",
  "address": {
    "streetAddress": "250, boulevard Wilfrid-Hamel",
    "addressLocality": "Québec",
    "addressRegion": "QC",
    "postalCode": "G1L 5A7",
    "addressCountry": "CA"
  },
  "organizer": [
    {
      "name": "Gestev"
    },
    {
      "name": "Multicolore",
      "url": "https://igloofest.ca/fr"
    }
  ]
});

// Igloofest Gatineau 2027 (editions[Gatineau 2027]): 19 h to 23 h,
// America/Toronto; Place des Festivals Zibi (venues.v3, s14). No
// postalCode: the organiser prints only « J8X », and a partial code is
// a wrong one. No organizer: no source names the producer of the
// Gatineau edition (not_found_added.5).
export const GATINEAU_MARKUP: GuidePage["markup"] = frozen({
  "startDate": "2027-02-11T19:00",
  "endDate": "2027-02-13T23:00",
  "timeZone": "America/Toronto",
  "venue": "venues.v3",
  "address": {
    "streetAddress": "60, rue Jos-Montferrand",
    "addressLocality": "Gatineau",
    "addressRegion": "QC",
    "addressCountry": "CA"
  }
});

export const guides: Guide[] = [
  {
    slug: "fr-CA",
    createdAt: "2026-10-22T22:00:00+04:00",
    updatedAt: "2026-10-24T12:20:00+04:00",
    event: "igloofest",
    name: "Igloofest 2027",
    lang: "fr-CA",
    dir: "ltr",
    path: "/igloofest/",
    cover: "/covers/igloofest.jpg",
    hubLabel: "Français (Canada)",
    // The hub card's place (the fest director's note 3 on the front-page
    // card, 23 Oct 2026), from this guide's own copy.
    hubPlace: "Montréal, Gatineau, Québec, Edmonton",
    hubBlurb: "Igloofest 2027 : Montréal du 14 janvier au 6 février, Gatineau du 11 au 13 février, Québec du 4 au 6 mars, Edmonton du 11 au 13 mars. Dates, billets, programmation, métro et quoi porter, vérifiés sur les sites de l'organisateur, avec la date de consultation. [editions.0] [editions[Gatineau 2027]] [editions[Québec 2027]] [editions.3]",
    // Six weeks after the oldest reading inside the spans. That was the
    // seller row (sellers[0], read 21 October), which two of them cite
    // beside the three « À partir de » prices of 22 October, and it said
    // 2 December. Since the English twin's readings of 24 October the
    // oldest are the general admission and VIP cards (prices[AG],
    // prices[VIP], read 22 October), which allow 3 December. The day stays
    // 2 December, the English guide's too, so both drop their prices
    // together (test:fest, "a span expires no later than 42 days…").
    expires: { prices: "2026-12-02" },
    navLabel: "Pages du guide Igloofest",
    faqLabel: "Questions fréquentes sur Igloofest",
    updatedLine: true,
    pages: [
      {
        slug: "igloofest",
        createdAt: "2026-10-22T22:00:00+04:00",
        updatedAt: "2026-10-24T16:30:00+04:00",
        kind: "main",
        label: "Igloofest 2027",
        crumb: "Igloofest 2027",
        navTitle: "Dates, billets et villes d'Igloofest 2027",
        title: "Igloofest 2027 : dates, billets, villes — guide du festival",
        description: "Igloofest 2027, festival électro : Montréal 14 janv.–6 févr., Gatineau 11–13 févr., Québec 4–6 mars, Edmonton 11–13 mars. Billets, programmation, métro.",
        h1: "Igloofest 2027",
        lede: "Igloofest 2027 se tient dehors, en plein hiver, du jeudi 14 janvier au samedi 13 mars 2027, dans quatre villes : Montréal, Gatineau, Québec et Edmonton. [editions.0] [editions[Gatineau 2027]] [editions[Québec 2027]] [editions.3] L'organisateur le présente comme « le festival de musique le plus froid au monde » sur ses sites d'Edmonton, de Gatineau et de Québec, et écrit sur celui de Montréal que « chaque hiver, Igloofest rassemble des milliers d'amateurs de musique électronique venus danser à la belle étoile au Vieux-Port de Montréal » ; le festival existe depuis 2007. [event.tagline_claim] [event.kind_sentence] [event.since]",
        sections: [
          {
            id: "saison-2027",
            heading: "La saison 2027, ville par ville",
            body: "- Montréal : du jeudi 14 janvier au samedi 6 février 2027, quatre fins de semaine du jeudi au samedi, douze soirées, Quai Jacques-Cartier, Vieux-Port de Montréal. [editions.0] [editions.0.note] [venues[v1]] → /igloofest/montreal/\n- Gatineau : du jeudi 11 au samedi 13 février 2027, de 19 h à 23 h, Place des Festivals Zibi. [editions[Gatineau 2027]] [venues.v3] → /igloofest/gatineau/\n- Québec : du jeudi 4 au samedi 6 mars 2027, à compter de 19 h, Place Jean-Béliveau, à ExpoCité. [editions[Québec 2027]] [venues.v2] → /igloofest/quebec/\n- Edmonton : du jeudi 11 au samedi 13 mars 2027, Fan Park, ICE District ; voir plus bas. [editions.3] [venues[v4]]",
          },
          {
            id: "billets",
            heading: "Billets : où en est chaque ville",
            body: "- Montréal : l'organisateur a annoncé la prévente par infolettre et SMS pour le jeudi 22 octobre 2026 à 11 h (heure de l'Est) et la vente générale pour le vendredi 23 octobre 2026 à 11 h, sur sa billetterie. [sale_times] [sales.0] [sales.1] [sources.s4] [sources.s24] [sellers[0]] Le 24 octobre 2026, cette billetterie proposait les douze soirées à l'unité{{until prices}}, de 49,00 $ à 89,00 $ en admission générale selon la soirée, frais de service compris, taxes en sus{{/until}}. [sale_times.status] [prices_nights.ranges] [prices_nights.terms] [sources.s25] L'Igloopasse des douze soirées est épuisée pour 2027, selon la billetterie et la FAQ de l'organisateur. [sales[Montréal Igloopasse].soldOut] [sources.s2]\n- Gatineau : aucune vente ouverte au 22 octobre 2026 ; l'inscription à la prévente se fait sur le site de Gatineau. [sales.3] [sources.s9]\n- Québec : aucune vente ouverte ; la FAQ de l'organisateur dit « Les billets seront bientôt disponibles » (consultée le 22 octobre 2026). [sellers[1].note]\n- Edmonton : le site de l'organisateur renvoie à la page Ticketmaster du Fan Park, qui n'affichait aucune date d'Igloofest le 22 octobre 2026. [sellers[2]]\n\nLes prix, ce que comprennent l'admission générale et le billet VIP, les cartes acceptées et les remboursements sont sur la page des billets. → /igloofest/billets/\n\nL'organisateur a quatre sites, un par ville, et vend ses billets sur une billetterie à part ; ce guide les met ensemble et date chaque information.\n\nLes quatre dates viennent des pages d'accueil et de programmation de chaque site de l'organisateur, consultées le 22 octobre 2026. Ce jour-là, la FAQ et la page « À propos » du site de Montréal montraient encore les dates de 2026. Le 24 octobre 2026, la FAQ donnait celles de 2027, et la page « À propos » encore celles de 2026. [editions.0.source] [stale_or_contradictory.5]",
          },
          {
            id: "montreal",
            heading: "Montréal : le quai, les deux scènes, 18 ans et plus",
            body: "Le site de Montréal est le Quai Jacques-Cartier, dans le Vieux-Port ; l'organisateur nomme le quai, pas un numéro civique. [venues[v1]] [venues[v1].note] Il y a deux scènes, la Scène Sapporo et la Scène Vidéotron, et un Igloovillage ; le premier set est à 19 h 30 chaque soir. [venues.v1.note] [editions.0.note] L'entrée est réservée aux 18 ans et plus, avec une pièce d'identité avec photo. [age.0] [age.0.note] Les stations Place-d'Armes et Champ-de-Mars, sur la ligne orange, sont à quelques minutes à pied selon l'organisateur ; les derniers métros, les autobus et les stationnements sont sur la page de Montréal. [transport[Montréal, métro]] → /igloofest/montreal/ Ce qu'il faut porter pour une soirée dehors en janvier, selon la FAQ de l'organisateur, est sur la page S'habiller. → /igloofest/habillement/",
          },
          {
            id: "programmation",
            heading: "Programmation",
            body: "L'organisateur a publié la programmation complète de Montréal le mercredi 21 octobre 2026, avec les heures de set des douze soirées ; une première soirée, celle du samedi 23 janvier, avait été annoncée le lundi 21 septembre 2026. [lineup.announcedOn] [lineup.firstActsOn] [sources.s4] [sources.s4b] Chaque soirée commence à 19 h 30 sur la Scène Sapporo, et la Scène Vidéotron joue certains soirs. [editions.0.note] [lineup.nights] Deux soirées affichent des « Mystery guests », le jeudi 21 et le vendredi 29 janvier. [lineup.note] Pour Gatineau et Québec, aucune programmation n'est annoncée au 22 octobre 2026 ; Edmonton affiche « MYSTERY GUEST » les trois soirs. [editions[Gatineau 2027].note] [editions[Québec 2027].note] [editions[Edmonton 2027].note] Les douze soirées, scène par scène et heure par heure, sont sur la page de la programmation. → /igloofest/programmation/",
          },
          {
            id: "edmonton",
            heading: "Edmonton : le Fan Park, ICE District",
            body: "Igloofest Edmonton 2027 se tient du jeudi 11 au samedi 13 mars 2027 au Fan Park, dans l'ICE District, à Edmonton, en Alberta ; l'organisateur ne numérote pas cette édition. [editions.3] [editions[Edmonton 2027].note] [venues[v4]] Une édition 2026 avait été annoncée pour les 12, 13 et 14 mars 2026 par la page « À propos » du site de Montréal ; le communiqué d'Igloofest Québec du 12 novembre 2025 dit seulement qu'Edmonton « se joint à la famille cette année ». [editions[Edmonton 2026]] [editions[Edmonton 2026].dates_from] [editions[Edmonton 2026].s7_gives] L'adresse du Fan Park, 10128 - 104 Avenue NW, Edmonton, AB T5J 4Y8, est celle de la page Ticketmaster de la salle, consultée le 22 octobre 2026 ; les pages de l'organisateur n'indiquent que le nom du parc et celui du quartier. [venues[v4].address] [venues[v4].note] Le programme affiche « MYSTERY GUEST » les trois soirs. [editions[Edmonton 2027].note] Pour les billets, le [site d'Igloofest Edmonton](/go/igloofest-edmonton/) renvoie à la [page Ticketmaster du Fan Park at ICE District](/go/igloofest-ticketmaster/), qui, consultée le 22 octobre 2026, n'affichait aucune date d'Igloofest. [sellers[2]] Le site en français de l'organisateur n'indique ni âge minimum, ni prix, ni moyen de transport pour Edmonton au 22 octobre 2026. [age.3] [transport.5] [not_found.5]",
          },
          {
            id: "editions-passees",
            heading: "Éditions passées",
            body: "En 2026, Montréal a tenu sa 18e édition du jeudi 15 janvier au samedi 7 février, sur quatre fins de semaine, au Vieux-Port. [editions.4] [editions.4.note] [venue_2026_montreal] Gatineau a accueilli le festival en 2025 et en 2026, et Québec tient en 2027 sa 5e édition ; leurs éditions passées, avec les têtes d'affiche que l'organisateur nomme, sont sur leurs pages. [editions[Gatineau 2025].note] [editions[Gatineau 2026]] [editions[Québec 2027].note] → /igloofest/gatineau/ · → /igloofest/quebec/ Le festival existe depuis 2007. [event.since]",
          },
        ],
        faqHeading: "Questions fréquentes",
        faq: [
          {
            q: "Quelle est la date de l'Igloofest à Montréal?",
            a: "Du jeudi 14 janvier au samedi 6 février 2027, les jeudis, vendredis et samedis de quatre fins de semaine : 14 au 16 janvier, 21 au 23 janvier, 28 au 30 janvier et 4 au 6 février, au Quai Jacques-Cartier du Vieux-Port, premier set à 19 h 30. [editions.0] [editions.0.note] [venues[v1]] Source : la programmation 2027 sur igloofest.ca, consultée le 22 octobre 2026. [sources.s1]",
          },
          {
            q: "Quand commence Igloofest?",
            a: "La saison 2027 ouvre à Montréal le jeudi 14 janvier 2027, avec un premier set à 19 h 30 ; Gatineau suit le 11 février, Québec le 4 mars et Edmonton le 11 mars. [editions.0] [editions.0.note] [editions[Gatineau 2027]] [editions[Québec 2027]] [editions.3] Source : les pages de programmation et d'accueil de l'organisateur, consultées le 22 octobre 2026. [sources.s1] [sources.s9] [sources.s6] [sources.s12]",
          },
          {
            q: "Quand est Igloofest?",
            a: "En hiver ; en 2027, de la mi-janvier à la mi-mars : Montréal du 14 janvier au 6 février, Gatineau du 11 au 13 février, Québec du 4 au 6 mars, Edmonton du 11 au 13 mars. [editions.0] [editions[Gatineau 2027]] [editions[Québec 2027]] [editions.3] À Montréal, c'est du jeudi au samedi ; à Gatineau, de 19 h à 23 h ; à Québec, à compter de 19 h. [editions.0.note] [editions[Gatineau 2027].note] [editions[Québec 2027].note] Source : les quatre sites de l'organisateur, consultés le 22 octobre 2026.",
          },
          {
            q: "Où se déroule Igloofest?",
            a: "À Montréal, au Quai Jacques-Cartier, dans le Vieux-Port ; à Québec, à la Place Jean-Béliveau, 250, boulevard Wilfrid-Hamel, à ExpoCité ; à Gatineau, à la Place des Festivals Zibi, 60, rue Jos-Montferrand ; à Edmonton, au Fan Park de l'ICE District. [venues[v1]] [venues.v2] [venues.v3] [venues[v4]] Source : les pages « Lieu et transport » de l'organisateur et la page Ticketmaster de la salle d'Edmonton, consultées le 22 octobre 2026. [sources.s3] [sources.s13] [sources.s14] [sources.s22]",
          },
          {
            q: "Quel est le festival le plus froid du monde?",
            a: "L'organisateur d'Igloofest présente son festival comme « le festival de musique le plus froid au monde » ; c'est sa formule, sur ses sites d'Edmonton, de Gatineau et de Québec. [event.tagline_claim] Ce qu'on peut dire : le festival se tient dehors, de la mi-janvier à la mi-mars, à Montréal, Gatineau, Québec et Edmonton. [editions.0] [editions[Gatineau 2027]] [editions[Québec 2027]] [editions.3] Source : les sites de l'organisateur pour Edmonton, Gatineau et Québec, consultés le 21 octobre 2026. [sources.s12] [sources.s11] [sources.s13c]",
          },
          {
            q: "C'est 18 ans et plus?",
            a: "À Montréal, oui : 18 ans et plus, pièce d'identité avec photo exigée. [age.0] [age.0.note] À Québec, 16 ans et plus. [age[Québec]] À Gatineau, la FAQ de l'organisateur dit que « l'événement est habituellement 18+, cependant à Gatineau c'est différent! » : les enfants de 12 ans et moins entrent gratuitement avec un parent qui a un billet, et à partir de 13 ans les enfants ont besoin d'un billet, d'une pièce d'identité et d'un parent, un enfant par adulte. [age[Gatineau]] [age[Gatineau].quote] Source : les FAQ de l'organisateur pour Montréal et Québec, consultées le 22 octobre 2026, et pour Gatineau, consultée le 21 octobre 2026. [sources.s5] [sources.s13b] [sources.s14b]",
          },
        ],
        sourcesHeading: "Sources",
        sources: "Les sites de l'organisateur : igloofest.ca (programmation 2027, passes et billets, lieu et transport, règlements et FAQ, à propos, annonces du 21 septembre et du 21 octobre 2026), quebec.igloofest.ca (accueil, FAQ, L'expérience), gatineau.igloofest.ca (accueil, FAQ, à propos), edmonton.igloofest.ca (accueil et programmation), consultés les 21 et 22 octobre 2026 ; la page Ticketmaster Canada du Fan Park at ICE District, consultée le 22 octobre 2026. [sources] La version anglaise de la billetterie de l'organisateur, billets.igloofest.ca, et la page « Passes et billets » d'igloofest.ca ont été consultées de nouveau le 24 octobre 2026. [sources.s25] [sources.s2]",
        links: "Liens : [Igloofest Montréal](/go/igloofest-site/) · [« Passes et billets », igloofest.ca](/go/igloofest-billets/) · [Igloofest Québec](/go/igloofest-quebec/) · [Igloofest Gatineau](/go/igloofest-gatineau/) · [Igloofest Edmonton](/go/igloofest-edmonton/)",
        foot: "fest.one est indépendant d'Igloofest, de Multicolore, de Courage, de Gestev, de Ticketmaster et des sociétés de transport.",
        anchors: [
          {
            "target": "/igloofest/montreal/",
            "text": "la page de Montréal"
          },
          {
            "target": "/igloofest/montreal/",
            "text": "Montréal",
            "nth": 1
          },
          {
            "target": "/igloofest/gatineau/",
            "text": "Gatineau"
          },
          {
            "target": "/igloofest/quebec/",
            "text": "Québec"
          },
          {
            "target": "/igloofest/billets/",
            "text": "la page des billets"
          },
          {
            "target": "/igloofest/habillement/",
            "text": "la page S'habiller"
          },
          {
            "target": "/igloofest/programmation/",
            "text": "la page de la programmation"
          }
        ],
      },
      {
        slug: "igloofest/billets",
        createdAt: "2026-10-22T22:00:00+04:00",
        updatedAt: "2026-10-24T16:30:00+04:00",
        kind: "tickets",
        label: "Billets",
        crumb: "Billets",
        navTitle: "Billets et prix d'Igloofest 2027",
        title: "Billets Igloofest 2027 : prix et vente — guide du festival",
        description: "Billets du festival Igloofest 2027 : la billetterie acceptée, prévente et vente générale de Montréal, Igloopasse, Gatineau, Québec, Edmonton, remboursements.",
        h1: "Billets Igloofest 2027",
        lede: "{{until prices}}Sur la page « Passes et billets » d'igloofest.ca, consultée le 22 octobre 2026, trois billets sont affichés pour Igloofest Montréal 2027, chacun « À partir de » : l'admission générale à 49,00 $, la terrasse VIP à 99,00 $ et l'Igloopasse, les douze soirées du jeudi 14 janvier au samedi 6 février en admission générale, à 234,00 $. [ticket_cards] [prices[AG]] [prices[VIP]] [prices[Igloopasse]] [editions.0] Chaque bouton « Acheter » mène à la salle d'attente de la billetterie de l'organisateur, billets.igloofest.ca, et aucun des trois billets n'était affiché complet ce jour-là. [ticket_cards] [sales[Montréal Igloopasse]] [sellers[0]] La page française ne dit rien des taxes ; sa version anglaise ajoute « +tx » à l'admission générale et à la terrasse VIP, pas à l'Igloopasse. [ticket_cards.english] [prices[Igloopasse].note]{{/until}} Le 24 octobre 2026, la billetterie et la FAQ de la page « Passes et billets » indiquaient que l'Igloopasse était épuisée pour 2027. [sales[Montréal Igloopasse].soldOut] [sales[Montréal Igloopasse].note]\n\nL'organisateur a annoncé la prévente par infolettre et SMS pour le jeudi 22 octobre 2026 à 11 h (heure de l'Est) et la vente générale pour le vendredi 23 octobre 2026 à 11 h ; la salle d'attente de sa billetterie donnait la même heure pour le 23 octobre. [sale_times] [sales.0] [sales.1] [sources.s4] [sources.s24] Le 24 octobre 2026, la billetterie proposait les douze soirées à l'unité. [sale_times.status] [sources.s25] {{until prices}}« À partir de » est son prix de départ : « Les billets sont vendus par paliers progressifs pour nous permettre d'offrir des billets aux meilleurs prix à nos early birds. » [pricing_model] Ce jour-là, dans sa version anglaise, la billetterie affichait un prix par zone pour chacune des douze soirées, frais de service compris, taxes en sus : de 49,00 $ à 89,00 $ en admission générale et de 91,75 $ à 166,75 $ dans les zones VIP. [prices_nights.ranges] [prices_nights.terms] [prices_nights.unpriced]{{/until}}",
        ledeParas: 2,
        sections: [
          {
            id: "billetterie",
            heading: "Une seule billetterie, en ligne",
            body: "Pour Montréal, l'organisateur est clair : « Les SEULS billets acceptés doivent être achetés sur la billetterie d'Igloofest. » [sellers[0].note] Sa page [« Passes et billets »](/go/igloofest-billets/) mène à cette billetterie, billets.igloofest.ca, qui vend en ligne seulement ; il n'y a pas de vente à la porte. [sellers[0]] [sellers[0].go_target] [sellers[0].terms] Elle prend Visa et Mastercard, pas les cartes prépayées ni Visa Débit. [sellers[0].terms] Les ventes sont finales : un remboursement n'est prévu qu'en cas de report ou d'annulation. [sellers[0].terms] Pour Gatineau, la FAQ de ce site dit la même chose dans ses mots, sans nommer de site : « Seuls les billets achetés via la billetterie officielle d'Igloofest seront acceptés » et « Les billets sont en vente uniquement en ligne, via notre billetterie officielle. » [gatineau_seller]",
          },
          {
            id: "montreal",
            heading: "Montréal : billet à la soirée, Igloopasse, VIP",
            body: "Le billet d'admission générale donne accès, pour la soirée choisie, à la Scène Sapporo et à la Scène Vidéotron, à l'Igloovillage et à une sélection de bars. [tickets_detail.0] Le billet VIP ajoute l'entrée rapide, une terrasse exclusive, des toilettes chauffées, une vue sur la scène principale et un espace intérieur chauffé. Pour le service de bouteilles, la fiche du billet VIP et la FAQ de la page « Passes et billets » donnent la même adresse, groupe@multicolore.ca, au 24 octobre 2026. [bottle_service] [tickets_detail.1] [tickets_detail.1b] Les billets de Montréal sont réservés aux 18 ans et plus, pièce d'identité avec photo exigée, et l'Igloopasse est nominative. [age.0] [sales[Montréal Igloopasse].note] La FAQ de la page « Passes et billets », consultée le 24 octobre 2026, dit que « Les Igloopasses pour la saison 2027 sont épuisées » et que les passes étaient réservées aux abonnés de l'infolettre. La billetterie indique aussi que l'Igloopasse est épuisée. [sales[Montréal Igloopasse].note] [sales[Montréal Igloopasse].soldOut] {{until prices}}La fiche de l'Igloopasse sur la page « Passes et billets » affiche encore « À partir de 234,00 $ ». [prices[Igloopasse]] [ticket_cards]{{/until}} Une personne à mobilité réduite échange son billet d'admission générale contre un accès VIP au service à la clientèle, à l'entrée ; la personne qui l'accompagne entre gratuitement. [tickets_detail.2] [sources.s15]",
          },
          {
            id: "gatineau-quebec",
            heading: "Gatineau et Québec : rien en vente au 22 octobre 2026",
            body: "Le site de Gatineau n'avait ouvert aucune vente au 22 octobre 2026 ; l'inscription à la prévente est sur [son accueil](/go/igloofest-gatineau/), et sa FAQ décrit une Igloopasse de trois soirs, en admission générale, qui ne se partage pas. [sales.3] [tickets_detail.3] [gatineau_faq.igloopasse] La FAQ d'Igloofest Québec, consultée le 22 octobre 2026, dit « Les billets seront bientôt disponibles » ; les deux dernières mises en vente sont passées par [quebec.igloofest.ca](/go/igloofest-quebec/). [sellers[1].note] {{until prices}}Pour l'édition 2026 de Québec, le communiqué du 12 novembre 2025 annonçait des billets à la journée « à partir de 39 $ + taxes », vendus sur quebec.igloofest.ca, avec une prévente le jeudi 13 novembre 2025 à 11 h et une vente générale le vendredi 14 novembre 2025 à 11 h ; c'est le prix de 2026, consulté le 22 octobre 2026, et rien n'est annoncé pour 2027. [prices.1] [prices.1.note] [editions.6.note]{{/until}} Les règles d'âge, le billet VIP et la réadmission de chaque ville sont sur sa page. → /igloofest/gatineau/ · → /igloofest/quebec/",
          },
          {
            id: "edmonton",
            heading: "Edmonton : la page Ticketmaster de la salle",
            body: "Le site d'Igloofest Edmonton envoie vers la [page Ticketmaster Canada du Fan Park at ICE District](/go/igloofest-ticketmaster/), qui, consultée le 22 octobre 2026, n'affichait aucune date d'Igloofest. [sellers[2]]",
          },
          {
            id: "sur-place",
            heading: "Sur place",
            body: "À Montréal et à Gatineau, l'organisateur n'accepte sur le site que les paiements par carte de crédit et de débit ; à Québec, sa FAQ répond seulement qu'il n'y a pas de guichet automatique. [payment_on_site.0] [payment_on_site.1] [payment_on_site.2] Ce qu'on peut apporter, la taille des sacs et les règlements sont sur la page S'habiller. → /igloofest/habillement/",
          },
        ],
        faqHeading: "Questions fréquentes",
        faq: [
          {
            q: "Quel est le prix d'un billet pour l'Igloofest?",
            a: "{{until prices}}Pour Montréal 2027, la billetterie de l'organisateur, billets.igloofest.ca, consultée le 24 octobre 2026 dans sa version anglaise, vend les billets à la soirée : de 49,00 $ à 89,00 $ en admission générale et de 91,75 $ à 166,75 $ dans les zones VIP, selon la soirée et le palier, frais de service compris, taxes en sus. [prices_nights.ranges] [prices_nights.terms] [sellers[0]] [prices_nights.unpriced] L'organisateur vend « par paliers progressifs ». [pricing_model] Les fiches de sa page « Passes et billets » affichent toujours « À partir de 49,00 $ » et « À partir de 99,00 $ », et l'Igloopasse est épuisée pour 2027. [ticket_cards] [sales[Montréal Igloopasse].soldOut] Pour Québec, le prix connu est celui de 2026 : « à partir de 39 $ + taxes » sur quebec.igloofest.ca, selon le communiqué du 12 novembre 2025. [prices.1] Source : la billetterie de l'organisateur et la page « Passes et billets » d'igloofest.ca, consultées le 24 octobre 2026, et le communiqué d'Igloofest Québec du 12 novembre 2025, consulté le 22 octobre 2026. [sources.s25] [sources.s2] [sources.s2en] [sources.s7]{{/until}}",
          },
          {
            q: "Quand commence la vente des billets pour Igloofest 2027?",
            a: "À Montréal, l'organisateur a annoncé une prévente par infolettre et SMS le jeudi 22 octobre 2026 à 11 h (heure de l'Est), puis la vente générale le vendredi 23 octobre 2026 à 11 h, sur sa billetterie, dont la salle d'attente donnait la même heure pour le 23 octobre. [sale_times] [sales.0] [sales.1] [sources.s4] [sources.s24] Le 24 octobre 2026, la billetterie proposait les douze soirées à l'unité, et l'Igloopasse était épuisée. [sale_times.status] [sales[Montréal Igloopasse].soldOut] À Gatineau, aucune vente n'était ouverte au 22 octobre 2026 ; l'inscription à la prévente se fait sur le site de Gatineau. [sales.3] À Québec, la FAQ dit « Les billets seront bientôt disponibles » ; les deux dernières mises en vente ont eu lieu en novembre. [sellers[1].note] [editions.6.note] [editions[Québec 2025].note] À Edmonton, la page Ticketmaster du Fan Park n'affichait aucune date d'Igloofest le 22 octobre 2026. [sellers[2]] Source : l'annonce du 21 octobre 2026 et la page « Passes et billets » de l'organisateur, la salle d'attente de sa billetterie, l'accueil de gatineau.igloofest.ca, la FAQ de quebec.igloofest.ca et la page Ticketmaster du Fan Park, consultés le 22 octobre 2026, et la billetterie, consultée le 24 octobre 2026. [sources.s4] [sources.s2] [sources.s24] [sources.s9] [sources.s13b] [sources.s22] [sources.s25]",
          },
          {
            q: "Est-ce qu'Igloofest est gratuit?",
            a: "Non : chaque soirée se paie, à Montréal, à Québec et à Gatineau, sur la billetterie de l'organisateur ou son site de Québec. [sellers[0]] [sellers.1] Deux exceptions : à Gatineau, les enfants de 12 ans et moins entrent gratuitement avec un parent qui a un billet ; à Montréal, la personne qui accompagne un festivalier à mobilité réduite entre gratuitement. [age[Gatineau]] [tickets_detail.2] Source : la FAQ d'Igloofest Gatineau, consultée le 21 octobre 2026, et la page sur l'accessibilité d'igloofest.ca, consultée le 22 octobre 2026. [sources.s14b] [sources.s15]",
          },
          {
            q: "Est-ce que je peux me faire rembourser?",
            a: "Selon la page « Passes et billets » de l'organisateur, les ventes sont finales ; un remboursement n'est prévu qu'en cas de report ou d'annulation de la soirée. [sellers[0].terms] Les billets de Montréal sont réservés aux 18 ans et plus et l'Igloopasse est nominative, à savoir avant d'acheter pour quelqu'un d'autre. [sales[Montréal Igloopasse].note] Source : la page « Passes et billets » et la FAQ de l'organisateur, consultées le 22 octobre 2026. [sources.s2] [sources.s5]",
          },
          {
            q: "Est-ce qu'il y a des billets disponibles à la porte?",
            a: "Non. La billetterie de l'organisateur vend en ligne seulement, et « les SEULS billets acceptés doivent être achetés sur la billetterie d'Igloofest ». [sellers[0].terms] [sellers[0].note] Sur place, à Montréal, les paiements se font par carte de crédit ou de débit, pour les bars et le reste. [payment_on_site.0] Source : la page « Passes et billets » de l'organisateur, consultée le 22 octobre 2026, et sa FAQ, consultée le 21 octobre 2026. [sources.s2] [sources.s5]",
          },
          {
            q: "Qu'est-ce que l'Igloopasse et combien coûte-t-elle?",
            a: "L'Igloopasse donne les douze soirées de Montréal en admission générale ; elle est individuelle et nominative, et une pièce d'identité avec photo est demandée à l'entrée. [prices[Igloopasse]] [sales[Montréal Igloopasse].note] Pour 2027, elle est épuisée, selon la billetterie de l'organisateur et la FAQ de la page « Passes et billets » d'igloofest.ca : « Les Igloopasses pour la saison 2027 sont épuisées. » La FAQ ajoute qu'elles étaient réservées aux abonnés de l'infolettre. [sales[Montréal Igloopasse].soldOut] [sales[Montréal Igloopasse].note] {{until prices}}Sa fiche sur la même page affiche encore « À partir de 234,00 $ », sans mention de taxes en français ni en anglais. [prices[Igloopasse]] [prices[Igloopasse].note] [ticket_cards]{{/until}} Source : la page « Passes et billets » d'igloofest.ca, en français et en anglais, et la version anglaise de la billetterie de l'organisateur, consultées le 24 octobre 2026. [sources.s25] [sources.s2] [sources.s2en]",
          },
        ],
        sourcesHeading: "Sources",
        sources: "La page « Passes et billets » d'igloofest.ca, en français et en anglais, sa FAQ et la salle d'attente de sa billetterie (billets.igloofest.ca), la FAQ et la page sur l'accessibilité d'igloofest.ca, la FAQ de quebec.igloofest.ca et son communiqué du 12 novembre 2025, la FAQ et l'accueil de gatineau.igloofest.ca, l'accueil d'edmonton.igloofest.ca et la page Ticketmaster Canada du Fan Park at ICE District, consultés les 21 et 22 octobre 2026. [sources.s2] [sources.s2en] [sources.s24] [sources.s5] [sources.s15] [sources.s13b] [sources.s7] [sources.s14b] [sources.s9] [sources.s12] [sources.s22] La version anglaise de la billetterie de l'organisateur et la page « Passes et billets » d'igloofest.ca ont été consultées de nouveau le 24 octobre 2026. [sources.s25] [sources.s2]",
        links: "Liens : [« Passes et billets », igloofest.ca](/go/igloofest-billets/) · [« Accessibilité », igloofest.ca](/go/igloofest-accessibilite/) · [Igloofest Gatineau](/go/igloofest-gatineau/) · [Igloofest Québec](/go/igloofest-quebec/) · [la page Ticketmaster du Fan Park at ICE District](/go/igloofest-ticketmaster/)",
        foot: "fest.one est indépendant d'Igloofest, de Multicolore, de Courage, de Gestev, de Ticketmaster et des sociétés de transport.",
        anchors: [
          {
            "target": "/igloofest/gatineau/",
            "visible": true
          },
          {
            "target": "/igloofest/quebec/",
            "visible": true
          },
          {
            "target": "/igloofest/habillement/",
            "text": "la page S'habiller"
          }
        ],
      },
      {
        slug: "igloofest/programmation",
        createdAt: "2026-10-22T22:00:00+04:00",
        updatedAt: "2026-10-24T12:20:00+04:00",
        kind: "lineup",
        label: "Programmation",
        crumb: "Programmation",
        navTitle: "Programmation d'Igloofest Montréal 2027 par soirée",
        title: "Programmation Igloofest 2027 par soirée — guide du festival",
        description: "Programmation du festival Igloofest 2027 à Montréal : 12 soirées du 14 janvier au 6 février, deux scènes, heures des sets, lineup par fin de semaine.",
        h1: "Programmation Igloofest 2027",
        lede: "La programmation complète d'Igloofest Montréal 2027 a été publiée le mercredi 21 octobre 2026 : douze soirées du jeudi 14 janvier au samedi 6 février, au Quai Jacques-Cartier, sur deux scènes, la Scène Sapporo et la Scène Vidéotron, avec les heures de chaque set. [lineup.announcedOn] [lineup.note] [editions.0] [venues.v1.note] Les premiers artistes, ceux de la soirée du samedi 23 janvier, avaient été annoncés le lundi 21 septembre 2026. [lineup.firstActsOn] [sources.s4b] Le premier set est à 19 h 30 chaque soir ; le plus tardif de Montréal 2027, Subtronics, commence à 23 h 15 le samedi 6 février. [editions.0.note] [lineup.nights.11.sapporo] Gatineau, Québec et Edmonton n'ont pas de programmation annoncée au 22 octobre 2026; voir plus bas. [editions[Gatineau 2027].note] [editions[Québec 2027].note] [editions[Edmonton 2027].note]",
        sections: [
          {
            id: "lire-la-programmation",
            heading: "Comment lire la programmation",
            body: "Chaque soirée est présentée ci-dessous dans l'ordre des heures de set, de la première à la dernière, telles que l'organisateur les affiche. [lineup.note] La Scène Sapporo affiche des sets tous les soirs ; la Scène Vidéotron, certains soirs seulement, et l'organisateur affiche au-dessus de plusieurs de ses soirées un nom, Ferias, AMPER, Pep Rally, Sun & Earth, KNTC ou Hauterageous, repris ici tel quel. [lineup.nights.0.videotron_label] [lineup.nights.1.videotron_label] [lineup.nights.4.videotron_label] [lineup.nights.8.videotron_label] [lineup.nights.10.videotron_label] [lineup.nights.11.videotron_label] Les noms d'artistes sont écrits comme l'organisateur les écrit sur ses pages de programmation, majuscules et signes compris. [lineup.casing] Les heures sont celles de Montréal, et ce sont des heures de début. L'organisateur n'indique pas d'heure de fin de set. [not_found_hours.set_end] Selon sa FAQ en anglais, consultée le 24 octobre 2026, les soirées vont de 19 h 30 à 23 h le jeudi, et de 19 h 30 à 0 h 30 le vendredi et le samedi. [hours_montreal] Deux soirées, le jeudi 21 janvier et le vendredi 29 janvier, affichent des « Mystery guests », non nommés au 22 octobre 2026. [lineup.note] L'organisateur nomme ses pages « Week-End 1 » à « Week-End 4 » ; les billets s'achètent à la soirée. → /igloofest/billets/",
          },
          {
            id: "fin-de-semaine-1",
            heading: "Fin de semaine 1 : jeudi 14, vendredi 15 et samedi 16 janvier 2027",
            body: "- Jeudi 14 janvier 2027 — Scène Sapporo : Taima 19 h 30 · Lou Phelps (DJ set) 20 h 30 · KAYTRANADA 22 h. Scène Vidéotron (Ferias) : silktits 19 h 30 · Make A Dance 20 h 45. [lineup.nights.0]\n- Vendredi 15 janvier 2027 — Scène Sapporo : The Holy 19 h 30 · Tini Gessler 21 h 30 · James Hype 23 h. Scène Vidéotron (AMPER) : Prïa B2B Zac Martel B2B NAB 19 h 30. [lineup.nights.1]\n- Samedi 16 janvier 2027 — Scène Sapporo : Anna Wilder 19 h 30 · SAPIAN 21 h · Chris Lorenzo 22 h 30. Scène Vidéotron : No Police 19 h 30 · Xia 20 h 30 · SALOME 21 h 30. [lineup.nights.2]\n\nLe jeudi 14 janvier, le dernier set de la soirée, KAYTRANADA, commence à 22 h ; le vendredi 15, James Hype commence à 23 h ; le samedi 16 janvier, le dernier set de la soirée, Chris Lorenzo, commence à 22 h 30. [lineup.nights.0] [lineup.nights.1] [lineup.nights.2] La Scène Vidéotron joue les trois soirs. [lineup.nights.0] [lineup.nights.1] [lineup.nights.2]",
            kind: "nights",
          },
          {
            id: "fin-de-semaine-2",
            heading: "Fin de semaine 2 : jeudi 21, vendredi 22 et samedi 23 janvier 2027",
            body: "- Jeudi 21 janvier 2027 — Scène Sapporo : Lia Plutonic 19 h 30 · Mystery guests 20 h 30 · Fatboy Slim 21 h 30. [lineup.nights.3]\n- Vendredi 22 janvier 2027 — Scène Sapporo : syd woz 19 h 30 · Elvis Guetta 20 h 30 · Robbie Doherty 21 h 30 · KETTAMA 23 h. Scène Vidéotron (Pep Rally) : Chippy Nonstop b2b Nino Brown b2b Young Teesh 19 h 30. [lineup.nights.4]\n- Samedi 23 janvier 2027 — Scène Sapporo : Isla Den (DJ SET) 19 h 30 · MGNA Crrrta (DJ SET) 21 h · Frost Children (DJ SET) 22 h · Ninajirachi 23 h. Scène Vidéotron : Beamskii 19 h 30 · swedm® (Varg²™ + jamesjamesjames) 20 h 30 · Mowie B2B the bald girl 22 h. [lineup.nights.5]\n\nLe jeudi 21 janvier n'affiche de sets que sur la Scène Sapporo, et son dernier set de la soirée, Fatboy Slim, commence à 21 h 30. [lineup.nights.3] Le samedi 23 janvier, la soirée annoncée la première, le 21 septembre 2026, a pour dernier set affiché Ninajirachi, à partir de 23 h, comme KETTAMA le vendredi 22. [lineup.nights.5] [lineup.firstActsOn]",
            kind: "nights",
          },
          {
            id: "fin-de-semaine-3",
            heading: "Fin de semaine 3 : jeudi 28, vendredi 29 et samedi 30 janvier 2027",
            body: "- Jeudi 28 janvier 2027 — Scène Sapporo : V!A 19 h 30 · TONY ROMERA 20 h 30 · Mosimann 21 h 30. [lineup.nights.6]\n- Vendredi 29 janvier 2027 — Scène Sapporo : Mystery guests 19 h 30. Scène Vidéotron : DUZA 19 h 30 · Moti (CR) 20 h 30 · Chris Luno 21 h 30. [lineup.nights.7]\n- Samedi 30 janvier 2027 — Scène Sapporo : Claireyy 19 h 30 · TDJ 21 h · deadmau5 22 h 30. Scène Vidéotron (Sun & Earth) : Hicky & Kalo 19 h 30 · Rodriguez Jr. (DJ Set) 21 h. [lineup.nights.8]\n\nLe vendredi 29 janvier, la Scène Sapporo n'affiche que « Mystery guests », dès 19 h 30, et les trois sets nommés de la soirée sont sur la Scène Vidéotron ; le samedi 30 janvier, le dernier set de la soirée, deadmau5, commence à 22 h 30. [lineup.nights.7] [lineup.nights.8]",
            kind: "nights",
          },
          {
            id: "fin-de-semaine-4",
            heading: "Fin de semaine 4 : jeudi 4, vendredi 5 et samedi 6 février 2027",
            body: "- Jeudi 4 février 2027 — Scène Sapporo : Field Note 19 h 30 · Marie Davidson (DJ Set) 20 h · Fcukers (DJs) 21 h 30. [lineup.nights.9]\n- Vendredi 5 février 2027 — Scène Sapporo : Kolophane 19 h 30 · DREYA V 21 h 30 · Boris Brejcha 23 h. Scène Vidéotron (KNTC) : Dimitry b2b Lara Bee 19 h 30 · tINI 21 h. [lineup.nights.10]\n- Samedi 6 février 2027 — Scène Sapporo : NAË 19 h 30 · Taiki Nulight 21 h 30 · Subtronics 23 h 15. Scène Vidéotron (Hauterageous) : HŸDRA 19 h 30 · Siren Mars 20 h 45 · Miss Bashful 22 h 15. [lineup.nights.11]\n\nLa dernière fin de semaine se termine le samedi 6 février avec le set le plus tardif de Montréal 2027, Subtronics, à partir de 23 h 15 sur la Scène Sapporo ; sur la Scène Vidéotron, le dernier set affiché, Miss Bashful, commence à 22 h 15. [lineup.nights.11] Selon la FAQ en anglais de l'organisateur, consultée le 24 octobre 2026, la soirée du samedi finit à 0 h 30. [hours_montreal] Les derniers métros sont sur la page de Montréal. → /igloofest/montreal/",
            kind: "nights",
          },
          {
            id: "autres-villes",
            heading: "Gatineau, Québec, Edmonton : rien d'annoncé au 22 octobre 2026",
            body: "Le site de Gatineau affiche « Annonce de programmation à venir » pour les soirées du 11 au 13 février 2027. [editions[Gatineau 2027].note] [sources.s9] Celui de Québec ne nomme aucun artiste pour les soirées du 4 au 6 mars 2027. [editions[Québec 2027].note] [sources.s6] Celui d'Edmonton affiche « MYSTERY GUEST » pour chacun des trois soirs du 11 au 13 mars 2027. [editions[Edmonton 2027].note] [sources.s12] Les annonces des éditions précédentes sont datées : Gatineau 2026, Steve Aoki, Kaskade et BUNT. « en tête d'affiche », avec Swimming Paul et DJ Mandy, le 12 novembre 2025 ; Québec 2026, neuf DJ dont les têtes d'affiche Disclosure (DJ set), Zeds Dead et Chris Lake, le 12 novembre 2025 aussi ; Québec 2025, Tiësto, Miss Monique et deadmau5, le 20 novembre 2024. [editions[Gatineau 2026]] [quebec_2026_lineup] [editions.6.note] [editions[Québec 2025].note] Les dates de chaque ville sont sur la page principale, celles de Québec sur sa page. → /igloofest/ · → /igloofest/quebec/",
          },
        ],
        faq: [
        ],
        sourcesHeading: "Sources",
        sources: "Les quatre pages de programmation 2027 d'igloofest.ca (Week-end 1 à 4) et ses annonces du 21 septembre et du 21 octobre 2026 ; l'accueil et la programmation de gatineau.igloofest.ca, de quebec.igloofest.ca et d'edmonton.igloofest.ca ; les communiqués de quebec.igloofest.ca du 20 novembre 2024 et du 12 novembre 2025, la page « L'expérience » de quebec.igloofest.ca et l'annonce de gatineau.igloofest.ca du 12 novembre 2025 ; consultés les 21 et 22 octobre 2026. [sources.s1] [sources.s4] [sources.s4b] [sources.s9] [sources.s6] [sources.s12] [sources.s8] [sources.s7] [sources.s13c] [sources.s10c] Les heures des soirées viennent de la FAQ en anglais d'igloofest.ca, consultée le 24 octobre 2026. [sources.s5en]",
        links: "Liens : [la programmation 2027 sur igloofest.ca](/go/igloofest-programmation/) · [Igloofest Gatineau](/go/igloofest-gatineau/) · [Igloofest Québec](/go/igloofest-quebec/) · [Igloofest Edmonton](/go/igloofest-edmonton/)",
        foot: "fest.one est indépendant d'Igloofest, de Multicolore, de Courage, de Gestev, de Ticketmaster et des sociétés de transport.",
        anchors: [
          {
            "target": "/igloofest/billets/",
            "text": "les billets"
          },
          {
            "target": "/igloofest/montreal/",
            "text": "la page de Montréal"
          },
          {
            "target": "/igloofest/",
            "text": "la page principale"
          },
          {
            "target": "/igloofest/quebec/",
            "text": "Québec"
          }
        ],
      },
      {
        slug: "igloofest/montreal",
        createdAt: "2026-10-22T22:00:00+04:00",
        updatedAt: "2026-10-24T12:20:00+04:00",
        kind: "dates",
        label: "Montréal",
        crumb: "Montréal",
        navTitle: "Dates, lieu et métro à Montréal",
        title: "Igloofest Montréal 2027 : dates et métro — guide du festival",
        description: "Igloofest Montréal 2027, festival au Quai Jacques-Cartier du 14 janvier au 6 février : 12 soirées, dernier métro, autobus, stationnement.",
        h1: "Igloofest Montréal 2027",
        lede: "Igloofest Montréal 2027 se tient du jeudi 14 janvier au samedi 6 février 2027 au Quai Jacques-Cartier, dans le Vieux-Port de Montréal, les jeudis, vendredis et samedis de quatre fins de semaine, soit douze soirées, avec un premier set à 19 h 30 chaque soir. [editions.0] [editions.0.note] [venues[v1]] Le site a deux scènes, la Scène Sapporo et la Scène Vidéotron, et un Igloovillage ; il est à quelques minutes à pied des stations Place-d'Armes et Champ-de-Mars, sur la ligne orange, selon l'organisateur, qui écrit aussi « IGLOOFEST MTL ». [venues.v1.note] [transport[Montréal, métro]] [sources.s4b] Les artistes de chaque soirée sont sur la page de la programmation. → /igloofest/programmation/",
        sections: [
          {
            id: "soirees",
            heading: "Les douze soirées",
            body: "- Fin de semaine 1 : jeudi 14, vendredi 15 et samedi 16 janvier 2027. [editions.0.note]\n- Fin de semaine 2 : jeudi 21, vendredi 22 et samedi 23 janvier 2027. [editions.0.note]\n- Fin de semaine 3 : jeudi 28, vendredi 29 et samedi 30 janvier 2027. [editions.0.note]\n- Fin de semaine 4 : jeudi 4, vendredi 5 et samedi 6 février 2027. [editions.0.note]\n\nLe premier set est à 19 h 30 tous les soirs. [editions.0.note] Selon la FAQ en anglais de l'organisateur, consultée le 24 octobre 2026, les soirées vont de 19 h 30 à 23 h le jeudi, et de 19 h 30 à 0 h 30 le vendredi et le samedi. [hours_montreal] Le set le plus tardif de Montréal 2027 commence à 23 h 15, le samedi 6 février. [lineup.nights.11.sapporo] Les billets s'achètent à la soirée, sur la seule billetterie que l'organisateur accepte, et l'entrée est réservée aux 18 ans et plus, avec une pièce d'identité avec photo. [sellers[0].note] [age.0] [age.0.note] → /igloofest/billets/",
          },
          {
            id: "quai-jacques-cartier",
            heading: "Le Quai Jacques-Cartier",
            body: "L'organisateur nomme le quai, pas un numéro civique : Quai Jacques-Cartier, Vieux-Port de Montréal. [venues[v1]] [venues[v1].note] [not_found.3] Il ne publie ni plan ni nombre d'entrées pour le festival : le plan du site est, selon sa page, « bientôt dévoilé » au 22 octobre 2026, et sa page sur l'accessibilité nomme une entrée VIP sur la plate-forme ouest et une allée centrale qui sert de sortie en fin de soirée. [venues.v1.note] [venues[v1].note] [not_found_added.0] [sources.s15] Il n'y a pas de vestiaire à Montréal. [banned_items[Montréal].closing] Le festival est dehors, sur le quai, en janvier et en février ; ce qu'il faut porter et ce qu'on peut apporter est sur la page S'habiller. → /igloofest/habillement/ [Voir le Quai Jacques-Cartier sur la carte](/go/igloofest-maps-montreal/).",
          },
          {
            id: "metro",
            heading: "En métro : ligne orange, Place-d'Armes ou Champ-de-Mars",
            body: "Les deux stations sont à quelques minutes à pied du site, selon la FAQ de l'organisateur. [transport[Montréal, métro]] Les derniers départs, tels que sa page « Lieu et transport » les affiche : [transport.0]\n\n- Place-d'Armes, direction Montmorency : 0 h 51 tous les jours (sauf samedi 1 h 21) ; direction Côte-Vertu : 1 h tous les jours (sauf samedi 1 h 30). [transport.0]\n- Champ-de-Mars, direction Montmorency : 0 h 52 tous les jours (sauf samedi 1 h 22) ; direction Côte-Vertu : 0 h 59 tous les jours (sauf samedi 1 h 29). [transport.0]\n\n« Samedi » est le mot de l'organisateur, et sa page ne dit pas s'il s'agit de la nuit de vendredi à samedi ou de celle de samedi à dimanche. [stale_or_contradictory.2] Ce sont les heures de l'organisateur, consultées le 22 octobre 2026 ; elles n'ont pas été comparées à l'horaire de la [STM](/go/igloofest-stm/). [transport[Montréal, métro].note] [sources.s18] Vérifiez-les avant de compter sur le dernier métro.",
          },
          {
            id: "autobus-train-voiture",
            heading: "En autobus, en train, en voiture",
            body: "L'organisateur nomme trois lignes d'autobus : la 55 Saint-Laurent, arrêt Saint-Laurent / Saint-Jacques ; la 715 Vieux-Montréal / Vieux-Port, arrêt Notre-Dame / De Bonsecours ; et, la nuit, la 361 Saint-Denis, arrêt Place Jacques-Cartier. [transport.1] Depuis l'aéroport Montréal-Trudeau, il indique la navette de l'aéroport au centre-ville, la ligne 747 YUL Aéroport Montréal-Trudeau / Centre-Ville. [transport[Montréal, YUL]] En train, la Gare centrale (métro Bonaventure) reçoit VIA Rail et Amtrak ; en autocar, la Gare d'autocars de Montréal est au métro Berri-UQAM. [transport.3] En voiture, l'organisateur écrit que les rues de la Commune et Berri et le boulevard Saint-Laurent « donnent accès aux entrées du Vieux-Port et à ses stationnements », et que des stationnements sont disponibles au Quai de l'Horloge et au Quai King-Edward ; pour le covoiturage, il nomme AmigoExpress. [transport.3] [venues[v1].note] Tout cela est sur sa page [« Lieu et transport »](/go/igloofest-transport/).",
          },
          {
            id: "editions-passees",
            heading: "Éditions passées à Montréal",
            body: "En 2026, Montréal a tenu la 18e édition du festival du jeudi 15 janvier au samedi 7 février, sur quatre fins de semaine, au Vieux-Port, comme en 2027. [editions.4] [editions.4.note] [venue_2026_montreal] L'organisateur ne donne pas de numéro à l'édition 2027. [not_found.6] Le festival existe depuis 2007. [event.since] Les éditions de Gatineau, de Québec et d'Edmonton sont sur la page principale et sur les pages de Gatineau et de Québec. → /igloofest/",
          },
        ],
        faqHeading: "Questions fréquentes",
        faq: [
          {
            q: "Je m'y rends comment?",
            a: "En métro, ligne orange, stations Place-d'Armes ou Champ-de-Mars, à quelques minutes à pied du Quai Jacques-Cartier ; en autobus, lignes 55, 715 et, la nuit, 361 ; depuis l'aéroport, la navette 747 ; en voiture, stationnements du Quai de l'Horloge et du Quai King-Edward. [transport[Montréal, métro]] [transport.1] [transport[Montréal, YUL]] [transport.3] Source : la FAQ et la page « Lieu et transport » de l'organisateur, consultées les 21 et 22 octobre 2026. [sources.s5] [sources.s3]",
          },
          {
            q: "Quel est le dernier métro?",
            a: "Selon la page de l'organisateur, consultée le 22 octobre 2026 : à Place-d'Armes, 0 h 51 vers Montmorency et 1 h vers Côte-Vertu (sauf samedi, 1 h 21 et 1 h 30) ; à Champ-de-Mars, 0 h 52 vers Montmorency et 0 h 59 vers Côte-Vertu (sauf samedi, 1 h 22 et 1 h 29). [transport.0] La page ne précise pas quelle nuit « samedi » désigne, et ces heures n'ont pas été comparées à celles de la STM ; vérifiez-les auprès d'elle. [stale_or_contradictory.2] [transport[Montréal, métro].note] Source : la page « Lieu et transport » de l'organisateur. [sources.s3]",
          },
        ],
        sourcesHeading: "Sources",
        sources: "La page « Lieu et transport » d'igloofest.ca (derniers départs, autobus, 747, train, autocar, stationnements, covoiturage), sa FAQ (stations, 18 ans et plus, vestiaire), sa programmation 2027 (dates et premier set), sa page « Passes et billets », sa page « Accessibilité », sa page « À propos » et son annonce du 21 septembre 2026, consultées les 21 et 22 octobre 2026 ; les coordonnées du quai pour la carte viennent d'OpenStreetMap. [sources.s3] [sources.s5] [sources.s1] [sources.s2] [sources.s15] [sources.s5b] [sources.s4b] [sources.s17] Les heures des soirées viennent de la FAQ en anglais d'igloofest.ca, consultée le 24 octobre 2026. [sources.s5en]",
        links: "Liens : [« Lieu et transport », igloofest.ca](/go/igloofest-transport/) · [la STM](/go/igloofest-stm/) · [« Passes et billets », igloofest.ca](/go/igloofest-billets/) · [Voir le Quai Jacques-Cartier sur la carte](/go/igloofest-maps-montreal/)",
        foot: "fest.one est indépendant d'Igloofest, de Multicolore, de Courage, de Gestev, de Ticketmaster et des sociétés de transport.",
        anchors: [
          {
            "target": "/igloofest/programmation/",
            "text": "la page de la programmation"
          },
          {
            "target": "/igloofest/billets/",
            "text": "Les billets"
          },
          {
            "target": "/igloofest/habillement/",
            "text": "la page S'habiller"
          },
          {
            "target": "/igloofest/",
            "text": "la page principale"
          }
        ],
      },
      {
        slug: "igloofest/habillement",
        createdAt: "2026-10-22T22:00:00+04:00",
        updatedAt: "2026-10-24T12:20:00+04:00",
        kind: "faq",
        label: "S'habiller",
        crumb: "S'habiller",
        navTitle: "Comment s'habiller et règlements",
        title: "Comment s'habiller pour l'Igloofest 2027 — guide du festival",
        description: "Comment s'habiller pour le festival Igloofest 2027 : recommandations de l'organisateur contre le froid, quoi apporter, ce qui est interdit, consigne, météo.",
        h1: "Comment s'habiller pour l'Igloofest 2027",
        lede: "Il n'y a pas de code vestimentaire à l'Igloofest : l'organisateur le dit, et donne à la place une liste pour tenir une soirée dehors, du jeudi 14 janvier au samedi 6 février 2027 à Montréal, puis en février à Gatineau et en mars à Québec et à Edmonton. [rules_cold_weather.0] [editions.0] [editions[Gatineau 2027]] [editions[Québec 2027]] [editions.3] Suivent ses recommandations, ce qu'on peut apporter, la liste complète de ce qui est interdit à Montréal, et ce que Gatineau et Québec disent de leurs sacs, de leur consigne, du paiement et de la météo. [rules_cold_weather.0] [rules_cold_weather.1] [banned_items[Montréal]] [banned_items[Gatineau]] [banned_items[Québec]]",
        sections: [
          {
            id: "contre-le-froid",
            heading: "Les recommandations de l'organisateur contre le froid",
            body: "La FAQ d'Igloofest Montréal, consultée le 22 octobre 2026, recommande huit choses : un manteau d'hiver coupe-vent ; un pantalon de neige ; une tuque ; des mitaines, « plus chaud que les gants » ; des bottes, pas des souliers ; des bas chauds et une deuxième paire ; un foulard, un cache-cou ou une cagoule ; des réchauffe-pieds et des réchauffe-mains. [rules_cold_weather.0] [sources.s5] Les listes de ce qu'il faut apporter, celle de Montréal et celle de Gatineau, n'y consacrent qu'une ligne, ici dans les mots de Gatineau : « Vêtements adaptés à la température (Tuque, gants et bottes nécessaires pour passer une incroyable soirée) ». [rules_cold_weather.1] [gatineau_faq.bring] L'organisateur avait annoncé le 19 décembre 2025 un concours d'habits de neige improbables pour l'édition 2026 de Montréal, l'Iglooswag ; rien n'est annoncé pour 2027 au 22 octobre 2026. [rules_cold_weather.7] [sources.s16]",
          },
          {
            id: "quoi-apporter",
            heading: "Quoi apporter",
            body: "Selon la FAQ de Montréal, consultée le 22 octobre 2026, cinq choses, dans l'ordre où elle les donne : une pièce d'identité avec photo, permis, passeport ou carte d'assurance maladie ; une gourde réutilisable ; des vêtements adaptés à la température, tuque, gants et bottes ; un « petit parapluie » ; et un petit sac, qui sera fouillé à l'entrée. [rules_cold_weather.1] La FAQ de Gatineau donne la même liste, sans le parapluie. [gatineau_faq.bring] [banned_items[Gatineau].differs_from_montreal] À Montréal comme à Gatineau, on paie sur le site par carte de crédit ou de débit seulement. [payment_on_site.0] [payment_on_site.1]",
          },
          {
            id: "interdit-montreal",
            heading: "Ce qui est interdit à Montréal : la liste de l'organisateur",
            body: "La FAQ de Montréal prévient que « tous les festivaliers et les sacs seront assujettis à une fouille lors de l'accès au site », puis donne sa liste : [banned_items[Montréal].header]\n\n- les animaux, sauf les chiens d'assistance dûment identifiés et accrédités ;\n- les appareils photo de 8 pouces ou plus avec accessoires (lentilles détachables, flash, trépieds) ; les appareils conformes sont acceptés ;\n- les armes blanches, objets contondants ou tout élément qui peut servir d'arme, y compris les chaînes, même de portefeuille, et les spikes ;\n- les sacs à dos, sacs-glacières, sacs de sport, sacs de type camping ou à armature, quelle que soit leur taille, et tout autre sac de plus de 35 cm × 35 cm × 15,25 cm ;\n- les breuvages alcoolisés ;\n- les casques de moto ou de vélo ;\n- les chaises portatives et pliantes de toute sorte ;\n- les contenants de verre ;\n- les dossards ou habits de sécurité fluorescents ;\n- les drogues et accessoires reliés, « sauf médicaments sous prescription dans le contenant original avec la prescription » ; [drugs_line]\n- l'équipement vidéo ou d'enregistrement audio ou vidéo d'aucune sorte : drone, pied de caméra, bâton à égoportrait (selfie), micro, trépied ou article similaire ;\n- les feux d'artifice, confettis, feux de Bengale ou pétards ;\n- les instruments de musique (mégaphone, speaker, sifflet) ;\n- le port des coiffes de guerre ou des Premières Nations ;\n- le matériel promotionnel et les flyers en grande quantité ;\n- le matériel, les récipients ou objets activés par de l'air comprimé ou par des propulseurs sous pression ;\n- la nourriture et les breuvages ;\n- le parapluie ;\n- les pointeurs laser ;\n- les tentes ;\n- les vélos, planches à roulettes et patins ;\n- et « tout autre objet jugé dangereux ou nuisible, à la discrétion de l'organisation ». [banned_items[Montréal].items]\n\nQui a un objet interdit n'entre pas, à moins de s'en départir dans les contenants prévus à cet effet, et il n'y a aucun vestiaire ni consigne à Montréal. [banned_items[Montréal].closing] Sur le parapluie, la même page se contredit : « Parapluie » figure dans la liste des objets interdits et « Petit parapluie » dans celle de ce qu'on peut apporter ; la question est à poser à l'organisateur, à info@igloofest.ca. [stale_or_contradictory.3] [rules_cold_weather.1]",
          },
          {
            id: "gatineau",
            heading: "Gatineau : presque la même liste",
            body: "La FAQ de Gatineau, consultée le 21 octobre 2026, reprend la liste de Montréal avec la même fouille des festivaliers et des sacs, et trois différences principales : tout appareil photo à lentille détachable est considéré comme professionnel et refusé, sans règle de taille ; les animaux ne sont pas dans la liste, mais une question à part dit que « seuls les chiens d'assistance dûment identifiés et accrédités sont permis sur le site » et qu'« une preuve vous sera demandée à l'entrée » ; et comme sa liste de ce qu'il faut apporter ne nomme pas de petit parapluie, le parapluie y est simplement interdit. [banned_items[Gatineau]] [banned_items[Gatineau].animals] [banned_items[Gatineau].differs_from_montreal] Sa ligne sur l'équipement d'enregistrement vidéo ou audio ne nomme pas le micro. [banned_items[Gatineau].items] [banned_items[Montréal].items] Il n'y a aucun vestiaire ni consigne à Gatineau non plus. [gatineau_faq.cloakroom] Les règles d'âge diffèrent par ville : 18 ans et plus à Montréal, 16 ans et plus à Québec, enfants admis avec un parent à Gatineau. [age.0] [age[Québec]] [age[Gatineau]] → /igloofest/gatineau/",
          },
          {
            id: "quebec",
            heading: "Québec : sacs à main fouillés, consigne, pas de réadmission",
            body: "La FAQ d'Igloofest Québec, consultée le 21 octobre 2026, commence par les sacs : tous les sacs à main sont fouillés, aucune bouteille n'est acceptée, aucun sac de plus de 35 cm × 35 cm × 15,25 cm n'entre, et une consigne est disponible à l'entrée. [banned_items[Québec].header] [quebec_faq.bags] Sa liste d'objets interdits ressemble à celle de Montréal, avec ses propres lignes : les casques de moto ou de vélo sont « à déposer au vestiaire à l'entrée » ; les « vêtements à l'image de gang de rue » sont refusés ; « il est interdit de fumer ou de vapoter du cannabis sur le site de la Place Jean Béliveau » ; les animaux sont interdits, « chiens-guides acceptés » ; les drogues, « sauf médicaments sous prescription ». [banned_items[Québec]] [quebec_faq.helmets] [quebec_faq.gang_clothing] [quebec_faq.cannabis_site] [drugs_line] Il n'y a aucune réadmission : qui sort ne rentre pas. [quebec_faq.reentry] Les spectacles ont lieu « beau temps mauvais temps » ; une annulation n'est prévue qu'en cas de météo dangereuse, et l'état de la soirée est affiché sur la page Facebook du festival. [quebec_faq.weather] Sur le paiement, cette FAQ répond seulement qu'il n'y a pas de guichet automatique sur le site. [payment_on_site.2] Aucune politique météo n'apparaît sur les pages de Montréal, de Gatineau et d'Edmonton consultées le 21 octobre 2026. [not_found_added.4]",
          },
          {
            id: "securite",
            heading: "Sécurité, consentement, cannabis",
            body: "Selon la FAQ de l'organisateur, une équipe du GRIP, en réduction des méfaits, est présente à Montréal à l'espace intérieur Scéna, et la même FAQ publie une politique de consentement, à lire sur sa page. [rules_cold_weather.6] [« Règlements et FAQ », igloofest.ca](/go/igloofest-reglements/) Sur le cannabis, les FAQ de Montréal, de Gatineau et de Québec rappellent, dans les mêmes mots, que « la nouvelle loi » interdit de fumer ou de vapoter du cannabis dans tous les lieux publics et que, depuis le 1er janvier 2020, les moins de 21 ans ne peuvent ni en acheter ni en posséder. [cannabis]",
          },
        ],
        faqHeading: "Questions fréquentes",
        faq: [
          {
            q: "Comment s'habiller pour l'Igloofest?",
            a: "Il n'y a pas de code vestimentaire. L'organisateur recommande, dans sa FAQ : manteau d'hiver coupe-vent, pantalon de neige, tuque, mitaines plutôt que gants, bottes plutôt que souliers, bas chauds et une deuxième paire, foulard, cache-cou ou cagoule, réchauffe-pieds et réchauffe-mains. [rules_cold_weather.0] Source : la FAQ d'Igloofest Montréal, consultée le 22 octobre 2026. [sources.s5]",
          },
          {
            q: "Qu'est-ce qui est interdit d'apporter sur le site?",
            a: "À Montréal, entre autres : les sacs à dos et tout sac de plus de 35 cm × 35 cm × 15,25 cm, l'alcool, la nourriture et les boissons, le verre, le parapluie, les chaises, les appareils photo de 8 pouces et plus, les drones, trépieds et bâtons à égoportrait, les pointeurs laser, les feux d'artifice, les vélos et patins, les animaux sauf les chiens d'assistance, les coiffes des Premières Nations ; la liste complète de l'organisateur est reproduite plus haut. [banned_items[Montréal].items] À Québec, les grands sacs sont refusés mais une consigne existe ; à Gatineau, tout appareil photo à lentille détachable est refusé. [quebec_faq.bags] [banned_items[Gatineau].differs_from_montreal] Source : les FAQ de Montréal (22 octobre 2026), de Québec et de Gatineau (21 octobre 2026). [sources.s5] [sources.s13b] [sources.s14b]",
          },
        ],
        sourcesHeading: "Sources",
        sources: "La page « Règlements et FAQ » d'igloofest.ca (recommandations, quoi apporter, objets interdits, vestiaire, GRIP, consentement, cannabis, paiement), la FAQ de quebec.igloofest.ca (sacs, consigne, réadmission, météo, guichets, casques, cannabis), la FAQ de gatineau.igloofest.ca (quoi apporter, objets interdits, chiens d'assistance, vestiaire, paiement, âge) et les annonces d'igloofest.ca (Iglooswag 2026, 19 décembre 2025), consultées les 21 et 22 octobre 2026. [sources.s5] [sources.s13b] [sources.s14b] [sources.s16]",
        links: "Liens : [« Règlements et FAQ », igloofest.ca](/go/igloofest-reglements/) · [la FAQ d'Igloofest Québec](/go/igloofest-quebec-faq/) · [la FAQ d'Igloofest Gatineau](/go/igloofest-gatineau-faq/)",
        foot: "fest.one est indépendant d'Igloofest, de Multicolore, de Courage, de Gestev, de Ticketmaster et des sociétés de transport.",
        anchors: [
          {
            "target": "/igloofest/gatineau/",
            "text": "Gatineau"
          }
        ],
      },
      {
        slug: "igloofest/quebec",
        createdAt: "2026-10-22T22:00:00+04:00",
        updatedAt: "2026-10-24T12:20:00+04:00",
        kind: "quebec",
        label: "Québec",
        crumb: "Québec",
        navTitle: "Igloofest Québec 2027",
        title: "Igloofest Québec 2027 : dates et billets — guide du festival",
        description: "Igloofest Québec 2027, festival à la Place Jean-Béliveau (ExpoCité) du 4 au 6 mars, 16 ans et plus : billets, autobus RTC, stationnement, éditions passées.",
        h1: "Igloofest Québec 2027",
        lede: "Igloofest Québec 2027 se tient du jeudi 4 au samedi 6 mars 2027 à la Place Jean-Béliveau, à ExpoCité, au 250, boulevard Wilfrid-Hamel, à Québec, à compter de 19 h chaque soir. [editions[Québec 2027]] [editions[Québec 2027].note] [venues.v2] C'est la 5e édition à Québec, réservée aux 16 ans et plus, coorganisée par Gestev et Multicolore. [editions[Québec 2027].note] [age[Québec]] [event.organiser] Au 22 octobre 2026, l'organisateur n'avait annoncé ni programmation ni mise en vente. [editions[Québec 2027].note] [sellers[1].note]",
        sections: [
          {
            id: "billets",
            heading: "Billets : ce que la FAQ de Québec dit",
            body: "La seule phrase de l'organisateur sur les billets 2027, consultée le 22 octobre 2026 dans sa FAQ, est « Les billets seront bientôt disponibles » ; les deux dernières mises en vente sont passées par son site, [quebec.igloofest.ca](/go/igloofest-quebec/). [sellers[1].note] Le billet VIP de Québec comprend l'entrée rapide, une terrasse exclusive, des toilettes chauffées, un espace chauffé et une vue sur la scène principale. [tickets_detail.4] Il n'y a aucune réadmission : « Si vous sortez du site, il vous sera impossible d'entrer à nouveau. » [quebec_faq.reentry] Une pièce d'identité avec photo peut être demandée pour acheter de l'alcool sur le site. [quebec_faq.food_drink] Le prix de 2026 et les dates de ses ventes sont sur la page des billets, avec les cartes acceptées et les remboursements. → /igloofest/billets/",
          },
          {
            id: "place-jean-beliveau",
            heading: "La Place Jean-Béliveau, à ExpoCité",
            body: "La Place Jean-Béliveau est une place publique au cœur d'ExpoCité, à côté du Centre Vidéotron, du Pavillon de la Jeunesse et du Grand Marché de Québec ; l'adresse est le 250, boulevard Wilfrid-Hamel, Québec (Québec) G1L 5A7. [venues.v2] [venues.v2.note] Les portes ouvrent à 19 h. [editions[Québec 2027].note] Une zone est réservée aux personnes à mobilité réduite, avec des toilettes mises à leur disposition, et plusieurs toilettes sont disponibles sur le site. [quebec_faq.mobility] [quebec_faq.toilets] [Voir la Place Jean-Béliveau sur la carte](/go/igloofest-maps-quebec/).",
          },
          {
            id: "sur-le-site",
            heading: "Sur le site : nourriture, alcool, sacs, objets perdus",
            body: "La FAQ de Québec, consultée le 21 octobre 2026, répond à ce qu'on demande avant une soirée dehors en mars. Il y a de la nourriture sur le site, et « une sélection de breuvages, alcoolisés et non alcoolisés » à des endroits identifiés ; « aucun alcool ni nourriture provenant de l'extérieur du site ne sera toléré ». [quebec_faq.food_drink] Des produits dérivés sont vendus sur place. [quebec_faq.merchandise] Il n'y a pas de guichet automatique, et la FAQ ne dit rien d'autre sur le paiement. [quebec_faq.atm] [payment_on_site.2] Les sacs de plus de 35 cm × 35 cm × 15,25 cm sont refusés, mais une consigne est disponible à l'entrée, où les casques de moto ou de vélo sont « à déposer au vestiaire ». [quebec_faq.bags] [quebec_faq.helmets] Pour un objet perdu, la FAQ renvoie à un formulaire en ligne, qui porte au 21 octobre 2026 le nom « 2026 IGF- Objets perdus ». [quebec_faq.lost_property] Les spectacles ont lieu « beau temps mauvais temps » ; si la météo devient dangereuse ou hors de contrôle, l'organisateur annule, et l'état des activités s'affiche sur la page Facebook du festival. [quebec_faq.weather] Pour toute question : info@gestev.com. [quebec_faq.contact] La liste des objets interdits à Québec, avec ce qui la distingue de celle de Montréal, est sur la page S'habiller. → /igloofest/habillement/",
          },
          {
            id: "transport",
            heading: "En autobus RTC, en voiture, en autocar",
            body: "L'organisateur nomme les parcours du RTC : le 802, arrêt Centre de Foires ; les 64, 74, 82 et 84 depuis le centre-ville, arrêt « François-1re », dans son orthographe ; le 4, arrêt Daniel ; les 3 et 801, arrêt 18e Rue, ou encore les 64, 74, 82 et 84 à l'arrêt Fleur-de-Lys. [transport.4] {{until prices}}En voiture, le stationnement du Centre Vidéotron est à 15 $ par véhicule, selon la FAQ de l'organisateur consultée le 22 octobre 2026. [prices.2] [sources.s13b]{{/until}} Sa page « Lieu et transport » présente aussi une navette La Québécoise depuis Montréal (Place Bonaventure), Saint-Hyacinthe et Drummondville, réservée par courriel (offre de l'édition 2026). [transport.4] [prices.3.note] Les horaires sont ceux du [RTC](/go/igloofest-rtc/). [sources.s19]",
          },
          {
            id: "editions-passees",
            heading: "Éditions passées à Québec",
            body: "La 4e édition, du jeudi 5 au samedi 7 mars 2026, a été la première réservée aux 16 ans et plus ; l'organisateur en nomme les têtes d'affiche, Disclosure (DJ set), Zeds Dead et Chris Lake, parmi neuf DJ, et compte « plus de 18 000 Igloosapiens » sur les trois soirs de 2026. [editions.6] [editions.6.note] [quebec_2026_lineup] [not_printable.1] Sa programmation et sa mise en vente avaient été annoncées le mercredi 12 novembre 2025. [editions.6.note] La 3e édition, du jeudi 6 au samedi 8 mars 2025, a réuni Tiësto, Miss Monique et deadmau5 ; elle avait été annoncée le mercredi 20 novembre 2024, avec une prévente le jeudi 21 novembre à 10 h et une vente le vendredi 22 novembre à 10 h. [editions.8] [editions[Québec 2025].note] Le communiqué du 12 novembre 2025 rappelle, de cette édition 2025, plus de 9 000 Igloosapiens réunis sur la place en une seule soirée, avec Tiësto en tête d'affiche. [editions[Québec 2025].note] [sources.s7]",
          },
        ],
        faqHeading: "Questions fréquentes",
        faq: [
          {
            q: "Quelle est la date d'Igloofest Québec?",
            a: "Du jeudi 4 au samedi 6 mars 2027, trois soirées, à compter de 19 h, à la Place Jean-Béliveau, 250, boulevard Wilfrid-Hamel, à ExpoCité, pour les 16 ans et plus. [editions[Québec 2027]] [editions[Québec 2027].note] [venues.v2] [age[Québec]] Source : l'accueil et la FAQ de quebec.igloofest.ca, consultés le 22 octobre 2026. [sources.s6] [sources.s13b]",
          },
        ],
        sourcesHeading: "Sources",
        sources: "L'accueil de quebec.igloofest.ca (dates et lieu), sa FAQ (5e édition, 16 ans et plus, portes, billets « bientôt », réadmission, nourriture et alcool, produits dérivés, toilettes, mobilité réduite, guichets, sacs, consigne, casques, objets perdus, météo, stationnement, contact), sa page « Lieu et transport » (RTC, navette), sa page « L'expérience » (bilan 2026), ses communiqués du 20 novembre 2024 et du 12 novembre 2025, consultés les 21 et 22 octobre 2026. [sources.s6] [sources.s13b] [sources.s13] [sources.s13c] [sources.s8] [sources.s7]",
        links: "Liens : [Igloofest Québec](/go/igloofest-quebec/) · [la FAQ d'Igloofest Québec](/go/igloofest-quebec-faq/) · [« Lieu et transport », Igloofest Québec](/go/igloofest-quebec-transport/) · [le RTC](/go/igloofest-rtc/) · [Voir la Place Jean-Béliveau sur la carte](/go/igloofest-maps-quebec/)",
        foot: "fest.one est indépendant d'Igloofest, de Multicolore, de Courage, de Gestev, de Ticketmaster et des sociétés de transport.",
        anchors: [
          {
            "target": "/igloofest/billets/",
            "text": "la page des billets"
          },
          {
            "target": "/igloofest/habillement/",
            "text": "la page S'habiller"
          }
        ],
        // QUEBEC_MARKUP, above the guides: one value both guides' pages hold.
        markup: QUEBEC_MARKUP,
      },
      {
        slug: "igloofest/gatineau",
        createdAt: "2026-10-22T22:00:00+04:00",
        updatedAt: "2026-10-24T12:20:00+04:00",
        kind: "gatineau",
        label: "Gatineau",
        crumb: "Gatineau",
        navTitle: "Igloofest Gatineau 2027",
        title: "Igloofest Gatineau 2027 : dates et lieu — guide du festival",
        description: "Igloofest Gatineau 2027, festival à la Place des Festivals Zibi du 11 au 13 février, 19 h à 23 h : enfants admis, autobus STO, éditions 2025 et 2026.",
        h1: "Igloofest Gatineau 2027",
        lede: "Igloofest Gatineau 2027 se tient du jeudi 11 au samedi 13 février 2027, de 19 h à 23 h chaque soir, à la Place des Festivals Zibi, au 60, rue Jos-Montferrand, à Gatineau. [editions[Gatineau 2027]] [editions[Gatineau 2027].note] [venues.v3] L'organisateur écrit, dans la description de son site de Gatineau, que le festival « sera de retour à Gatineau, en 2027, à la Place des Festivals Zibi, dans le cadre de l'iconique Bal de neige », et sa page « À propos » promet « une vue sur le Parlement du Canada ». [bal_de_neige] [venues[v3].note] Sa FAQ prévient : « L'événement est habituellement 18+, cependant à Gatineau c'est différent! », et les enfants sont admis avec un parent, selon la règle plus bas. [age[Gatineau].quote] Au 22 octobre 2026, le site affiche « Annonce de programmation à venir » et n'a ouvert aucune vente ; l'inscription à la prévente est sur son [accueil](/go/igloofest-gatineau/). [editions[Gatineau 2027].note] [sales.3]",
        sections: [
          {
            id: "pour-qui",
            heading: "Pour qui, selon la FAQ de Gatineau",
            body: "La FAQ de Gatineau, consultée le 21 octobre 2026, s'adresse « à tous les guerriers désirant défier l'hiver et les amateurs de musique électronique (ou pas) ». [gatineau_faq.who] Elle donne aussi les valeurs du festival : « L'inclusivité, le respect, la tolérance et la diversité sont des valeurs importantes pour Igloofest. Tolérance zéro pour l'homophobie, le racisme, le sexisme, la transphobie et la xénophobie. » [gatineau_faq.values] Les soirées du 11, 12 et 13 février 2027 tombent un jeudi, un vendredi et un samedi, quatre heures par soir. [gatineau_faq.when]",
          },
          {
            id: "enfants",
            heading: "Enfants : la règle de la FAQ",
            body: "« Les enfants âgés de 12 ans et moins sont admis gratuitement lorsqu'ils sont accompagnés d'un parent qui détient un billet valide du festival. » À partir de 13 ans, les enfants doivent se procurer un billet, présenter une pièce d'identité et être accompagnés d'un parent, « un enfant par adulte ». [age[Gatineau]] [age[Gatineau].quote] La FAQ ne donne pas d'âge limite pour cette règle. [age[Gatineau].note] Pour comparaison, Montréal est réservé aux 18 ans et plus et Québec aux 16 ans et plus. [age.0] [age[Québec]]",
          },
          {
            id: "billets",
            heading: "Billets : ce que la FAQ de Gatineau dit",
            body: "Les Igloopasses et les billets « sont disponibles via la billetterie officielle d'Igloofest », « uniquement en ligne », et « seuls les billets achetés via la billetterie officielle d'Igloofest seront acceptés » ; la FAQ ne nomme pas de site. [gatineau_seller] [gatineau_faq.door] La billetterie accepte Visa et Mastercard, pas les cartes prépayées ni Visa Débit. [gatineau_faq.online_payment] Les ventes sont finales ; un report ou une annulation donne lieu à un remboursement. [gatineau_faq.refunds] La confirmation d'achat et le billet électronique arrivent par courriel ; on télécharge le billet d'avance et on le présente sur son téléphone pour qu'il soit scanné à l'entrée. [gatineau_faq.eticket] L'Igloopasse donne les trois soirs avec les privilèges de l'admission générale ; elle ne se partage pas, et une pièce d'identité est demandée à l'entrée pour vérifier que le nom sur la passe est le bon. [gatineau_faq.igloopasse] [tickets_detail.3] Le billet VIP ajoute l'entrée rapide, le service de bouteilles, une terrasse exclusive avec toilettes chauffées, une vue sur la scène et un espace intérieur chauffé. [gatineau_faq.vip] Si le billet n'arrive pas, la FAQ dit de regarder dans les courriels indésirables et, s'il n'y a toujours rien la veille, d'écrire à info@Igloofestgatineau.net ; une transaction qui échoue vient le plus souvent d'une erreur dans l'adresse de facturation, et un montant en attente sur la carte disparaît après cinq ou six jours ouvrables. [gatineau_faq.ticket_missing] [gatineau_faq.purchase_trouble] Aucun prix n'est publié pour Gatineau 2027 au 22 octobre 2026. [not_found.4]",
          },
          {
            id: "place-des-festivals-zibi",
            heading: "La Place des Festivals Zibi",
            body: "L'adresse est le 60, rue Jos-Montferrand, Gatineau (Québec) J8X. [venues.v3] Plan du site : « au courant du mois de janvier 2027 », écrit l'organisateur. [venues[v3].note] Pour s'y rendre en autobus, il renvoie au planificateur Plani-bus de la [STO](/go/igloofest-sto/), la Société de transport de l'Outaouais. [transport.5] [sources.s20] En voiture : « plusieurs espaces de stationnement sont disponibles dans le Vieux-Hull », et il invite à consulter le site de Dubé Stationnement pour les options et les tarifs. [gatineau_transport.parking] Pour rentrer : « L'équipe de Tolérance Zéro sera sur place pour vous raccompagner à la maison en toute sécurité. Les frais varient selon le trajet. » [gatineau_transport.tolerance_zero] Pour le covoiturage, il nomme AmigoExpress. [transport.5] Sur le site, il n'y a aucun vestiaire ni consigne, et on paie par carte de crédit ou de débit seulement. [gatineau_faq.cloakroom] [gatineau_faq.payment] Ce qu'il faut apporter et ce qui est interdit à Gatineau sont sur la page S'habiller. → /igloofest/habillement/ [Voir la Place des Festivals Zibi sur la carte](/go/igloofest-maps-gatineau/).",
          },
          {
            id: "editions-passees",
            heading: "Éditions passées à Gatineau",
            body: "La première édition de Gatineau a eu lieu en 2025, à la Place des Festivals Zibi, selon la page « À propos » de l'organisateur et son annonce du 23 octobre 2025. [editions[Gatineau 2025].note] [sources.s11] [sources.s10] La deuxième, du jeudi 12 au samedi 14 février 2026, a accueilli près de 17 000 festivaliers, selon le bilan de l'organisateur du 16 février 2026 : BUNT. le 12 février, Kaskade le 13 et Steve Aoki le 14, les trois « en tête d'affiche » de l'annonce du 12 novembre 2025, avec Swimming Paul et DJ Mandy ; la prévente avait ouvert le 13 novembre et la vente générale le 14 novembre 2025. [editions[Gatineau 2026]] [sources.s10b] [sources.s10c] Pour 2027, l'organisateur n'a publié, au 22 octobre 2026, que les dates, les heures et le lieu. [editions[Gatineau 2027].note]",
          },
        ],
        faqHeading: "Questions fréquentes",
        faq: [
          {
            q: "Igloofest Gatineau 2027, c'est quand et où?",
            a: "Du jeudi 11 au samedi 13 février 2027, de 19 h à 23 h, à la Place des Festivals Zibi, 60, rue Jos-Montferrand, à Gatineau ; la programmation et la vente ne sont pas annoncées au 22 octobre 2026. [editions[Gatineau 2027]] [editions[Gatineau 2027].note] [venues.v3] Source : l'accueil et la FAQ de gatineau.igloofest.ca, consultés les 21 et 22 octobre 2026. [sources.s9] [sources.s14b]",
          },
          {
            q: "Est-ce que les enfants peuvent venir à Igloofest Gatineau?",
            a: "Oui, selon la FAQ de Gatineau : gratuitement à 12 ans et moins, avec un parent qui a un billet ; à partir de 13 ans, avec leur propre billet, une pièce d'identité et un parent, un enfant par adulte. [age[Gatineau]] Source : la FAQ de gatineau.igloofest.ca, consultée le 21 octobre 2026. [sources.s14b]",
          },
        ],
        sourcesHeading: "Sources",
        sources: "L'accueil de gatineau.igloofest.ca (dates, « Annonce de programmation à venir », inscription à la prévente, description du site), sa FAQ (pour qui, valeurs, heures, enfants, quoi apporter, vestiaire, paiement, billetterie, cartes, remboursements, billet électronique, Igloopasse, VIP, billet manquant), sa page « Lieu et transport » (STO, stationnement, Tolérance Zéro, covoiturage, plan du site), sa page « À propos » et ses annonces du 23 octobre 2025, du 12 novembre 2025 et du 16 février 2026, consultés les 21 et 22 octobre 2026. [sources.s9] [sources.s14b] [sources.s14] [sources.s11] [sources.s10] [sources.s10c] [sources.s10b]",
        links: "Liens : [Igloofest Gatineau](/go/igloofest-gatineau/) · [la FAQ d'Igloofest Gatineau](/go/igloofest-gatineau-faq/) · [« Lieu et transport », Igloofest Gatineau](/go/igloofest-gatineau-transport/) · [la STO](/go/igloofest-sto/) · [Voir la Place des Festivals Zibi sur la carte](/go/igloofest-maps-gatineau/)",
        foot: "fest.one est indépendant d'Igloofest, de Multicolore, de Courage, de Gestev, de Ticketmaster et des sociétés de transport.",
        anchors: [
          {
            "target": "/igloofest/habillement/",
            "text": "la page S'habiller"
          }
        ],
        // GATINEAU_MARKUP, above the guides: one value both guides' pages hold.
        markup: GATINEAU_MARKUP,
      },
    ],
  },
  {
    slug: "en",
    createdAt: "2026-10-24T12:20:00+04:00",
    updatedAt: "2026-10-24T12:20:00+04:00",
    event: "igloofest",
    // The English twin (card 2026-10-24-igloofest-en): the same seasons and
    // sheet, for a reader who searches in English, in the writer's round 2
    // with the session's swaps after gate 2. Second in the list, so the
    // French guide stays the x-default and keeps the hub's one card.
    // Typography stays out of it: oqlf() sets French guides only
    // (data/events/index.ts).
    name: "Igloofest 2027",
    lang: "en",
    dir: "ltr",
    path: "/igloofest/en/",
    cover: "/covers/igloofest.jpg",
    hubLabel: "English",
    hubPlace: "Montreal, Gatineau, Quebec City, Edmonton",
    hubBlurb: "Igloofest 2027 is held outdoors in winter, from Thursday 14 January to Saturday 13 March 2027, in four cities: Montreal, Gatineau, Quebec City and Edmonton. [editions.0] [editions[Gatineau 2027]] [editions[Québec 2027]] [editions.3]",
    // The French guide's day, so both languages drop their prices together:
    // every reading inside the English spans is of 24 October, which allows
    // 5 December, and the earlier day holds (test:fest, "a span expires no
    // later than 42 days…").
    expires: { prices: "2026-12-02" },
    navLabel: "Igloofest guide pages",
    faqLabel: "Questions about Igloofest",
    updatedLine: true,
    pages: [
      {
        slug: "igloofest/en",
        createdAt: "2026-10-24T12:20:00+04:00",
        updatedAt: "2026-10-24T16:30:00+04:00",
        kind: "main",
        label: "Igloofest 2027",
        crumb: "Igloofest 2027",
        navTitle: "Igloofest 2027 dates, tickets and cities",
        title: "Igloofest 2027: dates, tickets, cities — festival guide",
        description: "Igloofest 2027: Montreal 14 Jan – 6 Feb, Gatineau 11–13 Feb, Quebec City 4–6 Mar, Edmonton 11–13 Mar. Tickets by night, hours, metro, eTA. Festival guide.",
        h1: "Igloofest 2027",
        lede: "Igloofest 2027 is held outdoors in winter, from Thursday 14 January to Saturday 13 March 2027, in four cities: Montreal, Gatineau, Quebec City and Edmonton. [editions.0] [editions[Gatineau 2027]] [editions[Québec 2027]] [editions.3] Montreal runs from Thursday 14 January to Saturday 6 February, Gatineau from 11 to 13 February, Quebec City from 4 to 6 March and Edmonton from 11 to 13 March. [editions.0] [editions[Gatineau 2027]] [editions[Québec 2027]] [editions.3] All are Thursday-to-Saturday nights, twelve of them in Montreal over four weekends. [editions.0.note]\n\nThe organiser writes in English too, on one site per city, but Igloofest Quebec's English site has no FAQ or travel page, and of Montreal's two FAQs only the English one gives closing hours. [sources.s6en] [hours_montreal] [not_found_hours.fr_faq] This guide puts the four cities{{until prices}}, Montreal's prices night by night{{/until}} and the entry rules for visitors in one place, each fact with its source and date.",
        jumps: [
          { id: "tickets", label: "Tickets" },
          { id: "season", label: "Dates by city" },
          { id: "montreal", label: "Montreal" },
          { id: "lineup", label: "Line-up" },
          { id: "abroad", label: "Passport and eTA" },
          { id: "edmonton", label: "Edmonton" },
          { id: "past", label: "Past editions" },
          { id: "questions", label: "Questions" },
          { id: "sources", label: "Sources" },
        ],
        sections: [
          {
            id: "tickets",
            heading: "Tickets: who sells them in each city",
            body: "- Montreal: tickets have been on sale night by night since Friday 23 October 2026, from the organiser's own shop, billets.igloofest.ca. Only tickets bought there are accepted. [sale_times.status] [sellers[0]] [sellers[0].note] {{until prices}}On 24 October 2026 general admission ran from CAD 49.00 to CAD 89.00 a night, service fees included and taxes extra. [prices_nights.ranges] [prices_nights.terms]{{/until}} The Igloopass, all twelve nights in one, is sold out for 2027, according to the shop and the organiser's FAQ. [sales[Montréal Igloopasse].soldOut] The general sale opened on Friday 23 October at 11:00, Montreal time, after a presale for newsletter and SMS subscribers the day before. [sale_times] [sales.0] [sales.1]\n- Gatineau: no sale had opened by 24 October 2026. Its home page takes sign-ups for a presale. [sales.3] [sources.s9en]\n- Quebec City: on 24 October 2026 its FAQ said only that tickets would be available soon. [sellers[1].note]\n- Edmonton: the organiser's English passes page says Igloopasses and tickets are sold only through Ticketmaster. On 24 October 2026 the Ticketmaster page its button leads to listed no event. [edmonton_tickets] [sellers[2].en]\n\nWhat general admission and VIP include, the Igloopass and the rules on refunds are on [the tickets page](/igloofest/en/tickets/){{until prices}}, with every Montreal night's prices{{/until}}.",
          },
          {
            id: "season",
            heading: "The 2027 season, city by city",
            body: "- Montreal: Thursday 14 January to Saturday 6 February 2027, twelve nights over four weekends, Thursday to Saturday, on the Quai Jacques-Cartier in the Old Port (Jacques-Cartier Pier on the organiser's English pages). [editions.0] [editions.0.note] [venues[v1]] [venues[v1].en] [sources.s3en] [Montreal: dates, hours and the metro](/igloofest/en/montreal/)\n- Gatineau: Thursday 11 to Saturday 13 February 2027, 19:00 to 23:00, at the Place des Festivals Zibi. [editions[Gatineau 2027]] [editions[Gatineau 2027].note] [venues.v3] [Gatineau: venue, children, buses](/igloofest/en/gatineau/)\n- Quebec City: Thursday 4 to Saturday 6 March 2027, from 19:00, at the Place Jean-Béliveau, ExpoCité. [editions[Québec 2027]] [editions[Québec 2027].note] [venues.v2] [Quebec City: venue, buses, cloakroom](/igloofest/en/quebec-city/)\n- Edmonton: Thursday 11 to Saturday 13 March 2027, at the Fan Park in the ICE District (more in the Edmonton section below). [editions.3] [venues[v4]]\n\nThe dates come from each city's home and line-up pages, read 24 October 2026. [editions.0.source] Montreal's About page, read the same day, still carried the 2026 season. [stale_or_contradictory.5]",
          },
          {
            id: "montreal",
            heading: "Montreal: the quay, the hours, 18 and over",
            body: "The Montreal site is the Quai Jacques-Cartier in the Old Port. The organiser names the quay but gives no street number. [venues[v1]] [venues[v1].note] There are two stages, the Sapporo Stage and the Videotron Stage, and an Igloovillage of activities and food trucks. [venues.v1.note] [tickets_detail.0] [tickets_detail.0b] The first set is at 19:30 every night. The night ends at 23:00 on Thursdays and at 00:30 on Fridays and Saturdays, according to the organiser's English FAQ. [editions.0.note] [hours_montreal] Entry is for those aged 18 and over, with photo ID. [age.0] [age.0.note] [age.0.shop]\n\nPlace-d'Armes and Champ-de-Mars metro stations, both on the orange line, are a few minutes' walk away, according to the organiser. [transport[Montréal, métro]] The last trains, the buses and the car parks are on [the Montreal page](/igloofest/en/montreal/). What to wear for a night outdoors in January, from the organiser's own list, is on [what to wear](/igloofest/en/what-to-wear/).",
          },
          {
            id: "lineup",
            heading: "Line-up: Montreal's twelve nights",
            body: "The organiser published Montreal's full line-up, with set times for all twelve nights, on Wednesday 21 October 2026. [lineup.announcedOn] [sources.s4en] One night came first: Saturday 23 January was announced on Monday 21 September 2026. [lineup.firstActsOn] [sources.s4b] KAYTRANADA closes the opening night, Thursday 14 January, from 22:00. [lineup.nights.0] Fatboy Slim plays on Thursday 21 January, KETTAMA on Friday 22 January, deadmau5 on Saturday 30 January and Boris Brejcha on Friday 5 February. [lineup.nights.3] [lineup.nights.4] [lineup.nights.8] [lineup.nights.10] Subtronics has the latest slot of the season, 23:15 on Saturday 6 February. [lineup.nights.11.sapporo] Two nights list \"Mystery guests\", Thursday 21 and Friday 29 January. [lineup.note]\n\nOn 24 October 2026 Gatineau's site said \"Lineup coming soon!\" Quebec City's named no act, and Edmonton's showed \"MYSTERY GUEST\" on all three nights. [editions[Gatineau 2027].note] [editions[Québec 2027].note] [editions[Edmonton 2027].note] Every Montreal night, stage by stage and set by set, is on [the line-up page](/igloofest/en/lineup/).",
          },
          {
            id: "abroad",
            heading: "Coming from abroad: passport and eTA",
            kind: "cards",
            cardsFor: true,
            body: "British citizens flying in need an eTA. US citizens and US permanent residents need none. [entry.0] [entry.1] [entry.5] The detail, passport by passport, is below.\n\n- **British citizens.** GOV.UK's entry requirements for Canada, last updated 2 June 2026, are written for holders of a full British citizen passport. The passport must be valid for the whole of the stay. [entry.0] [sources.s26] For a short visit, normally up to six months, you need no visa. Flying in, you need an electronic travel authorisation, the eTA, instead. Arriving by land or sea, you need no eTA. [entry.0] Border officers may ask for a return or onward ticket and for proof of funds. GOV.UK also warns that unauthorised websites charge for applications. [entry.0] [GOV.UK: Canada entry requirements](/go/igloofest-gov-uk/)\n- **The eTA.** You apply online, with a valid passport, a credit or debit card and an email address, according to the Government of Canada. [entry.1] [sources.s27] {{until prices}}It costs CAN$7. [entry.1]{{/until}} You need it to board a flight to Canada if your country is on its eTA list, and the UK is. You do not need it arriving by car, bus, train or boat. [entry.1] [sources.s28] [Government of Canada: the eTA](/go/igloofest-eta/)\n- **US citizens.** \"U.S. citizens are exempt from the eTA requirement and must carry proper identification such as a valid U.S. passport,\" according to the Government of Canada. [entry.5] [sources.s29] For US citizens, it recommends a valid passport as \"the only reliable and universally accepted travel and ID document\". Without one, and not flying, you can present identity documents that show your full name, date of birth and citizenship. [entry.2] [Government of Canada: who can apply for an eTA](/go/igloofest-eta-facts/)\n- **US permanent residents.** The same page exempts them from the eTA too. [entry.5] Flying in, they need a valid passport from their country of nationality and a valid green card. By land or water directly from the United States, the green card, or equivalent proof of status, is enough. [entry.3] [Government of Canada: what you need to enter Canada](/go/igloofest-canada-entry/)\n\nThe US State Department's travel pages are the other place to check. [entry.4]",
          },
          {
            id: "edmonton",
            heading: "Edmonton: the Fan Park, ICE District",
            body: "Igloofest Edmonton 2027 runs from Thursday 11 to Saturday 13 March 2027 at the Fan Park in the ICE District, Edmonton, Alberta. The organiser does not number this edition. [editions.3] [editions[Edmonton 2027].note] [venues[v4]] The address, 10128 - 104 Avenue NW, Edmonton, AB T5J 4Y8, is the one on Ticketmaster's page for the venue. The organiser's pages name only the park and the district. [venues[v4].address] [venues[v4].note] The line-up shows \"MYSTERY GUEST\" on all three nights. [editions[Edmonton 2027].note] [sources.s23b]\n\nThe organiser's English passes page says Igloopasses and tickets are sold through Ticketmaster alone, and online. Sales are final, with a refund if a night is postponed or cancelled. [edmonton_tickets] An Igloopass there covers all three evenings in general admission. It cannot be shared, and the holder's ID is checked. Ticketmaster takes major cards, PayPal, Venmo, Apple Pay, Google Pay and gift cards, according to the same page. [edmonton_tickets] On 24 October 2026 the \"BUY TICKETS\" button on the English site led to a Ticketmaster page with no events, and the French site's button to the Fan Park's venue page, with no Igloofest date. [sellers[2].en] [sellers[2]] No organiser page gives an age limit, a price or travel advice for Edmonton. [age.3] [transport.6] [edmonton_tickets] [Igloofest Edmonton: passes and tickets](/go/igloofest-edmonton-tickets/)\n\nAn Edmonton edition had been announced for 12–14 March 2026 on Montreal's About page. Igloofest Quebec's release of 12 November 2025 said only that Edmonton was joining the family that year. [editions[Edmonton 2026]] [editions[Edmonton 2026].dates_from] [editions[Edmonton 2026].s7_gives]",
          },
          {
            id: "past",
            heading: "Past editions",
            body: "The organiser bills Igloofest as \"the world's coldest music festival\", in the English words of its Gatineau site. Its Edmonton, Gatineau and Quebec City sites make the same claim in French. [gatineau_ottawa.winterlude_en] [event.tagline_claim] It has run since 2007. [event.since] In 2026 Montreal held its 18th edition, from Thursday 15 January to Saturday 7 February, over four weekends in the Old Port. [editions.4] [editions.4.note] [venue_2026_montreal] Gatineau has hosted the festival since 2025. In 2026 its headliners were Steve Aoki, Kaskade and BUNT. [editions[Gatineau 2025].note] [editions[Gatineau 2026]] Quebec City holds its fifth edition in 2027, after Tiësto, Miss Monique and deadmau5 in 2025 and Disclosure (DJ set), Zeds Dead and Chris Lake in 2026. [editions[Québec 2027].note] [editions[Québec 2025].note] [quebec_2026_lineup] Each city's past editions are on its own page.",
          },
        ],
        faqHeading: "Questions",
        faq: [
          {
            q: "When is Igloofest 2027?",
            a: "Montreal runs from Thursday 14 January to Saturday 6 February 2027, Thursday to Saturday over four weekends: 14–16 January, 21–23 January, 28–30 January and 4–6 February. Gatineau follows on 11–13 February, Quebec City on 4–6 March and Edmonton on 11–13 March. [editions.0] [editions.0.note] [editions[Gatineau 2027]] [editions[Québec 2027]] [editions.3] Source: the organiser's line-up and home pages for the four cities, read 24 October 2026. [sources.s1en] [sources.s9en] [sources.s6en] [sources.s23]",
          },
          {
            q: "What time does Igloofest start and finish?",
            a: "In Montreal the first set is at 19:30 every night. The night ends at 23:00 on Thursdays and at 00:30 on Fridays and Saturdays. [editions.0.note] [hours_montreal] Gatineau runs from 19:00 to 23:00, and Quebec City starts at 19:00. [editions[Gatineau 2027].note] [editions[Québec 2027].note] Source: the organiser's English Rules and FAQ and line-up pages for Montreal, and its Gatineau and Quebec City FAQs, read 24 October 2026. [sources.s5en] [sources.s1en] [sources.s14ben] [sources.s13b]",
          },
          {
            q: "What is the age limit at Igloofest?",
            a: "In Montreal, 18 and over, with photo ID. Quebec City is 16 and over. [age.0] [age[Québec]] Gatineau lets children 12 and under in free with a parent who holds a ticket. From the age of 13, a child needs a ticket, ID and a parent, one child per adult. [age[Gatineau]] Edmonton's pages give no age. [age.3] Source: the organiser's FAQs for Montreal, Quebec City and Gatineau and its Edmonton passes page, read 24 October 2026. [sources.s5en] [sources.s13b] [sources.s14ben] [sources.s23c]",
          },
          {
            q: "Is Igloofest outdoors?",
            a: "Yes. In the organiser's words, thousands of electronic music fans come every winter to dance under the stars in Montreal's Old Port. [event.kind_sentence] Its English FAQ's kit for the cold starts with a \"Very warm windproof winter coat\" and \"Snow pants\". [dress_code.en] Source: the organiser's Montreal FAQ, in French and in English, read 24 October 2026. [sources.s5] [sources.s5en]",
          },
          {
            q: "Is Igloofest a rave or an EDM festival?",
            a: "The organiser calls it a music festival, and its crowd electronic music fans: thousands of them, it says, come every winter to dance under the stars in Montreal's Old Port. [event.tagline_claim] [event.kind_sentence] The 2027 Montreal bill runs from KAYTRANADA and Fatboy Slim to deadmau5, Boris Brejcha and Subtronics. [lineup.nights.0] [lineup.nights.3] [lineup.nights.8] [lineup.nights.10] [lineup.nights.11] Source: the organiser's FAQ and its line-up, read 24 October 2026. [sources.s5] [sources.s1en]",
          },
          {
            q: "Do I need an eTA for Igloofest?",
            a: "It depends on your passport. Flying in on a British passport for a short visit, yes{{until prices}}, and it costs CAN$7{{/until}}. Arriving by land or sea, you need none. [entry.0] [entry.1] US citizens are exempt from the eTA and must carry proper identification, such as a valid US passport. US permanent residents are exempt too. Flying in, they show a valid passport and green card, and by land or water from the United States, the green card alone. [entry.5] [entry.2] [entry.3] Source: GOV.UK's entry requirements for Canada and the Government of Canada's eTA and entry pages, read 24 October 2026. [sources.s26] [sources.s27] [sources.s29] [sources.s28]",
          },
        ],
        sourcesHeading: "Sources",
        sourcesNote: "Read on 24 October 2026 unless another date is given.",
        sources: "- The organiser's Montreal site in English: [the 2027 line-up](/go/igloofest-lineup-en/), the \"2027 Lineup\" post of 21 October 2026, [Passes and tickets](/go/igloofest-tickets-en/), [Rules and FAQ](/go/igloofest-rules-en/), Location and transportation, and About us (still the 2026 text). [sources.s1en] [sources.s4en] [sources.s2en] [sources.s5en] [sources.s3en] [sources.s5ben]\n- Its French site: the FAQ's description of the festival, the About page's \"since 2007\" and the post of 21 September 2026 on the first night announced. [sources.s5] [sources.s5b] [sources.s4b]\n- [The organiser's ticket shop for Montreal 2027](/go/igloofest-shop/), billets.igloofest.ca, in English. [sources.s25]\n- [Igloofest Gatineau in English](/go/igloofest-gatineau-en/): home page and Rules and FAQ. [sources.s9en] [sources.s14ben]\n- [Igloofest Quebec in English](/go/igloofest-quebec-en/): home page, and its FAQ in French. [sources.s6en] [sources.s13b]\n- [Igloofest Edmonton in English](/go/igloofest-edmonton-en/): home, line-up and Passes & Tickets pages, and its French home page. [sources.s23] [sources.s23b] [sources.s23c] [sources.s12]\n- Ticketmaster Canada: the Fan Park at ICE District venue page and the Igloofest Edmonton page. [sources.s22] [sources.s22b]\n- The \"coldest music festival\" line on the organiser's Edmonton, Gatineau and Quebec City sites. [sources.s12] [sources.s11] [sources.s13c]\n- Past editions: Igloofest Quebec's releases of 20 November 2024 and 12 November 2025, Igloofest Gatineau's post of 23 October 2025, read 22 October 2026, and its posts of 12 November 2025 and 16 February 2026. [sources.s8] [sources.s7] [sources.s10] [sources.s10c] [sources.s10b]\n- GOV.UK, [Canada: entry requirements](/go/igloofest-gov-uk/), last updated 2 June 2026. [sources.s26]\n- Government of Canada, [the eTA](/go/igloofest-eta/), [who can apply for an eTA](/go/igloofest-eta-facts/) and [what you need to enter Canada](/go/igloofest-canada-entry/). [sources.s27] [sources.s29] [sources.s28]",
        foot: "fest.one is independent of Igloofest, Multicolore, Courage, Gestev, Ticketmaster and the transport companies.",
      },
      {
        slug: "igloofest/en/tickets",
        createdAt: "2026-10-24T12:20:00+04:00",
        updatedAt: "2026-10-24T16:30:00+04:00",
        kind: "tickets",
        label: "Tickets",
        crumb: "Tickets",
        navTitle: "Igloofest 2027 tickets and prices",
        title: "Igloofest 2027 tickets: prices by night — festival guide",
        description: "Igloofest 2027 tickets: Montreal prices night by night in CAD, fees and taxes, the sold-out Igloopass, VIP, refunds, other cities. Festival guide.",
        h1: "Igloofest 2027 tickets",
        lede: "Igloofest Montreal 2027 tickets are sold one night at a time by the organiser's own shop, billets.igloofest.ca, online only, and only tickets bought there are accepted. [sale_times.status] [sellers[0]] [sellers[0].terms] [sellers[0].note] {{until prices}}On 24 October 2026 general admission ran from CAD 49.00 to CAD 89.00 a night, service fees included and taxes extra. The five VIP areas ran from CAD 91.75 to CAD 166.75. [prices_nights.ranges] [prices_nights.terms] [prices_nights.areas]{{/until}} The Igloopass, all twelve nights in general admission, is sold out for 2027, according to the shop and the organiser's FAQ. [sales[Montréal Igloopasse].soldOut] [sales[Montréal Igloopasse].note]",
        jumps: [
          { id: "shop", label: "The shop" },
          { id: "prices", label: "{{until prices}}Prices by night{{/until}}" },
          { id: "igloopass", label: "Igloopass" },
          { id: "what-you-get", label: "General admission and VIP" },
          { id: "other-cities", label: "Other cities" },
          { id: "on-site", label: "Paying on the night" },
          { id: "questions", label: "Questions" },
          { id: "sources", label: "Sources" },
        ],
        sections: [
          {
            id: "shop",
            heading: "One shop, online only",
            body: "For Montreal the organiser is plain: \"Les SEULS billets acceptés doivent être achetés sur la billetterie d'Igloofest.\" Only tickets bought from its own shop are accepted. [sellers[0].note] The [English tickets page](/go/igloofest-tickets-en/) leads to that shop, billets.igloofest.ca, which sells online only. [sellers[0]] [sellers[0].terms] [sources.s2en] The door, in short, sells nothing.\n\nThe shop takes Visa and Mastercard, but not prepaid cards or Visa Debit. [sellers[0].terms] It allows six tickets per transaction at most, and warns that prices may change without notice. [prices_nights.terms] The organiser's FAQ says sales are final, with a refund if a night is postponed or cancelled. The shop's own line is shorter: no exchange, no refund. [sellers[0].terms] [prices_nights.terms] Your e-ticket comes by email. You download it in advance and show it on your phone, to be scanned as you enter. [sellers[0].terms]\n\nGatineau's English FAQ says the same in its own words, without naming a website: \"ONLY tickets purchased through Igloofest's ticketing platform will be accepted.\" Its tickets \"are only available online\". [gatineau_seller]",
          },
          {
            id: "prices",
            heading: "Montreal 2027: prices night by night",
            kind: "table",
            body: "{{until prices}}On 24 October 2026 the shop showed a price for each area on all twelve nights. [prices_nights.unpriced]{{/until}}\n\n{{until prices}}Lowest price shown per night, in CAD, service fees included, taxes extra, read 24 October 2026 [prices_nights.terms] [prices_nights.nights[2027-01-14].lowest] [prices_nights.nights[2027-01-15].lowest] [prices_nights.nights[2027-01-16].lowest] [prices_nights.nights[2027-01-21].lowest] [prices_nights.nights[2027-01-22].lowest] [prices_nights.nights[2027-01-23].lowest] [prices_nights.nights[2027-01-28].lowest] [prices_nights.nights[2027-01-29].lowest] [prices_nights.nights[2027-01-30].lowest] [prices_nights.nights[2027-02-04].lowest] [prices_nights.nights[2027-02-05].lowest] [prices_nights.nights[2027-02-06].lowest]{{/until}}\n\n{{until prices}}| Night | General admission | VIP areas | Baddie Zone |\n|---|---|---|---|\n| Thu 14 Jan | 89.00 | 125.25 | 207.00 |\n| Fri 15 Jan | 59.00 | 91.75 | 159.00 |\n| Sat 16 Jan | 59.00 | 91.75 | 159.00 |\n| Thu 21 Jan | 59.00 | 99.00 | 159.00 |\n| Fri 22 Jan | 69.00 | 101.00 | 169.00 |\n| Sat 23 Jan | 69.00 | 101.00 | 149.00 |\n| Thu 28 Jan | 59.00 | 91.75 | 149.00 |\n| Fri 29 Jan | 49.00 | 91.75 | 159.00 |\n| Sat 30 Jan | 79.00 | 116.00 | 237.00 |\n| Thu 4 Feb | 49.00 | 91.75 | 149.00 |\n| Fri 5 Feb | 79.00 | 125.25 | 207.00 |\n| Sat 6 Feb | 69.00 | 101.00 | 159.00 |{{/until}}\n\n{{until prices}}General admission comes in tiers, which the shop names Early Bird, Regular, Last Chance and Day of show. Where a night showed two prices, two tiers were on sale at once, and the table gives the lower. [prices_nights.tiers] The organiser's French tickets page puts it in one sentence: \"Les billets sont vendus par paliers progressifs pour nous permettre d'offrir des billets aux meilleurs prix à nos early birds.\" Prices rise in steps, and the earliest buyers pay least. [pricing_model] The shop's terms read \"Advertised prices include service fees. Taxes are extra.\" No page gives a tax rate. [prices_nights.terms] [not_found_added.7]{{/until}}\n\n{{until prices}}The five VIP areas are VIP - Sapporo, VIP - Multicolore, VIP - Intelcom, VIP - Poppers and VIP - Casino de Montréal. The NYX Cosmetics Baddie Zone is sold in two areas, Side Stage East and Side Stage West. [prices_nights.areas] Across the twelve nights the VIP areas went up to CAD 166.75, on the opening night and on Friday 5 February. The Baddie Zone went up to CAD 237.00 on those two nights and on Saturday 30 January. [prices_nights.ranges] [prices_nights.nights[2027-01-14]] [prices_nights.nights[2027-01-30]] [prices_nights.nights[2027-02-05]]{{/until}}\n\n{{until prices}}On 24 October 2026 the cheapest general admission, CAD 49.00, was for two nights: Friday 29 January, when the Sapporo Stage lists only \"Mystery guests\", and Thursday 4 February, with Fcukers. The dearest, CAD 89.00, was for the opening night, Thursday 14 January, with KAYTRANADA, and for Friday 5 February, with Boris Brejcha. [prices_nights.nights[2027-01-29]] [prices_nights.nights[2027-02-04]] [prices_nights.nights[2027-01-14]] [prices_nights.nights[2027-02-05]] [lineup.nights.7] [lineup.nights.9] [lineup.nights.0] [lineup.nights.10]{{/until}}\n\n{{until prices}}The cards on the organiser's English tickets page carry \"Starting at\" figures of their own. The table gives the shop's, with its fees included. [ticket_cards.english]{{/until}}",
          },
          {
            id: "igloopass",
            heading: "The Igloopass: sold out for 2027",
            body: "The Igloopass gives all twelve Montreal nights in general admission. It is individual and in the holder's name, and photo ID is checked at the entrance. [prices[Igloopasse]] [sales[Montréal Igloopasse].note] [sellers[0].terms.english_same] For 2027 it is sold out. On 24 October 2026 the shop listed \"Igloofest Montreal - Season Passes 2027\" as \"Sold Out\", and the English FAQ said \"Igloopasses for 2027 are now sold out.\" [sales[Montréal Igloopasse].soldOut] The French FAQ adds that the passes were for newsletter subscribers only, and asks you to sign up for next time. [sales[Montréal Igloopasse].note] Neither says on which day it sold out. {{until prices}}On 24 October 2026 the pass's card on the tickets page still read \"From $234.00\". [prices[Igloopasse]] [ticket_cards.english]{{/until}}",
          },
          {
            id: "what-you-get",
            heading: "General admission and VIP: what each includes",
            body: "A general-admission ticket covers the night you choose, the Sapporo and Videotron stages, the Igloovillage and a selection of bars. [tickets_detail.0] The ticket's card on the organiser's page adds the Igloovillage's activities and food trucks. [tickets_detail.0b]\n\nVIP keeps all of that and adds, on its card, fast entry, a heated terrace looking onto the main stage, heated private toilets, its own bars and optional bottle service. [tickets_detail.1b] The FAQ on the same page adds a heated indoor space. [tickets_detail.1] For bottle service, the card and the FAQ now give one address, groupe@multicolore.ca. [bottle_service]\n\nA guest with reduced mobility can swap a general-admission ticket for VIP access at customer service at the entrance, and a companion gets in free, according to the organiser's accessibility page. [tickets_detail.2] [sources.s15] Its English FAQ adds that there is no reserved section and that there are accessible toilets. [montreal_en_only.0] [Accessibility, igloofest.ca](/go/igloofest-accessibility-en/)",
          },
          {
            id: "other-cities",
            heading: "Gatineau, Quebec City and Edmonton",
            body: "Gatineau had opened no sale by 24 October 2026. Its [English home page](/go/igloofest-gatineau-en/) takes sign-ups for a presale. [sales.3] [sources.s9en] Its FAQ describes an Igloopass for all three nights, in general admission, which cannot be shared. Its VIP ticket has fast entry, bottle service, a terrace with heated toilets, a view of the stage and a heated indoor space. [gatineau_faq.igloopasse] [gatineau_faq.vip] Children 12 and under go free with a parent holding a ticket. [age[Gatineau]] [More on Gatineau](/igloofest/en/gatineau/)\n\nIgloofest Quebec's FAQ said only \"Les billets seront bientôt disponibles\", tickets will be available soon, on 24 October 2026. Its last two sales opened in November, through its own site, [quebec.igloofest.ca](/go/igloofest-quebec-en/). [sellers[1].note] [editions.6.note] [editions[Québec 2025].note] {{until prices}}For 2026, its English release of 12 November 2025 said \"Day passes will be available starting at $39 + tax.\" Nothing is announced for 2027. [prices.1.en] [prices.1] [prices.1.note]{{/until}} [More on Quebec City](/igloofest/en/quebec-city/)\n\nIn Edmonton, the organiser's [passes page](/go/igloofest-edmonton-tickets/) sends you to Ticketmaster, which listed no Igloofest date on 24 October 2026. [edmonton_tickets] [sellers[2].en] Edmonton's dates and venue are on [the main page](/igloofest/en/).",
          },
          {
            id: "on-site",
            heading: "Paying on the night",
            body: "In Montreal and Gatineau the organiser takes only credit and debit cards on site, according to their FAQs. Quebec City's FAQ says only that there is no cash machine on site. [payment_on_site.0] [payment_on_site.1] [payment_on_site.2] What to bring, bag sizes and the rules are on [what to wear](/igloofest/en/what-to-wear/).",
          },
        ],
        faqHeading: "Questions",
        faq: [
          {
            q: "How much are Igloofest tickets?",
            a: "In Montreal the organiser's shop prices each night separately, and sells in rising tiers. [sale_times.status] [pricing_model] {{until prices}}On 24 October 2026 it showed general admission from CAD 49.00 to CAD 89.00 a night, service fees included and taxes extra. The VIP areas ran from CAD 91.75 to CAD 166.75, and the Baddie Zone from CAD 149.00 to CAD 237.00. [prices_nights.ranges] [prices_nights.terms] {{/until}}The Igloopass is sold out. [sales[Montréal Igloopasse].soldOut] Gatineau, Quebec City and Edmonton had published no 2027 price. [not_found.4] [edmonton_tickets] Source: the organiser's shop, its English Passes and tickets page and its sites for the other three cities, read 24 October 2026. [sources.s25] [sources.s2en] [sources.s9en] [sources.s13b] [sources.s23c]",
          },
          {
            q: "When do Igloofest tickets go on sale?",
            a: "In Montreal the presale for newsletter and SMS subscribers was set for Thursday 22 October 2026 at 11:00, and the general sale for Friday 23 October 2026 at 11:00, Montreal time. On 24 October 2026 the shop was selling all twelve nights. [sale_times] [sales.0] [sales.1] [sale_times.status] Gatineau takes presale sign-ups on its home page. [sales.3] Quebec City's last two sales opened on 14 November 2025 and 22 November 2024. [editions.6.note] [editions[Québec 2025].note] Edmonton sends you to Ticketmaster, which had no Igloofest date. [sellers[2].en] Source: the organiser's English Passes and tickets page, its shop, its Gatineau and Edmonton sites and Igloofest Quebec's releases, read 24 October 2026. [sources.s2en] [sources.s25] [sources.s9en] [sources.s23c] [sources.s7] [sources.s8]",
          },
          {
            q: "Is the Igloopass sold out?",
            a: "Yes, for Montreal 2027. The shop lists the season passes as \"Sold Out\", and the organiser's English FAQ says \"Igloopasses for 2027 are now sold out.\" [sales[Montréal Igloopasse].soldOut] Neither says when it sold out. Gatineau describes an Igloopass of its own, for three nights, with no sale open on 24 October 2026. [gatineau_faq.igloopasse] [sales.3] Source: the organiser's shop and its English Passes and tickets page, and the Gatineau FAQ, read 24 October 2026. [sources.s25] [sources.s2en] [sources.s14ben]",
          },
          {
            q: "Is Igloofest free?",
            a: "No. Every night is paid for. [sellers[0]] [sellers.1] There are two exceptions. In Gatineau, children 12 and under get in free with a parent who holds a ticket. In Montreal, the companion of a guest with reduced mobility gets in free. [age[Gatineau]] [tickets_detail.2] Source: the Gatineau FAQ and the organiser's accessibility page, read 24 October 2026. [sources.s14ben] [sources.s15]",
          },
          {
            q: "How do Igloofest tickets work?",
            a: "In Montreal each ticket is for one night, bought online from the organiser's shop, billets.igloofest.ca. Only tickets bought there are accepted, and nothing is sold at the door. [sale_times.status] [sellers[0].note] [sellers[0].terms] Your e-ticket comes by email, and you show it on your phone, to be scanned as you enter. [sellers[0].terms] The shop allows six tickets per transaction at most. [prices_nights.terms] Source: the organiser's Passes and tickets page and its shop, read 24 October 2026. [sources.s2] [sources.s2en] [sources.s25] Who plays which night is on [the line-up page](/igloofest/en/lineup/).",
          },
          {
            q: "Can I get a refund?",
            a: "The organiser's FAQ says sales are final, with a refund only if a night is postponed or cancelled. The shop's terms say no exchange and no refund. [sellers[0].terms] [prices_nights.terms] Montreal is for those aged 18 and over, and the Igloopass is in the holder's name, which is worth knowing before buying for someone else. [age.0] [sales[Montréal Igloopasse].note] Source: the organiser's Passes and tickets page and its shop, read 24 October 2026. [sources.s2en] [sources.s25]",
          },
        ],
        sourcesHeading: "Sources",
        sourcesNote: "Read on 24 October 2026 unless another date is given.",
        sources: "- The organiser's [Passes and tickets page](/go/igloofest-tickets-en/) in English, and in French for the sentence on price tiers and the newsletter line. [sources.s2en] [sources.s2]\n- [The organiser's ticket shop for Montreal 2027](/go/igloofest-shop/), billets.igloofest.ca, in English: the list page and each night's page. [sources.s25]\n- The organiser's [Rules and FAQ](/go/igloofest-rules-en/) in English, its accessibility page, and its FAQ in French for payment on site. [sources.s5en] [sources.s15] [sources.s5]\n- Igloofest Gatineau: its [home page](/go/igloofest-gatineau-en/) and its FAQ, in English and in French. [sources.s9en] [sources.s14ben] [sources.s14b]\n- Igloofest Quebec: its FAQ, and its releases of 20 November 2024 and 12 November 2025, the second in French and in English. [sources.s13b] [sources.s8] [sources.s7] [sources.s7en]\n- Igloofest Edmonton: its [Passes & Tickets page](/go/igloofest-edmonton-tickets/), and Ticketmaster Canada's Igloofest Edmonton and Fan Park pages. [sources.s23c] [sources.s22b] [sources.s22]",
        foot: "fest.one is independent of Igloofest, Multicolore, Courage, Gestev, Ticketmaster and the transport companies.",
      },
      {
        slug: "igloofest/en/lineup",
        createdAt: "2026-10-24T12:20:00+04:00",
        updatedAt: "2026-10-24T12:20:00+04:00",
        kind: "lineup",
        label: "Line-up",
        crumb: "Line-up",
        navTitle: "Igloofest Montreal 2027 line-up by night",
        title: "Igloofest 2027 lineup by night — festival guide",
        description: "Igloofest 2027 lineup for Montreal: 12 nights, 14 January to 6 February, two stages, set times, KAYTRANADA, Fatboy Slim, deadmau5. Festival guide.",
        h1: "Igloofest 2027 line-up",
        lede: "Igloofest Montreal's 2027 line-up came out on Wednesday 21 October 2026: twelve nights from Thursday 14 January to Saturday 6 February 2027, on two stages, with a start time for every set. [lineup.announcedOn] [editions.0] [venues.v1.note] [sources.s4en] KAYTRANADA closes the opening night, Thursday 14 January. Fatboy Slim plays on Thursday 21 January, KETTAMA on Friday 22 January, deadmau5 on Saturday 30 January, Boris Brejcha on Friday 5 February and Subtronics on Saturday 6 February. [lineup.nights.0] [lineup.nights.3] [lineup.nights.4] [lineup.nights.8] [lineup.nights.10] [lineup.nights.11] The first set is at 19:30 every night. Gatineau, Quebec City and Edmonton had named no acts by 24 October 2026. [editions.0.note] [editions[Gatineau 2027].note] [editions[Québec 2027].note] [editions[Edmonton 2027].note]",
        jumps: [
          { id: "reading", label: "Reading the times" },
          { id: "weekend-1", label: "14–16 Jan" },
          { id: "weekend-2", label: "21–23 Jan" },
          { id: "weekend-3", label: "28–30 Jan" },
          { id: "weekend-4", label: "4–6 Feb" },
          { id: "other-cities", label: "Other cities" },
          { id: "questions", label: "Questions" },
          { id: "sources", label: "Sources" },
        ],
        sections: [
          {
            id: "reading",
            heading: "How to read the times",
            body: "The times are Montreal time, and they are start times. Each night runs in set order, earliest first, as the organiser lists it. [lineup.note] The organiser gives no time for the end of a set. [not_found_hours.set_end] Its English FAQ says the night ends at 23:00 on Thursdays and at 00:30 on Fridays and Saturdays. [hours_montreal] The Sapporo Stage has sets every night, and the Videotron Stage on nine of the twelve. On six of them it carries a night's name, kept here as printed: Ferias, AMPER, Pep Rally, Sun & Earth, KNTC and Hauterageous. [lineup.nights] [lineup.nights.0.videotron_label] [lineup.nights.1.videotron_label] [lineup.nights.4.videotron_label] [lineup.nights.8.videotron_label] [lineup.nights.10.videotron_label] [lineup.nights.11.videotron_label] Two nights, Thursday 21 and Friday 29 January, list \"Mystery guests\", unnamed on 24 October 2026. [lineup.note] How tickets work, one night at a time, is on [the tickets page](/igloofest/en/tickets/).",
          },
          {
            id: "weekend-1",
            heading: "Weekend 1: 14–16 January 2027",
            kind: "nights",
            body: "- Thursday 14 January 2027 — Sapporo Stage: Taima 19:30 · Lou Phelps (DJ set) 20:30 · KAYTRANADA 22:00. Videotron Stage (Ferias): silktits 19:30 · Make A Dance 20:45. [lineup.nights.0]\n- Friday 15 January 2027 — Sapporo Stage: The Holy 19:30 · Tini Gessler 21:30 · James Hype 23:00. Videotron Stage (AMPER): Prïa B2B Zac Martel B2B NAB 19:30. [lineup.nights.1]\n- Saturday 16 January 2027 — Sapporo Stage: Anna Wilder 19:30 · SAPIAN 21:00 · Chris Lorenzo 22:30. Videotron Stage: No Police 19:30 · Xia 20:30 · SALOME 21:30. [lineup.nights.2]\n\nThe opening night ends with KAYTRANADA from 22:00, an hour before the Thursday close at 23:00. [lineup.nights.0] [hours_montreal] James Hype starts at 23:00 on the Friday, and Chris Lorenzo at 22:30 on the Saturday. [lineup.nights.1] [lineup.nights.2] The Videotron Stage plays all three nights. [lineup.nights.0] [lineup.nights.1] [lineup.nights.2]",
          },
          {
            id: "weekend-2",
            heading: "Weekend 2: 21–23 January 2027",
            kind: "nights",
            body: "- Thursday 21 January 2027 — Sapporo Stage: Lia Plutonic 19:30 · Mystery guests 20:30 · Fatboy Slim 21:30. [lineup.nights.3]\n- Friday 22 January 2027 — Sapporo Stage: syd woz 19:30 · Elvis Guetta 20:30 · Robbie Doherty 21:30 · KETTAMA 23:00. Videotron Stage (Pep Rally): Chippy Nonstop b2b Nino Brown b2b Young Teesh 19:30. [lineup.nights.4]\n- Saturday 23 January 2027 — Sapporo Stage: Isla Den (DJ SET) 19:30 · MGNA Crrrta (DJ SET) 21:00 · Frost Children (DJ SET) 22:00 · Ninajirachi 23:00. Videotron Stage: Beamskii 19:30 · swedm® (Varg²™ + jamesjamesjames) 20:30 · Mowie B2B the bald girl 22:00. [lineup.nights.5]\n\nThursday 21 January has sets on the Sapporo Stage only: Lia Plutonic, the mystery guests, then Fatboy Slim from 21:30. [lineup.nights.3] Saturday 23 January was the first night announced, on 21 September 2026. Ninajirachi closes it from 23:00, the same start as KETTAMA's on the Friday. [lineup.nights.5] [lineup.firstActsOn] [lineup.nights.4] Whoever the mystery guests are, one assumes they will be dressed for the cold.",
          },
          {
            id: "weekend-3",
            heading: "Weekend 3: 28–30 January 2027",
            kind: "nights",
            body: "- Thursday 28 January 2027 — Sapporo Stage: V!A 19:30 · TONY ROMERA 20:30 · Mosimann 21:30. [lineup.nights.6]\n- Friday 29 January 2027 — Sapporo Stage: Mystery guests 19:30. Videotron Stage: DUZA 19:30 · Moti (CR) 20:30 · Chris Luno 21:30. [lineup.nights.7]\n- Saturday 30 January 2027 — Sapporo Stage: Claireyy 19:30 · TDJ 21:00 · deadmau5 22:30. Videotron Stage (Sun & Earth): Hicky & Kalo 19:30 · Rodriguez Jr. (DJ Set) 21:00. [lineup.nights.8]\n\nOn Friday 29 January the Sapporo Stage lists only \"Mystery guests\", from 19:30, and the night's three named sets are on the Videotron Stage. [lineup.nights.7] On Saturday 30 January, deadmau5 closes the night from 22:30. [lineup.nights.8]",
          },
          {
            id: "weekend-4",
            heading: "Weekend 4: 4–6 February 2027",
            kind: "nights",
            body: "- Thursday 4 February 2027 — Sapporo Stage: Field Note 19:30 · Marie Davidson (DJ Set) 20:00 · Fcukers (DJs) 21:30. [lineup.nights.9]\n- Friday 5 February 2027 — Sapporo Stage: Kolophane 19:30 · DREYA V 21:30 · Boris Brejcha 23:00. Videotron Stage (KNTC): Dimitry b2b Lara Bee 19:30 · tINI 21:00. [lineup.nights.10]\n- Saturday 6 February 2027 — Sapporo Stage: NAË 19:30 · Taiki Nulight 21:30 · Subtronics 23:15. Videotron Stage (Hauterageous): HŸDRA 19:30 · Siren Mars 20:45 · Miss Bashful 22:15. [lineup.nights.11]\n\nThe last weekend ends on Saturday 6 February with the latest set of the season, Subtronics, from 23:15 on the Sapporo Stage. On the Videotron Stage, Miss Bashful starts at 22:15. [lineup.nights.11] The night ends at 00:30, according to the organiser's English FAQ. [hours_montreal] The last trains are on [the Montreal page](/igloofest/en/montreal/).",
          },
          {
            id: "other-cities",
            heading: "Gatineau, Quebec City, Edmonton: no line-up by 24 October 2026",
            body: "Gatineau's site said \"Lineup coming soon!\" for 11–13 February 2027. [editions[Gatineau 2027].note] [sources.s9en] Quebec City's named no artist for 4–6 March 2027. [editions[Québec 2027].note] [sources.s6en] Edmonton's showed \"MYSTERY GUEST\" on each of its three nights, 11–13 March 2027. [editions[Edmonton 2027].note] [sources.s23b]\n\nEarlier announcements are dated. Gatineau 2026, announced on 12 November 2025, had Swimming Paul and DJ Mandy on the bill and three headliners: Steve Aoki, Kaskade and BUNT. [editions[Gatineau 2026]] Quebec City 2026 had nine DJs, headed by Disclosure (DJ set), Zeds Dead and Chris Lake, announced the same day. [quebec_2026_lineup] [editions.6.note] Quebec City 2025 had Tiësto, Miss Monique and deadmau5, announced on 20 November 2024. [editions[Québec 2025].note] The dates for each city are on [the main page](/igloofest/en/).",
          },
        ],
        faqHeading: "Questions",
        faq: [
          {
            q: "Who is playing Igloofest 2027?",
            a: "In Montreal the names include KAYTRANADA on Thursday 14 January, James Hype on Friday 15 January, Fatboy Slim on Thursday 21 January and KETTAMA on Friday 22 January. Then come Ninajirachi on Saturday 23 January, deadmau5 on Saturday 30 January, Boris Brejcha and tINI on Friday 5 February, and Subtronics on Saturday 6 February. [lineup.nights.0] [lineup.nights.1] [lineup.nights.3] [lineup.nights.4] [lineup.nights.5] [lineup.nights.8] [lineup.nights.10] [lineup.nights.11] Gatineau, Quebec City and Edmonton had named no acts. [editions[Gatineau 2027].note] [editions[Québec 2027].note] [editions[Edmonton 2027].note] Source: the organiser's line-up pages for the four cities, read 24 October 2026. [sources.s1en] [sources.s9en] [sources.s6ben] [sources.s23b]",
          },
        ],
        sourcesHeading: "Sources",
        sourcesNote: "Read on 24 October 2026 unless another date is given.",
        sources: "- The organiser's [2027 Montreal line-up](/go/igloofest-lineup-en/), \"Week-End 1\" to \"Week-End 4\", in English and in French, and its post \"IGLOOFEST MTL | 2027 Lineup\" of 21 October 2026. Artists' names are spelled here as the French pages spell them. The English pages differ in capitals, print \"Lou Phelps\" without \"(DJ set)\" and \"Mystery guest\" in the singular. [sources.s1en] [sources.s1] [sources.s4en] [lineup.casing] [lineup_casing_en]\n- Its post of 21 September 2026 on the 23 January night. [sources.s4b]\n- Its [Rules and FAQ](/go/igloofest-rules-en/) in English, for the closing hours. [sources.s5en]\n- The home and line-up pages of the organiser's Gatineau, Quebec City and Edmonton sites. [sources.s9en] [sources.s6en] [sources.s6ben] [sources.s23b]\n- Past line-ups: Igloofest Gatineau's announcement of 12 November 2025, Igloofest Quebec's releases of 20 November 2024 and 12 November 2025, and its page \"L'expérience\". [sources.s10c] [sources.s8] [sources.s7] [sources.s13c]",
        foot: "fest.one is independent of Igloofest, Multicolore, Courage, Gestev, Ticketmaster and the transport companies.",
      },
      {
        slug: "igloofest/en/montreal",
        createdAt: "2026-10-24T12:20:00+04:00",
        updatedAt: "2026-10-24T12:20:00+04:00",
        kind: "dates",
        label: "Montreal",
        crumb: "Montreal",
        navTitle: "Montreal: dates, hours, venue and metro",
        title: "Igloofest Montreal 2027: dates, metro — festival guide",
        description: "Igloofest Montreal 2027 on the Quai Jacques-Cartier, 14 Jan – 6 Feb: 12 nights, 19:30 to 23:00 or 00:30, last metro, buses, the 747. Festival guide.",
        h1: "Igloofest Montreal 2027",
        lede: "Igloofest Montreal 2027 runs from Thursday 14 January to Saturday 6 February 2027 on the Quai Jacques-Cartier in Montreal's Old Port (Jacques-Cartier Pier on the organiser's English pages): twelve nights, Thursday to Saturday over four weekends. [editions.0] [editions.0.note] [venues[v1]] [venues[v1].en] [sources.s3en] The first set is at 19:30. The organiser's English FAQ puts the end at 23:00 on Thursdays and at 00:30 on Fridays and Saturdays. [editions.0.note] [hours_montreal] The site has two stages and an Igloovillage, a few minutes' walk from Place-d'Armes and Champ-de-Mars metro stations, on the orange line. [venues.v1.note] [transport[Montréal, métro]] Who plays which night is on [the line-up page](/igloofest/en/lineup/).",
        sections: [
          {
            id: "nights",
            heading: "The twelve nights and their hours",
            body: "- Weekend 1: Thursday 14, Friday 15 and Saturday 16 January 2027. [editions.0.note]\n- Weekend 2: Thursday 21, Friday 22 and Saturday 23 January 2027. [editions.0.note]\n- Weekend 3: Thursday 28, Friday 29 and Saturday 30 January 2027. [editions.0.note]\n- Weekend 4: Thursday 4, Friday 5 and Saturday 6 February 2027. [editions.0.note]\n\nThe organiser's English FAQ answers the question of hours in one line: \"Join us from 7:30pm to 11pm on Thursdays, and from 7:30pm to 12:30am on Fridays and Saturdays.\" [hours_montreal] The French FAQ gives no hours. [not_found_hours.fr_faq] The latest set of the season starts at 23:15 on Saturday 6 February. [lineup.nights.11.sapporo] A Montreal ticket is for one night, from the one shop the organiser accepts, and entry is for those aged 18 and over with photo ID. [sellers[0].note] [age.0] [age.0.note] The rest is on [the tickets page](/igloofest/en/tickets/).",
          },
          {
            id: "quay",
            heading: "The Quai Jacques-Cartier",
            body: "The organiser names the quay but not a street number: Quai Jacques-Cartier, Old Port of Montreal. [venues[v1]] [venues[v1].note] [not_found.3] On 24 October 2026 its French transport page still said the site map was \"Bientôt dévoilé\", coming soon. The English page has no site-map line. [venues[v1].site_map] It gives no count of entrances. [venues[v1].note] Its accessibility page names a VIP entrance on the west platform, and a central aisle that serves as the exit at the end of the night. [venues[v1].note] [sources.s15] There is no cloakroom in Montreal. [banned_items[Montréal].closing] The festival is outdoors, on the quay, in January and February. What to wear and what to bring are on [what to wear](/igloofest/en/what-to-wear/). [Find the Quai Jacques-Cartier on Google Maps](/go/igloofest-maps-montreal/)",
          },
          {
            id: "metro",
            heading: "By metro: orange line, Place-d'Armes or Champ-de-Mars",
            body: "Both stations are a few minutes' walk from the site, according to the organiser's FAQ. [transport[Montréal, métro]] Its Location and transportation page lists the last trains, under \"Last subway passage\". [transport.0.last_trains]\n\n- Place-d'Armes, towards Montmorency: 00:51, or 01:21 on Saturdays. Towards Côte-Vertu: 01:00, or 01:30 on Saturdays. [transport.0.last_trains]\n- Champ-de-Mars, towards Montmorency: 00:52, or 01:22 on Saturdays. Towards Côte-Vertu: 00:59, or 01:29 on Saturdays. [transport.0.last_trains]\n\nThe page does not say whether Saturday means the night from Friday into Saturday or the night from Saturday into Sunday. [stale_or_contradictory.2] On a Friday or a Saturday the night ends at 00:30, and the earliest of these trains leaves 21 minutes later. [hours_montreal] [transport.0.last_trains] These are the organiser's times. They have not been checked against the timetable of the [STM](/go/igloofest-stm/), Montreal's transport authority. [transport[Montréal, métro].note] [sources.s18] Check them there before relying on the last train.",
          },
          {
            id: "bus-train-car",
            heading: "By bus, train, coach or car",
            body: "The organiser names three bus routes. [transport.1]\n\n- 55 Saint-Laurent, stop Saint-Laurent / Saint-Jacques\n- 715 Vieux-Montréal / Vieux-Port, stop Notre-Dame / De Bonsecours\n- 361 Saint-Denis, a night bus, stop Place Jacques-Cartier\n\nFrom Montréal-Trudeau airport it names the shuttle to the city centre, the 747 YUL Aéroport Montréal-Trudeau / Centre-Ville. [transport[Montréal, YUL]] By train, VIA Rail and Amtrak use the Gare centrale, at Bonaventure metro. By coach, the Gare d'autocars de Montréal is at Berri-UQAM metro. [transport.3] By car, rue de la Commune, rue Berri and boulevard Saint-Laurent lead to the Old Port's entrances and car parks, and the organiser names car parks at the Quai de l'Horloge and the Quai King-Edward. [transport.3] [venues[v1].note] All of this is on its [Location and transportation page](/go/igloofest-transport-en/).",
          },
          {
            id: "past",
            heading: "Past editions in Montreal",
            body: "In 2026 Montreal held its 18th edition, from Thursday 15 January to Saturday 7 February, over four weekends in the Old Port, as in 2027. [editions.4] [editions.4.note] [venue_2026_montreal] The organiser gives the 2027 edition no number. [not_found.6] The festival began in 2007. [event.since] Gatineau, Quebec City and Edmonton are on [the main page](/igloofest/en/).",
          },
        ],
        faqHeading: "Questions",
        faq: [
          {
            q: "How do I get to Igloofest Montreal?",
            a: "By metro, on the orange line, to Place-d'Armes or Champ-de-Mars, a few minutes' walk from the Quai Jacques-Cartier. By bus, on the 55, the 715 or, at night, the 361. From the airport, on the 747 shuttle. By car, to the car parks at the Quai de l'Horloge and the Quai King-Edward. [transport[Montréal, métro]] [transport.1] [transport[Montréal, YUL]] [transport.3] Source: the organiser's English Rules and FAQ and Location and transportation pages, read 24 October 2026. [sources.s5en] [sources.s3en]",
          },
          {
            q: "When is the last metro after Igloofest?",
            a: "According to the organiser's page, the last trains leave Place-d'Armes at 00:51 towards Montmorency and 01:00 towards Côte-Vertu, or 01:21 and 01:30 on Saturdays. From Champ-de-Mars they leave at 00:52 towards Montmorency and 00:59 towards Côte-Vertu, or 01:22 and 01:29 on Saturdays. [transport.0.last_trains] The page does not say which night Saturday means, and the times have not been checked against the STM's. [stale_or_contradictory.2] [transport[Montréal, métro].note] Source: the organiser's Location and transportation page, in English and in French, read 24 October 2026. [sources.s3en] [sources.s3]",
          },
          {
            q: "What time does Igloofest end?",
            a: "In Montreal, at 23:00 on Thursdays and at 00:30 on Fridays and Saturdays, according to the organiser's English FAQ. The first set is at 19:30 every night. [hours_montreal] [editions.0.note] Gatineau's nights end at 23:00. [editions[Gatineau 2027].note] Source: the organiser's English Rules and FAQ and its Gatineau FAQ, read 24 October 2026. [sources.s5en] [sources.s14ben]",
          },
        ],
        sourcesHeading: "Sources",
        sourcesNote: "Read on 24 October 2026 unless another date is given.",
        sources: "- The organiser's [Location and transportation page](/go/igloofest-transport-en/), in English and in French: last trains, buses, the 747, train, coach, car parks and, in French only, the site map to come. [sources.s3en] [sources.s3]\n- Its [Rules and FAQ](/go/igloofest-rules-en/) in English: the stations, the hours, 18 and over, the cloakroom. [sources.s5en]\n- Its [2027 line-up](/go/igloofest-lineup-en/): dates and first sets. [sources.s1en]\n- Its accessibility page, and its About page, still the 2026 text. [sources.s15] [sources.s5ben] [sources.s5b]\n- Its English Location and transportation page, for the name Jacques-Cartier Pier. [sources.s3en]\n- The STM, which the organiser names. The quay's map coordinates come from OpenStreetMap. [sources.s18] [sources.s17]",
        foot: "fest.one is independent of Igloofest, Multicolore, Courage, Gestev, Ticketmaster and the transport companies.",
      },
      {
        slug: "igloofest/en/what-to-wear",
        createdAt: "2026-10-24T12:20:00+04:00",
        updatedAt: "2026-10-24T12:20:00+04:00",
        kind: "faq",
        label: "What to wear",
        crumb: "What to wear",
        navTitle: "What to wear, what to bring and the rules",
        title: "What to wear to Igloofest 2027 — festival guide",
        description: "What to wear to Igloofest 2027: the organiser's kit for the cold, what to bring, what Montreal, Gatineau and Quebec City ban, bags, cloakrooms. Festival guide.",
        h1: "What to wear to Igloofest 2027",
        lede: "For a night outdoors, the organiser's English FAQ offers \"the perfect kit for warriors of the cold\": a very warm windproof winter coat, snow pants, a beanie, mittens, boots, warm socks and a spare pair, a scarf, neck warmer or balaclava, and foot and hand warmers. [dress_code.en] It is written for Montreal's twelve nights, from Thursday 14 January to Saturday 6 February 2027. Gatineau follows in February, and Quebec City and Edmonton in March, outdoors too. [editions.0] [editions[Gatineau 2027]] [editions[Québec 2027]] [editions.3] Below are the list in the organiser's words, what to bring, everything Montreal bans, and what Gatineau and Quebec City say about bags, cloakrooms, payment and the weather. [rules_cold_weather.1] [banned_items[Montréal]] [banned_items[Gatineau]] [banned_items[Québec]]",
        jumps: [
          { id: "cold", label: "Against the cold" },
          { id: "bring", label: "What to bring" },
          { id: "banned-montreal", label: "Banned in Montreal" },
          { id: "gatineau", label: "Gatineau" },
          { id: "quebec", label: "Quebec City" },
          { id: "safety", label: "Safety" },
          { id: "questions", label: "Questions" },
          { id: "sources", label: "Sources" },
        ],
        sections: [
          {
            id: "cold",
            heading: "The organiser's kit against the cold",
            body: "The Montreal FAQ in English lists eight things, under \"Here is the perfect kit for warriors of the cold\". [dress_code.en] [sources.s5en]\n\n- \"Very warm windproof winter coat\"\n- \"Snow pants\" (snow trousers, in British English)\n- \"Beanie\"\n- \"Mittens (they're warmer than gloves!)\"\n- \"Boots (no shoes, please, boots!)\"\n- \"Warm socks (+ a second pair just in case)\"\n- \"Scarf, neck warmer, or balaclava to cover your beautiful face\"\n- \"Foot warmers and hand warmers\"\n\nThe French FAQ gives the same eight, with a tuque for the beanie. [dress_code.fr] [rules_cold_weather.0] In the English FAQ the list sits under the question \"Is there a dress code?\", which it answers \"No.\" The answer is about gender: \"Our event does not have a gender-specific dress code.\" [dress_code.en]\n\nIts answer to \"What should I bring on site?\" gives clothing a single line: \"Clothing adapted to the temperature (hat, gloves and boots necessary for an incredible evening)\". Gatineau's bring list says the same. [dress_code.en] [gatineau_faq.bring]\n\nFor the 2026 Montreal edition the organiser ran a competition for the most improbable snowsuit, the Iglooswag, announced on 19 December 2025. Nothing had been announced for 2027 by 24 October 2026. [rules_cold_weather.7] [sources.s16en] Improbability, it seems, is encouraged.",
          },
          {
            id: "bring",
            heading: "What to bring",
            body: "The Montreal FAQ names five things, in this order: photo ID (driving licence, passport or health card), a reusable water bottle, clothes suited to the temperature, a small umbrella, and a small bag, which is searched at the entrance. [rules_cold_weather.1] Gatineau's FAQ gives the same list without the umbrella. [gatineau_faq.bring] [banned_items[Gatineau].differs_from_montreal] In Montreal and Gatineau you pay on site by credit or debit card only, according to their FAQs. [payment_on_site.0] [payment_on_site.1]",
          },
          {
            id: "banned-montreal",
            heading: "What Montreal bans: the organiser's list",
            body: "The Montreal FAQ warns that every festival-goer and every bag is searched at the entrance, then gives its list. [banned_items[Montréal].header]\n\n- animals, except identified and accredited assistance dogs\n- cameras 8 inches or longer, with accessories (detachable lenses, flash, tripods). Smaller cameras are allowed.\n- knives, blunt objects, chains (wallet chains too), spikes and anything else that can be used as a weapon\n- backpacks, cool bags, sports bags, camping or framed bags of any size, and any other bag over 35 cm × 35 cm × 15.25 cm\n- alcoholic drinks\n- motorbike or bicycle helmets\n- portable and folding chairs of any kind\n- glass containers\n- high-visibility vests or safety clothing\n- drugs and drug paraphernalia, except prescription medicines in their original container with the prescription\n- video or audio recording equipment of any kind: drones, camera stands, selfie sticks, microphones, tripods and the like\n- fireworks, confetti, sparklers or bangers\n- musical instruments (megaphones, speakers, whistles)\n- war bonnets or First Nations headdresses\n- promotional material and flyers in bulk\n- equipment, containers or objects powered by compressed air or pressurised propellant\n- food and drink\n- umbrellas\n- laser pointers\n- tents\n- bicycles, skateboards and skates\n- and any other object the organiser judges dangerous or harmful. [banned_items[Montréal].items] [drugs_line]\n\nThe English FAQ adds one line of its own on cameras: \"Small recording devices allowed only (less than 8 inches).\" [montreal_en_only.1] Anyone carrying a banned item is refused entry unless they leave it in the bins provided. There is no cloakroom or left luggage in Montreal. [banned_items[Montréal].closing]\n\nOn umbrellas the page contradicts itself. It lists an umbrella among banned items and a small umbrella among things to bring. Only the organiser can settle it, at info@igloofest.ca. [stale_or_contradictory.3] [rules_cold_weather.1] [sellers[0].terms] [Montreal: the quay and the last metros](/igloofest/en/montreal/)",
          },
          {
            id: "gatineau",
            heading: "Gatineau: nearly the same list",
            body: "Gatineau's FAQ keeps Montreal's list, with the same search of people and bags, and three main differences. [banned_items[Gatineau]] Any camera with a detachable lens counts as professional and is refused, whatever its size. Animals are not on the list, but a separate answer allows only identified and accredited assistance dogs, with proof asked for at the entrance. Umbrellas are banned outright, and its bring list names no small umbrella to contradict it. [banned_items[Gatineau].differs_from_montreal] [banned_items[Gatineau].animals] Its line on recording equipment does not name microphones. [banned_items[Gatineau].items] There is no cloakroom in Gatineau either. [gatineau_faq.cloakroom] A harm-reduction team from the Euphorie group is on site at all times. [gatineau_harm_reduction] The age rules differ by city: 18 and over in Montreal, 16 and over in Quebec City, children with a parent in Gatineau. [age.0] [age[Québec]] [age[Gatineau]] [More on Gatineau](/igloofest/en/gatineau/)",
          },
          {
            id: "quebec",
            heading: "Quebec City: handbags searched, a cloakroom, no re-entry",
            body: "Igloofest Quebec's FAQ, in French, starts with bags. Every handbag is searched, no bottle gets in, and no bag over 35 cm × 35 cm × 15.25 cm is allowed. There is a cloakroom at the entrance. [banned_items[Québec].header] [quebec_faq.bags] Its banned list is close to Montreal's, with lines of its own. Motorbike and bicycle helmets go to the cloakroom at the entrance. Street-gang-style clothing is refused. Smoking or vaping cannabis is banned on the Place Jean-Béliveau site. Animals are banned, guide dogs accepted. [banned_items[Québec]] [quebec_faq.helmets] [quebec_faq.gang_clothing] [quebec_faq.cannabis_site] There is no re-entry: once you leave the site, you cannot come back in. [quebec_faq.reentry]\n\nThe shows go ahead \"beau temps mauvais temps\", rain or shine. They are cancelled only if the weather turns dangerous, and the night's status goes on the festival's Facebook page. [quebec_faq.weather] On payment, this FAQ says only that there is no cash machine on site. [payment_on_site.2] No weather policy appeared on the Montreal, Gatineau or Edmonton pages read on 21 October 2026. [not_found_added.4] [More on Quebec City](/igloofest/en/quebec-city/)",
          },
          {
            id: "safety",
            heading: "Safety, consent and cannabis",
            body: "According to the organiser's FAQ, a harm-reduction team from GRIP works in Montreal from the indoor Scéna space. The same FAQ sets out a consent policy, which is worth reading on its [Rules and FAQ page](/go/igloofest-rules-en/). [rules_cold_weather.6] On cannabis, the Montreal, Gatineau and Quebec City FAQs say in the same words that the law bans smoking or vaping it in all public places. Since 1 January 2020, under-21s may neither buy nor possess it. [cannabis]",
          },
        ],
        faqHeading: "Questions",
        faq: [
          {
            q: "What should I wear to Igloofest?",
            a: "The organiser's English FAQ recommends a \"Very warm windproof winter coat\", \"Snow pants\", a \"Beanie\", \"Mittens (they're warmer than gloves!)\", boots rather than shoes, warm socks and a second pair, a scarf, neck warmer or balaclava, and foot and hand warmers. [dress_code.en] Asked whether there is a dress code, it answers \"No\" and explains that the event has no gender-specific dress code. [dress_code.en] Source: the organiser's Montreal Rules and FAQ, read 24 October 2026. [sources.s5en]",
          },
          {
            q: "What can't I bring to Igloofest?",
            a: "In Montreal the list includes backpacks and any bag over 35 cm × 35 cm × 15.25 cm, alcohol, food and drink, glass, umbrellas and chairs. It also bans cameras 8 inches or longer, drones, tripods and selfie sticks, laser pointers, fireworks, bicycles and skates, animals except assistance dogs, and First Nations headdresses. The organiser's full list is above. [banned_items[Montréal].items] In Quebec City large bags are refused, but there is a cloakroom. In Gatineau any camera with a detachable lens is refused. [quebec_faq.bags] [banned_items[Gatineau].differs_from_montreal] Source: the FAQs for Montreal, Quebec City and Gatineau, read 24 October 2026. [sources.s5en] [sources.s13b] [sources.s14ben]",
          },
          {
            q: "Is there a cloakroom at Igloofest?",
            a: "Not in Montreal and not in Gatineau: both FAQs say there is no cloakroom or left luggage. Quebec City has a cloakroom at the entrance. [banned_items[Montréal].closing] [gatineau_faq.cloakroom] [quebec_faq.bags] Source: the three FAQs, read 24 October 2026. [sources.s5en] [sources.s14ben] [sources.s13b]",
          },
          {
            q: "Is Igloofest cancelled in bad weather?",
            a: "Quebec City's FAQ says the shows go ahead rain or shine, and are cancelled only if the weather turns dangerous, with the night's status on the festival's Facebook page. [quebec_faq.weather] The Montreal, Gatineau and Edmonton pages read on 21 October 2026 gave no weather policy. [not_found_added.4] Source: Igloofest Quebec's FAQ, read 24 October 2026. [sources.s13b]",
          },
        ],
        sourcesHeading: "Sources",
        sourcesNote: "Read on 24 October 2026 unless another date is given.",
        sources: "- The organiser's Montreal [Rules and FAQ](/go/igloofest-rules-en/), in English and in French: the kit for the cold, the dress-code answer, what to bring, banned items, the cloakroom, GRIP and consent, cannabis and payment. [sources.s5en] [sources.s5]\n- [The Gatineau Rules and FAQ](/go/igloofest-gatineau-faq-en/): what to bring, banned items, assistance dogs, the cloakroom, Euphorie, payment. [sources.s14ben] [sources.s14b]\n- [The Quebec City FAQ](/go/igloofest-quebec-faq/), in French: bags, the cloakroom, re-entry, the weather, cash machines, helmets, cannabis. [sources.s13b]\n- The organiser's Montreal news page, for the 2026 Iglooswag of 19 December 2025. [sources.s16en] [sources.s16]",
        foot: "fest.one is independent of Igloofest, Multicolore, Courage, Gestev, Ticketmaster and the transport companies.",
      },
      {
        slug: "igloofest/en/quebec-city",
        createdAt: "2026-10-24T12:20:00+04:00",
        updatedAt: "2026-10-24T12:20:00+04:00",
        kind: "quebec",
        label: "Quebec City",
        crumb: "Quebec City",
        navTitle: "Igloofest Quebec 2027",
        title: "Igloofest Quebec City 2027: dates, venue — festival guide",
        description: "Igloofest Quebec City 2027 at the Place Jean-Béliveau, ExpoCité, 4–6 March, from 19:00, 16 and over: tickets, RTC buses, parking, cloakroom. Festival guide.",
        h1: "Igloofest Quebec 2027",
        lede: "Igloofest Quebec 2027 runs from Thursday 4 to Saturday 6 March 2027 at the Place Jean-Béliveau, ExpoCité, 250 boulevard Wilfrid-Hamel, Quebec City, from 19:00 each night. [editions[Québec 2027]] [editions[Québec 2027].note] [venues.v2] It is the city's fifth edition, for those aged 16 and over, produced by Gestev and Multicolore. [editions[Québec 2027].note] [age[Québec]] [event.organiser] On 24 October 2026 the organiser had announced neither a line-up nor a ticket sale. [editions[Québec 2027].note] [sellers[1].note] Its English site has no FAQ or travel page, so the answers below come from the French ones, given here in English. [sources.s6en]",
        sections: [
          {
            id: "tickets",
            heading: "Tickets: what the Quebec City FAQ says",
            body: "The organiser's only line on 2027 tickets, in its French FAQ, is \"Les billets seront bientôt disponibles\", tickets will be available soon. The last two sales went through its own site, [quebec.igloofest.ca](/go/igloofest-quebec-en/). [sellers[1].note] For 2026 the release came on Wednesday 12 November 2025, with a presale on Thursday 13 November at 11:00 and the general sale on Friday 14 November at 11:00. [editions.6.note] For 2025 it came on Wednesday 20 November 2024, with a presale on Thursday 21 November and the sale on Friday 22 November, both at 10:00. [editions[Québec 2025].note] {{until prices}}Day passes for 2026 started at CAD 39 plus tax: \"Day passes will be available starting at $39 + tax,\" the English release of 12 November 2025 said. Nothing is announced for 2027. [prices.1.en] [prices.1] [prices.1.note]{{/until}}\n\nThe VIP ticket includes fast entry, an exclusive terrace, heated toilets, a heated area and a view of the main stage. [tickets_detail.4] There is no re-entry: \"Si vous sortez du site, il vous sera impossible d'entrer à nouveau.\" Once out, you stay out. [quebec_faq.reentry] Photo ID may be asked for when buying alcohol on site. [quebec_faq.food_drink] How the Montreal shop works, with its card and refund rules, is on [the tickets page](/igloofest/en/tickets/).",
          },
          {
            id: "venue",
            heading: "The Place Jean-Béliveau at ExpoCité",
            body: "The Place Jean-Béliveau is a public square at the heart of ExpoCité, beside the Centre Vidéotron, the Pavillon de la Jeunesse and the Grand Marché de Québec. Its address is 250 boulevard Wilfrid-Hamel, Quebec City, QC G1L 5A7. [venues.v2] [venues.v2.note] The festival starts at 19:00 each night. [editions[Québec 2027].note] A zone is set aside for people with reduced mobility, with toilets for them, and there are several toilets on site. [quebec_faq.mobility] [quebec_faq.toilets] [Find the Place Jean-Béliveau on Google Maps](/go/igloofest-maps-quebec/)",
          },
          {
            id: "on-site",
            heading: "On site: food, drink, bags, lost property",
            body: "The FAQ answers what people ask before a night outdoors in March. There is food on site, and \"une sélection de breuvages, alcoolisés et non alcoolisés\", alcoholic and soft drinks, at marked points. Food and alcohol from outside are not allowed. [quebec_faq.food_drink] Merchandise is sold on site. [quebec_faq.merchandise] There is no cash machine, and the FAQ says nothing else about paying. [quebec_faq.atm] [payment_on_site.2] Bags over 35 cm × 35 cm × 15.25 cm are refused, but there is a cloakroom at the entrance, where motorbike and bicycle helmets are left too. [quebec_faq.bags] [quebec_faq.helmets]\n\nFor lost property the FAQ points to an online form, titled \"2026 IGF- Objets perdus\" on 24 October 2026. [quebec_faq.lost_property] The shows go ahead rain or shine, and are cancelled only if the weather turns dangerous. The night's status goes on the festival's Facebook page. [quebec_faq.weather] Questions go to info@gestev.com. [quebec_faq.contact] The full list of what Quebec City bans, and how it differs from Montreal's, is on [what to wear](/igloofest/en/what-to-wear/).",
          },
          {
            id: "transport",
            heading: "By RTC bus, coach or car",
            body: "The organiser names these RTC routes. [transport.4]\n\n- 802, stop Centre de Foires\n- 64, 74, 82 and 84 from the city centre, stop \"François-1re\", as the organiser spells it\n- 4, stop Daniel\n- 3 and 801, stop 18e Rue, or the 64, 74, 82 and 84 at stop Fleur-de-Lys\n\nBy car, the organiser's FAQ names the Centre Vidéotron car park. [transport.4] [sources.s13b] {{until prices}}It costs CAD 15 per vehicle. [prices.2]{{/until}} The organiser's Location and transportation page, in French, also offers a La Québécoise coach from Montreal (Place Bonaventure), Saint-Hyacinthe and Drummondville, booked by email. The offer still carries its 2026 date. [transport.4] [prices.3.note] Timetables are those of the [RTC](/go/igloofest-rtc/), Quebec City's transport network. [sources.s19] [The organiser's Quebec City travel page, in French](/go/igloofest-quebec-transport/)",
          },
          {
            id: "past",
            heading: "Past editions in Quebec City",
            body: "The fourth edition, from Thursday 5 to Saturday 7 March 2026, was the first with the minimum age at 16. [editions.6] [editions.6.note] The organiser names its headliners, Disclosure (DJ set), Zeds Dead and Chris Lake, among nine DJs, and counts \"plus de 18 000 Igloosapiens\", more than 18,000, over its three nights. [quebec_2026_lineup] [not_printable.1] The third edition, from Thursday 6 to Saturday 8 March 2025, had Tiësto, Miss Monique and deadmau5. [editions.8] [editions[Québec 2025].note] The French release of 12 November 2025 recalls more than 9,000 Igloosapiens on the square in a single evening in 2025, with Tiësto headlining. [editions[Québec 2025].note] [sources.s7] Igloosapiens, for the record, is the organiser's word for its crowd.",
          },
        ],
        faqHeading: "Questions",
        faq: [
          {
            q: "When is Igloofest Quebec City 2027?",
            a: "From Thursday 4 to Saturday 6 March 2027, three nights from 19:00, at the Place Jean-Béliveau, ExpoCité, 250 boulevard Wilfrid-Hamel, Quebec City, for those aged 16 and over. [editions[Québec 2027]] [editions[Québec 2027].note] [venues.v2] [age[Québec]] Source: the home page and FAQ of quebec.igloofest.ca, read 24 October 2026. [sources.s6en] [sources.s13b]",
          },
          {
            q: "Is Igloofest Quebec 16+?",
            a: "Yes, 16 and over, according to its FAQ. The 2026 edition was the first with that minimum age, according to the release of 12 November 2025. [age[Québec]] [editions.6.note] Source: Igloofest Quebec's FAQ and its release, read 24 October 2026. [sources.s13b] [sources.s7]",
          },
          {
            q: "Can I leave Igloofest Quebec and come back?",
            a: "No. The FAQ allows no re-entry: once you leave the site, you cannot come back in. [quebec_faq.reentry] Source: Igloofest Quebec's FAQ, read 24 October 2026. [sources.s13b]",
          },
        ],
        sourcesHeading: "Sources",
        sourcesNote: "Read on 24 October 2026 unless another date is given.",
        sources: "- [Igloofest Quebec](/go/igloofest-quebec-en/): its English home page (dates and venue), [its FAQ](/go/igloofest-quebec-faq/), in French (fifth edition, 16 and over, tickets, re-entry, food and drink, merchandise, toilets, reduced mobility, cash machines, bags, the cloakroom, helmets, lost property, the weather, parking, contact), and [its Location and transportation page](/go/igloofest-quebec-transport/), in French (RTC, the coach). [sources.s6en] [sources.s13b] [sources.s13]\n- Its page \"L'expérience\", for the 2026 figures, and its releases of 20 November 2024 and 12 November 2025, the second in French and in English. [sources.s13c] [sources.s8] [sources.s7] [sources.s7en]\n- The [RTC](/go/igloofest-rtc/), named by the organiser. [sources.s19]",
        foot: "fest.one is independent of Igloofest, Multicolore, Courage, Gestev, Ticketmaster and the transport companies.",
        markup: QUEBEC_MARKUP,
      },
      {
        slug: "igloofest/en/gatineau",
        createdAt: "2026-10-24T12:20:00+04:00",
        updatedAt: "2026-10-24T12:20:00+04:00",
        kind: "gatineau",
        label: "Gatineau",
        crumb: "Gatineau",
        navTitle: "Igloofest Gatineau 2027",
        title: "Igloofest Gatineau 2027: dates, venue — festival guide",
        description: "Igloofest Gatineau 2027 at the Place des Festivals Zibi, 11–13 February, 19:00 to 23:00, part of Winterlude: children with a parent, STO buses. Festival guide.",
        h1: "Igloofest Gatineau 2027",
        lede: "Igloofest Gatineau 2027 runs from Thursday 11 to Saturday 13 February 2027, from 19:00 to 23:00 each night, at the Place des Festivals Zibi, 60 rue Jos-Montferrand, Gatineau. [editions[Gatineau 2027]] [editions[Gatineau 2027].note] [venues.v3] The organiser's English site describes it \"as part of the iconic Winterlude\", Bal de neige in French. [gatineau_ottawa.winterlude_en] [bal_de_neige] Its home page bills it as \"Gatineau-Ottawa, cold through and through\", and its About page promises a view of Canada's Parliament. [gatineau_ottawa.tagline] [gatineau_ottawa.parliament_view] Unlike Montreal, Gatineau lets children in with a parent. The rule is below. [age[Gatineau]] On 24 October 2026 the site said \"Lineup coming soon!\" and had opened no sale. Its [English home page](/go/igloofest-gatineau-en/) takes presale sign-ups. [editions[Gatineau 2027].note] [sales.3]",
        sections: [
          {
            id: "tickets",
            heading: "Tickets: what the Gatineau FAQ says",
            body: "Passes and tickets are sold online only, through what the English FAQ calls Igloofest's \"ticketing platform\", and only tickets bought there are accepted. The FAQ names no website. [gatineau_seller] [gatineau_faq.door] The ticketing platform takes Visa and Mastercard, but not prepaid cards or Visa Debit. [gatineau_faq.online_payment] Sales are final, and a postponement or a cancellation brings a refund. [gatineau_faq.refunds] The confirmation and the e-ticket come by email. You download the ticket in advance and show it on your phone, to be scanned at the entrance. [gatineau_faq.eticket] The Igloopass covers all three nights in general admission. It cannot be shared, and holders show ID at the entrance so that the name on the pass can be checked. [gatineau_faq.igloopasse] [tickets_detail.3] The VIP ticket adds fast entry, bottle service, an exclusive terrace with heated toilets, a view of the stage and a heated indoor space. [gatineau_faq.vip]\n\nIf your ticket does not arrive, the FAQ says to look in your spam folder, and to write to info@Igloofestgatineau.net if nothing has come by the day before. A failed payment is most often down to a mistake in the billing address. A pending charge on the card clears by itself after five or six working days. [gatineau_faq.ticket_missing] [gatineau_faq.purchase_trouble] No price for Gatineau 2027 had been published by 24 October 2026. [not_found.4]",
          },
          {
            id: "venue",
            heading: "The Place des Festivals Zibi and how to get there",
            body: "The address is 60 rue Jos-Montferrand, Gatineau, QC J8X. [venues.v3] The site map is due \"sometime in January 2027\", the organiser writes. [venues[v3].note] [sources.s14en] By bus, it points to the Plani-bus trip planner of the [STO](/go/igloofest-sto/), the Société de transport de l'Outaouais. [transport.5] [sources.s20] By car, several car parks are available in Vieux-Hull, and it suggests Dubé Stationnement's website for options and rates. [gatineau_transport.parking] For the journey home, the Tolérance Zéro team is on site to drive you, for a fee that depends on the journey. [gatineau_transport.tolerance_zero] For car-sharing it names AmigoExpress. [transport.5]\n\nThere is no cloakroom on site, and payment is by credit or debit card only. [gatineau_faq.cloakroom] [gatineau_faq.payment] A harm-reduction team from the Euphorie group is on site at all times. [gatineau_harm_reduction] What to bring and what is banned are on [what to wear](/igloofest/en/what-to-wear/). [Find the Place des Festivals Zibi on Google Maps](/go/igloofest-maps-gatineau/)",
          },
          {
            id: "children",
            heading: "Children: the FAQ's rule",
            body: "Children aged 12 and under get in free with a parent who holds a valid festival ticket. From the age of 13, children need their own ticket, ID and a parent, one child per adult. [age[Gatineau]] [age[Gatineau].quote] The FAQ sets no upper age for the rule. [age[Gatineau].note] For comparison, Montreal is for those aged 18 and over and Quebec City for those aged 16 and over. [age.0] [age[Québec]]",
          },
          {
            id: "who",
            heading: "Who it is for, according to the Gatineau FAQ",
            body: "The Gatineau FAQ speaks to every warrior ready to take on winter, whether or not they are fans of electronic music. [gatineau_faq.who] It also sets out the festival's values: inclusivity, respect, tolerance and diversity, and zero tolerance for homophobia, racism, sexism, transphobia and xenophobia. [gatineau_faq.values] The nights of 11, 12 and 13 February 2027 fall on a Thursday, a Friday and a Saturday, and each runs four hours, 19:00 to 23:00. [gatineau_faq.when]",
          },
          {
            id: "past",
            heading: "Past editions in Gatineau",
            body: "Gatineau's first edition was in 2025, at the Place des Festivals Zibi, according to the organiser's About page and its post of 23 October 2025. [editions[Gatineau 2025].note] [sources.s11] [sources.s10] The second, from Thursday 12 to Saturday 14 February 2026, drew close to 17,000 festival-goers, according to the organiser's recap of 16 February 2026. [editions[Gatineau 2026]] [sources.s10b] Its three headliners, named on 12 November 2025, played a night each. Kaskade played on 13 February and Steve Aoki on the 14th. The first night, the 12th, went to BUNT. Swimming Paul and DJ Mandy were on the bill too. The presale opened on 13 November and the general sale on 14 November 2025. [editions[Gatineau 2026]] [sources.s10c] For 2027 the organiser had published only the dates, the hours and the venue by 24 October 2026. [editions[Gatineau 2027].note]",
          },
        ],
        faqHeading: "Questions",
        faq: [
          {
            q: "When and where is Igloofest Gatineau 2027?",
            a: "From Thursday 11 to Saturday 13 February 2027, 19:00 to 23:00, at the Place des Festivals Zibi, 60 rue Jos-Montferrand, Gatineau, as part of Winterlude. The line-up and the sale had not been announced by 24 October 2026. [editions[Gatineau 2027]] [editions[Gatineau 2027].note] [venues.v3] [gatineau_ottawa.winterlude_en] Source: the home page and FAQ of gatineau.igloofest.ca, read 24 October 2026. [sources.s9en] [sources.s14ben]",
          },
          {
            q: "Can children go to Igloofest Gatineau?",
            a: "Yes, according to the Gatineau FAQ. Children 12 and under go free with a parent who holds a ticket. From the age of 13, they need their own ticket, ID and a parent, one child per adult. [age[Gatineau]] Source: the FAQ of gatineau.igloofest.ca, read 24 October 2026. [sources.s14ben]",
          },
        ],
        sourcesHeading: "Sources",
        sourcesNote: "Read on 24 October 2026 unless another date is given.",
        sources: "- [Igloofest Gatineau](/go/igloofest-gatineau-en/): its English home page (dates, Winterlude, \"Gatineau-Ottawa\", \"Lineup coming soon!\", presale sign-up), and its French site's description of 2027 in the Bal de neige. [sources.s9en] [sources.s9]\n- [Its Rules and FAQ](/go/igloofest-gatineau-faq-en/): who it is for, values, hours, children, the ticketing platform, cards, refunds, the e-ticket, the Igloopass, VIP, a missing ticket, the cloakroom, payment, Euphorie. [sources.s14ben] [sources.s14b]\n- [Its Location and transportation page](/go/igloofest-gatineau-transport-en/): the STO, parking, Tolérance Zéro, car-sharing, the site map. [sources.s14en] [sources.s14]\n- [Its About page in English](/go/igloofest-gatineau-about-en/), for the view of the Parliament, and in French. Its post of 23 October 2025, read 22 October 2026, and its posts of 12 November 2025 and 16 February 2026, the last in English too. [sources.s11en] [sources.s11] [sources.s10] [sources.s10c] [sources.s10b] [sources.s10ben]\n- The [STO](/go/igloofest-sto/), named by the organiser. [sources.s20]",
        foot: "fest.one is independent of Igloofest, Multicolore, Courage, Gestev, Ticketmaster and the transport companies.",
        markup: GATINEAU_MARKUP,
      },
    ],
  },
];
