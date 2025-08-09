import { getTranslations } from '../../lib/i18n';

interface SecurityNoticeProps {
  locale: string;
}

export default function SecurityNotice({ locale }: SecurityNoticeProps) {
  const t = getTranslations(locale);

  const securityFeatures = [
    {
      title: t['contact.security.encryption'],
      icon: '🔐'
    },
    {
      title: t['contact.security.privacy'],
      icon: '🛡️'
    },
    {
      title: t['contact.security.confidential'],
      icon: '🔒'
    }
  ];

  return (
    <div className="bg-soft-rose p-8 rounded-lg">
      <div className="text-center mb-8">
        <h2 className="heading-3 mb-4 text-forest-green">
          {t['contact.security.title']}
        </h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl mb-3" aria-hidden="true">
              {feature.icon}
            </div>
            <p className="body-text text-forest-green font-medium">
              {feature.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
