'use client';

import React, { useEffect, useMemo, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleTOCProps {
  targetId: string;
  className?: string;
  minLevel?: number; // e.g., 2
  maxLevel?: number; // e.g., 3
}

export default function ArticleTOC({
  targetId,
  className = '',
  minLevel = 2,
  maxLevel = 3,
}: ArticleTOCProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const root = document.getElementById(targetId);
    if (!root) return;
    const selector = Array.from({ length: maxLevel - minLevel + 1 })
      .map((_, i) => `h${i + minLevel}`)
      .join(',');
    const headings = Array.from(root.querySelectorAll<HTMLHeadingElement>(selector));
    const collected: TocItem[] = headings
      .filter(h => !!h.id)
      .map(h => ({
        id: h.id,
        text: h.textContent || '',
        level: Number(h.tagName.replace('H', '')),
      }));
    setItems(collected);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('id');
          if (!id) return;
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: [0, 1.0],
      }
    );

    headings.forEach(h => observer.observe(h));
    return () => observer.disconnect();
  }, [targetId, minLevel, maxLevel]);

  const hasItems = items.length > 0;
  const grouped = useMemo(() => items, [items]);

  if (!hasItems) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={`sticky top-28 self-start hidden lg:block ${className}`}
    >
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="text-xs uppercase tracking-wide text-mediumGray mb-3 font-sans">
          On this page
        </div>
        <ul className="space-y-2">
          {grouped.map(item => (
            <li key={item.id} className="leading-snug">
              <a
                href={`#${item.id}`}
                className={`block text-sm transition-colors ${
                  activeId === item.id ? 'text-forest font-semibold' : 'text-darkGray hover:text-forest'
                } ${item.level === 3 ? 'pl-3' : ''}`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}


