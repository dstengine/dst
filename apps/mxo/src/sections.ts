// Las secciones de este sitio: /mundo/, y las ciudades cuando las haya.
// Las reglas viven en @dst/content/sections; aquí quedan el vocabulario y
// las palabras.
//
// Este sí puede tener secciones de lugar, y es el único de la red además de
// sol2go que puede: mxo cubre el país entero, así que no hay un `home` que
// excluir. Guanajuato, Guadalajara y la Ciudad de México llevan un evento
// cada una hoy; la segunda entrada de cualquiera de ellas abre su página
// sola, sin tocar este archivo.
import { buildSections, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";

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
        return {
          title: `Qué hay en ${g.key}`,
          description: `Ferias, festivales y noticias de ${g.key}, con la fecha confirmada y la fuente a la vista.`,
          h1: `Qué hay en ${g.key}`,
          lede: `Todo lo que hay en este sitio que pasa en ${g.key} — la fecha como la publicó quien organiza, y el enlace a donde lo leímos.`,
        };
      }
      const que = g.voc.plural ?? g.key.toLowerCase();
      const Que = `${que[0].toUpperCase()}${que.slice(1)}`;
      // "Mundo" es la única etiqueta cuyo encabezado no funciona solo: una
      // página titulada "Mundo" no dice nada, y lo que la hace útil es
      // justamente desde dónde se mira.
      const esMundo = g.key === "Mundo";
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
