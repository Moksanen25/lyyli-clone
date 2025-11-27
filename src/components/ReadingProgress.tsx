'use client';

import React, { useEffect, useState } from 'react';

interface ReadingProgressProps {
  targetId: string;
  className?: string;
}

export default function ReadingProgress({
  targetId,
  className = '',
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY - (el.offsetTop || 0);
      const pct = Math.min(100, Math.max(0, (scrolled / Math.max(total, 1)) * 100));
      setProgress(pct);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [targetId]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent ${className}`}
      aria-hidden="true"
    >
      <div
        className="h-full bg-forest transition-[width] duration-200 ease-linear"
        style={{ width: `${progress}%` }}
      />
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          .reading-progress div {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}


