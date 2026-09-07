import type { ArticleLabels } from "@dst/ui/labels";

// The site publishes itself: these domains are independent of the DST group
// and of each other, so every block of structured data on them has to name
// this host rather than the group — see VERCEL.md.
export const publisher = {
  id: "https://vien.lol/#organization",
  name: "Veranstaltungen Wien",
  url: "https://vien.lol/",
};

export const site = "vien";
export const newsBase = "/nachrichten/";
export const eventsBase = "/veranstaltungen/";

export const home = {
  title: "Was in Wien los ist",
  description: "Was in Wien los ist: Ausstellungen, Konzerte und wie die Stadt funktioniert. Mit Quelle und Datum.",
  h1: "Was in Wien los ist",
  lede: `Museen und Konzerthäuser, Donau und Wienerwald, und das, was die Jahreszeiten öffnen und schließen. Was läuft, was sich geändert hat, und wann.`,
};

export const news = {
  title: "Was sich in Wien geändert hat",
  description: "Kein Ticker. Ein paar Dinge pro Woche, die es zu wissen lohnt und die wir prüfen konnten.",
  h1: "Was sich in Wien geändert hat",
  lede: `Kein Ticker. Ein paar Dinge pro Woche, die es zu wissen lohnt und die wir gegen die Quelle prüfen konnten.`,
};

export const events = {
  title: "Veranstaltungen in Wien, nach Datum",
  description: "Termine, die wir bei den Veranstaltern bestätigt haben. Ohne bestätigtes Datum steht hier nichts.",
  h1: "Wien nach Datum",
  lede: `Termine, die wir bei den Veranstaltern bestätigt haben. Was kein bestätigtes Datum hat, wartet, bis es eines gibt.`,
};

export const about = {
  title: "Über Veranstaltungen Wien, einen Wiener Kalender",
  description: "Was in Wien los ist, mit Quelle und Prüfdatum bei jedem Eintrag.",
  h1: "Über Veranstaltungen Wien, einen Wiener Kalender",
  lede: `Was in Wien und in Österreich los ist, mit Quelle und Prüfdatum bei jedem Eintrag.`,
};

// The words the shared article components put on the page. Without this
// they default to English, which would put "Format", "Where" and "All
// events" around German copy on a page that declares itself de-AT.
//
// It lives here rather than in @dst/ui because each app builds in isolation
// on Vercel and cannot import from a sibling — so every non-English site
// carries its own copy of this, deliberately.
export const labels: Partial<ArticleLabels> = {
  ended: "Vorbei",
  organizedBy: "Veranstaltet von",
  minRead: (n) => `${n} Min. Lesezeit`,

  tickets: "Tickets",
  register: "Anmelden",
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
  upcoming: "Demnächst",
  pastGroup: "Vorbei",
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
