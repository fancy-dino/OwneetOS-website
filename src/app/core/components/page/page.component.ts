// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n/i18n.service';
import { Page } from '../../services/sections/sections.model';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { FooterComponent } from '../footer/footer.component';

/**
 * The frame of a page (guide, FAQ, credits, privacy, contributing, not found): the way back home
 * (unless `back` is false), what goes above the title (`.above`), its title and line
 * (`<page>.title`, `<page>.lede`), its content, the footer. Ordinary scrolling: the
 * home's snapping sections are only on the home.
 */
@Component({
  selector: 'app-page',
  imports: [RouterLink, IconComponent, FooterComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent {
  protected readonly i18n = inject(I18nService);
  readonly page = input.required<Page>();
  readonly back = input(true);
}
