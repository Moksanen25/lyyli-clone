'use client';

import { useEffect } from 'react';
import { initWebVitals, preventCLS } from '@/lib/web-vitals';
import { 
  optimizeCriticalCSS, 
  preloadCriticalCSS, 
  optimizeImageLoading, 
  reserveSpaceForContent 
} from '@/lib/css-optimization';
import { optimizeFontLoading } from '@/lib/fonts';

export default function WebVitals() {
  useEffect(() => {
    // Initialize Web Vitals monitoring
    initWebVitals();
    
    // Prevent CLS
    preventCLS();
    
    // Optimize CSS and loading
    preloadCriticalCSS();
    reserveSpaceForContent();
    optimizeCriticalCSS();
    optimizeImageLoading();
    optimizeFontLoading();
  }, []);

  return null; // This component doesn't render anything
}
