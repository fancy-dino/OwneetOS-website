// SPDX-License-Identifier: GPL-3.0-or-later
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// The website's shell: the pages come through the router.
@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
