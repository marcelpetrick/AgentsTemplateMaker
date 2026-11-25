// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later

export type Language = "en" | "de";
export type Localized = Record<Language, string>;

export interface RuleSetting {
  readonly label: Localized;
  readonly initial: string;
  readonly options?: readonly { value: string; label: Localized }[];
  readonly kind: "select" | "multi" | "text" | "percent";
}

export interface Rule {
  readonly id: string;
  readonly category: string;
  readonly label: Localized;
  readonly help: Localized;
  readonly defaultSelected?: boolean;
  readonly setting?: RuleSetting;
  readonly paragraph: (language: Language, value: string) => string;
}

const localized = (en: string, de: string): Localized => ({ en, de });

export const categories: readonly { id: string; label: Localized }[] = [
  {
    id: "agent",
    label: localized("Agent operating policy", "Arbeitsweise des Agenten"),
  },
  {
    id: "software",
    label: localized("Software and technology", "Software und Technik"),
  },
  {
    id: "repository",
    label: localized("Repository practices", "Regeln für das Repository"),
  },
  {
    id: "verification",
    label: localized(
      "Verification and architecture",
      "Prüfung und Architektur",
    ),
  },
];

type RuleDescription = Omit<Rule, "setting" | "paragraph">;

function fixed(description: RuleDescription, text: Localized): Rule {
  return { ...description, paragraph: (language) => text[language] };
}

interface Choice {
  readonly value: string;
  readonly label: Localized;
  readonly text: Localized;
}

function choices(
  description: RuleDescription,
  label: Localized,
  options: readonly [Choice, ...Choice[]],
): Rule {
  const initial = options[0];
  return {
    ...description,
    setting: { kind: "select", label, initial: initial.value, options },
    paragraph: (language, value) =>
      (options.find((option) => option.value === value) ?? initial).text[
        language
      ],
  };
}

function item(
  id: string,
  category: string,
  label: Localized,
  help: Localized,
): RuleDescription {
  return { id, category, label, help };
}

function commitLimit(limit: number): Choice {
  return {
    value: String(limit),
    label: localized(`Under ${limit} characters`, `Unter ${limit} Zeichen`),
    text: localized(
      `Keep the full commit message under ${limit} characters. Count the subject, body, footers, and all internal line breaks, including blank lines. The maximum is ${limit - 1} characters.`,
      `Schreibe die gesamte Commit-Nachricht mit weniger als ${limit} Zeichen. Zähle Betreff, Nachrichtentext, Fußzeilen und alle inneren Zeilenumbrüche einschließlich Leerzeilen. Erlaubt sind höchstens ${limit - 1} Zeichen.`,
    ),
  };
}

const languageNames: readonly [string, string][] = [
  ["shell", "Shell"],
  ["python", "Python"],
  ["c", "C"],
  ["cpp", "C++"],
  ["cmake", "CMake"],
  ["qt", "Qt"],
  ["lvgl", "LVGL"],
  ["touchgfx", "TouchGFX"],
  ["esp-idf", "ESP-IDF"],
  ["freertos", "FreeRTOS"],
  ["zephyr", "Zephyr RTOS"],
  ["typescript", "TypeScript"],
  ["javascript", "JavaScript"],
  ["rust", "Rust"],
  ["go", "Go"],
  ["java", "Java"],
  ["kotlin", "Kotlin"],
  ["csharp", "C#"],
  ["sql", "SQL"],
];

function chosenLanguages(value: string) {
  const chosen = new Set(value.split(","));
  return languageNames
    .filter(([id]) => chosen.has(id))
    .map(([, name]) => name)
    .join(", ");
}

const domainSpecific = localized(
  "When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.",
  "Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.",
);

function languagesParagraph(language: Language, value: string) {
  const names = chosenLanguages(value);
  const intro = names
    ? localized(
        `Use these languages and frameworks: ${names}.`,
        `Nutze diese Sprachen und Frameworks: ${names}.`,
      )
    : localized(
        "Use the languages and frameworks the project already uses.",
        "Nutze die Sprachen und Frameworks, die das Projekt bereits verwendet.",
      );
  return `${intro[language]} ${domainSpecific[language]}`;
}

