import type { NewsItem } from "../types.ts";
import { items as dst } from "./dst.ts";
import { items as llc } from "./llc.ts";
import { items as visas } from "./visas.ts";
import { items as riviera } from "./riviera.ts";
import { items as mbr } from "./mbr.ts";
import { items as palmcentral } from "./palmcentral.ts";
import { items as eco } from "./eco.ts";
import { items as fwf } from "./fwf.ts";
// The five .lol city domains — independent of the group and of each other,
// but their feeds share this package's shape and helpers like every other.
import { items as nyc42 } from "./nyc42.ts";
import { items as ldn } from "./ldn.ts";
import { items as lnd } from "./lnd.ts";
import { items as cmx } from "./cmx.ts";
import { items as mxo } from "./mxo.ts";

const BY_SITE: Record<string, NewsItem[]> = { dst, llc, visas, riviera, mbr, palmcentral, eco, fwf, nyc42, ldn, lnd, cmx, mxo };

export const allNews: NewsItem[] = Object.values(BY_SITE).flat();

export function newsBySite(site: string): NewsItem[] {
  return BY_SITE[site] ?? [];
}

/** Descending by date, newest first, capped at n. */
export function latestNews(items: NewsItem[], n: number): NewsItem[] {
  return [...items].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)).slice(0, n);
}
