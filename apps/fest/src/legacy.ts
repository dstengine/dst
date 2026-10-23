// The archive of the old festival site, as content of this app (card
// 2026-10-23-fest-one-new-engine). tools/fest-legacy-import.mjs reads the
// restored archive once and writes one record per page to
// legacy/pages.json, outside src/ because the archive's text is in Russian
// and the app's own source is not; this file only names its shape.
//
// No @dst/* import: tools/lastmod.mjs loads dated.ts, which reads this,
// with Node's type stripping.
import records from "../legacy/pages.json" with { type: "json" };

export interface LegacyCrumb {
  href: string;
  label: string;
  title: string;
}

export interface LegacyPage {
  /** "/iron-maiden/moskva2016/": the archive's canonical, kept. */
  path: string;
  /** The archive's own address where the page moved: its front page, "/". */
  was?: string;
  /** The archive's <title> less its suffix ("concert listings archive"),
      or where that does not fit in 60 with LEGACY_SUFFIX, a shorter one. */
  title: string;
  /** The archive's own, where `title` had to be shortened. */
  archiveTitle?: string;
  description: string;
  /** The archive's h1, as markup: it keeps its no-break spans. */
  h1: string;
  /** The language of the archive's own text: ru, en or es. */
  lang: string;
  /** The trail between the root crumb and the page. */
  crumbs: LegacyCrumb[];
  /** The page's own name at the end of the trail. */
  current: string;
  /** /contacts/, which the archive kept out of the index. */
  noindex?: boolean;
  /** The archive's share picture, under /_assets/. */
  image?: string;
  createdAt: string;
  updatedAt: string;
  /** The archive's <main>, as written, less its trail and h1. */
  body: string;
}

export const legacyPages = records as LegacyPage[];

/** What a legacy page's title ends in where it lacks "festival": the
    guides' "festival guide" would be untrue of a concert listing from
    2016, and "festival archive" is what every one of these pages is part
    of. tools/fest-legacy-import.mjs fits the titles to it. */
export const LEGACY_SUFFIX = "festival archive";
