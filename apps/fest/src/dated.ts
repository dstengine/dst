// Which record each page of this site is, and when that record last changed
// (what tools/lastmod.mjs needs to date the page, and no page renders).
//
// Each page of a guide is a record of its own, with its own createdAt and
// updatedAt in the event's file (tools/record-blocks.mjs reads them), so the
// 2 December take-down of the prices re-dates tickets, camping and location
// and leaves the lineup alone. Every page also prints facts from the
// event's sheet, so an edit to the sheet moves them all, through `with`.
// The main page also carries the guide's own words (its language name and
// blurb are the hub's link to it), so it takes the guide's date as well.
//
// Each page of the archive of the old festival site is a record too
// (legacy/pages.json), dated by its own updatedAt: the day the archive was
// restored, until a page of it is edited.
//
// The hub is not here: it is a list, and lastmod.mjs dates it by the pages
// it links to against the files that shape it (src/hub.ts among them).
//
// No @dst/* import and no import of anything that has one: lastmod.mjs loads
// this file with Node's type stripping.
import { events, guides } from "./data/events/index";
import { legacyPages } from "./legacy";

export interface DatedPage {
  updatedAt: string;
  with?: string;
  entry: boolean;
}

const newest = (dates: string[]) => dates.reduce((a, b) => (Date.parse(b) > Date.parse(a) ? b : a));

export function datedPages(): Map<string, DatedPage> {
  const pages = new Map<string, DatedPage>();
  for (const guide of guides) {
    const event = events.find((e) => e.slug === guide.event);
    if (!event) throw new Error(`guide ${guide.slug}: no event "${guide.event}"`);
    for (const page of guide.pages) {
      const path = `/${page.slug}/`;
      const own = path === guide.path ? newest([page.updatedAt, guide.updatedAt]) : page.updatedAt;
      pages.set(path, { updatedAt: own, with: event.updatedAt, entry: true });
    }
  }
  for (const page of legacyPages) pages.set(page.path, { updatedAt: page.updatedAt, entry: true });
  return pages;
}
