// Standing text under a section's dated feed, for the subjects where a reader
// wants more than the next date. Wine is the case: a visitor in Yerevan wants
// a tasting on whatever day they happen to be here, and most tastings are
// sold every day rather than announced, so they have no date to sit in the
// feed by. Classical music is the other: the dates change weekly, the three
// halls they are played in do not. Each place is written up from its own
// page, with the price it publishes; the links go out through /go/ like
// every other one.
//
// Same block format as an entry's `body` (see ArticleBody): "## " is a
// subheading, anything else a paragraph.
import type { Lang } from "./content";

/** Where each guide link goes, keyed by its /go/ slug. */
export const guideOutbound: Record<string, string> = {
  "wine-in-vino-alexandrea": "https://invino.am/products/alexandrea-x-in-vino",
  "wine-van-ardi-tours": "https://eventhub.am/en/adventures/event/van-ardi-tours-and-tastings-974a63d1-78e2-4109-a7b9-ac8f0c72a0d4",
  "wine-voskeni-tours": "https://voskeniwines.com/en/wine-tours/",
  // A pin by coordinates, as maps.ts puts every pin. Not forty44.com: that
  // domain now serves someone else's casino pages.
  "wine-karas-wine-bar": "https://www.instagram.com/karaswinebar/",
  "wine-tushpa-visit": "https://tushpawines.com/visit",
  "wine-forty44-map": "https://www.google.com/maps/search/?api=1&query=40.1849639%2C44.5106817",
  "classical-khachaturian-hall": "https://khachaturianhall.am/en/concerts",
  "classical-opera": "https://opera.am/en/",
  "classical-opera-tour": "https://opera.am/public/en/opera-tour",
  "classical-komitas-house": "https://nccm.am/en/events",
};

/** Checked on these pages, on this day, per guide. */
export const guideVerifiedOn: Record<string, string> = { wine: "2026-10-13", classical: "2026-10-14" };

const out = (slug: string, title: string, text: string) =>
  `<a href="/go/${slug}/" target="_blank" rel="nofollow noopener" title="${title}">${text}</a>`;

