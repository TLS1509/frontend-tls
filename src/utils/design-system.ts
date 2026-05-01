/**
 * Design System Utilities
 *
 * Shared utilities for design system components and layouts
 */

/**
 * Debounce function - delays function execution until after specified delay
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Get responsive breakpoint value
 * @param value - Value to use at breakpoints
 * @returns Object with responsive values
 */
export const breakpoints = {
  mobile: 375,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1920,
};

/**
 * Container max-widths for different page layouts
 */
export const containerSizes = {
  narrow: '600px',  // For narrow content (single column text)
  default: '900px', // For standard content (main pages)
  wide: '1200px',   // For wide content (full dashboard)
  full: '100%',     // Full width
};

/**
 * Standard page layouts
 */
export const layouts = {
  narrow: {
    maxWidth: '600px',
    padding: 'var(--s-8)',
    margin: '0 auto',
  },
  default: {
    maxWidth: '900px',
    padding: 'var(--s-8)',
    margin: '0 auto',
  },
  wide: {
    maxWidth: '1200px',
    padding: 'var(--s-8)',
    margin: '0 auto',
  },
};
