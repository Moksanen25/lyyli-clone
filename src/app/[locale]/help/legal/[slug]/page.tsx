import type { Metadata } from "next";
import Link from "next/link";
import { getAllLegalSlugs, getLegalDoc } from "@/lib/legal";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { LegalMDXComponents } from "@/components/mdx/LegalMDXComponents";

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

// Modern MDX rendering replaces the old regex-based markdownToHtml function
// All styling is now handled through MDX components in LegalMDXComponents.tsx

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
      notFoundTitle: fi ? "Ei löytynyt" : "Not found",
      notFoundMessage: fi ? "Pyydettyä mallipohjaa ei löytynyt." : "The requested template was not found.",
    };
    return map[key] || key;
  };

  if (!doc) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <Link href={`/${locale}/help/legal`} className="text-forest underline">{t("back")}</Link>
          <h1 className="text-3xl text-forest mt-6 font-playfair font-bold">{t("notFoundTitle")}</h1>
          <p className="text-mediumGray mt-2 font-sans">{t("notFoundMessage")}</p>
        </div>
      </div>
    );
  }

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
          <MDXRemote 
            source={doc.content} 
            components={LegalMDXComponents}
          />
        </article>
      </div>
    </div>
  );
}



