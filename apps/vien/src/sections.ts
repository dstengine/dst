// Die Rubriken dieser Seite. Die Regeln — wie viele Einträge eine Rubrik
// braucht, welche Slugs schon vergeben sind — stehen in
// @dst/content/sections. Hier stehen nur das Vokabular und die Wörter.
//
// Heute ergibt das noch keine einzige Rubrik: keine Kategorie hat drei
// Einträge. Das ist kein Fehler, sondern die Regel bei der Arbeit — die
// Zeile erscheint an dem Tag, an dem die dritte Museumsmeldung online geht,
// und niemand muss diese Datei dafür anfassen.
//
// Keine Ortsrubriken: alles hier steht in Wien, eine Seite /wien/ wäre die
// Startseite unter einer zweiten Adresse. Dagegen steht `home`.
import { buildSections, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";

const RESERVED = ["ueber-uns", "veranstaltungen", "nachrichten", "go", "li"];

const TAGS: Record<string, Vocabulary> = {
  Museen: { slug: "museen", plural: "Museen" },
  Welt: { slug: "welt", plural: "Welt", label: "Welt" },
  Konzerte: { slug: "konzerte", plural: "Konzerte" },
  Ausstellungen: { slug: "ausstellungen", plural: "Ausstellungen" },
  Filmfestival: { slug: "filmfestivals", plural: "Filmfestivals" },
  Musikfestival: { slug: "musikfestivals", plural: "Musikfestivals" },
  Verkehr: { slug: "verkehr", plural: "Verkehr", label: "Verkehr" },
  Architektur: { slug: "architektur", plural: "Architektur", label: "Architektur" },
};

export const NAV = {
  allLabel: "Alles",
  allTitle: "Alles, was in Wien los ist",
  label: "Nach Thema",
};

export function sections(items: FeedItem[]): Section[] {
  return buildSections({
    items,
    reserved: RESERVED,
    tags: TAGS,
    home: "Wien",
    copy: (g) => {
      const was = g.voc.plural ?? g.key;
      // "Welt" ist die eine Rubrik, deren Überschrift allein nicht trägt:
      // eine Seite namens „Welt“ sagt nichts, und interessant ist gerade,
      // von wo aus geschaut wird.
      const welt = g.key === "Welt";
      return {
        title: welt ? "Die Welt, von Wien aus" : `${was} in Wien`,
        description: welt
          ? "Was außerhalb Österreichs passiert, von hier aus erzählt — mit Quelle und Datum bei jedem Eintrag."
          : `${was} in Wien — mit Datum, wie es die Veranstalter angegeben haben, und der Quelle bei jedem Eintrag.`,
        h1: welt ? "Die Welt, von Wien aus" : `${was} in Wien`,
        lede: welt
          ? "Was außerhalb Österreichs passiert und bis hierher reicht — jede Meldung mit ihrer Quelle und dem Tag, an dem wir sie gelesen haben."
          : `Alles auf dieser Seite unter ${was} — das Datum, wie es die Veranstalter angegeben haben, und der Link dorthin, wo wir es gelesen haben.`,
      };
    },
  });
}
