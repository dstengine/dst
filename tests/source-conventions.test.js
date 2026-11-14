// Conventions the apps hold to in their source, not in their output. Every
// case here is a way one site can quietly stop being like the other sixteen
// — which matters because the whole network is edited as one thing: a block
// written once is expected to land everywhere, and it only does when the
// apps agree on where their own facts live.
//
//   node --test tests/source-conventions.test.js
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const APPS = readdirSync(path.join(REPO, "apps")).filter((a) =>
  existsSync(path.join(REPO, "apps", a, "src")),
);

/** Every .ts and .astro file under an app's src/. */
function sources(app) {
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const p = path.join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(ts|astro)$/.test(name)) out.push(p);
    }
  };
  walk(path.join(REPO, "apps", app, "src"));
  return out;
}

/** Every .ts, .astro and .md file we author, across the apps and the shared
    packages. Wider than sources() on purpose: a stray character is a
    property of the prose, and the prose is not only in apps/. */
function authored() {
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      if (name === "node_modules" || name === "dist") continue;
      const p = path.join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(ts|astro|md)$/.test(name)) out.push(p);
    }
  };
  for (const app of APPS) walk(path.join(REPO, "apps", app, "src"));
  for (const pkg of ["content", "ui"]) {
    const dir = path.join(REPO, "packages", pkg, "src");
    if (existsSync(dir)) walk(dir);
  }
  return out;
}

// Characters that take up no space on the page and so cannot be seen in the
// editor, the diff or the built site. They arrive by copy-paste from a web
// page or from a model's output, they survive every review, and they are
// what a reader who wants to argue that a page was not written by a person
// goes looking for. None of them has a job in our prose: a word joiner or a
// soft hyphen would be a typographic decision we have never taken, and the
// bidirectional controls are for text we do not publish.
//
// The visible spaces are a separate matter and stay legal — U+00A0 keeps a
// number with its unit and a dash with its clause, which is real Spanish and
// German typography and is used deliberately. The narrow and thin ones are
// listed here anyway: they look like an ordinary space at every size we set
// type at, so nobody chooses one on purpose, and one of them is the single
// most-cited tell of machine-written text.
const INVISIBLE = {
  "​": "zero width space",
  "‌": "zero width non-joiner",
  "‍": "zero width joiner",
  "⁠": "word joiner",
  "﻿": "zero width no-break space (BOM)",
  "­": "soft hyphen",
  "؜": "arabic letter mark",
  "‎": "left-to-right mark",
  "‏": "right-to-left mark",
  " ": "line separator",
  " ": "paragraph separator",
  "᠎": "mongolian vowel separator",
  "‪": "left-to-right embedding",
  "‫": "right-to-left embedding",
  "‬": "pop directional formatting",
  "‭": "left-to-right override",
  "‮": "right-to-left override",
  "⁦": "left-to-right isolate",
  "⁧": "right-to-left isolate",
  "⁨": "first strong isolate",
  "⁩": "pop directional isolate",
  " ": "narrow no-break space",
  " ": "thin space",
  " ": "figure space",
  " ": "en space",
  " ": "em space",
};

describe("invisible characters", () => {
  test("nothing we author carries a character that cannot be seen", () => {
    const found = [];
    for (const file of authored()) {
      const text = readFileSync(file, "utf8");
      let line = 1;
      for (const ch of text) {
        if (ch === "\n") { line += 1; continue; }
        const name = INVISIBLE[ch];
        if (!name) continue;
        found.push(
          `${path.relative(REPO, file)}:${line}: ${name} (U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")})`,
        );
      }
    }
    assert.deepEqual(
      found,
      [],
      `invisible characters in authored text — delete them, or write the visible character that was meant:\n  ${found.join("\n  ")}`,
    );
  });
});

