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
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Subtle decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-40 left-20 w-96 h-96 bg-turquoise/20 rounded-full blur-[100px] animate-float" />
        <div
          className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-rose/20 rounded-full blur-[120px] animate-float"
          style={{ animationDelay: '2s' }}
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
            className={`relative transition-all duration-1000 ease-out delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-95'
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(47,93,80,0.3)] border border-forest/10">
              {/* Browser chrome effect */}
              <div className="bg-forest px-4 py-2.5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose/80" />
                  <div className="w-3 h-3 rounded-full bg-turquoise/60" />
                  <div className="w-3 h-3 rounded-full bg-turquoise/40" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-md px-3 py-1 text-white text-xs font-medium tracking-wide">
                    app.lyyli.ai
                  </div>
                </div>
              </div>

              {/* Desktop screenshot */}
              <div className="relative">
                <Image
                  src="/images/general/Lyyli_dashboard_desktop.png"
                  alt="Lyyli desktop interface showing AI communication assistant dashboard"
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
                  quality={95}
                  unoptimized
                />
              </div>
            </div>

            {/* Floating feature badges */}
            <div
              className={`hidden lg:block absolute -left-8 top-1/4 transition-all duration-1000 ease-out delay-400 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-5 py-3.5 border border-turquoise/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-turquoise/20 to-turquoise/5 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-forest"
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
                    <p className="text-sm font-bold text-forest">
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
              className={`hidden lg:block absolute -right-8 bottom-1/4 transition-all duration-1000 ease-out delay-600 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-12'
              }`}
            >
              <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-5 py-3.5 border border-rose/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose/30 to-rose/10 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-forest"
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
                    <p className="text-sm font-bold text-forest">
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

          {/* Mobile View - Floating element with proper 9:16 aspect ratio */}
          <div
            className={`absolute -bottom-12 -right-6 lg:-right-12 w-48 lg:w-56 transition-all duration-1200 ease-out delay-800 ${
              isVisible
                ? 'opacity-100 translate-y-0 rotate-0'
                : 'opacity-0 translate-y-16 rotate-3'
            }`}
          >
            <div className="relative">
              {/* Mobile device frame with 9:16 aspect ratio */}
              <div className="relative bg-gradient-to-br from-forest via-forest to-turquoise/80 p-[3px] rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(47,93,80,0.5)]">
                <div className="bg-[#1a1a1a] rounded-[1.85rem] p-[2px]">
                  <div
                    className="relative bg-white rounded-[1.75rem] overflow-hidden"
                    style={{ aspectRatio: '9/19.5' }}
                  >
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#1a1a1a] rounded-b-2xl z-10" />

                    {/* Mobile screenshot */}
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/general/Lyyli_dashboard_mobile.png"
                        alt="Lyyli mobile interface for on-the-go communication"
                        width={390}
                        height={844}
                        className="w-full h-full object-cover object-top"
                        sizes="(max-width: 768px) 192px, 224px"
                        quality={95}
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Active indicator */}
              <div className="absolute top-3 right-3 z-20">
                <div className="relative">
                  <div className="w-3 h-3 bg-turquoise rounded-full animate-ping absolute opacity-75" />
                  <div className="w-3 h-3 bg-turquoise rounded-full relative shadow-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-40 lg:mt-32 transition-all duration-1000 ease-out delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-lg text-mediumGray mb-8 font-sans max-w-2xl mx-auto">
            {translations['showcase.cta.text'] ||
              'Experience seamless communication across all your devices'}
          </p>
          <a
            href="https://app.lyyli.ai"
            className="inline-flex items-center px-8 py-4 bg-forest text-white font-semibold rounded-lg shadow-[0_4px_14px_0_rgba(47,93,80,0.39)] hover:shadow-[0_6px_20px_rgba(47,93,80,0.5)] transition-all duration-300 hover:-translate-y-0.5 font-sans group"
          >
            {translations['showcase.cta.button'] || 'Try Lyyli now'}
            <svg
              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
            transform: translateY(-30px) translateX(15px);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
