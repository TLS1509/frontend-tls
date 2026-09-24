import React from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, X } from 'lucide-react';
import { TlsLogo } from '../ui/TlsLogo';
import { Button } from '../core/Button';

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
  /** Vrai sous 768 px : la barre devient un tiroir. Fermé, il est `inert` —
   *  sinon ses 7 liens restaient dans l'ordre de tabulation, hors écran à
   *  −268 px (WCAG 2.4.7 / 2.4.11, audit du 23/09). */
  isMobile?: boolean;
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
  isMobile = false,
  onMobileClose,
  className = '',
  ...rest
}) => {
  /* Une seule largeur dépliée, 260 px, dès 768 px — révisé le 2026-09-24.
     La tablette avait 220 px. Avec des entrées à 16 px (arbitrage n°20), le
     libellé le plus long, « Espace Apprentissage », mesure 162 px ; la rangée
     de 220 ne lui en laissait que 133 et le coupait (« Espace Appren… »). À
     260, il en a 173. Sur mobile, le tiroir garde `max-md:w-[280px]`. */
  const widthClasses = collapsed ? 'w-[72px]' : 'w-[260px]';

  // Tiroir ouvert : Échap le ferme (motif APG Dialog). Le retour du focus au
  // bouton d'ouverture est géré par le parent, qui possède ce bouton.
  React.useEffect(() => {
    if (!isMobile || !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onMobileClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobile, mobileOpen, onMobileClose]);

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
        id="navigation-principale"
        aria-label="Navigation principale"
        inert={isMobile && !mobileOpen ? true : undefined}
        /* Fermé, le tiroir est aussi `aria-hidden` (24/09) : `inert` le retire
           déjà du clavier et des technologies d'assistance dans les navigateurs
           actuels ; l'attribut le dit en plus aux outils qui ne lisent pas
           `inert` — la sonde de contraste mesurait son libellé « Coaching »,
           hors écran à −280 px, à 1,0–1,8:1 à 375. */
        aria-hidden={isMobile && !mobileOpen ? true : undefined}
        {...rest}
      >
        {/* Brand row + mobile close button.
            DATUM DE TÊTE D'ÉCRAN (2026-09-17, mesuré : logo à 24 quand la nav
            vivait à 12+14, et −7 px entre centre du logo et eyebrow de page) :
            1. même rampe de padding haut que la tête de page (pt-section
               md:pt-section-lg lg:pt-page — LA rampe par défaut de PageShell)
               → le rail et le contenu PARTENT DE LA MÊME LIGNE à tous les
               breakpoints, sur toutes les pages qui n'overrident pas ;
            2. le logo s'aligne sur la colonne des ICÔNES de nav : retrait de
               rangée (pl-3 = 12) + retrait interne d'une rangée (pl-3.5 = 14)
               = 26 px, composé en tokens. Ne pas re-fusionner en pl-6. */}
        <div className={['flex items-center justify-between gap-stack-xs pl-3 pr-4 pt-section md:pt-section-lg lg:pt-page pb-6', collapsed && 'justify-center px-2 pb-6'].filter(Boolean).join(' ')}>
          <div className={['shrink-0', collapsed ? 'mx-auto' : 'pl-3.5'].filter(Boolean).join(' ')}>{brand ?? <DefaultBrand collapsed={collapsed} />}</div>
          {/* Mobile-only close button — visible quand drawer ouvert sur viewport < 768px */}
          {onMobileClose && (
            <Button
              iconOnly
              size="sm"
              emphasis="ghost"
              tone="neutral"
              onClick={onMobileClose}
              aria-label="Fermer la navigation"
              className="md:hidden shrink-0"
            >
              <X strokeWidth={2.25} />
            </Button>
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
        {/* 8 px entre deux entrées (`gap-stack-xs`), et non plus 2 : `gap-tight`
            ne sépare que deux lignes d'un même énoncé, jamais deux rangées — les
            fonds de survol et de sélection s'y touchaient presque. */}
        <nav className={['flex-1 flex flex-col gap-stack-xs overflow-y-auto', collapsed ? 'px-2' : 'px-3'].join(' ')}>
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
  'group/nav relative isolate flex items-center font-body font-semibold text-body no-underline transition-[background-color,color,padding] duration-fast ease-standard cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

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
  /* Le dégradé part de 700, plus de 500 — corrigé le 2026-09-16 pour SC 1.4.3.
     Mesuré : texte blanc sur primary-500 = 2,94:1, sur 600 = 3,66, sur 700 =
     5,02. Le libellé traversait donc un fond qui ÉCHOUAIT à gauche et passait à
     droite. Et 500 n'était pas rattrapable en inversant le texte : du
     primary-900 dessus ne donne que 3,90 — un demi-ton ne porte de texte ni
     clair ni sombre. La forme et le registre saturé sont conservés (choix du
     2026-09-16), seul le point de départ descend. */
  'pointer-events-none absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-primary-700 to-primary-800 shadow-brand-sm transition-opacity duration-fast ease-standard motion-reduce:transition-none';

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
  /* La rangée occupe TOUJOURS la largeur du rail — c'est lui qui s'anime
     (`transition-[width] duration-slow`), elle n'a qu'à suivre.

     Avant le 2026-09-16 elle passait de `w-12 … px-0` à `h-12 px-3.5`, deux
     boîtes sans rapport, et rien ne les transitionnait : la racine glissait
     pendant 300 ms pendant que TOUT son contenu se téléportait à la première
     image. C'était ça, le saut — mesuré au navigateur, la rangée passait de
     235 à 48 px d'un coup, son padding de 14 à 0, et le libellé se démontait.

     Ne reste que le padding, et il bouge à peine : replié, le rail fait 72 px
     et le conteneur en retire 2 × 8, donc la rangée fait 56 ; 16 px de chaque
     côté y centrent l'icône de 24. Déployé, c'est 14. L'icône parcourt donc
     2 px au lieu de traverser la rangée. */
  const sizeClasses = collapsed ? 'w-full h-12 px-4' : 'w-full h-12 px-3.5';

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
      {/* Boîte de 24 (elle règle le centrage du rail replié), glyphe au cran
          `icon-md` (20) : le cran apparié au corps de 16 px du libellé. Il était
          à 22, hors échelle. Rangée en `items-center` : l'icône est centrée sur
          la ligne du libellé. */}
      {icon && (
        <span className="inline-flex items-center justify-center shrink-0 w-6 h-6">
          <span className="inline-flex icon-md [&>svg]:w-full [&>svg]:h-full">{icon}</span>
        </span>
      )}
      {/* Monté en permanence : un démontage conditionnel fait disparaître le mot
          d'un coup, alors que le rail met 300 ms à se fermer. On replie sa boîte
          à la même vitesse que lui. */}
      <span
        className={[
          'flex-1 truncate transition-[max-width,opacity,margin-inline-start] duration-slow ease-decelerate motion-reduce:transition-none',
          collapsed ? 'max-w-0 opacity-0 ms-0' : 'max-w-full opacity-100 ms-2.5',
        ].join(' ')}
        aria-hidden={collapsed || undefined}
      >
        {label}
      </span>
      {count != null && count !== '' && (
        <span
          className={[
            'overflow-hidden shrink-0 transition-[max-width,opacity] duration-slow ease-decelerate motion-reduce:transition-none',
            collapsed ? 'max-w-0 opacity-0' : 'max-w-[44px] opacity-100',
          ].join(' ')}
        >
        <span
          className={[
            'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-pill text-micro font-bold tabular-nums',
            /* Les deux états rataient SC 1.4.3 sur un compteur de 11 px (mesuré
               le 2026-09-16). Inactif : primary-700 sur primary-100 = 4,11 ;
               primary-800 donne 5,79, et 4,67 au survol sur primary-200.
               Actif : le voile `white/25` posé sur le dégradé composait un
               rgb(110,153,164) sur lequel du blanc ne fait que 3,11 — c'était
               contradictoire, un voile blanc ÉCLAIRCIT le fond alors que du
               texte blanc réclame du sombre. On inverse : voile dense, texte
               foncé, 6,22. */
            active
              ? 'bg-white/90 text-primary-800'
              : 'bg-primary-100 text-primary-800 group-hover/nav:bg-primary-200',
          ].join(' ')}
        >
          {formatCount(count)}
        </span>
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
          /* `rounded-lg` (14) comme l'état déplié — corrigé le 2026-09-17.
             Il était à `rounded-xl` (20), et c'était un TROISIÈME rayon : ni son
             étage, ni l'exception écrite du bouton carré à icône seule.
             Mesuré dans le rail replié : les rangées de nav font 48 px de haut
             à rayon 14, la carte utilisateur 48×48 à rayon 20 — même colonne,
             même hauteur, deux courbes. Et 20 sur un carré de 48 inversait
             l'échelle étagée, puisque l'objet est PLUS PETIT que la rangée
             dépliée (235×66) qui, elle, est à 14.
             Ici le padding vaut 0 mais le contenu est centré : ce rayon ne
             pinçait rien, c'est une question de vocabulaire, pas de coin. */
          'relative flex items-center justify-center w-12 h-12 mx-auto rounded-lg bg-primary-100 text-primary-800 hover:bg-primary-200 transition-[background-color] duration-fast ease-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 cursor-pointer border-0 p-0',
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
        /* `rounded-lg` (14), pas `rounded-2xl` (24) — corrigé le 2026-09-17.
           Deux raisons qui convergent, et c'est ce qui rend la correction sûre :
           — L'échelle étagée met les RANGÉES DE LISTE interactives à 14. C'en
             est une : un `<button>` pleine largeur, avatar puis deux lignes de
             texte puis un chevron. 24 était l'étage des conteneurs.
           — Le padding est de 12 px (`px-3`) pour un rayon de 24, donc le coin
             pinçait : 7 px de dégagement en diagonale contre 12 le long du
             bord, soit 41 % de perte — avec du contenu mesuré à 18 px du coin,
             donc dans la zone. À 14 la perte tombe à 7 %.
           La carte utilisateur vit dans la chrome : elle était sur TOUTES les
           pages, ce qui en faisait le pire pincement de l'app, et le plus vu. */
        'flex items-center gap-stack-xs w-full px-3 py-2.5 rounded-lg bg-white/70 border border-ink-200 hover:bg-white hover:border-primary-300 transition-[background-color,border-color,box-shadow] duration-base ease-standard cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        menuOpen && 'border-primary-400 bg-white',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="shrink-0">{avatarWithBadge}</span>
      <span className="flex-1 min-w-0 text-left">
        {/* Nom : un nom dans une rangée, donc 16/600 — pas un titre. E-mail :
            méta, 13 en ink-600 (ink-500 est réservé aux placeholders). */}
        <span className="block text-body font-semibold text-ink-900 truncate">{name}</span>
        {subtitle && <span className="block text-caption text-ink-600 truncate">{subtitle}</span>}
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
