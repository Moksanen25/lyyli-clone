'use client';

import { useEffect, useRef, useState } from 'react';

// Custom hook to handle IntersectionObserver with hydration-safe state management
function useIntersectionObserver(options: IntersectionObserverInit = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isClient, options]);

  return { ref, isVisible: isClient && isVisible, isClient };
}

interface AnimatedBackgroundProps {
  variant?: 'hero' | 'section' | 'card' | 'minimal';
  intensity?: 'subtle' | 'medium' | 'intense';
  className?: string;
  children?: React.ReactNode;
}

export function AnimatedBackground({ 
  variant = 'section', 
  intensity = 'medium',
  className = "",
  children 
}: AnimatedBackgroundProps) {
  const { ref, isVisible, isClient } = useIntersectionObserver();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && typeof window !== 'undefined') {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isClient]);

  const getIntensityClasses = () => {
    switch (intensity) {
      case 'subtle':
        return 'opacity-20';
      case 'medium':
        return 'opacity-40';
      case 'intense':
        return 'opacity-60';
      default:
        return 'opacity-40';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'hero':
        return 'min-h-screen';
      case 'section':
        return 'min-h-96';
      case 'card':
        return 'min-h-64';
      case 'minimal':
        return 'min-h-32';
      default:
        return 'min-h-96';
    }
  };

  return (
    <div 
      ref={ref}
      className={`relative overflow-hidden ${getVariantClasses()} ${className}`}
    >
      {/* Primary gradient background */}
      <div className={`absolute inset-0 transition-all duration-2000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-soft-rose via-white to-muted-turquoise opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-tl from-forest-green via-transparent to-soft-rose opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-muted-turquoise via-transparent to-soft-rose opacity-15" />
      </div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Geometric shapes with parallax effect */}
        <div 
          className={`absolute w-16 h-16 border border-muted-turquoise rounded-full transition-all duration-8000 ${
            isVisible ? 'animate-spin' : ''
          } ${getIntensityClasses()}`}
          style={{
            left: '10%',
            top: '20%',
            transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`,
          }}
        />
        
        <div 
          className={`absolute w-24 h-24 bg-soft-rose rounded-full transition-all duration-6000 ${
            isVisible ? 'animate-pulse' : ''
          } ${getIntensityClasses()}`}
          style={{
            right: '15%',
            top: '60%',
            transform: `translate(${-mousePosition.x * 0.008}px, ${-mousePosition.y * 0.008}px)`,
          }}
        />
        
        <div 
          className={`absolute w-12 h-12 border border-forest-green transition-all duration-10000 ${
            isVisible ? 'animate-spin' : ''
          } ${getIntensityClasses()}`}
          style={{
            left: '20%',
            bottom: '30%',
            transform: `translate(${mousePosition.x * 0.003}px, ${mousePosition.y * 0.003}px) rotate(45deg)`,
          }}
        />
        
        <div 
          className={`absolute w-20 h-20 bg-muted-turquoise rounded-full transition-all duration-7000 ${
            isVisible ? 'animate-bounce' : ''
          } ${getIntensityClasses()}`}
          style={{
            right: '25%',
            bottom: '20%',
            transform: `translate(${-mousePosition.x * 0.012}px, ${-mousePosition.y * 0.012}px)`,
          }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div className={`absolute inset-0 transition-all duration-3000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(var(--forest-green) 1px, transparent 1px),
              linear-gradient(90deg, var(--forest-green) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>

      {/* Moving gradient overlay */}
      <div className={`absolute inset-0 transition-all duration-15000 ${
        isVisible ? 'animate-pulse' : ''
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-turquoise to-transparent opacity-10" />
      </div>

      {/* Content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}

// Specialized background variants
export function HeroBackground({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  return (
    <AnimatedBackground 
      variant="hero" 
      intensity="intense" 
      className={className}
    >
      {children}
    </AnimatedBackground>
  );
}

export function SectionBackground({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  return (
    <AnimatedBackground 
      variant="section" 
      intensity="medium" 
      className={className}
    >
      {children}
    </AnimatedBackground>
  );
}

export function CardBackground({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  return (
    <AnimatedBackground 
      variant="card" 
      intensity="subtle" 
      className={className}
    >
      {children}
    </AnimatedBackground>
  );
}

export function MinimalBackground({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  return (
    <AnimatedBackground 
      variant="minimal" 
      intensity="subtle" 
      className={className}
    >
      {children}
    </AnimatedBackground>
  );
}

// Interactive particle background
export function ParticleBackground({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  const { ref, isVisible } = useIntersectionObserver();
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number; color: string }>>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isVisible) return;

    // Generate particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.1,
      color: ['forest-green', 'muted-turquoise', 'soft-rose'][Math.floor(Math.random() * 3)]
    }));
    setParticles(newParticles);

    // Animation loop
    const animate = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed) % 100
      })));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  return (
    <div ref={ref} className={`relative overflow-hidden min-h-screen ${className}`}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-soft-rose via-white to-muted-turquoise opacity-20" />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {particles.map(particle => (
          <div
            key={particle.id}
            className={`absolute w-2 h-2 bg-${particle.color} rounded-full opacity-30 transition-all duration-1000 ${
              isVisible ? 'animate-pulse' : ''
        }`}
        style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}

// Gradient mesh background
export function GradientMeshBackground({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div ref={ref} className={`relative overflow-hidden min-h-screen ${className}`}>
      {/* Complex gradient mesh */}
      <div className={`absolute inset-0 transition-all duration-3000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-soft-rose via-white to-muted-turquoise opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-tl from-forest-green via-transparent to-soft-rose opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-muted-turquoise via-transparent to-soft-rose opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-forest-green to-transparent opacity-15" />
        
        {/* Radial gradients for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-muted-turquoise to-transparent opacity-20 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-soft-rose to-transparent opacity-15 rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-radial from-forest-green to-transparent opacity-10 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Subtle moving elements */}
      <div className={`absolute inset-0 transition-all duration-20000 ${
        isVisible ? 'animate-pulse' : ''
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-turquoise to-transparent opacity-5" />
      </div>

      {/* Content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}

export function BackgroundGeometricPattern({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--forest-green)" stopOpacity="0.1" />
            <stop offset="50%" stopColor="var(--muted-turquoise)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--soft-rose)" stopOpacity="0.1" />
          </linearGradient>
          
          <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--soft-rose)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--forest-green)" stopOpacity="0.05" />
          </radialGradient>
          
          <pattern id="grid" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M 6 0 L 0 0 0 6" fill="none" stroke="var(--forest-green)" strokeWidth="0.2" opacity="0.08"/>
          </pattern>
        </defs>
        
        {/* Background pattern */}
        <rect width="100" height="100" fill="url(#grid)" />
        
        {/* Abstract geometric shapes */}
        <path
          d="M0 0 L25 15 L50 0 L75 15 L100 0 L100 100 L75 85 L50 100 L25 85 L0 100 Z"
          fill="url(#brandGradient)"
          opacity="0.6"
        />
        
        {/* Floating geometric elements with brand colors */}
        <circle cx="15" cy="25" r="6" fill="var(--muted-turquoise)" opacity="0.25" />
        <circle cx="85" cy="75" r="10" fill="var(--soft-rose)" opacity="0.2" />
        <rect x="70" y="15" width="12" height="12" fill="var(--forest-green)" opacity="0.18" />
        
        {/* Additional geometric elements */}
        <polygon points="8,70 20,58 32,70 20,82" fill="var(--muted-turquoise)" opacity="0.22" />
        <ellipse cx="80" cy="20" rx="6" ry="3" fill="var(--soft-rose)" opacity="0.25" />
        
        {/* Subtle accent lines */}
        <line x1="0" y1="50" x2="100" y2="50" stroke="var(--forest-green)" strokeWidth="0.3" opacity="0.1" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="var(--muted-turquoise)" strokeWidth="0.3" opacity="0.1" />
      </svg>
    </div>
  );
}

export function WavePattern({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--forest-green)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--muted-turquoise)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--soft-rose)" stopOpacity="0.15" />
          </linearGradient>
          
          <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="0.8" fill="var(--muted-turquoise)" opacity="0.3" />
          </pattern>
        </defs>
        
        {/* Enhanced wave patterns with brand colors */}
        <path
          d="M0 50 Q25 35 50 50 T100 50 L100 100 L0 100 Z"
          fill="url(#waveGradient)"
          opacity="0.8"
        />
        
        <path
          d="M0 60 Q25 45 50 60 T100 60 L100 100 L0 100 Z"
          fill="url(#waveGradient)"
          opacity="0.6"
        />
        
        <path
          d="M0 70 Q25 55 50 70 T100 70 L100 100 L0 100 Z"
          fill="url(#waveGradient)"
          opacity="0.4"
        />
        
        {/* Dots pattern overlay */}
        <rect width="100" height="100" fill="url(#dots)" />
      </svg>
    </div>
  );
}

