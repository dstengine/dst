// Every page of this site as plain Markdown, built from the same data the
// HTML is built from. It is served three ways — /llms.txt (the map),
// /llms-full.txt (everything in one file) and /<page>.md (one page) — and
// all three call the functions below, so a fact cannot say one thing in a
// page and another in the file a model reads.
//
// The convention is llmstxt.org: a Markdown file at the root, "#" for the
// name, ">" for the summary, "##" sections listing pages as links.
import {
  checkedOn, cityBySlug, citiesWithPages, disclaimer, formatRun, groupBySlug, groups,
  milestones, nights, runsFor, runsInCity, runsInGroup, runsAtVenue, songs,
  shows, statusLabel, venueBySlug, venuePath, venues, venuesInCity,
  type City, type Clip, type Run, type RunGroup, type Section, type Show, type Venue,
} from "./content";
import { outbound } from "./outbound";

export const SITE = "https://musical.today";
export const abs = (path: string) => `${SITE}${path}`;

/** Prose, with the blank line Markdown needs between paragraphs. */
const paras = (list: string[]) => list.flatMap((text) => [text, ""]);

const line = (label: string, value: string | undefined) => (value ? `- ${label}: ${value}` : undefined);
// Only a missing line disappears; an empty string is a deliberate blank line
// between blocks, and Markdown needs it.
const join = (parts: (string | undefined)[]) => parts.filter((p) => p !== undefined).join("\n");

/** Where a seller's link actually goes. A model reading this should be able
    to name the seller and reach it without following our redirect. */
const sellerLine = (run: Run) =>
  run.sellers.length === 0
    ? "- Tickets: no seller listed yet"
    : `- Tickets: ${run.sellers.map((s) => `${s.name}${s.official ? " (the production's own seller)" : ""} — ${outbound[s.slug] ?? ""}`).join("; ")}`;

export function runMarkdown(show: Show, run: Run): string {
  const city = cityBySlug(run.city);
  const venue = run.venue ? venueBySlug(run.venue) : undefined;
  const group = run.group ? groupBySlug(run.group) : undefined;
  const n = nights(run);
  return join([
    `# ${show.title} in ${city?.name ?? run.city}`,
    "",
    `> ${run.summary ?? `${formatRun(run)}${venue ? ` at ${venue.name}` : ""}.`}`,
    "",
    line("Dates", formatRun(run)),
    line("Status", statusLabel(run)),
    line("Length", n ? (n === 1 ? "one night" : `${n} days`) : undefined),
    line("Venue", venue ? `${venue.name}${venue.address ? `, ${venue.address}` : ""}` : "not announced"),
    line("City", city ? `${city.name}, ${city.country}` : run.city),
    line("Part of", group?.name),
    sellerLine(run),
    line("Running time", run.runningTime),
    line("Language", run.language),
    line("Age guidance", run.ageGuidance),
    line("Page", abs(`/${show.slug}/${run.slug}/`)),
    line("Calendar file", run.start && !run.openRun ? abs(`/${show.slug}/${run.slug}.ics`) : undefined),
    line("Last checked", checkedOn),
  ]);
}

export function venueMarkdown(venue: Venue): string {
  const city = cityBySlug(venue.city);
  const here = runsAtVenue(venue.slug);
  return join([
    `# ${venue.name}`,
    "",
    venue.summary ? `> ${venue.summary}` : `> Theatre in ${city?.name ?? venue.city}.`,
    "",
    line("City", city ? `${city.name}, ${city.country}` : venue.city),
    line("Address", venue.address),
    line("Coordinates", venue.lat && venue.lon ? `${venue.lat}, ${venue.lon}` : undefined),
    line("Capacity", venue.capacity ? `${venue.capacity.toLocaleString("en-GB")}` : undefined),
    line("Opened", venue.opened),
    line("Operator", venue.operator),
    line("Owner", venue.owner),
    line("Getting there", venue.transit),
    line("Official site", venue.officialSlug ? outbound[venue.officialSlug] : undefined),
    line("Page", abs(venuePath(venue))),
    "",
    here.length > 0 ? "## What plays here" : undefined,
    ...here.map((run) => {
      const show = shows.find((s) => s.slug === run.show);
      return `- ${show?.title ?? run.show}: ${formatRun(run)} — ${abs(`/${run.show}/${run.slug}/`)}`;
    }),
    "",
    ...(venue.sections ?? []).flatMap((section) => [
      section.heading ? `## ${section.heading}` : undefined,
      ...paras(section.paragraphs),
    ]),
    line("Last checked", checkedOn),
  ]);
}

