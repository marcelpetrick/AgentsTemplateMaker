# Implementation plan

- [x] Challenge the requirements and record baseline decisions.
- [x] Establish the local test and build pipeline and run it in GitHub Actions.
- [x] Test and implement the bilingual catalog and positional authorship model.
- [x] Integrate the editable document, accessible controls, language changes, and export.
- [x] Test complete user journeys, capture the actual UI, and publish to GitHub Pages.
- [x] Review the entire delivered change, verify a clean checkout and the live site, and update GitHub About.

## Maintainer requests of 2026-11-25

- [x] Select all and Select none, globally and per category.
- [x] Document language follows the interface language until the draft is edited.
- [x] Word and character count below the draft.
- [x] Languages and frameworks rule, Character set rule, and a review loop after each plan change and iteration.
- [x] Quality tooling: complexity and function-size limits, stricter static analysis, Mermaid render checks, and mutation testing in the pipeline.
- [x] Close the gaps from the vision audit: requirement rows for I1–I16, wording snapshot, C06 commit traceability, and deployment of the tested build.
- [x] Review the whole project, then publish a public GitHub release and deploy it.

## Maintainer requests of 2026-11-26

- [x] README rule with screenshots and at least three badges.
- [x] Build and lint pipeline rule covering every language, including Markdown.
- [x] Dependency rule uses the latest stable library and framework releases.
- [x] Selectable license.
- [x] Release outputs: artifacts, checksums, SBOM, and changelog, also for this project's own releases.
- [x] Local pipeline script rule with an optional guarded deploy step.
- [x] Container image release option; record that AgentsTemplateMaker, a static site, needs none.
- [x] Requirements engineering rule; automated acceptance checks; coverage as a floor.
- [x] Raise the mutation score and gate to at least 95%.
- [x] Undo restores the exact prior authorship and separators.
- [x] Keep the draft across reloads and new tabs; Start over returns to the defaults (F11).
- [x] Footer line naming AgentsTemplateMaker, its version, and the project URL (F12).
- [x] One product name, AgentsTemplateMaker, in code, interface, and documents.

The [original handoff](<vision(20261125-195509).md>) defines the F and C requirement
IDs. The [baseline](docs/decisions.md) records the decisions that resolve its open
choices and the counterexamples that guide implementation.
