# agent: Agent operating policy / Arbeitsweise des Agenten

## delegation: Parallel sub-agents / Parallele Unteragenten

Help (en): Parallel work can save time and improve independent checking. Extra agents use more tokens and need coordination. Leave this unchecked to omit a delegation policy.

Help (de): Parallele Arbeit kann Zeit sparen und unabhängige Prüfungen verbessern. Zusätzliche Agenten verbrauchen mehr Tokens und brauchen Abstimmung. Ohne Auswahl wird keine Delegationsregel ausgegeben.

Setting (select, initial "prohibited"): Delegation scope / Erlaubte Delegation

- prohibited: Prohibit delegation / Delegation untersagen

- review: Independent review only / Nur unabhängige Prüfungen

- independent: Independent tasks and review / Unabhängige Aufgaben und Prüfungen

### Value "prohibited" (en)

Do not delegate work to sub-agents. Carry out implementation and verification in the main session.

### Value "prohibited" (de)

Delegiere keine Aufgaben an Unteragenten. Setze Änderungen um und prüfe sie in der Hauptsitzung.

### Value "review" (en)

Use sub-agents for independent review and counterexamples, and keep implementation in the main session. Give reviewers the requirement and revision, then assess their findings.

### Value "review" (de)

Setze Unteragenten für unabhängige Prüfungen und Gegenbeispiele ein. Behalte die Umsetzung in der Hauptsitzung. Nenne den Prüfern die Anforderung und den Commit. Bewerte danach ihre Befunde.

### Value "independent" (en)

Assign independent work and review to sub-agents in parallel when their scopes do not overlap. Give each agent a clear outcome and file scope. Integrate the results and run the combined checks in the main session.

### Value "independent" (de)

Verteile unabhängige Aufgaben und Prüfungen parallel an Unteragenten, wenn sich ihre Arbeitsbereiche nicht überschneiden. Gib jedem Agenten ein klares Ziel und einen abgegrenzten Dateibereich. Führe die Ergebnisse in der Hauptsitzung zusammen und prüfe sie dort.

## model-choice: Use lower-cost models / Günstigere Modelle einsetzen

Help (en): Cheaper models can reduce cost on bounded tasks. A model with weaker reasoning needs more supervision on ambiguous or high-risk work.

Help (de): Günstigere Modelle können bei klar begrenzten Aufgaben Kosten senken. Bei unklaren oder riskanten Aufgaben braucht ein schwächeres Modell mehr Aufsicht.

### Value "" (en)

Use a lower-cost model for clearly scoped, low-risk work such as listing references or applying a mechanical change with a clear check. Use a stronger model for unclear requirements, architecture, risky changes, and final review.

### Value "" (de)

Nutze ein günstigeres Modell für klar begrenzte Aufgaben mit geringem Risiko, etwa für eine Liste von Fundstellen oder für mechanische Änderungen mit eindeutiger Prüfung. Nutze ein stärkeres Modell für unklare Anforderungen, Architektur, riskante Änderungen und die Abschlussprüfung.

## advisor: Consult an advisor / Rat einholen

Help (en): An advisor adds another perspective when instructions conflict or age. Consultation takes time and the responsible person still owns the decision.

Help (de): Ein Berater liefert einen weiteren Blick auf widersprüchliche oder veraltete Vorgaben. Die Beratung kostet Zeit und die zuständige Person trägt weiterhin die Verantwortung.

### Value "" (en)

Ask an advisor for a recommendation when a project rule is unclear, conflicting, or clearly obsolete. The agent may replace obsolete guidance such as Python 2 with the latest compatible, supported stable release allowed by the project’s long-term support policy. Record the recommendation and reasoning. Ask a human to resolve incompatible stakeholder requirements or approve changes to required behavior.

### Value "" (de)

Bitte einen Berater um eine Empfehlung, wenn eine Projektregel unklar, widersprüchlich oder eindeutig veraltet ist. Der Agent darf veraltete Vorgaben wie Python 2 durch die neueste kompatible und noch unterstützte stabile Version ersetzen. Beachte die Regeln des Projekts für Langzeitunterstützung. Halte Empfehlung und Begründung fest. Bitte einen Menschen, unvereinbare Anforderungen zu klären oder Änderungen am geforderten Verhalten freizugeben.

