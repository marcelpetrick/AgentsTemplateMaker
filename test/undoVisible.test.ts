// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later

import { ChangeSet, Text } from "@codemirror/state";
import { describe, expect, it } from "vitest";
import {
  authoredRanges,
  captureAuthorshipUndo,
  createDraft,
  editDraft,
  replaceRule,
  type Draft,
} from "../src/draft";

type Spec = { from: number; to?: number; insert?: string }[];

const three = () =>
  createDraft("# T", [
    { id: "a", text: "Aa b." },
    { id: "b", text: "Bb c." },
    { id: "c", text: "Cc d." },
  ]);

/** What the user sees: the text, the underlined spans, and edited rules. */
const visible = (draft: Draft) => ({
  text: draft.text,
  authored: authoredRanges(draft).map(
    ({ from, to }) => `${String(from)}-${String(to)}`,
  ),
  edited: draft.ranges.filter(({ edited }) => edited).map(({ id }) => id),
});

function step(draft: Draft, spec: Spec) {
  const changes = ChangeSet.of(spec, draft.text.length);
  const edited = editDraft(draft, changes);
  const capture = captureAuthorshipUndo(draft, edited, changes);
  const inverse = changes.invert(Text.of(draft.text.split("\n")));
  const effects = capture ? [capture] : [];
  return {
    edited,
    undo: (current: Draft) => editDraft(current, inverse, effects),
    /** Undo after a form change, with the inverse mapped like the history does. */
    undoAfter: (form: { draft: Draft; changes: ChangeSet }) =>
      editDraft(form.draft, inverse.map(form.changes), effects),
  };
}

function specs(length: number): Spec[] {
  const list: Spec[] = [];
  for (const insert of ["x", "\n", "\n\n", "\n x"])
    for (let at = 0; at <= length; at++) list.push([{ from: at, insert }]);
  for (const size of [1, 2, 5, 7])
    for (let from = 0; from + size <= length; from++) {
      list.push(
        [{ from, to: from + size }],
        [{ from, to: from + size, insert: "z" }],
      );
      if (from + size + 2 <= length)
        list.push([
          { from, insert: "\n x" },
          { from: from + 2, to: from + size + 2 },
        ]);
    }
  return list;
}

describe("undo", () => {
  it("restores the visible authorship of every single and second edit", () => {
    const failures: string[] = [];
    const draft = three();
    for (const first of specs(draft.text.length)) {
      const one = step(draft, first);
      const undone = one.undo(one.edited);
      if (JSON.stringify(visible(undone)) !== JSON.stringify(visible(draft)))
        failures.push(
          `${JSON.stringify(first)} -> ${JSON.stringify(visible(undone))}`,
        );
      for (const second of specs(one.edited.text.length)) {
        const two = step(one.edited, second);
        const back = two.undo(two.edited);
        if (
          JSON.stringify(visible(back)) !== JSON.stringify(visible(one.edited))
        )
          failures.push(
            `${JSON.stringify(first)} then ${JSON.stringify(second)}`,
          );
      }
    }
    expect(failures.length, failures.slice(0, 15).join("\n")).toBe(0);
  });

  it("restores generated authorship when a form change came between edit and undo", () => {
    const order = ["title", "earlier", "a", "b", "c"];
    const addEarlier = (draft: Draft) =>
      replaceRule(draft, "earlier", "Ee f.", order);
    const failures: string[] = [];
    const draft = three();
    const expected = visible(addEarlier(draft).draft);
    for (const spec of specs(draft.text.length)) {
      const one = step(draft, spec);
      const undone = one.undoAfter(addEarlier(one.edited));
      // A form change next to edited text can place the new rule differently.
      // Where undo restores the same text, it must restore the same authorship.
      if (
        undone.text === expected.text &&
        JSON.stringify(visible(undone)) !== JSON.stringify(expected)
      )
        failures.push(
          `${JSON.stringify(spec)} -> ${JSON.stringify(visible(undone))}`,
        );
    }
    expect(failures.length, failures.slice(0, 15).join("\n")).toBe(0);
  });

  it("keeps earlier authored text when a later edit is undone after a form change", () => {
    const order = ["title", "earlier", "a", "b", "c"];
    const addEarlier = (draft: Draft) =>
      replaceRule(draft, "earlier", "Ee f.", order);
    const failures: string[] = [];
    const draft = three();
    for (const first of specs(draft.text.length)) {
      const one = step(draft, first);
      const expected = visible(addEarlier(one.edited).draft);
      for (const second of specs(one.edited.text.length)) {
        const two = step(one.edited, second);
        const undone = two.undoAfter(addEarlier(two.edited));
        if (
          undone.text === expected.text &&
          JSON.stringify(visible(undone)) !== JSON.stringify(expected)
        )
          failures.push(
            `${JSON.stringify(first)} then ${JSON.stringify(second)}`,
          );
      }
    }
    expect(failures.length, failures.slice(0, 15).join("\n")).toBe(0);
  });
});
