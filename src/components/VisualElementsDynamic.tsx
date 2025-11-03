"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Simple dynamic import wrapper
export const VisualElementsDynamic = dynamic(
  () => import("./VisualElements").then(mod => ({ default: mod.EnhancedGeometricPattern })),
  {
    loading: () => (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg" />
      </div>
    ),
    ssr: false,
  }
);

// Loading component for Suspense boundaries
export function VisualElementsLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-200 rounded-lg" />
    </div>
  );
}
