# Code quality gates

The maintainer asked for Clean Code and SOLID limits that a machine checks: small
functions, low branching, and static analysis in the pipeline. Every gate below
runs in [`localPipeline.sh`](../localPipeline.sh), so the
[CI workflow](../.github/workflows/ci.yml) and `./scripts/checkStaged.sh` enforce
it too. A gate fails the pipeline. None of them only warns.

## Lint

`npm run lint` runs ESLint with `--max-warnings 0` and type information from
`tsconfig.json` (`parserOptions.projectService`). The
[configuration](../eslint.config.mjs) combines:

- `@eslint/js` recommended rules.
- typescript-eslint `strictTypeChecked` and `stylisticTypeChecked`.
- `eslint-plugin-sonarjs` recommended rules, including cognitive complexity.
- `eslint-plugin-unicorn` recommended rules.

Size and branching limits for production code:

| Rule                           | Limit | Why                                                                 |
| ------------------------------ | ----- | ------------------------------------------------------------------- |
| `complexity`                   | 8     | Few independent paths keep a function testable with few cases.      |
| `sonarjs/cognitive-complexity` | 10    | Penalizes nesting and broken flow that `complexity` does not see.   |
| `max-depth`                    | 3     | Deep blocks hide the main path. Extract or return early instead.    |
| `max-params`                   | 4     | Group related values in an object when a function needs more.       |
| `max-statements`               | 15    | One function, one level of abstraction.                             |
| `max-lines-per-function`       | 40    | Counted without blank lines and comments. A function fits a screen. |
| `max-nested-callbacks`         | 3     | Name a nested callback instead of stacking anonymous ones.          |
| `no-nested-ternary`            | on    | Nested conditions read better as statements or a lookup.            |

Tests are scenarios, so `test/` and `e2e/` skip the line and statement limits,
allow five nested callbacks, and allow a few test idioms such as empty mock
bodies and non-null assertions on fixture lookups. Complexity, depth, and
parameter limits still apply to tests.

Rules that are off, and why:

- `unicorn/prevent-abbreviations`, `unicorn/no-null`,
  `unicorn/no-useless-undefined`: DOM and CodeMirror APIs use these names and
  values. Renaming them adds churn without clarity.
- `unicorn/filename-case` requires camelCase, the project's existing style.
- `unicorn/consistent-boolean-name`: names such as `checked` and `edited`
  mirror DOM and draft fields.
- `unicorn/consistent-class-member-order`: classes list public members first
  and the private helpers they call afterwards (the step-down rule).
- `unicorn/single-line-block-comment-style`,
  `unicorn/no-asterisk-prefix-in-documentation-comments`: keep conventional
  JSDoc comments.
- `unicorn/prefer-query-selector`: `getElementById` needs no selector escaping.
- `unicorn/consistent-function-scoping` ignores arrow functions, so short
  callbacks can stay next to the data they transform.
- `@typescript-eslint/restrict-template-expressions` allows numbers, and
  `@typescript-eslint/no-confusing-void-expression` allows arrow shorthand.

One inline exception exists. CodeMirror's `iterChanges` callback takes five
parameters, so `src/draft.ts` disables `max-params` for that single callback
and converts each change into an object for the rest of the module.

The TypeScript library target is ES2023 so code can use non-mutating
`Array#toSorted`. The supported browsers in the end-to-end suite all provide it.

## Structure

The refactoring for these limits split the former 350-line `mount()` into
modules with one responsibility each:

| Module                                            | Responsibility                                               |
| ------------------------------------------------- | ------------------------------------------------------------ |
| [`app.ts`](../src/app.ts)                         | Workspace state, rendering, and event wiring.                |
| [`ruleControls.ts`](../src/ruleControls.ts)       | Category groups, rule rows, and hover preview of categories. |
| [`settingControls.ts`](../src/settingControls.ts) | Select, text, percent, and checkbox-group setting inputs.    |
| [`helpTooltips.ts`](../src/helpTooltips.ts)       | Showing, pinning, and dismissing rule explanations.          |
| [`confirmDialog.ts`](../src/confirmDialog.ts)     | Confirmation before a change touches edited rules.           |
| [`exportDraft.ts`](../src/exportDraft.ts)         | Clipboard copy and Markdown download.                        |
| [`messages.ts`](../src/messages.ts)               | Localized status messages.                                   |
| [`dom.ts`](../src/dom.ts)                         | Typed element lookup and creation.                           |

`src/draft.ts` keeps its public functions. Its long range-mapping callbacks
became named steps such as `applyInsertion`, `applyReplacement`, and
`resolveRange`, which share one `Edit` record instead of five parameters.
