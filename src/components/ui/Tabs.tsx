import React from 'react';

/**
 * Tabs — Source of truth: design-system/spec.json → components.Tabs
 *
 * Switch between views of the same object. Never to navigate between different pages.
 * Variants: pill (default) | underline. Rule: 2–5 tabs max.
 */

export type TabsVariant = 'pill' | 'underline';

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
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="tablist" {...rest}>
      {items.map((item) => {
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
            onClick={() => !item.disabled && onChange(item.id)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
