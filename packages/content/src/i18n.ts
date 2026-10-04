// One entry, two languages. A site that publishes in a second language
// keeps the translation on the entry itself — see `i18n` in ./types.ts —
// and asks for the entry in the language of the page being built.
import type { NewsItem, EventItem } from "./types.ts";

/** The entry as the page in `lang` should say it: the translation's words
    over the entry's own, field by field. The entry's own language, or a
    language it has no translation into, returns the entry unchanged. The
    `i18n` map itself is dropped, so nothing downstream can render the
    other language by accident. */
export function localize<T extends NewsItem | EventItem>(item: T, lang: string): T {
  const words = item.i18n?.[lang];
  const { i18n: _, ...own } = item;
  return (words ? { ...own, ...words } : own) as T;
}
