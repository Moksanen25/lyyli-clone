"use client";

import { useEffect, useMemo, useState, useRef, type ReactNode } from "react";

interface DeferredProps {
  children: ReactNode;
  /**
   * Loading strategy:
   * - "idle": Load when browser is idle (requestIdleCallback)
   * - "visible": Load when element becomes visible (IntersectionObserver)
   */
  when?: "idle" | "visible";
  /**
   * Delay in milliseconds before rendering after trigger condition is met
   * @default 0
   */
  delay?: number;
  /**
   * Content to show before the component is loaded
   * @default null
   */
  fallback?: ReactNode;
  /**
   * IntersectionObserver threshold (0-1)
   * Only applies when when="visible"
   * @default 0.1
   */
  threshold?: number;
  /**
   * IntersectionObserver rootMargin
   * Only applies when when="visible"
   * @default "200px"
   */
  rootMargin?: string;
  /**
   * Optional className for the wrapper element
   * If not provided, no wrapper div is used (fragment mode)
   */
  className?: string;
}

export default function Deferred({
  children,
  when = "idle",
  delay = 0,
  fallback = null,
  threshold = 0.1,
  rootMargin = "200px",
  className,
}: DeferredProps): ReactNode {
  const [shouldRender, setShouldRender] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const sentinelId = useMemo(
    () => `deferred-${Math.random().toString(36).slice(2)}`,
    []
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Handle the delay timer after trigger
  useEffect(() => {
    if (!isTriggered || delay === 0) {
      if (isTriggered) {
        setShouldRender(true);
      }
      return undefined;
    }

    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [isTriggered, delay]);

  // Handle idle loading
  useEffect(() => {
    if (when !== "idle") return undefined;

    let timeoutId: number | undefined;
    let idleId: number | undefined;

    interface WindowWithIdleCallback extends Window {
      requestIdleCallback?: (
        callback: () => void,
        options?: { timeout: number }
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    }

    const win = window as unknown as WindowWithIdleCallback;

    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(() => setIsTriggered(true), {
        timeout: 1500,
      });
    } else {
      timeoutId = window.setTimeout(() => setIsTriggered(true), 300);
    }

    return () => {
      if (idleId && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [when]);

  // Handle visible loading with IntersectionObserver
  useEffect(() => {
    if (when !== "visible") return undefined;

    // Use wrapper ref if className is provided, otherwise use sentinel element
    const targetElement = className
      ? wrapperRef.current
      : document.getElementById(sentinelId);

    if (!targetElement) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsTriggered(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(targetElement);

    return () => observer.disconnect();
  }, [when, sentinelId, rootMargin, threshold, className]);

  // Render logic
  if (when === "visible" && !shouldRender) {
    if (className) {
      return (
        <div ref={wrapperRef} className={className}>
          {fallback}
        </div>
      );
    }
    return <div id={sentinelId} aria-hidden="true" />;
  }

  if (!shouldRender) {
    if (className) {
      return <div className={className}>{fallback}</div>;
    }
    return fallback ?? null;
  }

  // Render children
  if (className) {
    return <div className={className}>{children}</div>;
  }

  return children;
}
