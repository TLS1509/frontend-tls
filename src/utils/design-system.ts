/**
 * Design System Utilities
 *
 * Helper functions for the Components showcase page:
 * - Fuzzy search matching
 * - WCAG contrast ratio calculation
 * - Component and token filtering
 * - Code snippet generation
 */

/**
 * Simple fuzzy search implementation
 * Matches query against text with flexible spacing
 * Example: "btn" matches "Button"
 */
export function fuzzySearch(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();

  if (!q) return true;
  if (!t) return false;

  let qIdx = 0;
  for (let i = 0; i < t.length && qIdx < q.length; i++) {
    if (t[i] === q[qIdx]) {
      qIdx++;
    }
  }

  return qIdx === q.length;
}

/**
 * Convert hex color to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance of a color
 * Used for WCAG contrast ratio calculation
 * Formula from WCAG 2.0: https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
export function getLuminance(rgb: { r: number; g: number; b: number }): number {
  const [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map((val) => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate WCAG contrast ratio between two colors
 * Returns ratio and determines if it meets AA/AAA standards
 * Formula from WCAG 2.0: https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export function calculateContrastRatio(
  hex1: string,
  hex2: string
): { ratio: number; passAA: boolean; passAAA: boolean } {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) {
    return { ratio: 0, passAA: false, passAAA: false };
  }

  const l1 = getLuminance(rgb1);
  const l2 = getLuminance(rgb2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  const ratio = (lighter + 0.05) / (darker + 0.05);

  return {
    ratio: Math.round(ratio * 100) / 100,
    passAA: ratio >= 4.5, // Level AA for normal text
    passAAA: ratio >= 7, // Level AAA for normal text
  };
}

/**
 * Check if color passes WCAG contrast requirements
 */
export function checkColorContrast(hex: string, againstLight = true): {
  AA: boolean;
  AAA: boolean;
} {
  const backgroundColor = againstLight ? '#FFFFFF' : '#000000';
  const { passAA, passAAA } = calculateContrastRatio(hex, backgroundColor);

  return { AA: passAA, AAA: passAAA };
}

/**
 * Generate JSX code snippet for a component
 */
export function getCopySnippet(
  componentName: string,
  variant?: string,
  size?: string,
  props: Record<string, string> = {}
): string {
  let propsStr = '';

  if (variant) propsStr += ` variant="${variant}"`;
  if (size) propsStr += ` size="${size}"`;

  Object.entries(props).forEach(([key, value]) => {
    propsStr += ` ${key}="${value}"`;
  });

  return `<${componentName}${propsStr}>Label</${componentName}>`;
}

/**
 * Get accessible color name from hex value
 */
export function getColorName(hex: string): string {
  const colorMap: Record<string, string> = {
    '#55A1B4': 'Teal',
    '#ED843A': 'Orange',
    '#DF9E3D': 'Yellow',
    '#FFFFFF': 'White',
    '#000000': 'Black',
    '#6B7981': 'Gray',
  };

  return colorMap[hex.toUpperCase()] || hex;
}

/**
 * Format hex color for display (with or without #)
 */
export function formatHex(hex: string, includeHash = true): string {
  const clean = hex.replace('#', '').toUpperCase();
  return includeHash ? `#${clean}` : clean;
}

/**
 * Deep search through object for a query string
 * Used for comprehensive search across components and tokens
 */
export function deepSearch(obj: any, query: string, keys: string[] = []): boolean {
  if (typeof obj === 'string') {
    return fuzzySearch(query, obj);
  }

  if (Array.isArray(obj)) {
    return obj.some((item) => deepSearch(item, query, keys));
  }

  if (typeof obj === 'object' && obj !== null) {
    for (const [key, value] of Object.entries(obj)) {
      if (keys.length === 0 || keys.includes(key)) {
        if (deepSearch(value, query, [])) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * Slugify a string for URL-friendly identifiers
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

/**
 * Debounce function for search input
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
