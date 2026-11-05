// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, DOCUMENT, DestroyRef, ElementRef, afterNextRender, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n/i18n.service';
import { NoticeService } from '../../services/notice/notice.service';
import { SectionsService } from '../../services/sections/sections.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { FeatureCarouselComponent } from '../feature-carousel/feature-carousel.component';
import { FooterComponent } from '../footer/footer.component';
import { PlayTourComponent } from '../play-tour/play-tour.component';
import { Fact, SectionLink } from './home.model';

/**
 * The home: one page whose five sections each fill the screen, the scrolling snapping from one to the
 * next (step 7.8n, approved demo design/demos/7.8n-website-home.html of the OwneetOS repository):
 * Home, then the slogan's three (Plug it., Play it., Own it!), then Download.
 * The address follows the section on screen (#plug, #play, ...).
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink, IconComponent, FeatureCarouselComponent, FooterComponent, PlayTourComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly sections = inject(SectionsService);
  private readonly notice = inject(NoticeService);
  private readonly document = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly home = computed(() => this.i18n.path());
  protected readonly sectionLinks: readonly SectionLink[] = [
    { id: 'home', label: 'nav.home' },
    { id: 'plug', label: 'nav.plug' },
    { id: 'play', label: 'nav.play' },
    { id: 'own', label: 'nav.own' },
    { id: 'download', label: 'nav.download' },
  ];
  protected readonly facts: readonly Fact[] = [
    { icon: 'code-xml', label: 'own.free' },
    { icon: 'shield-check', label: 'own.telemetry' },
    { icon: 'globe-off', label: 'own.updates' },
    { icon: 'user-group', label: 'own.community' },
  ];

  constructor() {
    // the language and the title are set by the route (app.routes.ts)
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const view = this.document.defaultView;
      if (!view || typeof IntersectionObserver === 'undefined') {
        return;
      }
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            this.sections.current.set(id);
            const address = view.location.pathname + (id === 'home' ? '' : '#' + id);
            if (view.location.pathname + view.location.hash !== address) {
              view.history.replaceState(view.history.state, '', address);
            }
          }
        }
      }, { threshold: 0.55 });
      this.host.nativeElement.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  /** The download, not there yet (until the first release). */
  protected soon(event: Event): void {
    event.preventDefault();
    this.notice.show(this.i18n.t('download.soon'));
  }
}
