// SPDX-License-Identifier: GPL-3.0-or-later

/** A part of the logo: its outline, whether it takes the accent colour. */
export interface WordmarkPath {
  readonly d: string;
  readonly accent: boolean;
  /** Holes by the even-odd rule (the gamepad cut out of the symbol's circle). */
  readonly evenodd?: boolean;
}

/** Where the symbol goes: on the left of the word, or above it. */
export type WordmarkLayoutName = 'left' | 'above';

/** A layout of the logo: its box and where the symbol (a 100 x 100 box) and the word sit in it. */
export interface WordmarkLayout {
  readonly viewBox: string;
  readonly symbol: string;
  readonly word: string;
}
