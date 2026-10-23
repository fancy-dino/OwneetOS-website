// SPDX-License-Identifier: GPL-3.0-or-later
import { DOCUMENT, Injectable, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import en from '../../../../i18n/en.json';
import it from '../../../../i18n/it.json';
import { Page } from '../sections/sections.model';
import { Lang, MessageArgs, Messages } from './i18n.model';

// The site's texts come from one JSON file per language in src/i18n/, in the same format as the
// console's message files: adding a language is adding its file here and its path below.
const MESSAGES: Readonly<Record<Lang, Messages>> = { en, it };

/** Where each language's home lives: English at the root, the others under their code. */
export const LANG_PATH: Readonly<Record<Lang, string>> = { en: '/', it: '/it' };

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly lang = signal<Lang>('en');
  readonly languages = Object.keys(MESSAGES) as Lang[];

  /** Shows the site in `lang`: its texts, the page's language, title and description. */
  use(lang: Lang, page: Page = 'home'): void {
    this.lang.set(lang);
    this.document.documentElement.lang = lang;
    this.title.setTitle(page === 'home' ? this.t('meta.title') : `${this.t(page + '.title')} — OwneetOS`);
    this.meta.updateTag({ name: 'description', content: page === 'home' ? this.t('meta.description') : this.t(page + '.lede') });
  }

  /** The text of `key` in the current language (English when it is missing), `{name}` filled from `args`. */
  t(key: string, args: MessageArgs = {}): string {
    const text = MESSAGES[this.lang()][key] ?? MESSAGES.en[key];
    if (typeof text !== 'string') {
      return key;
    }
    return text.replace(/\{(\w+)\}/g, (match, name: string) => (name in args ? String(args[name]) : match));
  }

  /** The path of `lang`'s home. */
  path(lang: Lang = this.lang()): string {
    return LANG_PATH[lang];
  }

  /** The path of `page` in `lang`: /guide, /it/guide; the home is the language's path. */
  pagePath(page: Page, lang: Lang = this.lang()): string {
    return page === 'home' ? LANG_PATH[lang] : `${LANG_PATH[lang].replace(/\/$/, '')}/${page}`;
  }
}
