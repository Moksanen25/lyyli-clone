"use client";

export default function HeroVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Base radial gradient for subtle contrast */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(1200px 620px at 50% 18%, #F4FAF7 0%, #FFFFFF 65%)'
        }}
      />

      {/* Data Stream Visualization */}
      <div className="absolute inset-0">
        {/* Central Hub */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(47, 93, 80, 0.12) 0%, rgba(47, 93, 80, 0.04) 70%)',
            border: '1px solid rgba(47, 93, 80, 0.18)',
            boxShadow: '0 0 20px rgba(47, 93, 80, 0.15)'
          }}
        />

        {/* Data Streams flowing into hub */}
        <div className="absolute inset-0">
          {/* Stream 1: Top-left to center */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div 
              className="absolute top-8 left-8 w-32 h-0.5"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(34, 197, 94, 0.5), transparent)',
                transform: 'rotate(-45deg)',
                transformOrigin: '0 0',
                animation: 'dataFlow1 8s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute top-12 left-12 w-2 h-2 rounded-full"
              style={{
                background: 'rgba(34, 197, 94, 0.6)',
                animation: 'dataPulse1 3s ease-in-out infinite 0.5s'
              }}
            />
          </div>

          {/* Stream 2: Top-right to center */}
          <div className="absolute top-0 right-0 w-full h-full">
            <div 
              className="absolute top-8 right-8 w-32 h-0.5"
              style={{
                background: 'linear-gradient(to left, transparent, rgba(34, 197, 94, 0.5), transparent)',
                transform: 'rotate(45deg)',
                transformOrigin: '100% 0',
                animation: 'dataFlow2 8s ease-in-out infinite 1s'
              }}
            />
            <div 
              className="absolute top-12 right-12 w-2 h-2 rounded-full"
              style={{
                background: 'rgba(34, 197, 94, 0.6)',
                animation: 'dataPulse2 3s ease-in-out infinite 1.5s'
              }}
            />
          </div>

          {/* Stream 3: Bottom-left to center */}
          <div className="absolute bottom-0 left-0 w-full h-full">
            <div 
              className="absolute bottom-8 left-8 w-32 h-0.5"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(34, 197, 94, 0.5), transparent)',
                transform: 'rotate(45deg)',
                transformOrigin: '0 100%',
                animation: 'dataFlow3 8s ease-in-out infinite 2s'
              }}
            />
            <div 
              className="absolute bottom-12 left-12 w-2 h-2 rounded-full"
              style={{
                background: 'rgba(34, 197, 94, 0.6)',
                animation: 'dataPulse3 3s ease-in-out infinite 2.5s'
              }}
            />
          </div>

          {/* Stream 4: Bottom-right to center */}
          <div className="absolute bottom-0 right-0 w-full h-full">
            <div 
              className="absolute bottom-8 right-8 w-32 h-0.5"
              style={{
                background: 'linear-gradient(to left, transparent, rgba(34, 197, 94, 0.5), transparent)',
                transform: 'rotate(-45deg)',
                transformOrigin: '100% 100%',
                animation: 'dataFlow4 8s ease-in-out infinite 3s'
              }}
            />
            <div 
              className="absolute bottom-12 right-12 w-2 h-2 rounded-full"
              style={{
                background: 'rgba(34, 197, 94, 0.6)',
                animation: 'dataPulse4 3s ease-in-out infinite 3.5s'
              }}
            />
          </div>

          {/* Distribution lines from hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* Distribution to top */}
            <div 
              className="absolute w-0.5 h-16"
              style={{
                background: 'linear-gradient(to top, transparent, rgba(34, 197, 94, 0.4), transparent)',
                top: '-8rem',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'distributeData1 6s ease-in-out infinite'
              }}
            />
            
            {/* Distribution to right */}
            <div 
              className="absolute w-16 h-0.5"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(34, 197, 94, 0.4), transparent)',
                top: '50%',
                left: '2rem',
                transform: 'translateY(-50%)',
                animation: 'distributeData2 6s ease-in-out infinite 1.5s'
              }}
            />
            
            {/* Distribution to bottom */}
            <div 
              className="absolute w-0.5 h-16"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0.4), transparent)',
                bottom: '-8rem',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'distributeData3 6s ease-in-out infinite 3s'
              }}
            />
            
            {/* Distribution to left */}
            <div 
              className="absolute w-16 h-0.5"
              style={{
                background: 'linear-gradient(to left, transparent, rgba(34, 197, 94, 0.4), transparent)',
                top: '50%',
                right: '2rem',
                transform: 'translateY(-50%)',
                animation: 'distributeData4 6s ease-in-out infinite 4.5s'
              }}
            />
          </div>
        </div>

        {/* CSS Animations using style tag */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes dataFlow1 {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 0.9; }
            }
            @keyframes dataFlow2 {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 0.9; }
            }
            @keyframes dataFlow3 {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 0.9; }
            }
            @keyframes dataFlow4 {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 0.9; }
            }
            
            @keyframes dataPulse1 {
              0%, 100% { 
                opacity: 0.6; 
                transform: scale(1);
              }
              50% { 
                opacity: 1; 
                transform: scale(1.3);
              }
            }
            @keyframes dataPulse2 {
              0%, 100% { 
                opacity: 0.6; 
                transform: scale(1);
              }
              50% { 
                opacity: 1; 
                transform: scale(1.3);
              }
            }
            @keyframes dataPulse3 {
              0%, 100% { 
                opacity: 0.6; 
                transform: scale(1);
              }
              50% { 
                opacity: 1; 
                transform: scale(1.3);
              }
            }
            @keyframes dataPulse4 {
              0%, 100% { 
                opacity: 0.6; 
                transform: scale(1);
              }
              50% { 
                opacity: 1; 
                transform: scale(1.3);
              }
            }
            
            @keyframes distributeData1 {
              0%, 100% { opacity: 0.2; }
              50% { opacity: 0.6; }
            }
            @keyframes distributeData2 {
              0%, 100% { opacity: 0.2; }
              50% { opacity: 0.6; }
            }
            @keyframes distributeData3 {
              0%, 100% { opacity: 0.2; }
              50% { opacity: 0.6; }
            }
            @keyframes distributeData4 {
              0%, 100% { opacity: 0.2; }
              50% { opacity: 0.6; }
            }
            
            @media (prefers-reduced-motion: reduce) {
              * {
                animation: none !important;
              }
            }
          `
        }} />
      </div>

      {/* Bottom fade for seamless transition */}
      <div 
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #FFFFFF 100%)'
        }}
      />
    </div>
  );
}
