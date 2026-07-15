/**
 * SessionCard — Coaching session card (past or planned).
 *
 * Refonte 2026-07 (card-system) — hiérarchie par l'état :
 *  - `planned`   → registre ACTIF : surface tone-aware (teinté), meta pills, CTA franc.
 *  - `completed` → registre QUIET : blanc neutre, meta muted, actions discrètes.
 *    (règle produit : jamais de saturation sur un état inactif — une session passée
 *     ne crie pas en orange.)
 *
 * Grammaire meta unifiée : status chip + date en pill NEUTRE (fini le texte inline `·`).
 * Charge réduite : actions doc en ghost discret, une seule action claire "Voir la session".
 *
 * Surface prop conservée pour les overlays (glass/frosted sur fonds colorés — hero coaching).
 */

import React from 'react';
import { CardTitle, CardDesc } from '../core/Card';
import { Avatar } from '../ui/Avatar';
import { CalendarClock, FileText, ClipboardList, Notebook, Check, ArrowRight } from 'lucide-react';
import { CARD_SHADOW_HOVER_MD } from '../../lib/tone-classes';

export type SessionCardSurface = 'card' | 'tinted' | 'glass' | 'frosted' | 'outline';
export type SessionCardTone = 'primary' | 'warm' | 'sun';

export interface SessionCardProps {
  title: string;
  coachName: string;
  coachRole?: string;
  description: string;
  dateLabel: string;
  durationLabel?: string;
  status: 'planned' | 'completed';
  /** Aspect du fond (planned). completed force toujours le registre quiet neutre. */
  surface?: SessionCardSurface;
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

/* ─── Ghost action (discret — icône + label, pas de bordure lourde) ─────────── */
const GHOST_ACTION =
  'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-caption font-body font-medium ' +
  'text-ink-600 bg-transparent border-0 cursor-pointer whitespace-nowrap ' +
  'transition-colors duration-fast ease-emphasis hover:bg-ink-50 hover:text-ink-900 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-500';

/* ─── Planned surfaces (registre actif tone-aware) ──────────────────────────── */
const SURFACE_CARD_BASE = 'bg-white border border-ink-100 shadow-card';

const SURFACE_CARD_HOVER_BORDER: Record<SessionCardTone, string> = {
  primary: 'hover:border-primary-200',
  warm:    'hover:border-secondary-200',
  sun:     'hover:border-accent-200',
};

const SURFACE_TINTED: Record<SessionCardTone, string> = {
  primary: 'bg-gradient-to-br from-primary-50 to-white border border-primary-200/70 hover:border-primary-300/80 shadow-brand-sm',
  warm:    'bg-gradient-to-br from-secondary-50 to-white border border-secondary-200/70 hover:border-secondary-300/80 shadow-warm-sm',
  sun:     'bg-gradient-to-br from-accent-50 to-white border border-accent-200/70 hover:border-accent-300/80 shadow-sun-sm',
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

/* Status : point + label. planned = accent info, completed = check success muted. */
const STATUS: Record<'planned' | 'completed', { label: string; chip: string }> = {
  planned:   { label: 'Planifiée', chip: 'bg-info-bg text-info-fg' },
  completed: { label: 'Terminée',  chip: 'bg-ink-100 text-ink-500' },
};

const BASE =
  'group flex flex-col gap-stack p-5 sm:p-6 rounded-2xl transition-[transform,box-shadow,border-color] ' +
  'duration-base ease-emphasis hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2';

function plannedSurface(surface: SessionCardSurface, tone: SessionCardTone): string {
  switch (surface) {
    case 'tinted':  return SURFACE_TINTED[tone];
    case 'glass':   return SURFACE_GLASS;
    case 'frosted': return SURFACE_FROSTED;
    case 'card':
    case 'outline':
    default:        return `${SURFACE_CARD_BASE} ${SURFACE_CARD_HOVER_BORDER[tone]}`;
  }
}

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
  const isCompleted = status === 'completed';
  const st = STATUS[status];

  /* completed → registre quiet neutre (jamais de saturation sur inactif). */
  const surfaceClasses = isCompleted
    ? 'bg-white border border-ink-100 shadow-card hover:border-ink-200 hover:shadow-card-hover'
    : plannedSurface(surface, tone);

  const classes = [
    BASE,
    surfaceClasses,
    isCompleted ? 'focus-visible:outline-ink-400' : FOCUS_TONE[tone],
    isCompleted ? 'hover:shadow-card-hover' : CARD_SHADOW_HOVER_MD[tone],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {/* Header : status chip + date (pill) → titre → coach */}
      <div className="flex flex-col gap-stack-xs">
        {/* Rôle status + date — une ligne, meta neutre */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`inline-flex items-center gap-1 rounded-pill pl-1.5 pr-2 py-0.5 text-micro font-bold uppercase tracking-[0.05em] ${st.chip}`}>
            {isCompleted
              ? <Check size={11} strokeWidth={2.5} aria-hidden />
              : <span className="w-1.5 h-1.5 rounded-pill bg-current" aria-hidden />}
            {st.label}
          </span>
          <span className="inline-flex items-center gap-1 text-caption text-ink-500 font-medium">
            <CalendarClock size={13} className="text-ink-400 shrink-0" aria-hidden />
            {dateLabel}{durationLabel ? ` · ${durationLabel}` : ''}
          </span>
        </div>

        <CardTitle className={isCompleted ? 'text-ink-800' : ''}>{title}</CardTitle>

        {/* Coach — avatar + nom (+ rôle) */}
        <div className="flex items-center gap-2.5 pt-0.5">
          <Avatar size="sm" name={coachName} shape="circle" />
          <div className="min-w-0">
            <p className="m-0 text-body-sm font-semibold text-ink-900 leading-tight truncate">{coachName}</p>
            {coachRole && <p className="m-0 text-caption text-ink-500 leading-tight truncate">{coachRole}</p>}
          </div>
        </div>
      </div>

      {/* Description (contexte) — muted + clamp pour limiter la charge */}
      <CardDesc className="line-clamp-2">{description}</CardDesc>

      {(questionnaire || report || onOpen) && (
        <div className="flex flex-wrap items-center gap-1 pt-3 border-t border-ink-100">
          {questionnaire && (
            <button type="button" className={GHOST_ACTION} onClick={onViewQuestionnaire}>
              <ClipboardList size={14} className="text-ink-400" aria-hidden />
              Questionnaire
            </button>
          )}
          {report && (
            <button type="button" className={GHOST_ACTION} onClick={onViewReport}>
              <FileText size={14} className="text-ink-400" aria-hidden />
              Compte-rendu
            </button>
          )}
          {(questionnaire || report) && (
            <button type="button" className={GHOST_ACTION} onClick={onAddNote}>
              <Notebook size={14} className="text-ink-400" aria-hidden />
              {journal ? 'Ma note' : 'Note'}
            </button>
          )}
          {onOpen && (
            <button
              type="button"
              onClick={onOpen}
              className={[
                'ml-auto inline-flex items-center gap-1.5 h-9 px-4 rounded-pill shrink-0',
                'text-caption font-body font-semibold whitespace-nowrap cursor-pointer',
                'transition-[background-color,transform,box-shadow] duration-fast ease-emphasis hover:-translate-y-px',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                isCompleted
                  ? 'bg-ink-900 text-white hover:bg-ink-800'
                  : 'bg-primary-600 text-white hover:bg-primary-700 shadow-brand-sm hover:shadow-brand-md',
                '[&>svg]:transition-transform group-hover:[&>svg]:translate-x-0.5',
              ].join(' ')}
            >
              Voir la session
              <ArrowRight size={14} aria-hidden />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SessionCard;
