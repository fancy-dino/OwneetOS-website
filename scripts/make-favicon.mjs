// SPDX-License-Identifier: GPL-3.0-or-later
// Makes the site's icons in public/ (step 7.8e, approved demo design/demos/7.8e-website-favicon.html
// of the OwneetOS repository): the gamepad "O" of the logo (wordmark.data.ts) in the accent colour
// of the site's palettes (src/styles.scss), never colours of its own.
//   favicon.svg           the tab's icon; Dusk, or Daylight when the device is light (as the site)
//   favicon.ico           16 and 32 px for browsers without SVG icons, in Dusk
//   apple-touch-icon.png  180 px for a phone's home screen: the mark on a tile, in Dusk
// Run it again when the logo or the palettes change: node scripts/make-favicon.mjs
// Dependency-free: it draws the PNGs itself (even-odd fill, 4 x 4 samples per pixel).
import { readFileSync, writeFileSync } from 'node:fs';
import { crc32, deflateSync } from 'node:zlib';

// ---- Sources: the mark and the palettes.
const wordmark = readFileSync('src/app/shared/components/wordmark/wordmark.data.ts', 'utf8');
const MARK = /accent: true[^}]*?d: '([^']+)'/.exec(wordmark)[1];
const styles = readFileSync('src/styles.scss', 'utf8');
const [duskCss, daylightCss] = styles.split('@media (prefers-color-scheme: light)');
const token = (css, name) => new RegExp(`--${name}: (#[0-9a-f]{6})`).exec(css)[1];
const DUSK = { accent: token(duskCss, 'accent'), bg: token(duskCss, 'bg') };
const DAYLIGHT = { accent: token(daylightCss, 'accent'), bg: token(daylightCss, 'bg') };

// The tile of the home-screen icon: the site's background, square (the phone rounds its corners),
// the mark at 72 % in its middle.
const TILE_MARK = { at: 14, scale: 0.72 };

// ---- favicon.svg
writeFileSync('public/favicon.svg',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
  `<style>path{fill:${DUSK.accent}}@media (prefers-color-scheme: light){path{fill:${DAYLIGHT.accent}}}</style>` +
  `<path fill-rule="evenodd" d="${MARK}"/></svg>\n`);

// ---- The mark as polygons: the path's commands (M L H V Q A Z, absolute or relative) flattened.
function polygons(d) {
  const tokens = d.match(/[a-zA-Z]|-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?/g);
  const shapes = [];
  let shape = [], x = 0, y = 0, start = [0, 0], cmd = '';
  const num = () => Number(tokens.shift());
  const to = (nx, ny) => { x = nx; y = ny; shape.push([x, y]); };
  while (tokens.length) {
    if (/[a-zA-Z]/.test(tokens[0])) cmd = tokens.shift();
    const rel = cmd === cmd.toLowerCase(), ox = rel ? x : 0, oy = rel ? y : 0;
    switch (cmd.toUpperCase()) {
      case 'M':
        if (shape.length) shapes.push(shape);
        shape = []; to(ox + num(), oy + num()); start = [x, y];
        cmd = rel ? 'l' : 'L';   // more pairs after a move are lines
        break;
      case 'L': to(ox + num(), oy + num()); break;
      case 'H': to(ox + num(), y); break;
      case 'V': to(x, oy + num()); break;
      case 'Q': {
        const cx = ox + num(), cy = oy + num(), ex = ox + num(), ey = oy + num(), sx = x, sy = y;
        for (let i = 1; i <= 16; i++) {
          const t = i / 16, u = 1 - t;
          to(u * u * sx + 2 * u * t * cx + t * t * ex, u * u * sy + 2 * u * t * cy + t * t * ey);
        }
        break;
      }
      case 'A': {
        const rx = num(), ry = num(), rot = num(), large = num(), sweep = num();
        arc(x, y, rx, ry, rot, large, sweep, ox + num(), oy + num()).forEach(([px, py]) => to(px, py));
        break;
      }
      case 'Z': to(start[0], start[1]); shapes.push(shape); shape = []; break;
      default: throw new Error(`path command ${cmd}`);
    }
  }
  if (shape.length) shapes.push(shape);
  return shapes;
}

