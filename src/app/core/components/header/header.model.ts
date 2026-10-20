// SPDX-License-Identifier: GPL-3.0-or-later

/** A link of the header: a section of the home, or a page that is not there yet (`soon`). */
export interface HeaderLink {
  /** The section's id (the address's #fragment). */
  readonly id: string;
  /** The key of its text. */
  readonly label: string;
  readonly soon?: boolean;
}
