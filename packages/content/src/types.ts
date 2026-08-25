// Shared shape for every site's news/events feed. A separate workspace
// package rather than living in @dst/ui or an app, because dst.llc's hub
// aggregates every vertical's feed and cross-importing between apps/*
// would break each app's isolated Vercel build (own Root Directory per app).

export interface Source {
  name: string; // rendered as plain text
  url: string; // audit trail only — never rendered
  verifiedOn?: string; // ISO date the claim was last checked against the source; rendered
}

// Whether a picture is evidence or an impression. Property listings across
// this market routinely present renders as photographs; saying which is
// which costs nothing and is the whole difference between the two.
export type ImageKind = "photo" | "illustration" | "render";

// Maps onto @dst/ui/VentureGrid.astro's VentureCardItem.
export interface RelatedCard {
  href: string;
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
}

export interface Geo {
  name: string;
  lat: number;
  lng: number;
  mapUrl?: string;
}

// Title/description/label live here, not derived from the item's own
// title — a lead form asks its own question, not a rephrasing of the
// headline above it.
export interface ItemForm {
  title?: string;
  description?: string;
  submitLabel?: string;
  meta?: Record<string, string>; // -> lead.meta.* via LeadForm's slot
}

interface ItemBase {
  slug: string;
  site: string;
  title: string;
  summary: string; // list blurb + meta description
  body?: string[]; // absent -> no detail page (rule 7)
  source?: Source;
  category?: string;
  image?: string;
  imageAlt?: string;
  imageKind?: ImageKind; // absent -> no claim is made either way
  imageCredit?: string; // who made or supplied it
  related?: RelatedCard[];
  geo?: Geo;
  form?: ItemForm;
  expertise?: string;
  jsonLd?: Record<string, unknown>; // manual override of the auto-built block
}

export interface NewsItem extends ItemBase {
  date: string; // ISO "YYYY-MM-DD"
}

export interface EventItem extends ItemBase {
  start: string; // ISO "YYYY-MM-DD"
  end?: string;
  venue?: string;
  city?: string;
  organizer?: string;
  ticket?: { url: string; label?: string }; // -> /go/<slug>/, visible button
}
