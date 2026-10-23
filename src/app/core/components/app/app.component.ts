// SPDX-License-Identifier: GPL-3.0-or-later
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { IntroComponent } from '../intro/intro.component';
import { NoticeService } from '../../services/notice/notice.service';

/** The website's shell: the start-up animation, the header, the page of the address, the notice at the bottom. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, IntroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly notice = inject(NoticeService);
}
