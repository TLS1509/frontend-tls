/**
 * NotificationCard — tone-aware feed item (épuré).
 *
 * Pattern conçu pour s'intégrer dans n'importe quel feed :
 *   - Page Notifications (liste verticale)
 *   - Sidebar dropdown / Header notifications popover
 *   - Dashboard "Activité récente" preview
 *
 * Design principles :
 *   - Row layout single line (icon ▸ content ▸ actions)
 *   - Tone-aware via 5 valeurs sémantiques (brand / warm / sun / success / neutral)
 *   - Unread state = subtle bg tinted + dot accent (pas de border-left lourd)
 *   - Actions cachées en hover desktop, toujours visibles sur mobile
 *   - 100% Tailwind + DS tokens
 *
 * Usage:
 *   <NotificationCard
 *     tone="success"
 *     icon={<CheckCircle2 size={16} />}
 *     title="Leçon complétée"
 *     body="Vous avez terminé « Prompt Engineering »."
 *     time="Il y a 2h"
 *     unread
 *     onMarkRead={() => {}}
 *     onDelete={() => {}}
 *   />
 */

import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '../core/Button';

export type NotificationTone = 'brand' | 'warm' | 'sun' | 'success' | 'neutral';

/** @deprecated Use NotificationTone — kept for retro-compat. */
export type NotificationType =
  | 'message'
  | 'lesson'
  | 'coaching'
  | 'achievement'
  | 'correction'
  | 'system'
  | 'completion'
  | 'report';

/**
 * `card` (défaut) : l'item porte sa propre coque arrondie — pour un item isolé.
 * `row` : l'item perd sa coque et devient une rangée, à poser dans UNE carte
 * qui clippe ses coins (`overflow-hidden`) et sépare par `divide-y` —
 * arbitrage n°5 du 23/09, une collection se rend en rangées.
 */
export type NotificationCardVariant = 'card' | 'row';

export interface NotificationCardProps {
  /** Coque propre (`card`) ou rangée dans une carte (`row`). */
  variant?: NotificationCardVariant;
  /** Visual tone — semantic meaning. */
  tone?: NotificationTone;
  /** Lucide icon (size 16-18 recommended, pastille de 40 px). */
  icon: React.ReactNode;
  /** Title — single line, bold. */
  title: string;
  /** Optional body — 1-2 lines max, truncated by parent if needed. */
  body?: string;
  /** Optional inline meta (chips, grade, etc.) rendered before the timestamp. */
  meta?: React.ReactNode;
  /** Relative time label ("Il y a 5 min", "Hier"…). */
  time: string;
  /** Unread state → tinted background + dot. */
  unread?: boolean;
  /** Optional click handler on the row (does not fire when clicking actions). */
  onClick?: () => void;
  /** Action: mark as read (shown only when unread). */
  onMarkRead?: () => void;
  /** Action: dismiss/delete. */
  onDelete?: () => void;
  /** Optional override. */
  className?: string;
}

/* ── Tone styles ────────────────────────────────────────────────────────── */

const ICON_BUBBLE: Record<NotificationTone, string> = {
  brand:   'bg-primary-100 text-primary-800',
  warm:    'bg-secondary-100 text-secondary-700',
  sun:     'bg-accent-100 text-accent-800',
  success: 'bg-success-bg text-success-fg',
  neutral: 'bg-ink-100 text-ink-600',
};

const UNREAD_BG: Record<NotificationTone, string> = {
  brand:   'bg-primary-50/60',
  warm:    'bg-secondary-50/60',
  sun:     'bg-accent-50/70',
  success: 'bg-success-bg/40',
  neutral: 'bg-ink-50',
};

const DOT: Record<NotificationTone, string> = {
  brand:   'bg-primary-500',
  warm:    'bg-secondary-500',
  sun:     'bg-accent-400',
  success: 'bg-success-base',
  neutral: 'bg-ink-400',
};

const UNREAD_BORDER: Record<NotificationTone, string> = {
  brand:   'border-primary-100 hover:border-primary-200',
  warm:    'border-secondary-100 hover:border-secondary-200',
  sun:     'border-accent-100 hover:border-accent-200',
  success: 'border-success-base/25 hover:border-success-base/40',
  neutral: 'border-ink-100 hover:border-ink-200',
};

