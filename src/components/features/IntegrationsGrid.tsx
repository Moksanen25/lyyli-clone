'use client';

import type { TranslationKeys } from '@/lib/i18n';
import { IconSet } from '../IconSet';

interface Props {
  translations?: TranslationKeys;
}

export default function IntegrationsGrid({ translations: t }: Props) {
  const integrations = [
    {
      key: 'slack',
      name: 'Slack',
      icon: <IconSet.Slack size={32} />,
      status: 'available' as const,
    },
    {
      key: 'teams',
      name: 'Teams',
      icon: <IconSet.MicrosoftTeams size={32} />,
      status: 'available' as const,
    },
    {
      key: 'gmail',
      name: 'Gmail',
      icon: <IconSet.Gmail size={32} />,
      status: 'available' as const,
    },
    {
      key: 'outlook',
      name: 'Outlook',
      icon: <IconSet.Outlook size={32} />,
      status: 'available' as const,
    },
    {
      key: 'linkedin',
      name: 'LinkedIn',
      icon: <IconSet.LinkedIn size={32} />,
      status: 'available' as const,
    },
    {
      key: 'threads',
      name: 'Threads',
      icon: <IconSet.Threads size={32} />,
      status: 'available' as const,
    },
    {
      key: 'facebook',
      name: 'Facebook',
      icon: <IconSet.Facebook size={32} />,
      status: 'available' as const,
    },
    {
      key: 'instagram',
      name: 'Instagram',
      icon: <IconSet.Instagram size={32} />,
      status: 'available' as const,
    },
    {
      key: 'x',
      name: 'X (Twitter)',
      icon: <IconSet.XTwitter size={32} />,
      status: 'soon' as const,
    },
    {
      key: 'sharepoint',
      name: 'SharePoint',
      icon: <IconSet.SharePoint size={32} />,
      status: 'soon' as const,
    },
    {
      key: 'crms',
      name: t?.['integrations.crms.title'] || "Most common CRM's",
      icon: (
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <rect x="4" y="4" width="16" height="16" rx="4" fill="#2F5D50" />
          <path d="M8 12h8M8 15h5M8 9h6" stroke="white" strokeWidth="1.5" />
        </svg>
      ),
      status: 'soon' as const,
    },
    {
      key: 'emailapps',
      name:
        t?.['integrations.emailApps.title'] ||
        'Newsletter & marketing email apps',
      icon: (
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 7h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
            stroke="#A7D6D1"
            strokeWidth="1.5"
          />
          <path d="M3 7l9 6 9-6" stroke="#2F5D50" strokeWidth="1.5" />
        </svg>
      ),
      status: 'soon' as const,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {integrations.map(item => {
          const isAvailable = item.status === 'available';
          const badgeClass = isAvailable
            ? 'border-forest text-forest'
            : 'border-turquoise text-turquoise';
          const badgeLabel = isAvailable
            ? t?.['integrations.status.available'] || 'Available'
            : t?.['common.comingSoon'] || 'Coming soon';
          return (
            <div
              key={item.key}
              className="rounded-2xl bg-grayLight border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/30"
              role="group"
              aria-label={`${item.name} - ${badgeLabel}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <div className="text-forest font-playfair font-bold text-lg">
                  {item.name}
                </div>
                <div
                  className={`mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeClass}`}
                >
                  {badgeLabel}
                </div>
                <span className="sr-only">
                  {isAvailable
                    ? t?.['integrations.status.available.sr'] ||
                      'Integration available'
                    : t?.['integrations.status.comingSoon.sr'] ||
                      'Integration coming soon'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
