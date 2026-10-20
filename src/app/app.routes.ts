// SPDX-License-Identifier: GPL-3.0-or-later
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

// One home per language: English at the root, Italian under /it (each prerendered to its own page).
export const routes: Routes = [
  { path: '', component: HomeComponent, data: { lang: 'en' } },
  { path: 'it', component: HomeComponent, data: { lang: 'it' } },
];
