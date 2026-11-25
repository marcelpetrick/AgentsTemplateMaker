// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later

export interface TextCount {
  readonly words: number;
  readonly characters: number;
}

type Segmenter = typeof Intl.Segmenter;

/** The part of `Intl` the counter uses. Older browsers lack `Segmenter`. */
interface Internationalization {
  readonly Segmenter?: Segmenter;
}

function countSegmented(text: string, segmenter: Segmenter): TextCount {
  const words = new segmenter(undefined, { granularity: "word" });
  const graphemes = new segmenter(undefined, { granularity: "grapheme" });
  let wordCount = 0;
  for (const segment of words.segment(text))
    if (segment.isWordLike) wordCount++;
  return { words: wordCount, characters: [...graphemes.segment(text)].length };
}

function countFallback(text: string): TextCount {
  const words = text.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) ?? [];
  return { words: words.length, characters: text.match(/./gsu)?.length ?? 0 };
}

/** Count words and user-perceived characters in the draft. */
export function countText(
  text: string,
  intl: Internationalization = Intl,
): TextCount {
  // The counter must never stop the editor from loading.
  const segmenter = intl.Segmenter;
  return segmenter ? countSegmented(text, segmenter) : countFallback(text);
}
