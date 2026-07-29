const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '..', 'public', 'images');
const backupDir = path.join(__dirname, '..', 'backup', 'images');

const MIN_SIZE = 150 * 1024;
const MAX_WIDTH = 1600;

function collect(dir, relative = '') {
  return fs.readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    const rel = path.join(relative, entry);
    return fs.statSync(full).isDirectory() ? collect(full, rel) : [rel];
  });
}

async function optimizeImages() {
  const files = collect(inputDir);

  for (const rel of files) {
    if (!/\.(jpe?g|png)$/i.test(rel)) continue;

    const filePath = path.join(inputDir, rel);
    const stats = fs.statSync(filePath);

    if (stats.size <= MIN_SIZE) {
      console.log(`Skipping ${rel} (already ${(stats.size / 1024).toFixed(0)} KB)`);
      continue;
    }

    console.log(`Optimizing ${rel} (${(stats.size / 1024).toFixed(0)} KB)`);

    const backupPath = path.join(backupDir, rel);
    fs.mkdirSync(path.dirname(backupPath), { recursive: true });
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
    }

    const tempPath = path.join(path.dirname(filePath), `temp_${path.basename(rel)}`);

    try {
      const pipeline = sharp(backupPath).resize({
        width: MAX_WIDTH,
        withoutEnlargement: true,
        fit: 'inside',
      });

      if (/\.png$/i.test(rel)) {
        await pipeline.png({ quality: 75, compressionLevel: 9 }).toFile(tempPath);
      } else {
        await pipeline.jpeg({ quality: 70, progressive: true, mozjpeg: true }).toFile(tempPath);
      }

      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);

      console.log(`  Done: ${(fs.statSync(filePath).size / 1024).toFixed(0)} KB`);
    } catch (err) {
      console.error(`Error processing ${rel}:`, err);
    }
  }
}

optimizeImages().then(() => console.log('Optimization complete!'));
