"use client";

import { useState } from "react";

export default function HeroToggle() {
  const [heroVariant, setHeroVariant] = useState<"light" | "green">("light");

  const toggleHeroVariant = () => {
    const newVariant = heroVariant === "light" ? "green" : "light";
    setHeroVariant(newVariant);
    
    // Update the hero section data attribute
    const heroSection = document.querySelector('section[data-hero]');
    if (heroSection) {
      heroSection.setAttribute('data-hero', newVariant);
    }
  };

  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="flex items-center justify-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200">
        <span className="text-sm font-medium text-gray-700">Hero Background:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHeroVariant("light")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              heroVariant === "light"
                ? "bg-forest text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setHeroVariant("green")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              heroVariant === "green"
                ? "bg-forest text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Green
          </button>
        </div>
        <button
          onClick={toggleHeroVariant}
          className="px-3 py-2 bg-turquoise text-forest rounded-lg text-sm font-medium hover:bg-turquoise/80 transition-colors"
        >
          Toggle
        </button>
      </div>
    </div>
  );
}
