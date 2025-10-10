"use client";

import { useState } from "react";
import { TranslationKeys } from "../../lib/i18n";

interface ComparisonTableProps {
  translations: TranslationKeys;
}

interface ComparisonRow {
  feature: string;
  free: string | boolean;
  launch: string | boolean;
  growth: string | boolean;
  professional: string | boolean;
  enterprise: string | boolean;
}

export default function ComparisonTable({
  translations,
}: ComparisonTableProps) {
  const t = translations;
  const [showComparison, setShowComparison] = useState(false);

  const comparisonData: ComparisonRow[] = [
    // Limits
    {
      feature: t["pricing.features.price"],
      free: "0€",
      launch: "39€",
      growth: "69€",
      professional: "199€",
      enterprise: t["pricing.custom"],
    },
    {
      feature: t["pricing.features.users"],
      free: "1",
      launch: "1",
      growth: "1",
      professional: "1",
      enterprise: t["pricing.features.unlimited"],
    },
    {
      feature: t["pricing.features.messagesPerMonth"],
      free: "20",
      launch: "300",
      growth: "1000",
      professional: t["pricing.features.fairUse"],
      enterprise: t["pricing.features.unlimited"],
    },

    // Features
    { feature: t["pricing.features.section.features"], free: "", launch: "", growth: "", professional: "", enterprise: "" },
    { feature: t["pricing.features.basicTone"], free: true, launch: true, growth: true, professional: true, enterprise: true },
    { feature: t["pricing.features.advancedTone"], free: false, launch: false, growth: true, professional: true, enterprise: true },
    { feature: t["pricing.features.integrations"], free: false, launch: true, growth: true, professional: true, enterprise: true },
    { feature: t["pricing.features.editorMode"], free: false, launch: false, growth: false, professional: true, enterprise: true },
    { feature: t["pricing.features.orgManagementRoles"], free: false, launch: false, growth: true, professional: true, enterprise: true },
    { feature: t["pricing.features.slackOrTeams"], free: false, launch: false, growth: true, professional: true, enterprise: true },
    { feature: t["pricing.features.advancedAIAnalytics"], free: false, launch: false, growth: false, professional: true, enterprise: true },
    { feature: t["pricing.features.campaignMode"], free: false, launch: false, growth: false, professional: true, enterprise: true },
    { feature: t["pricing.features.mediaLibrary"], free: false, launch: false, growth: false, professional: true, enterprise: true },
    { feature: t["pricing.features.kpiReports"], free: false, launch: false, growth: false, professional: true, enterprise: true },
    { feature: t["pricing.features.brandedTemplates"], free: false, launch: false, growth: false, professional: true, enterprise: true },
    { feature: t["pricing.features.guidedOnboarding"], free: "199€", launch: "199€", growth: t["pricing.features.guidedOnboardingFreeAnnual"], professional: t["pricing.features.included"], enterprise: t["pricing.custom"] },
    { feature: t["pricing.features.formalSLA"], free: false, launch: false, growth: false, professional: true, enterprise: true },
    { feature: t["pricing.features.namedAccountManager"], free: false, launch: false, growth: false, professional: false, enterprise: true },
    { feature: t["pricing.features.localEntity"], free: false, launch: false, growth: false, professional: false, enterprise: true },

    // Help & Support
    { feature: t["pricing.features.section.support"], free: "", launch: "", growth: "", professional: "", enterprise: "" },
    { feature: t["pricing.features.helpLibrary"], free: true, launch: true, growth: true, professional: true, enterprise: true },
    { feature: t["pricing.features.emailSupport"], free: false, launch: true, growth: true, professional: true, enterprise: true },
    { feature: t["pricing.features.phoneSupport"], free: false, launch: false, growth: false, professional: "9-15", enterprise: "9-15" },
    { feature: t["pricing.features.firstResponseTarget"], free: "1-2 days", launch: "1-2 days", growth: t["pricing.features.sameDay"], professional: "4 hours (9-15)", enterprise: "4 hours (9-15)" },
    { feature: t["pricing.features.serviceAvailability"], free: t["pricing.features.bestEffort"], launch: t["pricing.features.bestEffort"], growth: "99.5%", professional: "99.9%", enterprise: "99.9%" },

    // Access & Security
    { feature: t["pricing.features.section.accessSecurity"], free: "", launch: "", growth: "", professional: "", enterprise: "" },
    { feature: t["pricing.features.sso"], free: false, launch: false, growth: true, professional: true, enterprise: true },
    { feature: t["pricing.features.mfa"], free: false, launch: false, growth: true, professional: true, enterprise: true },
    { feature: t["pricing.features.scim"], free: false, launch: false, growth: false, professional: true, enterprise: true },
    { feature: t["pricing.features.slo"], free: false, launch: false, growth: false, professional: false, enterprise: true },
    { feature: t["pricing.features.euDataResidencyDpa"], free: false, launch: false, growth: false, professional: true, enterprise: true },
    { feature: t["pricing.features.allIntegrationsIncluded"], free: false, launch: false, growth: false, professional: false, enterprise: true },
    { feature: t["pricing.features.apiAccess"], free: false, launch: false, growth: false, professional: true, enterprise: true },
    { feature: t["pricing.features.webhooks"], free: false, launch: false, growth: false, professional: true, enterprise: true },
    { feature: t["pricing.features.auditLogsRetention"], free: "-", launch: "30 days", growth: "180 days", professional: "365 days", enterprise: "365 days" },
    { feature: t["pricing.features.apiScope"], free: t["pricing.features.none"], launch: t["pricing.features.none"], growth: t["pricing.features.coreAPIs"], professional: t["pricing.features.fullAPIsWebhooks"], enterprise: t["pricing.features.fullAPIsWebhooks"] },
  ];

  const renderCell = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <svg
          className="w-5 h-5 text-forest mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 text-mediumGray mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
    }
    return <span className="text-center block">{value}</span>;
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
          {t["pricing.comparison.title"]}
        </h2>
        <p className="text-lg text-mediumGray mb-8 font-sans leading-relaxed">
          {t["pricing.comparison.subtitle"]}
        </p>
        <p className="text-sm text-mediumGray font-sans">
          {(t["pricing.pricingNote"] as string).replace("{period}", t["pricing.monthly"])}
        </p>

        {/* Toggle Button */}
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-forest text-white rounded-lg hover:bg-forest/90 transition-colors font-medium"
          aria-expanded={showComparison}
        >
          {showComparison
            ? t["pricing.hideComparison"]
            : t["pricing.showComparison"]}
          <svg
            className={`w-4 h-4 transition-transform ${showComparison ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Comparison Table */}
      {showComparison && (
        <div className="bg-white rounded-lg border border-grayLight overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]" role="table">
              <caption className="sr-only">
                {t["pricing.comparisonCaption"]}
              </caption>

              {/* Sticky Header */}
              <thead className="bg-rose sticky top-0">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left font-medium text-forest"
                  >
                    {t["pricing.features.feature"]}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center font-medium text-forest"
                  >
                    {t["pricing.free.name"]}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center font-medium text-forest"
                  >
                    {t["pricing.launch.name"]}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center font-medium text-forest bg-forest/10"
                  >
                    {t["pricing.growth.name"]}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center font-medium text-forest"
                  >
                    {t["pricing.professional.name"]}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center font-medium text-forest"
                  >
                    {t["pricing.enterprise.name"]}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-grayLight">
                {comparisonData.map((row, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-rose/30"} hover:bg-rose/50 transition-colors`}
                  >
                    <td className="px-6 py-4 font-medium text-forest">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-center text-mediumGray">
                      {renderCell(row.free)}
                    </td>
                    <td className="px-6 py-4 text-center text-mediumGray">
                      {renderCell(row.launch)}
                    </td>
                    <td className="px-6 py-4 text-center text-mediumGray bg-forest/5">
                      {renderCell(row.growth)}
                    </td>
                    <td className="px-6 py-4 text-center text-mediumGray">
                      {renderCell(row.professional)}
                    </td>
                    <td className="px-6 py-4 text-center text-mediumGray">
                      {renderCell(row.enterprise)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
