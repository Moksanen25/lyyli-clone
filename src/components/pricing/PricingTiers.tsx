'use client';

import { useState } from 'react';
import type { TranslationKeys } from '@/lib/i18n';

interface PricingTiersProps {
  translations: TranslationKeys;
}

interface PricingTier {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  cta: string;
  ctaHref: string;
  popular?: boolean;
  features: string[];
}

export default function PricingTiers({ translations }: PricingTiersProps) {
  const t = translations;
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>(
    'monthly'
  );

  const tiers: PricingTier[] = [
    {
      id: 'free',
      name: t['pricing.free.name'],
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: t['pricing.free.description'],
      cta: t['pricing.free.cta'],
      ctaHref: 'https://app.lyyli.ai',
      features: [
        t['pricing.features.guidedOnboarding5Min'],
        t['pricing.features.proactiveIdeas'],
        t['pricing.features.broadToneBrand'],
        t['pricing.features.endToEndEncryption'],
        t['pricing.features.gdprCompliant'],
        t['pricing.features.iso27001Ready'],
        t['pricing.features.realTimeTranslations'],
        t['pricing.features.fiEnInterface'],
      ],
    },
    {
      id: 'launch',
      name: t['pricing.launch.name'],
      monthlyPrice: 39,
      yearlyPrice: Math.round(39 * 12 * 0.8), // 12 months - 20% discount
      description: t['pricing.launch.description'],
      cta: t['pricing.launch.cta'],
      ctaHref: 'https://app.lyyli.ai',
      features: [
        t['pricing.features.everythingInFree'],
        t['pricing.features.aiImageGeneration'],
        t['pricing.features.allAvailableIntegrations'],
        t['pricing.features.prioritySupport'],
      ],
    },
    {
      id: 'growth',
      name: t['pricing.growth.name'],
      monthlyPrice: 69,
      yearlyPrice: Math.round(69 * 12 * 0.8), // 12 months - 20% discount
      description: t['pricing.growth.description'],
      cta: t['pricing.growth.cta'],
      ctaHref: 'https://app.lyyli.ai',
      popular: true,
      features: [
        t['pricing.features.everythingInLaunch'],
        t['pricing.features.upToThousandMessagesPerMonth'],
        t['pricing.features.prioritySupportEmail'],
      ],
    },
    {
      id: 'professional',
      name: t['pricing.professional.name'],
      monthlyPrice: 199,
      yearlyPrice: Math.round(199 * 12 * 0.8), // 12 months - 20% discount
      description: t['pricing.professional.description'],
      cta: t['pricing.professional.cta'],
      ctaHref: 'https://app.lyyli.ai',
      features: [
        t['pricing.features.userManagement10'],
        t['pricing.features.unlimitedConversations'],
        t['pricing.features.webSlackTeamsApps'],
        t['pricing.features.maxThreeAgents'],
        t['pricing.features.phoneSupport9to15'],
      ],
    },
    {
      id: 'enterprise',
      name: t['pricing.enterprise.name'],
      monthlyPrice: 0, // Custom pricing
      yearlyPrice: 0,
      description: t['pricing.enterprise.description'],
      cta: t['pricing.enterprise.cta'],
      ctaHref: 'https://app.lyyli.ai',
      features: [
        t['pricing.features.customInstallation'],
        t['pricing.features.allIntegrationsWithAPI'],
        t['pricing.features.customFeatures'],
        t['pricing.features.dedicatedSupport'],
        t['pricing.features.customOnboarding'],
      ],
    },
  ];

  const getPrice = (tier: PricingTier) => {
    if (tier.id === 'enterprise') return t['pricing.custom'];
    if (tier.monthlyPrice === 0) return '0€';

    const price =
      billingPeriod === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice;
    return `${price}€`;
  };

  const getSavings = (tier: PricingTier) => {
    if (tier.id === 'enterprise' || tier.monthlyPrice === 0) return null;
    const yearlyTotal = tier.yearlyPrice;
    const monthlyTotal = tier.monthlyPrice * 12;
    const savings = monthlyTotal - yearlyTotal;
    return savings;
  };

  return (
    <div className="space-y-16">
      {/* Billing Toggle */}
      <div className="flex justify-center items-center">
        <div className="flex items-center bg-white rounded-xl p-1 border border-gray-200 shadow-sm">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
              billingPeriod === 'monthly'
                ? 'bg-forest text-white shadow-sm'
                : 'text-mediumGray hover:text-forest'
            }`}
            aria-pressed={billingPeriod === 'monthly'}
          >
            {t['pricing.monthly']}
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
              billingPeriod === 'yearly'
                ? 'bg-forest text-white shadow-sm'
                : 'text-mediumGray hover:text-forest'
            }`}
            aria-pressed={billingPeriod === 'yearly'}
          >
            {t['pricing.yearly']}
          </button>
        </div>
        {billingPeriod === 'yearly' && (
          <div className="ml-4 px-3 py-1 bg-forest text-white text-sm rounded-full font-medium">
            {t['pricing.save']} 20%
          </div>
        )}
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
        {tiers.map((tier, index) => (
          <div
            key={tier.id}
            className={`relative ${index >= 3 ? 'md:col-span-2 lg:col-span-3 xl:col-span-1' : ''}`}
          >
            {/* Plan Card */}
            <div
              className={`bg-white rounded-2xl p-6 shadow-lg border transition-all duration-300 h-full flex flex-col ${
                tier.popular
                  ? 'border-turquoise/40 shadow-2xl scale-105 bg-gradient-to-br from-white to-turquoise/5'
                  : 'border-gray-200 hover:border-turquoise/30 hover:shadow-xl'
              }`}
            >
              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl mb-2 text-forest font-playfair font-normal">
                  {tier.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-forest font-sans">
                    {getPrice(tier)}
                  </span>
                  {tier.id !== 'enterprise' && tier.monthlyPrice > 0 && (
                    <span className="text-mediumGray ml-1 font-sans">
                      /
                      {billingPeriod === 'monthly'
                        ? t['pricing.perMonth']
                        : t['pricing.perYear']}
                    </span>
                  )}
                  {tier.id !== 'enterprise' && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-rose/60 text-forest font-sans">
                        {t['pricing.perUserPerMonth']}
                      </span>
                    </div>
                  )}
                </div>
                {billingPeriod === 'yearly' && getSavings(tier) && (
                  <p className="text-sm text-forest font-medium mb-2">
                    {t['pricing.savePerYear'].replace(
                      '{amount}',
                      getSavings(tier)!.toString()
                    )}
                  </p>
                )}
                <p className="text-sm text-mediumGray font-sans">
                  {tier.description}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-forest mt-0.5 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-mediumGray font-sans">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button - Force visibility with explicit styles */}
              <div className="mt-auto">
                <a
                  href={tier.ctaHref}
                  className="block w-full px-4 py-3 rounded-2xl font-sans font-semibold text-center text-white bg-forest hover:bg-[#3A6A5C] transition-all duration-300 hover:shadow-lg"
                  aria-label={`${tier.cta} for ${tier.name} plan`}
                >
                  {tier.cta}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VAT Note */}
      <div className="w-full text-center mt-8">
        <span className="text-sm text-mediumGray font-sans">
          {t['pricing.vatNote']}
        </span>
      </div>
    </div>
  );
}