export function ParticleField({ className = "" }: { className?: string }) {
  const [particles, setParticles] = useState<Array<{ 
    x: number; 
    y: number; 
    vx: number; 
    vy: number; 
    size: number;
    color: string;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const particleCount = 60;
    const brandColors = [
      'var(--forest-green)',
      'var(--muted-turquoise)', 
      'var(--soft-rose)',
      'var(--light-gray)'
    ];
    
    const newParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2.5 + 0.8,
      color: brandColors[Math.floor(Math.random() * brandColors.length)],
      opacity: Math.random() * 0.6 + 0.2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {particles.map((particle, index) => (
          <circle
            key={index}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={particle.color}
            opacity={particle.opacity}
            className="animate-pulse"
          />
        ))}
      </svg>
    </div>
  );
}

// New: Animated Grid Pattern
export function AnimatedGridPattern({ className = "" }: { className?: string }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => (prev + 1) % 20);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="animatedGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path 
              d="M 10 0 L 0 0 0 10" 
              fill="none" 
              stroke="var(--forest-green)" 
              strokeWidth="0.3" 
              opacity="0.15"
            />
          </pattern>
        </defs>
        
        <rect 
          width="100" 
          height="100" 
          fill="url(#animatedGrid)"
          style={{
            transform: `translate(${offset}px, ${offset}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
      </svg>
    </div>
  );
}

// New: Floating Icons Pattern
export function FloatingIconsPattern({ className = "" }: { className?: string }) {
  const icons = [
    { icon: '💬', x: 15, y: 20, size: 8, color: 'var(--muted-turquoise)' },
    { icon: '🤖', x: 85, y: 30, size: 10, color: 'var(--forest-green)' },
    { icon: '📱', x: 25, y: 80, size: 7, color: 'var(--soft-rose)' },
    { icon: '🔒', x: 75, y: 75, size: 9, color: 'var(--muted-turquoise)' },
    { icon: '📊', x: 50, y: 15, size: 6, color: 'var(--forest-green)' },
    { icon: '🌐', x: 10, y: 60, size: 8, color: 'var(--soft-rose)' },
    { icon: '⚡', x: 90, y: 60, size: 7, color: 'var(--muted-turquoise)' },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {icons.map((item, index) => (
          <g key={index}>
            <circle
              cx={item.x}
              cy={item.y}
              r={item.size}
              fill={item.color}
              opacity="0.1"
              className="animate-pulse"
            />
            <text
              x={item.x}
              y={item.y + 2}
              textAnchor="middle"
              fontSize={item.size * 1.5}
              fill={item.color}
              opacity="0.3"
              className="animate-bounce"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {item.icon}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
