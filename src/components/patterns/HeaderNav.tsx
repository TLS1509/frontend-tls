import React from 'react';
import { ChevronLeft, Save } from 'lucide-react';
import { Button } from '../core/Button';

export interface HeaderNavProps {
  backLabel?: string;
  onBack?: () => void;
  progress?: number;
  progressLabel?: string;
  saveMessage?: string;
  isSaving?: boolean;
  onSave?: () => void;
  showProgressBar?: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  backLabel = 'Retour au parcours',
  onBack,
  progress,
  progressLabel,
  saveMessage,
  isSaving = false,
  onSave,
  showProgressBar = true,
}) => {
  return (
    <div className="sticky top-0 z-10 p-4 bg-white border-b border-ink-200 flex items-center justify-between">
      <button
        onClick={onBack}
        className="flex items-center gap-2 bg-ink-50 border border-ink-200 rounded-lg px-3 py-2 cursor-pointer text-ink-900 font-medium text-body-sm transition-all hover:bg-white hover:border-ink-300"
      >
        <ChevronLeft size={18} />
        {backLabel}
      </button>

      <div className="flex items-center gap-4">
        {showProgressBar && progress !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-caption text-ink-500">Progression</span>
            {progressLabel && (
              <span className="text-caption font-semibold text-primary-500">
                {progressLabel}
              </span>
            )}
            <div className="w-[120px] h-1.5 rounded-pill bg-ink-100 overflow-hidden">
              <div
                className="h-full bg-primary-500 transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {saveMessage && (
          <span className="text-caption text-success-base font-semibold">
            {saveMessage}
          </span>
        )}

        {onSave && (
          <Button onClick={onSave} disabled={isSaving} className="flex gap-2 items-center">
            <Save size={16} />
            {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderNav;
