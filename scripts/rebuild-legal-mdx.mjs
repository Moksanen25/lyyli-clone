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

const TITLE_MAP = {
  en: {
    'order-confirmation': 'Order confirmation',
    'annex-1-service-description': 'Annex 1: Service description',
    'annex-2-sla': 'Annex 2: Service Level Agreement (SLA)',
    'annex-3-dpa': 'Annex 3: Data Processing Agreement (DPA)',
    'annex-4-toms': 'Annex 4: Technical and Organizational Measures (TOMs)',
    'annex-5-subprocessors': 'Annex 5: Subprocessors',
    'annex-6-retention-deletion': 'Annex 6: Data retention and deletion',
    'annex-7-it2022-terms': 'Annex 7: IT2022 General Terms (reference)',
  },
  fi: {
    'order-confirmation': 'Tilausvahvistus',
    'annex-1-service-description': 'Liite 1: Palvelukuvaus',
    'annex-2-sla': 'Liite 2: Palvelutasosopimus (SLA)',
    'annex-3-dpa': 'Liite 3: Tietojenkäsittelysopimus (DPA)',
    'annex-4-toms': 'Liite 4: Tekniniset ja organisatoriset toimenpiteet (TOMit)',
    'annex-5-subprocessors': 'Liite 5: Alikäsittelijät',
    'annex-6-retention-deletion': 'Liite 6: Tietojen säilytys ja poisto',
    'annex-7-it2022-terms': 'Liite 7: IT2022 Yleiset ehdot (viite)',
  },
};

function read(file) {
  try { return fs.readFileSync(file, 'utf8'); } catch { return null; }
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
}

function today() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}

function stripFirstH1(markdown) {
  if (!markdown) return '';
  const lines = markdown.split(/\r?\n/);
  let skipped = false;
  const out = [];
  for (const line of lines) {
    if (!skipped) {
      if (line.trim().startsWith('# ')) { skipped = true; continue; }
      if (line.trim() === '') { continue; }
      skipped = true;
      out.push(line);
    } else {
      out.push(line);
    }
  }
  return out.join('\n').trim();
}

for (const locale of locales) {
  for (const slug of slugs) {
    const mdPath = path.join(root, 'content', 'legal', locale, `${slug}.converted.md`);
    const mdxPath = path.join(root, 'content', 'legal', locale, `${slug}.mdx`);
    const converted = read(mdPath);
    if (!converted) {
      console.warn(`Skip ${locale}/${slug}: no converted.md`);
      continue;
    }

    const title = TITLE_MAP[locale][slug] || slug;
    const fm = [
      '---',
      `title: "${title.replace(/"/g, '\\"')}"`,
      'description: ""',
      'version: "1.0"',
      `lastUpdated: "${today()}"`,
      '---',
      '',
    ].join('\n');

    const body = stripFirstH1(converted);
    const h1 = `# ${title}`;
    const finalContent = [fm, h1, '', body, ''].join('\n');

    write(mdxPath, finalContent);
    console.log(`Rebuilt ${locale}/${slug}`);
  }
}

console.log('All done.');



