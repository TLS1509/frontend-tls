/**
 * JournalTypeTile — Figma DS Journal component.
 *
 * Selection tile for journal entry type (réflexion libre / apprentissage /
 * pratique pro / coaching / moment eurêka). Renders icon + label with a
 * tone-aware checked state.
 *
 * Usage:
 *   <JournalTypeTile type="apprentissage" selected onClick={() => setType('apprentissage')} />
 */

import React from 'react';
import {
  Sparkles,
  BookOpen,
  Briefcase,
  Target,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';
import type { JournalEntryType } from '../../types/learning';

export type { JournalEntryType };

/** Canonical display order for the 5 journal entry types. */
export const JOURNAL_TYPE_ORDER: JournalEntryType[] = [
  'reflexion-libre',
  'apprentissage',
  'pratique-pro',
  'session-coaching',
  'moment-eureka',
];

interface TileConfig {
  label: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  iconSelected: string;
  borderSelected: string;
  checkBg: string;
}

const TILE_CONFIG: Record<JournalEntryType, TileConfig> = {
  'reflexion-libre': {
    label: 'Réflexion Libre',
    Icon: Sparkles,
    iconSelected: 'text-primary-500',
    borderSelected: 'border-primary-500',
    checkBg: 'bg-primary-500',
  },
  'apprentissage': {
    label: 'Apprentissage',
    Icon: BookOpen,
    iconSelected: 'text-primary-500',
    borderSelected: 'border-primary-500',
    checkBg: 'bg-primary-500',
  },
  'pratique-pro': {
    label: 'Pratique pro',
    Icon: Briefcase,
    iconSelected: 'text-secondary-500',
    borderSelected: 'border-secondary-500',
    checkBg: 'bg-secondary-500',
  },
  'session-coaching': {
    label: 'Coaching',
    Icon: Target,
    iconSelected: 'text-accent-700',
    borderSelected: 'border-accent-500',
    checkBg: 'bg-accent-500',
  },
  'moment-eureka': {
    label: 'Moment Eurêka',
    Icon: Lightbulb,
    iconSelected: 'text-primary-500',
    borderSelected: 'border-primary-500',
    checkBg: 'bg-primary-500',
  },
};

export interface JournalTypeTileProps {
  type: JournalEntryType;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const JournalTypeTile: React.FC<JournalTypeTileProps> = ({
  type,
  selected = false,
  onClick,
  className = '',
}) => {
  const cfg = TILE_CONFIG[type];
  const { Icon } = cfg;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'flex flex-col items-start gap-3 p-4 rounded-xl bg-white border',
        'cursor-pointer relative transition-all duration-200 text-left font-body min-h-touch',
        selected
          ? `${cfg.borderSelected} shadow-sm`
          : 'border-ink-200 shadow-xs hover:border-ink-400',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {selected && (
        <div
          className={`absolute top-2.5 right-2.5 w-[22px] h-[22px] rounded-pill ${cfg.checkBg} flex items-center justify-center`}
        >
          <CheckCircle2 size={14} className="text-white" strokeWidth={2.5} />
        </div>
      )}

      <span className={selected ? cfg.iconSelected : 'text-ink-400'}>
        <Icon size={28} strokeWidth={1.5} />
      </span>

      <span
        className={[
          'font-body text-body-sm leading-snug',
          selected ? 'font-semibold text-ink-900' : 'font-medium text-ink-500',
        ].join(' ')}
      >
        {cfg.label}
      </span>
    </button>
  );
};

export default JournalTypeTile;
