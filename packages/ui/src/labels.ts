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
  /** Beside the date while the event is running, where a site turns the
      live countdown on. */
  underway: string;
  /** Heading over an event's own questions and answers, given the subject
      the page is about. A bare "Questions" is a heading nobody searches and
      nobody can place: the same word sits over fifty different pages in
      this network. The subject is passed because the component knows the
      item and the language does not — and it goes in with a colon in all
      three languages, which is the one join that needs no article. */
  faq: (subject?: string) => string;
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
  /** The ticket button, saying what it does rather than where it goes —
      a variant of the `ticket-price` test (@dst/content/experiments). */
  buyTickets: string;
  /** The ticket button with the lowest price on it, given formatted. */
  ticketsFrom: (price: string) => string;
  addToCalendar: string;
  /** Title attribute on the calendar button, given the event's own name. */
  addToCalendarTitle: (title: string) => string;

  // Glance rows
  /** Over the run of dates, repeated in the table from the line above it. */
  dates: string;
  time: string;
  /** "From 19:00" when only a start time is published. */
  timeFrom: (start: string) => string;
  duration: string;
  /** "2 hours 30 minutes" — assembled here so the plural rules are local. */
  durationValue: (hours: number, minutes: number) => string;
  /** The same length as a daily window on a run of several days: "4 hours a
      day". The word goes where the language puts it. */
  durationPerDay: (value: string) => string;
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
  /** Heading over the map, given the place the marker is on. "Locate" is
      an instruction to the reader about a widget; the place name is the
      thing the page is about. */
  locate: (place?: string) => string;
  /** The title on a detail page's link to its own subject page. The label
      is the subject's name, so a title repeating it would say nothing
      twice — this says what is on the other end. */
  categoryTitle: (what: string) => string;
  related: string;
  /** Heading over the tail of an event page. `where` is the site's head
      keyword and `what` the plural of the kind every card in the block
      shares — "More New York parades" rather than "More events", which
      names our filing cabinet. `what` is omitted when the block is mixed,
      or when the site has no plural on file for the kind: see
      `headingWord`. Both arguments are optional so a site that passes
      neither renders what it rendered before. */
  moreEvents: (where?: string, what?: string) => string;
  /** The heading over the tail of an event page when the site's promoted tag
      leads it — built from the tag's own label, because "More events" over
      three Halloween cards in October names the filing rather than the
      reason the reader is here. See `promotedSection` in
      \@dst/content/sections. */
  // The heading over a block of events that all carry the promoted tag.
  // Not "More Halloween events" but "Halloween in London 2026": a heading
  // is read by someone who arrived from a search box, and those are the
  // words they put in it. `where` is the site's head keyword, `year` comes
  // off the next date under the tag.
  moreTagged: (what: string, where: string, year: string) => string;
  moreNews: (where?: string) => string;
  latestNews: (where?: string) => string;
  comingUp: (where?: string) => string;

  // Card and link furniture
  readMore: string;
  allEvents: string;
  allNews: string;
  /** The two subheadings of a section page that holds both halves of the feed. */
  eventsHeading: (where?: string) => string;
  newsHeading: (where?: string) => string;
  upcoming: (where?: string) => string;
  /** Heading over the group of events that have happened. */
  pastGroup: (where?: string) => string;
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
  /** Heading over the front-page block of events that began before today
      and have not ended yet — apart from the ones still to come. */
  onNow: string;
  /** The same group on a page that starts later than today — a month still
      to come: the runs that opened before that page's first day and reach
      into it. "On now" would be false there for a run that opens next
      month and is already under way by the one the page is about. */
  startedEarlier: string;
  /** The meta-line date of such an event's card: its last day, given
      formatted. Its first day is behind the reader and answers nothing. */
  until: (date: string) => string;
  /** The same word on the date cover, over the last day. */
  untilCover: string;
  /** Corner mark on the card of an event the editors would go to themselves. */
  editorsChoice: string;
  /** Title attribute on the map iframe, given the place's name. */
  mapTitle: (place: string) => string;
  /** Under an embedded video: whose upload it is, and where it lives. */
  videoBy: (channel: string) => string;
  /** The button under the map that opens the route in Google Maps, and its
      title — which says where it goes rather than repeating the label. */
  directions: string;
  directionsTitle: (place: string) => string;

  // Venues, months and search — the portal furniture. Each has a default
  // so a site that has none of these pages renders what it rendered before.
  /** Heading over the site's venue pages, given the site's head keyword. */
  venues: (where?: string) => string;
  allVenues: string;
  /** Title attribute on a link to a venue's page, given its name. */
  venueTitle: (name: string) => string;
  /** On a venue card: its next date, given formatted. */
  nextOn: (date: string) => string;
  /** On a venue card: how many dates the site holds for it. */
  eventCount: (n: number) => string;
  /** Names the row of month links, and heads the calendar index. */
  byMonth: string;
  /** Heading of a month's page, given the month formatted ("November 2026")
      and the site's head keyword. */
  monthHeading: (month: string, where?: string) => string;
  /** The search box: its label, its placeholder, the line under it, and
      what it says with no match and with n of them. */
  search: string;
  /** Whole at 320px: under 206px in the field's 18px, the input's width
      there with the side padding of a wider screen. Nouns, no verb — the
      icon and the hidden label already say "search". */
  searchPlaceholder: string;
  searchHint: string;
  searchNone: string;
  searchCount: (n: number) => string;
  /** Said after the count when the box lists fewer than it found: the
      reader who scrolls to the end of twelve was told twenty-five. */
  searchFirst: (shown: number) => string;

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
  underway: "Under way",
  faq: (subject) => (subject ? `${subject}: questions` : "Questions"),
  organizedBy: "Organized by",
  minRead: (n) => `${n} min read`,

  tickets: "Tickets",
  register: "Register",
  moreDetails: "More details",
  buyTickets: "Buy tickets",
  ticketsFrom: (price) => `Tickets from ${price}`,
  addToCalendar: "Add to calendar",
  addToCalendarTitle: (title) => `Add ${title} to your calendar`,

  dates: "Dates",
  time: "Time",
  timeFrom: (start) => `From ${start}`,
  duration: "Duration",
  durationValue: (hours, minutes) =>
    [hours && `${hours} hour${hours === 1 ? "" : "s"}`, minutes && `${minutes} minutes`]
      .filter(Boolean)
      .join(" "),
  durationPerDay: (value) => `${value} a day`,
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
  locate: (place) => (place ? `${place} on the map` : "Locate"),
  categoryTitle: (what) => `Everything on this site filed under ${what.toLowerCase()}`,
  related: "Related",
  moreEvents: (where, what = "events") => (where ? `More ${where} ${what}` : `More ${what}`),
  moreTagged: (what, where, year) => `${what} in ${where} ${year}`,
  moreNews: (where) => (where ? `More ${where} news` : "More news"),
  latestNews: (where) => (where ? `Latest ${where} news` : "Latest news"),
  comingUp: (where) => (where ? `Coming up in ${where}` : "Coming up"),

  readMore: "Read more",
  allEvents: "All events",
  allNews: "All news",
  eventsHeading: (where) => (where ? `${where} events` : "Events"),
  newsHeading: (where) => (where ? `${where} news` : "News"),
  upcoming: (where) => (where ? `Upcoming in ${where}` : "Upcoming"),
  pastGroup: (where) => (where ? `Past ${where} events` : "Past"),
  subscribeCalendar: "Subscribe to this calendar",
  subscribeCalendarNote: "Every date on this page, kept up to date in your own calendar.",
  subscribeCalendarTitle: "Opens your calendar app and subscribes to these dates",
  past: "Past",
  onNow: "On now",
  startedEarlier: "Started earlier",
  until: (date) => `until ${date}`,
  untilCover: "until",
  editorsChoice: "Editors' choice",
  mapTitle: (place) => `Map — ${place}`,
  videoBy: (channel) => `${channel} on YouTube`,
  directions: "Directions",
  directionsTitle: (place) => (place ? `The way to ${place}, in Google Maps` : "The way there, in Google Maps"),

  venues: (where) => (where ? `Venues in ${where}` : "Venues"),
  allVenues: "All venues",
  venueTitle: (name) => `Everything on at ${name}`,
  nextOn: (date) => `Next: ${date}`,
  eventCount: (n) => `${n} ${n === 1 ? "event" : "events"}`,
  byMonth: "By month",
  monthHeading: (month, where) => (where ? `${month} in ${where}` : month),
  search: "Search",
  searchPlaceholder: "Events, venues, artists",
  searchHint: "A name, a venue or a month — results appear as you type.",
  searchNone: "Nothing found",
  searchCount: (n) => `${n} ${n === 1 ? "result" : "results"}`,
  searchFirst: (n) => `the first ${n} shown`,

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
 * British English, for the London sites: they declare `lang="en-GB"`, are read
 * from UK search, and write "organisers" and "programme" in their own copy,
 * so the one word the EN set spells the American way reads British too.
 * Everything else in EN already does ("Programme", "Under way").
 */
