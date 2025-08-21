"use client";

export default function HeroVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest/5 via-turquoise/3 to-rose/5" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(34,75,57,0.1)_1px,transparent_0)] bg-[length:24px_24px]" />
      </div>
      
      {/* Floating accent elements */}
      <div className="absolute inset-0">
        {/* Top left accent */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-forest/20 to-turquoise/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        
        {/* Top right accent */}
        <div className="absolute top-16 right-16 w-24 h-24 bg-gradient-to-br from-turquoise/20 to-rose/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s' }} />
        
        {/* Bottom left accent */}
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-gradient-to-br from-rose/20 to-forest/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        
        {/* Bottom right accent */}
        <div className="absolute bottom-16 right-10 w-20 h-20 bg-gradient-to-br from-forest/20 to-rose/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '7s' }} />
        
        {/* Center accent (subtle) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-turquoise/10 to-forest/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      </div>
      
      {/* Subtle grid lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,75,57,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,75,57,0.1)_1px,transparent_1px)] bg-[length:48px_48px]" />
      </div>
    </div>
  );
}