export function cityMarkdown(city: City): string {
  const here = runsInCity(city.slug);
  return join([
    `# Musicals in ${city.name}`,
    "",
    city.summary ? `> ${city.summary}` : `> What is on in ${city.name}, ${city.country}.`,
    "",
    "## On sale",
    ...here.map((run) => {
      const show = shows.find((s) => s.slug === run.show);
      return `- ${show?.title ?? run.show}: ${formatRun(run)}, ${statusLabel(run)} — ${abs(`/${run.show}/${run.slug}/`)}`;
    }),
    "",
    venuesInCity(city.slug).length > 0 ? "## Venues" : undefined,
    ...venuesInCity(city.slug).map((v) => `- ${v.name}${v.address ? `, ${v.address}` : ""} — ${abs(venuePath(v))}`),
    "",
    line("Page", abs(`/${city.slug}/`)),
    line("Last checked", checkedOn),
  ]);
}

export function groupMarkdown(show: Show, group: RunGroup): string {
  const stops = runsInGroup(group.slug).sort((a, b) => (a.start ?? "").localeCompare(b.start ?? ""));
  return join([
    `# ${group.title}`,
    "",
    `> ${group.blurb}`,
    "",
    ...paras(group.body),
    "## Stops",
    ...stops.map((run) => {
      const city = cityBySlug(run.city)?.name ?? run.city;
      const venue = run.venue ? venueBySlug(run.venue)?.name : "venue not announced";
      return `- ${city}: ${venue}, ${formatRun(run)}, ${statusLabel(run)} — ${abs(`/${show.slug}/${run.slug}/`)}`;
    }),
    "",
    line("Page", abs(`/${show.slug}/${group.slug}/`)),
    line("Last checked", checkedOn),
  ]);
}

export function sectionMarkdown(show: Show, section: Section): string {
  const extra =
    section.template === "history"
      ? ["", "## Timeline", ...milestones.map((m) => `- ${m.date} — ${m.title}. ${m.text}`)]
      : section.template === "online"
        ? ["", "## Clips", ...(show.clips ?? []).map((c) => `- ${c.title} (${c.channel}): https://www.youtube.com/watch?v=${c.id} — ${abs(`/${show.slug}/online/${c.slug}/`)}`)]
        : section.template === "songs"
        ? ["", "## Running order", ...songs.map((s) => `- Act ${s.act}: ${s.title} — ${s.sungBy}${s.note ? `. ${s.note}` : ""}`)]
      : section.template === "tickets"
          ? ["", "## Every run", ...runsFor(show.slug).map((r) => `- ${cityBySlug(r.city)?.name ?? r.city}: ${formatRun(r)}, ${statusLabel(r)} — ${abs(`/${show.slug}/${r.slug}/`)}`)]
          : [];
  return join([
    `# ${section.title}`,
    "",
    `> ${section.description}`,
    "",
    ...paras(section.body),
    ...extra,
    "",
    line("Page", abs(`/${show.slug}/${section.slug}/`)),
    line("Last checked", checkedOn),
  ]);
}

export function clipMarkdown(show: Show, clip: Clip): string {
  return join([
    `# ${clip.title}`,
    "",
    clip.note ? `> ${clip.note}` : undefined,
    "",
    ...paras(clip.body ?? []),
    line("Watch", `https://www.youtube.com/watch?v=${clip.id}`),
    line("Channel", clip.channel),
    line("Embedding checked", clip.checkedOn),
    line("Page", abs(`/${show.slug}/online/${clip.slug}/`)),
  ]);
}

