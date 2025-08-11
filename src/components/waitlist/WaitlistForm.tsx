"use client";

import { useEffect, useState } from "react";

export default function WaitlistForm() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    // Check if HubSpot is already loaded
    if (window.hbspt && window.hbspt.forms) {
      console.log('HubSpot already available, creating form');
      createForm();
      return;
    }

    // Check if script is already being loaded
    if (document.querySelector('script[src*="js-eu1.hsforms.net"]')) {
      console.log('HubSpot script already loading, waiting...');
      // Wait for existing script to load
      const checkInterval = setInterval(() => {
        if (window.hbspt && window.hbspt.forms) {
          clearInterval(checkInterval);
          console.log('HubSpot script loaded by another instance, creating form');
          createForm();
        }
      }, 100);
      
      // Set a timeout to prevent infinite waiting
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!window.hbspt || !window.hbspt.forms) {
          console.log('Timeout waiting for existing script, using fallback');
          fallbackToIframe();
        }
      }, 10000);
      
      return;
    }

    // Set a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (loading) {
        console.log('Form loading timeout, using fallback');
        fallbackToIframe();
      }
    }, 10000); // 10 seconds timeout

    // Load HubSpot script
    const script = document.createElement('script');
    script.src = 'https://js-eu1.hsforms.net/forms/embed/146205702.js';
    script.defer = true;
    
    script.onload = () => {
      console.log('HubSpot script loaded successfully');
      // Wait longer for the script to fully initialize
      setTimeout(() => {
        if (window.hbspt && window.hbspt.forms) {
          console.log('HubSpot initialized, creating form');
          createForm();
        } else {
          console.log('HubSpot not properly initialized, using fallback');
          fallbackToIframe();
        }
      }, 500);
    };

    script.onerror = () => {
      console.error('Failed to load HubSpot script');
      console.log('Using iframe fallback due to script error');
      fallbackToIframe();
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      clearTimeout(timeout);
      // Don't remove script on unmount as it might be used by other components
    };
  }, [loading]);

  const createForm = () => {
    if (!isMounted) return;
    
    try {
      if (window.hbspt && window.hbspt.forms && typeof window.hbspt.forms.create === 'function') {
        console.log('Creating HubSpot form...');
        window.hbspt.forms.create({
          region: 'eu1',
          portalId: '146205702',
          formId: 'f337eade-e814-4038-b2aa-908dcf612cce',
          target: '#hubspot-form-container'
        });
        setLoading(false);
      } else {
        console.error('HubSpot not available or forms.create not a function');
        console.log('HubSpot object:', window.hbspt);
        if (window.hbspt) {
          console.log('HubSpot forms object:', window.hbspt.forms);
        }
        // Fallback to iframe approach
        fallbackToIframe();
      }
    } catch (error) {
      console.error('Error creating form:', error);
      // Fallback to iframe approach
      fallbackToIframe();
    }
  };

  const fallbackToIframe = () => {
    console.log('Using iframe fallback for HubSpot form');
    try {
      const container = document.getElementById('hubspot-form-container');
      if (container) {
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
