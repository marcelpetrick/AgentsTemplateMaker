// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later

import { ChangeSet, Text } from "@codemirror/state";

interface Span {
  readonly from: number;
  readonly to: number;
}

export interface RuleRange extends Span {
  readonly id: string;
  readonly edited: boolean;
  // Keep the original positions while authored text adjoins an untouched rule.
  readonly original?: Span;
  readonly generatedText?: string;
}

export interface Draft {
  readonly text: string;
  readonly ranges: readonly RuleRange[];
  readonly separators: readonly Span[];
}

const separator = "\n\n";
const paragraphBoundary = /\n(?:[ \t]*\n)+/;

export function createDraft(
  title: string,
  paragraphs: readonly { id: string; text: string }[],
): Draft {
  const ranges: RuleRange[] = [
    { id: "title", from: 0, to: title.length, edited: false },
  ];
  const separators: Span[] = [];
  let text = title;
  for (const paragraph of paragraphs) {
    const from = text.length + separator.length;
    separators.push({ from: text.length, to: from });
    text += separator + paragraph.text;
    ranges.push({ from, to: text.length, id: paragraph.id, edited: false });
  }
  return { text, ranges, separators };
}

function applyText(draft: Draft, changes: ChangeSet): string {
  return changes.apply(Text.of(draft.text.split("\n"))).toString();
}

function mapSpan(span: Span, changes: ChangeSet): Span {
  const from = changes.mapPos(span.from, 1);
  return { from, to: Math.max(from, changes.mapPos(span.to, -1)) };
}

function mapRange(range: RuleRange, changes: ChangeSet): RuleRange {
  const { original } = range;
  const mapped = { ...range, ...mapSpan(range, changes) };
  return original
    ? { ...mapped, original: mapSpan(original, changes) }
    : mapped;
}

function mapSeparators(draft: Draft, changes: ChangeSet): Span[] {
  const mapped: Span[] = [];
  // A gap is an unchanged stretch of the previous document. Intersecting it with
  // each separator preserves the provenance of untouched whitespace after a split.
  changes.iterGaps((oldStart, newStart, length) => {
    for (const span of draft.separators) {
      const from = Math.max(span.from, oldStart);
      const to = Math.min(span.to, oldStart + length);
      if (from < to) {
        mapped.push({
          from: newStart + from - oldStart,
          to: newStart + to - oldStart,
        });
      }
    }
  });
  return mapped;
}

function boundaryInsertion(insert: string, atStart: boolean): string {
  const paragraphs = insert.split(paragraphBoundary);
  const attached = atStart ? paragraphs[paragraphs.length - 1] : paragraphs[0];
  // Let Enter start a new paragraph without claiming the line break for the rule.
  return attached.includes("\n") && !attached.trim() ? "" : attached;
}

function continuationIndex(draft: Draft, at: number): number {
  return draft.ranges.findIndex(
    ({ from, to }) =>
      from < to &&
      to < at &&
      /^\n[ \t]*$/.test(draft.text.slice(to, at)) &&
      !draft.separators.some((span) => span.from < at && span.to > to),
  );
}

function releaseSeparateParagraphs(
  range: RuleRange,
  original: Span | undefined,
  text: string,
): RuleRange {
  const { id, edited } = range;
  let { from, to } = range;
  if (!edited || !original) return { id, from, to, edited };

  // A blank line can separate authored text from an untouched rule after
  // both were on the same line. Identify the original by position throughout.
  const prefix = text.slice(from, original.from).split(paragraphBoundary);
  if (prefix.length > 1)
    from = original.from - prefix[prefix.length - 1].length;
  const suffix = text.slice(original.to, to).search(paragraphBoundary);
  if (suffix >= 0) to = original.to + suffix;

  if (from === original.from && to === original.to) {
    return { id, from, to, edited: false };
  }
  return { id, from, to, edited: true, original };
}

function restoreGeneratedRule(
  range: RuleRange,
  before: RuleRange,
  changes: ChangeSet,
  text: string,
): RuleRange {
  const generatedText = before.generatedText;
  if (!before.edited || !generatedText) return range;

  // A deleted paragraph keeps a zero-width anchor. Undo may restore its whole
  // generated body at that anchor while retaining unrelated form changes.
  const from =
    before.from === before.to ? changes.mapPos(before.from, -1) : range.from;
  const { to } = range;
  if (text.slice(from, to) === generatedText) {
    return { id: range.id, from, to, edited: false };
  }
  return range;
}

