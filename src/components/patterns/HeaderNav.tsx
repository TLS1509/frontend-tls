/**
 * HeaderNav — Sticky navigation header with progress
 *
 * Used in multi-step pages (Project, Journal, etc.)
 * Features:
 * - Sticky positioning
 * - Back button
 * - Progress indicator
 * - Save button with feedback
 *
 * Uses TLS design tokens throughout.
 */

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
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        padding: 'var(--s-4)',
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--s-2)',
          background: 'var(--surface-muted)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-lg)',
          padding: 'var(--s-2) var(--s-3)',
          cursor: 'pointer',
          color: 'var(--text)',
          fontWeight: 500,
          fontSize: 'var(--t-body-sm)',
          transition: 'all var(--dur-2)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            'var(--surface)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            'var(--surface-muted)';
        }}
      >
        <ChevronLeft size={18} />
        {backLabel}
      </button>

      {/* Right Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-4)' }}>
        {/* Progress Indicator */}
        {showProgressBar && progress !== undefined && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
            <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text-soft)' }}>
              Progression
            </span>
            {progressLabel && (
              <span
                style={{
                  fontSize: 'var(--t-caption)',
                  fontWeight: 600,
                  color: 'var(--tls-primary-500)',
                }}
              >
                {progressLabel}
              </span>
            )}
            <div
              style={{
                width: '120px',
                height: '6px',
                borderRadius: 'var(--r-pill)',
                background: 'var(--surface-muted)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: 'var(--tls-primary-500)',
                  width: `${progress}%`,
                  transition: 'width var(--dur-3)',
                }}
              />
            </div>
          </div>
        )}

        {/* Save Message */}
        {saveMessage && (
          <span
            style={{
              fontSize: 'var(--t-caption)',
              color: 'var(--tls-success-500)',
              fontWeight: 600,
            }}
          >
            {saveMessage}
          </span>
        )}

        {/* Save Button */}
        {onSave && (
          <Button
            onClick={onSave}
            disabled={isSaving}
            style={{
              display: 'flex',
              gap: 'var(--s-2)',
              alignItems: 'center',
            }}
          >
            <Save size={16} />
            {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderNav;
