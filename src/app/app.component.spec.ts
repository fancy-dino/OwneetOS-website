// SPDX-License-Identifier: GPL-3.0-or-later
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import english from '../i18n/en.json';
import italian from '../i18n/it.json';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { I18nService } from './core/services/i18n/i18n.service';

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
});

describe('Translations', () => {
  it('every language has every English text', () => {
    expect(Object.keys(italian).sort()).toEqual(Object.keys(english).sort());
  });

  it('fills {name} from the arguments', () => {
    const i18n = TestBed.inject(I18nService);
    i18n.use('en');
    expect(i18n.t('features.card', { n: 2, total: 8 })).toBe('Feature 2 of 8');
  });
});
