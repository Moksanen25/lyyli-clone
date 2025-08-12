import { getTranslations } from '@/lib/i18n';

interface GDPRComplianceProps {
  locale: string;
}

export default async function GDPRCompliance({ locale }: GDPRComplianceProps) {
  const t = await getTranslations(locale);

  const gdprFeatures = [
    {
      title: t['cybersecurity.gdprCompliance.dataMinimization.title'],
      description: t['cybersecurity.gdprCompliance.dataMinimization.description'],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: t['cybersecurity.gdprCompliance.purposeLimitation.title'],
      description: t['cybersecurity.gdprCompliance.purposeLimitation.description'],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: t['cybersecurity.gdprCompliance.rightToDeletion.title'],
      description: t['cybersecurity.gdprCompliance.rightToDeletion.description'],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
    },
    {
      title: t['cybersecurity.gdprCompliance.dataPortability.title'],
      description: t['cybersecurity.gdprCompliance.dataPortability.description'],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      ),
    },
  ];

  const benefits = [
    t['cybersecurity.gdprCompliance.benefits.quickResponse'],
    t['cybersecurity.gdprCompliance.benefits.expertSupport'],
    t['cybersecurity.gdprCompliance.benefits.fullTransparency'],
  ];

  return (
    <section className="py-16 lg:py-24 bg-rose">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-6 text-forest font-playfair font-bold leading-snug">
            {t['cybersecurity.gdprCompliance.title']}
          </h2>
          <p className="text-xl text-mediumGray font-sans max-w-3xl mx-auto leading-relaxed">
            {t['cybersecurity.gdprCompliance.subtitle']}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-8">
            {gdprFeatures.map((feature, index) => (
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
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h4 className="text-xl font-playfair font-bold text-forest mb-6">
              {t['cybersecurity.gdprCompliance.dedicatedDPO.title']}
            </h4>
            <p className="text-mediumGray font-sans leading-relaxed mb-6">
              {t['cybersecurity.gdprCompliance.dedicatedDPO.description']}
            </p>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-forest rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-mediumGray font-sans">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
