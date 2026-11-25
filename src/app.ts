// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import "./style.css";
import { ChangeSet } from "@codemirror/state";
import { rules, type Language, type Rule } from "./catalog";
import { libraries } from "./about";
import { ConfirmDialog } from "./confirmDialog";
import { append, byId, element } from "./dom";
import { authoredRanges, createDraft, replaceRule } from "./draft";
import { openEditor, type Editor } from "./editor";
import { copyText, downloadText } from "./exportDraft";
import { HelpTooltips } from "./helpTooltips";
import { messageText, type Message } from "./messages";
import {
  categoryGroups,
  type CategoryGroup,
  type RuleControl,
} from "./ruleControls";
import { isInvalidSetting } from "./settingControls";
import { countText } from "./stats";
import { strings } from "./strings";
import { version } from "./version";

interface ParagraphUpdate {
  readonly id: string;
  readonly text?: string;
}

const order = ["title", ...rules.map((rule) => rule.id)];

/** The rule form, the editor, and the state they share. */
class Workspace {
  private uiLanguage: Language = "en";
  private outputLanguage: Language = "en";
  private message: Message | undefined;
  private readonly selected = new Set(
    rules.filter((rule) => rule.defaultSelected).map((rule) => rule.id),
  );
  private readonly settings = new Map(
    rules.map((rule) => [rule.id, rule.setting?.initial ?? ""]),
  );
  private readonly groups: readonly CategoryGroup[] = categoryGroups(
    element("rules"),
  );
  private readonly controls = this.groups.flatMap((group) => group.controls);
  private readonly dialog = new ConfirmDialog(
    byId("confirm-change", HTMLDialogElement),
    element("confirm-rules"),
  );
  private readonly uiSelect = byId("ui-language", HTMLSelectElement);
  private readonly outputSelect = byId("document-language", HTMLSelectElement);
  private readonly theme = element("theme-toggle");
  private readonly warning = element("edit-warning");
  readonly editor: Editor;

  constructor() {
    this.editor = openEditor(element("editor"), this.initialDraft(), () => {
      this.renderRules();
    });
    for (const control of this.controls) this.bindRule(control);
    new HelpTooltips().bind(this.controls, element("workspace"));
    this.bindBulkSelection();
    this.bindLanguages();
    this.bindThemeAndExport();
    element("version").textContent = `v${version}`;
    for (const library of libraries())
      append(element("about-libraries"), "li").textContent = library;
    this.renderLanguage();
  }

  private words() {
    return strings[this.uiLanguage];
  }

  private paragraph(
    rule: Rule,
    language = this.outputLanguage,
    value = this.value(rule),
  ) {
    return rule.paragraph(language, value);
  }

  private value(rule: Rule) {
    return this.settings.get(rule.id) ?? "";
  }

  private selectedRules() {
    return rules.filter((rule) => this.selected.has(rule.id));
  }

  private initialDraft() {
    return createDraft(
      strings[this.outputLanguage].documentTitle,
      this.selectedRules().map((rule) => ({
        id: rule.id,
        text: this.paragraph(rule),
      })),
    );
  }

  private isEdited(id: string) {
    return this.editor.draft.ranges.some(
      (range) => range.id === id && range.edited,
    );
  }

  private setMessage(next?: Message) {
    this.message = next;
    element("status").textContent = messageText(this.uiLanguage, next);
  }

  private renderRules() {
    const { words, characters } = countText(this.editor.draft.text);
    element("draft-stats").textContent = this.words().textCount(
      words,
      characters,
    );
    for (const group of this.groups) {
      const count = group.controls.filter(({ rule }) =>
        this.selected.has(rule.id),
      ).length;
      group.count.textContent = this.words().selected(count);
    }
    const edited = this.controls.map((control) => this.renderRule(control));
    this.warning.hidden = !edited.includes(true);
    this.warning.textContent = this.words().editWarning;
  }

