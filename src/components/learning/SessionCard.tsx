/**
 * SessionCard — Coaching session card (past or planned).
 *
 * Pattern : titre + statut + meta (coach · date) DIRECTEMENT sous le titre,
 * description (contexte) en dessous, puis row d'actions footer (questionnaire / compte-rendu / note / ouvrir).
 *
 * Surface system (cross-cutting DS convention Phase 10) :
 *  - `card` (default) : bg-white + border ink-200
 *  - `tinted` (tone-aware) : bg-{tone}-50/60 + border {tone}-100
 *  - `glass` : bg-white/60 + backdrop-blur-glass-light (pour overlays hero)
 *  - `frosted` : bg-white/40 + backdrop-blur-glass-medium + shadow (overlays cover)
 *
 * Tone : `primary` (DEFAULT) · `warm` · `sun` (utilisé pour les surfaces tinted/focus colors)
 *
 * Interaction : hover lift + shadow-md, focus-visible tone-aware outline.
 */

import React from 'react';
import { CardTitle, CardDesc } from '../core/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../core/Button';
import { MetaPillGroup } from '../ui/MetaPillGroup';
import { UserRound, CalendarClock, Clock3, FileText, Notebook, ArrowRight } from 'lucide-react';
import type { BadgeVariant } from '../ui/Badge';

export type SessionCardSurface = 'card' | 'tinted' | 'glass' | 'frosted';
export type SessionCardTone = 'primary' | 'warm' | 'sun';

export interface SessionCardProps {
  title: string;
  coachName: string;
  description: string;
  dateLabel: string;
  /** Durée optionnelle — par défaut non affichée (les sessions sont 1h standard). */
  durationLabel?: string;
  status: 'planned' | 'completed';
  /** Aspect du fond : card (default) / tinted / glass / frosted. */
  surface?: SessionCardSurface;
  /** Tone pour surface tinted + focus outline. Default 'primary'. */
  tone?: SessionCardTone;
  questionnaire?: boolean;
  report?: boolean;
  journal?: boolean;
  onViewQuestionnaire?: () => void;
  onViewReport?: () => void;
  onAddNote?: () => void;
  onOpen?: () => void;
  className?: string;
}

const ACTION_BTN_BASE =
  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-caption font-body font-semibold cursor-pointer border transition-[background-color,border-color,color,transform,box-shadow] duration-fast ease-emphasis hover:-translate-y-px';

const ACTION_BTN_TONES = {
  primary:   'border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 hover:border-primary-300 hover:shadow-brand-xs active:bg-primary-200',
  warm:      'border-secondary-200 bg-secondary-50 text-secondary-700 hover:bg-secondary-100 hover:border-secondary-300 hover:shadow-sm active:bg-secondary-200',
  secondary: 'border-ink-200 bg-ink-50 text-ink-600 hover:bg-white hover:border-ink-300 hover:text-ink-900 hover:shadow-xs',
};

/* Surface variants — cross-cutting DS Phase 10 convention.
   Tinted est tone-aware ; glass et frosted sont universels (overlay sur fonds colorés). */
const SURFACE_CARD = 'bg-white border border-ink-200 hover:border-ink-300';

const SURFACE_TINTED: Record<SessionCardTone, string> = {
  primary: 'bg-primary-50/60 border border-primary-100 hover:border-primary-200',
  warm:    'bg-secondary-50/60 border border-secondary-100 hover:border-secondary-200',
  sun:     'bg-accent-50/60 border border-accent-100 hover:border-accent-200',
};

const SURFACE_GLASS =
  'bg-white/60 backdrop-blur-glass-light border border-white/60 hover:bg-white/75';

const SURFACE_FROSTED =
  'bg-white/40 backdrop-blur-glass-medium border border-white/50 shadow-sm hover:bg-white/55';

