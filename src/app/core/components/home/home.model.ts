// SPDX-License-Identifier: GPL-3.0-or-later

/** A section of the home, for the dots on the right: its id (the #fragment) and the key of its name. */
export interface SectionLink {
  readonly id: string;
  readonly label: string;
}

/** A line of "Own it!": its icon and the key of its text. */
export interface Fact {
  readonly icon: string;
  readonly label: string;
}
