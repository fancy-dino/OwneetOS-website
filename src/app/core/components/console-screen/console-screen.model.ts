// SPDX-License-Identifier: GPL-3.0-or-later

/** An app on the console's home screen: its icon and the key of its name. */
export interface ConsoleApp {
  readonly icon: string;
  readonly label: string;
}

/** An invented game in the console's row: its name and the hue of its cover. */
export interface ConsoleGame {
  readonly name: string;
  readonly hue: number;
}
