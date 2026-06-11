import React from 'react';
import { Lightbulb, BookOpen, Video, ArrowRight } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';
import { Container } from '../components/layout';

interface Recommendation {
  id: string;
  type: 'article' | 'video' | 'lesson';
  title: string;
  reason: string;
  coachName: string;
  coachInitials: string;
  duration: string;
  competence: string;
  date: string;
}

const RECOMMENDATIONS: Recommendation[] = [
  {
    id: '1',
    type: 'article',
    title: 'Les 7 habitudes des leaders authentiques',
    reason: 'Tu m\'as dit que tu voulais travailler ton leadership. Ce papier de Bill George est une référence pour structurer ta réflexion sur ton style personnel.',
    coachName: 'Marie Dubois',
    coachInitials: 'MD',
    duration: '15 min',
    competence: 'Leadership',
    date: 'il y a 2 jours',
  },
  {
    id: '2',
    type: 'video',
    title: 'Storytelling pour managers — Stanford GSB',
    reason: 'Suite à notre dernière session sur ta présentation Q2, ce talk va beaucoup t\'aider à structurer tes pitchs.',
    coachName: 'Marie Dubois',
    coachInitials: 'MD',
    duration: '22 min',
    competence: 'Communication',
    date: 'il y a 4 jours',
  },
  {
    id: '3',
    type: 'lesson',
    title: 'Module : Décisions sous incertitude',
    reason: 'Tu m\'as parlé du dilemme stratégique sur le projet TLS 2027. Ce module va te donner un cadre de réflexion concret.',
    coachName: 'Marie Dubois',
    coachInitials: 'MD',
    duration: '45 min',
    competence: 'Stratégie',
    date: 'il y a 1 semaine',
  },
];

const TYPE_ICON = {
  article: BookOpen,
  video: Video,
  lesson: Lightbulb,
};

const ItemRecommendations: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface">
      <EditorialHero
        eyebrow="Coaching · Recommandations"
        title="Tes recommandations du coach"
        summary="Items sélectionnés spécifiquement pour toi par Marie"
        tone="default"
      />

      <Container width="content" padding={false} className="px-4 py-section flex flex-col gap-section">
        <div className="flex items-center justify-between gap-stack">
          <div>
            <div className="text-h4 font-semibold">{RECOMMENDATIONS.length} recommandations actives</div>
            <div className="text-caption text-ink-500 mt-1">Mises à jour au fil de tes sessions de coaching</div>
          </div>
          <AITransparencyLabel variant="recommended" />
        </div>

        <SectionCard title="À consulter en priorité" description="Triés par pertinence pour tes objectifs en cours">
          <div className="flex flex-col gap-stack">
            {RECOMMENDATIONS.map((r) => {
              const Icon = TYPE_ICON[r.type];
              return (
                <Card key={r.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-stack-xs mb-2 flex-wrap">
                        <Badge variant="brand">{r.competence}</Badge>
                        <Badge variant="neutral">{r.duration}</Badge>
                        <span className="text-caption text-ink-500">{r.date}</span>
                      </div>
                      <h3 className="text-h4 font-semibold mb-stack-xs">{r.title}</h3>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary-50/70 mb-stack">
                        <Avatar initials={r.coachInitials} size="sm" />
                        <div className="flex-1">
                          <div className="text-caption text-ink-500 mb-1">Marie écrit :</div>
                          <p className="text-body-sm italic text-ink-700">{r.reason}</p>
                        </div>
                      </div>

                      <Button variant="primary" size="sm" trailingIcon={<ArrowRight className="w-4 h-4" />}>
                        Découvrir
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </SectionCard>
      </Container>
    </div>
  );
};

export default ItemRecommendations;
