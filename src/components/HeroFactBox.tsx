import type { TranslationKeys } from '@/lib/i18n';
import { computeRoiMetrics } from '@/lib/roi';
import MetricCard from '@/components/MetricCard';

interface HeroFactBoxProps {
  translations: TranslationKeys;
  teamSize?: number;
  currentTimeHoursPerWeek?: number;
}

export default function HeroFactBox({
  translations,
  teamSize = 10,
  currentTimeHoursPerWeek = 5,
}: HeroFactBoxProps) {
  const metrics = computeRoiMetrics({
    teamSize,
    currentTimeHoursPerWeek,
    hourlyRate: 60,
    planMonthlyCost: 199,
    productivityMultiplier: 1.5,
  });

  const monthlyNetValue = Math.round(metrics.monthlyNetSavings);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <MetricCard
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          value={Math.round(metrics.timeSavedPercent)}
          suffix="%"
          label={
            translations['hero.facts.timeSaved'] || 'Save time on communication'
          }
          description={
            translations['hero.facts.timeSaved.desc'] ||
            'Average reduction in time spent on communication tasks.'
          }
          bg="turquoise"
        />
        <MetricCard
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3v18h18M7 13l3 3 7-7"
              />
            </svg>
          }
          value={1.5}
          suffix="×"
          decimals={1}
          label={
            translations['hero.facts.productivityBoost'] ||
            'Faster production with your current team'
          }
          description={
            translations['hero.facts.productivityBoost.desc'] ||
            'Accelerate content creation without increasing headcount.'
          }
          bg="gray"
        />
        <MetricCard
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-2.28 0-4 .94-4 2.5S9.72 13 12 13s4 .94 4 2.5S14.28 18 12 18m0-10V6m0 12v-2"
              />
            </svg>
          }
          value={monthlyNetValue}
          suffix="€"
          label={
            translations['hero.facts.netSavings'] || 'Net savings per month'
          }
          description={
            translations['hero.facts.netSavings.desc'] ||
            "Estimated after plan costs, based on your team's inputs."
          }
          bg="rose"
        />
      </div>
      <div className="px-2 sm:px-0 text-center text-xs text-mediumGray mt-3 font-sans">
        {translations['hero.facts.caption'] ||
          'Based on an estimate of five (5) hours of dedicated communication work per week across the organization and a 199€/month plan'}
      </div>
    </div>
  );
}
