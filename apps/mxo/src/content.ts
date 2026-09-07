import { ES } from "@dst/ui/labels";
import type { ArticleLabels } from "@dst/ui/labels";

// The site publishes itself: these five domains are independent of the DST
// group and of each other, so every block of structured data on them has to
// name this host rather than the group — see VERCEL.md.
export const publisher = {
  id: "https://mxo.lol/#organization",
  name: "Ferias y Festivales de México",
  url: "https://mxo.lol/",
};

export const siteId = "mxo";
export const newsBase = "/noticias/";
export const eventsBase = "/eventos/";

export const home = {
  title: "La agenda de México",
  description: "La agenda de México: ferias, festivales y exposiciones con fecha confirmada.",
  h1: "La agenda de México",
  lede: `Ferias, festivales y exposiciones de todo el país, con fecha confirmada y fuente citada. Lo que no pudimos confirmar no aparece.`,
};

export const news = {
  title: "Qué cambió en la agenda de México",
  description: "Unas cuantas cosas por semana, cada una verificada contra la fuente que la reportó.",
  h1: "Qué cambió en la agenda de México",
  lede: `Unas cuantas cosas por semana, cada una verificada contra la fuente que la reportó.`,
};

export const events = {
  title: "Eventos en México, por fecha",
  description: "La agenda nacional: cada fecha confirmada con quien organiza, no copiada de otro listado.",
  h1: "México, por fecha",
  lede: `La agenda nacional: cada fecha confirmada con quien organiza, no copiada de otro listado.`,
};

export const about = {
  title: "Acerca de Ferias y Festivales de México",
  description: "La agenda cultural de México, con fuente y fecha en cada entrada.",
  h1: "Acerca de Ferias y Festivales de México",
  lede: `La agenda cultural de México, con fuente y fecha en cada entrada.`,
};

// The words the shared article components put on the page, in Spanish.
// The set is shared — see @dst/ui's labels — and this site adds nothing
// to it today. When it needs a word of its own, spread and override.
export const labels: Partial<ArticleLabels> = ES;
