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

/** The entry's links to its own site, under the prefix of the language the
    page is built in. Its words are localised with it, but a link inside
    them goes out as typed: an Armenian body that links "/events/aki-fest/"
    sends its reader to the English page when "/am/events/aki-fest/" is the
    one in their language (82 such links on tick, 25 Oct 2026). Only an
    `href="/…"` inside the entry's strings moves. A link already under the
    prefix stays, and so do an outbound `/go/` redirect and a file (a feed,
    a calendar, an image): none of them has a twin under the prefix. A
    language at the root ("/") changes nothing. */
export function localizeLinks<T>(item: T, prefix: string): T {
  if (prefix === "/") return item;
  const own = prefix.slice(1);
  const stays = (path: string) =>
    path.startsWith(own) || path.startsWith("go/") || /\.[a-z0-9]+$/i.test(path.split(/[?#]/)[0].split("/").at(-1)!);
  const move = (s: string) =>
    s.includes('href="/') ? s.replace(/href="\/([^"]*)"/g, (link, path: string) => (stays(path) ? link : `href="${prefix}${path}"`)) : s;
  const walk = (v: unknown): unknown =>
    typeof v === "string" ? move(v)
    : Array.isArray(v) ? v.map(walk)
    : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]))
    : v;
  return walk(item) as T;
}
