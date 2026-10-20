# OwneetOS website

The website of [OwneetOS](https://github.com/fancy-dino/OwneetOS), a free operating system that
turns a PC into a game console used with a controller only.

A static site built with [Angular](https://angular.dev): every page is prerendered to plain files,
published on GitHub Pages. It collects no data: no analytics, no cookies, no requests to third
parties (its fonts and icons are served by the site itself).

## Working on it

Requires Node.js 20.19, 22.12 or 24 and npm.

```sh
npm ci            # install the exact versions of package-lock.json
npm start         # development server on http://localhost:4200
npm run build     # the static site in dist/owneetos-website/browser
npm test          # unit tests (Vitest)
```

The Angular CLI's usage statistics are off (`"analytics": false` in `angular.json`); keep them
off. New dependencies are added only at versions published at least two weeks earlier
(`npm install --before=<date>`), and credited in [CREDITS.md](CREDITS.md) in the same change.

## Licence

The code is released under the [GNU General Public License v3.0 or later](LICENSE); the site's
texts under CC BY-SA 4.0. Third-party components and their licences: [CREDITS.md](CREDITS.md).