  /** Render a rule's selection and edit state. Return whether it is edited. */
  private renderRule(control: RuleControl) {
    const { checkbox, edited, rule, setting, tooltip } = control;
    checkbox.checked = this.selected.has(rule.id);
    if (setting) {
      setting.wrapper.hidden = !checkbox.checked;
      // Assigning the same value can move the caret of a focused text input.
      const value = this.value(rule);
      if (setting.choices.value !== value) setting.choices.value = value;
    }
    const wasEdited = this.isEdited(rule.id);
    edited.hidden = !wasEdited;
    checkbox.setAttribute(
      "aria-describedby",
      wasEdited ? `${tooltip.id} ${edited.id} edit-warning` : tooltip.id,
    );
    edited.textContent = wasEdited
      ? this.words().editedRule(rule.label[this.uiLanguage])
      : "";
    return wasEdited;
  }

  private renderLanguage() {
    document.documentElement.lang = this.uiLanguage;
    for (const node of document.querySelectorAll<HTMLElement>("[data-copy]")) {
      node.textContent =
        this.words().copy[node.dataset.copy as keyof typeof strings.en.copy];
    }
    element("confirm-detail").textContent = this.words().changeWarning;
    this.renderThemeLabel();
    for (const group of this.groups) this.renderGroupLabels(group);
    for (const control of this.controls) this.renderRuleLabels(control);
    this.editor.describe(this.words().editorLabel, this.outputLanguage);
    this.renderRules();
    this.setMessage(this.message);
  }

  private renderThemeLabel() {
    const dark = document.documentElement.dataset.theme === "dark";
    const label = dark ? this.words().switchLight : this.words().switchDark;
    for (const node of this.theme.querySelectorAll("[data-copy=theme]"))
      node.textContent = label;
  }

  private renderGroupLabels(group: CategoryGroup) {
    const words = this.words();
    const name = group.category.label[this.uiLanguage];
    group.label.textContent = name;
    group.all.textContent = words.all;
    group.all.setAttribute("aria-label", words.selectAllIn(name));
    group.none.textContent = words.none;
    group.none.setAttribute("aria-label", words.selectNoneIn(name));
  }

  private renderRuleLabels(control: RuleControl) {
    const { help, rule, setting, title, tooltip } = control;
    const language = this.uiLanguage;
    title.textContent = rule.label[language];
    help.setAttribute(
      "aria-label",
      this.words().ruleHelp(rule.label[language]),
    );
    tooltip.textContent = rule.help[language];
    if (!setting) return;
    setting.label.textContent = setting.setting.label[language];
    for (const entry of setting.entries)
      entry.option.textContent = entry.label[language];
  }

  private confirm(ids: readonly string[], apply: () => void) {
    const labels = ids.map(
      (id) =>
        rules.find((rule) => rule.id === id)?.label[this.uiLanguage] ??
        "AGENTS.md",
    );
    this.dialog.ask(labels, apply);
  }

  private updateParagraphs(updates: readonly ParagraphUpdate[]) {
    let draft = this.editor.draft;
    let changes = ChangeSet.empty(draft.text.length);
    for (const { id, text } of updates) {
      const next = replaceRule(draft, id, text, order);
      draft = next.draft;
      changes = changes.compose(next.changes);
    }
    this.editor.set(draft, changes);
    this.renderRules();
  }

  private bindRule(control: RuleControl) {
    const { checkbox, rule, setting } = control;
    checkbox.addEventListener("change", () => {
      this.toggleRule(rule, checkbox.checked);
    });
    setting?.choices.addEventListener("change", () => {
      this.changeSetting(control);
    });
  }

  private toggleRule(rule: Rule, checked: boolean) {
    if (checked) this.selected.add(rule.id);
    else this.selected.delete(rule.id);
    const kept = !checked && this.isEdited(rule.id);
    this.updateParagraphs([
      { id: rule.id, text: checked ? this.paragraph(rule) : undefined },
    ]);
    this.setMessage(kept ? { kept: rule } : undefined);
  }

