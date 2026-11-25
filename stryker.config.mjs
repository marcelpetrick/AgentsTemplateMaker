// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
// Stryker options. See docs/quality.md for the scope and threshold.

export default {
  testRunner: "vitest",
  // The regular Vitest configuration, including Chromium browser mode.
  vitest: { configFile: "vite.config.ts" },
  mutate: [
    "src/draft.ts",
    "src/catalog.ts",
    "src/stats.ts",
    "src/editor.ts",
    "src/messages.ts",
  ],
  coverageAnalysis: "perTest",
  reporters: ["clear-text", "progress-append-only", "html"],
  clearTextReporter: { reportMutants: false },
  htmlReporter: { fileName: "reports/mutation/index.html" },
  thresholds: { high: 90, low: 85, break: 85 },
  tempDirName: ".stryker-tmp",
  cleanTempDir: "always",
};
