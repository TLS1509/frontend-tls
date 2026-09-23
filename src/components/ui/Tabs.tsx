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
  pill:      'inline-flex items-center gap-tight p-1 bg-ink-100 rounded-pill',
  underline: 'inline-flex items-center gap-tight max-w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shadow-[inset_0_-1px_0_0] shadow-ink-200',
  boxed:     'inline-flex items-stretch border border-ink-200 rounded-xl overflow-hidden bg-white',
};

const TAB_BASE =
  'inline-flex items-center gap-stack-xs min-h-touch bg-transparent border-0 font-body text-body-sm font-medium text-ink-600 cursor-pointer transition-all ' +
  'focus-visible:outline-2 focus-visible:outline-primary-400 ' +
  'disabled:opacity-disabled disabled:cursor-not-allowed';

const TAB_VARIANT: Record<TabsVariant, string> = {
  // Décalage du focus par variante, pas dans TAB_BASE : deux `outline-offset`
  // sur un même élément, c'est l'ordre d'émission qui trancherait (piège n°6).
  pill:      'px-4 py-2 rounded-pill hover:text-ink-900 hover:bg-white/60 focus-visible:outline-offset-2',
  underline: 'px-3 py-3 rounded-none relative shrink-0 whitespace-nowrap hover:text-ink-900 hover:bg-ink-50/60 focus-visible:-outline-offset-2',
  boxed:     'px-stack-md py-3 rounded-none border-r border-ink-200 last:border-r-0 flex-1 justify-center hover:bg-ink-50 focus-visible:outline-offset-2',
};

const TAB_ACTIVE: Record<TabsVariant, string> = {
  pill:      'bg-white text-ink-900 shadow-sm font-bold',
  underline: 'text-primary-700 font-bold after:content-[""] after:absolute after:left-3 after:right-3 after:bottom-0 after:h-0.5 after:bg-primary-600 after:rounded-t-sm',
  boxed:     'bg-gradient-to-br from-primary-700 to-primary-800 text-white font-bold shadow-brand-sm hover:bg-primary-800 hover:text-white',
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
              <span aria-hidden="true" className="inline-flex items-center">
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