export const guides: Record<Lang, Record<string, string[]>> = {
  hy: {
    wine: [
      "## Որտեղ համտեսել գինի Երևանում ցանկացած օր",
      "Ամեն համտես չէ, որ ամսաթիվ ունի։ Հայկական գինին կարելի է համտեսել տարվա ցանկացած օր՝ Երևանի կենտրոնում, կամ Երևանից ոչ հեռու գտնվող գինու գործարաններում։ Գները ստորև այնպես են, ինչպես հրապարակել են վայրերը. ավելի լավ է նախապես ամրագրել։",
      "## In Vino, Սարյան փողոց",
      `In Vino-ն գինու խանութ և բար է Սարյան 6/2 հասցեում։ Alexandrea Winery-ի հետ այն առաջարկում է երեք համտես, յուրաքանչյուրը՝ տեղական պանիրներով և սալյամիներով. Alexandrea-ի ամբողջ տեսականին՝ 9200 դրամ, սպիտակ գինիները՝ 6500 դրամ, իսկ ռոզե և կարմիր գինիները՝ Rosé Pinot Noir, Pinot Noir և Արենի՝ 4900 դրամ։ ${out("wine-in-vino-alexandrea", "Alexandrea-ի համտեսները In Vino-ում", "Համտեսները In Vino-ի կայքում")}։`,
      "## Karas Wine Bar, Հանրապետության հրապարակ",
      `Karas Wine Bar-ը, իր իսկ բնորոշմամբ, գինու բար և համտեսի սրահ է Հանրապետության հրապարակ 1 հասցեում՝ հրապարակին ու շատրվաններին նայող տեռասով։ Բաց է երեքշաբթիից կիրակի՝ 13:00–23:00։ ${out("wine-karas-wine-bar", "Karas Wine Bar-ը Instagram-ում", "Karas Wine Bar-ը Instagram-ում")}։`,
      "## Forty44, Ղազար Փարպեցու փողոց",
      `Forty44-ը գինու բար չէ. արտ-սրճարան և կոկտեյլ-բար է՝ կենդանի երաժշտությամբ, բայց գինու լավ ընտրանի ունի և գտնվում է Երևանի հենց կենտրոնում՝ Ղազար Փարպեցու 16 հասցեում։ ${out("wine-forty44-map", "Forty44-ը Google Քարտեզներում", "Քարտեզում")}։`,
      "## Van Ardi, Սասունիկ",
      `Van Ardi գինու գործարանը Սասունիկ գյուղում է՝ Աշտարակի մոտ։ Տուրը սկսվում է ժամը 12:00-ին՝ տոմսարկղում նշված ամեն օր, և անցնում է կալվածքով, խաղողի այգով, գինու գործարանով ու զանգակատնով։ Չորս փաթեթ կա. Classic Tour՝ 5000 դրամ (երեք գինի և պանրի ափսե), Classic Tour Plus՝ 10 000 դրամ (երեք դասական և երկու ռեզերվ գինի, խորտիկներ), Tour & Lunch՝ 15 000 դրամ (չորս գինի, խորտիկներ, հիմնական ուտեստ, սուրճ կամ թեյ) և Tour & Lunch Plus՝ 19 000 դրամ (չորս դասական գինի և երկուսը՝ անմիջապես կաղնե տակառից)։ ${out("wine-van-ardi-tours", "Van Ardi-ի տուրերն ու համտեսները", "Տոմսեր և ամսաթվեր")}։`,
      "## Voskeni, Արաքս գյուղ",
      `Voskeni Wines-ը Արմավիրի մարզի Արաքս գյուղում է՝ Արարատյան դաշտում, Արարատ լեռան տեսարանով տեռասով։ Համտեսը՝ 10 500 դրամ անձի համար. երեք գինի, հայկական պանրի ափսե, բանջարեղենային աղցան, հայկական աղանդեր, սուրճ կամ թեյ։ Այգու ճաշը՝ 17 000 դրամ. չորս գինի, պանրի ափսե, երկու աղցան, խորոված ձուկ և բանջարեղեն, միրգ, աղանդեր, սուրճ կամ թեյ։ ${out("wine-voskeni-tours", "Voskeni Wines-ի տուրերը", "Տուրերն ու ամրագրումը")}։`,
      "## Tushpa, Տափերական",
      `Tushpa Wine Cellar-ը նվազագույն միջամտությամբ գինիներ է պատրաստում Արարատի մարզի Տափերական գյուղում՝ Երևանից 35 կմ, Արարատ լեռան ստորոտին։ Համտեսը՝ 6000 դրամ. շրջայց մառանում, Tushpa-ի երեք գինի, լավաշ, պանրի ափսե և տնական խորտիկներ։ Համտեսն ընթրիքով՝ 15 000 դրամ. հայկական հիմնական ուտեստ, բանջարեղեն, սոուսներ, տնական խորտիկներ և աղանդեր։ Այցն ամրագրվում է առնվազն մեկ օր առաջ, նվազագույնը երկու հյուրի համար, 10:00–18:00, բացի հինգշաբթիից։ ${out("wine-tushpa-visit", "Tushpa-ի այցերն ու համտեսները", "Այցեր և ամրագրում")}։`,
      "## Ամսաթվով համտեսներ",
      "Իրենց ամսաթիվն ունեցող համտեսները՝ գինեգործի երեկո, բերքահավաքի օր, տուր, վերևում են՝ ժամով և գնով, և անցնելուց հետո տեղափոխվում են անցածների մեջ։",
    ],
    classical: [
      "## Որտեղ է հնչում դասական երաժշտությունը Երևանում",
      "Այս էջի համերգների մեծ մասը երեք դահլիճում է, և երեքն էլ Երևանի կենտրոնում են։ Ստորև՝ ինչ է հնչում յուրաքանչյուրում և որտեղ են վաճառվում տոմսերը՝ այնպես, ինչպես գրում են դահլիճներն իրենք։",
      "## Արամ Խաչատրյան համերգասրահ, Մաշտոցի պողոտա 46",
      "Ալեքսանդր Թամանյանը շենքը նախագծել էր ձմեռային և ամառային դահլիճներով, որոնք հատուկ առիթներով պիտի միավորվեին։ Այսօր շենքի մի կեսը Օպերան է, մյուսը՝ համերգասրահը։ Այն բացվել է 1953 թվականի մայիսի 17-ին՝ որպես Հայֆիլհարմոնիայի Մեծ դահլիճ, իսկ 1979-ին ստացել է Արամ Խաչատրյանի անունը։ 2022-ին սկսված հիմնանորոգման ընթացքում վերանորոգվել են դահլիճի 1310 բազկաթոռները, իսկ կամերային համերգների համար բացվել է «Հարմոնիկ» սրահը։ Համերգասրահը Հայաստանի ազգային ֆիլհարմոնիկ նվագախմբի նստավայրն է. նվագախումբը հիմնադրել են Արշակ Ադամյանը և Ալեքսանդր Սպենդիարյանը 1925 թվականին։",
      `Տոմսերը վաճառվում են համերգասրահի կայքում՝ յուրաքանչյուր համերգի էջում, և տոմսային բաժնում՝ +374 77 677 226։ ${out("classical-khachaturian-hall", "Արամ Խաչատրյան համերգասրահի համերգները", "Համերգների ցանկը դահլիճի կայքում")}։`,
      "## Օպերայի և բալետի թատրոն, Թումանյան 54",
      "Թամանյանի նույն շենքի մյուս կեսում Ալ. Սպենդիարյանի անվան օպերայի և բալետի ազգային ակադեմիական թատրոնն է, որն իր վարագույրն առաջին անգամ բացել է 1933 թվականի հունվարի 20-ին։ Ամֆիթատրոնն ունի ավելի քան 1070 տեղ։ Օպերայից և բալետից բացի՝ այս բեմում հնչում են նաև սիմֆոնիկ համերգներ։",
      `Տոմսարկղը բաց է ամեն օր՝ 11:00–20:00, մեկ ժամ ընդմիջումով. թատրոնի ներսի տոմսարկղում՝ 13:00–14:00, դրսինում՝ 14:00–15:00։ Առցանց տոմսերը վաճառվում են ticket.opera.am-ում՝ յուրաքանչյուր ներկայացման էջից։ ${out("classical-opera", "Օպերայի և բալետի թատրոնի խաղացանկը", "Խաղացանկը թատրոնի կայքում")}։`,
      `Թատրոն կարելի է այցելել ոչ միայն ներկայացման, այլև OPERA TOUR շրջայցի համար. դահլիճներ, կուլիսներ, Երևանին նայող պատշգամբներ և թատրոնի արտադրական արհեստանոցներ։ Շրջայցերն անցկացվում են տարբեր լեզուներով՝ 10-ից 25 հոգանոց խմբերի համար։ ${out("classical-opera-tour", "OPERA TOUR՝ շրջայց Երևանի օպերայում", "Շրջայցի էջը")}։`,
      "## Կոմիտասի անվան կամերային երաժշտության տուն, Իսահակյան 1",
      "Կամերային երաժշտության տունը Օղակաձև զբոսայգում է։ Շենքը շահագործման է հանձնվել 1977 թվականի հուլիսի 2-ին։ Ճարտարապետ Ստեփան Քյուրքչյանն այն պատկերացնում էր եկեղեցու նման և ասում էր, որ միայն խաչն է պակասում։ Ներսի որմնանկարներն ու ջահը նույնպես նրա աշխատանքն են։ Դահլիճն ունի 300 տեղ։",
      "Դահլիճի հոլանդական «Ֆլենտրոպ» երգեհոնը տեղադրվել է 1979 թվականին։ Այն ստեղծված է 17–18-րդ դարերի երգեհոնների օրինակով և նախատեսված է հիմնականում բարոկ երաժշտության համար։ Առաջին համերգին նվագել է Վահագն Ստամբոլցյանը։ Երգեհոնային համերգներն այստեղ մեծ ժողովրդականություն են վայելում, անցկացվում են նաև երգեհոնային փառատոներ։",
      `Համերգները հրապարակում է Կամերային երաժշտության ազգային կենտրոնը. տոմսարկղի հեռախոսը՝ +374 10 58 60 46։ ${out("classical-komitas-house", "Կամերային երաժշտության ազգային կենտրոնի միջոցառումները", "Միջոցառումները կենտրոնի կայքում")}։`,
      "## Ամսաթվով համերգներ",
      "Ամսաթիվ ունեցող համերգները վերևում են՝ ժամով և տոմսի գնով, և անցնելուց հետո տեղափոխվում են անցածների մեջ։",
    ],
  },
  en: {
    wine: [
      "## Where to taste wine in Yerevan on any day",
      "Not every tasting has a date. Armenian wine can be tasted on any day of the year — in the centre of town, or at the wineries a short drive out of Yerevan. The prices below are as each place publishes them; one would do well to book ahead.",
      "## In Vino, Saryan Street",
      `In Vino is a wine shop and bar at 6/2 Saryan Street. With Alexandrea Winery it pours three tastings, each with local cheeses and salamis: the whole Alexandrea range for 9,200 drams, the white wines for 6,500, and a rosé and red flight — Rosé Pinot Noir, Pinot Noir and Areni — for 4,900. ${out("wine-in-vino-alexandrea", "The Alexandrea tastings at In Vino", "The tastings on In Vino's site")}.`,
      "## Karas Wine Bar, Republic Square",
      `Karas Wine Bar — a wine bar and tasting room, in its own words — is at 1 Republic Square, with a terrace onto the square and its fountains. It is open Tuesday to Sunday, 13:00–23:00. ${out("wine-karas-wine-bar", "Karas Wine Bar on Instagram", "Karas Wine Bar on Instagram")}.`,
      "## Forty44, Ghazar Parpetsi Street",
      `Forty44 is an art café and cocktail bar with live music rather than a wine bar, but its wine list is a good one, and it sits in the very centre of Yerevan, at 16 Ghazar Parpetsi Street — rather convenient when one would sooner not leave town. ${out("wine-forty44-map", "Forty44 on Google Maps", "On the map")}.`,
      "## Van Ardi, Sasunik",
      `Van Ardi winery is in Sasunik village, near Ashtarak. Its tour starts at 12:00 on every day the box office lists, and takes in the estate, the vineyard, the winery and the bell tower. There are four packages: Classic Tour at 5,000 drams (three wines and a cheese platter), Classic Tour Plus at 10,000 (three classic and two reserve wines, with appetisers), Tour & Lunch at 15,000 (four wines, appetisers, a main course, coffee or tea) and Tour & Lunch Plus at 19,000 (four classic wines and two straight from the oak barrel). ${out("wine-van-ardi-tours", "Van Ardi tours and tastings", "Tickets and dates")}.`,
      "## Voskeni, Araks village",
      `Voskeni Wines is in Araks village, in the Armavir province, in the Ararat valley, with a terrace that faces Mount Ararat. Its wine tasting is 10,500 drams a head: three wines, an Armenian cheese plate, a vegetable salad, an Armenian dessert, and coffee or tea. The vineyard lunch is 17,000: four wines, a cheese plate, two salads, grilled fish and vegetables, fruit, dessert, and coffee or tea. ${out("wine-voskeni-tours", "Voskeni Wines tours", "Tours and booking")}.`,
      "## Tushpa, Taperakan",
      `Tushpa Wine Cellar makes minimal-intervention wines in Taperakan village, in the Ararat province, 35 km from Yerevan and beneath Mount Ararat itself. The wine tasting is 6,000 drams: a tour of the cellar, three Tushpa wines, lavash, a cheese platter and homemade snacks. The tasting with dinner is 15,000, with an Armenian main course, vegetables, sauces, homemade snacks and dessert. Visits are by booking at least a day ahead, for two guests or more, between 10:00 and 18:00 on any day but Thursday. ${out("wine-tushpa-visit", "Tushpa visits and tastings", "Visits and booking")}.`,
      "## Tastings with a date",
      "Tastings that have a date of their own — a winemaker's evening, a harvest day, a tour — are listed above with the time and the price, and move to the past list once they are over.",
    ],
    classical: [
      "## Where classical music plays in Yerevan",
      "Most of the concerts on this page are in three halls, all of them in the centre of Yerevan. Below is what each one plays and where it sells tickets, as the halls themselves put it.",
      "## Aram Khachaturian Concert Hall, 46 Mashtots Avenue",
      "Alexander Tamanyan designed the building with a winter hall and a summer hall, to be joined into one on special occasions. Today half of it is the Opera and the other half the concert hall, which opened on 17 May 1953 as the Great Hall of the Armenian Philharmonic and took Aram Khachaturian's name in 1979. A renovation begun in 2022 refurbished its 1,310 seats and opened the Harmonic Hall for chamber music. The hall is home to the Armenian National Philharmonic Orchestra, founded in 1925 by Arshak Adamian and Alexander Spendiaryan.",
      `Tickets are sold on the hall's own website, from each concert's page, and by its box office on +374 77 677 226. ${out("classical-khachaturian-hall", "Concerts at the Aram Khachaturian Concert Hall", "The concert list on the hall's website")}.`,
      "## Opera and Ballet Theatre, 54 Tumanyan Street",
      "The other half of Tamanyan's building is the Alexander Spendiaryan National Academic Theatre of Opera and Ballet, which first raised its curtain on 20 January 1933. Its auditorium has more than 1,070 seats, and besides opera and ballet its stage takes symphony concerts too.",
      `The ticket office is open every day from 11:00 to 20:00, with an hour's break: 13:00–14:00 at the window inside the theatre, 14:00–15:00 at the one outside. Online, tickets are sold at ticket.opera.am, from each performance's page. ${out("classical-opera", "The Opera and Ballet Theatre's repertoire", "The repertoire on the theatre's website")}.`,
      `The theatre can be visited not only for a performance but on a guided tour, OPERA TOUR: the halls, the backstage areas, balconies that look out over Yerevan, and the production workshops. Tours run in several languages, for groups of 10 to 25. ${out("classical-opera-tour", "OPERA TOUR: a guided tour of the Yerevan Opera", "The tour page")}.`,
      "## Komitas Chamber Music House, 1 Isahakyan Street",
      "The Chamber Music House stands in Yerevan's Circular Park and opened on 2 July 1977. Its architect, Stepan Kyurkchyan, imagined it as a church and said that only the cross was missing; the frescoes inside and the chandelier are his work too. The hall seats 300.",
      "Its Dutch Flentrop organ was installed in 1979. It is modelled on organs of the 17th and 18th centuries and built mainly for Baroque music; Vahagn Stamboltsyan played the first concert on it. Organ concerts are popular here, and the house holds organ festivals.",
      `Concerts here are listed by the National Centre of Chamber Music; the box office is on +374 10 58 60 46. ${out("classical-komitas-house", "Events of the National Centre of Chamber Music", "Events on the centre's website")}.`,
      "## Concerts with a date",
      "Concerts that have a date are listed above with the time and the ticket price, and move to the past list once they are over.",
    ],
  },
};
