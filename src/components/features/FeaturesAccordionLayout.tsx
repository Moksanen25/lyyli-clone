'use client';

import { useState } from 'react';
import { getTranslations } from '../../lib/i18n';

interface FeaturesAccordionLayoutProps {
  locale: string;
}

export default function FeaturesAccordionLayout({ locale }: FeaturesAccordionLayoutProps) {
  const t = getTranslations(locale);
  const [openSection, setOpenSection] = useState<string>('efficiency');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const sections = [
    {
      id: 'efficiency',
      title: t['features.categories.efficiency'],
      features: [
        {
          icon: '🤖',
          title: t['features.automatic.slack.title'],
          description: t['features.automatic.slack.description']
        },
        {
          icon: '💬',
          title: t['features.automatic.teams.title'],
          description: t['features.automatic.teams.description']
        },
        {
          icon: '📧',
          title: t['features.automatic.email.title'],
          description: t['features.automatic.email.description']
        }
      ]
    },
    {
      id: 'governance',
      title: t['features.categories.governance'],
      features: [
        {
          icon: '📋',
          title: t['features.governance.audit.title'],
          description: t['features.governance.audit.description']
        },
        {
          icon: '🔄',
          title: t['features.governance.version.title'],
          description: t['features.governance.version.description']
        },
        {
          icon: '👥',
          title: t['features.governance.access.title'],
          description: t['features.governance.access.description']
        },
        {
          icon: '🔐',
          title: t['features.security.encryption.title'],
          description: t['features.security.encryption.description']
        },
        {
          icon: '🏆',
          title: t['features.security.iso.title'],
          description: t['features.security.iso.description']
        },
        {
          icon: '🛡️',
          title: t['features.security.gdpr.title'],
          description: t['features.security.gdpr.description']
        }
      ]
    },
    {
      id: 'collaboration',
      title: t['features.categories.collaboration'],
      features: [
        {
          icon: '🌍',
          title: t['features.multilingual.translation.title'],
          description: t['features.multilingual.translation.description']
        },
        {
          icon: '🌐',
          title: t['features.multilingual.locales.title'],
          description: t['features.multilingual.locales.description']
        },
        {
          icon: '🎭',
          title: t['features.multilingual.cultural.title'],
          description: t['features.multilingual.cultural.description']
        },
        {
          icon: '💬',
          title: t['features.integrations.slack.title'],
          description: t['features.integrations.slack.description']
        },
        {
          icon: '🏢',
          title: t['features.integrations.teams.title'],
          description: t['features.integrations.teams.description']
        },
        {
          icon: '📨',
          title: t['features.integrations.email.title'],
          description: t['features.integrations.email.description']
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {sections.map((section) => (
        <div key={section.id} className="bg-white border border-light-gray rounded-lg shadow-soft">
          <button
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-soft-rose transition-colors"
            onClick={() => toggleSection(section.id)}
            aria-expanded={openSection === section.id}
            aria-controls={`section-${section.id}`}
          >
            <h2 className="heading-3 text-forest-green">
              {section.title}
            </h2>
            <svg
              className={`w-5 h-5 text-forest-green transition-transform ${
                openSection === section.id ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div
            id={`section-${section.id}`}
            className={`overflow-hidden transition-all duration-300 ${
              openSection === section.id ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            <div className="px-6 pb-6 space-y-6">
              {section.features.map((feature, index) => (
                <article key={index} className="flex gap-4 p-4 bg-light-gray rounded-lg">
                  <div className="text-3xl flex-shrink-0" aria-hidden="true">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="heading-4 mb-2 text-forest-green">
                      {feature.title}
                    </h3>
                    <p className="body-text">
                      {feature.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
