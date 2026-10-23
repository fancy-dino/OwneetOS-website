// SPDX-License-Identifier: GPL-3.0-or-later
import { Injectable, signal } from '@angular/core';
import { Page } from './sections.model';

/** Where the visitor is: the page, and on the home the section on screen (the header and the dots follow them). */
@Injectable({ providedIn: 'root' })
export class SectionsService {
  readonly page = signal<Page>('home');
  readonly current = signal('home');
}
