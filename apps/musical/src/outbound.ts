// Every third-party destination this site links to, keyed by the slug that
// /go/<slug>/ resolves to. Outbound links run through that hop so external
// domains collect no link equity from our pages, and /go/ is disallowed in
// robots.txt so the hops are never crawled or indexed themselves.
//
// Ticket links are the one place a visible outbound button is right: a
// reader deciding whether to go needs one click to the seller. It still goes
// through the hop. Two kinds of slug live here — tickets-<run> for a seller,
// venue-<venue> for a venue's own website.
export const outbound: Record<string, string> = {
  "chicago-official": "https://chicagothemusical.com/",
  "chicago-uk-tour": "https://chicagothemusical.com/uk-tour/",
  "chicago-international": "https://chicagothemusical.com/international/",
  "tickets-new-york":
    "https://www.telecharge.com/Chicago-tickets?AID=BWY0049300&utm_source=show_site&utm_campaign=chicagoSS&utm_medium=web&utm_id=BWY0049300",
  "tickets-tokyo": "https://www.kyodotokyo.com/chicago-en/",
  "tickets-osaka": "https://eplus.jp/sf/detail/0227890001?P6=001&P1=0402&P59=1",
  "tickets-dubai-arena": "https://coca-cola-arena.com/",
  "tickets-dubai-ticketmaster": "https://www.ticketmaster.ae/event/chicago-the-musical-tickets/1998162905",
  "venue-coca-cola-arena": "https://coca-cola-arena.com/",
  "venue-ambassador-theatre": "https://www.shubert.nyc/theatres/ambassador",
  "tickets-aberdeen": "https://www.aberdeenperformingarts.com/whats-on/chicago-2027/",
  "tickets-belfast": "https://www.goh.co.uk/whats-on/chicago-2",
  "tickets-birmingham": "https://www.birminghamhippodrome.com/calendar/chicago/",
  "tickets-blackpool": "https://www.wintergardensblackpool.co.uk/events/chicago/",
  "tickets-bournemouth": "https://www.bournemouthpavilion.co.uk/events/chicago-2027",
  "tickets-bradford": "https://www.bradford-theatres.co.uk/whats-on/chicago",
  "tickets-brighton": "https://www.atgtickets.com/shows/chicago-the-musical/theatre-royal-brighton/",
  "tickets-bristol": "https://www.atgtickets.com/shows/chicago-the-musical/bristol-hippodrome/",
  "tickets-cardiff": "https://www.wmc.org.uk/en/whats-on/2027/chicago",
  "tickets-cheltenham": "https://www.everymantheatre.org.uk/shows/chicago/",
  "tickets-eastbourne": "https://trafalgartickets.com/eastbourne-theatres-eastbourne/en-GB/event/musical/chicago-tickets",
  "tickets-edinburgh": "https://www.atgtickets.com/shows/chicago-the-musical/edinburgh-playhouse/",
  "tickets-glasgow": "https://www.atgtickets.com/shows/chicago-the-musical/kings-theatre-glasgow/",
  "tickets-hull": "https://www.hulltheatres.co.uk/theatre-events/chicago",
  "tickets-liverpool": "https://www.atgtickets.com/shows/chicago-the-musical/liverpool-empire/",
  "tickets-manchester": "https://www.atgtickets.com/shows/chicago-the-musical/opera-house-manchester/",
  "tickets-milton-keynes": "https://www.atgtickets.com/shows/chicago-the-musical/milton-keynes-theatre/",
  "tickets-newcastle": "https://www.theatreroyal.co.uk/whats-on/chicago-3/",
  "tickets-norwich": "https://norwichtheatre.org/whats-on/chicago/",
  "tickets-nottingham": "https://www.trch.co.uk/whats-on/chicago-zcb4",
  "tickets-oxford": "https://www.atgtickets.com/shows/chicago-the-musical/new-theatre-oxford/",
  "tickets-plymouth": "https://theatreroyal.com/whats-on/chicago-2027/",
  "tickets-southend": "https://trafalgartickets.com/southend-theatres/en-GB/event/musical/chicago-tickets",
  "tickets-stoke": "https://www.atgtickets.com/shows/chicago-the-musical/regent-theatre/",
  "tickets-sunderland": "https://www.atgtickets.com/shows/chicago-the-musical/sunderland-empire/",
  "tickets-truro": "https://www.hallforcornwall.co.uk/whats-on/chicago/",
  "tickets-wimbledon": "https://www.atgtickets.com/shows/chicago-the-musical/new-wimbledon-theatre/",
  "tickets-woking": "https://www.atgtickets.com/shows/chicago-the-musical/woking-theatre/",
  "tickets-york": "https://www.atgtickets.com/shows/chicago-the-musical/grand-opera-house-york/",
  "venue-alhambra-theatre-bradford": "https://www.bradford-theatres.co.uk/",
  "venue-birmingham-hippodrome": "https://www.birminghamhippodrome.com/",
  "venue-blackpool-opera-house": "https://www.wintergardensblackpool.co.uk/",
  "venue-bournemouth-pavilion": "https://www.bournemouthpavilion.co.uk/",
  "venue-everyman-theatre-cheltenham": "https://www.everymantheatre.org.uk/",
  "venue-grand-opera-house-belfast": "https://www.goh.co.uk/",
  "venue-hall-for-cornwall": "https://www.hallforcornwall.co.uk/",
  "venue-his-majestys-theatre-aberdeen": "https://www.aberdeenperformingarts.com/",
  "venue-hull-new-theatre": "https://www.hulltheatres.co.uk/",
  "venue-newcastle-theatre-royal": "https://www.theatreroyal.co.uk/",
  "venue-norwich-theatre-royal": "https://norwichtheatre.org/",
  "venue-nottingham-royal-concert-hall": "https://www.trch.co.uk/",
  "venue-theatre-royal-plymouth": "https://theatreroyal.com/",
  "venue-venue-cymru": "https://www.venuecymru.co.uk/",
  "info-llandudno": "https://www.venuecymru.co.uk/chicago-3",
  "venue-wales-millennium-centre": "https://www.wmc.org.uk/",
};

/** Path for an outbound link, e.g. go("tickets-dubai-arena") -> "/go/tickets-dubai-arena/" */
export function go(slug: string): string {
  return `/go/${slug}/`;
}
