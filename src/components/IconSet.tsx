"use client";

import type { ReactNode } from "react";

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

  // New feature-specific icons
  ToneBasic: ({ className = "", size = 24 }: { className?: string; size?: number }) => (
    <svg className={`text-forest ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 8h12M6 12h8M6 16h6" />
    </svg>
  ),
  ToneAdvanced: ({ className = "", size = 24 }: { className?: string; size?: number }) => (
    <svg className={`text-forest ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M7 12h10M10 17h8" />
      <circle cx="7" cy="12" r="1.25" stroke="currentColor" />
      <circle cx="10" cy="17" r="1.25" stroke="currentColor" />
    </svg>
  ),
  Editor: ({ className = "", size = 24 }: { className?: string; size?: number }) => (
    <svg className={`text-forest ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  ),
  OrgRoles: ({ className = "", size = 24 }: { className?: string; size?: number }) => (
    <svg className={`text-forest ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21v-2a5 5 0 015-5h6a5 5 0 015 5v2" />
    </svg>
  ),
  SlackTeams: ({ className = "", size = 24 }: { className?: string; size?: number }) => (
    <svg className={`text-forest ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h7v10H3zM14 7h7v10h-7z" />
    </svg>
  ),
  AIAnalytics: ({ className = "", size = 24 }: { className?: string; size?: number }) => (
    <svg className={`text-forest ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19h16M6 16v-6m4 6v-4m4 4V7m4 9v-8" />
    </svg>
  ),
  CampaignMode: ({ className = "", size = 24 }: { className?: string; size?: number }) => (
    <svg className={`text-forest ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h12M4 18h8" />
    </svg>
  ),
  MediaLibrary: ({ className = "", size = 24 }: { className?: string; size?: number }) => (
    <svg className={`text-forest ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 13l3-3 5 5" />
    </svg>
  ),
  KPIReports: ({ className = "", size = 24 }: { className?: string; size?: number }) => (
    <svg className={`text-forest ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 15l3-3 4 4 5-7" />
    </svg>
  ),
  Templates: ({ className = "", size = 24 }: { className?: string; size?: number }) => (
    <svg className={`text-forest ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="4" y="5" width="7" height="6" rx="1" />
      <rect x="13" y="5" width="7" height="6" rx="1" />
      <rect x="4" y="13" width="7" height="6" rx="1" />
    </svg>
  ),
  Onboarding: ({ className = "", size = 24 }: { className?: string; size?: number }) => (
    <svg className={`text-forest ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  AIImage: ({ className = "", size = 24 }: { className?: string; size?: number }) => (
    <svg className={`text-forest ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8" cy="8" r="1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13l4-4 3 3 6-6 5 5v4H3v-8z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 8h2m-1-1v2" />
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
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
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

  // Branded Integration Icons
  Slack: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52-2.523c0-1.398 1.13-2.528 2.52-2.528s2.523 1.13 2.523 2.528c0 1.398-1.132 2.523-2.523 2.523m0-9.838a2.528 2.528 0 0 1-2.52-2.523c0-1.398 1.13-2.528 2.52-2.528s2.523 1.13 2.523 2.528c0 1.398-1.132 2.523-2.523 2.523" fill="#E01E5A"/>
      <path d="M5.042 15.165c0-1.398 1.132-2.528 2.523-2.528s2.528 1.13 2.528 2.528v2.523c0 1.398-1.137 2.528-2.528 2.528s-2.523-1.13-2.523-2.528v-2.523z" fill="#36C5F0"/>
      <path d="M18.958 8.835a2.528 2.528 0 0 1 2.523-2.523c1.398 0 2.528 1.13 2.528 2.523s-1.13 2.528-2.528 2.528c-1.393 0-2.523-1.13-2.523-2.528" fill="#2EB67D"/>
      <path d="M8.835 18.958c1.398 0 2.528 1.137 2.528 2.528s-1.13 2.528-2.528 2.528-2.523-1.137-2.523-2.528c0-1.391 1.125-2.528 2.523-2.528" fill="#ECB22E"/>
    </svg>
  ),

  MicrosoftTeams: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect width="24" height="24" rx="4" fill="#6264A7"/>
      <path d="M12.5 6.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5z" fill="white"/>
      <path d="M8 9.5c0-.828-.672-1.5-1.5-1.5S5 8.672 5 9.5s.672 1.5 1.5 1.5S8 10.328 8 9.5z" fill="white"/>
      <path d="M19 9.5c0-.828-.672-1.5-1.5-1.5S16 8.672 16 9.5s.672 1.5 1.5 1.5S19 10.328 19 9.5z" fill="white"/>
      <path d="M12.5 9.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5z" fill="white"/>
      <path d="M8 12.5c0-.828-.672-1.5-1.5-1.5S5 11.672 5 12.5s.672 1.5 1.5 1.5S8 13.328 8 12.5z" fill="white"/>
      <path d="M19 12.5c0-.828-.672-1.5-1.5-1.5S16 11.672 16 12.5s.672 1.5 1.5 1.5S19 13.328 19 12.5z" fill="white"/>
      <path d="M12.5 12.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5z" fill="white"/>
      <path d="M8 15.5c0-.828-.672-1.5-1.5-1.5S5 14.672 5 15.5s.672 1.5 1.5 1.5S8 16.328 8 15.5z" fill="white"/>
      <path d="M19 15.5c0-.828-.672-1.5-1.5-1.5S16 14.672 16 15.5s.672 1.5 1.5 1.5S19 16.328 19 15.5z" fill="white"/>
      <path d="M12.5 15.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5z" fill="white"/>
      <path d="M8 18.5c0-.828-.672-1.5-1.5-1.5S5 17.672 5 18.5s.672 1.5 1.5 1.5S8 19.328 8 18.5z" fill="white"/>
      <path d="M19 18.5c0-.828-.672-1.5-1.5-1.5S16 17.672 16 18.5s.672 1.5 1.5 1.5S19 19.328 19 18.5z" fill="white"/>
      <path d="M12.5 18.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5z" fill="white"/>
    </svg>
  ),

  Gmail: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M22.288 21l-10.944-6.64L.344 21A1.99 1.99 0 0 0 2 22h20c.75 0 1.467-.4 1.84-1.06-.226.04-.36.06-.552.06z" fill="#4285F4"/>
      <path d="M22.288 21L12 15l10.288-6.64A1.99 1.99 0 0 1 24 10v11c0 .75-.4 1.467-1.06 1.84-.04-.226-.06-.36-.652-.84z" fill="#34A853"/>
      <path d="M1.712 21L12 15 1.712 8.36A1.99 1.99 0 0 0 0 10v11c0 .75.4 1.467 1.06 1.84.04-.226.06-.36.652-.84z" fill="#FBBC04"/>
      <path d="M1.712 3L12 9l10.288-6A1.99 1.99 0 0 0 22 2H2c-.75 0-1.467.4-1.84 1.06.226-.04.36-.06.552-.06z" fill="#EA4335"/>
    </svg>
  ),

  Outlook: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect width="24" height="24" rx="2" fill="#0078D4"/>
      <path d="M7 8h10c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1z" fill="white"/>
      <path d="M8 10h8v4H8v-4z" fill="#0078D4"/>
      <path d="M9 11h6v1H9v-1zm0 2h6v1H9v-1z" fill="white"/>
      <path d="M12 6c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" fill="white"/>
    </svg>
  ),

  Facebook: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
    </svg>
  ),

  Instagram: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <defs>
        <radialGradient id="iconset-instagram-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDF497"/>
          <stop offset="5%" stopColor="#FDF497"/>
          <stop offset="45%" stopColor="#FD5949"/>
          <stop offset="60%" stopColor="#D6249F"/>
          <stop offset="90%" stopColor="#285AEB"/>
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="5.4" fill="url(#iconset-instagram-gradient)"/>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="white"/>
    </svg>
  ),

  Threads: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" fill="black"/>
      <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z" fill="black"/>
      <path d="M12 8c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" fill="black"/>
      <path d="M16 8h2v2h-2V8z" fill="black"/>
    </svg>
  ),

  XTwitter: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="black"/>
    </svg>
  ),

  SharePoint: ({
    className = "",
    size = 24,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect width="24" height="24" rx="2" fill="#0078D4"/>
      <path d="M6 6h12v12H6V6zm2 2v8h8V8H8zm2 2h4v4h-4v-4z" fill="white"/>
      <path d="M10 10h4v1h-4v-1zm0 2h4v1h-4v-1zm0 2h4v1h-4v-1z" fill="#0078D4"/>
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
