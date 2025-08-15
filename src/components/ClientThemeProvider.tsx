// Updated 2024-12-19: Created client wrapper for ThemeProvider

'use client';

import { ThemeProvider as BaseThemeProvider } from '@/lib/theme';

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  return <BaseThemeProvider>{children}</BaseThemeProvider>;
}
