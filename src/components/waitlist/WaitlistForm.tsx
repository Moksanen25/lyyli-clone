"use client";

import { useEffect } from "react";

export default function WaitlistForm() {
  useEffect(() => {
    // Load HubSpot script
    const script = document.createElement('script');
    script.src = 'https://js-eu1.hsforms.net/forms/embed/146205702.js';
    script.defer = true;
    script.onload = () => {
      // Initialize the form after script loads
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: 'eu1',
          portalId: '146205702',
          formId: 'f337eade-e814-4038-b2aa-908dcf612cce',
          target: '#hubspot-form-container'
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div id="hubspot-form-container" className="min-h-[400px] flex items-center justify-center">
        <div className="text-center text-mediumGray">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest mx-auto mb-4"></div>
          <p>Loading form...</p>
        </div>
      </div>
    </div>
  );
}
