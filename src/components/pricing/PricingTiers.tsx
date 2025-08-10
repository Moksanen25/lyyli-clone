'use client';

import { useState } from 'react';
import { getTranslations } from '../../lib/i18n';

interface PricingTiersProps {
  locale: string;
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
  illustration: string;
  features: string[];
}

export default function PricingTiers({ locale }: PricingTiersProps) {
  const t = getTranslations(locale);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const tiers: PricingTier[] = [
    {
      id: 'free',
      name: t['pricing.free'].name,
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: t['pricing.free'].description,
      cta: t['pricing.free'].cta,
      ctaHref: '/trial',
      illustration: 'seedling',
      features: [
        t['pricing.features.maxOneUser'],
        t['pricing.features.maxTwentyConversations'],
        t['pricing.features.maxFivePosts'],
        t['pricing.features.webInterface'],
        t['pricing.features.maxTwoIntegrations']
      ]
    },
    {
      id: 'starter',
      name: t['pricing.starter'].name,
      monthlyPrice: 29,
      yearlyPrice: 23, // 20% discount
      description: t['pricing.starter'].description,
      cta: t['pricing.starter'].cta,
      ctaHref: '/trial',
      illustration: 'rocket',
      features: [
        t['pricing.features.maxOneUser'],
        t['pricing.features.maxFiftyConversations'],
        t['pricing.features.maxTenPosts'],
        t['pricing.features.maxThreeIntegrations'],
        t['pricing.features.extensiveCustomization']
      ]
    },
    {
      id: 'growth',
      name: t['pricing.growth'].name,
      monthlyPrice: 199,
      yearlyPrice: 159, // 20% discount
      description: t['pricing.growth'].description,
      cta: t['pricing.growth'].cta,
      ctaHref: '/trial',
      popular: true,
      illustration: 'trend',
      features: [
        t['pricing.features.userManagement3'],
        t['pricing.features.maxHundredConversations'],
        t['pricing.features.unlimitedPosts'],
        t['pricing.features.allIntegrations'],
        t['pricing.features.chatSupport8to20']
      ]
    },
    {
      id: 'professional',
      name: t['pricing.professional'].name,
      monthlyPrice: 599,
      yearlyPrice: 479, // 20% discount
      description: t['pricing.professional'].description,
      cta: t['pricing.professional'].cta,
      ctaHref: '/trial',
      illustration: 'clipboard',
      features: [
        t['pricing.features.userManagement10'],
        t['pricing.features.unlimitedConversations'],
        t['pricing.features.webSlackTeamsApps'],
        t['pricing.features.maxThreeAgents'],
        t['pricing.features.phoneSupport9to15']
      ]
    },
    {
      id: 'enterprise',
      name: t['pricing.enterprise'].name,
      monthlyPrice: 0, // Custom pricing
      yearlyPrice: 0,
      description: t['pricing.enterprise'].description,
      cta: t['pricing.enterprise'].cta,
      ctaHref: '/contact',
      illustration: 'handshake',
      features: [
        t['pricing.features.customInstallation'],
        t['pricing.features.allIntegrationsWithAPI'],
        t['pricing.features.customFeatures'],
        t['pricing.features.dedicatedSupport'],
        t['pricing.features.customOnboarding']
      ]
    }
  ];

  const getPrice = (tier: PricingTier) => {
    if (tier.id === 'enterprise') return t['pricing.custom'];
    if (tier.monthlyPrice === 0) return '€0';
    
    const price = billingPeriod === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice;
    return `€${price}`;
  };

  const getSavings = (tier: PricingTier) => {
    if (tier.id === 'enterprise' || tier.monthlyPrice === 0) return null;
    const yearlyTotal = tier.yearlyPrice * 12;
    const monthlyTotal = tier.monthlyPrice * 12;
    const savings = monthlyTotal - yearlyTotal;
    return savings;
  };

  const renderIllustration = (type: string) => {
    const iconClass = "w-12 h-12 text-forest-green";
    
    switch (type) {
      case 'seedling':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75L12 18.75l4.185 2.25c-1.303-.485-2.713-.75-4.185-.75zM12 12.75c1.472 0 2.882.265 4.185.75L12 15.75l-4.185-2.25c1.303.485 2.713.75 4.185.75z" />
          </svg>
        );
      case 'rocket':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          </svg>
        );
      case 'trend':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
        );
      case 'clipboard':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.25-4.875c.376.023.75.05 1.124.08.652.065 1.499 1.028 1.499 2.163V8.25m-9.75 0H18a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-9A2.25 2.25 0 016 10.5h.75m9.75 0h-.375a1.125 1.125 0 00-1.125 1.125v.375M7.5 10.5H6.375a1.125 1.125 0 00-1.125 1.125v8.25a1.125 1.125 0 001.125 1.125h3.75a1.125 1.125 0 001.125-1.125v-2.625a1.125 1.125 0 011.125-1.125H15a2.25 2.25 0 002.25-2.25V11.25a1.125 1.125 0 00-1.125-1.125H15v-.375a1.125 1.125 0 00-1.125-1.125h-1.5a1.125 1.125 0 00-1.125 1.125v.375H9.75a1.125 1.125 0 00-1.125 1.125v8.25a1.125 1.125 0 001.125 1.125h.375" />
          </svg>
        );
      case 'handshake':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-12">
      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-light-gray rounded-lg p-1 flex items-center">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'monthly'
                ? 'bg-white text-forest-green shadow-sm'
                : 'text-medium-gray hover:text-forest-green'
            }`}
            aria-pressed={billingPeriod === 'monthly'}
          >
            {t['pricing.monthly']}
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'yearly'
                ? 'bg-white text-forest-green shadow-sm'
                : 'text-medium-gray hover:text-forest-green'
            }`}
            aria-pressed={billingPeriod === 'yearly'}
          >
            {t['pricing.yearly']}
          </button>
        </div>
        {billingPeriod === 'yearly' && (
          <div className="ml-4 px-3 py-1 bg-forest-green text-white text-sm rounded-full">
            {t['pricing.save']} 20%
          </div>
        )}
      </div>

      {/* Pricing Grid - Responsive 1/2/3/5 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-6">
        {tiers.map((tier, index) => (
          <article 
            key={tier.id} 
            className={`relative bg-white rounded-lg border-2 p-6 transition-all ${
              tier.popular 
                ? 'border-forest-green shadow-lg scale-105 lg:col-span-1 xl:col-span-1' 
                : 'border-light-gray hover:border-muted-turquoise hover:shadow-soft'
            } ${index >= 3 ? 'md:col-span-2 lg:col-span-3 xl:col-span-1' : ''}`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-forest-green text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            {/* Plan Illustration */}
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-soft-rose rounded-full">
                {renderIllustration(tier.illustration)}
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="heading-3 mb-2 text-forest-green">
                {tier.name}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-dark-gray">
                  {getPrice(tier)}
                </span>
                {tier.id !== 'enterprise' && tier.monthlyPrice > 0 && (
                  <span className="text-medium-gray ml-1">
                    {billingPeriod === 'monthly' ? t['pricing.perMonth'] : t['pricing.perYear']}
                  </span>
                )}
              </div>
              {billingPeriod === 'yearly' && getSavings(tier) && (
                <p className="text-sm text-forest-green font-medium mb-2">
                  {t['pricing.savePerYear'].replace('{amount}', getSavings(tier)!.toString())}
                </p>
              )}
              <p className="body-text text-medium-gray">
                {tier.description}
              </p>
            </div>

            <ul className="space-y-3 mb-8">
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
                  <span className="small-text text-medium-gray">
                    {feature}
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
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}