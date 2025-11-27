"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { TranslationKeys } from "@/lib/i18n";

interface FeatureSectionNavProps {
  locale: string;
  translations: TranslationKeys;
}

export default function FeatureSectionNav({
  locale,
  translations: t,
}: FeatureSectionNavProps) {
  const sections = [
    {
      id: "ai-automation",
      title: locale === "fi" ? "AI-automaatio" : "AI Automation",
      description: locale === "fi" 
        ? "Älykkäät viestintäominaisuudet ja automaatio"
        : "Intelligent communication features and automation"
    },
    {
      id: "governance-compliance",
      title: locale === "fi" ? "Hallinta & Compliance" : "Governance & Compliance",
      description: locale === "fi"
        ? "Auditointi, versiointi ja käyttöoikeuksien hallinta"
        : "Audit trails, version control, and access management"
    },
    {
      id: "security-gdpr",
      title: locale === "fi" ? "Tietoturva & GDPR" : "Security & GDPR",
      description: locale === "fi"
        ? "Salaus, ISO 27001 ja GDPR-yhteensopivuus"
        : "Encryption, ISO 27001, and GDPR compliance"
    },
    {
      id: "multilingual",
      title: locale === "fi" ? "Monikielisyys" : "Multilingual Support",
      description: locale === "fi"
        ? "Käännökset ja kulttuurinen mukautuminen"
        : "Translation and cultural adaptation"
    },
    {
      id: "integrations",
      title: locale === "fi" ? "Integraatiot" : "Integrations",
      description: locale === "fi"
        ? "Yhteys työkaluihisi kuten Outlook, Slack, Teams"
        : "Connect to your tools like Outlook, Slack, Teams"
    },
    {
      id: "upcoming",
      title: locale === "fi" ? "Tulevat ominaisuudet" : "Upcoming Features",
      description: locale === "fi"
        ? "Kampanjatila, analytics ja mediatietokanta"
        : "Campaign mode, analytics, and media library"
    }
  ];

  const navRef = useRef<HTMLDivElement | null>(null);
  const [headerOffsetPx, setHeaderOffsetPx] = useState<number>(0);
  const [navHeightPx, setNavHeightPx] = useState<number>(0);

  // Measure header height (sticky) and our own nav height for accurate scroll offsets
  useEffect(() => {
    const measure = () => {
      const headerEl = document.querySelector<HTMLElement>("header");
      const headerRect = headerEl?.getBoundingClientRect();
      const headerHeight = headerRect ? headerRect.height : 0;
      setHeaderOffsetPx(headerHeight);

      const navEl = navRef.current;
      setNavHeightPx(navEl?.offsetHeight ?? 0);
    };

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, []);

  const stickyTopPx = useMemo(() => headerOffsetPx, [headerOffsetPx]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const absoluteY = rect.top + window.pageYOffset;
    const safeGap = 12; // small breathing room below the bars
    const targetY = Math.max(
      0,
      absoluteY - (headerOffsetPx + navHeightPx + safeGap)
    );
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <div
      ref={navRef}
      className="bg-white border-b border-gray-200 sticky z-40 shadow-sm"
      style={{ top: stickyTopPx }}
    >
      <div className="container mx-auto px-4">
        <nav className="py-3 md:py-4" aria-label="Feature sections navigation">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-forest transition-colors duration-200 rounded-lg hover:bg-forest/5 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:bg-forest/5"
                aria-label={`Jump to ${section.title} section`}
              >
                <span className="block group-hover:scale-105 transition-transform duration-200">
                  {section.title}
                </span>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-forest group-hover:w-full transition-all duration-200 rounded-full" />
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