## autonomy: Approval and autonomy / Freigaben und Eigenständigkeit

Help (en): Routine autonomy keeps work moving. Earlier approval gives maintainers more control and adds waiting time.

Help (de): Eigenständige Routineentscheidungen halten die Arbeit in Gang. Frühere Freigaben geben Verantwortlichen mehr Kontrolle und können die Arbeit verzögern.

Setting (select, initial "routine"): Decision policy / Entscheidungsregel

- routine: Allow routine decisions / Routineentscheidungen erlauben

- approval: Approve implementation decisions / Umsetzungsentscheidungen freigeben

### Value "routine" (en)

Make routine, reversible implementation decisions within the agreed scope, such as naming a private helper. Seek user approval before expanding scope, changing required behavior, publishing material, or taking an irreversible action.

### Value "routine" (de)

Triff umkehrbare Routineentscheidungen im vereinbarten Rahmen selbst, etwa bei der Benennung einer internen Hilfsfunktion. Bitte um Freigabe, bevor du den Umfang erweiterst, gefordertes Verhalten änderst, Inhalte veröffentlichst oder eine unumkehrbare Handlung ausführst.

### Value "approval" (en)

Ask for user approval before choosing an implementation approach, changing agreed behavior, publishing material, expanding scope, or taking an irreversible action. Make routine decisions within an approved approach, such as naming a local variable.

### Value "approval" (de)

Bitte um Freigabe, bevor du einen Lösungsweg auswählst, vereinbartes Verhalten änderst, Inhalte veröffentlichst, den Umfang erweiterst oder eine unumkehrbare Handlung ausführst. Triff Routineentscheidungen innerhalb eines freigegebenen Lösungswegs selbst, etwa bei der Benennung einer lokalen Variablen.

# software: Software and technology / Software und Technik

## technologies: Preferred technologies / Bevorzugte Technologien

Help (en): Naming the stack keeps new work consistent. A fixed preference makes changes to the stack an explicit decision.

Help (de): Ein benannter Technologiestapel hält neue Arbeit konsistent. Bei einer festen Vorgabe muss ein Wechsel bewusst entschieden werden.

Setting (text, initial ""): Project technologies / Projekttechnologien

### Value "" (en)

Follow the documented project technologies. Record any new technology and why it fits before introducing it.

### Value "" (de)

Nutze die dokumentierten Projekttechnologien. Halte vor der Einführung einer neuen Technologie fest, warum sie zum Projekt passt.

## languages: Languages and frameworks / Sprachen und Frameworks

Help (en): A fixed set of languages keeps the code base consistent and reviewable. Allowing domain-specific languages avoids forcing a general language onto a specialized task.

Help (de): Eine feste Auswahl an Sprachen hält den Code einheitlich und prüfbar. Spezifische Sprachen zuzulassen vermeidet, dass eine allgemeine Sprache eine Spezialaufgabe erzwingt.

Setting (multi, initial ""): Preferred languages / Bevorzugte Sprachen

- shell: Shell / Shell

- python: Python / Python

- c: C / C

- cpp: C++ / C++

- cmake: CMake / CMake

- qt: Qt / Qt

- lvgl: LVGL / LVGL

- touchgfx: TouchGFX / TouchGFX

- esp-idf: ESP-IDF / ESP-IDF

- freertos: FreeRTOS / FreeRTOS

- zephyr: Zephyr RTOS / Zephyr RTOS

- typescript: TypeScript / TypeScript

- javascript: JavaScript / JavaScript

- rust: Rust / Rust

- go: Go / Go

- java: Java / Java

- kotlin: Kotlin / Kotlin

- csharp: C# / C#

- sql: SQL / SQL

### Value "shell" (en)

Use these languages and frameworks: Shell. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "shell" (de)

Nutze diese Sprachen und Frameworks: Shell. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

### Value "python" (en)

Use these languages and frameworks: Python. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "python" (de)

Nutze diese Sprachen und Frameworks: Python. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

### Value "c" (en)

Use these languages and frameworks: C. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "c" (de)

Nutze diese Sprachen und Frameworks: C. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

### Value "cpp" (en)

Use these languages and frameworks: C++. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "cpp" (de)

Nutze diese Sprachen und Frameworks: C++. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

### Value "cmake" (en)

Use these languages and frameworks: CMake. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "cmake" (de)

