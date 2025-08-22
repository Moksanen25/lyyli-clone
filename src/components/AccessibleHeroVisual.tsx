"use client";

import { useEffect, useState } from 'react';

type VisualizationMode = 'full' | 'simplified' | 'static';

export default function AccessibleHeroVisual() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [visualizationMode, setVisualizationMode] = useState<VisualizationMode>('full');
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

    // Auto-switch to simplified mode on mobile or when reduced motion is preferred
    if (isMobile || prefersReducedMotion) {
      setVisualizationMode('simplified');
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile, prefersReducedMotion]);

  // Static visualization for maximum accessibility
  const renderStaticVisual = () => (
    <div className="absolute inset-0">
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #F4FAF7 0%, #FFFFFF 50%, #F4FAF7 100%)'
        }}
      />
      
      {/* Simple geometric shapes */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div 
          className="w-20 h-20 rounded-full border-4 border-forest/30"
          style={{
            background: 'radial-gradient(circle, rgba(47, 93, 80, 0.1) 0%, rgba(47, 93, 80, 0.05) 70%)'
          }}
        />
      </div>
      
      {/* Connection lines */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-32 h-1 bg-forest/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <div className="w-1 h-32 bg-forest/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      {/* Corner nodes */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-forest/40 rounded-full" />
      <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-forest/40 rounded-full" />
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-forest/40 rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-forest/40 rounded-full" />
    </div>
  );

  // Simplified visualization with minimal animations
  const renderSimplifiedVisual = () => (
    <div className="absolute inset-0">
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #F4FAF7 0%, #FFFFFF 50%, #F4FAF7 100%)'
        }}
      />
      
      {/* Central hub */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(47, 93, 80, 0.2) 0%, rgba(47, 93, 80, 0.1) 70%)',
          border: '3px solid rgba(47, 93, 80, 0.3)',
          boxShadow: '0 0 20px rgba(47, 93, 80, 0.15)'
        }}
      />
      
      {/* Data streams */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-2 h-20 bg-forest/30"
          style={{
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        />
        <div 
          className="absolute w-20 h-2 bg-forest/30"
          style={{
            top: '50%',
            right: '15%',
            transform: 'translateY(-50%)'
          }}
        />
        <div 
          className="absolute w-20 h-2 bg-forest/30"
          style={{
            top: '50%',
            left: '15%',
            transform: 'translateY(-50%)'
          }}
        />
        <div 
          className="absolute w-2 h-20 bg-forest/30"
          style={{
            bottom: '20%',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        />
      </div>
      
      {/* Data nodes */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-4 h-4 bg-forest/60 rounded-full"
          style={{
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div 
          className="absolute w-4 h-4 bg-forest/60 rounded-full"
          style={{
            top: '50%',
            right: '15%',
            transform: 'translate(50%, -50%)'
          }}
        />
        <div 
          className="absolute w-4 h-4 bg-forest/60 rounded-full"
          style={{
            top: '50%',
            left: '15%',
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div 
          className="absolute w-4 h-4 bg-forest/60 rounded-full"
          style={{
            bottom: '20%',
            left: '50%',
            transform: 'translate(-50%, 50%)'
          }}
        />
      </div>
    </div>
  );

  // Full visualization with animations
  const renderFullVisual = () => (
    <div className="absolute inset-0">
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #F4FAF7 0%, #FFFFFF 50%, #F4FAF7 100%)'
        }}
      />
      
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
  );

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Visualization mode selector - only visible on larger screens */}
      {!isMobile && (
        <div className="absolute top-4 right-4 z-20 pointer-events-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-gray-200">
            <div className="flex gap-2">
              <button
                onClick={() => setVisualizationMode('static')}
                className={`px-3 py-1 text-xs rounded ${
                  visualizationMode === 'static' 
                    ? 'bg-forest text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label="Static visualization mode"
              >
                Static
              </button>
              <button
                onClick={() => setVisualizationMode('simplified')}
                className={`px-3 py-1 text-xs rounded ${
                  visualizationMode === 'simplified' 
                    ? 'bg-forest text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label="Simplified visualization mode"
              >
                Simple
              </button>
              <button
                onClick={() => setVisualizationMode('full')}
                className={`px-3 py-1 text-xs rounded ${
                  visualizationMode === 'full' 
                    ? 'bg-forest text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label="Full visualization mode"
              >
                Full
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render appropriate visualization */}
      {visualizationMode === 'static' && renderStaticVisual()}
      {visualizationMode === 'simplified' && renderSimplifiedVisual()}
      {visualizationMode === 'full' && renderFullVisual()}

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
