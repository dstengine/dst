// Every event file, and nothing else: the one place an event is named.
// A new event is one import and one spread here; a second language of an
// event already listed is an entry in that event's `guides`, never a file.
import type { FestEvent, Guide } from "../types";
import * as beyondTheValley from "./beyond-the-valley";

const files = [beyondTheValley];

export const events: FestEvent[] = files.flatMap((f) => f.events);
export const guides: Guide[] = files.flatMap((f) => f.guides);
