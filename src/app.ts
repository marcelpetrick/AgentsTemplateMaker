// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import "./style.css";
import { ChangeSet } from "@codemirror/state";
import {
  categories,
  rules,
  type Language,
  type Rule,
  type RuleSetting,
} from "./catalog";
import { authoredRanges, createDraft, replaceRule } from "./draft";
import { openEditor } from "./editor";
import { countText } from "./stats";
import { strings } from "./strings";
import { version } from "./version";

type Message =
  | "copied"
  | "copyFailed"
  | "downloaded"
  | { kept: Rule }
  | { keptCount: number };

const element = <T extends HTMLElement>(id: string) =>
  document.getElementById(id) as T;

function append<T extends keyof HTMLElementTagNameMap>(
  parent: HTMLElement,
  tag: T,
  className = "",
): HTMLElementTagNameMap[T] {
  const node = document.createElement(tag);
  node.className = className;
  parent.append(node);
  return node;
}

interface SettingInput {
  id: string;
  value: string;
  addEventListener(type: "change", listener: () => void): void;
}

function singleInput(parent: HTMLElement, setting: RuleSetting) {
  const options = setting.options ?? [];
  const input =
    options.length > 0 ? append(parent, "select") : append(parent, "input");
  if (input instanceof HTMLInputElement) {
    input.type = setting.kind === "percent" ? "number" : "text";
    if (setting.kind === "percent") {
      input.min = "0";
      input.max = "100";
      input.step = "any";
      input.required = true;
    }
  }
  const entries = options.map(({ value, label }) => {
    const option = append(input, "option");
    option.value = value;
    return { option: option as HTMLElement, label };
  });
  return { input: input as SettingInput, entries };
}

function multiInput(parent: HTMLElement, id: string, setting: RuleSetting) {
  const boxes = (setting.options ?? []).map(({ value, label }) => {
    const wrapper = append(parent, "label", "setting-choice");
    const box = append(wrapper, "input");
    box.type = "checkbox";
    box.id = `setting-${id}-${value}`;
    box.value = value;
    return { box, entry: { option: append(wrapper, "span"), label } };
  });
  const input: SettingInput = {
    id: `setting-${id}`,
    get value() {
      return boxes
        .filter(({ box }) => box.checked)
        .map(({ box }) => box.value)
        .join(",");
    },
    set value(value: string) {
      const chosen = new Set(value.split(","));
      for (const { box } of boxes) box.checked = chosen.has(box.value);
    },
    addEventListener: (type, listener) =>
      parent.addEventListener(type, listener),
  };
  return { input, entries: boxes.map(({ entry }) => entry) };
}

function settingControl(parent: HTMLElement, id: string, setting: RuleSetting) {
  const multi = setting.kind === "multi";
  const wrapper = append(
    parent,
    multi ? "fieldset" : "label",
    multi ? "rule-setting rule-choices" : "rule-setting",
  );
  const label = append(wrapper, multi ? "legend" : "span");
  const { input, entries } = multi
    ? multiInput(wrapper, id, setting)
    : singleInput(wrapper, setting);
  input.id = `setting-${id}`;
  input.value = setting.initial;
  return { choices: input, wrapper, entries, label, setting };
}

function ruleControls(parent: HTMLElement, rule: Rule) {
  const row = append(parent, "div", "rule");
  const line = append(row, "div", "rule-line");
  const label = append(line, "label", "rule-label");
  const checkbox = append(label, "input");
  checkbox.type = "checkbox";
  checkbox.id = `rule-${rule.id}`;
  checkbox.checked = Boolean(rule.defaultSelected);
  const title = append(label, "span");
  const help = append(line, "button", "rule-help");
  help.type = "button";
  help.id = `help-${rule.id}`;
  help.textContent = "?";
  const tooltip = append(row, "p", "rule-tooltip");
  tooltip.id = `tooltip-${rule.id}`;
  tooltip.hidden = true;
  help.setAttribute("aria-expanded", "false");
  help.setAttribute("aria-controls", tooltip.id);
  help.setAttribute("aria-describedby", tooltip.id);
  const setting = rule.setting && settingControl(row, rule.id, rule.setting);
  const edited = append(row, "p", "rule-edited");
  edited.id = `edited-${rule.id}`;
  return { checkbox, edited, help, rule, setting, title, tooltip };
}

