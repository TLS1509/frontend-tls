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
import { Frown, Laugh, Meh, Smile, SmilePlus } from 'lucide-react';
import type { JournalMoodLevel } from '../../types/learning';

/** Convenience alias — same values as JournalMoodLevel from types/learning. */
export type MoodLevel = JournalMoodLevel;

interface MoodConfig {
  icon: React.ReactNode;
  label: string;
}

const MOOD_CONFIG: Record<MoodLevel, MoodConfig> = {
  'very-sad':   { icon: <Frown size={28} strokeWidth={1.75} />,    label: 'Difficile' },
  'sad':        { icon: <Meh size={28} strokeWidth={1.75} />,      label: 'Neutre' },
  'neutral':    { icon: <Smile size={28} strokeWidth={1.75} />,    label: 'Bien' },
  'happy':      { icon: <SmilePlus size={28} strokeWidth={1.75} />, label: 'Très bien' },
  'very-happy': { icon: <Laugh size={28} strokeWidth={1.75} />,    label: 'Excellent' },
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
  <div className={['flex gap-stack-xs flex-wrap', className].filter(Boolean).join(' ')}>
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
            'flex flex-col items-center gap-stack-3xs p-3 rounded-lg cursor-pointer transition-[background-color,border-color,box-shadow,transform] duration-fast ease-emphasis active:scale-[0.94] min-h-touch focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            /* Filet de sélection au cran 700 (23/09) : c'est lui qui dit « choisi »,
               le fond primary-100 ne se distingue guère de l'ink-50 du repos.
               Au 500 : 2,40 contre son propre fond, 2,94 contre le blanc ;
               au 700 : 4,11 et 5,02 (WCAG 1.4.11, 3:1). */
            selected
              ? 'bg-primary-100 border-2 border-primary-700 shadow-sm'
              : 'bg-ink-50 border-2 border-transparent hover:bg-ink-100',
          ].join(' ')}
        >
          <span className="inline-flex items-center justify-center select-none" aria-hidden="true">
            {cfg.icon}
          </span>
          {/* Libellé de l'option : 13 / 600 aux deux états (500 est la graisse des
              puces) ; l'encre fonce d'un cran quand l'humeur est choisie. */}
          <span className={`font-body text-caption font-semibold ${selected ? 'text-ink-900' : 'text-ink-700'}`}>{cfg.label}</span>
        </button>
      );
    })}
  </div>
);

export default MoodSelector;
