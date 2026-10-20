// SPDX-License-Identifier: GPL-3.0-or-later
import { Injectable, signal } from '@angular/core';

/** How long a notice stays on screen, in ms. */
const NOTICE_MS = 2600;

/** A short notice at the bottom of the screen (e.g. a page that is not there yet). */
@Injectable({ providedIn: 'root' })
export class NoticeService {
  readonly text = signal('');
  private timer: ReturnType<typeof setTimeout> | undefined;

  show(text: string): void {
    this.text.set(text);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.text.set(''), NOTICE_MS);
  }
}
