'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { loadExternalScriptOnce } from '@/lib/loadExternalScript';

interface HubSpotForm {
  // Add HubSpot form instance methods if needed
  [key: string]: unknown;
}

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (opts: {
          region?: 'eu1'|'na1';
          portalId: string;
          formId: string;
          target: string;
          onFormReady?: (form: HubSpotForm) => void;
        }) => void;
      };
    };
  }
}

type Props = {
  portalId: string; // "146205702"
  formId: string;   // esim. "9e949964-e881-41e4-b75b-812e7aafb4d3"
  region?: 'eu1'|'na1';
  className?: string;
};

export default function HubSpotForm({ portalId, formId, region='eu1', className }: Props) {
  const targetId = useId().replace(/:/g,''); // Next.js Id -> kelvollinen CSS id
  const initialised = useRef(false);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    if (initialised.current) return;

    if (!portalId || !formId) {
      initialised.current = true;
      setError('Puuttuva HubSpot portalId tai formId.');
      return;
    }

    initialised.current = true;

    const src = region === 'eu1'
      ? 'https://js-eu1.hsforms.net/forms/embed/v2.js'
      : 'https://js.hsforms.net/forms/embed/v2.js';

    loadExternalScriptOnce(src)
      .then(() => {
        if (!window.hbspt?.forms?.create) {
          setError('HubSpotin lomakeskripti ei alustunut.');
          return;
        }
        window.hbspt.forms.create({
          region,
          portalId,
          formId,
          target: `#${targetId}`,
          onFormReady: () => {
            // mahdolliset lisämuokkaukset
          }
        });
      })
      .catch((e) => setError(e.message));
  }, [portalId, formId, region, targetId]);

  return (
    <div className={className}>
      <div id={targetId} />
      {!error ? null : (
        <p className="mt-2 text-sm text-red-600">
          {error} – tarkista CSP ja trusted domain -asetukset HubSpotissa.
        </p>
      )}
    </div>
  );
}


