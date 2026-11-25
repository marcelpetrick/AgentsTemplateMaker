// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later

import { expect, test } from "@playwright/test";

test("copy uses the current draft including manual Unicode and empty lines", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("./");
  const editor = page.locator("#editor .cm-content");
  await editor.click();
  await page.keyboard.press("Control+End");
  await page.keyboard.press("Enter");
  await page.keyboard.press("Enter");
  await page.keyboard.insertText("Eigene Anweisung für Köln.");
  await expect(
    page.locator(".authored-text").filter({ hasText: "Köln" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Copy", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Copied");
  const draft = (await editor.locator(".cm-line").allTextContents()).join("\n");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(draft);
});
