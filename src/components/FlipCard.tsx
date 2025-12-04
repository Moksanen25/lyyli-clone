'use client';

import React, { useEffect, useState, useId } from 'react';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function FlipCard({
  front,
  back,
  className = '',
  ariaLabel,
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const detailsId = useId();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduceMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
      mq.addEventListener?.('change', listener);
      return () => mq.removeEventListener?.('change', listener);
    }
    return undefined;
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setFlipped(v => !v);
    }
  };

  return (
    <div
      className={`flip-card ${flipped ? 'flipped' : ''} ${className}`}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-expanded={reduceMotion ? true : flipped}
      aria-controls={detailsId}
      onClick={() => setFlipped(v => !v)}
      onKeyDown={onKeyDown}
    >
      <div className="flip-inner rounded-2xl h-full">
        <div className="flip-front rounded-2xl h-full">{front}</div>
        <div className="flip-back rounded-2xl h-full" id={detailsId}>
          {back}
        </div>
      </div>
    </div>
  );
}
