import React from 'react';
import { StatusBadge, type StatusBadgeStatus } from '../ui/Badge';
import { Zap } from 'lucide-react';

export type CorrectionStatus = 'pending' | 'in-progress' | 'completed' | 'failed';

export interface CorrectionStatusBarProps {
  status: CorrectionStatus;
  competenceLabel?: string;
  xpAwarded?: number;
  iterationCount?: number;
  className?: string;
}

/**
 * CorrectionStatusBar — Reusable status display for corrections
 *
 * Shows: status badge + competence label + XP awarded + iteration count.
 * Extracted from CorrectionDetailLearner lines 77–91 (Phase 19.1).
 * Reusable across: corrections list, coach queue, detail pages.
 *
 * Une correction n'est pas une leçon : elle emprunte l'icône d'un état de
 * leçon (StatusBadge), mais dit le sien. Corrigé le 2026-09-24 — la
 * correspondance était décalée : une correction EN ATTENTE s'affichait avec le
 * cadenas et se lisait « Verrouillé », une correction EN COURS avec le cercle
 * vide et se lisait « Disponible ». Les libellés sont ceux de
 * CorrectionDetailLearner, la page dont ce bandeau est extrait :
 *
 *   pending      cercle vide (rien n'est encore engagé)   « En attente de correction »
 *   in-progress  lecture (le coach y travaille)           « En cours de révision »
 *   completed    coche                                    « Terminé »
 *   failed       croix                                    « Échoué »
 */
const ETATS: Record<CorrectionStatus, { icone: StatusBadgeStatus; libelle?: string }> = {
  pending:       { icone: 'available',   libelle: 'En attente de correction' },
  'in-progress': { icone: 'in-progress', libelle: 'En cours de révision' },
  completed:     { icone: 'completed' },
  failed:        { icone: 'failed' },
};

export const CorrectionStatusBar: React.FC<CorrectionStatusBarProps> = ({
  status,
  competenceLabel,
  xpAwarded,
  iterationCount,
  className = '',
}) => {
  const etat = ETATS[status];

  return (
    <div className={`flex flex-wrap items-center gap-stack-xs ${className}`}>
      <StatusBadge status={etat.icone} label={etat.libelle} />

      {/* Valeur 16/600 ink-900 · méta 13 ink-600 · texte de marque au cran 800
          (passe typographique du 2026-09-24). */}
      {competenceLabel && (
        <span className="text-body font-semibold text-ink-900">
          {competenceLabel}
        </span>
      )}

      {xpAwarded !== undefined && (
        <div className="flex items-center gap-tight">
          <Zap size={14} className="text-accent-400" />
          <span className="text-body font-semibold text-accent-800 tabular-nums">
            +{xpAwarded} XP
          </span>
        </div>
      )}

      {iterationCount !== undefined && (
        <span className="text-caption text-ink-600 tabular-nums">
          Itération {iterationCount}
        </span>
      )}
    </div>
  );
};
