// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, inject } from '@angular/core';
import { I18nService } from '../../services/i18n/i18n.service';
import { CREDITS_URL } from '../../../shared/links/links.data';
import { PageComponent } from '../page/page.component';
import { AUTHORS, OS_CREDITS, SITE_CREDITS } from './credits.data';

/** The credits: the authors first, then a selection of OwneetOS's projects, the site's own, the full list. */
@Component({
  selector: 'app-credits',
  imports: [PageComponent],
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.scss',
})
export class CreditsComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly authors = AUTHORS;
  protected readonly osCredits = OS_CREDITS;
  protected readonly siteCredits = SITE_CREDITS;
  protected readonly creditsUrl = CREDITS_URL;
}
