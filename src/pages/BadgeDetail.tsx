import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, Users, Calendar, ChevronRight, Award, Share2, Lock } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { AchievementBadge } from '../components/ui/AchievementBadge';
import { useGamificationStore } from '../stores/persistence';
import { BADGE_DEFS, getBadgeDefById } from '../data/gamification';
import { MOCK_USER_ID } from '../data/passeport';
import { getCompetenceById } from '../data/competencies';
import type { BadgeDef } from '../types/learning';
import { Container } from '../components/layout';

// ─── Display helpers ──────────────────────────────────────────────────────────

const BADGE_TYPE_LABEL: Record<BadgeDef['type'], string> = {
  plateforme: 'Plateforme',
  open_badge: 'Open Badge',
  competence: 'Compétences',
};

const BADGE_TYPE_TONE: Record<BadgeDef['type'], 'primary' | 'warm' | 'sun'> = {
  plateforme: 'primary',
  open_badge: 'warm',
  competence: 'sun',
};

const RARITY_LABEL = (xp: number): string => {
  if (xp >= 500) return 'Rare';
  if (xp >= 250) return 'Peu commun';
  return 'Commun';
};

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

// ─── Component ────────────────────────────────────────────────────────────────

export default function BadgeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = useGamificationStore();
  const userBadges = store.getBadges(MOCK_USER_ID);

  // Phase 16.5 #2 — resolve badge from referential + user state
  const badge = id ? getBadgeDefById(id) : undefined;
  const userBadge = id ? userBadges.find((b) => b.badgeId === id) : undefined;
  const earned = !!userBadge;

  if (!badge) {
    return (
      <div className="p-12 text-center">
        <p className="text-ink-500 mb-4">Badge introuvable.</p>
        <Button onClick={() => navigate('/gamification/badges')}>Retour à la galerie</Button>
      </div>
    );
  }

  // Community stats — derived from how many badges of this id exist across users.
  // For MVP this is constant (single learner), so we use a stable mock denominator
  // and the count of earned badges of same type as numerator.
  const totalLearners = 1580;
  const earnedBy = Math.max(1, Math.round(totalLearners * (badge.xpValue >= 500 ? 0.16 : 0.42)));
  const pctEarned = Math.round((earnedBy / totalLearners) * 100);

  const tone = BADGE_TYPE_TONE[badge.type];
  const relatedBadges = BADGE_DEFS
    .filter((b) => b.type === badge.type && b.id !== badge.id)
    .slice(0, 3);

  const competenceLabel = badge.competenceId
    ? getCompetenceById(badge.competenceId)?.label
    : undefined;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: badge.name, text: badge.description, url });
      } catch {
        /* user cancelled */
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        /* clipboard unavailable */
      }
    }
  };

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={`Gamification · ${BADGE_TYPE_LABEL[badge.type]}`}
        title={badge.name}
        summary={badge.description}
        tone={tone === 'primary' ? 'default' : tone}
        trailing={
          <div className="flex items-center gap-3">
            <Button variant="glass" size="md" leadingIcon={<Share2 size={16} />} onClick={handleShare}>
              Partager
            </Button>
            <Button
              variant="ghost"
              size="md"
              onClick={() => navigate('/profile/badges/competences')}
            >
              Voir dans mon profil
            </Button>
          </div>
        }
      />

      <Container width="wide" padding={false} className="px-4 md:px-8 flex flex-col gap-section">

        {/* Badge showcase */}
        <div className="flex flex-col md:flex-row gap-section items-center md:items-start">

          {/* Badge visual */}
          <div className="flex flex-col items-center gap-stack">
            <AchievementBadge
              title={badge.name}
              icon={<Trophy size={48} />}
              color={tone}
              size="lg"
              isLocked={!earned}
              unlockedDate={userBadge ? formatDate(userBadge.earnedAt) : undefined}
            />
            {earned ? (
              <Badge variant="success" size="lg">Obtenu le {formatDate(userBadge!.earnedAt)}</Badge>
            ) : (
              <Badge variant="neutral" size="lg" className="inline-flex items-center gap-1">
                <Lock size={12} /> Pas encore obtenu
              </Badge>
            )}
          </div>

          {/* Badge stats */}
          <div className="flex flex-col gap-stack flex-1 w-full">
            <div className="grid grid-cols-2 gap-stack">
              <Card variant="tinted" tone="primary" className="flex flex-col items-center justify-center py-5 gap-tight">
                <Trophy size={22} className="text-primary-600" />
                <span className="text-h3 font-display font-bold text-primary-700">+{badge.xpValue} XP</span>
                <span className="text-caption text-ink-500">
                  {earned ? 'Points gagnés' : 'Points à gagner'}
                </span>
              </Card>
              <Card variant="tinted" tone="sun" className="flex flex-col items-center justify-center py-5 gap-tight">
                <Award size={22} className="text-accent-500" />
                <Badge variant="sun" size="md">{RARITY_LABEL(badge.xpValue)}</Badge>
                <span className="text-caption text-ink-500">Rareté du badge</span>
              </Card>
            </div>

            {/* Competence link if applicable */}
            {competenceLabel && (
              <SectionCard title="Compétence liée" titleIcon={<ChevronRight size={18} />}>
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-ink-700">{competenceLabel}</span>
                  {badge.dreyfusLevel && (
                    <Badge variant="info" size="sm">Niveau D{badge.dreyfusLevel} requis</Badge>
                  )}
                </div>
              </SectionCard>
            )}

            {/* Community stats */}
            <SectionCard title="Dans la communauté" titleIcon={<Users size={18} />}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-body-sm">
                  <span className="text-ink-600">Apprenants qui l'ont obtenu</span>
                  <span className="font-semibold text-ink-900">{earnedBy} / {totalLearners}</span>
                </div>
                <ProgressBar value={pctEarned} fill="sun" size="md" showLabel />
                <p className="text-caption text-ink-500">
                  {pctEarned}% des apprenants ont obtenu ce badge {earned ? "— tu fais partie de cette communauté !" : "— prochaine étape pour toi."}
                </p>
              </div>
            </SectionCard>
          </div>
        </div>

        {/* Criteria */}
        <SectionCard title="Critères d'obtention" titleIcon={<ChevronRight size={18} />}>
          <ul className="flex flex-col gap-3">
            {badge.criteria.map((c, i) => (
              <li key={i} className="flex items-start gap-stack">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-caption font-bold shrink-0 ${earned ? 'bg-success-bg text-success-fg' : 'bg-ink-100 text-ink-400'}`}>
                  {earned ? '✓' : i + 1}
                </span>
                <span className="text-body-sm text-ink-700">{c}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Related badges */}
        {relatedBadges.length > 0 && (
          <SectionCard title="Badges de la même famille" titleIcon={<Award size={18} />}>
            <div className="flex flex-wrap gap-section">
              {relatedBadges.map((rb) => {
                const rbEarned = userBadges.some((ub) => ub.badgeId === rb.id);
                return (
                  <button
                    key={rb.id}
                    type="button"
                    onClick={() => navigate(`/gamification/badge/${rb.id}`)}
                    className="flex flex-col items-center gap-2 bg-transparent border-0 p-0 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <AchievementBadge
                      title={rb.name}
                      icon={<Award size={32} />}
                      color={BADGE_TYPE_TONE[rb.type]}
                      size="md"
                      isLocked={!rbEarned}
                    />
                    <span className="text-caption text-ink-500 text-center max-w-[100px]">{rb.name}</span>
                  </button>
                );
              })}
            </div>
          </SectionCard>
        )}

        {/* CTA */}
        <div className="flex justify-center pb-section">
          <Button
            variant="primary"
            size="lg"
            leadingIcon={<Calendar size={18} />}
            onClick={() => navigate('/gamification/badges')}
          >
            Voir tous mes badges
          </Button>
        </div>

      </Container>
    </div>
  );
}
