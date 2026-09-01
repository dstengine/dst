// Every URL this site generates, resolved from the data in one place.
//
// The root is a shared namespace: cities, prioritised events and prioritised
// venues all live there (/dubai/, /chicago/, /broadway/). That is what people
// type, so it is what we serve — at the cost of having to prove the slugs
// cannot collide, which assertUniqueRoots() does at build time. A duplicate
// is a build failure, not a route that quietly wins.
import { cities } from "./data/cities";
import { groups } from "./data/groups";
import { runs } from "./data/runs";
import { shows } from "./data/shows";
import { venues } from "./data/venues";
import { cityHasPage } from "./rules";

/** Segments owned by static pages under src/pages/. Nothing generated may
    take one of these. */
export const RESERVED = ["about", "online", "venue", "venues", "go", "404"];

export type RootEntry =
  | { kind: "city"; slug: string }
  | { kind: "show"; slug: string }
  | { kind: "venue"; slug: string; venue: string };

export function rootEntries(): RootEntry[] {
  return [
    ...cities.filter(cityHasPage).map((c) => ({ kind: "city" as const, slug: c.slug })),
    ...shows.map((s) => ({ kind: "show" as const, slug: s.slug })),
    ...venues.filter((v) => v.rootSlug).map((v) => ({ kind: "venue" as const, slug: v.rootSlug!, venue: v.slug })),
  ];
}

export type ShowEntry =
  | { kind: "run"; show: string; slug: string }
  | { kind: "group"; show: string; slug: string }
  | { kind: "section"; show: string; slug: string }
  | { kind: "clip"; show: string; slug: string };

/** Everything under /<show>/. Runs and groups share the level with the
    editorial sections, so their slugs are checked against each other too. */
export function showEntries(show: string): ShowEntry[] {
  const s = shows.find((x) => x.slug === show)!;
  return [
    ...runs.filter((r) => r.show === show).map((r) => ({ kind: "run" as const, show, slug: r.slug })),
    ...groups
      .filter((g) => g.show === show && runs.some((r) => r.group === g.slug))
      .map((g) => ({ kind: "group" as const, show, slug: g.slug })),
    ...s.sections.map((sec) => ({ kind: "section" as const, show, slug: sec.slug })),
    ...(s.clips ?? []).map((c) => ({ kind: "clip" as const, show, slug: `online/${c.slug}` })),
  ];
}

function assertUnique(where: string, slugs: string[]): void {
  const seen = new Set<string>();
  for (const slug of slugs) {
    if (seen.has(slug)) throw new Error(`${where}: two things claim /${slug}/ — give one of them a different slug`);
    seen.add(slug);
  }
}

/** Called from the catch-all route, so a collision stops the build instead of
    shipping whichever page Astro generated last. */
export function assertRoutesAreUnique(): void {
  const roots = rootEntries().map((e) => e.slug);
  for (const slug of roots) {
    if (RESERVED.includes(slug)) throw new Error(`/${slug}/ is a static page; it cannot also be generated`);
  }
  assertUnique("root", roots);
  for (const show of shows) assertUnique(`/${show.slug}/`, showEntries(show.slug).map((e) => e.slug));
}
