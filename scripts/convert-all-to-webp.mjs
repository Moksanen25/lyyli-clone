import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir, stat } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicImagesDir = join(__dirname, '..', 'public', 'images');

async function findImages(dir, imageList = []) {
  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = join(dir, file);
    const fileStat = await stat(filePath);
    
    if (fileStat.isDirectory()) {
      await findImages(filePath, imageList);
    } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
      imageList.push(filePath);
    }
  }
  
  return imageList;
}

async function convertToWebP() {
  console.log('🔍 Finding all PNG and JPG images...\n');
  const images = await findImages(publicImagesDir);
  
  console.log(`Found ${images.length} images to convert\n`);
  
  let successCount = 0;
  let errorCount = 0;
  let totalSizeBefore = 0;
  let totalSizeAfter = 0;

  for (const imagePath of images) {
    const outputPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const relativePath = imagePath.replace(publicImagesDir, 'public/images');
    
    try {
      // Get original file size
      const originalStats = await stat(imagePath);
      totalSizeBefore += originalStats.size;
      
      // Convert to WebP
      await sharp(imagePath)
        .webp({ quality: 90, effort: 6 })
        .toFile(outputPath);
      
      // Get new file size
      const newStats = await stat(outputPath);
      totalSizeAfter += newStats.size;
      
      const reduction = Math.round((1 - newStats.size / originalStats.size) * 100);
      const sizeBefore = (originalStats.size / 1024).toFixed(1);
      const sizeAfter = (newStats.size / 1024).toFixed(1);
      
      console.log(`✓ ${relativePath}`);
      console.log(`  ${sizeBefore}KB → ${sizeAfter}KB (${reduction}% smaller)\n`);
      
      successCount++;
    } catch (error) {
      console.error(`✗ Error converting ${relativePath}:`, error.message);
      errorCount++;
    }
  }

  const totalReduction = Math.round((1 - totalSizeAfter / totalSizeBefore) * 100);
  const totalBefore = (totalSizeBefore / 1024 / 1024).toFixed(2);
  const totalAfter = (totalSizeAfter / 1024 / 1024).toFixed(2);
  const saved = (totalBefore - totalAfter).toFixed(2);

  console.log('\n' + '='.repeat(60));
  console.log('📊 CONVERSION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✓ Successfully converted: ${successCount} images`);
  console.log(`✗ Errors: ${errorCount} images`);
  console.log(`📦 Total size before: ${totalBefore} MB`);
  console.log(`📦 Total size after: ${totalAfter} MB`);
  console.log(`💾 Total saved: ${saved} MB (${totalReduction}% reduction)`);
  console.log('='.repeat(60));
}

convertToWebP().catch(console.error);

