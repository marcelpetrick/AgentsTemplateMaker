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
- [ ] Quality tooling: complexity and function-size limits, stricter static analysis, and mutation testing in the pipeline.
- [ ] Close the gaps from the vision audit: requirement rows for I1–I16, content assertions, and deployment of the tested build.
- [ ] Review the whole project, then publish a public GitHub release and deploy it.

The [original handoff](<vision(20261125-195509).md>) defines the F and C requirement
IDs. The [baseline](docs/decisions.md) records the decisions that resolve its open
choices and the counterexamples that guide implementation.
