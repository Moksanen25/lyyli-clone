'use client';

import { useEffect, useRef, useState } from 'react';

// Enhanced Geometric Pattern Component with brand colors and advanced animations
export function EnhancedGeometricPattern({ className = "" }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className={`w-full h-full transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--forest-green)" />
            <stop offset="50%" stopColor="var(--muted-turquoise)" />
            <stop offset="100%" stopColor="var(--soft-rose)" />
          </linearGradient>
          <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--soft-rose)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--forest-green)" stopOpacity="0.05" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Animated geometric shapes using brand colors */}
        <path
          d="M0 0 L30 20 L50 0 L80 20 L100 0 L100 100 L70 80 L50 100 L20 80 L0 100 Z"
          fill="url(#brandGradient)"
          opacity="0.08"
          className={`transition-all duration-2000 ${isVisible ? 'animate-pulse' : ''}`}
        />
        
        {/* Floating geometric elements with enhanced animations */}
        <circle 
          cx="20" cy="30" r="8" 
          fill="var(--muted-turquoise)" 
          opacity="0.2" 
          className={`transition-all duration-3000 ${isVisible ? 'animate-bounce' : ''}`}
        />
        <circle 
          cx="80" cy="70" r="12" 
          fill="var(--soft-rose)" 
          opacity="0.15" 
          className={`transition-all duration-2500 ${isVisible ? 'animate-ping' : ''}`}
        />
        <rect 
          x="60" y="10" width="15" height="15" 
          fill="var(--forest-green)" 
          opacity="0.12" 
          className={`transition-all duration-4000 ${isVisible ? 'animate-spin' : ''}`}
        />
        
        {/* Additional geometric elements with staggered animations */}
        <polygon 
          points="10,60 25,45 40,60 25,75" 
          fill="var(--muted-turquoise)" 
          opacity="0.18" 
          className={`transition-all duration-3500 ${isVisible ? 'animate-pulse' : ''}`}
        />
        <ellipse 
          cx="85" cy="25" rx="8" ry="4" 
          fill="var(--soft-rose)" 
          opacity="0.2" 
          className={`transition-all duration-3000 ${isVisible ? 'animate-bounce' : ''}`}
        />
        
        {/* Subtle grid pattern with animation */}
        <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="var(--forest-green)" strokeWidth="0.3" opacity="0.1"/>
        </pattern>
        <rect width="100" height="100" fill="url(#grid)" />
        
        {/* Glowing accent elements */}
        <circle 
          cx="50" cy="50" r="2" 
          fill="var(--muted-turquoise)" 
          opacity="0.6"
          filter="url(#glow)"
          className={`transition-all duration-2000 ${isVisible ? 'animate-pulse' : ''}`}
        />
      </svg>
    </div>
  );
}

// Enhanced Floating Elements with parallax, brand colors, and advanced interactions
export function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced floating elements with parallax effect and staggered animations */}
      <div 
        className={`absolute w-4 h-4 rounded-full bg-muted-turquoise opacity-25 transition-all duration-1000 ${
          isVisible ? 'animate-pulse' : 'opacity-0'
        }`}
        style={{
          left: '20%',
          top: '30%',
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          animationDelay: '0ms',
        }}
      />
      <div 
        className={`absolute w-6 h-6 rounded-full bg-soft-rose opacity-20 transition-all duration-1000 ${
          isVisible ? 'animate-bounce' : 'opacity-0'
        }`}
        style={{
          left: '80%',
          top: '60%',
          transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`,
          animationDelay: '200ms',
        }}
      />
      <div 
        className={`absolute w-3 h-3 rounded-full bg-forest-green opacity-30 transition-all duration-1000 ${
          isVisible ? 'animate-ping' : 'opacity-0'
        }`}
        style={{
          left: '60%',
          top: '20%',
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          animationDelay: '400ms',
        }}
      />
      
      {/* Additional floating elements with staggered animations */}
      <div 
        className={`absolute w-2 h-2 rounded-full bg-muted-turquoise opacity-40 transition-all duration-1000 ${
          isVisible ? 'animate-pulse' : 'opacity-0'
        }`}
        style={{
          left: '40%',
          top: '80%',
          transform: `translate(${-mousePosition.x * 0.008}px, ${-mousePosition.y * 0.008}px)`,
          animationDelay: '600ms',
        }}
      />
      <div 
        className={`absolute w-5 h-5 rounded-full bg-soft-rose opacity-25 transition-all duration-1000 ${
          isVisible ? 'animate-bounce' : 'opacity-0'
        }`}
        style={{
          left: '90%',
          top: '15%',
          transform: `translate(${mousePosition.x * 0.012}px, ${mousePosition.y * 0.012}px)`,
          animationDelay: '800ms',
        }}
      />
      
      {/* New: Geometric floating shapes */}
      <div 
        className={`absolute w-4 h-4 bg-forest-green opacity-20 transition-all duration-1000 ${
          isVisible ? 'animate-spin' : 'opacity-0'
        }`}
        style={{
          left: '10%',
          top: '50%',
          transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px) rotate(45deg)`,
          animationDelay: '1000ms',
        }}
      />
      <div 
        className={`absolute w-3 h-3 bg-muted-turquoise opacity-30 transition-all duration-1000 ${
          isVisible ? 'animate-pulse' : 'opacity-0'
        }`}
        style={{
          left: '70%',
          top: '90%',
          transform: `translate(${-mousePosition.x * 0.018}px, ${-mousePosition.y * 0.018}px)`,
          animationDelay: '1200ms',
        }}
      />
    </div>
  );
}

// Enhanced AI Communication Visualization with brand colors and advanced animations
export function AICommunicationVisual() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={ref} className="relative w-full h-64">
      {/* Central AI hub with enhanced styling and entrance animation */}
      <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}>
        <div className={`w-16 h-16 bg-gradient-to-br from-forest-green to-muted-turquoise rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
          isAnimating ? 'scale-110 shadow-xl ring-4 ring-muted-turquoise ring-opacity-30' : 'scale-100'
        }`}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        
        {/* Enhanced pulsing ring effects */}
        <div className={`absolute inset-0 w-16 h-16 border-2 border-muted-turquoise rounded-full transition-all duration-1000 ${
          isAnimating ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
        }`} />
        <div className={`absolute inset-0 w-16 h-16 border border-soft-rose rounded-full transition-all duration-1500 ${
          isAnimating ? 'scale-200 opacity-0' : 'scale-100 opacity-60'
        }`} />
      </div>

      {/* Enhanced communication nodes with brand colors and staggered entrance */}
      {[
        { angle: 0, color: 'muted-turquoise', label: 'Team', delay: 0 },
        { angle: 72, color: 'soft-rose', label: 'Clients', delay: 200 },
        { angle: 144, color: 'forest-green', label: 'Partners', delay: 400 },
        { angle: 216, color: 'muted-turquoise', label: 'Stakeholders', delay: 600 },
        { angle: 288, color: 'soft-rose', label: 'Vendors', delay: 800 },
      ].map((node, index) => (
        <div
          key={index}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{
            left: `${50 + Math.cos((node.angle * Math.PI) / 180) * 80}%`,
            top: `${50 + Math.sin((node.angle * Math.PI) / 180) * 80}%`,
            animationDelay: `${node.delay}ms`,
            transitionDelay: `${node.delay}ms`,
          }}
        >
          <div className={`w-8 h-8 bg-${node.color} rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg`}>
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
            <span className="text-xs text-medium-gray whitespace-nowrap font-medium">{node.label}</span>
          </div>
        </div>
      ))}

      {/* Enhanced connection lines with animation and glow effect */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
        {[0, 72, 144, 216, 288].map((angle, index) => {
          const x2 = 100 + Math.cos((angle * Math.PI) / 180) * 80;
          const y2 = 100 + Math.sin((angle * Math.PI) / 180) * 80;
          return (
            <line
              key={index}
              x1="100"
              y1="100"
              x2={x2}
              y2={y2}
              stroke="var(--muted-turquoise)"
              strokeWidth="1.5"
              opacity="0.4"
              className={`transition-all duration-1000 ${isVisible ? 'animate-pulse' : 'opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            />
          );
        })}
      </svg>
    </div>
  );
}

