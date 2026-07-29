import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const dir = process.argv[2] || 'C:/tmp/shibil-candidates';
const rawManifest = fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8').replace(/^\uFEFF/, '');
const files = JSON.parse(rawManifest);
const thumbW = 180;
const thumbH = 270;
const cols = 10;
const rows = Math.ceil(files.length / cols);
const composites = [];
const escapeXml = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;');

for (let i = 0; i < files.length; i += 1) {
  const item = files[i];
  const thumb = await sharp(item.file)
    .resize(thumbW, thumbH, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 72 })
    .toBuffer();
  const left = (i % cols) * thumbW;
  const top = Math.floor(i / cols) * thumbH;
  composites.push({ input: thumb, left, top });

  const label = `<svg width="${thumbW}" height="34"><rect width="100%" height="100%" fill="rgba(0,0,0,.62)"/><text x="8" y="22" font-size="17" font-family="Arial" fill="white">${i + 1}. ${escapeXml(item.title)}</text></svg>`;
  composites.push({ input: Buffer.from(label), left, top: top + thumbH - 34 });
}

const out = path.resolve(process.argv[3] || 'shibil-contact-sheet.jpg');
await sharp({
  create: {
    width: cols * thumbW,
    height: rows * thumbH,
    channels: 3,
    background: '#111',
  },
})
  .composite(composites)
  .jpeg({ quality: 82 })
  .toFile(out);

console.log(out);
