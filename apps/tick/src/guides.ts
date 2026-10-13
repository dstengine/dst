// Standing text under a section's dated feed, for the subjects where a reader
// wants more than the next date. Wine is the case: a visitor in Yerevan wants
// a tasting on whatever day they happen to be here, and most tastings are
// sold every day rather than announced, so they have no date to sit in the
// feed by. Each place is written up from its own page, with the price it
// publishes; the links go out through /go/ like every other one.
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
};

/** Checked on these pages, on this day. */
export const guideVerifiedOn = "2026-10-13";

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
  },
};
