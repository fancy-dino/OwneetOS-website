// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n/i18n.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { PageComponent } from '../page/page.component';

/**
 * The not-found page, for every address that leads nowhere (step 7.8d, approved demo
 * design/demos/7.8d-website-not-found.html of the OwneetOS repository): in the language the
 * address names, with the way home, the guide and the questions.
 */
@Component({
  selector: 'app-not-found',
  imports: [RouterLink, IconComponent, PageComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  protected readonly i18n = inject(I18nService);
}