export function mount() {
  let uiLanguage: Language = "en";
  let outputLanguage: Language = "en";
  let message: Message | undefined;
  let pendingChange: (() => void) | undefined;
  let activeHelp: HTMLButtonElement | undefined;
  let pinnedHelp: HTMLButtonElement | undefined;
  const selected = new Set(
    rules.filter((rule) => rule.defaultSelected).map((rule) => rule.id),
  );
  const settings = new Map(
    rules.map((rule) => [rule.id, rule.setting?.initial ?? ""]),
  );
  const order = ["title", ...rules.map((rule) => rule.id)];
  const rulePanel = element("rules");
  const uiSelect = element<HTMLSelectElement>("ui-language");
  const outputSelect = element<HTMLSelectElement>("document-language");
  const theme = element("theme-toggle");
  const dialog = element<HTMLDialogElement>("confirm-change");
  const warning = element("edit-warning");
  const status = element("status");
  const words = () => strings[uiLanguage];

  const groups = categories.map((category, index) => {
    const details = append(rulePanel, "details", "category");
    details.id = `category-${category.id}`;
    details.open = index === 0;
    const summary = append(details, "summary");
    const label = append(summary, "span");
    const count = append(summary, "span", "category-count");
    let previewOpened = false;
    summary.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse" && !details.open) {
        details.open = true;
        previewOpened = true;
      }
    });
    summary.addEventListener("click", (event) => {
      if (previewOpened && event.detail > 0) event.preventDefault();
      previewOpened = false;
    });
    details.addEventListener("pointerleave", () => {
      previewOpened = false;
    });
    const actions = append(details, "div", "category-actions");
    const all = append(actions, "button", "text-button");
    all.type = "button";
    all.id = `select-all-${category.id}`;
    const none = append(actions, "button", "text-button");
    none.type = "button";
    none.id = `select-none-${category.id}`;
    const list = append(details, "div", "rule-list");
    const controls = rules
      .filter((rule) => rule.category === category.id)
      .map((rule) => ruleControls(list, rule));
    return { category, label, count, controls, all, none };
  });
  const controls = groups.flatMap((group) => group.controls);
  const paragraph = (
    rule: Rule,
    language = outputLanguage,
    value = settings.get(rule.id)!,
  ) => rule.paragraph(language, value);

  const editor = openEditor(
    element("editor"),
    createDraft(
      strings[outputLanguage].documentTitle,
      rules
        .filter((rule) => selected.has(rule.id))
        .map((rule) => ({ id: rule.id, text: paragraph(rule) })),
    ),
    renderRules,
  );

  function setMessage(next?: Message) {
    message = next;
    status.textContent =
      next === undefined
        ? ""
        : typeof next === "string"
          ? words()[next]
          : "kept" in next
            ? words().keptRule(next.kept.label[uiLanguage])
            : words().keptRules(next.keptCount);
  }

  function isEdited(id: string) {
    return editor.draft.ranges.some((range) => range.id === id && range.edited);
  }

  function renderCount() {
    const { words: wordCount, characters } = countText(editor.draft.text);
    element("draft-stats").textContent = words().textCount(
      wordCount,
      characters,
    );
  }

  function renderRules() {
    renderCount();
    for (const group of groups) {
      group.count.textContent = words().selected(
        group.controls.filter(({ rule }) => selected.has(rule.id)).length,
      );
    }
    let hasEditedRule = false;
    for (const { checkbox, edited, rule, setting, tooltip } of controls) {
      checkbox.checked = selected.has(rule.id);
      if (setting) {
        setting.wrapper.hidden = !checkbox.checked;
        // Assigning the same value can move the caret of a focused text input.
        const value = settings.get(rule.id)!;
        if (setting.choices.value !== value) setting.choices.value = value;
      }
      const wasEdited = isEdited(rule.id);
      hasEditedRule ||= wasEdited;
      edited.hidden = !wasEdited;
      checkbox.setAttribute(
        "aria-describedby",
        wasEdited ? `${tooltip.id} ${edited.id} edit-warning` : tooltip.id,
      );
      edited.textContent = wasEdited
        ? words().editedRule(rule.label[uiLanguage])
        : "";
    }
    warning.hidden = !hasEditedRule;
    warning.textContent = words().editWarning;
  }

  function renderLanguage() {
    document.documentElement.lang = uiLanguage;
    for (const node of document.querySelectorAll<HTMLElement>("[data-copy]")) {
      node.textContent =
        words().copy[node.dataset.copy as keyof typeof strings.en.copy];
    }
    element("confirm-detail").textContent = words().changeWarning;
    theme.querySelector("[data-copy=theme]")!.textContent =
      document.documentElement.dataset.theme === "dark"
        ? words().switchLight
        : words().switchDark;
    for (const group of groups) {
      const name = group.category.label[uiLanguage];
      group.label.textContent = name;
      group.all.textContent = words().all;
      group.all.setAttribute("aria-label", words().selectAllIn(name));
      group.none.textContent = words().none;
      group.none.setAttribute("aria-label", words().selectNoneIn(name));
    }
    for (const { help, rule, setting, title, tooltip } of controls) {
      title.textContent = rule.label[uiLanguage];
      help.setAttribute("aria-label", words().ruleHelp(rule.label[uiLanguage]));
      tooltip.textContent = rule.help[uiLanguage];
      if (setting) {
        setting.label.textContent = setting.setting.label[uiLanguage];
        for (const entry of setting.entries)
          entry.option.textContent = entry.label[uiLanguage];
      }
    }
    editor.describe(words().editorLabel, outputLanguage);
    renderRules();
    setMessage(message);
  }

  function confirm(ids: readonly string[], apply: () => void) {
    if (ids.length === 0) {
      apply();
      return;
    }
    const list = element("confirm-rules");
    list.replaceChildren();
    for (const id of ids) {
      const rule = rules.find((rule) => rule.id === id);
      append(list, "li").textContent = rule?.label[uiLanguage] ?? "AGENTS.md";
    }
    pendingChange = apply;
    dialog.showModal();
  }

  function updateParagraphs(updates: readonly { id: string; text?: string }[]) {
    let draft = editor.draft;
    let changes = ChangeSet.empty(draft.text.length);
    for (const { id, text } of updates) {
      const next = replaceRule(draft, id, text, order);
      draft = next.draft;
      changes = changes.compose(next.changes);
    }
    editor.set(draft, changes);
    renderRules();
  }

  function hideHelp(button: HTMLButtonElement) {
    element(button.getAttribute("aria-controls")!).hidden = true;
    button.setAttribute("aria-expanded", "false");
    if (activeHelp === button) activeHelp = undefined;
    if (pinnedHelp === button) pinnedHelp = undefined;
  }

  for (const { checkbox, rule, setting, help, tooltip } of controls) {
    checkbox.addEventListener("change", () => {
      const checked = checkbox.checked;
      if (checked) selected.add(rule.id);
      else selected.delete(rule.id);
      const kept = !checked && isEdited(rule.id);
      updateParagraphs([
        { id: rule.id, text: checked ? paragraph(rule) : undefined },
      ]);
      setMessage(kept ? { kept: rule } : undefined);
    });
    setting?.choices.addEventListener("change", () => {
      const { choices } = setting;
      const previous = settings.get(rule.id)!;
      const value = choices.value;
      choices.value = previous;
      if (
        previous === value ||
        (setting.setting.kind === "percent" &&
          (value === "" || Number(value) < 0 || Number(value) > 100))
      )
        return;
      const text = paragraph(rule, outputLanguage, value);
      const affectsEdited = isEdited(rule.id) && text !== paragraph(rule);
      confirm(affectsEdited ? [rule.id] : [], () => {
        settings.set(rule.id, value);
        updateParagraphs([{ id: rule.id, text }]);
        setMessage();
      });
    });
    function showHelp() {
      if (activeHelp && activeHelp !== help) hideHelp(activeHelp);
      activeHelp = help;
      tooltip.hidden = false;
      help.setAttribute("aria-expanded", "true");
    }
    help.addEventListener("focus", showHelp);
    help.addEventListener("blur", () => {
      if (pinnedHelp !== help) hideHelp(help);
    });
    help.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") showHelp();
    });
    help.parentElement!.parentElement!.addEventListener("pointerleave", () => {
      if (pinnedHelp !== help && document.activeElement !== help)
        hideHelp(help);
    });
    help.addEventListener("click", () => {
      if (pinnedHelp === help) {
        hideHelp(help);
      } else {
        showHelp();
        pinnedHelp = help;
      }
    });
    help.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        hideHelp(help);
      }
    });
  }

  function selectAll(scope: readonly Rule[]) {
    const added = scope.filter((rule) => !selected.has(rule.id));
    for (const rule of added) selected.add(rule.id);
    updateParagraphs(
      added.map((rule) => ({ id: rule.id, text: paragraph(rule) })),
    );
    setMessage();
  }

  function selectNone(scope: readonly Rule[]) {
    const removed = scope.filter((rule) => selected.has(rule.id));
    const kept = removed.filter((rule) => isEdited(rule.id)).length;
    for (const rule of removed) selected.delete(rule.id);
    updateParagraphs(removed.map((rule) => ({ id: rule.id })));
    setMessage(kept > 0 ? { keptCount: kept } : undefined);
  }

  element("select-all").addEventListener("click", () => selectAll(rules));
  element("select-none").addEventListener("click", () => selectNone(rules));
  for (const group of groups) {
    const scope = group.controls.map(({ rule }) => rule);
    group.all.addEventListener("click", () => selectAll(scope));
    group.none.addEventListener("click", () => selectNone(scope));
  }
  element("workspace").addEventListener("click", (event) => {
    if (
      activeHelp &&
      event.target instanceof Node &&
      !activeHelp.contains(event.target) &&
      !element(activeHelp.getAttribute("aria-controls")!).contains(event.target)
    ) {
      hideHelp(activeHelp);
    }
  });
  dialog.addEventListener("submit", (event) => {
    event.preventDefault();
    const apply = pendingChange;
    pendingChange = undefined;
    dialog.close();
    if (event.submitter?.id === "apply-change") apply?.();
  });
  dialog.addEventListener("cancel", () => {
    pendingChange = undefined;
  });
  function languageUpdates(language: Language) {
    return [
      { id: "title", text: strings[language].documentTitle },
      ...rules
        .filter((rule) => selected.has(rule.id))
        .filter((rule) => paragraph(rule, language) !== paragraph(rule))
        .map((rule) => ({ id: rule.id, text: paragraph(rule, language) })),
    ];
  }

  function applyOutputLanguage(
    language: Language,
    updates: ReturnType<typeof languageUpdates>,
  ) {
    outputLanguage = language;
    outputSelect.value = language;
    updateParagraphs(updates);
    editor.describe(words().editorLabel, outputLanguage);
    setMessage();
  }

  function isUnedited() {
    return authoredRanges(editor.draft).length === 0;
  }

  uiSelect.addEventListener("change", () => {
    uiLanguage = uiSelect.value as Language;
    if (uiLanguage !== outputLanguage && isUnedited())
      applyOutputLanguage(uiLanguage, languageUpdates(uiLanguage));
    renderLanguage();
  });
  outputSelect.addEventListener("change", () => {
    const language = outputSelect.value as Language;
    outputSelect.value = outputLanguage;
    if (language === outputLanguage) return;
    const updates = languageUpdates(language);
    confirm(
      updates.filter(({ id }) => isEdited(id)).map(({ id }) => id),
      () => applyOutputLanguage(language, updates),
    );
  });
  theme.addEventListener("click", () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
    renderLanguage();
  });
  element("copy").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(editor.draft.text);
      setMessage("copied");
    } catch {
      setMessage("copyFailed");
    }
  });
  element("download").addEventListener("click", () => {
    const file = new Blob([editor.draft.text], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "AGENTS.md";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
    setMessage("downloaded");
  });
  element("version").textContent = `v${version}`;
  renderLanguage();
  return editor.view;
}
