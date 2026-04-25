import React from 'react';

/**
 * Sidebar / NavItem — Source of truth: design-system/spec.json → components.Sidebar
 *
 * Primary app navigation. Grouped sections with active state (3px left-edge bar).
 */

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  user?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  brand,
  user,
  className = '',
  children,
  ...rest
}) => (
  <aside
    className={['sidebar', className].filter(Boolean).join(' ')}
    aria-label="Navigation principale"
    {...rest}
  >
    {brand && <div className="sidebar__brand">{brand}</div>}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--s-5)', overflowY: 'auto' }}>
      {children}
    </div>
    {user && <div className="sidebar__user">{user}</div>}
  </aside>
);

// ============================================================================
// SIDEBAR GROUP
// ============================================================================

export interface SidebarGroupProps {
  label?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  label,
  children,
  className = '',
}) => (
  <div className={['sidebar__group', className].filter(Boolean).join(' ')}>
    {label && <p className="sidebar__group-label">{label}</p>}
    {children}
  </div>
);

// ============================================================================
// NAV ITEM
// ============================================================================

export interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: React.ReactNode;
  label: React.ReactNode;
  /** Optional count/badge on the right */
  count?: React.ReactNode;
  active?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  count,
  active = false,
  className = '',
  href = '#',
  ...rest
}) => {
  const classes = [
    'nav-item',
    active && 'nav-item--active',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      href={href}
      className={classes}
      aria-current={active ? 'page' : undefined}
      {...rest}
    >
      {icon && <span className="nav-item__icon">{icon}</span>}
      <span className="nav-item__label">{label}</span>
      {count !== undefined && count !== null && (
        <span className="nav-item__count">{count}</span>
      )}
    </a>
  );
};

export default Sidebar;
