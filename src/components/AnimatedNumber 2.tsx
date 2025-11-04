'use client';

import { useState, useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  separator?: string;
}

/**
 * Lightweight animated number component to replace react-countup
 * Reduces bundle size by ~9 KB while maintaining the same functionality
 */
export default function AnimatedNumber({
  value,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  separator = ',',
}: AnimatedNumberProps) {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;

    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;
    let current = 0;
    let animationFrame: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= stepDuration) {
        current += increment;
        lastTime = currentTime;

        if (current >= value) {
          setCount(value);
          return;
        }
        setCount(current);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration, isInView]);

  const formatNumber = (num: number): string => {
    const fixed = num.toFixed(decimals);
    const parts = fixed.split('.');

    // Add thousand separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);

    return parts.join('.');
  };

  return (
    <span ref={ref}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}
