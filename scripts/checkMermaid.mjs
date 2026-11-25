// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
// Render every Mermaid block in the project's Markdown files with the pinned
// Mermaid release in Chromium. Fail when a diagram does not render.
import console from "node:console";
import { globSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import process from "node:process";
import { chromium } from "@playwright/test";

const require = createRequire(import.meta.url);
const library = readFileSync(
  require.resolve("mermaid/dist/mermaid.min.js"),
  "utf8",
);
const generated =
  /^(?:node_modules|dist|coverage|reports|test-results|playwright-report|\.[^/]+)\//;
const files = globSync("**/*.md", {
  exclude: (path) => generated.test(path),
});
const blocks = files.flatMap((file) =>
  readFileSync(file, "utf8")
    .matchAll(/```mermaid\n([\s\S]*?)```/g)
    .map((match, index) => ({
      name: `${file} diagram ${String(index + 1)}`,
      code: match[1],
    }))
    .toArray(),
);

async function render(page, code) {
  return page.evaluate(async (source) => {
    const { mermaid } = globalThis;
    mermaid.initialize({ startOnLoad: false });
    try {
      const { svg } = await mermaid.render("diagram", source);
      return svg.includes("Syntax error") ? "syntax error" : "";
    } catch (error) {
      return String(error);
    }
  }, code);
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.addScriptTag({ content: library });
let failures = 0;
for (const { name, code } of blocks) {
  const problem = await render(page, code);
  if (problem) failures++;
  console.log(problem ? `FAIL ${name}: ${problem}` : `ok   ${name}`);
}
await browser.close();
if (blocks.length === 0 || failures > 0) process.exitCode = 1;
