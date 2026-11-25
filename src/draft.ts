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

interface ReplacedText {
  readonly text: string;
  readonly replacement: string;
  readonly ranges: readonly (Span & { id: string })[];
  readonly separators: readonly Span[];
}

export interface AuthorshipUndo {
  readonly ids: readonly string[];
  readonly replacements: readonly ReplacedText[];
}

/** One replaced span in old positions and its replacement in new positions. */
interface Change extends Span {
  readonly newFrom: number;
  readonly newTo: number;
  readonly inserted: string;
}

interface Restored {
  readonly ranges: Map<string, Span>;
  readonly separators: Span[];
  readonly changeStarts: Set<number>;
}

/** Everything needed to recompute rule ranges after a user edit. */
interface Edit {
  readonly draft: Draft;
  readonly changes: ChangeSet;
  readonly text: string;
  readonly restoreGenerated: ReadonlySet<string>;
  readonly restored: Restored;
}

const separator = "\n\n";
const paragraphBoundary = /\n(?:[ \t]*\n)+/;

const byStart = (left: Span, right: Span) => left.from - right.from;

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

/** List each change separately, without merging adjacent ones. */
function changeList(changes: ChangeSet): Change[] {
  const list: Change[] = [];
  // eslint-disable-next-line max-params -- CodeMirror's callback signature.
  changes.iterChanges((from, to, newFrom, newTo, insert) => {
    list.push({ from, to, newFrom, newTo, inserted: insert.toString() });
  }, true);
  return list;
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
  const attached = (atStart ? paragraphs.at(-1) : paragraphs[0]) ?? "";
  // Let Enter start a new paragraph without claiming the line break for the rule.
  return attached.includes("\n") && !attached.trim() ? "" : attached;
}

function continuationIndex(draft: Draft, at: number): number {
  return draft.ranges.findIndex(
    ({ from, to }) =>
      from < to &&
      to < at &&
      /^\n[ \t]*$/.test(draft.text.slice(to, at)) &&
      draft.separators.every((span) => span.from >= at || span.to <= to),
  );
}

function releaseSeparateParagraphs(
  range: RuleRange,
  original: Span | undefined,
  text: string,
): RuleRange {
  const { id, edited } = range;
  if (!original || !edited)
    return { id, from: range.from, to: range.to, edited };

  // A blank line can separate authored text from an untouched rule after
  // both were on the same line. Identify the original by position throughout.
  const prefix = text.slice(range.from, original.from).split(paragraphBoundary);
  const from =
    prefix.length > 1
      ? original.from - (prefix.at(-1) ?? "").length
      : range.from;
  const suffix = text.slice(original.to, range.to).search(paragraphBoundary);
  const to = suffix === -1 ? range.to : original.to + suffix;

  return from === original.from && to === original.to
    ? { id, from, to, edited: false }
    : { id, from, to, edited: true, original };
}

function restoreGeneratedRule(
  range: RuleRange,
  before: RuleRange,
  changes: ChangeSet,
  text: string,
): RuleRange {
  const generatedText = before.generatedText;
  if (!generatedText || !before.edited) return range;

  // A deleted paragraph keeps a zero-width anchor. Undo may restore its whole
  // generated body at that anchor while retaining unrelated form changes.
  const from =
    before.from === before.to ? changes.mapPos(before.from, -1) : range.from;
  const { to } = range;
  return text.slice(from, to) === generatedText
    ? { id: range.id, from, to, edited: false }
    : range;
}

const contains = (outer: Span, inner: Span) =>
  inner.from >= outer.from && inner.to <= outer.to;

const relativeTo = (origin: number, span: Span) => ({
  from: span.from - origin,
  to: span.to - origin,
});

