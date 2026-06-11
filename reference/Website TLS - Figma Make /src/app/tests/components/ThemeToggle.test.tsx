/**
 * Tests unitaires pour le composant ThemeToggle
 * Design System TLS - The Learning Society
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle, ThemeToggleCompact } from '../../components/ui/theme-toggle';
import { ThemeProvider } from '../../contexts/ThemeContext';

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

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('should render all three theme buttons', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(screen.getByLabelText(/passer au thème clair/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/passer au thème sombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/passer au thème système/i)).toBeInTheDocument();
  });

  it('should switch theme when clicking buttons', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const darkButton = screen.getByLabelText(/passer au thème sombre/i);
    fireEvent.click(darkButton);

    expect(localStorage.getItem('tls-theme')).toBe('dark');
  });

  it('should apply active state to selected theme', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const lightButton = screen.getByLabelText(/passer au thème clair/i);
    expect(lightButton).toHaveStyle({ backgroundColor: expect.any(String) });
  });
});

describe('ThemeToggleCompact Component', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('should render compact toggle button', () => {
    render(
      <ThemeProvider>
        <ThemeToggleCompact />
      </ThemeProvider>
    );

    expect(screen.getByRole('button', { name: /changer le thème/i })).toBeInTheDocument();
  });

  it('should cycle through themes on click', () => {
    render(
      <ThemeProvider>
        <ThemeToggleCompact />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /changer le thème/i });
    
    // First click: light -> dark
    fireEvent.click(button);
    expect(localStorage.getItem('tls-theme')).toBe('dark');
    
    // Second click: dark -> system
    fireEvent.click(button);
    expect(localStorage.getItem('tls-theme')).toBe('system');
    
    // Third click: system -> light
    fireEvent.click(button);
    expect(localStorage.getItem('tls-theme')).toBe('light');
  });
});
