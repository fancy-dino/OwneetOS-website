// SPDX-License-Identifier: GPL-3.0-or-later
import { Page } from '../../services/sections/sections.model';

/** A link of the header: a section of the home (`section`, the address's #fragment) or a page. */
export interface HeaderLink {
  /** The key of its text. */
  readonly label: string;
  readonly section?: string;
  readonly page?: Page;
}
