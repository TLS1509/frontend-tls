import React, { useRef } from 'react';

/**
 * Tabs — Source of truth: design-system/spec.json → components.Tabs
 *
 * Switch between views of the same object. Never to navigate between different pages.
 * Variants: pill (default) | underline | boxed. Rule: 2–5 tabs max.
 * Keyboard: arrow left/right to navigate, Home/End for first/last.
 */

export type TabsVariant = 'pill' | 'underline' | 'boxed';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  variant?: TabsVariant;
}

const CONTAINER_VARIANT: Record<TabsVariant, string> = {
  pill:      'inline-flex items-center gap-0.5 p-1 bg-ink-50 rounded-lg',
  underline: 'inline-flex items-center gap-4 border-b border-ink-200',
  boxed:     'inline-flex items-stretch border border-ink-200 rounded-lg overflow-hidden',
};

const TAB_BASE = 'bg-transparent border-0 font-body text-body-sm font-medium text-ink-600 cursor-pointer transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 disabled:opacity-disabled disabled:cursor-not-allowed';

const TAB_VARIANT: Record<TabsVariant, string> = {
  pill:      'px-3.5 py-2 rounded-md hover:text-ink-900 hover:bg-white/60',
  underline: 'px-0.5 py-2.5 rounded-none relative hover:text-ink-900',
  boxed:     'px-4 py-2.5 rounded-none border-r border-ink-200 last:border-r-0 flex-1 justify-center hover:bg-ink-50',
};

const TAB_ACTIVE: Record<TabsVariant, string> = {
  pill:      'bg-white text-ink-900 shadow-sm font-semibold',
  underline: 'text-primary-700 after:content-[""] after:absolute after:left-0 after:right-0 after:-bottom-px after:h-0.5 after:bg-primary-600 after:rounded-t-sm',
  boxed:     'bg-primary-600 text-white font-semibold hover:bg-primary-600',
};

export const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  onChange,
  variant = 'pill',
  className = '',
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

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
        `[data-tab-id="${nextId}"]`
      );
      btn?.focus();
    }
  };

  const containerClasses = [CONTAINER_VARIANT[variant], className].filter(Boolean).join(' ');

  return (
    <div ref={containerRef} className={containerClasses} role="tablist" {...rest}>
      {items.map((item, idx) => {
        const active = item.id === value;
        const tabClasses = [
          TAB_BASE,
          TAB_VARIANT[variant],
          active && TAB_ACTIVE[variant],
        ]
          .filter(Boolean)
          .join(' ');
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={item.disabled}
            className={tabClasses}
            data-tab-id={item.id}
            tabIndex={active ? 0 : -1}
            onClick={() => !item.disabled && onChange(item.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
