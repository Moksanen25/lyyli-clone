import type { TranslationKeys } from '@/lib/i18n';
import { computeRoiMetrics } from '@/lib/roi';
import MetricCard from '@/components/MetricCard';
import FlipCard from '@/components/FlipCard';

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
        <FlipCard
          ariaLabel={
            (translations['hero.facts.timeSaved'] as string) ||
            'Save time on communication'
          }
          front={
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
                translations['hero.facts.timeSaved'] ||
                'Save time on communication'
              }
              description={
                translations['hero.facts.timeSavedDesc'] ||
                'Average time saved on communication tasks.'
              }
              bg="gray"
            />
          }
          back={
            <div className="rounded-2xl p-6 bg-rose/10 border border-gray-200 text-center">
              <h4 className="text-forest font-playfair font-bold text-lg">
                {translations['hero.facts.timeSaved'] ||
                  'Save time on communication'}
              </h4>
              <p className="mt-2 text-darkGray font-sans text-sm leading-relaxed">
                {translations['hero.facts.timeSavedDesc'] ||
                  'Average time saved on communication tasks.'}
              </p>
            </div>
          }
        />
        <FlipCard
          ariaLabel={
            (translations['hero.facts.productivityBoost'] as string) ||
            'Faster production with your current team'
          }
          front={
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
                translations['hero.facts.productivityBoostDesc'] ||
                'Produce more content without new hires.'
              }
              bg="gray"
            />
          }
          back={
            <div className="rounded-2xl p-6 bg-turquoise/10 border border-gray-200 text-center">
              <h4 className="text-forest font-playfair font-bold text-lg">
                {translations['hero.facts.productivityBoost'] ||
                  'Faster production with your current team'}
              </h4>
              <p className="mt-2 text-darkGray font-sans text-sm leading-relaxed">
                {translations['hero.facts.productivityBoostDesc'] ||
                  'Produce more content without new hires.'}
              </p>
            </div>
          }
        />
        <FlipCard
          ariaLabel={
            (translations['hero.facts.netSavings'] as string) ||
            'Net savings per month'
          }
          front={
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
                translations['hero.facts.netSavingsDesc'] ||
                'Estimate for a 10-person team, plan costs deducted.'
              }
              bg="gray"
            />
          }
          back={
            <div className="rounded-2xl p-6 bg-rose/10 border border-gray-200 text-center">
              <h4 className="text-forest font-playfair font-bold text-lg">
                {translations['hero.facts.netSavings'] ||
                  'Net savings per month'}
              </h4>
              <p className="mt-2 text-darkGray font-sans text-sm leading-relaxed">
                {translations['hero.facts.netSavingsDesc'] ||
                  'Estimate for a 10-person team, plan costs deducted.'}
              </p>
            </div>
          }
        />
      </div>
      <div className="px-2 sm:px-0 text-center text-xs text-mediumGray mt-6 mb-4 font-sans">
        {translations['hero.facts.caption'] ||
          'Based on an estimate of five (5) hours of dedicated communication work per week across the organization and a 199€/month plan'}
      </div>
    </div>
  );
}
