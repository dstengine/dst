// The tea calendar: the daily tea times and the days of the year that exist
// to be marked with a cup. Each one counts down on the page and can go into
// a calendar with a reminder — see pages/schedule/[slug].ics.ts.
//
// Daily times are wall-clock times in the reader's own zone, on purpose:
// afternoon tea is at four wherever you happen to be, so the page reads the
// reader's clock rather than London's. Tea days are dates, and run from the
// reader's midnight to the next.

/** How a moment comes round again. */
export type Recurrence =
  /** Every day at this local time, "HH:MM". */
  | { daily: string }
  /** Every year on this date, "MM-DD". */
  | { yearly: string }
  /** Every year on the nth given weekday of a month; nth -1 is the last.
      weekday is 0 for Sunday, as Date#getDay counts it. */
  | { month: number; weekday: number; nth: number }
  /** Dates that follow no rule a calendar can express, "YYYY-MM-DD". */
  | { dates: string[] };

export interface Moment {
  slug: string;
  name: string;
  recurs: Recurrence;
  /** Under the name, where the countdown cannot say it: "Every day at 11:00". */
  when: string;
  /** Who keeps it, when it is anyone's in particular. */
  origin?: string;
  text: string;
  /** A guide on this site that goes with it. `about` when the guide is the
      page about this tea time rather than good reading beside it — that page
      then counts down to it too. */
  guide?: { slug: string; label: string; about?: true };
}

