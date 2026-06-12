/**
 * MoodSelector — Figma DS Journal component.
 *
 * Row of mood emoji buttons (😢 😐 🙂 😊 🤩) with label, selection highlight,
 * and aria-pressed for accessibility.
 *
 * Usage:
 *   <MoodSelector value={mood} onChange={setMood} />
 */

import React from 'react';
import type { JournalMoodLevel } from '../../types/learning';

/** Convenience alias — same values as JournalMoodLevel from types/learning. */
export type MoodLevel = JournalMoodLevel;

interface MoodConfig {
  emoji: string;
  label: string;
}

const MOOD_CONFIG: Record<MoodLevel, MoodConfig> = {
  'very-sad':   { emoji: '😢', label: 'Difficile' },
  'sad':        { emoji: '😐', label: 'Neutre' },
  'neutral':    { emoji: '🙂', label: 'Bien' },
  'happy':      { emoji: '😊', label: 'Très bien' },
  'very-happy': { emoji: '🤩', label: 'Excellent' },
};

const MOOD_ORDER: MoodLevel[] = ['very-sad', 'sad', 'neutral', 'happy', 'very-happy'];

export interface MoodSelectorProps {
  value: MoodLevel;
  onChange: (level: MoodLevel) => void;
  className?: string;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  value,
  onChange,
  className = '',
}) => (
  <div className={['flex gap-3 flex-wrap', className].filter(Boolean).join(' ')}>
    {MOOD_ORDER.map((level) => {
      const cfg = MOOD_CONFIG[level];
      const selected = value === level;
      return (
        <button
          key={level}
          type="button"
          onClick={() => onChange(level)}
          title={cfg.label}
          aria-label={cfg.label}
          aria-pressed={selected}
          className={[
            'flex flex-col items-center gap-1 p-3 rounded-xl cursor-pointer transition-[background-color,border-color,box-shadow,transform] duration-fast ease-emphasis active:scale-[0.94] min-h-touch focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            selected
              ? 'bg-primary-100 border-2 border-primary-500 shadow-sm'
              : 'bg-ink-50 border-2 border-transparent hover:bg-ink-100',
          ].join(' ')}
        >
          <span className="text-3xl leading-none select-none" aria-hidden="true">
            {cfg.emoji}
          </span>
          <span className="font-body text-caption text-ink-600 font-medium">{cfg.label}</span>
        </button>
      );
    })}
  </div>
);

export default MoodSelector;
