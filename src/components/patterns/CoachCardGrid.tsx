import React from 'react';
import { GRID_CONTAINER, GRID_COLS_CONTENT } from '../../lib/grid-columns';
import { Users } from 'lucide-react';
import { ProfileCard } from '../ui/ProfileCard';
import { IconChip } from '../ui/IconChip';
import { Badge } from '../ui/Badge';
import { MetaPillGroup } from '../ui/MetaPillGroup';
import type { ProfileCardVariant } from '../ui/ProfileCard';

export interface CoachItem {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
  specialties?: string[];
  availability?: boolean;
  variant?: ProfileCardVariant;
  onBookClick?: () => void;
  ctaLabel?: string;
}

export interface CoachCardGridProps {
  coaches: CoachItem[];
  columns?: 1 | 2 | 3 | 4;
  specialtyFilter?: string;
  availabilityFilter?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
  onCoachSelect?: (id: string) => void;
  className?: string;
}

/* Colonnage : src/lib/grid-columns.ts — source unique, en largeur de conteneur. */
const COLS = GRID_COLS_CONTENT;

export const CoachCardGrid: React.FC<CoachCardGridProps> = ({
  coaches,
  columns = 3,
  specialtyFilter,
  availabilityFilter,
  isLoading = false,
  emptyMessage = 'Aucun coach disponible',
  onCoachSelect,
  className = '',
}) => {
  const filteredCoaches = React.useMemo(() => {
    return coaches.filter((coach) => {
      if (specialtyFilter && !coach.specialties?.includes(specialtyFilter)) {
        return false;
      }
      if (availabilityFilter && !coach.availability) {
        return false;
      }
      return true;
    });
  }, [coaches, specialtyFilter, availabilityFilter]);

  if (isLoading) {
    return (
      <div className={['flex items-center justify-center p-12', className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center gap-stack-xs text-ink-500">
          <div className="w-10 h-10 rounded-pill border-[3px] border-ink-200 border-t-primary-500 animate-spin" />
          <p className="m-0 text-body text-ink-600">Chargement des coachs…</p>
        </div>
      </div>
    );
  }

  if (!filteredCoaches || filteredCoaches.length === 0) {
    return (
      <div className={['flex items-center justify-center p-12 rounded-lg bg-ink-50/50 border border-dashed border-ink-200', className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center gap-stack-xs text-ink-500 text-center">
          <IconChip size="lg" tone="neutral">
            <Users strokeWidth={2} />
          </IconChip>
          <p className="m-0 text-body font-semibold text-ink-900">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={GRID_CONTAINER}>
    <div className={['grid gap-stack', COLS[columns], className].filter(Boolean).join(' ')} role="grid">
      {filteredCoaches.map((coach) => (
        <div key={coach.id} role="gridcell" className="flex flex-col gap-stack-xs group">
          <div
            {...(onCoachSelect && {
              role: 'button',
              tabIndex: 0,
              'aria-label': `Voir le profil de ${coach.name}`,
              onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                // Le guard laisse le CTA "Réserver" imbriqué se gérer seul.
                if (!(e.target as HTMLElement).closest('button, a')) onCoachSelect(coach.id);
              },
              onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onCoachSelect(coach.id);
                }
              },
            })}
            className="block w-full h-auto p-0 overflow-visible cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            <ProfileCard
              name={coach.name}
              role={coach.role}
              avatar={coach.avatar}
              bio={coach.bio}
              variant={coach.variant || 'default'}
              cta={
                coach.onBookClick
                  ? {
                      label: coach.ctaLabel || 'Réserver une session',
                      onClick: coach.onBookClick,
                      emphasis: 'soft' as const,
                    }
                  : undefined
              }
            />
          </div>

          {coach.specialties && coach.specialties.length > 0 && (
            <MetaPillGroup
              className="justify-center px-2"
              items={coach.specialties.map((specialty) => ({ text: specialty, tone: 'primary' as const }))}
            />
          )}

          {coach.availability !== undefined && (
            <Badge variant={coach.availability ? 'success' : 'neutral'} dot className="mx-auto">
              {coach.availability ? 'Disponible' : 'Non disponible'}
            </Badge>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default CoachCardGrid;
