import { getTranslations } from '@/lib/i18n';

interface TechnicalArchitectureProps {
  locale: string;
}

export default async function TechnicalArchitecture({ locale }: TechnicalArchitectureProps) {
  const t = await getTranslations(locale);

  const technicalFeatures = [
    {
      title: t['cybersecurity.technicalArchitecture.encryption.aes256.title'],
      description: t['cybersecurity.technicalArchitecture.encryption.aes256.description'],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: t['cybersecurity.technicalArchitecture.encryption.secureTransmission.title'],
      description: t['cybersecurity.technicalArchitecture.encryption.secureTransmission.description'],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: t['cybersecurity.technicalArchitecture.encryption.euCloudServices.title'],
      description: t['cybersecurity.technicalArchitecture.encryption.euCloudServices.description'],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
    },
    {
      title: t['cybersecurity.technicalArchitecture.encryption.infrastructureStandards.title'],
      description: t['cybersecurity.technicalArchitecture.encryption.infrastructureStandards.description'],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-6 text-forest font-playfair font-bold leading-snug">
            {t['cybersecurity.technicalArchitecture.title']}
          </h2>
          <p className="text-xl text-mediumGray font-sans max-w-3xl mx-auto leading-relaxed">
            {t['cybersecurity.technicalArchitecture.subtitle']}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-playfair font-bold text-forest mb-6">
              {t['cybersecurity.technicalArchitecture.encryption.title']}
            </h3>
            <div className="space-y-6">
              {technicalFeatures.map((feature, index) => (
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
          </div>
          
          <div className="bg-forest/5 p-8 rounded-lg border border-forest/20">
            <h4 className="text-xl font-playfair font-bold text-forest mb-4">
              {t['cybersecurity.technicalArchitecture.encryption.dataIsolation.title']}
            </h4>
            <p className="text-mediumGray font-sans leading-relaxed">
              {t['cybersecurity.technicalArchitecture.encryption.dataIsolation.description']}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