  private changeSetting({ rule, setting }: RuleControl) {
    if (!setting) return;
    const previous = this.value(rule);
    const value = setting.choices.value;
    setting.choices.value = previous;
    if (previous === value || isInvalidSetting(setting.setting, value)) return;
    const text = this.paragraph(rule, this.outputLanguage, value);
    const affectsEdited =
      this.isEdited(rule.id) && text !== this.paragraph(rule);
    this.confirm(affectsEdited ? [rule.id] : [], () => {
      this.settings.set(rule.id, value);
      this.updateParagraphs([{ id: rule.id, text }]);
      this.setMessage();
    });
  }

  private selectAll(scope: readonly Rule[]) {
    const added = scope.filter((rule) => !this.selected.has(rule.id));
    for (const rule of added) this.selected.add(rule.id);
    this.updateParagraphs(
      added.map((rule) => ({ id: rule.id, text: this.paragraph(rule) })),
    );
    this.setMessage();
  }

  private selectNone(scope: readonly Rule[]) {
    const removed = scope.filter((rule) => this.selected.has(rule.id));
    const kept = removed.filter((rule) => this.isEdited(rule.id)).length;
    for (const rule of removed) this.selected.delete(rule.id);
    this.updateParagraphs(removed.map((rule) => ({ id: rule.id })));
    this.setMessage(kept > 0 ? { keptCount: kept } : undefined);
  }

  private bindBulkSelection() {
    const bind = (
      all: HTMLElement,
      none: HTMLElement,
      scope: readonly Rule[],
    ) => {
      all.addEventListener("click", () => {
        this.selectAll(scope);
      });
      none.addEventListener("click", () => {
        this.selectNone(scope);
      });
    };
    bind(element("select-all"), element("select-none"), rules);
    for (const group of this.groups) {
      bind(
        group.all,
        group.none,
        group.controls.map(({ rule }) => rule),
      );
    }
  }

  private languageUpdates(language: Language): ParagraphUpdate[] {
    const changed = this.selectedRules().filter(
      (rule) => this.paragraph(rule, language) !== this.paragraph(rule),
    );
    return [
      { id: "title", text: strings[language].documentTitle },
      ...changed.map((rule) => ({
        id: rule.id,
        text: this.paragraph(rule, language),
      })),
    ];
  }

  private applyOutputLanguage(
    language: Language,
    updates: readonly ParagraphUpdate[],
  ) {
    this.outputLanguage = language;
    this.outputSelect.value = language;
    this.updateParagraphs(updates);
    this.editor.describe(this.words().editorLabel, this.outputLanguage);
    this.setMessage();
  }

  /** Follow the interface language while the draft has no authored text. */
  private changeUiLanguage(language: Language) {
    this.uiLanguage = language;
    const unedited = authoredRanges(this.editor.draft).length === 0;
    if (unedited && language !== this.outputLanguage)
      this.applyOutputLanguage(language, this.languageUpdates(language));
    this.renderLanguage();
  }

  private changeOutputLanguage(language: Language) {
    this.outputSelect.value = this.outputLanguage;
    if (language === this.outputLanguage) return;
    const updates = this.languageUpdates(language);
    const edited = updates.filter(({ id }) => this.isEdited(id));
    this.confirm(
      edited.map(({ id }) => id),
      () => {
        this.applyOutputLanguage(language, updates);
      },
    );
  }

  private bindLanguages() {
    this.uiSelect.addEventListener("change", () => {
      this.changeUiLanguage(this.uiSelect.value as Language);
    });
    this.outputSelect.addEventListener("change", () => {
      this.changeOutputLanguage(this.outputSelect.value as Language);
    });
  }

  private bindThemeAndExport() {
    this.theme.addEventListener("click", () => {
      const html = document.documentElement;
      html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
      this.renderLanguage();
    });
    element("copy").addEventListener("click", () => {
      void copyText(this.editor.draft.text).then((copied) => {
        this.setMessage(copied ? "copied" : "copyFailed");
      });
    });
    element("download").addEventListener("click", () => {
      downloadText(this.editor.draft.text);
      this.setMessage("downloaded");
    });
  }
}

/** Build the workspace in the page shell and return its editor view. */
export function mount() {
  return new Workspace().editor.view;
}
