// The header menu, per language. Out of Layout.astro so a page that draws
// a breadcrumb trail can name its home the way the menu does, without
// importing a layout to read a string off it.
import type { Lang } from "../content";

export interface NavLink { href: string; label: string; title: string; icon: string }

// An entry's title attribute is its search title, so the slot names the
// city rather than repeating the label.
export const NAV: Record<Lang, NavLink[]> = {
  hy: [
    { href: "/am/", label: "Ինչ կա", title: "Ինչ կա այսօր Երևանում", icon: "home" },
    { href: "/am/news/", label: "Նորություններ", title: "Երևանի նորությունները՝ աղբյուրով ամեն գրառման մոտ", icon: "news" },
    { href: "/am/events/", label: "Միջոցառումներ", title: "Օրացույցը՝ ամեն ամսաթիվ ստուգված կազմակերպչի մոտ", icon: "events" },
    { href: "/am/venues/", label: "Վայրեր", title: "Երևանի համերգասրահները, թատրոններն ու ակումբները՝ իրենց միջոցառումներով", icon: "building" },
    { href: "/am/yerevan-city-day/", label: "Երևանի օր", title: "Երևանի օրվա համերգներն ու միջոցառումները", icon: "star" },
    { href: "/am/about/", label: "Մեր մասին", title: "Ով է պատրաստում կայքը և ինչպես ենք ստուգում ամսաթվերը", icon: "id" },
  ],
  en: [
    { href: "/", label: "What's on", title: "What's on in Yerevan today", icon: "home" },
    { href: "/news/", label: "News", title: "Yerevan news, with a source on every item", icon: "news" },
    { href: "/events/", label: "Events", title: "The calendar: every date confirmed with the organiser", icon: "events" },
    { href: "/venues/", label: "Venues", title: "Yerevan's concert halls, theatres and clubs, with what's on at each", icon: "building" },
    { href: "/yerevan-city-day/", label: "Yerevan City Day", title: "Yerevan City Day concerts and events", icon: "star" },
    { href: "/about/", label: "About", title: "Who makes this site and how each date is checked", icon: "id" },
  ],
};