Nutze diese Sprachen und Frameworks: CMake. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

### Value "qt" (en)

Use these languages and frameworks: Qt. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "qt" (de)

Nutze diese Sprachen und Frameworks: Qt. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

### Value "lvgl" (en)

Use these languages and frameworks: LVGL. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "lvgl" (de)

Nutze diese Sprachen und Frameworks: LVGL. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

### Value "touchgfx" (en)

Use these languages and frameworks: TouchGFX. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "touchgfx" (de)

Nutze diese Sprachen und Frameworks: TouchGFX. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

### Value "esp-idf" (en)

Use these languages and frameworks: ESP-IDF. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "esp-idf" (de)

Nutze diese Sprachen und Frameworks: ESP-IDF. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

### Value "freertos" (en)

Use these languages and frameworks: FreeRTOS. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "freertos" (de)

Nutze diese Sprachen und Frameworks: FreeRTOS. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

### Value "zephyr" (en)

Use these languages and frameworks: Zephyr RTOS. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "zephyr" (de)

Nutze diese Sprachen und Frameworks: Zephyr RTOS. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

### Value "typescript" (en)

Use these languages and frameworks: TypeScript. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "typescript" (de)

Nutze diese Sprachen und Frameworks: TypeScript. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

### Value "javascript" (en)

Use these languages and frameworks: JavaScript. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "javascript" (de)

Nutze diese Sprachen und Frameworks: JavaScript. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

### Value "rust" (en)

Use these languages and frameworks: Rust. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "rust" (de)

Nutze diese Sprachen und Frameworks: Rust. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

### Value "go" (en)

Use these languages and frameworks: Go. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "go" (de)

Nutze diese Sprachen und Frameworks: Go. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

### Value "java" (en)

Use these languages and frameworks: Java. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "java" (de)

Nutze diese Sprachen und Frameworks: Java. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

### Value "kotlin" (en)

Use these languages and frameworks: Kotlin. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "kotlin" (de)

Nutze diese Sprachen und Frameworks: Kotlin. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

### Value "csharp" (en)

Use these languages and frameworks: C#. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "csharp" (de)

Nutze diese Sprachen und Frameworks: C#. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

### Value "sql" (en)

Use these languages and frameworks: SQL. When a task clearly needs a more domain-specific language, such as a query, shader, build, or hardware description language, use it and record why.

### Value "sql" (de)

Nutze diese Sprachen und Frameworks: SQL. Wenn eine Aufgabe eindeutig eine spezifischere Sprache braucht, etwa eine Abfrage-, Shader-, Build- oder Hardwarebeschreibungssprache, nutze sie und halte fest, warum.

## open-source: Prefer open-source tools / Quelloffene Werkzeuge bevorzugen

Help (en): Open-source tools are inspectable and can reduce vendor dependence. A project may still need a proprietary tool for compatibility or support.

Help (de): Quelloffene Werkzeuge lassen sich prüfen und können die Abhängigkeit von Anbietern verringern. Für Kompatibilität oder Support kann ein Projekt ein proprietäres Werkzeug brauchen.

### Value "" (en)

Prefer open-source tools where feasible. Honor explicit exceptions from the project or user, and record why an exception is needed.

### Value "" (de)

Bevorzuge nach Möglichkeit quelloffene Werkzeuge. Beachte ausdrückliche Ausnahmen des Projekts oder des Nutzers und halte fest, warum eine Ausnahme nötig ist.

## character-set: Character set / Zeichensatz

Help (en): Unicode supports every script and the names people actually use. An ASCII-only rule avoids encoding problems in older toolchains and embedded targets but excludes other scripts.

Help (de): Unicode unterstützt alle Schriften und die Namen, die Menschen tatsächlich verwenden. Eine Beschränkung auf ASCII vermeidet Kodierungsprobleme in älteren Werkzeugketten und eingebetteten Zielen, schließt aber andere Schriften aus.

Setting (select, initial "unicode"): Allowed characters / Erlaubte Zeichen

- unicode: Unicode (UTF-8) / Unicode (UTF-8)

- ascii: ASCII only / Nur ASCII

### Value "unicode" (en)

Write Unicode-compliant code. Read and write text as UTF-8. Do not assume one byte or one code point per visible character: count, cut, and compare text by grapheme where users see it, and normalize text before comparing it. Test with accents, non-Latin scripts, and emoji.

