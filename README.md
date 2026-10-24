# OwneetOS website

The website of [OwneetOS](https://github.com/fancy-dino/OwneetOS), a free operating system that
turns a PC into a game console used with a controller only.

A static site built with [Angular](https://angular.dev): every page, in every language (`/`, `/guide`,
`/it`, `/it/guide`, ...), is prerendered to plain files, published on GitHub Pages. It collects no data: no analytics, no cookies, no requests to third
parties (its fonts and icons are served by the site itself).

## Working on it

Requires Node.js 20.19, 22.12 or 24 and npm.

```sh
npm ci            # install the exact versions of package-lock.json
npm start         # development server on http://localhost:4200
npm run build     # the static site in dist/owneetos-website/browser (404.html, sitemap.xml, robots.txt)
npm test          # unit tests (Vitest)
```

Run npm from this folder: its `.npmrc` keeps npm's cache and logs in `.npm-cache/` (never in
`~/.npm`).

The Angular CLI's usage statistics are off (`"analytics": false` in `angular.json`); keep them
off. New dependencies are added only at versions published at least two weeks earlier
(`npm install --before=<date>`), and credited in [CREDITS.md](CREDITS.md) in the same change.

Every pull request and every push to `main` is built and tested by GitHub Actions
(`.github/workflows/ci.yml`, check **Build**); nothing is published from there.

Every push to `main` publishes the site on GitHub Pages (`.github/workflows/pages.yml`), at
<https://owneetos.org/>, the project's domain (set in the repository's Pages settings, with its DNS
at the registrar; the old address `fancy-dino.github.io/OwneetOS-website` leads there). The site's
own files are still linked relatively (the fonts as `fonts/...`, declared in
`externalDependencies` in `angular.json`), never from the root (`/fonts/...`), so it also works
under a base path (`npx ng build --base-href /some/path/`).

The pages' complete addresses (canonical address, languages, sharing tags, sitemap) use the site's
address, `SITE_URL`: `define` in `angular.json` holds `https://owneetos.org`, and the Pages workflow
passes the one GitHub gives (`--define`, and `SITE_URL` for `sitemap.mjs`).

## Structure

```text
src/i18n/                     the texts, one JSON file per language (en.json, it.json)
src/app/core/components/      the site's components: app (the root), intro (the start-up animation),
                              header, footer, page (a page's frame), home (with console-screen and
                              feature-carousel), guide, faq, credits, privacy, contribute,
                              not-found (any wrong address; built into 404.html by
                              scripts/not-found-page.mjs)
public/                       files served as they are: the fonts; the icons (favicon.svg,
                              favicon.ico, apple-touch-icon.png) and the sharing picture
                              (share-picture.png) made from the logo and the palettes by
                              node scripts/make-favicon.mjs and node scripts/make-share-picture.mjs
                              (this one with Chromium): run them again when either changes
scripts/                      also not-found-page.mjs and sitemap.mjs, run after ng build
src/app/core/services/        app-wide services (i18n, head, sections, notice)
src/app/shared/components/    components used in several places (icon, wordmark)
src/app/shared/links/         the addresses the site links to
```

One folder per component or service; file names carry their type (`header.component.ts`,
`i18n.service.ts`, as `ng generate` creates them here); interfaces and types in
`<name>.model.ts`, enums in `<name>.enum.ts`, next to the component.

## Licence

The code is released under the [GNU General Public License v3.0 or later](LICENSE); the site's
texts under CC BY-SA 4.0. Third-party components and their licences: [CREDITS.md](CREDITS.md).
