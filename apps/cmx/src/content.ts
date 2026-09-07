import { ES } from "@dst/ui/labels";
import type { ArticleLabels } from "@dst/ui/labels";

// The site publishes itself: these five domains are independent of the DST
// group and of each other, so every block of structured data on them has to
// name this host rather than the group — see VERCEL.md.
export const publisher = {
  id: "https://cmx.lol/#organization",
  name: "Agenda CDMX",
  url: "https://cmx.lol/",
};

export const siteId = "cmx";
export const newsBase = "/noticias/";
export const eventsBase = "/eventos/";

export const home = {
  title: "Qué hacer en la Ciudad de México",
  description: "Qué hacer en la Ciudad de México: exposiciones, ferias y cómo funciona la ciudad.",
  h1: "Qué hacer en la Ciudad de México",
  lede: `Museos y exposiciones, parques y plazas, y lo que la ciudad abre o cambia. Qué hay, qué cambió esta semana, y cuándo.`,
};

export const news = {
  title: "Qué cambió en la Ciudad de México",
  description: "No es un teletipo. Unas cuantas cosas por semana que vale la pena saber y que pudimos verificar.",
  h1: "Qué cambió en la Ciudad de México",
  lede: `No es un teletipo. Unas cuantas cosas por semana que vale la pena saber y que pudimos verificar.`,
};

export const events = {
  title: "Eventos en la Ciudad de México, por fecha",
  description: "Fechas confirmadas con quien organiza. Un evento sin fecha confirmada no se publica hasta tenerla.",
  h1: "La Ciudad de México, por fecha",
  lede: `Fechas confirmadas con quien organiza. Un evento sin fecha confirmada no se publica hasta tenerla.`,
};

export const about = {
  title: "Acerca de Agenda CDMX, una guía de la Ciudad de México",
  description: "Qué hacer en la Ciudad de México, con fuente y fecha en cada entrada.",
  h1: "Acerca de Agenda CDMX, una guía de la Ciudad de México",
  lede: `Qué hacer en la Ciudad de México, con fuente y fecha en cada entrada.`,
};

// The words the shared article components put on the page, in Spanish.
// The set is shared — see @dst/ui's labels — and this site adds nothing
// to it today. When it needs a word of its own, spread and override.
export const labels: Partial<ArticleLabels> = ES;

/**
 * The site's RSS channel. It lives here rather than in the route because
 * site.config.ts needs the title too — the head's autodiscovery link is
 * what a reader's tool reads to offer the subscription, and a title written
 * out twice is a title that drifts.
 */
export const feed = {
  title: "Agenda CDMX — noticias",
  description: "Qué cambia en la Ciudad de México: exposiciones, ferias y cómo funciona la ciudad, con la fuente en cada entrada.",
  /** RFC 5646. Without it an aggregator files this site under the wrong language. */
  language: "es-MX",
};
