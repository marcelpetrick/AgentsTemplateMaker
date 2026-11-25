// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later

type ElementType<T extends HTMLElement> = abstract new () => T;

/** Return the page element with this id, checked against the expected type. */
export function byId<T extends HTMLElement>(
  id: string,
  type: ElementType<T>,
): T {
  const node = document.getElementById(id);
  if (!(node instanceof type)) throw new TypeError(`Missing element #${id}`);
  return node;
}

/** Return the page element with this id. */
export function element(id: string): HTMLElement {
  return byId(id, HTMLElement);
}

/** Create a child element with an optional class and append it to `parent`. */
export function append<T extends keyof HTMLElementTagNameMap>(
  parent: HTMLElement,
  tag: T,
  className = "",
): HTMLElementTagNameMap[T] {
  const node = document.createElement(tag);
  node.className = className;
  parent.append(node);
  return node;
}

/** Create a `type="button"` button with an id and class. */
export function appendButton(
  parent: HTMLElement,
  id: string,
  className: string,
): HTMLButtonElement {
  const button = append(parent, "button", className);
  button.type = "button";
  button.id = id;
  return button;
}
