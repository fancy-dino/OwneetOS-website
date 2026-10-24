// SPDX-License-Identifier: GPL-3.0-or-later
// GitHub Pages serves 404.html for every address that leads nowhere. Angular never prerenders
// catch-all routes, so the prerendered /404 page becomes that file (step 7.8d). Run after ng build.
import { renameSync, rmdirSync } from 'node:fs';

const site = 'dist/owneetos-website/browser';
renameSync(`${site}/404/index.html`, `${site}/404.html`);
rmdirSync(`${site}/404`);
