/**
 * Tests unitaires pour le hook useTheme
 * Design System TLS - The Learning Society
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import { ReactNode } from 'react';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('useTheme Hook', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.classList.remove('light', 'dark');
  });

  it('should initialize with light theme by default', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('light');
    expect(result.current.effectiveTheme).toBe('light');
  });

  it('should update theme when setTheme is called', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark');
    expect(result.current.effectiveTheme).toBe('dark');
    expect(localStorage.getItem('tls-theme')).toBe('dark');
  });

  it('should apply theme class to document element', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('dark');
    });

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should persist theme to localStorage', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('dark');
    });

    expect(localStorage.getItem('tls-theme')).toBe('dark');

    act(() => {
      result.current.setTheme('system');
    });

    expect(localStorage.getItem('tls-theme')).toBe('system');
  });

  it('should load saved theme from localStorage', () => {
    localStorage.setItem('tls-theme', 'dark');
    
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('dark');
  });

  it('should throw error when used outside ThemeProvider', () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a ThemeProvider');
  });
});