### Value "unicode" (de)

Schreibe Unicode-konformen Code. Lies und schreibe Text als UTF-8. Gehe nicht davon aus, dass ein sichtbares Zeichen einem Byte oder einem Code Point entspricht: Zähle, kürze und vergleiche Text dort nach Graphemen, wo Nutzer ihn sehen, und normalisiere Text vor Vergleichen. Teste mit Akzenten, nicht lateinischen Schriften und Emoji.

### Value "ascii" (en)

Restrict source code, identifiers, comments, file names, and generated text to ASCII characters. Replace typographic quotes, dashes, and symbols with ASCII equivalents. Record any exception an external format or user requirement needs.

### Value "ascii" (de)

Beschränke Quellcode, Bezeichner, Kommentare, Dateinamen und erzeugten Text auf ASCII-Zeichen. Ersetze typografische Anführungszeichen, Striche und Symbole durch ASCII-Entsprechungen. Halte jede Ausnahme fest, die ein externes Format oder eine Nutzeranforderung verlangt.

## versioning: Version numbering / Versionsnummern

Help (en): A consistent version policy clarifies what a release means. Semantic Versioning signals compatibility, while Calendar Versioning makes the release date visible.

Help (de): Eine einheitliche Regel macht die Bedeutung einer Version klar. Semantic Versioning zeigt Kompatibilität, Calendar Versioning den Veröffentlichungszeitraum.

Setting (select, initial "semver"): Versioning scheme / Versionierungsschema

- semver: Semantic Versioning / Semantische Versionierung

- calver: Calendar Versioning / Kalenderversionierung

### Value "semver" (en)

Use Semantic Versioning for releases. Bump MAJOR for an incompatible public API change, MINOR for backward-compatible functionality, and PATCH for backward-compatible fixes. Update the version and release notes when preparing a release.

### Value "semver" (de)

Nutze Semantic Versioning für Releases. Erhöhe MAJOR bei inkompatiblen Änderungen an der öffentlichen Schnittstelle, MINOR bei rückwärtskompatiblen Funktionen und PATCH bei rückwärtskompatiblen Korrekturen. Aktualisiere Version und Versionshinweise bei der Vorbereitung eines Releases.

### Value "calver" (en)

Use Calendar Versioning in YYYY.MM.PATCH format. At release time use the year and month in UTC, start PATCH at 0 for the first release of that month, and increment PATCH for each later release in the same month.

### Value "calver" (de)

Nutze Calendar Versioning im Format YYYY.MM.PATCH. Verwende bei der Veröffentlichung das Jahr und den Monat in UTC. Beginne beim ersten Release des Monats mit PATCH 0 und erhöhe PATCH bei jedem weiteren Release im selben Monat.

## lint-format: Lint and format / Linting und Formatierung

Help (en): A linter catches common errors and a formatter removes style decisions. Two formatters can repeatedly undo each other’s changes.

Help (de): Ein Linter findet häufige Fehler und ein Formatierer sorgt für einen einheitlichen Stil. Zwei Formatierer können ihre Änderungen gegenseitig rückgängig machen.

### Value "" (en)

Use established tools for the project’s language. For Python, use Ruff for linting and Black for formatting. Choose one formatter per language to avoid conflicting rewrites, and run lint and format checks in the pipeline.

### Value "" (de)

Nutze etablierte Werkzeuge für die Projektsprache. Setze bei Python Ruff für Linting und Black für Formatierung ein. Wähle pro Sprache einen Formatierer, damit sich Änderungen nicht widersprechen. Prüfe Linting und Formatierung in der Pipeline.

## dependencies: Pin and review dependencies / Abhängigkeiten fixieren und prüfen

Help (en): Pinned versions make builds repeatable. Regular update checks take time and prevent pins from silently growing stale.

Help (de): Fixierte Versionen machen Builds reproduzierbar. Regelmäßige Prüfungen kosten Zeit und verhindern, dass festgelegte Versionen unbemerkt veralten.

### Value "" (en)

Pin exact resolved dependency versions in version-controlled files. Review them regularly and take compatible updates after verification. For each deferred update, record the requirement or failing check that blocks it.

### Value "" (de)

