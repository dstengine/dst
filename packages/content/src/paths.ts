// Where an entry's page is. Almost always the site's feed base and the slug
// — "/guides/" and "how-to-brew-sencha" make "/guides/how-to-brew-sencha/" —
// but an entry may carry a short address of its own (`path`), and every
// card, feed, sitemap source and listing has to agree on it, so they all ask
// here rather than gluing the string together themselves.
import type { NewsItem } from "./types.ts";

export const newsHref = (item: Pick<NewsItem, "slug" | "path">, base: string): string =>
  item.path ?? `${base}${item.slug}/`;
