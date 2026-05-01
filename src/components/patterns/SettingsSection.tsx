/**
 * SettingsSection
 *
 * Reusable settings section wrapper with title, description, content, and save/cancel actions.
 * Uses only design tokens and TLS components.
 *
 * Usage:
 * <SettingsSection
 *   title="Personal Information"
 *   description="Update your profile details"
 *   onSave={() => {}}
 *   onCancel={() => {}}
 * >
 *   <FormField label="Name" />
 * </SettingsSection>
 */

import React from 'react';
import { Button } from '../core/Button';
import { Save, X } from 'lucide-react';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSave?: () => void | Promise<void>;
  onCancel?: () => void;
  saveLabel?: string;
  cancelLabel?: string;
  isSaving?: boolean;
  className?: string;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  description,
  children,
  onSave,
  onCancel,
  saveLabel = 'Save changes',
  cancelLabel = 'Cancel',
  isSaving = false,
  className = '',
}) => {
  return (
    <div
      className={`rounded-2xl p-6 ${className}`}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-default)',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 'var(--s-6)' }}>
        <h3
          style={{
            margin: 0,
            fontSize: 'var(--t-h3)',
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: 'var(--s-1)',
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              margin: 0,
              fontSize: 'var(--t-body-sm)',
              color: 'var(--text-muted)',
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)', marginBottom: 'var(--s-6)' }}>
        {children}
      </div>

      {/* Actions */}
      {(onSave || onCancel) && (
        <div
          style={{
            display: 'flex',
            gap: 'var(--s-3)',
            paddingTop: 'var(--s-6)',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          {onSave && (
            <Button
              disabled={isSaving}
              leadingIcon={!isSaving && <Save size={16} />}
              onClick={onSave}
            >
              {isSaving ? 'Saving...' : saveLabel}
            </Button>
          )}
          {onCancel && <Button variant="secondary" onClick={onCancel}>{cancelLabel}</Button>}
        </div>
      )}
    </div>
  );
};

export default SettingsSection;
