// The rooms Yerevan's events happen in, in both languages. The rules — what
// makes a venue, how many dates earn it a page — live in
// @dst/content/venues; this file holds the table and the words.
//
// One row per place with both languages on it, like the sections table:
// the slug is the same under / and /am/, so the two pages are twins at one
// address, and a room cannot be added to one language and forgotten in
// the other. `match` carries the beginnings of the `venue` field in both
// languages, because an entry's venue line is localised with the rest of
// it and the English page sees the English string.
//
// Addresses and coordinates are the ones the entries themselves carry; a
// room whose entries give neither has neither here, rather than a guess.
import { buildVenues, venueHrefFor as hrefFor, type Venue, type VenueSpec } from "@dst/content/venues";
import type { EventItem } from "@dst/content/types";
import type { Lang } from "./content";
import { eventsFor, prefix } from "./i18n";

// `short`: the name as a title runs it — "Khachaturian Concert Hall" where
// the page says "Aram Khachaturian Concert Hall" — because the title has
// sixty characters and the city has to fit in them too.
type Words = { name: string; short?: string; address?: string; kind: string };
interface Row {
  slug: string;
  match: readonly string[];
  geo?: { lat: number; lng: number };
  url?: string;
  /** See VenueSpec.schemaType. */
  schemaType: string;
  hy: Words;
  en: Words;
}

