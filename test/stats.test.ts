// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import { describe, expect, it } from "vitest";
import { countText } from "../src/stats";

describe("countText", () => {
  it("counts nothing in an empty or blank draft", () => {
    expect(countText("")).toEqual({ words: 0, characters: 0 });
    expect(countText(" \n\n\t")).toEqual({ words: 0, characters: 4 });
  });

  it("counts words across line breaks and Markdown punctuation", () => {
    expect(countText("# Project instructions\n\nUse `fix(parser)`.")).toEqual({
      words: 5,
      characters: 42,
    });
  });

  it("counts what a reader sees as one character once, including emoji", () => {
    expect(countText("Äußere 👍🏽")).toEqual({ words: 1, characters: 8 });
  });
});

describe("countText without Intl.Segmenter", () => {
  it("falls back to letter runs and code points instead of failing", () => {
    expect(countText("Eins, zwei 👍🏽 # x1", {})).toEqual({
      words: 3,
      characters: 18,
    });
  });
});

describe("countText fallback edge cases", () => {
  it("counts nothing in an empty draft", () => {
    expect(countText("", {})).toEqual({ words: 0, characters: 0 });
  });

  it("keeps apostrophes and hyphens inside one word", () => {
    expect(countText("don’t re-run it's", {})).toEqual({
      words: 3,
      characters: 17,
    });
  });

  it("counts a line break as one character", () => {
    expect(countText("a\nb", {})).toEqual({ words: 2, characters: 3 });
  });
});
