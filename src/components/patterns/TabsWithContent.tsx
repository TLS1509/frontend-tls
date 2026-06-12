import React, { useState } from 'react';

export interface TabWithContent {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export type TabsVariant = 'underline' | 'boxed' | 'pill';

export interface TabsWithContentProps {
  tabs: TabWithContent[];
  variant?: TabsVariant;
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

const TAB_BASE =
  'inline-flex items-center gap-stack-xs px-4 py-2.5 bg-transparent border-0 cursor-pointer font-body text-body-sm font-medium transition-all ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ' +
  'disabled:cursor-not-allowed disabled:opacity-50';

const VARIANT_LIST: Record<TabsVariant, string> = {
  underline: 'flex border-b border-ink-200 gap-tight mb-1',
  boxed:     'flex border border-ink-200 rounded-xl overflow-hidden bg-white',
  pill:      'inline-flex items-center gap-tight p-1 bg-ink-100 rounded-pill self-start',
};

const VARIANT_TAB: Record<TabsVariant, string> = {
  underline: 'rounded-t-md text-ink-500 hover:text-ink-900 relative -mb-px border-b-2 border-transparent hover:bg-ink-50/50',
  boxed:     'flex-1 justify-center text-ink-500 hover:bg-ink-50 hover:text-ink-900 border-r border-ink-200 last:border-r-0',
  pill:      'rounded-pill text-ink-600 hover:text-ink-900 hover:bg-white/60',
};

const VARIANT_TAB_ACTIVE: Record<TabsVariant, string> = {
  underline: 'text-primary-700 border-b-2 border-primary-600 font-bold bg-primary-50/50',
  boxed:     'bg-gradient-to-br from-primary-600 to-primary-700 text-white font-bold shadow-brand-sm hover:bg-primary-600 hover:text-white',
  pill:      'bg-white text-ink-900 font-bold shadow-sm',
};

export const TabsWithContent: React.FC<TabsWithContentProps> = ({
  tabs,
  variant = 'underline',
  defaultTab,
  onTabChange,
  className = '',
}) => {
  const initialTab = defaultTab || tabs[0]?.id || '';
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (tabId: string) => {
    if (tabs.find((t) => t.id === tabId)?.disabled) return;
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const activeTabContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className={['flex flex-col gap-stack', className].filter(Boolean).join(' ')}>
      <div className={VARIANT_LIST[variant]} role="tablist">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={[
                TAB_BASE,
                VARIANT_TAB[variant],
                isActive ? VARIANT_TAB_ACTIVE[variant] : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleTabChange(tab.id)}
              disabled={tab.disabled}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
            >
              {tab.icon && (
                <span aria-hidden="true" className="inline-flex items-center">
                  {tab.icon}
                </span>
              )}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={[
                    'inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-pill text-micro font-bold leading-none',
                    isActive
                      ? variant === 'boxed'
                        ? 'bg-white/30 text-white'
                        : 'bg-primary-600 text-white'
                      : 'bg-ink-200 text-ink-700',
                  ].join(' ')}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div id={`tabpanel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
        {activeTabContent}
      </div>
    </div>
  );
};

export default TabsWithContent;
