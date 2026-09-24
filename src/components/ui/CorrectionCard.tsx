import React from 'react';
import { MessageSquare, Clock, ChevronRight, UserCheck } from 'lucide-react';
import { Card } from '../core/Card';
import { Badge } from './Badge';
import { MetaPill } from './MetaPill';
import { Avatar } from './Avatar';
import { Button } from '../core/Button';

// ─── Types ───────────────────────────────────────────────────────────────────

export type CorrectionStatus = 'pending' | 'in-review' | 'corrected' | 'rejected';

export interface CorrectionCardProps {
  id: string;
  apprenantName: string;
  apprenantInitials?: string;
  exerciceTitle: string;
  competence: string;
  submittedAt: string;
  status: CorrectionStatus;
  excerpt?: string;
  feedbackCount?: number;
  surface?: 'card' | 'tinted';
  onOpen?: () => void;
  onAssign?: () => void;
  className?: string;
}

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<CorrectionStatus, { label: string; variant: 'neutral' | 'info' | 'success' | 'danger' }> = {
  pending: { label: 'À corriger', variant: 'neutral' },
  'in-review': { label: 'En cours', variant: 'info' },
  corrected: { label: 'Corrigé', variant: 'success' },
  rejected: { label: 'Refusé', variant: 'danger' },
};

// ─── CorrectionCard ───────────────────────────────────────────────────────────

export const CorrectionCard: React.FC<CorrectionCardProps> = ({
  apprenantName,
  apprenantInitials,
  exerciceTitle,
  competence,
  submittedAt,
  status,
  excerpt,
  feedbackCount,
  surface = 'card',
  onOpen,
  onAssign,
  className = '',
}) => {
  const { label: statusLabel, variant: statusVariant } = STATUS_CONFIG[status];

  return (
    <Card
      variant={surface === 'tinted' ? 'tinted' : 'default'}
      tone="primary"
      className={['flex flex-col gap-stack-md', className].filter(Boolean).join(' ')}
    >
      {/* Anatomie (passe typographique du 2026-09-24) :
            qui + quand → titre 12 · titre → compétence 8 · → extrait 12 ·
            contenu → actions 20, filet compris.
          L'exercice est le sujet de la carte : il devient son titre (h3 20/700).
          Il était au corps du texte (16/600), à égalité avec le nom de
          l'apprenant posé au-dessus — la carte avait deux titres de même poids. */}
      <div className="flex flex-col gap-stack-sm">
        {/* Header row — l'avatar et l'état se calent sur la première ligne
            (le nom) : le bloc de texte descend de 2 px (2 + 13 = 15, contre
            16), le Badge est centré dans une boîte haute d'une ligne. */}
        <div className="flex items-start justify-between gap-stack-xs">
          <div className="flex items-start gap-stack-sm min-w-0">
            <Avatar
              name={apprenantName}
              initials={apprenantInitials ?? apprenantName.slice(0, 2).toUpperCase()}
              size="sm"
            />
            <div className="min-w-0 flex flex-col gap-tight pt-tight">
              <p className="text-body font-semibold text-ink-900 truncate">{apprenantName}</p>
              <p className="text-caption text-ink-600 flex items-center gap-stack-3xs">
                <Clock size={14} aria-hidden />
                {submittedAt}
              </p>
            </div>
          </div>
          <span className="flex items-center h-lh mt-tight text-body shrink-0">
            <Badge variant={statusVariant as any}>{statusLabel}</Badge>
          </span>
        </div>

        {/* Exercise title + competence */}
        <div className="flex flex-col items-start gap-stack-xs">
          <h3 className="text-h3 text-ink-900 line-clamp-2">{exerciceTitle}</h3>
          {/* Vraie métadonnée (une compétence) : la MetaPill elle-même, plus son
              imitation — label primary-800 (le 700 mesurait 4,48 à 11 px). */}
          <MetaPill text={competence} tone="primary" />
        </div>

        {/* Excerpt — blockquote with background tint (no side-stripe, per DESIGN-IMPECCABLE §11) */}
        {excerpt && (
          <div className="rounded-lg bg-ink-50/70 px-3 py-2">
            <p className="text-body text-ink-700 line-clamp-2 italic">
              « {excerpt} »
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-stack-sm border-t border-ink-100 mt-auto">
        <div className="flex items-center gap-tight text-caption text-ink-600">
          {feedbackCount !== undefined && (
            <>
              <MessageSquare size={14} aria-hidden />
              <span>{feedbackCount} feedback{feedbackCount !== 1 ? 's' : ''}</span>
            </>
          )}
        </div>
        {/* Arbitrage n°19 : l'action de la carte (« Corriger », « Voir ») est
            en `soft`, « Assigner » en `ghost`. Les deux étaient en `outline`,
            réservé à Annuler : deux boutons de même poids, sans ordre. */}
        <div className="flex items-center gap-stack-xs">
          {onAssign && status === 'pending' && (
            <Button
              emphasis="ghost"
              size="sm"
              leadingIcon={<UserCheck size={14} />}
              onClick={onAssign}
            >
              Assigner
            </Button>
          )}
          {onOpen && (
            <Button
              emphasis="soft"
              size="sm"
              trailingIcon={<ChevronRight size={14} />}
              onClick={onOpen}
            >
              {status === 'pending' || status === 'in-review' ? 'Corriger' : 'Voir'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CorrectionCard;