describe("app conventions", () => {
  // The id an app passes to eventsBySite/newsBySite used to be a string
  // literal in every file that needed it — sixty-two of them, and the count
  // grew with every page added. Nothing catches a typo there: a wrong id is
  // a valid call that returns an empty list, and the page builds, and it is
  // empty. One export, one place to be wrong, one place to fix.
  test("no file names its own site id inline", () => {
    const inline = [];
    for (const app of APPS) {
      for (const file of sources(app)) {
        if (path.basename(file) === "content.ts") continue; // where it is declared
        const s = readFileSync(file, "utf8");
        for (const m of s.matchAll(/(?:events|news)BySite\("([^"]+)"\)/g)) {
          inline.push(`${path.relative(REPO, file)}: "${m[1]}"`);
        }
      }
    }
    assert.deepEqual(
      inline,
      [],
      `a site id written into a file instead of imported from ../content:\n  ${inline.join("\n  ")}`,
    );
  });

  // `site` means the site's identity — its name, suffix, keyword, publisher —
  // and it is spread into BaseLayout under that name. The feed key is a
  // different thing, and while both were called `site` a page could import
  // one and get the other: musical did, and the build resolved the clash by
  // dropping two news pages, silently, with no error anywhere.
  test("the feed key and the identity keep different names", () => {
    const clashes = [];
    for (const app of APPS) {
      for (const file of sources(app)) {
        const s = readFileSync(file, "utf8");
        const fromContent = s.match(/import \{([^}]*)\} from "(?:\.\.\/)*\.?\/?content";/);
        const fromConfig = /from "(?:\.\.\/)*site\.config";/.test(s);
        if (!fromContent || !fromConfig) continue;
        if (/(^|,)\s*site\s*(,|$)/.test(fromContent[1])) {
          clashes.push(path.relative(REPO, file));
        }
      }
    }
    assert.deepEqual(clashes, [], `two different things called \`site\` in one file:\n  ${clashes.join("\n  ")}`);
  });
});

