// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, computed, input } from '@angular/core';
import { WORDMARK_LAYOUTS, WORDMARK_LETTERS, WORDMARK_SYMBOL } from './wordmark.data';
import { WordmarkLayoutName } from './wordmark.model';

/**
 * The OwneetOS logo at the host's height: the symbol and "OS" in the accent colour, "Owneet" in the
 * text colour; the symbol on the left of the word, or above it (`layout`).
 */
@Component({
  selector: 'app-wordmark',
  templateUrl: './wordmark.component.html',
  styleUrl: './wordmark.component.scss',
})
export class WordmarkComponent {
  readonly layoutName = input<WordmarkLayoutName>('left', { alias: 'layout' });
  protected readonly layout = computed(() => WORDMARK_LAYOUTS[this.layoutName()]);
  protected readonly symbol = WORDMARK_SYMBOL;
  protected readonly letters = WORDMARK_LETTERS;
}
