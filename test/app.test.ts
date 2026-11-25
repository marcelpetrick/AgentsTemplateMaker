// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { redo, undo } from "@codemirror/commands";
import type { EditorView } from "@codemirror/view";
import shell from "../index.html?raw";
import { mount } from "../src/app";
import { rules, type Language, type Rule } from "../src/catalog";
import { ruleValues } from "./ruleValues";

const rule = (id: string) => rules.find((rule) => rule.id === id)!;
const paragraph = (id: string, value = "") => rule(id).paragraph("en", value);
const element = <T extends HTMLElement>(id: string) =>
  document.getElementById(id) as T;

let view: EditorView;

function select(id: string, value: string) {
  const control = document.getElementById(id) as
    HTMLInputElement | HTMLSelectElement | null;
  if (control) {
    control.value = value;
    control.dispatchEvent(new Event("change"));
    return;
  }
  const boxes = document.querySelectorAll<HTMLInputElement>(
    `input[id^="${id}-"]`,
  );
  for (const box of boxes) box.checked = box.value === value;
  boxes[0].dispatchEvent(new Event("change", { bubbles: true }));
}

function edit(text: string, addition: string) {
  const from = view.state.doc.toString().indexOf(text);
  expect(from).toBeGreaterThanOrEqual(0);
  view.dispatch({ changes: { from: from + 10, insert: addition } });
}

function draft() {
  return view.state.doc.toString();
}

beforeEach(() => {
  const template = new DOMParser().parseFromString(shell, "text/html");
  document.body.innerHTML = template.body.getHTML();
  document.documentElement.dataset.theme = "light";
  view = mount();
});

afterEach(() => {
  view.destroy();
  vi.restoreAllMocks();
});

// Select one rule variant, export it beside a pasted copy, then uncheck it.
function exportVariant(
  variant: { rule: Rule; value: string; language: Language; title: string },
  clipboard: ReturnType<typeof vi.fn>,
) {
  const { rule, value, language, title } = variant;
  const checkbox = element(`rule-${rule.id}`);
  checkbox.click();
  if (rule.setting) select(`setting-${rule.id}`, value);
  const expected = rule.paragraph(language, value);
  expect(draft(), rule.id).toBe(`${title}\n\n${expected}`);

  view.dispatch({
    changes: { from: view.state.doc.length, insert: `\n\n${expected}` },
  });
  element("copy").click();
  expect(clipboard).toHaveBeenLastCalledWith(
    `${title}\n\n${expected}\n\n${expected}`,
  );
  checkbox.click();
  expect(draft(), rule.id).toBe(`${title}\n\n${expected}`);
  expect(document.querySelector(".authored-text")?.textContent).toBe(expected);
  view.dispatch({
    changes: { from: title.length, to: view.state.doc.length },
  });
  expect(draft()).toBe(title);
}

