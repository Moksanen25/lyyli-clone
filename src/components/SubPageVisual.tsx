"use client";

import { useEffect, useState } from "react";

export default function SubPageVisual() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Triangles */}
        <div className="absolute top-16 left-8 w-6 h-6 bg-gradient-to-br from-rose/20 to-turquoise/20 transform rotate-45 animate-pulse" 
             style={{ animationDelay: '0.5s', animationDuration: '4s' }} />
        <div className="absolute top-28 right-12 w-4 h-4 bg-gradient-to-br from-forest/25 to-rose/15 transform rotate-45 animate-pulse" 
             style={{ animationDelay: '1.5s', animationDuration: '3s' }} />
        <div className="absolute top-12 right-1/4 w-5 h-5 bg-gradient-to-br from-turquoise/20 to-forest/20 transform rotate-45 animate-pulse" 
             style={{ animationDelay: '2.5s', animationDuration: '5s' }} />
        
        {/* Hexagon Shapes */}
        <div className="absolute top-20 left-1/3 w-8 h-8 bg-gradient-to-br from-forest/15 to-turquoise/15 animate-bounce" 
             style={{ animationDelay: '1s', animationDuration: '3s' }}>
          <div className="w-full h-full bg-gradient-to-br from-forest/15 to-turquoise/15 transform rotate-45 scale-75" />
        </div>
        
        {/* Diamond Shapes */}
        <div className="absolute top-32 right-1/3 w-6 h-6 bg-gradient-to-br from-rose/20 to-turquoise/20 transform rotate-45 animate-spin" 
             style={{ animationDuration: '10s' }} />
        <div className="absolute top-16 left-1/4 w-4 h-4 bg-gradient-to-br from-forest/20 to-rose/15 transform rotate-45 animate-spin" 
             style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        
        {/* Connection Dots */}
        <div className="absolute top-24 left-16 w-2 h-2 bg-forest/30 rounded-full animate-ping" 
             style={{ animationDelay: '0s', animationDuration: '2s' }} />
        <div className="absolute top-36 right-20 w-2 h-2 bg-turquoise/30 rounded-full animate-ping" 
             style={{ animationDelay: '1s', animationDuration: '2.5s' }} />
        <div className="absolute top-20 right-16 w-2 h-2 bg-rose/25 rounded-full animate-ping" 
             style={{ animationDelay: '2s', animationDuration: '3s' }} />
        
        {/* Floating Icons */}
        <div className="absolute top-28 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-rose/20 to-forest/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-rose/10 animate-pulse">
              <svg className="w-6 h-6 text-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            {/* Glow Effect */}
            <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-rose/25 to-forest/25 rounded-lg blur-lg animate-pulse" 
                 style={{ animationDuration: '4s' }} />
          </div>
        </div>
        
        {/* Floating Message Bubbles */}
        <div className="absolute top-16 left-24 transform -rotate-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl px-2 py-1 shadow-soft border border-rose/10 animate-bounce" 
               style={{ animationDelay: '0.8s', animationDuration: '2.8s' }}>
            <div className="text-xs text-rose font-medium">Fast</div>
          </div>
        </div>
        
        <div className="absolute top-24 right-20 transform rotate-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl px-2 py-1 shadow-soft border border-turquoise/10 animate-bounce" 
               style={{ animationDelay: '1.2s', animationDuration: '3.2s' }}>
            <div className="text-xs text-turquoise font-medium">Smart</div>
          </div>
        </div>
        
        {/* Wave Lines */}
        <div className="absolute top-40 left-1/4 w-16 h-px bg-gradient-to-r from-transparent via-forest/15 to-transparent animate-pulse" 
             style={{ animationDuration: '6s' }} />
        <div className="absolute top-32 right-1/4 w-12 h-px bg-gradient-to-r from-transparent via-turquoise/15 to-transparent animate-pulse" 
             style={{ animationDuration: '7s', animationDelay: '1s' }} />
        
        {/* Subtle Dot Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(167, 214, 209, 0.08) 1px, transparent 0)`,
            backgroundSize: '25px 25px'
          }} />
        </div>
        
        {/* Scroll-responsive elements */}
        <div 
          className="absolute w-24 h-24 bg-gradient-to-br from-rose/3 to-forest/3 rounded-full blur-xl transition-all duration-500 ease-out"
          style={{
            left: '60%',
            top: `${20 + (scrollY * 0.1)}px`,
            transform: `translate(-50%, -50%) scale(${1 + (scrollY * 0.0001)})`
          }}
        />
        
        <div 
          className="absolute w-20 h-20 bg-gradient-to-br from-turquoise/3 to-rose/3 rounded-full blur-xl transition-all duration-500 ease-out"
          style={{
            left: '25%',
            top: `${40 + (scrollY * 0.05)}px`,
            transform: `translate(-50%, -50%) scale(${1 + (scrollY * 0.0002)})`
          }}
        />
      </div>
    </div>
  );
}