export function showMarkdown(show: Show): string {
  return join([
    `# ${show.title}`,
    "",
    `> ${show.tagline}`,
    "",
    ...paras(show.hook),
    "## Where it plays",
    ...runsFor(show.slug).map((run) => {
      const city = cityBySlug(run.city)?.name ?? run.city;
      return `- ${city}: ${formatRun(run)}, ${statusLabel(run)} — ${abs(`/${show.slug}/${run.slug}/`)}`;
    }),
    "",
    "## Sections",
    ...show.sections.map((s) => `- ${s.label}: ${s.description} — ${abs(`/${show.slug}/${s.slug}/`)}`),
    ...groups
      .filter((g) => runsFor(show.slug).some((r) => r.group === g.slug))
      .map((g) => `- ${g.name}: ${g.blurb} — ${abs(`/${show.slug}/${g.slug}/`)}`),
    "",
    line("Last checked", checkedOn),
  ]);
}

/** Every page this site publishes, with the Markdown behind it. One list,
    used by /llms.txt, /llms-full.txt and the .md endpoint — so a page cannot
    exist in one of them and be missing from another. */
export interface Doc {
  path: string;
  title: string;
  summary: string;
  markdown: string;
  group: string;
}

export function docs(): Doc[] {
  const out: Doc[] = [];
  for (const city of citiesWithPages()) {
    out.push({
      path: `/${city.slug}/`,
      title: `Musicals in ${city.name}`,
      summary: city.summary ?? `What is on in ${city.name}.`,
      markdown: cityMarkdown(city),
      group: "Cities",
    });
  }
  for (const show of shows) {
    out.push({
      path: `/${show.slug}/`,
      title: show.title,
      summary: show.tagline,
      markdown: showMarkdown(show),
      group: show.title,
    });
    for (const section of show.sections) {
      out.push({
        path: `/${show.slug}/${section.slug}/`,
        title: section.title,
        summary: section.description,
        markdown: sectionMarkdown(show, section),
        group: show.title,
      });
    }
    for (const group of groups.filter((g) => runsFor(show.slug).some((r) => r.group === g.slug))) {
      out.push({
        path: `/${show.slug}/${group.slug}/`,
        title: group.title,
        summary: group.blurb,
        markdown: groupMarkdown(show, group),
        group: show.title,
      });
    }
    for (const run of runsFor(show.slug)) {
      const city = cityBySlug(run.city)?.name ?? run.city;
      out.push({
        path: `/${show.slug}/${run.slug}/`,
        title: `${show.title} in ${city}`,
        summary: `${formatRun(run)}. ${statusLabel(run)}.`,
        markdown: runMarkdown(show, run),
        group: `${show.title}: runs`,
      });
    }
    for (const clip of show.clips ?? []) {
      out.push({
        path: `/${show.slug}/online/${clip.slug}/`,
        title: clip.title,
        summary: clip.note ?? `${clip.title}, from ${show.title}.`,
        markdown: clipMarkdown(show, clip),
        group: `${show.title}: online`,
      });
    }
  }
  for (const venue of venues) {
    out.push({
      path: venuePath(venue),
      title: venue.name,
      summary: venue.summary ?? `${venue.name}${venue.address ? `, ${venue.address}` : ""}.`,
      markdown: venueMarkdown(venue),
      group: "Venues",
    });
  }
  return out;
}

/** The site's own description, said once. Both llms files open with it. */
export const preamble = [
  "# musical.today — musicals, city by city",
  "",
  `> Every run of every musical this site tracks: the theatre, the dates, and who is actually selling the tickets. ${runsFor("chicago").length} runs across ${venues.length} venues, each read from the production's own source and stamped with the day it was read. ${disclaimer}`,
  "",
  "How to read this site, which matters when quoting it:",
  "- A run is listed with what its source publishes and nothing else. \"Not announced\" means the producer has not said, not that we failed to find out.",
  "- A run with dates but no seller is listed as announced rather than left out or pointed at a resale site.",
  "- Every ticket link names its seller, and leaves through /go/<slug>/, which is noindex and disallowed in robots.txt.",
  "- Video is embedded only where the uploader allows embedding, checked through YouTube's oEmbed endpoint.",
  `- Listings were last read on ${checkedOn}.`,
  "",
  "Every page below is also available as Markdown at the same address with `.md` appended: https://musical.today/chicago/dubai.md",
].join("\n");
