// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, computed, input } from '@angular/core';
import { RichPart } from './rich-text.model';

const MARKUP = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([\w-]+)\)/g;

/**
 * A translated text with a little markup, drawn without HTML from the message files: **bold**,
 * `code` and [label](name), where `links` gives each name's address (a name it does not know
 * stays plain text). Used by the guide, whose steps name buttons, commands and files.
 */
@Component({
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrl: './rich-text.component.scss',
})
export class RichTextComponent {
  readonly text = input.required<string>();
  readonly links = input<Readonly<Record<string, string>>>({});

  protected readonly parts = computed<RichPart[]>(() => {
    const text = this.text(), links = this.links(), parts: RichPart[] = [];
    let at = 0;
    for (const m of text.matchAll(MARKUP)) {
      if (m.index > at) parts.push({ kind: 'text', text: text.slice(at, m.index) });
      if (m[1] !== undefined) parts.push({ kind: 'bold', text: m[1] });
      else if (m[2] !== undefined) parts.push({ kind: 'code', text: m[2] });
      else if (links[m[4]]) parts.push({ kind: 'link', text: m[3], href: links[m[4]] });
      else parts.push({ kind: 'text', text: m[3] });
      at = m.index + m[0].length;
    }
    if (at < text.length) parts.push({ kind: 'text', text: text.slice(at) });
    return parts;
  });
}