Fixiere die aufgelösten Versionen der Abhängigkeiten in versionierten Dateien. Prüfe sie regelmäßig und übernimm kompatible Updates nach erfolgreicher Prüfung. Halte bei jedem verschobenen Update fest, welche Anforderung oder fehlgeschlagene Prüfung es blockiert.

# repository: Repository practices / Regeln für das Repository

## commits: Conventional and atomic commits / Conventional Commits und atomare Commits

Help (en): Small, descriptive commits make review and reversal easier. Splitting unrelated work takes staging effort.

Help (de): Kleine, aussagekräftige Commits erleichtern Prüfung und Rücknahme. Das Aufteilen unabhängiger Änderungen kostet etwas Aufwand beim Staging.

### Value "" (en)

Use Conventional Commits, for example `fix(parser): handle an empty field`. Keep each commit to one coherent change, include its tests, and put unrelated cleanup in a separate commit. Name the change and reference its requirement when one exists.

### Value "" (de)

Nutze Conventional Commits, zum Beispiel `fix(parser): handle an empty field`. Beschränke jeden Commit auf eine zusammenhängende Änderung samt Tests. Räume unabhängige Stellen in einem eigenen Commit auf. Benenne die Änderung und verweise auf ihre Anforderung, wenn es eine gibt.

## commit-limit: Commit message limit / Länge der Commit-Nachricht

Help (en): A strict limit keeps history scannable. 600 characters leave more room for rationale than 300.

Help (de): Eine feste Grenze hält den Verlauf übersichtlich. 600 Zeichen lassen mehr Platz für Begründungen als 300.

Setting (select, initial "300"): Full message length / Länge der gesamten Nachricht

- 300: Under 300 characters / Unter 300 Zeichen

- 600: Under 600 characters / Unter 600 Zeichen

### Value "300" (en)

Keep the full commit message under 300 characters. Count the subject, body, footers, and all internal line breaks, including blank lines. The maximum is 299 characters.

### Value "300" (de)

Schreibe die gesamte Commit-Nachricht mit weniger als 300 Zeichen. Zähle Betreff, Nachrichtentext, Fußzeilen und alle inneren Zeilenumbrüche einschließlich Leerzeilen. Erlaubt sind höchstens 299 Zeichen.

### Value "600" (en)

Keep the full commit message under 600 characters. Count the subject, body, footers, and all internal line breaks, including blank lines. The maximum is 599 characters.

### Value "600" (de)

Schreibe die gesamte Commit-Nachricht mit weniger als 600 Zeichen. Zähle Betreff, Nachrichtentext, Fußzeilen und alle inneren Zeilenumbrüche einschließlich Leerzeilen. Erlaubt sind höchstens 599 Zeichen.

## credentials: Credential hygiene / Schutz von Zugangsdaten

Help (en): Keeping secrets out of project material prevents accidental disclosure. Real credentials must be configured separately.

Help (de): Wenn Zugangsdaten außerhalb der Projektunterlagen bleiben, werden sie seltener versehentlich offengelegt. Echte Zugangsdaten müssen separat eingerichtet werden.

### Value "" (en)

Keep credentials out of committed files, commit messages, examples, logs, and generated artifacts. Use placeholders in examples and configure real secrets through the project’s approved secret store.

### Value "" (de)

Halte Zugangsdaten aus eingecheckten Dateien, Commit-Nachrichten, Beispielen, Protokollen und erzeugten Artefakten heraus. Verwende Platzhalter in Beispielen und hinterlege echte Zugangsdaten im dafür vorgesehenen Geheimnisspeicher des Projekts.

## plain-language: Plain-language instructions / Anleitungen in klarer Sprache

Help (en): Direct wording makes instructions easier for people and agents to follow. It takes editing to remove jargon while keeping necessary detail.

Help (de): Direkte Formulierungen helfen Menschen und Agenten beim Befolgen von Anweisungen. Fachjargon zu entfernen und nötige Details zu erhalten, kostet Überarbeitung.

### Value "" (en)

Write instructions like a flight manual. Use familiar words, short sentences, and concrete actions. Explain unfamiliar terms when they are needed, and state how the reader can see that each action is complete.

### Value "" (de)

Schreibe Anleitungen wie ein Flughandbuch. Nutze vertraute Wörter, kurze Sätze und konkrete Handlungen. Erkläre notwendige Fachbegriffe und beschreibe, woran man erkennt, dass ein Schritt abgeschlossen ist.

