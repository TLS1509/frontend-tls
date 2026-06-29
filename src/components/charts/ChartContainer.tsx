import React from 'react';

/**
 * ChartContainer — wrapper pour tous les charts
 * Garantit cohérence visuelle (padding, borders, responsive)
 */
export const ChartContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`flex justify-center w-full bg-white rounded-lg border border-ink-100 p-stack ${className}`}>
    {children}
  </div>
);
