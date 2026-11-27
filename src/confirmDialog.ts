// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later
import { append } from "./dom";

/**
 * Ask before a change replaces generated text next to the user's edits.
 * Only the dialog's apply button runs the pending change.
 */
export class ConfirmDialog {
  private pending: (() => void) | undefined;

  constructor(
    private readonly dialog: HTMLDialogElement,
    private readonly list: HTMLElement,
  ) {
    dialog.addEventListener("submit", (event) => {
      event.preventDefault();
      const apply = this.pending;
      this.pending = undefined;
      dialog.close();
      if ((event.submitter as HTMLButtonElement | null)?.value === "apply")
        apply?.();
    });
    dialog.addEventListener("cancel", () => {
      this.pending = undefined;
    });
  }

  /** Run `apply` now when nothing is affected, or after confirmation. */
  ask(affected: readonly string[], apply: () => void) {
    if (affected.length === 0) {
      apply();
      return;
    }
    this.list.replaceChildren();
    for (const label of affected) append(this.list, "li").textContent = label;
    this.pending = apply;
    this.dialog.showModal();
  }
}
