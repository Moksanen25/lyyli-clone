import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public', 'images', 'general');

async function convertToWebP() {
  const images = [
    {
      input: 'Lyyli_dashboard_desktop.png',
      output: 'Lyyli_dashboard_desktop.webp',
    },
    {
      input: 'Lyyli_dashboard_mobile.png',
      output: 'Lyyli_dashboard_mobile.webp',
    },
  ];

  for (const image of images) {
    const inputPath = join(publicDir, image.input);
    const outputPath = join(publicDir, image.output);

    try {
      await sharp(inputPath)
        .webp({ quality: 90, effort: 6 })
        .toFile(outputPath);

      console.log(`✓ Converted ${image.input} to ${image.output}`);
    } catch (error) {
      console.error(`✗ Error converting ${image.input}:`, error.message);
    }
  }

  console.log('\n✓ All images converted successfully!');
}

convertToWebP().catch(console.error);
