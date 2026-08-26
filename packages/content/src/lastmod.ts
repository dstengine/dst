// When each page's content last changed, by host and path.
//
// The data in lastmod.json is generated from git history by
// tools/lastmod.mjs and committed — see the note at the top of that file
// for why it isn't computed during the build.
import dates from "./lastmod.json" with { type: "json" };

const byHost = dates as Record<string, Record<string, string>>;

/** ISO date for a page, or undefined when we don't know — an unknown date
    is left out of the sitemap rather than guessed. */
export function lastModified(host: string, pathname: string): string | undefined {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return byHost[host]?.[path];
}

export { byHost as lastModifiedByHost };
