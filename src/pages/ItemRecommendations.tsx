import React from 'react';
import { Lightbulb, BookOpen, Video, ArrowRight, EyeOff } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { MetaPill } from '../components/ui/MetaPill';
import { Avatar } from '../components/ui/Avatar';
import { PageShell } from '../components/layout';
import { useCoachingStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { MOCK_COACH } from '../data/coaching';
import type { CoachRecommendationType } from '../types/learning';

/* Le type de contenu est une donnée (arbitrages n°14-15) : une MetaPill avec
   son icône, plus une pastille d'icône de 48 px qui ouvrait un second bord
   gauche dans chaque carte. */
const TYPE: Record<CoachRecommendationType, { icon: typeof BookOpen; label: string }> = {
  article: { icon: BookOpen, label: 'Article' },
  video: { icon: Video, label: 'Vidéo' },
  lesson: { icon: Lightbulb, label: 'Leçon' },
};

/* Le coach qui recommande : celui des données, plus un prénom écrit en dur
   (« Marie ») à côté de l'avatar d'une autre personne. */
const COACH_PRENOM = MOCK_COACH.name.split(' ')[0];

const ItemRecommendations: React.FC = () => {
  const coachingStore = useCoachingStore();
  const recommendations = coachingStore
    .getRecommendations(MOCK_USER_ID)
    .filter((r) => !r.dismissed);

  return (
    /* Un seul bord gauche : l'en-tête et la liste vivent dans la même colonne
       (la liste était centrée, 180 px à droite du titre), et la page n'a plus
       de fond blanc arrêté à 900 px. Un seul en-tête de section : « 3
       recommandations actives » puis « À consulter en priorité » se suivaient. */
    <PageShell width="content" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow="Coaching · Recommandations"
        title="Tes recommandations du coach"
        summary={`Contenus sélectionnés spécifiquement pour toi par ${COACH_PRENOM}.`}
        tone="flat"
      />

      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="À consulter en priorité"
          subtitle="Triés par pertinence pour tes objectifs en cours."
          meta={`${recommendations.length} recommandation${recommendations.length > 1 ? 's' : ''} active${recommendations.length > 1 ? 's' : ''} · mises à jour au fil de tes sessions`}
          size="md"
        />

        {recommendations.length === 0 ? (
          <p className="text-body text-ink-700 max-w-prose">
            Aucune recommandation active. Tu as masqué toutes les suggestions de ton coach : elles
            reviendront au fil de tes prochaines sessions.
          </p>
        ) : (
          /* Chaque recommandation est un objet qu'on choisit : une carte, sans
             carte de section autour. Anatomie : méta (type, compétence, durée,
             date) → 4 → titre h3 20 → 12 → le mot du coach → 24 → actions. */
          <div className="flex flex-col gap-stack-sm">
            {recommendations.map((r) => {
              const type = TYPE[r.type];
              const Icon = type.icon;
              return (
                <Card key={r.id} className="flex flex-col gap-0">
                  <div className="flex items-center gap-stack-xs flex-wrap">
                    <MetaPill icon={<Icon />} text={type.label} tone="primary" />
                    <MetaPill text={r.competence} />
                    <MetaPill text={r.duration} />
                    <span className="text-caption text-ink-600">{r.date}</span>
                  </div>
                  <h3 className="mt-stack-3xs font-display text-h3 text-ink-900">{r.title}</h3>

                  <figure className="mt-stack-sm flex items-start gap-stack-xs p-stack-sm rounded-lg bg-secondary-50/70">
                    <Avatar initials={r.coachInitials} size="sm" />
                    <div className="flex-1 flex flex-col gap-stack-3xs min-w-0">
                      <figcaption className="text-caption font-semibold text-ink-600">{COACH_PRENOM} écrit :</figcaption>
                      <blockquote className="text-body italic text-ink-700 max-w-prose">{r.reason}</blockquote>
                    </div>
                  </figure>

                  {/* L'action de la carte (Découvrir) en `soft` ; écarter une
                      recommandation est un outil, en `ghost` neutre
                      (arbitrage n°19). */}
                  <div className="mt-stack-lg flex flex-wrap items-center gap-stack-xs">
                    <Button emphasis="soft" tone="brand" size="sm" trailingIcon={<ArrowRight className="w-4 h-4" />}>
                      Découvrir
                    </Button>
                    <Button
                      emphasis="ghost"
                      tone="neutral"
                      size="sm"
                      leadingIcon={<EyeOff className="w-4 h-4" />}
                      onClick={() => coachingStore.dismissRecommendation(MOCK_USER_ID, r.id)}
                    >
                      Masquer
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </PageShell>
  );
};

export default ItemRecommendations;
