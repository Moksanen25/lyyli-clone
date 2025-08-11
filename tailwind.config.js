/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors - EXACT VALUES FROM BRAND BOOK
        forest: "#2F5D50", // Primary brand color - reliability and calm
        rose: "#F7EBEB", // Gentle warmth and empathy
        grayLight: "#F5F5F4", // Minimalism and clarity
        turquoise: "#A7D6D1", // Subtle technological accent

        // Supporting Colors
        darkGray: "#333333",
        mediumGray: "#666666",
        white: "#FFFFFF",

        // Semantic Color Mapping
        background: "#ffffff",
        foreground: "#2F5D50",
        primary: "#2F5D50",
        "primary-foreground": "#ffffff",
        secondary: "#F7EBEB",
        "secondary-foreground": "#2F5D50",
        accent: "#A7D6D1",
        "accent-foreground": "#2F5D50",
        muted: "#F5F5F4",
        "muted-foreground": "#666666",
      },
      fontFamily: {
        // Body text uses Inter via CSS variable
        sans: ["var(--font-inter)", "system-ui", "Arial", "sans-serif"],
        // Headings (use className="font-playfair")
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
      },
      fontSize: {
        // Typography Hierarchy - EXACT SIZES FROM BRAND BOOK
        xs: ["0.75rem", { lineHeight: "1.2" }], // 12px - Small text
        sm: ["0.875rem", { lineHeight: "1.3" }], // 14px - Captions
        base: ["1rem", { lineHeight: "1.6" }], // 16px - Body text (min requirement)
        lg: ["1.125rem", { lineHeight: "1.5" }], // 18px - Subheadings
        xl: ["1.25rem", { lineHeight: "1.4" }], // 20px - H4
        "2xl": ["1.5rem", { lineHeight: "1.3" }], // 24px - H3
        "3xl": ["2.25rem", { lineHeight: "1.2" }], // 36px - H2
        "4xl": ["3rem", { lineHeight: "1.2" }], // 48px - H1
        "5xl": ["3.75rem", { lineHeight: "1.2" }], // 60px - Large H1
      },
      spacing: {
        // Spacing Scale - 8px base unit from brand book
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      boxShadow: {
        soft: "0px 4px 12px rgba(0, 0, 0, 0.05)", // Card shadows
        medium: "0px 8px 24px rgba(0, 0, 0, 0.1)", // Modal shadows
      },
      screens: {
        xs: "320px", // Small mobile
        sm: "640px", // Mobile
        md: "1024px", // Desktop
        lg: "1440px", // Large desktop
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
