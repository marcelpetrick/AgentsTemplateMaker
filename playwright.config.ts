// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later

import { defineConfig } from "@playwright/test";

const previewOrigin = "http://127.0.0.1:4173";
const basePath = "/AgentsTemplateMaker/";
const chromiumOnly = "**/*.chromium.spec.ts";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: previewOrigin + basePath,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    {
      name: "firefox",
      testIgnore: chromiumOnly,
      use: { browserName: "firefox" },
    },
    {
      name: "webkit",
      testIgnore: chromiumOnly,
      use: { browserName: "webkit" },
    },
  ],
  webServer: {
    command: `npm run preview -- --strictPort --port 4173 --base ${basePath}`,
    url: previewOrigin + basePath,
    reuseExistingServer: false,
  },
});
