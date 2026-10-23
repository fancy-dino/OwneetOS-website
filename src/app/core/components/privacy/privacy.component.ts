// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, inject } from '@angular/core';
import { I18nService } from '../../services/i18n/i18n.service';
import { GITHUB_PRIVACY_URL, ISSUES_URL } from '../../../shared/links/links.data';
import { PageComponent } from '../page/page.component';

/**
 * The privacy page: no data collected by the site or by OwneetOS (crash reports only with
 * consent, legal-compliance), and what GitHub Pages, the host, may record.
 */
@Component({
  selector: 'app-privacy',
  imports: [PageComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss',
})
export class PrivacyComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly blocks = ['site', 'hosting', 'os'];
  protected readonly issuesUrl = ISSUES_URL;
  protected readonly githubPrivacyUrl = GITHUB_PRIVACY_URL;
}
