"use client";

import { TranslationKeys } from "../lib/i18n";
import { computeRoiMetrics } from "../lib/roi";

interface HeroFactBoxProps {
  translations: TranslationKeys;
  teamSize?: number;
  currentTimeHoursPerWeek?: number;
}

export default function HeroFactBox({ translations, teamSize = 10, currentTimeHoursPerWeek = 5 }: HeroFactBoxProps) {
  const metrics = computeRoiMetrics({
    teamSize,
    currentTimeHoursPerWeek,
    hourlyRate: 60,
    planMonthlyCost: 199,
    productivityMultiplier: 1.5,
  });

  const formattedMonthlyNet = `€${Math.round(metrics.monthlyNetSavings).toLocaleString()}`;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 text-center border-b sm:border-b-0 sm:border-r border-gray-200">
            <div className="text-3xl md:text-4xl font-bold text-forest font-sans">
              {Math.round(metrics.timeSavedPercent)}%
            </div>
            <div className="text-mediumGray text-sm mt-1 font-sans">
              {translations["hero.facts.timeSaved"] || "Save time on communication"}
            </div>
          </div>
          <div className="p-6 text-center border-b lg:border-b-0 lg:border-r sm:border-r border-gray-200">
            <div className="text-3xl md:text-4xl font-bold text-forest font-sans">
              1.5×
            </div>
            <div className="text-mediumGray text-sm mt-1 font-sans">
              {translations["hero.facts.productivityBoost"] || "Faster production with your current team"}
            </div>
          </div>
          <div className="p-6 text-center border-b sm:border-b-0 sm:border-r lg:border-r border-gray-200">
            <div className="text-3xl md:text-4xl font-bold text-forest font-sans">
              {metrics.fteEquivalent.toFixed(1)} FTE
            </div>
            <div className="text-mediumGray text-sm mt-1 font-sans">
              {translations["hero.facts.fteReplacement"] || "Equivalent capacity unlocked"}
            </div>
          </div>
          <div className="p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-forest font-sans">
              {formattedMonthlyNet}
            </div>
            <div className="text-mediumGray text-sm mt-1 font-sans">
              {translations["hero.facts.netSavings"] || "Net savings per month"}
            </div>
          </div>
        </div>
        <div className="px-6 py-3 text-center text-xs text-mediumGray border-t border-gray-200 font-sans">
          {translations["hero.facts.caption"] || "Based on typical teams and €199/month plan"}
        </div>
      </div>
    </div>
  );
}