## traceability: Decision traceability / Nachvollziehbare Entscheidungen

Help (en): A documented chain preserves why a change exists and how to check it. It takes upkeep as decisions and evidence evolve.

Help (de): Eine dokumentierte Kette hält fest, warum es eine Änderung gibt und wie man sie prüft. Sie muss bei neuen Entscheidungen und Nachweisen gepflegt werden.

### Value "" (en)

Record new user inputs and decisions in version-controlled Markdown under the project’s documentation directory. Link the intended outcome and decision rationale to a stable requirement, its implementation, an acceptance check, and the evidence. Use Git for the timestamp and make the checks reproducible from a clean checkout. Name the affected requirement ID in each commit message that implements or changes it.

### Value "" (de)

Halte neue Nutzervorgaben und Entscheidungen in versioniertem Markdown im Dokumentationsverzeichnis fest. Verknüpfe das gewünschte Ergebnis und die Begründung mit einer stabilen Anforderungskennung, der Umsetzung, einer Abnahmeprüfung und ihrem Nachweis. Nutze Git für den Zeitstempel und mache die Prüfungen aus einem sauberen Checkout nachvollziehbar. Nenne in jeder Commit-Nachricht, die eine Anforderung umsetzt oder ändert, deren Kennung.

## review: Challenge requirements and commits / Anforderungen und Commits hinterfragen

Help (en): Early scrutiny can catch mistaken goals and unsupported claims. Reviewing each commit costs time and requires independent evidence.

Help (de): Frühe Prüfung kann falsche Ziele und unbelegte Behauptungen aufdecken. Die Prüfung jedes Commits kostet Zeit und braucht unabhängige Nachweise.

### Value "" (en)

Challenge requirements before implementation and review every atomic commit. Look for ambiguous goals, counterexamples, missing failure cases, and unsupported claims. Record the reviewed commit SHA, findings, evidence, and how each finding was resolved outside that commit. Reproduce the checks independently from a clean checkout when possible and mark any unverified claim. After each planning change and each implementation iteration, check that the result still fits the requirements and the plan, and repeat the review until it does or a person decides.

### Value "" (de)

Hinterfrage Anforderungen vor der Umsetzung und prüfe jeden atomaren Commit. Suche unklare Ziele, Gegenbeispiele, fehlende Fehlerfälle und unbelegte Behauptungen. Halte Commit-SHA, Befunde, Nachweise und den Umgang mit jedem Befund außerhalb des geprüften Commits fest. Wiederhole die Prüfungen möglichst unabhängig aus einem sauberen Checkout und kennzeichne ungeprüfte Aussagen. Prüfe nach jeder Planungsänderung und jedem Umsetzungsschritt, ob das Ergebnis noch zu den Anforderungen und zum Plan passt, und wiederhole die Prüfung, bis es passt oder ein Mensch entscheidet.

# verification: Verification and architecture / Prüfung und Architektur

## unit-tests: Unit tests / Unit-Tests

Help (en): Isolated tests give fast feedback and pinpoint failures. They leave interactions between modules to other checks.

Help (de): Isolierte Tests liefern schnell Rückmeldung und grenzen Fehler ein. Das Zusammenspiel der Module wird durch andere Prüfungen abgedeckt.

### Value "" (en)

Write unit tests for isolated behavior. Check important results, edge cases, and errors with small, repeatable inputs.

### Value "" (de)

Schreibe Unit-Tests für isoliertes Verhalten. Prüfe wichtige Ergebnisse, Grenzfälle und Fehler mit kleinen, wiederholbaren Eingaben.

## integration-tests: Integration tests / Integrationstests

Help (en): Integration tests catch mismatched assumptions across boundaries. Their fixtures and dependencies take more setup.

Help (de): Integrationstests finden widersprüchliche Annahmen an Schnittstellen. Testdaten und Abhängigkeiten brauchen mehr Vorbereitung.

### Value "" (en)

Write integration tests for interactions across real module, process, or storage boundaries. Use controlled fixtures and verify the inputs, outputs, and failures on each side of the boundary.

### Value "" (de)

Schreibe Integrationstests für das Zusammenspiel an echten Modul-, Prozess- oder Speichergrenzen. Nutze kontrollierte Testdaten und prüfe Eingaben, Ausgaben und Fehler auf beiden Seiten der Schnittstelle.

