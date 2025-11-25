"use client";

import React from "react";

/**
 * Silk-like animated background inspired by Reactbits “Silk”,
 * adapted to Lyyli brand colors.
 *
 * Colors come from CSS variables:
 *  - --rose (#F7EBEB)
 *  - --forest (#2F5D50)
 *
 * The effect combines slow-panning multi-radial layers with a gentle sheen sweep.
 * Motion is subtle by default and disabled for prefers-reduced-motion.
 */
export default function SilkBackground() {
  return (
    <div
      className="lyyli-silk fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    >
      {/* layered gradient field */}
      <div
        style={{
          position: "absolute",
          inset: "-10%",
          filter: "none",
          opacity: 0.95,
          background:
            "radial-gradient(60% 40% at 12% 18%, var(--rose, #F7EBEB) 0%, transparent 65%)," +
            "radial-gradient(55% 35% at 85% 20%, var(--forest, #2F5D50) 0%, transparent 60%)," +
            "radial-gradient(50% 40% at 20% 85%, var(--rose, #F7EBEB) 0%, transparent 65%)," +
            "radial-gradient(55% 35% at 82% 78%, rgba(47,93,80,0.7) 0%, transparent 60%)," +
            "radial-gradient(80% 80% at 50% 50%, rgba(247,235,235,0.6) 0%, transparent 70%)",
          backgroundSize: "180% 180%",
        }}
      />
      {/* soft sheen pass */}
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          pointerEvents: "none",
          background:
            "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.2) 45%, transparent 60%)",
          mixBlendMode: "soft-light",
          filter: "none",
        }}
      />
    </div>
  );
}


