import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HelpCircle, ArrowLeft, ArrowRight, List, CheckCircle, Circle, ChevronRight } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Container } from '../components/layout';
import { useHelpcenterStore } from '../stores/persistence';

const STATUS_CONFIG: Record<StepStatus, { badge: string; variant: 'success' | 'brand' | 'neutral' }> = {
  completed: { badge: 'Terminé',  variant: 'success' },
  current:   { badge: 'En cours', variant: 'brand'   },
  upcoming:  { badge: 'À venir',  variant: 'neutral'  },
};

type StepStatus = 'completed' | 'current' | 'upcoming';

/* L'étape affichée suit l'URL (2026-09-24). La page était entièrement codée
   en dur — tutoriel « Paramétrer mon profil », étape 3 sur 5 — quels que
   soient les paramètres : /help/tutorials/1/step/1 montrait l'étape 3 d'un
   tutoriel absent de la liste. Elle lit maintenant le tutoriel dans le store
   d'aide (par id, `tuto-01`, ou par rang, `1`) et l'étape `stepId` (base 1). */
export default function HelpTutorialStep() {
  const { id = '', stepId = '1' } = useParams<{ id: string; stepId: string }>();
  const navigate = useNavigate();
  const tutorials = useHelpcenterStore().getTutorials();
  const tutorial =
    tutorials.find((t) => t.id === id) ?? tutorials.find((t) => String(t.order) === id);

  if (!tutorial || tutorial.sections.length === 0) {
    return (
      <div className="flex flex-col gap-section">
        <EditorialHero
          eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Tutoriel' }}
          title="Tutoriel introuvable"
          summary="Ce tutoriel n'existe pas ou a été déplacé."
          tone="flat"
        />
        <Container width="page" padding={false} className="px-stack pb-page">
          <Button emphasis="outline" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/help/tutorials')}>
            Tous les tutoriels
          </Button>
        </Container>
      </div>
    );
  }

  const total = tutorial.sections.length;
  const parsed = Number.parseInt(stepId, 10);
  const current = Math.min(Math.max(Number.isNaN(parsed) ? 1 : parsed, 1), total);
  const section = tutorial.sections[current - 1];
  const fillPercent = Math.round((current / total) * 100);
  const goTo = (step: number) => navigate(`/help/tutorials/${tutorial.id}/step/${step}`);

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Tutoriel' }}
        title={`Tutoriel : ${tutorial.title}`}
        summary={`Étape ${current} sur ${total} : ${section.title}`}
        tone="flat"
      />

      <Container width="page" padding={false} className="px-stack flex flex-col gap-section pb-page">
        <div className="flex flex-col gap-stack-xs">
          <div className="flex items-center justify-between text-caption text-ink-500">
            <span>Progression du tutoriel</span>
            <span className="font-semibold text-primary-700">{fillPercent} %</span>
          </div>
          <ProgressBar value={fillPercent} fill="brand" size="sm" valueLabel={false} />
        </div>

        <Card>
          <div className="flex flex-col gap-stack-lg">
            <div className="flex flex-col gap-stack-xs">
              <div className="flex items-center gap-stack-xs">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-pill bg-primary-700 text-white font-display font-bold text-body-sm shrink-0">
                  {current}
                </span>
                <h2 className="font-display text-h3 text-ink-900">
                  {section.title}
                </h2>
              </div>
              <p className="text-body text-ink-700 m-0">
                {section.text}
              </p>
            </div>

            <div className="w-full aspect-video bg-ink-100 rounded-lg flex items-center justify-center">
              <span className="text-body-sm text-ink-600">{section.imageAlt ?? `Illustration de l'étape ${current}`}</span>
            </div>
          </div>
        </Card>

        <div className="flex flex-wrap items-center justify-between gap-stack">
          <Button
            emphasis="outline"
            leadingIcon={<ArrowLeft size={16} />}
            disabled={current === 1}
            onClick={() => goTo(current - 1)}
          >
            Étape précédente
          </Button>
          {current < total ? (
            <Button emphasis="soft" trailingIcon={<ArrowRight size={16} />} onClick={() => goTo(current + 1)}>
              Étape suivante
            </Button>
          ) : (
            <Button emphasis="soft" trailingIcon={<ArrowRight size={16} />} onClick={() => navigate('/help/tutorials')}>
              Terminer le tutoriel
            </Button>
          )}
        </div>

        <SectionCard
          title="Plan du tutoriel"
          titleIcon={<List size={18} />}
        >
          <div className="flex flex-col gap-stack-xs">
            {tutorial.sections.map((sec, index) => {
              const step = {
                id: index + 1,
                title: sec.title,
                status: (index + 1 < current ? 'completed' : index + 1 === current ? 'current' : 'upcoming') as StepStatus,
              };
              const config = STATUS_CONFIG[step.status];
              return (
                <div
                  key={step.id}
                  className={[
                    'flex items-center gap-stack p-3 rounded-lg transition-all duration-base',
                    step.status === 'current'
                      ? 'bg-primary-50 border border-primary-200'
                      : 'hover:bg-ink-50',
                  ].join(' ')}
                >
                  <span className="shrink-0 text-ink-600">
                    {step.status === 'completed'
                      ? <CheckCircle size={18} className="text-success-base" />
                      : step.status === 'current'
                      ? <ChevronRight size={18} className="text-primary-600" />
                      : <Circle size={18} />
                    }
                  </span>
                  <span
                    className={[
                      'flex-1 text-body-sm',
                      step.status === 'current'   ? 'font-semibold text-primary-800'
                      : step.status === 'completed' ? 'text-ink-500 line-through'
                      : 'text-ink-700',
                    ].join(' ')}
                  >
                    {step.id}. {step.title}
                  </span>
                  <Badge variant={config.variant}>{config.badge}</Badge>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </Container>
    </div>
  );
}
