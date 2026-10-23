// Every address this app serves, from the data, and the rules that keep
// them clear of each other.
//
// fest.one is this app alone since 23 Oct 2026: the hub at /, the guides,
// and the archive of the old festival site at the addresses it always had
// (/concert/, /sensation2015/, the artist, venue and city pages; its front
// page moved to /archive/). So a guide may take any path the archive does
// not, an event's first guide sits at /<event>/ whatever its language, and
// a second language at /<event>/<hl>/. A guide's subpages are
// named in its own language (Primavera's ingressos/, Creamfields'
// entradas/), which is why the language segments are reserved below: a
// subpage called "es" could never be told from a Spanish guide.
import { events, guides } from "./data/events/index";
import type { FestEvent, Guide, GuidePage } from "./data/types";
import { pathOf, withoutSuffix } from "./copy";
import { eventOf, mainPage } from "./rules";
import { legacyPages, type LegacyPage } from "./legacy";

/** First segments the app keeps for itself. */
export const RESERVED = ["festivals", "go", "fonts", "_astro", "_assets", "sitemap-index.xml", "sitemap-0.xml", "llms.txt"];

/** A language or locale segment, "es" or "pt-BR". */
const LANGUAGE = /^[a-z]{2}(-[A-Z]{2})?$/;

export interface GuideRoute {
  event: FestEvent;
  guide: Guide;
  page: GuidePage;
  /** "/beyond-the-valley/tickets/" */
  path: string;
}

/** Every guide page. */
export function guideRoutes(): GuideRoute[] {
  return guides.flatMap((guide) => {
    const event = eventOf(events, guide);
    return guide.pages.map((page) => ({ event, guide, page, path: pathOf(page) }));
  });
}

export interface LegacyRoute {
  page: LegacyPage;
  path: string;
}

/** Every page of the archive, at its own address. */
export function legacyRoutes(): LegacyRoute[] {
  return legacyPages.map((page) => ({ page, path: page.path }));
}

/** Fails the build on two pages at one address, a page at a reserved
    address, a page outside its guide, or a guide at a language segment's
    address that is not its language. The .md twins are addresses too:
    /beyond-the-valley.md and a page called "beyond-the-valley.md" would be
    one file. */
export function assertRoutesAreUnique() {
  const seen = new Map<string, string>();
  const claim = (address: string, by: string) => {
    const before = seen.get(address);
    if (before) throw new Error(`${address} is claimed twice: ${before} and ${by}`);
    seen.set(address, by);
  };
  for (const name of RESERVED) claim(`/${name}`, "the app");
  claim("/", "the hub");
  claim("/index.md", "the hub's Markdown twin");
  // The archive's pages first: they had their addresses before any guide.
  for (const { path } of legacyRoutes()) {
    const first = path.split("/").filter(Boolean)[0];
    if (RESERVED.includes(first)) throw new Error(`legacy ${path}: takes the reserved /${first}/`);
    claim(path, `the archive's ${path}`);
  }
  for (const { event, guide, page, path } of guideRoutes()) {
    const by = `${event.slug}/${guide.slug}/${page.kind}`;
    const segments = page.slug.split("/");
    if (!page.slug || segments.some((s) => !s)) throw new Error(`${by}: the slug "${page.slug}" is not a path`);
    if (segments[0] !== event.slug) throw new Error(`${by}: ${path} is not under /${event.slug}/`);
    if (!path.startsWith(guide.path)) throw new Error(`${by}: ${path} is outside its guide's ${guide.path}`);
    if (RESERVED.includes(segments[0])) throw new Error(`${by}: ${path} takes the reserved /${segments[0]}/`);
    // Under an event, a language segment is a guide's home and nothing else.
    const own = guide.path.split("/").filter(Boolean)[1];
    segments.slice(1).forEach((s, i) => {
      if (LANGUAGE.test(s) && !(i === 0 && s === own))
        throw new Error(`${by}: "${s}" in ${path} reads as a language; a subpage needs another name`);
    });
    claim(path, by);
    claim(`/${page.slug}.md`, `${by} (Markdown)`);
  }
  for (const event of events) for (const key of Object.keys(event.go)) claim(`/go/${event.slug}-${key}/`, `${event.slug} go.${key}`);
}

/** The pages the guides of one event give for this one, paired by kind,
    in the order of the event's guides: its first guide, at /<event>/, is
    first and so is every page's x-default. `hreflang` pairs equivalent
    pages: a tickets page's equivalent is a tickets page, and a page with
    no equivalent names only itself. */
export function alternatesFor(page: GuidePage, guide: Guide) {
  return guides
    .filter((g) => g.event === guide.event)
    .map((g) => ({ g, p: g === guide ? page : g.pages.find((p) => p.kind === page.kind) }))
    .filter((x): x is { g: Guide; p: GuidePage } => !!x.p)
    .map(({ g, p }) => ({ lang: g.lang, href: pathOf(p), label: g.hubLabel, title: withoutSuffix(p.title) }));
}

/** The event's other guides, for the row a reader switches language by:
    each at the page that pairs with this one, or at its home when it has
    none. Named in their own language (hubLabel), never as an exonym. */
export function languagesFor(page: GuidePage, guide: Guide) {
  return guides
    .filter((g) => g.event === guide.event && g !== guide)
    .map((g) => {
      const p = g.pages.find((x) => x.kind === page.kind) ?? mainPage(g);
      return { lang: g.lang, dir: g.dir, href: pathOf(p), label: g.hubLabel, title: withoutSuffix(p.title) };
    });
}
