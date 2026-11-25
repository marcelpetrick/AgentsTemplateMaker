// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import { describe, expect, it } from "vitest";
import { rules } from "../src/catalog";
import { messageText } from "../src/messages";

describe("status messages", () => {
  it("shows nothing without a message", () => {
    expect(messageText("en")).toBe("");
  });

  it("names a single kept rule and counts several kept rules", () => {
    const rule = rules[0];
    expect(messageText("en", { kept: rule })).toBe(
      `Kept your edited text for “${rule.label.en}” as custom text.`,
    );
    expect(messageText("de", { keptCount: 2 })).toBe(
      "Dein bearbeiteter Text für 2 Regeln bleibt als eigene Anweisung erhalten.",
    );
  });

  it("uses the interface language for fixed messages", () => {
    expect(messageText("de", "downloaded")).toBe(
      "AGENTS.md wurde heruntergeladen.",
    );
  });
});
