/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--tls-primary-50, #E8F5F9)',
          100: 'var(--tls-primary-100, #D0E8F0)',
          200: 'var(--tls-primary-200, #A2D1E8)',
          300: 'var(--tls-primary-300, #73BAE0)',
          400: 'var(--tls-primary-400, #64B1DB)',
          500: 'var(--tls-primary-500, #55A1B4)',
          600: 'var(--tls-primary-600, #3D7A8A)',
          700: 'var(--tls-primary-700, #2D5A66)',
          800: 'var(--tls-primary-800, #1D3A42)',
          900: 'var(--tls-primary-900, #1A3A42)',
        },
        secondary: {
          50: 'var(--tls-secondary-50, #FEF4EA)',
          100: 'var(--tls-secondary-100, #FEE8D5)',
          200: 'var(--tls-secondary-200, #FDD1A3)',
          300: 'var(--tls-secondary-300, #FCBB7A)',
          400: 'var(--tls-secondary-400, #FCA95F)',
          500: 'var(--tls-secondary-500, #ED843A)',
          600: 'var(--tls-secondary-600, #D6682A)',
          700: 'var(--tls-secondary-700, #B84E1F)',
          800: 'var(--tls-secondary-800, #9A3414)',
          900: 'var(--tls-secondary-900, #7C1A0A)',
        },
        accent: {
          50: 'var(--tls-accent-50, #FFFAED)',
          100: 'var(--tls-accent-100, #FFF3DB)',
          200: 'var(--tls-accent-200, #FFE8B8)',
          300: 'var(--tls-accent-300, #FFDD95)',
          400: 'var(--tls-accent-400, #FCD272)',
          500: 'var(--tls-accent-500, #F8B044)',
          600: 'var(--tls-accent-600, #E69A2F)',
          700: 'var(--tls-accent-700, #D4841A)',
          800: 'var(--tls-accent-800, #B86F0B)',
          900: 'var(--tls-accent-900, #9C5A00)',
        },
        neutral: {
          0: 'var(--tls-neutral-0, #ffffff)',
          50: 'var(--tls-neutral-50, #f9fafb)',
          100: 'var(--tls-neutral-100, #f3f4f6)',
          200: 'var(--tls-neutral-200, #e5e7eb)',
          300: 'var(--tls-neutral-300, #d1d5db)',
          400: 'var(--tls-neutral-400, #9ca3af)',
          500: 'var(--tls-neutral-500, #6b7280)',
          600: 'var(--tls-neutral-600, #4b5563)',
          700: 'var(--tls-neutral-700, #374151)',
          800: 'var(--tls-neutral-800, #1f2937)',
          900: 'var(--tls-neutral-900, #111827)',
          950: 'var(--tls-neutral-950, #0f172a)',
        },
        ink: {
          0: 'var(--tls-ink-0, #ffffff)',
          50: 'var(--tls-ink-50, #f9fafb)',
          100: 'var(--tls-ink-100, #f3f4f6)',
          200: 'var(--tls-ink-200, #e5e7eb)',
          300: 'var(--tls-ink-300, #d1d5db)',
          400: 'var(--tls-ink-400, #9ca3af)',
          500: 'var(--tls-ink-500, #6b7280)',
          600: 'var(--tls-ink-600, #4b5563)',
          700: 'var(--tls-ink-700, #374151)',
          800: 'var(--tls-ink-800, #1f2937)',
          900: 'var(--tls-ink-900, #1a1a1a)',
          950: 'var(--tls-ink-950, #0f172a)',
        },
      },
      spacing: {
        xs: '0.5rem',  // 8px
        sm: '1rem',    // 16px
        md: '1.5rem',  // 24px
        lg: '2rem',    // 32px
        xl: '3rem',    // 48px
        '2xl': '4rem', // 64px
      },
      fontFamily: {
        display: ['var(--font-display, "League Spartan", "Helvetica Neue", Arial, sans-serif)'],
        body: ['var(--font-body, "Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif)'],
        mono: ['var(--font-mono, "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace)'],
      },
      fontSize: {
        // Display headings (large — Tailwind utility scale)
        'heading-1': ['3rem', { lineHeight: '3.5rem', fontWeight: '600' }],
        'heading-2': ['2.25rem', { lineHeight: '2.75rem', fontWeight: '600' }],
        'heading-3': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '600' }],
        'heading-4': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'heading-5': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        // Content headings (matches --t-h* tokens)
        'h1': ['var(--t-h1, 2.25rem)', { lineHeight: '2.75rem', fontWeight: '700' }],
        'h2': ['var(--t-h2, 1.75rem)', { lineHeight: '2.25rem', fontWeight: '700' }],
        'h3': ['var(--t-h3, 1.375rem)', { lineHeight: '1.875rem', fontWeight: '600' }],
        'h4': ['var(--t-h4, 1.125rem)', { lineHeight: '1.625rem', fontWeight: '600' }],
        // Body scale (matches --t-body-* tokens)
        'body-lg': ['var(--t-body-lg, 1.125rem)', { lineHeight: '1.75rem' }],
        'body': ['var(--t-body, 1rem)', { lineHeight: '1.5rem' }],
        'body-sm': ['var(--t-body-sm, 0.9375rem)', { lineHeight: '1.5rem' }],
        'caption': ['var(--t-caption, 0.8125rem)', { lineHeight: '1.25rem' }],
        'micro': ['var(--t-micro, 0.6875rem)', { lineHeight: '1rem' }],
      },
      boxShadow: {
        xs: 'var(--tls-shadow-xs, 0 1px 2px 0 rgba(0, 0, 0, 0.05))',
        sm: 'var(--tls-shadow-sm, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1))',
        md: 'var(--tls-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1))',
        lg: 'var(--tls-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1))',
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
      },
      opacity: {
        disabled: 'var(--tls-opacity-disabled, 0.5)',
      },
    },
  },
  plugins: [],
}
