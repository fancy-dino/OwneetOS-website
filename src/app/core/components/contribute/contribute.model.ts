// SPDX-License-Identifier: GPL-3.0-or-later

/** A way to help: its icon, the key of its texts (contribute.<key>.title / .text / .link) and its address. */
export interface Contribution {
  readonly icon: string;
  readonly key: string;
  readonly url: string;
}
