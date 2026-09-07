// Las secciones de este sitio: /festivales/, /movilidad/. Las reglas —
// cuántas entradas hace falta para ganarse una página, qué slugs ya están
// ocupados — viven en @dst/content/sections. Aquí quedan el vocabulario y
// las palabras.
//
// Sin secciones de lugar: todo lo que se publica aquí está en la Ciudad de
// México, así que la regla de lugar daría una página /ciudad-de-mexico/ con
// exactamente lo mismo que ya hay en /eventos/. Eso es lo que evita `home`.
import { buildSections, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";

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
