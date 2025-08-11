"use client";

import { useState } from "react";
import { TranslationKeys } from "../../lib/i18n";

interface ROICalculatorProps {
  translations: TranslationKeys;
}

export default function ROICalculator({ translations }: ROICalculatorProps) {
  const t = translations;
  const [teamSize, setTeamSize] = useState(50);
  const [hourlyRate, setHourlyRate] = useState(60);

  // ROI Calculations based on assumptions
  const hoursPerWeekSaved = 2; // per person

  const weeksPerYear = 52;

  const totalHoursSavedPerYear = teamSize * hoursPerWeekSaved * weeksPerYear;
  const totalSavingsPerYear = totalHoursSavedPerYear * hourlyRate;
  const monthlySavings = totalSavingsPerYear / 12;

  // Assuming Professional plan for calculation
  const professionalPlanCost = 599 * 12; // yearly
  const netROI =
    ((totalSavingsPerYear - professionalPlanCost) / professionalPlanCost) * 100;
  const paybackMonths = Math.ceil(professionalPlanCost / monthlySavings);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
          {t["pricing.roi.title"]}
        </h2>
        <p className="text-lg text-mediumGray mb-8 font-sans leading-relaxed">
          {t["pricing.roi.subtitle"]}
        </p>

        <div className="bg-white rounded-lg border border-grayLight p-8 space-y-6">
          <h3 className="text-2xl text-forest font-playfair font-bold leading-normal mb-6">ROI calculator</h3>
          
          {/* Team Size Input */}
          <div>
            <label
              htmlFor="teamSize"
              className="block text-sm font-medium text-forest mb-2"
            >
              {t["pricing.roi.teamSize"]}
            </label>
            <input
              type="range"
              id="teamSize"
              min="10"
              max="1000"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full h-2 bg-grayLight rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-mediumGray mt-1">
              <span>10</span>
              <span className="font-medium text-forest">
                {teamSize} {t["pricing.roi.people"]}
              </span>
              <span>1000</span>
            </div>
          </div>

          {/* Communication Volume Input */}
          <div>
            <label
              htmlFor="commVolume"
              className="block text-sm font-medium text-forest mb-2"
            >
              {t["pricing.roi.commVolume"]}
            </label>
            <input
              type="range"
              id="commVolume"
              min="100"
              max="10000"
              value={commVolume}
              onChange={(e) => setCommVolume(Number(e.target.value))}
              className="w-full h-2 bg-grayLight rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-mediumGray mt-1">
              <span>100</span>
              <span className="font-medium text-forest">
                {commVolume} {t["pricing.roi.messages"]}
              </span>
              <span>10000</span>
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-gradient-to-r from-forest/10 to-turquoise/10 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-forest">Annual savings</h4>
                <span className="text-2xl font-bold text-forest">
                  €{annualSavings.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-sm text-mediumGray">Cost savings</span>
                <span className="font-medium text-forest">
                  {costSavingsPercentage}%
                </span>
              </div>
            </div>
            <div className="border-t border-grayLight pt-3 mt-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-forest">Net ROI</span>
                <span className="text-xl font-bold text-forest">
                  {roiPercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-grayLight p-4 text-center">
              <div className="text-2xl font-bold text-forest mb-1">
                {paybackMonths}
              </div>
              <div className="text-sm text-mediumGray">Months to payback</div>
            </div>
            <div className="bg-white rounded-lg border border-grayLight p-4 text-center">
              <div className="text-2xl font-bold text-forest mb-1">
                €{monthlySavings.toLocaleString()}
              </div>
              <div className="text-sm text-mediumGray">Monthly savings</div>
            </div>
          </div>

          {/* Assumptions */}
          <div className="bg-rose rounded-lg p-6">
            <h4 className="font-medium text-forest mb-3">
              {t["pricing.roi.assumptions"]}
            </h4>
            <ul className="space-y-2 text-sm text-mediumGray">
              <li className="flex items-center gap-2">
                <span className="text-forest">•</span>
                {t["pricing.roi.assumption1"]}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-forest">•</span>
                {t["pricing.roi.assumption2"]}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-forest">•</span>
                {t["pricing.roi.assumption3"]}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-forest">•</span>
                {t["pricing.roi.assumption4"]}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2d5a27;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2d5a27;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
