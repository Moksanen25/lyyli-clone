import { TranslationKeys } from '../../lib/i18n';

interface BenefitsSectionProps {
  locale: string;
  translations: TranslationKeys;
}

export default function BenefitsSection({ locale, translations: t }: BenefitsSectionProps) {

  const benefits = [
    {
      title: t['pricing.benefits.efficiency.title'],
      value: t['pricing.benefits.efficiency.value'],
      description: t['pricing.benefits.efficiency.description'],
      icon: '⚡'
    },
    {
      title: t['pricing.benefits.cost.title'],
      value: t['pricing.benefits.cost.value'],
      description: t['pricing.benefits.cost.description'],
      icon: '💰'
    },
    {
      title: t['pricing.benefits.roi.title'],
      value: t['pricing.benefits.roi.value'],
      description: t['pricing.benefits.roi.description'],
      icon: '📈'
    }
  ];

  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="heading-2 mb-4 text-forest-green">
          {t['pricing.benefits.title']}
        </h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <article key={index} className="text-center bg-white p-8 rounded-lg shadow-soft">
            <div className="text-4xl mb-4" aria-hidden="true">
              {benefit.icon}
            </div>
            <div className="text-3xl font-bold text-forest-green mb-2">
              {benefit.value}
            </div>
            <h3 className="heading-4 mb-3 text-dark-gray">
              {benefit.title}
            </h3>
            <p className="body-text text-medium-gray">
              {benefit.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
