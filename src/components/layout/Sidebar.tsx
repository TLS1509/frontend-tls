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
  // Glass teinté — primary-100 dominant pour que le tint soit visible sur fond clair
  // primary-100 = #DCEBEF (teal doux mais reconnaissable), blanc réduit à 30% au centre
  'bg-gradient-to-b from-primary-100/85 via-white/30 to-primary-100/80 ' +
  'backdrop-blur-glass-heavy backdrop-saturate-[220%] ' +
  // Right edge: border teal visible + shadow droite profonde (sépare du contenu)
  'border-r border-primary-300/45 ' +
  'shadow-[24px_0_64px_-12px_rgba(85,161,180,0.32),6px_0_20px_-4px_rgba(85,161,180,0.18),inset_0_1px_0_rgba(255,255,255,0.90),inset_-1px_0_0_rgba(255,255,255,0.50)] ' +
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
        <div className={['flex items-center justify-between gap-stack-xs pl-6 pr-4 pt-6 pb-6', collapsed && 'justify-center px-2 pb-6'].filter(Boolean).join(' ')}>
          <div className={['shrink-0', collapsed && 'mx-auto'].filter(Boolean).join(' ')}>{brand ?? <DefaultBrand collapsed={collapsed} />}</div>
          {/* Mobile-only close button — visible quand drawer ouvert sur viewport < 768px */}
          {onMobileClose && (
            <button
              type="button"
              onClick={onMobileClose}
              aria-label="Fermer la navigation"
              className="md:hidden shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-pill bg-ink-50 hover:bg-ink-100 text-ink-700 hover:text-ink-900 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
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
              'absolute top-7 z-10 max-md:hidden inline-flex items-center justify-center w-7 h-7 rounded-pill bg-white/85 backdrop-blur-glass-light text-primary-700 ring-1 ring-primary-200/70 shadow-[0_4px_12px_-2px_rgba(85,161,180,0.3),0_2px_4px_-1px_rgba(85,161,180,0.15),inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-white hover:text-primary-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
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
  <div className={['flex items-center gap-2.5', collapsed && 'justify-center'].filter(Boolean).join(' ')}>
    <TlsLogo size={collapsed ? 48 : 42} className="shrink-0" />
    {!collapsed && (
      <span className="font-display font-bold text-body-lg leading-[1.12] text-primary-800">
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
  'group/nav relative isolate flex items-center gap-stack-xs font-body font-semibold text-body-sm no-underline transition-[background-color,color] duration-fast ease-standard cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

/* Un seul rayon pour les deux états — resserré le 2026-09-14.

   Avant : l'inactive en `rounded-pill`, l'active en `rounded-lg`. La rangée fait
   255 × 48, donc le plafond du navigateur est à 24 : l'inactive rendait 24 et
   l'active 14, et la forme se resserrait de 10 px au moment du clic. Mesuré au
   navigateur — ce n'était pas un plafonnement invisible comme on l'a d'abord cru.

   Ce que voyait l'utilisateur : rien au repos (l'inactive n'a ni fond ni filet),
   une pilule très ronde au survol, puis un rectangle à la sélection. C'était le
   seul endroit de l'app où un composant changeait de SILHOUETTE en changeant
   d'état ; partout ailleurs l'état se dit par la couleur, la graisse ou l'ombre.
   Le dégradé teal et l'ombre portent la sélection à eux seuls, ils n'ont pas
   besoin d'un second signal.

   Effet de bord voulu : en mode replié la rangée est carrée (48 × 48), donc la
   pilule y donnait un cercle pour l'inactive et un carré arrondi pour l'active —
   la même incohérence, en plus visible. Les deux sont maintenant à 14. */
const NAV_INACTIVE =
  'rounded-lg text-ink-700 hover:bg-primary-100/60 hover:text-primary-800';

/* Le dégradé de la sélection ne vit PLUS sur la racine — il est passé sur une
   couche dédiée (`NAV_VOILE`), dont c'est l'OPACITÉ qui s'anime.

   Pourquoi. Un `background-image` ne s'interpole pas : mesuré au navigateur le
   2026-09-16, une transition entre deux dégradés de structure identique ne
   produit qu'UNE seule valeur sur toute la fenêtre — le fond saute. La liste
   transitionnée (`background-color, color, box-shadow`) ne contenait de toute
   façon pas `background-image`, et l'y ajouter n'aurait rien changé.

   Ce que ça donnait à l'écran. À la désélection, le fond teal disparaissait d'un
   coup pendant que le texte, lui, fondait du blanc vers l'encre sur 150 ms :
   **du blanc sur blanc, et le label s'effaçait**. À la sélection, l'inverse — de
   l'encre foncée sur un teal saturé le temps du fondu.

   L'opacité, elle, s'anime toujours, et elle est composée par le GPU. Les deux
   sens sont donc continus, et le libellé reste lisible à chaque image. */
const NAV_ACTIVE = 'rounded-lg text-white';

/* La couche : même boîte, même rayon, posée SOUS le contenu (`-z-10` dans le
   contexte isolé de la rangée) et au-dessus du fond de survol de la racine. */
const NAV_VOILE =
  'pointer-events-none absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-primary-500 to-primary-700 shadow-brand-sm transition-opacity duration-fast ease-standard motion-reduce:transition-none';

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
    : 'h-12 px-3.5 gap-2.5';

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
      <span aria-hidden className={`${NAV_VOILE} ${active ? 'opacity-100' : 'opacity-0'}`} />
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
        className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-pill bg-danger-fg text-white font-body text-micro font-bold border-2 border-white shadow-sm"
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
      <span className="shrink-0 text-ink-600">
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
