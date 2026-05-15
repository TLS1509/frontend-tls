import React from 'react';
import { useParams } from 'react-router-dom';
import { Trophy, Users, Calendar, ChevronRight, Award, Share2 } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { AchievementBadge } from '../components/ui/AchievementBadge';

// ─── Mock data ────────────────────────────────────────────────────────────────

const BADGE = {
  id: 'leadership-d3',
  name: 'Leadership Compétent',
  description: 'Maîtrise du niveau D3 (Compétent) en Leadership & Management. Ce badge atteste de ta capacité à planifier, adapter et guider une équipe dans des situations standard.',
  category: 'Compétences',
  rarity: 'Rare',
  earnedDate: '15 mai 2026',
  xpValue: 500,
  earnedBy: 247,
  totalLearners: 1580,
  criteria: [
    'Compléter le parcours Leadership — Niveau Compétent',
    'Valider 3 exercices pratiques avec note ≥ 75%',
    'Obtenir l\'évaluation Dreyfus D3 de ton coach',
    'Maintenir un streak d\'activité de 7 jours consécutifs',
  ],
  relatedBadges: [
    { id: 'leadership-d2', name: 'Leadership Débutant avancé', category: 'Compétences', tone: 'primary' as const },
    { id: 'leadership-d4', name: 'Leadership Performant', category: 'Compétences', tone: 'warm' as const },
    { id: 'comm-d3', name: 'Communication Compétente', category: 'Compétences', tone: 'sun' as const },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function BadgeDetail() {
  const { id } = useParams<{ id: string }>();
  const _ = id;
  const pctEarned = Math.round((BADGE.earnedBy / BADGE.totalLearners) * 100);

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={`Gamification · ${BADGE.category}`}
        title={BADGE.name}
        summary={BADGE.description}
        tone="sun"
        trailing={
          <div className="flex items-center gap-3">
            <Button variant="glass" size="md" leadingIcon={<Share2 size={16} />}>
              Partager
            </Button>
            <Button variant="ghost" size="md">
              Voir dans mon profil
            </Button>
          </div>
        }
      />

      <div className="max-w-page mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* Badge showcase */}
        <div className="flex flex-col md:flex-row gap-section items-center md:items-start">

          {/* Badge visual */}
          <div className="flex flex-col items-center gap-stack">
            <AchievementBadge
              title={BADGE.name}
              icon={<Trophy size={48} />}
              color="sun"
              size="lg"
              isLocked={false}
              unlockedDate={BADGE.earnedDate}
            />
            <Badge variant="success" size="lg">Obtenu le {BADGE.earnedDate}</Badge>
          </div>

          {/* Badge stats */}
          <div className="flex flex-col gap-stack flex-1 w-full">
            <div className="grid grid-cols-2 gap-stack">
              <Card variant="tinted" tone="primary" className="flex flex-col items-center justify-center py-5 gap-tight">
                <Trophy size={22} className="text-primary-600" />
                <span className="text-h3 font-display font-bold text-primary-700">+{BADGE.xpValue} XP</span>
                <span className="text-caption text-ink-500">Points gagnés</span>
              </Card>
              <Card variant="tinted" tone="sun" className="flex flex-col items-center justify-center py-5 gap-tight">
                <Award size={22} className="text-accent-500" />
                <Badge variant="sun" size="md">{BADGE.rarity}</Badge>
                <span className="text-caption text-ink-500">Rareté du badge</span>
              </Card>
            </div>

            {/* Community stats */}
            <SectionCard title="Dans la communauté" titleIcon={<Users size={18} />}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-body-sm">
                  <span className="text-ink-600">Apprenants qui l'ont obtenu</span>
                  <span className="font-semibold text-ink-900">{BADGE.earnedBy} / {BADGE.totalLearners}</span>
                </div>
                <ProgressBar value={pctEarned} fill="sun" size="md" showLabel />
                <p className="text-caption text-ink-500">
                  Seulement {pctEarned}% des apprenants ont obtenu ce badge — tu fais partie d'une élite !
                </p>
              </div>
            </SectionCard>
          </div>
        </div>

        {/* Criteria */}
        <SectionCard title="Critères d'obtention" titleIcon={<ChevronRight size={18} />}>
          <ul className="flex flex-col gap-3">
            {BADGE.criteria.map((c, i) => (
              <li key={i} className="flex items-start gap-stack">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-success-bg text-success-fg text-caption font-bold shrink-0">✓</span>
                <span className="text-body-sm text-ink-700">{c}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Related badges */}
        <SectionCard title="Badges de la même famille" titleIcon={<Award size={18} />}>
          <div className="flex flex-wrap gap-stack">
            {BADGE.relatedBadges.map((rb) => (
              <div key={rb.id} className="flex flex-col items-center gap-2">
                <AchievementBadge
                  title={rb.name}
                  icon={<Award size={32} />}
                  color={rb.tone}
                  size="md"
                  isLocked={rb.id !== 'leadership-d2'}
                />
                <span className="text-caption text-ink-500 text-center max-w-[100px]">{rb.name}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* CTA */}
        <div className="flex justify-center pb-section">
          <Button variant="primary" size="lg" leadingIcon={<Calendar size={18} />}>
            Voir ma progression vers le badge suivant
          </Button>
        </div>

      </div>
    </div>
  );
}
