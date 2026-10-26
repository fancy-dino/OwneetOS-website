// SPDX-License-Identifier: GPL-3.0-or-later
import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE_ADDRESS } from '../../../shared/links/links.data';
import { Lang } from '../i18n/i18n.model';
import { I18nService } from '../i18n/i18n.service';
import { Page } from '../sections/sections.model';

/** The sharing picture (scripts/make-share-picture.mjs), and its size. */
const PICTURE = { path: 'share-picture.png', width: '1200', height: '630' };
/** Open Graph's name of each language. */
const OG_LOCALE: Readonly<Record<Lang, string>> = { en: 'en_US', it: 'it_IT', de: 'de_DE', fr: 'fr_FR', es: 'es_ES' };

/**
 * The head of a page, in the current language (step 7.8f): its title and description, its complete
 * address and the same page in the other languages (for search engines), and what a shared link
 * shows (Open Graph: title, description, the sharing picture). The not-found page has no address
 * and is never listed (noindex).
 */
@Injectable({ providedIn: 'root' })
export class HeadService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly i18n = inject(I18nService);

  show(page: Page): void {
    const t = (key: string, args = {}) => this.i18n.t(key, args);
    const title = page === 'home' ? t('meta.title') : t('meta.page', { page: t(page + '.title') });
    const description = page === 'home' ? t('meta.description') : t(page + '.lede');
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });

    this.document.head.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]').forEach((link) => link.remove());
    if (page === 'not-found') {
      this.meta.updateTag({ name: 'robots', content: 'noindex' });
    } else {
      this.meta.removeTag('name="robots"');
      this.link({ rel: 'canonical', href: this.address(page, this.i18n.lang()) });
      for (const lang of this.i18n.languages) {
        this.link({ rel: 'alternate', hreflang: lang, href: this.address(page, lang) });
      }
      this.link({ rel: 'alternate', hreflang: 'x-default', href: this.address(page, 'en') });
    }

    const lang = this.i18n.lang();
    const tags: Record<string, string> = {
      'og:type': 'website',
      'og:site_name': 'OwneetOS',
      'og:title': title,
      'og:description': description,
      'og:url': page === 'not-found' ? `${SITE_ADDRESS}/` : this.address(page, lang),
      'og:locale': OG_LOCALE[lang],
      'og:image': `${SITE_ADDRESS}/${PICTURE.path}`,
      'og:image:width': PICTURE.width,
      'og:image:height': PICTURE.height,
      'og:image:alt': t('meta.picture'),
    };
    for (const [property, content] of Object.entries(tags)) {
      this.meta.updateTag({ property, content });
    }
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  }

  /** The complete address of `page` in `lang`, ending with "/" as the published folders do. */
  private address(page: Page, lang: Lang): string {
    return `${SITE_ADDRESS}${this.i18n.pagePath(page, lang).replace(/\/?$/, '/')}`;
  }

  private link(attributes: Record<string, string>): void {
    const link = this.document.createElement('link');
    for (const [name, value] of Object.entries(attributes)) {
      link.setAttribute(name, value);
    }
    this.document.head.appendChild(link);
  }
}
