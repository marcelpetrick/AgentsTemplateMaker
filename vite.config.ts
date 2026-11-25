// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

// The commit this build comes from, so a deployment check can name it.
function revision(): string {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA;
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "unknown";
  }
}

export default defineConfig({
  base: "./",
  plugins: [
    {
      name: "revision",
      apply: "build",
      transformIndexHtml: () => [
        {
          tag: "meta",
          attrs: { name: "revision", content: revision() },
          injectTo: "head",
        },
      ],
    },
    {
      name: "project-license",
      apply: "build",
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "LICENSE.txt",
          source: readFileSync(new URL("LICENSE", import.meta.url), "utf8"),
        });
      },
    },
  ],
  build: {
    license: { fileName: "dependency-licenses.md" },
    rolldownOptions: {
      output: {
        postBanner:
          "/*! Copyright (C) 2026 Marcel Petrick. SPDX-License-Identifier: GPL-3.0-or-later. See LICENSE.txt and dependency-licenses.md. */",
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
