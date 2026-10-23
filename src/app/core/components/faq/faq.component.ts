// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, inject } from '@angular/core';
import { I18nService } from '../../services/i18n/i18n.service';
import { ISSUES_URL } from '../../../shared/links/links.data';
import { PageComponent } from '../page/page.component';

/** The questions: nine short answers (faq.<n>.q / .a), each opening on a click. */
@Component({
  selector: 'app-faq',
  imports: [PageComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly questions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  /** The question whose answer links to the issues (how to report a problem). */
  protected readonly reportQuestion = 9;
  protected readonly issuesUrl = ISSUES_URL;
}
