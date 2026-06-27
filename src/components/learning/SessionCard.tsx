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
import { Button } from '../core/Button';
import { Avatar } from '../ui/Avatar';
import { CalendarClock, FileText, Notebook, ArrowRight } from 'lucide-react';

export type SessionCardSurface = 'card' | 'tinted' | 'glass' | 'frosted';
export type SessionCardTone = 'primary' | 'warm' | 'sun';

export interface SessionCardProps {
  title: string;
  coachName: string;
  /** Rôle/spécialité du coach — affiché en sous-ligne sous le nom (éditorial). Optionnel. */
  coachRole?: string;
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
  'inline-flex items-center gap-1 px-3 py-1.5 rounded-pill text-caption font-body font-semibold cursor-pointer border transition-[background-color,border-color,color,transform,box-shadow] duration-fast ease-emphasis hover:-translate-y-px';

const ACTION_BTN_TONES: Record<SessionCardTone | 'secondary', string> = {
  primary:   'border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 hover:border-primary-300 hover:shadow-brand-sm active:bg-primary-200',
  warm:      'border-secondary-200 bg-secondary-50 text-secondary-700 hover:bg-secondary-100 hover:border-secondary-300 hover:shadow-warm-sm active:bg-secondary-200',
  sun:       'border-accent-200 bg-accent-50 text-accent-700 hover:bg-accent-100 hover:border-accent-300 hover:shadow-sun-sm active:bg-accent-200',
  secondary: 'border-ink-200 bg-ink-50 text-ink-600 hover:bg-white hover:border-ink-300 hover:text-ink-900 hover:shadow-xs',
};

/* Surface variants — cross-cutting DS Phase 10 convention.
   Tinted est tone-aware ; glass et frosted sont universels (overlay sur fonds colorés). */
const SURFACE_CARD_BASE = 'bg-white border border-ink-100 shadow-card';

const SURFACE_CARD_HOVER_BORDER: Record<SessionCardTone, string> = {
  primary: 'hover:border-primary-200',
  warm:    'hover:border-secondary-200',
  sun:     'hover:border-accent-200',
};

const SURFACE_TINTED: Record<SessionCardTone, string> = {
  primary: 'bg-primary-100/88 backdrop-blur-sm border border-primary-200/70 hover:border-primary-300/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]',
  warm:    'bg-secondary-100/88 backdrop-blur-sm border border-secondary-200/70 hover:border-secondary-300/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]',
  sun:     'bg-accent-100/88 backdrop-blur-sm border border-accent-200/70 hover:border-accent-300/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]',
};

const SURFACE_GLASS =
  'bg-white/75 backdrop-blur-glass-light border border-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-white/85';

const SURFACE_FROSTED =
  'bg-white/68 backdrop-blur-glass-medium border border-white/55 shadow-sm hover:bg-white/80 hover:shadow-card-hover';

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
    default:        return `${SURFACE_CARD_BASE} ${SURFACE_CARD_HOVER_BORDER[tone]}`;
  }
}

const TONE_HOVER_SHADOW: Record<SessionCardTone, string> = {
  primary: 'hover:shadow-brand-md',
  warm:    'hover:shadow-warm-md',
  sun:     'hover:shadow-sun-md',
};

/* Status eyebrow — point coloré + label, en remplacement du Badge top-right
   (plus éditorial, moins "app badge"). */
const STATUS_EYEBROW: Record<'planned' | 'completed', { dot: string; label: string; text: string }> = {
  planned:   { dot: 'bg-info-base',    label: 'Planifiée', text: 'text-primary-700' },
  completed: { dot: 'bg-success-base', label: 'Terminée',  text: 'text-success-fg' },
};

const BASE =
  'group flex flex-col gap-stack p-6 rounded-2xl transition-all duration-slow ease-emphasis hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2';

export const SessionCard: React.FC<SessionCardProps> = ({
  title,
  coachName,
  coachRole,
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
  const eyebrow = STATUS_EYEBROW[status];
  /* Meta date/durée en texte inline avec séparateur · (éditorial — fini les pills bordées). */
  const dateLine = [dateLabel, durationLabel].filter(Boolean).join(' · ');

  const classes = [
    BASE,
    getSurfaceClasses(surface, tone),
    FOCUS_TONE[tone],
    TONE_HOVER_SHADOW[tone],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {/* Header éditorial : eyebrow statut → titre → coach → date inline */}
      <div className="flex flex-col gap-stack-xs">
        <span className="inline-flex items-center gap-1.5 text-micro font-semibold uppercase tracking-[0.08em]">
          <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full ${eyebrow.dot}`} />
          <span className={eyebrow.text}>{eyebrow.label}</span>
        </span>

        <CardTitle>{title}</CardTitle>

        {/* Coach — avatar + nom (+ rôle) : humanise sans badge froid */}
        <div className="flex items-center gap-2.5 pt-0.5">
          <Avatar size="sm" name={coachName} shape="circle" />
          <div className="min-w-0">
            <p className="m-0 text-body-sm font-semibold text-ink-900 leading-tight truncate">{coachName}</p>
            {coachRole && <p className="m-0 text-caption text-ink-500 leading-tight truncate">{coachRole}</p>}
          </div>
        </div>

        {/* Date · durée — meta inline discrète */}
        <p className="m-0 flex items-center gap-1.5 text-caption text-ink-600">
          <CalendarClock size={14} className="text-ink-400 shrink-0" aria-hidden="true" />
          {dateLine}
        </p>
      </div>

      {/* Description (contexte) */}
      <CardDesc>{description}</CardDesc>

      {(questionnaire || report || onOpen) && (
      <div className={`flex flex-wrap gap-stack-xs pt-3 ${FOOTER_DIVIDER[surface]}`}>
        {questionnaire && (
          <button className={`${ACTION_BTN_BASE} ${ACTION_BTN_TONES[tone]}`} onClick={onViewQuestionnaire}>
            <FileText size={13} />
            Questionnaire
          </button>
        )}
        {report && (
          <button className={`${ACTION_BTN_BASE} ${ACTION_BTN_TONES[tone]}`} onClick={onViewReport}>
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
              Voir la session <ArrowRight size={14} />
            </Button>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default SessionCard;
