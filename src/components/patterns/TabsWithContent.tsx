import React, { useState } from 'react';

export interface TabWithContent {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export type TabsVariant = 'underline' | 'boxed';

export interface TabsWithContentProps {
  tabs: TabWithContent[];
  variant?: TabsVariant;
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

const TAB_BASE =
  'inline-flex items-center gap-2 px-4 py-2.5 bg-transparent border-0 cursor-pointer font-body text-body-sm font-medium transition-colors ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ' +
  'disabled:cursor-not-allowed disabled:opacity-50';

const VARIANT_LIST: Record<TabsVariant, string> = {
  underline: 'flex border-b border-ink-200 gap-1',
  boxed:     'flex border border-ink-200 rounded-lg overflow-hidden',
};

const VARIANT_TAB: Record<TabsVariant, string> = {
  underline: 'rounded-t-md text-ink-500 hover:text-ink-900 relative -mb-px border-b-2 border-transparent',
  boxed:     'flex-1 justify-center text-ink-500 hover:bg-ink-50 hover:text-ink-900 border-r border-ink-200 last:border-r-0',
};

const VARIANT_TAB_ACTIVE: Record<TabsVariant, string> = {
  underline: 'text-primary-700 border-b-2 border-primary-600 font-semibold',
  boxed:     'bg-primary-600 text-white font-semibold hover:bg-primary-600 hover:text-white',
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
    <div className={['flex flex-col gap-5', className].filter(Boolean).join(' ')}>
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
