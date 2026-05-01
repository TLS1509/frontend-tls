/**
 * HeroSection — Reusable hero component
 *
 * Generic hero section for pages with:
 * - Icon/badge
 * - Title
 * - Description
 * - Optional metadata
 * - Gradient background
 *
 * Uses TLS design tokens throughout.
 */

import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface HeroSectionProps {
  icon?: LucideIcon | React.ReactNode;
  title: string;
  description?: string;
  metadata?: Array<{ icon: React.ReactNode; text: string }>;
  gradient?: 'primary' | 'orange' | 'success' | 'danger';
  darkText?: boolean;
  children?: React.ReactNode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  icon: IconComponent,
  title,
  description,
  metadata,
  gradient = 'primary',
  darkText = false,
  children,
}) => {
  const gradients = {
    primary: 'linear-gradient(135deg, var(--tls-primary-500), var(--tls-primary-600))',
    orange: 'linear-gradient(135deg, var(--tls-orange-500), var(--tls-yellow-400))',
    success: 'linear-gradient(135deg, var(--tls-success-500), var(--tls-success-600))',
    danger: 'linear-gradient(135deg, var(--tls-red-500), var(--tls-orange-500))',
  };

  return (
    <div
      style={{
        background: gradients[gradient],
        color: darkText ? 'var(--text)' : 'white',
        padding: 'var(--s-12)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Icon */}
        {IconComponent && (
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: 'var(--r-xl)',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--s-4)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {React.isValidElement(IconComponent) ? (
              IconComponent
            ) : (
              React.createElement(IconComponent as React.ComponentType<{ size: number }>, { size: 28 })
            )}
          </div>
        )}

        {/* Title */}
        <h1
          style={{
            fontSize: 'var(--t-h2)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            margin: '0 0 var(--s-2)',
          }}
        >
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p
            style={{
              fontSize: 'var(--t-body-lg)',
              margin: '0 0 var(--s-6)',
              opacity: darkText ? 1 : 0.95,
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        )}

        {/* Metadata */}
        {metadata && metadata.length > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--s-6)',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {metadata.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
                {item.icon}
                <span style={{ fontSize: 'var(--t-body)' }}>{item.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Children */}
        {children}
      </div>
    </div>
  );
};

export default HeroSection;
