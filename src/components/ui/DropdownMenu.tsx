import React from 'react';

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

const MENU_CLASSES =
  'min-w-[220px] p-1.5 bg-white border border-ink-200 rounded-xl shadow-lg flex flex-col gap-0.5 font-body ' +
  'animate-[dd-slide-up_0.2s_ease-out]';

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  className = '',
  children,
  ...rest
}) => (
  <div className={[MENU_CLASSES, className].filter(Boolean).join(' ')} role="menu" {...rest}>
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

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  shortcut?: string;
  danger?: boolean;
}

const ITEM_BASE =
  'group relative flex items-center gap-2.5 w-full px-3 py-2.5 bg-transparent border-0 rounded-md text-body-sm font-medium cursor-pointer text-left transition-all ' +
  'focus-visible:outline-2 focus-visible:outline-offset-[-2px]';

const ITEM_DEFAULT =
  'text-ink-900 hover:bg-primary-50 focus-visible:outline-primary-500 [&_kbd]:hover:bg-primary-100 [&_kbd]:hover:text-primary-700';

const ITEM_DANGER =
  'text-danger-fg hover:bg-danger-bg focus-visible:outline-danger-base';

export const DropdownItem: React.FC<DropdownItemProps> = ({
  icon,
  shortcut,
  danger = false,
  className = '',
  children,
  ...rest
}) => {
  const classes = [ITEM_BASE, danger ? ITEM_DANGER : ITEM_DEFAULT, className]
    .filter(Boolean)
    .join(' ');

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
