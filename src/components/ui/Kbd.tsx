import React from 'react';

export type KbdVariant = 'default' | 'glass';
export type KbdSize = 'sm' | 'md';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  variant?: KbdVariant;
  size?: KbdSize;
  keys?: string[];
}

const BASE = 'inline-flex items-center font-mono font-medium rounded-sm border whitespace-nowrap leading-none';

const VARIANT_CLASSES: Record<KbdVariant, string> = {
  default: 'bg-ink-50 text-ink-600 border-ink-200',
  glass:   'bg-white/15 text-white/80 border-white/20',
};

const SIZE_CLASSES: Record<KbdSize, string> = {
  sm: 'text-[10px] px-1.5 py-0.5',
  md: 'text-[11px] px-2 py-1',
};

export const Kbd: React.FC<KbdProps> = ({
  variant = 'default',
  size = 'md',
  keys,
  children,
  className = '',
  ...rest
}) => {
  const classes = [BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className]
    .filter(Boolean)
    .join(' ');

  if (keys && keys.length > 0) {
    return (
      <span className="inline-flex items-center gap-0.5" aria-label={keys.join('+')}>
        {keys.map((key, i) => (
          <React.Fragment key={key}>
            {i > 0 && (
              <span className="text-ink-400 text-[10px] mx-0.5" aria-hidden>+</span>
            )}
            <kbd className={classes} {...rest}>{key}</kbd>
          </React.Fragment>
        ))}
      </span>
    );
  }

  return (
    <kbd className={classes} {...rest}>
      {children}
    </kbd>
  );
};

export default Kbd;
