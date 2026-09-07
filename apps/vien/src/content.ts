import { DE } from "@dst/ui/labels";
import type { ArticleLabels } from "@dst/ui/labels";

// The site publishes itself: these domains are independent of the DST group
// and of each other, so every block of structured data on them has to name
// this host rather than the group — see VERCEL.md.
export const publisher = {
  id: "https://vien.lol/#organization",
  name: "Veranstaltungen Wien",
  url: "https://vien.lol/",
};

export const siteId = "vien";
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

// The words the shared article components put on the page, in German.
// The set is shared — see @dst/ui's labels — and this site adds nothing
// to it today. When it needs a word of its own, spread and override.
export const labels: Partial<ArticleLabels> = DE;
