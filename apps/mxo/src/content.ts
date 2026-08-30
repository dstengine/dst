import type { ArticleLabels } from "@dst/ui/labels";

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
  description: "La agenda cultural de México, con fuente y fecha en cada entrada.",
  h1: "Acerca de mxo",
  lede: `La agenda cultural de México, con fuente y fecha en cada entrada.`,
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
