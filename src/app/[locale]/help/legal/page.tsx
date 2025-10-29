import { Metadata } from "next";
import Link from "next/link";
import { getAllLegalDocs } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Legal & agreements",
  description: "Order confirmation, DPA, SLA, terms, and annex templates.",
};

export default async function LegalLibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const docs = getAllLegalDocs(locale);

  const byGroup = {
    order: [] as typeof docs,
    annexes: [] as typeof docs,
    terms: [] as typeof docs,
  };

  for (const doc of docs) {
    const slug = doc.slug.toLowerCase();
    if (slug.includes("order") || slug.includes("tilaus")) byGroup.order.push(doc);
    else if (slug.includes("annex") || slug.includes("liite")) byGroup.annexes.push(doc);
    else if (slug.includes("terms") || slug.includes("it2022") || slug.includes("ehdot")) byGroup.terms.push(doc);
    else byGroup.annexes.push(doc);
  }

  const t = (key: string) => {
    const fi = locale === "fi";
    const map: Record<string, string> = {
      heading: fi ? "Sopimukset ja ehdot" : "Legal & agreements",
      sub: fi
        ? "Tilausvahvistus, DPA, SLA, ehdot ja liitteet"
        : "Order confirmation, DPA, SLA, terms, and annexes",
      order: fi ? "Tilausvahvistus" : "Order confirmation",
      annexes: fi ? "Liitteet" : "Annexes",
      terms: fi ? "Yleiset ehdot" : "General terms",
      viewTemplate: fi ? "Avaa malli" : "View template",
      lastUpdated: fi ? "Päivitetty" : "Last updated",
      version: fi ? "Versio" : "Version",
    };
    return map[key] || key;
  };

  const Section = ({ title, items }: { title: string; items: typeof docs }) => (
    <section className="mb-12">
      <h2 className="text-2xl text-forest mb-6 font-playfair font-bold leading-tight">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((doc) => (
          <Link key={doc.slug} href={`/${locale}/help/legal/${doc.slug}`} className="group">
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200 h-full">
              <h3 className="text-lg text-forest mb-2 group-hover:text-forest transition-colors font-playfair font-normal">{doc.title}</h3>
              {doc.description ? (
                <p className="text-mediumGray mb-3 font-sans leading-relaxed">{doc.description}</p>
              ) : null}
              <div className="text-sm text-mediumGray font-sans flex items-center gap-4">
                {doc.version ? (
                  <span>
                    {t("version")} {doc.version}
                  </span>
                ) : null}
                {doc.lastUpdated ? (
                  <span>
                    {t("lastUpdated")} {doc.lastUpdated}
                  </span>
                ) : null}
              </div>
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-forest text-white rounded-md group-hover:bg-forest/90">
                {t("viewTemplate")}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose/5 to-turquoise/5 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl text-forest mb-4 font-playfair font-bold leading-tight">{t("heading")}</h1>
          <p className="text-mediumGray text-lg font-sans">{t("sub")}</p>
        </header>

        <Section title={t("order")} items={byGroup.order} />
        <Section title={t("annexes")} items={byGroup.annexes} />
        <Section title={t("terms")} items={byGroup.terms} />
      </div>
    </div>
  );
}



