// Which schema.org type an event actually is.
//
// Everything used to go out as a flat `Event`, which is true and says
// nothing. schema.org has a subtype for most of what this network lists, and
// the subtype is what places the page in a class rather than in a pile: a
// reader asking a search engine for "festivals in Vienna in October" and a
// language model assembling the same answer are both matching a kind, and
// `Event` is not one.
//
// The map is hand-written for the same reason `sections.ts` tabulates its
// tags: `category` is written per site in the site's own language, and there
// are forty-seven of them across five languages, singulars and plurals both.
// A guess here is a wrong claim in machine-readable markup, which is worse
// than no claim.
//
// Unlisted falls back to `Event`, and that fallback is right where the one
// in `sections.ts` would have been wrong. A missing section slug produces a
// bad URL; a missing subtype produces a true statement that is merely less
// specific. So a new category costs nothing until someone adds it here.
//
// Two deliberate omissions. "Online" is a delivery mode, not a kind — it is
// already said by `eventAttendanceMode`, and a call is whatever it is about.
// "Fireworks" and "Procession" have no schema.org type; `Festival` would be
// a stretch for a twenty-minute display over a heath, so they stay `Event`.

/** category -> schema.org @type. Absent means plain Event. */
export const EVENT_TYPES: Record<string, string> = {
  // Trade shows, conferences and everything the industry calls a summit.
  AI: "BusinessEvent",
  Business: "BusinessEvent",
  Conclave: "BusinessEvent",
  Conference: "BusinessEvent",
  Convention: "BusinessEvent",
  "Co-working": "BusinessEvent",
  Environment: "BusinessEvent",
  Expo: "BusinessEvent",
  Foresight: "BusinessEvent",
  Forum: "BusinessEvent",
  Hackathon: "BusinessEvent",
  "Hacker House": "BusinessEvent",
  Media: "BusinessEvent",
  Meetup: "BusinessEvent",
  Property: "BusinessEvent",
  Residency: "BusinessEvent",
  "Side event": "BusinessEvent",
  Summit: "BusinessEvent",

  // Festivals, in five languages and both numbers.
  Carnival: "Festival",
  "City-wide": "Festival",
  Designfestival: "Festival",
  "Día de Muertos": "Festival",
  Feria: "Festival",
  Ferias: "Festival",
  Festival: "Festival",
  Festivales: "Festival",
  Festivals: "Festival",
  "Fiestas patrias": "Festival",
  Filmfestival: "Festival",
  Musikfestival: "Festival",
  Parade: "Festival",
  Volksfest: "Festival",

  // Books is the Brooklyn Book Festival and nothing else; it is a festival
  // that happens to be about books, not an exhibition of them.
  Books: "Festival",

  Music: "MusicEvent",
  "Música": "MusicEvent",

  Theatre: "TheaterEvent",

  Architecture: "ExhibitionEvent",
  Design: "ExhibitionEvent",
  Exhibition: "ExhibitionEvent",
  Exhibitions: "ExhibitionEvent",
  "Exposición": "ExhibitionEvent",
  Museumsnacht: "ExhibitionEvent",

  Deporte: "SportsEvent",
  Racing: "SportsEvent",
  Sport: "SportsEvent",

  Food: "FoodEvent",

  // A market is people selling things at a stated time and place, which is
  // what schema.org means by SaleEvent.
  Market: "SaleEvent",
  Markets: "SaleEvent",
};

/** The @type for an event, given its category. Always a real schema.org type. */
export function eventType(category?: string): string {
  return (category && EVENT_TYPES[category]) || "Event";
}
