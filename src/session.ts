// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import type { Language } from "./catalog";
import type { Draft } from "./draft";

/** The workspace state that survives a reload. */
export interface Session {
  readonly uiLanguage: Language;
  readonly outputLanguage: Language;
  readonly selected: readonly string[];
  readonly settings: Readonly<Record<string, string>>;
  readonly draft: Draft;
}

const key = "agent-maker:session:v1";
const languages = new Set<unknown>(["en", "de"]);

type Shape = Record<string, unknown>;

const isObject = (value: unknown): value is Shape =>
  typeof value === "object" && value !== null;

const isStrings = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((entry) => typeof entry === "string");

const isOffset = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= 0;

function isSpan(value: unknown, length: number): value is Shape {
  if (!isObject(value)) return false;
  const { from, to } = value;
  return isOffset(from) && isOffset(to) && from <= to && to <= length;
}

function isRange(value: unknown, length: number) {
  if (!isSpan(value, length)) return false;
  const { id, edited, original, generatedText } = value;
  return (
    typeof id === "string" &&
    typeof edited === "boolean" &&
    (original === undefined || isSpan(original, Infinity)) &&
    (generatedText === undefined || typeof generatedText === "string")
  );
}

function readDraft(value: unknown, ids: ReadonlySet<string>) {
  if (!isObject(value)) return undefined;
  const { text, ranges, separators } = value;
  if (
    typeof text !== "string" ||
    !Array.isArray(ranges) ||
    !Array.isArray(separators) ||
    ranges.some((range) => !isRange(range, text.length)) ||
    separators.some((span) => !isSpan(span, text.length))
  )
    return undefined;
  const draft = { text, ranges, separators } as Draft;
  // A rule removed from the catalog leaves its text as the user's own.
  return { ...draft, ranges: draft.ranges.filter(({ id }) => ids.has(id)) };
}

function readSession(value: unknown, ids: ReadonlySet<string>) {
  if (!isObject(value)) return undefined;
  const { uiLanguage, outputLanguage, selected, settings } = value;
  const draft = readDraft(value.draft, ids);
  if (
    !draft ||
    !languages.has(uiLanguage) ||
    !languages.has(outputLanguage) ||
    !isStrings(selected) ||
    !isObject(settings)
  )
    return undefined;
  const values = Object.entries(settings).filter(
    (entry): entry is [string, string] =>
      ids.has(entry[0]) && typeof entry[1] === "string",
  );
  return {
    uiLanguage: uiLanguage as Language,
    outputLanguage: outputLanguage as Language,
    selected: selected.filter((id) => ids.has(id)),
    settings: Object.fromEntries(values),
    draft,
  };
}

// Reading localStorage itself throws when the browser blocks site data.
/** Read a saved session, or nothing when it is missing, damaged, or unreadable. */
export function loadSession(
  ids: ReadonlySet<string>,
  storage: () => Pick<Storage, "getItem"> = () => localStorage,
): Session | undefined {
  try {
    return readSession(JSON.parse(storage().getItem(key) ?? "null"), ids);
  } catch {
    return undefined;
  }
}

/** Save the session. Report whether the browser kept it. */
export function saveSession(
  session: Session,
  storage: () => Pick<Storage, "setItem"> = () => localStorage,
) {
  try {
    storage().setItem(key, JSON.stringify(session));
    return true;
  } catch {
    return false;
  }
}
