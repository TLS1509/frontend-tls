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
        className={[
          'inline-block w-px self-stretch bg-gradient-to-b from-transparent via-ink-200 to-transparent',
          SPACING_V[spacing],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        className={['flex items-center gap-stack-xs', SPACING_H[spacing], className]
          .filter(Boolean)
          .join(' ')}
      >
        <div
          className="flex-1 h-px bg-gradient-to-r from-transparent to-ink-200"
          aria-hidden="true"
        />
        <span className="text-caption font-bold text-ink-500 uppercase tracking-[0.12em]">
          {label}
        </span>
        <div
          className="flex-1 h-px bg-gradient-to-l from-transparent to-ink-200"
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      className={[
        'border-0 h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent',
        SPACING_H[spacing],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
};

export default Divider;
