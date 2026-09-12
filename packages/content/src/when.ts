// When an event is over, as one question with one answer.
//
// It is not the day it started. A run of dates is one event with a first
// day and a last one, and an entry that began yesterday and ends in three
// weeks is on — which the network spent a while telling readers otherwise:
// the feed split its two groups on `start`, so the whole of NYC Broadway
// Week sat under "Past" for the nine days it was actually running, next to
// a month-long Thames festival and a coffee festival that had two days
// left. Twelve entries on the day this was written.
//
// `end` is optional, and absent means a single day — so the last day is
// `end ?? start` and the comparison is against the last day, never the
// first. Both are plain ISO "YYYY-MM-DD", which compares correctly as a
// string; there is no Date involved and no timezone to get wrong.
//
// `today` is passed in rather than read here, because a component that
// renders a feed has already taken the date once and two calls either side
// of midnight would disagree with each other on the same page.
import type { EventItem } from "./types.ts";

type Dated = Pick<EventItem, "start" | "end">;

/** The last day an event is on. */
export const lastDay = (event: Dated): string => event.end ?? event.start;

/** Over, as of `today` (ISO "YYYY-MM-DD"). */
export const hasEnded = (event: Dated, today: string): boolean => lastDay(event) < today;

/** Still to come or on right now. The complement of `hasEnded`. */
export const isOn = (event: Dated, today: string): boolean => !hasEnded(event, today);
