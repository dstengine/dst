// The structured-data graph every page in the network emits.
//
// Until this existed, the only markup on the network described individual
// things — an event, a news item, an FAQ — and nothing said who published
// them. Seven hosts each looked like an unrelated site with no owner. The
// graph below fixes that: one Organization node, repeated verbatim on every
// page of every host under the same @id, so a search engine can merge them
// into a single entity; a WebSite node per host that names its publisher;
// a WebPage node for the page itself; and breadcrumbs, which a crawler
// otherwise has to guess from the URL.

/** The identifier for the company behind most of these hosts. */
export const ORGANIZATION_ID = "https://dst.llc/#organization";

/** Who publishes a site. Every host uses DST unless it passes its own —
    a site that is not being tied to the group has to be able to say so in
    its markup as well as in its footer, or the markup contradicts it. */
export interface Publisher {
  id: string;
  name: string;
  url: string;
  logo?: { url: string; width: number; height: number };
}

export const DST_PUBLISHER: Publisher = {
  id: ORGANIZATION_ID,
  name: "DST",
  url: "https://dst.llc/",
  logo: { url: "https://dst.llc/logo-mini.png", width: 512, height: 512 },
};

const organizationNode = (p: Publisher) => ({
  "@type": "Organization",
  "@id": p.id,
  name: p.name,
  url: p.url,
  ...(p.logo ? { logo: { "@type": "ImageObject", ...p.logo } } : {}),
});

export interface PageGraphInput {
  /** Origin of this host, e.g. "https://llc.dst.llc". */
  origin: string;
  siteName: string;
  /** Path of the current page, e.g. "/news/gitex-moves/". */
  pathname: string;
  canonical: string;
  title: string;
  description: string;
  /** Absolute URL of the page's share picture, when it has one. */
  image?: string;
  /** ISO date the page's content last changed. Omitted when unknown —
      a guessed date is worse than none, since it is a crawl signal. */
  dateModified?: string;
  /** Nav entries, used to label breadcrumb segments with the same words
      the site itself uses ("/zones/" -> "Free zones", not "Zones"). */
  nav?: { href: string; label: string }[];
  /** Defaults to DST. A host that publishes itself passes its own. */
  publisher?: Publisher;
  /** BCP 47 tag for the language the site is written in. Defaults to
      English, which is every DST host. A site written in another language
      has to say so here as well as in `<html lang>`, or the markup tells a
      crawler the opposite of what the page does. */
  lang?: string;
}

const websiteId = (origin: string) => `${origin}/#website`;

/** "free-zones" -> "Free zones", for a segment the nav doesn't name. */
function titleFromSlug(slug: string): string {
  const words = slug.replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** Page titles carry a site suffix ("Coffee — Azizi Riviera Guide"); a
    breadcrumb wants only the page's own name. */
const withoutSuffix = (title: string) => title.split(" — ")[0].trim();

function breadcrumbs(input: PageGraphInput) {
  const segments = input.pathname.split("/").filter(Boolean);
  if (segments.length === 0) return undefined;

  const navLabel = new Map(
    (input.nav ?? []).map((item) => [item.href.replace(/^\/+|\/+$/g, ""), item.label]),
  );

  const items = [{ name: input.siteName, item: `${input.origin}/` }];
  let path = "";
  segments.forEach((segment, i) => {
    path += `/${segment}`;
    const last = i === segments.length - 1;
    items.push({
      name: last ? withoutSuffix(input.title) : (navLabel.get(segment) ?? titleFromSlug(segment)),
      item: `${input.origin}${path}/`,
    });
  });

  return {
    "@type": "BreadcrumbList",
    "@id": `${input.canonical}#breadcrumb`,
    itemListElement: items.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

/** The graph for one page: organization, site, page, breadcrumbs. */
export function pageGraph(input: PageGraphInput): Record<string, unknown> {
  const crumbs = breadcrumbs(input);
  const publisher = input.publisher ?? DST_PUBLISHER;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(publisher),
      {
        "@type": "WebSite",
        "@id": websiteId(input.origin),
        name: input.siteName,
        url: `${input.origin}/`,
        inLanguage: input.lang ?? "en",
        publisher: { "@id": publisher.id },
        ...(input.origin === "https://dst.llc" || publisher.id !== ORGANIZATION_ID
          ? {}
          : { isPartOf: { "@id": websiteId("https://dst.llc") } }),
      },
      {
        "@type": "WebPage",
        "@id": `${input.canonical}#webpage`,
        url: input.canonical,
        name: input.title,
        description: input.description,
        isPartOf: { "@id": websiteId(input.origin) },
        ...(input.image ? { primaryImageOfPage: { "@type": "ImageObject", url: input.image } } : {}),
        ...(input.dateModified ? { dateModified: input.dateModified } : {}),
        ...(crumbs ? { breadcrumb: { "@id": crumbs["@id"] } } : {}),
      },
      ...(crumbs ? [crumbs] : []),
    ],
  };
}

/** What an Article or Event block on a page points at, so the item is tied
    to the same publisher and page as the graph above. */
export function itemContext(canonical: string, publisher: Publisher = DST_PUBLISHER) {
  return {
    publisher: { "@id": publisher.id },
    mainEntityOfPage: { "@id": `${canonical}#webpage` },
  };
}
