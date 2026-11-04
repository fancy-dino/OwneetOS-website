// SPDX-License-Identifier: GPL-3.0-or-later

/** How long the start-up animation covers the page after loading, in ms (the times in intro.component.scss). */
const INTRO = 4200;

/**
 * How many ms the start-up animation still covers the page: what plays by itself under it waits, or
 * the first slide would be over as it ends. Nothing when animations are reduced (it is not shown).
 */
export function introLeft(view: Window): number {
  return view.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : Math.max(0, INTRO - view.performance.now());
}
