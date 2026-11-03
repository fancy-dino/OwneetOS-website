// SPDX-License-Identifier: GPL-3.0-or-later
// The user guide's parts, in order, as approved in demo 7.3 (design/demos/7.3-user-guide.html in the
// code repository). The texts are in the message files under "guide."; the last part ("help") is
// not numbered.
import { GuideMaker, GuideSection } from './guide.model';

/** The requirements, one row each: `guide.req.<row>.label`, `.min`, `.rec`. */
export const REQUIREMENT_ROWS = ['cpu', 'firmware', 'ram', 'graphics', 'storage', 'stick', 'controller'] as const;

/** The table of keys: `guide.keys.<id>.boot`, `.firmware`. */
export const MAKERS: readonly GuideMaker[] = [
  { id: 'acer', name: 'Acer' }, { id: 'asus', name: 'ASUS' }, { id: 'dell', name: 'Dell' }, { id: 'hp', name: 'HP' },
  { id: 'lenovo', name: 'Lenovo' }, { id: 'msi', name: 'MSI' }, { id: 'gigabyte', name: 'Gigabyte' },
  { id: 'asrock', name: 'ASRock' }, { id: 'surface', name: 'Microsoft Surface' },
];

export const SECTIONS: readonly GuideSection[] = [
  { id: 'req', blocks: [
    { kind: 'requirements' },
    { kind: 'steps', title: 'req.uefi.title', steps: [
      { text: 'req.uefi.1' },
      { text: 'req.uefi.2', sub: ['req.uefi.2.uefi', 'req.uefi.2.legacy'] },
    ] },
    { kind: 'warn', text: 'req.erase' },
  ] },
  { id: 'download', blocks: [
    { kind: 'p', text: 'download.intro' },
    { kind: 'steps', title: 'download.get.title', steps: [{ text: 'download.get.1' }, { text: 'download.get.2' }] },
    { kind: 'details', summary: 'download.check', blocks: [
      { kind: 'p', text: 'download.check.intro' },
      { kind: 'steps', title: 'download.complete.title', steps: [
        { text: 'download.complete.1' },
        { text: 'download.complete.2', sub: ['download.complete.2.windows', 'download.complete.2.mac', 'download.complete.2.linux'] },
        { text: 'download.complete.3' },
      ] },
      { kind: 'steps', title: 'download.ours.title', steps: [
        { text: 'download.ours.1' }, { text: 'download.ours.2' }, { text: 'download.ours.3' }, { text: 'download.ours.4' },
      ] },
    ] },
  ] },
  { id: 'write', blocks: [
    { kind: 'drawing', drawing: 'write' },
    { kind: 'p', text: 'write.intro' },
    { kind: 'list', items: ['write.etcher', 'write.ventoy'] },
  ] },
  { id: 'start', blocks: [
    { kind: 'p', text: 'start.intro' },
    { kind: 'drawing', drawing: 'boot' },
    { kind: 'keys' },
    { kind: 'small', text: 'start.keys.note' },
    { kind: 'p', text: 'start.nokey' },
    { kind: 'p', text: 'start.firmware' },
    { kind: 'list', items: ['start.secureboot', 'start.csm', 'start.save'] },
    { kind: 'drawing', drawing: 'firmware' },
    { kind: 'warn', text: 'start.anticheat' },
  ] },
  { id: 'try', blocks: [
    { kind: 'p', text: 'try.text' },
    { kind: 'pictures', names: ['live-home'] },
  ] },
  { id: 'install', blocks: [
    { kind: 'p', text: 'install.text' },
    { kind: 'pictures', names: ['installer-disks', 'installer-warn', 'installer-hold', 'installer-done'] },
    { kind: 'small', text: 'install.dualboot' },
  ] },
  { id: 'first', blocks: [
    { kind: 'p', text: 'first.text' },
    { kind: 'pictures', names: ['first-language', 'first-network', 'first-time'] },
  ] },
  { id: 'use', blocks: [
    { kind: 'list', items: ['use.guide', 'use.quick', 'use.updates', 'use.disks'] },
    { kind: 'pictures', names: ['home', 'quick-menu', 'system-update', 'usb-disk'] },
  ] },
  { id: 'help', blocks: [
    { kind: 'help', count: 5 },
    { kind: 'p', text: 'help.more' },
  ] },
];