## e2e-tests: End-to-end tests / End-to-End-Tests

Help (en): Complete journeys catch wiring and deployment mistakes that smaller tests miss. They take longer and are costlier to maintain.

Help (de): Vollständige Abläufe finden Fehler im Zusammenspiel und in der Bereitstellung, die kleinere Tests übersehen. Sie dauern länger und brauchen mehr Pflege.

### Value "" (en)

Run end-to-end tests through the normal entry point of a built application. Follow a complete user journey and check its final result and important failure paths.

### Value "" (de)

Führe End-to-End-Tests über den normalen Einstiegspunkt der gebauten Anwendung aus. Folge einem vollständigen Benutzerablauf und prüfe das Endergebnis und wichtige Fehlerpfade.

## acceptance-tests: Acceptance tests / Abnahmetests

Help (en): Acceptance tests connect observable behavior to what the user needs. They require agreement on the outcome and its evidence.

Help (de): Abnahmetests verbinden beobachtbares Verhalten mit dem gewünschten Ergebnis. Ergebnis und Nachweis müssen zuvor vereinbart werden.

### Value "" (en)

Agree on an observable acceptance check for each user outcome. Run it under the stated conditions and link the result to its requirement.

### Value "" (de)

Vereinbare für jedes gewünschte Nutzerergebnis eine beobachtbare Abnahmeprüfung. Führe sie unter den vereinbarten Bedingungen aus und verknüpfe das Ergebnis mit der Anforderung.

## automation: Automate checks on all targets / Prüfungen für alle Ziele automatisieren

Help (en): Automation gives repeatable evidence and exposes platform gaps. More targets add CI time and maintenance.

Help (de): Automatisierung liefert wiederholbare Nachweise und deckt Lücken zwischen Plattformen auf. Mehr Ziele kosten Laufzeit und Pflege in der CI.

### Value "" (en)

Prefer repeatable automated checks. Start with the project’s declared list of supported build targets, then compare it with CI jobs and their results. Build and test each supported target, flag missing or skipped results, and document any manual checks and why they remain.

### Value "" (de)

Bevorzuge wiederholbare automatisierte Prüfungen. Gleiche die dokumentierte Liste unterstützter Build-Ziele mit den CI-Jobs und ihren Ergebnissen ab. Baue und teste jedes unterstützte Ziel, kennzeichne fehlende oder übersprungene Ergebnisse und begründe verbleibende manuelle Prüfungen.

## mutation: Mutation testing / Mutationstests

Help (en): Mutation testing shows whether assertions detect wrong behavior. It reruns tests many times and some surviving mutations may be equivalent changes.

Help (de): Mutationstests zeigen, ob Prüfungen falsches Verhalten erkennen. Sie wiederholen Tests häufig und manche überlebenden Mutationen ändern das beobachtbare Verhalten nicht.

### Value "" (en)

Run mutation testing on unit tests by deliberately changing behavior, including known return values. Report surviving mutations and investigate whether they expose missing assertions or equivalent behavior.

### Value "" (de)

Prüfe Unit-Tests mit Mutationstests, indem du Verhalten gezielt änderst, etwa bekannte Rückgabewerte. Melde überlebende Mutationen und untersuche, ob Prüfbedingungen fehlen oder ob das Verhalten gleichwertig bleibt.

## coverage: Minimum line coverage / Mindest-Zeilenabdeckung

Help (en): A minimum exposes untested code. Reaching a high number takes effort and still leaves assertion quality to review.

Help (de): Ein Mindestwert zeigt ungetesteten Code. Ein hoher Wert kostet Aufwand und die Aussagekraft der Prüfbedingungen muss weiterhin bewertet werden.

Setting (percent, initial "99"): Minimum percentage / Mindestwert in Prozent

### Value "99" (en)

Require at least 99% executable-line coverage of project-owned production source. Exclude tests, dependencies, and generated outputs. Document and justify any further exclusions before enabling the gate. Join coverage from the required suites and compare executed lines divided by eligible lines without rounding. Fail below the minimum and pass at or above it.

### Value "99" (de)

