// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import {
  Compartment,
  EditorState,
  StateEffect,
  StateField,
  Transaction,
  type ChangeSet,
} from "@codemirror/state";
import {
  defaultKeymap,
  history,
  historyKeymap,
  invertedEffects,
} from "@codemirror/commands";
import { Decoration, EditorView, keymap } from "@codemirror/view";
import {
  authoredRanges,
  captureAuthorshipUndo,
  editDraft,
  type AuthorshipUndo,
  type Draft,
} from "./draft";

const replaceDraft = StateEffect.define<Draft>();
const restoreGenerated = StateEffect.define<AuthorshipUndo>();
const draftField = StateField.define<Draft>({
  create() {
    throw new Error("Initialize the editor with a draft");
  },
  update(draft, transaction) {
    const replacement = transaction.effects.find((effect) =>
      effect.is(replaceDraft),
    );
    if (replacement) return replacement.value;
    const restored = transaction.effects.flatMap((effect) =>
      effect.is(restoreGenerated) ? [effect.value] : [],
    );
    return editDraft(draft, transaction.changes, restored);
  },
  provide(field) {
    return EditorView.decorations.from(field, (draft) => {
      const textMark = Decoration.mark({ class: "authored-text" });
      const lineMark = Decoration.line({ class: "authored-line" });
      const lineStarts = new Set<number>();
      const decoration = authoredRanges(draft).flatMap(({ from, to }) => {
        const content = draft.text.slice(from, to);
        const first = content.search(/\S/);
        if (first >= 0) {
          const starts = [from + first];
          for (const match of content.matchAll(/\n[ \t]*\n\s*(?=\S)/g)) {
            starts.push(from + match.index + match[0].length);
          }
          for (const point of starts) {
            lineStarts.add(draft.text.lastIndexOf("\n", point - 1) + 1);
          }
        }
        return textMark.range(from, to);
      });
      for (const start of lineStarts) decoration.push(lineMark.range(start));
      return Decoration.set(decoration, true);
    });
  },
});

const authorshipHistory = invertedEffects.of((transaction) => {
  if (!transaction.docChanged) return [];
  const restore = captureAuthorshipUndo(
    transaction.startState.field(draftField),
    transaction.state.field(draftField),
    transaction.changes,
  );
  return restore ? [restoreGenerated.of(restore)] : [];
});

export function openEditor(
  parent: HTMLElement,
  initial: Draft,
  onDraftChange: () => void,
) {
  const accessibility = new Compartment();
  const view = new EditorView({
    parent,
    state: EditorState.create({
      doc: initial.text,
      extensions: [
        draftField.init(() => initial),
        accessibility.of([]),
        EditorView.lineWrapping,
        keymap.of([...defaultKeymap, ...historyKeymap]),
        history(),
        authorshipHistory,
        EditorView.updateListener.of((update) => {
          if (
            update.transactions.some(
              (transaction) =>
                transaction.docChanged &&
                !transaction.effects.some((effect) => effect.is(replaceDraft)),
            )
          ) {
            onDraftChange();
          }
        }),
      ],
    }),
  });

  return {
    view,
    get draft() {
      return view.state.field(draftField);
    },
    set(draft: Draft, changes: ChangeSet) {
      view.dispatch({
        changes,
        effects: replaceDraft.of(draft),
        annotations: Transaction.addToHistory.of(false),
      });
    },
    describe(label: string, language: string) {
      view.dispatch({
        effects: accessibility.reconfigure(
          EditorView.contentAttributes.of({
            "aria-label": label,
            "aria-describedby": "editor-help edit-warning",
            lang: language,
          }),
        ),
      });
    },
  };
}
