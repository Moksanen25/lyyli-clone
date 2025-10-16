'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import dynamic from 'next/dynamic';

interface DeferredComponentProps {
  children: ReactNode;
  delay?: number;
  fallback?: ReactNode;
  threshold?: number; // Intersection Observer threshold
}

export default function DeferredComponent({ 
  children, 
  delay = 0, 
  fallback = null,
  threshold = 0.1 
}: DeferredComponentProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isIntersecting, delay]);

  return (
    <div ref={ref} className="deferred-component">
      {shouldRender ? children : fallback}
    </div>
  );
}

// Dynamic imports for heavy components
export const DynamicChart = dynamic(() => import('./charts/Chart'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded" />,
  ssr: false,
});

export const DynamicMap = dynamic(() => import('./maps/Map'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded" />,
  ssr: false,
});

export const DynamicVideo = dynamic(() => import('./media/Video'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded" />,
  ssr: false,
});
