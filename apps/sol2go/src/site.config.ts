// What this site calls itself. Everything here is identity: the same on
// every page, and the part a new site has to get right before anything
// else. It lives outside Layout.astro because that file is a template, and
// a template gets copied — these strings are exactly the part of a copy
// that must not survive it.
import { publisher } from "./content";

export const site = {
  siteName: "sol2go.lol",
  // Nobody searches for "sol2go", so the suffix — the most expensive
  // sixty characters on the page — went to a name that taught a reader
  // nothing. A brand belongs in a title once it is one; until then the
  // slot is worth more as the word the site is actually about.
  titleSuffix: "Solana events",
  // What this site is for, in one word, for tools/seo-check.mjs: the
  // thing that has to appear in the title, the h1 and the description of
  // every page a reader could arrive on from a search.
  keyword: "Solana",
  lang: "en",
  publisher,
  // Independent of the DST group and of the other .lol sites: no footer
  // link to the network, and the group's partner disclosure is not this
  // site's to make.
  networkFooter: false,
  partnerDisclosure: false,
  footerLinks: [{ href: "/about/", label: "About" }],
  // A tip jar, and the only place on the site that asks for anything. The
  // heading is a pun and stays as written: the tokens going one way are the
  // chain's, the ones coming back are the model's.
  donate: {
    heading: "Donate some tokens for some tokens",
    addresses: [
      { chain: "Solana", address: "AExkP1sv4Ngx2GhJjLXv6392Yr14YPDvW7Pd6F2CBn5n" },
      { chain: "Tron", address: "TECFRdhJibvFxvJncm8oHYcRFH7EWF4DtP" },
      { chain: "Ton", address: "UQBDdwEHADNgrj2jP9bsXjBK-5J-L8TYmAl_fOEVqQAj7Hts" },
      { chain: "Ethereum", address: "0xa2Fe6fe5208a0aC9AEb287fFEcEa7A0ef277D0f9" },
      { chain: "BTC", address: "bc1qgl8x7hp4fsptfzcpvtaau0d6umhuaacsc8pl2y" },
    ],
  },
};
