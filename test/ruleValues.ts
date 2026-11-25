// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import type { Rule } from "../src/catalog";

/** Every option value of a rule's setting, or its single initial value. */
export function ruleValues(rule: Rule): string[] {
  const setting = rule.setting;
  return (
    setting?.options?.map(({ value }) => value) ?? [setting?.initial ?? ""]
  );
}
