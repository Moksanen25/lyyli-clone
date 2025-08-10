import { TranslationKeys } from '../../lib/i18n';

interface FeaturesCardLayoutProps {
  locale: string;
  translations: TranslationKeys;
}

export default function FeaturesCardLayout({ locale, translations: t }: FeaturesCardLayoutProps) {

  const features = [
    // Automatic Content Creation
    {
      category: 'automatic',
      icon: '🤖',
      title: t['features.automatic.slack.title'],
      description: t['features.automatic.slack.description'],
      color: 'bg-blue-50 border-blue-200'
    },
    {
      category: 'automatic',
      icon: '💬',
      title: t['features.automatic.teams.title'],
      description: t['features.automatic.teams.description'],
      color: 'bg-blue-50 border-blue-200'
    },
    {
      category: 'automatic',
      icon: '📧',
      title: t['features.automatic.email.title'],
      description: t['features.automatic.email.description'],
      color: 'bg-blue-50 border-blue-200'
    },
    
    // Governance & Compliance
    {
      category: 'governance',
      icon: '📋',
      title: t['features.governance.audit.title'],
      description: t['features.governance.audit.description'],
      color: 'bg-green-50 border-green-200'
    },
    {
      category: 'governance',
      icon: '🔄',
      title: t['features.governance.version.title'],
      description: t['features.governance.version.description'],
      color: 'bg-green-50 border-green-200'
    },
    {
      category: 'governance',
      icon: '👥',
      title: t['features.governance.access.title'],
      description: t['features.governance.access.description'],
      color: 'bg-green-50 border-green-200'
    },
    
    // Enterprise Security
    {
      category: 'security',
      icon: '🔐',
      title: t['features.security.encryption.title'],
      description: t['features.security.encryption.description'],
      color: 'bg-red-50 border-red-200'
    },
    {
      category: 'security',
      icon: '🏆',
      title: t['features.security.iso.title'],
      description: t['features.security.iso.description'],
      color: 'bg-red-50 border-red-200'
    },
    {
      category: 'security',
      icon: '🛡️',
      title: t['features.security.gdpr.title'],
      description: t['features.security.gdpr.description'],
      color: 'bg-red-50 border-red-200'
    },
    
    // Multilingual Support
    {
      category: 'multilingual',
      icon: '🌍',
      title: t['features.multilingual.translation.title'],
      description: t['features.multilingual.translation.description'],
      color: 'bg-purple-50 border-purple-200'
    },
    {
      category: 'multilingual',
      icon: '🌐',
      title: t['features.multilingual.locales.title'],
      description: t['features.multilingual.locales.description'],
      color: 'bg-purple-50 border-purple-200'
    },
    {
      category: 'multilingual',
      icon: '🎭',
      title: t['features.multilingual.cultural.title'],
      description: t['features.multilingual.cultural.description'],
      color: 'bg-purple-50 border-purple-200'
    },
    
    // System Integrations
    {
      category: 'integrations',
      icon: '💬',
      title: t['features.integrations.slack.title'],
      description: t['features.integrations.slack.description'],
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      category: 'integrations',
      icon: '🏢',
      title: t['features.integrations.teams.title'],
      description: t['features.integrations.teams.description'],
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      category: 'integrations',
      icon: '📨',
      title: t['features.integrations.email.title'],
      description: t['features.integrations.email.description'],
      color: 'bg-yellow-50 border-yellow-200'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Automatic Content Creation */}
      <div>
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4 text-forest-green">
            {t['features.automatic.title']}
          </h2>
          <p className="body-large text-medium-gray max-w-3xl mx-auto">
            {t['features.automatic.description']}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.filter(f => f.category === 'automatic').map((feature, index) => (
            <article key={index} className={`p-6 rounded-lg border-2 ${feature.color} hover:shadow-soft transition-shadow`}>
              <div className="text-4xl mb-4" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="heading-4 mb-3 text-forest-green">
                {feature.title}
              </h3>
              <p className="body-text">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Governance & Compliance */}
      <div>
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4 text-forest-green">
            {t['features.governance.title']}
          </h2>
          <p className="body-large text-medium-gray max-w-3xl mx-auto">
            {t['features.governance.description']}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.filter(f => f.category === 'governance').map((feature, index) => (
            <article key={index} className={`p-6 rounded-lg border-2 ${feature.color} hover:shadow-soft transition-shadow`}>
              <div className="text-4xl mb-4" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="heading-4 mb-3 text-forest-green">
                {feature.title}
              </h3>
              <p className="body-text">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Enterprise Security */}
      <div>
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4 text-forest-green">
            {t['features.security.title']}
          </h2>
          <p className="body-large text-medium-gray max-w-3xl mx-auto">
            {t['features.security.description']}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.filter(f => f.category === 'security').map((feature, index) => (
            <article key={index} className={`p-6 rounded-lg border-2 ${feature.color} hover:shadow-soft transition-shadow`}>
              <div className="text-4xl mb-4" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="heading-4 mb-3 text-forest-green">
                {feature.title}
              </h3>
              <p className="body-text">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Multilingual Support */}
      <div>
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4 text-forest-green">
            {t['features.multilingual.title']}
          </h2>
          <p className="body-large text-medium-gray max-w-3xl mx-auto">
            {t['features.multilingual.description']}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.filter(f => f.category === 'multilingual').map((feature, index) => (
            <article key={index} className={`p-6 rounded-lg border-2 ${feature.color} hover:shadow-soft transition-shadow`}>
              <div className="text-4xl mb-4" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="heading-4 mb-3 text-forest-green">
                {feature.title}
              </h3>
              <p className="body-text">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* System Integrations */}
      <div>
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4 text-forest-green">
            {t['features.integrations.title']}
          </h2>
          <p className="body-large text-medium-gray max-w-3xl mx-auto">
            {t['features.integrations.description']}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.filter(f => f.category === 'integrations').map((feature, index) => (
            <article key={index} className={`p-6 rounded-lg border-2 ${feature.color} hover:shadow-soft transition-shadow`}>
              <div className="text-4xl mb-4" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="heading-4 mb-3 text-forest-green">
                {feature.title}
              </h3>
              <p className="body-text">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
