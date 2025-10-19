"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { TranslationKeys } from "../lib/i18n";
import { computeRoiMetrics } from "../lib/roi";

// Dynamic import for the charts to avoid SSR issues with Recharts
const DynamicCharts = dynamic(() => import("./ROICharts"), { 
  ssr: false,
  loading: () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center">
          <div className="animate-pulse text-mediumGray">Loading charts...</div>
        </div>
      </div>
    </div>
  )
});

// Lazily load framer-motion's motion.div to reduce initial bundle size
const MotionDiv = dynamic(() => import("framer-motion").then(m => m.motion.div), { ssr: false, loading: () => <div /> });

interface CalculationResult {
  timeSaved: number; // hours saved per person per week
  moneySaved: number; // € saved per person per week
  efficiencyGain: number; // % time saved per person
  monthlySavings: number; // € team net per month
  yearlySavings: number; // € team net per year
}

interface ROICalculatorProps {
  locale?: string;
  translations?: TranslationKeys;
}

export default function ROICalculator({ locale, translations }: ROICalculatorProps) {
  const [teamSize, setTeamSize] = useState(10);
  const [currentTime, setCurrentTime] = useState(5);
  const [results, setResults] = useState<CalculationResult>({
    timeSaved: 0,
    moneySaved: 0,
    efficiencyGain: 0,
    monthlySavings: 0,
    yearlySavings: 0
  });

  // Calculate ROI based on inputs (pricing-aware)
  useEffect(() => {
    const hourlyRate = 60; // Align with pricing assumption translations
    const metrics = computeRoiMetrics({
      teamSize,
      currentTimeHoursPerWeek: currentTime,
      hourlyRate,
      planMonthlyCost: 199,
      productivityMultiplier: 1.5,
    });

    setResults({
      timeSaved: Math.round(metrics.timeSavedPerPersonHoursPerWeek * 100) / 100,
      moneySaved: Math.round(metrics.weeklySavingsPerPerson * 100) / 100,
      efficiencyGain: Math.round(metrics.timeSavedPercent * 100) / 100 / 100 * 100, // ensure proper rounding
      monthlySavings: Math.round(metrics.monthlyNetSavings * 100) / 100,
      yearlySavings: Math.round(metrics.yearlyNetSavings * 100) / 100,
    });
  }, [teamSize, currentTime]);

  // Chart data for time savings over months
  const timeSavingsData = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    timeSaved: results.timeSaved * (i + 1),
    moneySaved: results.moneySaved * (i + 1)
  }));

  // Chart data for efficiency comparison
  const efficiencyData = [
    { metric: translations?.["roi.charts.current"] || "Current", value: currentTime, fill: "#94A3B8" },
    { metric: translations?.["roi.charts.withLyyli"] || "With Lyyli", value: results.timeSaved, fill: "#2F5D50" }
  ];

  return (
    <>
      <style jsx>{`
        .slider {
          outline: none;
          background: transparent;
          border: 1px solid rgba(167, 214, 209, 0.3);
          border-radius: 10px;
          padding: 2px;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        
        .slider:focus {
          border-color: #A7D6D1;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(167, 214, 209, 0.3);
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #A7D6D1 0%, #F7EBEB 100%);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(47, 93, 80, 0.2);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(0,0,0,0.4), 0 0 0 2px rgba(167, 214, 209, 0.5);
        }
        
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #A7D6D1 0%, #F7EBEB 100%);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(47, 93, 80, 0.2);
          transition: all 0.2s ease;
        }
        
        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(0,0,0,0.4), 0 0 0 2px rgba(167, 214, 209, 0.5);
        }
        
        .slider::-webkit-slider-track {
          background: linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(167, 214, 209, 0.2));
          border-radius: 10px;
          height: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        .slider::-moz-range-track {
          background: linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(167, 214, 209, 0.2));
          border-radius: 10px;
          height: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-forest mb-6 font-playfair font-bold leading-tight">
            {translations?.["roi.calculator.title" as keyof typeof translations] || "Calculate your ROI"}
          </h2>
          <p className="text-xl text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
            {translations?.["roi.calculator.subtitle" as keyof typeof translations] || "See exactly how much time and money Lyyli.ai can save your organization"}
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calculator Inputs */}
            <MotionDiv 
              className="bg-forest rounded-2xl p-8 shadow-lg border border-forest"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl text-turquoise mb-6 font-playfair font-normal">
                {translations?.["roi.calculator.organizationDetails"] || "Your organization details"}
              </h3>

              {/* Team Size Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2 font-sans">
                  {translations?.["roi.calculator.teamSize"] || "Team size"}
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={teamSize}
                    onChange={(e) => setTeamSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-rose mt-1">
                    <span>1</span>
                    <span>25</span>
                    <span>50</span>
                    <span>75</span>
                    <span>100+</span>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-2xl font-bold text-white font-sans">
                    {teamSize} {translations?.["pricing.roi.people"] || (teamSize === 1 ? 'person' : 'people')}
                  </span>
                </div>
              </div>

              {/* Current Time Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2 font-sans">
                  {translations?.["roi.calculator.communicationTime"] || "Current time spent on communication (hours per week)"}
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={currentTime}
                    onChange={(e) => setCurrentTime(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-rose mt-1">
                    <span>1h</span>
                    <span>5h</span>
                    <span>10h</span>
                    <span>15h</span>
                    <span>20h</span>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-2xl font-bold text-white font-sans">
                    {currentTime} {translations?.["roi.charts.hoursPerWeek"] || "hours/week"}
                  </span>
                </div>
              </div>

              {/* Results Summary */}
              <div className="bg-gradient-to-br from-turquoise/20 to-rose/20 rounded-xl p-6 mt-8 border border-turquoise/40">
                <h4 className="text-lg text-turquoise mb-4 font-playfair font-normal">
                  {translations?.["roi.calculator.potentialSavings"] || "Your potential savings"}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white font-sans">
                      {results.timeSaved}h
                    </div>
                    <div className="text-sm text-turquoise font-sans">
                      {translations?.["roi.calculator.timeSaved"] || "Time saved/week"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white font-sans">
                      {results.efficiencyGain}%
                    </div>
                    <div className="text-sm text-turquoise font-sans">
                      {translations?.["roi.calculator.efficiencyGain"] || "Efficiency gain"}
                    </div>
                  </div>
                </div>
              </div>
            </MotionDiv>

            {/* Results and Charts */}
            <MotionDiv 
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-forest rounded-2xl p-6 shadow-lg border border-forest text-center">
                  <div className="text-3xl font-bold text-white mb-2 font-sans">
                    {results.monthlySavings.toLocaleString()}€
                  </div>
                  <div className="text-turquoise font-sans">
                    {translations?.["roi.calculator.monthlySavings"] || "Monthly savings"}
                  </div>
                </div>
                
                <div className="bg-forest rounded-2xl p-6 shadow-lg border border-forest text-center">
                  <div className="text-3xl font-bold text-white mb-2 font-sans">
                    {results.yearlySavings.toLocaleString()}€
                  </div>
                  <div className="text-turquoise font-sans">
                    {translations?.["roi.calculator.yearlySavings"] || "Yearly savings"}
                  </div>
                </div>
              </div>

              {/* Dynamic Charts */}
              <DynamicCharts 
                timeSavingsData={timeSavingsData}
                efficiencyData={efficiencyData}
                translations={translations}
              />
            </MotionDiv>
          </div>

          {/* ROI Assumptions Section */}
          <MotionDiv 
            className="mt-16 bg-forest rounded-2xl p-8 shadow-lg border border-forest"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-turquoise mb-4 font-playfair font-bold leading-tight">
                {translations?.["pricing.assumptions.title"] || "ROI calculation assumptions"}
              </h3>
              <p className="text-rose font-sans leading-relaxed">
                {translations?.["roi.assumptions.note"] || "Our calculations are based on industry benchmarks and real customer data"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-turquoise mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-base text-white font-sans leading-relaxed">
                    {translations?.["pricing.assumptions.efficiency"] || "80% efficiency improvement from routine communication automation"}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-turquoise mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-base text-white font-sans leading-relaxed">
                    {translations?.["pricing.assumptions.cost"] || "Based on 60€/hour average professional service costs"}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-turquoise mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-base text-white font-sans leading-relaxed">
                    {translations?.["pricing.assumptions.time"] || "Average 2 hours per week saved per knowledge worker"}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-turquoise mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-base text-white font-sans leading-relaxed">
                    {translations?.["pricing.assumptions.overhead"] || "Includes reduced meeting time and faster decision-making"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-br from-turquoise/20 to-rose/20 rounded-lg border-l-4 border-turquoise">
              <p className="text-sm text-white font-sans leading-relaxed">
                <strong className="text-turquoise">Note:</strong> ROI calculations are estimates based on
                typical customer outcomes and industry benchmarks. Actual results
                may vary depending on your organization&apos;s specific
                communication patterns, team size, and implementation approach.
              </p>
            </div>
          </MotionDiv>

          {/* Measurable Business Impact Section */}
          <MotionDiv 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-semibold text-forest mb-6 font-playfair font-bold leading-tight">
              {translations?.["roi.impact.title"] || "Measurable business impact"}
            </h3>
            <p className="text-lg text-mediumGray max-w-3xl mx-auto mb-8 font-sans leading-relaxed">
              {translations?.["roi.impact.description"] || "Beyond time and cost savings, Lyyli.ai delivers measurable improvements in communication quality, team collaboration, and customer satisfaction"}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-forest mb-2 font-sans">{translations?.["roi.impact.card1.title"] || "Faster response times"}</h4>
                <p className="text-mediumGray text-sm font-sans leading-relaxed">
                  {translations?.["roi.impact.card1.description"] || "Reduce communication delays by up to 80% with AI-powered assistance"}
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="w-12 h-12 bg-turquoise/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-forest mb-2 font-sans">{translations?.["roi.impact.card2.title"] || "Improved consistency"}</h4>
                <p className="text-mediumGray text-sm font-sans leading-relaxed">
                  {translations?.["roi.impact.card2.description"] || "Maintain brand voice and messaging consistency across all communications"}
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="w-12 h-12 bg-rose/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-forest mb-2 font-sans">{translations?.["roi.impact.card3.title"] || "Higher satisfaction"}</h4>
                <p className="text-mediumGray text-sm font-sans leading-relaxed">
                  {translations?.["roi.impact.card3.description"] || "Boost customer and team satisfaction with more effective communication"}
                </p>
              </div>
            </div>
          </MotionDiv>

          {/* Bottom CTA */}
          <MotionDiv 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <a 
              href={translations?.["roi.cta.startSaving"] || "https://app.lyyli.ai"} 
              className="inline-flex items-center px-8 py-4 bg-forest text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-sans hover:bg-turquoise"
            >
              {translations?.["roi.cta.startSaving"] || "Start saving with Lyyli.ai"}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </MotionDiv>
        </div>
      </div>
    </section>
    </>
  );
}
