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
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-turquoise/30 rounded-full animate-pulse" 
             style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-32 right-20 w-6 h-6 bg-rose/20 rounded-full animate-pulse" 
             style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute top-16 right-1/3 w-3 h-3 bg-forest/25 rounded-full animate-pulse" 
             style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
        
        {/* Larger Floating Elements */}
        <div className="absolute top-40 left-1/4 w-8 h-8 bg-gradient-to-br from-turquoise/20 to-forest/20 rounded-full animate-bounce" 
             style={{ animationDelay: '0.5s', animationDuration: '2s' }} />
        <div className="absolute top-24 right-1/4 w-5 h-5 bg-gradient-to-br from-rose/15 to-turquoise/15 rounded-full animate-bounce" 
             style={{ animationDelay: '1.5s', animationDuration: '2.5s' }} />
        
        {/* Geometric Shapes */}
        <div className="absolute top-36 left-16 w-6 h-6 bg-forest/15 rotate-45 animate-spin" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute top-20 right-16 w-4 h-4 bg-turquoise/20 rotate-45 animate-spin" 
             style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
        
        {/* Connection Lines (Subtle) */}
        <div className="absolute top-28 left-1/3 w-px h-16 bg-gradient-to-b from-transparent via-forest/10 to-transparent animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute top-32 right-1/3 w-px h-12 bg-gradient-to-b from-transparent via-turquoise/10 to-transparent animate-pulse" 
             style={{ animationDuration: '5s', animationDelay: '1s' }} />
        
        {/* AI Brain Icon with Glow */}
        <div className="absolute top-28 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-forest/20 to-turquoise/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-forest/10 animate-pulse">
              <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            {/* Glow Effect */}
            <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-forest/30 to-turquoise/30 rounded-full blur-xl animate-pulse" 
                 style={{ animationDuration: '3s' }} />
          </div>
        </div>
        
        {/* Floating Message Bubbles */}
        <div className="absolute top-16 left-20 transform -rotate-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-soft border border-forest/10 animate-bounce" 
               style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}>
            <div className="text-xs text-forest font-medium">AI</div>
          </div>
        </div>
        
        <div className="absolute top-20 right-24 transform rotate-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-soft border border-turquoise/10 animate-bounce" 
               style={{ animationDelay: '1s', animationDuration: '3s' }}>
            <div className="text-xs text-turquoise font-medium">Team</div>
          </div>
        </div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(47, 93, 80, 0.1) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        {/* Mouse-following element (subtle) */}
        <div 
          className="absolute w-32 h-32 bg-gradient-to-br from-forest/5 to-turquoise/5 rounded-full blur-2xl transition-all duration-300 ease-out pointer-events-none"
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
