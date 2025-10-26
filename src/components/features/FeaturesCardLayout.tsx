import { TranslationKeys } from "../../lib/i18n";

interface FeaturesCardLayoutProps {
  locale: string;
  translations: TranslationKeys;
}

export default function FeaturesCardLayout({
  locale,
  translations: t,
}: FeaturesCardLayoutProps) {
  const features = [
    // Lyyli learns from your messages
    {
      category: "automatic",
      icon: (
        <svg className="w-8 h-8" fill="#2F5D50" viewBox="0 0 24 24">
          <path d="M6 4h12v2H6V4zm0 14h12v2H6v-2zm0-6h8v2H6v-2z" />
          <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zM14 14h8v8h-8v-8zm2 2v4h4v-4h-4z" />
        </svg>
      ),
      title: t["features.learns.seamlessIntegration.title"],
      description: t["features.learns.seamlessIntegration.description"],
      gradient: "from-forest to-turquoise",
    },
    {
      category: "automatic",
      icon: (
        <svg className="w-8 h-8" fill="#2F5D50" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      ),
      title: t["features.learns.voice.title"],
      description: t["features.learns.voice.description"],
      gradient: "from-forest to-turquoise",
    },
    {
      category: "automatic",
      icon: (
        <svg className="w-8 h-8" fill="#2F5D50" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <path d="M12.5 7.5h-1v3h-3v1h3v3h1v-3h3v-1h-3v-3z" />
        </svg>
      ),
      title: t["features.learns.proactive.title"],
      description: t["features.learns.proactive.description"],
      gradient: "from-forest to-turquoise",
    },
    {
      category: "automatic",
      icon: (
        <svg className="w-8 h-8" fill="#2F5D50" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" clipRule="evenodd" />
        </svg>
      ),
      title: t["features.grid.aiImage.title"],
      description: t["features.grid.aiImage.description"],
      gradient: "from-forest to-turquoise",
    },

    // Governance & Compliance
    {
      category: "governance",
      icon: (
        <svg className="w-8 h-8" fill="#2F5D50" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" />
        </svg>
      ),
      title: t["features.governance.audit.title"],
      description: t["features.governance.audit.description"],
      gradient: "from-turquoise to-forest",
    },
    {
      category: "governance",
      icon: (
        <svg className="w-8 h-8" fill="#2F5D50" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
        </svg>
      ),
      title: t["features.governance.version.title"],
      description: t["features.governance.version.description"],
      gradient: "from-turquoise to-forest",
    },
    {
      category: "governance",
      icon: (
        <svg className="w-8 h-8" fill="#2F5D50" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
        </svg>
      ),
      title: t["features.governance.access.title"],
      description: t["features.governance.access.description"],
      gradient: "from-turquoise to-forest",
    },

    // Enterprise Security
    {
      category: "security",
      icon: (
        <svg className="w-8 h-8" fill="#2F5D50" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
        </svg>
      ),
      title: t["features.security.encryption.title"],
      description: t["features.security.encryption.description"],
      gradient: "from-rose to-turquoise",
    },
    {
      category: "security",
      icon: (
        <svg className="w-8 h-8" fill="#2F5D50" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.814 3.51 10.815 8.625 12.975a.75.75 0 00.75 0C16.74 20.565 20.25 15.564 20.25 9.75a12.74 12.74 0 00-.635-3.985.75.75 0 00-.722-.515 11.209 11.209 0 01-7.877-3.08zM15.75 9.75a.75.75 0 00-.75-.75H9a.75.75 0 00-.75.75v.75c0 .414.336.75.75.75h6a.75.75 0 00.75-.75v-.75z" clipRule="evenodd" />
        </svg>
      ),
      title: "ISO 27001 readiness",
      description: "Information security management system built to international standards for comprehensive data protection and compliance readiness.",
      gradient: "from-rose to-turquoise",
    },
    {
      category: "security",
      icon: (
        <svg className="w-8 h-8" fill="#2F5D50" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.814 3.51 10.815 8.625 12.975a.75.75 0 00.75 0C16.74 20.565 20.25 15.564 20.25 9.75a12.74 12.74 0 00-.635-3.985.75.75 0 00-.722-.515 11.209 11.209 0 01-7.877-3.08zM15.75 9.75a.75.75 0 00-.75-.75H9a.75.75 0 00-.75.75v.75c0 .414.336.75.75.75h6a.75.75 0 00.75-.75v-.75z" clipRule="evenodd" />
        </svg>
      ),
      title: t["features.security.gdpr.title"],
      description: t["features.security.gdpr.description"],
      gradient: "from-rose to-turquoise",
    },

    // Multilingual Support
    {
      category: "multilingual",
      icon: (
        <svg className="w-8 h-8" fill="#2F5D50" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
        </svg>
      ),
      title: t["features.multilingual.translation.title"],
      description: t["features.multilingual.translation.description"],
      gradient: "from-turquoise to-rose",
    },
    {
      category: "multilingual",
      icon: (
        <svg className="w-8 h-8" fill="#2F5D50" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.75 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H7.5a.75.75 0 01-.75-.75zm6-5.25a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zm2.25 8.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
        </svg>
      ),
      title: t["features.multilingual.locales.title"],
      description: t["features.multilingual.locales.description"],
      gradient: "from-turquoise to-rose",
    },
    {
      category: "multilingual",
      icon: (
        <svg className="w-8 h-8" fill="#2F5D50" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.25 8.25a.75.75 0 01.75-.75h6a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zm0 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zm0 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
        </svg>
      ),
      title: t["features.multilingual.cultural.title"],
      description: t["features.multilingual.cultural.description"],
      gradient: "from-turquoise to-rose",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Lyyli learns from your messages */}
      <div id="ai-automation">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
            {t["features.learns.title"]}
          </h2>
          <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
            {t["features.learns.description"]}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features
            .filter((f) => f.category === "automatic")
            .map((feature, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border-2 border-forest shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl mb-3 text-forest font-playfair font-bold leading-normal text-center">
                  {feature.title}
                </h3>
                <p className="text-mediumGray text-base font-sans leading-relaxed text-center">
                  {feature.description}
                </p>
              </article>
            ))}
        </div>
        
        {/* Related Sections */}
        <div className="mt-12 text-center">
          <p className="text-sm text-mediumGray mb-4">
            {locale === 'fi' ? 'Katso myös:' : 'See also:'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#governance-compliance" 
              className="text-sm text-forest hover:text-forest/80 transition-colors underline"
            >
              {locale === 'fi' ? 'Hallinta & Compliance' : 'Governance & Compliance'}
            </a>
            <a 
              href="#security-gdpr" 
              className="text-sm text-forest hover:text-forest/80 transition-colors underline"
            >
              {locale === 'fi' ? 'Tietoturva & GDPR' : 'Security & GDPR'}
            </a>
            <a 
              href="#integrations" 
              className="text-sm text-forest hover:text-forest/80 transition-colors underline"
            >
              {locale === 'fi' ? 'Integraatiot' : 'Integrations'}
            </a>
          </div>
        </div>
      </div>

      {/* Governance & Compliance */}
      <div id="governance-compliance">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
            {t["features.governance.title"]}
          </h2>
          <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
            {t["features.governance.description"]}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features
            .filter((f) => f.category === "governance")
            .map((feature, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl mb-3 text-forest font-playfair font-bold leading-normal text-center">
                  {feature.title}
                </h3>
                <p className="text-mediumGray text-base font-sans leading-relaxed text-center">
                  {feature.description}
                </p>
              </article>
            ))}
        </div>
        
        {/* Related Sections */}
        <div className="mt-12 text-center">
          <p className="text-sm text-mediumGray mb-4">
            {locale === 'fi' ? 'Katso myös:' : 'See also:'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#ai-automation" 
              className="text-sm text-forest hover:text-forest/80 transition-colors underline"
            >
              {locale === 'fi' ? 'AI-automaatio' : 'AI Automation'}
            </a>
            <a 
              href="#security-gdpr" 
              className="text-sm text-forest hover:text-forest/80 transition-colors underline"
            >
              {locale === 'fi' ? 'Tietoturva & GDPR' : 'Security & GDPR'}
            </a>
            <a 
              href="#multilingual" 
              className="text-sm text-forest hover:text-forest/80 transition-colors underline"
            >
              {locale === 'fi' ? 'Monikielisyys' : 'Multilingual'}
            </a>
          </div>
        </div>
      </div>

      {/* Enterprise Security */}
      <div id="security-gdpr">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
            {t["features.security.title"]}
          </h2>
          <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
            {t["features.security.description"]}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features
            .filter((f) => f.category === "security")
            .map((feature, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl mb-3 text-forest font-playfair font-bold leading-normal text-center">
                  {feature.title}
                </h3>
                <p className="text-mediumGray text-base font-sans leading-relaxed text-center">
                  {feature.description}
                </p>
              </article>
            ))}
        </div>
        
        {/* Related Sections */}
        <div className="mt-12 text-center">
          <p className="text-sm text-mediumGray mb-4">
            {locale === 'fi' ? 'Katso myös:' : 'See also:'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#governance-compliance" 
              className="text-sm text-forest hover:text-forest/80 transition-colors underline"
            >
              {locale === 'fi' ? 'Hallinta & Compliance' : 'Governance & Compliance'}
            </a>
            <a 
              href="#multilingual" 
              className="text-sm text-forest hover:text-forest/80 transition-colors underline"
            >
              {locale === 'fi' ? 'Monikielisyys' : 'Multilingual'}
            </a>
            <a 
              href="#integrations" 
              className="text-sm text-forest hover:text-forest/80 transition-colors underline"
            >
              {locale === 'fi' ? 'Integraatiot' : 'Integrations'}
            </a>
          </div>
        </div>
      </div>

      {/* Multilingual Support */}
      <div id="multilingual">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
            {t["features.multilingual.title"]}
          </h2>
          <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
            {t["features.multilingual.description"]}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features
            .filter((f) => f.category === "multilingual")
            .map((feature, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl mb-3 text-forest font-playfair font-bold leading-normal text-center">
                  {feature.title}
                </h3>
                <p className="text-mediumGray text-base font-sans leading-relaxed text-center">
                  {feature.description}
                </p>
              </article>
            ))}
        </div>
        
        {/* Related Sections */}
        <div className="mt-12 text-center">
          <p className="text-sm text-mediumGray mb-4">
            {locale === 'fi' ? 'Katso myös:' : 'See also:'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#ai-automation" 
              className="text-sm text-forest hover:text-forest/80 transition-colors underline"
            >
              {locale === 'fi' ? 'AI-automaatio' : 'AI Automation'}
            </a>
            <a 
              href="#governance-compliance" 
              className="text-sm text-forest hover:text-forest/80 transition-colors underline"
            >
              {locale === 'fi' ? 'Hallinta & Compliance' : 'Governance & Compliance'}
            </a>
            <a 
              href="#integrations" 
              className="text-sm text-forest hover:text-forest/80 transition-colors underline"
            >
              {locale === 'fi' ? 'Integraatiot' : 'Integrations'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}