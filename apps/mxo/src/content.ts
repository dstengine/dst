// The site publishes itself: these five domains are independent of the DST
// group and of each other, so every block of structured data on them has to
// name this host rather than the group — see VERCEL.md.
export const publisher = {
  id: "https://mxo.lol/#organization",
  name: "mxo.lol",
  url: "https://mxo.lol/",
};

export const site = "mxo";
export const newsBase = "/noticias/";
export const eventsBase = "/eventos/";

export const home = {
  title: "La agenda de México",
  description: "La agenda de México: ferias, festivales y exposiciones con fecha confirmada.",
  h1: "La agenda de México",
  lede: `Ferias, festivales y exposiciones de todo el país, con fecha confirmada y fuente citada. Lo que no pudimos confirmar no aparece.`,
};

export const news = {
  title: "Noticias",
  description: "Unas cuantas cosas por semana, cada una verificada contra la fuente que la reportó.",
  h1: "Qué cambió en la agenda",
  lede: `Unas cuantas cosas por semana, cada una verificada contra la fuente que la reportó.`,
};

export const events = {
  title: "Eventos",
  description: "La agenda nacional: cada fecha confirmada con quien organiza, no copiada de otro listado.",
  h1: "México, por fecha",
  lede: `La agenda nacional: cada fecha confirmada con quien organiza, no copiada de otro listado.`,
};

export const about = {
  title: "Acerca",
  description: "Un sitio pequeño con la agenda cultural de México, con unas cuantas reglas.",
  h1: "Acerca de mxo",
  lede: `Un sitio pequeño con la agenda cultural de México, con unas cuantas reglas.`,
};
