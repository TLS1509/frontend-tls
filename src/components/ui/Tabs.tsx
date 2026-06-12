import React, { useRef } from 'react';

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
}

const CONTAINER_VARIANT: Record<TabsVariant, string> = {
  pill:      'inline-flex items-center gap-0.5 p-1 bg-ink-100 rounded-pill',
  underline: 'inline-flex items-center gap-tight border-b border-ink-200',
  boxed:     'inline-flex items-stretch border border-ink-200 rounded-xl overflow-hidden bg-white',
};

const TAB_BASE =
  'inline-flex items-center gap-stack-xs min-h-touch bg-transparent border-0 font-body text-body-sm font-medium text-ink-600 cursor-pointer transition-all ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 ' +
  'disabled:opacity-disabled disabled:cursor-not-allowed';

const TAB_VARIANT: Record<TabsVariant, string> = {
  pill:      'px-4 py-2 rounded-pill hover:text-ink-900 hover:bg-white/60',
  underline: 'px-3 py-3 rounded-none relative hover:text-ink-900 hover:bg-ink-50/60 -mb-px',
  boxed:     'px-5 py-3 rounded-none border-r border-ink-200 last:border-r-0 flex-1 justify-center hover:bg-ink-50',
};

const TAB_ACTIVE: Record<TabsVariant, string> = {
  pill:      'bg-white text-ink-900 shadow-sm font-bold',
  underline: 'text-primary-700 font-bold after:content-[""] after:absolute after:left-3 after:right-3 after:-bottom-px after:h-0.5 after:bg-primary-600 after:rounded-t-sm',
  boxed:     'bg-gradient-to-br from-primary-600 to-primary-700 text-white font-bold shadow-brand-sm hover:bg-primary-600 hover:text-white',
};

export const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  onChange,
  variant = 'pill',
  fullWidth = false,
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
        `[data-tab-id="${nextId}"]`,
      );
      btn?.focus();
    }
  };

  const containerClasses = [
    CONTAINER_VARIANT[variant],
    fullWidth ? 'flex w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={containerRef} className={containerClasses} role="tablist" {...rest}>
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
            aria-selected={active}
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
                  'inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-pill text-micro font-bold leading-none',
                  active
                    ? variant === 'boxed'
                      ? 'bg-white/30 text-white'
                      : 'bg-primary-600 text-white'
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
