// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  base: "./",
  build: {
    license: { fileName: "dependency-licenses.md" },
    rolldownOptions: {
      output: {
        postBanner:
          "/*! Copyright (C) 2026 Marcel Petrick. Agent Maker is GPL-3.0-or-later. See dependency-licenses.md for bundled dependency notices. */",
      },
    },
  },
  optimizeDeps: {
    include: ["@codemirror/state", "@codemirror/view", "@codemirror/commands"],
  },
  test: {
    include: ["test/**/*.test.ts"],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      reporter: ["text", "html"],
      thresholds: { lines: 95 },
    },
  },
});
