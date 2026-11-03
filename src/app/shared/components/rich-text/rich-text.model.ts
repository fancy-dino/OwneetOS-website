// SPDX-License-Identifier: GPL-3.0-or-later

/** A piece of a text with a little markup: plain, **bold**, `code`, or a [link](name). */
export type RichPart =
  | { kind: 'text' | 'bold' | 'code'; text: string }
  | { kind: 'link'; text: string; href: string };
