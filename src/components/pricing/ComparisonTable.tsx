"use client";

import { useState } from "react";
import { TranslationKeys } from "../../lib/i18n";

interface ComparisonTableProps {
  translations: TranslationKeys;
}

interface ComparisonRow {
  feature: string;
  free: string | boolean;
  starter: string | boolean;
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
    {
      feature: t["pricing.features.price"],
      free: "€0",
      starter: "€29",
      growth: "€199",
      professional: "€599",
      enterprise: t["pricing.custom"],
    },
    {
      feature: t["pricing.features.users"],
      free: "1",
      starter: "1",
      growth: "3",
      professional: "10",
      enterprise: t["pricing.custom"],
    },
    {
      feature: t["pricing.features.conversations"],
      free: "20/week",
      starter: "50/week",
      growth: "100/week",
      professional: t["pricing.features.unlimited"],
      enterprise: t["pricing.features.unlimited"],
    },
    {
      feature: t["pricing.features.posts"],
      free: "5/week",
      starter: "10/week",
      growth: t["pricing.features.unlimited"],
      professional: t["pricing.features.unlimited"],
      enterprise: t["pricing.features.unlimited"],
    },
    {
      feature: t["pricing.features.integrations"],
      free: "2",
      starter: "3",
      growth: t["pricing.features.unlimited"],
      professional: t["pricing.features.unlimited"],
      enterprise: t["pricing.features.unlimited"],
    },
    {
      feature: t["pricing.features.agents"],
      free: "1",
      starter: "1",
      growth: "1",
      professional: "3",
      enterprise: t["pricing.custom"],
    },
    {
      feature: t["pricing.features.webInterface"],
      free: true,
      starter: true,
      growth: true,
      professional: true,
      enterprise: true,
    },
    {
      feature: t["pricing.features.slack"],
      free: false,
      starter: false,
      growth: false,
      professional: true,
      enterprise: true,
    },
    {
      feature: t["pricing.features.teams"],
      free: false,
      starter: false,
      growth: true,
      professional: true,
      enterprise: true,
    },
    {
      feature: t["pricing.features.customization"],
      free: false,
      starter: true,
      growth: true,
      professional: true,
      enterprise: true,
    },
    {
      feature: t["pricing.features.communicationSuggestions"],
      free: "3x/week",
      starter: "1x/day",
      growth: t["pricing.custom"],
      professional: t["pricing.custom"],
      enterprise: t["pricing.custom"],
    },
    {
      feature: t["pricing.features.onboarding"],
      free: "€199",
      starter: "€199",
      growth: "€199 (free with annual)",
      professional: t["pricing.features.included"],
      enterprise: t["pricing.custom"],
    },
    {
      feature: t["pricing.features.support"],
      free: false,
      starter: false,
      growth: "Chat 8-20",
      professional: "Chat 8-20",
      enterprise: t["pricing.custom"],
    },
    {
      feature: t["pricing.features.phoneSupport"],
      free: false,
      starter: false,
      growth: false,
      professional: "9-15",
      enterprise: true,
    },
    {
      feature: t["pricing.features.apiAccess"],
      free: false,
      starter: false,
      growth: false,
      professional: false,
      enterprise: true,
    },
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
                    {t["pricing.starter.name"]}
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
                      {renderCell(row.starter)}
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
