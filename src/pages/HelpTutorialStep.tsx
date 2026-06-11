import React from 'react';
import { HelpCircle, ArrowLeft, ArrowRight, List, CheckCircle, Circle, ChevronRight } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Container } from '../components/layout';

const CURRENT_STEP = 3;
const TOTAL_STEPS = 5;

const TUTORIAL_STEPS = [
  { id: 1, title: 'Accéder aux paramètres du profil',     status: 'completed' },
  { id: 2, title: 'Choisir une photo de profil',           status: 'completed' },
  { id: 3, title: 'Renseigner vos informations personnelles', status: 'current' },
  { id: 4, title: 'Définir vos objectifs d\'apprentissage',   status: 'upcoming' },
  { id: 5, title: 'Enregistrer et valider votre profil',       status: 'upcoming' },
];

const STATUS_CONFIG: Record<string, { badge: string; variant: 'success' | 'brand' | 'neutral' }> = {
  completed: { badge: 'Terminé',  variant: 'success' },
  current:   { badge: 'En cours', variant: 'brand'   },
  upcoming:  { badge: 'À venir',  variant: 'neutral'  },
};

const FILL_PERCENT = Math.round((CURRENT_STEP / TOTAL_STEPS) * 100);

export default function HelpTutorialStep() {
  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Tutoriel' }}
        title="Tutoriel : Paramétrer mon profil"
        summary={`Étape ${CURRENT_STEP} sur ${TOTAL_STEPS} : Renseigner vos informations personnelles`}
        tone="default"
      />

      <Container width="page" padding={false} className="px-stack flex flex-col gap-section pb-page">
        <div className="flex flex-col gap-stack-xs">
          <div className="flex items-center justify-between text-caption text-ink-500">
            <span>Progression du tutoriel</span>
            <span className="font-semibold text-primary-700">{FILL_PERCENT} %</span>
          </div>
          <ProgressBar value={FILL_PERCENT} fill="brand" size="sm" valueLabel={false} />
        </div>

        <Card>
          <div className="flex flex-col gap-stack-lg">
            <div className="flex flex-col gap-stack-xs">
              <div className="flex items-center gap-stack-xs">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-pill bg-primary-600 text-white font-display font-bold text-body-sm shrink-0">
                  {CURRENT_STEP}
                </span>
                <h2 className="font-display font-semibold text-h3 text-ink-900 m-0">
                  Renseigner vos informations personnelles
                </h2>
              </div>
              <p className="text-body text-ink-700 leading-relaxed m-0">
                Cette étape vous guide pour compléter les informations essentielles de votre profil apprenant : nom d'affichage, poste actuel, secteur d'activité et langue préférée.
              </p>
            </div>

            <div className="flex flex-col gap-stack">
              <p className="text-body text-ink-700 leading-relaxed m-0">
                <strong>1.</strong> Depuis votre tableau de bord, cliquez sur votre avatar en haut à droite, puis sélectionnez <em>Mon profil</em>.
              </p>
              <p className="text-body text-ink-700 leading-relaxed m-0">
                <strong>2.</strong> Dans la section <em>Informations personnelles</em>, renseignez votre prénom, nom, intitulé de poste et secteur d'activité. Ces informations seront visibles par votre coach.
              </p>
              <p className="text-body text-ink-700 leading-relaxed m-0">
                <strong>3.</strong> Sélectionnez votre langue préférée pour l'interface et les contenus recommandés. Cette préférence peut être modifiée à tout moment.
              </p>
            </div>

            <div className="w-full aspect-video bg-ink-100 rounded-lg flex items-center justify-center">
              <span className="text-body-sm text-ink-400">Illustration de l'étape 3</span>
            </div>
          </div>
        </Card>

        <div className="flex flex-wrap items-center justify-between gap-stack">
          <Button variant="ghost" leadingIcon={<ArrowLeft size={16} />}>
            Étape précédente
          </Button>
          <Button variant="primary" trailingIcon={<ArrowRight size={16} />}>
            Étape suivante
          </Button>
        </div>

        <SectionCard
          title="Plan du tutoriel"
          titleIcon={<List size={18} />}
        >
          <div className="flex flex-col gap-stack-xs">
            {TUTORIAL_STEPS.map((step) => {
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
                  <span className="shrink-0 text-ink-400">
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
