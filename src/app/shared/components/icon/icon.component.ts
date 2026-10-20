// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, computed, input } from '@angular/core';
import { ICONS } from './icon.data';

/** A Lucide icon (see icon.data.ts), drawn in the current text colour at the host's size. */
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  readonly name = input.required<string>();
  protected readonly nodes = computed(() => ICONS[this.name()] ?? []);
}
