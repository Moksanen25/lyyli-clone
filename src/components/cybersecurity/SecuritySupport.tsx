import { getTranslations } from '@/lib/i18n';

interface SecuritySupportProps {
  locale: string;
}

export default async function SecuritySupport({ locale }: SecuritySupportProps) {
  const t = await getTranslations(locale);

  const supportChannels = [
    {
      title: t['cybersecurity.support.channels.email.title'],
      description: t['cybersecurity.support.channels.email.description'],
      address: t['cybersecurity.support.channels.email.address'],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: t['cybersecurity.support.channels.chat.title'],
      description: t['cybersecurity.support.channels.chat.description'],
      button: t['cybersecurity.support.channels.chat.button'],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      title: t['cybersecurity.support.channels.phone.title'],
      description: t['cybersecurity.support.channels.phone.description'],
      button: t['cybersecurity.support.channels.phone.button'],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-grayLight">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-6 text-forest font-playfair font-bold leading-snug">
            {t['cybersecurity.support.title']}
          </h2>
          <p className="text-xl text-mediumGray font-sans max-w-3xl mx-auto leading-relaxed">
            {t['cybersecurity.support.subtitle']}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {supportChannels.map((channel, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-forest/10 text-center">
              <div className="w-16 h-16 bg-forest/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                {channel.icon}
              </div>
              <h3 className="text-xl font-playfair font-bold text-forest mb-4">
                {channel.title}
              </h3>
              <p className="text-mediumGray font-sans mb-6 leading-relaxed">
                {channel.description}
              </p>
              {channel.address ? (
                <a
                  href={`mailto:${channel.address}`}
                  className="inline-flex items-center justify-center px-6 py-3 bg-forest text-white font-bold rounded-lg hover:bg-forest/90 transition-colors duration-200"
                >
                  {channel.address}
                </a>
              ) : (
                <button className="inline-flex items-center justify-center px-6 py-3 bg-forest text-white font-bold rounded-lg hover:bg-forest/90 transition-colors duration-200">
                  {channel.button}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg border border-forest/10 text-center max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-2xl font-playfair font-bold text-forest mb-4">
            {t['cybersecurity.support.dpo.title']}
          </h3>
          <p className="text-mediumGray font-sans mb-8 leading-relaxed max-w-2xl mx-auto">
            {t['cybersecurity.support.dpo.description']}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center px-8 py-4 bg-turquoise text-white font-bold rounded-lg hover:bg-turquoise/90 transition-colors duration-200"
          >
            {t['cybersecurity.support.dpo.button']}
          </a>
        </div>
      </div>
    </section>
  );
}
