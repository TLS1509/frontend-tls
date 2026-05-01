/**
 * RankingCard
 *
 * Card component for displaying ranking/leaderboard entries.
 * Shows rank, name, points, streak and actions.
 * Uses only design tokens and TLS components.
 *
 * Usage:
 * <RankingCard
 *   rank={1}
 *   name="Sophie Martin"
 *   points={1240}
 *   streak={18}
 *   onViewProfile={() => navigate(`/profile/${id}`)}
 * />
 */

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
  // Top 3 ranks get special badge variants
  const badgeVariant: BadgeVariant = rank === 1 ? 'sun' : rank === 2 ? 'warm' : variant || 'neutral';

  return (
    <Card className={`tls-section-card ${className}`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
        {/* Header with rank and name */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={{ margin: 0, fontSize: 'var(--t-body)', fontWeight: 600 }}>
            #{rank} {name}
          </h3>
          <Badge variant={badgeVariant}>{points} pts</Badge>
        </div>

        {/* Streak badge if available */}
        {streak !== undefined && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-1)',
              padding: 'var(--s-2) var(--s-3)',
              borderRadius: 'var(--r-md)',
              background: 'var(--surface-muted)',
              color: 'var(--text-muted)',
              fontSize: 'var(--t-caption)',
              fontWeight: 500,
              width: 'fit-content',
            }}
          >
            <Target size={14} /> Streak {streak} jours
          </div>
        )}

        {/* Action button */}
        {onViewProfile && (
          <div style={{ display: 'flex', gap: 'var(--s-2)', paddingTop: 'var(--s-2)' }}>
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
