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
  /** Active tab id */
  value: string;
  onChange: (id: string) => void;
  variant?: TabsVariant;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  onChange,
  variant = 'pill',
  className = '',
  ...rest
}) => {
  const classes = [
    'tabs',
    variant === 'underline' && 'tabs--underline',
    variant === 'boxed' && 'tabs--boxed',
    className,
  ]
    .filter(Boolean)
    .join(' ');

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
      // Focus the button for the next tab
      const btn = containerRef.current?.querySelector<HTMLButtonElement>(
        `[data-tab-id="${nextId}"]`
      );
      btn?.focus();
    }
  };

  return (
    <div ref={containerRef} className={classes} role="tablist" {...rest}>
      {items.map((item, idx) => {
        const active = item.id === value;
        const tabClasses = ['tab', active && 'tab--active'].filter(Boolean).join(' ');
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
