"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamic import for the entire ROI Calculator to avoid SSR issues with Recharts
const DynamicCharts = dynamic(() => import("./ROICharts"), { 
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
      <div className="animate-pulse text-mediumGray dark:text-white">Loading charts...</div>
    </div>
  )
});

interface CalculationResult {
  timeSaved: number;
  moneySaved: number;
  efficiencyGain: number;
  monthlySavings: number;
  yearlySavings: number;
}

export default function ROICalculator() {
  const [teamSize, setTeamSize] = useState(10);
  const [currentTime, setCurrentTime] = useState(5);
  const [results, setResults] = useState<CalculationResult>({
    timeSaved: 0,
    moneySaved: 0,
    efficiencyGain: 0,
    monthlySavings: 0,
    yearlySavings: 0
  });

  // Calculate ROI based on inputs
  useEffect(() => {
    const hourlyRate = 75; // Average hourly rate for professional services
    const workingHoursPerWeek = 40;
    const weeksPerMonth = 4.33;
    const monthsPerYear = 12;

    const timeSaved = (currentTime * 0.6); // 60% time reduction
    const moneySaved = timeSaved * hourlyRate;
    const efficiencyGain = ((currentTime - timeSaved) / currentTime) * 100;
    const monthlySavings = moneySaved * workingHoursPerWeek * weeksPerMonth;
    const yearlySavings = monthlySavings * monthsPerYear;

    setResults({
      timeSaved: Math.round(timeSaved * 100) / 100,
      moneySaved: Math.round(moneySaved * 100) / 100,
      efficiencyGain: Math.round(efficiencyGain * 100) / 100,
      monthlySavings: Math.round(monthlySavings * 100) / 100,
      yearlySavings: Math.round(yearlySavings * 100) / 100
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
    { metric: "Current", value: currentTime, fill: "#94A3B8" },
    { metric: "With Lyyli", value: results.timeSaved, fill: "#2F5D50" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-forest dark:text-white mb-6 font-playfair font-normal leading-tight">
            Calculate your ROI
          </h2>
          <p className="text-xl text-mediumGray dark:text-white max-w-3xl mx-auto font-sans leading-relaxed">
            See exactly how much time and money Lyyli.ai can save your organization
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calculator Inputs */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-600"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-forest dark:text-white mb-6 font-sans">
                Your organization details
              </h3>

              {/* Team Size Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-forest dark:text-white mb-2 font-sans">
                  Team size
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={teamSize}
                    onChange={(e) => setTeamSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-mediumGray dark:text-white mt-1">
                    <span>1</span>
                    <span>25</span>
                    <span>50</span>
                    <span>75</span>
                    <span>100+</span>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-2xl font-bold text-forest dark:text-white font-sans">
                    {teamSize} {teamSize === 1 ? 'person' : 'people'}
                  </span>
                </div>
              </div>

              {/* Current Time Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-forest dark:text-white mb-2 font-sans">
                  Current time spent on communication (hours per week)
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={currentTime}
                    onChange={(e) => setCurrentTime(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-mediumGray dark:text-white mt-1">
                    <span>1h</span>
                    <span>5h</span>
                    <span>10h</span>
                    <span>15h</span>
                    <span>20h</span>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-2xl font-bold text-forest dark:text-white font-sans">
                    {currentTime} hours/week
                  </span>
                </div>
              </div>

              {/* Results Summary */}
              <div className="bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-xl p-6 mt-8">
                <h4 className="text-lg font-semibold text-forest dark:text-white mb-4 font-sans">
                  Your potential savings
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-forest dark:text-white font-sans">
                      {results.timeSaved}h
                    </div>
                    <div className="text-sm text-mediumGray dark:text-white font-sans">
                      Time saved/week
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-forest dark:text-white font-sans">
                      {results.efficiencyGain}%
                    </div>
                    <div className="text-sm text-mediumGray dark:text-white font-sans">
                      Efficiency gain
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results and Charts */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-600 text-center">
                  <div className="text-3xl font-bold text-forest dark:text-white mb-2 font-sans">
                    €{results.monthlySavings.toLocaleString()}
                  </div>
                  <div className="text-mediumGray dark:text-white font-sans">
                    Monthly savings
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-600 text-center">
                  <div className="text-3xl font-bold text-forest dark:text-white mb-2 font-sans">
                    €{results.yearlySavings.toLocaleString()}
                  </div>
                  <div className="text-mediumGray dark:text-white font-sans">
                    Yearly savings
                  </div>
                </div>
              </div>

              {/* Dynamic Charts */}
              <DynamicCharts 
                timeSavingsData={timeSavingsData}
                efficiencyData={efficiencyData}
              />
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <a 
              href="#cta" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-forest to-turquoise text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-sans"
            >
              Start saving with Lyyli.ai
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
