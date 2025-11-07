import { readFile, writeFile, readdir, stat } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

async function findFiles(dir, extensions, files = []) {
  try {
    const entries = await readdir(dir);
    
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      
      // Skip node_modules and .next
      if (entry === 'node_modules' || entry === '.next' || entry === '.git') {
        continue;
      }
      
      const entryStat = await stat(fullPath);
      
      if (entryStat.isDirectory()) {
        await findFiles(fullPath, extensions, files);
      } else if (extensions.some(ext => entry.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Skip directories we can't read
  }
  
  return files;
}

async function replaceImageReferences() {
  console.log('🔍 Finding files with image references...\n');
  
  // Find all relevant files
  const extensions = ['.ts', '.tsx', '.js', '.jsx', '.mdx', '.md', '.json', '.webmanifest', '.mdc'];
  const allFiles = await findFiles(projectRoot, extensions);
  
  // Exclude test files and conversion scripts
  const filesToProcess = allFiles.filter(file => 
    !file.includes('.test.') &&
    !file.includes('replace-image-refs.mjs') &&
    !file.includes('convert-all-to-webp.mjs') &&
    !file.includes('convert-to-webp.mjs')
  );
  
  let totalReplacements = 0;
  let filesModified = 0;
  
  for (const filePath of filesToProcess) {
    try {
      const content = await readFile(filePath, 'utf-8');
      let modified = false;
      let replacements = 0;
      
      // Replace image references
      const newContent = content.replace(
        /\/images\/([^"'\s)]+)\.(png|jpg|jpeg)/gi,
        (match, path, ext) => {
          replacements++;
          return `/images/${path}.webp`;
        }
      );
      
      if (newContent !== content) {
        await writeFile(filePath, newContent, 'utf-8');
        modified = true;
        totalReplacements += replacements;
        filesModified++;
        
        const relativePath = filePath.replace(projectRoot, '.');
        console.log(`✓ ${relativePath} (${replacements} replacement${replacements > 1 ? 's' : ''})`);
      }
    } catch (error) {
      // Skip files that can't be read as text
      if (error.code !== 'EISDIR') {
        console.error(`⚠️  Could not process ${filePath}:`, error.message);
      }
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 REPLACEMENT SUMMARY');
  console.log('='.repeat(60));
  console.log(`✓ Files modified: ${filesModified}`);
  console.log(`✓ Total replacements: ${totalReplacements}`);
  console.log('='.repeat(60));
}

replaceImageReferences().catch(console.error);

