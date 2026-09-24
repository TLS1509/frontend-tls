import React, { useEffect, useId, useRef } from 'react';

/**
 * Tabs — onglets à tabindex itinérant (flèches, Début, Fin).
 *
 * Accessibilité (APG Tabs, audit du 23/09) :
 * - `label` nomme la liste d'onglets (`aria-label` du tablist). Sans nom, un
 *   lecteur d'écran annonce « liste d'onglets » sans dire laquelle.
 * - Chaque onglet a un id stable. Pour relier onglet et panneau, passer
 *   `idPrefix` et poser sur le panneau `getTabPanelProps(idPrefix, id)` :
 *
 *     <Tabs idPrefix="profil" label="Sections du profil" items={…} value={tab} onChange={setTab} />
 *     <div {...getTabPanelProps('profil', tab)}>…</div>
 *
 *   L'onglet reçoit alors `aria-controls`. Sans `idPrefix`, pas d'`aria-controls` :
 *   il pointerait vers un id absent du DOM.
 */

/** Id de l'onglet `tabId` pour un préfixe donné. */
export const getTabId = (idPrefix: string, tabId: string) => `${idPrefix}-tab-${tabId}`;

/** Id du panneau associé à l'onglet `tabId`. */
export const getTabPanelId = (idPrefix: string, tabId: string) => `${idPrefix}-panel-${tabId}`;

/** Props à étaler sur le panneau de l'onglet actif. */
export const getTabPanelProps = (idPrefix: string, tabId: string) => ({
  id: getTabPanelId(idPrefix, tabId),
  role: 'tabpanel' as const,
  'aria-labelledby': getTabId(idPrefix, tabId),
  // Focalisable : APG, quand le panneau ne commence pas par un élément focalisable.
  tabIndex: 0,
});

export type TabsVariant = 'pill' | 'underline' | 'boxed';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  variant?: TabsVariant;
  fullWidth?: boolean;
  /** Nom de la liste d'onglets, posé en `aria-label` sur le tablist. */
  label?: string;
  /** Préfixe d'ids : active `aria-controls` vers `getTabPanelProps(idPrefix, id)`. */
  idPrefix?: string;
}

/* `underline` défile dans son propre cadre (2026-09-23). Ses onglets ne
   passaient pas à 375 px : sur /coach/dashboard, la liste faisait 401 px pour
   343 de place et « Sessions » sortait de l'écran, hors d'atteinte — un ancêtre
   coupe le débordement, la page ne défilait pas. La liste défile donc
   horizontalement, sans barre visible (même motif que `ShowcaseNav`), et les
   onglets ne se compriment plus (`shrink-0 whitespace-nowrap`).
   Conséquence du défilement : `overflow` coupe tout ce qui dépasse la boîte de
   remplissage — la bordure comprise. Le filet de base n'est donc plus un
   `border-b` que l'indicateur actif venait recouvrir en `-bottom-px` (il serait
   coupé), mais une ombre intérieure de 1 px, peinte DANS la boîte, sur laquelle
   l'indicateur se pose. Même raison pour le focus : l'anneau passe à
   l'intérieur de l'onglet (`-outline-offset-2`), sinon le cadre le rognait. */
const CONTAINER_VARIANT: Record<TabsVariant, string> = {
  // Rail de 52 px (onglet 44 + retrait 4) : au-dessus du seuil de 28 px, le rayon
  // prend l'échelle (R3) — 14 pour le rail, 14 − 4 = 10 pour l'onglet (règle des
  // coins imbriqués). Même construction que `SegmentedControl`. (24/09)
  // Il défile dans son cadre comme `underline` (2026-09-24) : à 375 px, quatre
  // pages avaient un onglet hors de l'écran (« Compétences » sur
  // /analytics/dashboard, « Exemples » sur /api-docs…) et des libellés tassés
  // sur deux lignes. Les 4 px du rail suffisent à l'anneau de focus (décalage
  // 2 + trait 2) : le cadre qui défile ne le rogne pas.
  pill:      'inline-flex items-center gap-tight p-1 bg-ink-100 rounded-lg max-w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
  underline: 'inline-flex items-center gap-tight max-w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shadow-[inset_0_-1px_0_0] shadow-ink-200',
  boxed:     'inline-flex items-stretch border border-ink-200 rounded-lg overflow-hidden bg-white',
};

/* Libellé d'onglet : 16 / 600 aux deux états (passe typographique du
   2026-09-24). L'onglet actif se disait en passant de 500 à 700 : le mot
   s'élargissait au clic et poussait ses voisins, et 500 est la graisse des
   puces, pas celle d'une navigation. L'état se dit désormais par la pastille
   (`pill`), le trait (`underline`) ou l'aplat (`boxed`), et par l'encre :
   ink-700 au repos, ink-900 ou marque au cran 800 une fois choisi. */
const TAB_BASE =
  'inline-flex items-center gap-stack-xs min-h-touch bg-transparent border-0 font-body text-body font-semibold text-ink-700 cursor-pointer transition-all ' +
  'focus-visible:outline-2 focus-visible:outline-primary-400 ' +
  'disabled:opacity-disabled disabled:cursor-not-allowed';

