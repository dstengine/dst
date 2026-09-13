// The countries this site lists musicals in.
//
// Written out rather than derived from the cities, for two reasons. A slug
// is a decision — "uk" is what people type and "united-kingdom" is not —
// and a country page needs a sentence of its own that no city carries. The
// list is checked against the cities at build time, so a city in a country
// that is not here fails the build rather than falling off the page.
import type { Country } from "./types";

export const countries: Country[] = [
  {
    slug: "uk",
    short: "UK",
    name: "United Kingdom",
    in: "the United Kingdom",
    titleSeo: "Musicals in the UK: dates and tickets",
    summary:
      "Musicals in the United Kingdom: the West End run, the touring dates, which theatre in which city and who is selling. Every listing read from the production's own source.",
    intro: [
      "Two things happen here and they are not the same trade. London has open-ended runs — musicals that have been in one building for years and book their next season as they reach it. Everywhere else in the country gets a touring week: the show arrives on a Monday, plays six or seven nights, and leaves.",
      "That difference decides how you book. A London run will still be there next month, so the question is which night and which seat. A touring week is the only week that show is in that city, and when it is gone the next chance is usually another city.",
    ],
  },
  {
    slug: "ireland",
    short: "Ireland",
    name: "Ireland",
    in: "Ireland",
    titleSeo: "Musicals in Ireland: dates and tickets",
    summary:
      "Musicals in Ireland: what is touring, which theatre, which dates and who is selling. Every listing read from the production's own source.",
    intro: [
      "Irish dates on this site are tour stops rather than resident runs: a production that is working its way around Britain and Ireland, in a city for a week at a time. A stop that has not named its theatre yet is listed without one rather than with a guess.",
    ],
  },
  {
    slug: "uae",
    short: "UAE",
    name: "United Arab Emirates",
    in: "the United Arab Emirates",
    titleSeo: "Musicals in the UAE: dates and tickets",
    summary:
      "Musicals in the UAE: what is booked into Dubai, which venue, which dates and who is selling. Every listing read from the production's own source.",
    intro: [
      "The UAE gets musicals in short blocks — a handful of nights in a room built for concerts rather than a theatre run. One city on the whole region's calendar, which is why the dates sell the way they do.",
    ],
  },
  {
    slug: "usa",
    short: "USA",
    name: "United States",
    in: "the United States",
    titleSeo: "Musicals in the USA: dates and tickets",
    summary:
      "Musicals in the United States: the Broadway runs, which theatre, which dates and who is selling. Every listing read from the production's own source.",
    intro: [
      "Everything this site lists in the United States is on Broadway, in the theatre district between 44th and 51st Streets in New York. Most of it is open-ended: a run with an opening night and no announced last night.",
    ],
  },
  {
    slug: "japan",
    short: "Japan",
    name: "Japan",
    in: "Japan",
    titleSeo: "Musicals in Japan: dates and tickets",
    summary:
      "Musicals in Japan: what is touring, which theatre, which dates and who is selling. Every listing read from the production's own source.",
    intro: [
      "Japanese dates on this site are blocks of a touring production rather than resident runs — a fortnight in one house, then the next city.",
    ],
  },
];
