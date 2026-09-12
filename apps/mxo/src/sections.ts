// Las secciones de este sitio: /mundo/, y las ciudades cuando las haya.
// Las reglas viven en @dst/content/sections; aquí quedan el vocabulario y
// las palabras.
//
// Este sí puede tener secciones de lugar, y es el único de la red además de
// sol2go que puede: mxo cubre el país entero, así que no hay un `home` que
// excluir. Guanajuato, Guadalajara y la Ciudad de México llevan un evento
// cada una hoy; la segunda entrada de cualquiera de ellas abre su página
// sola, sin tocar este archivo.
import { buildSections, promotedSection, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";
import { eventsBySite } from "@dst/content/events";
import { newsBySite } from "@dst/content/news";
import { siteId } from "./content";

const RESERVED = ["acerca", "eventos", "noticias", "go", "li"];

const CIUDADES: Record<string, Vocabulary> = {
  "Ciudad de México": { slug: "ciudad-de-mexico", label: "CDMX" },
  Guadalajara: { slug: "guadalajara" },
  Guanajuato: { slug: "guanajuato" },
  Monterrey: { slug: "monterrey" },
  Oaxaca: { slug: "oaxaca" },
  Mérida: { slug: "merida" },
  Puebla: { slug: "puebla" },
};

const TAGS: Record<string, Vocabulary> = {
  Mundo: { slug: "mundo", plural: "mundo", label: "Mundo" },
  Cine: { slug: "cine", plural: "cine", label: "Cine" },
  Arte: { slug: "arte", plural: "arte", label: "Arte" },
  Ciencia: { slug: "ciencia", plural: "ciencia", label: "Ciencia" },
  Tecnología: { slug: "tecnologia", plural: "tecnología", label: "Tecnología" },
  Turismo: { slug: "turismo", plural: "turismo", label: "Turismo" },
  Naturaleza: { slug: "naturaleza", plural: "naturaleza", label: "Naturaleza" },
  Movilidad: { slug: "movilidad", plural: "movilidad", label: "Movilidad" },
  Ferias: { slug: "ferias", plural: "ferias" },
  Festivales: { slug: "festivales", plural: "festivales" },
  // La única etiqueta de esta tabla que no es una categoría sino una fecha:
  // "Día de Muertos" no describe el formato del evento sino qué se celebra,
  // y es exactamente lo que se teclea. Cuatro eventos y una nota ya piden
  // una página propia, y ninguno de ellos perdía nada al salir de
  // "Festival": esa etiqueta en singular nunca tuvo página.
  "Día de Muertos": {
    slug: "dia-de-muertos",
    plural: "Día de Muertos",
    label: "Día de Muertos",
  },
};

export const NAV = {
  allLabel: "Todo",
  allTitle: "Todo lo que hay en el sitio",
  label: "Por tema y ciudad",
};

export function sections(items: FeedItem[]): Section[] {
  return buildSections({
    items,
    reserved: RESERVED,
    places: CIUDADES,
    tags: TAGS,
    placeOf: (i) => ("city" in i ? i.city : undefined),
    copy: (g) => {
      if (g.kind === "place") {
        // El nombre del sitio no lo busca nadie, así que ese lugar del
        // título lo ocupa la palabra que sí se teclea. Y nadie escribe
        // "Monterrey" a secas cuando busca desde fuera: escribe "Monterrey,
        // México". La coma no es decoración — separa la ciudad del país
        // igual que en la caja de búsqueda.
        //
        // La excepción se nombra sola: "Ciudad de México, México" sería una
        // repetición, y lo mismo cualquier lugar que ya lleve el país en su
        // nombre. Ahí la palabra ya está donde tiene que estar.
        const donde = /m[ée]xico/i.test(g.key) ? g.key : `${g.key}, México`;
        return {
          title: `Qué hay en ${donde}`,
          description: `Ferias, festivales y noticias de ${donde}, con la fecha confirmada y la fuente a la vista.`,
          h1: `Qué hay en ${donde}`,
          lede: `Todo lo que hay en este sitio que pasa en ${g.key} — la fecha como la publicó quien organiza, y el enlace a donde lo leímos.`,
        };
      }
      const que = g.voc.plural ?? g.key.toLowerCase();
      const Que = `${que[0].toUpperCase()}${que.slice(1)}`;
      // "Mundo" es la única etiqueta cuyo encabezado no funciona solo: una
      // página titulada "Mundo" no dice nada, y lo que la hace útil es
      // justamente desde dónde se mira.
      const esMundo = g.key === "Mundo";
      // Y la otra excepción: la plantilla "X en México" funciona para un
      // formato ("Ferias en México") y no para una fecha — quien busca
      // esto quiere saber dónde, no bajo qué etiqueta lo archivamos.
      if (g.key === "Día de Muertos") {
        return {
          title: "Día de Muertos 2026: dónde verlo en México",
          description:
            "Festivales, desfiles y noches de muertos por todo el país, del 30 de octubre al 15 de noviembre, con la fecha como la publicó quien organiza.",
          h1: "Día de Muertos en México",
          lede: "Del Xantolo en la Huasteca a la noche de Janitzio y al Festival de Calaveras en Aguascalientes — cada fecha como la publicó quien organiza, y de dónde la sacamos. Es la misma fiesta y no se parece en dos estados seguidos.",
          // Quien llega aquí no busca "Eventos" ni "Próximos": busca dónde
          // ver el Día de Muertos y en qué fechas. Los encabezados dicen
          // eso y no cómo lo archivamos nosotros.
          headings: {
            events: "Dónde ver el Día de Muertos",
            upcoming: "Fechas de 2026",
            past: "Ediciones pasadas",
            news: "Noticias del Día de Muertos",
          },
        };
      }
      return {
        title: esMundo ? "Noticias del mundo, desde México" : `${Que} en México`,
        description: esMundo
          ? "Lo que pasa fuera de México contado desde aquí, con la fuente y la fecha en cada nota."
          : `${Que} en México: cada fecha confirmada con quien organiza y con la fuente a la vista.`,
        h1: esMundo ? "Noticias del mundo, desde México" : `${Que} en México`,
        lede: esMundo
          ? "Lo que pasa fuera del país y llega hasta aquí — cada nota con su fuente y la fecha en que la leímos."
          : `Todo lo que hay en este sitio bajo ${que} — la fecha como la publicó quien organiza, y el enlace a donde lo leímos.`,
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
const PROMOTED = 'Día de Muertos';

export const promoted = promotedSection(allSections, PROMOTED, new Date().toISOString().slice(0, 10));
