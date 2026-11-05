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
// Startseite unter einer zweiten Adresse. Dagegen steht `home`. Österreich
// steht mit drin, weil ein Eintrag mit `country` nach dem Land sortiert
// wird, nicht nach der Stadt: so entstand /osterreich/, dieselbe Startseite
// noch einmal. Seit 5. November 2026 leitet sie mit 301 auf / um.
import { buildSections, promotedFirst, type Section, type Vocabulary } from "@dst/content/sections";
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
  // Der Winter hat zwei solche Marken, und sie werden getrennt gesucht:
  // „Weihnachtsmärkte Wien“ sind sechs Wochen und ein Dutzend Plätze,
  // „Silvester Wien“ ist eine Nacht und die Frage, wo man sie verbringt.
  Weihnachtsmarkt: { slug: "weihnachtsmaerkte", plural: "Weihnachtsmärkte", label: "Weihnachtsmärkte" },
  Silvester: { slug: "silvester", plural: "Silvester", label: "Silvester" },
  // Ein Format, das wie ein Datum gesucht wird: „Eislaufen Wien“ von
  // November bis März, und die Antwort ist eine Liste von Plätzen mit
  // Preisen und Zeiten, kein einzelner Termin.
  Eislaufen: { slug: "eislaufen", plural: "Eislaufen", label: "Eislaufen" },
  // Die dritte Wintermarke, und sie heißt in der Adresse anders als in der
  // Überschrift: gesucht wird „Ballsaison“ und „Ballkalender“, gezählt wird
  // in Bällen. Fasching bekommt keine eigene Seite — in Wien ist der Fasching
  // die Ballsaison, und zwei Adressen würden „Bälle Wien 2027“ teilen.
  Ball: { slug: "ballsaison", plural: "Bälle", label: "Ballsaison" },
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
    home: ["Wien", "Österreich"],
    copy: (g) => {
      // „X in Wien“ trägt bei einem Format und nicht bei einem Datum: Wer
      // das hier sucht, will wissen, wohin man geht, und nicht, unter
      // welcher Marke wir es abgelegt haben.
      if (g.key === "Halloween") {
        return {
          title: "Halloween in Wien 2026: alle Termine",
          description:
            "Halloween in Wien 2026, Termin für Termin: Kindermuseum Schönbrunn bis 2. November, Planetarium, Laufabend im Prater, Kürbisfest — mit Datum und Quelle.",
          h1: "Halloween in Wien",
          lede: "Die Wiener Liste ist kurz und das hat einen Grund, der sich beziffern lässt: Halloween wird hier überwiegend zu Hause gefeiert. Das Programm 2026 außer Haus, vom Kürbisfest am Himmel Ende Oktober bis zum Monsterparcours im Kindermuseum Schönbrunn am 2. November, steht hier — mit Datum und Quelle.",
          headings: {
            events: "Halloween 2026 in Wien, Termin für Termin",
            upcoming: "Termine 2026",
            past: "Schon vorbei",
            news: "Meldungen zu Halloween",
          },
        };
      }
      if (g.key === "Weihnachtsmarkt") {
        return {
          title: "Weihnachtsmärkte in Wien 2026: Termine und Zeiten",
          description:
            "Weihnachtsmärkte in Wien 2026: der Christkindlmarkt am Rathausplatz ab 13. November und die anderen Märkte der Stadt — mit Öffnungszeiten, Datum und Quelle.",
          h1: "Weihnachtsmärkte in Wien",
          lede: "Der Rathausplatz macht am 13. November auf, die anderen Märkte in den Wochen danach. Hier stehen sie mit den Öffnungszeiten, wie die Veranstalter sie angegeben haben, und dem Link dorthin, wo wir es gelesen haben.",
          headings: {
            events: "Welche Märkte wann offen haben",
            upcoming: "Termine 2026",
            past: "Schon vorbei",
            news: "Meldungen zu den Weihnachtsmärkten",
          },
        };
      }
      if (g.key === "Silvester") {
        return {
          title: "Silvester in Wien 2026: was los ist",
          description:
            "Silvester in Wien 2026: das Silvesterkonzert der Philharmoniker im Musikverein, die Fledermaus in der Staatsoper und der Silvesterpfad in der Innenstadt.",
          h1: "Silvester in Wien",
          lede: "Wie man in Wien den 31. Dezember verbringt, vom Abend in der Oper bis zur Mitternacht in der Innenstadt — die Uhrzeit, wie die Veranstalter sie angegeben haben, und der Link dorthin, wo wir es gelesen haben.",
          headings: {
            events: "Wo man Silvester feiert",
            upcoming: "Termine",
            past: "Schon vorbei",
            news: "Meldungen zu Silvester",
          },
        };
      }
      // Der Heumarkt hat keine Karte, solange der Eislauf-Verein kein
      // Saisonende nennt: ein Eintrag ohne `end` wäre ein einzelner Tag. Die
      // Einleitung sagt trotzdem, dass er offen hat.
      if (g.key === "Eislaufen") {
        return {
          title: "Eislaufen in Wien 2026/27: Eislaufplätze, Preise, Zeiten",
          description:
            "Eislaufen in Wien 2026/27: Eisring Süd seit 25. Oktober, Engelmann ab 6. November, Wiener Eistraum ab 22. Jänner — Preise und Öffnungszeiten vom Betreiber.",
          h1: "Eislaufen in Wien",
          lede: "Wo man in Wien in der Saison 2026/27 eislaufen kann, jeder Platz mit den Daten, Preisen und Öffnungszeiten, wie sein Betreiber sie veröffentlicht hat: der Eisring Süd in Favoriten mit Halle und Freifläche, die Kunsteisbahn Engelmann auf einem Dach in Hernals und ab 22. Jänner der Wiener Eistraum am Rathausplatz. Davor liegt dort von 13. November bis 6. Jänner die Eisfläche des Christkindlmarkts, am 31. Dezember geschlossen. Am Heumarkt läuft der Wiener Eislauf-Verein ab 5. November; ein Saisonende nennt er noch nicht.",
          headings: {
            events: "Wo man in Wien eislaufen kann",
            upcoming: "Saison 2026/27",
            past: "Schon vorbei",
            news: "Meldungen zum Eislaufen",
          },
        };
      }
      // Die Seite heißt, wie gesucht wird — „Bälle in Wien“, „Ballkalender“ —
      // und sagt nur, was jeder Eintrag auch hält: Datum, Saal, Einlass,
      // Dresscode, Karten. Wer wo in der Loge sitzt, steht hier nicht.
      if (g.key === "Ball") {
        return {
          title: "Bälle in Wien 2027: Ballkalender mit Terminen",
          description:
            "Ballkalender Wien 2027: vom Steirerball am 8. Jänner bis zum Opernball am 4. Februar und dem Elmayer-Kränzchen — mit Einlass, Dresscode und Karten.",
          h1: "Bälle in Wien: der Ballkalender 2027",
          lede: "In Wien ist der Fasching die Ballsaison: Von Anfang Jänner bis zum Faschingdienstag wird in der Hofburg, im Musikverein, im Rathaus und in der Staatsoper getanzt. Hier steht jeder Ball mit dem Datum, dem Einlass, dem Dresscode und den Karten, wie der Veranstalter sie veröffentlicht hat, und dem Link dorthin, wo wir es gelesen haben.",
          headings: {
            events: "Die Bälle der Saison, Termin für Termin",
            upcoming: "Ballsaison 2027",
            past: "Schon vorbei",
            news: "Meldungen zur Ballsaison",
          },
        };
      }
      const was = g.voc.plural ?? g.key;
      // "Welt" ist die eine Rubrik, deren Überschrift allein nicht trägt:
      // eine Seite namens „Welt“ sagt nichts, und interessant ist gerade,
      // von wo aus geschaut wird.
      const welt = g.key === "Welt";
      return {
        title: welt
          ? "Die Welt, von Wien aus gesehen — mit Quelle und Datum"
          : `${was} in Wien: Termine mit Quelle und Datum`,
        description: welt
          ? "Was außerhalb Österreichs passiert, von Wien aus erzählt — mit Quelle und Datum bei jedem Eintrag."
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
//
// Die Saisonen in der Reihenfolge, in der sie kommen; siehe `promotedFirst`.
// Ab dem 27. Dezember geht die eine Nacht der Saison vor, die sie beendet
// und die noch läuft — die Eisfläche am Rathausplatz bleibt bis Dreikönig.
// Im Jänner und Februar geht die Ballsaison vor: Die Eisfläche am
// Rathausplatz läuft zwar bis Dreikönig, gesucht werden ab Neujahr aber die
// Bälle, und der Opernball liegt Anfang Februar.
const today = new Date().toISOString().slice(0, 10);
const md = today.slice(5);
const PROMOTED = md >= "12-27"
  ? ["Silvester", "Weihnachtsmarkt", "Ball"]
  : md < "03-01"
    ? ["Ball", "Weihnachtsmarkt"]
    : ["Halloween", "Weihnachtsmarkt", "Silvester", "Ball"];

export const promoted = promotedFirst(allSections, PROMOTED, today, site.keyword);

// The word a heading uses for a kind, in this site's language. The article
// components know which kind a block came out as; only this file knows what
// that kind is called here, so it answers one question rather than handing
// over the table. A kind with no entry has no word, and the block keeps the
// generic heading — the same rule as rule 3 in @dst/content/sections, one
// level down.
export const pluralOf = (key: string): string | undefined => TAGS[key]?.plural;
