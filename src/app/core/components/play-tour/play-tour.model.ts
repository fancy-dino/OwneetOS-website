// SPDX-License-Identifier: GPL-3.0-or-later

/** A button as the console draws it: a shoulder button's pill, a round one with its letter or its icon. */
export interface Glyph {
  /** The key of its name, if it has one. */
  readonly label?: string;
  readonly icon?: string;
  readonly pill?: boolean;
}

/** A move of "Play it.": its buttons, the key of its sentence (play.move.<key>) and the screen it shows. */
export interface Move {
  readonly key: string;
  readonly picture: string;
  readonly glyphs: readonly Glyph[];
}
