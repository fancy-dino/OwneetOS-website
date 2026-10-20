// SPDX-License-Identifier: GPL-3.0-or-later

/** A letter of the wordmark: its outline, and whether it takes the accent colour ("OS"). */
export interface WordmarkPath {
  readonly d: string;
  readonly accent: boolean;
}
