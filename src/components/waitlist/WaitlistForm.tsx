"use client";

import { useCallback, useEffect, useRef } from "react";
import Script from "next/script";
import dynamic from "next/dynamic";

const CalendarPopup = dynamic(() => import("@/components/CalendarPopup"), {
  ssr: false,
});

const HUBSPOT_SCRIPT_SRC = "https://js-eu1.hsforms.net/forms/embed/146205702.js";
const HUBSPOT_PORTAL_ID = "146205702";
const HUBSPOT_FORM_ID = "f337eade-e814-4038-b2aa-908dcf612cce";
const HUBSPOT_REGION = "eu1";
const HUBSPOT_TARGET_ID = "hubspot-waitlist-form";

interface WaitlistFormProps {
  translations?: {
    "cta.demo": string;
  };
}

export default function WaitlistForm({ translations }: WaitlistFormProps = {}) {
  const formContainerRef = useRef<HTMLDivElement | null>(null);

  const initializeHubSpotForm = useCallback(() => {
    const container = formContainerRef.current;
    const hubspot = (window as any)?.hbspt;

    if (!container || !hubspot?.forms?.create) {
      return;
    }

    // HubSpot re-renders into the provided target, so clear previous content.
    container.innerHTML = "";

    hubspot.forms.create({
      region: HUBSPOT_REGION,
      portalId: HUBSPOT_PORTAL_ID,
      formId: HUBSPOT_FORM_ID,
      target: `#${HUBSPOT_TARGET_ID}`,
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if ((window as any)?.hbspt?.forms?.create) {
      initializeHubSpotForm();
    }
  }, [initializeHubSpotForm]);

  return (
    <>
      <Script src={HUBSPOT_SCRIPT_SRC} strategy="afterInteractive" onLoad={initializeHubSpotForm} />
      <div
        id={HUBSPOT_TARGET_ID}
        ref={formContainerRef}
        className="hs-form-frame w-full"
        data-region={HUBSPOT_REGION}
        data-form-id={HUBSPOT_FORM_ID}
        data-portal-id={HUBSPOT_PORTAL_ID}
      />
      
      {/* CTA Button - Demo booking */}
      <div className="mt-8 text-center">
        <CalendarPopup 
          className="btn-primary inline-block"
          aria-label="Book a demo"
          translations={{
            title: "Book a Demo",
            subtitle: "Schedule a personalized demo with our team",
            description: "Choose a convenient time for your personalized demo. Our team will show you how Lyyli can transform your organization's communication.",
            loading: "Loading calendar...",
            errorTitle: "Schedule Your Demo",
            errorDescription: "Click the button below to open our calendar in a new tab",
            errorButton: "Open Calendar",
            footerSecure: "Secure booking • GDPR compliant",
            footerContact: "Questions? Contact us"
          }}
        >
          {translations?.["cta.demo"] || "Book a demo"}
        </CalendarPopup>
      </div>
    </>
  );
}


