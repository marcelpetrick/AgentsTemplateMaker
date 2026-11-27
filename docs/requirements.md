# Requirements and verification

The [vision](<../vision(20261125-195509).md>) defines the I, F, and C identifiers. M identifiers record later maintainer requests. The
[decision record](decisions.md) explains the defaults and records counterexamples.
The [implementation plan](../plan.md) follows the work from those decisions to
release verification.

## Maintainer inputs

The vision's I identifiers record what the maintainer asked for. Each is
traced to the F and C requirements that deliver it.

| ID  | Input                                       | Delivered by                                                                                      | Status               |
| --- | ------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------- |
| I1  | Start small, then expand                    | F01, F02, F09; released on GitHub Pages                                                           | Delivered            |
| I2  | Compose in a real text field                | F03, F04, F05, F06                                                                                | Delivered            |
| I3  | Accessible interface in the user's language | F07, F08                                                                                          | Delivered            |
| I4  | Explain choices in context                  | F02 tooltips; every catalog rule has bilingual help                                               | Delivered            |
| I5  | Decide how the agent operates               | C01–C03                                                                                           | Delivered            |
| I6  | Describe how software is built              | C04, C05, the languages and frameworks rule, and the character set rule                           | Delivered            |
| I7  | Make repository history useful              | C06–C09                                                                                           | Delivered            |
| I8  | Make instructions readable                  | C10                                                                                               | Delivered            |
| I9  | Connect goals, changes, and proof           | C06, C11                                                                                          | Delivered            |
| I10 | Catch errors early                          | C12, including the review loop after each plan change and iteration                               | Delivered            |
| I11 | Automate verification                       | C13–C16                                                                                           | Delivered            |
| I12 | Learn from existing repositories later      | Deferred, see [decisions](decisions.md)                                                           | Deferred by decision |
| I13 | Domain tools and dependencies               | C17, C18                                                                                          | Delivered            |
| I14 | Rebuild from source                         | C19, the [local pipeline](../localPipeline.sh), [staged check](../scripts/checkStaged.sh), and CI | Delivered            |
| I15 | Test first                                  | C20 and this project's own workflow                                                               | Delivered            |
| I16 | Architecture diagrams                       | C21, C22 and the [C4 views](architecture.md)                                                      | Delivered            |

## Later maintainer requests

| ID  | Request (2026-11-25)                                                                                                                                | Verification                                                                                        |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| M01 | Select all and Select none, globally and per category                                                                                               | [Integration tests](../test/app.test.ts)                                                            |
| M02 | Document language follows the interface language until the draft is edited                                                                          | [Integration test](../test/app.test.ts)                                                             |
| M03 | Word and character count below the draft                                                                                                            | [Unit](../test/stats.test.ts) and integration tests                                                 |
| M04 | Languages and frameworks, Unicode or ASCII, and review loops in the catalog                                                                         | [Catalog](../test/catalog.test.ts) and integration tests                                            |
| M05 | About section with author, contact, project, and libraries                                                                                          | [Unit](../test/about.test.ts) and integration tests                                                 |
| M06 | Pages deploys the tested build and smoke-checks the live site                                                                                       | [Pages workflow](../.github/workflows/pages.yml) smoke job                                          |
| M07 | README, license, release outputs, CI pipeline, and latest-release rules                                                                             | [Catalog tests](../test/catalog.test.ts) (C23–C26, C18)                                             |
| M08 | This project's releases attach the build, checksums, an SBOM, and a changelog                                                                       | [Release workflow](../.github/workflows/release.yml)                                                |
| M09 | Local pipeline script, container image decision, requirements engineering, automated acceptance tests, coverage as a floor, and a 95% mutation gate | [Catalog tests](../test/catalog.test.ts) (C27–C29) and [Stryker gate](../stryker.config.mjs)        |
| M10 | Undo restores the exact prior authorship and separators, also after form changes                                                                    | [Undo property test](../test/undoVisible.test.ts) and [editor history test](../test/editor.test.ts) |

## Form and document

