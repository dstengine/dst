import type { Show } from "./types";
import { historySection } from "./history";
import { songsSection } from "./songs";

// The shows this site covers. Chicago is the hero event and carries the full
// format — a page per run, a page per venue, a history, the songs, the legal
// video. Cats arrives with the part that is load-bearing for a listings site:
// the runs, the venues, the sellers and an About. The editorial sections come
// when there is something sourced to put in them, not to fill the shape.

export const shows: Show[] = [
  {
    slug: "chicago",
    title: "Chicago The Musical",
    officialSlug: "chicago-official",
    officialDomain: "chicagothemusical.com",
    featured: true,
    eyebrow: "The event we cover in full",
    hubCard:
      "Every run, the tour, a hundred years of it, and what you can watch tonight for nothing.",
    checkedOn: "29 August 2026",
    tagline:
      "Kander and Ebb's 1975 vaudeville about murder as a career move, and the longest-running American musical on Broadway.",
    summary:
      "Chicago The Musical, everywhere it plays: Broadway without a closing date, Tokyo, Osaka and Dubai in 2026, and thirty-three British and Irish theatres in 2027 — with the venue, the dates and the seller for each.",
    hook: [
      "Chicago failed first. It opened in June 1975, ran 936 performances, spent its whole life in the shadow of A Chorus Line, and closed. The revival that resurrected it twenty-one years later was a concert staging with no set, no costumes to speak of and the band pushed on stage because there was nowhere else to put them \u2014 and that cheap idea is the version now playing its fourth decade at the Ambassador Theatre.",
      "It is the longest-running American musical in Broadway history and the second-longest-running show of any kind, past 11,000 performances and still selling. This year it also plays Tokyo, Osaka and Dubai; next year, thirty-three theatres across Britain and Ireland.",
      "Below is every run this site tracks \u2014 the theatre, the dates and whoever is actually selling the tickets \u2014 plus what the show is, how it got here, and the numbers you can watch tonight for nothing.",
    ],
    clips: [
      {
        id: "Xx_eoxvYvc8",
        slug: "all-that-jazz",
        title: "All That Jazz — official video",
        channel: "Chicago The Musical",
        checkedOn: "29 August 2026",
        note: "The opening number, and the production's own film of it. Velma sings the audience into a nightclub while a murder happens behind her.",
        body: [
          "Almost every musical opens by telling you where you are. Chicago opens by telling you what it wants from you: Velma Kelly walks out alone, invites the audience to a night of \u201cmusic and dancin\u2019 and all that jazz\u201d, and performs an entire number without mentioning that she has just killed two people.",
          "Watch what runs underneath it. While Velma holds the front of the stage, Roxie Hart shoots her lover on the other side of it \u2014 the show\u2019s whole argument delivered before anyone has said a line: the crime is the small part, the performance is the career.",
          "The number belongs to Fred Ebb\u2019s lyric and John Kander\u2019s vamp, and to the Fosse vocabulary that arrives with it \u2014 turned-in knees, angled shoulders, the hat doing the work a face would do anywhere else.",
        ],
      },
      {
        id: "MnQKqtWT6nM",
        slug: "all-that-jazz-broadway",
        title: "CHICAGO on Broadway: All That Jazz",
        channel: "Chicago The Musical",
        checkedOn: "29 August 2026",
        note: "The same number from the Broadway company — the bare stage, the band behind the cast, the Fosse vocabulary intact.",
        body: [
          "The same song, staged by the company that has been playing it at the Ambassador Theatre since 2003. Nothing is hidden: the orchestra sits on stage in full view, the cast wear black, and the set is the band.",
          "That look is not a budget. It is what survived from the 1996 concert staging at City Center, which had no money for a set, worked better without one, and became the version that has now outlived every fully dressed production the show ever had.",
          "It is also the fairest preview of what a ticket buys. If you are trying to picture the evening in Dubai, Tokyo or Manchester, picture this \u2014 a band, a bare stage and thirteen dancers, in a theatre.",
        ],
      },
      {
        id: "ly3ccyTI-Js",
        slug: "cell-block-tango",
        title: "Cell Block Tango — 1997 cast recording",
        channel: "Michael Berresse — Topic",
        checkedOn: "29 August 2026",
        note: "Six women on murderers' row explain themselves. Audio from the revival cast album, on the rights holder's own channel.",
        body: [
          "Six women in the Cook County jail take turns explaining how their men died. Five of them tell the same joke with different props \u2014 \u201che had it coming\u201d \u2014 and the audience laughs at each one.",
          "The sixth is the Hunyak, who speaks Hungarian, and whose verse is the only one that does not end in a confession. She is the one the show later executes. The number is funny for five minutes so that the second act can cash the cheque.",
          "This is audio from the 1997 Broadway revival cast recording, on the rights holders\u2019 own channels. In the theatre the number is danced as well as sung, which the album necessarily leaves out.",
        ],
      },
      {
        id: "_qLrcTzUkGo",
        slug: "razzle-dazzle",
        title: "Razzle Dazzle — 1997 cast recording",
        channel: "James Naughton — Topic",
        checkedOn: "29 August 2026",
        note: "Billy Flynn explains how a trial is won. It is the thesis of the show, sung by the lawyer.",
        body: [
          "Billy Flynn charges a flat fee, has never lost a client, and is entirely open about his method: give them a show. \u201cRazzle Dazzle\u201d is him saying it out loud, to his own client, in the middle of her trial.",
          "It is the moment the satire stops being about 1924. A courtroom run as entertainment, a defendant coached into a sympathetic character, a press pack rewarded for the version that sells \u2014 the show has been called prophetic often enough that Kander and Ebb had to keep denying they were predicting anything.",
          "Sung here by James Naughton, who won a Tony for the part in 1997. The performance is deliberately unhurried: Flynn is never in a rush, because he already knows how it ends.",
        ],
      },
    ],
    sections: [
      {
        slug: "about",
        image: "/covers/chicago-about.jpg",
        imageAlt: "Cut-paper illustration: a tilted fedora hat resting on a bentwood chair.",
        label: "About the show",
        title: "What Chicago The Musical actually is",
        description:
          "The story, the staging, the songs people leave humming, and what kind of night out it is.",
        body: [
          "A chorus girl shoots her lover, hires the best lawyer in Illinois, and turns her own murder trial into a career. That is the plot, and it was the news: Roxie Hart and Velma Kelly are two real defendants from Cook County in 1924, renamed.",
          "Music by John Kander, lyrics by Fred Ebb, book by Ebb and Bob Fosse, from Maurine Dallas Watkins's 1926 play. Roxie wants to be famous, Velma was famous first, Billy Flynn sells acquittals at a flat rate, and the press is the third party in every scene.",
          "The staging is deliberately bare: the band sits on stage in full view, the numbers are announced like vaudeville turns, and the dancing is Fosse — angled hips, turned-in knees, a hat, a held pause. That look started as a budget decision at a 1996 concert staging and has outlived every set the show ever had.",
          "If you know one number it is \"All That Jazz\". The others people leave humming are \"Cell Block Tango\" and \"Razzle Dazzle\". It is a satire about celebrity and crime, played for laughs and sex rather than sentiment, and it is billed for teenagers upwards rather than for small children — the venue for your run publishes the age guidance.",
        ],
      },
      historySection,
      songsSection,
      {
        slug: "online",
        image: "/covers/chicago-online.jpg",
        imageAlt: "Cut-paper illustration: a rounded screen with a play triangle and a strip of film sprockets.",
        label: "Watch online",
        title: "Chicago The Musical: what to watch online",
        description:
          "The numbers the production publishes itself and the cast recordings on the rights holders' channels, playing on the page.",
        template: "online",
        body: [
          "There is no ticket for the version you can watch tonight, and there does not need to be. The production keeps its own YouTube channel, the 1997 cast album sits on the rights holders' channels, and each of them lets their video play on other sites — so it plays here rather than sending you away.",
          "What is not here: full stage recordings uploaded by people who did not make them. Not out of caution — they simply stop working, and a dead player is worse than none.",
        ],
      },
      {
        slug: "tickets",
        image: "/covers/chicago-tickets.jpg",
        imageAlt: "Cut-paper illustration: a fan of overlapping torn paper stubs with perforated edges.",
        label: "Tickets",
        title: "Chicago The Musical: where to buy tickets",
        description:
          "Thirty-seven runs in one table — city, theatre, dates, and who is selling. Sales happen on the seller's own site.",
        template: "tickets",
        body: [
          "Every run of Chicago this site tracks, with whoever is actually selling it. Some stops are sold by the theatre, some by an agent, and Dubai is sold by two sellers at once. Three stops have dates but no seller yet; they are marked as such rather than left out.",
          "Nothing is sold here. Every button lands on the seller's own page, and the price you see there is the price.",
        ],
      },
    ],
  },
  {
    slug: "cats",
    title: "Cats",
    titleSeo: "Cats the musical 2026–27 tour: 23 theatres, dates",
    officialSlug: "cats-official",
    officialDomain: "catsthemusical.com",
    eyebrow: "Every stop on the tour, and who sells it",
    hubCard:
      "Twenty-three theatres between Plymouth in October and Newcastle the following June, and the seller for every one of them.",
    checkedOn: "1 September 2026",
    tagline:
      "Andrew Lloyd Webber set T. S. Eliot's book of light verse about cats to music, and it ran for twenty-one years in the West End.",
    summary:
      "Cats on tour: twenty-three theatres across Britain and Ireland between October 2026 and June 2027, with the venue, the dates and the seller for each.",
    hook: [
      "The pitch was unfundable. A sung-through musical with no plot, based on a book of light verse a poet wrote for his godchildren in 1939, in which the performers are cats. Andrew Lloyd Webber mortgaged his house to help pay for it.",
      "It opened at the New London Theatre on 11 May 1981 and closed twenty-one years later to the day, after 8,949 performances. Broadway ran it for 7,485. For seventeen years it was the longest-running musical London had ever had, and for a stretch it was the longest-running show on Broadway too.",
      "Below is every stop on the 2026–27 tour of Britain and Ireland — the theatre, the dates and who is actually selling the tickets.",
    ],
    sections: [
      {
        slug: "about",
        image: "/covers/cats-about.jpg",
        imageAlt: "Cut-paper illustration: a curled cat silhouette on a stack of angular junkyard shapes.",
        label: "About the show",
        title: "What Cats actually is",
        description:
          "A book of poems, a ball, one cat chosen, and the song everybody already knows. What kind of evening it is, and what it is not.",
        body: [
          "There is no story in the ordinary sense. A tribe of cats, the Jellicles, gather once a year for a ball at which one of them is chosen to ascend to the Heaviside Layer and be born again. Between the gathering and the choosing, the cats introduce themselves — which is where the poems come in.",
          "The text is T. S. Eliot's <em>Old Possum's Book of Practical Cats</em>, published in 1939 and written for his godchildren. Almost every lyric is Eliot, set nearly as written. That is the show's real oddity: a musical whose book is a poetry collection, and whose author had been dead for sixteen years when it opened.",
          "The exception is the one number everybody can hum. “Memory” has a lyric by Trevor Nunn, the production's director, assembled from two other Eliot poems — “Rhapsody on a Windy Night” and “Preludes” — because Grizabella needed a song and the book did not contain one.",
          "What a ticket buys is dance. Gillian Lynne's choreography is the spine of the evening, John Napier's design puts the audience at a cat's eye level in a junkyard built at three times life size, and the cast are in front of you for most of three hours in costume and makeup. It is the rare musical that works for someone who does not follow plots — and the rare one that frustrates someone who wants one.",
        ],
      },
      {
        slug: "tickets",
        image: "/covers/cats-tickets.jpg",
        imageAlt: "Cut-paper illustration: a single torn paper stub with a perforated edge and one paw-shaped punch hole.",
        label: "Tickets",
        title: "Cats on tour: where to buy tickets",
        description:
          "Twenty-three stops in one table — city, theatre, dates, and who is selling. Sales happen on the seller's own site.",
        template: "tickets",
        body: [
          "Every stop on the UK and Ireland tour, with whoever is actually selling it. At most theatres that is the theatre itself; the rest are sold by ATG. Every stop had a seller from the day the tour was announced, so nothing here is waiting on a sale date.",
          "Nothing is sold here. Every button lands on the seller's own page, and the price you see there is the price.",
        ],
      },
    ],
  },
  {
    slug: "les-miserables",
    title: "Les Misérables",
    officialSlug: "les-miserables-official",
    officialDomain: "london.lesmis.com",
    eyebrow: "The London run, and what a ticket actually buys",
    hubCard:
      "Forty-one years in the West End without a break, and it is still selling seats from £25.",
    checkedOn: "8 September 2026",
    tagline:
      "Claude-Michel Schönberg and Alain Boublil set Victor Hugo's 1,400-page novel to music, and London has been playing it since 1985.",
    summary:
      "Les Misérables at the Sondheim Theatre in London: the dates, the performance times, the running time, the age guidance and who sells the tickets — with the source for each.",
    hook: [
      "The reviews were bad. When the Royal Shakespeare Company opened Les Misérables at the Barbican on 8 October 1985, the critics filed a verdict close to unanimous, and the box office spent the next morning taking the busiest bookings the company had ever seen. The public simply overruled them.",
      "It moved to the Palace Theatre that December, moved to the Sondheim in 2004, and has not closed once in between — through the bombing anniversary of its own theatre, a rebuilt production in 2019 and a global pandemic. It passed its 14,000th London performance in September 2019, and it is the longest-running musical in the West End.",
      "Below is the run as it stands: the theatre, the performance schedule, what a seat costs, how long the evening is, and where each of those came from.",
    ],
    sections: [
      {
        slug: "about",
        image: "/covers/les-miserables-about.jpg",
        imageAlt: "Cut-paper illustration: a torn tricolour flag rising from a stack of angular barricade shapes.",
        label: "About the show",
        title: "What Les Misérables actually is",
        description:
          "A stolen loaf, a policeman who cannot let it go, a barricade that fails, and three hours of it sung. What kind of evening this is.",
        body: [
          "A man serves nineteen years for stealing bread, breaks parole, builds a respectable life under a false name, and spends the rest of it being followed by a policeman who believes the law is a moral fact. That is Victor Hugo's 1862 novel, compressed to a single evening and sung almost end to end.",
          "Music by Claude-Michel Schönberg, original French lyrics by Alain Boublil and Jean-Marc Natel, English lyrics by Herbert Kretzmer. There is barely any spoken dialogue: the score runs continuously, which is why the running time is 2 hours 50 minutes and why the interval falls where it does.",
          "The barricade at the centre of the second half is not the French Revolution. It is the June Rebellion of 1832 — a two-day Paris insurrection that failed, and whose failure is the point. The show does not let its students win.",
          "The staging you would see now is not the one that ran for the first thirty-four years. The revolving stage was retired in 2019; Matt Kinley's design puts backdrops based on Hugo's own paintings behind the cast instead, lit by Paule Constable. If you know one song it is \"I Dreamed a Dream\"; the others people leave humming are \"On My Own\", \"Bring Him Home\" and \"One Day More\".",
        ],
      },
      {
        slug: "tickets",
        image: "/covers/les-miserables-tickets.jpg",
        imageAlt: "Cut-paper illustration: a single torn paper stub on a red ground, with a round eyelet punched near one end.",
        label: "Tickets",
        title: "Les Misérables tickets in London",
        description:
          "One theatre, one official seller, and the performance schedule. Sales happen on the seller's own site.",
        template: "tickets",
        body: [
          "There is one run and one official seller: Delfont Mackintosh Theatres, who own the Sondheim and sell its dates directly. Standard tickets start at £25, and individual performances price separately above that.",
          "Nothing is sold here. The button lands on the seller's own page, and the price you see there is the price.",
        ],
      },
    ],
  },
  {
    slug: "phantom-of-the-opera",
    title: "The Phantom of the Opera",
    officialSlug: "phantom-official",
    officialDomain: "phantomoftheopera.com",
    eyebrow: "The London run, and what a ticket actually buys",
    hubCard:
      "In its fortieth year in the theatre it opened in, ten minutes from the other one.",
    checkedOn: "8 September 2026",
    tagline:
      "Andrew Lloyd Webber's 1986 musical about a composer living under an opera house, still playing in the opera house it opened in.",
    summary:
      "The Phantom of the Opera at His Majesty's Theatre in London: the dates, the performance times, the running time, the age guidance and who sells the tickets — with the source for each.",
    hook: [
      "The building is the joke nobody planned. His Majesty's Theatre opened as an opera house in 1705, spent a century staging actual opera, and has spent the last forty years staging a musical about a man who lives underneath one. The chandelier that falls every night falls in a room built for exactly this and never expecting it.",
      "Previews began on 27 September 1986, the production opened on 9 October, and it has not moved since. It is the second-longest-running show in West End history, it has played to 160 million people across 217 cities in 23 languages, and it is now in its fortieth year at the same address.",
      "Below is the London run as it stands: the theatre, the performance schedule, what a seat costs, how long the evening is, and where each of those came from.",
    ],
    sections: [
      {
        slug: "about",
        image: "/covers/phantom-of-the-opera-about.jpg",
        imageAlt: "Cut-paper illustration: a half-mask shape beside a hanging cluster of faceted glass drops.",
        label: "About the show",
        title: "What The Phantom of the Opera actually is",
        description:
          "A masked composer, a soprano he decides to make famous, and the most famous falling object in theatre. What kind of evening this is.",
        body: [
          "A disfigured musician lives in the cellars of the Paris Opéra, teaches a young chorus singer in secret, and then starts removing everyone standing between her and the leading role. It is a love triangle in which one corner is a threat, and it is played straight — the show never winks.",
          "Music by Andrew Lloyd Webber, lyrics by Charles Hart with additional lyrics by Richard Stilgoe, from Gaston Leroux's 1910 novel. The score is closer to sung-through than to a numbers musical, and it borrows the language of nineteenth-century opera on purpose: the show-within-the-show has to sound like the real thing for the sabotage to land.",
          "What a ticket buys is scale and craft. Maria Björnson's design and Hal Prince's staging have been kept, restored and updated rather than replaced; Gillian Lynne's choreography is still the movement in it. The chandelier is the moment everybody knows, and it works because it belongs to the plot rather than to the budget.",
          "If you know one song it is the title number. The others people leave humming are \"The Music of the Night\", \"All I Ask of You\" and \"Masquerade\", which puts almost the whole company on the stairs at once.",
        ],
      },
      {
        slug: "tickets",
        image: "/covers/phantom-of-the-opera-tickets.jpg",
        imageAlt: "Cut-paper illustration: a single torn paper stub on a warm ground, notched at one end and perforated at the other.",
        label: "Tickets",
        title: "Phantom of the Opera tickets in London",
        description:
          "One theatre, one official seller, day seats, and the performance schedule. Sales happen on the seller's own site.",
        template: "tickets",
        body: [
          "There is one run and one official seller: LW Theatres, who own His Majesty's and sell its dates directly with no booking fee. Tickets start at £25, and a limited number of day seats from £37.50 go online at 10am for that day's performances.",
          "Nothing is sold here. The button lands on the seller's own page, and the price you see there is the price.",
        ],
      },
    ],
  },
  {
    slug: "lost-boys",
    title: "The Lost Boys",
    titleSeo: "The Lost Boys musical: Broadway dates and tickets",
    officialSlug: "lost-boys-official",
    officialDomain: "lostboysmusical.com",
    eyebrow: "The Broadway run, and what a ticket actually buys",
    hubCard:
      "Vampires on a Santa Carla boardwalk, four Tony Awards, and its cheapest seats of the year on Halloween night.",
    checkedOn: "13 September 2026",
    tagline:
      "The Rescues set the 1987 vampire film to a rock score, Michael Arden staged it, and it opened at the Palace Theatre in April 2026.",
    summary:
      "The Lost Boys at the Palace Theatre on Broadway: the dates, the performance times, the run time, the age guidance and who sells the tickets — with the source for each.",
    hook: [
      "The film it comes from was a joke about its own genre. The Lost Boys arrived in 1987 as a comedy horror about teenage vampires on a Californian boardwalk, made money, and became the sort of cult object that gets quoted rather than revived. Turning it into a Broadway musical was not an obvious idea, and the production that did it won four Tony Awards in its first season.",
      "Two of them were for the cast: Ali Louis Bourzgui for the vampire who does the recruiting, and Shoshana Bean for the mother who has no idea any of this is happening. The other two were for how it looks — Dane Laffrey's set and the lighting by Jen Schriever and the production's director, Michael Arden.",
      "Below is the run as it stands at the Palace Theatre: the performance schedule, what a seat costs, how long the evening is, who it is recommended for, and where each of those came from.",
    ],
    sections: [
      {
        slug: "about",
        label: "About the show",
        title: "What The Lost Boys actually is",
        description:
          "A new town, a boardwalk, a band that only plays at night, and a decision that cannot be taken back. What kind of evening this is, and who it is for.",
        body: [
          "Michael moves to Santa Carla with his younger brother Sam and their mother Lucy, wanting to leave his old life behind. A night on the boardwalk puts him in front of David, who fronts a local band and offers him exactly what he came looking for — freedom, company, somewhere to belong. The band has a condition attached, and by the time Michael understands it he has already accepted.",
          "Music and lyrics are by The Rescues, the book is by David Hornsby and Chris Hoch, and the whole thing is directed by Michael Arden, who has three Tony Awards of his own for Parade and Maybe Happy Ending. The choreography is by Lauren Yalango-Grant and Christopher Cree Grant, and Ethan Popp supervises the music.",
          "It is a rock score played loud, and the production is built around spectacle: the set and the lighting both won Tonys, which on a show of this kind is a fair description of what a ticket buys. Broadway Direct recommends it for ages eleven and up, and the evening runs two hours thirty with one fifteen-minute interval.",
          "The cast is led by LJ Benet as Michael, Shoshana Bean as Lucy, Ali Louis Bourzgui as David, Benjamin Pajak as Sam, Maria Wirries as Star and Paul Alexander Nolan as Max. It is produced by James Carpinello, Marcus Chait and Patrick Wilson.",
        ],
      },
      {
        slug: "tickets",
        label: "Tickets",
        title: "The Lost Boys tickets on Broadway",
        description:
          "One theatre, one official seller, eight performances a week, and where the cheap nights are. Sales happen on the seller's own site.",
        template: "tickets",
        body: [
          "There is one run and one official seller: Broadway Direct, which is the Nederlander Organization's own box office and sells the Palace Theatre directly. Tickets are listed from $55, the run is on sale through 7 March 2027, and there is a limit of twelve per person.",
          "Prices move by performance rather than by seat alone. Most October dates are listed from $59.75 or $69.75; a handful, including both Halloween performances, sit at the $55 floor. Broadway Direct also runs a digital lottery and an in-person rush for the show, both at $45.",
          "Nothing is sold here. The button lands on the seller's own page, and the price you see there is the price.",
        ],
      },
    ],
  },
  {
    slug: "wicked",
    title: "Wicked",
    titleSeo: "Wicked the musical on Broadway: dates and tickets",
    officialSlug: "wicked-official",
    officialDomain: "wickedthemusical.com",
    eyebrow: "The Broadway run, and what a ticket actually buys",
    hubCard:
      "Twenty-three years at the Gershwin, and it still fills nineteen hundred seats eight times a week.",
    checkedOn: "13 September 2026",
    tagline:
      "Stephen Schwartz and Winnie Holzman told The Wizard of Oz from the witch's side, and Broadway has been playing it since 2003.",
    summary:
      "Wicked at the Gershwin Theatre on Broadway: the dates, the performance times, the run time, the age guidance and who sells the tickets — with the source for each.",
    hook: [
      "The premise is a reversal, and the show commits to it entirely: the Wicked Witch of the West was a girl called Elphaba, she was clever and green and unpopular, and the story everybody knows is the version her enemies were allowed to tell. Gregory Maguire wrote it as a novel in 1995. Stephen Schwartz and Winnie Holzman turned it into a musical about a friendship.",
      "It began previews at the Gershwin Theatre on 8 October 2003 and opened on the 30th — the night before Halloween — and it has not moved since. It is Broadway's second-highest-grossing musical and passed a billion dollars in 2016, and the London production has been at the Apollo Victoria since September 2006.",
      "Below is the Broadway run as it stands: the theatre, the performance schedule, what a seat costs, how long the evening is, and where each of those came from.",
    ],
    sections: [
      {
        slug: "about",
        label: "About the show",
        title: "What Wicked actually is",
        description:
          "Two students at a magical university, one of whom becomes the villain of a story you already know. What kind of evening this is, and who it is for.",
        body: [
          "Elphaba and Galinda are put in the same room at Shiz University and cannot stand each other. Over the course of the evening they become friends, and then the politics of Oz forces them apart — one into the palace and one into the history books as the Wicked Witch of the West. Everything The Wizard of Oz tells you happens offstage, late, and from the wrong angle.",
          "Music and lyrics are by Stephen Schwartz, the book is by Winnie Holzman, from Gregory Maguire's 1995 novel. Joe Mantello directed it and Wayne Cilento choreographed it, and the original company was led by Idina Menzel as Elphaba, Kristin Chenoweth as Glinda, Norbert Leo Butz as Fiyero and Joel Grey as the Wizard. It won three Tony Awards in 2004.",
          "What a ticket buys is scale. The Gershwin holds 1,900 people, the dragon over the proscenium is part of the set rather than part of the marketing, and the first act ends with Elphaba flying. If you know one song it is “Defying Gravity”; the others people leave humming are “Popular” and “For Good”.",
          "The evening runs two hours forty-five with one fifteen-minute interval. Broadway Direct gives it an age guidance of eight and up, and children under five are not admitted at all — every person in the room needs a ticket, whatever their age.",
        ],
      },
      {
        slug: "tickets",
        label: "Tickets",
        title: "Wicked tickets on Broadway",
        description:
          "One theatre, one official seller, and what the cheap routes in actually are. Sales happen on the seller's own site.",
        template: "tickets",
        body: [
          "There is one run and one official seller: Broadway Direct, the Nederlander Organization's own box office, which sells the Gershwin Theatre directly. Tickets are listed from $97.75, the run is on sale through 25 April 2027, and there is a limit of sixteen per person.",
          "Three cheaper routes exist and all three are bought in person or by lottery rather than online: student tickets at $59 and military tickets at $79, both at the box office with the relevant card, and a daily digital lottery at $55 including fees.",
          "Nothing is sold here. The button lands on the seller's own page, and the price you see there is the price.",
        ],
      },
    ],
  },
];
