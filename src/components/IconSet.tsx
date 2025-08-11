"use client";

import { ReactNode } from "react";

// Enhanced icon components with brand colors and visual effects
export const IconSet = {
  // AI and Technology Icons
  AI: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-forest transition-all duration-300 hover:text-turquoise ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  ),

  Communication: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-turquoise transition-all duration-300 hover:text-forest ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  ),

  Security: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-forest transition-all duration-300 hover:text-turquoise ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),

  Team: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-rose transition-all duration-300 hover:text-muted-turquoise ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
      />
    </svg>
  ),

  Analytics: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-muted-turquoise transition-all duration-300 hover:text-forest-green ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),

  // Business and Enterprise Icons
  Enterprise: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-forest-green transition-all duration-300 hover:text-muted-turquoise ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  ),

  Compliance: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-muted-turquoise transition-all duration-300 hover:text-forest-green ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),

  ROI: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-rose transition-all duration-300 hover:text-muted-turquoise ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
      />
    </svg>
  ),

  // Feature Icons
  Automation: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-forest-green transition-all duration-300 hover:text-muted-turquoise ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),

  Integration: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-muted-turquoise transition-all duration-300 hover:text-forest-green ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),

  Scalability: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-rose transition-all duration-300 hover:text-muted-turquoise ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12h6m-6 4h6"
      />
    </svg>
  ),

  // Contact and Support Icons
  Email: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-forest-green transition-all duration-300 hover:text-muted-turquoise ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),

  Phone: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-muted-turquoise transition-all duration-300 hover:text-forest-green ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  ),

  Location: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-rose transition-all duration-300 hover:text-muted-turquoise ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),

  // Social and Network Icons
  LinkedIn: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-forest-green transition-all duration-300 hover:text-muted-turquoise ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),

  Twitter: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-muted-turquoise transition-all duration-300 hover:text-forest-green ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  ),

  // Utility Icons
  ArrowRight: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-forest-green transition-all duration-300 hover:text-muted-turquoise ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  ),

  Check: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-forest-green transition-all duration-300 hover:text-muted-turquoise ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  ),

  Plus: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={`text-muted-turquoise transition-all duration-300 hover:text-forest-green ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  ),

  // Animated Icon Wrapper
  AnimatedIcon: ({
    children,
    className = "",
    animation = "pulse",
    delay = 0,
  }: {
    children: ReactNode;
    className?: string;
    animation?: "pulse" | "bounce" | "spin" | "ping";
    delay?: number;
  }) => (
    <div
      className={`transition-all duration-300 hover:scale-110 ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  ),

  // Icon with gradient background
  IconWithBackground: ({
    icon,
    className = "",
    size = 24,
    backgroundClass = "bg-gradient-to-br from-rose to-muted-turquoise",
  }: {
    icon: ReactNode;
    className?: string;
    size?: number;
    backgroundClass?: string;
  }) => (
    <div
      className={`w-${size} h-${size} ${backgroundClass} rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:shadow-lg hover:scale-110 ${className}`}
    >
      <div className="text-white">{icon}</div>
    </div>
  ),
};

export default IconSet;