| ID  | Delivered behavior and implementation                                                                                                                                                                                                                                                                                                                                                                        | Verification                                                                                                                                                                                                                                         |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F01 | The [catalog](../src/catalog.ts) preselects conventional and atomic commits, a strict limit under 300 characters, credential hygiene, and decision traceability. The [CI workflow](../.github/workflows/ci.yml) keeps the build it tested, and the [Pages workflow](../.github/workflows/pages.yml) publishes exactly that build at the [project URL](https://marcelpetrick.github.io/AgentsTemplateMaker/). | [Default and walkthrough tests](../e2e/compose.spec.ts) load the built project path. The [Pages smoke check](../scripts/smokePages.sh) confirms the live site serves the deployed commit through its `revision` meta tag.                            |
| F02 | [Catalog metadata](../src/catalog.ts) orders agent operating policy, software and technology, repository practices, and verification and architecture. The [form](../src/app.ts) exposes bilingual trade-offs on hover, focus, and tap.                                                                                                                                                                      | [Catalog structure tests](../test/catalog.test.ts), [tooltip integration tests](../test/app.test.ts), and [keyboard and touch walkthrough](../e2e/compose.spec.ts).                                                                                  |
| F03 | The [editor](../src/editor.ts) accepts direct input. The [draft model](../src/draft.ts) maps each generated paragraph by rule ID and range through edits.                                                                                                                                                                                                                                                    | [Draft tests](../test/draft.test.ts) update and cycle similar paragraphs independently. The [walkthrough](../e2e/compose.spec.ts) toggles untouched rules through the UI.                                                                            |
| F04 | The [draft model](../src/draft.ts) preserves authored text by position. The [editor decorators](../src/editor.ts) and [theme styles](../src/style.css) underline it in green and mark its starting line.                                                                                                                                                                                                     | [Draft tests](../test/draft.test.ts) paste identical text above and below a rule and preserve authored text and blank lines through settings changes. The [browser tests](../e2e/compose.spec.ts) check authorship in both themes.                   |
| F05 | The [form](../src/app.ts) warns when a rule is edited and keeps it as custom text on uncheck. Setting and language changes list affected edited rules before applying and preserve authored text even on confirmation.                                                                                                                                                                                       | [Integration tests](../test/app.test.ts) cover setting cancellation and approval, uncheck, and multiple edited rules. The [language walkthrough](../e2e/compose.spec.ts) compares the full draft and marks after cancellation.                       |
| F06 | Copy and Download in the [form](../src/app.ts) export current Markdown as clipboard text or a UTF-8 file named `AGENTS.md`.                                                                                                                                                                                                                                                                                  | The [clipboard test](../e2e/clipboard.chromium.spec.ts) and [download walkthrough](../e2e/compose.spec.ts) compare exported text with the editor after Unicode edits. The [integration test](../test/app.test.ts) checks clipboard failure feedback. |
| F07 | [Theme controls](../src/app.ts) switch between [light and dark palettes](../src/style.css), including document, focus, and authorship colors.                                                                                                                                                                                                                                                                | [Theme and selection integration test](../test/app.test.ts), [browser walkthrough](../e2e/compose.spec.ts), and the [manual walkthrough](#clean-clone-walkthrough).                                                                                  |
| F08 | The [interface strings](../src/strings.ts) and [generated paragraphs](../src/catalog.ts) support English and German. While the draft has no user edits, the document language follows the interface language. After edits, the two switch independently. The [form](../src/app.ts) recommends English for output and regenerates untouched paragraphs only.                                                  | [Catalog translation tests](../test/catalog.test.ts) and [language tests](../e2e/compose.spec.ts) cover following the interface language until the first edit, both mixed-language combinations, cancellation, and selective regeneration.           |
| F09 | The [catalog](../src/catalog.ts) supplies rule IDs, categories, text and settings to the same [form](../src/app.ts) and [draft model](../src/draft.ts).                                                                                                                                                                                                                                                      | [Catalog identity tests](../test/catalog.test.ts) and [generic rule fixtures](../test/draft.test.ts). In a temporary clone, add a rule with a new ID and both translations, then select, edit and export it through the same UI.                     |
| F10 | The [category controls](../src/app.ts) open on mouse hover and use native disclosures for click, keyboard and tap. Category interaction leaves the draft intact.                                                                                                                                                                                                                                             | The [walkthrough tests](../e2e/compose.spec.ts) hover from header to checkbox and open categories using a keyboard and a touch-enabled context.                                                                                                      |
| F11 | The [session store](../src/session.ts) saves the draft with its authorship, the selected rules and settings, and both languages to the browser's local storage after every change. The [form](../src/app.ts) restores them on load and offers Start over, which asks before discarding edits. Damaged or blocked storage starts a fresh draft.                                                               |
| F12 | The [form](../src/app.ts) ends each new draft with a generated footer naming AgentsTemplateMaker, the release version, and the project URL, in the document language. A restored untouched footer names the current version; a deleted footer stays deleted.                                                                                                                                                 |

## Instruction catalog

Each item in the [catalog](../src/catalog.ts) contributes one localized paragraph
when selected. The table gives the rule identity and what to verify in its
contribution. The [catalog tests](../test/catalog.test.ts) check unique IDs,
ordering, defaults, and one bilingual paragraph with bilingual help for every
setting. The [draft tests](../test/draft.test.ts) and
[form integration tests](../test/app.test.ts) verify independent insertion and
removal, including cases where authored text matches a generated paragraph.
Generated policies describe what agents should do in the target project.

| ID  | Rule ID and acceptance criterion                                                                                                                                                                                                                                                   | Additional evidence                                                                                                                                                                                       |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C01 | `delegation`. Unchecked omits the policy. Selected offers prohibition, independent review only, or parallel independent tasks and review. The help describes elapsed time, independent checking, and token use.                                                                    | [Delegation assertions](../test/catalog.test.ts) and [touch walkthrough](../e2e/compose.spec.ts).                                                                                                         |
| C02 | `model-choice`, `advisor`. Low-risk work can use a lower-cost model. The advisor recommends a course, obsolete guidance follows compatible stable releases and support policy, and people decide incompatible requests.                                                            | [Agent policy assertions](../test/catalog.test.ts).                                                                                                                                                       |
| C03 | `autonomy`. The selected policy defines when an agent can make a routine decision and when it needs user approval.                                                                                                                                                                 | [Agent policy assertions](../test/catalog.test.ts).                                                                                                                                                       |
| C04 | `technologies`, `open-source`. User-supplied technologies appear in the paragraph. Prefer open-source tools when feasible and honor explicit exceptions.                                                                                                                           | [Technology assertions](../test/catalog.test.ts) and [technology input integration test](../test/app.test.ts).                                                                                            |
| C05 | `versioning`. SemVer explains MAJOR, MINOR, and PATCH triggers. CalVer explains UTC year/month and the per-month sequence.                                                                                                                                                         | [Versioning assertions](../test/catalog.test.ts).                                                                                                                                                         |
| C06 | `commits`, `traceability`. The default combined rule demonstrates `fix(parser): handle an empty field` and names the change or requirement.                                                                                                                                        | [Default text assertions](../test/catalog.test.ts).                                                                                                                                                       |
| C07 | `commits`. One coherent topic may include its tests. Unrelated cleanup goes into a separate commit.                                                                                                                                                                                | [Default paragraph walkthrough](../e2e/compose.spec.ts).                                                                                                                                                  |
| C08 | `commit-limit`. The strict 300/600-character limits count subject, body, footers, and inner line breaks. The maxima are 299 and 599.                                                                                                                                               | [Both limits in the catalog](../test/catalog.test.ts) and [600-character walkthrough](../e2e/compose.spec.ts).                                                                                            |
| C09 | `credentials`. Keep secrets out of committed files, messages, examples, logs, and artifacts. Use placeholders in examples.                                                                                                                                                         | [Credential assertions](../test/catalog.test.ts). Use an example such as `SERVICE_TOKEN=<synthetic-placeholder>` to review how the exported instruction distinguishes project examples from live secrets. |
| C10 | `plain-language`. Use familiar words and concrete actions, explain terms, and say what completion looks like.                                                                                                                                                                      | [Bilingual paragraph checks](../test/catalog.test.ts).                                                                                                                                                    |
| C11 | `traceability`. Version-control decisions and rationale. Link each outcome to its requirement, implementation, acceptance check, and evidence. Use Git for timestamps.                                                                                                             | [Traceability assertions](../test/catalog.test.ts) and this requirement matrix.                                                                                                                           |
| C12 | `review`. Challenge requirements and every atomic commit with ambiguity, counterexample, failure, and evidence checks. Record dispositions outside the reviewed revision.                                                                                                          | [Bilingual paragraph checks](../test/catalog.test.ts) and [SHA-keyed review procedure](#review-and-deployment-evidence).                                                                                  |
| C13 | `unit-tests`, `integration-tests`, `e2e-tests`, `acceptance-tests`. Select isolation, boundary interactions, complete workflows, and agreed outcomes independently.                                                                                                                | [Unique rule IDs and independent paragraphs](../test/catalog.test.ts).                                                                                                                                    |
| C14 | `automation`. Automate repeatable checks, compare declared targets with CI results, and explain manual checks.                                                                                                                                                                     | [Target-matrix assertions](../test/catalog.test.ts) and [AgentsTemplateMaker target matrix](#target-matrix).                                                                                              |
| C15 | `mutation`. Deliberately change behavior, report surviving mutations, and examine missing assertions and equivalent behavior.                                                                                                                                                      | [Mutation text assertions](../test/catalog.test.ts).                                                                                                                                                      |
| C16 | `coverage`. The opt-in threshold starts at 99%. It measures executable lines in project-owned production code, documents exclusions, and compares the unrounded percentage inclusively.                                                                                            | [Coverage text assertions](../test/catalog.test.ts) and [valid and invalid threshold integration test](../test/app.test.ts).                                                                              |
| C17 | `lint-format`. Pick tools that fit the language. For Python, use Ruff for linting and Black for formatting. Use one formatter per language.                                                                                                                                        | [Tooling assertions](../test/catalog.test.ts).                                                                                                                                                            |
| C18 | `dependencies`. Pin resolved versions. The default uses the latest stable release of each library, framework, and toolchain and keeps it only when the full pipeline passes; the alternative takes compatible updates. Record deferrals against the blocking requirement or check. | [Dependency assertions](../test/catalog.test.ts).                                                                                                                                                         |
| C19 | `clean-pipeline`. Start from a clean clone, acquire pinned inputs, configure, build, run required jobs, and check all targets against their expected results.                                                                                                                      | [Pipeline text assertions](../test/catalog.test.ts) and [clean-clone walkthrough](#clean-clone-walkthrough).                                                                                              |
| C20 | `tdd`. Confirm a new test fails for the expected reason, make the smallest passing change, refactor, and rerun.                                                                                                                                                                    | [Bilingual paragraph checks](../test/catalog.test.ts) and [review evidence](#review-and-deployment-evidence).                                                                                             |
| C21 | `c4`. Start with system-context and container views, add details when a design question needs them, and verify relationships against the documented revision.                                                                                                                      | [Bilingual paragraph checks](../test/catalog.test.ts) and [AgentsTemplateMaker C4 views](architecture.md).                                                                                                |
| C22 | `mermaid`. Version-control Mermaid source in Markdown, label scope and relationships, and verify rendering in the intended viewer.                                                                                                                                                 | [Bilingual paragraph checks](../test/catalog.test.ts), [AgentsTemplateMaker C4 views](architecture.md), and the [Mermaid render check](../scripts/checkMermaid.mjs) in the pipeline.                      |
| C23 | `readme`. A root README.md with purpose, installation, usage, build, test, and license. Optional current screenshots and at least three badges: pipeline status, license, and latest release.                                                                                      | [README assertions](../test/catalog.test.ts).                                                                                                                                                             |
| C24 | `license`. Choose GPL, LGPL, AGPL, MPL, Apache, MIT, BSD, or proprietary. Keep LICENSE, SPDX headers, and compatible dependency licenses.                                                                                                                                          | [License assertions](../test/catalog.test.ts).                                                                                                                                                            |
| C25 | `release`. Release from a version tag through the pipeline and attach any of build artifacts, SHA-256 checksums, an SPDX or CycloneDX SBOM, and a changelog from Conventional Commits.                                                                                             | [Release assertions](../test/catalog.test.ts).                                                                                                                                                            |
| C26 | `ci-pipeline`. GitHub Actions or GitLab CI on every push and pull request builds and lints every language, including Markdown, shell, YAML, and the workflow files.                                                                                                                | [Pipeline assertions](../test/catalog.test.ts).                                                                                                                                                           |
| C27 | `requirements`. Requirements in Markdown with unique ID, source, priority, and testable acceptance criterion. Resolve ambiguity and conflicts first, record assumptions, map each requirement to its tests, and review on scope changes.                                           | [Requirements assertions](../test/catalog.test.ts).                                                                                                                                                       |
| C28 | `local-pipeline`. A root `localPipeline.sh` installs, configures, builds, and runs every test and check from a fresh clone, fails with a nonzero exit code, and is what CI calls. The deploy option runs only with `--deploy` after every step passed.                             | [Pipeline script assertions](../test/catalog.test.ts) and this project's [localPipeline.sh](../localPipeline.sh).                                                                                         |
| C29 | `release` container option, `acceptance-tests`, `coverage`. A container image when users run the project as a service or tool, otherwise a recorded decision. Acceptance checks are automated in the pipeline. The coverage minimum is a floor and untested lines are justified.   | [Release, acceptance, and coverage assertions](../test/catalog.test.ts).                                                                                                                                  |

The repository scan in I12 is a later vision phase. After maintainers use the
form on real projects, define which repositories and evidence may be examined
and review which rules proved viable. F09 supplies the extension point for
carrying those findings into the catalog.

## Target matrix

The release is one static build produced from the lockfile. These are the
declared test targets in [Playwright](../playwright.config.ts),
[Vitest](../vite.config.ts), and [GitHub Actions](../.github/workflows/ci.yml).

| Target                                | Evidence                                                                                                                                                                                                                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ubuntu 24.04 x86-64 in GitHub Actions | Runs [localPipeline.sh](../localPipeline.sh) with the pinned Node.js version and Playwright system libraries installed. Reproduces the frozen dependency install, shell syntax, Prettier, ESLint, TypeScript, tests with coverage, production build and browser journeys. |
| Playwright Chromium                   | Runs unit and integration tests under Vitest and compares the 95% executable-line gate. Runs the production journeys and the real clipboard check.                                                                                                                        |
| Playwright Firefox and WebKit         | Both run the production journeys at the project subpath, including download, language cancellation, theme, keyboard and touch. Playwright's automated clipboard permissions check runs on Chromium.                                                                       |
| GitHub Pages                          | Serves the verified static build under `/AgentsTemplateMaker/`. Verify the exact deployment revision and smoke-test the live application.                                                                                                                                 |

Run the same pipeline locally on a machine with the Playwright browser system
libraries available. Use the table and named browser results to detect any
missing target. Check focus visibility and legibility in both themes by opening
the site with a keyboard. In a browser with access to the OS clipboard, compare
the copied Markdown with the editor and with the downloaded file.

## Clean-clone walkthrough

Prerequisites are Git, Bash, the Node.js release in
[.node-version](../.node-version), its npm, registry and browser download access,
and the Playwright system libraries for the host. On Ubuntu 24.04, the pipeline
can install the libraries by setting `PLAYWRIGHT_INSTALL_SYSTEM_DEPS=1`. That
installation may require elevated privileges. Local checks and compilation use
no application secrets. Pages deployment uses GitHub Actions' built-in
`GITHUB_TOKEN` with Pages and OIDC permissions.

```sh
git clone https://github.com/marcelpetrick/AgentsTemplateMaker.git
cd AgentsTemplateMaker
git switch --detach <full-revision-sha>
./localPipeline.sh
npm run preview -- --base /AgentsTemplateMaker/
```

1. Open `http://127.0.0.1:4173/AgentsTemplateMaker/` in a fresh session. Check
   the default selection and paragraphs from F01.
2. Hover over **Repository practices**, move to its commit-message setting, and
   select 600. Add `Für dieses Projekt.` to that paragraph. Uncheck it and confirm
   the paragraph stays, its authored marker is visible, and the form explains
   the decision.
3. Add a separate paragraph with blank lines and Unicode. Change the interface
   language independently, switch themes, and confirm the draft and selection
   stay intact. Edit another generated rule and attempt to change document
   language. Cancel, compare the draft and marks, then repeat and approve.
   Confirm only untouched generated paragraphs change language.
4. Copy the draft, download `AGENTS.md`, and compare both with the current editor
   contents. Review the named Chromium, Firefox, and WebKit results and the line
   coverage report in `coverage/index.html`.

## Review and deployment evidence

Review records are keyed to the immutable commit SHA outside the reviewed tree.
CI run IDs and Pages deployment results provide hosted evidence. Fetch the
`refs/notes/verification` namespace to read independent review records alongside
their commits.

```sh
git fetch origin refs/notes/verification:refs/notes/verification
git notes --ref=verification show <full-revision-sha>
gh run list --commit <full-revision-sha> --workflow ci.yml
```

Each review record should name its revision, requirement IDs, prerequisites,
fixture, reproduction steps, expected and observed results, and disposition.
Record failed or unavailable checks against that revision. Reproduce fixes
against their own revisions.

Treat F01 as pending for each revision until the [Pages workflow
history](https://github.com/marcelpetrick/AgentsTemplateMaker/actions/workflows/pages.yml)
shows a successful deployment and smoke check of the reviewed commit and the
[live site](https://marcelpetrick.github.io/AgentsTemplateMaker/) passes the
default draft, edit, and export walkthrough.
