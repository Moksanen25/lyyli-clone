"use client";

import { useInView } from "react-intersection-observer";
import { memo } from "react";
import AnimatedNumber from "./AnimatedNumber";
import type { TranslationKeys } from "@/lib/i18n";

interface ROIStat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

interface ROIStatsProps {
  translations?: TranslationKeys;
}

const stats: ROIStat[] = [
  {
    value: 80,
    suffix: "%",
    label: "ROI",
    description: "Average return on investment"
  },
  {
    value: 39852,
    suffix: "€",
    label: "Annual savings",
    description: "Per team member"
  },
  {
    value: 15,
    suffix: "hrs/week",
    label: "Time saved",
    description: "On communication tasks"
  },
  {
    value: 95,
    suffix: "%",
    label: "Satisfaction",
    description: "Customer satisfaction rate"
  }
];

const ROIStats = memo(({ translations }: ROIStatsProps) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section className="py-20 bg-gradient-to-br from-forest/5 to-turquoise/3">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-forest mb-6 font-playfair font-bold leading-tight">
            {translations?.["roiStats.title"] || "Proven results that speak for themselves"}
          </h2>
          <p className="text-xl text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
            {translations?.["roiStats.subtitle"] || "See how Lyyli.ai transforms communication efficiency and delivers measurable business value"}
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[200px] md:min-h-[220px] flex flex-col justify-center"
            >
              <div className="text-center">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-forest mb-4 font-playfair">
                    {inView ? (
                      <AnimatedNumber
                        value={stat.value}
                        duration={2500 + index * 200}
                        suffix={stat.suffix}
                        prefix={stat.prefix}
                        decimals={stat.value % 1 !== 0 ? 1 : 0}
                        separator=","
                      />
                    ) : (
                      <>
                        {stat.prefix}0{stat.suffix}
                      </>
                    )}
                  </div>
                <h3 className="text-lg md:text-xl text-forest mb-3 font-playfair font-normal">
                  {translations?.[`roiStats.metrics.${stat.label.toLowerCase().replace(/\s+/g, '')}.title`] || stat.label}
                </h3>
                {stat.description && (
                  <p className="text-mediumGray text-xs md:text-sm font-sans leading-relaxed mt-2">
                    {translations?.[`roiStats.metrics.${stat.label.toLowerCase().replace(/\s+/g, '')}.description`] || stat.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional context */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-forest mb-4 font-playfair">
              {translations?.["roiStats.basedOnRealData.title"] || "Based on real customer data"}
            </h3>
            <p className="text-mediumGray font-sans leading-relaxed">
              {translations?.["roiStats.basedOnRealData.description"] || "These statistics are compiled from actual usage data across our customer base, representing the average improvements in communication efficiency, time savings, and return on investment that organizations experience after implementing Lyyli.ai."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ROIStats;
