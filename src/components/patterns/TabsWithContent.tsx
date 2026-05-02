/**
 * TabsWithContent — Navigation Pattern
 *
 * Tabs component with coupled content display.
 * Enhances existing Tabs with built-in content management.
 *
 * Usage:
 *   <TabsWithContent
 *     tabs={[
 *       {
 *         id: 'overview',
 *         label: 'Overview',
 *         icon: <Eye />,
 *         content: <OverviewPanel />
 *       }
 *     ]}
 *     variant="underline"
 *     defaultTab="overview"
 *   />
 */

import React, { useState } from 'react';
import './TabsWithContent.css';

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
    <div className={`tabs-with-content tabs-with-content--${variant} ${className}`}>
      {/* Tab list */}
      <div className="tabs-with-content__list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tabs-with-content__tab${
              activeTab === tab.id ? ' tabs-with-content__tab--active' : ''
            }${tab.disabled ? ' tabs-with-content__tab--disabled' : ''}`}
            onClick={() => handleTabChange(tab.id)}
            disabled={tab.disabled}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
          >
            {tab.icon && (
              <span className="tabs-with-content__tab-icon" aria-hidden="true">
                {tab.icon}
              </span>
            )}
            <span className="tabs-with-content__tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div
        className="tabs-with-content__content"
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeTabContent}
      </div>
    </div>
  );
};

export default TabsWithContent;
