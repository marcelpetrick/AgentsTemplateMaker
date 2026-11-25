// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later

/** A help button, the tooltip it controls, and the row that contains both. */
export interface HelpTarget {
  readonly help: HTMLButtonElement;
  readonly tooltip: HTMLElement;
  readonly row: HTMLElement;
}

/**
 * Show one rule tooltip at a time. Focus and mouse hover show a tooltip until
 * focus or the pointer leaves. A click pins it until a second click, Escape,
 * or a click elsewhere in the workspace.
 */
export class HelpTooltips {
  private active: HelpTarget | undefined;
  private pinned: HelpTarget | undefined;

  /** Bind every help button and dismiss pinned tooltips on outside clicks. */
  bind(targets: readonly HelpTarget[], workspace: HTMLElement) {
    for (const target of targets) this.bindTarget(target);
    workspace.addEventListener("click", (event) => {
      this.dismissOutside(event.target);
    });
  }

  private bindTarget(target: HelpTarget) {
    const { help, row } = target;
    help.addEventListener("focus", () => {
      this.show(target);
    });
    help.addEventListener("blur", () => {
      if (this.pinned !== target) this.hide(target);
    });
    help.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") this.show(target);
    });
    row.addEventListener("pointerleave", () => {
      if (this.pinned !== target && document.activeElement !== help)
        this.hide(target);
    });
    help.addEventListener("click", () => {
      this.toggle(target);
    });
    help.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.hide(target);
    });
  }

  private show(target: HelpTarget) {
    if (this.active && this.active !== target) this.hide(this.active);
    this.active = target;
    target.tooltip.hidden = false;
    target.help.setAttribute("aria-expanded", "true");
  }

  private hide(target: HelpTarget) {
    target.tooltip.hidden = true;
    target.help.setAttribute("aria-expanded", "false");
    if (this.active === target) this.active = undefined;
    if (this.pinned === target) this.pinned = undefined;
  }

  private toggle(target: HelpTarget) {
    if (this.pinned === target) {
      this.hide(target);
      return;
    }
    this.show(target);
    this.pinned = target;
  }

  private dismissOutside(node: EventTarget | null) {
    const { active } = this;
    if (!active || !(node instanceof Node)) return;
    const inside = active.help.contains(node) || active.tooltip.contains(node);
    if (!inside) this.hide(active);
  }
}