const ROWS: Row[] = [
  {
    slug: "aram-khachaturian-concert-hall",
    match: ["Արամ Խաչատրյան համերգասրահ", "Aram Khachaturian Concert Hall"],
    geo: { lat: 40.1862685, lng: 44.5151091 },
    schemaType: "MusicVenue",
    hy: { name: "Արամ Խաչատրյան համերգասրահ", short: "Խաչատրյան համերգասրահ", address: "Մաշտոցի պող. 46", kind: "Համերգասրահ" },
    en: { name: "Aram Khachaturian Concert Hall", short: "Khachaturian Concert Hall", address: "46 Mashtots Avenue", kind: "Concert hall" },
  },
  {
    slug: "spendiaryan-opera-ballet-theatre",
    match: ["Ալ. Սպենդիարյանի անվան օպերայի", "Spendiaryan Opera and Ballet Theatre"],
    geo: { lat: 40.1862685, lng: 44.5151091 },
    schemaType: "PerformingArtsTheater",
    hy: { name: "Սպենդիարյանի անվան օպերայի և բալետի թատրոն", short: "Սպենդիարյանի օպերա", address: "Թումանյան 54", kind: "Օպերային թատրոն" },
    en: { name: "Spendiaryan Opera and Ballet Theatre", short: "Spendiaryan Opera", address: "54 Tumanyan Street", kind: "Opera house" },
  },
  {
    slug: "komitas-chamber-music-house",
    match: ["Կոմիտասի անվան կամերային", "Komitas Chamber Music House"],
    geo: { lat: 40.1854319, lng: 44.5232134 },
    schemaType: "MusicVenue",
    hy: { name: "Կոմիտասի անվան կամերային երաժշտության տուն", short: "Կոմիտասի կամերային տուն", address: "Իսահակյան 1", kind: "Կամերային դահլիճ" },
    en: { name: "Komitas Chamber Music House", short: "Komitas Chamber House", address: "1 Isahakyan Street", kind: "Chamber hall" },
  },
  {
    slug: "ghaplanyan-drama-theatre",
    match: ["Հրաչյա Ղափլանյանի անվան", "Hrachya Ghaplanyan Drama Theatre"],
    geo: { lat: 40.188904, lng: 44.519834 },
    schemaType: "PerformingArtsTheater",
    hy: { name: "Հրաչյա Ղափլանյանի անվան դրամատիկական թատրոն", short: "Ղափլանյանի թատրոն", address: "Իսահակյան 28", kind: "Թատրոն" },
    en: { name: "Hrachya Ghaplanyan Drama Theatre", short: "Ghaplanyan Theatre", address: "28 Isahakyan Street", kind: "Theatre" },
  },
  {
    slug: "tonelab",
    match: ["Tonelab"],
    geo: { lat: 40.1896107, lng: 44.5210393 },
    schemaType: "MusicVenue",
    hy: { name: "Tonelab", address: "Կորյունի 19ա", kind: "Ակումբ" },
    en: { name: "Tonelab", address: "19a Koryun Street", kind: "Club" },
  },
  {
    slug: "babajanyan-concert-hall",
    match: ["Հայաստանի պետական ֆիլհարմոնիա", "Armenian State Philharmonia"],
    geo: { lat: 40.17916, lng: 44.51361 },
    schemaType: "MusicVenue",
    hy: { name: "Բաբաջանյան համերգասրահ", address: "Աբովյան 2", kind: "Համերգասրահ" },
    en: { name: "Babajanyan Concert Hall", address: "2 Abovyan Street", kind: "Concert hall" },
  },
  {
    slug: "diana-abgar-park",
    match: ["Դիանա Աբգարի անվան զբոսայգի", "Diana Abgar Park"],
    geo: { lat: 40.1832252, lng: 44.5077975 },
    schemaType: "Park",
    hy: { name: "Դիանա Աբգարի անվան զբոսայգի", kind: "Զբոսայգի" },
    en: { name: "Diana Abgar Park", kind: "Park" },
  },
  {
    slug: "karen-demirchyan-complex",
    match: ["Կարեն Դեմիրճյանի անվան", "Karen Demirchyan Sports and Concert"],
    geo: { lat: 40.1881503, lng: 44.4833297 },
    schemaType: "StadiumOrArena",
    hy: { name: "Կարեն Դեմիրճյանի անվան մարզահամերգային համալիր", short: "Դեմիրճյանի համալիր", address: "Ծիծեռնակաբերդի խճուղի 1", kind: "Մարզահամերգային համալիր" },
    en: { name: "Karen Demirchyan Sports and Concerts Complex", short: "Demirchyan Complex", address: "1 Tsitsernakaberd Highway", kind: "Arena" },
  },
  {
    slug: "cafesjian-center",
    match: ["Գաֆէսճեան արվեստի կենտրոն", "Cafesjian Center for the Arts"],
    geo: { lat: 40.1893845, lng: 44.5154178 },
    schemaType: "Museum",
    hy: { name: "Գաֆէսճեան արվեստի կենտրոն", short: "Գաֆէսճեան կենտրոն", address: "Թամանյան 10", kind: "Արվեստի կենտրոն" },
    en: { name: "Cafesjian Center for the Arts", short: "Cafesjian Center", address: "10 Tamanyan Street", kind: "Art centre" },
  },
  {
    slug: "bohem-theatre",
    match: ["Բոհեմ թատրոն", "Bohem Theatre"],
    geo: { lat: 40.1891244, lng: 44.5129675 },
    schemaType: "PerformingArtsTheater",
    hy: { name: "Բոհեմ թատրոն", address: "Մարշալ Բաղրամյան 3", kind: "Թատրոն" },
    en: { name: "Bohem Theatre", address: "3 Marshal Baghramyan Avenue", kind: "Theatre" },
  },
  {
    slug: "paronyan-musical-comedy-theatre",
    match: ["Հակոբ Պարոնյանի անվան", "Hakob Paronyan State Musical Comedy Theatre"],
    schemaType: "PerformingArtsTheater",
    hy: { name: "Հակոբ Պարոնյանի անվան երաժշտական կոմեդիայի թատրոն", short: "Պարոնյանի թատրոն", kind: "Թատրոն" },
    en: { name: "Hakob Paronyan Musical Comedy Theatre", short: "Paronyan Theatre", kind: "Theatre" },
  },
  {
    slug: "souly-music-hall",
    match: ["Souly Music Hall"],
    schemaType: "MusicVenue",
    hy: { name: "Souly Music Hall", address: "Տերյան 76", kind: "Համերգասրահ" },
    en: { name: "Souly Music Hall", address: "76 Teryan Street", kind: "Music hall" },
  },
  {
    slug: "eventhub-yerevan",
    match: ["Eventhub Yerevan"],
    schemaType: "EventVenue",
    hy: { name: "Eventhub Yerevan", address: "Ավետիս Ահարոնյան 3/8", kind: "Միջոցառումների տարածք" },
    en: { name: "Eventhub Yerevan", address: "3/8 Avetis Aharonyan Street", kind: "Event space" },
  },
];

/** The table in one language: a VenueSpec per row. */
export const specs = (lang: Lang): (VenueSpec & { short?: string })[] =>
  ROWS.map(({ hy, en, ...rest }) => ({ ...rest, ...(lang === "hy" ? hy : en) }));

const today = new Date().toISOString().slice(0, 10);

/** Every venue that has earned a page, per language, computed once. */
export const allVenues: Record<Lang, (Venue & VenueSpec & { short?: string })[]> = {
  hy: buildVenues({ items: eventsFor("hy"), venues: specs("hy"), today }),
  en: buildVenues({ items: eventsFor("en"), venues: specs("en"), today }),
};

export const venuesBase = (lang: Lang) => `${prefix(lang)}venues/`;

/** The venue page for an entry, under the page's prefix, or nothing. */
export const venueHref = (item: Pick<EventItem, "venue">, lang: Lang): string | undefined =>
  hrefFor(item, allVenues[lang], venuesBase(lang));
