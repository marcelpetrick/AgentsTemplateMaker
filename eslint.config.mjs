// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import js from "@eslint/js";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

// See docs/quality.md for the reasons behind each limit.
const cleanCode = {
  complexity: ["error", 8],
  "max-depth": ["error", 3],
  "max-params": ["error", 4],
  "max-statements": ["error", 15],
  "max-lines-per-function": [
    "error",
    { max: 40, skipBlankLines: true, skipComments: true },
  ],
  "max-nested-callbacks": ["error", 3],
  "no-nested-ternary": "error",
  "sonarjs/cognitive-complexity": ["error", 10],
};

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "coverage/**",
      "test-results/**",
      "playwright-report/**",
      "reports/**",
      ".stryker-tmp/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  sonarjs.configs.recommended,
  unicorn.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: { allowDefaultProject: ["*.mjs"] },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...cleanCode,
      // The project names files in camelCase, such as localPipeline.sh.
      "unicorn/filename-case": ["error", { case: "camelCase" }],
      // Short, conventional names such as `i18n`-style abbreviations are fine.
      "unicorn/prevent-abbreviations": "off",
      // CodeMirror and the DOM use `undefined` for absent values.
      "unicorn/no-useless-undefined": "off",
      "unicorn/no-null": "off",
      // Keep conventional one-line and starred JSDoc comments.
      "unicorn/single-line-block-comment-style": "off",
      "unicorn/no-asterisk-prefix-in-documentation-comments": "off",
      // getElementById needs no selector escaping.
      "unicorn/prefer-query-selector": "off",
      // Public members first, then the private helpers they call (step-down rule).
      "unicorn/consistent-class-member-order": "off",
      // Short inline callbacks read best next to the data they transform.
      "unicorn/consistent-function-scoping": [
        "error",
        { checkArrowFunctions: false },
      ],
      // Boolean names such as `checked` or `edited` mirror DOM and draft fields.
      "unicorn/consistent-boolean-name": "off",
      // Numbers format predictably in user-facing text.
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
      "@typescript-eslint/no-confusing-void-expression": [
        "error",
        { ignoreArrowShorthand: true },
      ],
    },
  },
  {
    // Vite plugin hooks receive their context as `this`.
    files: ["*.config.ts"],
    rules: { "unicorn/no-this-outside-of-class": "off" },
  },
  {
    files: ["**/*.mjs"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    // Tests read as scenarios. Long `describe` blocks are expected there.
    files: ["test/**/*.ts", "e2e/**/*.ts"],
    rules: {
      "max-lines-per-function": "off",
      "max-statements": "off",
      "max-nested-callbacks": ["error", 5],
      "@typescript-eslint/no-non-null-assertion": "off",
      "sonarjs/no-duplicate-string": "off",
      // Typed element lookups, empty mock bodies, literal fixtures, and
      // per-test setup in `beforeEach` are idiomatic in tests.
      "@typescript-eslint/no-unnecessary-type-parameters": "off",
      "@typescript-eslint/no-empty-function": "off",
      "unicorn/prefer-string-repeat": "off",
      "unicorn/no-top-level-assignment-in-function": "off",
      "unicorn/require-css-escape": "off",
      // `page.evaluate` callbacks run in the browser, where its globals exist.
      "unicorn/isolated-functions": "off",
    },
  },
);
