// SPDX-License-Identifier: GPL-3.0-or-later
import { Injectable, signal } from '@angular/core';

/** The section of the home on screen: the header, the dots and the language links follow it. */
@Injectable({ providedIn: 'root' })
export class SectionsService {
  readonly current = signal('home');
}