// Enhanced Gradient Background with sophisticated overlays and animations
export function GradientBackground({ className = "" }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      {/* Primary gradient layers with entrance animations */}
      <div className={`absolute inset-0 bg-gradient-to-br from-soft-rose via-white to-muted-turquoise opacity-40 transition-all duration-2000 ${
        isVisible ? 'opacity-40' : 'opacity-0'
      }`} />
      <div className={`absolute inset-0 bg-gradient-to-tl from-forest-green via-transparent to-soft-rose opacity-15 transition-all duration-2000 delay-300 ${
        isVisible ? 'opacity-15' : 'opacity-0'
      }`} />
      
      {/* Additional subtle gradients with staggered animations */}
      <div className={`absolute inset-0 bg-gradient-to-r from-muted-turquoise via-transparent to-soft-rose opacity-10 transition-all duration-2000 delay-600 ${
        isVisible ? 'opacity-10' : 'opacity-0'
      }`} />
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-forest-green to-transparent opacity-5 transition-all duration-2000 delay-900 ${
        isVisible ? 'opacity-5' : 'opacity-0'
      }`} />
      
      {/* Radial gradient overlay with entrance effect */}
      <div className={`absolute inset-0 bg-gradient-radial from-soft-rose via-transparent to-transparent opacity-20 transition-all duration-2000 delay-1200 ${
        isVisible ? 'opacity-20' : 'opacity-0'
      }`} />
      
      {/* Subtle moving gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-muted-turquoise to-transparent opacity-5 transition-all duration-10000 ${
        isVisible ? 'animate-pulse' : ''
      }`} />
    </div>
  );
}

