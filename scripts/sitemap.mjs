// SPDX-License-Identifier: GPL-3.0-or-later
// Writes sitemap.xml and robots.txt into the built site (step 7.8f), after ng build and
// not-found-page.mjs: every prerendered page, with the same page in the other languages. The site's
// address comes from SITE_URL (the Pages workflow sets it), else from `define` in angular.json.
// robots.txt only counts at the root of a domain: it takes effect with the project's domain.
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';

const site = 'dist/owneetos-website/browser';
const quoted = JSON.parse(readFileSync('angular.json', 'utf8')).projects['owneetos-website'].architect.build.options.define.SITE_URL;
const address = (process.env.SITE_URL || quoted.slice(1, -1)).replace(/\/$/, '');

// English at the root, every other language under its code (src/i18n/<code>.json)
const others = readdirSync('src/i18n').map((file) => file.replace(/\.json$/, '')).filter((lang) => lang !== 'en');
const pages = ['', ...readdirSync(site, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !others.includes(entry.name) && existsSync(`${site}/${entry.name}/index.html`))
  .map((entry) => `${entry.name}/`)];
const url = (lang, page) => `${address}/${lang === 'en' ? '' : `${lang}/`}${page}`;

const entries = pages.flatMap((page) => {
  const langs = ['en', ...others].filter((lang) => existsSync(`${site}/${lang === 'en' ? '' : `${lang}/`}${page}index.html`));
  const alternates = langs.map((lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url(lang, page)}"/>\n`).join('') +
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${url('en', page)}"/>\n`;
  return langs.map((lang) => `  <url>\n    <loc>${url(lang, page)}</loc>\n${alternates}  </url>\n`);
});
writeFileSync(`${site}/sitemap.xml`, '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
  entries.join('') + '</urlset>\n');
writeFileSync(`${site}/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${address}/sitemap.xml\n`);
