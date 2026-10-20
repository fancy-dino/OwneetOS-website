// SPDX-License-Identifier: GPL-3.0-or-later

/** An element of an icon's SVG drawing: its tag (path, circle, rect, ...) and its attributes. */
export type IconNode = readonly [tag: string, attributes: Readonly<Record<string, string>>];
