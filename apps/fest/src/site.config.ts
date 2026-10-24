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
// trail's "Trilha de navegação" after it; th with Wonderfruit (th-TH),
// passed by the th-TH native reader at gate 3 and on the executor's
// strings, every link to the English hub saying that it is English; fr
// with Igloofest (fr-CA), its strings the copy's chrome block and the
// fr-CA native reader's at gate 3 (swaps 2 and 3, fills 4). Its words are
// set as the OQLF sets French (copy.ts, oqlf), and test:fest holds each
// to it.

export type Lang = "en" | "es" | "pt" | "th" | "fr";

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
    // The hub is the root since 23 Oct 2026 (it was /festivals/ while the
    // archive of the old festival site kept /): the wordmark, the
    // breadcrumb root and the footer link all go there.
    homeHref: "/",
    homeLabel: "Festivals",
    footerLinks: [
      { href: "/", label: "All festival guides", title: "Every guide, each in its own language: dates, tickets and lineups" },
    ],
    publisher,
    networkFooter: false,
    partnerDisclosure: false,
    // The tag was off while the archive that shared the host blocked it by
    // its Content-Security-Policy. The host has been this app's alone since
    // 23 Oct 2026 and sends no such header, so the site is measured like
    // the other independent ones (the non-DST property; user's word,
    // 24 Oct 2026). Every language row says the same.
    analytics: true,
    // The look of the archive's front page the guides were built beside.
    // The toggle and a light palette are there for the reader in the sun.
    defaultTheme: "dark",
  },
  // The Spanish row, as en's but in Spanish. The hub stays English, so
  // homeHref still names it and only the words change.
  es: {
    siteName: "fest.one",
    footerSiteName: "fest.one",
    homeTitle: "Guías de festivales",
    titleSuffix: "guía del festival",
    keyword: "festival",
    lang: "es",
    homeHref: "/",
    homeLabel: "Festivales",
    footerLinks: [
      { href: "/", label: "Todas las guías de festivales", title: "Cada guía en su idioma: fechas, entradas y line-ups" },
    ],
    publisher,
    networkFooter: false,
    partnerDisclosure: false,
    analytics: true,
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
    homeHref: "/",
    homeLabel: "Festivais",
    footerLinks: [
      { href: "/", label: "Todos os guias de festivais", title: "Todos os guias de festival do fest.one" },
    ],
    publisher,
    networkFooter: false,
    partnerDisclosure: false,
    analytics: true,
    defaultTheme: "dark",
  },
  // Thai: "เทศกาล" the root crumb, the place a reader is in; its tooltip,
  // the wordmark's and the footer link's say that the hub they open is in
  // English (the approved chrome block, Wonderfruit's card).
  th: {
    siteName: "fest.one",
    footerSiteName: "fest.one",
    homeTitle: "รวมคู่มือเทศกาลทั้งหมดของ fest.one หน้านี้เป็นภาษาอังกฤษ",
    titleSuffix: "คู่มือเทศกาล",
    keyword: "เทศกาล",
    lang: "th-TH",
    homeHref: "/",
    homeLabel: "เทศกาล",
    footerLinks: [
      { href: "/", label: "คู่มือเทศกาลทั้งหมด", title: "รวมคู่มือทุกเทศกาลของ fest.one หน้านี้เป็นภาษาอังกฤษ" },
    ],
    publisher,
    networkFooter: false,
    partnerDisclosure: false,
    analytics: true,
    defaultTheme: "dark",
  },
  // Quebec French: the root crumb « Festivals », the wordmark's tooltip
  // the approved « Guides de festivals sur fest.one », and the footer
  // link's a sentence that says more than its label (the fr-CA native
  // reader's gate-3 swap 3).
  fr: {
    siteName: "fest.one",
    footerSiteName: "fest.one",
    homeTitle: "Guides de festivals sur fest.one",
    titleSuffix: "guide du festival",
    keyword: "festival",
    lang: "fr-CA",
    homeHref: "/",
    homeLabel: "Festivals",
    footerLinks: [
      { href: "/", label: "Guides de festivals", title: "Tous les guides de festivals sur fest.one, par événement et par langue" },
    ],
    publisher,
    networkFooter: false,
    partnerDisclosure: false,
    analytics: true,
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
  /** The words before the day a page last changed, where a guide prints
      that line (Guide.updatedLine): « Mis à jour le ». */
  updated?: string;
  /** A hop's own page, which a reader sees only when neither its refresh
      nor its script moves them on (pages/go/[slug].astro): the tab's
      title before the event's name, the sentence before the target's
      host, the link on to it and the link back to the guide. Where a row
      has none, the hop is Redirect's own English page, as Beyond The
      Valley's, Field Day's and every other non-French guide's hops print
      it byte for byte. */
  hop?: { title: string; leaving: string; go: string; back: string };
}> = {
  en: {
    rootCrumbTitle: "Every festival guide on fest.one, by event and language",
    siblingNav: "This guide",
    onThisPage: "On this page",
    llmsHeading: "fest.one festival guides",
    otherLanguages: "This guide in other languages",
    updated: "Updated",
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
  // A plain space between a page's label and the guide's name ("บัตร
  // Wonderfruit 2026"), as Thai sets one before a Latin word (the th-TH
  // native reader on the executor's strings).
  th: {
    rootCrumbTitle: "รวมคู่มือเทศกาลทั้งหมด หน้านี้เป็นภาษาอังกฤษ",
    siblingNav: "หน้าในคู่มือนี้",
    onThisPage: "ในหน้านี้",
    otherLanguages: "คู่มือนี้ในภาษาอื่น",
    breadcrumbs: "เส้นทางนำทาง",
    skip: "ข้ามไปยังเนื้อหา",
    menu: "เปิดเมนู",
  },
  // Quebec French. The skip link is Québec.ca's words and « Fil d'Ariane »
  // the OQLF's for a breadcrumb; « Sur cette page » is what Canada.ca and
  // Québec.ca set over a jump list (the native reader's gate-3 D7); the
  // row's label and the other-languages label are filled so that no page
  // falls back to English, though Igloofest's guide names its own row and
  // has no other language yet (fill 4). The hop's words are the copy's
  // chrome block.
  fr: {
    rootCrumbTitle: "Tous les guides de festivals sur fest.one, par événement et par langue",
    siblingNav: "Ce guide",
    onThisPage: "Sur cette page",
    llmsHeading: "Guides de festivals sur fest.one",
    otherLanguages: "Ce guide dans d'autres langues",
    breadcrumbs: "Fil d'Ariane",
    skip: "Aller au contenu",
    menu: "Ouvrir le menu",
    updated: "Mis à jour le",
    hop: { title: "Vous quittez fest.one — guide du festival", leaving: "Vous quittez fest.one pour", go: "Continuer", back: "Retour au guide" },
  },
};

// Every keyword in one place for tools/seo-check.mjs, which reads this file
// as text and picks the one matching each page's <html lang>.
export const keywords = { en: "festival", es: "festival", pt: "festival", th: "เทศกาล", fr: "festival" };
