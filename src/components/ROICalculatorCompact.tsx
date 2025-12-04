'use client';

import { useState, useEffect } from 'react';
import type { TranslationKeys } from '@/lib/i18n';
import { computeRoiMetrics } from '@/lib/roi';
import dynamic from 'next/dynamic';

// Lazily load framer-motion's motion.div to reduce initial bundle size
const MotionDiv = dynamic(
  () => import('framer-motion').then(m => m.motion.div),
  { ssr: false, loading: () => <div /> }
);

interface CalculationResult {
  timeSaved: number;
  efficiencyGain: number;
  monthlySavings: number;
  yearlySavings: number;
}

interface ROICalculatorCompactProps {
  translations?: TranslationKeys;
}

export default function ROICalculatorCompact({
  translations,
}: ROICalculatorCompactProps) {
  const [teamSize, setTeamSize] = useState(10);
  const [currentTime, setCurrentTime] = useState(5);
  const [results, setResults] = useState<CalculationResult>({
    timeSaved: 0,
    efficiencyGain: 0,
    monthlySavings: 0,
    yearlySavings: 0,
  });

  // Calculate ROI based on inputs
  useEffect(() => {
    const hourlyRate = 60;
    const metrics = computeRoiMetrics({
      teamSize,
      currentTimeHoursPerWeek: currentTime,
      hourlyRate,
      planMonthlyCost: 199,
      productivityMultiplier: 1.5,
    });

    setResults({
      timeSaved: Math.round(metrics.timeSavedPerPersonHoursPerWeek * 100) / 100,
      efficiencyGain: Math.round(metrics.timeSavedPercent * 100) / 100,
      monthlySavings: Math.round(metrics.monthlyNetSavings * 100) / 100,
      yearlySavings: Math.round(metrics.yearlyNetSavings * 100) / 100,
    });
  }, [teamSize, currentTime]);

  return (
    <>
      <style jsx>{`
        .slider {
          outline: none;
          background: transparent;
          border: 1px solid rgba(167, 214, 209, 0.3);
          border-radius: 8px;
          padding: 2px;
        }

        .slider:focus {
          border-color: #a7d6d1;
        }

        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a7d6d1 0%, #f7ebeb 100%);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a7d6d1 0%, #f7ebeb 100%);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-webkit-slider-track {
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.3),
            rgba(167, 214, 209, 0.2)
          );
          border-radius: 8px;
          height: 6px;
        }

        .slider::-moz-range-track {
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.3),
            rgba(167, 214, 209, 0.2)
          );
          border-radius: 8px;
          height: 6px;
        }
      `}</style>
      <div className="bg-gradient-to-br from-forest/5 to-turquoise/5 rounded-2xl p-4 sm:p-6 border border-gray-200">
        {/* Compact Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl text-forest mb-2 font-playfair font-bold">
            {translations?.['roi.calculator.title'] || 'Calculate your ROI'}
          </h3>
          <p className="text-xs sm:text-sm text-mediumGray font-sans">
            {translations?.['roi.calculator.subtitle'] ||
              'See how much Lyyli can save your organization'}
          </p>
        </div>

        {/* Compact Inputs */}
        <div className="space-y-4 sm:space-y-6 mb-6">
          {/* Team Size */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-forest mb-2 font-sans">
              {translations?.['roi.calculator.teamSize'] || 'Team size'}
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={teamSize}
              onChange={e => setTeamSize(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-mediumGray mt-1">
              <span>1</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100+</span>
            </div>
            <div className="text-center mt-1">
              <span className="text-lg sm:text-xl font-bold text-forest font-sans">
                {teamSize}{' '}
                {translations?.['pricing.roi.people'] ||
                  (teamSize === 1 ? 'person' : 'people')}
              </span>
            </div>
          </div>

          {/* Current Time */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-forest mb-2 font-sans">
              {translations?.['roi.calculator.communicationTime'] ||
                'Hours/week on communication'}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={currentTime}
              onChange={e => setCurrentTime(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-mediumGray mt-1">
              <span>1h</span>
              <span>5h</span>
              <span>10h</span>
              <span>15h</span>
              <span>20h</span>
            </div>
            <div className="text-center mt-1">
              <span className="text-lg sm:text-xl font-bold text-forest font-sans">
                {currentTime}{' '}
                {translations?.['roi.charts.hoursPerWeek'] || 'hours/week'}
              </span>
            </div>
          </div>
        </div>

        {/* Compact Results */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200">
            <h4 className="text-sm sm:text-base font-semibold text-forest mb-3 font-sans text-center">
              {translations?.['roi.calculator.potentialSavings'] ||
                'Your potential savings'}
            </h4>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-forest font-sans">
                  {results.timeSaved}h
                </div>
                <div className="text-xs sm:text-sm text-mediumGray font-sans mt-1">
                  {translations?.['roi.calculator.timeSaved'] || 'Time/week'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-forest font-sans">
                  {results.efficiencyGain}%
                </div>
                <div className="text-xs sm:text-sm text-mediumGray font-sans mt-1">
                  {translations?.['roi.calculator.efficiencyGain'] ||
                    'Efficiency'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-forest font-sans">
                  {results.monthlySavings.toLocaleString()}€
                </div>
                <div className="text-xs sm:text-sm text-mediumGray font-sans mt-1">
                  {translations?.['roi.calculator.monthlySavings'] || 'Month'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-forest font-sans">
                  {results.yearlySavings.toLocaleString()}€
                </div>
                <div className="text-xs sm:text-sm text-mediumGray font-sans mt-1">
                  {translations?.['roi.calculator.yearlySavings'] || 'Year'}
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>

        {/* Compact Note */}
        <p className="text-xs text-mediumGray text-center mt-4 font-sans leading-relaxed">
          {translations?.['roi.calculator.note'] ||
            'ROI calculations are estimates based on typical customer outcomes.'}
        </p>
      </div>
    </>
  );
}
