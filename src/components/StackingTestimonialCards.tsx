'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { normalizeClassName } from '../lib/utils';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Koskinen",
    role: "Marketing Director",
    company: "Nordic Consulting Group",
    content: "Lyyli.ai has transformed how we communicate with our clients. The AI-generated content is consistently on-brand and saves us hours every week. Our team can now focus on strategy instead of content creation.",
    rating: 5
  },
  {
    id: 2,
    name: "Erik Andersson",
    role: "CEO", 
    company: "Tech Solutions Finland",
    content: "The multi-channel publishing feature is a game-changer. We can now maintain consistent messaging across Slack, Teams, and social media without any manual work. ROI was visible within the first month.",
    rating: 5
  },
  {
    id: 3,
    name: "Anna Lindberg",
    role: "Communications Manager",
    company: "Scandinavian Partners", 
    content: "Lyyli.ai understands our brand voice perfectly. The AI suggestions are always relevant and professional, making our communications more engaging and effective. Highly recommended for any professional service company.",
    rating: 5
  },
  {
    id: 4,
    name: "Johan Bergman",
    role: "Operations Director",
    company: "Baltic Business Solutions",
    content: "We've seen a 40% reduction in time spent on internal communications. The approval workflows are seamless, and our team collaboration has improved significantly. This tool pays for itself.",
    rating: 5
  },
  {
    id: 5,
    name: "Sofia Nilsson", 
    role: "Head of Marketing",
    company: "Nordic Innovation Hub",
    content: "The analytics and insights have given us unprecedented visibility into our communication performance. We can now make data-driven decisions about our content strategy and see real results.",
    rating: 5
  }
];

export default function StackingTestimonialCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side before enabling scroll animations
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Track scroll position for forward-flow animation
  useEffect(() => {
    if (!isClient) return;
    
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000); // 4 seconds per testimonial

    return () => clearInterval(interval);
  }, [inView]);

  const getCardStyle = (index: number) => {
    const relativeIndex = (index - currentIndex + testimonials.length) % testimonials.length;
    
    // Only show 3 cards in stack
    if (relativeIndex >= 3) return { display: 'none' };
    
    // Only apply scroll-based animations on the client side
    if (!isClient) {
      return {
        zIndex: 3 - relativeIndex,
        transform: `translateY(${relativeIndex * 6}px) scale(${1 - relativeIndex * 0.03})`,
        opacity: relativeIndex === 0 ? 1 : 0.9 - relativeIndex * 0.25,
        filter: `blur(${relativeIndex * 0.5}px)`,
      };
    }
    
    // Calculate forward-flow animation based on scroll
    const scrollProgress = Math.min((scrollY - (ref.current?.offsetTop || 0) + 400) / 800, 1);
    const forwardOffset = scrollProgress * 120; // Move forward up to 120px
    const depthOffset = scrollProgress * 20; // Subtle depth effect
    
    return {
      zIndex: 3 - relativeIndex,
      transform: `translateY(${relativeIndex * 6 + depthOffset}px) translateX(${forwardOffset}px) scale(${1 - relativeIndex * 0.03}) rotateY(${scrollProgress * 8}deg)`,
      opacity: relativeIndex === 0 ? 1 : 0.9 - relativeIndex * 0.25,
      filter: `blur(${relativeIndex * 0.5}px)`,
    };
  };

  return (
    <section className="py-16 bg-grayLight relative overflow-hidden">
      {/* Animated background elements for forward-flow effect */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute top-1/4 right-0 w-32 h-32 bg-turquoise/20 rounded-full blur-xl"
          style={{
            transform: isClient 
              ? `translateX(${Math.min((scrollY - (ref.current?.offsetTop || 0) + 300) / 600, 1) * -80}px)`
              : 'none'
          }}
        />
        <div 
          className="absolute bottom-1/4 left-0 w-24 h-24 bg-rose/20 rounded-full blur-xl"
          style={{
            transform: isClient 
              ? `translateX(${Math.min((scrollY - (ref.current?.offsetTop || 0) + 300) / 600, 1) * 60}px)`
              : 'none'
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          style={{
            transform: isClient 
              ? `translateX(${Math.min((scrollY - (ref.current?.offsetTop || 0) + 200) / 600, 1) * 60}px) scale(${1 + Math.min((scrollY - (ref.current?.offsetTop || 0) + 200) / 800, 1) * 0.05})`
              : 'none'
          }}
        >
          <h2 className="font-playfair font-bold text-3xl lg:text-4xl text-forest mb-6">
            People around the world love Lyyli
          </h2>
          <p className="font-sans text-lg text-mediumGray max-w-2xl mx-auto">
            Join thousands of professional service companies who trust Lyyli to enhance their communications
          </p>
        </motion.div>

        {/* Stacking Cards Container */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-sm">
            {/* Loading state during hydration */}
            {!isClient && (
              <div className={normalizeClassName(
                "bg-white rounded-2xl p-6 shadow-soft border border-gray-200 h-auto min-h-[320px] flex flex-col animate-pulse"
              )}>
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-5 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-3 mb-8">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="text-center mt-auto">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
                </div>
              </div>
            )}
            
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => {
                const style = getCardStyle(index);
                if (style.display === 'none') return null;
                
                // Prevent hydration mismatch by ensuring consistent initial state
                if (!isClient && index > 0) return null;

                return (
                  <motion.div
                    key={`${testimonial.id}-${currentIndex}-${isClient ? 'client' : 'server'}`}
                    className="absolute inset-0 w-full"
                    initial={{ 
                      opacity: 0, 
                      y: 20,
                      scale: 0.95
                    }}
                    animate={{ 
                      opacity: style.opacity,
                      y: 0,
                      scale: 1,
                      zIndex: style.zIndex
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -20,
                      scale: 0.95,
                      transition: { duration: 0.2 }
                    }}
                    transition={{ 
                      duration: 0.3, 
                      ease: "easeInOut"
                    }}
                    style={{
                      transform: style.transform,
                      zIndex: style.zIndex
                    }}
                  >
                    <div className={normalizeClassName(
                      "bg-white rounded-2xl p-6 shadow-soft border border-gray-200 h-auto min-h-[320px] flex flex-col transition-all duration-300 hover:shadow-medium hover:-translate-y-1"
                    )}>
                      
                      {/* Rating Stars */}
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg 
                            key={i} 
                            className="w-5 h-5 text-amber-400" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-mediumGray font-sans leading-relaxed text-center mb-8 italic flex-grow">
                        "{testimonial.content}"
                      </blockquote>

                      {/* Author Info */}
                      <div className="text-center mt-auto">
                        <div className="w-16 h-16 bg-gradient-to-br from-forest to-turquoise rounded-full flex items-center justify-center mx-auto mb-4 text-white font-semibold text-lg font-sans">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h4 className="font-sans font-bold text-forest text-xl mb-1">
                          {testimonial.name}
                        </h4>
                        <p className="font-sans text-sm text-mediumGray">
                          {testimonial.role}
                        </p>
                        <p className="font-sans text-sm text-mediumGray">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {/* Spacer to maintain container height */}
            <div className="invisible">
              <div className={normalizeClassName("bg-white rounded-2xl p-6 h-[320px]")}></div>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-forest scale-110' 
                  : 'bg-gray-300 hover:bg-turquoise'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-mediumGray font-sans">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-forest rounded-full"></div>
              <span className="text-sm">Trusted by 500+ professional service companies</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-turquoise rounded-full"></div>
              <span className="text-sm">GDPR compliant & hosted in Europe</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
