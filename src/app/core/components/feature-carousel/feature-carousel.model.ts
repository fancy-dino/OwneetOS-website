// SPDX-License-Identifier: GPL-3.0-or-later

/** A slide of the carousel: the key of its sentence (slide.<key>) and its picture (home-pictures/<picture>.webp). */
export interface Feature {
  readonly key: string;
  readonly picture: string;
}
