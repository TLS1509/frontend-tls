import React from 'react';
import { ChevronLeft, Save, CheckCircle2 } from 'lucide-react';
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
  backLabel = 'Retour',
  onBack,
  progress,
  progressLabel,
  saveMessage,
  isSaving = false,
  onSave,
  showProgressBar = true,
}) => {
  return (
    <div className="sticky top-0 z-sticky px-5 py-3 bg-white/85 backdrop-blur-glass-light border-b border-ink-200 flex items-center justify-between gap-stack">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-stack-xs bg-ink-50 hover:bg-white border border-ink-200 hover:border-ink-300 rounded-pill pl-2 pr-3.5 py-1.5 cursor-pointer text-ink-700 hover:text-ink-900 font-medium text-caption transition-all hover:-translate-x-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      >
        <ChevronLeft size={16} />
        {backLabel}
      </button>

      <div className="flex items-center gap-stack flex-1 justify-end">
        {showProgressBar && progress !== undefined && (
          <div className="flex items-center gap-2.5 max-w-[280px] flex-1">
            <span className="text-caption text-ink-500 font-medium whitespace-nowrap hidden sm:inline">
              Progression
            </span>
            {progressLabel && (
              <span className="text-caption font-bold text-primary-700 whitespace-nowrap">
                {progressLabel}
              </span>
            )}
            <div className="flex-1 h-1.5 rounded-pill bg-ink-100 overflow-hidden shadow-inner">
              <div
                className="h-full rounded-pill bg-gradient-to-r from-primary-500 to-primary-700 transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-caption font-bold text-ink-900 whitespace-nowrap">
              {Math.round(progress)}%
            </span>
          </div>
        )}

        {saveMessage && (
          <span className="inline-flex items-center gap-1.5 text-caption text-success-fg font-semibold animate-[dd-slide-up_0.25s_ease-out]">
            <CheckCircle2 size={14} />
            {saveMessage}
          </span>
        )}

        {onSave && (
          <Button onClick={onSave} disabled={isSaving} size="sm">
            <Save size={15} />
            {isSaving ? 'Enregistrement…' : 'Enregistrer'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderNav;
