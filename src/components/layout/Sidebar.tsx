import React from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

/**
 * Sidebar — primary app navigation.
 *
 * Composition:
 *   <Sidebar collapsed={...} onToggleCollapse={...} brand={...} userCard={...}>
 *     <NavItem icon={...} label="..." href="..." active={...} count={...} />
 *     ...
 *   </Sidebar>
 *
 * No SidebarGroup labels — flat list. Collapsed state shows icons only.
 * SidebarUserCard handles avatar + name/email + dropdown trigger at the bottom.
 */

export interface SidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  brand?: React.ReactNode;
  /** Bottom user card (typically <SidebarUserCard />) */
  userCard?: React.ReactNode;
  children?: React.ReactNode;
  /** Mobile drawer open state (controlled). Hidden by default on mobile. */
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const SIDEBAR_BASE =
  'group/sidebar flex flex-col self-stretch min-h-0 bg-gradient-to-b from-primary-50/60 via-white to-white border-r border-ink-200/70 transition-[width] duration-300 ease-out';

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  onToggleCollapse,
  brand,
  userCard,
  children,
  mobileOpen = false,
  onMobileClose,
  className = '',
  ...rest
}) => {
  const widthClasses = collapsed ? 'w-[72px]' : 'w-[260px]';

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      <aside
        data-collapsed={collapsed}
        className={[
          SIDEBAR_BASE,
          widthClasses,
          // Mobile: fixed drawer, hidden by default
          'max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-50 max-md:w-[280px] max-md:shadow-xl',
          mobileOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full',
          'max-md:transition-transform max-md:duration-300',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label="Navigation principale"
        {...rest}
      >
        {/* Brand row */}
        <div className={['flex items-center gap-2 px-4 pt-5 pb-4', collapsed && 'justify-center px-3'].filter(Boolean).join(' ')}>
          <div className="shrink-0">{brand ?? <DefaultBrand collapsed={collapsed} />}</div>
          {onToggleCollapse && !collapsed && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="ml-auto inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-white shadow-sm hover:bg-primary-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              aria-label="Réduire la sidebar"
              title="Réduire la sidebar"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>
          )}
        </div>

        {/* Collapsed-only expand button (positioned next to logo) */}
        {onToggleCollapse && collapsed && (
          <div className="px-3 -mt-2 mb-2">
            <button
              type="button"
              onClick={onToggleCollapse}
              className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-500 text-white shadow-sm hover:bg-primary-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 mx-auto"
              aria-label="Étendre la sidebar"
              title="Étendre la sidebar"
            >
              <ChevronRight size={14} strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className={['flex-1 flex flex-col gap-1 overflow-y-auto', collapsed ? 'px-2' : 'px-3'].join(' ')}>
          {children}
        </nav>

        {/* User card at bottom */}
        {userCard && (
          <div className={['shrink-0 border-t border-ink-200/70 p-3', collapsed && 'px-2'].filter(Boolean).join(' ')}>
            {userCard}
          </div>
        )}
      </aside>
    </>
  );
};

// ─── Default brand (logo + title) ──────────────────────────────────────────

const DefaultBrand: React.FC<{ collapsed: boolean }> = ({ collapsed }) => (
  <div className={['flex items-center gap-2.5', collapsed && 'justify-center'].filter(Boolean).join(' ')}>
    <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center shadow-brand-sm">
      <Sparkles size={18} className="text-white" fill="currentColor" strokeWidth={1.5} />
    </div>
    {!collapsed && (
      <span className="font-display font-bold text-body-lg leading-tight text-primary-800">
        The Learning<br />Society
      </span>
    )}
  </div>
);

// ─── NavItem ───────────────────────────────────────────────────────────────

export interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: React.ReactNode;
  label: React.ReactNode;
  count?: React.ReactNode;
  active?: boolean;
  collapsed?: boolean;
}

const NAV_BASE =
  'group/nav relative flex items-center gap-3 rounded-pill font-body font-semibold text-body-sm no-underline transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

const NAV_INACTIVE =
  'text-ink-700 hover:bg-primary-100/60 hover:text-primary-800';

const NAV_ACTIVE =
  'bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-brand-sm';

export const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  count,
  active = false,
  collapsed = false,
  className = '',
  href = '#',
  ...rest
}) => {
  const sizeClasses = collapsed
    ? 'w-12 h-12 mx-auto justify-center px-0'
    : 'h-11 px-3.5';

  const classes = [
    NAV_BASE,
    sizeClasses,
    active ? NAV_ACTIVE : NAV_INACTIVE,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      href={href}
      className={classes}
      aria-current={active ? 'page' : undefined}
      title={typeof label === 'string' ? label : undefined}
      {...rest}
    >
      {icon && (
        <span className="inline-flex items-center justify-center shrink-0 w-5 h-5">
          {icon}
        </span>
      )}
      {!collapsed && <span className="flex-1 truncate">{label}</span>}
      {!collapsed && count != null && count !== '' && (
        <span
          className={[
            'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-pill text-micro font-bold tabular-nums',
            active
              ? 'bg-white/25 text-white'
              : 'bg-primary-100 text-primary-700 group-hover/nav:bg-primary-200',
          ].join(' ')}
        >
          {count}
        </span>
      )}
    </a>
  );
};

// ─── SidebarUserCard ────────────────────────────────────────────────────────

export interface SidebarUserCardProps {
  /** Avatar element — typically <Avatar size="sm" /> or initials text */
  avatar: React.ReactNode;
  name: string;
  subtitle?: string;
  /** Whether the dropdown is currently open (controls chevron direction) */
  menuOpen?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
  className?: string;
}

export const SidebarUserCard: React.FC<SidebarUserCardProps> = ({
  avatar,
  name,
  subtitle,
  menuOpen = false,
  onClick,
  collapsed = false,
  className = '',
}) => {
  if (collapsed) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`Menu ${name}`}
        aria-expanded={menuOpen}
        className={[
          'flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 cursor-pointer border-0 p-0',
          menuOpen && 'ring-2 ring-primary-300',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {avatar}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={menuOpen}
      className={[
        'flex items-center gap-3 w-full px-3 py-2.5 rounded-2xl bg-white/70 border border-ink-200 hover:bg-white hover:border-primary-300 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        menuOpen && 'border-primary-400 bg-white',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="shrink-0">{avatar}</span>
      <span className="flex-1 min-w-0 text-left">
        <span className="block text-body-sm font-bold text-ink-900 truncate">{name}</span>
        {subtitle && <span className="block text-caption text-ink-500 truncate">{subtitle}</span>}
      </span>
      <span className="shrink-0 text-ink-400">
        {menuOpen ? <ChevronDown size={16} strokeWidth={2.5} /> : <ChevronUp size={16} strokeWidth={2.5} />}
      </span>
    </button>
  );
};

// ─── SidebarGroup (DEPRECATED — kept for backward compat with no labels) ────

/**
 * @deprecated Use a flat list of NavItems directly inside Sidebar.
 * Still renders children but ignores the label prop (per redesign).
 */
export interface SidebarGroupProps {
  label?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  children,
  className = '',
}) => (
  <div className={['flex flex-col gap-1', className].filter(Boolean).join(' ')}>
    {children}
  </div>
);

export default Sidebar;
