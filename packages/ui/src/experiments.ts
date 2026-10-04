// What a page carries for the A/B/n tests it is in — see
// @dst/content/experiments for the tests themselves and for why there are
// two kinds.
import { liveExperiments, variantOf, BUCKET_JS, type Experiment } from "@dst/content/experiments";

export interface PageExperiments {
  /** Decided per browser, in the pre-paint script. */
  visitor: Experiment[];
  /** Decided here, per page: the variant every reader and crawler gets. */
  page: { exp: Experiment; variant: string }[];
  /** What a test's markup should render, by id: a page test's variant, or
      "visitor" for markup that carries every variant and lets CSS choose.
      A test missing from here renders its decided variant. */
  assigned: Record<string, string>;
}

/** The tests live on this page. `key` is what a page test splits on, and is
    the same for a page in every language — so the twins of one page never
    disagree about which variant they are. */
export function pageExperiments(host: string, path: string, key: string, today: string): PageExperiments {
  const live = liveExperiments(host, path, today);
  const visitor = live.filter((e) => e.unit === "visitor");
  const page = live.filter((e) => e.unit === "page").map((exp) => ({ exp, variant: variantOf(exp, key, today) }));
  return {
    visitor,
    page,
    assigned: Object.fromEntries([
      ...visitor.map((e) => [e.id, "visitor"]),
      ...page.map(({ exp, variant }) => [exp.id, variant]),
    ]),
  };
}

/** The pre-paint script. Picks a variant for each visitor test from an id
    kept in localStorage and writes it to <html> for the CSS below and for
    analytics. Inline and synchronous for the same reason the theme script
    is: anything later and the page paints one label, then another.

    No storage — a private window, blocked site data — and the visitor gets
    the control and no tag: an impression nobody can be counted against
    again is noise in the denominator. ?exp=id:variant forces a variant and
    is left out of data-experiments, so a look at a variant is never
    counted as a visit to it. */
export function visitorScript(tests: Experiment[]): string {
  const config = JSON.stringify(tests.map((e) => [e.id, e.variants, e.weights ?? null]));
  return `(() => {
  ${BUCKET_JS}
  var root = document.documentElement, tags = (root.getAttribute("data-experiments") || "").split(" ").filter(Boolean);
  var forced = {}, visitor = null;
  try { new URLSearchParams(location.search).getAll("exp").forEach(function (pair) { var at = pair.indexOf(":"); forced[pair.slice(0, at)] = pair.slice(at + 1); }); } catch (e) {}
  try {
    visitor = localStorage.getItem("exp:visitor");
    if (!visitor) { visitor = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem("exp:visitor", visitor); }
  } catch (e) { visitor = null; }
  ${config}.forEach(function (t) {
    var id = t[0], variants = t[1], v = forced[id];
    if (variants.indexOf(v) >= 0) { root.setAttribute("data-exp-" + id, v); return; }
    if (!visitor) return;
    v = bucket(id, variants, t[2], visitor);
    root.setAttribute("data-exp-" + id, v);
    tags.push(id + ":" + v);
  });
  if (tags.length) root.setAttribute("data-experiments", tags.join(" "));
})();`;
}

/** Every variant is in the HTML; this hides all but the chosen one, and all
    but the control when nothing was chosen — no JavaScript, no storage.
    The chosen variant keeps whatever display the page gave it. */
export function visitorCss(tests: Experiment[]): string {
  if (tests.length === 0) return "";
  return tests
    .flatMap((e) => {
      const all = `[data-variant^="${e.id}:"]`;
      return [
        `html:not([data-exp-${e.id}]) ${all}:not([data-variant="${e.id}:${e.variants[0]}"])`,
        ...e.variants.map((v) => `html[data-exp-${e.id}="${v}"] ${all}:not([data-variant="${e.id}:${v}"])`),
      ];
    })
    .join(",\n") + " { display: none !important; }";
}
