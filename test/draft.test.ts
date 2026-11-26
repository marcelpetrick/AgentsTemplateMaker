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
  type AuthorshipUndo,
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

  it("releases a typed prefix when the writer separates it into its own paragraph", () => {
    const draft = base();
    const { from, to } = draft.ranges[1];
    const copied = draft.text.slice(from, to);
    const written = edit(draft, from, from, copied);
    const boundary = from + copied.length;
    const firstEnter = edit(written, boundary, boundary, "\n");
    const secondEnter = edit(firstEnter, boundary + 1, boundary + 1, "\n");

    expect(written.ranges[1].edited).toBe(true);
    expect(secondEnter.ranges[1].edited).toBe(false);
    const removed = replaceRule(secondEnter, "a", undefined, order).draft;
    expect(removed.text).toBe(
      "# Guide\n\n" + copied + "\n\nSame opening. Second.",
    );
    expect(chunks(removed)).toEqual([copied + "\n\n"]);
  });

  it("releases a typed suffix after an unrelated control shifts the rule", () => {
    const draft = base();
    const { to } = draft.ranges[2];
    const sentence = "Independent words";
    const written = edit(draft, to, to, sentence);
    const withoutFirst = replaceRule(written, "a", undefined, order).draft;
    const boundary = withoutFirst.text.length - sentence.length;
    const separated = edit(withoutFirst, boundary, boundary, "\n \n");

    expect(separated.ranges[1].edited).toBe(false);
    const removed = replaceRule(separated, "b", undefined, order).draft;
    expect(removed.text).toBe("# Guide\n \n" + sentence);
    expect(chunks(removed)).toEqual(["\n \n" + sentence]);
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
    expect(edited.ranges[1]).toMatchObject({
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
    expect(edited.ranges[1]).toMatchObject({
      id: "a",
      from,
      to: from,
      edited: true,
    });
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

  it.each(["a", "b"])(
    "treats text below a single line break in rule %s as a continuation",
    (id) => {
      const draft = base();
      const range = draft.ranges.find((candidate) => candidate.id === id)!;
      const line = edit(draft, range.to, range.to, "\n");
      const indented = edit(line, range.to + 1, range.to + 1, " ");
      const continued = edit(
        indented,
        range.to + 2,
        range.to + 2,
        "A continuation.",
      );

      expect(
        continued.ranges.find((candidate) => candidate.id === id)?.edited,
      ).toBe(true);
      expect(chunks(continued)).toEqual([
        draft.text.slice(range.from, range.to) + "\n A continuation.",
      ]);
      const removed = replaceRule(continued, id, undefined, order).draft;
      expect(removed.text).toBe(continued.text);
      expect(chunks(removed)).toEqual(chunks(continued));
    },
  );

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

describe("rule boundaries", () => {
  it("does not claim a single line break typed after a rule", () => {
    const draft = base();
    const { to } = draft.ranges[2];
    const line = edit(draft, to, to, "\n");
    expect(line.ranges[2]).toEqual({
      id: "b",
      from: to - 21,
      to,
      edited: false,
    });
    expect(chunks(line)).toEqual(["\n"]);
  });

  it("continues a rule with text pasted on its next line", () => {
    const draft = base();
    const { from, to } = draft.ranges[2];
    const pasted = edit(draft, to, to, "\nMore.");
    expect(pasted.ranges[2]).toMatchObject({ from, to: to + 6, edited: true });
    expect(chunks(pasted)).toEqual(["Same opening. Second.\nMore."]);
  });

  it("continues a rule with text typed on its next line without indentation", () => {
    const draft = base();
    const { from, to } = draft.ranges[2];
    const line = edit(draft, to, to, "\n");
    const continued = edit(line, to + 1, to + 1, "More.");
    expect(continued.ranges[2]).toMatchObject({
      from,
      to: to + 6,
      edited: true,
    });
  });

  it("keeps only the authored words on the rule's line when a prefix has paragraphs", () => {
    const draft = base();
    const { from, to } = draft.ranges[1];
    const prefix = "One.\n\n\nTwo.\n\nLead ";
    const written = edit(draft, from, from, prefix);
    expect(written.ranges[1]).toMatchObject({
      from: from + prefix.length - "Lead ".length,
      to: to + prefix.length,
      edited: true,
    });
    expect(chunks(written)).toEqual([prefix + "Same opening. First."]);
  });

  it("releases the words after a blank line typed inside an authored suffix", () => {
    const draft = base();
    const { from, to } = draft.ranges[1];
    const typed = edit(draft, to, to, " Tail more.");
    const split = edit(typed, to + 5, to + 5, "\n\n");
    expect(split.ranges[1]).toMatchObject({ from, to: to + 5, edited: true });
    expect(chunks(split)).toEqual(["Same opening. First. Tail\n\n more."]);
  });

  it("records generated text only on edited rules", () => {
    const draft = base();
    const { to } = draft.ranges[1];
    const edited = edit(draft, to, to, "!");
    expect(edited.ranges[1].generatedText).toBe("Same opening. First.");
    expect(edited.ranges[2]).toEqual({
      ...draft.ranges[2],
      from: draft.ranges[2].from + 1,
      to: draft.ranges[2].to + 1,
    });
    expect(edited.ranges[0]).toEqual(draft.ranges[0]);
  });
});

describe("form changes on edited rules", () => {
  const editedBase = () => {
    const draft = base();
    const { to } = draft.ranges[1];
    return edit(draft, to, to, " Mine.");
  };

  it("leaves the draft unchanged when the generated wording stays the same", () => {
    const edited = editedBase();
    const result = replaceRule(edited, "a", "Same opening. First.", order);
    expect(result.draft).toBe(edited);
    expect(result.changes.empty).toBe(true);
  });

  it("keeps the authored text and records the new generated wording", () => {
    const edited = editedBase();
    const { from, to } = edited.ranges[1];
    const result = replaceRule(edited, "a", "Updated wording.", order);
    expect(result.changes.empty).toBe(true);
    expect(result.draft.text).toBe(edited.text);
    expect(result.draft.ranges[1]).toEqual({
      id: "a",
      from,
      to,
      edited: true,
      generatedText: "Updated wording.",
    });
  });
});

describe("rule insertion", () => {
  it("appends a rule after the last paragraph with one generated separator", () => {
    const draft = base();
    const appended = replaceRule(draft, "c", "Third.", order).draft;
    const end = draft.text.length;
    expect(appended.text).toBe(draft.text + "\n\nThird.");
    expect(appended.separators).toEqual([
      ...draft.separators,
      { from: end, to: end + 2 },
    ]);
    expect(appended.ranges.at(-1)).toEqual({
      id: "c",
      from: end + 2,
      to: end + 8,
      edited: false,
    });
  });

  it("adds a single line break after authored text that ends with one", () => {
    const draft = base();
    const end = draft.text.length;
    const line = edit(draft, end, end, "\n");
    const appended = replaceRule(line, "c", "Third.", order).draft;
    expect(appended.text).toBe(draft.text + "\n\nThird.");
    expect(appended.separators.at(-1)).toEqual({ from: end + 1, to: end + 2 });
  });

  it("adds no separator after authored text that ends with a blank line", () => {
    const draft = base();
    const end = draft.text.length;
    const blank = edit(draft, end, end, "\n \n");
    const appended = replaceRule(blank, "c", "Third.", order).draft;
    expect(appended.text).toBe(draft.text + "\n \nThird.");
    expect(appended.separators).toEqual(draft.separators);
  });

  it("appends a rule that is missing from the catalog order", () => {
    const draft = base();
    const appended = replaceRule(draft, "unknown", "Extra.", order).draft;
    expect(appended.text).toBe(draft.text + "\n\nExtra.");
  });

  it("inserts before the next rule in catalog order with a trailing separator", () => {
    const draft = createDraft("# Guide", [{ id: "b", text: "Second." }]);
    const inserted = replaceRule(draft, "a", "First.", order).draft;
    expect(inserted.text).toBe("# Guide\n\nFirst.\n\nSecond.");
    expect(inserted.separators).toEqual([
      { from: 7, to: 9 },
      { from: 15, to: 17 },
    ]);
  });
});

// Two-step sequences that a differential fuzzer found while hunting
// surviving mutants. Each pins the owner of text typed near a rule boundary.
const three = () =>
  createDraft("# T", [
    { id: "a", text: "Aa b." },
    { id: "b", text: "Bb c." },
    { id: "c", text: "Cc d." },
  ]);

describe("edits near rule boundaries after an earlier edit", () => {
  const range = (draft: Draft, id: string) =>
    draft.ranges.find((candidate) => candidate.id === id);

  it("keeps the title generated when paragraphs are typed below it", () => {
    const inside = edit(three(), 8, 8, "\n x");
    const typed = edit(inside, 4, 4, "y\n\nz");
    expect(range(typed, "title")).toEqual({
      id: "title",
      from: 0,
      to: 3,
      edited: false,
    });
    expect(chunks(typed)).toEqual(["y\n\nz", "Aa \n xb."]);
  });

  it("does not give a line typed after a deleted rule to that rule", () => {
    const deleted = edit(three(), 5, 11, "\n");
    const inside = edit(deleted, 11, 11, "\n x");
    const typed = edit(inside, 6, 6, "\n x");
    expect(range(typed, "a")).toMatchObject({ from: 5, to: 5, edited: true });
    expect(range(typed, "b")).toMatchObject({ from: 10, to: 18, edited: true });
    expect(chunks(typed)).toEqual(["\n\n x", "Bb c\n x."]);
  });

  it("does not extend a rule over a blank line with spaces", () => {
    const draft = three();
    const spaced = editDraft(
      draft,
      ChangeSet.of(
        [
          { from: 20, insert: "\n \n" },
          { from: 24, insert: "\n \n" },
        ],
        draft.text.length,
      ),
    );
    const typed = edit(spaced, 30, 30, "y\n\nz");
    expect(range(typed, "c")).toMatchObject({ from: 19, to: 27, edited: true });
  });

  it("does not claim spaces typed on a blank line after a rule", () => {
    const blank = edit(three(), 10, 10, "\n \n");
    const spaced = edit(blank, 11, 11, " ");
    expect(range(spaced, "a")).toEqual({
      id: "a",
      from: 5,
      to: 10,
      edited: false,
    });
  });

  it("keeps only the last of several typed prefix paragraphs on the rule's line", () => {
    const prefixed = edit(three(), 12, 12, "p q r ");
    const changes = ChangeSet.of(
      [
        { from: 13, insert: "\n\n" },
        { from: 15, insert: "\n\n" },
      ],
      prefixed.text.length,
    );
    const split = editDraft(prefixed, changes);
    expect(split.text.slice(12, 27)).toBe("p\n\n q\n\n r Bb c.");
    expect(range(split, "b")).toMatchObject({ from: 19, to: 27, edited: true });
  });

  it("adds a rule without a separator to an emptied draft", () => {
    const draft = three();
    const emptied = edit(draft, 0, draft.text.length, "");
    const added = replaceRule(emptied, "d", "Dd e.", [
      "title",
      "a",
      "b",
      "c",
      "d",
    ]);
    expect(added.draft.text).toBe("Dd e.");
  });

  it("removes a rule at the start of the draft with its following separator", () => {
    const untitled = edit(three(), 0, 5, "");
    const removed = replaceRule(untitled, "a", undefined, [
      "title",
      "a",
      "b",
      "c",
    ]);
    expect(removed.draft.text).toBe("Bb c.\n\nCc d.");
  });

  it("keeps the title generated when blank lines are typed after it", () => {
    const replaced = edit(three(), 3, 9, "\n \n");
    const typed = edit(replaced, 4, 4, "\n \n");
    expect(range(typed, "title")).toMatchObject({ to: 3, edited: false });
    expect(chunks(typed)).toEqual(["\n\n \n \n."]);
  });

  it("keeps a deleted rule authored when undo brings back other wording", () => {
    const draft = three();
    const step = historyStep(
      draft,
      ChangeSet.of([{ from: 3, to: 10, insert: "\n x" }], draft.text.length),
    );
    const changed = replaceRule(step.edited, "a", "Cc d.", [
      "title",
      "a",
      "b",
      "c",
    ]).draft;
    const undone = step.undo(changed);
    expect(undone.text).toBe(draft.text);
    expect(range(undone, "a")).toMatchObject({
      from: 10,
      to: 10,
      edited: true,
    });
  });
});

/**
 * Apply `changes` like an editor transaction and return what the history
 * needs: the edited draft, its undo, and the effects a redo would carry.
 */
function historyStep(
  draft: Draft,
  changes: ChangeSet,
  restore: readonly AuthorshipUndo[] = [],
) {
  const edited = editDraft(draft, changes, restore);
  const capture = captureAuthorshipUndo(draft, edited, changes);
  const inverse = changes.invert(Text.of(draft.text.split("\n")));
  const effects = (undo: AuthorshipUndo | undefined) => (undo ? [undo] : []);
  const undo = (current: Draft) =>
    editDraft(current, inverse, effects(capture));
  const redoOf = (undone: Draft) =>
    effects(captureAuthorshipUndo(edited, undone, inverse));
  return { edited, undo, redoOf };
}

// Every single edit of a small draft, with the undo and redo that the editor
// history applies and the form toggles that follow. The reviewed file
// snapshot records the complete resulting ranges, so a change to any of them
// becomes a visible text change instead of a surviving mutant.
describe("edit matrix", () => {
  const matrixOrder = ["title", "a", "b", "c", "d"];
  const start = three;

  const describeRange = (range: Draft["ranges"][number]) => {
    const flag = range.edited ? "*" : "";
    const original = range.original
      ? ` o=${String(range.original.from)}-${String(range.original.to)}`
      : "";
    const generated =
      range.generatedText === undefined
        ? ""
        : ` g=${JSON.stringify(range.generatedText)}`;
    return `${range.id}${flag}@${String(range.from)}-${String(range.to)}${original}${generated}`;
  };

  const describeDraft = (draft: Draft) => {
    const ranges = draft.ranges.map((range) => describeRange(range)).join(" ");
    const separators = draft.separators
      .map(({ from, to }) => `${String(from)}-${String(to)}`)
      .join(" ");
    return `${JSON.stringify(draft.text)} | ${ranges} | sep ${separators} | authored ${JSON.stringify(chunks(draft))}`;
  };

  const toggles = (edited: Draft) => {
    const removed = replaceRule(edited, "b", undefined, matrixOrder).draft;
    const changed = replaceRule(edited, "b", "New b.", matrixOrder).draft;
    return [
      `uncheck b: ${describeDraft(removed)}`,
      `change b: ${describeDraft(changed)}`,
    ];
  };

  function scenario(name: string, changes: ChangeSet): string[] {
    const draft = start();
    const step = historyStep(draft, changes);
    const { edited } = step;
    const undone = step.undo(edited);
    const redone = historyStep(undone, changes, step.redoOf(undone)).edited;
    const same = (left: Draft, right: Draft) =>
      describeDraft(left) === describeDraft(right);
    return [
      `## ${name}`,
      `edit: ${describeDraft(edited)}`,
      same(undone, draft) ? "undo: original" : `undo: ${describeDraft(undone)}`,
      same(redone, edited) ? "redo: edit" : `redo: ${describeDraft(redone)}`,
      ...toggles(edited),
    ];
  }

  type Spec = { from: number; to?: number; insert?: string }[];

  function editSpecs(length: number): [string, Spec][] {
    const specs: [string, Spec][] = [];
    for (const insert of ["x", " ", "\n", "\n\n", "x\n\ny", "x\n\n\ny", "\n x"])
      for (let at = 0; at <= length; at++)
        specs.push([
          `insert ${JSON.stringify(insert)} at ${String(at)}`,
          [{ from: at, insert }],
        ]);
    for (let at = 1; at < length; at++)
      specs.push([
        `delete ${String(at - 1)}-${String(at)} and insert at ${String(at)}`,
        [
          { from: at - 1, to: at },
          { from: at, insert: "x" },
        ],
      ]);
    for (const size of [1, 2, 3, 5, 7])
      for (let from = 0; from + size <= length; from++) {
        const to = from + size;
        const span = `${String(from)}-${String(to)}`;
        specs.push(
          [`delete ${span}`, [{ from, to }]],
          [`replace ${span}`, [{ from, to, insert: "z" }]],
        );
      }
    for (let at = 0; at + 3 <= length; at++)
      specs.push([
        `insert around ${String(at)}-${String(at + 3)}`,
        [
          { from: at, insert: "x" },
          { from: at + 3, insert: "y" },
        ],
      ]);
    return specs;
  }

  // Second edits on drafts that already carry authored text, a deleted rule,
  // touching rules, or a full replacement, each undone in history order.
  const seeds: [string, Spec][] = [
    ["suffix on a", [{ from: 10, insert: " x" }]],
    ["prefix on b", [{ from: 12, insert: "y " }]],
    ["b deleted with its separator", [{ from: 10, to: 17 }]],
    ["b text deleted", [{ from: 12, to: 17 }]],
    ["a and b touching", [{ from: 10, to: 12 }]],
    ["draft replaced", [{ from: 0, to: 24, insert: "w" }]],
  ];

  function secondSpecs(length: number): [string, Spec][] {
    const specs: [string, Spec][] = [];
    for (let at = 0; at <= length; at++)
      for (const insert of ["x", "\n\n"])
        specs.push([
          `insert ${JSON.stringify(insert)} at ${String(at)}`,
          [{ from: at, insert }],
        ]);
    for (const size of [1, 2])
      for (let from = 0; from + size <= length; from++)
        specs.push([
          `delete ${String(from)}-${String(from + size)}`,
          [{ from, to: from + size }],
        ]);
    return specs;
  }

  const shortDraft = (draft: Draft) =>
    describeDraft(draft).split(" | ").slice(1, 3).join(" | ");

  function twoStep(seed: Spec, second: Spec): string {
    const draft = start();
    const first = historyStep(draft, ChangeSet.of(seed, draft.text.length));
    const both = historyStep(
      first.edited,
      ChangeSet.of(second, first.edited.text.length),
    );
    const undoSecond = both.undo(both.edited);
    const undoFirst = first.undo(undoSecond);
    const outcome = (left: Draft, right: Draft) =>
      shortDraft(left) === shortDraft(right) ? "ok" : shortDraft(left);
    return `${shortDraft(both.edited)} || undo ${outcome(undoSecond, first.edited)} || undo ${outcome(undoFirst, draft)}`;
  }

  it("records ranges and undo for a second edit on edited drafts", async () => {
    const lines = seeds.flatMap(([seedName, seed]) => {
      const length = editDraft(start(), ChangeSet.of(seed, 24)).text.length;
      return [
        `## ${seedName}`,
        ...secondSpecs(length).map(
          ([name, spec]) => `${name}: ${twoStep(seed, spec)}`,
        ),
      ];
    });
    await expect(lines.join("\n") + "\n").toMatchFileSnapshot(
      "__snapshots__/draft-history.md",
    );
  });

  it("records ranges, undo, redo, and form toggles for every single edit", async () => {
    const length = start().text.length;
    const lines = editSpecs(length).flatMap(([name, spec]) =>
      scenario(name, ChangeSet.of(spec, length)),
    );
    await expect(lines.join("\n") + "\n").toMatchFileSnapshot(
      "__snapshots__/draft.md",
    );
  });
});
