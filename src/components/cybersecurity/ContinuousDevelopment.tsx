import { getTranslations } from '@/lib/i18n';

interface ContinuousDevelopmentProps {
  locale: string;
}

export default async function ContinuousDevelopment({ locale }: ContinuousDevelopmentProps) {
  const t = await getTranslations(locale);

  const features = [
    {
      title: t['cybersecurity.continuousDevelopment.regularUpdates.title'],
      description: t['cybersecurity.continuousDevelopment.regularUpdates.description'],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: t['cybersecurity.continuousDevelopment.externalAudits.title'],
      description: t['cybersecurity.continuousDevelopment.externalAudits.description'],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: t['cybersecurity.continuousDevelopment.staffTraining.title'],
      description: t['cybersecurity.continuousDevelopment.staffTraining.description'],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: t['cybersecurity.continuousDevelopment.threatMonitoring.title'],
      description: t['cybersecurity.continuousDevelopment.threatMonitoring.description'],
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-forest/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h4 className="text-lg font-playfair font-bold text-forest mb-2">
                {feature.title}
              </h4>
              <p className="text-mediumGray font-sans leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-forest/5 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-playfair font-bold text-forest mb-4">
            {t['cybersecurity.continuousDevelopment.commitment.title']}
          </h3>
          <p className="text-mediumGray font-sans leading-relaxed max-w-4xl mx-auto">
            {t['cybersecurity.continuousDevelopment.commitment.description']}
          </p>
        </div>
      </div>
    </section>
  );
}
