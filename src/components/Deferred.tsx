"use client";

import { useEffect, useMemo, useState } from "react";

interface DeferredProps {
  children: React.ReactNode;
  when?: "idle" | "visible";
}

export default function Deferred({ children, when = "idle" }: DeferredProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const sentinelId = useMemo(() => `deferred-${Math.random().toString(36).slice(2)}`, []);

  useEffect(() => {
    // Idle: render after idle callback or short timeout; provide cleanup
    if (when === "idle") {
      let timeoutId: number | undefined;
      let idleId: number | undefined;
      if (typeof (window as any).requestIdleCallback === "function") {
        idleId = (window as any).requestIdleCallback(() => setShouldRender(true), { timeout: 1500 });
      } else {
        timeoutId = window.setTimeout(() => setShouldRender(true), 300);
      }
      return () => {
        if (idleId && typeof (window as any).cancelIdleCallback === "function") {
          (window as any).cancelIdleCallback(idleId);
        }
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }

    // Visible: render when sentinel enters viewport; provide cleanup
    if (when === "visible") {
      const el = document.getElementById(sentinelId);
      if (!el) {
        return undefined;
      }
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      }, { rootMargin: "200px" });
      observer.observe(el);
      return () => observer.disconnect();
    }

    return undefined;
  }, [when, sentinelId]);

  if (when === "visible" && !shouldRender) {
    return <div id={sentinelId} aria-hidden />;
  }

  if (!shouldRender && when === "idle") {
    return null;
  }

  return <>{children}</>;
}


