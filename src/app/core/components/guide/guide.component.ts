// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n/i18n.service';
import { ISSUES_URL, PUBLIC_KEY_FILE } from '../../../shared/links/links.data';
import { RichTextComponent } from '../../../shared/components/rich-text/rich-text.component';
import { GuideDrawingComponent } from '../guide-drawing/guide-drawing.component';
import { PageComponent } from '../page/page.component';
import { MAKERS, REQUIREMENT_ROWS, SECTIONS } from './guide.data';

/**
 * The user guide (step 7.3 of the knowledge base, approved demo 7.3): a list of its parts, then
 * each part (guide.data.ts): the requirements in two columns, the download and its optional checks, writing
 * the stick, starting the PC from it (the keys per motherboard maker), trying it, installing,
 * the first start, the first steps, and what to do when it does not start. Real screens of the
 * console (public/guide-pictures/) and our own drawings (GuideDrawingComponent).
 */
@Component({
  selector: 'app-guide',
  imports: [PageComponent, RouterLink, NgTemplateOutlet, RichTextComponent, GuideDrawingComponent],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.scss',
})
export class GuideComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly sections = SECTIONS;
  protected readonly rows = REQUIREMENT_ROWS;
  protected readonly makers = MAKERS;
  /** The addresses the texts' [links](name) lead to. */
  protected readonly links = { issues: ISSUES_URL, key: PUBLIC_KEY_FILE };

  /** A text of the guide (`guide.<key>`); "{get}" is the header's download button. */
  protected t(key: string): string {
    return this.i18n.t('guide.' + key, { get: this.i18n.t('nav.get') });
  }

  /** The part's number in the list (the last part, the problems, has none). */
  protected number(id: string, index: number): string {
    return id === 'help' ? '?' : String(index + 1);
  }

  protected range(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }
}
