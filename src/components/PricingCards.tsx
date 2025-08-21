"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  highlight?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: "€0",
    period: "forever",
    description: "Perfect for individuals and small teams getting started",
    features: [
      "Up to 3 team members",
      "Basic AI content generation",
      "Slack integration",
      "5 content pieces per month",
      "Basic analytics",
      "Email support"
    ],
    cta: "Get started free"
  },
  {
    name: "Starter",
    price: "€29",
    period: "per month",
    description: "Ideal for growing teams and small organizations",
    features: [
      "Up to 10 team members",
      "Advanced AI content generation",
      "Slack & Teams integration",
      "Unlimited content pieces",
      "Advanced analytics",
      "Priority email support",
      "Custom brand guidelines",
      "Approval workflows"
    ],
    cta: "Start free trial"
  },
  {
    name: "Growth",
    price: "€79",
    period: "per month",
    description: "Built for scaling organizations with advanced needs",
    features: [
      "Up to 25 team members",
      "Premium AI content generation",
      "All integrations (Slack, Teams, Email)",
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
    price: "€199",
    period: "per month",
    description: "Our most popular plan for established organizations",
    features: [
      "Up to 100 team members",
      "Enterprise AI content generation",
      "All integrations + custom connectors",
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
    price: "Custom",
    period: "pricing",
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

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl text-forest dark:text-white mb-6 font-playfair font-normal leading-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-mediumGray dark:text-white max-w-3xl mx-auto font-sans leading-relaxed">
            Choose the perfect plan for your organization. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative ${plan.highlight ? 'lg:col-span-2 lg:row-span-1' : ''}`}
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
                className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-gray-900/50 border-2 transition-all duration-300 h-full cursor-pointer ${
                  plan.highlight 
                    ? 'border-forest/30 dark:border-forest/50 scale-105 shadow-xl dark:shadow-gray-900/70' 
                    : 'border-gray-200 dark:border-gray-600 hover:border-forest/20 dark:hover:border-forest/40'
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
                    plan.highlight ? 'text-forest dark:text-white' : 'text-forest dark:text-white'
                  }`}>
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-forest dark:text-white font-sans">
                      {plan.price}
                    </span>
                    {plan.period !== "forever" && (
                      <span className="text-mediumGray dark:text-white font-sans">
                        /{plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-mediumGray dark:text-white font-sans">
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
                      <span className="text-sm text-mediumGray dark:text-white font-sans">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-auto">
                  <button className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 font-sans ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-forest to-turquoise text-white hover:shadow-lg hover:-translate-y-1'
                      : 'bg-forest text-white hover:bg-turquoise hover:-translate-y-1'
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
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-600 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-forest dark:text-white mb-4 font-sans">
              Need more information?
            </h3>
            <p className="text-mediumGray dark:text-white font-sans leading-relaxed mb-6">
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
                className="inline-flex items-center px-6 py-3 border-2 border-forest text-forest dark:text-white font-semibold rounded-xl hover:bg-forest hover:text-white transition-all duration-300 font-sans"
              >
                Contact sales team
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
