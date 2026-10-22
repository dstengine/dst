// Every event file, and nothing else: the one place an event is named.
// A new event is one import and one spread here; a second language of an
// event already listed is an entry in that event's `guides`, never a file.
import type { FestEvent, Guide } from "../types";
import { isFrench, oqlf, typographed } from "../../copy";
import * as beyondTheValley from "./beyond-the-valley";
import * as fieldDay from "./field-day";
import * as creamfieldsChile from "./creamfields-chile";
import * as primaveraSoundSaoPaulo from "./primavera-sound-sao-paulo";
import * as wonderfruit from "./wonderfruit";
import * as zamnaTulum from "./zamna-tulum";
import * as igloofest from "./igloofest";

const files = [beyondTheValley, fieldDay, creamfieldsChile, primaveraSoundSaoPaulo, wonderfruit, zamnaTulum, igloofest];

// A French guide's words are set as the OQLF sets French (copy.ts, oqlf)
// as they are loaded, and so are the titles of its event's hops, which its
// links carry: the data keeps the copy as its reviewers read it, and every
// page, twin and hop prints the one typography. No other guide changes.
const french = new Set(files.flatMap((f) => f.guides).filter((g) => isFrench(g.lang)).map((g) => g.event));
export const events: FestEvent[] = files
  .flatMap((f) => f.events)
  .map((e) => (french.has(e.slug) ? { ...e, go: Object.fromEntries(Object.entries(e.go).map(([k, t]) => [k, { ...t, title: oqlf(t.title) }])) } : e));
export const guides: Guide[] = files.flatMap((f) => f.guides).map((g) => (isFrench(g.lang) ? typographed(g) : g));
