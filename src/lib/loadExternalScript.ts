'use client';

const loaders: Record<string, Promise<void>> = {};

export function loadExternalScriptOnce(src: string): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (loaders[src]) return loaders[src];
  loaders[src] = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;
    if (existing) {
      if ((existing as any)._loaded === true) return resolve();
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true });
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => {
      (s as any)._loaded = true;
      resolve();
    };
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  }).catch(err => {
    delete loaders[src];
    throw err;
  });
  return loaders[src];
}


