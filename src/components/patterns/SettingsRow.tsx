/**
 * SettingsRow / SettingsToggleRow — canonical settings-list row primitives.
 *
 * Replaces 4 near-duplicate reimplementations found across Settings.tsx
 * (ToggleRow), Account.tsx (SettingRow), NotificationPreferences.tsx
 * (SwitchRow), and inline divs in ProfilePrivacy/ProfileConsent.
 *
 * - `SettingsRow`: generic row (optional icon bubble + label + description +
 *   arbitrary trailing content — Button, Select, Badge, etc.)
 * - `SettingsToggleRow`: specialized row for a single boolean preference,
 *   trailing a `Switch`, with an optional "Requis" badge for non-disableable
 *   consents.
 */

import React from 'react';
import { Switch } from '../core/Input';
import { Badge } from '../ui/Badge';

export interface SettingsRowProps {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  children?: React.ReactNode;
  danger?: boolean;
}

export const SettingsRow: React.FC<SettingsRowProps> = ({ icon, label, description, children, danger }) => (
  <div className="flex items-center justify-between gap-stack py-3 first:pt-0 last:pb-0">
    <div className="flex items-start gap-stack-xs flex-1 min-w-0">
      {icon && (
        <div
          className={[
            'w-9 h-9 rounded-md shrink-0 flex items-center justify-center',
            danger ? 'bg-danger-bg text-danger-fg' : 'bg-ink-100 text-ink-700',
          ].join(' ')}
        >
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <p className={`m-0 font-body text-body-sm font-semibold ${danger ? 'text-danger-fg' : 'text-ink-900'}`}>
          {label}
        </p>
        {description && (
          <p className="m-0 mt-0.5 font-body text-caption text-ink-700 leading-snug">
            {description}
          </p>
        )}
      </div>
    </div>
    {children && <div className="shrink-0">{children}</div>}
  </div>
);

export interface SettingsToggleRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  required?: boolean;
  disabled?: boolean;
  id?: string;
}

export const SettingsToggleRow: React.FC<SettingsToggleRowProps> = ({
  label,
  description,
  checked,
  onChange,
  required,
  disabled,
  id,
}) => (
  <div className="flex items-start justify-between gap-stack py-3 first:pt-0 last:pb-0">
    <div className="flex flex-col gap-tight flex-1 min-w-0">
      <div className="flex items-center gap-stack-xs">
        <span className="text-body-sm font-semibold text-ink-900">{label}</span>
        {required && <Badge variant="info" size="sm">Requis</Badge>}
      </div>
      {description && <span className="text-caption text-ink-500">{description}</span>}
    </div>
    <Switch
      id={id}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disabled={disabled ?? required}
      className="shrink-0 mt-0.5"
      aria-label={label}
    />
  </div>
);

export default SettingsRow;
