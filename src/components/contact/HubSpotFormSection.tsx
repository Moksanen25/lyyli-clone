'use client';

import HubSpotForm from '@/components/HubSpotForm';

interface Props {
  locale: string;
}

export default function HubSpotFormSection({ locale }: Props) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl md:text-3xl mb-6 text-forest font-playfair font-bold leading-tight">
        {locale === 'fi' ? 'Yhteydenottolomake (HubSpot)' : 'Contact form (HubSpot)'}
      </h2>
      <HubSpotForm
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        portalId={process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || ''}
        formId={process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID || ''}
        region={(process.env.NEXT_PUBLIC_HUBSPOT_REGION as 'eu1'|'na1') || 'eu1'}
      />
    </div>
  );
}


