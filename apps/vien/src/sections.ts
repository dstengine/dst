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
import { buildSections, promotedSection, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";
import { eventsBySite } from "@dst/content/events";
import { newsBySite } from "@dst/content/news";
import { siteId } from "./content";
import { site } from "./site.config";

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
  // Die einzige Marke in dieser Tabelle, die kein Format ist, sondern ein
  // Datum. Ein Lauf, ein Kürbisfest und eine Handelszahl haben als Formate
  // nichts miteinander zu tun — gemeinsam ist ihnen die Woche im Jahr, und
  // genau die wird gesucht.
  Halloween: { slug: "halloween", plural: "Halloween", label: "Halloween" },
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
      // „X in Wien“ trägt bei einem Format und nicht bei einem Datum: Wer
      // das hier sucht, will wissen, wohin man geht, und nicht, unter
      // welcher Marke wir es abgelegt haben.
      if (g.key === "Halloween") {
        return {
          title: "Halloween in Wien 2026: was los ist",
          description:
            "Ein Laufabend in der Prater Hauptallee und drei Tage Kürbis am Stadtrand, dazu die Zahlen des Handels — mit dem Datum, wie es die Veranstalter angegeben haben.",
          h1: "Halloween in Wien",
          lede: "Die Wiener Liste ist kurz und das hat einen Grund, der sich beziffern lässt: Halloween wird hier überwiegend zu Hause gefeiert. Was es trotzdem im Freien gibt, steht hier — mit Datum und Quelle.",
          headings: {
            events: "Wohin man zu Halloween geht",
            upcoming: "Termine 2026",
            past: "Frühere Jahre",
            news: "Meldungen zu Halloween",
          },
        };
      }
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

// Every section this site builds, from its whole feed, computed once. The
// pages that need the list — the section route, and every detail page
// asking whether its own category earned an address — used to rebuild it
// per page from the same two feeds.
export const allSections = sections([...eventsBySite(siteId), ...newsBySite(siteId)]);

// The tag this site is pushing right now. It buys a link in the header of
// every page, the lead position in the tail of every event page, and that
// tail's heading in its own words — and it all switches itself off the day
// the last date under it passes, which is the only reason a seasonal
// promotion is safe to wire into a layout. See `promotedSection`.
const PROMOTED = 'Halloween';

export const promoted = promotedSection(allSections, PROMOTED, new Date().toISOString().slice(0, 10), site.keyword);
