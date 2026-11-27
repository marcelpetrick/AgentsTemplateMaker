// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import { describe, expect, it } from "vitest";
import { createDraft } from "../src/draft";
import { loadSession, saveSession, type Session } from "../src/session";

const ids = new Set(["title", "a", "b"]);
const draft = createDraft("# T", [
  { id: "a", text: "Aa." },
  { id: "b", text: "Bb." },
]);
const session: Session = {
  uiLanguage: "de",
  outputLanguage: "en",
  selected: ["a", "b"],
  settings: { a: "x", b: "" },
  draft,
};

/** A storage that keeps one saved value, like localStorage. */
function memory(initial?: string) {
  let value = initial ?? null;
  return () => ({
    getItem: () => value,
    setItem: (_key: string, next: string) => {
      value = next;
    },
  });
}

const blocked = () => {
  throw new DOMException("blocked", "SecurityError");
};

const saved = (patch: Record<string, unknown>) =>
  memory(JSON.stringify({ ...session, ...patch }));

const savedDraft = (patch: Record<string, unknown>) =>
  saved({ draft: { ...draft, ...patch } });

describe("session", () => {
  it("restores what it saved", () => {
    const storage = memory();
    expect(saveSession(session, storage)).toBe(true);
    expect(loadSession(ids, storage)).toEqual(session);
  });

  it("keeps the text of a rule the catalog no longer has as the user's own", () => {
    const restored = loadSession(new Set(["title", "a"]), saved({}));
    expect(restored?.draft.text).toBe(draft.text);
    expect(restored?.draft.ranges.map(({ id }) => id)).toEqual(["title", "a"]);
    expect(restored?.selected).toEqual(["a"]);
    expect(restored?.settings).toEqual({ a: "x" });
  });

  it("drops settings that are not text", () => {
    const restored = loadSession(ids, saved({ settings: { a: 3, b: "y" } }));
    expect(restored?.settings).toEqual({ b: "y" });
  });

  it("reads an edited range with its original span and generated text", () => {
    const [title, ...rest] = draft.ranges;
    const edited = {
      ...title,
      edited: true,
      original: { from: 0, to: 3 },
      generatedText: "# T",
    };
    const restored = loadSession(
      ids,
      savedDraft({ ranges: [edited, ...rest] }),
    );
    expect(restored?.draft.ranges[0]).toEqual(edited);
  });

  it.each([
    ["nothing saved", memory()],
    ["blocked storage", blocked],
    ["damaged JSON", memory("{")],
    ["a value that is not an object", memory("3")],
    ["an unknown interface language", saved({ uiLanguage: "fr" })],
    ["an unknown document language", saved({ outputLanguage: "fr" })],
    ["a selection that is not text", saved({ selected: [1] })],
    ["a selection that is not a list", saved({ selected: "a" })],
    ["settings that are not an object", saved({ settings: "a" })],
    ["a missing draft", saved({ draft: null })],
    ["a draft without text", savedDraft({ text: 3 })],
    ["ranges that are not a list", savedDraft({ ranges: {} })],
    ["separators that are not a list", savedDraft({ separators: {} })],
    [
      "a range past the text",
      savedDraft({ ranges: [{ id: "a", from: 0, to: 99, edited: false }] }),
    ],
    [
      "a range that ends before it starts",
      savedDraft({ ranges: [{ id: "a", from: 2, to: 1, edited: false }] }),
    ],
    ["a negative offset", savedDraft({ separators: [{ from: -1, to: 1 }] })],
    ["a fractional offset", savedDraft({ separators: [{ from: 0.5, to: 1 }] })],
    [
      "an offset that is not a number",
      savedDraft({ separators: [{ from: "0", to: 1 }] }),
    ],
    ["a separator that is not an object", savedDraft({ separators: [1] })],
    [
      "a range without an ID",
      savedDraft({ ranges: [{ from: 0, to: 1, edited: false }] }),
    ],
    [
      "a range without an edit flag",
      savedDraft({ ranges: [{ id: "a", from: 0, to: 1 }] }),
    ],
    [
      "a damaged original span",
      savedDraft({
        ranges: [{ id: "a", from: 0, to: 1, edited: true, original: 1 }],
      }),
    ],
    [
      "generated text that is not text",
      savedDraft({
        ranges: [{ id: "a", from: 0, to: 1, edited: true, generatedText: 1 }],
      }),
    ],
  ])("starts fresh from %s", (_case, storage) => {
    expect(loadSession(ids, storage)).toBeUndefined();
  });

  it("reports when the browser does not keep the session", () => {
    expect(saveSession(session, blocked)).toBe(false);
  });

  it("accepts an empty range at the end of the text", () => {
    const end = draft.text.length;
    const restored = loadSession(
      ids,
      savedDraft({ separators: [{ from: end, to: end }] }),
    );
    expect(restored?.draft.separators).toEqual([{ from: end, to: end }]);
  });
});
