// SPDX-License-Identifier: GPL-3.0-or-later
import { NgTemplateOutlet } from '@angular/common';
import { Component, DOCUMENT, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { I18nService } from '../../services/i18n/i18n.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { Feature } from './feature-carousel.model';

/** Every AUTOPLAY ms the next feature comes in by itself. */
const AUTOPLAY = 5000;

/**
 * The features, one card at a time (the next one half a screen away), moved by the arrows, the
 * dots, a swipe, or left / right when the strip has focus. It loops: the strip holds a copy of
 * the last card before the first and of the first after the last; once it stops on a copy, it
 * jumps (instantly, unseen) to the card it copies. It plays by itself, and stops only while the
 * pointer is on it (or it has focus from the keyboard) and while it or the page is not on screen.
 */
@Component({
  selector: 'app-feature-carousel',
  imports: [IconComponent, NgTemplateOutlet],
  templateUrl: './feature-carousel.component.html',
  styleUrl: './feature-carousel.component.scss',
  host: {
    '(pointerenter)': 'pointer($event, true)',
    '(pointerleave)': 'pointer($event, false)',
    '(focusin)': 'focusIn($event)',
    '(focusout)': 'focusOut($event)',
  },
})
export class FeatureCarouselComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly features: readonly Feature[] = [
    { icon: 'gamepad-2', key: 'controller' },
    { icon: 'library-big', key: 'library' },
    { icon: 'hard-drive', key: 'disk' },
    { icon: 'monitor-play', key: 'media' },
    { icon: 'gamepad', key: 'controllers' },
    { icon: 'history', key: 'updates' },
    { icon: 'palette', key: 'style' },
    { icon: 'feather', key: 'light' },
  ];
  protected readonly current = signal(0);

  private readonly document = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private paused = false;
  private onScreen = false;
  private timer: ReturnType<typeof setInterval> | undefined;
  private settleTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    afterNextRender(() => {
      this.jump(1);
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
      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        this.document.removeEventListener('visibilitychange', visibility);
        clearInterval(this.timer);
        clearTimeout(this.settleTimer);
      });
    });
  }

  /** Card `i` of the features; -1 and features.length are the copies at the two ends. */
  protected go(i: number, restart = true): void {
    const n = this.features.length;
    this.current.set((i + n) % n);
    this.track().nativeElement.scrollTo({ left: this.place(i + 1) });
    if (i < 0 || i >= n) {
      // onto a copy: once the slide has ended, move to the card it copies (also without scroll events)
      setTimeout(() => this.settle(), 900);
    }
    if (restart) {
      this.restart();
    }
  }

  protected step(direction: number, event?: Event): void {
    event?.preventDefault();
    this.go(this.current() + direction);
  }

  protected scrolled(): void {
    clearTimeout(this.settleTimer);
    this.settleTimer = setTimeout(() => this.settle(), 120);
  }

  /** When the strip stops: the card nearest the middle is the current one; on a copy, jump to its card. */
  protected settle(): void {
    const track = this.track().nativeElement;
    const middle = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let distance = Infinity;
    this.cards().forEach((card, pos) => {
      const d = Math.abs(card.offsetLeft + card.clientWidth / 2 - middle);
      if (d < distance) {
        distance = d;
        best = pos;
      }
    });
    if (distance > 4) {
      return; // still moving
    }
    const n = this.features.length;
    if (best === 0) {
      this.current.set(n - 1);
      this.jump(n);
    } else if (best === n + 1) {
      this.current.set(0);
      this.jump(1);
    } else {
      this.current.set(best - 1);
    }
  }

  protected pointer(event: PointerEvent, inside: boolean): void {
    if (event.pointerType === 'mouse' || !inside) {
      this.paused = inside;
      this.restart();
    }
  }

  // focus pauses it only when it comes from the keyboard (a click gives the arrows focus too)
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
    this.timer = undefined;
    if (!this.paused && this.onScreen && !this.document.hidden) {
      this.timer = setInterval(() => this.go(this.current() + 1, false), AUTOPLAY);
    }
  }

  private cards(): HTMLElement[] {
    return Array.from(this.track().nativeElement.children) as HTMLElement[];
  }

  /** The strip's scroll position that puts card `pos` (0 = the first copy) in the middle. */
  private place(pos: number): number {
    const card = this.cards()[pos];
    return card.offsetLeft - (this.track().nativeElement.clientWidth - card.clientWidth) / 2;
  }

  /** Moves the strip to card `pos` at once, without the smooth slide or the snapping. */
  private jump(pos: number): void {
    const track = this.track().nativeElement;
    track.style.scrollBehavior = 'auto';
    track.style.scrollSnapType = 'none';
    track.scrollLeft = this.place(pos);
    void track.offsetWidth; // apply it before the smooth slide and the snapping come back
    track.style.scrollBehavior = '';
    track.style.scrollSnapType = '';
  }
}
