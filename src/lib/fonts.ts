import { Inter, Playfair_Display } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "700"],
  preload: true,
  fallback: ['serif'],
});

export const fontVars = `${inter.variable} ${playfair.variable}`;

// Font loading optimization
export function optimizeFontLoading() {
  if (typeof window === 'undefined') return;

  // Add font loading classes
  document.documentElement.classList.add('font-loading');
  
  // Remove loading class when fonts are loaded
  Promise.all([
    document.fonts.load('400 16px Inter'),
    document.fonts.load('700 16px Playfair Display'),
  ]).then(() => {
    document.documentElement.classList.remove('font-loading');
    document.documentElement.classList.add('font-loaded');
  }).catch(() => {
    // Fallback if font loading fails
    document.documentElement.classList.remove('font-loading');
    document.documentElement.classList.add('font-loaded');
  });
}
