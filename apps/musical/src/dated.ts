// Which record each page of this site is, and when that record last changed
// — what tools/lastmod.mjs needs to date the page and no page renders.
//
// The sitemap used to date every page here by the newest data file behind
// it. Nearly every page reads runs.ts, so four new FAQ answers on one run in
// Dubai put 237 of the site's 247 pages on the same day. Every record with a
// page now carries its own dates (see Dated in ./data/types.ts), and this
// file says which page is which record. The URLs come from ./routes.ts, so a
// page cannot be dated under an address it is not served at.
//
// Two kinds of page, as everywhere else in the network:
//
// - An **entry** is its record, and nothing else has a say: a run, a clip.
//   A run page also prints its theatre — address, how to get there, the
//   map — so it moves when the theatre does. Nothing else it shows is its
//   own: the other stops and the other musicals are listings, and dating a
//   run by its neighbours is how one edit came to move a whole tour.
// - Everything else — a show, a section, a tour, a city, a country, a
//   theatre, a collection — has a record of its own and is also a list.
//   lastmod.mjs takes the newest of the record, the records the page links
//   to, and the files that shape it.
import { runs } from "./data/runs";
import { shows } from "./data/shows";
import { groups } from "./data/groups";
import { cities } from "./data/cities";
import { countries } from "./data/countries";
import { collections } from "./data/collections";
import { venues } from "./data/venues";
import { rootEntries, showEntries } from "./routes";
import { venuePath } from "./rules";
import type { Dated } from "./data/types";

export interface DatedPage {
  /** The record's own `updatedAt`, which is also what a page that links to
      this one counts. */
  updatedAt: string;
  /** Another record the page prints in full, beside its own. */
  with?: string;
  /** The record is the page: no listing and no file moves it. */
  entry: boolean;
}

/** Every page built from a record, by its path. */
export function datedPages(): Map<string, DatedPage> {
  const pages = new Map<string, DatedPage>();
  const add = (path: string, record: Dated | undefined, entry = false, also?: Dated) => {
    if (!record) throw new Error(`${path}: no record behind the page`);
    pages.set(path, { updatedAt: record.updatedAt, ...(also ? { with: also.updatedAt } : {}), entry });
  };
  const venueBySlug = (slug?: string) => venues.find((v) => v.slug === slug);

  for (const entry of rootEntries()) {
    const path = `/${entry.slug}/`;
    if (entry.kind === "collection") add(path, collections.find((c) => c.slug === entry.slug));
    if (entry.kind === "city") add(path, cities.find((c) => c.slug === entry.slug));
    if (entry.kind === "country") add(path, countries.find((c) => c.slug === entry.slug));
    if (entry.kind === "show") add(path, shows.find((s) => s.slug === entry.slug));
    if (entry.kind === "venue") add(path, venueBySlug(entry.venue));
  }
  for (const venue of venues) if (!venue.rootSlug) add(venuePath(venue), venue);

  for (const show of shows) {
    for (const entry of showEntries(show.slug)) {
      const path = `/${show.slug}/${entry.slug}/`;
      if (entry.kind === "run") {
        const run = runs.find((r) => r.show === show.slug && r.slug === entry.slug);
        add(path, run, true, venueBySlug(run?.venue));
      }
      if (entry.kind === "group") add(path, groups.find((g) => g.show === show.slug && g.slug === entry.slug));
      if (entry.kind === "section") add(path, show.sections.find((s) => s.slug === entry.slug));
      if (entry.kind === "clip") add(path, show.clips?.find((c) => `online/${c.slug}` === entry.slug), true);
    }
  }
  return pages;
}
