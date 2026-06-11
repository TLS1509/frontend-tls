import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  effectiveTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('tls-theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme('system');
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    const applyTheme = () => {
      const root = document.documentElement;
      
      let appliedTheme: 'light' | 'dark' = 'light';

      if (theme === 'system') {
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
        appliedTheme = systemPreference ? 'dark' : 'light';
      } else {
        appliedTheme = theme;
      }

      setEffectiveTheme(appliedTheme);
      root.classList.remove('light', 'dark');
      root.classList.add(appliedTheme);
      root.setAttribute('data-theme', appliedTheme);
    };

    applyTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('tls-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, effectiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
