import type { NewsItem } from "../types.ts";

export const items: NewsItem[] = [
  {
    slug: "bank-holiday-tube-and-tfl-closures",
    site: "lnd",
    title: "Which lines are shut over the bank holiday",
    summary:
      "The full list of London Underground and TfL closures over the August bank holiday weekend — engineering work lands hardest outside zone 1.",
    date: "2026-08-27",
    category: "Transport",
    source: {
      name: "MyLondon",
      url: "https://www.mylondon.news/news/transport/london-underground-tfl-lines-shut-34525472",
      verifiedOn: "2026-08-30",
    },
    body: [
      "TfL publishes its bank holiday closures a week ahead, and the August weekend is one of the heavier ones for engineering work.",
      "The pattern is the same every year and it is worth knowing if you live outside the centre: the closures cluster on the outer sections of the lines, because that is where the track is easiest to take out of service. A journey that is fine within zone 1 can be replaced by a bus for its last four stops.",
    ],
    expertise:
      "Check the closure list by section rather than by line. A line reported as \"running\" over a bank holiday is routinely running only across the middle of itself, which is precisely the part of it an outer-borough journey does not use.",
  },
  {
    slug: "olympic-park-summer-school",
    site: "lnd",
    title: "East Summer School returns to the Olympic Park",
    summary:
      "The free summer school at Queen Elizabeth Olympic Park is running again and looking for young Londoners to take part.",
    date: "2026-08-26",
    category: "Community",
    source: {
      name: "East London Advertiser",
      url: "https://www.eastlondonadvertiser.co.uk/news/26408418.east-summer-school-returning-queen-elizabeth-olympic-park/",
      verifiedOn: "2026-08-30",
    },
    body: [
      "East Summer School is returning to Queen Elizabeth Olympic Park and is looking for young Londoners to join it.",
      "The park sits across four boroughs — Newham, Tower Hamlets, Waltham Forest and Hackney — which is the reason a programme based there reaches an audience no single borough's own provision does.",
    ],
  },
];
