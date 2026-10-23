// SPDX-License-Identifier: GPL-3.0-or-later

/** A part of the logo: its outline, whether it takes the accent colour, and how it is placed. */
export interface WordmarkPath {
  readonly d: string;
  readonly accent: boolean;
  /** Where the part sits in the logo's viewBox (the gamepad "O" is drawn in a 100 x 100 box). */
  readonly transform?: string;
  /** Holes by the even-odd rule (the gamepad cut out of the "O"'s circle). */
  readonly evenodd?: boolean;
}
