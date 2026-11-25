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
