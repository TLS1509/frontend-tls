/**
 * JournalBubbleCard — Figma DS Journal component.
 *
 * Apple Messages-style chat bubble for displaying journal entries in the
 * journal list. Tone-aware surface per entry type, speech-bubble tail at
 * bottom-right, glass-light action buttons.
 *
 * Distinct from JournalEntryCard (traditional card layout) — this component
 * uses the chat-bubble shell with tinted surfaces.
 *
 * Usage:
 *   <JournalBubbleCard
 *     type="learning"
 *     title="Ma session coaching"
 *     excerpt="Aujourd'hui j'ai compris que…"
 *     date="12 mai 2026"
 *     readingTime="2 min"
 *     onRead={() => navigate(`/journal/detail/${id}`)}
 *     onContinue={() => navigate(`/journal/detail/${id}`)}
 *   />
 */

import { JOURNAL_TYPES, type JournalTypeKey } from '../../lib/journal-types';
import React from 'react';
import {
  ArrowRight,
} from 'lucide-react';
import { Button } from '../core/Button';

/** Conservé comme alias : le vocabulaire vit dans `lib/journal-types`. */
export type JournalBubbleType = JournalTypeKey;


export interface JournalBubbleCardProps {
  type: JournalBubbleType;
  title: string;
  excerpt: string;
  date: string;
  readingTime?: string;
  onRead?: () => void;
  onContinue?: () => void;
  /** Quick action label for coaching/compte-rendu entries. */
  onCoachingAction?: () => void;
  className?: string;
}

export const JournalBubbleCard: React.FC<JournalBubbleCardProps> = ({
  type,
  title,
  excerpt,
  date,
  readingTime,
  onRead,
  onContinue,
  onCoachingAction,
  className = '',
}) => {
  const meta = JOURNAL_TYPES[type];
  const TypeIcon = meta.Icon;

  return (
    <div
      className={[
        // Chat-bubble shell — construction canonique de la famille bulle
        // (2026-09-17) : rayon conteneur (20), filet, queue bordée, padding
        // canon carte (24). Le cran `stack-md` (20 px) existe depuis le 17/09 au soir, mais la bulle reste au canon carte.
        'relative !overflow-visible rounded-xl border p-stack-lg flex flex-col gap-stack-sm',
        'transition-all duration-base',
        meta.surface,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Speech bubble tail — bottom-right, color matches surface for seamless blend */}
      <span
        aria-hidden="true"
        className={[
          'absolute -bottom-2 right-8 w-5 h-5 rotate-45 rounded-br-[6px]',
          'border-r border-b transition-colors duration-200',
          meta.tail,
        ].join(' ')}
      />

      {/* Anatomie (passe typographique du 2026-09-24) : titre → date 2 ·
          en-tête → extrait 12 · contenu → actions 24, filet compris.
          La pastille de type est une donnée : le registre de MetaPill (13/500),
          plus 600. */}
      <div className="flex items-start justify-between gap-stack-xs">
        <div className="flex-1 min-w-0 flex flex-col gap-tight">
          <h3 className="font-display text-h3 text-ink-900">
            {title}
          </h3>
          <span className="font-body text-caption text-ink-600">
            {date}
            {readingTime ? ` · ${readingTime}` : ''}
          </span>
        </div>
        <span
          className={[
            'inline-flex items-center gap-stack-2xs px-2.5 py-1 rounded-pill',
            'font-body text-caption font-medium shrink-0 whitespace-nowrap',
            meta.badge,
          ].join(' ')}
        >
          <TypeIcon size={14} />
          {meta.label}
        </span>
      </div>

      {/* Excerpt */}
      <p className="font-body text-body text-ink-700 m-0 max-w-prose">{excerpt}</p>

      {/* Coaching quick action (questionnaire / compte-rendu only) — une
          action secondaire de la carte, dont « Lire » est l'action : `ghost`
          (arbitrage n°19 ; `outline` est réservé à Annuler). */}
      {(type === 'questionnaire' || type === 'compte-rendu') && onCoachingAction && (
        <Button
          emphasis="ghost"
          size="sm"
          trailingIcon={<ArrowRight size={14} />}
          onClick={onCoachingAction}
        >
          {type === 'questionnaire' ? 'Voir les réponses' : 'Voir le rapport complet'}
        </Button>
      )}

      {/* Primary actions */}
      {(onRead || onContinue) && (
        <div className="flex gap-stack-xs mt-stack-sm pt-stack-sm border-t border-white/60">
          {onRead && (
            <Button
              emphasis="soft" tone="neutral"
              size="md"
              onClick={onRead}
            >
              Lire
            </Button>
          )}
          {onContinue && (
            <Button
              emphasis="ghost" tone="neutral"
              size="md"
              trailingIcon={<ArrowRight size={16} />}
              onClick={onContinue}
            >
              Continuer
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default JournalBubbleCard;
