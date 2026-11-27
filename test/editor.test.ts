// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later

import { isolateHistory, redo, undo } from "@codemirror/commands";
import { EditorView } from "@codemirror/view";
import { afterEach, describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { authoredRanges, createDraft, replaceRule } from "../src/draft";
import { openEditor } from "../src/editor";

const first = "First generated rule.";
const second = "Second generated rule.";
const order = ["title", "earlier", "first", "second"];

function fixture(onDraftChange: () => void = () => {}) {
  const host = document.createElement("div");
  document.body.append(host);
  const initial = createDraft("# Guide", [
    { id: "first", text: first },
    { id: "second", text: second },
  ]);
  const editor = openEditor(host, initial, onDraftChange);
  cleanups.push(() => {
    editor.view.destroy();
    host.remove();
  });
  return { initial, editor };
}

const cleanups: (() => void)[] = [];
afterEach(() => {
  while (cleanups.length > 0) cleanups.pop()!();
});

describe("undo restores generated rule authorship", () => {
  it("allows unchecking a rule whose internal edit was undone", () => {
    const { initial, editor } = fixture();
    const position = initial.ranges[1].from + 4;
    editor.view.dispatch({
      changes: { from: position, insert: "X" },
      userEvent: "input.type",
    });
    expect(authoredRanges(editor.draft)).toEqual([
      { from: initial.ranges[1].from, to: initial.ranges[1].to + 1 },
    ]);
    expect(undo(editor.view)).toBe(true);
    expect(editor.draft.text).toBe(initial.text);
    expect(authoredRanges(editor.draft)).toEqual([]);

    const unchecked = replaceRule(editor.draft, "first", undefined, order);
    expect(unchecked.draft.text).toBe("# Guide\n\n" + second);
  });

  it("restores an exact separator after grouped typing and deletion are undone", () => {
    const { initial, editor } = fixture();
    const gap = initial.ranges[1].to;
    editor.view.dispatch({
      changes: { from: gap, to: gap + 1 },
      userEvent: "delete.backward",
    });
    editor.view.dispatch({
      changes: { from: 0, insert: "x" },
      userEvent: "input.type",
    });
    editor.view.dispatch({
      changes: { from: 1, insert: "y" },
      userEvent: "input.type",
    });
    while (undo(editor.view));
    expect(editor.draft).toEqual(initial);
    expect(redo(editor.view)).toBe(true);
    expect(editor.draft.text).not.toBe(initial.text);
    while (undo(editor.view));
    expect(authoredRanges(editor.draft)).toEqual([]);
  });

  it("restores a deleted whole rule after an unrelated form change shifts it", () => {
    const { initial, editor } = fixture();
    const { from, to } = initial.ranges[1];
    editor.view.dispatch({ changes: { from, to }, userEvent: "delete" });
    expect(editor.draft.ranges[1].edited).toBe(true);

    const earlier = replaceRule(
      editor.draft,
      "earlier",
      "Added by the form.",
      order,
    );
    editor.set(earlier.draft, earlier.changes);
    expect(undo(editor.view)).toBe(true);
    expect(editor.draft.text).toBe(
      "# Guide\n\nAdded by the form.\n\n" + first + "\n\n" + second,
    );
    expect(authoredRanges(editor.draft)).toEqual([]);
    const unchecked = replaceRule(editor.draft, "first", undefined, order);
    expect(unchecked.draft.text).toBe(
      "# Guide\n\nAdded by the form.\n\n" + second,
    );
    expect(redo(editor.view)).toBe(true);
    expect(editor.draft.text).toBe(earlier.draft.text);
    expect(editor.draft.ranges.find(({ id }) => id === "first")?.edited).toBe(
      true,
    );
  });

  it("restores generated spans and separators after deleting the draft with a personal copy", () => {
    const { initial, editor } = fixture();
    const separate = isolateHistory.of("full");
    editor.view.dispatch({
      changes: { from: initial.text.length, insert: "\n\n" + first },
      annotations: separate,
    });
    const before = editor.draft;
    editor.view.dispatch({
      changes: { from: 0, to: before.text.length },
      annotations: separate,
    });

    expect(undo(editor.view)).toBe(true);
    expect(editor.draft.text).toBe(before.text);
    expect(authoredRanges(editor.draft)).toEqual(authoredRanges(before));
    const unchecked = replaceRule(editor.draft, "first", undefined, order);
    expect(unchecked.draft.text).toBe("# Guide\n\n" + second + "\n\n" + first);
  });

  it("restores generated rules and separators after replacing the whole draft", () => {
    const { initial, editor } = fixture();
    editor.view.dispatch({
      changes: {
        from: 0,
        to: initial.text.length,
        insert: "A handwritten replacement.",
      },
      annotations: isolateHistory.of("full"),
    });

    expect(undo(editor.view)).toBe(true);
    expect(editor.draft.text).toBe(initial.text);
    expect(authoredRanges(editor.draft)).toEqual([]);
    expect(
      replaceRule(editor.draft, "first", undefined, order).draft.text,
    ).toBe("# Guide\n\n" + second);
  });

  it("restores a deleted rule once when it touches another generated rule", () => {
    const { initial, editor } = fixture();
    const { from, to } = initial.ranges[2];
    const separate = isolateHistory.of("full");
    editor.view.dispatch({
      changes: { from: from - 2, to: from },
      annotations: separate,
    });
    editor.view.dispatch({
      changes: { from: from - 2, to: to - 2 },
      annotations: separate,
    });
    expect(undo(editor.view)).toBe(true);
    expect(editor.draft.text).toBe("# Guide\n\n" + first + second);
    expect(authoredRanges(editor.draft)).toEqual([]);
    expect(
      replaceRule(editor.draft, "second", undefined, order).draft.text,
    ).toBe("# Guide\n\n" + first);
  });

  it("keeps the prior generated wording authored after its form setting changes", () => {
    const { initial, editor } = fixture();
    const { from, to } = initial.ranges[1];
    editor.view.dispatch({
      changes: { from: from + 4, insert: "X" },
      userEvent: "input.type",
    });
    const changed = replaceRule(editor.draft, "first", "New wording.", order);
    editor.set(changed.draft, changed.changes);

    expect(undo(editor.view)).toBe(true);
    expect(editor.draft.text).toBe(initial.text);
    expect(authoredRanges(editor.draft)).toEqual([{ from, to }]);
    expect(
      replaceRule(editor.draft, "first", undefined, order).draft.text,
    ).toBe(initial.text);
  });

  it("keeps a separately written identical copy authored when undo restores it", () => {
    const { initial, editor } = fixture();
    const { from, to } = initial.ranges[1];
    const separate = isolateHistory.of("full");
    editor.view.dispatch({ changes: { from, to }, annotations: separate });
    editor.view.dispatch({
      changes: { from, insert: first },
      annotations: separate,
    });
    editor.view.dispatch({ changes: { from, to }, annotations: separate });

    expect(undo(editor.view)).toBe(true);
    expect(editor.draft.text).toBe(initial.text);
    expect(authoredRanges(editor.draft)).toEqual([{ from, to }]);
    expect(
      replaceRule(editor.draft, "first", undefined, order).draft.text,
    ).toBe(initial.text);
  });

  it("keeps the form's selection after undo restores a detached rule's text", () => {
    const { initial, editor } = fixture();
    const { from, to } = initial.ranges[1];
    editor.view.dispatch({ changes: { from, to }, userEvent: "delete" });
    const unchecked = replaceRule(editor.draft, "first", undefined, order);
    editor.set(unchecked.draft, unchecked.changes);
    expect(undo(editor.view)).toBe(true);
    expect(editor.draft.text).toBe(initial.text);
    expect(editor.draft.ranges.some(({ id }) => id === "first")).toBe(false);
    expect(authoredRanges(editor.draft)).toEqual([{ from, to }]);
  });
});

const lineTexts = (view: { dom: HTMLElement }, selector: string) =>
  [...view.dom.querySelectorAll(selector)].map((line) => line.textContent);

describe("editor presentation", () => {
  it("underlines authored text and marks the first line of each authored paragraph", () => {
    const { initial, editor } = fixture();
    const end = initial.text.length;
    editor.view.dispatch({
      changes: [
        { from: initial.ranges[1].from + 5, insert: "X" },
        { from: end, insert: "\n\nMine.\nStill mine.\n \n\n  Indented." },
      ],
    });
    expect(lineTexts(editor.view, ".authored-line")).toEqual([
      "FirstX generated rule.",
      "Mine.",
      "  Indented.",
    ]);
    expect(lineTexts(editor.view, ".authored-text")).toEqual([
      "FirstX generated rule.",
      "Mine.",
      "Still mine.",
      " ",
      "  Indented.",
    ]);
  });

  it("finds paragraphs after plain blank lines, indentation, and one-letter lines", () => {
    const { initial, editor } = fixture();
    const end = initial.text.length;
    editor.view.dispatch({
      changes: { from: end, insert: "\n\nA\n\n  B\n\nc\n\n" },
    });
    expect(lineTexts(editor.view, ".authored-line")).toEqual(["A", "  B", "c"]);
  });

  it("tracks a user edit that carries another effect", () => {
    const onDraftChange = vi.fn();
    const { initial, editor } = fixture(onDraftChange);
    const end = initial.text.length;
    editor.view.dispatch({
      changes: { from: end, insert: "\n\nMine." },
      effects: EditorView.scrollIntoView(0),
    });
    expect(onDraftChange).toHaveBeenCalledTimes(1);
    expect(authoredRanges(editor.draft)).toEqual([{ from: end, to: end + 7 }]);
  });

  // The browser handles Ctrl+Z natively, so use a command that only the
  // CodeMirror keymap provides.
  it("binds the default editing keys", async () => {
    const { initial, editor } = fixture();
    editor.view.focus();
    await userEvent.keyboard("{Control>}]{/Control}");
    expect(editor.draft.text).toBe("  " + initial.text);
  });

  it("marks no line for whitespace-only authored text", () => {
    const { initial, editor } = fixture();
    const end = initial.text.length;
    editor.view.dispatch({ changes: { from: end, insert: "\n\n  " } });
    expect(lineTexts(editor.view, ".authored-line")).toEqual([]);
  });

  it("labels the editable content for assistive technology", () => {
    const { editor } = fixture();
    editor.describe("Markdown editor", "de");
    const content = editor.view.contentDOM;
    expect(content.getAttribute("aria-label")).toBe("Markdown editor");
    expect(content.getAttribute("aria-describedby")).toBe(
      "editor-help edit-warning",
    );
    expect(content.getAttribute("lang")).toBe("de");
  });

  it("reports user edits but not form replacements or reconfiguration", () => {
    const onDraftChange = vi.fn();
    const { editor } = fixture(onDraftChange);
    editor.describe("Label", "en");
    expect(onDraftChange).not.toHaveBeenCalled();
    const added = replaceRule(editor.draft, "earlier", "Earlier.", order);
    editor.set(added.draft, added.changes);
    expect(onDraftChange).not.toHaveBeenCalled();
    editor.view.dispatch({ changes: { from: 0, insert: "X" } });
    expect(onDraftChange).toHaveBeenCalledTimes(1);
  });
});
