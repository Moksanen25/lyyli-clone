'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ProductShowcaseProps {
  translations: {
    [key: string]: string;
  };
}

export default function ProductShowcase({
  translations,
}: ProductShowcaseProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-white via-rose/20 to-white overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-turquoise/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-rose/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl text-forest mb-6 font-playfair font-bold leading-tight">
            {translations['showcase.title'] ||
              'Your AI assistant, always at hand'}
          </h2>
          <p className="text-xl text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
            {translations['showcase.subtitle'] ||
              'Access Lyyli seamlessly on desktop and mobile. Smart communication assistance wherever you work.'}
          </p>
        </div>

        {/* Desktop and Mobile Showcase */}
        <div className="relative max-w-7xl mx-auto">
          {/* Desktop View - Main focal point */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-forest/10 bg-white">
              {/* Browser chrome effect */}
              <div className="bg-gradient-to-r from-forest to-turquoise px-6 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose" />
                  <div className="w-3 h-3 rounded-full bg-turquoise/70" />
                  <div className="w-3 h-3 rounded-full bg-forest/50" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-white text-sm font-medium">
                    app.lyyli.ai
                  </div>
                </div>
              </div>

              {/* Desktop screenshot */}
              <div className="relative bg-grayLight">
                <Image
                  src="/images/general/Lyyli_dashboard_desktop.png"
                  alt="Lyyli desktop interface showing AI communication assistant dashboard"
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
                />
              </div>
            </div>

            {/* Floating feature badges */}
            <div
              className={`absolute -left-6 top-1/4 transition-all duration-1000 delay-500 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="bg-white rounded-2xl shadow-xl px-6 py-4 border-2 border-turquoise/20 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-turquoise/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-forest"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-forest">
                      {translations['showcase.feature1'] || 'AI-powered'}
                    </p>
                    <p className="text-xs text-mediumGray">
                      {translations['showcase.feature1.desc'] ||
                        'Smart suggestions'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`absolute -right-6 top-2/3 transition-all duration-1000 delay-700 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="bg-white rounded-2xl shadow-xl px-6 py-4 border-2 border-rose/30 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose/30 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-forest"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-forest">
                      {translations['showcase.feature2'] || 'Secure & Private'}
                    </p>
                    <p className="text-xs text-mediumGray">
                      {translations['showcase.feature2.desc'] ||
                        'GDPR compliant'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile View - Floating element */}
          <div
            className={`absolute -bottom-8 -right-4 md:-right-8 w-64 md:w-80 transition-all duration-1000 delay-900 ${
              isVisible
                ? 'opacity-100 translate-y-0 rotate-0'
                : 'opacity-0 translate-y-20 rotate-6'
            }`}
          >
            <div className="relative">
              {/* Mobile device frame */}
              <div className="relative bg-gradient-to-br from-forest to-turquoise p-1.5 rounded-[2.5rem] shadow-2xl">
                <div className="bg-black rounded-[2.25rem] p-2">
                  <div className="relative bg-white rounded-[2rem] overflow-hidden">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-10" />

                    {/* Mobile screenshot */}
                    <div className="relative">
                      <Image
                        src="/images/general/Lyyli_dashboard_mobile.png"
                        alt="Lyyli mobile interface for on-the-go communication"
                        width={390}
                        height={844}
                        className="w-full h-auto"
                        sizes="(max-width: 768px) 256px, 320px"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pulse animation indicator */}
              <div className="absolute -top-2 -right-2">
                <div className="relative">
                  <div className="w-4 h-4 bg-turquoise rounded-full animate-ping absolute" />
                  <div className="w-4 h-4 bg-turquoise rounded-full relative" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-32 md:mt-24 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-lg text-mediumGray mb-6 font-sans">
            {translations['showcase.cta.text'] ||
              'Experience seamless communication across all your devices'}
          </p>
          <a
            href="https://app.lyyli.ai"
            className="inline-flex items-center px-8 py-4 bg-forest text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-sans group"
          >
            {translations['showcase.cta.button'] || 'Try Lyyli now'}
            <svg
              className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
