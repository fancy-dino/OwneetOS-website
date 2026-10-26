// SPDX-License-Identifier: GPL-3.0-or-later
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import english from '../../../../i18n/en.json';
import italian from '../../../../i18n/it.json';
import german from '../../../../i18n/de.json';
import french from '../../../../i18n/fr.json';
import spanish from '../../../../i18n/es.json';
import { AppComponent } from './app.component';
import { routes } from '../../../app.routes';
import { I18nService } from '../../services/i18n/i18n.service';

const OTHERS = { italian, german, french, spanish };

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows the English home at / and the Italian one at /it', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Turn your PC into a game console.');
    expect(document.documentElement.lang).toBe('en');
    await harness.navigateByUrl('/it');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Trasforma il tuo PC in una console.');
    expect(document.documentElement.lang).toBe('it');
  });

  it('shows every page in both languages, with its title', async () => {
    const harness = await RouterTestingHarness.create();
    for (const [url, heading] of [['/guide', 'Install OwneetOS'], ['/it/faq', 'Domande'], ['/privacy', 'Privacy'],
      ['/it/contribute', 'Fallo con noi']]) {
      await harness.navigateByUrl(url);
      expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(heading);
    }
    expect(document.title).toBe('Fallo con noi - OwneetOS');
  });

  it('opens the credits with the two authors', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/it/credits');
    const authors = [...(harness.routeNativeElement?.querySelectorAll('.authors b') ?? [])].map((b) => b.textContent);
    expect(authors).toEqual(['Marco De Franco', 'Daniele De Padova']);
  });

  it('shows the not-found page for a wrong address, in the language the address names', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/it/nowhere');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Questa pagina non c’è');
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex');
    await harness.navigateByUrl('/no/where');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('This page is not here');
    expect(document.documentElement.lang).toBe('en');
    await harness.navigateByUrl('/guide');
    expect(document.querySelector('meta[name="robots"]')).toBeNull();
  });

  it('gives each page its complete address, its languages and what a shared link shows', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/it/guide');
    const href = (selector: string) => document.head.querySelector(selector)?.getAttribute('href');
    expect(href('link[rel="canonical"]')).toMatch(/\/it\/guide\/$/);
    expect(href('link[hreflang="en"]')).toMatch(/[^t]\/guide\/$/);
    expect(href('link[hreflang="x-default"]')).toBe(href('link[hreflang="en"]'));
    expect(document.head.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('Installa OwneetOS - OwneetOS');
    expect(document.head.querySelector('meta[property="og:image"]')?.getAttribute('content')).toMatch(/\/share-picture\.png$/);
    await harness.navigateByUrl('/it/nowhere');
    expect(document.head.querySelector('link[rel="canonical"], link[hreflang]')).toBeNull();
  });

  it('offers the languages in a menu, each in its own name, and switches the theme', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/fr');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const header = fixture.nativeElement as HTMLElement;
    const names = [...header.querySelectorAll('#languages a')].map((a) => a.textContent?.trim());
    expect(names).toEqual(['English', 'Italiano', 'Deutsch', 'Français', 'Español']);
    expect(header.querySelector('#languages')?.hasAttribute('hidden')).toBe(true);
    const before = document.documentElement.dataset['theme'];
    (header.querySelector('.theme-btn') as HTMLButtonElement).click();
    const after = document.documentElement.dataset['theme'];
    expect(after === 'light' || after === 'dark').toBe(true);
    expect(after).not.toBe(before);
    expect(localStorage.getItem('owneet-theme')).toBe(after);
  });

  it('keeps the slogan in English in every language', () => {
    for (const messages of Object.values(OTHERS)) {
      expect(messages['hero.kicker']).toBe(english['hero.kicker']);
    }
  });

  it('shows the pages in German, French and Spanish, and their wrong addresses too', async () => {
    const harness = await RouterTestingHarness.create();
    for (const [url, heading, lang] of [['/de', 'Mach deinen PC zur Spielkonsole.', 'de'], ['/fr/guide', 'Installer OwneetOS', 'fr'],
      ['/es/faq', 'Preguntas', 'es'], ['/es/nowhere', 'Esta página no existe', 'es']]) {
      await harness.navigateByUrl(url);
      expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(heading);
      expect(document.documentElement.lang).toBe(lang);
    }
    await harness.navigateByUrl('/de/guide');
    expect(document.head.querySelectorAll('link[rel="alternate"][hreflang]').length).toBe(6);
  });
});

describe('Translations', () => {
  it('never uses long dashes, only "-" (owner, 2026-10-24)', () => {
    expect(JSON.stringify([english, ...Object.values(OTHERS)])).not.toMatch(/[—–]/);
  });

  it('every language has every English text', () => {
    for (const messages of Object.values(OTHERS)) {
      expect(Object.keys(messages).sort()).toEqual(Object.keys(english).sort());
    }
  });

  it('fills {name} from the arguments', () => {
    const i18n = TestBed.inject(I18nService);
    i18n.use('en');
    expect(i18n.t('features.card', { n: 2, total: 8 })).toBe('Feature 2 of 8');
  });
});
