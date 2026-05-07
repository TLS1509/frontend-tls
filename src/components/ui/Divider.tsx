import React from 'react';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SPACING_H: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'my-2',
  md: 'my-4',
  lg: 'my-8',
};

const SPACING_V: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'mx-2',
  md: 'mx-4',
  lg: 'mx-8',
};

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  spacing = 'md',
  className = '',
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={['inline-block w-px self-stretch bg-ink-200', SPACING_V[spacing], className]
          .filter(Boolean)
          .join(' ')}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        className={['flex items-center gap-3', SPACING_H[spacing], className]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="flex-1 h-px bg-ink-200" aria-hidden="true" />
        <span className="text-caption font-medium text-ink-500 uppercase tracking-wider">
          {label}
        </span>
        <div className="flex-1 h-px bg-ink-200" aria-hidden="true" />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      className={['border-0 h-px bg-ink-200', SPACING_H[spacing], className]
        .filter(Boolean)
        .join(' ')}
    />
  );
};

export default Divider;
