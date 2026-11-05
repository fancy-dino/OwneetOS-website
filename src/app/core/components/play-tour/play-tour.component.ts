// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, DOCUMENT, DestroyRef, ElementRef, afterNextRender, inject, signal } from '@angular/core';
import { I18nService } from '../../services/i18n/i18n.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { introLeft } from '../intro/intro.data';
import { Move } from './play-tour.model';

/** Every AUTOPLAY ms the next move comes in by itself, as in the carousel. */
const AUTOPLAY = 5000;

/**
 * "Play it.": a short tour of the controller (not all of it: the quick menu's tutorial has the rest),
 * four moves with their buttons beside the console's screen, which follows the chosen one (approved
 * demo design/demos/7.8n-website-home.html of the OwneetOS repository). The moves take turns by
 * themselves, and stop only while the pointer is on them (or they have focus from the keyboard) and
 * while they or the page are not on screen.
 */
@Component({
  selector: 'app-play-tour',
  imports: [IconComponent],
  templateUrl: './play-tour.component.html',
  styleUrl: './play-tour.component.scss',
  host: {
    '(pointerenter)': 'pointer($event, true)',
    '(pointerleave)': 'pointer($event, false)',
    '(focusin)': 'focusIn($event)',
    '(focusout)': 'focusOut($event)',
  },
})
export class PlayTourComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly moves: readonly Move[] = [
    { key: 'sections', picture: 'library', glyphs: [{ label: 'play.button.lb', pill: true }, { label: 'play.button.rb', pill: true }] },
    { key: 'play', picture: 'home', glyphs: [{ label: 'play.button.a' }] },
    { key: 'home', picture: 'game-running', glyphs: [{ icon: 'house' }] },
    { key: 'menu', picture: 'quick-menu', glyphs: [{ label: 'play.button.b' }] },
  ];
  protected readonly current = signal(0);

  private readonly document = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private paused = false;
  private onScreen = false;
  private timer: ReturnType<typeof setInterval> | undefined;
  private start: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        return;
      }
      const observer = new IntersectionObserver(([entry]) => {
        this.onScreen = entry.isIntersecting;
        this.restart();
      }, { threshold: 0.5 });
      observer.observe(this.host.nativeElement);
      const visibility = () => this.restart();
      this.document.addEventListener('visibilitychange', visibility);
      destroyRef.onDestroy(() => {
        observer.disconnect();
        this.document.removeEventListener('visibilitychange', visibility);
        clearInterval(this.timer);
        clearTimeout(this.start);
      });
    });
  }

  protected choose(i: number): void {
    this.current.set(i);
    this.restart();
  }

  protected pointer(event: PointerEvent, inside: boolean): void {
    if (event.pointerType === 'mouse' || !inside) {
      this.paused = inside;
      this.restart();
    }
  }

  // focus pauses it only when it comes from the keyboard (a click gives a button focus too)
  protected focusIn(event: FocusEvent): void {
    if ((event.target as HTMLElement).matches(':focus-visible')) {
      this.paused = true;
      this.restart();
    }
  }

  protected focusOut(event: FocusEvent): void {
    if (!this.host.nativeElement.contains(event.relatedTarget as Node | null)) {
      this.paused = false;
      this.restart();
    }
  }

  private restart(): void {
    clearInterval(this.timer);
    clearTimeout(this.start);
    this.timer = undefined;
    const view = this.document.defaultView;
    if (view && !this.paused && this.onScreen && !this.document.hidden) {
      this.start = setTimeout(() => {
        this.timer = setInterval(() => this.current.set((this.current() + 1) % this.moves.length), AUTOPLAY);
      }, introLeft(view));
    }
  }
}
