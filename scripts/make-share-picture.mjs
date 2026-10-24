// SPDX-License-Identifier: GPL-3.0-or-later
// Makes public/share-picture.png, the picture shown when a link to the site is shared (step 7.8f,
// approved demo design/demos/7.8f-website-sharing-picture.html of the OwneetOS repository, proposal
// A in Dusk): the logo (wordmark.data.ts) and the slogan, never translated, in the middle of a
// 1200 x 630 picture, inside its middle square (some apps cut one), in the site's fonts and in the
// Dusk palette's colours (src/styles.scss). Run it again when the logo or the palette changes:
//   node scripts/make-share-picture.mjs
// It draws the picture with a Chromium-based browser already on the computer, headless (CHROME
// names it, else chromium or google-chrome); its files stay in dist/.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const wordmark = readFileSync('src/app/shared/components/wordmark/wordmark.data.ts', 'utf8');
const viewBox = /WORDMARK_VIEWBOX = '([^']+)'/.exec(wordmark)[1];
const paths = [...wordmark.matchAll(/\{ accent: (true|false)(, evenodd: true)?, transform: '([^']+)', d: '([^']+)' \}/g)]
  .map(([, accent, evenodd, transform, d]) =>
    `<path d="${d}" transform="${transform}"${accent === 'true' ? ' class="accent"' : ''}${evenodd ? ' fill-rule="evenodd"' : ''}/>`);
const dusk = readFileSync('src/styles.scss', 'utf8').split('@media (prefers-color-scheme: light)')[0];
const token = (name) => new RegExp(`--${name}: (#[0-9a-f]{6})`).exec(dusk)[1];
const slogan = JSON.parse(readFileSync('src/i18n/en.json', 'utf8'))['hero.kicker'];

const work = resolve('dist/share-picture');
mkdirSync(work, { recursive: true });
writeFileSync(`${work}/picture.html`, `<!doctype html><meta charset="utf-8"><style>
@font-face { font-family: Lexend; src: url('${resolve('public/fonts/Lexend-Regular.woff2')}'); }
html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: ${token('bg')}; }
body { display: grid; place-content: center; justify-items: center; gap: 20px; }
svg { width: 580px; display: block; }
path { fill: ${token('fg')}; } path.accent { fill: ${token('accent')}; }
p { margin: 0; font: 34px Lexend; letter-spacing: .01em; color: ${token('muted')}; }
</style><svg viewBox="${viewBox}">${paths.join('')}</svg><p>${slogan}</p>`);

const browsers = [process.env.CHROME, 'chromium', 'chromium-browser', 'google-chrome', 'google-chrome-stable'].filter(Boolean);
const browser = browsers.find((name) => { try { execFileSync('which', [name], { stdio: 'ignore' }); return true; } catch { return false; } });
if (!browser) {
  throw new Error('No Chromium-based browser found: set CHROME to one.');
}
execFileSync(browser, ['--headless=new', `--user-data-dir=${work}/profile`, '--no-first-run', '--disable-gpu', '--hide-scrollbars',
  '--force-device-scale-factor=1', '--window-size=1200,630', '--virtual-time-budget=2000',
  `--screenshot=${resolve('public/share-picture.png')}`, `file://${work}/picture.html`], { stdio: 'ignore' });
rmSync(work, { recursive: true, force: true });
