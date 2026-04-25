import React from 'react';

/**
 * DropdownMenu — Source of truth: design-system/spec.json → components.DropdownMenu
 *
 * Secondary actions grouped behind a trigger. Labels, separators, danger zone at bottom.
 * Consumers handle open/close state + positioning; this is a styled container.
 */

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  className = '',
  children,
  ...rest
}) => (
  <div
    className={['dd', className].filter(Boolean).join(' ')}
    role="menu"
    {...rest}
  >
    {children}
  </div>
);

// ============================================================================
// DROPDOWN LABEL (section header)
// ============================================================================

export const DropdownLabel: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  children,
  ...rest
}) => (
  <p className={['dd__label', className].filter(Boolean).join(' ')} {...rest}>
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

export const DropdownItem: React.FC<DropdownItemProps> = ({
  icon,
  shortcut,
  danger = false,
  className = '',
  children,
  ...rest
}) => {
  const classes = [
    'dd__item',
    danger && 'dd__item--danger',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} role="menuitem" {...rest}>
      {icon && <span className="dd__item__icon">{icon}</span>}
      <span className="dd__item__label">{children}</span>
      {shortcut && <kbd>{shortcut}</kbd>}
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
    className={['dd__sep', className].filter(Boolean).join(' ')}
    role="separator"
    {...rest}
  />
);

export default DropdownMenu;