function replacedText(
  before: Draft,
  newlyEdited: readonly RuleRange[],
  change: Change,
): ReplacedText | undefined {
  const ranges = newlyEdited
    .filter((range) => contains(change, range))
    .map((range) => ({ id: range.id, ...relativeTo(change.from, range) }));
  if (ranges.length === 0) return undefined;
  return {
    text: before.text.slice(change.from, change.to),
    replacement: change.inserted,
    ranges,
    separators: before.separators
      .filter((span) => contains(change, span))
      .map((span) => relativeTo(change.from, span)),
  };
}

export function captureAuthorshipUndo(
  before: Draft,
  after: Draft,
  changes: ChangeSet,
): AuthorshipUndo | undefined {
  const authored = new Set(
    after.ranges.filter(({ edited }) => edited).map(({ id }) => id),
  );
  const newlyEdited = before.ranges.filter(
    ({ id, edited }) => !edited && authored.has(id),
  );
  if (newlyEdited.length === 0) return undefined;

  const replacements = changeList(changes)
    .filter((change) => change.from !== change.to)
    .map((change) => replacedText(before, newlyEdited, change))
    .filter((replacement) => replacement !== undefined);
  return { ids: newlyEdited.map(({ id }) => id), replacements };
}

/** Whether undo restores this rule's generated text at the changed span. */
function restoresPrior(
  draft: Draft,
  change: Change,
  prior: ReplacedText["ranges"][number],
) {
  const range = draft.ranges.find(({ id }) => id === prior.id);
  if (!range) return false;
  const matchesPosition =
    range.from === range.to
      ? range.from === change.from || range.from === change.to
      : range.from === change.from && range.to === change.to;
  return (
    matchesPosition &&
    range.generatedText === change.inserted.slice(prior.from, prior.to)
  );
}

function matchReplacement(
  draft: Draft,
  change: Change,
  replacements: readonly ReplacedText[],
) {
  const removed = draft.text.slice(change.from, change.to);
  for (const replacement of replacements) {
    if (
      replacement.text !== change.inserted ||
      replacement.replacement !== removed
    )
      continue;
    const candidates = replacement.ranges.filter((prior) =>
      restoresPrior(draft, change, prior),
    );
    if (candidates.length > 0) return { replacement, candidates };
  }
  return undefined;
}

function restoredReplacements(
  draft: Draft,
  changes: ChangeSet,
  replacements: readonly ReplacedText[],
): Restored {
  const restored: Restored = {
    ranges: new Map(),
    separators: [],
    changeStarts: new Set(),
  };
  if (replacements.length === 0) return restored;

  for (const change of changeList(changes)) {
    const match = matchReplacement(draft, change, replacements);
    if (!match) continue;
    const offset = (span: Span) => ({
      from: change.newFrom + span.from,
      to: change.newFrom + span.to,
    });
    for (const prior of match.candidates)
      restored.ranges.set(prior.id, offset(prior));
    restored.separators.push(
      ...match.replacement.separators.map((span) => offset(span)),
    );
    restored.changeStarts.add(change.from);
  }
  return restored;
}

/** An inverse insertion for a deleted rule belongs to that rule. */
function restoresDeletedRule(edit: Edit, change: Change) {
  return edit.draft.ranges.some(
    (range) =>
      range.from === change.from &&
      range.to === change.from &&
      edit.restoreGenerated.has(range.id) &&
      range.generatedText === change.inserted,
  );
}

// If deleting a separator made two rules touch, assign the insertion once.
function insertionOwner(draft: Draft, at: number): number {
  const inside = draft.ranges.findIndex(
    (range) => range.from < at && at <= range.to,
  );
  if (inside !== -1) return inside;
  const start = draft.ranges.findIndex(
    (range) => range.from === at && at < range.to,
  );
  return start === -1 ? continuationIndex(draft, at) : start;
}

function attachInsertion(
  before: RuleRange,
  after: RuleRange,
  change: Change,
): RuleRange {
  const { from, newFrom, newTo, inserted } = change;
  const atStart = from === before.from;
  const atEnd = from >= before.to;
  const continuation = from > before.to;
  const attached =
    atStart || atEnd ? boundaryInsertion(inserted, atStart) : inserted;
  if (!attached || (continuation && !attached.trim())) return after;
  return {
    ...after,
    from: atStart ? Math.min(after.from, newTo - attached.length) : after.from,
    to: atEnd ? Math.max(after.to, newFrom + attached.length) : after.to,
    edited: true,
  };
}

