// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n/i18n.service';
import { NoticeService } from '../../services/notice/notice.service';
import { SectionsService } from '../../services/sections/sections.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { WordmarkComponent } from '../../../shared/components/wordmark/wordmark.component';
import { HeaderLink } from './header.model';

/** The site's header: logo, the home's sections, language, "Get OwneetOS"; a Menu button below 1100 px. */
@Component({
  selector: 'app-header',
  imports: [RouterLink, WordmarkComponent, IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly sections = inject(SectionsService);
  private readonly notice = inject(NoticeService);

  protected readonly links: readonly HeaderLink[] = [
    { id: 'features', label: 'nav.features' },
    { id: 'requirements', label: 'nav.requirements' },
    { id: 'open', label: 'nav.open' },
    { id: 'info', label: 'nav.info' },
    { id: 'credits', label: 'nav.credits', soon: true },
    { id: 'download', label: 'nav.download' },
  ];
  protected readonly menuOpen = signal(false);
  /** The home of the current language: the links' path. */
  protected readonly home = computed(() => this.i18n.path());

  protected soon(event: Event): void {
    event.preventDefault();
    this.menuOpen.set(false);
    this.notice.show(this.i18n.t('page.soon'));
  }
}