export const rules: readonly Rule[] = [
  choices(
    item(
      "delegation",
      "agent",
      localized("Parallel sub-agents", "Parallele Unteragenten"),
      localized(
        "Parallel work can save time and improve independent checking. Extra agents use more tokens and need coordination. Leave this unchecked to omit a delegation policy.",
        "Parallele Arbeit kann Zeit sparen und unabhängige Prüfungen verbessern. Zusätzliche Agenten verbrauchen mehr Tokens und brauchen Abstimmung. Ohne Auswahl wird keine Delegationsregel ausgegeben.",
      ),
    ),
    localized("Delegation scope", "Erlaubte Delegation"),
    [
      {
        value: "prohibited",
        label: localized("Prohibit delegation", "Delegation untersagen"),
        text: localized(
          "Do not delegate work to sub-agents. Carry out implementation and verification in the main session.",
          "Delegiere keine Aufgaben an Unteragenten. Setze Änderungen um und prüfe sie in der Hauptsitzung.",
        ),
      },
      {
        value: "review",
        label: localized(
          "Independent review only",
          "Nur unabhängige Prüfungen",
        ),
        text: localized(
          "Use sub-agents for independent review and counterexamples, and keep implementation in the main session. Give reviewers the requirement and revision, then assess their findings.",
          "Setze Unteragenten für unabhängige Prüfungen und Gegenbeispiele ein. Behalte die Umsetzung in der Hauptsitzung. Nenne den Prüfern die Anforderung und den Commit. Bewerte danach ihre Befunde.",
        ),
      },
      {
        value: "independent",
        label: localized(
          "Independent tasks and review",
          "Unabhängige Aufgaben und Prüfungen",
        ),
        text: localized(
          "Assign independent work and review to sub-agents in parallel when their scopes do not overlap. Give each agent a clear outcome and file scope. Integrate the results and run the combined checks in the main session.",
          "Verteile unabhängige Aufgaben und Prüfungen parallel an Unteragenten, wenn sich ihre Arbeitsbereiche nicht überschneiden. Gib jedem Agenten ein klares Ziel und einen abgegrenzten Dateibereich. Führe die Ergebnisse in der Hauptsitzung zusammen und prüfe sie dort.",
        ),
      },
    ],
  ),
  fixed(
    item(
      "model-choice",
      "agent",
      localized("Use lower-cost models", "Günstigere Modelle einsetzen"),
      localized(
        "Cheaper models can reduce cost on bounded tasks. A model with weaker reasoning needs more supervision on ambiguous or high-risk work.",
        "Günstigere Modelle können bei klar begrenzten Aufgaben Kosten senken. Bei unklaren oder riskanten Aufgaben braucht ein schwächeres Modell mehr Aufsicht.",
      ),
    ),
    localized(
      "Use a lower-cost model for clearly scoped, low-risk work such as listing references or applying a mechanical change with a clear check. Use a stronger model for unclear requirements, architecture, risky changes, and final review.",
      "Nutze ein günstigeres Modell für klar begrenzte Aufgaben mit geringem Risiko, etwa für eine Liste von Fundstellen oder für mechanische Änderungen mit eindeutiger Prüfung. Nutze ein stärkeres Modell für unklare Anforderungen, Architektur, riskante Änderungen und die Abschlussprüfung.",
    ),
  ),
  fixed(
    item(
      "advisor",
      "agent",
      localized("Consult an advisor", "Rat einholen"),
      localized(
        "An advisor adds another perspective when instructions conflict or age. Consultation takes time and the responsible person still owns the decision.",
        "Ein Berater liefert einen weiteren Blick auf widersprüchliche oder veraltete Vorgaben. Die Beratung kostet Zeit und die zuständige Person trägt weiterhin die Verantwortung.",
      ),
    ),
    localized(
      "Ask an advisor for a recommendation when a project rule is unclear, conflicting, or clearly obsolete. The agent may replace obsolete guidance such as Python 2 with the latest compatible, supported stable release allowed by the project’s long-term support policy. Record the recommendation and reasoning. Ask a human to resolve incompatible stakeholder requirements or approve changes to required behavior.",
      "Bitte einen Berater um eine Empfehlung, wenn eine Projektregel unklar, widersprüchlich oder eindeutig veraltet ist. Der Agent darf veraltete Vorgaben wie Python 2 durch die neueste kompatible und noch unterstützte stabile Version ersetzen. Beachte die Regeln des Projekts für Langzeitunterstützung. Halte Empfehlung und Begründung fest. Bitte einen Menschen, unvereinbare Anforderungen zu klären oder Änderungen am geforderten Verhalten freizugeben.",
    ),
  ),
  choices(
    item(
      "autonomy",
      "agent",
      localized("Approval and autonomy", "Freigaben und Eigenständigkeit"),
      localized(
        "Routine autonomy keeps work moving. Earlier approval gives maintainers more control and adds waiting time.",
        "Eigenständige Routineentscheidungen halten die Arbeit in Gang. Frühere Freigaben geben Verantwortlichen mehr Kontrolle und können die Arbeit verzögern.",
      ),
    ),
    localized("Decision policy", "Entscheidungsregel"),
    [
      {
        value: "routine",
        label: localized(
          "Allow routine decisions",
          "Routineentscheidungen erlauben",
        ),
        text: localized(
          "Make routine, reversible implementation decisions within the agreed scope, such as naming a private helper. Seek user approval before expanding scope, changing required behavior, publishing material, or taking an irreversible action.",
          "Triff umkehrbare Routineentscheidungen im vereinbarten Rahmen selbst, etwa bei der Benennung einer internen Hilfsfunktion. Bitte um Freigabe, bevor du den Umfang erweiterst, gefordertes Verhalten änderst, Inhalte veröffentlichst oder eine unumkehrbare Handlung ausführst.",
        ),
      },
      {
        value: "approval",
        label: localized(
          "Approve implementation decisions",
          "Umsetzungsentscheidungen freigeben",
        ),
        text: localized(
          "Ask for user approval before choosing an implementation approach, changing agreed behavior, publishing material, expanding scope, or taking an irreversible action. Make routine decisions within an approved approach, such as naming a local variable.",
          "Bitte um Freigabe, bevor du einen Lösungsweg auswählst, vereinbartes Verhalten änderst, Inhalte veröffentlichst, den Umfang erweiterst oder eine unumkehrbare Handlung ausführst. Triff Routineentscheidungen innerhalb eines freigegebenen Lösungswegs selbst, etwa bei der Benennung einer lokalen Variablen.",
        ),
      },
    ],
  ),
  {
    ...item(
      "technologies",
      "software",
      localized("Preferred technologies", "Bevorzugte Technologien"),
      localized(
        "Naming the stack keeps new work consistent. A fixed preference makes changes to the stack an explicit decision.",
        "Ein benannter Technologiestapel hält neue Arbeit konsistent. Bei einer festen Vorgabe muss ein Wechsel bewusst entschieden werden.",
      ),
    ),
    setting: {
      kind: "text",
      label: localized("Project technologies", "Projekttechnologien"),
      initial: "",
    },
    paragraph: (language, value) => {
      const technologies = value.trim().replaceAll(/\s+/g, " ");
      return technologies
        ? localized(
            `Use the project’s preferred technologies (${technologies}). Explain any proposed change before adding a replacement.`,
            `Nutze die bevorzugten Technologien des Projekts (${technologies}). Begründe einen Wechsel, bevor du einen Ersatz einführst.`,
          )[language]
        : localized(
            "Follow the documented project technologies. Record any new technology and why it fits before introducing it.",
            "Nutze die dokumentierten Projekttechnologien. Halte vor der Einführung einer neuen Technologie fest, warum sie zum Projekt passt.",
          )[language];
    },
  },
  {
    ...item(
      "languages",
      "software",
      localized("Languages and frameworks", "Sprachen und Frameworks"),
      localized(
        "A fixed set of languages keeps the code base consistent and reviewable. Allowing domain-specific languages avoids forcing a general language onto a specialized task.",
        "Eine feste Auswahl an Sprachen hält den Code einheitlich und prüfbar. Spezifische Sprachen zuzulassen vermeidet, dass eine allgemeine Sprache eine Spezialaufgabe erzwingt.",
      ),
    ),
    setting: {
      kind: "multi",
      label: localized("Preferred languages", "Bevorzugte Sprachen"),
      initial: "",
      options: languageNames.map(([value, name]) => ({
        value,
        label: localized(name, name),
      })),
    },
    paragraph: languagesParagraph,
  },
  fixed(
    item(
      "open-source",
      "software",
      localized("Prefer open-source tools", "Quelloffene Werkzeuge bevorzugen"),
      localized(
        "Open-source tools are inspectable and can reduce vendor dependence. A project may still need a proprietary tool for compatibility or support.",
        "Quelloffene Werkzeuge lassen sich prüfen und können die Abhängigkeit von Anbietern verringern. Für Kompatibilität oder Support kann ein Projekt ein proprietäres Werkzeug brauchen.",
      ),
    ),
    localized(
      "Prefer open-source tools where feasible. Honor explicit exceptions from the project or user, and record why an exception is needed.",
      "Bevorzuge nach Möglichkeit quelloffene Werkzeuge. Beachte ausdrückliche Ausnahmen des Projekts oder des Nutzers und halte fest, warum eine Ausnahme nötig ist.",
    ),
  ),
  choices(
    item(
      "character-set",
      "software",
      localized("Character set", "Zeichensatz"),
      localized(
        "Unicode supports every script and the names people actually use. An ASCII-only rule avoids encoding problems in older toolchains and embedded targets but excludes other scripts.",
        "Unicode unterstützt alle Schriften und die Namen, die Menschen tatsächlich verwenden. Eine Beschränkung auf ASCII vermeidet Kodierungsprobleme in älteren Werkzeugketten und eingebetteten Zielen, schließt aber andere Schriften aus.",
      ),
    ),
    localized("Allowed characters", "Erlaubte Zeichen"),
    [
      {
        value: "unicode",
        label: localized("Unicode (UTF-8)", "Unicode (UTF-8)"),
        text: localized(
          "Write Unicode-compliant code. Read and write text as UTF-8. Do not assume one byte or one code point per visible character: count, cut, and compare text by grapheme where users see it, and normalize text before comparing it. Test with accents, non-Latin scripts, and emoji.",
          "Schreibe Unicode-konformen Code. Lies und schreibe Text als UTF-8. Gehe nicht davon aus, dass ein sichtbares Zeichen einem Byte oder einem Code Point entspricht: Zähle, kürze und vergleiche Text dort nach Graphemen, wo Nutzer ihn sehen, und normalisiere Text vor Vergleichen. Teste mit Akzenten, nicht lateinischen Schriften und Emoji.",
        ),
      },
      {
        value: "ascii",
        label: localized("ASCII only", "Nur ASCII"),
        text: localized(
          "Restrict source code, identifiers, comments, file names, and generated text to ASCII characters. Replace typographic quotes, dashes, and symbols with ASCII equivalents. Record any exception an external format or user requirement needs.",
          "Beschränke Quellcode, Bezeichner, Kommentare, Dateinamen und erzeugten Text auf ASCII-Zeichen. Ersetze typografische Anführungszeichen, Striche und Symbole durch ASCII-Entsprechungen. Halte jede Ausnahme fest, die ein externes Format oder eine Nutzeranforderung verlangt.",
        ),
      },
    ],
  ),
  choices(
    item(
      "versioning",
      "software",
      localized("Version numbering", "Versionsnummern"),
      localized(
        "A consistent version policy clarifies what a release means. Semantic Versioning signals compatibility, while Calendar Versioning makes the release date visible.",
        "Eine einheitliche Regel macht die Bedeutung einer Version klar. Semantic Versioning zeigt Kompatibilität, Calendar Versioning den Veröffentlichungszeitraum.",
      ),
    ),
    localized("Versioning scheme", "Versionierungsschema"),
    [
      {
        value: "semver",
        label: localized("Semantic Versioning", "Semantische Versionierung"),
        text: localized(
          "Use Semantic Versioning for releases. Bump MAJOR for an incompatible public API change, MINOR for backward-compatible functionality, and PATCH for backward-compatible fixes. Update the version and release notes when preparing a release.",
          "Nutze Semantic Versioning für Releases. Erhöhe MAJOR bei inkompatiblen Änderungen an der öffentlichen Schnittstelle, MINOR bei rückwärtskompatiblen Funktionen und PATCH bei rückwärtskompatiblen Korrekturen. Aktualisiere Version und Versionshinweise bei der Vorbereitung eines Releases.",
        ),
      },
      {
        value: "calver",
        label: localized("Calendar Versioning", "Kalenderversionierung"),
        text: localized(
          "Use Calendar Versioning in YYYY.MM.PATCH format. At release time use the year and month in UTC, start PATCH at 0 for the first release of that month, and increment PATCH for each later release in the same month.",
          "Nutze Calendar Versioning im Format YYYY.MM.PATCH. Verwende bei der Veröffentlichung das Jahr und den Monat in UTC. Beginne beim ersten Release des Monats mit PATCH 0 und erhöhe PATCH bei jedem weiteren Release im selben Monat.",
        ),
      },
    ],
  ),
  fixed(
    item(
      "lint-format",
      "software",
      localized("Lint and format", "Linting und Formatierung"),
      localized(
        "A linter catches common errors and a formatter removes style decisions. Two formatters can repeatedly undo each other’s changes.",
        "Ein Linter findet häufige Fehler und ein Formatierer sorgt für einen einheitlichen Stil. Zwei Formatierer können ihre Änderungen gegenseitig rückgängig machen.",
      ),
    ),
    localized(
      "Use established tools for the project’s language. For Python, use Ruff for linting and Black for formatting. Choose one formatter per language to avoid conflicting rewrites, and run lint and format checks in the pipeline.",
      "Nutze etablierte Werkzeuge für die Projektsprache. Setze bei Python Ruff für Linting und Black für Formatierung ein. Wähle pro Sprache einen Formatierer, damit sich Änderungen nicht widersprechen. Prüfe Linting und Formatierung in der Pipeline.",
    ),
  ),
  fixed(
    item(
      "dependencies",
      "software",
      localized(
        "Pin and review dependencies",
        "Abhängigkeiten fixieren und prüfen",
      ),
      localized(
        "Pinned versions make builds repeatable. Regular update checks take time and prevent pins from silently growing stale.",
        "Fixierte Versionen machen Builds reproduzierbar. Regelmäßige Prüfungen kosten Zeit und verhindern, dass festgelegte Versionen unbemerkt veralten.",
      ),
    ),
    localized(
      "Pin exact resolved dependency versions in version-controlled files. Review them regularly and take compatible updates after verification. For each deferred update, record the requirement or failing check that blocks it.",
      "Fixiere die aufgelösten Versionen der Abhängigkeiten in versionierten Dateien. Prüfe sie regelmäßig und übernimm kompatible Updates nach erfolgreicher Prüfung. Halte bei jedem verschobenen Update fest, welche Anforderung oder fehlgeschlagene Prüfung es blockiert.",
    ),
  ),
  fixed(
    {
      ...item(
        "commits",
        "repository",
        localized(
          "Conventional and atomic commits",
          "Conventional Commits und atomare Commits",
        ),
        localized(
          "Small, descriptive commits make review and reversal easier. Splitting unrelated work takes staging effort.",
          "Kleine, aussagekräftige Commits erleichtern Prüfung und Rücknahme. Das Aufteilen unabhängiger Änderungen kostet etwas Aufwand beim Staging.",
        ),
      ),
      defaultSelected: true,
    },
    localized(
      "Use Conventional Commits, for example `fix(parser): handle an empty field`. Keep each commit to one coherent change, include its tests, and put unrelated cleanup in a separate commit. Name the change and reference its requirement when one exists.",
      "Nutze Conventional Commits, zum Beispiel `fix(parser): handle an empty field`. Beschränke jeden Commit auf eine zusammenhängende Änderung samt Tests. Räume unabhängige Stellen in einem eigenen Commit auf. Benenne die Änderung und verweise auf ihre Anforderung, wenn es eine gibt.",
    ),
  ),
  choices(
    {
      ...item(
        "commit-limit",
        "repository",
        localized("Commit message limit", "Länge der Commit-Nachricht"),
        localized(
          "A strict limit keeps history scannable. 600 characters leave more room for rationale than 300.",
          "Eine feste Grenze hält den Verlauf übersichtlich. 600 Zeichen lassen mehr Platz für Begründungen als 300.",
        ),
      ),
      defaultSelected: true,
    },
    localized("Full message length", "Länge der gesamten Nachricht"),
    [commitLimit(300), commitLimit(600)],
  ),
  fixed(
    {
      ...item(
        "credentials",
        "repository",
        localized("Credential hygiene", "Schutz von Zugangsdaten"),
        localized(
          "Keeping secrets out of project material prevents accidental disclosure. Real credentials must be configured separately.",
          "Wenn Zugangsdaten außerhalb der Projektunterlagen bleiben, werden sie seltener versehentlich offengelegt. Echte Zugangsdaten müssen separat eingerichtet werden.",
        ),
      ),
      defaultSelected: true,
    },
    localized(
      "Keep credentials out of committed files, commit messages, examples, logs, and generated artifacts. Use placeholders in examples and configure real secrets through the project’s approved secret store.",
      "Halte Zugangsdaten aus eingecheckten Dateien, Commit-Nachrichten, Beispielen, Protokollen und erzeugten Artefakten heraus. Verwende Platzhalter in Beispielen und hinterlege echte Zugangsdaten im dafür vorgesehenen Geheimnisspeicher des Projekts.",
    ),
  ),
  fixed(
    item(
      "plain-language",
      "repository",
      localized("Plain-language instructions", "Anleitungen in klarer Sprache"),
      localized(
        "Direct wording makes instructions easier for people and agents to follow. It takes editing to remove jargon while keeping necessary detail.",
        "Direkte Formulierungen helfen Menschen und Agenten beim Befolgen von Anweisungen. Fachjargon zu entfernen und nötige Details zu erhalten, kostet Überarbeitung.",
      ),
    ),
    localized(
      "Write instructions like a flight manual. Use familiar words, short sentences, and concrete actions. Explain unfamiliar terms when they are needed, and state how the reader can see that each action is complete.",
      "Schreibe Anleitungen wie ein Flughandbuch. Nutze vertraute Wörter, kurze Sätze und konkrete Handlungen. Erkläre notwendige Fachbegriffe und beschreibe, woran man erkennt, dass ein Schritt abgeschlossen ist.",
    ),
  ),
  fixed(
    {
      ...item(
        "traceability",
        "repository",
        localized("Decision traceability", "Nachvollziehbare Entscheidungen"),
        localized(
          "A documented chain preserves why a change exists and how to check it. It takes upkeep as decisions and evidence evolve.",
          "Eine dokumentierte Kette hält fest, warum es eine Änderung gibt und wie man sie prüft. Sie muss bei neuen Entscheidungen und Nachweisen gepflegt werden.",
        ),
      ),
      defaultSelected: true,
    },
    localized(
      "Record new user inputs and decisions in version-controlled Markdown under the project’s documentation directory. Link the intended outcome and decision rationale to a stable requirement, its implementation, an acceptance check, and the evidence. Use Git for the timestamp and make the checks reproducible from a clean checkout.",
      "Halte neue Nutzervorgaben und Entscheidungen in versioniertem Markdown im Dokumentationsverzeichnis fest. Verknüpfe das gewünschte Ergebnis und die Begründung mit einer stabilen Anforderungskennung, der Umsetzung, einer Abnahmeprüfung und ihrem Nachweis. Nutze Git für den Zeitstempel und mache die Prüfungen aus einem sauberen Checkout nachvollziehbar.",
    ),
  ),
  fixed(
    item(
      "review",
      "repository",
      localized(
        "Challenge requirements and commits",
        "Anforderungen und Commits hinterfragen",
      ),
      localized(
        "Early scrutiny can catch mistaken goals and unsupported claims. Reviewing each commit costs time and requires independent evidence.",
        "Frühe Prüfung kann falsche Ziele und unbelegte Behauptungen aufdecken. Die Prüfung jedes Commits kostet Zeit und braucht unabhängige Nachweise.",
      ),
    ),
    localized(
      "Challenge requirements before implementation and review every atomic commit. Look for ambiguous goals, counterexamples, missing failure cases, and unsupported claims. Record the reviewed commit SHA, findings, evidence, and how each finding was resolved outside that commit. Reproduce the checks independently from a clean checkout when possible and mark any unverified claim. After each planning change and each implementation iteration, check that the result still fits the requirements and the plan, and repeat the review until it does or a person decides.",
      "Hinterfrage Anforderungen vor der Umsetzung und prüfe jeden atomaren Commit. Suche unklare Ziele, Gegenbeispiele, fehlende Fehlerfälle und unbelegte Behauptungen. Halte Commit-SHA, Befunde, Nachweise und den Umgang mit jedem Befund außerhalb des geprüften Commits fest. Wiederhole die Prüfungen möglichst unabhängig aus einem sauberen Checkout und kennzeichne ungeprüfte Aussagen. Prüfe nach jeder Planungsänderung und jedem Umsetzungsschritt, ob das Ergebnis noch zu den Anforderungen und zum Plan passt, und wiederhole die Prüfung, bis es passt oder ein Mensch entscheidet.",
    ),
  ),
  fixed(
    item(
      "unit-tests",
      "verification",
      localized("Unit tests", "Unit-Tests"),
      localized(
        "Isolated tests give fast feedback and pinpoint failures. They leave interactions between modules to other checks.",
        "Isolierte Tests liefern schnell Rückmeldung und grenzen Fehler ein. Das Zusammenspiel der Module wird durch andere Prüfungen abgedeckt.",
      ),
    ),
    localized(
      "Write unit tests for isolated behavior. Check important results, edge cases, and errors with small, repeatable inputs.",
      "Schreibe Unit-Tests für isoliertes Verhalten. Prüfe wichtige Ergebnisse, Grenzfälle und Fehler mit kleinen, wiederholbaren Eingaben.",
    ),
  ),
  fixed(
    item(
      "integration-tests",
      "verification",
      localized("Integration tests", "Integrationstests"),
      localized(
        "Integration tests catch mismatched assumptions across boundaries. Their fixtures and dependencies take more setup.",
        "Integrationstests finden widersprüchliche Annahmen an Schnittstellen. Testdaten und Abhängigkeiten brauchen mehr Vorbereitung.",
      ),
    ),
    localized(
      "Write integration tests for interactions across real module, process, or storage boundaries. Use controlled fixtures and verify the inputs, outputs, and failures on each side of the boundary.",
      "Schreibe Integrationstests für das Zusammenspiel an echten Modul-, Prozess- oder Speichergrenzen. Nutze kontrollierte Testdaten und prüfe Eingaben, Ausgaben und Fehler auf beiden Seiten der Schnittstelle.",
    ),
  ),
  fixed(
    item(
      "e2e-tests",
      "verification",
      localized("End-to-end tests", "End-to-End-Tests"),
      localized(
        "Complete journeys catch wiring and deployment mistakes that smaller tests miss. They take longer and are costlier to maintain.",
        "Vollständige Abläufe finden Fehler im Zusammenspiel und in der Bereitstellung, die kleinere Tests übersehen. Sie dauern länger und brauchen mehr Pflege.",
      ),
    ),
    localized(
      "Run end-to-end tests through the normal entry point of a built application. Follow a complete user journey and check its final result and important failure paths.",
      "Führe End-to-End-Tests über den normalen Einstiegspunkt der gebauten Anwendung aus. Folge einem vollständigen Benutzerablauf und prüfe das Endergebnis und wichtige Fehlerpfade.",
    ),
  ),
  fixed(
    item(
      "acceptance-tests",
      "verification",
      localized("Acceptance tests", "Abnahmetests"),
      localized(
        "Acceptance tests connect observable behavior to what the user needs. They require agreement on the outcome and its evidence.",
        "Abnahmetests verbinden beobachtbares Verhalten mit dem gewünschten Ergebnis. Ergebnis und Nachweis müssen zuvor vereinbart werden.",
      ),
    ),
    localized(
      "Agree on an observable acceptance check for each user outcome. Run it under the stated conditions and link the result to its requirement.",
      "Vereinbare für jedes gewünschte Nutzerergebnis eine beobachtbare Abnahmeprüfung. Führe sie unter den vereinbarten Bedingungen aus und verknüpfe das Ergebnis mit der Anforderung.",
    ),
  ),
  fixed(
    item(
      "automation",
      "verification",
      localized(
        "Automate checks on all targets",
        "Prüfungen für alle Ziele automatisieren",
      ),
      localized(
        "Automation gives repeatable evidence and exposes platform gaps. More targets add CI time and maintenance.",
        "Automatisierung liefert wiederholbare Nachweise und deckt Lücken zwischen Plattformen auf. Mehr Ziele kosten Laufzeit und Pflege in der CI.",
      ),
    ),
    localized(
      "Prefer repeatable automated checks. Start with the project’s declared list of supported build targets, then compare it with CI jobs and their results. Build and test each supported target, flag missing or skipped results, and document any manual checks and why they remain.",
      "Bevorzuge wiederholbare automatisierte Prüfungen. Gleiche die dokumentierte Liste unterstützter Build-Ziele mit den CI-Jobs und ihren Ergebnissen ab. Baue und teste jedes unterstützte Ziel, kennzeichne fehlende oder übersprungene Ergebnisse und begründe verbleibende manuelle Prüfungen.",
    ),
  ),
  fixed(
    item(
      "mutation",
      "verification",
      localized("Mutation testing", "Mutationstests"),
      localized(
        "Mutation testing shows whether assertions detect wrong behavior. It reruns tests many times and some surviving mutations may be equivalent changes.",
        "Mutationstests zeigen, ob Prüfungen falsches Verhalten erkennen. Sie wiederholen Tests häufig und manche überlebenden Mutationen ändern das beobachtbare Verhalten nicht.",
      ),
    ),
    localized(
      "Run mutation testing on unit tests by deliberately changing behavior, including known return values. Report surviving mutations and investigate whether they expose missing assertions or equivalent behavior.",
      "Prüfe Unit-Tests mit Mutationstests, indem du Verhalten gezielt änderst, etwa bekannte Rückgabewerte. Melde überlebende Mutationen und untersuche, ob Prüfbedingungen fehlen oder ob das Verhalten gleichwertig bleibt.",
    ),
  ),
  {
    ...item(
      "coverage",
      "verification",
      localized("Minimum line coverage", "Mindest-Zeilenabdeckung"),
      localized(
        "A minimum exposes untested code. Reaching a high number takes effort and still leaves assertion quality to review.",
        "Ein Mindestwert zeigt ungetesteten Code. Ein hoher Wert kostet Aufwand und die Aussagekraft der Prüfbedingungen muss weiterhin bewertet werden.",
      ),
    ),
    setting: {
      kind: "percent",
      label: localized("Minimum percentage", "Mindestwert in Prozent"),
      initial: "99",
    },
    paragraph: (language, value) =>
      localized(
        `Require at least ${value}% executable-line coverage of project-owned production source. Exclude tests, dependencies, and generated outputs. Document and justify any further exclusions before enabling the gate. Join coverage from the required suites and compare executed lines divided by eligible lines without rounding. Fail below the minimum and pass at or above it.`,
        `Fordere mindestens ${value} % Abdeckung der ausführbaren Zeilen im eigenen Produktionscode. Schließe Tests, Abhängigkeiten und generierte Ausgaben aus. Dokumentiere und begründe weitere Ausnahmen, bevor du den Mindestwert verbindlich prüfst. Führe die Ergebnisse der erforderlichen Testsuiten zusammen und vergleiche den Anteil ausgeführter Zeilen ohne Rundung. Der Wert muss mindestens dem Grenzwert entsprechen.`,
      )[language],
  },
  fixed(
    item(
      "clean-pipeline",
      "verification",
      localized("Rebuild from a clean clone", "Aus einem sauberen Klon bauen"),
      localized(
        "A clean build exposes hidden dependencies and untracked inputs. Installing prerequisites from scratch takes time.",
        "Ein sauberer Build deckt versteckte Abhängigkeiten und unversionierte Eingaben auf. Das Einrichten aller Voraussetzungen dauert länger.",
      ),
    ),
    localized(
      "Start from a clean clone. Obtain pinned dependencies, configure the environment, build from repository sources, run every applicable pipeline job, and inspect the results for all declared targets. Document external prerequisites and required secret names, and run without relying on a developer machine or untracked files.",
      "Beginne mit einem sauberen Klon. Installiere fixierte Abhängigkeiten, richte die Umgebung ein, baue aus den versionierten Quellen, führe alle zutreffenden Pipeline-Jobs aus und prüfe die Ergebnisse für jedes angegebene Ziel. Dokumentiere externe Voraussetzungen und die Namen benötigter Geheimnisse. Verlasse dich weder auf einen Entwicklerrechner noch auf unversionierte Dateien.",
    ),
  ),
  fixed(
    item(
      "tdd",
      "verification",
      localized("Test-driven development", "Testgetriebene Entwicklung"),
      localized(
        "A failing test proves the test can detect the missing behavior. Writing it first costs time and can expose an unclear requirement early.",
        "Ein fehlschlagender Test zeigt, dass er das fehlende Verhalten erkennt. Ihn zuerst zu schreiben kostet Zeit und kann unklare Anforderungen früh sichtbar machen.",
      ),
    ),
    localized(
      "For each new behavior or defect, write one test first and confirm that it fails for the expected reason. Make the smallest change that passes it, then refactor and rerun the relevant suite. Keep the test runnable against both the prior and changed behavior.",
      "Schreibe für jedes neue Verhalten und jeden Fehler zuerst einen Test. Prüfe, dass er aus dem erwarteten Grund fehlschlägt. Setze die kleinste passende Änderung um, räume danach den Code auf und wiederhole die betroffene Testsuite. Halte den Test mit dem alten und dem neuen Verhalten ausführbar.",
    ),
  ),
  fixed(
    item(
      "c4",
      "verification",
      localized("C4 architecture views", "C4-Architekturansichten"),
      localized(
        "C4 views explain system boundaries and responsibilities. Each extra level requires upkeep as the architecture changes.",
        "C4-Ansichten erklären Systemgrenzen und Zuständigkeiten. Jede weitere Ebene muss bei Architekturänderungen gepflegt werden.",
      ),
    ),
    localized(
      "Document the architecture with C4. Start with a system context view showing users, the system boundary, and external systems. Use a container view for applications, data stores, and their responsibilities. Add component or code views when a design question needs them, and verify every relationship against the documented design or revision.",
      "Dokumentiere die Architektur mit C4. Beginne mit einer Systemkontextansicht für Nutzer, Systemgrenze und externe Systeme. Zeige in einer Containeransicht Anwendungen, Datenspeicher und Zuständigkeiten. Ergänze Komponenten- oder Codeansichten bei Bedarf und gleiche jede Beziehung mit dem dokumentierten Entwurf oder Commit ab.",
    ),
  ),
  fixed(
    item(
      "mermaid",
      "verification",
      localized("Mermaid source diagrams", "Diagramme als Mermaid-Quelltext"),
      localized(
        "Mermaid diagrams can be reviewed with the code. Their rendering depends on the documentation viewer.",
        "Mermaid-Diagramme lassen sich zusammen mit dem Code prüfen. Ihre Darstellung hängt vom Dokumentationssystem ab.",
      ),
    ),
    localized(
      "Keep editable Mermaid blocks in version-controlled Markdown. State each diagram’s purpose and label its relationships. For C4 views, state the view level and scope. Verify the diagram renders in the intended viewer and update it when the architecture changes.",
      "Speichere bearbeitbare Mermaid-Blöcke in versioniertem Markdown. Nenne den Zweck jedes Diagramms und beschrifte seine Beziehungen. Gib bei C4-Ansichten Ebene und Umfang an. Prüfe die Darstellung im vorgesehenen Dokumentationssystem und aktualisiere das Diagramm bei Architekturänderungen.",
    ),
  ),
];
