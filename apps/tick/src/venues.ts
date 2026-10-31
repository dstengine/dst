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
import { buildVenues, venueOf, venueHrefFor as hrefFor, type Venue, type VenueSpec } from "@dst/content/venues";
import type { EventItem } from "@dst/content/types";
import type { Lang } from "./content";
import { eventsFor, prefix } from "./i18n";

// `short`: the name as a title runs it — "Khachaturian Concert Hall" where
// the page says "Aram Khachaturian Concert Hall" — because the title has
// sixty characters and the city has to fit in them too.
type Words = { name: string; short?: string; address?: string; locality?: string; region?: string; kind: string };
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
    match: ["Հայաստանի պետական ֆիլհարմոնիա", "Armenian State Philharmonia", "Arno Babajanyan Concert Hall"],
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
    hy: { name: "Հակոբ Պարոնյանի անվան երաժշտական կոմեդիայի թատրոն", short: "Պարոնյանի թատրոն", address: "Վազգեն Սարգսյանի 7", kind: "Թատրոն" },
    en: { name: "Hakob Paronyan Musical Comedy Theatre", short: "Paronyan Theatre", address: "7 Vazgen Sargsyan Street", kind: "Theatre" },
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

// Every other place tick's entries name, for the event markup only: the
// name and the street apart, the type, and the town when it is not
// Yerevan. Kept out of ROWS so that none of them grows a venue page by
// reaching two entries — a page is the editors' decision, made in ROWS.
// Addresses as the venues and the entries' own sources give them; Paronyan
// from the theatre and the city's listings, 31 Oct 2026.
const PLACES: Row[] = [
  {
    slug: "charles-aznavour-square",
    match: ["Շառլ Ազնավուրի հրապարակ", "Charles Aznavour Square"],
    schemaType: "Place",
    hy: { name: "Շառլ Ազնավուրի հրապարակ", kind: "Հրապարակ" },
    en: { name: "Charles Aznavour Square", kind: "Square" },
  },
  {
    slug: "cafesjian-sculpture-garden",
    match: ["Գաֆէսճեան քանդակների պարտեզ", "Cafesjian Sculpture Garden"],
    schemaType: "Park",
    hy: { name: "Գաֆէսճեան քանդակների պարտեզ", kind: "Քանդակների պարտեզ" },
    en: { name: "Cafesjian Sculpture Garden", kind: "Sculpture garden" },
  },
  {
    slug: "northern-avenue",
    match: ["Հյուսիսային պողոտա", "Northern Avenue"],
    schemaType: "Place",
    hy: { name: "Հյուսիսային պողոտա", kind: "Պողոտա" },
    en: { name: "Northern Avenue", kind: "Avenue" },
  },
  {
    slug: "english-park",
    match: ["Անգլիական այգի", "English Park"],
    schemaType: "Park",
    hy: { name: "Անգլիական այգի", kind: "Այգի" },
    en: { name: "English Park", kind: "Park" },
  },
  {
    slug: "freedom-square",
    match: ["Ազատության հրապարակ", "Freedom Square"],
    schemaType: "Place",
    hy: { name: "Ազատության հրապարակ", kind: "Հրապարակ" },
    en: { name: "Freedom Square", kind: "Square" },
  },
  {
    slug: "republic-square",
    match: ["Հանրապետության հրապարակ", "Republic Square"],
    schemaType: "Place",
    hy: { name: "Հանրապետության հրապարակ", kind: "Հրապարակ" },
    en: { name: "Republic Square", kind: "Square" },
  },
  {
    slug: "forty44",
    match: ["Forty44"],
    schemaType: "BarOrPub",
    hy: { name: "Forty44", address: "Ղազար Փարպեցու 16", kind: "Արտ բար" },
    en: { name: "Forty44", address: "16 Ghazar Parpetsi Street", kind: "Art bar" },
  },
  {
    slug: "national-gallery-of-armenia",
    match: ["Հայաստանի ազգային պատկերասրահ", "National Gallery of Armenia"],
    schemaType: "Museum",
    hy: { name: "Հայաստանի ազգային պատկերասրահ", address: "Արամի 1", kind: "Թանգարան" },
    en: { name: "National Gallery of Armenia", address: "1 Aram Street", kind: "Museum" },
  },
  {
    slug: "ufo-bar",
    match: ["UFO Bar"],
    schemaType: "BarOrPub",
    hy: { name: "UFO Bar", address: "Մոսկովյան 31", kind: "Բար" },
    en: { name: "UFO Bar", address: "31 Moskovyan Street", kind: "Bar" },
  },
  {
    slug: "hayfilm-cluster",
    match: ["Hayfilm Cluster"],
    schemaType: "EventVenue",
    hy: { name: "Hayfilm Cluster", address: "Աշտարակի խճուղի 30", kind: "Միջոցառումների տարածք" },
    en: { name: "Hayfilm Cluster", address: "30 Ashtarak Highway", kind: "Event space" },
  },
  {
    slug: "mkhitar-heratsi-1-1",
    match: ["Մխիթար Հերացու փողոց 1/1", "1/1 Mkhitar Heratsi Street"],
    schemaType: "Place",
    hy: { name: "Մխիթար Հերացու փողոց 1/1, 5-րդ հարկ", address: "Մխիթար Հերացու փողոց 1/1", kind: "Տարածք" },
    en: { name: "1/1 Mkhitar Heratsi Street, fifth floor", address: "1/1 Mkhitar Heratsi Street", kind: "Space" },
  },
  {
    slug: "yerevan-chamber-theatre",
    match: ["Երևանի պետական կամերային թատրոն", "Yerevan State Chamber Theatre"],
    schemaType: "PerformingArtsTheater",
    hy: { name: "Երևանի պետական կամերային թատրոն", address: "Մաշտոցի պող. 58", kind: "Թատրոն" },
    en: { name: "Yerevan State Chamber Theatre", address: "58 Mashtots Avenue", kind: "Theatre" },
  },
  {
    slug: "motor-yerevan",
    match: ["Motor Yerevan"],
    schemaType: "EventVenue",
    hy: { name: "Motor Yerevan", address: "Մովսես Խորենացու 28", kind: "Միջոցառումների տարածք" },
    en: { name: "Motor Yerevan", address: "28 Movses Khorenatsi Street", kind: "Event space" },
  },
  {
    slug: "van-ardi-winery",
    match: ["Վան Արդի գինեգործարան", "Van Ardi Winery"],
    schemaType: "Winery",
    hy: { name: "Վան Արդի գինեգործարան", locality: "Սասունիկ", region: "Արագածոտնի մարզ", kind: "Գինեգործարան" },
    en: { name: "Van Ardi Winery", locality: "Sasunik", region: "Aragatsotn Province", kind: "Winery" },
  },
  {
    slug: "oxygen",
    match: ["Oxygen"],
    schemaType: "Place",
    hy: { name: "Oxygen", kind: "Ակումբ" },
    en: { name: "Oxygen", kind: "Club" },
  },
  {
    slug: "zayon-garden",
    match: ["ZAYON Garden"],
    schemaType: "EventVenue",
    hy: { name: "ZAYON Garden", address: "Դավթաշեն, 1-ին փողոց 2", kind: "Այգի" },
    en: { name: "ZAYON Garden", address: "2 Davtashen 1st Street", kind: "Garden venue" },
  },
  {
    slug: "boulderland",
    match: ["Boulderland"],
    schemaType: "SportsActivityLocation",
    hy: { name: "Boulderland", address: "Ալեք Մանուկյան 1", kind: "Բոուլդերինգի սրահ" },
    en: { name: "Boulderland", address: "1 Alek Manukyan Street", kind: "Bouldering gym" },
  },
  {
    slug: "yerevan-railway-station",
    match: ["Երևանի երկաթուղային կայարան", "Yerevan Railway Station"],
    schemaType: "TrainStation",
    hy: { name: "Երևանի երկաթուղային կայարան", address: "Սասունցի Դավթի հրապարակ", kind: "Կայարան" },
    en: { name: "Yerevan Railway Station", address: "Sasuntsi Davit Square", kind: "Railway station" },
  },
  {
    slug: "epos",
    match: ["Էպոս", "Epos"],
    schemaType: "Restaurant",
    hy: { name: "Էպոս", address: "Աբովյան 10", kind: "Ռեստորան" },
    en: { name: "Epos", address: "10 Abovyan Street", kind: "Restaurant" },
  },
  {
    slug: "american-university-of-armenia",
    match: ["Հայաստանի ամերիկյան համալսարան", "American University of Armenia", "Manoogian Hall, American University of Armenia"],
    schemaType: "CollegeOrUniversity",
    hy: { name: "Հայաստանի ամերիկյան համալսարան", address: "Մարշալ Բաղրամյան 40", kind: "Համալսարան" },
    en: { name: "American University of Armenia", address: "40 Marshal Baghramyan Avenue", kind: "University" },
  },
  {
    slug: "ethnograph-beer-academy",
    match: ["Ethnograph Beer Academy"],
    schemaType: "BarOrPub",
    hy: { name: "Ethnograph Beer Academy", address: "Աբովյան 10", kind: "Գարեջրատուն" },
    en: { name: "Ethnograph Beer Academy", address: "10 Abovyan Street", kind: "Beer bar" },
  },
  {
    slug: "yerevan-marionette-theatre",
    match: ["Երևանի խամաճիկների պետական թատրոն", "Yerevan State Marionette Theatre"],
    schemaType: "PerformingArtsTheater",
    hy: { name: "Երևանի խամաճիկների պետական թատրոն", address: "Մաշտոցի 43", kind: "Թատրոն" },
    en: { name: "Yerevan State Marionette Theatre", address: "43 Mashtots Avenue", kind: "Theatre" },
  },
  {
    slug: "tashir-arena",
    match: ["Տաշիր Արենա", "Tashir Arena"],
    schemaType: "StadiumOrArena",
    hy: { name: "Տաշիր Արենա", address: "Ագաթանգեղոսի 1", kind: "Արենա" },
    en: { name: "Tashir Arena", address: "1 Agatangeghos Street", kind: "Arena" },
  },
  {
    slug: "in-vino",
    match: ["In Vino"],
    schemaType: "BarOrPub",
    hy: { name: "In Vino", address: "Սարյան 6/2", kind: "Գինու բար" },
    en: { name: "In Vino", address: "6/2 Saryan Street", kind: "Wine bar" },
  },
  {
    slug: "lake-sevan-chkalovka",
    match: ["Սևանա լիճ", "Lake Sevan"],
    schemaType: "LakeBodyOfWater",
    hy: { name: "Սևանա լիճ", locality: "Չկալովկա", region: "Գեղարքունիքի մարզ", kind: "Լիճ" },
    en: { name: "Lake Sevan", locality: "Chkalovka", region: "Gegharkunik Province", kind: "Lake" },
  },
  {
    slug: "sardi-gallery-penthouse",
    match: ["Penthouse by Sardi Gallery"],
    schemaType: "ArtGallery",
    hy: { name: "Penthouse by Sardi Gallery", address: "Մոսկովյան 31/114", kind: "Պատկերասրահ" },
    en: { name: "Penthouse by Sardi Gallery", address: "31/114 Moskovyan Street", kind: "Gallery" },
  },
  {
    slug: "armenia-wine",
    match: ["Armenia Wine"],
    schemaType: "Winery",
    hy: { name: "Armenia Wine", address: "30-րդ փողոց, 1-ին նրբանցք, 3", locality: "Սասունիկ", region: "Արագածոտնի մարզ", kind: "Գինեգործարան" },
    en: { name: "Armenia Wine", address: "3, 1st Dead-end, 30th Street", locality: "Sasunik", region: "Aragatsotn Province", kind: "Winery" },
  },
  {
    slug: "beer-academy",
    match: ["Beer Academy"],
    schemaType: "BarOrPub",
    hy: { name: "Beer Academy", address: "Մոսկովյան 8", kind: "Գարեջրատուն" },
    en: { name: "Beer Academy", address: "8 Moskovyan Street", kind: "Beer bar" },
  },
  {
    slug: "republican-stadium",
    match: ["Վազգեն Սարգսյանի անվան հանրապետական մարզադաշտ", "Vazgen Sargsyan Republican Stadium"],
    schemaType: "StadiumOrArena",
    hy: { name: "Վազգեն Սարգսյանի անվան հանրապետական մարզադաշտ", address: "Վարդանանց 65", kind: "Մարզադաշտ" },
    en: { name: "Vazgen Sargsyan Republican Stadium", address: "65 Vardanants Street", kind: "Stadium" },
  },
  {
    slug: "dzitoghtsyan-art-studio",
    match: ["Տիգրան Ձիթողցյան Արտ Ստուդիո", "Tigran Dzitoghtsyan Art Studio"],
    schemaType: "Place",
    hy: { name: "Տիգրան Ձիթողցյան Արտ Ստուդիո", address: "Տիգրան Պետրոսյան փողոց", locality: "Ձորաղբյուր", kind: "Արվեստանոց" },
    en: { name: "Tigran Dzitoghtsyan Art Studio", address: "Tigran Petrosyan Street", locality: "Dzoraghbyur", kind: "Art studio" },
  },
  {
    slug: "meridian-expo-centre",
    match: ["«Մերիդիան» ցուցահանդեսային կենտրոն", "Meridian Expo"],
    schemaType: "EventVenue",
    hy: { name: "«Մերիդիան» ցուցահանդեսային կենտրոն", address: "Ոսկերիչների 1", kind: "Ցուցահանդեսային կենտրոն" },
    en: { name: "Meridian Expo Centre", address: "1 Voskerichneri Street", kind: "Expo centre" },
  },
  {
    slug: "los-pueblos",
    match: ["Los Pueblos"],
    schemaType: "Restaurant",
    hy: { name: "Los Pueblos", address: "Պապ Թագավորի 4/6", kind: "Ռեստորան" },
    en: { name: "Los Pueblos", address: "4/6 Pap Tagavori Street", kind: "Restaurant" },
  },
  {
    slug: "house-of-composers",
    match: ["Կոմպոզիտորների միության տուն", "House of Composers"],
    schemaType: "MusicVenue",
    hy: { name: "Կոմպոզիտորների միության տուն", address: "Դերենիկ Դեմիրճյան 25", kind: "Համերգասրահ" },
    en: { name: "House of Composers", address: "25 Derenik Demirchyan Street", kind: "Concert hall" },
  },
  {
    slug: "aram-khachaturian-house-museum",
    match: ["Արամ Խաչատրյանի տուն-թանգարան", "Aram Khachaturian House-Museum"],
    schemaType: "Museum",
    hy: { name: "Արամ Խաչատրյանի տուն-թանգարան", address: "Զարոբյան 3", kind: "Տուն-թանգարան" },
    en: { name: "Aram Khachaturian House-Museum", address: "3 Zarobyan Street", kind: "House museum" },
  },
  {
    slug: "chamber-of-architects",
    match: ["Հայաստանի ճարտարապետների միություն", "Chamber of Architects of Armenia"],
    schemaType: "Place",
    hy: { name: "Հայաստանի ճարտարապետների միություն", address: "Մարշալ Բաղրամյան 17", kind: "Միություն" },
    en: { name: "Chamber of Architects of Armenia", address: "17 Marshal Baghramyan Avenue", kind: "Professional body" },
  },
  {
    slug: "red-hall",
    match: ["Red Hall"],
    schemaType: "EventVenue",
    hy: { name: "Red Hall", address: "Մարշալ Բաղրամյան 40", kind: "Դահլիճ" },
    en: { name: "Red Hall", address: "40 Marshal Baghramyan Avenue", kind: "Hall" },
  },
  {
    slug: "tumanyan-puppet-theatre",
    match: ["Հովհաննես Թումանյանի անվան պետական տիկնիկային թատրոն", "Hovhannes Tumanyan State Puppet Theatre"],
    schemaType: "PerformingArtsTheater",
    hy: { name: "Հովհաննես Թումանյանի անվան պետական տիկնիկային թատրոն", address: "Սայաթ-Նովայի 4", kind: "Թատրոն" },
    en: { name: "Hovhannes Tumanyan State Puppet Theatre", address: "4 Sayat-Nova Avenue", kind: "Theatre" },
  },
  {
    slug: "bak75",
    match: ["Բակ75", "Bak75"],
    schemaType: "BarOrPub",
    hy: { name: "Բակ75", address: "Աբովյան 18", kind: "Բար" },
    en: { name: "Bak75", address: "18 Abovyan Street", kind: "Bar" },
  },
  {
    slug: "artlav",
    match: ["ArtLav"],
    schemaType: "Place",
    hy: { name: "ArtLav", address: "Այգեձորի 1-ին նրբանցք 54/2", kind: "Արվեստի տարածք" },
    en: { name: "ArtLav", address: "54/2, 1st Ayghedzor Lane", kind: "Art space" },
  },
  {
    slug: "avetik-isahakyan-house-museum",
    match: ["Ավ. Իսահակյանի տուն-թանգարան", "Avetik Isahakyan House-Museum"],
    schemaType: "Museum",
    hy: { name: "Ավ. Իսահակյանի տուն-թանգարան", address: "Զարոբյան 20", kind: "Տուն-թանգարան" },
    en: { name: "Avetik Isahakyan House-Museum", address: "20 Zarobyan Street", kind: "House museum" },
  },
];

/** The table in one language: a VenueSpec per row. */
const inLang = (rows: Row[], lang: Lang): (VenueSpec & { short?: string })[] =>
  rows.map(({ hy, en, ...rest }) => ({ ...rest, ...(lang === "hy" ? hy : en) }));
export const specs = (lang: Lang): (VenueSpec & { short?: string })[] => inLang(ROWS, lang);
const everyPlace: Record<Lang, VenueSpec[]> = {
  hy: [...inLang(ROWS, "hy"), ...inLang(PLACES, "hy")],
  en: [...inLang(ROWS, "en"), ...inLang(PLACES, "en")],
};

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

/** The declared place an entry's venue line names, page or not, for the
    event markup. */
export const placeOf = (item: Pick<EventItem, "venue">, lang: Lang): VenueSpec | undefined =>
  venueOf(item, everyPlace[lang]);
