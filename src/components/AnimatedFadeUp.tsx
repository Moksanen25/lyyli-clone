'use client';

import React from 'react';

interface AnimatedFadeUpProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}

export default function AnimatedFadeUp({
  children,
  delayMs = 0,
  className = '',
}: AnimatedFadeUpProps) {
  const style: React.CSSProperties = delayMs
    ? { animationDelay: `${delayMs}ms` }
    : {};
  return (
    <div className={`animated-fade-up ${className}`} style={style}>
      {children}
    </div>
  );
}
