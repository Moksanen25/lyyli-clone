"use client";

import React from "react";
import { normalizeClassName } from "@/lib/utils";

export default function StackingTestimonialCards() {
  return (
    <section aria-label="Testimonials" className="py-24">
      <div className="container mx-auto px-4">
        <div
          className={
            normalizeClassName(
              "bg-white rounded-2xl p-6 shadow-soft border border-gray-200 min-h-[320px] flex items-center justify-center"
            )
          }
       >
          <p className="text-mediumGray font-sans">Testimonials loading…</p>
        </div>
      </div>
    </section>
  );
}


