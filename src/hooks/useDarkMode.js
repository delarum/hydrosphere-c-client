// client/src/hooks/useDarkMode.js
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'hydros-theme';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggle = () => setIsDark(prev => !prev);

  return { isDark, toggle };
}