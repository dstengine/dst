import { ES } from "@dst/ui/labels";
import type { ArticleLabels } from "@dst/ui/labels";

// acapulco.world publishes itself: a standalone domain, independent of the
// DST group and of the .lol sites, so every block of structured data on it
// names this host rather than anyone else.
export const publisher = {
  id: "https://acapulco.world/#organization",
  name: "Agenda Acapulco",
  url: "https://acapulco.world/",
};

export const siteId = "aca";
export const newsBase = "/noticias/";
export const eventsBase = "/eventos/";

// What brings people to Acapulco on a date is mostly two venues in
// Acapulco Diamante — Arena GNP Seguros and the Forum Mundo Imperial — and
// the tennis in February. The copy names what is actually on the site.
export const home = {
  title: "Qué hacer en Acapulco: conciertos, tenis y pádel",
  description: "Qué hacer en Acapulco: conciertos, el Abierto Mexicano de Tenis y el pádel, cada fecha confirmada con quien organiza y con la fuente a la vista.",
  h1: "Qué hacer en Acapulco",
  lede: `Conciertos, torneos y lo que viene a Acapulco, con la fecha como la publicó quien organiza y el nombre de donde la leímos.`,
};

export const news = {
  title: "Noticias de Acapulco: fechas y boletos",
  description: "Noticias de Acapulco: las fechas que se anuncian y los boletos que salen a la venta, cada una verificada contra su fuente.",
  h1: "Noticias de Acapulco",
  lede: `Las fechas que se anuncian y los boletos que salen a la venta, cada una verificada contra su fuente.`,
};

export const events = {
  title: "Eventos en Acapulco, por fecha",
  description: "Eventos en Acapulco con la fecha confirmada por quien organiza: conciertos, tenis y pádel. Lo que no tiene fecha confirmada no se publica.",
  h1: "Eventos en Acapulco, por fecha",
  lede: `Fechas confirmadas con quien organiza. Un evento sin fecha confirmada no se publica hasta tenerla.`,
};

export const about = {
  title: "Acerca de Agenda Acapulco: qué hacer en Acapulco",
  description: "Qué hacer en Acapulco, con fuente y fecha en cada entrada.",
  h1: "Acerca de Agenda Acapulco",
  lede: `Qué hacer en Acapulco, con fuente y fecha en cada entrada.`,
};

// The words the shared article components put on the page, in Spanish.
export const labels: Partial<ArticleLabels> = ES;

/**
 * The site's RSS channel. It lives here rather than in the route because
 * site.config.ts needs the title too, and a title written out twice is a
 * title that drifts.
 */
export const feed = {
  title: "Agenda Acapulco — noticias",
  description: "Qué viene a Acapulco: conciertos, tenis y pádel, con la fuente en cada entrada.",
  /** RFC 5646. Without it an aggregator files this site under the wrong language. */
  language: "es-MX",
};
