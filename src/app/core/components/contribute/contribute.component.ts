// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, inject } from '@angular/core';
import { I18nService } from '../../services/i18n/i18n.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ISSUES_URL, REPO_URL, TRANSLATING_URL } from '../../../shared/links/links.data';
import { PageComponent } from '../page/page.component';
import { Contribution } from './contribute.model';

/** How to help: translate, test and report, code and design. */
@Component({
  selector: 'app-contribute',
  imports: [PageComponent, IconComponent],
  templateUrl: './contribute.component.html',
  styleUrl: './contribute.component.scss',
})
export class ContributeComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly ways: readonly Contribution[] = [
    { icon: 'languages', key: 'translate', url: TRANSLATING_URL },
    { icon: 'bug', key: 'test', url: ISSUES_URL },
    { icon: 'code-xml', key: 'code', url: REPO_URL },
  ];
}
