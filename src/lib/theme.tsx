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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('ThemeProvider: Setting mounted to true');
    setMounted(true);
    // Get theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') as Theme;
    console.log('ThemeProvider: Saved theme from localStorage:', savedTheme);
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      console.log('ThemeProvider: Setting theme to saved theme:', savedTheme);
      setTheme(savedTheme);
    } else {
      // Force light mode as default
      console.log('ThemeProvider: No saved theme, forcing light mode');
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  useEffect(() => {
    console.log('ThemeProvider: Theme effect triggered, theme:', theme, 'mounted:', mounted);
    if (!mounted) {
      console.log('ThemeProvider: Not mounted yet, skipping theme application');
      return;
    }
    
    const root = window.document.documentElement;
    console.log('ThemeProvider: Applying theme to root element:', theme);
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      console.log('ThemeProvider: System theme detected:', systemTheme);
      setResolvedTheme(systemTheme);
      root.classList.add(systemTheme);
    } else {
      console.log('ThemeProvider: Setting resolved theme to:', theme);
      setResolvedTheme(theme);
      root.classList.add(theme);
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  useEffect(() => {
    console.log('ThemeProvider: System theme change listener effect, theme:', theme, 'mounted:', mounted);
    if (!mounted) {
      console.log('ThemeProvider: Not mounted yet, skipping system theme listener');
      return;
    }
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const systemTheme = mediaQuery.matches ? 'dark' : 'light';
        console.log('ThemeProvider: System theme changed to:', systemTheme);
        setResolvedTheme(systemTheme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(systemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  const resetToLight = () => {
    console.log('ThemeProvider: Resetting to light theme');
    setTheme('light');
    localStorage.setItem('theme', 'light');
  };

  console.log('ThemeProvider: Rendering with theme:', theme, 'resolvedTheme:', resolvedTheme, 'mounted:', mounted);

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