export const moments: Moment[] = [
  {
    slug: "early-morning-tea",
    name: "Early morning tea",
    recurs: { daily: "07:00" },
    when: "Every day at 07:00, your time",
    text: "A cup in bed before the day is allowed to begin. In grander houses it arrived on a tray; for the rest of the country there was the Teasmade, an alarm clock with a kettle attached, which is about as British an invention as exists.",
  },
  {
    slug: "breakfast-tea",
    name: "Breakfast tea",
    recurs: { daily: "08:00" },
    when: "Every day at 08:00, your time",
    text: "The first pot of the day: strong, black and nearly always with milk. A blend of Assam, Ceylon and Kenyan leaf is the usual thing, brewed long enough to stand a spoon in, or very nearly.",
    guide: { slug: "how-to-make-a-proper-cup-of-tea", label: "How to make a proper cup of tea" },
  },
  {
    slug: "elevenses",
    name: "Elevenses",
    recurs: { daily: "11:00" },
    when: "Every day at 11:00, your time",
    text: "A cup and a biscuit at eleven: the mid-morning pause the British have kept long enough to give it a name. The biscuit is, strictly speaking, optional. Nobody has ever treated it as such.",
  },
  {
    slug: "afternoon-tea",
    name: "Afternoon tea",
    recurs: { daily: "16:00" },
    when: "Every day at 16:00, your time",
    text: "Tea, sandwiches, scones and cake at four. The custom is credited to Anna, Duchess of Bedford, who around 1840 found the gap between luncheon and a dinner that had drifted towards nine o'clock a little long, and did something about it.",
    guide: { slug: "afternoon-tea-vs-high-tea", label: "Afternoon tea or high tea?", about: true },
  },
  {
    slug: "four-twenty-high-tea",
    name: "4:20 High Tea",
    recurs: { daily: "16:20" },
    when: "Every day at 16:20, your time",
    text: "A second pot at twenty past four, for those who find the hour amusing. Proper high tea is not until six; this one is merely elevated.",
    guide: { slug: "the-story-of-4-20-high-tea", label: "The tale of 4:20 High Tea", about: true },
  },
  {
    slug: "high-tea",
    name: "High tea",
    recurs: { daily: "18:00" },
    when: "Every day at 18:00, your time",
    text: "The original high tea was a working family's evening meal: meat or a pie, bread and butter, and a strong pot to wash it down, on the table at about six. It has nothing whatever to do with cake stands, whatever the hotel brochures say.",
    guide: { slug: "afternoon-tea-vs-high-tea", label: "Afternoon tea or high tea?", about: true },
  },
  {
    slug: "bedtime-cuppa",
    name: "Bedtime cuppa",
    recurs: { daily: "21:30" },
    when: "Every day at 21:30, your time",
    text: "The last cup of the day, usually with a biscuit and quite often in a mug that does not match anything. Something gentler than the breakfast pot is wise at this hour: a white tea, or a cup that has not seen a tea plant at all.",
    guide: { slug: "how-to-brew-white-tea", label: "How to brew white tea" },
  },
  {
    slug: "national-hot-tea-day",
    name: "National Hot Tea Day",
    recurs: { yearly: "01-12" },
    when: "12 January, every year",
    origin: "United States — the Tea Council of the USA",
    text: "America's day for drinking its tea hot, which it otherwise mostly takes over ice. Set by the Tea Council of the USA in the middle of January, when the argument makes itself.",
  },
  {
    slug: "national-tea-day",
    name: "National Tea Day",
    recurs: { yearly: "04-21" },
    when: "21 April, every year",
    origin: "United Kingdom",
    text: "Britain's own tea day, kept since the mid-2010s on 21 April, which was also the late Queen's birthday. Tea rooms mark it; so, quietly, does everyone else.",
    guide: { slug: "how-to-make-a-proper-cup-of-tea", label: "How to make a proper cup of tea" },
  },
  {
    slug: "hachiju-hachiya",
    name: "Hachijū-hachiya, the 88th night",
    // The 88th day counted from risshun, the first day of spring in the old
    // Japanese calendar. Risshun moves, so this is a list of dates rather
    // than a rule — and a list that has to be extended by hand.
    recurs: { dates: ["2027-05-02", "2028-05-01"] },
    when: "Around 2 May — the 88th day of spring",
    origin: "Japan",
    text: "The 88th day after the first day of spring in the old Japanese calendar, and the traditional start of the shincha harvest: the first and most prized green tea of the year. Tea picked on this day is held to bring good health, and is sold as such.",
    guide: { slug: "how-to-brew-sencha", label: "How to brew sencha" },
  },
  {
    slug: "international-tea-day",
    name: "International Tea Day",
    recurs: { yearly: "05-21" },
    when: "21 May, every year",
    origin: "United Nations",
    text: "The UN's tea day, adopted by the General Assembly in December 2019 and first kept in 2020. May was chosen because it is the season of the best picking in most of the countries that grow tea.",
    guide: { slug: "how-to-brew-green-tea", label: "How to brew green tea" },
  },
  {
    slug: "national-iced-tea-day",
    name: "National Iced Tea Day",
    recurs: { yearly: "06-10" },
    when: "10 June, every year",
    origin: "United States",
    text: "The American summer's own tea day. The usual story sends iced tea's fame back to the St Louis World's Fair of 1904, where a heatwave persuaded a tea merchant to pour it over ice.",
  },
  {
    slug: "national-cream-tea-day",
    name: "National Cream Tea Day",
    recurs: { month: 6, weekday: 5, nth: -1 },
    when: "The last Friday of June",
    origin: "United Kingdom",
    text: "Scones, clotted cream, jam and a pot of tea, and the annual chance to settle whether the cream goes on first (Devon) or the jam (Cornwall). We shall not be taking sides.",
    guide: { slug: "afternoon-tea-vs-high-tea", label: "Afternoon tea or high tea?" },
  },
  {
    slug: "boston-tea-party",
    name: "The Boston Tea Party",
    recurs: { yearly: "12-16" },
    when: "16 December — the anniversary",
    origin: "Boston, 1773",
    text: "On the night of 16 December 1773 some 342 chests of the East India Company's tea went into Boston Harbour. It remains the most expensive cup never brewed, and a fine excuse to make a pot and drink it properly.",
    guide: { slug: "how-to-brew-black-tea", label: "How to brew black tea" },
  },
];
