// SPDX-License-Identifier: GPL-3.0-or-later

/** A step of a numbered procedure (`steps`), with its own short list when it has one. */
export interface GuideStep {
  text: string;
  sub?: readonly string[];
}

/** Our own drawings (no screenshots of other programs): the ISO to the stick, a boot menu, a firmware page. */
export type GuideDrawing = 'write' | 'boot' | 'firmware';

/**
 * What a part of the guide is made of. Texts are keys of the message files under `guide.`;
 * pictures are names: the file `guide-pictures/<name>.webp`, the caption `guide.pic.<name>`.
 */
export type GuideBlock =
  | { kind: 'p' | 'warn' | 'small'; text: string }
  | { kind: 'list'; items: readonly string[] }
  | { kind: 'steps'; title: string; steps: readonly GuideStep[] }
  | { kind: 'details'; summary: string; blocks: readonly GuideBlock[] }
  | { kind: 'pictures'; names: readonly string[] }
  | { kind: 'drawing'; drawing: GuideDrawing }
  | { kind: 'requirements' }
  | { kind: 'keys' }
  | { kind: 'help'; count: number };

/** A part of the guide: its title is `guide.sec.<id>`, its anchor `#<id>`. */
export interface GuideSection {
  id: string;
  blocks: readonly GuideBlock[];
}

/** A maker in the table of keys: its own name (never translated) and the keys of its two texts. */
export interface GuideMaker {
  id: string;
  name: string;
}
