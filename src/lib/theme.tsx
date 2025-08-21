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

  // Initialize theme on mount
  useEffect(() => {
    // Get theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  // Apply theme to HTML element whenever theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    let finalTheme: 'light' | 'dark';
    
    if (theme === 'system') {
      finalTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      finalTheme = theme;
    }
    
    // Apply the theme class
    root.classList.add(finalTheme);
    setResolvedTheme(finalTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    console.log('Theme applied:', finalTheme, 'to element:', root.className);
  }, [theme]);

  const resetToLight = () => {
    setTheme('light');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, resetToLight }}>
      {children}
    </ThemeContext.Provider>
  );
}
