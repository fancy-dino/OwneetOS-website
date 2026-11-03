// SPDX-License-Identifier: GPL-3.0-or-later
import { TestBed } from '@angular/core/testing';
import { RichTextComponent } from './rich-text.component';

describe('RichTextComponent', () => {
  const render = (text: string, links: Record<string, string> = {}) => {
    const fixture = TestBed.createComponent(RichTextComponent);
    fixture.componentRef.setInput('text', text);
    fixture.componentRef.setInput('links', links);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  };

  it('draws bold, code and known links, never HTML from the text', () => {
    const el = render('Press **Start**, type `msinfo32` and see [the key](key) or [this](nowhere) <i>x</i>',
      { key: 'owneetos.asc' });
    expect(el.querySelector('b')?.textContent).toBe('Start');
    expect(el.querySelector('code')?.textContent).toBe('msinfo32');
    expect(el.querySelector('a')?.getAttribute('href')).toBe('owneetos.asc');
    expect(el.querySelectorAll('a').length).toBe(1);
    expect(el.querySelector('i')).toBeNull();
    expect(el.textContent).toContain('this <i>x</i>');
  });
});
