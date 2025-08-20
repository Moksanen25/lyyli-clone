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
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0">
        {/* Geometric Grid */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-forest/20" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        {/* Abstract Data Streams */}
        <div className="absolute inset-0">
          {/* Left Data Sources - Abstract flowing streams */}
          <div className="absolute left-0 top-0 w-1/3 h-full">
            {/* Email Stream */}
            <div className="absolute left-8 top-20 w-32 h-32">
              <div className="absolute inset-0 bg-gradient-to-br from-forest/20 to-turquoise/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-br from-forest/40 to-turquoise/40 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
            </div>
            
            {/* Teams Stream */}
            <div className="absolute left-16 top-40 w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-br from-rose/20 to-forest/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-rose/40 to-forest/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
            
            {/* Slack Stream */}
            <div className="absolute left-24 top-60 w-28 h-28">
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/20 to-rose/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/40 to-rose/40 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
            </div>
            
            {/* Website Stream */}
            <div className="absolute left-12 top-80 w-20 h-20">
              <div className="absolute inset-0 bg-gradient-to-br from-forest/20 to-rose/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1.5s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-forest/40 to-rose/40 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>

          {/* Central Processing Hub - Abstract geometric core */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* Main Hub */}
            <div className="relative">
              {/* Core Hexagon */}
              <div className="w-32 h-32 relative">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <polygon 
                    points="50,5 85,27.5 85,72.5 50,95 15,72.5 15,27.5" 
                    fill="url(#hubGradient)" 
                    className="animate-pulse"
                  />
                </svg>
                
                {/* Inner Core */}
                <div className="absolute inset-4 bg-gradient-to-br from-forest to-turquoise rounded-full animate-pulse" />
                
                {/* Processing Rings */}
                <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
                <div className="absolute inset-2 border border-white/20 rounded-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
              </div>
              
              {/* Energy Field */}
              <div className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-forest/30 via-turquoise/30 to-rose/30 rounded-full blur-2xl animate-pulse" />
            </div>
          </div>

          {/* Right Data Destinations - Abstract flowing streams */}
          <div className="absolute right-0 top-0 w-1/3 h-full">
            {/* Teams Destination */}
            <div className="absolute right-8 top-20 w-28 h-28">
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/20 to-forest/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.3s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/40 to-forest/40 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
            </div>
            
            {/* Slack Destination */}
            <div className="absolute right-16 top-40 w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-br from-rose/20 to-turquoise/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.8s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-rose/40 to-turquoise/40 rounded-full animate-ping" style={{ animationDelay: '0.8s' }} />
            </div>
            
            {/* Instagram Destination */}
            <div className="absolute right-24 top-60 w-32 h-32">
              <div className="absolute inset-0 bg-gradient-to-br from-forest/20 to-rose/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.2s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-forest/40 to-rose/40 rounded-full animate-ping" style={{ animationDelay: '1.2s' }} />
            </div>
            
            {/* Email Destination */}
            <div className="absolute right-12 top-80 w-20 h-20">
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/20 to-forest/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1.6s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/40 to-forest/40 rounded-full animate-ping" style={{ animationDelay: '1.6s' }} />
            </div>
            
            {/* Threads Destination */}
            <div className="absolute right-20 top-96 w-16 h-16">
              <div className="absolute inset-0 bg-gradient-to-br from-rose/20 to-turquoise/20 rounded-full blur-md animate-pulse" style={{ animationDelay: '2s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-rose/40 to-turquoise/40 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
            </div>
          </div>

          {/* Data Flow Connections - Abstract flowing lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <defs>
              {/* Source to Hub Gradients */}
              <linearGradient id="sourceGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(47, 93, 80)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="rgb(167, 214, 209)" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="sourceGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(247, 235, 235)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="rgb(47, 93, 80)" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="sourceGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(167, 214, 209)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="rgb(247, 235, 235)" stopOpacity="0.8" />
              </linearGradient>
              
              {/* Hub to Destination Gradients */}
              <linearGradient id="destGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(167, 214, 209)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="rgb(47, 93, 80)" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="destGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(247, 235, 235)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="rgb(167, 214, 209)" stopOpacity="0.4" />
              </linearGradient>
              
              {/* Hub Core Gradient */}
              <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(47, 93, 80)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="rgb(167, 214, 209)" stopOpacity="0.6" />
              </radialGradient>
            </defs>
            
            {/* Source to Hub Connections */}
            <path d="M 120 200 Q 300 300 400 400" stroke="url(#sourceGradient1)" strokeWidth="3" fill="none" className="animate-dash" />
            <path d="M 160 400 Q 280 350 400 400" stroke="url(#sourceGradient2)" strokeWidth="3" fill="none" className="animate-dash" style={{ animationDelay: '0.5s' }} />
            <path d="M 200 600 Q 320 450 400 400" stroke="url(#sourceGradient3)" strokeWidth="3" fill="none" className="animate-dash" style={{ animationDelay: '1s' }} />
            <path d="M 140 800 Q 260 500 400 400" stroke="url(#sourceGradient1)" strokeWidth="3" fill="none" className="animate-dash" style={{ animationDelay: '1.5s' }} />
            
            {/* Hub to Destination Connections */}
            <path d="M 520 400 Q 700 300 800 200" stroke="url(#destGradient1)" strokeWidth="3" fill="none" className="animate-dash" style={{ animationDelay: '0.3s' }} />
            <path d="M 520 400 Q 720 350 800 400" stroke="url(#destGradient2)" strokeWidth="3" fill="none" className="animate-dash" style={{ animationDelay: '0.8s' }} />
            <path d="M 520 400 Q 700 450 800 600" stroke="url(#destGradient1)" strokeWidth="3" fill="none" className="animate-dash" style={{ animationDelay: '1.2s' }} />
            <path d="M 520 400 Q 740 500 800 800" stroke="url(#destGradient2)" strokeWidth="3" fill="none" className="animate-dash" style={{ animationDelay: '1.6s' }} />
            <path d="M 520 400 Q 720 550 800 960" stroke="url(#destGradient1)" strokeWidth="3" fill="none" className="animate-dash" style={{ animationDelay: '2s' }} />
          </svg>

          {/* Floating Data Particles - Abstract energy flows */}
          <div className="absolute inset-0">
            {/* Source particles */}
            <div className="absolute left-32 top-32 w-3 h-3 bg-gradient-to-r from-forest to-turquoise rounded-full animate-ping" style={{ animationDelay: '0s' }} />
            <div className="absolute left-40 top-40 w-2 h-2 bg-gradient-to-r from-rose to-forest rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute left-48 top-60 w-3 h-3 bg-gradient-to-r from-turquoise to-rose rounded-full animate-ping" style={{ animationDelay: '1s' }} />
            <div className="absolute left-36 top-80 w-2 h-2 bg-gradient-to-r from-forest to-rose rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
            
            {/* Destination particles */}
            <div className="absolute right-32 top-32 w-3 h-3 bg-gradient-to-r from-turquoise to-forest rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
            <div className="absolute right-40 top-40 w-2 h-2 bg-gradient-to-r from-rose to-turquoise rounded-full animate-ping" style={{ animationDelay: '0.8s' }} />
            <div className="absolute right-48 top-60 w-3 h-3 bg-gradient-to-r from-forest to-rose rounded-full animate-ping" style={{ animationDelay: '1.2s' }} />
            <div className="absolute right-36 top-80 w-2 h-2 bg-gradient-to-r from-turquoise to-forest rounded-full animate-ping" style={{ animationDelay: '1.6s' }} />
            <div className="absolute right-44 top-96 w-2 h-2 bg-gradient-to-r from-rose to-turquoise rounded-full animate-ping" style={{ animationDelay: '2s' }} />
          </div>

          {/* Abstract Geometric Elements */}
          <div className="absolute inset-0">
            {/* Floating Triangles */}
            <div className="absolute left-1/4 top-1/3 w-8 h-8 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <polygon points="50,10 90,90 10,90" fill="currentColor" className="text-forest animate-spin" style={{ animationDuration: '20s' }} />
              </svg>
            </div>
            
            <div className="absolute right-1/4 top-2/3 w-6 h-6 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <polygon points="50,10 90,90 10,90" fill="currentColor" className="text-turquoise animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
              </svg>
            </div>
            
            {/* Floating Diamonds */}
            <div className="absolute left-1/3 bottom-1/4 w-4 h-4 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <polygon points="50,10 90,50 50,90 10,50" fill="currentColor" className="text-rose animate-pulse" />
              </svg>
            </div>
            
            <div className="absolute right-1/3 top-1/4 w-5 h-5 opacity-25">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <polygon points="50,10 90,50 50,90 10,50" fill="currentColor" className="text-forest animate-pulse" style={{ animationDelay: '1s' }} />
              </svg>
            </div>
          </div>
        </div>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(47, 93, 80, 0.1) 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Mouse-following energy field */}
        <div 
          className="absolute w-40 h-40 bg-gradient-to-br from-forest/10 via-turquoise/10 to-rose/10 rounded-full blur-3xl transition-all duration-500 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 80,
            top: mousePosition.y - 80,
            transform: 'translate(0, 0)'
          }}
        />
      </div>
    </div>
  );
}
