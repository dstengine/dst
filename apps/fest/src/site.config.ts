// What this site calls itself, once per language. Everything here is
// identity: the same on every page of a language, and the part a new site
// has to get right before anything else. It lives outside Layout.astro
// because that file is a template, and a template gets copied.
//
// fest.one is one site in many languages, one guide per event and language.
// A language's row holds the chrome its pages say around a guide; the
// guide's own words, its page labels included, are the guide's (data/).
// es, pt and th rows come with the cards that ship those guides, each with
// its native reader: es with Creamfields Chile (es-CL), its strings passed
// by the es-CL native reader at gate 3, and written to serve an es-MX guide
// as they stand; pt with Primavera Sound São Paulo (pt-BR), passed by the
// pt-BR native reader at gate 3, the root crumb "Festivais" and the
// trail's "Trilha de navegação" after it.

export type Lang = "en" | "es" | "pt";

/** The row a guide's locale reads: "es-CL" and "es-MX" read `es`. A
    locale with no row throws, so a guide in a new language cannot build
    with another language's words around it. */
export function langOf(locale: string): Lang {
  const lang = locale.slice(0, 2).toLowerCase();
  if (!(lang in site)) throw new Error(`no row in site.config.ts for "${locale}"`);
  return lang as Lang;
}

const publisher = {
  id: "https://fest.one/#organization",
  name: "fest.one",
  url: "https://fest.one/",
  logo: { url: "https://fest.one/logo-mini.png", width: 512, height: 512 },
};

/** BaseLayout's props, spread by Layout.astro. */
export const site: Record<Lang, {
  siteName: string; footerSiteName: string; homeTitle: string; titleSuffix: string;
  keyword: string; lang: string; homeHref: string; homeLabel: string;
  footerLinks: { href: string; label: string; title: string }[];
  publisher: typeof publisher; networkFooter: boolean; partnerDisclosure: boolean;
  analytics: boolean; defaultTheme: "dark" | "light";
}> = {
  en: {
    siteName: "fest.one",
    footerSiteName: "fest.one",
    // The wordmark's tooltip. The name is not one anyone searches for yet,
    // so the slot says what the site is.
    homeTitle: "Festival guides: dates, tickets, lineups and how to get there",
    // Every guide title already carries "festival guide", so withSuffix
    // adds nothing to them; the hub's carries "Festival". The suffix is
    // here for a page that would not.
    titleSuffix: "festival guide",
    keyword: "festival",
    // The hub's language. A guide's pages carry the guide's own locale
    // (en-AU for Beyond The Valley), which Layout.astro puts over this.
    lang: "en",
    // The archive owns /, so the guides' home is the hub: the wordmark, the
    // breadcrumb root and the footer link all go there, and nothing here
    // links to /.
    homeHref: "/festivals/",
    homeLabel: "Festivals",
    footerLinks: [
      { href: "/festivals/", label: "All festival guides", title: "Every guide, each in its own language: dates, tickets and lineups" },
    ],
    publisher,
    networkFooter: false,
    partnerDisclosure: false,
    // The archive's Content-Security-Policy blocks the tag; Search Console
    // measures this site instead.
    analytics: false,
    // The look of the archive's front page the guides sit beside. The
    // toggle and a light palette are there for the reader in the sun.
    defaultTheme: "dark",
  },
  // The Spanish row, as en's but in Spanish. The hub stays English, so
  // homeHref still names /festivals/ and only the words change.
  es: {
    siteName: "fest.one",
    footerSiteName: "fest.one",
    homeTitle: "Guías de festivales",
    titleSuffix: "guía del festival",
    keyword: "festival",
    lang: "es",
    homeHref: "/festivals/",
    homeLabel: "Festivales",
    footerLinks: [
      { href: "/festivals/", label: "Todas las guías de festivales", title: "Cada guía en su idioma: fechas, entradas y line-ups" },
    ],
    publisher,
    networkFooter: false,
    partnerDisclosure: false,
    analytics: false,
    defaultTheme: "dark",
  },
  // Brazilian Portuguese, as en's but in Portuguese. The root crumb says
  // "Festivais", the place a reader is in, where "Todos os guias" read as a
  // button (the fest director's gate-3 condition 1); its tooltip, the
  // wordmark's and the footer link's say what the hub holds.
  pt: {
    siteName: "fest.one",
    footerSiteName: "fest.one",
    homeTitle: "Todos os guias de festival do fest.one",
    titleSuffix: "guia do festival",
    keyword: "festival",
    lang: "pt-BR",
    homeHref: "/festivals/",
    homeLabel: "Festivais",
    footerLinks: [
      { href: "/festivals/", label: "Todos os guias de festivais", title: "Todos os guias de festival do fest.one" },
    ],
    publisher,
    networkFooter: false,
    partnerDisclosure: false,
    analytics: false,
    defaultTheme: "dark",
  },
};

/** The words the guide template says itself, per language. */
export const chrome: Record<Lang, {
  /** The breadcrumb root's tooltip; its label is `homeLabel` above. */
  rootCrumbTitle: string;
  /** The `aria-label` of a guide's row of pages. */
  siblingNav: string;
  /** The heading over a page's jump list. */
  onThisPage: string;
  /** The hub's own head for its Markdown twin and llms.txt, which are
      English: only en's row is read. */
  llmsHeading?: string;
  /** The `aria-label` of the row of the guide's other languages. */
  otherLanguages: string;
  /** The trail's `aria-label`; "Breadcrumb", the shared default, where
      absent. */
  breadcrumbs?: string;
  /** The skip link's and the menu button's words, where BaseLayout's own
      table has no row for the language (it has none for pt). */
  skip?: string;
  menu?: string;
  /** What a screen reader hears between a page's label and the guide's
      name in the hub's row of pages, which a sighted reader does not see:
      " " where absent ("Tickets Beyond The Valley 2026/27"). */
  rowJoint?: string;
}> = {
  en: {
    rootCrumbTitle: "Every festival guide on fest.one, by event and language",
    siblingNav: "This guide",
    onThisPage: "On this page",
    llmsHeading: "fest.one festival guides",
    otherLanguages: "This guide in other languages",
  },
  es: {
    rootCrumbTitle: "Todas las guías de festivales",
    siblingNav: "Esta guía",
    onThisPage: "En esta página",
    llmsHeading: "Guías de festivales de fest.one",
    otherLanguages: "Esta guía en otros idiomas",
    breadcrumbs: "Ruta de navegación",
  },
  pt: {
    rootCrumbTitle: "Todos os guias de festival do fest.one",
    siblingNav: "Neste guia",
    onThisPage: "Nesta página",
    otherLanguages: "Este guia em outros idiomas",
    breadcrumbs: "Trilha de navegação",
    skip: "Pular para o conteúdo",
    menu: "Abrir menu",
    // "Ingressos do Primavera Sound São Paulo 2026": a festival's name takes
    // the article (the pt-BR native reader on the executor's strings, 22
    // Oct 2026).
    rowJoint: " do ",
  },
};

// Every keyword in one place for tools/seo-check.mjs, which reads this file
// as text and picks the one matching each page's <html lang>.
export const keywords = { en: "festival", es: "festival", pt: "festival" };
