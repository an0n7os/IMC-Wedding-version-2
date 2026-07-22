const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '..', 'public', 'images');
const backupDir = path.join(__dirname, '..', 'backup', 'images');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

async function optimizeImages() {
  const files = fs.readdirSync(inputDir);
  
  for (const file of files) {
    const filePath = path.join(inputDir, file);
    const stats = fs.statSync(filePath);
    
    // Only process images > 150KB
    if (stats.isFile() && (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.JPG') || file.endsWith('.PNG') || file.endsWith('.png'))) {
      if (stats.size > 150 * 1024) {
        console.log(`Optimizing ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
        
        const backupPath = path.join(backupDir, file);
        
        // Move original to backup
        if (!fs.existsSync(backupPath)) {
          fs.copyFileSync(filePath, backupPath);
        }
        
        const tempPath = path.join(inputDir, `temp_${file}`);
        
        try {
          let pipeline = sharp(backupPath)
            .resize({
              width: 1600,
              withoutEnlargement: true,
              fit: 'inside'
            });

          if (file.toLowerCase().endsWith('.png')) {
            await pipeline.png({ quality: 75, compressionLevel: 9 }).toFile(tempPath);
          } else {
            await pipeline.jpeg({ quality: 70, progressive: true, mozjpeg: true }).toFile(tempPath);
          }
          
          // Replace original with compressed
          fs.unlinkSync(filePath);
          fs.renameSync(tempPath, filePath);
          
          const newStats = fs.statSync(filePath);
          console.log(`  Done: ${(newStats.size / 1024).toFixed(2)} KB`);
        } catch (err) {
          console.error(`Error processing ${file}:`, err);
        }
      } else {
        console.log(`Skipping ${file} (Size already < 150KB)`);
      }
    }
  }
}

optimizeImages().then(() => console.log('Optimization complete!'));
