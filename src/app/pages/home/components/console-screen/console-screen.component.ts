// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, inject } from '@angular/core';
import { I18nService } from '../../../../core/services/i18n/i18n.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { WordmarkComponent } from '../../../../shared/components/wordmark/wordmark.component';
import { ConsoleApp, ConsoleGame } from './console-screen.model';

/**
 * A picture of the console's home screen on a TV, drawn with the site's colours (as in demo 3.6):
 * top bar, the game to continue, the apps (generic names), the games to jump back in, the button
 * prompts. The game names are invented. It scales with its width (sizes in em of 1.32 % of it).
 */
@Component({
  selector: 'app-console-screen',
  imports: [IconComponent, WordmarkComponent],
  templateUrl: './console-screen.component.html',
  styleUrl: './console-screen.component.scss',
  host: { 'aria-hidden': 'true' },
})
export class ConsoleScreenComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly apps: readonly ConsoleApp[] = [
    { icon: 'monitor-play', label: 'app.video' },
    { icon: 'music', label: 'app.audio' },
    { icon: 'film', label: 'app.local_videos' },
    { icon: 'disc-3', label: 'app.local_music' },
    { icon: 'image', label: 'app.local_pictures' },
    { icon: 'layout-grid', label: 'app.all' },
  ];
  protected readonly games: readonly ConsoleGame[] = [
    { name: 'Star Drift', hue: 330 }, { name: 'Pixel Garden', hue: 165 }, { name: 'Night Racer', hue: 215 },
    { name: 'Old Keep', hue: 30 }, { name: 'Moss & Stone', hue: 110 }, { name: 'Tiny Tanks', hue: 0 },
    { name: 'Deep Blue', hue: 195 },
  ];
}
