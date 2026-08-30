// The site publishes itself: these five domains are independent of the DST
// group and of each other, so every block of structured data on them has to
// name this host rather than the group — see VERCEL.md.
export const publisher = {
  id: "https://cmx.lol/#organization",
  name: "cmx.lol",
  url: "https://cmx.lol/",
};

export const site = "cmx";
export const newsBase = "/noticias/";
export const eventsBase = "/eventos/";

export const home = {
  title: "Qué hacer en la Ciudad de México",
  description: "Qué hacer en la Ciudad de México: exposiciones, ferias y cómo funciona la ciudad.",
  h1: "Qué hacer en la Ciudad de México",
  lede: `Una lista corta de lo que está pasando en la ciudad y de lo que cambió esta semana. Cada entrada dice de dónde salió el dato y el día en que se verificó.`,
};

export const news = {
  title: "Noticias",
  description: "No es un teletipo. Unas cuantas cosas por semana que vale la pena saber y que pudimos verificar.",
  h1: "Qué cambió en la ciudad",
  lede: `No es un teletipo. Unas cuantas cosas por semana que vale la pena saber y que pudimos verificar.`,
};

export const events = {
  title: "Eventos",
  description: "Fechas confirmadas con quien organiza. Un evento sin fecha confirmada no se publica hasta tenerla.",
  h1: "La Ciudad de México, por fecha",
  lede: `Fechas confirmadas con quien organiza. Un evento sin fecha confirmada no se publica hasta tenerla.`,
};

export const about = {
  title: "Acerca",
  description: "Qué hacer en la Ciudad de México, con fuente y fecha en cada entrada.",
  h1: "Acerca de cmx",
  lede: `Qué hacer en la Ciudad de México, con fuente y fecha en cada entrada.`,
};
