// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, inject } from '@angular/core';
import { I18nService } from '../../services/i18n/i18n.service';
import { PageComponent } from '../page/page.component';

/**
 * The installation guide: six steps (guide.<n>.title / .text) and the anti-cheat warning, as the
 * knowledge base says (installer-and-firmware: whole disk, UEFI, Secure Boot off).
 */
@Component({
  selector: 'app-guide',
  imports: [PageComponent],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.scss',
})
export class GuideComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly steps = [1, 2, 3, 4, 5, 6];
}