describe("workspace", () => {
  it("shows the default paragraphs and can open groups without changing them", () => {
    const before = draft();
    for (const id of [
      "commits",
      "commit-limit",
      "credentials",
      "traceability",
    ]) {
      expect(element<HTMLInputElement>(`rule-${id}`).checked).toBe(true);
      expect(before).toContain(paragraph(id, rule(id).setting?.initial));
    }
    const header = document.querySelector("summary")!;
    const category = header.closest("details")!;
    category.open = false;
    header.dispatchEvent(
      new PointerEvent("pointerenter", { pointerType: "touch" }),
    );
    expect(category.open).toBe(false);
    header.dispatchEvent(
      new PointerEvent("pointerenter", { pointerType: "mouse" }),
    );
    expect(category.open).toBe(true);
    header.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true, detail: 1 }),
    );
    expect(category.open).toBe(true);
    header.click();
    expect(category.open).toBe(false);
    expect(draft()).toBe(before);
    element("rule-delegation").click();
    expect(draft()).toContain(paragraph("delegation", "prohibited"));
    element("rule-delegation").click();
    expect(draft()).toBe(before);
  });

  it("explains a rule on focus, on hover, by touch-style activation, and closes it", () => {
    const trigger = element("help-delegation");
    const help = element("tooltip-delegation");
    trigger.dispatchEvent(new FocusEvent("focus"));
    expect(help.hidden).toBe(false);
    expect(help.textContent).toBe(rule("delegation").help.en);
    trigger.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );
    expect(help.hidden).toBe(true);
    trigger.dispatchEvent(
      new PointerEvent("pointerenter", { pointerType: "mouse" }),
    );
    expect(help.hidden).toBe(false);
    trigger
      .closest(".rule")!
      .dispatchEvent(
        new PointerEvent("pointerleave", { pointerType: "mouse" }),
      );
    expect(help.hidden).toBe(true);
    trigger.click();
    expect(help.hidden).toBe(false);
    trigger.click();
    expect(help.hidden).toBe(true);
    trigger.click();
    element("rules").click();
    expect(help.hidden).toBe(true);
    trigger.dispatchEvent(new FocusEvent("blur"));
  });

  it("updates unedited settings and preserves exact edited text on uncheck", () => {
    select("setting-commit-limit", "600");
    const original = paragraph("commit-limit", "600");
    expect(draft()).toContain(original);
    edit(original, " ergänzen ");
    expect(element("edit-warning").hidden).toBe(false);
    expect(
      element("rule-commit-limit").getAttribute("aria-describedby"),
    ).toContain("edited-commit-limit");
    expect(document.querySelector(".authored-text")).not.toBeNull();
    const before = draft();
    element("rule-commit-limit").click();
    expect(draft()).toBe(before);
    expect(element("status").textContent).toContain("Kept");
    expect(element("edit-warning").hidden).toBe(true);
    element("rule-commit-limit").click();
    expect(draft()).toContain(original);
    expect(draft()).toContain(" ergänzen ");
  });

  it("can cancel or approve a setting change on an edited rule", async () => {
    edit(paragraph("commit-limit", "300"), " custom ");
    const before = draft();
    const control = element<HTMLInputElement>("setting-commit-limit");
    select(control.id, "600");
    expect(control.value).toBe("300");
    expect(element<HTMLDialogElement>("confirm-change").open).toBe(true);
    expect(element("confirm-rules").textContent).toContain(
      rule("commit-limit").label.en,
    );
    element("cancel-change").click();
    await vi.waitFor(() =>
      expect(element<HTMLDialogElement>("confirm-change").open).toBe(false),
    );
    expect(draft()).toBe(before);
    select(control.id, "600");
    element("apply-change").click();
    await vi.waitFor(() => expect(control.value).toBe("600"));
    expect(draft()).toBe(before);
  });

  it("can cancel or approve an output language change without altering edited text or selection", async () => {
    edit(paragraph("commits"), " first ");
    edit(paragraph("credentials"), " second ");
    view.dispatch({
      changes: { from: view.state.doc.length, insert: "\n\nEigene Zeile." },
    });
    const before = draft();
    view.dispatch({ selection: { anchor: 4, head: 10 } });
    select("ui-language", "de");
    expect(document.documentElement.lang).toBe("de");
    expect(draft()).toBe(before);
    element("theme-toggle").click();
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(view.state.selection.main.from).toBe(4);
    expect(view.state.selection.main.to).toBe(10);
    element("theme-toggle").click();
    expect(document.documentElement.dataset.theme).toBe("light");
    select("document-language", "de");
    expect(element("confirm-rules").children).toHaveLength(2);
    expect(element("confirm-rules").textContent).toContain(
      rule("commits").label.de,
    );
    element("cancel-change").click();
    await vi.waitFor(() =>
      expect(element<HTMLDialogElement>("confirm-change").open).toBe(false),
    );
    expect(draft()).toBe(before);
    expect(element<HTMLSelectElement>("document-language").value).toBe("en");
    select("document-language", "de");
    element("apply-change").click();
    await vi.waitFor(() => expect(draft()).toContain("# Projektanweisungen"));
    expect(draft()).toContain(rule("traceability").paragraph("de", ""));
    expect(draft()).toContain(" first ");
    expect(draft()).toContain(" second ");
    expect(draft()).toContain("Eigene Zeile.");
    select("ui-language", "en");
    expect(element("copy").textContent).toContain("Copy");
    expect(element<HTMLSelectElement>("document-language").value).toBe("de");
  });

  it("accepts a valid coverage threshold and a technology in the user's own words", () => {
    element("rule-coverage").click();
    select("setting-coverage", "96.5");
    expect(draft()).toContain("96.5");
    select("setting-coverage", "101");
    expect(element<HTMLInputElement>("setting-coverage").value).toBe("96.5");
    expect(draft()).not.toContain("101");
    element("rule-technologies").click();
    select("setting-technologies", "Rust, SQLite");
    expect(draft()).toContain("Rust, SQLite");
  });

  it("follows the interface language in the document until the draft is edited", () => {
    select("ui-language", "de");
    expect(element<HTMLSelectElement>("document-language").value).toBe("de");
    expect(draft()).toContain("# Projektanweisungen");
    expect(draft()).toContain(rule("commits").paragraph("de", ""));
    expect(element<HTMLDialogElement>("confirm-change").open).toBe(false);
    select("ui-language", "en");
    expect(element<HTMLSelectElement>("document-language").value).toBe("en");
    expect(draft()).toContain("# Project instructions");
    edit(paragraph("commits"), " eigene ");
    const before = draft();
    select("ui-language", "de");
    expect(element<HTMLSelectElement>("document-language").value).toBe("en");
    expect(draft()).toBe(before);
  });

  it("shows the current word and character count below the draft", () => {
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: "Eins zwei" },
    });
    expect(element("draft-stats").textContent).toBe("2 words · 9 characters");
    view.dispatch({ changes: { from: 0, to: 9, insert: "Ä" } });
    expect(element("draft-stats").textContent).toBe("1 word · 1 character");
    select("ui-language", "de");
    expect(element("draft-stats").textContent).toBe("1 Wort · 1 Zeichen");
    element("select-all").click();
    expect(element("draft-stats").textContent).toMatch(
      /^\d{3,} Wörter · \d+ Zeichen$/,
    );
  });

  it("chooses several languages and frameworks and keeps an edited choice on confirmation", async () => {
    element("rule-languages").click();
    expect(draft()).toContain(paragraph("languages", ""));
    element("setting-languages-python").click();
    element("setting-languages-cpp").click();
    expect(draft()).toContain(paragraph("languages", "python,cpp"));
    element("setting-languages-python").click();
    expect(draft()).toContain(paragraph("languages", "cpp"));
    edit(paragraph("languages", "cpp"), " eigene ");
    const before = draft();
    element("setting-languages-rust").click();
    expect(element<HTMLInputElement>("setting-languages-rust").checked).toBe(
      false,
    );
    expect(element<HTMLDialogElement>("confirm-change").open).toBe(true);
    element("apply-change").click();
    await vi.waitFor(() =>
      expect(element<HTMLInputElement>("setting-languages-rust").checked).toBe(
        true,
      ),
    );
    expect(draft()).toBe(before);
    select("ui-language", "de");
    expect(
      element("setting-languages-shell").closest("label")!.textContent,
    ).toBe("Shell");
    expect(
      element("setting-languages-rust")
        .closest("fieldset")!
        .querySelector("legend")!.textContent,
    ).toBe("Bevorzugte Sprachen");
  });

  it("selects all or none within one category only", () => {
    const inCategory = (id: string) =>
      rules.filter((entry) => entry.category === id);
    edit(paragraph("credentials"), " eigene ");
    element("select-all-software").click();
    for (const entry of inCategory("software"))
      expect(element<HTMLInputElement>(`rule-${entry.id}`).checked).toBe(true);
    for (const entry of inCategory("agent"))
      expect(element<HTMLInputElement>(`rule-${entry.id}`).checked).toBe(false);
    expect(draft()).toContain(paragraph("open-source"));
    element("select-none-repository").click();
    for (const entry of inCategory("repository"))
      expect(element<HTMLInputElement>(`rule-${entry.id}`).checked).toBe(false);
    expect(element<HTMLInputElement>("rule-open-source").checked).toBe(true);
    expect(draft()).toContain(" eigene ");
    expect(element("status").textContent).toBe(
      "Kept your edited text for 1 rule as custom text.",
    );
    expect(element("select-all-software").getAttribute("aria-label")).toBe(
      "Select all in Software and technology",
    );
    select("ui-language", "de");
    expect(element("select-none-software").textContent).toBe("Keine");
    expect(element("select-none-software").getAttribute("aria-label")).toBe(
      "Keine in Software und Technik auswählen",
    );
  });

  it("names the author, the project, and the bundled libraries in About", () => {
    const about = element("about");
    expect(about.querySelector("summary")!.textContent).toBe("About");
    const mail = about.querySelector<HTMLAnchorElement>('a[href^="mailto:"]')!;
    expect(mail.href).toBe("mailto:mail@marcelpetrick.it");
    expect(about.textContent).toContain("Marcel Petrick");
    expect(
      about.querySelector<HTMLAnchorElement>(
        'a[href="https://github.com/marcelpetrick/AgentsTemplateMaker"]',
      ),
    ).not.toBeNull();
    const libraries = [
      ...element("about-libraries").querySelectorAll(":scope > li"),
    ].map((item) => item.textContent);
    expect(libraries).toEqual([
      "@codemirror/commands 6.11.2 · MIT",
      "@codemirror/state 6.7.6 · MIT",
      "@codemirror/view 6.44.0 · MIT",
    ]);
    select("ui-language", "de");
    expect(about.querySelector("summary")!.textContent).toBe("Über");
    expect(element("about-libraries-heading").textContent).toBe(
      "Verwendete Bibliotheken",
    );
  });

  it("selects all rules at once and clears them while keeping edited text", () => {
    edit(paragraph("credentials"), " eigene ");
    element("select-all").click();
    for (const entry of rules) {
      expect(element<HTMLInputElement>(`rule-${entry.id}`).checked).toBe(true);
    }
    expect(draft()).toContain(paragraph("delegation", "prohibited"));
    expect(draft()).toContain(" eigene ");
    element("select-none").click();
    for (const entry of rules) {
      expect(element<HTMLInputElement>(`rule-${entry.id}`).checked).toBe(false);
    }
    expect(draft()).toContain(" eigene ");
    expect(draft()).not.toContain(paragraph("commits"));
    expect(element("status").textContent).toBe(
      "Kept your edited text for 1 rule as custom text.",
    );
    element("select-none").click();
    expect(element("status").textContent).toBe("");
    select("ui-language", "de");
    expect(element("select-all").textContent).toBe("Alle auswählen");
    expect(element("select-none").textContent).toBe("Keine auswählen");
  });

  it("keeps user edits undoable without undoing form changes", () => {
    const before = draft();
    view.dispatch({
      changes: { from: 4, insert: "x" },
      userEvent: "input.type",
    });
    element("rule-credentials").click();
    expect(undo(view)).toBe(true);
    expect(draft()).toContain(before.split("\n", 1)[0]);
    expect(draft()).not.toContain(paragraph("credentials"));
    expect(redo(view)).toBe(true);
    expect(draft()).toContain(before.split("\n", 1)[0].slice(0, 4) + "x");
  });

  it("copies and downloads the exact editor text and reports clipboard failure", async () => {
    const example = "Äußere Worte\n\nSERVICE_TOKEN=<synthetic-placeholder>\n\n";
    view.dispatch({ changes: { from: 0, insert: example } });
    expect(draft()).toContain(example);
    const clipboard = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(navigator, "clipboard", "get").mockReturnValue({
      writeText: clipboard,
    } as unknown as Clipboard);
    element("copy").click();
    await vi.waitFor(() =>
      expect(element("status").textContent).toContain("Copied"),
    );
    expect(clipboard).toHaveBeenCalledWith(draft());
    clipboard.mockRejectedValueOnce(new Error("Denied"));
    element("copy").click();
    await vi.waitFor(() =>
      expect(element("status").textContent).toContain("failed"),
    );

    const create = vi
      .spyOn(URL, "createObjectURL")
      .mockReturnValue("blob:test");
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    element("download").click();
    expect((click.mock.contexts[0] as HTMLAnchorElement).download).toBe(
      "AGENTS.md",
    );
    expect(await (create.mock.calls[0][0] as Blob).text()).toBe(draft());
  });

  it("exports each policy variant and removes only its generated copy in both languages", async () => {
    const clipboard = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(navigator, "clipboard", "get").mockReturnValue({
      writeText: clipboard,
    } as unknown as Clipboard);
    const defaults = rules.filter((entry) => entry.defaultSelected);
    for (const rule of defaults) element(`rule-${rule.id}`).click();

    for (const language of ["en", "de"] as const) {
      select("document-language", language);
      const title = draft();
      for (const rule of rules) {
        for (const value of ruleValues(rule)) {
          exportVariant({ rule, value, language, title }, clipboard);
        }
      }
      await Promise.resolve();
    }
  });
});