// Enhanced Animated Wave with brand colors, better curves, and advanced animations
export function AnimatedWave({ className = "" }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`absolute bottom-0 left-0 w-full overflow-hidden ${className}`}>
      <svg
        className={`relative block w-full h-20 transition-all duration-2000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Enhanced wave paths with brand colors and animations */}
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          opacity="0.3"
          fill="var(--forest-green)"
          className={`transition-all duration-3000 ${isVisible ? 'animate-pulse' : ''}`}
        />
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.81,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          opacity="0.6"
          fill="var(--muted-turquoise)"
          className={`transition-all duration-3000 delay-200 ${isVisible ? 'animate-pulse' : ''}`}
        />
        <path
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          fill="var(--soft-rose)"
          opacity="0.8"
          className={`transition-all duration-3000 delay-400 ${isVisible ? 'animate-pulse' : ''}`}
        />
      </svg>
    </div>
  );
}

// Enhanced Interactive Card with sophisticated hover effects and brand colors
export function InteractiveCard({ 
  children, 
  className = "",
  hoverEffect = true 
}: { 
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative bg-white rounded-xl shadow-soft overflow-hidden transition-all duration-500 ${
        hoverEffect && isHovered ? 'shadow-medium scale-105 -translate-y-1' : ''
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced gradient overlay on hover with brand colors */}
      {hoverEffect && (
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-forest-green via-muted-turquoise to-soft-rose opacity-0 transition-all duration-500 ${
            isHovered ? 'opacity-8' : ''
          }`}
        />
      )}
      
      {/* Subtle border effect with brand colors */}
      <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${
        hoverEffect && isHovered ? 'ring-2 ring-muted-turquoise ring-opacity-30' : ''
      }`} />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
}

// Enhanced Stats Visualization with better animations, brand colors, and entrance effects
export function StatsVisual({ 
  value, 
  label, 
  icon, 
  trend = 'up',
  className = "" 
}: { 
  value: string;
  label: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-medium-gray'
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    neutral: '→'
  };

  return (
    <div ref={ref} className={`text-center group transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    } ${className}`}>
      <div className={`flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-soft-rose to-muted-turquoise rounded-full shadow-md transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${
        isVisible ? 'animate-pulse' : ''
      }`}>
        <div className="text-forest-green text-2xl">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-forest-green mb-2 transition-all duration-300 group-hover:text-muted-turquoise">{value}</div>
      <div className="text-medium-gray mb-2 font-medium">{label}</div>
      <div className={`text-sm font-medium ${trendColors[trend]} transition-all duration-300`}>
        {trendIcons[trend]} {trend === 'up' ? 'Growing' : trend === 'down' ? 'Declining' : 'Stable'}
      </div>
    </div>
  );
}

// Enhanced Progress Bar Component with brand colors and animations
export function ProgressBar({ 
  value, 
  max = 100, 
  label, 
  color = 'forest-green',
  showPercentage = true,
  className = ""
}: {
  value: number;
  max?: number;
  label: string;
  color?: string;
  showPercentage?: boolean;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const percentage = (value / max) * 100;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedValue(percentage);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, percentage]);
  
  return (
    <div ref={ref} className={`space-y-2 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    } ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-forest-green">{label}</span>
        {showPercentage && (
          <span className="text-sm text-medium-gray">{Math.round(percentage)}%</span>
        )}
      </div>
      <div className="w-full bg-light-gray rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full bg-${color} rounded-full transition-all duration-2000 ease-out ${
            isVisible ? 'animate-pulse' : ''
          }`}
          style={{ width: `${animatedValue}%` }}
        />
      </div>
    </div>
  );
}

// Enhanced Animated Counter Component with brand colors and entrance effects
export function AnimatedCounter({ 
  value, 
  duration = 2000,
  className = ""
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isVisible]);

  return (
    <div ref={ref} className={`text-4xl font-bold text-forest-green transition-all duration-1000 ${
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
    } ${className}`}>
      {count.toLocaleString()}
    </div>
  );
}

// Enhanced Feature Highlight Card with sophisticated visuals and brand colors
export function FeatureHighlightCard({
  icon,
  title,
  description,
  gradient = 'from-soft-rose to-muted-turquoise',
  className = ""
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient?: string;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`group relative bg-white rounded-2xl shadow-soft p-6 transition-all duration-1000 hover:shadow-xl hover:-translate-y-2 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    } ${className}`}>
      {/* Background gradient on hover with brand colors */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />
      
      {/* Icon container with enhanced styling */}
      <div className={`relative z-10 w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${
        isVisible ? 'animate-pulse' : ''
      }`}>
        <div className="text-2xl text-forest-green">
          {icon}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="heading-4 mb-3 text-forest-green group-hover:text-muted-turquoise transition-colors duration-300">
          {title}
        </h3>
        <p className="body-text text-medium-gray">
          {description}
        </p>
      </div>
      
      {/* Subtle border effect with brand colors */}
      <div className="absolute inset-0 rounded-2xl border border-transparent transition-all duration-500 group-hover:border-muted-turquoise group-hover:border-opacity-20" />
    </div>
  );
}

// Enhanced Animated Timeline Component with brand colors and entrance effects
export function AnimatedTimeline({
  steps,
  className = ""
}: {
  steps: Array<{ title: string; description: string; icon?: React.ReactNode }>;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    } ${className}`}>
      {steps.map((step, index) => (
        <div key={index} className="flex items-start gap-4 mb-8 last:mb-0">
          {/* Step number/icon with enhanced styling */}
          <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br from-forest-green to-muted-turquoise rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md transition-all duration-500 ${
            isVisible ? 'animate-pulse' : ''
          }`} style={{ transitionDelay: `${index * 200}ms` }}>
            {step.icon || (index + 1)}
          </div>
          
          {/* Content with staggered entrance */}
          <div className={`flex-1 pt-2 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`} style={{ transitionDelay: `${index * 200 + 100}ms` }}>
            <h3 className="heading-4 mb-2 text-forest-green">{step.title}</h3>
            <p className="body-text text-medium-gray">{step.description}</p>
          </div>
          
          {/* Connecting line with brand colors (except for last item) */}
          {index < steps.length - 1 && (
            <div className={`absolute left-6 top-12 w-0.5 h-8 bg-gradient-to-b from-muted-turquoise to-transparent transition-all duration-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`} style={{ transitionDelay: `${index * 200 + 200}ms` }} />
          )}
        </div>
      ))}
    </div>
  );
}

// New: Advanced Data Visualization Component
export function DataVisualization({
  data,
  type = 'bar',
  className = ""
}: {
  data: Array<{ label: string; value: number; color?: string }>;
  type?: 'bar' | 'pie' | 'line';
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const maxValue = Math.max(...data.map(d => d.value));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  if (type === 'bar') {
    return (
      <div ref={ref} className={`space-y-4 ${className}`}>
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-forest-green">{item.label}</span>
              <span className="text-sm text-medium-gray">{item.value}</span>
            </div>
            <div className="w-full bg-light-gray rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full bg-${item.color || 'muted-turquoise'} rounded-full transition-all duration-2000 ease-out ${
                  isVisible ? 'animate-pulse' : ''
                }`}
                style={{ 
                  width: isVisible ? `${(item.value / maxValue) * 100}%` : '0%',
                  transitionDelay: `${index * 200}ms`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null; // Add pie and line chart implementations as needed
}

// New: Interactive Testimonial Card with brand colors
export function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatar,
  rating = 5,
  className = ""
}: {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`group relative bg-white rounded-2xl shadow-soft p-6 transition-all duration-1000 hover:shadow-xl hover:-translate-y-2 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    } ${className}`}>
      {/* Quote icon */}
      <div className="absolute top-4 right-4 text-soft-rose text-3xl opacity-60">
        "
      </div>
      
      {/* Rating stars */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-light-gray'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      {/* Quote text */}
      <blockquote className="text-medium-gray mb-6 italic leading-relaxed">
        "{quote}"
      </blockquote>
      
      {/* Author info */}
      <div className="flex items-center">
        {avatar && (
          <img src={avatar} alt={author} className="w-12 h-12 rounded-full mr-4 object-cover" />
        )}
        <div>
          <div className="font-semibold text-forest-green">{author}</div>
          <div className="text-sm text-medium-gray">{role} at {company}</div>
        </div>
      </div>
      
      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-2xl border border-transparent transition-all duration-500 group-hover:border-muted-turquoise group-hover:border-opacity-20" />
    </div>
  );
}

// New: Animated Background Pattern with brand colors
export function AnimatedBackgroundPattern({ className = "" }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className={`absolute inset-0 transition-all duration-2000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(var(--forest-green) 1px, transparent 1px),
              linear-gradient(90deg, var(--forest-green) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Floating geometric shapes */}
        <div className={`absolute top-1/4 left-1/4 w-32 h-32 border border-muted-turquoise opacity-10 rounded-full transition-all duration-8000 ${
          isVisible ? 'animate-spin' : ''
        }`} />
        <div className={`absolute top-3/4 right-1/4 w-24 h-24 bg-soft-rose opacity-5 rounded-full transition-all duration-6000 ${
          isVisible ? 'animate-pulse' : ''
        }`} />
        <div className={`absolute bottom-1/4 left-1/3 w-16 h-16 border border-forest-green opacity-8 transition-all duration-10000 ${
          isVisible ? 'animate-spin' : ''
        }`} style={{ transform: 'rotate(45deg)' }} />
      </div>
    </div>
  );
}
