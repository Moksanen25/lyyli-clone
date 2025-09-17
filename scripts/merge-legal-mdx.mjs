// Create script to merge converted Markdown into legal MDX files
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const locales = ['en', 'fi'];
const slugs = [
  'order-confirmation',
  'annex-1-service-description',
  'annex-2-sla',
  'annex-3-dpa',
  'annex-4-toms',
  'annex-5-subprocessors',
  'annex-6-retention-deletion',
  'annex-7-it2022-terms',
];

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

function writeFileSafe(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function extractFrontmatter(mdx) {
  const fmStart = mdx.indexOf('---');
  if (fmStart !== 0) return { frontmatter: '', rest: mdx };
  const fmEnd = mdx.indexOf('\n---', 3);
  if (fmEnd === -1) return { frontmatter: '', rest: mdx };
  const fm = mdx.slice(0, fmEnd + 4); // include closing --- and newline
  const rest = mdx.slice(fmEnd + 4);
  return { frontmatter: fm.trim() + '\n', rest };
}

function stripFirstH1(markdown) {
  const lines = markdown.split(/\r?\n/);
  let started = false;
  const out = [];
  for (const line of lines) {
    if (!started) {
      if (line.trim().startsWith('# ')) {
        started = true;
        continue; // skip first H1
      }
      if (line.trim() === '') {
        // skip leading empties
        continue;
      }
      started = true;
      out.push(line);
    } else {
      out.push(line);
    }
  }
  return out.join('\n');
}

for (const locale of locales) {
  for (const slug of slugs) {
    const mdxPath = path.join(root, 'content', 'legal', locale, `${slug}.mdx`);
    const mdPath = path.join(root, 'content', 'legal', locale, `${slug}.converted.md`);

    const mdx = readFileSafe(mdxPath);
    const md = readFileSafe(mdPath);
    if (!mdx || !md) {
      continue;
    }

    const { frontmatter } = extractFrontmatter(mdx);
    const heading = `# ${
      slug === 'order-confirmation'
        ? locale === 'fi' ? 'Tilausvahvistus' : 'Order confirmation'
        : slug === 'annex-1-service-description'
        ? locale === 'fi' ? 'Palvelukuvaus' : 'Technical and Organizational Measures (TOMs)'
        : ''
    }`;

    // Keep existing H1 in MDX if present, otherwise synthesize from title in frontmatter
    let h1InMdx = mdx.match(/\n# .*/);
    let headerBlock = '';
    if (h1InMdx) {
      const idx = mdx.indexOf(h1InMdx[0]);
      headerBlock = mdx.slice(frontmatter.length, idx + h1InMdx[0].length);
    }

    const body = stripFirstH1(md).trim() + '\n';

    const newMdx = `${frontmatter}\n${headerBlock}${body}`;
    writeFileSafe(mdxPath, newMdx);
    console.log(`Merged ${locale}/${slug}`);
  }
}

console.log('Done.');



