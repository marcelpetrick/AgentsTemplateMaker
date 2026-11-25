// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import type { Localized, RuleSetting } from "./catalog";
import { append } from "./dom";

/** The shared surface of a text input, a select, and a checkbox group. */
interface SettingInput {
  id: string;
  value: string;
  addEventListener(type: "change", listener: () => void): void;
}

/** A visible option and the localized label it shows. */
interface SettingEntry {
  readonly option: HTMLElement;
  readonly label: Localized;
}

export interface SettingControl {
  readonly choices: SettingInput;
  readonly wrapper: HTMLElement;
  readonly entries: readonly SettingEntry[];
  readonly label: HTMLElement;
  readonly setting: RuleSetting;
}

interface BuiltInput {
  readonly input: SettingInput;
  readonly entries: SettingEntry[];
}

function configureInput(input: HTMLInputElement, setting: RuleSetting) {
  if (setting.kind !== "percent") {
    input.type = "text";
    return;
  }
  input.type = "number";
  input.min = "0";
  input.max = "100";
  input.step = "any";
  input.required = true;
}

function singleInput(parent: HTMLElement, setting: RuleSetting): BuiltInput {
  const options = setting.options ?? [];
  if (options.length === 0) {
    const input = append(parent, "input");
    configureInput(input, setting);
    return { input, entries: [] };
  }
  const select = append(parent, "select");
  const entries = options.map(({ value, label }) => {
    const option = append(select, "option");
    option.value = value;
    return { option, label };
  });
  return { input: select, entries };
}

function checkboxGroup(
  parent: HTMLElement,
  boxes: readonly HTMLInputElement[],
): SettingInput {
  return {
    id: "",
    get value() {
      return boxes
        .filter((box) => box.checked)
        .map((box) => box.value)
        .join(",");
    },
    set value(value: string) {
      const chosen = new Set(value.split(","));
      for (const box of boxes) box.checked = chosen.has(box.value);
    },
    addEventListener: (type, listener) => {
      parent.addEventListener(type, listener);
    },
  };
}

function multiInput(
  parent: HTMLElement,
  id: string,
  setting: RuleSetting,
): BuiltInput {
  const choices = (setting.options ?? []).map(({ value, label }) => {
    const wrapper = append(parent, "label", "setting-choice");
    const box = append(wrapper, "input");
    box.type = "checkbox";
    box.id = `setting-${id}-${value}`;
    box.value = value;
    return { box, entry: { option: append(wrapper, "span"), label } };
  });
  const boxes = choices.map(({ box }) => box);
  return {
    input: checkboxGroup(parent, boxes),
    entries: choices.map(({ entry }) => entry),
  };
}

/** Render the control for a rule's setting below the rule's checkbox. */
export function settingControl(
  parent: HTMLElement,
  id: string,
  setting: RuleSetting,
): SettingControl {
  const multi = setting.kind === "multi";
  const wrapper = multi
    ? append(parent, "fieldset", "rule-setting rule-choices")
    : append(parent, "label", "rule-setting");
  const label = append(wrapper, multi ? "legend" : "span");
  const { input, entries } = multi
    ? multiInput(wrapper, id, setting)
    : singleInput(wrapper, setting);
  input.id = `setting-${id}`;
  input.value = setting.initial;
  return { choices: input, wrapper, entries, label, setting };
}

/** Whether a percent setting holds a value outside 0 to 100. */
export function isInvalidSetting(setting: RuleSetting, value: string) {
  if (setting.kind !== "percent") return false;
  const number = Number(value);
  return value === "" || number < 0 || number > 100;
}
