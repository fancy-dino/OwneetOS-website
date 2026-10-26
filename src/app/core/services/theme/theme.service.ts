// SPDX-License-Identifier: GPL-3.0-or-later
import { DOCUMENT, Injectable, inject } from '@angular/core';

/** Where the visitor's choice is kept: in their browser only (the Privacy page says so). */
const KEY = 'owneet-theme';
/** How long the colours fade (styles.scss, html.theming). */
const FADE_MS = 500;

/**
 * The light (Daylight) or dark (Dusk) theme (step 7.8m): the device's theme until the visitor
 * presses the header's switch, then their choice, kept in the browser (localStorage) and applied
 * before the page shows by the script in index.html. The choice is `data-theme` on <html>; the
 * colours and the switch's icon follow it in CSS, so the prerendered pages never differ.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  /** Switches to the other theme, the colours fading. */
  toggle(): void {
    const root = this.document.documentElement;
    const next = this.dark() ? 'light' : 'dark';
    root.classList.add('theming');
    root.dataset['theme'] = next;
    try {
      this.document.defaultView?.localStorage.setItem(KEY, next);
    } catch {
      // a private window may refuse: the choice lasts until the page is closed
    }
    setTimeout(() => root.classList.remove('theming'), FADE_MS);
  }

  /** Whether the site is dark now: the visitor's choice, else the device's theme. */
  private dark(): boolean {
    const chosen = this.document.documentElement.dataset['theme'];
    if (chosen === 'light' || chosen === 'dark') {
      return chosen === 'dark';
    }
    return !(this.document.defaultView?.matchMedia?.('(prefers-color-scheme: light)').matches ?? false);
  }
}
