// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import { describe, expect, it } from "vitest";
import { libraries } from "../src/about";

describe("libraries", () => {
  it("marks a dependency without a recorded license so it gets noticed", () => {
    expect(libraries({ "left-pad": "1.3.0" })).toEqual(["left-pad 1.3.0 · ?"]);
  });
});