/** The points of an SVG arc (the SVG specification's endpoint to centre conversion). */
function arc(x1, y1, rx, ry, rotDeg, large, sweep, x2, y2) {
  const phi = rotDeg * Math.PI / 180, cos = Math.cos(phi), sin = Math.sin(phi);
  const dx = (x1 - x2) / 2, dy = (y1 - y2) / 2;
  const xp = cos * dx + sin * dy, yp = -sin * dx + cos * dy;
  const k = (xp * xp) / (rx * rx) + (yp * yp) / (ry * ry);
  if (k > 1) { rx *= Math.sqrt(k); ry *= Math.sqrt(k); }
  const num = rx * rx * ry * ry - rx * rx * yp * yp - ry * ry * xp * xp;
  const coef = (large === sweep ? -1 : 1) * Math.sqrt(Math.max(0, num / (rx * rx * yp * yp + ry * ry * xp * xp)));
  const cxp = coef * rx * yp / ry, cyp = -coef * ry * xp / rx;
  const cx = cos * cxp - sin * cyp + (x1 + x2) / 2, cy = sin * cxp + cos * cyp + (y1 + y2) / 2;
  const angle = (ux, uy, vx, vy) => Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
  const t1 = angle(1, 0, (xp - cxp) / rx, (yp - cyp) / ry);
  let dt = angle((xp - cxp) / rx, (yp - cyp) / ry, (-xp - cxp) / rx, (-yp - cyp) / ry);
  if (!sweep && dt > 0) dt -= 2 * Math.PI;
  if (sweep && dt < 0) dt += 2 * Math.PI;
  const steps = Math.max(8, Math.ceil(Math.abs(dt) / (Math.PI / 32)));
  const points = [];
  for (let i = 1; i <= steps; i++) {
    const t = t1 + dt * i / steps;
    points.push([cx + rx * Math.cos(t) * cos - ry * Math.sin(t) * sin, cy + rx * Math.cos(t) * sin + ry * Math.sin(t) * cos]);
  }
  return points;
}

/** Whether (px, py) is inside the shapes, even-odd. */
function inside(shapes, px, py) {
  let odd = false;
  for (const s of shapes) {
    for (let i = 0, j = s.length - 1; i < s.length; j = i++) {
      const [xi, yi] = s[i], [xj, yj] = s[j];
      if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) odd = !odd;
    }
  }
  return odd;
}

// ---- Drawing: RGBA pixels, each one the share of its 4 x 4 samples inside the shapes.
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const markShapes = polygons(MARK);
const tileMark = markShapes.map((s) => s.map(([px, py]) => [TILE_MARK.at + px * TILE_MARK.scale, TILE_MARK.at + py * TILE_MARK.scale]));
const tileShapes = [[[0, 0], [100, 0], [100, 100], [0, 100]]];

function draw(size, layers) {
  const pixels = Buffer.alloc(size * size * 4);
  const N = 4;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let [r, g, b, a] = [0, 0, 0, 0];
      for (const [shapes, hex] of layers) {
        let hits = 0;
        for (let sy = 0; sy < N; sy++) {
          for (let sx = 0; sx < N; sx++) {
            if (inside(shapes, (x + (sx + 0.5) / N) * 100 / size, (y + (sy + 0.5) / N) * 100 / size)) hits++;
          }
        }
        const cover = hits / (N * N), [cr, cg, cb] = rgb(hex);
        // this layer over what is below it
        const na = cover + a * (1 - cover);
        if (na > 0) {
          r = (cr * cover + r * a * (1 - cover)) / na;
          g = (cg * cover + g * a * (1 - cover)) / na;
          b = (cb * cover + b * a * (1 - cover)) / na;
        }
        a = na;
      }
      pixels.set([Math.round(r), Math.round(g), Math.round(b), Math.round(a * 255)], (y * size + x) * 4);
    }
  }
  return png(size, pixels);
}

function png(size, pixels) {
  const chunk = (type, data) => {
    const head = Buffer.alloc(8);
    head.writeUInt32BE(data.length, 0);
    head.write(type, 4, 'ascii');
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(Buffer.concat([head.subarray(4), data])), 0);
    return Buffer.concat([head, data, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr.set([8, 6, 0, 0, 0], 8);   // 8 bits per channel, RGBA
  const rows = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) pixels.copy(rows, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(rows, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

/** An .ico holding PNG images (every browser that reads .ico reads them). */
function ico(images) {
  const head = Buffer.alloc(6 + 16 * images.length);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(images.length, 4);
  let offset = head.length;
  images.forEach(([size, data], i) => {
    const e = 6 + 16 * i;
    head.writeUInt8(size, e);
    head.writeUInt8(size, e + 1);
    head.writeUInt16LE(1, e + 4);
    head.writeUInt16LE(32, e + 6);
    head.writeUInt32LE(data.length, e + 8);
    head.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([head, ...images.map(([, data]) => data)]);
}

writeFileSync('public/favicon.ico', ico([16, 32].map((size) => [size, draw(size, [[markShapes, DUSK.accent]])])));
writeFileSync('public/apple-touch-icon.png', draw(180, [[tileShapes, DUSK.bg], [tileMark, DUSK.accent]]));
