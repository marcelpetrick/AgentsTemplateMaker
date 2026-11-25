// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later

import { ChangeSet } from "@codemirror/state";
import { describe, expect, it } from "vitest";
import {
  authoredRanges,
  createDraft,
  editDraft,
  replaceRule,
  type Draft,
} from "../src/draft";

const order = ["title", "a", "b", "c"];
const base = () =>
  createDraft("# Guide", [
    { id: "a", text: "Same opening. First." },
    { id: "b", text: "Same opening. Second." },
  ]);
const edit = (draft: Draft, from: number, to: number, insert: string) =>
  editDraft(draft, ChangeSet.of({ from, to, insert }, draft.text.length));
const chunks = (draft: Draft) =>
  authoredRanges(draft).map(({ from, to }) => draft.text.slice(from, to));

describe("the Markdown draft", () => {
  it("retains an edited rule word for word when it is unchecked", () => {
    const draft = base();
    const end = draft.ranges[1].to;
    const edited = edit(draft, end, end, " Für dieses Projekt.");
    const result = replaceRule(edited, "a", undefined, order);

    expect(result.changes.empty).toBe(true);
    expect(result.draft.text).toBe(edited.text);
    expect(result.draft.ranges.map(({ id }) => id)).toEqual(["title", "b"]);
    expect(chunks(result.draft)).toEqual([
      "Same opening. First. Für dieses Projekt.",
    ]);
  });

  it("updates and toggles similar generated rules independently in catalog order", () => {
    const draft = base();
    const changed = replaceRule(
      draft,
      "a",
      "Same opening. Updated.",
      order,
    ).draft;
    expect(changed.text).toBe(
      "# Guide\n\nSame opening. Updated.\n\nSame opening. Second.",
    );

    const without = replaceRule(changed, "a", undefined, order).draft;
    expect(without.text).toBe("# Guide\n\nSame opening. Second.");
    const restored = replaceRule(
      without,
      "a",
      "Same opening. First.",
      order,
    ).draft;
    expect(restored).toEqual(draft);
    expect(replaceRule(restored, "a", undefined, order).draft.text).toBe(
      without.text,
    );
  });

  it("keeps identical pasted copies above and below the generated range", () => {
    const draft = base();
    const { from, to } = draft.ranges[1];
    const copied = draft.text.slice(from, to);
    const changes = ChangeSet.of(
      [
        { from, insert: copied + "\n\n" },
        { from: to, insert: "\n\n" + copied },
      ],
      draft.text.length,
    );
    const edited = editDraft(draft, changes);
    expect(edited.ranges[1].edited).toBe(false);
    expect(chunks(edited)).toEqual([copied + "\n\n", "\n\n" + copied]);

    const result = replaceRule(edited, "a", undefined, order);
    expect(result.draft.text).toBe(
      "# Guide\n\n" +
        copied +
        "\n\n\n\n" +
        copied +
        "\n\nSame opening. Second.",
    );
    expect(chunks(result.draft).join("")).toBe(copied + "\n\n\n\n" + copied);
  });

  it("preserves independently inserted content and its blank lines across settings changes", () => {
    const draft = base();
    const { from } = draft.ranges[2];
    const custom = "Äußerst wichtig!\n\n";
    const edited = edit(draft, from, from, custom);
    const changed = replaceRule(
      edited,
      "b",
      "Gleicher Anfang. Danach.",
      order,
    ).draft;
    const removed = replaceRule(changed, "a", undefined, order).draft;

    expect(chunks(removed)).toEqual([custom]);
    expect(removed.text).toBe(
      "# Guide\n\n" + custom + "Gleicher Anfang. Danach.",
    );
  });

  it("tracks replacements precisely even when the entire generated paragraph is replaced", () => {
    const draft = base();
    const { from, to } = draft.ranges[1];
    const edited = edit(draft, from, to, "Ich bin jetzt der Inhalt.");
    expect(edited.ranges[1]).toEqual({
      id: "a",
      from,
      to: from + "Ich bin jetzt der Inhalt.".length,
      edited: true,
    });
    expect(chunks(edited)).toEqual(["Ich bin jetzt der Inhalt."]);
    expect(replaceRule(edited, "a", "Replacement", order).draft.text).toBe(
      edited.text,
    );
  });

  it("does not resurrect a manually deleted selected rule", () => {
    const draft = base();
    const { from, to } = draft.ranges[1];
    const edited = edit(draft, from, to, "");
    expect(edited.ranges[1]).toEqual({ id: "a", from, to: from, edited: true });
    expect(replaceRule(edited, "a", undefined, order).draft.text).toBe(
      edited.text,
    );
  });

  it("retains a partial replacement spanning two rules without duplicate range ownership", () => {
    const draft = base();
    const start = draft.ranges[1].to - 2;
    const end = draft.ranges[2].from + 2;
    const edited = edit(draft, start, end, "⁂");
    expect(
      edited.ranges.filter(({ edited }) => edited).map(({ id }) => id),
    ).toEqual(["a", "b"]);
    expect(chunks(edited)).toEqual(["Same opening. Firs⁂me opening. Second."]);
    expect(replaceRule(edited, "a", undefined, order).draft.text).toBe(
      edited.text,
    );
  });

  it("lets writers start a new paragraph at a generated rule boundary", () => {
    const draft = base();
    const { to } = draft.ranges[2];
    const line = edit(draft, to, to, "\n");
    const paragraph = edit(line, to + 1, to + 1, "\n");
    const written = edit(paragraph, to + 2, to + 2, "My own paragraph");
    expect(written.ranges[2].edited).toBe(false);
    expect(chunks(written)).toEqual(["\n\nMy own paragraph"]);
    expect(replaceRule(written, "b", undefined, order).draft.text).toBe(
      "# Guide\n\nSame opening. First.\n\nMy own paragraph",
    );
  });

  it("handles a boundary paste that edits the existing paragraph and starts an independent one", () => {
    const draft = base();
    const { to } = draft.ranges[2];
    const written = edit(draft, to, to, " Extension.\n\nIndependent.");
    expect(written.ranges[2].to).toBe(to + " Extension.".length);
    expect(chunks(written)).toEqual([
      "Same opening. Second. Extension.\n\nIndependent.",
    ]);
  });

  it("retains custom text after its originating rule is checked again", () => {
    const draft = base();
    const { from } = draft.ranges[1];
    const edited = edit(draft, from, from, "Prefix. ");
    const unchecked = replaceRule(edited, "a", undefined, order).draft;
    const rechecked = replaceRule(
      unchecked,
      "a",
      "First rule again.",
      order,
    ).draft;
    expect(rechecked.text).toBe(
      "# Guide\n\nPrefix. Same opening. First.\n\nFirst rule again.\n\nSame opening. Second.",
    );
    expect(chunks(rechecked)).toEqual(["Prefix. Same opening. First."]);
  });

  it("supports appended rules, empty operations, and a custom-edited title", () => {
    const draft = createDraft("# Guide", []);
    const appended = replaceRule(draft, "c", "Third.", order).draft;
    const missing = replaceRule(appended, "a", undefined, order);
    expect(missing.draft).toBe(appended);
    expect(missing.changes.empty).toBe(true);
    expect(editDraft(appended, missing.changes)).toBe(appended);
    expect(appended.text).toBe("# Guide\n\nThird.");
    const titled = edit(appended, 2, 7, "Projekt");
    expect(titled.ranges[0].edited).toBe(true);
    expect(chunks(titled)).toEqual(["# Projekt"]);
  });

  it("tracks both sides of a split generated separator without claiming inserted text", () => {
    const draft = base();
    const { to } = draft.ranges[1];
    const written = edit(draft, to + 1, to + 1, "Inserted line");
    expect(chunks(written)).toEqual(["Inserted line"]);
    expect(written.ranges[1].edited).toBe(false);
    expect(written.ranges[2].edited).toBe(false);
  });

  it("removes the generated separator when the other separator is authored", () => {
    const draft = base();
    const { from } = draft.ranges[1];
    const written = edit(draft, from - 2, from, "\n \n");
    const removed = replaceRule(written, "a", undefined, order).draft;
    expect(removed.text).toBe("# Guide\n \nSame opening. Second.");
    expect(chunks(removed)).toEqual(["\n \n"]);
  });

  it("does not split authored text when an earlier rule is selected", () => {
    const draft = createDraft("# Guide", [{ id: "b", text: "Second." }]);
    const filled = edit(
      draft,
      draft.ranges[1].from,
      draft.ranges[1].from + 2,
      "S",
    );
    const withCustom = edit(filled, 0, 0, "An introduction.\n\n");
    const inserted = replaceRule(withCustom, "a", "First.", order).draft;
    expect(inserted.text).toBe(
      "An introduction.\n\n# Guide\n\nFirst.\n\nScond.",
    );
    expect(chunks(inserted)).toEqual(["An introduction.\n\n", "Scond."]);
  });
});
