'use client';

import AnimatedNumber from '@/components/AnimatedNumber';
import { computeRoiMetrics } from '@/lib/roi';
import type { TranslationKeys } from '@/lib/i18n';

interface PricingRoiProofProps {
  translations?: TranslationKeys;
  teamSize?: number;
  currentTimeHoursPerWeek?: number;
}

export default function PricingRoiProof({
  translations: t,
  teamSize = 10,
  currentTimeHoursPerWeek = 5,
}: PricingRoiProofProps) {
  const metrics = computeRoiMetrics({
    teamSize,
    currentTimeHoursPerWeek,
    hourlyRate: 60,
    planMonthlyCost: 199,
    productivityMultiplier: 1.5,
  });

  const cards = [
    {
      value: Math.round(metrics.timeSavedPercent),
      suffix: '%',
      label: t?.['pricing.roi.timeSaved'] || 'Faster communication workflows',
      desc:
        t?.['pricing.roi.timeSaved.desc'] ||
        'Average time saved on planning, writing and coordination.',
      bg: 'from-rose/10 to-turquoise/10',
    },
    {
      value: Math.round(metrics.monthlyNetSavings),
      suffix: '€',
      label: t?.['pricing.roi.netSavings'] || 'Net savings per month',
      desc:
        t?.['pricing.roi.netSavings.desc'] ||
        'Estimated after plan costs, based on your team inputs.',
      bg: 'from-turquoise/10 to-forest/10',
    },
    {
      value: Math.round((metrics.productivityBoostPercent / 100 + 1) * 100),
      suffix: '%',
      label: t?.['pricing.roi.roiPercent'] || 'ROI potential',
      desc:
        t?.['pricing.roi.roiPercent.desc'] ||
        'Indicative return across typical professional service orgs.',
      bg: 'from-forest/10 to-rose/10',
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-8 bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 tilt-hover overflow-hidden"
            >
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${c.bg}`}
              />
              <div className="relative z-10 text-center">
                <div className="text-4xl md:text-5xl font-bold text-forest font-playfair mb-2">
                  <AnimatedNumber value={c.value} suffix={c.suffix} />
                </div>
                <div className="text-darkGray font-sans font-semibold mb-2">
                  {c.label}
                </div>
                <p className="text-mediumGray font-sans text-sm leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
