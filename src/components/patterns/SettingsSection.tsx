import React from 'react';
import { Button } from '../core/Button';
import { Save } from 'lucide-react';

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
      className={[
        'rounded-2xl p-6 bg-white border border-ink-200 shadow-xs',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="mb-6">
        <h3 className="m-0 mb-1 text-h3 font-bold text-ink-900">{title}</h3>
        {description && <p className="m-0 text-body-sm text-ink-500">{description}</p>}
      </div>

      <div className="flex flex-col gap-4 mb-6">{children}</div>

      {(onSave || onCancel) && (
        <div className="flex gap-3 pt-6 border-t border-ink-200">
          {onSave && (
            <Button
              disabled={isSaving}
              leadingIcon={!isSaving && <Save size={16} />}
              onClick={onSave}
            >
              {isSaving ? 'Saving...' : saveLabel}
            </Button>
          )}
          {onCancel && (
            <Button variant="secondary" onClick={onCancel}>
              {cancelLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SettingsSection;
