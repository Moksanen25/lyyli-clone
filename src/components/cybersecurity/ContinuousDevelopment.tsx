import { getTranslations } from '@/lib/i18n';

interface ContinuousDevelopmentProps {
  locale: string;
}

export default async function ContinuousDevelopment({ locale }: ContinuousDevelopmentProps) {
  const t = await getTranslations(locale);

  const developmentFeatures = [
    {
      title: t['cybersecurity.continuousDevelopment.features.regularUpdates.title'],
      description: t['cybersecurity.continuousDevelopment.features.regularUpdates.description'],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: t['cybersecurity.continuousDevelopment.features.externalAudits.title'],
      description: t['cybersecurity.continuousDevelopment.features.externalAudits.description'],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: t['cybersecurity.continuousDevelopment.features.staffTraining.title'],
      description: t['cybersecurity.continuousDevelopment.features.staffTraining.description'],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: t['cybersecurity.continuousDevelopment.features.threatMonitoring.title'],
      description: t['cybersecurity.continuousDevelopment.features.threatMonitoring.description'],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-6 text-forest font-playfair font-bold leading-snug">
            {t['cybersecurity.continuousDevelopment.title']}
          </h2>
          <p className="text-xl text-mediumGray font-sans max-w-3xl mx-auto leading-relaxed">
            {t['cybersecurity.continuousDevelopment.subtitle']}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-8">
            {developmentFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-lg font-playfair font-bold text-forest mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-forest/5 p-8 rounded-lg border border-forest/20">
            <h4 className="text-xl font-playfair font-bold text-forest mb-6">
              {t['cybersecurity.continuousDevelopment.commitment.title']}
            </h4>
            <p className="text-mediumGray font-sans leading-relaxed">
              {t['cybersecurity.continuousDevelopment.commitment.description']}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
