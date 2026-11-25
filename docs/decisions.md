# Implementation decisions

| Decision                                                                                                                                                       | Rationale and requirements                                                                                                              | Evidence to collect                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Publish a static browser app from `main` under the repository's GitHub Pages path.                                                                             | F01, F06 and I14 need clean-clone and export evidence. A static app can compose and export without a backend.                           | Built subpath browser tests, GitHub Actions, live site smoke test.                               |
| Start with English interface and output, light theme, and commits, 300-character messages, credential hygiene, and traceability selected.                      | F01, F07, F08, C06–C09 and C11. The vision leaves the limit open. The smaller strict bound is the default and 600 is selectable.        | Default assertions and browser walkthrough.                                                      |
| Track generated contributions by positional identity. Treat direct edits as authoritative. Preserve edited text when settings, language, or selections change. | F03–F06, F08 and F09. Text matching can remove an identical personal copy. A multi-rule cancellation should leave the editor untouched. | Unit tests with identical paragraphs, disjoint edits, cancellation, and byte comparisons.        |
| Include SemVer and CalVer choices. Offer opt-in executable-line coverage with 99% prefilled.                                                                   | C05 and C16. Project rules can choose their version scheme and exact coverage gate. This project's own gate is 95%.                     | Inspect both policy variants and run thresholds through the pipeline.                            |
| Keep drafts in the open tab. Publish on GitHub Pages.                                                                                                          | The requested workflow ends in copying or downloading the current text. The maintainer removed container distribution from scope.       | Verify exported text and production asset paths.                                                 |
| Defer the repository scan described in I12.                                                                                                                    | The vision places scanning in a later phase after trying the form and describes a separate scope decision.                              | Verify that adding a catalog entry needs no change to the editor.                                |
| Use automated Chromium, Firefox, and WebKit production smoke and workflow tests.                                                                               | F02, F06, F07, F08, and F10 depend on real browser behavior. Compare the declared targets with pipeline results.                        | Browser report for all three targets and Chromium unit and integration coverage report.          |
| Offer Select all and Select none above the rule categories. Select none keeps edited rules as custom text and reports how many were kept.                      | The maintainer asked for bulk selection on 2026-11-25. It extends F02 and follows the F05 rule for unchecking edited text.              | [Integration test](../test/app.test.ts) for both actions, edited text, status and German labels. |

## Delivery decisions

- The maintainer asked to work directly on `main`, push atomic Conventional
  Commits, and use SemVer. The initial workspace feature moved the version to
  0.1.0. Smaller changes increment the patch. The
  [staged-tree check](../scripts/checkStaged.sh) and
  [CI workflow](../.github/workflows/ci.yml) verify what is committed.
- The maintainer asked for a README and GitHub About modeled on
  [Boldemort](https://github.com/marcelpetrick/Boldemort). The
  [README](../README.md) uses linked workflow badges, identifies the license
  and toolchain, and shows a captured browser session.
- The maintainer requested subagents, an implementation plan, and project
  instructions. [plan.md](../plan.md) tracks delivery, [AGENTS.md](../AGENTS.md)
  records working rules, and
  [SHA-keyed review notes](requirements.md#review-and-deployment-evidence)
  preserve independent reproduction and findings.

## Counterexamples

- F03–F05: An identical authored paragraph can appear on either side of a generated rule, or an edit can replace a region spanning two rules. Toggle only the original contribution and check the surrounding characters.
- F05 and F08: Change the output language after editing two rules. Cancel, compare the full draft and controls, then confirm and compare the exact edited ranges again.
- F02 and F10: Reach all disclosures by mouse, keyboard, and touch. Opening a group must leave the draft unchanged.
- F06: Compare clipboard and download with the editor after adding German characters and blank lines.
- C13–C16: Review independent test selections, declared targets, and inclusive coverage thresholds. Use a surviving mutation to challenge an apparent coverage pass.
- I14: Build the named revision in a clean checkout using only documented prerequisites.
