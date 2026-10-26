// SPDX-License-Identifier: GPL-3.0-or-later

/** A language of the site: each one has its file in src/i18n/ and its path (see I18nService). */
export type Lang = 'en' | 'it' | 'de' | 'fr' | 'es';

/** A language's texts, as in its JSON file: a key and its text (and "@meta" about the file). */
export type Messages = Readonly<Record<string, unknown>>;

/** The values that fill `{name}` in a text. */
export type MessageArgs = Readonly<Record<string, string | number>>;
