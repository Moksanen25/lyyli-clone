"use client";

import { useEffect, useState } from 'react';

export default function MobileHeroVisual() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user's motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Simple gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #F4FAF7 0%, #FFFFFF 50%, #F4FAF7 100%)'
        }}
      />

      {/* Mobile-optimized data flow visualization */}
      <div className="absolute inset-0">
        {/* Central hub - simplified and mobile-friendly */}
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full"
          style={{
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(47, 93, 80, 0.2) 0%, rgba(47, 93, 80, 0.1) 70%)',
            border: '3px solid rgba(47, 93, 80, 0.3)',
            boxShadow: '0 0 20px rgba(47, 93, 80, 0.15)'
          }}
        />

        {/* Simplified data streams - fewer, thicker lines for better visibility */}
        <div className="absolute inset-0">
          {/* Top stream */}
          <div 
            className="absolute w-2 h-20"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(47, 93, 80, 0.6), transparent)',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: prefersReducedMotion ? 'none' : 'dataFlow 4s ease-in-out infinite'
            }}
          />

          {/* Right stream */}
          <div 
            className="absolute w-20 h-2"
            style={{
              background: 'linear-gradient(to left, transparent, rgba(47, 93, 80, 0.6), transparent)',
              top: '50%',
              right: '15%',
              transform: 'translateY(-50%)',
              animation: prefersReducedMotion ? 'none' : 'dataFlow 4s ease-in-out infinite 1s'
            }}
          />

          {/* Left stream */}
          <div 
            className="absolute w-20 h-2"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(47, 93, 80, 0.6), transparent)',
              top: '50%',
              left: '15%',
              transform: 'translateY(-50%)',
              animation: prefersReducedMotion ? 'none' : 'dataFlow 4s ease-in-out infinite 2s'
            }}
          />

          {/* Bottom stream */}
          <div 
            className="absolute w-2 h-20"
            style={{
              background: 'linear-gradient(to top, transparent, rgba(47, 93, 80, 0.6), transparent)',
              bottom: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: prefersReducedMotion ? 'none' : 'dataFlow 4s ease-in-out infinite 3s'
            }}
          />
        </div>

        {/* Data nodes - simplified and mobile-friendly */}
        <div className="absolute inset-0">
          {/* Top node */}
          <div 
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: 'rgba(47, 93, 80, 0.8)',
              top: '20%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: prefersReducedMotion ? 'none' : 'dataPulse 3s ease-in-out infinite'
            }}
          />

          {/* Right node */}
          <div 
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: 'rgba(47, 93, 80, 0.8)',
              top: '50%',
              right: '15%',
              transform: 'translate(50%, -50%)',
              animation: prefersReducedMotion ? 'none' : 'dataPulse 3s ease-in-out infinite 0.75s'
            }}
          />

          {/* Left node */}
          <div 
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: 'rgba(47, 93, 80, 0.8)',
              top: '50%',
              left: '15%',
              transform: 'translate(-50%, -50%)',
              animation: prefersReducedMotion ? 'none' : 'dataPulse 3s ease-in-out infinite 1.5s'
            }}
          />

          {/* Bottom node */}
          <div 
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: 'rgba(47, 93, 80, 0.8)',
              bottom: '20%',
              left: '50%',
              transform: 'translate(-50%, 50%)',
              animation: prefersReducedMotion ? 'none' : 'dataPulse 3s ease-in-out infinite 2.25s'
            }}
          />
        </div>

        {/* Subtle connection lines */}
        <div className="absolute inset-0">
          {/* Diagonal connections for visual interest */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
            <defs>
              <linearGradient id="diagonal1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(47, 93, 80, 0.1)" />
                <stop offset="100%" stopColor="rgba(47, 93, 80, 0.1)" />
              </linearGradient>
              <linearGradient id="diagonal2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(47, 93, 80, 0.1)" />
                <stop offset="100%" stopColor="rgba(47, 93, 80, 0.1)" />
              </linearGradient>
            </defs>
            <path
              d="M 20% 20% L 80% 80%"
              stroke="url(#diagonal1)"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M 80% 20% L 20% 80%"
              stroke="url(#diagonal2)"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* CSS Animations - simplified and accessible */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes dataFlow {
              0%, 100% { 
                opacity: 0.4; 
                transform: ${prefersReducedMotion ? 'none' : 'scaleY(0.8)'};
              }
              50% { 
                opacity: 0.8; 
                transform: ${prefersReducedMotion ? 'none' : 'scaleY(1.2)'};
              }
            }
            
            @keyframes dataPulse {
              0%, 100% { 
                opacity: 0.8; 
                transform: ${prefersReducedMotion ? 'none' : 'scale(1)'};
              }
              50% { 
                opacity: 1; 
                transform: ${prefersReducedMotion ? 'none' : 'scale(1.2)'};
              }
            }
            
            @media (prefers-reduced-motion: reduce) {
              * {
                animation: none !important;
              }
            }
            
            /* Mobile-specific optimizations */
            @media (max-width: 768px) {
              .data-stream {
                opacity: 0.7;
              }
            }
          `
        }} />
      </div>

      {/* Bottom fade for seamless transition */}
      <div 
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #FFFFFF 100%)'
        }}
      />
    </div>
  );
}
