"use client";

import { useEffect } from "react";

export default function DevSWCleanup() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV !== 'production') {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister().catch(() => {});
        }
      });
      // Also clear any old caches created by previous SW versions
      if (window.caches && caches.keys) {
        caches.keys().then(keys => keys.forEach(key => caches.delete(key))).catch(() => {});
      }
    }
  }, []);

  return null;
}



