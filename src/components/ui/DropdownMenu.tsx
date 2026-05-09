import React from 'react';

export type DropdownMenuVariant = 'solid' | 'glass';

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: DropdownMenuVariant;
}

const MENU_BASE =
  'min-w-[220px] p-1.5 rounded-xl flex flex-col gap-0.5 font-body animate-[dd-slide-up_0.2s_ease-out]';

const MENU_VARIANTS: Record<DropdownMenuVariant, string> = {
  solid:
    'bg-white border border-ink-200 shadow-lg',
  glass:
    'bg-white/80 backdrop-blur-2xl backdrop-saturate-150 border border-white/60 ring-1 ring-primary-100/50 shadow-[0_20px_60px_-15px_rgba(85,161,180,0.35),0_8px_25px_-8px_rgba(85,161,180,0.15)]',
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  variant = 'solid',
  className = '',
  children,
  ...rest
}) => (
  <div
    className={[MENU_BASE, MENU_VARIANTS[variant], className].filter(Boolean).join(' ')}
    role="menu"
    {...rest}
  >
    {children}
  </div>
);

// ============================================================================
// DROPDOWN LABEL
// ============================================================================

export const DropdownLabel: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  children,
  ...rest
}) => (
  <p
    className={[
      'font-mono text-micro font-bold uppercase tracking-wider text-ink-500 px-2.5 pt-2 pb-1 m-0',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  >
    {children}
  </p>
);

// ============================================================================
// DROPDOWN ITEM
// ============================================================================

export type DropdownItemBadge = 'demo' | 'pro' | 'new' | 'beta';

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  shortcut?: string;
  /** Trailing badge chip — e.g. 'DEMO', 'PRO', 'NEW' */
  badge?: DropdownItemBadge | React.ReactNode;
  danger?: boolean;
}

const ITEM_BASE =
  'group relative flex items-center gap-2.5 w-full px-3 py-2.5 bg-transparent border-0 rounded-md text-body-sm font-medium cursor-pointer text-left transition-all ' +
  'focus-visible:outline-2 focus-visible:outline-offset-[-2px]';

const ITEM_DEFAULT =
  'text-ink-900 hover:bg-primary-50 focus-visible:outline-primary-500 [&_kbd]:hover:bg-primary-100 [&_kbd]:hover:text-primary-700';

const ITEM_DANGER =
  'text-danger-fg hover:bg-danger-bg focus-visible:outline-danger-base';

const BADGE_CLASSES: Record<DropdownItemBadge, string> = {
  demo: 'bg-gradient-to-br from-secondary-400 to-secondary-600 text-white',
  pro:  'bg-gradient-to-br from-secondary-500 to-secondary-700 text-white',
  new:  'bg-gradient-to-br from-success-base to-success-fg text-white',
  beta: 'bg-gradient-to-br from-primary-400 to-primary-600 text-white',
};

const BADGE_LABELS: Record<DropdownItemBadge, string> = {
  demo: 'DEMO',
  pro: 'PRO',
  new: 'NEW',
  beta: 'BETA',
};

const BUILTIN_BADGES = new Set<string>(['demo', 'pro', 'new', 'beta']);

export const DropdownItem: React.FC<DropdownItemProps> = ({
  icon,
  shortcut,
  badge,
  danger = false,
  className = '',
  children,
  ...rest
}) => {
  const classes = [ITEM_BASE, danger ? ITEM_DANGER : ITEM_DEFAULT, className]
    .filter(Boolean)
    .join(' ');

  const isBuiltinBadge = typeof badge === 'string' && BUILTIN_BADGES.has(badge);

  return (
    <button type="button" className={classes} role="menuitem" {...rest}>
      {icon && (
        <span
          className={[
            'inline-flex items-center justify-center w-4 h-4 shrink-0 transition-transform group-hover:scale-110',
            danger ? 'text-danger-base' : 'text-ink-500 group-hover:text-primary-600',
          ].join(' ')}
        >
          {icon}
        </span>
      )}
      <span className="flex-1">{children}</span>
      {badge != null && isBuiltinBadge && (
        <span
          className={[
            'inline-flex items-center justify-center px-2 py-0.5 rounded-pill text-[10px] font-extrabold tracking-wider shadow-sm shrink-0',
            BADGE_CLASSES[badge as DropdownItemBadge],
          ].join(' ')}
        >
          {BADGE_LABELS[badge as DropdownItemBadge]}
        </span>
      )}
      {badge != null && !isBuiltinBadge && (
        <span className="shrink-0">{badge}</span>
      )}
      {shortcut && (
        <kbd className="font-mono text-[11px] px-1.5 py-0.5 bg-primary-50 text-ink-500 rounded-sm border border-primary-200 whitespace-nowrap transition-all">
          {shortcut}
        </kbd>
      )}
    </button>
  );
};

// ============================================================================
// DROPDOWN SEPARATOR
// ============================================================================

export const DropdownSeparator: React.FC<React.HTMLAttributes<HTMLHRElement>> = ({
  className = '',
  ...rest
}) => (
  <hr
    className={[
      'h-px my-1 border-0 bg-gradient-to-r from-transparent via-primary-200 to-transparent',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    role="separator"
    {...rest}
  />
);

export default DropdownMenu;
