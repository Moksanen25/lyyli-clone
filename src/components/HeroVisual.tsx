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
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest/15 via-turquoise/12 to-rose/10" />
      
      {/* Subtle Mesh Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest/8 via-transparent to-turquoise/8" />
      
      {/* Gentle Bokeh Effects */}
      <div className="absolute inset-0">
        {/* Large Bokeh */}
        <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-gradient-to-br from-forest/20 to-turquoise/18 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute right-1/4 top-1/3 w-80 h-80 bg-gradient-to-bl from-turquoise/18 to-rose/16 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute left-1/3 bottom-1/4 w-72 h-72 bg-gradient-to-tr from-rose/16 to-forest/18 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }} />
        
        {/* Medium Bokeh */}
        <div className="absolute left-1/2 top-1/2 w-64 h-64 bg-gradient-to-r from-turquoise/16 to-forest/18 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '15s', animationDelay: '1s' }} />
        <div className="absolute right-1/3 top-1/2 w-56 h-56 bg-gradient-to-l from-forest/16 to-turquoise/16 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '18s', animationDelay: '3s' }} />
        
        {/* Small Bokeh */}
        <div className="absolute left-1/6 top-2/3 w-40 h-40 bg-gradient-to-br from-rose/14 to-turquoise/16 rounded-full blur-xl animate-pulse" style={{ animationDuration: '20s', animationDelay: '5s' }} />
        <div className="absolute right-1/6 bottom-1/3 w-32 h-32 bg-gradient-to-bl from-turquoise/14 to-forest/16 rounded-full blur-lg animate-pulse" style={{ animationDuration: '25s', animationDelay: '7s' }} />
      </div>

      {/* Abstract Background Pattern */}
      <div className="absolute inset-0">
        {/* Geometric Grid */}
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-forest/50" />
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
              <div className="absolute inset-0 bg-gradient-to-br from-forest/15 to-turquoise/12 rounded-full blur-xl animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-br from-forest/25 to-turquoise/20 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
            </div>
            
            {/* Teams Stream */}
            <div className="absolute left-16 top-40 w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-br from-rose/12 to-forest/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-rose/20 to-forest/25 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
            
            {/* Slack Stream */}
            <div className="absolute left-24 top-60 w-28 h-28">
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/12 to-rose/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/20 to-rose/25 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
            </div>
            
            {/* Website Stream */}
            <div className="absolute left-12 top-80 w-20 h-20">
              <div className="absolute inset-0 bg-gradient-to-br from-forest/12 to-rose/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1.5s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-forest/20 to-rose/25 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
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
                <div className="absolute inset-4 bg-gradient-to-br from-forest/40 to-turquoise/30 rounded-full animate-pulse" />
                
                {/* Processing Rings */}
                <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
                <div className="absolute inset-2 border border-white/15 rounded-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
              </div>
              
              {/* Energy Field */}
              <div className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-forest/20 via-turquoise/15 to-rose/12 rounded-full blur-2xl animate-pulse" />
            </div>
          </div>

          {/* Right Data Destinations - Abstract flowing streams */}
          <div className="absolute right-0 top-0 w-1/3 h-full">
            {/* Teams Destination */}
            <div className="absolute right-8 top-20 w-28 h-28">
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/15 to-forest/12 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.3s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/25 to-forest/20 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
            </div>
            
            {/* Slack Destination */}
            <div className="absolute right-16 top-40 w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-br from-rose/12 to-turquoise/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.8s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-rose/20 to-turquoise/25 rounded-full animate-ping" style={{ animationDelay: '0.8s' }} />
            </div>
            
            {/* Instagram Destination */}
            <div className="absolute right-24 top-60 w-32 h-32">
              <div className="absolute inset-0 bg-gradient-to-br from-forest/15 to-rose/12 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.2s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-forest/25 to-rose/20 rounded-full animate-ping" style={{ animationDelay: '1.2s' }} />
            </div>
            
            {/* Email Destination */}
            <div className="absolute right-12 top-80 w-20 h-20">
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/12 to-forest/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1.6s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/20 to-forest/25 rounded-full animate-ping" style={{ animationDelay: '1.6s' }} />
            </div>
            
            {/* Threads Destination */}
            <div className="absolute right-20 top-96 w-16 h-16">
              <div className="absolute inset-0 bg-gradient-to-br from-rose/12 to-turquoise/15 rounded-full blur-md animate-pulse" style={{ animationDelay: '2s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-rose/20 to-turquoise/25 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
            </div>
          </div>

          {/* Floating Data Particles - Abstract energy flows */}
          <div className="absolute inset-0">
            {/* Source particles */}
            <div className="absolute left-32 top-32 w-3 h-3 bg-gradient-to-r from-forest/30 to-turquoise/40 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
            <div className="absolute left-40 top-40 w-2 h-2 bg-gradient-to-r from-rose/30 to-forest/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute left-48 top-60 w-3 h-3 bg-gradient-to-r from-turquoise/30 to-rose/40 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
            <div className="absolute left-36 top-80 w-2 h-2 bg-gradient-to-r from-forest/30 to-rose/40 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
            
            {/* Destination particles */}
            <div className="absolute right-32 top-32 w-3 h-3 bg-gradient-to-r from-turquoise/30 to-forest/40 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
            <div className="absolute right-40 top-40 w-2 h-2 bg-gradient-to-r from-rose/30 to-turquoise/40 rounded-full animate-ping" style={{ animationDelay: '0.8s' }} />
            <div className="absolute right-48 top-60 w-3 h-3 bg-gradient-to-r from-forest/30 to-rose/40 rounded-full animate-ping" style={{ animationDelay: '1.2s' }} />
            <div className="absolute right-36 top-80 w-2 h-2 bg-gradient-to-r from-turquoise/30 to-forest/40 rounded-full animate-ping" style={{ animationDelay: '1.6s' }} />
            <div className="absolute right-44 top-96 w-2 h-2 bg-gradient-to-r from-rose/30 to-turquoise/40 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
          </div>

          {/* Abstract Geometric Elements */}
          <div className="absolute inset-0">
            {/* Floating Triangles */}
            <div className="absolute left-1/4 top-1/3 w-8 h-8 opacity-15">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <polygon points="50,10 90,90 10,90" fill="currentColor" className="text-forest animate-spin" style={{ animationDuration: '20s' }} />
              </svg>
            </div>
            
            <div className="absolute right-1/4 top-2/3 w-6 h-6 opacity-15">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <polygon points="50,10 90,90 10,90" fill="currentColor" className="text-turquoise animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
              </svg>
            </div>
            
            {/* Floating Diamonds */}
            <div className="absolute left-1/3 bottom-1/4 w-4 h-4 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <polygon points="50,10 90,50 50,90 10,50" fill="currentColor" className="text-rose animate-pulse" />
              </svg>
            </div>
            
            <div className="absolute right-1/3 top-1/4 w-5 h-5 opacity-18">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <polygon points="50,10 90,50 50,90 10,50" fill="currentColor" className="text-forest animate-pulse" style={{ animationDelay: '1s' }} />
              </svg>
            </div>
          </div>
        </div>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(47, 93, 80, 0.08) 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Mouse-following energy field */}
        <div 
          className="absolute w-40 h-40 bg-gradient-to-br from-forest/8 via-turquoise/6 to-rose/5 rounded-full blur-3xl transition-all duration-500 ease-out pointer-events-none"
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
