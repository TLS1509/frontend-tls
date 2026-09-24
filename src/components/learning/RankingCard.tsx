import React from 'react';
import { Card } from '../core/Card';
import { MetaPill, type MetaPillTone } from '../ui/MetaPill';
import { Button } from '../core/Button';
import { Flame, Trophy, Medal as MedalIcon } from 'lucide-react';
import type { BadgeVariant } from '../ui/Badge';

export interface RankingCardProps {
  rank: number;
  name: string;
  points: number;
  streak?: number;
  variant?: BadgeVariant;
  onViewProfile?: () => void;
  className?: string;
}

const RANK_BG: Record<number, string> = {
  1: 'bg-gradient-to-br from-accent-300 to-accent-500 text-accent-900 shadow-md ring-4 ring-accent-100',
  2: 'bg-gradient-to-br from-ink-200 to-ink-400 text-ink-900 shadow-md ring-4 ring-ink-100',
  // Podium = une icône de médaille, 3:1 : arrêt clair au 600 (3,98 ; le 400, 2,48).
  3: 'bg-gradient-to-br from-secondary-600 to-secondary-700 text-white shadow-md ring-4 ring-secondary-100',
};

const DEFAULT_RANK_BG = 'bg-ink-100 text-ink-700 ring-2 ring-ink-200';

export const RankingCard: React.FC<RankingCardProps> = ({
  rank,
  name,
  points,
  streak,
  variant,
  onViewProfile,
  className = '',
}) => {
  /* Les points sont une DONNÉE : MetaPill, plus Badge (qui ne dit que des
     états — passe typographique du 2026-09-24). Le ton reste celui du rang. */
  const pillTone: MetaPillTone =
    rank === 1 ? 'sun' : rank === 2 ? 'warm' : variant || 'neutral';

  const isPodium = rank <= 3;

  return (
    <Card
      className={['group flex flex-wrap items-center gap-stack transition-all duration-slow ease-emphasis hover-glow-primary', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={[
          'inline-flex items-center justify-center w-12 h-12 rounded-2xl font-display text-h3 shrink-0',
          RANK_BG[rank] ?? DEFAULT_RANK_BG,
        ].join(' ')}
      >
        {isPodium ? <MedalIcon size={20} /> : `#${rank}`}
      </div>

      {/* Rangée : nom 16/600 ink-900 (un libellé, plus un h3 en Nunito) ·
          méta 13 à 4 px, valeurs au cran 800 du ton, chiffres tabulaires. */}
      <div className="flex-1 basis-32 min-w-0">
        <p className="m-0 text-body font-semibold text-ink-900 truncate">{name}</p>
        <div className="flex items-center gap-stack-xs mt-stack-3xs flex-wrap">
          <span className="inline-flex items-center gap-stack-3xs text-caption font-semibold text-primary-800 tabular-nums">
            <Trophy size={14} />
            {points} pts
          </span>
          {streak !== undefined && (
            <span className="inline-flex items-center gap-stack-3xs text-caption text-secondary-800 tabular-nums">
              <Flame size={14} />
              {streak}j
            </span>
          )}
        </div>
      </div>

      <MetaPill text={`${points} pts`} tone={pillTone} />

      {onViewProfile && (
        <Button size="sm" emphasis="outline" onClick={onViewProfile} className="shrink-0">
          Voir
        </Button>
      )}
    </Card>
  );
};

export default RankingCard;
