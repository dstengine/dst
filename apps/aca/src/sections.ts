// Las secciones de este sitio. Las reglas — cuántas entradas hace falta
// para ganarse una página, qué slugs ya están ocupados — viven en
// @dst/content/sections. Aquí quedan el vocabulario y las palabras.
//
// Sin secciones de lugar: todo lo que se publica aquí está en Acapulco, así
// que la regla de lugar daría una página /acapulco/ con lo mismo que ya hay
// en /eventos/. Eso es lo que evita `home`.
import { buildSections, promotedFirst, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";
import { eventsBySite } from "@dst/content/events";
import { newsBySite } from "@dst/content/news";
import { siteId } from "./content";
import { site } from "./site.config";

const RESERVED = ["acerca", "eventos", "noticias", "go", "li"];

// Una etiqueta se gana su página con tres entradas, así que estas no
// cuestan nada hasta entonces.
const TAGS: Record<string, Vocabulary> = {
  Música: { slug: "musica", plural: "conciertos", label: "Conciertos" },
  Deporte: { slug: "deporte", plural: "deporte", label: "Deporte" },
  Festival: { slug: "festivales", plural: "festivales" },
  Cultura: { slug: "cultura", plural: "cultura", label: "Cultura" },
  Navidad: { slug: "navidad", plural: "Navidad", label: "Navidad" },
  "Año Nuevo": { slug: "ano-nuevo", plural: "Año Nuevo", label: "Año Nuevo" },
};

export const NAV = {
  allLabel: "Todo",
  allTitle: "Todo lo que viene a Acapulco",
  label: "Por tema",
};

export function sections(items: FeedItem[]): Section[] {
  return buildSections({
    items,
    reserved: RESERVED,
    tags: TAGS,
    home: "Acapulco",
    copy: (g) => {
      const que = g.voc.plural ?? g.key.toLowerCase();
      const Que = `${que[0].toUpperCase()}${que.slice(1)}`;
      return {
        title: `${Que} en Acapulco: con fecha y fuente`,
        description: `${Que} en Acapulco: cada fecha confirmada con quien organiza y con la fuente a la vista.`,
        h1: `${Que} en Acapulco`,
        lede: `Todo lo que hay en este sitio bajo ${que} — la fecha como la publicó quien organiza, y el nombre de donde la leímos.`,
      };
    },
  });
}

export const allSections = sections([...eventsBySite(siteId), ...newsBySite(siteId)]);

// Las temporadas en el orden en que llegan; ver `promotedFirst`. Se apagan
// solas: sin entradas por venir, ninguna empuja nada.
const today = new Date().toISOString().slice(0, 10);
const PROMOTED = ["Navidad", "Año Nuevo"];

export const promoted = promotedFirst(allSections, PROMOTED, today, site.keyword);

// La palabra con que un encabezado nombra un tipo, en el idioma del sitio.
export const pluralOf = (key: string): string | undefined => TAGS[key]?.plural;
