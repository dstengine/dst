// Every event file, and nothing else: the one place an event is named.
// A new event is one import and one spread here; a second language of an
// event already listed is an entry in that event's `guides`, never a file.
import type { FestEvent, GoTarget, Guide } from "../types";
import { hopLanguages, isFrench, oqlf, typographed } from "../../copy";
import * as beyondTheValley from "./beyond-the-valley";
import * as fieldDay from "./field-day";
import * as creamfieldsChile from "./creamfields-chile";
import * as primaveraSoundSaoPaulo from "./primavera-sound-sao-paulo";
import * as wonderfruit from "./wonderfruit";
import * as zamnaTulum from "./zamna-tulum";
import * as igloofest from "./igloofest";

const files = [beyondTheValley, fieldDay, creamfieldsChile, primaveraSoundSaoPaulo, wonderfruit, zamnaTulum, igloofest];
const raw: Guide[] = files.flatMap((f) => f.guides);

// Each hop learns the language its `title` is written in: the first guide,
// in data order, that links it (copy.ts, hopLanguages). Its other guides
// read their own `titles` entry, and the hop's page speaks that language.
// A French guide's words are set as the OQLF sets French (copy.ts, oqlf)
// as they are loaded, and so are its hops' titles in French, which its
// links carry: `title` where the hop's language is French, each French
// entry of `titles`. The data keeps the copy as its reviewers read it, and
// every page, twin and hop prints the one typography. No other guide
// changes.
const loaded = (t: GoTarget, titleLang: string | undefined): GoTarget => ({
  ...t,
  title: titleLang !== undefined && isFrench(titleLang) ? oqlf(t.title) : t.title,
  ...(t.titles && { titles: Object.fromEntries(Object.entries(t.titles).map(([lang, title]) => [lang, isFrench(lang) ? oqlf(title) : title])) }),
  titleLang,
});
export const events: FestEvent[] = files
  .flatMap((f) => f.events)
  .map((e) => {
    const langs = hopLanguages(e, raw);
    return { ...e, go: Object.fromEntries(Object.entries(e.go).map(([k, t]) => [k, loaded(t, langs[k])])) };
  });
export const guides: Guide[] = raw.map((g) => (isFrench(g.lang) ? typographed(g) : g));