const TAB_VARIANT: Record<TabsVariant, string> = {
  // Décalage du focus par variante, pas dans TAB_BASE : deux `outline-offset`
  // sur un même élément, c'est l'ordre d'émission qui trancherait (piège n°6).
  pill:      'px-4 py-2 rounded-md shrink-0 whitespace-nowrap hover:text-ink-900 hover:bg-white/60 focus-visible:outline-offset-2',
  // py-2 + interligne 26 + `min-h-touch` = 44 px, la hauteur commune des
  // contrôles (arbitrage n°22) ; py-3 donnait 50.
  underline: 'px-3 py-2 rounded-none relative shrink-0 whitespace-nowrap hover:text-ink-900 hover:bg-ink-50/60 focus-visible:-outline-offset-2',
  boxed:     'px-stack-md py-2 rounded-none border-r border-ink-200 last:border-r-0 flex-1 justify-center hover:bg-ink-50 focus-visible:outline-offset-2',
};

/* Trait de l'onglet `underline` au cran 700 — arbitrage n°9, l'état choisi
   d'un contrôle est au 700. */
const TAB_ACTIVE: Record<TabsVariant, string> = {
  pill:      'bg-white text-ink-900 shadow-sm',
  underline: 'text-primary-800 after:content-[""] after:absolute after:left-3 after:right-3 after:bottom-0 after:h-0.5 after:bg-primary-700 after:rounded-t-sm',
  boxed:     'bg-gradient-to-br from-primary-700 to-primary-800 text-white shadow-brand-sm hover:bg-primary-800 hover:text-white',
};

export const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  onChange,
  variant = 'pill',
  fullWidth = false,
  label,
  idPrefix,
  className = '',
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const autoId = useId();
  const prefix = idPrefix ?? autoId;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIdx: number) => {
    const enabledItems = items.filter((it) => !it.disabled);
    const enabledIdx = enabledItems.findIndex((it) => it.id === items[currentIdx].id);

    let nextId: string | null = null;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = enabledItems[(enabledIdx + 1) % enabledItems.length];
      nextId = next.id;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = enabledItems[(enabledIdx - 1 + enabledItems.length) % enabledItems.length];
      nextId = prev.id;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextId = enabledItems[0]?.id ?? null;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextId = enabledItems[enabledItems.length - 1]?.id ?? null;
    }

    if (nextId) {
      onChange(nextId);
      const btn = containerRef.current?.querySelector<HTMLButtonElement>(
        `[data-tab-id="${nextId}"]`,
      );
      btn?.focus();
    }
  };

  // L'onglet actif reste visible dans le cadre qui défile — à l'arrivée sur la
  // page comme après un changement. Au clavier, le focus y suffirait ; pas pour
  // un onglet actif dès le chargement, ni pour un changement venu d'ailleurs.
  // On règle `scrollLeft` du seul cadre : `scrollIntoView` ferait aussi défiler
  // la page verticalement.
  useEffect(() => {
    const box = containerRef.current;
    if (!box || box.scrollWidth <= box.clientWidth) return;
    const tab = box.querySelector<HTMLElement>(`[data-tab-id="${value}"]`);
    if (!tab) return;
    const b = box.getBoundingClientRect();
    const t = tab.getBoundingClientRect();
    if (t.left < b.left) box.scrollLeft -= b.left - t.left;
    else if (t.right > b.right) box.scrollLeft += t.right - b.right;
  }, [value]);

  const containerClasses = [
    CONTAINER_VARIANT[variant],
    fullWidth ? 'flex w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={containerRef} className={containerClasses} role="tablist" aria-label={label} {...rest}>
      {items.map((item, idx) => {
        const active = item.id === value;
        const tabClasses = [
          TAB_BASE,
          TAB_VARIANT[variant],
          active && TAB_ACTIVE[variant],
          fullWidth && variant !== 'boxed' ? 'flex-1 justify-center' : '',
        ]
          .filter(Boolean)
          .join(' ');
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={getTabId(prefix, item.id)}
            aria-selected={active}
            aria-controls={idPrefix ? getTabPanelId(idPrefix, item.id) : undefined}
            disabled={item.disabled}
            className={tabClasses}
            data-tab-id={item.id}
            tabIndex={active ? 0 : -1}
            onClick={() => !item.disabled && onChange(item.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
          >
            {item.icon && (
              // Icône à 18 px, le cran des contrôles de 44 (motif de `Button`).
              <span aria-hidden="true" className="inline-flex items-center justify-center shrink-0 [&>svg]:size-4.5">
                {item.icon}
              </span>
            )}
            <span>{item.label}</span>
            {item.badge !== undefined && (
              <span
                className={[
                  'inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-pill text-micro font-bold',
                  active
                    ? variant === 'boxed'
                      ? 'bg-white/30 text-white'
                      : 'bg-primary-700 text-white'
                    : 'bg-ink-200 text-ink-700',
                ].join(' ')}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
