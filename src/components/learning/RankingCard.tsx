import React from 'react';
import { Card } from '../core/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../core/Button';
import { Target, Medal } from 'lucide-react';
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

  return (
    <Card className={['tls-section-card', className].filter(Boolean).join(' ')}>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h3 className="m-0 text-body font-semibold text-ink-900">
            #{rank} {name}
          </h3>
          <Badge variant={badgeVariant}>{points} pts</Badge>
        </div>

        {streak !== undefined && (
          <div className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-ink-50 text-ink-500 text-caption font-medium w-fit">
            <Target size={14} /> Streak {streak} jours
          </div>
        )}

        {onViewProfile && (
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="secondary" onClick={onViewProfile}>
              <Medal size={14} /> Voir profil
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RankingCard;
