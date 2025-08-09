import { getTranslations } from '../../lib/i18n';
import Tooltip from './Tooltip';

interface PricingTiersProps {
  locale: string;
}

export default function PricingTiers({ locale }: PricingTiersProps) {
  const t = getTranslations(locale);

  const tiers = [
    {
      name: t['pricing.starter.name'],
      price: t['pricing.starter.price'],
      period: t['pricing.starter.period'],
      description: t['pricing.starter.description'],
      cta: t['pricing.starter.cta'],
      ctaHref: '/trial',
      features: [
        {
          text: t['pricing.starter.users'],
          tooltip: t['pricing.tooltip.users']
        },
        {
          text: t['pricing.starter.conversations'],
          tooltip: t['pricing.tooltip.conversations']
        },
        {
          text: t['pricing.starter.integrations'],
          tooltip: t['pricing.tooltip.integrations']
        },
        {
          text: t['pricing.starter.support'],
          tooltip: null
        }
      ]
    },
    {
      name: t['pricing.professional.name'],
      price: t['pricing.professional.price'],
      period: t['pricing.professional.period'],
      description: t['pricing.professional.description'],
      cta: t['pricing.professional.cta'],
      ctaHref: '/trial',
      popular: t['pricing.professional.popular'],
      features: [
        {
          text: t['pricing.professional.users'],
          tooltip: t['pricing.tooltip.users']
        },
        {
          text: t['pricing.professional.conversations'],
          tooltip: t['pricing.tooltip.conversations']
        },
        {
          text: t['pricing.professional.integrations'],
          tooltip: t['pricing.tooltip.integrations']
        },
        {
          text: t['pricing.professional.analytics'],
          tooltip: t['pricing.tooltip.analytics']
        },
        {
          text: t['pricing.professional.audit'],
          tooltip: t['pricing.tooltip.audit']
        },
        {
          text: t['pricing.professional.support'],
          tooltip: null
        }
      ]
    },
    {
      name: t['pricing.enterprise.name'],
      price: t['pricing.enterprise.price'],
      period: t['pricing.enterprise.period'],
      description: t['pricing.enterprise.description'],
      cta: t['pricing.enterprise.cta'],
      ctaHref: '/contact',
      note: t['pricing.enterprise.note'],
      features: [
        {
          text: t['pricing.enterprise.users'],
          tooltip: t['pricing.tooltip.users']
        },
        {
          text: t['pricing.enterprise.conversations'],
          tooltip: t['pricing.tooltip.conversations']
        },
        {
          text: t['pricing.enterprise.integrations'],
          tooltip: t['pricing.tooltip.integrations']
        },
        {
          text: t['pricing.enterprise.compliance'],
          tooltip: null
        },
        {
          text: t['pricing.enterprise.sso'],
          tooltip: null
        },
        {
          text: t['pricing.enterprise.support'],
          tooltip: null
        },
        {
          text: t['pricing.enterprise.sla'],
          tooltip: t['pricing.tooltip.sla']
        }
      ]
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
      {tiers.map((tier, index) => (
        <article 
          key={index} 
          className={`relative bg-white rounded-lg border-2 p-8 ${
            tier.popular 
              ? 'border-forest-green shadow-lg scale-105' 
              : 'border-light-gray hover:border-muted-turquoise hover:shadow-soft'
          } transition-all`}
        >
          {tier.popular && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-forest-green text-white px-4 py-1 rounded-full text-sm font-medium">
                {tier.popular}
              </span>
            </div>
          )}
          
          <div className="text-center mb-8">
            <h3 className="heading-3 mb-2 text-forest-green">
              {tier.name}
            </h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-dark-gray">
                {tier.price}
              </span>
              <span className="text-medium-gray ml-1">
                {tier.period}
              </span>
            </div>
            <p className="body-text text-medium-gray">
              {tier.description}
            </p>
          </div>

          <ul className="space-y-4 mb-8">
            {tier.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-3">
                <svg 
                  className="w-5 h-5 text-forest-green mt-0.5 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="body-text flex items-center gap-2">
                  {feature.text}
                  {feature.tooltip && (
                    <Tooltip content={feature.tooltip} position="top">
                      <svg 
                        className="w-4 h-4 text-medium-gray hover:text-forest-green transition-colors" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </Tooltip>
                  )}
                </span>
              </li>
            ))}
          </ul>

          <div className="space-y-4">
            <a
              href={tier.ctaHref}
              className={`w-full py-3 px-6 rounded-lg font-medium text-center inline-block transition-colors ${
                tier.popular
                  ? 'bg-forest-green text-white hover:bg-opacity-90'
                  : 'border-2 border-forest-green text-forest-green hover:bg-forest-green hover:text-white'
              }`}
              aria-label={`${tier.cta} for ${tier.name} plan`}
            >
              {tier.cta}
            </a>
            
            {tier.note && (
              <p className="small-text text-medium-gray text-center">
                {tier.note}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
