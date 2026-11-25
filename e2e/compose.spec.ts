// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later

import { readFile } from "node:fs/promises";
import { expect, test, type Page } from "@playwright/test";

const repository = (page: Page) => page.locator("#category-repository");

const markdown = (page: Page) => page.locator("#editor .cm-content");

async function draftText(page: Page) {
  return (await markdown(page).locator(".cm-line").allTextContents()).join(
    "\n",
  );
}

test("defaults, repository hover, edited rule removal and accurate Markdown download", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("./");
  await expect(page).toHaveTitle("Agent Maker");
  const licenses = await page.request.get("dependency-licenses.md");
  expect(licenses.ok()).toBe(true);
  expect(await licenses.text()).toContain("@codemirror/state");
  const projectLicense = await page.request.get("LICENSE.txt");
  expect(projectLicense.ok()).toBe(true);
  expect(await projectLicense.text()).toBe(
    await readFile(new URL("../LICENSE", import.meta.url), "utf-8"),
  );
  await expect(markdown(page)).toContainText("Conventional Commits");
  await expect(markdown(page)).toContainText("300");
  await expect(markdown(page)).toContainText("credential");
  const initial = await draftText(page);

  const summary = repository(page).locator("summary");
  const limit = page.locator("#rule-commit-limit");
  if (await limit.isVisible()) {
    await summary.press("Enter");
  }
  await expect(limit).toBeHidden();
  await summary.hover();
  await expect(limit).toBeVisible();
  await limit.hover();
  await expect(limit).toBeChecked();
  expect(await draftText(page)).toBe(initial);

  await page.locator("#setting-commit-limit").selectOption("600");
  await expect(markdown(page)).toContainText("600");
  const limitLine = markdown(page)
    .locator(".cm-line")
    .filter({ hasText: "600" });
  await limitLine.click();
  await page.keyboard.insertText("Teamgröße: fünf. ");
  await expect(
    page.locator(".authored-text").filter({ hasText: "Teamgröße" }),
  ).toBeVisible();
  await expect(page.locator("#edit-warning")).toBeVisible();

  const edited = await draftText(page);
  await limit.uncheck();
  await expect(limit).not.toBeChecked();
  await expect(page.getByRole("status")).toContainText(/kept/i);
  expect(await draftText(page)).toBe(edited);

  const downloadStarted = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download", exact: true }).click();
  const download = await downloadStarted;
  expect(download.suggestedFilename()).toBe("AGENTS.md");
  expect(await readFile(await download.path(), "utf-8")).toBe(edited);
  expect(errors).toEqual([]);
});

test("edited drafts keep their language and changes can be cancelled without altering authorship", async ({
  page,
}) => {
  await page.goto("./");
  const commits = markdown(page)
    .locator(".cm-line")
    .filter({ hasText: "Conventional Commits" });
  await commits.click();
  await page.keyboard.insertText(" Team convention. ");
  const limit = markdown(page).locator(".cm-line").filter({ hasText: "300" });
  await limit.click();
  await page.keyboard.insertText(" Project limit. ");
  const original = await draftText(page);
  const marks = await page.locator(".authored-text").allTextContents();
  expect(marks.join(" ")).toContain("Team convention.");
  expect(marks.join(" ")).toContain("Project limit.");

  await page.locator("#ui-language").selectOption("de");
  await expect(
    page.getByRole("heading", { name: "Erstelle deine AGENTS.md" }),
  ).toBeVisible();
  await expect(page.locator("#document-language")).toHaveValue("en");
  expect(await draftText(page)).toBe(original);

  await page.locator("#document-language").selectOption("de");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(page.locator("#confirm-rules li")).toHaveCount(2);
  await page.locator("#cancel-change").click();
  await expect(dialog).not.toBeVisible();
  await expect(page.locator("#document-language")).toHaveValue("en");
  expect(await draftText(page)).toBe(original);
  expect(await page.locator(".authored-text").allTextContents()).toEqual(marks);

  await page.locator("#ui-language").selectOption("en");
  await page.locator("#document-language").selectOption("de");
  await page.locator("#apply-change").click();
  await expect(page.locator("#document-language")).toHaveValue("de");
  await expect(markdown(page)).toContainText("Projektanweisungen");
  expect(await page.locator(".authored-text").allTextContents()).toEqual(marks);

  const changed = await draftText(page);
  await page.getByRole("button", { name: "Dark mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await draftText(page)).toBe(changed);
  expect(await page.locator(".authored-text").allTextContents()).toEqual(marks);
  await page.getByRole("button", { name: "Light mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("keyboard and touch can reveal rule explanations and toggle untouched text", async ({
  browser,
  page,
}) => {
  await page.goto("./");
  const agentPolicy = page.locator("details.category").first();
  const heading = agentPolicy.locator("summary");
  const initial = await draftText(page);
  const checkbox = agentPolicy.getByRole("checkbox").first();
  await heading.focus();
  if (await checkbox.isVisible()) {
    await page.keyboard.press("Enter");
  }
  await expect(checkbox).toBeHidden();
  await page.keyboard.press("Enter");
  await expect(checkbox).toBeVisible();
  expect(await draftText(page)).toBe(initial);
  const help = agentPolicy.locator("button.rule-help").first();
  await help.focus();
  const helpText = agentPolicy.locator(".rule-tooltip").first();
  if (!(await helpText.isVisible())) {
    await page.keyboard.press("Enter");
  }
  await expect(helpText).toBeVisible();
  await expect(helpText).toContainText(/tokens?/i);

  await checkbox.focus();
  await page.keyboard.press("Space");
  await expect(checkbox).toBeChecked();
  expect(await draftText(page)).not.toBe(initial);
  await page.keyboard.press("Space");
  await expect(checkbox).not.toBeChecked();
  expect(await draftText(page)).toBe(initial);

  const context = await browser.newContext({
    baseURL: page.url(),
    hasTouch: true,
    viewport: { width: 390, height: 844 },
  });
  try {
    const touch = await context.newPage();
    await touch.goto("./");
    const touchCategory = touch.locator("details.category").first();
    const touchHeading = touchCategory.locator("summary");
    const touchHelp = touchCategory.locator("button.rule-help").first();
    if (await touchHelp.isVisible()) {
      await touchHeading.tap();
    }
    await expect(touchHelp).toBeHidden();
    await touchHeading.tap();
    await touchHelp.tap();
    await expect(touchCategory.locator(".rule-tooltip").first()).toBeVisible();
    const rule = touchCategory.getByRole("checkbox").first();
    await rule.tap();
    await expect(rule).toBeChecked();
    await expect(markdown(touch)).toContainText("Do not delegate work");
  } finally {
    await context.close();
  }
});
