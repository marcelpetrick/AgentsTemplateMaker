// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import { dependencies } from "../package.json";

const licenses: Readonly<Record<string, string>> = {
  "@codemirror/commands": "MIT",
  "@codemirror/state": "MIT",
  "@codemirror/view": "MIT",
};

export function libraries(
  installed: Readonly<Record<string, string>> = dependencies,
): readonly string[] {
  return Object.entries(installed).map(
    ([name, version]) => `${name} ${version} · ${licenses[name] ?? "?"}`,
  );
}
