// The entries the site is pushing hardest right now, linked straight from
// the front page and from the nav on every page, so that each sits one click
// from anywhere — the strongest internal link a page here can be given.
// Events and news alike, in this order. An event drops off by itself once
// its last date has gone; a news item stays until it is taken off this list.
//
// `label` is the nav's word for it: the name people type into search, the
// same in both languages. `icon` is its mark from @dst/ui/icons — its own,
// not its section's, or DevFest and Tech would sit side by side in the nav
// under one mark. `nav: false` keeps an entry to the spotlight: a bar night
// is the front page's lead for one evening, not a word in every page's menu.
import { isOn } from "@dst/content/when";
import { eventHref, newsHref } from "@dst/content/paths";
import type { EventItem, NewsItem } from "@dst/content/types";
import { eventsFor, newsFor, eventsBase, newsBase } from "./i18n";
import type { Lang } from "./content";

export const TOP = [
  { slug: "halloween-weekend-forty44-yerevan-2026", label: "Forty44", icon: "pumpkin", nav: false },
  { slug: "halloween-karaoke-ufo-bar-yerevan-2026", label: "UFO Bar", icon: "mic", nav: false },
  { slug: "devfest", label: "DevFest", icon: "laptop" },
  { slug: "snoop-dogg", label: "Snoop Dogg", icon: "mic", nav: false },
];

type Top = { label: string; icon: string; href: string; nav: boolean } & (
  | { kind: "event"; item: EventItem }
  | { kind: "news"; item: NewsItem }
);

const today = new Date().toISOString().slice(0, 10);

/** The entries of TOP still worth pushing, localized, with their addresses. */
export const topFor = (lang: Lang): Top[] =>
  TOP.flatMap(({ slug, label, icon, nav = true }): Top[] => {
    const e = eventsFor(lang).find((i) => i.slug === slug);
    if (e) return isOn(e, today) ? [{ kind: "event", item: e, href: eventHref(e, eventsBase(lang)), label, icon, nav }] : [];
    const n = newsFor(lang).find((i) => i.slug === slug);
    return n ? [{ kind: "news", item: n, href: newsHref(n, newsBase(lang)), label, icon, nav }] : [];
  });
