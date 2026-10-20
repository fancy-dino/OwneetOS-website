// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, DOCUMENT, DestroyRef, ElementRef, afterNextRender, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Lang } from '../../services/i18n/i18n.model';
import { I18nService } from '../../services/i18n/i18n.service';
import { NoticeService } from '../../services/notice/notice.service';
import { SectionsService } from '../../services/sections/sections.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { WordmarkComponent } from '../../../shared/components/wordmark/wordmark.component';
import { ConsoleScreenComponent } from '../console-screen/console-screen.component';
import { FeatureCarouselComponent } from '../feature-carousel/feature-carousel.component';
import { Fact, Requirement, SectionLink } from './home.model';

/**
 * The home: one page whose sections each fill the screen, the scrolling snapping from one to the
 * next (step 7.8, approved demo design/demos/7.8-website-home.html of the OwneetOS repository).
 * The address follows the section on screen (#features, #requirements, ...).
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink, IconComponent, WordmarkComponent, ConsoleScreenComponent, FeatureCarouselComponent],
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
    { value: '64-bit', label: 'requirements.cpu' },
    { value: 'UEFI', label: 'requirements.firmware' },
    { value: '4 GB', label: 'requirements.ram' },
    { value: '32 GB', label: 'requirements.disk' },
    { value: 'Vulkan', label: 'requirements.graphics' },
  ];
  protected readonly facts: readonly Fact[] = [
    { icon: 'code-xml', label: 'open.free' },
    { icon: 'shield-check', label: 'open.telemetry' },
    { icon: 'wifi-off', label: 'open.offline' },
    { icon: 'users', label: 'open.together' },
  ];
  protected readonly sourceUrl = 'https://github.com/fancy-dino/OwneetOS';

  constructor() {
    this.i18n.use(inject(ActivatedRoute).snapshot.data['lang'] as Lang);
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

  /** A page that is not there yet. */
  protected soon(event: Event, text = 'page.soon'): void {
    event.preventDefault();
    this.notice.show(this.i18n.t(text));
  }
}
