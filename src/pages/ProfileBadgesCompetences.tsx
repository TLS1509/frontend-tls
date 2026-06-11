import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { AchievementBadge } from '../components/ui/AchievementBadge';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { FilterChip } from '../components/ui/FilterChip';
import { EmptyState } from '../components/ui/EmptyState';
import { useGamificationStore, usePasseportStore } from '../stores/persistence';
import { BADGE_DEFS } from '../data/gamification';
import { MOCK_USER_ID } from '../data/passeport';
import { getCompetenceById } from '../data/competencies';
import type { BadgeDef } from '../types/learning';
import { Container } from '../components/layout';

// ─── Display helpers ──────────────────────────────────────────────────────────

const BADGE_TONE_BY_TYPE: Record<BadgeDef['type'], 'primary' | 'warm' | 'sun'> = {
  plateforme: 'primary',
  open_badge: 'warm',
  competence: 'sun',
};

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProfileBadgesCompetences() {
  const navigate = useNavigate();
  const gamificationStore = useGamificationStore();
  const passeportStore = usePasseportStore();

  const userBadges = gamificationStore.getBadges(MOCK_USER_ID);
  const competencies = passeportStore.getCompetencies(MOCK_USER_ID);

  // Filter to badges with competenceId : this page is competency-focused.
  // (Platform/open-badges are shown in /gamification/badges instead.)
  const competenceBadgeDefs = useMemo(
    () => BADGE_DEFS.filter((b) => b.competenceId !== undefined),
    [],
  );

  // Build display rows : earned flag from userBadges, sorted by earned-first then category.
  const enrichedBadges = useMemo(() => {
    return competenceBadgeDefs.map((def) => {
      const earned = userBadges.find((ub) => ub.badgeId === def.id);
      const competence = def.competenceId ? getCompetenceById(def.competenceId) : undefined;
      return {
        def,
        competenceLabel: competence?.label ?? def.competenceId ?? ':',
        category: competence?.label ?? 'Autres',
        earned: !!earned,
        earnedDate: earned ? formatDate(earned.earnedAt) : null,
        tone: BADGE_TONE_BY_TYPE[def.type],
      };
    });
  }, [competenceBadgeDefs, userBadges]);

  const categories = useMemo(() => {
    const set = new Set<string>(['Tous']);
    enrichedBadges.forEach((b) => set.add(b.category));
    return Array.from(set);
  }, [enrichedBadges]);

  const [activeCategory, setActiveCategory] = useState('Tous');
  const [showEarned, setShowEarned] = useState<'all' | 'earned' | 'locked'>('all');

  const earnedCount = enrichedBadges.filter((b) => b.earned).length;

  const filtered = enrichedBadges.filter((b) => {
    const matchCat = activeCategory === 'Tous' || b.category === activeCategory;
    const matchEarned =
      showEarned === 'all' ||
      (showEarned === 'earned' && b.earned) ||
      (showEarned === 'locked' && !b.earned);
    return matchCat && matchEarned;
  });

  // Radar derived from live competencies (top 6).
  const radarAxes = useMemo(() => {
    return competencies.slice(0, 6).map((c) => {
      const def = getCompetenceById(c.competenceId);
      return {
        label: def?.label ?? c.competenceId,
        current: c.currentLevel,
        target: c.targetLevel ?? c.currentLevel,
      };
    });
  }, [competencies]);

  // Progress par category : earned / total badges per competence label.
  const progressByCategory = useMemo(() => {
    const map = new Map<string, { earned: number; total: number }>();
    enrichedBadges.forEach((b) => {
      const prev = map.get(b.category) ?? { earned: 0, total: 0 };
      map.set(b.category, { earned: prev.earned + (b.earned ? 1 : 0), total: prev.total + 1 });
    });
    return Array.from(map.entries()).map(([cat, v]) => ({
      cat,
      earned: v.earned,
      total: v.total,
      pct: Math.round((v.earned / Math.max(v.total, 1)) * 100),
    }));
  }, [enrichedBadges]);

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Profil · Badges Compétences"
        title="Mes Badges Dreyfus"
        summary={`${earnedCount} badges obtenus sur ${enrichedBadges.length}. Chaque badge atteste d'un niveau Dreyfus validé dans une compétence.`}
        tone="sun"
        trailing={
          <Button variant="glass" size="md" leadingIcon={<Award size={16} />}>
            Partager mon profil
          </Button>
        }
      />

      <Container width="wide" padding={false} className="px-4 md:px-8 flex flex-col gap-section">

        {/* Radar overview */}
        <div className="grid md:grid-cols-2 gap-section">
          <SectionCard title="Mon Radar Compétences" titleIcon={<Award size={18} />}>
            {radarAxes.length > 0 ? (
              <CompetencyRadar axes={radarAxes} size="md" showLegend />
            ) : (
              <EmptyState
                icon={<Award size={32} />}
                title="Radar vide"
                description="Complète le questionnaire de positionnement pour activer ton radar."
              />
            )}
          </SectionCard>

          <SectionCard title="Progression badges" titleIcon={<Award size={18} />}>
            <div className="flex flex-col gap-3">
              {progressByCategory.length === 0 ? (
                <p className="text-caption text-ink-400">Aucun badge compétence pour l'instant.</p>
              ) : (
                progressByCategory.map(({ cat, earned, total, pct }) => (
                  <div key={cat} className="flex items-center gap-stack">
                    <span className="text-caption text-ink-600 w-28 shrink-0 truncate">{cat}</span>
                    <div className="flex-1 h-2 bg-ink-100 rounded-pill overflow-hidden">
                      <div
                        className="h-full bg-accent-400 rounded-pill transition-all duration-slow"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-caption font-semibold text-ink-700 w-12 text-right">{earned}/{total}</span>
                  </div>
                ))
              )}
            </div>
          </SectionCard>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {(['all', 'earned', 'locked'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setShowEarned(v)}
                className={[
                  'px-3 py-1.5 text-caption font-semibold rounded-pill transition-colors duration-fast',
                  showEarned === v ? 'bg-accent-400 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200',
                ].join(' ')}
              >
                {v === 'all' ? 'Tous' : v === 'earned' ? 'Obtenus' : 'À débloquer'}
              </button>
            ))}
          </div>
        </div>

        {/* Badges grid */}
        <SectionCard
          title={`${filtered.length} badge${filtered.length !== 1 ? 's' : ''}`}
          titleIcon={<Award size={18} />}
        >
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Award size={32} />}
              title="Aucun badge trouvé"
              description="Change les filtres pour voir d'autres badges."
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-section">
              {filtered.map((b) => (
                <button
                  key={b.def.id}
                  type="button"
                  onClick={() => navigate(`/gamification/badge/${b.def.id}`)}
                  className="flex flex-col items-center gap-2 bg-transparent border-0 p-0 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <AchievementBadge
                    title={b.def.name}
                    icon={<Award size={20} />}
                    color={b.tone}
                    size="md"
                    isLocked={!b.earned}
                  />
                  <div className="flex flex-col items-center gap-tight text-center">
                    <span className="text-caption font-semibold text-ink-800 line-clamp-2 leading-tight">{b.def.name}</span>
                    {b.earnedDate && <span className="text-micro text-ink-400">{b.earnedDate}</span>}
                    {!b.earned && b.def.dreyfusLevel && (
                      <Badge variant="info" size="sm">D{b.def.dreyfusLevel} requis</Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </SectionCard>

      </Container>
    </div>
  );
}
