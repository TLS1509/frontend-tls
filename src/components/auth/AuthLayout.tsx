/**
 * AuthLayout Component
 *
 * Reusable composite layout for authentication pages
 * Includes: gradient background, animated blobs, glassmorphism card
 *
 * Props:
 * - children: Form content to render inside the card
 * - title?: Optional page title (renders before card)
 *
 * Features:
 * - Animated blob backgrounds (3 different pulse durations)
 * - Glassmorphism card with blur and shadow effects
 * - Responsive padding and card sizing
 * - Performance optimized (pointer-events-none on blobs)
 *
 * Based on Figma Auth page spec:
 * - Gradient: 90deg #55a1b4 → #164267
 * - 3 Blobs with rgba TLS colors, animate-pulse (7s, 5s+1s)
 * - Card: rgba(255,255,255,0.88) + blur(28px)
 */

import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--s-4) var(--s-6)',
      }}
    >
      {/* Background Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, var(--tls-primary-500) 0%, var(--tls-primary-900) 100%)',
          zIndex: -10,
        }}
      />

      {/* Blob 1 - Haut Centre (Statique) */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(-128px)',
          left: '33.33%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(180, 230, 240, 0.55), transparent 65%)',
          filter: 'blur(3xl)',
          pointerEvents: 'none',
          animation: 'pulse 7s ease-in-out infinite',
        }}
      />

      {/* Blob 2 - Bas Gauche (Pulse lent) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 'calc(-80px)',
          width: '384px',
          height: '384px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(42, 140, 155, 0.4), transparent 65%)',
          filter: 'blur(3xl)',
          pointerEvents: 'none',
          animation: 'pulse 7s ease-in-out infinite',
        }}
      />

      {/* Blob 3 - Haut Droite (Pulse rapide) */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          width: '288px',
          height: '288px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100, 200, 215, 0.5), transparent 65%)',
          filter: 'blur(3xl)',
          pointerEvents: 'none',
          animation: 'pulse 5s ease-in-out infinite',
          animationDelay: '1s',
        }}
      />

      {/* Glassmorphism Card */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          zIndex: 10,
        }}
      >
        <div
          style={{
            borderRadius: 'var(--r-2xl)',
            padding: 'var(--s-8) var(--s-10)',
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(255, 255, 255, 0.7)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.14), 0 8px 24px rgba(0, 0, 0, 0.08)',
          }}
        >
          {title && (
            <h1
              style={{
                margin: '0 0 var(--s-6) 0',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--t-h3)',
                fontWeight: 600,
                color: 'var(--text)',
                textAlign: 'center',
              }}
            >
              {title}
            </h1>
          )}
          {children}
        </div>
      </div>

      {/* CSS Animation Keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthLayout;
