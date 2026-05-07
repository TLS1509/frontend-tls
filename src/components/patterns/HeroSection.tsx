import React from 'react';
import type { LucideIcon } from 'lucide-react';

export type HeroGradient = 'primary' | 'orange' | 'success' | 'danger';

export interface HeroSectionProps {
  icon?: LucideIcon | React.ReactNode;
  title: string;
  description?: string;
  metadata?: Array<{ icon: React.ReactNode; text: string }>;
  gradient?: HeroGradient;
  darkText?: boolean;
  children?: React.ReactNode;
}

const GRADIENT_CLASSES: Record<HeroGradient, string> = {
  primary: 'bg-gradient-to-br from-primary-500 to-primary-600',
  orange:  'bg-gradient-to-br from-secondary-500 to-accent-400',
  success: 'bg-gradient-to-br from-success-base to-success-fg',
  danger:  'bg-gradient-to-br from-danger-base to-secondary-500',
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  icon: IconComponent,
  title,
  description,
  metadata,
  gradient = 'primary',
  darkText = false,
  children,
}) => {
  return (
    <div
      className={[
        'p-12 text-center',
        GRADIENT_CLASSES[gradient],
        darkText ? 'text-ink-900' : 'text-white',
      ].join(' ')}
    >
      <div className="max-w-[800px] mx-auto">
        {IconComponent && (
          <div className="w-[60px] h-[60px] rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4">
            {React.isValidElement(IconComponent)
              ? IconComponent
              : React.createElement(IconComponent as React.ComponentType<{ size: number }>, {
                  size: 28,
                })}
          </div>
        )}

        <h1 className="text-h2 font-display font-bold m-0 mb-2">{title}</h1>

        {description && (
          <p
            className={[
              'text-body-lg m-0 mb-6 leading-relaxed',
              darkText ? '' : 'opacity-95',
            ].join(' ')}
          >
            {description}
          </p>
        )}

        {metadata && metadata.length > 0 && (
          <div className="flex items-center gap-6 justify-center flex-wrap">
            {metadata.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {item.icon}
                <span className="text-body">{item.text}</span>
              </div>
            ))}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default HeroSection;