export const EN_GB: ArticleLabels = {
  ...EN,
  organizedBy: "Organised by",
  organizer: "Organiser",
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
  underway: "En curso",
  faq: (subject) => (subject ? `${subject}: preguntas` : "Preguntas"),
  organizedBy: "Organiza",
  minRead: (n) => `${n} min de lectura`,

  tickets: "Boletos",
  register: "Registrarse",
  moreDetails: "Más información",
  buyTickets: "Comprar boletos",
  ticketsFrom: (price) => `Boletos desde ${price}`,
  addToCalendar: "Agregar al calendario",
  addToCalendarTitle: (title) => `Agregar ${title} a tu calendario`,

  dates: "Fechas",
  time: "Horario",
  timeFrom: (start) => `Desde las ${start}`,
  duration: "Duración",
  durationValue: (hours, minutes) =>
    [hours && `${hours} hora${hours === 1 ? "" : "s"}`, minutes && `${minutes} minutos`]
      .filter(Boolean)
      .join(" "),
  durationPerDay: (value) => `${value} al día`,
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
  locate: (place) => (place ? `${place} en el mapa` : "Ubicación"),
  categoryTitle: (what) => `Todo lo que hay en este sitio bajo ${what.toLowerCase()}`,
  related: "Relacionado",
  moreEvents: (where, what = "eventos") => (where ? `Más ${what} en ${where}` : `Más ${what}`),
  moreTagged: (what, where, year) => `${what} en ${where} ${year}`,
  moreNews: (where) => (where ? `Más noticias de ${where}` : "Más noticias"),
  latestNews: (where) => (where ? `Últimas noticias de ${where}` : "Últimas noticias"),
  comingUp: (where) => (where ? `Próximamente en ${where}` : "Próximamente"),

  readMore: "Leer más",
  allEvents: "Todos los eventos",
  allNews: "Todas las noticias",
  eventsHeading: (where) => (where ? `Eventos en ${where}` : "Eventos"),
  newsHeading: (where) => (where ? `Noticias de ${where}` : "Noticias"),
  upcoming: (where) => (where ? `Próximos eventos en ${where}` : "Próximos"),
  pastGroup: (where) => (where ? `Eventos pasados en ${where}` : "Pasados"),
  subscribeCalendar: "Suscribirse a este calendario",
  subscribeCalendarNote: "Todas las fechas de esta página, siempre al día en tu calendario.",
  subscribeCalendarTitle: "Abre tu app de calendario y se suscribe a estas fechas",
  past: "Pasado",
  onNow: "En curso",
  startedEarlier: "Empezaron antes",
  until: (date) => `hasta el ${date}`,
  untilCover: "hasta",
  editorsChoice: "Elección del editor",
  mapTitle: (place) => `Mapa — ${place}`,
  videoBy: (channel) => `${channel} en YouTube`,
  directions: "Cómo llegar",
  directionsTitle: (place) => (place ? `Ruta a ${place} en Google Maps` : "La ruta en Google Maps"),

  venues: (where) => (where ? `Recintos en ${where}` : "Recintos"),
  allVenues: "Todos los recintos",
  venueTitle: (name) => `Todo lo que hay en ${name}`,
  nextOn: (date) => `Próximo: ${date}`,
  eventCount: (n) => `${n} ${n === 1 ? "evento" : "eventos"}`,
  byMonth: "Por mes",
  monthHeading: (month, where) => (where ? `${month} en ${where}` : month),
  search: "Buscar",
  searchPlaceholder: "Eventos, recintos, artistas",
  searchHint: "Un nombre, un recinto o un mes: los resultados aparecen al escribir.",
  searchNone: "Sin resultados",
  searchCount: (n) => `${n} ${n === 1 ? "resultado" : "resultados"}`,
  searchFirst: (n) => `se muestran los ${n} primeros`,

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
  underway: "Läuft gerade",
  faq: (subject) => (subject ? `${subject}: Fragen` : "Fragen"),
  organizedBy: "Veranstaltet von",
  minRead: (n) => `${n} Min. Lesezeit`,

  tickets: "Tickets",
  register: "Anmelden",
  moreDetails: "Mehr Infos",
  buyTickets: "Tickets kaufen",
  ticketsFrom: (price) => `Tickets ab ${price}`,
  addToCalendar: "Zum Kalender hinzufügen",
  addToCalendarTitle: (title) => `${title} zum Kalender hinzufügen`,

  dates: "Termine",
  time: "Uhrzeit",
  timeFrom: (start) => `Ab ${start}`,
  duration: "Dauer",
  durationValue: (hours, minutes) =>
    [hours && `${hours} Stunde${hours === 1 ? "" : "n"}`, minutes && `${minutes} Minute${minutes === 1 ? "" : "n"}`]
      .filter(Boolean)
      .join(" "),
  // "täglich", not "pro Tag": vien's own copy says "täglich 10 bis 22 Uhr",
  // and "pro Tag" broke onto two lines at 320.
  durationPerDay: (value) => `${value} täglich`,
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
  locate: (place) => (place ? `${place} auf der Karte` : "Lage"),
  categoryTitle: (what) => `Alles auf dieser Seite unter ${what}`,
  related: "Passend dazu",
  moreEvents: (where, what = "Termine") => (where ? `Mehr ${what} in ${where}` : `Weitere ${what}`),
  moreTagged: (what, where, year) => `${what} in ${where} ${year}`,
  moreNews: (where) => (where ? `Mehr Nachrichten aus ${where}` : "Weitere Nachrichten"),
  latestNews: (where) => (where ? `Neueste Nachrichten aus ${where}` : "Neueste Nachrichten"),
  comingUp: (where) => (where ? `Demnächst in ${where}` : "Demnächst"),

  readMore: "Weiterlesen",
  allEvents: "Alle Termine",
  allNews: "Alle Nachrichten",
  eventsHeading: (where) => (where ? `Termine in ${where}` : "Termine"),
  newsHeading: (where) => (where ? `Nachrichten aus ${where}` : "Nachrichten"),
  upcoming: (where) => (where ? `Demnächst in ${where}` : "Demnächst"),
  pastGroup: (where) => (where ? `Vergangene Termine in ${where}` : "Vorbei"),
  subscribeCalendar: "Diesen Kalender abonnieren",
  subscribeCalendarNote: "Alle Termine dieser Seite, laufend aktuell im eigenen Kalender.",
  subscribeCalendarTitle: "Öffnet die Kalender-App und abonniert diese Termine",
  past: "Vorbei",
  onNow: "Läuft gerade",
  startedEarlier: "Schon früher gestartet",
  until: (date) => `bis ${date}`,
  untilCover: "bis",
  editorsChoice: "Tipp der Redaktion",
  mapTitle: (place) => `Karte — ${place}`,
  videoBy: (channel) => `${channel} auf YouTube`,
  directions: "Route",
  directionsTitle: (place) => (place ? `Der Weg zu ${place} in Google Maps` : "Der Weg dorthin in Google Maps"),

  venues: (where) => (where ? `Spielstätten in ${where}` : "Spielstätten"),
  allVenues: "Alle Spielstätten",
  venueTitle: (name) => `Alles, was in ${name} läuft`,
  nextOn: (date) => `Nächster Termin: ${date}`,
  eventCount: (n) => `${n} ${n === 1 ? "Termin" : "Termine"}`,
  byMonth: "Nach Monat",
  monthHeading: (month, where) => (where ? `${month} in ${where}` : month),
  search: "Suche",
  searchPlaceholder: "Events, Orte, Künstler",
  searchHint: "Ein Name, ein Ort oder ein Monat – die Treffer erscheinen beim Tippen.",
  searchNone: "Nichts gefunden",
  searchCount: (n) => `${n} ${n === 1 ? "Treffer" : "Treffer"}`,
  searchFirst: (n) => `die ersten ${n} angezeigt`,

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

// Armenian declines its nouns where English uses a preposition: "in
// Yerevan" is one word, Երևանում, and "Yerevan news" is Երևանի
// նորություններ. The `where` these functions are handed is the site's
// keyword in the nominative, so the two cases a heading needs are made
// here. Regular for the city this was written for and for most Armenian
// place names; a name ending in -ի takes -ու in the genitive (Գյումրի,
// Գյումրու), and anything stranger should be passed already declined.
const hyGenitive = (where: string) => (where.endsWith("ի") ? `${where.slice(0, -1)}ու` : `${where}ի`);
const hyLocative = (where: string) => `${where}ում`;

export const HY: Partial<ArticleLabels> = {
  ended: "Ավարտված է",
  underway: "Ընթացքում է",
  // The Armenian colon is the mijaket, a raised dot, not ":".
  faq: (subject) => (subject ? `${subject}\u2024 հարցեր և պատասխաններ` : "Հարցեր և պատասխաններ"),
  organizedBy: "Կազմակերպիչ՝",
  minRead: (n) => `${n} րոպե ընթերցանություն`,

  tickets: "Տոմսեր",
  register: "Գրանցվել",
  moreDetails: "Մանրամասներ",
  buyTickets: "Գնել տոմսեր",
  ticketsFrom: (price) => `Տոմսեր՝ ${price}-ից`,
  addToCalendar: "Ավելացնել օրացույցում",
  addToCalendarTitle: (title) => `«${title}» — ավելացնել ձեր օրացույցում`,

  dates: "Ամսաթվեր",
  time: "Ժամ",
  timeFrom: (start) => `Սկիզբը՝ ${start}`,
  duration: "Տևողություն",
  // A noun after a numeral stays singular in Armenian: 2 ժամ, not 2 ժամեր.
  durationValue: (hours, minutes) =>
    [hours && `${hours} ժամ`, minutes && `${minutes} րոպե`].filter(Boolean).join(" "),
  // "Per day" comes first in Armenian, and capitalised like every other
  // value here that opens with a word.
  durationPerDay: (value) => `Օրական ${value}`,
  format: "Ձևաչափ",
  inPerson: "Տեղում",
  online: "Առցանց",
  where: "Որտեղ",
  ticketsRow: "Տոմսեր",
  free: "Անվճար",
  salesClose: "Վաճառքն ավարտվում է",
  refunds: "Վերադարձ",
  organizer: "Կազմակերպիչ",

  whatHappened: "Ինչի մասին է",
  updates: "Հրապարակումից հետո",
  programme: "Ծրագիր",
  speakers: "Մասնակիցներ",
  whoItsFor: "Ում համար է",
  locate: (place) => (place ? `Քարտեզ՝ ${place}` : "Քարտեզ"),
  categoryTitle: (what) => `Այս կայքի բոլոր նյութերը՝ «${what}»`,
  related: "Նմանատիպ",
  moreEvents: (where, what = "միջոցառումներ") => (where ? `Այլ ${what} ${hyLocative(where)}` : `Այլ ${what}`),
  moreTagged: (what, where, year) => `${what} ${hyLocative(where)}, ${year}`,
  moreNews: (where) => (where ? `${hyGenitive(where)} այլ նորություններ` : "Այլ նորություններ"),
  latestNews: (where) => (where ? `${hyGenitive(where)} վերջին նորությունները` : "Վերջին նորությունները"),
  comingUp: (where) => (where ? `Շուտով ${hyLocative(where)}` : "Շուտով"),

  readMore: "Կարդալ ավելին",
  allEvents: "Բոլոր միջոցառումները",
  allNews: "Բոլոր նորությունները",
  eventsHeading: (where) => (where ? `Միջոցառումներ ${hyLocative(where)}` : "Միջոցառումներ"),
  newsHeading: (where) => (where ? `${hyGenitive(where)} նորություններ` : "Նորություններ"),
  upcoming: (where) => (where ? `Առաջիկայում ${hyLocative(where)}` : "Առաջիկայում"),
  pastGroup: (where) => (where ? `Անցած միջոցառումներ ${hyLocative(where)}` : "Անցած"),
  subscribeCalendar: "Բաժանորդագրվել այս օրացույցին",
  subscribeCalendarNote: "Այս էջի բոլոր ամսաթվերը՝ միշտ թարմ, ձեր սեփական օրացույցում։",
  subscribeCalendarTitle: "Բացում է օրացույցի հավելվածը և բաժանորդագրում այս ամսաթվերին",
  past: "Անցած",
  onNow: "Այժմ ընթացքում",
  startedEarlier: "Սկսվել են ավելի վաղ",
  until: (date) => `մինչև ${date}`,
  untilCover: "մինչև",
  editorsChoice: "Խմբագրի ընտրություն",
  mapTitle: (place) => `Քարտեզ — ${place}`,
  videoBy: (channel) => `${channel}, YouTube`,
  directions: "Ինչպես հասնել",
  directionsTitle: (place) => (place ? `Երթուղին դեպի ${place}՝ Google Maps-ում` : "Երթուղին՝ Google Maps-ում"),

  venues: (where) => (where ? `${hyGenitive(where)} դահլիճներն ու վայրերը` : "Դահլիճներ և վայրեր"),
  allVenues: "Բոլոր վայրերը",
  venueTitle: (name) => `Ամեն ինչ, որ կա ${name}-ում`,
  nextOn: (date) => `Հաջորդը՝ ${date}`,
  // A noun after a numeral stays singular in Armenian.
  eventCount: (n) => `${n} միջոցառում`,
  byMonth: "Ըստ ամսի",
  monthHeading: (month, where) => (where ? `${month}՝ ${hyLocative(where)}` : month),
  search: "Փնտրել",
  searchPlaceholder: "Միջոցառում կամ վայր",
  searchHint: "Անուն, վայր կամ ամիս՝ արդյունքները երևում են մուտքագրելիս։",
  searchNone: "Ոչինչ չի գտնվել",
  searchCount: (n) => `${n} արդյունք`,
  searchFirst: (n) => `առաջին ${n}-ը`,

  source: "Աղբյուր",
  checkedAgainstSource: "ստուգվել է",
  checkedTitle: (name) => `Վերջին անգամ ստուգվել է ${name} աղբյուրի հետ այս ամսաթվին`,

  imageKinds: {
    photo: "Լուսանկար",
    diagram: "Գծապատկեր",
    illustration: "Նկարազարդում",
    render: "Վիզուալիզացիա",
  },
};

/** The caller's overrides on top of English, so a partial set is legal. */
export function withLabels(labels?: Partial<ArticleLabels>): ArticleLabels {
  if (!labels) return EN;
  return { ...EN, ...labels, imageKinds: { ...EN.imageKinds, ...labels.imageKinds } };
}

// The `plural` a site tabulates for a tag in its own sections.ts, made safe
// for the one frame that did not exist when those words were written.
//
// They were written for two frames — `${Title} in Dubai` and "Everything on
// this site filed under ${what}" — and both accept an article: "the Dubai
// property market", "the outdoors". `More ${where} ${what}` does not, and
// "More New York the outdoors" is the kind of sentence that makes a reader
// distrust everything else on the page.
//
// So a plural that opens with an article is not a heading word, and the
// block keeps the generic one. The three lists are closed — these are the
// only languages the network publishes in — which makes this a check rather
// than a guess. `tests/build-output.test.js` asserts no heading built this
// way begins with one.
// Armenian has nothing to add: its article is a suffix on the noun, so no
// Armenian heading word can open with one.
const ARTICLES = ["the", "la", "el", "los", "las", "der", "die", "das"];

export function headingWord(plural?: string): string | undefined {
  if (!plural) return undefined;
  const first = plural.split(" ")[0].toLowerCase();
  return ARTICLES.includes(first) ? undefined : plural;
}
