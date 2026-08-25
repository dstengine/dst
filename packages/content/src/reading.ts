import type { NewsItem, EventItem } from "./types.ts";

// 200 words per minute — the low end of the usual 200–250 range for adult
// silent reading of non-fiction. Erring slow means the estimate reads as a
// promise kept rather than one missed.
const WORDS_PER_MINUTE = 200;

const words = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

/**
 * Minutes to read an item's own prose. Counts everything the reader
 * actually reads through — body, the expertise note, and an outcome where
 * one exists — but not the summary, which is a repeat of the opening.
 */
export function readingMinutes(item: NewsItem | EventItem): number {
  const parts = [...(item.body ?? []), ...((item as EventItem).outcome ?? [])];
  if (item.expertise) parts.push(item.expertise);
  const total = parts.reduce((sum, part) => sum + words(part), 0);
  if (total === 0) return 0;
  return Math.max(1, Math.round(total / WORDS_PER_MINUTE));
}
