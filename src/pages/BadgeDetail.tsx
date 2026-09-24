import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, Calendar, Award, Share2, Lock } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { EmptyState } from '../components/ui/EmptyState';
import { ProgressBar } from '../components/ui/ProgressBar';
import { AchievementBadge } from '../components/ui/AchievementBadge';
import { useGamificationStore } from '../stores/persistence';
import { BADGE_DEFS, getBadgeDefById } from '../data/gamification';
import { MOCK_USER_ID } from '../data/passeport';
import { getCompetenceById } from '../data/competencies';
import type { BadgeDef } from '../types/learning';
import { PageShell } from '../components/layout';

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

  // Phase 16.5 #2 : resolve badge from referential + user state
  const badge = id ? getBadgeDefById(id) : undefined;
  const userBadge = id ? userBadges.find((b) => b.badgeId === id) : undefined;
  const earned = !!userBadge;

  if (!badge) {
    /* L'état vide du système, dans la coque de la page : il tenait en une
       ligne ink-500 au-dessus d'un bouton. */
    return (
      <PageShell width="content">
        <EmptyState
          icon={<Award size={32} />}
          title="Badge introuvable."
          actions={<Button onClick={() => navigate('/gamification/badges')}>Retour à la galerie</Button>}
        />
      </PageShell>
    );
  }

  // Community stats : derived from how many badges of this id exist across users.
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
    /* En-tête `flat` : encadré ou saturé selon le type de badge, son h1
       partait 33 px à droite du bord des sections. Le bouton « Partager »
       quitte `onDark` : il n'y a plus de fond sombre sous lui. Mots et ordre
       des blocs inchangés (arbitrage n°18 en cours). */
    <PageShell width="wide">
      <EditorialHero
        eyebrow={`Gamification · ${BADGE_TYPE_LABEL[badge.type]}`}
        title={badge.name}
        summary={badge.description}
        tone="flat"
        trailing={
          <div className="flex flex-wrap items-center gap-stack-xs">
            <Button emphasis="soft" size="md" leadingIcon={<Share2 size={16} />} onClick={handleShare}>
              Partager
            </Button>
            <Button
              emphasis="outline"
              size="md"
              onClick={() => navigate('/profile/badges/competences')}
            >
              Voir dans mon profil
            </Button>
          </div>
        }
      />

        {/* Badge showcase */}
        <div className="flex flex-col md:flex-row gap-section items-center md:items-start">

          {/* Badge visual — l'obtention est dite sous le badge, en MetaPill :
              elle criait en Badge capitales la date que le badge affiche déjà. */}
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
              <MetaPill text={`Obtenu le ${formatDate(userBadge!.earnedAt)}`} tone="success" />
            ) : (
              <MetaPill icon={<Lock size={14} />} text="Pas encore obtenu" tone="neutral" />
            )}
          </div>

          {/* Badge stats — valeur → libellé 4 ; la valeur à l'encre du cran 800
              (la marque ne porte de texte qu'à ce cran), le libellé en légende
              ink-600, la rareté en MetaPill (une donnée). Les blocs de la
              colonne sont des sections : leur titre (h2 28) sur la page. */}
          <div className="flex flex-col gap-page flex-1 w-full">
            <div className="grid grid-cols-2 gap-stack">
              <Card variant="tinted" tone="primary" className="flex flex-col items-center justify-center py-stack-md gap-stack-3xs">
                <Trophy size={20} className="text-primary-700 mb-stack-3xs" aria-hidden="true" />
                <span className="text-h3 font-display text-primary-800 tabular-nums">+{badge.xpValue} XP</span>
                <span className="text-caption text-ink-600">
                  {earned ? 'Points gagnés' : 'Points à gagner'}
                </span>
              </Card>
              <Card variant="tinted" tone="sun" className="flex flex-col items-center justify-center py-stack-md gap-stack-3xs">
                <Award size={20} className="text-accent-700 mb-stack-3xs" aria-hidden="true" />
                <MetaPill text={RARITY_LABEL(badge.xpValue)} tone="sun" />
                <span className="text-caption text-ink-600">Rareté du badge</span>
              </Card>
            </div>

            {/* Competence link if applicable */}
            {competenceLabel && (
              <section className="flex flex-col gap-stack">
                <SectionHeader title="Compétence liée" />
                <Card className="flex flex-row items-center justify-between gap-stack">
                  <span className="text-body text-ink-900">{competenceLabel}</span>
                  {badge.dreyfusLevel && (
                    <Badge variant="info" size="compact">Niveau D{badge.dreyfusLevel} requis</Badge>
                  )}
                </Card>
              </section>
            )}

            {/* Community stats — l'étiquette et sa valeur sur la même ligne de
                base, la valeur en chiffres tabulaires ; la note en légende
                ink-600. */}
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Dans la communauté" />
              <Card className="flex flex-col gap-stack-xs">
                <div className="flex items-baseline justify-between gap-stack text-body">
                  <span className="text-ink-700">Apprenants qui l'ont obtenu</span>
                  <span className="font-semibold text-ink-900 tabular-nums">{earnedBy} / {totalLearners}</span>
                </div>
                <ProgressBar value={pctEarned} fill="sun" size="md" showLabel />
                <p className="text-caption text-ink-600">
                  {pctEarned}% des apprenants ont obtenu ce badge {earned ? ": tu fais partie de cette communauté." : ": prochaine étape pour toi."}
                </p>
              </Card>
            </section>
          </div>
        </div>

        {/* Criteria — chaque critère est le contenu principal (ink-900). */}
        <section className="flex flex-col gap-stack">
          <SectionHeader title="Critères d'obtention" />
          <Card>
            <ul className="flex flex-col gap-stack-xs">
              {badge.criteria.map((c, i) => (
                <li key={i} className="flex items-start gap-stack-sm">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-pill text-caption font-bold tabular-nums shrink-0 mt-px ${earned ? 'bg-success-bg text-success-fg' : 'bg-ink-100 text-ink-700'}`}>
                    {earned ? '✓' : i + 1}
                  </span>
                  <span className="text-body text-ink-900">{c}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Related badges — des objets qu'on choisit : sans carte autour, 16
            entre eux (ils étaient à 32). */}
        {relatedBadges.length > 0 && (
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Badges de la même famille" />
            <div className="flex flex-wrap gap-stack">
              {relatedBadges.map((rb) => {
                const rbEarned = userBadges.some((ub) => ub.badgeId === rb.id);
                return (
                  <button
                    key={rb.id}
                    type="button"
                    onClick={() => navigate(`/gamification/badge/${rb.id}`)}
                    className="flex flex-col items-center gap-stack-xs bg-transparent border-0 p-0 cursor-pointer hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
                  >
                    <AchievementBadge
                      title={rb.name}
                      icon={<Award size={32} />}
                      color={BADGE_TYPE_TONE[rb.type]}
                      size="md"
                      isLocked={!rbEarned}
                    />
                    <span className="text-caption text-ink-600 text-center max-w-[100px]">{rb.name}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* CTA — sur le bord gauche, comme le reste de la page (il était
            centré) ; la coque pose la marge du bas. */}
        <div className="flex">
          <Button
            emphasis="soft"
            size="lg"
            leadingIcon={<Calendar size={18} />}
            onClick={() => navigate('/gamification/badges')}
          >
            Voir tous mes badges
          </Button>
        </div>

    </PageShell>
  );
}
