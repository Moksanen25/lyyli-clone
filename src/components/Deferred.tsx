"use client";

import { useEffect, useMemo, useState } from "react";

interface DeferredProps {
  children: React.ReactNode;
  when?: "idle" | "visible";
}

export default function Deferred({ children, when = "idle" }: DeferredProps) {
  const [shouldRender, setShouldRender] = useState(when === "idle" ? false : false);
  const sentinelId = useMemo(() => `deferred-${Math.random().toString(36).slice(2)}`, []);

  useEffect(() => {
    if (when === "idle") {
      if (typeof (window as any).requestIdleCallback === "function") {
        (window as any).requestIdleCallback(() => setShouldRender(true), { timeout: 1500 });
      } else {
        setTimeout(() => setShouldRender(true), 300);
      }
      return;
    }

    if (when === "visible") {
      const el = document.getElementById(sentinelId);
      if (!el) return;
      const observer = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      }, { rootMargin: "200px" });
      observer.observe(el);
      return () => observer.disconnect();
    }
  }, [when, sentinelId]);

  if (when === "visible" && !shouldRender) {
    return <div id={sentinelId} aria-hidden />;
  }

  if (!shouldRender && when === "idle") {
    return null;
  }

  return <>{children}</>;
}