// The chip on an event or news page links to its subject page, and its
// title puts the category mid-sentence: "Everything on this site filed
// under theatre", "… filed under Day of the Dead". Whether the capital
// stays is `inSentence` in packages/ui/src/labels.ts, and each site's
// vocabulary in sections.ts has already answered the same question in the
// plural its section heading is built from (plural: "Halloween", plural:
// "theatre"). The two must agree, or a new holiday tag titles its chip in
// lower case on the day it earns a page. German keeps every noun's capital
// and the Armenian title quotes the name as it stands, so only the English
// and Spanish sites are held to it; tick's plurals are its menu labels,
// capitals and all, and say nothing about a sentence.
describe("category titles", async () => {
  const { inSentence } = await import("../packages/ui/src/labels.ts");
  const TAG = /^[ \t]*("[^"]+"|[\p{L}]+): \{[^}]*?\bplural: "([^"]+)"/gmu;

  test("a name keeps its capital mid-sentence, a kind of thing loses it", () => {
    const wrong = [];
    for (const app of APPS) {
      if (app === "tick") continue;
      const config = path.join(REPO, "apps", app, "src", "site.config.ts");
      const sections = path.join(REPO, "apps", app, "src", "sections.ts");
      if (!existsSync(config) || !existsSync(sections)) continue;
      const lang = (readFileSync(config, "utf8").match(/\blang: "([a-z]{2})/) ?? [])[1] ?? "en";
      if (lang !== "en" && lang !== "es") continue;
      for (const [, quoted, plural] of readFileSync(sections, "utf8").matchAll(TAG)) {
        const key = quoted.replace(/^"|"$/g, "");
        const name = /^\p{Lu}/u.test(plural);
        const kept = inSentence(key, lang)[0] === key[0];
        if (name !== kept) wrong.push(`${app}: "${key}" → "${inSentence(key, lang)}", but its plural is "${plural}"`);
      }
    }
    assert.deepEqual(wrong, [], `a category the title cases differently from the site's own vocabulary:\n  ${wrong.join("\n  ")}`);
  });

  test("the cases that were wrong on 9 Nov 2026", () => {
    assert.equal(inSentence("Day of the Dead"), "Day of the Dead");
    assert.equal(inSentence("New Year's Eve"), "New Year's Eve");
    assert.equal(inSentence("UAE National Day"), "UAE National Day");
    assert.equal(inSentence("AI"), "AI");
    assert.equal(inSentence("Navidad", "es"), "Navidad");
    assert.equal(inSentence("Día de Muertos", "es"), "Día de Muertos");
    assert.equal(inSentence("Theatre"), "theatre");
    assert.equal(inSentence("Hacker House"), "hacker house");
    assert.equal(inSentence("Fiestas patrias", "es"), "fiestas patrias");
  });
});

// The FAQ block's h2 is the page's own name with a label joined to it
// (`faq` in packages/ui/src/labels.ts). Until 14 Nov 2026 the join was a
// colon whatever the name held, and 241 of 891 headings read "New Year in
// Yerevan 2026–2027: New Year's Eve and Christmas: questions", "Which coins
// use RandomX?: questions", "Պուչչինի. «Տուրանդոտ»․ հարցեր և պատասխաններ".
// One case per branch in each language, from the subjects live that day,
// plus the edges the second readers found by running the rule.
describe("FAQ headings", async () => {
  const { EN, EN_GB, ES, DE, HY } = await import("../packages/ui/src/labels.ts");
  const NB = " ";

  test("English: a colon where the name has none, a dash where it has, a new phrase after its own end", () => {
    assert.equal(EN.faq("DevFest Armenia 2026"), "DevFest Armenia 2026: questions");
    assert.equal(EN.faq("New Year in Yerevan 2026–2027: New Year's Eve and Christmas"), `New Year in Yerevan 2026–2027: New Year's Eve and Christmas${NB}– questions`);
    assert.equal(EN.faq("Romeo Juliet. Déjà Vu"), `Romeo Juliet. Déjà Vu${NB}– questions`);
    assert.equal(EN.faq("What is RandomX? The CPU-friendly proof of work"), `What is RandomX? The CPU-friendly proof of work${NB}– questions`);
    assert.equal(EN.faq("Which coins use RandomX?"), "Which coins use RandomX? Questions and answers");
    assert.equal(EN.faq("Taste. Learn. Discover WSET."), "Taste. Learn. Discover WSET. Questions and answers");
    // A second dash would pair with the first, a label in front cannot take a
    // clause, one in brackets reads as billing: the name closes as a sentence.
    assert.equal(EN.faq("Alpenglow is live – Solana finalises in one round: what changes"), "Alpenglow is live – Solana finalises in one round: what changes. Questions and answers");
    assert.equal(EN.faq("What is RandomX? The CPU proof of work – explained"), "What is RandomX? The CPU proof of work – explained. Questions and answers");
    assert.equal(EN.faq("Solana Breakpoint 2026 – keynote: Anatoly Yakovenko"), "Solana Breakpoint 2026 – keynote: Anatoly Yakovenko. Questions and answers");
    assert.equal(EN.faq("X – Y: Z (live)"), "X – Y: Z (live). Questions and answers");
    assert.equal(EN.faq("X – Y: Sammy Davis Jr."), "X – Y: Sammy Davis Jr. Questions and answers");
    // A figure or a brand after the stop splits as a capital does.
    assert.equal(EN.faq("How much memory does RandomX need? 2 GB, or 256 MB"), `How much memory does RandomX need? 2 GB, or 256 MB${NB}– questions`);
    assert.equal(EN.faq("How much does Kling 4.0 cost? $0.10 a second"), `How much does Kling 4.0 cost? $0.10 a second${NB}– questions`);
    assert.equal(EN.faq("Who retires it? xAI, on 2 November"), `Who retires it? xAI, on 2 November${NB}– questions`);
    assert.equal(EN.faq("What changed in LTX-2? v1.5.0 adds keyframe replacement"), `What changed in LTX-2? v1.5.0 adds keyframe replacement${NB}– questions`);
    assert.equal(EN.faq("What runs on Solana? pump.fun, Jupiter and Drift"), `What runs on Solana? pump.fun, Jupiter and Drift${NB}– questions`);
    // A mark inside brackets ends the aside, not the name; one inside quotes ends both.
    assert.equal(EN.faq("Kling 4.0 (finally!)"), "Kling 4.0 (finally!): questions");
    assert.equal(EN.faq("Live with Sammy Davis Jr. (tribute)"), "Live with Sammy Davis Jr. (tribute): questions");
    assert.equal(EN.faq("Who said “Stop!”"), "Who said “Stop!” Questions and answers");
    // An abbreviation's full stop splits nothing; a time's colon is no separator.
    assert.equal(EN.faq("Dark Arts at Warner Bros. Studio Tour London 2026"), "Dark Arts at Warner Bros. Studio Tour London 2026: questions");
    assert.equal(EN.faq("Koch Plaza at David H. Koch Theater"), "Koch Plaza at David H. Koch Theater: questions");
    assert.equal(EN.faq("Party at 4:20 in Yerevan"), "Party at 4:20 in Yerevan: questions");
    assert.equal(EN.faq("Who Do I Look Like? at the Puppet Theatre"), "Who Do I Look Like? at the Puppet Theatre: questions");
    assert.equal(EN_GB.faq, EN.faq);
  });

  test("Spanish: one name for the block, the full stop where the name has a colon", () => {
    assert.equal(ES.faq("La Alumbrada de Mixquic 2026"), "La Alumbrada de Mixquic 2026: preguntas frecuentes");
    assert.equal(ES.faq("Manuel Medrano en Acapulco: «Superior Tour»"), "Manuel Medrano en Acapulco: «Superior Tour». Preguntas frecuentes");
    assert.equal(ES.faq("¿Cuándo llega la mariposa monarca?"), "¿Cuándo llega la mariposa monarca? Preguntas frecuentes");
    assert.equal(ES.faq("Montaner – El Último Regreso, en el Forum Mundo Imperial"), "Montaner – El Último Regreso, en el Forum Mundo Imperial: preguntas frecuentes");
    // The stop goes after the closing quote or bracket, so a mark inside one ends nothing.
    assert.equal(ES.faq("Alejandro Sanz en Acapulco: «¿Y Ahora Qué?»"), "Alejandro Sanz en Acapulco: «¿Y Ahora Qué?». Preguntas frecuentes");
    assert.equal(ES.faq("Concierto «¡Viva!»"), "Concierto «¡Viva!»: preguntas frecuentes");
    assert.equal(ES.faq("Feria del Libro (2.ª ed.)"), "Feria del Libro (2.ª ed.): preguntas frecuentes");
    // A full stop already inside the quote is not doubled; an ellipsis's dots are no full stop.
    assert.equal(ES.faq("Cartelera: «Hamlet.»"), "Cartelera: «Hamlet.» Preguntas frecuentes");
    assert.equal(ES.faq("Charla “Don’t trust, verify.”"), "Charla “Don’t trust, verify.” Preguntas frecuentes");
    assert.equal(ES.faq("Lectura «Y entonces...»"), "Lectura «Y entonces...»: preguntas frecuentes");
  });

  test("German: one name for the block, nothing before the name that would have to agree with it", () => {
    assert.equal(DE.faq("Wiener Eistraum 2027"), "Wiener Eistraum 2027: Fragen und Antworten");
    assert.equal(DE.faq("Arnulf Rainer: Retrospektive in der ALBERTINA"), `Arnulf Rainer: Retrospektive in der ALBERTINA${NB}– Fragen und Antworten`);
    assert.equal(DE.faq("124. ZuckerBäckerball 2027"), "124. ZuckerBäckerball 2027: Fragen und Antworten");
    assert.equal(DE.faq("HER STORY. Künstlerinnen der ALBERTINA"), "HER STORY. Künstlerinnen der ALBERTINA: Fragen und Antworten");
    assert.equal(DE.faq("Bezirksfest im 3."), `Bezirksfest im 3.${NB}– Fragen und Antworten`);
    assert.equal(DE.faq("Konzert „Requiem“."), "Konzert „Requiem“. Fragen und Antworten");
    assert.equal(DE.faq("„Alles Walzer!“"), "„Alles Walzer!“ Fragen und Antworten");
    // A quoted work at the end of a longer name keeps the name's own join.
    assert.equal(DE.faq("Raimund Theater: „Mamma Mia!“"), `Raimund Theater: „Mamma Mia!“${NB}– Fragen und Antworten`);
    assert.equal(DE.faq("Musical „Mamma Mia!“"), "Musical „Mamma Mia!“: Fragen und Antworten");
    assert.equal(DE.faq("Kabarett „Passt scho.“"), `Kabarett „Passt scho.“${NB}– Fragen und Antworten`);
    assert.equal(DE.faq("Konzert (live!)"), "Konzert (live!): Fragen und Antworten");
    // A stop that ends no sentence: a Roman ordinal, an abbreviation, an ellipsis.
    assert.equal(DE.faq("Sisi und Franz Joseph I."), `Sisi und Franz Joseph I.${NB}– Fragen und Antworten`);
    assert.equal(DE.faq("Strauss & Co."), `Strauss & Co.${NB}– Fragen und Antworten`);
    assert.equal(DE.faq("Warten auf…"), `Warten auf…${NB}– Fragen und Antworten`);
    assert.equal(DE.faq("Warten auf..."), `Warten auf...${NB}– Fragen und Antworten`);
    assert.equal(DE.faq("Warten auf . . ."), `Warten auf . . .${NB}– Fragen und Antworten`);
    assert.equal(DE.faq("Wohin zu Silvester in Wien?"), "Wohin zu Silvester in Wien? Fragen und Antworten");
    assert.equal(DE.faq("Rudolfina-Redoute 2027 – Maskenball: Programm"), "Rudolfina-Redoute 2027 – Maskenball: Programm (Fragen und Antworten)");
    assert.equal(DE.faq("TU Ball – Ball der TU: Programm (live)"), `TU Ball – Ball der TU: Programm (live)${NB}– Fragen und Antworten`);
  });

  test("Armenian: the mijaket where the name has no stop of its own, the dash where it has", () => {
    assert.equal(HY.faq("DevFest Armenia 2026"), "DevFest Armenia 2026․ հարցեր և պատասխաններ");
    assert.equal(HY.faq("Պուչչինի. «Տուրանդոտ»՝ Երևանի օպերային թատրոնում"), `Պուչչինի. «Տուրանդոտ»՝ Երևանի օպերային թատրոնում${NB}— հարցեր և պատասխաններ`);
    assert.equal(HY.faq("Ամանոր Երևանում 2026–2027․ Ամանորի գիշերը և Սուրբ Ծնունդը"), `Ամանոր Երևանում 2026–2027․ Ամանորի գիշերը և Սուրբ Ծնունդը${NB}— հարցեր և պատասխաններ`);
    assert.equal(HY.faq("Which coins use RandomX?"), `Հարցեր և պատասխաններ${NB}— Which coins use RandomX?`);
    // A stop glued to a character, a closing guillemet and the "but" mark are no separators.
    assert.equal(HY.faq("yellowheart.՝ ամանորյա մենահամերգ Տաշիր Արենայում"), "yellowheart.՝ ամանորյա մենահամերգ Տաշիր Արենայում․ հարցեր և պատասխաններ");
    assert.equal(HY.faq("«Mamma Mia!»"), "«Mamma Mia!»․ հարցեր և պատասխաններ");
    assert.equal(HY.faq("Wine Day — գինու տուր"), "Wine Day — գինու տուր․ հարցեր և պատասխաններ");
  });

  test("no subject, or only spaces, keeps the bare label; a subject is trimmed and never cut", () => {
    for (const [L, bare] of [[EN, "Questions"], [ES, "Preguntas"], [DE, "Fragen"], [HY, "Հարցեր և պատասխաններ"]]) {
      assert.equal(L.faq(), bare);
      assert.equal(L.faq("   "), bare);
    }
    assert.equal(EN.faq("  Yerevan Jazz Fest "), "Yerevan Jazz Fest: questions");
    assert.equal(DE.faq("Was tun? "), "Was tun? Fragen und Antworten");
  });
});

// Section ledes go out through holdDates (packages/ui/src/nowrap.ts), which
// holds every date in a <span class="nowrap"> so a phone never ends a line
// on "November" and starts the next on "2".
describe("dates held in ledes", async () => {
  const { holdDates, holdDatesInHtml } = await import("../packages/ui/src/nowrap.ts");
  const held = (text) => [...holdDates(text).matchAll(/<span class="nowrap">([^<]*)<\/span>/g)].map((m) => m[1]);

  test("every date form the network writes, in its four languages", () => {
    assert.deepEqual(held("on Monday, November 1, and Tuesday, November 2, in 2027"), ["November 1", "November 2"]);
    assert.deepEqual(held("Nov 1–2 and Nov. 8"), ["Nov 1–2", "Nov. 8"]);
    assert.deepEqual(held("falls on December 2, 2026."), ["December 2, 2026"]);
    assert.deepEqual(held("Thursday, 31 December 2026; 1–2 November; 3 January."), ["31 December 2026", "1–2 November", "3 January"]);
    assert.deepEqual(held("December 2026"), ["December 2026"]);
    assert.deepEqual(held("el 2 de noviembre de 2026 y el 6 de enero"), ["2 de noviembre de 2026", "6 de enero"]);
    assert.deepEqual(held("von 13. November bis 6. Jänner, am 31. Dezember 2026"), ["13. November", "6. Jänner", "31. Dezember 2026"]);
    assert.deepEqual(held("հոկտեմբերի 31-ը և հունվարի 6-ի"), ["հոկտեմբերի 31-ը", "հունվարի 6-ի"]);
  });

  test("nothing that is not a date, and the text otherwise as Astro would set it", () => {
    assert.equal(holdDates("New York's 2026 celebrations, the 31st, the Mayor 20"), "New York&#39;s 2026 celebrations, the 31st, the Mayor 20");
    assert.equal(holdDates("a <b> & \"c\""), "a &lt;b&gt; &amp; &quot;c&quot;");
    assert.equal(
      holdDatesInHtml('<a href="/november-2/" title="November 2">on November 2</a>'),
      '<a href="/november-2/" title="November 2">on <span class="nowrap">November 2</span></a>',
    );
  });
});
