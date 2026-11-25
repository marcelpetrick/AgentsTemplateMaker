// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later

import { expect, test } from "@playwright/test";

if (process.env.AGENT_MAKER_SCREENSHOT === "1") {
  test("README screenshot", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 960 });
    await page.goto("./");
    const agentPolicy = page.locator("#category-agent");
    if (await agentPolicy.getByRole("checkbox").first().isVisible()) {
      await agentPolicy.locator("summary").press("Enter");
    }
    await page.locator("#category-repository summary").hover();
    await page.locator("#setting-commit-limit").selectOption("600");

    const commitLimit = page
      .locator("#editor .cm-line")
      .filter({ hasText: "600" });
    await expect(commitLimit).toBeVisible();
    const bounds = (await commitLimit.boundingBox())!;
    await commitLimit.click({
      position: { x: bounds.width - 8, y: bounds.height - 8 },
    });
    await page.keyboard.press("End");
    await page.keyboard.insertText(" Explain why the change was needed.");
    await expect(page.locator(".authored-text")).toContainText(
      "599 characters. Explain why the change was needed.",
    );
    await page.locator(".intro h1").click();

    await page.screenshot({
      path: "docs/interface.png",
      fullPage: true,
      animations: "disabled",
    });
  });
}
