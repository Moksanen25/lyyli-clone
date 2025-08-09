import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Inter font for body text - clarity and readability
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Optimizes font loading performance
  weight: ["400", "500", "600", "700"], // Regular, Medium, Semi-Bold, Bold
});

// Playfair Display font for headings - elegance and trust
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap", // Optimizes font loading performance
  weight: ["400", "700"], // Regular, Bold
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Lyyli Clone",
  description: "Next.js 15 TypeScript project with App Router and SSR - Lyyli AI Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
