// SPDX-License-Identifier: GPL-3.0-or-later
import { Type, inject } from '@angular/core';
import { CanActivateFn, Routes } from '@angular/router';
import { ContributeComponent } from './core/components/contribute/contribute.component';
import { CreditsComponent } from './core/components/credits/credits.component';
import { FaqComponent } from './core/components/faq/faq.component';
import { GuideComponent } from './core/components/guide/guide.component';
import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { PrivacyComponent } from './core/components/privacy/privacy.component';
import { HeadService } from './core/services/head/head.service';
import { Lang } from './core/services/i18n/i18n.model';
import { I18nService } from './core/services/i18n/i18n.service';
import { Page } from './core/services/sections/sections.model';
import { SectionsService } from './core/services/sections/sections.service';

// Every page in every language: English at the root (/, /guide, ...), Italian under /it (/it,
// /it/guide, ...), each prerendered to its own file. Before a page shows, its language and title
// and its head (title, description, addresses, sharing) are set, so the prerendered file has them too.
// A wrong address shows the not-found page in the language it names (/it/... in Italian). Angular
// never prerenders catch-all routes, so /404 is prerendered and the build turns it into 404.html,
// the file GitHub Pages serves for every address that leads nowhere (scripts/not-found-page.mjs).
const PAGES: readonly [Page, Type<unknown>][] = [
  ['home', HomeComponent],
  ['guide', GuideComponent],
  ['faq', FaqComponent],
  ['credits', CreditsComponent],
  ['privacy', PrivacyComponent],
  ['contribute', ContributeComponent],
];
const LANG_ROOT: Readonly<Record<Lang, string>> = { en: '', it: 'it' };

const show = (lang: Lang, page: Page): CanActivateFn => (route, state) => {
  inject(I18nService).use(lang);
  inject(HeadService).show(page);
  const sections = inject(SectionsService);
  sections.page.set(page);
  sections.lost.set(page === 'not-found' ? state.url.split(/[?#]/)[0].slice(LANG_ROOT[lang] ? LANG_ROOT[lang].length + 1 : 0) : '');
  return true;
};

export const routes: Routes = [
  ...(Object.keys(LANG_ROOT) as Lang[]).flatMap((lang) =>
    PAGES.map(([page, component]) => ({
      path: [LANG_ROOT[lang], page === 'home' ? '' : page].filter(Boolean).join('/'),
      component,
      canActivate: [show(lang, page)],
    })),
  ),
  { path: '404', component: NotFoundComponent, canActivate: [show('en', 'not-found')] },
  { path: LANG_ROOT.it, children: [{ path: '**', component: NotFoundComponent, canActivate: [show('it', 'not-found')] }] },
  { path: '**', component: NotFoundComponent, canActivate: [show('en', 'not-found')] },
];
