// Every word the article components put on a page that does not come from
// the item itself.
//
// These used to be string literals inside EventArticle and NewsArticle, and
// that was invisible for as long as the whole network published in English.
// It stopped being invisible when cmx.lol and mxo.lol went out in Spanish:
// the body copy was Spanish, the page was <html lang="es-MX">, and the
// furniture around it — "Format", "Where", "Add to calendar", "All events" —
// was still English. A reader does not experience that as a missing
// translation; they experience it as a site that was assembled somewhere
// else.
//
// English stays the default, so the eleven English sites pass nothing and
// render exactly what they rendered before. A site writing in another
// language passes its own set from its own src/content.ts — its own,
// because each app builds in isolation on Vercel and cannot import from a
// sibling app.
export interface ArticleLabels {
  // Header and the ended badge
  ended: string;
  /** Heading over an event's own questions and answers. */
  faq: string;
  organizedBy: string;
  minRead: (n: number) => string;

  // Actions
  tickets: string;
  register: string;
  /**
   * The button on an event that sells nothing and registers nobody: it goes
   * to the page the event was written from. "Register" was wrong there —
   * the link opens the organiser's own page, and a button naming an action
   * the page cannot perform is a button that has not been looked at.
   */
  moreDetails: string;
  addToCalendar: string;
  /** Title attribute on the calendar button, given the event's own name. */
  addToCalendarTitle: (title: string) => string;

  // Glance rows
  time: string;
  /** "From 19:00" when only a start time is published. */
  timeFrom: (start: string) => string;
  duration: string;
  /** "2 hours 30 minutes" — assembled here so the plural rules are local. */
  durationValue: (hours: number, minutes: number) => string;
  format: string;
  inPerson: string;
  online: string;
  where: string;
  ticketsRow: string;
  /** What the Tickets row says when a seat costs nothing. */
  free: string;
  salesClose: string;
  refunds: string;
  organizer: string;

  // Section headings
  whatHappened: string;
  /** Heading over the dated facts added since publication. */
  updates: string;
  programme: string;
  /** Heading over the people on the programme; an item may override it. */
  speakers: string;
  whoItsFor: string;
  locate: string;
  related: string;
  moreEvents: string;
  moreNews: string;
  latestNews: string;
  comingUp: string;

  // Card and link furniture
  readMore: string;
  allEvents: string;
  allNews: string;
  /** The two subheadings of a section page that holds both halves of the feed. */
  eventsHeading: string;
  newsHeading: string;
  upcoming: string;
  /** Heading over the group of events that have happened. */
  pastGroup: string;
  /** Link to the site's whole-calendar .ics, which is subscribed to rather
      than downloaded — unlike the per-event file, which is imported once. */
  subscribeCalendar: string;
  /** The line under it. A subscription is worth explaining: most readers
      have only ever met the one-off "add to calendar" button. */
  subscribeCalendarNote: string;
  /** Its title attribute. A webcal: link hands the page to another
      application, which is worth saying before it happens. */
  subscribeCalendarTitle: string;
  /** Chip on one card that has. Separate from the heading above because a
      language that inflects for number needs a singular here. */
  past: string;
  /** Title attribute on the map iframe, given the place's name. */
  mapTitle: (place: string) => string;

  // Source line
  source: string;
  checkedAgainstSource: string;
  /** Title attribute on the checked-on date. */
  checkedTitle: (sourceName: string) => string;

  // ImageNote — the word under a picture saying what kind of picture it is.
  // `generated` is deliberately absent here as it is in ImageNote itself.
  imageKinds: { photo: string; diagram: string; illustration: string; render: string };
}

export const EN: ArticleLabels = {
  ended: "Ended",
  faq: "Questions",
  organizedBy: "Organized by",
  minRead: (n) => `${n} min read`,

  tickets: "Tickets",
  register: "Register",
  moreDetails: "More details",
  addToCalendar: "Add to calendar",
  addToCalendarTitle: (title) => `Add ${title} to your calendar`,

  time: "Time",
  timeFrom: (start) => `From ${start}`,
  duration: "Duration",
  durationValue: (hours, minutes) =>
    [hours && `${hours} hour${hours === 1 ? "" : "s"}`, minutes && `${minutes} minutes`]
      .filter(Boolean)
      .join(" "),
  format: "Format",
  inPerson: "In person",
  online: "Online",
  where: "Where",
  ticketsRow: "Tickets",
  free: "Free",
  salesClose: "Sales close",
  refunds: "Refunds",
  organizer: "Organizer",

  whatHappened: "What happened",
  updates: "Since we published",
  programme: "Programme",
  speakers: "Speakers",
  whoItsFor: "Who it's for",
  locate: "Locate",
  related: "Related",
  moreEvents: "More events",
  moreNews: "More news",
  latestNews: "Latest news",
  comingUp: "Coming up",

  readMore: "Read more",
  allEvents: "All events",
  allNews: "All news",
  eventsHeading: "Events",
  newsHeading: "News",
  upcoming: "Upcoming",
  pastGroup: "Past",
  subscribeCalendar: "Subscribe to this calendar",
  subscribeCalendarNote: "Every date on this page, kept up to date in your own calendar.",
  subscribeCalendarTitle: "Opens your calendar app and subscribes to these dates",
  past: "Past",
  mapTitle: (place) => `Map — ${place}`,

  source: "Source",
  checkedAgainstSource: "checked against the source",
  checkedTitle: (name) => `Last checked against ${name} on this date`,

  imageKinds: {
    photo: "Photograph",
    diagram: "Diagram",
    illustration: "Illustration",
    render: "Render",
  },
};

