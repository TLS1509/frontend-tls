import React from 'react';
import { Lightbulb, BookOpen, Video, ArrowRight, EyeOff } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Container } from '../components/layout';
import { useCoachingStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import type { CoachRecommendationType } from '../types/learning';

const TYPE_ICON: Record<CoachRecommendationType, typeof BookOpen> = {
  article: BookOpen,
  video: Video,
  lesson: Lightbulb,
};

const ItemRecommendations: React.FC = () => {
  const coachingStore = useCoachingStore();
  const recommendations = coachingStore
    .getRecommendations(MOCK_USER_ID)
    .filter((r) => !r.dismissed);

  return (
    <div className="min-h-[100dvh] bg-surface">
      <EditorialHero
        eyebrow="Coaching · Recommandations"
        title="Tes recommandations du coach"
        summary="Items sélectionnés spécifiquement pour toi par Marie"
        tone="flat"
      />

      <Container width="content" padding={false} className="px-stack py-section flex flex-col gap-section">
        <div className="flex items-center justify-between gap-stack">
          <div>
            <div className="text-h4 font-semibold">{recommendations.length} recommandation{recommendations.length > 1 ? 's' : ''} active{recommendations.length > 1 ? 's' : ''}</div>
            <div className="text-caption text-ink-500 mt-1">Mises à jour au fil de tes sessions de coaching</div>
          </div>
        </div>

        {recommendations.length === 0 ? (
          <SectionCard title="À consulter en priorité" description="Triés par pertinence pour tes objectifs en cours">
            <p className="text-body-sm text-ink-500">
              Aucune recommandation active. Tu as masqué toutes les suggestions de ton coach — elles
              reviendront au fil de tes prochaines sessions.
            </p>
          </SectionCard>
        ) : (
        <SectionCard title="À consulter en priorité" description="Triés par pertinence pour tes objectifs en cours">
          <div className="flex flex-col gap-stack">
            {recommendations.map((r) => {
              const Icon = TYPE_ICON[r.type];
              return (
                <Card key={r.id} className="p-stack-lg">
                  <div className="flex items-start gap-stack">
                    <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-stack-xs mb-stack-xs flex-wrap">
                        <Badge variant="brand">{r.competence}</Badge>
                        <Badge variant="neutral">{r.duration}</Badge>
                        <span className="text-caption text-ink-500">{r.date}</span>
                      </div>
                      <h3 className="text-h4 font-semibold mb-stack-xs">{r.title}</h3>

                      <div className="flex items-start gap-stack-xs p-3 rounded-lg bg-secondary-50/70 mb-stack">
                        <Avatar initials={r.coachInitials} size="sm" />
                        <div className="flex-1">
                          <div className="text-caption text-ink-500 mb-1">Marie écrit :</div>
                          <p className="text-body-sm italic text-ink-700">{r.reason}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-stack-xs">
                        <Button variant="primary" size="sm" trailingIcon={<ArrowRight className="w-4 h-4" />}>
                          Découvrir
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          leadingIcon={<EyeOff className="w-4 h-4" />}
                          onClick={() => coachingStore.dismissRecommendation(MOCK_USER_ID, r.id)}
                        >
                          Masquer
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </SectionCard>
        )}
      </Container>
    </div>
  );
};

export default ItemRecommendations;
