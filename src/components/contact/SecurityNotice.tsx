import { TranslationKeys } from "@/lib/i18n";

interface SecurityNoticeProps {
  locale: string;
  translations: TranslationKeys;
}

export default function SecurityNotice({
  locale,
  translations: t,
}: SecurityNoticeProps) {
  const securityFeatures = [
    {
      title: t["contact.security.encryption"],
      icon: (
        <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: t["contact.security.privacy"],
      icon: (
        <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: t["contact.security.confidential"],
      icon: (
        <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-rose/10 p-8 rounded-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl mb-4 text-forest font-playfair font-bold leading-snug">
          {t["contact.security.title"]}
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl mb-3" aria-hidden="true">
              {feature.icon}
            </div>
            <p className="text-base text-forest font-medium font-sans leading-relaxed">
              {feature.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