function applyInsertion(edit: Edit, mapped: RuleRange[], change: Change) {
  // The inverse insertion belongs to the restored rule even when a
  // neighboring paragraph now touches the zero-width anchor.
  if (restoresDeletedRule(edit, change)) return;
  const index = insertionOwner(edit.draft, change.from);
  if (index === -1) return;
  mapped[index] = attachInsertion(
    edit.draft.ranges[index],
    mapped[index],
    change,
  );
}

const overlaps = (range: Span, change: Change) =>
  change.from < range.to && change.to > range.from && range.from !== range.to;

function applyReplacement(edit: Edit, mapped: RuleRange[], change: Change) {
  for (const [index, before] of edit.draft.ranges.entries()) {
    if (!overlaps(before, change)) continue;
    const after = mapped[index];
    const belongsToRule = contains(before, change);
    mapped[index] = {
      ...after,
      from: belongsToRule ? Math.min(after.from, change.newFrom) : after.from,
      to: belongsToRule ? Math.max(after.to, change.newTo) : after.to,
      edited: true,
    };
  }
}

/** Forget an original position once an edit touches it. */
function forgetTouched(originals: (Span | undefined)[], change: Change) {
  for (const [index, original] of originals.entries()) {
    if (original && change.from < original.to && change.to > original.from)
      originals[index] = undefined;
  }
}

function resolveRange(
  edit: Edit,
  range: RuleRange,
  before: RuleRange,
  original: Span | undefined,
): RuleRange {
  const restoredSpan = edit.restored.ranges.get(range.id);
  if (restoredSpan) return { id: range.id, ...restoredSpan, edited: false };

  const { changes, text } = edit;
  const separated = releaseSeparateParagraphs(
    range,
    original && mapSpan(original, changes),
    text,
  );
  const resolved = edit.restoreGenerated.has(range.id)
    ? restoreGeneratedRule(separated, before, changes, text)
    : separated;
  if (!resolved.edited) return resolved;
  return {
    ...resolved,
    generatedText:
      before.generatedText ?? edit.draft.text.slice(before.from, before.to),
  };
}

function manualRanges(edit: Edit): RuleRange[] {
  const { draft, changes } = edit;
  const mapped = draft.ranges.map((range) => mapRange(range, changes));
  const originals = draft.ranges.map((range) =>
    range.edited ? range.original : { from: range.from, to: range.to },
  );

  for (const change of changeList(changes)) {
    if (edit.restored.changeStarts.has(change.from)) continue;
    forgetTouched(originals, change);
    if (change.from === change.to) applyInsertion(edit, mapped, change);
    else applyReplacement(edit, mapped, change);
  }

  return mapped.map((range, index) =>
    resolveRange(edit, range, draft.ranges[index], originals[index]),
  );
}