Fordere mindestens 99 % Abdeckung der ausführbaren Zeilen im eigenen Produktionscode. Schließe Tests, Abhängigkeiten und generierte Ausgaben aus. Dokumentiere und begründe weitere Ausnahmen, bevor du den Mindestwert verbindlich prüfst. Führe die Ergebnisse der erforderlichen Testsuiten zusammen und vergleiche den Anteil ausgeführter Zeilen ohne Rundung. Der Wert muss mindestens dem Grenzwert entsprechen.

## clean-pipeline: Rebuild from a clean clone / Aus einem sauberen Klon bauen

Help (en): A clean build exposes hidden dependencies and untracked inputs. Installing prerequisites from scratch takes time.

Help (de): Ein sauberer Build deckt versteckte Abhängigkeiten und unversionierte Eingaben auf. Das Einrichten aller Voraussetzungen dauert länger.

### Value "" (en)

Start from a clean clone. Obtain pinned dependencies, configure the environment, build from repository sources, run every applicable pipeline job, and inspect the results for all declared targets. Document external prerequisites and required secret names, and run without relying on a developer machine or untracked files.

### Value "" (de)

Beginne mit einem sauberen Klon. Installiere fixierte Abhängigkeiten, richte die Umgebung ein, baue aus den versionierten Quellen, führe alle zutreffenden Pipeline-Jobs aus und prüfe die Ergebnisse für jedes angegebene Ziel. Dokumentiere externe Voraussetzungen und die Namen benötigter Geheimnisse. Verlasse dich weder auf einen Entwicklerrechner noch auf unversionierte Dateien.

## tdd: Test-driven development / Testgetriebene Entwicklung

Help (en): A failing test proves the test can detect the missing behavior. Writing it first costs time and can expose an unclear requirement early.

Help (de): Ein fehlschlagender Test zeigt, dass er das fehlende Verhalten erkennt. Ihn zuerst zu schreiben kostet Zeit und kann unklare Anforderungen früh sichtbar machen.

### Value "" (en)

For each new behavior or defect, write one test first and confirm that it fails for the expected reason. Make the smallest change that passes it, then refactor and rerun the relevant suite. Keep the test runnable against both the prior and changed behavior.

### Value "" (de)

Schreibe für jedes neue Verhalten und jeden Fehler zuerst einen Test. Prüfe, dass er aus dem erwarteten Grund fehlschlägt. Setze die kleinste passende Änderung um, räume danach den Code auf und wiederhole die betroffene Testsuite. Halte den Test mit dem alten und dem neuen Verhalten ausführbar.

## c4: C4 architecture views / C4-Architekturansichten

Help (en): C4 views explain system boundaries and responsibilities. Each extra level requires upkeep as the architecture changes.

Help (de): C4-Ansichten erklären Systemgrenzen und Zuständigkeiten. Jede weitere Ebene muss bei Architekturänderungen gepflegt werden.

### Value "" (en)

Document the architecture with C4. Start with a system context view showing users, the system boundary, and external systems. Use a container view for applications, data stores, and their responsibilities. Add component or code views when a design question needs them, and verify every relationship against the documented design or revision.

### Value "" (de)

Dokumentiere die Architektur mit C4. Beginne mit einer Systemkontextansicht für Nutzer, Systemgrenze und externe Systeme. Zeige in einer Containeransicht Anwendungen, Datenspeicher und Zuständigkeiten. Ergänze Komponenten- oder Codeansichten bei Bedarf und gleiche jede Beziehung mit dem dokumentierten Entwurf oder Commit ab.

## mermaid: Mermaid source diagrams / Diagramme als Mermaid-Quelltext

Help (en): Mermaid diagrams can be reviewed with the code. Their rendering depends on the documentation viewer.

Help (de): Mermaid-Diagramme lassen sich zusammen mit dem Code prüfen. Ihre Darstellung hängt vom Dokumentationssystem ab.

### Value "" (en)

Keep editable Mermaid blocks in version-controlled Markdown. State each diagram’s purpose and label its relationships. For C4 views, state the view level and scope. Verify the diagram renders in the intended viewer and update it when the architecture changes.

### Value "" (de)

Speichere bearbeitbare Mermaid-Blöcke in versioniertem Markdown. Nenne den Zweck jedes Diagramms und beschrifte seine Beziehungen. Gib bei C4-Ansichten Ebene und Umfang an. Prüfe die Darstellung im vorgesehenen Dokumentationssystem und aktualisiere das Diagramm bei Architekturänderungen.
