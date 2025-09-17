"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { TranslationKeys } from "../lib/i18n";

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  highlight?: boolean;
}

interface PricingCardsProps {
  fullWidth?: boolean;
  locale?: string;
  translations?: TranslationKeys;
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for individuals and small teams getting started",
    features: [
      "Max 1 user",
      "Basic AI generation with limited tone of voice and brand settings",
      "Max 20 AI conversations a week",
      "No integrations",
      "Help & Support library"
    ],
    cta: "Get started free"
  },
  {
    name: "Launch",
    monthlyPrice: 39,
    yearlyPrice: Math.round(39 * 12 * 0.8), // 12 months - 20% discount
    description: "Everything in Free with added capacity for early growth",
    features: [
      "Everything in Free",
      "Basic tone of voice settings",
      "Max 300 messages per month",
      "Up to 3 integrations"
    ],
    cta: "Start free trial"
  },
  {
    name: "Growth",
    monthlyPrice: 69,
    yearlyPrice: Math.round(69 * 12 * 0.8), // 12 months - 20% discount
    description: "Everything in Starter plus team collaboration",
    features: [
      "Everything in Launch",
      "Organization management and user roles",
      "Slack and/or Teams native app",
      "Advanced tone of voice settings",
      "Up to 1000 messages per month",
      "Priority support (email)"
    ],
    cta: "Start free trial",
    popular: true,
    highlight: true
  },
  {
    name: "Professional",
    monthlyPrice: 199,
    yearlyPrice: Math.round(199 * 12 * 0.8), // 12 months - 20% discount
    description: "Advanced features for content optimization, campaigns and reporting",
    features: [
      "Everything in Growth",
      "Advanced AI-analytics to optimize your content and publishing",
      "AI-enhanced Campaign mode to create and manage communication campaigns",
      "Editor mode",
      "AI-enhanced media library with intelligent media suggestions",
      "C-level and management automated KPI-reports",
      "Branded templates for different content: communications plan, management report, weekly report, personnel info",
      "Priority support (email and phone)"
    ],
    cta: "Start free trial"
  },
  {
    name: "Enterprise",
    monthlyPrice: 0, // Custom pricing
    yearlyPrice: 0,
    description: "Tailored solution for larger enterprises",
    features: [
      "Local entity in customer's own environment",
      "Premium support",
      "APIs",
      "Named account manager"
    ],
    cta: "Contact sales"
  }
];

const MotionDiv = dynamic(() => import("framer-motion").then(m => m.motion.div), { ssr: false, loading: () => <div /> });

