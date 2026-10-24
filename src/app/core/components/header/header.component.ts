// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lang } from '../../services/i18n/i18n.model';
import { I18nService } from '../../services/i18n/i18n.service';
import { SectionsService } from '../../services/sections/sections.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { WordmarkComponent } from '../../../shared/components/wordmark/wordmark.component';
import { HeaderLink } from './header.model';

/**
 * The site's header: logo, the home's sections and the credits, language (the same page in the
 * other language), "Get OwneetOS"; a Menu button below 1100 px.
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink, WordmarkComponent, IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly sections = inject(SectionsService);

  protected readonly links: readonly HeaderLink[] = [
    { section: 'features', label: 'nav.features' },
    { section: 'requirements', label: 'nav.requirements' },
    { section: 'open', label: 'nav.open' },
    { section: 'info', label: 'nav.info' },
    { page: 'credits', label: 'nav.credits' },
    { section: 'download', label: 'nav.download' },
  ];
  protected readonly menuOpen = signal(false);

  /** Whether the link is where the visitor is: the section on screen on the home, or the page. */
  protected here(link: HeaderLink): boolean {
    const page = this.sections.page();
    return link.page ? page === link.page : page === 'home' && this.sections.current() === link.section;
  }

  /** The same page in `lang`; on the not-found page, the same wrong address. */
  protected langPath(lang: Lang): string {
    const page = this.sections.page();
    return page === 'not-found' ? this.i18n.path(lang).replace(/\/$/, '') + this.sections.lost() : this.i18n.pagePath(page, lang);
  }
}
