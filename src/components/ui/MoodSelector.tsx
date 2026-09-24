/**
 * MoodSelector — Figma DS Journal component.
 *
 * Row of mood buttons (Lucide faces) with label, selection highlight,
 * and aria-pressed for accessibility.
 *
 * Usage:
 *   <MoodSelector value={mood} onChange={setMood} />
 */

import React from 'react';
import { Angry, Frown, Laugh, Meh, Smile, type LucideIcon } from 'lucide-react';
import type { JournalMoodLevel } from '../../types/learning';

/** Convenience alias — same values as JournalMoodLevel from types/learning. */
export type MoodLevel = JournalMoodLevel;

/* L'échelle des humeurs — source unique, corrigée le 2026-09-24.

   Les libellés et les visages étaient décalés d'un cran sur les valeurs
   enregistrées : `sad` s'affichait « Neutre », `neutral` « Bien », `happy`
   « Très bien ». Une entrée écrite « frustré » (valeur `sad`) se relisait
   « Neutre » sur sa page, pendant que la recherche la classait « Difficile »
   — et une humeur choisie « Neutre » s'enregistrait `sad`. L'échelle suit
   maintenant la valeur, symétrique comme elle : deux crans négatifs, le
   neutre, deux positifs. Les mots sont ceux déjà employés par la recherche
   du journal (« Très difficile », « Difficile », « Neutre », « Excellent »),
   et « Bien » pour `happy`. Les visages montent d'un cran à l'autre : colère,
   moue, bouche droite, sourire, rire.

   La page de lecture d'une entrée (JournalDetail) lit cette table : on relit
   l'humeur qu'on a choisie, avec le même mot et le même visage. */
export const HUMEURS: Record<MoodLevel, { label: string; Icone: LucideIcon }> = {
  'very-sad':   { Icone: Angry, label: 'Très difficile' },
  'sad':        { Icone: Frown, label: 'Difficile' },
  'neutral':    { Icone: Meh,   label: 'Neutre' },
  'happy':      { Icone: Smile, label: 'Bien' },
  'very-happy': { Icone: Laugh, label: 'Excellent' },
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
      const cfg = HUMEURS[level];
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
            <cfg.Icone size={28} strokeWidth={1.75} />
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
