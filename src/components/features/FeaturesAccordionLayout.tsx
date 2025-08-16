"use client";

import { TranslationKeys } from "../../lib/i18n";

interface FeaturesAccordionLayoutProps {
  locale: string;
  translations: TranslationKeys;
}

export default function FeaturesAccordionLayout({
  locale,
  translations: t,
}: FeaturesAccordionLayoutProps) {
  const features = [
    // Automatic Content Creation
    {
      category: "automatic",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.194 14.644c0 1.293.857 2.43 2.164 2.43 1.301 0 2.168-1.137 2.168-2.43 0-1.293-.867-2.43-2.168-2.43-1.307 0-2.164 1.137-2.164 2.43zm2.164-9.644c-1.307 0-2.164 1.142-2.164 2.43 0 1.293.857 2.43 2.164 2.43 1.301 0 2.168-1.137 2.168-2.43 0-1.288-.867-2.43-2.168-2.43zm5.636 0c-1.307 0-2.164 1.142-2.164 2.43 0 1.293.857 2.43 2.164 2.43 1.301 0 2.168-1.137 2.168-2.43 0-1.288-.867-2.43-2.168-2.43zm2.164 9.644c0-1.288-.867-2.43-2.168-2.43-1.307 0-2.164 1.142-2.164 2.43 0 1.293.857 2.43 2.164 2.43 1.301 0 2.168-1.137 2.168-2.43z"/>
        </svg>
      ),
      title: t["features.automatic.slack.title"],
      description: t["features.automatic.slack.description"],
    },
    {
      category: "automatic",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: t["features.automatic.teams.title"],
      description: t["features.automatic.teams.description"],
    },
    {
      category: "automatic",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: t["features.automatic.email.title"],
      description: t["features.automatic.email.description"],
    },

    // Governance & Compliance
    {
      category: "governance",
      icon: (
        <svg className="w-6 h-6 text-green-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: t["features.governance.audit.title"],
      description: t["features.governance.audit.description"],
    },
    {
      category: "governance",
      icon: (
        <svg className="w-6 h-6 text-green-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: t["features.governance.version.title"],
      description: t["features.governance.version.description"],
    },
    {
      category: "governance",
      icon: (
        <svg className="w-6 h-6 text-green-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: t["features.governance.access.title"],
      description: t["features.governance.access.description"],
    },

    // Enterprise Security
    {
      category: "security",
      icon: (
        <svg className="w-6 h-6 text-red-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: t["features.security.encryption.title"],
      description: t["features.security.encryption.description"],
    },
    {
      category: "security",
      icon: (
        <svg className="w-6 h-6 text-red-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: t["features.security.iso.title"],
      description: t["features.security.iso.description"],
    },
    {
      category: "security",
      icon: (
        <svg className="w-6 h-6 text-red-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: t["features.security.gdpr.title"],
      description: t["features.security.gdpr.description"],
    },

    // Multilingual Support
    {
      category: "multilingual",
      icon: (
        <svg className="w-6 h-6 text-purple-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      title: t["features.multilingual.translation.title"],
      description: t["features.multilingual.translation.description"],
    },
    {
      category: "multilingual",
      icon: (
        <svg className="w-6 h-6 text-purple-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: t["features.multilingual.locales.title"],
      description: t["features.multilingual.locales.description"],
    },
    {
      category: "multilingual",
      icon: (
        <svg className="w-6 h-6 text-purple-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t["features.multilingual.cultural.title"],
      description: t["features.multilingual.cultural.description"],
    },

    // System Integrations
    {
      category: "integrations",
      icon: (
        <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.194 14.644c0 1.293.857 2.43 2.164 2.43 1.301 0 2.168-1.137 2.168-2.43 0-1.293-.867-2.43-2.168-2.43-1.307 0-2.164 1.137-2.164 2.43zm2.164-9.644c-1.307 0-2.164 1.142-2.164 2.43 0 1.293.857 2.43 2.164 2.43 1.301 0 2.168-1.137 2.168-2.43 0-1.288-.867-2.43-2.168-2.43zm5.636 0c-1.307 0-2.164 1.142-2.164 2.43 0 1.293.857 2.43 2.164 2.43 1.301 0 2.168-1.137 2.168-2.43 0-1.288-.867-2.43-2.168-2.43zm2.164 9.644c0-1.288-.867-2.43-2.168-2.43-1.307 0-2.164 1.142-2.164 2.43 0 1.293.857 2.43 2.164 2.43 1.301 0 2.168-1.137 2.168-2.43z"/>
        </svg>
      ),
      title: t["features.integrations.slack.title"],
      description: t["features.integrations.slack.description"],
    },
    {
      category: "integrations",
      icon: (
        <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: t["features.integrations.teams.title"],
      description: t["features.integrations.teams.description"],
    },
    {
      category: "integrations",
      icon: (
        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: t["features.integrations.email.title"],
      description: t["features.integrations.email.description"],
    },
  ];

  return (
    <div className="space-y-8">
      {features.map((feature, index) => (
        <div key={index} className="border border-grayLight rounded-lg">
          <button
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-grayLight/30 transition-colors"
            aria-expanded="false"
            aria-controls={`accordion-${index}`}
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-playfair font-bold text-forest">
                  {feature.title}
                </h3>
                <p className="text-sm text-mediumGray mt-1">
                  {feature.description}
                </p>
              </div>
            </div>
            <svg
              className="w-5 h-5 text-forest transform transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            id={`accordion-${index}`}
            className="px-6 pb-4 hidden"
            aria-labelledby={`accordion-button-${index}`}
          >
            <p className="text-mediumGray text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
