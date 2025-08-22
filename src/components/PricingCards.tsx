"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

const plans: PricingPlan[] = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for individuals and small teams getting started",
    features: [
      "Up to 1 team member",
      "Basic AI content generation",
      "Web interface",
      "Up to 20 conversations",
      "Up to 5 posts per month",
      "Up to 2 integrations",
      "Email support"
    ],
    cta: "Get started free"
  },
  {
    name: "Starter",
    monthlyPrice: 29,
    yearlyPrice: Math.round(29 * 12 * 0.8), // 12 months - 20% discount
    description: "Ideal for growing teams and small organizations",
    features: [
      "Up to 1 team member",
      "Advanced AI content generation",
      "Web interface",
      "Up to 50 conversations",
      "Up to 10 posts per month",
      "Up to 3 integrations",
      "Extensive customization",
      "Priority email support"
    ],
    cta: "Start free trial"
  },
  {
    name: "Growth",
    monthlyPrice: 199,
    yearlyPrice: Math.round(199 * 12 * 0.8), // 12 months - 20% discount
    description: "Built for scaling organizations with advanced needs",
    features: [
      "Up to 3 team members",
      "Premium AI content generation",
      "Web, Slack & Teams apps",
      "Up to 100 conversations",
      "Unlimited posts",
      "All integrations",
      "Advanced approval workflows",
      "Team collaboration tools",
      "Performance analytics",
      "Custom templates",
      "Priority support",
      "API access"
    ],
    cta: "Start free trial"
  },
  {
    name: "Professional",
    monthlyPrice: 599,
    yearlyPrice: Math.round(599 * 12 * 0.8), // 12 months - 20% discount
    description: "Our most popular plan for established organizations",
    features: [
      "Up to 10 team members",
      "Enterprise AI content generation",
      "All integrations + custom connectors",
      "Unlimited conversations",
      "Advanced workflow automation",
      "Comprehensive analytics & reporting",
      "Custom integrations",
      "Dedicated account manager",
      "24/7 priority support",
      "Advanced security features",
      "Custom training sessions"
    ],
    cta: "Start free trial",
    popular: true,
    highlight: true
  },
  {
    name: "Enterprise",
    monthlyPrice: 0, // Custom pricing
    yearlyPrice: 0,
    description: "Tailored solutions for large enterprises",
    features: [
      "Unlimited team members",
      "Custom AI model training",
      "White-label solutions",
      "Advanced compliance features",
      "Custom development",
      "Dedicated support team",
      "SLA guarantees",
      "On-premise deployment options",
      "Custom integrations",
      "Executive reporting"
    ],
    cta: "Contact sales"
  }
];

export default function PricingCards() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

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
    if (plan.name === "Enterprise") return "Custom";
    if (plan.monthlyPrice === 0) return "€0";
    
    const price = billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
    return `€${price}`;
  };

  const getPeriod = (plan: PricingPlan) => {
    if (plan.name === "Free") return "forever";
    if (plan.name === "Enterprise") return "";
    return billingPeriod === "monthly" ? "per month" : "per year";
  };

  const getSavings = (plan: PricingPlan) => {
    if (plan.name === "Enterprise" || plan.monthlyPrice === 0) return null;
    const yearlyTotal = plan.yearlyPrice;
    const monthlyTotal = plan.monthlyPrice * 12;
    const savings = monthlyTotal - yearlyTotal;
    return savings;
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl text-forest  mb-6 font-playfair font-normal leading-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-mediumGray  max-w-3xl mx-auto font-sans leading-relaxed">
            Choose the perfect plan for your organization. All plans include a 14-day free trial.
          </p>
        </div>

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
              Monthly
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
              Yearly
            </button>
          </div>
          {billingPeriod === "yearly" && (
            <div className="ml-4 px-3 py-1 bg-forest text-white text-sm rounded-full">
              Save 20%
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative ${index >= 3 ? "md:col-span-2 lg:col-span-3 xl:col-span-1" : ""}`}
              variants={cardVariants}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-forest to-turquoise text-white px-4 py-2 rounded-full text-sm font-semibold font-sans">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Card */}
              <motion.div 
                className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 h-full cursor-pointer ${
                  plan.highlight 
                    ? 'border-forest/30 scale-105 shadow-xl'  
                    : 'border-gray-200 hover:border-forest/20'
                } ${
                  selectedPlan === plan.name ? 'ring-2 ring-forest/50' : ''
                }`}
                whileHover={{ 
                  y: -8,
                  scale: plan.highlight ? 1.08 : 1.02,
                  transition: { duration: 0.2 }
                }}
                onClick={() => setSelectedPlan(plan.name)}
              >
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className={`text-xl font-bold mb-2 font-sans ${
                    plan.highlight ? 'text-forest' : 'text-forest'
                  }`}>
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-forest  font-sans">
                      {getPrice(plan)}
                    </span>
                    {plan.name !== "Free" && plan.name !== "Enterprise" && (
                      <span className="text-mediumGray  font-sans">
                        /{getPeriod(plan)}
                      </span>
                    )}
                  </div>
                  {billingPeriod === "yearly" && getSavings(plan) && (
                    <p className="text-sm text-forest font-medium mb-2">
                      Save €{getSavings(plan)} per year
                    </p>
                  )}
                  <p className="text-sm text-mediumGray  font-sans">
                    {plan.description}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-mediumGray  font-sans">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-auto">
                  <button className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 font-sans text-white shadow-sm hover:shadow-md ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-forest to-turquoise hover:from-forest/90 hover:to-turquoise/90 hover:shadow-lg hover:-translate-y-1'
                      : 'bg-forest hover:bg-turquoise hover:-translate-y-1'
                  }`}>
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Information */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-white  rounded-2xl p-8 shadow-lg  border border-gray-200  max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-forest  mb-4 font-sans">
              Need more information?
            </h3>
            <p className="text-mediumGray  font-sans leading-relaxed mb-6">
              All plans include enterprise-grade security, GDPR compliance, and 99.9% uptime guarantee. 
              Need a custom solution? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/pricing" 
                className="inline-flex items-center px-6 py-3 bg-forest text-white font-semibold rounded-xl hover:bg-turquoise transition-colors duration-300 font-sans"
              >
                View detailed pricing
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 border-2 border-forest text-forest  font-semibold rounded-xl hover:bg-forest hover:text-white transition-all duration-300 font-sans"
              >
                Contact sales team
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
