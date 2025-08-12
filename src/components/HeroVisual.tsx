"use client";

import { useEffect, useState } from "react";

export default function HeroVisual() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Circles - Reduced opacity on mobile */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-300/10 sm:bg-blue-300/30 rounded-full animate-pulse" 
             style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-32 right-20 w-6 h-6 bg-pink-200/10 sm:bg-pink-200/20 rounded-full animate-pulse" 
             style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute top-16 right-1/3 w-3 h-3 bg-green-600/10 sm:bg-green-600/25 rounded-full animate-pulse" 
             style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
        
        {/* Larger Floating Elements - Hidden on mobile */}
        <div className="hidden sm:block absolute top-40 left-1/4 w-8 h-8 bg-gradient-to-br from-blue-300/20 to-green-600/20 rounded-full animate-bounce" 
             style={{ animationDelay: '0.5s', animationDuration: '2s' }} />
        <div className="hidden sm:block absolute top-24 right-1/4 w-5 h-5 bg-gradient-to-br from-pink-200/15 to-blue-300/15 rounded-full animate-bounce" 
             style={{ animationDelay: '1.5s', animationDuration: '2.5s' }} />
        
        {/* Geometric Shapes - Reduced opacity on mobile */}
        <div className="absolute top-36 left-16 w-6 h-6 bg-green-600/8 sm:bg-green-600/15 rotate-45 animate-spin" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute top-20 right-16 w-4 h-4 bg-blue-300/10 sm:bg-blue-300/20 rotate-45 animate-spin" 
             style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
        
        {/* Connection Lines - Hidden on mobile for better readability */}
        <div className="hidden sm:block absolute top-28 left-1/3 w-px h-16 bg-gradient-to-b from-transparent via-green-600/10 to-transparent animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="hidden sm:block absolute top-32 right-1/3 w-px h-12 bg-gradient-to-b from-transparent via-blue-300/10 to-transparent animate-pulse" 
             style={{ animationDuration: '5s', animationDelay: '1s' }} />
        
        {/* AI Brain Icon with Glow - Reduced size and opacity on mobile */}
        <div className="absolute top-28 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-600/10 sm:from-green-600/20 to-blue-300/10 sm:to-blue-300/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-600/5 sm:border-green-600/10 animate-pulse">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            {/* Glow Effect - Reduced on mobile */}
            <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-600/15 sm:from-green-600/30 to-blue-300/15 sm:to-blue-300/30 rounded-full blur-lg sm:blur-xl animate-pulse" 
                 style={{ animationDuration: '3s' }} />
          </div>
        </div>
        
        {/* Floating Message Bubbles - Hidden on mobile for better readability */}
        <div className="hidden sm:block absolute top-16 left-20 transform -rotate-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg border border-green-600/10 animate-bounce" 
               style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}>
            <div className="text-xs text-green-600 font-medium">AI</div>
          </div>
        </div>
        
        <div className="hidden sm:block absolute top-20 right-24 transform rotate-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg border border-blue-300/10 animate-bounce" 
               style={{ animationDelay: '1s', animationDuration: '3s' }}>
            <div className="text-xs text-blue-600 font-medium">Team</div>
          </div>
        </div>
        
        {/* Subtle Grid Pattern - Reduced opacity on mobile */}
        <div className="absolute inset-0 opacity-2 sm:opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 197, 94, 0.05) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        {/* Mouse-following element - Hidden on mobile for better performance */}
        <div 
          className="hidden sm:block absolute w-32 h-32 bg-gradient-to-br from-green-600/5 to-blue-300/5 rounded-full blur-2xl transition-all duration-300 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 64,
            top: mousePosition.y - 64,
            transform: 'translate(0, 0)'
          }}
        />
      </div>
    </div>
  );
}