function manualRanges(
  draft: Draft,
  changes: ChangeSet,
  text: string,
  restoreGenerated: ReadonlySet<string>,
): RuleRange[] {
  const mapped = draft.ranges.map((range) => mapRange(range, changes));
  const originals = draft.ranges.map((range) =>
    range.edited ? range.original : { from: range.from, to: range.to },
  );

  changes.iterChanges((from, to, newFrom, newTo, insert) => {
    for (const [index, original] of originals.entries()) {
      if (original && from < original.to && to > original.from) {
        originals[index] = undefined;
      }
    }
    if (from === to) {
      const inserted = insert.toString();
      // An inverse insertion for a deleted rule belongs to that rule even
      // when a neighboring paragraph now touches the zero-width anchor.
      if (
        draft.ranges.some(
          (range) =>
            range.from === from &&
            range.to === from &&
            restoreGenerated.has(range.id) &&
            range.generatedText === inserted,
        )
      )
        return;

      // If deleting a separator made two rules touch, assign the insertion once.
      let index = draft.ranges.findIndex(
        (range) => range.from < from && from <= range.to,
      );
      if (index < 0) {
        index = draft.ranges.findIndex(
          (range) => range.from === from && from < range.to,
        );
      }
      if (index < 0) index = continuationIndex(draft, from);
      if (index < 0) return;

      const before = draft.ranges[index];
      const after = mapped[index];
      const atStart = from === before.from;
      const atEnd = from >= before.to;
      const continuation = from > before.to;
      const attached =
        atStart || atEnd ? boundaryInsertion(inserted, atStart) : inserted;
      if (attached && (!continuation || attached.trim())) {
        mapped[index] = {
          ...after,
          from: atStart
            ? Math.min(after.from, newTo - attached.length)
            : after.from,
          to: atEnd ? Math.max(after.to, newFrom + attached.length) : after.to,
          edited: true,
        };
      }
      return;
    }

    for (const [index, before] of draft.ranges.entries()) {
      if (from >= before.to || to <= before.from || before.from === before.to)
        continue;
      const after = mapped[index];
      const belongsToRule = from >= before.from && to <= before.to;
      mapped[index] = {
        ...after,
        from: belongsToRule ? Math.min(after.from, newFrom) : after.from,
        to: belongsToRule ? Math.max(after.to, newTo) : after.to,
        edited: true,
      };
    }
  }, true);

  return mapped.map((range, index) => {
    const before = draft.ranges[index];
    const original = originals[index];
    const separated = releaseSeparateParagraphs(
      range,
      original && mapSpan(original, changes),
      text,
    );
    const restored = restoreGenerated.has(range.id)
      ? restoreGeneratedRule(separated, before, changes, text)
      : separated;
    if (!restored.edited) return restored;
    return {
      ...restored,
      generatedText:
        before.generatedText ?? draft.text.slice(before.from, before.to),
    };
  });
}

export function editDraft(
  draft: Draft,
  changes: ChangeSet,
  restoreGenerated: ReadonlySet<string> = new Set(),
): Draft {
  if (changes.empty) return draft;
  const text = applyText(draft, changes);
  return {
    text,
    ranges: manualRanges(draft, changes, text, restoreGenerated),
    separators: mapSeparators(draft, changes),
  };
}

function separatorBefore(text: string, at: number): string {
  const preceding = text.slice(0, at);
  if (at === 0 || /\n[ \t]*\n$/.test(preceding)) return "";
  return preceding.endsWith("\n") ? "\n" : separator;
}

function removalSpan(draft: Draft, range: RuleRange): Span {
  const before = draft.separators.find((span) => span.to === range.from);
  const after = draft.separators.find((span) => span.from === range.to);
  // Remove one adjoining generated separator when the other side still
  // separates surviving content, or when the removed rule is at an edge.
  if (
    before &&
    (after || range.to === draft.text.length || draft.text[range.to] === "\n")
  ) {
    return { from: before.from, to: range.to };
  }
  if (after && (range.from === 0 || draft.text[range.from - 1] === "\n")) {
    return { from: range.from, to: after.to };
  }
  return range;
}

function insertionPoint(
  draft: Draft,
  id: string,
  order: readonly string[],
): Span {
  const index = order.indexOf(id);
  const next =
    index < 0
      ? undefined
      : draft.ranges.find((range) => order.indexOf(range.id) > index);
  const from = next?.from ?? draft.text.length;
  return { from, to: from };
}

export function replaceRule(
  draft: Draft,
  id: string,
  text: string | undefined,
  order: readonly string[],
): { draft: Draft; changes: ChangeSet } {
  const existing = draft.ranges.find((range) => range.id === id);
  const remaining = draft.ranges.filter((range) => range !== existing);

  if (existing?.edited || (!existing && text === undefined)) {
    let ranges = draft.ranges;
    if (existing?.edited && text === undefined) {
      ranges = remaining;
    } else if (
      existing?.edited &&
      text !== undefined &&
      text !== existing.generatedText
    ) {
      // Keep the authored wording. Its previous generated version must stay
      // authored if undo restores it after the setting or language changed.
      const updated = {
        id,
        from: existing.from,
        to: existing.to,
        edited: true,
        generatedText: text,
      };
      ranges = ranges.map((range) => (range === existing ? updated : range));
    }
    return {
      draft: ranges === draft.ranges ? draft : { ...draft, ranges },
      changes: ChangeSet.empty(draft.text.length),
    };
  }

  const span = existing
    ? text === undefined
      ? removalSpan(draft, existing)
      : existing
    : insertionPoint(draft, id, order);
  const prefix = existing ? "" : separatorBefore(draft.text, span.from);
  const suffix = existing || span.to === draft.text.length ? "" : separator;
  const changes = ChangeSet.of(
    { from: span.from, to: span.to, insert: prefix + (text ?? "") + suffix },
    draft.text.length,
  );
  const ranges = remaining.map((range) => mapRange(range, changes));
  const separators = mapSeparators(draft, changes);
  if (text !== undefined) {
    const from = span.from + prefix.length;
    const to = from + text.length;
    ranges.push({ from, to, id, edited: false });
    if (prefix) separators.push({ from: span.from, to: from });
    if (suffix) separators.push({ from: to, to: to + suffix.length });
  }
  return {
    draft: {
      text: applyText(draft, changes),
      ranges: ranges.sort((left, right) => left.from - right.from),
      separators: separators.sort((left, right) => left.from - right.from),
    },
    changes,
  };
}

export function authoredRanges(draft: Draft): readonly Span[] {
  const generated = [
    ...draft.separators,
    ...draft.ranges.filter((range) => !range.edited),
  ].sort((left, right) => left.from - right.from);
  const authored: Span[] = [];
  let start = 0;
  for (const span of generated) {
    if (start < span.from) authored.push({ from: start, to: span.from });
    start = span.to;
  }
  if (start < draft.text.length)
    authored.push({ from: start, to: draft.text.length });
  return authored;
}
