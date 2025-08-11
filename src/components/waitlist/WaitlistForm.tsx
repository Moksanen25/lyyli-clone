"use client";

import { useEffect, useState } from "react";

export default function WaitlistForm() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    console.log('WaitlistForm useEffect running, checking HubSpot availability...');
    
    // Simple approach: try to create form immediately if HubSpot is available
    if (window.hbspt && window.hbspt.forms) {
      console.log('HubSpot already available, creating form');
      createForm();
      return;
    }

    // Load HubSpot script with simpler logic
    console.log('Loading HubSpot script...');
    const script = document.createElement('script');
    script.src = 'https://js-eu1.hsforms.net/forms/embed/146205702.js';
    script.async = true;
    
    script.onload = () => {
      console.log('HubSpot script loaded successfully');
      // Try to create form after a short delay
      setTimeout(() => {
        createForm();
      }, 1000);
    };

    script.onerror = () => {
      console.error('Failed to load HubSpot script');
      fallbackToIframe();
    };

    document.head.appendChild(script);

    // Fallback timeout
    const timeout = setTimeout(() => {
      console.log('Form loading timeout, using fallback');
      fallbackToIframe();
    }, 15000); // 15 seconds timeout

    return () => {
      clearTimeout(timeout);
    };
  }, [isMounted]);

  const createForm = () => {
    if (!isMounted) return;
    
    console.log('createForm called, checking HubSpot availability...');
    console.log('window.hbspt:', window.hbspt);
    console.log('window.hbspt?.forms:', window.hbspt?.forms);
    
    try {
      if (window.hbspt && window.hbspt.forms && typeof window.hbspt.forms.create === 'function') {
        console.log('Creating HubSpot form...');
        window.hbspt.forms.create({
          region: 'eu1',
          portalId: '146205702',
          formId: 'f337eade-e814-4038-b2aa-908dcf612cce',
          target: '#hubspot-form-container'
        });
        console.log('HubSpot form creation initiated');
        setLoading(false);
      } else {
        console.log('HubSpot not ready, waiting a bit more...');
        // Try again after a short delay if we haven't exceeded retry limit
        if (retryCount < 3) {
          setTimeout(() => {
            if (window.hbspt && window.hbspt.forms && typeof window.hbspt.forms.create === 'function') {
              console.log('HubSpot now ready, creating form...');
              window.hbspt.forms.create({
                region: 'eu1',
                portalId: '146205702',
                formId: 'f337eade-e814-4038-b2aa-908dcf612cce',
                target: '#hubspot-form-container'
              });
              setLoading(false);
            } else {
              console.log('HubSpot still not ready, using fallback');
              fallbackToIframe();
            }
          }, 2000);
        } else {
          console.log('Max retries reached, using fallback');
          fallbackToIframe();
        }
      }
    } catch (error) {
      console.error('Error creating form:', error);
      fallbackToIframe();
    }
  };

  const fallbackToIframe = () => {
    console.log('Using iframe fallback for HubSpot form');
    try {
      const container = document.getElementById('hubspot-form-container');
      if (container) {
        console.log('Container found, injecting iframe...');
        container.innerHTML = `
          <iframe 
            src="https://forms.hsforms.com/146205702/f337eade-e814-4038-b2aa-908dcf612cce?region=eu1" 
            width="100%" 
            height="600" 
            frameborder="0" 
            style="border: none;"
            title="Join Waitlist Form"
          ></iframe>
        `;
        console.log('Iframe injected successfully');
        setLoading(false);
      } else {
        console.error('HubSpot form container not found');
        setError('Form container not found');
      }
    } catch (error) {
      console.error('Error in fallback to iframe:', error);
      setError('Failed to load form fallback');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div id="hubspot-form-container" className="min-h-[400px]">
        {loading && !error && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-mediumGray">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest mx-auto mb-4"></div>
              <p>Loading form...</p>
              <button 
                onClick={() => {
                  console.log('Manual test button clicked');
                  console.log('Current state:', { loading, error, isMounted, retryCount });
                  console.log('HubSpot available:', !!window.hbspt);
                  if (window.hbspt) {
                    console.log('HubSpot forms available:', !!window.hbspt.forms);
                    console.log('HubSpot forms.create available:', typeof window.hbspt.forms?.create);
                  }
                  setRetryCount(prev => prev + 1);
                  createForm();
                }}
                className="mt-4 bg-forest text-white px-4 py-2 rounded-lg hover:bg-forest/90 transition-colors text-sm"
              >
                Test Form Loading ({retryCount} attempts)
              </button>
              <button 
                onClick={() => {
                  console.log('Force fallback button clicked');
                  fallbackToIframe();
                }}
                className="mt-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm"
              >
                Force Iframe Fallback
              </button>
            </div>
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-rose">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-lg font-medium mb-2">Form Error</p>
              <p className="text-sm mb-4">{error}</p>
              <button 
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  setRetryCount(0);
                  // Retry loading
                  setTimeout(() => {
                    if (isMounted) {
                      createForm();
                    }
                  }, 1000);
                }} 
                className="bg-forest text-white px-4 py-2 rounded-lg hover:bg-forest/90 transition-colors mr-2"
              >
                Retry
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-rose text-white px-4 py-2 rounded-lg hover:bg-rose/90 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
