// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import { expect, it } from "vitest";
import { version } from "../src/version";

it("reads the site's semantic version from the package manifest", () => {
  expect(version).toMatch(/^\d+\.\d+\.\d+$/);
});
