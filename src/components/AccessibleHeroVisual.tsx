"use client";

import { useEffect, useState } from 'react';

export default function AccessibleHeroVisual() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check user's motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      {/* Full visualization with animations */}
      <div className="absolute inset-0">
        
        {/* Central hub */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(47, 93, 80, 0.2) 0%, rgba(47, 93, 80, 0.1) 70%)',
            border: '3px solid rgba(47, 93, 80, 0.3)',
            boxShadow: '0 0 20px rgba(47, 93, 80, 0.15)',
            animation: prefersReducedMotion ? 'none' : 'hubPulse 4s ease-in-out infinite'
          }}
        />
        
        {/* Animated data streams */}
        <div className="absolute inset-0">
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
        
        {/* Animated data nodes */}
        <div className="absolute inset-0">
          <div 
            className="absolute w-4 h-4 bg-forest/80 rounded-full"
            style={{
              top: '20%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: prefersReducedMotion ? 'none' : 'dataPulse 3s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute w-4 h-4 bg-forest/80 rounded-full"
            style={{
              top: '50%',
              right: '15%',
              transform: 'translate(50%, -50%)',
              animation: prefersReducedMotion ? 'none' : 'dataPulse 3s ease-in-out infinite 0.75s'
            }}
          />
          <div 
            className="absolute w-4 h-4 bg-forest/80 rounded-full"
            style={{
              top: '50%',
              left: '15%',
              transform: 'translate(-50%, -50%)',
              animation: prefersReducedMotion ? 'none' : 'dataPulse 3s ease-in-out infinite 1.5s'
            }}
          />
          <div 
            className="absolute w-4 h-4 bg-forest/80 rounded-full"
            style={{
              bottom: '20%',
              left: '50%',
              transform: 'translate(-50%, 50%)',
              animation: prefersReducedMotion ? 'none' : 'dataPulse 3s ease-in-out infinite 2.25s'
            }}
          />
        </div>
      </div>

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes hubPulse {
            0%, 100% { 
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.8;
            }
            50% { 
              transform: translate(-50%, -50%) scale(1.1);
              opacity: 1;
            }
          }
          
          @keyframes dataFlow {
            0%, 100% { 
              opacity: 0.4; 
              transform: scaleY(0.8);
            }
            50% { 
              opacity: 0.8; 
              transform: scaleY(1.2);
            }
          }
          
          @keyframes dataPulse {
            0%, 100% { 
              opacity: 0.8; 
              transform: scale(1);
            }
            50% { 
              opacity: 1; 
              transform: scale(1.2);
            }
          }
          
          @media (prefers-reduced-motion: reduce) {
            * {
              animation: none !important;
            }
          }
        `
      }} />

      {/* Bottom fade */}
      <div 
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #FFFFFF 100%)'
        }}
      />
    </div>
  );
}
