// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, input } from '@angular/core';
import { GuideDrawing } from '../guide/guide.model';

/**
 * One of the guide's own drawings (no screenshots of other programs): the ISO going to the USB
 * stick, a boot menu with the stick chosen, a firmware page with Secure Boot off. The firmware's
 * own words stay in English, as on most PCs; the boot menu's title comes translated.
 */
@Component({
  selector: 'app-guide-drawing',
  templateUrl: './guide-drawing.component.html',
  styleUrl: './guide-drawing.component.scss',
})
export class GuideDrawingComponent {
  readonly drawing = input.required<GuideDrawing>();
  readonly bootMenu = input('');
}
