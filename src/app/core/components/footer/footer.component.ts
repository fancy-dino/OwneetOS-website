// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n/i18n.service';
import { WordmarkComponent } from '../../../shared/components/wordmark/wordmark.component';
import { REPO_URL } from '../../../shared/links/links.data';

/** The site's footer: the logo, the pages, the source code, the licence and the trademarks. */
@Component({
  selector: 'app-footer',
  imports: [RouterLink, WordmarkComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly repoUrl = REPO_URL;
}
