import { TranslationKeys } from "@/lib/i18n";

interface BenefitsSectionProps {
  locale: string;
  translations: TranslationKeys;
}

export default function BenefitsSection({
  locale,
  translations: t,
}: BenefitsSectionProps) {
  const benefits = [
    {
      title: t["pricing.benefits.efficiency.title"],
      value: t["pricing.benefits.efficiency.value"],
      description: t["pricing.benefits.efficiency.description"],
      icon: (
        <svg className="w-12 h-12 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: t["pricing.benefits.cost.title"],
      value: t["pricing.benefits.cost.value"],
      description: t["pricing.benefits.cost.description"],
      icon: (
        <svg className="w-12 h-12 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
    },
    {
      title: t["pricing.benefits.roi.title"],
      value: t["pricing.benefits.roi.value"],
      description: t["pricing.benefits.roi.description"],
      icon: (
        <svg className="w-12 h-12 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
          {t["pricing.benefits.title"]}
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <article
            key={index}
            className="text-center bg-white p-8 rounded-lg shadow-soft border border-grayLight hover:border-turquoise transition-all duration-300 hover:shadow-medium"
          >
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-rose rounded-full">
                {benefit.icon}
              </div>
            </div>
            <div className="text-3xl font-bold text-forest mb-2 font-playfair">
              {benefit.value}
            </div>
            <h3 className="text-xl mb-3 text-forest font-playfair font-bold leading-snug">{benefit.title}</h3>
            <p className="text-base text-mediumGray font-sans leading-relaxed">{benefit.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
