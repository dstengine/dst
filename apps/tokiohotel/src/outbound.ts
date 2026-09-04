// Every third-party destination this site links to, keyed by the slug that
// /go/<slug>/ resolves to. Outbound links run through that hop so external
// domains collect no link equity from our pages, and /go/ is disallowed in
// robots.txt so the hops never get crawled or indexed themselves.
//
// Two rules about what goes in here, both of which cost us something:
//
// 1. No affiliate links. The band's own site marks its 2027 German dates
//    with an asterisk and the line "Advertising – Affiliate Links": those
//    buttons run through short.contrapromotion.com and pay somebody per
//    click. We resolved every one of them and link the Eventim event it
//    actually leads to. Same destination, no commission, one redirect fewer.
// 2. No inherited tracking. The Arena Tour buttons on tokiohotel.com carry
//    utm_source=artist_email and an affiliate code from the band's mailing
//    list. Pasting those onto a web page would be repeating a claim about
//    where the click came from that is simply untrue, so the query string
//    is stripped and only the event URL kept.
export const outbound: Record<string, string> = {
  "tokiohotel-com": "https://tokiohotel.com/",
  "ovo-arena-events": "https://www.ovoarena.co.uk/events",
  "wikipedia-tokio-hotel": "https://en.wikipedia.org/wiki/Tokio_Hotel",
  "wikipedia-discography": "https://en.wikipedia.org/wiki/Tokio_Hotel_discography",

  // Arena Tour 2026. London goes to AXS because the venue itself publishes
  // that link; the other sixteen go to the Bandsintown event the band's own
  // site points at, which fans out to the local seller per country.
  "axs-wembley": "https://www.axs.com/uk/events/893660/tokio-hotel-tickets?skin=wembley",
  "bit-paris-oct": "https://www.bandsintown.com/t/106626863",
  "bit-hamburg": "https://www.bandsintown.com/t/106626874",
  "bit-brussels": "https://www.bandsintown.com/t/106626882",
  "bit-amsterdam": "https://www.bandsintown.com/t/106626890",
  "bit-frankfurt": "https://www.bandsintown.com/t/106626918",
  "bit-berlin": "https://www.bandsintown.com/t/106626926",
  "bit-nuremberg": "https://www.bandsintown.com/t/106626935",
  "bit-zurich": "https://www.bandsintown.com/t/106626949",
  "bit-milan": "https://www.bandsintown.com/t/106626957",
  "bit-leipzig": "https://www.bandsintown.com/t/106626966",
  "bit-vienna": "https://www.bandsintown.com/t/106626977",
  "bit-munich": "https://www.bandsintown.com/t/106626984",
  "bit-esch": "https://www.bandsintown.com/t/106626993",
  "bit-dusseldorf": "https://www.bandsintown.com/t/106626998",
  "bit-paris-nov": "https://www.bandsintown.com/t/107035258",
  "bit-madrid": "https://www.bandsintown.com/t/107035271",

  // Summer Encore 2027. Eventim for the German open-airs, and the local
  // seller everywhere else.
  "vivaticket-rome": "https://www.vivaticket.com/it/ticket/tokio-hotel/313656",
  "ebilet-warsaw": "https://www.ebilet.pl/muzyka/pop/tokio-hotel",
  "frequency-tickets": "https://www.frequency.at/tickets/",
  "eventim-aurich": "https://www.eventim.de/event/22056373/",
  "eventim-dortmund": "https://www.eventim.de/event/22055347/",
  "eventim-wurzburg": "https://www.eventim.de/event/22054248/",
  "eventim-monchengladbach": "https://www.eventim.de/event/22054027/",
  "eventim-frankfurt": "https://www.eventim.de/event/22054852/",
  "eventim-dresden": "https://www.eventim.de/event/22051407/",
  "eventim-magdeburg": "https://www.eventim.de/event/22051262/",
  "eventim-halle": "https://www.eventim.de/event/22050387/",
  "eventim-hamburg": "https://www.eventim.de/event/22052158/",
  "eventim-berlin": "https://www.eventim.de/event/22055358/",
  "eventim-hanover": "https://www.eventim.de/event/22055219/",
};

/** Path for an outbound link, e.g. go("axs-wembley") -> "/go/axs-wembley/" */
export function go(slug: string): string {
  return `/go/${slug}/`;
}