export default function PricingCards({ fullWidth = false, locale, translations }: PricingCardsProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Feature translation mapping
  const translateFeature = (feature: string): string => {
    const featureMap: { [key: string]: string } = {
      "Max 1 user": "pricing.features.maxOneUser",
      "Basic AI generation with limited tone of voice and brand settings": "pricing.features.basicAILimited",
      "Max 20 AI conversations a week": "pricing.features.maxTwentyConversationsWeek",
      "No integrations": "pricing.features.noIntegrations",
      "Help & Support library": "pricing.features.helpSupportLibrary",
      "Everything in Free": "pricing.features.everythingInFree",
      "Advanced AI content generation with personal suggestions based on your communication": "pricing.features.advancedAIPersonal",
      "Max 50 AI conversations a week": "pricing.features.maxFiftyConversationsWeek",
      "Limited tone of voice and brand settings": "pricing.features.limitedToneBrand",
      "Everything in Starter": "pricing.features.everythingInStarter",
      "User management: max 3 users": "pricing.features.userManagement3",
      "Premium AI content generation with personal suggestions": "pricing.features.premiumAIPersonal",
      "Slack and/or Teams native app": "pricing.features.slackTeamsNative",
      "Unlimited conversations": "pricing.features.unlimitedConversations",
      "Organisation management and advanced tone of voice and brand settings": "pricing.features.orgManagementAdvanced",
      "Priority support (email)": "pricing.features.prioritySupportEmail",
      "Everything in Growth": "pricing.features.everythingInGrowth",
      "Advanced AI-analytics to optimize your content and publishing": "pricing.features.advancedAIAnalytics",
      "AI-enhanced Campaign mode to create and manage communication campaigns": "pricing.features.aiCampaignMode",
      "Editor mode": "pricing.features.editorMode",
      "AI-enhanced media library with intelligent media suggestions": "pricing.features.aiMediaLibrary",
      "C-level and management automated KPI-reports": "pricing.features.automatedKPIReports",
      "Branded templates for different content: communications plan, management report, weekly report, personnel info": "pricing.features.brandedTemplates",
      "Priority support (email and phone)": "pricing.features.prioritySupportEmailPhone",
      "Local entity in customer's own environment": "pricing.features.localEntity",
      "Premium support": "pricing.features.premiumSupport",
      "APIs": "pricing.features.apis",
      "Named account manager": "pricing.features.namedAccountManager"
    };

    const translationKey = featureMap[feature];
    return translationKey ? (translations?.[translationKey as keyof typeof translations] || feature) : feature;
  };

  // Get translated plan data (keeping plan names in English as brand identifiers)
  const getTranslatedPlans = () => {
    return plans.map(plan => ({
      ...plan,
      // Keep plan names in English - they are brand identifiers
      description: translations?.[`pricing.${plan.name.toLowerCase()}.description` as keyof typeof translations] || plan.description,
      cta: (plan.name === "Professional" || plan.name === "Enterprise") 
        ? (translations?.["waitlist.joinWaitlist" as keyof typeof translations] || "Join waitlist")
        : (translations?.[`pricing.${plan.name.toLowerCase()}.cta` as keyof typeof translations] || plan.cta),
      features: plan.features.map(feature => translateFeature(feature))
    }));
  };

  const translatedPlans = getTranslatedPlans();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const getPrice = (plan: PricingPlan) => {
    if (plan.name === "Enterprise") return "";
    if (plan.monthlyPrice === 0) return "0€";
    
    const price = billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
    return `${price}€`;
  };

  const getPricePeriod = (plan: PricingPlan) => {
    if (plan.name === "Enterprise" || plan.name === "Free") return "";
    return billingPeriod === "monthly" ? (translations?.["pricing.perMonth"] || "/month") : (translations?.["pricing.perYear"] || "/year");
  };

  const getPeriod = (plan: PricingPlan) => {
    // Period is now included in getPrice, so return empty for all plans
    return "";
  };

  const getSavings = (plan: PricingPlan) => {
    if (plan.name === "Enterprise" || plan.monthlyPrice === 0) return null;
    const yearlyTotal = plan.yearlyPrice;
    const monthlyTotal = plan.monthlyPrice * 12;
    const savings = monthlyTotal - yearlyTotal;
    return savings;
  };

  return (
    <section className={`${fullWidth ? 'py-0' : 'py-16 lg:py-24'}`}>
      <div className={fullWidth ? "w-full px-4" : "container mx-auto px-4"}>
        
        {/* Section Heading */}
        {!fullWidth && (
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-forest mb-6 font-playfair font-bold leading-tight">
              {translations?.["pricing.title"] || "Simple, transparent pricing"}
            </h2>
            <p className="text-xl text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {translations?.["pricing.subtitle"] || "Choose the plan that fits your organization's needs"}
            </p>
          </div>
        )}

        {/* Billing Toggle */}
        <div className="flex justify-center items-center mb-12">
          <div className="flex items-center bg-white rounded-xl p-1 border border-gray-200">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                billingPeriod === "monthly"
                  ? "bg-forest text-white"
                  : "text-mediumGray hover:text-forest"
              }`}
              aria-pressed={billingPeriod === "monthly"}
            >
              {translations?.["pricing.monthly"] || "Monthly"}
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                billingPeriod === "yearly"
                  ? "bg-forest text-white"
                  : "text-mediumGray hover:text-forest"
              }`}
              aria-pressed={billingPeriod === "yearly"}
            >
              {translations?.["pricing.yearly"] || "Yearly"}
            </button>
          </div>
          <div className={`ml-4 px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
            billingPeriod === "yearly" 
              ? "bg-forest text-white" 
              : "bg-turquoise/10 text-forest border border-turquoise/30"
          }`}>
            {billingPeriod === "yearly" 
              ? `${translations?.["pricing.save"] || "Save"} 20%`
              : `20% ${(translations?.["pricing.save"] || "off").toLowerCase()} ${(translations?.["pricing.yearly"] || "yearly").toLowerCase()}`
            }
          </div>
        </div>

        {/* Pricing Cards */}
        <MotionDiv 
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-7xl mx-auto ${fullWidth ? 'w-full' : ''}`}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {translatedPlans.map((plan, index) => (
            <MotionDiv
              key={plan.name}
              className={`relative ${index >= 3 ? "md:col-span-2 lg:col-span-3 xl:col-span-1" : ""}`}
              variants={cardVariants}
            >
              {/* Popular Badge - Enhanced positioning and styling */}
              {plan.popular && (
                <div className="absolute -top-4 -right-3 z-50">
                  <div 
                    className="px-4 py-2 text-xs font-bold text-white shadow-2xl border-2 border-white rounded-full whitespace-nowrap transform rotate-12"
                    style={{
                      background: 'linear-gradient(135deg, #2F5D50 0%, #A7D6D1 100%)',
                      boxShadow: '0 25px 50px -12px rgba(47, 93, 80, 0.25), 0 0 0 1px rgba(167, 214, 209, 0.1)',
                    }}
                  >
                    ⭐ Most Popular
                  </div>
                </div>
              )}

              {/* Plan Card */}
              <MotionDiv 
                className={`${
                  plan.name === "Professional" || plan.name === "Enterprise" 
                    ? 'bg-gradient-to-br from-grayLight to-white' 
                    : 'bg-white'
                } rounded-2xl p-6 shadow-lg border transition-all duration-300 h-full cursor-pointer ${
                  plan.popular 
                    ? 'border-turquoise/40 shadow-2xl scale-105 bg-gradient-to-br from-white to-turquoise/5'  
                    : 'border-gray-200 hover:border-turquoise/30 hover:shadow-xl'
                } ${
                  selectedPlan === plan.name ? 'ring-2 ring-turquoise/50' : ''
                }`}
                whileHover={{ 
                  y: -8,
                  scale: plan.highlight ? 1.08 : 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                onClick={() => setSelectedPlan(plan.name)}
              >
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className={`text-xl mb-2 font-playfair font-normal ${
                    plan.highlight ? 'text-forest' : 'text-forest'
                  }`}>
                    {plan.name}
                  </h3>
                  <div className="mb-4 flex flex-col items-center">
                    {plan.name === "Enterprise" ? (
                      <div className="inline-flex items-center px-4 py-2 bg-forest hover:bg-[#3A6A5C] transition-colors duration-200 rounded-full">
                        <span className="text-lg font-semibold text-white font-sans">
                          Contact us
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="relative mb-2">
                          {/* Enhanced Price Tag Background */}
                          <div className="bg-gradient-to-br from-turquoise/30 to-rose/30 rounded-2xl px-6 py-4 border-2 border-turquoise/40 shadow-xl relative overflow-hidden">
                            {/* Subtle shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
                            <div className="text-center relative z-10">
                              <span className="text-2xl font-bold text-forest font-sans">
                                {getPrice(plan)}
                              </span>
                            </div>
                          </div>
                          {/* Enhanced Price Tag Corner */}
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-turquoise to-forest rounded-full border-2 border-white shadow-lg"></div>
                        </div>
                        {/* Period text outside the tag */}
                        {getPricePeriod(plan) && (
                          <span className="text-sm text-mediumGray font-sans">
                            {getPricePeriod(plan)}
                          </span>
                        )}
                        {/* Per user/month pill */}
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-rose/60 text-forest font-sans">
                            {translations?.["pricing.perUserPerMonth"] || "per user per month"}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  {billingPeriod === "yearly" && getSavings(plan) && (
                    <p className="text-sm text-forest font-medium mb-2">
                      Save €{getSavings(plan)} per year
                    </p>
                  )}
                  <p className="text-sm text-mediumGray font-sans">
                    {plan.description}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-forest mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-mediumGray font-sans">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-auto">
                  {(plan.name === "Professional" || plan.name === "Enterprise") ? (
                    <a
                      href={`/${locale || 'en'}/waitlist`}
                      className="block w-full px-4 py-3 rounded-2xl font-sans font-semibold text-center text-white bg-forest hover:bg-[#3A6A5C] transition-all duration-300 hover:shadow-lg"
                    >
                      {plan.cta}
                    </a>
                  ) : (
                    <button 
                      className="block w-full px-4 py-3 rounded-2xl font-sans font-semibold text-center text-white bg-forest hover:bg-[#3A6A5C] transition-all duration-300 hover:shadow-lg"
                    >
                      {plan.cta}
                    </button>
                  )}
                </div>
              </MotionDiv>
            </MotionDiv>
          ))}
        </MotionDiv>

        {/* Per-user note under cards */}
        <div className="w-full text-center mt-12">
          <span className="text-sm text-mediumGray font-sans">
            {(translations?.["pricing.pricingNote"] || "All prices shown are per user per month, billed {period}.")
              .replace(
                "{period}",
                translations?.[billingPeriod === "monthly" ? "pricing.monthly" : "pricing.yearly"] || (billingPeriod === "monthly" ? "Monthly" : "Yearly")
              )}
          </span>
        </div>

        {/* Additional Information */}
        <MotionDiv 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-white to-turquoise/5 rounded-2xl p-8 shadow-xl border border-turquoise/20 max-w-4xl mx-auto">
            <h3 className="text-2xl text-forest mb-4 font-playfair font-normal">
              Need more information?
            </h3>
            <p className="text-mediumGray font-sans leading-relaxed mb-6">
              All plans include enterprise-grade security, GDPR compliance, and 99.9% uptime guarantee. 
              Need a custom solution? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/pricing" 
                className="inline-flex items-center px-6 py-3 bg-forest text-white font-semibold rounded-2xl hover:bg-turquoise transition-all duration-300 font-sans hover:shadow-lg hover:-translate-y-1"
              >
                {translations?.["pricing.moreInfo.viewPricing" as keyof typeof translations] || "View detailed pricing"}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 border-2 border-forest text-forest font-semibold rounded-2xl hover:bg-forest hover:text-white transition-all duration-300 font-sans hover:shadow-lg hover:-translate-y-1"
              >
                {translations?.["pricing.moreInfo.contactSales" as keyof typeof translations] || "Contact sales team"}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
