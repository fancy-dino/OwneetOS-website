// SPDX-License-Identifier: GPL-3.0-or-later
import { Component } from '@angular/core';
import { WORDMARK_PATHS, WORDMARK_VIEWBOX } from './wordmark.data';

/** The OwneetOS wordmark at the host's height: the text colour, "OS" in the accent colour. */
@Component({
  selector: 'app-wordmark',
  templateUrl: './wordmark.component.html',
  styleUrl: './wordmark.component.scss',
})
export class WordmarkComponent {
  protected readonly viewBox = WORDMARK_VIEWBOX;
  protected readonly paths = WORDMARK_PATHS;
}
