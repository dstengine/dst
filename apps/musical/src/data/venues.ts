import type { Venue } from "./types";

// Every theatre and arena a run plays, with the facts that are on the record
// somewhere: coordinates and postal addresses from OpenStreetMap through
// tools/geocode.mjs, everything else from the venue's own site or from the
// tour listing. A venue no one has written up yet still gets a page — name,
// city, address, map and what is playing there is a real page; the rest of
// the blocks appear as the facts do.
//
// Two of them carry rootSlug and live at the top level, because that is what
// people search for: /broadway/ and /coca-cola-arena/.

export const venues: Venue[] = [
  {
    slug: "ambassador-theatre",
    name: "Ambassador Theatre",
    rootSlug: "broadway",
    city: "new-york",
    address: "219 West 49th Street, New York, NY 10019",
    lat: 40.761235,
    lon: -73.98499,
    opened: "1921",
    officialSlug: "venue-ambassador-theatre",
    summary:
      "Chicago has played the Ambassador since January 2003, which makes this small Shubert house on West 49th Street the longest address the revival has held. It is the room the show settled into after seven years of moving.",
    transit:
      "50th Street on the 1; 49th Street on the N, Q, R and W; Times Square–42nd Street for everything else, then five blocks north.",
    capacity: 1125,
    details: [
      { label: "Opened", value: "11 February 1921" },
      { label: "Architect", value: "Herbert J. Krapp" },
      { label: "Owner", value: "The Shubert Organization" },
      { label: "Neighbourhood", value: "Theater District, Midtown Manhattan" },
      { label: "Landmark", value: "Auditorium interior designated in 1985" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "Herbert J. Krapp set the auditorium on a diagonal across a plot only a hundred feet wide, which is how 1,125 seats fit into a site that should not hold them. The Shuberts built it after the First World War along with the theatres now named for O'Neill and Walter Kerr, and it opened on 11 February 1921 with a musical, The Rose Girl.",
          "They sold it in 1935 and it spent twenty years being something else: a CBS radio studio, a cinema, a house for foreign films, then a studio for the DuMont television network. The Shuberts bought it back in 1956. Most of what played here afterwards was short. Chicago arrived in 2003 and has not left.",
        ],
      },
    ],
  },
  {
    slug: "coca-cola-arena",
    name: "Coca-Cola Arena",
    rootSlug: "coca-cola-arena",
    city: "dubai",
    address: "City Walk, Dubai",
    lat: 25.2036463,
    lon: 55.2658062,
    capacity: 17000,
    opened: "6 June 2019",
    operator: "Legends Global",
    owner: "Dubai Holding",
    officialSlug: "venue-coca-cola-arena",
    image: "/venues/coca-cola-arena.jpg",
    imageAlt:
      "The Coca-Cola Arena in City Walk at night, its LED facade lit red, with the Burj Khalifa behind it.",
    // Shot from across City Walk with a lot of sky above it: centred, the
    // opener's crop keeps the palm trees and loses the building.
    imagePosition: "center 78%",
    imageCredit: "Ninoksha Maria",
    imageLicense: "CC BY-SA 4.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Westlife_at_Coca-Cola_Arena_-_1.jpg",
    summary:
      "Seventeen thousand seats under one roof in City Walk, and the only indoor arena of its size in the region. Chicago plays it for five nights in December 2026 — an arena staging of a show built for a house a tenth the size.",
    transit:
      "City Walk, off Al Safa Street between Financial Centre Road and Sheikh Zayed Road. Taxi or a short drive from Business Bay and Downtown Dubai.",
    details: [
      { label: "Capacity", value: "17,000" },
      { label: "Opened", value: "6 June 2019" },
      { label: "Architect", value: "Populous" },
      { label: "Owner", value: "Dubai Holding" },
      { label: "Operator", value: "Legends Global" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "Populous designed it — the practice behind a long list of stadiums and arenas — and the roof is rigged to carry 190 tonnes, which is what lets a touring production hang a full show from it rather than build one on the floor. There are seventeen lifts, twenty-six escalators, eight artist dressing rooms and thirty-five concession stands inside.",
          "The front is a lighting system rather than a facade: 4,600 LEDs, reprogrammed for whoever is playing. At least twenty-eight wheelchair spaces are available, and the number changes with the staging, so it is worth asking when you book rather than after.",
        ],
      },
    ],
  },
  {
    slug: "tokyu-theatre-orb",
    name: "Tokyu Theatre Orb",
    city: "tokyo",
    address: "Shibuya Hikarie 11F, Shibuya-ku, Tokyo 150-8510",
    lat: 35.6591803,
    lon: 139.7036853,
    summary:
      "A musical house eleven floors up inside Shibuya Hikarie, built for exactly this: touring book musicals, in a tower above one of the busiest stations on earth.",
    capacity: 1972,
    opened: "18 July 2012",
    transit: "Shibuya Station, connected directly to Shibuya Hikarie.",
    details: [
      { label: "Opened", value: "18 July 2012" },
      { label: "Seats", value: "1,972 over three levels (1,186 / 521 / 265)" },
      { label: "Operator", value: "Tokyu Bunkamura" },
      { label: "Floors", value: "11 to 16 of Shibuya Hikarie" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "It stands on the site of the old Tokyu Bunka Kaikan and occupies six floors of the tower that replaced it, opening in July 2012 as the centrepiece of Shibuya Hikarie. The brief was unusually specific: a house built to receive Broadway productions, with an orchestra pit, a large stage lift, sixty lighting battens and movable lighting bridges.",
          "The first show was West Side Story, the first Broadway staging invited to Japan in forty-eight years. Everything since has been the same kind of booking — imported musicals, playing a room designed around them.",
        ],
      },
    ],
  },
  {
    slug: "orix-theater",
    name: "Orix Theater",
    city: "osaka",
    address: "Shinmachi, Nishi-ku, Osaka 550-0012",
    lat: 34.678546,
    lon: 135.4952992,
    image: "/venues/orix-theater.jpg",
    imageAlt:
      "The Orix Theater in Shinmachi, Osaka, the long facade of the 1968 hall.",
    imageCredit: "Tokumeigakarinoaoshima",
    imageLicense: "CC BY-SA 4.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:ORIX_Theatre.jpg",
    summary:
      "Osaka's long-running Shinmachi theatre, and the second and last Japanese stop of the 2026 dates — four days after Tokyo closes. It opened in 1968 as the Osaka Kosei Nenkin Kaikan and was the largest concert hall in the city.",
    details: [
      { label: "Opened", value: "14 April 1968" },
      { label: "Seats", value: "2,400" },
      { label: "Former name", value: "Osaka Kosei Nenkin Kaikan, until 2009" },
      { label: "Owner", value: "Orix Real Estate" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "The complex opened in April 1968 with a main hall of 2,400 seats, a smaller hall, lodgings and two restaurants, and for years it was the biggest room in Osaka. Orix Real Estate bought it in October 2009 and it has carried the company's name since.",
          "Its history is mostly music rather than theatre: Queen, Pink Floyd, Deep Purple, The Jackson 5 and James Brown all played the main hall. A touring musical in it is the exception, not the pattern.",
        ],
      },
    ],
  },
  {
    slug: "new-wimbledon-theatre",
    name: "New Wimbledon Theatre",
    city: "wimbledon",
    address: "93 The Broadway, Greater London, SW19 1QG",
    lat: 51.419221,
    lon: -0.201422,
    capacity: 1670,
    opened: "26 December 1910",
    image: "/venues/new-wimbledon-theatre.jpg",
    imageAlt:
      "The New Wimbledon Theatre on the Broadway, its dome and the gilded figure of Laetitia above the entrance.",
    imageCredit: "Shazz",
    imageLicense: "CC BY-SA 2.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:New_Wimbledon_Theatre_-_geograph.org.uk_-_3809753.jpg",
    summary:
      "The only theatre in Britain ever built with a Turkish bath in the basement, and the house where Oliver! was played for the first time anywhere, in 1960, before anyone in the West End had seen it. The gilded figure on the dome is Laetitia; she spent the Second World War in storage, in case German bombers were using her to find their way.",
    transit:
      "Wimbledon station, on the District line, South Western Railway and the tram, is a few minutes' walk; South Wimbledon on the Northern line is a little further.",
    details: [
      { label: "Opened", value: "26 December 1910" },
      { label: "Architects", value: "Cecil Massey and Roy Young" },
      { label: "Owner", value: "Ambassador Theatre Group" },
      { label: "Listed", value: "Grade II" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "J. B. Mulholland built it on the grounds of a large house and opened it two days after Christmas 1910 with a pantomime, Jack and Jill. The Edwardian interior survived two refurbishments, in 1991 and 1998, and the baroque plasterwork is still the thing people notice on the way to their seats.",
          "Between the wars Gracie Fields, Sybil Thorndike, Ivor Novello and Noël Coward all played here. It has a habit of getting musicals first: Oliver! opened here in 1960 and Half a Sixpence in 1963, both on their way to the West End.",
        ],
      },
    ],
  },
  {
    slug: "theatre-royal-plymouth",
    name: "Theatre Royal Plymouth",
    city: "plymouth",
    address: "Derry's Cross, Plymouth, PL1 2TR",
    lat: 50.369872,
    lon: -4.144802,
    officialSlug: "venue-theatre-royal-plymouth",
    capacity: 1320,
    opened: "1982",
    image: "/venues/theatre-royal-plymouth.jpg",
    imageAlt:
      "The Theatre Royal Plymouth at Derry's Cross, Peter Moro's 1982 block in pale stone and glass.",
    imageCredit: "painma",
    imageLicense: "CC BY-SA 4.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Theatre_Royal,_Plymouth.jpg",
    summary:
      "Three auditoriums in one organisation — the 1,300-seat Lyric for the big touring musicals, the 200-seat Drum and the 50-seat Lab — plus a workshop across town where sets and costumes are actually built. It is one of the few regional theatres that makes as much as it receives.",
    details: [
      { label: "Opened", value: "1982" },
      { label: "Architect", value: "Peter Moro" },
      { label: "Auditoriums", value: "The Lyric (1,300), The Drum (200), The Lab (50)" },
      { label: "Funding", value: "Arts Council England National Portfolio Organisation" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "Plymouth has had a Theatre Royal since 1813, when John Foulston's neo-classical block at the bottom of George Street seated 1,192. The present building, Peter Moro's, dates from 1982 and sits on Derry's Cross; a £7 million rebuild of the front of house finished in 2013 and added the Lab.",
          "The seven-metre bronze outside — a crouching actor, called Messenger — went up in 2019 and is now the easiest way to describe where to meet.",
        ],
      },
    ],
  },
  {
    slug: "wales-millennium-centre",
    name: "Wales Millennium Centre",
    city: "cardiff",
    address: "Bute Place, Cardiff, CF10 5AL",
    lat: 51.464897,
    lon: -3.163316,
    officialSlug: "venue-wales-millennium-centre",
    capacity: 1897,
    opened: "26 November 2004",
    summary:
      "Wales's national arts centre, seven and a half acres of Cardiff Bay behind a slate-and-bronze front, built after the plan it replaced — an opera house for the same site — was abandoned. The Donald Gordon Theatre seats 1,897 and its stage is among the largest in Europe.",
    details: [
      { label: "Opened", value: "26–28 November 2004 (phase one)" },
      { label: "Architect", value: "Jonathan Adams, Percy Thomas Partnership" },
      { label: "Halls", value: "Donald Gordon Theatre (1,897), BBC Hoddinott Hall (350), Weston Studio (250)" },
      { label: "Resident", value: "BBC National Orchestra and Chorus of Wales" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "The second phase opened in January 2009 and gave the BBC National Orchestra and Chorus of Wales a home inside the same building. Eight arts organisations are resident; since 2012 the centre has produced work of its own as well as receiving tours.",
          "For a touring musical this is the biggest room in Wales, which is why almost everything on a UK tour stops here rather than anywhere else in the country.",
        ],
      },
    ],
  },
  {
    slug: "sheffield-lyceum",
    name: "Sheffield Lyceum Theatre",
    city: "sheffield",
    address: "Tudor Square, Sheffield, S1 2LA",
    lat: 53.380437,
    lon: -1.466673,
    capacity: 1068,
    opened: "1897",
    image: "/venues/sheffield-lyceum.jpg",
    imageAlt:
      "The Lyceum Theatre on Tudor Square, Sheffield, with the statue of Mercury on its corner dome.",
    imageCredit: "Harry Mitchell",
    imageLicense: "CC BY-SA 3.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Lyceum_Theatre,_Sheffield_(1).JPG",
    summary:
      "The last Edwardian auditorium left in Sheffield, and the only theatre outside London still standing that W. G. R. Sprague designed. It closed in 1969, dodged a demolition application in 1975, and came back in 1990 after a £12 million restoration.",
    details: [
      { label: "Opened", value: "1897" },
      { label: "Architect", value: "W. G. R. Sprague" },
      { label: "Restored", value: "1988–1990" },
      { label: "Listed", value: "Grade II*" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "There has been a theatre on this corner of Tudor Square since 1879, when a wooden building meant for a circus went up; Dan Leno's parents managed it, and it burned down in 1893. The Lyceum replaced its short-lived successor and opened in 1897 under a statue of Mercury, which is still on the roof.",
          "By the 1960s it was taking bingo to stay open. Two Sheffield businessmen bought it in 1985 with the council's help, and the restoration that followed cost £12 million and gave the city back a 1,068-seat receiving house on three levels.",
        ],
      },
    ],
  },
  {
    slug: "liverpool-empire",
    name: "Liverpool Empire",
    city: "liverpool",
    address: "11 Lime Street, Liverpool, L1 1JE",
    lat: 53.408823,
    lon: -2.978177,
    capacity: 2348,
    opened: "9 March 1925",
    image: "/venues/liverpool-empire.jpg",
    imageAlt:
      "The Liverpool Empire on Lime Street, its wide stone front facing the station.",
    imageCredit: "Mike Pennington",
    imageLicense: "CC BY-SA 2.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Empire_Theatre,_Lime_Street,_Liverpool_-_geograph.org.uk_-_4767710.jpg",
    summary:
      "The largest two-tier auditorium in the United Kingdom, and the second theatre to stand on this corner of Lime Street. The first opened in 1866 and was pulled down in 1924 to make room for it.",
    transit:
      "Liverpool Lime Street station is on the same street, a two-minute walk from the doors.",
    details: [
      { label: "Opened", value: "9 March 1925" },
      { label: "Architects", value: "W. and T. R. Milburn, for Moss Empires" },
      { label: "Owner", value: "ATG Entertainment" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "The site started as the New Prince of Wales Theatre and Opera House in 1866, became the Royal Alexandra, then simply the Empire when Moss and Thornton bought it in 1896 for £30,000. That building closed in February 1924 and the present one opened thirteen months later.",
          "Merseyside County Council took it on in 1979 and spent £680,000 deepening the stage and the orchestra pit; a larger refurbishment in 1999 widened the stage again. The size is the point: shows that will not fit elsewhere in the north-west fit here.",
        ],
      },
    ],
  },
  {
    slug: "newcastle-theatre-royal",
    name: "Newcastle Theatre Royal",
    city: "newcastle",
    address: "100 Grey Street, Newcastle upon Tyne, NE1 6BR",
    lat: 54.972740,
    lon: -1.612162,
    officialSlug: "venue-newcastle-theatre-royal",
    capacity: 1249,
    opened: "20 February 1837",
    summary:
      "Grade I listed, which almost no working theatre is, and the centrepiece of Richard Grainger's Grey Street. It opened in 1837 with The Merchant of Venice; a fire after a performance of Macbeth in 1899 gutted the inside, and what audiences sit in now is Frank Matcham's replacement, finished on the last day of 1901.",
    details: [
      { label: "Opened", value: "20 February 1837" },
      { label: "Architects", value: "John and Benjamin Green; interior by Frank Matcham, 1901" },
      { label: "Owner", value: "Theatre Royal Trust" },
      { label: "Listed", value: "Grade I, since 1954" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "The Greens designed it as part of Grainger's rebuilding of central Newcastle, and the portico halfway up Grey Street is the reason the street keeps turning up in lists of the finest in England.",
          "Fire took the interior in 1899. Matcham — the most prolific theatre architect of the period, and the name behind half the houses on this tour — rebuilt it behind the surviving front, and it reopened on 31 December 1901 with the auditorium of four levels and 1,249 seats that is there today.",
        ],
      },
    ],
  },
  {
    slug: "bournemouth-pavilion",
    name: "Bournemouth Pavilion Theatre",
    city: "bournemouth",
    address: "Westover Road, Bournemouth, BH1 2BU",
    lat: 50.717544,
    lon: -1.875005,
    officialSlug: "venue-bournemouth-pavilion",
    capacity: 1448,
    opened: "19 March 1929",
    summary:
      "A theatre and a ballroom under one roof, argued about for forty years before it was built: the council had the money in 1892 and residents who objected to licensed premises kept blocking it until after the First World War. The Duke of Gloucester finally opened it in 1929, at a cost of £250,000.",
    details: [
      { label: "Opened", value: "19 March 1929" },
      { label: "Architects", value: "G. Wyville Home and Shirley Knight" },
      { label: "Halls", value: "Theatre (1,448), Ballroom (900)" },
      { label: "Operator", value: "BH Live, for Bournemouth, Christchurch and Poole Council" },
      { label: "Listed", value: "Grade II" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "It was designed as a concert hall for the municipal orchestra, then rebuilt within five years to take theatre as well; the reopening in July 1934 was The White Horse Inn. Two storeys were added either side of the entrance in the 1950s.",
          "The Oasis Bar, tacked onto the west end in 1975, was disliked enough to be demolished again in 2007. The gardens it sits in have been public pleasure grounds since 1859.",
        ],
      },
    ],
  },
  {
    slug: "kings-theatre-glasgow",
    name: "King's Theatre",
    city: "glasgow",
    address: "335 Bath Street, Glasgow, G2 4JR",
    lat: 55.865001,
    lon: -4.268689,
    capacity: 1785,
    opened: "12 September 1904",
    image: "/venues/kings-theatre-glasgow.jpg",
    imageAlt:
      "The King's Theatre on Bath Street, Glasgow, Frank Matcham's red sandstone front.",
    imageCredit: "Stinglehammer",
    imageLicense: "CC BY-SA 4.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:King%27s_Theatre,_Glasgow_02.jpg",
    summary:
      "Frank Matcham built it in 1904 as the sister house to the Theatre Royal across town, and Historic Environment Scotland calls it an important example of an Edwardian theatre. Four levels, 1,785 seats, and a pantomime every year since long before anyone reading this was born.",
    details: [
      { label: "Opened", value: "12 September 1904" },
      { label: "Architect", value: "Frank Matcham" },
      { label: "Owner", value: "Glasgow City Council; operated by ATG Entertainment" },
      { label: "Listed", value: "Category A, since 1970" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "Howard & Wyndham built it under Baillie Michael Simons and ran it until 1967, when Glasgow Corporation bought it. The council still owns the building and leases it to ATG.",
          "It is a receiving house — touring musicals, dance, comedy — and it also gives local amateur companies a professional stage, which is rarer than it sounds for a theatre of this size.",
        ],
      },
    ],
  },
  {
    slug: "his-majestys-theatre-aberdeen",
    name: "His Majesty’s Theatre",
    city: "aberdeen",
    address: "Rosemount Viaduct, Aberdeen City, AB25 1GL",
    lat: 57.148074,
    lon: -2.104773,
    officialSlug: "venue-his-majestys-theatre-aberdeen",
    capacity: 1400,
    opened: "3 December 1906",
    summary:
      "Granite-clad, Matcham-designed and the largest theatre in the north-east of Scotland, looking across Rosemount Viaduct at Union Terrace Gardens. It was built to one man's specification: Robert Arthur wanted a house of his own after fifteen years of leasing other people's.",
    details: [
      { label: "Opened", value: "3 December 1906" },
      { label: "Architect", value: "Frank Matcham" },
      { label: "Built", value: "1904–1906" },
      { label: "Operator", value: "Aberdeen Performing Arts, for Aberdeen City Council" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "Arthur submitted plans for the Rosemount Viaduct site in 1901 and opened the finished theatre in December 1906. His company ran out of money in 1912; the theatre passed through the Tivoli's managing director and then, in 1932, to Councillor James F. Donald, who refurbished it and put neon on the front.",
          "The city council owns it now and Aberdeen Performing Arts programmes it. More than 1,400 seats makes it the only room in the region that takes a full touring musical.",
        ],
      },
    ],
  },
  {
    slug: "opera-house-manchester",
    name: "Manchester Opera House",
    city: "manchester",
    address: "3 Quay Street, Manchester, M3 3HP",
    lat: 53.478889,
    lon: -2.251366,
    capacity: 1920,
    opened: "1912",
    image: "/venues/opera-house-manchester.jpg",
    imageAlt:
      "The Opera House on Quay Street, Manchester, its fifteen-bay classical front and fluted columns.",
    imageCredit: "Gerald England",
    imageLicense: "CC BY-SA 2.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Opera_House,_Manchester_-_geograph.org.uk_-_5624967.jpg",
    summary:
      "It has been the New Theatre, the New Queen's Theatre, the Opera House and, for five years from 1979, a bingo hall. The Palace Trust bought it back in 1984, and 1,920 seats on Quay Street now take the largest touring musicals to reach Manchester.",
    details: [
      { label: "Opened", value: "1912" },
      { label: "Architects", value: "Richardson and Gill with Farquharson" },
      { label: "Owner", value: "Ambassador Theatre Group" },
      { label: "Listed", value: "Grade II, since 1974" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "The fifteen-bay classical front with its fluted Ionic columns is stuccoed brick under a slate roof, and it is the reason the building is listed. Howard & Wyndham bought the theatre in 1931 and brought in C. B. Cochran as a visiting producer, which is how a run of West End musicals and revues came to open in Manchester first.",
          "Apollo Leisure took it on in 1990 and put big musicals back into it; ATG bought it in 2009 and it shares a parent company, and often a tour, with the Palace Theatre on Oxford Street.",
        ],
      },
    ],
  },
  {
    slug: "grand-opera-house-york",
    name: "Grand Opera House York",
    city: "york",
    address: "Cumberland Street, York, YO1 9SW",
    lat: 53.957135,
    lon: -1.082282,
    opened: "20 January 1902",
    image: "/venues/grand-opera-house-york.jpg",
    imageAlt:
      "The Grand Opera House on the corner of Clifford Street, York, the old corn exchange front in red brick.",
    imageCredit: "Malcolmxl5",
    imageLicense: "CC BY-SA 4.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Grand_Opera_House,_York_Feb_2022_02.jpg",
    summary:
      "It was a corn exchange first. William Peacock bought the 1868 building and the warehouse behind it, spent £24,000 joining them together, and opened the result as a theatre in January 1902 with a pantomime starring Florrie Forde.",
    details: [
      { label: "Opened as a theatre", value: "20 January 1902" },
      { label: "Architect", value: "J. P. Briggs; corn exchange by George Alfred Dean, 1868" },
      { label: "Owner", value: "Ambassador Theatre Group" },
      { label: "Listed", value: "Grade II, since 1986" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "The Italianate red-brick front on Clifford Street was Dean's corn exchange, opened in October 1868 and made obsolete within thirty years by the collapse in British agriculture. The auditorium behind it — raked seating, proscenium arch, stage — is Briggs's, dropped into the old warehouse.",
          "It was renamed the Grand Opera House and Empire in 1903, showed silent films early, became the Empire Theatre in 1916, and has been back to its original name and its original job for decades: touring plays, musicals, opera and ballet.",
        ],
      },
    ],
  },
  {
    slug: "blackpool-opera-house",
    name: "Blackpool Opera House",
    city: "blackpool",
    address: "Church Street, Blackpool, FY1 1HU",
    lat: 53.817060,
    lon: -3.050964,
    officialSlug: "venue-blackpool-opera-house",
    capacity: 2812,
    opened: "10 June 1889",
    summary:
      "The third largest theatre in the United Kingdom, after the Hammersmith Apollo and the Edinburgh Playhouse — and the third building of that name on the site inside the Winter Gardens — Matcham's original of 1889 was outgrown, its 1911 replacement was demolished, and the present modernist house opened in 1939.",
    details: [
      { label: "Opened", value: "10 June 1889; present building 14 July 1939" },
      { label: "Original architect", value: "Frank Matcham" },
      { label: "Owner", value: "Blackpool Council; operated by Crown Leisure" },
      { label: "Listed", value: "Grade II*, as part of the Winter Gardens" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "Matcham's first Opera House cost £9,098, seated 2,500 and opened as Her Majesty's Opera House with the premiere run of Gilbert and Sullivan's The Yeomen of the Guard. It was full enough to be rebuilt bigger within twenty-one years, and rebuilt again a generation later.",
          "The 1939 house has a sweeping curved proscenium and the last new Wurlitzer organ installed anywhere in Britain, played on the opening night by Horace Finch and Reginald Dixon and still in use.",
        ],
      },
    ],
  },
  {
    slug: "nottingham-royal-concert-hall",
    name: "Royal Concert Hall",
    city: "nottingham",
    address: "Theatre Square, City of Nottingham, NG1 5ND",
    lat: 52.955697,
    lon: -1.151785,
    officialSlug: "venue-nottingham-royal-concert-hall",
    capacity: 2499,
    opened: "27 November 1982",
    image: "/venues/nottingham-royal-concert-hall.jpg",
    imageAlt:
      "The Royal Concert Hall on South Sherwood Street, Nottingham, beside the Theatre Royal's portico.",
    imageCredit: "Bryn Holmes",
    imageLicense: "CC BY-SA 2.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Theatre_Royal-Royal_Concert_Hall,_South_Sherwood_Street_-_geograph.org.uk_-_7397361.jpg",
    summary:
      "A concert hall sharing a building with Nottingham's Theatre Royal, opened in 1982 with Elton John on the first night. It stands where Frank Matcham's Empire Palace of 1898 stood until the road-wideners took it in 1969.",
    transit:
      "The Royal Centre tram stop is directly outside, on the Nottingham Express Transit.",
    details: [
      { label: "Opened", value: "27 November 1982" },
      { label: "Architects", value: "Renton Howard Wood Levin Partnership" },
      { label: "Cost", value: "£12 million" },
      { label: "Owner", value: "Nottingham City Council" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "RHWL, the practice behind the Sheffield Crucible and Manchester's Bridgewater Hall, designed it; work started in 1980 and finished two years later. The modern block opposite the Theatre Royal's portico is a deliberate contrast, and the two share a foyer and a box office.",
          "It is a concert hall rather than a lyric theatre, which is why the musicals that play it are the ones that travel with a concert staging rather than a full set.",
        ],
      },
    ],
  },
  {
    slug: "alhambra-theatre-bradford",
    name: "Alhambra Theatre",
    city: "bradford",
    address: "Morley Street, Bradford, BD7 1AJ",
    lat: 53.791657,
    lon: -1.757052,
    officialSlug: "venue-alhambra-theatre-bradford",
    capacity: 1456,
    opened: "18 March 1914",
    summary:
      "Named after the palace in Granada and built for £20,000 by the pantomime impresario Francis Laidler, who wanted Bradford to have a house as good as anything in Leeds. The domed turret with its paired Corinthian columns is still one of the two landmarks on the city's skyline.",
    details: [
      { label: "Opened", value: "18 March 1914" },
      { label: "Architects", value: "Chadwick and Watson of Leeds" },
      { label: "Owner", value: "City of Bradford Metropolitan District Council" },
      { label: "Listed", value: "Grade II, since 1974" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "Bradford Council bought the theatre in 1964 for £78,900 and rebuilt it between 1984 and 1986. The white faience front, made by Gibbs and Canning of Tamworth, was painted white and grey during that work.",
          "Inside, two tiers of moulded plasterwork curve round to boxes set in round-arched openings between giant fluted columns. The main house seats 1,456 and takes large-scale tours of every kind.",
        ],
      },
    ],
  },
  {
    slug: "cliffs-pavilion-southend",
    name: "Cliffs Pavilion",
    city: "southend",
    address: "San Remo Parade, Southend-on-Sea, SS0 7RD",
    lat: 51.535223,
    lon: 0.696904,
    capacity: 1630,
    opened: "July 1964",
    summary:
      "The largest purpose-built arts venue in Essex, and the largest-capacity theatre in the east of England, sitting on the clifftop at Westcliff-on-Sea. The council bought the site in 1935 and the war and then the budget left it empty for so long that locals called it Southend's white elephant.",
    details: [
      { label: "Opened", value: "July 1964" },
      { label: "Architect", value: "Patrick Burridge, borough architect" },
      { label: "Refurbished", value: "2010; 2024–2025" },
      { label: "Operator", value: "Trafalgar Entertainment, for Southend-on-Sea City Council" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "Work on a 500-seat Shorefield Pavilion began in 1939 and stopped when war broke out. Building restarted in 1963 on a larger plan, and Bernard Miles opened the 1,100-seat theatre in July 1964; the hexagonal sunken forecourt outside followed the line of the pre-war foundations until the recent refurbishment.",
          "Capacity is now 1,630. HQ Theatres took over the programming in 2006 and merged into Trafalgar Entertainment in 2021.",
        ],
      },
    ],
  },
  {
    slug: "congress-theatre-eastbourne",
    name: "Congress Theatre",
    city: "eastbourne",
    address: "Carlisle Road, Eastbourne, BN21 4JR",
    lat: 50.762789,
    lon: 0.283403,
    capacity: 1689,
    opened: "13 June 1963",
    summary:
      "One of the largest theatres in the south of England, and one of the very few post-war ones listed at Grade II*. Duke Ellington played his last recorded concert here on 1 December 1973 and died five months later.",
    details: [
      { label: "Opened", value: "13 June 1963" },
      { label: "Architects", value: "Bryan and Norman Westwood; engineers Ove Arup and Partners" },
      { label: "Owner", value: "Eastbourne Borough Council" },
      { label: "Listed", value: "Grade II*" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "Designed in 1958 and built between 1961 and 1963 by the local firm Llewellyns, it opened with a fanfare from the Royal Military School of Music and a London Philharmonic concert conducted by Arthur Bliss. Princess Margaret unveiled a plaque here in 1965.",
          "A major refurbishment in 2019 brightened the front of house without touching the character of the original design. The 1,689 seats make it the room on the south coast that a full touring musical can use.",
        ],
      },
    ],
  },
  {
    slug: "birmingham-hippodrome",
    name: "Birmingham Hippodrome",
    city: "birmingham",
    address: "Hurst Street, Birmingham, B5 4TB",
    lat: 52.474296,
    lon: -1.898036,
    officialSlug: "venue-birmingham-hippodrome",
    capacity: 1935,
    opened: "1899",
    summary:
      "More than 600,000 people a year come through the doors, which makes this the busiest single theatre in the United Kingdom and the busiest dance venue outside London. It is the home stage of the Birmingham Royal Ballet, and it started life as a set of assembly rooms with a circus ring and a Moorish tower.",
    details: [
      { label: "Opened", value: "1899, as the Tower of Varieties" },
      { label: "Auditorium", value: "Burdwood and Mitchell, 1924" },
      { label: "Operator", value: "Birmingham Hippodrome Theatre Trust" },
      { label: "Resident company", value: "Birmingham Royal Ballet" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "Assembly rooms went up on Hurst Street in 1895; F. W. Lloyd added a stage, a circus ring and a tower four years later. It failed, reopened as the Tivoli in 1900, and became the Hippodrome under Thomas Barrasford in 1903. The neo-classical auditorium in use today was built in 1924.",
          "The entrance and the tower were demolished in 1963 when Smallbrook Queensway went through. The city council bought the theatre in the 1970s and a registered charity has run it since 1979; the stagehouse was rebuilt in the 1980s so that the largest touring sets would fit.",
        ],
      },
    ],
  },
  {
    slug: "norwich-theatre-royal",
    name: "Norwich Theatre Royal",
    city: "norwich",
    address: "Theatre Street, Norwich, NR2 1RL",
    lat: 52.627222,
    lon: 1.290039,
    officialSlug: "venue-norwich-theatre-royal",
    capacity: 1308,
    opened: "1758",
    image: "/venues/norwich-theatre-royal.jpg",
    imageAlt:
      "Norwich Theatre Royal on Theatre Street, its 1935 front above the entrance canopy.",
    imageCredit: "Adrian S Pye",
    imageLicense: "CC BY-SA 2.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Norwich_Theatre_Royal_-_geograph.org.uk_-_7566091.jpg",
    summary:
      "Founded in 1758 by the Norwich architect Thomas Ivory on the model of Drury Lane, which makes it one of the oldest established theatres in the country. It has been rebuilt three times, burned down once and bombed once, and it is still on the same street.",
    details: [
      { label: "Founded", value: "1758" },
      { label: "Rebuilt", value: "1801, 1826, 1935" },
      { label: "Owner", value: "Norwich Theatre" },
      { label: "Auditorium", value: "Main house, 1,308 seats" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "The original house held about a thousand people. Parliament granted it Theatre Royal status in 1768, with the right to perform all drama, and the title drew the stars of the day: Sarah Siddons played Hamlet, Juliet and Lady Macbeth here, and Ira Aldridge appeared in January 1848.",
          "William Wilkins rebuilt it in 1800 and again in 1826; gas replaced candles in 1836; Frank Matcham redesigned the interior in 1894. It burned down in 1934 and the theatre standing today opened just over a year later, in 1935.",
        ],
      },
    ],
  },
  {
    slug: "theatre-royal-brighton",
    name: "Theatre Royal Brighton",
    city: "brighton",
    address: "11 New Road, Brighton, BN1 1UF",
    lat: 50.823414,
    lon: -0.139913,
    capacity: 952,
    opened: "27 June 1807",
    image: "/venues/theatre-royal-brighton.jpg",
    imageAlt:
      "The Theatre Royal on New Road, Brighton, red brick above the colonnade, with the vertical sign on the corner.",
    imageCredit: "Hassocks5489",
    imageLicense: "CC0",
    imageLicenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Theatre_Royal,_New_Road,_Brighton_(NHLE_Code_1380103)_(May_2020)_(2).JPG",
    summary:
      "The Prince of Wales, later George IV, gave his assent for it, and it opened in June 1807 with Hamlet. Under 952 seats over four levels it is the smallest house on this tour, and for most of the twentieth century it was where London producers found out whether a play worked.",
    details: [
      { label: "Opened", value: "27 June 1807" },
      { label: "Rebuilt", value: "1854, by Charles J. Phipps" },
      { label: "Owner", value: "Ambassador Theatre Group" },
      { label: "Listed", value: "Grade II*, since 1971" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "It struggled until the actor Henry John Nye Chart bought it in 1854 and brought in Charles J. Phipps to expand it. When Chart died in 1876 his wife Ellen took over and ran it for two decades — one of the first women to manage a British theatre. There is a statue of her in the Royal Circle bar.",
          "Ibsen, Rattigan, Coward and Orton all had plays tried out here before London, and the list of people who have worked on the stage runs from Olivier and Gielgud to Marlene Dietrich and Judi Dench.",
        ],
      },
    ],
  },
  {
    slug: "grand-opera-house-belfast",
    name: "Grand Opera House Belfast",
    city: "belfast",
    address: "2-4 Great Victoria Street, Belfast City District, BT2 7HR",
    lat: 54.595334,
    lon: -5.935192,
    officialSlug: "venue-grand-opera-house-belfast",
    capacity: 1058,
    opened: "23 December 1895",
    summary:
      "The Theatres Trust rates its auditorium as probably the best surviving example in the UK of theatre architecture in the oriental style. Frank Matcham opened it two days before Christmas in 1895; it closed in 1972, came back in 1980, and was restored again in 2020 at a cost of £12.2 million.",
    details: [
      { label: "Opened", value: "23 December 1895" },
      { label: "Architect", value: "Frank Matcham" },
      { label: "Restored", value: "2020–2021, £12.2 million" },
      { label: "Owner", value: "Grand Opera House Trust" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "It opened as the New Grand Opera House and Cirque, spent five years from 1904 as the Palace of Varieties, and took its present name in 1909. Charlie Chaplin played here in 1908. Nellie Melba, Sarah Bernhardt and Gracie Fields were regulars.",
          "It became a repertory theatre during the Second World War, and Eisenhower, Montgomery and Alanbrooke came to the gala performances marking its end. Laurel and Hardy, Orson Welles and Pavarotti — making his British debut — all appeared afterwards.",
        ],
      },
    ],
  },
  {
    slug: "bristol-hippodrome",
    name: "Bristol Hippodrome",
    city: "bristol",
    address: "St Augustine's Parade, Bristol, BS1 4UZ",
    lat: 51.453236,
    lon: -2.598943,
    capacity: 1951,
    opened: "16 December 1912",
    summary:
      "Matcham built it for Oswald Stoll with a water tank at the front of the stage that held 100,000 gallons, and a glass screen that could be raised to keep the orchestra dry. The dome still opens, though air conditioning has made that a party trick rather than a necessity.",
    details: [
      { label: "Opened", value: "16 December 1912" },
      { label: "Architect", value: "Frank Matcham" },
      { label: "Owner", value: "Ambassador Theatre Group" },
      { label: "Listed", value: "Grade II, since 1977" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "It came through the war and then lost its stage to a fire in 1948; the auditorium survived and the theatre reopened about ten months later. Three levels seat 1,951.",
          "The stage is one of the largest outside London, which is why the big musicals come here rather than anywhere else in the west. Eddie Cochran played his last concert on it in 1960, hours before the crash near Chippenham that killed him.",
        ],
      },
    ],
  },
  {
    slug: "milton-keynes-theatre",
    name: "Milton Keynes Theatre",
    city: "milton-keynes",
    address: "500 Midsummer Boulevard, Milton Keynes, MK9 3NZ",
    lat: 52.044324,
    lon: -0.749001,
    opened: "4 October 1999",
    summary:
      "The ceiling moves. It can be raised or lowered and the seating rearranged, so the auditorium runs anywhere from 900 to 1,400 seats depending on what is playing — a design decision taken after a campaign for a theatre in Milton Keynes that lasted twenty-five years.",
    details: [
      { label: "Opened", value: "4 October 1999" },
      { label: "Architects", value: "Blonski-Heard with Kut Nadiadi and Robert Doe" },
      { label: "Capacity", value: "900–1,400, depending on the configuration" },
      { label: "Owner", value: "Ambassador Theatre Group" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "Arup Acoustics built a 1:50 scale model of the room to work out what the moving ceiling would do to the sound before it was installed. The result takes a full-scale musical one week and a small drama the next without either sounding wrong.",
          "ATG was appointed to run the theatre in 1998, a year before it opened, and still does.",
        ],
      },
    ],
  },
  {
    slug: "hall-for-cornwall",
    name: "Hall for Cornwall",
    city: "truro",
    address: "Back Quay, Truro, TR1 2LL",
    lat: 50.262726,
    lon: -5.050594,
    officialSlug: "venue-hall-for-cornwall",
    opened: "1846",
    image: "/venues/hall-for-cornwall.jpg",
    imageAlt:
      "Hall for Cornwall on Back Quay, Truro, the Italianate granite front and clocktower.",
    imageCredit: "Ian S",
    imageLicense: "CC BY-SA 2.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Hall_for_Cornwall_on_Back_Quay,_Truro_-_geograph.org.uk_-_4429068.jpg",
    summary:
      "It was Truro's market hall and council chamber before it was a theatre, and it kept the name City Hall until 1997. The Italianate granite front on Boscawen Street, the clock of 1854 and the tower of 1858 are all still there; the auditorium behind them is not the one the Victorians built.",
    details: [
      { label: "Built", value: "1846" },
      { label: "Architect", value: "Christopher Eales" },
      { label: "Listed", value: "Grade II*, since 1971" },
      { label: "Former name", value: "Truro City Hall, until 1997" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "Truro's first municipal building here was a seventeenth-century market house, arcaded so that trading could go on underneath an assembly room. It was replaced in 1809, found wanting again, and rebuilt to Christopher Eales's design in granite ashlar, finished in 1846.",
          "The north end held a courtroom and a council chamber, the south end the market. The suffragist Helen Beedy argued for votes for women at a public meeting in the building in December 1874, three years before Truro became a city.",
        ],
      },
    ],
  },
  {
    slug: "new-theatre-oxford",
    name: "New Theatre Oxford",
    city: "oxford",
    address: "18-20 George Street, Oxford, OX1 2AG",
    lat: 51.753863,
    lon: -1.259838,
    capacity: 1785,
    opened: "26 February 1934",
    image: "/venues/new-theatre-oxford.jpg",
    imageAlt:
      "New Theatre Oxford on George Street, its 1930s front between the shopfronts.",
    imageCredit: "Steve Daniels",
    imageLicense: "CC BY-SA 2.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:New_Theatre_Oxford_Geograph-4785233-by-Steve-Daniels.jpg",
    summary:
      "A theatre has stood on this corner of George Street since 1836, and the first one was barred from staging plays during university terms — so it put on concerts and music hall instead. The present Art Deco house, 1,785 seats, opened in 1934 and spent twenty-six years called the Apollo.",
    details: [
      { label: "Opened", value: "26 February 1934" },
      { label: "Architects", value: "Milburn Brothers; interior by T. P. Bennett and Sons" },
      { label: "Owner", value: "ATG Entertainment" },
      { label: "Former name", value: "Apollo Theatre, 1977–2003" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "The second New Theatre was opened by the Oxford University Dramatic Society in February 1886 with Twelfth Night, after townspeople and university members raised the money for a house both could use. The Dorrill family managed it until 1972.",
          "The building in use now dates from 1933. Its original scheme was deep brown with gilt friezes; a multicoloured one arrived around 1980. It takes musicals, comedy and concerts, and the capacity puts it among the larger touring houses in the south.",
        ],
      },
    ],
  },
  {
    slug: "hull-new-theatre",
    name: "Hull New Theatre",
    city: "hull",
    address: "Kingston Square, Hull, HU1 3HF",
    lat: 53.747618,
    lon: -0.337334,
    officialSlug: "venue-hull-new-theatre",
    capacity: 1351,
    opened: "1939",
    image: "/venues/hull-new-theatre.jpg",
    imageAlt:
      "Hull New Theatre on Kingston Square, after the rebuild that reopened it in 2017.",
    imageCredit: "Ian S",
    imageLicense: "CC BY-SA 2.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Hull_New_Theatre,_Hull_-_geograph.org.uk_-_5233236.jpg",
    summary:
      "It opened in 1939 as the permanent home the Hull Repertory Theatre Company had never had, and it closed again in January 2016 for the biggest rebuild of its life. The Royal Ballet reopened it on 16 September 2017, in the middle of Hull's year as UK City of Culture.",
    details: [
      { label: "Opened", value: "1939" },
      { label: "Rebuilt", value: "2016–2017, £11.7 million" },
      { label: "Owner", value: "Hull City Council" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "The refit was planned around the City of Culture year. An Arts Council grant of £5 million did not come, the council decided to go ahead anyway, and £13 million announced in the 2016 Budget covered the gap.",
          "The theatre came back with more seats than it had before — 1,351 — and a stage that takes full-scale touring musicals, opera and ballet, plus the pantomime that is still the busiest thing in its year.",
        ],
      },
    ],
  },
  {
    slug: "venue-cymru",
    name: "Venue Cymru",
    city: "llandudno",
    address: "Ffordd Gwynedd, Llandudno, LL30 1BB",
    lat: 53.321823,
    lon: -3.817405,
    opened: "1982",
    image: "/venues/venue-cymru.jpg",
    imageAlt:
      "Venue Cymru on the Llandudno seafront, the low modern block against the bay.",
    imageCredit: "Bill Boaden",
    imageLicense: "CC BY-SA 2.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Venue_Cymru_(geograph_5294767).jpg",
    summary:
      "Theatre, arena and conference centre on the Llandudno seafront, and the third or fourth name for entertainment on this site: the Victoria Palace of 1894 became the Llandudno Opera House, then the Hippodrome, then the Arcadia, before the Aberconwy Centre replaced it all in 1982.",
    details: [
      { label: "Opened", value: "1982, as the Aberconwy Centre" },
      { label: "Renamed", value: "North Wales Theatre and Conference Centre, 1994; Venue Cymru, 2007" },
      { label: "Owner", value: "Conwy County Borough Council" },
      { label: "Refurbished", value: "1994, 2005" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "The Victoria Palace opened in July 1894 as a temporary 1,150-seat concert hall for Jules Rivière, then seventy-five, and his orchestra of forty-two, after he fell out with the pier company. Charles and Wilma Hallé gave a recital with them that year.",
          "Will Catlin bought it in 1916 and ran it as the Arcadia, home of Catlin's Pierrots and a young Ken Dodd. The building that replaced it in 1982 does what the seaside seasons used to: a theatre big enough for a touring musical and an arena for everything else.",
        ],
      },
    ],
  },
  {
    slug: "sunderland-empire",
    name: "Sunderland Empire",
    city: "sunderland",
    address: "High Street West, Sunderland, SR1 3EX",
    lat: 54.906595,
    lon: -1.389423,
    capacity: 1860,
    opened: "1 July 1907",
    image: "/venues/sunderland-empire.jpg",
    imageAlt:
      "The Sunderland Empire on High Street West, its tower and dome carrying the statue of Terpsichore.",
    imageCredit: "Colin Park",
    imageLicense: "CC BY-SA 2.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sunderland_-_High_St_West_%5E_Empire_Theatre_-_geograph.org.uk_-_7939436.jpg",
    summary:
      "Four tiers — stalls, dress circle, upper circle and gallery — which almost no British theatre still has, and room for 2,200 once the standing places are counted. Vesta Tilley laid the foundation stone in 1906 and came back to open it the following July.",
    details: [
      { label: "Opened", value: "1 July 1907" },
      { label: "Owner", value: "City of Sunderland Council; operated by ATG Entertainment" },
      { label: "Former name", value: "Empire Palace" },
      { label: "Auditorium", value: "Four tiers, six boxes" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "Richard Thornton built it on his own after his partnership with Edward Moss broke up, and called it the Empire Palace. The statue of Terpsichore on the revolving sphere at the top of the ninety-foot tower came down during the war, after a nearby bomb shook the building; the original now stands at the head of the main staircase and a replica is back on the dome.",
          "Variety carried the theatre until the mid-1920s. A projection box went in during 1930 as touring declined. It is one of the largest venues in the north-east, which is what brings the big tours back to it.",
        ],
      },
    ],
  },
  {
    slug: "orchard-theatre-dartford",
    name: "Orchard Theatre",
    city: "dartford",
    address: "1 Home Gardens, Dartford, DA1 1ED",
    lat: 51.446005,
    lon: 0.217884,
    capacity: 1025,
    opened: "14 April 1983",
    summary:
      "A 1,025-seat receiving house built by Dartford Borough Council and opened by the Duke of Kent in April 1983. In September 2023 the council closed it over the reinforced autoclaved aerated concrete in its structure, and its programme moved to a temporary building called Orchard West — so check the address on your ticket before you travel.",
    details: [
      { label: "Opened", value: "14 April 1983" },
      { label: "Operator", value: "Trafalgar Entertainment, since March 2021" },
      { label: "Closed", value: "September 2023, over RAAC concrete" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "The council built it and ran it, HQ Theatres took over the programming in 2008, and Trafalgar Entertainment inherited that in 2021. The mix is what a town-centre receiving house always is: music, comedy, dance, drama and a pantomime.",
          "The 2023 closure was a structural one, not a commercial one. Dates listed against the Orchard for 2027 are the producer's, and where the audience actually sits is the council's decision to announce.",
        ],
      },
    ],
  },
  {
    slug: "woking-theatre",
    name: "Woking Theatre (New Victoria)",
    city: "woking",
    address: "Victoria Way, Woking, GU21 6GQ",
    lat: 51.320657,
    lon: -0.560027,
    capacity: 1300,
    opened: "June 1992",
    image: "/venues/woking-theatre.jpg",
    imageAlt:
      "The New Victoria Theatre on Victoria Way, Woking, the glazed front of the complex.",
    imageCredit: "User:Hassocks5489",
    imageLicense: "CC0",
    imageLicenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:New_Victoria_Theatre,_Victoria_Way,_Woking_(June_2015)_(2).jpg",
    summary:
      "One of the largest receiving houses outside London, inside a complex that also holds the smaller Rhoda McGaw Theatre and a six-screen cinema. Chicago has played it before.",
    details: [
      { label: "Opened", value: "June 1992" },
      { label: "Owner", value: "Ambassador Theatre Group" },
      { label: "Levels", value: "Stalls, Royal Circle, Upper Circle" },
      { label: "Also on site", value: "Rhoda McGaw Theatre; six-screen cinema" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "The Royal Shakespeare Company, the National and the Peter Hall Company have all brought work here, and Glyndebourne on Tour, Scottish Ballet and Northern Ballet are regulars. Carmen Jones, Cats and Miss Saigon have played the main house.",
          "The first three rows of the stalls — AA, BB and CC — come out when a show needs an orchestra pit, which is worth knowing if you are choosing seats for a musical.",
        ],
      },
    ],
  },
  {
    slug: "everyman-theatre-cheltenham",
    name: "Everyman Theatre",
    city: "cheltenham",
    address: "7-10 Regent Street, Cheltenham, GL50 1HE",
    lat: 51.899638,
    lon: -2.075015,
    officialSlug: "venue-everyman-theatre-cheltenham",
    capacity: 718,
    opened: "1 October 1891",
    image: "/venues/everyman-theatre-cheltenham.jpg",
    imageAlt:
      "The Everyman Theatre on Regent Street, Cheltenham, Frank Matcham's front of 1891.",
    imageCredit: "bazzadarambler",
    imageLicense: "CC BY 2.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Everyman_Theatre,_Cheltenham-4077863023.jpg",
    summary:
      "Frank Matcham's New Theatre and Opera House opened in October 1891 with Lillie Langtry on the stage and about 1,500 people on benches. It seats 718 now, which makes it the smallest room on this tour and the one where you can see faces from the back.",
    details: [
      { label: "Opened", value: "1 October 1891" },
      { label: "Architect", value: "Frank Matcham" },
      { label: "Auditoriums", value: "Main house (718), Studio (60)" },
      { label: "Listed", value: "Grade II" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "It took a cinema licence in 1929 on the condition that it kept staging live performance, and it spent the Second World War as a garrison theatre for civilians and the American soldiers stationed at Pittville, with London actors escaping the Blitz on its stage.",
          "It closed in 1959 and was nearly sold. An advertisement asking for £3,000 at once to reopen the opera house did the trick: the Everyman opened in May 1960 with the world premiere of N. C. Hunter's A Piece of Silver.",
        ],
      },
    ],
  },
  {
    slug: "regent-theatre-stoke",
    name: "Regent Theatre",
    city: "stoke",
    address: "Piccadilly, Stoke-on-Trent, ST1 1AP",
    lat: 53.024381,
    lon: -2.176709,
    capacity: 1600,
    opened: "1929",
    summary:
      "It was a super cinema first — one of a chain of Regents, opened in 1929 for cine-variety, with a Wurlitzer and a stage for the acts between films. As the Gaumont it took the Beatles, Shirley Bassey and Stevie Wonder; it became a full-time theatre only in 1999.",
    details: [
      { label: "Opened", value: "1929, as a cinema; 1999, as a theatre" },
      { label: "Architect", value: "William E. Trent" },
      { label: "Operator", value: "ATG Entertainment, for Stoke-on-Trent City Council" },
      { label: "Resident", value: "Northern base of Glyndebourne Touring Opera" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "Provincial Cinematograph Theatres commissioned it and the Lord Mayor opened it in 1929. Gaumont British renamed it in 1950 and it picked up the live bookings the closing Theatre Royal let go. It was cut into three screens in 1974, taken over by Odeon in 1976 and closed when a multiplex opened in 1989.",
          "By the late 1990s the interior had deteriorated badly. The conversion finished in 1999 and gave the city a 1,600-seat lyric theatre, which is what large touring musicals need and a converted cinema does not usually offer.",
        ],
      },
    ],
  },
  {
    slug: "edinburgh-playhouse",
    name: "Edinburgh Playhouse",
    city: "edinburgh",
    address: "18-22 Picardy Place, City of Edinburgh, EH1 3AA",
    lat: 55.956768,
    lon: -3.184984,
    capacity: 3059,
    opened: "12 August 1929",
    summary:
      "The largest theatre in Scotland and the second largest in the United Kingdom. It opened in 1929 as a super-cinema modelled on the Roxy in New York, closed in the early 1970s, and was saved from demolition by a petition of fifteen thousand signatures.",
    details: [
      { label: "Opened", value: "12 August 1929" },
      { label: "Architect", value: "John Fairweather" },
      { label: "Converted to a theatre", value: "1978–1980" },
      { label: "Listed", value: "Category A, since 2008" },
    ],
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "Fairweather specialised in cinemas — Green's Playhouse in Glasgow was his — and built this one for an audience that filled it nightly for forty years. When it closed, the listing that followed the 1974 campaign is the only reason the building is still on Greenside.",
          "Lothian Region's architects converted it into a theatre between 1978 and 1980. It has passed through five owners since the council sold it in 1983, and it is now the room in Scotland that takes the shows too big for anywhere else.",
        ],
      },
    ],
  },
];
