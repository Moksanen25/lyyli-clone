"use client";

import dynamic from "next/dynamic";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { memo, useMemo, useEffect, useState } from "react";

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ProcessStepsProps {
  translations?: any;
}

const steps: ProcessStep[] = [
  {
    number: 1,
    title: "Lyyli learns from you",
    description: "Our AI analyzes your communication patterns, brand voice, and content preferences to understand your unique style.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    number: 2,
    title: "AI suggests content",
    description: "Get AI-generated content suggestions that match your brand voice and communication goals across all channels.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    number: 3,
    title: "You collaborate",
    description: "Collaborate with your team to refine and approve content, ensuring it perfectly represents your organization.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    number: 4,
    title: "Lyyli publishes for you",
    description: "Automatically publish approved content across all your communication channels with perfect timing and formatting.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
  }
];

// Dynamically import framer-motion's motion to avoid bundling it into the initial chunk
const MotionDiv = dynamic(() => import("framer-motion").then(m => m.motion.div), { ssr: false, loading: () => <div /> });
const MotionA = dynamic(() => import("framer-motion").then(m => m.motion.a), { ssr: false, loading: () => <a /> });
const ProcessSteps = memo(function ProcessSteps({ translations }: ProcessStepsProps) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [activeStep, setActiveStep] = useState(0);
  const controls = useAnimation();

  // Smooth progression through steps
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000); // Slower, more elegant progression

    return () => clearInterval(interval);
  }, [inView]);

  // Smooth flowing animation for the process line
  useEffect(() => {
    if (inView) {
      controls.start({
        pathLength: 1,
        transition: { duration: 3, ease: "easeInOut" }
      });
    }
  }, [inView, controls]);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  }), []);

  const stepVariants = useMemo(() => ({
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  }), []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Subtle background flow */}
      <div className="absolute inset-0">
        <MotionDiv 
          className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose/10 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <MotionDiv 
          className="absolute bottom-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-turquoise/10 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <MotionDiv 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl text-forest mb-6 font-playfair font-bold leading-tight">
            {translations?.["howItWorks.title"] || "How Lyyli.ai works"}
          </h2>
          <p className="text-xl text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
            {translations?.["howItWorks.overview.description"] || "A simple, intelligent process that transforms how professional service organizations communicate"}
          </p>
        </MotionDiv>

        <div ref={ref} className="relative">
          {/* Flowing process line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 z-0">
            <MotionDiv 
              className="h-full bg-gradient-to-r from-rose/20 via-turquoise/30 to-forest/20"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
            
            {/* Single flowing element */}
            <MotionDiv
              className="absolute top-0 w-3 h-3 bg-turquoise rounded-full shadow-lg"
              animate={{
                x: ["0%", "100%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
          
          {/* Steps Grid */}
          <MotionDiv 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {steps.map((step, index) => (
              <MotionDiv
                key={step.number}
                className="relative group"
                variants={stepVariants}
              >
                {/* Step Card */}
                <MotionDiv 
                  className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500"
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  animate={{
                    scale: activeStep === index ? 1.02 : 1,
                    boxShadow: activeStep === index 
                      ? "0 25px 50px -12px rgba(0, 0, 0, 0.15)" 
                      : "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {/* Subtle background glow when active */}
                  <MotionDiv 
                    className="absolute inset-0 bg-gradient-to-br from-rose/5 to-turquoise/5 rounded-2xl opacity-0"
                    animate={{
                      opacity: activeStep === index ? 1 : 0
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Large Number */}
                  <MotionDiv 
                    className="text-7xl md:text-8xl font-bold text-forest mb-6 text-center font-sans"
                    animate={{
                      color: activeStep === index ? "#2F5D50" : "#2F5D50"
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {step.number}
                  </MotionDiv>
                  
                  {/* Icon */}
                  <MotionDiv 
                    className="w-16 h-16 bg-white border-2 border-forest rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    animate={{
                      scale: activeStep === index ? 1.1 : 1,
                      boxShadow: activeStep === index 
                        ? "0 20px 25px -5px rgba(0, 0, 0, 0.2)" 
                        : "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-forest">
                      {step.icon}
                    </div>
                  </MotionDiv>
                  
                  {/* Content */}
                  <div className="text-center">
                    <MotionDiv 
                      className="text-xl font-semibold text-forest mb-4 font-sans"
                      animate={{
                        color: activeStep === index ? "#2F5D50" : "#374151"
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {translations?.[`howItWorks.step${step.number}.title`] || step.title}
                    </MotionDiv>
                    <p className="text-mediumGray font-sans leading-relaxed">
                      {translations?.[`howItWorks.step${step.number}.description`] || step.description}
                    </p>
                  </div>

                  {/* Subtle progress indicator */}
                  <MotionDiv 
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-rose to-turquoise rounded-b-2xl"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: activeStep === index ? "100%" : "0%"
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </MotionDiv>


              </MotionDiv>
            ))}
          </MotionDiv>

          {/* Bottom CTA */}
          <MotionDiv 
            className="text-center mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
          >
            <MotionA 
              href="#cta" 
              className="inline-flex items-center px-8 py-4 bg-forest text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-sans"
              whileHover={{ 
                y: -2,
                transition: { duration: 0.2 }
              }}
            >
              {translations?.["howItWorks.cta"] || "Get started with Lyyli.ai"}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </MotionA>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
});

export default ProcessSteps;
