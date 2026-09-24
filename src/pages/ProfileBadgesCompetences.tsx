import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { AchievementBadge } from '../components/ui/AchievementBadge';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { FilterChip } from '../components/ui/FilterChip';
import { EmptyState } from '../components/ui/EmptyState';
import { useGamificationStore, usePasseportStore } from '../stores/persistence';
import { BADGE_DEFS } from '../data/gamification';
import { MOCK_USER_ID } from '../data/passeport';
import { getCompetenceById, competencyLevel } from '../data/competencies';
import type { BadgeDef } from '../types/learning';
import { PageShell } from '../components/layout';

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
        current: competencyLevel(c),
        target: c.targetLevel ?? competencyLevel(c),
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
    /* Un seul conteneur : l'en-tête collait au haut de l'écran et le corps
       partait 32 px plus à droite que le titre. Les mots et l'ordre des blocs
       ne bougent pas (arbitrage n°18 en cours) : seuls la typographie et le
       rythme changent. */
    <PageShell width="wide">
      <EditorialHero
        eyebrow="Profil · Badges Compétences"
        title="Mes Badges Dreyfus"
        summary={`${earnedCount} badges obtenus sur ${enrichedBadges.length}. Chaque badge atteste d'un niveau Dreyfus validé dans une compétence.`}
        tone="flat"
        trailing={
          <Button emphasis="soft" size="md" leadingIcon={<Award size={16} />}>
            Partager mon profil
          </Button>
        }
      />

      {/* Radar + progression : deux sections côte à côte, titre (h2 28) sur
          la page, la carte ne portant que son contenu. */}
      <div className="grid md:grid-cols-2 gap-page md:gap-section">
        <section className="flex flex-col gap-stack min-w-0">
          <SectionHeader title="Mon Radar Compétences" />
          <Card>
            {radarAxes.length > 0 ? (
              <CompetencyRadar axes={radarAxes} size="md" showLegend />
            ) : (
              <EmptyState
                icon={<Award size={32} />}
                title="Radar vide"
                description="Réponds au questionnaire de positionnement pour activer ton radar."
              />
            )}
          </Card>
        </section>

        {/* Chaque rangée : le nom de la compétence en entier, son compte sur
            la même ligne de base, la barre dessous. Le nom tenait dans 112 px
            et se coupait (« Leadership & Ma… »). */}
        <section className="flex flex-col gap-stack min-w-0">
          <SectionHeader title="Progression badges" />
          <Card>
            <div className="flex flex-col gap-stack">
              {progressByCategory.length === 0 ? (
                <p className="text-body text-ink-700">Aucun badge compétence pour l'instant.</p>
              ) : (
                progressByCategory.map(({ cat, earned, total, pct }) => (
                  <div key={cat} className="flex flex-col gap-stack-xs">
                    <div className="flex items-baseline justify-between gap-stack">
                      <span className="text-body text-ink-900 min-w-0">{cat}</span>
                      <span className="text-caption font-semibold text-ink-700 tabular-nums shrink-0">{earned}/{total}</span>
                    </div>
                    <div className="h-2 bg-ink-100 rounded-pill overflow-hidden">
                      <div
                        className="h-full bg-accent-400 rounded-pill transition-all duration-slow"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </section>
      </div>

      {/* La grille et ses filtres forment une section : les filtres suivent le
          titre à 16, la grille les filtres à 16. Le titre (le compte) sort de
          la carte qui enveloppait des cartes. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title={`${filtered.length} badge${filtered.length !== 1 ? 's' : ''}`} />

        {/* Filters */}
        <div className="flex flex-col gap-stack-xs">
          <div className="flex flex-wrap gap-stack-xs">
            {categories.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
          <div className="flex gap-stack-xs">
            {(['all', 'earned', 'locked'] as const).map((v) => (
              <FilterChip
                key={v}
                label={v === 'all' ? 'Tous' : v === 'earned' ? 'Obtenus' : 'À débloquer'}
                active={showEarned === v}
                onClick={() => setShowEarned(v)}
                tone="sun"
              />
            ))}
          </div>
        </div>

        {/* Badges grid — 16 entre deux badges, 24 entre deux rangées (chacun
            porte sa légende) : ils étaient à 32 dans les deux sens. */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Award size={32} />}
            title="Aucun badge trouvé"
            description="Change les filtres pour voir d'autres badges."
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-stack gap-y-stack-lg">
            {filtered.map((b) => (
              <button
                key={b.def.id}
                type="button"
                onClick={() => navigate(`/gamification/badge/${b.def.id}`)}
                className="flex flex-col items-center gap-stack-xs bg-transparent border-0 p-0 cursor-pointer hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
              >
                <AchievementBadge
                  title={b.def.name}
                  icon={<Award size={20} />}
                  color={b.tone}
                  size="md"
                  isLocked={!b.earned}
                />
                {/* Nom → date 4 ; la date est une légende 13 ink-600 (elle
                    était en étiquette 11 ink-500). */}
                <div className="flex flex-col items-center gap-stack-3xs text-center">
                  <span className="text-caption font-semibold text-ink-900 line-clamp-2">{b.def.name}</span>
                  {b.earnedDate && <span className="text-caption text-ink-600">{b.earnedDate}</span>}
                  {!b.earned && b.def.dreyfusLevel && (
                    <Badge variant="info" size="compact">D{b.def.dreyfusLevel} requis</Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
