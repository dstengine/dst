// Las secciones de este sitio: /festivales/, /movilidad/. Las reglas —
// cuántas entradas hace falta para ganarse una página, qué slugs ya están
// ocupados — viven en @dst/content/sections. Aquí quedan el vocabulario y
// las palabras.
//
// Sin secciones de lugar: todo lo que se publica aquí está en la Ciudad de
// México, así que la regla de lugar daría una página /ciudad-de-mexico/ con
// exactamente lo mismo que ya hay en /eventos/. Eso es lo que evita `home`.
import { buildSections, promotedSection, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";
import { eventsBySite } from "@dst/content/events";
import { newsBySite } from "@dst/content/news";
import { siteId } from "./content";
import { site } from "./site.config";

const RESERVED = ["acerca", "eventos", "noticias", "go", "li"];

// "Ciudad" no está aquí, y es la etiqueta más frecuente del sitio. Es una
// buena etiqueta en una tarjeta y una página inútil: nombra el tema del
// sitio entero, así que una página con ese nombre sería la portada en otra
// dirección. Lo mismo que `home` hace con el lugar.
const TAGS: Record<string, Vocabulary> = {
  Festival: { slug: "festivales", plural: "festivales" },
  Movilidad: { slug: "movilidad", plural: "movilidad", label: "Movilidad" },
  Música: { slug: "musica", plural: "música", label: "Música" },
  // "Arte" decía lo mismo sobre las mismas entradas — la muestra de
  // Monsiváis en el Estanquillo estaba en las dos — y "exposiciones" es lo
  // que se busca.
  Exposición: { slug: "exposiciones", plural: "exposiciones" },
  Deporte: { slug: "deporte", plural: "deporte", label: "Deporte" },
  Cine: { slug: "cine", plural: "cine", label: "Cine" },
  Cultura: { slug: "cultura", plural: "cultura", label: "Cultura" },
  Tecnología: { slug: "tecnologia", plural: "tecnología", label: "Tecnología" },
  Ciencia: { slug: "ciencia", plural: "ciencia", label: "Ciencia" },
  "Fiestas patrias": { slug: "fiestas-patrias", plural: "fiestas patrias" },
  // La única etiqueta de esta tabla que no es un formato sino una fecha:
  // un desfile de alebrijes, una procesión de catrinas y una noche de
  // velas en un panteón no se parecen en nada como formatos, y sí en la
  // semana del año a la que pertenecen. Es lo que se teclea.
  "Día de Muertos": {
    slug: "dia-de-muertos",
    plural: "Día de Muertos",
    label: "Día de Muertos",
  },
};

export const NAV = {
  allLabel: "Todo",
  allTitle: "Todo lo que hay en la Ciudad de México",
  label: "Por tema",
};

export function sections(items: FeedItem[]): Section[] {
  return buildSections({
    items,
    reserved: RESERVED,
    tags: TAGS,
    home: "Ciudad de México",
    copy: (g) => {
      // "X en la Ciudad de México" funciona para un formato y no para una
      // fecha: quien busca esto quiere saber dónde pararse y qué día, no
      // bajo qué etiqueta lo archivamos.
      if (g.key === "Día de Muertos") {
        return {
          title: "Día de Muertos 2026 en la CDMX: qué hay",
          description:
            "Alebrijes el 17 de octubre, catrinas el 25, el gran desfile el 31 y la alumbrada de Mixquic el 1 y 2 de noviembre — cada fecha como la publicó quien organiza",
          h1: "Día de Muertos en la Ciudad de México",
          lede: "Quince días, cuatro actos y ninguno se parece al otro: los alebrijes salen del Zócalo a mediodía, las catrinas caminan un domingo, el desfile llena Reforma un sábado y Mixquic alumbra su panteón de noche. Cada fecha como la publicó quien organiza",
          headings: {
            events: "Dónde ver el Día de Muertos",
            upcoming: "Fechas de 2026",
            past: "Ediciones pasadas",
            news: "Noticias del Día de Muertos",
          },
        };
      }
      const que = g.voc.plural ?? g.key.toLowerCase();
      const Que = `${que[0].toUpperCase()}${que.slice(1)}`;
      return {
        title: `${Que} en la Ciudad de México`,
        description: `${Que} en la Ciudad de México: cada fecha confirmada con quien organiza y con la fuente a la vista.`,
        h1: `${Que} en la Ciudad de México`,
        lede: `Todo lo que hay en este sitio bajo ${que} — la fecha como la publicó quien organiza, y el enlace a donde lo leímos.`,
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

export const promoted = promotedSection(allSections, PROMOTED, new Date().toISOString().slice(0, 10), site.keyword);
