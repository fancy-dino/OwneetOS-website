// SPDX-License-Identifier: GPL-3.0-or-later
import { Type, inject } from '@angular/core';
import { CanActivateFn, Routes } from '@angular/router';
import { ContributeComponent } from './core/components/contribute/contribute.component';
import { CreditsComponent } from './core/components/credits/credits.component';
import { FaqComponent } from './core/components/faq/faq.component';
import { GuideComponent } from './core/components/guide/guide.component';
import { HomeComponent } from './core/components/home/home.component';
import { PrivacyComponent } from './core/components/privacy/privacy.component';
import { Lang } from './core/services/i18n/i18n.model';
import { I18nService } from './core/services/i18n/i18n.service';
import { Page } from './core/services/sections/sections.model';
import { SectionsService } from './core/services/sections/sections.service';

// Every page in every language: English at the root (/, /guide, ...), Italian under /it (/it,
// /it/guide, ...), each prerendered to its own file. Before a page shows, its language and title
// are set (so the prerendered file has them too).
const PAGES: readonly [Page, Type<unknown>][] = [
  ['home', HomeComponent],
  ['guide', GuideComponent],
  ['faq', FaqComponent],
  ['credits', CreditsComponent],
  ['privacy', PrivacyComponent],
  ['contribute', ContributeComponent],
];
const LANG_ROOT: Readonly<Record<Lang, string>> = { en: '', it: 'it' };

const show = (lang: Lang, page: Page): CanActivateFn => () => {
  inject(I18nService).use(lang, page);
  inject(SectionsService).page.set(page);
  return true;
};

export const routes: Routes = (Object.keys(LANG_ROOT) as Lang[]).flatMap((lang) =>
  PAGES.map(([page, component]) => ({
    path: [LANG_ROOT[lang], page === 'home' ? '' : page].filter(Boolean).join('/'),
    component,
    canActivate: [show(lang, page)],
  })),
);
