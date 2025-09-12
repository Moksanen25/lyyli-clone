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
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.804 9.804a3.75 3.75 0 00-1.035-6.037.75.75 0 01.646-1.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5z" clipRule="evenodd" />
        </svg>
      ),
      title: t["features.learns.seamlessIntegration.title"],
      description: t["features.learns.seamlessIntegration.description"],
      gradient: "from-forest to-turquoise",
    },
    {
      category: "automatic",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M6 3a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3H6zm.75 3.75A.75.75 0 017.5 6h9a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-9a.75.75 0 01-.75-.75v-.75zm0 3A.75.75 0 017.5 9h9a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-9a.75.75 0 01-.75-.75v-.75zm0 3A.75.75 0 017.5 12h9a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-9a.75.75 0 01-.75-.75v-.75z" clipRule="evenodd" />
        </svg>
      ),
      title: t["features.learns.voice.title"],
      description: t["features.learns.voice.description"],
      gradient: "from-forest to-turquoise",
    },
    {
      category: "automatic",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706 4.5 4.5 0 004.848 0 .75.75 0 00.577-.706c.019-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
          <path fillRule="evenodd" d="M9.013 19.9a.75.75 0 01.877-.597 11.319 11.319 0 004.22 0 .75.75 0 11.28 1.473 12.819 12.819 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.668 13.682 13.682 0 002.844 0 .75.75 0 11.156 1.492 15.156 15.156 0 01-3.156 0 .75.75 0 01-.668-.824z" clipRule="evenodd" />
        </svg>
      ),
      title: t["features.learns.proactive.title"],
      description: t["features.learns.proactive.description"],
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
      <div>
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
      </div>

      {/* Governance & Compliance */}
      <div>
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
      </div>

      {/* Enterprise Security */}
      <div>
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
      </div>

      {/* Multilingual Support */}
      <div>
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
      </div>
    </div>
  );
}