export function editDraft(
  draft: Draft,
  changes: ChangeSet,
  authorshipUndo: readonly AuthorshipUndo[] = [],
): Draft {
  if (changes.empty) return draft;
  const restored = restoredReplacements(
    draft,
    changes,
    authorshipUndo.flatMap(({ replacements }) => replacements),
  );
  const edit: Edit = {
    draft,
    changes,
    text: applyText(draft, changes),
    restoreGenerated: new Set(authorshipUndo.flatMap(({ ids }) => ids)),
    restored,
  };
  return {
    text: edit.text,
    ranges: manualRanges(edit),
    separators: [
      ...mapSeparators(draft, changes),
      ...restored.separators,
    ].toSorted(byStart),
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
  const endsBlock =
    range.to === draft.text.length || draft.text[range.to] === "\n";
  if (before && (after || endsBlock))
    return { from: before.from, to: range.to };
  const startsBlock = range.from === 0 || draft.text[range.from - 1] === "\n";
  return after && startsBlock ? { from: range.from, to: after.to } : range;
}

function insertionPoint(
  draft: Draft,
  id: string,
  order: readonly string[],
): Span {
  const index = order.indexOf(id);
  const next =
    index === -1
      ? undefined
      : draft.ranges.find((range) => order.indexOf(range.id) > index);
  const from = next?.from ?? draft.text.length;
  return { from, to: from };
}

interface Replacement {
  readonly draft: Draft;
  readonly changes: ChangeSet;
}

/**
 * Leave the text alone. Forget an edited rule that is unchecked, or record
 * the new generated wording of an edited rule.
 */
function keepAuthoredText(
  draft: Draft,
  existing: RuleRange | undefined,
  text: string | undefined,
): Replacement {
  const changes = ChangeSet.empty(draft.text.length);
  if (!existing) return { draft, changes };
  if (text === undefined) {
    const ranges = draft.ranges.filter((range) => range !== existing);
    return { draft: { ...draft, ranges }, changes };
  }
  if (text === existing.generatedText) return { draft, changes };
  // Keep the authored wording. Its previous generated version must stay
  // authored if undo restores it after the setting or language changed.
  const { id, from, to } = existing;
  const updated = { id, from, to, edited: true, generatedText: text };
  const ranges = draft.ranges.map((range) =>
    range === existing ? updated : range,
  );
  return { draft: { ...draft, ranges }, changes };
}

function replacedSpan(
  draft: Draft,
  existing: RuleRange | undefined,
  text: string | undefined,
  insertAt: () => Span,
): Span {
  if (!existing) return insertAt();
  return text === undefined ? removalSpan(draft, existing) : existing;
}

/** Add the generated range and its new separators after a replacement. */
function addGenerated(
  generated: { ranges: RuleRange[]; separators: Span[] },
  id: string,
  inserted: { at: number; prefix: string; text: string; suffix: string },
) {
  const { at, prefix, text, suffix } = inserted;
  const from = at + prefix.length;
  const to = from + text.length;
  generated.ranges.push({ from, to, id, edited: false });
  if (prefix) generated.separators.push({ from: at, to: from });
  if (suffix) generated.separators.push({ from: to, to: to + suffix.length });
}

function regenerateRule(
  draft: Draft,
  existing: RuleRange | undefined,
  rule: { id: string; text: string | undefined },
  order: readonly string[],
): Replacement {
  const { id, text } = rule;
  const span = replacedSpan(draft, existing, text, () =>
    insertionPoint(draft, id, order),
  );
  const prefix = existing ? "" : separatorBefore(draft.text, span.from);
  const suffix = existing || span.to === draft.text.length ? "" : separator;
  const changes = ChangeSet.of(
    { from: span.from, to: span.to, insert: prefix + (text ?? "") + suffix },
    draft.text.length,
  );
  const generated = {
    ranges: draft.ranges
      .filter((range) => range !== existing)
      .map((range) => mapRange(range, changes)),
    separators: mapSeparators(draft, changes),
  };
  if (text !== undefined)
    addGenerated(generated, id, { at: span.from, prefix, text, suffix });
  return {
    draft: {
      text: applyText(draft, changes),
      ranges: generated.ranges.toSorted(byStart),
      separators: generated.separators.toSorted(byStart),
    },
    changes,
  };
}

export function replaceRule(
  draft: Draft,
  id: string,
  text: string | undefined,
  order: readonly string[],
): Replacement {
  const existing = draft.ranges.find((range) => range.id === id);
  const keepsText = existing ? existing.edited : text === undefined;
  return keepsText
    ? keepAuthoredText(draft, existing, text)
    : regenerateRule(draft, existing, { id, text }, order);
}

export function authoredRanges(draft: Draft): readonly Span[] {
  const generated = [
    ...draft.separators,
    ...draft.ranges.filter((range) => !range.edited),
  ].toSorted(byStart);
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
