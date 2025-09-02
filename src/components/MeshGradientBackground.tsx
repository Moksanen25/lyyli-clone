"use client";

import { useEffect, useRef, useState } from 'react';

export default function MeshGradientBackground() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simplified opacity - always visible for now
  const currentOpacity = 1;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: currentOpacity }}
    >
      {/* Fluid mesh gradient that flows throughout the page */}
      <div className="absolute inset-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Primary mesh gradients with vibrant colors */}
            <radialGradient id="meshGradient1" cx="0.2" cy="0.2" r="0.8">
              <stop offset="0%" stopColor="#FFB9B9" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#FFB9B9" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFB9B9" stopOpacity="0" />
            </radialGradient>
            
            <radialGradient id="meshGradient2" cx="0.8" cy="0.2" r="0.8">
              <stop offset="0%" stopColor="#F8D6FF" stopOpacity="1" />
              <stop offset="70%" stopColor="#F8D6FF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#F8D6FF" stopOpacity="0" />
            </radialGradient>
            
            <radialGradient id="meshGradient3" cx="0.2" cy="0.8" r="0.8">
              <stop offset="0%" stopColor="#FFF3BD" stopOpacity="1" />
              <stop offset="70%" stopColor="#FFF3BD" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFF3BD" stopOpacity="0" />
            </radialGradient>
            
            <radialGradient id="meshGradient4" cx="0.8" cy="0.8" r="0.8">
              <stop offset="0%" stopColor="#3FBB9B" stopOpacity="1" />
              <stop offset="70%" stopColor="#3FBB9B" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3FBB9B" stopOpacity="0" />
            </radialGradient>
            
            {/* Additional blending gradients for smoother transitions */}
            <radialGradient id="meshGradient5" cx="0.5" cy="0.5" r="1.2">
              <stop offset="0%" stopColor="#FFB9B9" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFB9B9" stopOpacity="0" />
            </radialGradient>
            
            <radialGradient id="meshGradient6" cx="0.3" cy="0.6" r="0.9">
              <stop offset="0%" stopColor="#F8D6FF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#F8D6FF" stopOpacity="0" />
            </radialGradient>
            
            <radialGradient id="meshGradient7" cx="0.7" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#FFF3BD" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFF3BD" stopOpacity="0" />
            </radialGradient>
            
            <radialGradient id="meshGradient8" cx="0.4" cy="0.3" r="0.7">
              <stop offset="0%" stopColor="#3FBB9B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3FBB9B" stopOpacity="0" />
            </radialGradient>

            {/* Additional vibrant gradients for more color variety */}
            <radialGradient id="meshGradient9" cx="0.1" cy="0.5" r="0.7">
              <stop offset="0%" stopColor="#FF9A9A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF9A9A" stopOpacity="0" />
            </radialGradient>
            
            <radialGradient id="meshGradient10" cx="0.9" cy="0.1" r="0.6">
              <stop offset="0%" stopColor="#E6B3FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E6B3FF" stopOpacity="0" />
            </radialGradient>
            
            <radialGradient id="meshGradient11" cx="0.1" cy="0.1" r="0.5">
              <stop offset="0%" stopColor="#FFE066" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFE066" stopOpacity="0" />
            </radialGradient>
            
            <radialGradient id="meshGradient12" cx="0.9" cy="0.9" r="0.5">
              <stop offset="0%" stopColor="#66D9A3" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#66D9A3" stopOpacity="0" />
            </radialGradient>

            {/* Even more variety for richer patterns */}
            <radialGradient id="meshGradient13" cx="0.3" cy="0.1" r="0.4">
              <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0" />
            </radialGradient>
            
            <radialGradient id="meshGradient14" cx="0.7" cy="0.7" r="0.4">
              <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0" />
            </radialGradient>
            
            <radialGradient id="meshGradient15" cx="0.5" cy="0.2" r="0.3">
              <stop offset="0%" stopColor="#FFA07A" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFA07A" stopOpacity="0" />
            </radialGradient>
            
            <radialGradient id="meshGradient16" cx="0.2" cy="0.7" r="0.3">
              <stop offset="0%" stopColor="#DDA0DD" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#DDA0DD" stopOpacity="0" />
            </radialGradient>

            {/* Additional gradients for even more fluid coverage */}
            <radialGradient id="meshGradient17" cx="0.6" cy="0.1" r="0.4">
              <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#87CEEB" stopOpacity="0" />
            </radialGradient>
            
            <radialGradient id="meshGradient18" cx="0.1" cy="0.9" r="0.4">
              <stop offset="0%" stopColor="#F0E68C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F0E68C" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Multiple overlapping circles creating fluid mesh pattern */}
          <circle cx="20" cy="20" r="40" fill="url(#meshGradient1)" />
          <circle cx="80" cy="20" r="40" fill="url(#meshGradient2)" />
          <circle cx="20" cy="80" r="40" fill="url(#meshGradient3)" />
          <circle cx="80" cy="80" r="40" fill="url(#meshGradient4)" />
          <circle cx="50" cy="50" r="60" fill="url(#meshGradient5)" />
          <circle cx="30" cy="60" r="45" fill="url(#meshGradient6)" />
          <circle cx="70" cy="40" r="35" fill="url(#meshGradient7)" />
          <circle cx="40" cy="30" r="40" fill="url(#meshGradient8)" />
          <circle cx="10" cy="50" r="35" fill="url(#meshGradient9)" />
          <circle cx="90" cy="10" r="30" fill="url(#meshGradient10)" />
          <circle cx="10" cy="10" r="25" fill="url(#meshGradient11)" />
          <circle cx="90" cy="90" r="25" fill="url(#meshGradient12)" />
          <circle cx="30" cy="10" r="20" fill="url(#meshGradient13)" />
          <circle cx="70" cy="70" r="20" fill="url(#meshGradient14)" />
          <circle cx="50" cy="20" r="15" fill="url(#meshGradient15)" />
          <circle cx="20" cy="70" r="15" fill="url(#meshGradient16)" />
          <circle cx="60" cy="10" r="18" fill="url(#meshGradient17)" />
          <circle cx="10" cy="90" r="18" fill="url(#meshGradient18)" />
          
          {/* Additional mid-range circles for better coverage */}
          <circle cx="45" cy="65" r="25" fill="url(#meshGradient1)" opacity="0.6" />
          <circle cx="65" cy="35" r="25" fill="url(#meshGradient2)" opacity="0.6" />
          <circle cx="25" cy="45" r="25" fill="url(#meshGradient3)" opacity="0.6" />
          <circle cx="75" cy="55" r="25" fill="url(#meshGradient4)" opacity="0.6" />
        </svg>
      </div>
      
      {/* Temporary test background to ensure visibility */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(45deg, rgba(255, 182, 193, 0.3) 0%, rgba(173, 216, 230, 0.3) 50%, rgba(255, 218, 185, 0.3) 100%)'
        }}
      />
      
      {/* Subtle noise texture for organic feel */}
      <div 
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.08) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.08) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 40px 40px, 80px 80px'
        }}
      />
      
      {/* Subtle vignette effect for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.02) 70%, rgba(0,0,0,0.05) 100%)'
        }}
      />
    </div>
  );
}