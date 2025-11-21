'use client';

import React from 'react';
import AnimatedNumber from './AnimatedNumber';

interface MetricCardProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
  decimals?: number;
  bg?: 'gray' | 'turquoise' | 'rose';
}

export default function MetricCard({
  icon,
  value,
  suffix = '',
  prefix = '',
  label,
  description,
  decimals = 0,
  bg = 'gray',
}: MetricCardProps) {
  const bgClass =
    bg === 'turquoise'
      ? 'bg-turquoise/10'
      : bg === 'rose'
        ? 'bg-rose/10'
        : 'bg-grayLight';

  return (
    <div
      className={`group relative rounded-2xl ${bgClass} border border-gray-200 p-6 shadow-sm tilt-hover transition-shadow`}
      role="group"
      tabIndex={0}
    >
      {/* Spotlight overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(600px 200px at 50% 0%, rgba(167,214,209,0.15), rgba(255,255,255,0))',
        }}
      />
      {/* Icon */}
      <div className="relative z-10 w-12 h-12 rounded-xl bg-white shadow-md border border-gray-200 flex items-center justify-center text-forest mb-4">
        {icon}
      </div>
      {/* Metric */}
      <div className="relative z-10 text-3xl md:text-4xl font-bold text-forest font-playfair">
        <AnimatedNumber
          value={value}
          suffix={suffix}
          prefix={prefix}
          decimals={decimals}
        />
      </div>
      {/* Label */}
      <div className="relative z-10 mt-1 text-sm font-sans text-darkGray font-medium">
        {label}
      </div>
      {/* Description */}
      <p className="relative z-10 mt-2 text-sm font-sans text-mediumGray leading-relaxed">
        {description}
      </p>
    </div>
  );
}
