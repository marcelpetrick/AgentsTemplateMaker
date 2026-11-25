// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later

import { isolateHistory, redo, undo } from "@codemirror/commands";
import { afterEach, describe, expect, it } from "vitest";
import { authoredRanges, createDraft, replaceRule } from "../src/draft";
import { openEditor } from "../src/editor";

const first = "First generated rule.";
const second = "Second generated rule.";
const order = ["title", "earlier", "first", "second"];

function fixture() {
  const host = document.createElement("div");
  document.body.append(host);
  const initial = createDraft("# Guide", [
    { id: "first", text: first },
    { id: "second", text: second },
  ]);
  const editor = openEditor(host, initial, () => {});
  cleanups.push(() => {
    editor.view.destroy();
    host.remove();
  });
  return { initial, editor };
}

const cleanups: (() => void)[] = [];
afterEach(() => {
  while (cleanups.length) cleanups.pop()!();
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
