// SPDX-License-Identifier: GPL-3.0-or-later
// Who and what the credits page names. The full list of OwneetOS's projects is its CREDITS.md
// (linked from the page); this is a selection, and the site's own (this repository's CREDITS.md).
import { Author, Credit } from './credits.model';

/** The authors, side by side at the same level (owner, 2026-10-24; Daniele agreed to his name here). */
export const AUTHORS: readonly Author[] = [
  { name: 'Marco De Franco', github: 'fancy-dino' },
  { name: 'Daniele De Padova', github: 'Danidepadawan' },
];

export const OS_CREDITS: readonly Credit[] = [
  { name: 'Linux', url: 'https://kernel.org', licence: 'GPL-2.0' },
  { name: 'Arch Linux', url: 'https://archlinux.org', licence: 'various' },
  { name: 'systemd', url: 'https://systemd.io', licence: 'LGPL-2.1+' },
  { name: 'gamescope', url: 'https://github.com/ValveSoftware/gamescope', licence: 'BSD' },
  { name: 'Mesa', url: 'https://www.mesa3d.org', licence: 'MIT' },
  { name: 'Pegasus Frontend', url: 'https://pegasus-frontend.org', licence: 'GPL-3.0+' },
  { name: 'Qt', url: 'https://www.qt.io', licence: 'LGPL-3.0' },
  { name: 'Wine', url: 'https://www.winehq.org', licence: 'LGPL-2.1+' },
  { name: 'DXVK', url: 'https://github.com/doitsujin/dxvk', licence: 'Zlib' },
  { name: 'DOSBox Staging', url: 'https://www.dosbox-staging.org', licence: 'GPL-2.0+' },
  { name: 'PipeWire', url: 'https://pipewire.org', licence: 'MIT' },
  { name: 'NetworkManager', url: 'https://networkmanager.dev', licence: 'GPL-2.0+' },
  { name: 'BlueZ', url: 'http://www.bluez.org', licence: 'GPL-2.0+' },
  { name: 'SDL', url: 'https://www.libsdl.org', licence: 'Zlib' },
  { name: 'mpv', url: 'https://mpv.io', licence: 'GPL-2.0+' },
  { name: 'Go', url: 'https://go.dev', licence: 'BSD-3-Clause' },
];

export const SITE_CREDITS: readonly Credit[] = [
  { name: 'Angular', url: 'https://angular.dev', licence: 'MIT' },
  { name: 'Lucide', url: 'https://lucide.dev', licence: 'ISC' },
  { name: 'Bricolage Grotesque', url: 'https://github.com/ateliertriay/bricolage', licence: 'OFL-1.1' },
  { name: 'Lexend', url: 'https://www.lexend.com', licence: 'OFL-1.1' },
];
