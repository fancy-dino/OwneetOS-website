// SPDX-License-Identifier: GPL-3.0-or-later

/** An author of OwneetOS: name and GitHub handle. */
export interface Author {
  readonly name: string;
  readonly github: string;
}

/** A credited project: name, address, licence. */
export interface Credit {
  readonly name: string;
  readonly url: string;
  readonly licence: string;
}
