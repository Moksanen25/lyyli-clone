'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
  resetToLight: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('light');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Simple theme initialization
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Get theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme);
      if (savedTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setResolvedTheme(systemTheme);
      } else {
        setResolvedTheme(savedTheme);
      }
    } else {
      // Default to light mode
      setTheme('light');
      setResolvedTheme('light');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  // Apply theme to HTML element
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setResolvedTheme(systemTheme);
      root.classList.add(systemTheme);
    } else {
      setResolvedTheme(theme);
      root.classList.add(theme);
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  const resetToLight = () => {
    setTheme('light');
    localStorage.setItem('theme', 'light');
  };

  const value = {
    theme,
    setTheme,
    resolvedTheme,
    resetToLight,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
