// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../services/i18n/i18n.service';
import { WordmarkComponent } from '../../../shared/components/wordmark/wordmark.component';

/**
 * The start-up animation, when the site opens (the website variant of the logo demo,
 * design/demos/logo-gamepad-o.html of the OwneetOS repository): the logo from transparent over
 * 2 s, then the slogan's words 0.5 s apart, each at once; 0.8 s after the last one it fades
 * away and the site shows. CSS only (intro.component.scss), so the prerendered pages play it
 * before any script runs; skipped for visitors who asked for reduced motion.
 */
@Component({
  selector: 'app-intro',
  imports: [WordmarkComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
  host: { 'aria-hidden': 'true' },
})
export class IntroComponent {
  private readonly i18n = inject(I18nService);
  /** The slogan, never translated, cut into its words: "Plug it.", "Play it.", "Own it!". */
  protected readonly words = computed(() => this.i18n.t('hero.kicker').match(/[^.!?]+[.!?]/g)?.map((w) => w.trim()) ?? []);
}