const FOCUS_TONE: Record<SessionCardTone, string> = {
  primary: 'focus-visible:outline-primary-500',
  warm:    'focus-visible:outline-secondary-400',
  sun:     'focus-visible:outline-accent-500',
};

/* Divider du footer s'adapte à la surface (sur fonds clairs vs glass/frosted). */
const FOOTER_DIVIDER: Record<SessionCardSurface, string> = {
  card:    'border-t border-ink-100',
  tinted:  'border-t border-white/60',
  glass:   'border-t border-white/30',
  frosted: 'border-t border-white/30',
};

function getSurfaceClasses(surface: SessionCardSurface, tone: SessionCardTone): string {
  switch (surface) {
    case 'tinted':  return SURFACE_TINTED[tone];
    case 'glass':   return SURFACE_GLASS;
    case 'frosted': return SURFACE_FROSTED;
    case 'card':
    default:        return SURFACE_CARD;
  }
}

// Sprint 3 hover-glow ripple — tone-aware animated ::after pseudo-element
const TONE_HOVER_GLOW: Record<SessionCardTone, string> = {
  primary: 'hover-glow-primary',
  warm:    'hover-glow-warm',
  sun:     'hover-glow-sun',
};

const BASE =
  'group flex flex-col gap-stack p-6 rounded-2xl transition-all duration-slow ease-emphasis hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2';

export const SessionCard: React.FC<SessionCardProps> = ({
  title,
  coachName,
  description,
  dateLabel,
  durationLabel,
  status,
  surface = 'card',
  tone = 'primary',
  questionnaire,
  report,
  journal,
  onViewQuestionnaire,
  onViewReport,
  onAddNote,
  onOpen,
  className = '',
}) => {
  const statusVariant: BadgeVariant = status === 'completed' ? 'success' : 'info';
  const statusLabel = status === 'completed' ? 'Terminée' : 'Planifiée';

  /* Meta : coach + date (+ durée optionnelle). Affichées DIRECTEMENT sous le titre
     pour une scan UX claire (titre → infos clés → contexte description → actions). */
  const metaItems = [
    { icon: <UserRound size={14} />, text: coachName },
    { icon: <CalendarClock size={14} />, text: dateLabel },
    ...(durationLabel ? [{ icon: <Clock3 size={14} />, text: durationLabel }] : []),
  ];

  const classes = [
    BASE,
    getSurfaceClasses(surface, tone),
    FOCUS_TONE[tone],
    TONE_HOVER_GLOW[tone],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {/* Header : titre + statut + meta directement sous le titre */}
      <div className="flex flex-col gap-stack-xs">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="flex-1">{title}</CardTitle>
          <Badge variant={statusVariant}>{statusLabel}</Badge>
        </div>
        <MetaPillGroup items={metaItems} size="sm" />
      </div>

      {/* Description (contexte) — sous les méta */}
      <CardDesc>{description}</CardDesc>

      <div className={`flex flex-wrap gap-2 pt-3 ${FOOTER_DIVIDER[surface]}`}>
        {questionnaire && (
          <button className={`${ACTION_BTN_BASE} ${ACTION_BTN_TONES.primary}`} onClick={onViewQuestionnaire}>
            <FileText size={13} />
            Questionnaire
          </button>
        )}
        {report && (
          <button className={`${ACTION_BTN_BASE} ${ACTION_BTN_TONES.warm}`} onClick={onViewReport}>
            <FileText size={13} />
            Compte-rendu
          </button>
        )}
        {(questionnaire || report) && (
          <button className={`${ACTION_BTN_BASE} ${ACTION_BTN_TONES.secondary}`} onClick={onAddNote}>
            <Notebook size={13} />
            {journal ? 'Voir ma note' : 'Ajouter une note'}
          </button>
        )}
        {onOpen && (
          <div className="ml-auto flex">
            <Button variant="primary" size="sm" onClick={onOpen}>
              Ouvrir <ArrowRight size={14} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionCard;