/* La rangée n'a ni rayon ni filet : c'est la carte parente qui porte le coin
   (rayon 20) et le clippe. Son fond non lu épouse donc l'arc intérieur de la
   carte — la règle des coins imbriqués est tenue par construction. Retrait
   horizontal 20 puis 24, jamais sous le rayon de la carte : au coin, un seul
   des deux retraits est sous le rayon, le contenu longe un bord droit. */
const SHELL: Record<NotificationCardVariant, string> = {
  card: 'p-stack-sm sm:px-stack rounded-xl border border-transparent',
  row:  'px-stack-md py-stack-sm sm:px-stack-lg',
};

const READ_HOVER_BG: Record<NotificationTone, string> = {
  brand:   'hover:bg-primary-50/30',
  warm:    'hover:bg-secondary-50/30',
  sun:     'hover:bg-accent-50/30',
  success: 'hover:bg-success-bg/30',
  neutral: 'hover:bg-ink-50',
};

/* ── Component ──────────────────────────────────────────────────────────── */

export const NotificationCard: React.FC<NotificationCardProps> = ({
  variant = 'card',
  tone = 'brand',
  icon,
  title,
  body,
  meta,
  time,
  unread = false,
  onClick,
  onMarkRead,
  onDelete,
  className = '',
}) => {
  const clickable = !!onClick;

  return (
    <div
      onClick={onClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      className={[
        'group relative flex items-start gap-stack-xs transition-all duration-base',
        SHELL[variant],
        unread
          ? variant === 'card' ? `${UNREAD_BG[tone]} ${UNREAD_BORDER[tone]}` : UNREAD_BG[tone]
          : READ_HOVER_BG[tone],
        clickable && 'cursor-pointer',
        '!h-auto !overflow-visible !items-start !font-normal',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Pastille de 40 px, le cran des rangées de fil (ActivityFeed) : à 48 —
          le cran d'une carte à titre de 20 px — elle pesait plus lourd que le
          titre de 16 qu'elle accompagne. */}
      <div
        className={[
          'shrink-0 inline-flex items-center justify-center',
          'w-10 h-10 rounded-pill',
          ICON_BUBBLE[tone],
        ].join(' ')}
        aria-hidden
      >
        {icon}
      </div>

      {/* Anatomie de rangée (passe typographique du 2026-09-24) :
          titre 16/600 ink-900 · texte 16/400 ink-700, deux lignes au plus ·
          méta 13/400 ink-600 — 4 px entre chaque. Le corps était une légende
          grise de 13 px : c'est pourtant ce qu'on lit d'une notification.
          `pt-stack-2xs` recentre la première ligne sur la pastille (6 + 13 =
          19, contre 20). Le non-lu se dit par le point et le fond teinté, plus
          par la graisse : lu ou non, le titre garde son pas. */}
      <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs pt-stack-2xs">
        {/* Title + unread dot */}
        <div className="flex items-center gap-stack-xs min-w-0">
          <p className="m-0 font-body text-body font-semibold text-ink-900 truncate">
            {title}
          </p>
          {unread && (
            <span
              className={`shrink-0 inline-block w-1.5 h-1.5 rounded-pill ${DOT[tone]}`}
              aria-label="Non lu"
            />
          )}
        </div>

        {/* Body */}
        {body && (
          <p className="m-0 font-body text-body text-ink-700 line-clamp-2">
            {body}
          </p>
        )}

        {/* Meta + time */}
        <div className="flex items-center gap-stack-xs flex-wrap font-body text-caption text-ink-600">
          {meta}
          {meta && <span aria-hidden>·</span>}
          <span>{time}</span>
        </div>
      </div>

      {/* Actions — hover-only on desktop, always visible on mobile */}
      <div
        className={[
          'shrink-0 flex items-center gap-tight',
          'opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100',
          'transition-opacity duration-base',
        ].join(' ')}
      >
        {/* Boutons du système : `iconOnly` = cercle de 32 px, cible portée à 44
            en hauteur, anneau de focus bicolore — les boutons faits main à
            28 px en `rounded-md` n'avaient ni l'un ni l'autre. */}
        {unread && onMarkRead && (
          <Button
            iconOnly
            size="sm"
            emphasis="ghost"
            tone="neutral"
            title="Marquer comme lu"
            aria-label="Marquer comme lu"
            onClick={(e) => {
              e.stopPropagation();
              onMarkRead();
            }}
          >
            <Check />
          </Button>
        )}
        {onDelete && (
          <Button
            iconOnly
            size="sm"
            emphasis="ghost"
            tone="neutral"
            title="Supprimer"
            aria-label="Supprimer"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <X />
          </Button>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
