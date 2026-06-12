import React from 'react';
import { Card } from '../core/Card';
import { Badge } from '../ui/Badge';
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
  3: 'bg-gradient-to-br from-secondary-400 to-secondary-600 text-white shadow-md ring-4 ring-secondary-100',
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
  const badgeVariant: BadgeVariant =
    rank === 1 ? 'sun' : rank === 2 ? 'warm' : variant || 'neutral';

  const isPodium = rank <= 3;

  return (
    <Card
      className={['group flex items-center gap-stack transition-all duration-slow ease-emphasis hover:-translate-y-1 hover:shadow-md hover-glow-primary', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={[
          'inline-flex items-center justify-center w-12 h-12 rounded-2xl font-display font-extrabold text-h4 shrink-0',
          RANK_BG[rank] ?? DEFAULT_RANK_BG,
        ].join(' ')}
      >
        {isPodium ? <MedalIcon size={22} /> : `#${rank}`}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="m-0 text-body font-semibold text-ink-900 truncate">{name}</h3>
        <div className="flex items-center gap-stack-xs mt-1 flex-wrap">
          <span className="inline-flex items-center gap-tight text-caption font-bold text-primary-700">
            <Trophy size={12} />
            {points} pts
          </span>
          {streak !== undefined && (
            <span className="inline-flex items-center gap-tight text-caption text-secondary-600 font-medium">
              <Flame size={12} />
              {streak}j
            </span>
          )}
        </div>
      </div>

      <Badge variant={badgeVariant}>{points} pts</Badge>

      {onViewProfile && (
        <Button size="sm" variant="ghost" onClick={onViewProfile} className="shrink-0">
          Voir
        </Button>
      )}
    </Card>
  );
};

export default RankingCard;
