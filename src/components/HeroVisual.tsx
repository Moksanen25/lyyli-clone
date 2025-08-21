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
            background: 'radial-gradient(circle, rgba(47, 93, 80, 0.08) 0%, rgba(47, 93, 80, 0.02) 70%)',
            border: '1px solid rgba(47, 93, 80, 0.12)'
          }}
        />

        {/* Data Streams flowing into hub */}
        <div className="absolute inset-0">
          {/* Stream 1: Top-left to center */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div 
              className="absolute top-8 left-8 w-32 h-0.5 bg-gradient-to-r from-transparent via-green-300/20 to-transparent"
              style={{
                transform: 'rotate(-45deg)',
                transformOrigin: '0 0',
                animation: 'dataFlow 8s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute top-12 left-12 w-2 h-2 rounded-full bg-green-400/30"
              style={{
                animation: 'dataPulse 3s ease-in-out infinite 0.5s'
              }}
            />
          </div>

          {/* Stream 2: Top-right to center */}
          <div className="absolute top-0 right-0 w-full h-full">
            <div 
              className="absolute top-8 right-8 w-32 h-0.5 bg-gradient-to-l from-transparent via-green-300/20 to-transparent"
              style={{
                transform: 'rotate(45deg)',
                transformOrigin: '100% 0',
                animation: 'dataFlow 8s ease-in-out infinite 1s'
              }}
            />
            <div 
              className="absolute top-12 right-12 w-2 h-2 rounded-full bg-green-400/30"
              style={{
                animation: 'dataPulse 3s ease-in-out infinite 1.5s'
              }}
            />
          </div>

          {/* Stream 3: Bottom-left to center */}
          <div className="absolute bottom-0 left-0 w-full h-full">
            <div 
              className="absolute bottom-8 left-8 w-32 h-0.5 bg-gradient-to-r from-transparent via-green-300/20 to-transparent"
              style={{
                transform: 'rotate(45deg)',
                transformOrigin: '0 100%',
                animation: 'dataFlow 8s ease-in-out infinite 2s'
              }}
            />
            <div 
              className="absolute bottom-12 left-12 w-2 h-2 rounded-full bg-green-400/30"
              style={{
                animation: 'dataPulse 3s ease-in-out infinite 2.5s'
              }}
            />
          </div>

          {/* Stream 4: Bottom-right to center */}
          <div className="absolute bottom-0 right-0 w-full h-full">
            <div 
              className="absolute bottom-8 right-8 w-32 h-0.5 bg-gradient-to-l from-transparent via-green-300/20 to-transparent"
              style={{
                transform: 'rotate(-45deg)',
                transformOrigin: '100% 100%',
                animation: 'dataFlow 8s ease-in-out infinite 3s'
              }}
            />
            <div 
              className="absolute bottom-12 right-12 w-2 h-2 rounded-full bg-green-400/30"
              style={{
                animation: 'dataPulse 3s ease-in-out infinite 3.5s'
              }}
            />
          </div>

          {/* Distribution lines from hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* Distribution to top */}
            <div 
              className="absolute w-0.5 h-16 bg-gradient-to-t from-transparent via-green-300/15 to-transparent"
              style={{
                top: '-8rem',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'distributeData 6s ease-in-out infinite'
              }}
            />
            
            {/* Distribution to right */}
            <div 
              className="absolute w-16 h-0.5 bg-gradient-to-r from-transparent via-green-300/15 to-transparent"
              style={{
                top: '50%',
                left: '2rem',
                transform: 'translateY(-50%)',
                animation: 'distributeData 6s ease-in-out infinite 1.5s'
              }}
            />
            
            {/* Distribution to bottom */}
            <div 
              className="absolute w-0.5 h-16 bg-gradient-to-b from-transparent via-green-300/15 to-transparent"
              style={{
                bottom: '-8rem',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'distributeData 6s ease-in-out infinite 3s'
              }}
            />
            
            {/* Distribution to left */}
            <div 
              className="absolute w-16 h-0.5 bg-gradient-to-l from-transparent via-green-300/15 to-transparent"
              style={{
                top: '50%',
                right: '2rem',
                transform: 'translateY(-50%)',
                animation: 'distributeData 6s ease-in-out infinite 4.5s'
              }}
            />
          </div>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes dataFlow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
          
          @keyframes dataPulse {
            0%, 100% { 
              opacity: 0.3; 
              transform: scale(1);
            }
            50% { 
              opacity: 0.8; 
              transform: scale(1.2);
            }
          }
          
          @keyframes distributeData {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.4; }
          }
          
          @media (prefers-reduced-motion: reduce) {
            * {
              animation: none !important;
            }
          }
        `}</style>
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
