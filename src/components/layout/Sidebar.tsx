import React from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, X } from 'lucide-react';
import { TlsLogo } from '../ui/TlsLogo';

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
  'group/sidebar relative flex flex-col self-stretch min-h-0 ' +
  // Glass elevated background : white/translucent with blur, subtle teal glow
  'bg-gradient-to-b from-white/95 via-primary-50/50 to-white/90 ' +
  'backdrop-blur-glass-heavy backdrop-saturate-150 ' +
  // Right edge: subtle inner border + soft outer drop shadow (teal-tinted)
  'border-r border-white/70 ring-1 ring-inset ring-primary-100/40 ' +
  'shadow-[8px_0_32px_-12px_rgba(85,161,180,0.18),2px_0_8px_-2px_rgba(85,161,180,0.08)] ' +
  'transition-[width] duration-slow ease-decelerate';

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
  // Width progressive : 220px tablet (768-1023), 260px desktop (1024+).
  // Sur mobile drawer, la classe `max-md:w-[280px]` override prend le dessus.
  const widthClasses = collapsed ? 'w-[72px]' : 'w-[220px] lg:w-[260px]';

  return (
    <>
      {/* Mobile backdrop — z-40 (scrim under modal) */}
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
          // Mobile: fixed drawer, hidden by default (z-50 above backdrop)
          'max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-50 max-md:w-[280px] max-md:shadow-xl',
          mobileOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full',
          'max-md:transition-transform max-md:duration-slow max-md:ease-decelerate',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label="Navigation principale"
        {...rest}
      >
        {/* Brand row + mobile close button */}
        <div className={['flex items-center justify-between gap-stack-xs px-4 pt-5 pb-section', collapsed && 'justify-center px-3 pb-7'].filter(Boolean).join(' ')}>
          <div className="shrink-0">{brand ?? <DefaultBrand collapsed={collapsed} />}</div>
          {/* Mobile-only close button — visible quand drawer ouvert sur viewport < 768px */}
          {onMobileClose && (
            <button
              type="button"
              onClick={onMobileClose}
              aria-label="Fermer la navigation"
              className="md:hidden shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-ink-50 hover:bg-ink-100 text-ink-700 hover:text-ink-900 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              <X size={18} strokeWidth={2.25} />
            </button>
          )}
        </div>

        {/* Collapse / expand toggle — visible sur tablet (md+) ET desktop. Sur mobile (<md)
            la sidebar est en mode drawer et le bouton est caché car redondant avec le X close. */}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className={[
              'absolute top-7 z-10 max-md:hidden inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/85 backdrop-blur-glass-light text-primary-700 ring-1 ring-primary-200/70 shadow-[0_4px_12px_-2px_rgba(85,161,180,0.3),0_2px_4px_-1px_rgba(85,161,180,0.15),inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-white hover:text-primary-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              collapsed ? '-right-5' : '-right-3',
            ].join(' ')}
            aria-label={collapsed ? 'Étendre la sidebar' : 'Réduire la sidebar'}
            title={collapsed ? 'Étendre la sidebar' : 'Réduire la sidebar'}
          >
            {collapsed ? <ChevronRight size={14} strokeWidth={2.5} /> : <ChevronLeft size={14} strokeWidth={2.5} />}
          </button>
        )}

        {/* Navigation */}
        <nav className={['flex-1 flex flex-col gap-tight overflow-y-auto', collapsed ? 'px-2' : 'px-3'].join(' ')}>
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
  <div className={['flex items-center gap-stack-xs.5', collapsed && 'justify-center'].filter(Boolean).join(' ')}>
    <TlsLogo size={collapsed ? 44 : 48} />
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
  /** Number or label displayed as count badge. Numbers >99 are displayed as "99+". */
  count?: React.ReactNode;
  active?: boolean;
  collapsed?: boolean;
}

/** Format a count value : numbers > 99 become "99+". Strings/nodes passed through. */
const formatCount = (count: React.ReactNode): React.ReactNode => {
  if (typeof count === 'number' && count > 99) return '99+';
  return count;
};

const NAV_BASE =
  'group/nav relative flex items-center gap-stack-xs font-body font-semibold text-body-sm no-underline transition-[background-color,color,box-shadow] duration-fast ease-standard cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

// Inactive items keep the soft pill shape; active items snap to a rounded
// square ("anchored" feel) with brand gradient + shadow.
const NAV_INACTIVE =
  'rounded-pill text-ink-700 hover:bg-primary-100/60 hover:text-primary-800';

const NAV_ACTIVE =
  'rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-brand-sm';

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
    : 'h-12 px-3.5 gap-stack-xs.5';

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
        <span className="inline-flex items-center justify-center shrink-0 w-6 h-6 [&>svg]:w-[22px] [&>svg]:h-[22px]">
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
          {formatCount(count)}
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
  /** Unread notification count — shown as red dot badge top-right of avatar */
  notificationCount?: number;
  className?: string;
}

export const SidebarUserCard: React.FC<SidebarUserCardProps> = ({
  avatar,
  name,
  subtitle,
  menuOpen = false,
  onClick,
  collapsed = false,
  notificationCount = 0,
  className = '',
}) => {
  const badge =
    notificationCount > 0 ? (
      <span
        aria-label={`${notificationCount} notification${notificationCount > 1 ? 's' : ''} non lue${notificationCount > 1 ? 's' : ''}`}
        className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-pill bg-danger-fg text-white font-body text-[10px] font-bold border-2 border-white shadow-sm"
      >
        {notificationCount > 9 ? '9+' : notificationCount}
      </span>
    ) : null;

  const avatarWithBadge = (
    <span className="relative inline-flex">
      {avatar}
      {badge}
    </span>
  );

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`Menu ${name}${notificationCount > 0 ? ` · ${notificationCount} notifications non lues` : ''}`}
        aria-expanded={menuOpen}
        className={[
          'relative flex items-center justify-center w-12 h-12 mx-auto rounded-xl bg-primary-100 text-primary-700 hover:bg-primary-200 transition-[background-color] duration-fast ease-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 cursor-pointer border-0 p-0',
          menuOpen && 'ring-2 ring-primary-300',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {avatarWithBadge}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={menuOpen}
      className={[
        'flex items-center gap-stack-xs w-full px-3 py-2.5 rounded-2xl bg-white/70 border border-ink-200 hover:bg-white hover:border-primary-300 transition-[background-color,border-color,box-shadow] duration-base ease-standard cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        menuOpen && 'border-primary-400 bg-white',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="shrink-0">{avatarWithBadge}</span>
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
  <div className={['flex flex-col gap-tight', className].filter(Boolean).join(' ')}>
    {children}
  </div>
);

export default Sidebar;
