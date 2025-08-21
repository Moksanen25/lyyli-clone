"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

interface ROIStat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
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
    prefix: "€",
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

export default function ROIStats() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section className="py-20 bg-gradient-to-br from-forest/5 to-turquoise/3">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-forest  mb-6 font-playfair font-normal leading-tight">
            Proven results that speak for themselves
          </h2>
          <p className="text-xl text-mediumGray  max-w-3xl mx-auto font-sans leading-relaxed">
            See how Lyyli.ai transforms communication efficiency and delivers measurable business value
          </p>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="bg-white  rounded-2xl p-8 shadow-lg  border border-gray-200  hover:shadow-xl  transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-forest  mb-2 font-sans">
                  {inView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      delay={index * 0.2}
                      separator=","
                      decimals={stat.value % 1 !== 0 ? 1 : 0}
                    />
                  ) : (
                    "0"
                  )}
                  {stat.suffix}
                  {stat.prefix}
                </div>
                <h3 className="text-xl font-semibold text-forest  mb-2 font-sans">
                  {stat.label}
                </h3>
                {stat.description && (
                  <p className="text-mediumGray  text-sm font-sans leading-relaxed">
                    {stat.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional context */}
        <div className="mt-16 text-center">
          <div className="bg-white  rounded-2xl p-8 shadow-lg  border border-gray-200  max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-forest  mb-4 font-playfair">
              Based on real customer data
            </h3>
            <p className="text-mediumGray  font-sans leading-relaxed">
              These statistics are compiled from actual usage data across our customer base, 
              representing the average improvements in communication efficiency, time savings, 
              and return on investment that organizations experience after implementing Lyyli.ai.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
