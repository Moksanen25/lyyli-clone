import { Metadata } from "next";
import Link from "next/link";
import { getAllLegalSlugs, getLegalDoc } from "../../../../../lib/legal";

export async function generateStaticParams() {
  const slugs = getAllLegalSlugs();
  return slugs.map(({ slug, locale }) => ({ slug, locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const doc = getLegalDoc(slug, locale);
  return {
    title: doc ? doc.title : "Legal template",
    description: doc?.description || undefined,
  };
}

function markdownToHtml(markdown: string): string {
  let html = markdown
    // Headings (shift down by one level to keep page <h1> for title)
    .replace(/^# (.*$)/gim, '<h2 class="text-forest font-playfair font-bold text-3xl leading-tight mt-8 mb-3">$1<\/h2>')
    .replace(/^## (.*$)/gim, '<h3 class="text-forest font-playfair font-bold text-2xl leading-snug mt-6 mb-2">$1<\/h3>')
    .replace(/^### (.*$)/gim, '<h4 class="text-forest font-playfair font-semibold text-xl leading-snug mt-5 mb-2">$1<\/h4>')
    .replace(/^#### (.*$)/gim, '<h5 class="text-forest font-playfair font-medium text-lg leading-snug mt-4 mb-2">$1<\/h5>')
    // Numeric section headings like "1 SCOPE ..." → styled H2 (covers EN & FI uppercase incl. ÅÄÖ)
    .replace(/^\s*(\d{1,3})\s+([A-ZÅÄÖ].*?)\s*$/gm, '<h2 class="text-forest font-playfair font-bold text-3xl leading-tight mt-8 mb-3">$1 $2<\/h2>')
    // Blockquotes
    .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-forest\/40 pl-4 italic text-darkGray my-4">$1<\/blockquote>')
    // Bold/italic
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1<\/strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1<\/em>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-forest underline" target="_blank" rel="noopener noreferrer">$1<\/a>')
    // Paragraphs
    .replace(/^(?!<h\d>|<ul>|<ol>|<li>|<p>|<blockquote>|<table>|<tr>|<td>|<th>)([^\n]+)\n/gm, '<p class="text-darkGray font-sans leading-relaxed mb-4">$1<\/p>');

  // Lists
  const lines = html.split('\n');
  const processed: string[] = [];
  let inUl = false;
  let inOl = false;
  for (const line of lines) {
    if (/^\s*[-*]\s+/.test(line)) {
      if (!inUl) {
        processed.push('<ul class="list-disc pl-6 mb-4">');
        inUl = true;
      }
      processed.push(`<li class="mb-1">${line.replace(/^\s*[-*]\s+/, '')}</li>`);
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      if (!inOl) {
        processed.push('<ol class="list-decimal pl-6 mb-4">');
        inOl = true;
      }
      processed.push(`<li class="mb-1">${line.replace(/^\s*\d+\.\s+/, '')}</li>`);
      continue;
    }
    if (inUl) {
      processed.push('</ul>');
      inUl = false;
    }
    if (inOl) {
      processed.push('</ol>');
      inOl = false;
    }
    processed.push(line);
  }
  if (inUl) processed.push('</ul>');
  if (inOl) processed.push('</ol>');

  return processed.join('\n');
}

export default async function LegalTemplatePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const doc = getLegalDoc(slug, locale);

  const t = (key: string) => {
    const fi = locale === "fi";
    const map: Record<string, string> = {
      back: fi ? "Takaisin kirjastoon" : "Back to library",
      updated: fi ? "Päivitetty" : "Last updated",
      version: fi ? "Versio" : "Version",
    };
    return map[key] || key;
  };

  if (!doc) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <Link href={`/${locale}/help/legal`} className="text-forest underline">{t("back")}</Link>
          <h1 className="text-3xl text-forest mt-6 font-playfair font-bold">Not found</h1>
          <p className="text-mediumGray mt-2 font-sans">The requested template was not found.</p>
        </div>
      </div>
    );
  }

  const html = markdownToHtml(doc.content);

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-6">
        <Link href={`/${locale}/help/legal`} className="text-forest underline">{t("back")}</Link>
        <h1 className="text-4xl text-forest mt-4 mb-2 font-playfair font-bold leading-tight">{doc.title}</h1>
        <div className="text-sm text-mediumGray font-sans mb-8 flex gap-4">
          {doc.version ? <span>{t("version")} {doc.version}</span> : null}
          {doc.lastUpdated ? <span>{t("updated")} {doc.lastUpdated}</span> : null}
        </div>
        <article className="max-w-none text-darkGray font-sans leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </div>
    </div>
  );
}



