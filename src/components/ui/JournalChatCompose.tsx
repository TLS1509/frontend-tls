/**
 * JournalChatCompose — Figma DS Journal component.
 *
 * Chat-style compose input bar for quickly starting a journal entry.
 * Renders as an Apple Messages speech bubble (tail at bottom-left) with a
 * textarea, send button, and a keyboard shortcut hint.
 *
 * Usage:
 *   <JournalChatCompose
 *     value={composeText}
 *     onChange={setComposeText}
 *     onSubmit={handleSubmit}
 *   />
 */

import React from 'react';
import { PenLine, Send } from 'lucide-react';
import { Card } from '../core/Card';
import { Button } from '../core/Button';

export interface JournalChatComposeProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  /** Helper text displayed below the textarea. */
  hint?: string;
  className?: string;
}

export const JournalChatCompose: React.FC<JournalChatComposeProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Tape une pensée, un insight, une question qui t'a traversé(e)…",
  hint = "Tu pourras affiner le format & ajouter des tags à l'étape suivante.",
  className = '',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) onSubmit();
  };

  return (
    <Card
      className={[
        /* Rayon : celui de la Card (20) — la famille bulle est alignée sur
           l'étage conteneur depuis le 2026-09-17 (l'override !rounded-2xl
           donnait à cette bulle un 3e rayon dans la famille). Pas d'ombre :
           une carte n'en porte plus (S2), et celle-ci n'est pas cliquable. */
        '!p-0 !gap-0 !overflow-visible relative',
        'bg-white border border-primary-100',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Speech bubble tail — bottom-left */}
      <span
        aria-hidden="true"
        className="absolute -bottom-2 left-8 w-4 h-4 rotate-45 rounded-br-[4px] bg-white border-r border-b border-primary-100"
      />

      {/* Compose row */}
      <div className="flex items-end gap-stack-xs p-4">
        {/* Repère d'écriture : l'icône Lucide PenLine (2026-09-24), plus
            l'émoji ✍️ — les icônes de l'app sont Lucide (pièges, « pas de SVG
            inline custom »), un émoji change de dessin d'un système à l'autre.
            20 px (cran `md`), à l'encre de la bulle ; centrée dans une boîte de
            44 px, la hauteur du bouton d'envoi, sur la même ligne de base. */}
        <span
          className="shrink-0 inline-flex items-center justify-center h-touch text-primary-700 select-none"
          aria-hidden="true"
        >
          <PenLine size={20} />
        </span>
        <div className="flex-1 min-w-0">
          <label className="sr-only" htmlFor="journal-compose">
            Écris une pensée du jour
          </label>
          <textarea
            id="journal-compose"
            rows={2}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className="w-full resize-none border-0 outline-none bg-transparent font-body text-body text-ink-900 placeholder:text-ink-500 h-auto min-h-[44px] focus:outline-none"
          />
        </div>
        <Button
          emphasis="soft"
          size="md"
          onClick={onSubmit}
          aria-label="Continuer l'entrée"
          leadingIcon={<Send size={14} />}
          className="shrink-0"
        >
          Continuer
        </Button>
      </div>

      {/* Aide et raccourci : 13 / 400 ink-600, la voix de l'aide sous un champ
          (ink-500 est réservé aux placeholders, le `micro` aux étiquettes). */}
      <div className="px-4 pb-3 -mt-1 flex items-center justify-between gap-stack-xs flex-wrap">
        {hint && (
          <span className="font-body text-caption text-ink-600">{hint}</span>
        )}
        <span className="font-body text-caption text-ink-600 hidden sm:inline ml-auto">
          <kbd className="px-1.5 py-0.5 rounded-xs bg-ink-50 border border-ink-200 text-ink-600 font-mono text-micro">
            ⌘ + Entrée
          </kbd>{' '}
          pour envoyer
        </span>
      </div>
    </Card>
  );
};

export default JournalChatCompose;
