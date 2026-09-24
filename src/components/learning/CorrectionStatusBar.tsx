import React from 'react';
import { StatusBadge, type StatusBadgeStatus } from '../ui/Badge';

export type CorrectionStatus = 'pending' | 'in-progress' | 'completed' | 'failed';

export interface CorrectionStatusBarProps {
  status: CorrectionStatus;
  competenceLabel?: string;
  iterationCount?: number;
  className?: string;
}

/**
 * CorrectionStatusBar — Reusable status display for corrections
 *
 * Shows: status badge + competence label + iteration count. Plus d'XP : la
 * prop `xpAwarded` et son « +N XP » sont retirés le 2026-09-24 (arbitrage
 * n°18 — pas d'XP dans l'app apprenant, jamais à côté d'un niveau).
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
  iterationCount,
  className = '',
}) => {
  const etat = ETATS[status];

  return (
    <div className={`flex flex-wrap items-center gap-stack-xs ${className}`}>
      {/* Le mot de l'état s'affiche (2026-09-24). La pastille ne montrait que
          l'icône, le mot n'était que son nom accessible : à l'œil, un état
          ne se lisait qu'à la couleur et au dessin — un cercle vide pour
          « en attente », une flèche de lecture pour « en cours de révision »,
          deux icônes qu'on ne devine pas. La couleur n'est jamais le seul
          vecteur du sens (PRODUCT.md, Accessibilité). */}
      <StatusBadge status={etat.icone} label={etat.libelle} showLabel />

      {/* Valeur 16/600 ink-900 · méta 13 ink-600 · texte de marque au cran 800
          (passe typographique du 2026-09-24). */}
      {competenceLabel && (
        <span className="text-body font-semibold text-ink-900">
          {competenceLabel}
        </span>
      )}

      {iterationCount !== undefined && (
        <span className="text-caption text-ink-600 tabular-nums">
          Itération {iterationCount}
        </span>
      )}
    </div>
  );
};