/**
 * The other two languages the network publishes in. They live here, not in
 * the app, because the second Spanish site copied the first one's file
 * verbatim — sixty lines that then had to be corrected twice whenever a
 * label was added, and were, once, only corrected once.
 *
 * An app spreads the set and overrides what its own register needs:
 * `{ ...ES, tickets: "Boletos" }`. Nothing here names a city or a site.
 */
export const ES: Partial<ArticleLabels> = {
  ended: "Finalizado",
  faq: "Preguntas",
  organizedBy: "Organiza",
  minRead: (n) => `${n} min de lectura`,

  tickets: "Boletos",
  register: "Registrarse",
  moreDetails: "Más información",
  addToCalendar: "Agregar al calendario",
  addToCalendarTitle: (title) => `Agregar ${title} a tu calendario`,

  time: "Horario",
  timeFrom: (start) => `Desde las ${start}`,
  duration: "Duración",
  durationValue: (hours, minutes) =>
    [hours && `${hours} hora${hours === 1 ? "" : "s"}`, minutes && `${minutes} minutos`]
      .filter(Boolean)
      .join(" "),
  format: "Formato",
  inPerson: "Presencial",
  where: "Dónde",
  ticketsRow: "Boletos",
  free: "Gratis",
  salesClose: "Cierre de venta",
  refunds: "Reembolsos",
  organizer: "Organizador",

  whatHappened: "Qué pasó",
  updates: "Desde que publicamos",
  programme: "Programa",
  speakers: "Ponentes",
  whoItsFor: "Para quién es",
  locate: "Ubicación",
  related: "Relacionado",
  moreEvents: "Más eventos",
  moreNews: "Más noticias",
  latestNews: "Últimas noticias",
  comingUp: "Próximamente",

  readMore: "Leer más",
  allEvents: "Todos los eventos",
  allNews: "Todas las noticias",
  eventsHeading: "Eventos",
  newsHeading: "Noticias",
  upcoming: "Próximos",
  pastGroup: "Pasados",
  subscribeCalendar: "Suscribirse a este calendario",
  subscribeCalendarNote: "Todas las fechas de esta página, siempre al día en tu calendario.",
  subscribeCalendarTitle: "Abre tu app de calendario y se suscribe a estas fechas",
  past: "Pasado",
  mapTitle: (place) => `Mapa — ${place}`,

  source: "Fuente",
  checkedAgainstSource: "verificado con la fuente el",
  checkedTitle: (name) => `Última verificación con ${name} en esta fecha`,

  imageKinds: {
    photo: "Fotografía",
    diagram: "Diagrama",
    illustration: "Ilustración",
    render: "Render",
  },
};

export const DE: Partial<ArticleLabels> = {
  ended: "Vorbei",
  faq: "Fragen",
  organizedBy: "Veranstaltet von",
  minRead: (n) => `${n} Min. Lesezeit`,

  tickets: "Tickets",
  register: "Anmelden",
  moreDetails: "Mehr Infos",
  addToCalendar: "Zum Kalender hinzufügen",
  addToCalendarTitle: (title) => `${title} zum Kalender hinzufügen`,

  time: "Uhrzeit",
  timeFrom: (start) => `Ab ${start}`,
  duration: "Dauer",
  durationValue: (hours, minutes) =>
    [hours && `${hours} Stunde${hours === 1 ? "" : "n"}`, minutes && `${minutes} Minuten`]
      .filter(Boolean)
      .join(" "),
  format: "Format",
  inPerson: "Vor Ort",
  where: "Wo",
  ticketsRow: "Tickets",
  free: "Kostenlos",
  salesClose: "Verkaufsschluss",
  refunds: "Rückerstattung",
  organizer: "Veranstalter",

  whatHappened: "Worum es geht",
  updates: "Seit der Veröffentlichung",
  programme: "Programm",
  speakers: "Vortragende",
  whoItsFor: "Für wen",
  locate: "Lage",
  related: "Passend dazu",
  moreEvents: "Weitere Termine",
  moreNews: "Weitere Nachrichten",
  latestNews: "Neueste Nachrichten",
  comingUp: "Demnächst",

  readMore: "Weiterlesen",
  allEvents: "Alle Termine",
  allNews: "Alle Nachrichten",
  eventsHeading: "Termine",
  newsHeading: "Nachrichten",
  upcoming: "Demnächst",
  pastGroup: "Vorbei",
  subscribeCalendar: "Diesen Kalender abonnieren",
  subscribeCalendarNote: "Alle Termine dieser Seite, laufend aktuell im eigenen Kalender.",
  subscribeCalendarTitle: "Öffnet die Kalender-App und abonniert diese Termine",
  past: "Vorbei",
  mapTitle: (place) => `Karte — ${place}`,

  source: "Quelle",
  checkedAgainstSource: "gegen die Quelle geprüft am",
  checkedTitle: (name) => `Zuletzt gegen ${name} geprüft an diesem Datum`,

  imageKinds: {
    photo: "Fotografie",
    diagram: "Diagramm",
    illustration: "Illustration",
    render: "Rendering",
  },
};

/** The caller's overrides on top of English, so a partial set is legal. */
export function withLabels(labels?: Partial<ArticleLabels>): ArticleLabels {
  if (!labels) return EN;
  return { ...EN, ...labels, imageKinds: { ...EN.imageKinds, ...labels.imageKinds } };
}
