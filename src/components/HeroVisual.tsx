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
        {/* Central Hub - positioned at 1/3 width */}
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 w-20 h-20 rounded-full"
          style={{
            left: '33%',
            background: 'radial-gradient(circle, rgba(47, 93, 80, 0.15) 0%, rgba(47, 93, 80, 0.06) 70%)',
            border: '2px solid rgba(47, 93, 80, 0.25)',
            boxShadow: '0 0 30px rgba(47, 93, 80, 0.2)'
          }}
        />

        {/* Data Streams flowing into hub */}
        <div className="absolute inset-0">
          {/* Stream 1: Top-right to hub (curved) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="stream1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0)" />
                <stop offset="50%" stopColor="rgba(34, 197, 94, 0.6)" />
                <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
              </linearGradient>
            </defs>
            <path
              d="M 80% 15% Q 60% 35% 33% 50%"
              stroke="url(#stream1)"
              strokeWidth="2"
              fill="none"
              style={{
                animation: 'dataFlow1 8s ease-in-out infinite'
              }}
            />
          </svg>
          
          {/* Stream 2: Right side to hub (curved) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="stream2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0)" />
                <stop offset="50%" stopColor="rgba(34, 197, 94, 0.6)" />
                <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
              </linearGradient>
            </defs>
            <path
              d="M 85% 45% Q 70% 50% 33% 50%"
              stroke="url(#stream2)"
              strokeWidth="2"
              fill="none"
              style={{
                animation: 'dataFlow2 8s ease-in-out infinite 1s'
              }}
            />
          </svg>

          {/* Stream 3: Bottom-right to hub (curved) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="stream3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0)" />
                <stop offset="50%" stopColor="rgba(34, 197, 94, 0.6)" />
                <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
              </linearGradient>
            </defs>
            <path
              d="M 80% 85% Q 60% 65% 33% 50%"
              stroke="url(#stream3)"
              strokeWidth="2"
              fill="none"
              style={{
                animation: 'dataFlow3 8s ease-in-out infinite 2s'
              }}
            />
          </svg>

          {/* Stream 4: Top to hub (straight) */}
          <div 
            className="absolute w-0.5 h-32"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0.5), transparent)',
              top: '18%',
              left: '33%',
              transform: 'translateX(-50%)',
              animation: 'dataFlow4 8s ease-in-out infinite 3s'
            }}
          />

          {/* Stream 5: Additional right side stream (curved) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="stream5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0)" />
                <stop offset="50%" stopColor="rgba(34, 197, 94, 0.6)" />
                <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
              </linearGradient>
            </defs>
            <path
              d="M 90% 30% Q 75% 40% 33% 50%"
              stroke="url(#stream5)"
              strokeWidth="2"
              fill="none"
              style={{
                animation: 'dataFlow5 8s ease-in-out infinite 1.5s'
              }}
            />
          </svg>

          {/* Stream 6: Additional bottom stream (curved) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="stream6" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0)" />
                <stop offset="50%" stopColor="rgba(34, 197, 94, 0.6)" />
                <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
              </linearGradient>
            </defs>
            <path
              d="M 75% 90% Q 55% 75% 33% 50%"
              stroke="url(#stream6)"
              strokeWidth="2"
              fill="none"
              style={{
                animation: 'dataFlow6 8s ease-in-out infinite 2.5s'
              }}
            />
          </svg>

          {/* Distribution lines from hub */}
          <div className="absolute top-1/2 transform -translate-y-1/2" style={{ left: '33%' }}>
            {/* Distribution to left */}
            <div 
              className="absolute w-16 h-0.5"
              style={{
                background: 'linear-gradient(to left, transparent, rgba(34, 197, 94, 0.5), transparent)',
                top: '50%',
                right: '2.5rem',
                transform: 'translateY(-50%)',
                animation: 'distributeData1 6s ease-in-out infinite'
              }}
            />
            
            {/* Distribution to bottom-left */}
            <svg className="absolute w-32 h-32 pointer-events-none" style={{ left: '-8rem', top: '2rem' }}>
              <path
                d="M 0 0 Q -20 20 -32 32"
                stroke="rgba(34, 197, 94, 0.5)"
                strokeWidth="2"
                fill="none"
                style={{
                  animation: 'distributeData2 6s ease-in-out infinite 1.5s'
                }}
              />
            </svg>
            
            {/* Distribution to top-left */}
            <svg className="absolute w-32 h-32 pointer-events-none" style={{ left: '-8rem', top: '-2rem' }}>
              <path
                d="M 0 0 Q -20 -20 -32 -32"
                stroke="rgba(34, 197, 94, 0.5)"
                strokeWidth="2"
                fill="none"
                style={{
                  animation: 'distributeData3 6s ease-in-out infinite 3s'
                }}
              />
            </svg>
          </div>

          {/* Data Pulse Dots at stream endpoints */}
          <div 
            className="absolute top-1/2 w-2 h-2 rounded-full"
            style={{
              background: 'rgba(34, 197, 94, 0.7)',
              left: '80%',
              top: '15%',
              transform: 'translate(-50%, -50%)',
              animation: 'dataPulse1 3s ease-in-out infinite 0.5s'
            }}
          />
          <div 
            className="absolute top-1/2 w-2 h-2 rounded-full"
            style={{
              background: 'rgba(34, 197, 94, 0.7)',
              left: '85%',
              top: '45%',
              transform: 'translate(-50%, -50%)',
              animation: 'dataPulse2 3s ease-in-out infinite 1.5s'
            }}
          />
          <div 
            className="absolute top-1/2 w-2 h-2 rounded-full"
            style={{
              background: 'rgba(34, 197, 94, 0.7)',
              left: '80%',
              top: '85%',
              transform: 'translate(-50%, -50%)',
              animation: 'dataPulse3 3s ease-in-out infinite 2.5s'
            }}
          />
          <div 
            className="absolute top-1/2 w-2 h-2 rounded-full"
            style={{
              background: 'rgba(34, 197, 94, 0.7)',
              left: '33%',
              top: '18%',
              transform: 'translate(-50%, -50%)',
              animation: 'dataPulse4 3s ease-in-out infinite 3.5s'
            }}
          />
          <div 
            className="absolute top-1/2 w-2 h-2 rounded-full"
            style={{
              background: 'rgba(34, 197, 94, 0.7)',
              left: '90%',
              top: '30%',
              transform: 'translate(-50%, -50%)',
              animation: 'dataPulse5 3s ease-in-out infinite 4s'
            }}
          />
          <div 
            className="absolute top-1/2 w-2 h-2 rounded-full"
            style={{
              background: 'rgba(34, 197, 94, 0.7)',
              left: '75%',
              top: '90%',
              transform: 'translate(-50%, -50%)',
              animation: 'dataPulse6 3s ease-in-out infinite 4.5s'
            }}
          />

          {/* Flowing Light Waves */}
          <div className="absolute inset-0">
            {/* Wave 1: Moving along stream 1 */}
            <div 
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.8) 0%, transparent 70%)',
                animation: 'waveFlow1 4s linear infinite'
              }}
            />
            
            {/* Wave 2: Moving along stream 2 */}
            <div 
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.8) 0%, transparent 70%)',
                animation: 'waveFlow2 4s linear infinite 0.5s'
              }}
            />
            
            {/* Wave 3: Moving along stream 3 */}
            <div 
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.8) 0%, transparent 70%)',
                animation: 'waveFlow3 4s linear infinite 1s'
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
            @keyframes dataFlow5 {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 0.9; }
            }
            @keyframes dataFlow6 {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 0.9; }
            }
            
            @keyframes dataPulse1 {
              0%, 100% { 
                opacity: 0.7; 
                transform: translate(-50%, -50%) scale(1);
              }
              50% { 
                opacity: 1; 
                transform: translate(-50%, -50%) scale(1.3);
              }
            }
            @keyframes dataPulse2 {
              0%, 100% { 
                opacity: 0.7; 
                transform: translate(-50%, -50%) scale(1);
              }
              50% { 
                opacity: 1; 
                transform: translate(-50%, -50%) scale(1.3);
              }
            }
            @keyframes dataPulse3 {
              0%, 100% { 
                opacity: 0.7; 
                transform: translate(-50%, -50%) scale(1);
              }
              50% { 
                opacity: 1; 
                transform: translate(-50%, -50%) scale(1.3);
              }
            }
            @keyframes dataPulse4 {
              0%, 100% { 
                opacity: 0.7; 
                transform: translate(-50%, -50%) scale(1);
              }
              50% { 
                opacity: 1; 
                transform: translate(-50%, -50%) scale(1.3);
              }
            }
            @keyframes dataPulse5 {
              0%, 100% { 
                opacity: 0.7; 
                transform: translate(-50%, -50%) scale(1);
              }
              50% { 
                opacity: 1; 
                transform: translate(-50%, -50%) scale(1.3);
              }
            }
            @keyframes dataPulse6 {
              0%, 100% { 
                opacity: 0.7; 
                transform: translate(-50%, -50%) scale(1);
              }
              50% { 
                opacity: 1; 
                transform: translate(-50%, -50%) scale(1.3);
              }
            }
            
            @keyframes distributeData1 {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.7; }
            }
            @keyframes distributeData2 {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.7; }
            }
            @keyframes distributeData3 {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.7; }
            }
            
            @keyframes waveFlow1 {
              0% { 
                left: 80%; 
                top: 15%; 
                opacity: 0;
              }
              25% { 
                left: 60%; 
                top: 35%; 
                opacity: 1;
              }
              50% { 
                left: 40%; 
                top: 45%; 
                opacity: 1;
              }
              100% { 
                left: 33%; 
                top: 50%; 
                opacity: 0;
              }
            }
            
            @keyframes waveFlow2 {
              0% { 
                left: 85%; 
                top: 45%; 
                opacity: 0;
              }
              25% { 
                left: 70%; 
                top: 50%; 
                opacity: 1;
              }
              50% { 
                left: 50%; 
                top: 50%; 
                opacity: 1;
              }
              100% { 
                left: 33%; 
                top: 50%; 
                opacity: 0;
              }
            }
            
            @keyframes waveFlow3 {
              0% { 
                left: 80%; 
                top: 85%; 
                opacity: 0;
              }
              25% { 
                left: 60%; 
                top: 65%; 
                opacity: 1;
              }
              50% { 
                left: 40%; 
                top: 55%; 
                opacity: 1;
              }
              100% { 
                left: 33%; 
                top: 50%; 
                opacity: 0;
              }
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
