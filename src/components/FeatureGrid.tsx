"use client";

import dynamic from "next/dynamic";
import IconSet from "./IconSet";
import { useInView } from "react-intersection-observer";
import { memo, useMemo, useCallback } from "react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: "ai" | "communication" | "automation" | "analytics";
}

// Features that should show as coming soon with transparent/gradient background
const comingSoonFeatureTitles = new Set<string>([
  "Advanced AI‑analytics",
  "AI‑enhanced Campaign mode",
  "AI‑enhanced media library",
  "Automated KPI‑reports",
  "Branded templates",
]);

const features: Feature[] = [
  {
    icon: <IconSet.ToneBasic className="w-8 h-8" />,
    title: "Basic tone of voice settings",
    description: "Set foundational brand voice parameters for consistent messaging across channels.",
    category: "ai"
  },
  {
    icon: <IconSet.ToneAdvanced className="w-8 h-8" />,
    title: "Advanced tone of voice settings",
    description: "Fine‑tune tone, style and terminology per channel, audience and use case.",
    category: "ai"
  },
  {
    icon: <IconSet.Integration className="w-8 h-8" />,
    title: "Integrations",
    description: "Connect Outlook, Gmail, Slack, Teams, SharePoint and more.",
    category: "communication"
  },
  {
    icon: <IconSet.Editor className="w-8 h-8" />,
    title: "Editor mode",
    description: "Review, edit and approve content with clear version history and control.",
    category: "automation"
  },
  {
    icon: <IconSet.OrgRoles className="w-8 h-8" />,
    title: "Organization management and user roles",
    description: "Structure teams, assign roles and manage permissions safely.",
    category: "communication"
  },
  {
    icon: <IconSet.SlackTeams className="w-8 h-8" />,
    title: "Slack and/or Teams native app",
    description: "Use Lyyli directly in Slack and Microsoft Teams.",
    category: "communication"
  },
  {
    icon: <IconSet.AIAnalytics className="w-8 h-8" />,
    title: "Advanced AI‑analytics",
    description: "Optimize content and publishing with AI‑driven insights and benchmarks.",
    category: "analytics"
  },
  {
    icon: <IconSet.CampaignMode className="w-8 h-8" />,
    title: "AI‑enhanced Campaign mode",
    description: "Plan and manage multi‑channel communication campaigns with guidance.",
    category: "automation"
  },
  {
    icon: <IconSet.MediaLibrary className="w-8 h-8" />,
    title: "AI‑enhanced media library",
    description: "Smart media suggestions and organized assets ready for publishing.",
    category: "ai"
  },
  {
    icon: <IconSet.KPIReports className="w-8 h-8" />,
    title: "Automated KPI‑reports",
    description: "C‑level and management dashboards with automated KPI reporting.",
    category: "analytics"
  },
  {
    icon: <IconSet.Templates className="w-8 h-8" />,
    title: "Branded templates",
    description: "Templates for communications plan, management report, weekly report and personnel info.",
    category: "automation"
  },
  {
    icon: <IconSet.Onboarding className="w-8 h-8" />,
    title: "Guided onboarding",
    description: "Best‑practice onboarding that gets your organization productive quickly.",
    category: "communication"
  }
];

const categoryColors = {
  ai: "from-forest to-turquoise",
  communication: "from-turquoise to-rose",
  automation: "from-rose to-forest",
  analytics: "from-forest to-rose"
};

interface FeatureGridProps {
  translations?: any;
}

const MotionDiv = dynamic(() => import("framer-motion").then(m => m.motion.div), { ssr: false, loading: () => <div /> });

const FeatureGrid = memo(function FeatureGrid({ translations }: FeatureGridProps) {
  const [ref, inView] = useInView({
    threshold: 0.05,
    triggerOnce: true
  });

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }), []);

  const cardVariants = useMemo(() => ({
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  }), []);

  // Memoize the translation key function
  const getFeatureTranslationKey = useCallback((title: string) => {
    const keyMap: { [key: string]: string } = {
      "Basic tone of voice settings": "basicTone",
      "Advanced tone of voice settings": "advancedTone",
      "Integrations": "integrations",
      "Editor mode": "editor",
      "Organization management and user roles": "orgRoles",
      "Slack and/or Teams native app": "slackTeams",
      "Advanced AI‑analytics": "advancedAIAnalytics",
      "AI‑enhanced Campaign mode": "campaignMode",
      "AI‑enhanced media library": "mediaLibrary",
      "Automated KPI‑reports": "kpiReports",
      "Branded templates": "brandedTemplates",
      "Guided onboarding": "guidedOnboarding"
    };
    return keyMap[title] || title.toLowerCase().replace(/\s+/g, '');
  }, []);



  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl text-forest mb-6 font-playfair font-bold leading-tight">
            {translations?.["features.hero.title"] || "Powerful features for modern communication"}
          </h2>
          <p className="text-xl text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
            {translations?.["features.hero.subtitle"] || "Everything you need to streamline your communication workflow and amplify your brand message"}
          </p>
        </div>

        <MotionDiv 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature) => {
            const translationKey = getFeatureTranslationKey(feature.title);
            const isComingSoon = comingSoonFeatureTitles.has(feature.title);
            return (
              <MotionDiv
                key={feature.title}
                className="group"
                variants={cardVariants}
              >
                <MotionDiv 
                  className={`${
                    isComingSoon 
                      ? 'bg-gradient-to-br from-grayLight to-white' 
                      : 'bg-white'
                  } rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 h-full relative`}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  {isComingSoon && (
                    <div className="absolute top-4 right-4">
                      <div className="px-2 py-1 text-xs rounded-full font-semibold bg-forest/90 text-white shadow-md">Coming soon</div>
                    </div>
                  )}
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${categoryColors[feature.category]} rounded-2xl flex items-center justify-center mb-6 text-forest group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg text-forest mb-3 font-playfair font-normal group-hover:text-turquoise transition-colors duration-300">
                    {translations?.[`features.grid.${translationKey}.title`] || feature.title}
                  </h3>
                  <p className="text-mediumGray text-sm font-sans leading-relaxed">
                    {translations?.[`features.grid.${translationKey}.description`] || feature.description}
                  </p>
                  
                  {/* Hover indicator */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-forest to-turquoise rounded-full" />
                  </div>
                </MotionDiv>
              </MotionDiv>
            );
          })}
        </MotionDiv>

        {/* Bottom CTA */}
        <MotionDiv 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <a 
            href="/features" 
            className="inline-flex items-center px-8 py-4 bg-forest text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-turquoise font-sans"
          >
            {translations?.["features.hero.cta"] || "Explore all features"}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </MotionDiv>
      </div>
    </section>
  );
});

export default FeatureGrid;
