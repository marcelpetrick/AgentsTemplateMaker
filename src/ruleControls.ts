// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import { categories, rules, type Localized, type Rule } from "./catalog";
import { append, appendButton } from "./dom";
import { settingControl, type SettingControl } from "./settingControls";

/** The elements that render and edit one rule. */
export interface RuleControl {
  readonly rule: Rule;
  readonly row: HTMLElement;
  readonly checkbox: HTMLInputElement;
  readonly title: HTMLElement;
  readonly help: HTMLButtonElement;
  readonly tooltip: HTMLElement;
  readonly edited: HTMLElement;
  readonly setting: SettingControl | undefined;
}

/** A collapsible category with its rules and bulk selection buttons. */
export interface CategoryGroup {
  readonly category: { readonly id: string; readonly label: Localized };
  readonly label: HTMLElement;
  readonly count: HTMLElement;
  readonly all: HTMLButtonElement;
  readonly none: HTMLButtonElement;
  readonly controls: readonly RuleControl[];
}

function ruleCheckbox(line: HTMLElement, rule: Rule) {
  const label = append(line, "label", "rule-label");
  const checkbox = append(label, "input");
  checkbox.type = "checkbox";
  checkbox.id = `rule-${rule.id}`;
  checkbox.checked = Boolean(rule.defaultSelected);
  return { checkbox, title: append(label, "span") };
}

function ruleHelp(line: HTMLElement, row: HTMLElement, rule: Rule) {
  const help = appendButton(line, `help-${rule.id}`, "rule-help");
  help.textContent = "?";
  const tooltip = append(row, "p", "rule-tooltip");
  tooltip.id = `tooltip-${rule.id}`;
  tooltip.hidden = true;
  help.setAttribute("aria-expanded", "false");
  help.setAttribute("aria-controls", tooltip.id);
  help.setAttribute("aria-describedby", tooltip.id);
  return { help, tooltip };
}

function ruleControl(parent: HTMLElement, rule: Rule): RuleControl {
  const row = append(parent, "div", "rule");
  const line = append(row, "div", "rule-line");
  const { checkbox, title } = ruleCheckbox(line, rule);
  const { help, tooltip } = ruleHelp(line, row, rule);
  const setting = rule.setting && settingControl(row, rule.id, rule.setting);
  const edited = append(row, "p", "rule-edited");
  edited.id = `edited-${rule.id}`;
  return { rule, row, checkbox, title, help, tooltip, edited, setting };
}

// Hovering a closed category previews it. The click that follows on the same
// summary must not close it again.
function previewOnHover(details: HTMLDetailsElement, summary: HTMLElement) {
  let previewOpened = false;
  summary.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "mouse" || details.open) return;
    details.open = true;
    previewOpened = true;
  });
  summary.addEventListener("click", (event) => {
    if (previewOpened && event.detail > 0) event.preventDefault();
    previewOpened = false;
  });
  details.addEventListener("pointerleave", () => {
    previewOpened = false;
  });
}

function categoryGroup(
  panel: HTMLElement,
  category: CategoryGroup["category"],
  open: boolean,
): CategoryGroup {
  const details = append(panel, "details", "category");
  details.id = `category-${category.id}`;
  details.open = open;
  const summary = append(details, "summary");
  const label = append(summary, "span");
  const count = append(summary, "span", "category-count");
  previewOnHover(details, summary);
  const actions = append(details, "div", "category-actions");
  const all = appendButton(actions, `select-all-${category.id}`, "text-button");
  const none = appendButton(
    actions,
    `select-none-${category.id}`,
    "text-button",
  );
  const list = append(details, "div", "rule-list");
  const controls = rules
    .filter((rule) => rule.category === category.id)
    .map((rule) => ruleControl(list, rule));
  return { category, label, count, all, none, controls };
}

/** Render every category with its rules. Only the first category starts open. */
export function categoryGroups(panel: HTMLElement): CategoryGroup[] {
  return categories.map((category, index) =>
    categoryGroup(panel, category, index === 0),
  );
}
