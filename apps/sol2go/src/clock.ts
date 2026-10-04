// How the epoch and unstake pages print time. Both count down to a moment
// estimated from the chain, so both say it the same way: a duration to the
// second, and the wall-clock time it lands on in the reader's own zone —
// the one they will actually look at their phone in.

const pad = (n: number) => String(n).padStart(2, "0");

/** "1 d 06 h 04 m 31 s", dropping the leading units that are zero. */
export function duration(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (d > 0) return `${d} d ${pad(h)} h ${pad(m)} m ${pad(sec)} s`;
  if (h > 0) return `${h} h ${pad(m)} m ${pad(sec)} s`;
  return `${m} m ${pad(sec)} s`;
}

/** "Tue 6 Oct, 14:32" in the reader's zone, with the zone named. */
export function wallClock(ms: number): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(ms);
}

export const isoMinute = (ms: number) => new Date(ms).toISOString().slice(0, 16) + "Z";

export const sol = (n: number) =>
  `${n.toLocaleString("en-GB", { maximumFractionDigits: n < 1 ? 6 : 3 })} SOL`;

export const short = (address: string) => `${address.slice(0, 4)}…${address.slice(-4)}`;
