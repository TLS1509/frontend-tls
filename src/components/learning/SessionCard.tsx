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
import { Button } from '../core/Button';
import { CardTitle, CardDesc } from '../core/Card';
import { Avatar } from '../ui/Avatar';
import { Badge, type BadgeVariant } from '../ui/Badge';
import { CalendarClock, FileText, ClipboardList, Notebook, Check, ArrowRight } from 'lucide-react';
import { CARD_HOVER } from '../../lib/tone-classes';

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
/* Libellé en 600 : 500 est réservé aux puces (passe typographique du
   2026-09-24). Pas 700 comme Button — ces trois actions sont tertiaires et
   restent en retrait du « Voir la session » ; leur place dans la hiérarchie
   des boutons est l'affaire de l'arbitrage n°19. */
const GHOST_ACTION =
  'inline-flex items-center gap-stack-2xs px-2.5 py-1.5 rounded-lg text-caption font-body font-semibold ' +
  'text-ink-600 bg-transparent border-0 cursor-pointer whitespace-nowrap ' +
  'transition-colors duration-fast ease-emphasis hover:bg-ink-50 hover:text-ink-900 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-500';

/* ─── Planned surfaces (registre actif tone-aware) ──────────────────────────── */
const SURFACE_CARD_BASE = 'bg-white border border-ink-200';

const SURFACE_CARD_HOVER_BORDER: Record<SessionCardTone, string> = {
  primary: 'hover:border-primary-200',
  warm:    'hover:border-secondary-200',
  sun:     'hover:border-accent-200',
};

const SURFACE_TINTED: Record<SessionCardTone, string> = {
  primary: 'bg-gradient-to-br from-primary-50 to-white border border-primary-200/70 hover:border-primary-300/80',
  warm:    'bg-gradient-to-br from-secondary-50 to-white border border-secondary-200/70 hover:border-secondary-300/80',
  sun:     'bg-gradient-to-br from-accent-50 to-white border border-accent-200/70 hover:border-accent-300/80',
};

const SURFACE_GLASS =
  'bg-white/75 backdrop-blur-glass-light border border-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-white/85';
const SURFACE_FROSTED =
  'bg-white/68 backdrop-blur-glass-medium border border-white/55 shadow-sm hover:bg-white/80';

const FOCUS_TONE: Record<SessionCardTone, string> = {
  primary: 'focus-visible:outline-primary-500',
  warm:    'focus-visible:outline-secondary-400',
  sun:     'focus-visible:outline-accent-500',
};

/* Statut : le vrai `Badge` (un état). planned = info avec son point,
   completed = neutre avec une coche. C'était une imitation faite main — et
   « Terminée » y tombait en ink-500 sur ink-100. */
const STATUS: Record<'planned' | 'completed', { label: string; variant: BadgeVariant }> = {
  planned:   { label: 'Planifiée', variant: 'info' },
  completed: { label: 'Terminée',  variant: 'neutral' },
};

const BASE =
  /* Aligné sur les décisions du 09/09 : rayon 14 px (R1), padding 24 px au canon,
   ni ombre ni soulèvement au survol — la bordure suffit à poser la carte. */
  'group flex flex-col gap-stack p-stack-lg rounded-xl transition-[box-shadow,border-color] ' +
  'duration-base ease-emphasis focus-visible:outline-2 focus-visible:outline-offset-2';

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
    ? 'bg-white border border-ink-200 hover:border-ink-300'
    : plannedSurface(surface, tone);

  const classes = [
    BASE,
    surfaceClasses,
    isCompleted ? 'focus-visible:outline-ink-400' : FOCUS_TONE[tone],
    isCompleted ? '' : CARD_HOVER[tone],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {/* Anatomie (passe typographique du 2026-09-24) :
            état + date → titre 4 · titre → coach 12 · → texte 16 · → actions 24.
          Le `mt-stack-3xs` du titre remplace la marge de base des titres
          (0,75em), faite pour séparer des sections, pas pour coller un titre à
          son surtitre : ils étaient à 23 px l'un de l'autre. */}
      <div className="flex flex-col gap-stack-sm">
        <div className="flex flex-col">
          {/* Rôle status + date — une ligne, meta neutre */}
          <div className="flex items-center gap-stack-xs flex-wrap">
            <Badge variant={st.variant} dot={!isCompleted} className="shrink-0">
              {isCompleted && <Check size={14} strokeWidth={2.5} aria-hidden />}
              {st.label}
            </Badge>
            <span className="inline-flex items-center gap-stack-3xs text-caption text-ink-600">
              <CalendarClock size={14} className="text-ink-500 shrink-0" aria-hidden />
              {dateLabel}{durationLabel ? ` · ${durationLabel}` : ''}
            </span>
          </div>

          <CardTitle className="mt-stack-3xs">{title}</CardTitle>
        </div>

        {/* Coach — avatar + nom (+ rôle). L'avatar se cale sur la première
            ligne : le texte descend de 2 px (2 + 13 = 15, contre 16). */}
        <div className="flex items-start gap-stack-sm">
          <Avatar size="sm" name={coachName} shape="circle" />
          <div className="min-w-0 flex flex-col gap-tight pt-tight">
            <p className="m-0 text-body font-semibold text-ink-900 truncate">{coachName}</p>
            {coachRole && <p className="m-0 text-caption text-ink-600 truncate">{coachRole}</p>}
          </div>
        </div>
      </div>

      {/* Description (contexte) — muted + clamp pour limiter la charge */}
      <CardDesc className="line-clamp-2">{description}</CardDesc>

      {(questionnaire || report || onOpen) && (
        <div className="flex flex-wrap items-center gap-stack-3xs mt-stack-xs pt-stack-sm border-t border-ink-100">
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
          {/* Le CTA passait par un <button> habillé à la main : 36 px de haut,
              donc sous la cible de 44, et hors de portée des décisions boutons.
              Migré le 2026-09-10. Le ton `neutral` en état terminé remplace
              l'ancien `bg-ink-900`, qui disait la même chose sans le dire. */}
          {onOpen && (
            <Button
              size="sm"
              emphasis="soft"
              tone={isCompleted ? 'neutral' : 'brand'}
              onClick={onOpen}
              trailingIcon={<ArrowRight />}
              className="ml-auto shrink-0"
            >
              Voir la session
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SessionCard;
