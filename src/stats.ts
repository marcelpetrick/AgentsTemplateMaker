// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later

export interface TextCount {
  readonly words: number;
  readonly characters: number;
}

const wordSegmenter = new Intl.Segmenter(undefined, { granularity: "word" });
const graphemeSegmenter = new Intl.Segmenter(undefined, {
  granularity: "grapheme",
});

function countSegments(
  segments: Iterable<Intl.SegmentData>,
  include: (segment: Intl.SegmentData) => boolean = () => true,
) {
  let count = 0;
  for (const segment of segments) if (include(segment)) count++;
  return count;
}

export function countText(text: string): TextCount {
  return {
    words: countSegments(
      wordSegmenter.segment(text),
      (segment) => segment.isWordLike === true,
    ),
    characters: countSegments(graphemeSegmenter.segment(text)),
  };
}
