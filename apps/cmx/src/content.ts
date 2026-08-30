import type { ArticleLabels } from "@dst/ui/labels";

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
  lede: `Museos y exposiciones, parques y plazas, y lo que la ciudad abre o cambia. Qué hay, qué cambió esta semana, y cuándo.`,
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

// The words the shared article components put on the page. Without this
// they default to English, which is what put "Format", "Where" and "All
// events" around Spanish copy on a page that declares itself es-MX.
//
// It lives here rather than in @dst/ui because each app builds in isolation
// on Vercel and cannot import from a sibling — so the other Spanish site
// carries its own copy of this, deliberately.
export const labels: Partial<ArticleLabels> = {
  ended: "Finalizado",
  organizedBy: "Organiza",
  minRead: (n) => `${n} min de lectura`,

  tickets: "Boletos",
  register: "Registrarse",
  addToCalendar: "Agregar al calendario",
  addToCalendarTitle: (title) => `Agregar ${title} a tu calendario`,

  time: "Horario",
  timeFrom: (start) => `Desde las ${start}`,
  duration: "Duración",
  durationValue: (hours, minutes) =>
    [hours && `${hours} hora${hours === 1 ? "" : "s"}`, minutes && `${minutes} minutos`]
      .filter(Boolean)
      .join(" "),
  format: "Formato",
  inPerson: "Presencial",
  where: "Dónde",
  ticketsRow: "Boletos",
  salesClose: "Cierre de venta",
  refunds: "Reembolsos",
  organizer: "Organizador",

  whatHappened: "Qué pasó",
  programme: "Programa",
  whoItsFor: "Para quién es",
  locate: "Ubicación",
  related: "Relacionado",
  moreEvents: "Más eventos",
  moreNews: "Más noticias",
  latestNews: "Últimas noticias",
  comingUp: "Próximamente",

  readMore: "Leer más",
  allEvents: "Todos los eventos",
  allNews: "Todas las noticias",
  upcoming: "Próximos",
  pastGroup: "Pasados",
  past: "Pasado",
  mapTitle: (place) => `Mapa — ${place}`,

  source: "Fuente",
  checkedAgainstSource: "verificado con la fuente el",
  checkedTitle: (name) => `Última verificación con ${name} en esta fecha`,

  imageKinds: {
    photo: "Fotografía",
    diagram: "Diagrama",
    illustration: "Ilustración",
    render: "Render",
  },
};
