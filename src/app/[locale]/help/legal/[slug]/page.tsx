import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllLegalSlugs, getLegalDoc } from '@/lib/legal';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { LegalMDXComponents } from '@/components/mdx/LegalMDXComponents';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams(): Promise<
  { slug: string; locale: string }[]
> {
  const slugs = getAllLegalSlugs();
  return slugs.map(({ slug, locale }) => ({ slug, locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const doc = getLegalDoc(slug, locale);
  return {
    title: doc ? doc.title : 'Legal template',
    description: doc?.description ?? undefined,
  };
}

// Modern MDX rendering replaces the old regex-based markdownToHtml function
// All styling is now handled through MDX components in LegalMDXComponents.tsx

export default async function LegalTemplatePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const doc = getLegalDoc(slug, locale);

  const t = (key: string): string => {
    const fi = locale === 'fi';
    const map: Record<string, string> = {
      back: fi ? 'Takaisin kirjastoon' : 'Back to library',
      updated: fi ? 'Päivitetty' : 'Last updated',
      version: fi ? 'Versio' : 'Version',
      notFoundTitle: fi ? 'Ei löytynyt' : 'Not found',
      notFoundMessage: fi
        ? 'Pyydettyä mallipohjaa ei löytynyt.'
        : 'The requested template was not found.',
    };
    return map[key] ?? key;
  };

  if (!doc) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose/5 to-turquoise/5 py-16">
        <div className="max-w-3xl mx-auto px-6 bg-white rounded-2xl shadow-lg p-12">
          <Link
            href={`/${locale}/help/legal`}
            className="text-forest underline"
          >
            {t('back')}
          </Link>
          <h1 className="text-3xl text-forest mt-6 font-playfair font-bold">
            {t('notFoundTitle')}
          </h1>
          <p className="text-mediumGray mt-2 font-sans">
            {t('notFoundMessage')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose/5 to-turquoise/5 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <Link
          href={`/${locale}/help/legal`}
          className="text-forest hover:text-forest/80 transition-colors mb-8 inline-block font-medium"
        >
          ← {t('back')}
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16">
          <header className="mb-10 border-b border-gray-100 pb-8">
            <h1 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-tight">
              {doc.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-mediumGray font-sans">
              {doc.version ? (
                <span className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                  <span className="font-semibold mr-2">{t('version')}:</span>{' '}
                  {doc.version}
                </span>
              ) : null}
              {doc.lastUpdated ? (
                <span className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                  <span className="font-semibold mr-2">{t('updated')}:</span>{' '}
                  {doc.lastUpdated}
                </span>
              ) : null}
            </div>
          </header>

          <article className="max-w-none text-darkGray font-sans leading-relaxed prose prose-headings:font-playfair prose-headings:text-forest prose-p:text-mediumGray prose-strong:text-darkGray prose-li:text-mediumGray">
            <MDXRemote
              source={doc.content}
              components={LegalMDXComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </article>
        </div>
      </div>
    </div>
  );
}
