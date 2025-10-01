"use client";

import { useEffect, useRef } from "react";

const HUBSPOT_SCRIPT_SRC = "https://js-eu1.hsforms.net/forms/embed/146205702.js";
const HUBSPOT_PORTAL_ID = "146205702";
const HUBSPOT_FORM_ID = "f337eade-e814-4038-b2aa-908dcf612cce";
const HUBSPOT_REGION = "eu1";

export default function WaitlistForm() {
  const formContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!formContainerRef.current) {
      return;
    }

    const existingScript = document.querySelector(
      `script[src="${HUBSPOT_SCRIPT_SRC}"]`
    ) as HTMLScriptElement | null;

    const initForm = () => {
      const container = formContainerRef.current;
      if (!container) {
        return;
      }

      // Avoid duplicate embeds if effect runs again
      if (container.querySelector<HTMLDivElement>(".hs-form-frame")) {
        return;
      }

      const formDiv = document.createElement("div");
      formDiv.className = "hs-form-frame";
      formDiv.dataset.region = HUBSPOT_REGION;
      formDiv.dataset.formId = HUBSPOT_FORM_ID;
      formDiv.dataset.portalId = HUBSPOT_PORTAL_ID;
      container.appendChild(formDiv);

      if ((window as any).hbspt?.forms?.create) {
        try {
          (window as any).hbspt.forms.create({
            region: HUBSPOT_REGION,
            portalId: HUBSPOT_PORTAL_ID,
            formId: HUBSPOT_FORM_ID,
            target: formDiv,
          });
        } catch (error) {
          console.error("Failed to initialize HubSpot form", error);
        }
      }
    };

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = HUBSPOT_SCRIPT_SRC;
      script.defer = true;
      script.onload = initForm;
      script.onerror = () => {
        console.error("Failed to load HubSpot form script");
      };
      document.body.appendChild(script);
      return () => {
        script.onload = null;
      };
    }

    if (existingScript.getAttribute("data-hubspot-loaded") === "true") {
      initForm();
    } else {
      existingScript.addEventListener("load", initForm, { once: true });
    }

    return () => {
      existingScript?.removeEventListener("load", initForm);
    };
  }, []);

  return <div ref={formContainerRef} className="w-full" />;
}


