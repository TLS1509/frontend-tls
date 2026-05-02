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
import './auth.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="auth__layout">
      {/* Background Gradient */}
      <div className="auth__background" />

      {/* Blob 1 - Haut Centre (Statique) */}
      <div className="auth__blob auth__blob--top-center" />

      {/* Blob 2 - Bas Gauche (Pulse lent) */}
      <div className="auth__blob auth__blob--bottom-left" />

      {/* Blob 3 - Haut Droite (Pulse rapide) */}
      <div className="auth__blob auth__blob--top-right" />

      {/* Glassmorphism Card */}
      <div className="auth__card-container">
        <div className="auth__card">
          {title && (
            <h1 className="auth__title">
              {title}
            </h1>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
