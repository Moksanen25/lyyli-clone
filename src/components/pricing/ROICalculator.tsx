'use client';

import { useState } from 'react';
import { getTranslations } from '../../lib/i18n';

interface ROICalculatorProps {
  locale: string;
}

export default function ROICalculator({ locale }: ROICalculatorProps) {
  const t = getTranslations(locale);
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
  const netROI = ((totalSavingsPerYear - professionalPlanCost) / professionalPlanCost) * 100;
  const paybackMonths = Math.ceil(professionalPlanCost / monthlySavings);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="heading-2 mb-4 text-forest-green">
          {t['pricing.assumptions.title']}
        </h2>
        <p className="body-large text-medium-gray mb-8">
          Calculate your potential savings with Lyyli's AI communication assistant
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Calculator Inputs */}
        <div className="bg-white rounded-lg border border-light-gray p-8 space-y-6">
          <h3 className="heading-3 text-forest-green mb-6">ROI Calculator</h3>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="team-size" className="block text-sm font-medium text-dark-gray mb-2">
                Team Size
              </label>
              <input
                type="range"
                id="team-size"
                min="10"
                max="1000"
                step="10"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-light-gray rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-medium-gray mt-1">
                <span>10</span>
                <span className="font-medium text-forest-green">{teamSize} people</span>
                <span>1000</span>
              </div>
            </div>

            <div>
              <label htmlFor="hourly-rate" className="block text-sm font-medium text-dark-gray mb-2">
                Average Hourly Rate (€)
              </label>
              <input
                type="range"
                id="hourly-rate"
                min="30"
                max="150"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-light-gray rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-medium-gray mt-1">
                <span>€30</span>
                <span className="font-medium text-forest-green">€{hourlyRate}/hour</span>
                <span>€150</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* ROI Chart Visual */}
          <div className="bg-gradient-to-r from-forest-green/10 to-muted-turquoise/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-forest-green">Annual Savings</h4>
              <span className="text-2xl font-bold text-forest-green">
                €{totalSavingsPerYear.toLocaleString()}
              </span>
            </div>
            
            {/* Simple ROI visualization */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-medium-gray">Cost Savings</span>
                <span className="font-medium text-dark-gray">€{totalSavingsPerYear.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-medium-gray">Lyyli Cost (Professional)</span>
                <span className="font-medium text-dark-gray">€{professionalPlanCost.toLocaleString()}</span>
              </div>
              <div className="border-t border-light-gray pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-forest-green">Net ROI</span>
                  <span className="text-xl font-bold text-forest-green">
                    {netROI > 0 ? '+' : ''}{Math.round(netROI)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-light-gray p-4 text-center">
              <div className="text-2xl font-bold text-forest-green mb-1">
                {paybackMonths}
              </div>
              <div className="text-sm text-medium-gray">
                Months to Payback
              </div>
            </div>
            <div className="bg-white rounded-lg border border-light-gray p-4 text-center">
              <div className="text-2xl font-bold text-forest-green mb-1">
                €{Math.round(monthlySavings).toLocaleString()}
              </div>
              <div className="text-sm text-medium-gray">
                Monthly Savings
              </div>
            </div>
          </div>

          {/* Assumptions */}
          <div className="bg-soft-rose rounded-lg p-6">
            <h4 className="font-medium text-forest-green mb-3">Calculation Assumptions</h4>
            <ul className="space-y-2 text-sm text-medium-gray">
              <li className="flex items-start gap-2">
                <span className="text-forest-green">•</span>
                {t['pricing.assumptions.efficiency']}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-forest-green">•</span>
                {t['pricing.assumptions.time']}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-forest-green">•</span>
                {t['pricing.assumptions.cost']}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-forest-green">•</span>
                {t['pricing.assumptions.overhead']}
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
          background: #2D5A27;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2D5A27;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
