// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, DOCUMENT, DestroyRef, ElementRef, afterNextRender, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n/i18n.service';
import { NoticeService } from '../../services/notice/notice.service';
import { SectionsService } from '../../services/sections/sections.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ConsoleScreenComponent } from '../console-screen/console-screen.component';
import { FeatureCarouselComponent } from '../feature-carousel/feature-carousel.component';
import { FooterComponent } from '../footer/footer.component';
import { Fact, Requirement, SectionLink } from './home.model';

/**
 * The home: one page whose sections each fill the screen, the scrolling snapping from one to the
 * next (step 7.8, approved demo design/demos/7.8-website-home.html of the OwneetOS repository).
 * The address follows the section on screen (#features, #requirements, ...).
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink, IconComponent, ConsoleScreenComponent, FeatureCarouselComponent, FooterComponent],
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
    { id: 'features', label: 'nav.features' },
    { id: 'requirements', label: 'nav.requirements' },
    { id: 'open', label: 'nav.open' },
    { id: 'info', label: 'nav.info' },
    { id: 'download', label: 'nav.download' },
  ];
  protected readonly requirements: readonly Requirement[] = [
    { value: 'requirements.cpu.value', label: 'requirements.cpu' },
    { value: 'requirements.firmware.value', label: 'requirements.firmware' },
    { value: 'requirements.ram.value', label: 'requirements.ram' },
    { value: 'requirements.disk.value', label: 'requirements.disk' },
    { value: 'requirements.graphics.value', label: 'requirements.graphics' },
  ];
  protected readonly facts: readonly Fact[] = [
    { icon: 'code-xml', label: 'open.free' },
    { icon: 'shield-check', label: 'open.telemetry' },
    { icon: 'wifi-off', label: 'open.offline' },
    { icon: 'users', label: 'open.together' },
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
