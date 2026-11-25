// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
// See docs/quality.md for the reasons behind each exception.
export default {
  extends: ["stylelint-config-standard"],
  rules: {
    // Overrides follow their base rules by component, not by specificity.
    "no-descending-specificity": null,
    // Keep the widely supported min-/max- media feature syntax.
    "media-feature-range-notation": "prefix",
  },
};
