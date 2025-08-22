"use client";

import { useState } from "react";
import { TranslationKeys } from "../../lib/i18n";

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
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const tiers: PricingTier[] = [
    {
      id: "free",
      name: t["pricing.free.name"],
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: t["pricing.free.description"],
      cta: t["pricing.free.cta"],
      ctaHref: "/waitlist",
      features: [
        t["pricing.features.maxOneUser"],
        t["pricing.features.maxTwentyConversations"],
        t["pricing.features.maxFivePosts"],
        t["pricing.features.webInterface"],
        t["pricing.features.maxTwoIntegrations"],
      ],
    },
    {
      id: "starter",
      name: t["pricing.starter.name"],
      monthlyPrice: 29,
      yearlyPrice: Math.round(29 * 12 * 0.8), // 12 months - 20% discount
      description: t["pricing.starter.description"],
      cta: t["pricing.starter.cta"],
      ctaHref: "/waitlist",
      features: [
        t["pricing.features.maxOneUser"],
        t["pricing.features.maxFiftyConversations"],
        t["pricing.features.maxTenPosts"],
        t["pricing.features.maxThreeIntegrations"],
        t["pricing.features.extensiveCustomization"],
      ],
    },
    {
      id: "growth",
      name: t["pricing.growth.name"],
      monthlyPrice: 199,
      yearlyPrice: Math.round(199 * 12 * 0.8), // 12 months - 20% discount
      description: t["pricing.growth.description"],
      cta: t["pricing.growth.cta"],
      ctaHref: "/waitlist",
      features: [
        t["pricing.features.userManagement3"],
        t["pricing.features.maxHundredConversations"],
        t["pricing.features.unlimitedPosts"],
        t["pricing.features.allIntegrations"],
        t["pricing.features.chatSupport8to20"],
      ],
    },
    {
      id: "professional",
      name: t["pricing.professional.name"],
      monthlyPrice: 599,
      yearlyPrice: Math.round(599 * 12 * 0.8), // 12 months - 20% discount
      description: t["pricing.professional.description"],
      cta: t["pricing.professional.cta"],
      ctaHref: "/waitlist",
      popular: true,
      features: [
        t["pricing.features.userManagement10"],
        t["pricing.features.unlimitedConversations"],
        t["pricing.features.webSlackTeamsApps"],
        t["pricing.features.maxThreeAgents"],
        t["pricing.features.phoneSupport9to15"],
      ],
    },
    {
      id: "enterprise",
      name: t["pricing.enterprise.name"],
      monthlyPrice: 0, // Custom pricing
      yearlyPrice: 0,
      description: t["pricing.enterprise.description"],
      cta: t["pricing.enterprise.cta"],
      ctaHref: "/waitlist",
      features: [
        t["pricing.features.customInstallation"],
        t["pricing.features.allIntegrationsWithAPI"],
        t["pricing.features.customFeatures"],
        t["pricing.features.dedicatedSupport"],
        t["pricing.features.customOnboarding"],
      ],
    },
  ];

  const getPrice = (tier: PricingTier) => {
    if (tier.id === "enterprise") return t["pricing.custom"];
    if (tier.monthlyPrice === 0) return "€0";

    const price =
      billingPeriod === "monthly" ? tier.monthlyPrice : tier.yearlyPrice;
    return `€${price}`;
  };

  const getSavings = (tier: PricingTier) => {
    if (tier.id === "enterprise" || tier.monthlyPrice === 0) return null;
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
            onClick={() => setBillingPeriod("monthly")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
              billingPeriod === "monthly"
                ? "bg-forest text-white shadow-sm"
                : "text-mediumGray hover:text-forest"
            }`}
            aria-pressed={billingPeriod === "monthly"}
          >
            {t["pricing.monthly"]}
          </button>
          <button
            onClick={() => setBillingPeriod("yearly")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
              billingPeriod === "yearly"
                ? "bg-forest text-white shadow-sm"
                : "text-mediumGray hover:text-forest"
            }`}
            aria-pressed={billingPeriod === "yearly"}
          >
            {t["pricing.yearly"]}
          </button>
        </div>
        {billingPeriod === "yearly" && (
          <div className="ml-4 px-3 py-1 bg-forest text-white text-sm rounded-full font-medium">
            {t["pricing.save"]} 20%
          </div>
        )}
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
        {tiers.map((tier, index) => (
          <div
            key={tier.id}
            className={`relative ${index >= 3 ? "md:col-span-2 lg:col-span-3 xl:col-span-1" : ""}`}
          >
            {/* Popular Badge - Positioned to avoid text interference and move with card outline */}
            {tier.popular && (
              <div className="absolute -top-4 -right-2 z-50">
                <div 
                  className="px-5 py-2 text-sm font-bold text-white shadow-xl border-2 border-white rounded-full whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(to right, #2F5D50, #0F766E)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  Most Popular
                </div>
              </div>
            )}

            {/* Plan Card */}
            <div 
              className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 h-full flex flex-col ${
                tier.popular 
                  ? 'border-forest shadow-xl scale-105'  
                  : 'border-gray-200 hover:border-forest/30 hover:shadow-xl'
              }`}
            >
              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2 text-forest">
                  {tier.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-forest">
                    {getPrice(tier)}
                  </span>
                  {tier.id !== "enterprise" && tier.monthlyPrice > 0 && (
                    <span className="text-mediumGray ml-1">
                      /{billingPeriod === "monthly" ? t["pricing.perMonth"] : t["pricing.perYear"]}
                    </span>
                  )}
                </div>
                {billingPeriod === "yearly" && getSavings(tier) && (
                  <p className="text-sm text-forest font-medium mb-2">
                    {t["pricing.savePerYear"].replace(
                      "{amount}",
                      getSavings(tier)!.toString(),
                    )}
                  </p>
                )}
                <p className="text-sm text-mediumGray">
                  {tier.description}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-mediumGray">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button - Force visibility with explicit styles */}
              <div className="mt-auto">
                <a
                  href={tier.ctaHref}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: 'white',
                    background: tier.popular 
                      ? 'linear-gradient(to right, #2F5D50, #0F766E)' 
                      : '#2F5D50',
                    transition: 'all 0.3s ease'
                  }}
                  className="hover:shadow-lg"
                  aria-label={`${tier.cta} for ${tier.name} plan`}
                >
                  {tier.cta}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
