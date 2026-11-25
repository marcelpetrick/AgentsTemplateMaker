// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import type { Language, Rule } from "./catalog";
import { strings } from "./strings";

/** A status message. Keep the structure so a language change can rewrite it. */
export type Message =
  | "copied"
  | "copyFailed"
  | "downloaded"
  | { kept: Rule }
  | { keptCount: number };

/** The status text for a message in the interface language. */
export function messageText(language: Language, message?: Message): string {
  if (message === undefined) return "";
  const words = strings[language];
  if (typeof message === "string") return words[message];
  if ("kept" in message) return words.keptRule(message.kept.label[language]);
  return words.keptRules(message.keptCount);
}
