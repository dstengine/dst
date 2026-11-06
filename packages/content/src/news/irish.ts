import type { NewsItem } from "../types.ts";

// sensation.irish: dance music festivals in Ireland, the Republic and
// Northern Ireland, one guide per festival, filed under /guides/. Every entry
// is tagged with the subjects it answers — Camping, Day festivals, Belfast —
// and the subject pages (apps/irish/src/sections.ts) are built from those tags.
//
// The voice is Irish English: programme, organiser, 6 November 2026, euro in
// the Republic and pounds in Northern Ireland. Every date, price and rule is
// the organiser's, the ticket seller's or the transport operator's, and the
// guide says which. A line-up is only ever one the organiser announced, and
// last year's is called last year's. What has not been announced is said in
// the body, never in a title or a summary.

export const items: NewsItem[] = [

  {
    slug: "forbidden-fruit",
    createdAt: "2026-11-06T06:41:00+04:00",
    updatedAt: "2026-11-06T06:41:00+04:00",
    site: "irish",
    title: "Forbidden Fruit: Dublin's June festival at Kilmainham",
    titleSeo: "Forbidden Fruit 2027, Dublin",
    summary:
      "Forbidden Fruit is the June bank holiday weekend in the grounds of the Irish Museum of Modern Art at Kilmainham, the city-centre one among the dance music festivals Ireland hosts: over-18s only, tickets on Ticketmaster, five minutes' walk from Heuston.",
    date: "2026-11-06",
    category: "Guide",
    tags: ["Day festivals"],
    source: {
      name: "Forbidden Fruit: info, about and FF27 pages (forbiddenfruit.ie)",
      url: "https://www.forbiddenfruit.ie/info",
      verifiedOn: "2026-11-06",
    },
    body: [
      "Forbidden Fruit is a two-day festival over the June bank holiday weekend in the grounds of the <strong>Irish Museum of Modern Art, at the Royal Hospital Kilmainham in Dublin 8</strong>. The organiser calls it the capital's first and longest-running city-centre festival, and 2026 was its <span class=\"nowrap\">14th year</span>. Its 2026 bill ran from house and drum and bass DJs to soul and reggae singers, with the gates open from the afternoon into the late evening.",
      "## Forbidden Fruit 2027",
      "The dates of the next edition have not been announced. The festival's site has a sign-up page for <strong>FF27</strong>, which is where the dates and the first names will be sent. The 2026 edition was on <strong><span class=\"nowrap\">Saturday 30</span> and <span class=\"nowrap\">Sunday 31 May 2026</span></strong>, the weekend before the June bank holiday Monday.",
      "## The 2026 line-up",
      "As the organiser announced it, 2026 was headlined by <strong>Kaytranada, Kettama, Nia Archives and Joy Crookes</strong>, with Ben Böhmer, Calibre, Folamour, Horsegiirl, Interplanetary Criminal, MPH, Sally C, Sister Nancy and Shee among the names below them. That is last year's bill; nobody has been announced for 2027.",
      "## Tickets",
      "Forbidden Fruit sells its tickets through <strong>Ticketmaster only</strong>, and none are sold at the gate. A ticket can be passed to someone else through the Ticketmaster account it was bought on, which matters, because the name on the ticket has to match the ID shown at entry. Tickets are non-refundable, and there is no re-entry: once you leave, the ticket does not let you back in.",
      "## Age and ID",
      "The festival is <strong>strictly over 18s</strong>. The organiser accepts three forms of ID: a driving licence, a passport or an Age Card. The bars run Challenge 25, so anyone who looks under 25 will be asked for ID again before being served.",
      "## Getting to Kilmainham",
      "There is no parking at the venue, and the organiser sends everyone by public transport. <strong>Heuston</strong>, the Irish Rail station and a stop on the Luas Red Line, is about a <span class=\"nowrap\">five-minute</span> walk away; on foot you come in by the East Gate on Military Road. Dublin Bus routes 145 and C1 to C4 stop at Heuston, and routes 13, 73, G1 and G2 at St James's Hospital, about <span class=\"nowrap\">eight minutes</span> away on foot.",
      "## On the day",
      "In 2026 the gates opened at 2pm, last entry was at 9pm and the last act finished at 10.45pm. The site is cashless. Bags must be A4 size or smaller, and empty plastic water bottles of up to <span class=\"nowrap\">750ml</span> are allowed in. There is no camping: it is a city festival, and the evening ends with the walk back to Heuston.",
      "The same weekend in 2026, Belfast had <a href=\"/guides/ava-festival-belfast/\" title=\"AVA Festival Belfast: dates, tickets, ID rules and getting to the Titanic Slipways\">AVA Festival</a> on the Titanic Slipways and West Cork had <a href=\"/guides/open-ear/\" title=\"Open Ear on Sherkin Island: the ferry, camping and tickets\">Open Ear</a> on Sherkin Island.",
    ],
    faq: [
      {
        q: "What age do you have to be for Forbidden Fruit?",
        a: "Over 18. The festival is strictly over 18s, and the organiser accepts a driving licence, a passport or an Age Card as ID. The name on the ticket has to match the ID.",
      },
      {
        q: "Can you buy Forbidden Fruit tickets at the gate?",
        a: "No. Tickets are sold through Ticketmaster only, with none on sale on site. A ticket can be transferred to another person through the Ticketmaster account it was bought on.",
      },
      {
        q: "How do you get to Forbidden Fruit?",
        a: "By public transport, because there is no parking. Heuston, on Irish Rail and the Luas Red Line, is about five minutes' walk from the East Gate on Military Road, and Dublin Bus routes stop at Heuston and at St James's Hospital.",
      },
    ],
    action: {
      url: "https://www.forbiddenfruit.ie/2027",
      label: "FF27 sign-up",
      title: "Sign up for Forbidden Fruit 2027 news on the festival's own site",
      icon: "events",
    },
  },

  {
    slug: "ava-festival-belfast",
    createdAt: "2026-11-06T06:42:00+04:00",
    updatedAt: "2026-11-06T06:42:00+04:00",
    site: "irish",
    title: "AVA Festival Belfast: electronic music on the Titanic Slipways",
    titleSeo: "AVA Festival Belfast",
    summary:
      "AVA, the Audio Visual Arts festival, puts on two days of electronic music on the Titanic Slipways, one of the dance music festivals Ireland hosts in Belfast: strictly 18+ with photo ID, no car park, tickets on Resident Advisor, prices in pounds.",
    date: "2026-11-06",
    category: "Guide",
    tags: ["Day festivals", "Belfast"],
    source: {
      name: "AVA Festival: Belfast FAQ, 2026 line-up and story pages (avafestival.com)",
      url: "https://avafestival.com/belfast/ava-belfast-faq/",
      verifiedOn: "2026-11-06",
    },
    body: [
      "AVA, short for Audio Visual Arts, is a festival and conference of electronic music and visual art that began in Belfast in <span class=\"nowrap\">2015</span>, set up by the promoters UP! Productions. The festival itself is two days in the open air on the <strong>Titanic Slipways</strong> in the Titanic Quarter, and AVA has since added editions in London.",
      "## AVA Belfast 2027",
      "The 2027 dates have not been announced; the festival's Belfast page says the next edition is coming soon and takes sign-ups for news. The 2026 edition, the <span class=\"nowrap\">12th</span>, was on <strong><span class=\"nowrap\">Friday 29</span> and <span class=\"nowrap\">Saturday 30 May 2026</span></strong>.",
      "## The 2026 line-up",
      "The organiser's 2026 line-up included Kettama, Honey Dijon, Blawan (live), Partiboi69, Chloé Caillet, Calibre, Annie Mac, Interplanetary Criminal, Octo Octa B2B Eris Drew, DJ Gigola, MPH, Effy, Evian Christ and Or:la. It is last year's bill, given for the shape of the festival rather than as a promise for 2027.",
      "## Tickets",
      "AVA sells its tickets on <strong>Resident Advisor</strong>, where PayPal's Pay Later can spread the cost. Student tickets are sold only through <strong>FIXR</strong>, and there have been resident tickets for people living in the Docklands around the site. Prices are in pounds sterling.",
      "## Age and ID",
      "AVA is <strong>strictly 18+</strong>, and only three kinds of photo ID are accepted at the gate: a photo driving licence, a valid passport or a Yoti CitizenCard. A bank card, a student card or a photo of an ID on a phone is not on that list. The hospitality area is 21+.",
      "## Getting to the Titanic Slipways",
      "There is no car park for festival-goers. The organiser asks everyone to arrive on foot, by taxi, or by train or bus from the city centre, and there is an official taxi drop-off point. Translink's trains stop at Titanic Quarter station, and the slipways are within walking distance of the city centre.",
      "## On the day",
      "In 2026 the site was open from 1pm to 11pm, with last entry at 7pm and no re-entry. It is cashless, and bags are limited to A4 size. There is no camping: each day is a day out in the city, and the night ends with the walk or the taxi home.",
      "Belfast's other big open-air dance weekend is <a href=\"/guides/emerge-belfast/\" title=\"Emerge Music Festival in Belfast: dates, tickets, age rules and Translink\">Emerge</a>, at the end of August. In 2026 AVA shared its weekend with <a href=\"/guides/forbidden-fruit/\" title=\"Forbidden Fruit at Kilmainham, Dublin: tickets, ID and getting there\">Forbidden Fruit</a> in Dublin.",
    ],
    faq: [
      {
        q: "What ID do you need for AVA Festival?",
        a: "Photo ID, and only three kinds: a photo driving licence, a valid passport or a Yoti CitizenCard. The festival is strictly 18+, and the hospitality area is 21+.",
      },
      {
        q: "Where are AVA Belfast tickets sold?",
        a: "On Resident Advisor, with student tickets sold only through FIXR. Prices are in pounds sterling.",
      },
      {
        q: "Is there parking at AVA Festival?",
        a: "No. There is no customer car park at the Titanic Slipways; the organiser asks people to come on foot, by taxi or by train or bus, and there is an official taxi drop-off point.",
      },
    ],
    action: {
      url: "https://avafestival.com/belfast/sign-up/",
      label: "AVA Belfast sign-up",
      title: "Sign up for AVA Festival Belfast news on the festival's own site",
      icon: "events",
    },
  },

  {
    slug: "district-x",
    createdAt: "2026-11-06T06:43:00+04:00",
    updatedAt: "2026-11-06T06:43:00+04:00",
    site: "irish",
    title: "District X: a one-day festival at Palmerstown House",
    titleSeo: "District X, Co. Kildare",
    summary:
      "District X is a one-day September festival at Palmerstown House, Co. Kildare, from the promoters of District 8, one of the dance music festivals Ireland puts on within a bus ride of Dublin: over-18s, tickets on Resident Advisor, official festival buses.",
    date: "2026-11-06",
    category: "Guide",
    tags: ["Day festivals"],
    source: {
      name: "District X: info, travel, venue and line-up pages (district-x-festival.com)",
      url: "https://district-x-festival.com/info",
      verifiedOn: "2026-11-06",
    },
    body: [
      "District X is a one-day open-air festival at <strong>Palmerstown House and Estate in Co. Kildare</strong>, about 20 minutes from Dublin, run by District Eight Event Promoters, the company behind District 8 and Index in Dublin. 2026 was its third year: the first edition was on <span class=\"nowrap\">21 September 2024</span> and the second on <span class=\"nowrap\">20 September 2025</span>.",
      "## District X 2027",
      "No date has been announced for 2027. The 2026 festival was on <strong><span class=\"nowrap\">Saturday 12 September 2026</span></strong>, and the night before, <span class=\"nowrap\">Friday 11 September</span>, was given over to a Chris Stussy album show, Lost, Found and Forgotten.",
      "## The 2026 line-up",
      "The 2026 bill, as the organiser published it, was house and techno from AZYR, blk., Chloé Caillet, Chris Stussy, DJ Heartstring, EMA, Ewan McVicar, Gaskin, JWY, KI/KI, L.P. Rhythm, Mall Grab, MAV666, MPH, Oppidan, Route 94, Sammy Virji, Saoirse and Yasmin Gardezi, among others.",
      "## Tickets",
      "Resident Advisor is the festival's ticket partner, and ticket questions go to RA's own support team. All sales are final and tickets are non-transferable, so a ticket is good only for the person who bought it.",
      "## Age and ID",
      "District X is <strong>strictly over 18s</strong>. The organiser accepts a driving licence, a passport or a Garda card, and door staff may ask for two forms. The bars run Challenge 25, and there is no re-entry once you leave.",
      "## Getting to Palmerstown House",
      "The official festival buses are run by Marathon Coaches from three pick-up points: North Wall Quay in Dublin (stop 7623), Tallaght Stadium and Naas Post Office. For anyone who drives, the 2026 car park cost between <span class=\"nowrap\">€10 and €30</span>.",
      "## What to bring",
      "Not much: the organiser's list of what is not allowed in is long. Large backpacks and bags, outside food and drink, bottles, cans and flasks, umbrellas, chairs, blankets and tents all stay outside. There is no camping, because District X is a single day.",
      "For a September weekend with a tent, <a href=\"/guides/fuinneamh/\" title=\"Fuinneamh at Bellurgan Park, Co. Louth: 2027 dates, tickets and buses\">Fuinneamh</a> in Bellurgan Park near Dundalk fell on the same Saturday in 2026.",
    ],
    faq: [
      {
        q: "Is District X over 18s?",
        a: "Yes, strictly. The organiser accepts a driving licence, a passport or a Garda card, may ask for two forms of ID, and runs Challenge 25 at the bars.",
      },
      {
        q: "Can District X tickets be transferred?",
        a: "No. Tickets are sold through Resident Advisor, the festival's ticket partner, and all sales are final and non-transferable.",
      },
      {
        q: "How do you get to District X from Dublin?",
        a: "On the official festival buses, run by Marathon Coaches from North Wall Quay in Dublin, Tallaght Stadium and Naas Post Office. Palmerstown House is about 20 minutes from Dublin, and there is paid parking for those who drive.",
      },
    ],
    action: {
      url: "https://district-x-festival.com/",
      label: "District X site",
      title: "District X on the festival's own site: dates, line-up and travel",
      icon: "link",
    },
  },

  {
    slug: "beyond-the-pale",
    createdAt: "2026-11-06T06:44:00+04:00",
    updatedAt: "2026-11-06T06:44:00+04:00",
    site: "irish",
    featured: 1,
    title: "Beyond The Pale 2027: three days at Glendalough Estate",
    titleSeo: "Beyond The Pale 2027",
    summary:
      "Beyond The Pale returns to Glendalough Estate, Co. Wicklow, on 11–13 June 2027 for its sixth edition: three days of music, arts, food and wellness, and a camping weekend among the dance music festivals Ireland hosts. Over-21s, tickets on Ticketmaster.",
    date: "2026-11-06",
    category: "Guide",
    tags: ["Camping"],
    source: {
      name: "Beyond The Pale: tickets, FAQ, travel and about pages (itsbeyondthepale.ie)",
      url: "https://www.itsbeyondthepale.ie/faq",
      verifiedOn: "2026-11-06",
    },
    body: [
      "Beyond The Pale is a three-day festival of music, arts, food and wellness at <strong>Glendalough Estate in Co. Wicklow</strong>, about 30 minutes from Dublin by the organiser's reckoning. The music runs from bands to long DJ sets, and the dance side is why it is in this guide: in 2026 the bill was led by Caribou, Groove Armada playing a DJ set, Moodymann, Soulwax and 2manydjs.",
      "## Beyond The Pale 2027",
      "The sixth edition is on <strong><span class=\"nowrap\">Friday 11</span> to <span class=\"nowrap\">Sunday 13 June 2027</span></strong> at Glendalough Estate. The organiser says the 2027 line-up is in the works; no names have been announced.",
      "## Tickets",
      "Tickets are sold through <strong>Ticketmaster.ie</strong>, and the organiser sends ticket questions there. Phase 1 has sold out: an adult weekend camping ticket was <span class=\"nowrap\">€246</span> including fees, and an under-18 ticket <span class=\"nowrap\">€55.15</span>. Early access to Phase 2 is by sign-up on the festival's ticket page.",
      "The organiser has also offered an instalment plan, <span class=\"nowrap\">€49.50</span> up front and then three payments of <span class=\"nowrap\">€80</span>, and add-ons: a campervan pass at <span class=\"nowrap\">€150.50</span> and an early-bird ticket for the Round Tower Lounge at <span class=\"nowrap\">€106.75</span>. Weekend tickets include camping and free parking, and there is no weekend ticket without camping.",
      "## The 2026 line-up",
      "Volume 5, on <span class=\"nowrap\">12–14 June 2026</span>, had Caribou, Groove Armada (DJ set), Moodymann, Tinlicker (live), Primal Scream, Soulwax, Ben Klock, 2manydjs, Christian Löffler, Marie Davidson (live), Gui Boratto (live), Father John Misty, Honey Dijon, Max Cooper (3D audio-visual live show) and Claptone on the organiser's poster. That was last year's bill.",
      "## Age policy",
      "Beyond The Pale is <strong>over 21s</strong>, with families let in on the organiser's terms: children aged 12 and under come with a paying parent over 21, and teenagers of 13 to 17 with a parent over 25. Children under three go free. ID is required.",
      "## Getting to Glendalough",
      "The official festival buses run from North Wall Quay in Dublin and from the DART station at Bray, and only return tickets are sold, with an early-bird fare first. Bray is on Irish Rail's DART line, so the train and the shuttle together make the trip without a car. For anyone who drives, parking is free and about a ten-minute walk from the campsite.",
      "## Camping and what to bring",
      "Camping comes with every weekend ticket, and there are glamping and campervan options too; a campervan, a caravan or a car with a rooftop tent needs its own campervan pass, and no tent or gazebo can be pitched in the campervan field. Re-entry is allowed, with last entry at 10pm. The organiser's list of what stays at home includes glass, gazebos, barbecues and open flames, gas cylinders, umbrellas, drones and heavy garden furniture, and there is a personal allowance for alcohol.",
      "<a href=\"/guides/all-together-now/\" title=\"All Together Now at Curraghmore, Co. Waterford: 2027 dates, tickets and travel\">All Together Now</a>, at the start of August in Co. Waterford, is the other big camping weekend with an over-21 rule.",
    ],
    faq: [
      {
        q: "When is Beyond The Pale 2027?",
        a: "Friday 11 to Sunday 13 June 2027, at Glendalough Estate in Co. Wicklow. It is the festival's sixth edition.",
      },
      {
        q: "What is the age limit at Beyond The Pale?",
        a: "It is an over-21s festival. Children aged 12 and under can come with a paying parent over 21, and 13- to 17-year-olds with a parent over 25; under-threes go free. ID is required.",
      },
      {
        q: "Is camping included in a Beyond The Pale ticket?",
        a: "Yes. Weekend tickets include camping and free parking, and there is no weekend ticket without camping. A campervan, a caravan or a rooftop tent needs its own campervan pass.",
      },
    ],
    action: {
      url: "https://www.itsbeyondthepale.ie/",
      label: "Festival site",
      title: "Beyond The Pale's own site: tickets, travel and the FAQ",
      icon: "link",
    },
  },

  {
    slug: "all-together-now",
    createdAt: "2026-11-06T06:45:00+04:00",
    updatedAt: "2026-11-06T06:45:00+04:00",
    site: "irish",
    featured: 2,
    title: "All Together Now 2027: the August weekend at Curraghmore",
    titleSeo: "All Together Now 2027",
    summary:
      "All Together Now is a music and arts weekend at Curraghmore Estate, Co. Waterford, back on 29 July – 1 August 2027 for its eighth edition. Its dance stages are why it sits among the dance music festivals Ireland hosts. Over-21s, camping, Ticketmaster.",
    date: "2026-11-06",
    category: "Guide",
    tags: ["Camping"],
    source: {
      name: "All Together Now: tickets, information, travel and line-up pages (alltogethernow.ie)",
      url: "https://www.alltogethernow.ie/tickets",
      verifiedOn: "2026-11-06",
    },
    body: [
      "All Together Now is a music and arts festival on the <strong>Curraghmore Estate, near Portlaw in Co. Waterford</strong>, over the August bank holiday weekend. It is not a dance festival as such, and its headliners are often bands, but its dance stages carry a long list of DJs and electronic live acts, which is what it is doing in this guide.",
      "## All Together Now 2027",
      "The eighth edition is on the bank holiday weekend of <strong><span class=\"nowrap\">Thursday 29 July</span> to <span class=\"nowrap\">Sunday 1 August 2027</span></strong>, at Curraghmore. No acts have been announced. The organiser says the general sale will open alongside the first line-up announcement, later in 2026.",
      "## Tickets",
      "Tickets are sold on <strong>Ticketmaster.ie</strong>, with a service charge of up to <span class=\"nowrap\">€10.50</span> a ticket. Phase 1 went to returning festival-goers at loyalty prices set by how many editions they had been to: <span class=\"nowrap\">€240</span>, <span class=\"nowrap\">€260</span> or <span class=\"nowrap\">€290</span>. Phase 2, the general sale, comes with the first line-up, and the festival's ticket page takes registrations of interest for ATN27.",
      "## The 2026 line-up",
      "The seventh edition, in 2026, was headlined by Pulp, and its dance side included Disclosure (DJ set), Underworld, Maribou State (live), Floating Points (live), Mall Grab, Annie Mac, Kerri Chandler, Joy Orbison, Job Jobse, Weval (live) and The Avalanches (DJ set). That was last year's bill.",
      "## Age policy and ID",
      "All Together Now is <strong>strictly over 21s</strong>, with one exception: children aged 12 or under come in free with a paying adult, two at most per adult. Anyone from 13 to 20 is not let in. The organiser runs a strict challenge policy on age, so bring valid ID; families bring ID for their children too, and for them a colour photocopy of a passport is enough.",
      "## Getting to Curraghmore",
      "For 2026 the organiser's travel page set out a route without a car. Bus Éireann ran festival shuttles non-stop from Dublin city centre and from Parnell Place in Cork, and a regular service from Waterford bus station. Irish Rail trains run to Waterford Plunkett, under <span class=\"nowrap\">five minutes</span> on foot from the bus terminus. A free shuttle ran from the drop-off point at Highfield Business Park in Portlaw. The 2027 travel details have not been published yet.",
      "## Camping and what to bring",
      "Every weekend ticket is a camping ticket, and there are no weekend tickets without camping, though nobody has to stay over: in 2026 the campsites opened at 12.30pm on the Thursday, and last entry was 10pm each night. Families with children of 12 and under can camp in a family campsite on a family ticket, and there is boutique camping. In 2026 each adult could bring in 24 cans, or a litre of spirits, or <span class=\"nowrap\">1.5 litres</span> of wine, on first entry only and out of glass. Gas cylinders, barbecues, gazebos, umbrellas and disposable vapes were among the things not allowed.",
      "<a href=\"/guides/beyond-the-pale/\" title=\"Beyond The Pale at Glendalough Estate, Co. Wicklow: 2027 dates, tickets and buses\">Beyond The Pale</a>, in June in Co. Wicklow, is the other big camping weekend with an over-21 rule.",
    ],
    faq: [
      {
        q: "When is All Together Now 2027?",
        a: "Over the August bank holiday weekend, Thursday 29 July to Sunday 1 August 2027, at Curraghmore Estate in Co. Waterford. It is the festival's eighth edition.",
      },
      {
        q: "What is the age limit at All Together Now?",
        a: "Strictly over 21s, except children aged 12 or under, who come in free with a paying adult, two at most per adult. Anyone aged 13 to 20 is not admitted, and valid ID is needed.",
      },
      {
        q: "Where are All Together Now tickets sold?",
        a: "On Ticketmaster.ie, with a service charge of up to €10.50 a ticket. The general sale opens with the first line-up announcement; the festival's ticket page takes registrations of interest.",
      },
    ],
    action: {
      url: "https://www.alltogethernow.ie/tickets",
      label: "ATN27 tickets and sign-up",
      title: "All Together Now 2027 ticket phases and registration on the festival's own site",
      icon: "events",
    },
  },

  {
    slug: "open-ear",
    createdAt: "2026-11-06T06:46:00+04:00",
    updatedAt: "2026-11-06T06:46:00+04:00",
    site: "irish",
    title: "Open Ear: a weekend of electronic music on Sherkin Island",
    titleSeo: "Open Ear, Sherkin Island",
    summary:
      "Open Ear is a small festival of experimental and electronic music on Sherkin Island in West Cork, held since 2016: an island weekend among the dance music festivals Ireland hosts, reached by ferry from Baltimore. Over-18s, camping in the ticket, cash for the boat.",
    date: "2026-11-06",
    category: "Guide",
    tags: ["Camping"],
    source: {
      name: "Open Ear: festival pages, FAQ and transport (openear.ie)",
      url: "https://www.openear.ie/",
      verifiedOn: "2026-11-06",
    },
    body: [
      "Open Ear is a festival of experimental and electronic music on <strong>Sherkin Island</strong>, off Baltimore in West Cork. It was first held in <span class=\"nowrap\">June 2016</span>, and 2026 was its <span class=\"nowrap\">tenth year</span>. It is a small festival with no cars on the island, and everyone stays in the campsite.",
      "## Open Ear 2027",
      "The 2027 dates have not been announced. The 2026 festival ran from <strong><span class=\"nowrap\">Thursday 28</span> to <span class=\"nowrap\">Sunday 31 May 2026</span></strong>, the June bank holiday weekend: Thursday arrivals were let in from 5pm, the main gates opened at 2pm on Friday, and the site closed at 11am on <span class=\"nowrap\">Monday 1 June</span>.",
      "## The 2026 artists",
      "Among the organiser's 2026 names were EMA &amp; Sgt Pokes, Jabu &amp; Memotone, Container, Dave Huismans presenting ex_libris, Eomac &amp; Saint Abdullah, Ali Daly, Chris Imler and Eliza.",
      "## Tickets",
      "Tickets are sold on <strong>Resident Advisor</strong> and held in the RA app. Open Ear is camping only and the pitch comes with the ticket, with a quiet camping area by the Silver Strand for those who want one.",
      "## Age",
      "Open Ear is for <strong>over-18s</strong> only.",
      "## Getting to Sherkin Island",
      "The last leg is the ferry from <strong>Baltimore</strong>. In 2026 a return crossing cost <span class=\"nowrap\">€30</span>, cash only, with luggage carried across; the last ferry left at 10pm on the Friday and at 7pm on the Thursday. The nearest cash machine is in Skibbereen, so bring the fare in cash. Cars stay on the mainland.",
      "By public transport, Bus Éireann's route 237 runs from St Patrick's Quay in Cork to Skibbereen, and a Local Link bus goes on to Baltimore. The festival's own coach from Custom House Quay in Dublin and from Cork sold out in 2026.",
      "## What to bring",
      "The organiser's list is short and practical: a torch, a bag for your rubbish, good shoes and a good tent. The festival is bring your own drink, and everything goes over on the ferry with you.",
      "In 2026 Open Ear shared its weekend with <a href=\"/guides/forbidden-fruit/\" title=\"Forbidden Fruit at Kilmainham, Dublin: tickets, ID and getting there\">Forbidden Fruit</a> in Dublin. For a bigger camping weekend, <a href=\"/guides/beyond-the-pale/\" title=\"Beyond The Pale at Glendalough Estate, Co. Wicklow: 2027 dates, tickets and buses\">Beyond The Pale</a> is in Co. Wicklow in June.",
    ],
    faq: [
      {
        q: "How do you get to Open Ear?",
        a: "By ferry from Baltimore in West Cork; in 2026 the return crossing was €30, cash only, with luggage carried across. Bus Éireann route 237 runs from Cork to Skibbereen, and a Local Link bus goes on to Baltimore. There are no cars on the island.",
      },
      {
        q: "Is camping included at Open Ear?",
        a: "Yes. Open Ear is camping only and the pitch comes with the ticket, with a quiet camping area by the Silver Strand.",
      },
      {
        q: "Where are Open Ear tickets sold?",
        a: "On Resident Advisor, and they are held in the RA app. The festival is for over-18s only.",
      },
    ],
    action: {
      url: "https://www.openear.ie/",
      label: "Open Ear site",
      title: "Open Ear's own site: dates, artists, the ferry and camping",
      icon: "link",
    },
  },

  {
    slug: "fuinneamh",
    createdAt: "2026-11-06T06:47:00+04:00",
    updatedAt: "2026-11-06T06:47:00+04:00",
    site: "irish",
    featured: 3,
    title: "Fuinneamh 2027: a September weekend in Bellurgan Park",
    titleSeo: "Fuinneamh 2027, Co. Louth",
    summary:
      "Fuinneamh returns to Bellurgan Park near Dundalk from Saturday 11 September 2027 for its tenth year: an independent camping weekend among the dance music festivals Ireland holds each September, with tickets and payment plans on Ticketr.",
    date: "2026-11-06",
    category: "Guide",
    tags: ["Camping"],
    source: {
      name: "Fuinneamh: 2027 ticket shop on Ticketr and the festival's site (fuinneamh.ie)",
      url: "https://fuinneamh.ticketr.events/2027",
      verifiedOn: "2026-11-06",
    },
    body: [
      "Fuinneamh, the Irish word for energy, is an independent festival in <strong>Bellurgan Park, near Dundalk in Co. Louth</strong>, at the foot of the Cooley Mountains. Its motto is Grá, Rithim agus Athrú: love, rhythm and change. It is a camping weekend of house, techno and bass music, and 2027 is its tenth year in the park.",
      "## Fuinneamh 2027",
      "The festival's ticket shop lists the 2027 edition from <strong><span class=\"nowrap\">Saturday 11 September 2027</span></strong>, gates at 1pm, at Bellurgan Park, Dundalk, A91 FP86. No acts have been announced yet.",
      "## Tickets",
      "Tickets are sold on <strong>Ticketr</strong>, the festival's own ticket shop. On <span class=\"nowrap\">6 November 2026</span> the Super Early Bird tickets at <span class=\"nowrap\">€197.50</span> had sold out, and the Early Bird was on sale at <span class=\"nowrap\">€210</span> plus a <span class=\"nowrap\">€15</span> fee. Payment plans split that into <span class=\"nowrap\">4 × €60</span> or <span class=\"nowrap\">3 × €80</span>, again plus the fee. General release, at <span class=\"nowrap\">€222.50</span>, was not on sale yet.",
      "## The 2026 line-up",
      "The 2026 festival, on <span class=\"nowrap\">12–13 September 2026</span>, announced its line-up in April 2026: Colin Benders, KiNK (live), General Levy, Mano Le Tough, Shanti Celeste, Yasmin Gardezi, Peach, Gemma Dunleavy, Dylan Fogarty and Rory Sweeney were among the names. That was last year's bill.",
      "## Getting to Bellurgan Park",
      "In 2026 the festival ran its own buses from outside Connolly Station in Dublin on the Saturday, coming back on the Monday, at <span class=\"nowrap\">€42</span>. For anyone coming by train, Dundalk is on Irish Rail's line between Dublin and Belfast.",
      "## Camping and age",
      "Fuinneamh is a weekend under canvas, and in 2026 a Sunday-only ticket at <span class=\"nowrap\">€120</span> was the one way in without it. The 2027 ticket page does not state an age rule, and earlier listings gave the festival as over-18s; the organiser's terms on Ticketr are the word on it. Bring photo ID, and a tent that will stand up to a September night in Louth.",
      "<a href=\"/guides/district-x/\" title=\"District X at Palmerstown House, Co. Kildare: tickets, ID and festival buses\">District X</a>, the one-day festival in Co. Kildare, fell on the same Saturday in 2026.",
    ],
    faq: [
      {
        q: "When is Fuinneamh 2027?",
        a: "From Saturday 11 September 2027 at Bellurgan Park near Dundalk, Co. Louth, with gates at 1pm, as the festival's ticket shop lists it. It is the festival's tenth year in the park.",
      },
      {
        q: "How much is a Fuinneamh 2027 ticket?",
        a: "On 6 November 2026 the Early Bird was €210 plus a €15 fee on Ticketr, with payment plans of 4 × €60 or 3 × €80 plus the fee. The Super Early Bird at €197.50 had sold out, and general release at €222.50 was not yet on sale.",
      },
      {
        q: "Is there a bus to Fuinneamh?",
        a: "In 2026 the festival ran buses from outside Connolly Station in Dublin on the Saturday, returning on the Monday, at €42. Dundalk is also on Irish Rail's line between Dublin and Belfast.",
      },
    ],
    action: {
      url: "https://www.fuinneamh.ie/",
      label: "Festival site",
      title: "Fuinneamh's own site: the festival, the park and its news",
      icon: "link",
    },
  },

  {
    slug: "emerge-belfast",
    createdAt: "2026-11-06T06:48:00+04:00",
    updatedAt: "2026-11-06T06:48:00+04:00",
    site: "irish",
    title: "Emerge Music Festival: Belfast's open-air dance weekend",
    titleSeo: "Emerge Belfast 2027",
    summary:
      "Emerge Music Festival is an open-air dance weekend in Belfast, one of the dance music festivals Ireland hosts in the city: the 2026 dates, venue and programme, how tickets are sold, the age rule and the way there by Translink.",
    date: "2026-11-06",
    category: "Guide",
    tags: ["Day festivals", "Belfast"],
    source: {
      name: "Emerge Music Festival (emergebelfast.com); Hot Press and Cool FM on the 2026 edition",
      url: "https://www.emergebelfast.com/",
      verifiedOn: "2026-11-06",
    },
    body: [
      "Emerge Music Festival is an open-air dance weekend in Belfast. Its site announces a 2027 edition and takes sign-ups for news, and it points to the social channels of Shine, the long-running Belfast club promoter.",
      "## Emerge 2027",
      "The dates and the venue for 2027 have not been announced. In 2026 the festival was on <strong><span class=\"nowrap\">Saturday 29</span> and <span class=\"nowrap\">Sunday 30 August 2026</span></strong> at the <strong>Boucher Road Playing Fields</strong> in south Belfast.",
      "## The 2026 programme",
      "Each day had a host. Saturday was <strong>Hannah Laing presents doof Belfast</strong>, with Hannah Laing, Charlie Sparks, Funk Tribu, VTSS, The Rocketman and Matty Ralph. Sunday was <strong>blk. Open Air</strong>, with blk., Natte Visstick, Restricted, Vieze Asbak, Negitiv and Black Traffic. That was the programme as announced in May 2026.",
      "## Tickets",
      "Tickets for 2026 were sold on <strong>Ticketmaster</strong>, in pounds sterling. For 2027, the festival's site takes sign-ups for news; buy only from the seller the festival names.",
      "## Age and ID",
      "Ticket listings for 2026 gave the festival as over-17s with ID required, and the VIP area as over-18s. The organiser's terms at the point of sale are the final word, and photo ID is needed either way.",
      "## Getting to Boucher Road",
      "In 2024 Translink ran special bus and rail services for the festival, with return shuttles from Kennedy Way to Lanyon Place station. The year's arrangements are on Translink's site nearer the date.",
      "## What to bring",
      "There is no camping: Emerge is two days in the city, and the way home is the shuttle, the train or a taxi. Bring your ticket, photo ID and something for the rain.",
      "<a href=\"/guides/ava-festival-belfast/\" title=\"AVA Festival Belfast: dates, tickets, ID rules and getting to the Titanic Slipways\">AVA Festival</a> is Belfast's other big open-air, on the Titanic Slipways in late May.",
    ],
    faq: [
      {
        q: "When is Emerge Belfast 2027?",
        a: "The organiser has not announced the 2027 dates. In 2026 Emerge was on Saturday 29 and Sunday 30 August at the Boucher Road Playing Fields in Belfast.",
      },
      {
        q: "What age do you have to be for Emerge?",
        a: "Ticket listings for 2026 gave it as over-17s with ID required, and the VIP area as over-18s. The organiser's terms at the point of sale are the final word.",
      },
      {
        q: "Where were Emerge tickets sold?",
        a: "On Ticketmaster, in pounds sterling. The festival's own site takes sign-ups for 2027 news.",
      },
    ],
    action: {
      url: "https://www.emergebelfast.com/",
      label: "Emerge sign-up",
      title: "Sign up for Emerge Belfast 2027 news on the festival's own site",
      icon: "events",
    },
  },
];
