// /new-years-eve/: the festivals with an English guide here whose edition
// runs over New Year, one card each, the hub's cards (rules.ts, hubCard).
// Not a tag: which guides belong is read from their editions' dates, so a
// guide cannot be on the page while its edition says otherwise, and no data
// file carries a field for it.
//
// An edition belongs when it runs over the night of 31 December or on
// 1 January, local dates as the data gives them: Beyond The Valley camps
// through the night, Zamna Tulum's season opens with it, and Field Day is
// New Year's Day itself, noon to 11pm. So the page's own words say "over
// New Year" and promise no midnight; the title and the description keep
// "New Year's Eve", the phrase that is searched, and say which is which.
// From July a build is about the coming New Year, before that about the
// one just gone, and a season with no copy below keeps the latest that has
// one: the page names a year, and its cards say when an edition ended.
//
// English only, as the hub is, and so is the line it puts on a guide: a
// guide in another language is never a member, and an event in two
// languages has its English guide's card, with the other language as its
// last chip.
//
// The words are written for the guides they name. When the data's members
// and the copy's part (an edition moved, an English guide added), the page
// goes out of the index and nothing links to it, rather than a description
// listing festivals the page doesn't show, and the build goes on: the
// suite (tests/fest.test.js) is what fails, so the copy is rewritten.
import { lastDay } from "@dst/content/when";
import { events, guides } from "./data/events/index";
import type { Guide } from "./data/types";
import { hubOrder } from "./rules";

export const NYE_PATH = "/new-years-eve/";

interface NyeCopy {
  /** The events on the page, in any order: the page is indexed and linked
      only while the data gives these and no others. */
  events: string[];
  title: string;
  description: string;
  h1: string;
  intro: string;
  /** Over the cards. */
  heading: string;
  /** The line on the hub and on each member's guide, in parts, so
      no space between two expressions can be lost in a template. */
  line: { before: string; label: string; after: string };
}

const COPY: Record<number, NyeCopy> = {
  2026: {
    events: ["beyond-the-valley", "zamna-tulum", "field-day"],
    title: "New Year's Eve festivals 2026/27: three festival guides",
    description:
      "New Year's Eve festivals 2026/27: Beyond The Valley in Victoria from 28 December, Zamna Tulum from 31 December and Field Day in Sydney on New Year's Day.",
    h1: "Festivals over New Year",
    intro:
      "Three festivals with a full guide here run over New Year 2026/27: Beyond The Valley camps through the night of 31 December in Victoria, Zamna Tulum opens its season with it in Tulum, and Field Day takes New Year's Day in Sydney. Each guide has the dates, ticket prices, the lineup and how to get there, every figure dated and its source named.",
    heading: "Three festivals over New Year 2026/27",
    line: { before: "Over New Year at a festival: ", label: "the festivals over New Year 2026/27", after: "." },
  },
};

/** The New Year a build on `day` is about: the coming one from July, the
    one just gone before, and of those with copy the latest not after it. */
export function nyeYear(day: string): number {
  const y = Number(day.slice(0, 4));
  const target = day.slice(5) >= "07-01" ? y : y - 1;
  const years = Object.keys(COPY).map(Number).filter((k) => k <= target).sort((a, b) => b - a);
  return years[0] ?? Math.min(...Object.keys(COPY).map(Number));
}

/** Whether an edition runs over the night of 31 December `year` or on
    1 January after it, by the local dates the data gives. */
export function overNewYear(edition: { start: string; end?: string }, year: number): boolean {
  return edition.start.slice(0, 10) <= `${year + 1}-01-01` && lastDay(edition) >= `${year}-12-31`;
}

export interface Nye extends NyeCopy {
  path: string;
  year: number;
  /** One English guide per event, in hubOrder. */
  guides: Guide[];
  /** The data's members are the copy's: false takes the page out of the
      index and its line off the hub and the guides. */
  current: boolean;
}

/** The page for a build on `day`, checked against the data. */
export function nye(day: string): Nye {
  const year = nyeYear(day);
  const copy = COPY[year];
  const english = (slug: string) => guides.find((g) => g.event === slug && /^en\b/.test(g.lang));
  const members = hubOrder(
    events.filter((e) => overNewYear(e.edition, year)).map((e) => english(e.slug)).filter((g): g is Guide => !!g),
    events,
    day,
  );
  const sorted = (xs: string[]) => [...xs].sort().join();
  const current = sorted(members.map((g) => g.event)) === sorted(copy.events);
  return { ...copy, path: NYE_PATH, year, guides: members, current };
}

/** The event's guides other than the page's card, in data order: Zamna
    Tulum's Spanish guide, as the last chip of its English card. */
export const othersOf = (guide: Guide): Guide[] => guides.filter((g) => g.event === guide.event && g !== guide);

/** Whether this guide's main page carries the line to the page. */
export const linksNye = (guide: Guide, day: string): boolean => {
  const page = nye(day);
  return page.current && page.guides.includes(guide);
};

